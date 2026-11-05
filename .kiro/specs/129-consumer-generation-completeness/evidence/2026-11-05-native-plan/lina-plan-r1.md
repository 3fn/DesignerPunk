#### [LINA PLAN R1]

I read the plan at `origin/main` `5c48f3ccb`. I also read Peter's 2026-11-05 words and the R3/R4 entries in this directory. Labels:
- **VERIFIED**: I read or ran it today at that commit, in a scratch extract outside the repo, or through the application MCP.
- **CARRIED**: another seat's measurement, not re-run.
- **REASONING**: my inference or estimate.

I made no repo edits, downloads or installs.

**In plain words, for Peter.** I agree with two specs: 129 for the generator and the compile check, and a new 132 for the rest of your goal. I propose one change to how 132 is built. It should first take one component family through every stage, from compiling to rendering to tested contracts, on both platforms. After that it widens one family at a time. The reason is cost. The largest part of your goal is proving the components work "as described", meaning their written behaviour contracts pass on iOS and Android. That is bigger than the plan says:
- **288 contract checks per platform, not 214.** Child components inherit their parents' contracts.
- **About a quarter of the contracts are written in web terms.** For example, "Tab key moves focus". Those need native wording before anyone can test them.
- **iOS has no tool today for testing a SwiftUI view directly.** The existing iOS tests say so in their own comments.

So the test tools have to be proven on one family before all 34 components are planned around them. Building family by family also lets each component tell adopters what it has proven ("builds", "renders and contract-tested") as it gets there, instead of everything waiting for 132's end.

---

**1. Structure**

**Pick**: **B2, with one change: 132's units go by component family after one vertical slice, not by stage.**
- **The slice**: one small family taken through compile at zero, public API, the fixture app, rendering and contract tests, on both platforms. I propose Button-CTA plus Icon-Base, which it composes; the tasks round picks.
- **The tools are measured first.** 132's design round runs that slice as a scratch measurement before its `tasks.md` is written. The seats did the same in this round. This keeps the sequential gates: the design round measures, and the tasks round plans on the measured result.
- **Then the units go by family**, with D2–D6 green for each component as its family lands, and the adopter path (WP6) last.

**Why, from the component tier:**
- **C (one spec with declared units) fails for the reason Thurgood gives.** My domain adds a second reason. The largest piece, contract tests (§ 2 WP5), depends on tools nobody has run on these components:
  - an iOS SwiftUI view-test tool (none exists in the repo; see below);
  - Robolectric or an emulator on Android (UNVERIFIED, CARRIED from Data).

  Writing those units into 129's `tasks.md` before the compile check has run means planning about 20 sessions (REASONING, § 2) on unmeasured tools.
- **The stage order in the plan (repair everything, then API, then app, then render, then tests) defers the riskiest unknown to last.** That risk is whether UI tests and contract tests work at all in CI on these components. A vertical slice brings it forward.
- **Per-family units also make D6 useful while the work is under way.** Every component shows "scaffold" on iOS and Android today. VERIFIED through the MCP for Chip-Filter: `readiness.ios.status: "scaffold"`, `hasTests: false`. Each family that lands moves its own components to a tier adopters can read.

**Fold-back.**
- **My strongest counter-argument to B2, from my tier.** The component repair splits across two specs that edit the same files:
  - 129 closes its own component rows: theme reads, item 3 and Button-CTA (row 12), row 16, and A5/A7 (row 14).
  - 129 also carries Q13's re-pointing of about 173 static colour reads in about 37 files, under item (i).
  - 132 then makes a public-API pass over the same files.

  So the same 30-odd files on each platform get two or three passes in different specs. Worse, Q12 option (a) (a protocol the package defines) *is* public API. So 129's design round would settle part of 132's API before 132 has an access-level rule.
- **What it changed:**
  - **(i) I draft the access-level rule** (what is `public` on a native component) **as a ballot during 129's design round, beside Q12 and Q13**, not in 132. Then Q12's protocol and the rule are settled together.
  - **(ii) A component PR in 129 that edits a file also takes that file's one-line non-129 fixes**, under my record (§ 5). So the file is not opened twice for the cheap fixes.
- **What survives**:
  - The Q13 re-pointing (129) and the public-API pass (132) still touch most of the same files in two different specs. That costs merge conflicts and a second review pass that a single spec would avoid.
  - The goal is done only at 132's CLOSEOUT, and 132 is the larger spec of the two. Contract tests dominate it (§ 2).

  I accept both, because the alternative is planning those tests blind.

