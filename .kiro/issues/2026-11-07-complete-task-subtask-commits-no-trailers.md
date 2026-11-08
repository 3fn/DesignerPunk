# complete-task.sh commits carried no Agent / Co-Authored-By trailers

**Owner**: Thurgood
**Status**: closed by the fix branch `fix/complete-task-trailers`

Not a regression from #740. At `beccbf134` and at `main` the commit was `git commit -m "$MESSAGE"` (plus `-m "$ADDED_TRAILERS"` for `--add`); the tool never added agent trailers. `--agent` only fed the PR body.

Fix: the commit's final paragraph now always carries `Agent: <--agent>` and any repeatable `--trailer "K: V"`. Callers pass `--agent <Name> --trailer "Co-Authored-By: <model> <noreply@anthropic.com>"`. No test added (the tool has no harness); verified by `bash -n` only.
