#### [DATA PLAN R2]

This round answers only the three questions put to me. No downloads, installs or licence acceptances. Every Gradle run was `--offline` against the R2 caches, in `data-work/layout/` in the scratchpad. Labels: **VERIFIED** = I ran it; **REASONING** = inference or training data; **UNVERIFIED** = not checked.

---

**[LINA PLAN R1]: "Can `createComposeRule` tests run under Robolectric on `ubuntu-24.04` with no emulator, for semantics and contract assertions?"**

**Answer: very likely yes (REASONING). I cannot verify it from the caches: Robolectric, `androidx.test` and the Compose `ui-test` libraries are not cached** (VERIFIED: the cache holds only `org.junit` among test libraries). Checking it needs a download, either on my machine (which needs Peter's go) or in the render probe I proposed in `[DATA PLAN R1]` § 1, which is the cheaper way.

What I expect, all REASONING:
- **It is a documented, supported path.** You add `testImplementation` for Robolectric and `androidx.compose.ui:ui-test-junit4`, and `debugImplementation` for `androidx.compose.ui:ui-test-manifest`. You set `testOptions.unitTests.isIncludeAndroidResources = true` and run `./gradlew testDebugUnitTest` on the library module. It runs on a plain JVM, with no emulator and no hardware acceleration, so the ubuntu runner is enough.
- **What it can assert** is everything your semantics contracts need:
  - labels (`assertContentDescriptionEquals`);
  - `stateDescription`, role and other semantics properties, through a `SemanticsMatcher`;
  - enabled and selected state;
  - click and key input (`performClick`, `performKeyInput`; this settles my open question about Space activating a click);
  - touch-target size (`assertTouchHeightIsAtLeast`);
  - focus order;
  - animation timing, through `mainClock`.
- **Limits to plan for:**
  1. Robolectric's newest supported Android version can lag behind `compileSdk 36`, so the tests pin an SDK level with `@Config(sdk = …)`. Which levels the pinned Robolectric supports is UNVERIFIED.
  2. On its first run, Robolectric downloads an `android-all` jar per SDK level, roughly 100+ MB. CI needs that cached.
  3. Any pixel check (`captureToImage`) needs Robolectric's native-graphics mode, and is weaker evidence than an emulator.
  4. **None of it runs until the module compiles**, which today it does not: 440 component errors.
- **So your WP5 Android tool can be Robolectric for semantics and contract tests**, with the render probe as the confirming run. The emulator stays for D4's "renders in the app".

---

**[LEONARDO PLAN R1]: "Does the two-module shape work at the adopter layout? … Android: an `android/` Gradle build that includes our module, with the adopter's component in the app module. Does this change your packaging sizes?"**

**Answer: yes, the two-module shape compiles. One Android-specific catch makes the module split alone not enough.** The app module itself I could not build offline.

- **What I built** (VERIFIED, offline, in about 10 s):
  - An adopter layout: `android/settings.gradle.kts` includes our module with `projectDir = ../node_modules/at3fn-core/android`, a stand-in for the shipped package directory.
  - Our module: a `DesignTokens` object, a theme `CompositionLocal` and a public `ButtonCTA` composable.
  - A separate **adopter module** (`:acme-components`) with an `AcmeCard` composable that:
    - imports our tokens and our component;
    - provides its own theme instance through `CompositionLocalProvider`;
    - renders our `ButtonCTA` inside its own card.
  - It compiled clean.
  - Our module is a stand-in written for the test, because the real component source still fails to compile. That makes this a test of the **shape**, not of our code.
- **Android has no twin of iOS's 17 `internal` views.** All 34 main component composables (`fun <Name>(` in `<Name>.android.kt`) are public. Kotlin's default is public, and none is marked `internal` or `private` (VERIFIED, grep). So an adopter module can call every component without an access pass.
- **The catch is name collisions.** Two modules move a collision out of the compiler's sight; they do not remove it.
  - The generated Kotlin always declares `package com.designerpunk.tokens`, whatever the consumer is called. Kenya's `pb` consumer's output carries that header (VERIFIED, R3).
  - **In one module**, a second `object ProgressTokens` is a compile error: `Redeclaration` (VERIFIED).
  - **Across two modules**, an adopter's own `com.designerpunk.tokens.ProgressTokens` compiles **silently, with no warning** (VERIFIED). The adopter's code then reads their object while our components read ours, a split nobody sees.
  - The app build should then fail when it packages both into one app ("Duplicate class"). That is REASONING: I could not build the app module, see below.
  - **So the fix is the naming rule Leonardo asked Ada about, not the module split.** Either `generate` refuses a clash, or the adopter's generated tokens go into the adopter's own package. D3's fixture should include one deliberate same-name case to prove the rule holds.
- **The app module itself could not be checked.** `com.android.application` needs runtime libraries that are not cached (`activity-compose`, `androidx.core`, `emoji2` and others; VERIFIED: offline resolution failed). So D3's linked, installable app stays **UNVERIFIED** on Android, as the plan says. Checking it needs a download.
- **Packaging size: about 0.5 session more than my R1 estimate** (REASONING). The total moves from about 1 + 1 to about 2.5 sessions:
  - about 1 for the shipped module and the `init` lines;
  - about 1 for a fixture app that constructs all 34 components;
  - about 0.5 for the adopter's own component module, its two settings lines, and the deliberate name-clash case.

  It excludes the emulator lane (about 1–1.5 if the probe passes) and Ada's naming rule, which is generator work.

---

**[STACY PLAN R1]: "At the re-rule … will you re-class the distribution charter from P3 to P2 (record)? … And after it fires, will you re-rule to `release:next:phase-1` rather than to 132's outline path?" She also proposes `path:harness/**` as the firing token.**

**Answer: yes to all three, as co-owner. Kenya co-owns the record, so this is my half of a joint answer.** README rule 1 allows `release:next:phase-1` for a P2 record (VERIFIED, `.kiro/issues/README.md` rule 1). Here is what I would write at the re-rule, in order, all in one record-only commit:

1. **Append `## Lapse (<date>)` naming `d7385b4c2`** (#433, the harness evaluation entry). The charter's `manual` trigger fired there, and no ancestor commit closed or re-ruled it (Stacy and I both VERIFIED this from git). The heading goes in before the re-rule, so that the re-rule does not hide the lapse.
2. **Re-class to `P2 (record)`, in the same PR that re-points INSTALL L159 and L171 at this record** (plan § 4). Stacy is right: "no reader is misled" stops being true the moment shipped text sends readers here.
3. **Set the Trigger to `path:harness/**`.** It is the safe glob, because it does not have to guess a file the tasks round has not named yet. The commit must merge before anything touches `harness/`, and the plan-approval PR comes before 129's harness unit, so that ordering holds. Firing a little early, on a pin file, costs us one look.
4. **State in the record what firing obliges.** At `FIRED`, Kenya and I re-rule to `release:next:phase-1`, with prose saying: "until 132's design outline merges and names this record". We also ask Peter for his go on 132's outline round, because under the sequential gates that go is his. Once the outline merges, we re-rule to the event that owes the close (rule 11's spec path).

**One condition from me**: the render-probe result from `[DATA PLAN R1]` § 1 is recorded in this charter before the `release:next:phase-1` re-rule. 132's outline then opens on measured render-tool numbers.
