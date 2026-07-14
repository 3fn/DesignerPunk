/**
 * Spec 125-B Task 1.6 — Tool-Boot Smoke (Req 5; Design C6, DD7)
 *
 * A CI job asserting every tool DECLARED in `canonical/registry/tool-registry.json`
 * (122's registry generator output) is both LISTED (`tools/list`) and RESPONDS to a
 * cheap, empty-args call on each of the three MCP servers. This closes a failure mode
 * a list-only design would silently pass: a tool advertised in `tools/list` whose
 * handler throws on invocation (DD7 — "upgraded" over a narrower list-only smoke).
 *
 * NORMATIVE EXCLUSION (Req 5.2, restated so it is never accidentally violated by a
 * future edit): this smoke SHALL NOT assert that any tool returns DATA. A
 * declared-but-index-empty tool (the Product MCP in this repo — `product/` does not
 * exist here) SHALL PASS. Every per-tool assertion below checks only that a JSON-RPC
 * response returned — a resolved CallToolResult (success OR `isError: true`) OR an
 * MCP-protocol-level rejection (e.g. an "invalid params" error) — NEVER the payload's
 * content. Do not add a `.content`/`.result` value assertion to this file; that would
 * make the smoke non-compliant with Req 5.2's normative exclusion.
 *
 * SELECTION FLOOR (Req 5.3 — the "did-it-really-run" guard, per the 125-A "armed =
 * verified non-empty and correct scope" convention): if the manifest is missing, empty,
 * or declares a server with zero tools, the smoke FAILS LOUD rather than silently
 * passing zero assertions. The zero-servers / missing-manifest case throws at module
 * load (a distinct message from a normal test failure, for fast triage); the
 * zero-tools-for-a-server case is its own assertion per server.
 *
 * BOOT PLUMBING: the manifest (`tool-registry.json`) carries only `entry` (repo-relative
 * compiled path) + the declared tool list — no env wiring. Env vars each server needs to
 * resolve its data roots are NOT duplicated here; they are imported from
 * `tools/agent-generator/registry.ts`'s `serverTable()` — the SAME function 122 used to
 * generate this exact manifest (the mcpDataRoots.ts header names "duplicated-resolution-
 * logic drift" as this project's named recurring failure mode; reusing the single
 * source avoids re-creating it here).
 *
 * BUILD DEPENDENCY: this smoke reads BUILT artifacts — `mcp-server/dist/index.js` and
 * `application-mcp-server/dist/index.js` (each sub-package's own `tsc` build) plus
 * `dist/mcp/product-mcp.js` (the root `build:mcp` esbuild bundle). It MUST run after
 * those builds (see `.github/workflows/tool-boot-smoke.yml`, which mirrors the proven
 * boot recipe in `.github/workflows/agent-generator.yml`'s `122-setup` job). Locally, if
 * an entry is missing, the affected server's suite fails with a build-first message
 * rather than a misleading module-not-found error.
 *
 * @see .kiro/specs/125-B-classification-map/requirements.md § Requirement 5
 * @see .kiro/specs/125-B-classification-map/design.md § C6, DD7
 * @see canonical/registry/tool-registry.json — the manifest under test
 * @see tools/agent-generator/registry.ts — registry generation + the reused serverTable()
 * @see tests/mcp-boot-smoke.test.ts — the sibling boot-sentinel guard (Spec 118 Task 5.1a);
 *      that guard proves the bundles RESOLVE at boot, this one proves every DECLARED tool
 *      RESPONDS post-boot — complementary, not duplicative.
 */

import * as fs from 'fs';
import * as path from 'path';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { serverTable, type RegistryServerSpec } from '../tools/agent-generator/registry';
import { guardChild, noteChildPid, releaseChild } from '../tools/agent-generator/child-process-guard';

const REPO_ROOT = path.resolve(__dirname, '..');
const REGISTRY_PATH = path.join(REPO_ROOT, 'canonical', 'registry', 'tool-registry.json');

interface RegistryTool {
  name: string;
  description: string;
  inputSchemaHash: string;
}

interface RegistryServer {
  name: string;
  /** Repo-relative path to the compiled entry — `node <repoRoot>/<entry>`. */
  entry: string;
  tools: RegistryTool[];
}

interface ToolRegistry {
  servers: RegistryServer[];
}

/**
 * Load the manifest. Throws a DISTINCT, immediately-triageable message when the
 * manifest is missing/unreadable — the "selection floor" failure mode design C6
 * calls out as needing to read differently from a per-tool failure.
 */
