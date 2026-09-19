# Consumer Onboarding Gaps Surfaced During Spec 101 Task 2.3

**Date**: 2026-05-07
**Severity**: Medium (consumers can work around; degrades onboarding UX)
**Agent**: Ada (surfaced during Spec 101 Task 2.3 post-publish verification)
**Blocks**: Nothing directly — all gaps have workarounds; Spec 101 can close
**Status**: 📝 Tracked
**Suggested Owner**: Ada (items 1, 2, 3, 5) + Thurgood (item 4)

---

## Context

Spec 101 Task 2.3 was the first real post-publish first-consumer verification. Peter followed the Integration Guide end-to-end from a fresh product repo (`DP-PortfolioSite`) against `@3fn/core@11.0.0`. Install succeeded. Integration Guide walkthrough **mostly** worked — revealing five distinct consumer-onboarding gaps that the guide and the installed CLI don't currently handle well. All five have manual workarounds; all five would be better fixed so the published Integration Guide walkthrough truly works without external guidance.

Task 2.3 is considered passed "with known-limitation follow-ups" (this issue). Spec 101's publish goal is achieved; consumer onboarding polish is captured here for a follow-up spec.

---

## Gap 1: `npx designerpunk mcp:*` CLI Wrappers Pollute Stdout

**Location**: `src/cli/designerpunk.ts` — `runMcpApp()`, `runMcpDocs()`, `runMcpProduct()`

**Problem**: Each wrapper prints 4-5 `console.log` header lines to **stdout** before spawning the bundled MCP server with `stdio: 'inherit'`. Example from `runMcpDocs()`:

```typescript
console.log('DesignerPunk Docs MCP');
console.log(`  Protocol: stdio`);
console.log(`  Data: ${steeringDir}`);
console.log(`  Server: ${serverBundle}`);
console.log('  Starting...\n');
```

MCP protocol over stdio reserves stdout exclusively for JSON-RPC frames. Kiro's MCP client rejects the Docs MCP connection with `MCP error -32000: Connection closed` (observed in Kiro logs on 2026-05-07 00:18:56 against `designerpunk-docs`) when the config uses `"command": "npx", "args": ["designerpunk", "mcp:docs"]`. The wrapper's stdout pollution interferes with the handshake.

**Interestingly, Application MCP connects even with the wrapper** — likely because its startup path is faster than Docs MCP (which indexes 87 steering docs before opening transport), narrowly avoiding whatever timing threshold Kiro's client applies. But it's a coincidence, not robustness.

**Workaround (validated on 2026-05-07)**: Use direct-node invocation in `.kiro/settings/mcp.json`:

```json
"designerpunk-docs": {
  "command": "node",
  "args": ["./node_modules/@3fn/core/dist/mcp/docs-mcp.js"],
  "env": { "MCP_STEERING_DIR": "./node_modules/@3fn/core/.kiro/steering" },
  ...
}
```

**Suggested Fixes** (pick one):
1. **Route wrapper headers to stderr** (`console.error` instead of `console.log`). One-line change per wrapper. Preserves manual-CLI UX (operators still see the headers in terminal — stderr is unbuffered but terminals show it) while keeping stdout pure for MCP protocol.
2. **Suppress wrapper headers entirely** when spawned by an MCP client (detected by `!process.stdout.isTTY` heuristic or explicit env var). More complex but cleaner.
3. **Remove the wrappers** and document direct-node invocation as the canonical pattern. Simplest; reduces CLI surface area.

Preferred: option 1 (minimal, safe, preserves developer UX).

---

## Gap 2: `runMcpApp()` Omits `TOKEN_INDEX_DIR` Env Var

**Location**: `src/cli/designerpunk.ts` — `runMcpApp()`

**Problem**: The wrapper passes 5 env vars to the Application MCP server (COMPONENTS_DIR, PATTERNS_DIR, TEMPLATES_DIR, GUIDANCE_DIR, REGISTRY_PATH) but **omits `TOKEN_INDEX_DIR`**. The application MCP server reads this env var for token-query tools:

