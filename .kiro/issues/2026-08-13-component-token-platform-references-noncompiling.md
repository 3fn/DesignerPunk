# Generated ComponentTokens platform files reference non-existent primitive classes

**Date found**: 2026-08-13
**Found during**: Avatar icon-size token family fix (follow-up to Button-Icon fix, PR #126) — Ada's generator audit
**Owner**: Ada (Rosetta / generation pipeline)
**Severity**: High — shipped generated output does not compile on iOS or Android (v14.0.0 affected)
**Status**: OPEN

---

## The defect

`TokenFileGenerator.getFamilyClassName()` (src/generators/TokenFileGenerator.ts) emits reference-path component token values as `<FamilyClass>.<primitiveName>`, e.g.:

- iOS: `public static let sizeLarge: CGFloat = SizingTokens.size600`
- Android: `val sizeLarge = SizingTokens.size600`

But **no `SizingTokens` / `SpacingTokens` / `BorderWidthTokens` type exists in any generated or hand-written platform file**:

- iOS primitives are flat statics on `struct DesignTokens` (`DesignTokens.size150`)
- Android primitives are members of `object DesignTokens`, with underscores (`DesignTokens.size_150`)

So `ComponentTokens.ios.swift` and `ComponentTokens.android.kt` **do not compile as shipped** (~29 dangling references each). PR #126 and the Avatar fix corrected the *family labels* (the reference now names the right family class), but the class itself still doesn't exist on either platform.

**Compounding type mismatch**: Android emits sizing primitives as `Float` (`12f`) but spacing primitives as `Dp` (`12.dp`), so even a corrected member reference would type-mismatch `Dp`-typed consumers. Fixing requires a decision on platform API shape (member naming + type unification), not just a rename.

## Related smaller defect (same surface)

Web value-path component tokens emit **unitless** custom properties: `--avatar-icon-size-xs: 12`, `--verticallistitem-padding-block-rest: 11` (no `px`). No consumer reads these today, so it is latent. Symmetric fix: append `px` for dimensional families in `formatWebComponentTokenValue`; touches Avatar-Base and Button-VerticalList-Item output.

## Why it stayed hidden

No platform-side compile check exists for the generated component token files; the in-repo consumers (e.g. `Avatar.android.kt`) consume value-path tokens (raw literals, which do compile) or hand-written constants. The reference-path output has never been compiled by any check.

## Scope for the fix (own session/spec — decisions needed)

1. Decide platform API shape: should primitives be emitted as family-grouped types (`SizingTokens.size600`) or should component token references target the flat `DesignTokens` members that actually exist?
2. Unify Android dimensional typing (`Dp` vs `Float`) across primitive families.
3. Add a mechanical guard: a compile smoke-check of generated Swift/Kotlin output (the class of check that would have caught this years-scale latency).
4. Web `px` suffix for dimensional value-path tokens.

## Cross-references

- PR #126 — Button-Icon family mislabel fix (reference path)
- Avatar fix PR (branch `fix/avatar-icon-token-family`) — family-mismatch guard in `defineComponentTokens` now prevents *label* drift at authoring time; it cannot make the emitted class exist
- `src/tokens/component/progress.ts` — the guard's first catch (one spacing-family call spanning three families)
