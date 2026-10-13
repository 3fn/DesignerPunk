# Discovery Study Stage 1 (docs side) — FINDINGS

**Date**: 2026-10-12 (skeleton at pre-registration; results the same day)
**Charter**: `.kiro/issues/2026-10-12-discovery-study-stage1-docs-charter.md`; design record `.kiro/issues/2026-10-07-discovery-shadow-study-charter.md`
**Owner**: Thurgood. **Independent check of the miss table and of commit order**: orchestrator (Thurgood's declared conflict: he owns the docs rubric a null result vindicates).
**Status**: **STAGE 1 CLOSED — O1 (Peter's Reading A ruling, 2026-10-13). Stage 2 docs side: NOT RUN.** All 13 miss buckets are owner-ruled, with no key errors (§ 6.8–6.9). Follow-ups go to their owners (§ 4, § 7). Close record: § 9.

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

## 4. Discoveries — ROUTED, not fixed (no corpus edit in the study PR, charter § 3)

Each item goes out as an explicit message to the named owner(s) once this PR merges. Nothing below has been fixed.

| # | Discovery | Evidence | Route (Civitas resolution path) | Owner(s) |
|---|---|---|---|---|
| D-1 | **Cross-domain contradiction on `.dp`** (DA-01, dropped K5c) | `rosetta-system-architecture` § "Token Consumption Rule": tokens are pre-unitized (Android `Dp`) and `.dp` is never appended. `platform-implementation-guidelines` § "Android Token Usage: The `.dp` Pattern": `DesignTokens` values are `Float`, and `.dp` is required for an explicitly typed `Dp`. A `component-development-guide` example (`spaceInsetNormal.dp`, ~L626/L964) belongs in the same read. | Cross-domain: Thurgood flags; both owners review; Peter arbitrates if they disagree. | **Ada + Lina** |
| D-2 | **Product-token guidance duplicated across two docs** (SP-02, SP-03, dropped K5a) | `web-authoring-standards` § "Product Token Authoring (Sparky)" (Naming Schema, Canonical Categories, Authoring Rules) and `product-token-governance` (Naming Conventions, Authoring Workflow, Value Governance) both carry substantive rules. WAS says "For full governance: See Product-Token-Governance.md". | Content consistency is the steward's to flag and route. The docs' domain owners judge whether this is intentional web-specific abstraction or drift; Thurgood does not resolve it. | **Thurgood** (owns the item; CONFIRMED) → the two docs' domain owners adjudicate |
| D-3 | **Unanswered question plus a routing-cue mismatch: "where do product-screen files live?"** (SP-09, KE-09, DA-10; keyed strict-none) | Three seats independently asked; no served doc answers. Each seat's charter routes "file-organization rules" to `process-file-organization`, which covers this repo's metadata-driven layout. The run put that doc at rank 1 (`partial`) for SP-09 and DA-10. | (a) The doc gap goes to the consumer front door. (b) The cue wording lives in agent charters (`canonical/agents/**`, governance law) and changes only by ballot. | **Leonardo** for (a) (CONFIRMED: the consumer front door); **Thurgood** drafts the ballot for (b), Peter ratifies |
| D-4 | **Known index defect touching a key** (ST-05) | ST-05's answer is an H4 heading; H4 is not indexed. ST-05 still PASSED (rank 1 via the doc's other headings). | Folded into the indexer issue (§ 6.9). | Thurgood |
| D-5 | **Content debt: Android "role heading"** (raised by Lina while ruling DA-11) | `semantics { heading() }` is documented nowhere in the served corpus. | Owner's content-debt queue. | **Lina** |

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

### 6.6 Miss table: 13 positives failing A's own rule. Buckets FINAL (each owner ruled, 2026-10-13; every ruling agreed with the proposal; rulings in § 6.9)

Evidence comes from the exploratory analysis in § 6.7: whether the key ranks ≤ 2 when its answering heading is indexed, or when one alias taken verbatim from the doc's own text (never from the query) is added.

| Id | Rank / tier | Key doc | Cause found | Bucket (proposed = ruled) | Owner (ruled) |
|---|---|---|---|---|---|
| SP-08 | 3 / partial | completion-documentation-guide | Answer is an **H3** ("The subtask completion doc …"); find_docs indexes H2 only | matcher/index defect (also heading-alias-fixable: → 1) | Thurgood (ruled) |
| DA-09 | 3 / partial | completion-documentation-guide | same H3 | matcher/index defect (heading-alias → 1) | Thurgood (ruled) |
| ST-04 | 3 / partial | completion-documentation-guide | same H3 | matcher/index defect (heading-alias → 1) | Thurgood (ruled) |
| ST-02 | 3 / partial | completion-documentation-guide | Answer is an H3 ("The delegated-tier line — unconditional") | matcher/index defect (heading-alias → 1) | Thurgood (ruled) |
| ST-09 | absent | completion-documentation-guide | Answer is an H3 ("CI provenance — …"); no query token in any indexed field | matcher/index defect (heading-alias → 1, strong) | Thurgood (ruled) |
| DA-07 | 6 / partial | product-handoff-protocol | Answer is an H3 ("Tier 2: Implementation Reports"); generic "format / tier / 2" strongs outrank it | matcher/index defect (heading-alias → 2) | Leonardo (ruled) |
| KE-10 | absent | designerpunk-integration-guide | Two matcher causes (Leonardo's correction): the generate half of the answer is an **H3** ("6. Generate Tokens"), and the iOS half is an **H4** ("iOS and Android (not supported for onboarding in 15.0.0)"), so an H2+H3 fix still drops it. Separately, query "ios" can never match doc "iOS" (tokenizer, § 6.9) | matcher/index defect (the "Generate Tokens" alias would also fix it, but would cover a matcher fault — not booked as metadata) | Leonardo (ruled) |
| DA-02 | 24 / partial | component-development-guide | Query vocabulary (theme-varying, composable) reaches only the body; the H3 heading alone does not fix it (→ 24) | **alias/metadata-fixable** (content alias "Theme-varying tokens — read from CompositionLocal" → 1, strong) | Lina (ruled) |
| DA-11 | absent | platform-implementation-guidelines | TalkBack / contentDescription sit only in YAML body blocks; headings do not fix it | **alias/metadata-fixable**. The content alias Thurgood tested → 1; Lina's chosen alias, "TalkBack semantics", is UNTESTED (§ 7) | Lina (ruled) |
| DA-05 | 3 / partial | test-development-standards | TDS matches 2 tokens (`partial`); test-behavioral-contract-validation and product-token-governance match 3 (`strong`). No answering sub-heading to test | **alias/metadata-fixable (unverified)** | Thurgood (ruled) |
| KE-N1 | 7 / partial | designerpunk-integration-guide | K6 key: the answer is a status statement; no query token (xcodebuild, simulator, runbook) appears in the doc; heading and sentence aliases fail (→ 7) | **structural** | Leonardo (ruled) |
| DA-N1 | absent | designerpunk-integration-guide | K6 key, as KE-N1. "Gradle module path" IS in the guide's body (§ "Native Platform Sync — Target Model (M0b)"), but body text is not indexed by design (P3), so this is not a defect; the aliases tested fail (→ 24) | **structural** | Leonardo (ruled) |
| ST-N2 | absent | completion-documentation-guide | K6 key: the answer is "The instrument's honest reach"; heading and sentence aliases fail | **structural** | Thurgood (ruled) |

**Thurgood ruled on 7 of the 13 misses and also owns the matcher. That is the declared conflict: the orchestrator checked this table, and Peter ruled the class question (§ 6.8).**

### 6.7 Exploratory analysis — NOT pre-registered; run after the results, in scratch; nothing fed back into keys or fixtures

- **H3 counterfactual** (find_docs `sections` = H2 + H3, everything else unchanged):
  - **Q2 positives**: 23/36 → 27/36. Gained SP-08, KE-10, KE-N1, DA-07, DA-09, ST-02, ST-04, ST-09. Lost SP-05, KE-03, KE-06, DA-06, because more headings dilute the ranking.
  - **Oracle**: 83/83 → 82/83 ("base variant inheritance patterns" 1 → 12).
  - **Negatives**: confident-wrong 2 → 3 (DA-10 gains a `strong`).
  - **KE-N1's counterfactual win is spurious**: it matched "UI Tree Convention", not the answer.
  - **Conclusion**: the H3 omission is a real cause, but indexing H3 at full high-signal weight is NOT a free fix. It is a matcher design question with its own tuning.
- **Alias-fixability test**: one alias per miss, taken verbatim from the answering doc's own heading or sentence.
  - Fixes 9: SP-08, KE-10, DA-02, DA-07, DA-09, DA-11, ST-02, ST-04, ST-09. *(Post-ruling notes: for DA-11 this was Thurgood's alias, not the one Lina chose. For KE-10, Leonardo ruled the alias would cover a matcher fault.)*
  - Fails 3: KE-N1, DA-N1, ST-N2.
  - Untested 1: DA-05.

### 6.8 Volume gate and outcome — **FINAL**

**Ruling (Peter, 2026-10-13): Reading A, by cause, with the filed indexer issue as the fix path (the class option).** Record: study charter § 6 "STAGE 1 OUTCOME" and `.kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md`, both carried by PR #314 (trigger FIRED by this ruling).

| Bucket (owner-ruled) | Count | Ids | Gate-counted? |
|---|---|---|---|
| Matcher/index defect | **7** | SP-08, DA-09, ST-02, ST-04, ST-09, DA-07, KE-10 | no (charter § 1f) — fix path: the indexer issue, landing AFTER this PR |
| Alias/metadata-fixable | **3** | DA-02, DA-11, DA-05 | yes |
| Structural | **3** | KE-N1, DA-N1, ST-N2 | yes |
| **Gate-counted** | **6** | | > 3, so the gate does not stop the study; **O1 fires** (≤ 3 structural AND ≤ 8 fixable) |

- **Outcome: O1** — hand-fix the 3 fixable misses through their owners (§ 7), record findings, close.
- **Stage 2 on the docs side is CLOSED: NOT RUN.** O2 and O3 do not fire.
- The components half of the Stage 2 question stays with Leonardo's Settings ledger (study charter, D2) and is not decided here.
- **The surviving counter-argument, kept on record:** the indexer fix is not free (§ 6.7: −4 Q2, −1 oracle, +1 confident-wrong). Until it lands and is tuned, users still hit the 7 misses this outcome does not count. The indexer issue owns that risk, and its fix must be measured on the oracle plus a fresh query set, never on Q2.

### 6.9 Owner rulings, answer-key errors, key-rule findings

**Owner bucket rulings (2026-10-13, relayed by the orchestrator; all agree with the proposals; no key errors raised):**
- **Lina**
  - **DA-02**: alias-fixable; accepts the alias "Theme-varying tokens — read from CompositionLocal" (verbatim, `component-development-guide` L997); key correct. *Note*: for a product consumer, `designerpunk-integration-guide` L386 adds that 15.0.0 does not emit `LocalDPTheme` for consumers, so an acceptable set of both docs would have been the better key. It stays as frozen (keys are never edited after (2)).
  - **DA-11**: alias-fixable; **her alias is "TalkBack semantics"** (from the doc's own § 4 table). That differs from the alias Thurgood tested, so it is **UNTESTED** and is not counted as a verified fix until a re-run (§ 7, not in this PR). Key defensible. "role heading" (`semantics { heading() }`) is documented nowhere; that is content debt Lina owns, not a key error (§ 4 D-5).
- **Leonardo**
  - **KE-10**: tokenizer/rank defect with two causes: the H3 drop, and "ios" can never match "iOS". The "Generate Tokens" alias would also fix it but would cover a matcher fault, so it is not booked as metadata. **Correction to § 6.6** (applied there): the iOS half of the answer is an **H4**, so an H2+H3 fix still drops it. Key correct.
  - **KE-N1**: structural; key correct (strict-none would leave the consumer guessing).
  - **DA-N1**: structural under current design. "Gradle module path" is in the guide's body (§ "Native Platform Sync — Target Model (M0b)"); body text is not indexed by design (P3), so this is not a defect. Key correct.
  - **DA-07**: tokenizer/rank defect; the answer is the H3 "Tier 2: Implementation Reports" (`Product-Handoff-Protocol.md` L64). Key correct.
- **Thurgood**: SP-08, DA-09, ST-02, ST-04, ST-09 are matcher defects; DA-05 is alias-fixable (unverified); ST-N2 is structural. All stand as proposed. The declared conflict was checked by the orchestrator, and the class question was ruled by Peter.

**Answer-key errors found after (2): none.**

**K6 finding (not a key error)**: the 3 structural misses are exactly the 3 positives keyed under K6. A "how do I do X" phrasing shares no vocabulary with a "not supported in this version" statement. This is the one class a semantic arm could plausibly reach, and at 3 queries it is below the O3 bound.

**Matcher defects → `.kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md`** (Thurgood owner; filed in PR #314). The fixing PR needs a grant for `mcp-server/src/**` and lands after this study PR.
  1. find_docs `sections` = H2 headings only (`DocumentIndexer.ts` `outline.map(s => s.heading)`; the H3 subsections are parsed and dropped). H4 is not parsed at all (the existing H4 issue), which is why KE-10's iOS half stays unreachable even after an H3 fix.
  2. The heading extractor is fence-unaware: `##` lines inside template code blocks are indexed as sections.
  3. Tokenizer asymmetry: doc text "iOS" becomes `i` + `os`, while a query's lowercase "ios" stays one token.

## 7. After close: the O1 hand-fixes and the Leonardo addendum

**O1 hand-fixes.** Each doc's owner makes the fix in a follow-up PR, never in this one. Aliases live in `governance/**` frontmatter, so each lands as a Peter-approved PR under the ballot-measure model. Once landed, the fixed Q2 items are spent as evaluation data (charter § 3).

| Id | Doc | Owner | Alias | Verified? |
|---|---|---|---|---|
| DA-02 | `component-development-guide` | Lina | "Theme-varying tokens — read from CompositionLocal" (accepted) | yes: tested at → 1 / strong (§ 6.7) |
| DA-11 | `platform-implementation-guidelines` | Lina | "TalkBack semantics" (her choice) | **NO: re-run owed** before it counts as a verified fix |
| DA-05 | `test-development-standards` | Thurgood | not yet chosen | **NO: re-run owed** |

The re-runs use the Stage 1 runner at the fixing PR's head, are reported in that PR, and change nothing in this findings doc's frozen results.

**Leonardo addendum (Q2-L): still pending; his Settings ledger must close first.** When it does: the same sealed prompt (plus one added line allowing ~15–20 queries, recorded in the raw file), his block pasted verbatim, keyed in a separate fixture, and pre-registered by its own commit (SHA recorded here). It then runs at its own SHA, with any hand-fix or indexer fix that landed in between listed beside it. If the addendum's gate-counted misses, added to the four-seat count of 6, would change the § 5 outcome, this section records "outcome re-opened" (dated) and Peter rules. The runner's raw-line accounting check must then include Q2-L.

## 8. Prompt-iteration log (Stage 2 only)

_Empty. Used only if Stage 2 runs. Iterations against the calibration-only set are capped at 5, and each is logged here._

## 9. Stage 1 CLOSE

**Closed 2026-10-13 — O1 (Peter's Reading A ruling). Stage 2 docs side: NOT RUN, O1.** SHAs on `chore/discovery-study-stage1`: (1) raw queries `5f8b668b5`; (2) pre-registration `08fed8984`; (3) results `d94adb623`; (4) the commit carrying this line (final owner rulings and close). Still open after close: the 3 hand-fixes (§ 7; two re-runs owed), the indexer issue (§ 6.9), the routed discoveries D-1–D-5 (§ 4), and Leonardo's Q2-L addendum (§ 7).

## 10. Addendum (2026-10-13) — DA-05 is an answer-key error

**Recorded under the indexer-fix grant (#322), which allows this addendum only. Nothing above is edited; the frozen results stand as recorded.**

- **Finding**: while preparing the O1 hand-fix for DA-05 (follow-ups record row 3), Thurgood tested aliases in scratch.
  - The only alias drawn from `test-development-standards`' own text that lifted DA-05 (L1192, "Validates structure, naming, and configuration at development time", 3/partial → 1/strong, no new confident-wrong) describes what LINTING checks.
  - The doc states no screen-test file-structure or naming convention. The alias would have planted a `strong` on a doc that does not answer, which is the KE-N2 harm aimed at a positive.
  - **No-go on the alias.** DA-05's key should have been dropped under K5b (partial coverage: the doc answers test CATEGORIES, not structure or naming). Ruled with the orchestrator, 2026-10-13; recorded in `.kiro/issues/2026-10-13-discovery-study-stage1-followups.md` row 3 (#320).
- **Effect on the Stage 1 outcome**: DA-05 is counted as an answer-key error and **excluded** (charter § 2: never edited).
  - Final buckets become 7 matcher defects / **2** alias-fixable (DA-02, DA-11) / 3 structural.
  - **Gate-counted 6 → 5**, still > 3; O1's conditions (≤ 3 structural AND ≤ 8 fixable) still hold. **Outcome unchanged: O1.**
- **Applied forward**: the indexer fix's fresh set drops the four screen-test structure/naming queries under K5b for the same reason (fresh fixture, FSP-05 / FKE-04 / FDA-06 / FST-10).
- **Routed content gap**: screen-test file structure and naming are undocumented, and three seats asked in each set. Owner: Thurgood, as `test-development-standards`' content. It is fixed by writing the content, not by an alias.
