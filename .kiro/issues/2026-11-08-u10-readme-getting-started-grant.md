# Issue: U10's founder path is four steps, and README's "Getting Started" list pins it; the grant

**Date**: 2026-11-08
**Owner**: Thurgood
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/task-15-completion.md` — the event that owes the close is U10's merge, which brings that doc to `main` (Spec 129 Task 15, branch `task/129-15-init-platforms`). The close is this record's rule 5 outcome line, giving the fixing PR's number and the granted-file diff.
**Source**: Spec 129 design § 14 (the founder path drops from 5 to 4, Leonardo's text); `tasks.md` Task 15 criterion on INSTALL's founder path; Thurgood's measurement of 2026-11-08 (below).

---

## What was measured

`scripts/__tests__/install-doc.test.ts` reads README's `## Getting Started` as a path list. At branch head `5e4334aa6` (Task 15.2, `task/129-15-thurgood`), where the Guide and INSTALL carry the four steps and `path-steps: { founder: 4, … }`, 79 of 81 tests pass; the two that fail both read README only:

1. `path-steps › README § "Getting Started": exactly path-steps.founder numbered items, in C23 order`: the README list must have `PATHS.founder` (4) numbered items, each matching the verbatim step text. It has 5, with the old `init --target=…` and `generate` steps.
2. `the approval instruction is harness-agnostic (C4) › every path list ends with it…`: the README list's last item must equal "Restart your agent session so it connects to DesignerPunk."

README is outside Task 15's Primary Artifacts and no charter scope owns it, so the fix needs this grant.

## Step text

LEONARDO consult 2026-11-08: four steps verbatim; the trust/enable sentence after the list; INSTALL's 'Step 4, the restart, and why' already carries it.

---

**Grant paths**: `README.md`, only (a) the numbered list under "**Use it in your project:**" in § "Getting Started", replaced by design § 14's four steps verbatim, and (b) the line directly after the list, `[Install guide](docs/consumer/INSTALL.md)`, replaced by: "On first open, Claude Code asks you to trust the folder and to enable DesignerPunk's three MCP servers: accept both. Kiro asks nothing. ([Install guide](docs/consumer/INSTALL.md))". No other README line changes.

---

## The fixing PR

U10's PR (Task 15, branch `task/129-15-init-platforms`).

## Acceptance

1. The README diff is confined to the two granted regions.
2. The list is exactly the four steps of design § 14, character for character as in INSTALL's § 3.
3. `npx jest --config scripts/jest.config.js scripts/__tests__/install-doc.test.ts` passes in full (81 of 81).

Counter-argument and what survives: the old step 5 told the reader Claude Code asks them to trust the folder and enable three MCP servers, and the four-step text does not. Answered by the sentence after the list, and INSTALL's "Step 4, the restart, and why" carries the full account. What survives: README now says the trust/enable cue in two places (the line after the list and INSTALL), and both have to be kept in step with INSTALL.

---

## Outcome

Open until U10 merges.
