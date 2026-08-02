# Findings: Catalog & Routing Audit (119-B Task 8, U-final)

**Date**: 2026-08-02 (all measurements this date — D1; corpus state: post-#105 main)
**Spec**: 119-B — Capability Catalog, Routing & Measurement
**Requirements**: R6 AC1, AC5–AC6; R7 AC3, AC5–AC6 · **Design**: Components 1, 2; Decision 2
**Status**: 8.1 + 8.2 complete (dispositions DRAFTED); 8.3 owner confirmations IN PROGRESS — the `owner confirm` cells below are populated as verdicts land

---

## 0. Method + global findings (read first — per-agent sections reference these)

**Inventory method**: rows counted as `- WHEN …` lines under `## Routing` in `.claude/agents/*.md` (the generated CC tree; Kiro tree is generated from the same canonical source). Currency: every `consult <id> § "heading"` route across all 8 agents was mechanically resolve-verified (id via the live resolver chain, heading via line-match against the resolved doc): **44/44 resolve, zero stale routes** (2026-08-02).

**G1 — Shared rule-shaped Commands entries (class-fit, ALL 8 agents)**: the design flagged leonardo's rule-shaped Commands entry and thurgood's ballot-verification analog; the audit finds the pattern is **corpus-wide by construction** — two shared canonical snippets render into every agent's `## Commands`: (i) the record-first ballot-verification statement (a RULE — no invocable command), (ii) the find_docs discovery statement (a TOOL CUE — names a tool, no runnable string). Disposition: **reclassify both to the correct ambient class in canonical shared source** (one edit each, 8 rendered instances) — CONDITIONAL on the existing five-class ambient schema accepting them without new output classes (R6 AC3); if placement requires new machinery, disposition falls back to recorded-accepted-class-misfit. Owner: Thurgood (shared canonical). The **4c calibration cue is PRE-DISPOSITIONED as deliberate cue-class** (design § 4c) — entered here so the audit cannot flag the row this spec itself adds.

**G2 — Shared promotable rows**: `development workflow's detail beyond the always-loaded law` (7 agents; thurgood lacks it — see his section) and `file-organization rules` (all 8) are shared canonical rows with determinate targets. Disposition: **(b)** — `process-development-workflow` / `process-file-organization`, promoted ONCE at shared source. Owner: Thurgood (self-confirmed, recorded below).

**G3 — `target-missing-from-corpus`: ZERO instances.** The vocabulary was armed (Leonardo dR1) but every named target the audit found exists in the corpus — including the two his design-round expectation flagged as possibly missing (`product-handoff-protocol` and the integration guide, both live docs). Recorded so the empty column reads as verified-empty, not unexamined.

**G4 — Grade distribution (Decision 2 check)**: of ~60 promotable rows, **(a) is argued for exactly 2** (leonardo's Concept Catalog; data's Android-patterns addition — both artifact/platform-named headings, both mid-workflow); everything else lands (b) or (c). **Zero ATTESTATION-PENDING rows**: both (a) cases rest on the rename-resistant-heading satisfier, not owner attestation. The (b) default held under full-corpus application, consistent with all three owner pre-signals.

---

## ada — 35 rows (re-measured 2026-08-02; prior 35, 2026-07-16 scope pass § 7.2)

- Coverage gaps: none (prose sweep clean).
- Class-fit: G1 shared entries only.
- Coherence: write scope (`src/tokens|validators|generators/**` + specs) fully covered by fallback entries — COHERENT, no finding.
- Promotion table (20 candidates; criteria evidence: family rows serve token-family task class, mid-workflow at token selection/authoring — flow supports promotion; section-varies-by-task on every (b)):

| row (THEN-generic) | disposition | proposed target | criteria | owner confirm | resolve-verified |
|---|---|---|---|---|---|
| 13 × "<Family> token family's guidance" (Accessibility, Blend, Border, Color, Glow, Layering, Motion, Opacity, Radius, Responsive, Shadow, Spacing, Typography) | **(b)** | token-family-* (13 ids) | determinate doc; section varies; family docs are summary-first multi-section units | ada — pre-signal (b)-expected; **PENDING 8.3** | Task 9 (9.4) |
| Rosetta architecture beyond routed sections | (b) | rosetta-system-architecture | pair-pattern beside 2 precise rosetta rows — (b) permitted, (a) barred | ada PENDING | Task 9 |
| naming conventions / token philosophy | (b) | rosetta-system-principles | determinate; section varies | ada PENDING | Task 9 |
| token resolution patterns (context, fallbacks) | (b) | token-resolution-patterns | determinate | ada PENDING | Task 9 |
| semantic token structure guidance | (b) | token-semantic-structure | determinate | ada PENDING | Task 9 |
| token lookup patterns / mode-aware / common patterns | **(c)** | — | doc-INDETERMINATE (token-quick-reference vs token-resolution-patterns) — criterion 1 bars promotion; matches leonardo's same-shape (c) | ada PENDING | n/a |
| dev-workflow + file-org | shared → G2 | | | thurgood self | |

- Non-promotions: 6 precise § routes (already (a)); 2 agent hand-offs; 7 application-MCP tool cues (named tools, invocable — correct class); index-rebuild cues (correct).
- R7 AC2 note: Ada's module-resolution row verified resolving in this audit's 44/44 currency pass; the FORMAL re-verify (VERIFIED-UNGUARDED re-probe, result in completion doc) remains Task 9.2's.

## lina — 49 rows (prior 49)

- Coverage gaps: prose-named `component-meta-authoring-guide` + `platform-implementation-guidelines` are both covered by existing generic rows → promoted below (no additions needed).
- Class-fit: G1 only.
- Coherence: **`application-mcp-server/**` sits in write scope with NO fallback entry and NO routing row** (her own dR1-predicted finding) — disposition: OWNER RULING (add fallback entry / routing row / record-intentional). **PENDING 8.3.** `governance/component-meta-authoring-guide.md` write-scope entry is covered once its row promotes — coherent-after-promotion.
- Promotion table (27 candidates):

| row | disposition | proposed target | criteria | owner confirm | resolve-verified |
|---|---|---|---|---|---|
| 13 × "<Family> component family's guidance" | **(b)** | component-family-* / progress-indicator-components (Progress) | determinate; section varies; scaffolding Step 1 mid-workflow (her dR1 evidence convention) | lina — pre-signal (b); PENDING 8.3 | Task 9 |
| component philosophy / inheritance principles | (b) | stemma-system-principles | determinate | lina PENDING | Task 9 |
| component development standards | (b) | component-development-standards | determinate | lina PENDING | Task 9 |
| component routing table / family-doc map | (b) | component-quick-reference | determinate | lina PENDING | Task 9 |
| readiness / status tracking | (b) | component-readiness-status | determinate | lina PENDING | Task 9 |
| inheritance structure patterns | (b) | component-inheritance-structures | determinate | lina PENDING | Task 9 |
| web CSS rules (logical props, Shadow DOM) | (b) | web-authoring-standards | determinate | lina PENDING | Task 9 |
| cross-platform implementation guidance | (b) | platform-implementation-guidelines | determinate | lina PENDING | Task 9 |
| cross-platform vs platform-specific decision | (b) | cross-platform-vs-platform-specific-decision-framework | determinate | lina PENDING | Task 9 |
| token governance beyond routed section | (b) | token-governance | pair-pattern — (b) permitted | **ada** (target-doc owner) PENDING | Task 9 |
| schema format beyond routed section | (b) | component-schema-format | pair | lina PENDING | Task 9 |
| component-meta.yaml authoring guidance | (b) | component-meta-authoring-guide | determinate | lina PENDING | Task 9 |
| token lookup patterns / common usage | **(c)** | — | doc-indeterminate (same class as ada's) | lina PENDING | n/a |
| dev-workflow + file-org | shared → G2 | | | thurgood self | |

- Non-promotions: 10 precise § routes; 2 hand-offs; 8 application-MCP cues; 2 rebuild cues; get_document_full template row (precise); pair escape-hatches counted above.
- 118 row (Component 3, Lina's — NOT a promotion): carried with its two findings annotations per design — (i) ambient composition (conditioned WHEN serves the aware seam; unaware seam covered by always-loaded Pointer 1); (ii) s18 adjacency recorded under R7 AC5 (target stays s21 per her owner ruling; both headings spec-stamped). Rename-risk: contract-named heading, rename-resistant class.

## leonardo — 42 rows (prior 42)

- Coverage gaps:
  - **Product Handoff Protocol** (prose :160, no route): doc EXISTS → **route-added (b)** `product-handoff-protocol` (supersedes the design-round target-missing expectation — currency check corrected it). Owner: thurgood (governance doc) + leonardo (surface) — PENDING 8.3.
  - **Integration guide** (prose :291 "Consult the DesignerPunk Integration Guide via the docs MCP", no route, no id named): doc EXISTS (`designerpunk-integration-guide`) → **route-added (b)**. PENDING 8.3.
  - **Cross-platform-review reference material** (seed c): operational mode at :191 is served by existing routed rows (decision-framework §, platform-guidance generic→(b) below) → **no-route-needed**, recorded with rationale (the seed's own anticipated outcome).
- Class-fit: G1 (the leonardo.md rule-shaped entry the design named IS the shared ballot-verification/find_docs pair — audit finding: corpus-wide, not leonardo-local).
- Coherence: NO knowledge-fallback section — **intentional** (spec-writing surface; ground truth reached via three MCPs; no code write scope) → recorded, PENDING leonardo confirm.
- Promotion table (12 candidates — his dR1 stress-test carried as consumer ground truth; confirm-or-diverge):

| row | disposition | proposed target | criteria | owner confirm | resolve-verified |
|---|---|---|---|---|---|
| canonical contract / concept names when specifying behavior | **(a)** — THE WORKED (a) CASE | contract-system-reference § "Concept Catalog" | BOTH gates: load-bearing (the row's purpose IS the catalog) + artifact-named heading (rename-resistant satisfier — NO attestation needed); mid-workflow Step 3 strengthens (flow-position feed) | leonardo — his own dR1 argument; PENDING 8.3 | Task 9 via get_section |
| component routing table / family-doc map | (b) | component-quick-reference | his ~8-(b) set | leonardo PENDING | Task 9 |
| readiness / status before selecting | (b) | component-readiness-status | ditto | leonardo PENDING | Task 9 |
| cross-platform implementation guidance | (b) | platform-implementation-guidelines | ditto | leonardo PENDING | Task 9 |
| spec-planning beyond routed Tasks format | (b) | process-spec-planning | pair | leonardo PENDING | Task 9 |
| product-token governance beyond routed | (b) | product-token-governance | pair | leonardo PENDING | Task 9 |
| component philosophy / inheritance | (b) | stemma-system-principles | ditto | leonardo PENDING | Task 9 |
| test development standards (coverage review) | (b) | test-development-standards | ditto | leonardo PENDING | Task 9 |
| technology-stack reference | **(c)** | — | exploratory (his own R1 example; criterion 2) | leonardo PENDING | n/a |
| token lookup patterns / token doc map | **(c)** | — | doc-indeterminate (criterion 1) | leonardo PENDING | n/a |
| dev-workflow + file-org | shared → G2 | | | thurgood self | |

- Rename-risk (R7 AC5), (a) row: "Concept Catalog" is artifact-named — same class as "Module-Resolution Contract (Spec 118)"; residual rename risk accepted on the rename-resistant-by-construction basis (OB-1's addressing work does not yet guard headings). 

## data — 21 rows (prior 21)

- Coverage gap: **Android implementation patterns — route-added (a)**: `platform-implementation-guidelines § "Android Implementation Patterns"` (heading verified live :703). Rationale: exact symmetric twin of kenya's routed (a) iOS row; mid-workflow (screen implementation); platform-named heading, same stability class. Owner: **lina** (target doc hers) — PENDING 8.3. Rename-risk: as kenya's existing row, accepted.
- Class-fit: G1. Coherence: write scope (specs only) + android fallbacks — coherent.
- Promotions (9 candidates): contract/concept names → (b) contract-system-reference (occasional flow for implementers → (b) not (a), flow-position feed); philosophy → (b) stemma-system-principles; test-dev standards → (b); behavioral-contract validation → (b) test-behavioral-contract-validation; cross-platform file paths → **(c)** doc-indeterminate (platform-implementation-guidelines vs process-file-organization); technology-stack → (c) exploratory; token-lookup-beyond → (c) pair+indeterminate; dev-workflow/file-org → G2. Owner for the four (b) targets: lina (2: stemma-principles is… stemma-system-principles owner lina; test-behavioral-contract-validation lina) / thurgood (test-development-standards, contract-system-reference is lina's) — batched accordingly, PENDING 8.3.

## kenya — 23 rows (prior 23)

- Coverage gaps: none (has the iOS (a) row data lacks). Class-fit: G1. Coherence: coherent (ios fallbacks).
- Promotions (10): identical pattern to data (+ iOS-patterns-beyond-routed → (b) pair on platform-implementation-guidelines). Same owners, PENDING 8.3.

## sparky — 22 rows (prior 22)

- Coverage gap: **contract / concept-catalog names — route-added (b)** `contract-system-reference` (prose names it; data/kenya both carry the row; web implementer needs contract names identically). Owner: lina — PENDING 8.3.
- Coherence: **NO knowledge-fallback section while kenya/data carry platform fallbacks** — asymmetry finding: sparky's web sources live at `src/components/core/*/platforms/web/**`. Disposition: ADD web-components fallback entry (canonical edit) OR record-intentional — owner ruling (canonical owner per OB-9: lina, lock leonardo) — PENDING 8.3.
- Class-fit: G1. Promotions (8): x-plat guidance → (b) platform-implementation-guidelines; philosophy → (b); test-dev → (b); bcv → (b); x-plat file paths → (c) indeterminate; tech-stack → (c); token-lookup → (c); dev-workflow/file-org → G2. PENDING 8.3 (lina/thurgood batches).

## stacy — 29 rows (prior 29)

- Coverage gap: **test-development-standards — route-added (b)** (prose names it; no route; audit-facing). Owner: thurgood — self-confirmed at drafting (recorded, 2026-08-02, this audit): ADD.
- Class-fit: G1 (her Commands are otherwise genuinely invocable audit commands — the cleanest Commands section of the eight). Coherence: coherent (completion-docs/spec-summaries fallbacks cover audit surfaces).
- Promotions (8): spec-planning-beyond, task-type-beyond, bcv-beyond, completion-docs-beyond → (b) pairs (process-spec-planning, process-task-type-definitions, test-behavioral-contract-validation, completion-documentation-guide); contract/concept names → (b) contract-system-reference; product-token-gov detail → (b) product-token-governance; dev-workflow/file-org → G2. Owners: thurgood (4, self-confirm), lina (2), PENDING for lina's.

## thurgood — 27 rows (prior 27; the #105 return-edge item lives outside Routing — counted state identical)

- Coverage gaps: (i) **process-development-workflow — route-added (b)** (named in prose; the ONE agent lacking the shared dev-workflow row); (ii) **test-development-standards** — the KNOWN 118 gap: Component 3's row (§ "CI-Enforced Guards") lands in Task 9, with the (b)-downgrade path if the heading fails spot-verify. Both self-owned: recorded self-confirmations (2026-08-02, this audit).
- Class-fit: G1 — the ballot-verification entry the design named. Coherence: `src/__tests__/**` write scope has NO fallback section — **ruled intentional (self)**: test-surface knowledge routes through test-development-standards/audit-methodology rows; a fallback would duplicate routing. Recorded.
- Promotions (9, all self-owned — recorded self-confirmations, 2026-08-02): spec-planning-beyond (b, pair), task-type-beyond (b, pair), build-system setup (b, build-system-setup), completion-docs-beyond (b, pair), cross-reference standards (b, process-cross-reference-standards), hook-ops-beyond (b, pair), audit-methodology-beyond (b, pair), bcv-beyond (b — target doc test-behavioral-contract-validation is lina's → HER batch), file-org → G2.

---

## Task 9 edit-load summary (drafted; final after 8.3)

~57 (b) promotions (13+13 family sets + singles + 4 shared-source edits) · 2 (a) rows (leonardo Concept Catalog promotion; data Android-patterns addition) · 7 route additions · 2 class-fit reclassifications (shared source, ambient-class feasibility check first) · + Component 3's two 118 rows · + the 4c cue · + Ada's row re-verify · + the PDW 32-snippet fold-item. Non-promotions and (c) rows are recorded above with rationale (R7 AC3).
