# Issue: C19's "absent or all-`TODO` personal note → Req 13 warning" is not implemented by the consumer emission lane, and cannot be there

**Date**: 2026-10-01
**Status**: ACTIVE
**Owner**: Lina (PRIMARY for Task 22; she authors the check, the catalog row and the `emitConsumer` input). Task 22's `tasks.md` row will need amending at its kickoff (see "Grant gap" below), so that amendment routes through Thurgood's formalization seat.
**Trigger**: **Task 22's kickoff (the U3 cut, `task/123-u3-onboarding`)**. By that event a check design is on the branch's first commit: where the note is read, what `emitConsumer` is handed, and the catalog row for the warning. Why this event and not an earlier one:
- Task 22 (success criterion 1; subtasks 22.1) already owns the note's lifecycle: `templates/personal-note.template.md`, `generate` creating an absent note, and "an all-`TODO` note counts as absent (tests)". The check needs the same reading code, so it should be written once, with the creation path.
- Before U3 nothing creates the note at all. 16.6's packed-install block asserts `.designerpunk/personal-note.local.md` is **ABSENT** until U3 (`tasks.md` 16.6 line, the 2026-09-30 amendment: "ABSENT until U3 (Task 22; C19's degradation), asserted, never skipped"). So until U3 the always-absent case is the **designed** state, and a warning on every emission would be noise on a path the plan has chosen not to fix yet.
- **One earlier event I considered and am NOT making the trigger, but name as a verify-by**: what **Kiro** does at session start with a `resources` entry whose `file://` target does not exist. I have not measured it. Release 2 ships before U3 (release 3), so every release-2 Kiro consumer carries that entry pointing at a file nothing has created. If Kiro errors or prompts on a missing resource, the cost lands on release 2's users and this issue's trigger moves up to **before release 2's RELEASE record opens**, with the smaller fix (drop the entry at attach/init when the file is absent). I will record the measured behaviour in this file before that record opens; if it is benign, the trigger stays at Task 22. CC's `@`-import of a missing file I also have not measured.

