# One real screen with a full MCP call ledger — Settings (CHARTER, fork F2 execution)

**Date**: 2026-10-12
**Type**: **CHARTER** — the execution record for Peter's F2 ruling on the discovery shadow study (`2026-10-07-discovery-shadow-study-charter.md` § 6): one real product screen, specified by Leonardo, with every MCP call logged; the ledger is the evidence for the go/no-go on Stage 2 (components). Evidence OUTSIDE the study (not pre-registered, one screen, an author who has seen the defects) — it informs the decision, it does not feed the O1–O3 rules.
**Owner**: **Leonardo** (screen spec, product scaffolding, the ledger). **Lina** judges each ledger row right/wrong after the spec is final (never Leonardo alone). **Thurgood** signs off on method conformance only. **Orchestrator** cross-checks the ledger against the session transcript for completeness (every tool call logged). **Peter** decides Stage 2.
**Trigger**: this charter's merge (activates the grant below) AND a session running on a checkout at `main` ≥ `dcd337dcf` with the Application MCP rebuilt (see § 4 blocker 1) → Leonardo starts. Peter's two Impeccable stops (brief, then direction) are inside the work.
**Grant paths** (ballot 2026-09-27-ci-regime-standing-scope § 3 — owner **Leonardo**, activated by Peter's merge of the PR that carries this file, for the one fixing PR that lands the ledger): `.kiro/issues/2026-10-12-leonardo-settings-call-ledger.md` only. *(Amended 2026-10-12 at D1's ruling: `product/**` is NOT granted — no `product/` folder is written in this repo; the screen spec lives in the scratch consumer, outside this repo's governance.)* Outside Leonardo's charter write scope (`.kiro/specs/**`, `docs/specs/**`). A `.github/**` path is not granted. Out-of-list edits are a claims-pass finding.
**Consulted**: Leonardo — plan, placement, cost, blockers, contamination rules (R1 of this charter); Thurgood — evidence form, criterion, anti-steering, clause-1 counting (R1). Both read-only, parallel, 2026-10-12.

---

## 1. The screen — Settings, and why (recorded BEFORE any discovery call, per Thurgood)
Onboarding's experience pattern lists 31 components and would hand Leonardo nearly the whole tree, so keyword search would rarely run. The settings pattern lists 13, and a settings screen naturally needs things a pattern does not supply: one-off elements (a profile row, value/chevron rows, a section header, app-version text) and existence checks (an on/off switch, a destructive confirm sheet, a sign-out action). Leonardo has deliberately NOT opened the settings pattern yet, so the first read lands in the ledger.

## 2. Artifacts and placement — RULED 2026-10-12 (Peter, D1 = b1): a scratch consumer, not this repo
**Why not in-repo**: `product/` is the Product MCP's data directory for product UX documentation (Spec 081 § "Product Data Directory Structure"), and it **lives in the product's own repository, not in DesignerPunk** (`governance/MCP-Relationship-Model.md` § "Product MCP"); `designerpunk init` writes `product/overview.yaml` into the consumer at birth (`src/cli/init.ts` step 5); Model B: DesignerPunk is the engine, the product is the consumer's own. This repo's `.mcp.json` points `PRODUCT_DIR` at `<repo>/product` for development only — the folder has never existed. The orchestrator's earlier lean to an in-repo fictional product was wrong and is withdrawn.
- **The scratch consumer**: a fresh repo born with `designerpunk init` from the CURRENT build (not a registry version — none carries Stage 0). Location: a sibling folder under the same parent as this repo (e.g. `../scratch-consumer-settings`), never `test01` or any real consumer. It is disposable evidence scaffolding: its `product/overview.yaml` (written by init), `product/domain-objects/user-preferences.yaml`, and `product/experience-map/pages/settings.yaml` (fixture format: `name`, `type`, `template`, `status`, `ux-direction`, `ui-tree` with token references) live there; `rebuild_product_index` after each write.
- **Serving Stage 0 in the consumer**: `npm pack` from a checkout at `main` ≥ `dcd337dcf`, install the tarball into the scratch consumer (`npm i ../<tarball>`). This is a local install, NOT a publish — the hermetic publish law (`scripts/release-publish.ts` only) is untouched. The consumer's MCP wiring follows the shipped install guide as written; **any init/onboarding friction is a finding for Spec 123 U3's inbound, not for this study**.
- **The ledger**: `.kiro/issues/2026-10-12-leonardo-settings-call-ledger.md` in THIS repo (the only granted path). **At the end, the final `settings.yaml` and `overview.yaml` are appended verbatim to the ledger** so the evidence is versioned here; the scratch consumer may then be deleted.

## 3. The ledger (Thurgood's schema, superset of Leonardo's; adopted)
**Header**: the served `main` SHA (post-#303), the Application MCP dist build time, the Product MCP build, the exposure inventory (§ 5).
**One row per MCP call, written as he works**: sequence № · **intent, written BEFORE the call** · tool + arguments verbatim · result count · top-2 ids each with tier (and `viability.internalOnly`) · rank-1 `matchedOn` + coverage · existence-check? (Y/N) · action taken (acted / proposed / read further / fell back to catalog / abandoned) · component finally chosen for that step · Leonardo's at-time judgment (Y / N / gap / unknown) · **Lina's final judgment (filled after the spec is final)** · **P flag** (pre-exposed — set mechanically by string-comparing the query against the seven reproductions and Lina's R1 expected-failures list, plus Leonardo's own flag).
**Summary must report**: discovery calls split keyword / context-or-category filter / catalog-or-full-metadata read · how often a keyword call fell back to a catalog read · `strong` right vs wrong at rank 1 and in the top 2 · **clause-1 strongs counted separately** (a `strong` reached through a single high-signal token at < 50 % coverage — identifiable from `matchedOn` + coverage) · existence checks four ways: found / missed / correctly none / `strong` on something that does not exist (the harm case) · everything split P vs non-P.
**Cross-check**: the orchestrator compares the ledger to the session transcript; an unlogged tool call is a finding.

## 4. Blockers and prerequisites (none fixed here)
1. **Stage 0 must be what is served.** A session on a checkout at `main` ≥ `dcd337dcf` (the main checkout now rests on `main`, Application MCP dist rebuilt 2026-10-12), AND the scratch consumer installed from a tarball packed from that checkout. Before the first logged call, confirm `viability.internalOnly` appears in a `find_components` result in the consumer's session; the ledger header records the packed SHA.
2. The consumer's Product MCP: whatever the install guide wires; `rebuild_product_index` after each write. Friction → 123 U3 inbound.
3. Expected component gaps (an on/off switch, a list row) are ledger findings and escalations through Thurgood → Lina, not blockers.
4. **Follow-up, not here (Thurgood)**: this repo's own `.mcp.json` `designerpunk-product` entry should state what it is for, or be removed, so the next reader does not take it as an invitation to put product data in the engine repo (the class fix named at D1).

## 5. Contamination and anti-steering (Leonardo's rules + Thurgood's additions, both binding)
- Exposure inventory (recorded now): the defect record's seven reproductions; Lina's R1 expected-failures list (modal/dialog, app bar/navbar/toolbar, bottom nav, page dots/carousel indicator, wizard steps, tag, terms consent, select); study briefs v1–v3; the Stage 0 fix record.
- The screen's needs are written in plain product language at the top of the ledger BEFORE any discovery call; each query uses the need's wording as written; each row's intent is written before its call.
- Keyword search only where he naturally would; never an added call to make the ledger bigger.
- P flag set mechanically and by hand; results reported with and without P rows. The switch query is unavoidable on a settings screen and will be P.
- Leonardo's queries can never seed the study's Q3 fixture. How he discovers (the call-mode shares) is robust to pre-exposure; per-query correctness on P rows is discounted.

## 6. Decisions
- **D1 — RULED 2026-10-12 (Peter): (b1)** — a fresh scratch consumer born with `designerpunk init` from the current build, installed from a locally packed tarball so Stage 0 is served; screen spec lives there; ledger (with the spec appended verbatim at the end) lives here. (a) in-repo withdrawn as contrary to the Product MCP's placement rule; (b2) test01 unsuitable (pre-123, v12).
- **D2 — Stage 2 (components) go/no-go criterion, pre-stated (Thurgood; adopted unless Peter amends at this charter's merge)**: Stage 2 for components goes ahead ONLY IF keyword calls are ≥ 25 % of discovery calls AND ≥ 3 harmful outcomes are observed (a wrong `strong` acted on, or an existing component missed). Otherwise the components half of Stage 2 closes with the ledger as its record. Thurgood's sign-off covers method conformance; the decision is Peter's.
- **D3 — clause 1 of the components rubric** (one high-signal hit = `strong` at any coverage; Stage 0 left 4 of 7 reproductions with a doubtful `strong`): the ledger counts these separately. Changing clause 1 is NOT a ballot — it is the owner (Lina) turning a coverage knob on her own rubric, with Thurgood's consult, a dated amendment, calibration tests re-run, and a PR-body note that tiers change; aligning with the docs side's 0.5 coverage threshold is a consistency move. It becomes a ballot only if the tier vocabulary or meaning changed.

## 7. Cost (Leonardo)
Scratch-consumer birth (pack, install, init, MCP wiring per the install guide) ≈ 0.5 session; product scaffolding inside it ≈ 0.25. Screen spec ≈ 1–1.5 sessions — novel work with no prior screens, so Impeccable's full gate applies: **two Peter stops (brief, then direction)**. Ledger overhead ≈ 0.25. Total ≈ 2–2.5 sessions; over that only with full brand configuration or install friction (which routes to 123 U3). Lina's judging pass ≈ 0.25; Thurgood's conformance read ≈ 0.25.

## 8b. Surviving caveats
One screen yields perhaps 5–15 keyword calls: the right KIND of evidence, a thin BASIS. Read the result as directional, not conclusive (Leonardo; Thurgood agrees the clause-1 count will be small and the 4-of-7 reproductions remain the main evidence). F2-docs (charter the docs-side Stage 1 now?) remains UNRULED and is unaffected by this charter.

## 8. Leonardo's read of the consumer-born path (2026-10-12, read-only) — no objection; three binding conditions
1. **Pack from a BUILT tree**: run the full build at `main` ≥ `dcd337dcf` before `npm pack` — `dist/mcp/*.js` is built output and an unbuilt pack ships nothing to serve.
2. **Launch the session FROM the consumer folder**: the shipped MCP config template (`src/cli/templates/mcp-config.json.template`) uses paths relative to the working folder (`./product`, `./node_modules/@3fn/core/...`); a session started anywhere else serves nothing. The ledger is written to its absolute path back in this repo.
3. **Record which Leonardo ran**: the consumer gets init's generated agent layer, whose Leonardo prompt may not match this repo's; the ledger header names the prompt that was loaded.
Checked on main: the consumer runs the same product-mcp-server code, so `product/experience-map/pages/*.yaml` indexes as in the fixtures; component roots = package + consumer, and the package ships `component-meta.yaml`, so all 34 components are served; `product/overview.yaml` arrives as `[CUSTOMIZE]` placeholders — filling it is scaffolding (logged, not counted as discovery); whether init creates `product/experience-map/` is unchecked — create if missing. Cost confirmed ≈ 2–2.5 sessions (birth + wiring 0.25–0.5; spec incl. two Impeccable stops 1–1.5; ledger 0.25).

## 8a. Execution brief (for Leonardo, in a fresh session on `main`; read-only ack requested now)
1. Do not start before this charter merges (it activates the ledger grant) and the session serves `main` ≥ `dcd337dcf`.
2. Birth the scratch consumer: `npm pack` from the main checkout → new sibling folder → `npm i <tarball>` → `npx designerpunk init` → wire MCPs exactly as the shipped install guide says. Log friction to 123 U3's inbound. Confirm `viability.internalOnly` in a `find_components` result before the first logged call.
3. Open the ledger first: header (packed SHA, builds, exposure inventory § 5), then the screen's needs in plain product language, THEN the first discovery call. One row per MCP call per § 3; intent before each call.
4. Scaffold `product/domain-objects/user-preferences.yaml`; author `product/experience-map/pages/settings.yaml` in the consumer. Impeccable's full gate: STOP for Peter at the brief, STOP again at the direction.
5. Keyword search only where you naturally would; P-flag mechanically and by hand; never pad the ledger; your queries never seed Q3.
6. Finish: append `settings.yaml` and `overview.yaml` verbatim to the ledger; summary per § 3; hand to Lina (row judgments) and Thurgood (method conformance); the orchestrator cross-checks the ledger against the transcript; open the ledger PR (the one granted PR). Then STOP — the Stage 2 decision is Peter's under D2.

## 9. Closing
When the screen + ledger PR merges and Lina's judgments and Thurgood's conformance note are in, Peter decides D2; record the decision here and in the study charter (dated), then `git mv` to `archive/`.

### Outcome — RULED 2026-10-13 (Peter): **D2 = NO-GO.** Stage 2 does not run for components.
- **The ledger**: merged as **#347 → `846c6d99c`** (`2026-10-12-leonardo-settings-call-ledger.md`): 35 MCP calls, 35 rows; the orchestrator's transcript cross-check found no unlogged call.
- **The criterion, on its letter**:
  - Keyword calls were **3 / 16 = 18.75 %** of discovery calls, below the 25 % threshold (23.5 % if the S1 verification call is counted, still below).
  - Harmful outcomes as D2 defines them (a wrong `strong` acted on, or an existing component missed): **0**.
  - The harm *class* named in § 3, a `strong` on something that does not exist, fired on **3 / 3** keyword rows (D8, D9, D10). All three are P rows, so per-query correctness is discounted (§ 5).
- **Lina's row judgments** (`ff3a00912`) changed no § 3 count. At rank 1: 0 `strong` right, 3 wrong. Existence checks: 1 found, 3 harm-case.
- **Thurgood's method conformance**: **CONFORMS WITH NOTES** (8 notes, in the ledger after § "Rows for Lina to judge").
- **Routing**:
  - **Component gaps G1–G6 → Lina** (Peter: "route the gaps to Lina"; her record is in flight on her own branch). G6 is her D15 finding: Input-Radio-Set has no group-label prop.
  - **Consumer friction items 1–4, 6 and 7 → Spec 123 U5.**
  - **Item 5 → Thurgood**, as a docs-matcher defect filed separately: `find_docs` concept mode ignores `limit`.
- **Clause-1 coverage knob (D3): STILL PARKED, not ruled.** Evidence now on record: two clean clause-1 wrong `strong`s on the served build (D9 `dialog` at 1/3; D10 `change` at about 1/5). D8 sat at the 50 % boundary on the served build. It drops out of the class on `main` after #330, because "on/off" now splits into two stop words and D8 reads 1/1. The knob stays Lina's (D3).
- Recorded in the study charter (`2026-10-07-discovery-shadow-study-charter.md` § 6, under F2). This charter is archived by this PR (README rules 2 and 5).
