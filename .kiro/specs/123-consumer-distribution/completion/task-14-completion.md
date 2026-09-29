# Task 14 Completion — Derivation checker, grain guard, and per-target bites (step 6)

**Spec**: 123 — Consumer Distribution · **Unit**: U2b — Consumer generation profile: machinery, rendering & G2 (Tasks 13–18, gated at Task 18) · **Type**: Implementation · **Validation**: Tier 3
**Agent (plan)**: PRIMARY Lina (Opus)
**Delegated-tier**: plan held — Lina (Opus) executed 14.1–14.5; Thurgood (Opus) authored Task 15.0 (the sequencing correction, #236), a separate parent's subtask, not an execution seat in Task 14
**CI-provenance**: local
**Traces**: Reqs 11.4, 10.G, 10.S, 10.8b/c · design C15, DD7

**Scope line — every edit outside Task 14's Primary Artifacts, disclosed.** Task 14's row lists `regrounding/derivation.ts`, "the guard tests", and `__fixtures__/` (E, E-fm).
- **Inside the list**:
  - `tools/agent-generator/regrounding/derivation.ts`;
  - the guard and fixture tests: `semantics-guard.test.ts`, `semantics-guard.fixture.test.ts`, `grain-guard.two-sided.test.ts`, `derivation.frontmatter.test.ts`, `derivation.test.ts`;
  - `tools/agent-generator/__fixtures__/semantics-guard/**`, including `__bites__/`.
- **Out of the list: `tools/agent-generator/partition.ts` + `__tests__/partition.golden.test.ts`** (my own Task 10 artifacts). This is the root-id reservation fix for a latent infinite loop found at 14.1 (`task-14-1-completion.md` adaptation 1). It changes no generated output: the diff-guard output hash is unchanged.
- **`canonical/generated.lock`**: refreshed **once, in this parent commit**. The input closure changed (`tools/agent-generator/**`), and the output leg is unchanged (`93f8be93…` before and after).
- **Provenance notes**: `task-14-5-completion.md` gained an appended provenance note (docs).

## Success Criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Containment through both trees only. Unknown anchors are non-matching, never a throw: attack (a) → `FAIL_NO_DERIVATION`; E → `VERIFIED`; `#body` → non-matching. | ✅ verified met | `tools/agent-generator/regrounding/derivation.ts` (`checkDerivation`, `containedIn`: `isDescendantOrSelf` within one tree; unknown ids → false). `derivation.test.ts › 11.4 over generator-emitted spans (the criterion row) › E → VERIFIED …`, `› attack (a) → FAIL_NO_DERIVATION …`, `› attack (a) at ## grain → FAIL_NO_DERIVATION …`, `› #body → non-matching, never a throw …`, plus `› containment is structural, within one tree (the R4 pin)` (both trees, `:preamble`, prefix-sharing sibling, cross-tree). `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/derivation.test.ts → 16 passed`. Bites: `task-14-1-completion.md` (5 of 6 red; bite 5 survived, recorded). |
| Golden Bite 2 recorded. | ✅ verified met | `grain-guard.two-sided.test.ts › Golden Bite 2 — the two-sided grain guard (Req 10.G) › (a) an honest ###-grain re-pointing is ACCEPTED` and `› (b) attack (a) is REJECTED`. Recorded bite (splitter collapsed to `##`): `✕ (a)` with `Received: "honest re-pointing of #the-owed-set-pipeline-…: FAIL_NO_DERIVATION"`, `✓ (b)`, `Tests: 1 failed, 1 passed, 2 total` — `task-14-5-completion.md` § Bites row 1. |
| **Body per-target, two-sided**: a `cc.ts` call-site mutation → `› cc` = **`FAIL_NO_DERIVATION`** and `› kiro` green, plus the symmetric pair. The verdict value is asserted; logs committed. **This is the arbiter for Task 10's consolidation claim.** | ✅ verified met | `semantics-guard.test.ts › cc › body: E (S re-grounded in place) is VERIFIED over this adapter’s own spans` and `› kiro › …`. Logs committed: `tools/agent-generator/__fixtures__/semantics-guard/__bites__/task-14-3-bite-body-cc.txt` (`› cc` RED, `Received: "cc body #the-owed-set-pipeline-…: FAIL_NO_DERIVATION"`, `› kiro` green) and `…/task-14-3-bite-body-kiro.txt` (`› kiro` RED, `Received: "kiro body …: FAIL_NO_DERIVATION"`, `› cc` green). Mutation = the pre-123 inline `#body` span (`90fb0e71`) at `bodyParts.push(emit('body'))`. |
| **Frontmatter per-target (E-fm), two-sided**, on `writeScope[<glob>]`, with the same pattern and logs — **OR** `frontmatter routing: asserted, not bitten — <reason>`. | ✅ verified met | Two-sided, the first branch (the forced negative is NOT taken — `task-14-4-completion.md` § "The criterion's fork, decided"). `semantics-guard.test.ts › cc › frontmatter › E-fm: writeScope[.kiro/specs/**] (re-grounded in place) is VERIFIED over this adapter’s own spans` and `› kiro › frontmatter › …`. Logs committed: `__bites__/task-14-4-bite-frontmatter-cc.txt` (`Received: "cc frontmatter writeScope[.kiro/specs/**]: FAIL_NO_DERIVATION"`, `› kiro › frontmatter` green) and `__bites__/task-14-4-bite-frontmatter-kiro.txt` (symmetric). Scope stated: the prose artifact; Kiro's JSON config (steward-shaped) is out of `› kiro › frontmatter`. |
| `derivation.frontmatter.test.ts`: `commands[<name>]` emptied with a sibling destination → `FAIL_NO_DERIVATION`. | ✅ verified met | `derivation.frontmatter.test.ts › 11.4 on the entry tree — commands[<name>] › commands[<name>] emptied (omitted) with a sibling destination → FAIL_NO_DERIVATION` and `› … emptied (kept, no text) with a sibling destination → FAIL_NO_DERIVATION`, over real `canonical/agents/lina.md` `commands[<name>]` member spans from `emitSpans`. Bite (siblings read as contained) → 5 failed — `task-14-5-completion.md` § Bites row 2. |
| One guard file iterates the targets in `consumer-profile.yaml`; a fake third target adds a third block with no other edit. | ✅ verified met | `tools/agent-generator/__tests__/semantics-guard.test.ts` (one file): `defineGuard(guardBlocks(loadConsumerProfile(REPO_ROOT).targets))` — targets from `canonical/consumer-profile.yaml` via the registry `adaptersFor` (Task 15.0). `semantics-guard.test.ts › a fake third target — declared, its adapter injected through the registry, no other edit to the guard › the declared list drives the blocks: one more target → one more block` → blocks `[cc, kiro, fake]` from the unedited `defineGuard`; `› a declared target with no registered adapter fails loud, naming it (no silent block)`. |

Unmet or partially met criteria: None

## Additional verification

Primary Artifacts: all shipped as declared

## Validation (local; `**CI-provenance**: local`)

- `npm run test:agent-generator` → `Test Suites: 48 passed, 48 total` · `Tests: 766 passed, 766 total`.
- `npm test` → `Test Suites: 384 passed, 384 total` · `Tests: 9268 passed, 9268 total`.
- `npm run typecheck` (`tsc --noEmit`) → exit 0. `npx tsc -p tools/agent-generator/tsconfig.json --noEmit` → exit 0.
- `npx tsx tools/agent-generator/diff-guard.ts` → `operative-set-freshness: PASS — 4 record(s), 24 unit(s), 4 note(s), 0 dispositions file(s), 0 overlay(s)`, then `diff-guard: full-run-green (input-closure-changed)`. The lock diff is the `inputClosure` leg only: `d79481f7…` → `3d5c44f0…`, with `outputs` `93f8be93…` unchanged.
- `npm run audit:coverage-map` → `FAIL (surfaces FAIL · lanes PASS)`, on **one** unadjudicated blank row: `canonical/consumer-profile.yaml`. That is Task 15.0's new file, and **Thurgood's follow-up (`coverage-map.ts` / `consumer-profile.ts`) is in flight**; it is not Task 14's. No Task 14 file adds a canonical surface. `audit:coverage-map` is not a required CI step.
- `npm run check:completion-criteria-parity` → see Parity.
- **Branch-head feedback runs, recorded as information** (they are feedback, not the gate). Every subtask checkpoint's six runs concluded `success`:
  - `111bba7c` (14.1): cited on 14.1's CI line via `8a5c9c25`;
  - `3de7f4c9` (14.5);
  - `2255edc9` (14.2);
  - `32386505` (14.3);
  - `e89d5a8e` (14.4): five of six had completed `success` at the time of writing, one in flight.

## Parity

`npm run check:completion-criteria-parity` after the parent tick → `SUMMARY: parents evaluated 17, pass 17, fail 0; emissions 0; reds 0` (`parent 14: PASS`).

## Carried (named, with homes)

- **→ Task 18 (G2 pass four): the partition root-id hang reaches pass four.** G2's pass four runs this checker (`derivation.ts`), and `isDescendantOrSelf` looped forever on any document with a heading titled "Doc" (it overwrote the `#doc` root and became its own parent). The fix is on the branch (`partition.ts`, root id reserved; regression test in `partition.golden.test.ts`). **Task 18's brief inherits this sentence:** pass four's checker is the fixed one, and a hang on a legal document would read as NOT-RUNNABLE for a schedulable reason.
- **14.1 provenance follow-up**: done (`8a5c9c25`). 14.1's doc carries the `111bba7c` dispatch line (rule 5 held: `git diff --name-only 111bba7c..8a5c9c25` lists only the completion doc).
- **14.5 provenance**: **cannot be carried on a CI line.** 15.0's code landed between `3de7f4c9` and any later doc commit, which breaks rule 5. The doc stays `local`, with the six green runs recorded as information (`task-14-5-completion.md`).
- **This parent's CI line**: the `--unit-member` completion dispatches the six workflows at the parent commit. A docs-only follow-up then cites them (rule 5 holds only if nothing else lands between them).
- **→ Task 15.3–15.5 (Thurgood)**: container pieces (section headers, glue, the `skills` line, `ambient[<docid>]` embeds) still render under the consumer profile when every member is dropped (15.0 adaptation 4). The guard's fixture re-points only leaves, so it does not exercise this.
- **→ Thurgood's in-flight follow-up**: the blank coverage row for `canonical/consumer-profile.yaml`.
- **Stated limits, not carried work**:
  - Kiro's JSON config is steward-shaped, so a bypass inside `write.allowedPaths` is invisible to `› kiro › frontmatter`.
  - The guard reaches the adapters through `emitAgent`, not `generateFixture`, which is hard-wired to the degenerate `_fixture.md`; `generateFixture`'s consumer lane is exercised separately in `semantics-guard.fixture.test.ts`.
  - The removed cross-tree guard survived its bite, because body ids and entry paths cannot collide in shape.

## Lessons (for the composed learning loop — never applied here)

- **The instrument-existence read paid for itself twice.** At the parent's Q1 it found two missing instruments (the profile file and the adapters' consumer path), which the #236 sequencing correction resolved. At 14.1, building the first real consumer of `isDescendantOrSelf` on arbitrary documents surfaced a latent hang in the substrate. **Lesson**: the first consumer of a tree query on arbitrary input is a test of the tree's invariants, not only of the consumer.
