# `find_docs` indexer defects surfaced by the Stage 1 study run (DEFECT RECORD, routed)

**Date**: 2026-10-13
**Type**: DEFECT RECORD with routed owner — surfaced by Thurgood while running Stage 1 of the discovery shadow study (`2026-10-12-discovery-study-stage1-docs-charter.md` § 1f: "tokenizer/rank defects in the docs matcher are filed as a separate Thurgood issue; they are not fixed in this PR and do not count toward the gate"). Filed by the orchestrator because `.kiro/issues/**` is outside Thurgood's write scope (gap issue `2026-10-02-issues-dir-write-scope-gap-and-grant-advisories.md`).
**Owner**: **Thurgood** (docs matcher `mcp-server/src/query/**` and the docs rubric). Run SHA `08fed8984`; findings `.kiro/docs/discovery-study-stage1-findings.md` § 6.7–6.9.
**Trigger**: **Peter's ruling on the Stage 1 class question (Reading A vs Reading B — study charter / findings § 6.8)** — **FIRED 2026-10-13: Peter ruled Reading A (the class option: fix the layer where the gap lives).** → if A (close), Thurgood fixes these as plain defects on their own PR; if B (alias-proposal tool), items 1 and 3 are inputs to that tool's design first. Either way, fixes land AFTER the study PR merges (the study never tunes the thing it measures).
**Grant paths** (ballot 2026-09-27-ci-regime-standing-scope § 3 — owner **Thurgood**; `mcp-server/src/**` is OUTSIDE his charter scope; **activated by Peter's merge of the PR carrying this line (Peter: "Start the indexer fix", 2026-10-13)**; one fixing PR, diffed against this list as it stands at that merge):
- `mcp-server/src/indexer/**` (heading extraction: H3/H4, fence-awareness)
- `mcp-server/src/query/**` (tokenizer: "iOS" split; any rank/weight tuning the design requires — tier derivation stays reconstructable)
- `mcp-server/src/**/__tests__/**` (tests for the above)
- `mcp-server/src/discovery-dry-run/**` (the runner/wrapper if the measurement needs a fresh-set mode)
- `scripts/__fixtures__/discovery-fresh-set.ts` (the NEW blind query set the fix is measured on — Q2 is spent for matcher tuning)
- `.kiro/docs/discovery-indexer-fix-fresh-queries.raw.md` (the seats' verbatim answers, committed before keying)
- `.kiro/docs/discovery-indexer-fix-findings.md` (the fix's findings: four result lines)
- `scripts/discovery-study-stage1.ts` and/or a sibling runner `scripts/discovery-indexer-fix-run.ts`
- `.kiro/docs/discovery-study-stage1-findings.md` (the owed DA-05 key-error addendum only)
- `.kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md` is already in his scope (dated amendment for any weight/level change).
**Read-only, never edited**: `scripts/__fixtures__/discovery-oracle.ts`, `scripts/__fixtures__/discovery-q2-seats.ts` (both must diff empty against `main` at the fixing PR's head). Nothing under `governance/**`, `.kiro/steering/**`, ballots, or `.github/**`.
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

## Execution — started 2026-10-13 (Peter: "Start the indexer fix")
Thurgood designs the fix and its measurement first (read-only consult: scope of H3/H4 indexing and weighting; fence-aware heading parser; iOS tokenization; acceptance = oracle 83/0/0 and rank-1-strong not below 77, no new confident-wrong on Q2 (reported, spent), and the fresh blind set as the discrimination measure), then executes on `fix/find-docs-indexer-h3-fence-ios` after this grant's merge. The fresh set is authored blind by the four seats via the same sealed prompt (new consults, no prior context) and keyed by Thurgood BEFORE the fix is run — pre-registered in the fixing PR's first commit.

## Design (Thurgood, read-only consult 2026-10-13) — pre-registered here; the fixing PR's first commit carries the fresh set + this acceptance verbatim
1. **Deep headings (H3 + H4) through a co-occurrence gate.** Naive H3-at-high-weight fails because each query token can hit a different generic heading in a big doc and inflate coverage (KE-06/DA-06 lost to "behavioral/contract/validation" headings in PIG/TDS/Stemma; SP-05 to component-development-standards on "structure/naming"; KE-03 to token-family-responsive on "touch target"; oracle "base variant inheritance patterns" 1 → 12). Medium weight, low weight, and dropping shared headings all still 82/83. **What works**: per doc, only the single best deep heading counts, and only if it contains ≥ max(2, min(3, salient query tokens)) salient query tokens → oracle 83/83, rank-1-strong 77; brings back KE-10's H4 half. Evidence stays checkable via a new `matchedOn` class `subsections:`. Rubric consequence: a field/signal-class amendment (dated, owner knob); tiers move at merge and the PR body says so; ballot only if the tier vocabulary/meaning changes or a score is emitted.
2. **Fence-aware heading parser** — `heading-parser` only (the find_docs match surface and summaries). 15 served docs have `##`/`###` inside code fences (worst: Process-Spec-Planning 149, the MCP doc template 68). Oracle with fence-aware H2 extraction: 83/83, 77 — unchanged. **Out of scope**: `section-parser` — its `sN` ids count the fenced lines; making it fence-aware renumbers ids in 15 docs → a separate addressing-conventions pass.
3. **"iOS" atoms** — a versioned list of tokens never camelCase-split (iOS, iPadOS, macOS, tvOS, watchOS, iPhone, iPad), kept beside the stop-word list. Lower-casing before the split would kill all camelCase splitting. **The components tokenizer has the same defect** (`application-mcp-server/src/indexer/ComponentIndexer.ts` `tokenizeString` L129–141) — Lina's surface and call; a duplicate list with cross-citing headers follows the scorer precedent. ROUTED to Lina (follow-ups record row 11).
4. **Measurement.** Hard floor: oracle 83/0/0 and rank-1-strong ≥ 77 (gate chosen on the training set — stated). Q2: reported as spent and descriptive; Thurgood does not look at Q2 under the gated variant until the fresh run is done. **Fresh set**: four product seats, NEW agents, the same sealed prompt (~12 lines each; ~35 positives, ~8 negatives expected); exact duplicates of Q2 queries dropped; keyed K1–K6 by reading the corpus; **the orchestrator reviews every key before the freeze; disputed keys are dropped**. **Pre-registered acceptance** (shipped matcher at merge-base vs fix at head, on the fresh set): net passes ≥ +2 with ≤ 2 lost; no new confident-wrong in the top 3; oracle floor holds.
5. **Order.** One fixing PR, three commits in a fixed order after the fresh-set commit: fence → deep headings → atoms; run after each → four result lines (shipped, +fence, +headings, +atoms); cumulative; interactions noted.
6. **Credibility without Thurgood.** Blind seats; orchestrator key review; gate and design fixed before the fresh run (this block); run output committed verbatim; deterministic matcher, anyone re-runs; his earlier H3 look at Q2 stays labelled post-hoc.
7. **Cost.** Thurgood ≈ 2 sessions (fresh keying 0.5, three fixes + tests 0.75, rubric amendment 0.25, runs + findings 0.5); seats ≈ 1 total; orchestrator key review ≈ 0.25.
