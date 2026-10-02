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

## `#identity`

confirmer: lina
canonicalHash: sha256:0a72d2583229f651f5ffbaca6e3b8ea5fe19abc44577d92d9c7e6d311bf5c072
items: lina-role, lina-domain, lina-handoff, lina-human-decides, lina-partner
date: 2026-09-29

**Ruling: CONFIRMED at 5 items.** The role, the domain list, the hand-off duty, the human's final decision and the partner stance each bind. An agent acting outside the role, deciding for Peter, or merely complying violates one. Not items: the Bo Bardi paragraphs and the name (orienting), and the Ada/Thurgood introduction, whose binding content is the hand-off item.

## `#ownership`

confirmer: lina
canonicalHash: sha256:3d20e2232e7f147b3b4a10692d1e592f32da1d1ec9babf3aa8e6665bd57e5ae4
items: own-all-components, own-gradient, own-consult
date: 2026-09-29

**Ruling: CONFIRMED at 3 items.** Governance of every component, the blast-radius gradient, and consult-when-in-doubt each bind. "There is no separation…" and "Every component in the repo is Lina's domain" restate `own-all-components`; "The package is a starting point the product molds" is orienting.

## `#in-scope`

confirmer: lina
canonicalHash: sha256:b98c5264e74f32de3ea21adf7d2c43147c48e087866a903701d29fa595cb8d38
items: scope-scaffolding, scope-platforms, scope-docs, scope-contract-tests, scope-token-integration, scope-schema, scope-token-mapping, scope-inheritance, scope-parity, scope-theme-consumption, scope-data-theme, scope-one-off, scope-promotion, scope-maintained-docs
date: 2026-09-29

**Ruling: CONFIRMED at 14 items.** An enumeration: each member is an in-scope duty, and dropping one narrows the role (5c: members of an operative enumeration are operative). The set is complete at {n}.

## `#out-of-scope`

confirmer: lina
canonicalHash: sha256:60728a67e9739c913a7bc14247e50b8512019224f96ec065b75a65c61bd01e41
items: out-token-creation, out-token-math, out-test-governance, out-spec
date: 2026-09-29

**Ruling: CONFIRMED at 4 items.** Each member names a boundary an implementation violates by acting inside it (creating tokens, auditing suites, formalizing specs).

## `#boundary-cases`

confirmer: lina
canonicalHash: sha256:58a6991c16f4e9cdd9012c5fad523948d2c7e8343efe9342c1c9916f04457d4f
items: boundary-flag, boundary-component-side, boundary-coordinate
date: 2026-09-29

**Ruling: CONFIRMED at 3 items.** Flag, handle the component side, route the token side: three separately violable steps.

## `#domain-boundary-response-examples`

confirmer: lina
canonicalHash: sha256:2a0af980c09687b10d4a9836e72ee11a62614b3b08c45abf4ba9afdc5524cd74
items: none
date: 2026-09-29

**Ruling: CONFIRMED at 0 items → clause (a), inapplicable.** The four quoted responses ILLUSTRATE obligations stated operatively elsewhere: routing to Ada or Thurgood (`#boundary-cases`, `#out-of-scope`), and the missing-token README note (`missing-readme` in `#when-a-token-is-missing`). No sentence here binds beyond those. The strongest case against zero, the README-note sentence, is `missing-readme`'s example, not a second obligation.

## `#token-usage-in-components:preamble`

confirmer: lina
canonicalHash: sha256:730cf0551b7b76f2f33831444187e581470a0d26cee97ef19d3816dc3e100692
items: consume-not-create
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** "You consume tokens that Ada manages" is orienting; the binding sentence (follow Token Governance, never create tokens) is the item.

## `#token-selection-priority-must-follow-this-order`

confirmer: lina
canonicalHash: sha256:2688d120f8996dd0b654091329b6dfa698b03cf183ef5dc00d8fcf9f203d0af0
items: priority-semantic, priority-primitive, priority-component, priority-hardcoded
date: 2026-09-29

