# Task 6.3 Completion — `contractHash`; the type-contract report

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 6 · **Agent**: Ada (Opus)

> **History.** First landed PARTIAL at `23e3afcc`: the build and the report functions were done, and `sync` wiring was blocked on the prior-members fork. **Peter ruled fork 1 = (B) on 2026-09-27.** The wiring below completes the subtask.

## What changed

**The build side** (`scripts/build-name-contract.ts` → `buildTypeContract`, at `23e3afcc`):
- `contractHash` is `sha256:` over the **emitted** `.d.ts` text of exactly the four DD11 declarations: `PrimitiveToken` and `SemanticToken` (interfaces), `TokenCategory` and `SemanticCategory` (enums), from `dist/types/{PrimitiveToken,SemanticToken}.d.ts`.
- The text includes leading JSDoc, so a comment-only edit moves the hash. That is DD11's residual.
- It is shipped as `dist/name-contract.json` → `typeContract: { hash, members }`, with members normalized, e.g. `PrimitiveToken.baseValue: number` and `TokenCategory.SPACING = "spacing"`. There are 54 today.
- **`init` records it** in the manifest's `contractHash`, via `ManifestBuilder.build(installedVersion, readContractHash(pkgRoot))`.

**The `sync` side — Peter's fork-1 ruling (B)** (`src/cli/sync/NameContract.ts` + `src/cli/sync/index.ts` step 6c):
- `assessTypeContract({ recordedHash, recordedVersion, current, fetchPrevious })` has five outcomes:
  - **unchanged**: the recorded hash equals the installed one. No line, and **no fetch**.
  - **changed**: the recorded hash differs. `sync` fetches the **previously installed version** (the manifest's `installedVersion`) through **Task 5's fetcher**: her own npm rail, `npm pack --prefer-offline`, cache first. It then reads that tarball's `dist/name-contract.json` and diffs the members.
    - The line is string-equal to the "type contract changed" row.
    - A hash move with equal members gives DD11's *"no member changes detected — shape or formatting changed"*.
  - **cannot tell** (never clean), for two causes:
    - the fetch failed or you are offline;
    - the fetched previous contract's hash ≠ the recorded `contractHash`. In that case the diff would be against the wrong baseline, so it is refused.
  - **no baseline**, for two causes:
    - the manifest records `contractHash: ''` (legacy-converted, or written by a pre-contract `init`). Nothing is fetched;
    - the previous version's tarball ships no `dist/name-contract.json`, i.e. it predates release 1.
  - **unavailable**: the installed package ships no contract. The name-contract section already says "cannot check".
- It is reported under a `🧾 Type contract:` section, before anything applies. It runs only for a repo **with** a manifest; with no manifest nothing is recorded, nothing is written, and no line is printed.
- **Re-recording**:
  - `manifest.contractHash = installed hash` is set **only in the save step**, i.e. only when `sync` actually writes the manifest.
  - A differing hash counts as a manifest change, so it follows Task 5's rules exactly: the report comes first, then `--apply` off a terminal (or one confirmation on a terminal).
  - Off a terminal without `--apply`, nothing is written, and the next run reports again.
- The fetched roots live in the fetcher's own temp directory (Task 5's), which is disposed after use.
- The trace records `type-contract-fetch:<v>`.

**End to end on the compiled CLI** (the scratch consumer from 6.2, `node bin/designerpunk.js sync --dry-run`):
- hash unchanged → no type-contract section;
- `contractHash: ""` → `no baseline … your manifest records no contractHash. …`;
- a stale hash at `installedVersion: 14.1.0` → **a real npm-rail fetch of `@3fn/core@14.1.0`** (public npmjs, no credentials read) → `no baseline … version 14.1.0 predates DesignerPunk's name contract (it ships no dist/name-contract.json). …`;
- a stale hash at `99.0.0` → the fetch fails → `cannot tell what changed in the token type contract — the package content for version 99.0.0 could not be retrieved. It did change: …`.

### Proposed catalog rows (no design row yet; the coordinator routes them to Thurgood as an erratum)

