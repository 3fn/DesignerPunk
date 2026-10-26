# Signing-act chain, trigger (d): the delegate audit of Stacy-signed acts did not run at 16.1.0, and Peter's sample reads 0 / 135

**Date**: 2026-10-26
**Owner**: Thurgood (steward; the signing-act ballot's § 8 names Thurgood as the one who charters an issue when a trigger fires, and § 5.3 names Thurgood as the brief's author). **Owed acts by others**: Ada (the first delegate walk), the orchestrator (dispatching the delegate), Peter (his Stacy-signed sample, and the spec decision).
**Filed by**: Thurgood, under README rule 10. The source is Stacy's RELEASE phase-1 pass for 16.1.0, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` (PR #497), finding **RL-25** and standards implication **RS-37**. Rule 9 applies to every later edit.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-26, Thurgood, rule 12. The delegate audit is the half of the signing-chain verification that covers Stacy's own acts (§ 5.3). It did not run, so the chain is weaker than its claim that every act is walked. Nothing a reader meets is false, so it is not P0. Being `(guard)`, it goes to Peter at its first lapse, and trigger (d) already puts the spec question to him.)*
**Trigger**: `release:next:phase-1` — the next RELEASE phase 1 reads `Delegate audit (Stacy-signed, <seat>): k / N` with k = N and a committed file, and `Peter sample (Stacy-signed): k / N` with k ≥ 1. This record merges after 16.1.0's S (`ff3e7dad7`), so its first firing is the release after 16.1.0. It is closed by those two lines reading as owed, or by Peter's answer to trigger (d) (spec / drop / fix-now) recorded here. *Start condition (prose)*: none; the brief can be written now.

---

## What fired

From Stacy's record (RL-25), verbatim:
- `Delegate audit (Stacy-signed, Ada): 0 / 135 — no file at S (not run)`.
- `Peter sample (Stacy-signed): 0 / 135`.

N = 135, counted by Stacy from signature history (acts whose signing commit's `Agent:` trailer is `stacy`) over 16 PRs: #396 12 · #397 63 · #408 6 · #412 1 · #415 1 · #416 4 · #419 4 · #427 7 · #436 12 · #439 4 · #445 5 · #449 3 · #465 3 · #467 4 · #472 4 · #491 2. The backlog before 16.0.0 is additional. **Trigger (d)** (ballot `2026-10-01-signing-act-chain` § 8, as amended) fires on all three limbs: signing PRs reached RELEASE unwalked by the delegate; Peter's sample reads `0 / N` with N > 0; and the delegate line reads k < N with no committed file.

## What is owed, and by whom (ballot § 5.3)

1. **The brief: Thurgood.** It names the population, the command and the output path.
   - **Population**: every Stacy-signed act from Spec 123's MIDPOINT population (#262) inclusive, through the walk's base. This is the backlog § 5.3 names for the first delegate walk.
   - **Command**: `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --audit --pr <N> --signer stacy --store <the harness store>`, once per PR.
   - **Output**: `.kiro/specs/123-consumer-distribution/completion/delegate-audit-release-16.1.0-ada.md`.
   - **Pre-ratification acts** (before `2da74864`) are one counted line, `pre-ratification: <n> anomaly by rule, not triaged individually`. Anything else goes by act, as § 5.3 says.
2. **The dispatch: the orchestrator** dispatches Ada, the first delegate, as § 5.3 says.
3. **The walk: Ada.** She writes every per-act line verbatim to the file and commits it under her own `Agent:` trailer. She reports and does not rule.
4. **Peter's FAIL and anomaly line: Thurgood.** Any `FAIL` or `anomaly` on a Stacy-signed act goes to Peter as an `**Open for Peter**:` line in the PR that carries the delegate's file, relaying the delegate's line verbatim. That includes #285's `FAIL 7`, by name.
5. **Peter's sample: Peter.** At least one Stacy-signed act, blind re-judged at the next RELEASE.
6. **The spec decision: Peter.** Trigger (d) charters this issue, and Peter decides whether it becomes a spec. The likely subject is the identity work § 8 names (per-seat keys, M5).

## The class (RS-37)

Stacy's RS-37: the sitting-2 S5 amendment named who briefs and who dispatches the delegate audit, but no record or trigger fires it before a RELEASE phase 1, so the first walk under it was missed.

**The class fix, mine to draft**: the release walk (RELEASE-FLOW 3a) or the 5a step gains a pre-phase-1 owed item, "the delegate audit file for this release is committed, or its absence is a walk row". That is a LAW edit to RELEASE-FLOW, so it goes in a later ballot round, not in this record. Until then, this record's Trigger is the reminder: the next release's walk rows it, and its phase 1 reads it.

*Signed: Thurgood, 2026-10-26.*
