# Task 12 Summary: Component theme reads, the theme-read guard, Progress-Bar and ripple

**Date**: 2026-11-07
**Purpose**: Concise summary of parent Task 12 (Spec 129, Unit 7)
**Organization**: spec-summary
**Scope**: 129-consumer-generation-completeness

## What Was Done

The native components now read colours from the theme that `generate` emits, and every such read compiles against it. On iOS, helpers that used a `theme` only the view holds (three button styles, two Card functions, two Progress enums, the vertical-list padding helpers) now take it as a parameter. On Android, the same shape repairs the helpers in Card, Progress-Indicator, Button-Icon, Checkbox, Radio, Avatar and the three Badges, Container-Base gains the missing `DesignerPunkTheme` import, and Progress-Bar's malformed theme prefix is gone on both platforms. `rememberRipple` is replaced by `ripple(...)` from Material 3 in three components, and its dead import is removed from a fourth. Two temporary guards keep it that way: one fails on a theme read the generated theme does not declare or on a semantic colour read through `DesignTokens`, the other on a `rememberRipple` in any Android component.

## Why It Matters

Before this, a consumer's component tree failed to compile on a theme it could not find. The two component harness lists lose their theme-read entries (and the cascades they caused), with none added, so what they still list is real and unrelated to theme reads: type mismatches, inference errors and call-site mismatches.

## Key Changes

- Theme-read guard and ripple guard in `src/components/__tests__/`, both retiring when the component harness contexts are required.
- Row 15, row 16 and the cause-E twins of the iOS defect repaired; the row 15 and row 16 records are closed and archived.
- Row 14: the ripple items are done; the VoiceOver and TalkBack items move to Spec 132.

## Impact

A consumer building the packaged components gets theme reads that resolve. Nothing here claims runtime theme switching (Spec 132). Compile evidence is the branch-head harness run; the PR's own runs follow at head H.
