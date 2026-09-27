# Task 5.4 Completion — Managed set; classifications; `removed` scoping; apply behavior; Applier deletion

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 5 · **Agent**: Lina (Opus)

## What changed

- **`FileScanner.ts`**: the fixed `MANAGED_DIRS` list is **gone**. Callers pass the roots; what is managed is what the manifest recorded. `src/tokens`, `src/types` and `src/components/core` are never scanned for reconciliation (Req 5.8).
- **Managed set (U1)**:
  - FILE grain: the package-copy roots (`.kiro/agents`, `.kiro/steering`, `governance`, legacy `.kiro/skills`) under which the manifest holds `origin: 'copy'` entries (`managedCopyRoots`). These are still copied in U1 (sequencing decision 1).
  - KEY grain: the three JSON surfaces for `attachedTargets` (5.3).
  - Scaffold `generated` entries (config, jest config, …) are carried untouched: never compared, never pruned.
- **`Classifier.ts`**:
  - the classes gain `deleted-by-you` (an entry, a package file, no project file → reported; re-added only with `--restore <path>`) and `untracked-new` (produced at key grain; see 5.3);
  - **`removed` is scoped** to entries under managed copy roots, and de-managed entries are **pruned before classification**;
  - an unrecorded, byte-identical copy is *adopted* into the manifest on apply;
  - a recorded entry whose package file and project file are both gone is dropped.
- **`Applier.ts`**: **the source tier and its `isSourceTs` branch are deleted** (C4). A file is copied byte-for-byte, and the manifest records the hash of **the bytes written**. Spec 111 recorded the package hash after writing transformed bytes, so every such file read "locally modified" on the next sync; dp-portfolio's manifest shows 6 such entries (5.1). `applyKeys` records key entries.
- **`Reporter.ts`**: `buildReport` returns the lines, and they print **before** any decision. It holds sync's catalog rows (`deleted-by-you`, `untracked-new`, "consumer key under our prefix"), string-equal to the design. The Task-5-authored strings are the steward exemption, off-TTY report-only, retired `--force`, corrupt manifest, invalid surface JSON, and package keys unavailable.
- **`index.ts` — apply behavior**:
  - **no class applies without the report first**;
  - **off a terminal without `--apply`, nothing is written**;
  - on a terminal, **one batch confirmation** (`[y/N]`);
  - `conflict` applies only with `--overwrite <path>`, and `deleted-by-you` only with `--restore <path>`;
  - the governance-tier auto-apply is **retired**;
  - `--force` / `--accept-all` are **retired**: reported, never honored;
  - `parseSyncArgs` owns the flags.
  - The Spec 119-A stale-`MCP_STEERING_DIR` check keeps its own report-then-prompt semantics, and it is advisory off a TTY.
- **The steward exemption — found-not-fixed item 5** (below).

### Found-not-fixed item 5 — this repo's own `.kiro/sync-manifest.json`

- **What would have happened**: in this repo, `@3fn/core/package.json` self-resolves to the repo root. So `sync` would compare the package with itself.
  - Under Spec 111 it re-baselined and rewrote `.kiro/sync-manifest.json` (that is how the tracked file got `version 12.0.2`, `syncedAt 2026-06-29`, 870 entries).
  - Under the new code, **without a guard**, the legacy trigger would fire. With changes applied, it would write a root `designerpunk.manifest.json` into the steward repo and a pointer into the tracked legacy file. It would also classify the seven `*.refs.ts`-renamed paths `removed` (the refs-rename issue recorded this).
