# Operative-set confirmation — `leonardo` (C1, owner seat)

**Record**: `canonical/operative-sets/leonardo.yaml` (drafted by Thurgood at 15.4; confirmed and corrected here)
**Source**: `canonical/agents/leonardo.md`
**Owner**: Leonardo · **Profile author**: Thurgood · **Confirmer**: **Leonardo**. Under C1 the owner confirms, because the owner is not the profile author (Req 11.6.5d; design C16).
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase one (C1 confirmation, all 44 units of the charter)

**Format**: Thurgood's convention, as adopted by Stacy and Lina. Each unit gets a `` ## `#anchor` `` heading, then `confirmer:`, `canonicalHash:`, `items:` (the record's ids, in record order, or `none`) and `date:`, then the ruling.

**The criterion applied throughout (5c)**: an item is operative if and only if a consumer implementation could violate it. Headings are labels. Orienting prose, rationale, inventory and pointers to where something lives are not items. **One test I applied consistently**: a lead-in sentence is an item when it carries a trigger or ordering that the items under it do not carry themselves (Lina's `scaffold-follow-stemma` precedent). It is not an item when that trigger is fully stated elsewhere in the charter, or when the lead-in is a bare label (Stacy's trimmed *It means:*).

**Record edits I made as confirmer** (in the same commit as this note; each is a reviewed diff):
- `#product-configuration-context`: 3 → 4, added `config-surface`.
- `#operational-mode-screen-specification:preamble`: 0 → 1, added `spec-follow-workflow`. **The unit is no longer inapplicable.**
- `#layout-specification`: 6 → 7, added `layout-consult-vocabulary` (kind `route`).
- `#skill-loading-sequence`: 8 → 9, added `load-trigger`.
- `#anti-slop-awareness`: 2 → 3, added `slop-run`.
- `#onboarding-awareness`: 6 → 7, added `onboarding-trigger`.
- Nothing removed; no drafted text re-worded. **Totals: 44 units, 135 → 141 items; two units at zero** (`#operational-mode-lessons-learned:preamble`, `#available-commands`).

**Strict-match note for phase two (5e)**: five items contain *Peter* (`leo-human-decides`, `out-6`, `human-1`, `currency-2`, `disagree`), and `leo-partner` contains *his*. All sit in units that are re-pointed under subtraction-2, so none of them will strict-match its own rendering. I kept the complete canonical text rather than trimming it to a fragment that survives the rename: trimming would game the matcher, and under-counting is the safe direction. The signer credits these by entailment from each unit's own rendering.

## `#identity`

confirmer: leonardo
canonicalHash: sha256:bf53cb67509dba2252d5fdcdaecfd027b6af0dfa337b2128d1111258bfb1cd9a
items: leo-role, leo-translate, leo-domain, leo-coordinate-system, leo-human-decides, leo-partner
date: 2026-09-29

**Ruling: CONFIRMED at 6 items, as drafted.** The role, the coherent-native-true-to-intent standard, the domain, system-gap coordination, and the human-lead/partner relation are each violable: a consumer Leonardo that implements, makes the final call, or ignores a system gap breaks one. **Not operative**: the name and Da Vinci paragraphs (orienting), the roster of sibling agents (inventory), and *"Your hand-off triggers live in your routing section."* (a pointer to where something lives). `leo-human-decides` and `leo-partner` will not strict-match this unit's re-pointed rendering (the subtraction-2 removal of *Peter*, *his* → *their*); that is an under-count by design, and the signer credits them by entailment from the rendering, not by widening the text.

## `#in-scope`

confirmer: leonardo
canonicalHash: sha256:cd2e971224fb16c096463b43d53797b42c96332217c16ef2be3d182c0a6e4475
items: scope-1, scope-2, scope-3, scope-4, scope-5, scope-6, scope-7, scope-8
date: 2026-09-29

**Ruling: CONFIRMED at 8 items.** Each bullet is a scope member; a consumer Leonardo that refuses one of these (e.g. leaves token selection to the platform agents) or does it by another route breaks it.

## `#product-configuration-context`

confirmer: leonardo
canonicalHash: sha256:5bfdc5247ea1104097bc8419e5ba3be179a635c28fce0b24e8e495828cff188f
items: config-surface, config-1, config-2, config-3
date: 2026-09-29

