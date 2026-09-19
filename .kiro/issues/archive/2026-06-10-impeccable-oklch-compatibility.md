# Issue: Impeccable Skill Detector Scripts — RGBA-Only Color Detection

**Date**: 2026-06-10
**Severity**: Low — functional gap in design audit tooling, not blocking
**Discovered During**: Spec 112 documentation audit

---

## Summary

The Impeccable skill's detector scripts (anti-pattern detection, color contrast checks) parse and validate colors assuming RGBA format. Post-OKLCH migration, generated CSS will contain `oklch()` values. The detectors will fail to parse these, producing false positives or silent skips.

## Affected Files

- `.kiro/skills/impeccable/scripts/detector/shared/color.mjs` — color parsing utilities
- `.kiro/skills/impeccable/scripts/detector/engines/regex/detect-text.mjs` — text color detection
- `.kiro/skills/impeccable/scripts/detector/engines/static-html/css-cascade.mjs` — CSS value parsing
- `.kiro/skills/impeccable/scripts/detector/rules/checks.mjs` — contrast ratio checks
- `.kiro/skills/impeccable/scripts/detector/browser/injected/index.mjs` — browser-injected detector
- `.kiro/skills/impeccable/reference/color-and-contrast.md` — reference doc with RGBA examples

## Recommended Fix

Update color parsing in `shared/color.mjs` to handle `oklch()` format alongside existing `rgb()`/`rgba()`/hex. The contrast check logic needs OKLCH→sRGB luminance conversion (can import from `@3fn/core`'s OklchConverter or inline the math).

## Priority

Low. The Impeccable skill is Leonardo's design audit tool. It will still work for non-color anti-patterns. Color-specific checks will need updating before they're reliable post-OKLCH, but this isn't blocking any spec or release.
