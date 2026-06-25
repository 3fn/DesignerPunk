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
 * @see Spec 118 Task 5.1a
 * @see Spec 118 design.md § MCP/Browser Principled Exception
 * @see Resolved Decision 2 (bundled subsystems exempt; this guard is the paired proof)
 * @see .github/workflows/consumer-guard.yml — where this guard runs in CI
 */

import { spawn, ChildProcess } from 'child_process';
import * as fs from 'fs';
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
}
