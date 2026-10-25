# Signatures — `core-goals` consumer profile (C1: signer **Stacy**)

**Rows**: `canonical/profiles/consumer/core-goals.dispositions.yaml`. **Signer**: Stacy. This is an identity doc with no domain owner, so she signs in the C1 carve-out seat: the profile author drafted it, and the counterpart seat signs.
**Rule**: Req 11.6.5e. An item is credited only if the unit's **own** rendering (`canonical/_consumer-output/_canonical/…`) states or entails it. A function that survives only elsewhere earns no credit here. `surviving: []` is itemized.
**Phase two, run 2**, 2026-09-29, Spec 123 Task 15.5.

## `#core-project-context`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/core-goals.dispositions.yaml` · body · `#core-project-context` (re-pointed; ROUTED)
canonicalHash: sha256:809e8be5a1088c68b6641c0fc1af3419698ced6ecd18007501a1c8df309e7491
renderedHash: sha256:565e95a14c1ad36cd9b5021573286ba03f044f4b0e679747639cb51327195f26
verdict: assent — surviving 8/8

All eight survive; the orientation line is re-grounded ("built on DesignerPunk … carries its principles"), and the further-reading pointers move to docs-MCP ids, which are not items.

## `#development-practices`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/core-goals.dispositions.yaml` · body · `#development-practices` (re-pointed; ROUTED)
canonicalHash: sha256:06bfac06966cb2bd1b0344f3e6ee26d2db6577e0ca62b05f88fe3e6106fa548f
renderedHash: sha256:c700853a4b4478d63395839552ee81cf9435d968f9fe30cf52a90ab3d212f99c
verdict: assent — surviving 21/23; not surviving: `practice-1`, `practice-3`

`practice-2` survives as its consumer counterpart: the repo's own completion flow, with the human lead's acceptance as the authorization act. **Not surviving**: `practice-1`, whose "automated git integration" is dropped with nothing in its place; and `practice-3`, this repository and its protection settings, which has no consumer counterpart. The token items survive verbatim.

**Re-signed 2026-10-25 (served-docs token-name correction): ASSENT, `surviving` unchanged at 21 of 23 (`practice-2`, `practice-7` to `practice-14`, `token-governance-query`, `practice-15` to `practice-22`, `practice-26`, `practice-27`, `construction-rule`).** A new act, not a correction of the 2026-09-29 one. Steering CORRECTION `ace4ff232` changed three token names in the canonical unit; the overlay pin was re-grounded at `3071015d2`, the rendering regenerated at `94ce930bf`, and `practice-15` and `practice-17` re-quoted at `46ae0efda`.
- **What I read, in this session.** The unit as rendered in `canonical/_consumer-output/cc/.claude/identity/designerpunk-core-goals.md` (the `## Development Practices` section, committed at `94ce930bf`). The Token Selection Priority list reads: *"1. **Semantic tokens** — purpose-built for specific use cases (e.g., `color.contrast.onAction` for content on action-colored backgrounds, `space.inset.100` for inset padding)"* and *"3. **Component tokens referencing primitives** — ... (e.g., `buttonicon.inset.medium = space125`)"*.
- **`practice-15` and `practice-17` survive.** Each was re-quoted to the corrected sentence, and the rendering states each verbatim, with the lead-in and the four-tier order intact. Tiers 2 and 4 (`practice-16`, `practice-18`) are unchanged.
- **Credited, unchanged**: `practice-2` (the rendering keeps the repo-neutral task-completion flow with the human lead's acceptance as the authorization act), `practice-7` to `practice-14` and `token-governance-query` (verbatim), `practice-19` to `practice-22` (verbatim), `practice-26`, `practice-27` and `construction-rule` (verbatim). **Not surviving, as before**: `practice-1` (nothing in the rendering states the automated git integration) and `practice-3` (this repository's protection settings have no consumer counterpart). The removed sentence in the "Why semantic first?" paragraph is rationale and no item.
- **Hashes.** `canonicalHash` moves `06bfac06...` to `034af0fe...` (`hashText` of the unit from `partition(body).units`, equal to the overlay pin and to the sweep's current value). `renderedHash` moves `c700853a...` to `cfa33acb...` (`renderedHashOf` over the committed rendering, `rowSpanSource('.kiro/steering/core-goals.md', 'body', '#development-practices')`).
- **Not mine, flagged**: the row's `removals` array is authoring and I did not touch it. The re-pointed unit's three removals are unaffected by this correction, since none quotes a changed sentence.
