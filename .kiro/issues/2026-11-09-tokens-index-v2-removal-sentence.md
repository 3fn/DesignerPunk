# Issue: `src/tokens/index.ts` L322 still says an alias "will be removed in v2.0" (O-18)

**Date**: 2026-11-09
**Owner**: Ada
**Filed by**: Thurgood, under README rule 10, from the composed-loop read of 123's 16.0.0 RELEASE pass (O-18). Rule 9 applies to every later edit.
**Class**: P3 improvement · defect
**Trigger**: `manual` — the event that owes the close is the merge of the owner's fixing PR (the sentence corrected, or kept with a dated reason here). The owner names that PR here when it opens.

---

- **The sentence**: `src/tokens/index.ts` L322 at `main`: "`@deprecated Use getAllPrimitiveTokens() instead. This alias will be removed in v2.0.`" It is packed as `dist/tokens/index.d.ts` (16.0.0 pass, O-18: "since 2025-10-25"). The package is past v16, so the sentence names a version that has long shipped with the alias still in it.
- **The 16.0.0 pass** read it as a same-class sentence outside that release's blend. The obligation-drain ballot's M7 P0 definition settled its reach, and it is not a P0 as these reads see it.
- **Owed**: Ada decides whether the alias is removed, or the sentence says what is true (deprecated, with no removal version). The fix is a CORRECTION against the source.
