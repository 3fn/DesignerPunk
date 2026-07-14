# Task 1 Summary: U1-s — Pilot Substrate (125-B)

**Date**: 2026-07-14
**Unit**: U1-s — first execution unit of Spec 125-B (classification map pilot)
**Validation**: full `npm test` (377/8,987 green) + full `tsc` (clean)

## What shipped

- **The classification-map register is live** at `governance/classification-map.md`: schema, citation rules (unique, non-substring entry ids — resolver-verified addressing), and three entries — the authority row (`record-first-ratification`, Experiment 2's output), the pilot row (`npm-test-before-complete`), and the tool-boot smoke row.
- **The tool-boot smoke exists and passes** (49/49 locally): every declared MCP tool must boot, advertise, and answer an empty-args call — never judged on returned data, so an index-empty server passes by design. Flipping it to a *required* check is Peter's branch-protection action at merge.
- **The 122→125-B crossRef obligation is closed**: the interim retired, the two-ended reference complete, sweep-1 green.
- **The pilot's evidence chain is complete**: a pre-committed measurement protocol (written before any run), a candidate prune diff (produced, deliberately NOT applied), an A/B probe (NO GROSS LOSS DETECTED), and a cloned-agent behavioral trial (**NO-DIFFERENCE-DETECTED** — 4 valid transcripts, 3 voids recorded honestly, relevance gate passed).

## The headline result

Two Lina clones implemented the ratified Spec 126 fix as ordinary work — one under current docs, one with every completion-imperative pruned from its context. **Both validated their work before claiming completion; neither slipped on the kept Jest education; one pruned-arm agent ran the full `npm test` unprompted while citing the rewritten context language.** Per the pre-committed criteria: proceed to the prune PR; the observation window remains the backstop. Not "prune proven safe" — one battery task, two paired runs.

## Carried forward

- R4 interpretive note → Peter's Req 7.7 review (rides this PR).
- Trial infrastructure lesson for U1b: never run concurrent clones in same-repo worktrees (shared git stash cross-contaminates).
- Both arms' work diffs preserved as patches — raw material for 126's own implementation flow.
- Post-merge: smoke → required check; docs-MCP reindex; gate-bite proof PR.
