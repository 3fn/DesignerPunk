# Task 6.3 Completion — `contractHash`; the type-contract report — **PARTIAL (a fork is open; subtask NOT ticked)**

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 6 · **Agent**: Ada (Opus)

## What changed

**Built and bitten:**
- **`contractHash` is computed at build** (`scripts/build-name-contract.ts` → `buildTypeContract`) and shipped in `dist/name-contract.json` → `typeContract: { hash, members }`.
  - The hash is `sha256:` over the **emitted** `.d.ts` text of exactly the four DD11 declarations: `PrimitiveToken` and `SemanticToken` (interfaces), `TokenCategory` and `SemanticCategory` (enums), from `dist/types/{PrimitiveToken,SemanticToken}.d.ts`.
  - The text includes leading JSDoc. That makes it the design's own residual: a comment-only edit moves the hash. It is deterministic, and it cannot be hand-bumped.
  - `members` is the normalized list, e.g. `PrimitiveToken.baseValue: number` and `TokenCategory.SPACING = "spacing"`.
- **`init` records it**: `ManifestBuilder.build(installedVersion, readContractHash(pkgRoot))` puts the installed package's hash into `designerpunk.manifest.json` → `contractHash`.
  - Measured on a real `init`: `"contractHash": "sha256:bb42c68b…"`.
  - It is `''` only when the package ships no contract, and never a faked value.
- **The report**: `src/cli/sync/NameContract.ts` provides:
  - `typeContractChangedMessage(removed, added)`, string-equal to the catalog row "type contract changed";
  - DD11's residual `NO_MEMBER_CHANGES` (*"no member changes detected — shape or formatting changed"*), used when the hash moved but no member did;
  - `diffMembers`;
  - `checkTypeContract(recorded, current)`.

**NOT built: `sync` does not yet run the type-contract report.** This is the open fork below.

### The fork (stop-and-report per the brief) — where do the PRIOR members come from?

The catalog row reports **"removed: X; added: Y"**, and the criterion wants a `PrimitiveToken` field change → reported. Both need the **previous** contract's member list at `sync` time.
- The manifest (design C7 § "Fields") records only `contractHash: string`.
- By the time `sync` runs, `node_modules` already holds the **new** package.
- **Nothing in the design names a source for the old members.**

Options (I have not picked; the choice is a design/manifest change either way):
- **(A) The manifest records the members** beside the hash, e.g. `contractMembers: string[]`, written by `init` and by `sync` when it persists.
  - Offline-safe and deterministic.
  - **Cost**: it extends C7's manifest field list (a design erratum, like Ada D-T-B2's `origin`) and edits Lina's Task 5 `Manifest.ts` (key order, parse, serialize, and its 13-test suite). That is larger than the brief's "minimal" out-of-list allowance.
  - It adds 54 lines today to a committed file (one member per line, which is merge-friendly).
- **(B) `sync` fetches the previously installed version's `dist/name-contract.json` through her own npm rail**, using Task 5's migration fetcher (`npm pack --prefer-offline`), only when the hash differs.
  - No manifest change.
  - **Cost**: a network touch on the upgrade path, and a new catalog row for the fetch-failed case (*"the type contract changed; its members could not be listed …"*). The first 123-era baseline (a hash recorded by a pre-Task-6 package) has no contract to fetch, but `''` baselines are skipped anyway.
- *(Considered and set aside)*: shipping a cumulative hash → members history in the contract. That needs release history at build (it is not derivable from the tree), and it can be hand-edited, which contradicts "cannot be hand-bumped".

**Counter-argument to my own lean (A)**: (A) makes every born consumer's committed manifest carry our type surface's member list. That is a second copy of package internals in *her* repo, and it churns on each contract change. (B) keeps her manifest lean, at the price of network and a new string.

**Also pending on the same fork**: whether `sync` should (re)record `contractHash` when it persists the manifest, which would establish the baseline for legacy-converted manifests (`convertLegacyManifest` writes `''`). Today `sync` leaves `contractHash` untouched, and that is the conservative, no-silent-swallow behavior until the report is wired.

## Targeted tests + result

- `npx jest --config scripts/jest.config.js scripts/__tests__/sync.type-contract.test.ts` → **8 passed, 8 total**:
  - the four declarations;
  - determinism;
  - **a `PrimitiveToken` field change** (`baseValue: number` → `string`) → the hash changes → `the token type contract changed (removed: PrimitiveToken.baseValue: number; added: PrimitiveToken.baseValue: string). Run 'npx tsc --noEmit' — …`, string-equal to the design row;
  - **a comment-only change** → the hash changes with equal members → *"no member changes detected — shape or formatting changed"*;
  - an enum removal → `removed:`;
  - unchanged or no baseline → no report;
  - the catalog string;
  - the shipped hash equals the computed one.
- `npx jest src/cli/__tests__/sync.name-contract.test.ts -t contractHash` → `init` records `sha256:…` equal to `readContractHash(REPO_ROOT)`.

### Bites (mutate → run → restore; `cmp` confirmed)

1. **The hash computed over the members only** (comments invisible) → `✕ a comment-only change → the hash changes → "no member changes detected"`, `✕ the hash is the one dist/name-contract.json ships` — **2 failed**.
2. **The hash covers the enums only** (interfaces invisible) → `✕ a PrimitiveToken field change → the hash changes → reported…`, plus the two above — **3 failed**.
3. **`init` stops passing the hash** (`manifest.build(installedVersion)`) → `✕ contractHash (DD11): init records the installed package's type-contract hash…` — **1 failed**.

## Application-time adaptations

1. **The test lives at `scripts/__tests__/sync.type-contract.test.ts`, not under `src/`.** The hash needs the TypeScript AST, and `typescript` is a devDependency, never a consumer runtime dependency. A `src/` test importing `scripts/` breaks `tsc`'s `rootDir`. It therefore runs in `npm run test:scripts`, which **no CI workflow runs** (pre-existing; `tool-manifest.test.ts` is in the same position). CI still enforces the BUILD-level failures, because `lane-timing` runs `npm run build`.
2. **How the no-member-diff case composes**: when both member lists are empty, the row's parenthetical `(removed: <X>; added: <Y>)` is replaced by DD11's residual string. The remainder of the row is unchanged.
3. **Out-of-list edit, disclosed**: `src/cli/init.ts`. `ManifestBuilder.build` gains an optional `contractHash` parameter, the call site passes `readContractHash(pkgRoot)`, and the comment is updated. Authority: the brief's rule (*"filling `contractHash` where `init`/`Manifest` write it"*).
