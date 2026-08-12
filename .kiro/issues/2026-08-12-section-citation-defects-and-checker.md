# Issue: Dead get_section Citations — Defect Fixes + Checker Build

**Date**: 2026-08-12
**Authority**: register row `governance/classification-map.md § "section-citation-resolution"` (proposed; Peter ratifies at this PR's merge) — origin incident: the Q6 RMS-rewrite consult (Stacy caught 2 dead citations that only a chance consult surfaced), then the same-day corpus scan below proving the class pre-existed at scale.
**Owner**: Thurgood coordinates; content fixes route by the three-layer boundary (steward flags → domain owner adjudicates); checker ARMING is Peter's flip.
**Status**: EXECUTED 2026-08-12 (dedicated session; see § "Execution record" below). Remaining: Peter's arming flip — add required check "Section Citation Guard / section-citations" (Settings → Branches → main), BEFORE U1b wave 1's prune merges (campaign law: post-window arming is an exogenous boundary event, K=3 budget).

---

## The scan (2026-08-12, first ever): 135 citations, 17 flagged, ~14 real

Recipe (re-runnable): regex `get_section\(\{path:"X", heading:"Y"\}\)` over `governance/`, `.kiro/steering/`, `canonical/`; resolve X against served doc ids/filenames, Y against that doc's headings (substring). The execution session should use the D5 resolver chain (id → indexed path → legacy path → aliases) for precision.

### Defect table (owner adjudication checklist)

| # | Citing doc | Dead citation | Class | Owner | |
|---|-----------|----------------|-------|-------|---|
| 1–6 | `governance/Token-Quick-Reference.md` | `token-family-color` §§ "Identity Concept", "Action Concept", "Contrast Concept", "Structure Concept", "Component Tokens", "Primitive Color Families" | heading renamed/absent | **Ada** | [x] 1–4 consolidated into one citation re-aimed at the merged heading "Identity, Action, Contrast, Structure, Progress"; 5 ("Component Tokens") DELETED — no such section ever existed on the Color doc (component color tokens live in component family docs; restore-pointer decision flagged for Peter); 6 split into two citations ("Neutral Partition" + "Chromatic Families") |
| 7 | same | `token-family-spacing` § "Spacing Scale" | heading absent | **Ada** | [x] re-aimed → "Primitive Spacing Tokens" (holds the scale table) |
| 8 | same | `token-family-typography` § "Typography Composition" | heading absent | **Ada** | [x] re-aimed → "Typography Token Categories" |
| 9 | same | `token-family-shadow` § "Shadow Scale" | heading absent | **Ada** | [x] re-aimed → "Shadow Semantic Tokens" (elevation levels) |
| 10 | `governance/Component-Readiness-Status.md` | `component-family-form-inputs` § "Component Readiness" | heading absent | **Lina** | [x] re-aimed → `component-readiness-status` § "Individual Component Status" (readiness data is deliberately centralized there; fabricating a family-doc heading would create a drift liability); response-shape bullets corrected to the real columns |
| 11–12 | `.kiro/steering/Spec-Feedback-Protocol.md` | self-MCP-query examples (§§ "Stamp Format", "Mandatory @ Mention Scanning") | identity doc is never MCP-served — the example teaches a failing action | **Thurgood** | [x] "MCP Query" block → "Document Access": truthful guidance (always-loaded, no query needed; in-document § refs for navigation) |
| 13–14 | `.kiro/steering/Civitas-System-Overview.md` | self-MCP-query examples (+ `get_document_full`) | same identity-doc class | **Thurgood** | [x] same treatment as 11–12 |
| 15 | `governance/Process-File-Organization.md` | path-cite of `.kiro/steering/Civitas-System-Overview.md` § "Governance Processes" | citation INTO a never-served identity doc | **Thurgood** | [x] re-aimed as a plain always-loaded-doc § reference (no MCP call) |
| 16 | `governance/Web-Authoring-Standards.md:400` | self-cite § "Token Priority" (actual heading: "3. Token Priority") | **NEW — found by the execution re-scan**: exact-match semantics caught what the original substring scan could not | **Lina** | [x] citation corrected to the exact heading "3. Token Priority" (grep found zero other citers; renaming the numbered heading would break its 1–6 sibling sequence for zero benefit) |
| — | `governance/Component-MCP-Document-Template.md` ×2 | `component-family-[family-name]` placeholders | NOT defects (template teaching the pattern) — checker must allowlist template placeholders | n/a | [x] |

**Fix guidance**: heading-class → owner either restores/updates the cited heading or re-aims the citation (owner's content call). Identity-class → replace the MCP-example blocks with truthful access guidance (identity docs are always-loaded; MCP queries against them fail by design — 119 decision), or drop the blocks.

## Checker build (after or with the fixes)

- Resolver-chain-aware scanner (D5: id → indexed relative path → legacy path; plus aliases), heading-existence at citation grain, **identity-doc awareness** (any get_section/get_document_full citation targeting a never-served doc = defect), **template-placeholder allowlist** (`[family-name]`-style patterns).
- Manual-run first against the fixed corpus (expect zero) → CI job → **gate-bite proof** (introduce a deliberate dead citation on a throwaway branch, observe red, close unmerged — the 125-A pattern) → **Peter flips it required** (his platform action = the arming).
- **Timing (campaign law)**: arm BEFORE U1b wave 1's prune merges. After the campaign window opens, a new check arming is an exogenous boundary event (K=3 budget) — arming now is measurement-free.
- Escalate-don't-build boundary: this checker is sanctioned BY the register row (proposed→armed path); keep it a single script + one CI job, no config system.

## Execution record (2026-08-12, dedicated session)

- **Re-scan** (checker script, resolver-chain semantics): 183 citations checked across governance/ + .kiro/steering/ + canonical/, 3 template placeholders allowlisted, **18 defects** — the table's ~15 plus one NEW catch (row 16, Web-Authoring-Standards) that exact-heading matching found where the original substring scan could not. Post-fix run: **173 citations, 0 defects** (count drop = Ada's consolidation/deletion adjudications).
- **Checker**: `scripts/check-section-citations.ts` (`npm run check:section-citations`) — reuses the runtime's own resolution surfaces (`extractFrontmatterInfo` for ids, `FROZEN_LEGACY_MANIFEST` for legacy paths, exact trimmed-string heading equality per section-parser), identity-doc awareness, `[family-name]`-placeholder allowlist. Single script + one CI job per the escalate-don't-build boundary.
- **Deliberate deviation from the D5 recipe**: aliases do NOT pass resolution — `resolveRef` never consults aliases (they are a find_docs scoring signal only), so an alias-only match FAILS at runtime. The checker flags it as a defect and surfaces the alias's owning doc as a fix hint; treating aliases as resolving would have allowlisted runtime failures.
- **CI job**: `.github/workflows/section-citations.yml`, check name **"Section Citation Guard / section-citations"** — defined but UNARMED.
- **Gate-bite proof** (125-A pattern): throwaway PR #121 with one deliberate dead citation → check went RED (https://github.com/3fn/DesignerPunk/actions/runs/31608088052/job/94152123200) → closed unmerged, branch deleted.
- **Regeneration**: governance/ + .kiro/steering/ are in the agent-generator input closure; diff-guard ran full-run-green and refreshed `canonical/generated.lock` (no generated output embeds the changed content).
- **Validation**: root `npm test` 367/367 suites (8,891 tests), mcp-server suite 37/37 (612), `check:id-uniqueness` PASS, `typecheck:scripts` PASS.
- **Open item for Peter** (beyond the arming flip): Ada deleted the `token-family-color § "Component Tokens"` citation outright — the section never existed; if a component-color-token pointer is wanted, its home is a component family doc (Lina) or a new Color-doc subsection (Ada), not a re-aim.

## Cross-links

- Register row: `governance/classification-map.md § "section-citation-resolution"`
- Origin: Q6 execution issue § "Stacy consult record" (`2026-08-12-release-manager-retirement-execution.md`)
- Related prior art: PR #111 (bare-id defects — the sibling class at link grain); 119-B OB-1 (cross-ref visibility)
