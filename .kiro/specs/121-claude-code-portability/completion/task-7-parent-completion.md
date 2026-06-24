# Task 7 Completion: MCP Governance Documentation Updates

**Date**: 2026-06-23
**Task**: 7. MCP Governance Documentation Updates (Doc-as-Requirement; ballot-measure)
**Type**: Parent
**Status**: Complete — **this is the final task of Spec 121**
**Agents**: Thurgood (drafting on Sonnet); orchestrator (example fix + roadmap gap); Peter (ballot-measure approval)

---

## Artifacts Modified

- `.kiro/steering/MCP-Relationship-Model.md` — discovery tools, token triple, Discovery Confidence Model section, consumer-facing `aliases:` note. `Last Reviewed` → 2026-06-23.
- `.kiro/steering/MCP-Integration-Guide.md` — new "MCP Tool Contracts (Spec 121 additions)" section (discovery tools, token triple, confidence model). `Last Reviewed` → 2026-06-23.
- `.kiro/steering/Process-File-Organization.md` — author-facing `aliases:` metadata-schema entry. `Last Reviewed` → 2026-06-23.
- `.kiro/steering/MCP-Evolution-Roadmap.md` — **Gap 8: `resolvedValue` Type Understates Theme-Varying Shape** (Peter-supported).
- Docs-MCP index rebuilt (`rebuild_index` → healthy, 89 docs).

## Implementation Details

### 7.1 — discovery tools + confidence model (Doc-Req 1 + 4)
Documented in `MCP-Relationship-Model.md` + `MCP-Integration-Guide.md`: `find_docs` dual-mode (concept + paginated list) and the `get_documentation_map` supersede; keyworded `find_components` (tokenized matching, indexed field set, `ApplicationSummary` unchanged + optional `matchedOn`, auto-index-first); the three-layer **Discovery Confidence Model** referencing `discovery-confidence-rubric.md` (distinct fields never collapsed, tiers-not-scores, governing sequence, match-confidence-alone-never-acts, `partial`-vs-`none` contracts, token exemption + trigger, 119 Decision 4a cross-ref). The docs `aliases:` surface is documented both consumer-facing (the MCP docs) and author-facing (`Process-File-Organization.md` metadata schema).

### 7.2 — token triple + governance rule (Doc-Req 2 + 4)
Documented the additive resolved-value triple + null-contract, the **"always read `resolutionDepth` first"** rule, the theme-varying per-mode-bundle caveat (Task-1 Option A), `platforms{}` unchanged, the additive/back-compat governance rule (enforced by the Req-3 contract test), and that the **authoritative runtime value is the shipped `dist/DesignTokens.*` artifact** (the MCP does not eliminate referencing shipped token files — G6).

### 7.3 — rebuild index (Doc-Req 5)
`rebuild_index` → `status: healthy`, 89 documents, 0 errors/warnings, 2,830 sections. The new content is discoverable through the tools it describes.

### Orchestrator corrections during review
- **Fixed an inaccurate example:** the theme-varying bundle initially showed `wcag: 4.5`/`7.1` (contrast ratios); `wcag` actually holds a higher-contrast *color* (rgba). Corrected to accurate rgba values + a clarifying note (Doc-Req 4 — examples must be accurate).
- **Captured roadmap Gap 8:** the `resolvedValue` TS type (`number | string | null`) understates the theme-varying runtime shape (object). Docs describe runtime accurately; the type is the gap. Resolve both MCPs together (or via the backlogged shared resolver module) to preserve the single cross-MCP contract.

## Validation (Tier 3: Comprehensive)

✅ All three edited docs pass `scripts/validate-steering-metadata.js` (0 errors)
✅ Cross-reference scanner shows no new violations (pre-existing ones untouched)
✅ Documented query/result shapes match the shipped contracts (cross-checked against Task 1/2/3/5 completion docs)
✅ Confidence model coverage: tiers-not-scores, match-confidence-alone-never-acts, `partial`/`none` contracts, token exemption + trigger, 119 Decision 4a cross-ref — all present
✅ Token-triple coverage: null-contract, "read `resolutionDepth` first", theme-varying bundle caveat, `platforms{}` unchanged, `dist/DesignTokens.*` authoritative-value statement — all present
✅ `aliases:` documented both consumer-facing and author-facing
✅ `Last Reviewed` bumped on all three edited docs (legitimate — reviewed + updated)
✅ `rebuild_index` → healthy
✅ Ballot-measure: drafted → presented → Peter-approved → applied

## Requirements Compliance

✅ Doc-Req 1, 2, 4, 5 (discovery tools + confidence model; token triple + governance rule; metadata valid / cross-refs resolve / examples accurate; index rebuilt). Doc-Req 3 (roadmap) was completed in Task 3.5.

## Notes

- **Roadmap Gap 8** records the `resolvedValue` type-vs-runtime gap for a future cross-MCP fix.
- Three of the corpus's 11 pre-existing staleness warnings (the docs Task 7 reviewed) are cleared honestly via the `Last Reviewed` bumps; the other 8 remain as honest review to-dos (Peter's call — not gamed).

## Related Documentation

- [Task 7 Summary](../../../../docs/specs/121-claude-code-portability/task-7-summary.md)
