# Operative-set confirmation — `data` (C1, owner seat)

**Record**: `canonical/operative-sets/data.yaml` (drafted by Thurgood at 15.4; confirmed and corrected here)
**Source**: `canonical/agents/data.md`
**Owner**: Data · **Profile author**: Thurgood · **Confirmer**: **Data**. Under C1 the owner confirms, because the owner is not the profile author (Req 11.6.5d; design C16).
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase one (C1 confirmation). The write grant is Task 15's row.
**Scope**: all 34 body units of the charter. Signing is phase two.

**Format**: the convention Stacy and Lina use. Each unit gets a `` ## `#anchor` `` heading, then `confirmer:`, `canonicalHash:`, `items:` (the record's ids, in record order, or `none`) and `date:`, then the ruling.

**The criterion applied throughout (5c)**: an item is operative if and only if a consumer implementation could violate it. Headings are labels. A `**Label**:` prefix that states the item's trigger stays inside the item's text. **The line I drew for this charter**:
- A statement that tells the implementation what to do, where to read a value, or what scope to read it in is operative.
- A statement that only describes what the token generator emits (file paths, object shapes, naming choices) is inventory, and not an item. The screen code I write can be *wrong* about such facts but cannot *breach* them. Being wrong about them shows up as a compile error, not a violated norm.

**Record edits I made as confirmer** (same commit as this note; each is a reviewed diff):
- **Truncations restored** (prefix truncations, which the verbatim check cannot catch; C16, S-D2-A1): `#identity` `domain`; `#with-leonardo-primary` `handoff-tiers`; `#android-skills-official-google-patterns` `skills-use-for` and `skills-use-dp-for`. `domain` kind `member` → `obligation`.
- **Added**: `#identity` `precision-and-care`; `#the-implement-vs-direct-distinction` `direct-raise` and `advise-raise`; `#operational-mode-screen-implementation:preamble` `workflow-trigger` (0 → 1); `#how-to-use-designerpunk-tokens-on-android` `per-theme-set`.
- **Removed**: `#android-theming-spec-094` `theming-1` and `theming-4`; `#product-tokens-spec-108109` `product-tokens-1`, `product-tokens-2` and `product-tokens-4`.
- **Totals**: 134 drafted → 134 confirmed (+5 added, −5 removed; 4 texts restored). One unit is ruled zero: `#operational-mode-platform-expertise:preamble`.
- **Verified**: all 34 `canonicalHash` values match the unit bytes (`partition(splitFrontmatter(src).body)`), and every item `text` is a verbatim substring of its unit.

## `#identity`

confirmer: data
canonicalHash: sha256:3e79e0b228e2534acc10dede5f8c1a2276520d1b331d6d3077810b8bc8b392ac
items: role, precision-and-care, domain, leonardo-primary, system-through-leonardo, human-decides, partner
date: 2026-09-29

**Ruling: 6 → 7 items; one draft item was materially wrong.** `domain` was a prefix truncation (`Your domain:`): the label kept, the domain itself dropped, so any rendering keeping the two words would have been credited. Restored to the full sentence; kind `member` → `obligation` (it is not an enumeration member). Added `precision-and-care`: the sentence sets the implementation standard (every token reference correct, every behavioral contract honored), which an implementation can violate. Not items: the Commander Data characterisation, "Data, the agent, carries…", and "You build alongside…" (orienting prose).

## `#in-scope`

confirmer: data
canonicalHash: sha256:9838f330a66c772bc46c6d79a597268682348899eb6b2a2a5090f250c195d5c3
items: scope-1, scope-2, scope-3, scope-4, scope-5, scope-6, scope-7, scope-8
date: 2026-09-29

**Ruling: CONFIRMED at 8 items, as drafted.** Each bullet claims a responsibility an implementation can drop or exceed. `scope-2` also fixes the consumption path (static via `DesignTokens`, theme-varying via `Local{Abbreviation}Theme.current`).

## `#android-theming-spec-094`

confirmer: data
canonicalHash: sha256:7818e0ca9a1252c1baacf77ce2e9650bb50377b5c2e07cc07492b48f50ac9122
items: theming-2, theming-3, theming-5, theming-6
date: 2026-09-29

**Ruling: 6 → 4 items.** Removed `theming-1` ("Generated Kotlin output includes: …"), an inventory statement of what the generator emits; nothing in it directs the implementation. Removed `theming-4` (`{Abbreviation}` uppercase), a description of the generator's naming choice and its rationale; code that writes `Dp` is a compile error, not a breached norm. Kept `theming-2`, `theming-3` (directives), `theming-5` ("no CompositionLocal needed" directs where static tokens are read) and `theming-6` (ground truth live).

