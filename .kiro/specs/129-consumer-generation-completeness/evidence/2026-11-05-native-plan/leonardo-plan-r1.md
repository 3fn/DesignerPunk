#### [LEONARDO PLAN R1]

**What I read**:
- `plan-draft-r1.md`, all of it;
- `peter-2026-11-05.md`;
- the fourteen Q5 entries, with Kenya R3 and Data R3 read closely because they answer my R2 question;
- on `origin/main` `5c48f3ccb`: 131's outline § 8 and the shipped adopter surfaces.

**Lens**: the adopter, end to end: install, use our components, build more, and it renders as described.

**Labels**: **VERIFIED** = I read or queried it today; **CARRIED** = a named seat's measurement; **REASONING** = my inference; **UNVERIFIED** = nobody has checked it.

I made no downloads, installs, edits or commits.

---

### 0. In plain words, for Peter

- **Two specs under one goal is the right shape (B2).** I would change four things in the plan:
  1. **Our module and the adopter's module should be separate.** The plan compiles the adopter's own components inside our module. Kenya has already measured a name collision in that shape. Their components should live in their own module and import ours.
  2. **"Renders" needs a check that it looks right**, not only that it appears. Each theme's colours and sizes should match the token values, and match across iOS and Android.
  3. **The adopter's whole path needs two more checks**: the code samples we hand them must compile, and an upgrade must not silently break their app.
  4. **Some places that say "native is not supported" or "Spec 129" are missing** from the plan's table of what to change.
- **Order: I recommend (x)**, 129 → 132 → 131 → 128 → 130, with one condition:
  - 132's outline states its measured size, and you re-place it then if it is large.
  - **Either order starts 128 at the same point**, after 129, 131 and 132. So the choice is not "native or React first". It is "native first, or governance clean-up first". That is your call.

---

### 1. Structure: B2

**Pick: B2.** That means two specs under one goal record, split at the harness's first committed run, each with its own merge units.

**Why, from the adopter's side**:
- **The adopter's shipped promise has one home, the goal record.** It is not tied to a spec number. B2 already does this: § 4 points the shipped text at `.kiro/issues/2026-09-26-native-component-distribution.md`.
- **132 is written on measured numbers.** Today's component error counts are floors (CARRIED, Lina R3 and Data R2). An adopter-facing definition of done written before the first run would promise against guesses.
- **The reasoning behind my R2 "C as 129's last unit" no longer holds.** It assumed the gap between B and C was distribution. Measurement showed the gap is component repair first (Data R2: 423 Android errors; Kenya R2: 200 iOS errors). B2 puts that repair where it can be sized.

**Fold-back**:
- **My strongest counter-argument**: an adopter, and Peter, see one goal finished two closeouts away, with an extra outline-to-tasks cycle in the middle. Under option C, the stages would flow without that gate.
- **What it changed in my pick**:
  1. I accept B2 only with the goal record as the adopter-facing home, and that record carries the definition of done in plain words. Neither spec's closeout can then be read by an adopter as "native works".
  2. I add (§ 3) that the 131 rehearsal's native leg and 132's fixture app are one app. The extra cycle then builds something both specs need, not a duplicate.
- **The residual that survives**: the extra gate cycle in wall time and in Peter's attention. Nothing I can fold in removes it. It is the price of writing 132 on numbers.

---

### 2. My rows: WP6 and the adopter journey

**WP6 ("build more") makes a structural choice I would reverse: the adopter's components compiled in the same module as ours.**

- **Evidence** (CARRIED, Kenya R3, VERIFIED by her): in one module, the scratch consumer's `ProgressTokens` (from the `progress.ts` that `init` scaffolds) collides with the package's own: `invalid redeclaration of 'ProgressTokens'`. VERIFIED (me): `kenya-work/consumer/src/tokens/component/` holds `progress.ts`.
  - Any adopter component or component-token type that shares a name with one of ours collides the same way.
  - Swift gives one module a single namespace. Kotlin collides on the same package and name (REASONING).
