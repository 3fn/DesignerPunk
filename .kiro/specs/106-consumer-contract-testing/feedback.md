# Spec Feedback: Consumer Contract Testing & MCP Operational Reliability

**Spec**: 106-consumer-contract-testing
**Created**: 2026-06-09

---

## Design Outline Feedback

### Context for Reviewers
- Expanded from original scope (contract tests only) to include MCP health parity → design-outline.md § "Problem Statement"
- MCP audit findings documented in `.kiro/specs/106-consumer-contract-testing/mcp-health-audit.md`
- Fix MCPs first (health parity), then write tests that verify fixed behavior → design-outline.md § "Proposed Solution"
- Product MCP is the only server where file watching adds real value in consumer context → design-outline.md § "Architecture"
- Three open questions need technical input → design-outline.md § "Open Questions"

### Requested Reviewers
- **Ada** — Primary implementer. Owns all three MCP servers. Please review health parity approach and open questions.
- **Sparky** — Consumer perspective. Please review integration test flow — does it match your real product repo experience?

### Open Questions (for reviewers)

1. [@ADA] Should staleness detection in Application/Product MCPs be per-data-source or binary? Docs MCP uses binary (any stale file = degraded). Per-source would report "patterns stale, components fresh" — more informative but more implementation work.
2. [@ADA] For the MCP smoke test in the integration test — MCP protocol (JSON-RPC over stdio) or simpler mechanism? What's the lightest way to verify a server started and indexed successfully?
3. [@SPARKY] Should the integration test verify MCP query correctness (ask for a component, verify data returned) or just startup health? What would have caught the issues you've experienced?

#### [THURGOOD R1]
- Design outline expanded to cover both original consumer contract testing AND MCP operational reliability.
- MCP audit (mcp-health-audit.md) is the evidence base for the expanded scope.
- Execution order: health parity first (fix the MCPs), then contract tests (test the fixed behavior). This avoids testing broken health checks.
- Product MCP path fix (COMPONENT_DIR/TOKEN_INDEX_DIR env vars) is the most immediately impactful consumer-facing bug — likely explains some of the issues Peter experienced.
- Concern: the expanded scope makes this a medium-large spec (~5-7 parent tasks). Worth confirming Ada is comfortable with the combined scope or if she'd prefer to split execution into phases.

#### [SPARKY R1]

**Q3: MCP query correctness vs startup health**

Startup health alone is insufficient. The integration test MUST verify at least one query returns real data. Here's why:

The Product MCP `COMPONENT_DIR`/`TOKEN_INDEX_DIR` bug is a perfect example — the server starts "healthy" (reports `indexed: true` because it found the `product/` directory and parsed YAML) but the GapDetector has zero catalog entries because `COMPONENT_DIR` resolves to `src/components/core` relative to the consumer's cwd (which doesn't exist). The health endpoint reports `healthy` while gap detection is silently broken. A startup-only test would MISS this entirely.

**Recommendation**: Add one targeted query per MCP server in the integration test:
- Application MCP: `get_component_summary({ name: "Button-CTA" })` → verify it returns non-empty data
- Product MCP: `get_product_health()` → verify `catalogSize > 0` (catches the COMPONENT_DIR bug specifically)
- Docs MCP: `get_index_health()` → verify `documentCount > 0`

This isn't "full query correctness testing" — it's a smoke query that verifies the server indexed real data, not empty directories. It adds maybe 3 seconds to the test and catches the exact class of bug that's burned us.

**Consumer DX review of integration test flow:**

The proposed flow (`npm pack → install → init → generate → validate → MCP startup`) matches my real setup experience well. A few gaps:

1. **Missing step: `npx designerpunk sync`** — Yes, the integration test should verify sync works. In product repos, the flow is actually `init → sync → generate`. The `sync` command copies MCP config into `.kiro/settings/mcp.json` and ensures the product directory scaffolding exists. Without it, the MCP servers may not be configured correctly in the consumer's IDE. If `sync` is broken, the whole MCP experience is broken.

2. **Missing step: verify generated output files exist** — The test says "verify output reflects edit" but should explicitly check that `dist/product/ProductTokens.web.css` (and iOS/Android equivalents) are created with non-zero size. I've hit issues where `generate` exits 0 but produces empty output because a config path was wrong.

3. **Token source configuration** — The test mentions "Set tokenSource in config" but doesn't specify where the token source points. In consumer context, it should point to the installed package's `src/tokens/` or use the default resolution. Worth being explicit.

**Product MCP path bug — have I experienced this?**

Yes. I've seen Product MCP return `catalogSize: 0` in `get_product_health()` results, which means the GapDetector can't identify unmatched components in screen specs. I assumed this was because the product repo was new and something wasn't configured. Now reading the audit, it's clear: `runMcpProduct()` never passes `COMPONENT_DIR` or `TOKEN_INDEX_DIR`, so the server falls back to `'src/components/core'` relative to cwd — which doesn't exist in the consumer project. The server starts fine but has no component catalog to compare against.

This also explains why `_componentGaps` in screen specs was always empty in my product repo — the detector had nothing to compare against.

**Integration test: should it verify `npx designerpunk sync`?**

Absolutely yes. The sync command is part of the critical path for consumer setup. The integration test flow should be:

```
npm pack → install → init → sync → generate → validate → MCP startup + smoke query
```

If sync produces a broken MCP config, the servers won't start correctly even if all other steps pass. Testing sync also validates that the MCP config template (`.kiro/settings/mcp.json`) resolves paths correctly from the consumer's perspective.

**One more gap**: The integration test should verify that `designerpunk.config.ts` (or `.js`) is created by `init` and has valid content. I've had issues where init succeeded but the config had an invalid `tokenSource` path that caused `generate` to fail with an unhelpful error.

#### [ADA R1] — Design Outline Review (2026-06-09)

**Overall assessment**: The expanded scope is sound. Health parity + contract tests belong together because the contract tests *validate* the health parity work. Splitting them would leave the health work untested.

---

**Q1: Staleness detection — per-data-source or binary?**

**Recommendation: Binary, matching Docs MCP.**

Rationale:
- **Implementation cost of per-source**: Each Application MCP data source (components, patterns, templates, guidance, token-index, design-philosophy) needs its own `lastIndexTime` and its own filesystem scan path. That's 6 independent staleness checks, each with its own directory scanning logic and file extension filters. Product MCP is simpler (one dir) but still needs separate tracking for screens vs domain-objects vs templates.
- **Maintenance cost**: Every time we add a new data source (which happens — we added guidance in 096, design-philosophy in 098), the staleness detection must be extended. Binary is zero-maintenance on data source addition.
- **Consumer value**: Per-source staleness tells agents *what's* stale, but agents can only do one thing about it: `rebuild_index`. There's no partial rebuild. So the information is diagnostic but not actionable.
- **Counter-argument**: Per-source staleness IS more informative for debugging. "Patterns are stale but components are fresh" helps a developer understand why a query returned unexpected results. But this is a debug aid, not an operational need.

**Decision**: Binary staleness (any file newer than `lastIndexTime` → `degraded`). Add a `staleFiles` array in the warning detail so agents can report *what's* stale when logging, without the implementation complexity of per-source tracking. This matches the Docs MCP pattern exactly and keeps the implementation to ~30 lines per server (copy-paste the Docs MCP `getStaleFiles()` pattern, adjust file extensions and scan paths).

---

**Q2: MCP smoke test mechanism — JSON-RPC stdio or simpler?**

**Recommendation: JSON-RPC stdio. It's lighter than it sounds.**

Rationale:
- MCP servers communicate exclusively over stdio using JSON-RPC. There is no HTTP endpoint. There is no file-based ready signal. Inventing either would be adding test-only infrastructure that doesn't reflect real consumer experience.
- The minimum JSON-RPC interaction is: send `initialize` → receive `InitializeResult`. This is 2 messages. If the server responds to `initialize`, it has: (a) started successfully, (b) loaded its data, (c) registered its transport. That's the smoke test.
- After `initialize`, send one `tools/call` for the health tool (`get_component_health`, `get_product_health`, `get_index_health`). If the response has `status !== 'failed'`, the server indexed successfully.
- Total: spawn process, write 2 JSON lines to stdin, read 2 JSON lines from stdout, kill process. ~15 lines of test code per server.

**Implementation sketch**:
```typescript
function smokeTestServer(entryPoint: string, env: Record<string, string>, healthTool: string) {
  const proc = spawn('node', [entryPoint], { env: { ...process.env, ...env }, stdio: ['pipe', 'pipe', 'pipe'] });
  // Send initialize
  proc.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { capabilities: {} } }) + '\n');
  // Read response, send health tool call, read response, verify status, kill
}
```

