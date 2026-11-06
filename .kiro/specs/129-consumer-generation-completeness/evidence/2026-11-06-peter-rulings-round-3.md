# Peter's rulings, 2026-11-06 23:31Z: theme parameter shape, module owner, composite fixture, cold-run counting

**Recorded by**: the orchestrator (primary session). This is a record of a ruling, not law.
**Received**: 2026-11-06T23:31:58Z (`date -u`, read when the ruling arrived).
**Follows**: `2026-11-06-peter-rulings-theme-and-downloads.md` (22:38Z ruling; PR #702).

## Peter's words, verbatim

> A enum, B Thurgood, C confirmed, D yes; merges done

## What each answered

Peter read these options in the orchestrator's message just before the ruling. The paraphrase below is the orchestrator's; only the quoted line above is Peter's. The seats' positions are those of the cross-read round 3 (Ada, Kenya, Data, Leonardo, Thurgood).

- **A enum.** The 6(b) theme-choice parameter is a generated per-consumer `<Name>ThemeFamily` enum: `base`, `wcag`, and one case per other registered theme. It defaults to `base`, and the provider switches light/dark inside itself. This follows Leonardo's dissent and the orchestrator's lean. Ada, Kenya and Data leaned to the light/dark pair.
  - **Not yet ruled:** what a theme registered for only one mode shows in the other scheme. Ada and Leonardo: it falls back to base. Kenya and Data: it always shows its one mode, with `wcag`/`dark` exempt. This was put to Peter again in the orchestrator's reply.
- **B Thurgood.** Thurgood owns and authors the shared harness module, `scripts/harness/native-rules.ts`, with its test, as a Task 5 subtask done first. It is written from the design text. Ada is consulted on every rule change; Kenya and Data review their own platform's rules. Tasks 3 and 4 import it and keep no local copy, and nothing under `src/` imports `scripts/harness/`. (Thurgood's and Data's lean; Ada and Kenya leaned Kenya.)
- **C confirmed.** The composite product token leaves the harness fixture in Task 11, with dated amendments to Req 2.3, 2.8 and 5.6, and `harness/fixtures/product-tokens/**` added to Task 11's Primary Artifacts. There is no probe filter. Data's reads-equal-emits criterion is dropped. Whether `generate` refuses outright or skips with a warning stays a Task 11 decision, measured under Req 10.4, with Ada consulted.
- **D yes.** Decision 6 condition 3's Android clause counts only pull-request runs, as Peter ruled for iOS at 14:04:52Z. On both platforms, a cold run counts only if it reached the comparator: it carries the `harness-verdict` annotation, written on a FAIL verdict too. This is new law, so it needs a dated amendment and a `stability.test.ts` case.
- **"merges done".** At 23:31:58Z, GitHub showed PRs #700, #701 and #702 as OPEN, not merged, and `main` was still at `233e04bf1`. The orchestrator reported this back to Peter. The stub precondition is not met until #700 shows merged.

## Correction recorded with this ruling

In the options message, the orchestrator first claimed that a stock `wcag` (mode `light`) adopter gets plain base dark from `wcagDark`. That claim was wrong. Ada showed from the source that dark-wcag is composed as `dark` + `wcag` + `dark-wcag` (`src/generators/generateTokenFiles.ts` L195), and the orchestrator checked that line. The orchestrator corrected it before Peter ruled.
