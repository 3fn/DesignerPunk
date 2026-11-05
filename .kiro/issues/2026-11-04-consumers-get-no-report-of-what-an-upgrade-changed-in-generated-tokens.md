# Consumers get no report of what an upgrade changed in their generated token output (Spec 116's Q5, the drift report)

**Date**: 2026-11-04
**Status**: ACTIVE
**Owner**: **Ada** (`generate` output). **Sparky** consulted for the CLI surface (his read, [SPARKY R1] in `.kiro/docs/ballots/2026-11-04-waiting-spec-row.md` § 9, is the source of this record's wording).
**Filed by**: Thurgood, under README rule 10, in the application PR of ballot `2026-11-04-waiting-spec-row` (§ 4 item 3; fork F-4 (a)). Rule 9 applies to every later edit: Ada owns the record and may re-rule it.
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, because 129 changes what `generate` reads from the package and is where the palette record (`2026-10-15-123-palette-read-from-package.md`) already folds in. Ada's owed act at that commit: take Q5 into 129, re-rule the Trigger to a later event, or close it with a reason. Failing that, the release token.
**Class**: P3 improvement · owed-act *(proposed by the filer, 2026-11-04, Thurgood, rule 12. Sparky's wording was "P3 obligation record". No consumer is blocked and nothing shipped is false, so it is not P1 or P2. Ada re-classes under rule 9.)*
**Source**: Spec 116 (`116-sync-customization-safety`), question Q5, closed in the first pass of ballot `2026-11-04-waiting-spec-row` (Appendix B row 12). Peter's ruling on the fork (F-4), received 2026-11-04T06:03:25Z: "F-4 file it". He was offered "File a small record for it, aimed at 129's requirements" or "drop it with a reason".

---

## What is missing

After `npm update`, `generate` can change values silently, because the palette, theme override maps, motion, layering and icon-size values come from the package (INSTALL § 4; `.kiro/issues/2026-10-15-123-palette-read-from-package.md`). Consumers get no report of which tokens were added, removed or changed.

`NameContract` covers only part of it. It makes `sync` report, and never write, a semantic or primitive token name that a shipped component references and the consumer's generated `DesignTokens.web.css` does not define (INSTALL § 5). That is web-only, never covers component tokens, and does not cover the consumer's own CSS references, which was the original incident's failure ([SPARKY R1]: `grep` finds no tokens-added/removed/changed report in `generate` or `sync`).

## The question to the owner

Is a `generate`-time diff of token names and values against the last run wanted?

Two things to hold when Ada decides, both from Sparky's R1 and neither re-decided here:
- Under Model B (Spec 123 Req 5.8) the original incident's cause is gone, so Q5 is now a convenience. "Drop it with a reason" is as defensible as "record it". Peter chose to file it.
- A record with a spec trigger can idle past the spec. The mitigation is the trigger plus the health-check walk.

## What Sparky did not verify

He read source and did not run `sync` against a non-TTY fixture, and did not read the `sync.*` test files for coverage of the `--apply` and conflict-skip behaviour ([SPARKY R1], item (c)). Spec 117's outline withdrew the "unify with 116 Q5" framing ("NOT a cross-cutting drift framework"), so 117's check covers pipeline reproducibility in this repo, not a consumer-facing report. No live spec or record owned Q5 before this one.