## `#product-tokens-spec-108109`

confirmer: data
canonicalHash: sha256:ff4aac618c5f0fdba25def08eb62d0ba2089e70c5afde72ea95f28371bd8e89e
items: product-tokens-3, product-tokens-5, product-tokens-6
date: 2026-09-29

**Ruling: 6 → 3 items.** Removed `product-tokens-1` (the generated file path and package, a repo-specific location fact), `product-tokens-2` (the generated shape of static tokens) and `product-tokens-4` (how generated ref tokens are written). All three describe generator output that I never author and cannot violate. Kept `product-tokens-3` ("must be read inside composition scope"), `product-tokens-5` (query route) and `product-tokens-6` (authoring location and governance).

## `#out-of-scope`

confirmer: data
canonicalHash: sha256:d7695f214a8af5a8be83c50e90c9a403bb22261cfb8ee4d15d85cfcb5d0d3d3c
items: out-1, out-2, out-3, out-4, out-5, out-6, out-7
date: 2026-09-29

**Ruling: CONFIRMED at 7 items, as drafted.** These are boundary obligations: deciding any of them myself violates the list.

## `#blocking-exception-direct-escalation-to-peter`

confirmer: data
canonicalHash: sha256:c5cf701217d1de46ef107456928e2f87ca8cd4e4fa7a77bad68d25c84ab52875
items: blocking-direct, blocking-exception, blocking-when-in-doubt
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.** "This bypasses Leonardo because…" and "Most issues benefit from Leonardo's context." are rationale, not items.

## `#the-implement-vs-direct-distinction`

confirmer: data
canonicalHash: sha256:a756a96bcc26c0d57b65600164ccf831fad599c93f5871e690b6c02071f13931
items: implement-not-direct, direct-raise, advise-raise
date: 2026-09-29

**Ruling: 1 → 3 items.** Added `direct-raise` and `advise-raise`. They are the only statements in this unit of what to DO when I would otherwise direct ("Raise to Leonardo, don't decide unilaterally"; "Raise to Leonardo with rationale"). Under Req 11.6.5e they must be creditable from this unit's own rendering. The two `**Implement**` bullets are illustrations ("→ Your job") and are not items. The `**Label**:` prefix is kept inside the text because it states the trigger.

## `#operational-mode-screen-implementation:preamble`

confirmer: data
canonicalHash: sha256:1f5a573fb7084bb223714515f458671f62fdd3c789d696aa3491cd58e85453ef
items: workflow-trigger
date: 2026-09-29

**Ruling: 0 → 1 item; the draft's zero was wrong.** "When Leonardo provides a screen specification, follow this workflow:" carries a trigger and an imperative. It binds Steps 1–5 to the moment a spec arrives, and a rendering that keeps the steps but drops it loses when they apply (the same reasoning as Lina's scaffolding preamble). The trailing colon is verbatim and can only make matching under-count.

## `#step-1-review-the-specification`

confirmer: data
canonicalHash: sha256:144d59eff325216ef62e5f9896175907ef37e99b17d39daad5d5359bc6fb968b
items: review-1, review-2, review-3
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#step-2-set-up-the-screen`

confirmer: data
canonicalHash: sha256:61029dcbeeee35dc3ba5b50c4baa20671d2a1208c38a037f5de9f2a2cd4a4dfe
items: setup-1, setup-2, setup-3
date: 2026-09-29

**Ruling: CONFIRMED as drafted.** `setup-3` still stands in the consumer: the Android implementations ship in the package.

## `#step-3-implement`

confirmer: data
canonicalHash: sha256:9d0052ab5c5eeb94cc37d81827252ae799a4428b70570b548b5a78e17ef66b3e
items: implement-1, implement-2, implement-3, implement-4, implement-5
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#step-4-test`

confirmer: data
canonicalHash: sha256:b9460aaf57c13b49e0142d6e8d4b133937081f0c5a63768563994b667c1f7c40
items: test-1, test-2, test-3, test-4
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#step-5-report-back`

confirmer: data
canonicalHash: sha256:3fd4f918e451b2c7be28055b86c94e11f6c25a4f6d53e17518b07fe85850e1c1
items: report-1, report-2, report-3
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#operational-mode-platform-expertise:preamble`

confirmer: data
canonicalHash: sha256:719aaec0b53328142eba30ead5e0158af67542d821fdc8242047227a0992b8f6
items: none
date: 2026-09-29

**Ruling: INAPPLICABLE, 0 items, declared (5d).** "When Leonardo or Peter asks about Android capabilities or constraints:" is a lead-in with no imperative. Unlike the screen-implementation preamble it says "when", never "do". Naming who asks is scoping, not a norm: answering Kenya's Android question would not violate it. The obligations live in the two child units.

