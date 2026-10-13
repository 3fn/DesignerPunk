# Task 29.2 Completion: clause 1 per the ruling (R2), and the clause-1 rows rebuilt on the generator's own emission of attack (a)

**Date**: 2026-10-12
**Agent**: Lina (Opus), PRIMARY Task 29
**Branch**: `task/123-u3g-g2c2`, on 29.1 (`4a8b65cf2`).

## What changed
- **`tools/agent-generator/regrounding/derivation.ts`**, ruling R2, built in the check and not in `emitSpans`:
  - **`D` excludes**:
    - a body span whose rendered text is empty after `trim()`;
    - a frontmatter span whose entry's **derived value** is `null`, `[]` or a string empty after `trim()`.
  - **The input widens.**
    - `spans` are `RenderedSpan` (`source` plus the span's rendered lines). `renderedSpans(spans, artifactText)` builds them from a sidecar and its artifact.
    - An optional `derivedValue(canonicalPath)` lookup is added. `derivedEntryValues(derivedFrontmatter, entryOrigin)` builds it from `derive()`'s output.
    - With no lookup supplied, no frontmatter span is in `D` (fail-closed).
  - **Member lane (provisional, flagged)**: R2 is silent on shared-catalog members, so a member span is held to the rendered-text rule until Thurgood's line lands (Stacy's open point (d)).
- **The callers move to the widened input**:
  - `derivation.test.ts`, `derivation.frontmatter.test.ts`, `semantics-guard.test.ts` and `semantics-guard.fixture.test.ts`;
  - the semguard fixture (`__fixtures__/semantics-guard/index.ts` gains `derivedValue`);
  - **`grain-guard.two-sided.test.ts`**: three lines, its spans now carry their rendered text. This file is **not** in Task 29's Primary Artifacts (see § Application-time adaptations 1).
- **New tests: attack (a) as the generator emits it.** S stays `re-pointed` with its overlay emptied, and `emitSpans` renders one blank line attributed to S.
  - Stacy's stacy.md fixture, through `emitSpans`, all asserted:
    - the blank-line emission itself;
    - **A1, A3, A4, WS1 (spaces, tabs, blank lines) and WS2 (U+00A0) → `FAIL_NO_DERIVATION`**;
    - **A2 (heading kept), WS3 (U+200B), WS4 (`<!-- -->`), WS5 (`.`) and V1 (one token), each with a sibling destination → `FAIL_DISHONEST_NAMING`**;
    - a blank span never hides a non-empty one;
    - the provisional member-lane rule.
  - **The always-set lane** (`Task-Completion-Protocol.md`, `#for-subtasks`): **AS1 → `FAIL_NO_DERIVATION`**, **AS2 → `FAIL_DISHONEST_NAMING`**.
  - **Per adapter** (`semantics-guard.test.ts`; `cc` and `kiro`, each target's own emitted prose): the emptied S renders exactly one blank line attributed to S, and **A1 and A4 → `FAIL_NO_DERIVATION`** on each target.
  - **Frontmatter, through the real `derive()`** (pins and the congruence refusal), with `emitSpans` over the derived frontmatter:
    - **FS1**: `description` re-pointed to `"     "` is **accepted by `derive()`** as a string. The rendered line is not blank, but the derived value is, so the result is **`FAIL_NO_DERIVATION`** (Stacy's open point (b), answered).
    - **F3**: key set kept, string fields emptied. The derived map keeps members, so `D` is non-empty: sibling destination → **`FAIL_DISHONEST_NAMING`**; in place → `VERIFIED` (named limit L2's shape).
    - Without a lookup the check is fail-closed.
- **Bite records**: `__fixtures__/semantics-guard/__bites__/task-29-2-bite-r2-{red,green}.txt`.
- **Task 14's ticked rows are not edited.** Their modelled attack-(a) tests stay in `derivation.test.ts` and still pass.

## Tests
- **Two-sided bite**, R2 switched off (every contained span derives, as before 29.2): **12 failed**. The twelve:
  - A1, A3, A4, WS1, WS2;
  - "a blank span does not hide …";
  - the member lane;
  - AS1;
  - FS1;
  - fail-closed;
  - per adapter, A1/A4 on `cc` and on `kiro`.

  As written: **23 passed** (`-t 29.2` over the three files).
- `npm run test:agent-generator`: 58 suites, **1673 tests** green (1650 after 29.1, plus 23).
- `tsc --noEmit` (root): exit 0. `tsc --noEmit -p tools/agent-generator/tsconfig.json`: exit 0.
- Note: the root `tsc` does not type-check `tools/agent-generator/__tests__/**`; ts-jest does. The input widening was caught by ts-jest, not by the root `tsc`.

## Application-time adaptations
1. **An edit outside Primary Artifacts: `tools/agent-generator/__tests__/grain-guard.two-sided.test.ts`**, three lines.
   - The ruling widens the check's input ("Task 29 lists the tests that change"), and Task 29's list omits this caller of `checkDerivation`.
   - The only way to leave it untouched was a check that skips R2 when text is absent (fail-open). That reopens G2-F3 for any caller that forgets the text, so I did not take it.
   - The edit changes the spans' shape only, and its two assertions are unchanged.
   - Recorded in the instruments block's `## Found later` (kind `unlisted`) for routing.
2. **The member lane's emptiness rule is provisional** (rendered text), pending Thurgood's line (open point (d)). If his line differs, the change is one predicate plus one test.
3. **Stacy's open point (b) is answered**: FS1 is not refused by `derive()` (a whitespace string has the canonical string type). The check returns `FAIL_NO_DERIVATION`.
