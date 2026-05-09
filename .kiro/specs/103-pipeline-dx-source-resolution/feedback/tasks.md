# Spec Feedback: Tasks

**Spec**: 103-pipeline-dx-source-resolution
**Phase**: Tasks
**Created**: 2026-05-09

---

### Context for Reviewers
- Design approved by Ada — no blocking issues, two implementation notes carried forward
- Lina confirmed `src/` is in `package.json` `files` — resolves Ada's package path concern
- Bottom-up task ordering: config → resolution → generator refactor → CLI → validate
- 3 parent tasks, 7 subtasks total
- All assigned to Ada (pipeline owner)
- Regression gate: `ProductRepoSimulation` tests must produce identical output

---

### Leonardo — Tasks Review (2026-05-09)

#### [LEO R1]

**Verdict**: Approve to proceed to implementation.

**Perspective**: Product architect. My review focuses on whether the task ordering and scope will produce a usable pipeline at each completion milestone, and whether platform agents could pick up the result without confusion.

---

#### Strengths

1. **Each parent task produces a testable milestone.** After Task 1, token resolution works. After Task 2, the pipeline generates correctly with the new architecture. After Task 3, validation is available. A platform agent could start using the pipeline after Task 2 completes — Task 3 is additive, not gating.

2. **Requirement traceability is complete.** Every AC maps to a subtask. No orphaned requirements.

3. **The regression strategy is explicit and correct.** `ProductRepoSimulation` tests are the safety net for Task 2. If the DI refactor produces different output, those tests catch it immediately.

4. **Task 3.1's honesty about new vs reused code** — "new helper, trivial" for `validateRequiredFields`, "reuses registry logic" for family membership, "pure reuse" for the other two. This is the right level of transparency for scoping.

5. **Task 2.2's script update** correctly follows Lina's recommendation (call `loadConfig()`, make it a thin wrapper). Good.

---

#### Concerns

**1. Task ordering within Task 2 — 2.3 could be done with 2.2, not after**

The transparent source display (Task 2.3) is just a `console.log` format change in `runGenerate()`. It depends on `config.tokenSourceRoot` and `config.tokenSourceMode` being available (Task 1.1) and the CLI using `resolveTokens()` (Task 2.2). So 2.3 is naturally part of the same code change as 2.2 — the CLI update.

Not a blocker (the ordering works as-is), but in practice Ada will likely implement 2.2 and 2.3 together since they're both changes to `src/cli/designerpunk.ts`. The separation is fine for traceability but may collapse into a single commit.

**2. No explicit acceptance test for the "complete source, no fallback" behavior (Req 1, AC 4)**

Task 1.2 tests barrel contract verification (missing exports → error). But there's no explicit test for: "local source has `getAllPrimitiveTokens` but returns fewer token families than the package → pipeline uses only local tokens, doesn't silently supplement from package."

