import { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import { ManagedContract } from '../contract';
import { SeaBattlePrivateState } from "./contract-types";

export const witnesses = {
  local_secret_key: ({ privateState }: WitnessContext<ManagedContract.Ledger, SeaBattlePrivateState>): [SeaBattlePrivateState, Uint8Array] => [
    privateState,
    privateState.localSecretKey,
  ],
  ships: ({ privateState }: WitnessContext<ManagedContract.Ledger, SeaBattlePrivateState>): [SeaBattlePrivateState, bigint[][][]] => [
    privateState,
    privateState.ships,
  ],
};
