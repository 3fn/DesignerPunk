# Task 29.4 Completion: the standing application to the shipped profile on every PR that touches its inputs (G2-F2; Stacy's condition (a))

**Date**: 2026-10-12
**Agent**: Lina (Opus), PRIMARY Task 29
**Branch**: `task/123-u3g-g2c2`, on 29.3 (`ca9e40b99`).

## What changed
- **`tools/agent-generator/regrounding/derivation.ts`, "THE STANDING APPLICATION"**: `checkShippedProfile(repoRoot)` and `consumerDispositionsFiles(repoRoot)`.
  - **Inputs**: every `*.dispositions.yaml` of the committed consumer profile (agents, `_shared`, `always-set/`), with its overlay and the canonical source it cites. Each agent goes through `derive()`, so a stale pin, an orphaned key or an incongruent value throws instead of being skipped. The derived values feed R2. The committed renderings are read through `readConsumerSpans` for `_canonical` and every target `canonical/consumer-profile.yaml` declares.
  - **Surfaces** (ruling R3):
    - body and always-set rows: `_canonical` plus every declared target;
    - frontmatter rows: the declared targets;
    - the shared-catalog member row: the declared targets.
  - A surface counts only if it carries the row's source file.
  - **Pooling: per target.** Every artifact of a target is one pool; Kiro's pool is the prompt **and** the JSON. This is the pooling the 29.0 sizing printed and Stacy's attack file § 1 rule 2 assumed. **Stacy's open point (a): no expected row changes.**
  - **Aggregation**: a row is `VERIFIED` only if it is `VERIFIED` on every one of its surfaces, and it has at least one (`NO_SURFACE` otherwise). The count is rows, never row × target.
- **`tools/agent-generator/__tests__/derivation.shipped-profile.test.ts`** (new):
  - **The guard**:
    - the evaluated row count equals the count of `re-pointed` rows read **independently** from the committed dispositions (not a literal), and is non-zero;
    - every row is `VERIFIED` on every surface;
    - the surfaces are the ruling's: every body row on `_canonical,cc,kiro`, every frontmatter row on `cc,kiro`.
  - **In-suite bites**, each on a temp copy of the shipped inputs:
    - unplanted, the copy is clean with the same count;
    - **E3**: plant C1 (stacy's S_body keeps its committed re-grounding, destination changed to its sibling) → exactly that row is reported, `FAIL_DISHONEST_NAMING` on `_canonical`, `cc` and `kiro`;
    - **E2**: remove the dispositions → the guard refuses (`the count must be equal and non-zero`).
  - `U3G_SHIPPED_ROOT` points the guard at a planted copy, for the recorded bite.
- **Bite records**: `__fixtures__/semantics-guard/__bites__/task-29-4-bite-shipped-{red,green}.txt`. RED is the guard with one rejected row planted in a scratch copy of the shipped inputs: 1 failed ("every re-pointed row is VERIFIED …"), and the failure names the planted row. GREEN is the repo: 6/6.

## Where it runs (criterion C6; Stacy's condition (a); attack file E4)
- `npm run test:agent-generator`: the step in the **required `Lane Timing / lane-functional-root` job** (`.github/workflows/lane-timing.yml` L281–282; the job's required status per ballot `2026-09-27-ci-regime-standing-scope`).
  - `on: pull_request` with **no paths filter**, so it runs on every PR.
  - It is behind the step's selection floor (L272–279, `[ "$COUNT" -ge 1 ]`).
- **The file is in the resolved selection**: `npx jest --config tools/agent-generator/jest.config.js --listTests` lists `derivation.shipped-profile.test.ts` (59 files).
- **No workflow edit, no new context, no `EXPECTED_CONTEXTS` change.** That is the criterion's "lean" route, so no new CI context needs Peter's named act.
- **The ARMING record is Stacy's, at U3g's merge** (units table: "a check newly applied on every PR touching its inputs, criterion 29 C6"). It is instruments row 6.7, MISSING → Stacy, and blocks nothing before the merge.

## The declared input (trigger) set
This set contains the ruling's R3 minimum. The ruling allows additions, never removals. It becomes U3's no-overlap path set (Task 22).
- `canonical/profiles/consumer/**`
- `canonical/agents/**`
- `canonical/shared/**`
- the always-set source docs the dispositions cite:
  - `.kiro/steering/AI-Collaboration-Principles.md`
  - `.kiro/steering/Agent-Directory.md`
  - `.kiro/steering/Civitas-System-Overview.md`
  - `.kiro/steering/DesignerPunk-Systems-Overview.md`
  - `.kiro/steering/Spec-Feedback-Protocol.md`
  - `.kiro/steering/Task-Completion-Protocol.md`
  - `.kiro/steering/core-goals.md`
  - `.kiro/steering/start-up-tasks.md`
- `canonical/consumer-profile.yaml`
- `tools/agent-generator/**`
- `canonical/_consumer-output/**`
- *(added: the wiring)*: `package.json` (`test:agent-generator`) and `.github/workflows/lane-timing.yml`.

## Results
- The guard on the repo: **169 re-pointed rows evaluated**, equal to the committed dispositions' count. **All 169 `VERIFIED`**:
  - 141 body rows on `_canonical,cc,kiro`;
  - 27 frontmatter rows on `cc,kiro`;
  - 1 member row on `cc,kiro`.
- `derivation.shipped-profile.test.ts`: 6/6. The 16.1 parity test: 6/6.
- `npm run test:agent-generator`: **1681/1682** (59 suites). The one red is `operative-set-freshness.test.ts › the sweep over the real repo`, on the stale row 29.3 declared (Stacy's `knowledgeBases[spec-summaries]`). It clears with 29.6's re-sign.
- `tsc --noEmit` (root and `tools/agent-generator`): exit 0.

## Application-time adaptations
1. **The evaluator lives in `derivation.ts`, a listed artifact, not in a new module.** That keeps the edit inside Primary Artifacts. It makes `derivation.ts` import `derive.ts` and `fs`; there is no import cycle, because `derive.ts` does not import `derivation.ts`.
2. **Members**: the member row is evaluated in member-id space under the provisional rendered-text emptiness rule (29.2). Thurgood's line on members is still pending (Stacy's open point (d)).
3. **The in-suite bites use `os.tmpdir()` copies**, removed in `finally`. The recorded bite used a scratch copy, also removed.
