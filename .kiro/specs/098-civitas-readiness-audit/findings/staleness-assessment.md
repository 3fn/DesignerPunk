# Staleness Assessment

**Date**: 2026-05-03
**Spec**: 098 - Civitas Readiness Audit
**Task**: 2.2 — Staleness assessment
**Purpose**: Evaluate steering documentation currency, distinguishing stale-and-inaccurate from stale-but-stable

---

## Summary

**No steering documents are genuinely >6 months old by `Last Reviewed` date.** The oldest reviewed dates are December 15, 2025 (~4.5 months ago). The staleness detection script (`scripts/detect-stale-metadata.js`) flagged 12 documents as "stale (>12 months)" — but all 12 are metadata quality issues (missing or non-ISO date formats), not actual age issues.

The real staleness problem is **`Last Reviewed` dates that don't reflect actual content changes.** Process docs reviewed Dec 15 have been modified 13+ times since. Token family docs reviewed Dec 30 have been modified 15+ times since. However, many modifications were metadata-only (frontmatter additions, prefix renames from spec 036) rather than content changes.

---

## Staleness Detection Script Results

**Script:** `scripts/detect-stale-metadata.js` (built by spec 020, Dec 2025)
**Status:** Functional — successfully scanned all 86 docs
**Last modified:** Dec 16, 2025 (during spec 020 creation)
**Integrated into automation:** No (standalone manual-run tool)

| Category | Count | Details |
|----------|-------|---------|
| Fresh (<6 months) | 74 | All have valid ISO 8601 `Last Reviewed` dates |
| Warning (6-12 months) | 0 | — |
| Stale (>12 months) | 12 | All are metadata issues, not genuine age |

### The 12 "Stale" Documents (Metadata Issues)

| Document | Issue | Actual Status |
|----------|-------|---------------|
| AI-Collaboration-Principles.md | Missing `Last Reviewed` | Created Jan 15, 2026 — 3.5 months old |
| Completion Documentation Guide.md | Missing `Last Reviewed` | Created Jan 3, 2026 — 4 months old |
| Contract-System-Reference.md | Missing `Last Reviewed` | Created ~Mar 2026 — 2 months old |
| Layout-Specification-Vocabulary.md | Missing `Last Reviewed` | Created ~Mar 2026 — 2 months old |
| MCP-Evolution-Roadmap.md | Missing `Last Reviewed` | Created ~Apr 2026 — 1 month old |
| Platform-Resource-Map.md | Missing `Last Reviewed` | Created ~Mar 2026 — 2 months old |
| Process-Integration-Methodology.md | Missing `Last Reviewed` | Created ~Feb 2026 — 3 months old |
| Release Management System.md | Missing `Last Reviewed` | Created ~Jan 2026 — 4 months old |
| component-mcp-query-guide.md | Missing `Last Reviewed` | Created ~Apr 2026 — 1 month old |
| component-metadata-schema-reference.md | Missing `Last Reviewed` | Created ~Mar 2026 — 2 months old |
| Component-Family-Badge.md | Invalid format: "January 23, 2026" | Should be 2026-01-23 |
| Component-Family-Chip.md | Invalid format: "February 4, 2026" | Should be 2026-02-04 |

**Finding:** 10 docs are missing `Last Reviewed` entirely. 2 docs have non-ISO date formats. All 12 are relatively recent documents (1-4 months old). This is a **metadata governance gap** — newer docs are being created without the required `Last Reviewed` field, despite spec 020 establishing it as a required metadata field.

---

## Stale-and-Inaccurate vs. Stale-but-Stable

### Methodology

