// SPDX-License-Identifier: Apache-2.0

import {
  type CircuitContext,
  QueryContext,
  sampleContractAddress,
  constructorContext,
} from "@midnight-ntwrk/compact-runtime";

import {
  Contract,
  type ContractAddress,
  type Either,
  type Ledger,
  ledger,
  type ZswapCoinPublicKey,
} from "../../out/OwnableCounter/contract/index.cjs";


export type OwnableCounterPrivateState = Record<string, never>;
export const witnesses = {};

export class OwnableCounterSimulator {
  readonly contract: Contract<OwnableCounterPrivateState>;
  circuitContext: CircuitContext<OwnableCounterPrivateState>;

  constructor(initialOwner: Either<ZswapCoinPublicKey, ContractAddress>) {
    this.contract = new Contract<OwnableCounterPrivateState>(witnesses);
    const {
      currentPrivateState,
      currentContractState,
      currentZswapLocalState
    } = this.contract.initialState(
      constructorContext({}, "0".repeat(64)),
      initialOwner,
    );
    this.circuitContext = {
      currentPrivateState,
      currentZswapLocalState,
      originalState: currentContractState,
      transactionContext: new QueryContext(
        currentContractState.data,
        sampleContractAddress()
      )
    };
  }

  public getLedger(): Ledger {
    return ledger(this.circuitContext.transactionContext.state);
  }

  public increment(): Ledger {
    this.circuitContext = this.contract.impureCircuits.increment(
      this.circuitContext
    ).context;
    return ledger(this.circuitContext.transactionContext.state);
  }

  public reset(): Ledger {
    this.circuitContext = this.contract.impureCircuits.reset(
      this.circuitContext
    ).context;
    return ledger(this.circuitContext.transactionContext.state);
  }
}
