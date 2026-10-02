# Issue: agent-generator residuals Task 16 could not fix inside its grant — a rootDir error in `tsconfig.json`, an inert MCP SDK in the consumer bundle, and a dead `require` held back only by `--external`

**Date**: 2026-10-01
**Status**: ACTIVE
**Owner**: Lina (both items; Thurgood is consulted only if the PR touches a CI-scope surface, which neither item does)
**Trigger**: **before Task 18.1 requests pass four from Stacy (the G2 request)**, and in any case **no later than the moment U2b's unit PR opens (18.3)**. Why this event, item by item (both are one `chore/` PR to `main`, merged into `task/123-u2b-profile`, as `2026-09-29-emit-skill-trees-dead-helper.md` does):
- **Item 2 (the bundle) is the only item that reaches consumers.** `dist/generator/**` ships from release 2 (the 16.3 `files[]` row). After release 2's RELEASE record, the fix is a patch to installed packages, not a pre-release correction. So the merge into the unit branch must precede the unit PR.
- **Why before G2's request and not just before the PR**: the item 2 fix edits `generate.ts` and moves `canonical/generated.lock`'s `inputClosure` (outputs unchanged). Pass four should read the lock and tree that the unit PR will carry, not one a later PR then moves.
- **Item 1 (the tsconfig) is cosmetic** and could wait for a later named event (Task 19's kickoff is the next one on the plan, U3). I attach it to the same PR only because it is a one-line edit with no other home and the 16.1 completion doc already flagged it; if the PR is slow, ship item 2 first and let item 1 wait.
- **Item 2b (the `--external`) is also cosmetic today**: it is contained and tested (below). It rides with 2a because the split removes the reason for the flag, and splitting is a move of one function.

**Source**:
- My **Task 16.1 completion doc** (`.kiro/specs/123-consumer-distribution/completion/task-16-1-completion.md` on U2b's unit branch): § "Application-time adaptations" item 9 (the `TS6059`), item 7 (the SDK in the bundle) and item 12 (the 16.1 follow-up, CI run 36817484731, commit `d54e8a5c`).
- **Peter's direction** (2026-10-01) that carried items be captured as tracked issues by their owners.

Facts below are read from `origin/task/123-u2b-profile`. Where a size or timing is quoted it is **as reported at 16.1**; I did not rebuild the bundle for this issue.

---

## Item 1 — `tsc -p tools/agent-generator/tsconfig.json` reports TS6059

**Measured fact (read)**: `tools/agent-generator/tsconfig.json` sets `"rootDir": "."` and includes `**/*`. `tools/agent-generator/consumer-entry.ts` imports from `../../mcp-server/src/**` (`rules/workflow-rules`, `indexer/section-parser`, `indexer/frontmatter-parser`, at L81–83) and `../../src/cli/shared/errorCatalog` (L84), all outside that `rootDir`. **As reported at 16.1**: `TS6059` under that config, clean with `--rootDir .` (the CLI flag, from the repo root), and no lane runs the config (ts-jest, tsx and esbuild are unaffected; root `npm run typecheck` is clean).

The old posture was deliberate: `workflow-rules-guard.ts`'s header and `__tests__/workflow-rules-guard.test.ts` both explain that importing `mcp-server/src` is off-limits "because it violates this package's tsconfig.json `rootDir: "."`, TS6059". `consumer-entry.ts` is the first file to cross that line on purpose.

**Fix**: change `rootDir` to `"../.."` (one line). **Counter**: `outDir` is `../../dist/agent-generator`, so widening `rootDir` changes the emit layout if anyone ever emits from this config; nothing does today, but the safer edit is `"noEmit": true` with `rootDir` widened, or deleting the config's emit intent. Choose at the PR (read the callers first: `grep -rn "agent-generator/tsconfig"`).

**Cosmetic?** Yes. It reports an error nobody's lane runs. Its cost is a trap for the next person who runs the config by hand.

## Item 2 — the consumer bundle carries inert MCP SDK client code, and a dead `require` is held back only by `--external`

### 2a. The SDK

**Measured fact (read)**: `tools/agent-generator/pipeline.ts` L27 imports `CorpusResolver, describeUnresolved` from `./resolve`; `consumer-entry.ts` L61 imports `CorpusResolver` from `./resolve` too. `resolve.ts` L30–31 imports `Client` and `StdioClientTransport` from `@modelcontextprotocol/sdk/client/*` and L33 `./child-process-guard`, at the **top level**. Those imports are side-effectful to esbuild, so the SDK modules stay in the bundle although `StdioCorpusClient` and `createStdioDocsClient` (L168, L248) are tree-shaken out. **As reported at 16.1**: the bundle `dist/generator/consumer-entry.js` is about **890 kB**, and the SDK is the inert bulk. What is tested: no introspection or stdio-transport *identifiers* in the bundle, and no process starts (`consumer-entry.paths.test.ts`). What is not measured: the module-evaluation cost of loading the SDK on every `emitConsumer` call.

**Fix (the cleaner one, not a lazy `import()`)**: split `resolve.ts`. The resolver half (the `CorpusClient`/`CorpusToolResult` interfaces, `DocResolution`/`SectionResolution`/`CorpusRef`, `CorpusResolver`, `describeUnresolved`: roughly L36–140) stays in `resolve.ts` with **no SDK import**. The stdio half (`StdioCorpusClientOptions`, `StdioCorpusClient`, `createStdioDocsClient`, L142–end, with the SDK and `child-process-guard` imports) moves to a new `resolve-stdio.ts`. Callers of the stdio half re-point: `generate.ts` (L27, L154, L655), `canonical-vs-truth.ts` (L48, L877), `sweeps/sweep-1-refs.ts` (L35, L257). `pipeline.ts`, `consumer-entry.ts` and the tests that import `CorpusResolver`/`CorpusClient` need no change. A **lazy `await import()`** inside `ensureConnected()` would NOT work: esbuild bundles a literal dynamic import into the output as a lazy chunk, so the SDK would stay in the file. Only the split (or `--external` for the SDK, which would leave a live consumer-side `require` of a package that is a devDependency and absent from the install) removes it.

**Verify**: after the split, the bundle-content test also asserts no `@modelcontextprotocol` string; the byte size is re-measured and recorded in the PR (not guessed here). Existing: `resolve.test.ts` (imports only the resolver half), `npm run test:agent-generator`, `build:generator`.

### 2b. `getWorkflowRules()` and `--external`

**Measured fact (read)**: `workflow-rules-guard.ts` L69–73 holds `getWorkflowRules()` with a literal `require('../../mcp-server/dist/index')`. The same module's `guardCanonicalAgentBodies` (L149) is genuinely needed by `pipeline.ts` (L26) and so by `emitConsumer`'s validation; `getWorkflowRules()` is called only by `generate.ts` (L46, L69). esbuild resolves every literal `require()` in a reachable file before it tree-shakes unreferenced functions, so with `mcp-server/dist` absent (as in CI, which never builds it before `npm run build`) the build failed (run 36817484731). Contained at the 16.1 follow-up (`d54e8a5c`) by `--external:../../mcp-server/dist/index` in `build:generator` plus a bundle-content test (`consumer-entry.paths.test.ts`: zero occurrences of the literal `require`, and the bundle build runs with `mcp-server/dist` moved aside).

**Fix**: move `getWorkflowRules()` out of `workflow-rules-guard.ts` into a new module (for example `workflow-rules-accessor.ts`), imported only by `generate.ts`. `workflow-rules-guard.ts` then holds no `require` of `mcp-server/dist`, the `--external` flag is deleted from `build:generator`, and the bundle-content test stays as the regression guard (its comment is re-worded to say the file no longer exists in the bundle's closure). **`WorkflowRule` type re-export** (L59–61) stays in the guard; the adapters and tests import it as a type from there.

**Cosmetic?** Yes today (a flag plus a test hold it). The risk is the flag silently masking a future reachable `require`; the test catches that, which is why this is not urgent.

## Grant

**Grant paths**: `tools/agent-generator/tsconfig.json`, `tools/agent-generator/resolve.ts`, `tools/agent-generator/resolve-stdio.ts`, `tools/agent-generator/workflow-rules-guard.ts`, `tools/agent-generator/workflow-rules-accessor.ts`, `tools/agent-generator/generate.ts`, `tools/agent-generator/canonical-vs-truth.ts`, `tools/agent-generator/sweeps/sweep-1-refs.ts`, `tools/agent-generator/__tests__/consumer-entry.paths.test.ts`, `package.json`, `canonical/generated.lock`

- `package.json` covers **the `--external` flag in `build:generator` only**. `canonical/generated.lock` covers the refresh of the `inputClosure` hash only (outputs and signed hashes unchanged; the freshness sweep must still pass with no re-sign).
- `generate.ts` is a **ruling-5 file** for Task 16 (not to be edited under it). This grant is a separate act on the fixing PR's branch and covers the **import re-points only**; the rendered output stays byte-identical, which `npm run check:122:diff-guard` and `consumer-entry.parity.test.ts` verify.
- The grant holds on the fixing PR's branch only. It is activated by Peter's merge of a PR whose body names this issue and this path list, and it expires when that PR merges (`.kiro/issues/README.md` rule 8).
- It confers no ratification authority, and it touches no governance-law path.
- The fixing PR is a `chore/` PR to `main`, merged into U2b's unit branch before the unit PR opens.

## Counter-argument and what survives

- **Against doing it at all before U2b merges**: the three items are hygiene, and a `chore/` PR that edits `generate.ts` (a steward-pipeline file) and moves the guard lock inside a unit already carrying 16.2–16.6 adds a second diff for Stacy's pass four to read and a second inputClosure move to explain. Releasing 2 with an 890 kB inert SDK is ugly but not wrong; the installs work. If Peter would rather keep pass four's tree frozen, the honest alternative is **after U2b's merge, before release 2's RELEASE record**: the same fix then lands as one more patch to `main` and ships with release 2. That is a fork about sequencing, not about the fix, and the pick is Peter's.
- **Against the split**: it gives the repo a new file and re-points three steward callers for a saving I have not measured post-fix. If the measured saving is small, the leaner fix is leaving `resolve.ts` alone and documenting the bundle size as a known cost. I would not skip the measurement.

## Not in scope here

Any edit to the files above. This issue is the tracked flag, the measured facts, and the fix shape.
