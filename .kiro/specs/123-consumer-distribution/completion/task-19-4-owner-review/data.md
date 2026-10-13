# Data — owner review, Integration Guide § Platforms › Android (Task 19.4)

**Verdict: CONFIRMED-WITH-CORRECTIONS.** The signed sentence (guide L172) is faithful and true. Three bullets/lines need a correction or an addition: L176 is over-broad (FALSE as written), L179 omits a real Android dependency, and the Android colour bullet can name identifiers after all. Read-only; nothing run except grep/ls/git ls-files. Read at the working tree (branch task/123-u3-onboarding, uncommitted 19.4 changes).

Note on method: I read `dist/DesignTokens.android.kt` and `dist/ComponentTokens.android.kt` (gitignored local build, stamped 2026-10-03) ONLY to answer what the shipped files contain or lack. Token identity/names came from `get_token_details` (application MCP), not the snapshot.

## Faithfulness to my R1 item 1
- Guide L172 vs `feedback/tasks.md` ~L1845–1847 (R1 "The sentence I would sign"): word-for-word identical. R2 L2597 confirms the same sentence. FAITHFUL.
- Plan constraints on the sub-section: contains `reference source, not a build input` (L172, "Android: reference source, not a build input.") YES; `Native onboarding is not supported` (L172) YES; no line numbers on the surface YES; no numbered steps (bullets only) YES; never says `generate` emits a theme surface (L172 "does not emit today"; L97 "no theme surface yet") YES.
- ONE MISMATCH to decide: tasks.md Task 19 (amendment bullet, "Per platform, the build claim reads") says Android reads `not build-verified — no Android toolchain has been run`. L172 ends "no Android build has been run". Both true; they are different strings. No test asserts either (`install-doc.test.ts` has no `build-verified`/`toolchain`). If the plan wording is to bind the surface, see C-5.

## Ledger (claim -> source -> verdict)

