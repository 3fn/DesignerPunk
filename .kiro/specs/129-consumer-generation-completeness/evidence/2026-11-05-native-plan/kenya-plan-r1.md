#### [KENYA PLAN R1]

I read `plan-draft-r1.md` in full, Peter's words of 2026-11-05, and the distribution charter at `origin/main` `5c48f3ccb`.

Labels:
- **VERIFIED** means I ran it today, 2026-11-04, on this machine (Xcode 26.0.1, Swift 6.2, iOS 26.0 simulator runtime, iPhone 17 simulator).
- **READ** means I read it in a file or one of the runner-image readmes I fetched in round 1. Nothing was downloaded this round.
- **UNVERIFIED** means it comes from reasoning or training data.

All runs reused `kenya-work/` with small toy packages. No component source compiles yet, so nothing below ran a DesignerPunk component.

---

### Plain language first (for Peter)

- **I agree with two specs under one goal (B2).** It is the right shape for iOS, with one addition: test the iOS render tools before Spec 132 is written, not inside it.
- **"Renders in the app" needs a real app on iOS, not a shortcut.** Three of the four cheap ways to check rendering gave wrong answers in my tests:
  - Drawing a component off-screen showed a yellow "can't draw this" box for a text field and a switch. That box counted as rendered.
  - A scrolling view drew blank. That counted as not rendered when it was.
  - Measuring size passed a component that draws nothing.
- **What did work, and how to do it:**
  - An app with no Xcode project file built, launched on a simulator and rendered, in about 12 seconds.
  - The honest check is UI tests in such an app: tap, read the accessibility tree, take a screenshot of each component.
  - That needs one Xcode project kept in the repo, for the UI-test target.
- **VoiceOver speech cannot be a "done" check.** No machine oracle exists for it. No agent can hear it. As far as I know (UNVERIFIED), the simulator has no VoiceOver.
  - What VoiceOver reads (labels, values, traits) can be tested, and that belongs inside "done".
  - What it actually says aloud should be a labelled human device read, outside "done".
- **The iOS 17 question is real but not urgent.**
  - Neither free macOS runner has an iOS 17 simulator. The oldest available is iOS 18.5, on the `macos-15` image.
  - The compiler already enforces the 17.0 floor for API use.
  - The team should measure what a 17 runtime would cost before Peter rules.

---

**1. Structure: B2, with one addition.**

**Why B2, from iOS:**
- Every iOS render and behaviour check needs the components to compile and be constructible from another module. Today neither is true:
  - About 200 component errors (R2).
  - 20 of the 39 main views cannot be constructed from an app (finding A, § 2).
- I cannot write honest requirements for the UI-test lanes until the harness shows what the repair actually is.
- Splitting at the harness's first committed run is where my side's evidence changes.

**Counter-argument, folded back first.**
- Most of the render tools do not depend on the repair; I just tested most of them on toys. So waiting for the first harness run to design WP5 wastes time, and option C, one spec with units, could have planned the render unit now.
- **What it changed:** I propose a small **render-tool spike** before 132's outline opens. It is appended to the harness charter as an evaluation entry, not a spec task. It would measure three things:
  - an XCUITest fixture app in a committed `.xcodeproj`, with `performAccessibilityAudit`;
  - an element-screenshot "ink" check;
  - one dispatched CI run of an iOS 17 runtime download.

  Then 132 opens on measured repair size *and* measured tools, so its WP5 round is about decisions, not discovery.
- **The residual that survives:**
  - Two closeouts before Peter's goal is done.
  - "Do not start an iOS product" stays printed through 129.
  - The dominant cost is unchanged whichever structure is picked: 214 iOS contracts, of which 2 components have tests today.

**Not a better shape.** I looked for one: C with a render unit planned now. It fails for the reason Thurgood gives. On iOS, the UI-test unit's size depends on the public-API pass, and that pass's size depends on the first run.

---

**2. My domain's rows (WP2, WP4, WP5, iOS)**

**WP2, the compile harness: right as written.** About one session for iOS (R2), using `-wmo -c`, two verdicts, and a probe module.

**WP4, public API and packaging: the access pass is larger than "17 internal views".**

- **Finding A (VERIFIED, by grep over the 16.2.0 package).** Three main views are `public struct` but have no public initialiser, so an app cannot construct them:
  - `VerticalListButtonItem` has no explicit `init`. Swift's automatic one for a public struct is internal.
  - `NavSegmentedChoiceBase` has only an internal `init`.
  - `NavTabBarBase` has two `init`s, both internal.