**Ruling: CONFIRMED at 4 items.** Each step's complete text, its condition and its approval requirement included. **Residual, recorded, not an item**: the ORDERING obligation ("MUST follow this order") lives only in the heading, which is a label (clause (c)) and cannot be an item. A rendering that keeps all four steps verbatim but reorders them clears the floor. Routed review catches it; the mechanical half does not.

## `#component-token-construction-rule`

confirmer: lina
canonicalHash: sha256:93296840c6833f7d3747c491c4fe0dbf780ebd13575ca289148af98f5e97227f
items: construction-reference-or-conform, construction-no-arbitrary
date: 2026-09-29

**Ruling: CONFIRMED at 2 items.** Reference-or-conform, and no arbitrary values: two violable rules.

## `#when-a-token-is-missing`

confirmer: lina
canonicalHash: sha256:379a4e4cf7083da2f9beda15a7e768e983f51851889c7b46fdc55c66b97ed0ec
items: missing-flag, missing-coordinate, missing-readme, missing-no-create
date: 2026-09-29

**Ruling: CONFIRMED at 4 items.** Four steps, each violable. The trigger line ("If a component needs a token that doesn't exist:") is the list's condition, not a separate obligation; unlike Step 6's labels at 11.2 it is not inside each item's line. The closing routing pointer references a frontmatter route and entails nothing itself (11.6.5e: a reference is not an item).

## `#collaboration-model-domain-respect:preamble`

confirmer: lina
canonicalHash: sha256:f1037c902db3927079385e883cce8aadec5669d26c7b1d5496b5788700b625fd
items: respect-not-adversarial
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** The collaborative, not adversarial, stance is violable: an agent that treats peer seats as opponents to check violates it.

## `#trust-by-default`

confirmer: lina
canonicalHash: sha256:6fb35b82038d7efdf5604b7691385b856082d30cecdaf2e1d33aa7dec6affdc0
items: trust-ada, trust-thurgood, trust-human
date: 2026-09-29

