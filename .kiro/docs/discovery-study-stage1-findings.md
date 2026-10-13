# Discovery Study Stage 1 (docs side) — FINDINGS

**Date**: 2026-10-12 (skeleton at pre-registration; results the same day)
**Charter**: `.kiro/issues/2026-10-12-discovery-study-stage1-docs-charter.md`; design record `.kiro/issues/2026-10-07-discovery-shadow-study-charter.md`
**Owner**: Thurgood. **Independent check of the miss table and of commit order**: orchestrator (Thurgood's declared conflict: he owns the docs rubric a null result vindicates).
**Status**: **RESULTS RECORDED (commit (3)) — outcome PROVISIONAL.** Arm A ran at the pre-registration commit (2). Miss buckets await owner rulings, and the gate outcome awaits one class ruling (§ 6.8).

---

## 1. Pre-registration record

| Item | Value |
|---|---|
| Commit (1): raw seat queries + sealed prompt | `5f8b668b5` (branch `chore/discovery-study-stage1`) |
| Commit (2): pre-registration (calibration set, Q2 fixture + keys, scorer wrapper + tests, runner, this skeleton) | `08fed8984de8bb18e7dab90a3d0371ce99bfca84` (made and verified by the orchestrator: exactly six files, oracle byte-identical, 40/40, mcp-server `tsc` clean, `--verify-only` 36/8/5/6) |
| Corpus the keys were checked against | `main` @ `7aa433fca` (83 served docs) |
| Seat routing cues frozen from | `.claude/agents/{sparky,kenya,data}.md` @ `8a0c0e46a`; `.claude/agents/stacy.md` @ `08637770a` |
| Calibration-only set source | `tool-boundary.contract.test.ts` blob `e5a99bf07c49f4f7d19e5cbbb8e1bcd60f286ed4` (last commit `dcd337dcf`) |
| Matcher runs on any Q2 query before commit (2) | **none** (keys checked by reading the corpus only) |

Squash-merge flattens this order on `main`; the orchestrator's PR-body note records that (2) precedes (3).

## 2. Rulings made at pre-registration (Thurgood, 2026-10-12, before any result)

- **Routing (charter § 1c).** A query whose seat tool is a docs-MCP tool enters Q2. Application-MCP, Product-MCP and Bash lookups are HELD: SP-10, SP-11, SP-12, DA-12, ST-06, ST-12. They are listed with reasons in `Q2_HELD` in the fixture. The raw file is NOT annotated: its own rule (committed in (1)) says notes never go there. The raw file stays the untouched verbatim record, and routing lives in the fixture and here.
- **Cue-exposure (charter § 3).** Naming the target doc does not make a query ineligible. Every Q2 query is scored as written. The runner computes two flags mechanically and reports every count split by them: `intentMode` (search vs direct, from the seat's tool string) and `cueExposed` (a routing cue from the seat's own charter appears in the query or tool string). The gate and outcome rules count misses in BOTH strata. That is the choice that cuts against the rubric owner's interest.
- **Leonardo timing.** Q2 freezes now with the four seats. Leonardo's block (written after his Settings ledger closes) is pre-registered later as a dated addendum (Q2-L), with its own pre-registration SHA and its own results line (§ 7). Why: A is deterministic and the corpus moves; keys held open for weeks would drift from the SHA they were checked against, for no measurement gain.
- **Keying rules K1–K6** are stated in the fixture header (`scripts/__fixtures__/discovery-q2-seats.ts`). Every key and exclusion cites the rule it applies.
- **Negatives.** The 8 scored negatives are seat-authored. The calibration-only set stays never-scored (charter § 1a), and no Thurgood-authored negative is in Q2.
- **Scoring (charter § 2, F5, F6).** Positives: R@1 and R@2 (rank-only), beside A's tiered PASS. Under A, every entry `findDocsConcept` returns is `strong` or `partial`, so tiered PASS equals R@2 by construction; both are still reported. Negatives: correct iff no `strong` in the top 3. Each negative is also classed `none` / `labeled-closest` / `confident-wrong`; whether each labeled-closest result is a sensible neighbour is ruled afterwards by the doc's owner, as a secondary measure only.

## 3. Q2 composition (frozen)

| Seat | Raw lines | Positives | Negatives | Dropped (K5) | Held |
|---|---|---|---|---|---|
| Sparky | 14 | 6 | 2 | 3 (SP-02, SP-03, SP-N2) | 3 |
| Kenya | 13 | 11 | 2 | 0 | 0 |
| Data | 14 | 10 | 2 | 1 (DA-01) | 1 |
| Stacy | 14 | 9 | 2 | 1 (ST-07) | 2 |
| **Total** | **55** | **36** | **8** | **5** | **6** |

Three seat-labelled "probably undocumented" queries are keyed positive by evidence (K3/K6): KE-N1, DA-N1, ST-N2. Four seat-labelled "documented" queries are keyed strict-none: SP-09, KE-09, DA-10 (screen-file locations), ST-10 (claims taxonomy, not served).

## 4. Discoveries made while keying — ROUTED, not fixed (no corpus edit in the study PR, charter § 3)

Each item goes out as an explicit message to the named owner(s) once this PR merges. Nothing below has been fixed.

| # | Discovery | Evidence | Route (Civitas resolution path) | Owner(s) |
|---|---|---|---|---|
| D-1 | **Cross-domain contradiction on `.dp`** (DA-01, dropped K5c) | `rosetta-system-architecture` § "Token Consumption Rule": tokens are pre-unitized (Android `Dp`) and `.dp` is never appended. `platform-implementation-guidelines` § "Android Token Usage: The `.dp` Pattern": `DesignTokens` values are `Float`, and `.dp` is required for an explicitly typed `Dp`. | Cross-domain: Thurgood flags; both owners review; Peter arbitrates if they disagree. A component-development-guide example (`spaceInsetNormal.dp`, ~L626/L964) should be read in the same pass. | Ada (Rosetta doc) + Lina (PIG, CDG) |
| D-2 | **Product-token guidance duplicated across two docs** (SP-02, SP-03, dropped K5a) | `web-authoring-standards` § "Product Token Authoring (Sparky)" (Naming Schema, Canonical Categories, Authoring Rules) and `product-token-governance` (Naming Conventions, Authoring Workflow, Value Governance) both carry substantive rules. WAS says "For full governance: See Product-Token-Governance.md". | Content consistency: Thurgood flags; the owners judge whether this is intentional web-specific abstraction or drift. Cross-domain if the two docs have different owners. | WAS owner (Lina / Sparky surface) + PTG owner (unrecorded) — orchestrator to confirm |
| D-3 | **Unanswered question plus a routing-cue mismatch: "where do product-screen files live?"** (SP-09, KE-09, DA-10; keyed strict-none) | Three seats independently asked; no served doc answers. Each seat's charter routes "file-organization rules" to `process-file-organization`, which covers this repo's metadata-driven layout. A run (§ 6.4) put `process-file-organization` at rank 1 (`partial`) for SP-09 and DA-10: the cue sends seats to a doc that does not answer. | (a) The doc gap goes to the product-structure owner. (b) The cue wording lives in agent charters (`canonical/agents/**`, governance law) and changes only by ballot; Thurgood drafts. | Leonardo (product structure) for (a); Thurgood (ballot draft) + Peter for (b) |
| D-4 | **Known index defect touching a key** (ST-05) | ST-05's answer is an H4 heading; H4 is not indexed (`.kiro/issues/2026-10-12-docs-mcp-does-not-index-h4.md`). ST-05 still PASSED (rank 1 via the doc's other headings). | Fold into the matcher issue in § 6.9. | Thurgood |

