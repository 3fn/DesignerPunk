# Task 9.2 Completion — Root/union cases

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 9 · **Agent**: Thurgood (Sonnet)
**Delegated-tier**: plan held

## What changed

Added `tests/consumer-integration.test.ts § "Spec 123 Task 9.2 — root/union cases (C6)"` — seven of the 19 U1-scheduled C6 named cases, sharing one `beforeAll`-built "ecosystem" fixture (`ecoDir`: a fresh `npx designerpunk init` + `generate`, behind its own `.git`-file boundary) so the fixture accumulates consumer components across cases without repeated `init`/`generate` cost. Helper additions: `copyRenamedComponent` / `copyForkWithMarker` (copy a REAL shipped package component's `.schema.yaml`/`contracts.yaml`/`component-meta.yaml` into a new consumer-authored declared name, via `js-yaml` parse-mutate-dump — never regex/string-splice on YAML), `queryCatalogCount` / `queryHealthWarnings` (JSON-RPC helpers over a freshly-spawned `mcp:app`).

Named cases (`it()` titles, all prefixed `C6:`):
1. **component catalog equals shipped component-root count** — an empty consumer `src/components/` (freshly born, before any addition): the served catalog count EQUALS the package's own shipped component-root count, both DERIVED (never a magic number).
2. **consumer component appears alongside ecosystem** — one consumer component added (`EcoWidget`, copied from `Badge-Label-Base`): catalog count = shipped + 1; both the new component and the package original are present.
3. **consumer fork inheriting a package parent resolves** — a consumer fork declaring the SAME name as a package component (`Badge-Count-Notification`, marker contract added), `inherits: Badge-Count-Base` unchanged: `get_component_full` shows both the fork's marker (precedence won) AND the inherited-from-package-root contract (the union resolved cross-root at pass 1).
4. **legacy core/ level recognized** — a component nested at `<consumerRoot>/core/EcoLegacyWidget`: `get_component_health`'s `warnings[]` names the legacy level; the component is indexed and queryable.
5. **both launch paths × every 19A.5a row** — table-driven over three rows (component, token-index, product-from-a-subdirectory), comparing a direct bundle invocation (`node <bundle>`, mirroring a scaffolded MCP config) against the CLI runner (`npx designerpunk mcp:app`/`mcp:product`): both report the identical resolved root for every row; the product row (run from a nested subdirectory) anchors to `bornRoot/product`, never `cwd/product` (A11).
6. **launch from a subdirectory of a born repo** — `generate` run from a nested subdirectory of the ecosystem fixture anchors token-index writes to the born root, never the subdirectory.
7. **barrel export forms** — all THREE accepted export forms (function / const / re-export) classify `born` at the packed CLI/MCP level (bornRepo.test.ts already covers the pure-function level; this is the wired-consumer-guard level Req 3.1 requires).
8. **theme root follows the index** — a separate fixture design system with ONE dark override edited to a distinguishable value, generated for real; queried via an explicit `TOKEN_INDEX_DIR` while `cwd` is a DIFFERENT born repo (default overrides): `get_token_details`'s `themeResolutions.dark` returns the FIXTURE's edited value, never the cwd repo's default — proving the theme root follows the served index's own `tierDir` metadata, not a hardcoded `projectRoot/src/tokens` read.
9. **C′ token tiers** — a NEW primitive (`spaceC6Test`) and semantic (`gridGutterC6Test`) authored into a fresh consumer's OWN copied tier (never existing in the package), plus the real `progress.*` component tier: all three appear in the generated index after `generate` — proving the served directory answers WITH her tokens, not merely THAT her directory answered.

## Targeted tests + result

`npm run test:consumer` — all 9 `it()`s in this subtask's describe block **PASS**. See the parent completion doc for the full-suite run.

## Application-time adaptations

1. **"legacy core/ level recognized"**: design.md's row implies the warning is directly observable; in practice `ComponentIndexer`'s legacy-level warning is an INDEX warning (`get_component_health`'s `warnings[]`), not a boot-time stderr line (boot only prints a summary count, `"Indexed N components (K warnings)"`). The case queries `get_component_health` instead of scanning stderr.
2. **"both launch paths × every 19A.5a row"**: exercised against the `born` state only, over three representative roots (component, token-index, product-from-a-subdirectory) — not an exhaustive matrix of every posture × root × launch-path combination in 19A.5a's fuller table. Disclosed in the test file's own header comment for this section.
3. **Fixture ordering**: the ecosystem `beforeAll` runs `generate` immediately after `init` (before any case's `it()` runs) — `generate` never touches `src/components/`, so this does not affect the catalog-count cases, and it keeps the "both launch paths" token-index row in the "index present" state from the start (an earlier attempt without this ran "both launch paths" against an index-absent fixture and the token-index row's success-format log line correctly never appeared, which is why the ordering was added).
