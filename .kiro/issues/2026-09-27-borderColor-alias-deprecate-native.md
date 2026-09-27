# Issue: deprecate Container-Base's native `borderColor = "color.border.default"` alias

**Date**: 2026-09-27
**Status**: ACTIVE
**Owner**: Lina (component API) + Kenya (iOS) + Data (Android)
**Trigger**: the next native Container-Base touch, or the native-component-distribution follow-up (`2026-09-26-native-component-distribution.md`), whichever comes first. This doesn't block Spec 123.
**Source**: Container-Base phantom-vars record (`archive/2026-09-26-container-base-phantom-css-vars.md`, "Left open" item 2). Peter deferred it to Spec 123 Task 6's context. Task 6 (Ada) analysed it, and **Peter ruled option (N) on 2026-09-27**.

## The inconsistency

Native Container-Base accepts `borderColor = "color.border.default"` as an alias mapped to `color_structure_border` (Android `TokenMapping.kt`, iOS `TokenMapping.swift`). On web the value passes straight through and would emit `--color-border-default`, which doesn't exist. So the documented alias works on native and not on web. `color.border.default` isn't a registered token name.

## Ruling (N): deprecate on native, don't add on web

- Adding it on web (option W) would keep a second vocabulary alive on a third platform, pointing at a name that doesn't exist. Declined.
- Web TypeScript callers already get a type error for it.
- Task 6 showed the alias has **no effect on the name contract (5A) either way**: on web it's class (iii), consumer-supplied, which 5A deliberately doesn't check.

## Scope

Deprecate the alias on iOS and Android: a warning at use, and docs/README updated to name `color.structure.border`. Plan the removal for a later major. Check whether any product screen or demo uses it.

## Filed by

Steward (main-loop), 2026-09-27, at Peter's direction.
