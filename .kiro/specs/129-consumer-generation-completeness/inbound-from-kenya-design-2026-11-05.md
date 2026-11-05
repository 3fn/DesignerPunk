# Inbound to Spec 129's design round from Kenya: the iOS harness, the iOS side of Q12 and Q13, and the iOS minimum

**Date**: 2026-11-05
**From**: Kenya (iOS harness designer; iOS verifier)
**Read at**: `origin/main` `2622faf3e`. Requirements merged as #658 (`55004006b`).
**Peter's go**, verbatim, received 2026-11-05T05:38:16Z (orchestrator relay): "658 and 664 are merged; go for design".
**Labels**:
- **VERIFIED** = I ran it today on this Mac: Xcode 27.2 (27B52), Apple Swift 6.4.2, `iPhoneSimulator27.2.sdk` (SDK build 24B8118), target `arm64-apple-ios17.0-simulator`.
- **READ** = read in a file or document named.
- **UNVERIFIED** = reasoning or training data.

**Input for every measurement**: a scratch consumer outside the repo. It is `@3fn/core@16.2.0` from npm, then `init --abbreviation pb`, then `generate`, made in the Q5 round and reused. Nothing new was downloaded or installed, and no `simctl` command was run.

---

## Plain language first

- **The harness design.** On iOS the harness is three small compiles on one macOS runner:
  - **Stage T** builds our generated token files into a module.
  - **Stage P** builds a generated "probe" that reads every token the index names, from outside that module, the way an app would.
  - **Stage C** builds the token files and all of our component source together, as one module.

  Each stage first runs two tiny known-bad files. If the compiler does not reject them in the expected way, the stage fails. That proves the lane really compiles and really reads from outside, rather than us asserting it.
- **Q12 (theme names), the iOS answer: the names the components read must be fixed.** Our components are shipped source read in place, so they can only name things that are the same in every adopter's project. The adopter's own name goes on their theme values, not on the type or the key.
  - One new constraint: the theme type must be safe to share across threads (`Sendable`). Today's generator would emit a theme that an adopter's Swift 6 code rejects (VERIFIED).
- **Q13 (static colours), the iOS answer: the theme carries every semantic colour, (a).** Which colours vary is decided by the adopter's own theme overrides, once the generator reads them. So the shipped components should not hard-code which colours are static. Under (b), an adopter who adds a dark override for a colour we treated as static would break our components or leave them unthemed.
- **For Peter (decision 4, the iOS minimum)**:
  - No shipped iOS component uses anything newer than iOS 17 (VERIFIED: zero availability errors at target 17.0).
  - 129 runs no apps, so for 129 the only effect of the decision is the compile target.
  - My lean: keep iOS 17.0, and ask the runtime half of the question again at Spec 132's outline.
  - A real iOS 17 runtime test needs a multi-gigabyte download, either here or in CI, and either one needs your go.

---

## 1. The iOS harness: three stages, one runner

**Carried by**: Req 2.4, 2.6, 2.8, 3.4, 3.11. **Owner**: Kenya; the comparator is Thurgood's.

### Decision K-1. The module topology and the pinned invocations

- **Stage T (`harness-ios-tokens`)**:
  - Inputs: the generated iOS files only, which are the token tier (Req 2.4): `DesignTokens`, `ComponentTokens`, the theme file(s) item (i) adds, and `ProductTokens` from the fixture.
  - One invocation: `swiftc -emit-module -emit-module-path <T>/DPHarnessTokens.swiftmodule -c -wmo -parse-as-library -module-name DPHarnessTokens -swift-version 6 -diagnostic-style llvm -sdk <simulator SDK> -target arm64-apple-ios<min>-simulator`.
  - `<min>` is Core Goals' iOS minimum (Req 2.9).