- So **20 of 39** main views are unconstructible from an app module (17 + 3), not 17. On top of that, every type in an initialiser's signature (size and variant enums, item models) must also be `public`. I did not check those (UNVERIFIED), so 20 is a floor.
- **Packaging size: iOS about 1–1.5 sessions (R3) holds for the package shape.** If D3 constructs all 34 components, two more items apply:
  - **The fixture screens: about 1 session** (REASONING). Each component needs valid arguments: bindings, content closures for the generic containers, and image URLs for the Avatar. This waits on the access pass.
  - **The app shell.** VERIFIED: an app built from a `.swiftpm` manifest alone (AppleProductTypes `.iOSApplication`, no `.xcodeproj`):
    - `xcodebuild` builds it on Xcode 26.0.1;
    - it installs and launches on an iPhone 17 simulator (iOS 26.0) and renders;
    - booting through to a screenshot took about 12 s;
    - **it is enough for D3's "an app builds".**
  - It is not enough for D4. As far as I know (UNVERIFIED), SwiftPM and AppleProductTypes have no UI-test target type. So D4 needs one committed `.xcodeproj` with an app target and a UI-test target, and D3 should build that same project, so there is one fixture, not two.
  - Writing a `.xcodeproj` without the Xcode GUI means either a hand-written project file (fragile across Xcode upgrades) or a third-party generator such as XcodeGen (a pinned dependency). Neither is verified. It is a tool choice for the team. About 0.5–1 session (REASONING).

**WP5, render and behaviour: the oracle has to be in-app UI tests. Two cheaper paths are ruled out by measurement.**

| Path | Result (VERIFIED, toy package, iOS 26.0 simulator) | Fit for D4 |
|---|---|---|
| Off-screen `ImageRenderer` plus a pixel count | Correct for plain SwiftUI: a button drew 2745 opaque pixels, an empty view drew nothing, a clear view drew 0. **Wrong for UIKit-backed controls**: `TextField` and the `Toggle` switch drew a yellow "unsupported" placeholder (`e11/tf.png`, `e11/toggle.png`), which counts as ink, so it is a false pass. `ScrollView` content drew 0 ink, a false fail | **No.** The `Input-Text-*` family, checkbox and radio controls, and anything in a scroll view would read wrong |
| Size from `sizeThatFits` | A view that draws nothing (`EmptyView`) reported the full 390×844 proposal | **No.** "Non-zero frame" is not a render oracle |
| An on-screen window inside a package's XCTest | No window scene exists in a hostless test (`connectedScenes` was empty). The capture was blank | **No** |
| A real app on the simulator | Builds, launches and renders (above). XCUITest inside it is UNVERIFIED here: it needs the `.xcodeproj` | **Yes, this is the path** |

- **Also VERIFIED:** walking SwiftUI's accessibility tree from inside the process returned **zero elements** for a button that has a label and a hint. So the semantics checks (label, value, traits) need XCUITest's out-of-process query.
- That is one more reason the app, with its UI-test target, is the D4 and D5 instrument.

**How the 214 iOS contracts split by category** (VERIFIED, from every `contracts.yaml` on `origin/main`; the instrument column is REASONING):

| Category | Count | Instrument |
|---|---|---|
| interaction | 49 | XCUITest: tap or type, then assert state |
| state | 21 | XCUITest |
| content | 20 | XCUITest |
| validation | 14 | XCUITest |
| layout | 9 | XCUITest |
| composition | 7 | XCUITest |
| accessibility | 42 | XCUITest semantics (label, value, traits, identifier) plus `performAccessibilityAudit` (iOS 17+, UNVERIFIED in this run). What is *spoken* is a labelled device read |
| visual | 43 | Element screenshots sampled against the token's resolved colour, within the tolerance Product-Token-Governance gives for colour. A snapshot golden is regression only (Thurgood is right) |
| animation | 9 | Hard to time in XCUITest. Reduce-motion compliance is testable with a launch argument. Most will be excluded with a reason, or labelled |

- About 120 contracts can be decided by XCUITest directly.
- **WP5 on iOS stays unsized**, but this table is the start of its sizing.

---

**3. Definition of done (iOS)**

