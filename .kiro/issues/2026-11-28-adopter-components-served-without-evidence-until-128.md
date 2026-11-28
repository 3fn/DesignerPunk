# Until Spec 128 lands, the application MCP serves an adopter's own components beside ours with a readiness read from file presence, not from evidence of the bar

**Date**: 2026-11-28
**Owner**: Lina (the application MCP and the component schemas it serves; Leonardo consulted as the consumer of selection guidance)
**Filed by**: Lina, under rule 10, for the note in Spec 132's outline § 2, "Not in 132" (#880): "Lina notes that until 128 lands, agents see adopter components in the application MCP next to ours with no evidence of the bar; that belongs in 128's inbound list." This record is that list entry. `[LINA R13]` named it as an owed act with no owner, and this record gives it one.
**Trigger**: `path:.kiro/specs/128-react-react-native-platform-admission/requirements.md` — Spec 128's requirements round opens. Its lane 3 owns served readiness for adopter components and `implements:` (Spec 132 outline § 2, "Not in 132"; plan-r2 § 2 WP6). The commit that adds 128's requirements takes this in, or leaves it out with a reason.
**Class**: P2 obligation (guard) · owed-act *(set 2026-11-28, Lina, owner, rule 12. The guard is weaker than its claim. P-5 ruled that adopter-built components meet the same bar (Peter, received 2026-11-28T03:49:46Z, verbatim: "Yes, (b) stands as new work; P-5 is (a)"; `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` § "[PETER] P-5"). The served readiness for an adopter's component does not show that bar, so an agent can select one as if it had met it. It is not P0: no doc claims adopter components carry render or contract evidence. It is not P1: nothing blocks an adopter.)*

---

## What is true today (VERIFIED at `8f05f76b8`)

- **The application MCP indexes the consumer's own component root first** and the package's root last (`application-mcp-server/src/index.ts` L41–42, `resolveComponentRoots`, Spec 123 C3). An adopter's components appear in `get_component_catalog`, `find_components` and `get_component_full` beside ours.
- **Readiness for a component in the consumer's own tree is derived from its own files** (`application-mcp-server/src/indexer/packageReadiness.ts` L14–15). These are an implementation file, a test file, `types.ts` and the schema's `reviewed` flags (Spec 086 Decision 4). That is presence, not proof, so an adopter component with a test file and a `reviewed: true` flag can be served at a high readiness tier.
- **Our own components will carry evidence**, once 132 ships it: D5's render lanes, D6's contract tests with known-bad cases, and D7's derived readiness. Adopter components get none of that until 128's lane 3.

## What 128 owes (proposal; 128's requirements decide)

- Served readiness for an adopter's component derived from its own evidence under the same bar (P-5), or served as `unverified` with the reason, never as a tier it has not earned.
- `implements: <Component>@<contract-version>` validated and reported stale against core (`.kiro/specs/128-react-react-native-platform-admission/inbound-from-identity-sitting-2026-10-20.md` L192).
- Until then, a line in the served catalog or in T-18's selection-time warning saying that adopter components' readiness is read from file presence, so the gap is visible at selection rather than only in this record. That line's owner is Lina, with Leonardo (T-18) and Thurgood (overlay text).

## Done when

128's lane 3 serves adopter-component readiness from evidence, with a test showing that an adopter component lacking evidence is not served at a claimed tier, plus a known-bad twin. That PR adds the outcome line here and archives this record.

*Signed: Lina, 2026-11-28.*
