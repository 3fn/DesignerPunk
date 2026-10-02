# Task 16.2 completion: `attach` — modes, refusals, restart line, vocabulary object, safe re-run

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 16 · **Agent**: Lina (Sonnet)
**Date**: 2026-10-01 · **Branch**: `task/123-u2b-16-2` (worktree `DP-wt-lina-16-2`), from `ff0fadb6`
**Instruments**: `.kiro/specs/123-consumer-distribution/completion/task-16-instruments.md`, rows 4.1–4.7 and 9.5 (served, all "built here"). Row 9.2's capability (reachability of `loadConsumerProfile` from `src/cli` and a packed install, via `dist/generator/consumer-entry.js`) is consumed, not built, here.

## What changed

### `src/cli/shared/vocabulary.ts` (new) — instrument row 4.5

The five-lifecycle-verb object design.md's C20 names ("it is the fifth lifecycle verb in `vocabulary.ts`"). Exports:
- `LIFECYCLE_VERBS`: `init` / `generate` / `sync` / `validate` / `attach`, each with a one-line description — the ONE source Req 15B.5 ("the vocabulary SHALL be consistent across the install doc, the CLI terminal output, and the starter specs") asserts against, so the CLI's own surfaces and Task 19's install doc can never hand-drift into two descriptions of the same verb.
- `ATTACH_OBJECT` + `attachUsage()`: the paired form `attach a harness (agents + MCP config + approvals)` — DD4/C20's "the verb never appears without its object." Every surface naming `attach` in prose composes it via `attachUsage()` rather than its own wording.
- `lifecycleVerb(verb)`: looks up one entry, throwing (naming the unknown verb) rather than returning `undefined`.

### `src/cli/shared/errorCatalog.ts` — instrument rows 4.2–4.4

Two new catalog functions, transcribed verbatim from design.md § "Error Handling":
- `attachUnbornRepoMessage()` — the `attach` in an unborn repo (A8) row.
- `restartLineNowMessage()` — the restart-line-now row (`attach --reference` output only).

Both appended as a self-contained hunk at the end of the file, touching no existing lines (same discipline the 16.4 seat used for `managedRegionMarkersMissingMessage`).

### `src/cli/attach.ts` (new) — instrument rows 4.1, 4.4 (the refusal wiring), 4.5 (consumes `vocabulary.ts`), 9.5

`runAttach(argv)`, dispatched from `designerpunk.ts`. Three branches:

