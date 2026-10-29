# Operative-set confirmation — `core-goals` (C1 carve-out)

**Record**: `canonical/operative-sets/core-goals.yaml`. Heuristically drafted by Thurgood (profile author) at Spec 123 Task 15.4, then confirmed and corrected here.
**Source**: `.kiro/steering/core-goals.md`. This is an always-set identity doc, loaded into every consumer agent's context.
**Owner**: no domain seat; the profile author drafted it. **Confirmer**: **Stacy**, under the C1 carve-out: the owner's seat is the profile author's, so the counterpart verification seat confirms (Req 11.6.5d).
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase one, run 2.

**Criterion**: 5c as narrowed on 2026-09-29, the classifier owner's "can contradict" reading: an item is operative if and only if a consumer's agents could act against it.
- That includes stated facts about a name, path, type shape or spelling they build against.
- Orientation, rationale, history, illustration, and rosters or counts that no agent acts on are not operative.
- Repo-specificity is a signing question, never an exclusion.

**The 11.3 convention**:
- A condition that scopes an obligation is part of that obligation's text.
- An item's own title line, and pure group labels, are labels (clause (c)).
- List markers are formatting.

**5d**: every zero is declared.

**Format**: the convention in `confirmations/stacy.md`. Record edits are made in the same commit as this note.

## `#core-goals:preamble`

confirmer: stacy
canonicalHash: sha256:9ceab4c201aa9ff76f5da236a29b4fa6c150df9b9cc5c6c65774d8dfea31471b
items: none
date: 2026-10-17