**Counter-argument**: JSON-RPC adds protocol coupling — if the MCP SDK changes its framing (unlikely but possible), the test breaks. But since we're testing the actual consumer protocol path, this coupling is a *feature* — it catches protocol changes too.

---

**Health parity approach — correct?**

Yes. Lifting Application + Product to the Docs MCP standard is the right direction. The Docs MCP's `determineIndexHealth()` pattern is proven, simple (filesystem scan + mtime comparison), and has zero external dependencies. Copy the pattern, adjust scan paths and file extensions.

One correction to the design outline: the target-state table shows "Consumer-aware: ⚠️ Watcher useless" for Docs and Application MCPs. The design should explicitly state that in consumer context, staleness detection is *also* meaningless for these two servers (watching immutable package files). The consumer-context health check for Docs/Application should either: (a) skip staleness entirely and report `healthy` if data loaded, or (b) detect consumer context and suppress the staleness check. I'd recommend (a) — detect consumer context by checking if `componentsDir` resolves inside a `node_modules` path, then skip mtime scanning.

---

**MCP internals the audit missed:**

1. **`ProductIndexer` constructor receives `tokenIndexDir` but it's hardcoded to `DEFAULT_TOKEN_INDEX_DIR` in the server constructor** (line 163 of `product-mcp-server/src/index.ts`): `new ProductIndexer(productDir, componentDir, DEFAULT_TOKEN_INDEX_DIR)`. Even though `TOKEN_INDEX_DIR` is read from env for other purposes, the `ProductIndexer` always gets the default string. This is a second bug beyond the CLI not passing the env var.

2. **Application MCP `designLanguagePath`**: The default is `'design-language/design-philosophy.yaml'` (relative to cwd). The CLI `runMcpApp()` doesn't pass a `DESIGN_LANGUAGE_PATH` env var. In consumer context, this file won't exist. Not a crash (the indexer handles absence gracefully), but it's a silent data gap.

3. **Application MCP file watcher scope discrepancy**: The watcher constructor takes `this.paths.componentsDir` but the indexer loads from 5+ directories (components, patterns, templates, guidance, token-index). Even in internal (development) context, only component changes trigger reindex. This is the gap Thurgood identified — but the fix isn't just "expand the watcher." If we watch all 5 directories, we need 5 `fs.watch()` instances (recursive watch can't span disjoint trees). That's the implementation detail to account for in task sizing.

4. **Product MCP `GapDetector` depends on `componentDir`**: The GapDetector loads the component catalog from filesystem to identify unmatched component references in screen specs. If `componentDir` resolves wrong in consumer context, gap detection silently produces false positives (everything looks like a gap).

---

**Combined scope — achievable in one spec?**

Yes, with phased execution within a single spec. Recommended task ordering:

1. **Phase A (Health parity)**: Staleness detection, three-state health, expanded file watching, consumer path fixes, autoApprove
2. **Phase B (Contract tests)**: Export contracts (fast, easy), then consumer integration test (complex, depends on Phase A being done)

This is ~5-6 parent tasks. Achievable but not small. The key risk is the integration test — it involves `npm pack`, temp directories, subprocess management, and JSON-RPC protocol interaction. That's the task that'll take the most iteration.

I'm comfortable with combined scope. The work is coherent — health parity is the *fix*, contract tests are the *verification*. Splitting them into separate specs means the fix ships without automated verification, which defeats the purpose.

---

**Product MCP file watcher scope — performance concerns?**

Watching `productDir` recursively for `.yaml` and `.md` is correct. Concerns:

- **False-positive reindexing**: Not a real risk. Product YAML changes ARE meaningful — every edit to a screen spec, domain object, or template SHOULD trigger reindex. There's no "non-product" YAML in the product directory.
- **Performance**: `fs.watch({ recursive: true })` on macOS uses FSEvents, which is efficient for directory trees. The product directory is small (~50-100 files typically). No performance concern.
- **Debounce**: Use the same 100ms debounce as the other watchers. Multiple rapid file saves (e.g., bulk reformatting) will coalesce into one reindex.
- **One concern**: If the consumer has a large product directory with many non-screen files (documentation, assets), the watcher will fire on those too. Filter to only `.yaml` and `.md` extensions in the event handler (as the design outline states). That's sufficient.

---

**autoApprove for rebuild tools — risk assessment:**

**Low risk. Approve.**

- `rebuild_index` reads from filesystem, rebuilds in-memory state, returns health. No filesystem writes. No external effects. Idempotent.
- `rebuild_product_index` — same characteristics. Reads YAML, rebuilds maps, returns health.
- Worst case: an agent calls rebuild in a tight loop. Result: wasted CPU cycles for a few seconds. No data corruption, no filesystem mutation.
- The Docs MCP's `rebuild_index` is already in autoApprove (line 21 of mcp.json). There's no principled reason to gate the other two differently.

**Recommended addition to mcp.json**:
- `designerpunk-application.autoApprove`: add `"rebuild_index"`
- `designerpunk-product.autoApprove`: add `"rebuild_product_index"`

---

