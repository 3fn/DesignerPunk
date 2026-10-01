# Signatures — `kenya` (C1, owner seat)

**Dispositions**: `canonical/profiles/consumer/kenya.dispositions.yaml` · **Source**: `canonical/agents/kenya.md` · **Rendering**: `canonical/_consumer-output/_canonical/agents/kenya.md` · **Overlay**: `canonical/profiles/consumer/kenya.overlay.md`
**Signer**: Kenya. Under C1 the owner signs, because the owner is not the profile author (Req 11.4.1, 11.5.6).
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase two · Sheet regenerated at `60b0fdb5`.

**Scope (Req 11.6.5e)**: an item is credited only from the rendering of the unit under judgment, read in the committed consumer rendering. The overlay and dispositions row are read alongside. Entailment is verbatim, re-grounded, or from another surviving statement in the same unit that makes the item impossible to violate.

**No-consumer-counterpart rows**: `assent: { surviving: [] }` means *nothing renders, and I agree nothing should*. A refusal means the premise is false.

## `#identity`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:952e5f3cae47ecb580297b6d736e737481dfdb57b74bed68a9a0321fc8b66222
renderedHash: sha256:aef430ee4b39529b87dd4dbacf064b5b2971209b1b0eac034d829ff1e4d33903
date: 2026-09-29

**Ruling: ASSENT — 7/7 surviving.** All 7 confirmed items survive. `role`, `restraint`, `domain`, `leonardo-primary` and `system-through-leonardo` are verbatim. `human-decides` and `partner` are re-grounded: *"Your human lead makes final decisions. You are their partner, not their tool."* The removed text is the name "Peter" (subtraction-2, an authority claim naming a person), and its destination is the generic human lead in the same sentence.

**Re-sign 2026-10-01: ASSENT, 7/7 surviving.** All 7 survive unchanged.

## `#ios-theming-spec-094`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:ced2085af0c675dbb3e27cc0f93bd50feef8f21a31b28cec74f2034781da4d31
renderedHash: sha256:d4203c84f2e984e60da165582dbdec12e7797c22e6dc815e8e2a3f7b64c8b327
date: 2026-09-29

**Ruling: ASSENT — 5/5 surviving.** All 5 survive. `theming-1` to `theming-4` are verbatim. In a consumer, `theming-1` is *more* true than in-repo, because the theme surface materializes consumer-side via `npx designerpunk generate`.
- **`theming-5`** survives on the rendered directive *"query the application MCP for the resolved value, formula, per-platform (Swift) name, and the per-theme set"*. Sourcing a value or name from a Swift file violates that directive, so the item's violation is still a violation of this unit's rendering (5e, in-unit entailment).
- **Lost**: the explicit warning about *where* the stale snapshots sit. It is a live trap in consumers, because the package ships them (see the three refused ground-truth rows). No credit is taken for it here.

**Re-sign 2026-09-29, after Thurgood's re-author batch `dba93df5`: ASSENT, 5/5 surviving.** All 5 survive, and `theming-5` is now **verbatim-strong**. The rendering restores the snapshot warning, re-pointed: *"never read DesignerPunk's un-themed base snapshots in the installed package (`node_modules/@3fn/core/dist/*.ios.swift`) for your themed values; query the application MCP …"*. The gap I disclosed in phase two is closed.

## `#out-of-scope`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:79a201ad2dcfa69d1aeaa343024cc011e73790b162c90aac612534e35468d4b9
renderedHash: sha256:2cd0d550b4d748a25f9b1ca8989c70c9a892d379113db17556ecf1ad47663f98
date: 2026-09-29

**Ruling: ASSENT — 7/7 surviving.** All 7 survive. `out-1` to `out-6` are verbatim. `out-7` is re-grounded: *"Product decisions — that's your human lead's job"*.

## `#blocking-exception-direct-escalation-to-peter`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:c5cf701217d1de46ef107456928e2f87ca8cd4e4fa7a77bad68d25c84ab52875
renderedHash: sha256:a917d6f699c2fadcf9fbb50a387d289197a7bebbd8b549470f13f26424fb4582
date: 2026-09-29

