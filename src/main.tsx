import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import './polyfills.ts';
import './index.css';
import App from './app.tsx';

// Ensure that the network IDs are set within the Midnight libraries.
setNetworkId(NetworkId.TestNet);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
