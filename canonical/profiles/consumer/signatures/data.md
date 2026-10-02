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

**Re-sign (2026-09-29, `dba93df5`): ASSENT to the changed disposition, `re-pointed`** (Ada's keep branch). It replaces my `no-consumer-counterpart` assent.
- The rendered Ground truth line (read directly, blind-spot note) names `node_modules/@3fn/core/dist/ComponentTokens.android.kt` and says my own output lives in my configured output directory. So it cannot misfire on the consumer's own `generate` output.
- It is more conservative than my ncc reading. My caveat (a lagging future release) is now covered.
- **Nit, no refusal**: "never the source for your themed values" fits component tokens loosely, since the file carries no color values. It is harmless.
- The row's signature is byte-identical to my earlier one: both hashes are unchanged, and the disposition flip is not in the hash. This block is the record of the re-sign act.

**Re-sign (2026-10-02, after Lina's per-row span change `1a2ff94f`, VALVE-1): ASSENT to `re-pointed`, `surviving: []`.** The stale entry is a hash event, not a text event. The `renderedHash` moved from the empty-piece hash (`sha256:37517e5f…85b570`) to a hash over the row's own lines. `canonicalHash` and the overlay pin (`@ sha256:5d43bad7…a45839`) are unchanged, and `canonical/agents/data.md` has not changed since `94cb60d1` (#177).
- **The span**: cc `data.md` L486–487 and kiro `data-prompt.md` L279–280, per both attribution sidecars. That is the trim line plus the section's trailing blank line. I read both targets. The text matches what I assented to on 2026-09-29. The only difference is the tool name: cc qualifies it (`mcp__designerpunk-application__get_component_full`) and kiro leaves it bare (`get_component_full`). Each is the right form for its target.
- **Verified hash**: `sha256:e644f5b5…41171b0`. I recomputed it read-only with `renderedHashOf(readConsumerSpans(...), rowSpanSource(...))` from `tools/agent-generator/derive.ts`, and the pieces it printed are exactly those two spans.
- **The disposition still holds in a consumer.** `npm pack --dry-run --ignore-scripts` on this tree still lists `dist/ComponentTokens.android.kt` at the package root, because `!dist/android/**` does not reach the root. So `node_modules/@3fn/core/dist/ComponentTokens.android.kt` is a real file in every consumer, and the rendered negative names it at that path. The rendered line also keeps my own `generate` output, in my configured output directory, outside the prohibition. The positive route, `get_component_full`, is the right place to get assembled component tokens.
- **Nit carried, no refusal**: "never the source for your themed values" still fits loosely. A structural grep (counts only, no values read) finds 0 `Color(` and 0 `theme` references in the file. A consumer agent that obeys the line still does the right thing.
- **Surviving**: `[]`. This frontmatter row owes no operative-set items, so the assent covers the re-point itself.
- **Valve-1 blind spot**: closed for this row. The hash now covers the rendered line, so any future text change makes this signature stale.

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

**Re-sign (2026-09-29, `dba93df5`): ASSENT to the changed disposition, `re-pointed`.** It replaces my `no-consumer-counterpart` assent. The narrowed `when` ("the platform-technology reference for products built with DesignerPunk (platform frameworks, web CSS standards, True Native architecture, versions)") drops our build tooling (subtraction-1) and keeps what a consumer's Android agent can use from the shipped doc: Compose/platform versions and the True Native model. My earlier reading, "our repo's build stack", missed that part.

## `#frontmatter:commands[functional-suite]`

signer: data

**Assent.** `npm test` is this repo's Jest suite over the design system (subtraction-1). A consumer app's test run is `./gradlew test`, carried by the re-pointed `commands[android-build-test]`. That is a different function (testing the app, not the design system), so this is not a supersession.

**Re-sign (2026-09-29, `dba93df5`): ASSENT to the changed disposition, `superseded-by #what-you-dont-own`.** It replaces my `no-consumer-counterpart` assent. The destination's rendering ("Your repo's own build and test tooling is the one to use — read it from the app's build setup before you run anything") is where a consumer's run-the-suite function lands. That is a routed claim rather than my "different function" reading, and it is the stronger, correct one. The signature is byte-identical (hashes unchanged); this block records the act.

## `#frontmatter:commands[audit-tokens]`

signer: data

**Assent.** `npm run audit:tokens` audits component-token usage across our pipeline (subtraction-1). No `designerpunk` CLI subcommand does this in a consumer (the CLI has `generate`, `validate`, `init`, `mcp:*`, `figma:*`, `sync`).

## `#frontmatter:knowledgeBases[android-tests]`

signer: data

**Assent.** Test sources do not ship: the package's `files` excludes `src/components/core/**/platforms/android/*Test.kt` (subtraction-5).

## `#frontmatter:writeScope[docs/specs/**]`

signer: data

**Assent.** `docs/specs/**` is our summary-doc tree (subtraction-4). The consumer's spec scope is the re-pointed `specs/**`.

**Re-sign (2026-09-29, `dba93df5`): ASSENT to the changed disposition, `superseded-by writeScope[.kiro/specs/**]`.** The consumer's spec write scope is the re-pointed `specs/**`, which absorbs the summary-doc tree's function. The signature is byte-identical (hashes unchanged); this block records the act.

## `#android-theming-spec-094`

signer: data

**Refuse: should-re-point.** The disposition removes the whole negative ("not a file — never read the built `dist/*.kt` snapshots (see the Ground truth section)") as our repo's stale-snapshot guidance (subtraction-3). The rendering keeps only "Ground truth … is LIVE — query the application MCP … and the per-theme set". So **`theming-6` is not entailed**: its prohibition is gone. The other five items are verbatim.

**The removal has a consumer counterpart** (see the header fact): the package ships flattened `DesignTokens.android.kt` snapshots into `node_modules/@3fn/core/dist/`. This unit is where the theme-varying (`Local{Abbreviation}Theme`) access is taught, so losing the guard against the flattened file here is the exact K-D2 hazard.

The fix is a re-point, not a restoration: our bare `dist/*.kt` would, in a consumer, wrongly hit the app's own `npx designerpunk generate` output. It should name the package snapshots, `node_modules/@3fn/core/dist/**/DesignTokens.android.kt`, and keep the "read the per-theme set from the MCP" positive.

**Re-sign (2026-09-29, re-author batch `dba93df5`): ASSENT — 6 of 6. My refusal is resolved by re-authoring.** The snapshot negative is **restored**, re-keyed to the package root: "never read DesignerPunk's un-themed base snapshots … (`node_modules/@3fn/core/dist/*.android.kt`)". That is the re-point my refusal asked for. It names the package's flattened files, not the consumer's own `generate` output, and the MCP positive is kept. Dropping "(see the Ground truth section)" is correct, because the consumer's Ground truth section no longer lists the DesignTokens trim. **Dependency accepted**: the glob `dist/*.android.kt` covers the top-level `DesignTokens.android.kt` but not `dist/android/DesignTokens.android.kt`. That file leaves the package at Task 16.3 (Ada's split). Until 16.3 merges, the subdirectory copy still ships and is not named. `theming-6` is entailed under re-keying. "for your themed values" narrows the prohibition to the hazard itself, which is the subject of this unit. `theming-1` to `theming-5` are verbatim.

## `#step-2-set-up-the-screen`

signer: data

**Refuse: should-re-point.** `setup-2` loses its parenthetical guard "(never read the stale `dist/*.kt` snapshots — see the Ground truth section)" (subtraction-3). The rendering keeps "Bring in DesignerPunk tokens by querying the application MCP for the resolved values", so the positive half survives and the prohibition does not. `setup-1` and `setup-3` are verbatim (`setup-3` holds, because the Android implementations ship in the package).

The guard has a consumer counterpart (header fact). This step is the moment the agent first brings tokens into a screen, which is when a flattened `DesignTokens.android.kt` in `node_modules/@3fn/core/dist/` is most likely to be read.

The fix is a re-point, not a restoration: our bare `dist/*.kt` would, in a consumer, wrongly hit the app's own `npx designerpunk generate` output. It should name the package snapshots, `node_modules/@3fn/core/dist/**/DesignTokens.android.kt`, and keep the "read the per-theme set from the MCP" positive.

**Re-sign (2026-09-29, `dba93df5`): ASSENT — 3 of 3. Refusal resolved.** The snapshot negative is **restored**, re-keyed to the package root: "never read DesignerPunk's un-themed base snapshots … (`node_modules/@3fn/core/dist/*.android.kt`)". That is the re-point my refusal asked for. It names the package's flattened files, not the consumer's own `generate` output, and the MCP positive is kept. Dropping "(see the Ground truth section)" is correct, because the consumer's Ground truth section no longer lists the DesignTokens trim. **Dependency accepted**: the glob `dist/*.android.kt` covers the top-level `DesignTokens.android.kt` but not `dist/android/DesignTokens.android.kt`. That file leaves the package at Task 16.3 (Ada's split). Until 16.3 merges, the subdirectory copy still ships and is not named. `setup-2` is entailed under re-keying: the parenthetical guard is back, and it names the package snapshots.

## `#how-to-use-designerpunk-tokens-on-android`

signer: data

**Refuse: should-re-point.** `ground-truth-live` loses "not a file — never read the built `dist/*.kt` snapshots (see the Ground truth section);" (subtraction-3). The rendering keeps "Ground truth … is LIVE — query the application MCP …", so **`ground-truth-live` is not entailed**. `tokens-1` to `tokens-4` and `per-theme-set` are verbatim.

The prohibition has a consumer counterpart (header fact). It is the named negative of this unit's own `per-theme-set` item: the shipped snapshot is exactly "a single flattened value".

The fix is a re-point, not a restoration: our bare `dist/*.kt` would, in a consumer, wrongly hit the app's own `npx designerpunk generate` output. It should name the package snapshots, `node_modules/@3fn/core/dist/**/DesignTokens.android.kt`, and keep the "read the per-theme set from the MCP" positive.

**Re-sign (2026-09-29, `dba93df5`): ASSENT — 6 of 6. Refusal resolved.** The snapshot negative is **restored**, re-keyed to the package root: "never read DesignerPunk's un-themed base snapshots … (`node_modules/@3fn/core/dist/*.android.kt`)". That is the re-point my refusal asked for. It names the package's flattened files, not the consumer's own `generate` output, and the MCP positive is kept. Dropping "(see the Ground truth section)" is correct, because the consumer's Ground truth section no longer lists the DesignTokens trim. **Dependency accepted**: the glob `dist/*.android.kt` covers the top-level `DesignTokens.android.kt` but not `dist/android/DesignTokens.android.kt`. That file leaves the package at Task 16.3 (Ada's split). Until 16.3 merges, the subdirectory copy still ships and is not named. `ground-truth-live` is entailed under re-keying, and it again sits as the named negative beside `per-theme-set` (verbatim).