**Source**:
- **Design C19**, `.kiro/specs/123-consumer-distribution/design.md` **L655** (U2b's unit branch; `origin/task/123-u2b-profile`): "**Personal note**: a template member. The always-layer references `.designerpunk/personal-note.local.md`. Absent, or **all slots still `TODO`**, → treated as absent, with Req 13's warning (Leonardo A14)." The same design says it again at L757: "A note whose slots are all `TODO` is treated as absent (C19), so agents never read an unfilled template as instructions."
- **My Task 16.1 completion doc**, `completion/task-16-1-completion.md` § "Application-time adaptations" item 5 ("Carried, for routing").
- **Peter's direction** (2026-10-01) that carried items be captured as tracked issues by their owners.

---

## The gap

`tools/agent-generator/consumer-entry.ts` (`emitConsumer`, 16.1) takes `{ packageRoot, consumerRoot, target, mode }` and **never reads `consumerRoot`**. That is a tested property (`consumer-entry.paths.test.ts`: every fs read resolves under `packageRoot`, none under `consumerRoot`, and decoys planted in `consumerRoot` never reach an emitted byte). It is also what makes C20's "shipped inputs only" true.

So the lane emits the personal-note surfaces **unconditionally**:
- CC: the first line of the `CLAUDE.md` region, `@.designerpunk/personal-note.local.md`, ahead of the eight `@.claude/identity/designerpunk-<id>.md` lines.
- Kiro: the `file://` `resources` entry for `.designerpunk/personal-note.local.md` in each config.

C19's "treated as absent, with Req 13's warning" needs the consumer's file, so the lane cannot decide it. **Nothing emits the warning today, and no catalog row carries its text**: `src/cli/shared/errorCatalog.ts` has `consumerDegradationMessage` (the missing-shipped-input form) and `personalNoteNamingMessage` (the `init` naming line), neither of which says "your note is missing or unfilled". The design's catalog table has a row for "generate created the personal note" (info) and none for the absent/all-`TODO` warning.

## Where the check can honestly live

Not in `emitConsumer`. Purity (never reads the consumer's repo) is worth more than the check, and the paths test would have to be weakened to admit it.

**In the caller that already holds the consumer's repo**, which then hands the lane a fact rather than a path:
- The installer commands in `src/cli` (`init`, `attach`, `generate`) read `.designerpunk/personal-note.local.md` (present? all slots `TODO`?) and pass `emitConsumer` an input such as `personalNote: 'present' | 'absent'`. On `'absent'` the lane omits the region line and the Kiro resource and the caller prints the warning (exit 0, Req 13). The lane still reads nothing from `consumerRoot`; it receives a boolean.
- **Task 22 is the natural owner** of the reading code: 22.1 defines "all-`TODO`" for `generate`'s create-if-absent path, and the all-`TODO`-as-absent test is its success criterion. Writing the check anywhere else would duplicate that definition.
- `init` and `attach` at 16.2/16.3 could stat the file earlier, but pre-U3 there is nothing to detect except "never created", which is the designed state (above).

## Fix (at Task 22)

1. Define "all slots `TODO`" once, in the code that creates the note (22.1), exported for the check.
2. Add the `personalNote` input to `emitConsumer` (default: today's always-emit behaviour, so existing callers and the 16.1 parity test are unchanged); on `'absent'`, drop the CC region line and the Kiro resource.
3. `init`/`attach`/`generate`/`sync` compute the input and print the warning. **Author the warning text as a design catalog row first** (it has none), then the `errorCatalog.ts` function; the design row is the orchestrator's/Thurgood's to route, as the 16.1 completion doc did for the degradation form.
4. Tests: a note absent, a note present, and a note with all slots `TODO` per target; the region/resources change, the warning, and exit 0. Bite: make the check read `'present'` unconditionally, and the all-`TODO` case must go red.

## Grant gap

Task 22's Primary Artifacts (`tasks.md`) are `templates/personal-note.template.md`, `src/cli/{init,generate}.ts`, the scaffold, tests and `CHANGELOG.md`. The fix also needs `tools/agent-generator/consumer-entry.ts` (the new input), `src/cli/shared/errorCatalog.ts` (the warning) and likely `src/cli/attach.ts` / `src/cli/sync/**` (callers). Those are not on Task 22's row; the row needs a pre-execution amendment at the U3 cut. Not a blocker, but a surprise if found late.

## Counter-argument and what survives

- **Against deferring**: until U3, every release-2 consumer carries an `@`-import and a Kiro resource for a file nothing creates, with no warning; "designed state" means the plan accepted it, not that it is harmless. That is exactly the unmeasured Kiro behaviour named in the trigger.
- **Against the caller-passes-a-fact design**: it makes `emitConsumer`'s contract depend on every caller computing the same fact the same way (init, attach, generate and sync each need it). A forgotten caller emits a dangling reference silently. The default of "always emit" is the safe-looking choice and is also the one that hides the omission. A fork the design should surface at the U3 cut rather than settle here: **default-emit with an opt-out** (above, backwards-compatible) versus **a required input** (loud, but touches every caller and the 16.1 tests).

## Not in scope here

Any edit to `consumer-entry.ts`, `errorCatalog.ts` or `design.md`. This issue is the tracked flag and the proposed shape.

---

## 2026-10-03: the Kiro missing-resource measurement (owed above; now made)

**Owed and late, as owned.** The "verify-by" in this issue's Trigger section said I would record Kiro's behaviour with a missing `file://` resource "in this file before release 2's RELEASE record opens". The measurement was due before release 2's RELEASE record opened and was **not made then**; release 15.0.0 shipped with every Kiro consumer carrying the `.designerpunk/personal-note.local.md` entry unmeasured. I found it unrecorded at the Spec 123 U3 kickoff round (2026-10-03). The measurement below was run by Peter by hand that day because I had no Kiro session.

**Evidence, copied verbatim** from the orchestrator's scratch record `u3-kickoff/kiro-measure-result.md` (scratch is not a citable record; this section is the record):

> # Kiro missing-`file://`-resource measurement — RESULT (run by Peter, 2026-10-03)
>
> Run by Peter by hand in the Terminal panel, after his own `kiro-cli login`; read from the tab by the orchestrator.
> `kiro-cli 2.12.1`, agent `probe` (`.kiro/agents/probe.json`, `resources: ["file://.designerpunk/personal-note.local.md"]`), model shown `claude-sonnet-4.5`.
>
> ## Non-interactive (`kiro-measure.log`)
> - present: `validate exit=0`; chat answered `NONE` / `No resources failed to load.`; `chat exit=0`
> - absent: `validate exit=0`; chat answered `NONE` / `No resources failed to load.`; `chat exit=0`
> - todo: `validate exit=0`; chat run not captured in the log at the time of reading
> - The model's `NONE` is not discriminating (it said NONE in the control too). The exit codes and the absence of any warning are the evidence here.
>
> ## Interactive `/context show` (verbatim, trimmed)
>
> present/:
> ```
> Active agent context: probe
>   – .designerpunk/personal-note.local.md 0.0%
>   – AGENTS.md 0.0% (no matches)
>   – README.md 0.0% (no matches)
> ```
>
> absent/:
> ```
> Active agent context: probe
>   – .designerpunk/personal-note.local.md 0.0% (no matches)
>   – AGENTS.md 0.0% (no matches)
>   – README.md 0.0% (no matches)
> ```
>
> ## Reading
> - A `file://` resource whose target does not exist: `agent validate` passes, the session starts, no warning, no error, no prompt; `/context show` lists the path as `(no matches)`, the same way Kiro lists its own default `AGENTS.md` / `README.md` entries.
> - Outcome row in `kiro-measure.md`: "Silent skip … the session continues" → mechanism B's residual is benign; no extra guard needed.
> - Not measured: the all-TODO case interactively (expected: loaded as content); CC's `@`-import of a missing file (stays at U5 C8(c)).

**What this settles.** The trigger condition I named for moving this issue up (Kiro erroring or prompting on a missing resource) did not occur: a missing target is skipped silently, so release 2's Kiro consumers were not harmed and this issue's trigger stays at Task 22's kickoff. **What it does not settle**: the all-`TODO` case interactively (not captured), and CC's `@`-import of a missing file (stays with U5 C8(c)).

**Peter's ruling on the mechanism, as relayed by the orchestrator (one line):** the reference is always emitted and the note is created from a template that declares itself unfilled; the plan amendment in PR #296 carries the design. (That is the "default-emit" side of the fork named under "Counter-argument and what survives" above. This section records the relay; the ruling's record is the amendment.)
