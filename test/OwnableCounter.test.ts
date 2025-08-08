// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect, vi, beforeEach } from "vitest";
import * as runtime from "@midnight-ntwrk/compact-runtime";

import { OwnableCounterSimulator } from "./simulators/OwnableCounterSimulator.js";
import { createEitherTestUser } from "./utils/address.js";

const Z_OWNER = createEitherTestUser("OWNER");
const Z_OWNER_PUBLIC_KEY = Z_OWNER.left;

let ownableCounter: OwnableCounterSimulator;

describe("OwnableCounter", () => {
  beforeEach(() => {
    ownableCounter = new OwnableCounterSimulator(Z_OWNER);
  });

  it("properly initializes ledger state", () => {
    const { round } = ownableCounter.getLedger();
    expect(round).toEqual(0n);
  });

  it("increments the counter correctly", () => {
    const { round } = ownableCounter.increment();
    expect(round).toEqual(1n);
  });

  it("resets the counter when called by the owner", () => {
    ownableCounter.increment();
    // Mock the runtime to simulate the owner calling reset
    const spy = vi.spyOn(runtime, "ownPublicKey").mockImplementation(() => Z_OWNER_PUBLIC_KEY);
    const { round } = ownableCounter.reset();
    expect(round).toEqual(0n);
    spy.mockRestore();
  });

  it("throws an error when reset is called by a non-owner", () => {
    expect(
      () => ownableCounter.reset()
    ).toThrow("Ownable: caller is not the owner");
  });
});
