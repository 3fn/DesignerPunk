# Task 4.1 Completion: Assess Dormant Governance Scripts

**Date**: 2026-05-03
**Task**: 4.1 Assess dormant governance scripts
**Type**: Architecture
**Status**: Complete

---

## Artifacts Created

- `findings/dormant-tooling-assessment.md` — Assessment of 4 scripts with verdicts, rationale, and recommended implementation path

## Assessment Results

| Script | Verdict |
|--------|---------|
| `detect-stale-metadata.js` | Relevant — needs minor update (misleading error for missing dates) |
| `validate-steering-metadata.js` | Relevant — needs significant update (stale hardcoded vocabularies) |
| `scan-cross-references.sh` | Superseded by MCP `list_cross_references()` — deprecate |
| `validate-cross-reference-format.sh` | Partially superseded — update (unique format quality checks MCP doesn't do) |

## Human Checkpoint

Assessment presented to Peter. Peter's decisions:
- Deprecate `scan-cross-references.sh` (agreed — MCP supersedes it)
- Update `validate-cross-reference-format.sh` (disagreed with deferral — "any good reason not to?" — no good reason, updating breaks the dormancy pattern)

## Validation (Tier 3: Comprehensive)

✅ Assessment limited to 4 named scripts only — no other scripts assessed
✅ Scoped to governance infrastructure — domain validation scripts not touched
✅ Each script assessed with: verdict, rationale, specific issues, recommended updates, effort estimate
✅ Human checkpoint completed — Peter reviewed and adjusted implementation path
✅ Assessment documented in findings/ directory

### Requirements Compliance
✅ Req 6.1: 4 named scripts assessed
✅ Req 6.2: Each classified (relevant/needs updating/superseded/deprecated)
✅ Req 6.5: Scoped to governance infrastructure only
