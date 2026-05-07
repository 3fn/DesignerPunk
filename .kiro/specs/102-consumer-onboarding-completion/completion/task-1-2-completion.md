# Task 1.2 Completion: Route MCP Wrapper Stdout Headers to Stderr (Gap 1)

**Date**: 2026-05-07
**Task**: 1.2 Route MCP wrapper stdout headers to stderr (Gap 1)
**Type**: Implementation
**Status**: Complete

---

## Artifacts

- **Modified**: `src/cli/designerpunk.ts` — replaced `console.log` with `console.error` for header output in three MCP wrapper methods

---

## Implementation Details

### Scope

Three MCP wrapper methods in `src/cli/designerpunk.ts`:

- `runMcpApp()` — lines 91-95 (Application MCP header)
- `runMcpDocs()` — lines 111-115 (Docs MCP header)
- `runMcpProduct()` — lines 125-129 (Product MCP header)

Each had 5 `console.log` calls printing an informational header ("DesignerPunk X MCP", "Protocol: stdio", "Data: ...", "Server: ...", "Starting..."). All 15 calls replaced with `console.error`. No content or semantic change — purely stream routing.

### Not Modified

`runGenerate()` retains `console.log` (lines 66-72). Rationale per design: non-MCP CLI commands should continue using stdout for operator output — correct Unix CLI behavior. The fix is deliberately scoped to MCP-invoked wrappers where stdout purity is protocol-required.

### Root-Cause Reminder

MCP protocol over stdio reserves stdout exclusively for JSON-RPC frames. The CLI wrapper prints to stdout BEFORE spawning the bundled server with `stdio: 'inherit'`. Before this fix, Kiro's MCP client received wrapper headers mixed with JSON-RPC frames and rejected the Docs MCP connection with `-32000 Connection closed` (observed in Spec 101 Task 2.3 verification). Routing to stderr preserves the informational output for terminal operators (stderr is still visible in interactive shells) while keeping stdout pure for protocol consumers.

### Validation

- ✅ **Direct invocation test**: `timeout 3 npx ts-node src/cli/designerpunk.ts mcp:docs 2>/dev/null | head` produces empty stdout — no header pollution before JSON-RPC frames
- ✅ **Scope audit**: `grep -n "console\." src/cli/designerpunk.ts | head -15` confirms:
  - `runGenerate` still uses `console.log` (lines 66-72) — intentional, non-MCP
  - `runMcpApp`, `runMcpDocs`, `runMcpProduct` all use `console.error` for headers
- ✅ **Full test suite**: 325 suites / 8,281 tests pass post-change

### Integration Points

- **Closes Gap 1 from consumer-onboarding-gaps.md** — Docs MCP should now connect via `npx designerpunk mcp:docs` without requiring the direct-node invocation bypass
- **Post-publish verification in Task 2.4** will confirm all three MCP wrappers (`mcp:app`, `mcp:docs`, `mcp:product`) connect to Kiro via npx invocation — the authoritative real-world test

### Residual Risk

Per design-outline.md Risk 2: some MCP clients may not tolerate stderr noise. Known-working path is stderr routing + Kiro's client (Kiro explicitly ignores stderr per MCP protocol). If an unknown client in a future consumer context objects to stderr output during handshake, the fallback is suppress-headers-in-MCP-context (detect via `!process.stdout.isTTY`). Not expected to be necessary; flagged for awareness.
