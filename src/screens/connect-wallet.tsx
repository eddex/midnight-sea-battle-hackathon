import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MidnightButton } from 'use-midnight';
import { activateSimulationMode, selectGameCurrentState, selectSimulationMode, setGameState } from '../services/store';
import { State } from '../models/game-state';
import Button from '../components/button';

export default function ConnectWalletScreen() {
  const gameCurrentState = useSelector(selectGameCurrentState);
  const simulationMode = useSelector(selectSimulationMode);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    checkWallet();
    const checkInterval = setInterval(() => {
      console.log('Checking wallet...');
      checkWallet().then((connected) => {
        if (connected) {
          clearInterval(checkInterval);
        }
      });
    }, 1000);
    return () => {
      clearInterval(checkInterval);
    };
  }, []);

  const checkWallet = async (): Promise<boolean> => {
    const midnightWallet = window.midnight;
    if (midnightWallet) {
      const isEnabled = await midnightWallet.mnLace?.isEnabled();
      if (isEnabled) {
        setWalletConnected(true);
        return true;
      }
    }
    return false;
  };

  const next = () => {
    dispatch(setGameState(State.PLACE_SHIPS));
  };

  const setActivationModeActive = () => {
    dispatch(activateSimulationMode());
  };

  return (
    <>
      {gameCurrentState === State.INITIAL ? (
        <div className="text-white text-center mb-8 mt-4">
          <h1 className="text-lg">Welcome to Sea Battle</h1>
          <p className="text-gray-300 mb-8">
            You will play on the Midnight Testnet using a ZeroKnowledge Smartcontract.
          </p>
          <p className="mb-2">First, connect your Midnight wallet:</p>
          <div className="flex justify-center mb-6">
            <MidnightButton />
          </div>
          {walletConnected ? (
            <div className="flex justify-center mb-6">
              <Button onClick={next}>Next</Button>
            </div>
          ) : null}
          {!simulationMode ? (
            <div className="mb-4">
              <p className="mb-2">Or activate simulation mode:</p>
              <Button onClick={setActivationModeActive}>Activate Simulation Mode</Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