---

**2. My rows (WP3, WP4's component API, WP5's contract tests, WP6)**

**WP3, component repair. The order is right. Its size can only be measured after rows 4 and 6 land, and I correct how it is described.**
- **The counts are floors on both platforms, for one reason.**
  - Android: VERIFIED in Data's log, `data-work/run-android-combined-2.log`. It has 65 `Unresolved reference 'dp'` errors in the token file, and no error at any of row 12's 38 group B/C sites, so the `Dp` defects are hidden.
  - iOS: Kenya has not answered whether the 99 `Color.oklch` calls do the same. It is still open.
- **So the honest size is "measured at the first harness run after rows 4 and 6 land"**, not "at the first committed run". I would add that event to the plan as the point where WP3 gets sized. I commit to a per-file, per-kind size in my record within one session of that run.
- **A prior, low confidence (REASONING).**
  - Failing files: 30 on Android (CARRIED) and 32 on iOS (CARRIED).
  - Many errors cascade from a few sources. VERIFIED from Data's log: one comment that never closes in `VisualStateStyles.kt` probably explains 18 `VisualState` and 8 `CheckmarkTransition` errors, because both enums are declared in that file (L127, L217). The 50 initializer errors are one block in `InputTextBase.android.kt` (row 12 item 3).
  - That suggests about **12 component PRs, one per family, at 0.5–1 session each across both platforms: about 6–12 sessions**, plus Q13's large re-pointing PR (about 1).
- **Correct WP3's text.** Button-CTA's Android error is `Cannot access 'val colorActionPrimary': it is private in file` (8 sites, VERIFIED), not an unresolved name. The row 12 record already reads it that way.

**WP4, the public-API pass (mine). Its size and its shape differ by platform, and the plan treats it as one iOS item.**
- **iOS** (VERIFIED, a script over the 39 non-test Swift files):
  - 182 top-level types: 40 `public`, 16 `private`/`fileprivate`, about 126 at the default `internal`;
  - 38 initialisers, 20 of them `public`.

  The pass decides, type by type, what an adopter may call. Kenya's 17 internal main views are the visible part. The variant, size and config enums those views take are the rest.
- **Android is the opposite.** Kotlin defaults to public. Of 333 top-level declarations, 132 are `private`, 0 are `internal`, and the rest are public, including 67 top-level public `@Composable` functions, previews among them (VERIFIED). The Android pass **narrows** the surface (`internal` on helpers and previews), so a refactor does not break adopters. It also has to fix the cross-file `private` reads the compiler reports: Button-CTA's 8 and Container-Base's 11.
- **Size** (REASONING): about 1–2 sessions after the access-level ballot is ratified, both platforms. The ballot itself is about 1 drafting round (§ 1 fold-back (i)).

**WP5, contract tests (mine). "214 × 2" understates the work three ways.**
1. **288 effective native contracts per platform, not 214.**
   - I resolved `inherits:` and `excludes:` across the 34 `contracts.yaml` files (VERIFIED, script; the inheritance rule checked against `get_component_full("Chip-Filter")`, which lists 11 inherited and 4 own contracts).
   - Some children re-implement their parent instead of wrapping it. VERIFIED by grep: Chip-Filter on both platforms and Badge-Count-Notification on iOS have no call to their parent, while Input-Text-Email and Input-Checkbox-Legal do call theirs.
   - A re-implementing child needs its own evidence for every inherited contract.
2. **The contracts are written for the web.**
   - VERIFIED, script: 57 of the 214 native contracts state their `validation` or `test_approach` in web terms (Tab key, click, hover, `:focus-visible`, `aria-*`, CSS). Only 15 mention a native mechanism.
   - The format has no per-platform validation field: the keys are `category`, `description`, `behavior`, `wcag`, `platforms`, `validation`, `test_approach`, `required`.
   - Before a native test can say "this contract passes", each native contract needs its iOS and Android criteria in writing. That is a contract-format change. It touches `contract-system-reference` § "Canonical Format", so it is a ballot, and it comes before the tests.
3. **iOS has no in-process view-test tool.**
   - The existing iOS tests check style functions, not views. `VerticalListButtonItemTests.swift` L23 says: "Note: ViewInspector would be used for full SwiftUI view testing", and L390: "cannot be directly tested without ViewInspector" (VERIFIED).
   - So iOS contract tests are either XCUITest in the D3 fixture app (out of process, slow, and it sees only the accessibility tree), or a third-party dependency (ViewInspector). That is a dependency decision for Kenya and me.
   - Android already has `createComposeRule` in its two test files (VERIFIED, imports L22–27).
