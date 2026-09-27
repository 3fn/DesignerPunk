# Task 4.2 Completion — `build-tool-manifest.ts` wired into the build

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 4 · **Agent**: Lina (Sonnet)

## What changed

### New `scripts/build-tool-manifest.ts`

Computes `dist/mcp/tool-manifest.json` from the three servers' registration modules via **static TypeScript imports** — `import { tools as docsTools } from '../mcp-server/src/index'` (and the application/product equivalents) — never live stdio introspection (design C8: *"never from live stdio introspection... `registry.ts` introspects live today, and the consumer lane cannot"*). Every one of those three modules gates its bootstrap/server-start code behind `if (require.main === module)`, so importing the module (rather than running it as the entry point) triggers zero side effects — no `Server` constructed, no file watcher started, no stdio transport opened.

Exports:
- `toManifestEntries(serverKey, tools)` — reduces a registration array to `{ name, readOnlyHint }[]`, **throwing** if any tool lacks a boolean `annotations.readOnlyHint` (the build-time twin of Task 4.1's jest guard — a broken build can't ship an incomplete manifest even if tests were skipped).
- `buildManifest()` — assembles the full `{ generatedAt, note, servers: { 'designerpunk-docs': [...], 'designerpunk-application': [...], 'designerpunk-product': [...] } }` shape.
- `MCP_SERVER_KEYS` — the three keys, in a fixed order.
- CLI entry (`if (require.main === module)`) — writes `dist/mcp/tool-manifest.json` and logs per-server tool/read-only counts.

### `package.json` wiring (disclosed — not a Task 4 Primary Artifact, but 4.2's own title requires it)

- Added `"build:tool-manifest": "npx tsx scripts/build-tool-manifest.ts"`.
- Appended `&& npm run build:tool-manifest` to the end of the existing `build:mcp` script chain (after all three esbuild bundles). Order doesn't matter functionally — the script imports TS **source**, not the bundled `dist/mcp/*.js` output — but placing it last keeps `build:mcp`'s existing bundle-then-manifest reading order intuitive.
- This is the disclosed, minimal `package.json` edit the brief anticipated ("If wiring the build (4.2) needs a `package.json` script change, the same rule applies: minimal, disclosed"). `package.json` is Task 3's Primary Artifact, not Task 4's.

## Verification

1. **Standalone run, no server started**: `npx tsx scripts/build-tool-manifest.ts` → wrote `dist/mcp/tool-manifest.json`, printed:
   ```
   Wrote dist/mcp/tool-manifest.json
     designerpunk-docs: 8 tools (7 read-only)
     designerpunk-application: 21 tools (20 read-only)
     designerpunk-product: 14 tools (13 read-only)
   ```
   No `Server running on stdio` line (each server's own startup log, printed only inside its `require.main === module` guard) appeared — confirming no server actually started.
2. **Full build wiring**: `npm run build:mcp` (after `rm -f dist/mcp/tool-manifest.json`) → ran `build:mcp-shared`, all three esbuild bundles, then `build:tool-manifest` automatically, producing the same file with the same counts.
3. **Packed tarball**: `npm pack --dry-run` (which runs the real `prepack` → `npm run build` → `build:mcp` → `build:tool-manifest`) → `npm notice 4.0kB dist/mcp/tool-manifest.json` appeared in the pack listing. `dist/mcp/tool-manifest.json` was already declared in `package.json` `files[]` ahead of this task (Task 3.3's completion doc: *"pattern entries; `npm pack` is silent about a pattern matching nothing today"*) — this subtask is what makes the pattern match a real, built file for the first time.
4. **`scripts/pack-assert.ts`** → 40/40 assertions still pass (unchanged; it doesn't name `tool-manifest.json` as its own assertion — the file rides the existing `files[]` glob match, consistent with how Task 3 scoped it).

## Targeted tests + result

`npx jest --config scripts/jest.config.js scripts/__tests__/tool-manifest.test.ts` (written together with this script in Task 4.1's pass — see that subtask's doc) → **11/11 passed**, including the subprocess test that runs `npx tsx scripts/build-tool-manifest.ts` end-to-end and asserts it exits cleanly within a bounded timeout (a stray server start would hang on stdio and time the test out, not just print a suspicious line — the strongest available proof of "no server started").

## Application-time adaptations

None — the design's static-import approach worked exactly as specified on the first attempt; no fallback (e.g. dynamic `require()`, subprocess introspection) was needed.
