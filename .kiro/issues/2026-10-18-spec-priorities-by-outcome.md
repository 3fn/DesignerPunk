# Spec priorities by outcome: a record of order, walked monthly

**Date**: 2026-10-18
**Owner**: **Thurgood**, as steward of this record. Each spec's owners keep their own specs; this record holds only the order between them.
**Trigger**: `manual` — re-rank when a spec closes, when an outcome changes, or at any monthly walk (the event is unchanged). *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the pulled-forward walk (Peter's go, 2026-10-20); ledger `archive/TRIAGE-2026-10-20.md`.)*
**Superseded trigger (back-filled 2026-10-20; verbatim)**: re-rank when a spec closes, when an outcome changes, or at any monthly walk where the order no longer matches the facts. **Walked monthly**, as part of the active-charter walk (`.kiro/issues/README.md` rule 6).
**Class**: P3 improvement · charter *(set 2026-10-20, Thurgood, rule 12. A standing order record. Each monthly walk is its re-rank event.)*
**Authority**: Peter, 2026-10-18, in chat, relayed by the orchestrator. He asked for a prioritization rule, then chose the class option: a written priorities record, walked monthly, "with the optimal order identified".
**Scope**: a record only. It reschedules nothing beyond what it states. Each spec's own gates, rounds and rulings still decide its execution.
**Facts source**: the orchestrator's Explore pass of 2026-10-18 (paths cite-checked; I re-checked the ones cited below).

---

## 1. The rule

Peter (relayed, verbatim): specs are to be prioritized **"based on their intended goals and strategic outcomes rather than fullness or momentum."**

**Why the record exists**: so that sequencing defaults to purpose, not to whichever spec last had a commit. A spec that is fuller, or that moved recently, gains no rank for that alone.

## 2. The outcomes

These are listed as presented to Peter. **He did not reorder them**, and the letters are labels, not ranks.

- **(A) A consumer installs DesignerPunk and gets complete, truthful native output.** This is Spec 123's shipped promise, and it is not yet fully true:
  - Native theme emission has been unwired since 2026-06-28 (`.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md`).
  - The Model-B theme-override leak.
  - Per-platform output paths.
  - No compile check of generated Swift or Kotlin.
  - These are Spec 129's scope items (i)–(vi), listed by pointer in `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`.
- **(B) DesignerPunk reaches the platforms where products are built, and where the AI and design-systems conversation is happening.** That means React and React Native (Spec 128). The context: the state-of-AI-in-design-systems study, the DSDS contribution, and Peter's new organization.
- **(C) A product screen can be built without placeholders.** The Settings screen has five component gaps (`.kiro/issues/2026-10-13-component-gaps-from-settings-ledger.md`). One switch (Spec 130) does not close them. Its value is as **the first component built under the ratified design law** (`.kiro/docs/ballots/2026-10-18-true-native-development-is-not-true-native-design.md`) and its per-platform `rendering: designed | native` field.

## 3. The order

**1. Spec 129, consumer-generation completeness (outcome A), with the platform build-verification harness charter evaluated and scoped as its FIRST task.**
- **The harness is 129's acceptance instrument.** Its "compiling on all three platforms" acceptance depends on it (`.kiro/specs/129-consumer-generation-completeness/design-outline.md` L32, Ada).
- **It is the R-2 gap all three platform seats named** in the ratified ballot's § 9.
- **The harness charter's own trigger has fired with no evaluation.** `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` § 3 trigger 3 is the 125-B campaign-close queue review, and that close is recorded as fired. The charter has no evaluation entry since 2026-09-17.
- **129's kickoff trigger has fired, and this record verifies it.** The trigger is "the next spec kickoff after 15.0.0 ships" (`.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` L6). Spec 130's kickoff, its design outline merged as #398 on 2026-10-17, came after 15.0.0 shipped, and after 16.0.0's rail PASS (#395). This closes the question 129's outline left UNVERIFIED (L36).

**2. Spec 128, React and React Native platform admission (outcome B).**
- **Its six-fork ruling sitting may run NOW, in parallel with 129.**
  - The sitting is decisions, not generator work. The forks are at `.kiro/specs/128-react-react-native-platform-admission/inbound-from-react-rn-sitting-2026-10-02.md` L109–114.
  - Both gates are met as of 2026-10-03: the v15.0.0 tag exists, and the parity required-flip merged in #292 and was confirmed ARMED in #294 (`.kiro/specs/127-completion-claims-integrity/completion/arming-2026-10-03-parity-flip.md`).
  - The charter's own walk rule already flags the state as a finding: "tag cut + flip merged with no identity-ballot draft" (`.kiro/issues/2026-10-03-react-react-native-platform-admission-charter.md` L19).
- **Implementation comes after 129**, so that 128 inherits the theme pipeline and the harness rather than building either twice.

**3. Spec 130, Input-Switch-Base (outcome C), just in time.**
- **It is pulled forward only as far as one of two things requires**: 128's first binding, which must not bind against the placeholder (130 § 7.3, P-8; G1's third trigger), or a second screen that needs a switch.
- **Its R1 round may run alongside 128's fork sitting**, at low cost.
- **The surviving counter, recorded and not absorbed**: parking 130 leaves the Settings screen announcing "checkbox" for longer.

