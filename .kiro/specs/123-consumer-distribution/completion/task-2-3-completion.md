# Task 2.3 Completion — Config generation (1.2 i–iv); the test-config purpose + truthful collision string

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 2 · **Agent**: Ada (Sonnet)

## What changed

### Config generation (Requirement 1.2 (i)–(iv))

`generateConfig()` in `src/cli/init.ts`:
- (i) `tokenSource: './src/tokens'` — **unchanged** (Model B keeps this; R2's drop was reversed by Peter's 2026-09-26 ruling, already true of the pre-123 generator).
- (ii)+(iii) the two theme imports (`./src/tokens/themes/{dark,wcag}/SemanticOverrides.ts`) — **unchanged**, already local.
- (iv) `componentTokens` — **RE-POINTED**: `['./src/components', './src/tokens/component']`, replacing `['./src/components/core', './src/tokens/component']`. `./src/components/core` no longer exists (Task 2.2 removed that copy step); `./src/components` is the new consumer-owned directory (Task 2.2's row 4′), matching the resolver's own expectation (`resolveComponentRoots`, Task 1.2: `bornRoot/src/components`).

### Both targets' MCP config — C8, U1 emission (Requirement 19A.5a)

- Kiro's `.kiro/settings/mcp.json` scaffold — **UNCHANGED** (`scaffoldKiroMcpConfig`, the same three-case merge behavior as the pre-123 `scaffoldMcpConfig`, still two servers — the third, product, key arrives at Task 4/C10).
- **NEW**: `scaffoldClaudeCodeMcpConfig` emits `.mcp.json` (the SAME two server entries, with `autoApprove`/`disabled` stripped — CC has no per-server auto-approve field) and `.claude/settings.json`'s `permissions.allow` (derived from the SAME template's `autoApprove` arrays, reformatted to the `mcp__<server>__<tool>` grain C8 specifies for CC). Both files use the same create/merge-carefully semantics as Kiro's scaffold (never overwrite a pre-existing entry; warn on conflict).
- **Flagged interim wiring** (see Application-time adaptations): the approval SOURCE for both targets is still the pre-123 static template's hand-authored `autoApprove` arrays — Task 4 (C8/C10) is what replaces this with a `readOnlyHint`-derived, per-tool-annotated computation for BOTH targets. `src/cli/shared/mcpConfig/{kiro,cc}.ts` — Task 4's own Primary Artifacts — do not exist yet; this subtask's emitters live inline in `init.ts`.

### Test config purpose + truthful collision string (C27 A13)

- `jest.config.js` — unchanged content, but `createFileIfNotExists` now accepts an optional `collisionMessage` override, and `jest.config.js`'s collision uses the new `jestConfigCollisionMessage()` catalog string (`src/cli/shared/errorCatalog.ts`) instead of the generic `skipped: X (already exists)` — states the CONSEQUENCE (*"the DesignerPunk jest preset is not applied"*) and the remedy, per Req 19.3/C27 A13.
- `tsconfig.test.json` — content unchanged EXCEPT `moduleResolution: 'bundler'` → `'node16'` (with `module: 'commonjs'` → `'node16'`) — see Application-time adaptations for why this was a necessary, in-scope fix.

## Targeted tests + result

`npx jest src/cli/__tests__/init.test.ts` → the three new describe blocks (7 tests): both-targets' MCP config (3), test-config collision string (2) — all passing, plus the pre-existing "mcp.json scaffold — partial merge" test (Gap 5 Case 3) still passing unchanged, confirming the Kiro path's merge behavior wasn't disturbed.

`npx jest src/cli/__tests__/init.overRewriteArbiter.test.ts` → **2/2 passed** (this subtask's `tsconfig.test.json` fix is what makes this arbiter runnable at all — see below).

## Application-time adaptations

1. **`tsconfig.test.json`'s `moduleResolution` changed from `'bundler'` to `'node16'`, and `module` from `'commonjs'` to `'node16'`** — a genuine pre-existing defect, unrelated to Task 2's own changes (I inherited this content verbatim from the pre-123 `init.ts`), surfaced by building Task 2.5's real `tsc --noEmit` arbiter for the first time: `moduleResolution: 'bundler'` requires `module` to be `'preserve'` or `>= 'es2015'` (TS5095) — it is incompatible with `'commonjs'` under the installed TypeScript (5.9.3). Changing `module` to an ES-module setting instead would have broken RUNTIME test execution, because `jest-preset.ts` (`src/testing/jest-preset.ts`) passes this SAME `tsconfig.test.json` to `ts-jest`'s transform, and Jest's default module system cannot execute ESM `import`/`export` output. `module: 'node16'` was verified (via a scratch `tsc` compile) to still emit CommonJS (`"use strict"; Object.defineProperty(exports, ...)`) for a package with no `"type": "module"`, while ALSO resolving `@3fn/core/*` subpaths through the real `package.json` `exports` map — the property `moduleResolution: 'node16'` needs and plain `'node'` (legacy) does not have. Flagging this prominently since it's a real behavior change to a file Task 2.3's own criterion ("the test-config purpose") touches, discovered as a side effect of Task 2.5's arbiter rather than being something this subtask set out to fix.
2. **The CC approval computation is a KNOWN INTERIM implementation**, explicitly not the final one — see "What changed" above. This is a genuine sequencing gap (Task 2 needs both targets' configs working NOW; Task 4 owns the principled `readOnlyHint`-derived computation and the dedicated `mcpConfig/{kiro,cc}.ts` modules) rather than a scope decision I made unilaterally — flagged for the orchestrator's awareness and for whoever picks up Task 4.
3. **`.claude/settings.json`'s merge-in behavior for a pre-existing, invalid-JSON file** logs a warning and leaves the file untouched (same defensive pattern as the existing Kiro/`.mcp.json` scaffolds) — no test currently exercises this branch; noted as a coverage gap rather than silently assumed correct.

## Notes for Task 4 (C8, C10, DD8)

- The two new functions (`scaffoldClaudeCodeMcpConfig`, and Kiro's renamed `scaffoldKiroMcpConfig`) are both still INLINE in `init.ts`. Task 4's `src/cli/shared/mcpConfig/{kiro,cc}.ts` should absorb this logic (both the Kiro path, unchanged since pre-123, and the new CC path this subtask added), replacing the static-template-derived approval list with the `readOnlyHint`-derived one from `dist/mcp/tool-manifest.json`.
- The product server's third key (`designerpunk-product`, born-only per C8's table) is NOT emitted by either target's config yet — Task 4/C10's explicit job (`init.test.ts:142`'s planned three-server update).