This is inherently guaranteed by the DI architecture (the generator only sees what's injected), but an explicit test would document the behavior. Not blocking — the architecture makes fallback impossible — but worth noting for Ada's awareness.

**3. Agree with Ada: smoke test dynamic import FIRST in Task 1.2**

Ada flagged this and Lina endorsed it. The dynamic `import(directoryPath)` resolution under tsx is the one assumption that could invalidate the approach. If it doesn't resolve to `index.ts`, the fix is trivial (append `/index`), but discovering it late means rework. Do it first.

---

#### Product Workflow Readiness

After all tasks complete, the platform agent workflow is:

1. `npx designerpunk generate` → see `Tokens: ./src/tokens (local)` → know which files to edit
2. Edit token files in `./src/tokens/`
3. `npx designerpunk validate` → see per-check results → fix any issues
4. `npx designerpunk generate` → get updated output

This workflow is clear, linear, and self-documenting. No hidden steps, no dual-edit confusion. The original DX problem is fully resolved.

---

#### Summary

No blocking issues. One minor observation about task 2.2/2.3 collapsing in practice, and one note about an implicit guarantee (no-fallback) that could benefit from an explicit test. Neither affects the implementation plan.

Approve to proceed to implementation.

---

### Ada — Tasks Review (2026-05-09)

**Verdict**: Approve. Task decomposition is correct, ordering is sound, and the scope per subtask is appropriately sized.

---

#### Strengths

1. **Bottom-up ordering is right.** Config first (1.1), then resolution (1.2), then generator refactor (2.1), then call sites (2.2), then CLI output (2.3), then validate (3.1, 3.2). Each builds on the previous. No circular dependencies.

2. **Subtask granularity is good.** Each subtask is a coherent unit of work that can be committed independently. None are too large (multi-day) or too small (trivial rename).

3. **Requirement traceability is complete.** Every requirement AC maps to at least one subtask. Good.

4. **The regression strategy is explicit.** Task 2.2 calls out "Verify all tests pass with `npm test`" — the `ProductRepoSimulation` tests are the safety net.

5. **Task 3.1 correctly identifies which checks are reuse vs new code.** "new helper, trivial" for `validateRequiredFields`, "reuses registry logic" for family membership, "pure reuse" for the other two. Honest scoping.

---

#### Concerns

**1. Task 1.2 — "Smoke test that `import(directoryPath)` resolves to `index.ts` under tsx"**

This is the implementation note from my design review. Good that it's called out. But it's listed as a bullet point within the subtask rather than a gating check. If this smoke test fails (i.e., dynamic import of a directory path doesn't resolve to `index.ts` under the project's tsx configuration), the entire `resolveTokens()` approach needs adjustment (append `/index`, use file URL, etc.).

**Recommendation**: Make this the FIRST thing done in Task 1.2, before writing the full implementation. If it fails, the fix is small (path format adjustment), but discovering it late would mean rework.

**2. Task 2.2 — `scripts/generate-platform-tokens.ts` update**

The task says "make it a thin wrapper matching CLI behavior" — calling `loadConfig()` then `resolveTokens()` then `generateTokenFiles()`. This makes the script async (it currently isn't). The script likely has a synchronous `main()` or top-level call.

**Not a blocker** — just noting that the script will need an async wrapper or top-level await. Minor implementation detail.

**3. Missing: Design note about `resolvePackageTokensPath()` and published package structure**

My design review flagged: "Verify whether the published package includes `src/` or only `dist/`." This affects Task 1.1's resolution logic for the package-default case. The task says "Replace current `tokenSourceRoot = cwd` with proper resolution (configured path or `path.resolve(__dirname, '../../tokens')`)" — but doesn't mention verifying the published structure.

**Recommendation**: Add a note to Task 1.1: "Verify that `path.resolve(__dirname, '../../tokens')` resolves correctly for both development (running from repo) and consumption (running from `node_modules/@3fn/core/dist/cli/`). Check `package.json` `files` field."

**4. No explicit task for updating the design-outline feedback file's "Context for Reviewers" section**

The `feedback/design-outline.md` file still has Thurgood's original context. After implementation, it should be updated with resolution notes. This is minor — it's a documentation hygiene item, not a code task. Mentioning it only because the completion documentation bullets reference `.kiro/specs/103-pipeline-dx-source-resolution/completion/` files that don't exist yet.

---

#### Questions (Non-Blocking)

1. **Task 2.2 test update**: The `ProductRepoSimulation.test.ts` calls will change to `generateTokenFiles({ primitiveTokens: getAllPrimitiveTokens(), semanticTokens: getAllSemanticTokens() }, config)`. These tests import `getAllPrimitiveTokens` and `getAllSemanticTokens` directly — which means they still use static imports from the package. That's correct for a unit test (testing the generator in isolation), but worth noting: these tests don't exercise the `resolveTokens()` path. The end-to-end test (if any) would cover that. Is there an e2e test planned, or is the smoke test in 1.2 sufficient?

2. **Completion documentation**: The tasks reference `completion/task-N-completion.md` and `docs/specs/103-pipeline-dx-source-resolution/task-N-summary.md`. Are these created during implementation or do they need scaffolding first? (I know the answer — they're created at completion — but confirming the convention hasn't changed.)

---

#### Summary

Clean task breakdown. Ready to implement. The three notes above (smoke test ordering, script async wrapper, package path verification) are implementation awareness items, not design changes.

Approve to proceed to implementation.

---

### Lina — Tasks Review (2026-05-09)

#### [LINA R1]

**Verdict**: Approve to proceed to implementation.

The task decomposition is sound. Ordering is correct, granularity is appropriate, and requirement traceability is complete. I have no blocking concerns.

---

#### Agreements

1. **Bottom-up ordering** — correct. You can't refactor the generator (Task 2) until the resolution layer exists (Task 1). You can't build `validate` (Task 3) until both resolution and the DI refactor are in place. No parallelism possible here, and that's fine for a 7-subtask spec.

2. **All tasks assigned to Ada** — correct. This is entirely pipeline/token domain work. No component implementation involved.

3. **Regression gate via `ProductRepoSimulation`** — the right safety net. These tests exercise the full generation path and will catch any output drift from the DI refactor.

---

#### Notes (Non-Blocking)

**1. Ada's concern #3 is resolved** — `src/` is in `package.json` `files`

I confirmed this during my design review. `package.json` includes `"src/"` in the `files` array, and the bin entry (`bin/designerpunk.js`) loads `../src/cli/designerpunk.ts` via tsx. So `__dirname` in the CLI is always `src/cli/` whether running from the repo or from `node_modules/@3fn/core/`. The relative path `../../tokens` resolves to `src/tokens/` in both cases. No verification step needed in Task 1.1 — it just works.

**2. Ada's concern #1 (smoke test ordering)** — agree

The dynamic import smoke test should be the first thing in Task 1.2. If `import(directoryPath)` doesn't resolve to `index.ts` under tsx, the fix is trivial (append `/index` to the path), but discovering it after writing the full barrel verification logic would mean adjusting all the import calls. Do it first.

**3. Ada's question #1 (e2e test coverage for `resolveTokens()`)** — the unit tests in Task 1.2 plus the smoke test are sufficient for V1

The `resolveTokens()` unit tests mock dynamic imports and verify barrel contract checking. The smoke test verifies the actual tsx resolution behavior. Together these cover the resolution path. A full e2e test (create a temp directory with token files, run the CLI against it, verify output) would be nice but is scope creep for this spec. The `ProductRepoSimulation` tests cover the generator's behavior with real token data — they just don't exercise the dynamic import path. That's an acceptable gap for V1.

**4. No component-side tasks needed** — confirming

I reviewed the full task list for anything that touches component code. There's nothing. Component tokens remain registry-based, component token files are untouched, and the `ComponentTokenRegistry` interaction is explicitly preserved in Task 2.1 ("Add code comment on remaining theme override static imports"). No action needed from me.

---

#### Summary

Nothing to add. Clean spec, clean tasks, ready for Ada to implement. I'll be available if any component token interaction questions come up during implementation, but I don't expect any.

---

## Resolutions (Thurgood — 2026-05-09)

All three reviewers approve. No blocking issues. Implementation awareness notes:

| # | Note | Source | Action |
|---|------|--------|--------|
| 1 | Smoke test dynamic import FIRST in Task 1.2 | Ada, Lina, Leo | Ordering note for Ada |
| 2 | `scripts/generate-platform-tokens.ts` becomes async (needs wrapper) | Ada | Minor impl detail |
| 3 | Package path verification not needed — Lina confirmed `src/` in `files` | Lina | No action |
| 4 | Tasks 2.2 and 2.3 may collapse into single commit in practice | Leo | Fine for traceability, Ada's discretion |
| 5 | No explicit "no-fallback" test needed — DI architecture makes fallback impossible | Leo | Implicit guarantee, acceptable |
| 6 | Completion docs created at task completion, not scaffolded | Ada Q2 | Convention unchanged |
