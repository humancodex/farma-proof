'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.8.1';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

var Status;
(function (Status) {
  Status[Status['init'] = 0] = 'init';
  Status[Status['verified'] = 1] = 'verified';
  Status[Status['paid'] = 2] = 'paid';
  Status[Status['delivered'] = 3] = 'delivered';
})(Status = exports.Status || (exports.Status = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_1 = new _ZswapCoinPublicKey_0();

const _descriptor_2 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

const _descriptor_4 = new __compactRuntime.CompactTypeOpaqueString();

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_6 = new __compactRuntime.CompactTypeEnum(3, 1);

class _PrescriptionData_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_6.alignment()))))))));
  }
  fromValue(value_0) {
    return {
      drugName: _descriptor_4.fromValue(value_0),
      dosage: _descriptor_4.fromValue(value_0),
      quantity: _descriptor_3.fromValue(value_0),
      healthInsurance: _descriptor_4.fromValue(value_0),
      doctorWallet: _descriptor_1.fromValue(value_0),
      patientWallet: _descriptor_1.fromValue(value_0),
      issuedAt: _descriptor_5.fromValue(value_0),
      expiresAt: _descriptor_5.fromValue(value_0),
      status: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.drugName).concat(_descriptor_4.toValue(value_0.dosage).concat(_descriptor_3.toValue(value_0.quantity).concat(_descriptor_4.toValue(value_0.healthInsurance).concat(_descriptor_1.toValue(value_0.doctorWallet).concat(_descriptor_1.toValue(value_0.patientWallet).concat(_descriptor_5.toValue(value_0.issuedAt).concat(_descriptor_5.toValue(value_0.expiresAt).concat(_descriptor_6.toValue(value_0.status)))))))));
  }
}

const _descriptor_7 = new _PrescriptionData_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_8 = new _ContractAddress_0();

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_1.alignment().concat(_descriptor_8.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_1.fromValue(value_0),
      right: _descriptor_8.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_1.toValue(value_0.left).concat(_descriptor_8.toValue(value_0.right)));
  }
}

const _descriptor_9 = new _Either_0();

