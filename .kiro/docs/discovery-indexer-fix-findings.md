# Discovery indexer fix — FINDINGS (four result lines)

**Date**: 2026-10-13
**Issue + pre-registration block + grant**: `.kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md` (grant activated at #322's merge)
**Owner**: Thurgood. **Independent check**: orchestrator (Thurgood's declared conflict: he owns the matcher and most affected docs; the fresh blind set is the independent measure)
**Branch**: `fix/find-docs-indexer-h3-fence-ios`
**Pre-registration commit (1)**: `3db79d9fd`. It holds the fresh raw answers, the fresh fixture (30 positives / 8 strict-none negatives; every key reviewed by the orchestrator, none disputed), the sibling runner `scripts/discovery-indexer-fix-run.ts`, and the pure compare module `mcp-server/src/discovery-dry-run/fix-compare.ts` with tests. No fix code.
**Status**: **COMPLETE — all four lines run; the pre-registered acceptance is MET at the final line (§ 5).** Remaining items are routed (§ 7).

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

- **Change**:
  - `mcp-server/src/indexer/heading-parser.ts`: `extractDeepHeadings`, H3 + H4, fence-aware via the shared `linesOutsideFences`.
  - `deepSections` is declared as `WithDeepSections` in `heading-parser.ts` (an additive, optional field), not on `models/DocumentMetadata`. That keeps the change inside the grant paths.
  - `mcp-server/src/indexer/DocumentIndexer.ts`: populates `deepSections`.
  - `mcp-server/src/query/QueryEngine.ts`: `deepHeadingGateK`, `selectDeepHeading`, and the high-signal class `subsections`, last in the high-signal order.
  - Tier derivation is untouched. Rubric amendment: `.kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md`, "deep headings (H3/H4) through a co-occurrence gate".
- **Tests**:
  - `src/query/__tests__/find-docs-deep-headings.test.ts`: gate math at 1/2/3/4/7 tokens, single best heading per doc, `subsections:` evidence, tier, no re-credit.
  - `src/query/__tests__/find-docs-deep-headings.corpus.test.ts`: live-corpus guard for KE-06, DA-06, SP-05 and KE-03 at rank ≤ 2, and the oracle's "base variant inheritance patterns" at rank 1. A guard, not a tuning target.
  - `src/indexer/__tests__/heading-parser.test.ts`: `extractDeepHeadings`.
  - Full mcp-server suite (`npx jest --runInBand`): 42 suites, 699/699 passed. tsc clean.
- **Command**: `npx tsx scripts/discovery-indexer-fix-run.ts --line headings --compare <scratch>/fix/line-shipped.json`. The code is uncommitted on top of fix 1's commit `07df14e59`, so the runner's HEAD line reads `07df14e59`. The fix-2 commit SHA is recorded when it is made.
- **Oracle**: 83 / 0 / 0; rank-1-strong 77. Unchanged; the gate's oracle-only design prediction held.

**Cumulative, shipped → headings:**
- **Fresh positives**: R@1 17 → 20, R@2 19 → 21. **Gained FST-04 and FST-12; lost none; net +2.**
  - All rank moves: FSP-N2 16→15, FKE-03 5→3, **FKE-07 5→14**, FDA-04 6→3, FDA-08 2→1, FST-04 3→1, **FST-08 3→8**, FST-12 absent→1.
  - FKE-07 and FST-08 are fix 1's losses (§ 2); fix 2 does not recover them, because their answer headings sit inside a fence.
- **Fresh negatives**: correct 7/8 (FSP-09 stays confident-wrong, as at shipped); **no new confident-wrong**; none resolved.
- **Q2 (SPENT, descriptive only)**: R@1 20 → 25, R@2 25 → 29.
  - Gained SP-08, DA-09, ST-02, ST-04, ST-09; lost KE-11 (rank 1→3); net +4; no new confident-wrong.

**Delta, fence → headings (fix 2 alone):**
- **Fresh rank moves**: FDA-08 2→1, FST-04 3→1, FST-12 absent→1.
- **Fresh tier moves** (same rank, now `strong`): FKE-01, FKE-06, FST-05.
- **Q2 rank moves (descriptive)**: SP-08 3→1, KE-07 2→1, KE-08 3→1, **KE-11 1→3**, DA-07 17→3, DA-09 5→1, ST-02 7→1, ST-03 14→1, ST-04 3→1, ST-09 absent→1.
  - ST-05 moved partial → strong at the same rank.
  - Fix 2 recovers DA-07's and ST-03's fence-1 losses. Their answers are H3s outside the fence: "Tier 2: Implementation Reports" and "The instruments line and block".

**Runner's per-criterion read (informational at this line):** (a) ACCEPT · (b) ACCEPT (net +2, 0 lost) · (c) ACCEPT · overall ACCEPT.

**Note:** (b) is met exactly at its +2 bound. Line 4 (atoms) can still move it either way, and acceptance is judged there.

## 4. Line `atoms` — + the "iOS"-family atom list

- **Change**:
  - `mcp-server/src/query/token-atoms.ts` (new): `TOKEN_ATOMS` v1 (iOS, iPadOS, macOS, tvOS, watchOS, iPhone, iPad), `TOKEN_ATOM_LIST_VERSION = 1` with a CHANGELOG (the stop-word module's pattern), and `protectAtoms`, which lowercases an atom in place, longest first and never inside a longer word.
  - `mcp-server/src/query/QueryEngine.ts`: `tokenizeRaw` calls `protectAtoms` BEFORE the camelCase split. That is one tokenizer for indexed text and query alike, so the fix is symmetric.
  - The components tokenizer is NOT touched (Lina, follow-ups row 11).
- **Tests**: `src/query/__tests__/token-atoms.test.ts` covers:
  - each atom, both through `protectAtoms` and as a find_docs match;
  - iPadOS not read as iPad + OS;
  - no match inside a longer word;
  - a brand-cased query against lowercase doc text;
  - `contentDescription` still splitting;
  - the ST-N2 query: `description:ios` present, `description:i` / `description:os` absent.
  - Full mcp-server suite (`npx jest --runInBand`): 43 suites, 721/721 passed. tsc clean.
- **Command**: `npx tsx scripts/discovery-indexer-fix-run.ts --line atoms --compare <scratch>/fix/line-shipped.json`. The code is uncommitted on top of fix 2's commit `15f240a4b`, so the runner's HEAD line reads `15f240a4b`.
- **Oracle**: 83 / 0 / 0; rank-1-strong 77.
- **Fresh positives**: R@1 20, R@2 21. Cumulative vs shipped: gained FST-04 and FST-12, lost none, **net +2**.
- **Fresh negatives**: correct 7/8; no new confident-wrong.
- **Q2 (SPENT, descriptive)**: R@1 25, R@2 29; no change from the headings line.
- **Delta vs the headings line: NONE.** No rank, tier or negative top-3 changed on the fresh set or Q2.
  - Fix 3 is correct (it removes a real asymmetry and the spurious `i` / `os` tokens, pinned by its tests), but on these sets it is **measurably inert**. No fresh or Q2 query's outcome depended on "iOS" alone.
  - In particular, Stage 1's KE-10 still misses: its iOS half is an H4 whose only overlap with the query is `ios`, below the gate.

## 5. Acceptance at the final line (`atoms` vs `shipped`) — **VERDICT: ACCEPTED**

| Criterion | Result | Detail |
|---|---|---|
| (a) oracle 83/0/0 and rank-1-strong ≥ 77 | **ACCEPT** | 83 / 0 / 0, rank-1-strong 77 (unchanged from shipped) |
| (b) fresh net ≥ +2, ≤ 2 lost | **ACCEPT** | net **+2** (gained FST-04, FST-12; lost none) |
| (c) no new confident-wrong (top 3) | **ACCEPT** | none; FSP-09 was confident-wrong at shipped and still is (D-3) |
| (d) Q2 reported as spent | **done** | R@2 25 → 29 (gained SP-08, DA-09, ST-02, ST-04, ST-09; lost KE-11). Descriptive only, never evidence |

**The fix as pre-registered is ACCEPTED on all three criteria.**

**Read plainly:**
- **(b) is met exactly at its bound, and all of it comes from fix 2.** Fix 1 is net 0 and costs rank on two fresh template queries (FKE-07 5→14, FST-08 3→8). Fix 3 is net 0.
- **The surviving counter-argument:** +2 on 30 queries is the smallest margin the rule allows. One key judged differently, or one doc edit, would flip (b). The evidence says the gate fixes the class it was built for (answers in H3/H4 headings). It does not say the indexer is now good: 9 of 30 fresh positives still miss.
- **Owner's position:** accept fix 2 on its evidence. Keep fix 1, because phantom sections are wrong by construction, but treat its template cost as the next design question (§ 7). Keep fix 3 as a correctness fix with no measured lift.

## 6. Answer-key errors found after the pre-registration commit

**None.** No fresh key was challenged or found wrong while running the four lines. The 9 remaining fresh misses are matcher outcomes, not key errors.

## 7. Routed items

1. **The fenced-template design question.** Owner: Thurgood. Measured on a NEW fresh set, never this one, which is now spent for matcher tuning.
   - **What**: fix 1 stopped indexing headings inside fenced code blocks. In this corpus several of those fences are markdown TEMPLATES whose headings are the answer to "what goes in X":
     - `product-handoff-protocol` L98–127, the Implementation Report template ("Implementation Report", "What Was Built", "Deviations from Spec", "Decisions Made During Implementation", "Discoveries", "Open Items");
     - L140–159, the System Request template;
     - `completion-documentation-guide`'s completion-doc and Instruments-block templates.
   - **Cost measured here**: FKE-07 5→14 and FST-08 3→8 (fresh, rank only; neither was a pass at shipped). In Q2 (descriptive): DA-07 6→17 and ST-03 1→14, recovered by fix 2 through the H3s outside the fence; KE-08 1→3, recovered to 1 by fix 2.
   - **Candidate shapes**:
     - (i) keep fix 1 as is (never index fenced headings);
     - (ii) index headings inside a fence whose info string is `markdown` / `md` (a template), through the same deep-heading gate, and never other fences;
     - (iii) index fenced headings only as a low-signal class.
   - **Pre-register before choosing**: a new fresh set, the same acceptance shape, and the same oracle floor.
2. **FSP-09 confident-wrong** (fresh, at every line): `process-file-organization` comes back `strong` for "where do product screen implementation files live". This is Stage 1's D-3 again — the routing cue points at a doc that does not answer, and no served doc answers. Routed with D-3: Leonardo for the doc gap; Thurgood's ballot draft for the cue wording.
3. **Components tokenizer** (`application-mcp-server/src/indexer/ComponentIndexer.ts` `tokenizeString`) has the same "iOS" split defect. Lina's surface, follow-ups row 11; `token-atoms.ts` is the docs-side model if she wants a duplicate list with cross-citing headers.
4. **section-parser fence-awareness**: deferred to an addressing-conventions pass. Making it fence-aware renumbers `sN` ids in 15 docs.
5. **Stage 1 DA-05 key-error addendum**: written in `.kiro/docs/discovery-study-stage1-findings.md` § 10, the only edit there, as the grant allows.
6. **Remaining fresh misses (9)**: FSP-N2, FKE-03, FKE-07, FKE-09, FKE-N2, FDA-04, FDA-N2, FST-08, FST-N1.
   - Four are "not supported" status answers (FKE-09, FKE-N2, FDA-N2, FST-N1), Stage 1's K6 class, which is lexically unreachable by design.
   - Two are template rank losses (§ 7.1).
   - FSP-N2: test-development-standards' answering H3s ("JSDOM and Custom Elements", "Pattern: Shadow DOM Querying") each hold only two of the query's salient tokens, below the gate's 3 for a long query.
   - FKE-03 and FDA-04 (product-token naming) sit at rank 3, all `partial`, behind `designerpunk-integration-guide` (product-token sections) and `web-authoring-standards`' duplicated naming schema (Stage 1 D-2).
   - None is a new defect class.
