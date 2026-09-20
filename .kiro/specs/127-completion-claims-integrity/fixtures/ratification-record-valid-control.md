# Fixture spec: ratification-record-valid-control

**Case**: `ratification-record-valid-control`
**Class**: ratification-record (**PASS-expected control**) — *class accepted by Thurgood, route 1, 2026-09-19*
**Expected exit**: GREEN (zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4, C5/C11, DD2/B-2)
**Date**: 2026-09-19

---

## Falsification intent

The control that makes the other two `ratification-record` cases mean something. The ballot is present at its pinned path and carries the machine line **alone on its own line**, in the fixed form; the record resolves to `2026-09-19`, and **evaluation proceeds normally** — the fixture's `tasks.md`/completion-doc pair is fully compliant and must return `PASS`.

Two failure classes are under test, and they are the two that would make the anti-dormancy mechanism unusable rather than unsound:

1. **A valid record does not resolve.** Over-strict parsing — requiring a particular surrounding heading, a leading `**`, a trailing period, or a fixed line offset — turns the ballot into a brittle dependency. Because the checker reads the ballot on **every run over the whole declared population** (DD1), a parse failure here is not one red: it is *every* PR red, permanently, for a reason no author can fix in their own branch. `RATIFICATION_RECORD_UNRESOLVABLE` is the one verdict in the enum with no local remedy.
2. **The record resolves and evaluation stops anyway.** The gate is a precondition, not a mode: once the date is in hand, the run must proceed to the parity predicate and produce ordinary verdicts. A build that resolves the record and then returns early is green on this fixture only if the fixture asserts the **downstream** `PASS` — which is why the pair here is compliant rather than trivial.

DD2 pins the semantics this fixture depends on: the in-force date comes **from the artifact, never from a constant**. A build that hard-codes `2026-09-19` anywhere passes all three `ratification-record` fixtures for the wrong reason, so `expected.json` SHOULD assert the **resolved date value** as read from `ballot.md`, not merely that parsing succeeded.

## ballot.md fragment

Supplied by the encoded fixture at the injected pinned path (see Encoding notes):

```markdown
# Ballot: Completion-Claims Integrity (Spec 127)

**Date**: 2026-09-19
**Status**: RATIFIED (Peter, 2026-09-19)
**Spec**: 127 — Completion-Claims Integrity

Ratified-machine: 2026-09-19

## What this ballot ratifies

The Parent Success-Criteria Fidelity law, the machine-readable criteria convention, the
five register rows, and the Q5 charter execution. The machine line above is the checker's
only parse target in this document; every other date here is prose.
```

## tasks.md fragment

```markdown
# Implementation Plan: 181 — Tag Family Base

**Date**: 2027-04-06
**Spec**: 181 — Tag Family Base
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 1. Ship Tag-Static-Base

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Tag-Static-Base resolves every color through the semantic layer
  - The component satisfies every contract listed on its schema
```

## completion-doc fragment

`task-1-completion.md`:

```markdown
# Task 1 Completion: Ship Tag-Static-Base

**Date**: 2027-04-09
**Task**: 1. Ship Tag-Static-Base
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Tag-Static-Base resolves every color through the semantic layer | ✅ | `src/components/tag/TagStaticBase.ts` |
| The component satisfies every contract listed on its schema | ✅ | `TagStaticBase.contracts.test.ts` |

Unmet or partially met criteria: None
```

## Required verdict

- **Ratification record**: resolves. `ratifiedMachine === '2026-09-19'`, read from `ballot.md` — asserted as a **value**, not as a boolean.
- **Verdict**: `PASS` on parent 1 — evaluation proceeded to the parity predicate and returned clean.
- **Emissions**: none.
- **Exit semantics**: GREEN — exit zero.
- **Must NOT be produced**: `RATIFICATION_RECORD_UNRESOLVABLE`; any early return that leaves parent 1 unevaluated (a run whose output does not mention parent 1 fails this fixture even at exit zero).

## Encoding notes

- Encode as `{ ballot.md, tasks.md, completion.md, expected.json }` — the optional `ballot.md` is route 1's entire harness widening.
- `expected.json` carries the **injected path string** supplied to `parseRatificationRecord(ballotText, ballotPath)` — use the real pinned path, `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md`, so the two red siblings' message slots read exactly as they will in production.
- The ballot fragment deliberately contains **three other dates** (`**Date**`, the `Status` line's parenthetical, and prose). A build that scrapes the first date it finds, or parses the human `Status` line, passes this fixture by accident and fails `ratification-record-line-reworded` — which is the discriminating pair.
- The machine line is **alone on its line**, with no leading markdown emphasis and no trailing punctuation. That is the specified form (C11); the two siblings test what happens when it isn't.
