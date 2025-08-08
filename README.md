# Midnight Starter Kit

A complete starter for building and testing [Midnight](https://docs.midnight.network) smart contracts in Compact. It ships with a [devcontainer](https://code.visualstudio.com/docs/devcontainers/containers) setup, a minimal `OwnableCounter` example (adapted from Midnight's [example-counter](https://github.com/midnightntwrk/example-counter)), reusable modules (copied from OpenZeppelin's [compact-contracts](https://github.com/OpenZeppelin/compact-contracts)), and a Vitest test suite driven by a small TypeScript contract simulator.

## Highlights

- Devcontainer with all necessary tools for development (`compactc`, `node`, Compact's VS Code extension)
- Compact contract example: `src/OwnableCounter.compact`
- Reusable modules: `src/modules/{Ownable,Initializable,Utils}.compact`
- Vitest tests and a simulator for fast, off-chain execution

## Requirements

> [!TIP]
> All the following are already installed in the provided [devcontainer](.devcontainer). The [`Dockerfile`](.devcontainer/Dockerfile) can be adjusted to update or add tools as needed.

- [Node.js](https://nodejs.org/en/download) >= 22.18
- [Compact compiler](https://docs.midnight.network/develop/tutorial/building/#midnight-compact-compiler) (`compactc`)
  - Verify: `compactc --version`
  - Ensure `compactc` is on your PATH

## Quick start

1) Install dependencies
- `npm install`

2) Build the contracts
- `npm run build`
- The output will be placed in the `out` directory.

3) Run tests
- `npm test`
- If you edit any `.compact` file, rebuild before testing to avoid stale imports.

## Project structure

```
.
├── package.json
├── README.md
├── src/
│   ├── OwnableCounter.compact                # Example contract
│   └── modules/
│       ├── Initializable.compact
│       ├── Ownable.compact
│       └── Utils.compact
└── test/
    ├── OwnableCounter.test.ts                # Vitest unit tests
    ├── simulators/
    │   └── OwnableCounterSimulator.ts        # Thin wrapper around generated contract runtime
    └── utils/
        └── address.ts                        # Helpers for test addresses/keys
```

Build artifacts are placed under `out` by the `build` script.

### Example Contract overview

The `OwnableCounter` contract exposes:
- `increment()` — increments the counter by 1
- `reset()` — resets the counter to 0 (owner-only)
- `owner()` — returns current owner
- `transferOwnership(newOwner)` — transfers ownership to a new public key
- `renounceOwnership()` — burns ownership

Constructor:
- `constructor(initialOwner: Either<ZswapCoinPublicKey, ContractAddress>)` — must be called at deployment to initialize ownership.

Notes on ownership (see `src/modules/Ownable.compact`):
- Ownership transfers to contract addresses are disallowed in the safe path until contract-to-contract calls are supported.
- The module provides explicit “unsafe” variants for experimentation.

## Extending this starter

- Add new contracts to `src/` and modules to `src/modules/`
- Update `package.json` scripts (or add new ones) to compile additional entry points
- Create new simulators modeled after `test/simulators/OwnableCounterSimulator.ts`
- Add more unit tests with Vitest

## Acknowledgements

- Counter contract and tests adapted from Midnight's [example-counter](https://github.com/midnightntwrk/example-counter).
- Compact modules and utilities copied from [OpenZeppelin/compact-contracts](https://github.com/OpenZeppelin/compact-contracts), which cannot be installed as an `npm` package yet.
