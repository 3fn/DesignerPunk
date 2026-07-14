# Ballot Measures — Conventions & Ratification Protocol

**Date**: 2026-07-05
**Purpose**: How ballot measures are drafted, reviewed, ratified, and applied — including the record-first ratification protocol (Peter-approved 2026-07-05)
**Status**: Point-of-use convention. The durable law home for this protocol is a 125-formalization decision (classification map) with 122 propagating the agent-facing rule; see the inbound notes in both specs.

---

## Lifecycle

1. **Draft** — an agent (typically Thurgood for Civitas surfaces) authors the measure: problem evidence, proposed before→after edits for every affected site, scope decisions, reviewer list. Status: `DRAFT`.
2. **Review** — named reviewers respond per the Spec-Feedback-Protocol stamp format; the author incorporates (woven, not appended) and records the round in the ballot.
3. **Ratify** — Peter approves, modifies, or rejects.
4. **Apply** — the edits land exactly as written; verification per the measure's own mechanics (metadata validation, MCP index rebuild, straggler sweep).

## The Ratification Protocol (record-first) — approved by Peter, 2026-07-05

**Authority is a committed record, not a message.** The protocol:

1. When Peter ratifies, the session that received his ratification **first** updates the ballot's `Status` to `RATIFIED (Peter, <date>)` and **commits that record** — before any law edit is applied. The commit's author and timestamp make the ratification auditable.
2. Any agent asked to apply a ratified measure verifies **one mechanical fact**: the committed ballot says `RATIFIED`. If it does, apply; the applying agent makes **no authority judgment** about who relayed the instruction or how.
3. If the committed ballot does NOT say `RATIFIED`, do not apply — and do not refuse-and-stop either: report the missing record so the ratifying session can commit it. The failure mode to avoid is symmetric: rubber-stamping unverifiable claims AND refusing legitimate orchestration are both wrong; the record check replaces both judgments.

**Why (the 2026-07-05 lesson):** during this directory's first ballot, an applying agent refused a relayed ratification claim it could not verify — a refusal that added friction to a true ratification while providing no protection against a false one (the relaying session held the same write access and applied the edits itself). The gap was structural: authority existed only as a claim in a message. This protocol makes it a verifiable artifact instead — the same principle as the rest of the system's mechanical turn: *claims are suggestions; records are contracts.*

**End state (Spec 125 Phase 0+):** once the PR-gated workflow exists, ratification of governance-law changes becomes **Peter's PR approval** (branch protection + code-owner review on `governance/`) — platform-verified authority, superseding step 1's manual record for the cases the gate covers. The committed-record protocol remains for artifacts outside the gate's reach.

## Conventions

- **Location**: measures arising from specs live as spec artifacts (precedent: 118 Task 11, 117 Task 6); measures arising from governance reviews or standalone findings live here, named `YYYY-MM-DD-<slug>.md`.
- **Edit discipline**: apply "exactly as written"; if a before-text does not match, stop on that block and report — never adapt silently. Application should end with a mechanical sweep for the edit-class (a straggler grep), not trust in the enumerated list — every count in this directory's first ballot was wrong at least once (two → three → four occurrences); the sweep caught what the lists missed.

## Ballots on record

- [2026-07-05-documentation-task-type.md](2026-07-05-documentation-task-type.md) — RATIFIED (Peter, 2026-07-05). Defined the Documentation task type; origin of the ratification protocol above.
- [2026-07-11-claude-md-retirement.md](2026-07-11-claude-md-retirement.md) — RATIFIED (Peter, 2026-07-11). Retire the interim `CLAUDE.md` stopgap by superseding it with the generator's output (OB-7 closure); ratified record-first before the U10 swap PR (#66) merges.
- [2026-07-14-npm-test-imperative-prune.md](2026-07-14-npm-test-imperative-prune.md) — **RATIFIED (Peter, 2026-07-14)**. Applies the 125-B U1 pilot's candidate prune diff (Task 1.4), removing the npm-test rule's imperative *what*-restatements now that the 125-A required checks own that mechanically, while keeping all teaching (Jest-not-Vitest, lane selection) intact; probe + trial evidence attached.
