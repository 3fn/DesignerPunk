# Issue: U12 cannot reach zero `harness-ios-tokens` entries without the probe's one-line fix; the grant

**Date**: 2026-11-08
**Owner**: Kenya
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/task-18-completion.md` — the event that owes the close is U12's merge (PR #781, branch `task/129-closeout`), which brings that doc to `main`. The close is this record's rule 5 outcome line, giving the fixing PR's number and the granted-file diff.
**Source**: Spec 129 Req 1.2 (D1): zero entries in the expected-failure lists at U12's head; `.kiro/issues/2026-11-08-probe-swift-providerreads-not-mainactor.md` (the defect and its one-line fix).

---

## What blocks it

`harness/expected/harness-ios-tokens.tsv` holds one entry, `probe:Probe.swift | non-Sendable 'some View'-typed result … 'harnessConsumerTheme' …` (count 3), tagged to the record above. Its fix is in `scripts/harness/probe-swift.ts`, which Task 18 does not list. My standing scope over that file activates at the later of U12's merge and the first iOS promotion's merge, so until then no one owns it: this grant is the write path.

## Grant paths

`scripts/harness/probe-swift.ts`, only line 310: `'func probeReads() {',` becomes `'@MainActor func probeReads() {',`.
`harness/expected/harness-ios-tokens.tsv`, only the removal of the one `probe:Probe.swift | non-Sendable …` entry (the comment header stays).
No probe test or fixture file changes: `probe-swift.test.ts` and the fixtures do not reference `probeReads` (verified by grep); if the fix forces one, this grant is amended before it is touched.

## The fixing PR

U12's PR (#781, branch `task/129-closeout`).

## Acceptance

1. `grep -c '@MainActor func probeReads' scripts/harness/probe-swift.ts` prints `1`; `grep -c 'harnessConsumerTheme' harness/expected/harness-ios-tokens.tsv` prints `0`.
2. `harness-ios-tokens` concludes success with zero entries at U12's head, and no `main actor-isolated instance method` key is reported.
3. No other list, lane file or fixture changes; `probe-swift.test.ts` passes.

Counter-argument and what survives: waiting for the standing scope would avoid a grant, but U12's merge is what activates it, so D1 would then close only on a later PR and Req 1.2 would fail at U12's head. What survives: the fix is verifiable only by CI's macOS lane (no Swift here), so a wrong guess costs a U12 re-run; and `@MainActor` on the probe assumes the generated provider stays main-actor for all adopters' View extensions.

Consult: Thurgood owns `harness/expected/**`; the edit is removal of the one entry its own tag names, per its stated removal rule. Not otherwise in his scope.

---

## Outcome

Open.
