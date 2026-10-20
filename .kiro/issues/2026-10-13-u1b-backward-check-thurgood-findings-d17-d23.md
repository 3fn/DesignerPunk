# U1b backward check — Thurgood-owned findings D-17 to D-23

**Date**: 2026-10-13 · **Owner**: **Thurgood** · **Trigger**: his next docs session after the `src/`-path convention is settled (`2026-10-13-src-path-convention-for-served-governance-docs.md`); absent-from-repo lines (D-18 is Ada's content; see below) may be fixed before it. **Routed by**: the orchestrator (Spec 123 Task 24.1, Req 21.1 — findings route to the owning agent, never fixed in 123). **Record**: `.kiro/specs/123-consumer-distribution/validation/u1b-backward-check.md` § 5 (the "Finding" cells are the text of record).
**Trigger**: `manual` — Thurgood's next docs session after the `src/`-path convention settles (`2026-10-13-src-path-convention-for-served-governance-docs.md`). This restates the inline trigger on the Date line, which is kept verbatim. *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the pulled-forward walk (Peter's go, 2026-10-20); ledger `archive/TRIAGE-2026-10-20.md`.)*
**Class**: P2 obligation (record) · defect *(set 2026-10-20, Thurgood, rule 12. The findings are repo-only `src/` paths in served docs: true in this repo and absent from the package, which is the class the convention's one sentence answers. D-18 (a path that existed nowhere) is fixed on `main`: `governance/Platform-Resource-Map.md` L42 now reads `src/tokens/*Tokens.ts`.)*

| ID | Doc | Lines at `8007105fa` | Kind |
|---|---|---|---|
| D-17 | `governance/classification-map.md` | 272, 274, 517, 521, 570, 593 | repo-only `src/` paths (e.g. `src/__tests__/console-fail-setup.ts`) |
| D-18 | `governance/Platform-Resource-Map.md` | 42 | path exists nowhere (`src/tokens/primitives/`) — **content is Ada's** (she accepted it 2026-10-13); Thurgood keeps stewardship of the table; edit via the ballot model |
| D-19 | `governance/Process-Spec-Planning.md` | 591–592, 607–608, 692–693, 707–708, 1499–1501, 1515–1517, 1655–1656, 2047–2050 | repo-only `src/` paths |
| D-20 | `governance/Process-Task-Type-Definitions.md` | 85, 86 | repo-only (`src/build/platforms/`) |
| D-21 | `governance/Test-Behavioral-Contract-Validation.md` | 351 | repo-only (a component test path) |
| D-22 | `governance/Test-Development-Standards.md` | 1498–1512, 1557, 1584, 1621, 1660, 1706–1712, 1867–1873, 1903, 2002 | repo-only `src/` paths |
| D-23 | `governance/Test-Failure-Audit-Methodology.md` | 780, 781, 1157, 1160 | repo-only (e.g. `src/TokenEngine.ts`) |

Disposition goes in this file (dated), then `git mv` to `archive/` per the README's rule 5. Lina's 10 and Ada's 9 findings are dispositioned on their own paths (their acknowledgments are in the record's § 5 "Delivery").
