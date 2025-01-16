import { useDispatch, useSelector } from 'react-redux';
import {
  selectGameCurrentState,
  selectOwnShips,
  selectSimulationMode,
  setDeploymentAddress,
  setGameState,
  setSelfAsPlayerTwo,
} from '../services/store';
import { State } from '../models/game-state';
import Button from '../components/button';
import { useState } from 'react';
import { LoadingAnimation } from '../components/loading-animation';
import { deployBattleContract, joinAsSecondPlayer, setModeToSimulation } from '../services/game-service';

export default function DeployGameScreen() {
  const [gameAddressToJoin, setGameAddressToJoin] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const gameCurrentState = useSelector(selectGameCurrentState);
  const isSimulationModeActive = useSelector(selectSimulationMode);
  const ownShips = useSelector(selectOwnShips);
  const dispatch = useDispatch();

  const deployGame = async () => {
    console.log('Deploying Game...');
    dispatch(setGameState(State.WAIT_TO_DEPLOY));
    setErrorMessage('');

    try {
      if (isSimulationModeActive) {
        setModeToSimulation();
      }
      const contractAddress = await deployBattleContract(ownShips);
      setGameAddressToJoin(contractAddress);
      dispatch(setDeploymentAddress(contractAddress));

      dispatch(setGameState(State.WAIT_FOR_JOIN));
    } catch (e) {
      console.error('Error deploying game:', e);
      const error = e as Error;
      if (error.message.includes('Failed to fetch')) {
        setErrorMessage('Error deploying game. Do you have a running prover server? Error was: ' + e);
      } else {
        setErrorMessage('Error deploying game. Error was: ' + JSON.stringify(e));
      }
    }
  };

  const joinGame = async () => {
    dispatch(setGameState(State.WAIT_TO_DEPLOY));

    await joinAsSecondPlayer(gameAddressToJoin, ownShips);
    dispatch(setDeploymentAddress(gameAddressToJoin));
    dispatch(setSelfAsPlayerTwo());

    dispatch(setGameState(State.OWN_TURN));
  };

  return (
    <>
      {gameCurrentState === State.DEPLOY ? (
        <div className="text-white text-center mb-8 mt-4">
          <div className="flex flex-col">
            <div className="mb-4">
              <Button onClick={deployGame}>Start new game</Button>
            </div>

            <p className="mb-4">or</p>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter game address"
                onChange={(e) => setGameAddressToJoin(e.target.value)}
                className="shadow appearance-none border border-blue-950 rounded w-64 py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mr-2"
              />
              <Button onClick={joinGame}>Join existing game</Button>
            </div>
          </div>
        </div>
      ) : null}
      {gameCurrentState === State.WAIT_TO_DEPLOY ? (
        errorMessage ? (
          <div className="text-white text-center mb-8 mt-4">
            <div className="text-red-500 mb-2">{errorMessage}</div>
            <Button onClick={deployGame}>Retry</Button>
          </div>
        ) : (
          <div className="text-white text-center mb-8 mt-4">
            <div className="flex flex-col">
              {gameAddressToJoin ? (
                <div>Joining the game at {gameAddressToJoin}...</div>
              ) : (
                <div>Creating new game...</div>
              )}
              <div className="mx-auto my-12">
                <LoadingAnimation />
              </div>
              <div>This can take some minutes ⌛, please be patient and do NOT reload 🔄</div>
            </div>
          </div>
        )
      ) : null}
    </>
  );
}
