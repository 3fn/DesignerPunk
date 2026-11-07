# Defect: the install-doc deriver strips limitation markers but not dated correction pointers, so two reach `docs/consumer/INSTALL.md`

**Date**: 2026-11-07
**Filed by**: Thurgood, the follow-up named in #738 (Post-MIDPOINT documentation fixes, 129).
**Owner**: Thurgood (built the derivation in Task 19 / #708; `scripts/derive-install-doc.ts` is in his write scope). Ada is consulted on the change to that file (Thurgood's standing-scope clause).
**Class**: P2 obligation (record) · defect *(set 2026-11-07, Thurgood, rule 12. A consumer-facing doc cites `.kiro/issues` paths a consumer cannot open; no claim in it is false.)*
**Trigger**: `path:scripts/derive-install-doc.ts` — the event that owes the close is the fixing PR's touch of the deriver. Dated reason (2026-11-07): the defect is in the deriver's output transform, so the fix cannot land without touching that file; a path token fires on that PR and not before. Only the owner re-rules this line (rule 9).

---

## The defect, read at `origin/main` (`e7f57c20b`)

- `scripts/derive-install-doc.ts` L56–58: `stripLimitationMarkers` is `region.replace(LIMITATION_MARKER, '')`, where `LIMITATION_MARKER` (L51) matches only ` <!-- limitation: .kiro/issues/<file>.md -->`. L116 applies it and nothing else to `extractRegion(guide)`.
- `governance/DesignerPunk-Integration-Guide.md` L164 and L173 (inside the install region, L21–L272) end in `*(corrected 2026-11-07: …; .kiro/issues/2026-09-26-native-component-theme-hardcoding.md; prior text at 74d7566f5)*`. The pattern does not match them, so they pass through.
- `docs/consumer/INSTALL.md` L150 and L159 carry both pointers verbatim, citing `.kiro/issues/2026-09-26-native-component-theme-hardcoding.md`, a path outside the shipped package.
- The Guide's L709 has the same shape but sits outside the region and is not derived.
- #738 named this: stripping is a follow-up.

## Proposed fix

Add `stripDatedPointers(region)` beside `stripLimitationMarkers`: remove a trailing ` *(corrected|amended|added YYYY-MM-DD…; … prior text at <sha>)*` span (with its preceding space) when it names a `.kiro/` path or a `prior text at`; apply it at L116. Do not touch emphasis spans that carry neither. Add to `scripts/__tests__/install-doc.test.ts` a bite: a fixture region with a pointer on a sentence, asserting the derived text keeps the sentence and loses the pointer, and a fixture with an ordinary `*(note)*` span that is kept. Regenerate `docs/consumer/INSTALL.md` with `npx tsx scripts/derive-install-doc.ts`. The Guide keeps its pointers (the dated record is the Guide's).

Surviving counter-argument: a regex over free prose can eat a legitimate parenthetical; the narrow anchor (a dated `corrected|amended|added` opener and a `prior text at` or `.kiro/` path inside) bounds it, and the bite fixture pins the keep case. The alternative, a guard that fails on any `.kiro/issues` string in the region (like the marker leak test), moves the burden to authors and was not chosen: the pointers are mandated by the dated-pointer law, so authors must keep writing them.

## Criterion (decidable)

Closed when, at the fixing PR's head: (a) `grep -c "\.kiro/issues\|prior text at" docs/consumer/INSTALL.md` prints `0`; (b) `grep -c "prior text at" governance/DesignerPunk-Integration-Guide.md` is unchanged from its value at `e7f57c20b` (3); (c) `npm test -- scripts/__tests__/install-doc.test.ts` passes, including the two new fixtures; (d) this record carries a dated outcome line and moves to `archive/` (rule 5).
