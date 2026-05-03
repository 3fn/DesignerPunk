# Prior Audit Digest

**Date**: 2026-05-03
**Spec**: 098 - Civitas Readiness Audit
**Task**: 1.1 — Consume prior audit findings
**Purpose**: Inventory governance tooling and processes built by specs 020, 032, 033, 036; assess current existence and adoption

---

## Summary

Four prior specs audited and refined the steering documentation layer. Together they built 13 scripts, established 8+ governance processes, created 16+ steering documents, and produced comprehensive audit artifacts. **The tooling exists but appears dormant** — scripts were last modified during their creation specs (Dec 2025) and are not referenced in any automation. The quarterly review process has never been executed. Existence ≠ adoption.

---

## Spec 020: Steering Documentation Refinement (Dec 2025)

### Tooling Built

| Script | Path | Purpose | Still Exists? | Evidence of Use Post-Creation? |
|--------|------|---------|---------------|-------------------------------|
| extract-doc-structure.sh | `scripts/` | Extract H1/H2 headings from steering docs | ✅ | ❌ Last modified Dec 15, 2025 |
| consolidate-structure-maps.sh | `scripts/` | Combine partial structure maps | ✅ | ❌ Last modified Dec 15, 2025 |
| analyze-metadata.sh | `scripts/` | Extract first 30 lines for metadata analysis | ✅ | ❌ Last modified Dec 15, 2025 |
| calculate-baseline-metrics.sh | `scripts/` | Line counts, section counts, size distribution | ✅ | ❌ Last modified Dec 15, 2025 |
| scan-cross-references.sh | `scripts/` | Extract all markdown cross-references | ✅ | ❌ Last modified Dec 15, 2025 |
| find-duplicate-content.sh | `scripts/` | Identify duplicate H2 headings | ✅ | ❌ Last modified Dec 15, 2025 |
| validate-steering-metadata.js | `scripts/` | Validate required fields, task types, layers, dates | ✅ | ❌ Last modified Dec 15, 2025 |
| convert-date-formats.js | `scripts/` | Convert dates to ISO 8601 | ✅ | ❌ Last modified Dec 16, 2025 |
| detect-stale-metadata.js | `scripts/` | Flag docs >6mo (warning) and >12mo (error) | ✅ | ❌ Last modified Dec 16, 2025 |
| validate-metadata-parsing.js | `scripts/` | Validate machine-readable metadata; generate JSON | ✅ | ❌ Last modified Dec 16, 2025 |
| validate-structure-parsing.js | `scripts/` | Validate heading hierarchy consistency | ✅ | ❌ Last modified Dec 16, 2025 |
| validate-cross-reference-format.sh | `scripts/` | Detect absolute path violations, non-descriptive links | ✅ | ❌ Last modified Dec 16, 2025 |
| validate-task-vocabulary.sh | `scripts/` | Validate task types match 14-type vocabulary | ✅ | ❌ Last modified Dec 15, 2025 |

**Adoption status:** All 13 scripts exist at their original paths. None are referenced in `package.json`, `.kiro/hooks/`, or any automation pipeline. They are standalone manual-run tools that have not been modified or invoked since their creation during spec 020 execution.

### Processes Established

| Process | Document | Status |
|---------|----------|--------|
| Quarterly review process | `.kiro/specs/020-.../quarterly-review-process.md` | **Dormant** — Established Dec 2025. Q1 2026 review (~March 2026) has no evidence of execution. |
| Metadata maintenance guidelines | `.kiro/specs/020-.../metadata-maintenance-guidelines.md` | **Dormant** — Decision frameworks for task types, layer reassignment, inclusion changes. No evidence of use. |
| 4-layer progressive disclosure | Implemented in steering docs | **Active** — Layers 0-3 are actively used. Docs MCP serves by layer. |
| Standardized metadata schema | Implemented in steering docs | **Active** — 14 task types, required fields. Docs created after spec 020 follow the schema. |
| Redundancy governance | Intentional redundancy markers | **Active** — `**Note**:` markers used in steering docs for intentional heading duplication. |
| Section-level conditional loading | `📖 CONDITIONAL SECTION` markers | **Active** — Used in Process-Spec-Planning.md, Process-Development-Workflow.md, and others. |

### Recommendations Made (for future specs)
- Integrate staleness detection into CI/CD pipeline — **Not done**
- Create automated quarterly review reminders — **Not done**
- Track metadata changes over time — **Not done**
- Version metadata schema for future evolution — **Not done**

---

## Spec 032: Documentation Architecture Audit (Dec 2025)

### Tooling Built
None. This was a pure audit spec.

### Processes Established

| Process | Status |
|---------|--------|
| Two-phase audit workflow (draft findings → human review → confirmed actions) | **Active** — Used by spec 036 and subsequent audits |
| MCP candidacy assessment criteria | **Active** — Referenced when deciding whether docs belong in MCP |
| Documentation disposition categories (Keep/Update/Relocate/Remove/Add to MCP) | **Active** — Used by spec 036 |
| Metadata standardization (`Last Reviewed` on all audited docs) | **Active** — Docs created after 032 include Last Reviewed |

### Key Actions Taken
- Moved 9 token docs from `docs/tokens/` to `.kiro/steering/` (MCP-served)
- Removed 2 empty files
- Relocated 6 files to `docs/release-management/`
- Fixed broken cross-references
- Updated ~33 files with metadata

### Recommendations Deferred to Spec 033
- Create Release Management System steering doc — **Done in 033**
- Create Token Quick Reference — **Done in 033**
- Documentation gap analysis for missing token docs — **Done in 033**

---

## Spec 033: Steering Documentation Enhancements (Dec 2025)

### Tooling Built
None. Pure documentation spec.

### Processes Established

