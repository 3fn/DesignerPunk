# Issue: agent-generator residuals Task 16 could not fix inside its grant — a rootDir error in `tsconfig.json`, an inert MCP SDK in the consumer bundle, and a dead `require` held back only by `--external`

**Date**: 2026-10-01
**Status**: CLOSED 2026-10-02 (see § "Closed — 2026-10-02" at the end of this file)
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

---

## Amendment 2026-10-02 — grant widened for the registry split (item 2c); target corrected; measured facts

*Appended 2026-10-02 by Lina. Nothing above is rewritten or struck; where this section differs from the text above, this section governs.*

### 1. Grant paths widened

**Grant paths** (the original eleven, verbatim, plus three): `tools/agent-generator/tsconfig.json`, `tools/agent-generator/resolve.ts`, `tools/agent-generator/resolve-stdio.ts`, `tools/agent-generator/workflow-rules-guard.ts`, `tools/agent-generator/workflow-rules-accessor.ts`, `tools/agent-generator/generate.ts`, `tools/agent-generator/canonical-vs-truth.ts`, `tools/agent-generator/sweeps/sweep-1-refs.ts`, `tools/agent-generator/__tests__/consumer-entry.paths.test.ts`, `package.json`, `canonical/generated.lock`, `tools/agent-generator/registry.ts`, `tools/agent-generator/registry-manifest.ts`, `tools/agent-generator/consumer-entry.ts`

Scope notes on the three added paths:
- `consumer-entry.ts` — its `./registry` import line ONLY (re-pointed to `./registry-manifest`). No other edit.
- `registry.ts` — moving the manifest half out and re-exporting it, nothing else.
- `registry-manifest.ts` — new; receives the moved manifest half.
- All earlier scope notes stand (`package.json`: the `--external` flag only; `generate.ts`: import re-points only; `canonical/generated.lock`: the `inputClosure` refresh only, and per the Task 18 lock-refresh grant the lock move rides the VALVE-1 refresh, not the fixing PR).

