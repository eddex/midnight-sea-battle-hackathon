import { Provider } from 'react-redux';
import { store } from './services/store';
import GameHeader from './components/game-header';
import ConnectWalletScreen from './screens/connect-wallet';
import DeployGameScreen from './screens/deploy-game';
import PlaceShipsScreen from './screens/place-ships';
import FindOtherPlayerScreen from './screens/find-other-player';
import PlayingGameScreen from './screens/playing';
import EndGameScreen from './screens/end-game';
import './app.css';

export default function App() {
  return (
    <Provider store={store}>
      <div className="ocean-background min-h-svh w-full overflow-hidden">
        <div className="bubble bubble--1"></div>
        <div className="bubble bubble--2"></div>
        <div className="bubble bubble--3"></div>
        <div className="bubble bubble--4"></div>
        <div className="bubble bubble--5"></div>
        <div className="bubble bubble--6"></div>
        <div className="bubble bubble--7"></div>
        <div className="bubble bubble--8"></div>
        <div className="bubble bubble--9"></div>
        <div className="bubble bubble--10"></div>
        <div className="bubble bubble--11"></div>
        <div className="bubble bubble--12"></div>
        <main className='overflow-y-auto'>
          <GameHeader />
          <ConnectWalletScreen />
          <PlaceShipsScreen />
          <DeployGameScreen />
          <FindOtherPlayerScreen />
          <PlayingGameScreen />
          <EndGameScreen />
        </main>
      </div>
    </Provider>
  );
}
