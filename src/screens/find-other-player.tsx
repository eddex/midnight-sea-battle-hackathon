import { useDispatch, useSelector } from 'react-redux';
import { selectDeploymentAddress, selectGameCurrentState, selectSimulationMode, setGameState } from '../services/store';
import { State } from '../models/game-state';
import { LoadingAnimation } from '../components/loading-animation';
import Button from '../components/button';
import { useEffect } from 'react';
import { currentOnChainState } from '../services/game-service';
import { Subscription } from 'rxjs';
import { isUint8ArrayEmpty } from '../services/utils';

export default function FindOtherPlayerScreen() {
  const gameCurrentState = useSelector(selectGameCurrentState);
  const deploymentAddress = useSelector(selectDeploymentAddress);
  const simulationMode = useSelector(selectSimulationMode);
  const dispatch = useDispatch();

  useEffect(() => {
    let publicContractState$: Subscription | null = null;
    if (gameCurrentState === State.WAIT_FOR_JOIN && deploymentAddress) {
      console.log('Check for contract changes...');
      currentOnChainState(deploymentAddress).then((observable) => {
        publicContractState$ = observable.subscribe((state) => {
          console.log('State:', state);
          if (!isUint8ArrayEmpty(state.player2)) {
            publicContractState$?.unsubscribe();
            dispatch(setGameState(State.OWN_TURN));
          }
        });
      });
    }

    return () => publicContractState$?.unsubscribe();
  }, [gameCurrentState]);

  const otherPlayerFound = async () => {
    dispatch(setGameState(State.OWN_TURN));
  };

  return (
    <>
      {gameCurrentState === State.WAIT_FOR_JOIN ? (
        <div className="text-white text-center my-8">
          <div className="flex flex-col">
            <p>Contract deployed at the following address:</p>
            <p className="text-2xl font-mono my-6">{deploymentAddress}</p>
            <p>Give this address to another player to let them join!</p>
            <p>Wait for other player...</p>
            <div className="mx-auto my-12">
              <LoadingAnimation />
            </div>

            {simulationMode ? (
              <div className="mb-8">
                <Button onClick={otherPlayerFound}>Simulate player found</Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
