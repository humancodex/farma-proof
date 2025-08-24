import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum Status { init = 0, verified = 1, paid = 2, delivered = 3 }

export type PrescriptionData = { drugName: string;
                                 dosage: string;
                                 quantity: bigint;
                                 healthInsurance: string;
                                 doctorWallet: { bytes: Uint8Array };
                                 patientWallet: { bytes: Uint8Array };
                                 issuedAt: bigint;
                                 expiresAt: bigint;
                                 status: Status
                               };

export type Witnesses<T> = {
}

export type ImpureCircuits<T> = {
  addDoctor(context: __compactRuntime.CircuitContext<T>,
            doctorWallet_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, []>;
  addPharmacy(context: __compactRuntime.CircuitContext<T>,
              pharmacyWallet_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, []>;
  createPrescription(context: __compactRuntime.CircuitContext<T>,
                     patientWallet_0: { bytes: Uint8Array },
                     drugName_0: string,
                     dosage_0: string,
                     quantity_0: bigint,
                     healthInsurance_0: string,
                     issuedAt_0: bigint,
                     expiresAt_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
  verifyPrescription(context: __compactRuntime.CircuitContext<T>,
                     tokenId_0: bigint): __compactRuntime.CircuitResults<T, []>;
  payPrescription(context: __compactRuntime.CircuitContext<T>, tokenId_0: bigint): __compactRuntime.CircuitResults<T, []>;
  deliverPrescription(context: __compactRuntime.CircuitContext<T>,
                      tokenId_0: bigint): __compactRuntime.CircuitResults<T, []>;
  getPrescription(context: __compactRuntime.CircuitContext<T>, tokenId_0: bigint): __compactRuntime.CircuitResults<T, PrescriptionData>;
  getStatus(context: __compactRuntime.CircuitContext<T>, tokenId_0: bigint): __compactRuntime.CircuitResults<T, Status>;
  isDoctor(context: __compactRuntime.CircuitContext<T>,
           wallet_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, boolean>;
  isPharmacy(context: __compactRuntime.CircuitContext<T>,
             wallet_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, boolean>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  addDoctor(context: __compactRuntime.CircuitContext<T>,
            doctorWallet_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, []>;
  addPharmacy(context: __compactRuntime.CircuitContext<T>,
              pharmacyWallet_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, []>;
  createPrescription(context: __compactRuntime.CircuitContext<T>,
                     patientWallet_0: { bytes: Uint8Array },
                     drugName_0: string,
                     dosage_0: string,
                     quantity_0: bigint,
                     healthInsurance_0: string,
                     issuedAt_0: bigint,
                     expiresAt_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
  verifyPrescription(context: __compactRuntime.CircuitContext<T>,
                     tokenId_0: bigint): __compactRuntime.CircuitResults<T, []>;
  payPrescription(context: __compactRuntime.CircuitContext<T>, tokenId_0: bigint): __compactRuntime.CircuitResults<T, []>;
  deliverPrescription(context: __compactRuntime.CircuitContext<T>,
                      tokenId_0: bigint): __compactRuntime.CircuitResults<T, []>;
  getPrescription(context: __compactRuntime.CircuitContext<T>, tokenId_0: bigint): __compactRuntime.CircuitResults<T, PrescriptionData>;
  getStatus(context: __compactRuntime.CircuitContext<T>, tokenId_0: bigint): __compactRuntime.CircuitResults<T, Status>;
  isDoctor(context: __compactRuntime.CircuitContext<T>,
           wallet_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, boolean>;
  isPharmacy(context: __compactRuntime.CircuitContext<T>,
             wallet_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, boolean>;
}

export type Ledger = {
  readonly DOCTOR_ROLE: Uint8Array;
  readonly PHARMACY_ROLE: Uint8Array;
  readonly ADMIN_ROLE: Uint8Array;
  _prescriptions: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): PrescriptionData;
    [Symbol.iterator](): Iterator<[bigint, PrescriptionData]>
  };
  readonly _nextTokenId: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>,
               name_0: string,
               symbol_0: string): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
