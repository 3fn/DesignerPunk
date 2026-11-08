/**
 * Config module barrel export.
 */
export { defineConfig } from './defineConfig';
export type { DesignerPunkConfig, ConfigTheme, ThemeOverridePair } from './defineConfig';
// The types a theme's overrides are written in (Spec 129 Req 13.3): the built-in theme files and the
// docs write `SemanticOverrideMap`, so a consumer needs to import it from the same subpath.
export type { SemanticOverrideMap, SemanticOverride } from '../tokens/themes/types';
export { loadConfig } from './ConfigLoader';
export type { ResolvedConfig } from './ConfigLoader';
