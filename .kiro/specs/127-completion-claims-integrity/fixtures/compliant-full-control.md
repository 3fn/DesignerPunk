# Fixture spec: compliant-full-control

**Case**: `compliant-full-control`
**Classes**: av-gate (primary) — also the PASS-expected control for **evidence**, **forced-negative**, **deferral**, and the decomposition rendering convention
**Expected exit**: GREEN (zero), with one emission
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

Every other fixture in this set proves the checker **bites**. This one proves it does not bite everything — and it is the single most important fixture in the set for the law's survival.

A red-by-default checker passes 21 of 22 falsification fixtures trivially. It would also make the rule unusable on contact: the first three authors to write a fully compliant doc and get a red would conclude the instrument is broken, the exemption string would become the path of least resistance, and the law would be dead inside a month with a green-looking test suite behind it. Fixture suites that only assert failure cannot distinguish a working checker from `exit 1`.

So this fixture is a **maximal** compliant pair, deliberately — the DD5 principle applied to falsification: an unshown form is an untested form. It exercises, in one parent:

- exact-set parity over five criteria, including a **decomposed platform triple grouped by criterion** (Req 2.6.1/2.6.3);
- **all four evidence kinds** — an artifact path, a test name, a command + result, and a locatable decision record (a PR review comment with a date, explicitly inside the shape set per the guide);
- a **⚠️ row with a follow-up link**, carrying the ruled honest string `not re-verified — toolchain unavailable`;
- the forced-negative line in its **list form**, the ⚠️ row enumerated with its link;
- an AV section with **verbatim gate rows** under the same predicate, the Primary-Artifacts forced-negative line, and one **fixed-form deferral** using the taught `→` spelling.

If any of these reds, the checker has a false-positive class, and the fixture names which one.

## tasks.md fragment

```markdown
# Implementation Plan: 172 — Chip Family Cross-Platform Parity

**Date**: 2027-03-09
**Spec**: 172 — Chip Family Cross-Platform Parity
**Author**: Lina
**Criteria mode**: per-parent

## Declared Merge Units

| Unit | Parents | Gating parent | Midpoint carrier (specs ≥ 3 units) |
|---|---|---|---|
| **U1 — Web + iOS** | Task 1 | Task 1 | — |
| **U2 — Android** | Task 2 | Task 2 | — |

## Tasks

- [x] 1. Bring Chip-Filter-Base to parity on web and iOS

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Chip-Filter-Base resolves every color through the semantic layer, with no primitive references in component code
  - The web implementation announces selection changes to assistive technology, verified against the component contract
  - The iOS implementation announces selection changes to assistive technology, verified against the component contract
  - The Android implementation announces selection changes to assistive technology, verified against the component contract
  - The visual direction for the selected state is approved by Leonardo before the PR opens

  **Primary Artifacts:**
  - src/components/chip/ChipFilterBase.ts
  - src/components/chip/__tests__/ChipFilterBase.contracts.test.ts
  - src/components/chip/platforms/android/ChipFilterBase.kt

  **Merge gate:**
  - `npm test` green on the unit branch before the PR opens
  - `npx tsc --noEmit` clean before the PR opens
```

## completion-doc fragment

`task-1-completion.md`:

```markdown
# Task 1 Completion: Bring Chip-Filter-Base to parity on web and iOS

**Date**: 2027-03-13
**Task**: 1. Bring Chip-Filter-Base to parity on web and iOS
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Chip-Filter-Base resolves every color through the semantic layer, with no primitive references in component code | ✅ | `src/components/chip/ChipFilterBase.ts` |
| The web implementation announces selection changes to assistive technology, verified against the component contract | ✅ | `ChipFilterBase.contracts.test.ts › selection announced (web)` |
| The iOS implementation announces selection changes to assistive technology, verified against the component contract | ✅ | `ChipFilterBase.contracts.test.ts › selection announced (iOS)` |
| The Android implementation announces selection changes to assistive technology, verified against the component contract | ⚠️ | `npm run generate:platform-tokens → Compose source emitted`; `not re-verified — toolchain unavailable` — follow-up: `.kiro/issues/2027-03-13-chip-android-semantics.md` |
| The visual direction for the selected state is approved by Leonardo before the PR opens | ✅ | Approved in PR #214 review comment, 2027-03-11 |

Unmet or partially met criteria:
- The Android implementation announces selection changes to assistive technology, verified against the component contract — Compose source emitted, semantics not exercised in this environment; follow-up: `.kiro/issues/2027-03-13-chip-android-semantics.md`

### Additional verification

| Condition (verbatim) | Status | Evidence |
|---|---|---|
| `npm test` green on the unit branch before the PR opens | ✅ | `npm test → 0 failures, 431 suites` |
| `npx tsc --noEmit` clean before the PR opens | ✅ | `npx tsc --noEmit → 0 errors` |

Primary Artifacts: all shipped as declared, except as declared below

Artifact deferred: src/components/chip/platforms/android/ChipFilterBase.kt → U2
```

## Required verdict

- **Verdict**: `PASS` on parent 1 — criteria parity clean, AV gate-row parity clean, every row's evidence of a permitted kind, forced-negative line present in list form, the ⚠️ row linked.
- **Emissions**: exactly one — `av-deferral-declared`, detail `src/components/chip/platforms/android/ChipFilterBase.kt → U2`, carried in the association/emission manifest as **informational**. (Its exclusion semantics belong to `promised-artifact-exists` when that check is built; parity records the declaration and nothing more.)
- **Exit semantics**: GREEN — exit zero, one emission counted in the summary line.
- **Must NOT be produced**: any verdict. Specifically:
  - a red on the ⚠️ row (an honest unmet criterion is **compliant**, and a law that punishes it produces the very silence it exists to end);
  - a red on the decision-record evidence cell (`Approved in PR #214 review comment, 2027-03-11` is inside the guide's ruled shape set);
  - a red on the decomposed triple (three adjacent rows for one promise is the ruled rendering, and multiset equality makes grouping costless);
  - a red on the artifact line's `, except as declared below` clause, which is the artifact line's ruled deviation form;
  - a red on the deferral (fixed form, taught `→` spelling).

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- The deferral arrow here is U+2192 (`→`). The ASCII-arrow variant is exercised by `declared-none-compliant-control`; both must parse (DD6).
- `expected.json` SHOULD assert *positively* — `verdicts: []`, `emissions: [av-deferral-declared]`, `exit: 0` — rather than merely asserting the absence of errors, so that a checker which silently evaluates nothing fails this fixture too.
- **Do not let this fixture drift into a template.** It is a test input, not the canonical worked example; the canonical example lives in Process-Spec-Planning Tier 3. If the two diverge, the PSP example governs and this fixture should be re-derived from it.
