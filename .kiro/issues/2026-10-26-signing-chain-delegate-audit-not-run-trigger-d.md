# Signing-act chain, trigger (d): the delegate audit of Stacy-signed acts did not run at 16.1.0, and Peter's sample reads 0 / 135

**Date**: 2026-10-26
**Owners**: Thurgood (steward; the signing-act ballot's § 8 names Thurgood as the one who charters an issue when a trigger fires, and § 5.3 names Thurgood as the brief's author); Ada (the first delegate walk). **Owed acts by others**: the orchestrator (dispatching the delegate), Peter (his Stacy-signed sample, and the spec decision). *(Owner line before 2026-11-05, rewritten for the owners sweep: **Owner**: Thurgood (steward; the signing-act ballot's § 8 names Thurgood as the one who charters an issue when a trigger fires, and § 5.3 names Thurgood as the brief's author). **Owed acts by others**: Ada (the first delegate walk), the orchestrator (dispatching the delegate), Peter (his Stacy-signed sample, and the spec decision).)*
**Filed by**: Thurgood, under README rule 10. The source is Stacy's RELEASE phase-1 pass for 16.1.0, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` (PR #497), finding **RL-25** and standards implication **RS-37**. Rule 9 applies to every later edit.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-26, Thurgood, rule 12. The delegate audit is the half of the signing-chain verification that covers Stacy's own acts (§ 5.3). It did not run, so the chain is weaker than its claim that every act is walked. Nothing a reader meets is false, so it is not P0. Being `(guard)`, it goes to Peter at its first lapse, and trigger (d) already puts the spec question to him.)*
**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the event that owes the close is Spec 131's requirements: the first commit that adds them takes this record's open half (Peter's sample of Stacy-signed acts, and the spec decision) in, or leaves it out with a reason (`governance/Process-Spec-Planning.md` § "Before Formalizing: Records That Name the Spec"). If they leave it out without a reason, it lapses and returns to Peter (rule 11).
*Trigger re-ruled 2026-11-04 (Thurgood, owner, rules 9 and 11). The delegate half is met (the partial outcome below). The disposition, quoted from the 16.2.0 walk record's delegation table: "delegate half: closes at phase 1 if Lina's file shows k = N. Peter-sample half: spec 131 (row 20)". Spec 131's outline names this record in § 13 ("Peter-sample half only", added at `7d610b425`, #575), so the spec answer is carried out (rule 11). Authority: `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`; `R10@ee5ea2b80e58c26a6dea7e6dfd538d006193f755`; `R11@25bd478ddb4aca1c77da9eada750f601374fc62a` line 14 (fork B, route in place). Superseded Trigger, kept verbatim: "`release:next:phase-1` — the next RELEASE phase 1 reads `Delegate audit (Stacy-signed, <seat>): k / N` with k = N and a committed file, and `Peter sample (Stacy-signed): k / N` with k ≥ 1. This record merges after 16.1.0's final S (`38f4ece47`, #505), so its first firing is the release after 16.1.0. It is closed by those two lines reading as owed, or by Peter's answer to trigger (d) (spec / drop / fix-now) recorded here. *Start condition (prose)*: none; the brief can be written now."*

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

## Owed act 7, added 2026-10-26: the re-read after the store-set fix

7. **The re-read: Ada, dispatched by the orchestrator, after the store-set fix merges.** The fix and its record are `.kiro/issues/2026-10-26-signing-chain-audit-reads-one-session-store.md`. `--audit` used to read one harness store, and now reads the main store plus every `…--claude-worktrees-*` sibling. Ada re-runs `--audit --pr <N> --signer stacy`, with the default store set (no `--store`), over #465 and #467. She writes the per-act lines verbatim as a dated addendum section in her file `delegate-audit-release-16.1.0-ada.md`. By the steward's measurement (that record's § 4), 7 acts change reading: 6 read `anchored` and #467's `027b8904` (`designerpunk-systems-overview.yaml#high-level-designerpunk-three-system-architecture`) reads `FAIL 7`. That FAIL is a Stacy-signed act, so owed act 4 applies to it once Ada's line exists. This record's close condition is unchanged.

*Signed: Thurgood, 2026-10-26.*

## Lapse (2026-11-04)

Firing commit `4d10202b2b9d535401a1452643780656a5d0b694` (#633's squash, 16.2.0's S). This record's Trigger, `release:next:phase-1`, resolved to 16.2.0. No ancestor of S closed it or re-ruled it. Stacy's phase 1 observed this as RL-40 (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.2.0.md`, #637, `c1a5d1521`), and she appended no Lapse heading, because the walk had already routed its close.
- **What lapsed**: the close at S. It is the record's first lapse. The class is P2 `(guard)`, which goes to Peter at a first lapse. His answer is already on record: under his delegation (DLG), the collective disposed of the Peter-sample half as "spec 131" (the walk record's delegation table), which is the "spec" answer this record's Trigger names. So no new escalation is owed. The re-rule above records it here.
- *(Appended 2026-11-04, Thurgood, owner, rule 11.)*

## Partial outcome (2026-11-04, Thurgood, owner, rule 9): the delegate half met

- **Met**: `Delegate audit (Stacy-signed, Lina): 49 / 49 — .kiro/specs/123-consumer-distribution/completion/delegate-audit-release-16.2.0-lina.md @ c21d40a2e`. That is k = N with a committed file, read by Stacy's phase 1 (L241, #637 `c1a5d1521`). Lina's file has since gained "row D at S" at #635 (`e19698406`: the window from `d2f579bef` to S adds no signing acts; J final 49). This resolves Stacy's RL-40 for the delegate half.
- **Open, routed to Spec 131 in place**: Peter's sample, `Peter sample (Stacy-signed): 0 / 49`, which is the third RELEASE at zero (phase 1 L272), and owed act 6, the spec decision. The record stays at the root under the Trigger above.