The widened list is activated by Peter's merge of the PR that carries this amendment, and the fixing PR (#259) is diffed against the list as it stands at that merge. The rest of the grant's terms (expiry on the fixing PR's merge; no ratification authority; no governance-law path) are unchanged.

### 2. Target correction

The fixing PR targets the U2b unit branch, `task/123-u2b-profile`, not `main`. #247's body L31 already named that target ("a `chore/` PR into the unit branch before pass four, or after U2b merges and before release 2"; #247 merge SHA `ad17a22a`). The two "to `main`" phrases above (the Trigger paragraph and the last Grant bullet) are superseded. The fixing PR is #259.

### 3. Measured facts, 2026-10-02

- Item 2a's split alone moved `dist/generator/consumer-entry.js` from 917,515 to 917,372 bytes (143 bytes). The "about 890 kB as reported at 16.1" figure above was a different measurement base; 917,515 bytes is the figure at `8ebdae96` before the split.
- The SDK remains in the bundle (three `@modelcontextprotocol` modules): `registry.ts` L34–35 import `Client` and `StdioClientTransport` at top level, and `consumer-entry.ts` L80 imports `declaredToolNames` and `fromManifest` from `./registry`. An esbuild metafile shows `consumer-entry.ts` as the only consumer-closure file that reaches `registry.ts`.
- **Item 2a is NOT fixed** until the bundle-content test asserts no `@modelcontextprotocol` string and that assertion passes. No record may call it fixed before then.

### 4. Item 2c — the registry split

Read against `origin/task/123-u2b-profile` on 2026-10-02 (the manifest half is absent from `main`'s `registry.ts`; the fix is diffed against the unit branch). Line numbers to be re-verified at execution.
- **Move**: the manifest half — `DeclaredTool`, `DeclaredServer`, `ManifestRegistry`, `ToolManifestLike`, `fromManifest`, `declaredToolNames`, L225–291 (section header L225, through `declaredToolNames` at L288) — to new `registry-manifest.ts`. Verified pure: no SDK use, no `fs`/`crypto`/`child-process-guard`, and no helper from the rest of `registry.ts` (`byName` is local to `fromManifest`), so nothing drags the SDK along.
- **Keep**: `registry.ts` keeps the SDK half and re-exports the manifest half from `./registry-manifest`.
- **Re-point**: `consumer-entry.ts` imports from `./registry-manifest` (L80).
- **Test**: the paths test's `fromManifest` spy (L25 `import * as registryModule from '../registry'`, L114 `jest.spyOn(registryModule, 'fromManifest')`) re-points to `../registry-manifest`. It must re-point rather than rely on the re-export: spying on a re-exported binding would not intercept `consumer-entry.ts`'s call, and a compiled re-export is a non-configurable getter. The bundle-content test gains the assertion that the bundle contains no `@modelcontextprotocol` string.
- **Found while verifying (differs from the brief's wording)**: no steward caller imports the manifest half. `git grep` over `tools/`, `src/`, `scripts/` at the unit branch finds those six names only in `registry.ts`, `consumer-entry.ts` and the paths test. `generate.ts`, `canonical-vs-truth.ts` and `sweeps/sweep-6-declarations.ts` import other names from `./registry` (e.g. `serverTable`, `introspectServer`, `assembleRegistry`, `generateRegistry`) and need no change; the re-export in `registry.ts` is a compatibility seam, not something a steward caller needs.
- **Unchanged**: rendered output. `outputs` stays unmoved (`npm run check:122:diff-guard` and `consumer-entry.parity.test.ts` verify); only `inputClosure` moves, and that is deferred to the VALVE-1 refresh.

### 5. Rulings and trigger

Peter, 2026-10-02: "Go with your recommendations on all four" (the fix lands before the Task 18 gate request) and, after the measurement, "Go with A" (finish it before the gate under a widened grant). **Trigger unchanged**: before Task 18.1.

---

## Closed — 2026-10-02

*Recorded 2026-10-02 by Lina, after Spec 123's U2b merged to `main` (PR #262, squash `669b51b0`). Nothing above is rewritten; the Status line is the only edit outside this section.*

**Outcome**: items 1, 2a, 2b and 2c all landed.
- **Fixing PR**: #259, squash `e00a5217` **on the unit branch** `task/123-u2b-profile` (the repo's merge button squashes, so the fix reached `main` inside U2b's squash, #262 `669b51b0`; `e00a5217` itself is not an ancestor of `main`). Its body records the content: the resolver split (`resolve-stdio.ts`), the registry split (`registry-manifest.ts`), `getWorkflowRules()` into `workflow-rules-accessor.ts`, the `--external` flag removed from `build:generator`, and `tsconfig.json`'s `rootDir` widened to `"../.."`. Checked on `main` at `669b51b0`: those three new files exist; `tsconfig.json` has `"rootDir": "../.."`; `consumer-entry.paths.test.ts` L208 asserts `expect(text.match(/@modelcontextprotocol/g) ?? []).toEqual([])`.
- **Grant**: widened by #260 (`823806a2`) to the 14 paths, as the amendment above records. **The grant expired at #262's merge** (README rule 8).
- **Measured** (recorded in #259's body): `dist/generator/consumer-entry.js` 917,515 bytes before; 917,372 after the resolver split alone; **254,539 after the registry split**; `@modelcontextprotocol` occurrences 0 (the no-SDK assertion in `consumer-entry.paths.test.ts`, which now passes). U2b's merge message records a later rebuild from source at 256,691 bytes, 0 `@modelcontextprotocol` hits.
- **Dated correction**: the fix targeted the unit branch, not `main` as the Trigger paragraph and last Grant bullet said (#247 L31 had named the unit-branch target; the 2026-10-02 amendment above corrected the text).
- **Lock move**: deferred by this issue's grant to the VALVE-1 refresh and absorbed by it (`823c583d`, on the unit branch; see `2026-09-30-valve-1-per-trim-spans.md`).
- **Peter's rulings**: "Go with your recommendations on all four" (the fix lands before the Task 18 gate request) and "Go with A" (finish it before the gate under the widened grant).
- **Trigger**: fired as stated (before Task 18.1); the fix merged into the unit branch before G2's request.
