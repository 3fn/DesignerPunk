# Spec Feedback: Tasks

**Spec**: 104-token-source-portability
**Phase**: Tasks
**Created**: 2026-05-09

---

### Context for Reviewers
- Design approved by Ada — no blocking issues, three implementation notes carried forward
- Bottom-up ordering: refactor token files → component loader + subpath → init + lint boundary
- 3 parent tasks, 9 subtasks total
- All assigned to Ada (pipeline/token owner)
- Regression gate: token values identical before/after, full test suite passes

---

### Ada — Tasks Review (2026-05-09)

**Verdict**: Approve. Task decomposition is correct, ordering is sound, and each subtask is appropriately scoped.

---

#### Strengths

1. **Bottom-up ordering is right.** Refactor token files first (Task 1) so the lint boundary (Task 3.4) passes immediately when added. If we added the lint boundary first, it would fail until the refactoring is done.

2. **Task 1 is tiny and low-risk.** Two files, two mechanical changes, regression verified by existing tests. Good warm-up before the more complex Task 2.

3. **Task 2 correctly separates subpath export (2.1) from loader implementation (2.2) from CLI wiring (2.3).** Each is independently testable.

4. **Task 3 groups all init changes together.** This makes sense — init is a single file with interrelated copy operations. Splitting init changes across multiple parent tasks would create merge conflicts.

5. **Task 1.1 notes "confirmed: `value`, `derivation`"** — this addresses my design concern #5 about the inline shape. Good that it was verified before task planning.

---

#### Concerns

**1. Task 2.3 — "import() and require() share cache under tsx CJS registration"**

This bullet point is a note-to-self, not an action item. It's important context (the module cache mechanism), but it reads oddly as a task bullet. Consider moving it to the completion doc as a "key mechanism" note rather than a task step.

Not a blocker — just a readability nit.

**2. Task 3.1 — Removing `rewriteTypeImports` may break existing product repos**

If a product repo was scaffolded with 11.2.1's init (which applied `rewriteTypeImports`), their token files already have `@3fn/core/types` imports. After this spec, new inits ship `src/types/` and use relative imports. The two approaches are compatible (both work), but it's worth noting: existing product repos with `@3fn/core/types` imports will continue to work (the subpath export still exists). New product repos will get relative imports. No migration needed.

Just confirming this is a non-issue — the two import styles coexist peacefully.