| Row | Proves Peter's words on iOS? | Correction |
|---|---|---|
| D1 | Yes, with a non-model oracle | Must be a compile (`-wmo -c`), not a bare typecheck (R2). The draft already has this |
| D2 | Yes | None |
| D3 | Yes. It also closes my Q5 residual, because an app build **links**, and the R2 lane did not | The fixture app must use a **plain** `import` of the package. A `@testable` import hides `internal` (R2, VERIFIED), which would hide finding A and row 9. Deployment target 17.0 |
| D4 | **Not as worded.** "Non-zero frame and an accessibility element" passed an empty view in my test | Make it: in XCUITest, the element exists by its identifier; its frame is non-zero; its element screenshot has ink different from the background; no crash. Run it under each emitted theme (light, dark, WCAG): the charter says "themed", and D4 is the only row that can show a theme renders. Off-screen rendering is out (measured above). Label the runtime: "renders on iOS 26.x" |
| D5 | Yes, as a coverage check | A `device-read` entry must name a **human** reader, the device and the iOS version. An agent cannot perform one. Add one blanket check: `performAccessibilityAudit` on every fixture screen, which catches missing labels, small hit areas and contrast |
| D6 | Yes | Use evidence kinds that match what was actually run: `builds`, `renders (iOS 26.x)`, `contract-tested`, `semantics-tested`, `device-read (human)` |

**What is missing:**
- **Dynamic Type.** Some accessibility contracts depend on text size. XCUITest can launch at the largest size with a launch argument (UNVERIFIED in this run). It belongs in D4's variants with the themes.
- **The look across iOS versions.** UNVERIFIED, from training data: iOS 26's SDK restyles system controls (Liquid Glass), and an app can opt out with an Info.plist key. Components built on `TextField`, `Toggle` or navigation containers will look different on 26 than on 17. D4 proves "renders". It does not prove the look matches across versions. See my question to Leonardo.

---

**4. Peter's decision list (§ 5)**

- **1(a), the iOS runtime: his, but framed wrong.**
  - READ: the oldest simulator on a free runner is **iOS 18.5**, on `macos-15` (image 20261028), which comes with Xcode 16.4. `macos-26` carries 26.2, 26.4 and 26.5. My machine has 26.0.
  - The `macos-14` image, the one with iOS 17, was retired on 2 November 2026 (runner-images README).
  - So "also run on an iOS 17 runtime" means a per-run download (`xcodebuild -downloadPlatform`). Its size, its time, and whether Xcode 26 can run an iOS 17 runtime are all UNVERIFIED.
  - The real question for Peter: **does "iOS 17.0+" (Core Goals) stay the minimum when runtime evidence starts at 18.5 or 26?** The options:
    - 17 is proven by the compile only;
    - pay for a 17 runtime at release time;
    - revisit the minimum.
  - The team brings the measured cost from the spike (§ 1) before he rules.
- **1(b), VoiceOver: his, and the team should recommend.**
  - My recommendation: semantics tests and the accessibility audit inside "done", and spoken output as a labelled `device-read (human)` outside it.
  - Reason: Peter's aim rests autonomy on non-model oracles, and no oracle exists for speech.
  - What survives: my open question from round 1, on I1 (whether `.isToggle` is the right trait for a three-state checkbox), stays a human read.
- **Item 6, required-check count:** team-owned arithmetic. Peter's act is each promotion, and the draft already says so.
- **Missing, and his:** none beyond reframing 1(a).

---

**5. The § 7 findings (they touch me)**

- **The lapsed trigger: confirmed.**
  - I set this charter's Trigger on 2026-10-20 to fire at "any evaluation of the harness charter".
  - My own 2026-10-20 evaluation entry was that evaluation, and I did not evaluate or re-rule this charter after it.
  - Q5 and this plan are later evaluations. I accept the re-rule § 3 B2 proposes, done jointly with Data: Peter's words appended, D1–D6 added, Trigger set to `path:` on the harness's first committed expected-failure list.
- **The 17 internal views are a duplicate: confirmed.** The charter's "access-control pass (only 19 of 39 production files currently declare `public` types)" already carries them.
  - Lina should not file a new record.
  - In the re-rule I append finding A (the three public views with no public `init`), so the pass is sized as 20+ views, not 19 files.
- **The charter's superseded iOS premises: confirmed.** Two lines are superseded by the root manifest, which compiles the adopter's tokens and the packaged components in one module from `node_modules` (R3, VERIFIED):
  - "an SPM library cannot see the consumer app target's generated `DesignTokens`";
  - "SPM resolves from a git URL or tag, not from npm".

  The theme-name problem (Q12) is still real, because the components hard-code `dpTheme`. The re-rule rewrites those two lines and keeps the access pass and the `.xcframework` ruling.

---

**6. Directed questions**

- [@LEONARDO] On iOS 26 the system controls inside our components restyle themselves; an app can opt out with an Info.plist key (UNVERIFIED, training data). Does "as described" include the look matching across iOS versions, or only that the component renders and meets its contracts? If the look counts, D4 needs a 17 or 18 runtime and visual contracts that are checked per runtime, and that changes my sizing of § 4's 1(a) and WP5. -- [KENYA PLAN R1]
