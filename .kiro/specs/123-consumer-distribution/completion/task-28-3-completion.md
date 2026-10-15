# Task 28.3 Completion — Product query, seat and bar

**Spec**: 123 · **Unit**: U5 (`task/123-u5-closeout`) · **Parent**: 28 (Closeout) · **Date**: 2026-10-15
**Record by Leonardo** (operator, 28.3's agent): `.kiro/specs/123-consumer-distribution/validation/product-query.md` @ `76de40c4b`. **Subtask doc by Thurgood as Task 28's PRIMARY**, written from that record (Leonardo did not write one; the PRIMARY owes the parent's subtask docs, and this one claims nothing the record does not). **Launcher**: Peter (macOS Terminal).

## What changed

- **Frozen before the run** (`67275cfee`): the prompt `validation/prompts/product-query-leonardo.md` (names the server `designerpunk-product`; a lexical check at freeze found neither tool name nor either expected value), the launch blocks `tests/onboarding-trio/protocol.md` § 16, and the record skeleton with the bar's evidence form.
- **The run**: one fresh headless Claude Code session (2.1.301, from the init event), `--agent leonardo`, in a fresh clone of Task 26.1's CC-born fixture `tests/onboarding-trio/fixtures/born-cc`, stated as such (instruments row 3.5, second form). The seat is confirmed: the session's 44 tools equal the `tools:` list in `.claude/agents/leonardo.md`.
- **The bar, met on both limbs** (read from the `tool_result` blocks, never from the agent's account): (a) `"name": "Order Status"` in the `get_product_overview` result, matching `product/overview.yaml` L3, and stated in the answer; (b) `example-home` in the `find_screens` result, and named in the answer. 4 turns, `success` / `completed`, `permission_denials: []` (record § `budget:`). **Met, n=1.**
- **Written in the record**: the discovery table (two questions, two tools, both succeeded; no other discovery call), the forced negatives (`subject: leonardo` findings: none; product findings: none), two instrument findings (PQ-1, PQ-2) and six observations.

## Targeted tests + result

- `out/prompt.md` byte-identical to the committed prompt (`diff`, no output); `git merge-base --is-ancestor 67275cfee HEAD` → exit 0 (record § `frozen-prompt:`).
- § 16 step 0 at the run: "measured sources unchanged since 4c875235a: 0 paths"; "seat rendering: fixture == canonical at COMMIT" (record § `consumer-repo:`).
- Step 8's bar counts: "bar (a) "Order Status": in the get_product_overview result: 1; in the answer: 2"; "bar (b) example-home: in the find_screens result: 1; in the answer: 1" (record § `bar:`).
- **Owed at 28.4**: the same source check at the U5 PR head — `git diff --name-only 4c875235a <PR head> -- product-mcp-server src/cli canonical/_consumer-output/cc/.claude/agents/leonardo.md package-lock.json` must print 0 paths, or the run is repeated against a release-4 birth (record L62).

## Application-time adaptations

1. **The candidate is the `4c875235a` preview** (`aa3efdcf…`), not the release-4 tarball. It stands in for release 4 on this bar only by the source-level equivalence above, which is re-checked at the PR head.
2. **PQ-1**: Claude Code's default `permissionMode` is now `"auto"`; § 16 passed none. No write was attempted, so the bar is unaffected, but what admitted the two MCP calls cannot be told. Routed in `.kiro/issues/2026-10-15-123-u5-instrument-findings.md` § 4b (Leonardo, protocol); it also bears on 28.1's denial comparison.
3. **PQ-2**: the CLI auto-updated 2.1.300 → 2.1.301 mid-run; the version is taken from the init event. Same record, § 4b.
4. **Observation 1 confirms the install doc**: trust lands in the run store, the server enablement in the repo's `.claude/settings.local.json` — what INSTALL L69 says; R1-12 reproduced on 2.1.301 (same record, § 5).