1. **`--reference`** (works regardless of birth state — C20: "unborn, or an existing consume-posture repo"): loads or creates a `posture: 'consume'` manifest, scaffolds MCP config + approvals for **only** `designerpunk-docs` and `designerpunk-application` (never `designerpunk-product`, and no agents — `referenceOnlyTemplate` filters the template before handing it to the existing `scaffoldKiroMcpConfig`/`scaffoldClaudeCodeMcpConfig` emitters), and prints the restart-now line **last**.
2. **Unborn, no `--reference`** → `attachUnbornRepoMessage()`, exit 1.
3. **Partial** → the shared `partialCaseMessage` (same catalog `init`/`generate` already use), exit 1.
4. **Born or package-mode** (`attachBorn`) → full emission:
   - Loads `dist/generator/consumer-entry.js` via `require()` (never a `tools/` import — tsc's `rootDir` is `src`; this mirrors the amendment 2026-09-30 rule for `init`'s eventual profile read, applied here for `attach`'s own read).
   - Resolves the target (`--target=<t>` or the profile's `defaultTarget`), validating it against the packaged profile's declared set — an undeclared target throws, naming the declared set.
   - Calls `emitConsumer({ packageRoot, consumerRoot, target, mode: 'attach' })`, prints its degradation warnings, then applies every returned file:
     - **file grain** (`applyFileGrain`): writes the path UNLESS it already exists on disk with no manifest entry for it, in which case it is reported and left untouched (Req 19.8's collision rule) — never silently skipped or overwritten.
     - **region grain** (`applyRegionGrain`, today: `CLAUDE.md`'s always-layer region): creates the file WITH its DesignerPunk marker pair on first attach; on a re-run, splices only the managed region via `RegionGrain.spliceRegion` (Task 16.4), leaving outside bytes untouched; reports (never writes) on a missing/unmatched marker pair.
   - Scaffolds the FULL three-server MCP config (all of `designerpunk-docs`/`-application`/`-product` — the same shape `init` emits) via the existing per-harness emitters.
   - Appends the target to `manifest.attachedTargets` (dedup — **adds**, never replaces; C9/instrument 9.5).
   - Prints the restart-**sequenced** line **last**.

**Safe re-run** falls out of the manifest-gated write rule: a path the manifest already attributes to DesignerPunk (`origin: 'generated'`, recorded by a prior attach) is freely regenerated; re-running on an already-attached target changes no bytes and reports "unchanged."

**Application-time adaptation (flagged for confirmation)**: design.md's C20 "Modes" list names only `born` / `--reference` / `unborn` / `partial` — `package-mode` (C2's own posture) is unaddressed for `attach`. This module treats `package-mode` the same as `born`: `attach` is about the agent harness, not the token tier, and a `package-mode` repo already has a real `designerpunk.config.ts`. Documented in the file's header comment; a test (`package-mode is treated the same as born`) pins the current behavior so a future ruling change is a visible diff, not a silent one.

**Judgment call on `RegionGrain` wiring, disclosed against the 16.4 completion doc**: that doc's "Application-time adaptations" § 5 states "no caller wiring in this subtask… dependent subtasks are 16.4 (this one) and 16.5 (generated-surface `sync`, which wires the `CLAUDE.md` splice into the real `attach`/`sync` flow)." This subtask DOES wire `RegionGrain` into `attach.ts` (`applyRegionGrain`), because design.md's C1 "(new) agent layer" row states the attach code path "returns its emitted file list" and that list (from `emitConsumer`) includes the CLAUDE.md region content — without writing it, a freshly-attached CC consumer would have no `@`-import lines in `CLAUDE.md` at all, and `attach`'s own "safe re-run" criterion is specifically about idempotent re-application of these outputs. I read the 16.4 note as scoping the *ongoing reconciliation* (drift detection on package updates) to 16.5's `sync`, not the one-time application `attach` itself performs. **Flagged explicitly for the PRIMARY to confirm or correct** — if 16.5 was meant to own this write path entirely, `applyRegionGrain` should move there and `attach.ts`'s born path would need to skip region-grain files (leaving a gap until the first `sync --apply`, which seemed like a worse product outcome and is not stated as acceptable anywhere in the design).

**attachedTargets for `--reference`**: left `[]` on a fresh consume-posture manifest (no agents are attached in that mode, so nothing is recorded as an "attached target" in the agent-layer sense). Not stated explicitly either way in design.md; flagged as an application-time choice.

### `src/cli/designerpunk.ts` — instrument row 4.6

- Added the `attach` dispatch case (`runAttach(process.argv.slice(3))`).
- Added two help-text lines (`attach --target=<cc|kiro>` and `attach --target=<cc|kiro> --reference`), the former composed via `attachUsage()` — satisfying C20's "the verb never appears without its object… in help text."
- Exported `main` and `printHelp` (`@internal Exported for testing`) so the dispatch and the help-text pairing are directly testable, matching the file's existing `@internal` export convention (`runGenerate`, `spawnServer`, etc.).

### `src/cli/__tests__/errorCatalog.test.ts` — additive describe block

Same pattern as the Task 1.6/2 blocks already in the file: a `ATTACH_DESIGN_ROWS` comparand table (2 rows), a count-asserting bite test, and one string-equal test per row.

### `src/cli/__tests__/attach.test.ts` (new) — 20 tests

Uses the REAL package root (this repo, already built) and a scratch consumer directory — the same pattern `init.test.ts` uses (`attach.ts` resolves its own package root via `resolvePackageRoot(__dirname)`, so no override is needed). Covers:
- Refusals: unborn (exact string), partial (shared message).
- `--reference`: posture `'consume'` manifest, docs+application-only MCP config (no `designerpunk-product`, no agents/CLAUDE.md), restart-now printed last, idempotent re-run, and that it does not itself establish birth (a later bare `attach` over the same repo still refuses as unborn — exercising `bornRepo.ts` L217's consume-manifest-ignored signal, the same property C6's "attach --reference stays CONSUME" row names — the full C6 bite-and-restore is explicitly 16.6's).
- Born-repo full emission: agent files, identity members, the CLAUDE.md managed region (markers + `@`-import content), the full three-server MCP config, `manifest.attachedTargets === ['cc']`, the `CLAUDE.md#managed` region-grain manifest entry.
- Restart-sequenced line printed last (string-equal on the final non-empty output line).
- Safe re-run: byte-identical `CLAUDE.md`, unchanged manifest entry set, "unchanged" reported.
- `attach --target=<t>` ADDS to `attachedTargets` (attach `cc` then `kiro` → `['cc','kiro']`); re-attaching the same target never duplicates it.
- `package-mode` treated as attachable (pins the adaptation above).
- Req 19.8's collision rule: a pre-existing, unmanaged file at an emitted path is reported and left byte-identical; its manifest entry is never written.
- An undeclared `--target` throws, naming the declared set.
- Vocabulary: `attachUsage()`'s exact paired string; `LIFECYCLE_VERBS` has exactly five entries with `attach` fifth; `lifecycleVerb` throws on an unknown verb; `initBornRepoMessage` (the born-repo refusal, one of C20's three named "never without its object" surfaces) contains the paired phrase; `printHelp()`'s output (the other named surface) contains it too.
- Dispatch reachability: `designerpunk.ts`'s exported `main()`, driven through `process.argv`, reaches `runAttach` end-to-end (asserted via the written consume-posture manifest).

## Targeted tests + result

- `npm test -- src/cli/__tests__/attach.test.ts` → **20/20 passed**.
- `npm test -- src/cli/__tests__/init.test.ts` → **unaffected, all passed** (no edits to `init.ts` — out of this subtask's scope per the brief).
- `npm test -- src/cli/__tests__/errorCatalog.test.ts` → **all passed**, including the new Task 16.2 block (2/2) and the pre-existing Task 1.6 (7 rows) and Task 2 (5 rows) blocks, counts unchanged.
- `npm test -- src/cli/` (the full CLI suite, 33 files) → **372/372 passed**.
- `npm run typecheck` (`tsc --noEmit`) → clean.
- `npm run check:122:diff-guard` → **`full-run-green`**, see the note below on the lock refresh.

### The `canonical/generated.lock` refresh — pre-existing drift, not content from this subtask

This worktree's `mcp-server/dist/index.js` and `application-mcp-server/dist/index.js` were absent (the sub-packages' own `tsc` build had not been run here), so `check:122:diff-guard` ERRORed before it could even compute the input/output hashes. I ran `npm run build` inside both `mcp-server/` and `application-mcp-server/` (dist output only — both are `.gitignore`d, confirmed via `git status` showing no tracked change from either) so the guard could run at all.

With both sub-packages built, the guard completed: `full-run-green (input-closure-changed)`. The diff is:

```
-  "inputClosure": "53aa489204af8792524301259bb1b3265d1c3a2f9d55ea6deebed846701d01e6",
+  "inputClosure": "d8da266a6cd5468ad63d40e3bc6197d63848d486109a96aa40e754981913ab9f",
   "outputs": "48cdb3318c0cf53968d37fe268b75cabc1b7bddf6322a0b08f7a70fde6210100"
```

Only `inputClosure` moved; `outputs` (the guarded rendering's own content hash) is byte-identical — so no generated surface actually changed. `src/cli/**` is NOT one of `INPUT_CLOSURE_ROOTS` (`canonical`, `skills`, `tools/agent-generator`, `mcp-server/src`, `application-mcp-server/src`, `product-mcp-server/src`, `governance`, `.kiro/steering`, plus `package.json`/`.kiro/hooks/complete-task.sh`), so none of this subtask's own edits could have moved this hash. `git log` confirms `tools/agent-generator` changed upstream of this branch point via `75aa8c22` (`verify-signing-chain … inside 122-diff-guard`) and `dff78bcd` (the signing-act-chain ballot), merged into this branch by `ff0fadb6` — after the lock was last refreshed at `0e278450`. Nobody had re-run the guard successfully since (it could not run at all in a worktree missing the two sub-package dists), so this refresh is catching up pre-existing, already-reviewed upstream content, not introducing new drift. Per this task's instructions ("commit the lock if it moves"), the refreshed `canonical/generated.lock` is committed with this subtask.

### Pre-existing, unrelated test failures (not from this subtask)

`npm test` (full suite) showed 2 pre-existing failures, both asserting `mcp-server/dist/index.js` exists on disk (`src/__tests__/stemma-system/mcp-component-integration.test.ts`, `src/__tests__/browser-distribution/mcp-queryability.test.ts`) — a `.gitignore`d build artifact this worktree hadn't built before I built it for the diff-guard run above. After building it, these would pass too, but re-running the full suite was outside this subtask's targeted-test scope; flagged here so the PRIMARY isn't surprised by a stale observation from an earlier checkpoint in this unit. Not caused by, and not fixed by, any file this subtask edits.

## Application-time adaptations (summary — see inline notes above for full reasoning)

1. `package-mode` treated as attachable, same as `born` (design.md's C20 Modes list is silent on it).
2. `RegionGrain` wiring placed in `attach.ts` rather than deferred to 16.5, disclosed against the 16.4 completion doc's note — flagged for PRIMARY confirmation.
3. `--reference`'s fresh manifest carries `attachedTargets: []` (no agents are attached in that mode).
4. Collision reporting for file-grain outputs keys on manifest-entry presence (not file existence alone) — a path the manifest already attributes to DesignerPunk is freely regenerated; any other pre-existing file at an emitted path is a collision (Req 19.8).
5. Exported `main` and `printHelp` from `designerpunk.ts` for direct testability of the dispatch and the "never without its object" help-text check (both already follow the file's own `@internal Exported for testing` convention).

## Found later

None. No gap found in rows 4.1–4.7 or 9.5 against this subtask's scope.

## Out of scope (left to other subtasks, per the task brief)

- The `attach --reference` C6 "stays CONSUME" bite-and-restore test — 16.6's.
- `init`'s own agent-layer rows, row 10's comment, the deferred `files[]` rows, and `init.ts`'s `attachedTargets: ['cc','kiro']` literal replacement — 16.3's.
- Generated-surface `sync` reconciliation (ongoing drift detection against package updates) and the release-1 cohort migration case — 16.5's.
