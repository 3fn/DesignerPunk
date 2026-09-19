# Fixture spec: materiality-criterion-reworded-legacy

**Case**: `materiality-criterion-reworded-legacy`
**Class**: materiality
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The relax mutation, executed **upstream of the completion doc.** Rather than restating the threshold in the table — which the parity predicate now catches — the author edits the promise itself: a legacy `tasks.md` has its criterion bullet changed from *"at least 4.5:1"* to *"at least 3:1"*, in the commit that ships the work. The completion doc that follows will reproduce the *new* bullet verbatim, pass parity cleanly, and be green forever.

This is why materiality exists at all, and why the definition's direction is deliberately generous: **a false-material costs one declaration line; a false-immaterial reopens this door.** The mutation here is invisible to every downstream check — parity compares the doc to the file as it stands, and the file as it stands says 3:1. Only a comparison against the file's **previous** promise surface can see that the bar moved.

The commit is disguised the way real ones are: it also ticks two parents, updates the date, and reflows a long bullet's line wrap. A checker that fires on any diff cannot distinguish it from the immaterial control; a checker that fires on none misses it. The pair `{this fixture, materiality-tick-only-immaterial-control}` is the discriminating test, and neither is meaningful without the other.

## tasks.base.md

```markdown
# Implementation Plan: 112 — Focus Ring Accessibility Pass

**Date**: 2026-06-02
**Spec**: 112 — Focus Ring Accessibility Pass
**Author**: Lina

## Tasks

- [ ] 1. Remediate the focus ring

  **Type**: Implementation
  **Agent**: Lina

  **Success Criteria:**
  - The focus ring meets a contrast ratio of at least 4.5:1 against every surface token it can render on
  - Focus order is unchanged for every component in the Buttons family

- [ ] 2. Document the remediation

  **Type**: Documentation
  **Agent**: Lina

  **Success Criteria:**
  - The Buttons family guide records the new focus-ring token and its contrast basis
```

## tasks.head.md

```markdown
# Implementation Plan: 112 — Focus Ring Accessibility Pass

**Date**: 2026-12-20
**Spec**: 112 — Focus Ring Accessibility Pass
**Author**: Lina

## Tasks

- [x] 1. Remediate the focus ring

  **Type**: Implementation
  **Agent**: Lina

  **Success Criteria:**
  - The focus ring meets a contrast ratio of at least 3:1 against every surface token it can render on
  - Focus order is unchanged for every component in the Buttons family

- [x] 2. Document the remediation

  **Type**: Documentation
  **Agent**: Lina

  **Success Criteria:**
  - The Buttons family guide records the new focus-ring token and its contrast basis
```

## completion-doc fragment

**None.** The defect is in `tasks.md` and fires on the PR that touches it.

## Required verdict

- **Verdict**: `MATERIAL_AMENDMENT_WITHOUT_DECLARATION` on the file, carrying the catalog message **verbatim**:

  ```
  material amendment without criteria-mode declaration (canonical-form diff attached)
  ```

- **Attached diff**: the normalized promise-surface segment for parent 1's criteria bullet, before and after (`… at least 4.5:1 …` → `… at least 3:1 …`).
- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS` / immaterial. Note that both tick flips in this same commit are immaterial on their own — a build that reports "material: yes" because of the ticks has the right answer for the wrong reason, so `expected.json` SHOULD pin the **attributed segment** (the criteria bullet), not merely the boolean.

## Encoding notes

- Encode as `{ tasks.base.md, tasks.head.md, expected.json }` — no completion doc.
- Three decoys ride in the head deliberately: two tick flips and a date change. All are immaterial; none may be reported as the cause.
- Neither file carries a `**Criteria mode**` line and the head adds none.
