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

## `#ios-theming-spec-094`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:ced2085af0c675dbb3e27cc0f93bd50feef8f21a31b28cec74f2034781da4d31
renderedHash: sha256:5a4182715e22fcdc01f4bc2861851365d2de7de1bcc3ebff38ba78e73e6b95d3
date: 2026-09-29

**Ruling: ASSENT — 5/5 surviving.** All 5 survive. `theming-1` to `theming-4` are verbatim. In a consumer, `theming-1` is *more* true than in-repo, because the theme surface materializes consumer-side via `npx designerpunk generate`.
- **`theming-5`** survives on the rendered directive *"query the application MCP for the resolved value, formula, per-platform (Swift) name, and the per-theme set"*. Sourcing a value or name from a Swift file violates that directive, so the item's violation is still a violation of this unit's rendering (5e, in-unit entailment).
- **Lost**: the explicit warning about *where* the stale snapshots sit. It is a live trap in consumers, because the package ships them (see the three refused ground-truth rows). No credit is taken for it here.

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
renderedHash: sha256:6e79e5caa76fd6e4e5137e775cdcbbff378068f6c5d2455902dcd0c280784aa1
date: 2026-09-29

**Ruling: ASSENT — 3/3 surviving.** All 3 survive.
- **`setup-2`** keeps *"Bring in DesignerPunk tokens by querying the application MCP for the resolved values"*. Reading values from a snapshot instead violates it.
- **Removed**: the parenthetical *"(never read the stale `dist/*.ios.swift` snapshots …)"*. The item's function is entailed in-unit; the trap's location is the refused ground-truth rows' matter, and no credit is taken for it here.

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
renderedHash: sha256:4bc02b80e210ed0ec15e29779c38ce4dd1d5eb6a036046f95d18f0d1fa80de56
date: 2026-09-29

**Ruling: ASSENT — 6/6 surviving.** All 6 survive. `tokens-1` to `tokens-4` and `theme-set` are verbatim.
- **`ground-truth-live`** is reduced to *"Ground truth for token values is LIVE — query the application MCP for the resolved value, formula, and per-platform names."* Sourcing values or names from a file violates it, so the item is entailed in-unit.
- **Removed**: the snapshot-location warning, as in `#step-2-set-up-the-screen`. No credit is taken for it.

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
renderedHash: sha256:fad6db1ade17faed74513e497e982504f88bb8bd5d174b2c041ae92e2a26aeeb
date: 2026-09-29

**Ruling: ASSENT — 7/7 surviving.** All 7 survive.
- **`native-2`** keeps *"(values queried live via the application MCP)"*. Taking values from a Swift snapshot violates it.
- **Removed**: *"never the stale `dist/*.ios.swift` snapshots"*, the same trap-location warning. No credit is taken for it.

## `#mcp-practice-notes`

signer: kenya
disposition: re-pointed
canonicalHash: sha256:752619afed54f31fc54cde7129c2a268be95e23e3fc5752c4f619298706cf49f
renderedHash: sha256:82e60799735dc8dcc10a5aea1c3b5a89448adc46d80054d1740b63921fece989
date: 2026-09-29

**Ruling: ASSENT — 3/3 surviving.** All 3 survive.
- **`ground-truth-live-mcp`** keeps *"reach for the application MCP's token verbs for resolved values, not the flat Swift files — and remember a theme-varying token is a per-theme set"*, which still includes a prohibition.
- **`mcp-fallback`** is re-pointed to the installed package's iOS sources (`node_modules/@3fn/core/src/components/core/*/platforms/ios/`). I checked this against `package.json` `files`: the iOS `.swift` sources ship and `*Tests.swift` is excluded, so dropping `*Tests.swift` (subtraction-5) is correct.
- **`rebuild-product`** is verbatim.

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
disposition: no-consumer-counterpart
canonicalHash: sha256:d474af50c50fc7a0decdf30accaaf1313ae7d045b710435cf450f5d82008c4f4
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** This route leads to the technology-stack reference, which describes DesignerPunk's own build tooling (subtraction-1). A consumer's stack is the app's own, and the rendered `#what-you-dont-own` points there.

## `#frontmatter:commands[platform-tokens]`

signer: kenya
disposition: no-consumer-counterpart
canonicalHash: sha256:bd33ad01f96b8e52831e10abdd7b33556a39d8ee99f9cccbd789170539199f67
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** `npm run generate:platform-tokens` is a repo-internal script (subtraction-1). The consumer equivalent, `npx designerpunk generate`, is named in the re-pointed `commands[product-screen-commands]`.

## `#frontmatter:commands[swift-theme-types-tests]`

signer: kenya
disposition: no-consumer-counterpart
canonicalHash: sha256:605e8c609735c53c8cd9f10670209aaeca7ac534fc0b257dccdb474723448881
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** This is a repo-internal Jest suite over our Swift theme generator (subtraction-1), and the consumer has no counterpart.

## `#frontmatter:commands[build]`

signer: kenya
disposition: no-consumer-counterpart
canonicalHash: sha256:99336e5fd14ab59d5a329a219a4356a521e2192a6091c4f3509e00175767eca5
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** `npm run build` is repo-internal (subtraction-1).

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
disposition: no-consumer-counterpart
canonicalHash: sha256:bc10d943438a0fa1a02e86c698d39f9b7882a42838f341886c89f3021c0e416c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
date: 2026-09-29

**Ruling: ASSENT — `surviving: []` (no-consumer-counterpart confirmed).** `docs/specs/**` is our summary-doc tier (subtraction-4). The consumer's spec area is covered by the re-pointed `writeScope[.kiro/specs/**]` → `specs/**`.