```typescript
// application-mcp-server/src/index.ts:343
tokenIndexDir: process.env.TOKEN_INDEX_DIR || DEFAULT_TOKEN_INDEX_DIR,
// DEFAULT_TOKEN_INDEX_DIR = 'token-index' (relative to CWD)
```

In a product repo, CWD is the product root, not the installed package. The relative default `token-index` doesn't resolve to `node_modules/@3fn/core/token-index/`. Result: token-query tools (search_tokens, get_token_details, get_token_family, get_token_consumers) silently fall back to the no-token-index state. Application MCP "connects" but is functionally degraded.

**Workaround**: Include `TOKEN_INDEX_DIR` explicitly in the `.kiro/settings/mcp.json` env block when using direct-node invocation:

```json
"env": {
  ...
  "TOKEN_INDEX_DIR": "./node_modules/@3fn/core/token-index"
}
```

**Suggested Fix**: Add `TOKEN_INDEX_DIR` to the env object in `runMcpApp()`:

```typescript
spawnServer(serverBundle, {
  COMPONENTS_DIR: componentsDir,
  PATTERNS_DIR: patternsDir,
  TEMPLATES_DIR: templatesDir,
  GUIDANCE_DIR: guidanceDir,
  REGISTRY_PATH: registryPath,
  TOKEN_INDEX_DIR: path.join(pkgRoot, 'token-index'),  // <-- add this
}, true);
```

One-line addition. Closes the degradation gap.

---

## Gap 3: `init.ts` Skip-If-Directory-Exists Behavior Is Too Aggressive

**Location**: `src/cli/init.ts` — `copyDir()` function

**Problem**: `copyDir()` checks if the destination directory exists and **skips the entire copy** if so:

```typescript
if (fs.existsSync(dest)) {
  console.log(`  skipped: ${path.relative(process.cwd(), dest)} (already exists)`);
  return false;
}
fs.cpSync(src, dest, { recursive: true, ... });
```

Observed impact: Peter created `DP-PortfolioSite/.kiro/steering/designerpunk.md` (a product-specific integration doc) before running `npx designerpunk init`. Init's Step 7 ("Copy steering docs") saw `.kiro/steering/` already existed and skipped entirely. Result: product repo had 1 steering doc instead of the 86+ from the installed package. Consumer has no signal that anything was skipped beyond a terse "(already exists)" message that's easy to miss in the init output stream.

**Workaround**: Delete or rename the pre-existing `.kiro/steering/` directory before running `npx designerpunk init`. Not documented anywhere.

**Suggested Fixes** (pick one or more):
1. **Merge mode** — copy each file individually; if a destination file exists, skip just that file, not the whole directory. Allows init to add new docs even when consumer has custom ones.
2. **Prompt on conflict** — if destination exists, prompt user: "Overwrite? Merge (add new files only)? Skip?"
3. **Emit structured warning** — make the "(already exists)" message more prominent, e.g., "⚠️ Skipped: .kiro/steering/ — destination exists. To receive updates, delete the directory and re-run init, or manually copy from node_modules/@3fn/core/.kiro/steering/".

Preferred: option 1 (merge). Matches the common expectation that init is additive, not destructive or skippable.

---

## Gap 4: Integration Guide Step 4 Is Vague About MCP Config

**Location**: `.kiro/steering/DesignerPunk-Integration-Guide.md` — § "4. Configure Agent Connections"

**Problem**: Step 4 says "Connect your Kiro agents to the running MCP servers using the connection details printed at startup" — but doesn't actually tell consumers WHERE to put those connection details. It then pivots directly to agent-prompt copying. A consumer following the guide literally has no path from "MCP server is printing connection details in terminal" to "my Kiro agent session can connect to it."

The actual required configuration is `.kiro/settings/mcp.json` with `mcpServers` entries pointing at the installed package's MCP bundles. None of this is in the guide.

**Workaround**: Consumer must already know Kiro's `.kiro/settings/mcp.json` convention OR find it by reverse-engineering the DesignerPunk-v2 dev repo's config. Not discoverable from the guide alone.

**Suggested Fix**: Expand Step 4 with a concrete `.kiro/settings/mcp.json` template using the direct-node invocation pattern (validated on 2026-05-07 during Spec 101 Task 2.3):

