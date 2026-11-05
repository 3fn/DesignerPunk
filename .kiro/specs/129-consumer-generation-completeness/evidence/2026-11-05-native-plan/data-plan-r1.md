#### [DATA PLAN R1]

Read `plan-draft-r1.md` in full and `peter-2026-11-05.md`, on `origin/main` `5c48f3ccb`. Labels: **VERIFIED** = I ran or read it myself; **REASONING** = inference or training data; **UNVERIFIED** = not checked. No downloads, installs or licence acceptances this round. The only new evidence comes from files already in my scratch directory: the cached library manifests in `data-work/gradle-home`, my R2/R3 component copies, and the runner-image readmes fetched in R2. Plus `git log` on two records.

---

### Plain language first (for Peter)

- **Structure.** I agree with Thurgood's two specs under one goal (B2). On Android, the hard unknown is not packaging but **whether GitHub's free ubuntu runners can run an Android emulator**. That is how "renders in the app" gets proven. So I add one cheap probe that measures this before 132's requirements are written.
- **Proving it renders on Android takes two tools.**
  - **Robolectric** runs on any machine with no emulator. It is fast and steady, and it is the right tool for most of the 214 behaviour checks.
  - **It is not "the app".** Only an emulator running the built app shows that the components render in an adopter's app. I recommend the emulator for one render check per component, and Robolectric for the behaviour checks.
- **What TalkBack says aloud cannot be checked by a machine.** I recommend keeping it out of "done" as a labelled kind of evidence. Inside "done" go the semantics tests plus Android's automated accessibility checks, which a machine can decide.
- **The Android minimum is a real choice, and it has a floor already.**
  - The Compose libraries we pin today refuse anything below **Android 6 (API 23)** (VERIFIED).
  - One component uses a date API that needs **Android 8 (API 26)**, or extra setup in the adopter's app (REASONING on the API level; the call itself is VERIFIED).
  - Peter picks the number. The facts are in § 4.

---

### 1. Structure: **B2**, with an Android render probe before 132's requirements

