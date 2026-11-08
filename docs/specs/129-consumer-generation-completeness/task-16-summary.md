# Task 16 Summary: What the agents' theming text says (U11)

**Spec**: 129 - Consumer-Generation Completeness · **Unit**: U11 · **Date**: 2026-11-08

## What changed for an adopter

- The iOS and Android agent charters (Kenya's and Data's) no longer say that `generate` writes "no theme surface today". Each now states what item (i) emits: the fixed contract (`DesignerPunkTheme`, `DPThemeKey` and `\.dpTheme` on iOS; `LocalDPTheme` on Android), your product's `<Name>Themes` holder, the `<Name>ThemeFamily` family and its provider, and that every theme-varying colour is read through the theme.
- Both charters say what a theme of one mode shows in the other scheme (the base look), and how to give it its own look in both (register it in mode `both`; on Android, or with `.preferredColorScheme` on iOS, force the scheme).
- Kenya's charter also fixes a key path (`\.dpTheme`, not `\.{abbreviation}Theme`), the type product tokens extend (`DesignerPunkTheme`), and a stale sentence in a command cue.
- The consumer overlays, operative sets and regenerated agent files carry the same text. A consumer's Kenya and Data now describe the output the consumer's own `generate` writes.

## Release note draft

"Agent guidance: the iOS and Android agents now describe the theme types `generate` emits, instead of saying none exist."

## Open

- The lock: `canonical/generated.lock` is Lina's refresh, owed last in the lock queue.
- This is the second cut of U11; the first (#775) is superseded after a link-7 audit FAIL on two of Kenya's records (see the erratum `.kiro/issues/2026-11-08-kenya-u11-link7-erratum.md`).
- Owed to U12, Task 17: the overlay's "Native onboarding is not supported on this release" paragraph and the frontmatter comments on the un-themed `dist/ios/DesignTokens.ios.swift`.
- Two sentences that were false in the drafts were corrected before any confirmation or signature (Kenya's "the semantic colours are not on `DesignTokens`"; Data's equivalent for `DesignTokens.kt`).
