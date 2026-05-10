# Spec Feedback: Tasks

**Spec**: 105-component-test-preset
**Phase**: Tasks
**Created**: 2026-05-10

---

### Context for Reviewers
- [To be populated before tasks review]

---

## Ada — Tasks Review (2026-05-10)

**Verdict**: Approve with minor concerns

### Strengths

1. **Bottom-up ordering is correct.** Source files (Task 1) before package exports (Task 2) before consumer-facing scaffolding (Task 3). Each parent task is independently committable — good for incremental delivery.

2. **Agent assignments are clear.** My three subtasks (1.2, 2.1, 3.1) are well-scoped with explicit deliverables and requirement traceability. No ambiguity about what I own vs what Lina owns.

3. **Task 1.2 (Jest preset) is well-specified.** The design doc provides the exact implementation. The requirement mapping (1.1–1.7) covers all preset concerns. The `path.resolve(__dirname, 'style-mock.js')` approach for CSS mock resolution is correct — it resolves from the compiled `dist/testing/` location, not the consumer's project root.

4. **Task 2.1 (package exports) has good verification steps.** `npm run build` + `npm pack --dry-run` is the right validation sequence. The explicit "do NOT use blanket `dist/`" instruction prevents accidental over-publishing.

5. **Task 3.1 (init scaffolding) builds on existing patterns.** The `createFileIfNotExists` helper already exists in `init.ts`. The task is additive — two new file scaffolds and updated console output. Low risk.

6. **Requirement traceability is complete.** Every subtask maps to specific requirement IDs. No orphaned requirements visible for my assigned tasks.

### Concerns

1. **Task 1.2: `style-mock.ts` compiles to `module.exports = ''` — but TypeScript will emit this differently.** The source `module.exports = ''` in a `.ts` file with `module: "commonjs"` in tsconfig will compile to `"use strict"; module.exports = ''; Object.defineProperty(exports, "__esModule", { value: true });` (or similar). The task says "verify preset compiles to valid JS after `tsc`" which is good, but the success criteria says "compiles to `module.exports = ''`" — that's not literally what tsc will produce. The mock will still work (Jest just needs a module that resolves to a string), but the success criteria wording is slightly misleading. **Suggestion**: Reword to "compiles to a JS file that exports an empty string when required."

2. **Task 2.1: The design doc shows `"./testing"` export with `import` and `require` both pointing at the same `.js` file.** This is fine for CommonJS output (our tsconfig uses `module: "commonjs"`), but the `import` condition is technically redundant when both resolve to the same file. Not a blocker — just noting it's intentional duplication for forward-compatibility if we ever ship ESM.

3. **Task 2.1: `files` entries in the design doc vs the task description differ.** The design doc (Section 5) shows blanket `"dist/testing/"` in the files array, but the task explicitly says "Do NOT use blanket `dist/` — maintain granular file patterns" and lists individual files. The task is correct (matches existing package.json style), but the design doc contradicts it. **Suggestion**: Flag this as a known design-doc inconsistency so implementers follow the task, not the design doc.

4. **Task 2.1: Missing `dist/testing/style-mock.d.ts` from the files list.** The task lists `dist/testing/style-mock.js` but not its declaration file. Since `declaration: true` in tsconfig, tsc will produce a `.d.ts` for it. It's not strictly needed (no one imports the mock directly), but for completeness it should either be listed or explicitly noted as intentionally excluded.

5. **Task 3.1: No dependency on Task 2.1 is stated.** Task 3.1 scaffolds `jest.config.js` that does `require('@3fn/core/jest-preset')`. This only works if the package exports are wired (Task 2.1). The tasks are in separate parent tasks (Task 2 before Task 3), so ordering is implicitly correct, but an explicit "depends on 2.1" note would prevent confusion if someone tries to implement 3.1 in isolation.

6. **Task 1.2: The `tsconfig.test.json` reference in the preset.** The preset hardcodes `tsconfig: 'tsconfig.test.json'` — this file doesn't exist until Task 3.1 scaffolds it in the consumer repo. This is correct behavior (the preset is for consumers, not for core), but the verification step "verify preset compiles to valid JS after `tsc`" could be misread as "verify the preset works end-to-end." **Suggestion**: Clarify that Task 1.2 verification is compilation only; end-to-end verification (consumer can actually run tests) is Task 3's success criteria.

### Summary

The tasks are well-structured, correctly ordered, and my assigned work (1.2, 2.1, 3.1) is clearly specified with sufficient detail to implement without ambiguity. The concerns are minor — mostly documentation precision issues, not implementation blockers. The one actionable item is the design-doc inconsistency on `files` entries (Concern 3), which should be noted so both implementers follow the task description.

---

## Lina — Tasks Review (2026-05-10)

**Role**: Primary Reviewer & Co-Implementer (assigned Tasks 1.1, 1.3, 1.4, 3.2)
**Verdict**: ✅ Approve

---

### Strengths

1. **Bottom-up ordering is correct.** Source files (Task 1) → package wiring (Task 2) → consumer-facing scaffolding (Task 3). Each parent task is independently committable. No circular dependencies between subtasks.

2. **My assigned tasks are clearly specified.** Task 1.1 lists all 8 utility functions with behavioral expectations (property assignment, error messages). Task 1.3 is a one-liner re-export — appropriately Tier 1. Task 1.4 enumerates specific test cases per utility. Task 3.2 specifies the section location, content requirements, and the stale-source note.

3. **Requirement traceability is present on every subtask.** Each subtask maps back to specific requirement acceptance criteria. This makes validation unambiguous.

