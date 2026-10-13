# Task 31 Summary: The consumer-profile corrections

**Date**: 2026-10-12
**Purpose**: Concise summary of Task 31 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Task 31 removes the claims, in the consumer agents Kenya (iOS) and Data (Android), that `generate` produces theme code. It also fixes two rendering defects.

- **The ground-truth intro line** no longer calls the build outputs "stale". It reads "never a build snapshot … these generated build outputs" (Lina, `render.ts`).
- **The Kiro `## Ground truth` heading** gets its blank line, inside the heading's own span (Lina, `adapters/kiro.ts`).
- **The "regenerate … including your theme Swift/Kotlin" cue** is removed, not reworded.
- **Both theming units** now say that `generate` produces no theme types today and that DesignerPunk plans to address it (Spec 129, no date).
- **Every other theme-output claim** found by a broad sweep (42 hits) was corrected, or kept with a stated reason.
- **Divergents 6, 8 and 9** got their `subtraction-1` cite in a separate cite-only commit.
- **One re-sign round**: Kenya and Data re-signed their six moved rows in their own commits. The stale list is now 0, and the signing chain passes in both its CI and audit forms.
- **The lock** was refreshed once, by the guard. Its `outputs` moved only inside the three permitted generated roots.

## Why It Matters

A consumer agent that believes `generate` emits a theme surface writes code against types that do not exist. The corrections make the shipped agents describe what 15.0.0 actually produces.

## Evidence and Limits

- **Tests**:
  - `npm test`: 9377 passed. `tsc`: clean.
  - `test:agent-generator`: 1637 passed. `test:scripts`: 309 passed.
  - The diff guard: `no-op-green`. Parity: parent 31 PASS.
- **Open**:
  - The order before U3g can only be checked after merge; Task 29's instrument checks it.
  - Divergents 5, 6, 8 and 9 are carried. Each re-sign is a new act, pending Peter's RS-1 choice.
- Full record: `.kiro/specs/123-consumer-distribution/completion/task-31-completion.md`.
