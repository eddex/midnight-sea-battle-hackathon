import {
  createProverKey,
  createVerifierKey,
  createZKIR,
  ProverKey,
  VerifierKey,
  ZKConfigProvider,
  ZKIR,
} from '@midnight-ntwrk/midnight-js-types';

/**
 * ZKConfigProvider implementation that uses a simple browser fetch to get the needed binary
 * files for the Zero Knowledge Calculations.
 */
export class BrowserFetchZkConfigProvider<K extends string> extends ZKConfigProvider<K> {
  async getZKIR(circuitId: K extends string ? any : any): Promise<ZKIR> {
    const response = await fetch(`/zkir/${circuitId}.bzkir`);
    if (response.ok) {
      const zkirData = await response.arrayBuffer();
      return createZKIR(new Uint8Array(zkirData));
    }
    throw new Error(`ZKIR for circuit "${circuitId}" not found`);
  }
  async getProverKey(circuitId: K extends string ? any : any): Promise<ProverKey> {
    const response = await fetch(`/keys/${circuitId}.prover`);
    if (response.ok) {
      const proverKey = await response.arrayBuffer();
      return createProverKey(new Uint8Array(proverKey));
    }
    throw new Error(`ProverKey for circuit "${circuitId}" not found`);
  }

  async getVerifierKey(circuitId: K extends string ? any : any): Promise<VerifierKey> {
    const response = await fetch(`/keys/${circuitId}.verifier`);
    if (response.ok) {
      const verifierKey = await response.arrayBuffer();
      return createVerifierKey(new Uint8Array(verifierKey));
    }
    throw new Error(`VerifierKey for circuit "${circuitId}" not found`);
  }
}
