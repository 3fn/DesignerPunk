# The theme family's persisted form is undeclared: no `String` raw value on iOS, an implicit `name` on Android — decide it with runtime switching at Spec 132's D5

**Date**: 2026-11-06
**Filed by**: Thurgood, under rule 10, in Spec 129 tasks amendment 3 (the owners' confirmation round), for the owners below. The ask is Leonardo's (`.kiro/specs/129-consumer-generation-completeness/feedback/tasks.md` § "Tasks amendment 3", `[LEONARDO R2]`); Kenya asked that it be a record rather than a design bullet alone. Rule 9 applies to every later edit.
**Owners**: Kenya (iOS), Data (Android)
**Class**: P3 improvement · owed-act *(set 2026-11-06 by the filer for the owners, who confirm or re-class under rule 12. Nothing ships a persisted form in 129 and no reader is misled; the cost is that adopters invent one.)*
**Trigger**: `path:.kiro/specs/132-*/design-outline.md` — the event that owes the close is Spec 132's design outline being created: the native plan of record seeds that outline from 129's rulings (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/plan-r2.md` § 6, "What happens on approval, in order", item 8, "132's outline … seeded from … 129's rulings"), and D5 (runtime rendering under every theme) is a 132 deliverable there. At that touch the owners name this record in the outline and re-rule the Trigger to the D5 decision, or close it.

---

## What is open

Spec 129 design § 4, "The theme family (6(b))": `<Name>ThemeFamily` is a Swift `enum … : Sendable, Hashable, CaseIterable` with **no `String` raw value** (Kenya's ruling, 2026-11-06, `[KENYA R3]` item 4), and a Kotlin `enum class` whose entries carry an implicit `name`.

Without a declared raw value, adopters and their agents will persist a chosen theme as `String(describing:)` on iOS and `name` on Android. That is the persistence contract Kenya declined to ship in 129, only undeclared and owned by no one (`[LEONARDO R2]`). 129 tests no runtime switching (Req 1.7), so the question belongs with D5.

## What closes it

The owners decide, at 132's D5 and together with runtime switching and persistence:
1. whether the Swift family declares a `String` raw value (additive: `init?(rawValue:)` and `rawValue` appear, no existing call changes);
2. whether Android's `name` is ruled a persistence contract, or a declared value is added;
3. what 132's documentation tells an adopter to store.

The outcome is recorded here (rule 5) and the record archived, or the Trigger is re-ruled to the D5 decision's own event.

Design pointer: Spec 129 `design.md` § "Spec 132 inputs drafted this round (not 129 acceptance)".