## 5. Commands

```bash
npx tsx scripts/discovery-study-stage1.ts --verify-only   # integrity only; scores nothing
npx tsx scripts/discovery-study-stage1.ts                 # the run (arm A), at commit (2)
cd mcp-server && npx jest src/discovery-dry-run           # scorer tests (not in root npm test)
```

## 6. Results (commit (3)) — run of 2026-10-12

### 6.1 Run record

- **Command**: `npx tsx scripts/discovery-study-stage1.ts` (full run, arm A only), from the repo root.
- **HEAD**: `08fed8984de8bb18e7dab90a3d0371ce99bfca84`, the pre-registration commit (2). Working tree clean before the run. Exit 0.
- **Integrity**: verbatim strings OK; ids unique; all 55 raw lines accounted for; oracle byte-identical to `main`.
- **Scorer tests at (2)**: `cd mcp-server && npx jest src/discovery-dry-run` → 40/40 (verified independently by the orchestrator before commit (2)).

### 6.2 Q1 oracle (regression only)

**83 / 0 / 0** PASS / WEAK / MISS; rank-1-strong **77/83**. This is identical to the baseline the charter records: no regression.

### 6.3 Q2 positives (n = 36)

| Stratum | n | R@1 | R@2 | Tiered PASS |
|---|---|---|---|---|
| **Total** | **36** | **18 (50 %)** | **23 (64 %)** | **23 (64 %)** |
| intentMode: search | 17 | 5 | 9 (53 %) | 9 |
| intentMode: direct | 19 | 13 | 14 (74 %) | 14 |
| cueExposed: true | 13 | 8 | 9 (69 %) | 9 |
| cueExposed: false | 23 | 10 | 14 (61 %) | 14 |
| seat: sparky | 6 | 4 | 5 | 5 |
| seat: kenya | 11 | 7 | 9 | 9 |
| seat: data | 10 | 2 | 4 | 4 |
| seat: stacy | 9 | 5 | 5 | 5 |

