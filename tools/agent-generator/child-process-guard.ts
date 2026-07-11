/**
 * Child-process lifetime guard for the harness's spawned MCP servers (U3 found-and-fixed).
 *
 * Every check/generation run spawns MCP servers as stdio children (resolve.ts's
 * StdioCorpusClient; registry.ts's introspectServer). The normal paths close them
 * (`close()` in a finally), but a parent that dies WITHOUT its finallys running — a
 * harness timeout SIGTERM, an uncaught crash, Ctrl-C — orphans the children to PID 1,
 * where the docs server's file watcher keeps them alive forever. Found live at the Lina
 * cutover: ~230 orphaned MCP processes accumulated since 2026-06-29, enough to wedge a
 * canonical-vs-truth run for >1h (the orphans held the run's output pipe open, so the
 * calling shell never saw EOF).
 *
 * This guard registers every spawned transport and SIGTERMs any still-live children on
 * process exit and on fatal signals. It cannot cover parent SIGKILL — the complete fix
 * is server-side (each MCP server self-exiting on stdin EOF), tracked as a routed item
 * in cutover/lina-cutover-report.md.
 */

/** The minimal transport surface the guard needs (the SDK's StdioClientTransport shape). */
export interface GuardedChild {
  pid?: number | null;
}

/**
 * Registered transports → last KNOWN child pid. The SDK's `close()` nulls its `_process`
 * (and thus `.pid`) IMMEDIATELY, then waits up to ~2s for the child to exit on stdin EOF —
 * so during the close window a live child's pid is unreadable from the transport (found
 * live: a SIGTERM landing in that window reaped nothing, "1 registered, pids=<empty>").
 * The snapshot (taken at registration and refreshed via {@link noteChildPid} post-connect)
 * is the fallback. Reaping a snapshot pid can theoretically hit a recycled pid if the
 * child truly died microseconds earlier — the window is the sub-2s close race, pid reuse
 * there is vanishingly unlikely on macOS/Linux sequential allocation, and the cost is a
 * spurious SIGTERM; accepted for a dev-harness guard.
 */
const live = new Map<GuardedChild, number | null>();
let handlersInstalled = false;

/** SIGTERM every registered, still-live child. Sync-only — safe inside an 'exit' handler. */
function killAllSync(): void {
  if (process.env.GUARD_DEBUG) {
    const described = [...live.entries()].map(([c, snap]) => `${c.pid ?? 'null'}(snap:${snap ?? 'null'})`);
    console.error(`[guard] reap pass: ${live.size} registered, pids=${described.join(',')}`);
  }
  for (const [child, snapshot] of live) {
    const pid = typeof child.pid === 'number' && child.pid > 0 ? child.pid : snapshot;
    if (typeof pid === 'number' && pid > 0) {
      try {
        process.kill(pid, 'SIGTERM');
      } catch {
        // already gone — the desired state
      }
    }
  }
  live.clear();
}

const FATAL_SIGNALS = ['SIGINT', 'SIGTERM', 'SIGHUP'] as const;
const SIGNAL_EXIT_CODES: Record<(typeof FATAL_SIGNALS)[number], number> = {
  SIGINT: 130,
  SIGTERM: 143,
  SIGHUP: 129,
};

function installHandlersOnce(): void {
  if (handlersInstalled) return;
  handlersInstalled = true;
  process.on('exit', killAllSync);
  for (const signal of FATAL_SIGNALS) {
    // Installing a handler replaces the default die-on-signal behavior, so exit
    // explicitly with the conventional 128+n code after reaping the children.
    process.on(signal, () => {
      killAllSync();
      process.exit(SIGNAL_EXIT_CODES[signal]);
    });
  }
}

/**
 * Register a spawned child transport for kill-at-exit. Returns the transport for
 * inline wrapping: `guardChild(new StdioClientTransport(...))`. Callers should call
 * {@link noteChildPid} once the child is known to be spawned (after `client.connect`)
 * so the guard holds a pid snapshot that survives the SDK's close-window pid-nulling.
 */
export function guardChild<T extends GuardedChild>(transport: T): T {
  installHandlersOnce();
  live.set(transport, typeof transport.pid === 'number' ? transport.pid : null);
  return transport;
}

/** Refresh the pid snapshot for a registered transport (call after connect resolves). */
export function noteChildPid(transport: GuardedChild): void {
  if (live.has(transport) && typeof transport.pid === 'number' && transport.pid > 0) {
    live.set(transport, transport.pid);
  }
}

/** Release a transport after a graceful close — it no longer needs reaping. */
export function releaseChild(transport: GuardedChild): void {
  live.delete(transport);
}

/** Test seam: run the reap pass directly and report how many were registered. */
export function _reapForTest(): number {
  const count = live.size;
  killAllSync();
  return count;
}