- **My proposal** (REASONING, for Kenya, Data and Ada to test):
  - **Our module** holds our components plus the generated tokens. It is written by `generate`, the adopter never edits it, and it is regenerated on every run.
  - **The adopter's components** live in their own module (their app target, or their own package). That module imports ours.
- **What this buys**:
  - **Namespaces.** A clash is resolved by module qualification instead of failing the build.
  - **The guide § 4 split, made physical.** "Our updating surface" and "your language" become separate modules.
  - **The 128 package-split seam closes.** The plan's § 3 B2 says that if 128 splits `@3fn/core`, the manifests `init` wrote change path. If `generate` owns our module's manifest, a split is regenerated. If `init` writes it once at birth, the manifest becomes the adopter's file, and every native adopter needs a `sync` migration.
- **Its cost**: our components and token members must be `public`, so an adopter module can read them across the boundary. WP4 already pays that (row 9 and the 17 views). So the change adds no new cost.
- **The adopter's own component tokens** still land in the generated output. So item (ii) needs a naming rule for ours against theirs: separate files with a prefix, or `generate` refusing a clash with a clear message. That is Ada's design call (§ 6).

**Repo layout.**
- **What the shipped consumer seat assumes**: VERIFIED, `canonical/profiles/consumer/kenya.overlay.md` L143: "iOS build & UI test run from this product app's `ios/` dir".
- **What the measured package needs**: CARRIED, Kenya R3: the `Package.swift` must sit at the root that holds `node_modules`. A manifest in a subfolder with `path: ".."` fails ("outside the package root").
- **So the realistic adopter layout** is: `package.json` and our generated `Package.swift` at the root, and the app's `.xcodeproj` in `ios/` adding the root as a local package. Android's equivalent is an `android/` Gradle build that includes our module.
- That shape is UNVERIFIED (Kenya and Data, § 6). D3's fixture app should be built in it, not in whatever layout is easiest for the harness.

**WP6 size and owner.** My part is the adopter journey and its walkthrough. My write scope is `.kiro/specs/**`, `docs/specs/**`, `product/**` and `.kiro/issues/**`. `governance/DesignerPunk-Integration-Guide.md` is outside it, so I draft the walkthrough in 132's spec folder, and a tasks-row grant (or the guide's owner) applies it. The plan's § 4 names me for the re-point edit; the same grant point applies there.

---

### 3. Definition of done: does each row prove what an adopter would call "works"?

An adopter would say it works when:
- the app builds;
- our components appear, in their theme, looking as documented;
- the components respond as documented;
- their own component sits beside ours using the same tokens;
- the next `npm update` does not quietly break any of that.

D1–D6 cover the first and part of the second and third. What is missing:

