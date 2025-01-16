import { MidnightProviders } from "@midnight-ntwrk/midnight-js-types";
import { ManagedContract } from '../contract';
import { BoardState } from "../models/board-state";

export type SeaBattlePrivateState = {
  readonly localSecretKey: Uint8Array;
  readonly ships: bigint[][][];
};

export type PrivateStates = {
  readonly seaBattlePrivateState: SeaBattlePrivateState;
};

export type SeaBattlePublicState = {
  readonly gameState: ManagedContract.GAME_STATE;
  readonly roundCount: number;
  readonly winner: ManagedContract.PLAYER;
  readonly player1: Uint8Array; // public hash of player 1's ships and his private key
  readonly player2: Uint8Array; // public hash of player 2's ships and his private key
  readonly nextPlayer: ManagedContract.PLAYER;
  readonly lastShot: number[] | null;
  readonly gridPlayer1: BoardState;
  readonly gridPlayer2: BoardState;
  readonly destroyCountPlayer1: number;
  readonly destroyCountPlayer2: number;
}

export enum Player {
  NONE,
  PLAYER1,
  PLAYER2,
}

export type SeaBattleContract = ManagedContract.Contract<SeaBattlePrivateState, ManagedContract.Witnesses<SeaBattlePrivateState>>;
export type SeaBattleCircuitKeys = Exclude<keyof SeaBattleContract['impureCircuits'], number | symbol>;
export type SeaBattleProviders = MidnightProviders<SeaBattleCircuitKeys, PrivateStates>;
