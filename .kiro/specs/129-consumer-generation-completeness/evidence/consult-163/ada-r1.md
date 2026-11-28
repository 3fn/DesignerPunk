# Ada R1 — consult 16.3.0 lapses (read-only, origin/main)

## 1. `2026-11-08-generate-component-token-warning-spacing-sizing-only` (owner: Ada; header confirms)
Plainly: `generate` warns a consumer about off-grid custom values for spacing and sizing only. Radius, fontSize and colour get the repo's own lane check but no consumer warning.
**Lapsed**: yes. Trigger was `release:next:phase-1`; the 16.3.0 walk (L63) marks it "carried" with "Spec 132 may take it". No outcome line, no re-rule. Stacy is right.
**Recommendation: spec**, into Spec 132 or a bounded issue-driven fix after it. Reason: the fix needs a Peter ruling (radius cap; whether fontSize's modular scale and colour's refusal "conform"), so it cannot be fix-now without a decision, and no consumer is hit today (no component token of those families has a custom value).
**Outline check**: grep of Spec 132's files for this record, "13.2" and `gridConformance` finds nothing. The outline does NOT name it. The walk's "Spec 132 may take it" is unbacked, and Spec 132 (native components in app) is a thematically poor home.
**Counter-argument**: drop it. The gap is theoretical: zero affected tokens, and a warning is non-fatal. **Survives**: Req 13.2 is law and says "warn"; dropping leaves a shipped requirement partly unmet, which needs an explicit ruling, not silence. Fix-now is ~half a session in `src/cli/designerpunk.ts` (my scope), so cost is not the barrier; the unruled definition is. Fork for Peter: (a) rule the three definitions, then fix-now in one PR; (b) amend Req 13.2 to "spacing and sizing" and drop. I do not pick.

## 2. `2026-10-25-token-docs-unvetted-name-hits` (Owners line L5: Ada; Lina co-owns item B)
**Not a second lapse.** L106 `## Lapse (2026-10-29)` (against 16.1.0's S, by Thurgood), then L110 `## Outcome (2026-11-01, Ada, owner)`: "Item A is fixed… Closed under rule 5." That outcome predates 16.3.0's S, so the Trigger (`release:16.3.0:phase-1`, closed by the sweep) was met before it fired. Item A = my 56-failure sweep. The only open remainder is item B: Lina's 24 component README lines (L118: "stays hers"). That is Lina's disposition, not a lapse of my part.
**Recommendation (my part): drop, already closed**; archive once Lina disposes B.
**Counter-argument**: the Trigger text was never edited to say "item A only", so a mechanical reader sees an open record past its date. **Survives**: a form defect, fixed by one rule-9 line from me (outcome closes item A; B moves to Lina's own record). Fix-now, trivial, in `.kiro/issues/**`.

## 3. Extra: "DTCG generation failed (non-blocking)" in the 5.1 and 5.3 builds
- **Defect?** Yes, minor and noisy. In publish-5.3.log L88 `DesignTokens.dtcg.json` is WRITTEN (217 primitive, 193 semantic) by `generateTokenFiles.ts`. The failure at L109 comes from a second, redundant DTCG step in `scripts/generate-platform-tokens.ts` (L129–137), which builds `DTCGFormatGenerator` from the clone's `src/tokens` and cannot load `themes/dark/SemanticOverrides`. Its remedy text ("restore from node_modules") is a consumer message, wrong in a release clone.
- **Affects consumers?** No. The pack list shows `175.2kB dist/DesignTokens.dtcg.json` (L980, L2854) and `PASS: publish path: root token file present: dist/DesignTokens.dtcg.json` (L2108). The file ships.
- **Record filed?** None found (the message hits only src/tests and unrelated archived records). It should be: a green release printing a failure each run trains readers to ignore warnings, and the load failure may hide a real ordering bug. Owner Ada (script in my scope); P3 defect; likely fix is to delete the redundant step or share the first step's output. I can file on instruction.
- Unverified: not reproduced in a clean clone; the cause is read from the log only.
