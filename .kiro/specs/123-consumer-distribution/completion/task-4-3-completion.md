# Task 4.3 Completion — The Kiro and CC emitters

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 4 · **Agent**: Lina (Sonnet)

## What changed

### New `src/cli/shared/mcpConfig/kiro.ts`

Extracted Task 2.3's `scaffoldKiroMcpConfig` out of `init.ts`, keeping the SAME output shape and the SAME create/merge-carefully behavior (destination doesn't exist → create; exists with neither entry → merge; exists with one/both already present → skip with a warning). The one thing this module changes is the approval SOURCE:

- `readApprovedToolNames(pkgRoot, serverKey)` reads `dist/mcp/tool-manifest.json` (built by Task 4.2) and returns the tool NAMES that server has `readOnlyHint: true` for. Fails soft (empty list + a console warning), never throws — mirrors `readMcpTemplate`'s existing defensive pattern, since a missing/corrupt manifest should degrade, not crash `init`.
- `scaffoldKiroMcpConfig` now takes the **already-parsed template** (not a path — `init.ts` reads it once and passes the object; see below) plus `pkgRoot`, and attaches a freshly GENERATED `autoApprove` array to each server entry before writing/merging.

### New `src/cli/shared/mcpConfig/cc.ts`

Extracted Task 2.3's `scaffoldClaudeCodeMcpConfig`, same shape (`.mcp.json` with `autoApprove`/`disabled` stripped; `.claude/settings.json` `permissions.allow`). Imports `readApprovedToolNames` (and the two shared types) from the sibling `./kiro` — both files are Task 4's explicitly listed Primary Artifacts, so this is an import between two authorized files, not a new shared module. `permissions.allow` is now built by calling `readApprovedToolNames` once per server key and formatting `mcp__<server>__<tool>` — never read from the template's `autoApprove` field (which no longer exists on the template at all — see below).

### `src/cli/templates/mcp-config.json.template` — disclosed, coupled edit

