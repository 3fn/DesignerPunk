# Task 15.1 completion: the consumer rendering lane, its guarded root, and the rendered hash

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 15 · **Agent**: Thurgood (Opus), PRIMARY
**Date**: 2026-09-29 · **Branch**: `task/123-u2b-profile` (unit branch, main checkout), from `8dbf4f29` (the Instruments block, `completion/task-15-instruments.md`)

**Write scope**:
- **Inside the grant** (Task 15's row): `tools/agent-generator/{derive,generate}.ts` and `tools/agent-generator/consumer-profile.ts`.
- **Out-of-list, disclosed**:
  - **`tools/agent-generator/regrounding/freshness.ts`** (a Task 13 artifact). Task 13's parent doc carried these to Task 15 by name: the `renderedHash` wiring, the `signature-unverifiable` id, and the profile-glob decision. All three live in this file (adaptation 3). `diff-guard.ts` is **not** edited: the default supplier sits inside the sweep, which the guard already runs first on every run.
  - **`tools/agent-generator/__tests__/operative-set-freshness.test.ts`** (Task 13's test): the renamed id, plus the evidence notes the signed cases now need.
  - **`tools/agent-generator/__tests__/consumer-rendering.test.ts`** (new): the row names no test file.
  - **`canonical/coverage-manifest.yaml`** (generated): gains `canonical/_consumer-output/**` under `122-diff-guard`.
  - `canonical/generated.lock` is **not** committed here. It is refreshed once at the parent.

**CI-provenance**: branch-head dispatch @ 1a99c3899e9f86299d2b69afa3340650dc803a88 — https://github.com/3fn/DesignerPunk/actions/runs/36556690520, https://github.com/3fn/DesignerPunk/actions/runs/36556698068, https://github.com/3fn/DesignerPunk/actions/runs/36556704840, https://github.com/3fn/DesignerPunk/actions/runs/36556712293, https://github.com/3fn/DesignerPunk/actions/runs/36556719915, https://github.com/3fn/DesignerPunk/actions/runs/36556726777

**Instruments served** (block rows): 1.3, 2.2, 2.3, 2.5 (layout), 2.6 (the refusal half), 5.3, 5.5; and note N4.

## What changed

- **`consumer-profile.ts`**: `CONSUMER_OUTPUT_ROOT = 'canonical/_consumer-output'`, declared beside the target list (C12, "profile, targets, guarded surfaces"). `generate.ts` and the sweep's reader both import it.
- **`generate.ts`**:
  - **`loadConsumerInputs(repoRoot, agents)`** reads each agent's committed `canonical/profiles/consumer/<agent>.dispositions.yaml`, schema-validated through 13.1's `loadDispositions`, which throws on any finding. It also reads the same-stem `<agent>.overlay.md` (13.2's `parseOverlay` → `toSpanOverlay`). Agents with no dispositions file are listed as `missing`.
  - **`generateConsumerRendering(agents, adapters, inputs)`** emits every resolved ledger agent through **every** adapter under `profile: 'consumer'`, with that agent's rows and overlay (15.0's `AdapterContext.consumer`). Each path is remapped to `canonical/_consumer-output/<target>/<emitted path>`, and the sidecars are kept.
  - **Population, all-or-nothing**:
    - **none** authored → emits nothing. This is the declared pre-15.4 state.
    - **some** authored → throws `partialConsumerPopulationMessage`, naming the agents with no file.
  - **`generateAll` step 5**: the steward lane's resolved ledger agents (`ResolvedForEmission[]`, collected in step 4) are re-emitted through the consumer lane, so there is **one corpus session and one resolution per agent**. Because it runs inside `generateAll`, the diff-guard regenerates and compares it on every full run.
  - **`guardedRoots()`** gains `CONSUMER_OUTPUT_ROOT`. That one directory root covers C12's three surfaces: `_canonical/`, `<target>/` agents, `<target>/` identity members, and their sidecars.
- **`derive.ts`** gains the read side of the committed rendering. `derive()` itself is 15.2's.
  - **`readConsumerSpans(repoRoot)`** walks every `*.attribution.json` under `canonical/_consumer-output/` and indexes each span's lines by `source`. It returns `undefined` when no sidecar exists.
  - **`rowSpanSource(docSource, section, key)`** gives a row's 10.S span source: `<src>#<anchor>`, `<src>#frontmatter:<path>`, or `canonical/shared/shared-catalog.yaml#<id>`.
  - **`renderedHashOf(spans, source)`** = `hashEntry([[artifact, text], …])` over **every** target's pieces for the source.
- **`regrounding/freshness.ts`**:
  - **The default rendered hash** is `renderedHashOf(readConsumerSpans(repoRoot), rowSpanSource(…))`, read lazily once per sweep. `opts.renderedHash` still overrides it, for tests.
  - **With no consumer rendering at all**, a signed row is refused under its own id, **`signature-unverifiable`**, with the string `signature on <key> in <file>: its renderedHash cannot be verified — no consumer rendering exists under canonical/_consumer-output/ to read it from; refusing rather than half-checking`.
  - **`evidence:` is resolved** (`signature-evidence`). The fragment must equal the row's span-source fragment (`#<anchor>`, `#frontmatter:<path>`, `#<member>`). The note must sit under `canonical/profiles/consumer/`, exist, be committed, and carry exactly one `` ## `<fragment>` `` block whose `signer:` line equals the signature's signer.
  - **`profile-unreferenced`**: every file under the profile dir must be reached by something the sweep checks. That is a record's confirmation note (including when the record itself fails), a dispositions file, an overlay, or an evidence note.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/consumer-rendering.test.ts` → **`Tests: 12 passed, 12 total`**.
- `… operative-set-freshness.test.ts` → **`Tests: 22 passed, 22 total`**.
- **Bites.** Each one mutated a file, ran `consumer-rendering.test.ts`, and restored the file; `git diff --stat` afterwards showed only the intended changes.

  | # | Mutation | Red |
  |---|---|---|
  | B1 | partial-population throw removed | `✕ a partial population refuses, naming the agents with no dispositions file` |
  | B2 | the default supplier returns `undefined` (the pre-15.1 fail-closed) | `✕ a signature pinned to the committed rendering is clean; editing the rendering stales it` |
  | B3 | `renderedHashOf` hashes only the first target's piece | `✕ reads every target's pieces of a row; the hash moves with any target's rendering and not with an unrelated row` |
  | B4 | the evidence check not called | `✕` on 3 tests, including `evidence: the note must name the row, …`. The two signed-row tests also go red, because the evidence note is then reached by nothing (`profile-unreferenced`). |
  | B5 | the unreferenced check disabled | `✕ a profile file nothing reaches is profile-unreferenced — …` |
  | B6 | `CONSUMER_OUTPUT_ROOT` dropped from `guardedRoots()` | `✕ lists canonical/_consumer-output — …` |
  | B7 | the remap drops `<target>/` | `✕ emits every agent through every adapter, …` and `✕ reads every target's pieces …` |

- **`npm run test:agent-generator`** → **`Test Suites: 49 passed, 49 total` · `Tests: 778 passed, 778 total`**.
- **`npx tsc --noEmit -p .`** → exit 0. `tsc -p tools/agent-generator` → exit 0.
- **`npm run check:122:diff-guard`**:
  - first run → `diff-guard: FAIL (input-closure-changed)` · `changed: canonical/coverage-manifest.yaml`. That is expected: the new guarded root adds a manifest glob.
  - `npm run audit:coverage-map` → `audit:coverage-map: PASS (surfaces PASS · lanes PASS)` · `total surfaces : 307` · `guarded : 306` · `blank : 1` · `adjudicated-blank : 1`. This regenerated the manifest.
  - re-run → `operative-set-freshness: PASS — 4 record(s), 24 unit(s), 4 note(s), 0 dispositions file(s), 0 overlay(s)` then **`diff-guard: full-run-green (input-closure-changed)`**. The lock refresh this wrote was reverted; the lock is committed at the parent.
  - The real repo has no `profile-unreferenced` finding: all four profile files are confirmation notes that records reach.

### Criterion C1's sweep, recorded (block row 1.3) — **it does not return only imports**

Command 1 (literal two-target lists):
```
git grep -n -E "\[ *['\"](cc|kiro)['\"] *, *['\"](cc|kiro)['\"] *\]" -- 'tools/**' 'src/**' 'scripts/**' '.kiro/hooks/**' '*.json' ':!**/__fixtures__/**'
```
Output (13 lines):
```
src/cli/__tests__/Manifest.test.ts:38:    attachedTargets: ['cc', 'kiro'],
src/cli/__tests__/init.test.ts:365:    expect(manifest.attachedTargets.sort()).toEqual(['cc', 'kiro']);
src/cli/__tests__/syncTestKit.ts:110:  const computed = computePackageKeys(pkgDir, ['cc', 'kiro']);
src/cli/__tests__/syncTestKit.ts:128:    attachedTargets: ['cc', 'kiro'],
src/cli/init.ts:94:      attachedTargets: ['cc', 'kiro'],
tools/agent-generator/__tests__/consumer-profile.adapters.test.ts:189:    expect(adaptersFor(['cc', 'kiro'], FIELD_DISPOSITIONS).map((a) => a.target)).toEqual(['cc', 'kiro']);
tools/agent-generator/__tests__/consumer-profile.adapters.test.ts:190:    expect(Object.keys(registeredAdapterFactories())).toEqual(['cc', 'kiro']);
tools/agent-generator/__tests__/consumer-profile.adapters.test.ts:209:    expect(p.targets).toEqual(['cc', 'kiro']);
tools/agent-generator/__tests__/pipeline.test.ts:140:    for (const target of ['cc', 'kiro'] as const) {
tools/agent-generator/__tests__/skills.test.ts:143:    expect(result.targets).toEqual(['cc', 'kiro']);
tools/agent-generator/consumer-profile.ts:8: * — a literal `['cc', 'kiro']` — is the second list C12 forbids.
tools/agent-generator/skills.ts:163:    for (const targetKey of ['cc', 'kiro'] as const) {
tools/agent-generator/skills.ts:169:  return { written, targets: ['cc', 'kiro'] };
```
Command 2 (target-name unions, non-test):
```
git grep -n -E "['\"](cc|kiro)['\"] *\| *['\"](cc|kiro)['\"]" -- 'tools/**' 'src/**' 'scripts/**' ':!**/__fixtures__/**' ':!**/__tests__/**'
```
Output: `src/cli/sync/Manifest.ts:32` (`HarnessTarget`), `tools/agent-generator/adapters/index.ts:225` (`TargetAdapter.target`, kept unchanged **by Req 9.1**), `adapters/kiro.ts:503`, `compose.ts:31` (`Target`), `skills.ts:131`.

**Reading.** Declared lists outside the profile:
- `src/cli/init.ts:94`, `attachedTargets: ['cc', 'kiro']`. This is U1's manifest writer, which claims both targets are attached. Under DD9, bare `init` emits `cc` only, so this is **Task 16's** (the `init` agent layer / `attach`).
- `tools/agent-generator/skills.ts:163,169`, `emitSkillTrees`. It is a Spec 122 helper that only `skills.test.ts` calls; `generateAll` uses `adapter.emitSkills`.
- Test-side literals (`pipeline.test.ts:140` iterates one).

**Not a declared list**: the type unions. Req 9.1 keeps `TargetAdapter.target` as a union.

**The criterion row is therefore unmet at 15.1.** It is surfaced as a fork (adaptation 7), not fixed out-of-list.

## Application-time adaptations

1. **Output layout.** It follows the `generateFixture` remap precedent that Req 9.5 names: `canonical/_consumer-output/<target>/<emitted path>`. So an agent lands at `cc/.claude/agents/<a>.md` and `kiro/.kiro/agents/<a>{.json,-prompt.md}`, and identity members will land at `cc/.claude/identity/…` and `kiro/.kiro/steering/…` (C19's table, 15.3). Design C12's `<target>/agents/…` and `<target>/identity/…` read as shorthand for these paths. Sidecar `artifact` fields keep the emitted, consumer-root-relative path, as the fixture does.
2. **The profile file and `AdapterContext.profile`** (the row's first two items) were delivered at **15.0**. 15.1 adds only `CONSUMER_OUTPUT_ROOT` to the profile module.
3. **What `renderedHash` pins, decided.**
   - It hashes every declared target's rendered pieces of the row, each paired with its artifact path. A change to either target's rendering stales the signature, and so does a move of the artifact.
   - A row that renders nothing (`no-consumer-counterpart`, which Req 11.5.1 also has signed) hashes the empty list. That value is defined, and it goes stale if the row ever starts rendering.
   - `undefined` is only "no rendering exists", and is refused as `signature-unverifiable`.
   - The source is the **committed** rendering's sidecars, not a re-render, so the sweep stays a filesystem read that runs before generation. The guard's tree compare then binds the committed rendering to a fresh one.
   - **Alternative not taken**: hashing `_canonical/` (one target-free rendering). It is available only after 15.2, and it is not what either target's agent reads.
4. **The profile-glob decision (N4)**: **resolve, not narrow.** Evidence notes are resolved, and unreached profile files are refused. With this, the `canonical/profiles/consumer/**` row under `122-diff-guard` claims exactly what the sweep reads. Narrowing the globs would have left signature notes, the whole point of the dir at 15.5, unguarded.
   - **The evidence-note format is set here**: a `` ## `<span-source fragment>` `` block with a `signer:` line, mirroring the confirmation notes. 15.5's signers write to it.
5. **Population, all-or-nothing.** "Zero" is a declared state before 15.4, not a pass. Block row 2.6's test lands at 15.4 and asserts that the committed rendering covers every ledger agent × declared target, so zero cannot pass silently after the profile exists.
6. **`_canonical/` and `derive()` are not in 15.1.** The seam for 15.2 is inside `generateConsumerRendering`: `derive()` runs first for each agent (refusing on a stale overlay or an orphaned key) and emits `canonical/_consumer-output/_canonical/agents/<a>.md`. See the handoff in the orchestrator report.
7. **Criterion C1's sweep is not clean.** See the recorded output above. Fork, for the orchestrator:
   - **(a)** scope the criterion to the generator's emission path and name the two remaining homes: `init.ts` → Task 16, `emitSkillTrees` → retire or derive from the profile under a grant;
   - **(b)** a grant to fix `skills.ts` now, with `init.ts` carried to Task 16 by name.

   Either way, the row is ⚠️ at the parent unless the plan changes.
8. **The Kiro JSON config** renders steward-shaped under the consumer profile, into `_consumer-output/kiro/.kiro/agents/<a>.json`, unchanged from 15.0 (C20). 15.3 decides its consumer semantics or carries them to Task 16 by name (block note N3).

## Addendum 2026-09-29 — provenance, and two write-scope gaps found preparing the 15.2 handoff

*Append-only; the sections above are unchanged except the `**CI-provenance**` line. The line was `local` at `1a99c389`; all six dispatched runs concluded `success` at `1a99c389`. `git diff --name-only 1a99c389..<this commit>` lists only this doc.*

1. **Shared-catalog members ignore their rows under the consumer profile.** `emitSpans`'s `shared` branch (`spans.ts`) renders every shared member whatever `_shared.dispositions.yaml` says, and both adapters route shared members through it (`adapters/cc.ts:358`, `adapters/kiro.ts:409`). A `no-consumer-counterpart` member (for example `complete-task-tooling`, `runContext: this-repo`) would still ship in every consumer agent.
   - It is the same class as 15.0 adaptation 4 (container pieces, block note N1).
   - The fix is in `spans.ts` and the adapters, which Task 15's row lists as **"15.0 only"**.
   - Recorded in the Instruments block's `## Found later` as `unlisted`.
2. **15.3's `emitIdentityMembers` is a new adapter method** (C19), so it needs `adapters/{cc,kiro,index}.ts`, which are also "15.0 only" on the row. That leaves subtask 15.3's own text outside its row's Primary Artifacts.
   - Container pieces (N1) and item 1 need the same files.
   - Routed to the orchestrator: a tasks amendment widening the adapters, `spans.ts` and `index.ts` to 15.3–15.5, or a recorded grant.