## 4. What this changes elsewhere

These are lines, not edits. Each record's owner appends to their own record (rule 9).
- **The gaps record's G-order.** It currently reads G6 → T3 → G1 → G4 → G3 + G2 → T1 → G5 → T2 (`.kiro/issues/2026-10-13-component-gaps-from-settings-ledger.md` L149). Under this record, **G1 becomes just in time** (§ 3.3), and G4, G3 + G2, T1 and G5 follow 130, not the other way round. **Owed by Lina**: a dated line in that record. G6 and T3 are already done.
- **The harness charter's evaluation entry**: owed by me, as 129's first task.
- **The `data-theme` issue** (`.kiro/issues/2026-10-03-data-theme-scope-charter-vs-generator.md`) waits for 129's design. It was already re-anchored there on 2026-10-18, with two fixes offered and none picked.
- **The Spec 128 charter walk finding stands** until the fork sitting is scheduled.

## 5. Shared surfaces and the dependency

| Surface | 128 | 129 | 130 |
|---|---|---|---|
| `src/generators/**` | yes | yes (the theme block) | no |
| `canonical/**` | indirect (Agent-Directory, an RN seat) | via data-theme option 1 | excluded at this round |
| `settings.yaml` | no | no | yes (a tasks.md row grant) |
| Input-Checkbox-Base | constraint coming from 130 | no | component-meta re-point |
| Contrast queue | no | no | yes (pinned) |
| Harness charter | prerequisite | acceptance instrument | announcement evidence |

**Why 129 comes first.** 128's theme emission, which it absorbs as a step, and 129's item (i) are **the same generator code**. The touchpoints are `src/generators/TokenFileGenerator.ts` L973, L1021, L1024, L1054 and L1087, and `generateTokenFiles.ts` L19–21 and L135–162. The harness serves all three specs: it is 129's acceptance instrument, 128's prerequisite, and 130's announcement evidence.

## 6. Open for Peter (recorded, not blocking)

1. **If A and B conflict for a burst, which outcome ranks first: truthfulness (A) or reach (B)?** He was asked, and chose the class option without ranking them. The order above resolves the current case without that ranking, because 128's sitting runs in parallel and 128's implementation needs 129's output anyway. A future conflict would need the ranking.
2. **Does Spec 130's R1 run now, alongside 128's fork sitting?** This record permits it (§ 3.3) and does not schedule it.

## Walk log

- 2026-10-18: record opened (Thurgood).
- 2026-10-20 (Thurgood), **Peter's ruling, relayed and confirmed by the orchestrator: the 129/128 seam.**
  - **Spec 129's `platforms:` config (item (v)) is designed as the platform registry's seed**: one exported `PLATFORM_KEYS` constant, with the type derived from it (Ada's R1 (b) recommendation).
  - **Spec 128's platform-selection experience is its acceptance test.** Peter's outcome statement: the user chooses the platforms they develop on, and only those platforms' tokens, components and agents are installed.
  - Source: `.kiro/specs/128-react-react-native-platform-admission/inbound-from-identity-sitting-2026-10-20.md` § 1 and § 4.
  - The same day, the 128 identity sitting ran (R0–R2) and was **carried into Spec 128 with no fork ruled**. The § 4 line "The Spec 128 charter walk finding stands until the fork sitting is scheduled" is therefore met: the sitting ran.
