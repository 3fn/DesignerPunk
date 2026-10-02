# Issue: the docs MCP's log directory is cwd-relative (`mcp-server/logs`) — the cause of the stray log that moved the generator lock's input closure (option F3 of the closed lock issue)

**Date**: 2026-10-02
**Status**: ACTIVE
**Owner**: Thurgood (files it and monitors the docs MCP, Civitas stewardship). The fix is in `mcp-server/src/**`, which is outside his write scope, so the fixing owner is named at the trigger, with Peter's routing. **Decision**: none needed for the filing.
**Trigger**: **the monthly health-check walk** (the first one after this lands), or sooner if a stray `mcp-server/logs/` or a `logs/` directory under another cwd is ever found again inside a closure root. Both are events.
**Source**: `archive/2026-10-01-generated-lock-input-closure-differs-by-checkout.md`, option F3 ("Stop the writer"), closed 2026-10-02 with F1 only (#251, `08500f20`). F1 made the closure checkout-independent but did not stop the writer.

---

## The gap (read)

`mcp-server/src/index.ts` on `main` sets `DEFAULT_LOGS_DIR = 'mcp-server/logs'` (L61) and passes it to `DocumentIndexer` (L103). That is a path relative to the process's working directory, so a docs MCP launched from the repo root writes into the repo; launched from elsewhere it writes elsewhere. It is a real cwd-sensitivity bug in the docs MCP, independent of the lock. Its one measured consequence was the stray log that made `inputClosure` differ between checkouts; F1 now excludes gitignored files from the closure, so that consequence is gone, and the writer is not.

## Fix shape (not picked)

An absolute or temp-rooted logs directory (for example under the OS temp dir, or an env-overridable path rooted at the resolved package or repo root). **Surviving counter-argument**: the instance that mattered is already neutralised by F1, so this is hygiene with a cost (a change to a server three agents depend on, plus its test) and no current failure; it may rightly wait until the docs MCP is next touched.

## Not in scope here

Any edit to `mcp-server/src/**`.

## Filed by

Thurgood, 2026-10-02, in the U2b closeout bookkeeping PR, so closing the lock issue leaves no untracked carry.