**Ruling: 3 → 4. Added `config-surface`; the draft missed the unit's anchor sentence.** *"Products configure DesignerPunk via `designerpunk.config.ts`:"* is the operative core of this unit: product configuration lives in that file, and directing a consumer to configure themes or token paths anywhere else violates it. The three bullets are read with it (they are the fields that file owns), so a rendering that kept the bullets and dropped the lead-in would lose the subject. The trailing colon is verbatim and can only make strict matching under-count. **`config-3` is borderline and kept**: it is a fact about the generator, but a screen spec references theme types by name, and naming the product-named type is conduct Leonardo can get wrong.

## `#product-tokens`

confirmer: leonardo
canonicalHash: sha256:ba16cfe01837021e91887864df5afe5b1f966e74e3d4f58af8cd6c40cff8c84c
items: product-tokens-where, product-tokens-1, product-tokens-2, product-tokens-3, product-tokens-4, product-tokens-5
date: 2026-09-29

**Ruling: CONFIRMED at 6 items.** The placement rule (product values in `product/tokens/{category}.yaml`, not Rosetta or Stemma) and the query → author → validate → generate → governance lifecycle are each violable: hand-reading token files instead of querying, skipping validation, or authoring without the routed governance.

## `#out-of-scope`

confirmer: leonardo
canonicalHash: sha256:abdff9e39c869c5423faf28f9fd4e313fdf541537c7e5751df7664cb29f12286
items: out-1, out-2, out-3, out-4, out-5, out-6
date: 2026-09-29

**Ruling: CONFIRMED at 6 items.** Boundary members: writing platform code, creating tokens/components, owning test governance, or making product decisions each violates one. `out-6` will not strict-match the re-pointed rendering (*Peter's job* → *your human lead's job*); credit by entailment.

## `#the-direct-vs-delegate-distinction`

confirmer: leonardo
canonicalHash: sha256:5c47f5eac1199a3403141895f3aad6d9766f045bec74b89552316a18ac3f0c33
items: direct-not-implement
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** *"This is critical."* is emphasis. The four Direct/Implement examples are illustrations of `direct-not-implement` and of the out-of-scope members; they add no separate obligation.

## `#operational-mode-screen-specification:preamble`

confirmer: leonardo
canonicalHash: sha256:b0d0686d5a60bd779304cf689ff63909edc5e1e5a1b1bf134e600d26d44897cc
items: spec-follow-workflow
date: 2026-09-29

**Ruling: 0 → 1. The draft was wrong to declare this unit inapplicable.** *"When specifying a screen, follow this workflow:"* carries a trigger (specifying a screen) and an obligation (follow the five steps). The step items are bare imperatives with no trigger of their own, so a rendering that kept the steps and dropped this sentence would lose when they apply. Same reasoning as Lina's `scaffold-follow-stemma` (it is not a bare lead-in like Stacy's trimmed *It means:*). **Consequence**: this unit now has dispositionable content, which can change its routing; the sheet must be re-run.

## `#step-1-understand-the-intent`

confirmer: leonardo
canonicalHash: sha256:28ae7146d14844823d27f32cc1715881ca49c59af078e5048508f512d696c412
items: intent-1, intent-2
date: 2026-09-29

**Ruling: CONFIRMED at 2 items.** Specifying before understanding the user need, or without settling register and novelty (which drive gate depth and color tier), violates them.

## `#step-2-select-components-via-application-mcp`

confirmer: leonardo
canonicalHash: sha256:ed16e03d74ee0c33b0567c58e45ede1226f766f5e98098e25a1885ef1bb1750e
items: select-1, select-2
date: 2026-09-29

**Ruling: CONFIRMED at 2 items.** Selecting components from memory instead of the Application MCP, or writing a custom layout without checking templates first, violates them.

## `#step-3-specify-the-screen:preamble`

confirmer: leonardo
canonicalHash: sha256:3bfa452cf198abf63cc4937876f190413f90cd7f099e8469f4f7d2f77907be2c
items: specify-1, specify-2, specify-3, specify-4, specify-5, specify-6, specify-7
date: 2026-09-29

