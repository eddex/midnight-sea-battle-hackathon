import { SigningKey } from "@midnight-ntwrk/compact-runtime";
import { PrivateStateProvider } from "@midnight-ntwrk/midnight-js-types";
import { PrivateStates } from "./contract-types";
import { uint8ToHex } from "./utils";
import { Buffer } from "buffer";

interface PrivateStateOptions {
  privateStateStoreName: string;
}

export const createlocalStoragePrivateStateProvider = (options: PrivateStateOptions): PrivateStateProvider<PrivateStates> => {
  return new LocalStoragePrivateStateProvider(options);
}

/**
 * Simple Private state provider for the Midnight SDK that uses the browser's local storage.
 */
class LocalStoragePrivateStateProvider implements PrivateStateProvider<PrivateStates> {
  storeName: string;

  constructor(options: PrivateStateOptions) {
    this.storeName = options.privateStateStoreName;
  }

  set<PSK extends string>(key: PSK, state: any): Promise<void> {
    console.log("SET: ", `${this.storeName}:${key}`, state);
    localStorage.setItem(`${this.storeName}:${key}`, this.serializeValue(state));
    return Promise.resolve();
  }
  get<PSK extends string>(key: PSK): Promise<any> {
    const value = localStorage.getItem(`${this.storeName}:${key}`);
    console.log("GET: ", `${this.storeName}:${key}`, value);
    return Promise.resolve(this.deserializeValue(value));
  }
  remove<PSK extends string>(key: PSK): Promise<void> {
    localStorage.removeItem(`${this.storeName}:${key}`);
    return Promise.resolve();
  }
  clear(): Promise<void> {
    localStorage.clear();
    return Promise.resolve();
  }
  setSigningKey<PSK extends string>(key: PSK, signingKey: SigningKey): Promise<void> {
    console.log("SET SIGNING KEY: ", `${this.storeName}:sk:${key}`, signingKey);
    localStorage.setItem(`${this.storeName}:sk:${key}`, this.serializeValue(signingKey));
    return Promise.resolve();
  }
  getSigningKey<PSK extends string>(key: PSK): Promise<SigningKey | null> {
    const value = localStorage.getItem(`${this.storeName}:sk:${key}`);
    console.log("GET SIGNING KEY: ", `${this.storeName}:sk:${key}`, value);
    return Promise.resolve(this.deserializeValue(value));
  }
  removeSigningKey<PSK extends string>(key: PSK): Promise<void> {
    localStorage.removeItem(`${this.storeName}:sk:${key}`);
    return Promise.resolve();
  }
  clearSigningKeys(): Promise<void> {
    localStorage.clear();
    return Promise.resolve();
  }

  private serializeValue(value: any): string {
    return JSON.stringify(value, customReplacer);
  }
  private deserializeValue(value: string | null): any {
    if (value === null) {
      return null;
    }
    return JSON.parse(value, customReviver);
  }
}

// Poor mans BigInt serialization and deserialization implementation because JSON.stringify and JSON.parse do not support BigInts.
// stolen solution from https://stackoverflow.com/questions/65152373/serialize-bigint-in-json

// also the poor mans solution for Uint8Array serialization :D

const UINT8PREFIX = "UINT8ARRAY:";

function customReplacer(_key: string, value: any): any {
  if (value instanceof Uint8Array) {
    return UINT8PREFIX + uint8ToHex(value);
  }
  if (typeof value === "bigint") {
    return value.toString() + 'n';
  }
  return value;
}

function customReviver(_key: string, value: any): any {
  if (typeof value === 'string' && value.startsWith(UINT8PREFIX)) {
    return Uint8Array.from(Buffer.from(value.slice(UINT8PREFIX.length), 'hex'));
  }
  if (typeof value === 'string' && /^\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  }
  return value;
}
