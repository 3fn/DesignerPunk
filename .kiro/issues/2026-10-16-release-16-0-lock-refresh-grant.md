# Grant: Thurgood refreshes `canonical/generated.lock` on the 16.0.0 release PR's branch

**Date**: 2026-10-16
**Status**: ACTIVE (a grant; it does nothing until Peter's merge activates it)
**Owner**: Thurgood — he owns the instrument (register row `never-hand-edit-122-generated`, `verification.owner: thurgood`; the lock is `122-diff-guard`'s own write). Owning the row is not a write-scope grant; this file is the grant (README rule 8). Mirrors `2026-10-14-release-15-1-lock-refresh-grant.md`.
**Trigger**: **the 16.0.0 release PR's branch** (`chore/release-v16.0.0`), after the commit that bumps `package.json`. **Expiry**: when that PR merges.
**Source**: Peter's go for release-3 prep (2026-10-16); Ada's release-prep report (blocker 2: `inputClosure` b8140dd0 → 06340486 from the version bump alone; `outputs` unmoved, checked read-only).

---

**Grant paths**: `canonical/generated.lock`

## Why it is needed
The version bump edits `package.json`, which is in the lock's input closure (`INPUT_CLOSURE_FILES`, `tools/agent-generator/diff-guard.ts`). The release PR therefore moves `inputClosure`; `outputs` is expected to stay unmoved, and the refresh commit says so. A stale `inputClosure` keeps the guard's full path green but denies the C6 no-op to every later PR on `main` until someone refreshes it; one refresh on the release PR is the cheap, precedented form (#253, #271).

## Grant
- **Rule 8.** Activated by Peter's merge of the PR whose body names this file and this path list. **The fixing PR is the 16.0.0 release PR**: the refresh commit lands on its branch (its own commit, after the bump; written by a green `npm run check:122:diff-guard` run, never by hand), and the grant expires when that PR merges. The release PR's body names this file and restates `**Grant paths**: canonical/generated.lock`.
- The refresh commit's message states the `inputClosure` before/after and that `outputs` is unchanged; if `outputs` moves, Thurgood stops and reports instead of refreshing.
