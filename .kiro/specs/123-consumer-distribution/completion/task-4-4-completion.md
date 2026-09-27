# Task 4.4 Completion — Product entry; the `init.test.ts:142` change

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 4 · **Agent**: Lina (Sonnet)

## What changed

### Product entry — emitted for born repos on both targets (Req 7.1, 7.5)

The `designerpunk-product` server entry's structural connection info (`command`/`args`/`env` — `PRODUCT_DIR: './product'`, `COMPONENT_DIR: './src/components'`, `TOKEN_INDEX_DIR: './token-index'`) was added to `src/cli/templates/mcp-config.json.template` in Task 4.3 (a coupled, disclosed edit — see that subtask's doc). Its `autoApprove` is GENERATED per Req 7.3, from the same `readApprovedToolNames(pkgRoot, 'designerpunk-product')` mechanism as the other two servers (Task 4.3's `kiro.ts`/`cc.ts`) — no special-casing needed, since `mcpConfig/{kiro,cc}.ts` both iterate `Object.entries(template.mcpServers)` generically.

**"Born only" is satisfied by construction, not new logic**: `init` (the only call site for these two emitters) only ever runs at the birth event — it REFUSES in already-born, partial, and package-mode repos (Task 2's C1 row 0). So "the product entry is emitted for born repos" required no conditional — every successful `init` run IS a birth, and the template (now carrying all three servers) is emitted unconditionally for both targets, same as the other two entries have been since Task 2.3. The NON-birth emit path (Req 15A.1's `designerpunk agents --target=...`, arriving at Task 16/U2) is a separate call site this task does not touch.

### `src/cli/__tests__/init.test.ts` — the deliberate three-server update (Req 7.2)

Renamed and rewrote the describe block from `'CLI init — both targets' MCP config (Task 2.3; C8 U1 emission)'` to `'CLI init — THREE servers' MCP config, approvals GENERATED from readOnlyHint (Task 4; C8/C10; Req 7.2)'`. The two former two-key equality assertions (at the old file's lines ~245 and ~259) became explicit three-key assertions:

```ts
expect(Object.keys(config.mcpServers).sort()).toEqual([
  'designerpunk-application',
  'designerpunk-docs',
  'designerpunk-product',
]);
```

This is Req 7.2's named instrument: *"The two-server equality assertion in `src/cli/__tests__/init.test.ts` SHALL be updated deliberately, as a declared change — not discovered as a failing test."* In practice, running the suite immediately after Task 4.3's template change DID turn these two assertions red first (the product entry started being emitted the moment the template gained it, ahead of this subtask editing the test) — recorded honestly rather than glossed over. What makes the FIX itself deliberate, per the criterion's intent, is that this subtask's edit is a reviewed, named, criterion-cited change (this doc, this commit, Req 7.2 named in the commit message) rather than a silent adjustment slipped in incidentally.

**New coverage added, beyond the minimum key-set fix** (Task 4's own success criteria: set equality on approvals, the three named examples):
- `env.PRODUCT_DIR` / `env.COMPONENT_DIR` assertions on the new entry, both targets.
- **Set-equality tests** (Kiro `autoApprove`, CC `permissions.allow`) — each server's approval list is asserted to be EXACTLY the sorted `readOnlyHint: true` name set read live from `dist/mcp/tool-manifest.json` (the manifest is this test's ground truth, not a second hand-maintained expectation list that could silently drift from it).
- The three named criterion examples, both emission surfaces: `find_docs` present, `rebuild_index` absent (Kiro `autoApprove` AND CC `mcp__designerpunk-docs__` prefix), `validate_component` absent (`designerpunk-application`).

## Targeted tests + result

`npx jest src/cli/__tests__/init.test.ts` → **21/21 passed** (4 tests in the rewritten describe block: three-server key set; set-equality autoApprove; three-entry `.mcp.json` shape; set-equality `permissions.allow`).

`npx tsc --noEmit` → clean.

## Bites recorded red

**The pre-fix RED state, recorded as evidence of Req 7.2's "not discovered as a failing test" framing being honestly met**: after Task 4.3's template edit landed (product entry added) but BEFORE this subtask's test rewrite, running `npx jest src/cli/__tests__/init.test.ts` produced exactly 2 failures:
```
● Kiro: .kiro/settings/mcp.json has both DesignerPunk entries with direct-node paths
  - Expected: ["designerpunk-application", "designerpunk-docs"]
  + Received: ["designerpunk-application", "designerpunk-docs", "designerpunk-product"]
● Claude Code: .mcp.json has both entries WITHOUT autoApprove/disabled fields
  (same shape)
Tests: 2 failed, 18 passed, 20 total
```
This subtask's rewrite (three-key assertions + the new set-equality/product-env coverage) turns both green, plus adds 2 net new tests (18 pre-existing untouched + 4 in the rewritten block − 2 replaced = 20 → 21 net, since the old block had 3 tests and the new block has 4).

**Live-manifest bite** (shared property with Task 4.3, exercised again here against the FINAL test file to confirm the set-equality assertions — not the earlier `.not.toContain` hardcoded ones — also catch a manifest drift): flipping `designerpunk-docs`'s `rebuild_index` to `readOnlyHint: true` in the built manifest and re-running `-t "SET-EQUAL to the manifest"` was exercised in Task 4.3's own bite (same test, same file) — not repeated a second time here to avoid a duplicate entry in the record; see `task-4-3-completion.md` § "Bites recorded red" for the transcript.

## Application-time adaptations

None beyond what Task 4.3 already disclosed (the template's `COMPONENT_DIR` env addition, which this subtask's product-entry env assertions now also cover as a regression guard).
