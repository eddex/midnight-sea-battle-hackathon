'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.7.0';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 102211695604070082112571065507755096754575920209623522239390234855480569854275933742834077002685857629445612735086326265689167708028928n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

var GAME_STATE;
(function (GAME_STATE) {
  GAME_STATE[GAME_STATE['waitForPlayer2'] = 0] = 'waitForPlayer2';
  GAME_STATE[GAME_STATE['playing'] = 1] = 'playing';
  GAME_STATE[GAME_STATE['ended'] = 2] = 'ended';
})(GAME_STATE = exports.GAME_STATE || (exports.GAME_STATE = {}));

var FIELD_STATE;
(function (FIELD_STATE) {
  FIELD_STATE[FIELD_STATE['unknown'] = 0] = 'unknown';
  FIELD_STATE[FIELD_STATE['hit'] = 1] = 'hit';
  FIELD_STATE[FIELD_STATE['miss'] = 2] = 'miss';
})(FIELD_STATE = exports.FIELD_STATE || (exports.FIELD_STATE = {}));

var PLAYER;
(function (PLAYER) {
  PLAYER[PLAYER['none'] = 0] = 'none';
  PLAYER[PLAYER['player1'] = 1] = 'player1';
  PLAYER[PLAYER['player2'] = 2] = 'player2';
})(PLAYER = exports.PLAYER || (exports.PLAYER = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeEnum(2, 1);

const _descriptor_2 = new __compactRuntime.CompactTypeEnum(2, 1);

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

const _descriptor_5 = new __compactRuntime.CompactTypeEnum(2, 1);

const _descriptor_6 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_7 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_8 = new __compactRuntime.CompactTypeVector(2, _descriptor_7);

const _descriptor_9 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_10 = new __compactRuntime.CompactTypeVector(2, _descriptor_8);

const _descriptor_11 = new __compactRuntime.CompactTypeVector(5, _descriptor_10);

const _descriptor_12 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value) {
    return {
      bytes: _descriptor_0.fromValue(value)
    }
  }
  toValue(value) {
    return _descriptor_0.toValue(value.bytes);
  }
}

const _descriptor_13 = new _ContractAddress_0();

