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

## `#in-scope`

signer: data
disposition: re-pointed
canonicalHash: sha256:fa54f8cf858c8d1c441c911b7c59cbcff4064990a50cb11ae99e5ae9c6f4fd23
renderedHash: sha256:28af0768f9f6a237affb171d37fc750f1b7ae37ef6c75c729854b37dca41555e
date: 2026-11-08

**Re-signed 2026-11-08: ASSENT — 8 of 17 surviving.** Prior signature: assent 8/17, 2026-11-08, against `canonicalHash` `sha256:49fe090d940a9ee96b05a32f0a1a5b917dde3b73b8125d17fe2892df2ddf778e` and `renderedHash` `sha256:72e9990409a35f3943744a2d62662e144fb323dd5dcf47bad0b8d2b4acd1411c`. Stale because bullet 2 of the canonical unit changed: Task 16.2 (Thurgood, `448d4fe7d`) set it to "theme-varying colors via `LocalDPTheme.current`", and the rendering moved with it. Confirmed at 17 items first (`80e8d3fd9`).
- **Read before this act**: the whole canonical unit in `canonical/agents/data.md` and its consumer rendering in `canonical/_consumer-output/_canonical/agents/data.md`, `cc/.claude/agents/data.md` and `kiro/.kiro/agents/data-prompt.md` (the unit is 12 lines in each), through tool calls in this session at `e10072c9d`. The renderings differ from the canonical unit in two lines only: bullet 3 (re-pointed to the shipped Android sources) and the removed Android-lane bullet.
- **Hashes, computed in this act**: `canonicalHash` `sha256:fa54f8cf858c8d1c441c911b7c59cbcff4064990a50cb11ae99e5ae9c6f4fd23` (`hashText` over the unit from `partition(body).units`; equals the overlay pin). `renderedHash` `sha256:28af0768f9f6a237affb171d37fc750f1b7ae37ef6c75c729854b37dca41555e` (`renderedHashOf` over `readConsumerSpans` and `rowSpanSource`, committed rendering). Both moved.
- **Removals re-judged**: unchanged and authoring (`subtraction-5` for bullet 3, `subtraction-1` for the Android-lane bullet, each quoted once in the charter). No refusal follows.
- **Credited**: `scope-1` (verbatim), `scope-2` (now verbatim in the rendering: `LocalDPTheme.current`), `scope-3` (re-pointed to the shipped sources, which holds because they ship), `scope-4` to `scope-8` (verbatim).
- **`scope-9` to `scope-17` do not survive, and I agree**: the rendering states none of them. Reasons as in the prior record below.
- **Prior record**:

**Re-signed 2026-11-08: ASSENT — 8 of 17 surviving.** Prior signature: assent 8/8, 2026-10-13, against `sha256:9838f330a66c772bc46c6d79a597268682348899eb6b2a2a5090f250c195d5c3`. Stale because the canonical unit changed: ballot `2026-11-07-native-lane-ownership` (RATIFIED, Peter, 2026-11-08T00:24:24Z) site 2 added the Android-lane bullet. Thurgood applied it; I re-confirmed the set at 17 items (`d85aaa85d`).
- **Read before this act**: the consumer rendering of the unit, `canonical/_consumer-output/_canonical/agents/data.md` `#in-scope`, and the `cc/` and `kiro/` copies, through tool calls in this session.
- **renderedHash**: computed over `readConsumerSpans` / `renderedHashOf` / `rowSpanSource` on the committed rendering. It equals the prior signature's value, so the rendering did not move by a byte. A grep of the rendering for "native compile harness" returns 0.
- **Removal re-judged**: the new removal (`subtraction-1`, repo-internal tooling) quotes the charter bullet whole, byte for byte (checked by script, one occurrence). The bullet names `harness/android/**`, `probe-kotlin.ts`, `parse-kotlin.ts`, the `harness-android-tokens` check and `harness/pins.yaml`. A consumer's package ships none of them, so a consumer has no lane to own. No refusal follows.
- **`scope-9` to `scope-17` do not survive, and I agree**: the rendering states none of them, so a compliant consumer agent could break any of them. `scope-9` grants this repo's harness files. `scope-10` to `scope-17` are that grant's limits and consults, tied to Spec 129's design and `tasks.md`, this repo's annotation titles, and the Thurgood, Ada and Kenya seats. `scope-10` reads as general ("owning the lane never authorizes changing what it decides"), and I weighed it, but as written it binds named repo files to named repo texts.
- **`scope-1` to `scope-8` still survive**, for the reasons in the prior record below.
- **Prior record (superseded, 2026-10-13)**:

> **Ruling: ASSENT — 8/8 surviving.** scope-1 through scope-8 survive: the eight In Scope duties (Compose screen implementation, token consumption, Kotlin component implementation, Android tests, navigation/state/data binding, TalkBack accessibility, build configuration, advising Leonardo) are all present in the rendered unit, verbatim except for the re-grounded pointers. The one removal ("(referencing existing platforms/android/ implementations)", subtraction-5) is re-pointed to the shipped `node_modules/@3fn/core/src/components/core/*/platforms/android/` sources, which is true of the package. The added native-scope line (release-3 ruling 11) reads true by source read (Integration Guide, L182): the Android and iOS components ship as reference source, and the native token files refer to code nothing in the package defines. It does not contradict the rendered output. It is a release-level gate on starting a NEW native product; the eight items describe duties in an existing app, so both stand without conflict.

## `#out-of-scope`

signer: data
disposition: re-pointed
canonicalHash: sha256:900fcd94184dbc4519095d1257911adb9e595af4cd10b65a01b1373e1b5b7b54
renderedHash: sha256:ffc23b7cfe2bdcca4c58cbd087a41d67bd3e83aeabf42f434c2ce44aa8ad0bab
date: 2026-10-27

