# Signatures — `sparky` (C1, owner seat)

**Rows**: `canonical/profiles/consumer/sparky.dispositions.yaml` — the 8 ROUTED body units and the 20 `no-consumer-counterpart` frontmatter rows (Req 11.4.1). The sheet was regenerated at `60b0fdb5`.
**Signer**: Sparky. The owner signs because the owner is not the profile author (C1; design C16/C17).
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase two.

**Rule applied (Req 11.6.5e)**: `surviving` lists exactly the confirmed items that the unit's own rendering entails, reading repo-bound referents re-keyed to the consumer's repo (5b). Nothing elsewhere in the rendered charter credits a unit (5e scope). A `no-consumer-counterpart` row is assented with `surviving: []` when I agree that no consumer counterpart exists and that the cited subtraction applies.

**Sources read per row**: `canonical/_consumer-output/_canonical/agents/sparky.md` (the unit's own rendering), `canonical/profiles/consumer/sparky.overlay.md`, the row, and `canonical/agents/sparky.md`.

## `#identity`

signer: sparky

**ASSENT — surviving 7**: `sparky-implement-with-care`, `sparky-understand-intent`, `sparky-domain`, `sparky-leonardo-primary`, `sparky-system-through-leonardo`, `sparky-human-decides`, `sparky-partner`. All 7 confirmed items appear in the unit's own rendering. Five are verbatim. `sparky-human-decides` and `sparky-partner` appear with the repo-bound referent re-keyed: "Your human lead makes final decisions. You are their partner, not their tool." That is the same constraint with "Peter" re-keyed to the consumer's human lead (5b). The Sarah Parks naming history still names Peter, but it is orientation, not an item.

## `#out-of-scope`

signer: sparky

**ASSENT — surviving 7**: `out-1`, `out-2`, `out-3`, `out-4`, `out-5`, `out-6`, `out-7`. All 7 items survive. `out-1`–`out-6` are verbatim. `out-7` is re-keyed ("Product decisions — that's your human lead's job"), which is the same boundary.

## `#blocking-exception-direct-escalation-to-peter`

signer: sparky

**ASSENT — surviving 3**: `blocking-direct`, `blocking-exception`, `blocking-when-in-doubt`. All 3 items survive. `blocking-direct` is re-keyed ("flag directly to your human lead for routing to Thurgood"). The consumer ships its own Thurgood (Req 11.1.1), so the route resolves. `blocking-exception` and `blocking-when-in-doubt` are verbatim, and their referent (the direct flag) is in the same unit.

## `#with-peter`

signer: sparky

**ASSENT — surviving 3**: `human-1`, `human-2`, `human-3`. 3 of 4 items survive. `human-1` and `human-3` survive re-keyed or verbatim. `human-2` survives as "Respect your human lead's eye — if something doesn't look right to them, it probably isn't": "looks right" is still the visual judgment, so the constraint is entailed.

**`human-4` does not survive.** Its premise ("skillset largely lives in design") is a fact about one person and cannot be re-keyed: for a consumer whose lead is an engineer, it would be false. Its re-keyable remainder (help your lead with technical nuance) is carried in substance by `human-3` in the same rendering. I don't refuse, because re-pointing the premise would not produce a true consumer instruction.

**Residual for the profile author**: the removal cites `subtraction-2` ("authority claims naming people"). `human-4` is a claim about a person, not an authority claim, so the citation fits loosely (Req 11.3 (iii), mis-attribution). It's recorded here, not refused.

## `#how-to-use-designerpunk-tokens-on-web`

signer: sparky

**ASSENT — surviving 5**: `tokens-1`, `tokens-2`, `tokens-3`, `tokens-4`, `ground-truth-live`. All 5 items survive. `tokens-1`–`tokens-4` are verbatim; the consumer install exports `@3fn/core/tokens.css` and `@3fn/core/component-tokens.css`, so `tokens-1` resolves. `ground-truth-live` survives re-pointed: "query `get_token_details` / `search_tokens` … rather than reading generated CSS by hand". Every implementation that complies with that also complies with "never read the built `dist/*.css` snapshots; query …". The removed pointer ("see the Ground truth section") names this repo's trim manifest, which has no consumer counterpart (see the `groundTruthManifest` rows below).

## `#platform-currency-expectations`

signer: sparky

**ASSENT — surviving 5**: `currency-1`, `currency-2`, `currency-3`, `currency-4`, `currency-5`. All 5 items survive. `currency-3` is re-keyed ("When your human lead or Leonardo mention …"); the rest are verbatim.

## `#what-you-dont-own`

signer: sparky

**ASSENT — surviving 4**: `not-own-1`, `not-own-2`, `not-own-3`, `jest-not-vitest`. All 4 items survive. `not-own-1`–`not-own-3` are verbatim. `jest-not-vitest` survives re-pointed: re-keyed to the consumer's repo, it says "use this project's test runner, never another runner's invocation". The rendering says "Your repo's own test runner and scripts are the ones to use — read them from its `package.json` before you run anything". Every implementation that complies with that complies with the re-keyed item. The removed Jest/Vitest specifics are this repo's tooling (`subtraction-1`), and the citation applies.

## `#frontmatter:ambient.groundTruthManifest.verdict`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). The verdict (`none-trim-stale-snapshots`) is this repo's ambient-trim instrument over its own build outputs (`subtraction-3`). For a consumer, the installed package's `dist` CSS is the released artifact for the version they run, not a stale snapshot, so there is no counterpart to re-point. The consumer-relevant function (query MCP for token values) survives in the body's re-pointed ground-truth items.

## `#frontmatter:ambient.groundTruthManifest.trims[dist/web/DesignTokens.web.css]`

signer: sparky

**RE-SIGN 2026-09-29 — ASSENT to the changed disposition** (`superseded-by #mcp-practice-notes`, cites `subtraction-5`; `surviving: []`, since frontmatter entries carry no items). Per the VALVE-1 note, a trim row's `renderedHash` is the empty-piece hash, so I signed on the text. I read the rendered `#mcp-practice-notes`: "**Ground truth is live** — reach for `get_token_details` / `search_tokens` (application) for token values rather than reading generated CSS by hand." The trim's function is "don't read that CSS file for token values; query `get_token_details`", and that line carries it for every generated token CSS, whether or not `dist/web/**` still ships. So the supersession holds before and after Task 16.3. The 16.3 dependency named above the row matters only to the `subtraction-5` citation (the path stops resolving once `dist/web/**` leaves the package), and the ruling does not rest on it. The root `dist/DesignTokens.web.css` (`@3fn/core/tokens.css`) stays importable, which is consistent with `tokens-1`.

*Prior ruling (phase two)*: assented `no-consumer-counterpart` (`subtraction-3`).

## `#frontmatter:ambient.groundTruthManifest.trims[dist/ComponentTokens.web.css]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). Same reasoning as the DesignTokens trim. For a consumer, `@3fn/core/component-tokens.css` is the released artifact, so there is no stale-snapshot hazard to trim. No counterpart (`subtraction-3`).

## `#frontmatter:ambient.groundTruthManifest.trims[dist/browser/demo-styles.css]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). This is this repo's demo-page chrome, trimmed from this repo's ambient set. A consumer has no demo pages and no ambient that would include it. No counterpart (`subtraction-3`).

## `#frontmatter:routes.docs[completion-doc-guidance]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). This routes to the completion-documentation guide, which is this repo's task-completion workflow as law (`subtraction-4`). The consumer's completion practice is their own. No counterpart.

## `#frontmatter:routes.docs[dev-workflow-detail]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). `process-development-workflow` is this repo's development workflow as law (`subtraction-4`). No counterpart.

## `#frontmatter:routes.docs[file-organization]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). `process-file-organization` is this repo's file-organization rules (the `.kiro/specs` layout) as law (`subtraction-4`). The consumer organizes their own repo. No counterpart.

## `#frontmatter:routes.cues[7]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). The `platform-resource-map` cue returns this repo's cross-platform file paths for component source. Those paths don't exist in a consumer install (web sources are not shipped). No counterpart. *Citation note*: `subtraction-5` (a non-resolving route) fits more closely than `subtraction-1`. This is recorded, not refused.

## `#frontmatter:routes.cues[8]`

signer: sparky

**RE-SIGN 2026-09-29 — ASSENT to the re-pointed row** (`surviving: []`). The rendered cue reads: "you need the platform-technology reference for products built with DesignerPunk (platform frameworks, web CSS standards, True Native architecture, versions)" → `get_section` (docs) on `technology-stack`. That doc ships (`governance/` is in `package.json` `files`), and its sections match the narrowed `when`: Platform Technologies, Web CSS Standards and True Native Architecture. The dropped "build tooling" is the doc's Build & Runtime Tooling section, which covers this repo's `tsx` and ESLint (`subtraction-1`, applies). I accept the re-point over my phase-two `no-consumer-counterpart` assent. The doc's Web section (Web Components with CSS logical properties) is consumer-relevant, and the earlier disposition dropped it with the tooling. *Residual, not refused*: "versions" in the `when` has no counterpart in the doc today (it lists no versions). The route still resolves.

*Prior ruling (phase two)*: assented `no-consumer-counterpart`.

## `#frontmatter:commands[build]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). `npm run build` is this repo's full build (`runContext: this-repo`; `subtraction-1`). The consumer's build lives in their app; the re-pointed `commands[product-screen-commands]` names that. No counterpart.

## `#frontmatter:commands[build-browser]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). `npm run build:browser` and the bundle ceiling in `scripts/build-browser-bundles.js` are this repo's tooling (`subtraction-1`). No counterpart.

## `#frontmatter:commands[web-tests]`

signer: sparky

**RE-SIGN 2026-09-29 — ASSENT to the changed disposition** (`superseded-by #what-you-dont-own`, function grain; `surviving: []`). The command's function is running the web component tests, with the right runner and never Vitest's `--run`. The rendered `#what-you-dont-own` carries that function in the consumer's repo: "Your repo's own test runner and scripts are the ones to use — read them from its `package.json` before you run anything". What doesn't carry over is the path scope `src/components/`. That path is this repo's layout (`subtraction-1`), and the citation applies.

*Prior ruling (phase two)*: assented `no-consumer-counterpart`.

## `#frontmatter:commands[functional-suite]`

signer: sparky

**RE-SIGN 2026-09-29 — ASSENT to the changed disposition** (`superseded-by #what-you-dont-own`, function grain; `surviving: []`). "Run the full functional suite" becomes, in the consumer's repo, "run your repo's own test scripts, read from its `package.json`", which is the sentence the rendered `#what-you-dont-own` states. `npm test` itself is this repo's script (`subtraction-1`).

*Prior ruling (phase two)*: assented `no-consumer-counterpart`.

## `#frontmatter:commands[lint]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). `npm run lint` is this repo's eslint over its web component sources (`subtraction-1`). No counterpart.

## `#frontmatter:commands[serve]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). `npm run serve` serves this repo's demo output on port 8001 (`subtraction-1`). No counterpart.

## `#frontmatter:commands[test-consumer]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). `npm run test:consumer` verifies this repo's publish path, so it is a producer-side check (`subtraction-1`). No counterpart.

## `#frontmatter:commands[web-dev-server]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). This is a named gap about this repo (`build:watch` is tsc-only). A consumer's dev server is their own app's, reached through the product-screen-commands gap (`subtraction-1`). No counterpart.

## `#frontmatter:commands[web-test-lane]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). This is a named gap about this repo's Jest lanes (`subtraction-1`). No counterpart.

## `#frontmatter:knowledgeBases[web-components]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). The globs `src/components/core/*/platforms/web/**` do not resolve in a consumer install: `@3fn/core`'s `files` list ships iOS/Android platform sources and component metadata, but no web platform sources (`subtraction-5`, applicability verified against `package.json`). No counterpart.

## `#frontmatter:writeScope[docs/specs/**]`

signer: sparky

**RE-SIGN 2026-09-29 — ASSENT to the changed disposition** (`superseded-by writeScope[.kiro/specs/**]`, cites `subtraction-4`; `surviving: []`). The function (write to this agent's spec and summary docs) goes to the re-pointed `specs/**` scope in the rendered frontmatter; summaries now live under `specs/*/`. The `docs/specs/**` tree is this repo's summary layout under its spec workflow (`subtraction-4`).

*Prior ruling (phase two)*: assented `no-consumer-counterpart`.

## `#mcp-practice-notes`

signer: sparky

**RE-SIGN 2026-09-29 — ASSENT, surviving 3/3**: `ground-truth-live-mcp`, `rebuild-product`, `mcp-fallback`. This resolves my phase-two refusal: Thurgood re-authored the row at `5a6e35d3`, so this is not assent-only. I re-judged the unit in full against the new rendering.
- `ground-truth-live-mcp` survives, unchanged from phase two.
- `rebuild-product` is verbatim.
- `mcp-fallback` now falls back to paths that exist in a consumer install. It reads the installed package's component metadata (`node_modules/@3fn/core/src/components/**/{*.schema.yaml,contracts.yaml,component-meta.yaml}`) and its types (`node_modules/@3fn/core/dist/browser-entry.d.ts`) for component APIs, and its governance docs under `node_modules/@3fn/core/.kiro/steering/`. It globs the consumer's own `.test.ts` files for test patterns and still says to check index health. I checked all three package paths against `package.json` `files` (`src/components/**/{…}`, `dist/browser-entry.d.ts`, `.kiro/steering/`). With the repo-bound referent re-keyed (DesignerPunk's web implementation sources, which aren't shipped, become the shipped component API surface), every compliant implementation complies with the item.
- The new removal cites `subtraction-5`, a route that doesn't resolve. That applies: `src/components/` holds no DesignerPunk web sources in a consumer repo.

*Prior ruling (phase two, `62c4aa73`), superseded by the above*: REFUSE `should-re-point`. `mcp-fallback` grepped `src/components/` for web implementations, which is dead in a consumer install.

## Signing run summary (2026-09-29, phase two)

- **Commits** (branch `task/123-u2b-fr2-sparky`, from `60b0fdb5`):
  - `bc5955fb`: the 27 assents.
  - The commit that adds this summary: the one refusal, issued second, in its own commit.
- **Rows signed**: 28 of 28 (8 routed + 20 `no-consumer-counterpart`).
- **Routed assents** (surviving/items):
  - `#identity` 7/7
  - `#out-of-scope` 7/7
  - `#blocking-exception-direct-escalation-to-peter` 3/3
  - `#with-peter` 3/4 (`human-4` not surviving)
  - `#how-to-use-designerpunk-tokens-on-web` 5/5
  - `#platform-currency-expectations` 5/5
  - `#what-you-dont-own` 4/4
- **No-consumer-counterpart assents**: 20, each `surviving: []`. Each citation was checked for applicability; `knowledgeBases[web-components]` was checked against `package.json` `files`.
- **Refused**: `#mcp-practice-notes` → `should-re-point`. `mcp-fallback` greps `src/components/`, which does not hold DesignerPunk's web implementations in a consumer install.
- **Widenings**: none. I read the two referent candidates:
  - `blocking-exception`'s "This" is resolved by `blocking-direct` in the same unit and the same rendering.
  - `jest-not-vitest` is the known false positive.
- **Residuals** (recorded, not refused):
  - (1) `#with-peter`'s removal of `human-4` cites `subtraction-2` ("authority claims naming people"). The item is a claim about a person's skillset, so the citation fits loosely (Req 11.3 (iii)).
  - (2) `routes.cues[7]` (the `platform-resource-map` cue) cites `subtraction-1`. `subtraction-5` (a non-resolving route) fits more closely.
  - (3) The rendered `#identity` still names Peter in the Sarah Parks naming history. That is orientation, not an item, so it is fine.

## Re-sign run summary (2026-09-29)

- **Base**: `dba93df5` (Thurgood's re-author batch; Sparky rows at `5a6e35d3`), branch `task/123-u2b-fr3-sparky`. Worklist: sheet § 4, 6 acts. One assent commit; no refusals.
- **`#mcp-practice-notes`**: my refusal is resolved by itemized assent, 3/3 (`ground-truth-live-mcp`, `rebuild-product`, `mcp-fallback`). The fallback now names paths that ship.
- **`trims[dist/web/DesignTokens.web.css]`**: assented to `superseded-by #mcp-practice-notes`. Signed on the text per VALVE-1. The supersession holds with or without Task 16.3.
- **`commands[web-tests]`** and **`commands[functional-suite]`**: assented to `superseded-by #what-you-dont-own` (function grain).
- **`writeScope[docs/specs/**]`**: assented to `superseded-by writeScope[.kiro/specs/**]`.
- **`routes.cues[8]`**: assented to the re-pointed technology-stack cue. This replaces my earlier `no-consumer-counterpart` assent, because the doc ships and its Web and True Native sections apply.
- **Residuals** (not refused):
  - (1) The re-pointed `routes.cues[8]` `when` names "versions", but `technology-stack` lists none.
  - (2) Phase-two residuals 1–2 (the `human-4` citation; the `routes.cues[7]` citation) are not in this batch's worklist. They are carried as-is.

