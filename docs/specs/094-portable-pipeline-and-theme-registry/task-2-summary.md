# Task 2 Summary: Platform Generator Restructuring

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry

## What Changed

All platform generators now support theme-aware output using platform-native idioms:

- **Web**: `[data-theme="name"]` scoped CSS blocks with `color-scheme: dark` for dark-only themes, `light-dark()` for both-mode themes
- **iOS**: `{Name}Theme` protocol + concrete structs + `{Abbreviation}ThemeKey` EnvironmentKey, using SwiftUI `Color`
- **Android**: `{Name}Theme` data class + named instances in `{Name}Themes` object + `Local{Abbreviation}Theme` CompositionLocal, using Compose `Color`
- **DTCG**: `$extensions.designerpunk.themes` metadata when themes are registered

Theme-varying tokens are detected automatically from the registry — union of all override keys plus base light/dark differences.

## Key Artifacts

- `src/generators/TokenFileGenerator.ts` — `ThemeOverrideSet`, platform-specific theme generation methods
- `src/generators/DTCGFormatGenerator.ts` — theme metadata in root extensions
- 19 new tests across CSS, Swift, and Kotlin theme generation

## Validation

316 test suites, 8179 tests — zero regressions. All 8 platform output files match pre-migration snapshots.

## Impact

Enables Task 3 (portable pipeline) to wire theme registration through to generation. Enables Task 4 (component migration) to update iOS/Android components to consume theme-aware output.
