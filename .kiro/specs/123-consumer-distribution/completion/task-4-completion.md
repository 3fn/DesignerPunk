# Task 4 Completion — Per-harness MCP configuration, tool manifest, and product MCP wiring

**Spec**: 123 — Consumer Distribution · **Unit**: U1 — Distribution substrate & packaging truth (Tasks 1–9, gated at Task 9) · **Type**: Implementation · **Validation**: Tier 3
**Agent (plan)**: PRIMARY Lina (Sonnet)
**Delegated-tier**: plan held
**Traces**: Reqs 5.3, 5.4, 7.1–7.4, 15A.1 · design C8, C10, DD8

---

## Success Criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| **Every registered tool in all three servers declares `readOnlyHint`.** `tool-manifest.test.ts` fails otherwise (bite recorded). Per-server tool and read-only counts are listed. | ✅ verified met | Per-server counts: `designerpunk-docs` 8 tools (7 read-only), `designerpunk-application` 21 tools (20 read-only), `designerpunk-product` 14 tools (13 read-only) — 43 total, 40 read-only. `scripts/__tests__/tool-manifest.test.ts` → `npx jest --config scripts/jest.config.js scripts/__tests__/tool-manifest.test.ts` → **11/11 passed**. Bite (task-4-1-completion.md): the `annotations` line was deleted from the real `mcp-server/src/tools/get-section.ts` → 8/11 tests FAILED with `build-tool-manifest: 'designerpunk-docs' tool 'get_section' has no annotations.readOnlyHint...` → restored → `git diff --stat` clean → 11/11 passed again. |
| `dist/mcp/tool-manifest.json` builds from static registration imports with no server started. | ✅ verified met | `scripts/build-tool-manifest.ts` statically imports `tools` from each server's `src/index.ts` (`require.main === module` gates every server's bootstrap, so importing triggers zero side effects). `npx tsx scripts/build-tool-manifest.ts` → wrote the file, printed no `Server running on stdio` line. `scripts/__tests__/tool-manifest.test.ts`'s subprocess test runs the script end-to-end with a bounded 20s timeout — a stray server start would hang on stdio and time it out, not just print a suspicious line. `npm run build:mcp` (task-4-2-completion.md) produces the file automatically via the new `build:tool-manifest` step. `npm pack --dry-run` → `npm notice 4.0kB dist/mcp/tool-manifest.json` confirms it ships in the real tarball. |
| Per target, the approvals **equal** (set equality) the manifest's read-only set: `rebuild_index` absent, `find_docs` present, `validate_component` absent. | ✅ verified met | `src/cli/__tests__/init.test.ts` › `Kiro: each server's autoApprove is SET-EQUAL to the manifest's readOnlyHint:true set` and › `Claude Code: .claude/settings.json permissions.allow is SET-EQUAL...` — both assert the scaffolded config's approval list, sorted, equals the live manifest's `readOnlyHint: true` name set, per server. The three named examples asserted explicitly, both emission surfaces: `find_docs` present, `rebuild_index` absent, `validate_component` absent. Live-manifest bite (task-4-3-completion.md): flipping `designerpunk-docs`'s `rebuild_index` to `readOnlyHint: true` in the BUILT manifest turned the hardcoded `.not.toContain('rebuild_index')` assertion RED with zero hand edits to `kiro.ts`/`cc.ts` — proving generation, not a copied list — then restored by re-running `build-tool-manifest.ts` (diff showed only the timestamp changed). `npx jest src/cli/__tests__/init.test.ts` → **21/21 passed**. |
| The product entry is emitted for born repos on both targets. **`init.test.ts:142` becomes a three-server assertion in the same commit, with Req 7.2 named in the commit message.** | ✅ verified met | `src/cli/templates/mcp-config.json.template` carries the `designerpunk-product` entry (both targets read the same template); `init` only ever runs at the birth event (refuses otherwise — Task 2's C1 row 0), so "born repos" needed no new conditional. `src/cli/__tests__/init.test.ts` › `Kiro: .kiro/settings/mcp.json has all THREE DesignerPunk entries (Req 7.2's deliberate three-server update)` and the parallel CC test both assert the three-key set. Commit `fa4d5b8275b381def240993bb56eb37fd79def1b` message names "Req 7.2" explicitly (subject line references the deliberate three-server update; body: *"src/cli/__tests__/init.test.ts's two-server equality assertion becomes a deliberate three-server assertion (Req 7.2)"*). |
| *Scope stated*: config shape and approval equality only. Cold-harness behavior is Task 26. | ✅ verified met | Task 4's tests exercise config CONTENT only (`.kiro/settings/mcp.json`, `.mcp.json`, `.claude/settings.json` file contents and the tool manifest) — no test in this task starts a real Kiro or Claude Code harness, opens a live MCP client connection, or observes cold-harness approval-prompt behavior. That observation is explicitly Task 26's (C8: *"The instrument — U5, not U3"* — first-MCP-load field, cross-target join runs). Scope honored by omission, verified by grep: no Task-4-authored test file references a harness process or a live client transport. |

Unmet or partially met criteria: None

---

## Additional verification

**Primary Artifacts: all shipped as declared — `scripts/build-tool-manifest.ts`, the three servers' registration modules, `src/cli/shared/mcpConfig/{kiro,cc}.ts`, `src/cli/__tests__/init.test.ts`.**

**Disclosed out-of-list edits (three, all outside the declared Primary Artifacts list):**

1. **`src/cli/init.ts`** — minimal call-site swap (two inline function bodies deleted, two imports added, the template now read once and passed to both new emitters). **Pre-authorized** by the orchestrator's brief ahead of this task ("4.3 moving the emitters into `mcpConfig/{kiro,cc}.ts` needs `init.ts`'s call sites to change... keep to minimal call-site swap"). Disclosed in task-4-3-completion.md.
2. **`package.json`** — added the `build:tool-manifest` script and chained it into `build:mcp`. **Pre-authorized** by the orchestrator's brief ("If wiring the build (4.2) needs a `package.json` script change, the same rule applies: minimal, disclosed"). Disclosed in task-4-2-completion.md.
3. **`src/cli/templates/mcp-config.json.template`** — removed the (now-dead) `autoApprove` arrays from all server entries; added the `designerpunk-product` entry's connection info (`command`, `args`, `env: { PRODUCT_DIR: './product', COMPONENT_DIR: './src/components', TOKEN_INDEX_DIR: './token-index' }`, `disabled: false`). **NOT pre-named in the orchestrator's brief** — flagged explicitly for review in this task's report. **ACCEPTED by the orchestrator (verification message, this session)**, on authority of **Requirements.md § 19A.5a's root-policy table**: the three scaffolded values this edit sets — component root `./src/components`, token index `./token-index`, product root `./product` — are EXACTLY that table's "Scaffolded config value" column for the Component root, Token index, and Product root rows respectively. The explicit `TOKEN_INDEX_DIR` value on the new `designerpunk-product` entry is 19A.5a clause (b)'s intended behavior (*"An EXPLICITLY SET `TOKEN_INDEX_DIR` that is missing SHALL FAIL LOUDLY, WHATEVER THE POSTURE... which keeps the scaffolded path independent of detection entirely"*) — setting it explicitly, rather than leaving it unset, is what makes a missing/misconfigured token index on the product server fail loud rather than silently falling through to a stale default. Disclosed in task-4-3-completion.md.

No `**Merge gate:**` block is declared for this parent (confirmed via `parseTasksMd` — `mergeGate: []`), so no gate-conditions sub-section applies. No Primary Artifact of Task 4's own is deferred to a later unit.

**Addendum (2026-09-27)**: the Primary-Artifacts line above was reworded to start exactly `Primary Artifacts:` — the parity parser's forced-negative check (D2, PR #211) never recognized the prior inline `Primary Artifacts (as declared in tasks.md): …` phrasing. No status or evidence changed.

---

## Carried, not fixed in this task

1. **Pre-existing unregistered `get_health_status` dead tool file** (`mcp-server/src/tools/get-health-status.ts`) — exported from the docs server's tools barrel (`mcp-server/src/tools/index.ts`) but never wired into `mcp-server/src/index.ts`'s actual `ListToolsRequestSchema` handler, pre-dating this task. Not a *registered* tool, so Task 4's "every registered tool declares `readOnlyHint`" criterion does not reach it — left un-annotated and unregistered. Not a Task 4 Primary Artifact and not introduced by this task. Flagged for Peter/orchestrator awareness (task-4-1-completion.md).
2. **`product-mcp-server/src/index.ts`'s `DEFAULT_COMPONENT_DIR = 'src/components/core'` stale fallback constant** — flagged as an unclaimed residual in Task 2's completion doc ("the orchestrator is routing this"). This task's template now passes an explicit `COMPONENT_DIR` env value to every consumer scaffolded from this point forward, which bypasses the stale default in practice, but the source-file default itself remains untouched. Still routed to the orchestrator/Peter, not absorbed into Task 4's scope.
3. **A6 finding** (`dist/components/**/*.web.js` `require`-ing `.css` files that don't ship in `dist/components`) — carried from before this task (routed to Lina by Task 3); disposition (file as an issue now, or defer to a component-content session) still owed as a one-line answer in this session's report to the orchestrator, separate from Task 4's own scope.

## Incidental behavior change (disclosed, non-criterion)

**Task 4.3**: consolidating the template read from two independent calls (one per emitter, each via its own `readMcpTemplate` invocation) to a single read in `init.ts`'s Step 8 means a broken/missing template now prints its `warning: MCP config template not found/not valid JSON` line **once** instead of **twice**. No criterion or test asserted the duplicate-count; disclosed as an observable output change bundled with the extraction (task-4-3-completion.md).

## Bite restoration mechanics (`dist/mcp/tool-manifest.json`)

Both live-manifest bites (4.1's fixture-throw bite is a source-code bite, not a manifest bite — see above) mutated the BUILT artifact at `dist/mcp/tool-manifest.json` directly (never source, since `dist/` is gitignored and this file is never committed). Restoration in both cases was **a fresh rebuild**, not a copy-back of a pre-bite backup: `npx tsx scripts/build-tool-manifest.ts`, re-deriving the manifest from the actual, unmutated source registrations. A `diff` against a pre-bite backup copy showed only the `generatedAt` ISO-timestamp field differing — confirming the rebuild is deterministic and reproducible, and that the bite left zero residue (`git status --porcelain` reports nothing under `dist/` at any point, since it is gitignored throughout).

---

## Validation

- `npx tsc --noEmit` → clean (re-run at head `fa4d5b82` for this parent completion, per the coordinator's request).
- `npm test` (root, functional lane) → **380 suites, 9188 tests, all pass** (re-run at head `fa4d5b82`).
- `application-mcp-server` jest (`cd application-mcp-server && npm test`) → **29 suites, 369 tests, all pass**.
- `product-mcp-server` jest (`npx jest product-mcp-server/src/__tests__/` from repo root) → **10 suites, 106 tests, all pass**.
- `mcp-server` (docs) jest (`cd mcp-server && npm test`) → **37 suites, 612 tests, all pass**.
- `npm run test:scripts` → **9 suites, 179 tests, all pass** (includes `scripts/__tests__/tool-manifest.test.ts`, 11/11).
- `npx tsx scripts/pack-assert.ts` → **40/40 assertions pass**.
- `npm pack --dry-run` → confirms `dist/mcp/tool-manifest.json` (4.0kB) ships in the real tarball via the existing `files[]` pattern (Task 3.3).
- Every bite (4.1's real-file annotation removal; 4.3's live-manifest mutation) was reverted, run to a confirmed red result, and restored, with `git diff --stat`/`git status --porcelain` checked clean of residue after each restore.
- Pre-build regeneration noise (`docs/tokens.css`, `token-index/semantics.yaml`, untracked `token-index/meta.json`) reverted before every commit; confirmed `git status --porcelain` clean at head.

## Subtask completion docs

`.kiro/specs/123-consumer-distribution/completion/task-4-1-completion.md`, `task-4-2-completion.md`, `task-4-3-completion.md`, `task-4-4-completion.md` (all Lina, Sonnet).