Tiered PASS equals R@2 by construction (§ 2). Per-seat numbers are descriptive only (charter § 5). The weakest stratum is the queries the seats said they would actually send to `find_docs` (search: 9/17).

### 6.4 Q2 negatives (n = 8; F6 top-3, F5 classes)

- **Correct 6/8. Confident-wrong 2/8**, both `strong` at rank 1 (so the rank-1, top-2 and top-3 subsets all show 2):
  - **SP-N1** → `web-authoring-standards` (title "web" + sections "screen", "product" + description "screens").
  - **KE-N2** → `component-development-guide`, via `aliases:navigation`. That alias was seeded in 119-A from the oracle's "focus management keyboard navigation" concept. **An alias tuned on Q1 produced a confident-wrong on Q2**: a measured side effect of the oracle being A's training set.
- **Outcome classes**: none 0 · labeled-closest 6 (SP-09, KE-09, DA-10, DA-N2, ST-10, ST-N1) · confident-wrong 2.
- **Neighbour judgments (secondary measure, F5)** — owed from each top-1 doc's owner; not yet made.

### 6.5 Run output (verbatim, human-readable part; the JSON tail is reproducible by re-running at `08fed8984`)

```
=== Discovery Study Stage 1 — RUN (arm A, lexical) ===
HEAD: 08fed8984de8bb18e7dab90a3d0371ce99bfca84
Q2: 36 positives / 8 negatives / 5 dropped / 6 held
Integrity: verbatim OK; ids unique; raw lines accounted; oracle byte-identical to main.

Q1 oracle (regression only): 83/0/0 PASS/WEAK/MISS; rank-1-strong 77/83

Positives  id     rank tier     R@1 R@2 PASS mode    cue   expected
           SP-01     1 strong   y   y   y    search  true  web-authoring-standards  strong@1
           SP-04     1 strong   y   y   y    direct  true  token-family-layering  strong@1
           SP-05     2 strong   .   y   y    search  true  test-development-standards  strong@1,2,3
           SP-06     1 strong   y   y   y    direct  true  test-behavioral-contract-validation  strong@1,2,3
           SP-07     1 strong   y   y   y    search  false product-handoff-protocol  strong@1,2
           SP-08     3 partial  .   .   N    direct  true  completion-documentation-guide  strong@-
           KE-01     1 strong   y   y   y    search  false component-development-guide  strong@1
           KE-02     1 strong   y   y   y    direct  true  platform-implementation-guidelines  strong@1,2,3,4
           KE-03     1 strong   y   y   y    direct  false token-family-accessibility  strong@1,2,3,4,5
           KE-04     1 strong   y   y   y    direct  false product-token-governance  strong@1,2,3,4,5,6,7,8,9,10,11,12
           KE-05     1 partial  y   y   y    search  false test-development-standards  strong@-
           KE-06     2 strong   .   y   y    search  false test-behavioral-contract-validation  strong@1,2,3,4
           KE-07     2 partial  .   y   y    search  false product-handoff-protocol  strong@1
           KE-08     1 partial  y   y   y    direct  false completion-documentation-guide  strong@-
           KE-10    -- -        .   .   N    search  false designerpunk-integration-guide  strong@-
           KE-11     1 partial  y   y   y    direct  false contract-system-reference  strong@-
           KE-N1     7 partial  .   .   N    search  false designerpunk-integration-guide  strong@-
           DA-02    24 partial  .   .   N    search  false component-development-guide  strong@-
           DA-03     1 strong   y   y   y    direct  false product-token-governance  strong@1,2,3,4
           DA-04     1 strong   y   y   y    direct  false product-token-governance  strong@1,2,3,4,5,6,7,8
           DA-05     3 partial  .   .   N    search  false test-development-standards  strong@1,2
           DA-06     2 strong   .   y   y    search  false test-behavioral-contract-validation  strong@1,2,3
           DA-07     6 partial  .   .   N    search  false product-handoff-protocol  strong@1,2,3
           DA-08     2 partial  .   y   y    direct  false token-family-accessibility  strong@1
           DA-09     3 partial  .   .   N    direct  false completion-documentation-guide  strong@-
           DA-11    -- -        .   .   N    search  false platform-implementation-guidelines  strong@-
           DA-N1    -- -        .   .   N    search  false designerpunk-integration-guide  strong@-
           ST-01     1 strong   y   y   y    direct  true  completion-documentation-guide  strong@1
           ST-02     3 partial  .   .   N    direct  true  completion-documentation-guide  strong@-
           ST-03     1 partial  y   y   y    direct  true  completion-documentation-guide  strong@-
           ST-04     3 partial  .   .   N    direct  true  completion-documentation-guide  strong@-
           ST-05     1 strong   y   y   y    search  true  process-spec-planning  strong@1
           ST-08     1 strong   y   y   y    direct  true  test-behavioral-contract-validation  strong@1,2,3,4,5,6
           ST-09    -- -        .   .   N    direct  true  completion-documentation-guide  strong@-
           ST-11     1 strong   y   y   y    direct  false product-handoff-protocol  strong@1
           ST-N2    -- -        .   .   N    search  false completion-documentation-guide  strong@-

Negatives  id     outcome          top-3 (id:tier)
           SP-09  labeled-closest  process-file-organization:partial, product-handoff-protocol:partial, product-token-governance:partial  strong@-
           SP-N1  confident-wrong  web-authoring-standards:strong, component-development-guide:partial, product-handoff-protocol:partial  strong@1
           KE-09  labeled-closest  product-handoff-protocol:partial, web-authoring-standards:partial, product-token-governance:partial  strong@-
           KE-N2  confident-wrong  component-development-guide:strong, component-inheritance-structures:partial, component-family-templates:partial  strong@1
           DA-10  labeled-closest  process-file-organization:partial, product-handoff-protocol:partial, component-schema-format:partial  strong@-
           DA-N2  labeled-closest  product-token-governance:partial, web-authoring-standards:partial, product-handoff-protocol:partial  strong@-
           ST-10  labeled-closest  component-quick-reference:partial, contract-system-reference:partial, rosetta-system-architecture:partial  strong@-
           ST-N1  labeled-closest  process-spec-planning:partial, component-development-guide:partial, figma-workflow-guide:partial  strong@-

Summaries (positives: n / R@1 / R@2 / tieredPass; negatives: n / correct / confident-wrong top-3 / strong@1 / strong top-2)
  cueExposed:false   P 23/10/14/14   N 7/5/2/2/2
  cueExposed:true    P 13/8/9/9   N 1/1/0/0/0
  mode:direct        P 19/13/14/14   N 1/1/0/0/0
  mode:search        P 17/5/9/9   N 7/5/2/2/2
  seat:data          P 10/2/4/4   N 2/2/0/0/0
  seat:kenya         P 11/7/9/9   N 2/1/1/1/1
  seat:sparky        P 6/4/5/5   N 2/1/1/1/1
  seat:stacy         P 9/5/5/5   N 2/2/0/0/0
  total              P 36/18/23/23   N 8/6/2/2/2

Miss worklist (tieredPass failed — bucket per charter § 1f): SP-08, KE-10, KE-N1, DA-02, DA-05, DA-07, DA-09, DA-11, DA-N1, ST-02, ST-04, ST-09, ST-N2
```

