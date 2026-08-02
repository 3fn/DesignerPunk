# Findings: Before/After Measurement Case Study (119-B Task 3, U2)

**Date**: 2026-08-02 (all "current" figures measured this date — D1)
**Spec**: 119-B — Capability Catalog, Routing & Measurement
**Requirement**: R3 (all ACs), R11 AC2–AC3 · **Design**: Component 5, Decision 4
**Status**: COMPLETE — read-only measurement; zero corpus writes, zero fixture edits

---

## 1. Method + anchor provenance

**Harness**: `scripts/discovery-dry-run.ts` → `mcp-server/src/discovery-dry-run/discovery-dry-run.ts` (`runDiscoveryDryRun`, point label `no-regression`), which builds its own `DocumentIndexer` over `governance/` and calls the SAME `findDocsConcept` the live `find_docs` tool uses — real discovery, not a stand-in. Scoring per Decision 4 as retained by 119-B Task 2: PASS = correct doc at rank ≤ 2 AND matchConfidence ∈ {strong, partial}; `clearsThreshold` = no WEAK/MISS; rank-1-strong rate reported as SIGNAL.

**Anchor**: the frozen oracle `scripts/__fixtures__/discovery-oracle.ts` (83 concepts: 69 axis-a map concepts + 14 axis-b agent-domain queries), captured 2026-06-29 from the meta-guide's Tier-2 map before its removal, human-validated and stale-stripped (strip log in the fixture header). **The oracle was READ, never edited, never re-wired (R3 AC3)** — the frozen-fixture warning stands: it is a point-in-time answer key and must NEVER become a navigational doc (that would re-create the Documentation Directory drift surface 119-A removed).

**Coverage boundary (whose discovery surfaces the oracle exercises — do not over-read the headline):**
- **Axis (a)**: the meta-guide's map concepts — the "When to Load" phrasing an agent searches by. This exercises concept→doc discovery over the governance corpus generally.
- **Axis (b)**: agent-domain queries for **ada / lina / thurgood / leonardo ONLY** (4/4/4/2 entries). Product-agent-shaped queries are limited to Leonardo's two entries; **Sparky-, Kenya-, Data-, and Stacy-shaped discovery is NOT exercised by this fixture.** The headline numbers say nothing about those surfaces. Report-the-boundary, never extend-the-fixture.

**Corpus at measurement**: 83 MCP-served governance docs (2026-08-02; was 80 at the 2026-06-29 anchor runs — the corpus grew by 3 docs in the interval, including the 125-B register's arrival as indexed content).

## 2. Before/after per oracle axis

**"Before" data grain, stated honestly**: 119-A recorded *aggregates* plus *exception lists* (the floor's 21 weakOrMiss, lift's 4 residual WEAK), not full per-entry tables. Per-entry "before" values below are therefore stated only where 119-A recorded them; the aggregate anchors carry the rest of the before state.

### Aggregate before → after

| Point | Date | PASS / WEAK / MISS | clearsThreshold | rank-1-strong |
|---|---|---|---|---|
| Floor (pre-aliases, 10.3) | 2026-06-29 | 62 / 18 / 3 | false | 54.2% (45/83) |
| Lift (post-aliases, 10.4 pre-tie-breaker) | 2026-06-29 | 79 / 4 / 0 | false | 69.9% (58/83) |
| Tie-breaker (10.4 final) | 2026-06-29 | 83 / 0 / 0 | true | 94.0% (78/83) |
| No-regression (10.6, post-meta-guide-removal) | 2026-06-29 | 83 / 0 / 0 | true | 94.0% (78/83) |
| **Current (this study)** | **2026-08-02** | **83 / 0 / 0** | **true** | **93.98% (78/83)** |

**Delta current vs the 94% anchor: ZERO** — identical aggregates (78 rank-1-strong, 5 rank-2, all 83 at `strong` confidence, no WEAK/MISS). Per R3 AC4's sequencing rationale, any delta would have been attributable to corpus changes since 10.4; the measured result is that five weeks of corpus evolution (80 → 83 docs, including the classification-map's growth to 11 entries) produced **no attributable drift on the oracle's surfaces**. The 119-A-attributable state persists intact.

**Known per-entry movements vs recorded before-values**: the four lift-WEAK concepts (`color token work`, `shadow token work`, `opacity token work` — strong-at-rank-3–4 before the tie-breaker) now sit at **rank 1 strong**; `cross-platform implementation patterns` at **rank 2 strong**. The three floor-MISS concepts (`dark mode theme overrides`, `modular scale mathematical foundation`, `focus management keyboard navigation`) all sit at **rank 1 strong**.

### Axis (a) — map concepts (69), current per-entry (2026-08-02)

