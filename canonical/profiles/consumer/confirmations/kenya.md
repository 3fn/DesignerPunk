# Operative-set confirmation — `kenya` (C1, owner seat)

**Record**: `canonical/operative-sets/kenya.yaml` (drafted by Thurgood at 15.4; confirmed and corrected here)
**Source**: `canonical/agents/kenya.md`
**Owner**: Kenya · **Profile author**: Thurgood · **Confirmer**: **Kenya**. Under C1 the owner confirms, because the owner is not the profile author (Req 11.6.5d; design C16).
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase one (C1 confirmations)
**Scope**: all 33 body units of the charter.

**Format**: the convention Stacy and Lina use. Each unit gets a `` ## `#anchor` `` heading, then `confirmer:`, `canonicalHash:`, `items:` (the record's ids in record order, or `none`) and `date:`, then the ruling.

**The criterion applied throughout (5c)**: an item is operative if and only if a consumer implementation could violate it. Headings are labels. Orientation, inventory, rationale and statements about what a generator or the repo *is* are not items. Every `canonicalHash` is carried from the record unchanged, never recomputed.

**Record edits I made as confirmer** (same commit as this note):
- `#identity`: added `restraint`; restored `domain` to its full sentence.
- `#ios-theming-spec-094`: removed `theming-1`.
- `#product-tokens-spec-108109`: removed `product-tokens-1`, `product-tokens-2`, `product-tokens-4`.
- `#the-implement-vs-direct-distinction`: added `direct-raise`, `advise-raise`.
- `#operational-mode-screen-implementation:preamble`: 0 → 1, added `follow-workflow`.
- `#with-leonardo-primary`: restored the full text of `handoff-tiers`.
- `#how-to-use-designerpunk-tokens-on-ios`: added `theme-set`.

## `#identity`

confirmer: kenya
canonicalHash: sha256:952e5f3cae47ecb580297b6d736e737481dfdb57b74bed68a9a0321fc8b66222
items: role, restraint, domain, leonardo-primary, system-through-leonardo, human-decides, partner
date: 2026-09-29

**Ruling: CORRECTED, 6 → 7 items.** Added `restraint` (*precision and economy — no unnecessary flourish, no over-engineering*): a gold-plated implementation violates it. Restored `domain` to its full sentence; the draft `Your domain:` was a bare lead-in that carried none of the scope. Not operative: the Hara paragraph and *"the best implementation is the one the user never notices"* (orientation), and the sibling/Stacy roster (inventory).

## `#in-scope`

confirmer: kenya
canonicalHash: sha256:2d200f0d2b9ce6d63a106e452a5b04399c1bfdb3e2ebe85015e5ce8fdf12350e
items: scope-1, scope-2, scope-3, scope-4, scope-5, scope-6, scope-7, scope-8
date: 2026-09-29

**Ruling: CONFIRMED at 8 items, as drafted.** Each bullet is a scope member. Work outside the set, or declining a listed duty, violates it.

## `#ios-theming-spec-094`

confirmer: kenya
canonicalHash: sha256:ced2085af0c675dbb3e27cc0f93bd50feef8f21a31b28cec74f2034781da4d31
items: theming-2, theming-3, theming-4, theming-5
date: 2026-09-29

**Ruling: CORRECTED, 5 → 4 items.** Removed `theming-1` (*"Generated Swift output includes: …"*). It inventories what the generator emits and directs nothing, and an implementation can't violate a description of generator output. The operative consumption rules are `theming-2` to `theming-4`. `theming-4` stays: reading static tokens through the environment violates *"no environment access needed"*.

## `#product-tokens-spec-108109`

confirmer: kenya
canonicalHash: sha256:7529881a62c6b578199af8ac739710989cd227b36857fa501034c29695b00f4e
items: product-tokens-3, product-tokens-5, product-tokens-6
date: 2026-09-29

**Ruling: CORRECTED, 6 → 3 items.** Removed `product-tokens-1` (the output path), `product-tokens-2` (the shape of the static-token enum) and `product-tokens-4` (how the generator writes ref tokens). All three describe generated artifacts or repo layout, and none directs an act. Kept `product-tokens-3`: its *"access via `theme.product{Category}{Name}`"* is a consumption directive. Kept `-5` (query route) and `-6` (authoring + governance).

## `#out-of-scope`

confirmer: kenya
canonicalHash: sha256:79a201ad2dcfa69d1aeaa343024cc011e73790b162c90aac612534e35468d4b9
items: out-1, out-2, out-3, out-4, out-5, out-6, out-7
date: 2026-09-29

**Ruling: CONFIRMED at 7 items, as drafted.** These are boundary members. Taking any listed decision, or skipping the named escalation path (`out-4`, `out-5`), violates them.

