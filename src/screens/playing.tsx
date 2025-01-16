import { useDispatch, useSelector } from 'react-redux';
import {
  endGame,
  incrementRoundCount,
  selectDeploymentAddress,
  selectEnemyBoard,
  selectGameCurrentState,
  selectIsPlayerOne,
  selectOwnBoard,
  selectOwnShips,
  selectRoundCount,
  selectSimulationMode,
  selectSunkenShips,
  setGameState,
  setRoundCount,
  shootOnEnemyBoard,
  updateEnemyBoard,
  updateOwnBoard,
  updateSunkenShipCount,
} from '../services/store';
import { State } from '../models/game-state';
import BoardCell from '../components/board-cell';
import { LoadingAnimation } from '../components/loading-animation';
import { BoardState, FieldState } from '../models/board-state';
import {
  currentOnChainState,
  drawLastShotOnBoard,
  firstShootAsSecondPlayer,
  hasDeployedContract,
  mergeOnChainStateWithOwnState,
  reJoinContract,
  shoot,
} from '../services/game-service';
import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { ManagedContract } from '../contract';
import Button from '../components/button';
import { Player, SeaBattlePublicState } from '../services/contract-types';
import { getLetterForIndex, oneToTen } from '../services/utils';

export default function PlayingGameScreen() {
  const gameCurrentState = useSelector(selectGameCurrentState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const deploymentAddress = useSelector(selectDeploymentAddress);
  const [redeployDone, setRedeployDone] = useState<boolean>(false);
  const roundCount = useSelector(selectRoundCount);
  const isPlayerOne = useSelector(selectIsPlayerOne);
  const ownBoard = useSelector(selectOwnBoard);
  const enemyBoard = useSelector(selectEnemyBoard);
  const sunkenShips = useSelector(selectSunkenShips);
  const simulationMode = useSelector(selectSimulationMode);
  const ships = useSelector(selectOwnShips);
  const dispatch = useDispatch();

  useEffect(() => {
    let publicContractState$: Subscription | null = null;
    if (deploymentAddress) {
      if (!hasDeployedContract()) {
        reJoinContract(deploymentAddress).then(() => {
          setRedeployDone(true);
        });
      }
      console.log(`Listen for public contract changes on ${deploymentAddress} ...`);
      currentOnChainState(deploymentAddress).then((observable) => {
        publicContractState$ = observable.subscribe((state) => observePublicState(state));
      });
    }

    return () => publicContractState$?.unsubscribe();
  }, [deploymentAddress, redeployDone]);

  const observePublicState = (state: SeaBattlePublicState): void => {
    console.log('NewOnchainState:', state);
    if (state.gameState === ManagedContract.GAME_STATE.ended) {
      dispatch(endGame(state.winner));
      return;
    }
    if (
      !(
        gameCurrentState === State.OWN_TURN ||
        gameCurrentState === State.OPPONENT_TURN ||
        gameCurrentState === State.WAIT_FOR_JOIN
      )
    ) {
      console.log("Ignore onchain state update, because we're not in a game state");
      console.log('Current state:', gameCurrentState);
      return;
    }

    if (state.nextPlayer === ManagedContract.PLAYER.none) {
      console.log('Invalid state, nextPlayer is none...');
      return;
    }

    dispatch(setRoundCount(state.roundCount));

    if (isPlayerOne) {
      if (state.nextPlayer === ManagedContract.PLAYER.player1) {
        dispatch(setGameState(State.OWN_TURN));
      } else if (state.nextPlayer === ManagedContract.PLAYER.player2) {
        dispatch(setGameState(State.OPPONENT_TURN));
      }
    } else {
      if (state.nextPlayer === ManagedContract.PLAYER.player2) {
        dispatch(setGameState(State.OWN_TURN));
      } else if (state.nextPlayer === ManagedContract.PLAYER.player1) {
        dispatch(setGameState(State.OPPONENT_TURN));
      }
    }

    const selfPlayer = isPlayerOne ? ManagedContract.PLAYER.player1 : ManagedContract.PLAYER.player2;

    let newBoard = ownBoard;
    if (state.nextPlayer === selfPlayer && state.roundCount !== 0 && state.lastShot) {
      // sneak peak on the next move of the enemy already on the UI before it is validated by the contract
      newBoard = drawLastShotOnBoard(ownBoard, state.lastShot[0], state.lastShot[1], ships);
    }

    // update own board
    dispatch(
      updateOwnBoard(mergeOnChainStateWithOwnState(isPlayerOne ? state.gridPlayer1 : state.gridPlayer2, newBoard))
    );
    // update enemy board
    dispatch(
      updateEnemyBoard(mergeOnChainStateWithOwnState(isPlayerOne ? state.gridPlayer2 : state.gridPlayer1, enemyBoard))
    );
    dispatch(
      updateSunkenShipCount({
        own: isPlayerOne ? state.destroyCountPlayer1 : state.destroyCountPlayer2,
        enemy: isPlayerOne ? state.destroyCountPlayer2 : state.destroyCountPlayer1,
      })
    );
  };

  const makeMove = async (x: number, y: number) => {
    if (gameCurrentState !== State.OWN_TURN || isSubmitting) {
      return;
    }
    console.log(`Making move at ${x}, ${y}`);
    setIsSubmitting(true);
    dispatch(shootOnEnemyBoard({ x, y }));

    if (roundCount === 0 && !isPlayerOne) {
      // first round, so we need to specially call the contract to start the game
      await firstShootAsSecondPlayer(x, y);
    } else {
      // normal round, just shoot
      await shoot(isPlayerOne, x, y);
    }

    dispatch(incrementRoundCount());
    dispatch(setGameState(State.OPPONENT_TURN));
    setIsSubmitting(false);
  };

  const simulateGameEnd = async () => {
    dispatch(endGame(Player.PLAYER1));
  };

  const getFieldState = (board: BoardState, x: number, y: number) => {
    return board.fields[x][y];
  };

  return (
    <>
      {gameCurrentState === State.OWN_TURN || gameCurrentState === State.OPPONENT_TURN ? (
        <>
          <div className="flex justify-center gap-24 text-white text-center mb-8 mt-4">
          <div className={'py-2 px-6 pb-8 ' + (gameCurrentState === State.OWN_TURN ? 'blurred' : '')}>
              <p className="mb-2">Own Terrain:</p>
              <table className="mx-auto border-solid border-2 border-white mb-2">
                <tbody className="divide-y-2">
                  <tr className="divide-x-2">
                    <th className="w-8"></th>
                    {oneToTen().map((x) => (
                      <th key={x} className="w-8 h-8">
                        {x + 1}
                      </th>
                    ))}
                  </tr>
                  {oneToTen().map((y) => {
                    return (
                      <tr key={y} className="divide-x-2">
                        <th>{getLetterForIndex(y)}</th>
                        {oneToTen().map((x) => {
                          return (
                            <BoardCell
                              key={x + y}
                              prefix={'own'}
                              x={x}
                              y={y}
                              hit={FieldState.Hit === getFieldState(ownBoard, x, y)}
                              miss={FieldState.Miss === getFieldState(ownBoard, x, y)}
                              unsunkenShip={FieldState.UnhittedShip === getFieldState(ownBoard, x, y)}
                              target={FieldState.Target === getFieldState(ownBoard, x, y)}
                            />
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <span>Lost Ships: {sunkenShips.own} 🛟</span>
            </div>
            <div className={'py-2 px-6 pb-8 ' + (gameCurrentState === State.OPPONENT_TURN ? 'blurred' : '')}>
              <p className="mb-2">Opponents Terrain:</p>
              <table className="mx-auto border-solid border-2 border-white mb-2">
                <tbody className="divide-y-2">
                  <tr className="divide-x-2">
                    <th className="w-8"></th>
                    {oneToTen().map((x) => (
                      <th key={x} className="w-8 h-8">
                        {x + 1}
                      </th>
                    ))}
                  </tr>
                  {oneToTen().map((y) => {
                    return (
                      <tr key={y} className="divide-x-2">
                        <th>{getLetterForIndex(y)}</th>
                        {oneToTen().map((x) => {
                          return (
                            <BoardCell
                              key={x + y}
                              prefix={'opponent'}
                              x={x}
                              y={y}
                              hit={FieldState.Hit === getFieldState(enemyBoard, x, y)}
                              miss={FieldState.Miss === getFieldState(enemyBoard, x, y)}
                              target={FieldState.Target === getFieldState(enemyBoard, x, y)}
                              onClick={() => makeMove(x, y)}
                            />
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <span>Sunken Ships: {sunkenShips.enemy} 🛟</span>
            </div>
          </div>
          <div className="mt-4 text-white text-center mb-8">
            {gameCurrentState === State.OWN_TURN ? (
              <>
                {isSubmitting ? (
                  <div className="flex flex-col">
                    <span>Submitting your move...</span>
                    <div className="my-12 mx-auto">
                      <LoadingAnimation />
                    </div>
                  </div>
                ) : (
                  <span>Select a field to hit on the ememies terrain!</span>
                )}
              </>
            ) : null}
            {simulationMode ? (
              <div className="mt-4 pb-8">
                <Button onClick={simulateGameEnd}>Simulate game end</Button>
              </div>
            ) : null}
            {gameCurrentState === State.OPPONENT_TURN ? (
              <div className="flex flex-col">
                <span>Wait for your enemy to make a move...</span>
                <div className="my-12 mx-auto">
                  <LoadingAnimation />
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
}