Not a Task 4 Primary Artifact, but structurally required for 4.3's success criteria to hold (Task 2's own completion doc flagged this file's `autoApprove` arrays as the thing Task 4 would replace). Changed:
- **Removed the `autoApprove` field from all server entries** — left in place it would be a stale, unread, misleading hand-list (exactly Req 5.3's defect: *"generated from the servers' tool registrations, not hand-maintained"*). Retiring it, not just ignoring it, is the actual fix.
- **Added the `designerpunk-product` entry's structural connection info** (`command`, `args: ["./node_modules/@3fn/core/dist/mcp/product-mcp.js"]`, `env: { PRODUCT_DIR: "./product", COMPONENT_DIR: "./src/components", TOKEN_INDEX_DIR: "./token-index" }`, `disabled: false`) — the template remains the single source of truth for per-server connection wiring (command/args/env), which is orthogonal to the tool-manifest-derived approval mechanism this task changes. `COMPONENT_DIR` is set explicitly (matching what `product-mcp-server/src/index.ts` actually reads — singular, not `COMPONENTS_DIR`) so the scaffolded config sidesteps the STALE `DEFAULT_COMPONENT_DIR = 'src/components/core'` fallback flagged as an unclaimed residual in Task 2's completion doc (see "Notes" below — NOT fixed at its source here).

### `src/cli/init.ts` — disclosed, minimal call-site swap

- Added two imports: `scaffoldKiroMcpConfig` from `./shared/mcpConfig/kiro`, `scaffoldClaudeCodeMcpConfig` from `./shared/mcpConfig/cc`.
- Deleted the two inline function BODIES (previously ~160 lines starting at the `scaffoldKiroMcpConfig`/`scaffoldClaudeCodeMcpConfig` definitions) — `readMcpTemplate` (private, unchanged) stays in `init.ts`.
- Step 8's call site now reads the template ONCE (`const mcpTemplate = readMcpTemplate(...)`) and, if non-null, calls both new functions with the parsed template object + `pkgRoot`. This is a genuine (small) behavior refinement bundled with the extraction: the ORIGINAL code called `readMcpTemplate` independently inside each of the two functions, so a broken/missing template printed the "warning: MCP config template not found" line TWICE; reading once now prints it once. No test asserted the duplicate-count, so this isn't a regression against any criterion — disclosed since it's an observable (if minor) output change.
- `init.ts` is NOT a Task 4 Primary Artifact (Task 2's), but the orchestrator's brief explicitly authorized this exact swap ("delete the inline emitters, call the new modules; no other behaviour change").

## Targeted tests + result

`npx jest src/cli/__tests__/init.test.ts` → all pre-existing tests continue to pass at this point (the two-server assertions at the former lines 245/259 still expect the OLD two-key shape and now FAIL, since the product entry is emitted automatically as soon as the template carries it — this is the expected, correct RED that Task 4.4 resolves by making the assertion deliberately three-server, per Req 7.2). See Task 4.4's completion doc for that update and the final green run.

`npx tsc --noEmit` → clean.

## Bites recorded red

**Genuine live-manifest bite (Req 5.4: "WHEN a server's registered tool set changes THEN the generated `autoApprove` list SHALL change with it, with no hand edit required")** — this is the load-bearing property this subtask's approval-generation code exists to provide, so the bite targets it directly rather than a synthetic unit:

1. Backed up `dist/mcp/tool-manifest.json` (`cp` to `/tmp`).
2. Edited the BUILT manifest (not source — `dist/` is gitignored) to flip `designerpunk-docs`'s `rebuild_index` entry from `readOnlyHint: false` to `readOnlyHint: true`, via a small inline Python script.
3. Ran `npx jest src/cli/__tests__/init.test.ts -t "SET-EQUAL to the manifest"` → **RED**: `expect(config.mcpServers['designerpunk-docs'].autoApprove).not.toContain('rebuild_index')` failed — `Received array: [..., "rebuild_index"]` — because the scaffolded config's `autoApprove` picked up the manifest change with **zero hand edit to `kiro.ts`/`cc.ts`**, exactly proving the property.
4. Restored the manifest for real: `npx tsx scripts/build-tool-manifest.ts` (re-derives it from the actual, unmutated source registrations — not a copy-back of the backup, so the restoration is itself evidence the build is deterministic and reproducible). `diff` against the pre-bite backup showed only the `generatedAt` timestamp differing.
5. Re-ran the full `init.test.ts` suite → **21/21 passed**.
6. `dist/` is gitignored, so `git status`/`git diff` show no residue from this bite (nothing in `dist/` is ever committed).

## Application-time adaptations

1. **Chose NOT to create a third shared file** (e.g. `mcpConfig/manifest.ts`) for the manifest-reading helper, to stay exactly within the T1-(B) grant's enumerated Primary Artifacts (`src/cli/shared/mcpConfig/{kiro,cc}.ts` — a two-file brace expansion). `readApprovedToolNames` lives in `kiro.ts`; `cc.ts` imports it from the sibling file (both files are on the list, so this is an import between two authorized artifacts, not a new one).
2. **The manifest-reading types (`ToolManifestEntry`, `ToolManifestFile`) are local/private to `kiro.ts`**, not imported from `scripts/build-tool-manifest.ts`'s own `ToolManifest`/`ToolManifestEntry` types, to avoid a `src/` → `scripts/` cross-directory type dependency that could interact awkwardly with the root `tsconfig.json`'s `rootDir: "./src"` constraint (untested edge case; avoided rather than risked). The shapes are intentionally identical, so this is pure duplication-for-isolation, not a divergent schema.
3. **`McpConfigManifestRecorder` is a structural interface** (`recordKey`/`recordFile`), not an import of `init.ts`'s real `ManifestBuilder` class — importing it would create a circular import (`init.ts` → `mcpConfig/kiro.ts` → `init.ts`). `ManifestBuilder` satisfies the interface structurally (TypeScript duck typing), so no behavior changes.

## Notes for Task 4.4

- The product entry's connection info (added to the template in this subtask) is what makes it "emitted for born repos on both targets" the moment `init` runs — 4.4's own job is confirming this with the `init.test.ts` update and naming Req 7.2 in that commit.
- **Unclaimed residual, NOT touched here**: `product-mcp-server/src/index.ts`'s `DEFAULT_COMPONENT_DIR = 'src/components/core'` fallback constant remains stale (flagged in Task 2's completion doc, "the orchestrator is routing this"). This subtask's template now passes an explicit `COMPONENT_DIR` env value that bypasses the stale default for every consumer scaffolded from this point forward, but the underlying source-file default itself is untouched — still routed to the orchestrator/Peter, not silently absorbed into Task 4's scope.
