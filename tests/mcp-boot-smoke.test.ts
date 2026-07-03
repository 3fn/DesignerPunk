/**
 * Spec 118 Task 5.1a — MCP Boot/Smoke Guard
 *
 * Paired boot/smoke guard for the three esbuild-bundled MCP servers. These servers
 * are EXEMPT from the runtime-resolution contract (bundling resolves imports at
 * build time), but the exemption is NOT silent — each server must boot far enough
 * to prove it doesn't throw a module-resolution error at startup.
 *
 * Mechanism: subprocess spawn of each bundled MCP server (`dist/mcp/*.js`), waiting
 * for the server's "running on stdio" / "Server started" sentinel on stderr. These
 * servers auto-start under `require.main === module` (standard Node.js entry-point
 * guard). Reaching the sentinel = booted cleanly. Exiting/throwing before it = fail.
 *
 * Sentinel values (verified from source):
 *   application-mcp.js  → "Server running on stdio"  (application-mcp-server/src/index.ts:365)
 *   docs-mcp.js         → "Server started and listening" (mcp-server/src/index.ts:321)
 *   product-mcp.js      → "Server running on stdio"  (product-mcp-server/src/index.ts:197)
 *
 * The `waitForReady` pattern reuses the stderr-sentinel approach from
 * tests/consumer-integration.test.ts:137-148 (the established test infra).
 *
 * Build dependency: this guard reads BUILT bundles from dist/mcp/. It MUST run
 * after `npm run build:mcp`. In CI, the consumer-guard.yml builds before this step.
 * Locally, if dist/mcp/ is absent, the tests skip with a clear message rather than
 * failing with a misleading error.
 *
 * Spec 121 F-C2/F-C6 extension (2026-07-03): a second describe block boots each
 * bundle from an ISOLATED temp cwd (no reachable node_modules, no data-root env
 * vars) and asserts the package-relative data-root fallback serves a non-empty
 * index (docs + application) while the product server correctly starts empty.
 *
 * @see Spec 118 Task 5.1a
 * @see Spec 118 design.md § MCP/Browser Principled Exception
 * @see Resolved Decision 2 (bundled subsystems exempt; this guard is the paired proof)
 * @see .github/workflows/consumer-guard.yml — where this guard runs in CI
 * @see .kiro/specs/121-claude-code-portability/consumer-dry-run-findings.md § A (F-C2/F-C6)
 */

import { spawn, ChildProcess } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const PKG_ROOT = path.resolve(__dirname, '..');
const DIST_MCP = path.join(PKG_ROOT, 'dist', 'mcp');

const MCP_SERVERS: Array<{ name: string; file: string; sentinel: string }> = [
  {
    name: 'application-mcp (dist/mcp/application-mcp.js)',
    file: path.join(DIST_MCP, 'application-mcp.js'),
    // Verified: application-mcp-server/src/index.ts:365
    sentinel: 'running on stdio',
  },
  {
    name: 'docs-mcp (dist/mcp/docs-mcp.js)',
    file: path.join(DIST_MCP, 'docs-mcp.js'),
    // Verified: mcp-server/src/index.ts:321
    sentinel: 'Server started',
  },
  {
    name: 'product-mcp (dist/mcp/product-mcp.js)',
    file: path.join(DIST_MCP, 'product-mcp.js'),
    // Verified: product-mcp-server/src/index.ts:197
    sentinel: 'running on stdio',
  },
];

/**
 * Wait for a subprocess to emit the expected sentinel on stderr.
 *
 * Reuses the pattern from tests/consumer-integration.test.ts:137-148.
 * Resolves when the sentinel substring appears in stderr output.
 * Rejects if the process exits/errors before the sentinel, or on timeout.
 *
 * "Reaching the sentinel = booted far enough to catch a resolution error"
 * (Spec 118 Task 5 success criteria).
 */
function waitForSentinel(child: ChildProcess, sentinel: string, timeoutMs = 15_000): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`MCP server did not emit sentinel "${sentinel}" within ${timeoutMs}ms`)),
      timeoutMs,
    );

    child.stderr!.on('data', (data: Buffer) => {
      if (data.toString().includes(sentinel)) {
        clearTimeout(timer);
        resolve();
      }
    });

    // If the process exits before the sentinel, it errored on boot.
    child.on('exit', (code) => {
      clearTimeout(timer);
      if (code !== 0 && code !== null) {
        reject(new Error(`MCP server exited with code ${code} before emitting sentinel "${sentinel}"`));
      }
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      reject(new Error(`MCP server spawn error: ${err.message}`));
    });
  });
}