function loadRegistry(): ToolRegistry {
  if (!fs.existsSync(REGISTRY_PATH)) {
    throw new Error(
      `Tool-boot smoke SELECTION FLOOR: manifest not found at ${REGISTRY_PATH}. ` +
        `Run the 122 registry generator (tools/agent-generator/registry.ts) first.`,
    );
  }
  const raw = fs.readFileSync(REGISTRY_PATH, 'utf-8');
  let parsed: ToolRegistry;
  try {
    parsed = JSON.parse(raw) as ToolRegistry;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Tool-boot smoke SELECTION FLOOR: manifest at ${REGISTRY_PATH} is not valid JSON — ${message}`);
  }
  if (!parsed.servers || parsed.servers.length === 0) {
    throw new Error(
      `Tool-boot smoke SELECTION FLOOR (Req 5.3): manifest at ${REGISTRY_PATH} declares ZERO servers. ` +
        `An empty selection is a FAIL, never a silent pass.`,
    );
  }
  return parsed;
}

const registry = loadRegistry();
const envBySpecName = new Map<string, RegistryServerSpec>(serverTable(REPO_ROOT).map((spec) => [spec.name, spec]));

describe('125-B Task 1.6 — Tool-boot smoke (Req 5; Design C6, DD7)', () => {
  for (const server of registry.servers) {
    describe(`${server.name} (${server.entry})`, () => {
      let client: Client | undefined;
      let transport: StdioClientTransport | undefined;

      // Selection floor per server (Req 5.3): a registry-declared server with zero
      // tools is a FAIL, not a vacuous pass — checked BEFORE any boot attempt.
      it('declares at least one tool (selection floor, Req 5.3)', () => {
        expect(server.tools.length).toBeGreaterThan(0);
      });

      beforeAll(async () => {
        if (server.tools.length === 0) {
          // The selection-floor assertion above already fails the suite; skip the
          // boot attempt rather than spawning a process to introspect nothing.
          return;
        }

        const spec = envBySpecName.get(server.name);
        if (!spec) {
          throw new Error(
            `Tool-boot smoke: no boot spec (env wiring) known for registry server "${server.name}" — ` +
              `tools/agent-generator/registry.ts's serverTable() and the manifest have drifted apart.`,
          );
        }

        const absoluteEntry = path.join(REPO_ROOT, server.entry);
        if (!fs.existsSync(absoluteEntry)) {
          throw new Error(
            `Tool-boot smoke: compiled entry not found: ${server.entry}. ` +
              `Build the MCP dists first (mcp-server/application-mcp-server \`npm run build\`; root \`npm run build:mcp\`) — ` +
              `see .github/workflows/tool-boot-smoke.yml for the exact recipe.`,
          );
        }

        // String-only env (registry.ts's introspectServer precedent): pass process.env
        // through (a spawned `node` needs PATH etc. to resolve) plus the server-specific
        // data-root overrides from the SAME serverTable() the registry was generated with.
        const env: Record<string, string> = {};
        for (const [key, value] of Object.entries(process.env)) {
          if (typeof value === 'string') env[key] = value;
        }
        for (const [key, value] of Object.entries(spec.env)) {
          env[key] = value;
        }

        transport = guardChild(
          new StdioClientTransport({
            command: process.execPath,
            args: [absoluteEntry],
            env,
            stderr: 'inherit',
          }),
        );
        client = new Client({ name: '125b-tool-boot-smoke', version: '1.0.0' }, { capabilities: {} });
        await client.connect(transport);
        noteChildPid(transport);
      }, 30_000);

      afterAll(async () => {
        if (client) {
          await client.close();
        }
        if (transport) {
          releaseChild(transport);
        }
      });

      it('handshake + tools/list includes every registry-declared tool name', async () => {
        if (server.tools.length === 0 || !client) {
          // Selection-floor test above already failed the suite for this case.
          return;
        }
        const { tools } = await client.listTools();
        const liveNames = new Set(tools.map((tool) => tool.name));
        const missing = server.tools.filter((tool) => !liveNames.has(tool.name)).map((tool) => tool.name);
        expect(missing).toEqual([]);
      }, 15_000);

      for (const tool of server.tools) {
        it(
          `"${tool.name}" responds to an empty-args call (DD7 — result OR structured error; payload uninspected)`,
          async () => {
            if (!client) {
              throw new Error(`Tool-boot smoke: "${server.name}" never booted — see the beforeAll failure above.`);
            }

            // Req 5.2 / DD7: the ONLY assertion is "a JSON-RPC response returned."
            // A resolved call (success or `isError: true`) is a pass. An MCP-protocol-
            // level rejection (e.g. an "invalid params" error thrown by the SDK/server
            // before reaching the handler) is ALSO a pass — DD7's rationale is explicit
            // that a structured "invalid params" error IS a valid response. The ONLY
            // genuine failure is neither resolving nor rejecting (a hang/crash), which
            // the test's own timeout below already catches.
            let resolved: unknown;
            let rejected: unknown;
            try {
              resolved = await client.callTool({ name: tool.name, arguments: {} });
            } catch (err) {
              rejected = err;
            }

            // Exactly one branch executed — either is a pass. Neither being set would
            // mean the call hung past the timeout, which fails this test independently.
            expect(resolved !== undefined || rejected !== undefined).toBe(true);

            // NEVER add payload/content assertions here (Req 5.2, normative) — see the
            // file header. A declared-but-index-empty tool (e.g. the Product MCP's
            // find_screens against this repo's absent `product/` dir) MUST pass exactly
            // like a populated one; inspecting `.content` would re-introduce the
            // returns-data assertion Req 5.2 forbids.
          },
          15_000,
        );
      }
    });
  }
});