### 6.6 Miss table: 13 positives failing A's own rule. Buckets are PROPOSED (Thurgood); each owner rules

Evidence comes from the exploratory analysis in § 6.7: whether the key ranks ≤ 2 when its answering heading is indexed, or when one alias taken verbatim from the doc's own text (never from the query) is added.

| Id | Rank / tier | Key doc | Cause found | Proposed bucket | Owner who rules |
|---|---|---|---|---|---|
| SP-08 | 3 / partial | completion-documentation-guide | Answer is an **H3** ("The subtask completion doc …"); find_docs indexes H2 only | matcher/index defect (also heading-alias-fixable: → 1) | Thurgood |
| DA-09 | 3 / partial | completion-documentation-guide | same H3 | matcher/index defect (heading-alias → 1) | Thurgood |
| ST-04 | 3 / partial | completion-documentation-guide | same H3 | matcher/index defect (heading-alias → 1) | Thurgood |
| ST-02 | 3 / partial | completion-documentation-guide | Answer is an H3 ("The delegated-tier line — unconditional") | matcher/index defect (heading-alias → 1) | Thurgood |
| ST-09 | absent | completion-documentation-guide | Answer is an H3 ("CI provenance — …"); no query token in any indexed field | matcher/index defect (heading-alias → 1, strong) | Thurgood |
| DA-07 | 6 / partial | product-handoff-protocol | Answer is an H3 ("Tier 2: Implementation Reports"); generic "format / tier / 2" strongs outrank it | matcher/index defect (heading-alias → 2) | PHP owner (unrecorded; candidate Stacy) — orchestrator to confirm |
| KE-10 | absent | designerpunk-integration-guide | Answer is an H3 ("6. Generate Tokens"); query "ios" can never match doc "iOS" (tokenizer, § 6.9) | matcher/index defect (heading-alias → 2) | DIG owner (unrecorded) — orchestrator to confirm |
| DA-02 | 24 / partial | component-development-guide | Query vocabulary (theme-varying, composable) reaches only the body; the H3 heading alone does not fix it (→ 24) | **alias/metadata-fixable** (content alias "Theme-varying tokens — read from CompositionLocal" → 1, strong) | **Lina** |
| DA-11 | absent | platform-implementation-guidelines | TalkBack / contentDescription sit only in YAML body blocks; headings do not fix it | **alias/metadata-fixable** (content alias → 1) | **Lina** |
| DA-05 | 3 / partial | test-development-standards | TDS matches 2 tokens (`partial`); test-behavioral-contract-validation and product-token-governance match 3 (`strong`). No answering sub-heading to test | **alias/metadata-fixable (unverified)** | Thurgood |
| KE-N1 | 7 / partial | designerpunk-integration-guide | K6 key: the answer is a status statement; no query token (xcodebuild, simulator, runbook) appears in the doc; heading and sentence aliases fail (→ 7) | **structural** | DIG owner — orchestrator to confirm |
| DA-N1 | absent | designerpunk-integration-guide | K6 key, as KE-N1 (gradle, coordinates absent); aliases fail (→ 24) | **structural** | DIG owner — orchestrator to confirm |
| ST-N2 | absent | completion-documentation-guide | K6 key: the answer is "The instrument's honest reach"; heading and sentence aliases fail | **structural** | Thurgood |