For docs with `Last Reviewed` dates >3 months old, cross-referenced against git log to identify commits that modified the file after its review date. Classified modifications as:
- **Content changes**: Substantive additions, restructuring, new sections
- **Metadata-only changes**: Frontmatter additions (skill:// headers), prefix renames, Last Reviewed updates

### Process Docs (Reviewed Dec 15, 2025)

| Document | Review Date | Commits Since | Content Changes? | Classification |
|----------|-------------|---------------|-----------------|----------------|
| Process-Spec-Planning.md | Dec 15 | 13+ | Yes — summary doc workflow, informed placeholder pattern, documentation task type added | **Stale-and-inaccurate** |
| Process-File-Organization.md | Dec 15 | 5+ | Mixed — mostly metadata, some cross-reference updates | Borderline |
| Process-Task-Type-Definitions.md | Dec 15 | 3+ | Yes — informed placeholder pattern added (Mar 2026) | **Stale-and-inaccurate** |
| Process-Development-Workflow.md | Jan 4 | 4+ | Yes — hook operations refactored, KB maintenance added | **Stale-and-inaccurate** |

### Token Family Docs (Reviewed Dec 30, 2025)

| Document | Review Date | Commits Since | Content Changes? | Classification |
|----------|-------------|---------------|-----------------|----------------|
| Token-Family-Spacing.md | Dec 30 | 5+ | Yes — space700/space800 tokens added, sizing relationship | **Stale-and-inaccurate** |
| Token-Family-Shadow.md | Dec 30 | 2+ | Mostly metadata (prefix rename, frontmatter) | **Stale-but-stable** |
| Token-Family-Blend.md | Dec 30 | 2+ | Mostly metadata | **Stale-but-stable** |
| Token-Family-Typography.md | Dec 30 | 2+ | Mostly metadata | **Stale-but-stable** |
| Token-Family-Layering.md | Dec 30 | 2+ | Mostly metadata | **Stale-but-stable** |
| Token-Family-Glow.md | Dec 30 | 2+ | Mostly metadata | **Stale-but-stable** |
| Token-Family-Motion.md | Dec 30 | 3+ | Yes — easing token infrastructure extension | **Stale-and-inaccurate** |
| Token-Family-Radius.md | Dec 30 | 3+ | Yes — primitive radius token rename | **Stale-and-inaccurate** |
| Token-Family-Border.md | Dec 30 | 2+ | Mostly metadata | **Stale-but-stable** |
| Token-Family-Accessibility.md | Dec 30 | 2+ | Mostly metadata | **Stale-but-stable** |
| Token-Family-Responsive.md | Dec 30 | 2+ | Mostly metadata | **Stale-but-stable** |

### Indirect Staleness (Pipeline Architecture Changes)

Per Ada's feedback, specs that changed token resolution or generation behavior create indirect staleness in Token-Family docs' "Cross-Platform Usage" sections:

| Spec | Impact | Affected Docs |
|------|--------|---------------|
| 080 (Rosetta Mode Architecture) | Changed how iOS/Android consume color tokens via mode system | Token-Family-Color (reviewed Mar 12 — may be current), all other Token-Family docs' cross-platform sections |
| 094 (Portable Pipeline and Theme Registry) | Changed theme-varying token behavior, added theme registry | Token-Family docs with theme-aware patterns (Color, Blend, Opacity) |
| 092 (Sizing Token Family) | New token family created | Token-Family-Spacing (relationship section) |

**Assessment:** Token-Family-Color was reviewed Mar 12, 2026 — after spec 080 (Mar 18) it may already be stale again. The pipeline architecture specs create a ripple effect that the current review process doesn't track.

---

## Staleness by Content Domain

| Domain | Total Docs | Stale-and-Inaccurate | Stale-but-Stable | Missing Metadata | Fresh |
|--------|-----------|---------------------|-------------------|-----------------|-------|
| Process | 19 | 4 | 0 | 3 | 12 |
| Rosetta | 23 | 3 | 8 | 0 | 12 |
| Stemma | 29 | 0 | 0 | 4 | 25 |
| Integration | 13 | 0 | 0 | 4 | 9 |
| Foundation | 7 | 0 | 0 | 1 | 6 |

**Correlation:** Process docs have the highest stale-and-inaccurate rate (4/19 = 21%) because process docs are modified by many specs across domains. Rosetta docs have the highest stale-but-stable count (8/23 = 35%) because token family mathematical foundations rarely change. Integration and Stemma docs have the most missing metadata (4 each) because many were created recently without `Last Reviewed` fields.

---

## Staleness Detection Script Assessment

The script is functional but has limitations:

| Aspect | Assessment |
|--------|-----------|
| **Existence** | ✅ Exists at `scripts/detect-stale-metadata.js` |
| **Functionality** | ✅ Runs successfully, scans all 86 docs |
| **Accuracy** | ⚠️ Treats missing/invalid dates as ">12 months" — misleading |
| **Adoption** | ❌ Not integrated into any workflow, no evidence of use since creation |
| **Relevance** | ⚠️ Thresholds (6mo/12mo) may be too generous — the real problem is `Last Reviewed` not being updated when content changes, not calendar age |
| **Scalability** | ✅ Handles 86 docs (up from 12 at creation) |

**Key limitation:** The script measures calendar age from `Last Reviewed` date. It does not detect whether content has changed since the last review. The stale-and-inaccurate vs. stale-but-stable distinction requires cross-referencing against the spec log, which the script doesn't do.

---

## Implications for Civitas

1. **The metadata governance gap is the primary staleness issue.** 12 docs (14%) have missing or invalid `Last Reviewed` fields. This is a process enforcement gap — spec 020 established the requirement, but nothing enforces it when new docs are created.

2. **`Last Reviewed` dates are unreliable as staleness indicators.** Docs are modified without updating their review dates. The date reflects when someone last formally reviewed the doc, not when the content was last accurate. A Civitas governance process should track content modification dates (via git), not just review dates.

3. **Process docs are the most vulnerable to staleness** because they're modified by specs across all domains. A Civitas agent (or expanded Thurgood scope) should prioritize process doc currency.

4. **Token family docs are mostly stable** — their mathematical foundations don't change. But pipeline architecture changes (specs 080, 094) create indirect staleness that the current review process doesn't track. Ada's domain expertise is needed to identify which pipeline changes affect which docs.

5. **The staleness detection script needs enhancement, not replacement.** It works but should: (a) distinguish missing metadata from genuine age, (b) cross-reference against git log for content changes, and (c) be integrated into a regular workflow rather than sitting dormant.
