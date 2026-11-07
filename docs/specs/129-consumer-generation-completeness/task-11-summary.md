# Task 11 Summary: Native theme emission

**Date**: 2026-11-07
**Purpose**: Concise summary of parent Task 11 (Spec 129, Unit 6)
**Organization**: spec-summary
**Scope**: 129-consumer-generation-completeness

## What Was Done

`generate` now writes the native theme. On iOS: `DesignerPunkTheme` (a `Sendable` protocol), one `Equatable` struct per instance, the `<Name>Themes` holder, the `\.dpTheme` environment value, a `<Name>ThemeFamily` enum and a `<name>Theme(_ family:)` modifier. On Android: the `DesignerPunkTheme` data class, `<Name>Themes`, `LocalDPTheme`, a `<Name>ThemeFamily` enum and a `<Name>Theme(family, darkTheme) { }` composable. Four instances are emitted today, base and WCAG in light and dark; a theme you register in `designerpunk.config.ts` adds none until a later unit. Every colour semantic is a member of the theme with a resolved Display P3 value, and none is a `DesignTokens` member any more. Product tokens that reference a colour read the theme; one that references a composite is refused, naming the token.

## Why It Matters

Before this unit the shipped components read a theme that no file defined, so native could not be built from a consumer's `generate` output. Both token contexts now compile, and the Android and iOS probes read every instance.

## Key Changes

- A new emitter, `src/generators/native/ThemeEmitter.ts`, replaces the Spec 094 emitters; its tests run on the real token definitions.
- The index names every colour semantic `theme.<name>`, and its README states the root rule.
- The component tier reads the theme through the generated names (Lina), and the two direct `DesignTokens` colour reads are re-pointed.
- Seven Integration Guide sentences about missing theme types and a missing colour library are rewritten, and INSTALL is re-derived.

## Impact

Eight component list entries remain, retagged to U7. Peter's merge also accepts the removal below.

## Release note draft

**iOS and Android: the `_wcag` colour constants are removed.** `DesignTokens.ios.swift` no longer has `<name>_wcag` members, and `DesignTokens.android.kt` no longer has `<name>_wcag`, `<name>_wcag_light` or `<name>_wcag_dark`. The WCAG colours are now the `wcag` instances of the generated theme. In a View or Composable, select the family (`.<name>Theme(.wcag)` on iOS, `<Name>Theme(family = <Name>ThemeFamily.Wcag) { … }` on Android) and read the colour from the theme. Elsewhere read it from the instance: `<Name>Themes.wcagLight.<prop>` (Kotlin `<Name>Themes.WcagLight.<prop>`). More generally, no colour semantic is a `DesignTokens` member any more: read it through `\.dpTheme`, `LocalDPTheme.current` or a `<Name>Themes` instance. Generated colours are `Color(.displayP3, …)` and `Color(…, ColorSpaces.DisplayP3)` constants and need no colour library.

See the detailed completion doc: `.kiro/specs/129-consumer-generation-completeness/completion/task-11-completion.md`.
