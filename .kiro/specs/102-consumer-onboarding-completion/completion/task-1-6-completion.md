# Task 1.6 Completion: Integration Test for init.ts Re-runnability

**Date**: 2026-05-07
**Task**: 1.6 Create integration test for init.ts re-runnability
**Type**: Implementation
**Status**: Complete

---

## Artifacts

- **Created**: `src/cli/__tests__/init.test.ts` — 6 integration test cases against real filesystem operations

---

## Implementation Details

### Approach: Real Filesystem Integration, Not Mocking

Unlike the unit-test convention in sibling files (`figma-push.test.ts`, `figma-extract.test.ts` both heavily mock `fs`), this test uses **real filesystem operations against actual temp directories**. Rationale:

- Spec 102's Gap 3 and Gap 5 fixes are filesystem-interaction bugs — they only manifest at the real-fs boundary. Mocking `fs` would test the control flow but miss integration-level failures (e.g., `fs.cpSync` subtleties, path-resolution edge cases, merge-mode recursion correctness).
- The test's value is end-to-end: "run init → verify real files → run init again → verify nothing clobbered." That's only meaningful against actual filesystem state.
- Cost: tests take ~30ms each (real I/O). Acceptable — suite total is 2.18s for all 6 tests.

Structure uses `beforeEach`/`afterEach` for per-test tmp dir lifecycle:

```typescript
beforeEach(() => { scratchDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-init-test-')); });
afterEach(() => { fs.rmSync(scratchDir, { recursive: true, force: true }); });
```

Each test gets a clean scratch directory; each test cleans up its own dir. No shared state, no cross-contamination.

### Test Helper: `runInitIn(scratchDir, args)`

Wraps `runInit` execution: `process.chdir` into scratch → spy `console.log` → `await runInit(args)` → restore cwd → return captured output as joined string. Lets each test assert against structured file state AND emitted output without duplicating the setup dance.

Default args pass `--skip-components --skip-agents` to keep tests fast (token source + steering docs are sufficient to validate Gap 3 merge behavior; components + agents would double test runtime without adding coverage).

### Test Cases (6 total)

**`first run against empty scratch repo`** (2 tests):

1. `creates all expected artifacts` — verifies file-based scaffolds (`.npmrc`, `designerpunk.config.ts`, `product/overview.yaml`), directory copies (`src/tokens/`, `.kiro/steering/`), AND the new `.kiro/settings/mcp.json` from Gap 5.

2. `scaffolded .kiro/settings/mcp.json has both DesignerPunk entries with direct-node paths` — parses the scaffolded JSON; asserts both entries present with `command: "node"`, `args` pointing at `node_modules/@3fn/core/...` bundles, and env vars including `TOKEN_INDEX_DIR` (Gap 2 fix at the template level).

**`re-runnability — second run against populated repo`** (2 tests):

