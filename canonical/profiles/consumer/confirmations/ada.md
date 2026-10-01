# Operative-set confirmation — `ada` (C1, owner seat)

**Record**: `canonical/operative-sets/ada.yaml` (drafted by Thurgood at 15.4; confirmed and corrected here)
**Source**: `canonical/agents/ada.md`
**Owner**: Ada · **Profile author**: Thurgood · **Confirmer**: **Ada**. Under C1 the owner confirms, because the owner is not the profile author (Req 11.6.5d; design C16).
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase one (C1 confirmation), all 22 body units

**Format**: the convention Stacy and Lina use. Each unit gets a `` ## `#anchor` `` heading, then `confirmer:`, `canonicalHash:`, `items:` (the record's ids in record order, or `none`) and `date:` lines, then the ruling.

**The criterion applied throughout (5c)**: an item is operative if and only if a consumer implementation could violate it. Orienting prose, illustration, pointers and inventories are not items. Headings are labels (clause (c)). **Repo-bound referents** (`Peter`, `src/…` paths, `.kiro/steering/`) stay inside item text. They are read re-keyed to the consumer's repo (5b/5e), and they can only make strict matching under-count.

**An extra check I applied: dangling referents.** An item whose text leans on a referent outside itself ("this layer", "them") can be strictly credited even when a rendering has changed that referent. That is an over-count, the dangerous direction for the floor's soundness. Where the referent is not itself an item, I widened the item's text to carry it.

**Record edits I made as confirmer** (same commit as this note; ids stable, text verbatim from the unit):
- `#identity`: `ada-handoff` widened to include the roster sentence it depends on. Count unchanged (5).
- `#fallibility`: 0 → 1 item, `fallibility-honest-analysis` added.
- `#documentation-governance-ballot-measure-model:preamble`: `shared-layer-not-unilateral` widened to the whole two-sentence paragraph. Count unchanged (1).
- Nothing removed. **Totals: 22 units, 67 items** (66 drafted + 1 added). One unit is inapplicable: `#domain-boundary-response-examples`.

## `#identity`

confirmer: ada
canonicalHash: sha256:44083518dc3f6088b38053f8e44c411b215949d68d33df0f866dd31ab951cacd
items: ada-role, ada-domain, ada-handoff, ada-human-decides, ada-partner
date: 2026-09-29

**Ruling: CONFIRMED at 5 items; `ada-handoff` text widened.**
- The five items are the role, the domain, the hand-off duty, human-decides and partner-not-tool. Each is violable by a consumer Ada.
- **`ada-handoff` widened** to carry the roster sentence it depends on. *"bring them in"* has no content without *who* "them" is, and the roster is not itself an item. With the short text, a rendering that changed the roster but kept the hand-off sentence verbatim would be strictly credited though the obligation changed: an over-count. Widened, strict matching can only under-count.
- `ada-partner`'s "his" is carried by `ada-human-decides`, which is itself an item, so a changed referent already shows as an uncredited item. Left as drafted.
- **Not operative**: the name line and the Lovelace paragraph (orienting).

## `#ownership`

confirmer: ada
canonicalHash: sha256:3ded028ab1ffb2357d84c28b4e21cb0195380dea82bd822c44e8a85a2fa5de11
items: own-all-tokens, own-gradient, own-consult
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**
- *"There is no separation …"* and *"Every token in the repo is Ada's domain."* restate `own-all-tokens`: an implementation that violates either also violates it. *"The package is a starting point the product molds."* is orienting. None added.

## `#in-scope`

confirmer: ada
canonicalHash: sha256:3a09069dc398675a590bae57b1b3ad676e377c54e2dd018190b6f24ff4aa1570
items: scope-create, scope-math, scope-compliance, scope-docs, scope-testing, scope-naming, scope-output, scope-hierarchy, scope-coverage, scope-theme-registry, scope-pipeline-config, scope-theme-output, scope-config-authoring
date: 2026-09-29

**Ruling: CONFIRMED at 13 items, as drafted.**
- Each bullet is a scope member; a consumer Ada that refuses or disowns it violates the boundary.
- The `src/…` paths in `scope-theme-registry` and `scope-pipeline-config` are repo-bound referents. Under 5b/5e they are read re-keyed to the consumer's repo, so they stay inside the item text; they can only make strict matching under-count.

## `#out-of-scope`

confirmer: ada
canonicalHash: sha256:ff02d3db0cfbbc8f5f6e559f9b24e3bb5e7e8c25b31e6d257b495d9ad225edeb
items: out-components, out-contract-tests, out-test-governance, out-spec
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.** Each is a boundary member a consumer Ada could violate by doing the work itself.

## `#boundary-cases`

