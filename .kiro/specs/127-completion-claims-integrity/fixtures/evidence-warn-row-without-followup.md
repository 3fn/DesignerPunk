# Fixture spec: evidence-warn-row-without-followup

**Case**: `evidence-warn-row-without-followup`
**Class**: evidence — *proposed manifest extension, see INDEX.md*
**Expected exit**: RED (non-zero) — **contested; see the Contest note**
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The honest-author failure, and the one I expect to be most common once ⚠️ becomes usable at all.

The doc does the hard thing right: a criterion was **not** met, and the author says so with a ⚠️, real evidence of what was actually checked, and a plain-language note about what remains. The forced-negative line lists the row rather than claiming `None`. This is the behavior the whole law is trying to produce, and it is a large improvement on the M4 = 0/22 baseline.

It is still non-compliant on one element: **a ⚠️ row MUST link a tracking issue or follow-up task**, and this one links nothing. The requirement is not bureaucratic. An unmet criterion with no link is an unmet criterion with no owner and no next event — it exists only in a completion doc nobody will reopen, which is how the 112 corpus accumulated partial work that read as finished. The link is what converts an honest admission into a tracked obligation; without it, ⚠️ is a more polite ✅.

A lazy checker passes this because the row is *better* than the rows it was built to catch: status in vocabulary, evidence real and locatable, forced-negative line present and honest. Every predicate except the link predicate returns true. The falsification target is the natural implementation that validates the ⚠️ **mark** and never validates the ⚠️ **obligation**.

## tasks.md fragment

```markdown
# Implementation Plan: 157 — Progress Family Cross-Platform

**Date**: 2027-02-02
**Spec**: 157 — Progress Family Cross-Platform
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 2. Ship Progress-Bar-Base on all three platforms

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - The web implementation reports determinate progress to assistive technology
  - The iOS implementation reports determinate progress to assistive technology
  - The Android implementation reports determinate progress to assistive technology
```

## completion-doc fragment

`task-2-completion.md`:

```markdown
# Task 2 Completion: Ship Progress-Bar-Base on all three platforms

**Date**: 2027-02-05
**Task**: 2. Ship Progress-Bar-Base on all three platforms
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The web implementation reports determinate progress to assistive technology | ✅ | `ProgressBarBase.accessibility.test.ts › reports determinate value` |
| The iOS implementation reports determinate progress to assistive technology | ✅ | `ProgressBarBaseTests.swift › reportsDeterminateValue` |
| The Android implementation reports determinate progress to assistive technology | ⚠️ | `npm run generate:platform-tokens → Compose source emitted`; semantics not exercised — `not re-verified — toolchain unavailable` |

Unmet or partially met criteria:
- The Android implementation reports determinate progress to assistive technology — Compose source emitted but the accessibility semantics were not exercised
```

## Required verdict

- **Verdict**: `EVIDENCE_NONCOMPLIANT` on parent 2, naming **row 3**: a ⚠️ row carrying no follow-up link, and a forced-negative list item carrying no follow-up link.
- **Companion assertions**: criteria-set parity clean; rows 1 and 2 compliant; the forced-negative line **present** (its defect is the missing link on its item, not its absence).
- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS`; `FORCED_NEGATIVE_MISSING` (the line is present); a red on rows 1–2.

## Contest note — I expect this one to be contested, and it should be argued

The design's C5 predicate list does **not** name the ⚠️-link limb. The requirement (1.2) and the ratified guide text both state it as a **MUST**: *"a ⚠️ row MUST link a tracking issue or follow-up task"*, and the same MUST appears in the PSP Tier-3 required-shape list. The gap is between the law's text and the design's enumerated predicate, and it is exactly the kind of gap that resolves silently into "unmechanized" unless someone writes it down.

Three dispositions are available and the choice is Peter's:

1. **Mechanize it** (my position, and what this fixture specifies): a link-less ⚠️ is `EVIDENCE_NONCOMPLIANT`. Cheap to detect — the cell or its forced-negative item must contain a link-shaped token (a path, a `#NNN` issue/PR reference, or a URL) — and it protects the law's only failure vocabulary from becoming decorative on first contact.
2. **Route it to judgment**: the claims pass counts link-less ⚠️ rows as a finding, and the checker stays silent. Defensible — a "link-shaped token" predicate is weaker than the rest of the checker's predicates, and a weak predicate inside a strict instrument is a false-red source.
3. **Rule it out of scope as authored**: Thurgood's legitimate contest ground under Req 6.5.

What I will not accept silently is disposition 3 by default — the MUST disappearing from the mechanical surface **and** from the audit surface because neither owner claimed it. If the ruling is (2), the fixture should be **re-classed rather than deleted**: keep the pair, change the expected outcome to a recorded emission or to PASS-with-a-claims-pass-note, and record the disposition in the provenance header. A fixture that simply vanishes from the set is the failure mode Req 6.5 names.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- The Android row's `not re-verified — toolchain unavailable` string is the ruled honest form and is **correct** here — it is not the defect. Keep it; it is what makes the row sympathetic and the fixture adversarial.
