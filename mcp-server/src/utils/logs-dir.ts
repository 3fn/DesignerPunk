/**
 * Where the docs MCP writes its logs (`index-state.log`, `errors.log`).
 *
 * Defect (`.kiro/issues/2026-10-02-docs-mcp-logs-dir-cwd-relative.md`): the server wrote to
 * `mcp-server/logs` (and the error handler to `logs`) RELATIVE TO ITS WORKING DIRECTORY, so every
 * consumer whose agent host launched it from the project root got a stray `mcp-server/logs/`
 * folder in their repo (15.0.0 smoke O-5; release-4 U5 rows R1-3 / R2-7 / K-4; 16.0.0 phase 2).
 *
 * Shape: never under the working directory, so a consumer install cannot see it.
 *   1. `DESIGNERPUNK_DOCS_MCP_LOGS`, when set and non-empty — resolved to an absolute path — for
 *      anyone who wants the logs somewhere they look (e.g. a steward session).
 *   2. Otherwise the OS temp dir, keyed by package and user:
 *      `<os.tmpdir()>/designerpunk-docs-mcp-<uid>/logs` (the uid keeps two users of one shared
 *      `/tmp` from colliding on a directory the other cannot write).
 *
 * Log writes are diagnostics: a failure to create or append is reported on stderr and never fails
 * indexing or a tool call (the callers guard it).
 */

import * as os from 'os';
import * as path from 'path';

/** The environment variable that overrides the logs directory. */
export const LOGS_DIR_ENV = 'DESIGNERPUNK_DOCS_MCP_LOGS';

function userKey(): string {
  if (typeof process.getuid === 'function') return String(process.getuid());
  try {
    return os.userInfo().username.replace(/[^A-Za-z0-9._-]/g, '_') || 'user';
  } catch {
    return 'user';
  }
}

/** The absolute logs directory for this process (see the module header for the rule). */
export function resolveLogsDir(env: NodeJS.ProcessEnv = process.env): string {
  const override = env[LOGS_DIR_ENV]?.trim();
  if (override) return path.resolve(override);
  return path.join(os.tmpdir(), `designerpunk-docs-mcp-${userKey()}`, 'logs');
}