confirmer: ada
canonicalHash: sha256:da14e1d586acbe086f063d5cb40dae171c00b0c920dd30f2c3bef5aba428dc20
items: boundary-flag, boundary-token-side, boundary-coordinate
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.** Flag, handle the token side, recommend coordination: three separable duties.

## `#domain-boundary-response-examples`

confirmer: ada
canonicalHash: sha256:49db60be3377b0e507684708aff0f9fc0d188815d5539e0a244a39e0a159d8f3
items: none
date: 2026-09-29

**Ruling: CONFIRMED INAPPLICABLE — 0 items, declared.**
- The three quoted responses are illustration. The duties they illustrate are items elsewhere: `boundary-flag`, `boundary-token-side` and `boundary-coordinate` in `#boundary-cases`, and the hand-offs in `routes.agents`. A consumer rendering with different example wording violates nothing.

## `#collaboration-model-domain-respect:preamble`

confirmer: ada
canonicalHash: sha256:f1037c902db3927079385e883cce8aadec5669d26c7b1d5496b5788700b625fd
items: respect-not-adversarial
date: 2026-09-29

**Ruling: CONFIRMED at 1 item, as drafted.**
- A close call, kept. The sentence is the posture that the three subsections implement, and a consumer Ada acting as an adversarial check on Lina's or Thurgood's work violates it. Keeping a borderline item errs in the safe direction (5d: a shrunken denominator is the dangerous one).

## `#trust-by-default`

confirmer: ada
canonicalHash: sha256:26aa05bc71d50eef8942126ba3e1a5d4f48ee0cd49201b95ea1e639edf1617ed
items: trust-lina, trust-thurgood, trust-human
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**

## `#obligation-to-flag`

confirmer: ada
canonicalHash: sha256:11e93daeb6a596bd53ea8f35d74afe24f98c19a459636be88f4696015ecc07dd
items: flag-hardcoded, flag-compliance, flag-impact
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**

## `#graceful-correction`

confirmer: ada
canonicalHash: sha256:64d58f35fbdb106bf9de4d10327f90c45176906f322caf233748f25d899d4ecc
items: correction-engage, correction-uncertain, correction-gap-feedback
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**

## `#fallibility`

confirmer: ada
canonicalHash: sha256:e0d3de4b303e471c0f30df1af9d2b0832c3d6581a58fb0efef9265c8c8a0d743
items: fallibility-honest-analysis
date: 2026-09-29

**Ruling: 1 item, not 0. Added `fallibility-honest-analysis`.**
- *"What matters is honest analysis, not perfect answers."* sets a priority a consumer Ada can violate: presenting confident but unverified answers to look right, or hiding an error rather than stating it. Under 5c that is a constraint, not orientation.
- **Not operative**: *"You will sometimes be wrong."* (a prediction) and *"That's fine."* (a permission, which cannot be violated).
- **A close call.** It overlaps `correction-uncertain`, but is not entailed by it: that item covers uncertainty, this one covers the priority when an answer is already given.
- **Routing effect: none today.** The unit's disposition is `retained`, so the rendering is byte-identical.

## `#documentation-governance-ballot-measure-model:preamble`

confirmer: ada
canonicalHash: sha256:6100fb78ae5ff4e4f332c95cef229006cb8022ea6624a3ad8a552dff2a1b0ee5
items: shared-layer-not-unilateral
date: 2026-09-29

**Ruling: CONFIRMED at 1 item; `shared-layer-not-unilateral` text widened to the whole paragraph.**
- *"You do NOT modify this layer unilaterally."* has no object without the preceding sentence, which says what "this layer" is. A rendering that re-scoped the layer but kept the prohibition verbatim would be strictly credited: an over-count. Widened, strict matching can only under-count.
- **Routing effect: none today.** The disposition is `retained`, so the rendering is byte-identical.

## `#the-process`

confirmer: ada
canonicalHash: sha256:b3789a681fdb211007318ae59931d647c6f8c95c3fc3d464810dfc4f2aa4f301
items: ballot-propose, ballot-present, ballot-vote, ballot-apply
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.** Four ordered steps; skipping or reordering any one violates the process.

## `#what-this-means-in-practice`

confirmer: ada
canonicalHash: sha256:14c402faa7c9fd123a507e98320af8663679c5aefcabb2275acb66c73674eae9
items: practice-no-write, practice-no-edit-docs, practice-propose, practice-all-changes, practice-ambient-law
date: 2026-09-29

**Ruling: CONFIRMED at 5 items, as drafted.**
- `practice-no-write` names repo paths (`.kiro/steering/`, `governance/`). They are repo-bound referents, read re-keyed to the consumer's repo under 5b/5e, and stay inside the text.
- `practice-ambient-law` stays an item: it binds the autonomy levels as law. A rendering that drops the embed pointer or softens "apply them as written" violates it.

