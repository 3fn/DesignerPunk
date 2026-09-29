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
canonicalHash: sha256:e108b8080b24e6b50ec31cad3e8bf9c19c9cddec7b1cba8f17f164fbc9e2e86a
items: none
date: 2026-09-29

**Ruling: CONFIRMED at 0, declared.** A doc-metadata block. No agent acts against doc metadata.

## `#core-project-context`

confirmer: stacy
canonicalHash: sha256:809e8be5a1088c68b6641c0fc1af3419698ced6ecd18007501a1c8df309e7491
items: principle-1, principle-2, principle-3, principle-4, principle-5, principle-6, platform-android, platform-web
date: 2026-09-29

**Ruling: CORRECTED 6 → 8.** Added `platform-android` and `platform-web`. "Not yet constrained" is a platform fact a consumer's agents build against: an agent that imposes a minimum version contradicts it. **Not operative**: the one-line orientation, and the "For detailed architectural guidance, see:" list (further reading).

## `#development-practices`

confirmer: stacy
canonicalHash: sha256:06bfac06966cb2bd1b0344f3e6ee26d2db6577e0ca62b05f88fe3e6106fa548f
items: practice-1, practice-2, practice-3, practice-7, practice-8, practice-9, practice-10, practice-11, practice-12, practice-13, practice-14, token-governance-query, practice-15, practice-16, practice-17, practice-18, practice-19, practice-20, practice-21, practice-22, practice-26, practice-27, construction-rule
date: 2026-09-29

**Ruling: CORRECTED 21 → 23.**
- Added `practice-3`: the repository is PR-gated, with branch protection that includes admins. Agents push against that.
- Added `token-governance-query`: the two `get_section` commands, which name the sections agents query.
- Widened `practice-15` to carry **"Token Selection Priority (MUST follow this order):"**. The order is the operative content: a rendering that reorders the four tiers keeps every member text, so without the lead-in nothing detects the reordering.
- **Not operative**: the "For detailed … see:" lists (further reading) and "Why semantic first?" (rationale). The group labels are labels, and their members carry their own modality.
