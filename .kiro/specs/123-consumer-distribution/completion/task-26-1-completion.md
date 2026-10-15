# Task 26.1 Completion: Commit the two fixtures, born from the packed artifact

**Date**: 2026-10-15
**Agent**: Leonardo (Opus), PRIMARY on Task 26 — operator
**Branch**: `task/123-u5-closeout` (committed by the orchestrator as `23be48ee1`)

## What changed

- **New**: `tests/onboarding-trio/fixtures/born-cc/` (203 files; tree hash `9fd504ab866d`).
  - Source: `trio-1-backend`'s born repo at Dana's commit `3726486` (branch `designerpunk-setup`; `init --target=cc` from candidate `aa3efdcf…`), minus `.pack/`.
  - It keeps `design-tokens/`: COMMIT-POLICY commits platform output by default.
- **New**: `tests/onboarding-trio/fixtures/born-kiro/` (207 files; tree hash `64bb4c21efc3`).
  - Source: `trio-3-pm`'s born working tree (`init --target=kiro`). Excluded: `node_modules/`, `.pack/`, `token-index/`, `.designerpunk/`, and `mcp-server/` (logs).
  - It keeps `dist/tokens/` (policy default), Priya's `product/overview.yaml` and consumer-Leonardo's `specs/home-tool-browse/`.
  - Chosen over `trio-2-designer` because it is a product repo with a named product and a first spec.
- **New**: frozen prompts `validation/prompts/join-cc-to-kiro.md` (Mei on Kiro; query `--agent thurgood`) and `join-kiro-to-cc.md` (Jordan on Claude Code; query `--agent stacy`).
- **Protocol** `tests/onboarding-trio/protocol.md` § 14, "Join runs": what a join run is, the join record schema (J1–J21) with its schema check, the output map, and Peter's launch blocks. Written under Task 25's grant for this file (orchestrator ruling 2026-10-15).

## Targeted check and result

- `git check-ignore -v` over both fixtures: 9 files are caught by the repo's root `.gitignore` (`born-cc/.mcp.json`; `born-kiro/dist/tokens/*` ×8). The orchestrator force-added them, and `git ls-files` shows all 9 tracked at `23be48ee1`.
- The fixtures are outside every jest config's roots, every tsconfig `include`, the package `files`, and the diff guard's input closure.
- Every § 14.4 block passes `zsh -n`.
- The prompt-marker extraction returns non-empty `JOIN` and `QUERY` bodies.

## Application-time adaptations

- The orchestrator ruled "clone twice" for the C8(c) probe, so `join-cc-to-kiro` uses a separate probe clone.
- I removed one steering sentence from both prompts before they were committed ("Don't change the team's design system").
- **Residual**: `born-cc/CLAUDE.md` `@`-imports consumer identity docs. Claude Code loads nested `CLAUDE.md` files lazily, so a session in this repo that reads files under the fixture could pick them up.