| concept | expected id(s) | matched id | rank | confidence | class |
|---|---|---|---|---|---|
| spec planning standards | process-spec-planning | process-spec-planning | 1 | strong | PASS |
| task type classification validation tiers | process-task-type-definitions | process-task-type-definitions | 2 | strong | PASS |
| cross-reference standards | process-cross-reference-standards | process-cross-reference-standards | 1 | strong | PASS |
| hook operations automation troubleshooting | process-hook-operations | process-hook-operations | 1 | strong | PASS |
| cross-spec integration dependency management | integration-methodology | integration-methodology | 1 | strong | PASS |
| completion documentation two-document workflow | completion-documentation-guide | completion-documentation-guide | 1 | strong | PASS |
| release management pipeline | release-management-system | release-management-system | 1 | strong | PASS |
| product handoff protocol | product-handoff-protocol | product-handoff-protocol | 1 | strong | PASS |
| token governance selection usage creation | token-governance | token-governance | 1 | strong | PASS |
| token quick reference common patterns | token-quick-reference | token-quick-reference | 1 | strong | PASS |
| semantic token architecture mode keys | token-semantic-structure | token-semantic-structure | 1 | strong | PASS |
| token resolution alias chains | token-resolution-patterns | token-resolution-patterns | 1 | strong | PASS |
| token pipeline architecture subsystem entry points | rosetta-system-architecture | rosetta-system-architecture | 1 | strong | PASS |
| rosetta system principles | rosetta-system-principles | rosetta-system-principles | 1 | strong | PASS |
| color token work | token-family-color | token-family-color | 1 | strong | PASS |
| typography token work | token-family-typography | token-family-typography | 1 | strong | PASS |
| spacing token work | token-family-spacing | token-family-spacing | 1 | strong | PASS |
| shadow token work | token-family-shadow | token-family-shadow | 1 | strong | PASS |
| motion easing token work | token-family-motion | token-family-motion | 1 | strong | PASS |
| border token work | token-family-border | token-family-border | 1 | strong | PASS |
| radius token work | token-family-radius | token-family-radius | 1 | strong | PASS |
| opacity token work | token-family-opacity | token-family-opacity | 1 | strong | PASS |
| blend token work | token-family-blend | token-family-blend | 1 | strong | PASS |
| glow token work | token-family-glow | token-family-glow | 1 | strong | PASS |
| layering z-index token work | token-family-layering | token-family-layering | 1 | strong | PASS |
| responsive token work | token-family-responsive | token-family-responsive | 1 | strong | PASS |
| accessibility token work | token-family-accessibility | token-family-accessibility | 1 | strong | PASS |
| building modifying components | component-development-guide | component-development-guide | 2 | strong | PASS |
| component coding standards | component-development-standards | component-development-standards | 2 | strong | PASS |
| component selection ui compositions | component-quick-reference | component-quick-reference | 1 | strong | PASS |
| base variant inheritance patterns | component-inheritance-structures | component-inheritance-structures | 1 | strong | PASS |
| component schema authoring validation | component-schema-format | component-schema-format | 1 | strong | PASS |
| component scaffolding templates | component-family-templates | component-family-templates | 1 | strong | PASS |
| component-meta.yaml governance | component-meta-data-shapes-governance | component-meta-data-shapes-governance | 1 | strong | PASS |
| primitive vs semantic component decisions | primitive-vs-semantic-usage-philosophy | primitive-vs-semantic-usage-philosophy | 1 | strong | PASS |
| component readiness maturity tracking | component-readiness-status | component-readiness-status | 1 | strong | PASS |
| mcp document template for components | mcp-component-family-document-template | mcp-component-family-document-template | 1 | strong | PASS |
| behavioral contracts concept catalog | contract-system-reference | contract-system-reference | 1 | strong | PASS |
| contract validation patterns | test-behavioral-contract-validation | test-behavioral-contract-validation | 1 | strong | PASS |
| stemma system principles | stemma-system-principles | stemma-system-principles | 1 | strong | PASS |
| cross-platform implementation patterns | platform-implementation-guidelines | platform-implementation-guidelines | 2 | strong | PASS |
| platform-specific vs shared decisions | cross-platform-vs-platform-specific-decision-framework | cross-platform-vs-platform-specific-decision-framework | 1 | strong | PASS |
| button family work | component-family-button | component-family-button | 1 | strong | PASS |
| form input family work | component-family-form-inputs | component-family-form-inputs | 1 | strong | PASS |
| navigation family work | component-family-navigation | component-family-navigation | 1 | strong | PASS |
| icon family work | component-family-icon | component-family-icon | 1 | strong | PASS |
| container family work | component-family-container | component-family-container | 1 | strong | PASS |
| progress family work | progress-indicator-components | progress-indicator-components | 2 | strong | PASS |
| chip family work | component-family-chip | component-family-chip | 1 | strong | PASS |
| badge family work | component-family-badge | component-family-badge | 1 | strong | PASS |
| avatar family work | component-family-avatar | component-family-avatar | 1 | strong | PASS |
| divider family work | component-family-divider | component-family-divider | 1 | strong | PASS |
| loading family work | component-family-loading | component-family-loading | 1 | strong | PASS |
| modal family work | component-family-modal | component-family-modal | 1 | strong | PASS |
| data display family work | component-family-data-display | component-family-data-display | 1 | strong | PASS |
| screen specification layout template responsive layout | layout-specification-vocabulary | layout-specification-vocabulary | 1 | strong | PASS |
| dtcg format tool integrations | dtcg-integration-guide | dtcg-integration-guide | 1 | strong | PASS |
| figma integration token push design extraction | figma-workflow-guide | figma-workflow-guide | 1 | strong | PASS |
| custom token transformers | transformer-development-guide | transformer-development-guide | 1 | strong | PASS |
| programmatic dtcg token consumption | mcp-integration-guide | mcp-integration-guide | 1 | strong | PASS |
| browser loading web component distribution | browser-distribution-guide | browser-distribution-guide | 1 | strong | PASS |
| build system configuration | build-system-setup | build-system-setup | 1 | strong | PASS |
| writing tests test patterns stemma validators | test-development-standards | test-development-standards | 1 | strong | PASS |
| test failure audit clean exit performance investigation | test-failure-audit-methodology | test-failure-audit-methodology | 1 | strong | PASS |
| designerpunk vision context | a-vision-of-the-future | a-vision-of-the-future | 1 | strong | PASS |
| detailed collaboration protocols validation gates | ai-collaboration-framework | ai-collaboration-framework | 1 | strong | PASS |
| known mcp gaps trigger conditions | mcp-evolution-roadmap | mcp-evolution-roadmap | 1 | strong | PASS |
| technology choices platform decisions | technology-stack | technology-stack | 1 | strong | PASS |
| three-mcp boundaries information flow access model | mcp-relationship-model | mcp-relationship-model | 1 | strong | PASS |