## `#what-you-provide`

confirmer: data
canonicalHash: sha256:e7555f67cc936958c6316a5a3526e2c184c814890dd3963f2278d9317a14b8b5
items: provide-1, provide-2, provide-3, provide-4, provide-5
date: 2026-09-29

**Ruling: CONFIRMED as drafted.** Each member is content I owe when asked; omitting one is a violation.

## `#how-you-provide-it`

confirmer: data
canonicalHash: sha256:d84ec28766936dc3daa22a537ce3f74f1a5a8537c52b8ab7502ef7328b30e198
items: how-1, how-2, how-3, how-4
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#with-leonardo-primary`

confirmer: data
canonicalHash: sha256:713d0f8133fad1dc430da9ec9151926a6903f2ce1449f81a4eca9591d5bd0df0
items: leonardo-1, leonardo-2, leonardo-3, leonardo-4, leonardo-5, leonardo-6, handoff-tiers, capture-decisions
date: 2026-09-29

**Ruling: CONFIRMED at 8 items; one text was materially wrong.** `handoff-tiers` was a prefix truncation ("Communication follows the Product Handoff Protocol:"): it kept the label and dropped the tier mapping, which is the operative part (Tier 3 escalations are routed through Leonardo to Thurgood). Restored to the full sentence.

## `#with-sibling-platform-agents`

confirmer: data
canonicalHash: sha256:5a16c1280955dd525111840ecfc8e4968d2eef118741848be5497b56c1c5d853
items: siblings-1, siblings-2, siblings-3
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#with-stacy-product-governance`

confirmer: data
canonicalHash: sha256:fff1cac152955adc9e5402bfb23639047e058764beaa4cb6d642498bcf78f4b6
items: stacy-1, stacy-2, stacy-3
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#with-peter`

confirmer: data
canonicalHash: sha256:af2055100e2c2f76d1222b5ac6b240afa08096dc1b7d193363f7d73477ed6921
items: human-1, human-2, human-3, human-4
date: 2026-09-29

**Ruling: CONFIRMED as drafted.** `human-1` is kept because it establishes a direct channel that I would violate by deflecting Peter's feedback to Leonardo.

## `#how-to-use-designerpunk-tokens-on-android`

confirmer: data
canonicalHash: sha256:14fa4d5367f385a948746af6f26587002fc2b27522af0fb2588b09a1c901e22e
items: tokens-1, tokens-2, tokens-3, tokens-4, ground-truth-live, per-theme-set
date: 2026-09-29

**Ruling: 5 → 6 items.** Added `per-theme-set`. The draft's `ground-truth-live` stopped at "per-platform names.", which dropped the paragraph's second sentence. That sentence is the anti-flattening guard (K-D2: a theme-varying token is a per-theme SET), and it is operative on its own, so it becomes a separate item rather than lengthening `ground-truth-live`.

## `#token-reference-pattern`

confirmer: data
canonicalHash: sha256:a924c99e8ea1db803c75f145df8e6ea87003cf506421145331b11369285b2f09
items: token-doc-map, verify-ambiguous
date: 2026-09-29

**Ruling: CONFIRMED as drafted.** "The architect should have specified tokens in the screen spec" is an expectation of Leonardo, not an item for me.

## `#platform-currency-expectations`

confirmer: data
canonicalHash: sha256:325c789e1205fbac6f672a1a90b6823cbbf970638578aaa328b39800dc8c3db6
items: currency-1, currency-2, currency-3, currency-4, currency-5
date: 2026-09-29

**Ruling: CONFIRMED as drafted.** The lead-in "Be honest about this:" is carried by the five bullets.

## `#platform-reference-pointers`

confirmer: data
canonicalHash: sha256:7e02acf5b5fd8127915885f1c337662185c1356d144d1ad0af72aacdf67d2ac5
items: refs-1, refs-2, refs-3, refs-4, refs-own-platform
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#android-specific-guidance:preamble`

confirmer: data
canonicalHash: sha256:afaa161290815fb26ca8098c8f1a6ca2bb55dfafb4189e5d7fa76818f65054aa
items: native-1, native-2, native-3, native-4, native-5, native-6, native-7
date: 2026-09-29

**Ruling: CONFIRMED as drafted.** Each bullet fixes the Compose mechanism used for its concern. `native-7` binds the minimum version to Core Goals rather than a choice of my own.

## `#android-skills-official-google-patterns`

