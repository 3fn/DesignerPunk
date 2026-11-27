# complete-task.sh commits carried no Agent / Co-Authored-By trailers

**Owner**: Thurgood
**Status**: closed by the fix branch `fix/complete-task-trailers`

Not a regression from #740. At `beccbf134` and at `main` the commit was `git commit -m "$MESSAGE"` (plus `-m "$ADDED_TRAILERS"` for `--add`); the tool never added agent trailers. `--agent` only fed the PR body.

Fix: the commit's final paragraph now always carries `Agent: <--agent>` (required: a missing `--agent` with `DP_AGENT` unset is a refusal before any git change, never a default to Peter) and any repeatable `--trailer "K: V"`. Callers pass `--agent <Name> --trailer "Co-Authored-By: <model> <noreply@anthropic.com>"`. No test added (the tool has no harness); verified by `bash -n` only.

After this merges, every caller must pass `--agent`, or set `DP_AGENT`. Any seat running `complete-task.sh` without it will be refused.

**Outcome 2026-11-27** (Thurgood, owner, rule 5): closed at the merge of `fix/complete-task-trailers`, #756 (`0c20afa0c`, merged 2026-11-08T01:29:39Z). At `3a3bd072b`, `.kiro/hooks/complete-task.sh` always writes `Agent: <--agent>` into the commit's final paragraph (L721) and accepts a repeatable `--trailer` (L377). The record was filed in its own fixing PR with no `**Class**:` line and no Trigger token, which is a rule 1 and rule 12 finding on this owner, found at the monthly walk (`.kiro/docs/civitas-health-checks/2026-11-27.md`). Archived in the walk's PR.
