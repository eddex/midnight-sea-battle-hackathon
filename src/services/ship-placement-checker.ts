import { Ship } from "../models/ship";
import { oneToTen } from "./utils";

const isShipInsideBoard = (ship: Ship): boolean => {
  if (ship.direction === 'vertical') {
    return ship.startFieldX >= 0 && ship.startFieldX < 10 && ship.startFieldY >= 0 && ship.startFieldY + ship.size - 1 < 10;
  } else {
    return ship.startFieldY >= 0 && ship.startFieldY < 10 && ship.startFieldX >= 0 && ship.startFieldX + ship.size - 1 < 10;
  }
}

export const isValidShipPlacement = (ships: Ship[]): boolean => {
  const tmpGameBoard = oneToTen().map(() => oneToTen().map(() => false));

  for (const ship of ships) {
    // ignore not places ships
    if (ship.startFieldX === -1) {
      continue;
    }
    // check if all ships are fully inside the board
    const shipInsideBoard = isShipInsideBoard(ship);
    if (!shipInsideBoard) {
      console.log(`Ship ${ship.name} is not fully inside the board`);
      return false;
    }

    // check if ships are placed on top of each other
    if (ship.direction === 'vertical') {
      for (let i = 0; i < ship.size; i++) {
        if (tmpGameBoard[ship.startFieldX][ship.startFieldY + i]) {
          console.log(`Ship ${ship.name} is placed on top of another ship`);
          return false;
        }
        tmpGameBoard[ship.startFieldX][ship.startFieldY + i] = true;
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        if (tmpGameBoard[ship.startFieldX + i][ship.startFieldY]) {
          console.log(`Ship ${ship.name} is placed on top of another ship`);
          return false;
        }
        tmpGameBoard[ship.startFieldX + i][ship.startFieldY] = true;
      }
    }
  }
  return true;
};

