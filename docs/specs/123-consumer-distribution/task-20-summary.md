# Task 20 Summary: The commit policy and the `.gitignore` managed block

**Date**: 2026-10-12
**Purpose**: Concise summary of Task 20 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Task 20 tells a consumer which files to commit and which to regenerate, and makes the repo enforce the second half.

- **`docs/consumer/COMMIT-POLICY.md`** reproduces design C24's two-column table (14 repo-state items; `token-index/` and `.designerpunk/` regenerated or local), asserted item for item by `commit-policy.test.ts`. It ships as an explicit `files[]` path with its `pack-assert` row (22.3b, Ada).
- **`init` emits a `.gitignore` managed block** that ignores exactly `token-index/` and `.designerpunk/` and carries, commented, the platform-output path from the consumer's own config. Two configs are tested; a config that will not load gives a report and no block, never a guessed path. The block's content is computed once in `src/cli/shared/gitignoreRegion.ts` and shared by `init` and `sync`.
- **`sync` round-trips the block** with every outside line byte-unchanged, and **offers it to repos born on 15.0.0** (PR-9): only when git is not already ignoring `.designerpunk/`, as its own `[y/N]` question (default No), and as a report that writes nothing when nobody can answer.
- **A fresh clone of a policy-applied repo** runs joining steps 2–4 from the packed install: `npm install` and `generate` succeed, and `generate` creates `.designerpunk/personal-note.local.md`. The fixture is built at test time; nothing is committed.

## Why It Matters

Without a policy, "clone, install, generate" is true for one founder and false for the next. Without the block, a routine `git add .` can commit a person's personal note. Together they make the joining path true by construction.

## Evidence and Limits

- `npm test` 9550 passed; `npm run test:scripts` 404; `npm run test:consumer` 53 passed, 1 skipped; `mcp-server` and `application-mcp-server` suites green; `tsc` clean. `test:pack-contents` fails three assertions in the pre-existing in-repo-`generate` contamination class, unrelated to this task.
- **Open with Peter**: someone who removed the `.gitignore` block on purpose sees the "markers missing" row on every `sync` (a remedy exists: list `.gitignore` in `.designerpunkignore`). Not a criterion failure.
- Unverified: the interactive prompt on a real terminal; CC's `@`-import of the new note on a fresh clone (U5).
- Full record: `.kiro/specs/123-consumer-distribution/completion/task-20-completion.md`.
