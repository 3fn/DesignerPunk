# Operative-set confirmation — `lina` (C1, owner seat)

**Record**: `canonical/operative-sets/lina.yaml` (drafted by Thurgood at 11.1; confirmed and corrected here)
**Source**: `canonical/agents/lina.md`
**Owner**: Lina · **Profile author**: Thurgood · **Confirmer**: **Lina**. Under C1 the owner confirms, because the owner is not the profile author (Req 11.6.5d; design C16).
**Date**: 2026-09-27 · Spec 123 Task 11.2 (Lina's half; write grant: Task 11's row as amended by PR #220)
**Scope**: the thirteen exemplar source units of Lina-1 and Lina-2 only. The charter's other units are confirmed at 15.4.

**Disclosure**: *confirmed by the constructing seat.* I constructed Lina-1 and Lina-2 (R1), I confirm their operative sets here, and I build `triviality.ts` at 13.4, which is scored against these sets. The C16 incentive still runs the right way for this seat: every item I dropped would be a capability of my own charter that a gutting could lose unrouted.

**Format**: Thurgood's convention, as adopted by Stacy. Each unit gets a `` ## `#anchor` `` heading, then `confirmer:`, `canonicalHash:`, `items:` (the record's ids, in record order, or `none`) and `date:`, then the ruling.

**The criterion applied throughout (5c)**: an item is operative if and only if a consumer implementation could violate it. Headings and step titles are labels (clause (c)). A `**Label**:` prefix that states the item's trigger or subject is part of the item's text, not a heading.

**Record edits I made as confirmer** (same commit as this note):
- `#step-6-create-or-review-component-metayaml`: `step6-author-meta` and `step6-review-staleness` restored to their full text, `**For new components**: …` and `**For component modifications**: …`. The drafts were prefix truncations: the label is the condition that says WHEN each branch applies. Item count unchanged (9).
- No other item added, removed, or re-worded. **All thirteen counts stand: 39 items.**

**Cross-check against my R2 A10 measurement**: the ten `- **Label**: value` bullets I counted in lina.md are exactly `#web` (4), `#ios` (3) and `#android` (3). All ten are drafted as operative, with their labels inside the text, and I confirm all ten.

## `#component-scaffolding-workflow:preamble`

confirmer: lina
canonicalHash: sha256:16d70c05712d0baa66ad48767d3dcd40c6d65133071721538046084e1308b4be
items: scaffold-follow-stemma
date: 2026-09-27

**Ruling: CONFIRMED at 1 item** (Thurgood's flag 3).
- The sentence carries a trigger (*when scaffolding a new component*) and an obligation (*follow the Stemma system structure*). Scaffolding outside the Stemma structure violates it.
- It is not a bare lead-in like Stacy's trimmed `It means:`. It binds the seven steps to their trigger, and a rendering that keeps the steps but drops it loses when they apply.
- **This preamble is a unit with dispositionable content** (my L2-B1 finding): it has one operative item and must take a disposition like any other unit.
- The trailing colon is part of the verbatim sentence and stays. It can only make strict matching under-count.

## `#step-1-verify-component-family-doc`

confirmer: lina
canonicalHash: sha256:e15bdecb57e9158a6ff726c1a11f66c5de5ab9c0b40bc9f0aa21b78d18fed0f2
items: step1-check-family-doc, step1-draft-family-doc
date: 2026-09-27

**Ruling: CONFIRMED at 2 items.** Check before creating any files; draft from the template and get Peter's approval before proceeding. Each is independently violable. The parenthetical route (*your routing section's family cues*) stays inside the first item.

## `#step-2-create-typests`

confirmer: lina
canonicalHash: sha256:5ba4402eb58fe9f92d7ccf13d178837884145a7ee91826b231e1dd2b8c2264cd
items: step2-define-interfaces
date: 2026-09-27

**Ruling: CONFIRMED at 1 item.** The file name `types.ts` lives only in the step title, which is a label under clause (c). That is not lost from the record: `types.ts` is a member of `#step-4-…`'s `step4-layout-root`.

## `#step-3-author-contractsyaml`

confirmer: lina
canonicalHash: sha256:4f9f38c9a48f3e78dfb958d759047f157365f119e508bdbdff7ac34e46994f3a
items: step3-contracts-first, step3-check-catalog, step3-canonical-naming, step3-propose-new-concept, step3-contracts-before-code
date: 2026-09-27

**Ruling: CONFIRMED at 5 items.**
- The lead paragraph's second sentence (*"This is the specification that platform implementations must satisfy."*) is operative, not rationale: an implementation that diverges from its contracts violates it. It stays inside `step3-contracts-first`.
- `step3-contracts-first` and `step3-contracts-before-code` overlap in meaning (contracts precede platform code). Both stay: they are two distinct texts in the canonical, the lead obligation and numbered step 4. The overlap can only make the denominator larger, which is the routing direction, never the clearing one.
- Numbered-list markers are not item text.

## `#step-4-create-platform-implementations`