confirmer: data
canonicalHash: sha256:fc2f269aa9ccf842e7ed3da61969c7d554fa4780ff895361f05752b7d2e0a7ed
items: skills-1, skills-2, skills-3, skills-4, skills-5, skills-6, skills-7, skills-8, skills-use-for, skills-use-dp-for
date: 2026-09-29

**Ruling: CONFIRMED at 10 items; two texts were materially wrong.** `skills-use-for` ("Use Android Skills for:") and `skills-use-dp-for` ("Use DesignerPunk for:") were prefix truncations: labels with the whole allocation dropped. Restored to their full sentences. "Four official Android skills are available…" and "They cover… where LLMs commonly underperform" are inventory and rationale, not items.

## `#mcp-practice-notes`

confirmer: data
canonicalHash: sha256:4e297f3aa7500dbce86a97abb77a54f907cbe25dfb3ec77492eeea5c4a29d27c
items: ground-truth-live-mcp, rebuild-product, mcp-fallback
date: 2026-09-29

**Ruling: CONFIRMED as drafted.** The server inventory ("You consume all three MCP servers…") and "Health states: …" are facts, not items.

## `#collaboration-standards:preamble`

confirmer: data
canonicalHash: sha256:3affabec49417d9644d83ab0c5c3552a80a5173d5d5305aa9b6828fcb2631f34
items: apply-aicp
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#counter-arguments-are-mandatory`

confirmer: data
canonicalHash: sha256:fd97868cd07b8de691ee775399a481b913097657369aa1289c3ffdf0e31a8c34
items: counter-provide, counter-fold-back
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#candid-over-comfortable`

confirmer: data
canonicalHash: sha256:5e64ee7650fb85aa8a8e56188bd531a98b52f1b5261dd8c0a511543419194ee9
items: candid
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#bias-self-monitoring`

confirmer: data
canonicalHash: sha256:953d6577a2d696bbe08753027ca89664b1c56eecc4de8106e83c96f8bea8395c
items: bias-watch, bias-name
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#ask-if-unsure`

confirmer: data
canonicalHash: sha256:917cd47321c70da1aba278a0d88330a03ada9de290c6cee2d44a0a465e7c7d00
items: ask-if-unsure
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#what-you-own`

confirmer: data
canonicalHash: sha256:34231657385f21495c3545ab60c3cb4769f6f2bffb2a7bbf0c98e496050b0cd5
items: own-1, own-2, own-3, own-4
date: 2026-09-29

**Ruling: CONFIRMED as drafted.**

## `#what-you-dont-own`

confirmer: data
canonicalHash: sha256:ee7dd121bbf0cb283d8dbb38f87c8f4b67b7dc492f8ab2236170a0909ec0c288
items: not-own-1, not-own-2, not-own-3, jest-not-vitest
date: 2026-09-29

**Ruling: CONFIRMED as drafted.** The pointer to the Commands section is orienting. `jest-not-vitest` is judged on my charter's text; how the consumer rendering disposes it is phase two.

## Confirmation run summary

- **Commit**: the commit that adds this note (Agent: data). The SHA is in the handback.
- **Units confirmed**: 34 of 34. Totals: 134 items drafted → 134 confirmed.
- **Items added** (5):
  - `#identity` `precision-and-care`
  - `#the-implement-vs-direct-distinction` `direct-raise`, `advise-raise`
  - `#operational-mode-screen-implementation:preamble` `workflow-trigger`
  - `#how-to-use-designerpunk-tokens-on-android` `per-theme-set`
- **Items removed** (5):
  - `#android-theming-spec-094` `theming-1`, `theming-4`
  - `#product-tokens-spec-108109` `product-tokens-1`, `product-tokens-2`, `product-tokens-4`
- **Texts restored from truncation** (4; ids unchanged): `#identity` `domain`, `#with-leonardo-primary` `handoff-tiers`, `#android-skills-official-google-patterns` `skills-use-for` and `skills-use-dp-for`.
- **Units ruled zero**: `#operational-mode-platform-expertise:preamble` (INAPPLICABLE, declared).
- **Where the draft was materially wrong**:
  - Four prefix truncations kept the label and dropped the operative content, so a rendering keeping only the label words would have been credited.
  - The screen-implementation preamble was drafted zero but carries an imperative.
  - The per-theme-SET sentence, the anti-flattening guard, was left out of `ground-truth-live`.
- **Residual**:
  - The five generator-description items I removed are knowledge I use to write correct Compose code: the package to import from, the `{Name}Themes` instances, the `DP` spelling. If the consumer rendering drops them, no floor finding fires. That is the direct cost of the 5c line I drew. A reviewer who reads 5c as "code can contradict it" would keep them. This is a fork on the criterion's reading; I made the call for this record, and the other reading remains defensible.
