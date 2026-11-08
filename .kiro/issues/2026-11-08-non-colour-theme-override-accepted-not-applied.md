# Issue: a theme override of a non-colour semantic passes `generate`; in a custom or `wcag` theme it is applied on no platform, and in `dark` it is emitted as a colour and breaks the iOS build

*(Title widened 2026-11-08 by Ada at the re-class below; the filed title read "a theme override of a non-colour semantic passes `generate` and is applied on no platform".)*

**Date**: 2026-11-08
**Status**: ACTIVE
**Owner**: Ada (the generator and `generate`'s messages). The `Themes:` line's wording is Leonardo's (`src/cli/shared/errorCatalog.ts` L574); a change to it is made with him.
**Trigger**: `release:next:phase-1` — the S of the first release that carries U9 (#763, `c2b844152`), where the `Themes:` line below first reaches adopters. Closed by the PR that ships the fix, or re-ruled before that S.
**Class**: P1 consumer-blocking · defect *(re-classed 2026-11-08 by Ada, owner, rule 12, on `[STACY R2]` B-5 and my reproduction, § "Re-class: the `dark` case" below: an adopter's config that `generate` accepts with exit 0 and no warning gives an iOS token file that does not compile. Filed earlier the same day as: P2 obligation (guard) · defect *(rule 12, Ada, filer: the override check accepts what nothing applies, so the guard is weaker than what `generate` claims. One shipped sentence overclaims in this case, the `Themes:` line's web clause (below). If it is unchanged at the release's S, the RELEASE phase-1 read should treat that clause as a floor row; Stacy may read it as P0, a finding to Peter.)*)*
**Source**: Stacy's content read of ballot `2026-11-08-token-governance-theme-registry-as-shipped` (`[STACY R1]` § 2, items 1–3, "What the section does not say"), run at `3f739b07f`; confirmed by my code read at the same SHA.

---

## What happens (MEASURED by Stacy's run; the code read is mine)

A config registers a theme `spacey`, mode `both`, whose only override is `space.inset.100`. `generate` succeeds. Then:
- **Web**: no `:root[data-theme="spacey"]` block. `generateWebThemeBlock` reads colour tokens only (`src/generators/TokenFileGenerator.ts` L1105, `if (lbToken.category !== SemanticCategory.COLOR) continue;`) and writes nothing when no colour is overridden (L1116).
- **iOS and Android**: the instances `spaceyLight` and `spaceyDark` and the family case are emitted, but they carry only colour members. `space.inset.100` stays a `DesignTokens` constant (Swift `spaceInset100 = space100`, Kotlin `space_inset_100 = space_100`).
- **Index**: `space.inset.100` is `themeVarying: false`, while the registry's union (`getThemeVaryingTokens()`, `src/generators/generateTokenFiles.ts` L342) holds it.
- **No message** says the override was dropped. The `Themes:` line says the theme is "registered and applied", and that "any other theme is written as :root[data-theme="<name>"] on web" (`GENERATE_THEMES_SUFFIX`, `errorCatalog.ts` L575–576). For this theme that clause is false.

The same holds for a non-colour key in an adopter's registered `dark` or `wcag` map. *(Superseded 2026-11-08, Ada: true for `wcag`, false for `dark`; see § "Re-class: the `dark` case".)* The built-in maps carry no non-colour key, so no adopter could reach this before U9, when `generate` first read the config's maps.

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

## Re-class: the `dark` case (2026-11-08, Ada)

`[STACY R2]` B-5 on ballot `2026-11-08-token-governance-theme-registry-as-shipped` found that a non-colour key in a registered `dark` map is applied, not dropped. **Reproduced by me** at `3f739b07f`: `loadConfig` and `generateTokenFiles` on a config named `PB` that registers `{ name: 'dark', mode: 'dark', overrides: { 'space.inset.100': { primitiveReferences: { value: 'space200' } } } }`, compared with the same config with no themes. `generate` exits 0 and prints no warning for the key; its only message is the first-run count for the registered `dark` map.

| Platform | No themes | With the `dark` key |
|---|---|---|
| Web | `--space-inset-100: var(--space-100);` | `--space-inset-100: light-dark(var(--space-100), var(--space-200));` |
| iOS | `public static let spaceInset100 = space100` | `public static let spaceInset100: UIColor = UIColor { $0.userInterfaceStyle == .dark ? space200 : space100 }` |
| Android | `val space_inset_100 = space_100` | `val space_inset_100_light = space_100` and `val space_inset_100_dark = space_200`; `space_inset_100` is gone |

- **iOS, run**: `xcrun --sdk iphonesimulator swiftc -typecheck -target arm64-apple-ios17.0-simulator DesignTokens.ios.swift` (Swift 6.4.2, swift-driver 1.168.6) exits 0 for the no-theme file and 1 for this one, with `DesignTokens.ios.swift:557:89: error: cannot convert value of type 'CGFloat' to closure result type 'UIColor'`. That is one diagnostic, printed twice (as a summary and under the annotated source line), so a count of `error:` lines gives Stacy's 2.
- **Android, a reading**: no `kotlinc` here. The 9 component reads of `space_inset_100` under `src/components` would meet an unresolved reference. Data confirms on the harness.
- **Web, a reading**: `light-dark()` accepts colours only (CSS Color 5), so a property that uses the variable is invalid at computed-value time. Not run in a browser; Sparky's to confirm.
- **iOS components, a reading**: 8 component Swift files read `spaceInset100` as a length and would meet a `UIColor`. Kenya confirms on the harness.
- **Why `dark` differs** (my reading of the generator, not traced line by line): the `dark` map feeds the `dark-base` context, and the platform generators emit every token whose light and dark values differ in their mode-aware form, a form written for colours. Custom themes and `wcag` reach only the colour-filtered theme blocks and theme members.

**Who can reach it**: any local-mode adopter who registers a `dark` map with a non-colour key. The built-in maps have none (`src/tokens/themes/{dark,wcag,dark-wcag}/SemanticOverrides.ts`: 9, 7 and 2 keys, all `color.*`), and before U9 an adopter's `dark` map was not read, so it is new at U9.

**No instrument exercises it** (checked 2026-11-08): no harness fixture, Consumer Guard case or test puts a non-colour key in any theme map. `git grep` for a non-colour key followed by `primitiveReferences` across `tests`, `scripts`, `harness` and `src` (outside `src/tokens/semantic/**`) prints nothing. The harness consumer's config is `init`'s, with copies of the built-in maps (`tests/fixtures/pre-u9-theme-css/mutate-fixture.cjs` edits colour keys only).

**Why P1**: a config `generate` accepts silently ships an iOS token file that does not compile, and on Android a token whose name the components read disappears. It blocks the adopter who meets it, and nothing tells them why. It is not P0: it is a build failure, not a false shipped sentence; the `Themes:` clause above is the separate false sentence.

**Bearing on 129's acceptance**: no D row's verdict moves. D1 ("the generated token files compile, per platform") is measured by `harness-{ios,android}-tokens` on the harness consumer, whose maps are colour-only, so it stays as measured. But D1's sentence, and any release text that says the token files "compile" (Req 15.1), is true only for configs whose theme maps hold colour keys only. Until this record closes, that limit should be stated where "compile" is claimed, or the fix should land before the S. Task 18 reads this record as an open P1 if it is still open at U12.

**Options, revised**: (a) refuse and (b) warn-and-drop now apply to every map, `dark` included. Under (b) the `dark` key's output stays unchanged, so the build is fixed; a warning alone, with the key still applied, would not fix it. (c) is unchanged. **My lean: (b) for every map, before the S**, with a test per map kind on all three platforms and the iOS case type-checked; (a) is Peter's to take at 17.0.0. Which text the ballot ratifies follows his F-2 answer there.

**Readers, added**: Kenya (the Swift failure on the harness), Data (the Kotlin rename), Sparky (the web `light-dark()` of lengths).


---

## Ruling (2026-11-08T15:12:38Z, Peter: "(a) with the class option")

Record: `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-theme-map-noncolour-refuse.md`. `generate` refuses a non-colour key in any theme override map (`dark`, `wcag`, any registered theme's maps), by token category, naming the key, the map and the theme, leading with what to do. Option (b) is not taken; the ballot's F-2 resolves as fix first.

**Class**: the check covers every map kind in one function (`findNonColourOverrideKeys`, `src/themes/themeRefusals.ts`), run in `generateTokenFiles` beside the theme-instance refusals, so a future map kind inherits it. Wording: `nonColourOverrideKeyMessage` (`errorCatalog.ts`), Leonardo's to settle.

**Fixing PR**: branch `fix/theme-map-noncolour-refuse` @ `a336123fc`. Consumer Guard case follows the grant `2026-11-08-theme-map-noncolour-guard-grant.md` (`chore/theme-map-noncolour-grant` @ `2dd3f26c4`). Close with the PR number (rule 5).
