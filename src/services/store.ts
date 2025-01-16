import { configureStore, createSlice } from '@reduxjs/toolkit';
import { GameState, State } from '../models/game-state';
import { createEmptyBoard, FieldState } from '../models/board-state';
import { Ship } from '../models/ship';
import { setModeToSimulation } from './game-service';
import { Player } from './contract-types';

const STATE_PERSISTENCE_KEY = 'gameState';

export const gameReducer = createSlice({
  name: 'game',
  initialState: {
    currentState: State.INITIAL,
    deploymentAddress: undefined,
    simulationModeActive: false,
    roundCount: 0,
    isPlayerOne: true,
    ownShips: [],
    ownBoard: createEmptyBoard(),
    enemyBoard: createEmptyBoard(),
    sunkenShips: {
      own: 0,
      enemy: 0,
    },
    isGameOver: false,
    winner: Player.NONE,
  } as GameState,
  reducers: {
    setGameState: (state, action) => {
      state.currentState = action.payload;
    },
    setDeploymentAddress: (state, action) => {
      state.deploymentAddress = action.payload;
    },
    activateSimulationMode: (state) => {
      state.simulationModeActive = true;
      setModeToSimulation();
    },
    initializeOwnBoard: (state, action) => {
      state.ownShips = action.payload;
      action.payload.forEach((ship: Ship) => {
        // draw ship on own board
        for (let i = 0; i < ship.size; i++) {
          if (ship.direction === 'horizontal') {
            state.ownBoard.fields[ship.startFieldX + i][ship.startFieldY] = FieldState.UnhittedShip;
          } else {
            state.ownBoard.fields[ship.startFieldX][ship.startFieldY + i] = FieldState.UnhittedShip;
          }
        }
      });
    },
    shootOnEnemyBoard: (state, action) => {
      const { x, y } = action.payload;
      state.enemyBoard.fields[x][y] = FieldState.Target;
    },
    updateEnemyBoard: (state, action) => {
      state.enemyBoard = action.payload;
    },
    updateOwnBoard: (state, action) => {
      state.ownBoard = action.payload;
    },
    updateSunkenShipCount: (state, action) => {
      state.sunkenShips = action.payload;
    },
    enemyAction: (state, action) => {
      const { x, y } = action.payload;
      if (state.ownBoard.fields[y][x] === FieldState.UnhittedShip) {
        state.ownBoard.fields[y][x] = FieldState.Hit;
      } else {
        state.ownBoard.fields[y][x] = FieldState.Miss;
      }
    },
    incrementRoundCount: (state) => {
      state.roundCount++;
    },
    setRoundCount: (state, action) => {
      state.roundCount = action.payload;
    },
    setSelfAsPlayerTwo: (state) => {
      state.isPlayerOne = false;
    },
    endGame: (state, winner) => {
      state.isGameOver = true;
      state.currentState = State.GAME_OVER;
      state.winner = winner.payload;
    },
    restartGame: (state) => {
      state.currentState = State.INITIAL;
      state.deploymentAddress = undefined;
      state.simulationModeActive = false;
      state.roundCount = 0;
      state.isPlayerOne = true;
      state.ownShips = [];
      state.ownBoard = createEmptyBoard();
      state.enemyBoard = createEmptyBoard();
      state.isGameOver = false;
      state.winner = Player.NONE;
    },
  },
});

const getPersistedStateIfAvailable = () => {
  const state = localStorage.getItem(STATE_PERSISTENCE_KEY);
  if (state) {
    return JSON.parse(state);
  }
  return undefined;
};

export const {
  setGameState,
  setDeploymentAddress,
  activateSimulationMode,
  initializeOwnBoard,
  shootOnEnemyBoard,
  updateEnemyBoard,
  updateOwnBoard,
  updateSunkenShipCount,
  enemyAction,
  incrementRoundCount,
  setRoundCount,
  setSelfAsPlayerTwo,
  endGame,
  restartGame,
} = gameReducer.actions;

export const selectGameCurrentState = (state: GameState) => state.currentState;
export const selectDeploymentAddress = (state: GameState) => state.deploymentAddress;
export const selectSimulationMode = (state: GameState) => state.simulationModeActive;
export const selectRoundCount = (state: GameState) => state.roundCount;
export const selectIsPlayerOne = (state: GameState) => state.isPlayerOne;
export const selectOwnBoard = (state: GameState) => state.ownBoard;
export const selectEnemyBoard = (state: GameState) => state.enemyBoard;
export const selectSunkenShips = (state: GameState) => state.sunkenShips;
export const selectOwnShips = (state: GameState) => state.ownShips;
export const selectWinner = (state: GameState) => state.winner;

export const store = configureStore({
  reducer: gameReducer.reducer,
  preloadedState: getPersistedStateIfAvailable(),
});

store.subscribe(() => {
  localStorage.setItem(STATE_PERSISTENCE_KEY, JSON.stringify(store.getState()));
});
