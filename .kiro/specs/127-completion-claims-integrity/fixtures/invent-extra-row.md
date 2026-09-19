# Fixture spec: invent-extra-row

**Case**: `invent-extra-row`
**Class**: invent
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The flattering addition. Every promised criterion is reproduced verbatim and met — this doc would pass a drop check, a reword check and a relax check cleanly. Then a fourth row appears that `tasks.md` never defined: documentation updated, ✅, with a real path behind it. The work described probably happened. The row is probably true.

It is still a mutation, and the harm is specific: **the table stops being a reproduction of the promise and becomes a curated account of the work.** Once an author may add rows, the table's length no longer means anything, "all rows ✅" no longer means "all promises met", and the next reader cannot tell a four-criterion parent from a three-criterion parent that felt good about itself. Invent is drop's mirror: drop shortens the set silently, invent pads it, and both destroy the 1:1 map that makes the table readable as a verdict.

A lazy checker passes this in the most tempting way — by checking **coverage** rather than **equality**: "is every `tasks.md` criterion present in the table?" Yes, all three are. Coverage is the natural, generous, wrong predicate, and this fixture is its detector. The requirement is multiset *equality*, both directions.

## tasks.md fragment

```markdown
# Implementation Plan: 121 — Badge Count Variants

**Date**: 2026-11-02
**Spec**: 121 — Badge Count Variants
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 2. Ship the Badge-Count-Base web implementation

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - `Badge-Count-Base` renders counts above 99 as `99+` without layout shift
  - The component satisfies every contract listed on its schema, verified by the contract suite
  - Count changes are announced to assistive technology via a polite live region
```

## completion-doc fragment

`task-2-completion.md`:

```markdown
# Task 2 Completion: Ship the Badge-Count-Base web implementation

**Date**: 2026-11-05
**Task**: 2. Ship the Badge-Count-Base web implementation
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| `Badge-Count-Base` renders counts above 99 as `99+` without layout shift | ✅ | `BadgeCountBase.test.ts › overflow renders 99+ with stable box` |
| The component satisfies every contract listed on its schema, verified by the contract suite | ✅ | `BadgeCountBase.contracts.test.ts` |
| Count changes are announced to assistive technology via a polite live region | ✅ | `BadgeCountBase.accessibility.test.ts › live region announces count change` |
| Component documentation updated in the Badge family guide | ✅ | `governance/component-family-badge.md` |

Unmet or partially met criteria: None
```

## Required verdict

- **Verdict**: `SET_MISMATCH` on parent 2.
- **Reported diff**: one unexpected row, present in the table and absent from `tasks.md` — `Component documentation updated in the Badge family guide`. Zero missing.
- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS`. A checker implementing containment-in-one-direction ("every promise appears") passes this; the fixture exists to fail that implementation. `expected.json` MUST record the diff as *unexpected-only* (missing: 0, unexpected: 1) so that a checker which reds for a fabricated reason still fails.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- Keep the invented row last and plausible. If the encoder "improves" it into something obviously bogus, the fixture stops testing the tempting case.