- **Stage P (the probe, also `harness-ios-tokens`)**:
  - The generated `Probe.swift` is compiled `-c` with `-I <T>`, plain `import DPHarnessTokens`, never `@testable`, at `-swift-version 6`.
  - It runs only if Stage T wrote a module. A token file with errors writes none (VERIFIED: exit 1, no `.swiftmodule`).
  - Until then the context prints `probe: blocked (token module not built)`, and the row 9 text guard (K-5) is row 9's instrument (Req 6.2).
- **Stage C (`harness-ios-components`)**:
  - Inputs: the generated files plus every non-test `.swift` in the packed tarball, including `MotionTokens.swift` and `ThemeAwareBlendUtilities.ios.swift`, but not the package's `dist/ComponentTokens.ios.swift` (Req 2.4).
  - One invocation, as Stage T but without module emission, with `-module-name DesignerPunk` and `-swift-version 5`.
  - The module name `DesignerPunk` is the one the two shipped test files already `@testable import`. It keeps 132's test target and the harness on one name.
  - The list holds only diagnostics in component-tier files (Req 2.6). Stage C does not wait for Stage T: with `-wmo` the compiler reports the whole module past token errors (VERIFIED: 437 distinct diagnostics in 34 files).
- **Why each flag**:
  - **`-c`, not `-typecheck`.** `-typecheck` exits 0 on a missing return and on a constant read before it is set, and `-c -wmo` rejects both (VERIFIED, Swift 6.4.2).
  - **`-c` costs no signal.** On the real input, `-c -wmo` and `-typecheck -wmo` report the same 437 diagnostics (VERIFIED).
  - **`-wmo`** puts the whole module in one frontend, so every file's errors print.
  - **`-diagnostic-style llvm`** prints one line per diagnostic. The default style prints each error twice (location and caret); `llvm` gives the same 437-line set with no doubling (VERIFIED). That removes the double-count hazard at its source. The normalisation rule in K-2 stays as the defence.
  - **`-target …ios<min>-simulator`** is what makes the floor compile evidence. An iOS 18 API (`MeshGradient`) is rejected at 17.0 and accepted at 18.0 (VERIFIED).
- **Why Swift 6 for the token tier and Swift 5 for the component tier**:
  - **Token tier on 6.** The generated files are ours to make clean in the strictest mode an adopter's own code may use.
    - Today's generator emits `public protocol ${name}Theme {` (`src/generators/TokenFileGenerator.ts` L1185) and `public static let defaultValue: any ${name}Theme` (L1260).
    - Under Swift 6 that key fails: "static property 'defaultValue' is not concurrency-safe because non-'Sendable' type 'any DesignerPunkTheme' may have shared mutable state". A `struct`, or a `protocol …: Sendable`, compiles under both modes (VERIFIED, toy files).
    - An adopter's Swift 6 module also rejects a non-`Sendable` theme from a Swift 5 module, once it stores the theme in a `static` (VERIFIED).
    - So the probe holds one `static` of the theme type, as an adopter would.
  - **Component tier on 5.** That is what the shipped source was written for. Under Swift 6 it gains 8 errors today, in `Avatar`, `BadgeCountBase`, `BadgeCountNotification`, `BadgeLabelBase`, `NavHeaderPage` and `ThemeAwareBlendUtilities` (VERIFIED).
    - Moving the components to Swift 6 belongs to 132's packaging: the root manifest's language mode. It is not a 129 row.
- **Every stage prints** its exact invocation and the toolchain fields of K-6 (Req 2.6, 2.8).

**Counter-argument folded back.** Three invocations and two language modes are more than the "one `swiftc` call" the Q5 round described.
- **What it changed**: Stage P is skipped with a printed reason, not failed, while the token module cannot build. So the extra stage adds no red during the measuring period.
- **The residual**: a token fix can change counts in component files, because missing names cascade, so token PRs may edit the component list too (Req 3, "Its limits").

### Decision K-2. Swift diagnostic normalisation (Req 3.2; mine to own)

