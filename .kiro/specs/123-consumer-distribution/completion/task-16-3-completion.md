# Task 16.3 completion: `init` agent-layer rows + row 10; the deferred `files[]` rows; manifest `origin: 'generated'`

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 16 · **Agent**: Lina (Sonnet); Ada consulted (`records-2026-09-30-signing-assurance/task16-3-consult-ada.md`)
**Date**: 2026-10-01 · **Branch**: `task/123-u2b-16-3` (worktree `DP-wt-lina-16-3`), from `2a7a5336`
**Instruments**: `.kiro/specs/123-consumer-distribution/completion/task-16-instruments.md`, rows 2.6, 2.7, 3.1–3.10, 4.7 (`init` half), 9.3, 9.4, 9.6. The rows served read as stated in the block. None changed state.

## What changed

### `src/cli/attach.ts` — the one agent-layer code path (C1: "the `attach` code path … returns its emitted file list")

`attachBorn`'s body is extracted into an exported **`emitAgentLayer({ pkgRoot, repoRoot, requestedTarget, mode, manifest, verb?, skipAgentFiles?, adoptIdentical? })`**. It loads the shipped `dist/generator/consumer-entry.js`, resolves the target through the packaged profile, calls `emitConsumer`, applies each file (file and region grain), then scaffolds that target's MCP config and approvals, and records every file and key into `manifest`. It returns `{ target, files, written, unchanged, collided, warnings }` (the emitted file list). `attachBorn` is now a thin wrapper (load or create the manifest, `emitAgentLayer`, save, print), so `attach` and `init` cannot drift. Also added: `resolveAgentTarget` (loads the bundle and resolves the target, used by `init` up front), `previewAgentLayerMissing` (for `--re-scaffold`), and a `verb` parameter on `resolveTarget` so `init`'s refusal says `init:`. The `applyFileGrain` / `applyRegionGrain` / `AttachManifestRecorder` signatures narrow to `Pick<DesignerPunkManifest, 'entries'>` (no behavior change for `attach`; `cohort`/`attach` suites green untouched).

### `src/cli/init.ts`

- **Rows 6 / 7 / 7b REMOVED** (the `.kiro/agents`, `.kiro/steering`, `governance` copies and `recordCopiedTree`), and row 8's both-target MCP emission REPLACED. One new step calls `emitAgentLayer` (`mode: 'birth'`) for the selected target. The agent layer, the `CLAUDE.md` region, the MCP config and the approval keys are all recorded in the manifest (`origin: 'generated'`, or `'emitted-key'` for keys).
- **`--target=<cc|kiro>`** parsed (also `--target <t>`). Bare `init` uses the packaged profile's `defaultTarget`. The target is resolved **up front**, before anything is written, through `dist/generator/consumer-entry.js`'s `loadPackagedConsumerProfile` (no literal target list; C12/C9). An undeclared target exits 1 naming the declared set, with nothing written.
- **`attachedTargets`** comes from the emission (`manifest.state.attachedTargets`, which starts empty), replacing the `['cc', 'kiro']` literal at the old L94. Bare = `[defaultTarget]`, `--target=<t>` = `[<t>]`.
- **Row 10**: the example comment is replaced with Ada's text, character for character (the two replaced lines are exactly the ones she named; the first three header lines stay). The stale header note at old L317 ("UNCHANGED in U1 (comment updated at Task 16)") is rewritten.
- The sequenced restart row was already printed last. It is now asserted string-equal in order (below). The `--re-scaffold` preview drops the three copied roots and adds the agent-layer files the emission would create.
- `ManifestBuilder` holds `state: { entries, attachedTargets }`, which is what `emitAgentLayer` records into; `build()` reads it back. The exported class and its `recordFile` / `recordKey` / `build` contract are unchanged.

### `src/cli/designerpunk.ts` — help text only

`init` options gain `--target=<cc|kiro>`, and `--skip-agents` reads "Don't generate the agent layer".

### `package.json` `files[]` (instruments 3.1, 3.2)

