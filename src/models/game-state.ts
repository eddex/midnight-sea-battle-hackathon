import { BoardState } from './board-state';
import { Ship } from './ship';
import { Player } from '../services/contract-types';

export enum State {
  INITIAL = 'INITIAL',
  WALLET_CONNECT = 'WALLET_CONNECT',
  PLACE_SHIPS = 'PLACE_SHIPS',
  DEPLOY = 'DEPLOY',
  WAIT_TO_DEPLOY = 'WAIT_TO_DEPLOY',
  WAIT_FOR_JOIN = 'WAIT_FOR_JOIN',
  OWN_TURN = 'OWN_TURN',
  OPPONENT_TURN = 'OPPONENT_TURN',
  GAME_OVER = 'GAME_OVER',
}

export interface GameState {
  currentState: State;
  deploymentAddress: string | undefined;
  simulationModeActive: boolean;
  roundCount: number;
  isPlayerOne: boolean;
  ownShips: Ship[];
  ownBoard: BoardState;
  enemyBoard: BoardState;
  sunkenShips: {
    own: number;
    enemy: number;
  };
  isGameOver: boolean;
  winner: Player;
}
