#!/bin/bash

# TOMBSTONE — hard-fail redirect. DO NOT RESTORE. DO NOT DELETE.
#
# The direct-commit flow this script implemented (commit + bare `git push`, with
# optional file organization) was RETIRED by the ratified workflow-law ballot
# (Spec 125-A Task 1, RATIFIED Peter, 2026-07-05 — Items 1g and 11c). Its
# --organize / --validate-metadata options are folded into complete-task.sh as
# flags. This tombstone never forwards silently (Req 4.3: no silent fallback)
# and performs NO git action of any kind.
#
# LOAD-BEARING, not dead code (ballot Item 1g / Item 13 RECORDS): stale
# instruction paths in pre-gate specs still reference this flow. The hard-fail
# redirect keeps them disarmed until the last pre-gate spec closes.

echo "" >&2
echo "❌ RETIRED: the direct-commit flow was retired by ballot 2026-07-05 (Spec 125-A); use complete-task.sh" >&2
echo "" >&2
echo "   Tasks now complete via branch → PR → merge. Direct pushes to main are" >&2
echo "   rejected by branch protection, admins included." >&2
echo "" >&2
echo "   Parent task:  ./.kiro/hooks/complete-task.sh \"Task <N> Complete: <Description> (<spec>)\" [--organize] [--validate-metadata]" >&2
echo "   Subtask:      ./.kiro/hooks/complete-task.sh --subtask \"<message>\"" >&2
echo "   Organization only (no commit): ./.kiro/hooks/organize-by-metadata.sh" >&2
echo "" >&2
echo "   Law: .kiro/steering/Task-Completion-Protocol.md (Completion State in the PR Flow)" >&2
echo "" >&2
exit 1
