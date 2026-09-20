# Fixture spec: exemption-verbatim-honored-control

**Case**: `exemption-verbatim-honored-control`
**Class**: exemption (**PASS-expected control**)
**Expected exit**: GREEN (zero), with one emission
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The compliant half of the exemption surface. A spec genuinely in flight at ratification carries, on a parent that would otherwise owe the table, the fixed string **exactly** as ruled:

```
Criteria fidelity: exempt — spec in flight at ratification (2026-09-19)
```

The parent declares `**Primary Artifacts:**` and a `**Merge gate:**`, and the doc carries a complete Additional verification section — because the exemption waives the table only. This is the state the law intends: an in-flight parent that cannot reasonably be held to a convention its `tasks.md` predates, discharging everything it *can* discharge, and leaving a countable record that it used the exemption.

Three false-positive classes are under test:

1. **The string is not recognized** and the parent falls to `SET_MISMATCH` for an absent table — which would make the exemption unusable and hand every legacy in-flight parent a red it cannot fix without rewriting its `tasks.md`, the exact reopening of dormant specs that Req 2.1.2 forbids.
2. **Over-strict matching on the date slot** — a build that pins one hard-coded date, or rejects the parenthesized form, breaks the string for every spec but the first.
3. **The emission is not produced.** This is the quiet one. The sunset clause was declined on a stated ground: *the claims-pass machinery is the abuse detector*, which makes fixed-string exemption usage a **named counting duty**. If a valid exemption is honored silently, the counting duty has no input, and the declined sunset rests on a detector that cannot see. The emission is the whole reason the string is fixed rather than free.

## tasks.md fragment

```markdown
# Implementation Plan: 141 — In-Flight Migration Pass

**Date**: 2026-09-10
**Spec**: 141 — In-Flight Migration Pass
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 5. Complete the in-flight migration of the Badge family

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Every Badge component resolves its tokens through the semantic layer
  - The Badge contract suite passes on all three platforms

  **Primary Artifacts:**
  - src/components/badge/
  - src/components/badge/__tests__/contracts.test.ts

  **Merge gate:**
  - `npm test` green on the unit branch before the PR opens
```

## completion-doc fragment

`task-5-completion.md`:

```markdown
# Task 5 Completion: Complete the in-flight migration of the Badge family

**Date**: 2026-09-27
**Task**: 5. Complete the in-flight migration of the Badge family
**Type**: Implementation
**Status**: Complete

Criteria fidelity: exempt — spec in flight at ratification (2026-09-19)

### Additional verification

| Condition (verbatim) | Status | Evidence |
|---|---|---|
| `npm test` green on the unit branch before the PR opens | ✅ | `npm test → 0 failures, 426 suites` |

Primary Artifacts: all shipped as declared
```

## Required verdict

- **Verdict**: `PASS` on parent 5 — the criteria table is waived by a valid exemption; AV gate-row parity clean; the artifact forced-negative line present.
- **Emissions**: exactly one — `exemption-honored` for parent 5, detail carrying the parsed date (`2026-09-19`) so the claims pass can count usage and age it.
- **Exit semantics**: GREEN — exit zero, one emission counted.
- **Must NOT be produced**: any verdict; a missing `exemption-honored` emission; a `SET_MISMATCH` for the absent table.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- The string encodes with **U+2014 (em dash)** and single spaces exactly as shown: `Criteria fidelity: exempt — spec in flight at ratification (2026-09-19)`. An en dash or hyphen here converts this control into the `exemption-paraphrase` falsification case and inverts its expected outcome — the most consequential encoding hazard in the set.
- Pair with `exemption-paraphrase` and `exemption-does-not-waive-av`; the three together pin the surface completely (honored / not honored / honored-but-narrow).
