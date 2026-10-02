# Operative-set confirmation — `spec-feedback-protocol` (C1 carve-out)

**Record**: `canonical/operative-sets/spec-feedback-protocol.yaml`. Heuristically drafted by Thurgood (profile author) at Spec 123 Task 15.4, then confirmed and corrected here.
**Source**: `.kiro/steering/Spec-Feedback-Protocol.md`. This is an always-set identity doc, loaded into every consumer agent's context.
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

## `#spec-feedback-protocol:preamble`

confirmer: stacy
canonicalHash: sha256:971f7ffb246e7ee5a545823f7c05c117abd8c0831fdaecebe30ef1bed23e26ad
items: none
date: 2026-09-29

**Ruling: CONFIRMED at 0, declared.** Doc metadata.

## `#purpose`

confirmer: stacy
canonicalHash: sha256:56696d5886fef9d062b449d53934d4a3134d1f4c1a8bf76a48a64941d35aceaa
items: none
date: 2026-09-29

**Ruling: CONFIRMED at 0, declared.** Orientation and rationale.

## `#the-feedback-document`

confirmer: stacy
canonicalHash: sha256:d00728b168aff102e37150a194326db06961716079b11fc526ab1304d15f021d
items: the-feedback-document-1, single-file-path, split-path, the-feedback-document-2, single-file-valid, feedback-location, the-feedback-document-3
date: 2026-09-29

**Ruling: CORRECTED 3 → 7.** Added `single-file-path` and `split-path` (the two layouts agents create), `single-file-valid` and `feedback-location`. Widened `the-feedback-document-2` to carry its referent ("The split structure is preferred …").

## `#feedback-checkpoints`

confirmer: stacy
canonicalHash: sha256:29749a21da5a77241eb6d845aaf10c7f93007216c29ace8083fe25bcd86a3cfb
items: feedback-checkpoints-1, feedback-checkpoints-2, feedback-checkpoints-3, feedback-checkpoints-4, multiple-rounds
date: 2026-09-29

**Ruling: CORRECTED 4 → 5.** Added `multiple-rounds`.

## `#stakeholder-identification`

confirmer: stacy
canonicalHash: sha256:30146705abb20ed2bb23e95be2bd7fcc0029037a482439e1c53bd99df2277a89
items: stakeholder-identificati-1, stakeholder-identificati-2, stakeholder-identificati-3, stakeholder-identificati-4, stakeholder-identificati-5, stakeholder-identificati-6
date: 2026-09-29

**Ruling: CONFIRMED at 6, as drafted.**
- Widened `stakeholder-identificati-2` to carry "**Selection criteria** — tag agents who:" (the 11.3 convention). The four criteria had no verb without it.
- Widened `stakeholder-identificati-6` to carry its referent.

## `#sequential-formalization-gate`

confirmer: stacy
canonicalHash: sha256:b7a5853defd008b54f28db5575277efa12f3a247ebed7cf8e587cdec5f3c0b8c
items: sequential-formalization-1, sequential-formalization-2, sequential-formalization-3, sequential-formalization-4, sequential-formalization-5, waiver
date: 2026-09-29

**Ruling: CONFIRMED at 6, as drafted.** The **Rationale** paragraph is rationale.

## `#mandatory-mention-scanning`

confirmer: stacy
canonicalHash: sha256:4ffc9761a0246dbdb5bdaf4eaf0d9158a741315c070cb38047cee006494b6d61
items: mandatory-mention-scanni-1, mandatory-mention-scanni-2, mandatory-mention-scanni-3, mandatory-mention-scanni-4
date: 2026-09-29

**Ruling: CONFIRMED at 4, as drafted.** `mandatory-mention-scanni-2` is widened to carry "When entering a feedback round:".

## `#stamp-format`

confirmer: stacy
canonicalHash: sha256:e49c9c84d0adca4d162c160752976eb2000fd97e254ed9b842b614feac6f4ad8
items: stamp-format-1, stamp-pattern, round-reset
date: 2026-09-29

**Ruling: CORRECTED 4 → 3.**
- Added `stamp-pattern` (`[AGENT_NAME R#]`), the exact format the obligation names. The draft carried the obligation's lead-in without the format.
- Added `round-reset`.
- Removed `stamp-format-2` to `-4`, the three examples, which illustrate the pattern.

## `#standard-feedback`

confirmer: stacy
canonicalHash: sha256:9dafe73b3db687ddb007d505c5e2c135e8f173ab3301fed2dba0e92e8598d80e
items: entry-format, section-reference
date: 2026-09-29

**Ruling: CORRECTED 0 → 2.** `entry-format` and `section-reference`. The draft zeroed the format sections that agents write in.

## `#directed-questions`

confirmer: stacy
canonicalHash: sha256:952158838c4db54378cb62c6419697678ca756c2da77da98b86e59b852f7f686
items: directed-format, directed-asker, directed-response
date: 2026-09-29

**Ruling: CORRECTED 0 → 3.** `directed-format`, `directed-asker` and `directed-response`.

## `#incorporation-notes`

confirmer: stacy
canonicalHash: sha256:cada68e93324818530dc59bd3eb699554c5467b4f95c01e7a175d427782ce503
items: incorporation-format
date: 2026-09-29

**Ruling: CORRECTED 0 → 1.** `incorporation-format`, the shape of an incorporation entry.

## `#context-for-reviewers`

confirmer: stacy
canonicalHash: sha256:55dcaed52b9e861ea41c02d5990a183e6d4315575f71a2b996a089866f07a859
items: context-block, context-for-reviewers-1, context-for-reviewers-2, context-for-reviewers-3, follow-references, context-format
date: 2026-09-29

**Ruling: CORRECTED 3 → 6.** Added `context-block`, `follow-references` and `context-format`. "This prevents re-litigation" is rationale.

## `#resolution-tracking`

confirmer: stacy
canonicalHash: sha256:665ad56546624d4518aaff814bc70c96a103c58051caede004e932daa348bf93
items: resolutions-in-feedback, clean-artifacts
date: 2026-09-29

**Ruling: CORRECTED 0 → 2.** `resolutions-in-feedback` and `clean-artifacts`. "The working history" line is orientation.

## `#spec-feedback-template`

confirmer: stacy
canonicalHash: sha256:66a2bec4ca25951cddbae7fd0b505eca4c2a60f495f3c4fe90ed4d39002792db
items: template
date: 2026-09-29

**Ruling: CORRECTED 0 → 1.** `template`: the feedback document's required structure.

## `#document-access`

confirmer: stacy
canonicalHash: sha256:6ffb28191285a1ff3707dd24043c0e7f2a4a6e5c3d988a6c11398fed9bbccf81
items: document-access-1, document-access-2
date: 2026-09-29

**Ruling: CONFIRMED at 2, as drafted.**
