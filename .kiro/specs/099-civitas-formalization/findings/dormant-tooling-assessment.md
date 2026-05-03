# Dormant Tooling Assessment

**Date**: 2026-05-03
**Spec**: 099 - Civitas Formalization
**Task**: 4.1 — Assess dormant governance scripts
**Purpose**: Determine relevance of 4 highest-impact dormant scripts against current infrastructure

---

## Assessment Summary

| Script | Verdict | Rationale |
|--------|---------|-----------|
| `detect-stale-metadata.js` | **Relevant — needs minor update** | Functional (verified in spec 098), handles 86 docs. Misleading error for missing/invalid dates (reports as ">12 months"). Fix: distinguish missing metadata from genuine age. |
| `validate-steering-metadata.js` | **Needs significant update** | Hardcoded vocabulary is stale (14 core + 6 additional task types vs. current expanded set). Organization validation only accepts "process-standard" — many docs now use other values. Inclusion validation only accepts "always"/"conditional" — docs now use "manual". Core parsing logic is sound. |
| `scan-cross-references.sh` | **Superseded by MCP** | Outputs to a hardcoded spec-020 path. The docs MCP `list_cross_references()` provides the same data programmatically with better structure. Replace with a wrapper that calls the MCP tool. |
| `validate-cross-reference-format.sh` | **Partially superseded** | Checks absolute paths and non-descriptive link text — the MCP doesn't do this. But outputs to a hardcoded spec-020 path. Worth updating the output path and integrating, but lower priority than the other two. |

---

## Detailed Assessment

### 1. `detect-stale-metadata.js`

**Status: Relevant — needs minor update**

**What it does:** Scans all `.kiro/steering/*.md` files, extracts `Last Reviewed` dates, calculates age, classifies as fresh (<6mo) / warning (6-12mo) / error (>12mo).

**Verified functional:** Ran successfully during spec 098 Task 2.2. Scanned all 86 docs. Produced structured report.

**Issues found during spec 098:**
- Reports missing/invalid `Last Reviewed` as ">12 months stale" — misleading. 12 docs flagged as "stale" were actually missing metadata, not genuinely old.
- No distinction between stale-and-inaccurate vs. stale-but-stable (the spec 098 staleness assessment added this manually).

**Recommended updates:**
1. Separate "missing metadata" from "genuinely stale" in output categories
2. Add structured JSON output option (alongside human-readable) for programmatic consumption by `governance-check.sh`
3. Exit code: 0 (clean), 1 (findings), 2 (error) — currently uses 0/1 only

**Estimated effort:** ~1-2 hours

### 2. `validate-steering-metadata.js`

**Status: Needs significant update**

**What it does:** Validates metadata headers against a schema — required fields, date formats, layer numbers, organization values, scope values, inclusion values, task type vocabulary.

**Issues:**
- **Task vocabulary is stale:** Hardcodes 14 core + 6 additional task types. The current system has evolved — many docs use task types not in this list (e.g., `component-selection`, `ui-composition`, `feature-building`, `token-development`, `pipeline-integration`, `mcp-documentation`, `product-development`, `audit`, etc.).
- **Organization validation too restrictive:** Only accepts `process-standard`. Docs now use `architecture-overview`, `spec-guide`, `spec-summary`, `spec-completion`, and others.
- **Inclusion validation too restrictive:** Only accepts `always`/`conditional`. Docs now use `manual` (the most common inclusion type).
- **Core parsing logic is sound:** The regex-based metadata extraction and field validation structure works. The issue is hardcoded valid values, not the validation approach.

**Recommended updates:**
1. Update valid organization values to match current usage (or make configurable)
2. Update valid inclusion values to include `manual`
3. Update task vocabulary to match current expanded set (or read from a config file)
4. Add structured JSON output option
5. Update exit codes to 0/1/2 convention

**Estimated effort:** ~2-3 hours

### 3. `scan-cross-references.sh`

**Status: Superseded by MCP**

**What it does:** Extracts markdown links from steering docs, outputs a report to a hardcoded spec-020 path.

**Why superseded:** The docs MCP `list_cross_references()` provides the same data with better structure — it returns JSON with target path, context, section, and line number. The MCP tool is already integrated into the agent workflow and was used extensively during spec 098.

**Recommendation:** Do not update. Build a new `governance-check.sh` integration that calls `list_cross_references()` via MCP query instead. The shell script can remain in `scripts/` as a historical artifact or be deprecated.

### 4. `validate-cross-reference-format.sh`

**Status: Partially superseded — lower priority**

**What it does:** Checks for absolute paths and non-descriptive link text in cross-references. Outputs to a hardcoded spec-020 path.

**Why partially superseded:** The MCP `list_cross_references()` extracts cross-references but does NOT validate format quality (absolute paths, descriptive text). This script provides unique value that the MCP doesn't replicate.

**Issues:**
- Hardcoded output path to spec-020 directory
- No structured output (markdown report only)

**Recommendation:** Lower priority for this spec. The format validation is useful but not critical for the governance-check.sh integration. If time permits, update the output path and add structured output. Otherwise, defer to a follow-up.

**Estimated effort:** ~1 hour if updated

---

## Recommended Implementation Path for Task 4.2

Based on this assessment and Peter's review:

1. **Update `detect-stale-metadata.js`** (~1-2 hours) — separate missing metadata from genuine staleness, add JSON output, update exit codes
2. **Update `validate-steering-metadata.js`** (~2-3 hours) — update hardcoded vocabularies, add JSON output, update exit codes
3. **Update `validate-cross-reference-format.sh`** (~1 hour) — fix hardcoded output path, add structured output
4. **Deprecate `scan-cross-references.sh`** — add deprecation header noting MCP `list_cross_references()` as replacement
5. **Build `detect-affected-steering-docs.sh`** (~30 min) — new script, `git diff --name-only` with tag fallback
6. **Build post-prompt-modification verification script** (~1 hour) — new script, checks prompt-to-steering alignment
7. **Build `governance-check.sh` wrapper** (~1 hour) — orchestrates the above scripts with fast no-op path

**Total estimated effort for Task 4.2 + 4.3:** ~7-9 hours