## `#mcp-practice-notes`

confirmer: ada
canonicalHash: sha256:aadf5a9d342686f5f03853534212c2a39a3b5c1e00d39befd5eb1805822903a7
items: rebuild-after-write, rebuild-application, rebuild-docs, mcp-fallback
date: 2026-09-29

**Ruling: CONFIRMED at 4 items, as drafted.**
- **Not operative**: the opening sentence (a pointer), the parenthetical rationale, and *"Health states: …"* (an inventory of values).
- `rebuild-after-write`'s "the matching rebuild" is resolved by the two route items that follow, both of which are themselves items.

## `#collaboration-standards:preamble`

confirmer: ada
canonicalHash: sha256:3affabec49417d9644d83ab0c5c3552a80a5173d5d5305aa9b6828fcb2631f34
items: apply-aicp
date: 2026-09-29

**Ruling: CONFIRMED at 1 item, as drafted.**

## `#counter-arguments-are-mandatory`

confirmer: ada
canonicalHash: sha256:266124ce3cf14ef76d20832ff1c27007e74a276b5a6b23af437992390d8b0636
items: counter-provide, counter-never, counter-fold-back
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**
- The quoted `color.feedback.error.text` recommendation is illustration and is not an item.
- `counter-provide`'s trailing colon, which is the lead-in to that example, stays inside the verbatim text. It can only make strict matching under-count.

## `#candid-over-comfortable`

confirmer: ada
canonicalHash: sha256:683759458252dec25f5e5295126310b24c638f884e369b821fd94cd2c1c97155
items: candid
date: 2026-09-29

**Ruling: CONFIRMED at 1 item, as drafted.**

## `#bias-self-monitoring`

confirmer: ada
canonicalHash: sha256:4b1a07d0c663fef36de87199952669912c0f1e94ffca97de2402209a43247925
items: bias-watch, bias-name
date: 2026-09-29

**Ruling: CONFIRMED at 2 items, as drafted.** Watching and naming are separable duties: an agent can watch silently.

## `#when-you-and-peter-disagree`

confirmer: ada
canonicalHash: sha256:c82414480e057b4ae6d51c4d8d99d73b456dcdb5b64a01f116d5e4cbeef4ce20
items: disagree
date: 2026-09-29

**Ruling: CONFIRMED at 1 item, as drafted.** "Peter" is a repo-bound referent, read as the human lead.

## `#what-you-own`

confirmer: ada
canonicalHash: sha256:55b36a89e5613f680a5b2820afda0eb1ee44c1d11c7c0c93211545a1bdeff119
items: own-formula-tests, own-compliance-tests, own-relationship-tests
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**

## `#what-you-dont-own`

confirmer: ada
canonicalHash: sha256:10acce8a1e7e308fd45c7052dd01f9434b8aa25cf444b60afe807cc77ceb84de
items: not-own-contract-tests, not-own-audits, jest-not-vitest
date: 2026-09-29

**Ruling: CONFIRMED at 3 items, as drafted.**
- **`jest-not-vitest` kept, deliberately.** *"This project uses Jest"* is a repo fact, but the sentence also carries an obligation: run the project's actual test runner, not a wrong one or a wrong flag. Read with its referent re-keyed to the consumer's repo (5b/5e), a consumer Ada can violate it.
- The overlay's re-pointing (*"Run token tests with your repo's own test runner and scripts …"*) is what a phase-two signer judges against this item, so it should not be dropped here as a bare repo fact.
- **Not operative**: *"Your test commands … are in the Commands section."* (a pointer).

## Confirmation run summary

- **Units confirmed**: 22 of 22 (Req 11.6.5d, C1 owner seat).
- **Items added**: `#fallibility` · `fallibility-honest-analysis`. **Items removed**: none.
- **Items re-worded**, to widen them and carry their referent (ids stable): `#identity` · `ada-handoff`; `#documentation-governance-ballot-measure-model:preamble` · `shared-layer-not-unilateral`.
- **Units ruled zero (inapplicable, declared)**: `#domain-boundary-response-examples`.
- **Where the draft was materially wrong**: `#fallibility`. It was drafted at zero, but its last sentence is a violable priority (5c). The two widenings fix a latent over-count, not a wrong item.
- **Residuals**:
  1. **Neither changed unit gets new routing.** Both are `retained`, so their renderings are byte-identical. Even so, the hash sheet should be re-run after this lands, per the sheet's own note.
  2. **The dangling-referent check was applied only to Ada's record.** Other records may carry the same latent over-count. This is flagged for the profile author (Thurgood); I did not fix it.
  3. **`#fallibility` and `#collaboration-model-domain-respect:preamble` are close calls, kept on the safe side of 5d.** If Peter or Thurgood read them as orienting, removing the items would be a one-line change each.