## `#android-specific-guidance:preamble`

signer: data

**Refuse: should-re-point.** `native-2` loses ", never the stale `dist/*.kt` snapshots" (subtraction-3). The rendering keeps "DesignerPunk tokens consumed as Kotlin constants from the `DesignTokens` object (values queried live via the application MCP)". Without the negative, this sentence now points a consumer agent at a `DesignTokens` Kotlin object, and `node_modules/@3fn/core/dist/` ships one whose theme-varying colors are flattened. **`native-2` is not entailed.** The other six items are verbatim.

The fix is a re-point, not a restoration: our bare `dist/*.kt` would, in a consumer, wrongly hit the app's own `npx designerpunk generate` output. It should name the package snapshots, `node_modules/@3fn/core/dist/**/DesignTokens.android.kt`, and keep the "read the per-theme set from the MCP" positive.

**Re-sign (2026-09-29, `dba93df5`): ASSENT — 7 of 7. Refusal resolved.** The snapshot negative is **restored**, re-keyed to the package root: "never read DesignerPunk's un-themed base snapshots … (`node_modules/@3fn/core/dist/*.android.kt`)". That is the re-point my refusal asked for. It names the package's flattened files, not the consumer's own `generate` output, and the MCP positive is kept. Dropping "(see the Ground truth section)" is correct, because the consumer's Ground truth section no longer lists the DesignTokens trim. **Dependency accepted**: the glob `dist/*.android.kt` covers the top-level `DesignTokens.android.kt` but not `dist/android/DesignTokens.android.kt`. That file leaves the package at Task 16.3 (Ada's split). Until 16.3 merges, the subdirectory copy still ships and is not named. `native-2` no longer points a consumer at the flattened `DesignTokens` object: the "never" clause names it.

