#### [KENYA PLAN R2]

These are answers only, to the three questions put to me. Labels:
- **VERIFIED** means I ran it today on this machine: Xcode 26.0.1, the iOS 26.0 simulator, a toy package in `kenya-work/e13/`.
- **UNVERIFIED** means reasoning or training data.

Nothing was downloaded. I could not run XCUITest, because that needs an `.xcodeproj` and there is none to reuse. Everything I say about XCUITest is therefore UNVERIFIED.

---

**[LINA PLAN R1] → [@KENYA]: can XCUITest find an `accessibilityHidden(true)` view? If not, what render check works for the three decorative Progress-Indicator primitives? And is ViewInspector acceptable as a test-only dependency?**

**1. XCUITest cannot find a hidden view, by design** (UNVERIFIED, training data).
- XCUITest queries the same accessibility tree VoiceOver reads, so a view hidden from VoiceOver is hidden from XCUITest too.
- That is the right behaviour for the contract. It means the render check has to come from somewhere else than the component's own element.

**2. The render check I want for the three primitives:**
- **The facts the choice rests on** (VERIFIED by grep over the 16.2.0 package):
  - All three primitives (Connector, Node, Label) carry `accessibilityHidden(true)`.
  - All three are plain SwiftUI. The only UIKit-backed view in any of them is a `ScrollView` inside the Node's preview, which is not shipped behaviour.
  - Plain SwiftUI is where off-screen drawing gave correct answers in my R1 measurement.
- **Render, in the app.** The fixture app wraps each primitive in a fixture-only container (`.accessibilityElement(children: .ignore)` plus an identifier). XCUITest then finds the wrapper, reads a non-zero frame, and checks that the wrapper's screenshot shows ink against the background (UNVERIFIED).
  - The wrapper belongs to the fixture, not the component, so it changes nothing an adopter gets.
- **The decorative contract, at the composed level.** Inside Progress-Stepper-Base and Progress-Stepper-Detailed, assert that the stepper exposes exactly the elements its contract names, and none for the nodes, connectors or labels (UNVERIFIED).
  - I would not assert "a container with zero children". SwiftUI may drop an empty container from the tree altogether, and then the test reads "nothing found" whether the contract holds or not.
- **A cheap pre-check while there is no app.** Off-screen `ImageRenderer` plus an ink count, in a package test. This is valid for these three because they are plain SwiftUI (R1: VERIFIED correct for plain SwiftUI, VERIFIED wrong for UIKit-backed views).
  - It is not D4's "in the app", so it is labelled as a pre-check and retired when the fixture app exists.

**3. ViewInspector: acceptable as a test-only dependency, with three conditions.** I agree with Lina that it is the team's call and not Peter's, because test targets never reach an adopter's build.
- **Pin an exact revision.** Its support for Xcode 26 and Swift 6.2 is UNVERIFIED; I could not download it to check.
  - It reads SwiftUI's internal view structure by reflection (training data), so an Xcode upgrade can break it until a new release ships.
  - Pinned, an upgrade breaks one PR. Unpinned, it breaks the gate.
- **Use it only for state, content, validation and layout contracts.** It inspects the views and modifiers as declared. It does not render, and it does not see the accessibility tree VoiceOver sees.
  - So an **accessibility** or **visual** contract is never accepted by ViewInspector alone. Those stay XCUITest: the element tree, the audit, element screenshots.
- **If its pin breaks on an Xcode bump and no fixed release exists, the tests it carries move to XCUITest.** We do not hold the toolchain back for a test library.
- What this gives Lina's sizing: a fast hostless tier for about 70 state, content, validation and layout contracts. The other contracts stay in XCUITest, which is slower and needs the app.
- Interaction contracts could go either way. ViewInspector can call a button's action. XCUITest taps the button on screen, which is what a person does. **I would keep interaction contracts in XCUITest.**

---

**[LEONARDO PLAN R1] → [@KENYA]: does the two-module shape work in the adopter layout (our generated root `Package.swift`, an app in `ios/` adding the root as a local package, one adopter component in the app reading our `public` tokens)? Does it change your packaging size?**

**1. Yes, it works** (VERIFIED, toy, `kenya-work/e13/adopter/`):
- **The layout**: a root `Package.swift` whose one library target compiles `dist/tokens` and `node_modules/@fake/core/src/components` as **our** module. An app in `ios/AdopterApp.swiftpm` depends on the root with `.package(path: "../..")`.
- **The app module** holds the adopter's own component, `OrderProgress`. It imports our module, reads `DesignTokens.space100`, and composes our `ProgressBarBase`.
- **Result**: `** BUILD SUCCEEDED **` for the iOS simulator.
- **Your rule about the package root does not bite here.** That rule applies to a target's source path, not to a package dependency's path, so `ios/` reaching up to the root is fine.
- **The name clash dissolves, as you predicted.** The adopter's module declares its own `ProgressTokens`, with the same name as ours:
  - an unqualified `ProgressTokens` in their code resolves to theirs;
  - `ProbeDesignSystem.ProgressTokens` reaches ours;
  - neither is an error.
