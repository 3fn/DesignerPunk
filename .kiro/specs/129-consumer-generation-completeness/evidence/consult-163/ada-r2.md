# Ada R2 (read-only)

**1. Token-docs: hold, with a concession.**
- Side A (mine): the fix-now was due "by 16.3.0's S"; the 2026-11-01 Outcome (L110, "Closed under rule 5") predates S, so nothing lapsed at S. Item B is Lina's open remainder.
- Side B (Stacy): the record's Trigger line was never edited to say "item A only", so a mechanical reader sees it open at S.
- Concession: it is a form defect. I will add one rule-9 line (item A closed; B moves to Lina's own record) when told. Neither Thurgood nor Lina has to move for this; if Thurgood rules "lapsed", the fix-now option is not lost in substance, because the work is done. For the batch, I would list it as "closed, contested" with the three options not needed.

**2. Generate-warning: lean (b), amend Req 13.2 to spacing and sizing, then drop.**
New fact: `defineComponentTokens` takes numeric families only (spacing, sizing, borderWidth) and has no colour family. A consumer cannot declare a radius, fontSize or colour component token through it, so the "gap" mostly cannot be reached. Option (a) would make Peter rule three definitions for cases no consumer can write; that is the cost of a hypothetical.
- Residual: borderWidth is declarable and is not in the grid check either (I did not verify its grid rule), so (b) should say "spacing and sizing, and borderWidth if it has a grid rule" rather than a flat drop. If a later spec adds radius to the declarable families, the warning is re-opened then.
- Does (b) need a Spec 129 amendment? Yes: Req 13.2 is shipped law of Spec 129. Spec text is Thurgood's to author; Peter ratifies; I consult on the content. It lands as a dated amendment with the record cited, not a silent edit.

**3. DTCG warning record, if Peter says file.**
Title: "Release and `generate` builds print a false 'DTCG generation failed (non-blocking)' because a redundant second DTCG step in `scripts/generate-platform-tokens.ts` cannot load `themes/dark/SemanticOverrides` in the clone; the file ships regardless."
Class: P3 defect. Trigger: `release:16.4.0:phase-1` (git-visible; fix is deleting or sharing the step, small PR in my scope).
