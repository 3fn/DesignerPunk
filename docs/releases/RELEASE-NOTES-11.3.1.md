# Release 11.3.1

**Date**: 2026-05-09
**Previous**: 11.3.0
**Bump**: patch

---

## Bug Fixes

### Generator Now Uses Resolved Primitives from `tokenSource`

`TokenFileGenerator` previously imported primitives via static path, ignoring the resolved `tokenSource` input. Primitive edits passed validation but didn't appear in generated output. Fixed by passing `primitiveTokens` through `GenerationOptions`.

### Duplicate Avatar Component Token Registration

`avatar.tokens.ts` and `avatar-sizing.tokens.ts` both registered `size.xs`–`size.xxl` tokens, causing "already registered" conflicts when component token discovery loaded both files. Fixed by removing the duplicate entries from `avatar.tokens.ts` (sizing file is canonical, referenced by web component). `getAvatarSize()` now correctly references `AvatarSizingTokens`.

### Error Message Detection in `resolveTokens`

The "Token source not found" error triggered incorrectly when the barrel file existed but had unresolved deep imports. The detection checked if `sourcePath` appeared *anywhere* in the error message (including stack traces). Fixed to check specifically for `Cannot find module '${sourcePath}'`.

---

## Migration

No migration needed. If you were accessing `AvatarTokens['size.md']` directly, use `AvatarSizingTokens['size.md']` from `avatar-sizing.tokens.ts` instead.