**One additional flag**: The design outline doesn't mention updating the Docs MCP's `autoApprove` list (it's already there). But it should explicitly note that the *Product* MCP `autoApprove` doesn't include many read-only tools that the other servers do (e.g., `get_screen_state_model`, `get_domain_object`, `find_principles`). This is a pre-existing inconsistency, not this spec's problem, but worth noting for a future cleanup pass.

#### [SPARKY R2] — Health Management Model Review (2026-06-09)

**Reviewing**: design-outline.md § "Health Management Model" — first-call gate UX, write-side protocol consumer experience, integration test implications.

---

**First-Call Gate UX: Is 200-500ms noticeable?**

Yes, it's noticeable. No, it's not a problem — *if* there's feedback.

200-500ms is perceptible as a slight lag on first query. In MCP tool-call UX, the agent is already showing "thinking" state to the user, so the rebuild adds to an already-expected delay. The real risk isn't the duration — it's the *silence*. If I ask `get_screen_spec({ name: "Dashboard" })` and it takes 400ms instead of 50ms with no explanation, I'll occasionally wonder "is this thing working?" but won't notice most of the time.

**Recommendation**: Add a `stderr` log line when the first-call gate triggers a rebuild: `[designerpunk] Index stale — rebuilding (took 340ms)`. This is standard MCP practice (servers log to stderr for diagnostics). No user-facing UI impact, but provides breadcrumbs when debugging "why was my first query slow?" situations. Don't log when the check passes — silence means fresh.

---

**First-Call Gate: The mid-session edit gap**

This is the real UX concern. The design outline says:

> "Subsequent calls in the same session skip the check (trust the index)"

And:

> "Fallback: If both mechanisms fail... the first-call gate catches it on the next session's first query."

**The scenario**: I'm implementing a product screen. I have the Product MCP running (session active). I manually edit `product/screens/dashboard.yaml` to fix a typo in a data source path. I immediately query `get_screen_spec({ name: "Dashboard" })`. The write-side protocol says I *should* have triggered `rebuild_product_index`. But I'm a human editing a file in my editor — I didn't know I was supposed to do that. The first-call gate won't help because the session is already active. The file watcher WILL help (if it's working) — but only for the Product MCP.

**The gap**: For Application and Docs MCPs in *development* context (the core repo), the file watcher covers this. But the design outline explicitly states: "skip first-call staleness check when data is in immutable package dirs." That's correct for Application/Docs in *consumer* context. But what about the Product MCP? It watches mutable consumer files — so the file watcher IS the mechanism that covers mid-session edits for product data. This actually works.

**Where it breaks**: If the file watcher has a bug, or if macOS FSEvents delivers the event late (rare but happens with networked filesystems), and the human doesn't trigger rebuild manually. The data is stale until the next session.

**Recommendation**: Consider a lightweight periodic staleness check — not on every call (too expensive if it grows to stat multiple dirs), but perhaps every N minutes or every N calls (whichever comes first). Even `every 50 calls, do a quick stat check` would catch the "been editing files for an hour, watcher silently stopped" scenario. This is a nice-to-have, not a blocker. The file watcher is sufficient for v1.

---

**Write-Side Protocol: Who triggers rebuilds?**

From the design outline:

> "Agents follow this protocol via governance (steering docs, hook system)"

**The consumer perspective**: When I work with Leonardo and he produces a screen spec, does he automatically trigger `rebuild_product_index`? When I (Sparky) edit product tokens, do I automatically trigger rebuild?

**Answer from governance**: Yes — the write-side protocol says the agent who created the staleness resolves it. This means:
- Leonardo writing a screen spec → Leonardo calls `rebuild_product_index`
- Sparky editing product tokens → Sparky calls `rebuild_product_index`
- Ada running `npx designerpunk generate` → pipeline should trigger Application MCP rebuild

**The documentation gap**: The design outline says "document write-side rebuild protocol for agents (governance)" but doesn't specify WHERE this governance lives. Should it be:
- In each agent's system prompt? (Most effective — baked into behavior)
- In a steering doc? (Discoverable but agents may forget)
- In hook scripts? (Automated but fragile)

**Recommendation**: All three. Agent prompts get a one-liner ("After writing to product/, call rebuild_product_index"). Steering doc gets the full protocol for human reference. Hook system (`commit-task.sh`) could optionally trigger rebuild as part of task completion. The hook is the safety net for agents who forget.

---

**Human Direct Edits: What's the mechanism?**

When Peter opens `product/screens/onboarding.yaml` in VS Code and edits it directly, no agent is involved. The mechanisms available:

1. **File watcher** (Product MCP only) — catches it in real-time. ✅
2. **First-call gate** — only if this is the first query in a new session. ❌ if session is active.
3. **Manual rebuild** — Peter would need to know to call `rebuild_product_index`. ❌ unrealistic expectation for a designer.

**For Product MCP**: The file watcher handles this correctly. Human edits product YAML → watcher fires → reindex. No action needed from the human. This is good UX.

**For Application/Docs MCPs in development context**: Same — file watcher handles it. Human edits a schema or steering doc → watcher fires → reindex.

**For Application/Docs MCPs in consumer context**: Not applicable — these files are in `node_modules` and humans don't edit them.

**Verdict**: The file watcher IS the mechanism for human direct edits. The design outline doesn't call this out explicitly. Worth adding a note: "File watchers serve as the mechanism for human edits that bypass agent governance. This is the primary reason watchers remain valuable even with the write-side protocol."

---

**Integration Test: Should it verify the first-call gate?**

**Yes, but carefully.**

The test scenario:
1. Start Product MCP → first call → succeeds (fresh index)
2. Kill server
3. Modify a product YAML file (change a screen name or description)
4. Restart server → first call to `get_product_health()` → verify rebuild happened (response reflects the modification)

This verifies that the first-call gate detects staleness and rebuilds. It's the consumer's guarantee that "if I update my product data and restart my IDE (new MCP session), I'll get fresh data immediately."

**Why "carefully"**: This test depends on filesystem mtime granularity. On macOS HFS+, mtime has 1-second granularity. If the test modifies the file and restarts the server within the same second, the mtime comparison may not detect staleness. The test needs a `sleep(1100)` or explicit mtime manipulation to be reliable.

**Recommendation**: Include this test, but put it in the integration test (`test:consumer`), not the fast export contract test. Add a comment explaining the timing sensitivity. Use `utimes()` to explicitly set the file mtime to `lastIndexTime + 1000ms` rather than relying on wall-clock timing.

---

**Summary of recommendations:**

| # | Recommendation | Priority |
|---|---------------|----------|
| 1 | Add `stderr` log when first-call gate triggers rebuild | Should-have (DX feedback) |
| 2 | Document where write-side protocol governance lives (prompts + steering + hooks) | Must-have (without this, protocol is aspirational) |
| 3 | Add a note that file watchers serve human direct edits (not just agent governance) | Should-have (clarifies design rationale) |
| 4 | Integration test should verify first-call gate (modify file → restart → verify fresh) | Should-have (validates the key guarantee) |
| 5 | Consider periodic staleness re-check as v2 enhancement (every N calls) | Nice-to-have (v2, not blocking) |
| 6 | Integration test needs mtime timing awareness (use `utimes()` not wall-clock) | Must-have if #4 is included |

#### [ADA R2] — Health Management Model Review (2026-06-09)

**Reviewing**: design-outline.md § "Health Management Model"

---

**1. Directory mtime does NOT reliably detect nested file changes — this is a correctness bug.**

The proposal says: "stat() the watched directory root, compare mtime against lastIndexTime."

On POSIX filesystems (macOS HFS+/APFS, Linux ext4, etc.), a directory's `mtime` updates ONLY when direct children are added, removed, or renamed. **Modifying a file's content updates the file's mtime, not the parent directory's mtime.** Editing a file in a subdirectory doesn't even update the subdirectory's mtime — it updates only the file itself.

Example: editing `product/screens/login.yaml` updates `login.yaml`'s mtime. It does NOT update `product/screens/`'s mtime. It does NOT update `product/`'s mtime.

This means the first-call gate would MISS the most common staleness scenario: an agent edits an existing file. It would only catch adding/removing files at the directory root level.

**Fix options (in preference order):**

A. **Walk and stat individual files** — scan all relevant files, find the newest mtime, compare against `lastIndexTime`. This is what the Docs MCP's `getStaleFiles()` already does (it stats every `.md` file, not the directory). The design should say "scan files in the watched directories" not "stat the directory root." For a typical component directory (~100 schema files), this is still <5ms.

B. **Sentinel file** — maintain a `.last-modified` file in each watched directory that agents touch after any edit (write current timestamp). Then stat only that file. Simpler (single stat), but requires writer cooperation (same issue as write-side protocol — if writers don't touch the sentinel, it's useless).

C. **Store per-file mtimes at index time** — at rebuild, record each file's mtime. On first-call gate, re-stat all files and compare. If any differ → stale. More precise than "newest mtime" but same performance characteristics.

**Recommendation**: Option A. It's what Docs MCP already does successfully. The cost model in the design outline says "<1ms (single stat)" — this needs correction to "<5ms (directory scan)" which is still negligible.

---

**2. "Per session" definition — use MCP connection lifecycle, not an invented concept.**

MCP servers run as long-lived processes that accept connections via stdio transport. The lifecycle is:

- **Connection**: established when the MCP client (IDE) spawns the server process and completes the `initialize` handshake
- **Session**: IS the connection. One process = one connection = one session. There's no multiplexing.
- **Session end**: process exits (IDE closes, user kills server, server crashes)

So "first call per session" means: **first tool call after the server starts (or restarts)**. This is clean and unambiguous. The `lastIndexTime` is set during initial indexing at startup. The first tool call checks "has anything changed since I started?" If the server has been running for 3 hours and nobody called any tools, the first tool call after that gap still triggers the gate.

**Concern**: If the server runs for 8 hours between calls (overnight), the first-call gate catches staleness from overnight edits. Good. But if an agent edits files, calls `rebuild_index`, then another agent makes more edits 2 hours later without rebuilding — the second agent's first call was already made (hours ago, before either edit). The gate won't fire again.

**This means "per session" is actually insufficient.** A long-running server needs either:
- A per-call gate (cheap enough to run every time), OR
- A timestamp-gated check: run the gate if `(now - lastGateTime) > threshold` (e.g., 60 seconds)

I'd recommend the threshold approach: run the staleness check if the last check was >30 seconds ago. This handles the "long session, multiple edit cycles" case without stat-scanning on every single tool call. The overhead is a single `Date.now()` comparison per call (<0.001ms) and an occasional directory scan (<5ms).

---

**3. Gate scope — fire on data-returning tools only. Skip health and rebuild tools.**

Reasoning:
- `get_component_health` / `get_index_health` — these SHOULD reflect current index state, including staleness. If we rebuild before answering, we lose the ability to report "you were stale." The gate should NOT fire on health tools — let them report truthfully, including staleness.
- `rebuild_index` / `rebuild_product_index` — these already rebuild. Running a staleness check before a rebuild is pointless overhead.
- All other tools (data queries): YES, gate should fire. These are the tools that would serve stale data.

**Implementation**: maintain a list of "gate-exempt" tool names per server. Typically just the health + rebuild tools (3-4 tools per server).

---

**4. Write-side protocol enforceability — documentation only, but that's OK.**

No, the MCP servers cannot detect "I was written to but not rebuilt" without writer cooperation. The servers don't have filesystem watchers on all data sources (that's the pre-existing gap). Even with expanded watchers, if the write happens during a single tool-call sequence (agent writes file → immediately queries MCP), there's a race between the watcher firing and the query arriving.

**But this is fine.** The design explicitly calls out the two-layer defense:
1. Write-side protocol = best-effort, governance-enforced, handles 90% of cases
2. First-call gate = safety net, catches the rest

Trying to make the write-side protocol enforceable (e.g., MCP server polls filesystem) would duplicate the first-call gate's purpose. Keep them as complementary layers with different failure modes.

**One improvement**: when `rebuild_index` is called, log WHO triggered it and WHY (write-side protocol vs first-call gate vs manual). This gives observability into whether the protocol is actually being followed, without enforcing it mechanically.

---

**5. `npx designerpunk generate` → Application MCP signaling — no mechanism exists, needs design.**

This is a real gap. The `generate` command runs in the user's terminal process. The Application MCP runs as a separate long-lived process (spawned by the IDE). They share a filesystem but have no IPC channel.

**Options:**

A. **Touch a sentinel file** — `generate` writes `token-index/.last-generated` with a timestamp. Application MCP's staleness check sees this file's mtime > `lastIndexTime` → triggers rebuild. This works with the file-scanning approach (fix #1 above) without any new IPC.

B. **Rely on the first-call gate entirely** — `generate` updates files in `token-index/`. If the gate scans that directory's files, it'll detect the newer mtimes. No explicit signaling needed.

C. **Governance protocol** — document that after `npx designerpunk generate`, agents should call `rebuild_index`. This is the write-side protocol. It works when agents run generate; it fails when humans run generate manually (covered by the gate on next query).

**Recommendation**: Option B (file scanning catches it naturally) + Option C (governance for immediate freshness). No need for explicit IPC if the first-call gate scans `token-index/` files as part of its staleness check. The design outline already lists `token-index` as one of the stat targets — just ensure it's scanning FILES, not the directory mtime (fix #1).

---

**6. stat() performance on 5+ directories — fine with file scanning, worth benchmarking.**

The design outline says stat() on each directory is <1ms total. With fix #1 (scanning files, not directories), the math changes:

- Components: ~28 components × 3 files each = ~84 stats
- Patterns: ~10 files
- Templates: ~8 files
- Guidance: ~15 files
- Token-index: ~20 files
- Total: ~137 stat calls

On macOS APFS, a `stat()` call takes ~0.01-0.05ms. 137 calls ≈ 1.5-7ms. This is still well under any perceptible threshold.

**However**: if this is a concern, the sentinel file approach (option B from fix #1) reduces it to 5 stats (one per directory's sentinel). But I don't think it's needed — <10ms once per 30 seconds (with the threshold approach) is negligible.

**Should this use a single sentinel file?** No. Different data sources update at different times via different tools. A single sentinel conflates "patterns changed" with "components changed." Multiple scan paths give accurate per-source staleness detection at minimal cost.

---

**7. Thread safety — confirmed, not a concern.**

MCP servers using stdio transport process one message at a time. The SDK's `StdioServerTransport` reads one JSON-RPC message, awaits the handler, then reads the next. There's no concurrent request handling. A rebuild triggered by the first-call gate will complete before any subsequent tool call is processed.

The only edge case: the FileWatcher fires during a tool call handler (since watchers use `fs.watch` callbacks which run on the event loop). If the watcher triggers a reindex mid-tool-call, the index state could change while a query is reading it. This is a pre-existing concern, not introduced by this spec. It's mitigated by the debounce (100ms) and the fact that index rebuilds are fast (<500ms) and atomic (clear + rebuild, not incremental mutation).

**No new thread safety concern introduced by the Health Management Model.**

---

**8. Consumer-context detection — use package path heuristic.**

The design says "skip staleness for immutable package data" but doesn't specify how consumer context is detected.

**Proposed signal**: Check if the data directories resolve inside a `node_modules` path.

```typescript
function isConsumerContext(dataDir: string): boolean {
  const resolved = path.resolve(dataDir);
  return resolved.includes('/node_modules/') || resolved.includes('\\node_modules\\');
}
```

If `componentsDir` (Application MCP) or `steeringDir` (Docs MCP) is inside `node_modules`, the server is running in consumer context. In that case:
- Skip staleness check (files are immutable — `npm install` doesn't change them until next install)
- Skip file watcher setup (no events will ever fire)
- Report health based on "data loaded successfully" rather than "data is fresh"

This is a simple, reliable heuristic. The only false positive: a developer who clones the DesignerPunk repo inside another project's `node_modules` (nobody does this).

**For Product MCP**: consumer context detection isn't needed — Product MCP always watches the consumer's own `product/` directory, which is mutable. The Product MCP watcher is the one server where consumer-context changes nothing.

---

**Summary of corrections needed in the design outline:**

| Issue | Current Text | Correction |
|-------|-------------|------------|
| Directory mtime | "stat() the watched directory root" | "scan files in watched directories, compare newest mtime" |
| Cost model | "<1ms (single stat())" | "<5ms (file scan)" for first-call gate |
| Session definition | "first tool call per session" | "first tool call after staleness window (>30s since last check)" |
| Gate scope | Implied all tools | Explicit: data-returning tools only, exempt health/rebuild |
| Token-index signaling | Not addressed | Covered naturally by file scanning + governance protocol |
| Consumer detection | Not specified | `node_modules` path heuristic |

---

**Counter-argument to my own review**: I'm adding complexity to what was designed as a "lightweight" gate. The threshold approach (check every 30s instead of once-per-session) and the file scanning (instead of single stat) make this heavier than the original "<1ms single stat" model. If the goal is simplicity, the per-session single-stat approach works for 80% of cases (catches overnight staleness, server restart staleness) and the write-side protocol covers the rest. My corrections optimize for the 20% edge case of "long-running session with multiple edit cycles and no rebuild calls." Peter should weigh whether that 20% justifies the added implementation complexity.

#### [LEONARDO R1] — Health Management Model Review (2026-06-09)

**Reviewing**: design-outline.md § "Health Management Model" — from the perspective of the agent who queries Application and Product MCPs most frequently during screen specification.

---

**Staleness Experience — Yes, I've Hit This**

I've experienced stale MCP data in two concrete scenarios:

1. **Component selection after Lina updates a schema**: I call `find_components({ context: "form-footers" })` or `get_component_full({ name: "Button-CTA" })` during screen specification. If Lina has just added a new prop or modified composition rules, I get old data. I've written screen specs referencing prop combinations that didn't exist yet because the Application MCP was serving pre-update state. The result: platform agents hit validation failures during implementation that I should have caught at spec time.

2. **Product MCP after my own writes**: I write a screen spec to `product/screens/`, then immediately query `get_screen_spec()` to verify it — and get nothing back (or the old version). This is the most frustrating case because *I just wrote the file*. I know it exists. The MCP doesn't.

**Which tools I call most frequently** (in rough order of frequency):
- `find_components` — multiple times per screen spec (searching by context, category, purpose)
- `get_component_full` / `get_component_summary` — once I've identified candidates
- `validate_assembly` — after composing a component tree
- `get_screen_spec` — reviewing existing screens for consistency
- `get_product_tokens` — checking what product-level values exist
- `list_layout_templates` / `get_layout_template` — every screen spec
- `get_experience_pattern` — when a flow matches a known pattern

---

**The 30s Threshold — Acceptable for Cross-Agent Updates, Insufficient for Self-Writes**

For the cross-agent scenario (Lina updates a component, I query later): 30 seconds is fine. In my typical workflow, there's a natural gap between when Lina completes her work and when I start specifying a screen that uses it. Minutes, not seconds. The 30s gate would always catch this.

**But for self-writes, 30s is too long.** My workflow is:
1. Write screen spec YAML to `product/screens/`
2. Immediately query `get_screen_spec()` to verify it parsed correctly
3. Query `validate_assembly` using the component tree I just specified

Steps 2 and 3 happen within seconds of step 1. The 30s threshold gate won't help — the session is active, the gate already fired on my first call minutes ago.

**The write-side protocol solves this**: if I call `rebuild_product_index` after writing a screen spec, my subsequent queries get fresh data. I'm fine doing this. It's a natural part of the "write then verify" loop. But it needs to be muscle memory — if I forget, the data is stale until the file watcher picks it up.

**My preference: (a) always fresh for Product MCP, (b) 30s threshold for Application MCP.**

Rationale: Product MCP is MY data — I write to it and query it in the same session constantly. I need immediate consistency. Application MCP is mostly read-only from my perspective (Lina and Ada write, I read). The 30s window is fine for read-only consumers. The 7ms overhead per call is negligible — I'd pay it gladly for the Product MCP. For Application MCP, 30s is fine because the cross-agent latency is already measured in minutes.

**Counter-argument to my own preference**: Treating servers differently adds implementation complexity. If both use the 30s threshold + write-side protocol uniformly, the architecture is simpler and the write-side protocol covers my self-write case. I can live with uniform 30s *if* the write-side protocol is reliably triggered.

---

**Write-Side Protocol — My Role**

**Q: After writing a screen spec, should I trigger `rebuild_product_index`?**

**Yes. Unambiguously yes.** Here's why it's not redundant:

The Product MCP server doesn't know I wrote the file. It's a separate process watching the filesystem. The file watcher *might* catch it in <100ms — but "might" isn't good enough when my next action depends on that data being indexed. The write-side protocol makes it *deterministic*: I wrote → I rebuild → I query → I get fresh data. No race condition, no "did the watcher fire yet?" uncertainty.

**Proposed convention for my workflow:**
```
1. Write screen spec YAML (file operation)
2. Call rebuild_product_index() — immediate, <500ms
3. Query get_screen_spec() / validate_assembly() — guaranteed fresh
```

This is three calls instead of one, but the second call is fast and eliminates ambiguity. I'm willing to adopt this as standard practice. **Put it in my system prompt.**

---

**Cross-Agent Scenario — When Do I Need Fresh Application MCP Data?**

The realistic scenario:
- Lina adds a new component variant (e.g., `Button-Destructive`)
- I start specifying a screen that needs a destructive action
- I call `find_components({ purpose: "destructive" })` — do I get the new variant?

**Timing analysis**: Lina's work and my work happen in separate sessions. She completes a component, commits, and I start my screen spec task later (minutes to hours later). By the time I query, the 30s threshold has long expired, and the first-call gate would catch any staleness.

**The dangerous scenario**: Lina and I are working in the same session (e.g., she's adding a component I specifically requested for my current screen spec). She finishes, I immediately query. In this case:
- If she triggers `rebuild_index` (write-side protocol) → I get fresh data ✅
- If she doesn't → 30s gate catches it on my next query IF the threshold has elapsed ✅ (probably yes, since her work takes time)
- If I query within the same 30s window → stale ❌

**Verdict**: The write-side protocol is the mechanism that matters here. The 30s gate is the safety net. Both together are sufficient for my workflow.

---

**Missing Gaps — Tools Where I've Gotten Wrong/Empty Results**

1. **`validate_assembly` returning false positives**: I've had validate_assembly report composition violations that were actually allowed (because the component's composition rules had been updated but the MCP was serving stale data). This spec's staleness detection WOULD fix this — it was a data freshness issue, not a tool logic issue.

2. **`get_product_tokens({ category: "layout" })` returning empty**: After authoring tokens in `product/tokens/layout.yaml`, querying immediately returned nothing. This is exactly the self-write problem described above. Write-side protocol fixes it.

3. **`find_components` not finding newly-added components**: Same staleness class. Fixed by this spec.

4. **One gap this spec DOESN'T address**: `validate_assembly` only checks composition rules — it doesn't validate that the token references in a component tree are valid. I can specify `tokens: { color: "color.surface.brand" }` in a screen spec and validation passes even if that token doesn't exist. This is out of scope for Spec 106 (it's query correctness, not health management), but worth noting.

5. **`get_product_health()` reporting `catalogSize: 0`**: Sparky already flagged this — the COMPONENT_DIR bug. I've seen it too. The health endpoint said "healthy" but gap detection was non-functional. This spec's consumer path fix addresses it directly.

---

**Open Questions — My Input**

**Q1 (Binary vs per-source staleness):** I agree with Ada's recommendation — binary. As a consumer, I don't care *which* data source is stale. I care whether my next query will return fresh data. Binary gives me a single signal: "safe to query" or "rebuilding first." Per-source adds information I can't act on differently.

**Q2 (MCP smoke test mechanism):** JSON-RPC is the right choice. As the primary consumer, I want the integration test to exercise the *exact* protocol path I use. If the test uses a side-channel (HTTP, file signal), it's testing a path I never take.

**Q3 (Query correctness in integration test):** I strongly agree with Sparky's recommendation. Startup health alone doesn't catch the `COMPONENT_DIR` bug. Add one smoke query per server. For Product MCP specifically, verify that `get_screen_spec` for a known screen returns non-empty `uiTree` — this validates that the full indexing pipeline (YAML parse → screen model → query resolution) works end-to-end.

---

**One Design Concern: The "autoApprove" Model and My Agency**

The spec proposes adding `rebuild_index` and `rebuild_product_index` to `autoApprove`. I support this fully — I should be able to self-recover without waiting for Peter to click "approve" on a non-destructive read operation.

**But there's a UX question**: When the first-call gate triggers an automatic rebuild, does the tool call block for 200-500ms and then return data? Or does it return a "rebuilding, try again" response? 

**Strong preference: block and return data.** If the MCP returns a "try again" response, I'll have to implement retry logic in my workflow, and platform agents receiving my screen specs will see intermittent empty responses. Block, rebuild, serve. The 200-500ms is invisible within a tool call's normal latency budget.

---

**Summary: What I Need From This Spec**

| Need | Mechanism | Priority |
|------|-----------|----------|
| Fresh data after my own writes to product/ | Write-side protocol (I call rebuild) | Must-have |
| Fresh data when querying after cross-agent edits | 30s threshold gate | Must-have |
| Self-recovery without human intervention | autoApprove for rebuild tools | Must-have |
| Blocking rebuild (not "try again" responses) | First-call gate blocks and serves | Must-have |
| `COMPONENT_DIR` fix so gap detection works | Consumer path resolution | Must-have |
| Smoke query in integration test | Verify indexed data, not just health | Should-have |
| Write-side protocol in my system prompt | Governance documentation | Should-have |

**Overall assessment**: This model works well for my workflow. The combination of write-side protocol (immediate freshness for self-writes) and threshold gate (safety net for everything else) covers my two main staleness scenarios. The 30s threshold is a reasonable balance — I don't need sub-second freshness for cross-agent data, and the write-side protocol gives me immediate freshness where I need it most (my own writes).

Ada's correction about file scanning vs directory mtime is critical — without it, the most common staleness scenario (editing an existing file) would be missed entirely. Support that fix strongly.

---

## Requirements Feedback

### Context for Reviewers
- 10 requirements: R1-R6 MCP health parity, R7-R8 contract tests, R9-R10 governance → requirements.md
- R1 is the threshold gate (30s, file mtime scanning, exempt tools) → requirements.md § "Requirement 1"
- R5 covers consumer path fixes (COMPONENT_DIR, TOKEN_INDEX_DIR, DESIGN_LANGUAGE_PATH) → requirements.md § "Requirement 5"
- R8 integration test includes MCP smoke queries (not just startup) → requirements.md § "Requirement 8"

#### [SPARKY R3] — Requirements R7-R8 Review (2026-06-09)

**R7 (Export Contract Tests) — Failure class coverage assessment:**

The requirement covers the basics (path resolution, `require()`, named exports). But it's missing a failure class I've hit multiple times:

1. **TypeScript type resolution failure** — The export map resolves at runtime (`require()` works) but TypeScript can't resolve types for the subpath. This happens when `package.json` exports specify `"types"` fields that point to non-existent or incorrectly-generated `.d.ts` files. I've had `import { BlendUtils } from '@3fn/core/blend'` fail with "Cannot find module '@3fn/core/blend' or its corresponding type declarations" even though the JS runtime path is valid. The `require()` check in R7 AC2 would PASS this case — the JS resolves fine. But my `tsc --noEmit` build breaks.

**Recommendation**: Add to R7 AC2: "the TypeScript type declaration resolves without error (verified via programmatic `ts.resolveModuleName` or equivalent)." This catches the `.d.ts` path mismatch that `require()` alone misses.

2. **Conditional export mismatches** — `package.json` exports with `"import"` vs `"require"` conditions. If the `"import"` path points to ESM but the types field points to CJS declarations, TypeScript in ESM-mode projects fails. The current requirement doesn't distinguish between CJS and ESM resolution. This is less common but has bitten me once (v11.2.0 → v11.2.1 patch).

3. **Missing re-exports from barrel files** — R7 AC2 says "expected named exports are present" which is good. But the test needs a mechanism to define WHAT the expected exports are per subpath. The design shows a comment `// Per-subpath assertions on expected named exports` — this needs to be a maintained manifest, not generated. If someone removes an export from the barrel, the test should catch it. **Suggestion**: maintain an `expected-exports.json` fixture that lists minimum required exports per subpath. This makes the contract explicit and version-controlled.

**R8 (Consumer Integration Test) — Failure class coverage:**

R8 AC1 lists the flow: pack → install → init → configure → edit → generate → verify. Gaps:

1. **Missing `sync` step** — I raised this in R1. The consumer flow is `init → sync → generate`. The `sync` command configures MCP settings and scaffolds the product directory. Without testing sync, we can't catch failures in the MCP config template resolution. If sync produces a broken `.kiro/settings/mcp.json`, the MCP smoke test (R8 AC2) will fail for the wrong reason — it'll look like a server failure when it's actually a config generation failure. **Add `npx designerpunk sync` between init and generate in R8 AC1.**

2. **Missing `designerpunk.config.ts` validation** — The `init` command creates this config file. If it generates with an invalid `tokenSource` path, `generate` fails with an opaque error. The test should explicitly verify the config file exists and has valid structure before proceeding to `generate`. This isn't a new AC — it fits naturally into R8 AC1 "run `npx designerpunk init`" — but the test should assert the config was created correctly as part of that step.

3. **Generated output file existence** — R8 AC1 says "verify output reflects the edit" but doesn't specify WHICH outputs to check. The generate pipeline produces `dist/product/ProductTokens.web.css`, `dist/product/ProductTokens.ios.swift`, and `dist/product/ProductTokens.android.kt`. The test should verify at least the web output exists with non-zero content. I've had `generate` exit 0 but produce empty files due to misconfigured paths.

**Overall R7-R8 assessment**: The requirements cover the major failure classes (broken paths, missing exports, broken init/generate workflow, broken MCP startup). The gaps are: TypeScript type resolution (R7), `sync` command coverage (R8), and explicit output file validation (R8). These are the failure classes that caused patches v11.1.1, v11.3.0, and v11.4.2 in my recollection.

---

## Design Feedback

### Context for Reviewers
- Shared StalenessGate module with TypeScript interface → design.md § "Threshold Staleness Gate"
- Two-phase execution: A (health parity) → B (contract tests) → design.md § "Overview"
- MCP smoke queries use JSON-RPC stdio protocol → design.md § "Consumer Integration Test"
- 6 documented design decisions → design.md § "Design Decisions"

#### [SPARKY R3] — Design Review (2026-06-09)

**Export contract test — TypeScript type resolution gap:**

The design shows:
```typescript
it('resolves without error', () => {
  const resolved = require.resolve(`@3fn/core${subpath === '.' ? '' : '/' + subpath}`);
  expect(resolved).toBeTruthy();
});
```

This tests CJS `require()` resolution only. It does NOT test TypeScript type resolution. In my real project setup, I use TypeScript with `moduleResolution: "bundler"` or `"node16"`. The type resolution path is different from the runtime path — it reads the `"types"` condition in `exports`, not `"require"`.

**Recommendation**: Add a TypeScript type resolution check per subpath. Two options:

Option A (lightweight — preferred): Use TypeScript's `resolveModuleName` programmatically:
```typescript
import ts from 'typescript';

it('resolves TypeScript types', () => {
  const result = ts.resolveModuleName(
    `@3fn/core${subpath === '.' ? '' : '/' + subpath}`,
    '/tmp/fixture.ts',
    { moduleResolution: ts.ModuleResolutionKind.Bundler },
    ts.sys
  );
  expect(result.resolvedModule).toBeDefined();
  expect(result.resolvedModule!.resolvedFileName).toMatch(/\.d\.ts$/);
});
```

Option B (heavier — catches more): Create a fixture `.ts` file that imports all subpaths, run `tsc --noEmit` against it. This catches not just resolution but also type validity (e.g., broken `.d.ts` files that parse but have incorrect type definitions).

I'd go with Option A for the export contract test (fast, catches the common failure) and consider Option B as part of the integration test if we want deeper validation.

**Integration test flow — does it match my real setup?**

The design shows:
```
npm pack → install in temp dir → init → configure → edit → generate → validate → MCP smoke
```

My real consumer setup flow:
```
npm install @3fn/core → npx designerpunk init → npx designerpunk sync → edit config → npx designerpunk generate
```

**Gaps in the design's flow:**

1. **`npx designerpunk sync` is missing.** This command copies the MCP server config template into `.kiro/settings/mcp.json` so the IDE knows how to spawn the servers. Without it, the MCP smoke queries won't use the correct server entry points or environment variables. The integration test starts servers manually (spawning `node [entryPoint]`), which sidesteps the sync issue — but that means the test isn't validating the real consumer path for MCP server discovery. **Recommendation**: After `init`, run `npx designerpunk sync`, then verify `.kiro/settings/mcp.json` exists and contains valid server configurations. The MCP smoke test should then read server configs FROM that generated file (or at least validate its contents match expectations).

2. **`tokenSource` configuration specifics.** The design says "configure tokenSource" but doesn't specify where it points. In consumer context, `tokenSource` should point to the installed package's token source (resolved via package exports, e.g., `@3fn/core/tokens`). The test should use the same resolution mechanism consumers use — not a hardcoded path to `node_modules/@3fn/core/src/tokens/`.

3. **Token edit specifics.** "Edit a primitive token" — which one? The test should pick a token that appears in the generated output (e.g., change `space100` base value from 8 to 9) and verify the downstream CSS contains `--space-100: 9px` (or whatever the new value is). This validates the full pipeline: source → parse → transform → output.

**MCP smoke query design — correct protocol, one addition:**

The JSON-RPC stdio approach is correct. The smoke queries proposed (`get_component_catalog`, `get_documentation_map`, `get_product_health`) are good choices. One addition:

For the Product MCP, `get_product_health()` verifies indexing works, but it won't catch the `COMPONENT_DIR` bug unless we check `catalogSize > 0` in the response. Make the assertion specific:
```typescript
expect(response.result.catalogSize).toBeGreaterThan(0);
```

This is the ONE assertion that would have caught the bug that's been silently broken in consumer context.

**Design Decision 5 (npm pack) — confirmed correct from consumer perspective.** I've hit issues where `npm link` passed but the published package failed due to `files` field exclusions. `npm pack` is the only way to test what consumers actually receive.

---

## Tasks Feedback

### Context for Reviewers
- 6 parent tasks, 12 subtasks → tasks.md
- Phase A (Tasks 1-4): Ada-owned MCP fixes → tasks.md
- Phase B (Task 5): Ada-owned contract tests → tasks.md
- Task 6: Thurgood-owned documentation & governance → tasks.md
- Execution order: StalenessGate module (1) → Application MCP (2) → Product MCP (3) → Docs MCP (4) → Contract tests (5) → Docs/governance (6)

#### [SPARKY R3] — Tasks Review (2026-06-09)

**Task 5.2 (Consumer Integration Test) — Architecture vs Implementation typing:**

The task is typed as `Architecture`. I disagree — this is `Implementation`.

**Rationale**: The design document already specifies the architecture (npm pack flow, JSON-RPC smoke protocol, the specific tool calls to make). Task 5.2's job is to implement that specified design. Yes, it's complex — subprocess management, temp directories, JSON-RPC framing, timeout handling. But complexity ≠ architecture. The pattern is well-known:
- `npm pack` → temp dir → `npm install` → verify: this is a standard consumer contract test pattern used by every serious npm package
- JSON-RPC stdio spawn → write → read → kill: Ada already sketched the implementation in her R1 feedback (~15 lines per server)

The "Architecture" typing implies design decisions remain to be made. They don't — the design document made them (Decisions 5 and 6). What remains is implementation of a specified design.

**Counter-argument**: The integration test does involve a few micro-architecture decisions (how to manage server lifecycle in Jest, how to handle timeouts, how to structure the temp directory for multi-platform output verification). But these are implementation-level decisions, not system-architecture decisions. They don't affect other tasks or create dependencies.

**Recommendation**: Retype Task 5.2 as `Implementation` with `Tier 3 - Comprehensive` validation (which it already has). This correctly signals that the task is well-scoped and parallelizable — it doesn't need to block other work or produce architectural artifacts for downstream consumption.

**Task 5.2 — Missing `sync` verification:**

The task description lists: "npm pack → temp dir → install → init → configure tokenSource → edit primitive → generate → validate → verify output"

**Add**: `→ sync →` between `init` and `configure tokenSource`. And add a verification step: "verify sync produces valid `.kiro/settings/mcp.json`."

This was my R1 recommendation and I'm reinforcing it here because the tasks doc still doesn't include it. The `sync` command is part of the critical consumer path — if it's broken, the entire MCP experience in the consumer's IDE is broken. The integration test is the only place we can catch this pre-publish.

**Task 5.1 (Export Contract Test) — Add TypeScript resolution:**

The task says: "Verify each: resolves, require() succeeds, expected named exports present."

**Add**: "Verify TypeScript type declarations resolve for each subpath (programmatic `ts.resolveModuleName` or `tsc --noEmit` against fixture)."

This is the gap I described in Requirements feedback. The task should explicitly include this so the implementer knows it's in scope. Without it, we'll catch JS resolution failures but miss `.d.ts` path errors — which is the failure class that's bitten me more frequently in recent patches.

**Task execution order — looks correct:**

Phase A before Phase B is right. You can't write contract tests that verify MCP health behavior until the health behavior is implemented. The task dependencies are implicit but clear: 5 depends on 1-4 being complete (or at least stable enough to test against).

**One concern**: Task 5 is assigned to Ada, who also owns Tasks 1-4. If Ada implements the MCP fixes AND writes the contract tests that verify those fixes, there's a risk of confirmation bias — she might write tests that pass her implementation rather than tests that verify consumer expectations. **Suggestion**: Have me (Sparky) or Leonardo review the consumer integration test assertions before they're finalized. We're the consumers — we know what "working" looks like from the outside.

#### [ADA R3] — Requirements Review (2026-06-09)

**Overall assessment**: Requirements are implementable as written. No conflicts with MCP server internals. A few precision issues below.

---

**R1 AC1 — "30 seconds since the last staleness check"**: Implementable. The design says "30 seconds" but the AC says ">30 seconds have elapsed since the last staleness check." This is a threshold timer, not a per-session check. Each server maintains `lastCheckTime = Date.now()` and compares. Confirmed: no conflict with MCP internals — `StdioServerTransport` processes messages sequentially so there's no concurrency issue with the timer.

**R1 AC5 — Exempt tools list**: The AC names 5 tools but the actual exempt sets differ per server:
- Application MCP: `get_component_health`, `rebuild_index` (2 tools)
- Product MCP: `get_product_health`, `rebuild_product_index` (2 tools)
- Docs MCP: `get_index_health`, `rebuild_index` (2 tools)

The AC lists ALL exempt tools across all servers combined. **Recommendation**: Clarify that the exempt list is per-server (each server exempts its own health + rebuild tools). As written, it reads like every server has all 5 exemptions, which is wrong. Not a blocker — I'll implement correctly regardless — but worth noting for spec clarity.

**R1 AC6 — "individual file mtimes (not directory mtimes)"**: Good. This was the critical correction from my R2 review. Confirmed: the Docs MCP's `getStaleFiles()` already does this correctly (stats every `.md` file). I'll replicate the same scan pattern for Application and Product MCPs.

**R2 AC5 — "empty state SHALL be `failed`"**: The current Application MCP `getHealth()` returns `{ status: 'healthy', componentsIndexed: 0 }` when no components are loaded. Changing this to `failed` is a semantic change that could surprise agents. **However**, this is correct — an MCP server with zero indexed content IS failing to serve its purpose. I'll implement as written.

**R3 AC1 — "200ms debounce period"**: The design says 200ms but the existing Application MCP FileWatcher uses 100ms. Product MCP should match the spec (200ms). **Minor inconsistency**: should Application MCP's existing component watcher also change to 200ms for consistency, or stay at 100ms? I'll use 200ms for Product MCP per spec and leave Application MCP's existing 100ms untouched (R4 doesn't specify changing the debounce).

**R5 AC1 — CLI passes COMPONENT_DIR and TOKEN_INDEX_DIR**: Checked the existing Product MCP server code. `process.env.COMPONENT_DIR || DEFAULT_COMPONENT_DIR` is already read at server startup. The bug isn't that the server ignores the env var — it's that the CLI never passes it. The fix is purely in the CLI, not the server. Implementable.

**R5 AC3 — "path contains /node_modules/ → skip staleness + watching"**: This is the consumer-context detection. One subtlety: in the development repo, `TOKEN_INDEX_DIR` resolves to `./token-index` (no `node_modules` path). In consumer repos, it resolves to `node_modules/@3fn/core/token-index`. So the Application MCP will correctly watch `token-index/` locally but skip it in consumer context. Good.

**R6 AC1-2 — autoApprove**: Checked `.kiro/settings/mcp.json`. `rebuild_index` is already in autoApprove for Docs MCP. Application MCP does NOT have it. Product MCP does NOT have `rebuild_product_index`. Easy addition.

**No conflicting ACs identified.** All requirements are implementable with current server architecture.

---

#### [ADA R3] — Design Review (2026-06-09)

---

**1. StalenessGate Interface — Correct but needs one addition**

The interface is:
```typescript
interface StalenessGateConfig {
  dataDirs: string[];
  fileExtensions: string[];
  thresholdMs: number;
  isImmutable: boolean;
  onRebuild: () => Promise<void>;
}
```

**Missing method**: `markIndexed()` is shown in the class but not in the interface. This is fine if `StalenessGate` is a class (not an interface consumers implement), but the design should be clear: this is a concrete class, not an abstract contract.

**Missing config field**: The gate needs to know which tool names are exempt. Options:
- (a) Pass `exemptTools: Set<string>` in config — cleanest
- (b) Gate caller checks before calling `checkAndRebuildIfNeeded()` — current design ("placement in tool handler" pseudocode shows this)

The current design uses (b): the caller checks if the tool is exempt before calling the gate. I'll implement (b) as designed — it keeps the gate simple and moves the per-server exempt list to the server code where it belongs. **No change needed.**

**Lifecycle correctness**: `StalenessGate` is instantiated once at server startup. `lastIndexTime` is set after initial indexing (before `server.connect()`). `checkAndRebuildIfNeeded()` is called on each non-exempt tool invocation. `markIndexed()` is called after both initial index AND after any successful rebuild. This lifecycle matches all three servers' current patterns. **Correct.**

---

**2. Shared Module Location — Critical Implementation Decision**

The design says: "Shared module (`src/shared/StalenessGate.ts` or equivalent)"

**The problem**: Each server has its own `tsconfig.json` with `rootDir: ./src`. They can't import from each other or from a sibling directory. There's no npm workspace setup. The root `tsconfig.json` only covers `src/`.

**Options evaluated**:

**(a) Copy into each server**: Three identical copies in `mcp-server/src/shared/`, `application-mcp-server/src/shared/`, `product-mcp-server/src/shared/`. Simple, no build changes. But violates DRY — bug fixes must be applied 3 times.

**(b) Put in root `src/` and import via relative path**: e.g., `src/mcp-shared/StalenessGate.ts`. Application MCP's `tsconfig.json` would need `rootDir` changed or paths added to include `../src/mcp-shared/`. This breaks the clean `rootDir: ./src` boundary.

**(c) Create a shared npm package**: e.g., `mcp-shared/` with its own `package.json`. Each server adds it as a file dependency: `"@3fn/mcp-shared": "file:../mcp-shared"`. Clean boundaries, but adds a package.

**(d) Put in `src/mcp-shared/` (root package)**: Since the root `jest.config.js` already includes `product-mcp-server/src` in its roots, and the root `tsconfig.json` covers `src/**/*`, placing the shared module at `src/mcp-shared/StalenessGate.ts` means it's compiled by the root build. Each server imports it via a relative path — but this fails because each server's `rootDir: ./src` restricts what it can import.

**Actual recommendation**: **(a) Copy with a generation note**. The `StalenessGate` class is ~60-80 lines. Copying it into each server's `src/shared/` with a header comment `// Shared module — keep in sync across mcp-server/, application-mcp-server/, product-mcp-server/` is the pragmatic choice:
1. No build infrastructure changes
2. Each server is independently compilable (important for the portable pipeline where servers are bundled separately)
3. The class is small enough that divergence risk is low
4. Task 5's consumer integration test verifies all three servers work, catching any drift

**My implementation plan**: Write it once in `application-mcp-server/src/shared/StalenessGate.ts`, get it working and tested there, then copy to the other two servers with the sync note. Tests live per-server.

---

**3. Three-State Health — One Inconsistency**

The design says:
> `failed`: No content indexed (empty state) or index initialization error

But the current Application MCP `getHealth()` returns:
```typescript
{ status: 'healthy', componentsIndexed: 28, warnings: [...] }
```

There's no `failed` state today — it always returns `healthy` or degraded (based on warnings). The Docs MCP has `failed` (from `determineIndexHealth()` when `errors.length > 0`). I need to add `failed` to Application and Product MCPs. This is correct but worth noting: it's a new status value that agents may not handle yet. Not a blocker.

---

**4. MCP Smoke Queries — No Startup Race Condition**

I verified: all three servers `await` their indexing/startup before calling `server.connect(transport)`. The `StdioServerTransport` only begins reading stdin after `connect()` resolves. This means:

1. Server process spawns
2. Server indexes all data (100-500ms)
3. Server calls `await this.server.connect(transport)`
4. Transport begins reading stdin — NOW it can accept `initialize`

**There is NO race condition.** The integration test can send `initialize` immediately after spawning the process — the message will buffer in the process's stdin pipe until the transport starts reading. The MCP SDK handles this gracefully.

**One caveat**: The test should wait for the server to be "ready" before sending messages. Since MCP over stdio doesn't have a "ready" signal, the test should either:
- (a) Wait for a stderr line indicating startup (all servers log to stderr on startup), OR
- (b) Send `initialize` and set a reasonable timeout (5s) — if no response, fail

I'll implement (a): watch for the stderr log line `"Server running on stdio"` (all three servers emit this), then send the `initialize` request.

---

**5. Application MCP Expanded Watchers — 5 `fs.watch()` Instances**

The design shows 5 watcher configs. Implementation concern from my R2 feedback: 5 separate `fs.watch({ recursive: true })` instances.

**After reviewing the code**: The current `FileWatcher` class takes a single directory and uses one `fs.watch({ recursive: true })`. It's tightly coupled to component reindexing (it calls `this.indexer.reindexComponent(componentDir)`).

**Implementation plan for Task 2.3**: Rather than modifying the existing `FileWatcher` class (which works fine for its component-reindex purpose), I'll create a new `MultiSourceWatcher` class that:
- Takes an array of `{ dir: string, filter: RegExp, handler: () => Promise<void> }`
- Creates one `fs.watch()` per directory that exists
- Skips missing directories without error
- Each watcher triggers its own handler (not shared reindex)

**On 5 `fs.watch()` instances**: macOS FSEvents-backed `fs.watch({ recursive: true })` is efficient — it uses a single kernel FSEvents stream per watch regardless of directory size. 5 instances is not a resource concern. Each one holds an fd and a kernel subscription. Total memory: negligible. The real limit is the system-wide max file descriptors, which is typically 10,240+ on macOS. Five more won't matter.

**One implementation subtlety**: The current `FileWatcher` in Application MCP is created in the constructor (`new FileWatcher(this.indexer, this.paths.componentsDir)`). The expanded watchers need access to paths that may not exist at construction time (e.g., `patternsDir` might be undefined if the env var isn't set). I'll handle this by creating watchers only for directories that are (a) configured and (b) exist on the filesystem.

---

**6. Design Decision 3 (Blocking Rebuild) — Confirmed Correct**

The MCP SDK's `StdioServerTransport` processes one message at a time (await handler → respond → read next). A blocking rebuild of 200-500ms simply extends the tool call response time. No timeout risk — MCP clients (IDE integrations) typically have 30s+ timeouts for tool calls. The agent sees slightly slower first-call response, which is acceptable per all reviewer feedback.

---

#### [ADA R3] — Tasks Review (2026-06-09)

---

**1. Dependency Order — Correct**

StalenessGate (Task 1) → integrate into each server (Tasks 2-4) → contract tests verify everything (Task 5) → docs update (Task 6). This is the right order. Can't integrate what doesn't exist. Can't test what isn't integrated. Can't document what isn't tested.

**One optimization**: Tasks 2, 3, and 4 are independent of each other (they integrate the same StalenessGate into different servers). They could theoretically run in parallel. In practice, I'll do them sequentially because:
- Application MCP (Task 2) is the most complex (expanded watchers, 5 data sources)
- Product MCP (Task 3) is medium (new watcher + path fixes)
- Docs MCP (Task 4) is simplest (already has watcher + health, just add gate)

Doing them in complexity order means lessons from Task 2 inform Tasks 3 and 4.

---

**2. Task 1.1 — Missing Step**

Task 1.1 says "Implement StalenessGate class" but doesn't mention deciding WHERE to put it. Given my Design Feedback above (copy approach), I need to:
1. Write the class + tests in `application-mcp-server/src/shared/`
2. Copy to `mcp-server/src/shared/` and `product-mcp-server/src/shared/`

Step 2 happens at Task 1 completion (before starting Task 2). The tasks.md should acknowledge this is a "write once, copy to all servers" approach. Not a blocker — I know what to do — but it's an implicit step.

---

**3. Task 2.3 — Subtask is Underbounded**

"Expand Application MCP file watcher" needs more than adding watchers. It also needs:
- Defining what "reindex patterns" / "reindex templates" / etc. means — does the full `indexComponents()` run, or are there per-source reindex methods?
- Currently, `ComponentIndexer.indexComponents()` takes all directories and loads everything. There's no `reindexPatterns()` method.

**Options**:
- (a) Each watcher triggers full `indexComponents()` (simple, slightly wasteful for small edits)
- (b) Add per-source reindex methods to `ComponentIndexer` (more surgical, more code)

**Recommendation**: (a) for v1. The full reindex takes ~200ms for the Application MCP. Triggering it on any data source change is acceptable. Per-source methods are a v2 optimization if profiling shows it's needed.

This means Task 2.3's "Each watcher triggers reindex of its respective data source" is over-specified. The practical implementation is: each watcher triggers the same full reindex, just with different file filters to avoid spurious triggers.

---

**4. Task 2.4 — Already Partially Done**

The `.kiro/settings/mcp.json` I examined already has `COMPONENT_DIR` and `TOKEN_INDEX_DIR` in the Product MCP env block:
```json
"designerpunk-product": {
  "env": {
    "PRODUCT_DIR": "...",
    "COMPONENT_DIR": ".../src/components/core",
    "TOKEN_INDEX_DIR": ".../token-index"
  }
}
```

So the LOCAL dev config already passes these vars. The bug is that `src/cli/designerpunk.ts` (the `npx` CLI used in consumer context) doesn't. The `mcp.json` fix for autoApprove is still needed, but the env vars are already there for development mode. Task 2.4 should focus on the CLI fix + autoApprove addition, not local mcp.json env vars.

---

**5. Task 3.2 — "Product MCP is always in mutable context"**

The subtask says "Product MCP is always in mutable context (never skip gate — watches consumer's files)." This is ALMOST correct. Product MCP watches the consumer's `product/` directory (mutable). But it also reads component data from `COMPONENT_DIR` which points into `node_modules` in consumer context. The staleness gate should only scan `productDir` for staleness — not `componentDir` (which is immutable in consumer context).

**Implementation nuance**: `StalenessGate({ dataDirs: [productDir] })` — only the product directory is checked for staleness. Component catalog staleness is irrelevant because it comes from the installed package.

---

**6. Task 5.2 — Integration Test: MCP Smoke Protocol Detail**

The test spawns servers via stdio. Based on my code review:
- All servers log `"Server running on stdio"` to stderr when ready
- The MCP SDK handles `initialize` automatically when using the `Server` class
- The SDK responds with `InitializeResult` containing server info + capabilities

**The test flow should be**:
1. Spawn server process
2. Wait for stderr line matching `"running on stdio"` (ready signal)
3. Send JSON-RPC `initialize` request
4. Receive `InitializeResult` response
5. Send `tools/call` with a smoke query
6. Receive tool result
7. Verify non-empty data
8. Kill process

**Important SDK detail**: The MCP SDK uses newline-delimited JSON-RPC over stdio. Messages are `JSON.stringify(msg) + '\n'`. The test must read line-by-line and parse each line as a JSON-RPC message. The SDK may also send `notifications` (like `notifications/initialized`) that the test should ignore.

---

**7. Missing Task — Product MCP Build Pipeline Check**

Product MCP has no `tsconfig.json` at its root. Its tests are discovered by the root `jest.config.js` (which includes `product-mcp-server/src` in roots). But the Product MCP server runs from `dist/mcp/product-mcp.js` — suggesting it's bundled by the root build into `dist/mcp/`. This means new files added to `product-mcp-server/src/` (like `shared/StalenessGate.ts`) need to be included in whatever bundles `dist/mcp/product-mcp.js`. **I need to check the build scripts before Task 3** to ensure new files are picked up. Adding as a prerequisite investigation step.

---

**8. Summary of Implementation Adjustments**

| Task | Adjustment | Impact |
|------|-----------|--------|
| 1.1 | Copy `StalenessGate` to all 3 server `src/shared/` dirs | Minor — adds copy step |
| 2.3 | All watchers trigger full reindex (not per-source) | Simpler implementation |
| 2.4 | Local mcp.json already has env vars; focus on CLI + autoApprove | Smaller scope |
| 3.2 | Only scan `productDir` for staleness (not `componentDir`) | Correctness fix |
| 5.2 | Wait for stderr ready signal before sending messages | Reliability |
| Pre-3 | Verify Product MCP build pipeline includes new files | Prerequisite check |

**Overall**: The task breakdown is correct for my workflow. No missing high-level tasks. The subtask granularity is appropriate. I'm ready to start with Task 1.1 after this review is accepted.
