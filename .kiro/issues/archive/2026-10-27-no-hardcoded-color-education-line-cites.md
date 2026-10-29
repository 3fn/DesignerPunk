# Register row `no-hardcoded-color`: its `education` cites four charter clauses by line, and all four lines are stale

**Date**: 2026-10-27
**Owner**: Thurgood (register steward). Rule 9 applies to every later edit.
**Filed by**: Thurgood, under README rule 10, at the application of ballot `.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md` (§ 6's steward note; [THURGOOD R2] item 4a; § "Plans (Peter's condition)" row 5).
**Class**: P2 obligation (record) · defect *(set 2026-10-27, Thurgood, rule 12. The register's citations point at the wrong lines. The clauses they mean exist and say what the row says, so no reader is misled into a wrong act.)*
**Trigger**: `release:next:phase-1` — closes at the merge of the CORRECTION PR below, and becomes `merge:#<N>` once that PR is open. The earlier event, in prose: the ballot's application PR merges, since site 8b moves two of the four clauses.

---

## The cites, and where the clauses are

The cited clause is "- Never hard-code values that have token equivalents" in three charters, and Ada's flag protocol in hers. Lines are read at the application branch's head after its seat acts (`chore/system-token-review-and-token-planning`, 2026-10-27); they are re-read at the application merge before the PR is cut.

| Cite in `education` (at `bad7222ef`) | The clause now | Moved by |
|---|---|---|
| `canonical/agents/kenya.md:406` | L415 | already stale at `a95d6bf3d` (L411), plus site 8b's four-line insert |
| `canonical/agents/data.md:411` | L418 | already stale (L414), plus site 8b |
| `canonical/agents/sparky.md:434` | L438 | already stale; unmoved by this ballot |
| `canonical/agents/ada.md:326` | L357 | already stale; unmoved by this ballot |

## Vehicle

- **A CORRECTION PR in the register**, Peter-merged under the governance carve-out, with `**Edit kind**: governance/classification-map.md — CORRECTION (.kiro/issues/2026-10-27-no-hardcoded-color-education-line-cites.md; truth: canonical/agents/{kenya,data,sparky,ada}.md at the application merge)`.
- **No grant.** This corrects § "Plans" row 5 and my R2 item 4a, which both said "with an issue-row grant". README rule 8 forbids an issue-row grant over a governance-law path, and `governance/**` is one. The authority is the CORRECTION kind itself (ballots README § "When a governance edit needs a ballot — three kinds").
- **The PR also adds one history line** to the row.
- **Class option, not in this vehicle**: cite each clause by section and quoted text, e.g. `canonical/agents/sparky.md § "How to Use DesignerPunk Tokens on Web": "Never hard-code values that have token equivalents"`, which no line shift makes stale. For this one row it stays a CORRECTION (the same referent). Converting all of the register's `file.md:N` cites is a convention change with its own ballot.

## Close

Rule 5's dated outcome line in the CORRECTION PR, and the archive move there.

## Outcome (2026-10-28, Thurgood)

Fixed by branch `fix/no-hardcoded-color-education-cites` (this record's fixing CORRECTION PR). The row's `education` cites read kenya.md:415, data.md:418, sparky.md:438 and ada.md:357, re-read at `6f51055ba`, with one history line. No grant (README rule 8). The lock is refreshed. Archived in this PR (rule 5).