**Why, from Android:**
- **The Android packaging shape is already measured.** In R3, an adopter-style Gradle module compiled the package's component source from `node_modules` against the consumer's generated tokens, with no copying: 13 s, 740 errors (VERIFIED, R3).
- **The emulator question is not measured.** Whether D4 can run an emulator on a free runner is UNVERIFIED (below), and it decides whether D4 on Android needs a paid runner (Peter's § 5 item 5) or falls back to a weaker, labelled evidence kind.
- **Writing 132's requirements before that is answered means writing them on a guess.** B2's split is "where the evidence changes". On Android the render evidence changes at a different event from the compile evidence. So I would add a **render-feasibility probe** to the distribution charter's re-rule.
  - It is a dispatched, non-required job on `ubuntu-24.04` that reports four things: whether `/dev/kvm` is usable, the system-image download and emulator boot time, one instrumented smoke test, and one Robolectric Compose test.
  - Kenya runs the iOS twin (an iOS 17 runtime: § 5 item 1 (a)).
  - It reports into 132's outline. It is not a gate, and it needs only the harness's workflow grant.

**Fold-back.**
- **Strongest counter-argument from Android.** The Android harness is already built in the adopter's shape (Data R3, folded into WP2), so Android packaging (WP4) is about one session once 129's design rulings land. B2 makes that one session wait a whole outline → requirements → design → tasks cycle. And because 132 moves both platforms together, Android also waits for iOS's larger packaging step (Kenya: about 1–1.5 sessions plus the public-API pass).
- **What it changed:**
  - The harness is built as the adopter module, so it is not rebuilt in 132; 132 changes only where the module's build script lives (§ 2).
  - The render probe runs during the gap, so 132's gate cycle buys a measured render plan, not only time spent waiting.
- **What survives:**
  - Android reaches "an adopter's app builds" (D3) one gate cycle later than it could.
  - There is a small fork, and it is Peter's. Either (a) Android's packaging unit ships in 129 and the platforms go uneven, or (b) both platforms ship it together in 132, which is my lean: one support claim, one CHANGELOG line, one public-API promise per release.

  I do not think it is worth his attention unless 132 is placed after 131 (§ 5 item 3 (y)). Then the delay is two cycles, and (a) becomes worth asking.

**C (one spec with declared units)** fails on Android for the reason Thurgood gives: the render unit would have to be planned in 129's tasks before anyone knows whether the emulator runs on a free runner.

---

### 2. Android's rows: work package, order, size, instrument

**WP2 (harness), Android.** Right as written: one Gradle library module compiling both tiers in one compile, plus a probe module, reading the packed install in place (Data R3).
- **One correction to § 1's "Android at least 423".** In an adopter-shaped run against the consumer's own generated `ComponentTokens`, the component tier has **440** errors. The extra errors are the package's component token enums (`AvatarTokens`, `ButtonIconTokens` and others) missing from consumer output (VERIFIED, R3). So the floor is 440 for the input the harness will actually use.

**WP4 (packaging), Android.** The direction is right, but the Gradle shape needs to be stated. There are two shapes, and the plan's wording ("`init` writes … the Android Gradle module include") fits both:
- **(a) The package ships the module's build script.** It would live at something like `node_modules/@3fn/core/android/build.gradle.kts`, and `init` writes only two lines into the adopter's `settings.gradle.kts` (an `include` and a `projectDir` pointing into `node_modules`), plus one Gradle property naming the generated-tokens directory. **Precedent**: this is how React Native libraries ship Android code from `node_modules` (REASONING, training data). `npm update` then updates the build script along with the sources. This is the distribution charter's own "Gradle source module … shipped in the tarball" (VERIFIED, charter L29).
- **(b) `init` writes the whole build script into the adopter's tree.** That is what my R3 probe did. The script then drifts from the package on every update and needs a re-sync. That is the copy-with-no-update-path class the charter rejects (L34).
- **I recommend (a).** It adds one cost the plan does not name. A shipped build script applies `com.android.library` and the Compose plugin, but **the adopter's build chooses the AGP, Kotlin and Compose versions**, not ours: Gradle picks one version of each across the whole build (REASONING). So the harness pins become a **supported range** we promise, and D3 should build the fixture app at the bottom and the top of that range. That range is a consumer-facing promise; see § 4.
- **Size.**
  - About 1 session for (a) plus the `init` lines and the `README.md` move (my R3 estimate holds; REASONING).
  - The fixture app constructing all 34 components: **about one more session**. There are 31 `@Preview` functions, all public, across 20 component files (VERIFIED, grep); they could be the fixture's screens and cut the writing. But previews are our sample code, not adopter-shaped calls, so they do not count toward D5.
  - The emulator lane: about 1–1.5 sessions **if** the probe shows the free runner can run it (REASONING).

**WP5 (render and behaviour), Android.** The plan lists Robolectric and the emulator as one undecided tool choice. They are two different oracles:

| | Robolectric + Compose UI test (`createComposeRule`) on the JVM | Emulator + instrumented test (`connectedDebugAndroidTest`) on the fixture app |
|---|---|---|
| Runs on | any ubuntu runner, no emulator (REASONING) | ubuntu **only if** KVM acceleration is available to this repo (**UNVERIFIED**); otherwise a larger, billed runner |
| Proves | composition, layout sizes, the semantics tree (labels, roles, `stateDescription`), click and key input, touch-target size asserts | that the APK installs and runs on real Android, with real drawing, a merged manifest and resources, and real runtime API levels |
| Does not prove | that it is the app: Android's framework is simulated in the JVM, with no real drawing pipeline unless Robolectric's native graphics mode is on (REASONING), and no APK | anything you cannot reach from a test |
| Speed and flakiness | seconds per class; deterministic (REASONING) | system-image download (about 1 GB, cacheable) plus a 1–3 minute boot; the flakiest step in Android CI (REASONING) |
| **Use for** | **D5: the bulk of the 214 Android contract tests** | **D4: one render smoke test per component, in the app** |

- **Answer to [@DATA] from [THURGOOD PLAN R1]**: "Can the D4 lane run an emulator on the standard `ubuntu-24.04` runner, or is Robolectric the honest ceiling there?"
  - **I cannot say yet; the probe in § 1 answers it.**
  - VERIFIED from the `ubuntu-24.04` readme I fetched in R2: the image preinstalls the Android SDK platforms and build-tools, but its Android table lists **no Emulator and no system images**. So each run downloads them, or restores them from cache.
  - The `macos-26` readme does list "Android Emulator 37.2.12" (VERIFIED, `kenya-work/m26.md` L240). My training data says Apple-silicon macOS runners do not support nested virtualisation, so it would not boot (REASONING).
  - My recollection is that GitHub's standard Linux runners for public repos expose KVM after a udev rule. That is REASONING, not checked, and it is exactly what the probe settles.
  - **Robolectric is not the honest ceiling for "renders in the app".** It is a good oracle, but for "renders in a simulated Android in the JVM". If the emulator is unavailable on free runners, the honest options are:
    1. a billed larger runner, which is Peter's call (§ 5 item 5);
    2. D4 on Android labelled "renders under Robolectric", a lower evidence kind under D6. Then "done" on Android does not meet Peter's "in the app" until (1) happens.
- **Order.** Robolectric can start as soon as the components compile, without waiting for WP4: the tests run in the library module. The emulator lane waits for WP4's fixture app. So the plan's "WP5 depends on WP4" is true for D4 only. D5 can start at WP3's end.

**Answer to [@KENYA] [@DATA] from [THURGOOD PLAN R1]**: "Do you take the distribution charter as the goal's home until 132 exists, with the re-rule in § 3 B2? Do your packaging sizes … hold if D3 adds a fixture app that constructs all 34 components?"
- **Yes, the charter is the goal's home.** I co-own it, and the re-rule discharges the lapse in § 7.
- **Packaging stays about 1 session on Android.** The fixture app adds about 1 more, and the emulator lane about 1–1.5 if the probe passes. All REASONING.

---

### 3. Definition of done, row by row (Android)

| Row | Does it prove Peter's words on Android, with a non-model oracle? | What is missing |
|---|---|---|
| **D1** | Yes. A Kotlin compile is the oracle | — |
| **D2** | Yes, for "compiles" | Make the input the **consumer's** generated `ComponentTokens` (the 440 floor), not the repo's |
| **D3** | Mostly. `assembleDebug` on a `com.android.application` fixture proves resources, manifest merge and dexing, and the byte-identical anti-copy check is a good oracle | **(1) Lint `NewApi` as an error.** Without it, a call above `minSdk` compiles and crashes on older phones. Example: `InputCheckboxLegal.android.kt` L242 calls `DateTimeFormatter.ISO_INSTANT.format(Instant.now())` unguarded (VERIFIED), and `java.time` needs API 26 (REASONING). A compile cannot see this; lint can. **(2) Build at the bottom and top of the supported AGP, Kotlin and Compose range** (§ 2 WP4) |
| **D4** | Only on an emulator. "Renders in the app" needs the APK running on real Android | **(1) Render under every theme the fixture consumer declares** (light, dark, wcag). Item (i) is about theming, and one theme does not prove it. **(2) A decorative exception.** Some components may carry no accessibility node on purpose; D4's "an accessibility element" should read "an accessibility element, or a contract that declares the component decorative". **(3) The Android twin of § 5 item 1 (a)**: run on the minimum API level's emulator image, a current one, or both (§ 4) |
| **D5** | Yes, as a check: either a passing test id, a `device-read` label, or an exclusion | **Which tool counts as "a passing test" per platform.** I propose Robolectric tests count for semantics, input and layout contracts, and the emulator for anything about drawing. Otherwise D5 can be satisfied by the weakest tool |
| **D6** | Yes | The evidence kinds should name the tool: "renders (emulator)" vs "renders (Robolectric)" |

**TalkBack** (§ 5 item 1 (b)): I recommend **a labelled evidence kind outside "done"**, with these inside it:
- the semantics tests (D5);
- **Android's Accessibility Test Framework checks**, which run in Compose UI tests and flag missing labels, small touch targets and low contrast. Their availability in the pinned `ui-test` version is REASONING and UNVERIFIED.

The reasons:
- What TalkBack speaks varies by TalkBack version, phone maker and language. No stable machine oracle exists for it (REASONING).
- A device read done by an agent is not a non-model oracle.
- A device read done by a person each release does not scale: 34 components × 2 platforms × every release.
- I would still record **one device read per component at the release that first claims native support**, as dated evidence, not as a gate.

---

### 4. Peter's decision list (§ 5)

- **Item 4, the Android minimum: right that it is his. Here are the facts it needs, and one addition.**

  **Facts:**
  - **The Compose floor today is API 23 (Android 6.0).** The cached libraries resolved under BOM 2026.09.00 declare `minSdkVersion="23"` for `ui`, `foundation`, `runtime`, `animation` and `material-ripple`; `material3` declares 21, and `coil-compose` and `colormath` declare 21 (VERIFIED, read from the cached AAR manifests). A lower `minSdk` fails the manifest merge (REASONING).
  - **The floor moves.** androidx raises it over time (REASONING), so the policy is "the higher of Peter's number and Compose's floor".
  - **API 26 (Android 8.0) is a natural candidate.** `InputCheckboxLegal` L242 uses `java.time` with no version guard (VERIFIED). Below 26, every adopter must turn on core-library desugaring, or we change the code (REASONING on the level).
  - **Other version-sensitive calls are guarded.** For example, `ButtonVerticalListSet` checks `SDK_INT` before `VibratorManager`, which is API 31 (VERIFIED, L265 and L274).
  - **The repo's own default is 24.** In R1 I read `minSdk 24` as the default in `ConfigHelpers`, with a stated floor of 21 (not re-checked). A floor of 21 is already below what Compose accepts.

  **The options**, each with what it costs:
  - **23**: the lowest Compose allows. Adopters must enable desugaring, or Lina guards L242.
  - **24**: the repo's current default. Same desugaring cost.
  - **26**: no desugaring. It drops Android 6 and 7, about 2016-era phones. My recollection, from training data and not checked, is that 26 and above covers well over 90% of active devices.

  I lean 26. The pick is his.

  **The addition: a supported AGP, Kotlin and Compose range** (§ 2 WP4). A shipped Gradle module makes that range a promise to adopters, just as `minSdk` is. I would put it beside the minimum: the team proposes the numbers, and he approves them as one item.
- **Missing, and his: the Android twin of item 1 (a).**
  - Does D4 run on the minimum API level's emulator image, a current one, or both? Running both doubles the emulator cost.
  - The minimum-level run is the only runtime proof of the floor; lint (D3) is the static proof.
  - I lean "a current image per PR, the minimum image at unit PRs and CLOSEOUT", which is a cost the team can set once he approves the principle. For iOS, Kenya reported that the runner has no iOS 17 runtime; for Android, any system-image level can be downloaded (REASONING), so the question is cost, not availability.
- **Item 5 (runner class): its Android half waits on the probe.** If KVM works on `ubuntu-24.04`, there is nothing for Peter here. If it does not, the billed-runner question is his.
- **Nothing on the list is the team's.** The tool split (Robolectric vs emulator), the probe and the fixture-app shape are already listed as the team's, which is right.

---

### 5. The § 7 findings that touch me

- **The lapsed trigger: confirmed.**
  - The distribution charter's last commit is `076e947da` (2026-10-20 18:51 −0400, the issues walk).
  - The harness charter's evaluation entry merged after it, at `d7385b4c2` (2026-10-21, #433).
  - The distribution charter fires on "any evaluation of the harness charter" (L8), and it has had no evaluation or re-rule since (VERIFIED, `git log` on both paths).
  - Kenya and I owe it. The B2 re-rule discharges it, and I would add the render probe to that re-rule (§ 1).
- **"That charter's iOS premises are partly superseded"**: Kenya's half, not mine to judge.
- **The Android half of the charter still holds.**
  - L29's shipped Gradle source module is my recommended shape (a).
  - "res relocation" is the `README.md` move.
  - "A tokens-module dependency shape" has an answer: one module compiling the package's sources and the consumer's generated tokens together (VERIFIED, R3).
  - **Wrong now**: "~37 production files" for a `CompositionLocal` re-architecture is only relevant if an AAR is reconsidered. B2 does not do that, so I leave the line.
  - **Stale**: the cost class "days to about a week" was written before the fixture app and the emulator lane joined the scope. It needs restating at the re-rule.

---

### 6. Directed questions

None. My answers above do not depend on another seat's.
