# One real screen with a full MCP call ledger — Settings (CHARTER, fork F2 execution)

**Date**: 2026-10-12
**Type**: **CHARTER** — the execution record for Peter's F2 ruling on the discovery shadow study (`2026-10-07-discovery-shadow-study-charter.md` § 6): one real product screen, specified by Leonardo, with every MCP call logged; the ledger is the evidence for the go/no-go on Stage 2 (components). Evidence OUTSIDE the study (not pre-registered, one screen, an author who has seen the defects) — it informs the decision, it does not feed the O1–O3 rules.
**Owner**: **Leonardo** (screen spec, product scaffolding, the ledger). **Lina** judges each ledger row right/wrong after the spec is final (never Leonardo alone). **Thurgood** signs off on method conformance only. **Orchestrator** cross-checks the ledger against the session transcript for completeness (every tool call logged). **Peter** decides Stage 2.
**Trigger**: this charter's merge (activates the grant below) AND a session running on a checkout at `main` ≥ `dcd337dcf` with the Application MCP rebuilt (see § 4 blocker 1) → Leonardo starts. Peter's two Impeccable stops (brief, then direction) are inside the work.
**Grant paths** (ballot 2026-09-27-ci-regime-standing-scope § 3 — owner **Leonardo**, activated by Peter's merge of the PR that carries this file, for the one fixing PR that lands the screen + ledger): `product/**`, `.kiro/issues/2026-10-12-leonardo-settings-call-ledger.md`. Both are outside Leonardo's charter write scope (`.kiro/specs/**`, `docs/specs/**`). A `.github/**` path is not granted. Out-of-list edits are a claims-pass finding.
**Consulted**: Leonardo — plan, placement, cost, blockers, contamination rules (R1 of this charter); Thurgood — evidence form, criterion, anti-steering, clause-1 counting (R1). Both read-only, parallel, 2026-10-12.

---

## 1. The screen — Settings, and why (recorded BEFORE any discovery call, per Thurgood)
Onboarding's experience pattern lists 31 components and would hand Leonardo nearly the whole tree, so keyword search would rarely run. The settings pattern lists 13, and a settings screen naturally needs things a pattern does not supply: one-off elements (a profile row, value/chevron rows, a section header, app-version text) and existence checks (an on/off switch, a destructive confirm sheet, a sign-out action). Leonardo has deliberately NOT opened the settings pattern yet, so the first read lands in the ledger.

## 2. Artifacts and placement (Leonardo, VERIFIED against the Product MCP)
- The Product MCP reads `PRODUCT_DIR=<repo>/product`; the folder does not exist today (`get_product_overview` → "No product data indexed"). Prerequisite scaffolding: `product/overview.yaml` (at least `name`, `register`; brand fields optional); one domain object `product/domain-objects/user-preferences.yaml`.
- Screen spec: `product/experience-map/pages/settings.yaml` in the fixture format (`name`, `type`, `template`, `status`, `ux-direction`, `ui-tree` with token references). `rebuild_product_index` after each write; the Product MCP runs from the root `dist/mcp/product-mcp.js` (build first).
- Ledger: `.kiro/issues/2026-10-12-leonardo-settings-call-ledger.md`, beside the study charter.
- **Which product the screen belongs to is Peter's call** (§ 6 D1).

## 3. The ledger (Thurgood's schema, superset of Leonardo's; adopted)
**Header**: the served `main` SHA (post-#303), the Application MCP dist build time, the Product MCP build, the exposure inventory (§ 5).
**One row per MCP call, written as he works**: sequence № · **intent, written BEFORE the call** · tool + arguments verbatim · result count · top-2 ids each with tier (and `viability.internalOnly`) · rank-1 `matchedOn` + coverage · existence-check? (Y/N) · action taken (acted / proposed / read further / fell back to catalog / abandoned) · component finally chosen for that step · Leonardo's at-time judgment (Y / N / gap / unknown) · **Lina's final judgment (filled after the spec is final)** · **P flag** (pre-exposed — set mechanically by string-comparing the query against the seven reproductions and Lina's R1 expected-failures list, plus Leonardo's own flag).
**Summary must report**: discovery calls split keyword / context-or-category filter / catalog-or-full-metadata read · how often a keyword call fell back to a catalog read · `strong` right vs wrong at rank 1 and in the top 2 · **clause-1 strongs counted separately** (a `strong` reached through a single high-signal token at < 50 % coverage — identifiable from `matchedOn` + coverage) · existence checks four ways: found / missed / correctly none / `strong` on something that does not exist (the harm case) · everything split P vs non-P.
**Cross-check**: the orchestrator compares the ledger to the session transcript; an unlogged tool call is a finding.

## 4. Blockers and prerequisites (none fixed here)
1. **The served Application MCP must include Stage 0.** The current session's `.mcp.json` runs the Application MCP from the checkout's dist and reads component metadata from the checkout's `src/components/core`; a checkout on `task/123-u3-onboarding` serves PRE-Stage-0 code and metadata. Fix: a session on a checkout at `main` ≥ `dcd337dcf`, `application-mcp-server` rebuilt, restart, and confirm `viability.internalOnly` appears in a `find_components` result before the first logged call. The ledger header records the served SHA.
2. Product MCP: build root `dist/mcp/product-mcp.js`; `rebuild_product_index` after each write.
3. Which product (§ 6 D1).
4. Expected component gaps (an on/off switch, a list row) are ledger findings and escalations through Thurgood → Lina, not blockers.

## 5. Contamination and anti-steering (Leonardo's rules + Thurgood's additions, both binding)
- Exposure inventory (recorded now): the defect record's seven reproductions; Lina's R1 expected-failures list (modal/dialog, app bar/navbar/toolbar, bottom nav, page dots/carousel indicator, wizard steps, tag, terms consent, select); study briefs v1–v3; the Stage 0 fix record.
- The screen's needs are written in plain product language at the top of the ledger BEFORE any discovery call; each query uses the need's wording as written; each row's intent is written before its call.
- Keyword search only where he naturally would; never an added call to make the ledger bigger.
- P flag set mechanically and by hand; results reported with and without P rows. The switch query is unavoidable on a settings screen and will be P.
- Leonardo's queries can never seed the study's Q3 fixture. How he discovers (the call-mode shares) is robust to pre-exposure; per-query correctness on P rows is discounted.

## 6. Decisions
- **D1 (Peter, open)**: which product the Settings screen belongs to — (a) a fictional product scaffolded in-repo under `product/` (simplest; exercises the Product MCP; nothing leaves the repo; the evidence is about discovery calls, which the product identity barely changes); (b) a scratch copy of a consumer repo (test01 / the wrkingClass app folder — rehearsal copy only, never the real one). Orchestrator leans (a).
- **D2 — Stage 2 (components) go/no-go criterion, pre-stated (Thurgood; adopted unless Peter amends at this charter's merge)**: Stage 2 for components goes ahead ONLY IF keyword calls are ≥ 25 % of discovery calls AND ≥ 3 harmful outcomes are observed (a wrong `strong` acted on, or an existing component missed). Otherwise the components half of Stage 2 closes with the ledger as its record. Thurgood's sign-off covers method conformance; the decision is Peter's.
- **D3 — clause 1 of the components rubric** (one high-signal hit = `strong` at any coverage; Stage 0 left 4 of 7 reproductions with a doubtful `strong`): the ledger counts these separately. Changing clause 1 is NOT a ballot — it is the owner (Lina) turning a coverage knob on her own rubric, with Thurgood's consult, a dated amendment, calibration tests re-run, and a PR-body note that tiers change; aligning with the docs side's 0.5 coverage threshold is a consistency move. It becomes a ballot only if the tier vocabulary or meaning changed.

## 7. Cost (Leonardo)
Product scaffolding ≈ 0.25 session (+ D1). Screen spec ≈ 1–1.5 sessions — novel work with no prior screens, so Impeccable's full gate applies: **two Peter stops (brief, then direction)**. Ledger overhead ≈ 0.25. Total ≈ 1.5–2 sessions; over 2 only with full brand configuration. Lina's judging pass ≈ 0.25; Thurgood's conformance read ≈ 0.25.

## 8. Surviving caveats
One screen yields perhaps 5–15 keyword calls: the right KIND of evidence, a thin BASIS. Read the result as directional, not conclusive (Leonardo; Thurgood agrees the clause-1 count will be small and the 4-of-7 reproductions remain the main evidence). F2-docs (charter the docs-side Stage 1 now?) remains UNRULED and is unaffected by this charter.

## 9. Closing
When the screen + ledger PR merges and Lina's judgments and Thurgood's conformance note are in, Peter decides D2; record the decision here and in the study charter (dated), then `git mv` to `archive/`.