**Ruling: ASSENT — 3/3 surviving.** All 3 survive. `blocking-direct` is re-grounded (flag directly to *your human lead* for routing to Thurgood), and `blocking-exception` and `blocking-when-in-doubt` are verbatim. The referent candidate `blocking-exception` (*"This is the exception…"*) keeps its referent, the preceding paragraph, in the same rendering, so no widening was needed.

## `#step-2-set-up-the-screen`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:0520953313feb889806ab2ebbf0bb02244b7b2f65f42af286c96841aab6b3b3f
renderedHash: sha256:05bc63644558796261e49b06959105d43a49115ecbd98c7113a55619793a4ab8
date: 2026-09-29

**Ruling: ASSENT — 3/3 surviving.** All 3 survive.
- **`setup-2`** keeps *"Bring in DesignerPunk tokens by querying the application MCP for the resolved values"*. Reading values from a snapshot instead violates it.
- **Removed**: the parenthetical *"(never read the stale `dist/*.ios.swift` snapshots …)"*. The item's function is entailed in-unit; the trap's location is the refused ground-truth rows' matter, and no credit is taken for it here.

**Re-sign 2026-09-29, after Thurgood's re-author batch `dba93df5`: ASSENT, 3/3 surviving.** All 3 survive. `setup-2` now carries the re-pointed warning: *"(never read DesignerPunk's un-themed base snapshots at `node_modules/@3fn/core/dist/*.ios.swift`)"*. The phase-two gap is closed.

## `#with-peter`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:90bc1ebfef01c8a04aec07cb27f3bbe0f5d2d7e3394f5741c310b5746e6ce655
renderedHash: sha256:ccdc0be83bd7323d00224f3580f6ef0bdfb3de63bfcf03865b7c5948f81ebc57
date: 2026-09-29