## `#blocking-exception-direct-escalation-to-peter`

confirmer: kenya
canonicalHash: sha256:c5cf701217d1de46ef107456928e2f87ca8cd4e4fa7a77bad68d25c84ab52875
items: blocking-direct, blocking-exception, blocking-when-in-doubt
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.** The conditioned permission, its exception status and the default route are each violable. *"This bypasses Leonardo because …"* and *"Most issues benefit …"* are rationale.

## `#the-implement-vs-direct-distinction`

confirmer: kenya
canonicalHash: sha256:57b5349876736700b7908f3a32db7058994a227c5801e7aefb65d2842a2d5724
items: implement-not-direct, direct-raise, advise-raise
date: 2026-09-29

**Ruling: CORRECTED, 1 → 3 items.** Added `direct-raise` (*"Raise to Leonardo, don't decide unilaterally"*) and `advise-raise` (*"Raise to Leonardo with rationale"*). The headline says only what not to do. These two arrow clauses carry the positive duty to raise, and the third mode, advise, which the headline doesn't name. Swapping a spec'd approach for a native pattern without raising it violates `advise-raise`. The quoted examples and the *"→ Your job"* lines are illustration.

## `#operational-mode-screen-implementation:preamble`

confirmer: kenya
canonicalHash: sha256:1f5a573fb7084bb223714515f458671f62fdd3c789d696aa3491cd58e85453ef
items: follow-workflow
date: 2026-09-29

**Ruling: CORRECTED, 0 → 1 item.** Added `follow-workflow` (*"When Leonardo provides a screen specification, follow this workflow:"*). It has a trigger and an obligation, and it binds Steps 1–5 to when they apply. This is the same kind of sentence as Lina's `scaffold-follow-stemma` and Thurgood's three `follow this workflow:` preambles, which are all 1 item. A rendering that keeps the steps but drops this loses their trigger.

## `#step-1-review-the-specification`

confirmer: kenya
canonicalHash: sha256:4719d306ee2f14c617cc79ded22c72edf957537f50546ce655fd80e05f22f825
items: review-1, review-2, review-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**

## `#step-2-set-up-the-screen`

confirmer: kenya
canonicalHash: sha256:0520953313feb889806ab2ebbf0bb02244b7b2f65f42af286c96841aab6b3b3f
items: setup-1, setup-2, setup-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.** `setup-2` carries the ground-truth ban inline, and reading a `dist/*.ios.swift` snapshot violates it.

## `#step-3-implement`

confirmer: kenya
canonicalHash: sha256:420c78588aaaf97319fe6c8025e8572abc6d979529f798410e6971da01619fdc
items: implement-1, implement-2, implement-3, implement-4, implement-5
date: 2026-09-29

**Ruling: CONFIRMED at 5 items, as drafted.**

## `#step-4-test`

confirmer: kenya
canonicalHash: sha256:f79d3683d1b66e151eab51a062ea680949101693684169806aa6e115c22e7386
items: test-1, test-2, test-3, test-4
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.**

## `#step-5-report-back`

confirmer: kenya
canonicalHash: sha256:3fd4f918e451b2c7be28055b86c94e11f6c25a4f6d53e17518b07fe85850e1c1
items: report-1, report-2, report-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.** The *"these feed …"* tail is kept inside `report-3` because it is part of the verbatim bullet. It can only make strict matching under-count.

## `#operational-mode-platform-expertise:preamble`

confirmer: kenya
canonicalHash: sha256:e706d2b140020958d39f2035c71f6fff7bc15e29e7ee66ec552c455159745cf4
items: none
date: 2026-09-29

**Ruling: INAPPLICABLE: zero items, declared (5d).** *"When Leonardo or Peter asks about iOS capabilities or constraints:"* is a trigger with no verb, so there is nothing to violate. That separates it from the screen-implementation preamble, which says *follow this workflow*. The obligations are in `#what-you-provide` and `#how-you-provide-it`.

## `#what-you-provide`

confirmer: kenya
canonicalHash: sha256:2548dd913749d7aca32002726b990a2bbdbf6a0abad3aa1716ae7b4a8df3b0f9
items: provide-1, provide-2, provide-3, provide-4, provide-5
date: 2026-09-29

**Ruling: CONFIRMED at 5 items, as drafted.** Each one is a member of what advice must cover. Advice that omits a relevant member (e.g. the VoiceOver implications) violates it.

## `#how-you-provide-it`

confirmer: kenya
canonicalHash: sha256:40e8d3135998af80a576b2da6bbb2c91b59fe1b6b2a335cbdbcfd9eb033fcc8f
items: how-1, how-2, how-3, how-4
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.**

