# Task 5 Completion: Cadence Trigger and Process Documentation

**Date**: 2026-05-03
**Task**: 5. Cadence Trigger and Process Documentation
**Type**: Parent
**Status**: Complete

---

## Artifacts Modified

| File | Changes |
|------|---------|
| `Start Up Tasks.md` | Added item 2: Civitas Governance Health Check with self-updating date `[2026-05-03]`. Renumbered items 3-6. |
| `governance-check.sh` | Added `--full` flag auto-updates the date in Start Up Tasks after checks complete. |
| `thurgood-prompt.md` | Simplified health check procedure to reference `governance-check.sh --full`. |
| `Process-File-Organization.md` | Added Civitas Governance Note cross-reference after Standard Metadata Header section. |

## Implementation Details

### Task 5.1: Cadence Trigger
Added governance health check as item 2 in Start Up Tasks (between date check and user authorization). All agents see the date at session start. Format: `IF >30 days since [DATE], THEN flag for Thurgood.` Date auto-updates when `governance-check.sh --full` runs — the date only advances when checks actually execute.

### Task 5.2: Health Check Procedure
Already documented in Thurgood's prompt (Task 3.1). Updated to reference `governance-check.sh --full` as the single command. Removed redundant manual steps that the script now handles.

### Task 5.3: Cross-References
Added Civitas Governance Note to Process-File-Organization.md after the Standard Metadata Header section. Points to Civitas-System-Overview.md for governance processes and Thurgood's prompt for the full lifecycle.

## Validation (Tier 3: Comprehensive)

✅ Start Up Tasks has governance health check at item 2 with correct date format
✅ Items renumbered correctly (1-6)
✅ `governance-check.sh --full` auto-updates date (verified via code review)
✅ Thurgood prompt references `governance-check.sh --full` for monthly health check
✅ Process-File-Organization cross-reference points to correct MCP query
✅ All changes approved by Peter via ballot measure

## Success Criteria Verification

✅ Governance health check date in Start Up Tasks
✅ All agents' sessions can detect overdue health check (single file, `inclusion: always`)
✅ Monthly health check procedure documented in Thurgood's prompt
✅ Governance process cross-references in Process-File-Organization
✅ All governance processes documented and discoverable

## Related Documentation

- [Task 5 Summary](../../../../docs/specs/099-civitas-formalization/task-5-summary.md)