- ADD `dist/consumer-canonical/**`, `dist/generator/**`, and the eight identity docs by explicit path (`Agent-Directory`, `AI-Collaboration-Principles`, `Civitas-System-Overview`, `core-goals`, `DesignerPunk-Systems-Overview`, `Spec-Feedback-Protocol`, `start-up-tasks`, `Task-Completion-Protocol`).
- REMOVE `.kiro/agents/` and the `.kiro/steering/` directory glob.
- Negations `!dist/ios/**`, `!dist/android/**`, `!dist/web/**`, placed directly after `!dist/**/__tests__/**`.
- `governance/` STAYS. `templates/personal-note.template.md` is Task 22's and is neither added nor asserted.
- **Consequences**: REMOVE `.kiro/agents/` discharges the shipping half of `.kiro/issues/2026-09-27-attribution-sidecars-shipped.md` (instrument 3.10); no packed path ends `.attribution.json` (asserted). `.kiro/steering/personal-note.md` **no longer packs** (it shipped before). The pack is 1638 entries.

### `scripts/pack-assert.ts` (instruments 3.3, 3.4) — new section 9, 78 assertions total (was 40)

Every ADD present (`dist/generator/consumer-entry.js`; `dist/consumer-canonical/` holding at least one `.md`, one `.yaml` and one `.js`; the eight identity docs by path). Every REMOVE absent (nothing under `.kiro/agents/`; the packed set under `.kiro/steering/` equals exactly the eight; `personal-note.md` named absent; no `*.attribution.json`). Negated paths absent (no packed path starts `dist/ios/`, `dist/android/`, `dist/web/`). `governance/` kept (packed count equals the tree's count, derived, plus the `Token-Governance.md` sentinel). Every `exports` `./dist/*` target packs (15 found). The `dist/` root files are **enumerated from the built tree** (the 13 the glob selects: `ComponentTokens.{android.kt,ios.swift,web.css}`, `DesignTokens.{android.kt,dtcg.json,figma.json,ios.swift,web.css}`, `TokenEngine.{d.ts,js}`, `browser-entry.{d.ts,js}`, `name-contract.json`, which matches Ada's list) and each is asserted to still pack. Nothing was copied from her list.

### Tests