## `#frontmatter:ambient.groundTruthManifest.trims[dist/android/DesignTokens.android.kt]`

signer: data

**Refuse: should-re-point** (disposed `no-consumer-counterpart`, subtraction-3). The trim exists to keep me off a flattened Android token snapshot and send me to `get_token_details` for the per-theme set (`shape: per-theme-set`, K-D2).

**A consumer has the counterpart** (header fact): the package ships `dist/android/DesignTokens.android.kt` and `dist/DesignTokens.android.kt` with theme-varying colors flattened, next to an MCP that reports `themeVarying: true`.

The entry should re-point its `artifact` / `negative` / `replaces` to the package path (`node_modules/@3fn/core/dist/android/DesignTokens.android.kt`, plus the top-level twin), keeping `tool: get_token_details` and `shape: per-theme-set`. "Stale" in the cue should read as "flattened", because a published build is fresh but still single-valued.

**Re-sign (2026-09-29, `dba93df5`): ASSENT to the changed disposition, `superseded-by #how-to-use-designerpunk-tokens-on-android`. Refusal resolved.**
- I read the rendered Ground truth section directly, per the README's blind-spot note (a trim row's `renderedHash` is the empty-piece hash). It no longer lists this trim.
- The trim's function survives in the destination unit I just assented: it keeps me off the package's flattened DesignTokens snapshot and sends me to the MCP for the per-theme set.
- **Conditional on Task 16.3**, as the comment above the row states: this artifact leaves the package there. Until then, `dist/android/DesignTokens.android.kt` still ships, and the destination's `dist/*.android.kt` glob does not name it. If 16.3 does not drop `dist/android/**`, this row must be re-opened.