```json
{
  "mcpServers": {
    "designerpunk-docs": {
      "command": "node",
      "args": ["./node_modules/@3fn/core/dist/mcp/docs-mcp.js"],
      "env": { "MCP_STEERING_DIR": "./node_modules/@3fn/core/.kiro/steering" },
      "disabled": false,
      "autoApprove": [ ... ]
    },
    "designerpunk-application": {
      "command": "node",
      "args": ["./node_modules/@3fn/core/dist/mcp/application-mcp.js"],
      "env": {
        "COMPONENTS_DIR": "./node_modules/@3fn/core/src/components/core",
        "PATTERNS_DIR": "./node_modules/@3fn/core/experience-patterns",
        "TEMPLATES_DIR": "./node_modules/@3fn/core/layout-templates",
        "GUIDANCE_DIR": "./node_modules/@3fn/core/family-guidance",
        "REGISTRY_PATH": "./node_modules/@3fn/core/family-registry.yaml",
        "TOKEN_INDEX_DIR": "./node_modules/@3fn/core/token-index"
      },
      "disabled": false,
      "autoApprove": [ ... ]
    }
  }
}
```

Include a note that after saving the config, the Kiro agent session must be restarted for MCP connections to be picked up.

**Owner**: Thurgood (Civitas-governed doc). Unlike Gaps 1, 2, 3, 5 which are Ada's Rosetta-domain tooling concerns, this is a documentation-completeness issue.

---

## Gap 5: `npx designerpunk init` Doesn't Create `.kiro/settings/mcp.json`

**Location**: `src/cli/init.ts` — `runInit()` function

**Problem**: Init scaffolds `.npmrc`, `designerpunk.config.ts`, `src/tokens/`, `src/components/core/`, `product/overview.yaml`, `.kiro/agents/`, and `.kiro/steering/` — but NOT `.kiro/settings/mcp.json`. Consumers must hand-author this file (once Gap 4's doc updates tell them what to write). A working MCP config is essentially table-stakes for a DesignerPunk consumer; init should scaffold it.

**Workaround**: Follow Gap 4's template and hand-author `.kiro/settings/mcp.json`.

**Suggested Fix**: Add a Step 9 to `init.ts`:

```typescript
// 9. .kiro/settings/mcp.json
createFileIfNotExists(
  path.join(dest, '.kiro/settings/mcp.json'),
  generateMcpConfig(),  // produces the direct-node template
  '.kiro/settings/mcp.json (designerpunk-docs + designerpunk-application)',
);
```

If `.kiro/settings/mcp.json` already exists in the product repo (consumer may use other MCPs), merge rather than skip — add DesignerPunk's two entries without disturbing existing ones. Closes the consumer-onboarding loop so `npx designerpunk init` produces a working setup end-to-end.

---

## Recommended Follow-Up Structure

All 5 gaps share a common root cause (consumer-onboarding flow wasn't end-to-end validated until Spec 101 Task 2.3). Consolidating them into a single follow-up spec is probably more efficient than one issue per gap:

**Proposed spec name**: "Consumer Onboarding Completion" (or similar)
**Scope**: All 5 gaps
**Primary agent**: Ada (1, 2, 3, 5) + Thurgood (4)
**Pattern**: Small spec, mostly source-code fixes + one steering doc update. Estimated 2-3 subtasks, mechanical work, clear acceptance criteria (a fresh product repo can follow the Integration Guide end-to-end without external guidance and end with working MCP connections).

**Alternative**: Treat as cleanup work within the next ordinary spec cycle rather than formalizing. Less rigorous but cheaper.

---

## References

- **Spec 101 (Package Publish Readiness)** — `task-2-completion.md` and `task-2-3-completion.md` (once written) for the detailed narrative
- **Commit `4102c613`** — Task 2.2 completion doc that logged some of the context for these findings
- **Working consumer MCP config** (validated 2026-05-07) — DP-PortfolioSite's `.kiro/settings/mcp.json` with direct-node invocation pattern (reference for Gap 4's template and Gap 5's init.ts scaffold)