- **Size** (REASONING, low confidence): the two tested components have 87 iOS and 85 Android test functions for 15 effective contracts, about 5.7 per contract (VERIFIED counts). At 1–2 tests per contract, the rest of the work is about 300–600 test functions per platform. At about one family per platform per session, that is **about 15–25 sessions**. This is the largest single cost in the goal, and it is why I want the slice first.

**WP6, the adopter's path to building more. Part of it already exists, and the plan's split needs one correction.**
- **What an adopter has today** (all VERIFIED):
  - `init` creates an empty `src/components/` with a README (`src/cli/init.ts` L253–264).
  - Their components join the served catalog and `generate`'s token map through the component union, and a component of theirs replaces ours by declared name (`src/cli/shared/componentSources.ts` header, Spec 123 C3). **The "indexer reading their roots" that the plan gives to 128's lane 3 already ships.** What remains there is readiness for adopter components and `implements:`.
  - Their component tokens are emitted on all three platforms (`componentTokens: ['./src/components', './src/tokens/component']`, `init.ts` L762; Kenya saw the adopter's `ProgressTokens` in `ComponentTokens.ios.swift`, CARRIED).
  - There is a web Jest preset for their own component tests (Integration Guide L567).
  - Lina, Kenya and Data ship as consumer agents (`canonical/_consumer-output/_canonical/agents/`).
  - One-off components use the Stemma subset (Guide § "One-off Component Metadata").
- **What is missing for native**:
  - no scaffold verb or template (the CLI's verbs are `generate`, `validate`, `init`, `attach` and `sync`; `src/cli/designerpunk.ts` L55–90);
  - no native test preset;
  - no build path for their Swift or Kotlin (WP4's manifest);
  - no rule for the theme names their components read (Q12 binds their components too).
- **One collision to design in WP1 item (ii)**: Kenya's `invalid redeclaration of 'ProgressTokens'` (CARRIED). Once our component tokens reach the adopter's output, a component-token group with the same name as one of ours must follow the component union's rule: the adopter's wins, by name.
- **The split is right** with that correction: the native build, scaffold and test path is in 132, and the served-catalog readiness and `implements:` are in 128's lane 3.

---

**3. Definition of done**

- **D1, D2: right.** D2's input must carry our component tokens, which is WP1 item (ii). Until then, `AvatarTokens` and `ButtonIconTokens` errors are pinned to Ada's record, not mine.
- **D3: right**, with one narrowing. The byte-identical copy check should look only at `platforms/{ios,android}/**` source. `init` legitimately scaffolds token source such as `progress.ts`.
- **D4: wrong for at least 4 components.**
  - Three carry an `accessibility_decorative` contract: Progress-Indicator Connector, Node and Label (VERIFIED, by contract name).
  - Avatar-Base carries `accessibility_decorative_mode`, which hides it when `decorative=true` (VERIFIED).
  - Icon-Base, Badge-Label-Base, Button-Icon and Input-Text-Base mark an inner icon decorative; that applies to a sub-part, not the whole component.
  - The three primitives are hidden from VoiceOver and TalkBack by design (`accessibilityHidden(true)` on iOS, `clearAndSetSemantics`/`invisibleToUser` on Android; VERIFIED by grep). So "an accessibility element" fails them on purpose.
  - XCUITest finds elements through the accessibility tree, so it cannot locate a hidden one at all (REASONING; Kenya to confirm).
  - D4 should read each component's own accessibility contracts: an element where a contract requires one, absent where `accessibility_decorative` applies. A non-zero frame for hidden components, and for Avatar-Base when `decorative=true`, needs a host wrapper with an identifier.
- **D5: the right reading of "as described", with four changes.**
  - (a) Count the 288 effective contracts per component and platform, and require a re-implementing child to carry its own evidence.
  - (b) The per-platform validation ballot (§ 2 item 2) comes first.
  - (c) The test names the contract it covers (a contract id in the test name or an annotation), and the checker reads both sides. It should not be the other way round, with 34 `contracts.yaml` files gaining test ids. Contracts stay platform-neutral, and adding a test does not rewrite a governance-adjacent file.
  - (d) **The residual a coverage check cannot close**: it proves a test is mapped, not that the test asserts the contract. An agent-written test can pass while checking nothing. The non-model protection is a known-bad case per contract test, the two-sided pattern my Jest guards use: a fixture that breaks the behaviour must make the test fail. Without that, D5 is agent-on-agent attestation, which Peter's self-governance aim rules out.
- **D6: right.** It is Q10 (c), a change to what readiness means in the served contract. The application MCP is mine; the derivation lands in 132.
- **Missing: the release line.** Nothing says which green set lets a release stop printing "do not start a native product". All 34 components? Or a named subset at "renders and contract-tested"? See § 4.

---

**4. Peter's decision list (§ 5)**

- **The list holds the right things.** Item 1 (a) stays his because it says what "iOS 17.0+" (Core Goals) means for a tested claim.
- **Missing, and his**:
  - **When DesignerPunk first tells adopters to start a native product.** That is either when all 34 components reach the D4/D5 tier, or per family with the CHANGELOG naming the ready ones. This is a consumer-facing promise, and family units make the per-family option real.
- **Not new decisions for him, but ballots he ratifies as usual** (they should not be presented as forks):
  - the per-platform contract validation format;
  - the native access-level rule;
  - the iOS view-test dependency (ViewInspector or XCUITest only), which is the team's call. It becomes his only if it adds a dependency adopters must install. It does not: test targets stay out of the adopter's build (REASONING).

---

**5. The § 7 findings that touch me**

- **The 17 internal views: yes, it duplicates the charter.** `.kiro/issues/2026-09-26-native-component-distribution.md` L22 already carries "An access-control pass (only 19 of 39 production files currently declare `public` types)" (VERIFIED), and the charter names me as owner of the component content (L6).
  - I withdraw my R3 offer of a new record.
  - I will append a dated line to that charter instead, under rule 9, carrying:
    - Kenya's 17 views;
    - the iOS counts above (182 types, 126 internal);
    - the Android narrowing half the charter does not mention;
    - the access-level ballot plan.
- **My other R3 record is not a duplicate**: the component compile errors that no row carries (`TokenMapping.kt`, the unclosed comment, the cross-file privates, the conflicting declarations, the opt-ins). Those are compile defects, not distribution, and I still file that record from the harness's first committed run.
- **The lapsed trigger.** I co-own the charter's component half, but the Trigger line is Kenya's and Data's to re-rule. I support the B2 re-rule. I would add that the charter's "theme-binding inversion is the hard part" (L19) is superseded on iOS by Kenya's one-module shape (CARRIED), so Q12's names are the remaining hard part.

---

**6. Directed questions** (my D4 and D5 answers depend on these)
- [@KENYA] Can XCUITest locate an `accessibilityHidden(true)` view at all, and if not, which render oracle do you want for the three decorative Progress-Indicator primitives? Is ViewInspector acceptable as a test-only dependency, or are iOS contract tests XCUITest-only? My WP5 iOS size and tool depend on it. -- [LINA PLAN R1]
- [@DATA] Can `createComposeRule` tests run under Robolectric on `ubuntu-24.04` with no emulator, for semantics and contract assertions? My WP5 Android tool depends on it. -- [LINA PLAN R1]
- [@THURGOOD] Do you accept D5's direction (each test declares the contract id it covers, and the checker reads both sides), plus a known-bad case per contract test? Is the per-platform validation format a ballot on `contract-system-reference` with you consulted? -- [LINA PLAN R1]
- [@ADA] Does WP1 item (ii) take the adopter-wins-by-name rule for component-token groups (Kenya's `ProgressTokens` collision), matching the component union? -- [LINA PLAN R1]

**Answers to [@LINA] in [THURGOOD PLAN R1]**:
- **D5 as the reading of "as described"**: yes, with § 3's four changes.
- **Who writes the tests**:
  - I write the contract tests; component tests are my charter's, and Agent-Directory routes component test gaps to me.
  - Kenya and Data own the lanes and the fixture app, review the platform idiom, and own the device reads for speech.
  - Splitting the work by contract category would leave each component with two authors and no single owner.
  - **The residual**: I am the bottleneck at about 15–25 sessions (§ 2). Delegating implementation inside my seat to a cheaper tier (Start Up Tasks #6) is the relief, with the known-bad cases as the check.
- **WP6's split**: right, corrected in § 2. The root-reading half of 128's lane 3 already ships.