// Skip guard: if dist/mcp/ directory does not exist at all, the suite skips with a
// clear message — this is the "developer hasn't built yet" case. In CI, the
// consumer-guard.yml workflow runs `npm run build:mcp` before invoking this test,
// so the directory and bundles always exist there.
//
// If dist/mcp/ EXISTS but individual bundle files are missing, that is a BROKEN BUILD
// (partial esbuild output) — we do NOT skip in that case; the individual spawn will
// fail when node cannot find the file, which is the correct failure signal.
const distMcpExists = fs.existsSync(DIST_MCP);

if (!distMcpExists) {
  describe('Spec 118 Task 5.1a — MCP boot/smoke guard', () => {
    it.skip(
      'SKIPPED: dist/mcp/ directory not found. Run `npm run build:mcp` first, then re-run this guard.',
      () => {},
    );
  });
} else {
  describe('Spec 118 Task 5.1a — MCP boot/smoke guard (Resolved Decision 2: bundled subsystems exempt + paired guard)', () => {
    for (const server of MCP_SERVERS) {
      it(
        `${server.name} boots cleanly to "${server.sentinel}" sentinel`,
        async () => {
          // Spawn the bundled MCP server as a subprocess. The servers auto-start
          // via `require.main === module` (each index.ts entry point).
          const child = spawn('node', [server.file], {
            stdio: ['pipe', 'pipe', 'pipe'],
            env: { ...process.env, NODE_ENV: 'test' },
          });

          try {
            // waitForSentinel rejects on: timeout, pre-sentinel exit, spawn error.
            // Any of these = boot-time module-resolution error → test fails.
            await waitForSentinel(child, server.sentinel);
            // Reaching here = server reached the sentinel = boot clean.
          } finally {
            // Always terminate the server process — SIGTERM is clean, SIGKILL as
            // fallback. The MCP servers wait on stdio; they won't self-exit.
            child.kill('SIGTERM');
          }
        },
        30_000, // generous timeout: each server indexes/loads data on boot
      );
    }
  });

  /**
   * Spec 121 F-C2 / F-C6 — isolated-cwd boot guard (standing).
   *
   * Boots each bundle from a temp dir with NO reachable node_modules on the
   * resolution path and NO data-root env vars. This proves two things at once:
   *
   * 1. F-C6 self-containedness: the bundles reach their sentinels with zero
   *    external modules resolvable (the ajv/ajv-formats require-looking matches
   *    in product-mcp.js are ajv codegen STRING LITERALS, not call sites —
   *    empirically disproven as a dependency gap; this guard keeps it that way).
   *
   * 2. F-C2 package-relative fallback: with no env vars and a cwd that has none
   *    of the data, the docs and application servers must fall back to
   *    PACKAGE-relative data roots and serve a NON-EMPTY index. From a temp cwd
   *    the bundle's __dirname is still <repo>/dist/mcp, so the package fallback
   *    resolves to the repo — that is the point. The product server's `product/`
   *    root deliberately has NO package fallback (consumer-owned by definition):
   *    it must boot with its "starting with empty data" message.
   *
   * @see .kiro/specs/121-claude-code-portability/consumer-dry-run-findings.md § A
   * @see src/cli/shared/mcpDataRoots.ts — the ownership-based resolution order
   */
  describe('Spec 121 F-C2/F-C6 — isolated-cwd boot (package fallback + self-containedness)', () => {
    /** Env vars that override MCP data roots — stripped so defaults are exercised. */
    const DATA_ROOT_ENV_VARS = [
      'MCP_STEERING_DIR',
      'COMPONENTS_DIR',
      'TOKEN_INDEX_DIR',
      'PATTERNS_DIR',
      'TEMPLATES_DIR',
      'GUIDANCE_DIR',
      'REGISTRY_PATH',
      'DESIGN_LANGUAGE_PATH',
      'PRODUCT_DIR',
      'COMPONENT_DIR',
      'WORKSPACE_ROOT',
    ];

    let isolatedCwd: string;

    beforeAll(() => {
      // os.tmpdir() has no node_modules anywhere on its ancestor chain (macOS
      // /var/folders, Linux /tmp) — nothing is resolvable from here.
      isolatedCwd = fs.mkdtempSync(path.join(os.tmpdir(), 'mcp-isolated-cwd-'));
    });

    afterAll(() => {
      fs.rmSync(isolatedCwd, { recursive: true, force: true });
    });

    function spawnIsolated(file: string): { child: ChildProcess; stderr: () => string } {
      const env: NodeJS.ProcessEnv = { ...process.env, NODE_ENV: 'test' };
      for (const key of DATA_ROOT_ENV_VARS) delete env[key];
      const child = spawn('node', [file], {
        cwd: isolatedCwd,
        stdio: ['pipe', 'pipe', 'pipe'],
        env,
      });
      let stderrBuf = '';
      child.stderr!.on('data', (data: Buffer) => {
        stderrBuf += data.toString();
      });
      return { child, stderr: () => stderrBuf };
    }

    /**
     * Minimal JSON-RPC over stdio: initialize handshake + one tool call.
     * Pattern reused from tests/consumer-integration.test.ts (sendJsonRpc).
     */
    function sendJsonRpc(child: ChildProcess, id: number, method: string, params: object): Promise<any> {
      const request = JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n';
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error(`JSON-RPC timeout on ${method}`)), 15_000);
        let buffer = '';
        const onData = (data: Buffer) => {
          buffer += data.toString();
          for (const line of buffer.split('\n')) {
            if (!line.trim()) continue;
            try {
              const parsed = JSON.parse(line);
              if (parsed.id === id) {
                clearTimeout(timeout);
                child.stdout!.off('data', onData);
                resolve(parsed.result ?? parsed);
              }
            } catch {
              /* partial line */
            }
          }
        };
        child.stdout!.on('data', onData);
        child.stdin!.write(request);
      });
    }

    async function initializeMcp(child: ChildProcess): Promise<void> {
      await sendJsonRpc(child, 1, 'initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'mcp-boot-smoke', version: '1.0' },
      });
    }

    /** Unwrap the MCP text-content envelope: content[0].text is JSON. */
    function parseToolResult(result: any): any {
      expect(result).toBeDefined();
      expect(Array.isArray(result.content)).toBe(true);
      return JSON.parse(result.content[0].text);
    }

    it(
      'docs-mcp serves a NON-EMPTY index from the package fallback',
      async () => {
        const { child, stderr } = spawnIsolated(path.join(DIST_MCP, 'docs-mcp.js'));
        try {
          await waitForSentinel(child, 'Server started');
          // The steering root must have come from the package, not cwd/env.
          expect(stderr()).toContain('Data root steering:');
          expect(stderr()).toContain('(source: package)');

          await initializeMcp(child);
          const health = parseToolResult(
            await sendJsonRpc(child, 2, 'tools/call', { name: 'get_index_health', arguments: {} }),
          );
          // Non-empty index = the package fallback actually served data (F-C2).
          expect(health.metrics.documentsIndexed).toBeGreaterThan(0);
        } finally {
          child.kill('SIGTERM');
        }
      },
      30_000,
    );

    it(
      'application-mcp serves a NON-EMPTY index from the package fallback (and recommends regenerating the token-index)',
      async () => {
        const { child, stderr } = spawnIsolated(path.join(DIST_MCP, 'application-mcp.js'));
        try {
          await waitForSentinel(child, 'running on stdio');
          expect(stderr()).toContain('Data root components:');
          expect(stderr()).toContain('(source: package)');
          // Package token snapshot won → the boot log must recommend regenerating.
          expect(stderr()).toContain('npx designerpunk generate');

          await initializeMcp(child);
          const health = parseToolResult(
            await sendJsonRpc(child, 2, 'tools/call', { name: 'get_component_health', arguments: {} }),
          );
          expect(health.componentsIndexed).toBeGreaterThan(0);
        } finally {
          child.kill('SIGTERM');
        }
      },
      30_000,
    );

    it(
      'product-mcp boots with its empty-data message (product/ has NO package fallback — expected, correct)',
      async () => {
        const { child, stderr } = spawnIsolated(path.join(DIST_MCP, 'product-mcp.js'));
        try {
          await waitForSentinel(child, 'running on stdio');
          expect(stderr()).toContain('Product directory not found');
          expect(stderr()).toContain('starting with empty data');
        } finally {
          child.kill('SIGTERM');
        }
      },
      30_000,
    );
  });
}