| Condition | Proposed message (as coded; `sync.type-contract.run.test.ts` pins it) |
|---|---|
| type contract — cannot tell | `cannot tell what changed in the token type contract — <the package content for version <v> could not be retrieved\|version <v>'s contract does not match the contractHash your manifest recorded>. It did change: run 'npx tsc --noEmit' — fix each file it names. (This is not a clean report.)` |
| type contract — no baseline | `no baseline to compare the token type contract against — <your manifest records no contractHash\|version <v> predates DesignerPunk's name contract (it ships no dist/name-contract.json)>. sync records the installed contract as the baseline the next time it writes the manifest.` |

## Targeted tests + result

- `npx jest src/cli/__tests__/sync.type-contract.run.test.ts` → **10 passed, 10 total**:
  - **previous A,B → current A,C → "removed: B; added: C"**, string-equal to the design row, fetched from `15.0.0`;
  - **a comment-only change** → "no member changes detected";
  - **offline → cannot tell**, with the exact string;
  - a baseline mismatch → cannot tell;
  - a `''` manifest → no baseline, with no fetch;
  - a predating version → no baseline;
  - unchanged → no line and no fetch;
  - **RE-RECORD**: off a terminal without `--apply`, the manifest hash stays unchanged and `dirHash` is identical. With `--apply` it is written with the new hash, and the next run is unchanged with no fetch;
  - re-record alone triggers the write (same version, no baseline);
  - no manifest → no report.
- `npx jest --config scripts/jest.config.js scripts/__tests__/sync.type-contract.test.ts` → **8 passed** (the build-side `.d.ts` hash: a `PrimitiveToken` field change, a comment-only change, an enum removal, determinism).
- `npx jest src/cli/__tests__/sync.name-contract.test.ts -t contractHash` → `init` records `sha256:…`.

### Bites (mutate → run → restore; `cmp` confirmed each restore)

| Mutation | Red |
|---|---|
| The diff direction reversed | `✕ previous A,B → current A,C → "removed: B; added: C"…` (1 failed) |
| Equal members swallowed as `unchanged` | `✕ a comment-only change … → "no member changes detected"` (1 failed) |
| A fetch failure returns `unchanged` | `✕ offline (the fetch fails) → cannot tell, NEVER silently clean` (1 failed) |
| No recorded hash returns `unchanged` | `✕ a legacy / pre-contract manifest (contractHash "") → no baseline…` (1 failed) |
| A predating version read as a fetch failure | `✕ a previous version that predates name-contract.json → no baseline` (1 failed) |
| The mismatch guard removed (diff against the wrong baseline) | `✕ the fetched previous contract does not match the recorded hash → cannot tell` (1 failed) |
| The save step does not re-record | `✕ RE-RECORD: contractHash moves to the installed hash only when sync WRITES the manifest` (1 failed) |
| A hash change does not count as a manifest change | first run: **did not bite** (every case also changed `installedVersion`). I added the same-version case, and it then went red: `✕ RE-RECORD alone triggers the write…` (1 failed) |
| (at `23e3afcc`) the hash over members only / enums only / `init` not passing it | 2 / 3 / 1 failed (`sync.type-contract.test.ts`, `sync.name-contract.test.ts`) |

## Application-time adaptations

1. **The previous version is the manifest's `installedVersion`**, the version recorded at the last manifest write. `sync` now writes `installedVersion` and `contractHash` together, so the two stay paired.
2. **The baseline-mismatch guard** is a second `cannot tell` cause. If the fetched version's hash is not the recorded one, a member diff would be against the wrong baseline, so it is refused. This can happen, for example, when an older 123-era `sync` wrote `installedVersion` without `contractHash`.
3. **No manifest → no type-contract report.** There is nothing recorded and no write to re-record on.
4. **The `sync.type-contract.test.ts` id is split**: the build-side hash (`scripts/__tests__/`, because `typescript` is a devDependency) and the `sync`-side run (`src/cli/__tests__/sync.type-contract.run.test.ts`, in the functional lane).
5. **Out-of-list edits, disclosed**:
   - `src/cli/init.ts` (the `contractHash` fill, at `23e3afcc`);
   - `src/cli/sync/index.ts` (step 6c, the hash in `manifestChanges`, the re-record in the save step, `SyncOutcome.typeContract`, and a `loadNameContractSafe` helper).
   - Authority: the brief's rule, and Peter's fork-1 ruling.
