# Task 2 Completion: Terminology Audit and Staleness Assessment

**Date**: 2026-05-03
**Task**: 2. Terminology Audit and Staleness Assessment
**Type**: Parent
**Status**: Complete

---

## Artifacts Created

- `findings/terminology-audit.md` — Scan of 86 steering docs and 8 agent configurations for intelligence layer terminology; blast radius estimate for Civitas naming rollout
- `findings/staleness-assessment.md` — Documentation currency analysis distinguishing stale-and-inaccurate from stale-but-stable; staleness detection script assessment

## Implementation Details

### Task 2.1: Terminology Audit

Grep-based scan of `.kiro/steering/*.md` (86 files) and `.kiro/agents/*-prompt.md` + `.kiro/agents/*.json` (16 files) for 11 term variants across 5 term families. Separate grep for Rosetta+Stemma paired references using 5 pattern variants.

Key methodology choice: used `grep` count mode first to identify high-match files, then content mode on specific files for context classification. This kept the scan efficient without reading every file in full.

### Task 2.2: Staleness Assessment

Ran `scripts/detect-stale-metadata.js` successfully — it scanned all 86 docs and produced a structured report. Cross-referenced docs with oldest `Last Reviewed` dates against git log to classify as stale-and-inaccurate vs. stale-but-stable. Checked for indirect staleness from pipeline architecture specs (080, 094) per Ada's feedback.

## Validation (Tier 3: Comprehensive)

### Syntax Validation
✅ Both findings documents are well-formed markdown
✅ All tables render correctly

### Functional Validation
✅ Terminology audit covers all 5 term families with match counts and file distributions
✅ Rosetta+Stemma paired references counted (30 in 6 files)
✅ Blast radius estimated (17-19 files, ~50-60 text changes)
✅ Classification produced: where Civitas adds clarity vs. where specific terms should remain
✅ Staleness script ran successfully on all 86 docs
✅ Stale-and-inaccurate vs. stale-but-stable distinction applied with evidence
✅ Domain correlation analysis produced
✅ Staleness script limitations documented

### Requirements Compliance
✅ Req 3.1: Scanned all steering docs and agent files for intelligence layer terms
✅ Req 3.2: Assessed consistency — 5 term families, no collective noun exists
✅ Req 3.3: Identified where Civitas adds clarity vs. where specific terms remain
✅ Req 3.4: Counted Rosetta+Stemma paired references (30)
✅ Req 3.5: Counted two-system framing instances (included in 30 count)
✅ Req 3.6: Delivered as `findings/terminology-audit.md`
✅ Req 4.1: Ran existing staleness script as baseline
✅ Req 4.2: Script was functional — no fallback needed
✅ Req 4.3: Distinguished stale-and-inaccurate from stale-but-stable via spec log cross-reference
✅ Req 4.4: Identified 12 docs with missing/invalid `Last Reviewed`
✅ Req 4.5: Domain correlation assessed — Process docs most vulnerable (21% stale-and-inaccurate)
✅ Req 4.6: Script adoption assessed — dormant, not integrated into any workflow
✅ Req 4.7: Delivered as `findings/staleness-assessment.md`

### Audit Discipline
✅ No files outside `findings/` created or modified (except tasks.md status updates)
✅ Grep-based scanning — no semantic analysis of full documents
✅ Metadata-based staleness — no content-level accuracy review

## Success Criteria Verification

### Criterion 1: Complete terminology scan with blast radius estimate
**Evidence:** `findings/terminology-audit.md` documents 5 term families with match counts across 86 steering docs and 16 agent files. Blast radius: 17-19 files, ~50-60 text changes. Key insight: "intelligence layer" appears zero times in steering docs — Civitas introduces a new concept, not renames an existing one.

### Criterion 2: Staleness assessment distinguishing stale-and-inaccurate from stale-but-stable
**Evidence:** `findings/staleness-assessment.md` classifies docs into 4 categories: stale-and-inaccurate (7 docs), stale-but-stable (8 docs), missing metadata (12 docs), fresh (59 docs). Cross-referenced against git log and pipeline architecture specs for indirect staleness.

### Criterion 3: Both deliverables grounded in Dimension 1 inventory
**Evidence:** Terminology audit used the 86-doc inventory as scan target list. Staleness assessment used the content domain tagging for correlation analysis (Process docs most vulnerable, Rosetta docs most stable).

## Lessons Learned

- **"Intelligence layer" is a new concept, not an existing term.** This simplifies the naming rollout — there's no entrenched term to displace, just a gap to fill.
- **The staleness problem is metadata governance, not age.** No docs are genuinely old. The issue is that `Last Reviewed` dates aren't updated when content changes, and 12 docs were created without the field at all.
- **The staleness script works but has a misleading failure mode.** It reports missing/invalid dates as ">12 months stale" which overstates the problem. Enhancement needed, not replacement.

## Related Documentation

- [Task 2 Summary](../../../../docs/specs/098-civitas-readiness-audit/task-2-summary.md) — Public-facing summary
