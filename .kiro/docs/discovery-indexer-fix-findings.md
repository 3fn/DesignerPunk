# Discovery indexer fix — FINDINGS (four result lines)

**Date**: 2026-10-13
**Issue + pre-registration block + grant**: `.kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md` (grant activated at #322's merge)
**Owner**: Thurgood. **Independent check**: orchestrator (Thurgood's declared conflict: he owns the matcher and most affected docs; the fresh blind set is the independent measure)
**Branch**: `fix/find-docs-indexer-h3-fence-ios`
**Pre-registration commit (1)**: `3db79d9fd`. It holds the fresh raw answers, the fresh fixture (30 positives / 8 strict-none negatives; every key reviewed by the orchestrator, none disputed), the sibling runner `scripts/discovery-indexer-fix-run.ts`, and the pure compare module `mcp-server/src/discovery-dry-run/fix-compare.ts` with tests. No fix code.
**Status**: IN PROGRESS. Lines 1–2 are recorded below; lines 3–4 are pending.

---

## Pre-registered acceptance (verbatim from the fresh fixture header)

The fix is ACCEPTED iff ALL of the following hold at the final line:
- **(a)** oracle: 83 / 0 / 0 PASS / WEAK / MISS, and rank-1-strong ≥ 77;
- **(b)** fresh positives, shipped → fixed: net passes (rank ≤ 2) ≥ +2, with ≤ 2 positives lost;
- **(c)** fresh negatives: NO new confident-wrong — no negative that is correct under the shipped matcher has a `strong` in its top 3 under the fix (F6 bound);
- **(d)** Q2 is re-run and REPORTED AS SPENT: descriptive only, never evidence for or against the fix.

**The four-line plan.** Each line is cumulative, in a fixed order, and each fix is its own commit:
1. `shipped`: the matcher at the pre-registration commit;
2. `fence`: + fence-aware heading extraction;
3. `headings`: + deep headings H3/H4 through the co-occurrence gate. Only the single best deep heading per doc counts, and only with ≥ max(2, min(3, salient query tokens)) of the query's salient tokens;
4. `atoms`: + the "iOS"-family tokenizer atom list.

Every line after `shipped` is run with `--compare` against the shipped JSON. The (a)–(c) lines at lines 2–3 are informational; acceptance is judged at line 4.

## 1. Line `shipped` — the shipped matcher

- **Command**: `npx tsx scripts/discovery-indexer-fix-run.ts --line shipped`, at HEAD `3db79d9fd4ea6941c2a13fd49818e1b69e07e5a2`. Exit 0; integrity checks all OK.
- **Output**: the session scratchpad holds `fix/line-shipped.txt` (full output) and `fix/line-shipped.json` (the `--compare` base). The matcher is deterministic, so both are reproducible at `3db79d9fd`.
- **Oracle**: 83 / 0 / 0; rank-1-strong 77/83.
- **Fresh positives (n 30)**: R@1 17, R@2 19 (63 %), tiered PASS 19.
  - Misses (11): FSP-N2, FKE-03, FKE-07, FKE-09, FKE-N2, FDA-04, FDA-N2, FST-04, FST-08, FST-12, FST-N1.
- **Fresh negatives (n 8)**: correct 7; confident-wrong 1, at rank 1. **FSP-09** ("where do product screen implementation files live file organization") → `process-file-organization` `strong`. That is Stage 1's finding D-3 (the routing cue sends the seat to a doc that does not answer) appearing again as a confident-wrong.
- **Q2 (SPENT, descriptive)**: R@1 20, R@2 25 of 36; negatives 6/8 correct. This is up from Stage 1's 18 / 23 because Lina's two alias hand-fixes have since landed (#319).

## 2. Line `fence` — + fence-aware heading extraction

- **Change**: `mcp-server/src/indexer/heading-parser.ts`. `##` / `###` lines inside ``` or ~~~ fences are no longer extracted (CommonMark fence rules: up to 3 spaces of indentation; closed by the same character, at least as long).
  - `section-parser.ts`, which supplies get_section's `sN` ids, is deliberately NOT changed. Its ids count every heading line, so fence-awareness there would renumber ids in the 15 affected docs. That is a separate addressing-conventions pass; the reason is recorded in a code comment.
  - Tests: `mcp-server/src/indexer/__tests__/heading-parser.test.ts`, 6 new fence cases.
  - Full mcp-server suite (`npx jest --runInBand`): 40 suites, 676/676 passed. mcp-server tsc clean.
- **Command**: `npx tsx scripts/discovery-indexer-fix-run.ts --line fence --compare <scratch>/fix/line-shipped.json`. The code is uncommitted on top of `3db79d9fd`, so the runner's HEAD line reads `3db79d9fd`. The fix-1 commit SHA is recorded when it is made.
- **Oracle**: 83 / 0 / 0; rank-1-strong 77 (unchanged).
- **Fresh positives**: R@1 17, R@2 19. **Gained none, lost none, net +0.**
  - Rank moves:
    - FSP-N2 16→15
    - FKE-03 5→3
    - FDA-04 6→3
    - **FKE-07 5→14**
    - **FST-08 3→8**
- **Fresh negatives**: correct 7/8; no new confident-wrong; none resolved.
- **Q2 (SPENT, descriptive)**: R@2 25 → 23. Lost KE-08 and ST-03.
  - Rank moves: KE-08 1→3, DA-07 6→17, DA-09 3→5, ST-02 3→7, ST-03 1→14.
- **Runner's per-criterion read (informational at this line):** (a) ACCEPT · (b) REJECT (net +0) · (c) ACCEPT · overall REJECT.
- **Unexpected and important: in this corpus, fenced headings are often the ANSWER.** The rank losses are all queries about a TEMPLATE whose headings sit in a markdown code fence:
  - `product-handoff-protocol`'s Implementation Report template (L98–127: "Implementation Report", "What Was Built", "Deviations from Spec", "Discoveries" …) → FKE-07, FST-08, DA-07;
  - `completion-documentation-guide`'s completion-doc and Instruments-block templates → KE-08, DA-09, ST-02, ST-03.
  - Fix 1 removes phantom sections, as designed, but those phantoms carried exactly the vocabulary that answers "what goes in an implementation report / an instruments block".
  - Fix 1 is therefore neutral on fresh passes and negative on fresh ranks. Whether it stays as specified, or becomes "fenced headings indexed at a lower class", is the owner's design question for after line 4. **Not changed here:** the pre-registered order and content stand.

## 3. Line `headings` — + deep headings via the co-occurrence gate

_Pending (the fix-1 commit comes first)._

## 4. Line `atoms` — + the "iOS"-family atom list

_Pending._

## 5. Acceptance at the final line

| Criterion | Result | Detail |
|---|---|---|
| (a) oracle 83/0/0 and rank-1-strong ≥ 77 | _pending_ | |
| (b) fresh net ≥ +2, ≤ 2 lost | _pending_ | |
| (c) no new confident-wrong (top 3) | _pending_ | |
| (d) Q2 reported as spent | _pending_ | |

## 6. Answer-key errors found after the pre-registration commit

None so far.

## 7. Routed items

- **Fenced template headings carry answer vocabulary** (§ 2): a design question for the owner after line 4 — keep fix 1 as specified, or index fenced headings at a lower class.
- **FSP-09 confident-wrong at shipped**: one more instance of Stage 1's D-3 (seat cue → `process-file-organization`, which does not answer). Routed with D-3 (Leonardo for the doc gap; Thurgood's ballot draft for the cue wording).
- **Components tokenizer** (`application-mcp-server/src/indexer/ComponentIndexer.ts` `tokenizeString`) has the same "iOS" camelCase-split defect. It is Lina's surface and her call; not in this PR.
- **section-parser fence-awareness**: deferred to an addressing-conventions pass (`sN` renumbering in 15 docs).
