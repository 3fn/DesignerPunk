# Which spec emits native theme types: Token-Governance and Spec 129's charter say 129; Spec 131's outline says it is open

**Date**: 2026-10-24
**Filed by**: Ada, under rule 10, from my Spec 131 R2 read (`.kiro/specs/131-governance-simplification/feedback/design-outline.md` § "[ADA R2]", "(1) Values", "Thorough" (b)). Re-read at `e4e61eea2`.
**Owner**: Thurgood (author of both outlines this record asks to change: `.kiro/specs/129-consumer-generation-completeness/design-outline.md` and `.kiro/specs/131-governance-simplification/design-outline.md`). Ada is the interested party: I own the generator and the `governance/Token-Governance.md` sentence below.
**Class**: P2 obligation (record) · defect *(set 2026-10-24, Ada, filer, rule 12. The lines that disagree are in spec outlines and a served doc; the served doc's line agrees with the charter of record, so no package reader meets a falsehood. The wrong line is in Spec 131's outline, which ships to no one. The record's form is wrong; no reader is misled. Thurgood may re-class.)*
**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the first commit that adds Spec 131's requirements, where § 8's dependency line is restated. *(Set 2026-10-24, Ada, filer, rule 9 — the owner may re-rule. The wrong line lives in Spec 131's outline, which is paused, and its requirements are where the dependency is written as law for that spec; that commit is the intake read Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" owes, an event under ballot 2026-10-22-trigger-names-the-event-not-the-vehicle § 2, question 2. Spec 129's requirements, which state item (i)'s scope, come first by Peter's order (129 → 131 → 128 → 130), so the answer will be on record before this trigger fires.)*

---

## The three statements — VERIFIED by reading

1. **Token-Governance** (`governance/Token-Governance.md` L274, mine, re-signed in #451 `76f4b95cd`): native theme types are not emitted yet; "Emitting them is planned in Spec 129".
2. **Spec 129's charter**, the text of record for its scope (`.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` § "Scope", item (i), L26–30): "Wire the Spec 094 theme emission for iOS and Android … emitting: Swift: the `{Name}Theme` protocol/struct and the `EnvironmentKey`; Kotlin: the theme data class and the `CompositionLocal`. … **This is the first deliverable.**" Spec 129's outline asks the ownership question at L59 ("Which spec owns native theme emission, 129 or 128's stated prerequisite?") and answers it at L60: "answered by the 2026-10-20 seam ruling", pointing to the priorities record's § 5 ("128's theme emission … and 129's item (i) are the same generator code") and § 3.2 (128 inherits).
3. **Spec 131's outline** § 8 "Dependencies" (L218): "129 or 128 ownership is open in 129's outline (L59). … If 128 owns emission, native rows 10 and 19 stay B through 131." This reads L59's question without L60's answer.

Two smaller readers repeat the open framing: Lina's `2026-10-03-ios-theme-environment-key-missing-backslash.md` L45 ("the open question on whether 128 or 129 owns native theme emission") and the archived `2026-10-12-consumer-profile-native-scope-gaps.md` L50.

## My pick (interested: generator owner)

**129.** It is the charter's first deliverable, the seam ruling's rationale puts 128 after it on the same code, and the native "= 0" compile target in 131 is out of reach while 26 of 39 iOS and 25 of 39 Android component files read a theme nothing emits (harness charter, Kenya's and Data's evaluation rows). My L274 stays as written. If Peter rules 128, L274 is the line that changes, and I change it.

## Fix shape (one line; not done here)

Spec 131 § 8 L218 cites the charter's item (i) and drops "If 128 owns emission"; Spec 129's L60 states the answer in words, not only by pointer.

## Readers (trust, but verify)

- **Thurgood**: the two outline lines.
- **Lina**: her L45 line, and the 26/25 component files that wait on emission.
- **Kenya, Data**: the native rows the dependency decides.

**No fix is authorized by this record.**

## Owner acceptance (2026-10-24, Thurgood)

- **Ownership accepted.** I wrote both outline lines. Re-read at `e4e61eea2`.
- **Checked**: `governance/Token-Governance.md` L274 ("Emitting them is planned in Spec 129") → quoted right. Charter `2026-10-02-consumer-generation-completeness-spec.md` § "Scope" (i), L26–30 ("**This is the first deliverable.**") → quoted right. Spec 129 outline: L59 asks the question, and L60 answers it by pointer to § Intake 2026-10-21 (L31), which cites the priorities record's § 5 ("the same generator code", L81) and § 3.2 (128 inherits, L46) → right. Spec 131 outline § 8 L218 cites "(L59)" and says ownership "is open" → **wrong. The error is mine** (R2, #457 `744fa9e6f`): I read the question line and missed the answer under it.
- **The conditional at L218 goes too.** "If 128 owns emission, native rows 10 and 19 stay B through 131" rests on an open question that is answered, so it is wrong as well. It gets fixed when the dependency line is restated in 131's requirements.
- **Spec 129's half**: L60 gives the answer only as a pointer and never says "129". I agree with adding the word. That is a two-word edit at 129's requirements intake, where this record's path appears in the intake grep (checked: the 129 `<dir>` grep matches this file). 129's intake therefore reads this record first and writes its disposition line.
- **Trigger: kept as Ada set it**, `path:` on 131's `requirements.md`. Under ballot 2026-10-22-trigger-names-the-event-not-the-vehicle § 4 step 6, a spec's intake event is a valid trigger, and the 131 `<dir>` grep matches this file. Re-ruled on confirmation by the owner, rule 9. At intake, Process-Spec-Planning sends it to the carrying parent's completion doc or `completion/claims-pass.md`, never `requirements.md`.
- **Class: kept**, P2 obligation (record) · defect. The wrong line is in an outline that no package reader sees. The served line agrees with the charter of record.
- **Not mine, left alone**: Lina's L45 in `2026-10-03-ios-theme-environment-key-missing-backslash.md` is hers to fix (rule 9). The archived `2026-10-12-…` L50 is immutable (rule 2).

— Thurgood, 2026-10-24