## `#frontmatter:ambient.groundTruthManifest.verdict`

signer: data

**Refuse: should-re-point** (disposed `no-consumer-counterpart`, subtraction-3). The verdict `none-trim-stale-snapshots` is the manifest's declaration that my ground truth is live and the Kotlin snapshots are trimmed. Because the DesignTokens trim has a consumer counterpart (refused above), the verdict has one too: a consumer seat still needs "ground truth: none — trim the (package's) flattened snapshot".

It should be re-pointed together with that trim (the ComponentTokens trim may stay `no-consumer-counterpart`, see its assent). If the trim is re-disposed, this row follows it.

**Re-sign (2026-09-29, `dba93df5`): ASSENT to the changed disposition, `retained`. Refusal resolved.** `none-trim-stale-snapshots` is still true in a consumer. Ground truth is the live MCP, and the manifest still carries one trim (the re-pointed ComponentTokens snapshot), which the rendered Ground truth section shows.

**Re-sign (2026-10-02, after Lina's per-row span change `1a2ff94f`, VALVE-1): ASSENT to `retained`, `surviving: []`.** The stale entry is a hash event, not a text event. The `renderedHash` moved from the empty-piece hash to a hash over the row's own line, and `canonicalHash` is unchanged.
- **The span**: cc `data.md` L485 and kiro `data-prompt.md` L278, per both attribution sidecars. The `## Ground truth` heading and its blank line (cc L483–484, kiro L276–277) form the container span, and this row does not hash them. I read the line in both targets, and it is identical in both: *"Your token ground truth is served LIVE by MCP — never a build snapshot. Do NOT read these stale/generated artifacts; query the live tool instead:"*.
- **Verified hash**: `sha256:53f5c8db…c6c53e`. I recomputed it read-only with `renderedHashOf(readConsumerSpans(...), rowSpanSource(...))` from `tools/agent-generator/derive.ts`, and the only pieces it printed are those two lines.
- **`retained` still holds in a consumer.** Ground truth is the live MCP. The manifest still trims one shipped snapshot: the ComponentTokens trim, re-pointed to `node_modules/@3fn/core/dist/`. The line produces the behavior I want in a consumer's Android app: query the MCP, and treat the list that follows as what not to read.
- **The Task 16.3 dependency has landed** on this tree. `package.json` `files` now carries `!dist/android/**`, and `npm pack --dry-run` no longer lists `dist/android/DesignTokens.android.kt`. The DesignTokens-trim supersession that this verdict's 2026-09-29 assent leaned on is now fully true. `dist/DesignTokens.android.kt` at the root still ships, and the body units' `dist/*.android.kt` glob names it.
- **Surviving**: `[]`. This frontmatter row owes no operative-set items, so the assent covers the retention itself.
- **Residual (not a refusal)**: the line says "stale/generated", but the one artifact it lists is generated and un-themed, not stale. This is the same residual Kenya recorded, because the line is a shared template. Rewording it is authoring for the profile author or the owner of `render.ts`, not a signing act.
- **Valve-1 blind spot**: closed for this row.

## `#frontmatter:commands[platform-tokens]`

signer: data

**Final re-sign (2026-09-29, rendering `8ea88c2f`, sheet `7fc01fa2`): ASSENT to the re-point, `surviving: []`.**
- The rendered entry is `cmd: npx designerpunk generate`, `runContext: consumer-repo`, source "@3fn/core (the `designerpunk` bin)". Its cue is "regenerate your platform token output — including your theme Kotlin and product tokens — from your token source and `designerpunk.config.ts`".
- The generated CC/Kiro command line now ends "(run from your product repo)". The self-contradicting "not this repo" suffix I flagged is gone (Thurgood's `7e5af8be`).
- It is right for a consumer Android app. It names the command that materialises the `{Name}Theme` / `Local{Abbreviation}Theme` Kotlin and the product tokens my retained units rely on.

**History**:
- Refused on 2026-09-29 (`a12cc1b9`) as `no-consumer-counterpart` when a consumer counterpart exists.
- Re-authored to this re-point, and assented at `c8ff8767` with a suffix residual.
- The suffix is now fixed, and this block replaces those rulings.

## Signing run summary (2026-09-29, phase two)

- **Commits** (branch `task/123-u2b-fr2-data`, not pushed):
  - `abb97a5d`: 17 assents, in one batch.
  - One commit per refusal: `3e1faf88` (`#android-theming-spec-094`), `84c6f6f2` (`#step-2-set-up-the-screen`), `61f3ffba` (`#how-to-use-designerpunk-tokens-on-android`), `00c8c894` (`#android-specific-guidance:preamble`), `b7fa823f` (DesignTokens trim), `c93bcb4d` (manifest verdict), `a12cc1b9` (`commands[platform-tokens]`).
  - This summary lands in its own docs-only commit.
- **Rows signed**: 24 of 24. 17 assents, 7 refusals.
- **Assented routed body units (7)**; 32 of their 33 items survive:
  - `#identity` 7/7
  - `#out-of-scope` 7/7
  - `#blocking-exception-direct-escalation-to-peter` 3/3
  - `#with-peter` 3/4. The `human-4` removal is assented: it is a fact about our human.
  - `#platform-currency-expectations` 5/5
  - `#mcp-practice-notes` 3/3
  - `#what-you-dont-own` 4/4. `jest-not-vitest` is credited under re-keying.
- **Assented `no-consumer-counterpart` rows (10)**, each `surviving: []`:
  - the ComponentTokens trim (with a caveat)
  - `routes.docs[completion-doc-guidance]`, `[dev-workflow-detail]` and `[file-organization]`
  - `routes.cues[8]` and `[9]`
  - `commands[functional-suite]` and `[audit-tokens]`
  - `knowledgeBases[android-tests]`
  - `writeScope[docs/specs/**]`
- **Refused rows (7)**, all `should-re-point`. Two root causes:
  - **Root cause 1 — the stale-snapshot negative was removed, but it has a consumer counterpart.** The package ships flattened `DesignTokens.android.kt` files into `node_modules/@3fn/core/dist/` (verified with `npm pack --dry-run`; no Theme or CompositionLocal inside). The negative should be re-pointed to the package path, not removed. Six rows: `#android-theming-spec-094` (`theming-6`), `#step-2-set-up-the-screen` (`setup-2`), `#how-to-use-designerpunk-tokens-on-android` (`ground-truth-live`), `#android-specific-guidance:preamble` (`native-2`), `frontmatter:ambient.groundTruthManifest.trims[dist/android/DesignTokens.android.kt]` and `frontmatter:ambient.groundTruthManifest.verdict`.
  - **Root cause 2 — `commands[platform-tokens]` has a consumer counterpart**, `npx designerpunk generate`. My consumer rendering names that command in no unit, yet it still has me author product tokens and relies on generated theme Kotlin.
- **Widenings**: none. Of the three referent candidates, `blocking-exception` carries its referent in the same rendered paragraph. `workflow-trigger` and `jest-not-vitest` are known false positives.
- **Residuals**:
  - **Refusal volume**: most of the 7 refusals share one fix. Re-pointing the snapshot negative in one overlay pass should let 6 of them resolve together.
  - **Not signed by me**: `#product-tokens-spec-108109` is `retained` and carries `dist/product/ProductTokens.android.kt` verbatim. A consumer's `generate` writes to `{config.outputDir}/product/`. I did not verify that the default is `dist`. If it isn't, that retained text is wrong in a consumer, and the unit should be re-examined.
  - **Scratchpad collision, a process issue for the orchestrator**: my helper script in the shared session scratchpad was overwritten mid-run by another seat's script of the same name. No wrong edit landed: the failure stopped the chain before any write, and I re-verified the assent commit field by field. Parallel seats should use per-seat scratch subdirectories.

## Re-sign run summary (2026-09-29)

- **Base**: Thurgood's re-author batch at `dba93df5`. Branch `task/123-u2b-fr3-data`; one commit (SHA in the handback). Not pushed.
- **§ 4 worklist: 11 acts, 11 assents, 0 refusals.** All seven standing refusals are resolved by re-authoring. None is resolved by assent alone.
- **Refusals resolved, with itemized counts**:
  - `#android-theming-spec-094` 6/6
  - `#step-2-set-up-the-screen` 3/3
  - `#how-to-use-designerpunk-tokens-on-android` 6/6
  - `#android-specific-guidance:preamble` 7/7
  - `commands[platform-tokens]`: assent to the re-point to `npx designerpunk generate`.
  - The DesignTokens trim: assent to `superseded-by #how-to-use-designerpunk-tokens-on-android`, conditional on 16.3.
  - The verdict: assent to `retained`.
- **Changed dispositions assented** (these replace my earlier `no-consumer-counterpart` assents):
  - the ComponentTokens trim → re-pointed
  - `routes.cues[9]` → re-pointed
  - `commands[functional-suite]` → `superseded-by #what-you-dont-own`
  - `writeScope[docs/specs/**]` → `superseded-by writeScope[.kiro/specs/**]`
  - Three of these signatures are byte-identical to before (hashes unchanged); their blocks record the act.
- **Totals now**: all 24 of my rows are assented and none is refused. Routed body items: all 4 re-signed units at full count, and 32 of 33 across the other seven (the assented `human-4` removal).
- **Residuals**:
  - **Task 16.3 dependency**: the restored warnings' glob `node_modules/@3fn/core/dist/*.android.kt` does not reach `dist/android/DesignTokens.android.kt`. The DesignTokens-trim supersession is true only once 16.3 drops `dist/android/**`. If 16.3 slips or changes, re-open that row and the four body units.
  - **Adapter wording, cross-seat**: the `runContext: consumer-repo` suffix "(run from the consumer product repo, not this repo)" is self-contradictory inside a consumer's repo. Seen in my rendering and Sparky's. For Thurgood or the adapter owner, not a row fix.
  - **Retained product-token path**: `dist/product/ProductTokens.android.kt` is right by default. The orchestrator checked that the default `output` is `dist` (`ConfigLoader.ts:44`), so the residual I raised in phase two is closed.

## Final re-sign (2026-09-29)

- **One act**: `commands[platform-tokens]` re-signed against the new rendering (`8ea88c2f`). Assent to the re-point to `npx designerpunk generate`, `surviving: []`.
- **Residual closed**: the adapter now renders "run from your product repo".
- **Final state**: all 24 of my rows are assented, and none is refused.
- **Open**: only the Task 16.3 dependency (`dist/android/**` must leave the package for the DesignTokens-trim supersession and the four body-unit warnings to fully cover the snapshot).
- `commands[android-build-test]` wording also changed. It is outside the signed population, so no act is owed.