4. **Agent assignments respect domain boundaries.** Ada gets the Jest preset (build/config tooling), package.json exports, and init scaffolding. I get the component-facing utilities, validators re-export, tests, and documentation. Clean split.

5. **Validation tiers are appropriate.** The one-liner re-export (1.3) is Tier 1. Implementation tasks with behavioral expectations (1.1, 1.4, 3.2) are Tier 2. Parent tasks with success criteria are Tier 3. No over-engineering.

6. **Design document provides exact implementation code.** Task 1.1 doesn't require me to invent the API — the design doc has the full source for all 8 utilities. I'm implementing a known design, not designing during implementation.

---

### Concerns

1. **Task 1.4: Testing `createComponentFixture` "throws without document" needs a creative approach.** Jest with jsdom always has `document` defined. The test will need either a separate test file with `@jest-environment node` annotation, or a scoped mock of `document` as `undefined`. This is implementable but the task doesn't specify the technique. I'll use the `@jest-environment node` docblock approach — it's the cleanest pattern and avoids fragile global mocking.

2. **Task 3.2 placement instruction says "after Build Your Product"** but the Integration Guide uses `### 7. Build Your Product` as a subsection under `## Setup Loop`. The task should clarify whether the new section is a peer subsection (`### 8. Running Component Tests`) or a new top-level section (`## Running Component Tests`). I'll default to a new top-level `## Running Component Tests` section after the Setup Loop block, since testing is a distinct workflow from initial setup. Will confirm with Peter during implementation if ambiguous.

3. **No explicit dependency arrow from Task 1.1 → Task 1.4.** Task 1.4 tests the utilities from 1.1. The numbering implies ordering, but it's not stated as a formal dependency. Minor — the sequential numbering makes it obvious, and both are within the same parent task.

4. **Task 1.3 "Verify imports resolve after compilation" — deferred verification.** Task 1.3 is Tier 1 (minimal validation). The actual compilation happens in Task 2 when `npm run build` runs. So 1.3's verification step is implicitly deferred. This is fine for a Tier 1 task — just noting the sequencing for clarity.

5. **Agreeing with Ada's Concern 3 (design-doc `files` inconsistency).** The design doc shows blanket `"dist/testing/"` but the task correctly says granular patterns. Both implementers should follow the task description, not the design doc, for this specific point.

---

### Summary

The tasks document is well-structured, correctly ordered, and my assigned work is unambiguous. The bottom-up approach (source → exports → consumer scaffolding) avoids the common trap of wiring package.json before the source exists. Requirement traceability is complete across all subtasks. My two actionable concerns are (1) the `@jest-environment node` technique needed for the "throws without document" test case, and (2) the section-level placement for Task 3.2 in the Integration Guide — both of which I'll resolve during implementation without blocking.

Ready to implement.

---

## Leonardo — Tasks Review (2026-05-10)

**Role**: Informational Reviewer (Product Architecture — consumer perspective)
**Verdict**: ✅ Approve

---

### Milestone Usability Assessment

The core question: does each parent task produce a usable, independently valuable result?

| Milestone | Usable Alone? | Notes |
|-----------|---------------|-------|
| Task 1 complete | Partially | Source exists and tests pass, but nothing is consumable by product repos yet. Useful as a checkpoint — not a shippable increment. |
| Task 2 complete | Yes | Product repos can `require('@3fn/core/jest-preset')` and `import from '@3fn/core/testing'`. A knowledgeable developer could manually wire this up. |
| Task 3 complete | Yes (full value) | `npx designerpunk init` scaffolds everything. Documentation guides developers through the workflow. This is the "it just works" milestone. |

**The ordering is correct.** Each milestone builds on the previous without backtracking. Task 1 alone isn't shippable to consumers, but that's expected for a bottom-up build — it's the foundation that Tasks 2 and 3 expose. The important thing is that Task 2 produces a *functional* consumer experience (manual setup), and Task 3 produces a *frictionless* one (automated setup + docs).

---

### Cross-Platform / Product Architecture Observations

1. **Consumer ergonomics are well-considered.** The one-line `jest.config.js` spread pattern (`...require('@3fn/core/jest-preset')`) is the right DX. Product repos get a working test environment without understanding the internals. This is how presets should work.

2. **The init scaffolding creates the right boundary.** `jest.config.js` and `tsconfig.test.json` live in the product repo (consumer-owned), while the preset and utilities live in `@3fn/core` (system-owned). This means product repos can override preset values without forking — good separation of concerns.

3. **No cross-platform concern here.** This spec is web-only (Jest + jsdom + Web Components). iOS and Android have their own test infrastructure. No cross-platform review needed.

4. **Future product consumption path is clear.** When platform agents (Sparky) implement product screens, the test workflow will be: install `@3fn/core`, run `npx designerpunk init`, write tests using `createComponentFixture` and validators. The tasks produce exactly this path.

---

### One Observation (Not a Concern)

**Task 3's success criteria includes "A product repo can run `npx jest` after following the documented steps."** This is an integration-level verification that requires a scratch repo outside the monorepo. Ada and Lina will need to coordinate on who performs this end-to-end check. The task assignments don't explicitly state who owns this parent-level verification — but since Ada owns 3.1 (the init changes) and it's the last subtask before the parent completes, it likely falls to Ada. Just flagging for awareness.

---

### Summary

Task ordering produces usable results at each milestone. The progression from "source exists" → "package is consumable" → "developer experience is complete" is the right sequence. No architectural concerns from the product consumption perspective. Ready for implementation.
