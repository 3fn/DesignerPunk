Here's how I'd run it, end to end. Nothing executed yet — this is the plan.

## 0. Pick-up checklist (Start Up Tasks)

- Current date: **2026-08-12**. Last governance health check: 2026-08-02 → 10 days, **not overdue**, no flag needed.
- Ownership routing: the MCP servers are **Civitas infrastructure → Thurgood's domain**. This is a mechanical runtime fix rather than a governance decision, so I'd do it directly and note the domain in the PR rather than hand it off. No subagent delegation planned, so the model-tier calibration step is a no-op.
- Task shape: non-spec bug fix, so branch `fix/mcp-stdin-eof-exit` off `main`. One coherent unit — all three servers land in **one PR**; they're the same change and read as a single diff.

## 1. Recon before writing anything

Read, don't assume. Specifically I want answers to:

1. **Where the three entry points actually are** and whether they share code. Glob for the server directories/bins, read each `main()`/startup path and the `bin` entries in `package.json`.
2. **Does the MCP SDK already do this?** Read `StdioServerTransport` in `node_modules/@modelcontextprotocol/sdk`. My working belief is it binds `data`/`error` on stdin and surfaces close via `transport.onclose`, but does *not* self-exit on EOF — I'd confirm rather than state it. If it does expose a clean hook, using it beats hand-rolling a stdin listener.
3. **Is any server module imported in-process** (by tests, by the docs tooling, by another server)? This is the sharpest landmine: a module-level `process.stdin.on('end', () => process.exit(0))` in a file that Jest imports will kill the test worker — and with `/dev/null` or a non-piped stdin, EOF can fire *immediately*. Grep for imports of each server module across `src/`, `__tests__/`, and `.kiro/hooks/`.
4. **How each server is spawned today** — MCP client configs, hooks, any `npm run` wrappers — so I know the realistic stdin conditions (pipe vs. inherited TTY vs. closed).
5. Whether there's existing signal handling (`SIGINT`/`SIGTERM`) I should sit alongside rather than duplicate.

## 2. Design decisions I'd settle before coding

**Shared helper vs. three copies.** If the servers already share a utils module, one `installStdinEofShutdown(server)` helper used three times. If they're isolated packages with no existing shared import, I'd duplicate ~10 lines rather than invent a cross-package dependency for it, and say so in the PR.

**Guard against spurious exit.** Register the handler only on the real entry path (`import.meta.url === process.argv[1]` equivalent / an explicit `main()` call), never at module scope, and skip it when `process.stdin.isTTY`. Without this, the fix trades an orphan-process bug for a "server dies on startup" bug.

**Clean exit means clean.** On EOF: stop accepting work → `await server.close()` / `transport.close()` → let stdout flush → `process.exit(0)`. Plus a short watchdog timer that force-exits if close hangs, so the fix can't itself become the new hang.

**Which event.** `'end'` is the EOF signal; `'close'` also fires on destroy. I'd pick one (likely `'end'`, with `'close'` as belt-and-braces) and make the handler idempotent so double-firing can't double-close.

### The counter-argument you should weigh

**Stdin EOF does not actually cover the reported failure mode in all cases.** If the parent dies but the write end of the pipe was inherited by a grandchild or another process, stdin never EOFs and the server still lingers. Orphan reparenting to `init` doesn't close pipes either. So this fix handles the common case (parent was the sole pipe holder — which is the normal MCP client setup) but is not a general orphan reaper. The more complete mechanisms are parent-PID polling (`process.ppid` changes to 1) or a client heartbeat/idle timeout.

My recommendation: **ship the EOF fix as requested** — it's small, standard for stdio MCP servers, and covers the realistic case. But I'd say plainly in the PR that it's not a complete orphan guarantee, and flag PPID-watch as a possible follow-up rather than silently widening this task's scope. If you'd rather have the stronger guarantee now, that's a scope call for you, not me.

## 3. Implementation

Three edits (or one helper + three call sites), each: guarded registration on the entry path, idempotent EOF handler, awaited transport/server close, watchdog force-exit, brief comment explaining *why* (orphan prevention) so the next reader doesn't delete it as dead code.

## 4. Tests

This project uses **Jest**, not Vitest.

- **Integration test per server (the one that actually proves the bug is fixed):** spawn the server binary as a child with `stdio: ['pipe', 'pipe', 'pipe']`, wait until it's up, close the child's stdin, assert the process exits with code 0 within a bounded timeout. This is the only test that validates real EOF semantics.
- **Unit test:** exercise the shutdown helper against a fake stdin/transport, asserting close-then-exit ordering and idempotence.
- **Regression guard:** a test that importing the server module does *not* register a process-killing handler — that's the specific way this fix could go wrong.
- Timeouts here are wall-clock-sensitive; I'd keep them generous and make sure these land in a functional lane, not asserting tight durations (lane semantics per Start Up Tasks).

## 5. Validation

`npm test` locally (functional lanes). Not performance-system work, so `test:all` isn't required — though the cost delta is seconds, so I'd likely run it anyway. Then a manual smoke: launch each server by hand, close stdin, confirm no lingering process with `ps`. Test-green is necessary but the manual smoke is what I'd actually trust here.

## 6. Governance / docs

**Open question I'd raise rather than guess:** completion + summary docs are defined for *spec* tasks (`.kiro/specs/[spec]/completion/…`), and this is non-spec `fix/` work with no spec home. My assumption absent direction: **no completion/summary doc**; the PR body carries the record instead — `Spec: n/a (non-spec fix)`, `Task: MCP stdin EOF self-exit`, `Agent:`, and the local-validation line. If you want it attached to a spec's completion trail, tell me which spec and I'll write the docs there.

## 7. PR and stop

Branch `fix/mcp-stdin-eof-exit` → commit → push → open PR titled `Fix: MCP servers self-exit on stdin EOF (chore)`, body with the required fields plus the explicit note that this covers pipe-closure orphans and not all orphan cases. Report the PR URL and **stop**. I don't merge; your merge on green is the acceptance.

Two things I'd want your call on before I start: the **completion-doc question** above, and whether the **PPID-watch scope expansion** is in or out. Neither blocks recon — I'd do steps 1–2 while waiting.
