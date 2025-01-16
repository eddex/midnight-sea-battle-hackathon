import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum GAME_STATE { waitForPlayer2 = 0, playing = 1, ended = 2 }

export enum FIELD_STATE { unknown = 0, hit = 1, miss = 2 }

export enum PLAYER { none = 0, player1 = 1, player2 = 2 }

export type Witnesses<T> = {
  local_secret_key(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
  ships(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint[][][]];
}

export type ImpureCircuits<T> = {
  joinGame(context: __compactRuntime.CircuitContext<T>,
           targetX: bigint,
           targetY: bigint): __compactRuntime.CircuitResults<T, void>;
  shoot(context: __compactRuntime.CircuitContext<T>,
        isPlayerOneCalling: boolean,
        targetX: bigint,
        targetY: bigint): __compactRuntime.CircuitResults<T, void>;
}

export type PureCircuits = {
  public_key(secret_key: Uint8Array, ships: bigint[][][]): Uint8Array;
}

export type Circuits<T> = {
  joinGame(context: __compactRuntime.CircuitContext<T>,
           targetX: bigint,
           targetY: bigint): __compactRuntime.CircuitResults<T, void>;
  shoot(context: __compactRuntime.CircuitContext<T>,
        isPlayerOneCalling: boolean,
        targetX: bigint,
        targetY: bigint): __compactRuntime.CircuitResults<T, void>;
  public_key(context: __compactRuntime.CircuitContext<T>,
             secret_key: Uint8Array,
             ships: bigint[][][]): __compactRuntime.CircuitResults<T, Uint8Array>;
}

export type Ledger = {
  readonly gameState: GAME_STATE;
  readonly roundCount: bigint;
  readonly winner: PLAYER;
  readonly player1: Uint8Array;
  readonly player2: Uint8Array;
  gridPlayer1: {
    isEmpty(): boolean;
    size(): bigint;
    member(key: bigint): boolean;
    lookup(key: bigint): FIELD_STATE;
    [Symbol.iterator](): Iterator<[bigint, FIELD_STATE]>
  };
  gridPlayer2: {
    isEmpty(): boolean;
    size(): bigint;
    member(key: bigint): boolean;
    lookup(key: bigint): FIELD_STATE;
    [Symbol.iterator](): Iterator<[bigint, FIELD_STATE]>
  };
  readonly destroyCountPlayer1: bigint;
  readonly destroyCountPlayer2: bigint;
  readonly nextPlayer: PLAYER;
  readonly lastShot: bigint[];
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