**Thurgood rules on 7 of the 13 misses and also owns the matcher. That is the declared conflict; the orchestrator checks this table.**

### 6.7 Exploratory analysis — NOT pre-registered; run after the results, in scratch; nothing fed back into keys or fixtures

- **H3 counterfactual** (find_docs `sections` = H2 + H3, everything else unchanged):
  - **Q2 positives**: 23/36 → 27/36. Gained SP-08, KE-10, KE-N1, DA-07, DA-09, ST-02, ST-04, ST-09. Lost SP-05, KE-03, KE-06, DA-06, because more headings dilute the ranking.
  - **Oracle**: 83/83 → 82/83 ("base variant inheritance patterns" 1 → 12).
  - **Negatives**: confident-wrong 2 → 3 (DA-10 gains a `strong`).
  - **KE-N1's counterfactual win is spurious**: it matched "UI Tree Convention", not the answer.
  - **Conclusion**: the H3 omission is a real cause, but indexing H3 at full high-signal weight is NOT a free fix. It is a matcher design question with its own tuning.
- **Alias-fixability test**: one alias per miss, taken verbatim from the answering doc's own heading or sentence.
  - Fixes 9: SP-08, KE-10, DA-02, DA-07, DA-09, DA-11, ST-02, ST-04, ST-09.
  - Fails 3: KE-N1, DA-N1, ST-N2.
  - Untested 1: DA-05.