**Ruling: ASSENT — 4/4 surviving.** All 4 survive.
- `human-1`, `human-2` and `human-3` are re-grounded to *your human lead*. `human-2` drops the word "design" (Peter-specific) and keeps the function: respect the lead's eye.
- **`human-4`** was removed (subtraction-2, Peter's biography). It is credited by in-unit entailment from `human-3` (*"Explain iOS technical constraints in accessible terms"*). An implementation that explains accessibly cannot fail to assist the lead with technical nuances, and "skillset lives in design" is a fact about Peter with no consumer counterpart.

## `#how-to-use-designerpunk-tokens-on-ios`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:d65e9de031942f65d0caa8d367eb551948403a02467df795efb5a43b2fc02712
renderedHash: sha256:cc738734a32d6c1f65afed33448eab079152deb4d5047c5d6eac7956f5b47603
date: 2026-09-29

**Ruling: ASSENT — 6/6 surviving.** All 6 survive. `tokens-1` to `tokens-4` and `theme-set` are verbatim.
- **`ground-truth-live`** is reduced to *"Ground truth for token values is LIVE — query the application MCP for the resolved value, formula, and per-platform names."* Sourcing values or names from a file violates it, so the item is entailed in-unit.
- **Removed**: the snapshot-location warning, as in `#step-2-set-up-the-screen`. No credit is taken for it.

**Re-sign 2026-09-29, after Thurgood's re-author batch `dba93df5`: ASSENT, 6/6 surviving.** All 6 survive. `ground-truth-live` restores *"LIVE, not a file — never read DesignerPunk's un-themed base snapshots in the installed package (`node_modules/@3fn/core/dist/*.ios.swift`)"*, and `theme-set` is verbatim. This unit is also the `superseded-by` destination of the DesignTokens trim, and it carries that trim's function: the negative, the MCP directive and the per-theme set.

## `#platform-currency-expectations`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:450650ee602970a03ac8342a8feae9c3f1928d962c608aacf85c3b7414c9e813
renderedHash: sha256:c6f27e7651f99cf845387918cea5fb77810b615d7b32694b7fd6ce92408ffc62
date: 2026-09-29

**Ruling: ASSENT — 5/5 surviving.** All 5 survive. `currency-3` is re-grounded (*"When your human lead or Leonardo mention …"*), and the other 4 are verbatim.

## `#ios-specific-guidance`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:6c3f5b31c29786494310e22398e7b57165a3caabc13c4e9c68770c1bc60bbe65
renderedHash: sha256:a12f90d43ecd811945c66a5ea63227042dca03f25584faae809e5d6bfeac3145
date: 2026-09-29

**Ruling: ASSENT — 7/7 surviving.** All 7 survive.
- **`native-2`** keeps *"(values queried live via the application MCP)"*. Taking values from a Swift snapshot violates it.
- **Removed**: *"never the stale `dist/*.ios.swift` snapshots"*, the same trap-location warning. No credit is taken for it.

**Re-sign 2026-09-29, after Thurgood's re-author batch `dba93df5`: ASSENT, 7/7 surviving.** All 7 survive. `native-2` now reads *"values queried live via the application MCP, never DesignerPunk's un-themed base snapshots at `node_modules/@3fn/core/dist/*.ios.swift`"*. The phase-two gap is closed.

## `#mcp-practice-notes`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:3d20b37cd8c640f0c0954ab95124a5c75636fbacf175aed9d32d590d7c013e82
renderedHash: sha256:51a4942c0d04caaefada32cacbd6b22e488e8c4dd5696fcf47b68d28ec692d2d
date: 2026-09-29

**Ruling: ASSENT — 3/3 surviving.** All 3 survive.
- **`ground-truth-live-mcp`** keeps *"reach for the application MCP's token verbs for resolved values, not the flat Swift files — and remember a theme-varying token is a per-theme set"*, which still includes a prohibition.
- **`mcp-fallback`** is re-pointed to the installed package's iOS sources (`node_modules/@3fn/core/src/components/core/*/platforms/ios/`). I checked this against `package.json` `files`: the iOS `.swift` sources ship and `*Tests.swift` is excluded, so dropping `*Tests.swift` (subtraction-5) is correct.
- **`rebuild-product`** is verbatim.

**Pending re-sign (2026-09-29):** this row's signature is stale by construction. The charter unit changed when I corrected the "orphaned" sentence in my seat, so the canonicalHash moved. I will re-sign it after Thurgood's re-author pass, which changes the overlay again. I am not re-signing it now.

**Re-sign 2026-09-29, after Thurgood's re-author batch `dba93df5`: ASSENT, 3/3 surviving.** All 3 survive. `ground-truth-live-mcp`, as I corrected it in `67cd861d`, is re-pointed: *"DesignerPunk's un-themed base snapshots in the installed package (`node_modules/@3fn/core/dist/*.ios.swift`) are never read for your themed values. Reach for the application MCP's token verbs …"*. The "trimmed from your ambient set" clause is correctly removed (subtraction-1): it describes our generator's manifest, not a consumer obligation. `rebuild-product` and `mcp-fallback` are unchanged.

## `#what-you-dont-own`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:c3c70ca98b609f991f22359a186dd372685df660e45b86f364e29ef26ecd2591
renderedHash: sha256:463fe6517b19695411d61187d6aad4f2f97db3f15d20b031f0b057943fbb7368
date: 2026-09-29

**Ruling: ASSENT — 4/4 surviving.** All 4 survive. `not-own-1` to `not-own-3` are verbatim.
- **`jest-not-vitest`** (subtraction-1) is re-grounded to *"Your repo's own build and test tooling is the one to use — read it from the app's build setup before you run anything"*. Running a guessed or wrong test runner violates the rendered sentence, which is exactly the function the Jest line served in-repo.
- **Not items**: the in-repo no-iOS-build fact and the Commands pointer. Their function is re-pointed to `commands[ios-build-test]`.

## `#frontmatter:ambient.standingFacts[0]`

signer: kenya
disposition: no-consumer-counterpart
canonicalHash: sha256:5cee5aac01c8ad35bd478ee58d89b4e2bbeaf1156b8f32db98ca2adc56dbd252
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** The fact (*this repo has no .xcodeproj / Package.swift*) is false in a consumer, which IS an iOS app. Its guard against fabricating an in-repo build command is carried consumer-side by the re-pointed `commands[ios-build-test]` and `commands[product-screen-commands]`.

## `#frontmatter:routes.docs[completion-doc-guidance]`

signer: kenya
disposition: no-consumer-counterpart
canonicalHash: sha256:51510b1c872f9a6b0168508a41c2cdebe0b07a316461996cc546daa292e67405
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** This route leads to our completion-documentation law (the two-document workflow), which is `.kiro/specs/**` workflow as law under subtraction-4. A consumer's product repo has its own process.

## `#frontmatter:routes.docs[dev-workflow-detail]`

signer: kenya
disposition: no-consumer-counterpart
canonicalHash: sha256:d8dd2983f526c61544653aadb9ecf807db5d8fcdbf9411d7551285f519deaeb8
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** This route leads to our development-workflow law (subtraction-4), which has no consumer obligation.

## `#frontmatter:routes.docs[file-organization]`

signer: kenya
disposition: no-consumer-counterpart
canonicalHash: sha256:140957b75ae4911267ee722e655262d2db2dc32849ce04117540426a051b7f20
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** This route leads to our file-organization rules for this repo's tree (subtraction-4).

## `#frontmatter:routes.cues[8]`

signer: kenya
disposition: no-consumer-counterpart
canonicalHash: sha256:81797f185efbf2c90b57996a49a096936552de787d44eea9ebecfb9bdd947925
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** This route leads to the platform resource map, which maps this repo's cross-platform file paths. In a consumer, the component-source function is re-pointed through `knowledgeBases[ios-components]` to `node_modules/@3fn/core/src/…/ios/`.

## `#frontmatter:routes.cues[9]`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:d474af50c50fc7a0decdf30accaaf1313ae7d045b710435cf450f5d82008c4f4
renderedHash: sha256:72ae636acb0808bfd5f5a901b12631a65c7a28fac7dac5c94d817e167ea1db02
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** This route leads to the technology-stack reference, which describes DesignerPunk's own build tooling (subtraction-1). A consumer's stack is the app's own, and the rendered `#what-you-dont-own` points there.

**Re-sign 2026-09-29, after Thurgood's re-author batch `dba93df5`: ASSENT, `surviving: []`.** **Assent to the re-point.** The rendered cue is *"WHEN you need the platform-technology reference for products built with DesignerPunk (platform frameworks, web CSS standards, True Native architecture, versions) THEN use get_section (docs MCP)"*. I checked it against the doc's outline (`technology-stack`: Platform Technologies, Web CSS Standards, True Native Architecture, Build & Runtime Tooling). The narrowed `when` covers the three consumer-applicable sections and removes "build tooling" (subtraction-1), which is DesignerPunk's own. My phase-two no-consumer-counterpart missed that the platform sections apply to a consumer; this re-point is the better ruling.

## `#frontmatter:commands[platform-tokens]`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:bd33ad01f96b8e52831e10abdd7b33556a39d8ee99f9cccbd789170539199f67
renderedHash: sha256:a51ec7c296550cce090a6b0151ad0d45630bda089c84a0199526948e0ec64147
date: 2026-09-29

**Final re-sign 2026-09-29, after Thurgood's suffix fix `7e5af8be` and regen `8ea88c2f`: ASSENT to the re-point, `surviving: []`. My refusal is RESOLVED.**
- **The rendering now reads** *"regenerate your platform token output — including your theme Swift and product tokens — from your token source and `designerpunk.config.ts`: `npx designerpunk generate` (run from your product repo)"*.
- **The suffix is now true in a consumer**: "your product repo" is where the agent runs. I checked both consumer renderings (`cc/.claude/agents/kenya.md` and `kiro/.kiro/agents/kenya-prompt.md`), and neither contains "not this repo".
- **The re-pointed function is complete**: the in-repo `npm run generate:platform-tokens` becomes the consumer's `npx designerpunk generate`, which regenerates theme Swift and product tokens from the consumer's own config. That is where the theming surface materializes.
- **History**: no-consumer-counterpart, assented in phase two, then re-pointed by Thurgood's batch. I refused that version over the "(run from the consumer product repo, not this repo)" suffix, which contradicted itself in a consumer (`render.ts:97`). It is now fixed under the consumer profile.

## `#frontmatter:commands[swift-theme-types-tests]`

signer: kenya
disposition: no-consumer-counterpart
canonicalHash: sha256:605e8c609735c53c8cd9f10670209aaeca7ac534fc0b257dccdb474723448881
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** This is a repo-internal Jest suite over our Swift theme generator (subtraction-1), and the consumer has no counterpart.

## `#frontmatter:commands[build]`

signer: kenya
disposition: superseded-by
canonicalHash: sha256:99336e5fd14ab59d5a329a219a4356a521e2192a6091c4f3509e00175767eca5
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** `npm run build` is repo-internal (subtraction-1).

**Re-sign 2026-09-29, after Thurgood's re-author batch `dba93df5`: ASSENT, `surviving: []`.** **Assent to `superseded-by #what-you-dont-own`.** `npm run build` served one function, *build with this repo's tooling*. The destination's rendering carries it re-grounded: *"Your repo's own build and test tooling is the one to use — read it from the app's build setup before you run anything"*. This is a better ruling than my phase-two no-consumer-counterpart.

## `#frontmatter:commands[audit-tokens]`

signer: kenya
disposition: no-consumer-counterpart
canonicalHash: sha256:9f9e4c40508ffed400f8e11515773dfb30670cfbc11d54657f6f937ef57e0b5f
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** `npm run audit:tokens` is repo-internal (subtraction-1).

## `#frontmatter:knowledgeBases[ios-tests]`

signer: kenya
disposition: no-consumer-counterpart
canonicalHash: sha256:9e343b0a30ce8c0186fd29b7d4f347d9e951ef4014e0d24a6c3ee64be9b2b11e
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** The test sources do not ship: `package.json` `files` has `!src/components/core/**/platforms/ios/*Tests.swift`. I checked this, and the no-consumer-counterpart premise holds.

## `#frontmatter:writeScope[docs/specs/**]`

signer: kenya
disposition: superseded-by
canonicalHash: sha256:bc10d943438a0fa1a02e86c698d39f9b7882a42838f341886c89f3021c0e416c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** `docs/specs/**` is our summary-doc tier (subtraction-4). The consumer's spec area is covered by the re-pointed `writeScope[.kiro/specs/**]` → `specs/**`.

**Re-sign 2026-09-29, after Thurgood's re-author batch `dba93df5`: ASSENT, `surviving: []`.** **Assent to `superseded-by writeScope[.kiro/specs/**]`.** The consumer's spec-writing area is the re-pointed `specs/**`. Our separate summary-doc tier folds into it; a consumer has no two-tier split.

## `#frontmatter:ambient.groundTruthManifest.trims[dist/ios/DesignTokens.ios.swift]`

signer: kenya
disposition: superseded-by
canonicalHash: sha256:764ca8ea89091bad2a0bd73aa460e2a3d31379be3cf60413ac6edeb8b5561ab7
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Final re-sign 2026-09-29: ASSENT to `superseded-by #how-to-use-designerpunk-tokens-on-ios`, `surviving: []`.**
- **Why it went stale**: the `canonicalHash` moved because of my own charter fix (`65563985`). The trim's `cue.negative` now reads *"… it is this repo's un-themed base output (written by the in-repo generate …) and is due to stop shipping; … for themed values … a consumer reads its own generate outputDir"*, no longer "ORPHANED and stale".
- **The disposition still holds**: the trim does not render in a consumer. Its function (do not read the base snapshot, query the MCP, a theme-varying token is a per-theme set) is carried by the destination unit's rendering: *"never read DesignerPunk's un-themed base snapshots in the installed package (`node_modules/@3fn/core/dist/*.ios.swift`); query the application MCP … Theme-varying tokens are a per-theme SET"*.
- **Valve-1 blind spot**: the `renderedHash` is the empty-piece hash, so I signed on the text after reading the rendered Ground truth section directly. Only the ComponentTokens trim renders there.
- **Still conditional on Task 16.3**: this is true from the `dist/ios/**` negation's merge, as stated by the dependency comment above the row. Until then `node_modules/@3fn/core/dist/ios/DesignTokens.ios.swift` ships, and the body glob `dist/*.ios.swift` does not match that subdirectory.

## `#frontmatter:ambient.groundTruthManifest.trims[dist/ComponentTokens.ios.swift]`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:ffffe14a86f02d87c41c32570db8966ca594fbe0785ae8174657f164f8977ace
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**REFUSED: `should-re-point`.** This entry's no-consumer-counterpart premise is false. `npm pack --dry-run` on the current tree lists `dist/DesignTokens.ios.swift`, `dist/ios/DesignTokens.ios.swift` and `dist/ComponentTokens.ios.swift` in the published tarball, because the `files` glob is `dist/**/*.{js,d.ts,json,css,swift,kt}`.
- **The trap exists in every consumer.** The snapshots land at `node_modules/@3fn/core/dist/…`. `dist/ios/DesignTokens.ios.swift` has 0 `Theme` references, so it is the flat, un-themed surface this manifest exists to keep me off.
- **The consumer's real Swift is elsewhere.** `npx designerpunk generate` writes the consumer's own Swift to the consumer's `outputDir`, so the shipped copies are pure trap, not a build target.
- **Should re-point to**: the trim, re-grounded at `node_modules/@3fn/core/dist/…` (and the verdict with it), keeping its MCP replacement cue.
- **Why it's mine to refuse**: this is the frontmatter home the body units point to (*"see the Ground truth section"*). The body rows' in-unit assents keep the positive MCP directive but no longer say where the trap is.

**Re-sign 2026-09-29, after Thurgood's re-author batch `dba93df5`: ASSENT, `surviving: []`.** **My refusal is RESOLVED: I assent to the re-point.** The rendered Ground truth section reads *"do NOT read DesignerPunk's base component-token snapshot in the installed package, node_modules/@3fn/core/dist/ComponentTokens.ios.swift — it is the un-themed base, never the source for your themed values; your own generated output lives in your configured output directory — use `get_component_full`"*. That is exactly the re-point I asked for, and the file stays in the package under Ada's keep branch. The removal of *"a stale generated artifact, not the source of truth"* (subtraction-3) is replaced by the truer *"un-themed base, never the source for your themed values"*.
- **Valve-1 blind spot**: the `renderedHash` is the empty-piece hash, so I signed on the text read directly.

## `#frontmatter:ambient.groundTruthManifest.verdict`

signer: kenya
disposition: retained
canonicalHash: sha256:645f03d4ab6f8fcd2badea6765bf8a71420de5c194af2b3172e3fc3afd02d12c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**REFUSED: `should-re-point`.** This entry's no-consumer-counterpart premise is false. `npm pack --dry-run` on the current tree lists `dist/DesignTokens.ios.swift`, `dist/ios/DesignTokens.ios.swift` and `dist/ComponentTokens.ios.swift` in the published tarball, because the `files` glob is `dist/**/*.{js,d.ts,json,css,swift,kt}`.
- **The trap exists in every consumer.** The snapshots land at `node_modules/@3fn/core/dist/…`. `dist/ios/DesignTokens.ios.swift` has 0 `Theme` references, so it is the flat, un-themed surface this manifest exists to keep me off.
- **The consumer's real Swift is elsewhere.** `npx designerpunk generate` writes the consumer's own Swift to the consumer's `outputDir`, so the shipped copies are pure trap, not a build target.
- **Should re-point to**: the trim, re-grounded at `node_modules/@3fn/core/dist/…` (and the verdict with it), keeping its MCP replacement cue.
- **Why it's mine to refuse**: this is the frontmatter home the body units point to (*"see the Ground truth section"*). The body rows' in-unit assents keep the positive MCP directive but no longer say where the trap is.

**Re-sign 2026-09-29, after Thurgood's re-author batch `dba93df5`: ASSENT, `surviving: []`.** **My refusal is RESOLVED: I assent to `retained`.** The verdict value `none-trim-stale-snapshots` is still true in a consumer: the manifest still trims a shipped stale snapshot (ComponentTokens, re-pointed). My refusal was against the no-consumer-counterpart premise, which is gone.

## Signing run summary (2026-09-29, phase two)

- **Commits** (branch `task/123-u2b-fr2-kenya` from `60b0fdb5`; not pushed):
  - `eabf2131`: 23 assents.
  - `45a57b5a`: refusal, `trims[dist/ios/DesignTokens.ios.swift]`.
  - `0937a0eb`: refusal, `trims[dist/ComponentTokens.ios.swift]`.
  - `f9ee7ec7`: refusal, `groundTruthManifest.verdict`.
  - This summary is in its own commit after those.
- **Rows signed**: 26 of 26.
- **Assented, routed body rows (11)**: every row assents with its full confirmed set surviving, 55 of 55 items.

  | Row | Surviving items |
  |---|---|
  | `#identity` | 7/7 |
  | `#ios-theming-spec-094` | 5/5 |
  | `#out-of-scope` | 7/7 |
  | `#blocking-exception-direct-escalation-to-peter` | 3/3 |
  | `#step-2-set-up-the-screen` | 3/3 |
  | `#with-peter` | 4/4 (`human-4` by in-unit entailment from `human-3`) |
  | `#how-to-use-designerpunk-tokens-on-ios` | 6/6 |
  | `#platform-currency-expectations` | 5/5 |
  | `#ios-specific-guidance` | 7/7 |
  | `#mcp-practice-notes` | 3/3 |
  | `#what-you-dont-own` | 4/4 (`jest-not-vitest` re-grounded) |

- **Assented no-consumer-counterpart rows (12)**, all with `surviving: []`:
  - `standingFacts[0]`
  - `routes.docs` completion-doc-guidance, dev-workflow-detail and file-organization
  - `routes.cues[8]` and `routes.cues[9]`
  - `commands` platform-tokens, swift-theme-types-tests, build and audit-tokens
  - `knowledgeBases[ios-tests]`, whose premise I verified: `*Tests.swift` is excluded from the package's `files`
  - `writeScope[docs/specs/**]`
- **Refused (3), `should-re-point`**:
  - `ambient.groundTruthManifest.verdict`
  - `trims[dist/ios/DesignTokens.ios.swift]`
  - `trims[dist/ComponentTokens.ios.swift]`

  **Reason**: the stale, un-themed Swift snapshots ship in the package (`npm pack --dry-run` lists all three), so the trap exists in every consumer at `node_modules/@3fn/core/dist/`. The trims should re-point there. The resolution is Thurgood's to author; I will re-sign after it.
- **Widenings**: none. For the referent candidates:
  - `blocking-exception` carries its referent in the same rendering.
  - `follow-workflow` and `jest-not-vitest` are known false positives.
- **Residuals**:
  1. **Full survival on every routed row.** All 11 routed rows assent with nothing lost. That is the pattern the full-survival assent signal instrument exists to sample, so Stacy's audit should spot-check this set.
  2. **Body assents on the ground-truth units.** Four of them credit the item from the surviving positive MCP directive, and the explicit "where the trap sits" warning is gone from those units: `#ios-theming-spec-094`, `#step-2-set-up-the-screen`, `#how-to-use-designerpunk-tokens-on-ios` and `#ios-specific-guidance`. If Thurgood's re-author also restores the warning in the body, those renderedHashes change and I re-sign them.
  3. **Out of my seat (Ada or Thurgood)**: the package shipping a stale, orphaned `dist/ios/DesignTokens.ios.swift` (0 `Theme` references, regenerated 2026-09-29) is itself a distribution defect. The better fix may be not shipping it.

## Re-sign run summary (2026-09-29)

- **Commits** (branch `task/123-u2b-fr3-kenya` from `dba93df5`; not pushed):
  - `62464b8d`: 11 assents.
  - `cbee28de`: 1 refusal.
  - This summary is in its own commit after those.
- **Acts**: 12 of 12 from sheet § 4.
- **Assented, body (5)**, all at full sets:

  | Row | Surviving items |
  |---|---|
  | `#ios-theming-spec-094` | 5/5 |
  | `#step-2-set-up-the-screen` | 3/3 |
  | `#how-to-use-designerpunk-tokens-on-ios` | 6/6 |
  | `#ios-specific-guidance` | 7/7 |
  | `#mcp-practice-notes` | 3/3 |

  The four snapshot-warning gaps I disclosed in phase two are closed: the warning is restored and re-pointed to `node_modules/@3fn/core/dist/*.ios.swift`.
- **Assented, frontmatter (6)**, all with `surviving: []`:
  - `trims[dist/ios/DesignTokens.ios.swift]`: `superseded-by`, which resolves my refusal. The assent is conditional on Task 16.3's `dist/ios/**` negation.
  - `trims[dist/ComponentTokens.ios.swift]`: re-pointed, which resolves my refusal.
  - `groundTruthManifest.verdict`: `retained`, which resolves my refusal.
  - `commands[build]`: `superseded-by #what-you-dont-own`.
  - `writeScope[docs/specs/**]`: `superseded-by writeScope[.kiro/specs/**]`.
  - `routes.cues[9]`: re-pointed, narrowed to the doc's consumer-applicable sections.
  - The last three are better rulings than my phase-two no-consumer-counterpart.
- **Refused (1)**: `commands[platform-tokens]`, `should-re-point`. The value is right, but the rendered suffix *"(run from the consumer product repo, not this repo)"* (`render.ts:97`) contradicts itself in a consumer. The same suffix is on `commands[ios-build-test]`, and probably on every agent's consumer-repo commands.
- **Sweep**: after the refusal commit, `kenya.*` has 0 findings.
- **Residuals**:
  1. **Trim signatures are signed on the text.** The two trim rows' `renderedHash` is the empty-piece hash (the known blind spot), so I read the rendered Ground truth section directly.
  2. **Until Task 16.3 merges**, `node_modules/@3fn/core/dist/ios/DesignTokens.ios.swift` still ships, and the body glob `dist/*.ios.swift` does not match that subdirectory. The DesignTokens-trim assent is conditional on 16.3.
  3. **My charter's trim `cue.negative` still says "ORPHANED and stale (pre-Spec-094 …)"**, which is false. It doesn't render in a consumer (superseded), but the fix is my seat's and would change the entry's `canonicalHash`, so the orchestrator should sequence it.

## Final re-sign (2026-09-29)

- **Commit**: the commit that adds this section, on `task/123-u2b-fr4-kenya` from `7fc01fa2` (not pushed).
- **Acts**: 2 of 2 from sheet § 4, both assent with `surviving: []`:
  - `commands[platform-tokens]`: assent to the re-point, which RESOLVES my second refusal now that Thurgood's suffix fix renders "(run from your product repo)".
  - `ambient.groundTruthManifest.trims[dist/ios/DesignTokens.ios.swift]`: assent to `superseded-by`, re-signed at the new `canonicalHash` after my own `cue.negative` fix. It is signed on the text (Valve-1 empty-hash blind spot).
- **Standing refusals in `kenya.*`**: none.
- **Residual**: the DesignTokens-trim assent remains conditional on Task 16.3's `dist/ios/**` negation.

