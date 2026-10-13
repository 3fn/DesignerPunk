# Task 22 Summary: Personal note, `init` UX completion, product scaffold, and DD9 (U3 gating parent)

**Date**: 2026-10-13
**Purpose**: Concise summary of Task 22 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Task 22 gives a consumer a personal note that is created for them, an `init` that finishes the job, and a product scaffold that cannot clobber their work. It is the gating parent of unit U3: its completion opens the U3 PR.

- **Mechanism B personal note.** `generate` creates `.designerpunk/personal-note.local.md` from a template when it is absent (an all-`TODO` note counts as absent), prints its name, and `sync` offers it to repos born before the feature. Leonardo's template and approved `example-home.yaml` are the content; the shared logic is `src/cli/shared/personalNote.ts`.
- **`init` UX completion.** The error catalog, the attach path and the `init` flow name the next step in each outcome; the product scaffold (`src/cli/templates/product/**`) is guarded so an existing product is never overwritten.
- **Starter specs and the CHANGELOG.** The release-3 entry (planned, above 15.0.0) carries the born-repo fix, the G2 CHANGELOG-HOLDS block byte-equal, and four Known limitations, including two newly found by the 22.4 walk (C-1, C-2).
- **22.4 walk and 22.5 DD9.** The fresh-install walk is recorded, with its widened no-overlap check; Peter's ruling A (2026-10-13) waived one `package.json` hit once and narrowed Task 29's input-set entry to its `scripts` block. Leonardo's DD9 record is committed, and the G2 backstop holds (`31a8c9194` is an ancestor of `HEAD`).

## Why It Matters

A consumer's first run should leave a personal note, a repo that knows what to commit, and an error that names the next action. These make the onboarding path true by construction rather than by luck.

## Evidence and Limits

- `npm test` 395 suites / 9550 passed; `test:scripts` 408; `test:agent-generator` 1686; `test:consumer` 53 passed, 1 skipped; `mcp-server` 612; `application-mcp-server` 432; `tsc` clean; no-write guard `no-op-green`; completion-criteria parity PASS for parent 22 (28 of 28 evaluated).
- `test:pack-contents` 103/105: two failures in the pre-existing in-repo-`generate` contamination class (`.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md`).
- **Open with Peter**: #312 rows 2 and 8, the build-claim strings, the jest preset (#300), the `.gitignore` markers-missing remedy. One criterion row (the tripwire line in the PR body) is satisfied by the PR body at open.
- Tripwire: declared 16, now 18; parents unchanged; successor branch: none.
- Full record: `.kiro/specs/123-consumer-distribution/completion/task-22-completion.md`.