**Ruling: CONFIRMED at 3 items.** Three trust obligations, each naming its seat and its limit (Peter's decisions are trusted after analysis is given).

## `#obligation-to-flag`

confirmer: lina
canonicalHash: sha256:1bda445e8c5b3104fa5ea6ec7b58a81d5df1bd534ee842ccc6817c0aa6adb299
items: flag-semantic, flag-test-pattern, flag-impact
date: 2026-09-29

**Ruling: CONFIRMED at 3 items.** Three flag duties, each with its trigger and its routing.

## `#graceful-correction`

confirmer: lina
canonicalHash: sha256:cb24028b10a677344b45393388bfa066c482192ac17627b924b6ede638019ed7
items: correction-engage, correction-uncertain, correction-gap-feedback
date: 2026-09-29

**Ruling: CONFIRMED at 3 items.** Engage, admit uncertainty, and treat a gap as feedback: each is violable.

## `#fallibility`

confirmer: lina
canonicalHash: sha256:e0d3de4b303e471c0f30df1af9d2b0832c3d6581a58fb0efef9265c8c8a0d743
items: none
date: 2026-09-29

**Ruling: CONFIRMED at 0 items → clause (a), inapplicable.** A stance of reassurance ("You will sometimes be wrong. That's fine."). "What matters is honest analysis" names a value that `#candid-over-comfortable` and `#graceful-correction` (`correction-uncertain`) state as violable obligations. Nothing here binds beyond them.

## `#documentation-governance-ballot-measure-model:preamble`

confirmer: lina
canonicalHash: sha256:6100fb78ae5ff4e4f332c95cef229006cb8022ea6624a3ad8a552dff2a1b0ee5
items: shared-layer-not-unilateral
date: 2026-09-29

**Ruling: CONFIRMED at 1 item — TEXT CORRECTED (widened).** The draft was "You do NOT modify this layer unilaterally.", whose referent ("this layer") is defined only in the preceding sentence. Without it the item binds nothing specific: the prefix-truncation class, as at 11.2 Step 6. The item is now the complete line: "Steering docs and MCP-served documentation are the shared knowledge layer for all agents. You do NOT modify this layer unilaterally." The count is unchanged.

## `#the-process`

confirmer: lina
canonicalHash: sha256:7405eed001bcf70f166f07adb40e2782e8a7d16e807a54044f8f63d65c271297
items: ballot-propose, ballot-present, ballot-vote, ballot-apply
date: 2026-09-29

**Ruling: CONFIRMED at 4 items.** The four ballot steps, each with its bold label (a label that is also the step's name, kept as drafted) and its complete text.

## `#what-this-means-in-practice`

confirmer: lina
canonicalHash: sha256:8fb455b5399e8eebaaff5deee87ddc00be1600efb53cc9071bcca6a96d464034
items: practice-no-write, practice-no-edit-docs, practice-propose, practice-all-changes
date: 2026-09-29

**Ruling: CONFIRMED at 4 items.** Four prohibitions and duties, the first with its full parenthetical exception (the exception is part of the rule).

## `#mcp-practice-notes`

confirmer: lina
canonicalHash: sha256:5c767d6f46b533fa6747a6b40b284bc301dd8108cab485dc31789e12b1de472d
items: mcp-query-parent, schema-own-tokens, schema-no-inherited, schema-verify-own-code, rebuild-after-write, rebuild-application, rebuild-docs, mcp-fallback
date: 2026-09-29

**Ruling: CONFIRMED at 8 items.** Query-before-build; the schema rule (own tokens only, not inherited or composed, verified in own code); rebuild after write, with its two routes; and the fallback. The bold labels ("Schema authoring rule", "Write-side rebuild protocol", "Fallback") are labels; the fallback's condition ("if a server is unavailable") is inside its item. Not items: the Application-MCP description (what the tool returns), the staleness rationale, and the health-state list (reference values).

## `#collaboration-standards:preamble`

confirmer: lina
canonicalHash: sha256:3affabec49417d9644d83ab0c5c3552a80a5173d5d5305aa9b6828fcb2631f34
items: apply-aicp
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** Apply the principles; pull the framework on demand.

## `#counter-arguments-are-mandatory`

confirmer: lina
canonicalHash: sha256:c5a7e08942b56d10ffd605d49891973c6b2e82e178e800f7a92298949dd9eb2b
items: counter-provide, counter-never, counter-fold-back
date: 2026-09-29

**Ruling: CONFIRMED at 3 items.** Provide a counter-argument, never the one-sided form, and fold back before presenting. The quoted Shadow DOM recommendation is an illustration, not an item.

## `#candid-over-comfortable`

confirmer: lina
canonicalHash: sha256:3e908f39d63c06fe56b3abea2a39dfd08c515e8ba2fd4df351d2cb6e7c81e759
items: candid
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** Candid by default, blunt only on critical stakes: one rule with its escalation condition.

## `#bias-self-monitoring`

confirmer: lina
canonicalHash: sha256:4b1a07d0c663fef36de87199952669912c0f1e94ffca97de2402209a43247925
items: bias-watch, bias-name
date: 2026-09-29

**Ruling: CONFIRMED at 2 items.** Watch for the four patterns; name the bias when noticed.

## `#when-you-and-peter-disagree`

confirmer: lina
canonicalHash: sha256:c82414480e057b4ae6d51c4d8d99d73b456dcdb5b64a01f116d5e4cbeef4ce20
items: disagree
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** A four-part protocol stated as one sentence. Kept as one item: its parts are ordered, and splitting it would admit a rendering that keeps "respect it" without "provide your counter-arguments".

## `#what-you-own`

confirmer: lina
canonicalHash: sha256:387531edd342dee300be2578ee31ab040b14dd7c7246dac6f07e0d985bdc4e2d
items: own-unit-tests, own-contract-tests, own-token-compliance-tests, own-platform-tests
date: 2026-09-29

**Ruling: CONFIRMED at 4 items.** An enumeration of owned test kinds; each member is violable by not owning it.

## `#what-you-dont-own`

confirmer: lina
canonicalHash: sha256:f359d9135bb1bfba8540baeada04fcade5ca0e5b288ad7d1c02cbe6881ec0db8
items: not-own-audits, not-own-governance, not-own-formula-tests, jest-not-vitest
date: 2026-09-29

**Ruling: CONFIRMED at 4 items.** Three boundary members, plus Jest-not-Vitest (a command-form rule a consumer run violates with `--run`). The Commands-section pointer is a reference, not an item.

## Confirmation run summary (2026-09-29, phase one)

**Seat**: Lina (C1 owner seat), Spec 123 Task 15.5 phase one · **Branch**: `task/123-u2b-fr1-lina` from unit head `3d781922` · **Commit**: the one that adds this section. A commit cannot name its own SHA; it is the only commit on this branch, with subject `Task 15.5 phase one (lina): C1-confirm 26 operative-set units …`.

- **Units confirmed: 26** (my sheet's "Confirmations owed", every row).
  - `#identity`, `#ownership`, `#in-scope`, `#out-of-scope`, `#boundary-cases`, `#domain-boundary-response-examples`;
  - `#token-usage-in-components:preamble`, `#token-selection-priority-must-follow-this-order`, `#component-token-construction-rule`, `#when-a-token-is-missing`;
  - `#collaboration-model-domain-respect:preamble`, `#trust-by-default`, `#obligation-to-flag`, `#graceful-correction`, `#fallibility`;
  - `#documentation-governance-ballot-measure-model:preamble`, `#the-process`, `#what-this-means-in-practice`, `#mcp-practice-notes`;
  - `#collaboration-standards:preamble`, `#counter-arguments-are-mandatory`, `#candid-over-comfortable`, `#bias-self-monitoring`, `#when-you-and-peter-disagree`;
  - `#what-you-own`, `#what-you-dont-own`.

  The 13 blocks above them (Task 11.2) are byte-identical; this run only appended.
- **Items added: none. Items removed: none.** Every drafted item id is kept: 83 items across the 26 units (counted from the record).
- **Item text corrected: 1.** In `#documentation-governance-ballot-measure-model:preamble`, `shared-layer-not-unilateral` was widened from "You do NOT modify this layer unilaterally." to the complete line, which carries the referent: "Steering docs and MCP-served documentation are the shared knowledge layer for all agents. You do NOT modify this layer unilaterally." It is the prefix-truncation class (as at 11.2, Step 6). Verbatim: it is one line of the unit.
- **Zero-ruled units: 2**, both kept at 0 as drafted: `#domain-boundary-response-examples` (the examples illustrate obligations stated operatively elsewhere) and `#fallibility` (a stance; its value is stated as obligations in `#candid-over-comfortable` and `#graceful-correction`).
- **Drafts materially wrong: 1.** It is the truncation above: the draft's item bound "this layer" with no referent, so a rendering could keep the sentence and drop what it governs. The other 25 drafts were right. Thurgood's heuristic drafting held up well on this charter.
- **Residuals** (recorded, not fixed here):
  1. **The ordering obligation of `#token-selection-priority-must-follow-this-order` lives only in its heading** ("MUST follow this order"). Headings are labels (clause (c)), so it cannot be an item, and a verbatim-but-reordered rendering clears the floor. Routed review catches it; the mechanical half does not.
  2. **My `contract-system-reference` embed cites `.kiro/specs/063-uniform-contract-system/findings/canonical-name-mapping.md`**, a steward-repo spec path. It is a clause (i) deny-list class, and not mine to fix now (per the brief). It belongs to the embed's own disposition when the frontmatter rows are signed (phase two / the doc's owner).
  3. **For the orchestrator — `sweep.ts` sweeps the MAIN checkout.** `.kiro/specs/123-consumer-distribution/first-render/drafting/sweep.ts` hard-codes `R = '/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2/'`, so run from a side worktree it reports main's state, not the branch's. I did not edit it. I verified with the same `runFreshnessSweep` pointed at this worktree: **`lina findings: 0`**, with the other seats' `confirmation` findings remaining (`{"confirmation":323}` at this base). It needed no build outputs.
