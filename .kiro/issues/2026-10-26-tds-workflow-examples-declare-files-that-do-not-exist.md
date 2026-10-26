# Test-Development-Standards' workflow examples declare files that do not exist, and show a schema shape no schema has

**Date**: 2026-10-26
**Owner**: Thurgood (`governance/Test-Development-Standards.md` is a Civitas test-governance doc). **Consulted when the fix opens**: Lina, for the schema and contract shapes at L1884 (component schemas and the `{category}_{concept}` contract naming are hers).
**Filed by**: Thurgood, under README rule 10. The source is Lina's R1 on ballot `2026-10-26-governance-examples-guard` (item 4, "Homes, at adoption": "Thurgood's: TDS L1556–L1902"). Rule 9 applies to every later edit.
**Class**: P2 obligation (record) · defect *(set 2026-10-26, Thurgood, rule 12, matching the CDG record's reading for the same shape. A served doc's example declares a test file and a schema shape that do not exist, so a reader who copies them is misled about what the repo holds. It is P2 and not P1 because nobody is blocked: the real files are one query away. It is not P0 because the examples sit in a section framed as workflow illustrations, and L1556–L1659 are explicitly a hypothetical new component. Stacy may read L1884 otherwise.)*
**Trigger**: `release:next:phase-1` — closes at its fixing PR's merge, which becomes `merge:#<N>` when that PR opens (rule 1, a P2 that would ride another change). This record merges after 16.1.0's final S (`38f4ece47`, #505), so its first firing is the release after 16.1.0. **It joins the governance-examples guard's pending list at adoption**: ballot `2026-10-26-governance-examples-guard` § 2.4 homes each hit's pending entry here. The guard's build PR needs this record committed, with the per-hit dispositions below, before it merges (Stacy C-b; Lina R-f).

---

## The hits (Lina's measurement at `a95d6bf3d`; lines are fence-opening lines)

| Line | Declared path or shape | What is wrong | Disposition |
|---|---|---|---|
| L1556 | `// src/components/core/Input-Text-Search/platforms/web/InputTextSearch.web.ts` | No `Input-Text-Search` component exists. Example 1 says it is a new, hypothetical component ("Creating a new semantic component `Input-Text-Search`", L1522) | marker `<!-- example: generic -->` (EXECUTION, ballot § 2.3) |
| L1583 | `// src/components/core/Input-Text-Search/__tests__/InputTextSearch.test.ts` | the same hypothetical component | marker `generic` |
| L1620 | `// …/Input-Text-Search/__tests__/InputTextSearch.integration.test.ts` | the same | marker `generic` |
| L1659 | `// …/Input-Text-Search/__tests__/InputTextSearch.property.test.ts` | the same | marker `generic` |
| L1902 | `// src/__tests__/stemma-system/input-text-email-contracts.test.ts` | Example 4 is about an existing component (Input-Text-Email), and the file does not exist. The real contract validation lives in `src/__tests__/stemma-system/` (for example `behavioral-contract-validation.test.ts`) | CORRECTION: name a real file, or say the file is hypothetical and take `generic` (truth: `git ls-files`) |
| L1884 | `# Input-Text-Email.schema.yaml`, with `behavioral_contracts:` and `email_validation` | The path resolves, but the shape is one no schema has, and the contract name does not follow `{category}_{concept}`. **Not a v1 guard failure**: the schema kind is a later predicate version (Lina R1 item 1, "Later kinds") | CORRECTION against `src/components/core/Input-Text-Email/Input-Text-Email.schema.yaml` and `contracts.yaml`, Lina consulted |

## Fix shape

- **One PR, Peter-merged** (a governance path).
  - The four markers carry `**Edit kind**: … — EXECUTION (ballot 2026-10-26-governance-examples-guard § 2.3)`, with the per-marker PR-body lines that § 2.3 requires.
  - L1902 and L1884 are CORRECTIONs, with the observation being this record and the truth being the tracked files. They carry a `**Consulted**:` line naming Lina for L1884.
- The PR removes the five pending entries homed here, as the guard's stale-entry rule requires. L1884 is not pending in v1.
- **Surviving counter-argument**: four `generic` markers raise the K count by four on hypotheticals. A rewrite to `<Component>` placeholders would read as plainly generic with no marker. It costs more prose churn in a worked example that reads better with a concrete name. The marker is the cheaper honest option.

*Signed: Thurgood, 2026-10-26.*
