# The token index gives 37 semantic tokens a web name that no packed CSS defines, and some native names the generated files do not carry; `get_token_details` serves them as the token's names

**Date**: 2026-10-26
**Filed by**: Ada, under README rule 10, for the index half of Stacy's RL-29 (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md`, phase 1 addendum 2, commit `8665395fd` on `origin/chore/release-16.1.0-claims-pass-phase-1`, not on `main` at filing). Every line below was read at `503fbfb84`, the final S of 16.1.0 at filing (S later moved to `38f4ece47`, #505). Rule 9 applies to every later edit.
**Owner**: Ada (the index generator and the token generators are hers). Thurgood is named on plan item 3 only, which is his to take or decline (see "The dated plan").
**Class**: P0 false-claim · defect *(set 2026-10-26, Ada, rule 12. `token-index/` ships in the package, and the Application MCP's `get_token_details` serves its `platforms` block as the token's platform names, with no caveat. For these entries the name is false: a reader who writes `var(--typography-button-md)` or `var(--elevation-container)` gets a property no packed CSS defines, and the browser drops the declaration without an error. That meets the floor's definition (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7: a statement false in a surface where a reader of the package meets it). I take Stacy's reading that web CSS is a build input, so the reference-source frame that keeps native-name defects out of P0 does not reach the web column. **The counter-reading** (P2 `(guard)`): no shipped component uses these 37 names, the composite rows are a stem by construction, and served docs elsewhere teach the per-property form, so the harm today is one copied line (CDG L609, Lina's). That reading is weaker where it matters: the index is the truth referent that row 3's sweep, the #495 guard and both whole-file sweeps check names against, so a wrong index name passes every check downstream of it, and the silent drop is worse than a native compile error. Only Peter downgrades a P0.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S. The fixing PR (plan items 1 and 2) closes the record with rule 5's outcome line; `merge:#<N>` at its open. **Lapse condition**: if the commit carrying items 1 and 2 (with this record's outcome line) is not an ancestor of the next release's S, the record lapses at that S, and, being P0, goes to Peter at that first lapse with exactly spec, drop or fix-now (rule 11). The waiver below covers 16.1.0 only, so at that walk the record is floor-class again.

This record merges after 16.1.0's tag by design, so it is not an ancestor of 16.1.0's S and is not read at 16.1.0's walk; `release:next:phase-1` resolves to the release after 16.1.0.

---

## Finding

**Where the names come from.** `src/generators/generateTokenIndex.ts` L330–L341 gives every semantic token one name per platform from the generator's `getTokenName(token.name, token.category)` (web at L339, iOS and Android at L331–L332 and L340–L341), whatever the token's shape and whatever its `platforms` field says. A composite token gets the stem; an Android-only token gets a web and an iOS name.

**What the web generator emits.** `src/providers/WebFormatGenerator.ts` L374–L408 (`formatMultiReferenceToken`) writes one custom property per primitive reference, `--<stem>-<property>` (L390–L398), and never the stem itself. Shadow is the one exception: it also writes the composite `--shadow-<name>` (L400–L405). So `typography.bodyMd` is emitted as `--typography-body-md-font-size`, `-line-height`, `-font-family`, `-font-weight` and `-letter-spacing` (`dist/DesignTokens.web.css` L590–L594), and `motion.floatLabel` as `--motion-float-label-duration` and `--motion-float-label-easing` (L902–L903).

**Elevation is Android-only in source.** Every `elevation.*` token declares `platforms: ['android']` (`src/tokens/semantic/ElevationTokens.ts` L66, L76 and each later entry); the layering section routes z-index to web and iOS and elevation to Android (`src/generators/TokenFileGenerator.ts` L1517); the DTCG export marks web and iOS `supported: false` with the note "Use z-index + shadow tokens instead" (`src/generators/DTCGFormatGenerator.ts` L766–L767); Token-Family-Layering says the same (`governance/Token-Family-Layering.md` L5, L168).

**The count at `503fbfb84`.** Of the 193 semantic web names in `token-index/semantics.yaml`, **37 are defined in no packed CSS** (`dist/DesignTokens.web.css`, `dist/browser/tokens.css`):

- 24 typography composites: `--typography-body-sm|md|lg`, `--typography-h-1` to `-h-6`, `--typography-caption`, `-legal`, `-display`, `-button-sm|md|lg`, `-input`, `-label-xs|sm|md|md-float|lg`, `-code-sm|md|lg`;
- 6 motion composites: `--motion-float-label`, `-focus-transition`, `-button-press`, `-modal-slide`, `-selection-transition`, `-settle-transition`;
- 7 elevation tokens: `--elevation-none`, `-container`, `-navigation`, `-dropdown`, `-modal`, `-toast`, `-tooltip`.

**The native columns, for the same rows.**

- **Typography composites are right on both platforms**: `typographyBodyMd` and `typography_body_md` are what `dist/DesignTokens.ios.swift` L457 and `dist/DesignTokens.android.kt` L457 emit.
- **Motion composites are not**: the index says `motionFloatLabel` (iOS) and `motion_float_label` (Android); the generated files emit `public struct MotionFloatLabel` (`dist/DesignTokens.ios.swift` L639) and `object MotionFloatLabel` (`dist/DesignTokens.android.kt` L636), each with `duration` and `easing` members, and neither file contains the index's spelling. One qualification: the hand-written, shipped `src/tokens/platforms/ios/MotionTokens.swift` L146 declares a top-level `public let motionFloatLabel` (an `Animation`), so the iOS index name exists in a shipped file, though not on `DesignTokens`; the Android twin (`src/tokens/platforms/android/MotionTokens.kt` L220) is `motionFloatLabel`, not the index's `motion_float_label`. Plan item 1 takes the generated output as the truth, so these hand-written files are not what the index will name.
- **Elevation on iOS is not**: the index says `elevationContainer`; the iOS output emits no elevation token (its layering line is `zIndexContainer`, L676, a different token, `zIndex.container`). The Android name `elevation_container` is right (`dist/DesignTokens.android.kt` L674).

**Served without a caveat.** `get_token_details` returns, for `motion.floatLabel`, `"web": "--motion-float-label", "ios": "motionFloatLabel", "android": "motion_float_label"`, and for `elevation.container`, `"web": "--elevation-container", "ios": "elevationContainer"` (read 2026-10-26 from this session's Application MCP).

**Age.** The 37 rows (typography, motion, elevation; all three columns) are identical at `v16.0.0`. Pre-existing, not introduced by 16.1.0.

**How it was measured.** The count compared every `web:` value in the worktree-identical `token-index/semantics.yaml` (unchanged between `7678b314e` and `503fbfb84`) with every custom property declared in the two CSS files in the main checkout's `dist/` (built 2026-10-17; the generator commits since then, #489 and the index commits #470/#452/#478, do not touch the multi-reference naming path). Stacy's count over all packed CSS is the same, 37 of 193. **At the moved S** (appended 2026-10-26, Ada): #504 (`4abfbe6de`) and #505 (`38f4ece47`) change only `governance/Component-Development-Guide.md` and `canonical/generated.lock` (`git diff --stat 503fbfb84 38f4ece47`), not `src/`, `token-index/` or `dist/`, so every count and line number in this record holds at `38f4ece47`.

**Not in this record.** `governance/Component-Development-Guide.md` L609 (`font: var(--typography-button-md);`) is the one served doc that copies a stem. It is Lina's, and she is sweeping that file in her own PR.

## Waiver for 16.1.0

Peter waived the index half of RL-29 for 16.1.0, in chat, relayed by the orchestrator, received before 2026-10-26T15:05:45Z by the orchestrator's clock. His amendment of option 1, verbatim:

> "Fix the guide section now, waive the index with a plan"

and his ruling on it, verbatim:

> "Go with the whole-file sweep and the dated plan"

**Scope**: 16.1.0 only. The guide section is Lina's fix; the index is waived, and the plan below is the one the waiver names.

## The dated plan

1. **Index generator fix.** A composite row lists the names the generators emit for it: on web its per-property names (`--typography-body-md-font-size` … ; shadow keeps its composite name as well); on iOS and Android the generated member (`DesignTokens.MotionFloatLabel.duration` / `.easing`; typography composites unchanged). A row respects `token.platforms`: elevation gets `null` on web and iOS, with the note "Use z-index + shadow tokens instead". Regenerate `token-index/`. **Owner**: Ada. **Due**: merged before the next release's walk (RELEASE-FLOW phase 1 at the next S).
2. **Mechanical check.** A Jest test in `src/generators/__tests__/` asserting that every platform name in the index is defined in the generated output for that platform (web: a declared custom property; iOS and Android: a `DesignTokens` member). **Owner**: Ada. **Due**: in the same PR as item 1, or before it.
3. **Served-docs name scan.** A script that checks every `var(--…)` and `DesignTokens.` name in the served docs against the generated output, with an allowlist for names a product defines, and a CI lane entry for it. **Owner**: Thurgood (the lane scope is his, ballot 2026-09-27-ci-regime-standing-scope, amended 2026-10-20). It is named here as the second half of the class option: item 2 makes the index true, and item 3 stops a served doc from naming what the output does not carry. Thurgood confirms or declines it in his own record or at the next walk; until he does, it is not owed by this record, and this record's close does not wait on it. If he files it, this record's outcome line points to his record.
4. **`get_token_details`.** No caveat is needed once item 1 lands: the tool serves the index's `platforms` block, so a true index makes the tool true. If item 1 has not merged by the next release's walk, the caveat question comes back with the record. **Owner**: Ada. **Due**: with item 1.

## Plan item 5: native `theme.` names for the WCAG-only colors (appended 2026-10-26, Ada, owner, rule 9)

*(Added at the orchestrator's direction, from my consult on Lina's CDG sweep, `fb8d23de9`. Read at `503fbfb84`; `src/` and `token-index/` are unchanged at this branch.)*

**The defect.** Five semantic colors have `themeVarying: false` in the index, and their native columns give the bare names: `color.action.primary`, `color.contrast.onAction`, `color.feedback.info.text`, `color.feedback.info.background` and `color.feedback.info.border` (e.g. `token-index/semantics.yaml` L272–L276: `ios: colorActionPrimary`, `android: color_action_primary`). Neither generated native file defines those bare names. `dist/DesignTokens.ios.swift` carries only `colorActionPrimary_wcag` (L687) and `dist/DesignTokens.android.kt` only `color_action_primary_wcag` (L685). The components read `theme.colorActionPrimary` (`ChipBase.ios.swift` L319, `ChipFilter.ios.swift` L369). They are exactly the five WCAG overrides (`src/tokens/themes/wcag/SemanticOverrides.ts` L15–L17, L20, L24) that do not also differ between base light and dark. The other two WCAG keys, `color.action.navigation` and `color.background.primary.subtle`, are already `true` in the index, with `theme.` names.

**Why.** The index derives the `theme.` prefix of its iOS and Android columns from `input.modeResolved.themeVaryingTokens` (`src/generators/generateTokenIndex.ts` L255, L330, L340–L341). That is the base-scoped set (`generateTokenFiles.ts` L240–L255): light versus dark only, the predicate the web `:root` block uses for `light-dark()`. The native generators take a different set, the registry-wide one (`generateTokenFiles.ts` L226–L238, passed at `TokenFileGenerator.ts` L1711–L1714), which also holds every WCAG override, and leave those tokens out of `DesignTokens`. So for these five the index's native columns name what the native output does not carry.

**My consult answer said "the index's `false` is wrong", and that was too broad.** The split between the two sets is deliberate (Spec 117 § 4.1; the comments at `generateTokenFiles.ts` L240–L247 and `ModeResolvedTokens.ts` L38–L49 say not to merge them, because merging re-introduces the R5 over-marking). For web the flag is right: these five are not `light-dark()` values in the base CSS. What is wrong is the native columns, which take the flag as their source.

5. **Native-name fix.** The index's iOS and Android columns take the `theme.` prefix from the set the native generators consume (the registry-wide set), not from the base-scoped flag. The `themeVarying` field keeps its Spec 117 meaning, and the two sets stay separate. Regenerate `token-index/`. Item 2's test covers it: a `theme.` name is correct when its token is in the native generators' set and absent from `DesignTokens`; a bare name is correct when it is a `DesignTokens` member. It holds as long as the native theme surface is not emitted (`2026-06-28-spec-094-platform-theme-emission-unwired.md`); when Spec 129 emits it, the test checks the emitted theme type. **Owner**: Ada. **Due**: with item 1, in the same PR: merged before the next release's walk (RELEASE-FLOW phase 1 at the next S). The outcome line that closes this record is not written unless item 5 is in that PR, so the lapse condition on the Trigger line covers it.

If the `themeVarying` field itself should mean the native set (one meaning for all three columns), that reverses a Spec 117 decision and is not this item. I have not chosen it, and I do not recommend it.

## Seen, not in this plan

- **105 `static let` declarations without `public` in `dist/DesignTokens.ios.swift`** (293 are `public static let`). They include the primitive colors from L70 (`static let pink100 = …`) and `zIndexContainer` at L676. This widens the question Lina routed to me about `accessibilityFocusColor` (`2026-10-26-guidelines-platform-token-names-radius-input-motion-floatlabel.md`, "Seen, not in #500"): if a consumer takes the file as a module, none of those names is readable from outside it. I have not read the color formatter or compiled anything. It is a separate defect, and I answer or file it separately; it is not covered by this waiver.
