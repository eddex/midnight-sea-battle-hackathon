import { deployContract, findDeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import { initializeProviders } from './midnight-service';
import { SeaBattleContract, SeaBattlePrivateState, SeaBattleProviders, SeaBattlePublicState } from './contract-types';
import { ManagedContract } from '../contract';
import { randomBytes } from './utils';
import { Ship } from '../models/ship';
import { sampleSigningKey } from '@midnight-ntwrk/compact-runtime';
import { witnesses } from './witnesses';
import { getRuntimeNetworkId, getLedgerNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { map, tap, type Observable } from 'rxjs';
import { BoardState, convertFlatArrayToBoardState, createEmptyBoard, FieldState } from '../models/board-state';

const privateStateKey = 'seaBattlePrivateState';
let seaBattleContractInstance: SeaBattleContract | null = null;
let providers: SeaBattleProviders | null = null;
let deployedContract: FoundContract<SeaBattlePrivateState, SeaBattleContract> | null = null;
let simulationModeActive = false;

/**
 * Create a new Sea Battle contract and deploy it to the midnight network.
 * @param ships The private state of all own ships
 * @returns the address of the deployed contract, otherwise throws an error if the deployment fails
 */
export const deployBattleContract = async (ships: Ship[]): Promise<string> => {
  if (simulationModeActive) {
    console.log('Simulation mode active, not deploying contract, but faking it');
    return '0xFAKE00ADDRESS';
  }
  console.log('IDs:', getRuntimeNetworkId(), getLedgerNetworkId());
  providers = await initializeProviders();
  seaBattleContractInstance = new (ManagedContract as any).default.Contract(witnesses);
  if (seaBattleContractInstance === null) {
    throw new Error('Contract could not be created, please check the logs');
  }
  const signingKey = sampleSigningKey();
  const privateState = await getPrivateState(providers, ships);
  console.log('Going to deploy contract...');
  deployedContract = await deployContract(providers, {
    privateStateKey: privateStateKey,
    contract: seaBattleContractInstance,
    signingKey: signingKey,
    initialPrivateState: privateState,
  });
  console.log('Deployed contract:', deployedContract);
  console.log('Contract address:', deployedContract.deployTxData.public.contractAddress);
  return deployedContract.deployTxData.public.contractAddress;
};

export const hasDeployedContract = (): boolean => {
  return deployedContract !== null;
}

export const reJoinContract = async (address: string): Promise<string> => {
  if (providers === null) {
    providers = await initializeProviders();
  }
  if (address === null) {
    throw new Error('No saved contract given');
  }
  seaBattleContractInstance = new (ManagedContract as any).default.Contract(witnesses);
  if (seaBattleContractInstance === null) {
    throw new Error('Contract could not be created, please check the logs');
  }
  const existingPrivateState = await providers.privateStateProvider.get(privateStateKey);
  if (existingPrivateState === null) {
    throw new Error('No private state found, could not join contract');
  }
  deployedContract = await findDeployedContract(providers, {
    contractAddress: address,
    contract: seaBattleContractInstance,
    privateStateKey: privateStateKey,
    initialPrivateState: existingPrivateState,
  });
  return address;
};

export const setModeToSimulation = () => {
  simulationModeActive = true;
};

export const joinAsSecondPlayer = async (address: string, ships: Ship[]): Promise<void> => {
  if (providers === null) {
    providers = await initializeProviders();
  }
  seaBattleContractInstance = new (ManagedContract as any).default.Contract(witnesses);
  if (seaBattleContractInstance === null) {
    throw new Error('Contract could not be created, please check the logs');
  }
  const privateState = await getPrivateState(providers, ships);
  deployedContract = await findDeployedContract(providers, {
    contractAddress: address,
    contract: seaBattleContractInstance,
    privateStateKey: privateStateKey,
    initialPrivateState: privateState,
  });
  console.log('Joined contract:', deployedContract);

  // joinGame is not called here because the first "shoot coordinates" are not known yet
};

export const firstShootAsSecondPlayer = async (targetX: number, targetY: number): Promise<void> => {
  if (deployedContract === null) {
    throw new Error('Contract not deployed yet');
  }
  if (providers === null) {
    providers = await initializeProviders();
  }
  const tx = await deployedContract.callTx.joinGame(BigInt(targetX), BigInt(targetY));
  console.log('First shoot tx:', tx);
};

export const shoot = async (isPlayerOneCalling: boolean, targetX: number, targetY: number): Promise<void> => {
  if (deployedContract === null) {
    throw new Error('Contract not deployed yet');
  }
  if (providers === null) {
    providers = await initializeProviders();
  }
  const tx = await deployedContract.callTx.shoot(isPlayerOneCalling, BigInt(targetX), BigInt(targetY));
  console.log('Shoot tx:', tx);
};

export const currentOnChainState = async (address: string): Promise<Observable<SeaBattlePublicState>> => {
  if (deployedContract === null) {
    throw new Error('Contract not deployed yet');
  }
  if (providers === null) {
    providers = await initializeProviders();
  }
  return providers.publicDataProvider.contractStateObservable(address, { type: 'latest' }).pipe(
    map((state) => ManagedContract.ledger(state.data)),
    tap((ledgerState) => {
      console.log('Current ledger state:', ledgerState);
    }),
    map((ledgerState) => {
      const player1Grid = convertFlatArrayToBoardState(convertCompactMapToFieldStateArray(ledgerState.gridPlayer1));
      const player2Grid = convertFlatArrayToBoardState(convertCompactMapToFieldStateArray(ledgerState.gridPlayer2));
      return {
        gameState: ledgerState.gameState,
        roundCount: Number(ledgerState.roundCount),
        winner: ledgerState.winner,
        player1: ledgerState.player1,
        player2: ledgerState.player2,
        nextPlayer: ledgerState.nextPlayer,
        lastShot: ledgerState.lastShot.map((n) => Number(n)),
        gridPlayer1: player1Grid,
        gridPlayer2: player2Grid,
        destroyCountPlayer1: Number(ledgerState.destroyCountPlayer1),
        destroyCountPlayer2: Number(ledgerState.destroyCountPlayer2),
      };
    })
  );
};

export const mergeOnChainStateWithOwnState = (onChainState: BoardState, ownState: BoardState): BoardState => {
  // duplicate board because redux state are immutable
  const newBoardState = createEmptyBoard();
  ownState.fields.forEach((row, x) => {
    row.forEach((field, y) => newBoardState.fields[x][y] = field);
  });

  // fill in the hits and misses from the onChainState
  onChainState.fields.forEach((row, y) => {
    row.forEach((field, x) => {
      if (field === FieldState.Hit) {
        newBoardState.fields[x][y] = FieldState.Hit;
      } else if (field === FieldState.Miss) {
        newBoardState.fields[x][y] = FieldState.Miss;
      }
    });
  });
  return newBoardState;
};

export const drawLastShotOnBoard = (board: BoardState, lastShotX: number, lastShotY: number, ownShips: Ship[]): BoardState => {
  // duplicate board because redux state are immutable
  const newBoardState = createEmptyBoard();
  board.fields.forEach((row, x) => {
    row.forEach((field, y) => newBoardState.fields[x][y] = field);
  });
  // check if the shot was a hit or a miss
  for (const ship of ownShips) {
    // check if the shot hit a ship
    if (ship.direction === 'vertical') {
      if (lastShotX === ship.startFieldX && lastShotY >= ship.startFieldY && lastShotY <= ship.startFieldY + ship.size - 1) {
        newBoardState.fields[lastShotX][lastShotY] = FieldState.Hit;
        return newBoardState;
      }
    } else {
      if (lastShotY === ship.startFieldY && lastShotX >= ship.startFieldX && lastShotX <= ship.startFieldX + ship.size - 1) {
        newBoardState.fields[lastShotX][lastShotY] = FieldState.Hit;
        return newBoardState;
      }
    }
  }
  // shot was a miss
  newBoardState.fields[lastShotX][lastShotY] = FieldState.Miss;
  return newBoardState;
};

const getPrivateState = async (providers: SeaBattleProviders, ships: Ship[]): Promise<SeaBattlePrivateState> => {
  const existingPrivateState = await providers.privateStateProvider.get(privateStateKey);
  return (
    existingPrivateState ??
    ({
      localSecretKey: randomBytes(32),
      ships: shipsToBigInts(ships),
    } as SeaBattlePrivateState)
  );
};

const shipsToBigInts = (ships: Ship[]): bigint[][][] => {
  const shipCoordinates = [];
  for (const ship of ships) {
    if (ship.direction === 'vertical') {
      shipCoordinates.push([
        [BigInt(ship.startFieldX), BigInt(ship.startFieldY)],
        [BigInt(ship.startFieldX), BigInt(ship.startFieldY + ship.size - 1)],
      ]);
    } else {
      shipCoordinates.push([
        [BigInt(ship.startFieldX), BigInt(ship.startFieldY)],
        [BigInt(ship.startFieldX + ship.size - 1), BigInt(ship.startFieldY)],
      ]);
    }
  }
  return shipCoordinates;
};

const convertCompactMapToFieldStateArray = (compactMap: {
  isEmpty(): boolean;
  size(): bigint;
  member(key: bigint): boolean;
  lookup(key: bigint): ManagedContract.FIELD_STATE;
}): ManagedContract.FIELD_STATE[] => {
  const fields = [];
  for (let i = 0; i < compactMap.size(); i++) {
    const field = compactMap.lookup(BigInt(i));
    fields.push(field);
  }
  return fields;
};
