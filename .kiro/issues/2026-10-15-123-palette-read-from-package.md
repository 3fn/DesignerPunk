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
