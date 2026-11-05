#### [LINA PLAN R2]

I read the five other plan reviews (Ada, Data, Kenya, Leonardo, Stacy). Labels: **VERIFIED** = I read it on `origin/main` today; **CARRIED** = another seat's measurement; **REASONING** = my inference. I made no repo edits.

---

**1. [ADA PLAN R1] to me: for item (ii), ship the component `*tokens.ts` definitions with precedence per component, or emit from the package index?**

**My lean: ship the definitions and harvest them as a third source, with precedence per component, the way Ada sized it.** I will lead Spec 123 Requirement 1.5 to record that, in 129's requirements round. Four corrections come with it.

**Why the definitions:**
- **The definition is the source; the index is derived from it.** `token-index/components.yaml` holds what the build resolved: `primitiveReferences: { value: space200 }`, or a bare `'11'` (VERIFIED). Emitting adopter output from a build product is the "snapshot" the 129 charter's principle rules out, and the same staleness class as row 20.
- **One path for our tokens and theirs.** The adopter's own component tokens already go through `loadComponentTokens` (Requirement 1.2 (iv)). If ours go through the same harvest:
  - `defineComponentTokens`'s guards apply to ours exactly as to theirs (the family mismatch check, and row 21's custom-value validation once it lands);
  - Ada's D7 ("build more") tests the same code that emits ours.

  The index path would need a second emitter that has to stay in step with the first.
- **It answers what Requirement 1.5 actually asks**: "whether our components' token definitions reach the consumer's harvest at all, or stay behind the component surface" (VERIFIED, `123/requirements.md`). Once Peter chose option (a), the components are compiled from source in the adopter's build. So the component token tier has to reach their output, and the cleanest form of that is the definitions themselves.

**The four corrections:**
1. **It is 6 harvestable files, not 7.** `Badge-Count-Notification/tokens.ts` is a TypeScript constants object (`export const BadgeNotificationColorTokens`). Its header says `defineComponentTokens()` "only supports numeric values", so it is not part of the pipeline (VERIFIED). The harvest must skip it on purpose or report it. It must not find it and silently register nothing. Which Badge-Count-Notification colour reads it covers is a Q13 matter.
2. **Precedence is keyed on the emitted group name, not the Stemma component name.** The definitions declare `component: 'Avatar'`, `'ButtonIcon'`, `'VerticalListItem'`, `'InputCheckbox'`, `'InputRadio'` and `'BadgeLabelBase'` (VERIFIED). Those are the names that collide in Kenya's `invalid redeclaration of 'ProgressTokens'`. The Stemma names (`Avatar-Base`, `Input-Checkbox-Base`) are what the component union keys on. So "one rule with two callers" really has three callers: the component union, the index merge and the emission. The precedence key has to be stated as the group name. Otherwise an adopter who owns `Avatar-Base` can still collide on `AvatarTokens`.
3. **The definitions import the package's primitives, not the adopter's** (`import { sizingTokens } from '../../../tokens/SizingTokens'`, VERIFIED). So:
   - The emitter must write each reference **by name**, so it binds to the adopter's `DesignTokens` at compile time. A value read from the package's `baseValue` must never be emitted. Today's output already does this (`public static let sizeXs: CGFloat = SizingTokens.size300`, VERIFIED in `dist/ComponentTokens.ios.swift`).
   - The harvest checks that every reference name exists in the adopter's primitive set, and reports a missing one the way `sync` reports a missing token.
   - **A residual on either path**: family-conformant custom values are computed from our base constants (`SPACING_BASE_VALUE`, `SIZING_BASE_VALUE`). Examples: Avatar's `iconSizeXs = 12`, Badge-Label's `maxWidth = 120` (VERIFIED). An adopter who changes their base value does not move these. Emitting them as multiples of the adopter's base is Ada's call (row 21's neighbourhood). I raise it so the requirements round does not read item (ii) as fully Model-B.
4. **Web is a sub-question for 129's requirements; I lean to native first.**
   - Web component tokens already bind late: `--avatar-size-xs: var(--size-300)` (VERIFIED), from `@3fn/core/component-tokens.css`. The Integration Guide tells adopters to "keep importing it on every path" (L144).
   - Emitting ours into the adopter's `ComponentTokens.web.css` as well would define the same properties twice.
   - Removing the package CSS import would break supported web adopters, which makes it a 17.0.0 matter.
   - So my lean: native emits our definitions now. Web keeps the package CSS until a major, under the same precedence rule.
   - Agreed with Ada: the package's `dist/ComponentTokens.{ios.swift,android.kt}` stop shipping, under item (iii). They collide in Kenya's single-module shape.

**The cost that survives, which I accept:**
- **Precedence per component means an adopter who copies one of our token files to change one value owns the whole group from then on.** When our component later reads a token their copy lacks, our component source fails to compile in their build. This is the "own one component" pattern (Guide L255), so it is consistent. But `sync` must report missing component-token keys, as it does for primitives. Otherwise the adopter meets it as a compile error.
- **The alternative's merit, honestly stated.** Emitting from the index needs no package TypeScript to run at the adopter's `generate`. Today `scopedTsRequire` already runs `src/build/tokens/*` from the package (CARRIED, Ada), so that risk is not new. I judge it smaller than keeping a second emitter in step with the first.

---

**2. Do Kenya's finding (at least 20 of 39 iOS views not constructible from an app) and Stacy's D5 points change my slice or my estimate?**

**The slice: the shape holds, and the family I named changes.**
- **Kenya's measurements make the slice more necessary, not less.** iOS contract and render tests are XCUITest inside a committed `.xcodeproj` fixture app or nothing (CARRIED):
  - `ImageRenderer` false-passes UIKit-backed controls;
  - `sizeThatFits` passes an empty view;
  - walking the accessibility tree in-process returns zero elements.

  None of that is built (Kenya: a hand-written project file, or a pinned XcodeGen). Proving it on one family before planning all 34 is the point of the slice.
- **I change the candidate family from Button-CTA + Icon-Base to the Chip family (Chip-Base, Chip-Filter, Chip-Input) + Icon-Base.** VERIFIED on `origin/main`:
  - It exercises **inheritance by re-implementation**: Chip-Filter calls no `ChipBase(` on either platform but inherits 11 contracts. That is the D5 rule I proposed, that a re-implementing child carries its own evidence.
  - It exercises a toggle state.
  - Icon-Base's view is `internal` with no `public init`, so it is one of Kenya's 20. The slice therefore also runs the access-level rule once. The three Chip views are `public` with one `public init` each.
  - It is cheap to repair. Android's errors are ChipBase 1, ChipFilter 7, ChipInput 1 (CARRIED, Data's log), against Button-CTA's 13.
  - The tasks round still picks.
