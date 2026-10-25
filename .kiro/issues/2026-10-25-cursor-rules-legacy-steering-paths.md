# `.cursor/rules/*.mdc` address the docs MCP by legacy `.kiro/steering/` paths; two of them resolve to nothing

**Date**: 2026-10-25
**Owner**: Thurgood (Civitas steward; cross-reference maintenance. `.cursor/rules/**` is in no seat's standing write scope, so the fix needs a grant)
**Filed by**: Thurgood, under README rule 10, in the R2 commit of `.kiro/docs/ballots/2026-10-25-token-selection-order-one-rule.md`, from Lina's R1 finding 3 there ("`.cursor/rules/components.mdc` L28 carries the same stale `get_section` path as tokens.mdc L42 (site 6). Add it to site 6 and its grant, or file a rule-10 record."). Rule 9 applies to every later edit.
**Class**: P3 improvement · defect *(set 2026-10-25, Thurgood, rule 12. Nine of the eleven lines resolve today, only through the transition-only legacy-path manifest; two do not resolve at all, and a Cursor agent that runs them gets a not-found error, not a wrong answer. No shipped claim rests on these files, so not P0; nothing here blocks a consumer, so not P1. It becomes P2 `(record)` the day the manifest is removed, which `mcp-server/src/legacy-path/legacy-path-manifest.ts` L2 calls "removable post-119-B sweep": every line below then fails.)*
**Trigger**: `manual` — closes at its fixing PR's merge, one PR over the four files. *(Set 2026-10-25, Thurgood, rule 9. A P3 that would ride another change takes `manual`; the token-selection ballot fixes only its own two lines, by design.)*

---

## What is wrong

Read at `fa8aa254f`. Each line passes a `.kiro/steering/<Name>.md` path to `get_section`. The steering docs moved to `governance/` (Spec 119); the docs MCP resolves the old form only through the frozen manifest, and it has no entry for `Component-Quick-Reference.md`.

| File | Line | Path | Resolves today |
|---|---|---|---|
| `.cursor/rules/components.mdc` | L28 | `.kiro/steering/Component-Development-Guide.md` | via manifest (L44) |
| `.cursor/rules/components.mdc` | L33, L34 | `.kiro/steering/Component-Quick-Reference.md` | **no** (`get_document_summary` → `FileNotFound`, checked 2026-10-25) |
| `.cursor/rules/specs.mdc` | L19, L24, L29, L30 | `.kiro/steering/Process-Spec-Planning.md` | via manifest (L104) |
| `.cursor/rules/tests.mdc` | L43, L44 | `.kiro/steering/Test-Development-Standards.md` | via manifest (L136) |
| `.cursor/rules/tokens.mdc` | L41, L42 | `.kiro/steering/{Token-Governance,Component-Development-Guide}.md` | via manifest; **fixed by the token-selection ballot's site 6**, not by this record |

The headings the lines name were not checked here; the fixing PR checks each against the doc's current outline.

## Fix shape

One PR: each path becomes the doc's `id:` from its frontmatter (`component-development-guide`, `component-quick-reference`, `process-spec-planning`, `test-development-standards`), as the ballot's site 6 does for `tokens.mdc`. It needs a grant naming `.cursor/rules/{components,specs,tests}.mdc` (the 2026-09-19 counter-argument ballot's B1 edited `.cursor/rules/designerpunk-core.mdc` the same way). Surviving counter-argument: the Cursor rules are a secondary surface no instrument reads, so the fix can sit until the manifest's removal is scheduled; the two dead lines argue for doing it sooner.
