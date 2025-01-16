import { useSelector } from 'react-redux';
import { selectSimulationMode } from '../services/store';

export default function GameHeader() {
  const simulationMode = useSelector(selectSimulationMode);

  return (
    <header className="bg-blue-950 w-full">
      <h1 className="text-white text-2xl text-center pt-4 pb-1">🚢 Sea Battle on Midnight 🚢</h1>
      <p className="text-white text-center pb-4">by Motrot, TheJan and eddex</p>
      {simulationMode ? (
        <p className="bg-yellow-400 text-center py-4 mb-4">Simulation Mode (without blockchain)</p>
      ) : null}
    </header>
  );
}
