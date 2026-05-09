# Issue: Figma Extractor Ignores Variable Bindings and Applied Styles

**Date**: 2026-05-08
**Severity**: High
**Domain**: Rosetta / Figma Pipeline
**Route to**: Ada
**Discovered by**: Thurgood (analysis audit)
**Extractor version**: 6.3.0

---

## Summary

The Figma component extractor (`analysis/analysis-desktop-110/`) classifies 100% of nodes as "unidentified" despite the Figma mock using primitive color variables and semantic type styles. The extractor only performs value-matching against resolved RGBA/numeric values and does not read Figma's `boundVariables` or applied text styles.

## Evidence

- 411 nodes analyzed, 0 semantic identified, 0 primitive identified, 411 unidentified
- Every entry has `"reason": "value-match"` — no variable-binding or style-based classification exists
- The JSON contains zero references to `style`, `variable`, or `bound` data from the Figma API
- Peter confirms the mock uses primitive color tokens and semantic type styles in Figma

## Expected Behavior

When a Figma node has:
- `boundVariables.fills[0].id` → extractor should resolve the variable name and classify as primitive/semantic identified
- `textStyleId` or `styles.text` → extractor should resolve the style name and classify as semantic identified

## Current Behavior

Extractor resolves all properties to computed values (e.g., `rgba(128, 255, 187, 1)`) and attempts to match against the token library by value. This loses the explicit binding information that would provide definitive token identification.

## Impact

- Token gap analysis is unreliable — can't distinguish "designer used a token" from "designer used a raw value that happens to match"
- The `suggestedToken` field provides guesses based on value proximity, but these may be wrong (e.g., suggesting `semanticColor.color.feedback.notification.text` for white)
- Blocks accurate token coverage reporting for the portfolio project

## Suggested Fix

The extractor should check for variable bindings and style references FIRST, and only fall back to value-matching for unbound properties. Classification should be:

1. **Semantic identified**: Node property bound to a Figma variable that maps to a semantic token, OR text node with an applied style that maps to a semantic type token
2. **Primitive identified**: Node property bound to a Figma variable that maps to a primitive token
3. **Unidentified (value-match)**: No binding found, attempted value match against token library
4. **Unidentified (no match)**: No binding and no value match

---

*Flagged for Ada — this is Rosetta/Figma pipeline architecture.*