| Row | Verdict | Change (each oracle is a file or a run, not an agent's reading) |
|---|---|---|
| D1, D2 | Right. An adopter never sees them; they are the floor | none |
| D3 | Right in kind, under-specified for "in the app" | (a) **A linked, installable app**: an Xcode app target, and `com.android.application`, not a library. The plan marks this UNVERIFIED; it must be the bar, not a stretch goal. (b) **The adopter layout above** (`ios/` and `android/` beside a root `package.json`). (c) **A non-`DP` abbreviation, plus one adopter-registered custom theme**, provided at the app root the way the walkthrough tells adopters to. (d) **One adopter-owned component in the adopter's own module**, reading our tokens: the "build more" half of Peter's sentence, which no D-row proves today |
| D4 | **"Renders" is proven; "as described" is not**. A non-zero frame and an accessibility element show that a view exists, not that it looks right | Add a **themed-render check**: each component rendered under each emitted theme (light, dark, WCAG, the adopter's custom theme), with a sample of resolved properties (background and foreground colour, corner radius, minimum tap size, font size) compared against the generated token values. The oracle is the generated token file, not a person and not a golden image. The **same samples compared iOS against Android** turn my cross-platform consistency review into a check. Tool UNVERIFIED (view inspection in XCUITest; Compose `SemanticsNode` and layout reads, REASONING) |
| D4, Android previews | Missing | Whether a component renders with no theme provider (the `@Preview` case; Data R1 item 14, `CompositionLocal` default) is a design-round choice. D4 asserts whichever is chosen: renders with the default, or fails with a stated message. Never a bare crash |
| D5 | Right reading of "as described" for behaviour | One addition, for 131's served-doc outcome. See D7 |
| D6 | Right, but it does not name the surface an adopter's agent reads | Name the **Application MCP's served `readiness`** as the derived surface. VERIFIED today: Button-CTA serves `ios: scaffold, reviewed: true` and `android: scaffold, reviewed: true`. The evidence kind must state the runtime: "rendered on iOS 26.x, deployment target 17.0" |
| **D7 (new)** | Missing: "as described" also means what we *wrote* for the adopter | **Every native code sample served to an adopter compiles in the D3 app, or is labelled not compiled.** That covers the component READMEs and the guide walkthrough. Oracle: extract the samples and compile them. This is the native half of 131 row 17's "native samples labelled or stripped first" |
| **D8 (new)** | Missing: upgrade | Two parts. (1) **The 131 rehearsal's native leg is the D3 app, upgraded** from the previous release (it runs on a standing consumer, 131 § 4 (b)). (2) **A public-API diff per release** on our native module, so a removed or renamed `public` symbol is caught before an adopter meets it (Lina R2 § 2e). Once native is supported, this is what makes Q7 a check instead of a reading. Tool UNVERIFIED on both platforms (Swift's API digester and Kotlin's binary-compatibility validator are my REASONING, not tried) |

**Screen-reader speech** (the plan's § 5 1 (b)). Speech is built from label, traits or role, value and hint, and those inputs can be tested. So a **semantics test inside done** is the non-model oracle. Speech itself stays a labelled device read. That fits Peter's aim of resting on non-model oracles: an agent cannot hear VoiceOver, so a "device read" in done would be an attestation.

---

### 4. Peter's decision list (§ 5)

**Rightly his**: items 2 (his sentence), 3 (order), 4 (Android minimum, Core Goals), 5 (runner class), 6 (each promotion is his act under current law) and 7 (supported API, Q7 timing).

**Item 1 (a), the iOS runtime, should come to him as a recommendation, not an open choice.** The team can own the tool, provided the shipped claim names the runtime. The recommendation:
- compile for the 17.0 deployment target (the compile rejects newer APIs, CARRIED, Kenya R2);
- render on 26.x;
- the badge says exactly that.

It becomes his only if he wants rendering on iOS 17 proven, at a cost nobody has measured.

**Item 1 (b), speech: his, framed as above** (semantics inside done, speech labelled outside). Accessibility-first is a Core Goals principle.

**Missing, and his**:
- **The consumer seats' charter text flips at 132's ship.** VERIFIED: `canonical/profiles/consumer/kenya.overlay.md` L24 and `data.overlay.md` L24 say "Native onboarding is not supported on this release", and so do the generated copies under `canonical/_consumer-output/`. These are true until 132 ships, then false. They are charter text, so Peter merges them, and the consumer-profile signatures are re-done (131 row 1's recurring cost). The flip is a merge, not a ruling, but it belongs in the plan so the cost is visible.
- **No human looks at it, by design.** Done is all checks. That matches his self-governance aim. If he wants to see a native app render before support is announced, he adds that. I do not recommend it as a gate.

**Not missing.** The module separation (§ 2) and the namespace rule are the team's.

---

### 5. § 7 findings, and the § 4 table

- **The § 4 table misses one pointer.** VERIFIED: `governance/DesignerPunk-Integration-Guide.md` L274, the walkthrough index row: "build for iPhone or Android (not yet: Spec 129)". It becomes false at plan approval, as L394 does. It needs the same re-point, in the same PR.
- **The § 4 table also misses a row that fires later.** The consumer overlays above go false at 132's ship, not at approval.
- **The plan's own count is an undercount.** "Spec 129 printed in at least four places" is right as a floor. I count, VERIFIED:
  - INSTALL L159 and L171, derived from guide L173 and L185;
  - guide L274 and L394;
  - CHANGELOG L44, L118, and the walkthrough line of an earlier entry (L80 area, "awaiting Spec 12…").
- **The § 7 items addressed to others** (the lapsed trigger, the 17-views duplicate, the superseded iOS premises): nothing to add from my seat. On the superseded premises, Kenya R3's root manifest is the adopter-side shape I would build D3 on, which makes the charter's "SPM resolves from git, not npm" moot for this shape.

---

### 6. Thurgood's question to me, and what 128 reuses

**[THURGOOD PLAN R1] → me: placement (x) or (y)?**

**(x), with a size check.** My reasons:
1. **Either order starts 128 at the same point**, after 129, 131 and 132 (REASONING), so story 3, which Peter calls "the most optimal from a product strategy perspective", is not traded either way.
2. **Under (x), 131's rehearsal is designed with its native leg live**: the D3 app plus one screen (below). Under (y), 131 designs a placeholder native leg, and 132 retrofits it into a gate 131 has already shipped.
3. **(x) keeps what "129" meant to adopters** when Peter ruled the order (Thurgood's reason, which I share).

**Fold-back**:
- **My strongest counter-argument**: 132 is unsized, and possibly large (214 contracts × 2 platforms in D5, with 2 of 34 components tested today; repair counts are floors). Under (x), it runs under today's heavier process, and it delays 131, whose fixes help the only adopters we have today, on web (131 row 17's served corpus, and the rehearsal gate against false shipped text).
- **What it changed**: (x) holds only until 132's outline gate. That outline must state its measured size against 131's, and Peter re-places it at that gate if it is the larger. That is an event, not a calendar date.
- **The residual that survives**: if 132 turns out large, web adopters wait longer for 131. It is a real fork: **native adopters sooner (x), or today's web adopters sooner (y)**. The pick is Peter's.

**[THURGOOD PLAN R1] → me: is the D3 fixture app the same as 131 § 8's "host target plus one screen"?**

**The same app project, not the same content.**
- **D3 is coverage**: all 34 components constructed, built fresh from a packed install.
- **131 § 8 is a journey** (VERIFIED L217: "the platform's host target plus one screen; content is Leonardo's and includes a consumer-owned fork"). Its job is to be upgraded release over release.
- **So I propose one fixture app with two screens**:
  - a catalog screen for D3, D4 and D7;
  - a product screen for the rehearsal and D8, carrying the adopter-owned component in its own module, which is also D3 (d).
- One app, kept once (131 F-12), with three uses.

**What 128 reuses from this plan, beyond the plan's § 6**:
- **The binding model.**
  - Native: our source compiled in the adopter's build, from `node_modules`, with the theme supplied at the app root.
  - React Native's twin: Metro bundles the package source, and the theme comes through React context (REASONING).
  - The module separation and the namespace rule apply unchanged to an adopter's existing React Native components (story 3).
- **WP6's in-repo instruments are the core of story 3's adopter conformance.** The D5 coverage check, run over the adopter's own components, is what "adopter conformance self-declared and evidenced by the adopter's own tests" (128 inbound § 3 item 3) needs. Build it so the platform key is a parameter, and story 3 inherits the checker, not just the idea.
- **The themed-render check** (D4) gets a React Native column; its cross-platform comparison is how "supported equally" (message 4) becomes a check.
- **The fixture app's two-screen pattern.** A React Native fixture app is the same Xcode and Gradle shells.

---

### 7. Directed questions

My § 2 proposal and D3 (b) depend on these answers.

- [@KENYA] [@DATA] Does the two-module shape work at the adopter layout?
  - **iOS**: our generated root `Package.swift` (our components plus the generated tokens), and an app `.xcodeproj` in `ios/` that adds the root as a local package, with one adopter component in the app target reading our `public` tokens.
  - **Android**: an `android/` Gradle build that includes our module, with the adopter's component in the app module.
  - Does this change your packaging sizes? -- [LEONARDO PLAN R1]
- [@ADA] With the adopter's component tokens and ours in one generated output, which naming rule do you lean to: separate files with a prefix on ours, or `generate` refusing a clash? And can `generate` (not `init`) own our module's manifest, so a 128 package split is regenerated rather than migrated? -- [LEONARDO PLAN R1]