## `#with-leonardo-primary`

confirmer: kenya
canonicalHash: sha256:b7cdad54afb42ac8d94948dce64bd7e0943b1b9647aa4095247b4f5a593b98e6
items: leonardo-1, leonardo-2, leonardo-3, leonardo-4, leonardo-5, leonardo-6, handoff-tiers, capture-decisions
date: 2026-09-29

**Ruling: CORRECTED, text of `handoff-tiers` restored (count unchanged, 8).** The draft `Communication follows the Product Handoff Protocol:` was a prefix truncation, and it dropped all three tier definitions, which are the operative part. The item is now the full sentence, through *"… routed through Leonardo to Thurgood for triage."*

## `#with-sibling-platform-agents`

confirmer: kenya
canonicalHash: sha256:5a16c1280955dd525111840ecfc8e4968d2eef118741848be5497b56c1c5d853
items: siblings-1, siblings-2, siblings-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**

## `#with-stacy-product-governance`

confirmer: kenya
canonicalHash: sha256:fff1cac152955adc9e5402bfb23639047e058764beaa4cb6d642498bcf78f4b6
items: stacy-1, stacy-2, stacy-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**

## `#with-peter`

confirmer: kenya
canonicalHash: sha256:90bc1ebfef01c8a04aec07cb27f3bbe0f5d2d7e3394f5741c310b5746e6ce655
items: human-1, human-2, human-3, human-4
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.** `human-1` reads like a permission to Peter, but it is operative for me: refusing Peter's direct feedback because it didn't come through Leonardo violates it.

## `#how-to-use-designerpunk-tokens-on-ios`

confirmer: kenya
canonicalHash: sha256:d65e9de031942f65d0caa8d367eb551948403a02467df795efb5a43b2fc02712
items: tokens-1, tokens-2, tokens-3, tokens-4, ground-truth-live, theme-set
date: 2026-09-29

**Ruling: CORRECTED, 5 → 6 items.** Added `theme-set` (*"Theme-varying tokens are a per-theme SET — the tool returns the set, not a single flattened value."*). The draft's `ground-truth-live` stopped one sentence short. Treating a theme-varying token as one value violates this sentence, and this unit is the only place it appears.

## `#token-reference-pattern`

confirmer: kenya
canonicalHash: sha256:a924c99e8ea1db803c75f145df8e6ea87003cf506421145331b11369285b2f09
items: token-doc-map, verify-ambiguous
date: 2026-09-29

**Ruling: CONFIRMED at 2 items, as drafted.** *"The architect should have specified tokens …"* is orientation, and the operative clause is `verify-ambiguous`.

## `#platform-currency-expectations`

confirmer: kenya
canonicalHash: sha256:450650ee602970a03ac8342a8feae9c3f1928d962c608aacf85c3b7414c9e813
items: currency-1, currency-2, currency-3, currency-4, currency-5
date: 2026-09-29

**Ruling: CONFIRMED at 5 items, as drafted.** The lead-in (*"… Be honest about this:"*) is carried by the five bullets.

## `#platform-reference-pointers`

confirmer: kenya
canonicalHash: sha256:32c60584b24d089828dcc04676d6933400c59ceb1a2b7cccbb6300d01bb323c1
items: refs-1, refs-2, refs-3, refs-4, refs-own-platform
date: 2026-09-29

**Ruling: CONFIRMED at 5 items, as drafted.**

## `#ios-specific-guidance`

confirmer: kenya
canonicalHash: sha256:6c3f5b31c29786494310e22398e7b57165a3caabc13c4e9c68770c1bc60bbe65
items: native-1, native-2, native-3, native-4, native-5, native-6, native-7
date: 2026-09-29

**Ruling: CONFIRMED at 7 items, as drafted.** Each bullet is a pattern that a non-conforming implementation violates. Examples: navigating with a deprecated `NavigationView`, hand-rolled safe-area insets, or targeting below iOS 17.

## `#mcp-practice-notes`

confirmer: kenya
canonicalHash: sha256:752619afed54f31fc54cde7129c2a268be95e23e3fc5752c4f619298706cf49f
items: ground-truth-live-mcp, rebuild-product, mcp-fallback
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.** The server roster and *"Health states: …"* are inventory.

## `#collaboration-standards:preamble`

confirmer: kenya
canonicalHash: sha256:3affabec49417d9644d83ab0c5c3552a80a5173d5d5305aa9b6828fcb2631f34
items: apply-aicp
date: 2026-09-29

**Ruling: CONFIRMED at 1 item, as drafted.**

## `#counter-arguments-are-mandatory`

