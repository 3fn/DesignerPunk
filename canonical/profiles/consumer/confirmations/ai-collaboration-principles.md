# Operative-set confirmation — `ai-collaboration-principles` (C1 carve-out)

**Record**: `canonical/operative-sets/ai-collaboration-principles.yaml`. Heuristically drafted by Thurgood (profile author) at Spec 123 Task 15.4, then confirmed and corrected here.
**Source**: `.kiro/steering/AI-Collaboration-Principles.md`. This is an always-set identity doc, loaded into every consumer agent's context.
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

## `#ai-collaboration-principles:preamble`

confirmer: stacy
canonicalHash: sha256:d31ab6271da795484db292e4adb89b0f7b6e332fa355414760cc1953de1bf0c3
items: none
date: 2026-09-29

**Ruling: CONFIRMED at 0, declared.** Doc metadata.

## `#the-ai-optimism-problem`

confirmer: stacy
canonicalHash: sha256:c3a3aaac8f054402759f667666c92a6a18f48840c1c4415d6e8d596469118600
items: antidote
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.** The four named biases are orientation. The list an agent actually watches is in `#bias-self-monitoring`.

## `#candid-vs-brutal-communication`

confirmer: stacy
canonicalHash: sha256:c4347b71cac9cb2ec86aa42708c95e9ba1e8565516470373afdede4bc5feccc5
items: mode-1, mode-2, default-candid
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.**

## `#counter-argument-requirement`

confirmer: stacy
canonicalHash: sha256:286834df7af21da197261639de28759cbcb34d485b8c9a9554c11629da2d6eb9
items: provide, fold-1, fold-2, fold-3, never-pitch, never-manufacture
date: 2026-09-29

**Ruling: CONFIRMED at 6, as drafted.** The quoted template is an illustration, and the ratification note is history.

## `#exploratory-vs-directive-questions`

confirmer: stacy
canonicalHash: sha256:85b5a0150ab0afa2818be54da970bb9cef587efba528655ad70599f98407d078
items: distinction, ask
date: 2026-09-29

**Ruling: CONFIRMED at 2, as drafted.**

## `#bias-self-monitoring`

confirmer: stacy
canonicalHash: sha256:9fec7f8e6991d0b71e0a96136af0ee0a29bb7ce21f81c30a3cdab8f984f7ec0c
items: watch-1, watch-2, watch-3, watch-4, name-it
date: 2026-09-29

**Ruling: CONFIRMED at 5, as drafted.**

## `#when-human-and-ai-disagree`

confirmer: stacy
canonicalHash: sha256:bb60ef44c4dc0e5409860788d7a2b97ae06fb6d5647c79bdc0bf1ddc34c9dfbf
items: disagree-1, disagree-2, disagree-3, disagree-4
date: 2026-09-29

**Ruling: CONFIRMED at 4, as drafted.** `disagree-1` is widened to carry its condition ("After providing counter-arguments, if human proceeds with their decision:"). Under the 11.3 convention, a condition that scopes an obligation is part of its text.

## `#certainty-calibration-finding-guidance-before-you-guess`

confirmer: stacy
canonicalHash: sha256:8314266276276ddf25145fa01cfaaf34961aa2f2ca0e1cd07e442e225502938f
items: calibrate-1, calibrate-2, conf-strong, conf-partial, conf-none, calibrate-3, signal-contract
date: 2026-09-29

**Ruling: CORRECTED 3 → 7.**
- `calibrate-1` is widened to carry its trigger ("When you are unsure where guidance lives, calibrate before acting").
- Added `conf-strong`, `conf-partial` and `conf-none`, the three responses to the signal. The drafted `calibrate-2` kept only its lead-in, which a rendering could keep while dropping all three responses.
- Added `signal-contract`, the `matchConfidence` shape the implementation reads.
- **Not operative**: "Guidance lives in the MCP-served corpus" (orientation) and the enumeration of emitting surfaces, which the text itself calls illustrative.

## `#mcp-query-for-full-framework`

confirmer: stacy
canonicalHash: sha256:3f2464f2de92c1977976653812dd53301e867c27a11012f6a0e9ca8bc77d596f
items: framework-query-full, framework-query-sections
date: 2026-09-29

**Ruling: CORRECTED 0 → 2.** The two query commands name the doc and sections agents query for the expanded protocols. The drafted zero was declared, but it was wrong.
