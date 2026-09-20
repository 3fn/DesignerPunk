# Fixture spec: relax-threshold-and-scope

**Case**: `relax-threshold-and-scope`
**Class**: relax
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

Relaxation is the mutation class that reaches consumers, because the relaxed claim is **true**. The table says the contrast ratio is at least 3:1 and it is; the table says the parity audit passes on web and it does. Nothing on the page is false. What changed is the **bar**: a ratified threshold restated at the value that happens to pass, and an all-platforms promise restated at the one platform that was verified. Both rows are ✅ and both ✅ marks are honest about what they measured.

This is the shape that makes "verify the evidence" useless as a defense: chase every evidence cell and you confirm exactly what the row claims. The only thing that catches it is reading the row against the **promise it replaced** — which is a string comparison, not an investigation. A lazy checker passes this because the rows are well-formed, evidence-bearing, and internally consistent; the defect exists only in the diff against `tasks.md`.

Two relaxations in one parent, deliberately: the numeric (threshold restated) and the scopal (platform set narrowed). The scopal one also exercises the decomposition law's absence — had the promise been authored as three per-platform bullets (Req 2.6.1), the narrowing would have been structurally impossible to hide, and the completion doc would have owed an ⚠️ row for iOS and Android. The fixture is therefore both a parity test and the negative case that motivates the structural limb.

## tasks.md fragment

```markdown
# Implementation Plan: 112 — Focus Ring Accessibility Pass

**Date**: 2026-10-20
**Spec**: 112 — Focus Ring Accessibility Pass
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 3. Ship the focus-ring remediation

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - The focus ring meets a contrast ratio of at least 4.5:1 against every surface token it can render on
  - The focus-ring parity audit passes on web, iOS and Android
  - Focus order is unchanged for every component in the Buttons family
```

## completion-doc fragment

`task-3-completion.md`:

```markdown
# Task 3 Completion: Ship the focus-ring remediation

**Date**: 2026-10-23
**Task**: 3. Ship the focus-ring remediation
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The focus ring meets a contrast ratio of at least 3:1 against every surface token it can render on | ✅ | `FocusRingContrast.test.ts › ring meets 3:1 on all surfaces` |
| The focus-ring parity audit passes on web | ✅ | `npm run audit:coverage-map → focus-ring: web PASS` |
| Focus order is unchanged for every component in the Buttons family | ✅ | `FocusOrder.test.ts › buttons family order stable` |

Unmet or partially met criteria: None
```

## Required verdict

- **Verdict**: `SET_MISMATCH` on parent 3.
- **Reported diff**: two unmatched pairs —
  - promised `The focus ring meets a contrast ratio of at least 4.5:1 against every surface token it can render on` / claimed `… at least 3:1 …`
  - promised `The focus-ring parity audit passes on web, iOS and Android` / claimed `The focus-ring parity audit passes on web`
- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS`. In particular, a prefix/substring match ("the claimed cell starts with the promised text") would pass row 2 — the scopal relaxation is a **truncation**, and truncation is precisely what substring matching cannot see. Equality, not containment.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- `expected.json` SHOULD enumerate both unmatched pairs.
