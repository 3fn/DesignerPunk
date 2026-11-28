# Owed: each component records its rendering choice per platform in a `rendering:` field, before Spec 132's render lanes; no component has one

**Date**: 2026-11-27
**Owner**: Lina (the component schemas and the application MCP that serves them are hers; Leonardo consulted, for the look-versus-platform reading and his `platformParts:` proposal)
**Filed by**: Lina, under rule 10, as an owner act. **The filing is late, and that is my slip**: the source's § 7.3 says "I file the record (owner Lina, Leonardo consulted) in a record-only PR after `design.md` merges". `design.md` merged on 2026-11-05, and I did not file it (found at `[LINA R1]` on ballot `2026-11-27-inbound-handoff-notes-definition`, question 2).
**Class**: P2 obligation (record) · owed-act *(set 2026-11-27, Lina, rule 12. It is a prerequisite in an approved plan: plan-r2 § 1 and Spec 132's outline L33 (the placeholder's line at `a953ac70d`; see the Source line's pointer) say "before 132's render lanes". No reader is misled today: no doc claims the field exists.)*
**Trigger**: `path:.kiro/specs/132-*/requirements.md` — Spec 132's requirements round opens. 129's `design.md` leaves the shape fork (one field, or one field plus Leonardo's `platformParts:`) to "Spec 132's outline". So by that event the shape is decided, and this record is re-ruled to the PR that adds the field to every schema, or closed. *(Not `design-outline.md`, for the placeholder reason given in the access-level record.)*
**Source**: `.kiro/specs/129-consumer-generation-completeness/inbound-from-lina-design-2026-11-05.md` § 7.3 (what the field records, the proposed shape and the ballot it serves); `.kiro/specs/129-consumer-generation-completeness/design.md` L774, and its open-items table (the `platformParts:` fork, owners Lina and Leonardo, due at Spec 132's outline); `.kiro/specs/132-native-components-in-app/design-outline.md` L33 *(Dated pointer, 2026-11-28, Lina, owner, rule 9: "L33" is the 2026-11-07 placeholder's line, read at `a953ac70d`, a table row reading "each component records its choice per platform in a `rendering:` field, before 132's render lanes". Spec 132's reshaped outline lists the field in § 2, "Render and behaviour (D5–D7)", and records P-16's ruling on its shape in § 5.1. The timing, "before 132's render lanes", is carried here and in plan-r2 § 1.)*; `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/plan-r2.md` L84 and L428.

---

## The obligation

Every component's `*.schema.yaml` carries the `rendering:` field, in the shape Spec 132's outline settles, and the application MCP serves it, before 132's render lanes read it. The shape is not restated here: the source and the fork hold it.

## Done when

The PR that adds the field to every component schema, with the index serving it, merges. Then this record gets rule 5's outcome line and moves to `archive/`.

*Signed: Lina, 2026-11-27.*