- **I add one item to the slice, from Ada's D7 and Stacy's "build more" row**: a hand-written **adopter** native component, with its own `defineComponentTokens` file, built in the same fixture module. It proves the adopter build path and item (ii)'s precedence early, before WP6's scaffold exists.

**The estimate: it goes up, from about 15–25 sessions to about 25–40** (REASONING, low confidence, contract tests and fixture states only).
- **iOS is the larger half: about 15–25 sessions.**
  - Every contract test is an XCUITest that needs a fixture screen state reachable at app launch. Visual contracts (43 own) need Kenya's element-screenshot colour sampling, a tool not yet built.
  - Her split: about 120 of 214 own contracts XCUITest-decidable, 43 visual, 9 animation mostly excluded or labelled. Applied to the 288 effective contracts, that is slower per contract than an in-process unit test.
- **Android: about 10–15 sessions.** Robolectric with `createComposeRule` in the library module is fast, and it can start at the end of WP3 without waiting for WP4 (Data, CARRIED).
- **Stacy's points add work in two ways:**
  - **Each contract test needs a known-bad case** (my R1, and her "fit is a reading"): roughly 30–50% more per test. It is still the only non-model check on fit. Without it, Stacy's sample is the only check.
  - **Pass status read from the native result files** (`xcresult`, JUnit XML) instead of from contract ids is instrument work for Thurgood, not test work. It moves no number of mine.
- **The public-API pass holds at about 1–2 sessions.** My count of 182 iOS top-level types (about 126 internal) already includes the signature types Kenya left unchecked. Her three `public` views with no public initialiser (`VerticalListButtonItem`'s synthesized init, `NavSegmentedChoiceBase`, `NavTabBarBase`) add explicit `public init`s, not a new class of work.
- **What this means for the plan**: contract tests are now the largest cost in the goal by a wide margin. That strengthens three things:
  - B2 (132 written on measured numbers);
  - the family units, which ship readiness as each family lands;
  - Peter's missing decision from my R1: when the CHANGELOG first says "start a native product", all 34 components or per family.

  I am the bottleneck. The relief is delegating implementation inside my seat to a cheaper tier, with the known-bad cases as the check.

**Stacy's other D5 points, where they touch my contracts:**
- **A baseline denominator: agreed.** It should be the **288 effective contracts per platform**, after inheritance, not the 214 own ones.
- **My per-platform validation ballot rewrites the wording of every native contract.** The checker should count changes to `platforms:` and added `excludes:`, which take a contract out of the denominator. It should not count wording edits.
- **Exclusions with authority**: agreed, and the reason classes are Peter's to approve once (her § 4 item 2). One example of why it matters: `interaction_focusable`'s "Tab key moves focus" still applies on iOS through Full Keyboard Access. A "not applicable on native" exclusion would be wrong there, and the per-platform wording is the fix, not an exclusion.
- **A device read is a human's**: agreed, as Kenya and Stacy both say. An agent's simulator read is a semantics test, or it is labelled as an agent's read.

---

**One line per answer**
- **Item (ii)**: ship the 6 harvestable definition files as a third source, precedence keyed on the emitted group name, references emitted by name. Native now; web keeps the package CSS until a major. I lead Requirement 1.5's record.
- **Kenya's 20 views**: the slice shape holds. The candidate becomes the Chip family + Icon-Base, plus one adopter-authored component.
- **Estimate**: contract tests rise from about 15–25 to about 25–40 sessions (iOS 15–25 on XCUITest, Android 10–15 on Robolectric). Known-bad cases add 30–50%. The public-API pass holds at 1–2.
- **Stacy's D5**: the baseline is 288 effective per platform. It counts platform removals and added exclusions, not wording edits. Device reads are human.