**Ruling: CONFIRMED at 7 items.** Each bullet is a required section of a screen spec; a spec missing one (or using pixel values instead of semantic tokens) violates it. `specify-7` and `color-tier` are the same obligation stated in two units; both stay, and each is credited only from its own unit's rendering (5e).

## `#layout-specification`

confirmer: leonardo
canonicalHash: sha256:15be2503d691085f160f28a91035791517c9fcd6aeb807508e6c04d935075634
items: layout-required, layout-1, layout-2, layout-3, layout-4, layout-5, layout-consult-vocabulary
date: 2026-09-29

**Ruling: 6 → 7. Added `layout-consult-vocabulary` (kind `route`).** The closing sentence is a conditioned instruction (when actively writing layout sections → consult the routed vocabulary section), not orienting prose; a consumer Leonardo that writes the Layout section without it violates it. This is the same kind of item as the drafted `product-tokens-5`. The frontmatter route `routes.docs[layout-vocabulary]` does not credit this item (5e). *"Layout is not optional or implicit."* restates `layout-required` and is not a separate item. `layout-4` stays: in effect it directs re-evaluating proportions at the 8→12 transition.

## `#step-4-validate-assembly`

confirmer: leonardo
canonicalHash: sha256:0ff10ff00d2a67e948fefb2fc8462829c90e42f31799f3d9b20eee71bf5ffaa3
items: validate-1
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** Handing off an unvalidated tree, or leaving violations and gaps undocumented, violates it.

## `#step-5-hand-off-to-platform-agents`

confirmer: leonardo
canonicalHash: sha256:a94bac41487ac02255a157f3830f553a69428e7b02e054cfb3a6292307b8e550
items: handoff-1, handoff-2, handoff-3, handoff-4, handoff-protocol
date: 2026-09-29

**Ruling: CONFIRMED at 5 items.** The four hand-off steps and the protocol obligation are each violable (e.g. escalating a system gap directly to Lina instead of through Thurgood). *"Platform agents will ask frequent questions … not a failure mode."* is framing, not an item.

## `#operational-mode-lessons-learned:preamble`

confirmer: leonardo
canonicalHash: sha256:a0682bfa8193c496414f13f4012d35313e7c2405250a84c4df771932c1c6f6f3
items: none
date: 2026-09-29

**Ruling: CONFIRMED at zero items (INAPPLICABLE, 5d, declared).** *"When product work reveals something about the system that should be captured:"* is a subordinate lead-in with no main clause. Unlike the screen-specification preamble, the trigger it names is fully specified by the next unit (`#what-qualifies-as-a-lesson`, 7 members), and the obligation to capture is `capture-consistently`. Dropping it loses nothing a consumer could violate.

## `#what-qualifies-as-a-lesson`

confirmer: leonardo
canonicalHash: sha256:2e14f910bb6390cfd858cf99ed950d62b7705a94373b224e5dc08ee8e88db798
items: lesson-1, lesson-2, lesson-3, lesson-4, lesson-5, lesson-6, lesson-7
date: 2026-09-29

**Ruling: CONFIRMED at 7 items.** These are the capture triggers. A qualifying discovery that goes uncaptured violates the member that names it.

## `#capture-process`

confirmer: leonardo
canonicalHash: sha256:211de435222bb4327bc0f698c3b9be1c33f70c969b26736a54066368cf987500
items: capture-1, capture-2, capture-3, capture-4, capture-5, capture-consistently
date: 2026-09-29

**Ruling: CONFIRMED at 6 items.** The five ordered steps and the consistency obligation; skipping classification, or escalating a systemic gap without a structured request via Thurgood, violates them.

## `#structured-request-format`

confirmer: leonardo
canonicalHash: sha256:43ad431d9cb94fcf891d4c9f061c227a8d65df038c2219527d74d746d01f2de3
items: request-format
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** One sentence with five required fields. It is kept whole rather than split into five: a rendering that drops a field fails the item under strict matching (an under-count, the safe direction), and splitting would only let a partial rendering claim partial credit.

## `#operational-mode-cross-platform-review:preamble`

confirmer: leonardo
canonicalHash: sha256:b495b05b8235832ba01953bd534199a4540ee5d4a2fe7fc85124130756d82378
items: review-consistency, review-ambient-law
date: 2026-09-29