- **What counts**: only lines that match `^<path>:<line>:<col>: error: `. Warnings and `note:` lines are not keys.
- **The key** has two parts:
  - the path relative to its root, with a root prefix: `gen:` for the consumer's generated output, `pkg:` for the package, `probe:` for the generated probe;
  - the message after `error: `, kept whole. That includes quoted identifiers and the bracketed group tag such as `[#MutableGlobalVariable]`.
- **No line or column**, and a count per key.
- **Compiler-internal messages are ordinary keys**, for example `failed to produce diagnostic for expression; please submit a bug report`. Xcode 27.2 printed it in at least three component files where 26.0.1 did not (Q5 round and requirements R1).
  - It is specific to the toolchain, so the pin-change exception (Req 3.5 (a)) is what admits its arrival and departure.
- **Determinism**: three runs, including one with the file order reversed, gave identical diagnostics (Q5 round, VERIFIED under 26.0.1).

### Decision K-3. The probe is generated from the consumer's token index (Req 2.7, D1 as Peter amended it)

- **The source** is the consumer's `token-index/primitives.yaml`, `semantics.yaml` and `components.yaml`: every entry whose `platforms.ios` is non-null.
  - At 16.2.0: 221 primitive entries, 4 of them null; 200 semantic entries, 13 null; 33 component entries (VERIFIED, scratch consumer).
- **How each index name is read**:
  - Primitive and semantic names are relative to `DesignTokens`. `Duration.duration150` is read as `DesignTokens.Duration.duration150`, matching the generated nesting (`public enum Duration` inside `public struct DesignTokens`, VERIFIED).
  - Component names are top-level, for example `ProgressTokens.connectorThickness`.
  - Theme-varying colours are read through one instance of each registered theme and mode (Req 4.1, 4.2).
- **One line per read** (`_ = <path>`).
- **The read count** is printed as `probe: read <n> of <m> index names (primitives a, semantics b, component c, theme d×k)`. The run fails if `n ≠ m`.
- **Access level does not matter.** A member the index names but the file declares `internal` produces the entry `inaccessible due to 'internal' protection level`. That is row 9. At my Q5 count, 98 of these would appear once the module builds (VERIFIED with stand-ins, `@3fn/core@16.2.0`).
- **Two facts I need from Ada** (§ 4):
  - The probe's root rule (`DesignTokens.` for primitives and semantics, none for components) is a convention I inferred, not something the index states.
  - **The index's `themeVarying` flag is not the native theme set.** `generateTokenFiles.ts` L244–246 says the flag is base-scoped and excludes WCAG-only colours, and that it is "DISTINCT from the registry-wide `themeVaryingTokens`" the native generators use (L227–230; returned as `nativeThemeVaryingTokens`, L389).
    - Lina's scan counts 14 iOS reads of the five WCAG-only names (her inbound § 3.3).
    - If the probe takes the index flag, it reads those five on `DesignTokens`, where the native generator leaves them out. That gives false entries, or a missed theme member.
    - Req 4.2 says "the token index's theme-varying set", so the index must expose the native set.

### Decision K-4. A self-test at the start of each stage, on the macOS runner

Req 3.10's Jest test runs on ubuntu, where there is no Swift compiler. It can prove the comparator's logic against recorded compiler output. It cannot prove what the pinned compiler does. So each iOS stage first compiles two fixture files under its own pinned invocation, and fails as `self-test` if the compiler does not behave as expected:
1. **A compile-only fixture.** A function with a missing return must give exactly one `missing return` error. This proves the invocation compiles and does not only typecheck.
2. **A planted member** (Stage P only). A two-member token fixture with one `internal` member, read by a generated probe, must give exactly one `inaccessible due to 'internal' protection level` entry and a read count of 2 of 2. This proves the plain-import topology and the read count.

Each takes under a second (VERIFIED: 0.35 s for a module emit plus object code of a token file).

**Counter-argument folded back.** These duplicate the Jest falsification test.
- **What it changed**: the Jest test keeps the comparator's logic, and the macOS self-test keeps only the two compiler behaviours the logic depends on.
- **The residual**: two fixtures live under `harness/ios/` and must move with each Xcode pin.