| Process | Status |
|---------|--------|
| Token documentation pattern standard (YAML front matter, metadata header, overview, primitives, semantics, cross-platform, AI guidance, related docs) | **Active** — All token family docs follow this pattern |
| Progressive disclosure workflow for MCP (summary → section → full) | **Active** — Documented in Token Quick Reference, used by agents |

### Key Artifacts Created
- 7 new steering documents: Release Management System, Token Quick Reference, Token-Family-Radius, Token-Family-Border, Token-Family-Opacity, Token-Family-Accessibility, Token-Family-Responsive
- Updated Token-Family-Spacing with Grid Spacing section
- Token documentation coverage: 63% → 97%

---

## Spec 036: Steering Documentation Audit (Jan 2026)

### Tooling Built
No reusable scripts. Produced comprehensive audit artifacts that are spec-internal:

| Artifact | Path | Purpose | Reusable? |
|----------|------|---------|-----------|
| Token tracking | `audit-artifacts/token-tracking.md` | Token counts for all 55 docs | Data snapshot — stale |
| Legacy naming report | `audit-artifacts/legacy-naming-report.md` | 39 legacy naming instances | Data snapshot — partially remediated |
| Redundancy analysis | `audit-artifacts/redundancy-analysis.md` | Cross-document overlap analysis | Methodology reusable, data stale |
| Category analysis | `audit-artifacts/category-analysis.md` | Category prefix proposals | **Executed** — prefixes applied |
| Impact prioritization | `audit-artifacts/impact-prioritization.md` | Impact Score ranking | Methodology reusable, data stale |
| Cross-reference verification | `audit-artifacts/cross-reference-verification.md` | 10 broken refs found/fixed | Data snapshot — fixed |

### Processes Established

| Process | Status |
|---------|--------|
| Impact Score methodology (Token Count × Load Frequency Multiplier) | **Reusable** — Methodology documented but not automated |
| Batch execution order for prefix renames | **Executed** — Prefixes applied to 43 of 55 docs |
| Redundancy classification (intentional priming vs. harmful redundancy) | **Active** — Framework used in subsequent doc work |
| Two-checkpoint human review (discovery → CP1 → analysis → CP2) | **Active** — Used in subsequent audit specs |

### Key Findings Still Relevant
- 6 always-loaded docs = 61.7% of total impact (session start optimization target)
- Legacy naming: 39 instances across 8 docs (partially remediated — `Test-Development-Standards.md` had 15 `DPIcon` references)
- Consolidation proposals: 5 approved, projected -2,280 tokens (-5.8% session start)

---

## Cross-Cutting Assessment

### What's Actively Used
- 4-layer progressive disclosure structure
- Standardized metadata schema (required fields, task types)
- Section-level conditional loading markers
- Two-phase audit workflow (draft → human review → confirmed)
- MCP candidacy criteria
- Documentation disposition categories
- Token documentation pattern standard
- Progressive disclosure MCP workflow
- Redundancy classification framework
- Category prefix system (43 docs prefixed)

### What Exists But Is Dormant
- **13 governance scripts** in `scripts/` — all exist, none used since creation (Dec 2025)
- **Quarterly review process** — documented, never executed
- **Metadata maintenance guidelines** — documented, no evidence of use
- **Impact Score methodology** — documented, not automated
- **Staleness detection** — script exists, not integrated into any workflow

### Dormant Tooling May Be Stale or Superseded

The 13 scripts were built when the steering layer had 12 documents. It now has 86. Several concerns warrant assessment during Task 3.1 (enforcement mechanism inventory):

- **Hardcoded assumptions**: Scripts may reference paths, doc counts, or patterns that don't match current structure (e.g., `validate-steering-metadata.js` validated 12 docs with a 14-type task vocabulary — both numbers have changed)
- **MCP supersession**: The docs MCP now provides `get_documentation_map()`, `list_cross_references()`, `get_index_health()`, and `validate_metadata()` — these may functionally replace several scripts (`scan-cross-references.sh`, `validate-cross-reference-format.sh`, `validate-metadata-parsing.js`, `validate-structure-parsing.js`)
- **Rule drift**: If scripts enforce rules that later specs relaxed or changed, running them would produce false positives. The metadata schema, cross-reference standards, and task vocabulary have all evolved since Dec 2025.
- **Quarterly review process**: Was designed for 12 docs with manual review of each. At 86 docs, the process may need redesign rather than adoption.

**Assessment deferred to Task 3.1** per scope boundary. The prior-audit-digest documents existence and adoption status; effectiveness and relevance assessment belongs in the enforcement mechanism inventory.

### What Was Recommended But Never Done
- CI/CD integration for staleness detection
- Automated quarterly review reminders
- Metadata change tracking over time
- Metadata schema versioning

### Implications for Civitas Audit

1. **The governance tooling gap is adoption, not absence.** Prior specs built substantial tooling. The problem is that none of it was integrated into ongoing workflows. A Civitas formalization spec should focus on adoption mechanisms (automation, hooks, agent responsibilities) rather than building new tooling from scratch.

2. **The quarterly review process is the most significant dormant process.** It was designed to catch exactly the staleness issues this audit is investigating. Its non-adoption is itself a governance gap finding.

3. **The Impact Score methodology from spec 036 is directly applicable** to this audit's staleness assessment (Dimension 3). It provides a principled way to prioritize which stale docs matter most.

4. **Spec 036's audit artifacts are data snapshots, not living tools.** The token tracking, legacy naming report, and redundancy analysis were accurate at time of creation but are now 4+ months old. This audit should produce fresh data rather than relying on 036's snapshots.

5. **The two-phase audit workflow (032) and two-checkpoint review process (036) are proven patterns** that this audit should follow — and does, per the design document.