**Re-signed 2026-10-27 (system-token review and token planning ballot, item 2, site 8): ASSENT, `surviving` 7 of 7 (`out-1` to `out-7`).** A new act, read fresh against the new rendering; nothing is carried from the 2026-09-29 signature below (canonicalHash `sha256:d7695f214a8af5a8be83c50e90c9a403bb22261cfb8ee4d15d85cfcb5d0d3d3c`, renderedHash `sha256:e7b6eb783d2779b2304ebfc629d2a49793aab962f956efb8c4aac95c2d0a8999`).
- **The ballot**: `.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md` (RATIFIED, Peter, 2026-10-27, #493). Site 8 was applied at `eb91cd5b1`, with the profile author's re-quoted `out-4` and the re-pinned overlay unit. The rendering was regenerated at `5addae6b2`, and I re-confirmed the set at 7 at `31c6c75d5`.
- **What I read, in this session, through tool results**: the unit as `readConsumerSpans` returns it from the committed rendering, one piece each in `canonical/_consumer-output/_canonical/agents/data.md` (L213–L221; the applied line at L218), `cc/.claude/agents/data.md` (applied line at L90) and `kiro/.kiro/agents/data-prompt.md` (applied line at L60). By script, the three pieces are byte-identical and equal the overlay's `## @unit #out-of-scope` text. I also read this row. The rendered `out-4` line reads: *"**System token creation or modification** (primitive, semantic or component) — escalate through Leonardo to Thurgood (who triages to Ada). Deciding a product token the screen spec does not name is not yours either: § "Product Tokens (Spec 108/109)" above says what you do with one"*. Its pointer resolves in every rendering: `### Product Tokens (Spec 108/109)` is a retained unit, present above `### Out of Scope` in all three pieces' files (L204, L76 and L46), it renders byte-equal to the canonical unit, and it carries the applied site 8a line (L211, L83, L53). The route it relies on, `routes.docs[product-token-authoring]` (site 8b, `retained`), renders as *"WHEN a value you need has no system token and the screen spec does not name it (a need the spec missed) THEN consult product-token-governance § "Authoring Workflow""* in the cc and kiro prompts.
- **Credited**: `out-1` to `out-6` survive verbatim in all three pieces (checked by script), `out-4` with its new sentence. `out-7` (*"… — that's Peter's job"*) renders *"… — that's your human lead's job"*, as before: product decisions stay outside my seat and with the consumer's human lead. Credited by entailment.
- **The row's `removals`** (`Peter`, `subtraction-2`) is unchanged and still the only removal; the new sentence contains no `Peter` (checked: the rendered unit contains none), so nothing new is subtracted.
- **Hashes.** `canonicalHash` moves `d7695f21...` to `900fcd94...` (`hashText` of the unit from `partition(body).units`, equal to the overlay pin and to the sweep's value). `renderedHash` moves `e7b6eb78...` to `ffc23b7c...` (`renderedHashOf` over the committed rendering, `rowSpanSource('canonical/agents/data.md', 'body', '#out-of-scope')`), equal to the profile author's value.

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

**Re-signed 2026-11-08 (Task 18.5): ASSENT, `surviving: [theming-1, theming-2, theming-3, theming-4, theming-5, theming-6, theming-7, theming-8, theming-9]`.** A new act; it closes no divergent. Prior signature: assent 9/9 against `canonicalHash` `sha256:aa54dd17d5aa579774e1fe17b0813b5d3ddf3b88568287af9daed8a1d188db62` and `renderedHash` `sha256:f52904eca7ce3a157d16868b2fa6a7d56fa3af8557164a0f9ba608ceacb88198`. Stale because the rendering changed: Peter's ruling of 2026-11-08T14:47:50Z ("Fix both in U12 ...", `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-u12-retired-names.md`) retires the shipped text that names the package's `dist/` token snapshots. Thurgood reworded the overlay prose (`3d479bd4b`) and Lina regenerated (`7cfe548e7`).
- **Read before this act**: the whole unit and its rendering, from the print-mode output at `31212107719b1385be1b6c3a0f8ca1d234a71bcf`: the canonical unit `### Android Theming (Spec 094)` and its three renderings (`_canonical/agents/data.md`, `cc/.claude/agents/data.md`, `kiro/.kiro/agents/data-prompt.md`), which equal each other and equal the canonical unit except the last bullet.
- **Hashes, from that print**: `canonicalHash` `sha256:aa54dd17d5aa579774e1fe17b0813b5d3ddf3b88568287af9daed8a1d188db62` (did not move). `renderedHash` `sha256:9429206aff1ccc976a151ecab00aaf0680448a2f044900fd43f4dea8af92975d` (moved).
- **Credited, each by what the rendering states**:
  - `theming-1` to `theming-8`: verbatim in the rendering; bullets 1 to 7 equal the canonical unit byte for byte.
  - `theming-9`: entailed. The rendering keeps "**Ground truth for these token values is LIVE, not a file**" and the query of the application MCP for the resolved value, formula, per-platform (Kotlin) name and the per-theme set, verbatim. The prohibition on "the built `dist/*.kt` snapshots" (`subtraction-1`) is replaced by "no token snapshot ships in the package"; the hazard the prohibition guarded, the flattened package snapshot, no longer exists, and the positive route survives.
- **Residual, not a refusal**: the rendering no longer says in so many words not to read a file for theme-varying values; "LIVE, not a file" plus the MCP route carries it. If a later release ships a snapshot again, this unit needs a new prohibition.

**Re-signed 2026-11-08: ASSENT, `surviving: [theming-1, theming-2, theming-3, theming-4, theming-5, theming-6, theming-7, theming-8, theming-9]`.** A new act; it closes no divergent. Prior signature: assent 6/6, 2026-10-25, against `canonicalHash` `sha256:67c16e214d5f14e28dafcaf28d4e6897b428422fbc53a576219aeed1b229b7b9` and `renderedHash` `sha256:8aaddd65335c1c42090d916a16a835b8a5086bacfca1b4d296a88ce82c4050d1`. Stale because the unit changed: Task 16.2 (Thurgood, `448d4fe7d`, with the correction of bullet 1 at `89aa1604d`) replaced the "no theme types today" text with the theme surface `generate` writes. Confirmed at 9 items first (`8fed6dec8`).
- **Read before this act**: the whole canonical unit in `canonical/agents/data.md` (`### Android Theming (Spec 094)`, 12 lines) and its rendering in `canonical/_consumer-output/_canonical/agents/data.md`, `cc/.claude/agents/data.md` and `kiro/.kiro/agents/data-prompt.md`, through tool calls in this session at `e10072c9d`. The three renderings equal the canonical unit except the last bullet, which carries the one removal (`subtraction-1`), re-keyed to the installed package snapshots.
- **Hashes, computed in this act**: `canonicalHash` `sha256:aa54dd17d5aa579774e1fe17b0813b5d3ddf3b88568287af9daed8a1d188db62` (equals the overlay pin). `renderedHash` `sha256:f52904eca7ce3a157d16868b2fa6a7d56fa3af8557164a0f9ba608ceacb88198`. Both moved.
- **Credited, each by what the rendering states**:
  - `theming-1` to `theming-8`: verbatim in the rendering (L1, the fixed-contract sentence, the base-light sentence, the "no `Dark` entry" sentence, the provider sentence, the `both` / `darkTheme` sentence, the product-tokens bullet, the static-tokens bullet).
  - `theming-9`: entailed under re-keying. The rendering keeps "**Ground truth for these token values is LIVE, not a file**", names the installed package's un-themed base snapshots as the thing not to read, and points to the application MCP for the per-theme set. The removal (`subtraction-1`) is the repo-internal `dist/*.kt` wording, as before.
- **Fact check**: a reader following bullet 1 can no longer take the static colours as theme-varying: it names `accessibility_focus_color` and `color_icon_optical_balance` as still on `DesignTokens`.
- **Residual**: the holder, enum-entries, KDoc, default-name and `Wcag` sentences are verbatim in the rendering but are not items (see the confirmation note); if a later rendering drops one, no item catches it. Not a refusal.
- **Prior record**:

**Refuse: should-re-point.** The disposition removes the whole negative ("not a file — never read the built `dist/*.kt` snapshots (see the Ground truth section)") as our repo's stale-snapshot guidance (subtraction-3). The rendering keeps only "Ground truth … is LIVE — query the application MCP … and the per-theme set". So **`theming-6` is not entailed**: its prohibition is gone. The other five items are verbatim.

**The removal has a consumer counterpart** (see the header fact): the package ships flattened `DesignTokens.android.kt` snapshots into `node_modules/@3fn/core/dist/`. This unit is where the theme-varying (`Local{Abbreviation}Theme`) access is taught, so losing the guard against the flattened file here is the exact K-D2 hazard.

The fix is a re-point, not a restoration: our bare `dist/*.kt` would, in a consumer, wrongly hit the app's own `npx designerpunk generate` output. It should name the package snapshots, `node_modules/@3fn/core/dist/**/DesignTokens.android.kt`, and keep the "read the per-theme set from the MCP" positive.

**Re-sign (2026-09-29, re-author batch `dba93df5`): ASSENT — 6 of 6. My refusal is resolved by re-authoring.** The snapshot negative is **restored**, re-keyed to the package root: "never read DesignerPunk's un-themed base snapshots … (`node_modules/@3fn/core/dist/*.android.kt`)". That is the re-point my refusal asked for. It names the package's flattened files, not the consumer's own `generate` output, and the MCP positive is kept. Dropping "(see the Ground truth section)" is correct, because the consumer's Ground truth section no longer lists the DesignTokens trim. **Dependency accepted**: the glob `dist/*.android.kt` covers the top-level `DesignTokens.android.kt` but not `dist/android/DesignTokens.android.kt`. That file leaves the package at Task 16.3 (Ada's split). Until 16.3 merges, the subdirectory copy still ships and is not named. `theming-6` is entailed under re-keying. "for your themed values" narrows the prohibition to the hazard itself, which is the subject of this unit. `theming-1` to `theming-5` are verbatim.

**Re-sign 2026-10-12 (Spec 123 Task 31.4), after Thurgood's authoring commits `dc86ef3ac` (31.2) and `e44e5fe19` / `fdec41750` (31.3): ASSENT, `surviving: [theming-2, theming-3, theming-4, theming-5, theming-6]`.** A new act; it closes no divergent (RS-1 has not landed).
- **Stale list and hashes.** The row is on the branch's stale list at head `a46057606` (three rows: this one, `ambient.groundTruthManifest.verdict` and `commands[platform-tokens]`; Kenya's three were re-signed there). `canonicalHash` unchanged (`7818e0ca…`); `renderedHash` moves `58222617…` -> `8aaddd65…` (`renderedHashOf(readConsumerSpans, rowSpanSource)`, run read-only in the worktree).
- **What I read, in this session.** The unit as rendered in cc `data.md` L65-72, kiro `data-prompt.md` L35-42 and `_canonical` `data.md` L189-196; the three are identical. Bullet 1 now reads: *"Your `npx designerpunk generate` produces no theme types for Android today: no `{Name}Theme` data class, no `{Name}Themes` object and no `Local{Abbreviation}Theme` CompositionLocal, and the theme-varying semantic colors are left out of `DesignTokens`. DesignerPunk plans to address this in its consumer-generation completeness work (Spec 129), with no date set. The next two bullets, on providing and selecting a theme, are the intended shape once it does."*
- **`theming-1` is removed and not credited.** The rendering states the opposite of "generated Kotlin output includes a `{Name}Theme` data class, a `{Name}Themes` object and a `Local{Abbreviation}Theme` CompositionLocal". The new `removals` entry (`cites: subtraction-1`) is the right removal for that sentence. **Judgment on the cite: accepted, with a residual.** Subtraction-1 (repo-internal tooling invocations) is the nearest of the five, because the sentence inventories what DesignerPunk's own generator emits; it is not an exact fit (the sentence is a false claim being replaced, not a tooling invocation), and the closed set has no "false claim replaced". Whether a replaced phrase is a subtraction at all is RS-1's question, not this act's. I did not edit the cite.
- **Credited.** `theming-2` (L68, verbatim) and `theming-3` (L69, verbatim) survive as the intended shape that bullet 1 frames. `theming-4` (L70, verbatim) survives: it is a naming rule a consumer can violate when choosing `abbreviation`. **Residual on `theming-4`, not a refusal**: nothing enforces it. `ConfigLoader.ts` takes `abbreviation` verbatim (L111) with no case check, and both emitters write `Local${abbreviation}Theme` as given (`TokenFileGenerator.ts` L1389, `KotlinEmitter.ts` L11), so the uppercase rule is guidance the agent follows, not a property of the output; the `.dp` collision rationale is inherited from Spec 094 and I did not re-verify it. `theming-5` (L71, verbatim) survives, and is true today (static tokens are on `DesignTokens`). `theming-6` (L72, verbatim) survives for the reason in my 2026-09-29 re-sign; **divergent 5 stands as I resolved it** ("for your themed values" scopes the prohibition: the snapshot is a correct reference for DesignerPunk's own un-themed base and wrong as the source of the consumer's themed values, which today exist nowhere in the consumer's generated file).
- **Facts the new bullet rests on, checked in this worktree.** `generateThemeOverrideBlocks` (`TokenFileGenerator.ts` L1028) has no caller in `src` outside tests (`grep -rn`), so `generateKotlinThemeTypes` is never reached; the theme-varying tokens are excluded from the native semantic section (`TokenFileGenerator.ts` L844, set built at `generateTokenFiles.ts` L182-190); the spec directory is `.kiro/specs/129-consumer-generation-completeness`. Read, not run (I did not execute `generate`).
- **Residual, not a refusal (the fork named at 31.0, Option A)**: bullets 2-3 are verbatim and are framed by bullet 1 directly above; an agent that quotes bullet 2 alone could write against `Local{Abbreviation}Theme`, which nothing defines. I judged the framing sufficient for the signature. The text does not say native Android is unsupported; the Integration Guide's Android sub-section does.
- **Erratum.** My 2026-09-29 re-sign above reads the unit as teaching *"the theme-varying (`Local{Abbreviation}Theme`) access"* and the first bullet as describing generated output; that reading is superseded. A consumer's `generate` emits no theme surface today.

**Re-signed 2026-10-25 (served-docs token-name correction): ASSENT, `surviving: [theming-1, theming-2, theming-3, theming-4, theming-5, theming-6]`.** A new act; it closes no divergent. The canonical source's first bullet (`canonical/agents/data.md:283`) was corrected to say what `generate` writes today, which is the sentence the consumer overlay already carried; the overlay pin was re-grounded at `3071015d2`, the rendering regenerated at `94ce930bf`, and `theming-1` re-quoted at `46ae0efda`.
- **What I read, in this session.** The unit as rendered in `canonical/_consumer-output/cc/.claude/agents/data.md` L66-74 (committed at `94ce930bf`). The first bullet reads: *"Your `npx designerpunk generate` produces no theme types for Android today: no `{Name}Theme` data class, no `{Name}Themes` object and no `Local{Abbreviation}Theme` CompositionLocal, and the theme-varying semantic colors are left out of `DesignTokens`. DesignerPunk plans to address this in its consumer-generation completeness work (Spec 129), with no date set. The next two bullets, on providing and selecting a theme, are the intended shape once it does."*
- **`theming-1` is credited again.** The operative-set item was re-quoted to this same sentence, and the rendering states it verbatim. My 2026-10-12 entry above did not credit it only because the item then quoted the old "Generated Kotlin output includes: ..." text, which the rendering contradicted; that contradiction is gone. The `removals` entry of the old sentence (`subtraction-1`) is authoring and stands as authored; I did not edit it.
- **Credited, unchanged**: `theming-2` (L69, verbatim), `theming-3` (L70, verbatim), `theming-4` (L71, verbatim), `theming-5` (L72, verbatim) and `theming-6` (L73, verbatim: the prohibition names the installed-package snapshots and points the reader to the application MCP for the per-theme set).
- **Hashes.** `canonicalHash` moves `7818e0ca...` to `67c16e21...` (`hashText` of the unit from `partition(body).units`, equal to the overlay pin and to the sweep's current value). `renderedHash` stays `8aaddd65...`: the rendering text is the same as the one I signed on 2026-10-12, because the overlay already carried the corrected sentence.
- **Residual, unchanged from 2026-10-12 (Option A)**: bullets 2 and 3 are verbatim and are framed by bullet 1 directly above; a reader quoting bullet 2 alone can still write against a `Local{Abbreviation}Theme` nothing defines. The `theming-4` enforcement residual also stands (nothing checks the abbreviation's case).

## `#step-2-set-up-the-screen`

signer: data

**Re-signed 2026-11-08 (Task 18.5): ASSENT, `surviving: [setup-1, setup-2, setup-3]`.** A new act; it closes no divergent. Prior signature: assent 3/3 against `renderedHash` `sha256:588e8e32908234aaaf111a3ddd13df83ba8dac5b4aa3e8bef3812c514a6a6ff6`. Stale because the rendering changed under Peter's ruling of 2026-11-08T14:47:50Z (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-u12-retired-names.md`): the overlay prose no longer names the package's `dist/` snapshots (Thurgood `3d479bd4b`, Lina's regeneration `7cfe548e7`).
- **Read before this act**: the whole unit and its rendering, from the print-mode output at `31bd947dae512183b1b631b63ce8a92597d6b624`: the canonical unit `### Step 2: Set Up the Screen` and its three renderings, which are identical to each other.
- **Hashes, from that print**: `canonicalHash` `sha256:61029dcbeeee35dc3ba5b50c4baa20671d2a1208c38a037f5de9f2a2cd4a4dfe` (did not move). `renderedHash` `sha256:927ec4f1b0674d5e17de8a5ad31a53ff8d4583309e969f59e2353aaa13d108aa` (moved).
- **Credited, each by what the rendering states**:
  - `setup-1` and `setup-3`: verbatim.
  - `setup-2`: entailed. The rendering keeps "Bring in DesignerPunk tokens by querying the application MCP for the resolved values" and adds "the MCP is the ground truth". The parenthetical guard against the stale `dist/*.kt` snapshots (`subtraction-1`) is replaced by "no token snapshot ships in the package", so the file the guard warned about is gone from what the consumer receives.
- **Residual, not a refusal**: the step no longer carries a prohibition as such. With no shipped snapshot, the positive (MCP first) is the whole instruction.

**Refuse: should-re-point.** `setup-2` loses its parenthetical guard "(never read the stale `dist/*.kt` snapshots — see the Ground truth section)" (subtraction-3). The rendering keeps "Bring in DesignerPunk tokens by querying the application MCP for the resolved values", so the positive half survives and the prohibition does not. `setup-1` and `setup-3` are verbatim (`setup-3` holds, because the Android implementations ship in the package).

The guard has a consumer counterpart (header fact). This step is the moment the agent first brings tokens into a screen, which is when a flattened `DesignTokens.android.kt` in `node_modules/@3fn/core/dist/` is most likely to be read.

The fix is a re-point, not a restoration: our bare `dist/*.kt` would, in a consumer, wrongly hit the app's own `npx designerpunk generate` output. It should name the package snapshots, `node_modules/@3fn/core/dist/**/DesignTokens.android.kt`, and keep the "read the per-theme set from the MCP" positive.

**Re-sign (2026-09-29, `dba93df5`): ASSENT — 3 of 3. Refusal resolved.** The snapshot negative is **restored**, re-keyed to the package root: "never read DesignerPunk's un-themed base snapshots … (`node_modules/@3fn/core/dist/*.android.kt`)". That is the re-point my refusal asked for. It names the package's flattened files, not the consumer's own `generate` output, and the MCP positive is kept. Dropping "(see the Ground truth section)" is correct, because the consumer's Ground truth section no longer lists the DesignTokens trim. **Dependency accepted**: the glob `dist/*.android.kt` covers the top-level `DesignTokens.android.kt` but not `dist/android/DesignTokens.android.kt`. That file leaves the package at Task 16.3 (Ada's split). Until 16.3 merges, the subdirectory copy still ships and is not named. `setup-2` is entailed under re-keying: the parenthetical guard is back, and it names the package snapshots.

## `#how-to-use-designerpunk-tokens-on-android`

signer: data

**Re-signed 2026-11-08 (Task 18.5): ASSENT, `surviving: [tokens-1, tokens-2, tokens-3, tokens-4, ground-truth-live, per-theme-set]`.** A new act; it closes no divergent. Prior signature: assent 6/6 against `renderedHash` `sha256:6979718fcf9114f8a29108b35f92ab6a54a417093b1fddfe7704680ddc3c6c8a`. Stale because the rendering changed under Peter's ruling of 2026-11-08T14:47:50Z (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-u12-retired-names.md`): the overlay's ground-truth paragraph no longer names the package's `dist/` snapshots (Thurgood `3d479bd4b`, Lina's regeneration `7cfe548e7`).
- **Read before this act**: the whole unit and its rendering, from the print-mode output at `b5022bcb0459e613900344803fd8ac0b34e3a341`: the canonical unit (`## Token Consumption` and `### How to Use DesignerPunk Tokens on Android`) and its three renderings, which are identical to each other.
- **Hashes, from that print**: `canonicalHash` `sha256:14fa4d5367f385a948746af6f26587002fc2b27522af0fb2588b09a1c901e22e` (did not move). `renderedHash` `sha256:8acb67f9574457436d2e07795605ce52eed0340fc64a363048a89aca89a74b10` (moved).
- **Credited, each by what the rendering states**:
  - `tokens-1` to `tokens-4`: verbatim (the four bullets are unchanged).
  - `per-theme-set`: verbatim ("Theme-varying tokens are a per-theme SET — the tool returns the set, not a single flattened value").
  - `ground-truth-live`: entailed. The rendering keeps "**Ground truth for token values is LIVE, not a file**" and the query of the application MCP for the resolved value, formula and per-platform names, naming the tools (`get_token_details`, `get_component_full`). The prohibition on "the built `dist/*.kt` snapshots (see the Ground truth section)" (`subtraction-1`) is replaced by "no token snapshot ships in the package", which states why there is nothing to read; it adds where the consumer's own `DesignTokens` and `ComponentTokens` are written.
- **Residual, not a refusal**: the prohibition as such is gone, so the item's negative half rests on the positive ("LIVE, not a file") and on the fact that no snapshot ships. The new sentence says the consumer's own generated files exist; it does not say to prefer the MCP over them for a theme-varying token, though `per-theme-set` and "LIVE, not a file" together carry that.

**Refuse: should-re-point.** `ground-truth-live` loses "not a file — never read the built `dist/*.kt` snapshots (see the Ground truth section);" (subtraction-3). The rendering keeps "Ground truth … is LIVE — query the application MCP …", so **`ground-truth-live` is not entailed**. `tokens-1` to `tokens-4` and `per-theme-set` are verbatim.

The prohibition has a consumer counterpart (header fact). It is the named negative of this unit's own `per-theme-set` item: the shipped snapshot is exactly "a single flattened value".

The fix is a re-point, not a restoration: our bare `dist/*.kt` would, in a consumer, wrongly hit the app's own `npx designerpunk generate` output. It should name the package snapshots, `node_modules/@3fn/core/dist/**/DesignTokens.android.kt`, and keep the "read the per-theme set from the MCP" positive.

**Re-sign (2026-09-29, `dba93df5`): ASSENT — 6 of 6. Refusal resolved.** The snapshot negative is **restored**, re-keyed to the package root: "never read DesignerPunk's un-themed base snapshots … (`node_modules/@3fn/core/dist/*.android.kt`)". That is the re-point my refusal asked for. It names the package's flattened files, not the consumer's own `generate` output, and the MCP positive is kept. Dropping "(see the Ground truth section)" is correct, because the consumer's Ground truth section no longer lists the DesignTokens trim. **Dependency accepted**: the glob `dist/*.android.kt` covers the top-level `DesignTokens.android.kt` but not `dist/android/DesignTokens.android.kt`. That file leaves the package at Task 16.3 (Ada's split). Until 16.3 merges, the subdirectory copy still ships and is not named. `ground-truth-live` is entailed under re-keying, and it again sits as the named negative beside `per-theme-set` (verbatim).

## `#android-specific-guidance:preamble`

signer: data

**Re-signed 2026-11-08 (Task 18.5): ASSENT, `surviving: [native-1, native-2, native-3, native-4, native-5, native-6, native-7]`.** A new act; it closes no divergent. Prior signature: assent 7/7 against `renderedHash` `sha256:105c5501a7a06f288d1faf3cd1b2bf36ceacb8695ac6d6f8d18d47651e011ffc`. Stale because the rendering changed under Peter's ruling of 2026-11-08T14:47:50Z (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-u12-retired-names.md`): the second bullet no longer names the package's `dist/` snapshots (Thurgood `3d479bd4b`, Lina's regeneration `7cfe548e7`).
- **Read before this act**: the whole unit and its rendering, from the print-mode output at `9171f6523d21b0fcf0e2b49038cd2b960bcf4b5d`: the canonical unit (`## Android-Specific Guidance`, preamble, seven bullets) and its three renderings, which are identical to each other.
- **Hashes, from that print**: `canonicalHash` `sha256:f1af38d495d490318f2bfa6a56fe110a1b71a3ab201e3291dc2be1ef285383fc` (did not move). `renderedHash` `sha256:2d22b78267f49ce14c29637f5853476fc74c914f416a8d406b117652116bde0e` (moved).
- **Credited, each by what the rendering states**:
  - `native-1` and `native-3` to `native-7`: verbatim (six bullets unchanged).
  - `native-2`: entailed. The rendering keeps "DesignerPunk tokens consumed as Kotlin constants from the `DesignTokens` object (values queried live via the application MCP". The ", never the stale `dist/*.kt` snapshots" half (`subtraction-1`) is replaced by "no token snapshot ships in the package, and your own `generate` output is in your configured output directory". That clause also corrects what the earlier assent warned of: the sentence no longer points a consumer at a flattened `DesignTokens` that ships in `node_modules`, because none ships.
- **Residual, not a refusal**: the prohibition is now implicit. A reader who follows the clause reads their own generated `DesignTokens`, which is the intended source for static tokens; theme-varying colours are taught by the Android Theming unit, which I signed in the first act of this run.

**Refuse: should-re-point.** `native-2` loses ", never the stale `dist/*.kt` snapshots" (subtraction-3). The rendering keeps "DesignerPunk tokens consumed as Kotlin constants from the `DesignTokens` object (values queried live via the application MCP)". Without the negative, this sentence now points a consumer agent at a `DesignTokens` Kotlin object, and `node_modules/@3fn/core/dist/` ships one whose theme-varying colors are flattened. **`native-2` is not entailed.** The other six items are verbatim.

The fix is a re-point, not a restoration: our bare `dist/*.kt` would, in a consumer, wrongly hit the app's own `npx designerpunk generate` output. It should name the package snapshots, `node_modules/@3fn/core/dist/**/DesignTokens.android.kt`, and keep the "read the per-theme set from the MCP" positive.

**Re-sign (2026-09-29, `dba93df5`): ASSENT — 7 of 7. Refusal resolved.** The snapshot negative is **restored**, re-keyed to the package root: "never read DesignerPunk's un-themed base snapshots … (`node_modules/@3fn/core/dist/*.android.kt`)". That is the re-point my refusal asked for. It names the package's flattened files, not the consumer's own `generate` output, and the MCP positive is kept. Dropping "(see the Ground truth section)" is correct, because the consumer's Ground truth section no longer lists the DesignTokens trim. **Dependency accepted**: the glob `dist/*.android.kt` covers the top-level `DesignTokens.android.kt` but not `dist/android/DesignTokens.android.kt`. That file leaves the package at Task 16.3 (Ada's split). Until 16.3 merges, the subdirectory copy still ships and is not named. `native-2` no longer points a consumer at the flattened `DesignTokens` object: the "never" clause names it.

**Re-sign (2026-10-19): ASSENT — 7 of 7.** The unit moved when ballot `2026-10-18-true-native-development-is-not-true-native-design` § 6.8 was applied (`dccd3fc61`). Judged against the overlay rendering at `sha256:ecee4b84…`. `native-1` renders verbatim as my new line: "Jetpack Compose composables with Material 3 as structural base (Scaffold, system bars); visuals follow DesignerPunk tokens and the spec". A consumer's Data reads Material 3 as structure, and the look comes from the spec, as the ballot intends. `native-2` keeps the 2026-09-29 re-point, and the removal of "the stale `dist/*.kt` snapshots" (subtraction-1) still applies. The Task 16.3 dependency I accepted then is closed: `package.json` `files` now negates `dist/android/**`, so the subdirectory copy no longer ships. `native-3` to `native-7` are verbatim.

**Re-signed 2026-11-05 (Core Goals Android-minimum ballot, item 1, site 2): ASSENT, `surviving` 7 of 7 (`native-1` to `native-7`).** A new act, read fresh against the new rendering. Nothing is carried from the 2026-10-19 signature above.
- **The ballot**: `.kiro/docs/ballots/2026-11-05-core-goals-android-minimum.md` (RATIFIED, Peter, 2026-11-05, #673, F-1 (iii)).
  - The profile author applied site 2 (L461) and re-quoted `native-7` at `539beadd7`.
  - The rendering was regenerated at `b46d3f693`.
  - I re-confirmed the set at 7 at `ff9d1423e`.
- **What I read, in this session, through tool results**: the unit as rendered in all three consumer copies (`_canonical/agents/data.md`, `cc/.claude/agents/data.md`, `kiro/.kiro/agents/data-prompt.md`, `## Android-Specific Guidance`, committed at `b46d3f693`). They are identical, and I read them through `readConsumerSpans`. The last bullet reads `- Android minimum version per Core Goals` and ends there. No copy contains "not yet constrained".
- **The removal**: the row's one removal ("the stale `dist/*.kt` snapshots", `subtraction-1`) is unchanged; the row equals `origin/main`'s before this act (checked by script). The rendering shows it subtracted, and `native-2` keeps the 2026-09-29 re-point ("never DesignerPunk's un-themed base snapshots at `node_modules/@3fn/core/dist/*.android.kt`").
- **Credited**:
  - `native-1` and `native-3` to `native-7` appear verbatim in each of the three rendered copies (checked by script).
  - `native-2` is entailed under the re-keying, as ruled on 2026-09-29.
  - `native-7` now points a consumer's Android agent at the minimum Core Goals states. Re-ruled `obligation` at `ff9d1423e`: setting or accepting a `minSdk` below it contradicts it.
- **Hashes.**
  - `canonicalHash` moves from `ecee4b84...` to `f1af38d4...`: `hashText` of the unit from `partition(body).units`, equal to the overlay pin and to my confirmation.
  - `renderedHash` moves from `fb059093...` to `105c5501...`: `renderedHashOf` over the committed rendering, `rowSpanSource('canonical/agents/data.md', 'body', '#android-specific-guidance:preamble')`.

## `#frontmatter:writeScope[.kiro/issues/**]`

signer: data

**ASSENT — `no-consumer-counterpart`, `surviving: []`** (first signature, 2026-10-17; added by ballot `2026-10-17-standing-write-scope-six-roots` § 2.5 / § 5 item 1). `subtraction-3` applies: `.kiro/issues/**` is this repo's stewardship instrument, meaning the `.kiro/issues/README.md` rules, Thurgood's monthly walk, and rule 9's claims-pass finding on out-of-rule edits. `init` creates no `.kiro/issues/` in a consumer repo, so a consumer's Data has nothing there to author, append to, or be walked against, and gets no scope. At consult I noted that rule 9 keys on the singular `**Owner**:` header while several records (including the build-verification harness charter) use `**Owners**:`; that is an ambiguity in the repo's own convention and does not bear on the consumer disposition.

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

**Re-sign 2026-10-12 (Spec 123 Task 31.4), after Thurgood's intro reword (`render.ts`, 31.1, regenerated at `48664c634`): ASSENT to `retained`, `surviving: []`.** A new act; it closes no divergent (RS-1 has not landed).
- **Stale list and hashes.** On the branch's stale list at head `a46057606`. `canonicalHash` unchanged (`645f03d4…`); `renderedHash` moves `53f5c8db…` -> `04e9b45a…`.
- **What I read, in this session.** The line the row owns, identical in the cc and kiro renderings: cc `data.md` L485 and kiro `data-prompt.md` L279: *"Your token ground truth is served LIVE by MCP — never a build snapshot. Do NOT read these generated build outputs for token values; query the live tool instead:"*. The `## Ground truth` heading and its blank line (cc L483-484, kiro L277-278) are the container span and are not hashed by this row; the Kiro blank line is present. The `_canonical` frontmatter L26 keeps `verdict: none-trim-stale-snapshots`.
- **Why `retained` still holds.** The manifest still trims one shipped, un-themed snapshot in a consumer: the ComponentTokens trim, re-pointed to `node_modules/@3fn/core/dist/ComponentTokens.android.kt` (cc L486). The reworded line calls the listed artifact a generated build output, which is what it is. It closes the "stale/generated" residual I recorded on 2026-10-02.
- **Surviving**: `[]`; this frontmatter row owes no operative-set items.

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

**Re-sign 2026-10-12 (Spec 123 Task 31.4), after Thurgood's authoring commit `dc86ef3ac` (31.2): ASSENT to the re-point, `surviving: []`.** A new act; it closes no divergent (RS-1 has not landed).
- **Stale list and hashes.** On the branch's stale list at head `a46057606`. `canonicalHash` unchanged (`d5688f94…`); `renderedHash` moves `e08e5893…` -> `b563dc3b…`.
- **What I read, in this session.** The cue as rendered: cc `data.md` L515 and kiro `data-prompt.md` L309, *"regenerate your platform token output and product tokens from your token source and `designerpunk.config.ts`: `npx designerpunk generate` (run from your product repo)"*, and the `_canonical` frontmatter L107 (`cue: regenerate your platform token output and product tokens from your token source and `designerpunk.config.ts``).
- **Why it holds.** The clause *"including your theme Kotlin"* was removed, not reworded (my R1 and R2 of claims-pass finding R-1). What remains is true: `generate` writes the platform token files and, when `productTokens` is configured, the product Kotlin (`src/cli/generateProductTokens.ts`). "And `designerpunk.config.ts`" does not overclaim: the config drives `tokenSource`, `output`, `productTokens`, component-token directories and `name`/`abbreviation` into the product tokens; it names a trigger to regenerate, not that every config key (the `themes` list is inert) changes output. Ada's fact-check is reported TRUE in the brief; I relied on my own read of the source. The command, `runContext` and source are unchanged and still re-point `npm run generate:platform-tokens` (subtraction-1).
- **Erratum.** My 2026-09-29 final re-sign above says the rendered cue's command *"materialises the `{Name}Theme` / `Local{Abbreviation}Theme` Kotlin"*. That was wrong: a consumer's `generate` emits no theme surface today. This entry supersedes it.

## `#frontmatter:commands[android-build-test]`

signer: data

**FIRST SIGNATURE 2026-10-23 — ASSENT to `re-pointed` (`surviving: []`, since a frontmatter entry carries no operative items).** The row was routed (`re-pointed-entry`) with no signature; this is its first.
- Canonical `gap` is "no gradlew / Android app exists in THIS repo (it is the design-system source, not an Android app) — Android build & instrumentation run from the product app's android/ dir: ...". The consumer value drops the design-system-repo clause and says "run from this product app's android/ dir"; the four `./gradlew` commands (`assembleDebug`, `test`, `connectedAndroidTest`, `connectedDebugAndroidTest`) and the cue are byte-identical.
- It is right for a consumer: the consumer repo IS the Android app, so the gradle commands run there. The rendering (cc `data.md`, kiro `data-prompt.md`) appends "(run from your product repo)", which agrees with `runContext: consumer-repo`.
- The function survives: the role still knows which commands build, unit-test and instrument-test an Android app.

## `#frontmatter:commands[product-screen-commands]`

signer: data

**FIRST SIGNATURE 2026-10-23 — ASSENT to `re-pointed` (`surviving: []`).** The row was routed (`re-pointed-entry`) with no signature; this is its first.
- Canonical says product-screen commands "are per-product and cannot be extracted in this repo — they live in the consumer Android app". The consumer value says they are per-product and to "read them from this Android app's own build setup". `runContext: per-product`, `authoredPerProduct: true` and the cue are unchanged.
- It is right for a consumer: the "cannot be extracted in this repo" framing is about the design-system source; in a consumer repo the commands are in the app's own build files, and the re-pointed text points the role there. It matches the `#what-you-dont-own` destination ("read it from the app's build setup before you run anything").
- The function survives: the role is told these commands are not a DesignerPunk-supplied set and where to find them.

## `#frontmatter:knowledgeBases[android-components]`

signer: data

**FIRST SIGNATURE 2026-10-23 — ASSENT to `re-pointed` (`surviving: []`).** The row was routed (`re-pointed-entry`) with no signature; this is its first.
- The glob re-points from `src/components/core/*/platforms/android/**` to `node_modules/@3fn/core/src/components/core/*/platforms/android/**`. A consumer repo has no `src/components/core/`; the Android component sources arrive in the installed package.
- Checked against the package manifest in this worktree: `package.json` `files` ships `src/components/core/**/platforms/android/*.kt` and `.../android/res/**` (minus `*Test.kt`), so the re-pointed path exists in a consumer install and `android/**` covers what ships.
- `knowledgeBases[android-tests]` is already `no-consumer-counterpart` (test sources do not ship), so nothing is left pointing at a path that is absent.
- Both renderings carry the path (cc: "search these paths with Grep/Glob"; kiro: "search these paths").

## `#frontmatter:writeScope[.kiro/specs/**]`

signer: data

**FIRST SIGNATURE 2026-10-23 — ASSENT to `re-pointed` (`surviving: []`).** The row was routed (`re-pointed-entry`) with no signature; this is its first.
- `.kiro/specs/**` re-points to `specs/**`. The consumer repo has no `.kiro/` spec tree; its Task Completion Protocol puts completion docs at `specs/[spec]/completion/...` and summary docs at `specs/[spec]/task-N-summary.md`, so the scope covers what the role writes. Same reasoning Ada signed at `1ddac1d23`.
- `writeScope[docs/specs/**]` is already `superseded-by` this entry, so the one scope entry carries both canonical paths. `writeScope[.kiro/issues/**]` stays `no-consumer-counterpart`.
- The hash covers all three renderings (cc `data.md`, kiro `data-prompt.md`, kiro `data.json`).

## `#frontmatter:writeScope[harness/android/**]`

signer: data
date: 2026-11-08
row: `canonical/profiles/consumer/data.dispositions.yaml` · frontmatter · `writeScope[harness/android/**]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:6b602a648035b93ee282a3f13c2b25189b919f2c3b5951b1a7b79c4f5ba0f873
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `harness/android/**` is one of the harness paths that ballot `2026-11-07-native-lane-ownership` items 1 and 3 add to my standing write scope for the native compile harness's Android lane (the lane's files). It is repo-internal tooling: `harness/` and `scripts/harness/` are not in the package's `files`, so a consumer has no copy to own, and none of my four consumer renderings carries the string "harness" (grep over the `_canonical`, `cc` and two `kiro` copies: 0). canonicalHash is `hashEntry` of the entry's value, recomputed by me with `entryTree` + `regrounding/hash.ts` over `canonical/agents/data.md` at `0fc2379f0`. The renderedHash is the empty-span hash: 0 pieces, from `readConsumerSpans` / `renderedHashOf` / `rowSpanSource`. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/harness/probe-kotlin.ts]`

signer: data
date: 2026-11-08
row: `canonical/profiles/consumer/data.dispositions.yaml` · frontmatter · `writeScope[scripts/harness/probe-kotlin.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:c7a83cc2df75eb723d1bc64e3c84386ff467bbb7735e45ff3f2625dd075beb32
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/harness/probe-kotlin.ts` is one of the harness paths that ballot `2026-11-07-native-lane-ownership` items 1 and 3 add to my standing write scope for the native compile harness's Android lane (the lane's files). It is repo-internal tooling: `harness/` and `scripts/harness/` are not in the package's `files`, so a consumer has no copy to own, and none of my four consumer renderings carries the string "harness" (grep over the `_canonical`, `cc` and two `kiro` copies: 0). canonicalHash is `hashEntry` of the entry's value, recomputed by me with `entryTree` + `regrounding/hash.ts` over `canonical/agents/data.md` at `0fc2379f0`. The renderedHash is the empty-span hash: 0 pieces, from `readConsumerSpans` / `renderedHashOf` / `rowSpanSource`. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/harness/parse-kotlin.ts]`

signer: data
date: 2026-11-08
row: `canonical/profiles/consumer/data.dispositions.yaml` · frontmatter · `writeScope[scripts/harness/parse-kotlin.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:7b76ab2c094253ffac225cba9be2fdbe761ed05be9a74e4a99307f17a578f9fc
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/harness/parse-kotlin.ts` is one of the harness paths that ballot `2026-11-07-native-lane-ownership` items 1 and 3 add to my standing write scope for the native compile harness's Android lane (the lane's files). It is repo-internal tooling: `harness/` and `scripts/harness/` are not in the package's `files`, so a consumer has no copy to own, and none of my four consumer renderings carries the string "harness" (grep over the `_canonical`, `cc` and two `kiro` copies: 0). canonicalHash is `hashEntry` of the entry's value, recomputed by me with `entryTree` + `regrounding/hash.ts` over `canonical/agents/data.md` at `0fc2379f0`. The renderedHash is the empty-span hash: 0 pieces, from `readConsumerSpans` / `renderedHashOf` / `rowSpanSource`. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/harness/__tests__/probe-kotlin.test.ts]`

signer: data
date: 2026-11-08
row: `canonical/profiles/consumer/data.dispositions.yaml` · frontmatter · `writeScope[scripts/harness/__tests__/probe-kotlin.test.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:9174976792ac67a36c2cd76e081d85cdc20e4868172367e2e4684d164b75a75f
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/harness/__tests__/probe-kotlin.test.ts` is one of the harness paths that ballot `2026-11-07-native-lane-ownership` items 1 and 3 add to my standing write scope for the native compile harness's Android lane (the lane's files). It is repo-internal tooling: `harness/` and `scripts/harness/` are not in the package's `files`, so a consumer has no copy to own, and none of my four consumer renderings carries the string "harness" (grep over the `_canonical`, `cc` and two `kiro` copies: 0). canonicalHash is `hashEntry` of the entry's value, recomputed by me with `entryTree` + `regrounding/hash.ts` over `canonical/agents/data.md` at `0fc2379f0`. The renderedHash is the empty-span hash: 0 pieces, from `readConsumerSpans` / `renderedHashOf` / `rowSpanSource`. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/harness/__tests__/parse-kotlin.test.ts]`

signer: data
date: 2026-11-08
row: `canonical/profiles/consumer/data.dispositions.yaml` · frontmatter · `writeScope[scripts/harness/__tests__/parse-kotlin.test.ts]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:32f390bf2e2e9f54c05b6e1eaeb2181212ce23107ec538ca41d95856a57180aa
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/harness/__tests__/parse-kotlin.test.ts` is one of the harness paths that ballot `2026-11-07-native-lane-ownership` items 1 and 3 add to my standing write scope for the native compile harness's Android lane (the lane's files). It is repo-internal tooling: `harness/` and `scripts/harness/` are not in the package's `files`, so a consumer has no copy to own, and none of my four consumer renderings carries the string "harness" (grep over the `_canonical`, `cc` and two `kiro` copies: 0). canonicalHash is `hashEntry` of the entry's value, recomputed by me with `entryTree` + `regrounding/hash.ts` over `canonical/agents/data.md` at `0fc2379f0`. The renderedHash is the empty-span hash: 0 pieces, from `readConsumerSpans` / `renderedHashOf` / `rowSpanSource`. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/harness/__tests__/fixtures/kotlin/**]`

signer: data
date: 2026-11-08
row: `canonical/profiles/consumer/data.dispositions.yaml` · frontmatter · `writeScope[scripts/harness/__tests__/fixtures/kotlin/**]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:846c81ba9045989ba7c22ab4ff6519b2f32a118af3f05b9ee90d9c71a4186a6f
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/harness/__tests__/fixtures/kotlin/**` is one of the harness paths that ballot `2026-11-07-native-lane-ownership` items 1 and 3 add to my standing write scope for the native compile harness's Android lane (the lane's files). It is repo-internal tooling: `harness/` and `scripts/harness/` are not in the package's `files`, so a consumer has no copy to own, and none of my four consumer renderings carries the string "harness" (grep over the `_canonical`, `cc` and two `kiro` copies: 0). canonicalHash is `hashEntry` of the entry's value, recomputed by me with `entryTree` + `regrounding/hash.ts` over `canonical/agents/data.md` at `0fc2379f0`. The renderedHash is the empty-span hash: 0 pieces, from `readConsumerSpans` / `renderedHashOf` / `rowSpanSource`. I assent that nothing survives.

## `#frontmatter:writeScope[scripts/harness/__tests__/fixtures/parse-kotlin/**]`

signer: data
date: 2026-11-08
row: `canonical/profiles/consumer/data.dispositions.yaml` · frontmatter · `writeScope[scripts/harness/__tests__/fixtures/parse-kotlin/**]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:5e983ce471832f2632116dacdf748114718170b493caf469e13df4be724dc800
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `scripts/harness/__tests__/fixtures/parse-kotlin/**` is one of the harness paths that ballot `2026-11-07-native-lane-ownership` items 1 and 3 add to my standing write scope for the native compile harness's Android lane (the lane's files). It is repo-internal tooling: `harness/` and `scripts/harness/` are not in the package's `files`, so a consumer has no copy to own, and none of my four consumer renderings carries the string "harness" (grep over the `_canonical`, `cc` and two `kiro` copies: 0). canonicalHash is `hashEntry` of the entry's value, recomputed by me with `entryTree` + `regrounding/hash.ts` over `canonical/agents/data.md` at `0fc2379f0`. The renderedHash is the empty-span hash: 0 pieces, from `readConsumerSpans` / `renderedHashOf` / `rowSpanSource`. I assent that nothing survives.

## `#frontmatter:writeScope[harness/pins.yaml]`

signer: data
date: 2026-11-08
row: `canonical/profiles/consumer/data.dispositions.yaml` · frontmatter · `writeScope[harness/pins.yaml]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:928141613afeaab9f58b4a771ad4443d82d070551c07284076a0d2e31010da32
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite (subtraction 1). `harness/pins.yaml` is one of the harness paths that ballot `2026-11-07-native-lane-ownership` items 1 and 3 add to my standing write scope for the native compile harness's Android lane (the `android:` section only, under P1–P6, which a glob cannot carry; the In Scope bullet carries the limit). It is repo-internal tooling: `harness/` and `scripts/harness/` are not in the package's `files`, so a consumer has no copy to own, and none of my four consumer renderings carries the string "harness" (grep over the `_canonical`, `cc` and two `kiro` copies: 0). canonicalHash is `hashEntry` of the entry's value, recomputed by me with `entryTree` + `regrounding/hash.ts` over `canonical/agents/data.md` at `0fc2379f0`. The renderedHash is the empty-span hash: 0 pieces, from `readConsumerSpans` / `renderedHashOf` / `rowSpanSource`. I assent that nothing survives. The same glob stands in Kenya's and Ada's charters; one hash in three files with three signatures is expected, not a collision (ballot site 12).

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

