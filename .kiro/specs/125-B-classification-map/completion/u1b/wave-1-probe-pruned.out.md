Here's how I'd run it. Nothing executed yet — this is the plan.

## 0. Pre-flight (Start Up Tasks)

- **Date**: 2026-08-12.
- **Governance health check**: last run 2026-08-02, 10 days ago — not overdue, no flag needed.
- **Scope framing question I'd resolve first**: this is a non-spec fix, so the branch convention is `fix/<slug>`, not `task/<spec>-<N>-<slug>`. But Task-Completion-Protocol's completion/summary doc steps are spec-scoped (`.kiro/specs/[spec]/completion/…`) and have no home for a non-spec fix. My assumption unless you say otherwise: **no completion doc; the PR body carries the validation note**. I'd also grep `.kiro/specs/` for an existing spec that owns MCP server infrastructure — if one exists, this may belong to it as a task rather than a loose fix, which changes branch naming and doc obligations.
- **Routing**: Agent Directory sends *MCP health monitoring* to Thurgood, but that's governance-infrastructure health, not server source code. I'd treat this as a direct in-session fix and not delegate — the task is small, single-file-shaped, and delegate-then-verify would cost more than doing it. Flagging that MCP *server code* ownership is genuinely unassigned in the directory; worth a line of clarification at some point, not a blocker here.

## 1. Orient before touching anything

- Locate the three entry points and confirm they're the real ones (`src/`, plus whatever `package.json` `bin`/`scripts` and the MCP client configs actually launch — if the configs point at a built `dist/` artifact, the fix has to reach the build output, not just source).
- **Check whether the three share a bootstrap module.** This is the fork in the road: if there's a common `startServer`/transport-setup helper, the fix is one place; if not, I'd add a small shared helper rather than paste the same handler three times.
- Read how each server currently sets up its transport and whether any signal handling (`SIGINT`/`SIGTERM`) already exists.
- Check for existing tests around server startup/shutdown.

## 2. Verify the diagnosis before writing the fix

The bug report is plausible but I'd confirm it rather than take it on faith:

- Check the `@modelcontextprotocol/sdk` version in `package.json` and read its `StdioServerTransport` source in `node_modules`. My current understanding is that it attaches `data`/`error` listeners to stdin but *not* `end`/`close` — which is exactly the reported orphan behavior. If a newer SDK version already handles this, the correct fix is a dependency bump, not our own handler, and I'd say so.
- Reproduce it: spawn a server from a throwaway parent, `SIGKILL` the parent, confirm via `ps` the child survives. A fix for an unreproduced bug isn't a fix.

## 3. State the design call and its counter-arguments — before implementing

**Recommendation**: a shared `installStdinEofHandler(stdin, onEof)` used by all three, attaching `end` (and `close`) to trigger a graceful shutdown — close the transport/server, then `process.exit(0)`.

**Where this could be wrong, and the real regression risk:**

- **Self-exit may be the wrong layer.** The robust Unix answer is usually the *parent's* job — process groups, `detached: false`, killing the group on exit. Stdin-EOF detection is a mitigation that only works when the parent actually held the pipe. If a supervisor is spawning these, fixing the supervisor may be the better fix, and doing both is defensible.
- **New failure mode: immediate exit on redirected stdin.** Anything that runs a server with stdin closed or `< /dev/null` — a CI smoke test, a `--version`-style invocation, a background launch — would now exit instantly and look like a crash. This is the concrete thing I'd guard for and verify.
- **Transport coupling.** The handler must be scoped to the stdio path. If any of the three ever runs over HTTP/SSE, an unconditional stdin-EOF exit kills a healthy server.

I'd implement under those stated guards rather than block on an answer, but I want the second bullet visible to you before it ships.

## 4. Implement

1. Add the shared helper (single definition, wherever the existing shared server code lives).
2. Wire it into all three servers at transport-start time, only on the stdio path.
3. Graceful shutdown: close transport → exit `0` (EOF is normal termination, not an error). Add a short watchdog so a hung close still exits.
4. Confirm parity across all three — the bug report names three servers, so all three get the fix, verified individually.

## 5. Tests

- **Unit** on the helper with a mock/`PassThrough` stream: emitting `end` invokes the shutdown callback exactly once; `close` after `end` doesn't double-fire.
- **Integration**, one per server: spawn the real entry point, close its stdin, assert the process exits within a bounded timeout. Slower and slightly flake-prone, which is why the bulk of the logic lives in the unit-testable helper — but at least one end-to-end test is what actually proves the reported bug is dead.
- Jest, per Start Up Tasks — `npm test` for the functional lanes.

## 6. Validate

- `npm test` (functional lanes; this isn't performance-system work, so `test:all` isn't required — though it's seconds either way).
- Manual re-run of the step-2 repro: parent killed, child should now be gone.
- Manual sanity check that each server still starts and answers a normal MCP request over stdio — the fix is worthless if it exits on healthy startup.
- Explicitly test the regression mode: launch with stdin from `/dev/null` and confirm the behavior is what we intend.

## 7. Ship

- Branch `fix/mcp-stdin-eof-exit` off `main` (work never happens on `main`; direct pushes are rejected by branch protection anyway).
- Commit + push.
- Open the PR. Body carries: `Spec:` (n/a or the owning spec if step 0 found one), `Task:`, `Agent:`, and the one-line validation note naming which commands ran locally.
- **Report the PR URL and stop.** I don't merge my own PR — you merge on green, and that merge is the acceptance.
- After merge: delete the local branch (remote auto-deletes).
- Then stop and wait for authorization before anything else.

## What I'd want from you up front

Only one thing is genuinely blocking-adjacent: **whether this is a loose `fix/` or belongs to an existing spec**, since it changes branch naming and whether completion docs are owed. I'd do steps 1–2 regardless while that's settled, since orientation and reproduction are needed either way.
