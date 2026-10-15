# Task 25.1 Completion: Protocol + committed fixtures + frozen prompts

**Date**: 2026-10-14
**Agent**: Leonardo (Opus), PRIMARY on Task 25 — operator
**Branch**: `task/123-u5-closeout` (first written at `4c875235a`; protocol revised through Runs 1–3)

## What changed

- **New**: `tests/onboarding-trio/protocol.md`, the trio's run protocol:
  - § 3, the closed stop vocabulary: `completed`, `budget-exhausted`, `auth-required`, `harness-error:<what>`, `operator-halt:<reason>`, plus the non-stop `operator-unblock:<reason>` act added after Run 3;
  - § 4, the budget rule;
  - § 5, the isolation mechanism per harness;
  - § 7, the behavioral probe;
  - § 8, the 24-field record schema and the `cold-observation` cell shared with Tasks 26.4 and 28;
  - § 9, the schema-check command;
  - § 10, the source-access audit;
  - § 11, Peter's copy-paste launch blocks;
  - § 12, mechanics settled vs unverified.
- **New**: three committed fixtures under `tests/onboarding-trio/fixtures/`: `a-ts-service` (8 files: `tsconfig.json`, `jest.config.js`, no frontend), `b-static-site` (5 files, no build tooling), and `c-near-empty` (`README.md` only, naming the web product Lendly).
- **New**: three frozen prompts, `.kiro/specs/123-consumer-distribution/validation/prompts/trio-{1-backend,2-designer,3-pm}.md`, committed in `30f72d628` before any run.

## Targeted check and result

- Every shell block in § 11 passes `zsh -n`, and none contains `!`.
- The prompt-marker extraction returns a non-empty body for each prompt (`awk` over the committed files).
- The fixtures sit outside every root jest config's `roots` and outside `tsconfig.json`'s `include` (`src/**`). `test:consumer` matches only `consumer-integration.test.ts`. The package's `files` does not ship `tests/`.
- I dry-ran § 11's host-facts and `hstate` blocks in the session scratchpad before Run 1. A later dry-run against Run 1's out folder is disclosed in `validation/trio-1-backend.md`.

## Application-time adaptations

Each is also a `## Found later` entry in `task-25-instruments.md`:
- **Fixture extraction**: `--strip-components=3` → `=4` (Run 1, step 1).
- **Isolation**:
  - Claude Code: the fresh `HOME` → `CLAUDE_CONFIG_DIR="$R/home/.claude"` with the real `HOME`, after a keychain hazard at Run 1's preflight.
  - Kiro: a decision order at preflight; `KIRO_HOME` held in Runs 2 and 3.
- **`hstate`** narrowed to DesignerPunk-relevant patterns: the plain "designerpunk" match caught the account email.
- **CC turn guard**: `--max-turns` is accepted but not enforced on Claude Code 2.1.300, so the budget is observed only.
- **Captures**: one capture file per interactive session, after Run 2 lost its first open capture to an overwrite.
- **`operator-unblock:<reason>`**: added after Run 3's birth blocked on `init`'s stdin.