confirmer: kenya
canonicalHash: sha256:f9576a4f0c7800b8c1de88279dc20c0a0d8451e15c0e6449f252b3958f321e29
items: counter-provide, counter-fold-back
date: 2026-09-29

**Ruling: CONFIRMED at 2 items, as drafted.**

## `#candid-over-comfortable`

confirmer: kenya
canonicalHash: sha256:c13aa5057b5affaeb2e92db188c92a890f1ec32de6cc6e3bc809789ff1764ddd
items: candid
date: 2026-09-29

**Ruling: CONFIRMED at 1 item, as drafted.**

## `#bias-self-monitoring`

confirmer: kenya
canonicalHash: sha256:e3ea7439957b2975e67d9869be80d428a623ae6beb85e04efc536218b665abb4
items: bias-watch, bias-name
date: 2026-09-29

**Ruling: CONFIRMED at 2 items, as drafted.**

## `#ask-if-unsure`

confirmer: kenya
canonicalHash: sha256:af6a0f7467a107435b3118632d530746de45415d9cc95604009428306c3b669c
items: ask-if-unsure
date: 2026-09-29

**Ruling: CONFIRMED at 1 item, as drafted.**

## `#what-you-own`

confirmer: kenya
canonicalHash: sha256:b9722961addd95338798a827f21af6c949ff5bc285f0da6a992444995c23ad4b
items: own-1, own-2, own-3, own-4
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.**

## `#what-you-dont-own`

confirmer: kenya
canonicalHash: sha256:c3c70ca98b609f991f22359a186dd372685df660e45b86f364e29ef26ecd2591
items: not-own-1, not-own-2, not-own-3, jest-not-vitest
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.** `jest-not-vitest` is violable in its text (*never `vitest`*), so it stays. For phase two: it is repo-specific, and it will likely need a disposition in the consumer rendering, where a product iOS repo tests with XCTest. *"There is no in-repo iOS build/test …"* and the Commands pointer are repo facts, not items.

## Confirmation run summary

- **Commit**: the commit that adds this note, on `task/123-u2b-fr1-kenya` from `3d781922`. The SHA is reported in the handback, because a commit can't name its own SHA.
- **Units confirmed**: 33 of 33. That is 25 confirmed as drafted and 8 corrected. The record goes from 123 items to 124.
- **Items added** (5):
  - `#identity` / `restraint`
  - `#the-implement-vs-direct-distinction` / `direct-raise` and `advise-raise`
  - `#operational-mode-screen-implementation:preamble` / `follow-workflow`
  - `#how-to-use-designerpunk-tokens-on-ios` / `theme-set`
- **Items removed** (4):
  - `#ios-theming-spec-094` / `theming-1`
  - `#product-tokens-spec-108109` / `product-tokens-1`, `product-tokens-2` and `product-tokens-4`
- **Text restored** (2): `#identity` / `domain` and `#with-leonardo-primary` / `handoff-tiers`. Both drafts were bare lead-ins with the operative content cut off.
- **Units ruled zero** (1): `#operational-mode-platform-expertise:preamble`, a trigger with no obligation (declared under 5d).
- **Where the draft was materially wrong**:
  - `#operational-mode-screen-implementation:preamble` was drafted at 0 items, but it is a "follow this workflow:" preamble, which is 1 item in Lina's and Thurgood's records.
  - `domain` and `handoff-tiers` were truncated to their labels.
  - `ground-truth-live` stopped one sentence short, dropping the per-theme-set rule.
  - The theming and product-token units counted descriptions of generator output as obligations.
- **Residuals**:
  1. **Descriptions of generated output are unprotected.** The removed facts are the Swift shapes a consumer implementer relies on: the `{Name}Theme`/ThemeKey inventory, the `ProductTokens.ios.swift` path and the `Product{Category}` enum shape. Under 5c they are not items, so a consumer rendering could drop or alter them with no finding. This is the surviving counter-argument to the removals. What limits it is that `theming-2`, `product-tokens-3` and `product-tokens-5` remain and are operative.
  2. **`jest-not-vitest` is repo-specific.** It stays as an item because its text is violable, but it will probably need a disposition at signing (phase two).
  3. **Routing may change.** Routing was computed from the drafted sets, and five units' sets changed (`#identity`, `#the-implement-vs-direct-distinction`, the screen-implementation preamble, `#ios-theming-spec-094` and `#product-tokens-spec-108109`). The hash sheet must be re-run before phase two.
  4. **`sweep.ts` hard-codes the main-repo root** (`/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2/`). Run from a worktree, it sweeps the main checkout, not the worktree. I verified against the worktree with a temporary copy whose root was re-pointed, and deleted the copy. `kenya.yaml` had 0 `confirmation` findings, and there were no findings of any other kind.
