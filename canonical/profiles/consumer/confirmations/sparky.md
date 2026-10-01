# Operative-set confirmation — `sparky` (C1, owner seat)

**Record**: `canonical/operative-sets/sparky.yaml` (drafted by Thurgood at 15.4; confirmed and corrected here)
**Source**: `canonical/agents/sparky.md`
**Owner**: Sparky · **Profile author**: Thurgood · **Confirmer**: **Sparky**. Under C1 the owner confirms, because the owner is not the profile author (Req 11.6.5d; design C16).
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase one (C1 confirmations)
**Scope**: all 33 body units of the charter.

**Format**: the convention Stacy and Lina use. Each unit gets a `` ## `#anchor` `` heading, then `confirmer:`, `canonicalHash:`, `items:` (the record's ids, in record order, or `none`) and `date:`, then the ruling.

**The criterion applied throughout (5c)**: an item is operative if and only if a consumer implementation could violate it. Headings, lead-ins and labels are not items (clause (c)). Orienting prose, rationale and inventory statements are not items. Repo-bound items stay operative and are read re-keyed to the consumer's repo (5b). They are not dropped as "repo facts", because dropping them is the denominator narrowing that 5d guards against.

**Bundling rule I applied**: where one item already bundles two constraints, I kept it whole. Splitting a bundle raises the chance that a partial rendering clears the half-floor, which is the dangerous direction. I added items only where a constraint had no item at all in its unit.

**Record edits I made as confirmer** (same commit as this note; each is a reviewed diff):
- `#identity`: 6 → 7 items (added `sparky-understand-intent`).
- `#product-tokens`: 5 → 4 items (removed `product-tokens-3`).
- `#the-implement-vs-direct-distinction`: 1 → 3 items (added `direct-raise-not-decide`, `advise-with-rationale`).
- No other item added, removed or re-worded. The `canonicalHash` values are unchanged.

## `#identity`

confirmer: sparky
canonicalHash: sha256:afa6f1619e917b7abc6da158a86c7eabd88e1d7e82b6d703a6f6b9f8d6789c3b
items: sparky-implement-with-care, sparky-understand-intent, sparky-domain, sparky-leonardo-primary, sparky-system-through-leonardo, sparky-human-decides, sparky-partner
date: 2026-09-29

**Ruling: 7 items (drafted 6; +1 `sparky-understand-intent`).** "You build with care because you understand what the design is trying to accomplish, not just what it specifies" is a binding norm, not rationale: an implementation that satisfies the letter of a spec while ignoring what the design is for violates it. The naming history, the Sarah Parks paragraph and the sibling-agent inventory sentence are orienting and stay out. `sparky-human-decides` is repo-bound ("Peter") and is read re-keyed to the consumer's human lead (5b); it stays operative.

## `#in-scope`

confirmer: sparky
canonicalHash: sha256:22419845e4ce89eec0166976e1b0447e3956ebccd3548cc410c9129473b2a0d3
items: scope-1, scope-2, scope-3, scope-4, scope-5, scope-6, scope-7, scope-8
date: 2026-09-29

**Ruling: CONFIRMED at 8 items, as drafted.** Each scope member is violable by working outside it or refusing it.

## `#web-theming`

confirmer: sparky
canonicalHash: sha256:3fe725da5bdda0d13d0c940e7d474b831ec35db2454b7f616e3092b014830c39
items: theming-1, theming-2, theming-3, theming-4
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.** Each bullet binds the theming mechanism (`data-theme`, `:root` base, dark-only `color-scheme`, install + generate). `theming-1` bundles a statement of inheritance behavior with the norm; the bundle is kept whole, because splitting would make a partial rendering clear the floor more easily.

## `#product-tokens`

confirmer: sparky
canonicalHash: sha256:fbaea5ecb2b1acc271141fc708fd4e121f1a6dcae81ba14a2047b4762c5f0825
items: product-tokens-1, product-tokens-2, product-tokens-3, product-tokens-4, product-tokens-5
date: 2026-09-29

**Ruling: 4 items (drafted 5; removed `product-tokens-3`).** "Ref tokens emit `var()` references to system tokens" describes the generator's output. No Sparky-side implementation can violate it; the Sparky obligation next to it (author `ref:` when a system token is in tolerance) lives in the ambient Product-Token-Governance, not in this unit. This is a narrowing, made as a reviewed diff. `product-tokens-1` keeps its bundled output-path fact because the load-order obligation is in the same sentence.