### Decision K-5. Row 9's interim text guard (Req 6.2; Ada implements, I specify the oracle)

- **The oracle**: for every index entry with an iOS name relative to `DesignTokens`, the generated `DesignTokens.ios.swift` declares that member with `public` inside the nested type the name implies. For component entries, the same check runs against the consumer's `ComponentTokens.ios.swift`.
- **Where**: `src/generators/__tests__/tokenIndexPlatformNames.test.ts`, tightened as the record's fix plan item 2 says, in `lane-functional-root`.
- **Known-bad case**: one fixture line without `public` must fail the test.
- **Retirement**: in the PR where Stage P first compiles and prints a full read count. That PR's body names the retirement.
- **Counter-argument folded back.** A text guard reads text, not the compiler. It cannot see an access level inherited from a non-public enclosing type.
  - **What it changed**: the oracle checks the enclosing type's `public` too.
  - **The residual**: it is still a reading of text until the probe runs. That is why it retires as soon as the probe can.

### Decision K-6. Toolchain match (Req 3.11)

- **Selection.** The pin file names the Xcode by version, build and app path (`/Applications/Xcode_<ver>.app`). The workflow sets `DEVELOPER_DIR` from it. A missing path fails as `toolchain missing`.
- **Reading.** Each stage reads:
  - `xcodebuild -version`: version and build, for example "Xcode 27.2 / Build version 27B52";
  - `xcrun --show-sdk-version --sdk iphonesimulator` and `--show-sdk-build-version`, for example 27.2 and 24B8118;
  - `swiftc --version`: driver and Apple Swift version, for example 6.4.2, `swiftlang-6.4.2.1.9`.

  Any field that differs from the pin fails the stage. The fields shown are VERIFIED on this Mac today.
- **Why build numbers, not only versions.** The runner image replaces a patch version when a new one ships (READ: `actions/runner-images` README, 2026-11-04). A version string alone can hide a rebuilt toolchain.
- **Measured reason this matters.** On identical input, Xcode 26.0.1 gave 407 distinct diagnostics and Xcode 27.2 gave 437, with 125 keyed entries different (VERIFIED, requirements R1).

### Decision K-7. The Xcode pin (a tool choice, so the team's; tasks round confirms)

- **What I know**:
  - The `macos-26` arm64 image readme I read on 2026-11-04 (image 20261026) carried Xcode 26.0.1 through 26.6, default 26.6. It announced Xcode 27 as a public preview. It states one major Xcode per macOS image, and that replaced patch versions are removed (READ).
  - This Mac now has only Xcode 27.2 (VERIFIED).
  - Whether a standard runner carries 27.2 is UNVERIFIED.
- **Decision**: **pin the newest Xcode 26 minor the `macos-26` image carries when the harness unit is cut** (26.6 at my last read). The tasks round re-reads the image readme first. That is a network read of a document, not an install.
- **Why**:
  - The CI run is the record (Req 2.13), and Stacy's re-dispatch at a merge SHA needs a pin that a free standard runner still has.
  - A pin that only my Mac can reproduce is worth less than one CI can.
  - It keeps the runner class Peter approves to a standard, free `macos-26`.
- **Counter-argument folded back.** Pinning 27.2 would let me reproduce CI locally, line for line.
  - **What it changed**: if the tasks-round read finds 27.x on a standard label, I pin 27.x instead, so CI and this Mac match.
  - **The residual**: until then, my local counts differ from CI's, and I do not present them as the list.
  - Exact local reproduction of a 26.x pin would need Xcode 26.x installed on this Mac. That is a multi-gigabyte download, and it needs Peter's go. I do not ask for it: the CI run is the record.
- **When it becomes Peter's**: only if the pin needs a runner label other than `macos-26` or `macos-15`, because a new runner class is his (plan decision 6).

---

## 2. Q12: theme names across consumers (iOS consult; Lina and Ada decide)