**Ruling: CONFIRMED at 2 items.** Reviewing for consistency and applying the decision framework reflexively are both violable. *"This is where your ambient law lives"* is orienting, and *"absent it, web patterns silently default onto iOS/Android"* is rationale.

## `#review-checklist`

confirmer: leonardo
canonicalHash: sha256:cfcaeb3f53301c1e457359d21e9f5a787c87b1f33290cbfc962f6f022787ed64
items: checklist-1, checklist-2, checklist-3, checklist-4, checklist-5
date: 2026-09-29

**Ruling: CONFIRMED at 5 items.** Each question is a review step that a review can skip.

## `#what-consistent-means-in-true-native`

confirmer: leonardo
canonicalHash: sha256:ae21efbfbb09593cc716b7247d97bb9e288b0a5a867a8df357a62969fd3891ff
items: consistent-not-identical, native-1, native-2, native-3, consistent-means
date: 2026-09-29

**Ruling: CONFIRMED at 5 items.** Demanding identical implementations, or accepting a non-native idiom on one platform, violates them. The trailing colon on `consistent-not-identical` is verbatim and kept, per Lina's `scaffold-follow-stemma` precedent: *"Each platform should feel native"* is itself an obligation, not a bare lead-in.

## `#operational-mode-design-creation-impeccable-skill:preamble`

confirmer: leonardo
canonicalHash: sha256:a0a755d5464a678d7a8d2c9db2272dd9a169ccd9c28972083b35f73583ded7be
items: use-impeccable
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** The drafted text stops before the parenthetical (*declared in your skills — …*), which is inventory. *"This extends your screen specification capability …"* is orienting.

## `#skill-loading-sequence`

confirmer: leonardo
canonicalHash: sha256:a0501862fd00c0427a43ac9ea00889f390f35b55ce7e04d453714d652487a92f
items: load-trigger, load-1, load-2, load-3, load-4, load-5, load-6, load-7, load-fallback
date: 2026-09-29

**Ruling: 8 → 9. Added `load-trigger`.** *"Before making visual decisions on a new surface:"* is the sequence's trigger and its ordering constraint (before). Loading the philosophy after the visual decisions are already made violates it, and the seven numbered steps carry no trigger of their own. Same reasoning as `spec-follow-workflow`.

## `#gate-system`

confirmer: leonardo
canonicalHash: sha256:64ad4fe8879abceefa45482e78ecc4787cf115524da586acbac3d47b892420a7
items: gate-1, gate-2, gate-3, gate-register, gate-novelty
date: 2026-09-29

**Ruling: CONFIRMED at 5 items.** *"Gate depth is proportional to surface novelty:"* is the principle the three members and the two rules fully encode; not a separate item. Skipping the human direction gate on a Novel surface, or ignoring the brand-register bump, violates them.

## `#color-strategy-declaration`

confirmer: leonardo
canonicalHash: sha256:6dbb3f1bf4e3274615a898767125de6dad3dcedd27818fd47198401af7d70e52
items: color-tier
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** A screen spec with no declared tier, or a tier used outside its stated scope (Drenched off a splash surface), violates it.

## `#conflict-resolution-hierarchy`

confirmer: leonardo
canonicalHash: sha256:cb4fc77c7f2d28c8d5d995536206cf7ffcbaebfe1e6e8602362673318a496ab4
items: conflict-order, conflict-note
date: 2026-09-29

**Ruling: CONFIRMED at 2 items.** Letting Impeccable taste override a DesignerPunk token or rule, or resolving a conflict silently without the `[CONFLICT]` note, violates them.

## `#anti-slop-awareness`

confirmer: leonardo
canonicalHash: sha256:bd75b09262211aecd99cf64e9b828543cd65715c73834a07f9d6fc4dee253253
items: slop-run, slop-first, slop-second
date: 2026-09-29

**Ruling: 2 → 3. Added `slop-run`.** *"Run category-reflex checks on visual output:"* is the obligation to run the checks and names what they run on. The two drafted items only define the checks and their rework rule; without the lead, nothing says they must be run.

## `#lessons-learned-capture`

confirmer: leonardo
canonicalHash: sha256:ea6f918b4a6d9acbf519e07a010571fb24bbe878b16d938e8bc487100c4d6d3e
items: flag-ambiguity
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** *"This feeds back into philosophy refinement."* is rationale.