**Superseded 2026-09-29 by Thurgood's 5c ruling ("can contradict", Req 11.6.8): 5 items, `product-tokens-3` reinstated.** A stated shape that the implementation builds against is operative. A consumer's CSS builds against ref tokens resolving as `var()` references to system tokens, so it can act against that shape. The removal above no longer stands.

## `#out-of-scope`

confirmer: sparky
canonicalHash: sha256:2a194f0ea5b813a6ea71d33ec46613e0fc1f672688ded1ace3c7eccf808cbbe2
items: out-1, out-2, out-3, out-4, out-5, out-6, out-7
date: 2026-09-29

**Ruling: CONFIRMED at 7 items, as drafted.** Each is a boundary a consumer implementation can cross.

## `#blocking-exception-direct-escalation-to-peter`

confirmer: sparky
canonicalHash: sha256:c5cf701217d1de46ef107456928e2f87ca8cd4e4fa7a77bad68d25c84ab52875
items: blocking-direct, blocking-exception, blocking-when-in-doubt
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.** The "This bypasses Leonardo because…" and "Most issues benefit…" sentences are rationale.

## `#the-implement-vs-direct-distinction`

confirmer: sparky
canonicalHash: sha256:eb1534e1ff62e5d1bd6fc1ee21136f8f664ccd275de61ab1e705fa52c591e8cc
items: implement-not-direct, direct-raise-not-decide, advise-with-rationale
date: 2026-09-29

**Ruling: 3 items (drafted 1; +`direct-raise-not-decide`, +`advise-with-rationale`).** The draft read the four example bullets as illustration. Two of them carry resolutions the head sentence does not entail: "Raise to Leonardo, don't decide unilaterally" (not directing is compatible with staying silent; this requires raising it) and "Raise to Leonardo with rationale" (advising a native alternative must come with rationale). Under the per-unit grain (5e scope, 5f), those constraints would otherwise survive only in other units. The two **Implement** bullets ("→ Your job") restate the head sentence and stay out. Each item keeps its bold label and quoted example, because together they state the trigger.

## `#operational-mode-screen-implementation:preamble`

confirmer: sparky
canonicalHash: sha256:1f5a573fb7084bb223714515f458671f62fdd3c789d696aa3491cd58e85453ef
items: none
date: 2026-09-29

**Ruling: ZERO items — INAPPLICABLE, declared (5d).** "When Leonardo provides a screen specification, follow this workflow:" is a lead-in to Steps 1–5, which are their own units. On its own it states no constraint a consumer implementation could violate.

## `#step-1-review-the-specification`

confirmer: sparky
canonicalHash: sha256:621b0fe4dd0149014a6ce826ade29c822a5605a545eb0186a1057b2c57e819b9
items: review-1, review-2, review-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**

## `#step-2-set-up-the-screen`

confirmer: sparky
canonicalHash: sha256:c1e038bcaaee4f3341e0b5a1b005032b41ec3837abb928b5a093481908fb732f
items: setup-1, setup-2, setup-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.** `setup-3` ("Reference existing DesignerPunk Web component implementations as patterns") is read re-keyed to the consumer's install (the shipped `@3fn/core` web components) under 5b.

## `#step-3-implement`

confirmer: sparky
canonicalHash: sha256:56fbac93560a8db59c22c200f00bd3042e85825d9929264c6eef27d5b41756cb
items: implement-1, implement-2, implement-3, implement-4
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.** `implement-2` bundles the Hard Rules pointer with its named rule list; kept whole.

## `#step-4-test`

confirmer: sparky
canonicalHash: sha256:8c6df8954386c8562a85d183aa202297c737fff199832f60a6253912ecdf8206
items: test-1, test-2, test-3, test-4
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.**

## `#step-5-report-back`

confirmer: sparky
canonicalHash: sha256:3fd4f918e451b2c7be28055b86c94e11f6c25a4f6d53e17518b07fe85850e1c1
items: report-1, report-2, report-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**

## `#operational-mode-platform-expertise:preamble`

confirmer: sparky
canonicalHash: sha256:183708e268448fd7a42b0851c9772e035eb3f5bf7140d48e6bed101c919b5cbb
items: none
date: 2026-09-29

**Ruling: ZERO items — INAPPLICABLE, declared (5d).** "When Leonardo or Peter asks about Web capabilities or constraints:" is the trigger lead-in to the two sub-units that follow. It carries no constraint of its own.

## `#what-you-provide`

confirmer: sparky
canonicalHash: sha256:df3f4c19089b782eb627c009ed669ded403d67711e34046d03f69529779caecd
items: provide-1, provide-2, provide-3, provide-4, provide-5
date: 2026-09-29

