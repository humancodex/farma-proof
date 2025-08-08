// This file is based on midnightntwrk/example-counter.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
