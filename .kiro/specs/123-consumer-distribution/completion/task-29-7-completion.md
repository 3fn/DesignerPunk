# Task 29.7 Completion: full validation

**Date**: 2026-10-12
**Agent**: Lina (Opus), PRIMARY Task 29
**Branch**: `task/123-u3g-g2c2` @ `640d1e94c` (29.6 pushed); worktree, clean tree before and after (the build's `docs/tokens.css` timestamp change reverted).

## What changed
Nothing in code. This subtask only runs the lanes. It adds this doc and the 29.7 tick.

## Results (all measured locally in the U3g worktree)

| Lane | Command | Result |
|---|---|---|
| Root functional suite | `npm test` | **390 suites, 9377 tests, all passed** (exit 0) |
| Type check | `npx tsc --noEmit -p .` and `-p tools/agent-generator/tsconfig.json` | exit 0, exit 0 |
| Agent generator | `npm run test:agent-generator` | **59 suites, 1686 tests, all passed**. Includes `derivation.shipped-profile.test.ts` (169 re-pointed rows evaluated, all VERIFIED), `consumer-entry.parity.test.ts` (16.1) and `operative-set-freshness.test.ts`, all green |
| Scripts | `npm run test:scripts` | **15 suites, 309 tests, all passed** |
| Consumer integration | `npm run test:consumer` (after `npm run build`) | 1 suite, 42 passed, 1 skipped (exit 0) |
| Diff guard, no-write | `runGuard(root, { refreshLock: false })` | **`no-op-green`**, freshness findings 0 (17 records, 373 units) |
| Pack contents | `npm run test:pack-contents` | 92/94 assertions. **The row C7 cites passes**: `attribution sidecars ABSENT: no packed *.attribution.json`. **2 FAIL, see below** |

**The two pack-contents failures are outside U3g's diff, as far as can be read.**
- The failures:
  - `publish path: dist/mcp/application-mcp.js resolves every module from the root node_modules/ — root modules 0; nested roots [application-mcp-server/]`
  - the same for `dist/mcp/docs-mcp.js` with `[mcp-server/]`
- Both are hermetic-publish-path assertions about how the MCP bundles resolve modules. This worktree has `mcp-server/node_modules` and `application-mcp-server/node_modules` installed (the build instructions require it).
- **U3g's diff from the cut** (`git diff --name-only c25470eac HEAD`) touches only `tools/agent-generator/**`, `canonical/**`, `.kiro/agents/**` and `.kiro/specs/**`. It touches no MCP server, no build script and no `package.json`.
- **Not verified**: whether the same two assertions fail at the cut `c25470eac` in this worktree. I did not rebuild the base. This lane is not in Task 29's criterion C9. It is recorded so the unit PR's checks and the release-prep pass can read it.

## Not run
- `npm run test:all`'s performance lanes: no performance system changed.
- The `mcp-server` and `application-mcp-server` suites: U3g touches neither.

## Application-time adaptations
None.
