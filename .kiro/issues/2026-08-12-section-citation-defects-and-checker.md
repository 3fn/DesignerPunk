# Issue: Dead get_section Citations — Defect Fixes + Checker Build

**Date**: 2026-08-12
**Authority**: register row `governance/classification-map.md § "section-citation-resolution"` (proposed; Peter ratifies at this PR's merge) — origin incident: the Q6 RMS-rewrite consult (Stacy caught 2 dead citations that only a chance consult surfaced), then the same-day corpus scan below proving the class pre-existed at scale.
**Owner**: Thurgood coordinates; content fixes route by the three-layer boundary (steward flags → domain owner adjudicates); checker ARMING is Peter's flip.
**Status**: OPEN — execute in a dedicated session. Re-run the scan at execution start (recipe below; counts are point-in-time).

---

## The scan (2026-08-12, first ever): 135 citations, 17 flagged, ~14 real

Recipe (re-runnable): regex `get_section\(\{path:"X", heading:"Y"\}\)` over `governance/`, `.kiro/steering/`, `canonical/`; resolve X against served doc ids/filenames, Y against that doc's headings (substring). The execution session should use the D5 resolver chain (id → indexed path → legacy path → aliases) for precision.

### Defect table (owner adjudication checklist)

| # | Citing doc | Dead citation | Class | Owner | |
|---|-----------|----------------|-------|-------|---|
| 1–6 | `governance/Token-Quick-Reference.md` | `token-family-color` §§ "Identity Concept", "Action Concept", "Contrast Concept", "Structure Concept", "Component Tokens", "Primitive Color Families" | heading renamed/absent | **Ada** | [ ] |
| 7 | same | `token-family-spacing` § "Spacing Scale" | heading absent | **Ada** | [ ] |
| 8 | same | `token-family-typography` § "Typography Composition" | heading absent | **Ada** | [ ] |
| 9 | same | `token-family-shadow` § "Shadow Scale" | heading absent | **Ada** | [ ] |
| 10 | `governance/Component-Readiness-Status.md` | `component-family-form-inputs` § "Component Readiness" | heading absent | **Lina** | [ ] |
| 11–12 | `.kiro/steering/Spec-Feedback-Protocol.md` | self-MCP-query examples (§§ "Stamp Format", "Mandatory @ Mention Scanning") | identity doc is never MCP-served — the example teaches a failing action | **Thurgood** | [ ] |
| 13–14 | `.kiro/steering/Civitas-System-Overview.md` | self-MCP-query examples (+ `get_document_full`) | same identity-doc class | **Thurgood** | [ ] |
| 15 | `governance/Process-File-Organization.md` | path-cite of `.kiro/steering/Civitas-System-Overview.md` § "Governance Processes" | citation INTO a never-served identity doc | **Thurgood** | [ ] |
| — | `governance/Component-MCP-Document-Template.md` ×2 | `component-family-[family-name]` placeholders | NOT defects (template teaching the pattern) — checker must allowlist template placeholders | n/a | [x] |

**Fix guidance**: heading-class → owner either restores/updates the cited heading or re-aims the citation (owner's content call). Identity-class → replace the MCP-example blocks with truthful access guidance (identity docs are always-loaded; MCP queries against them fail by design — 119 decision), or drop the blocks.

## Checker build (after or with the fixes)

- Resolver-chain-aware scanner (D5: id → indexed relative path → legacy path; plus aliases), heading-existence at citation grain, **identity-doc awareness** (any get_section/get_document_full citation targeting a never-served doc = defect), **template-placeholder allowlist** (`[family-name]`-style patterns).
- Manual-run first against the fixed corpus (expect zero) → CI job → **gate-bite proof** (introduce a deliberate dead citation on a throwaway branch, observe red, close unmerged — the 125-A pattern) → **Peter flips it required** (his platform action = the arming).
- **Timing (campaign law)**: arm BEFORE U1b wave 1's prune merges. After the campaign window opens, a new check arming is an exogenous boundary event (K=3 budget) — arming now is measurement-free.
- Escalate-don't-build boundary: this checker is sanctioned BY the register row (proposed→armed path); keep it a single script + one CI job, no config system.

## Cross-links

- Register row: `governance/classification-map.md § "section-citation-resolution"`
- Origin: Q6 execution issue § "Stacy consult record" (`2026-08-12-release-manager-retirement-execution.md`)
- Related prior art: PR #111 (bare-id defects — the sibling class at link grain); 119-B OB-1 (cross-ref visibility)