**Carried by**: Req 4.1, 4.7. **Owners**: Lina, Ada. I am consulted.

### My iOS read: (a), fixed names the package defines

- **Why it is the only option that works on iOS**:
  - Our components are shipped `.swift` source read in place from `node_modules`. Their text is the same in every adopter's project. So the type name, the `EnvironmentValues` property and the key path they read (`@Environment(\.dpTheme)`, 27 reads) must be the same in every project.
  - **(b)**, components generic over the theme, collapses on iOS. `@Environment` cannot take a generic key type, which leaves either (a)'s existential or passing the theme as an initialiser parameter to every component (Kenya R1 in the outline round).
  - **(c)**, components regenerated per consumer, makes `generate` write a transformed copy of our component source into the adopter's tree. That breaks "nothing copied from `node_modules`" and the update path.
- **Where the adopter's name goes**: on their theme instances, not on the type or the key. The generator already derives names from the abbreviation (`TokenFileGenerator.ts` L1259–1267).
  - Example: `DesignerPunkTheme.pbLight`, `.pbDark`, `.pbWcagLight`, `.pbWcagDark`, one per registered theme and mode (Req 4.1).
  - Optionally, a generated `public typealias PbTheme = DesignerPunkTheme`, so the adopter's own code can say their name.
  - This keeps as much of Leonardo's principle ("generated names use the product's name") as source read in place allows.

### My iOS recommendations inside (a), for Lina and Ada

- **R-1, the theme type must be `Sendable`.** Either a `struct` with stored colours, or `protocol …: Sendable`. Measured in § 1 K-1: today's `any ${name}Theme` key fails Swift 6.
  - **My lean is the `struct`**:
    - it is `Sendable` without ceremony;
    - it is a value type, with `Equatable` for SwiftUI's diffing;
    - it matches Android's data class, one shape on both platforms (Data to confirm);
    - generated instances need no hand-written conformance.
  - **The counter**: a protocol lets an adopter write a computed or dynamic theme. With a struct they build an instance instead, which covers the same need for colours.
- **R-2, the key path's name.** `\.dpTheme` reads as DesignerPunk's own abbreviation in a product named something else. If Q12 renames it (for example `\.designerPunkTheme`), it is one rename across 27 reads, which Lina owns. If it stays `dpTheme`, the harness consumer's `pb` abbreviation still shows that the name is package-fixed, which is the point of Req 2.2.
- **R-3, the default value.** The `EnvironmentKey` default is the base light instance, as today (L1260). On iOS a missing provider renders light rather than crashing. That differs from Android's open `error(...)` question, so that choice is Data's and Ada's, not a cross-platform rule.

**Counter-argument folded back.** Fixed names make the adopter's abbreviation cosmetic on iOS. Their theme is a `DesignerPunkTheme`, which is Spec 094's behaviour change (outline § 5.3).
- **What it changed**: the adopter's name stays on every instance, plus the optional typealias.
- **The residual**: the type and key are ours by name in every adopter's project. That is the price of shipping source read in place. Under 132's module layout it is also correct: the type lives in our module, and the adopter's module imports it.

---

## 3. Q13: the access form for static colours (iOS consult; Lina and Ada decide)

**Carried by**: Req 4.2, 4.6, 4.10. **Owners**: Lina, Ada.

### My iOS read: (a), the theme carries every semantic colour, and components read every colour through `theme`

