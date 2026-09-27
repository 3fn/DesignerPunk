# Task 6.2 Completion — The check, the P1 tier filter, `cannot check`, and the report string

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 6 · **Agent**: Ada (Opus)

## What changed

**New: `src/cli/sync/NameContract.ts`** (a Primary Artifact). This is `sync`'s one report about the consumer's token language. **It reports and never writes** (Req 5A.2 / 5.8).

- **Source**: `<package>/dist/name-contract.json`, the compiled contract from 6.1. It is never recomputed from src at sync time.
- **Present names**: the custom properties **defined** in `<outputDir>/DesignTokens.web.css`, where `outputDir` comes from her `designerpunk.config.ts` (`loadConfig`).
- **The P1 filter** is `TIER_FILTER = { semantic: true /* ALWAYS */, primitive: true /* YES */, component: false /* NEVER */ }`.
  - It is **applied at the check as well as at build**. The check never trusts the file's own filtering: a component-tier entry planted in `referencedNames` is still not reported.
- **Outcomes**:
  - `cannot-check`: there is no `DesignTokens.web.css`, the package has no contract, or the config is unreadable. **Never clean.**
  - `missing`: one catalog line per referenced-but-absent name.
  - `clean`.
  - Every checked report ends with the 5A.4 scope statement.
- **Catalog rows, string-equal**: `missingTokenMessage` ("name contract — missing (A9)") and `cannotCheckMessage` ("name contract — cannot check").
- **`notCheckedMessage(component)`**: the standing *"not checked: <component> builds token names dynamically"* line for a site recorded `uncovered`. There are zero today.

**Wiring (disclosed out-of-list edit)** — `src/cli/sync/index.ts`:
- step **6b**, after the repairs and before the REPORT, pushes a `🔤 Name contract` section into the existing report;
- `SyncOutcome.nameContract` exposes the result;
- `SyncOptions.configLoader` is a test seam passed to `loadConfig`, because jest cannot run the production tsx loader;
- `nameContractSection()` resolves the display paths.
- Nothing in the apply path touches it.

**End to end on the compiled CLI** (a scratch consumer made by the real `init`, then `generate --force`, then `node bin/designerpunk.js sync --dry-run`):
- **clean**, with the scope line;
- `--color-structure-border` and `--space-grouped-normal` deleted from her generated CSS → both reported with their catalog strings, pointing at `src/tokens/semantic/`, with DesignerPunk's values `oklch(0.72 0.018 260)` and `8px`;
- `dist/tokens` moved aside → `cannot check the name contract — no generated web token output found at dist/tokens. …`

## Targeted tests + result

`npx jest src/cli/__tests__/sync.name-contract.test.ts` → **12 passed, 12 total**. The cases:
- the P1 constants;
- clean plus its scope statement;
- **TIER FILTER 1/3**: a removed semantic name → reported, string-equal;
- **2/3**: a removed primitive name → reported, pointing at the primitive tier;
- **3/3**: a component-tier name → not reported;
- the Req 5A.5 bite recipe (remove → named → restore → clean);
- **`cannot check`**, string-equal and never clean;
- **report only**: `dirHash` of `src/tokens` and of the generated output unchanged, even with `--apply`;
- the standing not-checked line;
- no contract in the package → cannot check;
- pure-function string equality;
- (6.3) the `init` `contractHash` case.

Existing sync suites: `npx jest src/cli/__tests__/sync src/cli/__tests__/Manifest.test.ts src/cli/__tests__/FileScanner.test.ts` → **7 suites, 93 tests passed**, unchanged by the wiring.

### Bites (mutate `NameContract.ts` → run → restore; `cmp` confirmed each restore)

| Mutation | Red |
|---|---|
| `component: true` (the component tier let through) | `✕ P1 filter constants…`, `✕ TIER FILTER 3/3 — a COMPONENT-tier name … NOT reported` — **2 failed** |
| `primitive: false` | `✕ P1 filter constants…`, `✕ TIER FILTER 2/3 — a removed PRIMITIVE name → reported` — **2 failed** |
| `semantic: false` | `✕ …TIER FILTER 1/3…`, `✕ Req 5A.5 bite recipe…`, `✕ REPORT ONLY…`, `✕ P1 filter constants…` — **4 failed** |
| `readPresentNames` returns an empty set instead of `null` (no output read as "everything missing") | `✕ no generated web output → cannot check (string-equal), NEVER clean` — **1 failed** |
| the missing row drops "DesignerPunk never adds to them." | `✕ TIER FILTER 1/3…`, `✕ TIER FILTER 2/3…`, `✕ checkNameContract is pure…` — **3 failed** |
| the cannot-check row drops "(This is not a clean report.)" | `✕ no generated web output → cannot check…` — **1 failed** |

## Application-time adaptations

1. **Placeholder fills in the "missing (A9)" row**:
   - `<name>` = the CSS custom property the components reference;
   - `<dp token name>` = the token-index name;
   - `<declared use>` is composed from the schema `tokens:` blocks (*"declared as a color token in Container-Base's schema; …"*, or *"referenced by the compiled component CSS (no schema tokens: declaration)"*);
   - `<Components>` = the attributed components, joined with `, `;
   - `<your semantic tier path>` is filled **per tier**: `src/tokens/semantic/` for semantic names and `src/tokens/` for primitives. P1 was ruled after the row was written. The row's text is unchanged; only the fill follows the name's tier.
   - **UX note for Leonardo (15B)**: `<declared use>` gets long for widely used names. The e2e output above shows real lines.
2. **Strings authored here (no catalog row), pinned by the suite**:
   - the clean line;
   - `SCOPE_MESSAGE` (5A.4: what a clean report does not establish, from C7's bullets);
   - `notCheckedMessage` (text from tasks.md);
   - `contractMissingMessage`;
   - `configUnreadableMessage`.
   - All of them say *"(This is not a clean report.)"* where they stand in for a check.
3. **"Present names" = definitions in `DesignTokens.web.css` only.** A consumer's own `ComponentTokens.web.css` is not counted. The checked tiers (semantic, primitive) are emitted there.
4. **Out-of-list edit, disclosed**: `src/cli/sync/index.ts` gains the imports, step 6b, one `SyncOptions` field, one `SyncOutcome` field and the helper. Authority: the brief's rule (*"a call site in `src/cli/sync/index.ts`"*).