- `src/cli/__tests__/init.test.ts`: the Kiro MCP tests now pass `--target=kiro`, the Claude Code ones `--target=cc` (one target per `init`). The "steering/governance merge" case is replaced by a Kiro pre-seed/collision case. The manifest case asserts `generated` agent entries, a region entry and zero `copy`. New blocks: agent layer per target (the manifest equals the lane's own emission, with on-disk hashes); no `governance/`, no `personal-note.md`, no copy-origin entries; `--skip-agents`; an undeclared target; `--re-scaffold`. Also new: `attachedTargets` (bare, `--target=kiro`, `--target=cc`, and the two-target case `init --target=kiro` then `attach --target=cc`, which is where the old `['cc','kiro']` expectation moved); row 10's exact text; an unedited release-1 `.designerpunkignore` (hash equal to the cohort fixture's baseline) is not classified by `classifyFiles`; and the restart row string-equal LAST for both targets.
- `src/cli/__tests__/sync.test.ts`: one assertion's premise retired (see adaptations).

## Targeted tests + result

- `npm test -- src/cli/__tests__/init.test.ts`: 36/36. `npm test -- src/cli/`: 33 suites, 387 tests green after the `sync.test.ts` fix, with `cohort.fixture.test.ts` untouched and green. Full `npm test`: **387 suites, 9328 tests green**. `npm run typecheck`: clean.
- `npm run build`, then `npx tsx scripts/pack-assert.ts`: **78/78**. Build noise (`docs/tokens.css`, `token-index/semantics.yaml`) restored from HEAD, never staged.
- `npm run check:122:diff-guard`: `full-run-green (input-closure-changed)`. No stale signature or confirmation unit. `canonical/generated.lock` moved (`inputClosure` only; `outputs` hash unchanged) and is committed with this work. Zero re-signs, as forecast.
- **Bites** (each restored from a saved copy):
  - `attachedTargets`: restoring `attachedTargets: ['cc', 'kiro']` in `ManifestBuilder.build` turns 5 tests red. The named assertion is `expect(readManifestFile(scratchDir).attachedTargets).toEqual([PROFILE.defaultTarget])` in "bare init records [defaultTarget]", which received `["cc","kiro"]`. The `--target=kiro` and `--target=cc` cases and `--skip-agents` fail too.
  - Negations: with probe files in `dist/{ios,android,web}/` and the three negations removed, `pack-assert` fails 3 assertions (`1 packed` for each dir); with them present it passes (`0 packed; the build tree holds 1 file(s) there`).
  - REMOVE rows: restoring `.kiro/steering/` and `.kiro/agents/` fails 3 (the agents list, steering-set equality naming `personal-note.md`, and `personal-note.md`).
  - ADD row: dropping `dist/consumer-canonical/**` fails the `.md` and `.yaml` assertions (`0 of 1 packed there`).

## Application-time adaptations (flagged for confirmation)

1. **`--skip-agents`** is not specified for the new flow. I read it as: no agent files, **no `attachedTargets` entry**, the target's MCP config still wired. This is the line `attach --reference` already draws (MCP wiring without "attached"), so generated-surface `sync` never expects files that were deliberately not emitted. Alternative: also skip MCP.
2. **`init --re-scaffold`**: the preview lists missing agent-layer files (via `emitConsumer`, no writes). The manifest is rebuilt from scratch as before, so I added `adoptIdentical` (init only): a pre-existing path holding byte-identical content is claimed in the manifest. A consumer-edited generated file is **left byte-identical, reported as a collision, and not recorded**. Alternative: seed the old manifest, which would overwrite her edits.
3. **Named-default notice (A2)** is not printed on bare `init`. C27 assigns it to Task 22.5 (Leonardo), and it is not in 16.3's criteria.
4. **`src/cli/__tests__/sync.test.ts`**: one assertion required `init` to record `origin: 'copy'` entries. Its premise is retired (rows 6/7/7b removed), so it now asserts zero `copy` and at least one `generated`. The no-op-sync property it exists for is untouched.
5. **`tarball-target.json` not refreshed.** `pack-assert.ts` does not write it (Task 3.6 wrote it separately, and its own note says later units shift the numbers; U5 re-measures). It is not a Task 16 Primary Artifact. Today's pack is 1638 entries / 6,397,450 bytes against the 1597 snapshot; the delta is `dist/consumer-canonical/**` (126) plus `dist/generator`, less `.kiro/agents` and the steering doc.
6. **`designerpunk.ts` help text** (two lines) is a drive-by in a 16.2-granted file: the option text for `--target` / `--skip-agents` was otherwise false.

## Found later (for the PRIMARY)

- **unlisted (16.6)**: `tests/consumer-integration.test.ts` L198 asserts `.kiro/steering` exists after bare `init` in the packed install. Bare `init` now emits `cc`, so that path is absent and the assertion is false. It is in the `npm run test:consumer` lane (not `npm test`), which I did not run (16.6's pack-with-scripts block). Not edited here.
- **unlisted (16.5)**: `Manifest.ts`'s `COPY_ROOTS` and U1 `sync` still scan the package for `.kiro/agents` / `.kiro/steering` / `governance`. The package no longer ships those paths, so a release-1 consumer's `sync` now sees them as "removed from package" until 16.5's cohort/migration path lands. That is exactly the cohort case 16.5 builds.
- **Ada's flag, no action in 16.3**: the Integration Guide M0a tells consumers to copy the un-themed root snapshots (`DesignTokens.{ios.swift,android.kt}`, `ComponentTokens.*`), in tension with the Kenya/Data overlays' "never read for themed values". Route to Peter's ballot. Her survivor: M0b `sync:ios` should retire the root swift/kt later.
- **tasks.md ticks**: not marked. I have no `taskStatus` tool, and the 16.3 checkbox is unticked for the PRIMARY.
