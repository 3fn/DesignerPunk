# Task 19 Summary: The install doc, and the Integration Guide reconciled into it

**Date**: 2026-10-13
**Purpose**: Concise summary of Task 19 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Task 19 makes one document the install doc. The guide holds it, and the package ships a copy.

- **The Integration Guide opens with a marked install region.** It contains the release-3 scope sentence, prerequisites, the two postures (CONSUME without `init`; BECOME by `init`), § Platforms with Web, iOS and Android siblings, the joining paths, CI needs and ownership. Everything else sits under one `## Reference` heading.
- **`docs/consumer/INSTALL.md` is a committed copy** derived from the region by `scripts/derive-install-doc.ts`, with a byte-identity test.
- **The README's Getting Started** carries the scope sentence, the five founder steps, an "Install guide" link, and the native labels.
- **`scripts/__tests__/install-doc.test.ts` (60 tests)** asserts:
  - the path-step counts and the C23 heading order;
  - the 119-B lint;
  - the CONSUME re-entry guard, with CLI strings imported, never written as literals;
  - the markers and region identity;
  - the scope sentence on all three surfaces;
  - zero stale-scope strings;
  - heading reachability in the docs MCP.
- **The reference remainder was swept**: removed or corrected, never polished. Each section was reviewed against source by its owner (Leonardo, Ada, Lina, Kenya, Data, Sparky, Thurgood), and Leonardo's whole-document review was folded.
- **B-U3** records the change and preserves #268's eight content points.
- **At close**: step 2 now names `--name` and `--abbreviation`, which `init` needs when no one can answer its prompts.

## Why It Matters

A founder, a joiner and a reader each get one numbered path. The copy that ships agrees with the guide by test, and the native platforms are labelled honestly instead of being implied.

## Evidence and Limits

- **Results**:
  - `test:scripts`: 408 passed. `install-doc.test.ts`: 60 passed. Citations and metadata: clean.
  - Parity: parent 19 PASS.
  - Lina's merged-tree run: `npm test` 9550, `tsc` 0.
- **Partial**:
  - `rebuild_index` runs after merge (the orchestrator's).
  - Running Component Tests cannot teach `@3fn/core/testing` until the Jest preset issue is decided.
  - The build-claim strings await Peter's ruling.
  - The lock's input closure is stale after the step-2 fix; a guard refresh is owed before the U3 PR.
- Full record: `.kiro/specs/123-consumer-distribution/completion/task-19-completion.md`.
