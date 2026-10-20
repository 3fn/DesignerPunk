# Issue: the `completion-criteria-parity` census mode is owed, and must read every surface the checker reads

**Date**: 2026-10-19
**Status**: ACTIVE
**Owner**: Thurgood (instrument owner; register row `completion-criteria-parity`, `owner: thurgood`; register steward for the `census` field)
**Trigger**: `manual` — the first ballot item presumptively in scope of `completion-criteria-parity` is drafted (ballot `.kiro/docs/ballots/2026-10-19-instrument-census-at-draft.md` § 2 and § 8, F-3 (A): the census mode and the row's `census` field exist before that item leaves DRAFT).
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-19, Thurgood, rule 12. A census mode that reads only one of the checker's two input surfaces would digest a change to the other as unchanged, so the census would be weaker than its claim.)*
**Source**:
- the census ballot's owed EXECUTION, § 4 ("Owed EXECUTION after ratification") and § 8 (Peter's F-3 ruling and the dated correction under it). Those sections stay the law; this record carries the act so the walk reads it (README rule 10).
- Stacy's read-only consult (c) on the D-2 fork, 2026-10-19, relayed by the orchestrator: `--verify-extraction` reads `tasks.md`, not completion docs.

---

## The owed act

- **As ruled**: before the first in-scope item on this instrument leaves DRAFT, Thurgood builds the census mode as EXECUTION in his own scope, then writes the row's `census` field (the command), Peter-merged. The ballot names a per-file `sha256(canonicalSurface)` output from `--verify-extraction` as the shape.
- **Scope note (Stacy, consult (c), 2026-10-19)**: that shape covers the `tasks.md` extraction only. The checker also reads parent completion docs: the criteria table, the Status cell (exact-match since the D-2 fix, `.kiro/issues/archive/2026-10-03-completion-criteria-parity-status-marks-gap.md`) and the Evidence cell. A change to the completion-doc side, such as the D-2 exact-match, would digest unchanged under a `tasks.md`-only census. So the census mode must read the surface the amended code reads: either one mode emitting a per-input line for each surface, or per-scope `census` fields on a scoped row (the schema allows `census` per scope on scoped rows; this row is not scoped today). Which of the two is the owner's design call at build time, recorded here when made.
- **Closes** when the census mode is built and the row's `census` field is written, by rule 5's dated outcome line and the archive move.