### Axis (b) — agent-domain queries (14), current per-entry (2026-08-02)

| concept | expected id(s) | matched id | rank | confidence | class |
|---|---|---|---|---|---|
| how do i pick the right token (ada) | token-governance | token-governance | 1 | strong | PASS |
| dark mode theme overrides (ada) | token-semantic-structure | token-semantic-structure | 1 | strong | PASS |
| modular scale mathematical foundation (ada) | rosetta-system-architecture | rosetta-system-architecture | 1 | strong | PASS |
| color contrast accessibility ratio (ada) | token-family-accessibility, token-family-color | token-family-color | 1 | strong | PASS |
| focus management keyboard navigation (lina) | test-behavioral-contract-validation, component-development-guide | component-development-guide | 1 | strong | PASS |
| how do i scaffold a new component (lina) | component-development-guide, component-family-templates | component-development-guide | 1 | strong | PASS |
| web component shadow dom authoring (lina) | web-authoring-standards | web-authoring-standards | 1 | strong | PASS |
| true native architecture platform separation (lina) | platform-implementation-guidelines | platform-implementation-guidelines | 1 | strong | PASS |
| how to write a spec requirements ears (thurgood) | process-spec-planning | process-spec-planning | 1 | strong | PASS |
| test coverage audit methodology (thurgood) | test-failure-audit-methodology | test-failure-audit-methodology | 1 | strong | PASS |
| steering doc metadata validation governance (thurgood) | process-file-organization | process-file-organization | 1 | strong | PASS |
| module resolution contract runtime ts loading (thurgood) | rosetta-system-architecture | rosetta-system-architecture | 1 | strong | PASS |
| responsive layout screen specification (leonardo) | layout-specification-vocabulary | layout-specification-vocabulary | 1 | strong | PASS |
| system architecture overview rosetta stemma civitas (leonardo) | mcp-relationship-model | mcp-relationship-model | 1 | strong | PASS |

## 3. The IN-1 attribution ladder (per-step evidence)

Honest attribution per R3 AC2 — **the 94% figure is NOT attributable to aliases alone**; each step's contribution is separately evidenced:

| Step | Mechanism | Evidence | Aggregate after step |
|---|---|---|---|
| 1. Floor | Corpus as relocated, pre-alias-seeding | 10.3 run (2026-06-29) | 62/18/3; **54.2%** rank-1-strong |
| 2. Alias lift | Task 8.4 uniform family-alias seeding against the 21-concept floor worklist | 10.4 lift run: all 3 MISS → PASS, 17/18 WEAK → PASS, no regressions | 79/4/0; 69.9% |
| 3. Title tie-breaker | Layer-3 RANK-only `TITLE_RANK_TIEBREAK = 0.5` (Peter-approved), fixing the 4 strong-but-rank-3–4 residuals; `matchConfidence` untouched | 10.4 final run: 4 WEAK → PASS; broad improvement (69.9% → 94.0%, not overfit to the 4) | 83/0/0; **94.0%** — the 94% *includes* the tie-breaker (R3 AC2) |
| 4. Meta-guide removal | 10.5 removal; meta-guide was never in the served index | 10.6 no-regression run: identical to step 3 | 83/0/0; 94.0% |
| 5. **Current (this study)** | Five weeks of corpus evolution (80 → 83 docs; 119-B register row landed) | This run, 2026-08-02: identical aggregates; per-entry diffs vs recorded exceptions all favorable-or-equal | 83/0/0; **93.98%** (same 78/83; the decimal difference is rounding of the identical fraction) |

Attribution statement: the current state is **wholly attributable to 119-A's work** (floor → aliases → tie-breaker). 119-B-era corpus changes to date produced zero measurable movement on the oracle's surfaces — the clean baseline R3 AC4 sequenced this study to capture is captured.

## 4. Register-row shadowing check (Decision 4 mitigation; R11 AC2 rider)

**Pre-measurement note (R11 AC2)**: the `certainty-calibration` register row landed BEFORE this measurement (U1, PR #96, merged + ratified 2026-08-02) under the ratified ordering exception — the oracle has no concept targeting the classification map. This section records the required check that the row did not indirectly contaminate measurement via keyword shadowing.

**(i) Token enumeration** — the row's text tokens vs all 83 oracle concept strings (mechanical tokenization, stopworded, tokens > 2 chars): **33 concepts share ≥ 1 generic token** with the row text. Shared vocabulary (with concept counts): governance ×3, spec ×3, mcp ×3, test ×3, reference ×2, mode ×2, principles ×2, components ×2, contract ×2, and singletons (task, classification, hook, completion, protocol, entry, templates, yaml, implementation, specific, tool, design, collaboration, trigger, three, new). All are corpus-generic words; none is a distinctive oracle-concept term.

**(ii) Threshold check** — does any oracle query's result set rank `classification-map` above the WEAK threshold (i.e., into the rank ≤ 2 PASS band)? **NO — verified.** `classification-map` appears anywhere in only 10 of 83 result sets; its best appearance is **rank 6** (`component-meta.yaml governance`, strong — driven by the pre-existing "governance" vocabulary) and rank 10 (`task type classification validation tiers`, partial); the other 8 appearances sit at ranks 31–61 at partial. Zero appearances at rank ≤ 2; zero expected docs displaced (83/83 PASS is itself the no-displacement proof).

**(iii) Counterfactual (strengthening, beyond the required check)** — the full dry-run was re-run against a scratch copy of the corpus containing the PRE-ROW classification-map (git state `086bc72a`, before PR #96): **zero per-entry differences** in rank, confidence, or classification across all 83 concepts (row-present vs row-absent). The row's landing changed *nothing* in any oracle query's scoring.

**Result: NULL — VERIFIED, not assumed** (expected null confirmed). Attribution stays honest: the pre-measurement row landing did not contaminate the baseline.

## 5. OB-4 input section (feeds the Task 2 threshold decision — Decision 5 revisit path)

Measured rank distribution (2026-08-02): **rank 1 × 78, rank 2 × 5, rank > 2 × 0, MISS × 0; all 83 at `strong` confidence.**

- **Concepts strong-but-rank>2: ZERO.** The distribution that would pressure the rank ≤ 2 bound (a strong-at-rank-3+ tail, the Task 2 counter-argument's scenario) does not exist in the current corpus.
- **Verdict against Task 2's decision (KEEP rank ≤ 2 at ≥ partial): the measured distribution AGREES.** No contradiction → **no recorded amendment is triggered, and the R2 AC3 harness-assertion step stays dormant** (gate assertion `PASS_RANK_BOUND = 2` remains correct and untouched).
- The five rank-2 concepts (`task type classification validation tiers`, `building modifying components`, `component coding standards`, `cross-platform implementation patterns`, `progress family work`) all PASS at strong; they are headroom inside the gate, not pressure on it.

## D1 ledger (measurement currency)

All current figures measured 2026-08-02 by this study's runs; prior figures dated 2026-06-29 from `119-A .../completion/task-10-parent-completion.md`. Re-measured values (prior → current): oracle concepts 83 → 83 (fixture frozen); PASS/WEAK/MISS 83/0/0 → 83/0/0; rank-1-strong 78/83 → 78/83; corpus docs 80 → 83. The oracle fixture was not edited (R3 AC3); byte-identical check: no diff to `scripts/__fixtures__/discovery-oracle.ts` in this unit's branch.
