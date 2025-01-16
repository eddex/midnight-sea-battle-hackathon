import { ManagedContract } from '../contract';

export enum FieldState {
  Empty,
  UnhittedShip,
  Target,
  Hit,
  Miss,
}

export interface BoardState {
  fields: FieldState[][];
}

export function createEmptyBoard(): BoardState {
  return {
    fields: Array.from({ length: 10 }, () => Array(10).fill(FieldState.Empty)),
  };
}

export function convertFlatArrayToBoardState(input: ManagedContract.FIELD_STATE[]): BoardState {
  const fields = createEmptyBoard().fields;
  // y and x are swapped here because the flat array is stored in column-major order
  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < 10; x++) {
      const flatIndex = x * 10 + y;
      const field = input[flatIndex];
      switch (field) {
        case ManagedContract.FIELD_STATE.hit:
          fields[y][x] = FieldState.Hit;
          break;
        case ManagedContract.FIELD_STATE.miss:
          fields[y][x] = FieldState.Miss;
          break;
        default:
          // empty is the default
      }
    }
  }
  return {
    fields: fields,
  };
}
