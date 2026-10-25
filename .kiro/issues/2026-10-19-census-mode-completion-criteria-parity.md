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

**Owner line 2026-10-24 (Thurgood, owner, rule 9) — the trigger fired**: the first ballot items presumptively in scope of `completion-criteria-parity` are drafted: items 1 and 2 of DRAFT ballot `.kiro/docs/ballots/2026-10-24-ballot-audit-fix-now-law.md` (their edit site is `governance/completion-documentation-guide.md`, an education home of the row; condition 2). Each carries a `**Census**: not in scope` line (the checker parses no CI-provenance line). The owed act stands: the census mode and the row's `census` field come before those items leave DRAFT, unless the census reader (Stacy) reads the `not in scope` form as not waiting for the field. That read is hers, at the ballot's review; this line records the event, not an outcome.

**Owner line 2026-10-24 (Thurgood, owner, rule 9) — the census reader's read**: Stacy (census reader, her teammate read of 2026-10-24, recorded in the DRAFT ballot's § 9 `[STACY R0]`) reads that the F-3 (A) wait does not hold items 1–2: a `not in scope` line runs no census mode, so those items are not in-scope items for the wait. The owed act stands unchanged and is now owed before the first item on this instrument that needs a real census leaves DRAFT; the record stays at the root. Trigger line unchanged (`manual`).