class Contract {
  witnesses;
  constructor(...args) {
    if (args.length !== 1)
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args.length}`);
    const witnesses = args[0];
    if (typeof(witnesses) !== 'object')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    if (typeof(witnesses.local_secret_key) !== 'function')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named local_secret_key');
    if (typeof(witnesses.ships) !== 'function')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named ships');
    this.witnesses = witnesses;
    this.circuits = {
      joinGame: (...args_0) => {
        if (args_0.length !== 3)
          throw new __compactRuntime.CompactError(`joinGame: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        const targetX = args_0[1];
        const targetY = args_0[2];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('joinGame',
                                      'argument 1 (as invoked from Typescript)',
                                      './src/contract/battleships.compact line 52, char 1',
                                      'CircuitContext',
                                      contextOrig)
        if (!(typeof(targetX) === 'bigint' && targetX >= 0 && targetX <= 255n))
          __compactRuntime.type_error('joinGame',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      './src/contract/battleships.compact line 52, char 1',
                                      'Uint<0..255>',
                                      targetX)
        if (!(typeof(targetY) === 'bigint' && targetY >= 0 && targetY <= 255n))
          __compactRuntime.type_error('joinGame',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      './src/contract/battleships.compact line 52, char 1',
                                      'Uint<0..255>',
                                      targetY)
        const context = { ...contextOrig };
        const partialProofData = {
          input: {
            value: _descriptor_7.toValue(targetX).concat(_descriptor_7.toValue(targetY)),
            alignment: _descriptor_7.alignment().concat(_descriptor_7.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_joinGame_0(context,
                                         partialProofData,
                                         targetX,
                                         targetY);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result, context: context, proofData: partialProofData };
      },
      shoot: (...args_0) => {
        if (args_0.length !== 4)
          throw new __compactRuntime.CompactError(`shoot: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        const isPlayerOneCalling = args_0[1];
        const targetX = args_0[2];
        const targetY = args_0[3];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('shoot',
                                      'argument 1 (as invoked from Typescript)',
                                      './src/contract/battleships.compact line 64, char 1',
                                      'CircuitContext',
                                      contextOrig)
        if (!(typeof(isPlayerOneCalling) === 'boolean'))
          __compactRuntime.type_error('shoot',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      './src/contract/battleships.compact line 64, char 1',
                                      'Boolean',
                                      isPlayerOneCalling)
        if (!(typeof(targetX) === 'bigint' && targetX >= 0 && targetX <= 255n))
          __compactRuntime.type_error('shoot',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      './src/contract/battleships.compact line 64, char 1',
                                      'Uint<0..255>',
                                      targetX)
        if (!(typeof(targetY) === 'bigint' && targetY >= 0 && targetY <= 255n))
          __compactRuntime.type_error('shoot',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      './src/contract/battleships.compact line 64, char 1',
                                      'Uint<0..255>',
                                      targetY)
        const context = { ...contextOrig };
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(isPlayerOneCalling).concat(_descriptor_7.toValue(targetX).concat(_descriptor_7.toValue(targetY))),
            alignment: _descriptor_6.alignment().concat(_descriptor_7.alignment().concat(_descriptor_7.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_shoot_0(context,
                                      partialProofData,
                                      isPlayerOneCalling,
                                      targetX,
                                      targetY);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result, context: context, proofData: partialProofData };
      },
      public_key: (...args_0) => {
        if (args_0.length !== 3)
          throw new __compactRuntime.CompactError(`public_key: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
        const contextOrig = args_0[0];
        const secret_key = args_0[1];
        const ships = args_0[2];
        if (!(typeof(contextOrig) === 'object' && contextOrig.originalState != undefined && contextOrig.transactionContext != undefined))
          __compactRuntime.type_error('public_key',
                                      'argument 1 (as invoked from Typescript)',
                                      './src/contract/battleships.compact line 152, char 1',
                                      'CircuitContext',
                                      contextOrig)
        if (!(secret_key.buffer instanceof ArrayBuffer && secret_key.BYTES_PER_ELEMENT === 1 && secret_key.length === 32))
          __compactRuntime.type_error('public_key',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      './src/contract/battleships.compact line 152, char 1',
                                      'Bytes<32>',
                                      secret_key)
        if (!(Array.isArray(ships) && ships.length === 5 && ships.every((t) => Array.isArray(t) && t.length === 2 && t.every((t) => Array.isArray(t) && t.length === 2 && t.every((t) => typeof(t) === 'bigint' && t >= 0 && t <= 255n)))))
          __compactRuntime.type_error('public_key',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      './src/contract/battleships.compact line 152, char 1',
                                      'Vector<5, Vector<2, Vector<2, Uint<0..255>>>>',
                                      ships)
        const context = { ...contextOrig };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(secret_key).concat(_descriptor_11.toValue(ships)),
            alignment: _descriptor_0.alignment().concat(_descriptor_11.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result = this.#_public_key_0(context,
                                           partialProofData,
                                           secret_key,
                                           ships);
        partialProofData.output = { value: _descriptor_0.toValue(result), alignment: _descriptor_0.alignment() };
        return { result: result, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      joinGame: this.circuits.joinGame,
      shoot: this.circuits.shoot
    };
  }
  initialState(...args) {
    if (args.length !== 1)
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args.length}`);
    const constructorContext = args[0];
    if (typeof(constructorContext) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state = new __compactRuntime.ContractState();
    let stateValue = __compactRuntime.StateValue.newArray();
    let stateValue_1 = __compactRuntime.StateValue.newArray();
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue = stateValue.arrayPush(stateValue_1);
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue = stateValue.arrayPush(stateValue_0);
    state.data = stateValue;
    state.setOperation('joinGame', new __compactRuntime.ContractOperation());
    state.setOperation('shoot', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state,
      currentPrivateState: constructorContext.initialPrivateState,
      currentZswapLocalState: constructorContext.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(0n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(false),
                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(1n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(false),
                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(2n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(3n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                            alignment: _descriptor_9.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(4n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(5n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(6n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(7n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(8n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(9n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                            alignment: _descriptor_9.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(10n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                            alignment: _descriptor_9.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(11n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(12n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(new Array(2).fill(0n)),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(13n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(false),
                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(14n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(false),
                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ])
    __compactRuntime.assert(this.#_checkShipPlacementValid_0(context,
                                                             partialProofData,
                                                             this.#_ships_0(context,
                                                                            partialProofData)),
                            'Invalid ship placement');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(2n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(11n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(4n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    this.#_folder_0(context,
                    partialProofData,
                    ((context, partialProofData, t, i) =>
                     {
                       const tmp = i;
                       Contract._query(context,
                                       partialProofData,
                                       [
                                        { idx: { cached: false,
                                                 pushPath: true,
                                                 path: [
                                                        { tag: 'value',
                                                          value: { value: _descriptor_7.toValue(1n),
                                                                   alignment: _descriptor_7.alignment() } },
                                                        { tag: 'value',
                                                          value: { value: _descriptor_7.toValue(7n),
                                                                   alignment: _descriptor_7.alignment() } }
                                                       ] } },
                                        { push: { storage: false,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp),
                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                        { push: { storage: true,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0),
                                                                                               alignment: _descriptor_5.alignment() }).encode() } },
                                        { ins: { cached: false, n: 1 } },
                                        { ins: { cached: true, n: 2 } }
                                       ]);
                       const tmp_0 = i;
                       Contract._query(context,
                                       partialProofData,
                                       [
                                        { idx: { cached: false,
                                                 pushPath: true,
                                                 path: [
                                                        { tag: 'value',
                                                          value: { value: _descriptor_7.toValue(1n),
                                                                   alignment: _descriptor_7.alignment() } },
                                                        { tag: 'value',
                                                          value: { value: _descriptor_7.toValue(8n),
                                                                   alignment: _descriptor_7.alignment() } }
                                                       ] } },
                                        { push: { storage: false,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                        { push: { storage: true,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0),
                                                                                               alignment: _descriptor_5.alignment() }).encode() } },
                                        { ins: { cached: false, n: 1 } },
                                        { ins: { cached: true, n: 2 } }
                                       ]);
                       return t;
                     }),
                    false,
                    [0n,
                     1n,
                     2n,
                     3n,
                     4n,
                     5n,
                     6n,
                     7n,
                     8n,
                     9n,
                     10n,
                     11n,
                     12n,
                     13n,
                     14n,
                     15n,
                     16n,
                     17n,
                     18n,
                     19n,
                     20n,
                     21n,
                     22n,
                     23n,
                     24n,
                     25n,
                     26n,
                     27n,
                     28n,
                     29n,
                     30n,
                     31n,
                     32n,
                     33n,
                     34n,
                     35n,
                     36n,
                     37n,
                     38n,
                     39n,
                     40n,
                     41n,
                     42n,
                     43n,
                     44n,
                     45n,
                     46n,
                     47n,
                     48n,
                     49n,
                     50n,
                     51n,
                     52n,
                     53n,
                     54n,
                     55n,
                     56n,
                     57n,
                     58n,
                     59n,
                     60n,
                     61n,
                     62n,
                     63n,
                     64n,
                     65n,
                     66n,
                     67n,
                     68n,
                     69n,
                     70n,
                     71n,
                     72n,
                     73n,
                     74n,
                     75n,
                     76n,
                     77n,
                     78n,
                     79n,
                     80n,
                     81n,
                     82n,
                     83n,
                     84n,
                     85n,
                     86n,
                     87n,
                     88n,
                     89n,
                     90n,
                     91n,
                     92n,
                     93n,
                     94n,
                     95n,
                     96n,
                     97n,
                     98n,
                     99n]);
    const tmp_1 = this.#_public_key_0(context,
                                      partialProofData,
                                      this.#_local_secret_key_0(context,
                                                                partialProofData),
                                      this.#_ships_0(context, partialProofData));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(5n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    state.data = context.transactionContext.state;
    return {
      currentContractState: state,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  #_persistent_hash_0(context, partialProofData, value) {
    const result = __compactRuntime.persistentHash(_descriptor_12, value);
    return result;
  }
  #_persistent_hash_1(context, partialProofData, value) {
    const result = __compactRuntime.persistentHash(_descriptor_11, value);
    return result;
  }
  #_checkShipPlacementValid_0(context, partialProofData, ships) {
    this.#_folder_1(context,
                    partialProofData,
                    ((context, partialProofData, t, i) =>
                     {
                       const tmp = i;
                       Contract._query(context,
                                       partialProofData,
                                       [
                                        { idx: { cached: false,
                                                 pushPath: true,
                                                 path: [
                                                        { tag: 'value',
                                                          value: { value: _descriptor_7.toValue(0n),
                                                                   alignment: _descriptor_7.alignment() } },
                                                        { tag: 'value',
                                                          value: { value: _descriptor_7.toValue(0n),
                                                                   alignment: _descriptor_7.alignment() } }
                                                       ] } },
                                        { push: { storage: false,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp),
                                                                                               alignment: _descriptor_7.alignment() }).encode() } },
                                        { push: { storage: true,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(false),
                                                                                               alignment: _descriptor_6.alignment() }).encode() } },
                                        { ins: { cached: false, n: 1 } },
                                        { ins: { cached: true, n: 2 } }
                                       ]);
                       return t;
                     }),
                    false,
                    [0n, 1n, 2n, 3n, 4n]);
    this.#_folder_3(context,
                    partialProofData,
                    ((context, partialProofData, t_0, ship) =>
                     {
                       if (!this.#_isShipFullyInsideBoard_0(context,
                                                            partialProofData,
                                                            ship))
                       {
                         false;
                       } else {
                         const startPositionOfShipX = ship[0][0];
                         const startPositionOfShipY = ship[0][1];
                         const endPositionOfShipX = ship[1][0];
                         const endPositionOfShipY = ship[1][1];
                         const lengthX = (__compactRuntime.assert(!(endPositionOfShipX
                                                                    <
                                                                    startPositionOfShipX),
                                                                  'result of subtraction would be negative'),
                                          endPositionOfShipX
                                          -
                                          startPositionOfShipX)
                                         +
                                         1n;
                         const lengthY = (__compactRuntime.assert(!(endPositionOfShipY
                                                                    <
                                                                    startPositionOfShipY),
                                                                  'result of subtraction would be negative'),
                                          endPositionOfShipY
                                          -
                                          startPositionOfShipY)
                                         +
                                         1n;
                         const length = this.#_equal_0(lengthX, 1n)?
                                        lengthY :
                                        lengthX;
                         Contract._query(context,
                                         partialProofData,
                                         [
                                          { idx: { cached: false,
                                                   pushPath: true,
                                                   path: [
                                                          { tag: 'value',
                                                            value: { value: _descriptor_7.toValue(1n),
                                                                     alignment: _descriptor_7.alignment() } }
                                                         ] } },
                                          { push: { storage: false,
                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                                                 alignment: _descriptor_7.alignment() }).encode() } },
                                          { push: { storage: true,
                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(false),
                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                          { ins: { cached: false, n: 1 } },
                                          { ins: { cached: true, n: 1 } }
                                         ]);
                         this.#_folder_2(context,
                                         partialProofData,
                                         ((context, partialProofData, t_1, i_0) =>
                                          {
                                            const expectedLenght = this.#_equal_1(i_0,
                                                                                  0n)?
                                                                   5n :
                                                                   this.#_equal_2(i_0,
                                                                                  1n)?
                                                                   4n :
                                                                   this.#_equal_3(i_0,
                                                                                  2n)
                                                                   ||
                                                                   this.#_equal_4(i_0,
                                                                                  3n)?
                                                                   3n :
                                                                   2n;
                                            let tmp_0;
                                            if (this.#_equal_5(length,
                                                               expectedLenght)
                                                &&
                                                !(tmp_0 = i_0,
                                                  _descriptor_6.fromValue(Contract._query(context,
                                                                                          partialProofData,
                                                                                          [
                                                                                           { dup: { n: 0 } },
                                                                                           { idx: { cached: false,
                                                                                                    pushPath: false,
                                                                                                    path: [
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_7.toValue(0n),
                                                                                                                      alignment: _descriptor_7.alignment() } },
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_7.toValue(0n),
                                                                                                                      alignment: _descriptor_7.alignment() } }
                                                                                                          ] } },
                                                                                           { idx: { cached: false,
                                                                                                    pushPath: false,
                                                                                                    path: [
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_7.toValue(tmp_0),
                                                                                                                      alignment: _descriptor_7.alignment() } }
                                                                                                          ] } },
                                                                                           { popeq: { cached: false,
                                                                                                      result: undefined } }
                                                                                          ]).value)))
                                            {
                                              const tmp_1 = i_0;
                                              Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { idx: { cached: false,
                                                                        pushPath: true,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_7.toValue(0n),
                                                                                          alignment: _descriptor_7.alignment() } },
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_7.toValue(0n),
                                                                                          alignment: _descriptor_7.alignment() } }
                                                                              ] } },
                                                               { push: { storage: false,
                                                                         value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_1),
                                                                                                                      alignment: _descriptor_7.alignment() }).encode() } },
                                                               { push: { storage: true,
                                                                         value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(true),
                                                                                                                      alignment: _descriptor_6.alignment() }).encode() } },
                                                               { ins: { cached: false,
                                                                        n: 1 } },
                                                               { ins: { cached: true,
                                                                        n: 2 } }
                                                              ]);
                                              Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { idx: { cached: false,
                                                                        pushPath: true,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_7.toValue(1n),
                                                                                          alignment: _descriptor_7.alignment() } }
                                                                              ] } },
                                                               { push: { storage: false,
                                                                         value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                                                                      alignment: _descriptor_7.alignment() }).encode() } },
                                                               { push: { storage: true,
                                                                         value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(true),
                                                                                                                      alignment: _descriptor_6.alignment() }).encode() } },
                                                               { ins: { cached: false,
                                                                        n: 1 } },
                                                               { ins: { cached: true,
                                                                        n: 1 } }
                                                              ]);
                                            }
                                            return t_1;
                                          }),
                                         false,
                                         [0n, 1n, 2n, 3n, 4n]);
                         if (!_descriptor_6.fromValue(Contract._query(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_7.toValue(1n),
                                                                                                  alignment: _descriptor_7.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_7.toValue(0n),
                                                                                                  alignment: _descriptor_7.alignment() } }
                                                                                      ] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }
                                                                      ]).value))
                         {
                           false;
                         } else {
                           if (!(this.#_equal_6(lengthX, 1n)
                                 &&
                                 !this.#_equal_7(lengthY, 1n)
                                 ||
                                 this.#_equal_8(lengthY, 1n)
                                 &&
                                 !this.#_equal_9(lengthY, 1n)))
                           {
                             false;
                           }
                         }
                       }
                       return t_0;
                     }),
                    false,
                    ships);
    this.#_folder_4(context,
                    partialProofData,
                    ((context, partialProofData, t_2, i_1) =>
                     {
                       let tmp_2;
                       if (!(tmp_2 = i_1,
                             _descriptor_6.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_7.toValue(0n),
                                                                                                 alignment: _descriptor_7.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_7.toValue(0n),
                                                                                                 alignment: _descriptor_7.alignment() } }
                                                                                     ] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_7.toValue(tmp_2),
                                                                                                 alignment: _descriptor_7.alignment() } }
                                                                                     ] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }
                                                                     ]).value)))
                       {
                         false;
                       }
                       return t_2;
                     }),
                    false,
                    [0n, 1n, 2n, 3n, 4n]);
    return this.#_areShipsNotOverlappingOptimized_0(context,
                                                    partialProofData,
                                                    ships);
  }
  #_isShipFullyInsideBoard_0(context, partialProofData, ship) {
    if (!(ship[0][0] < 10n) || !(ship[0][1] < 10n)) {
      return false;
    } else {
      return !(!(ship[1][0] < 10n) || !(ship[1][1] < 10n));
    }
  }
  #_areShipsNotOverlappingOptimized_0(context, partialProofData, ships) {
    return !(this.#_shipOverlapping_0(context,
                                      partialProofData,
                                      ships[0],
                                      ships[1])
             ||
             this.#_shipOverlapping_0(context,
                                      partialProofData,
                                      ships[0],
                                      ships[2])
             ||
             this.#_shipOverlapping_0(context,
                                      partialProofData,
                                      ships[0],
                                      ships[3])
             ||
             this.#_shipOverlapping_0(context,
                                      partialProofData,
                                      ships[0],
                                      ships[4])
             ||
             this.#_shipOverlapping_0(context,
                                      partialProofData,
                                      ships[1],
                                      ships[2])
             ||
             this.#_shipOverlapping_0(context,
                                      partialProofData,
                                      ships[1],
                                      ships[3])
             ||
             this.#_shipOverlapping_0(context,
                                      partialProofData,
                                      ships[1],
                                      ships[4])
             ||
             this.#_shipOverlapping_0(context,
                                      partialProofData,
                                      ships[2],
                                      ships[3])
             ||
             this.#_shipOverlapping_0(context,
                                      partialProofData,
                                      ships[2],
                                      ships[4])
             ||
             this.#_shipOverlapping_0(context,
                                      partialProofData,
                                      ships[3],
                                      ships[4]));
  }
  #_shipOverlapping_0(context, partialProofData, ship1, ship2) {
    const startPositionOfShipX = ship1[0][0];
    const startPositionOfShipY = ship1[0][1];
    const endPositionOfShipX = ship1[1][0];
    const endPositionOfShipY = ship1[1][1];
    const otherStartPositionOfShipX = ship2[0][0];
    const otherStartPositionOfShipY = ship2[0][1];
    const otherEndPositionOfShipX = ship2[1][0];
    const otherEndPositionOfShipY = ship2[1][1];
    return !(startPositionOfShipX < otherStartPositionOfShipX)
           &&
           !(otherEndPositionOfShipX < startPositionOfShipX)
           &&
           !(startPositionOfShipY < otherStartPositionOfShipY)
           &&
           !(otherEndPositionOfShipY < startPositionOfShipY)
           &&
           true;
  }
  #_local_secret_key_0(context, partialProofData) {
    const witnessContext = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState, result] = this.witnesses.local_secret_key(witnessContext);
    context.currentPrivateState = nextPrivateState;
    if (!(result.buffer instanceof ArrayBuffer && result.BYTES_PER_ELEMENT === 1 && result.length === 32))
      __compactRuntime.type_error('local_secret_key',
                                  'return value',
                                  './src/contract/battleships.compact line 44, char 1',
                                  'Bytes<32>',
                                  result)
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result),
      alignment: _descriptor_0.alignment()
    });
    return result;
  }
  #_ships_0(context, partialProofData) {
    const witnessContext = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState, result] = this.witnesses.ships(witnessContext);
    context.currentPrivateState = nextPrivateState;
    if (!(Array.isArray(result) && result.length === 5 && result.every((t) => Array.isArray(t) && t.length === 2 && t.every((t) => Array.isArray(t) && t.length === 2 && t.every((t) => typeof(t) === 'bigint' && t >= 0 && t <= 255n)))))
      __compactRuntime.type_error('ships',
                                  'return value',
                                  './src/contract/battleships.compact line 47, char 1',
                                  'Vector<5, Vector<2, Vector<2, Uint<0..255>>>>',
                                  result)
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_11.toValue(result),
      alignment: _descriptor_11.alignment()
    });
    return result;
  }
  #_joinGame_0(context, partialProofData, targetX, targetY) {
    __compactRuntime.assert(_descriptor_1.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_7.toValue(1n),
                                                                                                alignment: _descriptor_7.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_7.toValue(2n),
                                                                                                alignment: _descriptor_7.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            0,
                            "Can't join game in current game state");
    __compactRuntime.assert(this.#_checkShipPlacementValid_0(context,
                                                             partialProofData,
                                                             this.#_ships_0(context,
                                                                            partialProofData)),
                            'Invalid ship placement');
    const tmp = this.#_public_key_0(context,
                                    partialProofData,
                                    this.#_local_secret_key_0(context,
                                                              partialProofData),
                                    this.#_ships_0(context, partialProofData));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(6n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(2n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(1),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    const tmp_0 = [targetX, targetY];
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(12n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    const tmp_1 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(3n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_3.toValue(tmp_1),
                                              alignment: _descriptor_3.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }
                    ]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(11n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
  }
  #_shoot_0(context, partialProofData, isPlayerOneCalling, targetX, targetY) {
    __compactRuntime.assert(_descriptor_1.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_7.toValue(1n),
                                                                                                alignment: _descriptor_7.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_7.toValue(2n),
                                                                                                alignment: _descriptor_7.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            1,
                            "Can't shoot in current game state");
    __compactRuntime.assert(isPlayerOneCalling
                            &&
                            _descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_7.toValue(1n),
                                                                                                alignment: _descriptor_7.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_7.toValue(11n),
                                                                                                alignment: _descriptor_7.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            1
                            ||
                            !isPlayerOneCalling
                            &&
                            _descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_7.toValue(1n),
                                                                                                alignment: _descriptor_7.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_7.toValue(11n),
                                                                                                alignment: _descriptor_7.alignment() } }
                                                                                    ] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }
                                                                    ]).value)
                            ===
                            2,
                            'Not your turn');
    __compactRuntime.assert(isPlayerOneCalling
                            &&
                            this.#_equal_10(_descriptor_0.fromValue(Contract._query(context,
                                                                                    partialProofData,
                                                                                    [
                                                                                     { dup: { n: 0 } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_7.toValue(1n),
                                                                                                                alignment: _descriptor_7.alignment() } },
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_7.toValue(5n),
                                                                                                                alignment: _descriptor_7.alignment() } }
                                                                                                    ] } },
                                                                                     { popeq: { cached: false,
                                                                                                result: undefined } }
                                                                                    ]).value),
                                            this.#_public_key_0(context,
                                                                partialProofData,
                                                                this.#_local_secret_key_0(context,
                                                                                          partialProofData),
                                                                this.#_ships_0(context,
                                                                               partialProofData)))
                            ||
                            !isPlayerOneCalling
                            &&
                            this.#_equal_11(_descriptor_0.fromValue(Contract._query(context,
                                                                                    partialProofData,
                                                                                    [
                                                                                     { dup: { n: 0 } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_7.toValue(1n),
                                                                                                                alignment: _descriptor_7.alignment() } },
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_7.toValue(6n),
                                                                                                                alignment: _descriptor_7.alignment() } }
                                                                                                    ] } },
                                                                                     { popeq: { cached: false,
                                                                                                result: undefined } }
                                                                                    ]).value),
                                            this.#_public_key_0(context,
                                                                partialProofData,
                                                                this.#_local_secret_key_0(context,
                                                                                          partialProofData),
                                                                this.#_ships_0(context,
                                                                               partialProofData))),
                            'Invalid player signature');
    const lastShotX = _descriptor_8.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_7.toValue(1n),
                                                                                          alignment: _descriptor_7.alignment() } },
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_7.toValue(12n),
                                                                                          alignment: _descriptor_7.alignment() } }
                                                                              ] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }
                                                              ]).value)[0];
    const lastShotY = _descriptor_8.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_7.toValue(1n),
                                                                                          alignment: _descriptor_7.alignment() } },
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_7.toValue(12n),
                                                                                          alignment: _descriptor_7.alignment() } }
                                                                              ] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }
                                                              ]).value)[1];
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(13n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(false),
                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    this.#_folder_6(context,
                    partialProofData,
                    ((context, partialProofData, t, ship) =>
                     {
                       const startPositionOfShipX = ship[0][0];
                       const startPositionOfShipY = ship[0][1];
                       const endPositionOfShipX = ship[1][0];
                       const endPositionOfShipY = ship[1][1];
                       Contract._query(context,
                                       partialProofData,
                                       [
                                        { idx: { cached: false,
                                                 pushPath: true,
                                                 path: [
                                                        { tag: 'value',
                                                          value: { value: _descriptor_7.toValue(1n),
                                                                   alignment: _descriptor_7.alignment() } }
                                                       ] } },
                                        { push: { storage: false,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(14n),
                                                                                               alignment: _descriptor_7.alignment() }).encode() } },
                                        { push: { storage: true,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(true),
                                                                                               alignment: _descriptor_6.alignment() }).encode() } },
                                        { ins: { cached: false, n: 1 } },
                                        { ins: { cached: true, n: 1 } }
                                       ]);
                       if (!(lastShotX < startPositionOfShipX)
                           &&
                           !(endPositionOfShipX < lastShotX)
                           &&
                           !(lastShotY < startPositionOfShipY)
                           &&
                           !(endPositionOfShipY < lastShotY))
                       {
                         if (isPlayerOneCalling) {
                           const tmp = lastShotX * 10n + lastShotY;
                           Contract._query(context,
                                           partialProofData,
                                           [
                                            { idx: { cached: false,
                                                     pushPath: true,
                                                     path: [
                                                            { tag: 'value',
                                                              value: { value: _descriptor_7.toValue(1n),
                                                                       alignment: _descriptor_7.alignment() } },
                                                            { tag: 'value',
                                                              value: { value: _descriptor_7.toValue(7n),
                                                                       alignment: _descriptor_7.alignment() } }
                                                           ] } },
                                            { push: { storage: false,
                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp),
                                                                                                   alignment: _descriptor_4.alignment() }).encode() } },
                                            { push: { storage: true,
                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(1),
                                                                                                   alignment: _descriptor_5.alignment() }).encode() } },
                                            { ins: { cached: false, n: 1 } },
                                            { ins: { cached: true, n: 2 } }
                                           ]);
                         } else {
                           const tmp_0 = lastShotX * 10n + lastShotY;
                           Contract._query(context,
                                           partialProofData,
                                           [
                                            { idx: { cached: false,
                                                     pushPath: true,
                                                     path: [
                                                            { tag: 'value',
                                                              value: { value: _descriptor_7.toValue(1n),
                                                                       alignment: _descriptor_7.alignment() } },
                                                            { tag: 'value',
                                                              value: { value: _descriptor_7.toValue(8n),
                                                                       alignment: _descriptor_7.alignment() } }
                                                           ] } },
                                            { push: { storage: false,
                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                   alignment: _descriptor_4.alignment() }).encode() } },
                                            { push: { storage: true,
                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(1),
                                                                                                   alignment: _descriptor_5.alignment() }).encode() } },
                                            { ins: { cached: false, n: 1 } },
                                            { ins: { cached: true, n: 2 } }
                                           ]);
                         }
                         Contract._query(context,
                                         partialProofData,
                                         [
                                          { idx: { cached: false,
                                                   pushPath: true,
                                                   path: [
                                                          { tag: 'value',
                                                            value: { value: _descriptor_7.toValue(1n),
                                                                     alignment: _descriptor_7.alignment() } }
                                                         ] } },
                                          { push: { storage: false,
                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(13n),
                                                                                                 alignment: _descriptor_7.alignment() }).encode() } },
                                          { push: { storage: true,
                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(true),
                                                                                                 alignment: _descriptor_6.alignment() }).encode() } },
                                          { ins: { cached: false, n: 1 } },
                                          { ins: { cached: true, n: 1 } }
                                         ]);
                         const lengthX = (__compactRuntime.assert(!(endPositionOfShipX
                                                                    <
                                                                    startPositionOfShipX),
                                                                  'result of subtraction would be negative'),
                                          endPositionOfShipX
                                          -
                                          startPositionOfShipX)
                                         +
                                         1n;
                         const lengthY = (__compactRuntime.assert(!(endPositionOfShipY
                                                                    <
                                                                    startPositionOfShipY),
                                                                  'result of subtraction would be negative'),
                                          endPositionOfShipY
                                          -
                                          startPositionOfShipY)
                                         +
                                         1n;
                         const length = this.#_equal_12(lengthX, 1n)?
                                        lengthY :
                                        lengthX;
                         this.#_folder_5(context,
                                         partialProofData,
                                         ((context, partialProofData, t_0, i) =>
                                          {
                                            if (i < length) {
                                              const x = this.#_equal_13(lengthX,
                                                                        1n)?
                                                        startPositionOfShipX :
                                                        startPositionOfShipX + i;
                                              const y = this.#_equal_14(lengthY,
                                                                        1n)?
                                                        startPositionOfShipY :
                                                        startPositionOfShipY + i;
                                              if (isPlayerOneCalling) {
                                                let tmp_1;
                                                if ((tmp_1 = x * 10n + y,
                                                     _descriptor_5.fromValue(Contract._query(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 0 } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_7.toValue(1n),
                                                                                                                         alignment: _descriptor_7.alignment() } },
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_7.toValue(7n),
                                                                                                                         alignment: _descriptor_7.alignment() } }
                                                                                                             ] } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_4.toValue(tmp_1),
                                                                                                                         alignment: _descriptor_4.alignment() } }
                                                                                                             ] } },
                                                                                              { popeq: { cached: false,
                                                                                                         result: undefined } }
                                                                                             ]).value))
                                                    ===
                                                    0)
                                                {
                                                  Contract._query(context,
                                                                  partialProofData,
                                                                  [
                                                                   { idx: { cached: false,
                                                                            pushPath: true,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_7.toValue(1n),
                                                                                              alignment: _descriptor_7.alignment() } }
                                                                                  ] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(14n),
                                                                                                                          alignment: _descriptor_7.alignment() }).encode() } },
                                                                   { push: { storage: true,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(false),
                                                                                                                          alignment: _descriptor_6.alignment() }).encode() } },
                                                                   { ins: { cached: false,
                                                                            n: 1 } },
                                                                   { ins: { cached: true,
                                                                            n: 1 } }
                                                                  ]);
                                                }
                                              } else {
                                                let tmp_2;
                                                if ((tmp_2 = x * 10n + y,
                                                     _descriptor_5.fromValue(Contract._query(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 0 } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_7.toValue(1n),
                                                                                                                         alignment: _descriptor_7.alignment() } },
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_7.toValue(8n),
                                                                                                                         alignment: _descriptor_7.alignment() } }
                                                                                                             ] } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_4.toValue(tmp_2),
                                                                                                                         alignment: _descriptor_4.alignment() } }
                                                                                                             ] } },
                                                                                              { popeq: { cached: false,
                                                                                                         result: undefined } }
                                                                                             ]).value))
                                                    ===
                                                    0)
                                                {
                                                  Contract._query(context,
                                                                  partialProofData,
                                                                  [
                                                                   { idx: { cached: false,
                                                                            pushPath: true,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_7.toValue(1n),
                                                                                              alignment: _descriptor_7.alignment() } }
                                                                                  ] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(14n),
                                                                                                                          alignment: _descriptor_7.alignment() }).encode() } },
                                                                   { push: { storage: true,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(false),
                                                                                                                          alignment: _descriptor_6.alignment() }).encode() } },
                                                                   { ins: { cached: false,
                                                                            n: 1 } },
                                                                   { ins: { cached: true,
                                                                            n: 1 } }
                                                                  ]);
                                                }
                                              }
                                            }
                                            return t_0;
                                          }),
                                         false,
                                         [0n, 1n, 2n, 3n, 4n]);
                         if (_descriptor_6.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_7.toValue(1n),
                                                                                                 alignment: _descriptor_7.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_7.toValue(14n),
                                                                                                 alignment: _descriptor_7.alignment() } }
                                                                                     ] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }
                                                                     ]).value))
                         {
                           if (isPlayerOneCalling) {
                             const tmp_3 = 1n;
                             Contract._query(context,
                                             partialProofData,
                                             [
                                              { idx: { cached: false,
                                                       pushPath: true,
                                                       path: [
                                                              { tag: 'value',
                                                                value: { value: _descriptor_7.toValue(1n),
                                                                         alignment: _descriptor_7.alignment() } },
                                                              { tag: 'value',
                                                                value: { value: _descriptor_7.toValue(9n),
                                                                         alignment: _descriptor_7.alignment() } }
                                                             ] } },
                                              { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                                     { value: _descriptor_3.toValue(tmp_3),
                                                                       alignment: _descriptor_3.alignment() }
                                                                       .value
                                                                   )) } },
                                              { ins: { cached: true, n: 2 } }
                                             ]);
                           } else {
                             const tmp_4 = 1n;
                             Contract._query(context,
                                             partialProofData,
                                             [
                                              { idx: { cached: false,
                                                       pushPath: true,
                                                       path: [
                                                              { tag: 'value',
                                                                value: { value: _descriptor_7.toValue(1n),
                                                                         alignment: _descriptor_7.alignment() } },
                                                              { tag: 'value',
                                                                value: { value: _descriptor_7.toValue(10n),
                                                                         alignment: _descriptor_7.alignment() } }
                                                             ] } },
                                              { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                                     { value: _descriptor_3.toValue(tmp_4),
                                                                       alignment: _descriptor_3.alignment() }
                                                                       .value
                                                                   )) } },
                                              { ins: { cached: true, n: 2 } }
                                             ]);
                           }
                         }
                       }
                       return t;
                     }),
                    false,
                    this.#_ships_0(context, partialProofData));
    if (_descriptor_6.fromValue(Contract._query(context,
                                                partialProofData,
                                                [
                                                 { dup: { n: 0 } },
                                                 { idx: { cached: false,
                                                          pushPath: false,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_7.toValue(1n),
                                                                            alignment: _descriptor_7.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_7.toValue(13n),
                                                                            alignment: _descriptor_7.alignment() } }
                                                                ] } },
                                                 { popeq: { cached: false,
                                                            result: undefined } }
                                                ]).value)
        ===
        false)
    {
      if (isPlayerOneCalling) {
        const tmp_5 = lastShotX * 10n + lastShotY;
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_7.toValue(1n),
                                                    alignment: _descriptor_7.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_7.toValue(7n),
                                                    alignment: _descriptor_7.alignment() } }
                                        ] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_5),
                                                                                alignment: _descriptor_4.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(2),
                                                                                alignment: _descriptor_5.alignment() }).encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 2 } }
                        ]);
      } else {
        const tmp_6 = lastShotX * 10n + lastShotY;
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_7.toValue(1n),
                                                    alignment: _descriptor_7.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_7.toValue(8n),
                                                    alignment: _descriptor_7.alignment() } }
                                        ] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_6),
                                                                                alignment: _descriptor_4.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(2),
                                                                                alignment: _descriptor_5.alignment() }).encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 2 } }
                        ]);
      }
    }
    const tmp_7 = [targetX, targetY];
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(12n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_7),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    const tmp_8 = isPlayerOneCalling? 2 : 1;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(11n),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_8),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }
                    ]);
    const tmp_9 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(1n),
                                                alignment: _descriptor_7.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_7.toValue(3n),
                                                alignment: _descriptor_7.alignment() } }
                                    ] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_3.toValue(tmp_9),
                                              alignment: _descriptor_3.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }
                    ]);
    const NUMBER_OF_SHIPS = 5n;
    if (!(_descriptor_9.fromValue(Contract._query(context,
                                                  partialProofData,
                                                  [
                                                   { dup: { n: 0 } },
                                                   { idx: { cached: false,
                                                            pushPath: false,
                                                            path: [
                                                                   { tag: 'value',
                                                                     value: { value: _descriptor_7.toValue(1n),
                                                                              alignment: _descriptor_7.alignment() } },
                                                                   { tag: 'value',
                                                                     value: { value: _descriptor_7.toValue(9n),
                                                                              alignment: _descriptor_7.alignment() } }
                                                                  ] } },
                                                   { popeq: { cached: true,
                                                              result: undefined } }
                                                  ]).value)
          <
          NUMBER_OF_SHIPS))
    {
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_7.toValue(1n),
                                                  alignment: _descriptor_7.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(4n),
                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(2),
                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_7.toValue(1n),
                                                  alignment: _descriptor_7.alignment() } }
                                      ] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(2n),
                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(2),
                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }
                      ]);
    } else {
      if (!(_descriptor_9.fromValue(Contract._query(context,
                                                    partialProofData,
                                                    [
                                                     { dup: { n: 0 } },
                                                     { idx: { cached: false,
                                                              pushPath: false,
                                                              path: [
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_7.toValue(1n),
                                                                                alignment: _descriptor_7.alignment() } },
                                                                     { tag: 'value',
                                                                       value: { value: _descriptor_7.toValue(10n),
                                                                                alignment: _descriptor_7.alignment() } }
                                                                    ] } },
                                                     { popeq: { cached: true,
                                                                result: undefined } }
                                                    ]).value)
            <
            NUMBER_OF_SHIPS))
      {
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_7.toValue(1n),
                                                    alignment: _descriptor_7.alignment() } }
                                        ] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(4n),
                                                                                alignment: _descriptor_7.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1),
                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 1 } }
                        ]);
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_7.toValue(1n),
                                                    alignment: _descriptor_7.alignment() } }
                                        ] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(2n),
                                                                                alignment: _descriptor_7.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(2),
                                                                                alignment: _descriptor_1.alignment() }).encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 1 } }
                        ]);
      }
    }
  }
  #_public_key_0(context, partialProofData, secret_key, ships) {
    return this.#_persistent_hash_0(context,
                                    partialProofData,
                                    [secret_key,
                                     this.#_persistent_hash_1(context,
                                                              partialProofData,
                                                              ships)]);
  }
  #_folder_0(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 100; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  #_folder_1(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 5; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  #_equal_0(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_1(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_2(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_3(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_4(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_5(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_folder_2(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 5; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  #_equal_6(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_7(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_8(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_9(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_folder_3(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 5; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  #_folder_4(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 5; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  #_equal_10(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_11(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_12(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_13(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_14(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_folder_5(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 5; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  #_folder_6(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 5; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get gameState() {
      return _descriptor_1.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(1n),
                                                                                 alignment: _descriptor_7.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(2n),
                                                                                 alignment: _descriptor_7.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get roundCount() {
      return _descriptor_9.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(1n),
                                                                                 alignment: _descriptor_7.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(3n),
                                                                                 alignment: _descriptor_7.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: true,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get winner() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(1n),
                                                                                 alignment: _descriptor_7.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(4n),
                                                                                 alignment: _descriptor_7.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get player1() {
      return _descriptor_0.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(1n),
                                                                                 alignment: _descriptor_7.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(5n),
                                                                                 alignment: _descriptor_7.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get player2() {
      return _descriptor_0.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(1n),
                                                                                 alignment: _descriptor_7.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(6n),
                                                                                 alignment: _descriptor_7.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    gridPlayer1: {
      isEmpty(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`is_empty: expected 0 arguments, received ${args.length}`);
        return _descriptor_6.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(7n),
                                                                                   alignment: _descriptor_7.alignment() } }
                                                                       ] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                               alignment: _descriptor_9.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      size(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args.length}`);
        return _descriptor_9.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(7n),
                                                                                   alignment: _descriptor_7.alignment() } }
                                                                       ] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      member(...args) {
        if (args.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args.length}`);
        const key = args[0];
        if (!(typeof(key) === 'bigint' && key >= 0 && key <= 4294967295n))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      './src/contract/battleships.compact line 19, char 1',
                                      'Uint<0..4294967295>',
                                      key)
        return _descriptor_6.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(7n),
                                                                                   alignment: _descriptor_7.alignment() } }
                                                                       ] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(key),
                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      lookup(...args) {
        if (args.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args.length}`);
        const key = args[0];
        if (!(typeof(key) === 'bigint' && key >= 0 && key <= 4294967295n))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      './src/contract/battleships.compact line 19, char 1',
                                      'Uint<0..4294967295>',
                                      key)
        return _descriptor_5.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(7n),
                                                                                   alignment: _descriptor_7.alignment() } }
                                                                       ] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_4.toValue(key),
                                                                                   alignment: _descriptor_4.alignment() } }
                                                                       ] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }
                                                       ]).value);
      },
      [Symbol.iterator](...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args.length}`);
        const self = state.asArray()[1].asArray()[7];
        return self.asMap().keys().map(  (key) => {    const value = self.asMap().get(key).asCell();    return [      _descriptor_4.fromValue(key.value),      _descriptor_5.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    gridPlayer2: {
      isEmpty(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`is_empty: expected 0 arguments, received ${args.length}`);
        return _descriptor_6.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(8n),
                                                                                   alignment: _descriptor_7.alignment() } }
                                                                       ] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                                                               alignment: _descriptor_9.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      size(...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args.length}`);
        return _descriptor_9.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(8n),
                                                                                   alignment: _descriptor_7.alignment() } }
                                                                       ] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      member(...args) {
        if (args.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args.length}`);
        const key = args[0];
        if (!(typeof(key) === 'bigint' && key >= 0 && key <= 4294967295n))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      './src/contract/battleships.compact line 20, char 1',
                                      'Uint<0..4294967295>',
                                      key)
        return _descriptor_6.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(8n),
                                                                                   alignment: _descriptor_7.alignment() } }
                                                                       ] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(key),
                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }
                                                       ]).value);
      },
      lookup(...args) {
        if (args.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args.length}`);
        const key = args[0];
        if (!(typeof(key) === 'bigint' && key >= 0 && key <= 4294967295n))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      './src/contract/battleships.compact line 20, char 1',
                                      'Uint<0..4294967295>',
                                      key)
        return _descriptor_5.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(1n),
                                                                                   alignment: _descriptor_7.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_7.toValue(8n),
                                                                                   alignment: _descriptor_7.alignment() } }
                                                                       ] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_4.toValue(key),
                                                                                   alignment: _descriptor_4.alignment() } }
                                                                       ] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }
                                                       ]).value);
      },
      [Symbol.iterator](...args) {
        if (args.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args.length}`);
        const self = state.asArray()[1].asArray()[8];
        return self.asMap().keys().map(  (key) => {    const value = self.asMap().get(key).asCell();    return [      _descriptor_4.fromValue(key.value),      _descriptor_5.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get destroyCountPlayer1() {
      return _descriptor_9.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(1n),
                                                                                 alignment: _descriptor_7.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(9n),
                                                                                 alignment: _descriptor_7.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: true,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get destroyCountPlayer2() {
      return _descriptor_9.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(1n),
                                                                                 alignment: _descriptor_7.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(10n),
                                                                                 alignment: _descriptor_7.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: true,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get nextPlayer() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(1n),
                                                                                 alignment: _descriptor_7.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(11n),
                                                                                 alignment: _descriptor_7.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    },
    get lastShot() {
      return _descriptor_8.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(1n),
                                                                                 alignment: _descriptor_7.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_7.toValue(12n),
                                                                                 alignment: _descriptor_7.alignment() } }
                                                                     ] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }
                                                     ]).value);
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  local_secret_key: (...args) => undefined, ships: (...args) => undefined
});
const pureCircuits = {
  public_key: (...args) => _dummyContract.circuits.public_key(_emptyContext, ...args).result
};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
