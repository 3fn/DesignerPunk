# Design Outline: Consumer Contract Testing

**Date**: 2026-05-12
**Spec**: 106 - Consumer Contract Testing
**Status**: Design Outline
**Author**: Thurgood (governance framing) → Ada (implementation ownership)
**Origin**: Pattern analysis of v11.0.0 → v11.5.2 reactive patches

---

## Problem Statement

Between v11.0.0 and v11.5.2, 10 reactive patches shipped to fix issues that all share a common trait: they worked in the core repo but broke in product repos. The core's 331 test suites validate internal correctness but don't validate the consumer experience. Every failure was discovered by a real consumer (Ada or Lina in test01), not by CI.

**Failure classes not caught by existing tests:**

| Class | Examples | Patches |
|-------|----------|---------|
| Export doesn't resolve from outside the package | `./blend` pointed at dist with unresolvable requires, `./types` missing | 11.2.1, 11.5.1 |
| Export resolves but ts-jest/tsx can't compile it | moduleNameMapper missing for `@3fn/core/*` imports | 11.5.2 |
| Feature works internally but not via the public API | Generator bypassed injected primitives, component token output missing | 11.3.1, 11.3.2 |
| Init produces a broken product repo | Missing types dir, stale imports, wrong config paths | 11.2.1, 11.3.0, 11.4.1, 11.4.2 |

---

## Proposed Solution

Two test layers that catch these failures before publish:

### Layer 1: Export Contract Tests (Fast, Every Commit)

A test file that iterates the `package.json` exports map and verifies each subpath:
- Resolves to a file that exists
- The file can be `require()`'d without errors
- The file exports the expected symbols (named exports present)

This catches: broken paths, missing files, unresolvable internal dependencies.

**Runs in**: `npm test` (fast, part of the standard suite)

### Layer 2: Consumer Integration Test (Comprehensive, Pre-Publish)

A test that simulates the full product repo experience:
1. `npm pack` the current package into a tarball
2. Create a temp directory
3. Install the tarball (`npm install ./3fn-core-*.tgz`)
4. Run `npx designerpunk init` (scaffolds tokens, types, components, configs)
5. Set `tokenSource: './src/tokens'` in the generated config
6. Edit a primitive token value
7. Run `npx designerpunk generate` — verify output reflects the edit
8. Run `npx designerpunk validate` — verify it passes
9. Run `npx jest` (with devDeps installed) — verify tests pass
10. Verify MCP config points at local paths

This catches: everything. If the consumer experience is broken, this test fails.

**Runs in**: `npm run test:integration` or `npm run test:consumer` (slower, pre-publish gate)

---

## Scope Boundaries

### In Scope
- Export contract test file (Layer 1)
- Consumer integration test (Layer 2)
- npm script for running the integration test separately
- Documentation of what each layer catches

### Out of Scope
- Fixing any currently-broken exports (all are fixed as of v11.5.2)
- Source Mode Architecture refactor (Spec 107 — depends on this spec for safety net)
- CI pipeline configuration (tests exist locally; CI wiring is infrastructure work)
- Performance testing of the consumer workflow

---

## Key Design Decisions to Resolve

### Decision 1: Where does the export contract test live?

**Option A**: `src/__tests__/export-contracts.test.ts` (runs with `npm test`)
- Pro: Catches broken exports on every commit
- Con: Adds ~2s to the test suite (require() calls for each export)

**Option B**: Separate test file outside `src/` (runs with a dedicated script)
- Pro: Doesn't slow down `npm test`
- Con: Developers might forget to run it

**Recommendation**: Option A. 2 seconds is negligible in a 50s test suite. Catching broken exports on every commit is worth it.

### Decision 2: How does the integration test install the package?

**Option A**: `npm pack` → install tarball in temp dir
- Pro: Tests exactly what consumers get after `npm publish`
- Con: Slower (~30s for pack + install)

**Option B**: Symlink via `npm link`
- Pro: Faster
- Con: Doesn't test the `files` field (symlink exposes everything, not just published files)

**Recommendation**: Option A. The whole point is testing what consumers actually receive. `npm link` would miss the `files` field issues that caused 11.5.1.

### Decision 3: Does the integration test install devDependencies (jest, ts-jest)?

The full consumer workflow includes running tests. But installing jest + ts-jest + jsdom in a temp directory adds ~60s and network dependency.

**Option A**: Full workflow including test execution
- Pro: Catches test preset issues (11.4.1, 11.4.2, 11.5.2)
- Con: Slow, network-dependent, flaky in CI

**Option B**: Workflow up to `generate` + `validate` only, skip test execution
- Pro: Faster, no network dependency for devDeps
- Con: Misses test preset issues

**Option C**: Full workflow, but devDeps pre-cached in a fixture
- Pro: Fast, no network, still tests the full path
- Con: Fixture maintenance (update when devDep versions change)

**Recommendation**: Option A for the canonical test (run pre-publish, accepts slowness). Could add Option B as a fast variant that runs on every commit alongside the export contract test.

### Decision 4: What primitive edit does the integration test make?

The test needs to edit a token and verify the change propagates. Options:
- Edit a spacing value (simple numeric change)
- Edit a font family (string change, tests categorical tokens)
- Edit a color (tests the most complex resolution path)

**Recommendation**: Edit a spacing value. It's the simplest change with the most predictable output (CSS: `--space-100: 8` → `--space-100: 10`). Easy to assert.

---

## Risks

### Risk 1: Integration test is slow and flaky

`npm pack` + `npm install` + `npx designerpunk generate` in a temp directory takes 30-90 seconds. Network issues, disk I/O, or npm cache state could cause flakiness.

**Mitigation**: Run as a separate script (`npm run test:consumer`), not part of `npm test`. Gate publish on it, but don't block every commit.

### Risk 2: Integration test breaks when package internals change

If the test asserts specific output (e.g., exact CSS content), internal refactors break it even when the consumer experience is fine.

**Mitigation**: Assert behavior, not implementation. "Output file exists and contains the edited value" — not "output file matches this exact snapshot."

### Risk 3: Export contract test gives false confidence

`require()` succeeding doesn't mean the export is *usable* — it might export the wrong things or have runtime errors on first use.

**Mitigation**: The contract test also checks for expected named exports (e.g., `@3fn/core/testing` exports `registerComponent`, `cleanupDOM`, etc.). Not just "resolves" but "resolves and exports what we promise."

---

## Stakeholder Review

- **Ada** (primary): Owns the package, pipeline, and build. Will implement both test layers.
- **Lina** (secondary): Primary consumer of the testing exports. Can validate the integration test covers her workflow.
- **Leonardo** (informational): Product architect. Can confirm the integration test simulates the real product repo experience.

---

## Open Questions

1. Should the integration test also verify MCP server startup (e.g., `npx designerpunk mcp:app` starts without error)? This would catch the MCP config path issues but adds complexity (spawning a server, waiting for ready signal, killing it).

2. Should the export contract test verify TypeScript type resolution (not just runtime `require()`)? This would catch missing `.d.ts` files but requires running `tsc --noEmit` against a fixture file that imports each subpath.

3. Should the integration test run against the *current* source (fast, for development) or only against the packed tarball (slow, for pre-publish)? Or both as separate scripts?
