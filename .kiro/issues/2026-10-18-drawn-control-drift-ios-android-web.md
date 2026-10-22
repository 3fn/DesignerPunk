# Drawn-control drift on iOS, Android and web: the True Native ballot's routed defects

**Date**: 2026-10-18
**Type**: DEFECT RECORD. It records defects and fixes nothing. No component file changes with this record.
**Owner**: **Lina** (the components are hers; she authors and edits this body under README rule 9).
**Verifiers**: **Kenya** (iOS), **Data** (Android), **Sparky** (web). Each verifies the fix on their platform in the owning component PR, and each may append dated, signed lines here.
**Authority**: ballot `.kiro/docs/ballots/2026-10-18-true-native-development-is-not-true-native-design.md`, § 5 "Already true" and § 11 "Surfaced, routed to Lina". Its Status line reads **RATIFIED (Peter, 2026-10-18)** at commit `6bb53b096` on `chore/tnd-ballot-ratified` (PR #401). That PR was open, not merged, when this record was filed; the status was checked mechanically from the commit.
**Class**: P1 consumer-blocking · defect *(set 2026-10-20, Lina, rule 12. Accepted. These are accessibility semantics of shipped Input-Checkbox-Base and Input-Radio-Base (hard-coded English state strings on Android, probable role drift on iOS, no forced-colors support or an obsolete prefers-contrast value on web) that reach end users of a consumer's product. The iOS and Android behaviors are REPORTED by the platform seats, not verified in this repo (R-2); the source text is verified.)*
**Trigger**: `release:next:phase-1` — per component, the event that owes the close stays: the next PR that changes that component's rendering or contracts (item arms below). Not a path: the items span several components, each with its own fix PR. *(Token set 2026-10-20, Lina; the original two arms follow unchanged. Re-ruled 2026-10-21, Lina, from `manual` under F-3 (a′) of ballot 2026-10-20-manual-records-routed-readers, ratified Peter 2026-10-20: a P1 consumer-blocking record may not carry `manual`, because a `manual` record never lapses and this one reaches end users of a consumer's product. No git-visible token expresses "the next PR that changes that component's rendering or contracts" — it is a per-component event with no single PR number or path glob — so the floor is `release:next:phase-1`, where the next release walk reads the record. The event is kept in prose as the start condition.)*
- (a) **the next PR that changes that component's rendering or contracts**. This is the ratified F-3 rule: "grandfathered components must align when we work to update them". "Modified" means rendering or contracts, not metadata or docs (ballot § 8, F-3, as Data confirmed it).
- (b) **Spec 130's placeholder retirement, if it touches Input-Checkbox-Base's rendering.** As planned, it does **not**: it edits `settings.yaml`, not the checkbox (ballot § 8, F-3). So arm (b) is not expected to fire. It is recorded here so that a walker does not mistake Spec 130's merge for a fired trigger.

Forced colors (item W1) is outside F-3, so it is not grandfathered (ballot § 4 and § 8, F-3). For W1, arm (a) is the latest point at which it gets fixed, not the earliest.

**Walked**: monthly, in the health check's active-charter walk (README rule 6).
**Status**: **OPEN**. Every item below is unfixed.

---

## How to read the evidence

- **VERIFIED (Lina)**: I read the line myself with `git show main:<path>` at `bba5870b2` on 2026-10-18. The line number and its text match what is recorded here.
- **REPORTED (<seat>)**: a platform seat's reading in the ballot's § 10, which I have not re-derived. This covers platform behavior: what TalkBack, VoiceOver or a browser actually does at runtime.
- **Not verifiable in this repo (R-2).** Nothing here compiles or runs Swift or Kotlin. The unbuilt harness charter is `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`. Every iOS and Android **behavior** claim below therefore rests on the seat's report. Only the **source text** is verified. Jest/jsdom cannot evaluate media queries either, so the web behavior claims need a real browser.

---

## iOS: Kenya verifies

### I1. Input-Checkbox-Base uses the `.isButton` trait: probable role drift, fix question open

- **VERIFIED (Lina)**: `src/components/core/Input-Checkbox-Base/platforms/ios/InputCheckboxBase.ios.swift:306` is `.accessibilityAddTraits(.isButton)`.
  - It is paired with `.accessibilityValue(accessibilityState)` at L302 and `.accessibilityHint(accessibilityHint)` at L304.
  - The comment at L305 reads "Use isButton trait - SwiftUI handles toggle behavior via accessibilityValue".
- **REPORTED (Kenya, ballot § 10 [KENYA R1] (a)1)**: this is **probable** drift, not verified drift.
  - `.isButton` plus a value was the standard pattern before iOS 17 shipped `.isToggle`. Our floor is 17.0.
  - The checkbox has **three** states (checked, unchecked, partially checked), and `.isToggle` is binary.
  - Kenya believes `.isToggle` makes VoiceOver say "switch button", which is wrong for a checkbox. Her confidence in that is medium-low.
- **What this shows**: the old rule had no referent where iOS has no native control. The ratified § 1.2 rule now supplies one: "use that platform's closest documented trait pattern and record the choice."
- **Fix question, OPEN (Kenya)**: which trait pattern is the closest documented one for a tri-state checkbox on iOS 17+? Kenya answers it in the owning PR, and the choice is recorded in the component's spec or contracts. Nothing is decided here.

---

## Android: Data verifies

### A1–A5. Input-Checkbox-Base, `InputCheckboxBase.android.kt`

Path: `src/components/core/Input-Checkbox-Base/platforms/android/InputCheckboxBase.android.kt`. Every line number below was VERIFIED (Lina) and matches Data's.

- **A1. Hard-coded English state strings** (§ 3 item 1).
  - **VERIFIED**: L429–433 build `stateDesc` from "partially checked", "checked" and "unchecked". L484 assigns `stateDescription = stateDesc`.
  - **VERIFIED**: L486 sets `role = Role.Checkbox`, and L489 sets `toggleableState`. These two already give TalkBack its own state text.
  - **REPORTED (Data)**: the custom `stateDescription` overrides TalkBack's localized default strings, which makes localization our job.
- **A2. A usage hint appended to the name** (§ 3 item 2).
  - **VERIFIED**: L445–449 build `accessibilityHint` ("Double tap to check" / "Double tap to uncheck"). L482 sets `contentDescription = "$label, $accessibilityHint"`.
  - **REPORTED (Data)**: TalkBack speaks its own usage hint, so users hear it twice. "Double tap" is also wrong for keyboard and Switch Access users.
- **A3. Touch target below the Android minimum** (§ 3 item 5).
  - **VERIFIED**: L465 is `.sizeIn(minHeight = CheckboxTokens.tapAreaMinimum, minWidth = CheckboxTokens.tapAreaMinimum)`.
  - **VERIFIED**: `tapAreaMinimum` = `TAP_AREA_BASE_VALUE` = 44, and `tapAreaRecommended` ≈ 48 (`src/tokens/TapAreaTokens.ts` L17, L34, L47).
  - **REPORTED (Data)**: Android's minimum interactive size is 48dp. "44dp meets WCAG; 48dp is Android platform guidance."
  - Under F-3, which covers § 3 item 5, the 44dp stays until the checkbox's rendering or contracts change.
- **A4. No keyboard or D-pad focus handling** (§ 3 item 4).
  - **VERIFIED, absence only**: a case-insensitive grep for `focus`, `onKey` and `keyEvent` finds no matches in the file.
  - **REPORTED (Data)**: the only focus cue is whatever the ripple's focus state layer draws. Data has not checked whether that cue is visible enough.
  - Whether Compose `clickable` activates on **Space** is unverified (ballot § 3 item 3, Data).
- **A5. Deprecated `rememberRipple`.**
  - **VERIFIED**: L46 imports it, and L471 calls it (`indication = rememberRipple(...)`).
  - The component-wide count is in A7 below.

### A6. Input-Radio-Base has the same pattern, minus the hint

Not in the ballot. I checked it at the orchestrator's request. Path: `src/components/core/Input-Radio-Base/platforms/android/InputRadioBase.android.kt`.

- **VERIFIED, A1 pattern present**: L400 hard-codes `stateDesc` as "selected" or "not selected". L434 assigns it to `stateDescription`, next to `role = Role.RadioButton` (L435) and `selected = isSelected` (L436).
- **VERIFIED, A2 pattern absent**: L433 sets `contentDescription = label` with no appended hint.
- **VERIFIED, A3 pattern present**: L415–418 size to `RadioTokens.tapAreaMinimum` (44).
- **VERIFIED, A4 absence**: the file has no focus handling (grep).
- **VERIFIED, A5 present**: L50 imports `rememberRipple`, and L424 calls it.
- The behavior inferences for this file are mine, by analogy with Data's checkbox reading. Data has not reported them. **Data verifies.**

### A7. `rememberRipple` count: resolved as three call sites in four files, not seven

Data counted seven components and Thurgood's grep found four. Here is my count: `git grep rememberRipple main`, over every `.kt` file in the repo.

| Component | Import | Call site | Status |
|---|---|---|---|
| Button-Icon | `ButtonIcon.android.kt:35` | `:245` | live, deprecated |
| Input-Checkbox-Base | `InputCheckboxBase.android.kt:46` | `:471` | live, deprecated |
| Input-Radio-Base | `InputRadioBase.android.kt:50` | `:424` | live, deprecated |
| Button-VerticalList-Item | `VerticalListButtonItem.android.kt:38` | **none**. L383 is `indication = null` ("DesignerPunk uses blend utilities, not Material ripple") | dead import only |

- **Thurgood's four** is the number of files that import it. **Three** components actually call it.
- **I could not reproduce Data's seven** from any slice of `main`.
  - All 34 Android component sources: four files.
  - Everything under `src/`, including tests and validators: eight files. The extra files are `BlendTokenUsageValidation.test.ts`, `VerticalListButtonItemTest.kt`, `StemmaTokenUsageValidator.ts` and its test.
  - Button-CTA uses no ripple at all (`indication = null`, L170).
  - **Data may append the slice he counted.** Until he does, this record counts **3 live calls and 1 dead import**.
- Two validators pattern-match `rememberRipple`: `StemmaTokenUsageValidator.ts:246` and `BlendTokenUsageValidation.test.ts:78–79`. Migrating to `ripple(...)` may need those patterns to follow. This is noted so the fix PR does not trip over them.

---

## Web: Sparky verifies

### W1. No forced-colors support anywhere (Hard Rule 6, never carried out)

- **VERIFIED (Lina)**: `git grep forced-colors main -- src` finds **0** occurrences.
- **VERIFIED**: the catalog has **34** web components (`platforms/web/*.web.ts`).
- **VERIFIED**: `governance/Web-Authoring-Standards.md` § "6. High Contrast Mode" (L153–172) reads: "Interactive elements must remain visible in forced-colors mode… existing components may need remediation". Its scope is buttons, links, inputs and cards with actions.
- **REPORTED (Sparky, ballot § 10 V1 and § 3 item 6)**: a drawn part painted with `background-color` disappears in forced-colors mode, because backgrounds are forced to `Canvas`. It needs a system-color border or `forced-color-adjust` handling.
- **The interactive set**, from a first grep: **10** components declare `interaction_focusable` or `interaction_pressable` as active contracts in their own `contracts.yaml`. They are Button-CTA, Button-Icon, Button-VerticalList-Item, Chip-Base, Container-Card-Base, Input-Checkbox-Base, Input-Radio-Base, Input-Text-Base, Nav-SegmentedChoice-Base and Nav-TabBar-Base.
  - Avatar-Base and the three Badge components list those concepts under `excludes:`, so they are not in the set.
  - Inheriting children add to the set: Chip-Filter, Chip-Input, Input-Checkbox-Legal and the Input-Text semantic variants. Their own files may not restate the contract. The authoritative set is the **assembled** contracts (`get_component_full`), not a file grep.
- **F-3 status**: outside F-3, so not grandfathered (see the trigger note above).

### W2. Every `prefers-contrast` query uses the obsolete value `high`, so it very likely never matches

- **VERIFIED (Lina)**: every `prefers-contrast` occurrence under `src/` uses `high`. None uses `more`, `less`, `custom` or `no-preference`.
- **A count correction.** The ballot's "34" is the **raw line count** of `prefers-contrast` across all of `src/`. It is accurate as a line count, but it is not the number of media queries. The 34 lines break down as follows:
  - **20 live `@media (prefers-contrast: high)` rules in 18 components.**
    - Container-Base and Icon-Base each carry the rule twice, once in a `styles.css` and once inlined in their `.web.ts`.
    - The 18 components are Avatar-Base, Badge-Count-Base, Badge-Count-Notification, Badge-Label-Base, Button-CTA, Button-Icon, Button-VerticalList-Item, Button-VerticalList-Set, Chip-Base, Chip-Filter, Chip-Input, Container-Base, Container-Card-Base, Icon-Base, Input-Checkbox-Base, Input-Checkbox-Legal, Input-Radio-Base and Progress-Indicator-Node-Base.
  - **9 test assertions that pin the obsolete value**: `expect(...).toContain('prefers-contrast: high')`. They are in the `__tests__` of Badge-Count-Base (×2), Badge-Count-Notification (×2), Badge-Label-Base (×2), Button-Icon, Input-Checkbox-Base and Input-Radio-Base. **These tests currently enforce the defect.** A fix must change them in the same PR, or they go red.
  - **2 contract lines that teach it**: `Badge-Count-Base/contracts.yaml:134` and `Badge-Label-Base/contracts.yaml:109` ("Test with prefers-contrast: high (web)"). Correcting them is a contracts change, so under F-3 it is itself a modification.
  - **1 README line**: `Progress-Indicator-Node-Base/README.md:168`.
  - **2 fixture lines**: `src/cli/__tests__/fixtures/sync/package-snapshots.json` L63 and L73. These are snapshot copies of the Badge-Label-Base contracts, and they regenerate when the contract changes.
- **Cross-domain, flagged and not fixed here**: `governance/Token-Family-Responsive.md:704` (Ada's doc) also teaches `@media (prefers-contrast: high)`. That doc is a source the obsolete value can spread from. **→ Ada**, through the ballot model. This record does not track it beyond this flag.
- **REPORTED (Sparky, ballot § 10 V2)**: Media Queries Level 5 defines `more | less | custom | no-preference`, and `high` was an old draft value. An unknown value makes the query never match, so these blocks are very likely dead code. Sparky's confidence is high but comes from training data.
- **A real-browser check is owed before anyone acts on W2** (ballot § 5). **Sparky** runs it and appends the result here. Until then, W2 is "very likely dead", not "dead".

---

## Found while verifying: not in the ballot, recorded for the owning seat to adjudicate

- **I2, VERIFIED (Lina), iOS checkbox has the same localization and hint pattern as A1 and A2.**
  - `InputCheckboxBase.ios.swift` L418–424 return hard-coded English value strings ("partially checked", "checked", "unchecked"). L430–436 return hints that name the gesture ("Double tap to check" / "Double tap to uncheck").
- **I3, VERIFIED (Lina), iOS radio.**
  - `src/components/core/Input-Radio-Base/platforms/ios/InputRadioBase.ios.swift:272` is `.accessibilityAddTraits(.isButton)`, so I1's question applies to it too.
  - L270 has the hint "Double tap to select".
- **Not reported by Kenya.** Whether VoiceOver hints should name a gesture, and whether these strings need localization, are hers to rule on. **Kenya adjudicates.** If she rules them non-defects, she appends that here and the items close as re-dispositioned.

---

## Sparky's class option: a static CSS check run with the web tests

**The option** (ballot § 10, [SPARKY R1] (e); placed on this record by [SPARKY R2] (d)). Two parts:
- (a) every interactive web component has a `forced-colors` block;
- (b) no media feature uses an unknown value.

Its residual, in Sparky's words: "checking that the block exists is not checking that it is correct".

**My disposition: ADOPT, sequenced. It is not built in this record**, which is record-only.

- **Part (b), no unknown media-feature value**: adopt. It lands **after** Sparky's browser check confirms W2. The check would encode the claim that the browser check verifies, so it must not run ahead of it.
  - When it lands, it goes red on the 20 rules, and the 9 pinned tests must flip in the same PR.
  - It is cheap, deterministic and close to free of false positives: the allowed values are a closed set.
- **Part (a), forced-colors block exists**: adopt, with two conditions.
  1. The interactive set is **derived from assembled contracts**: components whose resolved contracts include `interaction_focusable` or `interaction_pressable`. It is not a hand-kept list, because a hand list drifts and the W1 grep shows inheritance hides members.
  2. It lands as a **pinned list that may only shrink**, so it does not wait for full remediation. The repo already has this pattern: `SemanticColorContrast.test.ts`'s `EXEMPT` pins. Adding a name to the list is the finding.
- **Where it lives**: a component compliance test in the `npm test` lane, under `src/components/`. That is in my testing scope. If it is ever registered as a named gate or instrument, **Thurgood is consulted** (instrument registration and README rule 7).

**Counter-argument, worked against the disposition.**
- *Folded in*: a check that is red at birth is noise. The shrink-only pin answers that.
- *Folded in*: a hand-kept set misses inheriting children. Deriving the set from assembled contracts answers that.
- **What survives**:
  1. Existence is not correctness. A drawn thumb painted with `background-color` passes a check that only asks whether the block exists, and still vanishes. Correctness needs a real browser with forced-colors emulation. That is the web analog of the unbuilt harness, it is not chartered, and R-2 survives on the web, narrower.
  2. At landing, the pin covers roughly the whole interactive set. Until remediation shrinks it, the check guarantees only that **no new interactive component lands without a block**. That is the main thing it buys, and it is less than it appears to buy.

**Fork, surfaced, not picked (Peter):**
- **Option 1: land part (a) before Spec 130's web implementation.** Input-Switch-Base is the next interactive web component, and its drawn thumb is exactly the `background-color` failure case. This binds it at birth. Cost: a standalone PR now, with a pin of about 10+ entries.
- **Option 2: ride the first web remediation PR.** This is cheaper and comes with no pin noise ahead of fixes. Cost: the switch may land first, guarded only by review and § 3 item 6, which already names forced colors for drawn thumbs as law.

---

## Cross-references (no duplication)

- **Ballot § 3 categories**: I1 is item 1, under the § 1.2 trait-pattern rule. A1 is item 1, A2 item 2, A3 item 5, A4 items 3–4, W1 item 6 (forced colors) and W2 item 6 (`prefers-contrast`, current values). **F-3** sets the per-component trigger and covers items 5 and 9.
- **The contrast queue**: `.kiro/issues/2026-09-12-semantic-contrast-adjudication-queue.md` holds the **3:1 color pairs** (§ 3 item 9), including the checkbox and radio pairs measured at the Spec 130 switch read. **They are not restated here.** This record covers semantics, target size, focus, ripple, forced colors and media-query values. It covers no color ratios.
- **The harness charter**: `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`, chartered and not built. Under R-2, none of the iOS or Android behavior claims here can be verified in this repo today. Under its interim posture § 2(a), a fix PR's Evidence names, for each claim, which platforms were re-verified and which were not.
- **Spec 130**: `.kiro/specs/130-input-switch-base/`. It builds the new drawn switch under the ratified floor. Its placeholder retirement is trigger arm (b), which is not expected to fire.

---

## What closes this record (README rule 1 and rule 5)

**Each item closes by one of two routes:**
1. **Fixed in its owning component PR.** The PR names the item ID (I1, A1–A7, W1, W2, I2, I3), and the platform verifier appends a dated line confirming it.
2. **Re-dispositioned.** The owning seat appends a dated, signed line with the reason. Examples: Kenya rules I1's `.isButton` correct under § 1.2, or Sparky's browser check shows W2 is live after all.

A3's 44dp may also be re-dispositioned explicitly if Peter rules the Android 48dp guidance out of scope. Absent that ruling, it follows F-3.

**When every item is closed**, the outcome is recorded here with its date, and the file moves to `archive/` by `git mv` (README rule 5). Sparky's check is a disposition, not an item. It does not hold the record open: if it is built, the PR that builds it cites this record.

---

## Walk log

*(Thurgood appends dated walk lines here under README rule 6. Seats append dated, signed lines under rule 9.)*

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 80, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` (per component, as its § Trigger states) · `P1 consumer-blocking · defect` (accessibility semantics). The owner decides.
