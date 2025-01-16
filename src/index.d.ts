import type { DAppConnectorAPI } from '@midnight-ntwrk/dapp-connector-api';

type MidnightJS = {
  mnLace: DAppConnectorAPI;
};

declare global {
  interface Window {
    midnight: MidnightJS;
  }
}

export {};
