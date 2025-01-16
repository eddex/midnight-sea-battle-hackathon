import { useDispatch, useSelector } from 'react-redux';
import {
  selectGameCurrentState,
  selectRoundCount,
  selectWinner,
  restartGame,
  selectIsPlayerOne,
} from '../services/store';
import { State } from '../models/game-state';
import Button from '../components/button';
import { Player } from '../services/contract-types';
import Lottie from 'react-lottie-player';
import loosingAnimation from '../animations/LoosingAnimation.json';
import winningAnimation from '../animations/WinningAnimation.json';

export default function EndGameScreen() {
  const gameCurrentState = useSelector(selectGameCurrentState);
  const winner = useSelector(selectWinner);
  const isPlayerOne = useSelector(selectIsPlayerOne);
  const roundCount = useSelector(selectRoundCount);
  const dispatch = useDispatch();

  const initiateGameRestart = () => {
    dispatch(restartGame());
  };

  return (
    <>
      {gameCurrentState === State.GAME_OVER ? (
        <div className="text-white text-center mb-8 mt-8">
          <h1 className="text-4xl mb-4">Game finished</h1>
          {isPlayerOne && winner === Player.PLAYER1 ? (
            <div className="mb-4">
              <span>You are the winner!</span>
              <div className="flex justify-center">
                <Lottie loop animationData={winningAnimation} play style={{ width: 300, height: 300 }} />
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <span>You have lost...</span>
              <div className="flex justify-center">
                <Lottie loop animationData={loosingAnimation} play style={{ width: 300, height: 300 }} />
              </div>
            </div>
          )}
          <p className="mb-4">Total Rounds: {roundCount} 🔁</p>
          <Button onClick={initiateGameRestart}>Restart Game</Button>
        </div>
      ) : null}
    </>
  );
}
