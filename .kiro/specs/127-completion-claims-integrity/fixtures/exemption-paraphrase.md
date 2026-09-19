# Fixture spec: exemption-paraphrase

**Case**: `exemption-paraphrase`
**Class**: exemption
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

A parent that owes the table carries, instead of the table, a sentence explaining why it does not:

> `Criteria fidelity: exempt (spec was in flight at ratification on 2026-09-19)`

Every fact in that sentence may be true. The spec may genuinely have been in flight. The author is not evading — they are *explaining*, which is what people do when a rule offers no fixed slot for the exception.

It is non-compliant anyway, and the ground is the law's own: **a freely-phrased exemption is an unfalsifiable claim — the failure mode this rule exists to close, wearing a different hat.** A fixed string can be counted (the claims pass's named counting duty, which is the *stated replacement* for the sunset clause that was declined). A paraphrase cannot: it cannot be grepped, cannot be tallied, cannot be distinguished from the next author's differently-worded version, and therefore the abuse detector that justified declining the sunset silently stops working.

A lazy checker passes this two ways, both attractive. It can match loosely (`/Criteria fidelity: exempt/`) — in which case the fixed string is decorative and exemption becomes free-form by default. Or it can miss the line entirely, in which case the parent falls through to `SET_MISMATCH` for the *table*, which is red but for the wrong reason and with a message that sends the author to fix the wrong thing. The required behavior names the actual defect.

## tasks.md fragment

```markdown
# Implementation Plan: 141 — In-Flight Migration Pass

**Date**: 2026-09-10
**Spec**: 141 — In-Flight Migration Pass
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 4. Complete the in-flight migration of the Chip family

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Every Chip component resolves its tokens through the semantic layer
  - The Chip contract suite passes on all three platforms
```

## completion-doc fragment

`task-4-completion.md`:

```markdown
# Task 4 Completion: Complete the in-flight migration of the Chip family

**Date**: 2026-09-24
**Task**: 4. Complete the in-flight migration of the Chip family
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

Criteria fidelity: exempt (spec was in flight at ratification on 2026-09-19)

Both criteria were verified during the migration; the family's contract suite is green
on all three platforms and the semantic-layer resolution was confirmed component by
component.
```

## Required verdict

- **Verdict**: `MALFORMATION` on parent 4, carrying the catalog message **verbatim**:

  ```
  non-compliant exemption: not the fixed string 'Criteria fidelity: exempt — spec in flight at ratification (<date>)' (parent 4)
  ```

  (`<date>` is part of the quoted fixed string in the catalog row and stays literal; only `N` is slot-filled — here, `4`.)
- **Parse state**: `exemption: 'malformed'`. The table is **not** waived.
- **Emissions**: **no** `exemption-honored` emission.
- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS`; an `exemption-honored` emission; a run whose only red is `SET_MISMATCH` with no exemption message (right colour, wrong diagnosis — the author would go add a table rather than fix the string, and the counting duty would still be broken).

## Contest note

As with `deferral-free-prose-near-miss`, the catalog fixes the message but not the enclosing `Verdict` member. I specify `MALFORMATION`; `SET_MISMATCH` **in addition** is acceptable (the table is genuinely absent and un-waived) but not **instead**. What `expected.json` must pin: the catalog message verbatim, `exemption: 'malformed'`, no `exemption-honored` emission, non-zero exit.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- The explanatory prose paragraph after the exemption line is deliberate — it is what makes the doc look conscientious rather than evasive. Keep it.
