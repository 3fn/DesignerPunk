# Obligation: `generate` reads the colour palette, theme override maps, motion, layering and the DTCG/Figma export from the PACKAGE, not the consumer's copied token source (R1-6; exited at Spec 123 Task 28.4)

**Date**: 2026-10-15
**Status**: ACTIVE (shipped as a known limitation in 16.0.0)
**Owner**: **Ada** (token pipeline and generators). **Lina** consulted for any component-token consequence. **Thurgood** owns only the install-doc sentence (in his separate doc PR, `.kiro/issues/2026-10-15-123-u5-instrument-findings.md` row ID-R1-6).
**Trigger**: `release:next:phase-1` — the deadline for the CHANGELOG limitation-sentence correction (release owner ships the fix or carries the known-limitation paragraph forward) if the fixing PR (129's PR 1) has not landed. *(Re-ruled 2026-10-18, Ada. The kickoff of the completeness spec (129) is a START event, prose under M2, and it FIRED 2026-10-18; see the dated line at the end of this record. Authority: ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2/M5 back-fill, the application PR `chore/ballot-sitting-application`. The superseded trigger, verbatim:)* **the kickoff of the consumer-generation completeness spec** (`.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`, its own trigger) — this record is that spec's input, and is folded into it at the kickoff — **or, if that spec has not kicked off by then, release-5 prep**, where the release owner either ships the fix or carries the known-limitation paragraph forward in that release's CHANGELOG entry.
**Class**: P2 obligation (record) · owed-act *(set 2026-10-18, Ada, rule 12: shipped as a disclosed known limitation, so the CHANGELOG sentence is true and no reader is misled; the fix is owed. Re-class to P0 only if the sentence stops being true.)*
**Source**: trio-1 finding **R1-6** (`.kiro/specs/123-consumer-distribution/validation/trio-1-backend.md`; surfaced by the consumer-Ada probe): "a founder cannot add or change a colour swatch from her repo"; the operator's partial check `src/generators/generateTokenFiles.ts` L18–22 (static imports of the package's `tokens/themes/*/SemanticOverrides` and `composedColorMap`). **Peter's ruling (1), 2026-10-15** (ruled in the U5 session; recorded in `completion/task-28-completion.md`): **ship 16.0.0 with a known-limitation paragraph in the CHANGELOG** (Ada's sentence), the INSTALL § 4 correction in Thurgood's separate doc PR, and the pipeline fix as this record.
**Grant paths**: none here (the fixing PR declares its own).
**Consulted**: Ada — her sentence is the CHANGELOG's limitation text (relayed by the orchestrator, 2026-10-15).

---

## What is read from where (Ada's sentence, as shipped in the 16.0.0 CHANGELOG)

> `generate` takes the colour palette, the dark/WCAG override maps, motion and layering tokens, and the whole DTCG/Figma export from the installed package, so editing those parts of the copy does not change output yet; spacing, typography and other non-colour primitives and semantic references are read from the copy.

## Relation to existing records

- `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` item **(vi)** ("the Model-B theme-override leak", owners Lina + Ada) already tracks the **override-map** half. The **palette (`composedColorMap`), motion, z-index/layering and DTCG/Figma export** halves are not in that charter; this record adds them. At the charter's kickoff, both fold into one design question.
- `CHANGELOG.md` `## [Unreleased]` (16.0.0) § "Known limitations in this release" carries the consumer-facing statement.

## What closes it

A fix PR after which a born repo's edits to each named part change `generate`'s output (a test per part, run against a consumer-shaped fixture, not the steward repo), and the CHANGELOG entry of that release removes the limitation. Then this file records the PR and moves to `archive/`.

## Walk

Has the completeness spec kicked off, or has release-5 prep begun? If either, is this record folded or the limitation carried forward? **Neither = finding.**

## Trigger fired (2026-10-18, Ada)