const _descriptor_10 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      addDoctor: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`addDoctor: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const doctorWallet_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('addDoctor',
                                      'argument 1 (as invoked from Typescript)',
                                      'Pharma.compact line 48 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(doctorWallet_0) === 'object' && doctorWallet_0.bytes.buffer instanceof ArrayBuffer && doctorWallet_0.bytes.BYTES_PER_ELEMENT === 1 && doctorWallet_0.bytes.length === 32)) {
          __compactRuntime.type_error('addDoctor',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'Pharma.compact line 48 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      doctorWallet_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(doctorWallet_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addDoctor_0(context,
                                           partialProofData,
                                           doctorWallet_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      addPharmacy: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`addPharmacy: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const pharmacyWallet_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('addPharmacy',
                                      'argument 1 (as invoked from Typescript)',
                                      'Pharma.compact line 53 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(pharmacyWallet_0) === 'object' && pharmacyWallet_0.bytes.buffer instanceof ArrayBuffer && pharmacyWallet_0.bytes.BYTES_PER_ELEMENT === 1 && pharmacyWallet_0.bytes.length === 32)) {
          __compactRuntime.type_error('addPharmacy',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'Pharma.compact line 53 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      pharmacyWallet_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(pharmacyWallet_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addPharmacy_0(context,
                                             partialProofData,
                                             pharmacyWallet_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      createPrescription: (...args_1) => {
        if (args_1.length !== 8) {
          throw new __compactRuntime.CompactError(`createPrescription: expected 8 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const patientWallet_0 = args_1[1];
        const drugName_0 = args_1[2];
        const dosage_0 = args_1[3];
        const quantity_0 = args_1[4];
        const healthInsurance_0 = args_1[5];
        const issuedAt_0 = args_1[6];
        const expiresAt_0 = args_1[7];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('createPrescription',
                                      'argument 1 (as invoked from Typescript)',
                                      'Pharma.compact line 59 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(patientWallet_0) === 'object' && patientWallet_0.bytes.buffer instanceof ArrayBuffer && patientWallet_0.bytes.BYTES_PER_ELEMENT === 1 && patientWallet_0.bytes.length === 32)) {
          __compactRuntime.type_error('createPrescription',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'Pharma.compact line 59 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      patientWallet_0)
        }
        if (!(typeof(quantity_0) === 'bigint' && quantity_0 >= 0n && quantity_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('createPrescription',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'Pharma.compact line 59 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      quantity_0)
        }
        if (!(typeof(issuedAt_0) === 'bigint' && issuedAt_0 >= 0n && issuedAt_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createPrescription',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'Pharma.compact line 59 char 1',
                                      'Uint<0..18446744073709551615>',
                                      issuedAt_0)
        }
        if (!(typeof(expiresAt_0) === 'bigint' && expiresAt_0 >= 0n && expiresAt_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('createPrescription',
                                      'argument 7 (argument 8 as invoked from Typescript)',
                                      'Pharma.compact line 59 char 1',
                                      'Uint<0..18446744073709551615>',
                                      expiresAt_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(patientWallet_0).concat(_descriptor_4.toValue(drugName_0).concat(_descriptor_4.toValue(dosage_0).concat(_descriptor_3.toValue(quantity_0).concat(_descriptor_4.toValue(healthInsurance_0).concat(_descriptor_5.toValue(issuedAt_0).concat(_descriptor_5.toValue(expiresAt_0))))))),
            alignment: _descriptor_1.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment()))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._createPrescription_0(context,
                                                    partialProofData,
                                                    patientWallet_0,
                                                    drugName_0,
                                                    dosage_0,
                                                    quantity_0,
                                                    healthInsurance_0,
                                                    issuedAt_0,
                                                    expiresAt_0);
        partialProofData.output = { value: _descriptor_3.toValue(result_0), alignment: _descriptor_3.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      verifyPrescription: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`verifyPrescription: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('verifyPrescription',
                                      'argument 1 (as invoked from Typescript)',
                                      'Pharma.compact line 91 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('verifyPrescription',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'Pharma.compact line 91 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      tokenId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(tokenId_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._verifyPrescription_0(context,
                                                    partialProofData,
                                                    tokenId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      payPrescription: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`payPrescription: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('payPrescription',
                                      'argument 1 (as invoked from Typescript)',
                                      'Pharma.compact line 114 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('payPrescription',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'Pharma.compact line 114 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      tokenId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(tokenId_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._payPrescription_0(context,
                                                 partialProofData,
                                                 tokenId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      deliverPrescription: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`deliverPrescription: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('deliverPrescription',
                                      'argument 1 (as invoked from Typescript)',
                                      'Pharma.compact line 137 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('deliverPrescription',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'Pharma.compact line 137 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      tokenId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(tokenId_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._deliverPrescription_0(context,
                                                     partialProofData,
                                                     tokenId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      getPrescription: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getPrescription: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('getPrescription',
                                      'argument 1 (as invoked from Typescript)',
                                      'Pharma.compact line 161 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('getPrescription',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'Pharma.compact line 161 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      tokenId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(tokenId_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getPrescription_0(context,
                                                 partialProofData,
                                                 tokenId_0);
        partialProofData.output = { value: _descriptor_7.toValue(result_0), alignment: _descriptor_7.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      getStatus: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getStatus: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('getStatus',
                                      'argument 1 (as invoked from Typescript)',
                                      'Pharma.compact line 167 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(tokenId_0) === 'bigint' && tokenId_0 >= 0n && tokenId_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('getStatus',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'Pharma.compact line 167 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      tokenId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(tokenId_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getStatus_0(context, partialProofData, tokenId_0);
        partialProofData.output = { value: _descriptor_6.toValue(result_0), alignment: _descriptor_6.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      isDoctor: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`isDoctor: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const wallet_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('isDoctor',
                                      'argument 1 (as invoked from Typescript)',
                                      'Pharma.compact line 173 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(wallet_0) === 'object' && wallet_0.bytes.buffer instanceof ArrayBuffer && wallet_0.bytes.BYTES_PER_ELEMENT === 1 && wallet_0.bytes.length === 32)) {
          __compactRuntime.type_error('isDoctor',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'Pharma.compact line 173 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      wallet_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(wallet_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._isDoctor_0(context, partialProofData, wallet_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      isPharmacy: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`isPharmacy: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const wallet_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('isPharmacy',
                                      'argument 1 (as invoked from Typescript)',
                                      'Pharma.compact line 177 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(wallet_0) === 'object' && wallet_0.bytes.buffer instanceof ArrayBuffer && wallet_0.bytes.BYTES_PER_ELEMENT === 1 && wallet_0.bytes.length === 32)) {
          __compactRuntime.type_error('isPharmacy',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'Pharma.compact line 177 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      wallet_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(wallet_0),
            alignment: _descriptor_1.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._isPharmacy_0(context, partialProofData, wallet_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      addDoctor: this.circuits.addDoctor,
      addPharmacy: this.circuits.addPharmacy,
      createPrescription: this.circuits.createPrescription,
      verifyPrescription: this.circuits.verifyPrescription,
      payPrescription: this.circuits.payPrescription,
      deliverPrescription: this.circuits.deliverPrescription,
      getPrescription: this.circuits.getPrescription,
      getStatus: this.circuits.getStatus,
      isDoctor: this.circuits.isDoctor,
      isPharmacy: this.circuits.isPharmacy
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const name_0 = args_0[1];
    const symbol_0 = args_0[2];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    let stateValue_2 = __compactRuntime.StateValue.newArray();
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_2);
    let stateValue_1 = __compactRuntime.StateValue.newArray();
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_1);
    state_0.data = stateValue_0;
    state_0.setOperation('addDoctor', new __compactRuntime.ContractOperation());
    state_0.setOperation('addPharmacy', new __compactRuntime.ContractOperation());
    state_0.setOperation('createPrescription', new __compactRuntime.ContractOperation());
    state_0.setOperation('verifyPrescription', new __compactRuntime.ContractOperation());
    state_0.setOperation('payPrescription', new __compactRuntime.ContractOperation());
    state_0.setOperation('deliverPrescription', new __compactRuntime.ContractOperation());
    state_0.setOperation('getPrescription', new __compactRuntime.ContractOperation());
    state_0.setOperation('getStatus', new __compactRuntime.ContractOperation());
    state_0.setOperation('isDoctor', new __compactRuntime.ContractOperation());
    state_0.setOperation('isPharmacy', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
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
                                       value: { value: _descriptor_10.toValue(0n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(0n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(''),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(0n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(''),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(1n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(2n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(3n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(4n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(5n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(6n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(false),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(7n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(8n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(9n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(10n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(11n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(12n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(13n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(14n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    this._initialize_0(context, partialProofData, name_0, symbol_0);
    const tmp_0 = this._persistentHash_0(new Uint8Array([68, 79, 67, 84, 79, 82, 95, 82, 79, 76, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(10n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_1 = this._persistentHash_0(new Uint8Array([80, 72, 65, 82, 77, 65, 67, 89, 95, 82, 79, 76, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(11n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_2 = this._persistentHash_0(new Uint8Array([65, 68, 77, 73, 78, 95, 82, 79, 76, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(12n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_2),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_3 = _descriptor_0.fromValue(Contract._query(context,
                                                          partialProofData,
                                                          [
                                                           { dup: { n: 0 } },
                                                           { idx: { cached: false,
                                                                    pushPath: false,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_10.toValue(1n),
                                                                                      alignment: _descriptor_10.alignment() } },
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_10.toValue(12n),
                                                                                      alignment: _descriptor_10.alignment() } }] } },
                                                           { popeq: { cached: false,
                                                                      result: undefined } }]).value);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(9n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_3),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    this.__grantRole_0(context,
                       partialProofData,
                       _descriptor_0.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_10.toValue(1n),
                                                                                           alignment: _descriptor_10.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_10.toValue(12n),
                                                                                           alignment: _descriptor_10.alignment() } }] } },
                                                                { popeq: { cached: false,
                                                                           result: undefined } }]).value),
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    const tmp_4 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(14n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_4),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _initialize_0(context, partialProofData, name__0, symbol__0) {
    this._initialize_1(context, partialProofData);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(0n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(0n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(name__0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(0n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(symbol__0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _isApprovedForAll_0(context, partialProofData, owner_0, operator_0) {
    this._assertInitialized_0(context, partialProofData);
    if (_descriptor_2.fromValue(Contract._query(context,
                                                partialProofData,
                                                [
                                                 { dup: { n: 0 } },
                                                 { idx: { cached: false,
                                                          pushPath: false,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_10.toValue(1n),
                                                                            alignment: _descriptor_10.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_10.toValue(4n),
                                                                            alignment: _descriptor_10.alignment() } }] } },
                                                 { push: { storage: false,
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(owner_0),
                                                                                                        alignment: _descriptor_9.alignment() }).encode() } },
                                                 'member',
                                                 { popeq: { cached: true,
                                                            result: undefined } }]).value)
        &&
        _descriptor_2.fromValue(Contract._query(context,
                                                partialProofData,
                                                [
                                                 { dup: { n: 0 } },
                                                 { idx: { cached: false,
                                                          pushPath: false,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_10.toValue(1n),
                                                                            alignment: _descriptor_10.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_10.toValue(4n),
                                                                            alignment: _descriptor_10.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_9.toValue(owner_0),
                                                                            alignment: _descriptor_9.alignment() } }] } },
                                                 { push: { storage: false,
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(operator_0),
                                                                                                        alignment: _descriptor_9.alignment() }).encode() } },
                                                 'member',
                                                 { popeq: { cached: true,
                                                            result: undefined } }]).value))
    {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(1n),
                                                                                 alignment: _descriptor_10.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(4n),
                                                                                 alignment: _descriptor_10.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_9.toValue(owner_0),
                                                                                 alignment: _descriptor_9.alignment() } }] } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_9.toValue(operator_0),
                                                                                 alignment: _descriptor_9.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    } else {
      return false;
    }
  }
  __ownerOf_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_0(context, partialProofData);
    if (!_descriptor_2.fromValue(Contract._query(context,
                                                 partialProofData,
                                                 [
                                                  { dup: { n: 0 } },
                                                  { idx: { cached: false,
                                                           pushPath: false,
                                                           path: [
                                                                  { tag: 'value',
                                                                    value: { value: _descriptor_10.toValue(1n),
                                                                             alignment: _descriptor_10.alignment() } },
                                                                  { tag: 'value',
                                                                    value: { value: _descriptor_10.toValue(1n),
                                                                             alignment: _descriptor_10.alignment() } }] } },
                                                  { push: { storage: false,
                                                            value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                                                         alignment: _descriptor_3.alignment() }).encode() } },
                                                  'member',
                                                  { popeq: { cached: true,
                                                             result: undefined } }]).value))
    {
      return this._burnAddress_0();
    } else {
      return _descriptor_9.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(1n),
                                                                                 alignment: _descriptor_10.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(1n),
                                                                                 alignment: _descriptor_10.alignment() } }] } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_3.toValue(tokenId_0),
                                                                                 alignment: _descriptor_3.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    }
  }
  __getApproved_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_0(context, partialProofData);
    if (!_descriptor_2.fromValue(Contract._query(context,
                                                 partialProofData,
                                                 [
                                                  { dup: { n: 0 } },
                                                  { idx: { cached: false,
                                                           pushPath: false,
                                                           path: [
                                                                  { tag: 'value',
                                                                    value: { value: _descriptor_10.toValue(1n),
                                                                             alignment: _descriptor_10.alignment() } },
                                                                  { tag: 'value',
                                                                    value: { value: _descriptor_10.toValue(3n),
                                                                             alignment: _descriptor_10.alignment() } }] } },
                                                  { push: { storage: false,
                                                            value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                                                         alignment: _descriptor_3.alignment() }).encode() } },
                                                  'member',
                                                  { popeq: { cached: true,
                                                             result: undefined } }]).value))
    {
      return this._burnAddress_0();
    } else {
      return _descriptor_9.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(1n),
                                                                                 alignment: _descriptor_10.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(3n),
                                                                                 alignment: _descriptor_10.alignment() } }] } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_3.toValue(tokenId_0),
                                                                                 alignment: _descriptor_3.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    }
  }
  __isAuthorized_0(context, partialProofData, owner_0, spender_0, tokenId_0) {
    this._assertInitialized_0(context, partialProofData);
    return !this._isKeyOrAddressZero_0(spender_0)
           &&
           (this._equal_0(owner_0, spender_0)
            ||
            this._isApprovedForAll_0(context,
                                     partialProofData,
                                     owner_0,
                                     spender_0)
            ||
            this._equal_1(this.__getApproved_0(context,
                                               partialProofData,
                                               tokenId_0),
                          spender_0));
  }
  __checkAuthorized_0(context, partialProofData, owner_0, spender_0, tokenId_0)
  {
    this._assertInitialized_0(context, partialProofData);
    if (!this.__isAuthorized_0(context,
                               partialProofData,
                               owner_0,
                               spender_0,
                               tokenId_0))
    {
      __compactRuntime.assert(!this._isKeyOrAddressZero_0(owner_0),
                              'NonFungibleToken: Nonexistent Token');
      __compactRuntime.assert(false, 'NonFungibleToken: Insufficient Approval');
    }
    return [];
  }
  __update_0(context, partialProofData, to_0, tokenId_0, auth_0) {
    this._assertInitialized_0(context, partialProofData);
    const from_0 = this.__ownerOf_0(context, partialProofData, tokenId_0);
    if (!this._isKeyOrAddressZero_0(auth_0)) {
      this.__checkAuthorized_0(context,
                               partialProofData,
                               from_0,
                               auth_0,
                               tokenId_0);
    }
    if (!this._isKeyOrAddressZero_0(from_0)) {
      this.__approve_0(context,
                       partialProofData,
                       this._burnAddress_0(),
                       tokenId_0,
                       this._burnAddress_0());
      let t_0;
      const newBalance_0 = (t_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_10.toValue(1n),
                                                                                                      alignment: _descriptor_10.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_10.toValue(2n),
                                                                                                      alignment: _descriptor_10.alignment() } }] } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_9.toValue(from_0),
                                                                                                      alignment: _descriptor_9.alignment() } }] } },
                                                                           { popeq: { cached: false,
                                                                                      result: undefined } }]).value),
                            (__compactRuntime.assert(!(t_0 < 1n),
                                                     'result of subtraction would be negative'),
                             t_0 - 1n));
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_10.toValue(1n),
                                                  alignment: _descriptor_10.alignment() } },
                                       { tag: 'value',
                                         value: { value: _descriptor_10.toValue(2n),
                                                  alignment: _descriptor_10.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(from_0),
                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(newBalance_0),
                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 2 } }]);
    }
    if (!this._isKeyOrAddressZero_0(to_0)) {
      if (!_descriptor_2.fromValue(Contract._query(context,
                                                   partialProofData,
                                                   [
                                                    { dup: { n: 0 } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                               alignment: _descriptor_10.alignment() } },
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_10.toValue(2n),
                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                    { push: { storage: false,
                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(to_0),
                                                                                                           alignment: _descriptor_9.alignment() }).encode() } },
                                                    'member',
                                                    { popeq: { cached: true,
                                                               result: undefined } }]).value))
      {
        const tmp_0 = 0n;
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_10.toValue(1n),
                                                    alignment: _descriptor_10.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_10.toValue(2n),
                                                    alignment: _descriptor_10.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(to_0),
                                                                                alignment: _descriptor_9.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                alignment: _descriptor_3.alignment() }).encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 2 } }]);
      }
      const newBalance_1 = ((t1) => {
                             if (t1 > 340282366920938463463374607431768211455n) {
                               throw new __compactRuntime.CompactError('NonFungibleToken.compact line 563 char 26: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                             }
                             return t1;
                           })(_descriptor_3.fromValue(Contract._query(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_10.toValue(1n),
                                                                                                  alignment: _descriptor_10.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_10.toValue(2n),
                                                                                                  alignment: _descriptor_10.alignment() } }] } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_9.toValue(to_0),
                                                                                                  alignment: _descriptor_9.alignment() } }] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }]).value)
                              +
                              1n);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_10.toValue(1n),
                                                  alignment: _descriptor_10.alignment() } },
                                       { tag: 'value',
                                         value: { value: _descriptor_10.toValue(2n),
                                                  alignment: _descriptor_10.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(to_0),
                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(newBalance_1),
                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 2 } }]);
    }
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(to_0),
                                                                            alignment: _descriptor_9.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return from_0;
  }
  __mint_0(context, partialProofData, to_0, tokenId_0) {
    this._assertInitialized_0(context, partialProofData);
    __compactRuntime.assert(!this._isContractAddress_0(to_0),
                            'NonFungibleToken: Unsafe Transfer');
    this.__unsafeMint_0(context, partialProofData, to_0, tokenId_0);
    return [];
  }
  __unsafeMint_0(context, partialProofData, to_0, tokenId_0) {
    this._assertInitialized_0(context, partialProofData);
    __compactRuntime.assert(!this._isKeyOrAddressZero_0(to_0),
                            'NonFungibleToken: Invalid Receiver');
    const previousOwner_0 = this.__update_0(context,
                                            partialProofData,
                                            to_0,
                                            tokenId_0,
                                            this._burnAddress_0());
    __compactRuntime.assert(this._isKeyOrAddressZero_0(previousOwner_0),
                            'NonFungibleToken: Invalid Sender');
    return [];
  }
  __burn_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_0(context, partialProofData);
    const previousOwner_0 = this.__update_0(context,
                                            partialProofData,
                                            this._burnAddress_0(),
                                            tokenId_0,
                                            this._burnAddress_0());
    __compactRuntime.assert(!this._isKeyOrAddressZero_0(previousOwner_0),
                            'NonFungibleToken: Invalid Sender');
    return [];
  }
  __approve_0(context, partialProofData, to_0, tokenId_0, auth_0) {
    this._assertInitialized_0(context, partialProofData);
    if (!this._isKeyOrAddressZero_0(auth_0)) {
      const owner_0 = this.__requireOwned_0(context, partialProofData, tokenId_0);
      __compactRuntime.assert(this._equal_2(owner_0, auth_0)
                              ||
                              this._isApprovedForAll_0(context,
                                                       partialProofData,
                                                       owner_0,
                                                       auth_0),
                              'NonFungibleToken: Invalid Approver');
    }
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(3n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(to_0),
                                                                            alignment: _descriptor_9.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  __requireOwned_0(context, partialProofData, tokenId_0) {
    this._assertInitialized_0(context, partialProofData);
    const owner_0 = this.__ownerOf_0(context, partialProofData, tokenId_0);
    __compactRuntime.assert(!this._isKeyOrAddressZero_0(owner_0),
                            'NonFungibleToken: Nonexistent Token');
    return owner_0;
  }
  _left_0(value_0) {
    return { is_left: true, left: value_0, right: { bytes: new Uint8Array(32) } };
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_0, value_0);
    return result_0;
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _burnAddress_0() { return this._left_0({ bytes: new Uint8Array(32) }); }
  _initialize_1(context, partialProofData) {
    this._assertNotInitialized_0(context, partialProofData);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(6n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(true),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _assertInitialized_0(context, partialProofData) {
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(1n),
                                                                                                alignment: _descriptor_10.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(6n),
                                                                                                alignment: _descriptor_10.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value),
                            'Initializable: contract not initialized');
    return [];
  }
  _assertNotInitialized_0(context, partialProofData) {
    __compactRuntime.assert(!_descriptor_2.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_10.toValue(1n),
                                                                                                 alignment: _descriptor_10.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_10.toValue(6n),
                                                                                                 alignment: _descriptor_10.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value),
                            'Initializable: contract already initialized');
    return [];
  }
  _isKeyOrAddressZero_0(keyOrAddress_0) {
    if (this._isContractAddress_0(keyOrAddress_0)) {
      return this._equal_3({ bytes: new Uint8Array(32) }, keyOrAddress_0.right);
    } else {
      return this._equal_4({ bytes: new Uint8Array(32) }, keyOrAddress_0.left);
    }
  }
  _isContractAddress_0(keyOrAddress_0) { return !keyOrAddress_0.is_left; }
  _hasRole_0(context, partialProofData, roleId_0, account_0) {
    if (_descriptor_2.fromValue(Contract._query(context,
                                                partialProofData,
                                                [
                                                 { dup: { n: 0 } },
                                                 { idx: { cached: false,
                                                          pushPath: false,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_10.toValue(1n),
                                                                            alignment: _descriptor_10.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_10.toValue(7n),
                                                                            alignment: _descriptor_10.alignment() } }] } },
                                                 { push: { storage: false,
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(roleId_0),
                                                                                                        alignment: _descriptor_0.alignment() }).encode() } },
                                                 'member',
                                                 { popeq: { cached: true,
                                                            result: undefined } }]).value)
        &&
        _descriptor_2.fromValue(Contract._query(context,
                                                partialProofData,
                                                [
                                                 { dup: { n: 0 } },
                                                 { idx: { cached: false,
                                                          pushPath: false,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_10.toValue(1n),
                                                                            alignment: _descriptor_10.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_10.toValue(7n),
                                                                            alignment: _descriptor_10.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_0.toValue(roleId_0),
                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                 { push: { storage: false,
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(account_0),
                                                                                                        alignment: _descriptor_9.alignment() }).encode() } },
                                                 'member',
                                                 { popeq: { cached: true,
                                                            result: undefined } }]).value))
    {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(1n),
                                                                                 alignment: _descriptor_10.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(7n),
                                                                                 alignment: _descriptor_10.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_0.toValue(roleId_0),
                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_9.toValue(account_0),
                                                                                 alignment: _descriptor_9.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    } else {
      return false;
    }
  }
  _assertOnlyRole_0(context, partialProofData, roleId_0) {
    this.__checkRole_0(context,
                       partialProofData,
                       roleId_0,
                       this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData)));
    return [];
  }
  __checkRole_0(context, partialProofData, roleId_0, account_0) {
    __compactRuntime.assert(this._hasRole_0(context,
                                            partialProofData,
                                            roleId_0,
                                            account_0),
                            'AccessControl: unauthorized account');
    return [];
  }
  _getRoleAdmin_0(context, partialProofData, roleId_0) {
    if (_descriptor_2.fromValue(Contract._query(context,
                                                partialProofData,
                                                [
                                                 { dup: { n: 0 } },
                                                 { idx: { cached: false,
                                                          pushPath: false,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_10.toValue(1n),
                                                                            alignment: _descriptor_10.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_10.toValue(8n),
                                                                            alignment: _descriptor_10.alignment() } }] } },
                                                 { push: { storage: false,
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(roleId_0),
                                                                                                        alignment: _descriptor_0.alignment() }).encode() } },
                                                 'member',
                                                 { popeq: { cached: true,
                                                            result: undefined } }]).value))
    {
      return _descriptor_0.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(1n),
                                                                                 alignment: _descriptor_10.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(8n),
                                                                                 alignment: _descriptor_10.alignment() } }] } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_0.toValue(roleId_0),
                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    } else {
      return new Uint8Array(32);
    }
  }
  _grantRole_0(context, partialProofData, roleId_0, account_0) {
    this._assertOnlyRole_0(context,
                           partialProofData,
                           this._getRoleAdmin_0(context,
                                                partialProofData,
                                                roleId_0));
    this.__grantRole_0(context, partialProofData, roleId_0, account_0);
    return [];
  }
  __grantRole_0(context, partialProofData, roleId_0, account_0) {
    __compactRuntime.assert(!this._isContractAddress_0(account_0),
                            'AccessControl: unsafe role approval');
    return this.__unsafeGrantRole_0(context,
                                    partialProofData,
                                    roleId_0,
                                    account_0);
  }
  __unsafeGrantRole_0(context, partialProofData, roleId_0, account_0) {
    if (this._hasRole_0(context, partialProofData, roleId_0, account_0)) {
      return false;
    } else {
      if (!_descriptor_2.fromValue(Contract._query(context,
                                                   partialProofData,
                                                   [
                                                    { dup: { n: 0 } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                               alignment: _descriptor_10.alignment() } },
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_10.toValue(7n),
                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                    { push: { storage: false,
                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(roleId_0),
                                                                                                           alignment: _descriptor_0.alignment() }).encode() } },
                                                    'member',
                                                    { popeq: { cached: true,
                                                               result: undefined } }]).value))
      {
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_10.toValue(1n),
                                                    alignment: _descriptor_10.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_10.toValue(7n),
                                                    alignment: _descriptor_10.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(roleId_0),
                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newMap(
                                            new __compactRuntime.StateMap()
                                          ).encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 2 } }]);
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_10.toValue(1n),
                                                    alignment: _descriptor_10.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_10.toValue(7n),
                                                    alignment: _descriptor_10.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_0.toValue(roleId_0),
                                                    alignment: _descriptor_0.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(account_0),
                                                                                alignment: _descriptor_9.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(true),
                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 3 } }]);
        return true;
      } else {
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_10.toValue(1n),
                                                    alignment: _descriptor_10.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_10.toValue(7n),
                                                    alignment: _descriptor_10.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_0.toValue(roleId_0),
                                                    alignment: _descriptor_0.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(account_0),
                                                                                alignment: _descriptor_9.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(true),
                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 3 } }]);
        return true;
      }
    }
  }
  _addDoctor_0(context, partialProofData, doctorWallet_0) {
    this._assertOnlyRole_0(context,
                           partialProofData,
                           _descriptor_0.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                                               alignment: _descriptor_10.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(12n),
                                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value));
    this._grantRole_0(context,
                      partialProofData,
                      _descriptor_0.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_10.toValue(1n),
                                                                                          alignment: _descriptor_10.alignment() } },
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_10.toValue(10n),
                                                                                          alignment: _descriptor_10.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value),
                      this._left_0(doctorWallet_0));
    return [];
  }
  _addPharmacy_0(context, partialProofData, pharmacyWallet_0) {
    this._assertOnlyRole_0(context,
                           partialProofData,
                           _descriptor_0.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                                               alignment: _descriptor_10.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(12n),
                                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value));
    this._grantRole_0(context,
                      partialProofData,
                      _descriptor_0.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_10.toValue(1n),
                                                                                          alignment: _descriptor_10.alignment() } },
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_10.toValue(11n),
                                                                                          alignment: _descriptor_10.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value),
                      this._left_0(pharmacyWallet_0));
    return [];
  }
  _createPrescription_0(context,
                        partialProofData,
                        patientWallet_0,
                        drugName_0,
                        dosage_0,
                        quantity_0,
                        healthInsurance_0,
                        issuedAt_0,
                        expiresAt_0)
  {
    this._assertOnlyRole_0(context,
                           partialProofData,
                           _descriptor_0.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                                               alignment: _descriptor_10.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(10n),
                                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value));
    const tokenId_0 = _descriptor_3.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_10.toValue(1n),
                                                                                          alignment: _descriptor_10.alignment() } },
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_10.toValue(14n),
                                                                                          alignment: _descriptor_10.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value);
    const prescription_0 = { drugName: drugName_0,
                             dosage: dosage_0,
                             quantity: quantity_0,
                             healthInsurance: healthInsurance_0,
                             doctorWallet:
                               this._ownPublicKey_0(context, partialProofData),
                             patientWallet: patientWallet_0,
                             issuedAt: issuedAt_0,
                             expiresAt: expiresAt_0,
                             status: 0 };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(13n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(prescription_0),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    this.__mint_0(context,
                  partialProofData,
                  this._left_0(patientWallet_0),
                  tokenId_0);
    const tmp_0 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('Pharma.compact line 85 char 18: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(_descriptor_3.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_10.toValue(1n),
                                                                                         alignment: _descriptor_10.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_10.toValue(14n),
                                                                                         alignment: _descriptor_10.alignment() } }] } },
                                                              { popeq: { cached: false,
                                                                         result: undefined } }]).value)
                     +
                     1n);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(14n),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return tokenId_0;
  }
  _verifyPrescription_0(context, partialProofData, tokenId_0) {
    this._assertOnlyRole_0(context,
                           partialProofData,
                           _descriptor_0.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                                               alignment: _descriptor_10.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(11n),
                                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value));
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(1n),
                                                                                                alignment: _descriptor_10.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(13n),
                                                                                                alignment: _descriptor_10.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Prescription does not exist');
    const prescription_0 = _descriptor_7.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                                               alignment: _descriptor_10.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(13n),
                                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_3.toValue(tokenId_0),
                                                                                               alignment: _descriptor_3.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value);
    __compactRuntime.assert(prescription_0.status === 0,
                            'Prescription not in init state');
    const updated_0 = { drugName: prescription_0.drugName,
                        dosage: prescription_0.dosage,
                        quantity: prescription_0.quantity,
                        healthInsurance: prescription_0.healthInsurance,
                        doctorWallet: prescription_0.doctorWallet,
                        patientWallet: prescription_0.patientWallet,
                        issuedAt: prescription_0.issuedAt,
                        expiresAt: prescription_0.expiresAt,
                        status: 1 };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(13n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(updated_0),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _payPrescription_0(context, partialProofData, tokenId_0) {
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(1n),
                                                                                                alignment: _descriptor_10.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(13n),
                                                                                                alignment: _descriptor_10.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Prescription does not exist');
    const prescription_0 = _descriptor_7.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                                               alignment: _descriptor_10.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(13n),
                                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_3.toValue(tokenId_0),
                                                                                               alignment: _descriptor_3.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value);
    __compactRuntime.assert(prescription_0.status === 1,
                            'Prescription not verified');
    __compactRuntime.assert(this._equal_5(this._ownPublicKey_0(context,
                                                               partialProofData),
                                          prescription_0.patientWallet),
                            'Not prescription owner');
    const updated_0 = { drugName: prescription_0.drugName,
                        dosage: prescription_0.dosage,
                        quantity: prescription_0.quantity,
                        healthInsurance: prescription_0.healthInsurance,
                        doctorWallet: prescription_0.doctorWallet,
                        patientWallet: prescription_0.patientWallet,
                        issuedAt: prescription_0.issuedAt,
                        expiresAt: prescription_0.expiresAt,
                        status: 2 };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(13n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(updated_0),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _deliverPrescription_0(context, partialProofData, tokenId_0) {
    this._assertOnlyRole_0(context,
                           partialProofData,
                           _descriptor_0.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                                               alignment: _descriptor_10.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(11n),
                                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value));
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(1n),
                                                                                                alignment: _descriptor_10.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(13n),
                                                                                                alignment: _descriptor_10.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Prescription does not exist');
    const prescription_0 = _descriptor_7.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                                               alignment: _descriptor_10.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(13n),
                                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_3.toValue(tokenId_0),
                                                                                               alignment: _descriptor_3.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value);
    __compactRuntime.assert(prescription_0.status === 2, 'Prescription not paid');
    const updated_0 = { drugName: prescription_0.drugName,
                        dosage: prescription_0.dosage,
                        quantity: prescription_0.quantity,
                        healthInsurance: prescription_0.healthInsurance,
                        doctorWallet: prescription_0.doctorWallet,
                        patientWallet: prescription_0.patientWallet,
                        issuedAt: prescription_0.issuedAt,
                        expiresAt: prescription_0.expiresAt,
                        status: 3 };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(1n),
                                                alignment: _descriptor_10.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_10.toValue(13n),
                                                alignment: _descriptor_10.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(updated_0),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    this.__burn_0(context, partialProofData, tokenId_0);
    return [];
  }
  _getPrescription_0(context, partialProofData, tokenId_0) {
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(1n),
                                                                                                alignment: _descriptor_10.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(13n),
                                                                                                alignment: _descriptor_10.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Prescription does not exist');
    return _descriptor_7.fromValue(Contract._query(context,
                                                   partialProofData,
                                                   [
                                                    { dup: { n: 0 } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                               alignment: _descriptor_10.alignment() } },
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_10.toValue(13n),
                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_3.toValue(tokenId_0),
                                                                               alignment: _descriptor_3.alignment() } }] } },
                                                    { popeq: { cached: false,
                                                               result: undefined } }]).value);
  }
  _getStatus_0(context, partialProofData, tokenId_0) {
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(1n),
                                                                                                alignment: _descriptor_10.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_10.toValue(13n),
                                                                                                alignment: _descriptor_10.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenId_0),
                                                                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Prescription does not exist');
    return _descriptor_7.fromValue(Contract._query(context,
                                                   partialProofData,
                                                   [
                                                    { dup: { n: 0 } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                               alignment: _descriptor_10.alignment() } },
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_10.toValue(13n),
                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                    { idx: { cached: false,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_3.toValue(tokenId_0),
                                                                               alignment: _descriptor_3.alignment() } }] } },
                                                    { popeq: { cached: false,
                                                               result: undefined } }]).value).status;
  }
  _isDoctor_0(context, partialProofData, wallet_0) {
    return this._hasRole_0(context,
                           partialProofData,
                           _descriptor_0.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                                               alignment: _descriptor_10.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(10n),
                                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value),
                           this._left_0(wallet_0));
  }
  _isPharmacy_0(context, partialProofData, wallet_0) {
    return this._hasRole_0(context,
                           partialProofData,
                           _descriptor_0.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(1n),
                                                                                               alignment: _descriptor_10.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_10.toValue(11n),
                                                                                               alignment: _descriptor_10.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value),
                           this._left_0(wallet_0));
  }
  _equal_0(x0, y0) {
    {
      let x1 = x0.is_left;
      let y1 = y0.is_left;
      if (x1 !== y1) { return false; }
    }
    {
      let x1 = x0.left;
      let y1 = y0.left;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    {
      let x1 = x0.right;
      let y1 = y0.right;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    return true;
  }
  _equal_1(x0, y0) {
    {
      let x1 = x0.is_left;
      let y1 = y0.is_left;
      if (x1 !== y1) { return false; }
    }
    {
      let x1 = x0.left;
      let y1 = y0.left;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    {
      let x1 = x0.right;
      let y1 = y0.right;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    return true;
  }
  _equal_2(x0, y0) {
    {
      let x1 = x0.is_left;
      let y1 = y0.is_left;
      if (x1 !== y1) { return false; }
    }
    {
      let x1 = x0.left;
      let y1 = y0.left;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    {
      let x1 = x0.right;
      let y1 = y0.right;
      {
        let x2 = x1.bytes;
        let y2 = y1.bytes;
        if (!x2.every((x, i) => y2[i] === x)) { return false; }
      }
    }
    return true;
  }
  _equal_3(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_4(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_5(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
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
    get DOCTOR_ROLE() {
      return _descriptor_0.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(1n),
                                                                                 alignment: _descriptor_10.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(10n),
                                                                                 alignment: _descriptor_10.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get PHARMACY_ROLE() {
      return _descriptor_0.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(1n),
                                                                                 alignment: _descriptor_10.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(11n),
                                                                                 alignment: _descriptor_10.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get ADMIN_ROLE() {
      return _descriptor_0.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(1n),
                                                                                 alignment: _descriptor_10.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(12n),
                                                                                 alignment: _descriptor_10.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    _prescriptions: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(1n),
                                                                                   alignment: _descriptor_10.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(13n),
                                                                                   alignment: _descriptor_10.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                                                               alignment: _descriptor_5.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(1n),
                                                                                   alignment: _descriptor_10.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(13n),
                                                                                   alignment: _descriptor_10.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'Pharma.compact line 18 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(1n),
                                                                                   alignment: _descriptor_10.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(13n),
                                                                                   alignment: _descriptor_10.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(key_0),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'Pharma.compact line 18 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      key_0)
        }
        return _descriptor_7.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(1n),
                                                                                   alignment: _descriptor_10.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_10.toValue(13n),
                                                                                   alignment: _descriptor_10.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_3.toValue(key_0),
                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[13];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_3.fromValue(key.value),      _descriptor_7.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get _nextTokenId() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(1n),
                                                                                 alignment: _descriptor_10.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_10.toValue(14n),
                                                                                 alignment: _descriptor_10.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ });
const pureCircuits = {};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