3. `emits "N existing files preserved" summary format verbatim` — the integration-test-contract assertion. Asserts **exact** output strings:
   ```
   ✓ token source: 50 existing files preserved
   ✓ steering docs: 87 existing files preserved
   ```
   Any change to the CopyResult output format in `init.ts` breaks this test, forcing the change to be intentional (per Task 1.4's JSDoc contract).

4. `preserves existing files — no overwrites after second run` — mutates a package-source file between the two runs (simulating consumer edits); asserts the mutation survives the second init. This is the core "consumer customizations are sacred" assertion.

**`first run with pre-seeded customization`** (1 test):

5. `merges package files alongside consumer customizations (Gap 3 scenario)` — the exact scenario that exposed the original bug in Spec 101 Task 2.3 (Peter's `DP-PortfolioSite/.kiro/steering/designerpunk.md`). Pre-seeds a custom file, runs init, asserts both outcomes: the 87 package steering docs are added AND the custom file is preserved.

**`mcp.json scaffold — partial merge (Gap 5 Case 3)`** (1 test):

6. `skips conflicting designerpunk-docs entry with warning, adds designerpunk-application` — validates the partial-merge decision from Task 1.5. Pre-seeds a conflicting `designerpunk-docs` entry; asserts the conflict is preserved (custom path untouched), `designerpunk-application` is added anyway (partial merge delivers value), and the ⚠️ warning message appears verbatim.

### Key Decisions

**Real `mkdtempSync` over in-memory mock fs.** Jest has `memfs`/`mock-fs` options but they add dependencies and complexity. `mkdtempSync` + `rmSync` is native to Node 18+, works predictably, and produces truly-isolated test environments. Per-test cost is ~30ms — acceptable.

**Exact-string assertions, not regex matching.** Per Task 1.4's integration-test-contract design, the summary output format is part of Gap 3's public behavior. `toContain('✓ token source: 50 existing files preserved')` — exact — rather than `toMatch(/token source.*preserved/)` — flexible. The strict assertion forces intentional-only format changes.

**`jest.spyOn(console, 'log').mockImplementation()` to suppress output.** Tests would otherwise flood the test runner's output with init's scaffolding logs. Empty mock impl silences it; `mock.calls` captures for assertion. Restored in `finally` to avoid affecting other tests.

**`console.error` also spied and mocked.** init.ts uses `console.error` for some warnings; even though we don't assert on them, silencing them keeps test output clean.

**No test for Cases 1 and 2 of Gap 5 independently.** Those cases are exercised by other tests — Case 1 (no file) runs during any test that starts with empty scratch (covered by tests 1-2); Case 2 (file without DesignerPunk entries) is conceptually similar to Case 3 but simpler. Chose Case 3 as the single explicit Gap-5 test because it's the highest-value case (protects consumer customizations AND demonstrates partial merge); Cases 1 and 2 are implicitly validated by test 2's mcp.json structure check.

### Validation

- ✅ **All 6 new tests pass**: `npx jest --testPathPatterns='init\.test'` — 6/6 passed, 2.18s total
- ✅ **Full test suite post-addition**: 326 suites / 8,287 tests pass (up from 325/8,281 — delta of 6 matches the new tests)
- ✅ **No regressions**: zero tests went from green to red
- ✅ **Test isolation**: each test uses a fresh `mkdtempSync` dir; no cross-test contamination

### Integration Points

- **Locks in Gap 3 + Gap 5 behavior contracts** — future refactors to `copyDir`/`reportCopy`/`scaffoldMcpConfig` that break the documented output format or behavior will fail this test
- **Validates Task 1.1's template ships correctly** — the mcp.json structure assertion in test 2 verifies the template file is discoverable at runtime (proves the `files`-array addition from Task 1.1 works end-to-end with Task 1.5's scaffold)
- **Runs in CI (`npm test`) alongside everything else** — no special CI configuration needed; uses the existing Jest + ts-jest infrastructure

### Notes

**On test naming convention**: Matches existing `figma-*.test.ts` pattern in the same directory for tool-chain consistency (jest discovery, test path patterns, etc.). The tests inside use `describe`/`test` blocks organized by concern (not by subtask number) for readability.

**On `process.chdir`**: Jest runs tests serially within a suite and in parallel across suites by default. Using `process.chdir` is safe within this suite (serial) but would be unsafe if shared with parallel suites that depend on cwd. Future-proofing: if init ever gains a `dest` parameter that avoids `process.cwd()`, this test can switch to passing that parameter directly and drop the `chdir` dance.

**On the test's own assumption about package-file counts**: test 3 asserts "50 existing files preserved" for tokens and "87 existing files preserved" for steering. These counts are stable features of the current source tree but could drift if tokens or steering docs are added/removed. If a future change breaks these counts, the test will fail with clear counts in the error message — the fix is a one-character edit to the assertion. Worth the trade: hard-coded counts provide strong regression detection; flexible `>= N` assertions would miss small-delta drift that's still worth noticing.
