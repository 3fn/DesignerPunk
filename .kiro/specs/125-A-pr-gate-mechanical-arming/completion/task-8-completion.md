# Task 8 Completion — The lanes are REQUIRED: promotion + per-lane gate-bites

**Spec**: 125-A — PR Gate + Mechanical Arming
**Type**: Setup · **Validation**: Tier 1
**Date**: 2026-07-10
**Branch**: `task/125-A-8-promotion` (docs; the promotion itself is a platform-settings change with no repo diff)

---

## Promotion + set-assertion (STACY R1 item 5)

The five lane contexts were added to `main`'s branch protection via `PATCH /repos/3fn/DesignerPunk/branches/main/protection/required_status_checks` (2026-07-10). The post-promotion API read — the set-assertion, pasted verbatim:

```json
"contexts": [
  "Consumer Guard",
  "Check package name drift",
  "lane-typecheck",
  "lane-build-validate",
  "lane-functional-root",
  "lane-mcp-server-suite",
  "lane-application-mcp-server-suite"
]
```

**Count-assert: 7 contexts = 2 pre-existing + exactly the 5 intended lanes.** `strict` remains `false` (the Task 5-accepted livability call, finding 4). Task 9 hands the five lane names to 122's `verify-gate-registration.sh` so the monthly count-assert covers them standing.

## Per-lane gate-bites (ratified form, Peter 2026-07-10): five deliberate-failure PRs, each BLOCKED at the platform

| PR | Deliberate failure | Target lane | Lane conclusion | Platform verdict |
|---|---|---|---|---|
| [#46](https://github.com/3fn/DesignerPunk/pull/46) | type error (`const: number = "str"` in a new src file) | lane-typecheck | FAILURE | **BLOCKED** |
| [#47](https://github.com/3fn/DesignerPunk/pull/47) | thrown validation error in `buildValidation.ts` | lane-build-validate | FAILURE | **BLOCKED** |
| [#48](https://github.com/3fn/DesignerPunk/pull/48) | failing test in the root suite's scope | lane-functional-root | FAILURE | **BLOCKED** |
| [#49](https://github.com/3fn/DesignerPunk/pull/49) | failing test in application-mcp-server's scope | lane-application-mcp-server-suite | FAILURE | **BLOCKED** |
| [#50](https://github.com/3fn/DesignerPunk/pull/50) | failing test in mcp-server's scope | lane-mcp-server-suite | FAILURE | **BLOCKED** |

`mergeStateStatus: BLOCKED` captured per PR via `gh pr view --json mergeStateStatus` with the lane concluded FAILURE — each required check proven to block **its** failure class at the platform, not merely to turn red. All five PRs closed unmerged; branches deleted.

## What is now true of this repository

Every PR to `main` must pass, mechanically, before merge: full `tsc --noEmit` · `build:validate` (with execution assertion) · the root functional suite (8987 tests, with selection floor) · both sub-package suites (with floors). Combined with Task 7's did-it-really-run guards, the armed checks can neither be skipped, silently emptied, nor mis-scoped without going red. The authored-but-unarmed era — the load-bearing finding that opened Spec 125 — is over for these five surfaces.

**This completion doc's own PR is the first ordinary-work merge through the fully-armed gate.**