## `#available-commands`

confirmer: leonardo
canonicalHash: sha256:67caa1dbac51ac185c72e09be9be5e9a8ff3976309569edf4d81d4e834816c03
items: none
date: 2026-09-29

**Ruling: CONFIRMED at zero items (INAPPLICABLE, 5d, declared).** The unit is an inventory of the Impeccable commands and where they live. Nothing in it can be violated.

## `#with-platform-agents`

confirmer: leonardo
canonicalHash: sha256:991e5eeec11caa38a1bae7156a72e1a2540a61e4d36257ae23af63cc191d681f
items: platform-1, platform-2, platform-3, platform-4
date: 2026-09-29

**Ruling: CONFIRMED at 4 items.** Handing a platform agent code instead of direction, letting a Tier 1 question sit, or overriding their framework expertise violates one.

## `#platform-scope-adaptation`

confirmer: leonardo
canonicalHash: sha256:aa44fd3b786a7ceca8106591856800a74b1e22eb0e494d3ea4d6a56d67f3c39e
items: scope-adapt
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** *"Not all platforms are active at all times."* is a fact; the obligation is to spec for the active platform without constraining the others prematurely.

## `#with-stacy-product-governance`

confirmer: leonardo
canonicalHash: sha256:3a03d43bf127894b7e5ed5e77bb1aeea618682c3ef322d416c2d04cdca099c2a
items: stacy-1
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.**

## `#with-system-agents-via-thurgood`

confirmer: leonardo
canonicalHash: sha256:d6a7a87d383ccd5af4c8fb695fb9b3efa880d2ec9e221526d92ad78691d92c92
items: system-1
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** Escalating directly to Ada or Lina violates it.

## `#with-peter`

confirmer: leonardo
canonicalHash: sha256:4644e5cc88b3e90c001f9beecb33d825cdcc7d441d0f9d01b6e336e43cc857ff
items: human-1
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** `human-1` will not strict-match the re-pointed rendering (*Peter* → *your human lead*, *his* → *their*); credit by entailment.

## `#mcp-practice-notes`

confirmer: leonardo
canonicalHash: sha256:18207433c33b82d65f6e432a9c4469d607bff044966a1d8b7963bb4fdf43480c
items: progressive-disclosure, rebuild-after-write, rebuild-product, rebuild-application, mcp-fallback
date: 2026-09-29

**Ruling: CONFIRMED at 5 items.** The progressive-disclosure order, the rebuild-after-write rule and its two routes, and the fallback are each violable. The server inventory and *"Health states: …"* are inventory, not items.

## `#onboarding-awareness`

confirmer: leonardo
canonicalHash: sha256:d3b9616971787a388f041ce34e006d4f78cad6d162f0a34d4a9d0d757ba3a5e4
items: onboarding-trigger, onboarding-1, onboarding-2, onboarding-3, onboarding-4, onboarding-5, onboarding-restart
date: 2026-09-29

**Ruling: 6 → 7. Added `onboarding-trigger`.** The lead-in is the trigger for the whole unit (setup, configuration, MCP, token-generation or getting-started questions in a product repo). The numbered steps carry no trigger of their own, so it is operative on the same reasoning as `spec-follow-workflow`. `onboarding-3`–`5` are kept as *for X, use Y* guidance a consumer Leonardo can get wrong, not as bare tool facts. *"(The CLI verbs above are in your Commands section …)"* is a pointer, not an item.

## `#what-you-own`

confirmer: leonardo
canonicalHash: sha256:017a69d62aca4fe4c188a257f351e266011d9bc7bb36dd02bd2884e601a6cbaf
items: own-1, own-2, own-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items.** Ownership members; handing off an incomplete spec, or skipping the consistency review, violates them.

## `#what-you-dont-own`

confirmer: leonardo
canonicalHash: sha256:61220e892755754c9bbd0f37effb34bd52457d2f5cca775ef8a9954c6493d619
items: not-own-1, not-own-2, not-own-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items.** Boundary members; writing platform tests or auditing coverage violates them.

## `#platform-currency-awareness`

