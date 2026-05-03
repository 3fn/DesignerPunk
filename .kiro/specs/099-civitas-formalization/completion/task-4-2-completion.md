# Task 4.2 Completion: Update/Build Trigger Scripts

**Date**: 2026-05-03
**Task**: 4.2 Update/build trigger scripts
**Type**: Implementation
**Status**: Complete

---

## Scripts Updated

| Script | Changes |
|--------|---------|
| `detect-stale-metadata.js` | New `metadata-issue` status (separate from `error`). `--json` flag for structured output. Exit code 2 for script errors. |
| `validate-steering-metadata.js` | Expanded task vocabulary (~50 types, up from 20). Added organization values (`architecture-overview`, `spec-guide`, `spec-summary`, `spec-completion`). Added `manual` inclusion type. Fixed validation to use `ALL_TASK_TYPES` not `CORE_TASK_TYPES`. |
| `validate-cross-reference-format.sh` | Output now goes to stdout (was hardcoded to spec-020 path). |
| `scan-cross-references.sh` | Deprecated — added deprecation header noting MCP `list_cross_references()` as replacement. |

## Scripts Created

| Script | Purpose |
|--------|---------|
| `detect-affected-steering-docs.sh` | Post-spec-completion trigger. Uses `git diff --name-only` to detect modified steering docs and agent configs. Tag fallback to HEAD~1. |
| `verify-prompt-alignment.sh` | Post-prompt-modification trigger. Checks agent name in Agent Directory, JSON config existence, prompt file reference, file:// and skill:// path resolution. |

## Testing

| Script | Normal Case | No-Changes Case | Error Case |
|--------|-------------|-----------------|------------|
| `detect-stale-metadata.js` | ✅ 87 docs scanned, 12 metadata issues correctly separated from 0 stale | N/A | ✅ Exit 2 on missing directory |
| `detect-stale-metadata.js --json` | ✅ Structured JSON output with categorized results | N/A | N/A |
| `validate-steering-metadata.js` | ✅ 87 docs, 38 valid, 49 with errors (down from 70 with stale vocabulary) | N/A | N/A |
| `detect-affected-steering-docs.sh` | ✅ Detected 2 steering + 3 agent changes from HEAD~3 | ✅ Exit 0 "No governance-relevant changes" | ✅ Falls back to HEAD~1 when no tags |
| `verify-prompt-alignment.sh` | ✅ All 8 agents checked, found 2 known KB path issues (Ada, Lina JSON-config KB dirs) | N/A | ✅ Exit 2 on missing Agent Directory |

## Validation (Tier 2: Standard)

✅ All updated scripts produce correct output
✅ All new scripts executable and functional
✅ Exit codes follow 0/1/2 convention (clean/findings/error)
✅ Structured output (markdown) from all scripts
✅ Edge cases handled (no tags, missing files)
✅ Deprecation header added to scan-cross-references.sh
✅ Domain validation scripts NOT touched (scoped to governance infrastructure only)