**Ruling: CONFIRMED at 5 items, as drafted.** Each member is content that platform advice must cover, so advice that omits it (for example, no native alternative when one is better) violates it.

## `#how-you-provide-it`

confirmer: sparky
canonicalHash: sha256:2eebbca5233ce33b4459ae9ac290982a237a9606618c1a43a47d38946554d8a8
items: how-1, how-2, how-3, how-4
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.**

## `#with-leonardo-primary`

confirmer: sparky
canonicalHash: sha256:ae386ec2823a3d0d5675f94bd7b7718f4da719a92a4d55fdd663ade4b205831d
items: leonardo-1, leonardo-2, leonardo-3, leonardo-4, leonardo-5, leonardo-6, handoff-tiers, capture-decisions
date: 2026-09-29

**Ruling: CONFIRMED at 8 items, as drafted.** The six bullets plus the handoff-tier paragraph and the decision-capture sentence are all binding.

## `#with-sibling-platform-agents`

confirmer: sparky
canonicalHash: sha256:5a16c1280955dd525111840ecfc8e4968d2eef118741848be5497b56c1c5d853
items: siblings-1, siblings-2, siblings-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**

## `#with-stacy-product-governance`

confirmer: sparky
canonicalHash: sha256:fff1cac152955adc9e5402bfb23639047e058764beaa4cb6d642498bcf78f4b6
items: stacy-1, stacy-2, stacy-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**

## `#with-peter`

confirmer: sparky
canonicalHash: sha256:479fce94f62b6d9537e579a510b7673d5db26540034f10e90a59cd64875cb5be
items: human-1, human-2, human-3, human-4
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.** `human-1` ("Peter may provide direct feedback…") reads like a statement about the human, but it licenses a channel. A Sparky that insists direct feedback be routed through Leonardo violates it, so it stays operative (repo-bound name, re-keyed under 5b).

## `#how-to-use-designerpunk-tokens-on-web`

confirmer: sparky
canonicalHash: sha256:57693a86db637fed5285d7b2b816cbff71ac94193e45111dc3f60ae458a343cf
items: tokens-1, tokens-2, tokens-3, tokens-4, ground-truth-live
date: 2026-09-29

**Ruling: CONFIRMED at 5 items, as drafted.** `ground-truth-live` is repo-bound (the `dist/*.css` snapshots) and is read re-keyed; it stays operative.

## `#token-reference-pattern`

confirmer: sparky
canonicalHash: sha256:5d30c69736fa7b7fc82b8bff5cc021bc305d6576bc0dfdc20746f2339f4a4345
items: token-doc-map, verify-ambiguous
date: 2026-09-29

**Ruling: CONFIRMED at 2 items, as drafted.** "The architect should have specified tokens in the screen spec" is an expectation about Leonardo, not a Sparky constraint.

## `#platform-currency-expectations`

confirmer: sparky
canonicalHash: sha256:e7488d0b9d56e780dd213378194926725105c159835c0113689ea38b6f3e8346
items: currency-1, currency-2, currency-3, currency-4, currency-5
date: 2026-09-29

**Ruling: CONFIRMED at 5 items, as drafted.** The "Be honest about this:" lead-in is a label.

## `#platform-reference-pointers`

confirmer: sparky
canonicalHash: sha256:18e990c523a3aba3a41ac809ec3c3d6813a75ff82ca8c4d5dd12b0603cd76136
items: refs-1, refs-2, refs-3, refs-4, refs-own-platform
date: 2026-09-29

**Ruling: CONFIRMED at 5 items, as drafted.**

## `#web-specific-guidance`

confirmer: sparky
canonicalHash: sha256:45271aca517c5399f1ce3b5c2213e94f6851793460ace471a9fc33f458ddce4a
items: web-1, web-2, web-3, web-4, web-5, web-6, web-7
date: 2026-09-29

**Ruling: CONFIRMED at 7 items, as drafted.** `web-5` ("No haptic feedback") is violable: reaching for `navigator.vibrate` or an equivalent violates it.

## `#mcp-practice-notes`

confirmer: sparky
canonicalHash: sha256:d672fc52acae749a0c20e074c640a050e935ca09ebafeb63ef4ca43729346be6
items: ground-truth-live-mcp, rebuild-product, mcp-fallback
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.** The opening paragraph (routing pointer and server inventory), the health-state list and the staleness explanation are orienting or rationale.

## `#collaboration-standards:preamble`

confirmer: sparky
canonicalHash: sha256:3affabec49417d9644d83ab0c5c3552a80a5173d5d5305aa9b6828fcb2631f34
items: apply-aicp
date: 2026-09-29

