# Task 14.3 completion: the per-target guard (body) + the two-sided body bites

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 14 · **Agent**: Lina (Opus), PRIMARY
**Date**: 2026-09-29 · **Branch**: `task/123-u2b-profile` (main checkout), from `2255edc9`

**Write scope**:
- **Inside the grant**: Task 14's row names "the guard tests" and `__fixtures__/`. New here: `tools/agent-generator/__tests__/semantics-guard.test.ts` and `tools/agent-generator/__fixtures__/semantics-guard/__bites__/` (the committed bite logs).
- **No source file changed.** The adapter mutations below were applied, run and restored; they are recorded in the logs, never committed.

**CI-provenance**: local

## What changed

- **`semantics-guard.test.ts`** (new) is **the per-target guard** (design C15, DD7; Req 10.S input 21). **This is one file.**
  - Its target list is `loadConsumerProfile(REPO_ROOT).targets`, C12's single declared list from `canonical/consumer-profile.yaml`.
  - Its adapters come from the registry, `adaptersFor(targets, …)` (Task 15.0). The guard carries no second list, and a declared target with no registered adapter throws.
  - **Test ids**: `semantics-guard.test.ts › <target> › body: …`.
  - **Each block** renders the `semguard` fixture (Task 14.2, E on S re-grounded in place) through that target's `emitAgent` under the **consumer** profile. It reads the prose artifact's attribution and runs **11.4 alone** (Req 10.8a Constraint 2). The **verdict value** is asserted first (`<target> body <S>: VERIFIED`); a second test checks that E's text, not canonical S, is what shipped.
  - Outputs stay in memory, and nothing observes C6 (Req 10.8c).
  - **The fake third target**: `defineGuard` is one function. The test declares `[...targets, 'fake']` and injects `fake` through the registry's `extra`, as `class FakeAdapter extends CcAdapter` with `target` cast. **This adds a third block with no other edit to the guard.** A companion test shows an undeclared-adapter target (`ghost`) throws `no adapter is registered for declared target "ghost"`.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/semantics-guard.test.ts` → **`Tests: 12 passed, 12 total`**:
  - the declared blocks `cc` and `kiro`, 2 each;
  - the fake-third-target describe, 8: its 2 checks, plus `defineGuard` over `[cc, kiro, fake]`, which re-runs `cc` and `kiro` beside `fake` (2 each). This is the same count the bite logs show.
- `npm run test:agent-generator` → **`Test Suites: 48 passed, 48 total` · `Tests: 751 passed, 751 total`**. `npx tsc -p tools/agent-generator/tsconfig.json --noEmit` → exit 0.
- **The two-sided body bites** (DD7, S-D-B4). Each restores one adapter's **pre-123 inline body emission**: a single `passthrough` span sourcing `canonical/agents/<a>.md#body`, the form at `90fb0e71`, which Task 10 carried as `cc.ts:244–247` / `kiro.ts:322–325`. Each mutation is applied at the `bodyParts.push(emit('body'))` call site, then run and restored (`cmp` clean). **Both logs are committed**, each with its mutation diff, command and base commit:

  | Bite | `› cc` | `› kiro` | `› fake` (= CC) | Verdict asserted (exact) | Log |
  |---|---|---|---|---|---|
  | `cc.ts` call site → inline `#body` | **RED** | green | RED | `Expected: "cc body #the-owed-set-pipeline-…: VERIFIED"` / **`Received: "cc body #the-owed-set-pipeline-…: FAIL_NO_DERIVATION"`** | `__bites__/task-14-3-bite-body-cc.txt` |
  | `kiro.ts` call site → inline `#body` | green | **RED** | green | `Expected: "kiro body #the-owed-set-pipeline-…: VERIFIED"` / **`Received: "kiro body #the-owed-set-pipeline-…: FAIL_NO_DERIVATION"`** | `__bites__/task-14-3-bite-body-kiro.txt` |

  **The pattern is the one the design demands**: the mutated target turns red with the verdict value `FAIL_NO_DERIVATION` and the other target stays green, in both directions. The `fake` block follows `cc` because it is the CC adapter under another name, which is itself evidence that the block runs the code it names.
- `npm run check:completion-criteria-parity` after the tick → `SUMMARY: parents evaluated 16, pass 16, fail 0; emissions 0; reds 0`.

## Application-time adaptations

1. **The bite logs live in `__fixtures__/semantics-guard/__bites__/*.txt`**, not a `logs/` directory, because `logs/` is gitignored (`.gitignore:29`). This follows the repo's `scripts/__bites__/*.txt` precedent.
2. **The fake third target is the CC adapter under another name.** A third adapter that routes correctly is the point: the block's existence is what is shown, and the bite shows that it runs the adapter it names.
3. **The verdict assertion was moved ahead of the content assertion** after a first run showed the content check firing first. The criterion wants the red to be `FAIL_NO_DERIVATION`, not a missing-substring message; the committed logs are from the corrected order.
