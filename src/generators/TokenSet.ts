/**
 * The token set `generate` reads (Spec 129 U9, design § 10, "The six groups"; Req 9.2).
 *
 * One set, loaded from the consumer's token source (`config.tokenSourceRoot`: the copy `init`
 * made, or the package's own `src/tokens` in package mode), is passed to every generator.
 * No generation file imports `src/tokens` for values: a generator reads a module through
 * `tokenSet.mod('<path under src/tokens>')`. The `typeof import(...)` types below are
 * type-only and carry no value import.
 *
 * Loading lives in `src/config/TokenSetLoader.ts`.
 */

/** The modules under the token source that generation reads, keyed by their path under `src/tokens/` (no extension). */
export interface TokenModules {
  'index': typeof import('../tokens/index');
  'semantic/index': typeof import('../tokens/semantic/index');
  'ColorTokens': typeof import('../tokens/ColorTokens');
  'BlendTokens': typeof import('../tokens/BlendTokens');
  'BlurTokens': typeof import('../tokens/BlurTokens');
  'BorderWidthTokens': typeof import('../tokens/BorderWidthTokens');
  'BreakpointTokens': typeof import('../tokens/BreakpointTokens');
  'DensityTokens': typeof import('../tokens/DensityTokens');
  'DurationTokens': typeof import('../tokens/DurationTokens');
  'EasingTokens': typeof import('../tokens/EasingTokens');
  'FontFamilyTokens': typeof import('../tokens/FontFamilyTokens');
  'FontSizeTokens': typeof import('../tokens/FontSizeTokens');
  'FontWeightTokens': typeof import('../tokens/FontWeightTokens');
  'GlowOpacityTokens': typeof import('../tokens/GlowOpacityTokens');
  'LetterSpacingTokens': typeof import('../tokens/LetterSpacingTokens');
  'LineHeightTokens': typeof import('../tokens/LineHeightTokens');
  'OpacityTokens': typeof import('../tokens/OpacityTokens');
  'RadiusTokens': typeof import('../tokens/RadiusTokens');
  'ScaleTokens': typeof import('../tokens/ScaleTokens');
  'ShadowOffsetTokens': typeof import('../tokens/ShadowOffsetTokens');
  'ShadowOpacityTokens': typeof import('../tokens/ShadowOpacityTokens');
  'SizingTokens': typeof import('../tokens/SizingTokens');
  'SpacingTokens': typeof import('../tokens/SpacingTokens');
  'TapAreaTokens': typeof import('../tokens/TapAreaTokens');
  'color/index': typeof import('../tokens/color/index');
  'color/channels/chroma/chromatic': typeof import('../tokens/color/channels/chroma/chromatic');
  'color/channels/chroma/neutral': typeof import('../tokens/color/channels/chroma/neutral');
  'color/channels/hues': typeof import('../tokens/color/channels/hues');
  'color/channels/lightness/chromatic': typeof import('../tokens/color/channels/lightness/chromatic');
  'color/channels/lightness/neutral': typeof import('../tokens/color/channels/lightness/neutral');
  'semantic/AccessibilityTokens': typeof import('../tokens/semantic/AccessibilityTokens');
  'semantic/BlendTokens': typeof import('../tokens/semantic/BlendTokens');
  'semantic/BorderWidthTokens': typeof import('../tokens/semantic/BorderWidthTokens');
  'semantic/ColorTokens': typeof import('../tokens/semantic/ColorTokens');
  'semantic/ElevationTokens': typeof import('../tokens/semantic/ElevationTokens');
  'semantic/GridSpacingTokens': typeof import('../tokens/semantic/GridSpacingTokens');
  'semantic/IconTokens': typeof import('../tokens/semantic/IconTokens');
  'semantic/MotionTokens': typeof import('../tokens/semantic/MotionTokens');
  'semantic/OpacityTokens': typeof import('../tokens/semantic/OpacityTokens');
  'semantic/RadiusTokens': typeof import('../tokens/semantic/RadiusTokens');
  'semantic/ShadowTokens': typeof import('../tokens/semantic/ShadowTokens');
  'semantic/SpacingTokens': typeof import('../tokens/semantic/SpacingTokens');
  'semantic/TypographyTokens': typeof import('../tokens/semantic/TypographyTokens');
  'semantic/ZIndexTokens': typeof import('../tokens/semantic/ZIndexTokens');
  /** The built-in override maps. Not loaded by `loadTokenSet`: registration decides where each map comes from (design § 10). */
  'themes/dark/SemanticOverrides': typeof import('../tokens/themes/dark/SemanticOverrides');
  'themes/wcag/SemanticOverrides': typeof import('../tokens/themes/wcag/SemanticOverrides');
  'themes/dark-wcag/SemanticOverrides': typeof import('../tokens/themes/dark-wcag/SemanticOverrides');
}

export type TokenModuleKey = keyof TokenModules;

/** Every key of {@link TokenModules}, in the order the loader reads them. */
export const TOKEN_MODULE_KEYS: readonly TokenModuleKey[] = [
  'index',
  'semantic/index',
  'ColorTokens',
  'BlendTokens',
  'BlurTokens',
  'BorderWidthTokens',
  'BreakpointTokens',
  'DensityTokens',
  'DurationTokens',
  'EasingTokens',
  'FontFamilyTokens',
  'FontSizeTokens',
  'FontWeightTokens',
  'GlowOpacityTokens',
  'LetterSpacingTokens',
  'LineHeightTokens',
  'OpacityTokens',
  'RadiusTokens',
  'ScaleTokens',
  'ShadowOffsetTokens',
  'ShadowOpacityTokens',
  'SizingTokens',
  'SpacingTokens',
  'TapAreaTokens',
  'color/index',
  'color/channels/chroma/chromatic',
  'color/channels/chroma/neutral',
  'color/channels/hues',
  'color/channels/lightness/chromatic',
  'color/channels/lightness/neutral',
  'semantic/AccessibilityTokens',
  'semantic/BlendTokens',
  'semantic/BorderWidthTokens',
  'semantic/ColorTokens',
  'semantic/ElevationTokens',
  'semantic/GridSpacingTokens',
  'semantic/IconTokens',
  'semantic/MotionTokens',
  'semantic/OpacityTokens',
  'semantic/RadiusTokens',
  'semantic/ShadowTokens',
  'semantic/SpacingTokens',
  'semantic/TypographyTokens',
  'semantic/ZIndexTokens',
];

/**
 * Modules a consumer's copy may lack. The legacy `ColorTokens.ts` is deleted from the package by
 * Spec 133, so a copy made after that has none; `mod()` then throws and `has()` says false.
 */
export const OPTIONAL_TOKEN_MODULE_KEYS: ReadonlySet<TokenModuleKey> = new Set<TokenModuleKey>(['ColorTokens']);

/** The directories of DesignerPunk's built-in override maps under `src/tokens/themes/`. */
export type BuiltinThemeDir = 'dark' | 'wcag' | 'dark-wcag';

export interface TokenSet {
  /** The directory the modules were read from (for messages). */
  readonly root: string;
  /** The module at `key`, as the source's own copy defines it. Throws when the copy lacks it. */
  mod<K extends TokenModuleKey>(key: K): TokenModules[K];
  /** True when the source has the module (only optional keys can be absent). */
  has(key: TokenModuleKey): boolean;
  /**
   * DesignerPunk's built-in override map for `dir`, read from the installed package at run time (never
   * the consumer's copy): the bridge for a built-in theme the config does not register (design § 10).
   */
  builtinTheme(dir: BuiltinThemeDir): import('../tokens/themes/types').SemanticOverrideMap;
}
