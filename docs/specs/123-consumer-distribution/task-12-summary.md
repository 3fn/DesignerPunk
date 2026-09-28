# Task 12 Summary: G1 gate parent — C3's falsification

**Date**: 2026-09-27
**Purpose**: Concise summary of Task 12 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

G1 ran C3's own falsification pass ("trivial", Req 11.6) over the eleven committed exemplars before any triviality code exists. It took two runs.

- **The executing agent** (Thurgood, C3's owner) filed a formal request pinning the exact state by blob SHA.
- **Stacy's run 1** (`re-grounding-c3-falsification-run-1.md`) returned a verdict that selected the rework branch.
- **The owner reworked C3** in `requirements.md` § 11.6 and `design.md` § C18:
  - the mechanical count credits an item only through its own occurrence;
  - retention is decided by entailment;
  - the definition is applied per unit.
- **Stacy's run 2** (`re-grounding-c3-falsification-run-2.md`) selected the HOLDS branch. The current verdict is `re-grounding-c3-falsification.md`.
- **U2a's validation passed**, and the U2a PR opened.

## Why It Matters

The triviality floor is the only quality bar on the mechanical lane of the re-grounding check. Falsifying the definition before `triviality.ts` is built means Task 13 implements a definition that has survived construction attacks. The attacks covered a same-text over-count that would have cleared a gutting unit with no reviewer, and an undetermined reading of implied items.

## Key Changes

- **`requirements.md` § 11.6 and 11.7.2, and `design.md` § C18**: the occurrence assignment, entailment (5e), per-unit grain (5f), and two named limitations.
- **No `triviality.ts`, and no new `canonical/` file** beyond Task 11's eight.
- **`G1 runs: 2`**, so Stacy's scoped post-acceptance read (fork M-1) fires after U2a merges.

## Impact

- **U2b can be cut once U2a merges.** Task 13 builds the floor against the held definition.
- **One HIGH item is carried** to before Task 15's first routed signature: R2-F1, the unit scope of entailment.
- **The U2b-cut tasks amendment carries** the 13.4 criterion rows for the occurrence-assignment bite (DR-1).
- **The eight shipped attribution sidecars** are disposed by Peter's no-release ruling.

Detailed completion: [task-12-completion.md](../../../.kiro/specs/123-consumer-distribution/completion/task-12-completion.md)