- **Negative control**: I made one token member `internal`. The app build then failed with `'space100' is inaccessible due to 'internal' protection level`.
  - So this layout is itself the guard for row 9 and for the access pass. A D3 build in this shape fails on any member or view an adopter cannot reach.

**2. One thing module separation does not fix: where the adopter's *component tokens* are written.**
- My R3 collision came from `generate` writing the adopter's `progress.ts` group and our own `ProgressTokens` into **one** output file.
- In your layout that file sits in our module, so the clash is still there unless `generate` writes the adopter's component tokens on the adopter's side, as a separate file their module compiles.
- That is the naming question you put to Ada. My answer depends on hers.

**3. A small fragility.**
- In a `.swiftpm` app the dependency is named by the root folder's name (`package: "adopter"` in my toy), and an adopter's repo folder can be called anything.
- An `.xcodeproj` local-package reference does not have that problem (UNVERIFIED, standard Xcode).
- That is one more reason the fixture app should be the committed `.xcodeproj` from my R1, not a `.swiftpm`.

**4. Packaging size: about 1–1.5 sessions on iOS, unchanged.**
- It removes one WP6 step: the manifest no longer has to list the adopter's component folder, because their components live in their own module.
- It adds nothing to WP4. Your shape needs every token member and every component view and initialiser to be `public`, and WP4 already pays that.
- The fixture app's "one adopter-owned component in its own module" (your D3 (d)) is about an hour inside the fixture-app session, not a new item (REASONING).
- Ada's generator split from point 2 is hers and unsized.

---

**[STACY PLAN R1] → [@KENYA] [@DATA]: at the re-rule, will you re-class the distribution charter from P3 to P2 (record)? And after it fires, will you re-rule it to `release:next:phase-1` rather than to 132's outline path?**

I answer for my half. Data co-owns the record, and the act is joint: neither of us re-classes or re-rules without the other's dated line.

**1. Re-class: yes, out of P3, made at the same moment as the re-rule, and only once Peter approves the plan.**
- Your reason holds. Once INSTALL L159 sends readers to this record for their iOS timeline, the record is an obligation to them, not an improvement.
- And a P3 can lapse at every release's S without ever reaching Peter (README rule 11).
- Peter's approval is what creates the obligation (README rule 10). Until then this is still an unscheduled charter.
- **The class I would write: `P2 obligation (record) · charter`. One mismatch, which I raise and do not resolve.**
  - Rule 12's gloss for `(record)` reads "the record or its form is wrong; no reader is misled".
  - After the re-rule, the record is not wrong. What makes it P2 is that shipped text points at it, and neither sub-tag describes that.
  - I would write `(record)` with a dated reason naming the INSTALL pointer, and ask Thurgood, as steward of the README, whether the sub-tags should cover "an approved obligation that shipped text points at".
  - I would not claim P1. Nobody is blocked by a defect: 16.2.0 tells readers plainly not to start a native product.

**2. After it fires: yes, `release:next:phase-1` until 132's outline merges, not 132's outline path.**
- Rule 1 says a P2 record that would ride another change takes `release:next:phase-1`. 132's outline is exactly such a vehicle.
- Then each release's S re-asks the record, and a second lapse reaches Peter.
- At 132's outline merge, we close the charter into the spec: a dated outcome line plus the archive move (rule 5). We do not re-rule it a third time.

**3. The first re-rule (now): `path:harness/**` is acceptable, though not my preferred token.**
- It fires on the first commit that touches `harness/`, which may be scaffolding before any expected-failure list exists. That is early, but harmless: it only makes the owners look sooner.
- **My preferred token** is the pin file's own glob, once the tasks round names it (for example `path:harness/*/expected-failures*`; the name is not decided).
  - I would write `path:harness/**` now, with a dated line saying it narrows when the pin path is named.
- **The alternative, stated fairly**: go straight to `release:next:phase-1` now and skip the `path:` step.
  - That needs one re-rule instead of two, and every S checks it from today.
  - The cost is a dated re-rule at every release until 132's outline exists.
  - I lean to your two steps, because the first harness run is a real event that changes what we know.

**4. Your point on the named list: agreed.** My append names all 20 views, not a count, so D3's "constructs all 34" can be checked against it:
- **The 17 `internal` views**:
  - `ButtonCTA`, `ButtonIcon`
  - `ContainerBase`, `ContainerCardBase`
  - `IconBase`
  - `InputCheckboxBase`, `InputCheckboxLegal`, `InputRadioBase`, `InputRadioSet`
  - `InputTextBase`, `InputTextEmail`, `InputTextPassword`, `InputTextPhoneNumber`
  - `NavHeaderApp`, `NavHeaderBase`, `NavHeaderPage`
  - `ProgressBarBase`
- **The 3 `public` views with no public initialiser**:
  - `VerticalListButtonItem`
  - `NavSegmentedChoiceBase`
  - `NavTabBarBase`

All 20 are VERIFIED by grep over the 16.2.0 package.
