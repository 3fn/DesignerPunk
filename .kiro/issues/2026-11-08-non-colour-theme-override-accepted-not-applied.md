# Issue: a theme override of a non-colour semantic passes `generate` and is applied on no platform

**Date**: 2026-11-08
**Status**: ACTIVE
**Owner**: Ada (the generator and `generate`'s messages). The `Themes:` line's wording is Leonardo's (`src/cli/shared/errorCatalog.ts` L574); a change to it is made with him.
**Trigger**: `release:next:phase-1` — the S of the first release that carries U9 (#763, `c2b844152`), where the `Themes:` line below first reaches adopters. Closed by the PR that ships the fix, or re-ruled before that S.
**Class**: P2 obligation (guard) · defect *(rule 12, Ada, filer: the override check accepts what nothing applies, so the guard is weaker than what `generate` claims. One shipped sentence overclaims in this case, the `Themes:` line's web clause (below). If it is unchanged at the release's S, the RELEASE phase-1 read should treat that clause as a floor row; Stacy may read it as P0, a finding to Peter.)*
**Source**: Stacy's content read of ballot `2026-11-08-token-governance-theme-registry-as-shipped` (`[STACY R1]` § 2, items 1–3, "What the section does not say"), run at `3f739b07f`; confirmed by my code read at the same SHA.

---

## What happens (MEASURED by Stacy's run; the code read is mine)

A config registers a theme `spacey`, mode `both`, whose only override is `space.inset.100`. `generate` succeeds. Then:
- **Web**: no `:root[data-theme="spacey"]` block. `generateWebThemeBlock` reads colour tokens only (`src/generators/TokenFileGenerator.ts` L1105, `if (lbToken.category !== SemanticCategory.COLOR) continue;`) and writes nothing when no colour is overridden (L1116).
- **iOS and Android**: the instances `spaceyLight` and `spaceyDark` and the family case are emitted, but they carry only colour members. `space.inset.100` stays a `DesignTokens` constant (Swift `spaceInset100 = space100`, Kotlin `space_inset_100 = space_100`).
- **Index**: `space.inset.100` is `themeVarying: false`, while the registry's union (`getThemeVaryingTokens()`, `src/generators/generateTokenFiles.ts` L342) holds it.
- **No message** says the override was dropped. The `Themes:` line says the theme is "registered and applied", and that "any other theme is written as :root[data-theme="<name>"] on web" (`GENERATE_THEMES_SUFFIX`, `errorCatalog.ts` L575–576). For this theme that clause is false.

The same holds for a non-colour key in an adopter's registered `dark` or `wcag` map. The built-in maps carry no non-colour key, so no adopter could reach this before U9, when `generate` first read the config's maps.

A second shape, same area: an unknown key in a registered `wcag` map is rejected by `ThemeRegistry.register()` outside the `try` (`generateTokenFiles.ts` L268), so it throws a raw `Error`, not `TokenGenerationAbortedError` (`[STACY R1]` § 2, item 2). `generate` still fails and names the key; only the error's shape differs from the other two paths.

## Fix options (none taken here)

- **(a) Refuse**: `generate` fails, naming the key, on a theme override of a non-colour semantic. Clear, and matches "Non-theme-varying tokens (spacing, sizing, radius, typography, motion) stay as static constants" (Token-Governance § "Theme Registry (Spec 094)"). **Residual**: it fails a config that passes today, which makes it a breaking change under Req 10.4, so Peter rules on it.
- **(b) Warn**: `generate` prints, on every run, each non-colour key it drops and the theme it came from, and continues. Not breaking. **Residual**: a warning can be ignored, and the config still claims something it does not get.
- **(c) Apply non-colour overrides**: theming beyond colour on every platform. This is a new resolution dimension in practice, and Token-Governance § "Dimension Governance" requires a spec and Peter's approval for it. Not a fix for this record.

**My lean: (b) now, with the `Themes:` clause reworded to "a theme that overrides a colour token is written as …"**, before the release's S; (a) is for Peter if he wants it, at 17.0.0 with the other breaking changes. The `wcag` raw-`Error` shape is fixed in the same PR by moving the two built-in `register()` calls into the `try`.

## Readers

- **Leonardo**: the `Themes:` line's wording.
- **Stacy**: the RELEASE phase-1 read of the clause.
- **Thurgood**: Task 18's reads, if this record is still open at U12.