confirmer: leonardo
canonicalHash: sha256:d22b6e7f861f59374271b2c3f3a75e257e18f0f6cafebdd3c7707070688bba0c
items: currency-1, currency-2, currency-3
date: 2026-09-29

**Ruling: CONFIRMED at 3 items.** The lead paragraph (training cutoff, *be aware of the limitation*) is orienting. `currency-2` will not strict-match the re-pointed rendering (*flag it to your human lead*); credit by entailment.

## `#collaboration-standards:preamble`

confirmer: leonardo
canonicalHash: sha256:3affabec49417d9644d83ab0c5c3552a80a5173d5d5305aa9b6828fcb2631f34
items: apply-aicp
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.**

## `#counter-arguments-are-mandatory`

confirmer: leonardo
canonicalHash: sha256:643f9bdd14dfd7173396f967770ad7f682ce5b2f2a7c851b96423ab15cee1186
items: counter-provide, counter-fold-back
date: 2026-09-29

**Ruling: CONFIRMED at 2 items.** Presenting a significant recommendation with no counter-argument, or presenting it without folding back first (or picking a fork on the human's behalf), violates them.

## `#candid-over-comfortable`

confirmer: leonardo
canonicalHash: sha256:b0c397345354a525addebbb9bf4e4d9d661e4238527b619b40959f6716fc258b
items: candid
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.**

## `#bias-self-monitoring`

confirmer: leonardo
canonicalHash: sha256:94f95b27bd5b0c802aadaa366c7536dc56827c45bec02f63e105cbc07f7c00fc
items: bias-watch, bias-name
date: 2026-09-29

**Ruling: CONFIRMED at 2 items.** Defaulting web patterns onto native platforms is the one that matters most for this seat.

## `#when-you-and-peter-disagree`

confirmer: leonardo
canonicalHash: sha256:fc99b47e67403652f801bf4602ecbf53d6b62c005d06f7b9db5424e8ef3cee01
items: disagree
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.** It will not strict-match the re-pointed rendering (*if your human lead proceeds*); credit by entailment.

## `#ask-if-unsure`

confirmer: leonardo
canonicalHash: sha256:c0821f4faee2a386619a9b7d425cb282e35d3635c81da358cd293df313d49135
items: ask
date: 2026-09-29

**Ruling: CONFIRMED at 1 item.**

## Confirmation run summary

- **Commit**: the commit that adds this note (`Agent: leonardo`, branch `task/123-u2b-fr1-leonardo`, from unit head `3d781922`); its SHA is in the handback.
- **Units confirmed**: 44 of 44. **Items**: 135 drafted → 141 confirmed.
- **Items added (6)**: `#product-configuration-context` + `config-surface`; `#operational-mode-screen-specification:preamble` + `spec-follow-workflow`; `#layout-specification` + `layout-consult-vocabulary` (route); `#skill-loading-sequence` + `load-trigger`; `#anti-slop-awareness` + `slop-run`; `#onboarding-awareness` + `onboarding-trigger`.
- **Items removed**: none. **Texts re-worded**: none.
- **Units ruled zero (INAPPLICABLE, declared)**: `#operational-mode-lessons-learned:preamble` and `#available-commands`.
- **Where the draft was materially wrong**:
  - `#operational-mode-screen-specification:preamble` was drafted inapplicable. It carries the only trigger for the five screen-specification steps, so it is operative.
  - `#product-configuration-context` omitted the unit's anchor sentence (the config file itself).
  - The other four additions are trigger lead-ins the draft treated as labels.
- **Verification**: the drafting `sweep.ts` hardcodes the MAIN repo path (`R = …/DesignerPunk-v2/`), so as shipped it sweeps the wrong tree from a worktree. I ran a scratch copy with `R` pointed at this worktree: ZERO `confirmation` findings for `leonardo.yaml` (305 total remain, all in other records; 349 − 44), and no findings of any other check.
- **Residuals**:
  1. The unit sheet must be re-run. The screen-spec preamble moved 0 → 1 item, and the other additions change item sets, so ROUTED classification can move.
  2. Six items will not strict-match their re-pointed renderings (the *Peter*/*his* rename). They need entailment credit at signing (5e), not text trimming.
  3. `sweep.ts`'s hardcoded root is a hazard for every worktree seat; flag to Thurgood.
