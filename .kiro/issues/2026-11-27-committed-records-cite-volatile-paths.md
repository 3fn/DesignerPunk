# Committed records cite volatile paths: session scratch folders and local transcripts

**Date**: 2026-11-27
**Owner**: Thurgood (Civitas infrastructure: what a committed record may cite). **Filed by**: Thurgood, under README rule 10, at the monthly walk (`.kiro/docs/civitas-health-checks/2026-11-27.md` § "The volatile-path incident"), from the orchestrator's incident report of 2026-11-27. Rule 9 applies to every later edit.
**Class**: P2 obligation (record) · defect *(set 2026-11-27, Thurgood, rule 12. A record's pointer resolves to nothing once the folder it names is cleared. A reader who follows it finds no file, not a false one, so no reader is misled into a wrong belief; the harm is evidence that can no longer be checked.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S. By then a rule saying what a committed record may cite has been put to Peter as a ballot item (drafted by Thurgood, the rule below or its revision). Either the rule is ratified and applied with its check, or Peter's dated answer drops it or routes it to a spec, appended here. Start condition (prose): none; the drafting can start at once.
**Consulted**: none needed at filing. This record states a defect and its fix shape and changes no seat's surface. The ballot that carries the rule consults Stacy (claims passes cite evidence), Ada and Lina (they write evidence files), and the orchestrator's practice (it writes the briefs and consult files at issue).

---

## The incident (2026-11-27)

A machine restart (an OS update, between 2026-11-13 and 2026-11-27) cleared the orchestrator's session scratchpad, `/private/tmp/claude-501/<project>/<session>/scratchpad/`. Committed ruling records cited files in it. The consult round files, the J-sample packets, the sealed key and the agents' blind answers were lost. The orchestrator rebuilt most of them from the session's own transcripts (`/Users/3fn/Documents/Work Projects/Kiro/j-blind-16.3.0/RECOVERY.md`, outside the repository), and PR #861 commits the 15 consult files under `.kiro/specs/129-consumer-generation-completeness/evidence/consult-163/`. Two packets (P2 and P4) are not trusted as rebuilt, and the sealed key and the builder's README are not recovered.

## The class

A committed record names a location that does not live in git, as the place its evidence is kept. Two kinds of location are volatile:

1. **Session scratch folders** (`/private/tmp/…/scratchpad/…`, written `scratchpad/<file>` for short). macOS clears `/private/tmp` at restart, so the folder can vanish at any reboot.
2. **Session transcripts** (`~/.claude/projects/<project>/…/*.jsonl`). They sit on one machine only. This machine deletes them after `cleanupPeriodDays`, 180 in `~/.claude/settings.json` at 2026-11-27, and the oldest transcript left is dated 2026-09-20. The signing-act chain's `--audit` reads transcripts to anchor acts (link 5), so an act older than the retention period cannot be re-read on this machine.

## Measured at `3a3bd072b`

- `git grep -l -E '/private/tmp/|/tmp/claude-|scratchpad/'` (excluding `.claude/`): **88 files, 395 lines.** Most are provenance ("a scratch worktree at …", "run in a scratch copy"), which loses nothing when the folder goes. The defect is the subset that names the folder as where evidence lives and does not carry that evidence itself. Examples at the root:
  - `.kiro/issues/2026-11-05-signing-act-prevention-four-fixes.md` L11: "The consult notes Peter read … (orchestrator scratch, 2026-11-05)". It restates their substance below, so the loss is the verbatim text.
  - `.kiro/issues/2026-10-25-web-prop-mapping-rule-gap.md` L8 (`scratchpad/read-e5-stacy.md`) and `.kiro/issues/2026-10-25-avatar-agent-svg-hardcoded-border-width.md` L4 (`scratchpad/cross-read-schema-pass-ada.md`): reads cited as sources.
  - `.kiro/issues/2026-11-12-dtcg-generation-failed-warning-false-in-release-builds.md` L13: the release dry-run and publish logs (`scratchpad/release/…`).
  - The ballots splice consult files "byte for byte" from scratch (`2026-11-07-native-lane-ownership.md` L670, L1138; `2026-10-26-system-token-review-and-token-planning.md` L1467 and after). Splicing keeps the text, so these lose nothing. They show the practice that already works.
- `git grep -l -E '\.claude/projects/|\.jsonl' -- .kiro canonical`: **56 files** cite transcripts.

This census is not a sort: which of the 88 lose evidence is the fixing PR's first job.

## The fix shape (the rule to put to Peter)

1. **Rule**: what a committed record relies on as evidence is committed in the repository by the PR that records it (spliced into the record, or as a file under the spec's `evidence/` or the record's own folder), or it is a URL of a GitHub object (a PR, a comment, a run). A volatile location may be named only as provenance, marked `(volatile; not evidence)`. The precedent is README rule 10's CORRECTION clause, which already requires the cited observation record to resolve at the merge commit (`git cat-file -e <m>:<path>`).
2. **Check**: a warn-only check reads each PR's added lines in `.kiro/issues/**`, `.kiro/docs/ballots/**`, `.kiro/specs/*/evidence/**` and `.kiro/specs/*/completion/**` and lists every volatile path without the marker. It starts from a baseline of today's 88 files, so it fails nothing. Where it lives (a new script under a grant, or a mode of `scripts/issues-owned.sh --pr`, which already reads PR diffs) is the ballot's choice, because either changes a ratified contract or needs a grant.
3. **Transcripts**: an act whose only anchor is a transcript keeps its anchor in git as well. This means the act's commit or record quotes what the audit reads. It belongs to the signing-act ballot route (`.kiro/issues/2026-11-05-signing-act-prevention-four-fixes.md`), and that ballot is named here, not duplicated.

**Why a record and not a Spec 131 inbound.** Spec 131 (governance simplification) is parked behind Spec 132's first family. An inbound would leave this obligation with no owner or trigger until 131's requirements. The ballot that carries the rule names 131 as consulted, so the rule does not add law that 131 would then remove. **Surviving counter-argument**: this is one more rule in a corpus whose cost Spec 131 exists to cut, and a habit (splice, do not cite) may be enough without a rule. The ledger answer is that a habit already existed (the ballots splice), and the losses came from the records that did not follow it.
