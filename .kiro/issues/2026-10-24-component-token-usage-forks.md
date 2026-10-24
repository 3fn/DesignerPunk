# Component Token-Usage Forks Carried Out of the Drift-Pass Findings Record

**Date**: 2026-10-24
**Filed by**: Lina (owner), split out of `2026-10-23-component-token-usage-findings-from-drift-pass.md` (items 1, 2 and 6) so that record, which holds the Android compile defects, closes at its fixing PR's merge instead of lapsing on three forks that wait on rulings, not on work (rules 9, 10 and 11)
**Discovered during**: normalizing 97 non-resolving `tokens:` declarations in 21 core schemas (`.kiro/issues/2026-06-25-component-schema-token-name-drift.md`)
**Owners**: Lina (items 1, 2 and 6); Ada, consulted on token meaning (items 1, 2) and owner of the generator side of item 6 option (ii)
**Class**: P3 improvement · defect
**Trigger**: `manual` — the event is each fork's ruling (item 1: Peter or the design owner; item 2: Lina's answer, Stacy read as parity; item 6: Peter, Ada consulted) and the PR that carries it; the first read is the next health-check walk after 2026-10-24. *(Rule 1: a P3 that would ride takes `manual`, naming its own fixing PR as the event. Filed 2026-10-24; the split was planned in the 2026-10-23 re-class line of the source record.)*

---

None of these is a defect that blocks a build. Each is a fork: what the code reads, or how a schema is meant to be written, is in question, and a ruling is owed before anything changes. The three items are copied below **verbatim** from the source record (their numbers are the source record's, kept so citations to it still resolve); the source record keeps its own copy as history, with a dated line pointing here.

1. **Input-Text success border reads a text token.** `InputTextBase.web.css` L127–128 draws the success border with `--color-feedback-success-text` (green500). `color.feedback.success.border` (green400) exists, and Input-Checkbox uses `color.feedback.error.border`. The success value differs, so a change is visible, not a no-op. The error border has the same shape (`error.text` and `error.border` are both pink400, so only the success side changes colour). **Fork for Peter or the design owner**: keep the text token as a deliberate choice, or move the border to `*.border`. Until ruled, the Input-Text schemas declare `color.feedback.success.text` and `color.feedback.error.text`, which is what is read.
2. **Button-CTA typography differs across platforms.** Android reads `typography.buttonMd` and `typography.buttonLg` (`ButtonCTA.android.kt` L278–300); web and iOS read `typography.labelMd` and `typography.labelLg`. The schema now declares all four, so each declaration is true for one platform and the parity gap is visible there. **Owner question**: which pair is canonical. Stacy is asked to read this as a cross-platform parity finding. The small size has no declaration of its own: Android uses `buttonMd`, web and iOS `labelMd`.

6. **Inheriting variants restate their parent's tokens, against the own-tokens-only schema rule.** *(Added 2026-10-23, Lina, from the guard read.)* My charter's schema rule says a schema lists only the tokens its own code reads; inherited and composed tokens are assembled by the MCP. Five of the nine inheriting schemas restate the parent's whole list instead:
   - Input-Text-Email, -Password and -PhoneNumber restate Input-Text-Base's 23, unlabelled.
   - Chip-Filter and Chip-Input restate Chip-Base's 18 under `inherited:`. Both lists equal the base today.

   The variants do read those variables at runtime; Chip-Filter imports `ChipBase.styles.css` into its own shadow root. So the restated edges are true, but they are hand copies that will drift. The drift record's Outcome claim that `color.feedback.success.text` lists the four Input-Text components rests on three of them. Composition was settled the other way: Nav-Header-Page's `composition:` group was deleted (F-2). **Fork for Peter** (Ada consulted, because one branch changes her generator):
   - **(i) Keep the restatements.** Amend the charter rule to say a variant restates what it renders (a `canonical/agents/lina.md` edit, Peter-merged), and guard each copy against its parent.
   - **(ii) Derive the edges.** The consumer map and the MCP's `resolvedTokens` derive inheritance (and composition) edges from `inherits:` and `composition:`, and the restatements are deleted.

   **Class option: (ii).** Surviving counter-argument: a derived edge means "affected by", not "reads", and that widens what `consumers` means. Until ruled, nothing changes.

## Context carried with the forks

- Items 1 and 2 are component-semantics questions; Ada is consulted on token meaning, Stacy on parity (from the source record's Notes).
- Item 6's class option is (ii). Until a fork is ruled, nothing changes: the schemas stay as the drift-normalization PR left them.
- Why a separate record: the source record's Trigger is `merge:#<N>` for the interim Android fix, and a record that still holds open forks at that merge lapses under rule 11. A P1 class and a git-visible trigger also misstate three forks.

*Signed: Lina, 2026-10-24.*