- **Why**: which colours vary becomes the adopter's choice once 129 reads their config.
  - **What the code says today**: the native theme-varying set is "registry overrides (unions ALL registered themes …) ∪ base light/dark differences" (`src/generators/generateTokenFiles.ts` L227–230). The overrides are still DesignerPunk's own static imports, and "config.themes is not read here (Spec 129 item (i))" (L17–18).
  - **What changes**: when item (i) and item (vi) make the adopter's overrides the source, the varying set becomes theirs. The scaffolded dark override file even says "To add an override: uncomment the entry" (`src/tokens/themes/dark/SemanticOverrides.ts` in the scratch consumer, READ).
  - **Under (b)**, our shipped components hard-code which colours are static by reading them as `DesignTokens.<name>`. An adopter who adds a dark override for one of those colours then gets one of two failures:
    - the generator moves it out of `DesignTokens` (the record for row 9 says the native set "is left out of `DesignTokens`"), and our component fails to compile in their project;
    - or it stays there, and our component silently ignores their dark value.
  - **Under (a)**, the component source does not depend on the adopter's varying set at all.
  - **A probe I tried and could not run**: adding such an override in the 16.2.0 scratch consumer changes nothing in its output, because 16.2.0 does not read `config.themes`, as the comment at L17 says (VERIFIED: `colorIdentityHuman` stayed in `DesignTokens.ios.swift`). So this argument is REASONING from the generator code, not a measurement. It can be measured once item (i) reads the config.