**3. Task 3.2 — Regex verification (design concern #3)**

The task says "rewrites `../build/tokens` patterns to `@3fn/core/build`" but doesn't explicitly mention verifying whether any files use specific-file imports (e.g., `from '../../build/tokens/defineComponentTokens'`). 

**Recommendation**: Add a bullet to 3.2: "Verify no component token files import specific files from `build/tokens/` (vs the barrel). If found, extend regex to handle."

**4. Task 3.1 — Theme files**

My design concern #4 asked whether init copies theme files. The task doesn't address this. If the generated config references `./src/tokens/themes/dark/SemanticOverrides.ts`, init must copy those files.

**Recommendation**: Either add a bullet to 3.1 confirming themes are already copied by existing init logic, or add theme copying if it's missing. This should be verified during implementation — if themes aren't copied, the generated config will produce import errors.

**5. Missing: Integration test for the full flow**

Task 2.3 says "Verify: edit a primitive value locally, confirm component token output reflects the change." This is the critical integration test, but it's listed as a verification step, not a test that lives in the codebase.

**Recommendation**: Consider adding a persistent integration test (similar to `ProductRepoSimulation.test.ts`) that:
1. Creates a temp directory with local token source
2. Modifies a primitive value
3. Runs the pipeline
4. Asserts component token output reflects the modified value

This would catch regressions if the module cache mechanism ever breaks (Node version change, loader change, etc.). Could be added as part of Task 2.3 or as a separate subtask.

---

#### Minor Notes

- Task ordering within parents is correct (2.1 before 2.2 before 2.3 — each builds on the previous)
- Validation tiers are appropriate (Tier 1 for setup tasks, Tier 2 for implementation)
- The lint boundary negative test (Task 3.4: "verify test would FAIL if a forbidden import is re-added") is a good practice — confirms the test actually catches violations

---

#### Summary

Clean task breakdown. Ready to implement. The five notes above are implementation awareness items:

1. Module cache note in 2.3 is context, not action (readability nit)
2. `rewriteTypeImports` removal is safe (existing repos unaffected)
3. Verify regex coverage for specific-file imports in 3.2
4. Confirm theme files are copied by init in 3.1
5. Consider a persistent integration test for the module cache mechanism

Approve to proceed to implementation.

---

### Leonardo — Tasks Review (2026-05-09)

#### [LEO R1]

**Verdict**: Approve to proceed to implementation.

**Perspective**: Product architect. My review focuses on whether the task ordering produces a usable pipeline at each milestone, and whether the integration test coverage is sufficient for the module cache mechanism that makes this all work.

---

#### Strengths

1. **Bottom-up ordering is correct and deliberate.** Refactor first (Task 1), then build the loader (Task 2), then update init and add the lint boundary (Task 3). The lint boundary goes last because it would fail until Task 1 completes — smart sequencing.

2. **Task 1 is low-risk and fast.** Two mechanical inlines, verified by existing tests. Good confidence-builder before the more complex component token loading.

3. **Task 2's separation (subpath → loader → CLI wiring)** means each subtask is independently testable. If the loader has issues, the subpath export is already committed and stable.

4. **Task 3.4's negative test** ("verify test would FAIL if a forbidden import is re-added") is excellent practice. A lint boundary that doesn't actually catch violations is worse than no boundary — it creates false confidence.

5. **Each parent task is independently committable.** After Task 1, token files are self-contained. After Task 2, component tokens propagate locally. After Task 3, init scaffolds correctly and the boundary prevents regression. A platform agent benefits incrementally.

---

#### Concerns

**1. Agree with Ada #5 — a persistent integration test for the module cache mechanism is important**

Task 2.3 has "Verify: edit a primitive value locally, confirm component token output reflects the change" as a verification step. But this is the *single most important behavior* this spec delivers. If it breaks (Node version change, tsx loader update, directory layout change), the entire `tokenSource` story regresses silently.

**My recommendation**: Add a persistent integration test as part of Task 2.3. It doesn't need to be complex:
- Set up a temp directory with local token source (primitives + component tokens)
- Modify a primitive value in the temp source
- Run the pipeline against it
- Assert component token output reflects the modified value

This is the regression gate for the module cache mechanism. Without it, we're relying on manual verification that could be skipped in future changes.

**2. Ada's #4 (theme files in init) — should be verified, not assumed**

The generated config references `./src/tokens/themes/dark/SemanticOverrides.ts`. If init doesn't copy theme files, a freshly-scaffolded product repo will have import errors on first run. Ada flagged this and I agree — Task 3.1 should include a bullet confirming themes are already handled by existing init logic (they likely are, since `src/tokens/` is copied including subdirectories), or adding theme copying if missing.

**3. Task ordering observation: Task 3.3 (generated config) could be done earlier**

The generated config update (`tokenSource: './src/tokens'`, `componentTokens: [...]`) is independent of the init copy logic. It could technically be done as part of Task 2 (since the CLI already supports these config fields after Spec 103). But grouping it with init changes (Task 3) makes organizational sense — it's all "scaffolding" work. Not a concern, just noting the flexibility.

---

#### Product Milestone Assessment

| After Task | Platform Agent Experience |
|-----------|--------------------------|
| Task 1 | Token files load without import errors when `tokenSource` is set (primitives/semantics work) |
| Task 2 | Component token edits propagate locally — full `tokenSource` story complete |
| Task 3 | `npx designerpunk init` scaffolds a working product repo with all paths configured correctly |

After Task 2, the `tokenSource` feature is functionally complete. Task 3 is about making the onboarding experience smooth (init does the right thing) and preventing regression (lint boundary). Both are important, but a platform agent could start using the feature after Task 2.

---

#### Summary

No blocking issues. One strong recommendation (persistent integration test for the module cache mechanism — Ada's #5) and one verification item (theme files in init — Ada's #4). Both are implementation-phase items, not design changes.

Approve to proceed to implementation.

---

### Lina — Tasks Review (2026-05-09)

#### [LINA R1]

**Verdict**: Approve to proceed to implementation.

Task decomposition is correct, ordering is sound, and each subtask is appropriately scoped. All assigned to Ada — no component implementation work here.

---

#### Agreements

1. **Bottom-up ordering** — correct. Refactor first so the lint boundary passes when added. Loader before CLI wiring. Init last (depends on everything else being in place).

2. **Task 1 is trivially low-risk** — two mechanical inlines verified by existing tests. Good starting point.

3. **Task 2's separation** (subpath → loader → CLI wiring) — each independently testable. Clean.

4. **Task 3.4 negative test** — important. A lint boundary that doesn't catch violations is worse than no boundary.

---

#### On Ada's Concerns

**Ada #3 (regex verification)** — I already confirmed during my design review: no component token files use specific-file imports from `build/tokens/`. All use the barrel. The regex is correct as-written. But adding a verification bullet to Task 3.2 is cheap insurance.

**Ada #4 (theme files)** — I also confirmed during my design review: init copies the entire `src/tokens/` directory (including `src/tokens/themes/`). Theme files are already handled. This is a non-issue, but a one-line verification bullet in Task 3.1 ("Confirm `src/tokens/themes/` is included in the token source copy") would prevent future confusion.

**Ada #5 (persistent integration test)** — Agree with both Ada and Leonardo. The module cache mechanism is the critical behavior. A persistent test that modifies a primitive in a temp directory and verifies component token output reflects the change is the right regression gate. This should be part of Task 2.3, not just a manual verification step.

---

#### One Note: `loadComponentTokens` and the `validate` Command

Task 2.3 wires component token loading into `runGenerate()`. But what about `runValidate()` (from Spec 103)? If a developer runs `npx designerpunk validate` with `tokenSource` set, should component tokens also be loaded and validated?

Currently, `validate` checks primitive/semantic tokens only (Spec 103 scope). Component token validation (e.g., "does this component token reference a valid primitive?") is handled by `ComponentTokenValidation` integration tests in core.

**My recommendation**: For V1, `validate` does NOT load component tokens. It validates primitives and semantics only. Component token validation can be added as a future enhancement. But this should be documented — either in the completion doc or as a known limitation.

This isn't a task change — just an implementation awareness note to avoid scope creep during Task 2.3.

---

#### Summary

No blocking issues. One implementation awareness note (validate command doesn't load component tokens — document as known limitation). Agree with Ada and Leonardo on the persistent integration test.

Approve to proceed to implementation.