| # | Claim | Source | Verdict |
|---|---|---|---|
| 1 | L23: iOS and Android components "ship as reference source, not a build input" | `package.json` `files`: `src/components/core/**/platforms/android/*.kt` (and ios `*.swift`) ship as source; no build wiring ships | TRUE |
| 2 | L172: components "read their theme from `LocalDPTheme`" | `grep -rl LocalDPTheme src --include='*.kt'` = 25 of 41 `.kt` files under `src/components/core/*/platforms/android/` (`git ls-files … 'android/.*\.kt$'` = 41); e.g. `Button-CTA/…/ButtonCTA.android.kt:145`, `Container-Base/…/ContainerBase.android.kt:224`. Sentence names no count. | TRUE (25 of 41; 6 component dirs are `.gitkeep` only, so "the Compose components" means the ones that exist) |
| 3 | L172: "which nothing in this package defines" | No `val LocalDPTheme`/`compositionLocalOf` for it in `src/**/*.kt`; only `LocalThemeMode` (`src/blend/ThemeAwareBlendUtilities.android.kt:77`) and an unrelated one in `InputRadioSet.android.kt:38`. Shipped `dist/*.kt` has 0 definitions (`dist/DesignTokens.android.kt` "Theme" hit = a comment). `!dist/android/**` excluded by `package.json files`. | TRUE |
| 4 | L172: "`generate` does not emit [it] today" | `TokenFileGenerator.ts:1028–1047` (`generateThemeOverrideBlocks`) and `:1285–1389` (`generateKotlinThemeTypes`, writes `val Local${abbreviation}Theme` at `:1389`): `grep -rn` over `src` excluding `__tests__` finds only the definitions, no caller. Charter: `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` item (i). | TRUE by call-graph read; not by running `generate` -> say "read, not run" if asked |
| 5 | L172: "there is no Gradle module" | `git ls-files \| grep -ci gradle` = 0; no `build.gradle`/`settings.gradle`/`AndroidManifest` tracked; none in `package.json files` | TRUE |
| 6 | L172: "checked by reading the source; no Android build has been run" | I ran nothing Android; no gradle/kotlinc on this review's path; Thurgood/Ada R1 record the same | TRUE (for this tree; "ever" is not mine to prove) |
| 7 | L175: `node_modules/@3fn/core/dist/DesignTokens.android.kt` ships | `package.json files`: `dist/**/*.{…,kt}` minus `!dist/android/**`; `dist/DesignTokens.android.kt` exists | TRUE |
| 8 | L175: "un-themed base snapshot, generated from DesignerPunk's own configuration" | File has no `{Name}Theme`/`Local*Theme` (only the WCAG comment, L682). It DOES carry nine `_wcag*` lines (L683–691). | TRUE with a nuance: "un-themed" = no theme surface; it is not free of WCAG override constants (see C-2/C-6) |
| 9 | L176: `ComponentTokens.android.kt` ships and is the component token tier | Same pack rule; file has 7 objects (`AvatarTokens`, `BadgeLabelBaseTokens`, `ButtonIconTokens`, `InputCheckboxTokens`, `InputRadioTokens`, `ProgressTokens`, `VerticalListItemTokens`) | TRUE |
| 10 | L176: "The shipped components require it" | Those objects are referenced by only 3 of the 41 files: `Avatar-Base/…/Avatar.android.kt`, `Badge-Label-Base/…/BadgeLabelBase.android.kt`, `Button-Icon/…/ButtonIcon.android.kt` (`grep -rln` for the 7 object names). The 22 others do not touch it. | **FALSE as worded (over-broad)** -> C-1 |
| 11 | L177: "omits the same 14 theme-varying semantic colours" | Native generator excludes the registry-wide theme-varying set from the semantic section (`TokenFileGenerator.ts:843–846`; set built `generateTokenFiles.ts:182–192`). My read-only count of the union of keys in `src/tokens/themes/dark/SemanticOverrides.ts` and `…/wcag/SemanticOverrides.ts` = 14 (consistent with #268's 14; the generator comment at `generateTokenFiles.ts:180` still says "10" and is stale — not on any surface). | TRUE-consistent; the count itself is #268's measurement, my union count agrees, I did not run the generator |
| 12 | Thurgood's note: Android colour bullet names no identifiers because only `_wcag` variants exist in the build | `dist/DesignTokens.android.kt`: 0 hits for `color_action_primary` and `color_structure_canvas`; only `color_action_primary_wcag` (L686) etc. Android names are knowable without the build: `get_token_details` -> `platforms.android` = `color_action_primary`; `color_structure_canvas` is read as `theme.color_structure_canvas`. Components read them: `Chip-Base/…/ChipBase.android.kt:201` (`theme.color_action_primary`), `Nav-TabBar-Base/…/NavTabBarBase.android.kt:187` (`theme.color_structure_canvas`). | **CONFIRMED in fact, CORRECTED in conclusion**: the base names are absent from the snapshot (so no identifier can be *found* there), but they are determinable, and naming them is true -> C-2 |
| 13 | L179: "the Compose BOM must be compatible with the component implementations" | No BOM or version is declared anywhere in the package (no Gradle). Components use `androidx.compose.material3`/foundation/runtime only. Inherited verbatim from the old guide (`HEAD` L177, L614). | UNVERIFIABLE-HERE (true-but-empty; cannot be checked without a toolchain). Not false; keep. |
| 14 | L179: the platform-requirements line is the Android requirement list | It omits a dependency the shipped Kotlin cannot compile without: `dist/DesignTokens.android.kt` L71–90 etc. call `Oklch(l, c, h).toComposeColor()` (emitted by `AndroidFormatGenerator.ts:348` and `:746–748`), and the file has 0 `import` lines (`grep -c '^import'` = 0). The removed section ("Platform Dependencies for OKLCH", `HEAD` L550–560) was the only place this was said. | **MISSING** -> C-3 |
| 15 | L179: "Android onboarding is a planned follow-up (Spec 129)" | Charter item (i) wires Android theme emission (`.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` L25–27). | TRUE as to the charter; spec number/directory is Thurgood's/Leonardo's to certify |
| 16 | L97: "`DesignTokens.android.kt` — Kotlin constants (no theme surface yet; see § Platforms › Android)" | `generateTokenFiles.ts:5` names the file; no theme types emitted (row 4) | TRUE |
| 17 | L98: `ComponentTokens.….android.kt` written by `generate` | Component-token generation is the same pipeline; file name as shipped in `dist/` | TRUE (name); not re-run |
| 18 | L305: a registered theme produces "no native theme output" | Rows 4 and 11 (no caller of `generateThemeOverrideBlocks`) | TRUE |
| 19 | L585: `generate` produces `dist/product/ProductTokens.android.kt` (Kotlin objects) | `src/cli/generateProductTokens.ts:58` | TRUE as stated; see C-4 for what the file can contain |
| 20 | L566/L571/L605/L688: `android` in product-token `platforms:`, screen `status:`, UI-tree branch | Product MCP/tree convention, no Android build claim | TRUE (not Android-build claims) |
| 21 | Rest of `## Reference` (L253–end): any `colormath` / `sync:android` / Compose / Kotlin claim | `grep -n -i 'android\|kotlin\|compose\|colormath\|gradle\|\.kt\b\|native'` outside L170–180: only L23, L97–98, L160, L165 (iOS), L305, L566, L571, L585, L605, L688, L728. No `colormath`, no `sync:android`, no Gradle, no Compose outside the install region. | CLEAN — no further Android claim to judge |

## Corrections (exact minimal text)

**C-1 (L176, row 10, FALSE as worded).** Replace the bullet with:

`- `node_modules/@3fn/core/dist/ComponentTokens.android.kt` is DesignerPunk's **component token tier**. Three of the shipped components (Avatar, Badge-Label-Base and Button-Icon) read it.`

**C-2 (L177, rows 8, 11, 12).** Replace the bullet with:

`- Native token output omits the same **14 theme-varying semantic colours**, among them `color_action_primary` and `color_structure_canvas`. Only `_wcag` variants of some of them are emitted.`

(The names are the Android names from the application MCP and the names the components read; the absence is checked against the shipped file. This keeps the sentence parallel to iOS L165.)

**C-3 (L179, row 14, MISSING; Ada flag 1).** Replace the line with:

`Platform requirements, for reference: the generated Kotlin calls `Oklch(…).toComposeColor()`, which needs the colormath library (github.com/ajalt/colormath), and the file imports nothing, so you add the dependency and the imports yourself. The Compose BOM must be compatible with the component implementations. Android onboarding is a planned follow-up (Spec 129).`

(Not stated: colormath's group id, version, or the import paths — I could not verify them here. The old claim "`init` scaffolds these dependencies" is NOT carried; I found no evidence for it and have not checked `init`.)

**C-4 (Ada flag 2, MISSING).** Add one bullet to the Android list (after L177):

`- Product tokens that reference a theme-varying token are emitted as a read of `Local<your abbreviation>Theme`, which nothing defines.`

Source: `src/build/product/emitters/KotlinEmitter.ts:11` (`Local${abbreviation}Theme`), `:33` (imports `com.designerpunk.tokens.Local…Theme`), `:49–52` (`@Composable @ReadOnlyComposable get() = Local…Theme.current.<prop>`); `src/cli/generateProductTokens.ts:58` writes it. Related, REASONED not run: a product token `ref:` to a token that native output strips but the index does not flag base-theme-varying (e.g. `color.action.primary`: `get_token_details` `themeVarying: false`, yet absent from the shipped Kotlin) emits `DesignTokens.color_action_primary` (`KotlinEmitter.ts` `formatKotlinValue`), a name that does not exist. I would NOT add that second sentence until someone runs `generate --product-only` on it; I list it under "could not verify".

**C-5 (L172, optional alignment, not a falsity).** Only if the plan's string is to bind the surface: replace the last sentence of L172, "This was checked by reading the source; no Android build has been run.", with:

`This was checked by reading the source; it is not build-verified — no Android toolchain has been run.`

Both versions are true. My R1/R2 accepted both the sentence and the plan bullet; Thurgood owns which is canonical. If it changes, the INSTALL.md copy (L158) and the README labelled form change with it.

**C-6 (a true fact the cause list lacks; Leonardo/Thurgood ruling needed — I do not require it).** `dist/DesignTokens.android.kt` contains lines that are not valid Kotlin: L683–691, e.g. `val color_action_primary_wcag = oklch(0.52 0.08 209)`. Cause: `TokenFileGenerator.ts:967–970` (`toAndroid` returns the input unchanged when it is not `rgba(...)`) feeds OKLCH strings into `:1008–1013`. That is a source read, not a compile; I am confident only that space-separated arguments are not Kotlin syntax. If added, one clause on L174's list:

`- The WCAG override lines at the end of `DesignTokens.android.kt` are written in CSS `oklch(…)` syntax, which is not Kotlin.`

This is a Lina/Ada generator defect (surface to Spec 129), separate from the guide.

## Answers to Ada's two flags
1. **Does the OKLCH/native-library fact belong under § Platforms › Android now that "Platform Dependencies for OKLCH" is gone? Yes**, as a clause in the existing "Platform requirements, for reference" line (C-3). Reason: the shipped Kotlin does call `Oklch(...).toComposeColor()` with no import, and L179 as it stands reads as the whole requirements list while naming only the BOM; it is also a decidable cause for "not a target yet". Counter-argument: Android is already labelled unsupported, so a dependency note serves only someone who proceeds anyway and lengthens a page whose point is "don't". Surviving residual: the clause becomes stale when Spec 129 changes how OKLCH is emitted for Kotlin (it can cite no version, so it will not go wrong by number, but it will by mechanism); I accept that, same trade-off as naming `LocalDPTheme`. No fork: one defensible option.
2. **Product tokens referencing theme-varying tokens emit an environment nothing defines — true, add one sentence (C-4).** Confirmed at `KotlinEmitter.ts:11/33/49–52`. Where: the Android list is the right home (it is a cause of "not a target"); I would NOT add it to L585 or the Product Tokens reference, since that part is not Android-specific and the iOS twin (`SwiftEmitter.ts`) is Kenya's to judge. Kenya should check his twin; I did not read `SwiftEmitter.ts`.

## Could not verify here
- That `generate` omits/emits what the sentences say, by RUNNING it: every `generate`-behaviour claim above is a call-graph/source read (no `node_modules` build in this review, read-only).
- The 14 count by re-running the generator (my count is a union of override keys, 14; #268's measurement agrees).
- Anything compile-related: colormath version/group id/import paths, BOM compatibility, whether the 25 `LocalDPTheme` files compile with a hand-written `LocalDPTheme`, `Color.argb` in the `rgba` branch of `toAndroid`.
- That `dist/*.kt` in the working tree equals what `npm pack` will ship at publish (it is a gitignored local build stamped 2026-10-03; the generator source I cited produces the same lines).
- "Spec 129" as a number/directory (charter issue exists; spec directory not checked).
- Whether `init` scaffolds any Android dependency (not checked; the removed section claimed it).