### 6.8 Volume gate and outcome — **PROVISIONAL, pending owner rulings and one class ruling**

Gate-counted misses = fixable + structural (charter § 5). The outcome **turns on one classification**: whether the 7 H3-caused misses are "matcher/index defects" (not counted) or "alias/metadata-fixable" (counted).

| Reading | Matcher defect (not counted) | Fixable | Structural | Gate-counted | Branch that fires |
|---|---|---|---|---|---|
| **A — by cause** (the charter's letter; the rubric says "section headings", and the H2-only extraction predates the rubric, 2025-12-16) | 7 | 3 | 3 | 6 (> 3) | **O1**: ≤ 3 structural AND ≤ 8 fixable → hand-fix, findings, close; Stage 2 not run |
| **B — by available fix** (each H3 miss IS fixed by its heading as an alias, and the matcher fix regresses § 6.7) | 0 | 10 | 3 | 13 | **O2**: ≥ 9 fixable AND 10/13 = 77 % ≥ 70 % → findings recommend chartering an offline alias-proposal tool; Peter rules whether Stage 2 runs |

O3 does not fire under either reading (3 structural < 4).

**Who should rule the class question: Peter, not Thurgood.** Thurgood owns both the matcher and five of the seven affected docs, so either answer from him is self-interested. Reading A shrinks the gate; reading B attributes his indexer's gap to doc metadata.

**Thurgood's recommendation, labelled as his**: reading A, with the H3 question filed as its own matcher issue and measured on the oracle plus a fresh query set (never Q2, which these results have now spent). Seven of the misses share one cause, and seeding seven aliases would paper over an indexer gap.

**Counter-argument that survives**: the matcher fix is not free (§ 6.7: −4 Q2, −1 oracle, +1 confident-wrong). Until it exists and is tuned, the only working remedy for these seven is metadata. Reading A therefore books as "not counted" misses that today's users still hit.

### 6.9 Answer-key errors and key-rule findings

- **Answer-key errors found after (2): none so far.** Owners may still raise them while ruling buckets; any raised are counted and excluded here, never edited.
- **K6 finding (not a key error)**: the 3 structural misses are exactly the 3 positives keyed under K6 (an answer that states the capability is unsupported). A "how do I do X" phrasing shares no vocabulary with a "not supported in this version" statement. Status answers are lexically unreachable by design. This is the one class where a semantic arm could plausibly help, and it is 3 queries — below the O3 bound.
- **Matcher defects for a separate Thurgood issue** (charter § 1f; not fixed here, not gate-counted). `.kiro/issues/` is outside Thurgood's write scope, so the orchestrator files it or grants the path:
  1. find_docs `sections` = H2 headings only (`DocumentIndexer.ts` maps `outline.map(s => s.heading)`; the H3 `subsections` are parsed and dropped). The rubric's high-signal field is "section headings", with no level restriction.
  2. The heading extractor is fence-unaware: `##` lines inside template code blocks are indexed as sections (completion-documentation-guide lists "Found later", "Artifacts Created", "What Was Done" …).
  3. Tokenizer asymmetry: the camelCase split turns doc text "iOS" into `i` + `os`, while a query's lowercase "ios" stays one token, so "ios" can never match "iOS". Spurious `i` / `os` hits also appear (ST-N2's top 3).

## 7. Leonardo addendum (Q2-L)

_Pending: his Settings ledger must close first._ When it does: same sealed prompt (plus one added line allowing ~15–20 queries, recorded in the raw file), his block pasted verbatim, keyed in a separate fixture, and pre-registered by its own commit (SHA recorded here). It then runs at its own SHA, with any hand-fix that landed in between listed beside it. If the addendum's gate-counted misses, added to the four-seat count, would change the § 5 outcome, this section records "outcome re-opened" (dated) and Peter rules. The runner's raw-line accounting check must then include Q2-L.

## 8. Prompt-iteration log (Stage 2 only)

_Empty. Used only if Stage 2 runs. Iterations against the calibration-only set are capped at 5, and each is logged here._
