# Task 3 Summary: Branch Protection + Required Checks v1 Live

**Date**: 2026-07-05
**Spec**: 125-A-pr-gate-mechanical-arming
**Type**: Setup

Branch protection is LIVE on `main`: required checks `Consumer Guard` (consumer-guard.yml) + `Check package name drift` (package-name-drift.yml) — exactly the currently-green armed set, no new checks in Phase 0. `enforce_admins: true`, linear history required, no required reviews (checks-only per Req 1.3), force-pushes and deletions disabled, `strict: false` (up-to-date-branch not required — logged as a bake-in ledger question). Squash-merge configured as the ONLY merge method via API (title = commit subject).

**Prove-it-bites, credential stated**: a direct push to `main` with the ADMIN credential was rejected (`! [remote rejected] main -> main (protected branch hook declined)`) — Req 1.1's admin-enforcement AC satisfied.

Emergency procedure (Req 1.4): Peter lifts protection via Settings → Branches; every use logged in the 125-A findings ledger as `EMERGENCY-BYPASS`.

Details: `.kiro/specs/125-A-pr-gate-mechanical-arming/completion/task-3-completion.md`
