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

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). The trim targets this repo's build path (the package exports its tokens as `dist/DesignTokens.web.css` via `@3fn/core/tokens.css`). In a consumer, that file is not stale and is not in any ambient set to trim. No counterpart (`subtraction-3`).

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

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). The `technology-stack` cue returns this repo's build tooling, frameworks and versions. A consumer's stack is their own, and the `product-screen-commands` gap already points them at it. No counterpart (`subtraction-1`).

## `#frontmatter:commands[build]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). `npm run build` is this repo's full build (`runContext: this-repo`; `subtraction-1`). The consumer's build lives in their app; the re-pointed `commands[product-screen-commands]` names that. No counterpart.

## `#frontmatter:commands[build-browser]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). `npm run build:browser` and the bundle ceiling in `scripts/build-browser-bundles.js` are this repo's tooling (`subtraction-1`). No counterpart.

## `#frontmatter:commands[web-tests]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). `npm test -- src/components/` scopes this repo's Jest suite (`subtraction-1`). The "never vitest" cue it carried survives, re-pointed, in `#what-you-dont-own`. No counterpart.

## `#frontmatter:commands[functional-suite]`

signer: sparky

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). `npm test` is this repo's functional suite (`subtraction-1`). No counterpart.

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

**ASSENT — surviving 0** (`surviving: []`, no consumer counterpart). `docs/specs/**` is this repo's summary-doc tree under its spec workflow (`subtraction-4`). The consumer's spec area is covered by the re-pointed `writeScope[.kiro/specs/**]` → `specs/**`. No counterpart.
