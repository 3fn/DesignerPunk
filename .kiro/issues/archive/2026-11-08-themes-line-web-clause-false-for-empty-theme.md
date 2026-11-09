# Issue: the `Themes:` line says every other registered theme is written as a web block, and a theme with no colour override writes none

**Date**: 2026-11-08
**Status**: CLOSED 2026-11-09 (rule 5, #834)
**Owner**: Ada (`generate`'s messages, `src/cli/shared/errorCatalog.ts`). The wording is Leonardo's; the fix is made with him, and his committed source, `.kiro/specs/123-consumer-distribution/design-inputs/catalog-wording.md` § 1, changes in the same PR (`src/cli/__tests__/personalNote.test.ts` L253 compares the two).
**Trigger**: `merge:#834` *(re-ruled 2026-11-09 by Thurgood, under Ada's 2026-11-08 direction above: #826 merged before the re-rule, and #834 corrects the last sites, Sparky's charter lines. Prior: `manual` *(re-ruled 2026-11-08 by Ada, Coordinator\'s direction: #824 fixes the code and the catalog source only; Thurgood re-rules this to `merge:#<N>` in the PR that corrects the governance and charter sites, and closes it there)*)*
**Class**: P0 false-claim · defect *(rule 12, Ada, filer. The sentence is false where its reader meets it, in `generate`'s output to an adopter. M7's list of surfaces does not name CLI output in so many words, and I read it as covered: the adopter meets the line in the package's own response. Only Peter downgrades a P0. If he reads CLI output as outside M7, this is P2 (record).)*
**Source**: Stacy's notes on ballot `2026-11-08-token-governance-theme-registry-as-shipped`, `[STACY R1]` § 2, item 1, and `[STACY R3]` note 1. First filed as one half of `.kiro/issues/2026-11-08-non-colour-theme-override-accepted-not-applied.md`, moved here when #785 closed that record.

---

## The sentence

`GENERATE_THEMES_SUFFIX` (`src/cli/shared/errorCatalog.ts` L575–576, at `c91fb9b15`) says "any other theme is written as :root[data-theme="<name>"] on web (it matches the <html> element only) and as a theme instance on iOS and Android".

**False case**: a custom theme registered with an empty override map. At `c91fb9b15`, #785 refuses a non-colour key, so empty is now the only map with no colour override. `generateWebThemeBlock` writes no block for such a theme (`src/generators/TokenFileGenerator.ts` L1116). The native instances and the family case are still written. The `wcag` half of the line is true: the opt-out, `{ light: {}, dark: {} }`, writes no `wcag` block, but the line does not claim one.

## Wording slip, not a behaviour gap

An empty theme has nothing to override. With no block, `data-theme="<name>"` shows the base, which is exactly what an empty theme means. The native instances, equal to base, agree. So the output is right and the sentence is wrong. The fix is wording, for example "any other theme that overrides a colour is written as …"; the words are Leonardo's. No generator change is asked.

## The same claim elsewhere (swept 2026-11-08 at `c91fb9b15`)

`git grep -n -iE "(any|every) other (registered )?theme[^.]{0,80}(written|adds a block|emits)|it is written as \`:root\[data-theme"` over the served docs, steering, charters, overlays, `docs/consumer` and `src/cli`:

| Hit | Owner | Disposition |
|---|---|---|
| `src/cli/shared/errorCatalog.ts` L576 | Ada; wording Leonardo | this record's fix |
| `governance/DesignerPunk-Integration-Guide.md` L557 (the `Themes:` sample) | its owner; it copies the message | changes with the message, in the same PR |
| `governance/Rosetta-System-Architecture.md` L572; `governance/Token-Quick-Reference.md` L114 | Ada | the same overclaim in prose; a CORRECTION in the same PR (truth: `TokenFileGenerator.ts` L1116) |
| `canonical/agents/sparky.md` L311; `canonical/operative-sets/sparky.yaml` L90 | Sparky (charter text by the profile author) | "every other theme your config registers adds a block of its own" and "`wcag` is always generated" are both false for an empty map. Already flagged to him by the ballot's § 8; his to re-read |

Token-Governance's items 1 and 4 in the ballot above already state the rule correctly ("when it overrides a colour token, a block on web"; "a theme whose maps override no colour token writes no block").

## Readers

- **Leonardo**: the wording, and his committed source.
- **Sparky**: his charter line.
- **Stacy**: the RELEASE phase-1 read; she may dispute the P0 reading.

## Progress (2026-11-08, Ada)

#824 fixes `GENERATE_THEMES_SUFFIX` (`src/cli/shared/errorCatalog.ts`), its pin in `personalNote.test.ts`, and Leonardo's `catalog-wording.md` § 1 (his edit, `021b80d80`). The record stays open: five sites still carry the false claim and are routed to Thurgood: `governance/DesignerPunk-Integration-Guide.md` L557, `governance/Rosetta-System-Architecture.md` L572, `governance/Token-Quick-Reference.md` L114, `canonical/agents/sparky.md` L311 and `canonical/operative-sets/sparky.yaml` L90. — Ada

**Outcome (2026-11-09, Thurgood, rule 5)**: closed. Every site in the sweep table is now true:
- #824 fixed `GENERATE_THEMES_SUFFIX`, its pin in `personalNote.test.ts`, and Leonardo's `catalog-wording.md` § 1.
- #826 corrected `governance/DesignerPunk-Integration-Guide.md` (the `Themes:` sample), `governance/Rosetta-System-Architecture.md` and `governance/Token-Quick-Reference.md`.
- #834 corrects `canonical/agents/sparky.md` L311 and L313, with the `theming-2` and `theming-5` items in `canonical/operative-sets/sparky.yaml`. Sparky re-confirmed `#web-theming` (`23222ef`). L313 (`theming-5`) made the same claim and was not in the sweep table; #834 found it while applying the fix.

The record resolves at #834's merge and moves to `archive/` in that PR.
