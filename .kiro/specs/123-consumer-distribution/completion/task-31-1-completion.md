# Task 31.1 Completion — the ground-truth intro reword and the Kiro blank line

**Date**: 2026-10-12
**Agent**: Lina (Sonnet) · subtask 31.1 of Task 31 (PRIMARY: Thurgood; the wording and the span placement are his, `task-31-0-completion.md`)
**Branch**: `task/123-u3c-profile-corrections`, a worktree, after 31.0 (`c3c6a2fcd`). Code only: **no profile text, no disposition file, no signature, no lock** was touched.
**Delegated-tier**: plan held (Task 31 plans Lina (Sonnet) for the `render.ts` and `adapters/kiro.ts` edits and the regeneration).

## What changed

- **(i) `tools/agent-generator/render.ts`** (`renderGroundTruthTrims`): the intro line reads, Thurgood's wording verbatim, `Your token ground truth is served LIVE by MCP — never a build snapshot. Do NOT read these generated build outputs for token values; query the live tool instead:` (was `… these stale/generated artifacts; query the live tool instead:`). A shared-template reword, so the steward outputs move too (`.kiro/issues/2026-10-02-ground-truth-intro-line-stale-generated.md`).
- **(ii) `tools/agent-generator/adapters/kiro.ts`**: a `KIRO_GROUND_TRUTH_LEAD` (`'\n'`) is the first character of the `ambient.groundTruthManifest` **container** span, in the consumer leg (`groundTruthPieces`) and in the steward leg's single span. It is **not** in the preceding body unit's last span (`.kiro/issues/2026-10-02-kiro-ground-truth-heading-no-blank-line.md`).
- **Regenerated** with `npx tsx tools/agent-generator/generate.ts` ("wrote 387 files across 10 guarded roots"; the real tree, in place). **The diff guard was not run** (its full run writes the lock; the refresh is 31.4's).
- **Tests**: `consumer-rendering.ground-truth-spans.test.ts` updated (the container text per target) and +2 cases: (a) the twin render has exactly one blank line before the Kiro heading, held by the container span (`'\n## Ground truth\n\n'`), the preceding `#kept` body span unchanged (ends in a single `\n`); (b) the COMMITTED consumer output: every Kiro container opens with the blank line (kenya, data, lina = 3), every CC one does not, and no Kiro `#what-you-dont-own` span ends in a blank line.

**Application-time adaptations** *(appended 2026-10-14, Lina; Stacy's 15.1.0 RELEASE pass, RL-4)*: none. The `render.ts` and `adapters/kiro.ts` edits, the regeneration and the tests followed Task 31's plan and Thurgood's wording verbatim; the diff guard was left unrun because its full run writes the lock, and the lock refresh is 31.4's.

## The freshness stale list after the edit (criterion C4) — `runFreshnessSweep`, 2 findings

```
STALE LIST (all freshness findings): 2
  stale-signature | canonical/profiles/consumer/data.dispositions.yaml | ambient.groundTruthManifest.verdict | signature on ambient.groundTruthManifest.verdict is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | ambient.groundTruthManifest.verdict | signature on ambient.groundTruthManifest.verdict is stale — its canonical or rendered content changed since signing; re-sign or refuse
```

**Exactly the expected movers: Kenya's and Data's `ambient.groundTruthManifest.verdict` rows, and no other seat's.** (Lina's and Sparky's renders carry the new intro too, but neither is a signed consumer row; the sweep names none.) Baselines (Thurgood's 31.0, same script, same functions, re-run on this tree):

| Row | 31.0 baseline | Now |
|---|---|---|
| kenya `ambient.groundTruthManifest.verdict` | `sha256:b7f514ba…` EQUAL | `sha256:21178d05…` **DIFFERS** (expected) |
| data `ambient.groundTruthManifest.verdict` | `sha256:53f5c8db…` EQUAL | `sha256:04e9b45a…` **DIFFERS** (expected) |
| kenya `body #what-you-dont-own` | `sha256:463fe651…` | `sha256:463fe651…` **EQUAL** |
| data `body #what-you-dont-own` | `sha256:19c95e55…` | `sha256:19c95e55…` **EQUAL** |
| kenya `trims[dist/ComponentTokens.ios.swift]` | `sha256:78187ecb…` | `sha256:78187ecb…` **EQUAL** |
| data `trims[dist/ComponentTokens.android.kt]` | `sha256:e644f5b5…` | `sha256:e644f5b5…` **EQUAL** |
| data `trims[dist/android/DesignTokens.android.kt]` | `sha256:37517e5f…` | `sha256:37517e5f…` **EQUAL** |
| data `routes.cues[9]` | `sha256:285e1817…` | `sha256:285e1817…` **EQUAL** |
| kenya `commands[platform-tokens]`, `#ios-theming-spec-094`; data `commands[platform-tokens]`, `#android-theming-spec-094` | (31.0) | all **EQUAL** |

Nothing moved unexpectedly. The two `verdict` rows move on the intro line alone: the container (the blank line) is hashed by no signed row.

## Outputs moved (for the lock refresh at 31.4; every path is inside the allowed roots)

19 regenerated outputs, all under `.claude/agents/**`, `.kiro/agents/**` and `canonical/_consumer-output/**` (the list below also names the two generator sources and the test file, 22 paths in all):

```
  .claude/agents/data.md
  .claude/agents/kenya.md
  .claude/agents/sparky.md
  .kiro/agents/data-prompt.md
  .kiro/agents/data-prompt.md.attribution.json
  .kiro/agents/kenya-prompt.md
  .kiro/agents/kenya-prompt.md.attribution.json
  .kiro/agents/lina-prompt.md
  .kiro/agents/lina-prompt.md.attribution.json
  .kiro/agents/sparky-prompt.md
  .kiro/agents/sparky-prompt.md.attribution.json
  canonical/_consumer-output/cc/.claude/agents/data.md
  canonical/_consumer-output/cc/.claude/agents/kenya.md
  canonical/_consumer-output/kiro/.kiro/agents/data-prompt.md
  canonical/_consumer-output/kiro/.kiro/agents/data-prompt.md.attribution.json
  canonical/_consumer-output/kiro/.kiro/agents/kenya-prompt.md
  canonical/_consumer-output/kiro/.kiro/agents/kenya-prompt.md.attribution.json
  canonical/_consumer-output/kiro/.kiro/agents/lina-prompt.md
  canonical/_consumer-output/kiro/.kiro/agents/lina-prompt.md.attribution.json
  tools/agent-generator/__tests__/consumer-rendering.ground-truth-spans.test.ts
  tools/agent-generator/adapters/kiro.ts
  tools/agent-generator/render.ts
```

Output check: in all seven Kiro prompts with the section (the steward's data, kenya, lina, sparky and the consumer's data, kenya, lina) the heading is now preceded by exactly one blank line; the CC outputs changed by the intro line only (one line each in `.claude/agents/{data,kenya,sparky}.md` and `canonical/_consumer-output/cc/.claude/agents/{data,kenya}.md`).

## Tests

- `npx tsc --noEmit`: exit 0.
- `npm run test:agent-generator`: **58 suites; 1636 passed, 1 failed** — the one failure is **intended**: `operative-set-freshness.test.ts` › "the sweep over the real repo › is clean". The sweep over the real repo is red until the signers re-sign the two `verdict` rows (the round after 31.2). I did not weaken it. Everything else is green, including `consumer-entry.parity.test.ts`.
- **Bites** (made, run red, restored): (1) the lead removed → the container expectation and the one-blank-line test red; (2) the blank line moved into the preceding body span instead → the container, the one-blank-line and the hash-isolation tests red.
- Not run here: `npm test`, `npm run check:122:diff-guard` (writes the lock; 31.4), `test:consumer`.

## Claims, and what each rests on

| # | Claim | Rests on | State |
|---|---|---|---|
| 1 | The intro line reads Thurgood's wording in every render | `render.ts` (`renderGroundTruthTrims`); the regenerated outputs (19 files) | VERIFIED-CODE |
| 2 | Every Kiro prompt with the section has exactly one blank line before it | `kiro.ts` `KIRO_GROUND_TRUTH_LEAD`; the seven outputs checked by reading; `consumer-rendering.ground-truth-spans.test.ts` (twin and committed) | VERIFIED-CODE |
| 3 | The blank line sits in the container span, not the preceding unit's | the container text `'\\n## Ground truth\\n\\n'`; `#what-you-dont-own` hashes EQUAL; the tests above; two bites | VERIFIED-CODE |
| 4 | Only Kenya's and Data's `verdict` rows go stale | `runFreshnessSweep` (2 findings); the baseline table | VERIFIED-CODE |
| 5 | The lock, the signatures and the dispositions are untouched | `git diff --name-only` (no `canonical/generated.lock`, no `*.dispositions.yaml`, no `canonical/profiles/**`) | VERIFIED-CODE |
