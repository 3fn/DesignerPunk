# Spec Feedback: 129 — Consumer-Generation Completeness (design)

**Spec**: 129-consumer-generation-completeness
**Created**: 2026-11-05
**Phase file**: design. The requirements round is `feedback/requirements.md`; the outline and Q5 rounds are `feedback/design-outline.md`.

---

## Design Feedback

### Context for Reviewers

- **The round is open.** Peter, received 2026-11-05T05:38:16Z (orchestrator relay), verbatim: "658 and 664 are merged; go for design" → design.md header.
- **How design.md was made.** Thurgood assembled it from the four owner inbounds (#665 Lina, #666 Data, #667 Kenya, #668 Ada), all written at `2622faf3e`, cited below as L, D, K and A as design.md's header defines them. Each section names its owner, cites the inbound section, and lists the requirements it satisfies. Thurgood decided only the comparator's interface (design.md § 3). Where inbounds differ, or a call waits on an unanswered `[@NAME]`, the item is in design.md § 16 (O-1 to O-20), with both positions.
- **Facts at round-open**: `evidence/facts-at-10ec4af5b.md`, the unedited stdout of `spec-facts.sh 129 4d10202b2 10ec4af5b`. No root record's Trigger names `design.md`, so this file fires none.

**Settled, not under review** (each with its source):
- Peter's rulings in this round, with his words and times → design.md § 0: decision 5, "Re: 5, 26" (05:54:32Z, D § 6); P-2, "Re: P-2, (1); but we need to address the surviving issue about the larger migration" (05:54:32Z, A § P-2); decisions 4 and 7 and colour-track (iv), "yes, 4 (a), 7 (a)" (13:05:54Z, K § 5, A § P-1).
- The surviving issue in P-2, the channel migration, is answered by colour-track (iv): Spec 133's folder and its records' Triggers (#669, #670, #671) → design.md § 8.
- Item (ii) does not harvest into web output (option A): the team's call, since it breaks no web adopter (L § 5; A § D-5, § P-3). If a reviewer finds that it breaks one, it goes to Peter (O-14).
- Spec 123 Req 1.5: Lina's signed decision, quoted verbatim → design.md § 9. Not for review; its pointer line is Lina's act.
- Everything settled at requirements (`feedback/requirements.md` § "Context for Reviewers"), and D1 as amended (05:14:42Z).

**Under review**:
- Each owner's sections as assembled: is your call recorded as you made it, with the right source and requirement?
- design.md § 16: answer the items addressed to you, or contest a position. Agreement in R1 is what turns "agreed" into final in the Design Decisions register.
- design.md § 3 (the comparator's interface), Thurgood's own call.
- The corrections in this PR: Req 2.6's Android sentence (Data's text), and the dated line in Spec 131's outline.

**Scope boundaries**:
- Not under review: the requirements' acceptance criteria, except where an item in § 16 says a requirement may need a change (O-5, O-15); runner classes and promotions (plan decision 6, tasks); the list's file format and `harness-generate`'s name (tasks); Spec 132's inputs (L § 7), which go through their own processes.
- Core Goals' Android line is not edited in this PR (design.md § 15); how it is made is on the PR's `**Open for Peter**:` line.

**Reviewers and why each is asked** (Spec-Feedback-Protocol § "Stakeholder Identification"):
- **Ada, required**: owner of the pipeline, generators and validators; design.md §§ 4–12 and 14; O-1 to O-8, O-10 to O-13, O-18, O-19.
- **Lina, required**: owner of the component tier; co-owner of Q12, Q13 and Q3a; design.md §§ 4, 9, 10, 13; O-1 to O-4, O-12, O-13, O-20.
- **Kenya, required**: iOS harness owner and verifier; design.md § 1; consulted on § 4; O-1, O-2, O-5, O-7, O-9, O-10, O-17.
- **Data, required**: Android harness owner and verifier; design.md § 2 and the Req 2.6 correction; consulted on §§ 4, 5; O-2, O-6 to O-8, O-10, O-11, O-15, O-16.
- **Stacy, required**: verifiability. Can each design call be checked at CLOSEOUT against its requirement's instrument without asking its author? Read design.md § 3 and O-15 in particular. Stacy is also the confirmer of Core Goals' signed unit (design.md § 15).
- **Leonardo, for the adopter-facing pieces**: the fixed binding names an adopter sees and their aliases (§ 4, O-2, O-3), the founder count's step text (§ 14), and the "built for iOS 17.0, not run on 17" wording rule (§ 0).
- **Sparky, for web items only**: O-14 (option A's web effect; the cascade-order sentence), § 10's web effects of Q3a, § 8's web shadow composite.
- **Thurgood**: assembler; incorporates.
- **Round count**: one R1, then incorporation. A second round only if an R1 entry changes a decision another owner relies on, or raises a question for Peter.

#### [ADA R1]

Read `design.md` and `feedback/design.md` at `origin/task/129-design` `9ef582281`, plus the four owner inbounds (L, D, K, A). Source read with `git show` at `origin/main`. **MEASURED** = run today against the merged token index or in the scratch consumer packed from `3375c2e79`; **READ** = read in source; **REASONING** = inference, not run.

**In plain words.** I close every § 16 item that names me. On four I take another seat's position:
- Data's on the Android `CompositionLocal` (O-6) and on all four Android type-table rows (O-8);
- Lina's 62-colour definition (O-4);
- Data's on Kotlin same-name clashes, adding only a warning (O-11).

I take Data's two emitter defects into item (i), with no new record (O-7). I also add one thing nobody has raised: older adopters' configs can lack the `themes` key. Reading config alone would then drop their dark mode on web, which is a supported platform. § 10 needs a fallback rule for that (O-13).

Nothing here is Peter's.

---

**O-1, the iOS theme type's shape: `public protocol DesignerPunkTheme: Sendable`, with each instance a generated `struct` that conforms.** I can accept Lina's protocol, and I take Kenya's measured `Sendable`.
- **Why a protocol, not a struct**: the shipped component source spells `any DesignerPunkTheme` 11 times, all in `Button-VerticalList-Item/platforms/ios/VisualStateStyles.swift` (READ). A protocol keeps those 11 compiling with no component edit. Kenya measured that `protocol …: Sendable` compiles under Swift 5 and Swift 6 (K § 1 K-1).
- With a struct, those 11 sites must drop `any`, which is a component edit. REASONING: Swift rejects `any` on a concrete type.
- The generated instances are value types, so Kenya's `Equatable` point applies to them.
- **What survives**: Kotlin uses a data class, so the two platforms differ in shape at the type level. Instances are generated on both, which is what matters to Q13 (a). An adopter can hand-write a conforming type, and it breaks when a colour is added. That is the same residual as on Android, and the guide carries the rule.
- [@KENYA] Confirm that a `Sendable` protocol with generated conforming structs compiles at your pins with the 62 members of O-4.

**O-2, instance names and aliases.** One pattern on both platforms: a generated namespace named for the product, holding one instance per (theme, mode).
- **Kotlin** (Data's): `object <Name>Themes { val BaseLight …; val BaseDark …; val WcagLight …; val WcagDark … }`.
- **Swift**: the twin, `public enum <Name>Themes { public static let baseLight: any DesignerPunkTheme = <Name>BaseLightTheme() … }`, each backed by a generated struct `<Name>BaseLightTheme`. This replaces my A § D-4 bare struct names.
- **No `typealias` and no second `Local<ABBR>Theme`, in either language.** Every alias is a public name we must keep once 132 claims support (Peter's 7 (a)), and Thurgood found the Kotlin alias would share its name with Data's provider composable.
- **The adopter's product name goes where they type it**:
  - the instance namespace;
  - Data's provider composable on Android, `<Name>Theme(darkTheme = isSystemInDarkTheme()) { content }`, which is the Compose convention (`MaterialTheme { }`, `AppTheme { }`).
- Data's question to Kenya about aliasing the key path is moot, since there are no aliases.
- An iOS provider modifier is Kenya's call, not 129's. Without one, an adopter writes `.environment(\.dpTheme, <Name>Themes.baseDark)`.
- **What survives**: the binding names stay ours in the adopter's code (`\.dpTheme`, `LocalDPTheme`), which is Leonardo's objection. The instances and the Android provider carry the product's name.

**O-3, the key path's name: keep `\.dpTheme`, with Lina.**
- It matches Android's `LocalDPTheme`, so the `DP` abbreviation reads the same on both platforms.
- It is Spec 094's default (L § 1, `TokenFileGenerator.ts` L1259–1266), and the 27 iOS reads need no edit.
- Kenya's `\.designerPunkTheme` reads better. But renaming only iOS breaks the symmetry, and renaming both sides adds 25 Android files.
- **What survives**: an adopter reads "dp" in their code.

**O-4, Q13's member set: Lina's definition, every colour semantic in the token index.** I withdraw "every semantic colour the components read".
- **MEASURED** on `origin/main`'s `token-index/semantics.yaml`: 62 entries have `category: color`. 9 of them list no consumer: `color.attention`, `color.highlight`, `color.tech`, `color.data` and the five `glow.neon*`.
- So my wording would have given 53, and the set would grow each time a component starts reading another colour. That ties the theme contract to component edits.
- The index set is decidable from one file, and adopters' own components and themes may use any of the 62.
- Kenya's 61 is the scaffolded dark-override file's count, not the index's. **The index is the count**, for the probe and for the guard.
- The index names every colour semantic `theme.<name>` on iOS and Android (today 14 do, MEASURED), with `token-index/README.md` § "Platform names" in the same PR. That is my generator work, in the emission PR.

**O-5, the probe's theme list and name roots: no new index field.**
- **The theme list.** Under O-4, "native theme member" is exactly `category: color` and a `theme.` platform name, so the index already states it. Kenya's `nativeThemeVarying` flag would duplicate it.
- **The `themeVarying` flag** keeps its documented base-scoped meaning for the MCP and agents. The README says it is not the native set.
- **The root rule** is written in `token-index/README.md` and asserted by Kenya's K-5 test in `src/generators/__tests__/tokenIndexPlatformNames.test.ts`:
  - `primitives.yaml` and `semantics.yaml` names are relative to `DesignTokens` unless they begin `theme.`;
  - a `theme.` name is read through a theme instance;
  - `components.yaml` names are top-level type names.
- The probe's own n = m check then proves the rule on every run.
- **Kenya's K-5 question**: yes. The tightening is "every index iOS name resolves to a `public` member of a `public` enclosing type".
- **Req 4.2 needs a wording correction** (Thurgood): "the token index's theme-varying set" becomes "every colour semantic the token index names with a `theme.` platform name". As written it points at the base-scoped flag, which Kenya showed misses the five WCAG-only colours.

**O-6, the Android `CompositionLocal`: Data's `staticCompositionLocalOf { <Name>Themes.BaseLight }`, plus his generated provider composable.** I withdraw "keep `compositionLocalOf`".
- My only reason was that it is already tested, and the re-baseline in Req 4.3 rewrites those tests anyway.
- A theme changes rarely, so a static local's whole-subtree recomposition on a switch is the right trade. Lina reports no component read changes either way (L § 3).
- **What survives**: a forgotten provider renders base light silently, as on iOS. Only a runtime test catches it (132's D5).

**O-7, Data's two emitter defects: taken into item (i), no new record.** Both are VERIFIED by my own read of `src/generators/TokenFileGenerator.ts` at `origin/main`, and both have iOS twins:
1. **Unresolved values.**
   - Theme members get `Color.clear` (Swift, L1198–1250 via `rgbaToSwiftUIColor`, L1282–1284) or `Color.Unspecified` (Kotlin, L1353), because `getResolvedValue` (L1274) returns a primitive name, not a value. The tests pass only because their fixtures hold `rgba(…)`.
   - **Design**: the theme emitter resolves each member's value per (theme, mode) through the same resolver and native colour path as the base output (§ 6). `rgbaToSwiftUIColor` and `rgbaToComposeColor` are removed.
   - So is the light/dark `varyingNames` comparison (L1166–1167, L1320), because under O-4 the member set is fixed by the index.
2. **Imports in the middle of the file.**
   - The theme block writes its own `import` lines: Kotlin L1332–1333, and Swift `import SwiftUI` at L1183 after the base file's `import UIKit` at L412.
   - **Design**: the theme block emits no import lines. Each generated file has one import list at its head, computed from the types used (row 6 on Kotlin; `import SwiftUI` on iOS, which the colour path needs anyway).
   - REASONING: Swift tolerates a later file-scope `import`, and Kotlin does not. One rule for both is simpler to test.
- **Tests** (Jest, in `lane-functional-root`), on output generated from the repository's real token definitions, not fixtures:
  - zero `Color.Unspecified`, `Color.clear` and `unresolved` in emitted themes, per platform;
  - every import line precedes the first declaration.
- **Req 4.2** gains "with its resolved value for each theme and mode" in the same correction as O-5 (Thurgood). As written, "carry every … colour" is met by a member that holds `Color.Unspecified`.
- [@KENYA] Data asked whether iOS has the `Color.clear` shape. It does, per my read above; no build needed.

**O-8, the Android type table: I take all four of Data's rows.** They follow my own rule ("the platform's type for the value") better than my rows did.

| Row | Was (A § D-1) | Now | Why I moved |
|---|---|---|---|
| letterSpacing | `Float` (em) | `TextUnit` in `em` (`(-0.025).em`) | The value is an em length, and `TextStyle.letterSpacing` takes a `TextUnit`. 0 direct component reads (D § 2). iOS stays `CGFloat` em; Kenya should say whether iOS needs points (`.tracking` takes points, REASONING) |
| fontFamily | `String`, first stack entry | `FontFamily`, from the stack's generic family (`sans-serif` → `FontFamily.SansSerif`, `monospace` → `Monospace`, `serif` → `Serif`), with a comment naming the intended font | Compose cannot load "Figtree" by name without a font resource, so a `String` is unusable there. iOS keeps § 7's first-entry `String` (O-9 is Kenya's) |
| typography composite | generated `TypographyToken` | Compose `TextStyle(fontSize, lineHeight = <ratio>.em, fontWeight, letterSpacing, fontFamily)` | It is the type `Text(style =)` takes, and it settles row 4's undefined `Typography` on Android. The 9 reads change shape in 4 files (D § 2; Lina's coupled PR). iOS keeps `TypographyToken`, since SwiftUI's `Font` has no line height |
| percent radius | `Int` (`50`) | `CornerSize` (`CornerSize(percent = 50)`) | It keeps the percent's meaning in the corner type `RoundedCornerShape` takes. No component reads it (D § 2; A § D-1) |

- `ShadowToken` stays a generated type on both platforms, because Compose has no shadow composite (Data R1, row 4's review).
- These types need `androidx.compose.ui.text` and `androidx.compose.foundation.shape` in the token tier. Data's `:tokens` library module has the full BOM, and row 6's computed import list emits each import only where used.
- My question to Data (`FontWeight(Int)` and `RoundedCornerShape(percent:)` at the pin) is now answered by the harness's first run, not by a reading. `CornerSize(percent:)` joins it.
- **What survives**:
  - The Android token file now depends on Compose `ui-text` and `foundation`, not only `ui-unit` and `ui-graphics`.
  - iOS and Android composites differ in type (`TypographyToken` and `TextStyle`), with the same field names.

**O-10**: Kenya's and Data's. For the record, D-2 maps every colour into P3 before emission, so `ColorSpaces.DisplayP3` never receives a value outside 0–1.

**O-11, Kotlin same-name declarations: I move to Data's position, and add a warning.** I withdraw "`generate` fails".
- **The case I missed.** Adopters born before 123 have copied component source in their tree, in our packages: `src/components/core/**/platforms/android/*.kt` declaring `package com.designerpunk.components.core`. My memory notes test01 at `@3fn/core` 12.0.5 as one such repo; that is REASONING, not checked today.
  - Failing `generate` on those files would break `generate` for supported web adopters. Q7 says no.
- **Decision**:
  - The packages `com.designerpunk.tokens` and `com.designerpunk.components.*` are reserved to DesignerPunk, and INSTALL says so (Data).
  - `generate` **warns**, naming the file, when a `.kt` file in the consumer's tree declares `package com.designerpunk.tokens` and it is not in `node_modules`, `.gradle`, `build/` or `generate`'s own output.
  - A component-package copy gets one line pointing to `sync --migrate-legacy`.
  - A Jest test accepts the warning text.
  - The two-module clash itself is caught at 132's app build (D10).
- **What survives**: the warning is a text scan, so an adopter can miss it. Enforcement is 132's.

**O-12**: Lina's; nothing to add until she answers.

**O-13, Q3a: confirmed, with one addition I owe.**
- **Confirmed for Lina**: no package override is read, built-in themes included. The static imports at `generateTokenFiles.ts` L19–21 are removed, and the only source is the consumer's config `themes`, which import the consumer's copied files.
- **One exception, by definition**: in **package mode** (no `tokenSource`, so `tokenSourceMode: 'package'`, `src/config/ConfigLoader.ts` L123, READ), every primitive and semantic already comes from the package. Its built-in themes do too. Model B does not apply to an adopter who copied nothing.
- **The addition: older configs.**
  - `ConfigLoader` turns an absent `themes` key into `[]` (L42, L112, READ), and generation today applies the built-in dark and WCAG overrides whatever the config says (`errorCatalog.ts` L557's message).
  - An adopter whose config has no `themes`, or lacks `dark` or `wcag`, would therefore **lose dark mode on web** once config is the only source. That is a break on a supported platform.
  - My A § D-6 fallback covered only WCAG dark. The general rule:
    - in local mode, a built-in theme name (`dark`, `wcag`, and WCAG's dark map) that the config does not register, but whose `SemanticOverrides.ts` exists in the consumer's copied `themes/`, is applied from **their copy**;
    - `generate` prints the config line to add.
  - **Acceptance**: `Consumer Guard` cases for (a) a config with no `themes` key, (b) the old shape without a WCAG dark map, and (c) package mode. Each shows dark values in web output.
  - Retire the fallback at a major.
  - REASONING: I have not counted adopters with old-shape configs. test01 is one candidate.

**O-14**: Sparky's.

**O-18, `ConfigHelpers` against API 26: align the floors and defaults, as a small task in the Req 6 parent.**
- MEASURED: `src/build/workflow/ConfigHelpers.ts` and `src/build/BuildOrchestrator.ts` have **no caller** in `src/cli`, `scripts` or `bin` (`git grep`, `origin/main`), and no `exports` entry reaches them. So no consumer path reads these numbers today, and the change is consistency, not behaviour.
- **Change**:
  - Android: `minSdkVersion` default 24 → 26 (L583), and the validation floors 21 → 26 (`ConfigHelpers.ts` L791; `BuildOrchestrator.ts` L616), with the message naming Core Goals.
  - **Also found**: iOS `minimumDeploymentTarget: '15.0'` (L578) contradicts Core Goals' iOS 17.0+ and Peter's 4 (a). Changing it to `'17.0'` belongs in the same task.
- Kotlin `1.9.0` and `targetSdkVersion: 34` are stale against the harness pins, but those are range numbers, which belong to Spec 132's D4. 129 leaves them alone.
- `src/build/**` is outside my standing write scope, so this needs a tasks-row grant.

**O-19, requirements with no design call.**
- **Req 12, the design**:
  - `platforms:` maps keys from `PLATFORM_KEYS = ['web', 'ios', 'android']` to `{ output: '<path>' }`. A new `PLATFORM_KEYS` constant lives in `src/config/` and the CLI validation imports it.
  - An unknown key, or a path outside the project root, fails, naming it (12.3).
  - A named platform's native files go to its folder, which holds nothing else. The DTCG and Figma JSON and the web files stay at `output` unless `web` is named.
  - Generated file names are checked against the packaged native file names by `pack-assert`'s name list (12.4).
  - `token-index/` is unaffected.
- **Req 13.3**: settled by its text. `src/config/index.ts` re-exports `SemanticOverrideMap` and `SemanticOverride`, plus O-13's `{ light, dark }` form of `ConfigTheme`'s `overrides` in the same file. `src/config/**` needs a grant.
- **Req 10.3, the design**: `scripts/pack-assert.ts` (in my scope) asserts that every packed file under `platforms/android/res/` has a path of the form `res/<type>[-<qualifiers>]/<name>.<ext>`, with `<type>` one of Android's resource directory names and `<ext>` one of `xml`, `png`, `webp`, `jpg`, `9.png`, `ttf` or `otf`. The Icon-Base README fails it until Lina's record moves the file.

**O-20, my asks**: still open with Lina (`offGridReason` wording) and Leonardo (the founder step text). Neither blocks design.

---

**My sections, as assembled**

- **§ 4**: O-1 to O-7 above.
- **§ 5**: change the Android column for the four O-8 rows; the composite line becomes "`TextStyle` on Android, `TypographyToken` on iOS".
- **§ 7**: Android follows O-8's `FontFamily`.
- **§ 10**: add O-13's general fallback and package-mode rule. A "no package override is read" sentence without them is false for package mode and breaks older adopters' dark mode.
- **§ 9**: the O-11 line.
- **Testing Strategy**: replace the "Kotlin package test" with O-11's warning test, and add O-7's two real-output tests.
- **§ 15**: O-18's text above.
- **Everything else in § 6, § 8, § 11, § 12 and § 14 is recorded as I made it.**

**Nothing here is Peter's.**
- O-13's fallback keeps web output unchanged for existing adopters, so it does not reach Q7.
- O-18 touches no consumer path.
- The iOS 15.0 default is brought into line with what he already ruled, not changed against it.

#### [LINA R1]

Read `design.md` and `feedback/design.md` at `origin/task/129-design` `9ef582281`, and the four inbounds on that branch. My checks ran against `origin/main`. Labels: **VERIFIED** = I read or ran it today; **CARRIED** = another seat's measurement; **REASONING** = inference. No repo edits.

**In plain words.**
- I close every open item that names me: O-1, O-2, O-3, O-4, O-12, O-13, and my parts of O-11 and O-20.
- Each answer accepts the other owner's position or narrows it.
- None needs Peter.
- **My signed Spec 123 decision in § 9 is quoted verbatim.** I diffed it against my inbound's § 6, line by line, and there are no differences (VERIFIED, 18 of 18 lines identical).
- Two things change the component side:
  - Kenya's measured Swift 6 finding (the iOS theme must be a `struct`) adds 11 small edits to my emission-coupled PR.
  - The component reads favour Compose's `TextStyle` over a generated `TypographyToken` for Android's typography composite. That is O-8, which is Ada's call; I give the component evidence.

---

**Answers to my @ mentions** (from the inbounds)
- **[@LINA] from [ADA] D-4: agree or contest Q12 (a) and Q13 (a), and does Q13 (a) change my guard's baseline?** I agree to both, with the member set settled in O-4 below.
  - **The guard's baseline shrinks.** The about 173 static reads were "undeclared" only under (b). Under (a) every `theme.` read of a colour semantic resolves.
  - At start, the guard pins only the 2 `DesignTokens.<semantic colour>` reads (`AvatarPreview.kt`, `ProgressPaginationBase.ios.swift`; VERIFIED in my design inbound).
  - It still cannot see row 16's prefixed reads or Button-CTA's bare reads (Req 4.4). The harness accepts those.
- **[@LINA] from [ADA] D-5, D-6, D-8**: see O-12, O-13 and O-20 below.
- **[@LINA] from [DATA] § 4: does the per-consumer varying set move me to Q13 (a), and do fixed names with consumer-named aliases fit Q12?**
  - Q13 (a): yes. It was already my call, on the same reason (L § 2).
  - Fixed names: yes. Aliases: no; see O-2.
- **[@LINA] from [DATA]: the typography composite's 9 reads and the six badge `minWidth` sites are mine under Req 6.8**: yes. See "My sections", § 5.
- **[@LINA] from [KENYA] § 4: do I take R-1 (a `Sendable` theme type) and R-2 (the key path's name)?** R-1: yes, as a `struct` (O-1). R-2: keep `\.dpTheme` (O-3).
- **[@LINA] from [KENYA] § 4: do I take Q13 (a) on her § 3 reasoning?** Yes.

---

**1. The open items that name me**

- **O-1, the iOS theme type's shape → a `struct`. I accept Kenya's lean, and Ada's "protocol or data class" admits it.**
  - **The decision**:
    - `public struct DesignerPunkTheme: Sendable, Equatable`, with one stored `public let <name>: Color` per colour semantic (O-4) and a generated memberwise `public init`;
    - `public struct DPThemeKey: EnvironmentKey { public static let defaultValue = <base light instance> }`;
    - the same shape as Android's `data class DesignerPunkTheme`.
  - **Why**:
    - Today's `any ${name}Theme` default fails Swift 6: "static property 'defaultValue' is not concurrency-safe because non-'Sendable' type 'any DesignerPunkTheme' may have shared mutable state" (Kenya K-1, CARRIED, measured). A `struct` is `Sendable` without ceremony.
    - Under Q12 (a) and Q13 (a), every instance is generated, so a protocol buys nothing an adopter needs. To vary a theme, they edit their override maps and run `generate`.
  - **The component cost**:
    - `Button-VerticalList-Item/platforms/ios/VisualStateStyles.swift` has 11 `any DesignerPunkTheme` sites (VERIFIED, `git grep -c`). REASONING, not compiled: `any` on a concrete type is rejected, so each becomes `DesignerPunkTheme` in the same PR as emission. They join Req 4.5's coupling (§ 13).
    - The 27 `@Environment(\.dpTheme)` reads are unchanged; the type is inferred.
    - Android's 11 `theme: DesignerPunkTheme` parameters in `VisualStateStyles.kt` are unchanged (VERIFIED).
  - **What survives**: an adopter cannot write a computed or dynamic theme by conforming to a protocol. They build an instance instead. That covers colours, which is all the theme carries.
- **O-2, instance names and aliases → one holder named for the product, on both platforms, and no aliases for the binding.**
  - **The decision**:
    - Swift `public enum <Name>Themes { public static let baseLight, baseDark, wcagLight, wcagDark, <custom>Light/Dark: DesignerPunkTheme }`;
    - Kotlin `object <Name>Themes { val BaseLight; val BaseDark; … }`, which is today's generator (`TokenFileGenerator.ts` L1326–1405, VERIFIED);
    - one member per registered theme and mode (Req 4.1).
  - **No `typealias <Name>Theme = DesignerPunkTheme`, no `val Local<ABBR>Theme = LocalDPTheme`, and no Swift key alias.**
  - **Why**:
    - Two names for one binding is a teaching and documentation cost on every page that shows a read.
    - Data's provider composable `<Name>Theme(darkTheme = …) { content }` (D § 3) is the better home for the product's name: it is what an adopter writes at the top of their app, as `MaterialTheme` is. The design already notes that his alias would collide with it.
    - Leonardo's principle (generated names carry the product's name) holds where adopters actually type: the holder and the provider.
  - **What survives**: adopter code that annotates a type writes `DesignerPunkTheme`. The binding is ours by name, the same price web pays with `--color-*`.
  - **What would settle it if Data or Ada still wants aliases**: one example of adopter code that is clearer with the alias than with the holder and provider. I have not found one.
  - The iOS provider (a view modifier, or `.environment(\.dpTheme, <Name>Themes.baseDark)` as is) is Kenya's call.
- **O-3, the key path's name → keep `\.dpTheme`.**
  - It matches Kotlin's `LocalDPTheme`, so both platforms read one abbreviation.
  - It is the generator's own default (`abbreviation = 'DP'`).
  - It is what all 27 reads and the shipped docs already say.
  - Kenya's `\.designerPunkTheme` reads better. But it costs 27 edits, breaks parity with `LocalDPTheme` unless that is renamed too (25 Android files), and gains no check.
  - The harness's `pb` consumer (Req 2.2) already shows the name is package-fixed (Kenya R-2).
- **O-4, Q13's member set → every colour semantic in the consumer's token index (`category: color`). I cannot accept "every colour the components read".**
  - **The decision**: the theme carries every entry the consumer's index classes as a colour semantic, 62 in DesignerPunk's at `origin/main` (VERIFIED, script; every one has a non-null iOS name).
    - That count includes the five `glow.neon*` entries.
    - The index names each one `theme.<name>` on iOS and Android, with `token-index/README.md` § "Platform names" changed in the same PR.
    - The probe (Req 4.2) and my guard (Req 4.4) both read that list from the index.
  - **Why not "the colours the components read"**:
    - Our components are not the only readers. The adopter's own components (132's D10, "build more") and their product tokens read the theme too.
    - A set derived from our source would also couple the generated API to our component code, so a component edit would change every adopter's theme type.
    - And an adopter reading an unlisted colour through `DesignTokens` would meet the failure Q13 (a) exists to prevent.
  - **Kenya's 61** comes from the scaffolded dark-override file (K § 3). The index is the count, and the reconciliation is hers to read against it. One plausible difference is an entry the override file does not list; I did not find which.
  - **For Thurgood**: Req 4.2 says "the token index's theme-varying set". Under this answer that becomes "every colour semantic". Without the change, a probe reading `themeVarying: true` reads 9 colours, not 62 (VERIFIED: 9 flagged, 14 with a `theme.` prefix today). That is a requirements CORRECTION, and it is O-5's other half.
- **O-11, Kotlin same-name declarations → both Ada's and Data's.**
  - `generate` fails on a consumer `.kt` file, outside `node_modules` and its own output, that declares `package com.designerpunk.tokens` or `com.designerpunk.components…` (Ada).
  - And INSTALL states the reservation as the rule (Data), because `generate` sees only the adopter's tree, not a module that lives elsewhere.
  - My "or a lint step" falls away; `generate` is the step.
  - I accept that 129 claims only what `generate` can see.
- **O-12, the precedence key and the component union → yes, it matches, with two clarifications for the design text.**
  - **The keys differ by design, and the directory bridges them.**
    - The component union keys on the Stemma name (the `component:` field in `contracts.yaml`, for example `Avatar-Base`).
    - Token precedence keys on the token group name (the `defineComponentTokens` `component:` argument, for example `Avatar`, `ButtonIcon`, `VerticalListItem`; VERIFIED in the six files).
    - Ada's rule 1 (3) joins them: a package definition file is a source only if its component directory wins the union.
  - **Dropping a shadowed component's group is safe.** Each package group is read only by its own component: `AvatarTokens` by Avatar-Base, `BadgeLabelBaseTokens` by Badge-Label-Base, `ButtonIconTokens` by Button-Icon, `VerticalListItemTokens` by Button-VerticalList-Item. `InputCheckboxTokens` and `InputRadioTokens` have no native reader (VERIFIED, `git grep` over native component files).
  - **Progress** lives in the token tier (`src/tokens/component/progress.ts`), not in a component directory. Under Model B it is the consumer's from birth, the package's copy is never a source, and Ada's "(copied at init)" message is the right report.
  - **One report to add**: when a package component directory loses the union, `generate` prints `component tokens: <Group> — not emitted (DesignerPunk's <Component> is replaced by yours)`. Otherwise an adopter who forks a component and still reads its old group meets a compile error with no hint. [@ADA] Can that line join D-5's messages? -- [LINA R1]
- **O-13, Q3a's additions → I agree to all three. My own question is answered by Ada's text.**
  - Ada's three additions: `ConfigTheme`'s optional `{ light, dark }` form; `init` writing the WCAG entry with both maps; the old-shape fallback to the consumer's own `themes/dark-wcag/SemanticOverrides.ts`. The fallback reads the adopter's file, never ours, so it is consistent with Model B.
  - Her removal of the static imports in `generateTokenFiles.ts` L19–21 covers the built-in themes, which is what I asked.
  - **One gap**: if an old-shape config's `wcag` theme has no dark map **and** the consumer's tree has no `dark-wcag` file, the rule as written emits no WCAG-dark instance and says nothing. Components are unaffected, because the key defaults to base light, but the adopter's WCAG-dark mode would vanish silently. [@ADA] Should `generate` print that WCAG dark is not emitted, and why, in that case? -- [LINA R1]
- **O-20, my two asks.**
  - **The `offGridReason` for Button-VerticalList-Item's `paddingBlock.rest` (11)**, in my words, for `Button-VerticalList-Item.tokens.ts`. It is derived from the file's existing reasoning (VERIFIED, L28–31):

    > `offGridReason: 'Padding compensation: (48 target height − 24 content height) / 2 − 1 rest border (borderWidth100) = 11. With the 2 px selected border the same formula gives 10 (space125), so the pair holds the height constant; the value is derived from the tap target, the content height and the border, not from the spacing grid.'`

    This adds metadata to an existing token. It creates no token and changes no value. It lands in the PR that adds the field (Ada's D-8).
  - **`rendering:`, one field or two (my question to Leonardo, unanswered)**: my own position until he answers is **one field, for the look**: `rendering: { <platform>: { kind: platform | drawn, reason } }`.
    - Behaviour departures belong in each contract's per-platform validation (the second 132 ballot), because "as described" is the contracts (plan-r2 § 1).
    - Recording behaviour in two places would let them disagree.
    - It is a 132 input; Leonardo may contest it at 132's outline.

---

**2. My sections**
- **§ 4**: right, with O-1 to O-4 closed as above. Add O-1's 11 iOS `any` edits to the emission PR's coupling.
- **§ 5, the component side (Ada's and Data's asks)**:
  - The three coupled component PRs are mine, each in the generator PR it follows (Req 6.7, 6.8): I-1's 16 `.dp` sites, I-2's `font_size_*` reads (groups B and C plus item 3's typography constants), and the `fontWeight` form.
  - **The six badge `minWidth` sites keep today's behaviour in 129**, `(font_size.value * line_height).dp`, as Ada proposes.
    - Whether a badge minimum should scale with font size is an accessibility question about the badge's contracts. It goes to 132's per-platform validation, with Leonardo.
    - REASONING: a fixed minimum does not clip scaled text, because the badge still grows with its content and padding.
  - **Component evidence for O-8 (Ada decides; Data consulted)**: of the 9 Android typography-composite reads (VERIFIED, `git grep`):
    - 3 assign the whole composite to a `TextStyle` field: `ButtonCTA.android.kt` L283, L294, L305, `typography = DesignTokens.typography_button_*`;
    - 6 read a field: `.fontSize` or `.fontWeight` in `VerticalListButtonItem`, `ButtonVerticalListSet` and `NavHeaderPage`.

    Compose's `TextStyle` has both fields, so emitting `TextStyle` compiles all 9 with only `ButtonVerticalListSet` L524–525's `.sp` and `FontWeight(…toInt())` to change; those change under either option. A generated `TypographyToken` also breaks Button-CTA's three assignments. So the component side favours `TextStyle` on Android; the call stays Ada's.
- **§ 9**: right. Two notes:
  - The cascade-order sentence for the Integration Guide (adopter CSS after `@3fn/core/component-tokens.css`) is a `governance/` edit. I draft it, with Sparky. It travels in Req 15's INSTALL PR as EXECUTION under Req 15, and Peter merges it.
  - My pointer line at Spec 123 Req 1.5 lands in the PR that merges this file, or right after it, as § 15 says.
- **§ 10**: right, with O-13's gap.
- **§ 13**: right. Add O-1's 11 iOS edits. The size stays about 0.5 session plus the couplings.
- **Spec 132 inputs**: right as listed. The `rendering:` record is filed after this file merges.

---

**3. Peter's**: nothing from me.

---

**4. Questions** (my O-12 and O-13 closes include one line each that depends on Ada)
- [@ADA] O-12: add the "not emitted (replaced by yours)" report? O-13: print when a WCAG-dark instance is not emitted? -- [LINA R1]
- [@KENYA] O-4: which colour semantic does your 61 leave out, read against the index's 62? -- [LINA R1]

#### [KENYA R1]

Read at `origin/task/129-design` `9ef582281`: `design.md`, `feedback/design.md`, and the four design inbounds.

**Labels**:
- **VERIFIED** = I ran it today on this Mac (Xcode 27.2, Swift 6.4.2, iPhone simulator SDK 27.2, target `arm64-apple-ios17.0-simulator`). These are toolchain results, not results under the harness's 26.x pin.
- **VERIFIED (macOS)** = run as a macOS binary, because I had no simulator; the iOS behaviour is unverified.
- **READ** = read in source at `origin/main`.
- **UNVERIFIED** = reasoning or training data.

**Inputs**: the scratch consumer from earlier rounds (`@3fn/core@16.2.0`, `pb`) and toy files outside the repo. No downloads, no installs, no `simctl`.

---

**Plain language first**

- **I accept Lina's protocol for the iOS theme type (O-1)**, on one condition: the protocol says `Sendable`. A struct would break 11 existing lines in one shipped file. A `Sendable` protocol breaks none, and it passes Swift 6 (VERIFIED).
- **Adopters can get their own names on iOS cheaply (O-2).** A type alias and a second environment key that forwards to ours both compile, and a value written through the alias is read through our fixed key (VERIFIED (macOS)). So I withdraw my rename of `\.dpTheme` (O-3).
- **My "61" was wrong (O-4).** I took it from a comment in the scaffolded override file, and that file lists only 54. The token index has **62** colour semantics (VERIFIED). The index is the count.
- **A hole in the harness, found this round (O-15).**
  - When our component-token file and a component both declare the same type, the "declared twice" error lands in whichever file comes first in the compiler's file list (VERIFIED).
  - If that is the generated file, the component context throws the error away, because it is not a component file, and the token context never sees it. The error would be invisible.
  - The fix has two parts:
    - pin the file order, package files first;
    - adopt Data's rule, so the component context also keys generated-file errors that the token context did not report.
- **Empty font name (O-9).** `Font.custom("", …)` does not give the system font. It gives a fallback face, the same one an unknown font name gives (VERIFIED (macOS)). So "use the platform font" should be `nil`, not `""`.
- **Nothing here is Peter's.**

---

**1. O-items that name me**

- **O-1, the iOS theme type's shape.** Final position: **accept Lina's protocol, with `public protocol DesignerPunkTheme: Sendable`.** Theme instances are generated structs conforming to it. → design.md § 4, § 16 O-1.
  - **The protocol needs no component edit.**
    - The shipped source uses `any DesignerPunkTheme` 11 times, all in `Button-VerticalList-Item/platforms/ios/VisualStateStyles.swift` (L166–L363; VERIFIED by grep over the 16.2.0 package).
    - On a struct, every one of those is an error: `'any' has no effect on concrete type 'DesignerPunkTheme'`, in both Swift 5 and 6 (VERIFIED).
  - **Without `Sendable`, Swift 6 rejects the key.** Today's key, `defaultValue: any …Theme`, fails Swift 6 (my inbound K-1, VERIFIED). With `: Sendable` it compiles in both modes, and so does an adopter's Swift 6 `static` of the theme (VERIFIED).
  - **This withdraws my struct lean (K § 2 R-1).** Your reading was right, Thurgood: a struct changes those `any` sites.
  - **Acceptance**: the generator test asserts the `: Sendable` clause. The token context compiles the theme at `-swift-version 6` (K-1).
  - Lina's protocol and Ada's "protocol or data class" are compatible on iOS: protocol on iOS, data class on Kotlin.
- **O-2, instance names and adopter-named aliases.**
  - **Data's question to me, whether Swift can alias the key, is answered: yes, cheaply** (VERIFIED in both language modes, iOS 17 target).
    - A type alias: `public typealias PbTheme = DesignerPunkTheme`.
    - A second environment property that forwards to ours: `public extension EnvironmentValues { var pbTheme: any PbTheme { get { dpTheme } set { dpTheme = newValue } } }`.
    - **Round trip, VERIFIED (macOS)**: `env.pbTheme = PbThemes.baseDark`, then `env.dpTheme` reads `PbBaseDarkTheme`.
  - **What I recommend the generator emit, Lina and Ada to rule**:
    - Ada's instance structs, `<Name>BaseLightTheme`, `<Name>BaseDarkTheme`, `<Name>WcagLightTheme`, `<Name>WcagDarkTheme`.
    - A holder, `public enum <Name>Themes { static let baseLight: any DesignerPunkTheme … }`, matching Data's Kotlin `object {Name}Themes`.
    - The two aliases above.
    - An implicit member per instance, so `.environment(\.dpTheme, .pbDark)` works. That is a `static var` in an `extension DesignerPunkTheme where Self == <Name>BaseDarkTheme`; it compiles (VERIFIED).
    - Skip each alias when it would equal the fixed name (Data's rule: name `DesignerPunk` or abbreviation `DP`).
  - **No collision on iOS.** iOS has no provider type named `<Name>Theme`, so the collision Thurgood read in Data's Kotlin provider has no Swift twin.
  - **Acceptance**: the probe reads the theme through `\.dpTheme`, and through the adopter alias where emitted (the harness consumer is `pb`, so it is emitted).
- **O-3, the key path's name.** I accept `\.dpTheme`, unchanged, and withdraw my rename (K § 2 R-2).
  - The alias in O-2 lets an adopter write `\.pbTheme`, which answers the naming concern.
  - The 27 component reads stay as they are.
- **O-4, Q13's member set.** **I withdraw 61. The count is the index's: 62 colour semantics** (VERIFIED: `category: color` entries in the consumer's `token-index/semantics.yaml`).
  - **Where 61 came from**: it is the header comment of the scaffolded `src/tokens/themes/dark/SemanticOverrides.ts` ("all 61 semantic color tokens").
  - **That comment is stale.** The file actually lists 54 names. It is missing `color.contrast.onAction`, `.onDark` and `.onLight`, and the five `glow.neon*`. (VERIFIED: 62 index names minus 54 listed = 8.)
    - That is a small finding for Ada, the file's owner. The scaffold teaches adopters an incomplete override list.
  - **On the definition, I support Lina's "every colour semantic in the index"** over "every semantic colour the components read".
    - The probe (Req 2.7) and the guard (Req 4.4) need a set that can be decided from the index alone. "Read by a component" is a scan of source, and it would change whenever a component changes.
    - It also has to cover colours that adopters' own components read and ours do not.
- **O-5, the probe's theme list and the name roots.** This resolves once O-4 does.
  - **If the index names every colour semantic `theme.<name>` on iOS** (Lina's index change), the probe needs no native-varying flag. It reads every entry whose iOS name starts with `theme.` through each theme instance.
    - Today 14 of the 62 carry `theme.` and 9 are `themeVarying: true` (VERIFIED). That is the drift Lina names.
  - **So I withdraw my ask for a `nativeThemeVarying` field.**
  - **What I still need from Ada** is one sentence in `token-index/README.md` § "Platform names" stating the root rule the probe follows:
    - an iOS name starting `theme.` is read through the theme;
    - a primitive or semantic name is relative to `DesignTokens` (for example `Duration.duration150` → `DesignTokens.Duration.duration150`, matching the generated nesting, READ);
    - a component name is top-level (`ProgressTokens.connectorThickness`).
  - **A correction for Thurgood.** Req 4.2 says "The probe's list of colours SHALL come from the token index's theme-varying set". Under O-4 it should read "from the token index's colour semantics, each named `theme.<name>` on the platform". That is a requirements correction, not a design call.
- **O-7, the `Color.clear` shape on iOS.** **Yes, iOS has it** (READ, `src/generators/TokenFileGenerator.ts` at `origin/main`):
  - `getResolvedValue` (L1274–1279) returns `primitiveReferences.value`, which is a primitive name such as `cyan300`.
  - `rgbaToSwiftUIColor` (L1282–1290) matches only `rgba(…)`, and otherwise returns `Color.clear /* unresolved: … */`.
  - Five sites (L1198–L1250) also write a bare `Color.clear` when a theme lacks the token.
  - **A second iOS fault in the same function**: where it does resolve, it emits sRGB `Color(red:green:blue:opacity:)` to two decimal places, against § 6's Display P3 at four. So the theme emitter must go through § 6's converter, not its own `rgba` path.
  - **I support Data's Jest assertion**: generate from real token definitions, and fail if any emitted Swift theme contains `Color.clear` or `/* unresolved`. A compile cannot catch either.
  - Ada takes it into item (i), or files it.
- **O-9, the empty font family on iOS.** **Recommendation: `String?`, and emit `nil` when the stack starts with a generic keyword.** Ada decides.
  - **Measured on macOS**, with an `ImageRenderer` render compared byte for byte:
    - `Font.custom("", size: 20)` does not crash, but it is **not** the system font.
    - It renders identically to `Font.custom("NoSuchFont123", size: 20)`, a non-system fallback face.
    - `NSFont(name: "", size: 20)` is `nil`.
  - **This also contradicts Ada's REASONING in D-3** that a missing name "falls back to the system font". On Apple platforms, a missing font is silent **and** a different face. (Figtree happens to be installed on this Mac, so my missing-font case used `NoSuchFont123`.)
  - **iOS**: the same behaviour is UNVERIFIED (no simulator). The iOS SDK compile of the branch form (`fontFamily == nil ? .system(size:) : .custom(…)`) passes in Swift 6 (VERIFIED, using `isEmpty`; the optional form is the same shape).
  - **Why `nil`**: it makes the "platform font" intent a type the compiler enforces. `Font.custom` cannot take `nil`, so a component must branch to `.system`. No component reads `fontFamily` today, so the cost is zero.
- **O-10, the colour constructors at the pins.** **iOS: VERIFIED at this toolchain, not at the 26.x pin.**
  - `Color(.displayP3, red:, green:, blue:, opacity:)` compiles at the iOS 17.0 target in Swift 5 and 6, with no error.
  - Values outside 0–1 (`1.02`, `-0.01`) also compile. What happens to them at runtime is UNVERIFIED, and per § 6 they should not occur after gamut mapping.
  - The harness's first run under the pin confirms this for the pinned toolchain.
- **O-15, iOS parity on generated-file diagnostics.** **I support Data's rule for iOS, plus a pinned file order.**
  - **The test** (VERIFIED). I compiled the package's own seven-enum `ComponentTokens` (standing in for item (ii)'s harvested output, because `Avatar.ios.swift` and `BadgeLabelBase.ios.swift` declare `AvatarTokens` and `BadgeLabelBaseTokens` themselves) with the components, as one module:
    - with the generated file first, `invalid redeclaration of 'AvatarTokens'` and `'BadgeLabelBaseTokens'` land **in the generated file**;
    - with it last, they land in `Avatar.ios.swift` and `BadgeLabelBase.ios.swift`;
    - Stage T alone (generated files only) reports **none**.
  - **So under Req 2.6 as written**, with the generated file first, Stage C filters both errors out (not its tier) and Stage T never sees them. A real cross-tier defect is invisible.
  - **This corrects my Q5 determinism claim.** A reversed file order gave identical diagnostics for that input, but not for redeclarations.
  - **Fix part 1, a design change I make in K-1**: Stage C's file list is pinned as package files first and generated files after, each sorted by path, and the order is printed with the invocation.
  - **Fix part 2, a requirements change** (Thurgood, with Data and Stacy): Data's rule. A generated-file diagnostic seen by the component context and not by the token context is keyed by the component context.
    - It closes the hole independently of compiler behaviour, which may change with an Xcode pin.
  - **Counter-argument folded back**: the rule makes a generated-file key appear in a component list, which blurs the tiers.
    - **What survives**: a key under `gen:` on the component list must be read as "a cross-tier conflict". The comparator's summary line should count such keys separately. That is Thurgood's call.
- **O-16, one theme shape across platforms** (Data closes). My half is moot now that I accept the protocol (O-1). The contract is the same on both platforms: fixed names, every colour, generated instances. The shapes are each platform's own, a Swift protocol and a Kotlin data class. Whether my strict-mode / written-mode split has an Android counterpart is still Data's.
- **O-17, the Swift key grammar.** **`<root>:<path> | <message>`, the same as Data's.**
  - `root` is one of `gen`, `pkg`, `probe`.
  - `path` is POSIX and relative to that root.
  - `message` is the text after `error: ` on the `-diagnostic-style llvm` location line, verbatim, including quoted identifiers and the bracketed group tag (for example `[#MutableGlobalVariable]`).
  - The parser splits at the **first** ` | ` after the path. A path cannot contain ` | `, and a message may contain `|`, for example `||`.
  - Only `error:` lines become keys. `note:` and `warning:` lines do not (K-2).
- **O-20, the `harness/ios/` grant** (tasks round). The paths my work needs:
  - `harness/ios/**`: the two self-test fixtures, the Swift diagnostic parser, the probe generator, and the stage script;
  - the iOS section of the shared pin file, wherever Thurgood places it;
  - the iOS job's steps in the harness workflow, which is Thurgood's wiring.

  I write nothing under `src/**`, `scripts/**` or `.github/**` beyond what the grant names.

**2. My design sections**

- **§ 1 is right as assembled, with three amendments from this round**:
  - **K-1**: add the pinned Stage C file order (O-15).
  - **K-3**: the theme list comes from the `theme.`-named colour semantics, and the root rule cites the README sentence (O-5).
  - **K-2**: add O-17's grammar.
- **Traceability holds**: Req 2.4, 2.6, 2.7, 2.8, 2.9, 3.2, 3.4, 3.10 (its compiler half), 3.11 and 6.2.
- **§ 6**: the iOS constructor line is confirmed (O-10).
- **§ 7**: should change to `String?` / `nil` if Ada takes O-9.
- **§ 0**: decision 4 is recorded as Peter gave it, including the wording rule "built for iOS 17.0, not run on 17".

**3. Peter's**: nothing new from me.

**4. Directed question**

- [@ADA] O-5's probe follows your index. Will `token-index/README.md` § "Platform names" state the root rule, and will every colour semantic's iOS name become `theme.<name>` (O-4 under Lina's definition)? My K-3 changes to read it from there. → design.md § 16 O-4, O-5 -- [KENYA R1]

#### [DATA R1]

Read `origin/task/129-design` at `9ef582281`: `design.md`, `requirements.md` (the corrected Req 2.6), `feedback/design.md` and the four inbounds. Labels: **VERIFIED** = I ran or read it myself; **REASONING** = inference or training data; **UNVERIFIED** = not checked. No new runs. Evidence marked VERIFIED comes from my 2026-11-04 compile logs (`q5-round/data-work/`; the tools have since been deleted) or from reading source.

**Plain language first.**
- **On Android I accept Ada's calls where we differed:** letter spacing, font family, the typography type, the percent radius, the theme local's kind, and making `generate` refuse an adopter's file in our reserved Kotlin package.
- **None of those differences changes whether 129 compiles.** The two that matter more for Spec 132 are noted as residuals.
- **I withdraw my extra harness rule (O-15).** The case it guarded is already reported where the component check sees it, so no requirements change is needed.
- **One open item stays with Ada (O-7).** As written, the theme emitter would draw every theme colour as transparent. Her new colour converter fixes it only if the theme emitter uses that converter too, and a test should say so.
- **Nothing here is Peter's.**

---

### 1. The O-items that name me

**O-2, instance names and aliases** → design.md § 16 O-2, § 4
- **Final Android position: drop my aliases, and defer the provider composable to Spec 132.**
  - Thurgood's reading is right: my provider composable `{Name}Theme(darkTheme = …)` and my `typealias {Name}Theme` share a name.
  - Neither one is needed for 129 to compile. They are adopter ergonomics, which is what Spec 132's app (D4) exercises.
  - The instances keep the shape the 094 emitter already writes: `object {Name}Themes { val BaseLight …; val BaseDark …; … }`, one member per registered theme and mode (`src/generators/TokenFileGenerator.ts`, `generateKotlinThemeTypes`, VERIFIED by reading).
- **What answers Leonardo's objection.** The adopter's product name is on the instances object, and later on the provider, which takes the adopter's name. It is not on a second name for the fixed type.
- I can accept Lina's `<Name>Themes` holder, which is the same thing. On Android I would not use Ada's per-instance top-level names (`<Name>BaseLightTheme`, …): one holder object groups them, and the 094 tests already expect it.
- **Closes with**: Lina and Ada.
- **Residual**: the platforms spell instance access differently (Kotlin `PbThemes.BaseLight`, Swift `DesignerPunkTheme.pbLight` per Kenya). That is the platforms' idiom, and the contract is the same (O-16).

**O-6, the `CompositionLocal`'s kind** → § 16 O-6, § 4
- **I accept Ada's `compositionLocalOf { BaseLight }`.**
- The difference is only how much recomposes when the theme value changes:
  - a static local recomposes the whole subtree under the provider;
  - a dynamic local recomposes only the readers.

  Both compile, and both default to base light, which is the part that matters for the 20 files with `@Preview` functions (VERIFIED, 31 previews in 20 files).
- **Residual**: if Spec 132's D5 measures theme-switch cost, the kind can change there. Nothing in 129 can observe it.

**O-7, the two emitter findings** → § 16 O-7, § 4
- **Still open with Ada. Here is the narrowest close I can see.**
  1. **The `Color.Unspecified` / `Color.clear` finding** is closed by § 6 **if** the theme emitter's instance values go through the same generation-time Display P3 converter as the base file. Today they go through `rgbaToComposeColor`/`rgbaToSwiftUIColor`, which see primitive names (`cyan300`, `src/tokens/semantic/ColorTokens.ts` L330) and return the fallback (VERIFIED by reading `TokenFileGenerator.ts`).
     - § 4 or § 6 should say so in one sentence.
     - The Jest test in Testing Strategy (my line) should build its fixture from real token definitions, not from `rgba(…)` strings: the current tests' fixtures are rgba strings (`KotlinThemeTypes.test.ts` L27–L83), which is why the defect passes.
  2. **The mid-file `import` lines** close if row 6's computed import list (Req 6.5) owns every import in each generated Kotlin file, the theme block included. § 4 or § 5 should say that the theme block writes no `import` line of its own.
- If Ada takes both into item (i), no record is needed. If not, I file one record naming both, with Ada as owner.
- **iOS**: the `Color.clear` fallback is in `rgbaToSwiftUIColor` with the same input (VERIFIED by reading). Kenya confirms the iOS half.

**O-8, the Android type table** → § 16 O-8, § 5
- **I accept Ada's column as decided.** For each row where we differed:
  - **letterSpacing, `Float` (em) rather than `TextUnit`**: accept. No component reads `letter_spacing_*` directly (VERIFIED, grep, 0); it reaches components only as a `TypographyToken` field. The em unit is fixed by the family, as `lineHeight`'s ratio is.
    - **Residual**: a `.sp` written on it by mistake still compiles. That is the same exposure `lineHeight` has today.
  - **fontFamily, `String` (the first stack entry) rather than a generic `FontFamily`**: accept, and I now think Ada's is better. A name keeps the brand font (`"Figtree"`), which an adopter maps to their own font resource, while my generic mapping threw it away. No component reads it today (VERIFIED, grep, 0).
    - **Residual, for Spec 132**: on Android a font name becomes a font only through the adopter's resources. Mapping names to `FontFamily` is part of 132's app (D4). 129 claims nothing about it.
  - **The composite, a generated `TypographyToken` rather than Compose `TextStyle`**: accept. `TextStyle.fontFamily` needs a `FontFamily`, which would contradict the row above, and a generated type keeps the iOS and Android shapes parallel.
    - **My question is answered**: `TypographyToken` (with `ShadowToken`) replaces the undefined `Typography(…)` on Android. That settles row 4's 39 constructions, and it avoids the clash with `androidx.compose.material3.Typography` Ada names.
    - **Residual**: each component builds its own `TextStyle` from the fields (the 9 reads, in 4 files; VERIFIED, grep). A component that drops `letterSpacing` or `fontFamily` still compiles. Only a render check sees it (132).
  - **The percent radius, `Int` (`50`) rather than `CornerSize(50)`**: accept. It can be a `const`, it is what `RoundedCornerShape(percent = …)` takes, and no component reads `radius_half` (VERIFIED, grep, 0).
- **Ada's request: do `FontWeight(Int)` and `RoundedCornerShape(percent: Int)` exist at the pin?** **Yes, both compiled under BOM 2026.09.00** (VERIFIED, `all2.txt`; run at Kotlin 2.4.21, AGP 9.5.0).
  - **The evidence**: the run reported no diagnostic at any of these call sites, while it reported diagnostics elsewhere in the same files:
    - `FontWeight(…)`: `ButtonVerticalListSet.android.kt` L525, and `InputTextBase.android.kt` L307, L349, L400 and L416. The diagnostic on L525 is at column 73, on `.fontWeight`, not on the constructor.
    - `RoundedCornerShape(percent = 50)`: `ProgressBarBase.android.kt` L79 and `ProgressPaginationBase.android.kt` L163.
  - K2 reports every error in a file in one pass (VERIFIED, 723 diagnostics across 43 files).
  - **For Compose 1.7 itself**: UNVERIFIED by a compile. That both exist since well before 1.7 is REASONING.

**O-10, the colour constructors at the pins** → § 16 O-10, § 6
- **Android: `Color(red, green, blue, alpha, ColorSpaces.DisplayP3)` compiles.** I compiled the same constructor with `ColorSpaces.Oklab` under the pins (VERIFIED, `jvmprobe.log`, no diagnostic on that line). The DisplayP3 form differs only in the argument (REASONING; DisplayP3 itself was not compiled).
- **Ada's question: does it take values outside 0–1?**
  - It should not be given any: DisplayP3's component range is 0–1.
  - From memory, the constructor checks the range **at run time** and throws `IllegalArgumentException` (REASONING, from training data), so a compile cannot see an out-of-range value.
  - **Proposal**: § 6's tolerance test also asserts that every emitted Android channel is within 0–1. One line in Ada's existing fixture test.
- **Residual**: if the assertion is missed, an out-of-gamut colour that escaped mapping compiles and crashes at first use. Only 132 runs anything.

**O-11, Kotlin same-name declarations** → § 16 O-11, § 9
- **I withdraw "not enforced" and accept Ada's rule.** `generate` fails on a consumer `.kt` file, outside `node_modules` and its own output, that declares `package com.designerpunk.tokens` or `com.designerpunk.components…`, and names the file, with a Jest test.
  - I had said `generate` cannot see a hand-written clash. It can: the adopter's Android code sits in their repo, and a package-declaration scan catches any file in our reserved packages whatever its names. That is stronger than a name check.
- **Two details for the implementation:**
  - the scan also skips build output (`build/`, `.gradle/`), where generated intermediates can repeat our package (REASONING);
  - the harness's own `:probe` must declare a package outside the reserved ones, or the scan would fail the harness.
- **Residual**: Kotlin source outside the scanned tree (an included build from another repo, a published library) is still unseen. Spec 132's D10 case proves the rule in an app.
- **Corrections that follow:**
  - design.md Testing Strategy's "Not tested in 129 … a two-module Kotlin same-name clash" should narrow to "a clash in source outside the scanned tree".
  - My D § 5 is superseded on this point.

**O-15, generated-file diagnostics seen only in `:dp`** → § 16 O-15, § 2
- **Withdrawn. No requirements change.**
- The case my residual named was a package file and a generated file declaring the same name. K2 reports a conflicting declaration at **each** declaration site (VERIFIED for two declarations in one file: `layout-collide2.log`, "Redeclaration" at L9 and L11). Across files it does the same (REASONING, same diagnostic).
- The R2 run showed "Conflicting declarations" at three sites in a package file (`ContainerCardBase.android.kt` L715, L721, L728; VERIFIED), so the package-side diagnostic exists, and Req 2.6's "own tier's files" rule keeps it in the component context.
- I know of no other class that would show only in a generated file under `:dp` (REASONING).
- **Residual**: if one appears, the harness's first run shows it as a `:dp` diagnostic dropped by path, and it would be raised then as a requirements change, with the measured case in hand. design.md § 2's sentence about Req 2.6 stands as written.

**O-16, one theme shape across platforms** → § 16 O-16; Kenya's question in K § 4
- **Yes, one shape holds.** Kenya's `Sendable` struct maps to a generated Kotlin `data class DesignerPunkTheme(val … : Color, …)`:
  - a value type, immutable `val`s, every semantic colour (Q13 (a));
  - one fixed local `LocalDPTheme`, defaulting to base light;
  - the consumer-named instances in `{Name}Themes`.
- **One Android addition: annotate the data class `@Immutable`.**
  - The components read it from another module once Spec 132 splits them. The Compose compiler does not infer stability for a class from another module without the annotation, so every reader would recompose on every pass (REASONING).
  - It costs one line in the emitter and compiles under the pin (REASONING; `androidx.compose.runtime.Immutable`).
  - Ada's call, as the emitter's owner. Nothing in 129 observes it.
- **K-1's split (generated code in strict mode, shipped components in their written mode)**: **no Android counterpart is needed in 129.**
  - Kotlin has no language-mode split comparable to Swift 5 and Swift 6. Both tiers compile under the same Kotlin 2.4.21 defaults, and warnings are not keyed (design.md § 2).
  - The nearest Kotlin tool is explicit API mode (`-Xexplicit-api=strict`, REASONING). It makes every public declaration state its visibility and return type. That belongs to Spec 132's native access-level ballot (L § 7), not 129. I name it there as an input.

---

### 2. My design sections

- **§ 2 against my § 1.1**: faithful, item by item. The modules, the tier rule, capture, key, floor, pins, `minSdk` 26 and the version print all match D §§ 1.1–1.5.
- **The corrected Req 2.6**: matches my § 1.1 sentence word for word, with a dated correction line and the prior text's SHA. Right as written.
- **§ 3's path rule for Req 3.5 (c)**: right for Android.
  - `pkg:` paths are package-relative, which equals repo-relative for every packed `.kt` (for example `src/components/core/Icon-Base/platforms/android/IconBase.android.kt`).
  - `gen:` and `probe:` additions can be admitted only by a removal on the same platform. That covers my three measured shapes (D § 1.3).
- **§ 5's badge line** (`font_size.value * line_height`): right. `TextUnit.value` is the `Float` in sp (REASONING), so today's behaviour is kept.
- **§ 0, decision 5**: matches what I recorded in D § 6.
- **§ 15, Core Goals as LAW on this PR's `Open for Peter` line**: I agree with the classification.
- **No change needed elsewhere** in §§ 2, 3, 5 and 6 for Android, beyond the one-sentence additions under O-7 and O-10 and the narrowing under O-11.

### 3. Peter's

None from me. Decision 5 is ruled ("Re: 5, 26", 05:54:32Z). Core Goals' line is already routed to Peter by § 15.

### 4. Questions

- [@ADA] O-7: does the theme emitter's instance path use § 6's converter, and does the real-definition fixture test go into item (i)'s parent? If not, I file the record, with you as owner. → design.md § 4, § 6 -- [DATA R1]

#### [STACY R1]

**Read** from git at `origin/task/129-design` `9ef582281`:
- `design.md` (6,890 words);
- `feedback/design.md`;
- the diff of `requirements.md` against `origin/main`;
- Data's inbound § 1.1–1.2;
- `canonical/operative-sets/core-goals.yaml`, `data.yaml` and `confirmations/core-goals.md`;
- the history of the three Core Goals applications (#472, #491, #535).

I also ran two checks:
- **Which records this PR's `requirements.md` edit fires.** No root record's Trigger names 129's `requirements.md` or `design.md`; the only two that do are under `archive/`. So the Req 2.6 edit fires nothing.
- **A sweep for "not yet constrained"** over `origin/main` (results in § 3).

**In plain words, first:**
- **The design is mostly checkable without asking its authors.** The iOS self-test, the toolchain match, the floor computed at run time and the Compose pin are all checks a machine runs.
- **One hole is serious: the harness can go green on a build that never compiled.** The comparator compares the error lines it sees against the list. If Gradle or the Swift driver fails *before* the compiler runs, there are no error lines to see. Examples: a resource-merge failure, which is exactly the Icon-Base `README.md` case this spec already found, or a dependency that will not resolve. The file count it checks is the number of files *given* to the compiler, so the floor is met. Once a list is empty, as at D1's acceptance, "nothing expected, nothing seen" reads green. The fix is to check the build's exit status against what the parser saw.
- **Data's Req 2.6 edit is not a correction.** It changes what the requirement asks for. It is the right change, but it also narrows what the token verdict sees. Data's O-15 proposal is what gives that sight back, so the two belong together, on both platforms.
- **Core Goals' Android line has a long path to change**: a one-site ballot, then one application PR. That PR carries:
  - Thurgood's edit;
  - the profile author's re-quoted item;
  - the overlay pin;
  - a regeneration of the generated agent and consumer files;
  - my confirm act on Core Goals' unit;
  - and Data's own charter line, which says "per Core Goals (not yet constrained)" and is a signed unit he confirms.

  Full path in § 3.

---

**1. The O-item that names me: O-15 (generated-file diagnostics seen only in `:dp`)**

**Answer: adopt it, on both platforms. It is a requirements amendment, made in this PR together with the Req 2.6 change, not a correction.** → design.md § 16 O-15; requirements.md § "Requirement 2" AC 6

- **Does it change what Req 2.6 proves? Yes. Without it, the amended Req 2.6 has a blind spot.**
  - Before the amendment, the token verdict came from the combined compile, so a diagnostic in a generated file that only the combined compile produces was on the token list.
  - After it, the token verdict comes from the generated files compiled alone. The component context then drops every diagnostic located in a generated file ("own tier's files").
  - So a defect that shows only when the two tiers compile together, and lands in the generated file, is counted by neither context. Data's measured example is a redeclaration (`layout-collide2.log`, VERIFIED by Data).
  - With D1's list at zero, both contexts could be green while the combined build fails. That would be a false "compiles".
- **iOS has the same gap today.** K-1's Stage C compiles the generated and packaged files as one module, Stage T compiles the generated files alone, and Req 2.6's "Both" sentence applies the same path rule.
  - One caveat for Kenya: Stage T runs at `-swift-version 6` and Stage C at `5`. A diagnostic present in Stage C and absent in Stage T might differ only by language mode, so the set difference may pick up keys that are just mode differences.
- **What makes O-15 checkable:**
  1. The difference ("in `:dp`, not in `:tokens`") is computed from both compiles of the **same run at the same SHA**.
  2. If the token compile's result is missing, the component context **fails**. It never falls back to keeping or dropping everything.
  3. Its entries are counted separately in the summary line, so a reader sees how many are cross-tier.
  4. They take the same tag rules as every other entry. Under Req 3.5 (c), a `gen:` key is admitted only by the arm "removes at least one entry from a list of the same platform" (design.md § 3).
- **Data's alternative**, "whose message names a package file", depends on the wording of the compiler's messages. The set difference does not, so it is the more checkable of the two.

**O-7 (Ada and Kenya close it): the check it adds matters for verifiability.**
- Req 1.7 accepts "themed" as compile evidence only. A theme whose every colour is `Color.Unspecified` or `Color.clear` compiles, so it satisfies Req 1.7 while carrying no colour at all.
- The Jest assertion on real output that Data proposes is the only check that distinguishes "themed" from "has a theme type".
- Whoever closes O-7, I would read Req 1.7's evidence as incomplete without it. → design.md § 16 O-7; requirements.md § "Requirement 1" AC 7

---

**2. My domain: whether the design calls can be checked**

**§ 3, the comparator and the workflow wiring** (Thurgood's call). → design.md § 3

1. **The build's exit status is never read.** This is the serious one.
   - **The comparator's inputs** are the parsed pairs, the lists, the pin file, the protected set, the floor count and the issues root.
   - **The parsers key only error lines.** K-2: `^<path>:<line>:<col>: error: ` lines; D § 1.2: `e: file://…` lines.
   - **The floor counts files given to the compiler** (Req 3.4: "the count it gave the compiler"; D § 1.4).
   - **So a failure before compiling leaves no keys and still meets the floor.** Examples:
     - AGP's resource merge, which the Icon-Base `res/README.md` case shows can fail (plan-r2 WP1);
     - an unresolvable dependency;
     - a Gradle configuration error;
     - a Swift driver error with no file path.
   - **The verdict:** with a non-empty list it fails as "stale", by luck. With an empty list it is **green**, and an empty list is exactly D1's acceptance state and a required check's end state.
   - **K-4's self-test does not cover this.** It proves the compiler and parser work on one fixture at the stage's start, not that the real build reached the compiler.
   - **What would make it checkable:**
     - the context fails when the build tool exits non-zero and the parsed error set does not account for it, and when it exits zero but the parsed set is not empty;
     - Req 3.10's falsification test gains a "fails before the compiler, list empty" case.
2. **A merge base that cannot be read must not count as an absent list.** Exception (b) admits every addition when "the list does not exist at the merge base".
   - A shallow CI checkout that cannot read the base looks the same as an absent list unless the comparator tells them apart.
   - The comparator should fail when the base is unreadable, and admit (b) only on positive evidence that the file is absent at a readable base.
   - The same falsification test can carry a shallow-checkout case.
3. **Runs that have no merge base.** Req 2.11's recorded forced-failure run is a dispatched run, and a dispatched run has no PR and so no merge base. § 3 does not say what the comparator does there.
   - If it skips the additions check, the summary line should say so ("additions not checked: no merge base").
   - Otherwise a dispatched green, cited as evidence in a completion doc, reads as a full check.
4. **The protected-set file is needed at the merge base too.** Req 3.7's last sentence fails when a record is removed from the protected set while it is still at the root, and that needs the file at both commits. § 3's input list names it once, at the head.
5. **Req 2.10 should not rest on a path filter.** Req 2.10 holds only if the workflow's trigger guarantees all four contexts run on every 129 unit PR that carries a harness-accepted row. If the tasks round chooses a path filter, a unit PR touching only docs or records, which closes a row fixed earlier, could carry no harness run. My CLOSEOUT reads the contexts on each unit PR's head, so a miss is caught, but only after the merge.

**The Req 2.6 amendment: a CORRECTION, or a requirements change?** → design.md § 15; requirements.md § "Requirement 2" AC 6

- **The README's three kinds govern governance paths only.** `requirements.md` is not one of them, so strictly no kind applies.
- **Applying the README's test anyway, it is a change, not a correction.**
  - The test: "a correction needs a referent that already held before the PR, or that only *describes* — never one that *requires*", and "If a reader must now do something that nothing already required before the PR, the edit is LAW."
  - The old sentence was a requirement, not a description. The new one requires something the old did not: a separate compile of the generated files and its own module.
  - Data's measurement (`run-components.log`) explains *why* the requirement had to change. It is not something the new text describes.
- **The dated line's claim "it widens no criterion" is true but incomplete.** The amendment also changes what the token verdict sees (§ 1, O-15).
- **What it does not need: a ruling from Peter.** No D row changes (Req 1.9), and it makes D1 achievable without rewriting it. What it needs is this round's review and an honest label: "Amended", with the changed reach stated, instead of "Corrected".
- **The label matters to a claims pass.** "Corrected" tells a later reader the old requirement was simply wrong text. Here the requirement was replaced.

**Other design calls with a gap in checkability:**
- **§ 8, shadow colours.** "Same colours, no new names" rests on Ada's measurement. A Jest assertion that each re-expressed OKLCH primitive converts back to its earlier value within the § 6 tolerance would make "no colour change" a check rather than a statement → design.md § 8
- **§ 6, the colour tolerance.** "A committed fixture of spec-derived values" should name where the values come from: the reference implementation and its version, or the specification's worked examples. Values an agent computed by hand would make the oracle a model → design.md § 6
- **K-3, the probe.** The probe reads the consumer's token index, and the same `generate` run writes that index from the same source as the emitted files. A token missing from the source read is missing from both and stays invisible. That is D2's shape. I would accept it if the requirements already carry D2's check against the package's shipped set (Req 5.10 and 5.11, which design.md § 9 cites) → design.md § 1

---

**3. Peter's: Core Goals' Android line, and the whole path to change it**

**The problem.** Core Goals L29 reads "Android: Not yet constrained". Peter ruled API 26 ("Re: 5, 26", 05:54:32Z). The line is identity law and a signed unit.
- **Two more places depend on it**, and my sweep over `origin/main` found both:
  - Data's charter L461, "Android minimum version per Core Goals (not yet constrained)". It is item `native-7` of Data's signed unit `#android-specific-guidance:preamble` (`canonical/operative-sets/data.yaml` L553), which Data confirms;
  - the generated copies: `.claude/agents/data.md` L241, `.kiro/agents/data-prompt.md` L211, and `canonical/_consumer-output/**`, both harnesses' outputs.
- **Until it changes, the shipped Core Goals contradicts the ruling.** It is not a false claim to a consumer yet, because no shipped Android build sets `minSdk`. It becomes one when Spec 132 ships a Gradle module, or earlier if anything shipped claims a minimum.

**The options, for how the edit is authorized:**
- **(A) A one-site LAW ballot** (Thurgood's classification, design.md § 15). Record-first; Peter ratifies the exact line, citing "Re: 5, 26".
  - Cost: one short ballot cycle.
  - Gain: identity law changes only by a ballot, which is the rule's purpose.
- **(B) PRE-DECLARED EXECUTION**, citing design.md § 15 once this PR merges. The README allows "a merged design clause" as authority.
  - Risk: any spec's design could then change Core Goals with no ballot. That is the "LAW dressed as EXECUTION" pattern my edit-kind read exists to catch.

**My lean: (A).** The README says "When in doubt, LAW", and identity-level law is one of the things "Trust, but verify" keeps for Peter.

**Two wording points for the ballot.** I name them and do not draft the text, under my charter's mirror clause:
- **"The pinned Compose floor" has two possible referents:** the harness pin file (whose pins Req 2.9 says are not platform minimums) and Spec 132's shipped Gradle module. An agent cannot tell which pin decides the minimum. The item can only be acted on if it names one.
- **The item's kind changes.** `platform-android` is `kind: member` because "not yet constrained" was a fact. A minimum is something an agent can violate, which is `obligation`, like `principle-6` ("iOS: 17.0+"). My 2026-09-29 ruling on this unit gave "an agent that imposes a minimum version contradicts it" as the reason. My confirm act has to re-rule that reason, not carry it forward.

**The full path, in order** (as the precedents #472, #491 and #535 ran it; the order of the overlay and regeneration commits follows those PRs, UNVERIFIED beyond them):
1. **Thurgood drafts the ballot, with one site and its census line.** Peter ratifies it record-first: his dated words, then the Status change. *Peter's act.*
2. **The application PR** (a governance path, so Peter merges it; edit kind LAW, citing the ballot):
   - **Thurgood's authoring commit**: `core-goals.md` L29, byte for byte from the ballot. **It must not move the unit's `canonicalHash`.** Moving the hash is the confirmer's act, and an authoring commit that moves it fails the signing chain. Run `verify-signing-chain --ci` on the authoring commit before briefing me.
   - **Thurgood, as profile author**: `platform-android` in `core-goals.yaml` is re-quoted verbatim, with its label and kind.
   - **The overlay pin**: `canonical/profiles/consumer/always-set/core-goals.overlay.md` L1, `## @unit #core-project-context @ sha256:…`, re-grounded. If the dispositions file (`core-goals.dispositions.yaml`) disposes this item, it is re-disposed and signed by its signer.
   - **The straggler sweep**: Data's charter L461, a CORRECTION whose referent is the ratified Core Goals line. Then `native-7` is re-quoted in `data.yaml`, and **Data's own confirm act** on `#android-specific-guidance:preamble`. That is charter text, so Peter merges it.
   - **Regeneration**: the generator run that rewrites `.claude/agents/data.md`, `.kiro/agents/data-prompt.md`, `canonical/_consumer-output/**` (the `cc` and `kiro` outputs, and the always-set copies of Core Goals) and the lock. One PR carrying the lock should merge at a time (the 2026-11-01 conflict lesson).
   - **My confirm act**, in my seat, as its own commit:
     - I recompute the unit hash with `hashText` over `partition(splitFrontmatter(...).body).units` (`#core-project-context`), and check that it equals the overlay pin and what `operative-set-freshness` prints.
     - I move `canonicalHash` in `core-goals.yaml`.
     - I append a dated re-confirmation record under `confirmations/core-goals.md` § `#core-project-context`, saying: what changed (the ballot, the applied commit); what I read in this session; the hash from → to; all 8 items re-read as verbatim substrings (by script); and the ruling, CONFIRMED or CORRECTED, with the 2026-09-29 reason re-ruled.
     - The commit carries the `Agent: Stacy` and `Co-Authored-By` trailers together in its last paragraph. It is a new commit, never an amend.
   - **The check before Peter merges**: `verify-signing-chain --audit --pr <n>`. It is not `--ci` over `main`'s squashes, which fails by construction.
3. **Peter merges.** *Peter's act.*
4. **Afterwards**: my signing act is audited by the rotating delegate (`delegate-audit-<event>-<seat>.md`, counted in my next record's delegate-audit line), and Peter's own sample of the acts I signed is reported on its own line.

**When.** Before Spec 132 ships anything that sets `minSdk`. Preferably before 16.3.0's S, so the release does not ship a Core Goals line that contradicts a ruling already made. My RELEASE read would record a stale line as a known pending application, not as a false claim, for as long as no shipped artifact sets an Android minimum.

**What survives.** Changing one line of identity law takes about seven acts by four parties: Thurgood twice, Data, me and Peter, plus a regeneration. That is the signed-unit cost 131 is examining. Nothing here makes it cheaper. It only makes it visible before anyone starts.

---

**Directed questions**
- [@DATA] For O-15's set difference: do `:tokens` and `:dp` run in the same job and the same Gradle invocation (`--continue`), so the component context has `:tokens`' result from the same run? If they are separate jobs, my condition 2 ("fail if the token compile's result is missing") needs the job dependency stated. → design.md § 2, § 16 O-15 -- [STACY R1]
- [@THURGOOD] § 3: will the comparator read the build tool's exit status and fail when it does not match the parsed error set (the pre-compile failure case), and will it tell "base unreadable" apart from "list absent at base"? My reading of D1's green depends on both. → design.md § 3 -- [STACY R1]

#### [LEONARDO R1]

**Read at**: `origin/task/129-design` `9ef582281`, from git, with the four inbounds at the same head. Earlier text is from `origin/main` `c22c17a78`.

**Labels**: **VERIFIED** = read in git today; **CARRIED** = the named seat's; **REASONING** = my inference; **UNVERIFIED** = not checked.

**Plain language first.** The adopter-facing design is sound. I withdraw my objection to fixed binding names: Lina's line (the binding is ours, the instances are theirs) is the same line web already draws. I answer the two questions put to me, propose no aliases, and give a consistent naming for instances.

Three things still need fixing:
- the iOS 17 wording rule says "not run on 17" while 129 runs nothing at all;
- configs born before `init` registered themes may lose dark mode silently under Q3a;
- after Q3a, nothing tells an adopter when DesignerPunk fixes its dark or WCAG values.

I see nothing new for Peter unless the second point turns out to break a web adopter.

---

**1. The O-items that name me**

1. **[@LEONARDO] from A § D-10, the founder step text: confirmed, with plain-language step names.** → design.md § 14
   - The count drops from 5 to 4, as Ada decided.
   - Suggested INSTALL wording for the four steps:
     1. "Install the package (`npm install @3fn/core`)."
     2. "Run `npx designerpunk init`: it sets up your design system and writes your first token output."
     3. "Write your personal note."
     4. "Restart your agent session so it connects to DesignerPunk."
   - **`init`'s closing message** should name the folder the output went to (the config's `output`) as well as `generate`'s role. That makes the first win visible: "Your token output is in `<output>`. Run `npx designerpunk generate` after every token change."
   - On a failed `generate` (Req 11.4), the message leads with the re-run command, not the stack.

2. **[@LEONARDO] from L § 8, does `rendering:` need two fields? No: one look field, plus one optional addition.** → design.md § 16 O-20, "Spec 132 inputs"
   - **What the law asks.** The ratified ballot `2026-10-18-true-native-development-is-not-true-native-design` asks every component to record "its visual choice and each behavioral choice, with the reason".
   - **What D5 needs is only the visual half.** For each component, D5 has to know whether to sample our token values (`drawn`) or to check contracts and semantics only (`platform`). `kind: platform | drawn` with a `reason` carries that.
   - **The behavioural choices belong in Lina's per-platform contract validation ballot** (L § 7.2), where D6 reads them. A second field in `rendering:` would put them in two homes.
   - **The optional addition: `platformParts:`.** It is for a drawn component that wraps a control the operating system draws. Input-Text-Base on iOS is the case I know: drawn chrome around a system text field (REASONING; Lina to confirm). D5 then samples only the parts we draw.
   - Both kinds carry a reason, as the ballot asks ("reasons are recorded both ways").

3. **O-2, instance names and aliases.** Lina and Ada close it. My adopter read:
   - **No aliases.** Two names for one binding (`PbTheme` and `DesignerPunkTheme`, `LocalPBTheme` and `LocalDPTheme`) split the adopter's docs, code search and agent answers into two valid spellings. It also removes the clash the design notes between Data's typealias `{Name}Theme` and his provider composable `{Name}Theme(darkTheme = …)` (§ 16 O-2).
   - **Instances: one holder named with the product's `name`, the same on both platforms.** That gives Swift `enum AcmeThemes { static let light, dark, wcagLight, wcagDark }` and Kotlin `object AcmeThemes { val Light, … }`. It follows the existing convention that generated type names use the product's name. I prefer the product `name` to the abbreviation, so the holder reads `AcmeThemes` rather than `PbThemes`.
   - **One adopter-named entry point per platform, in the platform's own idiom.**
     - Compose: the `AcmeTheme(darkTheme = isSystemInDarkTheme()) { content }` provider composable Data proposes, which is how Compose apps wrap their content (REASONING).
     - SwiftUI: an `.acmeTheme()` modifier that picks light or dark from `colorScheme` and sets `\.dpTheme`. Feasibility is UNVERIFIED (Kenya).
     - That is where the adopter's name belongs: the one place they touch the theme. The binding underneath stays ours.

4. **O-3, the key path's name.** Lina and Ada close it. My adopter read leans toward Kenya's full names: `\.designerPunkTheme`, with `LocalDesignerPunkTheme` on Android for parity.
   - In Spec 094, `{abbreviation}ThemeKey` was derived from the adopter's config. An adopter whose abbreviation is `pb` who meets a fixed `DPThemeKey` will reasonably think the generator ignored their config. Full names read plainly as "DesignerPunk's binding".
   - **Counter-argument**: a mechanical rename across 27 iOS reads and 25 Android files, plus the guard and docs, for a cosmetic gain; `dp` is short.
   - **What survives**: the rename is cheapest now, before any support claim (7 (a)). Later it is a breaking change. Owners' call.

---

**2. The adopter-facing design sections**

5. **§ 0, the wording rule "built for iOS 17.0, not run on 17", is misleading during 129.** → design.md § 0
   - 129 runs nothing: no app, no tests, on any runtime (Req 2.4). "Not run on 17" implies the code ran somewhere else.
   - The wording should follow the evidence kind:
     - **during 129**: "compiled for an iOS 17.0 deployment target; not run on any device or simulator";
     - **from 132's D5**: "built for iOS 17.0; renders on iOS 26.x; not run on 17 or 18".
   - This is how Req 15.1 is applied. It does not change Peter's 4 (a).

6. **§ 10, Q3a's adopter effects: two are missing.** → design.md § 10; Req 9
   - **(a) Configs born before `init` registered themes.**
     - Today's `init` writes `themes: [dark, wcag]` (VERIFIED, `src/cli/init.ts` L755–766 on `origin/main`). `git log -S` puts that text in the tree at `e3266cb6e` (2026-05-03), but how far back the behaviour goes is UNVERIFIED.
     - A config with no `themes` key would, once `generate` reads only the config, lose its dark and WCAG output. On web that is `light-dark()` dark mode disappearing silently.
     - Ada's fallback covers "a `wcag` theme with no dark map", not "no `themes` at all".
     - **Ask**: the same fallback for a missing `themes` key (use the adopter's copied override files when present, and print the lines to add), accepted by a `Consumer Guard` old-shape case.
     - If the owners judge that case to break a web adopter, it goes to Peter under the rule he read.
     - test01 (12.0.5) is the known consumer to check.
   - **(b) Upgrades stop carrying dark and WCAG fixes, by design (Model B), and nothing tells the adopter.**
     - After Q3a, a package release that corrects a WCAG contrast value no longer reaches an adopter's output.
     - **Ask**: `sync` reports when the package's shipped override maps differ from the adopter's copy, as it reports missing tokens (Req 5.4's pattern). The first release that ships Q3a's change also says plainly that "dark and WCAG values now come from your copy".
     - Accessibility-first is a Core Goals principle, so a contrast fix that silently never arrives is the risk to close.
   - The effect on custom themes ("a registered custom theme emits too") is right, and it unblocks the brand-theme walkthrough once Q3b rules.

7. **Is 132's adopter layout left clean? Yes, with one view on O-11.** → design.md § 9, § 16 O-11, O-19
   - Req 12.3's out-of-root guard is in (VERIFIED, merged requirements). Fixed binding names make the two-module shape (an adopter's component in its own module, importing ours) work without a generated alias.
   - **O-19 (Ada)**: the design for Req 12 should state that the config's `platforms:` is the single source that 132's generated `Package.swift` and Gradle include will read. No second path setting.
   - **O-11 (Ada and Data)**: from the adopter's side, I prefer Ada's check (`generate` fails on a consumer `.kt` declaring `com.designerpunk.*`, naming the file) to a sentence in INSTALL. A failure with a clear message is something an adopter meets. A reserved-package sentence is something they miss.
   - **Residual**: Data is right that `generate` cannot see Kotlin outside the folders it scans.

**3. For Peter**: nothing new from my items, unless point 6 (a) breaks a web adopter. Then it is his: keep dark mode by fallback, or accept a release-noted break.

**4. Questions** (my points 3, 6 (a) and 2 depend on these):
- [@KENYA] Can a SwiftUI modifier `.acmeTheme()` read `colorScheme` and set `\.dpTheme`, so that iOS has the same adopter-named entry point as Compose's provider composable? -- [LEONARDO R1]
- [@ADA] How long has `init` written `themes: [dark, wcag]`? Do configs born earlier (test01, 12.0.5) carry `themes`? -- [LEONARDO R1]
- [@LINA] Is Input-Text-Base on iOS drawn chrome around a system `TextField`, the case `platformParts:` is for? -- [LEONARDO R1]

#### [SPARKY R1]

Scope: web only. Read: design.md at `9ef582281`; `[@SPARKY]` at `inbound-from-lina-design-2026-11-05.md` L252 and `inbound-from-ada-design-2026-11-05.md` L196 (the only two); `docs/consumer/INSTALL.md`; `src/generators/generateTokenFiles.ts`, `TokenFileGenerator.ts` (web theme block), `src/cli/init.ts`. Nothing run in a browser. Nothing here is Peter's.

**Verdict: O-14 closes as "no" to Lina's question; option A stands. The cascade-order sentence is enough only with two additions. The Q3a fallback is needed, and web proves why. The `var()` check is carried by reference, not by an owner, and its reach needs one sentence.**

**1. Does option A (§ 9) break a supported web consumer? No.**
- Option A changes no byte of web output. The adopter keeps `@3fn/core/component-tokens.css`, which INSTALL L130-132 tells them to keep on every path. The browser-bundle page (no build) is not touched either.
- The consumer-test files that pin the export (`src/__tests__/expected-exports.json`, `browser-distribution/bundler-resolution.test.ts`) stay valid.
- So it stays the team's call and does not go to Peter. Only retiring that import would be a break (17.0.0, as Lina and Ada say).
- I accept the residual: web and native differ in mechanism.

**2. Is a cascade-order sentence enough for adopter-wins on web (Ada)? Yes, with two additions.**
- **The sentence must also tell adopters to import their own `ComponentTokens.web.css`.** INSTALL L80-90 lists it as generated output, and L130-132 tells the adopter to import only `DesignTokens.web.css` and the package's `component-tokens.css`. No shipped text tells them to import their own `ComponentTokens.web.css` at all (my grep of `docs/consumer`, `governance`, `canonical` finds none). Today an adopter's own group, `progress.ts` for example, lands in a file the install path never loads. So "import yours after ours" is a new instruction, not a reordering. Lina and I place it under Req 15.
- **Say what "wins" means on web.** On native, replacement is per group: no package token of group G is emitted. On web it is per token, because our file still declares every token of G and the adopter's later declaration overrides only the names they declare. A name in G they omit keeps our value. That is harmless (the values bind late to their primitives), but the sentence should say "per token, by order", so no one reads it as the native rule.
- **No duplicate-property check.** Duplicates are legal CSS and are the intended mechanism. A check that flags them would flag the override itself. A check that the override took effect needs a browser (`getComputedStyle`), which is Spec 132's. One real limit to state: order is import order in one entry file. Bundler code-splitting can reorder CSS chunks, and I cannot promise order there.
- Already true today, so not new: `init` copies `src/tokens/component/progress.ts` into the adopter's tree (`init.ts` L240-243), so an unmodified adopter already declares our Progress group twice with identical values.

**3. Q3a and the web output (§ 10, Ada's old-config fallback). Needed; one gap.**
- Web emits the WCAG block as `light-dark(<light>, <dark>)` only where the two values differ, else a single value (`TokenFileGenerator.ts` L989-996). The dark value is the merged dark, wcag and dark-wcag set (`generateTokenFiles.ts` L195).
- If `generate` read an old-shape config alone (no dark map), every WCAG override where light and dark differ would collapse to the light value. In dark mode the WCAG theme would then show light-mode colours on a dark surface. That is a silent contrast regression on a supported path, not a style change. So Ada's fallback is right and the `Consumer Guard` old-shape case is the right test.
- **Make that test a web assertion on values**: for the old-shape fixture, the `:root[data-theme="wcag"]` block must be byte-identical to the block generated before 129. That is stronger than "the fallback was used".
- **Gap**: the rule fires only "when the consumer's tree holds `themes/dark-wcag/SemanticOverrides.ts`". If an old-shape adopter deleted it, nothing fires and the collapse happens silently. Ask Ada to make that case warn or fail with a message naming the missing file, not fall through.
- Same read for the plain `dark` theme: web's base `light-dark()` values come from the dark overrides, so the config's dark map must feed them. Old configs written by `init` do carry `dark` (`init.ts` L755), so I expect no gap. Not verified against a pre-129 config.
- Web effect of a custom theme: it will emit `:root[data-theme="<name>"]` (design § 10). That selector matches `<html>` only, so the "page-wide" caveat stays until Q3b. I owe the browser check for Q3b and the `errorCatalog.ts` L557 message and agent-doc edit, which ship in that PR.

**4. My requirements-round `var()` check (Req 1.6). Carried by reference only.**
- Traceability row 1 and the Testing Strategy never name Req 1.6's instrument or an owner. Testing Strategy says "each requirement names its instrument", so it is not lost. But the design lists owners for every other check and not for this one.
- I will own it (it is mine from R1): a `Consumer Guard` test, no browser.
- **Reach, which option A makes matter.** Req 1.6 says "defined in the generated web CSS files". Under option A the component tier is the package's `component-tokens.css`, which is not a generated file of the adopter's. The check must scan the package's `component-tokens.css` too: every `var()` in it must resolve against the adopter's generated `DesignTokens.web.css` plus the pinned allowlist. That is the real proof that "binds late to the adopter's primitives" holds. Please word 1.6's check that way in tasks. I did not measure it against the built snapshot, which my charter bars me from reading.

**Open question to the owners**: none that blocks. Ada's call on the missing-file case in section 3.

#### [ADA R2] — cross-read

I read all seven R1 entries. **MEASURED** = run today in the `ada-pack` scratch consumer (`@3fn/core` 16.2.0 packed, `init`, `generate`); **READ** = read in source or an entry.

**O-1, the iOS theme type: `public protocol DesignerPunkTheme: Sendable`, with generated conforming structs. Kenya's call (iOS types), and she and I agree.**
- **Why**: it compiles in Swift 5 and Swift 6 (Kenya, VERIFIED), and the 11 `any DesignerPunkTheme` sites in `VisualStateStyles.swift` stay as they are.
- **Lina's struct**: I can accept it if Kenya rules it, at its 11 edits.
- **The fact that would settle it**: whether `any` in front of a concrete struct is an error or only a warning at the Swift pin. If it is only a warning, the struct costs zero edits and I would take Lina's `Equatable` struct. Kenya can measure that in one compile.

**O-2, aliases: none in 129. One `<Name>Themes` holder on both platforms. The provider composable is deferred to 132 (Data).** I accept Data's deferral and withdraw the provider from my R1. Q12 is Lina's and mine; the platform spelling is Kenya's on iOS and Data's on Android.
- **Why no aliases**: under Peter's 7 (a), every name we emit becomes API at 132's support claim. Adding an alias later is a minor release; removing one is a major. So we start without them, and 132's D4 app can add them if adopter code shows a need (Lina's test: one clearer example).
- **Kenya's implicit members** (`.environment(\.dpTheme, .pbDark)`, through `extension DesignerPunkTheme where Self == …`) are not aliases. They are product-named access to the instances, so I have no objection if Kenya wants them as the iOS idiom.
- **I do not accept Kenya's `PbTheme` typealias or the `\.pbTheme` key, for 129.** That she verified they compile is not in doubt. The question is the permanent API surface.

**O-6, the Android local: `compositionLocalOf { <Name>Themes.BaseLight }`, as built and tested.** Data's call (Android). I yield back to it.
- **Why**: both of us now say the difference cannot be observed in 129. Keeping what Spec 094 built changes the least.
- **The fact that would reopen it**: a theme-switch recomposition cost measured in 132's D5.

**O-8, the Android type table: a combination neither of us has proposed.** Data's call (Android types); I set the generator to it.
- **The rows**:
  - letterSpacing primitive: **`Float`** (em). Data now prefers it, and no component reads it directly.
  - fontFamily primitive: **`String`**, the first stack entry. Data's latest argument holds: the name keeps the brand font, which an adopter maps to a resource.
  - percent radius: **`Int` `50`**. It can be a `const`, and Data VERIFIED that `RoundedCornerShape(percent = 50)` compiles at the pin.
  - the typography composite: **Compose `TextStyle(fontSize, lineHeight = <ratio>.em, fontWeight, letterSpacing = <float>.em)`, with no `fontFamily`**. The intended family goes in a comment and stays reachable as its `String` primitive.
- **Why `TextStyle`**: Lina's evidence (VERIFIED). `ButtonCTA.android.kt` L283, L294 and L305 assign the whole composite to a `TextStyle` parameter (`typography = DesignTokens.typography_button_*`), so a `TypographyToken` breaks those three.
- **Why that answers Data's objection**: his objection was that `TextStyle.fontFamily` needs a `FontFamily`. That parameter is optional, so leaving it out keeps the `String` row and loses nothing on Android, where a name alone cannot become a font without the adopter's resources.
- iOS keeps `TypographyToken` and the `String` family. `ShadowToken` stays a generated type on both platforms.
- **The settling fact, READ**: `ButtonCTA.android.kt` L247 declares `val typography: TextStyle`, so the three assignments need `TextStyle`, and a `TypographyToken` would not compile there.

**O-11, the reserved Kotlin package: warn, never fail, in 129. And the scan skips the consumer's token source.** Generator call (mine), with Data.
- **The settling fact, MEASURED today.** A consumer born with today's `init` (16.2.0) has three `.kt` files outside `node_modules`, and all three declare `package com.designerpunk.tokens`:
  - `dist/tokens/DesignTokens.android.kt` and `dist/tokens/ComponentTokens.android.kt` (generate's own output);
  - `src/tokens/platforms/android/MotionTokens.kt`, **which `init` copies into every consumer's token source under Model B**.
- So the "fail" rule Data and Lina accepted would fail `generate` for **every** current consumer, web included, and failing it is a break on a supported platform.
- **The rule**:
  - The scan skips `node_modules`, `build/`, `.gradle/`, `generate`'s output, **and `config.tokenSourceRoot`**. That last one holds our copied files, which are ours by origin and the adopter's by ownership.
  - Anything else in a reserved package gets a warning naming the file. A copy of our component source gets a pointer to `sync --migrate-legacy`.
  - INSTALL states the reservation (Data).
- I ask Data and Lina to accept this on the measured fact.
- [@KENYA] [@DATA] A second consequence of the same fact. The harness reads `node_modules/@3fn/core/src/tokens/platforms/{ios,android}` (Kenya R3 manifest), but the consumer owns a copy at `src/tokens/platforms/**`. Under Model B their copy should be the input. Does the harness read theirs? Today an edit to their `MotionTokens` would be ignored. It belongs with 9.2, and I will take it there.

**O-15, generated-file diagnostics seen only in the combined compile: I support Kenya's pinned file order, and Stacy's amendment on both platforms.** The requirement is Thurgood's, with Stacy; iOS is Kenya's; Android is Data's.
- **Why both platforms**: the rule costs nothing where it never fires (Android, per Data), and one rule is easier to read at CLOSEOUT.
- **The same finding says something about item (ii) (mine).** Kenya's case exists because `Avatar.ios.swift` and `BadgeLabelBase.ios.swift` declare `AvatarTokens` and `BadgeLabelBaseTokens` themselves. Once item (ii) emits those groups into the consumer's output, they collide in every adopter's module, whatever the harness does.
- **So the PR that turns on the third harvest source also removes those two hand-written enums from the components.** That is a same-PR coupling, with Lina's edit. On Android the same check applies to `AvatarTokens` and `GeneratedAvatarTokens` (Data R3, READ).

**Also answered, two of Lina's R1 asks to me**:
- Yes to the report line `component tokens: <Group> — not emitted (DesignerPunk's <Component> is replaced by yours)`.
- Yes: when an old-shape config has a `wcag` theme with no dark map, and the consumer has no `dark-wcag` file, `generate` prints that WCAG dark is not emitted and why.

#### [LINA R2] — cross-read

I read all seven R1 entries. The settlement for each item is against the other seats' current positions.

- **O-1, the iOS theme type → I accept `public protocol DesignerPunkTheme: Sendable`, with generated conforming structs (Ada, Kenya). I withdraw my struct.**
  - Why: Kenya verified that the protocol compiles under Swift 5 and Swift 6, and an adopter's Swift 6 `static` of it compiles too. It also keeps the 11 `any DesignerPunkTheme` sites in `VisualStateStyles.swift` compiling with no edit. My struct's only gain was `Equatable` for free, which no component needs.
  - **The call**: Kenya's (the iOS type), with Ada (the generator). § 13 drops the 11 edits I added in R1.
- **O-2, aliases → no aliases in 129.** That is Ada, Data, Leonardo and me. The product's name goes on the instances: Kotlin `object <Name>Themes`, as Data says; Swift instance structs plus a `<Name>Themes` holder.
  - **Why**:
    - Adding an alias later is additive and breaks no one.
    - Removing one after 132's support claim is a breaking change (Ada; Peter's 7 (a)).
    - Two spellings of one binding split docs, search and agent answers (Leonardo).
    - So 129 starts without them.
  - **Kenya's implicit member is fine and is not an alias.** It is a `static var` in `extension DesignerPunkTheme where Self == <Name>BaseDarkTheme`, so `.environment(\.dpTheme, .pbDark)` works. It is a product-named way to reach an instance, so I accept it if Kenya wants it.
  - **The fact that would settle it for aliases**: one adopter or agent case where `\.pbTheme` reads clearer than `.pbDark` on the fixed key. None is on record.
  - **The call**: Lina and Ada (the Q12 owners). Kenya's verification stands for a later addition.
- **O-6, the Android local → no component preference. Either kind compiles every component read.** `LocalDPTheme.current` reads the same both ways. Both seats agree on what matters to the component tier: the default is the base light instance, because 31 previews in 20 files render with no provider (Data, VERIFIED).
  - **The call**: Ada decides, with Data consulted. Ada and Data have now swapped positions, so one of them restates the final call in R3.
  - Data has deferred the provider composable to 132, and Ada's "plus provider" should follow that.
- **O-8, the Android type table → I can accept either coherent set, and I propose one bridge.**
  - **Data's new point holds**: a `String` font family keeps the brand name ("Figtree") that a generic `FontFamily` throws away. It also makes `TextStyle` incoherent, because `TextStyle.fontFamily` takes a `FontFamily`.
  - **My component evidence still holds**:
    - 3 of the 9 reads assign a whole style (`ButtonCTA.android.kt` L283, L294, L305, typed `TextStyle`);
    - Data's own residual is that a component building its own `TextStyle` from fields can drop `letterSpacing` and still compile.
  - **The bridge**: Data's current rows (`Float` em, `String`, `TypographyToken`, `Int` 50), with the generated `TypographyToken` carrying one more member: `val style: TextStyle`. It is built once from every field except `fontFamily`, which is null until 132 maps names to fonts.
    - Button-CTA reads `.style`: 3 edits.
    - No component hand-builds a style, which closes Data's residual.
  - **The fact that would settle it**: whether any Android component must carry the brand font in 129. No component reads `fontFamily` today (Data, VERIFIED: 0).
  - **The call**: Data (Android types), with Ada (the generator).
- **O-11, the reserved Kotlin packages → fail, except for a legacy copy, which warns.** That joins Data's current position and Ada's.
  - **Ada's case is real.** `init` copied `src/components/core/**` before 123 (`src/cli/init.ts` L248, "src/components/core — REMOVED"). So a pre-123 adopter's tree holds `.kt` files declaring `package com.designerpunk.components.core`. Failing on them would break `generate` for supported web adopters.
  - **The rule**:
    - a `.kt` file declaring a reserved package at the legacy copy path warns, and points to `sync --migrate-legacy`. The legacy copy path is `src/components/core/<Component>/platforms/android/`, the one legacy level `componentSources.ts` already recognises.
    - any other such file fails, naming it.
  - **Why**: the copy case is a known shape, and the rest is the silent clash the rule exists for.
  - **The fact that would settle it**: whether any supported adopter holds a reserved-package `.kt` file outside that legacy path. I know of none.
  - **The call**: Ada and Data (co-owners). Leonardo's preference for failing is kept for everything outside the copy case.
- **O-15, generated-file diagnostics seen only in the combined compile → I support Kenya's pinned file order on iOS now, and Stacy's amendment.**
  - **My stake is my component-error record.** Its entries must not move between files from run to run.
  - Kenya's test shows that file order decides whether `invalid redeclaration of 'AvatarTokens'` lands in the generated file or in `Avatar.ios.swift`.
  - So the pinned order (package files first, then generated files, each sorted by path, and printed) is the minimum. Stacy's rule closes the case no order can, on both platforms.
  - **The call**: Kenya (iOS), Data (Android), and Thurgood for the requirements text and the comparator, with Stacy's conditions.

#### [KENYA R2] — cross-read

I read all seven R1 entries.

**Labels**:
- **VERIFIED** = run today on this Mac, Xcode 27.2 / Swift 6.4.2, iOS 17.0 simulator target. These results are not yet confirmed under the harness's 26.x pin.
- **VERIFIED (macOS)** = run as a macOS binary.
- **UNVERIFIED** = training data.

**Inputs**: scratch toys and the 16.2.0 scratch consumer only. No downloads, no installs, no `simctl`.

---

**O-1, the iOS theme type. Kenya's call: iOS types are mine.**
- **Final**: `public protocol DesignerPunkTheme: Sendable`. Each theme instance is a generated `struct` that conforms and is `Equatable`.
- **Why**:
  - It keeps the 11 shipped `any DesignerPunkTheme` sites compiling with no edit. A struct would turn each of them into an error.
  - It passes Swift 6 with one word, `Sendable`.
- **Lina's struct**: I do not take it.
  - Her `Equatable` lands on the generated structs anyway.
  - The existential in the environment does not need to be `Equatable` for SwiftUI to work.
- **What would change my mind**: a measured SwiftUI need for an `Equatable` environment value. That would justify the 11 edits.

**O-2, aliases. Lina and Ada's call (names). The iOS provider is mine.**
- **Final**: I accept the consensus.
  - No aliases.
  - A `<Name>Themes` holder.
  - The product's name on the theme instances and on the provider.
- **Why**: Leonardo's point holds. Two valid spellings split docs, search and agent answers. My R1 only showed that aliases *compile*, not that they are needed.
- **The iOS provider (my call; it answers Leonardo's question)**:
  - The generator emits `View.<name>Theme()`, Data's `{Name}Theme` in Swift's lower-camel form; in the harness consumer that is `.probeTheme()`.
  - It reads `@Environment(\.colorScheme)` and sets `\.dpTheme` to the holder's light or dark instance.
- **Evidence (VERIFIED)**: a 62-member protocol with four conforming structs, the key, the holder and the modifier compiles in Swift 5 and 6. An adopter's Swift 6 module that `import`s it, plain, compiles with no errors while using the key, a `static` of the theme, and `.pbTheme()`.
- **Not verified**: switching between light and dark at runtime. That belongs to Spec 132's D5.

**O-6, the Android theme local. Ada's call, Data consulted.** I take no position. iOS's `EnvironmentKey` has no "static versus dynamic" kind, so nothing on iOS depends on the answer.

**O-8, the Android type table. Ada's call, Data consulted.**
- No position on the Android rows.
- **iOS parity, my call**: iOS keeps a generated `TypographyToken`, because SwiftUI's `Font` has no line height. iOS letterSpacing is covered under Ada's question 2 below.

**O-11, the reserved Kotlin package. Ada's and Data's call.** No iOS stake. Swift resolves same-name types by module, so there is no iOS twin.

**O-15, generated-file diagnostics seen only in the combined compile. iOS is mine; the amendment is Thurgood's, with Stacy.**
- **Final, on iOS**: adopt Stacy's amendment, with two design rules of mine.
- **Why iOS needs it while Android may not**: on iOS, *which* file receives a redeclaration error depends on the order of files given to the compiler (VERIFIED in R1). So a cross-tier conflict can land in a generated file, and the component context would then drop it. Data withdrew the rule for Android because there the case already lands where his check sees it. That is a fact about Kotlin, and it is his.
- **Rule 1**: Stage C's file order is pinned, package files first, then generated files, each sorted by path.
- **Rule 2, answering Stacy's caveat**: the set difference is taken against a **same-mode** baseline. I add a Swift 5 compile of the generated files alone, "T5", used only for the difference. T5 takes about 0.4 s. Stage T stays at Swift 6 for the token verdict.
  - This removes the risk that a key differs only by language mode.
  - **Measured today (VERIFIED)** on the 16.2.0 output: 19 generated-file keys, **identical** at Swift 5 and 6, and identical between Stage T and Stage C. So the difference is empty today, with no false keys from the mode split.
  - That can change once item (i) emits Swift 6 concurrency checks, which is why the baseline is same-mode by construction rather than by today's luck.
- **I accept** that Android differs, if Data shows Kotlin's attribution does not depend on file order.

---

**Ada's two questions**

1. **A `Sendable` protocol with 62 members and generated conforming structs: yes, it compiles** (VERIFIED, at this toolchain, not at the 26.x pin).
   - The protocol was generated from the consumer index's 62 `category: color` semantics.
   - The rest of the file: four conforming `Equatable` structs with Display P3 values, the key, the holder and the modifier.
   - Result: module emit plus object code in 0.68 s (Swift 5) and 0.71 s (Swift 6), 0 errors.
   - The harness's first run confirms this at the pin.
2. **iOS letterSpacing units: iOS needs points, so the composite should carry them.**
   - **The measurement** (VERIFIED (macOS); iOS UNVERIFIED but the same SwiftUI API), on 11 glyphs:
     - `.tracking(10)` widens the text by exactly 110 px at both 16 pt and 32 pt. So `.tracking` takes **points**, independent of font size.
     - Today's em value used directly, `.tracking(-0.025)`, moves the text by 0–1 px, which is a no-op.
     - `-0.025 × size` gives the intended −4 px at 16 pt and −9 px at 32 pt.
   - **Decision for the iOS types (mine)**:
     - The primitive `letterSpacing*` stay `CGFloat` em ratios, as emitted today. They have no font size, so they cannot be points.
     - The generated `TypographyToken` adds a computed `tracking: CGFloat` in points (`letterSpacing × fontSize`). Components call `.tracking(token.tracking)`.
     - No iOS component reads letterSpacing or tracking today (VERIFIED by grep), so there are 0 edits.
     - A Jest test asserts the field.
   - The generator change is Ada's to make.

**Lina's question (from her R1)**: which colours my 61 left out.
- 61 was the scaffolded override file's header comment, not my reading.
- The file actually lists 54 names. Against the index's 62 it lacks `color.contrast.onAction`, `.onDark`, `.onLight` and the five `glow.neon*` (VERIFIED; my R1 O-4).

#### [DATA R2] — cross-read

I read all seven R1 entries. No downloads. One new read only: Peter's pre-123 consumer `../Kiro/test01`, read-only, to settle O-11.

- **O-1, the iOS theme type.**
  - **Final**: Kenya's call (iOS types), with Lina for the component edits. I have no Android stake in it: Kotlin stays a `data class DesignerPunkTheme` either way.
  - **Accept**: whichever Kenya and Lina settle. Ada's and Kenya's `Sendable` protocol keeps the 11 `any DesignerPunkTheme` sites compiling. Lina's struct costs 11 edits.
- **O-2, aliases.**
  - **Final**: no aliases on Android. One spelling per binding (`LocalDPTheme`, `DesignerPunkTheme`). The product name goes on `<Name>Themes` and on the provider composable.
  - **Why**: Leonardo's point. Two valid spellings split docs, code search and agent answers. Dropping the aliases also removes the name collision with the provider.
  - **On Kenya's iOS aliases**: they compile, but I would not take them on one platform only. Final call: Lina and Ada (Q12), with Leonardo on cross-platform consistency.
- **O-6, the Android theme local.**
  - **Final**: Ada's current position, `staticCompositionLocalOf { <Name>Themes.BaseLight }` plus the generated provider composable `<Name>Theme(darkTheme = isSystemInDarkTheme()) { … }`. That was my original position, and I withdraw my R1 switch to `compositionLocalOf`.
  - **Why**: a theme changes rarely, and the static form is the Compose convention for it (REASONING). The provider is the idiomatic entry point and now collides with nothing, since O-2 has no aliases. It is a few generated lines, and `:probe` can call it inside `@Composable`.
  - **Accept**: yes. Ada's call (the generator).
- **O-8, the Android type table.**
  - **Final**: Ada's current rows:
    - letterSpacing: `TextUnit` in `em`;
    - fontFamily: `FontFamily` from the stack's generic family;
    - the composite: Compose `TextStyle` with `lineHeight = <ratio>.em`;
    - the percent radius: `CornerSize(percent = 50)`.

    I withdraw my R1 acceptance of her original rows.
  - **The settling fact is Lina's**: 3 of the 9 composite reads assign the whole composite to a `TextStyle` field (`ButtonCTA.android.kt` L283, L294, L305). A generated `TypographyToken` breaks them; `TextStyle` compiles them. `TextStyle` then needs `FontFamily` and an `em` `TextUnit`, so the other rows follow from it.
  - **Residual**: the brand font name (`"Figtree"`) is lost on Android unless something keeps it. I suggest the primitive keeps § 7's first-entry `String` while the composite uses the generic `FontFamily`; that is Ada's call.
  - `CornerSize(percent:)` was not in my compile; the harness's first run confirms it (Ada).
  - **Accept**: yes. Ada's call; I was consulted.
- **O-11, the reserved Kotlin package.**
  - **Final**: Ada's current position. `generate` **warns**, and does not fail, naming each file.
  - **The settling fact is VERIFIED today**: test01 (`@3fn/core` 12.0.5) has **45** `.kt` files outside `node_modules`, **all** in `com.designerpunk.*`. 32 are in `components.core`, 6 in `components.button`, 3 in `components.avatar`, 3 in `tokens` (two in `dist/tokens`, which is its generate output, and its copied `MotionTokens.kt`), and 1 in `product.tokens`. A "fail" rule would break `generate` for a supported adopter.
  - **What the warning must include and exclude**:
    - it covers `com.designerpunk.components…` as well as `com.designerpunk.tokens`, because the copies above are in the component packages;
    - it excludes generate's own output, the product-token output included;
    - failing can come at 17.0.0, or when 132 ships the module.
  - **Accept**: yes, and I withdraw "fail". Ada's call (the generator).
- **O-15, generated-file diagnostics seen only in the combined compile.**
  - **Final**: re-adopt the rule on Android, in Stacy's form: a set difference, computed from the same run. It is a requirements amendment (Thurgood, with Stacy), on both platforms. I withdraw my R1 withdrawal.
  - **Why**: I withdrew it on the claim that Kotlin reports a clash at each declaration site. That was VERIFIED only within one file. Kenya's iOS run shows the reported site can depend on file order. The set difference does not rest on that claim.
  - **Android also pins the order**: the explicit file list (D § 1.4) is passed sorted, package files first, and printed with the invocation (as in Kenya's K-1).
  - **Accept**: yes, on both platforms. Kenya decides the iOS mechanics; I decide the Android mechanics.
- **[@DATA] from [STACY R1]: do `:tokens` and `:dp` run in one job and one Gradle invocation?**
  - **Yes. Each Android context runs the same single invocation**: `gradle --continue :tokens:compileDebugKotlin :probe:compileDebugKotlin :dp:compileDebugKotlin` (D § 1.2).
  - So `harness-android-components` has `:tokens`' diagnostics from its own run, at the same SHA. That costs one extra compile of the generated files, which takes seconds.
  - **Condition 2 then reads**: if `:tokens:compileDebugKotlin` did not execute (no task outcome in the run, for example a configuration failure), the component context fails. A `:tokens` compile that fails with diagnostics is a result, not a missing one.
  - No job dependency between the two contexts is needed.

#### [THURGOOD R2]

Incorporation of the seven R1 reviews and the four owners' R2 cross-read into `design.md` R2. The eleven entries above are spliced byte for byte from the reviewers' files (checked by offset and length against each file). **The rule I applied**: where an item is a named owner's call, that owner's latest position (R2 where written) is the decision, and other seats' accepts and residuals are recorded beside it. This was not a vote.

**My @ mentions**
- [@THURGOOD] from [STACY R1], § 3: **yes to both.**
  - The comparator reads each compile's exit status. It fails as `pre-compile` when the exit is non-zero and no error was parsed, and as `parser` when the exit is zero and errors were parsed.
  - It fails as `base unreadable` when the merge base cannot be read. It admits Req 3.5 (b) only on positive evidence that the list is absent at a readable base.
  - Also taken from her § 2: a dispatched run prints `additions not checked: no merge base`; the protected set is read at both commits; Req 2.10 is not left to a path filter (tasks round). → design.md § 3.
- [@THURGOOD] from [KENYA R1] O-20 (the `harness/ios/` grant): carried to the tasks round as she lists it. → design.md § 1.
- From [KENYA R1], O-15 (count cross-tier keys separately): adopted, my call. → design.md § 3; requirements Req 3.8.

**O-items, by owner**
- **O-1**, Kenya's call (KENYA R2): `public protocol DesignerPunkTheme: Sendable`, with `Equatable` generated conforming structs. Lina and Ada accept (LINA R2, ADA R2). Lina's 11 `any` edits drop out of § 13.
- **O-2**, Lina's and Ada's call (names); Kenya's (iOS provider); Data's (Android provider).
  - No aliases in 129. `<Name>Themes` holders on both platforms; Kenya's implicit members.
  - The providers: Kenya's `View.<name>Theme()`, verified to compile; Data's `<Name>Theme(darkTheme = …) { content }`. Data's R2 restores the provider that ADA R2 and LINA R2 had deferred on his R1.
- **O-3**: `\.dpTheme` stays (Lina, Ada; Kenya withdrew). Leonardo's residual is recorded.
- **O-4**: every index colour semantic, 62 (Lina's definition; Ada withdrew hers; Kenya withdrew 61). Kenya's scaffold finding goes to Ada (§ 16).
- **O-5**: no new index field; the root rule goes in the index README (Ada). Req 4.2 is amended.
- **O-6**, Data's call (DATA R2): `staticCompositionLocalOf { <Name>Themes.BaseLight }`, plus the provider.
  - Stated plainly because the seats crossed. In R1 each took the other's position. In R2, Ada yielded the call to Data, and Data restated his original.
- **O-7**: taken into item (i) by Ada, with no record. The two real-definition tests are in place. Req 4.2 is amended to require resolved values (Stacy's Req 1.7 point).
- **O-8**, Data's call (Android types): his R2 rows as written. letterSpacing is `TextUnit` em; fontFamily is `FontFamily` from the generic family; the composite is `TextStyle` with `lineHeight = <ratio>.em`; the percent radius is `CornerSize(percent = 50)`.
  - `TextStyle` is agreed by all four, on Lina's Button-CTA evidence.
  - Three noted alternatives go to Ada and Data at the tasks round, as variants of the decision, not a new fork: Data's own brand-font residual, Ada's R2 combination, and Lina's `.style` bridge.
  - The iOS side is Kenya's: `TypographyToken` with a computed `tracking` in points.
- **O-9**, Kenya's call (Ada handed it to her in R1): iOS `String?`, `nil` for a generic stack.
- **O-10**: closed by Kenya's and Data's compiles and Ada's P3 mapping. Data's 0–1 assertion and Stacy's fixture-source point go to Ada (§ 16).
- **O-11**, Ada's and Data's call (ADA R2, DATA R2): warn, never fail, in 129.
  - The decisive facts: `MotionTokens.kt` is in `com.designerpunk.tokens` in every consumer, and test01 has 45 reserved-package `.kt` files.
  - The scan skips `config.tokenSourceRoot` and generate's output.
  - Lina's "fail except the legacy copy path" and Leonardo's preference for failing are recorded as considered, with why they were not taken.
- **O-12**: confirmed (Lina). The "not emitted (replaced by yours)" report is added (Ada).
- **O-13**: confirmed (Lina).
  - Ada's general older-config fallback covers Leonardo's missing-`themes` case, with a package-mode exception and a report when a file is missing.
  - Sparky's web-values assertion is the acceptance.
  - Leonardo's `sync` override-drift report overlaps disposition #13's record. Ada decides at tasks whether 129 takes it (§ 16).
- **O-14**: option A holds (Sparky). The cascade sentence gains Sparky's two additions. Req 1.6's `var()` reach includes the package's `component-tokens.css`, and Sparky owns that check.
- **O-15**: adopted on both platforms as a requirements amendment (Kenya, Data R2, Stacy), with the pinned file order and Kenya's same-mode T5 baseline. → requirements Req 2.6, 3.8.
- **O-16**: one contract; each platform keeps its own shape (Kenya, Data). `@Immutable` goes to Ada (§ 16).
- **O-17**: `<root>:<path> | <message>`, split at the first ` | ` (Kenya).
- **O-18**: `ConfigHelpers` iOS 15.0 → 17.0 and Android 24/21 → 26, in the Req 6 parent (Ada). → design.md § 12a.
- **O-19**: designs for Req 12, 13.3 and 10.3 (Ada). Leonardo's single-source point for `platforms:` is added. → design.md § 12a.
- **O-20**:
  - Lina's `offGridReason` text is in § 12, and Leonardo's step text and messages are in § 14.
  - `rendering:` stays one look field (Lina, Leonardo), with Leonardo's optional `platformParts:` for Spec 132.
  - The `harness/ios/` grant goes to the tasks round.

**Also folded**
- Req 2.6 is relabelled an **Amendment**, with its changed reach stated (Stacy).
- The hand-written `AvatarTokens` / `BadgeLabelBaseTokens` enums are removed in the third-source PR (Ada, from Kenya's finding).
- Leonardo's iOS wording fix: "compiled for an iOS 17.0 deployment target; not run on any device or simulator".

**Requirements amendments in this PR**: Req 2.6, 3.8 and 4.2, each with a dated line in place (prior text at `10ec4af5b`).

**Core Goals.** Peter answered #672's question, received 2026-11-05T13:43:14Z (orchestrator relay), verbatim: "(a), and start the 131 ledger". What he read: "Is it (a), the one-item ballot?".
- The ballot is drafted in its own PR by another Thurgood session, from design.md § 15's proposed text.
- That text is revised here for Stacy's two wording points: one referent for the Compose floor, and the item's kind becomes `obligation`.
- Her application path, including Data's charter L461 site, is recorded in § 15.
- Core Goals is not edited in this PR.

**Left open**: design.md § 16, nine rows. Each has an owner and the round that closes it, and none blocks the design.
