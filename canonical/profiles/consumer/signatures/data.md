# Signature evidence — `data` (C1, owner seat)

**Dispositions**: `canonical/profiles/consumer/data.dispositions.yaml` (authored by Thurgood, profile author)
**Signer**: **Data**, the owner. Under C1 the owner signs the routed and `no-consumer-counterpart` rows (Req 11.4.1; design C17).
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase two (Peter's go).
**Inputs per row**:
- the unit's own rendering, `canonical/_consumer-output/_canonical/agents/data.md`;
- `data.overlay.md`;
- the row;
- the hashes from `sheets/data.md` (generated at `60b0fdb5`);
- the confirmed operative set, `canonical/operative-sets/data.yaml` (139 items).

**Scope (Req 11.6.5e)**: entailment is read within the rendering of the unit under judgment only. An item whose repo-bound referent is re-keyed (Peter → "your human lead", our test runner → "your repo's own tooling") is entailed when the re-keyed rendering still does its job (5b, as in G1 runs 1–2).

**Frontmatter `no-consumer-counterpart` rows** carry no operative items. `assent: { surviving: [] }` affirms the disposition: the entry's function has no counterpart in a consumer's Android app. Where I found that a counterpart does exist, I refused instead.

**The fact behind this seat's refusals**, verified read-only on 2026-09-29:
- `npm pack --dry-run --ignore-scripts` on the main checkout lists `dist/android/DesignTokens.android.kt`, `dist/DesignTokens.android.kt` and `dist/ComponentTokens.android.kt`. They are shipped by the `files` glob `dist/**/*.{…,kt}`.
- Both built `DesignTokens.android.kt` files contain no `Theme` class and no `CompositionLocal`: theme-varying colors are flattened to single values.
- So a consumer has the same hazard under `node_modules/@3fn/core/dist/`: a flattened snapshot next to an MCP that reports `themeVarying: true`. That is the K-D2 per-theme-set bug the trims exist to prevent.
- I read the files for structure only (a grep for class and CompositionLocal counts), never for token values.

## `#identity`

signer: data

**Assent — 7 of 7 survive.** `human-decides` and `partner` are re-keyed ("Your human lead makes final decisions. You are their partner, not their tool."), and the norm is intact. The other five are verbatim.

## `#out-of-scope`

signer: data

**Assent — 7 of 7.** `out-7` is re-keyed to "that's your human lead's job". Six are verbatim.

## `#blocking-exception-direct-escalation-to-peter`

signer: data

**Assent — 3 of 3.** `blocking-direct` is re-keyed ("flag directly to your human lead for routing to Thurgood"), and the trigger, the condition and the route all survive. `blocking-exception` keeps its referent in the same rendered paragraph. `blocking-when-in-doubt` is verbatim.

## `#with-peter`

signer: data

**Assent — 3 of 4.**
- `human-1` and `human-2` are re-keyed. "design eye" → "eye … to them" keeps the deference norm.
- `human-3` is verbatim.
- **`human-4` does not survive, and I assent to its removal** (subtraction-2). "Peter's skillset largely lives in design" is a fact about our human. A consumer's lead may be an engineer, so carrying it would misdirect. The transferable part, explaining in accessible terms, survives as `human-3`.

## `#platform-currency-expectations`

signer: data

**Assent — 5 of 5.** `currency-3` is re-keyed ("When your human lead or Leonardo mention…"). Four are verbatim.

## `#mcp-practice-notes`

signer: data

**Assent — 3 of 3.**
- **`ground-truth-live-mcp`**: the rendering keeps the operative core ("reach for the application MCP's token verbs for resolved values, not the flat Kotlin files — and remember a theme-varying token is a per-theme set, not one value"). What was removed is the description of our ambient trim. Unlike the four units I refuse, **this rendering keeps the negative against the flat Kotlin files**, so the guard survives.
- **`mcp-fallback`**: re-pointed to the Android sources in the installed package (`node_modules/@3fn/core/src/components/core/*/platforms/android/`). Dropping `*Test.kt` is correct, because test sources do not ship (the package's `files` excludes `*Test.kt`).
- `rebuild-product` is verbatim.

## `#what-you-dont-own`

signer: data

**Assent — 4 of 4.** `jest-not-vitest` is credited under re-keying. Its job is to run the project's actual test tooling with its actual flags, never a guessed runner. The rendering does that job for a consumer app: "Your repo's own build and test tooling is the one to use — read it from the app's build setup before you run anything". Jest is our repo's runner, and a Gradle app has none.

## `#frontmatter:ambient.groundTruthManifest.trims[dist/ComponentTokens.android.kt]`

signer: data

**Assent — `no-consumer-counterpart`, with a caveat.**
- The file does ship (`node_modules/@3fn/core/dist/ComponentTokens.android.kt`).
- But the trim's reason, a *stale* snapshot, does not reproduce in a consumer. The published file is built at release from the same source as the shipped MCP index.
- It carries no color values (no `Color(` references), so there is no per-theme flattening hazard.
- The positive route (`get_component_full`) is retained in `routes.cues[0]`.
- Caveat: if a later release ships a component-token file that lags the index or carries theme-varying values, this row should be revisited.

## `#frontmatter:routes.docs[completion-doc-guidance]`

signer: data

**Assent.** The completion-doc tiers belong to our spec/task machinery (subtraction-4). A consumer app's agent does not write DesignerPunk completion docs.

## `#frontmatter:routes.docs[dev-workflow-detail]`

signer: data

**Assent.** It is our development workflow (subtraction-4). The consumer's workflow is its own.

## `#frontmatter:routes.docs[file-organization]`

signer: data

**Assent.** It gives our repo's file-organization rules (subtraction-4). They do not govern a consumer app's tree.

## `#frontmatter:routes.cues[8]`

signer: data

**Assent.** `platform-resource-map` gives cross-platform file paths in *this* repo (subtraction-1). The consumer's one needed path, the shipped Android component sources, is carried by the re-pointed `knowledgeBases[android-components]` entry and the re-pointed body units.

## `#frontmatter:routes.cues[9]`

signer: data

**Assent.** `technology-stack` is our repo's build stack (subtraction-1). A consumer app's stack is read from its own build setup, which the re-pointed commands entries say.

## `#frontmatter:commands[functional-suite]`

signer: data

**Assent.** `npm test` is this repo's Jest suite over the design system (subtraction-1). A consumer app's test run is `./gradlew test`, carried by the re-pointed `commands[android-build-test]`. That is a different function (testing the app, not the design system), so this is not a supersession.

## `#frontmatter:commands[audit-tokens]`

signer: data

**Assent.** `npm run audit:tokens` audits component-token usage across our pipeline (subtraction-1). No `designerpunk` CLI subcommand does this in a consumer (the CLI has `generate`, `validate`, `init`, `mcp:*`, `figma:*`, `sync`).

## `#frontmatter:knowledgeBases[android-tests]`

signer: data

**Assent.** Test sources do not ship: the package's `files` excludes `src/components/core/**/platforms/android/*Test.kt` (subtraction-5).

## `#frontmatter:writeScope[docs/specs/**]`

signer: data

**Assent.** `docs/specs/**` is our summary-doc tree (subtraction-4). The consumer's spec scope is the re-pointed `specs/**`.

## `#android-theming-spec-094`

signer: data

**Refuse: should-re-point.** The disposition removes the whole negative ("not a file — never read the built `dist/*.kt` snapshots (see the Ground truth section)") as our repo's stale-snapshot guidance (subtraction-3). The rendering keeps only "Ground truth … is LIVE — query the application MCP … and the per-theme set". So **`theming-6` is not entailed**: its prohibition is gone. The other five items are verbatim.

**The removal has a consumer counterpart** (see the header fact): the package ships flattened `DesignTokens.android.kt` snapshots into `node_modules/@3fn/core/dist/`. This unit is where the theme-varying (`Local{Abbreviation}Theme`) access is taught, so losing the guard against the flattened file here is the exact K-D2 hazard.

The fix is a re-point, not a restoration: our bare `dist/*.kt` would, in a consumer, wrongly hit the app's own `npx designerpunk generate` output. It should name the package snapshots, `node_modules/@3fn/core/dist/**/DesignTokens.android.kt`, and keep the "read the per-theme set from the MCP" positive.