**Ruling: CONFIRMED at 1 item, as drafted.**

## `#counter-arguments-are-mandatory`

confirmer: sparky
canonicalHash: sha256:d66876db9398acef943945add814cc1076d0b591702ae29cbfc4b44b81a816c1
items: counter-provide, counter-fold-back
date: 2026-09-29

**Ruling: CONFIRMED at 2 items, as drafted.**

## `#candid-over-comfortable`

confirmer: sparky
canonicalHash: sha256:2b2de6b13ae6d20864e50842879a91e49a8ec9da5dc888ba73d661f3e9d2b812
items: candid
date: 2026-09-29

**Ruling: CONFIRMED at 1 item, as drafted.** Both sentences stay bundled as one item. Splitting off "Default candid; escalate to blunt only…" would let a rendering that drops the calibration clear the floor at 1/2.

## `#bias-self-monitoring`

confirmer: sparky
canonicalHash: sha256:78896f8343c68005263435a2ec70d7125e6ee0d066e1bbc96a407fd2e0a599de
items: bias-watch, bias-name
date: 2026-09-29

**Ruling: CONFIRMED at 2 items, as drafted.**

## `#ask-if-unsure`

confirmer: sparky
canonicalHash: sha256:3f7e849b0f60c902e6aca5dd656cbed7cccd5fc9550f9edc365d23b3a3b89e7b
items: ask-if-unsure
date: 2026-09-29

**Ruling: CONFIRMED at 1 item, as drafted.**

## `#what-you-own`

confirmer: sparky
canonicalHash: sha256:7be462335f2a9ffad4e1e59c590d894766803e8b9e4e5f982c9eed8c237d75f8
items: own-1, own-2, own-3, own-4
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.**

## `#what-you-dont-own`

confirmer: sparky
canonicalHash: sha256:ee7dd121bbf0cb283d8dbb38f87c8f4b67b7dc492f8ab2236170a0909ec0c288
items: not-own-1, not-own-2, not-own-3, jest-not-vitest
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.** `jest-not-vitest` is repo-bound. It stays operative and is read re-keyed to the consumer's test runner (5b), which is the population R5 says to re-point, not delete. The "Commands section" pointer is a reference, not an item.

## Confirmation run summary

- **Commit**: the commit that adds this note (branch `task/123-u2b-fr1-sparky`, parent `3d781922`). The SHA is in the handback.
- **Units confirmed**: 33 of 33. The record went from 120 items to 122 (later 123, after `cf278169` reinstated `product-tokens-3` under Thurgood's 5c ruling).
- **Items added**: `#identity` `sparky-understand-intent`; `#the-implement-vs-direct-distinction` `direct-raise-not-decide` and `advise-with-rationale`.
- **Items removed**: `#product-tokens` `product-tokens-3` (it describes the generator's output, and no Sparky implementation can violate it).
- **Units ruled zero (INAPPLICABLE, declared)**: `#operational-mode-screen-implementation:preamble` and `#operational-mode-platform-expertise:preamble`. Both are lead-ins, as drafted.
- **Where the draft was materially wrong**: `#the-implement-vs-direct-distinction`. The draft read the Direct and Advise bullets as illustration, but their resolutions ("raise to Leonardo, don't decide unilaterally"; "raise … with rationale") are constraints the head sentence does not entail.
- **Verification**: I ran the freshness sweep re-rooted at the worktree (a scratch copy of `sweep.ts` with `R` pointed at the worktree), with both files staged. Result: zero findings for `sparky.yaml`, and confirmations owed went from 349 to 316.
- **Residuals** (not mine to fix):
  - (1) `drafting/sweep.ts` hard-codes `R` to the main checkout (`…/DesignerPunk-v2/`). Run from a worktree, it measures main, not the worktree.
  - (2) The `contract-system-reference` embed cites repo-only text (`.kiro/specs/063-uniform-contract-system/…`). It also says "The Concept Catalog above lists all 137 concepts", but the embed carries only the Naming Convention section, so "above" dangles in the rendering. The doc's owner fixes both.
  - (3) The hash sheet is now stale for `#identity`, `#product-tokens` and `#the-implement-vs-direct-distinction`. Re-run `hash-sheets.ts` before signing, because the item changes may change ROUTED for those units.
- **Correction (2026-09-29, 5c ruling)**: Under Thurgood's "can contradict" reading of 5c, `#product-tokens` `product-tokens-3` is reinstated, with the same id and the drafted text; the unit is back to 5 items. Everything else stands. The count line above is also wrong: the record went from 120 items to 122 at `6398386d`, not 125 → 127, and holds 123 after this reinstatement.
