# Task 26 Summary: The two cross-target join runs and the install-doc correction (U5)

**Date**: 2026-10-15
**Purpose**: Concise summary of Task 26 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

- **Two committed born repos**, each born by `init` from the packed release candidate: one for Claude Code and one for Kiro (`tests/onboarding-trio/fixtures/born-{cc,kiro}`).
- **Two teammate joins across agent tools**, each from a frozen prompt, with every session launched by Peter:
  - a Kiro user joined the Claude Code-born repo;
  - a Claude Code user joined the Kiro-born repo.

  Both walked the six-step cross-harness join path without running `init`. In each, an attached agent answered a question about its own role, checked item by item against its rendered charter: Thurgood on Kiro, Stacy on Claude Code. Both read **joined**. The records are `.kiro/specs/123-consumer-distribution/validation/join-{cc-to-kiro,kiro-to-cc}.md`.
- **A cold-observation table** (`validation/cold-observation-table.md`): Claude Code and Kiro, each as founder and as teammate. **All four cells were observed** from a clean state.
- **The install guide now says what each tool actually asks** on first open, in the founder and joining steps (the Integration Guide's install region, with `docs/consumer/INSTALL.md` regenerated from it):
  - **Claude Code** asks you to trust the folder, then to enable DesignerPunk's three MCP servers. Until you trust the folder, it ignores the permissions committed in `.claude/settings.json`.
  - **Kiro** asks nothing.

## What It Found

- **The committed `.claude/settings.json` does not enable the servers for a teammate.** Each clone answers the two Claude Code prompts once, and the answer is stored in `.claude/settings.local.json`, which nothing DesignerPunk writes ignores.
- **A missing personal note's `@`-import fails silently** on a fresh clone.
- **`generate` on a second machine reproduced the committed platform output byte for byte**, in both directions. That is the commit policy's determinism claim, observed.
- **Install-guide gaps outside the observed cells go to a separate fix PR** (Peter's ruling, 2026-10-15). Among them:
  - § 7 doesn't tell a cross-harness joiner to commit what `attach` wrote;
  - `init` hangs in Kiro's shell where the guide says it stops with an error;
  - nothing points from the CLI to the guide.

## Not Changed, and Why

- **The reference posture's step (§ 2, `attach --reference`) keeps the general wording.** No observed cell is the reference posture. Task 28.1's second probe session will observe it.
- **The README's Getting Started list and `init`'s refusal message** keep the general wording. They are not the install guide, so they go to the fix PR.

## Owed After Merge

- **Docs-MCP `rebuild_index`**: `governance/` changed in U5.