- **What the design says**: C2's steward exemption (`root === resolvePackageRoot()`) covers birth classification. **The design does not say `sync` owns this repo's manifest.** So per the brief, it is recorded and **left untouched**.
- **What `sync` does now**: `realpath(pkg.root) === realpath(projectRoot)` → prints `STEWARD_REPO_MESSAGE` and returns **before reading or writing anything**. Asserted against the real repo: bytes of `.kiro/sync-manifest.json` unchanged, and no root manifest created. Also asserted against a synthetic steward, where `node_modules/@3fn/core` is a symlink to the project, **with `--apply`**.
- **The file itself is UNCHANGED** by this task. It stays stale (12.0.2, old paths). It is also a surface the 119-A relocation-integrity gate asserts (`mcp-server/src/relocation-integrity-gate/relocation-integrity-gate.ts:254`, ≥80 `governance/` keys, 9 identity keys), which is one more reason not to touch it from `sync`. Its disposition (delete, or keep as the gate's fixture) is a steward call, not a Task 5 one.

### Disclosed out-of-list edits (authority: the brief's minimal, disclosed rule)

1. **`src/cli/designerpunk.ts`**:
   - `runSyncCommand` becomes a call-site swap: `runSync({ ...parseSyncArgs(process.argv.slice(3)), projectRoot: process.cwd() })`, plus the import;
   - **one help line** is swapped: `sync --accept-all` → `sync --apply`. Leaving the retired flag advertised would be untruthful.
2. **`src/cli/__tests__/Prompter.test.ts`**: one fixture line (`tier: 'source',`) is deleted, because `ClassifiedFile` no longer has a tier. `Prompter.ts` is unchanged and **now unused** by `sync`: batch confirmation lives in `index.ts`, and conflicts are never resolved interactively. It is left in place as a residual (deleting it is outside the list).
3. Test files of listed modules, **deleted as superseded** (these are tests of listed modules, inside the grant): `Applier.test.ts`, `Classifier.test.ts`, `Reporter.test.ts`. Each asserted Spec 111's tier model. They are replaced by `sync.classify.test.ts`, `sync.keygrain.test.ts`, `sync.catalog.test.ts` and a rewritten `sync.test.ts` / `FileScanner.test.ts`.

## Targeted tests + result

- `sync.classify.test.ts` → **4/4**: the three named cases (count asserted) — `deleted-by-you`, `untracked-new`, `removed` only under managed entries.
- `sync.test.ts` → **14/14**:
  - **ours never flows into theirs** (born and legacy manifests: the `src/tokens` directory hash is unchanged; a deleted token file is not re-added; a new package token file is not added);
  - **off-TTY without `--apply` → whole-repo directory hash unchanged**, with ≥6 files and pending updates, relocation, and key changes;
  - a terminal decline (the report is already printed when the confirmation is asked, captured at confirm time);
  - a terminal accept (updated-safe applied, the conflict not);
  - `--overwrite` (the manifest records the written bytes);
  - flag parsing;
  - retired `--force`;
  - **legacy relocation** (the root manifest re-serializes to itself, the pointer is present, and the second run writes nothing);
  - **init → sync no-op**: real `runInit` in a scratch repo, then `sync --apply` → zero files change. This proves init's recorded file and key hashes (incl. per-entry `.claude/settings.json` keys) are what sync compares;
  - **the steward exemption** ×2;
  - **generate after the `src/types` pruning**: a legacy tier of this repo's `src/tokens` (minus `component/`, `__tests__`) and `src/types`, 20+ files. After `sync --apply` prunes, `src/types` is byte-unchanged and `resolveTokens` loads the tier through its relative `../types` imports (primitive and semantic counts > 0). The standing bite (without `src/types` the same load throws `Cannot find module '../types…'`) proves the check is sensitive to it. **Scope (R26.8)**: this is generate's token-tier LOAD phase (barrel contract + the full tier), run through `resolveTokens`' injectable loader under Jest, not platform emission.
- `sync.catalog.test.ts` → **8/8** (six catalog rows, count asserted, plus the C7 step-3 phrase).
- `FileScanner.test.ts` → 3/3.
- `grep -n "isSourceTs" src/cli/sync/` → **0**.

### Bites recorded red (mutate → run → restore; `cmp` confirmed each restore)

- **Classification** (`sync.classify.test.ts`):
  1. Classifier `deletedByYou` → `new` → `✕ case 1/3 — deleted-by-you…` — 1 failed.
  2. KeyGrain `untracked-new` → `new` → `✕ case 2/3 — untracked-new…` — 1 failed.
  3. (a) The legacy conversion prunes nothing → `✕ case 3/3…` at `expect(out).toContain(prunedMessage(2, 'src/tokens'))` — 1 failed. (b) Pre-123 semantics (no pruning, AND `removed` unscoped over `src/tokens|types|components/core`) → `✕ case 3/3…` at `Expected pattern: not /src\/(tokens|types|components)/` — 1 failed.
- **End to end** (`sync.test.ts`):
  - **Pre-123 managed set** (`src/tokens` in the copy roots and out of the de-managed list) → `✕ legacy manifest that recorded the token tier: still byte-unchanged…` — 1 failed. The born-manifest variant stays green under this bite, correctly: a born manifest never records `src/tokens` (Task 2's guard), so the root is never managed.
  - **Off-TTY guard removed** → `✕ NO CLASS APPLIES WITHOUT THE REPORT FIRST…`, `✕ the retired --force applies nothing on its own` — 2 failed.
  - **Steward guard removed** → `✕ in THIS repo, sync stops…` (dry-run, so nothing was written; `git status` was clean afterwards) and `✕ a package root that IS the project root is never relocated, even with --apply` — 2 failed.

Restored: all green (see 5.5 for the full-suite run).

## Application-time adaptations

1. **File-grain `untracked-new` has no producer in U1.** A copy root the consumer never received (e.g. dp-portfolio's `governance/`, since she is pre-13) is not managed. Its package files are neither offered nor reported, because U2's gate 4b retires those copies and the `untracked-new` remedy (`attach`) will not add them. New package files under a root she DID receive are `new`, offered after the report. `untracked-new` is exercised at key grain, which is U1's only generated surface.
2. **The terminal confirmation defaults to No (`[y/N]`)**, where Spec 111 defaulted to Yes: "the first 123-era sync never auto-applies anything" (C7 step 7).
3. **`--overwrite <path>`** is the per-path flag for `conflict`. The design names "a per-path flag" but only spells out `--restore`. It accepts `<file>#<key>` ids for keys.
