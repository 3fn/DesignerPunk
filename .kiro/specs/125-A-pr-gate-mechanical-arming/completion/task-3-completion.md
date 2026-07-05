# Task 3 Completion: Enable Branch Protection + Required Checks v1

**Date**: 2026-07-05
**Type**: Setup | **Validation**: Tier 1
**Status**: COMPLETE — branch protection LIVE on `main`
**Executed by**: the main loop, via the admin-scoped PAT, 2026-07-05

## Configuration applied

**Squash-only merge, configured via API** (ballot 1a.6 / Stacy AM-6 — method drift closed by configuration, not convention):
- `allow_squash_merge: true`
- `allow_merge_commit: false`
- `allow_rebase_merge: false`
- Squash defaults: title = `PR_TITLE`, message = `PR_BODY` (the PR title becomes the `main` commit subject — title discipline IS commit-message discipline)

**Branch protection on `main`**:
- Required status checks: `["Consumer Guard", "Check package name drift"]`
- `enforce_admins: true` — the gate binds the admin credential too (Req 1.1)
- `required_linear_history: true`
- `strict: false` — up-to-date-branch NOT required before merge. **Recorded as a deliberate bake-in ledger question** (Task 5): does merging slightly-stale-but-green branches ever bite?
- No required reviews — checks-only per Req 1.3 (required-review arrives with 125-B's CODEOWNERS layer)
- Force-pushes: disabled. Deletions: disabled.

## Required-check baseline (Req 2.2 — the set Phase 1a extends)

| Status context | Workflow file | Job |
|---|---|---|
| `Consumer Guard` | `.github/workflows/consumer-guard.yml` | `Consumer Guard` |
| `Check package name drift` | `.github/workflows/package-name-drift.yml` | `Check package name drift` |

Exactly the currently-green armed set — no new checks in Phase 0 (Req 2.1). Not path-filtered (Req 2.3); adding a check = a workflow job producing a named status context + adding that context name to the protection list, nothing else.

## Prove-it-bites record (Req 1.1 — admin enforcement, credential stated)

A direct push to `main` **WITH THE ADMIN CREDENTIAL** was rejected:

```
remote: - 2 of 2 required status checks are expected.
! [remote rejected] main -> main (protected branch hook declined)
```

This satisfies Req 1.1's admin-enforcement AC with the credential stated — a non-admin rejection would prove nothing about the bypass Req 1.1 closes.

## Emergency procedure (Req 1.4)

Peter temporarily lifts protection via Settings → Branches, performs the change, re-enables protection immediately; **each use is logged in this spec's findings ledger** with entry type `EMERGENCY-BYPASS` (date, reason, what was pushed, protection-off duration, follow-up PR). No agent may request the lift as a convenience path.

## Preconditions honored

- Req 4.4 release-flow reconciliation proven BEFORE this task (Task 2: `postpublish` push removed; `verify:token-index-clean` gate in `prepublishOnly`).
- Task 4 staged back-to-back per T-A9 — this doc travels in Task 4's atomic-window PR, written on the task branch per the new law (docs travel with the work).
