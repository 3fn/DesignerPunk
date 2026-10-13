# Discovery Study Stage 1 (docs side) — FINDINGS

**Date**: 2026-10-12 (skeleton, written at pre-registration)
**Charter**: `.kiro/issues/2026-10-12-discovery-study-stage1-docs-charter.md`; design record `.kiro/issues/2026-10-07-discovery-shadow-study-charter.md`
**Owner**: Thurgood. **Independent check of the miss table and of commit order**: orchestrator (Thurgood's declared conflict: he owns the docs rubric a null result vindicates).
**Status**: **SKELETON — PRE-REGISTRATION.** No result has been produced. Results are written into this file in commit (3), after the pre-registration commit (2).

---

## 1. Pre-registration record

| Item | Value |
|---|---|
| Commit (1): raw seat queries + sealed prompt | `5f8b668b5` (branch `chore/discovery-study-stage1`) |
| Commit (2): pre-registration (calibration set, Q2 fixture + keys, scorer wrapper + tests, runner, this skeleton) | _recorded when commit (2) is made_ |
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

## 4. Discoveries made while keying — to route AFTER the results commit (no corpus edit in the study PR, charter § 3)

1. **Cross-domain contradiction (Ada / Lina)** — DA-01. `rosetta-system-architecture` § "Token Consumption Rule" says tokens are pre-unitized `Dp` and `.dp` is never appended. `platform-implementation-guidelines` § "Android Token Usage: The `.dp` Pattern" says `DesignTokens` values are `Float` and `.dp` is required for an explicitly typed `Dp`. Thurgood flags it; both owners review; Peter arbitrates if they disagree.
2. **Duplicated product-token guidance** — SP-02, SP-03. `web-authoring-standards` § "Product Token Authoring (Sparky)" and `product-token-governance` both carry substantive authoring and naming rules. This is flagged for the owners to judge whether it is intentional web-specific abstraction or drift.
3. **Documentation gap plus a routing-cue mismatch** — SP-09, KE-09, DA-10. Three seats independently asked where product-screen source and tests live in a consumer repo. No served doc answers it, and each seat's charter routes "file-organization rules" to `process-file-organization`, which covers this repo's metadata-driven layout. Routing cues live in agent charters (`canonical/agents/**`), which change only by ballot.
4. **Known index defect touching a key** — ST-05's answer section is an H4 heading, and the docs index does not index H4 (`.kiro/issues/2026-10-12-docs-mcp-does-not-index-h4.md`).

## 5. Commands

```bash
npx tsx scripts/discovery-study-stage1.ts --verify-only   # integrity only; scores nothing
npx tsx scripts/discovery-study-stage1.ts                 # the run (arm A), at commit (2)
cd mcp-server && npx jest src/discovery-dry-run           # scorer tests (not in root npm test)
```

## 6. Results (commit (3))

_Not yet run._ To be recorded here:
- **Q1 oracle (regression only):** PASS / WEAK / MISS and rank-1-strong vs the 83/0/0, 77/83 baseline.
- **Q2 positives:** n / R@1 / R@2 / tiered PASS, in total, per seat, by `intentMode`, and by `cueExposed`.
- **Q2 negatives:** n / correct / confident-wrong (top 3) / strong at rank 1 / strong in top 2, plus the outcome classes.
- **Miss table.** Columns: id, rank, tier, top 3, bucket (tokenizer/rank defect | alias- or metadata-fixable | structural), the domain owner's ruling, the orchestrator's check.
- **Gate and outcome (charter § 5).** Gate-counted misses = fixable + structural, with the stratum split beside each count.
- **Answer-key errors** found after commit (2): counted and excluded, never edited.

## 7. Leonardo addendum (Q2-L)

_Pending: his Settings ledger must close first._ When it does: same sealed prompt (plus one added line allowing ~15–20 queries, recorded in the raw file), his block pasted verbatim, keyed in a separate fixture, and pre-registered by its own commit (SHA recorded here). It then runs at its own SHA, with any hand-fix that landed in between listed beside it. If the addendum's gate-counted misses, added to the four-seat count, would change the § 5 outcome, this section records "outcome re-opened" (dated) and Peter rules. The runner's raw-line accounting check must then include Q2-L.

## 8. Prompt-iteration log (Stage 2 only)

_Empty. Used only if Stage 2 runs. Iterations against the calibration-only set are capped at 5, and each is logged here._