confirmer: lina
canonicalHash: sha256:6aa7c9768f2d415cf6d5ff36b93f6d00641ab908c53b863bb7dcd3b063393a5c
items: step4-platform-separation, step4-layout-root, step4-layout-platforms, step4-layout-tests, step4-layout-examples
date: 2026-09-27

**Ruling: CONFIRMED at 5 items, at the four-group grain** (Thurgood's flag 1).
- **Per filename would over-count.** Texts like `index.ts` or `README.md` match almost any rendering, which inflates the strict numerator: the clearing direction.
- **One item for the whole tree would also be wrong.** With 2 items (the sentence and the tree), a rendering that keeps only the sentence scores 1/2 and clears the floor. At five items it scores 1/5 and routes.
- At the four-group grain, a group counts as retained only if every file in it survives verbatim. That can only under-count.

## `#step-5-create-tests`

confirmer: lina
canonicalHash: sha256:a4521a22b7c50bf5c3f4963ceeff9c6eeaf3972549907c1792d6dc2401d2363c
items: step5-write-tests
date: 2026-09-27

**Ruling: CONFIRMED at 1 item.**

## `#step-6-create-or-review-component-metayaml`

confirmer: lina
canonicalHash: sha256:8fb443bb30c9bcbe1d3b831ef46bda310090852b930c6cb1ce039b41a447ee79
items: step6-author-meta, step6-meta-content, step6-data-shapes, step6-review-staleness, step6-q-purpose, step6-q-contexts, step6-q-alternatives, step6-q-when-to-use, step6-update-if-stale
date: 2026-09-27

**Ruling: 9 items, confirmed; two texts corrected.**
- **The correction**: `step6-author-meta` and `step6-review-staleness` now carry their `**For new components**:` / `**For component modifications**:` prefixes. Without them, a rendering that applies the staleness review to new components, or authors from scratch on every modification, keeps both sentences verbatim and scores them retained. The label is the trigger. This is the prefix truncation C16 leaves to the confirmer, and it is the `**Label**:` shape my A10 finding is about.
- **`step6-meta-content` is operative** (Thurgood's flag 2). *"This provides agent-selection guidance (purpose, usage, contexts, alternatives)"* reads as description, but it enumerates the content the file must carry. A `component-meta.yaml` without selection guidance violates Step 6. 5c keys on normativity, not form, and this is the case it exists for.
- The four review questions are four review steps, each skippable, so each is an item. *"Update if stale."* is the action they gate.

## `#step-7-create-readme`

confirmer: lina
canonicalHash: sha256:14b932eb25c89bf5da4cc571dd4826d7a49dd0da6ab57705398523a68e266e1e
items: step7-document
date: 2026-09-27

**Ruling: CONFIRMED at 1 item.** The trailing `---` rule is not content.

## `#platform-implementation-true-native-architecture:preamble`

confirmer: lina
canonicalHash: sha256:dd30b058f9e21d87a8750036089540058126f5b80b37ea846452b38670a7930c
items: tn-build-time-separation, tn-native-per-platform
date: 2026-09-27

**Ruling: CONFIRMED at 2 items.**
- Runtime platform detection violates the first. A single shared cross-platform implementation (one codebase rendered on all three) violates the second.
- **This preamble is a unit with dispositionable content** (L2-B1): two operative items. It carries the architecture's core rule, and a rendering that keeps only the three sub-sections loses it.

## `#web`

confirmer: lina
canonicalHash: sha256:d01a527086b28471f5093a7bd4a214326e6d03ed5fa82bfa385e82787ab6e3d8
items: web-component-model, web-styling, web-file-extension, web-key-rule
date: 2026-09-27

**Ruling: CONFIRMED at 4 items.** All four are `**Label**: value` bullets that bind: a framework component instead of a Custom Element, physical-property CSS, or a `.js` file extension each violates one. The Styling item's route (*see Web-Authoring-Standards (routed)*) stays inside it.

## `#ios`

confirmer: lina
canonicalHash: sha256:a085ad582e13dc5be094eda3b3cbae4bf04de131c4cf74760138217a65c75188
items: ios-language, ios-ui-framework, ios-file-extension
date: 2026-09-27

**Ruling: CONFIRMED at 3 items.** 5c's own example: *"**Language**: Swift (native)"* is violated by Objective-C. UIKit violates the second; a different extension the third.

## `#android`

confirmer: lina
canonicalHash: sha256:6252b9429a25cd6fc5de584da48e194526cc8d36bb924853f99f069e313a1267
items: android-language, android-ui-framework, android-file-extension
date: 2026-09-27

**Ruling: CONFIRMED at 3 items.** Java, XML Views, or a different extension each violates one.

## `#cross-platform-consistency`

confirmer: lina
canonicalHash: sha256:5bbb0e94fbca2bfde1a737eb1a849b1c22a462eadcfbe7e2bacc40012af32577
items: cpc-shared-tokens, cpc-types-contract
date: 2026-09-27

**Ruling: CONFIRMED at 2 items.** Per-platform token values, or an implementation that does not satisfy `types.ts`, violates them.
