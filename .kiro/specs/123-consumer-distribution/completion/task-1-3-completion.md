# Task 1.3 Completion — Runner changes (consumer-root defaults removed; user env wins; no `cwd`)

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 1 · **Agent**: Ada (Sonnet)

## What changed

- `src/cli/designerpunk.ts`:
  - `runMcpApp`: removed the hardcoded `COMPONENTS_DIR` and `TOKEN_INDEX_DIR` env computations (both consumer-owned roots — C3's Runner table says "Runner default: none" for both). Kept `PATTERNS_DIR`/`TEMPLATES_DIR`/`GUIDANCE_DIR`/`REGISTRY_PATH`/`DESIGN_LANGUAGE_PATH` (package-owned, "Runner default: pkgRoot") unchanged.
  - `runMcpProduct`: removed the hardcoded `PRODUCT_DIR` (previously `process.env.PRODUCT_DIR || cwd/product`), `COMPONENT_DIR`, and `TOKEN_INDEX_DIR` computations entirely — all three are consumer-owned with "Runner default: none". `spawnServer` is now called with an empty env-vars object for this server.
  - `spawnServer`: reordered the env merge from `{ ...process.env, ...envVars }` to `{ ...envVars, ...process.env }`, so a user-set data-root env value always wins over whatever default the runner computed. Exported (`@internal Exported for testing`, matching the existing `runGenerate`/`runProductOnly` pattern) so it's directly testable. Added a doc comment naming both load-bearing properties (env precedence; no `cwd` option) per C2 D-B3 / C3.
- `src/cli/__tests__/spawnServer.test.ts` (new, 3 tests): user env wins over the runner default; the runner default is used when the user hasn't set the var; no `cwd` option is ever passed.

## Targeted tests + result

- `npx jest src/cli/__tests__/spawnServer.test.ts` → **3/3 passed**.
- `npx jest src/cli/__tests__/` (full CLI suite, to catch any fallout from removing the hardcoded env defaults) → **22 suites, 210 tests passed**.
- `npx tsc --noEmit` at repo root → clean.
- `npm test` (full functional lane) → **373 suites, 9114 tests passed** — no regressions.

### Bites recorded red (each reverted, run, confirmed red, then restored — `git status --porcelain src/cli/designerpunk.ts` showed only the intended diff after each restore)

1. **User-set env wins** — reverted the merge order back to `{ ...process.env, ...envVars }`. Re-ran `-t "user-set data-root env wins"` → **RED**: expected `/user/set/components`, received `/runner/default/components`. Restored; re-ran full `spawnServer.test.ts` → green.
2. **No `cwd` option** — added `cwd: process.cwd()` to `spawnServer`'s spawn options. Re-ran `-t "no cwd option"` → **RED**: `expect(options.cwd).toBeUndefined()` received the repo's absolute path. Restored; re-ran full `spawnServer.test.ts` → green; confirmed `git status --porcelain src/cli/designerpunk.ts` shows only the intended source diff (no stray `.bak` files, no unintended residue).

## Application-time adaptations

1. **`spawnServer` exported for testability**, mirroring the file's existing pattern for `runGenerate`/`runProductOnly` (`/** @internal Exported for testing */`). Not previously exported; this is additive and does not change runtime behavior (the `require.main === module` guard is unaffected).
2. **`runMcpProduct` no longer computes ANY env var** — it calls `spawnServer(serverBundle, {}, true)`. This is a deliberate, literal reading of the Runner table's "none" default for all three of `PRODUCT_DIR`/`COMPONENT_DIR`/`TOKEN_INDEX_DIR`; the product server's own bootstrap (its `require.main` block, still using the deprecated `resolveConsumerOwnedRoot` per Task 1.2's completion doc) computes its own defaults from `process.env` and cwd exactly as it did before this change, so behavior is unaffected until Tasks 1.4–1.6 rewire that server's bootstrap to consult `findDesignSystemRoot`.
3. **No change to `runMcpDocs`** — `MCP_STEERING_DIR` is package-owned per C3's table, out of scope for "consumer-root defaults removed."

## Notes on the fork carried from Task 1.2 (restated, not re-litigated here)

The servers' own `require.main` bootstrap blocks (which actually resolve `COMPONENTS_DIR`/`TOKEN_INDEX_DIR`/`PRODUCT_DIR` at server start, independent of what the runner passes in) still use the deprecated `resolveConsumerOwnedRoot` — they have not yet been rewired to call `findDesignSystemRoot` + the new birth-aware resolvers. This subtask's runner-side change is safe regardless of that pending rewiring: removing the runner's hardcoded env values only means the CHILD PROCESS now sees whatever `process.env` already carries (plus the user's own shell env, which always won anyway under the reordered merge) — the server's own bootstrap logic is unchanged and still produces a valid (if not yet birth-aware) default. The birth-aware behavior activates once 1.4/1.5/1.6 wire the resolvers into the bootstrap blocks.