- **iOS size**:
  - **(a)** changes **no** iOS component read. All 81 static reads in 20 files already read through `theme` (Lina's inbound § 3.3). Row 16's three malformed reads need rewriting under either option. Only the generated theme grows, to every semantic colour: 61, per the scaffolded dark-override file's own count.
  - **(b)** rewrites 81 reads in 20 files, and on iOS it also needs row 9's `public`.

**Counter-argument folded back.** Under (a) the theme no longer means "what varies", and its constructor carries every colour. That breaks hand-written instances on Android (Data R1 item 18).
- **What it changed**: with R-1's struct and generated instances, an adopter on iOS never writes the 61-colour initialiser by hand. They edit their overrides and run `generate`.
- **The residual**:
  - a larger generated theme file;
  - a theme type whose members are "every colour, resolved per theme", not "what varies";
  - on Android, Data's constructor cost.

**Interface.** Lina's 173-read count and my iOS share come from her text scan, not a build. The harness's first committed run replaces both with compiler counts.

---

## 4. Interfaces to other owners

- [@ADA] The probe (K-3) needs the token index to expose the **native** theme-varying set (`nativeThemeVaryingTokens`, `generateTokenFiles.ts` L389), not only the base-scoped `themeVarying` flag. Otherwise the five WCAG-only colours are read in the wrong place. Can the index carry it, for example as `nativeThemeVarying: true` per entry? And can each iOS name state its root (`DesignTokens` or top-level), so the probe follows the index rather than my inferred rule? -- [KENYA, design inbound]
- [@ADA] K-5's oracle is yours to implement in `tokenIndexPlatformNames.test.ts`. Is "public, with a public enclosing type, for every index iOS name" the tightening you intend? -- [KENYA, design inbound]
- [@LINA] [@ADA] Q12 under (a): do you take R-1 (a `Sendable` struct, or a `Sendable` protocol) and R-2 (the key path's name)? R-1 is measured. R-2 is a naming call that is yours. -- [KENYA, design inbound]
- [@LINA] Q13: do you take (a) on the reasoning in § 3, that the varying set becomes the adopter's? If you lean (b), what keeps a static read from breaking when an adopter overrides that colour? -- [KENYA, design inbound]
- [@DATA] R-1's struct matches a Kotlin data class. Does one shape across both platforms hold for you? And does K-1's split (generated code compiled in the strict mode, shipped components in the mode they were written for) have an Android counterpart? -- [KENYA, design inbound]
- [@THURGOOD] K-4's self-tests run inside the iOS contexts, beside your comparator. They need the `harness/ios/` fixtures in the harness unit's grant. -- [KENYA, design inbound]

---

## 5. For Peter: decision 4, the iOS minimum

**The problem.** Core Goals says "iOS: 17.0+". The question is whether that number stays, given that **no free runner can run an iOS 17 simulator**.
- Runtime evidence today starts at iOS 18.5 (on the `macos-15` image) or 26.x (on `macos-26`).
- The `macos-14` image, which had iOS 17, was retired on 2 November 2026 (READ: runner-images README, 2026-11-04).

**What 129 actually needs from you.**
- 129 runs no apps and no tests. So in 129 this decision sets only the compile target (Req 2.9), which makes "uses nothing newer than the minimum" compile evidence.
- Whether something *runs* on the minimum is Spec 132's D4.

**Facts** (VERIFIED unless labelled):
- At target 17.0, the 437 diagnostics on the 16.2.0 input include **zero** "only available in iOS …" errors. No shipped iOS component uses an API newer than 17, so keeping 17 costs nothing in today's source.
- The current toolchain still builds for 17.0. A SwiftUI file also type-checks at targets down to 13.0.
- This Mac has only an iOS 26.0 simulator runtime. That is from my 2026-11-04 listing; I have not run `simctl` since.

**Options**:
1. **Keep 17.0, proven by the compile only.** 132 labels runtime evidence by the version it ran on, for example "renders on iOS 26.x, built for 17.0".
   - Opportunity: no cost. Adopters on iOS 17 devices are not dropped.
   - Risk: behaviour on 17 is never run. SwiftUI's look and some behaviour differ between 17 and 26 (UNVERIFIED in detail).
2. **Keep 17.0, and run an iOS 17 runtime at releases** (in 132).
   - Opportunity: real evidence at the floor.
   - Risk: an unmeasured cost every release. It may also need a second, older Xcode, because whether Xcode 26 or 27 can run an iOS 17 runtime is UNVERIFIED.
3. **Raise the minimum to 18.**
   - Opportunity: `macos-15`'s iOS 18.5 simulator gives runtime evidence close to the floor, free. Newer SwiftUI APIs become usable.
   - Risk: drops iOS 17 devices (their share is UNVERIFIED). It gains nothing in today's code, which uses no 18-only API.

**My lean**: option 1 for 129, now: the compile target stays 17.0. Then ask the runtime half again at 132's outline, where D4 lives, with the probe below measured.

**What survives**: until that probe runs, nothing we ship has been run on iOS 17. Shipped text must not say it has.

**The evidence the runtime half needs, and what it costs** (both need your go):
- **A local probe on this Mac.** Download one iOS 17 simulator runtime (`xcodebuild -downloadPlatform iOS -buildVersion 17.x`; several gigabytes, size UNVERIFIED), install it, and boot a hello-world app built for 17.0. It measures size, time, and whether Xcode 27.2 can run it.
  - Cost: a download and an install, about one hour of a session.
- **Or a CI probe.** One dispatched run of a new workflow on `macos-15`, which does the same with that image's Xcode, and records size and time by run URL.
  - Cost: a CI change, a new workflow under `.github/workflows/`, which needs a grant and your go. Plus one free standard macOS run.
- **Neither is needed for 129.** I recommend the CI probe at 132's outline: it measures the runner the lane would use, and leaves this Mac unchanged.

**Peter's answer (2026-11-05, recorded by Kenya).** Verbatim, received 2026-11-05T13:05:54Z (`date -u` at receipt; orchestrator relay): "yes, 4 (a), 7 (a)". The "4 (a)" is this decision. He had read: "Decision 4: (a), keep 17.0, with the floor decided at 132's outline?", together with the synthesis of `[KENYA D4]` and `[LEONARDO D4]`.
- **What it settles**: iOS 17.0 stays Core Goals' minimum, and it is Requirement 2.9's deployment target for 129.
- **What it leaves open, and when it closes**: the floor is decided again at Spec 132's outline, **before any native support claim ships** (Leonardo's deadline). Option (c), raising the minimum to 18, is a live candidate there.
- **The wording rule until something runs on iOS 17**: shipped text says "built for iOS 17.0, not run on 17".

---

## 6. Out of this inbound

- **Android**: the harness design and decision 5 are Data's.
- **Decision 6**: runner classes and promotions are Peter's at the tasks round.
- **The runtime and visual questions**: Liquid Glass restyling on iOS 26, render lanes, VoiceOver. These are Spec 132's (Req 8.4; plan-r2 decision 9).
