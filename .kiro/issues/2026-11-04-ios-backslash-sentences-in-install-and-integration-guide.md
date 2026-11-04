# One sentence in the Integration Guide and in INSTALL says nine shipped components omit the key-path backslash; once the iOS fix merges and ships, it is false

**Date**: 2026-11-04
**Owner**: Thurgood (the Integration Guide's install region, derived into `docs/consumer/INSTALL.md` by `scripts/derive-install-doc.ts`; both are governance or consumer-doc surfaces outside Lina's scope).
**Filed by**: Lina, under README rule 10, in the PR that fixes the nine spellings (`fix/ios-theme-environment-key-backslash`, closing `archive/2026-10-03-ios-theme-environment-key-missing-backslash.md`). Rule 9 applies to every later edit.
**Class**: P0 false-claim · owed-act *(set 2026-11-04, Lina, rule 12. The sentence is true on `main` today. It becomes false at that PR's merge and would ship false at the first release after it, which is the release falsity floor's case. Lina may not downgrade a P0; Stacy may confirm or dispute the reading.)*
**Trigger**: `release:next:phase-1` — the sentence is rewritten or removed no later than the next release's S. *(Set 2026-11-04, Lina, rule 1: a git-visible release token, because the false text would ship in the package.)*

## The two sentences

Both read: "Nine of the shipped components also spell the theme read as `@Environment(.dpTheme)`, without the key-path backslash."
- `governance/DesignerPunk-Integration-Guide.md` L172, in the iOS "what the package ships" list.
- `docs/consumer/INSTALL.md` L158, the derived copy of the same region.

## What is true after the fix

All 27 sites now read `@Environment(\.dpTheme)` (grep: 0 without the backslash, 27 with it). The rest of the list stands: nothing defines the theme surface, so the iOS tree still does not compile for the other reasons the list names. The sentence should be removed, not reworded into a statement that the key is now spelled correctly: spelling is no longer a reason the tree fails. The line "This was checked by reading the source, and the parse failure was reproduced with the Swift compiler's parse step" sits just below it and needs no change.

## Why Lina did not edit them

`governance/**` content changes go through the ballot measure model, and INSTALL.md is derived from the guide by Thurgood's script. Removing a sentence that the fix makes false is a CORRECTION-kind edit (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds") citing the fix PR's observation record; the steward writes it.

## Closes when

The sentence is gone from both files (or the guide's install region is regenerated without it), and the outcome is recorded here, dated, then this file moves to `archive/`.

*Signed: Lina, 2026-11-04.*