The start condition fired: Spec 129's kickoff trigger is recorded as FIRED by the priorities record (#403, `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 3). Firing event: `merge:#403`. 129 is ranked first; PR 0 is done (#368); PR 1 rides 129's first tasks and folds this record into 129's design question at the kickoff, as this record's Trigger line provided. Deadline token now on the Trigger line: `release:next:phase-1`. If PR 1 has not landed by then, the release owner carries the CHANGELOG known-limitation sentence forward, corrected to whatever is then true. Not closed: nothing has shipped.

## C-1 done (2026-10-25, Ada, 16.1.0 walk row 20)

The CHANGELOG sentence for human readers is added to `CHANGELOG.md` `## [Unreleased]` § "Known limitations in this release", in the commit that adds this line (`git log -1 --format=%H -- CHANGELOG.md` on `chore/release-16.1.0-ada-prerelease`, and on `main` once merged), at the orchestrator's direction. It states where the parts come from, says "unchanged from 16.0.0", and points to `docs/consumer/INSTALL.md` § 4, which carries the full list (Stacy F-D: the reader-facing truth is INSTALL L77 and L97, present and unchanged since `v16.0.0`; there is no diff to that file over `v16.0.0..HEAD`). Checked at `d740624b8`: `src/generators/generateTokenFiles.ts` has no diff over `v16.0.0..HEAD`, and `TokenFileGenerator.ts`'s diff is a docstring and import comment only, so the sentence is true. The record is not closed: Spec 129's PR 1 has not landed, so it closes at the release under its Trigger as it stands (`release:next:phase-1`), and stays P2 `(record)` while the sentence is true.

*Signed: Ada, 2026-10-25.*

## Owner line (2026-10-25, Ada, rule 9): R1-16 and R2-14, re-observations at the agent-guidance site

Source: Leonardo's 16.1.0 trio records. R1-16 (`tests/onboarding-trio/records/16.1.0/trio-1-backend.md`): consumer-Ada's plan for Dana's `#0F766E` starts "Add one new primitive for `#0F766E`" in `src/tokens/`, and names only the WCAG-theme limit. R2-14 (`trio-2-designer.md`, low): consumer-Sparky points Rosa's terracotta at "`color.action.primary` in your token source" without the caveat. Both are this record's limitation, met by a consumer agent that does not know it. Both findings are real.

- **Verified (R1-16's open question)**: a new primitive does not reach the output. Run in a scratch copy of run 1's born repo: the primitive is emitted on no platform, and the semantic pointed at it is emitted as a reference to a name the output does not define, with `generate` exiting 0. That is worse than "does not change your output": it is filed as its own record, `.kiro/issues/2026-10-25-generate-passes-semantic-references-to-unemitted-primitives.md` (P2 (guard), `release:next:phase-1`), because its fix (validate against what is emitted) closes on its own PR and survives Spec 129's PR 1.
- **The sentence stays true.** The CHANGELOG and INSTALL § 4 L77 say the palette is read from the package and editing it "does not change your output yet", and that semantic references are read from the copy; both halves held in the run. It does not say what the two together do. Whether it should, before the guard record's fix lands, is Thurgood's INSTALL text to judge (his R2-11/R2-14 side). The class stays P2 obligation (record).
- **Owed act, added to this record: a consumer-charter line.** Consumer-Ada's charter carries the WCAG-theme limit (from the Theme Registry ambient) but no line on the palette, and nothing routes her to INSTALL § 4 before a colour change. The line belongs in the consumer profile only (`canonical/profiles/consumer/ada.*`), since in the steward repo the palette is read from source. Text, for that PR: "In this repo, `generate` reads the colour palette from the installed package, not from `src/tokens/` (INSTALL § 4): a new or retuned colour primitive does not reach the output. A brand colour that is not in the palette cannot be added yet; say so, and offer the nearest existing primitive." That is a charter edit (`canonical/**`), Peter-merged, and not in this PR. Consumer-Sparky's side (R2-14) is Thurgood's, in the consumer profile.
- **Trigger unchanged**, `release:next:phase-1`: at the next release's phase 1 the walk reads, besides the CHANGELOG sentence, whether the charter line has merged, or Spec 129's PR 1 has made it moot (then the line is not added, or is removed in that PR).

*Signed: Ada, 2026-10-25.*
