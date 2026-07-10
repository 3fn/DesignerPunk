# Task 7 Completion — Five per-lane did-it-really-run guards

**Spec**: 125-A — PR Gate + Mechanical Arming
**Type**: Implementation · **Validation**: Tier 2
**Date**: 2026-07-10
**Branch**: `task/125-A-7-lane-guards` (PR #44)

---

## What was wired (ratified Tasks 6–9 v2)

| Lane | Guard | Floor / assertion (derived 2026-07-10) |
|---|---|---|
| lane-functional-root | `--listTests` selection floor | **300** (from 377 resolved test files) |
| lane-mcp-server-suite | `--listTests` selection floor | **25** (from 36) |
| lane-application-mcp-server-suite | `--listTests` selection floor | **15** (from 23) |
| lane-typecheck *(ratified scope extension)* | resolved-project-file floor via `tsc --listFilesOnly` | **400** (from 818 non-node_modules files) |
| lane-build-validate *(ratified scope extension)* | execution assertion | success sentinel present **∧** `Total checks ≥ 1` (script reports 3) |

Every guard **prints its resolved selection** (file list / count + sample) into the job log — the STACY R1 correct-scope evidence form: the floor proves non-empty; the recorded list proves the *right* scope. Floors sit at ~60–80% of derived counts (drift alarms, not precise counters); re-derive on legitimate large shrinkage. Req 8 rider landed: `actions/checkout` + `actions/setup-node` v4 → v5 (the Node-20 deprecation warnings are gone as of PR #44's runs).

## Prove-it-bites evidence (Req 7 AC3 — per-lane, across two scratch runs on PR #45, closed unmerged)

**Run 1** — [29099499882](https://github.com/3fn/DesignerPunk/actions/runs/29099499882) (tsconfig narrowed to nonexistent; `build:validate` gutted to `echo`; jest selections "emptied" with a jest-30 flag):
- ✅ `lane-typecheck` FAILED at **"Selection floor — resolved project files ≥ 400"** — the narrowed-tsconfig silent-green is dead.
- ✅ `lane-build-validate` FAILED at **the execution assertion** — a gutted/no-op validation cannot green.
- ⚠️ Two proof defects caught BY the bites run (see Lessons).

**Run 2** — [29099719465](https://github.com/3fn/DesignerPunk/actions/runs/29099719465) (proven trips reverted; jest selections emptied version-proof via `--testPathIgnorePatterns='.*'`):
- ✅ `lane-functional-root` FAILED at **"Selection floor — resolved test files ≥ 300"**.
- ✅ `lane-mcp-server-suite` FAILED at **"…≥ 25"**.
- ✅ `lane-application-mcp-server-suite` FAILED at **"…≥ 15"**.
- ✅ `lane-typecheck` + `lane-build-validate` back to GREEN — double-proof run 1's failures were caused by exactly their trips.

**Positive proof**: PR #44's own checks — all five lanes green WITH guards active on the healthy repo.

## Lessons the bites run itself caught (why per-lane bites was the right ratification)

1. **A masked bite is not a bite.** Run 1's functional-root failed at its *build* step (the tripped tsconfig broke the build first) — red, but the floor was never exercised. A blanket "the lane went red" reading would have recorded a proof that didn't exist. Round 2 isolated the trip.
2. **Emptying mechanics are jest-version-dependent.** Root runs jest 30 (`--testPathPatterns`); both sub-packages run jest 29, which *silently ignored* the jest-30 flag — both lanes stayed green with full selections in run 1. The version-proof emptying is `--testPathIgnorePatterns='.*'`. Recorded for future bites maintenance: the sub-package/root jest major-version split (29/30) is a live divergence.
3. Local smoke of the exact guard bash (all five, pre-push) caught quoting issues before CI did — keep doing that.

## Verification
- All five guard scripts smoke-run locally with the exact workflow bash before push (818 / 377 / 36 / 23 / checks=3 — all floors PASS on healthy repo).
- YAML parse clean; PR #44 checks green (positive proof); two bites runs recorded above (negative proof).
- Scratch PR #45 closed WITHOUT merging; branch deleted.
