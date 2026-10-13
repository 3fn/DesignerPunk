# `find_docs` indexer defects surfaced by the Stage 1 study run (DEFECT RECORD, routed)

**Date**: 2026-10-13
**Type**: DEFECT RECORD with routed owner — surfaced by Thurgood while running Stage 1 of the discovery shadow study (`2026-10-12-discovery-study-stage1-docs-charter.md` § 1f: "tokenizer/rank defects in the docs matcher are filed as a separate Thurgood issue; they are not fixed in this PR and do not count toward the gate"). Filed by the orchestrator because `.kiro/issues/**` is outside Thurgood's write scope (gap issue `2026-10-02-issues-dir-write-scope-gap-and-grant-advisories.md`).
**Owner**: **Thurgood** (docs matcher `mcp-server/src/query/**` and the docs rubric). Run SHA `08fed8984`; findings `.kiro/docs/discovery-study-stage1-findings.md` § 6.7–6.9.
**Trigger**: **Peter's ruling on the Stage 1 class question (Reading A vs Reading B — study charter / findings § 6.8)** → if A (close), Thurgood fixes these as plain defects on their own PR; if B (alias-proposal tool), items 1 and 3 are inputs to that tool's design first. Either way, fixes land AFTER the study PR merges (the study never tunes the thing it measures).
**Grant paths**: none needed — the matcher is inside Thurgood's scope? **NO** — `mcp-server/src/**` is OUTSIDE his charter scope (his Stage 1 charter lists it as such). The fixing PR needs a grant: proposed `mcp-server/src/query/**`, `mcp-server/src/indexer/**` (if the H3 drop lives there), their `__tests__/`, and `scripts/__fixtures__/discovery-oracle.ts` ONLY for the regression RUN (read), never an edit — activated by Peter's merge of a PR that names this file.
**Consulted**: none needed — relay of the owner's own findings; the owner fixes.

---

## Defects (Thurgood's findings, run at 08fed8984)
1. **H3 headings are parsed and then dropped.** `find_docs` indexes H2 (`##`) headings only; H3 (`###`) are parsed by the indexer and discarded. Seven of Stage 1's thirteen misses are queries whose answer is an H3 section (SP-08, DA-09, ST-02, ST-04, ST-09, DA-07, KE-10). **Not a free fix** — Thurgood tested indexing H3 after the results, in scratch only: Q2 23 → 27 passes, but 4 queries regress, one oracle entry drops (83 → 82), confident-wrong 2 → 3. Any fix needs tuning against the oracle AND the frozen Q2, both read-only.
2. **`##` lines inside fenced code blocks are indexed as sections.** A code sample containing a Markdown heading becomes a phantom section heading in the index.
3. **"iOS" tokenizes as `i` + `os`.** A query's `ios` can never match a doc's "iOS" (and `i` is a stop word, `os` a stray token). Kenya's queries are the exposed class.

## Related evidence (not defects of the indexer)
- **Alias seeded from the oracle produced a confident-wrong**: KE-N2 (a strict-none negative) lands `strong` on `component-development-guide` via `aliases: navigation`, seeded in 119-A from the oracle's "focus management keyboard navigation" worklist. An alias meant to lift one query manufactures `strong` on an unrelated one — evidence about the alias mechanism itself, relevant to Reading B.
- **Three structural misses are exactly the K6 keys**: answers that say "not supported" share no words with a "how do I" query (KE-N1, DA-N1, ST-N2).

## Pre-existing finding, batched here (orchestration record)
- Birth-findings record `2026-10-12-consumer-birth-friction-for-123-u3.md` row 2 (abbreviation `SS`): **Peter confirmed 2026-10-13 — leave it as `SS`.** Row disposition: closed, no change.

## What the walk checks
Trigger ruled with no fixing PR after one walk → finding. Fixing PR must show oracle 83/0/0 and the frozen Q2 re-run, both from read-only fixtures. Then `git mv` to `archive/`.
