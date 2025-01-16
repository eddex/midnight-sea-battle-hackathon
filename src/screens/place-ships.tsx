import { useEffect, useState } from 'react';
import BoardCell from '../components/board-cell';
import { Ship } from '../models/ship';
import { useDispatch, useSelector } from 'react-redux';
import { initializeOwnBoard, selectGameCurrentState, setGameState } from '../services/store';
import { State } from '../models/game-state';
import Button from '../components/button';
import ShipPlacement from '../components/ship-placement';
import { getLetterForIndex, oneToTen } from '../services/utils';
import { isValidShipPlacement } from '../services/ship-placement-checker';

const INITIAL_SHIPS = [
  { name: 'Destroyer', size: 2, startFieldY: -1, startFieldX: -1, direction: 'horizontal' },
  { name: 'Submarine', size: 3, startFieldY: -1, startFieldX: -1, direction: 'vertical' },
  { name: 'Cruiser', size: 3, startFieldY: -1, startFieldX: -1, direction: 'horizontal' },
  { name: 'Battleship', size: 4, startFieldY: -1, startFieldX: -1, direction: 'vertical' },
  { name: 'Carrier', size: 5, startFieldY: -1, startFieldX: -1, direction: 'horizontal' },
] as Ship[];

export default function PlaceShipsScreen() {
  const gameCurrentState = useSelector(selectGameCurrentState);
  const [ships, setShips] = useState<Ship[]>([]);
  const [shipToPlace, setShipToPlace] = useState<Ship | undefined>(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    setShips(INITIAL_SHIPS);
    setShipToPlace(INITIAL_SHIPS[0]);
  }, []);

  const next = () => {
    dispatch(initializeOwnBoard(ships));
    dispatch(setGameState(State.DEPLOY));
  };

  const onBoardFieldClicked = (x: number, y: number) => {
    console.log('Field clicked: ', x, y);
    if (shipToPlace) {
      const newShips = ships
        .map((s) => {
          return { ...s };
        })
        .map((s) => {
          if (s.name == shipToPlace.name) {
            s.startFieldX = x;
            s.startFieldY = y;
          }
          return s;
        });

      const isValid = isValidShipPlacement(newShips);
      if (isValid) {
        setShips(newShips);

        // select next unplaced ship
        const nextUnplacedShip = newShips.find((s) => s.startFieldX == -1);
        setShipToPlace(nextUnplacedShip);
      } else {
        console.log('Ship placement is invalid');
      }
    }
  };

  const toggleShipDirection = (ship: Ship) => {
    const newShips = ships.map((s) => {
      if (s.name == ship.name) {
        s.direction = s.direction === 'horizontal' ? 'vertical' : 'horizontal';
      }
      return s;
    });
    setShips(newShips);
  };

  const placeShip = (ship: Ship) => {
    setShipToPlace(ship);
  };

  const hasShip = (x: number, y: number) => {
    return ships.some((ship) => {
      if (ship.direction === 'horizontal') {
        return ship.startFieldY == y && ship.startFieldX <= x && x < ship.startFieldX + ship.size;
      } else {
        return ship.startFieldX == x && ship.startFieldY <= y && y < ship.startFieldY + ship.size;
      }
    });
  };

  const allShipsPlaced = ships.every((s) => s.startFieldX !== -1);

  return (
    <>
      {gameCurrentState === State.PLACE_SHIPS ? (
        <div className="text-white text-center mb-8 mt-4">
          <p className="mb-2">Place your Ships:</p>
          {ships.map((s) => (
            <ShipPlacement
              key={s.name}
              name={s.name}
              length={s.size}
              orientation={s.direction}
              selected={s.name === shipToPlace?.name}
              isPlaced={s.startFieldX !== -1}
              onPlace={() => placeShip(s)}
              onToggleOrientation={() => toggleShipDirection(s)}
            />
          ))}
          <p className="mt-4">{shipToPlace ? 'Click a field to place the ' + shipToPlace.name : <span>&nbsp;</span>}</p>
          <table className="mx-auto border-solid border-2 border-white mb-8 mt-4">
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
                          key={x}
                          prefix={'placement'}
                          x={x}
                          y={y}
                          unsunkenShip={hasShip(x, y)}
                          onClick={() => onBoardFieldClicked(x, y)}
                        />
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {allShipsPlaced ? (
            <div className="flex justify-center mb-6">
              <Button onClick={next}>Next</Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
