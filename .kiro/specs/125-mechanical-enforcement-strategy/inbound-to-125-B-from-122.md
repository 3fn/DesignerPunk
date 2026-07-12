# Inbound to 125-B from 122: interim crossRef target awaiting the classification map

**Date**: 2026-07-10
**Source**: Spec 122 Task 7 (sweep 1 implementation — the crossRef resolution sweep)
**Status**: Handoff record, NOT a ratified classification row. Lives in the 125 umbrella
directory because 125-B has no spec directory yet (Peter, 2026-07-10); it moves with (or is
consumed by) 125-B's formalization alongside `inbound-to-125-B-from-125-A.md`.

> **DISPOSITION (2026-07-11): LIVE — FOLDED into `125-B-backlog.md`** (item 2, MUST — the crossRef
> re-point obligation, tied to U1). This note remains the detailed source; the backlog is the canonical read.

---

## 1. The item: `record-first-ratification` crossRef is INTERIM-TARGETED

`canonical/shared/shared-catalog.yaml`'s `record-first-ratification` member requires a
recorded, two-ended cross-reference to "the 125 map entry" (122 Req 13 AC2 / DD13). The
designed target — **125-B's classification map** — does not exist yet (deferred per the
umbrella outline's DECIDED line 160). Rather than fabricate a path or leave a TODO that
sweep 1 cannot resolve (blinding the check), the crossRef **interim-targets a real,
resolvable record**:

> `.kiro/docs/ballots/README.md § "The Ratification Protocol (record-first) — approved by Peter, 2026-07-05"`

Approved by Peter, 2026-07-10, explicitly as an interim that MUST NOT become silently
permanent.

## 2. What 125-B owes at formalization (the re-point obligation)

When the classification-map artifact exists:

1. **Re-point** `shared-catalog.yaml`'s `crossRef` from the ballots README to the map's
   `record-first-ratification` entry, and remove `crossRefStatus: interim` +
   `crossRefResolveWhen`.
2. **Create the reciprocal half**: the map entry names `canonical/shared/shared-catalog.yaml`
   back (the two-ended requirement — only 125-B can author this half).

## 3. The visibility backstop already running (why this can't rot invisibly in the interim)

The interim is machine-readable (`crossRefStatus: interim` on the catalog entry), and
**sweep 1 (`122-sweep-1-refs`, a required check on every PR) enumerates all interim
crossRefs in every run report** — every cutover sweep report and monthly governance health
check shows the outstanding count. The sweep passes (interim ≠ failure); this seed note is
the record at the decision point, the enumeration is the standing visibility. If 125-B's
formalization finds the enumeration reporting zero interim targets, this item is already
closed — verify and discard.