**Re-confirmed 2026-10-17 (Req 11.6.5d).**
- **What changed**: the body line `**Last Reviewed**: 2026-07-05` left the unit; the stamp now lives in the YAML frontmatter as `lastReviewed:`, which `splitFrontmatter` keeps outside `canonicalHash`. Ballot `.kiro/docs/ballots/2026-10-17-no-volatile-metadata-in-signed-units.md` (RATIFIED, Peter, 2026-10-17, #393) § 3.2; authoring commit `0274210a8` (Thurgood). No other text in the unit changed. The canonicalHash moves from `sha256:e108b8080b24e6b50ec31cad3e8bf9c19c9cddec7b1cba8f17f164fbc9e2e86a` to the value above.
- **Re-ruled**: what remains is the title and the metadata block (`Date`, `Purpose`, `Organization`, `Scope`, `Layer`, `Relevant Tasks`). No agent acts against doc metadata, and the removed line was never an item. The zero stays declared (5d).

**Ruling: CONFIRMED at 0, declared.**

**Ruling: CONFIRMED at 0, declared.** A doc-metadata block. No agent acts against doc metadata.

## `#core-project-context`

confirmer: stacy
canonicalHash: sha256:809e8be5a1088c68b6641c0fc1af3419698ced6ecd18007501a1c8df309e7491
items: principle-1, principle-2, principle-3, principle-4, principle-5, principle-6, platform-android, platform-web
date: 2026-09-29

**Ruling: CORRECTED 6 → 8.** Added `platform-android` and `platform-web`. "Not yet constrained" is a platform fact a consumer's agents build against: an agent that imposes a minimum version contradicts it. **Not operative**: the one-line orientation, and the "For detailed architectural guidance, see:" list (further reading).

## `#development-practices`

confirmer: stacy
canonicalHash: sha256:32062538bc2af63fb4f40fbcd0f063e08cc01a097e467f1b76e423117bae4da1
items: practice-1, practice-2, practice-3, practice-7, practice-8, practice-9, practice-10, practice-11, practice-12, practice-13, practice-14, token-selection-pointer, practice-19, practice-20, practice-21, practice-22, practice-26, practice-27
date: 2026-10-27

**Re-confirmed 2026-10-27 (Req 11.6.5d): the system-token review and token planning ballot, item 1 (site 1).** This is my third re-confirmation of this unit in three days (2026-10-25 twice, now 2026-10-27). It is a new act, read fresh. The second 2026-10-25 record below is superseded (canonicalHash `sha256:fcf0a61a2bd10969d9ccf666ed58ec66dfe36f658abcf4516ec2c6fce4e952f4`, 18 items).
- **What changed**: ballot `.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md` (RATIFIED, Peter, 2026-10-27, #493), site 1, was applied at `e6e5229ab` (Thurgood). L59 now scopes the review rule to system tokens and adds that a product token is planned at screen specification, and that a need the spec missed is surfaced, never filled silently. Both are pointed at Token Governance § "Token Creation Governance" and Product-Token-Governance § "Authoring Workflow" (both headings exist: L167, L56). The line ends with its amendment parenthetical. In the same commit the profile author re-quoted `practice-14`. I checked that L59 equals § 14's site 1 block byte for byte (by script).
- **What I read, in this session, through tool results**: `.kiro/steering/core-goals.md` L30–L79 (the unit, from `## Development Practices`), the `practice-14` item and the whole unit record in `canonical/operative-sets/core-goals.yaml`, and the overlay unit `always-set/core-goals.overlay.md` L23–L59.
- **The hash**: the canonicalHash moves from `sha256:fcf0a61a2bd10969d9ccf666ed58ec66dfe36f658abcf4516ec2c6fce4e952f4` to the value above. I recomputed it with `hashText` over `partition(splitFrontmatter(...).body).units` (unit `#development-practices`). It equals the overlay pin and the value `operative-set-freshness` printed.
- **Items re-read against the unit**: all 18 item texts are verbatim substrings of the unit as it now stands (checked by script), and `practice-14` is a verbatim substring of the applied L59. The new sentence is operative: an agent can act against it by filling a missed need silently, or by creating a product token without planning it. `practice-14` carries it with the review rule, as one item for one line. The amendment parenthetical is history, not an item. No other line of the unit changed.
- **Ruling: CONFIRMED at 18, not corrected.** The 2026-09-29 and second 2026-10-25 rulings below stand.

**Re-confirmed 2026-10-25, second time (Req 11.6.5d): the token-selection-order ballot, item 2.** A new act, read fresh, not carried from the first 2026-10-25 re-confirmation below; that record is superseded (canonicalHash `sha256:034af0fe252b4662058e6c4db8545e60cb5f6be71120c2a452044d1bcb6673f7`, 23 items).
- **What changed**: ballot `.kiro/docs/ballots/2026-10-25-token-selection-order-one-rule.md` (RATIFIED, Peter, 2026-10-25, #480), § 13.2, applied at `d9817512d` (Thurgood). The query block, the four-tier Token Selection Priority list, the Component Token Construction Rule and the "Why semantic first?" paragraph are replaced by one pointer line, **Token selection**, which names Token Governance § "Token Selection Matrix" as the one order. L51 (`practice-8`) gains "except a component's own token inside that component" (F-2 (B)); L58 (`practice-13`) reads "Use freely inside the component they belong to, for the property they were made for; any other use requires explicit human approval" (F-1 (b)). The profile author re-authored the items at `8b6e6f995`: `token-governance-query`, `practice-15` to `practice-18` and `construction-rule` removed, `token-selection-pointer` added, `practice-8` and `practice-13` re-quoted.
- **The hash**: the canonicalHash moves from `sha256:034af0fe252b4662058e6c4db8545e60cb5f6be71120c2a452044d1bcb6673f7` to the value above. `operative-set-freshness` printed it at `f8ab6d643`, and I recomputed it with `hashText` over `partition(splitFrontmatter(...).body).units` (unit `#development-practices`). The two agree, and the value equals the overlay pin (`always-set/core-goals.overlay.md`, `## @unit #development-practices @ sha256:fcf0a61a…`).
- **Items re-read against the unit**: all 18 item texts are verbatim substrings of the unit as it now stands (checked by script). The only new operative line is the pointer: it states a fact agents build against (where the one order lives) and an obligation (query it before choosing a token), and `token-selection-pointer` carries both in one item; its trailing amendment parenthetical is history, not an item. Every other line of the unit is unchanged or is an item re-quoted verbatim. The "For detailed … see:" lists stay further reading; L87 still names a heading that exists (`governance/Component-Development-Guide.md` § "Token Selection Decision Framework", L142).
- **Ruling: CONFIRMED at 18 (23 − 6 + 1), not corrected.** Two bullets of the 2026-09-29 ruling below retire with their items: the `token-governance-query` addition, and the widening of `practice-15` to carry "MUST follow this order" so that a reordering is detected. Core Goals no longer states an order, so there is nothing here to reorder. The order's only home is Token Governance § "Token Selection Matrix", and `token-selection-pointer` is what credits Core Goals' sending agents there. The rest of the 2026-09-29 ruling stands (`practice-3`; the not-operative lists).

**Re-confirmed 2026-10-25 (Req 11.6.5d): the served-docs token-name correction.** The prior record is superseded (canonicalHash `sha256:06bfac06966cb2bd1b0344f3e6ee26d2db6577e0ca62b05f88fe3e6106fa548f`, dated 2026-09-29).
- **What changed**: three sentences in the unit, all token names. The first example in the Token Selection Priority list reads `color.contrast.onAction` for content on action-colored backgrounds, `space.inset.100` for inset padding, where it read `tapAreaRecommended` and `color.contrast.onPrimary`. The third example reads `buttonicon.inset.medium = space125`, where it read `buttonIcon.inset.medium`. The rationale line under "Why semantic first?" now reads `space.inset.100` instead of `space100`, where it read `tapAreaRecommended`. Steering CORRECTION `ace4ff232` (Thurgood; Peter, 2026-10-25, relayed: "Fix all of them as the owners recommend"). The overlay pin was re-grounded at `3071015d2`, the rendering regenerated at `94ce930bf`, and the two items re-quoted at `46ae0efda`.
- **The hash**: the canonicalHash moves from `sha256:06bfac06966cb2bd1b0344f3e6ee26d2db6577e0ca62b05f88fe3e6106fa548f` to the value above. `operative-set-freshness` printed it, and I recomputed it independently with `hashText` over `partition(splitFrontmatter(...).body).units` (unit `#development-practices`); the two agree, and the value equals the overlay pin.
- **Items re-read against the unit**: `practice-15` and `practice-17` are verbatim substrings of the corrected unit as it now stands (L68 and L70). The "Why semantic first?" sentence is rationale, not an item, as ruled below. No other text in the unit changed, so the set stays at 23, not corrected again.
- **Re-ruled**: the 2026-09-29 ruling below stands.

**Ruling: CORRECTED 21 → 23.**
- Added `practice-3`: the repository is PR-gated, with branch protection that includes admins. Agents push against that.
- Added `token-governance-query`: the two `get_section` commands, which name the sections agents query.
- Widened `practice-15` to carry **"Token Selection Priority (MUST follow this order):"**. The order is the operative content: a rendering that reorders the four tiers keeps every member text, so without the lead-in nothing detects the reordering.
- **Not operative**: the "For detailed … see:" lists (further reading) and "Why semantic first?" (rationale). The group labels are labels, and their members carry their own modality.
