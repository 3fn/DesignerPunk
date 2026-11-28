# Spec Feedback: Native Components in the App — Design Outline

**Spec**: 132-native-components-in-app
**Created**: 2026-11-27
**Structure**: split by phase (Spec-Feedback-Protocol § "The Feedback Document"). This file is the design-outline phase only. The later phase files are created when their phase opens, never earlier: `requirements.md`, `design.md` and `tasks.md` are Trigger paths for open records (outline § 4.2), and this directory's files share their basenames.

---

## Design Outline Feedback

### Context for Reviewers

**What is under review**: `design-outline.md` R1, read at `origin/main` `8553499b1`. Review the outline, not the plan behind it: the plan of record (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/plan-r2.md` at `b89163c41`) was approved as a whole, and what Peter ruled there is not re-opened.

**Settled, not for re-litigation** (each with where it lives):
- The two-spec structure, 129's narrowed sentence and this spec's acceptance sentence, D1–D3, and order (x′) → outline § 1 and § 3; native-plan `README.md` § "What Peter decided, and when".
- The Android minimum, API 26; native changes ship in minors before the claim, with aliases and D9's diff before it ("7 (a)") → Spec 129 `design.md` § 0.
- The iOS minimum stays 17.0 **for now**, and is re-asked at this gate ("4 (a)") → outline § 5.1 P-6. Its evidence is Kenya's probe.
- Peter's 2026-11-27 "Spec with (a), and start 132's outline round now": this PR is the carrying event for the distribution charter → outline § 7.

**Under review, and what each kind of entry is for**:
- **§ 5.1 (Peter's questions)**: are the options right and complete, is the plan's recommendation still yours, and what evidence is still owed? Do not pick for Peter.
- **§ 5.2 (the team's questions)**: answer the ones you own; T-1 closes in this round.
- **§ 5.3 (scope)**: S-1 (web) needs Sparky and Leonardo.
- **§ 4.2 (records)**: confirm or change the proposed disposition of each record you own. The disposition lines themselves are written in the requirements round (Process-Spec-Planning § "Before Formalizing").
- **§ 6 (probes)**: Data and Kenya run them during this round and record results in the goal record before the PR merges.
- **§ 8 (cost)**: correct your own row.

**Out of scope for this round**: requirements, design or task text; the colour fork in #870 (Peter's, in that record); row 7's re-answer (#864, Peter's); 131's content.

**Dependencies**: PR #868 (Peter's answer in the goal record) merges before this PR, and its owners re-token the record to `merge:#880`, so the record's close is in this PR (outline § 7). Kenya's spike evidence is on draft PR #879; Data's probe grant is #878. #870 and #873 are P1 preconditions for adopter component tokens (outline § 4.1), not merge preconditions for this PR.

**Reviewers, and why each** (Spec-Feedback-Protocol § "Stakeholder Identification"):

| Reviewer | Why | Entry scope |
|---|---|---|
| **Kenya** | Owns the iOS half: packaging, the D4 iOS app, the iOS render lane. Co-owns the goal record and the theme-family record. Her inbound and her rule-10 section on #868 carry three iOS obligations: the iOS minimum re-ask (P-6), the iOS 17 runtime probe (§ 6) and the wording rule. Her spike (#879) is § 6's iOS evidence | full outline; § 6; T-12, T-13 |
| **Data** | Owns the Android half: the Gradle module, the D4 Android app, the render lane. Co-owns the goal record and holds its Trigger line. His inbound carries the toolchain range numbers (P-9) and the API-26 floor test in 132's module. Files the `.github/**` grant for his CI probe | full outline; § 6 probe |
| **Lina** | Owns the component content, the public-API pass, the contract tests (most of the plan's size), the three #877 records and the repair, drawn-control and readiness-tables records. T-1 is hers with Leonardo | full outline |
| **Ada** | Owns `generate`, which writes our module's manifest, the deprecated aliases, and the two P1 preconditions (#870, #873). Q12, Q13 and the type table are hers and provisional until D4 builds. T-4's token placement | full outline; § 4.1 |
| **Leonardo** | Owns the fixture app's content, the adopter journey, the walkthrough and the code samples (D8, D9). Co-owns T-1 (`platformParts:`). Consumer voice for P-2 and P-7 | full outline |
| **Stacy** | Her conditions 1 and 2 bind the acceptance sentence and the D rows. Reads D6, D7 and the measured-cost record for verifiability. Owns the activation read of Data's grant and the LENS at the tasks round | full outline; § 3 |
| **Sparky** | The acceptance sentence names all three platforms, and Spec 129 carried his web check to this outline (S-1). The outline touches no other web surface | § 5.3 S-1 only |

**Not tagged, and why**: Thurgood is the author, and incorporates. Peter is asked in one batch after the round (§ 5.1), not in this file.

**Cost**: reviewers self-write their entries (about 4.75–6.25 sessions for R1; outline § 8).

---

#### [THURGOOD R1]

- Seeded the outline from the plan of record, the goal record, 129's `design.md` § 0, its CLOSEOUT pass, the four 129 design inbounds, the records E2's grep finds plus five hand-added (#870, #873, #877's three) and one glob it misses (the instruments parser). → design-outline.md §§ 1–4
- Every deferred decision is an open question with options and no pick. → design-outline.md § 5.1
- Wrote the `open` outcome line for Peter's 2026-11-27 answer, as the formalizer (RELEASE-FLOW 3a). → design-outline.md, last line
- Facts committed as unedited stdout. → `evidence/facts-at-8553499b1.md`
- [@KENYA] Is P-6 framed so the iOS 17 numbers decide between its three options, and is P-10's iOS half (local download, a CI grant, or "not now") the right ask? Is § 6's summary of #879 faithful? → design-outline.md § 5.1, § 6 -- [THURGOOD R1]
- [@KENYA] [@LINA] T-13: which check proves "hidden from VoiceOver" now that XCUITest finds hidden views? [@DATA] the Android twin? → design-outline.md § 5.2 -- [THURGOOD R1]
- [@ADA] [@LINA] [@LEONARDO] T-12: fix the 26 fixed `.system(size:)` lines through scaled type, or exclude the Dynamic Type audit with a reason? → design-outline.md § 5.2 -- [THURGOOD R1]
- [@KENYA] [@DATA] Do you accept merge preconditions 1–3 in § 7 (the `merge:#880` re-token, probes before the decision sitting, and the record's close committed on this branch)? And T-11: should the "Native status" passage change at this merge, given that no limitation marker names the goal record? → design-outline.md § 7 -- [THURGOOD R1]
- [@DATA] Does #878 need anything from Peter beyond its merge, and is its result recorded in its fixing PR with a pointer in the goal record, as § 6 says? → design-outline.md § 6 -- [THURGOOD R1]
- [@LINA] [@LEONARDO] T-1: one `rendering:` field, or one plus `platformParts:`? This round closes it. → design-outline.md § 5.2 -- [THURGOOD R1]
- [@LINA] Is § 2's reading right that the first family is cheap to repair (no pinned entry on Chip-*, two on Icon-Base Android), so its measured cost under-states the repair share? → design-outline.md § 2, § 3 -- [THURGOOD R1]
- [@ADA] Does § 4.1's interim rule (D10 uses only the families that compile, until #870 lands) hold, and is the harness-consumer fixture the right guard to name? → design-outline.md § 4.1 -- [THURGOOD R1]
- [@LEONARDO] P-2 and P-7 together: under "per family", is the first family's release the first support claim, and does the overlays' flip happen then? → design-outline.md § 5.1 -- [THURGOOD R1]
- [@STACY] Is the measured-cost record's proposed content verifiable as written, and is anything in § 5.1 framed so that an answer would dilute a D row? → design-outline.md § 3, § 5.1 -- [THURGOOD R1]
- [@SPARKY] S-1: should 132 carry "a check that web component source resolves against a consumer's generated CSS", and would doing so or not doing so change anything a web adopter is promised? → design-outline.md § 5.3 -- [THURGOOD R1]


#### [ADA R1]

Read at `22e21990a` (`spec/132-design-outline`, draft #880), in my own detached worktree. Nothing is committed or pushed. Each factual claim is marked VERIFIED (Ada, at that head unless another commit is named), REASONING, or UNVERIFIED. My scope: `generate` and our module's manifest, the deprecated aliases, Q12/Q13 and the type table, the #870/#873 preconditions, T-4, and P-7 where it touches tokens.

**Verdict**: the outline is sound in my domain, and I would merge it after one correction (§ 4.1's interim list, which is wrong on Android) and three additions (#872, my manifest conditions, and D9 covering the generated token API). Nothing in it is wrong in a way that blocks the round.

**Mentions first**

- **[@ADA] § 4.1: does the interim rule hold, and is the harness-consumer fixture the right guard?**
  - **The rule holds for iOS. For Android it is too wide on the value path.** → design-outline.md § 4.1
    - The list ("spacing, sizing, radius, fontSize, borderWidth, tapArea, opacity, lineHeight, density, letterSpacing, blend, breakpoint") comes from Kenya's iOS table, where every one of those types is `CGFloat`. Data probed only the six broken families.
    - On Android, `formatAndroidComponentTokenValue` (`src/generators/TokenFileGenerator.ts` L657–L676) adds `.dp` for spacing, sizing, radius, tapArea and borderWidth and `.sp` for fontSize. It emits a bare number for every other family (VERIFIED, read).
    - The Android primitives of the other six are not bare numbers (VERIFIED, read in a scratch consumer generated from `@3fn/core` 16.3.0 at `3a3bd072b`):
      - opacity, lineHeight and density are `Float` (`0.48f`);
      - breakpoint is `Float` (`320f`);
      - letterSpacing is a `TextUnit` (`(0).em`).
    - So a value-path `opacity` token comes out as `0.48`, a `Double`, and fails wherever a `Float` is expected. Data found the same for scale. The same holds for lineHeight, density, breakpoint (`Int`) and letterSpacing (`Int`). Nothing was compiled: this is REASONING from the emitted declarations (no JDK on this machine).
    - The reference path is fine for those six on both platforms. Kotlin's `val` is untyped and infers the primitive's own type, and on iOS the primitive is `CGFloat` like the member (REASONING, the same mechanism Data showed for colour).
  - **The interim rule I'd write**:
    - D10's component tokens use spacing, sizing, radius, fontSize, borderWidth or tapArea, by value or by reference;
    - opacity, lineHeight, density, letterSpacing, blend and breakpoint by reference only;
    - none of color, fontWeight, fontFamily, duration, easing or scale;
    - and D4's adopter theme and D10 use no static product colour on iOS until #873 lands.
    - I will add the Android value-path finding to #870's record. That is my act on my record, outside this consult.
  - **The guard: yes, the harness-consumer fixture, with two widenings.**
    - It needs one token per family on **both** paths, and it should also carry the two static product-colour forms from #873. The product half sits in `harness/fixtures/product-tokens/**`, which changes only under a spec row (my charter, ballot `2026-11-07-native-lane-ownership` item 5).
    - Changing what the driver injects is, in my reading, a change to "what it decides", so the component half needs a spec row or an issue-row grant too.
    - Both halves fit as a row in 132's first unit, ahead of D10.
    - Data's surviving counter holds: a fixture tests only the families someone listed. The complement is the emitter fix itself, which derives every component-token type from the primitive emitter's table (see Q12/Q13 below).
- **[@ADA] T-12: scaled type through the tokens, or exclude the Dynamic Type audit? My lean: fix it, through the tokens. Do not exclude.** → design-outline.md § 5.2 T-12
  - **The count is right** (VERIFIED, `git grep` at `22e21990a`): 26 `.system(size:` lines in 14 non-test iOS component files.
  - **The token side today** (VERIFIED, read in the generated `DesignTokens.ios.swift`): typography is emitted as a `TypographyToken` struct (`fontSize`, `lineHeight`, `fontFamily`, `fontWeight`, `letterSpacing`), with no text style. So no component can ask a token for a font that scales.
  - **Android already scales**: `fontSize` is emitted as `16.sp` (VERIFIED, read). That was Spec 129's I-2 decision, and `sp` follows the user's font scale. **So this is iOS-only.**
  - **Proposed fix**:
    - Each typography semantic token gets a text-style mapping (bodyMd → `.body`, h1 → `.largeTitle`, and so on).
    - The Swift generator adds a `font` on `TypographyToken` that scales relative to that style: `Font.custom(_:size:relativeTo:)` for a named family, or a `UIFontMetrics`-scaled system size where the family is nil.
    - The 26 lines then read the token's font.
    - The mapping is new data on existing semantic tokens. I read that as a token-structure change, so it needs **Peter's token review** (Token Governance § "Token Creation Governance"), not my call alone.
  - **Why not exclude**: accessibility-first is a core goal, and WCAG 1.4.4 asks for resizable text. An exclusion would be a P-4 case that removes a real check on every component.
  - **Counter-argument, surviving**: scaled text breaks layouts sized by fixed tokens (Chip and Badge heights from `sizing`). D5's largest-Dynamic-Type variant will then flag clipping, so T-12 moves cost from "audit noise" into real component repair (Lina) that the first family's measured cost has to absorb.
  - **Size** (REASONING): about 1–1.5 sessions on the generator side (the mapping, the font property and its test), plus Peter's review and Lina's 14 files.

**My own review**

- **§ 4.1, the two preconditions: right, with one missing neighbour.** → design-outline.md § 4.1
  - The heads it cites are the PRs' current heads: #870 `5eba5bbc5` and #873 `871023275`, both "Merge branch 'main'" commits on my branches (VERIFIED, `gh pr view`).
  - **Add #872.** It is the CORRECTION of `governance/Token-Governance.md` L160 and L556 and `governance/Token-Quick-Reference.md` L224, which taught "takes numeric families only … no color family". That is false about the API. Its new clause says six families are not supported on iOS today.
    - It is the served-doc side of the adopter journey: what Leonardo's walkthrough and an adopter's agents read when they write D10-style tokens.
    - It is open and held pending Peter's word on whether a `governance/**` CORRECTION may land from my seat. The clause still needs widening to cover Android's reference-path failures for duration, easing and scale (the orchestrator is putting that to Peter).
    - It is not a precondition of this PR, but the adopter journey must not ship before it lands.
  - **Add a pointer to row 7** (`2026-11-08-generate-component-token-warning-spacing-sizing-only.md`, Peter's re-answer pending on #864). Today `generate` warns on an off-grid custom value for spacing and sizing only (VERIFIED in my 2026-11-27 probe at `3a3bd072b`). So a D10 token with an off-grid radius or fontSize value gets no warning. Until row 7 is answered, D10 should use references or on-grid values, so its tokens prove the warned path and not the silent one.
- **WP4, the `generate`-owned manifest: I confirm ownership, and three conditions should carry into requirements.** → design-outline.md § 2, WP4
  - My PLAN R2 (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/ada-plan-r2.md` L46–L70, VERIFIED, read) set three conditions. The outline's WP4 row names the manifest but not these:
    1. **An existing root `Package.swift` the adopter owns** (story 3). `generate` writes the file only when it is absent or carries our generated header; otherwise it stops with a message.
    2. **Writing outside `output` is new for `generate`.** The root manifest and the Android module folder need their per-platform paths and a `COMMIT-POLICY.md` entry. Whether they are committed is the team's call, with Leonardo.
    3. **The adopter's component module imports ours by local path.** Kenya and Data confirm that this holds in the D4 layout.
  - **Size**: plan-r2 has it as "unsized" (L422). My estimate is about 1–2 sessions, plus one per platform from Kenya and Data for the shape (REASONING).
- **The deprecated aliases: owed before the claim, and none exist today.** → design-outline.md § 2, WP4; § 5.1, "Not re-asked"
  - No generator emits a deprecated alias (VERIFIED: no `@available(*, deprecated` or `@Deprecated(` emission under `src/generators/` or `src/providers/`).
  - **What I'd build**: a rename map in the token source (old name → new name, the release it was renamed in, a removal release), emitted as Swift `@available(*, deprecated, renamed: "new")` and Kotlin `@Deprecated(..., ReplaceWith("new"))`.
    - It covers `DesignTokens` members, the component-token enums and the theme members.
    - Its test: a renamed member still compiles in the harness with a deprecation warning.
    - Plan-r2 sizes it at 1 session (L415).
  - **Composes with D9**: the public-API diff should cover the **generated** token files (`DesignTokens`, `ComponentTokens`, the theme types) as well as component source. Under the manifest design they compile into our module, so the Swift API digester and Kotlin binary-compatibility validator run over our module would see them (REASONING; T-10's owners confirm). An unaliased token rename is exactly what D9 must catch, so T-10 should state it.
- **Q12, Q13 and the type table: provisional until D4. What D4 must show for them to stop being provisional.** → design-outline.md § 4.3, Ada bullet
  - **Q12** (fixed binding names: `DesignerPunkTheme`, `\.dpTheme`, `LocalDPTheme`, `com.designerpunk.tokens`). D4's adopter module must reach them, and an adopter component must read a theme colour through them from its own module. That depends on their access level, so the access-level ballot (#877) must name them public.
    - One case D4 will not see: with a config whose `name` defaults to `DesignerPunk`, the Android provider and the theme data class share a name (Spec 129 `design.md` L253, VERIFIED, read). D4 uses a non-`DP` abbreviation and a named config, so a unit test should hold that case.
  - **Q13** (every colour semantic in the theme). D4's adopter theme exercises it.
  - **The type table** (129 D-1). D4 proves the **primitive** emitter's types in real SwiftUI and Compose use. #870 shows the **component-token** emitter keeps a second, lossy copy of the type map. So D4 can pass while an adopter's component tokens fail.
    - The fix for the class is one table that both emitters read.
    - D10's adopter component is what proves the second path. The outline should say D10's token file covers at least one family by reference and one by value.
  - **The Kotlin package refusal exists** (VERIFIED: `src/cli/shared/reservedKotlinPackages.ts` reserves `com.designerpunk.tokens` and `com.designerpunk.components.*`). D10's same-name case proves it end to end.
- **T-4, where adopter components and their tokens live: I confirm plan-r2 § 3's resolution, with one question it did not have when it was written.** → design-outline.md § 5.2 T-4
  - **Confirmed**: adopter source lives in its own module. Generated token groups live in our module, and the same group name replaces ours and is reported. 129 shipped the report line ("component tokens: <G> — yours replace DesignerPunk's") as its D-5 design (VERIFIED as designed in my 129 design inbound D-5; that it prints today is UNVERIFIED by me at this head).
  - **New since plan-r2**: every component's tokens, the adopter's included, go into one generated `ComponentTokens` file in our module. So one bad adopter token fails our module and every DesignerPunk component in the target (Kenya, in #870's record).
  - **A fork for the design round**:
    - **(a)** keep all groups in our module, and make the emitter correct for every family, guarded by the fixture;
    - **(b)** emit adopter-only groups, those with no same-name group of ours, into the adopter's module, and keep only the replacing groups in ours.
  - **My lean: (a).** (b) splits the replacement rule across two modules for a defect class the emitter fix removes, and our components can only read groups in our module anyway.
  - **Surviving counter to (a)**: any future emitter defect fails our module again, for every adopter with one custom token. (b) would contain it to the adopter's own module.
- **§ 8, my row**: Ada 0.5–1 for R1 is right.
  - Outside the round, the plan should carry my build items: #870's emitter fix and fixture (about 1.5–2.5), #873 (about 0.5–1), the aliases (1), the manifest (1–2) and T-12's generator side (1–1.5), all REASONING.
  - The component-type-map fix is shared work with Kenya and Data for the platform types.

**Peter's questions that touch my domain** (leans only; they are his):
- **P-1, D4–D10 as written: lean approve.**
  - Token-side, D10 is the only row that tests adopter-authored tokens, and it is what makes #870's class visible. Approving it as written makes #870 and #873 hard preconditions, which the outline already says.
  - **Strongest counter**: until #870 lands, D10 may prove only a narrowed set of families, so the adopter journey teaches less than the API accepts.
- **P-7, which release carries the support claim (token side only): lean that the token side needs no major for it.**
  - What it needs is that the alias mechanism, D9's diff over the generated token API, #870, #873 and #872 have all landed before the first claim, in whatever release that is. Under "7 (a)", earlier native token renames shipped in minors with no supported consumer to break. The Task 11 removal of the flat `_wcag` constants is the precedent: it is in the governance text as gone (`token-governance` § "Theme Registry"), with no aliases.
  - **Strongest counter**: if the first claim is per family in a minor, a token rename after it needs an alias for every family, claimed or not, because the generated token API is shared by all families. So aliases are owed from the first family's claim for the whole token surface, not per family.

**What I need for my T-items**: T-4 needs Kenya's and Data's confirmation that the local-path import holds in the D4 layout. T-12 needs Peter's token review of the text-style mapping.

**Consulted**: none needed. This is a review entry.

*Signed: Ada, 2026-11-27.*

#### [LINA R1]

**Read at**: `22e21990a` (`spec/132-design-outline`, #880), in a detached scratch worktree, against `origin/main` `8553499b1` for the component tree. Read-only. Counts and greps cite paths at that head. MCP counts come from the application MCP rebuilt today.

**Verdict**: the outline is sound, and I would carry it forward. **One gap is structural** and should be fixed before requirements: the slice's "compile at zero" and the module our components compile into (item A below). Two smaller corrections (B, C) change what the first family costs.

---

**Mentions first**

- **[@LINA] § 2 and § 3: is the first family cheap to repair? Not as § 2 reads it.** The pinned counts are right (VERIFIED: 0 entries for Chip-*, 2 Android entries for Icon-Base, in `harness/expected/*.tsv`). But three costs sit on the slice that those counts do not show:
  - **(A) The blend helper is on the chips' path.** All three chips call `pressedBlend()`, for example `ChipBase.android.kt` L196 and the iOS state styling at `ChipBase.ios.swift` L300–L306. `pressedBlend()` calls `darkerBlend`, which is unresolved on both platforms: 4 pinned blend entries per platform, 10 occurrences each, tagged `2026-06-24-blend-system-architecture-and-oklch-alignment.md` (VERIFIED, `harness/expected/harness-{ios,android}-components.tsv`). So the slice pays the blend repair.
    - It pays it once, for every family with a pressed state. The measured-cost record should book it as a **shared** cost, not a per-family one; otherwise the extrapolation over-states the later families on that line.
  - **(B) T-12 reaches the slice.** The three chips set their label font with a multi-line `.font(.system(` / `size: DesignTokens.fontSize075,` (`ChipBase.ios.swift` L237–L239; also `ChipFilter.ios.swift`, `ChipInput.ios.swift` and `NavHeaderPage.ios.swift`).
    - The 26-lines-in-14-files count greps the one-line form `.system(size:`, so it misses these 4 files (VERIFIED, `git grep -c '\.system($'`). The true count is at least 30 lines in 18 files.
    - Kenya's spike shows that D5's audit flags the form, so the first family carries the T-12 fix.
  - **(C) T-13 reaches the slice.** Icon-Base's contract `accessibility_hidden` ("Icons not in accessibility tree") is exactly the check XCUITest's `exists` cannot prove (VERIFIED, `src/components/core/Icon-Base/contracts.yaml` L75–L87). The sibling concept `accessibility_decorative` is on the three Progress-Indicator primitives, not in the slice.
  - **So**: the slice is cheap in **per-component** repair and not cheap overall. It carries one shared repair (blend) and two cross-cutting D5 costs (T-12, T-13). The bias § 2 names is real, but its sign differs by line item. **The record should split the shared costs from the per-family ones.**

- **[@KENYA] [@LINA] T-13: which check proves "hidden from VoiceOver"?** Component-side answer; the tool is Kenya's.
  - **The contract says "not in the accessibility tree"**, so the check should read the tree VoiceOver iterates, not the automation tree.
  - **Lean**: an in-app read in the fixture host. A test-only hook walks the window's accessibility elements (`accessibilityElements` / `accessibilityElementCount()` recursion from the hosting view) and asserts the hidden node is absent. Its known-bad twin is the same view without `.accessibilityHidden(true)`, which must be found.
  - **UNVERIFIED**: whether SwiftUI's hosting view exposes `.accessibilityHidden` through those UIKit APIs faithfully. That is Kenya's to probe, and it fits her spike's fixture.
  - **Rejected**:
    - the fixture-only wrapper, because it tests the wrapper, not the component;
    - `performAccessibilityAudit` alone, because it does not check hidden-ness (UNVERIFIED by me; Kenya's spike says what the audit caught).
  - **Fallback**: a labelled device read, under P-3.
  - **Android twin (Data's)**: the merged semantics tree is what TalkBack reads, so the assertion is on the merged tree (not `useUnmergedTree`): the icon contributes no node or description. The known-bad is the icon with a non-null `contentDescription` (Icon-Base Android L71 sets `contentDescription = null`, VERIFIED).
  - **Whichever check is chosen becomes that contract's per-platform validation line** in the contract-validation ballot (T-9). Today its `behavior:` text names each platform's mechanism, and its `validation:` lines are platform-neutral, so this contract needs native lines, not an exclusion.

- **[@ADA] [@LINA] [@LEONARDO] T-12: fix or exclude? Fix. Do not exclude the Dynamic Type audit.**
  - Fixed point sizes that ignore Dynamic Type fail the platform's text-scaling path, which is WCAG 1.4.4's concern on iOS. An exclusion would be a P-4 case with no reason I could defend.
  - **Component side (mine)**: every `.system(size:)` form becomes a scaled form keyed to a text style, for example `.system(size: …, weight: …, relativeTo: <style>)`, or `@ScaledMetric` for the size.
  - **Token side (Ada's)**: which text style each `fontSize`/typography token scales relative to. That is a token-to-style mapping, not new values. Either the emitter carries it, or the components choose it once per role.
  - **Counter, surviving**: scaled type grows chips and rows at the largest sizes. Fixed-height containers (`minHeight: ChipTokens.tapArea` is a minimum, so it is safe; other components may use fixed `frame(height:)`) then need layout work. That cost lands in D5's iOS repair, and the slice is where it is first measured.

- **[@LINA] [@LEONARDO] T-1: one `rendering:` field, or one plus `platformParts:`? I move to Leonardo's form, constrained.**
  - **Why I move**: the mixed case is real on both platforms, not only the iOS case Leonardo named.
    - iOS `Input-Text-Base` is a system `TextField`/`SecureField` with our `textFieldStyle`, and we draw the background, border and focus ring (`InputTextBase.ios.swift` L274–L299, L475–L482, VERIFIED).
    - Android is a `BasicTextField` with our chrome (`InputTextBase.android.kt` L41, L264, VERIFIED).
    - So yes to his question: drawn chrome around a system field.
    - Kenya's ink check reads a light text field near its floor, which is what sampling a system-drawn interior looks like.
  - **The shape I accept**:
    - per platform, `kind: platform | drawn` with a `reason` (unchanged);
    - **plus** an optional `platformParts:` list, allowed only when `kind: drawn`, naming the parts the system draws, each with a reason;
    - D5 samples a drawn component's ink everywhere except the listed parts.
  - **The constraint**: each part name must be a fixture accessibility identifier D5 can find, for example `text-entry`. Otherwise `platformParts:` is prose that D5 cannot act on.
  - **Behavioural choices stay out of `rendering:`** (Leonardo's point, which I agree with): they belong in the contract-validation ballot.
  - **Counter, surviving**: a parts list invites over-claiming, since "the system draws it" becomes a way out of a failing ink check. The guard is that each part needs a reason and is read at the claims pass. It is a read, not a test.
  - **This closes T-1 for me.** It needs Leonardo's agreement at R2 to close in this round.

---

**My review, by section**

- **Item A (structural): compile at zero for one family versus one module of components** → design-outline.md § 2 "How 132 is cut", § 3.
  - The D4 app compiles our component source as **one module** from `node_modules`. The goal record says "a generated root `Package.swift` compiles the adopter's generated tokens and the packaged components in ONE module from `node_modules`" (`.kiro/issues/2026-09-26-native-component-distribution.md`, iOS shape, Kenya R3, VERIFIED as written there). The harness compiles one module in the same way (plan-r2 L145).
  - At `8553499b1`, 45 iOS and 89 Android component entries are pinned outside the slice, plus the blend entries (outline § 2).
  - **REASONING**: one remaining error anywhere in the module fails the link. So the first family's app cannot build until every family compiles, unless the generated manifest compiles only some families.
  - **Two defensible options; the round should pick at design**:
    - **(i) D3 to zero for all families first**, before the first family's app. The slice then measures all the repair, not one family's, which changes the measured-cost record's meaning.
    - **(ii) Family-scoped sources** in the manifest that `generate` writes: only families at or past the compile tier, plus their closure (Chip needs Icon-Base, the blend helper and the tokens).
      - Cost: the manifest becomes readiness-aware. A consumer's dependency is then partial, and must say so: its P-2 and P-7 interplay. D3's "zero entries" stays a whole-package row.
  - This is Kenya's, Data's and Ada's (the packaging and `generate` owners). Mine is the component closure list. **I would add it as T-14**, so it is not discovered at the tasks round.

- **§ 2 "What the first family carries today"**: correct the sentence as in the mention answer. The slice does carry repair (blend) and two D5 cost centres (T-12, T-13).

- **Contract tests (my largest share)** → § 2 "Render and behaviour".
  - **The slice is 46 contracts per platform**: Chip-Base 11, Chip-Filter 15, Chip-Input 15, Icon-Base 5, counting inherited contracts (VERIFIED, `get_component_summary` contractCount). That is **92 native contract tests**, each with a known-bad case.
  - The three chips report `ios`/`android` readiness `scaffold` with `hasTests: false` (VERIFIED, same reads).
  - Several of their contracts are web-worded, for example Chip-Base's "hover" and "full keyboard accessibility" (description, VERIFIED). They need native wording under the contract-validation ballot before D6's static half can count them. That is why T-9's timing matters to the slice.

- **The public-API pass** → § 2 WP4.
  - Chips are `public struct` with one `public init` each.
  - Icon-Base is `struct IconBase` with no public init: one of the 17 internal views (VERIFIED, `grep` in the four iOS files).
  - The chips' token enums and button styles are internal, and should stay so under the access-level rule.
  - On Android all four are top-level `fun` (public by default).

- **§ 4.2, the records I own**: I confirm each disposition.
  - **drawn-control-drift**: intake to D5 and D6.
  - **component repair**: intake. Its per-family removal depends on item A.
  - **readiness-tables**: intake, decided in requirements.
  - **hand-written readiness**: leave (fix-now, 16.4.0).
  - **#877's three**: intake. Their Triggers fire at `requirements.md`, so I draft both ballots before 132's requirements open, or I re-rule each record to its ballot PR in the requirements PR (T-9).

- **§ 4.2 "Citations that this rewrite moves"**: noted. #877 has not merged, so I will pin its Source lines to `design-outline.md @ a953ac70d` L7 / L33 on its own branch before it merges. That is a plain edit on an open PR, so no dated pointer is owed, and it changes no Trigger. Not done in this read-only round.

- **§ 8, my row**: "Lina 1" for R1 is right. Add **T-9's two ballot drafts (1–2 sessions)** before requirements. They are in no row today.

---

**Peter's questions in my domain** (lean and counter; no pick)

- **P-4, who may exclude a contract**: **lean: the closed list of reason classes**, approved once, with an out-of-list exclusion going to Peter. A web-worded contract gets native wording, not an exclusion (`accessibility_hidden` above is the model).
  - **Counter, surviving**: the list would be approved before any native contract test has been attempted, so its classes are guessed, not measured.
  - **Fold**: the contract-validation ballot carries a classification of the slice's 46 contracts per platform, done read-only from `contracts.yaml` before Peter sees the list, so the list is grounded in one family's real cases.
- **P-5, the adopter bar**: **lean: same bar, available**; D10 proves the path.
  - **Counter, surviving**: our application MCP indexes a consumer's components beside ours (the consumer root union, Spec 123 C3). An agent querying it sees adopter components with no evidence of the bar, next to ours that have it.
  - Served readiness for adopter components is 128's lane 3, so this is not 132's to fix. Until 128 lands, though, "available" is invisible to the agents that select components. It belongs in 128's inbound list, not in this outline.

**Team questions I own or co-own**

- **T-1**: answered above, converging with Leonardo. It closes in this round if he agrees at R2.
- **T-2, the first family**: **confirm Chip-Base, Chip-Filter, Chip-Input and Icon-Base**, with item A's packaging answer and the corrected cost reading.
  - **Adopter component (D10)**: something that composes a chip and reads only families that compile until #870 lands. For example, an adopter "FilterBar" row: a horizontal group of our Chip-Filter instances, with its own `defineComponentTokens` in spacing (gap) and sizing.
  - It composes one of ours, reads our tokens, uses only safe families, and has its own contracts (group label, selection count). The tasks round picks. Leonardo for the journey.
- **T-8, the readiness tables**: **lean: generate (A)**, keyed to the same source T-7 derives at publish, so 132's per-family readiness moves never hand-edit a served table.
  - **Counter, surviving**: a generator writing into `governance/**` makes every release's table change a governance-path edit, with its Edit-kind line and the lock refresh.
  - B (a guard) keeps the prose and is cheaper.
  - My record requires Thurgood's view on B to be quoted first. **I need it before I can answer finally.** Decided in requirements.
- **T-9, the two ballots**: I draft both before 132's requirements open.
  - The contract-validation ballot also carries P-4's list, with the slice classification above.
  - The access-level ballot carries Data's explicit-API input (DATA R1 O-16).
  - Both are record-first to Peter. Their records re-rule to each ballot's PR when it opens.

**Missing, beyond item A**: T-14, the manifest's family scope (item A). And a line in § 3's measured-cost record contents: **shared costs (blend, T-12, T-13) are booked apart from per-family costs.**

*Signed: Lina, 2026-11-27.*

#### [KENYA R1]

**Read at**: `spec/132-design-outline` `22e21990a` (draft #880), in my own scratchpad worktree. Read-only: nothing committed, pushed or edited on #880. One extra local measurement, the snapshot probe under T-13, was run in my #879 spike worktree and not committed; its test file was restored. **Verdict**: the outline is sound and I would take it to R2. Three corrections, one of them to my own number, and two gaps, all on the iOS side. Labels: **VERIFIED** (run or read by me, at the SHA named), **UNVERIFIED**.

**A correction to my own spike first.** #879's finding 4, which the outline carries into § 6 and T-12, undercounts.
- My grep matched `.system(size:` on one line only, and missed calls split across lines (`.font(.system(` followed by `size:` on the next line).
- **Recounted across lines: 30 `.system(size:` calls in 18 files**, still with 0 `relativeTo:`, `@ScaledMetric` or `dynamicTypeSize`. VERIFIED by `perl -0777` over `src/components/core/*/platforms/ios/*.swift` at `22e21990a`, `*Tests.swift` excluded; the tree is unchanged from `8553499b1`. The 18 files include **Chip-Base, Chip-Filter and Chip-Input, one call each** (for example `ChipBase.ios.swift` L236–239).
- **This changes § 2's bias reading**: the first family does carry T-12's cost, so the slice measures it.
- #879's README is mine to correct. I propose one correction commit on #879, with your go; it is draft and unmerged.

---

**Mentions (`[THURGOOD R1]`)**

- **[@KENYA] Is P-6 framed so the iOS 17 numbers decide between its three options? → design-outline.md § 5.1 P-6**
  - **Partly.** As framed, the probe measures **cost** (size, time, and whether the toolchain runs an iOS 17 runtime). That decides option 2, paying at releases, against the others. It does not measure the **risk** that option 1 accepts: that our components behave differently on 17.
  - **Change I'd ask for**: P-10's iOS 17 probe runs #879's nine fixture tests on the iOS 17 runtime, not only a hello-world boot. Then one run prices option 2 and tests option 1's risk, including whether T-13's hidden-view behaviour holds on 17 (UNVERIFIED there).
  - **A missing, cheaper option**: keep 17.0, and pay for **one** iOS 17 run at the support claim, not at every release. It sits between options 1 and 2, and I would add it.
  - **Option 3's "free evidence near the floor" needs a caveat.** `macos-15`'s 18.5 simulator (READ in my 129 inbound, from the runner-images readme of 2026-11-04) comes with that image's own Xcode. The harness pins Xcode 26.6 on `macos-26` (VERIFIED, `harness/pins.yaml` `ios:` at `22e21990a`). So the 18.5 evidence would come from a second toolchain, not the lane's. Whether Xcode 26.6 can run an 18.x runtime on `macos-26` is UNVERIFIED.
- **[@KENYA] Is P-10's iOS half the right ask? → § 5.1 P-10**
  - **Yes: local download, a CI grant, or "not now".** One sharpening: name the image.
  - **My lean** (Peter's to pick): the CI form on **`macos-26` with the harness's pinned Xcode 26.6**, downloading the iOS 17 runtime there. That measures the runner and toolchain the render lane would use, per run, which is exactly option 2's cost.
  - My 129 inbound's `macos-15` form measures a different Xcode. The local form uses this Mac's Xcode 27.2, which matches nothing in CI (VERIFIED: `xcodebuild -version`).
  - **Strongest counter**: the local download needs no grant and is quicker, and plenty of ships skip iOS 17 altogether. If Peter wants the decision sitting soon, "not now" is defensible, and P-6 is then put on the evidence there is: built for 17.0, tools verified on 26.0.
- **[@KENYA] Is § 6's summary of #879 faithful? → § 6, § 0**
  - Mostly yes. Two fixes:
    1. "XCUITest works for **D5's per-component checks**" (§ 6, first bullet) overreaches. The spike ran a plain SwiftUI fixture, and no DesignerPunk component (its README, "Not a gate"). Read it as "works on a plain SwiftUI fixture styled with generated tokens; no DesignerPunk component was rendered". § 6's lead paragraph already says so; the bullet should too.
    2. **Finding 4's count**: 30 calls in 18 files, including the Chip family (above), not 26 in 14. This also applies to T-12's row and § 0.
  - The rest matches the README (VERIFIED against #879 at `cabf37ada`): 9 tests, 0 failures, about 48 s; hidden views found in either modifier order; ink 0.0000 on the known-bad case under all four theme/scheme pairs; audit 3 of 3 planted defects and 0 on clean screens; iOS 17, CI, speech, the largest Dynamic Type size and reduce motion not run.
- **[@KENYA] [@LINA] T-13: which check proves "hidden from VoiceOver"? → § 5.2 T-13**
  - **New measurement, VERIFIED locally**: Xcode 27.2, iOS 26.0 simulator, the #879 fixture with one added test, run once and not committed.
    - An `XCUIElement` snapshot's `dictionaryRepresentation` for the hidden circle has the same keys as any visible "other" element: label (empty), identifier, frame, enabled, selected, `elementType` 1, and so on.
    - It has **no accessibility-element or hidden flag.** So nothing XCUITest exposes tells a hidden element from a visible one that has an empty label.
    - My Spec 129 R1 had already found that walking SwiftUI's accessibility tree from inside the process returns zero elements (`kenya-plan-r1.md` § 3, VERIFIED there). That rules out the in-app read the outline lists as a candidate.
  - **My proposal** (Lina's contract semantics decide; Stacy reads):
    1. **Static, the primary check**: a test reads that the component's decorative subtree carries `.accessibilityHidden(true)`. Candidates are ViewInspector (T-3's test-only dependency) or a source check in D6's static half.
    2. **Runtime, as the consequence**: in the D4 app, with **no** identifier on decorative parts (production components carry none), XCUITest counts the elements inside the component's frame. The decorative part must add none, and the parent's label must not repeat its content. Whether an un-identified hidden view is absent from the query is UNVERIFIED. That is one more local probe, about 15 minutes, which I can run in the design round.
    3. **Speech**: a labelled device read (P-3), never claimed by a simulator.
  - **What I would not accept**: `XCTAssertFalse(exists)` on an identified element. The fixture-only wrapper still works, but only as a render-and-ink check; it proves nothing about hiddenness.
- **[@KENYA] [@DATA] § 7, merge preconditions 1–3, and T-11 → § 7**
  - **1. Accepted.** #880 now exists, so the Trigger's own text on #868 ("When the outline's PR opens, its owners re-token this line to `merge:#<N>`") is owed now. It is Data's line, and I co-sign.
    - **Preference**: re-token on #868 before it merges, so `main` never carries a stale `release:next:phase-1` for a PR that exists.
    - If #868 merges first, the re-token rides #880 with the close. That is harmless: the close is in the same diff, and the squash commit is its own ancestor.
  - **2. Accepted, with the dependency stated.** The iOS 17 probe cannot run before P-10 is answered. So Peter's sitting 1 (P-10) precedes the decision sitting, as § 8 already orders.
  - **3. Accepted.** The close (rule 5: the dated outcome line, then the archive move) is Data's act and mine, committed on Thurgood's branch at his signal so the splice order holds.
    - The close also adds a dated pointer in my rule-10 section, because its cites move at this merge: item 1's "`design-outline.md` § 3" was the placeholder's, at `a953ac70d`. Now item 1 → P-6 (§ 5.1) and § 4.3; item 2 → § 6 and P-10; item 3 → § 4.3.
    - **Checked** (VERIFIED at `22e21990a`): § 4.2 row 1, § 4.3 and P-6 name all three items. So the close's check that "the outline names them" passes.
    - I do not edit #868 now.
  - **T-11: no change at this merge** (VERIFIED, `docs/consumer/INSTALL.md` L180–196 and `governance/DesignerPunk-Integration-Guide.md` L179–210 at `22e21990a`). The Native status note names "Spec 132", not the goal record, and every line in it stays true at this merge.
    - One line I checked deliberately: "the token files `generate` writes compile … not run on any device or simulator". My spike did run generated tokens in an app on the iOS 26.0 simulator. But the spike is a local probe, not one of "DesignerPunk's checks", and a claims pass cannot re-run it. Saying "rendered on iOS 26.0" to adopters would overclaim. Leave the line as written.
    - The passage changes at the first support claim (P-2, P-7), and the note's own last line says so.

---

**My own review (the iOS half)**

- **§ 2 "The app" (D4), iOS, the shape is right** (plan-r2 § 3; the goal record's superseded-shape note):
  - `generate` writes the root `Package.swift`;
  - the app in `ios/` adds it as `.package(path: "../..")`;
  - plain `import`;
  - Swift 6 mode for the components set in that manifest (§ 4.3).
- **Gap, the D4 iOS app needs a UI-test host, so an `.xcodeproj`.** SPM alone cannot host XCUITest. #879 is evidence for T-3: a hand-written `objectVersion = 77` project with synchronized folders, a shared scheme and no generator built and ran with no XcodeGen (VERIFIED, `fixture/RenderSpike.xcodeproj` on #879). That favours "hand-written" for T-3. The counter: synchronized folders need Xcode 16 or later to open, and a hand-written `pbxproj` is hostile to review. A pinned XcodeGen makes the project a reviewable YAML. The fork is Data's and mine, in the design round.
- **Gap, CI grants for 132's own lanes are not named.** The outline names the `.github/**` grant for Data's probe (§ 6) and his toolchain builds (§ 4.3), but not for **132's iOS render lane and D4 app build**. Those are new or changed workflows, and a tasks row never grants a `.github/**` path (README rule 8; Task Completion Protocol § "Coherent Units (the merge granularity)"). I'd add one line to § 2 or § 3: each platform's lane workflow takes an issue-row grant filed before its unit. Otherwise the tasks round discovers it late.
- **The iOS render lane in CI is unmeasured.** The spike ran Xcode 27.2 and iOS 26.0 on this Mac. The lane would run Xcode 26.6 on `macos-26`, and which simulator runtimes that image carries is UNVERIFIED. § 6's "What the probes cannot settle" says this generally; I'd say it per platform: the first CI run of the iOS lane is its own measurement, and macOS minutes are the § 3 record's scarce column.
- **§ 4.1 (#870), iOS**: accurate as I measured it (VERIFIED in my #870 consult). The interim family list matches the families that compiled in my probe.
- **The 20 views (§ 2 WP4)**: Icon-Base is among the 17 `internal` views (goal record's access-pass list, VERIFIED). So the slice also exercises the public-API pass, as plan-r2 intended.
- **§ 8, my row**: the spike is 1 session, spent; the iOS 17 run is 0.5–1 if P-10 says go. This R1 entry is about 1 session, including the T-13 snapshot probe. The T-13 consequence probe adds about 0.25 in the design round.

**T-5 (theme family persisted form, co-owned with Data; closes in the design round; this is my lean, not a decision)**
- **Lean: declare a `String` raw value on `<Name>ThemeFamily`, with the case names as the values**, and treat it as public API under D9's diff. Point 1 of `.kiro/issues/2026-11-06-theme-family-persisted-form-for-132-d5.md` says this is additive.
  - Why: it makes `@AppStorage` work directly. A typecheck of `enum ProbeThemeFamily: String, Sendable, Hashable, CaseIterable` bound to `@AppStorage("theme.family")` with a `Picker` passed at iOS 17.0, Swift 6 (VERIFIED, `swiftc -typecheck`, toy file).
  - Without it, adopters persist `String(describing:)`, the undeclared contract the record warns about.
- **For Data**: if Android declares the same strings, a product that syncs the preference across platforms gets one value set.
- **Surviving counter**: the raw value is the adopter's config theme name. Renaming a theme in their config then silently orphans stored preferences. So 132's documentation (point 3) needs a migration line, and D9's diff must report a removed case as breaking.

**T-12 (fixed fonts; I'm consulted, Ada, Lina and Leonardo decide)**
- **iOS lean: fix through the tokens, not a blanket exclusion.** Accessibility-first is a core goal, and WCAG 1.4.4 (resize text) is the case the audit is catching.
- **The mechanism exists on iOS 17** (training data, UNVERIFIED by a run):
  - `Font.custom(_:size:relativeTo:)` for a named family;
  - `@ScaledMetric(relativeTo:)` feeding `.system(size:)` for the system family.
  - Either needs a text-style anchor per typography token, which is Ada's call.
- **Surviving counter**: scaling text in fixed-height components (badge counts, chips sized by sizing tokens) breaks layout at accessibility sizes. Some components may warrant a per-component exclusion with a reason (a P-4 case), and the repair is layout as well as font.
- **Sizing note**: 30 calls in 18 files, including the whole first family. So the slice prices it.

**P-6 and P-10**: answered under the mentions above.

**#868's "§ 3" cite**: it maps to P-6 and § 4.3 (item 1), § 6 and P-10 (item 2), and § 4.3 (item 3). The dated pointer rides the close commit (§ 7 item 3). Not edited now.

#### [DATA R1]

Read at `22e21990af8fcd41a79a539ae448c55969691d26` (`spec/132-design-outline`, draft #880) in my own scratchpad worktree. Labels:
- **VERIFIED**: I ran or read it myself.
- **REASONING**: an inference.
- **UNVERIFIED**: nobody has checked it.

**Verdict**: the Android half is seeded faithfully, and I would take the outline forward. The changes below are corrections and additions, not objections, except one. Every 132 CI lane is a `.github/**` change, and the outline does not name or cost the grants those lanes need (Own review item 3).

**Mentions first**

- **[@DATA] T-13, the Android twin** → design-outline.md § 5.2 "T-13"
  - **Android has a direct oracle that iOS lacks** (REASONING, from Compose's test API):
    - TalkBack reads the semantics tree Compose builds.
    - A Compose UI test reads that same tree and can assert the property that hides a node, `SemanticsProperties.HideFromAccessibility` (formerly `InvisibleToUser`), or that `clearAndSetSemantics {}` emptied a subtree.
    - So "hidden from TalkBack" can be a positive assertion on the property, not an `exists` check. Each assertion takes a known-bad case: the same view with the modifier removed must fail.
    - This runs under Robolectric, because semantics need no drawing, so it does not wait on the emulator.
  - **Caveats:**
    - The property's current name in the BOM we pin is UNVERIFIED, since my API knowledge has a cutoff.
    - Compose's automated accessibility checks (`enableAccessibilityChecks`) are the Android counterpart of `performAccessibilityAudit`, also UNVERIFIED for the pinned BOM.
    - Spoken output stays outside done, as on iOS.
  - **For the design round**: the two platforms answer T-13 differently. Android asserts the semantics property; iOS needs one of Kenya's candidates. D6's checker should accept a per-platform oracle name for the same contract.

- **[@KENYA] [@DATA] § 7 merge preconditions 1–3** → design-outline.md § 7
  - **Precondition 1: agree, and it is done.** #868 merges first. I re-tokened the record's Trigger to `merge:#880` on #868 at 2026-11-27T17:07:02Z (`9e7739a15`), as my previous line there said the owners would once the outline PR opened. Kenya's co-signature is owed on that branch.
    - The close still goes in #880's own diff (precondition 3). With the token at `merge:#880`, the record fires at this merge, and the close commit is an ancestor of the merge commit, so it does not lapse.
    - If #880 is closed without merging, the Trigger line says the owners re-rule it.
  - **Precondition 2: agree.** The Android probe is now unblocked: #878 merged at 2026-11-27T17:01:22Z (Peter, "878 is merged"), and its fixing PR runs the probe on its own branch.
  - **Precondition 3: agree.** Kenya and I commit the rule-5 outcome line and the `git mv` to `archive/` on `spec/132-design-outline`, after the round folds and before the PR leaves draft.
  - **An ordering constraint the outline does not state:**
    - The probe's fixing PR appends its result to the goal record, which is what the grant record says.
    - This PR archives that record, and an archived record's content is never edited again (README rule 2).
    - So **the probe's fixing PR merges before #880**. If it cannot, its result goes under `.kiro/specs/132-native-components-in-app/evidence/`, with the pointer in the outcome line instead.
    - Precondition 2 already puts the probe before the decision sitting, which precedes this merge, so in practice this holds. It should still be written down.

- **[@KENYA] [@DATA] T-11, the "Native status" passage** → design-outline.md § 5.2 "T-11", § 7 item 4
  - **I would not change it at this merge.**
    - The passage (`docs/consumer/INSTALL.md` L180–L194; Integration Guide L194, VERIFIED) names "Spec 132" in prose and no record path.
    - "Spec 132 is the second part … Support for building a native product starts with that work, not before" stays true at this merge.
    - Pointing an adopter-facing guide at a spec directory or an archived record would expose planning paths that the guide does not otherwise use.
    - It changes when "This guide will say so here when native support exists" comes true, which is P-2 and P-7's event.
  - **One wording nit, for whoever edits it next**: "Spec 129 … is the first part. It makes …" is present tense for a spec that has closed. It is still true, so this is not urgent.
  - Kenya co-owns this answer, and I have not coordinated with her.

- **[@DATA] #878** → design-outline.md § 6
  - **#878 needs nothing more from Peter.** He merged it at 17:01:22Z, which activated it by its ARMING terms. The fixing PR runs the probe on its own `pull_request` runs, so no merge has to come first.
  - **One case would come back to Peter: a licence prompt.** The workflow accepts no licence. If the system image asks for one, the run fails, I stop, and the question goes to him.
  - **Where the result goes.** The grant record says the fixing PR records the full result in the goal record's dated section, not a pointer, with the run URL and every `render-probe:` line pasted, because artifacts expire. § 6's last column ("the grant record's fixing PR, with a pointer in the goal record") should match: **the result in the goal record, written by the fixing PR**.
  - **Update § 6's state cell**: "grant active, #878 merged 2026-11-27T17:01:22Z; the fixing PR runs it".
  - **Update P-10's Android half**: answered.

**Own review (Android half)**

1. **§ 4.1, the interim rule for D10 is too wide on Android (VERIFIED by emitting).** → design-outline.md § 4.1 "#870"
   - **Method**: I packed `3a3bd072b`, generated a consumer with one value-path and one reference-path component token per family, and read the emitted `ComponentTokens.android.kt` against `DesignTokens.android.kt`. I did not compile, because this machine has no JDK.
   - **Reference path.** All twelve "families that compile" resolve to a member of the right type, because the `val`s carry no type annotation.
   - **Value path.** It emits `String(token.value)` for every family except the five with `.dp` and fontSize with `.sp`. So:
     - opacity, lineHeight, density and blend come out as `Double` (`0.08`), where the primitives are `Float` (`0.08f`);
     - breakpoint comes out as `Int` (`320`), where the primitive is `Float`;
     - letterSpacing comes out as `Int` (`0`), where the primitive is a `TextUnit` (`(-0.025).em`).
   - Kotlin does not widen `Double` to `Float`. Each of these compiles where it is declared and fails at a component's use: REASONING, high confidence.
   - **So on Android the safe interim set is**:
     - spacing, sizing, radius, tapArea, borderWidth and fontSize by either path;
     - opacity, lineHeight, density, letterSpacing, blend and breakpoint **by reference only**.
   - The colour, fontWeight, fontFamily, duration, easing and scale findings are in my #870 consult answer: duration, easing and scale fail by reference, and only duration is right by value. #870's fix should take the value path for these six too. Ada's call.
   - **§ 4.1 also reads "Android … was not compiled (Ada; Data not yet consulted)" for #873.** That is still true: I have not read the product-token Kotlin emitter. Ask me in R2 if it should be checked before requirements.

2. **§ 4.3 "Data": correct, with one route fix.** → design-outline.md § 4.3
   - The bullets match my inbound (`inbound-from-data-design-2026-11-05.md` L247–L268) and ballot `2026-11-05-core-goals-android-minimum` F-1 (iii).
   - But "its CI change needs your go when 132's tasks ask" predates the 2026-11-07 class rule: a tasks row never grants a `.github/**` path (README rule 8). The two range-end builds therefore need an issue-row grant, as #878 did.
   - **Peter has since ruled that an obligation always needs an issue record** ("Re: 3, Align with Thurgood"). I am filing one rule-10 record for both Android items, the range numbers and the API-26 floor test, on its own PR. At that PR's merge, § 4.3's line should cite that record, not my inbound.

3. **Missing: every 132 CI lane is a `.github/**` change, and the outline neither names nor costs the grants.** → design-outline.md § 2, § 8
   - The render lanes (D5), the D4 app builds and their anti-copy check, D8's sample builds, D9's upgrade build and API diff, and P-9's two range-end builds each add or edit a workflow.
   - **None can ride a tasks row** (README rule 8; ballot `2026-11-07-github-grants-are-issue-row-grants`). So each unit costs a grant record PR, Peter's merge, Stacy's ARMING read at two merges, and, where a lane becomes required, a promotion.
   - § 8 costs one grant (mine). § 2's table names no grant.
   - **This is the class gap, and two options are visible. I pick neither; this is for the design round, and for Peter if it becomes a scope ask:**
     - (a) **one grant per unit**, filed at its tasks round. Exact, but it multiplies Peter's merges by the number of families.
     - (b) **one standing workflow-scope ballot for 132's lanes**, the way ballot `2026-09-27-ci-regime-standing-scope` M1 gave Thurgood `lane-timing.yml`.
   - **Cost of (b)**: it is a charter change, so a ballot. Stacy's "attack the width" review applies, and M1's own counter-argument ("permanent scope for temporary work") holds against it.
   - **What survives**: (a) is cheap per event and adds up across ten-plus families. (b) is cheap per event, and its width is the risk.

4. **§ 6's Android row** → design-outline.md § 6
   - The state cell needs the update in Mentions above.
   - **One measured fact the row should carry once the probe runs**: the runner image version. Image 20261122.23 changed the JDK under us on 2026-11-27, and the fix was #867. KVM availability can move the same way.
   - So the probe is one sample, and D5's lane stability is a separate, later read. The grant record already says this.

**§ 5.1, leans and counter-arguments (Peter decides; no pick here)**

- **P-8, a billed larger runner** → design-outline.md § 5.1 "P-8"
  - **Lean**: keep it conditional on the probe, as the plan says.
  - **The options should gain a fourth**:
    - Robolectric with native graphics, `@GraphicsMode(NATIVE)`, which draws real pixels on the JVM. Whether the pinned Robolectric supports it for our Compose BOM is UNVERIFIED, and my knowledge has a cutoff.
    - That would let D5's ink check run with no emulator.
    - It would be labelled as its own evidence kind, `renders (Robolectric native graphics)`, below `renders (emulator, API n)` and above plain Robolectric.
  - **A fifth option**: the emulator lane on a billed runner only at unit merges and releases, with Robolectric on every PR. That limits the cost.
  - **Strongest counter-argument**: neither JVM option is "in the app" in Peter's sense ("will successfully render, in the app as described"). If KVM fails, the honest choice is billed minutes or a lower, labelled kind of evidence, and the fourth option must not be presented as closing that gap.
  - **Evidence owed**: the probe. If KVM fails, also the price of a larger Linux runner for this public repository (UNVERIFIED).

- **P-9, the toolchain range numbers** → design-outline.md § 5.1 "P-9"
  - **Lean**: as framed. Asked after D4 builds both ends, then approved together.
  - **Two additions for the row**:
    1. The two range-end builds are a `.github/**` change, so they need a grant (Own review item 2).
    2. "The range" should name each axis: AGP, Kotlin (with the Compose compiler plugin, which is versioned with Kotlin) and the Compose BOM.
  - **The API-26 floor is a separate axis.** It is already ruled, and its test is the record I am filing.
  - **Counter-argument**: a range proven at its two ends says nothing about combinations in between. An adopter on a mid-range AGP with an old Kotlin is untested. The mitigation is to state the range as "built at these two points".

- **P-10, Android half: answered.** #878 merged at 2026-11-27T17:01:22Z.

**§ 5.2, team questions I own or co-own**

- **T-5, the theme family's persisted form (Kenya and Data; design round)** → design-outline.md § 5.2 "T-5"
  - **Android lean (REASONING; decided in design with Kenya):** do not rule the Kotlin enum's `name` the contract.
    - `name` is the generated Pascal-case identifier, so a change to the generator's casing rule would break every stored value.
    - Declare a stable `key: String` on each entry equal to the registered theme's config `name` (`base`, `wcag`, and so on), with a `fromKey(String)` lookup that returns `null` for an unknown key. The app falls back to `Base` on `null`.
    - Store it with DataStore Preferences.
    - Store the scheme choice (system, light or dark) separately, because dark is the provider's `darkTheme` argument, not a family entry.
  - The iOS twin would be a `String` raw value equal to the same key. That gives one persisted value across platforms, which Leonardo's original ask was about.
  - **Counter-argument**: a key equal to the config `name` breaks when an adopter renames a theme. That break is the adopter's own config change, which they can see. A break caused by the generator's casing would not be visible to them.
  - **What I need**: Kenya's read on iOS raw values. The record's Trigger, `path:.kiro/specs/132-*/design.md`, already holds it.

- **T-11**: answered under Mentions.

- **T-3 and T-10 (co-owned; design round), Android notes only:**
  - **T-3**: the emulator and Robolectric split follows P-8's answer. Robolectric carries semantics, input and layout either way.
  - **T-10**: our Android distribution is **source**, compiled in the adopter's build, so binary compatibility is not the contract; source compatibility is. A public-API dump is still the right instrument for D9's diff. Candidates: the Kotlin binary-compatibility validator's `.api` files, or the Kotlin Gradle plugin's built-in ABI validation, both UNVERIFIED for Kotlin 2.4.21. It should be read as an **API-surface** diff, not as an ABI promise.

**§ 4.2, records I own**
- **The goal record**: intake, closing in this PR, with the corrections above (Trigger now `merge:#880` on #868; the probe's fixing PR merges first).
- **The theme-family record**: intake at `design.md`, as proposed.
- **#878's grant record**: "leave", as proposed. It closes at its fixing PR.
- **Add one row** once my rule-10 record's PR exists: the Android toolchain range and API-26 floor test record, with disposition **intake** and its Trigger as that record says.

**§ 8, my row** → design-outline.md § 8
- **The probe**: 1–1.75 is fair if the run works first time. If the system image or KVM step needs iteration, add 0.5.
- **New**: the rule-10 record, 0.25.
- **New, unsized**: the per-unit grants (Own review item 3).

*Signed: Data, 2026-11-27.*

#### [LEONARDO R1]

**Read at**: `spec/132-design-outline` @ `22e21990af8fcd41a79a539ae448c55969691d26` (merge-base with `origin/main` is `8553499b1`), in a scratchpad worktree. Source reads are at `8553499b1`. Also read: plan-r2 at `b89163c41`, and Lina's `rendering:` record on #877 at `67aadfc72`. Read-only; nothing committed.

**Verdict**: the outline is a faithful seed of plan-r2, and I accept it as the basis for requirements, with five corrections in my domain:
1. D8's population is named wrongly. The error is mine, from plan-r1.
2. T-12's count misses the first family.
3. The list of overlays to flip, and the selection path, both leave out the consumer seat that chooses components.
4. P-7 has a semver boundary that "per family" does not yet answer.
5. T-10's tools measure binary compatibility, but under Model B adopters are broken by source changes.

None of these re-opens a ruling.

---

**Mentions first**

- **[@LEONARDO] T-1: one `rendering:` field, or one plus `platformParts:`? My answer is one field, and I withdraw `platformParts:`.** → design-outline.md § 5.2 T-1
  - **Input-Text-Base on iOS is drawn chrome around a system field.** VERIFIED at `8553499b1`, `InputTextBase.ios.swift`: `SecureField` at L274 and `TextField` at L298, each styled by `InputTextBaseFieldStyle`, with `.background` and `RoundedRectangle` overlays at L475–L481. The system draws the text, the caret and the selection, and we draw the container.
  - **It is the only such case.** VERIFIED by `grep` over every component's iOS and Android source for `TextField|SecureField|Toggle|Picker|Slider|DatePicker|Stepper|TextEditor` and their Compose twins. The only non-preview hit is Input-Text-Base. The `VerticalListButtonItem` hit at L811 is a preview `Toggle`. Android uses `BasicTextField` with a `decorationBox` (L264, L329), so Compose draws the text with our style.
  - **Why I withdraw it.** D5 already keeps a list, per component, of the properties it compares against token values (plan-r2 § 1, "D5 details", "Token check"). That list is where "sample the chrome, not the field" belongs. `platformParts:` would say the same thing in a second place, for one component. Kenya's spike points the same way: the ink check already "picks the floor per element class" (outline § 6).
  - **What the one field must carry**: `kind: drawn`, with a `reason` that names the system-drawn part. For example: "drawn container around the system text field; text, caret and selection are the system's". Consumers need that sentence. The caret and selection follow the platform tint, so an adopter's theme reaches them only if the component sets that tint (UNVERIFIED whether ours does; Lina or Kenya to check).
  - **When to revisit**: a second component that wraps a system control, such as a future text area, picker or slider. At that point a per-component sample list is the wrong home, and a schema field earns its place.
  - **Surviving counter**: a reason written in prose is not machine-read. If D7's served readiness or a consumer agent ever needs to know "which parts does the adopter's theme not reach", that will have to become structured data later.
  - This converges with Lina's 129 position, so T-1 can close in this round.

- **[@ADA] [@LINA] [@LEONARDO] T-12: fix the fixed font sizes, or exclude the Dynamic Type audit? Fix them. And the count is larger than the outline says, including in the first family.** → design-outline.md § 5.2 T-12, § 2 "What the first family carries today"
  - **The count**: 26 lines in 14 files is right for a single-line grep (VERIFIED; I re-ran it). It misses the multi-line form `.font(.system(` with `size:` on the next line. VERIFIED at `8553499b1`, `git grep -n -E '\.system\($'` finds four more:
    - `ChipBase.ios.swift` L237;
    - `ChipFilter.ios.swift` L262;
    - `ChipInput.ios.swift` L231;
    - `NavHeaderPage.ios.swift` L148.

    The total is **30 lines in 18 files**. **Three of them are in the first slice.** So T-12 has to be decided before the slice's D5 lane, not only for later families. And § 2's "most of the slice's cost is the app, render and contract work" needs this one iOS repair item added. Kenya should confirm that the audit flags the multi-line form too (REASONING: it is the same call).
  - **Why fix rather than exclude (the product view)**:
    - This is a platform-parity defect in accessibility, not just an iOS tooling cost. Android font sizes are `sp` (VERIFIED: `src/build/tokens/TokenIntegrator.ts` L240, `defaultTypographyUnit … 'sp'`), so they follow the user's font scale. Web uses `rem`. Only iOS ignores the user's text size.
    - An exclusion would write that parity break into "as described", and into a P-4 reason class.
    - It would also hand the defect to adopters. An adopter who runs `performAccessibilityAudit` in their own app gets our findings in their results.
  - **Shape (a suggestion; the mechanism is Ada's and Lina's)**: put scaling in the type tokens, not in each component. Each typography token would carry the text style it scales with, which the component reads through `@ScaledMetric(relativeTo:)` or the equivalent. That way 18 files cannot drift apart.
  - **Surviving counter**: scaled chips and inputs grow at the largest sizes. That moves layout risk into D5's largest-Dynamic-Type variant, and may expose truncation contracts that were never tested. That is the right place for the risk to show, but it adds cost to D5's iOS repair.

- **[@LEONARDO] P-2 and P-7 together: under "per family", is the first family's release the first support claim, and do the overlays flip then? Yes to both, with three conditions. Peter decides; this is my consumer voice, not a pick.** → design-outline.md § 5.1 P-2, P-7; § 7 "What does not change"
  - **Yes**: under per family, the first family's release is the first support claim, limited to the components it names. The overlays flip in that release. A product that can start on Chip and Icon while the overlays still say "Don't start a new native product" is a contradiction an adopter's agent will obey.
  - **Condition 1: the flip has to cover the seat that selects components, not only the seats that build them.**
    - plan-r2 § 4 flips `canonical/profiles/consumer/{kenya,data}.overlay.md` L24 only (VERIFIED). The consumer Leonardo overlay carries no native or readiness rule (VERIFIED: `grep` for native and readiness in `leonardo.overlay.md` finds only the identity line).
    - Under per family, consumer Leonardo writes the screen spec, and he would select Input-Text-Base for iOS as readily as Chip-Filter.
    - VERIFIED in `application-mcp-server/src/query/QueryEngine.ts` L299–L300: `find_components`' `platform` filter keys on declared `platforms`, not readiness. Readiness rides along on the summary. `validate_assembly`'s source has no readiness check (`grep` in `src/validation` finds none).
    - So "the CHANGELOG naming the ready ones" is a list only humans read. Agents read the MCP.
  - **Condition 2: the overlay text should point at served readiness, not list families.** Write the flipped text once, at the first claim, along the lines of "native is supported for the components whose served readiness on that platform is at the D5/D6 tier". Later families then become ready through D7 alone, with no charter edit and no re-signing each release.
    - **This is my class-level option**: readiness is the oracle at selection time. A `validate_assembly` warning when a component is not ready for the assembly's target platform would make it mechanical.
    - Cost: one warning rule in Lina's application MCP, plus one sentence in three overlays (Thurgood's text under F12′).
    - Surviving counter: until D7 lands, readiness is hand-written and disagrees with generated readiness (`.kiro/issues/2026-11-05-hand-written-readiness-claims-disagree-with-generated-readiness.md`, outline § 4.2). So condition 2 depends on D7 shipping no later than the first claim.
  - **Condition 3, for P-7: the semver boundary does not follow family lines by itself.**
    - The module is one package per platform, so an adopter can `import` and call a not-ready family's public API from the first claim onward.
    - The public-API pass happens per family (§ 2, "through compile at zero, public API, …"), so later families' public API will still change after the claim.
    - Either those changes count as breaking (each one costs a major), or the not-ready API is marked unstable in code.
    - Kotlin has an idiom for this: an opt-in annotation (`@RequiresOptIn`). Swift has no public equivalent I know of: `@_spi` is underscored, and deprecation messages are a workaround. REASONING; Kenya and Data to confirm.
    - P-7's options should say which of these applies. Otherwise "17.0.0 marks it" and "a minor" both leave the not-ready families' semver status undefined.
  - **Sequencing that P-7 implies, for D9 (1)**: the upgrade rehearsal upgrades "the D4 app … from the previous release". At the first claim, no earlier release has a D4 app, so D9 (1) proves nothing that release. The D4 fixture has to ship in a release before the claim, and "7 (a)" already allows that in a minor.

---

**My own review (scope: the fixture app, the adopter journey, the walkthrough, D8, D9, T-10)**

- **D8's population names a surface we do not ship, and leaves out the one we serve.** → design-outline.md § 5.1 P-1; plan-r2 § 1 D8
  - D8 says "every native code sample served to adopters, in the component READMEs and the guide's walkthrough". That wording is mine (`leonardo-plan-r1.md` L94), and it is wrong:
    - The package's `files` list ships `src/components/**/{*.schema.yaml,contracts.yaml,component-meta.yaml}` and not component READMEs. VERIFIED by `package.json`.
    - The docs MCP serves `governance/` (VERIFIED: `mcp-server/src/index.ts` L61). The application MCP indexes no component README (VERIFIED: `grep` finds only schema-reference comments).
  - The native samples adopters actually receive are in the family docs. Per `grep` for fenced Swift and Kotlin blocks in `governance/Component-Family-*.md` (VERIFIED):

    | Family doc | Swift blocks | Kotlin blocks |
    |---|---|---|
    | Chip | 3 | 3 |
    | Icon | 1 | 1 |
    | Badge | 3 | 3 |
    | Button | 3 | 3 |
    | Container | 2 | 2 |
    | Form-Inputs | 8 | 5 |

    The guide has 0 (VERIFIED). The Chip family has no README at all (VERIFIED). So as written, D8's first-slice population is Icon-Base's README: 2 blocks, which nobody is served.
  - **Proposed population**, as an amendment to P-1's "approve as written", for Peter: "every fenced Swift or Kotlin block in a file the package ships or an MCP serves", found mechanically, as the governance-examples guard already finds `swift` and `kotlin` fences (`scripts/governance-examples/check.ts` L40, L186). READMEs could join as an internal extra, but they are not the promise.
  - **Samples are fragments, so D8 needs a per-family prelude.** VERIFIED in `Component-Family-Chip.md`: L209–L210 use `$isSelected`, L215 uses `isSelected`, and L252–L259 call `removeTag(...)`, none of them declared in the block. Extraction needs a declared context for each sample, such as a family prelude that declares the free names. That convention is mine to write, with Kenya and Data for the harness side.
  - By reading only, the Chip samples match today's initialisers on both platforms (`ChipBase.ios.swift` L176, `ChipFilter.ios.swift` L182, `ChipInput.ios.swift` L169; the Android `fun ChipFilter`/`ChipInput` at L198/L174). REASONING, not compiled.

- **The fixture app's content: one fixture screen as the single source for four D rows (a proposal for the tasks round).** → design-outline.md § 2 "The app (D4)", "True samples …"
  - **Catalog screen (D4, D5, D8)**: generated from the committed catalog, as Stacy requires. Each cell is built by **compiling that component's served sample**, wrapped in its prelude. That way the catalog builds exactly what the docs teach, and a sample that drifts fails D4's build, not only D8's. The states shown per component come from its `contracts.yaml`. For the slice: Chip-Filter selected and unselected, Chip-Input dismissed, with and without an icon, a long label, and the largest Dynamic Type size.
  - **Product screen (131's rehearsal, D9)**: a filter-and-tags screen built only from the slice:
    - a row of Chip-Filter for multi-select;
    - applied filters as dismissible Chip-Input;
    - Chip-Base category labels;
    - Icon-Base inside them;
    - the adopter component.

    It grows as families land. It should be written as a **real screen spec in the fixture adopter's own `product/`**, with Kenya and Data building from it. This repository has no `product/`, so that would be the first time the Product MCP's screen-spec path runs for native. It also gives the approval-state record (131) and the Q3b theme record a real screen to read.
  - **Adopter component (T-2 input; the team picks at the tasks round)**: a `FilterBar` that composes our `ChipFilter`, with its own `defineComponentTokens` file limited to spacing (gap, inset) and sizing (minimum height). Those families compile under § 4.1's interim rule. It uses no colour, so it stays clear of #870's colour fork and #873.
  - **Adopter theme (D4)**: built through the theme (semantic-override) path, recolouring something visible in the slice (the selected Chip-Filter's colours). It uses no product colour token, per § 4.1 #873. UNVERIFIED whether the semantic-override path reaches #873's emitter; Ada to say.
  - **Surviving counter**: a fixture `product/` and a single-source screen add authoring cost to the slice, and § 8 and plan-r2 § 8 leave D8 and D9 unsized. My cost is about 0.5–1 session for the screen spec and preludes, plus the walkthrough below.

- **The walkthrough, and the adopter journey.** → design-outline.md § 2; plan-r2 § 4 rows "Guide L394" and "L274"
  - **Under per family, the walkthrough ships with the first claim, not with "all of native".** The guide's stub says "This walkthrough is written when that support exists" (VERIFIED, L417). Its index row reads "(not yet; see the Native status note …)" (VERIFIED, L297). Both change in the first claim's release. The walkthrough is this fixture journey, using the guide's six parts:
    - Goal;
    - You'll need;
    - Ask your agent;
    - What the agent does;
    - How you know it worked, which is the D5 checks you can run;
    - If not.
  - **The step most likely to need the human is linking the package into an app project.** On iOS that is adding the generated root `Package.swift` to an existing `.xcodeproj`. An agent edits `project.pbxproj` badly, and Xcode's "Add Package" is a GUI step. Input to T-3, Kenya's call: whichever project form D4 uses is the one the walkthrough teaches. A plain `.xcodeproj` with a local package reference is what an adopter already has. An XcodeGen-only fixture would teach a path most adopters are not on. On Android, `settings.gradle` `include` plus `projectDir` is a text edit, and agent-friendly (REASONING).
  - **The route**: the guide is under `governance/`, outside my write scope. Per plan-r2 § 4, I draft in 132's folder and it is applied by grant. The tasks round should name that grant, and the edit kind for a guide change, as a Primary Artifact row.

- **T-10, D9's tools: source compatibility is the break an adopter meets, and the proposed Kotlin tool measures binary compatibility.** → design-outline.md § 5.2 T-10
  - Under Model B, adopters compile our source from `node_modules`. What breaks them is a source-level change, not an ABI change.
  - **Swift**: the API digester's API (source) mode fits, run through SwiftPM's `diagnose-api-breaking-changes` against a baseline (REASONING; UNVERIFIED on our generated root `Package.swift`).
  - **Kotlin**: the binary-compatibility validator dumps JVM signatures.
    - (a) Kotlin parameter names are not in those dumps, as far as I know (REASONING; Data to confirm). Renaming a parameter breaks every caller that uses named arguments, and our own served Kotlin samples teach named arguments (`ChipBase(label = "Category")`, `Component-Family-Chip.md` L165).
    - (b) The Compose compiler adds synthetic parameters that shift between compiler versions, which would add noise (REASONING).
  - **Proposal**:
    - D9 (1), compiling the previous release's D4 app and its D8 samples against the new release, is the oracle for source breaks on both platforms.
    - D9 (2)'s tools are early warning. Each is shown to bite on two known-bad cases: a removed public symbol, and a **renamed parameter**. That is D6's known-bad discipline applied to D9.
    - The baseline uses the fixture's fixed config (a non-`DP` abbreviation), because generated type names carry the adopter's product name.
  - Kenya and Data own the choice. It closes in the design round.

- **S-1 (web; tagged to me with Sparky)**: an unresolved `var()` renders silently with the property's initial value, which is a defect class web adopters would meet. My lean is that it does **not** ride 132's per-family units, where native cadence would hold it. Instead it becomes a rule-10 record owned by Sparky, with its own trigger, so it has a home. UNVERIFIED how far it overlaps 129's Req 1.6 `var()` reach, which Sparky already owns (129 `feedback/design.md` L1120). Sparky decides; if he finds it changes what a web adopter is promised, it goes to Peter. → design-outline.md § 5.3

- **§ 4.2**: I own none of the listed records. The `rendering:` record (Lina's; I am consulted) closes on T-1 as above.

- **§ 8, my row**: 0.5–1 for R1 holds. The D8 prelude convention, the fixture screen spec and the walkthrough draft are unsized in plan-r2 § 8. I estimate about 1–2 sessions across the slice (low confidence).

**For Peter, from my items** (for the batch after R2; none picked here):
1. **P-1**: approve D8 with its population corrected to shipped or served surfaces (above). This is a D-row wording change, so it needs his approval.
2. **P-2 / P-7**: whether the per-family claim comes with (a) readiness-referencing overlay text, including consumer Leonardo's, and a selection-time readiness check, and (b) a stated semver status for not-ready families' public API.

#### [STACY R1]

*I read draft PR #880 at `22e21990a` (branch `spec/132-design-outline`), its feedback doc and `evidence/facts-at-8553499b1.md`, in a detached worktree of my own, on 2026-11-27. For the activation read I also read #878 at its merge `822919318`. Only the activation read is an act. It is post-acceptance, because #878 merged at 2026-11-27T16:57:03Z; everything else here is read-only and I committed nothing. VERIFIED means I checked it at the head named, with the command or file named. UNVERIFIED means I did not check it. Every citation below is a committed path or SHA.*

**Verdict: the outline is sound for a first round, and my conditions 1 and 2 hold.**
- **Condition 1 holds exactly.** The acceptance sentence matches Peter's sentence byte for byte, and the narrowing is dated before 129's requirements merged.
- **Condition 2 holds, with one SHA to add.** The D1 amendment is cited from the native-plan `README.md` without a SHA.
- **The measured-cost record is not verifiable as written**, in two of its rows:
  - nothing committed counts sessions;
  - the 131 column has no producer.
- **Two § 5.2 options would change D5 rows without Peter**: T-12's "exclude the audit" and T-13's "labelled device read". The ballot sends one of them to P-4 by mistake.
- **T-6**: the known-bad half must run on every PR that touches a tested contract, not only at unit merges.
- **T-7**: D7's derivation needs its inputs committed.
- **#878's activation read is done** (below), and its line is owed under `.kiro/`.
- **Precondition 3 holds under rule 11** as it stands and as B2 was answered, provided the outcome line closes the whole record.

---

**Mention: `[@STACY]` (THURGOOD R1)**: "Is the measured-cost record's proposed content verifiable as written, and is anything in § 5.1 framed so that an answer would dilute a D row?" → design-outline.md § 3, § 5.1

**The measured-cost record (§ 3), row by row.** It is the input to Peter's re-placement of every remaining family against 131. If it can't be re-read, that decision rests on a report.

- **The window comes first.** Every count needs one population. **Proposed**: the record states its window as a first-parent commit range: from the merge that first commits 132's `tasks.md` to the merge of the unit that closes the first family. Every row counts over that range. Without it, "sessions spent" and "Peter's sittings" have no edges.
- **"Sessions spent, by seat and by work package, read from the first family's completion docs and their delegated-tier lines": not verifiable as written.**
  - Completion docs record no sessions. VERIFIED: `grep -c -i session governance/completion-documentation-guide.md` prints 0.
  - The `**Delegated-tier**:` line records the agent and tier, never a count.
  - So the row would be read from memory. **Proposed**: the tasks round declares a sessions line as an instrument (an M4 Instruments row) from the first family's first parent on. Each parent completion doc then carries `**Sessions**: <seat> <n>; …`, and the record sums those lines.
  - Or the row is labelled "the orchestrator's estimate" and is not compared like with like.
  - "A session" needs one definition in that line, for example one agent run that writes or reviews. Otherwise seats will count differently.
- **"Peter's sittings": verifiable if a sitting is defined as a distinct receipt time in a committed ruling or answer record inside the window.** That is decidable from git: dated `received …Z` lines in records added in the range.
- **"CI minutes by runner class": verifiable only if committed when the record is written.**
  - Run timing lives in GitHub, and artifacts and logs expire.
  - **Proposed**: the record carries a table of run ID, workflow, runner label and duration, pasted from `gh run view <id> --json` at writing. My pass then re-checks a sample while the runs still exist. This is "commit what you cite".
- **"Contracts tested, labelled and excluded, with known-bad cases, per platform": verifiable** if it is the D6 checker's committed summary at the closing commit, not a hand count.
- **"Defects found and where they were routed": verifiable** as the issue records added in the window that name 132 or a first-family component, by `git log --diff-filter=A` over `.kiro/issues/`, each with its owner.
- **"A per-family extrapolation, with its method stated and the slice's bias named": verifiable as to presence**: the method and the bias statement are there. It is not verifiable as to truth, so label it REASONING. The bias in § 2, cheap repair, should be stated with its count: 0 pinned entries on the slice's Chip components against 45 iOS and 89 Android left elsewhere (VERIFIED by Thurgood; I did not re-count).
- **"A column for 131": not verifiable, because nothing produces it.**
  - VERIFIED by the outline (§ 3): 131's outline carries no session estimate.
  - The record cannot measure 131, so the column is empty unless 131's formalizer sizes 131 by the same unit, sessions and sittings, over a stated scope, at the same time.
  - **Proposed**: name that act and its owner (Thurgood, as 131's formalizer) as owed before the record is written, or drop the column and say the comparison is one-sided. A one-sided comparison should not be presented as like with like.

**Does any § 5.1 framing let an answer dilute a D row?**
- **The § 5.1 questions themselves: no.**
  - P-1's "ask for less" is a D-row change, framed as one, and it is Peter's.
  - P-3, P-5, P-6 and P-7 change no D row.
  - P-4 is the only dilution route, and it says so ("leave it to the team (lets D6 be diluted)").
  - My lean on P-4: the closed list (the plan's), with each exclusion naming its class and the checker printing exclusions as a fraction of the per-platform denominator, so that CLOSEOUT and the measured-cost record report it.
  - **Surviving counter**: a class written wide enough admits dilution one item at a time, and the count shows the dilution but does not stop it. The list's wording is the real guard, and it comes with #877's ballot.
- **But two § 5.2 options change D5 rows, and § 5.2 is the team's** (my condition 2: a D-row change is Peter's):
  - **T-12, "or exclude the audit type with a reason. An exclusion is a P-4 case."**
    - D5's details at `b89163c41` require the run "at the largest Dynamic Type" and the blanket audit (D6 details). Excluding the Dynamic Type audit removes a D5 variant.
    - P-4 governs contract exclusions in D6's denominator, not D5's variants.
    - **Change**: "Excluding the audit type changes D5's details, so it goes to Peter as a D-row change (condition 2); fixing through scaled type does not".
  - **T-13, "a labelled device read" as one of the candidates.**
    - D5's "absent where `accessibility_decorative` applies" is a CI check in the table ("Each row is a CI context or a committed file"). A device read is a reading.
    - The audit, an in-app `isAccessibilityElement` read and the fixture-only wrapper are all mechanical and stay team choices.
    - **Change**: mark the device-read candidate "a D5 change, Peter's (condition 2), if chosen".

---

**My conditions 1 and 2** (my plan R1, `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/stacy-plan-r1.md` § 1) → design-outline.md § 1

- **Condition 1: holds.**
  - **The string match.** VERIFIED: § 1's acceptance sentence occurs byte for byte (`grep -cF`, 1 hit) in the charter where it was first written, `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` at `4a19ba6d3` (#266). It is also in the goal record at `8553499b1`.
  - **The dating.** VERIFIED:
    - Peter's "A yes, B (a), C yes" was received 2026-11-05T04:07:43Z (`peter-2026-11-05.md` L24).
    - Its record landed at `b89163c41`, an ancestor of `55004006b`, the first-parent merge that added 129's `requirements.md` at 2026-11-05T05:34:05Z.
    - So the narrowing is on record before 129's requirements.
- **Condition 2: holds, and needs one SHA.**
  - The outline cites the D-table as "plan-r2 § 1 … at `b89163c41`, with the D1 probe sentence replaced as the native-plan `README.md` records". The plan file is unchanged from `b89163c41` to the head (VERIFIED, `diff`).
  - The README amendment is cited without a SHA. VERIFIED: the README was last touched at `55004006b`, and its L23 holds the amendment.
  - **Change**: "… with the D1 probe sentence replaced as the native-plan `README.md` records at `55004006b` (L23)". Then the full table is two fixed texts at two SHAs.
  - The D-row details ("Details below this table") are part of the table. So the change list that condition 2 requires of 132's requirements covers them too, which is why T-12 and T-13 above matter.
  - § 1's sentence "A seat that changes a D row later needs his approval" is right.
  - Condition 2 also asks that 132's requirements list every change to a D row. **Proposed**: the requirements round's Context for Reviewers carries a "D-row changes since `b89163c41`" list, even if it reads `none`. That is the line my LENS read and my CLOSEOUT read check.

**Can D6, D7 and the measured-cost record be verified?** (The measured-cost record is above.)

- **D6 (contracts tested, labelled or excluded, and every test shown to bite):** checkable from git and committed files, with three provisos.
  1. **"The 288 effective contracts … fixed at a committed baseline"**: no baseline is committed yet. The count is UNVERIFIED by me. It becomes verifiable the day the baseline file lands with its SHA, and the D6 checker's PR should land it first.
  2. **"Pass or fail is read from the native result files … of the job that ran the test"**: JUnit XML and `xcresult` are artifacts, and they expire. Kenya also showed that a pinned Xcode patch is replaced, so old runs cannot be reproduced (my plan R1).
     - So CLOSEOUT cannot re-read a unit's evidence months later. **Proposed**: at each unit merge, the D6 checker commits its summary per platform: per contract, the tested/labelled/excluded state, the test ID, the known-bad result, and the run ID.
     - That committed file is what CLOSEOUT and the measured-cost record read.
  3. **"Denominator changes … need authority"**: decidable if every change line cites P-4's class, or Peter's dated answer for anything outside the list. The class list must be committed with #877's ballot before the first exclusion.
  - **"A device read names a human reader, the device and the OS version"**: that is a self-attested line, the same limit as the merge-hold check ("never who gave it"). Label it a reading in D7's evidence kinds, which `device-read (human)` already does.
- **D7 (readiness tells adopters what is proven):** verifiable if its inputs are committed.
  - "Derived at publish from the check results at the release commit" is the right rule.
  - But `scripts/release-publish.ts` builds "in a fresh clone at the version's tag" (register row `hermetic-publish-path`, VERIFIED). A clone holds no GitHub check results.
  - So the derivation reads either the GitHub API at publish, or a results file committed at S. Whether the hermetic rule allows a network read is UNVERIFIED by me, and that is T-7's census question.
  - **My lean: the committed file.** The step-6 record then carries the per-component evidence table that the derivation read, and RELEASE phase 2 can re-derive the packed readiness from committed inputs. With an API read, phase 2 can only trust the publish log.
  - **The script's owner is Ada** (VERIFIED: `scripts/release-publish.ts` is in `canonical/agents/ada.md`'s `writeScope`). T-7's owner column should name her.

**T-6: D6's known-bad cadence** (Thurgood, Lina; Stacy reads) → design-outline.md § 5.2

- **Not "unit PRs and CLOSEOUT" alone.** A known-bad case can rot unseen. A test edited so that its known-bad case no longer fails, merged between units, keeps a green D6 until the next unit or CLOSEOUT.
- At goal-done, D6 is "a required check on `main`" (plan-r2 § 1). A required check whose bite half never runs on most PRs does not check "every test is shown to bite" at the commits it gates.
- **My answer**: run the known-bad half on every PR whose diff touches a contract test, its component's source, the contract baseline, or the checker. That is a path filter, decidable from the diff. Also run it on every unit PR and at CLOSEOUT.
- A full every-PR run is not needed. The committed summary at each unit merge (D6 proviso 2) is what my CLOSEOUT reads.
- **Surviving counter**: the path filter misses a bite lost through a shared dependency, such as a test helper or a token change. That miss is caught at the next unit PR, so the window is at most one unit.

**T-7: D7's source** → design-outline.md § 5.2

- As above. The census is owed, because `scripts/release-publish.ts` is named in row `hermetic-publish-path`'s `checks` (VERIFIED), so a change to it is presumptively in scope.
- My lean is the committed results file at S, because it keeps phase 2's re-derivation possible.
- I would add Ada as owner.

**T-13** (Stacy reads): see the dilution point above. The three mechanical candidates are verifiable. The device read is a D5 change. The Android twin has the same split.

**#878: the activation read** (my ARMING row, the grant limb at activation; read after acceptance: #878 merged at 2026-11-27T16:57:03Z, merge `822919318`):

- **The diff at the merge**: one file, `.kiro/issues/2026-11-27-android-render-probe-workflow-grant.md`, 98 insertions (VERIFIED, `git diff --stat 822919318^ 822919318`).
- **The PR body** carries `**ARMING**: at this merge and at the fixing PR's merge` and `**Grant paths**: .github/workflows/android-render-probe.yml` (VERIFIED, `gh pr view 878 --json body`, read by this session).
- **No governance-law path.** The list is exactly `.github/workflows/android-render-probe.yml` (VERIFIED). It names no `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**` or `canonical/agents/**` path.
- **M1's excluded acts** (ballot `2026-09-27-ci-regime-standing-scope` § 3 clause 5: no new required context, no change to `EXPECTED_CONTEXTS`'s count, no removing or weakening a step, floor or execution assertion).
  - The record admits none of them, and lists all three as excluded, plus `REQUIRED_WORKFLOWS`, any other `.github/**` path and `native-harness.yml`.
  - It names and admits two acts that are not M1-excluded: the `pull_request` trigger with a two-path filter, and the `sudo` udev rule on the ephemeral VM.
  - Read: **passes**. VERIFIED at `822919318`.
- **The `**Deleted lines**:` block**: none. That is right for a new file. At the fixing PR, deletions on CI paths must read `0`.
- **Owed at the fixing PR's merge** (my second read):
  - its paths are a subset of the list as it stood at `822919318`;
  - `--numstat` deletions are `0` on CI paths;
  - the workflow's triggers and permissions are as admitted;
  - the probe's result is recorded there with rule 5's outcome line, as the record's Trigger says.

**Grant activation read**: .kiro/issues/2026-11-27-android-render-probe-workflow-grant.md @ 822919318

- That line must sit under `.kiro/`, where Thurgood's LIVENESS item 4 greps for it. A splice into this feedback doc reaches `main` only when #880 merges, and #880 is draft until Peter's decision sitting. **Owed by me**: a record-only PR that commits the line promptly, not this file.
- **The outline is stale on this point at its own head.** § 6 ("not run; the grant is filed", "activates when Peter merges it") and P-10's Android half ("merge Data's grant record, #878") predate the merge. The head `22e21990a` was committed at 16:59:34Z, 2.5 minutes after #878 merged (VERIFIED, commit time). **Change**: P-10's Android half is answered by the merge; § 6's state becomes "grant active at `822919318`; probe not run".

**Precondition 3 (the goal record's close in #880's own diff), against rule 11 as it stands and as B2 was answered** → design-outline.md § 7

- **It holds.**
- After #868 re-tokens the record to `merge:#880`, the event is #880's squash `E`. A close committed on #880's branch lands in `E` itself, and `E` is an ancestor of itself (`git merge-base --is-ancestor E E` exits 0). So under today's letter, "no commit that is an ancestor of the event's commit closed it" is false, and the record does not lapse.
- **Under B2 as answered** (F-1 (a), F-2 (A); still DRAFT, not ratified):
  - The #868 re-token is the setting commit of `merge:#880`, and that commit is not a re-rule. So the window at `E` holds only `E`, and only a close in `E` saves the record, which is the outline's plan.
  - Closes are not windowed and count after the record's last add at the root (true here).
- **What B2 adds that the close must meet: the close must close the whole record.** "An outcome of a part … closes nothing" (B2 R2 § 2, F-1 and F-2 answered).
  - The record carries obligations (1)–(3), Kenya's three iOS obligations and the Access-pass list. Its outcome line must say that it closes the record, and where each remaining item now lives: this outline's § 4.3 and § 6, #878's grant record for the Android probe, and § 5.1 P-6 and P-10.
  - An outcome line reading "obligations (2) and (3) met" without that would be a part-outcome under B2, and the record would lapse at `E`.
- **The iOS 17 runtime probe has no record once the goal record closes.** It is only in § 6 and P-10. That is acceptable while it waits for Peter's go: a go is a ruling that creates the obligation, and rule 10 then files its record in the PR that records the go. The orchestrator should carry that filing in the same batch as P-10.
- **If #880 stays draft across 16.4.0's S**: the record is open after its earlier lapses, so that S re-fires it. Its start is its previous firing event (`6f507c039`), and #868's re-token falls after that and re-rules it. So it does not lapse there, under today's letter or B2 (REASONING from the R2 text).

**§ 5.1: the other questions that touch my domain**
- **P-1**: approve as written, and make the requirements' D-row-change list mandatory (above). **Counter**: approving D4–D10 before a linked app exists invites the dilution my plan R1 named, "criteria written before the numbers get diluted when the numbers arrive". The list makes a later change visible, not impossible.
- **P-3**: (a), the device read as dated evidence and not a gate, with the reader, device and OS named. **Counter**: a named human is self-attested, because agents act through Peter's credential (131 ledger, VERIFIED at `8553499b1`). The read stays a reading either way.

**Standards implications**:
- a sessions line in parent completion docs, if the measured-cost record keeps its sessions row (→ Thurgood, the Completion Documentation Guide);
- the D6 checker's committed per-unit summary, so evidence survives artifact expiry (→ Thurgood, the checker's form).

**My counter-argument to my own review, folded back**:
- **The objection**: I ask for more committed files (a sessions line, CI tables, D6 summaries, a results file at S) on the spec whose cost decides 131's place. Every file adds to the very cost being measured.
- **Folded in**: each one replaces a reading that would otherwise be trusted. None adds a gate, and the sessions line costs one header line per parent.
- **HOWEVER, what survives**: the measured-cost record becomes the most heavily instrumented first family this project has run. Its numbers will be a little higher than an uninstrumented family would cost, and the extrapolation should say so.

**Points for Peter from this entry**:
- the T-12 audit exclusion and the T-13 device-read option are D-row changes, and his;
- P-10's Android half is already done (#878 merged at 16:57:03Z).
- Everything else is for the team or for Thurgood's text.

#### [SPARKY R1]

Scope: § 5.3 S-1, then anything web-facing in the outline. Read `design-outline.md`, `feedback/design-outline.md` and `evidence/facts-at-8553499b1.md` at `22e21990a`. The only `[@SPARKY]` question in `[THURGOOD R1]` is S-1.

**Verdict: S-1 is already carried, and the carrying is mine to correct.** The check exists and ships today. 132 owes no new web work for it. The outline should close S-1 by citing the existing instruments, not by placing new work. It does not go to Peter, because it changes nothing a web adopter is promised. Three smaller web items follow; one of them (item 4) may become a question for Peter.

**[@SPARKY] S-1: should 132 carry "a check that web component source resolves against a consumer's generated CSS"?**

1. **No new work: the check exists, and my 129 flag missed it.** In 129's requirements R1 (at `e5c358637`) I wrote "Nothing carries 'web component source … resolves its tokens against a consumer's generated CSS'". That was wrong when I wrote it. Spec 123 Task 6's **name contract** landed on 2026-09-27 (`d566b30ff`, #215) and does exactly this. Where it is held at `22e21990a`:
   - **Build time, against our own CSS.** `scripts/build-name-contract.ts` reads the compiled bundle `dist/browser/designerpunk.esm.js`, which has every component's CSS inlined, and collects each `var(--x)` reference and quoted `'--x'` literal. Its OWN-INDEX CHECK fails the build when a referenced name that the component does not define itself is missing from our generated web CSS. It also fails on any dynamic `var(--${…})` site that has no record. It runs in `npm run build`, and so in Consumer Guard through `prepack: npm run build`. (VERIFIED, Sparky: I read the script header L1–45, `package.json` `build` and `prepack`, and the `consumer-guard.yml` comment at L76–77. I did not run it.)
   - **In the adopter's install, against their CSS.** `sync` reads the packed `dist/name-contract.json` and reports any referenced semantic or primitive name that the adopter's generated `DesignTokens.web.css` does not define, with the message from INSTALL § 5, "When sync reports a missing token". The component tier is excluded under P1/DD17, because it comes from `@3fn/core/component-tokens.css`. (VERIFIED, Sparky, read: `src/cli/sync/NameContract.ts` L1–30.)
   - **Tested in the packed install.** In `tests/consumer-integration.test.ts`, case C6 (Spec 123 Task 9.3, L2027–2058) asserts that a fresh install reports clean, then removes one referenced semantic name from the generated CSS and asserts that `sync` reports it. Spec 129's 13.2 cases (L2561 onwards) cover the component tier's references and the upgrade that adds a reference. Spec 129 Task 8.4 (L491–566) covers `var()` resolution inside the generated CSS and the package's `component-tokens.css`. (VERIFIED, Sparky: I read these cases but did not run them. Their latest touch is `6f507c039`.)
   - **The check holds at this head.** I ran `generate:platform-tokens` in a scratch worktree at `22e21990a` and extracted every static `var()` in `src/components/core/*/platforms/web/*.{css,ts}`, tests excluded. That gives 247 referenced names, 76 of them defined by the component itself. Checked against the 724 names defined in the generated `DesignTokens.web.css` plus `ComponentTokens.web.css`, **none is unresolved**. The one hit was `var(--name)` inside a `//` comment in `ButtonVerticalListItem.web.ts` L154, a false positive. (VERIFIED, Sparky, by that method. The real instrument reads the bundle, not `src`, so this is a cross-check, not the evidence.)
   - **Wording.** "Web component source" should read "the web components the package ships". Web source under `src/components/**/platforms/web` is not in `package.json` `files`; adopters get the bundle, and the bundle is what the name contract reads. (VERIFIED, Sparky, from `package.json` `files`.)

2. **Would carrying it, or not, change what a web adopter is promised? No.** The promise already exists. INSTALL L94 says "If an updated component needs a token your set does not have, `sync` tells you", and § 5 says how. The instruments above hold it. (VERIFIED, Sparky, read `docs/consumer/INSTALL.md` L94 and L196–204.) S-1 therefore does not go to Peter.

3. **What the outline should say instead.** → design-outline.md § 2 "Web, a scope question"; § 5.3 S-1
   - Close S-1 with one sentence of this shape: "On web, 132 adds no build work. The acceptance sentence's web leg is held by Spec 129 Req 1.6 (Consumer Guard, with Task 8.4's `var()` check), Spec 123 Task 6's name contract (the build's own-index check, and `sync` against the adopter's generated CSS, case C6), and 129's 13.2 component-tier cases. CLOSEOUT re-reads them green at 132's final head."
   - This matters for verifiability (Stacy's read). Without it, "all three platforms" in the acceptance sentence can be read as owing a web D4 app, and no D row has one.
   - The CLOSEOUT re-read is a reading, not new work.
   - A citation detail: the quoted wording in § 2 L69 matches the incorporation note in `129 feedback/requirements.md` L1063 ("…resolves against a consumer's generated CSS"), not the § "Out of scope" line it cites. That line, `requirements.md` L456, reads "resolves **its tokens** against". (VERIFIED, Sparky, both read.)
   - **Counter-argument, and what survives it.** The counter: the name contract is a name check, not a render check. It cannot see a value that is defined but wrong, or a dynamic site whose input the adopter supplies (Icon-Base's `var(--${color})` is recorded as excluded, class (iii)). Folded in: the closing sentence says "held by a name check", not "renders". What survives is item 4 below.

**Other web-facing items in the outline**

4. **Web has no render evidence, and the goal's "render" is not platform-limited.** Peter's goal sentence is "the components are functional, and will successfully render, in the app as described". 132 defines "as described" (contracts as tests, D5 render lanes) for native only. On web, contract tests run in jsdom, and jsdom does not lay out the page or resolve custom properties the way a browser does (REASONING, from jsdom's documented scope; not re-checked here). So the platform adopters can build on today has the weakest render evidence. → design-outline.md § 1 "What 'as described' means"; § 2 "Render and behaviour"
   - **My lean**: not 132 scope. File a Sparky-owned record for a web render lane, placed by Peter alongside 128, which inherits the app lanes. Ask only one thing of 132: the per-platform contract validation format (the #877 ballot) stays keyed by platform, so a web lane can be added later without a retrofit.
   - **Counter**: if the D5 format and the D6 checker are built for native only, a web lane added later pays a retrofit. And Peter may read his goal as covering web now.
   - **The fork** (I do not pick it): web render evidence (a) in 132; (b) in a record placed later; or (c) not at all, with web's evidence being a name check plus jsdom contract tests. Adding evidence is not a change of promise, so the orchestrator decides whether this joins Peter's batch.
5. **T-7 (D7, readiness derived at publish) must say what happens to web's column.** `application-mcp-server/src/indexer/packageReadiness.generated.ts` carries a `web` entry per component, `production-ready` in the entries I read (VERIFIED, Sparky, read its head). If D7 derives readiness "from the check results at the release commit" for every platform, web has no render lane to derive from, and web's status could change at a 132 publish. That would change what web adopters are told, and would go to Peter. → design-outline.md § 5.2 T-7
   - **Ask**: T-7's answer states either that D7 applies to iOS and Android only, with web kept on its current derivation, or which web checks web's column derives from.
   - I would like to be named on T-7 for the web column only.
6. **P-4, "a web-worded contract gets native wording, not an exclusion".** I agree, as long as the native wording is added alongside the web wording and does not replace it. Existing web tests are written against the current contract text. → design-outline.md § 5.1 P-4
   - **Lean**: the closed list of reason classes.
   - **Counter**: rewording a shared contract without a per-platform field can drift the web meaning silently. The #877 contract-validation ballot should say the web text is unchanged.
   - REASONING: I have not checked which web tests quote contract text.
7. **Nothing else in the outline touches web.** #870 and #873 are native emitters (§ 4.1); D8's samples and D9's upgrade path are native. One flag for Leonardo and Lina: D10 and WP6, "build more", are native only, but Peter's "use DesignerPunk to build more" has no platform in it. A web adopter who writes their own web component with `defineComponentTokens` and composes ours has no named check, because the name contract reads only our bundle. I am not asking 132 to take it. If anyone reads the goal as covering web authoring, it belongs with item 4's fork. (REASONING)

**Cost**: my row in § 8 (0.25) is right, with a 0.25 R2 cross-read only if item 4 or 5 is contested.

#### [THURGOOD R2]

*2026-11-27. The seven R1 entries above are spliced byte for byte from the seats' files, in the order the orchestrator listed them. `design-outline.md` is now R2. Read at `origin/main` `822919318`; the T-12 recount and the README and requirements cites were re-run by me at `8553499b1`.*

**Folded, uncontested** (each → design-outline.md):
- T-12's count is **30 calls in 18 files**, all three chips included (Kenya, Lina, Leonardo; I re-ran it with `perl -0777` across lines). Ada's 26 in 14 was right for the one-line form only. § 2's bias reading is rewritten: little per-component repair, one shared repair (blend, Lina), two cross-cutting D5 costs (T-12, T-13). → § 2, § 6, T-12
- § 4.1's interim family list was too wide on Android: six families are by-reference only (Ada, Data). → § 4.1
- D8's population is the served and shipped surfaces, chiefly `governance/Component-Family-*.md`, not component READMEs (Leonardo, his own plan-r1 wording). It is a D-row wording change, so it is put to Peter inside P-1. → § 2, P-1
- #878 merged at 2026-11-27T16:57:03Z (`gh pr view 878`); § 6 and P-10's Android half are updated. → § 6, P-10
- The D1 amendment is cited at `README.md @ 55004006b` L23 (Stacy). → § 1
- **S-1 is closed**: the check exists (name contract #215, 129 Req 1.6 with Task 8.4, the 13.2 cases), with a CLOSEOUT re-read at 132's final head, in Sparky's closing sentence. → § 5.3
- #872 and row 7 are preconditions for the adopter journey and D10 (Ada); the guard widens to both paths and #873's forms. → § 4.1
- The ordering rule: the Android probe's fixing PR merges before #880 (Data). → § 6, § 7
- #868's Trigger is `merge:#880` (`9e7739a15`, co-signed `3dd723b4e`), so precondition 1's re-token is done; the close must close the whole record and say where each item lives (Stacy, under B2). → § 4.2, § 7
- T-11 is closed: no change to the "Native status" passage at this merge (Kenya, Data). → T-11, § 7
- T-7's owner adds Ada (the release script is in her write scope, Stacy); Sparky asks to be named for web's column. → T-7
- Kenya's sharpening of P-6 (option 1b, the option-3 toolchain caveat, the iOS 17 run carrying #879's nine tests) and P-10 (`macos-26` with Xcode 26.6). → P-6, P-10
- Data's P-8 options four and five, and P-9's named axes and grant. → P-8, P-9
- Stacy's measured-cost record read, row by row, with her proposals. → § 3

**Not folded as asked, and why**:
- **T-1 is not closed.** The orchestrator's note says Leonardo and Lina agree on one field. Their R1 entries cross: Leonardo withdraws `platformParts:` and asks for one field, and Lina, in the same round, moves *to* one field plus `platformParts:`, constrained to fixture identifiers. Each moved to the other's 129 position. They agree on the facts (Input-Text-Base on iOS is drawn chrome around a system field; behaviour stays out of `rendering:`) and differ on the shape. So T-1 goes to the cross-read, and I state both positions in the outline. If one of them already conceded off the record, it needs a line here.

**New items, as the orchestrator listed them** (→ design-outline.md):
- T-14, one module and many families (Lina; Kenya, Data, Ada own it). Marked to close before requirements. If (i), Peter is told, because it changes what the measured-cost record measures. → T-14, § 3
- Sparky's web render-evidence fork, (a)/(b)/(c), lean (b): P-14, and the orchestrator decides whether it joins the batch, since adding evidence changes no promise. → P-14, S-3
- Stacy's two D-row changes inside team options: P-11 (T-12's audit exclusion) and P-12 (T-13's device read). Both are expected not to arise, because every seat that answered leans otherwise. → P-11, P-12
- Data's grant gap: T-15, with P-15 only if the standing ballot (b) is chosen. Uncosted. → T-15, P-15
- Stacy's verifiability rows, the window, the sessions line, the CI table pasted at writing, and the 131 column's producer, which is me as 131's formalizer, or the column is dropped (T-17). → § 3, T-16, T-17
- Leonardo's P-2 conditions (consumer Leonardo in the flip, overlay text pointing at served readiness, a `validate_assembly` readiness warning as T-18) and P-7's semver status for not-ready families, plus D9's rehearsal needing a release before the claim. → P-2, P-7, T-18
- Ada's T-4 fork (adopter-only groups in our module or theirs) and T-12's token review (P-13, Peter's). → T-4, P-13
- Kenya's cheaper P-6 option. → P-6 (1b)
- Also added from R1, not on the orchestrator's list: T-19 (D8's sample preludes, Leonardo); Ada's three manifest conditions and Q12/Q13's D4 criteria (§ 4.3); Data's rule-10 record row (§ 4.2).

**Answers to what was asked of me**:
- **T-8, my view on option B, which Lina's record needs quoted before she answers.** I own the cross-surface check, not the tables. The project already has the pattern that makes A and B the same instrument: `scripts/derive-install-doc.ts` copies a marked region into a served doc, and `install-doc.test.ts` fails on a byte difference. Applied here, the readiness tables become generated regions with a byte-equality test, so a hand edit is caught (B) and the content comes from `packageReadiness.generated.ts` (A). My lean is that combined form, because it removes the drift class rather than detecting it after the fact. **Counter-argument that survives**: it touches about 13 served docs, each needing a marked region, and every readiness move then rewrites `governance/**` text, which is Peter-merged under the standing carve-out, once per family unit. Plain B keeps the prose and the cost lower, and still catches the disagreement. The pick is Lina's, in requirements.
- **[@STACY]'s standards implications** (a review entry, not a claims pass; recorded here for the composed loop): (1) a sessions line in parent completion docs: **adopted for 132 as a proposed M4 instrument** (§ 3); a Completion Documentation Guide change waits for evidence that it works on the first family. (2) The D6 checker's committed per-unit summary: **adopted** (T-16), mine to build.
- **Kenya's #879 correction**: it is her draft PR; it needs no go from me.
- **Data's § 4.3 cite**: it moves to his rule-10 record when that record merges.

**The R2 cross-read: who reads what.** Each pair answers the other's position in the outline and either converges or states the fork for its owner (or for Peter, where marked):
1. **T-1, `rendering:` shape**: Lina reads Leonardo's withdrawal; Leonardo reads Lina's constrained `platformParts:`. Closes in this round.
2. **T-5, the persisted string**: Kenya reads Data's stable config-name `key`; Data reads Kenya's raw value equal to the case name. The question is whether the stored string is the case name or the config name.
3. **T-13, the iOS hidden-view check**: Lina reads Kenya's measurement, which rules out the in-app read that Lina leans to; Kenya reads Lina's `accessibilityElements` walk. Data confirms the Android oracle, and Stacy reads for verifiability.
4. **T-8, readiness tables**: Lina reads my view above.
5. **T-14, one module**: Kenya, Data and Ada read Lina's item A and say (i) or (ii); Leonardo reads (ii)'s effect on P-2 and P-7.
6. **T-4, token placement**: Kenya and Data confirm the local-path import in the D4 layout (Ada's ask) and read Ada's fork (a)/(b). Data says whether he reads #873's Kotlin emitter before requirements.
7. **T-12 and P-13, type scaling**: Ada (a token mapping, needing Peter's review) and Lina (either the emitter or the components choose a style once per role) converge on where the text style lives; Kenya reads for iOS 17 availability and Leonardo for the product view.
8. **T-7, D7's source**: Ada reads Stacy's committed-results-at-S lean against the hermetic rule; Sparky reads only for web's column.
9. **T-15 and P-15, CI grants**: Kenya and Data say (a) or (b); Stacy reads (b)'s width.
10. **T-3, the iOS project form**: Kenya and Data (hand-written or XcodeGen); Leonardo reads for the walkthrough.
11. **P-7's semver status**: Kenya and Data confirm the Swift and Kotlin idioms Leonardo names; Ada reads it against her "aliases from the first claim for the whole token surface".
12. **§ 3 and T-17, the measured-cost record**: Stacy reads the folded rows and my proposal for the 131 column.

Sparky has no cross-read unless T-7's web column is contested.

**Peter's question list as it stands** (design-outline.md § 5.1):
- **Asked now (sitting 1)**: P-10, the iOS 17 go.
- **Batched after the cross-read (sitting 2)**: P-1 (D4–D10, with D8 corrected) through P-7 (the release, and what the claim promises for not-ready families); P-14 if the orchestrator includes it.
- **Only if they arise**: P-8 (no KVM), P-11 (audit exclusion), P-12 (device read), P-15 (the standing-ballot option).
- **Its own read**: P-13, the token review of the text-style mapping.
- **Later**: P-9, the Android range numbers, after D4 builds.

**Consulted**: Kenya, Data, Lina, Ada, Leonardo, Stacy and Sparky, through their R1 entries above.


#### [LINA R2]

**Read at**: `97f1e8672` (`spec/132-design-outline`, #880), in a detached scratch worktree; component source unchanged from `8553499b1`. Read-only.

**Mentions in `[THURGOOD R2]`**: none is addressed to me alone. My items are the cross-read list's 1, 3, 4 and 7, answered below.

---

**1. T-1, the `rendering:` shape: I move to one field. Leonardo and I converge, so T-1 closes.**
- **Why I move.** My R1 rested on "the mixed case is real on both platforms". Leonardo's read corrects the Android half, and I re-checked it.
  - Android's Input-Text-Base is a `BasicTextField`, and Compose draws its text with our style. Its caret is ours: `cursorBrush = SolidColor(theme.color_action_primary)`, `InputTextBase.android.kt` L328, VERIFIED.
  - So the only system-drawn part in the catalogue is iOS Input-Text-Base's text field interior, one component on one platform (his grep; my R1 grep found the same set, VERIFIED).
  - My constraint (part names are D5 fixture identifiers) is exactly the per-component property list D5 already keeps (plan-r2 § 1, "D5 details", "Token check"). A schema field would hold it a second time.
- **The shape**: per platform, `kind: platform | drawn` plus a `reason`. Where a drawn component wraps a system part, the reason names that part. For example, iOS Input-Text-Base: "drawn container around the system text field; text, caret and selection are the system's".
- **Revisit when**: a second component wraps a system control, as Leonardo says.
- **Surviving counter (his)**: a prose reason is not machine-read, so "which parts the adopter's theme does not reach" becomes structured data later if served readiness or an agent needs it.
- **His UNVERIFIED, answered**: Android themes the caret (above). **iOS does not.**
  - `InputTextBase.ios.swift` sets no `.tint`, `.accentColor` or caret colour (VERIFIED, grep finds none), so the iOS caret and selection follow the app's tint, not the DesignerPunk theme.
  - That is a platform-parity gap in my component, separate from T-1. I file it as a rule-10 record after this round, and it is the first item in Input-Text-Base's iOS `reason` until fixed.

**3. T-13, the iOS hidden-view check: I move to Kenya's proposal. My in-app walk is ruled out.**
- **Why.** Her 129 measurement found that walking SwiftUI's accessibility tree from inside the process returns zero elements (`kenya-plan-r1.md` § 3, VERIFIED by her, carried). Her new probe shows an `XCUIElement` snapshot carries no hidden or accessibility-element flag (VERIFIED by her, locally). So nothing in the process or in XCUITest separates a hidden element from a visible one with an empty label.
- **What the contract asks.** Icon-Base `accessibility_hidden`:
  - `behavior:` names the mechanism per platform ("iOS: .accessibilityHidden(true)");
  - `validation:` says "Icons not announced by screen readers" and "Icons not in accessibility tree" (`src/components/core/Icon-Base/contracts.yaml` L75–L87, VERIFIED).
- **The check I accept, as the contract's iOS validation lines** (they go into the contract-validation ballot's `platform_validation`, T-9):
  1. **Static, the primary check**: the decorative subtree carries `.accessibilityHidden(true)`, read by ViewInspector or by D6's static half. Its known-bad case is the modifier removed.
     - This proves the contract's stated mechanism, so it is a faithful check of "as described", given the platform's guarantee for that modifier.
  2. **Runtime, the consequence, in the D4 app**: decorative parts carry no identifier, and the component's frame adds no element for them. This holds only if Kenya's 15-minute probe shows an un-identified hidden view is absent from the query (UNVERIFIED). If it is not absent, this line drops, and the static check stands alone.
  3. **Speech**: a labelled device read (P-3), never a simulator claim.
- **The same lines serve** `accessibility_decorative` on the three Progress-Indicator primitives (VERIFIED, the only other components carrying the concept).
- **Surviving counter**: a static check proves the modifier is present, not that VoiceOver skips the view. A parent's `.accessibilityElement(children: .combine)` could fold the icon's content back in. I have not checked whether our chips do this (UNVERIFIED). The runtime line, or the device read, is what catches that, which is why line 2 matters if the probe allows it.

**4. T-8, the readiness tables: I pick Thurgood's combined form (generated regions plus a byte-equality test), with one change.**
- **Why.** It removes the drift class instead of detecting it, and it reuses a working instrument pair (`scripts/derive-install-doc.ts` and `install-doc.test.ts`, as he cites; UNVERIFIED by me at this head).
- **The change: one table, not thirteen.** The generated region lives only in `governance/Component-Readiness-Status.md`. The family docs replace their tables with a pointer sentence to it.
  - That answers his surviving counter, that every readiness move would rewrite about 13 governance docs and need Peter's merge per family unit: each unit then touches one region in one doc.
  - Readiness per component is also served by the application MCP (`get_component_summary` readiness, VERIFIED in R1), so agents lose nothing.
- **Surviving counter**: a reader of a family doc loses inline status and makes one more hop. The pointer conversion also has to correct or remove the ~80 hand-written lines that my 16.4.0 fix-now record owes. Whichever lands first sets the other's base. Those are two of my records, and I sequence them. The pick is formally made in requirements, as my record says; this is my answer for it.

**7. T-12, where the text style lives: I agree with Ada. It lives in the semantic typography token. One condition comes from the call sites.**
- **The 30 calls, classified by what they pass as `size:`** (VERIFIED, `perl -0777` over `src/components/core/*/platforms/ios/*.swift`, tests excluded):

  | Kind of size | Calls | Notes |
  |---|---|---|
  | A semantic typography token's `.fontSize` | 10 | e.g. `typographyLabelMd.fontSize` |
  | A primitive | 9 | `fontSize050` ×6; `fontSize075` ×3, **the three chips** |
  | A component-computed size | 9 | `size.fontSize`, `labelFontSize`, `effectiveLabelFontSize` |
  | A literal | 2 | `40` in `RoundedPointyTopHexagon.swift` L348, after its first preview marker at L277, so preview code (REASONING); and `14` in `ButtonVerticalListSet.ios.swift` L545, production, the error-message text |

- **So Ada's mapping fixes the 10 directly.** The other 20 have no semantic token to read, and they are mine to resolve:
  - **The 9 primitive calls** move to the semantic typography token for their role. Token Governance's selection order puts semantic before primitive. Where no semantic token fits the role, it is a token need for Ada, under Peter's review (P-13), not a component-level choice.
    - The chips' label (`fontSize075`, medium weight) is the slice's case. Which semantic token it maps to, `typographyLabelSm` or another, is UNVERIFIED and is my design-round item.
  - **The 9 computed calls** are size-variant tables inside the components. Each variant row names a typography token instead of a bare size.
  - **The literal `14`** is a token-compliance defect in production code in my component. I file it as a rule-10 record after this round, whatever T-12 decides.
- **Where this lands**: Ada's P-13 mapping covers the token side. The component side (20 call sites, including the chips) is component repair in each family's unit. In the first family it is the three chip labels.
- **Surviving counter (Ada's, which I share)**: scaled text breaks layouts sized by fixed tokens. Chips are safe on height (`minHeight: ChipTokens.tapArea` is a minimum), but their padding and icon sizing at the largest sizes are not measured. The slice is where that is first priced.

---

**Records I owe from this round** (rule 10, my owner acts, filed after the round in one record-only PR, not here):
- (a) iOS Input-Text-Base does not theme its caret or selection.
- (b) `ButtonVerticalListSet.ios.swift` L545 hard-codes `size: 14`.

*Signed: Lina, 2026-11-27.*

#### [LEONARDO R2]

**Read at**: `spec/132-design-outline` @ `97f1e8672` (R2 outline; the feedback doc with all seven R1 entries and `[THURGOOD R2]`), in a scratchpad worktree. Source reads are at the same head, whose component tree is unchanged from `8553499b1`. Read-only; nothing committed.

**Mentions first.** `[THURGOOD R2]` has no `[@LEONARDO]` tag. Its T-1 note asks whether either of us conceded off the record. **I did not.** My only position is my R1 entry, and this entry moves it (item 1).

---

**Item 1 — T-1, the `rendering:` shape. I move to Lina's constrained `platformParts:`, with two refinements. We converge, and T-1 can close.** → design-outline.md § 5.2 T-1

- **Why I move.** My own R1 surviving counter was that "a reason written in prose is not machine-read". Lina's constraint answers it: each part must be an accessibility identifier D5 can find, and must carry a reason. The served schema, not only the test, then says which pixels are ours. That is a consumer fact as well as a test input. VERIFIED: the iOS Input-Text-Base sets no `.tint(` or `accentColor` (`grep`, `InputTextBase.ios.swift`), so its caret and selection follow the adopter's app tint, not our tokens. An adopter's agent should be able to read that from the MCP.
- **Refinement 1: the identifier must belong to the component, not the fixture.** The text-entry part is inside our view, so a fixture cannot label it. VERIFIED: the iOS component carries identifiers only on its helper and error text (`\(id)-helper` L366, `\(id)-error` L375), none on the field. So the shape implies a small component change on iOS: an identifier on the field, derived from the component's id (for example `<id>-text-entry`). That is Lina's change, and it belongs with the field.
- **Refinement 2: Android Input-Text-Base lists no part.** I hold here against Lina's "the mixed case is real on both platforms". VERIFIED in `InputTextBase.android.kt`: `BasicTextField` (from L264) is given `textStyle = LocalTextStyle.current.copy(… color = theme.color_text_default)` and `cursorBrush = SolidColor(theme.color_action_primary)`. Compose draws the text and caret with our tokens. So on Android it is `kind: drawn` with no `platformParts:`, and D5 samples it whole.
  - One shared gap: neither platform sets selection colours. VERIFIED: no `selection` or `tint` in either file. That is a theming gap, not a `platformParts:` case, because a selection highlight is not on screen in a static render. I flag it to Lina for the contract or the token review; it is not part of T-1.
- **So the first population is one entry**: iOS Input-Text-Base, `platformParts: [{ id: text-entry, reason: "system text field: text, caret and selection drawn by the system; caret and selection follow the app tint" }]`.
- **Surviving counter**: it is a schema field whose only use is one component on one platform. Lina's guard on over-claiming (each part has a reason and is read at the claims pass) is a read, not a test. I accept both, because the served consumer fact is worth one field. If no second case appears by the end of 132, the field still costs almost nothing.

**Item 5 — T-14 (ii), and its effect on P-2 and P-7. Option (ii) makes "per family" true in the build, and removes most of my P-7 semver gap, but only if the manifest's threshold is the claim tier, not the compile tier.** → design-outline.md § 5.2 T-14; § 5.1 P-2, P-7

Kenya, Data and Ada choose between (i) and (ii). This is the consumer reading of (ii) only.

- **What (ii) does for P-7.** My R1 gap was that an adopter can call any family's public API from the first claim, while the per-family API pass still changes it. Under (ii), a family that is not in the manifest is not in the adopter's module, so it cannot be called and carries no semver promise. Adding a family later adds public API, which is a minor. That makes the Kotlin opt-in annotation and the Swift workaround unnecessary for not-ready families (REASONING).
- **The condition: which tier the manifest admits.** T-14 (ii), as Lina worded it, compiles families "at or past the compile tier". The support claim is at the D5/D6 tier (P-2). A family that compiles but is not yet claimed would be in the module and callable, which reopens the gap for that window. **Consumer lean**: the adopter's default manifest admits **claimed** families only. A compile-tier set is opt-in, behind a flag our own harness and repair lanes use. That flag is the module-level equivalent of an opt-in annotation.
- **A ratchet**: once a family is claimed it never leaves the default manifest. Dropping it would be a breaking change, so D9's diff reads "family added" as additive and "family removed" as breaking.
- **One source**: the manifest's family list, served readiness (D7), the overlay text (P-2 (b)) and T-18's warning should all read the same derived readiness. Then a component the MCP offers is exactly a component the adopter's build contains. If they read different sources, consumer Leonardo can spec a component that the platform agent's build then rejects as an unknown type.
- **D4 must build the adopter's default manifest**, not the full set. Otherwise D4 proves a module adopters do not get. Repair progress on the full set is a separate lane.
- **P-2**: (ii) makes T-18 more valuable, not less. Without it, selecting an unclaimed component fails at the build, after the screen spec is written. With it, the failure moves to spec time.
- **P-7's release question**: under (ii), the first claim only adds to what adopters have, so a minor is semver-valid. 17.0.0 would be a chosen marker, not a semver necessity (REASONING; Peter's pick). **Ada's counter still holds under (ii)**: the generated token API compiles for every family, so aliases are owed from the first claim for the whole token surface.
- **Under (i)**: every family's public API is in the module at the first claim, so P-7 needs its semver-status answer (each change a major, or unstable markers) in full.
- **Surviving counter against (ii)**: `generate`'s output then depends on readiness data from the release, so a consumer's dependency is partial and changes across releases without any change to their config. That is new behaviour for `generate`, and it is Ada's to weigh. The "Native status" text has to explain it in one sentence.

**Item 7 — T-12 / P-13, type scaling: the product view. The text style belongs on the typography token (Ada's mapping), with a reasoned per-component override. I agree with Ada; Lina's "the emitter … once per role" is the same answer.** → design-outline.md § 5.2 T-12; § 5.1 P-13

- **Why the token, from the product side.** A product screen is mostly text that is not inside our components: headings, body, captions, styled directly with semantic typography tokens (token-first, Core Goals). Adopter components (D10, WP6) do the same.
  - A style chosen inside each of our components scales our 18 files and leaves every product screen's own text fixed. Only a token-level mapping reaches it (REASONING).
  - VERIFIED from Ada R1: the generated iOS `TypographyToken` has no text style today, so nothing outside our components can scale.
- **Hierarchy at large sizes is a product decision the mapping makes.** On iOS each text style grows by its own ratio, so the anchor chosen per role (for example `h1` → `.largeTitle`, `bodyMd` → `.body`) decides whether a heading still reads above body text at the largest size. The mapping should be reviewed as a set, against one product screen at the largest Dynamic Type size, not token by token. The fixture product screen (my R1, T-19's sibling) is that screen.
- **Android** scales with `sp` (VERIFIED, Ada R1). Recent Android versions scale large text non-linearly (REASONING; UNVERIFIED for our range), so the platforms will not match exactly at the extremes. Same hierarchy, platform-native curve: that is the True Native reading.
- **Overrides**: a component that must not grow (Kenya's and Lina's fixed-height cases) records a reasoned exception. That is a per-component P-4 case, not a token exception.
- **Pick**: token mapping (Ada), put to Peter as P-13.
- **Surviving counter**: the anchors are partly taste, and a token-structure change needs Peter's review. A per-component choice is cheaper and local. And either way, the real cost is layout repair at large sizes, measured first in the slice.

**Item 10 — T-3, the iOS project form, read for the walkthrough. Hand-written, objectVersion 77 with synchronized folders (Kenya's #879 form).** → design-outline.md § 5.2 T-3

- **Why, for the walkthrough.** An adopter creates their project in Xcode, and a new project in a current Xcode is that same form: synchronized folders, `objectVersion 77` (REASONING, from Xcode 16's defaults; Kenya to confirm). So a hand-written fixture has the shape the adopter already has. "Add our package to your project" is then the same edit in D4 and in the walkthrough.
  - XcodeGen would make D4 prove a path almost no adopter is on, and the walkthrough would have to teach a tool or skip the step D4 exercised.
- **Make D4's project the walkthrough's evidence**: create the fixture project once by doing the walkthrough's steps, and commit it. Its "add local package" hunk in `project.pbxproj` becomes "What the agent does" for that step, cited by commit. The walkthrough gives two ways:
  - the human path: Xcode's "Add Package Dependencies…", then "Add Local…";
  - the agent path: the `pbxproj` edit, named as fragile, and checked by building.

  This applies the D8 idea to a step that is not code.
- **Kenya's counter on review**: synchronized folders mean adding a source file no longer edits `project.pbxproj` (REASONING), so the file churns far less after creation. The hostile-to-review cost falls mostly on the one creation commit.
- **Pick**: hand-written. Kenya and Data decide.
- **Surviving counter**: synchronized folders need Xcode 16 or later to open the fixture. An adopter on an older Xcode cannot open D4's project, and the walkthrough has to state the Xcode floor. I accept it, because the harness pins Xcode 26.x and App Store submission requires a recent Xcode (REASONING; UNVERIFIED as a current Apple rule).

---

**Summary**:
- Item 1: **moved** to Lina's constrained `platformParts:`, with a component-owned identifier and no Android part. Converged; T-1 can close.
- Item 5: (ii) **resolves P-7's not-ready-family gap** if the adopter's default manifest admits claimed families only, with a ratchet and one readiness source. Ada's token-alias counter stands.
- Item 7: **agree** with Ada (token mapping, reviewed as a set against one screen); P-13 is Peter's.
- Item 10: **hand-written** project form, with D4's project created by the walkthrough's own steps.

**New for Peter**: none beyond P-7 and P-13 as they stand. Item 5's "claimed families only, by default" is a refinement of T-14 (ii) for Kenya, Data and Ada, and reaches Peter only through P-7.

#### [KENYA R2]

**Read at**: `spec/132-design-outline` `97f1e8672` (#880): the R2 outline, the seven R1 entries and `[THURGOOD R2]`. Read-only on #880.

**Four new local measurements.** I ran them this round on this Mac (Xcode 27.2, iOS 26.0 simulator, deployment target 17.0; nothing downloaded) to settle items 3, 6, 7 and 11. They are **not yet committed**. Under the brief's "commit only what you cite", I will add them to #879's evidence in a separate commit right after this entry, with the iOS 17 run Peter approved at 17:20:36Z. Until then, read them as VERIFIED by me and not yet citable by path.

`[THURGOOD R2]` has no `[@KENYA]` mention beyond the cross-read list, so the items follow.

---

**Item 2: T-5, the persisted theme string. I MOVE to Data's key.**
- **What Data proposes** (`[DATA R1]` § 5.2 T-5): store a stable `key` equal to the registered theme's config `name`, not the generated identifier, and store the scheme separately.
- **Why I move.** On iOS, the family's case names are the generator's lower-camel transform of the config names. A raw value implied by the case name (`case highContrast` stores `"highContrast"`) therefore ties stored data to the generator's casing rule, which is Data's objection to Kotlin's `name`, and it applies to Swift too.
- **The iOS form.** The generator emits **explicit raw literals equal to the config `name`**: `case highContrast = "high-contrast"`, `case base = "base"`, and so on. Swift infers nothing from the identifier. One string set then serves both platforms (Data's `fromKey`; iOS `init?(rawValue:)`).
  - Typechecked at iOS 17.0 under Swift 6 with `@AppStorage`: VERIFIED, toy file. `@AppStorage` binds a `String`-raw `RawRepresentable` enum directly.
- **The scheme is stored separately on iOS too.** The family has no dark case; the provider reads `colorScheme`. The app stores its own system/light/dark choice and applies `.preferredColorScheme`.
- **Surviving counter (shared with Data):** a stored value breaks when an adopter renames a theme in their config.
  - That is a change the adopter can see. A generator casing change would not be.
  - D9's diff must still report a removed or renamed case as breaking.
  - 132's documentation needs the migration line: unknown key → `nil` → fall back to `base`.
- **Converged.** No fork remains on the string. It closes at `design.md`, per the record's Trigger.

**Item 3: T-13, the iOS hidden-view check. I MOVE to Lina's in-app walk, on new measurements. Both my R1 runtime proposal and my 129 R1 zero-element finding are superseded.**
- **Measured** (VERIFIED, two runs, identical output):
  - The screen has an anchor `Text`, two SF Symbol images (one carries a custom identifier), and a button. The button runs an in-app walk from each window: `accessibilityElementCount()` / `accessibilityElement(at:)` / `accessibilityElements`, plus `subviews`, collecting every object whose `isAccessibilityElement` is true.
  - The walk runs while XCUITest drives the app.
  - Two variants: both images `.accessibilityHidden(true)`, and neither hidden.

| Read | Hidden variant | Visible variant |
|---|---|---|
| XCUITest `app.images` | **2** (`star.fill` "Favorite", `t13.hidden.withId` "Love") | **2** (same) |
| XCUITest `app.descendants(matching: .any).count` | 10 | 10 |
| **In-app walk, accessibility elements** | **3**: Anchor, Walk, report | **5**: Anchor, **Favorite**, **Love**, Walk, report |

- **What the measurements show.**
  1. **XCUITest cannot see hiding at all.** A hidden image with no custom identifier is still found, with its symbol label, and the element counts are equal in both variants. This falsifies my R1 "runtime element count with no identifiers".
  2. **The in-app walk reads the tree VoiceOver iterates.** The hidden images drop out, and the known-bad twin (not hidden) brings them back, 3 against 5. That is Lina's lean, now measured.
  3. **The walk's elements expose no `accessibilityIdentifier`** (every entry reads `-`). So the assertion matches by **label**: the decorative content's label (for example "Favorite") must be absent, not an identifier.
- **Why my 129 R1 found zero elements**: my reading, UNVERIFIED. That walk ran with no accessibility client attached. SwiftUI appears to build the UIKit accessibility tree only while a client, here XCUITest, is connected. So the walk must run **inside a UI-test session**, never as a bare hostless unit test.
- **The shape I'd take to design.** D5 and D6's iOS oracle for `accessibility_hidden` / `accessibility_decorative` is:
  - the in-app walk in the D4 app, triggered under XCUITest;
  - asserting the decorative label is absent from the accessibility elements;
  - with the known-bad twin, the same view without `.accessibilityHidden(true)`, asserting it present.
  - The static check (ViewInspector or a source check) becomes optional, not primary.
- **Surviving counter:** the walk depends on an undocumented behaviour, that SwiftUI populates the tree only while a client is attached. It is measured on iOS 26.0 only. The iOS 17 run Peter just approved will test it there: I will add this probe to that run. The walk is also a test-only hook compiled into the fixture app, so it lives in D4's fixture, not in our components.
- **For Stacy:** the twin discriminates (3 against 5, in both runs), so the check is falsifiable as D6 requires.
- **Android (Data):** a semantics-property assertion under Robolectric with a known-bad twin. D6 takes one oracle name per platform. Converged across platforms on mechanism-per-platform.

**Item 5: T-14, one module and many families. I pick (ii), a family-scoped manifest.**
- **Why (ii) on iOS.**
  - `generate` already owns the root `Package.swift` (WP4), so scoping its target's `sources:` to the ready families plus their closure costs one list. That `sources:` scopes an SPM target is REASONING, from SPM's manifest API; I did not run it at this head.
  - Under (ii) a not-ready family **is not in the module**, so an adopter cannot call its public API. That dissolves P-7's semver problem for iOS (item 11). Under (i), every family's API is exposed from the first claim.
  - (i) also puts 45 iOS and 89 Android pinned entries before the first render. That reverses (x′)'s "first family, then measure".
- **Conditions I'd attach.**
  1. Lina's closure list per family is data `generate` reads, not code. Chip → Icon-Base, the blend helper, the tokens.
  2. **The harness gains a context that compiles the ready-set manifest at zero errors.** The whole-package context keeps its pinned list. Otherwise the module adopters build is not the module we check.
  3. The closure includes the blend helper, which is broken on both platforms (Lina, item A). So (ii) still pays the shared blend repair in the slice, and the measured-cost record books it as shared.
- **Surviving counter:** the manifest becomes readiness-aware, so `generate`'s output depends on the release's readiness state. Each upgrade silently adds families, and new type names, to the adopter's module. Whether a newly added type can collide with an adopter type is UNVERIFIED: their module imports ours, and Swift usually prefers the local declaration. The D9 rehearsal should include an upgrade that adds a family.

**Item 6: T-4, where adopter tokens live. The local-path import holds, measured, with one fix. On Ada's fork I AGREE with (a).**
- **Measured** (VERIFIED, `xcodebuild build` for `generic/platform=iOS Simulator`, `** BUILD SUCCEEDED **`):
  - A root package: target `DesignerPunk`, holding only the consumer's generated `DesignTokens` and `ComponentTokens`, since our components do not compile yet.
  - An adopter package at `ios/AdopterComponents/` with `.package(path: "../..")`.
  - An adopter `FilterBar` that imports `DesignerPunk` and reads `DesignTokens.space100`, `\.dpTheme` and `.probeTheme(.wcag)` from its own module.
  - Together with my 129 R2 toy (app → root package, VERIFIED there), both levels of the D4 layout now link.
- **The fix the measurement found.**
  - With a plain `.package(path: "../..")`, the product reference `package: "DesignerPunk"` **fails**: "unknown package 'DesignerPunk' … valid packages are: '<the repo directory name>'".
  - The package identity of a path dependency is the **adopter's repository directory name**, not our manifest's `name`.
  - `.package(name: "DesignerPunk", path: "../..")` fixes it, with no deprecation warning at tools 5.9 (VERIFIED).
  - So generated manifests, D8's samples and the walkthrough must write the `name:` form. Otherwise every adopter's line differs. This is Ada's manifest condition 3 made concrete, and Leonardo's walkthrough needs it.
- **Ada's fork, (a) all groups in our module or (b) adopter-only groups in theirs.** I AGREE with (a). Our components read only our module's groups, and (b) splits the replacement rule across two modules for a defect class that #870's fix plus the one-token-per-family fixture removes.
  - **Surviving counter (hers, and it stands):** any future emitter defect again fails our module, and every DesignerPunk component, for every adopter with one custom token. The containment (b) would buy is real.
  - **Condition:** the fixture guard lands before D10, as § 4.1 says.

**Item 7: T-12 for iOS 17. Both scaled forms exist at iOS 17, but one API in R1 does not exist, and the token-side emission must not be a computed `Font`.**
- **Measured** (VERIFIED, `swiftc -typecheck`, iOS 17.0 target, Swift 6):
  - `.system(size:weight:relativeTo:)` **does not exist**: "extra argument 'relativeTo' in call". Lina's R1 example form needs replacing.
  - `@ScaledMetric(relativeTo:)` inside a `ViewModifier` feeding `.system(size:weight:)` compiles.
  - `.font(.custom(_:size:relativeTo:))` compiles.
- **Measured** (VERIFIED, XCUITest audit on iOS 26.0): `performAccessibilityAudit(for: .dynamicType)` flags the fixed `.system(size: DesignTokens.fontSize100)` and does **not** flag either scaled form. So the fix clears the audit.
- **The iOS constraint for Ada's emitter (P-13).**
  - A static `font` property on `TypographyToken`, computed with `UIFontMetrics`, reads the app-wide content size once. It does **not** follow SwiftUI's `dynamicTypeSize` environment, so a D5 variant set through the environment would not scale it. That is REASONING from how `UIFontMetrics` and `@ScaledMetric` differ; not run.
  - So the iOS emission should be a **view modifier** (for example `.dpFont(DesignTokens.typographyBodyMd)`) carrying `@ScaledMetric(relativeTo:)` for the system family, and `Font.custom(_:size:relativeTo:)` where a family is named.
  - The **text style still lives in the token**. That is Ada's mapping, Peter's review under P-13, and I agree with putting it there. Only the emission's shape changes.
- **iOS 17 availability.** All three APIs are iOS 14 or later, from training data; the typecheck at a 17.0 target passed (VERIFIED). The audit result itself is measured on iOS 26.0 only, and the approved iOS 17 run will repeat it.
- **Surviving counter (the shared one):** scaled type grows fixed-height layouts. The slice's three chips use `minHeight` (Lina), which is safe; badges and rows may not be.

**Item 9: T-15 and P-15, CI grants. I pick (a), applied per lane rather than per unit, with lanes designed to be data-driven. (b) is not needed.**
- **The precedent is already on `main`.** The native harness keeps its runner and toolchain pins in `harness/pins.yaml`, outside `.github/**`. #867 moved Android's pins with no workflow edit (VERIFIED, `git log 3a3bd072b..8553499b1`; `harness/pins.yaml`).
- **The same design for 132.** Each lane's workflow (iOS render, Android render, D4 build, D8 samples, D9 upgrade/diff, P-9's range builds) is written **once**, under one issue-row grant at the first family's tasks round. The family list and test selection are read from a file under `harness/` or 132's fixture directory.
  - Later family units then touch no `.github/**` path, and need no grant.
  - The grant count is the number of lanes, about five or six, not lanes × ten-plus families.
- **Why not (b):** a standing workflow-scope ballot is a charter change whose width is the risk (M1's own counter). A per-lane grant is exact, and it is only needed once if the lanes are data-driven.
- **Surviving counter:** a lane's later structural fix (a new step, a runner-class change) still needs a grant. The first family's unit carries five or six grant PRs at once: a burst of Peter merges and Stacy ARMING reads in one sitting. That is the real cost, and it is front-loaded, not removed.

**Item 10: T-3, the iOS project form. I pick a hand-written `.xcodeproj` with synchronized folders.**
- **Why:**
  - Leonardo's point holds (`[LEONARDO R1]`): the walkthrough teaches D4's form, and adopters have a plain `.xcodeproj`.
  - #879's project built and ran with no generator (VERIFIED).
  - New this round: I added three source files (`T13Screens.swift`, `T12Screen.swift`, two test files) to its synchronized folders, and they compiled and ran **with no `project.pbxproj` edit** (VERIFIED). So the "hostile to review" counter mostly does not bite: the `pbxproj` changes only when targets or settings change, not per file or per family.
- **Surviving counter:** synchronized folders need Xcode 16 or later to open. An adopter on an older Xcode cannot open the D4 fixture as written. That is fine for our CI, which pins Xcode 26.6, and for 132's documented floor, which must say "Xcode 16 or later" for the fixture. Their own project format is theirs.
  - The step that needs a human is still adding the local package in Xcode's UI (Leonardo). The walkthrough must teach the `.package(name:path:)` identity from item 6.
- **XcodeGen** would add a pinned tool for a problem that synchronized folders already remove. I would not take it.

**Item 11: P-7, Swift's semver idiom for not-ready families. Leonardo's REASONING confirmed, with one measured idiom and one caveat.**
- **Measured** (VERIFIED, `swiftc` two-module typecheck, iOS 17.0):
  - `@_spi(Preview) public struct NotReady` in one module is **invisible** to a plain `import`: "cannot find 'NotReady' in scope".
  - It is visible to `@_spi(Preview) import`.
  - So Swift **has** a working opt-in mechanism, the twin of Kotlin's `@RequiresOptIn`. It is **underscored**, meaning not a stable public language feature (from training data; UNVERIFIED whether its status changed after my cutoff).
- **The SPM-idiomatic alternative is a separate library product**, for example `DesignerPunkPreview`, that an adopter must depend on by name. That is a supported, non-underscored opt-in. It costs a second target and a split closure.
- **Under T-14 (ii)** (item 5), neither is needed for iOS, because a not-ready family is not compiled into the module at all. That is the strongest reason I pick (ii).
- **For Ada's "aliases from the first claim for the whole token surface":** I AGREE. The generated token API is shared by every family, so per-family readiness does not scope it. Swift's mechanism is `@available(*, deprecated, renamed:)`, which she named.
- **Surviving counter:** if (ii) is not chosen, `@_spi` is the only in-code opt-in. An underscored attribute in a public package is a promise about a feature Swift does not promise, and a toolchain could change it.

---

**Summary**: item 2 moved to Data's config-name key, with explicit raw literals; item 3 moved to Lina's in-app walk, on measurements that also falsify my own R1 proposal; item 5 picks (ii); item 6 agrees with (a), the import holds with the `name:` fix; item 7 says the text style lives in the token and iOS emits a modifier, not a computed `Font`; item 9 picks (a) per lane, with data-driven lanes; item 10 picks hand-written; item 11 confirms `@_spi` and the separate-product idiom, made moot under (ii).

#### [DATA R2]

**Read at**: `97f1e86726f4ce04f6c569114d4cd0cafc625e88` (`spec/132-design-outline`, #880): the R2 outline, and the feedback file with the seven R1 entries and `[THURGOOD R2]`. I read it in my own scratchpad worktree, read-only. The new Android evidence below comes from a scratch consumer packed from `3a3bd072b` and from #884's runs. **Labels**: **VERIFIED**, I ran or read it myself; **REASONING**, an inference; **UNVERIFIED**, nobody checked it. No Kotlin was compiled on this machine, which has no JDK.

`[THURGOOD R2]` has no `[@DATA]` mention. The items below are the cross-read list's, in its order.

---

**2. T-5, the persisted theme string. HOLD the config name, and propose Kenya's raw value equal to it, which converges.** → design-outline.md § 5.2 "T-5"
- **What is emitted today** (VERIFIED, read in the scratch consumer's generated files):
  - Swift: `public enum ProbeThemeFamily: Sendable, Hashable, CaseIterable { case base; case wcag }`.
  - Kotlin: `enum class ProbeThemeFamily { Base, Wcag }`.
  - So the Swift case names are lower camel and the Kotlin entries are Pascal case, both derived from the registered theme's config `name`.
  - For `base` and `wcag`, Kenya's "case name" and my "config name" are the same string. They diverge for a multi-word name such as `high-contrast`: the Swift case is `highContrast`, the Kotlin entry `HighContrast`, the config `high-contrast`. That last part is REASONING about how the generator cases names; I have not run a multi-word theme.
- **Why I hold the config name.** It is the only string both platforms share by construction. The case names are two different spellings from two casing rules, so a cross-platform preference sync, which Kenya wants too, needs one of them to be the source. The config name is that source.
- **The convergence.** Kenya's raw value can be the config name, explicitly: Swift allows any string as a raw value, for example `case highContrast = "high-contrast"`. Her `@AppStorage` typecheck holds for any `String` raw value (REASONING from her toy, which used a `String`-backed enum).
- **Her surviving counter applies to both options:** a theme renamed in the adopter's config orphans every stored value. It needs the documentation's migration line (record point 3), and D9 reporting a removed case or key as breaking.
- **What would make me move:** if Kenya shows the Swift generator cannot emit an explicit raw value for a case without breaking `CaseIterable` or the case names, then the case name it is, and Android's `key` matches it.

**3. T-13, the Android oracle. AGREE with Lina's form for Icon-Base, and correct my R1's mechanism.** → design-outline.md § 5.2 "T-13"
- **Icon-Base's Android contract is met by `contentDescription = null`, not by a hiding property** (VERIFIED):
  - `IconBase.android.kt` L71 passes `contentDescription = null` to `Icon(…)`.
  - `contracts.yaml` L75–L87 states the Android mechanism as "contentDescription=null".
- **So the oracle for this contract is Lina's**: in the **merged** tree, the one TalkBack reads, the component contributes no node carrying an image role or a content description for the icon.
  - Under the hood, Material's `Icon` adds its `contentDescription` and `Role.Image` semantics only when the description is non-null. That is REASONING from the Compose API; the pinned BOM is not checked.
  - The **known-bad twin** is the same icon with a non-null `contentDescription`, which must be found.
- **My R1's `HideFromAccessibility` / `clearAndSetSemantics` assertion** is the oracle for a component that hides a subtree that *would* otherwise have semantics. That case is not Icon-Base's.
- **So the per-platform validation line should name the mechanism the contract states**, not one Android property for every hidden contract. That fits D6's per-platform oracle name.
- **It runs under Robolectric.** #884's first runs show a Compose UI test passing there (§ 6 below).
- **Surviving counter-argument**: the merged tree is what TalkBack *receives*, not what it *says*. Speech stays outside done (P-3).

**5. T-14, one module and many families. CHOOSE (ii), the family-scoped manifest.** → design-outline.md § 5.2 "T-14"
- **Why not (i)**: it moves all of D3's repair (45 iOS and 89 Android entries, plus blend, at `8553499b1`, VERIFIED in the outline § 2) ahead of the first family's app. Then the first family measures every family's repair, and the cut the plan was approved on ("one vertical slice, then one unit per family") is undone. That is a scope change Peter would have to hear.
- **Why (ii) is cheap on Android**:
  - A Gradle module's sources can be an explicit file list. The compile harness already builds its modules that way: `lane.ts` writes the lists, and `harness/android/tokens/build.gradle.kts` `laneFiles` reads them (VERIFIED).
  - So the manifest `generate` writes can list the files of the families at or past the compile tier, plus their closure. Lina's list for Chip is Icon-Base, the blend helper and the tokens.
- **(ii) also answers half of P-7**: a family the manifest does not compile is not callable. So "the semver status of not-ready families' API" applies only to families that are compiled but not yet claimed (item 11).
- **Surviving counter-arguments**:
  1. The manifest becomes readiness-aware, which couples `generate` to readiness data. Ada owns that coupling, and its source should be the same one T-7 uses.
  2. An adopter who names a not-included composable gets a bare "Unresolved reference". The overlay and INSTALL must say which families are in.
  3. The harness then has two compile sets: all files for D3, and the scoped set for D4.
- **A third shape, for the design round, not picked**: one Gradle module or Swift target per family, with declared dependencies. That makes the closure explicit in the build graph rather than in a list `generate` keeps.
  - Its cost: cross-family `internal` use becomes impossible, so Lina's access pass grows.
  - I name it because it is the class-level form of (ii). I do not pick it.

**6. T-4, where adopter tokens live. CONFIRM the local-path import (REASONING, not yet built), AGREE with Ada's (a), and #873's Kotlin read is DONE.** → design-outline.md § 5.2 "T-4", § 4.1
- **The local-path import in the D4 Android layout:**
  - `init` adds two `settings.gradle.kts` lines: `include(":designerpunk")` and `project(":designerpunk").projectDir = file("node_modules/@3fn/core/<android module folder>")`. That is the shape (a) recorded in plan-r2 § 2, WP4.
  - The adopter's component module then declares `implementation(project(":designerpunk"))`.
  - That is a standard Gradle local project dependency. **It holds by Gradle's design (REASONING), and it is UNVERIFIED in this layout until D4 builds.**
  - What *is* VERIFIED is the half before it: in 129's R3, an adopter-style module compiled our component source from `node_modules` against generated tokens, with nothing copied (`data-plan-r1.md` § 1).
- **Ada's fork: (a), all groups in our module.** On Android:
  - our components read `object <Component>Tokens` in `com.designerpunk.tokens`;
  - the package refusal reserves that package (`src/cli/shared/reservedKotlinPackages.ts`, per Ada R1);
  - so (b) would emit adopter-only groups into the adopter's own package, which is a second emission target and a second package rule for one defect class that the emitter fix removes.
  - **Surviving counter (Ada's own)**: under (a), a future emitter defect fails our module for every adopter with one custom token. (b) would contain it.
- **#873 on Android: the emitted forms are correctly typed (VERIFIED as emitted; compile UNVERIFIED, REASONING high).**
  - **Method**: the same three product forms Ada probed, a hard colour, a ref to a colour primitive and a ref to a colour semantic, in `product/tokens/probe-colors.yaml`. `generate` exited 0.
  - **Result**, in `dist/tokens/product/ProductTokens.android.kt`:
    - `val brandHard = Color(0xFFFF3366)`, Compose's `Long` ARGB constructor;
    - `val brandPrimRef = DesignTokens.purple_300`, untyped, so it infers `Color`;
    - `val brandSemRef: Color @Composable @ReadOnlyComposable get() = LocalDPTheme.current.color_action_primary`.
  - So the defect is iOS-only. § 4.1's "Android … was not compiled (Ada; Data not yet consulted)" can read **"Android: read by Data; emitted forms are correctly typed; not compiled"**.
  - **One non-blocking difference**: the hard colour is emitted in sRGB (`Color(0xFF…)`), while every generated primitive and semantic colour is Display P3. A hex is sRGB by definition, so this is correct. A reader comparing values across files should know it.

**9. T-15, CI grants for 132's lanes. CHOOSE (a), one grant per unit, made cheap by riding the unit's tasks PR.** → design-outline.md § 5.2 "T-15", § 5.1 P-15
- **(a)'s cost is lower than R1 said (REASONING, from the README).**
  - Rule 8 activates a grant at "Peter's merge of a PR whose body names the grant".
  - Rule 10 forbids only a grant list "authored only inside the diff it bounds", and the diff a grant bounds is the *fixing* (unit) PR.
  - So each unit's grant record can travel in that unit's tasks-round PR. That PR is merged by Peter anyway, and carries the ARMING line. That adds **no extra Peter merge per unit**.
  - Stacy's ARMING read still runs at two merges per unit.
  - Thurgood and Stacy should confirm this reading of rule 10 before it is relied on.
- **Why not (b)**: a standing workflow-scope ballot widens two charters for the life of 132, ten-plus families. M1's own counter ("permanent scope for temporary work … charters drift toward 'everything'") applies directly.
- **Surviving counter-argument (the strong one)**:
  - A grant expires at its unit's merge. Every later fix to a lane that has already landed needs a new grant, which is how `native-harness.yml` works today: "an issue-row grant per fix" (my charter).
  - Once render lanes are required checks, an external break, such as a runner image or an emulator release, blocks every PR until a grant-backed fix merges.
  - So (a) is right for *building* the lanes. *Maintaining* them is the gap (b) would fill, and it comes due at the first lane's promotion to required.
  - **The fork I surface, for that promotion**: a per-lane ownership ballot like `2026-11-07-native-lane-ownership`, written at promotion, versus grant-per-fix. Peter's, then; not now.

**10. T-3, the iOS project form. CHOOSE hand-written, deferring to Kenya's evidence.** → design-outline.md § 5.2 "T-3"
- **Why**:
  - Kenya's #879 project built and ran with no generator (VERIFIED by her).
  - Leonardo's walkthrough point holds: adopters already have a plain `.xcodeproj`.
  - XcodeGen adds a tool to pin and to keep in the supply chain for no runtime gain.
- **Android has no twin question**: the Gradle Kotlin DSL is plain reviewable text.
- **The rest of T-3's Android half**:
  - the emulator and Robolectric split follows the probe, and the probe answers P-8 (§ 6 below);
  - Robolectric carries semantics, input and layout either way.
- **Surviving counter (Kenya's)**: a `pbxproj` is hostile to review, so a change to the project file is read by trust. A small mitigation: the D4 project's file list is checked against the fixture folder by a test, so an unreviewed file addition fails.

**11. P-7, the Kotlin idiom for not-ready API. CONFIRM `@RequiresOptIn`.** → design-outline.md § 5.1 "P-7"
- **The idiom**: an annotation class such as `@RequiresOptIn(level = RequiresOptIn.Level.ERROR, message = "…not yet supported…") annotation class ExperimentalDesignerPunkApi`.
  - Each public declaration of a not-ready family is marked with it.
  - A caller must write `@OptIn(ExperimentalDesignerPunkApi::class)`, or pass the compiler flag `-opt-in=…`, or the build fails.
  - This is the idiom Compose itself uses (`@ExperimentalFoundationApi`, `@ExperimentalMaterial3Api`).
  - It is stable in Kotlin (REASONING from training data; the Kotlin version this was stabilized in is not checked).
- **Limits**:
  - It is per declaration: a marker cannot annotate a whole file or package (REASONING). So the per-family API pass applies it to each public composable and type.
  - Removing the marker at a family's claim is additive and non-breaking.
- **D9 interplay**: the Kotlin public-API dump tools can exclude opt-in-marked declarations from the stable surface (the binary-compatibility validator's `nonPublicMarkers`; REASONING, version UNVERIFIED). So D9's diff can treat not-ready API as not yet promised.
- **With T-14 (ii)**: families the manifest leaves out need no marker. The marker is for compiled-but-not-claimed families only.
- **Surviving counter**: opt-in at `ERROR` makes the first-family release feel "experimental" to every adopter who touches a not-ready family, and `WARNING` is easy to ignore. The level is a product call for Leonardo, not a technical one.

**§ 6 and P-8, the Android probe (#884): VERIFIED from its runs.** → design-outline.md § 6
- **Run 46039771588** (head `fdb3c81f6`, runner image `ubuntu24 20261122.23.1`):
  - **`/dev/kvm`** exists. Before the udev rule it is `crw-rw---- group=kvm` and the runner user cannot open it. **After the rule**, it is `crw-rw-rw-` and opens. The emulator's `-accel-check` printed "KVM (version 12) is installed and usable".
  - **Downloads**, with no licence prompt and stdin from `/dev/null`: the emulator package in 14 s, the API 26 system image in 28 s, the API 36 image in 22 s.
  - **Boots and Robolectric failed on my setup, not the runner's**: the AVD was created where the emulator does not look, and the build failed its AAR metadata check.
- **A finding for P-9 and D4, from that failure (VERIFIED, the run's log)**: Compose 1.12.1, under the pinned BOM 2026.09.00, "requires … compile against version 37 or later of the Android APIs". The harness pins `compileSdk 36`.
  - The compile harness never sees this, because it runs only `compileDebugKotlin`, not the AAR metadata check that an app or test APK build runs.
  - So **the D4 Android app cannot build at the harness's `compileSdk`**. The adopter's `compileSdk` floor is 37 at this BOM.
  - It belongs in P-9's axes. It is not a harness defect. Moving the harness pin to 37 would be a choice, not a repair, under ballot `2026-11-07-native-lane-ownership` item 3, so it goes by a grant or spec row if wanted.
- **Run 46040355947** (head `18d74ba29`, `compileSdk 37`, one AVD home): **`success`**, about 7.5 minutes, same runner image.
  - Downloads, all with no licence prompt: the emulator package in 13 s, the API 26 image in 20 s, the API 36 image in 17 s.
  - Boots to `sys.boot_completed=1`: 35 s at API 26, 56 s at API 36.
  - The instrumented Compose smoke test passes at both levels: 145 s at API 26, which includes the first Gradle build, and 33 s at API 36.
  - The Robolectric Compose test passes in 53 s.
  - The verbatim `render-probe:` lines are in #884's body and in the goal record's § "Android render probe result (2026-11-27, Data)", on #884.
- **P-8**: **it does not arise on this evidence.** KVM is usable on the free `ubuntu-24.04` runner after the documented udev rule, and the emulator boots and runs a Compose test in under a minute per level. This is one sample: lane stability is a later read.
- **The `compileSdk` 37 finding** is recorded as a dated line on my toolchain-range record (`.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md`, item 1), in #884.

*Signed: Data, 2026-11-27.*

#### [ADA R2]

Read at `97f1e8672` (`spec/132-design-outline`, #880), in my own detached worktree. Nothing is committed or pushed. VERIFIED means checked by me at that head unless another commit is named; REASONING and UNVERIFIED are as in R1.

**A correction to my R1 first.** My T-12 count, 26 calls in 14 files, matched only the one-line form. The outline's 30 in 18 is right: I re-ran it with `perl -0777` over the non-test iOS component files and got 30 (VERIFIED). § 4.1 and the T-4, P-13 and T-7 owner rows carry my R1 as I meant it.

- **Item 5, T-14 (one module, many families): I pick (ii), a family-scoped manifest that `generate` writes.** → design-outline.md § 5.2 T-14
  - **It fits the manifest design I accepted in plan R2.** That manifest is already computed from what `generate` knows, and it already leaves out component folders the adopter has shadowed (`ada-plan-r2.md` L46–L56, VERIFIED, read). Leaving out families below the compile tier is the same kind of filter.
  - **The inclusion test must not be served readiness.** It should be the committed compile state: a family is in only if it has zero pinned entries in `harness/expected/*.tsv`. That is decidable from git, and it keeps the manifest independent of D7's derivation (item 8). Then the closure is added: Lina's list, for example Chip → Icon-Base, the blend helper and the tokens.
  - **Component-token groups follow the same filter.** `generate` emits our component-token groups only for included families, plus every adopter group.
    - Otherwise a not-ready family's tokens are public API in a module whose components are absent.
    - Together these give a property worth having for P-7: **at the first claim, a not-ready family has no public API at all, on the component side or the token side** (item 11).
  - **Why not (i)**:
    - (i) holds the first family's app until 45 iOS and 89 Android entries outside the slice are fixed (outline § 2, VERIFIED, Thurgood).
    - The slice then stops being a measure of one family's cost, and the measured-cost record measures all the repair, which changes what Peter reads at re-placement.
    - (i) is cheaper to build: there is no closure list and no filter.
  - **Surviving counter to (ii)**: the closure is a hand-kept list.
    - A wrong closure is a link failure in the adopter's build, which is the failure mode T-14 exists to avoid.
    - The guard is to compile each included family's closure alone in the harness. That is one more harness case per family and one more harness context per platform (REASONING; Kenya and Data price it).
    - With no such case, I would rather have (i).
  - **The sources filter itself** (SwiftPM `sources:`/`exclude:`, a Gradle `sourceSets` exclude) is Kenya's and Data's to confirm (UNVERIFIED by me).
- **Item 6, T-4 (where adopter tokens live): hold my fork and my lean (a). Kenya and Data have not yet answered the local-path import, and that is theirs.** → T-4
  - **T-14 (ii) does not change the fork.** Adopter groups are emitted whatever the filter, so one bad adopter token still fails our module under (a). (a)'s safety still rests on #870's fix and the both-paths fixture.
  - **For Data's #873 question: yes, read it before requirements.** `src/build/product/emitters/KotlinEmitter.ts` L71–L85 (VERIFIED, read) has two lines a compile would test:
    - **The hard colour** `Color(0xFF${hex})` assumes a six-digit `#RRGGBB`. A `#RRGGBBAA` or `#RGB` value gives a literal of the wrong length (REASONING).
    - **Whether the generated file imports `androidx.compose.ui.graphics.Color`** (UNVERIFIED by me).

    Its reference path uses the index's Android name (`DesignTokens.${resolvedPlatformPath.android}`), which is right for nested motion members if the index name is qualified, as Swift's emitter assumes (`'Duration.'`, `SwiftEmitter.ts` L91). That is UNVERIFIED for Android.
- **Item 7, T-12 and P-13 (where the text style lives): converge on the token, with one change that answers Lina's alternative.** → T-12, P-13
  - **Where the 30 calls get their size** (VERIFIED, `perl -0777`, the size argument of each call):
    - 9 read `DesignTokens.fontSize…` primitives;
    - 10 read a typography semantic's `.fontSize` (`typographyLabelMd`, `typographyCaption`, `typographyButtonMd` and others);
    - 9 read a component-local size (`size.fontSize`, `labelFontSize`, and so on);
    - 2 are literals.
  - So **a style on typography tokens reaches 10 calls directly**. The other 20 read a size with no role, and a size cannot carry a text style without inventing a size-to-style table, which would be wrong for primitives.
  - **The settlement I propose, for Lina to accept or change**:
    1. **The role lives on the typography semantic token.** It is a platform-neutral scale role (body, label, caption, title, and so on), so no Apple concept enters Rosetta. The Swift generator maps role → `Font.TextStyle`. Android and web ignore it, because `sp` and `rem` already scale.
    2. **The scaling mechanism is generated once**: a SwiftUI modifier taking a typography token, built on `@ScaledMetric(relativeTo:)` for the system family and `Font.custom(_:size:relativeTo:)` for a named one. Both exist on iOS 14 and later, so iOS 17 is covered (Kenya R1 cites them; UNVERIFIED by a run).
    3. **The 20 calls move onto typography semantics.** That is the component side (Lina), and it is semantic-first token use anyway. Where no semantic fits, it is a token-creation question for Peter, folded into P-13's review, not a per-component style choice.
  - **This takes Lina's "the emitter carries it" branch and drops "the components choose it once per role".** Eighteen files choosing a style is the drift the token avoids.
  - **Surviving counter**: the 20 moves are more component work than a per-call `relativeTo:`, and each needs a semantic that fits. Some, for example Avatar's literal 40 or the badge sizes, may need new typography semantics, which widens P-13 from "approve a mapping" to "approve a mapping and some tokens". The draft has to list them before sitting 2.
- **Item 8, T-7 (D7's source): agree with Stacy's lean. The hermetic rule points to the committed file, and the committed file needs one more rule to be decidable.** → T-7
  - **What the rule says** (`governance/classification-map.md` row `hermetic-publish-path`, VERIFIED, read): "built by the committed publish script in a fresh clone at the version's tag …; the registries' sha1s SHALL equal the script's recorded sha1".
    - It does not forbid network reads: the script already reads the npmjs packument in publish mode (`scripts/release-publish.ts` L61, L91, VERIFIED, read).
    - But that read decides whether to publish. It never changes what is packed.
  - **A GitHub-API read at publish would change what is packed**: the readiness file would be built from live state, not from the tag's tree.
    - The 5.1 dry run (at S) and the 5.3 publish (at the tag) could then pack different readiness if a check re-ran in between.
    - The derivation would also move from the row's commit-held scope into its live-state scope, which no census can re-read.
    - So the API form is against the rule's intent, even where its letter is silent. As the script's owner, I would not build it.
  - **The committed form, and its gap**:
    - The check results at S cannot be committed inside S: they exist only after CI runs on that commit.
    - So the file holds results measured on a named earlier commit `R`, the release PR's head before the commit that adds the file. The rule that makes it decidable: `git diff --name-only R..S` lists only the results file. The derivation and pack-assert refuse otherwise.
    - The release PR is squashed while current with `main`, so S's tree is R's tree plus the file (REASONING; the release PR's required checks make it current).
  - **Where it lands**: the publish script builds `packageReadiness.generated.ts` from that file inside the fresh clone, and pack-assert checks that the packed file equals the derivation.
    - It is a change to a ratified instrument, so it needs its own census line.
    - RELEASE-FLOW's step text is Thurgood's.
  - **Surviving counter**: one more file in the release PR, and one more refusal. A release whose checks re-ran after `R` publishes the readiness of `R`, not the latest run. That is the honest reading, but a re-run can no longer correct the packed readiness without a new release.
- **Item 11, P-7 (semver status of not-ready families): it composes with my R1 point, and with T-14 (ii) the hard case goes away.** → P-7
  - **My R1 point stands for the shared token surface.** `DesignTokens` primitives and semantics, the theme types and `ComponentTokens` itself are not family-scoped, so no per-family opt-in marking can make them unstable. They are API from the first claim, and a rename after it needs an alias.
  - **Per-family token groups** (`ChipTokens` and the like) can follow their family's status.
    - **Under T-14 (ii)** they are not emitted until the family is included, so they have no status to mark.
    - **Under (i)**, every family's groups are public from the first claim. They need Leonardo's marking: Kotlin `@RequiresOptIn` on the not-ready groups (REASONING; Data confirms the idiom). For Swift, a deprecation-message workaround (REASONING; Kenya confirms). Otherwise every later per-family change costs a major.
  - **So**: (ii) answers P-7's not-ready question structurally, because what is not compiled is not promised. (i) needs the marking and pays the Swift workaround's cost.
  - **Counter**: under (ii), a family's arrival in a later minor is an API addition, which D9's diff must show as an addition and not flag as a break. The D9 tool configuration has to allow that (UNVERIFIED; T-10's owners).

**Moved / held / agreed**:
- item 5: I chose (ii);
- item 6: held (a), and asked Data to read #873's Kotlin emitter, giving two lines to check;
- item 7: moved, to a role on the token plus a generated modifier, with the 20 calls moving onto semantics;
- item 8: agreed with Stacy, adding the `R..S` rule;
- item 11: agreed, and folded with T-14 (ii).

**Consulted**: none needed. This is a review entry.

*Signed: Ada, 2026-11-27.*

#### [STACY R2]

*I read #880 at `97f1e8672` (`spec/132-design-outline`), the R2 outline and the feedback doc with all seven R1 entries and `[THURGOOD R2]`, in a detached worktree of my own, on 2026-11-27. This is read-only and I committed nothing. VERIFIED means I checked it at that head, or at the commit named, with the command or file named. UNVERIFIED means I did not check it.*

**Mentions**: `[THURGOOD R2]` has no question to me. Its line on my standards implications records two adoptions: the sessions line as a proposed M4 instrument, and the D6 summary as T-16. I agree with both, and the guide change waiting for first-family evidence is right.

**Item 3, T-13 (the iOS hidden-view check), read for verifiability: I agree with Kenya, with one move and one D-row flag.** → design-outline.md § 5.2 T-13

- **D6's own bite rule settles Lina's walk against Kenya's measurement, mechanically.** Each contract test has a known-bad case that must make it fail (plan-r2 D6 details, VERIFIED).
  - Lina's in-app walk is UNVERIFIED, as her entry says.
  - Kenya's committed finding is that walking SwiftUI's accessibility tree from inside the process returns zero elements (`kenya-plan-r1.md` § 3, VERIFIED there by her). If that holds, the walk reports "hidden node absent" for every view. It passes vacuously, and its known-bad twin (the same view without `.accessibilityHidden(true)`) is never found, so the test never fails.
  - So no argument is needed: the walk is an oracle only if its known-bad twin fails. Run the twin first, and the result decides.
- **Kenya's snapshot measurement needs committing before the design round rests on it.** Her entry says "VERIFIED locally … run once and not committed". It is the evidence that rules out the snapshot route.
  - Under "commit what you cite" (the volatile-paths record, `.kiro/issues/2026-11-27-committed-records-cite-volatile-paths.md` on #871), the probe test and its output belong in #879's evidence README, with the Xcode and simulator versions.
  - Until then it is a report I cannot re-read.
- **Kenya's two-part iOS check is verifiable, with one labelling consequence.**
  - **Static (her primary)**: deterministic and bite-testable. Remove the modifier and the check must fail.
    - But it proves the declaration, not the effect. A parent can change the effect, for example by combining children or replacing the representation.
    - So static-only evidence is not `semantics-tested`, and readiness must not say it is. D7's kinds (`builds`, `renders (…)`, `contract-tested`, `semantics-tested`, `device-read (human)`; plan-r2 L101, VERIFIED) have no static kind.
    - **If the static check is the only iOS evidence for this contract, D7 needs a kind for it** (for example `static-checked`). That is a D7 wording change, and so Peter's (condition 2). Otherwise readiness over-claims the contract on iOS. List it with P-1's D-row changes if it arises.
  - **Runtime element count (her consequence)**: behavioural, and its known-bad twin is natural (an un-hidden decorative part adds one element in the frame).
    - Whether an un-identified hidden view is absent from the query is UNVERIFIED (her 15-minute probe).
    - **If the probe confirms it, I would make the runtime count the evidence that sets the readiness kind, with static as a second, labelled line.** That is my one move from Kenya's ordering.
    - **Surviving counter**: the count depends on an XCUITest behaviour nobody has confirmed, and a frame-bounded count can be fragile to layout. Static is deterministic. If the probe is ambiguous, Kenya's order stands and the D7 kind above is owed.
- **Android (Data): verifiable as proposed.**
  - A positive assertion on the merged semantics tree under Robolectric: no node and no description for the icon.
  - Known-bad: a non-null `contentDescription`. Data VERIFIED `contentDescription = null` at Icon-Base Android L71.
  - Robolectric counts for semantics in D6's tool weight (plan-r2, VERIFIED).
  - The property's name in the pinned BOM is UNVERIFIED (Data), and the first test's compile settles it.
- **For T-16**: the D6 summary should carry, per contract and platform, the oracle's name and its evidence kind, beside the state and the known-bad result. Then "a per-platform oracle name for the same contract" is something my CLOSEOUT can read.
- **The device read stays P-12, a D5 change**, as folded. Both seats keep it as a fallback only (VERIFIED, P-12 row).

**Item 9, T-15 and P-15 (CI grants), reading (b)'s width: hold. (b) has not yet earned its width.** → design-outline.md § 5.2 T-15, § 5.1 P-15

- **The base rate decides, as it did for M1.**
  - M1 was narrowed to P1 at R2 on a measured base rate (ballot `2026-09-27-ci-regime-standing-scope` L3, VERIFIED): P1's task recurred twice in two days, while P2–P4 recurred at most once in 80 days and went per event.
  - T-15 is uncosted, so (b) is being weighed against "ten-plus families" times "each unit". That multiplication is not yet shown.
- **The D4 rule points the other way.** "The component list comes from the committed catalog. The fixture is generated from it, and the job fails on any component it did not construct" (plan-r2 D4 details, VERIFIED, L109).
  - Lanes built that way are catalog-driven. A later family unit adds components and fixtures under `harness/**` and component paths, and touches no `.github/**` file.
  - The workflow additions then cluster in the slice (the render lanes, the D4 builds and D8's sample build) and near the claim (D9's upgrade and diff, P-9's range builds). That is roughly five to eight grants in total, not one per family (REASONING; the design round's lane count decides).
  - At `97f1e8672` the only native workflow is `native-harness.yml` (VERIFIED, `ls .github/workflows`).
- **My read: (a), plus one design-round obligation.** The lanes are catalog-driven, so a per-family unit edits no `.github/**` path. The design round's count of workflow edits per unit is the evidence for revisiting (b). If it shows recurring per-unit edits, (b) is worth drafting.
- **If (b) is drafted, its width needs these limits.** Each one is decidable from the diff, and each is what my ARMING read would check:
  1. **An exact file list, no glob.** A glob such as `.github/workflows/native-*.yml` admits files nobody has named.
  2. **Additive, or each deletion named.** `git diff --numstat` deletions are `0` on the listed files, or the PR body quotes each deleted line, as for issue-row grants.
  3. **M1's excluded acts carried**: no new required context; no change to `EXPECTED_CONTEXTS`'s count; no step, floor or assertion removed or weakened. Promotion stays on its own route: Peter's branch protection, Thurgood's registration.
  4. **No permission widening** beyond `contents: read`, and no secrets, without a named act.
  5. **An expiry event**: the scope ends at the merge of 132's CLOSEOUT claims pass (`.kiro/specs/132-native-components-in-app/completion/claims-pass.md`). That answers M1's own counter, "permanent scope for temporary work", with a git-visible end.
  6. **The ARMING read at each PR** under these limits, recorded at column 0 the way grant reads are.
- **What (b) also costs** that (a) does not: a charter change for two seats (Kenya, Data), so a ballot, two consults and their signing acts, before the first lane.
- **Surviving counter to my hold**: if the design round finds that per-family fixtures need per-family workflow edits after all (for example, per-family jobs for CI-minute reasons), then (a)'s grants do multiply. Each costs Peter a merge, and me two reads. The count decides, and it is not in yet.

**Item 12, § 3 and T-17 (the measured-cost record): I agree with the folded rows, with four refinements. On the 131 column I move to Thurgood's proposal, with three conditions.** → design-outline.md § 3, § 5.2 T-17

- **The folded rows match my R1 proposals** (VERIFIED, § 3 table at `97f1e8672`): the window, the sessions line or the estimate label, CI tables pasted at writing, the D6 summary (T-16) with exclusions as a fraction, defects by `git log --diff-filter=A`, the extrapolation as REASONING with its bias counts and the instrumentation note. Lina's added row, shared costs booked apart, is right.
- **Refinement 1: "Shared costs, booked apart" needs the sessions line to carry the work package.**
  - `**Sessions**: <seat> <n>; …` cannot be split into the blend repair, T-12 and T-13 afterwards.
  - **Change**: `**Sessions**: <seat> <n> (<work package>); …`, with the shared work packages named in the tasks round. CI minutes split the same way, by workflow.
- **Refinement 2: "Peter's sittings" needs a grouping rule, or it counts answers.**
  - Today alone, Peter's answers on B2 landed at 16:33:44Z, 16:38:05Z and 17:01:22Z (recorded in the ballot's Status and Answered lines). Is that one sitting or three?
  - **Change**: report the raw count of receipt times (decidable), and sittings under a stated grouping rule (for example, receipt times within the same orchestrator exchange, or less than two hours apart), with the rule printed beside the number.
- **Refinement 3: paste the CI table per unit, not once at the end.** The record is written when the first family closes, which may be weeks after its first runs. Each unit's completion doc should carry its own run table (run ID, workflow, runner label, duration) at its merge, and the record sums them. That is the same reasoning as T-16's per-unit summary.
- **Refinement 4: the sessions line is self-attested, and the record says so.** My pass can check that each first-family parent completion doc carries the line, and that the record's sums equal the lines. It cannot check that the numbers are true. The row should read "self-reported per parent".
- **The 131 column (T-17): I move to Thurgood's proposal, that he sizes 131, over dropping the column.** Peter's re-placement compares the remaining families against 131, so a one-sided record leaves him the comparison to make himself. Three conditions make the estimate a fair comparator rather than a number fitted to the answer:
  1. **Committed before the first family's data exists**, not merely "before the record is written". That means before the first first-family unit PR merges (decidable: the estimate's commit is an ancestor of that merge). This is my plan-R1 principle in another place: numbers written after the comparison is visible get bent toward it.
  2. **The same units and a stated scope**: sessions by seat, Peter's sittings and, where it applies, CI minutes, over a named span of 131 (its requirements through its CLOSEOUT, or its first unit). The method is labelled REASONING. Where 131's cost ledger (`.kiro/specs/131-governance-simplification/inbound-governance-cost-ledger.md`) gives measured inputs, the estimate cites them.
  3. **The conflict stated**: Thurgood is 131's formalizer and owns the measured-cost record's form. A line saying so, and one other seat's read of the method before it is committed, is enough. I read whether it is verifiable, not whether it is right.
  - And one calibration line, owed later: 131's CLOSEOUT pass reads the estimate against what 131 actually cost. I will carry it there.
  - **Surviving counter**: a forecast of 131 set beside a measured 132 family is still not like for like. One is measured and one is reasoned, whatever the units. The record must say so in the column's header, or Peter reads the two numbers as the same kind.
- **T-14's (i) note**: agreed. If (i) is picked, the record measures all of the repair, and Peter is told at the pick (VERIFIED, § 3).

**Summary**:
- **Item 3, T-13**: I agree with Kenya. One move: the runtime count sets the readiness kind if her probe confirms it. One flag: static-only evidence needs a D7 kind, which is Peter's (condition 2). Lina's walk is decided by its known-bad twin.
- **Item 9, T-15**: hold on (b) until the design round's lane count shows per-unit workflow edits. With catalog-driven lanes, (a) costs a handful of grants. If (b) comes, six limits apply.
- **Item 12, § 3 and T-17**: agree with the folded rows, plus four refinements: the work package in the sessions line, a grouping rule for sittings, the CI table per unit, and the self-attested label. On the 131 column I move to Thurgood's proposal, with three conditions: committed before the first family's data, the same units and scope, and the conflict stated.

**Standards implications**: none new. The sessions-line form (with the work package) and the per-unit CI table both feed the guide change Thurgood holds back until the first family.

**My counter-argument to this entry, folded back**: I keep asking for committed numbers on a record whose purpose is speed of decision. Folding that in, each refinement is a line in a doc that is written anyway. HOWEVER, what survives: the 131 estimate's "commit before the first family's data" condition can delay T-17. If Thurgood can't size 131 before the first unit merges, the column drops to one-sided by default. That is a cost to Peter's comparison, which only Thurgood's timing can avoid.

#### [LINA R3]

**T-1 only.** Read: `leonardo-r2.md` (his item 1), against component source at `origin/main` `017514064` (Input-Text-Base unchanged from `8553499b1`). Read-only for #880.

**Final position: the constrained `platformParts:`, in Leonardo's R2 form. We converge. T-1 closes with this shape, and no fork goes to Peter.**

I own the schema, so this is my pick:

- **Per platform**, `kind: platform | drawn` plus a `reason`, as before.
- **An optional `platformParts:`**, allowed only when `kind: drawn`. It is a list of `{ id, reason }`.
  - `id` is an accessibility identifier that **the component itself sets**, derived from its own id (for example `<id>-text-entry`). The fixture does not set it. This is his refinement 1, and it is right: a fixture cannot label a view inside our component. Today the iOS component labels only its helper and error text (`InputTextBase.ios.swift` L366, L375, VERIFIED), so the field needs one new identifier. That is my change.
- **The first population is one entry**: iOS Input-Text-Base, `text-entry`. **Android lists no part** (his refinement 2, which I already accepted in R2: `BasicTextField`'s text and caret are drawn with our tokens, `InputTextBase.android.kt` L328, VERIFIED).
- **One home, not two.** D5 reads `platformParts:` from the schema the application MCP serves. It does not keep a copy in its own per-component sample list.
  - That answers the duplication argument I made in R2, and it is why I move back.
  - The identifier change is owed under either shape, because D5 must find the field to exclude it. Given that, the served, machine-readable form costs one schema sub-key more than the prose form, and it tells an adopter's agent which pixels our theme does not reach.

**Surviving counter (mine, carried from both rounds)**:
- It is a schema field whose only use is one component on one platform.
- The guard against over-claiming ("the system draws it" as an escape from a failing ink check) is a reason on each part, read at the claims pass. That is a read, not a test.
- If no second case appears by 132's CLOSEOUT, the field stays as a one-entry list. I accept that cost.

**Not T-1, but owed now**: Leonardo found that **neither platform sets selection colours** (VERIFIED: no `selection` colour, `tint` or `accentColor` in either Input-Text-Base file; Android sets only `cursorBrush`). I fold that into the theming record I file today, beside the iOS caret. The record is not part of the `rendering:` shape.

*Signed: Lina, 2026-11-27.*

#### [LEONARDO R3]

**T-1 only.** Read: `lina-r2.md` (her item 1), against my R2. Read-only.

**Final position: one field.** Per platform, `kind: platform | drawn` plus a `reason`. Where a drawn component wraps a system part, the reason names that part. This is Lina's R2 shape, which was my R1 shape. **We do not differ. T-1 closes, and no fork goes to Peter.**

- **Why I stop here instead of crossing again.** My only reason for moving to `platformParts:` in R2 was a consumer fact: the iOS caret and selection follow the app's tint, not the DesignerPunk theme. Lina now treats that as what it is, a parity defect in her component, to be fixed at the source (her rule-10 record (a)). She is not describing it in the schema.
  - Fixing it is better for adopters than describing it. Once the iOS field takes its caret and selection colours from the theme, the "parts the adopter's theme doesn't reach" fact goes away, and so does the case for a structured field.
  - VERIFIED, as both of us found: Android draws its own caret (`cursorBrush = SolidColor(theme.color_action_primary)`, `InputTextBase.android.kt` L328). The iOS file sets no `.tint`, `.accentColor` or caret colour.
- **The consumer conditions I attach, both already in Lina's R2:**
  1. Until record (a) is fixed, iOS Input-Text-Base's `reason` says plainly that the caret and selection follow the app tint, not the theme. That way the served schema does not imply a theming promise the component does not keep.
  2. The trigger to revisit is a second component that wraps a system control. That is when a structured field earns its place.
- **Surviving counter** (mine, and Lina records it): a prose reason is not machine-read. If record (a) stays open past the claim of the family that holds Input-Text-Base, adopters' agents can see the gap only by reading prose. In that case the fix is to close (a) before that claim, not to add a field.

*Leonardo, 2026-11-27.*

#### [THURGOOD R3]

*2026-11-27. The R2 cross-read entries above (Lina, Leonardo, Kenya, Data, Ada, Stacy) and the two T-1 R3 entries (Lina, Leonardo) are spliced byte for byte from the seats' files, in the order the orchestrator listed them. `design-outline.md` is now R3. Record states read at `origin/main` `017514064`.*

**Closed by the cross-read** (each → design-outline.md § 5.2):
- **T-3**: a hand-written `.xcodeproj` with synchronized folders (Kenya, Data, Leonardo). Kenya measured that adding files needs no `project.pbxproj` edit.
- **T-4 (a)**: all token groups in our module (Ada, Kenya, Data). The local-path import is VERIFIED on iOS with `.package(name: "DesignerPunk", path: …)`, because the plain form fails (Kenya). It stays REASONING on Android until D4 builds.
- **T-5**: the config name is the stored string. Kenya moved; Data held. iOS writes it as explicit raw literals and Android as a `key`.
- **T-13**: the in-app walk under a UI-test session, with its known-bad twin. Kenya measured 3 elements against 5. Lina's R2 predates that measurement, so her confirmation is owed in the design round. **I did not mark this one closed on her behalf.** Data has the Android oracle.
- **T-14 (ii)**: a family-scoped manifest (Ada, Kenya, Data, with Leonardo's consumer reading). **The inclusion threshold is still open between Ada and Leonardo.** Ada's is the committed compile state. Leonardo's is claimed families by default, with a ratchet and one readiness source. The threshold decides P-7's not-claimed half, so it is named there.
- **T-15 (a)**: per lane, with data-driven lanes. This reconciles Kenya's "per lane", Data's "per unit" and Stacy's catalog-driven lanes. If lanes read their family list from a file, the only units that edit a workflow are the slice and the claim unit. So the grants are per lane, and a grant is needed per unit only where a unit edits a workflow. Data's reading of rules 8 and 10 is that a grant record can travel in the unit's tasks-round PR. I agree with it, as the steward of these rules: rule 10 bars a grant list "authored only inside the diff it bounds", and the tasks PR is not the diff it bounds. Stacy's ARMING read is still hers to confirm. The maintenance fork Data raised goes under "Later".
- **T-11**: carried as closed from R2.

**Converging, with an act still owed**:
- **T-7**: Stacy's committed results file, with Ada's `R..S` rule. It changes a ratified instrument (row `hermetic-publish-path`), so it needs a census line. **RELEASE-FLOW's step text is mine, and it is LAW**, so it goes to Peter as a ballot when the design is drafted (§ 5.1, "Later"). Sparky's web-column question is unanswered.
- **T-12 / P-13**: Ada's settlement. A scale role goes on the typography semantic tokens, and iOS emits a view modifier, not a computed `Font` (Kenya). The 20 calls that read no semantic move onto semantics. Lina classified them: 10 semantic, 9 primitive, 9 computed, 2 literal. Kenya's correction is folded in: `.system(size:weight:relativeTo:)` does not exist. P-13 grows to the mapping plus any new typography tokens, which Ada lists before the sitting.
- **P-7**: under T-14 (ii) most of it falls away. What remains is the release itself and, if the threshold is the compile tier, opt-in marking: Kotlin `@RequiresOptIn` (Data) and Swift `@_spi` or a separate product (Kenya). Aliases for the whole shared token surface are owed from the first claim either way, and every seat agrees.
- **T-17**: accepted under Stacy's three conditions and four refinements (§ 3). Sizing 131 is my act, and it must land before the first first-family unit PR merges.

**T-1 does not converge. It goes to Peter as P-16.** The positions crossed three times. In R1, Lina moved to `platformParts:` while Leonardo withdrew it. In R2 they swapped. In R3 Lina returned to the constrained `platformParts:` and Leonardo returned to one field. Each final entry says "we converge", on different shapes. P-16 gives both shapes with their counters, plus option (C), the owner's call: Lina owns the schema under her record. The facts both agree on are in T-1's row.

**New facts folded**:
- **Data's Android probe passed** on #884 (run 46040355947): KVM is usable after the udev rule, boots take 35 s and 56 s, and no licence prompt appeared. **P-8 does not arise.**
- **The `compileSdk` 37 finding** (Compose 1.12.1 under BOM 2026.09.00) goes into D4 and P-9, and onto the toolchain-range record (#881, now on `main`). Six records now fire at `requirements.md`.
- **#884 merges before #880**, as precondition 2.
- **Peter chose the local iOS 17 download** (P-10, iOS). The time 2026-11-27T17:20:36Z is as Kenya's R2 cites it; his verbatim words are not yet in a committed record. The version, 17.0 or 17.5, is still open with him, and the run has not happened. The iOS 17 probe's rule-10 record is owed in the PR that records his go (Stacy R1).
- **Records**: #870, #873, #877 and #881 merged. Lina's #885 (the caret and selection theming, and the literal `14`) is open.
- **One promise in R1 did not land**: #877 merged without Lina's `@ a953ac70d` pin on its Source cites (VERIFIED). The pointer is now hers to add, under rule 9.

**Peter's sitting-2 batch, in decision order** (design-outline.md § 5.1):
1. P-1
2. P-2
3. P-7
4. P-6, once the iOS 17 run is in
5. P-3
6. P-4
7. P-5
8. P-13
9. P-16
10. P-14, if the orchestrator includes it

Only if they arise: P-11 and P-12. Later: P-9, the lane-maintenance fork, and T-7's RELEASE-FLOW ballot.

**The close**: Kenya and Data are not signalled yet. Their close commit comes after Peter's batch (§ 7, precondition 3).

**Consulted**: Lina, Leonardo, Kenya, Data, Ada and Stacy, through their R2 entries above; Lina and Leonardo again through their T-1 R3 entries.


#### [KENYA R4]

**Context.** Peter asked (2026-11-27T18:18:45Z) whether we should just run the simulations on whatever version Apple recommends. The orchestrator's answer leans (A): keep the 17.0 minimum, test on the current iOS, and run old versions only now and then. I read it at `origin/main` `e03d3ae3f`, plus two runner-image readmes and Apple's Xcode support page, all read 2026-11-27. The probe record is #886; the park is noted in it at `1e5620383`. Read-only otherwise.

**Short version**: yes, test every run on the current iOS. (A) is safe for **what the compiler proves** and unsafe for **behaviour**, so its promise must say which is which. The honest middle is (A) plus one cheap addition: a release-time run on the **oldest runtime a free CI image carries**, iOS 18.5 or 18.6 today. That narrows the gap to one major version, with no sign-in. And the minimum must be decided **before the first support claim**, because raising it afterwards is a breaking change for adopters.

**1. Is (A) safe? Partly. Which breakage would the compiler miss?**
- **What the compiler does catch.** Compiling with `-target …ios17.0` rejects any API newer than 17. VERIFIED in my 129 design inbound: `MeshGradient` is rejected at 17.0 and accepted at 18.0. At 129's input it found zero iOS-18-only uses.
- **No hidden iOS 17 code paths.** Our iOS component and blend sources contain **no `#available` or `#unavailable` branches**; the only `@available` lines are `iOS 13.0` declarations in the blend helper (VERIFIED, grep). So no branch runs only on 17. The whole risk is the **same code behaving differently** on an older OS.
- **The classes the compiler cannot see, ranked for our components:**
  1. **System controls inside our components look and size differently by OS.** Input-Text-Base wraps the system `TextField` and `SecureField`, and Button-VerticalList-Item uses system controls (VERIFIED by grep; Lina and Leonardo verified the same in R1). iOS 26's restyle of system controls changes their look and metrics against 17. That much is plan-r2's own premise; the details are UNVERIFIED. D5's ink floors and frame checks were tuned on iOS 26.0 only (#879).
  2. **The accessibility tree.** Our iOS components carry 28 uses of `accessibilityElement(children:)`, `accessibilityHidden`, `accessibilityRepresentation` and `accessibilityAction` (VERIFIED, grep count). How SwiftUI turns those into VoiceOver elements is the platform's runtime, not our code.
     - The T-13 oracle I measured today (#879 § 4: an in-app walk that sees 3 elements against 5) depends on SwiftUI building the tree only while an accessibility client is attached. That is undocumented behaviour, measured on 26.0 only. **This is the highest-risk item**: the check itself could behave differently on 17.
  3. **Dynamic Type layout.** `@ScaledMetric` and `Font.custom(_:size:relativeTo:)` compile at 17.0 (VERIFIED, typecheck) and have existed since iOS 14 (training data). How text grows at accessibility sizes, and so whether fixed-height layouts clip, depends on the OS. Medium risk.
  4. **`@AppStorage` with a `String`-raw enum** (T-5): compiles at 17.0 (VERIFIED), and the API is old and stable (iOS 14, training data). Low risk.
  5. **The Swift runtime.** Newer runtime features are gated by availability, so the compiler catches them. Our generated tokens are static constants; our components are Swift 5. Low risk; any residual difference is UNVERIFIED.
  6. **OS bugs fixed after 17**: unknown by definition.
- **So**: (A) is safe for "builds for and links against iOS 17.0". It is not safe for "behaves as described on iOS 17", which is the claim Peter's goal ("will successfully render, in the app as described") cares about. The wording rule already draws that line: "built for iOS 17.0, not run on 17".

**2. What occasional old-version runs cost now.**
- **Local, Peter's manual download.** He signs in at developer.apple.com and downloads the iOS 17.5 runtime image (7,336,630,623 bytes, from Apple's index); I import it. Today Xcode 27.2's own downloader refuses it, in two attempts, both exit 70 (VERIFIED, #886).
  - Cost: one sign-in, about 7.3 GB once. The runtime then stays on this Mac.
  - The run is a local report, not a CI record, so a claims pass cannot re-run it. Whether the import is accepted is UNVERIFIED.
- **GitHub-hosted runners: no image carries iOS 17** (READ, `actions/runner-images` readmes, 2026-11-27).
  - `macos-15` (image 20261118.0550.1) installs iOS simulators **18.5, 18.6, 26.0, 26.1, 26.2**, with Xcode 16.x and 26.0.1–26.3.
  - `macos-26` (image 20261117.0516.1) installs **26.2, 26.4, 26.5**, with Xcode 26.6 as default. Our lane's pin is Xcode 26.6 (`harness/pins.yaml`, VERIFIED).
  - A CI iOS 17 run would have to download the runtime on the runner. Xcode's downloader refused 17.5 here, and the manual image needs an Apple ID. So CI would need Peter's credentials stored as a secret. I would not recommend that, and its feasibility is UNVERIFIED.
- **The cheap route that does exist: iOS 18.5 or 18.6 on `macos-15`, free, no sign-in.**
  - Cost: one more workflow, which needs an issue-row grant, plus macOS minutes at releases.
  - It also uses a second Xcode, not the lane's 26.6. Whether Xcode 26.3 on that image runs the 18.x runtimes is UNVERIFIED: the image installs both, but I have not run it.
- **What "occasional" should mean.** Once at the first support claim, and once whenever the minimum is re-decided. Not every release.

**3. Is (B), raising the minimum, defensible? Yes, to 18. Not to 26.**
- **To 18.** That is the oldest iOS that free CI can run, so the minimum would be one we can test on (item 2). Today's code needs no iOS 18 API: zero availability errors at 17.0 (VERIFIED, 129). So it buys evidence, not features.
- **To 26.** That aligns the minimum with what we test every run, but it drops two OS generations of devices for no code reason. I would not defend it.
- **What raising costs adopters**, without guessing numbers:
  - Our generated `Package.swift` declares `platforms: [.iOS(.v18)]`, and an adopter's target that depends on our module must deploy at or above that (SPM's rule, training data).
  - So an adopter whose app supports iOS 17 users cannot use our components at all, not even behind `#available`, because the module will not link at their target.
  - It takes a product decision, which devices to support, out of the adopter's hands.
- **Either way it is law.** Core Goals says "iOS: 17.0+", so changing it is a ballot, as Android's API 26 was (`2026-11-05-core-goals-android-minimum`).
- **Timing matters.** Before the first support claim, raising costs no adopter anything. After the claim it is a breaking change under semver ("7 (a)"). So P-6 is a before-the-claim question.

**4. What "the version Apple recommends at the time" means for a pinned toolchain.**
- **Apple's recommendation in practice** is the current released Xcode and its matching iOS. The support page lists Xcode 27.2 with SDK "iOS 27.2" and simulator support "iOS 17 or later" (READ, 2026-11-27T17:24Z).
- **Our lane pins Xcode 26.6 on `macos-26`.** Pin moves are deliberate (ballot `2026-11-07-native-lane-ownership`). So "current" for us is **the newest simulator runtime the pinned image carries for the pinned Xcode**: iOS 26.5 today (READ, `macos-26` readme). It moves when we move the pin, never by itself. That is right: a lane whose OS changes under it is not reproducible.
- **This Mac**: Xcode 27.2 (SDK 27.2) with only an iOS 26.0 runtime installed (VERIFIED). So my spike ran neither the lane's "current" (26.5) nor Apple's (27.x). A local run is a probe, never the record.
- **Concrete proposal.**
  - Every PR runs on the pinned image's newest runtime.
  - Shipped text says "built for iOS <minimum>; tested on iOS <runtime>", with the runtime named from the lane's printed toolchain, not typed by hand.
  - The pin moves on the cadence the lane-ownership ballot already sets.

**5. My strongest counter to my own answer.**
- **The counter.** "Occasional iOS 17 runs" now depend on Peter signing in and downloading on one Mac, and a claims pass cannot reproduce the result. In practice they will rarely happen. So (A) drifts into "minimum 17, never run on 17" indefinitely: a promise with a permanent gap.
  - (B) to 18 closes the gap for free.
  - Its cost (adopters who must support iOS 17 are shut out) is real but unmeasured, and today we have no adopters to shut out.
- **What I folded in.** The release-time 18.5/18.6 run narrows the gap to one major version. Deciding before the claim makes a later raise unnecessary.
- **What survives.** Under (A), behaviour on 17 itself is still never checked by anything reproducible. The two defensible options are:
  - **(A)**, with the gap stated in shipped text and one manual 17 run at the claim, if Peter does the sign-in;
  - **(B) to 18**, with no gap and a narrower adopter base.

  Which to pick is Peter's call. I lean (A) only if he is willing to do that one sign-in at the claim. Otherwise I lean (B) to 18, before the claim.

#### [LEONARDO R4]

**Read**: `[KENYA R4]` (`answers/kenya-ios-test-on-current.md`). My repo reads are from earlier today: the guide's iOS line at L179 and the D4 details in plan-r2 § 1. I ran nothing new. Read-only. Consumer voice on P-6; the pick is Peter's.

**1. What a 17 → 18 floor costs an adopter**
- **Who it shuts out**: an adopter whose app's deployment target is iOS 17.x. That is a team that has chosen to keep supporting users who have not updated past 17.
- **Probably not new hardware.** As far as I know, iOS 18 runs on every device iOS 17 does (REASONING, from training data; UNVERIFIED, Kenya to confirm). If that holds, the floor shuts out a **support policy**, not a **device**. That is a much smaller cost than "drops iOS 17 devices", which is how plan-r2 put it.
- I give no share numbers.
- **How they hit it**: at Xcode's package resolution or build, not at runtime. A target at 17.0 that depends on a package declaring `.iOS(.v18)` fails with a "requires minimum platform version 18.0" error (REASONING on the exact wording). It fails loudly, early, and names the version. That is the good kind of failure.
- **The trap specific to Model B**: the adopter's root `Package.swift` is generated into their own repo, and our source needs no iOS 18 API (Kenya, VERIFIED). So an adopter, or their agent, can edit `.v18` to `.v17`, and it will compile. They are then outside support without knowing it. The served text has to say the floor is a support boundary, not a compile one (item 3). `generate` should restore the declared value on its next run, so a local edit does not quietly persist (Ada's call).

**2. Is "built for iOS 17.0; tested on iOS 26.5" honest and usable? Honest. Usable only with two additions; without them it is a trap.**
- **Why it can be a trap**: an adopter, or their agent, reads "17.0" as the supported floor and assumes the components behave there. The gap is widest exactly where the adopter's oldest users are. Our test OS is the newest, and the system controls inside our components restyled at 26 (Kenya's ranking, item 1). An agent that reads "iOS 17.0+" in isolation will not carry the second half of the sentence.
- **What makes it usable**:
  - (a) The minimum is never printed without the tested runtime beside it, on every served surface, with the runtime taken from the lane's printed toolchain (Kenya's rule).
  - (b) The consumer charters (Kenya's and mine, through Thurgood) tell the agent: if the app supports an OS older than the tested runtime, test on that OS yourself. DesignerPunk has not.

  D7's evidence kinds already carry the runtime ("renders (iOS 26.x, target 17.0)"), so served readiness agrees.

**3. What the docs and samples must say under each option**

**Both options**:
- The minimum lives in one generated value that `Package.swift`, D4's target, the guide's iOS line, INSTALL and the walkthrough all read. Otherwise four places will drift apart.
- D8's samples compile in the D4 app at that minimum, so a sample that needs a newer API fails D8.

**Under (A)**:
- The guide's iOS line (today "compiled for an iOS 17.0 deployment target; not run on any device or simulator", L179) becomes "built for iOS 17.0; tested on iOS <lane runtime>; not run on iOS 17". If Peter's manual run happens: "run once on iOS 17.5 at <release>, locally; not reproduced in CI".
- The walkthrough:
  - **You'll need**: "an app with an iOS deployment target of 17.0 or later";
  - **How you know it worked**: name the runtime the checks ran on;
  - **If not**: "your app supports iOS 17: test your screens there yourself".
- D4's target stays 17.0.

**Under (B)**:
- A Core Goals ballot, and the generated `platforms: [.iOS(.v18)]`.
- The guide: "iOS 18.0+; tested on iOS 18.x and <lane runtime>".
- The walkthrough's **You'll need**: "an app with an iOS deployment target of 18.0 or later". Its **If not** quotes the resolution error and the fix: raise your target, or don't adopt yet.
- One sentence: "lowering the minimum in the generated `Package.swift` compiles but is unsupported".
- D4's target becomes 18.0, and plan-r2's D4 detail changes with it (a D-row edit, inside P-1).

**4. My lean: (B), raise to 18, before the first claim.**
- **Why**:
  - It is the only floor we can test reproducibly for free.
  - It probably shuts out no device (UNVERIFIED, above).
  - No code needs iOS 18, so it buys evidence, not features.
  - There is no adopter today to break.
  - A raise after the claim is a breaking change.
- **Counter, run against it**: (B)'s rationale, "the floor is the oldest runtime free CI carries", is a treadmill. `macos-14` was retired on 2026-11-02 (plan-r2's instruments table). When `macos-15` goes, the oldest free runtime is 26.x, and the same argument says raise to 26, which Kenya rightly calls indefensible.
- **Folded in**: the floor should be stated as a **product choice** (18, for reasons that stand on their own), tested on the oldest free runtime available. When the runners stop carrying 18, the gap is stated in the text, as under (A), rather than the floor following GitHub's image schedule.
- **What survives**: (B) closes the gap for about as long as `macos-15` lives, not for good. After that we will be printing "built for 18; tested on 26.x", which is (A)'s gap one version later. The benefit is temporary, and the cost (teams supporting iOS 17 are shut out) is permanent until we lower it again.
- **Where I come out**: that is still better than (A) without Peter's sign-in, which Kenya agrees is a permanent gap from day one. If Peter will do the one download at the claim, (A) and (B) are close, and his own adopters' support policy should decide.

*Leonardo, 2026-11-27.*

#### [PETER] P-6

*Recorded by Thurgood, 2026-11-27. Peter's words, from the orchestrator's relay; the receipt time is the orchestrator's `date -u`.*

**Received**: 2026-11-27T18:32:45Z. **Verbatim**: "(B), raise to iOS 18".

**What he was asked**: first his own question (2026-11-27T18:18:45Z), whether the simulations should simply run on whatever version Apple recommends at the time; then the choice between (A), keep the 17.0 minimum, test every run on the lane's current iOS and run old versions only occasionally, which was the orchestrator's lean, and (B), raise the minimum. **What he read**: `[KENYA R4]` and `[LEONARDO R4]`, spliced above byte for byte from the seats' files. Both lean (B) to 18 before the first claim: Kenya because no free CI image carries iOS 17 and the oldest it carries is 18.5/18.6, so 18 is the oldest floor we can test reproducibly; Leonardo because 18 probably shuts out a support policy rather than a device (UNVERIFIED), and a raise after the claim is breaking.

**Confirmed**: received 2026-11-27T18:36:18Z, verbatim: "Yes, (B) still stands, raise to iOS 18". **What he was told first**: Kenya's finding, relayed by the orchestrator (not yet in a committed file; UNVERIFIED by me): no iPhone is dropped, but three iPads that run iPadOS 17 cannot run 18: the iPad (6th generation), the iPad Pro 10.5-inch and the iPad Pro 12.9-inch (2nd generation). That is the floor's device cost, and it corrects `[LEONARDO R4]`'s "probably not new hardware".

**Not a ratification.** Core Goals' "iOS: 17.0+" changes only by ballot. The ballot seat drafts it separately, and it must be ratified before 132's first support claim (design-outline.md § 4.4).

#### [THURGOOD R4]

- Recorded P-6 as RULED, with both of his answers (18:32:45Z and the confirmation at 18:36:18Z), what he was asked, what he read and the device cost he was told. → design-outline.md § 5.1
- Its effects, folded: D4's iOS target 17.0 → 18.0, put to Peter as a D-row edit inside P-1 (→ § 1, § 2, P-1); a release-time iOS 18.5/18.6 run on `macos-15` joins T-15's lanes and grant (→ § 2, T-15); the shipped wording form "built for iOS 18.0; tested on <runtime from the lane>", which changes shipped text only once the ballot is ratified (→ § 4.3); `generate` restores the declared floor, Ada's (→ the record below); the Core Goals ballot as a precondition of the first claim (→ § 4.4); the iOS 17 probe, #886, moot, Kenya's to re-rule or close (→ § 4.2, § 6).
- **Rule 10**: recording a ruling that creates obligations files a record in the same PR. Filed: `.kiro/issues/2026-11-27-spec-132-ios-minimum-18-owed-acts.md` (owners Kenya, Ada, Thurgood; Trigger `path:.kiro/specs/132-native-components-in-app/requirements.md`). Each owner may re-class or re-rule their item under rules 9 and 12.
  - *Withdrawn later on 2026-11-27, Thurgood*: that record duplicated the one the ballot seat filed for the same ruling, `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md`, in the Core Goals ballot's PR (#888, at `d85b09a18`). The duplicate came from two seats being briefed on one ruling. It is removed from this PR and was never on `main`, and the outline now points at #888's record. Its text is in git at `f25da3d8a`. The few points it carried that #888's record does not are relayed to the ballot seat through the orchestrator, for that seat to take into #888 or decline.
- **#868 merged** (`e03d3ae3f`), so § 7's precondition 1 is done and the record's `merge:#880` is on `main`. This branch's merge base predates it, so `issues-owned.sh --pr 880` does not yet show the fire.
- Sitting 2 drops P-6 and now reads: P-1, P-2, P-7, P-3, P-4, P-5, P-13, P-16, and P-14 if included.
- Kenya and Data are not signalled for the close yet.

#### [ADA R3]

# Ada: the P-13 list (typography scale roles, the 20 calls, new tokens)

Read at `origin/main` `b58c73da7` (components extracted with `git archive` into my scratchpad). Outline read at `origin/spec/132-design-outline` `8bc0f3569`. Nothing created, edited or committed in any repository. VERIFIED = I ran or read it; REASONING = inference; UNVERIFIED = not checked by me.

## In designer terms (read this first)

1. Each of the 24 text styles in our type ramp gets one tag saying **which Apple text-size curve it follows** when a user turns text size up. At the default text size nothing changes: every style stays exactly its current size (VERIFIED, factor 1.00 at "Large").
2. For body-sized text (13–18pt) the choice of curve barely matters. Apple's curves for small text all grow about 2.8–2.9× at the largest setting, so those 17 styles can be tagged by a rule ("nearest Apple size"), not by taste (VERIFIED, measured below).
3. **Headings are the taste call.** Apple's curves shrink the gap between headings and body as text grows: at the largest setting, Apple's largest title is only 7pt above body. With the tags I propose, our seven heading levels end up between 52 and 72pt there, and **two adjacent pairs swap places by 2pt** (h4 is smaller than h5; h2 is smaller than h3). Keeping strict order costs a lot: the display style would reach about 99pt. Peter and Leonardo choose between these, using one real screen at the largest setting.
4. **One correction to the outline.** The tag cannot be the style's job ("body", "label", "title" with one curve each). I measured that version and found 8 places where a heading drops below body text. The tag has to be a **size band**.
5. **20 places in the iOS components use a raw size instead of a ramp style.** 18 of them have a ramp style already: the component's own spec or its web version names it. One is an icon in preview code and needs no text style.
6. **Only one place has no ramp style**: Nav-SegmentedChoice's labels, which are bold at 18 and 16pt. Our ramp has no bold label style. So the number of new ramp styles is **0 or 2**, depending on a choice put to Peter (§ 3).
7. Moving 6 iOS helper, error and "Required" texts onto the ramp makes them **lighter** (regular or medium becomes the caption style's light weight). That matches web. Lina and Leonardo should see this before it lands.

## 1. The mapping table: token → scale role → `Font.TextStyle`

**Measured Apple curves** (VERIFIED: `UIFontMetrics(forTextStyle:).scaledValue(for: 100, compatibleWith:)` on the iOS 26.0 simulator (iPhone 16e), with a probe built for an iOS 17.0 target. Factor ×100 by content size):

| Style | L | xxxL | AX1 | AX3 | AX5 |
|---|---|---|---|---|---|
| largeTitle (34) | 100 | 117 | 127 | 149 | 171 |
| title (28) | 100 | 121 | 135 | 168 | 200 |
| title2 (22) | 100 | 121 | 146 | 186 | 236 |
| title3 (20) | 100 | 128 | 152 | 204 | 260 |
| body / headline (17) | 100 | 132 | 155 | 218 | 282 |
| callout (16) | 100 | 133 | 152 | 219 | 286 |
| subheadline (15) | 100 | 130 | 155 | 215 | 290 |
| footnote (13) | 100 | 133 | 161 | 222 | 289 |
| caption (12) | 100 | 144 | 169 | 244 | 319 |
| caption2 (11) | 100 | 169 | 192 | 269 | 369 |

The claim that `@ScaledMetric(relativeTo:)` and `Font.custom(_:size:relativeTo:)` follow these `UIFontMetrics` curves is REASONING from Apple's documentation. Kenya can confirm it in one assertion.

**Proposed roles** (8 neutral bands; the rule is the nearest Apple default size). The scaled pt values are VERIFIED arithmetic on the measured factors:

| Role | → TextStyle | Tokens | pt at L / xxxL / AX3 / AX5 | Pick |
|---|---|---|---|---|
| `fine` | `.footnote` | caption, legal, labelXs (13) | 13 / 17 / 29 / 38 | derivable |
| `compact` | `.subheadline` | bodySm, buttonSm, labelSm, codeSm (14) | 14 / 18 / 30 / 41 | derivable (tie with footnote; curves within 1%) |
| `body` | `.callout` | bodyMd, buttonMd, input, labelMd, codeMd (16); **labelMdFloat (14)** | 16 / 21 / 35 / 46 | derivable. **labelMdFloat takes labelMd's role, not its size band**, so the float ratio (×0.88) holds exactly at every size (REASONING: same curve gives the same factor) |
| `bodyLarge` | `.body` | bodyLg, buttonLg, labelLg, codeLg (18) | 18 / 24 / 39 / 51 | derivable |
| `headingSm` | `.title3` | h6 (20) | 20 / 26 / 41 / 52 | **taste** |
| `headingMd` | `.title2` | h5 (23) | 23 / 28 / 43 / 54 | **taste** |
| `headingLg` | `.title` | h4 (26), h3 (29) | 26 / 31 / 44 / 52; 29 / 35 / 49 / 58 | **taste** |
| `display` | `.largeTitle` | h2 (33), h1 (37), display (42) | 33 / 39 / 49 / 56; 37 / 43 / 55 / 63; 42 / 49 / 62 / 72 | **taste** |

**The heading fork, measured** (VERIFIED, by script over all 24 tokens and five categories):
- **(H1) This table**: Apple-faithful. Order holds at every category up to AX3. At AX5 there are 2 inversions of about 2pt: h4 52 < h5 54, and h2 56 < h3 58. Weight still separates the levels; h2 is 700 and h3 600.
- **(H2) Strict order**: all 29 heading mappings with no inversion put display at **99pt** at AX5, and h1 at about 96 (the search over the five largest styles). These are layout-breaking sizes.
- **(H3) One curve per job** ("heading" → `.title`, everything else → `.body`): **8 inversions**. h6 and h5 fall below bodyLg from AX1 up. This is why the role must be a band (summary point 4).
- **Not proposed**: capping heading growth with `dynamicTypeSize(...)`. It is a per-screen product lever, and Apple discourages it (REASONING).

## 2. The 20 calls that read no typography semantic

**Count VERIFIED.** A `perl -0777` scan for `.system(size:` over the 38 non-test `.swift` files under `src/components/core/*/platforms/ios/` found 30 calls in 18 files: 10 semantic, 9 primitive, 9 computed, 2 literal. This matches Lina's split. The web and contract readings below are VERIFIED (read).

| # | file:line | Reads today | Moves onto | Basis |
|---|---|---|---|---|
| 1–3 | `ChipBase.ios.swift:237`, `ChipFilter.ios.swift:262`, `ChipInput.ios.swift:231` | `fontSize075`, `.medium` | **`typography.buttonSm`** | `Chip-Base.schema.yaml` L105 and `contracts.yaml` L11 name `buttonSm`, and web uses it. The values are the same, so there is no visual change. This settles Lina's UNVERIFIED "`labelSm` or another". Filter and Input following Base is REASONING |
| 4–5 | `InputCheckboxBase.ios.swift:320` (helper), `:328` (error) | `fontSize050`, `.regular` | **`typography.caption`** | web `.checkbox__helper` and the error rule use caption. **Weight 400 → 300** |
| 6 | `InputCheckboxLegal.ios.swift:208` ("Required") | `fontSize050`, `.medium` | **`typography.caption`** (alternative: `labelXs`) | web `.checkbox__required` uses caption. **Weight 500 → 300.** `labelXs` keeps iOS's weight but breaks web parity. Lina's call |
| 7–8 | `InputRadioBase.ios.swift:286` (helper), `:294` (error) | `fontSize050`, `.regular` | **`typography.caption`** | web `.radio__helper` and the error rule use caption. Weight 400 → 300 |
| 9 | `InputRadioSet.ios.swift:201` (error) | `fontSize050`, `.regular` | **`typography.caption`** | web uses caption. Weight 400 → 300 |
| 10–13 | `BadgeCountBase.ios.swift:308`, `BadgeCountNotification.ios.swift:363`, `BadgeLabelBase.ios.swift:307`, `:314` | `size.fontSize` (050/075/100), `.medium` | **`labelXs` / `labelSm` / `labelMd`** by size | each file's own `typographyTokenReference` table (L119–123 or L113–117) |
| 14 | `InputCheckboxBase.ios.swift:387` | `effectiveLabelFontSize` (075/100/125, or the `labelTypography` override) | **`labelSm` / `labelMd` / `labelLg`** | L93–97 and L144–149 comments, and the web CSS |
| 15 | `InputRadioBase.ios.swift:346` | `size.labelFontSize` (075/100/125) | **`labelSm` / `labelMd` / `labelLg`** | L88–92, web |
| 16 | `NavSegmentedChoiceBase.ios.swift:246` | `size.fontSize` 125 / 100, `.bold` | **none fits** | `contracts.yaml` L79–89: `fontSize125/100`, `lineHeight125/100`, **`fontWeight700`** on all three platforms. `labelLg` and `labelMd` match on size and line height but are weight 500 → § 3 |
| 17–18 | `ProgressIndicatorLabelBase.ios.swift:82`, `:91` | `labelFontSize`, which is `DesignTokens.typographyLabelSm.fontSize` (L30) | **`typography.labelSm`** | already a semantic through a constant. Lina's "computed" class holds it, but it moves trivially. The helper text (L91) also uses labelSm; caption would be a design change, not made here |
| 19 | `ButtonVerticalListSet.ios.swift:546` (Lina wrote L545; the `.font(.system(size: 14…` is on L546, VERIFIED) | literal `14`, `.regular` | **`typography.bodySm`** | web `--_vls-error-font-size: var(--typography-body-sm-font-size)` (CSS L46–49). The values are the same. This closes #885's literal |
| 20 | `RoundedPointyTopHexagon.swift:348` | literal `40` on `Image(systemName: "sparkles")` | **none, and none needed** | it is inside `RoundedPointyTopHexagon_Previews: PreviewProvider` (L277): an SF Symbol in preview code, not text. A typography token is the wrong family. Leave it, or use an icon-size token; it is not a P-13 token |

**Result**: 18 move onto existing tokens, 1 is out of scope, and 1 (Nav-SegmentedChoice, one call site with two variants) has no fit.

## 3. Proposed new typography semantic tokens (a proposal only; nothing created)

**One need: Nav-SegmentedChoice's bold labels.** The fork is put to Peter, because an earlier spec's decision bears on it. `.kiro/specs/typography-token-expansion/design.md` "Decision 3: No Emphasis Typography Tokens" rejects `bodyMdBold`-style tokens. It treats emphasis as a platform modifier, not as structure (VERIFIED, read).

- **(T1) Two new function-named semantics**, in the same naming family as `button*` and `input`, not as emphasis variants:
  - `typography.segmentLg`: fontSize125 · lineHeight125 · fontFamilyBody · fontWeight700. Role `bodyLarge` (`.body`).
  - `typography.segmentMd`: fontSize100 · lineHeight100 · fontFamilyBody · fontWeight700. Role `body` (`.callout`).
  - Used by `NavSegmentedChoiceBase` on all three platforms (web and Android read the primitives today, VERIFIED).
  - **Why no existing token fits**: none at 18 or 16 has weight 700 (`labelLg/Md` and `buttonLg/Md` are 500, VERIFIED). h6 is 20pt and the display family.
  - The names are taste; `tabLg/Md` is an alternative if a tab bar ever takes text.
- **(T2) No new token**: the generated modifier takes an optional `fontWeight` token, used as `.dpFont(typographyLabelLg, weight: fontWeight700)`. The role comes from `labelLg` and `labelMd`. The primitive weight is spec-named (`contracts.yaml` L89), so primitive governance allows it. This matches Decision 3's "weight is a modifier".
  - Cost: every component gets a weight override, which reopens the drift the token closes.
- **(T3) Design change**: the segments take weight 500 and move onto `labelLg/Md`. That is a visual ruling for Leonardo and Lina, not a token decision.

**A defect found on the way (mine; filed as a record after this round, rule 10):** `src/tokens/semantic/index.ts` L569 recommends `'typography.label'`, a token that does not exist (VERIFIED, read).

## 4. Recommendation for P-13

**(a), with two amendments:**
1. The role is a **size band** (§ 1's 8 roles), not a job name.
2. The heading rows and § 3's fork are ruled by Peter with Leonardo, against one product screen at AX5.

The 17 derivable rows and the 18 call moves can be approved now. I lean **T2** for the segmented labels, because it creates no token and keeps Decision 3. T1 is defensible.

- **Counter-argument I ran**: "if 17 of 24 rows follow from a nearest-size rule, the role field is ceremony. The Swift generator could derive the style from `fontSize` and keep Rosetta untouched."
- **What it changed**:
  - The table now marks which rows are rule-derived and which are taste.
  - labelMdFloat follows labelMd's role, not its size, which a size rule would get wrong. That case proves the field earns its place.
  - I dropped the outline's job-name vocabulary after measuring it (H3).
- **What survives**:
  - The field adds a schema concept to all 24 tokens, and to any product typography token (whether product tokens can be typography is UNVERIFIED), to settle 7 taste rows and one ratio.
  - **H1's two 2pt inversions at AX5 are real and stay.** No mapping both keeps order and keeps headings near Apple's sizes (H2: 99pt).
  - Scaled sizes also break layouts that compute frames from `fontSize × lineHeight`: Badge min-width, and `NavSegmentedChoiceBase` L367 (VERIFIED, read). The modifier scales the font; those frames need `@ScaledMetric` too. That is component repair in each family's unit.
  - Six texts get lighter (§ 2).
- **Leonardo's condition** holds as he wrote it, and the measured AX5 column is what he reviews. At AX5, h6 52 sits 1pt above bodyLg 51: weight, not size, carries that level.

*Signed: Ada, 2026-11-27.*

#### [LINA R4]

# Lina: read of Ada's P-13 list (component side)

Read at `b58c73da7`. `origin/main` is now `35456bdbc`, and `src/components` and `src/tokens` are unchanged between the two (VERIFIED, empty diff). Sources were extracted with `git archive` into my scratchpad. Outline read at `origin/spec/132-design-outline` `8bc0f3569`. Nothing created, edited or committed in any repository. VERIFIED = I ran or read it; REASONING = inference; UNVERIFIED = not checked by me.

**One line:** I accept all 18 moves. The six lighter texts are a parity fix, but it has to land on Android too. On Nav-SegmentedChoice I lean T1, not Ada's T2: Decision 3 covers inline emphasis, and it rejected weight overrides. I agree the frame repair is per family, and I add one present-day Android defect. I can live with (a), with these amendments.

---

## 1. The 18 call-site moves: I accept all 18

- **Chips → `buttonSm` (1–3)**: accept. `Chip-Base.schema.yaml` L105 and `contracts.yaml` L11/L17 name `typography.buttonSm` (VERIFIED). This closes my R2 UNVERIFIED. The values are the same, so nothing changes visually.
- **Badge (10–13), the checkbox and radio labels (14–15), Progress (17–18)**: accept. These are the size-variant tables I called "computed": each row names a token instead of a bare size. I spot-checked `BadgeCountNotification.ios.swift` L61–63 (labelXs/Sm/Md by size) (VERIFIED).
- **Button-VerticalList-Set → `bodySm` (19)**: accept. The call is on L546, not L545; Ada is right (VERIFIED). Record (b) in my R2 should cite L546.
- **Hexagon preview (20)**: accept that it is out of scope. It is an SF Symbol in a preview, not text.
- **The six helper, error and "Required" texts → `caption` (4–9): a parity fix, not a design change. Three things make it a fix:**
  1. Every schema and README names `typography.caption` for helper and error text: Checkbox-Base `schema.yaml` L154 and README L223; Checkbox-Legal L74 and L364; Radio-Base L106 and L257; Radio-Set L95 (VERIFIED). Web follows them (VERIFIED).
  2. **The same family already renders caption at weight 300 on both natives.** Input-Text-Base reads `typographyCaption.fontWeight` on iOS (L363–373) and the caption weight on Android (L403–419) (VERIFIED). So today, one iOS form shows a text field's helper in light weight and a checkbox's helper in regular weight. The move removes an inconsistency inside the family on one screen.
  3. **Android has the same defect.** It uses `font_size_050` with `FontWeight.Normal` or `Medium`: Checkbox-Base L534–535, Legal L269–270, Radio-Base L478–479, Radio-Set L224 (VERIFIED). If only iOS moves, iOS drifts away from Android. **Condition: the move lands on both natives in the Form-Inputs family's unit.**
- **"Required" (6): `caption`, not `labelXs`.** Web uses caption (L70–77, VERIFIED). It is error-coloured status text like the error message, and the web already bolds it under `prefers-contrast: more` (L98–100, VERIFIED). This is my call as owner. It rests on the least evidence of the six: the READMEs say "helper text and error messages" and do not name the indicator.
- **Counter-argument I ran**: "A schema line written web-first should not overrule two native platforms that agree. The native authors may have chosen 400 because a light weight at 13pt in error red reads poorly."
  - **What it changed**: I looked for a recorded native decision and found none in specs 046 and 047 (VERIFIED, grep). Input-Text-Base's natives already use 300 for the same job, so this argument would indict Input-Text-Base too.
  - **What survives**: whether light weight at 13pt suits **error** text is a fair legibility question. But it is a question about `typography.caption` for error text across the system: Ada's token, and Leonardo's visual call. Answering it would change caption, or add an error-text token for every input. It would not make an exception for these six sites. Leonardo still sees the change before it lands, as Ada says.

## 2. Nav-SegmentedChoice: I lean T1. T3 stays open as Leonardo's call. T2 is my third choice.

- **Decision 3, checked** (`typography-token-expansion/design.md` L446–480, VERIFIED). It rules on **inline emphasis**, "contextual styling within text, not structural typography" (L457). Its examples are `bodyMdBold` and `<strong>`.
  - The segment weight is **structural**. Contract `visual_size_variants` (`contracts.yaml` L75–89) fixes 700 on every segment, in both sizes, on all three platforms. It is not a selected-state emphasis (VERIFIED).
  - So Decision 3 does not bar T1. T1 sits in the same naming family as `buttonSm/Md/Lg` and `input`, the existing function-named structural styles.
- **Decision 3 cuts against T2, not for it.** It **rejected** option 3, "weight modifier tokens … for inline styling" (L451). The risk it named is "developers might use fontWeight700 directly" (L473, L479). T2's `weight:` argument on the generated modifier is that risk, built into the API for every component. Ada's own cost line says the same thing.
- **T3 is not just taste.** Decision 4 (L482–) set 500 for interactive text because heavier weights "overwhelm the UI". At 700, Nav-SegmentedChoice is the outlier among interactive controls. Moving it to 500 is a visual ruling for Leonardo and Peter, and I do not absorb it here. If they pick T3, it becomes a change to the `visual_size_variants` contract and lands in that family's unit.
- **Counter-argument I ran**: "two semantic tokens with one consumer are component tokens in disguise. They are the start of the explosion Decision 3 feared."
  - **What it changed**: I looked at a component-level typography token instead. Every `.tokens.ts` today declares only the `sizing` or `spacing` family (VERIFIED, grep). A typography component token would be a new capability, and I do not know whether the generator's role mapping would reach it (UNVERIFIED). So I do not offer it as a cheap fourth option.
  - **What survives**: if no second consumer (a tab bar, for example) ever appears, `segmentLg/Md` are semantics named after one component.
- **The fork for Peter**: T1 (two tokens) or T3 (no tokens, a visual change). I put T2 last because it reopens drift in every component.

## 3. Frame-scaling repair: agreed, it is per-family component repair. Two amendments.

- **Severity differs by site.**
  - **Badge** uses minimums: `.frame(minWidth:…, minHeight: size.minWidth)` (`BadgeCountNotification.ios.swift` L368, VERIFIED). Larger text still fits. A single digit loses its circle, but nothing clips (REASONING).
  - **Nav-SegmentedChoice iOS** uses a **fixed** height: `.frame(height: intrinsicHeight)` (L184), built from `segmentHeight` (L366–371) (VERIFIED). Its `.lineSpacing` (L247) does not scale either. Scaled text clips here (REASONING).
- **Android has this defect today, before any 132 work.** `NavSegmentedChoiceBase.android.kt` L283 and L289 set `.height(segmentHeightDp)` in fixed `dp`, while the text is in `sp` (VERIFIED). The `sp` text grows with the system font scale and the `dp` height does not, so large font scales probably clip the segments now (REASONING; not run).
  - **It is a present-day defect, so it gets a record now** instead of waiting for its family unit. I file it as a rule-10 record after this round, with the Android helper weights (§ 1) if they are not already in scope.

## 4. Can I live with Ada's lean? Yes: (a), with her two amendments and three of mine.

- **Hers, accepted**: the roles are size bands. Peter and Leonardo rule the heading rows against one screen at AX5. On the component side, labelMdFloat taking labelMd's role is the property Input-Text-Base's float needs (REASONING).
- **Mine:**
  1. **The segmented fork goes to Peter as T1 versus T3**, with T2 named last (§ 2). That is the opposite of Ada's T2 lean. Both readings of Decision 3 are on the table. The text supports mine, and I would ask Ada to check L451 and L473.
  2. **The six weight moves are approved as parity fixes inside the 18**, on the condition that Android moves in the same Form-Inputs unit (§ 1).
  3. **The frame repair is priced per family, and the Android fixed height is recorded now** (§ 3).
- **Surviving counter to the whole package**: approving the 18 now commits component work in five families (Chip, Form-Inputs, Badge, Progress, Button) before the chip slice has priced the scaled-layout repair even once. A later family may find that a token move alone does not hold its layout. The moves are still right, because the token reads are correct at every text size. The cost estimate is what the slice could change, and that is the outline's current posture.

*Signed: Lina, 2026-11-27.*

#### [LEONARDO R5]

# Leonardo: reading Ada's P-13 list (consumer and product view)

Read: `answers-132/ada-p13-list.md`, my `leonardo-r1.md` and `leonardo-r2.md`, the outline's P-13 and T-12 at `origin/spec/132-design-outline`, and `origin/main` `src/tokens/semantic/TypographyTokens.ts` and `Nav-SegmentedChoice-Base/contracts.yaml`. Nothing created, edited or committed in any repository. Labels: VERIFIED (I read or computed it), REASONING (inference), UNVERIFIED (not checked).

## One fact Ada's list does not state

**h4 and h5 are both weight 600** (VERIFIED, `TypographyTokens.ts` L126, L140). Ada's "weight still separates the levels" is true for h2/h3 (700 vs 600) but not for h4/h5. So at AX5 nothing separates h4 (52) from h5 (54). h6 is 700 at 52 (VERIFIED arithmetic: 20 × 2.60). The three smallest headings end up as **one visual level, 52–54pt, with h6 the heaviest**. Peter should see this sentence along with Ada's two inversions.

## 1. The heading trade-off: lean H1 (Apple-faithful, accept the two inversions at AX5)

- **Why, on an adopter's screen**:
  - At AX5 the display style at 99pt (H2) fits about four or five characters per line on a 390pt-wide phone (REASONING). The page title becomes the screen. That breaks the layout for every user at that setting, on every screen with a title.
  - The H1 inversions are a 2pt difference at 52–58pt, about 4%. A reader at AX5 cannot rank that by size anyway (REASONING).
  - **Apple's own ramp flattens the same way**, from Ada's measured factors (VERIFIED arithmetic): at AX5, title2 is 22 × 2.36 = 51.9 and title3 is 20 × 2.60 = 52.0, so they tie. Title is 56 and largeTitle is 58. H1 inherits the platform's intent: at accessibility sizes, size stops carrying heading rank, and weight, position and spacing carry it. That is the True Native reading.
  - A phone screen rarely shows h4 and h5, or h2 and h3, next to each other (REASONING). The inversion matters only where both levels of a pair are on screen.
- **A third option, tried and rejected: capping heading growth at the token level** (each heading stops at its AX3 size, where order still holds). From Ada's table (VERIFIED arithmetic), at AX5 a capped h6 is 41 and a capped h5 is 43, against bodyMd 46 and bodyLg 51. **Headings fall below body text**, which is H3's failure, the worse one. Ada's per-screen `dynamicTypeSize` cap is a product lever, not a token setting. **No third size option survives.** The real third lever is weight (h4 and h5 are both 600), and that is a type redesign outside P-13. I name it and do not propose it.
- **Counter-argument I ran against H1**: "a design system that ships an inverted hierarchy, even at one setting, has shipped a defect, and adopters inherit it on every screen."
  - It changed one thing: H1 should go to Peter with a usage line in the served typography guidance: "at accessibility sizes, h2/h3 and h4–h6 converge; do not rely on size alone to separate adjacent levels."
  - **What survives**: the inversion is real and ships. An adopter who puts h4 over h5 sees the subheading larger at AX5, with the same weight. No curve mapping removes this, only a weight change does.

## 2. The review screen, and when Peter reviews it

- **Screen**: **the filter-and-tags product screen** from my R1. It is built only from the first family (Chip-Filter row, applied filters as Chip-Input, Chip-Base categories, Icon-Base inside them, the `FilterBar` adopter component), and specced in the fixture adopter's `product/`. Give it the headings a real version would have: a screen title, a section heading per group ("Categories", "Applied filters"), one body or caption line (the empty state), and the chip labels.
- **What Peter looks at, on iOS at AX5 and at default, on the smallest current iPhone width**:
  1. Does each section heading still read above the content under it? Chip labels are in the `compact` band, 41pt at AX5. The headings are 52pt or more.
  2. Does the title wrap acceptably? h2 is 56, h1 63, display 72.
  3. What happens to the chip rows? At 41pt, one chip per line is likely (REASONING). This is the layout-repair cost P-13 names.
  4. Does our in-content heading clash with the system navigation title? On iOS the title is often `.navigationTitle`, which is system-styled and not our token (REASONING).
- **What the screen does not test**: it will probably use one or two heading levels, so it cannot show the h2/h3 or h4/h5 pairs. **A type specimen** covers the whole ramp: all 24 styles stacked at L, AX3 and AX5, rendered once by Kenya, about 0.25 session (my estimate, UNVERIFIED). I offer it as an optional aid if Peter wants to see the ramp before ruling, not as a condition.
- **When**: **rule now, with the screen check as a condition at the first family**, before that family's support claim. The screen does not exist until D4. T-12 has to be decided before the slice's D5 lane (my R1), so requiring the screen first would block the slice. Changing a heading's role later changes only large-size rendering. Before the claim no native adopter depends on it, and changes before the claim ship in minors ("7 (a)"). So the provisional ruling can be undone at low cost (REASONING).
- **Surviving counter**: a condition that falls due later is one more thing to carry. It needs a named owner (me, at the first family's claims pass) and a row in that unit's tasks, or it lapses.

## 3. The six iOS texts that get lighter (400/500 → 300): fine for helper text, a small product concern for error and "Required", and not iOS-specific

- **Helper text → caption (300)**: fine. It is secondary text, and it now matches web.
- **Error text (×4) and the legal "Required" (500 → 300)**: these carry critical status. Light weight at 13pt in the error colour reads weaker at default size. WCAG 1.4.3 does not change with weight for normal-size text, so this is a legibility and hierarchy concern, **not an accessibility violation**, if the colour pair passes (REASONING; the error-colour contrast is UNVERIFIED).
- **Position**: land the move onto `caption` now, for parity and scaling. Do not let iOS diverge alone. The weight question belongs to **all three platforms**, because web already ships caption at 300 for these texts (VERIFIED by Ada). I would put one record to Lina: should error and "Required" text use `labelXs` (13pt, weight 500) on every platform? That is my lean for status text.
- **Surviving counter**: iOS users get a visibly lighter error text in this spec, and the fix may come later or never. That is a regression in their terms, accepted for parity.

## 4. Nav-SegmentedChoice: the fork is Peter's taste question. My lean: T3 if he dislikes the bold, T2 if he wants to keep it, never T1

- **Facts**: weight 700 applies to **every** segment, active and inactive. The active segment is marked by a separate indicator (canvas background, shadow), and its text is the same colour as the others (VERIFIED, `contracts.yaml` `visual_state_colors`, `visual_size_variants`). So the bold is the control's resting label style, and it does not signal selection. At 18pt it is heavier than `buttonLg`, chips and every label (500, VERIFIED). A navigation control outweighs the primary button.
- **The question to Peter, in designer terms**: "Is bold on every segment the look you want?"
  - **No → T3**: segments use labelLg and labelMd (500), with no token and no API. This brings the control onto the system's weight for interactive labels. Lina owns the change.
  - **Yes → T2**, built on SwiftUI's own `.fontWeight(_:)` modifier, so `.dpFont` does not need a new `weight:` parameter, if Kenya confirms that `.fontWeight` composes with `Font.custom(_:size:relativeTo:)` (UNVERIFIED). From the consumer side, `.dpFont` is the adopter's API too. A `weight:` parameter on it invites adopters and their agents to bold anything instead of picking a token. That is the drift at product level that Ada's T2 cost names.
  - **Not T1**: two semantic tokens named after one component would be the first emphasis-weighted text tokens. That is Decision 3 broken under another name.
- **Counter-argument I ran against T3**: "a token gap on iOS is not a reason to redesign a shipped control on web and Android." **What survives**: T3 is right only if Peter dislikes the bold on its own merits. If he has no view on the look, T2 holds, and Ada's lean stands.

## 5. Can I live with Ada's overall lean, P-13 (a) with size bands? Yes

- The labelMdFloat case shows the role field earns its place: a rule based only on size would assign it the wrong curve. Ada's H3 measurement retires the job-name vocabulary, and I withdraw my R1/R2 example anchors (`h1` → `.largeTitle`, `bodyMd` → `.body`).
- **Two consumer conditions**:
  1. **Default the role**: a typography token with no role gets the nearest-size rule, so an adopter's own typography token never ships unscaled by omission. Whether product tokens can be typography is UNVERIFIED (Ada flags it too). If they can, this condition is load-bearing.
  2. **The band names**: `body`, `bodyLarge` and `headingSm` read as job names. An adopter tagging a bold 20pt label may avoid `headingSm` because "it isn't a heading". The cost is small at body sizes (curves within about 5%) and larger at heading sizes. A naming note for Ada, not a blocker.
- **My condition from R1/R2** holds in the form of § 2: the ramp ruled as a set, provisionally, with the product-screen check as a condition at the first family.
- **Surviving counter**: the role field adds a concept to every typography token in order to settle seven taste rows. A designer reviewing tokens later will see a field whose value, for 17 of 24 rows, could have been computed.

## One-line position

Approve P-13 (a) with size bands now: lean H1 at AX5 (no third size option survives, and the h4/h5 pair has no weight cue), with the filter-and-tags screen check as a condition at the first family. Move the six texts onto caption now and raise error/"Required" weight as an all-platform record. For Nav-SegmentedChoice, put "is bold the look you want?" to Peter: T3 if no, T2 through SwiftUI's own weight modifier if yes, never T1.

*Signed: Leonardo, 2026-11-27.*

#### [THURGOOD R5]

*2026-11-27. The three P-13 reads above (Ada's list, then Lina's and Leonardo's reads of it) are spliced byte for byte from the seats' files in `consults-2026-11-27/answers-132/`: `ada-p13-list.md`, `lina-p13-read.md`, `leonardo-p13-read.md`, in that order. Unlike earlier splices, those files carry their own `#` and `##` headings, kept as written; each entry runs from its stamp heading to the next stamp heading. Design-outline.md § 5.1's P-13 row is not edited: it waits for Peter's answer.*

**Where the three agree**: P-13 (a), with the role as a **size band** (Ada's 8 roles), not a job name; the 18 call-site moves onto existing tokens; the Hexagon preview call out of scope; the frame-scaling repair priced per family, in that family's unit.

**The Nav-SegmentedChoice fork is three-way.** It stopped after one split, per the orchestrator's practice; no cross-read round was run on it.
- **Ada**: leans T2 (no new token; a weight argument on the generated modifier), with T1 defensible.
- **Lina**: T1 > T3 > T2. She reads Decision 3 of `.kiro/specs/typography-token-expansion/design.md` as covering inline emphasis only, so it does not bar T1, and as rejecting weight modifiers, so it cuts against T2.
- **Leonardo**: ask Peter whether bold on every segment is the look he wants. If not, T3; if so, T2 through SwiftUI's own `.fontWeight`, not a new `weight:` parameter on `.dpFont` (that `.fontWeight` composes with `Font.custom(_:size:relativeTo:)` is UNVERIFIED, Kenya's to confirm). Never T1.

**Other points that go to Peter with P-13**: the heading rows (Ada's H1 or H2; Leonardo leans H1 and adds that h4 and h5 are both weight 600, so nothing separates them at AX5); Leonardo's review screen (the filter-and-tags screen, as a condition at the first family, owner Leonardo); the six helper, error and "Required" texts that get lighter (Lina: a parity fix, on the condition that Android moves in the same Form-Inputs unit; Leonardo: move now, and raise the weight of error text as an all-platform question).

**Defects the reads surfaced, recorded as each seat's stated intent.** I file nothing.
- **Ada**: `src/tokens/semantic/index.ts` L569 names `typography.label`, which does not exist. She files a rule-10 record after this round.
- **Lina**: Android helper and error text has the same `fontSize050` defect as iOS (Checkbox-Base, Checkbox-Legal, Radio-Base, Radio-Set). Android Nav-SegmentedChoice sets a fixed `dp` height on `sp` text, a present-day defect. She files a rule-10 record for it after this round, with the Android helper weights if they are not already in scope. She also says her R2 record (b) should cite `ButtonVerticalListSet.ios.swift` L546, not L545.
- **Leonardo**: a question to Lina, whether error and "Required" text should use `labelXs` on every platform. He puts it to her as a record.

#### [KENYA R5]

**1. The plan's D4 app and Peter's demo app are almost the same thing.**
- **Where they match** (VERIFIED, plan-r2 § 1 and roadmap row 5 at `b89163c41`; outline § 2 at `96e4945db`): the D4 app is already one we build. Kenya and Data build it, Leonardo writes its content, and it has two screens: a catalog, and one filter-and-tags product screen. D10's adopter component already "passes D3–D6 in the D4 app", so Peter's idea of putting D10 in the same demo is what the plan says.
- **Where they differ**:
  - *The wording.* The D4 row says "an adopter's own app", which reads as a real customer's project. It is not one. That is the real gap.
  - *Size.* The app is small in screens but not in coverage. The catalog is generated from the committed component list and fails on any component it did not build, so by the end it holds all 34.
  - *Where it lives.* It lives in this repo and runs in CI as `native-adopter-ios`. VERIFIED: the row names the context. UNVERIFIED: its folder path. The text I read does not fix one.
  - *Cost.* My plan-r2 estimate for packaging, fixture screens and `.xcodeproj` is about 2.5–3.5 sessions (VERIFIED, § 8). The demo adds no cost.

**2. Proposed wording for iOS**
- **D4, "Done means"**: "A fixture adopter app, which we build and keep in this repository, builds and links with the components as a package dependency. It proves the path a stranger follows. It does not prove a stranger's own project."
- **D4 details, iOS**: "iOS: deployment target 18.0, in a committed, hand-written `.xcodeproj` in `ios/` (Kenya; P-6)."
- **D10**: replace "lives in the adopter's own module" with "lives in the fixture app's own module", and "in the D4 app" with "in the D4 fixture app".

**3. What a demo we build cannot catch**
- **The strongest risk is circularity.** The same seats design the generator, the adopter layout and the app, so the app shares every assumption they make and can pass every row while a stranger's app fails.
- iOS examples a real app brings (REASONING, UNVERIFIED as findings):
  - an existing `.xcodeproj` that is not in `ios/` next to a root `package.json` (monorepos, Tuist);
  - Swift 6 language mode with strict concurrency checking;
  - Release or archive builds;
  - extension targets, such as widgets;
  - another SwiftPM dependency or asset colour whose name clashes with ours;
  - real navigation and state around our components.
- **What should cover it, and when**:
  - *Now, cheaply*: build the fixture in both Swift 5 and Swift 6 language modes, and in Release as well as Debug. That is my proposal and is not in the plan.
  - *When Peter's app is ready*: one dated, named "first real adopter" read, with its findings filed. It is evidence, not a gate, so his app's timing never blocks a claim.

**4. My position: (b), plus the D4/D10 wording edit above.**
- The edit costs nothing, makes the bar honest, and is exactly Peter's proposal.
- **Counter-argument I could not fold away**: renaming the app as ours does not stop it being circular. It only makes that visible. Until a stranger's project builds, the acceptance sentence, "a stranger's `init` → `generate`", is proven on a stand-in we wrote. The real-adopter read is the only thing that closes that gap, and I have not made it a gate.

#### [DATA R5]

**1. The plan's D4 app is already the demo app Peter describes.** The words "an adopter's own app" in D4 mean an app laid out the way an adopter's app would be. They do not mean someone else's real app.
- **Where they match** (VERIFIED, plan-r2 at `b89163c41` and the 132 outline at `96e4945db`):
  - We build it. Kenya and Data build it, and Leonardo writes its content. The WP4 row gives me about 2.5 rounds for "Android module, fixture app, adopter module and name-clash case".
  - D10 already sits inside it: the adopter component "passes D3–D6 in the D4 app". Peter's second idea matches the plan too.
- **Where they differ**:
  - **Size.** It starts small: three chips, Icon-Base and one `FilterBar`. It grows by one family per unit, and the job fails if it skips any component in the catalog.
  - **Where it lives.** It is a test fixture in this repo, installed from a packed tarball and built by CI on every PR. It is not a hand-run demo or a showcase.
  - **What it covers.** Two screens (a catalog and a filter-and-tags product screen). On Android it is also built at both ends of the supported AGP, Kotlin and Compose range, with lint `NewApi` treated as an error.

**2. Proposed wording for Android.**
- **D4 row**: "**Our fixture adopter app**, built by Kenya and Data in this repo, builds and links, with the components as a dependency. It uses the adopter layout and is installed from a packed tarball. No real adopter's app is part of done (see the real-app reading)."
- **D4 Android detail**: "The `android/` app module depends on our module under `node_modules/@3fn/core`. It produces a linked APK at `minSdk` 26, with lint `NewApi` as an error, and is built at the bottom and top of the supported range."
- **D10 row**: "...lives in **the fixture app's own Gradle module and package**, not ours, and passes D3–D6 in the D4 fixture app."

**3. What a demo we build ourselves misses.** The people who wrote the components, the guide and the setup steps also build the app, so it only tests the setup we expect. A real Android app would bring things our app does not have:
- its own Compose BOM and Kotlin plugin, which can clash with ours when Gradle resolves versions;
- a Material3 theme already wrapping the screen;
- dependency injection and multi-module builds;
- release builds shrunk by R8 (UNVERIFIED: I have not checked whether our module ships consumer keep rules);
- a person following the guide with no help from us.

**What should cover the gap, and when:**
- **In 132**, cheaply: build the fixture's release variant with R8 on, and give its `android/` folder its own Material3 theme and version catalog.
- **When Peter's app is ready**: a recorded real-app reading, filed as an issue that triggers on "Peter's app reaches its first native screen". It does not hold the 132 merge.

**Strongest risk:** per-family announcement is the planned approach (plan-r2 § 7 item 8, VERIFIED). So each family's support claim goes public with only our own app as evidence. The first real adopter, probably Peter, may hit integration breaks after the claim is made.

**4. Position: (b), plus one edit.** Change D4's and D10's wording to say "our fixture app" (as in item 2), and add the real-app reading as a record with a trigger, not as a D row.
- **Counter-argument I could not fold away:** the new wording makes it plain, but does not fix, that done is checked only by us. The trigger "Peter's app is ready" is an event only Peter can see. It can lapse without anyone noticing, and nothing in D4–D10 would turn red.

#### [LEONARDO R6]

**P-1: Peter's "small scale demo app" against the plan's D4 app.** Sources: plan-r2 at `b89163c41`, § 1 and roadmap row 5; the 132 outline at `96e4945db`, §§ 1, 2 and 5.1.

**1. How they compare.** Peter's proposal is close to what the plan already describes. The row text hides that.
- **They match on who builds it.** Kenya builds the iOS app, Data builds the Android app, and I write the content (VERIFIED: roadmap row 5, outline § 2 "The app").
- **They match on where it lives.** It is a fixture in our CI, not an outsider's project (VERIFIED). Its folder is not named yet (VERIFIED: outline L628 says "harness/ or the fixture directory").
- **They match on size, in screens.** It has two screens: a catalog, and one filter-and-tags product screen. I design both, and the product screen gets a real screen spec in the fixture's own `product/` folder (VERIFIED).
- **They may differ on how much it covers.** Its component list comes from the catalog, and it fails on any component it leaves out. So by goal-done it holds every shipped component in every theme (VERIFIED: D4/D5 details). It starts small, with the Chip family plus Icon-Base, and grows one family per unit (VERIFIED: § 2 "the slice"). If Peter's "small" means fewer components at goal-done, that cuts D5, and it is a fork for him.
- **Where they really differ is the title.** D4's title says "An adopter's own app". The app is ours.

**2. Proposed wording**
- **D4, "Done means"**: "A fixture adopter app, which we build in the adopter layout, builds and links with the components as a dependency. It is small (two screens) and stands in for an adopter's app. It is not one."
- **D4 details, a new first line**: "**What it is**: a fixture we build and run in our CI (iOS: Kenya; Android: Data; content: Leonardo). A real adopter's first app is not a D row." Also change "iOS: deployment target 17.0" to 18.0.
- **D10, "Done means"**: "An adopter can build more, shown in the D4 fixture app." In its oracle, change "lives in the adopter's own module" to "lives in the D4 fixture app's own module, not ours".

**3. What a demo of our own misses**
- **Our screens are built to fit our components.** A real product needs things our contracts never pictured: navigation, real data, long text, and a component we don't have.
- **Our app starts empty.** A real one already has other packages, its own build settings and its own names.
- **Our app is built only in debug.** The plan never mentions a release build (VERIFIED by a search of plan-r2). Android's release build shrinks and renames code, and the plan doesn't test that.
- **Strongest risk**: we wrote the components, the guide and the app, so the app exercises only paths we already know work. Then P-8's per-family announcement reaches adopters before any outsider has tried the package.
- **What should cover the gap, and when.**
  - Inside 132: a release-configuration build in D4, which is cheap.
  - Before the first per-family announcement: one clean-room build that follows only the guide, as T-3 already leans.
  - When Peter's app is ready: it becomes the first real adopter, and what it finds feeds lessons learned. File it as a record with a trigger under rule 10. It should not be a D row, because 132 could not close on a date nobody knows.

**4. My position: (b), plus the relabel above.** Adding a release build to D4 would be a third edit, if Peter wants it.
- **What survives**: the relabel makes "done" honest, but it doesn't make it complete. Whatever label we use, "done" will be read as "an adopter can do this" while no outsider has done it. The only thing that closes this is a real app, and that app isn't ready.

#### [STACY R3]

**Premise first.** VERIFIED: D4 was never a real adopter's app. Plan-r2 roadmap row 5 names "The D4 fixture app, with two screens", built by Kenya and Data with Leonardo's content. Outline § 2 "The app" says the same, and D10's row already says "a fixture adopter component … in the D4 app". So Peter's demo is roughly what the plan already describes, and folding D10 into it is already the plan. What is wrong is the **row text**. "An adopter's own app" claims more than a fixture can prove.

**1. Keep or weaken?** A demo keeps the oracle only if it keeps these D4 details. Each one is VERIFIED in plan-r2 "D4 details":
- a packed install → `init` → `generate`, in the adopter layout (the package at the root, `ios/`, `android/`), never a path into our repo;
- **plain `import` only**, with no `@testable`;
- **the anti-copy check**: every DesignerPunk source file resolves under `node_modules/@3fn/core`;
- **the component list generated from the committed catalog**, so the job fails on any component it did not build. "Small" may mean few product screens. It may never mean a hand-picked set of components;
- a linked `.app` or APK, a non-`DP` abbreviation and one adopter theme.

Without these, the demo is a showcase: it can only show what we chose to show it. With them, the oracle is unchanged.

**2. What a demo we build misses** (all UNVERIFIED reasoning, none measured):
- other dependencies pinning their own Compose, AGP or Swift versions;
- release builds (R8/ProGuard shrinking, strict concurrency, warnings treated as errors);
- multi-module apps, or apps where `node_modules` is not at the root;
- an existing app theme or navigation stack we have to fit into.

**Strongest risk**: the fixture grows alongside our package, built by the same seats who fix the components. When it breaks, we fix the fixture. D4 then measures whether we can make our own app build, not whether a stranger can. Partial cover, already planned and VERIFIED in T-3: Leonardo creates the project by following the walkthrough's steps. The gap itself is covered by Peter's real app, once it exists, through a record with a trigger. Its first build is read as a SYMPTOM-class claims audit against what D4 claimed.

**Claim wording for adopters**: "Builds, links and renders in DesignerPunk's own adopter-layout test app (iOS target 18.0, Android API 26), from a packed install." It never says "works in your app".

**3. Row text I would accept.**
- **D4** "Done means": *"Our fixture adopter app, built in the adopter layout from a packed install, builds and links with the components as a dependency. It proves the path; it does not prove any particular adopter's app."* The oracle and details stay as they are, except iOS 18.0.
- **D10**: replace "lives in the adopter's own module" with *"lives in the D4 fixture app's own module"*. Everything else in the row stays.

These are row-text edits, so they are Peter's and go on the "D-row changes since `b89163c41`" list.

**4. Final position: (b) plus a named edit.** The edit is the D4 and D10 wording above. In addition, a `.kiro/issues/` record for the real-app read, with its trigger "Peter's app first builds against a release", owned by Kenya and Data, with me reading it.

**Counter-argument I could not fold away**: the real-app record has no forcing date. If Peter's app never becomes ready, the gap between "our fixture" and "your app" stays open for good, and nothing in the D rows ever closes it. Honest wording keeps the claim true, but it does not test anything. My earlier dilution concern also still stands: the D-row change list makes a later change visible, not impossible.

#### [PETER] P-1

*Recorded by Thurgood, 2026-11-28. Peter's words, from the orchestrator's relay; each receipt time is the orchestrator's `date -u`.*

**The sitting order, first.**
- **What he was asked**: "(1) answer now, reshape once after" or "(2) reshape first, then answer", after Thurgood's consult on the outline's shape.
- **Received**: 2026-11-28T02:08:13Z. **Verbatim**: "(1) — let's answer now and reshape after. Let's take the questions and their context one at a time, please".
- **What it means here**: the sitting-2 questions are answered one at a time from design-outline.md § 5.1 as it stands. Thurgood's one reshape follows the sitting, with the answers folded in, before Kenya and Data's close commit.

**P-1, the first answer.**
- **What he was asked**: (b), approve D4–D10 with two D-row edits: D8's population fix, and D4's iOS deployment target 17.0 → 18.0.
- **Received**: 2026-11-28T02:23:27Z. **Verbatim**: "I lean toward (b) with a proposal that I'd want feedback on before we commit it. Re: D4, We'd need an adopter app — which I have an idea for, but isn't ready. Perhaps a more appropriate bar for this would be a small scale demo app that we prepare with Kenya and/or Data? Re: D10, similar concerns as D4, but I agree with need some kind of similar test. Perhaps it can be part of the same small scale demo I mentioned earlier? Honest thoughts?"
- **What followed**: the four consults spliced above (`[KENYA R5]`, `[DATA R5]`, `[LEONARDO R6]`, `[STACY R3]`). All four found that the plan's D4 app is already a fixture we build, with D10 inside it, and that the row text ("An adopter's own app") claims more than it is.

**P-1, the second answer.**
- **What he was shown**: the four consults' combined read, then two asks from the orchestrator:
  - whether "small" means "starts small and grows", not a hand-picked set of components;
  - which of three additions he wanted:
    - (1) relabel D4 and D10 as our fixture app, with Stacy's D4 wording as the base: "Our fixture adopter app, built in the adopter layout from a packed install, builds and links with the components as a dependency. It proves the path; it does not prove any particular adopter's app." D10's "the adopter's own module" becomes "the D4 fixture app's own module". He was told that Thurgood writes the final text and that it comes back to him before it counts;
    - (2) also build the demo as a shipped app is built: a release build on both platforms, Android with R8 on, and iOS also under Swift 6's stricter checks (Kenya);
    - (3) file his real app as a record, not a D-row. When it first builds against a release it gets a dated read; it is evidence, not a gate.
- **Received**: 2026-11-28T02:26:04Z. **Verbatim**: "Yes, small means start small and grow; all three additions".

**What is ruled, and what is not yet.**
- **Ruled**: (b), with all three additions, and "small" read as "starts small and grows".
- **Not yet in force**: the final D4 and D10 row text and the D4-details additions. Thurgood drafts them (design-outline.md § 1, marked PROPOSED TEXT), and they count only once Peter confirms them.
- **Not shown to him, not ruled**: Data's proposal that the fixture's `android/` folder carry its own Material3 theme and version catalog (`[DATA R5]` item 3). It is an open item for the requirements round, owned by Data.

#### [THURGOOD R6]

*2026-11-28. The four P-1 consults above are spliced byte for byte from the seats' files in `consults-2026-11-27/answers-132/`, in the orchestrator's order: `kenya-p1-demo.md`, `data-p1-demo.md`, `leonardo-p1-demo.md`, `stacy-p1-demo.md`. Each file carries its own stamp heading.*

- **Stamps, kept as the seats wrote them**: Data's entry is stamped R5, though his previous entry on this artifact is R2; Kenya's R5 follows her R4; Leonardo's R6 follows his R5; Stacy's R3 follows her R2.
- *[Thurgood: in `[LEONARDO R6]` item 3, "P-8's per-family announcement" means P-2, the per-family announcement question. His text is kept as written.]*
- Recorded the sitting-order ruling and P-1's two answers as `[PETER] P-1`. → design-outline.md § 5.1
- **Folded** (→ design-outline.md § 1, "The D-row change list"): the D8 population fix; D4's iOS target 17.0 → 18.0; D4 and D10 relabelled as our fixture app; D4's release builds; the real-app record (not a D row). The final D4 and D10 text and the D4-details additions are drafted there as **PROPOSED TEXT — awaiting Peter's confirmation**, with Stacy's D4 sentence as the base and every carried difference from the other three seats named.
- **Rule 10**: P-1's third addition creates an owed act, the real-app record. It is filed in this PR, by Kenya and Data in their close commit (design-outline.md § 7, precondition 3), in the shape Stacy set: owners Kenya and Data, Stacy reading it at the first build, Trigger `manual` because its event is one only Peter can see. I file nothing. Data's and Stacy's surviving counter (no forcing date) is carried beside it in § 1.
- **Open, not folded**: Data's Material3 theme and version catalog for `android/` (→ design-outline.md § 5.2, T-20, owner Data, requirements round). Leonardo's clean-room build before the first per-family announcement bears on P-2 and is not folded into P-1.
- **Not reshaped**, per Peter's order ruling: the one reshape follows the sitting.

#### [PETER] P-2

*Recorded by Thurgood, 2026-11-28. Peter's words, from the orchestrator's relay; the receipt time is the orchestrator's `date -u`.*

- **What he was asked**: (a), all 34 components at the D5/D6 tier; or (b), per family, with Leonardo's three conditions, each takeable on its own:
  1. the overlay flip covers consumer Leonardo, the seat that selects components;
  2. the flipped overlay text points at served readiness, so later families need no charter edit;
  3. a `validate_assembly` warning when a component is not ready for the target platform (T-18).
- **What he was told survives**: partial support needs careful wording every release; condition 2 depends on D7 shipping no later than the first claim.
- **Received**: 2026-11-28T02:28:20Z. **Verbatim**: "(b) with all three conditions".

#### [THURGOOD R7]

- Recorded P-2 as RULED. → design-outline.md § 5.1
- **Carried as owed acts, where the outline already places them**: conditions 1 and 2 on the overlay flip (§ 5.1, "Not re-asked here"); D7's derivation in § 4.4, now unconditional; condition 3 as T-18 (§ 5.2). I filed no record: like P-1's D-row edits, these are 132's own scope, taken in at the requirements gate.
- **A correction to the context Peter was given, from the orchestrator**: in P-2's context the orchestrator told Peter "a family that isn't ready isn't in the adopter's package at all". That is Leonardo's side of T-14's open inclusion threshold (design-outline.md § 5.2, T-14), not settled. The orchestrator is telling Peter so inside P-7.
- **The same overstatement is in the outline's own P-2 lean line**, which is my text: "Under T-14 (ii) a family that is not ready is not in the adopter's module at all, which makes per family true in the build". It is left unchanged here, because leans stay as asked; the reshape corrects it to name the open threshold.

#### [THURGOOD R8]

**P-7, the gate proposal: 17.0.0 ships when 132's first family, 131 and 133 are all done, and carries the first native claim.** Read at `35456bdbc`.

**1. What it changes**
- **131's park**: unchanged (re-ask at 132's measured-cost record). 131 must now *finish* before 17.0.0.
- **The priorities record's order** (`.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 3): today it is 129 → 132's first family → re-placement → 131 → 128 → 130, with 133 after 130. The gate moves 133 ahead of 128 and 130. That is a walk-log line with his words: a record, not law.
- **133**: still a placeholder with no round. It needs a full outline round first.
- **RELEASE-FLOW**: no change needed. Peter already ratifies every version bump ("Deriving the delta", step 3), so a gate is simply his ruling not to ratify 17.0.0 early. To keep it visible, add a row to the priorities record's § 7 "Peter-gated deferrals", which RELEASE-FLOW item 3a reprints at every release. A record, not new law.

**2. Sequence and size** (estimate, low confidence)
- The order: 132's outline closes → 132's requirements, design and tasks → the first family's units → the measured-cost record, which fires 131's re-ask → 131 → 133's outline round and formalization → 133's work → the 17.0.0 release.
- 132's first family: about 20–35 sessions (REASONING; all of 132 is 50–95 per plan-r2 § 8, and the slice carries the shared costs).
- 131 and 133: both unsized. I owe 131's size before the first first-family unit merges (T-17). As a guess, 15–30 sessions each.
- In total, about 50–95 sessions and 12–20 of Peter's sittings.

**3. Releases in the meantime**
- **16.4.0 must still happen**: 14 open records fire at `release:16.4.0:phase-1`.
- 16.x minors can carry 132's work without a claim (Peter's "7 (a)").
- **The catch is that releases are cut from `main`.** 133 includes the `ColorTokens.ts` deletion, which breaks adopters. Once that merges, no 16.x can ship without becoming a major. So 133 has to deprecate in a 16.x and delete only in 17.0.0's release PR, or every release waits for the gate.

**4. My position**
Accept (i) as a record, on two conditions:
- (a) `main` stays releasable as 16.x: nothing that breaks adopters merges until the 17.0.0 release PR, so deletions are deprecated first;
- (b) the gate goes in § 7 of the priorities record, not in RELEASE-FLOW.

**Counter-argument I could not fold away**: the gate ties a promise to adopters to 131, which adopters never see. The slowest of three specs sets the date, and two of them are unsized. "Do not start a native product" stays printed the whole time, after the first family is ready.

That leaves a fork, which is Peter's to pick: gate the *version number*, or gate the *claim*. If he gates only the number, the first family could be claimed in a 16.x minor.

#### [THURGOOD R9]

**Can RELEASE-FLOW publish `17.0.0-next.N` on `next`? Not as written.**
- The script accepts a prerelease version: `VERSION_RE` allows `-next.N` (`scripts/release-publish.ts` L106). VERIFIED.
- Both publish commands pass no `--tag` (L197, L201), and RELEASE-FLOW names no dist-tag. VERIFIED. So npm would put the prerelease on `latest`, or refuse it. Which of the two happens depends on the npm version. UNVERIFIED.
- Making it work takes a `--tag next` change in the script (Ada's) and in RELEASE-FLOW's step text (mine, so a LAW ballot). Every `-next.N` would then be a full release cycle.

**1. Final position**: unchanged. Accept the gate as a record, with `main` kept releasable as 16.x.

**2. Can I live with the others?**
- **Ada, gating 17.0.0 on 133's token half and shipping enforcement after**: yes. It keeps the one part that saves aliases, which is blend, and drops the part that saves nothing.
- **Leonardo, 17.0.0 with the first family alone**: yes. It is the seats' earlier position and needs no new record.
- **Leonardo's prerelease**: only with that ballot. It costs a law change and a release cycle per build.

**3. Factual points**
- **My own R8 was wrong.** I called the `ColorTokens.ts` deletion a certain break. `init` copies the whole token tree (`src/cli/init.ts` L275–281, VERIFIED), so local-mode adopters keep their copy. Whether the package's root export exposes the file is UNVERIFIED. Ada's point stands: blend is the API that reaches the claim.
- **Leonardo**: moving 133 ahead of 128 and 130 is not reading (iii). Reading (iii) was ordering 130, 131 and 133 ahead of the first family. The move he describes is a different reorder, and it is implied by (i). VERIFIED against the brief's wording.

#### [ADA R4]

Read at origin/main `35456bdbc`, 132 outline at `da59d4067`.

**1. Would 133 break adopters after the first claim?**
- **Blend is the one that reaches the claim.** All three chips call `pressedBlend()` (VERIFIED: grep of Chip-Base/Filter/Input; outline L175), so the blend helper is in the first family's closure. Its native API is hand-written and public: 37 `public` lines in the Swift file, about 30 top-level declarations in the Kotlin one (VERIFIED, grep), including `ThemeMode`, `BlendThemeContext` and `BlendUtilitiesProvider`. 133 decides OKLCH or RGB/HSL, generated or hand-written. Keeping the names and changing the maths changes hover and pressed colours in a claimed family, with no compile break. Renaming or retiring helpers, and `ThemeMode` overlaps the new theme family, is a break (UNVERIFIED: not designed yet).
- **ColorTokens deletion, rgba cleanup, shadow channels**: these are not on the native token surface. Shadow channels add tokens; the shadow names stay (UNVERIFIED). Deletion moves five generator readers (VERIFIED, grep). But `init` copies the whole `src/tokens` tree (VERIFIED, `init.ts` L275–281), so a local-mode adopter keeps their own `ColorTokens.ts` and barrel. If the new `generate` expects a different tree, every platform breaks, web included, whether or not native is claimed (UNVERIFIED).
- **Web**: `@3fn/core/blend` already exports the RGB/HSL calculators (VERIFIED, `exports`). Retiring them is a web semver question today, so the native claim does not change it.
- **Enforcement**: checks only.

**2. Saving.** Nearly all of it is blend. Done before the claim: no aliases. Done after: 0 aliases if names are kept (but a visible colour change), and roughly 8–12 hand-written deprecated symbols per platform if the theme-mode helpers are retired (UNVERIFIED estimate). A further saving: 132 repairs the blend helper anyway (4 pinned entries per platform), and deciding blend first avoids repairing it twice. The rest of 133 saves no aliases.

**3. Cost on my side.** A full round from zero: Step 0 over seven records. Blend's three entangled decisions. Shadow channel tokens for Peter's creation review. A replacement for the DTCG structural source. Five readers. About 200 test assertions (the record's estimate, UNVERIFIED now). Enforcement adds six design questions and an arming campaign, which Lina leads. I would expect four sittings at least before tasks.

**4. Position.** I support 17.0.0 as the marker. I would not gate it on all of 133: enforcement is the slowest part and saves nothing. The fork for Peter: (A) his gate as stated; (B) gate on 133's token half, or at least blend's API shape, and ship enforcement after.
**Counter-argument I could not fold away**: under (B), 17.0.0 does not mean "colour is settled". A later deletion can still force local-mode adopters to migrate their token tree, and that alone may cost an 18.0.0. (B) also splits a spec Peter ruled as one.

#### [ADA R5]

**1. Final position.** Unchanged, and I add Thurgood's condition (a). I want 17.0.0 as the marker, gated on 132's first family plus one part of 133: the native blend API's shape, settled before the claim. The rest of 133 and all of 131 go after. Nothing that breaks adopters merges to `main` before its own major.

**2. Can I live with the others?**
- **Thurgood (gate (i) with conditions (a) and (b)): yes.** Condition (a) keeps `main` releasable, so the gate costs time, not correctness. The cost is that the slowest unsized spec sets the date.
- **Leonardo (first family alone in 17.0.0, 133 in 18.0.0): yes, but only if blend's native API is frozen before the claim.** All three chips call `pressedBlend()` (VERIFIED). Without that freeze, 133's blend decision lands on a claimed family as aliases or a break, which is the counter-argument he states himself.

**3. Factual points**
- **Leonardo**: "whether the package's public API exposes [`ColorTokens.ts`] is UNVERIFIED." I can close that. No `exports` entry reaches it: not `.` (the browser bundle), not `./build`, not `./types`, not `./config` (VERIFIED, `package.json` and `src/build/tokens/index.ts`). The exposure is a different one: `init` copies the file into the adopter's own tree (VERIFIED, `init.ts` L275–281).
- **Thurgood**: "the `ColorTokens.ts` deletion, which breaks adopters" is overstated for the import surface (VERIFIED, above). What can break is local-mode `generate` against an adopter's copied tree (UNVERIFIED until 133 is designed). His condition (a) is still right.
- **Leonardo**: "blend states in OKLCH" is not decided. 133 may instead ratify the RGB/HSL path (VERIFIED: the blend record leaves it as "wire or formally retire").
- **Leonardo**: 133 sits after 130, so the gate means a reordering (VERIFIED, 133 outline § 5).

#### [LEONARDO R7]

**P-7, reading (i): 17.0.0 ships only when 132's first family, 131 and 133 are all done.** Read at 132 outline `da59d4067`, `main` at `35456bdbc`.

**One fact first, VERIFIED.** The ruled order is 129 → 132's first family → re-placement → 131 → 128 → 130, then the colour track (133) after 130 (outline § 3; priorities record, 2026-11-05 lines). Peter dropped 130 because it is tied to 128, and 133 sits *behind* 130. So gate (i) either waits through 128 and 130 as well, or it moves 133 ahead of them. Moving 133 is reading (iii), a reordering, which has not been asked.

**1. Gain and cost.**
- **Gain.** Adopters, Peter first, start on settled ground. 133 changes colours adopters can see (blend states in OKLCH) and deletes `ColorTokens.ts`. That file is re-exported from `src/tokens/index.ts` (VERIFIED). Whether the package's public API exposes it is UNVERIFIED. If it does, 133 is a breaking change that belongs in a major anyway.
- **Cost.** "Do not start a native product" stays up through 131 (paused before requirements, VERIFIED) and 133 (a placeholder with no round, VERIFIED). Nobody can size that wait. 131 is internal, so gating on it adds delay and nothing adopters see.
- **After 17.0.0**, later families arrive as additions in minors under T-14 (ii). That part works either way.
- **128 still forces a major.** If 17.0.0 waits until after 128 (the ordering problem above), the package split lands first and takes 17.0.0, or the split and native share it. If it doesn't wait, 18.0.0 follows soon after. That 128's split forces a major is the seats' estimate (UNVERIFIED).

**2. Fit with P-2.** It is legal, but it pulls against the ruling. P-2 says to claim each family when its evidence lands. The gate holds a finished, tested family back for work that has nothing to do with it. Meanwhile its evidence goes stale, because the iOS 18.5/18.6 lane moves on. In practice, "per family" would mean "per family, after a batch".

**3. A cheaper shape: a prerelease.** Publish the first family as `17.0.0-next.N` on npm's `next` tag, so only people who ask for it get it. Peter, as first adopter, opts in and starts. 17.0.0 final keeps the gate, and an adopter on `^16` sees nothing. It gives up:
- one clean "native starts here" moment;
- a support promise during the prerelease, which is weaker by nature;
- part of the "do not start" text, which must be reworded for the `next` channel.

Whether RELEASE-FLOW can publish a prerelease is UNVERIFIED (Thurgood's).

**4. Final position.** I'd ship 17.0.0 with the first family alone, as the seats proposed, and not wait on 131 or 133. 133's breaking parts and 128's split can share 18.0.0. If Peter wants the gate, the prerelease is the version of it I'd accept. Peter's own app isn't ready yet (P-1), so the delay costs him less today than it costs other adopters.

**The counter-argument I could not fold away.** If 133 changes colours adopters see, or removes public exports, then an app built on 17 gets a visible shift or a break at 18. Only waiting avoids that; my shape does not. And two majors close together read as churn.

#### [LEONARDO R8]

Cross-read of `[THURGOOD R8]` and `[ADA R4]`, at `main` `35456bdbc`.

**1. Final position: moved, toward Ada's (B).** 17.0.0 carries the first family's claim, gated on one piece of 133: the blend API's shape. It is not gated on 131 or on the rest of 133. Ada's grep changed my mind. All three chips call `pressedBlend()`, and the blend helper is public native API (VERIFIED by me: chip sources on iOS and Android; 37 `public` lines in `ThemeAwareBlendUtilities.ios.swift`). So blend sits inside the first claim. Deciding it afterwards costs either aliases or a silent colour change in a claimed family. I also take Thurgood's condition (a) whatever Peter picks: `main` stays releasable as 16.x, and anything removed is deprecated first.

**2. Can I live with theirs?**
- **Thurgood, (i) with two conditions: yes.** His condition (a) means adopters on `^16` are never broken while they wait. What the gate costs is a delay, which is Peter's to accept, and nothing gets damaged.
- **Ada, (B): yes.** This is now my position. What decides it is that blend is in the first family's closure.

**3. Facts.**
- Thurgood's "the `ColorTokens.ts` deletion breaks adopters" is too broad. Ada shows it is not on the native token surface. It breaks only local-mode adopters, and only if `generate` comes to expect a different tree (UNVERIFIED; Ada's reading, not tested). My own R7 line "deletes public exports" was too broad for the same reason.
- Thurgood's "the gate moves 133 ahead of 128 and 130" is one reading. Gate (i) could instead wait through 128 and 130. Peter has not said which.
- I checked the rest and found it correct (VERIFIED): the 14 records due at `release:16.4.0:phase-1`, § 7 of the priorities record, RELEASE-FLOW's "Deriving the delta" step 3, and the `./blend` export.

#### [STACY R4]

**1. Can I live with it? Yes.** Under (a), the claim and its evidence arrive together. Gating on 131 or 133 would hold back a claim already proven, for work that proves nothing about it.

**2. Can each part be checked later?**
- **(a)** A RELEASE phase-1 read at the release commit S can check two things. Does the set of families the CHANGELOG claims equal the set whose D4–D6 checks pass at S? Is D7's readiness derived from those results? Status: owed. None of the D rows is built yet (VERIFIED, plan-r2 § 1 "State" column).
- **Condition 1** Uncheckable as written: "settled" names no record. It becomes checkable when two things exist. One is a committed decision record that names the blend helper's public API (Ada's). The other is that API inside D9's public-API diff baseline at the claim. Status: owed. The decision does not exist, and D9's tools are UNVERIFIED (plan-r2 D9 row). Even then, it settles **names, not values**. Changed maths behind kept names passes D9 (Ada R4).
- **Condition 2** Today it is **a promise**. For our native module it becomes a rule once D9's diff runs on each 16.x release and fails on a removal with no prior deprecation. Status: owed. For the web exports, the CLI and the tree `init` copies, no check exists. A pass can only sample `git diff <last-tag>..S` by judgment. That is UNVERIFIED reasoning: I found no guard, but did not search exhaustively.

**3. The 17.0.0 wording, in substance** (the text itself is Leonardo's):
- name the four components and the platform floors;
- give "supported" as D7's evidence kinds;
- say other native families ship unsupported;
- say "Hover and pressed colours of these components may change in a later release without an API change; the CHANGELOG will name it."

**4. What the plan misses**
- **The adopter component is not ours to claim.** D10 proves that an adopter can build one. It should not appear in the supported list.
- **Nothing catches a colour shift.** D5's token check samples colours, but a pressed or hover sample is not named in it (plan-r2 "D5 details"). Without one, a colour change from 133 passes every row. Adding it changes a D-row detail, so it is Peter's call.
- **Condition 2 has no owner or record.** Put it in § 7 of the priorities record, as Thurgood proposes.

#### [LINA R5]

Read at `main` `35456bdbc`, 132 outline at `da59d4067`.

**1. Can I live with it? Yes.** What decides it: today the native components ship as "reference source, not a build input" (INSTALL L9, L156, L169; VERIFIED). So nothing I plan breaks a supported adopter before the claim. Blend is the one shared helper a later spec will change.

**2. Condition 1, for the Chip family**
- **Icon-Base calls blend too.** It calls `iconBlend()` on both platforms (VERIFIED). So blend reaches all four components in the slice, and every later family that composes an icon.
- **"Shape" is too narrow for the chips.** Chip-Base's `state_styling` contract, on web, iOS and Android, sets pressed as OKLCH ΔL 0.05–0.10. The native helper darkens 12% in RGB/HSL (VERIFIED). The native contract test therefore pins the result of the maths, not only the names. Whether today's maths meets that range is UNVERIFIED. The fork is Peter's. Either (a) the test asserts the contract range, any later 133 change has to stay inside it, and 133 does not move, or (b) the maths is settled before the claim, which moves part of 133 forward.
- **Also in the shape:** the public `BlendTokenValues` struct hard-codes the blend amounts, and `ThemeMode`/`themeMode` overlaps D5's theme design (VERIFIED). Both need settling in 132's design round.
- **Nothing else is in the same position.** The other shared surface I found is the typography modifier from P-13, and it is settled inside 132 (UNVERIFIED that no later spec changes it).

**3. Condition 2.** None of my planned component work breaks adopters: narrowing access, the blend repair and the T-12 font moves all touch reference source only (VERIFIED, as above). What adopters do read is the served `contracts.yaml` and schemas. I will reword contracts but not rename any while we are on 16.x. That no rename is needed is UNVERIFIED. Condition 2 should say outright that it doesn't cover unclaimed native source. Otherwise it reads as requiring deprecation there.

**4. Misses.** The reason the plan gives counts three chips; it should count four components. The native chips use `duration150` and button-press motion, not the contract's `selectionTransition` (VERIFIED). That is contract work for the slice. On 133 enforcement, which I co-own: it adds checks and no adopter breaks, so it can come after 17.0.0 (UNVERIFIED until it is designed).

#### [KENYA R6]

Read at `main` `35456bdbc`.

**1. Yes, I can live with the plan.** What decides it: on iOS the blend API has no adopters yet, so settling it before the claim costs nothing now. After the claim, every change to it costs a major or an alias.
- The Swift blend file does not compile today. `Color` has no `darkerBlend`, `lighterBlend`, `saturate` or `desaturate` (VERIFIED: 10 pinned entries in `harness/expected/harness-ios-components.tsv`).
- No `Package.swift` ships (VERIFIED: `git ls-files`). So no adopter can be calling blend on iOS (REASONING).

**2. What settling the shape means on iOS**
- **The surface is wide** (VERIFIED: it is all in `src/blend/ThemeAwareBlendUtilities.ios.swift`):
  - six `public` extension methods on `Color`;
  - `public` `ThemeMode`, `BlendThemeContext` and `BlendUtilitiesProvider`;
  - `View.themeAwareBlend()` and `EnvironmentValues.themeMode`;
  - `BlendTokenValues`, which hard-codes the blend token values as `public` constants.
- **The chips need only `pressedBlend()`** (VERIFIED by grep). The chips and blend build as one module, so `internal` access is enough for them. If blend becomes a separate target in the same package, Swift's `package` level is enough. My lean is to ship it narrow. A public API added later is a minor; a removal after the claim is a major.
- **`@_spi`**: I measured that it hides symbols from a plain `import`, but it is underscored, so I would not build the claim on it (outline L419).
- **`themeMode` and `ThemeMode` overlap `\.dpTheme` and the system colour scheme**, so dark mode would have two sources of truth. They should be retired before the claim (REASONING).
- **Icon-Base is in the same position.** It is `internal` today (VERIFIED, L73). Making it `public` is an addition, but its signature is frozen from the claim on.
- **The fork is Peter's or Ada's to settle**: a public pressed-state helper lets an adopter's component match ours (D10); keeping it narrow keeps 133 free.

**3. Condition 2**
- Making the 17 internal views public adds API, so it breaks no one.
- **The 18.0 floor has to stay in the manifest that `generate` owns.** Generated token Swift files compile in adopters' apps today (D1). If those files carry an iOS 18 `@available` or call an iOS 18 API, a 16.x adopter whose app targets iOS 17 breaks (REASONING; nothing like that is planned, VERIFIED only for what I read).

**4. What the plan misses**
- **Changes to the blend maths are silent.** D9's API diff cannot see them. Only D5's colour sampling can, and only if pressed states are sampled (UNVERIFIED: D5 does not list pressed states).
- **Public extension members on `Color` and `View`** can clash with an adopter's own extension or another library's of the same name (UNVERIFIED on our toolchain).

#### [DATA R6]

Read at `main` `35456bdbc`.

**1. Yes, I can live with the plan.** What decides it: on Android the blend API is in the first claim. All three chips import `com.designerpunk.tokens.pressedBlend` (VERIFIED, grep). Condition 1 covers it.

**2. What settling the shape means on Android**
- **Visibility.** Kotlin makes everything public unless marked otherwise. There are 14 top-level declarations, plus members inside `BlendTokenValues` and `BlendUtilitiesProvider` (VERIFIED). The chips need only `pressedBlend`. My lean: make the rest `internal`, and turn on explicit API mode for the module. That shape costs nothing to keep. (Lean, not VERIFIED.)
- **The package.** Both the hand-written blend file and the generated helpers (`darkerBlend`, `toRGB`, …) declare `com.designerpunk.tokens`. That is the package the adopter's generated tokens use (VERIFIED). If a name is declared twice across the two modules, the build breaks. Moving the package after the claim breaks every import.
- **A second dark-mode switch.** `LocalThemeMode` and `ThemeAwareBlendProvider` read `isSystemInDarkTheme()` and ignore the theme provider's `darkTheme` argument (VERIFIED). Retire them before the claim.
- **`@RequiresOptIn`.** It is right only for what adopters may call but we have not settled. It is not needed for what is `internal`.
- **D9's API-diff tool.** binary-compatibility-validator, or Kotlin 2.2's ABI validation. Either can skip opt-in symbols. Whether either works at our pinned AGP and KGP is UNVERIFIED.
- **Icon-Base, in the same position.** Its 48 drawables have no prefix (`x.xml`, `search.xml`; VERIFIED). An adopter's drawable with the same name overrides ours without warning (Android's merge rule, UNVERIFIED here). Renaming them after the claim is a break. Add a prefix now.
- **Previews.** The three chip previews are public (VERIFIED). Make them `internal`.

**3. Condition 2.** I see no break for 16.x adopters. Today they use only the generated tokens. The Android module is new, and adopters opt in to it. Needing `compileSdk` 37 is a floor of the new range, not a break.
- The one risk: if `generate` ever writes Gradle settings or emits blend helpers by default, token-only adopters are hit. Keep both opt-in (UNVERIFIED until it is designed).

**4. What the plan misses: whether raising a toolchain floor is a major.** androidx raises its `compileSdk` and Kotlin floors over time. If each raise counts as a break, every Compose BOM bump forces a major. If no raise does, condition 2 has a hole. P-9 should decide this rule along with the range numbers.

#### [ADA R6]

Read at `35456bdbc` (Peter's checkout equals `origin/main`). Script: `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/2b12756f-4507-4804-a670-8900c65ec7d2/scratchpad/blend-measure-ada/measure.ts`; output beside it in `output.txt`. The script imports the repo's own token source, theme maps, OKLCH converter (`src/color/OklchConverter.ts`), native channel formatter (`src/generators/oklch/NativeColorUtils.ts`) and the web blend helper, and runs them. It writes nothing in the repo. Its emitted P3 for `white200` (0.9275, 0.9351, 0.9496) matches the local `dist/DesignTokens.ios.swift` L791, which checks the input path.

## 1. The measurement

### Where the helper and the contract differ from the brief

- **The contract matches Lina's description.** Chip-Base `contracts.yaml` L65 and L73 say pressed is "distinctly darker background (ΔL 0.05–0.10)". Chip-Filter and Chip-Input inherit it (`inherits: Chip-Base`, each file L4). Icon-Base's own range is different: `visual_optical_balance`, L57–73, says "ΔL 0.02–0.04, chroma preserved".
- **The helper is not what the brief describes.**
  - **Today's native code computes nothing.** `pressedBlend()` (iOS `ThemeAwareBlendUtilities.ios.swift` L130–131; Android `.android.kt` L115–116) calls `Color.darkerBlend`, which no shipped file defines. It is emitted only by the dormant `src/generators/BlendUtilityGenerator.ts` (VERIFIED, grep), so today the native pressed state does not compile. I measured the maths that generator would emit, as the closest thing to "today's native maths".
  - **"Darkens by 12%" means a 12% black overlay in gamma-encoded sRGB**: each channel × 0.88, rounded. It is not HSL; HSL is used only by `saturate`/`desaturate`. Sources: generator L229–235 (Swift) and L376–383 (Kotlin); web `ColorSpaceUtils.ts` L207–221.
- **Platform-specific details in that maths.**
  - **iOS** reads the colour with `UIColor.getRed`, which gives extended-sRGB values (generator L701–707). It truncates each channel with `Int(x*255)`.
  - **Android** reads `Color.red` (generator L563). On a `ColorSpaces.DisplayP3` colour that returns the P3 value. The code then rebuilds an sRGB `Color` from those numbers, so the P3 values are read as sRGB. That Compose behaviour is UNVERIFIED (not run on a device). It does not matter for the near-grey surface, but it moves cyan by a little.

### Inputs (all VERIFIED by reading source)

- **Base colour of every chip's pressed state**: `color.structure.surface`.
  - Call sites: ChipBase.ios.swift L307, ChipBase.android.kt L196, ChipFilter.ios.swift L353, ChipFilter.android.kt L224, ChipInput.ios.swift L311, ChipInput.android.kt L190.
  - The token is `white200` (`semantic/ColorTokens.ts` L511), at OKLCH L 0.95.
  - **No theme overrides it.** The dark, wcag and dark-wcag maps contain no surface key (grep), so the value is the same in all four themes. The local dist agrees: iOS L791, L857, L923 and L989 are all the same value. In the dark themes, then, chips sit as a light surface (L 0.95) on the dark canvas (`gray400`, dark map L182). That may be intended, but I flag it.
- **Chip-Filter, selected and pressed**: it does not use the blend helper. It uses `colorFeedbackSelectBackgroundRest.opacity(0.9)` (iOS L347; Android L217, `alpha = 0.9f`), where that token is `cyan100` (L227, L 0.96). Web uses `filter: brightness(0.9)` (`ChipFilter.styles.css` L56–59). For the native case I assumed the canvas is the backdrop (UNVERIFIED; a chip on a card sits on a different backdrop).
- **Icon-Base `iconBlend()`** is an 8% white overlay (iOS helper L194; generator L254–260). Its input is whatever colour the caller passes (IconBase.ios.swift L126, .android.kt L63). The chips pass `color.text.default` (`gray300`, L401; `white100` in dark, dark map L177) and `color.feedback.select.text.rest` (`cyan400`, L211). **The chips never set `opticalBalance`**: their `IconBase(` calls pass only `color` (VERIFIED, grep). So `iconBlend()` is not exercised in the first family. I measured it anyway.
- **Web pressed state**: `ChipBase.web.ts` L180–191 reads `getComputedStyle(document.documentElement).getPropertyValue('--color-structure-surface')`. The CSS value is `oklch(0.95 0.006 260)` (local dist L563; no `@property` registers it). The web helper's `hexToRgb` accepts only hex or `rgb()` (`ColorSpaceUtils.ts` L139–152). It throws on the OKLCH text, and the helper returns its input unchanged (`ThemeAwareBlendUtilities.web.ts` L150–157). I ran the repo's own `getBlendUtilities().pressedColor` on that text in the script, and it came back unchanged (VERIFIED). That a browser hands back the raw token text is per the CSS spec for unregistered custom properties (UNVERIFIED in a browser).

### Results

ΔL is the OKLCH lightness of the result minus the base. The pressed range is 0.05–0.10; the icon range is 0.02–0.04.

| Case | Theme | Base (OKLCH L) | iOS ΔL | Android ΔL | Web ΔL |
|---|---|---|---|---|---|
| Chip-Base, Chip-Filter (unselected), Chip-Input pressed | base light / base dark / wcag light / wcag dark | `white200` 0.95 | −0.089 **IN** | −0.089 **IN** | **0.000 OUT** (the helper fails to parse; it would be −0.087 if fed hex) |
| Chip-Filter selected + pressed | base light, wcag light (backdrop `white100`) | `cyan100` 0.96 | +0.003 **OUT** (lighter) | +0.003 **OUT** | −0.073 IN (`brightness`, computed in sRGB) |
| Chip-Filter selected + pressed | base dark, wcag dark (backdrop `gray400`) | `cyan100` 0.96 | −0.049 **OUT** (just under) | −0.049 **OUT** | −0.073 IN |
| `iconBlend`, `color.text.default` | light themes | `gray300` 0.52 | +0.041 **OUT** (by 0.001) | +0.040 **OUT** | +0.041 OUT |
| `iconBlend`, `color.text.default` | dark themes | `white100` 1.00 | −0.003 OUT (white cannot lighten; truncation) | 0.000 OUT | 0.000 OUT |
| `iconBlend`, `select.text.rest` | all four | `cyan400` 0.64 | +0.031 IN | +0.032 IN | +0.031 IN |

### What the results mean

- **Native**: today's maths, if it compiled, would satisfy the pressed contract for the shared chip state in every theme. The miss is Chip-Filter's hand-written `opacity(0.9)`, which is not the blend helper at all.
- **Web**: chips get no pressed or hover darkening today, only the border change. This is a live web defect, and the web arm of the incomplete OKLCH blend migration. I would file it; it is not mine alone, since the call site is Lina's.
- **OKLCH is not needed to meet the contract for the first family's pressed state.** It is needed for chroma preservation and for consistency.

## 2. The scope

### (A) Blend only

**Work items:**
1. Wire `OklchBlendCalculator` (already built, tested, thresholds set) or ratify the sRGB overlay.
2. Generated or hand-written delivery, with a cross-platform guard.
3. Dispose of the dormant generator.
4. Native public shape: `ThemeMode`, `LocalThemeMode` and `BlendThemeContext` are a second dark-mode switch beside `dpTheme`. Fold them in or retire them before the claim.
5. Fix Android's P3 read.
6. Fix web's OKLCH parse, or move it to CSS relative colour.
7. The meaning of the blend tokens if they become ΔL values (Peter reviews any token change).
8. Re-point the interaction-state audit at the live engine.
9. Decide what happens to the `./blend` RGB/HSL exports.

**Size (estimate)**: 2–3 sittings to tasks, then 8–14 sessions.

### (B) All of 133

(A), plus:
- **The `ColorTokens.ts` deletion together with the rgba cleanup.** They are one item: the same format generators, five readers, the barrel, `semantic/index.ts`, `AccessibilityTokens.ts`, `buildValidation.ts`, a replacement DTCG structural source, the public `ColorTokenValue` type, and a migration for local-mode copied trees. About 200 assertions by the record's figure (UNVERIFIED now). Estimate 6–10 sessions.
- **Shadow channel tokens**: Peter's creation review. Estimate 2–3 sessions.
- **Enforcement** (Lina leads): six design questions plus an arming campaign that needs calendar time. Estimate 8–15 sessions.

**Size (estimate)**: 5–8 sittings, 25–40 sessions.

### Entanglement and whether blend cuts out cleanly

- **Blend cuts out cleanly.** `src/blend` does not read `ColorTokens` (VERIFIED, grep); its only token import is `BlendTokens`.
- **The seams are thin.** The rgba record's "remove old `BlendCalculator` tests" depends on blend's choice. Enforcement needs a policy for computed state colours.

### Is Peter right?

Half right. The token half, deletion plus rgba plus shadows, is about blend's size and mostly mechanical now that 129 removed native rgba. Enforcement is the large part, and it gives adopters nothing before the claim. If 133 holds enforcement to wiring the detectors in classify mode, without arming, (B) comes to roughly 1.5× (A), and Peter is right.

#### [LINA R6]

Read at `main` `35456bdbc`. Script: `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/2b12756f-4507-4804-a670-8900c65ec7d2/scratchpad/blend-measure-lina/measure.js` (plain Node; it reads nothing from the repo).

**1. The measurement**

**First, a correction to my R5.** Today's native helpers contain no maths. `pressedBlend()` and `iconBlend()` call `darkerBlend`/`lighterBlend`, and neither function exists on either platform. That is the pinned compile error (`harness/expected/harness-ios-components.tsv` L6, `harness-android-components.tsv` L6; VERIFIED). What I measured is the maths those helpers expect, taken from the dormant generator `src/generators/BlendUtilityGenerator.ts`:
- darker: mix with black in 0–255 sRGB (L229–237 Swift, L375–383 Kotlin);
- lighter: mix with white (L254–262);
- iOS reads the colour through `UIColor.getRed` and truncates (L701–707);
- Android reads `Color.red * 255` (L563–566) and rebuilds the colour as sRGB (L510–514). All of these are VERIFIED.

**Inputs** (all VERIFIED):
- Blend amounts: `pressedDarker` 0.12, `iconLighter` 0.08 (`ThemeAwareBlendUtilities.ios.swift` L22, L35; `.android.kt` L31, L44).
- `color.structure.surface` → `white200` (`semantic/ColorTokens.ts` L509–511). No theme overrides it.
- `color.text.default` → `gray300` (L399–401). In dark and dark-wcag it becomes `white100` (`themes/dark/SemanticOverrides.ts` L177).
- `select.text.rest` → `cyan400`; `select.background.rest` → `cyan100` (L209, L225).
- Channels:
  - `white200` (0.95, 0.006), `gray300` (0.52, 0.020), `cyan400` (0.64, 0.125), `cyan100` (0.96, 0.048);
  - hues 260 (neutral) and 202.5 (cyan) (`channels/lightness/*`, `chroma/*`, `hues.ts`).
- The Display P3 values the script computes match `dist/DesignTokens.ios.swift` to four decimal places.
- Themes: base, wcag, dark and dark-wcag. wcag overrides none of these inputs, so the wcag rows equal the base rows.

**Contract ranges** (VERIFIED):
- Chip-Base `state_styling`: "Pressed: distinctly darker background (ΔL 0.05–0.10)" (`Chip-Base/contracts.yaml` L65, L73).
- Chip-Filter and Chip-Input state no range of their own. Each one `inherits: Chip-Base` (L4 of each).
- Icon-Base `visual_optical_balance`: "OKLCH ΔL 0.02–0.04, chroma preserved" (`Icon-Base/contracts.yaml` L62, L68).

| Case | Light / wcag-light | Dark / wcag-dark | Range | In range? |
|---|---|---|---|---|
| Chip-Base, Filter (unselected), Input pressed, on `white200` | −0.089 | −0.089 | −0.05 to −0.10 | **yes**, all themes, both platforms |
| Icon-Base `iconBlend()` on `text.default` | +0.041 (`gray300`) | −0.003 (`white100`) | +0.02 to +0.04 | **no** in either theme |
| Icon-Base `iconBlend()` on `select.text.rest` | iOS +0.027, Android +0.032 | same | +0.02 to +0.04 | yes for ΔL. Chroma falls 0.125 → 0.118 on iOS and → 0.092 on Android |
| Chip-Filter **selected** + pressed (`.opacity(0.9)`, no blend) | +0.004 | −0.0499 | −0.05 to −0.10 | **no** |

Notes on the table:
- **Android chroma**: the chroma loss on Android comes from treating P3 values as sRGB. That is REASONING from the Compose API, not run.
- **The opacity row**: the backdrop is assumed to be `color.structure.canvas`, which is UNVERIFIED. In light mode the pressed chip gets *lighter*.
- **Icon-Base in the chips**: no chip passes `opticalBalance`, so in the slice `iconBlend()` is only compiled, never run (VERIFIED, grep).

**What this means**:
- The chips' blend pressed state already meets its contract on today's RGB maths. So the option in my R5 where the test checks the range is open, and 133 does not need to move for the chips.
- The failures are not in the maths:
  - Chip-Filter's selected-pressed state uses opacity instead of a blend. That is a defect the slice has to fix.
  - Icon-Base's range cannot be met on white, and is overshot on gray. That is a contract-wording question.
- Separately: dark mode uses the same light `white200` chip surface as light mode. The source says so; whether it is intended is Ada's question.

**2. The scope**

From the component and enforcement side, **Peter is not right**. The enforcement half is about as big as the blend half, possibly bigger. The measurement makes the blend work that must come before the claim *smaller*, so the gap between that and all of 133 gets wider.

**What enforcement needs from me**, by its six questions (`.kiro/issues/2026-09-14-color-token-enforcement-spec-candidate.md`):
1. **Which surfaces the check covers** (Peter rules): CSS, native source, demos, READMEs, prop values.
2. **Detection**:
   - point the web check at `.css` files;
   - wire the iOS and Android detectors already in `src/validators/StemmaTokenUsageValidator.ts` L136. That file is outside my standing scope, so it needs a row grant;
   - set a false-positive policy;
   - cover `oklch()` and named colours.
   - Today a rough grep finds 0 raw literals in 29 component CSS files, and 73 colour-literal hits in 15 native files, previews included. The classification of those hits is UNVERIFIED.
3. **Arming**: a proof that the check bites, then Peter's flip, sequenced against any open measurement window.
4. **The dormant register row**: revert it to `armed` the legitimate way.
5. **Two gates that are documented but were never built**: build or decline `lint:stemma*` and CI wiring for the theme-drift audit.
6. **What counts as theme drift**: mostly Ada's.

**Rough size** (ESTIMATE): 10–18 sessions from me, plus Thurgood's formalization, and 2–3 of Peter's sittings: scope, false-positive policy, the two unbuilt gates, and the arming flip.

**Dependency**: one-way. Enforcement waits on blend. Whether blend's output is generated or hand-written, and whether web moves to `color-mix(in oklch, …)`, decides what the detectors exclude and what they accept. Blend does not depend on enforcement at all. Enforcement also works better after 132's families settle, because arming native detection while 132 is still editing those files means churn.

#### [STACY R5]

**1. The measurement.** The two runs agree on every case they both measure (VERIFIED by comparing the two answers with `output.txt`). The one exception is the iOS icon blend on `cyan400`: Ada gets +0.031 and Lina +0.027. Its likely cause is how each script handles colours outside the sRGB range (Ada's clamps, Lina's does not). That is UNVERIFIED, and it does not matter here, because no chip passes `opticalBalance`.

Ada's inputs are better grounded: she runs the repo's own converter, formatter and web helper. Lina's run is the independent check. Neither run is the shipped helper. `darkerBlend` does not exist, so both measure a dormant generator's maths standing in for it. A CLOSEOUT pass could confirm none of these:
- that the stand-in maths is what ships;
- that Android reads P3 values as sRGB;
- that the backdrop under the opacity case is the canvas;
- that a browser returns the raw OKLCH text;
- how iOS handles colours outside the sRGB range.

Only device runs of D5 that sample the pressed colours would confirm them.

**2. The scope.** The two estimates fit together. Ada's figure for enforcement (8–15 sessions) matches Lina's (10–18), and Ada's total adds up from its parts. Peter is right about the token half and wrong if 133 arms enforcement. Neither estimate is firm. The fact that would firm them: how many of Lina's 73 native colour-literal hits are real violations.

**3. The defects**
- **Web chips never darken on hover or press.** This needs a new record, owned by Lina with Ada. It should scope the whole class, every web `getComputedStyle` blend call. I also read this as a **possible P0 for Peter**. Chip-Base web is served as `production-ready`, with "consistent state styling (default, hover, pressed)" (VERIFIED, `get_component_summary`), and the blend record's class reason says "interaction states render correctly". That sentence is now false.
- **Chip-Filter's selected-and-pressed state** belongs in 132's slice rows (Lina). It needs a record only if the tasks round leaves it out.
- **Icon-Base's ΔL range** is a contract-wording question and needs a record (Lina).
- **The light chip surface in dark mode** needs a record (Ada, with Leonardo on whether it is intended).
- **Android reading P3 values as sRGB** should go on the blend record (Ada).

**4. Position.** 17.0.0 should wait on the first family and the blend API's names. It should not wait on enforcement. The web defect should not wait at all.

#### [THURGOOD R10]

**1. Yes.** (A) gates 17.0.0 only on what the claim depends on, and the re-decision rides an event that is already git-visible.

**2. Mechanism. Both places, and neither is law.**
- **The trigger** is a `**Spec outcome**` park line on 133's outline: `park — re-ask: path:.kiro/specs/132-*/completion/first-family-measured-cost.md`. The existing waiting-spec form (RELEASE-FLOW L54–56), as for 131.
- **The notice**: a priorities § 7 row, reprinted each release.
- **To make the class option a habit**:
  - add a row to the record's form, "Decisions this record reopens" (131's re-ask, 133's (B), re-placing the remaining families);
  - its creating PR carries one `**Open for Peter**:` line per decision, which merge-hold enforces.
- All of this is 132 spec text plus records. A standing rule for every spec's gates would be law (a ballot).

**3. Yes, in a column like T-17's.**
- A "forecast" column for 133's token half (blend beyond 132's share, deletion with rgba cleanup, shadow channels).
- **Owner**: Ada. Lina reads the method.
- **Due**: under T-17's condition, before the first first-family unit PR merges, so it cannot be fitted to the measurement.
- State the conflict: Ada also owns blend inside 132.

**4. What the lean gets wrong**
- **"Cost: none" is not quite true.** The class option costs a sitting at the record's PR plus this sizing.
- **"The shape of the blend API" settles names, not values** (Stacy R4). It needs a committed decision record of Ada's plus D9's baseline, and neither exists yet.
- **"Today's maths passes on iOS and Android" needs a label.** Native `pressedBlend()` calls the unresolved `darkerBlend` (outline § 2, 4 pinned entries per platform). So the ΔL figure is computed maths, not a native run (UNVERIFIED by me).

#### [ADA R7]

**1. Can I live with (A), with (B) re-decided at the record? Yes.** Every 133 item that touches adopters' API is the blend shape, which sits in (A). Deferring (B) costs time, not aliases.

**2. Sizing (B) before the record fires.** I will owe a "133 token-half: forecast" column, on T-17's terms:
- **When**: committed before the first first-family unit PR merges.
- **Basis**: `git grep` counts at a named SHA. That covers the `ColorTokens` readers and importers, the rgba-asserting tests, the users of `ColorTokenValue`, and the number of shadow channel tokens.
- **Labelled**: REASONING. I own both, so Stacy reads the method.
- **Calibration**: the record prints the blend package's measured sessions beside my R6 forecast for (A), and the ratio rescales the column.
- **Caveat**: that package measures the repair, not 133's choice between OKLCH and sRGB.

**3. What "the shape" now includes:**
- A public surface cut to what components call. The names stay state names (`pressedBlend`), never maths names (`darkerBlend`); the rest becomes `internal`.
- Retiring `ThemeMode`, `LocalThemeMode`, `rememberThemeMode` and the modifier in favour of `dpTheme`.
- `BlendTokenValues` either generated from the blend tokens or made `internal`.
- The Android package: the chips import from `com.designerpunk.tokens` today.
- Dropping the deprecated `disabled*` members before the claim, not carrying them into it.
- The contract stating the ΔL range, not "12%". That way, a change of maths inside the range is not a break.

Building it twice: the risk is small if (A) also picks generated or hand-written. A rewrite then touches only bodies.

**4. What the lean gets wrong.** "Today's maths passes" is the dormant generator's maths. Native pressed does not compile, and web gives ΔL 0.000. The lean leaves web out.

#### [STACY R6]

**1. Yes.** (A) gates the claim only on work already inside 132. The re-decision falls on an event that git can see. A first family left waiting is a risk only if Peter later picks (B).

**2. Checkable?** Not as written. Today, "re-decide at the record" is a plan line, and under rule 10 a plan line alone is a finding. Three things are owed:
- **A record, in the PR that records Peter's ruling.** Its trigger is `path:.kiro/specs/132-*/completion/first-family-measured-cost.md`, which is the same event as 131's re-ask. Its owner is Peter's choice. It also needs a § 7 row in the priorities record, so RELEASE-FLOW 3a reprints it.
- **A 133 column in the measured-cost record**, on the T-17 pattern. Ada sizes 133's token half: the deletion, the rgba cleanup and the shadow channels. It is committed before the first first-family unit merges, headed "forecast", and labelled REASONING. Blend's measured cost comes from the shared-costs row. Without this column, Peter re-decides on today's guesses, as the orchestrator says.
- **The re-decision itself**, as a committed ruling dated after the record's commit and citing its SHA.

With all three in place, the 17.0.0 RELEASE pass can check that each exists and is in the right order. That the column's numbers are true stays self-reported.

**3. Conflicts with R4:** none. Option (a) gives D5 its pressed-colour sample. That fills the gap I raised in R4. A shift that stays inside 0.05–0.10 still passes, though, so the claim still needs the line saying colours may change. Condition 1 still needs Ada's API record and the D9 baseline. Condition 2 still needs an owner.

**4. Wrong or missing:**
- "Today's maths passes" is a dormant generator's maths. `darkerBlend` does not compile (R5).
- "Cost: none" leaves out Ada's forecast.
- The web pressed-state defect, my possible P0, is missing from the lean, and it does not wait on 17.0.0.

#### [LEONARDO R9]

Read at `main` `35456bdbc`.

**1. Can I live with the lean? Yes.** It gates the claim on what the claim contains: blend's public shape, which the chips call (VERIFIED). The re-decision uses an event that already exists, so it adds no new law.

**2. The wait under (B).** 133 has no round yet. Ada needs at least 4 of Peter's sittings before tasks, and Peter has not waived the sequential gates. The token half beyond blend is then about 8–13 sessions (Ada's estimate). Given Peter's pace, that is weeks to months (UNVERIFIED).
- **What adopters would see:** "Do not start a native product" stays printed over a family we have proven. Worse, if D7's served readiness flips from passing D4–D6 results, the served readiness says ready while the printed text says do not start. That is a false sentence where an agent reads it. Holding the claim has to hold D7's flip with it.
- **Two ways to shorten it without a prerelease:**
  - Claim in a 16.x minor and give 17.0.0 to the colour work. This is Thurgood's "gate the number, not the claim". It gives up the "17 = native" marker.
  - Or open 133's round now, in parallel with the first family. That keeps the marker, costs Peter sittings now, and reorders 133 ahead of 131.

**3. Web chips that never darken: yes, a P0 by the definition.** The served text says "consistent state styling (default, hover, pressed)" under `production-ready`. That is a shipped sentence that is false where its reader meets it. The harm to users is small, since the border still changes. Tell adopters now: Lina corrects the served text to "hover and pressed darkening does not render on web; border change only", and the fix ships in a 16.x without waiting for 133.

**4. What the lean gets wrong.**
- "Today's maths passes" is not quite right. Today's native pressed state does not compile: `Color.darkerBlend` is not defined anywhere in `src` (VERIFIED, grep). What passes is the dormant generator's maths. Chip-Filter's selected-and-pressed state fails (Ada R6, Lina R6).
- The record that fires the re-decision does not size 133's token half. Ada should owe a forecast column there, as T-17 does for 131.
- Nothing catches a colour shift. D5 needs a pressed-colour sample (Stacy R4).

#### [PETER] P-7

*Recorded by Thurgood, 2026-11-28. Peter's words, from the orchestrator's relay; each receipt time is the orchestrator's `date -u`.*

**What he was asked first**: P-7 as in design-outline.md § 5.1: which release carries the first claim, (a) 17.0.0 as a chosen marker or (b) a minor, and what it promises for families not yet claimed.

**The exchange, in order**:
- **2026-11-28T02:32:51Z**, verbatim: "I lean towards (a), but I was also thinking that we'd include specs 130, 131, and 133 as well. Honest thoughts?"
- The orchestrator then put three readings to him: (i) a gate, where 17.0.0 ships only when all of them are done; (ii) a train, where 17.0.0 carries the first claim plus whatever has landed; (iii) reordering 130, 131 and 133 ahead of the first family.
- **02:36:17Z**, verbatim: "I was thinking (i); but since 130 is tied to 128, I'm fine with not including it. Honest thoughts?" The seats answered on the gate (`[THURGOOD R8]`, `[ADA R4]`, `[LEONARDO R7]`) and cross-read it (`[THURGOOD R9]`, `[ADA R5]`, `[LEONARDO R8]`).
- **02:40:07Z**, verbatim: "I forgot we had these specs sequenced. I'm fine with aligning to the previous sequence if we think that's more optimal."
- **02:43:54Z**, answering "(a), both conditions, and part 2 left to the design round". As relayed: the same words as at 02:40:07Z, then, verbatim: "Let's get feedback from the relevant agents on this plan if we haven't already, please". The seats answered (`[STACY R4]`, `[LINA R5]`, `[KENYA R6]`, `[DATA R6]`).
- **02:56:22Z**, verbatim: "Yes, get the measurement from Lina and Ada first. I actually don't think all of 133 is much more than the scope of 133 you're proposing, but I think that's also something Ada and Lina (possibly Stacy, too) could provide visibility into." The measurement: `[ADA R6]`, `[LINA R6]`, cross-read by `[STACY R5]`.
- He was then shown (A), 17.0.0 waiting on 132's first family plus the native blend API's shape, and (B), also waiting on 133's token half. The orchestrator recommended (A) now, with (B) re-decided at the first family's measured-cost record, plus that as a class option.
- **03:13:10Z**, verbatim: "I'm leaning toward your recommendation plus the class option. Honest thoughts from your and the relevant agents?" The seats answered (`[THURGOOD R10]`, `[ADA R7]`, `[STACY R6]`, `[LEONARDO R9]`), each able to live with it, with amendments. The amended plan was the last thing put to him.

**The ruling**: **2026-11-28T03:19:49Z**, verbatim: "This is getting a little complicated for me, so let's go with the collective relevant team's lean on the optimal path forward. My preference would be to avoid too many changing messages we have to update, track, and communicate to potential adopters. Honest thoughts?"

**What "the collective team's lean" is**: the amended P-7, as the orchestrator relayed it. Thurgood, Ada, Stacy and Leonardo can each live with it.
1. **17.0.0 carries 132's first family alone.** The ruled order is unchanged. The release waits on the first family plus the blend API's shape. That shape, per Ada R7:
   - a narrow public surface, named for the state;
   - the second dark-mode switch retired in favour of `dpTheme`;
   - `BlendTokenValues` either generated or made internal;
   - a decision on the Android package;
   - deprecated `disabled*` members dropped;
   - generated versus hand-written decided;
   - Ada's committed decision record, plus D9's baseline.
   This settles names, not values; the contract range covers values.
2. **`main` stays releasable as 16.x.** Breaking changes are deprecated first and removed only in their major. The rule does not cover unclaimed reference-only native source (Lina). It gets an owner and a row in the priorities record's § 7 (Stacy R4).
3. **Part 2, the T-14 threshold, stays in the design round.**
4. **Pressed colour, option (a).** The contract states the ΔL range instead of "12%", and the native test checks it. The claim keeps a line saying colours may change. The measured −0.0889 is labelled as the dormant generator's computed maths, not a native run.
5. **(B), 133's token half, is re-decided at the first-family measured-cost record**: a park line on 133's outline, with its re-ask at that path; a § 7 row; a "Decisions this record reopens" row in the record's form, so its PR carries `**Open for Peter**:` lines. The re-decision itself is a committed ruling dated after the record's commit (Stacy R6).
6. **Ada's forecast column for 133's token half**, on the T-17 pattern: due before the first first-family unit PR merges, its method read by a second seat.
7. **Cost correction**: the class option costs one sitting at the record's PR, plus the forecast, not nothing.

**Not ruled, left open**: the web chip defect's handling (the orchestrator is putting it to Peter); Leonardo's two ways to shorten a (B) wait (`[LEONARDO R9]` item 2).

#### [THURGOOD R11]

*2026-11-28. The fourteen P-7 consult files above are spliced byte for byte from `consults-2026-11-27/answers-132/`, in the orchestrator's order: `thurgood-p7-gate.md` (R8, R9), `ada-p7-gate.md` (R4, R5), `leonardo-p7-gate.md` (R7, R8), `stacy-p7-plan.md`, `lina-p7-plan.md`, `kenya-p7-plan.md`, `data-p7-plan.md`, `ada-blend-measure.md`, `lina-blend-measure.md`, `stacy-blend-crossread.md`, `thurgood-p7-lean.md`, `ada-p7-lean.md`, `stacy-p7-lean.md`, `leonardo-p7-lean.md`. Three files carry two stamps each; `ada-blend-measure.md` carries its own `##` and `###` headings, kept as written.*

- Recorded P-7 as RULED, with the exchange in order and what "the collective team's lean" was. → design-outline.md § 5.1
- **Folded**: 17.0.0 named as the first claim's release (§ 4.4); the blend API's shape, the ΔL contract range and the claim's colour line as first-claim preconditions (§ 4.4); `main` releasable as 16.x (§ 4.4); two rows in the measured-cost record's form, "A column for 133's token half" and "Decisions this record reopens" (§ 3); T-14's threshold kept in the design round (§ 5.2).
- **Owed by other files, not filed in this commit** (each listed in design-outline.md § 5.1, P-7): 133's park line (me, as 133's author; kept out so this PR's diff stays in 132's two files); the § 7 rows (me, as the priorities record's steward); the 16.x rule's owner (unnamed); Ada's blend API decision record and her forecast column; D9's baseline (T-10's owners); the contract's ΔL range (Lina); the claim's colour line (Leonardo).
- **Rule 10, open for the orchestrator**: Stacy R6 says the re-decision needs a record filed in the PR that records the ruling, which is this one; a plan line alone is a finding. This commit files none, by the brief's two-file limit. Either the record and the § 7 rows land on this branch before #880 leaves draft, or the finding stands.
- **Open for the requirements round**: the forecast's second reader, Stacy (Ada R7) or Lina (Thurgood R10).
- **Not ruled, left open**: the web chip defect's handling; Leonardo's two ways to shorten a (B) wait.

#### [KENYA R7]

**1. Final position: keep the catalog plus the one product screen.** The upgrade rehearsal decides it.
- The catalog is generated from the committed component list (VERIFIED, plan-r2 "D4 details"). Each release regenerates it against the new API, so it never holds code written against the previous release. D9 needs exactly that code, left unchanged, to see a source break. The product screen is hand-written, so it is that code (REASONING).
- **XCUITest**: catalog tests check components one at a time. VoiceOver order across composed elements only shows up when components sit together: chips inside a scrolling `FilterBar`, then a list. So does a tap target that overlaps a neighbour (REASONING).

**2. If the product screen goes**
- **What iOS saves**: about 0.5 session, out of my "fixture screens, about 1" (VERIFIED, plan-r2 § 8), and one UI flow that can be flaky.
- **What iOS loses**:
  - the D9 target;
  - the only check of composition;
  - the natural home for the D10 `FilterBar`. It could move to the catalog.

**3. P-3, Peter's VoiceOver reads on his iPhone**
- **Simplest install: straight from Xcode.**
  - Turn on Developer Mode on the iPhone (VERIFIED: iOS 16 and later require it).
  - Sign with a free Apple ID personal team. The catch is that the app stops opening after 7 days, so he reinstalls before each read session (UNVERIFIED for current Xcode).
- **TestFlight needs a paid Apple Developer Program membership** and an App Store Connect setup. Whether he has a membership is UNVERIFIED.
- **Things he may not have**:
  - an Xcode that can deploy to his iPhone's iOS version. The Mac's Xcode version is UNVERIFIED: 26.0.1 on 2026-11-05, and 27.2 is named in the outline. A newer iPhone OS than the Xcode supports blocks installing;
  - an iPhone on iOS 18 or later, because of the floor.
- **To make each read quick**:
  - a "read mode" in the catalog that shows one component per page with a fixed swipe order;
  - VoiceOver on the triple-click shortcut;
  - a record template with device, OS version, what he heard and his name (VERIFIED: D6 details require the device, the OS version and the reader);
  - the reads done on a Release build.

#### [KENYA R8]

**1. Final position**: unchanged. Keep the catalog plus one patterns screen, and I take Leonardo's framing and D4 line. I have narrowed my reason (see 3).

**2. Can I live with the others?**
- **Leonardo: yes.** It is my position, framed better.
- **Data: yes.** Same position.
- **Stacy, catalog only: yes, on her own condition.** `FilterBar`, with live selection state written by hand and left unchanged across releases, is a small composition screen. Her version only works if that code is not regenerated.

**3. Factual points**
- **I overstated, and so did Data** (REASONING). If D9 takes the *previous release's* generated catalog and does not regenerate it, it does catch removed or renamed symbols. The API diff already catches those. What a catalog misses is usage written the way an adopter writes it: bindings, nesting and composition. So Leonardo's "any screen works" holds for compile breaks, but not for that coverage.
- **Stacy**: the repo's git user is Peter (VERIFIED, session git status).

#### [DATA R7]

**1. Keep the catalog plus the one product screen.** What decides it: the catalog is generated from the committed component catalog (VERIFIED, plan-r2 "D4 details"). An upgrade regenerates it against the new API. So as an upgrade test it passes almost by construction. The product screen is code written by hand and frozen, which is exactly what an adopter has. It is the only part of the app that can break the way an adopter's app breaks (REASONING). A design-system team's demo app also usually has example screens, not only a list of components.

**2. If the product screen goes, on Android:**
- **Cost saved**: about 0.5 of my roughly 2.5 WP4 rounds (estimate, UNVERIFIED), plus keeping that screen's tests up to date.
- **What we would lose**:
  - TalkBack focus order across several chips in a row;
  - how semantics merge when components sit side by side;
  - state shared between chips;
  - scrolling, and insets under the keyboard with Chip-Input;
  - the most natural home for D10's `FilterBar`;
  - D9's strongest check.

**3. P-3 on the emulator.** This Mac has no Android SDK. There is no `~/Library/Android/sdk`, no `sdkmanager`, `adb` or `emulator` on the path, and no AVDs (VERIFIED). So everything below is UNVERIFIED here.
- **Is TalkBack there?** Google Play images can install it from the Play Store. Google APIs and AOSP images need the APK installed by hand. Whether any image has it preinstalled is UNVERIFIED.
- **Does it speak through the Mac?** The emulator plays sound through the host by default. That should include TalkBack's speech.
- **Can Peter drive it?** Dragging with the mouse acts as a one-finger swipe, and a double-click acts as a double-tap. Gestures with more than one finger are awkward. TalkBack also has keyboard shortcuts when a hardware keyboard is attached.
- **One short check**:
  1. Install Android Studio.
  2. Boot an arm64 Google Play image at API 35.
  3. Run `adb shell pm list packages | grep talkback`.
  4. Turn TalkBack on, swipe once, and listen.

  This needs about 2 GB of downloads, which I did not do.

**What an emulator read misses, compared with a real device:**
- the TalkBack versions phone makers ship (Samsung ships its own);
- the phone's own speech engine and speaking rate;
- real touch timing and vibration feedback;
- real density and font-scale settings;
- lag on a slower phone.

What gets spoken (labels, roles, states) should match a device, and that is what the read checks. The label "emulator read" is honest.

#### [DATA R8]

**1. My final position**: unchanged. Keep the catalog plus one screen. I take Leonardo's framing and name, "Patterns: Filter and tags".

**2. Can I live with the others?**
- **Kenya: yes.** We land in the same place for the same reason.
- **Leonardo: yes.** This is now my position.
- **Stacy, catalog only with her three conditions: yes.** What decides it: her `FilterBar`, with live selection state, is hand-written adopter code that stays frozen across releases. It keeps D9's target. It loses chips placed beside a tag list.

**3. Factual points**
- **My own R7 claimed too much, and Kenya's R7 claims the same.** We said the catalog "passes almost by construction" in an upgrade. That holds only if the rehearsal regenerates the catalog with the new release. If it keeps the previous release's generated source, the catalog is also frozen code, and Leonardo's "any screen works" holds. Which of the two D9 does is UNVERIFIED, and the requirements round should decide it.
- **Stacy is right that the git user is Peter** (VERIFIED: the session's git status shows "Peter Michaels Allen").

#### [LEONARDO R10]

Read at 132 outline `8d5f44c48`; 131 outline at `main` `35456bdbc`.

**1. My position: a catalog plus one composition screen, framed the way a design-system team would frame it.** What decides it is that only that screen tests components working together. The catalog shows each component on its own, built from the served samples. Nothing else here renders a filter chip driving a tag list, a row of chips wrapping, Chip-Input being removed, the focus order across components, or D10's adopter component sitting next to ours.

**2. If the screen goes.**
- **D9 can move to the catalog** (REASONING, UNVERIFIED). D9 compiles the previous release's app against the new one, so any screen works.
- **131's native rehearsal leg can move too.** It needs a standing consumer to upgrade, not a product screen (131 outline L107).
- **What we lose:** source breaks that only show up in adopter-style code, such as state bindings, nesting inside platform containers, and composition. The samples are minimal, so upgrades that break real usage would get through.
- **Nothing else covers it.** `validate_assembly` checks the tree before anything renders, never the rendered result. The clean-room build (T-3) tests the guide. So the gap stays open until Peter's real app arrives.

**3. If it stays: call it "Patterns: Filter and tags".** It is a composition example inside the demo app, the kind a design-system team ships to show components together, not a product. I still spec it in the fixture's `product/`, because that exercises the selection and assembly path adopters use. No filter-and-tags experience pattern exists yet (VERIFIED, `list_experience_patterns`), so it could feed one later.

**4. Proposed D4 "What it is" line:**

"**What it is**: a component demo app that we build and keep in this repository, and run in our CI (iOS: Kenya; Android: Data; content: Leonardo). It has two screens: a catalog, and one patterns screen that composes the claimed families the way a product would (filter and tags first). It grows by one family per unit. Its component list comes from the committed catalog (below), so small never means a hand-picked set of components. It stands in for an adopter's app and is not one. Peter's own app is read through the real-app record."

#### [LEONARDO R11]

**1. Final position: unchanged.** The catalog plus one patterns screen.

**2. Can I live with theirs?**
- **Kenya and Data: yes.** Same position as mine.
- **Stacy, catalog only with three conditions: yes, narrowly.** Her `FilterBar`, with live selection state, is a frozen hand-written target, so it keeps D9. It does lose screen-reader order and shared state across families (chips beside a list). Her third condition records that gap rather than covering it.

**3. Facts.**
- **My own R10 was wrong.** I said D9 "can move to the catalog; any screen works". Kenya and Data point out that the catalog is regenerated each release, so as an upgrade test it may pass by construction. Whether D9 compiles the committed previous-release catalog or regenerates it is UNVERIFIED.
- **Stacy's "the git user is Peter"**: VERIFIED, this session's git user is Peter Michaels Allen.
- Kenya's Developer Mode and 7-day signing points, and Data's "demo apps usually have example screens", are UNVERIFIED. I found nothing in them I can show to be wrong.

#### [STACY R7]

**1. A catalog-only app**
- **Rows not weakened**: D4, D5 and D8. Their oracles check each component on its own, and they already run on the catalog (plan-r2 "D4 details", "D5 details"; VERIFIED).
- **D9**: its oracle is "the previous release's D4 app and samples compiled against the new release" (outline § 2, VERIFIED). A catalog still catches breaks in how components are built. It misses breaks in how components are put together. That is UNVERIFIED reasoning.
- **D10**: survives, because `FilterBar` composing Chip-Filter is itself a composition.
- **What no D row names**: a screen where state flows across components. Dropping the product screen weakens no oracle as written. It removes the only composition check we have. That is acceptable, provided three things survive:
  - `FilterBar` sits in the app, with live selection state, as D9's composition target;
  - 131's rehearsal leg is moved to a new target by its own owner;
  - the composition gap is added to the real-app record Peter has ruled.
- Removing "two screens" from the PROPOSED D4 text is a D-row change. It is Peter's, and it goes on the change list.

**Final position**: catalog only, with those three things kept.

**2. P-3**
- **Readiness**: two separate evidence kinds, `device-read (human, <device>, iOS <x>)` and `emulator-read (human, API <n>, TalkBack <v>)`. D7's derivation maps each kind to its own label from a closed list. One never counts as the other. The claim text for a platform names whichever kind it has.
- **My earlier point still holds.** VERIFIED: the repo's git user is Peter, the same identity agents commit under. A record cannot show that a human made the read.
- **Each read record should carry**:
  - the component;
  - the platform and the kind of read;
  - the reader;
  - the time, in UTC;
  - the device or emulator image;
  - the screen-reader version;
  - the app build's commit SHA, shown in the app;
  - what was spoken, word for word, against each contract;
  - a hash of the screen recording.

  CLOSEOUT can check that a record exists for each component and platform, that its fields are well formed, and that its build SHA is the release candidate's. It can never check that a human made the read.

#### [STACY R8]

**1. Final position, moved: keep the catalog plus one patterns screen, as Leonardo frames it.** What moved me is the point Kenya and Data both make. The screen is the only code written by hand and then left unchanged, which is what an adopter actually has. My R7 survival conditions were weaker than keeping it.

**2. Can I live with theirs?**
- **Kenya: yes.** Composition only shows up when components sit together.
- **Data: yes.** It is the same position, and the emulator check he describes comes first.
- **Leonardo: yes.** His "stands in for an adopter's app and is not one" keeps the claim honest.

**3. Facts**
- **Kenya and Data**: "the catalog passes D9 almost by construction" holds only if D9 regenerates the catalog. If D9 compiles the previous tag's committed catalog as it stands, that catalog is unchanged code too. Which one D9 does is UNVERIFIED, because D9's details do not say. That needs a tasks-round row.
- **Leonardo's 131 L107 citation**: UNVERIFIED. I did not read it.

#### [PETER] P-1 confirmed: the D4 shape

*Recorded by Thurgood, 2026-11-28. Peter's words, from the orchestrator's relay; each receipt time is the orchestrator's `date -u`.*

- **Context he gave**, received 2026-11-28T03:27:07Z, verbatim: "Side note: this is making me wonder if the demo app we need just really needs to be a component demo app we'd build within a Design System team rather than something more consumer facing."
- Received 2026-11-28T03:28:09Z, verbatim: "Yes, put it to all four and ask Data. I'd lean (ii), too". The four seats answered and cross-read (`[KENYA R7]`/`[KENYA R8]`, `[DATA R7]`/`[DATA R8]`, `[LEONARDO R10]`/`[LEONARDO R11]`, `[STACY R7]`/`[STACY R8]`, spliced above). All four end on the catalog plus one patterns screen; Stacy moved there in R8.
- **Item 1, as put to him**: the D4 app is a component demo app with two screens, the catalog and a "Patterns: Filter and tags" composition screen. Leonardo R10's D4 "What it is" line replaces the PROPOSED TEXT's line. The rest of the PROPOSED D4/D10 text stays as drafted: the relabel, iOS 18.0, release builds on both platforms (Release plus Swift 6 on iOS, R8 on Android), and D10 in the demo app's own module.
- **Received**: 2026-11-28T03:32:51Z. **Verbatim**: "Yes to 1 and 2. Re: 3, This feels like band-aiding the problem that could be spent properly fixing it. What's the proper fix?"
- **What it confirms**: the D4/D10 text (design-outline.md § 1, now RULED). **Open, for the requirements round**: whether D9 compiles the previous release's committed catalog or regenerates it (design-outline.md § 5.2, T-21).
- **"Re: 3" is not recorded here**: it re-opens the web-blend defect, which is not ruled.

#### [PETER] P-3

*Recorded by Thurgood, 2026-11-28. Peter's words, from the orchestrator's relay; each receipt time is the orchestrator's `date -u`.*

- **What he was asked**: P-3 as in design-outline.md § 5.1: (a) a named human does one read per component per platform at the first support release, as dated evidence, not a gate; or (b) no human read, speech labelled "not device-read".
- **Received**: 2026-11-28T03:27:07Z. **Verbatim**: "I can do (a) for iOS since I have an iOS device, but no Android device."
- **Item 2, as then put to him**:
  - iOS: Peter does one device read per component on his own iPhone, at the first support release, as dated evidence and not a gate;
  - Android: Peter does the TalkBack reads on the emulator, labelled "emulator read";
  - readiness shows `device-read (human, …)` and `emulator-read (human, …)` as separate kinds, and each read record carries the fields in Stacy R7; Kenya R7's "read mode" and install notes are inputs to the requirements round;
  - the 2 GB Android SDK and emulator install is Peter's to do when the reads come due;
  - what survives: the reads are self-attested, because the git identity is Peter (Stacy R7, VERIFIED).
- **Received**: 2026-11-28T03:32:51Z. **Verbatim**: "Yes to 1 and 2. Re: 3, This feels like band-aiding the problem that could be spent properly fixing it. What's the proper fix?"

#### [THURGOOD R12]

*2026-11-28. The four D4-shape files above are spliced byte for byte from `consults-2026-11-27/answers-132/`, in the orchestrator's order: `kenya-d4-shape.md` (R7, R8), `data-d4-shape.md` (R7, R8), `leonardo-d4-shape.md` (R10, R11), `stacy-d4-shape.md` (R7, R8).*

- Recorded the D4-shape confirmation and P-3 as RULED. → design-outline.md § 1, § 2, § 5.1
- **Folded**: the PROPOSED TEXT marker becomes RULED, with Peter's words. Its "What it is" line is replaced by Leonardo R10's, copied verbatim from his item 4 (the brief said item 3, which names the screen; the line itself is item 4's "Proposed D4 'What it is' line"). § 2's content line names the "Patterns: Filter and tags" composition screen. D7's two read kinds join the D-row change list. P-3's iOS and emulator reads, Stacy R7's record fields and Kenya R7's inputs are in § 5.1.
- **Open, for the requirements round**: T-21, whether D9 compiles the previous release's committed catalog or regenerates it (Kenya R8, Data R8, Stacy R8, Leonardo R11).
- **Not recorded**: Peter's "Re: 3", the web-blend defect he re-opened. It is not ruled.

#### [ADA R9]

**1. The proper fix: state colours become tokens, computed at build time.**
- **What it means for a designer.** A pressed chip's colour becomes a swatch in the palette, not a sum the app does while it runs: `color.structure.surface.pressed` sits beside `color.structure.surface`.
- **How it is computed.**
  - The token pipeline makes each swatch from its base swatch with a written rule. For example: "pressed = 0.07 darker in OKLCH lightness, lighter on dark surfaces".
  - It does this once per theme, after the dark, WCAG and product overrides. A product theme that changes `surface` therefore gets a correct pressed colour for free.
- **How each platform reads them.** As every colour: a CSS variable, or a theme member. There is no blending at runtime, no parsing of CSS text, no second dark-mode switch and no `BlendTokenValues`.
- **How contracts and tests hold them.**
  - A contract names the state token.
  - A pure-TypeScript test checks every state token, in every theme, against the contract's ΔL range.

**2. What it settles from 133.** OKLCH over sRGB for blend; generated over hand-written; the dormant generator (deleted); the native helpers (removed; they never compiled); the `./blend` web export (deprecated in 16.x, removed at a major). **What it leaves to 133**: the `ColorTokens.ts` deletion, rgba, shadow channels and enforcement.

**3. Tokens.**
- **Kind**: semantic colour tokens of a new derived kind. Each references a semantic colour and a rule, not a primitive. The theme-varying computation must become transitive.
- **Count**: roughly 12–16, the base and state pairs in Lina's table (UNVERIFIED). Peter reviews the names and the rule. The names are owed before the claim.

**4. Size (estimates).** Pipeline 4–6 sessions (mine); components 4–6 (Lina); tests 2; 2–3 of Peter's sittings, and it needs a spec.
- **Where it fits**: 133's blend half pulled forward, as its own unit, landing before 132's first family finalises.
- **Web meanwhile**: the fork is Peter's.
  - Ship C now. It is CSS-only, and the same lines later read the token.
  - Or leave web broken until the tokens land.

**5. Counter-argument I could not fold away.** Build time cannot know a colour supplied at runtime: Icon-Base's hex `color` prop, or an adopter's own colours. One small runtime OKLCH function per platform survives, and with it a small drift surface.

#### [LINA R8]

Read at `main` `35456bdbc`.

**1. The proper fix: state colours become colours the token pipeline has already worked out, and components stop computing them.**
- **How components get them.** `generate` works out every hover, pressed and focus colour once, per theme (light, dark, wcag and the adopter's own), in one colour space. It writes them out like any other theme colour. A chip then reads "surface, pressed" exactly as it reads "surface". No platform blends at runtime and nothing parses CSS text, so there is no missing native function and no P3/sRGB mix-up, and switching theme needs nothing extra. Of the four causes, this removes three: the parse on web, the missing function on native and the colour-space mix-up. The fourth, untested output, is item 3 below.
- **The one exception.** A colour that is passed in, such as Icon-Base's `color` prop, still needs a runtime function. That function is generated from the same maths and is the only blend API left public.
- **The tests.**
  - The token level carries the main proof, written once. For every state colour in every theme, ΔL is inside the contract's range, and a known-bad twin (an unchanged colour) fails.
  - Each platform then proves only the wiring:
    - web: jsdom with the real emitted token CSS loaded;
    - iOS and Android: compile at zero, then 132's D5 and D6 render tests.
  - `InteractionStateAudit` is retired. That is Thurgood's.

**2. Contract changes**
- **One colour space.** Ranges are stated once, in OKLCH, and the "12%" and maths wording is removed. A different maths that stays inside the range is then not a break.
- **Dark surfaces.** One rule for every contract: lighten on dark surfaces. The measured darkening there is −0.034, which is barely visible. It is a design fork, so it is Peter's.
- **Icon-Base.** Its range is impossible on white. Restate it as "lighter by 0.02–0.04 where there is room; unchanged at L ≥ 0.96".
- **Chip-Filter.** Its selected-and-pressed state is held to the inherited pressed range.

**3. Size** (ESTIMATE)
- **Web**: 1 session for the contracts and 2–3 to rewire and test all 12 components.
- **Native**: 2–3 sessions for the 9 that call blend, on both platforms. They are Button-CTA, Chip-Base, Chip-Filter, Chip-Input, Container-Base, Container-Card-Base, Icon-Base, Input-Text-Base and Nav-TabBar-Base (VERIFIED by grep).
- **Total**: about 6–8 sessions, plus Ada's generator work and a sitting for Peter's token review.

**4. Counter-argument I could not fold away.** This fix is 133's blend half brought forward. It creates about 15–20 state tokens per theme and has to decide OKLCH or sRGB now. So it cannot be quick, and web has already been broken for five months. Either web stays broken until it lands, or C ships first as the band-aid Peter wants to avoid. That fork is Peter's.

#### [KENYA R9]

**1. The proper fix on iOS: state colours become generated theme values, not maths run on the device.**
- **Where they come from**: the generator works out each pressed or hover colour once per theme, at build time, by a rule written down in the contract's ΔL ranges. That includes adopters' own themes. Each one is emitted as a member of `DesignerPunkTheme`, for example `theme.colorStructureSurfacePressed`. These are new system tokens, so Peter reviews them.
- **How SwiftUI applies them**: Chip-Base already uses a `ButtonStyle` with `configuration.isPressed` (VERIFIED, `ChipBase.ios.swift` L271–292). It would choose `theme.…Pressed` instead of calling `.pressedBlend()`.
- **Hover on iOS**: only an iPad with a pointer has hover, through `.onHover`. An iPhone has none.
- **Dark mode and `\.dpTheme`**: `\.dpTheme` is the only switch. Each theme carries its own state colours, so a dark theme can lighten where its contract says so.
- **How a test proves them**:
  - A Jest test asserts each emitted pair's ΔL against the contract range, per theme.
  - For D5, a fixture-only override forces the pressed state, and the element screenshot is sampled against the token. Capturing a screenshot in the middle of an XCUITest press is UNVERIFIED.

**2. What breaks or gets simpler**
- **It gets simpler.** The iOS blend file is deleted, and with it:
  - `ThemeMode` and `themeMode`;
  - `BlendTokenValues`;
  - the provider;
  - the `Color` and `View` extensions;
  - the 10 pinned `darkerBlend` errors (VERIFIED).
- **The `@_spi` question disappears**, and the new public surface is generated theme members that the API diff already reads.
- **No adopter breaks**, because the file has never compiled (VERIFIED).
- **Seven iOS component files call the blend helpers** (VERIFIED by grep), not only the chips.

**3. Size (estimate, low confidence)**: about 1.5–2.5 iOS sessions, for the 7 files, the forced-state fixture and D5's pressed sampling. Ada's generator and token work is not included.

**4. Counter-argument I could not fold away**: runtime blending goes away. An adopter's own component on an arbitrary brand colour gets no pressed colour unless it declares a state token. "Build more" becomes harder.

#### [DATA R9]

**1. The proper fix on Android: no blending while the app runs.**
- **Where the colours come from.** Each pressed or hover colour becomes a theme-varying semantic token, computed at build time by the pipeline, in whichever colour space 133 picks. It is emitted on `DesignerPunkTheme` like every other colour. Each theme computes its own value, so `BaseDark` can lighten where its contract says lighten.
- **How Compose applies them.**
  - `val pressed by interactionSource.collectIsPressedAsState()`, and the same for hover.
  - Then `background(if (pressed) theme.<x>_pressed else theme.<x>)`, optionally through `animateColorAsState` with a motion token.
  - `indication = null`, or our own `IndicationNodeFactory`, so Material's ripple doesn't add a second state layer on top.
- **Dark mode.** The `<Name>Theme` provider picks the instance. That is the only dark-mode switch.
- **P3 and sRGB.** Each state colour is emitted as Display P3, like the rest of the colour tokens, so nothing converts colour spaces while the app runs. Whether today's emitted values are read correctly on a device is UNVERIFIED.
- **How a test proves it.**
  - A JVM test checks that each theme's rest and pressed pair falls inside the contract's ΔL range. The expected values are computed from token source, not from Kotlin.
  - An emulator test presses the component (`performTouchInput { down(center) }`) and samples `captureToImage()` against the token's value.
  - Each test has a known-bad case: pressed equal to rest must fail.

**2. What changes compared with today's blend file.** The hand-written Android blend file is deleted. That removes the second dark-mode switch, the package collision, the public `BlendTokenValues`, and the visibility question for 17.0.0. Removing it breaks nothing that works, because `pressedBlend` does not compile today (REASONING, from the brief). It adds tokens, and each one needs Peter's creation review.

**3. Size on Android: about 2–3 sessions for the first family**, plus about 0.2 per later component (estimate). The generator work is Ada's and is not counted here.

**4. The counter-argument I could not fold away.** Build-time tokens cover only colours we know at build time. An adopter's component with its own colour, or a colour chosen while the app runs, still needs either a runtime blend or its own state tokens. So the runtime helper does not disappear for D10.

#### [THURGOOD R13]

Read at `main` `35456bdbc` and 132 outline `88a7da010`.

**1. The vehicle**

All three run the full gates.
- **133, split into a blend unit**: the most expensive. 133 is a placeholder with no round, and a unit exists only once tasks declare it. All of 133's outline round runs now, deferring the rest explicitly.
- **A new, small spec**: one directory and outline, a priorities walk-log line, a pointer on 133's outline, and Ada re-ruling the blend/OKLCH charter record to it. Short rounds; it can ship the web fix in a 16.x, apart from 132.
- **A unit inside 132**: no extra rounds, but it reopens S-1 (no web work in 132, CLOSED) and ties a live web defect to 132's first family.
- **My pick is a new spec.** Choosing between that and the 132 unit is a fork for Peter.

**2. What it changes**
- **P-7's "blend API shape" condition** becomes the state-token names plus the ΔL test; D9 already covers generated tokens (T-10), and Ada's decision record becomes the new spec's design. It was ruled, so the change is Peter's.
- **Priorities**: the new spec runs alongside 132's requirements round, ahead of 131. A record, not law.
- **133**: keeps the deletion, rgba, shadows and enforcement.
- **The forecast column** gets smaller: blend drops out of it, and the blend repair leaves 132's shared-costs row.

**3. Order**
- The new spec's outline, including Peter's token-creation review → its requirements, design and tasks → its token units, which merge before 132's first family reaches D5.
- 132's requirements round can run in parallel if it names the state tokens as an input.
- 132's design waits only on the new spec's token names.

**4. Counter-argument I could not fold away**

Build time cannot know a colour chosen while the app runs, such as Icon-Base's hex prop or an adopter's brand colour (Ada, Kenya, Data). One runtime function per platform survives, so "delete the native blend files" overstates it.

#### [LINA R7]

This is an investigation only. Nothing in the repo was edited, committed or pushed: `git status --porcelain` on Peter's checkout prints 0 lines. Read at `main` `35456bdbc`. The scripts are in `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/2b12756f-4507-4804-a670-8900c65ec7d2/scratchpad/web-blend-lina/`:
- `__tests__/web-blend-repro.test.ts`, run with `jest.scratch.config.js`. All 8 tests pass.
- `delta.js`, for the ΔL figures.

**1. Root cause, confirmed (VERIFIED, reproduced)**

**Where the value comes from.** Since Spec 112 (`71120a5d9`, v12.0.0, 2026-06-10), the web generator writes colours as `oklch(l c h)` (`src/providers/WebFormatGenerator.ts` L602–604). Before that commit the source values were `rgba(…)`, which the parser handled. The surface token is `--color-structure-surface: oklch(0.95 0.006 260)` (`dist/DesignTokens.web.css` L563). Canvas is `light-dark(oklch(1 0 260), oklch(0.42 0.018 260))` (L562).

**Where it fails.**
1. Chip-Base reads the token as raw text (`ChipBase.web.ts` L183) and passes it to `hoverColor`/`pressedColor` (L190–191).
2. Those call `darkerBlend`, which calls `hexToRgb` (`ThemeAwareBlendUtilities.web.ts` L150–152).
3. `hexToRgb` accepts only `rgb(a)` or hex. For anything else it throws `Invalid hex color` (`ColorSpaceUtils.ts` L141–151).
4. `darkerBlend` catches the error and **returns the input unchanged** (L153–157).

**The repro.**
- In a real `chip-base` element in jsdom, both `--_chip-pressed-bg` and `--_chip-hover-bg` come out as `oklch(0.95 0.006 260)`, exactly the rest surface.
- All six token inputs that the components use come back unchanged from hover, pressed, focus and icon.
- A hex control (`#EDEEF1`) does blend, to `#D1D1D4`.
- Nothing warns in a browser: the parse error is swallowed silently.

**2. Blast radius (VERIFIED by grep; every one is served web `production-ready`)**

13 web components import `getBlendUtilities`. 12 of them feed it `oklch()` or `light-dark()` text:

| Component | Input | What shows today |
|---|---|---|
| Chip-Base, Chip-Filter, Chip-Input | surface | No background change on hover or press. Only the border changes to primary |
| Button-CTA | action.primary, contrast.on-action | No hover or pressed background change, and no icon optical balance |
| Button-Icon | action.primary | Primary: no background change. Secondary and tertiary: the hover/pressed border and text keep the rest colour |
| Button-VerticalList-Item | canvas (`light-dark`) | No hover or pressed background change |
| Container-Base, Container-Card-Base | surface, surface.primary, canvas | No hover or pressed change when interactive |
| Input-Checkbox-Base, Input-Radio-Base | select.border.default | The hover border equals the default border |
| Input-Text-Base | action.primary | The focus colour is not saturated. That is minor: the focus border is still visible |
| Input-Text-Password | canvas | No hover on the toggle |

- **Inherited through these**: Input-Checkbox-Legal, Input-Text-Email, Input-Text-PhoneNumber, Input-Radio-Set and Button-VerticalList-Set.
- **Not affected**: Icon-Base's own optical balance blends only hex input (`IconBase.web.ts` L190), and that case works. No component outside the 13 uses this path.
- **The contracts promise more than this path could deliver.** Button-CTA, Button-Icon, Button-VerticalList-Item, Container-*, Input-Checkbox-Base, Chip-Base and Icon-Base all state OKLCH ΔL ranges. Several also state a "surface-aware direction", meaning the colour lightens on dark surfaces.
- **Not this path, but adjacent**: Chip-Filter's selected chip shows the same background on hover and press as at rest (`ChipFilter.styles.css` L44–57).

**3. Fix options**

All three use existing tokens only. `--blend-hover-darker` and `--blend-pressed-darker` are already emitted (`dist/DesignTokens.web.css` L803–805).

**A. Parse `oklch()` and `light-dark()` in the helper.** Convert to sRGB, then run the existing RGB maths.
- **Size**: about 1 session for Ada, plus about 0.5 for my component tests.
- **Touches**: `src/blend` (Ada's).
- **Browsers**: no new requirement.
- **Public export**: `hexToRgb` is exported from `@3fn/core/blend`. A accepts more input than before, which is additive, so 16.x stays releasable.
- **Later redo**: if 133 picks OKLCH, the maths is redone. It matches native's algorithm, so it doesn't conflict with how 132 settles the API shape.
- **Leaves behind**: JS still parses CSS text, which is the class of failure that just happened. Colours are still computed once, so a live switch to dark mode leaves them stale (that was already true).

**B. Use the existing, unwired `OklchBlendCalculator`** (`src/blend/OklchBlendCalculator.ts`). It is surface-aware and meets the contract ranges by construction.
- **Size**: 2–4 sessions, led by Ada. It needs an API decision, because the helper today receives no surface colour.
- **Touches**: `src/blend`.
- **Public export**: the exported `hoverColor`/`pressedColor` would change their output.
- **Later redo**: this **decides 133's OKLCH question for web ahead of 133**, and splits web's maths from native's.

**C. Blend in CSS.** For example `--_chip-pressed-bg: color-mix(in srgb, var(--color-structure-surface), black calc(var(--blend-pressed-darker) * 100%))`, with the JS colour calculation removed from the components.
- **Size**: 2–3 sessions.
- **Touches**: my 12 components only.
- **Public export**: no change.
- **Theme changes**: it follows theme and dark-mode switches live.
- **Maths**: the same as A and the same as native.
- **Later redo**: if 133 picks OKLCH, the change is the `in srgb` keyword in each rule.
- **Browsers**: `color-mix()` already ships in Avatar (`Avatar.styles.css` L291). The token CSS already requires `light-dark()` (11 uses, VERIFIED), whose browser floor is above `color-mix()`'s, so C adds no new requirement. Those browser floors are UNVERIFIED; I am stating them from memory.

**A and C do not fully meet the contracts' ranges** (`delta.js`):
- **Out of range**:
  - hover on surface −0.058 and on light canvas −0.060, against 0.02–0.05;
  - pressed on dark canvas −0.034, which also darkens where the contracts say "surface-aware";
  - pressed on wcag primary −0.045.
- **In range**: chip pressed −0.088, the base primary at −0.046 hover and −0.069 pressed, and the select border.

**4. Why no test caught it (VERIFIED)**
- **The helper tests use only hex.** They also assert that an invalid input is returned unchanged, as if that were the intended behaviour (`ThemeAwareBlendUtilities.test.ts` L186–190).
- **The component tests never load the token CSS.** The resulting warning is silenced as "environmental" (`ChipBase.test.ts` L43–53).
- **`InteractionStateAudit.test.ts` names these components** in its header, but it tests `OklchBlendCalculator`, which none of them uses. That is false assurance, and it belongs to Thurgood (and Stacy, for the claim).
- **The blend record is wrong.** Its line "interaction states still render correctly" is false (`.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md` L65). That record is Ada's.

**Tests that would catch it.**
- A jsdom test that takes the colour strings `WebFormatGenerator` actually emits, feeds them through each component, and asserts the hover and pressed values differ from rest, with ΔL inside the contract range. It would fail today. This works for A and C, but under C, jsdom cannot evaluate `color-mix()`, so the test would compute the mix itself.
- A real-browser ΔL check is the only true render proof. The repo has no browser tooling, so that is new infrastructure (Thurgood, Sparky, and a grant).

**5. Recommendation: fix first, leave the text unchanged.** I lean C. A is the fork, and the pick is Peter's.
- **Size**: about 3 sessions including tests. The quick route is A, at 1–1.5 sessions.
- **Why fixing first**: correcting the served text first means editing 13 production-ready components' served text now, then editing it again after the fix. That is the stream of messages Peter wants to avoid.
- **Counter-argument I could not fold away**: neither quick fix makes the served contract text true. Hover runs about 0.01 past its range on light surfaces, and dark surfaces darken where the contracts promise surface-aware lightening. "Text unchanged" therefore knowingly leaves those ranges unmet until 133, unless we take B, which decides 133's question early in Ada's surface.

**Consulted**: Ada — owed, if A or B is chosen. C does not touch `src/blend`, but she should still read it, because it moves the web blend out of her helper.

#### [ADA R8]

**1. My pick: C.**
- **Why it beats A**: A has to pick a branch of `light-dark()` text in JS, and the computed value doesn't say which scheme applies. It also keeps the failure class: JS parsing CSS text once, stale after a theme switch.
- **Why it beats B**: B decides 133's OKLCH question early, and only for web.
- **Same maths**: `color-mix(in srgb, …, black 12%)` mixes in gamma-encoded sRGB, the same maths as the native generator's.
- **16.x stays releasable**: no export changes.
- **What 132's shape undoes**: nothing, because the shape is native.
- **What 133 undoes**: one keyword per rule, plus `light-dark()` if it adopts lightening on dark surfaces.
- **Size**: Lina's estimate, 2–3 sessions. Mine is about 0.

**2. Her ΔL figures are right.** They match my R6 run (−0.087 pressed, about −0.058 hover, on L 0.95). The ranges came from the orphaned OKLCH calculator, so they describe a design that was never delivered. Leave the wording for 133: changing it now means changing served text twice. Carry the misses as known-bad in her test and the new defect record, so the gap is written down.

**3. I correct my blend record.** It goes in a record-only PR opened alongside her fix, citing [LINA R7] and the new defect record. I re-read its Class too: its "render correctly, not P1" reason has fallen.

**4. Counter-argument I couldn't fold away.** C fixes our components, not the public `@3fn/core/blend` web export. An adopter who calls `getBlendUtilities` with our token text still gets the colour back unchanged, with no error. The fork: add A's `oklch()` parse (about 1 session), or deprecate the export toward 133.

#### [THURGOOD R14]

Read at `main` `35456bdbc` and 132 outline `88a7da010`.

**1. As stated: no. With both adjustments: yes.** What decides it is enforcement. "Complete 133" includes the slowest part, which saves adopters nothing (Ada R4) and arms better once native families settle (Lina).

**2. What it changes**
- **P-7 needs re-ruling.**
  - Item 1 stands, but its blend condition becomes the state tokens, which 133 delivers first.
  - Items 5 and 6 become moot: the re-decision, Ada's forecast, and that "Decisions this record reopens" row.
- **The vehicle**: R13's new small spec is superseded, and 133 carries the fix. Its whole outline round runs now.
- **131's park** still re-asks at the measured-cost record, so 131 now waits behind 133's token half as well. Keeping or re-placing it is Peter's call, on the record.
- **Priorities**: 129 → 133's token half → 132's first family → re-placement against 131 → 131 → 128 → 130, then 133's enforcement. A walk-log line.
- **What #880 still carries**:
  - Kenya and Data's close, with the real-app record;
  - the § 7 row for the 16.x rule;
  - 132's own park line, re-asking at the path of 133's token-half completion doc;
  - 133's `open` outcome line, which is mine to write.

  The P-7 (B) record drops out.

**3. Adjustment 2**: agreed. Enforcement becomes 133's last declared unit, with a cross-spec dependency on 132's first family. Cost: 133 stays open across 132.

**4. Order to 133's requirements** (estimate, low confidence)
1. Finish sitting 2.
2. Reshape 132's outline.
3. The close commit.
4. #880 merges.
5. 133's outline round: Step 0 over its seven records, R1, a cross-read, then Peter's approval.
6. 133's requirements.

That is about 3–5 of Peter's sittings.

**5. Counter-argument I could not fold away**: 132's outline rests on measurements that move: Kenya's iOS 26.0 spike, the `macos-15` 18.x image and the toolchain pins. Parked through 133, it needs a refresh pass, and some of tonight's answers get re-read.

#### [ADA R10]

**1. As stated: no.** The direction is sound, but "complete 133" includes enforcement. That holds 132 for months, gives adopters nothing, and arms better once native files settle.

**2. Units, in order** (all sizes are estimates):

| Unit | What it does | Sessions | Peter's sittings |
|---|---|---|---|
| 0. Outline round | Formalising 133 | 3–5 | 1–2 |
| U1. State tokens | A derived semantic kind; transitive theme-varying; web rewired, which ships the fix in a 16.x; native call sites; one generated runtime function per platform for caller colours; `./blend` deprecated; the dormant generator deleted | 13–17 (Ada 4–6, Lina 3–4, Kenya and Data 4–5, tests 2) | 2: the names, the rule, dark lightening |
| U2. `ColorTokens.ts` deletion and rgba cleanup | Deprecate in 16.x, delete in 17.0.0 | 6–10 | 1 |
| U3. Shadow channels | — | 2–3 | 1: token creation |
| U4. Enforcement | — | 10–18 | 2–3 |

U2 and U3 can run in parallel after U1.

**3. The handoff**
- **132 → 133**:
  - the native theme surface: theme members, access level, the fixed binding names;
  - T-14's family filter for state-token groups;
  - D9 reading the new members.
- **133 → 132**:
  - the state-token names and their per-theme emission, which replace P-7's "blend API shape";
  - the public name of the runtime function, for D10;
  - the blend files gone, so their pinned harness entries are dropped in 132's act;
  - the ΔL contract wording (Lina's).

**4. Adjustment 2: agree.** State tokens leave no literal to allow. One caution: until enforcement is armed, review 132's native code by hand for hard-coded colours.

**5. Counter-argument I couldn't fold away.** Even trimmed, the native goal waits 25–35 sessions behind colour work. U2 adds nothing adopters see before 132; it only buys "colour settled once, in 17.0.0". Whether that's worth the wait is Peter's fork: U2 before 132, or after.

#### [LINA R9]

**1. Gut-check: yes, sound, with one change.** What decides it for me: the proper fix (state colours as tokens, plus one colour space) is 133's blend half. If we do it first, the first family is built once, against final colours. Contracts are restated once, no blend aliases are needed, and adopters get one message. The change is to enforcement, below.

**2. Enforcement armed before any native family exists.** What it would cost:
- **Native detectors gate code that does not compile yet**: 45 iOS and 89 Android pinned entries. 132 then rewrites that code, family by family.
- **The false-positive policy gets set too early.** It would cover platform colours and previews (73 hits in 15 native files, unclassified) before 132's WP4 decides which previews stay. So it is decided twice.
- **Each family unit gets extra work**: it fights allowlists while it repairs.

What holds up:
- **Web armed in 133**: component CSS, `.web.ts` and demos.
- **Native detectors wired in 133 as report-only**: they report, they block nothing.
- **Native armed per family in 132**, in the unit where that family's compile reaches zero (T-14 (ii)).

That keeps enforcement inside 133, which Peter asked for. The register row has to say plainly that native is report-only until each family's unit.

**3. Component work**

**In 133:**
- **Contracts**: the ranges in OKLCH only, the dark-surface rule and Icon-Base's range. These are platform-neutral, so this is done once.
- **Web**: all 12 call sites rewired to the state tokens and tested against the real token CSS, including Chip-Filter's selected-and-pressed state.
- **Native**: all 9 call sites swapped mechanically to the theme's state tokens, with Chip-Filter's selected-and-pressed state on both platforms. The 129 harness proves the compile.
  - This deletes the blend repair and most of the hand-written blend API. P-7's "blend shape" condition then shrinks to Icon-Base's runtime function.

**Stays in 132:** native render and contract proof (D5, D6), access levels, and the remaining D3 repair per family.

**4. Counter-argument I could not fold away.** 133 chooses the native state colours with no native render proof; that proof is 132's D5. If D5 shows a problem on a device, for example in how P3 colours render, the tokens reopen after adopters were told colour is settled. Meanwhile the native goal waits through 133's round from zero, weeks to months.

#### [PETER] pivot

*Recorded by Thurgood, 2026-11-28. Peter's words, from the orchestrator's relay; each receipt time is the orchestrator's `date -u`.*

**The question that opened it**: Peter's "Re: 3" (received 2026-11-28T03:32:51Z, verbatim: "Re: 3, This feels like band-aiding the problem that could be spent properly fixing it. What's the proper fix?"). The seats answered with one proper fix (`[ADA R9]`, `[LINA R8]`, `[KENYA R9]`, `[DATA R9]`), and Thurgood priced its vehicle (`[THURGOOD R13]`). `[LINA R7]` and `[ADA R8]` are the web-blend investigation behind it.

**His proposal**:
- Received 2026-11-28T03:38, approximately (the turn before), verbatim: "I'm half tempted to pivot to 133 and following-up with 132. Honest thoughts?"
- Received 2026-11-28T03:40:05Z, verbatim: "My proposal is the settle 132's design outline with the understanding we'll complete 133 before proceeding with 132. Let's gut-check that with Thurgood, Ada and Lina first, please". The gut-checks: `[THURGOOD R14]`, `[ADA R10]`, `[LINA R9]`.

**What he was asked, as put to him after those three**:
1. Adopt the revised plan, in this order: (i) finish 132's outline: the remaining questions, the reshape, Kenya and Data's close commit, and #880's merge; (ii) 133's outline round; (iii) 133 U1, state colours as tokens (the proper blend fix), which also ships the web fix in a 16.x; (iv) 133 U2 (the `ColorTokens.ts` deletion and the rgba cleanup) and U3 (shadow channels); (v) then 132, built against final colours; (vi) 133's enforcement last, after 132's first family. Lina's web-first and native-per-family arming is detail for 133's outline round. He was also told what changes:
   - P-7 is re-ruled. 17.0.0 still carries 132's first family, and its blend condition becomes "133's state tokens". The (B) re-decision, Ada's forecast column and the "Decisions this record reopens" row drop out.
   - Thurgood R13's small spec is superseded, because 133 carries the fix.
   - The order becomes: 129 → 133's token half → 132's first family → re-placement → 131 → 128 → 130 → 133's enforcement.
   - #880 still carries the close commit, the real-app record, the § 7 "16.x stays releasable" row, and park lines pointing 132 at 133.
2. U2 before or after 132.
3. 131 stays where it is, re-asking at the measured-cost record, or not.
4. Ship Lina's CSS web fix now, as U1's first step, or wait.

**Received**: 2026-11-28T03:45:37Z. **Verbatim**: "Yes to 1, U2 before 132, keep 131. Re: 4, rejected. I don't think U1 will take "weeks" as projected."

**What is ruled**:
- Item 1, the plan, adopted. It trims his 03:40:05Z proposal: 133 is not completed before 132, because enforcement comes after 132's first family.
- The proper fix, state colours as derived semantic tokens computed at build time in OKLCH, adopted as 133 U1. Creating those tokens still needs his review at 133's token-review sitting, and so does dark-surface lightening.
- Item 2: U2 before 132. Item 3: keep 131 where it is.
- Item 4: rejected. The web fix waits for 133 U1. His reason is the verbatim sentence above; the "weeks" estimate was the orchestrator's, not a seat's.

#### [THURGOOD R15]

*2026-11-28. The ten files above are spliced byte for byte from `consults-2026-11-27/answers-132/`, in the orchestrator's order: `ada-blend-proper-fix.md`, `lina-blend-proper-fix.md`, `kenya-blend-proper-fix.md`, `data-blend-proper-fix.md`, `thurgood-blend-vehicle.md`, `lina-web-blend-investigation.md`, `ada-web-blend-fix.md`, `thurgood-pivot-133.md`, `ada-pivot-133.md`, `lina-pivot-133.md`. The order puts `[LINA R7]` after `[LINA R8]` and `[ADA R8]` after `[ADA R9]`; the stamps are the seats'.*

- Recorded the pivot as RULED. → design-outline.md § 3, § 4.4, § 5.1
- **Folded**:
  - § 3: the order, with (x′)'s text kept as what it replaces;
  - § 3: the measured-cost record's form loses its 133 forecast column and its "Decisions this record reopens" row;
  - § 4.4: "the native blend API's shape" becomes 133's state tokens;
  - § 5.1: P-7 is marked re-ruled, and the pivot is added with its owed acts.
- **Owed, none filed here** (each in design-outline.md § 5.1, "The pivot"):
  - the priorities walk-log line and § 7 row, and 133's `open` outcome line (mine);
  - 132's park line, re-asking at `path:.kiro/specs/133-color-track/completion/token-half-complete.md` (mine, in its own commit after the reshape and the close, because an outcome line changes no other line of the outline);
  - Lina's web pressed and hover defect record;
  - Ada's correction to the blend record;
  - `InteractionStateAudit.test.ts`'s false assurance (mine as test-governance owner; Stacy on the claim side).
- **Left for the reshape**: § 2 still books the blend repair as the first family's shared cost (the 4 pinned entries per platform, the measured-cost record's shared-costs row). Under U1 those blend files are deleted in 133, and their pinned entries are dropped in 132's act (Ada R10's handoff).

#### [LINA R10]

**No, (b) is not the practice today.** It is half-built: exclusions carry a reason, but nothing limits which reasons count or counts them. Read at `main` `35456bdbc`.

**1. How exclusions are recorded today**
- **Contract exclusions.** 25 `contracts.yaml` files have an `excludes:` block, 40 entries in all, for example `Chip-Filter/contracts.yaml` L73–76. Each entry has three fields: `reason`, `category` and `reference` (contract-system-reference § "Exclusion Fields").
- **Reasons are free text.** 15 are the same "does not support disabled states" sentence, 11 are "Badges are visual indicators…", and the rest are one-offs.
- **Platform removals.** `platforms:` is `[web]` on 19 contracts and `[web, ios, android]` on 214. A removal carries **no reason field at all**.
- There is no `not_applicable` field anywhere (grep).

**2. Is there a closed list, and does anything count it?**
- **No closed list.** The catalog and the reference define no reason classes, so Peter has approved nothing.
- **No checker counts anything.** The application MCP's parser copies `reason` as a string (`application-mcp-server/src/indexer/parsers.ts` L163–169) and the inheritance code merges the exclusions (`InheritanceResolver.ts` L59–79). Neither counts or rejects anything.

**3. What (b) still needs before 132's native contracts**
- The list of reason classes, grounded in a classification of the slice's 46 contracts per platform. It rides the per-platform contract-validation ballot (`.kiro/issues/2026-11-27-per-platform-contract-validation-ballot-owed.md`, which fires at 132's requirements).
- A `reason` (class plus text) on every platform removal, not only on exclusions.
- Re-classing the existing 40 exclusions and the 19 web-only contracts.
- A checker that rejects any reason outside the list and counts each class. That needs an owner (Thurgood, with me).

#### [PETER] P-4

*Recorded by Thurgood, 2026-11-28. Peter's words, from the orchestrator's relay; each receipt time is the orchestrator's `date -u`.*

- **What he was asked**: P-4 as in design-outline.md § 5.1: who may exclude a contract or remove a platform from it: (a) each one himself; (b) a closed list of reason classes, approved once, the checker counting each; (c) the team.
- **Received**: 2026-11-28T03:48:12Z. **Verbatim**: "(b) – I think that's even already the practice; but you'd have to confirm that with Lina".
- **Lina checked** (`[LINA R10]`, spliced above): (b) is not the practice today. Exclusions carry free-text reasons, 40 entries across 25 `contracts.yaml` files. The 19 web-only contracts carry no reason at all; the orchestrator verified the 19. There is no closed list, nothing Peter has approved, and no checker.
- **What he was then told (b) needs**: a reason-class list for him to approve once, which can ride the per-platform contract-validation ballot due at 132's requirements (#877's record); a reason on every platform removal; the 40 exclusions and the 19 web-only contracts re-sorted into those classes; a checker that rejects off-list reasons and counts each class, owned by Thurgood with Lina (Lina's suggestion). Asked: "Does your (b) stand on that basis?"
- **Received**: 2026-11-28T03:49:46Z. **Verbatim**: "Yes, (b) stands as new work; P-5 is (a)".

#### [PETER] P-5

*Recorded by Thurgood, 2026-11-28. Peter's words, from the orchestrator's relay; the receipt time is the orchestrator's `date -u`.*

- **What he was asked**: P-5 as in design-outline.md § 5.1: do adopter-built components meet the same bar: (a) same bar, available; (b) same bar, required for anything served as conformant (128's lane 3); (c) a lower bar ("builds").
- **What he was told survives**: until 128 lands, agents see adopter components beside ours with no evidence of the bar (Lina).
- **Received**: 2026-11-28T03:49:46Z, in the same message as his P-4 answer. **Verbatim**: "Yes, (b) stands as new work; P-5 is (a)".

#### [THURGOOD R16]

- `[LINA R10]` (`lina-p4-practice.md`) is spliced above, byte for byte.
- Recorded P-4 as RULED, (b) as new work, and P-5 as RULED, (a). → design-outline.md § 5.1
- **P-4's new work, carried as owed acts** (design-outline.md § 5.1, P-4): the reason-class list and the platform-removal reasons (Lina); its ballot vehicle, `.kiro/issues/2026-11-27-per-platform-contract-validation-ballot-owed.md` (#877; Lina); the re-sort of the 40 exclusions and 19 web-only contracts (Lina); the checker (Thurgood, with Lina). None is filed here.

#### [ADA R11]

**1. Was it designed or built? No, not at the token level.** It was claimed once at the component level. Read at `origin/main`.
- **The founding type spec** (`mathematical-token-system`): iOS font sizes are `baseValue × 1` pt (`design.md` L48). The stated reason is that points "automatically scale across different screen densities" (`completion/task-3-1-completion.md` L70). That is screen density, not the user's text size. Android got `sp`, which "respect user font size preferences" (L80, L96). iOS was assumed to scale like Android. It does not.
- **`typography-token-expansion`**: guidance only, no requirement (`compositional-color-guide.md` L494; `strategic-flexibility-guide.md` L289).
- **`governance/Token-Family-Typography.md`**: nothing (grep for dynamic, scale or sp is empty).
- **The generator**: `TypographyToken` carries a bare `fontSize`, with no text style (`iOSFormatGenerator.ts` L131–150).
- **The one claim**: Spec 005 (Button-CTA) required Dynamic Type (`requirements.md` L218). Task 4.5 "implemented" it with `.minimumScaleFactor(0.5)` and `.allowsTightening(true)` (`task-4-5-completion.md` L22–24, L98). Those only *shrink* text to fit, never grow it. Its own parent doc said "needs testing with actual iOS devices" (`task-4-parent-completion.md` L229). It was ticked anyway; probably what Peter remembers.

**2. Why today's output doesn't scale.** The decision was points 1:1, on the belief that points behave like `sp`. A `.system(size:)` or `Font.custom(size:)` call without `relativeTo:` is a fixed size.

**3. Effect on P-13.** The mechanism is unchanged, and the history strengthens the case for it. Two additions:
- Spec 005's claim goes to Stacy as a false completion claim.
- When P-13 lands, Token-Family-Typography gains a scale-role section, by ballot.

#### [ADA R12]

**1. Your read is confirmed. There is no bold text token at 16 or 18pt.**
- **Semantic**: the application MCP's `search_tokens(family: typography)` lists all 24 typography semantics. At 16pt (`fontSize100`) and 18pt (`fontSize125`) the heaviest weight is 500 (`labelMd`/`labelLg`, `buttonMd`/`buttonLg`). Bold starts at `h6`, which is 20pt.
- **Component**: component tokens are numeric only, so there are none.
- **Product**: this repo has no `product/` directory.
- **Other**: `fontWeight600` and `fontWeight700` appear only in `FontWeightTokens.ts` L96 and L109.

**2. Peter probably means the weight primitives.** They exist, and they are exactly my T2: `labelLg`/`labelMd`, which supply size, line height and scale role, plus `fontWeight700`. That uses step 3 of the selection matrix, a primitive with prior context, because the contract names it (`Nav-SegmentedChoice-Base/contracts.yaml` L80–82, L89). It creates no new token. The heading styles don't fit: they use the display family, and the closest one is 20pt.

#### [LINA R11]

Read at `main` `35456bdbc`; all of this is VERIFIED by grep.

1. **No, there is no bold token at 16 or 18pt, and nothing renders bold there through a token.**
   - The bold typography semantics are `h1`, `h2`, `h6` and `display`, at 700, and their smallest size is `h6` at 20 (`fontSize150`) (`src/tokens/semantic/TypographyTokens.ts` L84, L98, L154, L197).
   - Outside Nav-SegmentedChoice, the only other bold in components is preview code (`VerticalListButtonItem.android.kt` L520).
2. **How Nav-SegmentedChoice gets its bold today**:
   - Web uses the primitive `var(--font-weight-700)` (`NavSegmentedChoiceBase.styles.css` L96).
   - Android hard-codes `FontWeight.Bold` (`.android.kt` L367).
   - iOS declares `fontWeight700` (L34) but renders a literal `.bold` (L246).
3. **My lean is unchanged: T1, two new structural tokens.** Peter's memory is close but not exact: the bold tokens are headings, and they sit at 20pt and up. T1 also removes those two hard-coded native weights.

#### [ADA R13]

**1. I recommend T1, and I'm changing my earlier T2 lean.** The deciding reason is that the bold is part of the control's resting look, which its contract fixes on all three platforms. It is not emphasis inside a sentence.
- **Decision 3** (`typography-token-expansion/design.md` L446–480): Lina reads it correctly. It rules on inline emphasis and rejects weight-modifier tokens (option 3). It names "use fontWeight700 directly" as the risk.
- **T2 builds that risk into `.dpFont`**, and `.dpFont` is adopters' API too. That is the drift. You told Peter T2 also removes today's hard-codes: that is right, but only by swapping each one for a primitive, read separately on each platform.
- **Leonardo's "never T1"** treats these as emphasis tokens. They are structural, like `buttonLg`, and `h6` already shows that a structural style can be bold.

**2. Names, for Peter's review.**
- **`typography.segmentLg`**: `fontSize125` (18), `lineHeight125`, `fontFamilyBody`, `fontWeight700`, `letterSpacing100`, role `bodyLarge` (`.body`).
- **`typography.segmentMd`**: the same at `fontSize100` (16), `lineHeight100`, role `body` (`.callout`).
- **Why these names**: they name the job, as `button*` and `input` do.
- **Rejected names**:
  - `labelLgStrong` is option 1 of Decision 3, the emphasis pattern.
  - `tabLg` points at a tab bar that has no text.
- **Future bold at label size**: a new job-named style, by creation review, and only where a contract fixes the weight on every platform. Inline emphasis stays a platform modifier.

**3. T2 is not taken.** For the record, it would have been `.dpFont(_, weight:)`, allowed only where a contract names the weight, and checked by nothing until enforcement exists.
- **Kenya's check**: neither option avoids it. `.dpFont` must already render weights 500 and 700 from a custom family (`labelMd`, `h6`), so the "`.fontWeight` with `Font.custom`" answer is owed regardless.

**4. The counter-argument I couldn't fold away.** Two tokens have one consumer. If no second control ever takes them, they are component styles under a semantic name. Component tokens cannot hold typography today, so there is no smaller home for them.

#### [LEONARDO R12]

Read: `[ADA R13]`, `[LINA R11]`, and my § 4 above.

**1. Final position: (T1), with `typography.segmentLg` and `typography.segmentMd`.** I withdraw "never T1".

**2. Can I live with Ada's (T1)? Yes.** My own § 4 fact decides it: the bold is on every segment, and a separate indicator marks the active one (VERIFIED, `contracts.yaml`). So the bold is the control's resting style, which makes it structural, not emphasis, as Ada says. T1 also keeps weight out of `.dpFont`, the adopters' API, which was my drift concern about T2 to begin with.

**3. One change, to her "future needs" rule.** Add a served usage line to the typography guidance: "`segment*` are for the labels of segmented selection controls only. They are not a general bold 16/18pt style." Without that line, an adopter's agent searching for "bold 16" will find `segmentMd` and use it for emphasis. That is Decision 3's drift, entering by token selection instead of by API.

I would change nothing in her names or definitions.

#### [PETER] P-13

*Recorded by Thurgood, 2026-11-28. Peter's words, from the orchestrator's relay; each receipt time is the orchestrator's `date -u`, and three messages carry no stamp, as marked.*

**Part 1, the approach.**
- **What he was asked**: every typography semantic gets a size-band scale role, per Ada's § 1 table: fine, compact, body, bodyLarge, headingSm, headingMd, headingLg, display (a band, not a job name); the 18 call-site moves in Ada's § 2; six iOS helper, error and "Required" texts move to caption and get lighter, to match web; layout repair per family. The conditions: Leonardo checks the set on the patterns screen at AX5, before the first claim; Android's matching small-text fix lands in the same unit (Lina); a role-less typography token defaults to the nearest-size rule (Leonardo).
- **His history question first**, received 2026-11-28 in the turn before 03:57:33Z, with no stamp taken, verbatim: "I thought we addressed text resizing for iOS long ago. Ada would know better, but I thought this was considered in the spec when building the type tokens." Ada R11 (spliced above): it was never designed at token level. Spec 005 claimed Dynamic Type but implemented only shrink-to-fit. The orchestrator verified Spec 005's `requirements.md` L218 and `task-4-5-completion.md` L22.
- **Received**: 2026-11-28T03:57:33Z. **Verbatim**: "Approve part 1".

**Part 2, the heading fork.**
- **What he was asked**: (H1), Apple-faithful, with two 2pt inversions at AX5 (h4 52 < h5 54; h2 56 < h3 58); or (H2), strict order, with display at about 99pt. Leonardo's condition: a served usage line saying h4/h5 and h2/h3 may swap at the largest sizes, so hierarchy must not rely on size alone.
- **Received**: 2026-11-28T03:59:04Z. **Verbatim**: "(H1) with Leonardo's note".

**Part 3, Nav-SegmentedChoice's bold labels.**
- Received between 03:59:04Z and 04:09:57Z, with no stamp taken, verbatim: "You might want to check with Ada (and possibly Lina), but I think we have bold tokens". Ada R12 and Lina R11 (spliced above): no bold text style exists at 16 or 18pt.
- Received in the same window, with no stamp taken, verbatim: "I'm thinking (T1) or (T2), but I'd want to settling the decision, and any necessary follow-up details (including naming), with Ada." This takes (T3) off the table: bold stays.
- Received 2026-11-28T04:09:57Z, verbatim: "Now — put my questions to Ada". Ada R13 (spliced above) moves to T1.
- Received 2026-11-28T04:17:56Z, verbatim: "Get Leonardo's response to Ada first". Leonardo R12 (spliced above) withdraws "never T1" and adds a served usage line.
- **What he approved, as put to him**:
  - `typography.segmentLg`: fontSize125, lineHeight125, fontFamilyBody, fontWeight700, letterSpacing100; role bodyLarge;
  - `typography.segmentMd`: fontSize100, lineHeight100, fontFamilyBody, fontWeight700, letterSpacing100; role body;
  - Leonardo's served line, verbatim: "`segment*` are for the labels of segmented selection controls only, not a general bold 16/18pt style.";
  - Ada's future-needs rule: bold at label size gets a new job-named style through creation review, only where a contract fixes the weight on every platform; bold inside text stays a platform modifier.
- **Received**: 2026-11-28T04:18:53Z. **Verbatim**: "Approve (T1) with these names and Leonardo's usage line".
- **This is his token-creation review for these two names.** Ada creates them in 132's typography work; none is created now. What survives: one consumer each (Ada R13).

#### [THURGOOD R17]

- **Spliced byte for byte**, in the orchestrator's order: `ada-dynamic-type-history.md` (`[ADA R11]`), `ada-bold-tokens.md` (`[ADA R12]`), `lina-bold-tokens.md` (`[LINA R11]`), `ada-t1-t2-settle.md` (`[ADA R13]`), and the new `[LEONARDO R12]` section only, from `leonardo-p13-read.md`, its lines 64 to the end. That file's earlier part is unchanged: its first 10,169 bytes equal the `[LEONARDO R5]` span spliced at `606bb6cb1`, byte for byte.
- Recorded P-13 as RULED, in three parts: part 1, the size-band approach with its conditions; part 2, (H1) with Leonardo's note; part 3, (T1) with `typography.segmentLg` and `typography.segmentMd` and Leonardo's usage line, as Peter's token-creation review for those two names. → design-outline.md § 5.1, and T-12 in § 5.2
- In P-13's question, the stale role example "(body, label, caption, title, …)" is replaced by the ruled size bands. P-13's other question text, options and leans are kept as asked.
- **Owed, none filed here** (design-outline.md § 5.1, P-13):
  - Kenya: `.fontWeight` with `Font.custom`;
  - Leonardo: the AX5 check, the H1 swap line, the `segment*` line;
  - Ada: the `typography.label` record at `src/tokens/semantic/index.ts` L569, and the Token-Family-Typography scale-role ballot after P-13 lands;
  - Lina: the rule-10 record for Android Nav-SegmentedChoice's fixed-`dp` height;
  - Stacy: Spec 005's Dynamic Type claim, as a false-claim finding.
- **Left for the reshape**: P-13's question still says "Ada lists them before this sitting". Her list is in `[ADA R3]`.

#### [LINA R12]

**1. My decision as owner: (A), one field. This reverses my R3.**
- **The pivot decides it.** With 133 first, the caret and selection fix (#885) can ride 133's state-colour unit. In that unit the selection highlight becomes one more state colour, on all three platforms, before any 132 render lane exists.
- **What (B) was for.** Its one real job was to tell an adopter's agent which pixels the theme doesn't reach. Once #885 lands, there are none.
- **What is left.** A list field with no entries. The render tests also stop needing a region to skip, because the text field's colours become ours.

**2. Leonardo's strongest point, and my answer.** His point: fixing the gap is better for adopters than describing it. I take it in full. I fix the gap rather than describe it.

**3. The shape I'd ship**, per platform (web, iOS, Android):
```yaml
rendering:
  ios:
    kind: drawn        # drawn | platform
    reason: "Drawn container around the system text field; the system draws text, caret and selection in the theme's colours."
```
Two conditions:
- Until #885 merges, the iOS reason says plainly that the caret and selection follow the app's tint.
- When a second component wraps a system control, structure is revisited (Leonardo's trigger).

**4. The over-claiming guard.** The risk is a component claiming "the system draws it" to escape a colour check.
- I make the schema validator reject a missing reason.
- The render lanes sample every `drawn` component whole, with no skipped regions. Those lanes are Kenya's and Data's.
- Stacy reads every `platform` value and every reason at the claims pass.

**5. Counter-argument I couldn't fold away.** Everything above rests on iOS `.tint` reaching the text selection as well as the caret, and that is UNVERIFIED until Kenya checks it. If it doesn't, iOS keeps a part our theme can't reach, and (B) was right. The fork then reopens before Input-Text-Base's family claims.

#### [PETER] P-16

*Recorded by Thurgood, 2026-11-28. Peter's words, from the orchestrator's relay; each receipt time is the orchestrator's `date -u`.*

- **What he was asked**: options (A), (B) and (C) as in design-outline.md § 5.1. The orchestrator recommended (C), Lina deciding as schema owner with Leonardo's counter recorded. What survives, as he was told: against (A), prose is not machine-read; against (B), a field with one use, whose guard is a read and not a test.
- **Received**: 2026-11-28T04:24:26Z. **Verbatim**: "I'm leaning (C), but I'd like to review the decision with Lina before committing to it fully."
- **Lina's review** (`[LINA R12]`, spliced above): she picks (A), reversing her R3, because the pivot lets #885's caret and selection fix ride 133 U1 before 132's render lanes. The shape she would ship is per platform, `rendering: { kind: drawn | platform, reason }`. Until #885 merges, the iOS reason for Input-Text-Base says the caret and selection follow the app's tint. Structure is revisited if a second component wraps a system control (Leonardo's trigger). Her guards: the schema validator rejects a missing reason (Lina); Kenya's and Data's render lanes check every `drawn` component whole, with no skipped regions; Stacy reads every `platform` value and its reason at the claims pass. What survives: whether SwiftUI `.tint` colours the text selection as well as the caret is UNVERIFIED until Kenya checks it; if it does not, (B) was right, and the choice reopens before Input-Text-Base's family is claimed.
- **Received**: 2026-11-28T04:39:39Z. **Verbatim**: "Confirm (C), with Lina's (A) and the guards".

#### [THURGOOD R18]

- `[LINA R12]` (`lina-p16-review.md`) is spliced above, byte for byte.
- Recorded P-16 as RULED: (C), with Lina's (A) and the guards. T-1 is CLOSED. → design-outline.md § 5.1, § 5.2
- **Owed, none filed here** (design-outline.md § 5.1, P-16): the `.tint` selection check (Kenya); moving #885 into 133 U1, for 133's outline round (Ada and Lina); the schema validator change (Lina).
- **Receipt time**: the orchestrator's brief first gave a placeholder for Peter's confirmation, then corrected it to 2026-11-28T04:39:39Z, the `date -u` stamp taken on receipt. That time is used here and in the outline.
- **Left for the reshape**: T-1's fact "the component needs one new identifier on the field under either shape" was written for (B)'s part exclusion. Under (A), with render lanes that skip no region, Lina should say whether the identifier is still owed.

#### [PETER] P-14

*Recorded by Thurgood, 2026-11-28. Peter's words, from the orchestrator's relay; the receipt time is the orchestrator's `date -u`.*

- **What he was asked**: (a) a web render lane in 132; (b) a Sparky-owned record placed later, alongside 128, with 132 keeping the contract-validation format keyed by platform; (c) none.
- **What he was told survives**: he may read his goal as covering web now, and until 128 web's "renders" claim stays weaker than native's.
- **Received**: 2026-11-28T04:40:39Z. **Verbatim**: "(b)".

#### [THURGOOD R19]

- Recorded P-14 as RULED, (b). → design-outline.md § 5.1
- **Owed, none filed here**: Sparky's record, filed by Sparky under rule 10, with its trigger alongside 128; the platform-keyed format, already carried in T-13 and in #877's per-platform contract-validation record.
- **Sitting 2 is complete**: P-1, P-2, P-7 (re-ruled by the pivot), P-3, P-4, P-5, P-13, P-16 and P-14, plus the pivot and the D4 shape. The one reshape follows, in its own commit (Peter, 2026-11-28T02:08:13Z: "(1) — let's answer now and reshape after").

#### [THURGOOD R20]

*2026-11-28. The one reshape, on Peter's order (2026-11-28T02:08:13Z, verbatim: "(1) — let's answer now and reshape after"), along the lines of Thurgood's read-only consult on the outline's shape. design-outline.md goes from 914 lines and 15,660 words at `e167dba9c` to 401 lines and about 8,300 words. It now holds what agents need to plan 132 when it resumes after 133's token half: Peter's rulings as one line each, with their effect and a pointer to the `[PETER]` entries; the open team items, about two lines each; one list of record paths; and the Spec outcome line, unchanged at column 0.*

**The rule applied: move, never delete.** Every block that left the outline is below, word for word (under "Moved blocks"), or in the PR-body list handed to the orchestrator. The one change in the moved text: headings inside it are set to `######`, so they sit under this entry. A script checked that every non-blank line of the outline at `e167dba9c` is either still in the outline or in one of those two places: none is missing.

**Move ledger** (source lines are design-outline.md at `e167dba9c`):

| # | Source | Destination |
|---|---|---|
| 1 | Header L3–L8 and "About this outline" L12–L26 (the Status and Read-at lines, "What R3 holds", the ledgers line, "What is decided", and the Owners lines for Ada and Sparky as they stood) | this entry, "From the header and About this outline". The Round cost line (L8) also goes to the PR body |
| 2 | § 0 L30–L66, "The outline in one screen (for Peter)" | this entry, "From § 0". Its ruling lines are in each `[PETER]` entry |
| 3 | § 1 L83–L120: the definition-of-done paragraph, the D-row list as it stood, the RULED TEXT preface, "Differences carried" and "Not carried" | this entry, "From § 1". The outline's § 1 points at it for the seat wording not carried, an input for the requirements round |
| 4 | § 2 L138 (D3), L160 (D9), L176 (the blend-repair bullet), L188 (Web) | this entry, "From § 2" |
| 5 | § 3 L206 (sessions row), L214 (shared-costs row), L223–L228 (132's size against 131's) | this entry, "From § 3" |
| 6 | § 4.2 L259–L301: the E2 note, the disposition table with each Trigger at `017514064`, the firing list, the citation notes | this entry, "From § 4.2". The disposition lines belong in the requirements round's Context for Reviewers (Process-Spec-Planning § "Before Formalizing"), which re-runs the grep; until then they live here |
| 7 | § 4.3 L303–L333, "Obligations that live only in inbounds" | this entry, "From § 4.3". The outline's § 4.3 now points at the record that holds each obligation |
| 8 | § 4.4 L338 (the state-token line's last sentence), L340 (the Core Goals line) | this entry, "From § 4.4" |
| 9 | § 5.1 L351–L601: "Answered so far", "Sitting 2, in decision order" with every question block as asked, "Only if they arise", "Later", "Not re-asked here", "Held elsewhere" | this entry, "From § 5.1". The asks and answers are also in each `[PETER]` entry, and the outline's § 5.1 holds one line per ruling plus "Owed acts, by owner" |
| 10 | § 5.2 L603–L784, T-1 to T-21 in full | this entry, "From § 5.2". The rationale for the closed items is also in `[THURGOOD R3]` |
| 11 | § 5.3 L786–L795 | this entry, "From § 5.3" |
| 12 | § 6 L799–L827, the probes in full | this entry, "From § 6". Data's run is also in the goal record's § "Android render probe result (2026-11-27, Data)" on `main`, and the `compileSdk` finding in `.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md`. Kenya's findings are also in her spike README on #879, which is unmerged |
| 13 | § 7 L835 (the carrying paragraph's last sentences) | this entry, "From § 7" |
| 14 | § 7 L837–L851, the merge preconditions and "What does not change at this merge" | the PR-body list |
| 15 | § 8 L855–L889, the round cost | the PR-body list |
| 16 | § 9 L893–L910, the fold-back | this entry, "From § 9". The outline keeps the survivors that bear on 132, and adds R14's counter |

**Blocks with no destination**: none.

**What the reshape folded, not only moved** (each from a ruling or record already in this doc):
- the Status and § 0: 132 is settled and parked behind 133's token half, per the pivot. The "Native status" text is unchanged;
- § 2 and § 3: the blend repair is 133 U1's under the pivot, and 132 drops its pinned entries (Ada R10, Lina R9);
- § 4.3: each obligation is a pointer to the record that holds it. Where none holds it but the goal record, which closes in this PR, it is listed as owed: Kenya for Swift 6 language mode and the pre-claim wording window; Ada for Q12, Q13, the type table, the `.kt` package check, the manifest's three conditions and the aliases. **Ada is to confirm her items before the close commit**;
- § 5.1: one consolidated "Owed acts, by owner" list, gathered from every ruling's owed acts, the citation notes, the old "Owed before 132's requirements" list and R11's open points.

**For the close commit (Kenya, Data)**: the goal record's outcome line names where each remaining item now lives. After this reshape those homes are the records listed in design-outline.md § 4.3 and § 4.2, the owed records in § 5.1 "Owed acts", and the access-pass list in § 2. The outline's § 4.3 and § 6 are no longer homes in their own right.

**Next, in this order, none in this commit**:
1. the seats whose content moved confirm that nothing they act on is lost (the orchestrator's round);
2. Kenya's and Data's close commit, with the real-app record;
3. 132's park line, `**Spec outcome (2026-11-28, Thurgood)**: park — re-ask: path:.kiro/specs/133-color-track/completion/token-half-complete.md`, in its own commit;
4. 133's `open` outcome line, in 133's outline (Thurgood, 133's author);
5. the priorities record's walk-log line for the pivot's order, and its § 7 row for the 16.x rule (Thurgood, its steward).

**Moved blocks** (design-outline.md at `e167dba9c`, word for word; headings set to `######`):

##### From the header and "About this outline"

*(L3–L26)*

**Date**: 2026-11-27 (replaces the 2026-11-07 placeholder from #723, whose text is at `a953ac70d`)
**Spec**: 132-native-components-in-app
**Author**: Thurgood (spec formalization), briefed by the orchestrator
**Status**: **R3 DRAFT — ready for Peter's sitting-2 batch (§ 5.1, "Sitting 2, in decision order"). P-6 is RULED (2026-11-27T18:32:45Z, "(B), raise to iOS 18").**
**Read at**: `origin/main` `8553499b1` for the facts in `evidence/`, and `017514064` for record states.
**Round cost (estimate, for the orchestrator to surface)**: **about 20–23 sessions and 3–4 of Peter's sittings**, low confidence; about 17.5 are spent. The breakdown is § 8.

**Labels** (as in plan-r2): **VERIFIED (who)**: the named seat ran or read it. **REASONING**: inference. **UNVERIFIED**: nobody has checked it.

###### About this outline

- **What R3 holds**: the seeded outline (plan-r2 § 6 item 8), with R1, the R2 cross-read and two T-1 R3 entries folded in.
- The ledgers are `feedback/design-outline.md` § "[THURGOOD R2]", § "[THURGOOD R3]" and § "[PETER] P-6".
- **What is decided**: Nothing here is decided except what is marked **RULED** with Peter's words, or **CLOSED** with the owning seats named. Every question still open has options and no pick. Nothing is built, scaffolded or created by this file.
- **Facts**: `evidence/facts-at-8553499b1.md`, the unedited stdout of `spec-facts.sh 132 b89163c41 8553499b1` (the window starts at the plan of record's commit).
- **Pointer-shaped on purpose**: facts that go stale (error counts, entry counts, sizes, what has shipped) are cited from their records or labelled with the SHA they were read at. They are not copied as current.
- **Owners (by domain)**:
  - Kenya (iOS: packaging, the D4 app, the render lane, the iOS minimum's evidence) and Data (Android: the same, the toolchain range, the API-26 floor test);
  - Lina (component content, the public-API pass, the contract tests, the access-level and contract-validation ballots, the `rendering:` schema);
  - Ada (`generate`, which owns our module's manifest; deprecated aliases; the token-emitter preconditions in § 4.1; the release script, for D7);
  - Leonardo (the fixture app's content, the adopter journey, the walkthrough, the code samples);
  - Sparky (web, for § 5.3);
  - Thurgood (formalization, the D6 checker, the measured-cost record's form, RELEASE-FLOW's step text);
  - Stacy (the claims passes, the LENS read at the tasks round, the CLOSEOUT read).

##### From § 0

*(L30–L66)*

###### 0. The outline in one screen (for Peter)

- **Your goal, in your words** (§ 1): adopters use DesignerPunk's native components as a package dependency, build more with DesignerPunk, and "the components are functional, and will successfully render, in the app as described."
- **Where we are at `8553499b1`**: Spec 129 closed.
  - The generated token files compile on iOS and Android, and our component source compiles against them except for pinned errors (49 iOS, 93 Android, VERIFIED Thurgood by counting `harness/expected/*.tsv`).
  - No app is built, nothing is linked, no DesignerPunk component is rendered and no native contract is tested.
  - "Do not start a native product" is still printed.
- **What this spec does**: takes the components from "compiles in our checks" to "builds, links, renders and behaves as described in an adopter's own app", one family at a time.
  - The first family is the Chip family plus Icon-Base plus one adopter-built component.
- **The probes**:
  - Data's Android probe **passed** in CI (#884): the emulator runs on the free runner, so no billed runner is needed.
  - Kenya's iOS tools work on iOS 26.0.
- **You ruled the iOS minimum** (P-6): "(B), raise to iOS 18", and confirmed it after hearing that three iPad models that stop at iPadOS 17 are dropped (no iPhone is). So:
  - D4's iOS target is 18.0,
  - a release-time run on iOS 18.5 or 18.6 joins the CI lanes,
  - shipped text will read "built for iOS 18.0; tested on <runtime>",
  - and the Core Goals ballot owed before 132's first claim is ratified and applied (#888, #889).
  - The iOS 17 run is no longer needed.
- **What the team settled in review** (§ 5.2):
  - one module per platform that contains only the families that are ready (T-14), so the first family's app does not wait for every other family's repair, and a family that is not ready is not callable at all;
  - hand-written Xcode projects;
  - one stored string for the chosen theme on both platforms;
  - an in-app accessibility read that proves a view is hidden from VoiceOver;
  - grants for CI lanes written once per lane.
- **What you decide now** (§ 5.1, sitting 2):
  - the definition of done (D4–D10, with D8's wording fix and D4's new iOS target);
  - per-family claims;
  - which release carries the first claim;
  - device reads;
  - who may exclude a contract;
  - the adopter bar;
  - a token review for scalable text sizes;
  - one schema shape on which two seats split three times;
  - and, if the orchestrator includes it, web render evidence.
- **What must be fixed first** (§ 4.1): the two token-emitter defects (#870, #873, both now recorded on `main`), the served-doc correction that goes with them (#872), and row 7's warning gap.
  - Until they land, an adopter-built component's own tokens can break the native build silently.
- **What this PR's merge does** (§ 7): it carries out your 2026-11-27 answer, "Spec with (a)": the distribution charter, the goal's home since 2026-11-05, closes into this spec.

##### From § 1

*(L83–L120)*

**The definition of done** is plan-r2 § 1 "The definition of done", rows D1–D10 and their "details" paragraphs, at `b89163c41`, with the D1 probe sentence replaced as the native-plan `README.md` records at `55004006b` (L23) (Peter, received 2026-11-05T05:14:42Z).

So the table is two fixed texts at two SHAs. It is cited, not copied, so there is one table to keep true.
- **D1–D3 are Spec 129's part of done** (**RULED**, "C yes"). 129 delivered them at its close (CLOSEOUT pass, § "For the reader"). D3 is "129 builds it; 132 brings it to zero": the pinned component entries are 132's to remove.
- **D4–D10 are decided at this outline's gate** (native-plan `README.md`, the deferred-decisions table). § 5.1 puts them to Peter. A seat that changes a D row later, its details included, needs his approval (Stacy, condition 2).
- **The D-row change list** (Stacy R1): 132's requirements round carries, in its Context for Reviewers, a list headed "D-row changes since `b89163c41`", even when it reads `none`. Stacy's LENS and CLOSEOUT reads check it. Changes this round surfaced, each Peter's:
  - D8's population (P-1, **RULED**);
  - **D4's iOS deployment target, 17.0 → 18.0** (plan-r2 § 1, "D4 details", "iOS: deployment target 17.0"; it follows from P-6's ruling, and is put to Peter inside P-1 as a D-row edit; P-1, **RULED**);
  - **D4 and D10 relabelled as our fixture app** (P-1, **RULED**, addition (1); the text, **RULED** below);
  - **D4's release builds** (P-1, **RULED**, addition (2); the text, **RULED** below);
  - **not a D row: the real-app record** (P-1, **RULED**, addition (3)): an owed act under `.kiro/issues/README.md` rule 10, owned by Kenya and Data, with Stacy reading it at its first build as a SYMPTOM-class claims audit against what D4 claims (Stacy R3).
    - When Peter's own app first builds against a release, it gets a dated read. It is evidence, not a gate: it holds no claim and no merge.
    - Its event is one only Peter can see, so its Trigger is `manual`.
    - **Kenya and Data file it in their close commit on this branch** (§ 7, precondition 3). This outline does not file it.
    - **Surviving counter-argument** (Data R5, Stacy R3): it has no forcing date. A `manual` trigger can lapse without anyone noticing, and if Peter's app never becomes ready, the gap between our fixture and an adopter's app stays open while nothing in D4–D10 turns red.
  - **D7's evidence kinds**: `device-read (human, <device>, iOS <x>)` and `emulator-read (human, API <n>, TalkBack <v>)`, two separate kinds, one never counting as the other (P-3, **RULED**; Stacy R7);
  - and, only if they arise, T-12's audit exclusion (P-11) or a static-only iOS evidence kind for D7 (P-12).

**RULED TEXT** (P-1's additions (1) and (2), with the 18.0 edit; Thurgood's draft, with Stacy R3's D4 sentence as the base, and Leonardo R10's "What it is" line). Peter confirmed it, received 2026-11-28T03:32:51Z, verbatim: "Yes to 1 and 2. Re: 3, This feels like band-aiding the problem that could be spent properly fixing it. What's the proper fix?" His "1" is this text and the demo-app shape: a component demo app with two screens, the catalog and a "Patterns: Filter and tags" composition screen (`feedback/design-outline.md` § "[PETER] P-1 confirmed: the D4 shape"). It was drafted as PROPOSED TEXT and counted only from his confirmation. Every other D4 details line, and D4's oracle, is unchanged.
- **D4, "Done means"**: "Our fixture adopter app, built in the adopter layout from a packed install, builds and links with the components as a dependency. It proves the path; it does not prove any particular adopter's app."
- **D4 details, a new first line** (Leonardo R10, verbatim): "**What it is**: a component demo app that we build and keep in this repository, and run in our CI (iOS: Kenya; Android: Data; content: Leonardo). It has two screens: a catalog, and one patterns screen that composes the claimed families the way a product would (filter and tags first). It grows by one family per unit. Its component list comes from the committed catalog (below), so small never means a hand-picked set of components. It stands in for an adopter's app and is not one. Peter's own app is read through the real-app record."
- **D4 details, "iOS"**: "**iOS**: deployment target 18.0, in a committed `.xcodeproj` (Kenya; P-6)."
- **D4 details, a new last line**: "**Release builds**: the app is also built the way a shipped app is built. iOS: a Release build as well as Debug, and the app built in Swift 6 language mode as well as Swift 5 (Kenya). Android: a release build with R8 on, as well as debug (Data)."
- **D10, "Done means"**: unchanged, "An adopter can build more".
- **D10, oracle**: "A fixture adopter component, created with the WP6 scaffold and with its own `defineComponentTokens` file, lives in the D4 fixture app's own module. It reads our tokens, composes one of ours, and passes D3–D6 in the D4 fixture app. It includes one deliberate same-name case to prove the naming rule (§ 3 conflict) (Ada D7; Stacy; Leonardo D3 (d); Data PLAN R2)"

**Differences carried into the proposed text, by seat**:
- **Stacy R3**: the D4 sentence, word for word; "small" never a hand-picked set of components; D10's "the D4 fixture app's own module".
- **Kenya R5**: "that we build and keep in this repository"; D10's second phrase, "in the D4 app" → "in the D4 fixture app"; Release as well as Debug, and Swift 6 as well as Swift 5 language mode.
- **Data R5**: R8 on for the Android release build.
- **Leonardo R6**: a new "What it is" first line in D4's details, with its owners, and "two screens". Peter's "1" replaced the drafted line with Leonardo R10's.
- **Peter**: "start small and grow".

**Not carried** (each would change substance Peter has not been asked; each can go to the requirements round):
- Kenya R5: "hand-written … in `ios/`" in the iOS line. T-3 already settles the hand-written project, and D4's row already places it in `ios/`.
- Data R5: his Android line (our module under `node_modules/@3fn/core`, "a linked APK at `minSdk` 26"); "own Gradle module and package, not ours" in D10; "(see the real-app reading)" in the row; the Material3 theme and version catalog (T-20). Whether our module ships consumer keep rules for R8 stays UNVERIFIED (Data); the release build is what answers it.
- Leonardo R6: "It is small (two screens) and stands in for an adopter's app. It is not one." in "Done means", whose substance is in "What it is" and Stacy's second sentence; D10 "Done means" "shown in the D4 fixture app"; "not ours" in D10.
- Stacy R3: the adopter claim wording ("Builds, links and renders in DesignerPunk's own adopter-layout test app …"). It is served claim text, for D7 and P-2, not a D row.

##### From § 2

*(L138)*

  - **What it means here**: The pinned component entries 129 left, tagged to `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md` (45 iOS and 89 Android at `8553499b1`), plus 4 per platform tagged to the blend record. Under T-14 (ii) each family reaches zero in its own unit, and D3 stays a whole-package row

*(L160)*

    - D9: the previous release's D4 app and samples compiled against the new release, the oracle for source breaks, including an upgrade that adds a family (Kenya R2), plus a public-API diff over our module, the generated token API included, that reads a family's arrival as an addition and its removal as a break (Ada, Leonardo, Data)

*(L176)*

  - **One shared repair**: all three chips call `pressedBlend()`, which calls the unresolved `darkerBlend`, so the slice pays the blend repair (4 pinned entries per platform), once for every family with a pressed state. Under T-14 (ii) the blend helper is in the first family's closure (Lina, Kenya).

*(L188)*

**Web**: 132 adds no build work on web (S-1, **CLOSED**, § 5.3). Whether web gets render evidence is P-14.

##### From § 3

*(L206)*

  - **Sessions, by seat and work package**: the tasks round declares a sessions line as an M4 instrument, so each first-family parent completion doc carries `**Sessions**: <seat> <n> (<work package>); …`, with the shared work packages (blend, T-12, T-13) named in the tasks round and one definition of a session (one agent run that writes or reviews).

*(L214)*

  - **Shared costs, booked apart**: the blend repair, T-12's type scaling and T-13's hidden-view check, which later families do not pay again (Lina)

*(L223–L228)*

- **132's size against 131's** (plan-r2 § 6 item 8 asks the outline to state it): 132's sized items are about **50–95 sessions**, low confidence, with several items unsized (plan-r2 § 8). The review added:
  - per-lane CI grants (about five or six, T-15),
  - the token-side type scaling (1–1.5 for the generator, plus 20 call sites moved and possibly new typography tokens, T-12),
  - the manifest with its family filter and closure cases (1–2 plus a harness case per family, Ada, Kenya),
  - D8's preludes and the fixture screen (1–2, Leonardo).
  - No honest comparison with 131 exists until T-17 is committed.

##### From § 4.2

*(L259–L301)*

###### 4.2 Records that name 132 (Process-Spec-Planning § "Before Formalizing", run at `8553499b1`, record states at `017514064`)

E2's grep for `132` / `132-native-components-in-app`, plus the records added by hand: those named in inbounds or open PRs, and one glob token the grep misses (`132-*`).

The **disposition is a proposal**; each owner writes it, and the lines are written in the requirements feedback round's Context for Reviewers, as Step 0 requires. Owners confirmed their rows in R1.

*(B2, ballot `2026-11-27-rule-11-lapse-window-b2`, was applied by #882 (`8c22e7f58`); its site 6 made the hand-add rule explicit (`governance/Process-Spec-Planning.md` L141 at `35456bdbc`). The text before it already said "A record the outline cites but the grep misses is added by hand", which is what this list does.)*

| Record | Owner | Trigger (at `017514064`, or the PR head named) | Proposed disposition |
|---|---|---|---|
| `.kiro/issues/2026-09-26-native-component-distribution.md` | Kenya, Data (Lina, Ada) | **`merge:#880`** on `main` since #868 merged (`e03d3ae3f`; re-tokened by Data, `9e7739a15`; co-signed by Kenya, `3dd723b4e`) | **intake, closing in this PR**: Peter's "Spec with (a)" (§ 7). Its § "iOS obligations filed here under rule 10" (on #868) passes three iOS obligations to this outline: the iOS minimum (P-6), the iOS 17 runtime probe (§ 6, P-10) and the wording rule (§ 4.3). Its § "Android render probe result" (on #884) holds obligation (1)'s Android half |
| `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md` | Lina | `path:.kiro/specs/132-native-components-in-app/requirements.md` | intake: its native items (A3, I1–I3, A1, A2, A4, A6's non-ripple parts) go to D5 and D6 (Spec 129 Req 8.4) |
| `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md` | Lina (Kenya, Data verify) | `path:.kiro/specs/132-native-components-in-app/completion/claims-pass.md` | intake: D3 to zero, per family (T-14 (ii)) |
| `.kiro/issues/2026-11-06-theme-family-persisted-form-for-132-d5.md` | Kenya, Data | `path:.kiro/specs/132-*/design.md` | intake: the stored string is settled (T-5, CLOSED in this round); runtime switching is designed at D5 in 132's design round, which fires the record |
| `.kiro/issues/2026-11-12-readiness-tables-generate-or-guard.md` | Lina (Thurgood consulted) | `path:.kiro/specs/132-native-components-in-app/requirements.md` | intake: Lina's answer for requirements is the combined form in one table (T-8) |
| `.kiro/issues/2026-09-29-instruments-parser-and-resolver.md` | Thurgood | includes `path:.kiro/specs/132-*/tasks.md` (hand-added: the grep's pattern misses the glob) | leave: fires at 132's first tasks round, which is planned under M4 |
| `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` | Thurgood | `manual` | leave. Its 2026-11-05 line "Spec 132's directory does not exist yet" is stale since #723; a dated pointer is owed by its steward (me), outside this PR |
| `.kiro/issues/2026-11-05-hand-written-readiness-claims-disagree-with-generated-readiness.md` | Lina | `release:16.4.0:phase-1` | leave: fix-now; Lina sequences it with T-8's pointer conversion |
| `.kiro/issues/2026-11-08-generate-component-token-warning-spacing-sizing-only.md` | Ada | `release:16.4.0:phase-1` | leave, and a precondition (§ 4.1). Peter's re-answer on row 7 is pending (#864), and "(spec): Spec 132" is one of its options. **This outline takes nothing from it**; naming it here carries out no spec answer, because none has been given |
| `.kiro/issues/2026-10-26-release-16-1-standards-implications.md` | Thurgood | `path:…/131…/requirements.md` | leave: names 132 only for the order |
| `.kiro/issues/2026-10-29-claims-pass-record-homes-unnamed-arming-symptom-overlay.md` | Stacy | `release:next:phase-1` | leave: names 132 only for the order |
| `.kiro/issues/2026-11-27-ios-component-token-type-map-breaks-six-families.md` (#870) | Ada | `release:next:phase-1` | leave: fixed by its own PR; a precondition (§ 4.1) |
| `.kiro/issues/2026-11-27-product-token-swift-emitter-colour-types.md` (#873) | Ada | `release:next:phase-1` | leave: as above |
| `.kiro/issues/2026-11-27-native-access-level-ballot-owed.md` (#877) | Lina | `path:.kiro/specs/132-*/requirements.md` | intake: drafted before 132's requirements open, or re-ruled to the ballot's PR in the requirements PR (T-9) |
| `.kiro/issues/2026-11-27-per-platform-contract-validation-ballot-owed.md` (#877) | Lina | `path:.kiro/specs/132-*/requirements.md` | intake: as above; it also carries P-4's reason-class list and the per-platform oracle lines (T-13) |
| `.kiro/issues/2026-11-27-rendering-field-record.md` (#877) | Lina (Leonardo consulted) | `path:.kiro/specs/132-*/requirements.md` | intake: its shape is P-16; the field lands before 132's render lanes |
| `.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md` (#881) | Data | `path:.kiro/specs/132-native-components-in-app/requirements.md` | intake: the range numbers (P-9, with the `compileSdk` 37 finding as its item 1, dated on #884) and the API-26 floor test get their acceptance criteria in requirements |
| `.kiro/issues/2026-11-27-android-render-probe-workflow-grant.md` (#878) | Data | `path:.github/workflows/android-render-probe.yml` | leave: closed at its fixing PR, #884 (`358ca187b`), which archived it with the result (§ 6). Stacy's activation read is on #883 |
| `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md` (#888, hand-added; filed under rule 10 by the ballot seat in the Core Goals ballot's PR, for Peter's P-6 ruling; on `main` since `b58c73da7`) | Thurgood (items name their seats: A Kenya, B Ada, C and D 132's docs units) | `path:.kiro/specs/132-native-components-in-app/requirements.md` | intake: A, the release-time 18.x lane; B, `generate` restoring the floor; C, docs stating what is tested; D, the gap stated when free images stop carrying 18 |
| `.kiro/issues/archive/2026-11-27-ios-17-runtime-probe-owed.md` (#886, hand-added; merged at `e85112d7a`, filed directly under `archive/`, its last section "Parked", with no outcome line) | Kenya | as that record says | **moot** since P-6's ruling: Kenya re-rules or closes it, on its own PR |
| Lina's theming record (#885: Input-Text-Base's caret and selection not themed; the Button-VerticalList-Set iOS literal) | Lina | as that record says | intake (merged at `7ad5b0cbf`: `.kiro/issues/2026-11-27-input-text-base-caret-and-selection-not-themed.md` and `.kiro/issues/2026-11-27-button-verticallist-set-ios-literal-font-size.md`): the iOS caret and selection are a parity defect for the family that holds Input-Text-Base; the literal `14` is a token-compliance defect (T-12) |

- **Seven records fire when 132's `requirements.md` is first committed**: the drawn-control, readiness-tables and toolchain-range records, #877's three, and #888's iOS-18-floor record (on `main` since `b58c73da7`).
- **One fires at `design.md`** (theme family);
- **one at `tasks.md`** (instruments parser);
- **one at `completion/claims-pass.md`** (component repair);
- and 131's park re-asks at `completion/first-family-measured-cost.md`.

A record whose obligation is met earlier is re-ruled by its owner before its event.

**Citations that this rewrite moves**:
- #877's three records cite the placeholder's L7 and L33. Lina said in R1 she would pin them to `@ a953ac70d` on #877's branch, but #877 merged at `16835f190` without the pin (VERIFIED, Thurgood: `a953ac70d` does not appear in the access-level record at `017514064`). So at this file's merge those cites point at different text; a dated pointer in each Source line is now Lina's, by rule 9.
- Kenya's rule-10 section on #868 cites "design-outline.md § 3", also the placeholder's; its dated pointer rides the close commit (§ 7).

##### From § 4.3

*(L303–L333)*

###### 4.3 Obligations that live only in inbounds (carried here so they are read)

- **Kenya** (`.kiro/specs/129-consumer-generation-completeness/inbound-from-kenya-design-2026-11-05.md` § 5; her rule-10 section on #868):
  - **The iOS minimum was asked again at this outline, before any native support claim** (Peter's "4 (a)", received 2026-11-05T13:05:54Z; Spec 129 `design.md` § 0).
    - **Answered: P-6, "(B), raise to iOS 18"** (§ 5.1).
    - Its owed acts are in `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md` (#888, merged at `b58c73da7`); the Core Goals raise is ballot `.kiro/docs/ballots/2026-11-27-core-goals-ios-minimum-18.md`, ratified on the same PR and applied by #889 (`35456bdbc`).
  - **The iOS 17 runtime probe is moot.** Its record, #886, is Kenya's to re-rule or close.
  - **The wording rule**:
    - until the Core Goals ballot is ratified, Spec 129's rule stands, "built for iOS 17.0, not run on 17", because it is true of every release before 132's first claim.
    - From the claim, the form is **"built for iOS 18.0; tested on <runtime>"**, with the runtime taken from the lane's printed toolchain (Kenya R4), and the minimum never printed without the tested runtime beside it (Leonardo R4).
    - The minimum lives in one generated value that `Package.swift`, D4's target, the guide's iOS line, INSTALL and the walkthrough all read (Leonardo R4).
    - A local run is not one of "DesignerPunk's checks", so it does not change the wording by itself (Kenya R1).
  - Swift 6 language mode for the components, set in the root manifest, belongs to 132's packaging (her inbound § 1, L67).
- **Data** (now held by `.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md`, #881):
  - **The Android toolchain range numbers** (AGP; Kotlin with its Compose compiler plugin; the Compose BOM; and now **`compileSdk`**) come from D4's builds at the bottom and top of the range, then go to Peter for approval.
    - The range-end builds are a `.github/**` change, so they need an issue-row grant.
  - **The API-26 floor test lives in 132's own module**: lint `NewApi` as an error plus an emulator run at API 26. The probe has shown that API 26 boots and runs a Compose test on the free runner (§ 6).
  - **A forgotten theme provider is silent until a runtime test**, which is D5's.
- **Lina** (`.kiro/specs/129-consumer-generation-completeness/inbound-from-lina-design-2026-11-05.md` § 7): the three shapes in § 7.1–7.3 (access level, per-platform contract validation, `rendering:`), now held by #877's records.
- **Ada** (`.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-design-2026-11-05.md` D-4, D-5 and P-1; `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/ada-plan-r2.md` L46–L70):
  - Q12, Q13 and the native type table are provisional until 132's D4 app builds (Spec 129 `design.md` § 4). What D4 must show for each (Ada R1):
    - Q12's fixed binding names reached and read from the adopter's module (Kenya showed this on iOS for the tokens and theme, R2), which needs the access-level ballot to name them public, with a unit test for the default-name provider clash D4 will not see;
    - Q13 through the adopter theme;
    - the type table on the primitive path, with D10 proving the component-token path.
  - `generate` fails on a `.kt` file in the consumer's tree that declares our package (VERIFIED, Ada: `src/cli/shared/reservedKotlinPackages.ts`), and D10's same-name case proves it.
  - **The manifest's three conditions**, carried into requirements:
    - `generate` writes the root `Package.swift` only when it is absent or carries our header, otherwise it stops with a message;
    - writing outside `output` needs per-platform paths and a `COMMIT-POLICY.md` entry;
    - the adopter's component module imports ours by local path, written as `.package(name: "DesignerPunk", path: …)` on iOS (Kenya R2, VERIFIED: the plain form fails, because a path dependency's identity is the adopter's directory name).
  - Deprecated-alias emission and D9's public-API diff land before the claim (Peter's "7 (a)").
    - Aliases are owed from the first claim for the whole shared token surface (`DesignTokens`, the theme types, `ComponentTokens` itself), because no per-family scoping reaches it (Ada; Kenya, Leonardo agree).

##### From § 4.4

*(L338)*

- **133's state tokens** (P-7, **re-ruled** by the pivot): 133 U1's state colours as derived semantic tokens, computed at build time per theme in OKLCH, with their names and per-theme emission, and the public name of the one generated runtime function per platform for caller colours, which D10 needs (Ada R10). This replaces "the native blend API's shape" (Ada R7's list): the native blend files are deleted in U1, so no blend API is left to shape.

*(L340)*

- **The Core Goals ballot raising the iOS minimum to 18.0, ratified: DONE** (P-6; ballot `.kiro/docs/ballots/2026-11-27-core-goals-ios-minimum-18.md`, RATIFIED on #888 at `b58c73da7`, applied by #889 at `35456bdbc`). After the claim, raising the minimum is a breaking change.

##### From § 5.1

*(L351–L601)*

###### 5.1 For Peter

###### Answered so far in this round

- **P-14, web render evidence: RULED** (b). Peter, received 2026-11-28T04:40:39Z, verbatim: "(b)". A Sparky-owned record, placed later alongside 128; 132 keeps the contract-validation format keyed by platform. Record: `feedback/design-outline.md` § "[PETER] P-14".
  - **What survives, as he was told**: he may read his goal as covering web now, and until 128 web's "renders" claim stays weaker than native's.
  - **Owed, with owners, none filed in this outline**: Sparky's record, filed by Sparky under rule 10, with its trigger alongside 128 (Sparky); the platform-keyed format, already carried in T-13 and in `.kiro/issues/2026-11-27-per-platform-contract-validation-ballot-owed.md` (#877; Lina).
- **P-16, the `rendering:` schema shape: RULED** (C), Lina deciding as schema owner, and she decides (A). Peter, received 2026-11-28T04:24:26Z, verbatim: "I'm leaning (C), but I'd like to review the decision with Lina before committing to it fully." Then, after Lina's R12, received 2026-11-28T04:39:39Z, verbatim: "Confirm (C), with Lina's (A) and the guards". Record: `feedback/design-outline.md` § "[PETER] P-16".
  - **The shape**: per platform, `rendering: { kind: drawn | platform, reason }`. Until #885 merges, the iOS reason for Input-Text-Base says the caret and selection follow the app's tint. Structure is revisited if a second component wraps a system control (Leonardo's trigger).
  - **Why (A) now** (Lina R12, reversing her R3): the pivot lets #885's caret and selection fix ride 133 U1, before 132's render lanes exist.
  - **The guards**: the schema validator rejects a missing reason (Lina); Kenya's and Data's render lanes check every `drawn` component whole, with no skipped regions; Stacy reads every `platform` value and its reason at the claims pass.
  - **What survives**: whether SwiftUI `.tint` colours the text selection as well as the caret is UNVERIFIED until Kenya checks it. If it does not, (B) was right, and the choice reopens before Input-Text-Base's family is claimed.
  - **Owed, with owners, none filed in this outline**: the `.tint` selection check (Kenya); the proposal to move #885 into 133 U1, for 133's outline round (Ada and Lina); the schema validator change (Lina).
- **P-13, the token review: RULED**, in three parts. Record: `feedback/design-outline.md` § "[PETER] P-13".
  - **Part 1, the approach**, Peter, received 2026-11-28T03:57:33Z, verbatim: "Approve part 1".
    - Every typography semantic gets a size-band scale role, per Ada's § 1 table (`[ADA R3]`): fine, compact, body, bodyLarge, headingSm, headingMd, headingLg, display. A band, not a job name.
    - The 18 call-site moves in Ada's § 2.
    - Six iOS helper, error and "Required" texts move to caption and get lighter, to match web.
    - Layout repair per family.
    - Conditions: Leonardo checks the set on the patterns screen at AX5, before the first claim; Android's matching small-text fix lands in the same unit (Lina); a role-less typography token defaults to the nearest-size rule (Leonardo).
    - Before he answered, Peter asked whether text resizing for iOS was already addressed. Ada R11: it was never designed at token level; Spec 005 claimed Dynamic Type but implemented only shrink-to-fit (`005` `requirements.md` L218, `task-4-5-completion.md` L22, verified by the orchestrator).
  - **Part 2, the heading fork**, Peter, received 2026-11-28T03:59:04Z, verbatim: "(H1) with Leonardo's note". (H1) is Apple-faithful, with two 2pt inversions at AX5 (h4 52 < h5 54; h2 56 < h3 58). Leonardo's note: a served usage line saying h4/h5 and h2/h3 may swap at the largest sizes, so hierarchy must not rely on size alone.
  - **Part 3, Nav-SegmentedChoice's bold labels**, Peter, received 2026-11-28T04:18:53Z, verbatim: "Approve (T1) with these names and Leonardo's usage line". (T3) was already off the table: bold stays.
    - `typography.segmentLg`: fontSize125, lineHeight125, fontFamilyBody, fontWeight700, letterSpacing100; role bodyLarge.
    - `typography.segmentMd`: fontSize100, lineHeight100, fontFamilyBody, fontWeight700, letterSpacing100; role body.
    - Leonardo's served line, verbatim: "`segment*` are for the labels of segmented selection controls only, not a general bold 16/18pt style."
    - Ada's future-needs rule: bold at label size gets a new job-named style through creation review, only where a contract fixes the weight on every platform; bold inside text stays a platform modifier.
    - **This is Peter's token-creation review for these two names.** Ada creates them in 132's typography work; none is created now.
    - **What survives**: one consumer each (Ada R13).
  - **Owed, with owners, none filed in this outline**:
    - Kenya: whether SwiftUI `.fontWeight` works with `Font.custom`, owed either way (Ada R13);
    - Leonardo: the AX5 patterns-screen check, the H1 swap usage line, and the `segment*` usage line;
    - Ada: a record for the `typography.label` reference to a nonexistent token at `src/tokens/semantic/index.ts` L569; after P-13 lands, a ballot adding a scale-role section to Token-Family-Typography;
    - Lina: a rule-10 record for Android Nav-SegmentedChoice's fixed-`dp` height on `sp` text;
    - Stacy: Spec 005's Dynamic Type completion claim, as a false-claim finding (Ada R11).
- **P-4, who may exclude a contract or remove a platform from it: RULED** (b), as new work. Peter, received 2026-11-28T03:48:12Z, verbatim: "(b) – I think that's even already the practice; but you'd have to confirm that with Lina"; then, after Lina's check, received 2026-11-28T03:49:46Z, verbatim: "Yes, (b) stands as new work; P-5 is (a)". Record: `feedback/design-outline.md` § "[PETER] P-4".
  - **Not the practice today** (Lina R10): exclusions carry free-text reasons (40 entries across 25 `contracts.yaml` files); the 19 web-only contracts carry no reason at all; there is no closed list, nothing Peter has approved, and no checker.
  - **Owed, with owners, none filed in this outline**:
    - the reason-class list, grounded in a classification of the slice's 46 contracts per platform, for Peter to approve once (Lina);
    - its ballot vehicle: the per-platform contract-validation ballot, `.kiro/issues/2026-11-27-per-platform-contract-validation-ballot-owed.md` (#877; Lina), which fires at 132's requirements;
    - a reason, class plus text, on every platform removal, not only on exclusions (Lina);
    - the re-sort of the 40 exclusions and the 19 web-only contracts into those classes (Lina);
    - a checker that rejects any reason off the list and counts each class (Thurgood, with Lina).
- **P-5, do adopter-built components meet the same bar: RULED** (a), same bar, available. Peter, received 2026-11-28T03:49:46Z, verbatim: "Yes, (b) stands as new work; P-5 is (a)". Record: `feedback/design-outline.md` § "[PETER] P-5".
- **The pivot: RULED.** Peter, received 2026-11-28T03:45:37Z, verbatim: "Yes to 1, U2 before 132, keep 131. Re: 4, rejected. I don't think U1 will take "weeks" as projected."
  - **Item 1, adopted, in this order**: (i) finish 132's outline: the remaining questions, the reshape, Kenya and Data's close commit, and #880's merge; (ii) 133's outline round; (iii) 133 U1, state colours as tokens (the proper blend fix), which also ships the web fix in a 16.x; (iv) 133 U2 (the `ColorTokens.ts` deletion and the rgba cleanup) and U3 (shadow channels); (v) then 132, built against final colours; (vi) 133's enforcement last, after 132's first family.
  - **What this trims from his proposal**: at 2026-11-28T03:40:05Z he proposed, verbatim, "My proposal is the settle 132's design outline with the understanding we'll complete 133 before proceeding with 132. Let's gut-check that with Thurgood, Ada and Lina first, please". The ruled plan does not complete 133 first: enforcement comes after 132's first family (Thurgood R14, Ada R10, Lina R9).
  - **The proper fix**, state colours as derived semantic tokens computed at build time in OKLCH, is adopted as 133 U1. Creating those tokens still needs Peter's review at 133's token-review sitting, and so does dark-surface lightening.
  - **Item 2**: U2 comes **before** 132. **Item 3**: 131 stays where it is, re-asking at the first-family measured-cost record ("keep 131").
  - **Item 4, rejected**: Lina's CSS web fix is not shipped now; the web fix waits for 133 U1. His reason, verbatim: "I don't think U1 will take "weeks" as projected." The "weeks" estimate was the orchestrator's, not a seat's.
  - **Superseded**: Thurgood R13's new small spec. 133 carries the fix.
  - **Owed, with owners, none filed in this outline**:
    - the priorities record's walk-log line for the new order, and its § 7 row for the 16.x rule (Thurgood, its steward);
    - 133's `open` outcome line (Thurgood, 133's author);
    - 132's park line, `**Spec outcome (2026-11-28, Thurgood)**: park — re-ask: `path:.kiro/specs/133-color-track/completion/token-half-complete.md``, a path 133's tasks round declares as a Primary Artifact of the parent that completes the token half (Thurgood, 132's formalizer; written in its own commit, after the reshape and the close);
    - Lina's defect record for the web pressed and hover defect: 12 web components, the fix in 133 U1, and the tests' known-bad gap (Lina);
    - Ada's correction to the blend record, `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md` (Ada);
    - `InteractionStateAudit.test.ts`'s false assurance: it tests a calculator no component uses (Thurgood, as test-governance owner; Stacy on the claim side).
- **P-1, the definition of done: RULED** (b), with three additions. Peter, received 2026-11-28T02:23:27Z, verbatim: "I lean toward (b) with a proposal that I'd want feedback on before we commit it. Re: D4, We'd need an adopter app — which I have an idea for, but isn't ready. Perhaps a more appropriate bar for this would be a small scale demo app that we prepare with Kenya and/or Data? Re: D10, similar concerns as D4, but I agree with need some kind of similar test. Perhaps it can be part of the same small scale demo I mentioned earlier? Honest thoughts?"; then, received 2026-11-28T02:26:04Z, verbatim: "Yes, small means start small and grow; all three additions".
  - The additions: (1) D4 and D10 relabelled as our fixture app; (2) release builds; (3) his real app as a record, not a D row. Asks, answers and the four consults: `feedback/design-outline.md` § "[PETER] P-1".
  - **The final D4 and D10 text is RULED**: Peter confirmed it, received 2026-11-28T03:32:51Z, verbatim: "Yes to 1 and 2. Re: 3, This feels like band-aiding the problem that could be spent properly fixing it. What's the proper fix?" (§ 1, "The D-row change list"; his "Re: 3" is not part of P-1 and is not recorded here).
- **P-3, device reads: RULED**, as put to him. Peter, received 2026-11-28T03:27:07Z, verbatim: "I can do (a) for iOS since I have an iOS device, but no Android device." Confirmed, received 2026-11-28T03:32:51Z, verbatim: "Yes to 1 and 2. Re: 3, This feels like band-aiding the problem that could be spent properly fixing it. What's the proper fix?" Record: `feedback/design-outline.md` § "[PETER] P-3".
  - **iOS**: Peter does one VoiceOver read per component on his own iPhone, at the first support release, as dated evidence, not a gate.
  - **Android**: Peter does the TalkBack reads on the emulator, labelled "emulator read".
  - **Readiness** shows `device-read (human, …)` and `emulator-read (human, …)` as separate kinds (§ 1, "The D-row change list"). Each read record carries Stacy R7's fields: the component; the platform and the kind of read; the reader; the time, in UTC; the device or emulator image; the screen-reader version; the app build's commit SHA, shown in the app; what was spoken, word for word, against each contract; a hash of the screen recording.
  - **Inputs to the requirements round**: Kenya R7's "read mode" in the catalog and her install notes (Developer Mode; free-team signing and its 7-day limit, UNVERIFIED; the Xcode and iOS versions).
  - **Peter's to do when the reads come due**: the Android SDK and emulator install, about 2 GB.
  - **What survives**: the reads are self-attested, because the git identity agents commit under is Peter's (Stacy R7, VERIFIED).
- **P-7, which release carries the first claim: RULED** — the collective team's lean. Peter, received 2026-11-28T03:19:49Z, verbatim: "This is getting a little complicated for me, so let's go with the collective relevant team's lean on the optimal path forward. My preference would be to avoid too many changing messages we have to update, track, and communicate to potential adopters. Honest thoughts?" The exchange before it, and the seven items of the lean: `feedback/design-outline.md` § "[PETER] P-7".
  - **Re-ruled by the pivot** (above). What stands: 17.0.0 carries 132's first family alone (§ 4.4); `main` stays releasable as 16.x (§ 4.4); T-14's threshold stays in the design round (§ 5.2); the pressed colour, option (a) (§ 4.4). What changed: the blend condition is now 133's state tokens (§ 4.4). What dropped out: the (B) re-decision at the measured-cost record, Ada's forecast column, and the record's "Decisions this record reopens" row (§ 3).
  - **Owed, with owners, none filed in this outline**: the priorities record's § 7 row for the 16.x rule (Thurgood, its steward); the 16.x rule's owner (not yet named); D9's baseline (T-10's owners); the contract's ΔL range (Lina); the claim's colour line (Leonardo). The pivot's owed acts are listed under it, above.
- **P-2, when adopters are first told to start a native product: RULED** (b), per family, with all three of Leonardo's conditions. Peter, received 2026-11-28T02:28:20Z, verbatim: "(b) with all three conditions". Carried as owed acts: conditions 1 and 2 on the overlay flip ("Not re-asked here"), D7's derivation (§ 4.4), and condition 3 as T-18 (§ 5.2). Record: `feedback/design-outline.md` § "[PETER] P-2".
- **P-6, the iOS minimum: RULED.** Peter, received 2026-11-27T18:32:45Z (the orchestrator's receipt time, relayed), verbatim: **"(B), raise to iOS 18"**.
  - **What he was asked**: whether to run the simulations on whatever version Apple recommends at the time (his own question, 2026-11-27T18:18:45Z), then the choice between (A), keep the 17.0 minimum, test every run on the lane's current iOS and run old versions only occasionally, and (B), raise the minimum.
  - **What he read**: `[KENYA R4]` and `[LEONARDO R4]`, spliced byte for byte into `feedback/design-outline.md`.
    - Kenya: (A) is safe for what the compiler proves and not for behaviour; no free CI image carries iOS 17, and the oldest it carries is 18.5/18.6 on `macos-15`; raise to 18, not 26; decide before the claim.
    - Leonardo: a floor of 18 probably shuts out a support policy rather than a device (UNVERIFIED); lean (B) before the first claim; stated as a product choice, not as GitHub's image schedule.
  - **Confirmed, with the device cost in front of him**: Peter, received 2026-11-27T18:36:18Z, verbatim: **"Yes, (B) still stands, raise to iOS 18"**.
    - Before this second answer he was told Kenya's finding (relayed by the orchestrator; now committed: `.kiro/docs/ballots/2026-11-27-core-goals-ios-minimum-18.md` L27 @ `b58c73da7` names all three models, VERIFIED (Thurgood) by reading that line): **no iPhone is dropped, but three iPads that run iPadOS 17 cannot run 18**: the iPad (6th generation), the iPad Pro 10.5-inch and the iPad Pro 12.9-inch (2nd generation).
    - That corrects Leonardo R4's "probably not new hardware": the floor shuts out a support policy on iPhone, and those three iPad models outright.
  - **Its effects**, each carried into this file:
    - D4's iOS deployment target becomes **18.0**, a D-row edit put to Peter inside P-1 (§ 1, § 2);
    - a release-time run on **iOS 18.5 or 18.6 on `macos-15`** joins T-15's lanes and their grant;
    - the shipped wording form becomes **"built for iOS 18.0; tested on <runtime from the lane>"** (§ 4.3);
    - **`generate` restores the declared floor** if an adopter edits it down, because a lowered value compiles (Ada's; Leonardo R4);
    - **the Core Goals ballot is ratified before 132's first claim** (§ 4.4): #888 at `b58c73da7`, applied by #889 at `35456bdbc`;
    - **the iOS 17 runtime probe (#886) is moot**: Kenya re-rules or closes it.
    - Rule 10: these obligations are filed by the ballot seat in #888, in `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md` (#888, merged at `b58c73da7`), beside the Core Goals ballot. This PR files no record of its own for them.
- **P-10, Android**: answered by the merge of #878 (2026-11-27T16:57:03Z).
- **P-10, iOS: superseded by P-6.** Peter had chosen a local iOS 17 runtime download (received 2026-11-27T17:20:36Z, as relayed to Kenya and cited in her R2). Xcode 27.2's own downloader refused it twice (Kenya R4, #886), and P-6's ruling removes the need for it.
- **P-8 does not arise**: KVM is usable on the free `ubuntu-24.04` runner (§ 6).
- **P-15 ((b), a standing workflow-scope ballot) does not arise now**: every seat that answered picked (a) (T-15). A later fork about *maintaining* lanes once they are required is listed under "Later".

###### Sitting 2, in decision order

The order is mine: each item before the ones that depend on it. Numbering is stable from R1.

**How it is asked** (Peter, received 2026-11-28T02:08:13Z, verbatim): "(1) — let's answer now and reshape after. Let's take the questions and their context one at a time, please". So each question is put to him on its own, from this section as it stands, and Thurgood reshapes the outline once after the sitting, with the answers folded in, before Kenya and Data's close commit (§ 7).

###### P-1 (order 1)

- **RULED** 2026-11-28: (b), with three additions ("Answered so far", above). The options below are kept as they were asked.
- **Question**: **D4–D10 as 132's definition of done**
- **Options**:
  - (a) approve as written;
  - **(b) approve with two D-row edits**:
    - D8's population corrected to "every fenced Swift or Kotlin block in a file the package ships or an MCP serves" (Leonardo R1: D8 names component READMEs, which the package does not ship and no MCP serves; the served samples are in `governance/Component-Family-*.md`),
    - and **D4's iOS deployment target 17.0 → 18.0**, which follows from P-6's ruling;
  - (c) ask for less (no D8 or D9);
  - (d) ask for more (a person sees each app)
- **Leans (not picks)**: (b): Leonardo; Ada and Stacy lean approve
- **What survives**: Approving before a linked app exists invites "criteria written before the numbers get diluted when the numbers arrive" (Stacy). The D-row change list (§ 1) makes a later change visible, not impossible

###### P-2 (order 2)

- **RULED** 2026-11-28: (b), with all three conditions ("Answered so far", above). The options below are kept as they were asked.
- **Question**: **Plan decision 8: when adopters are first told to start a native product**
- **Options**:
  - (a) all 34 at the D5/D6 tier;
  - (b) per family. With (b), Leonardo's conditions, each takeable on its own:
    - the overlay flip covers consumer Leonardo, the seat that selects components;
    - the flipped overlay text points at served readiness, so later families need no charter edit;
    - a `validate_assembly` warning when a component is not ready for the target platform (T-18)
- **Leans (not picks)**: (b), per family (Lina; Leonardo), with the three conditions (Leonardo). Under T-14 (ii) a family that is not ready is not in the adopter's module at all, which makes per family true in the build
- **What survives**: Partial support needs careful wording every release. The conditions depend on D7 shipping no later than the first claim

###### P-7 (order 3)

- **RULED** 2026-11-28: the collective team's lean ("Answered so far", above). The options below are kept as they were asked.
- **Question**: **Which release carries the first claim, and what it promises for families not yet claimed**
- **Options**:
  - The release:
    - (a) 17.0.0, as a chosen marker (the seats' position, `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-09-peter-rulings-release-16-3-0.md`, never ruled);
    - (b) a minor.
    - Under T-14 (ii) the first claim only adds API, so a minor is semver-valid and 17.0.0 is a choice, not a necessity (Leonardo, Ada).
  - **The not-claimed question depends on T-14's open threshold**:
    - if the adopter's default manifest admits claimed families only (Leonardo), a not-claimed family is not callable and needs no marking;
    - if it admits families at the compile tier (Ada's inclusion test), compiled-but-not-claimed families need an opt-in mark:
      - Kotlin `@RequiresOptIn` (Data, confirmed idiom; ERROR or WARNING is Leonardo's product call)
      - and Swift `@_spi` (Kenya, measured to hide the type from a plain `import`, but underscored, so not a stable language promise) or a separate library product
- **Leans (not picks)**: none ruled. All seats: aliases are owed from the first claim for the whole shared token surface, whatever the release
- **What survives**: Whatever the release, after the first claim every rename on the shared token surface costs an alias. Under (ii) a family's arrival changes an adopter's module without any change to their config, and the "Native status" text has to say so in one sentence

###### P-6 (order —)

- **Question**: **RULED**: "(B), raise to iOS 18" (above)
- **Options**: —
- **Leans (not picks)**: —
- **What survives**:
  - The floor is 18 for about as long as `macos-15` carries an 18.x runtime; after that, shipped text reads "built for 18; tested on 26.x", the same gap one version later (Leonardo R4).
  - The cost is permanent until the floor is lowered: teams that must support iOS 17 are shut out, and so are users of three iPad models that stop at iPadOS 17 (iPad 6th generation, iPad Pro 10.5-inch, iPad Pro 12.9-inch 2nd generation; Kenya, relayed).
  - Peter confirmed (B) with that cost stated (18:36:18Z)

###### P-3 (order 4)

- **RULED** 2026-11-28: (a) on iOS on his iPhone, and emulator reads on Android ("Answered so far", above). The options below are kept as they were asked.
- **Question**: **Plan decision 9: device reads**
- **Options**:
  - (a) a named human does one read per component per platform at the first support release, as dated evidence, not a gate;
  - (b) no human read, speech labelled "not device-read"
- **Leans (not picks)**: semantics tests and audits inside done, speech outside; (a) at the first claim (plan; Stacy; Kenya, Lina keep it as T-13's fallback only). Who the human is, is yours
- **What survives**: A named human is self-attested, because agents act through your credential (Stacy)

###### P-4 (order 5)

- **RULED** 2026-11-28: (b), as new work ("Answered so far", above). The options below are kept as they were asked.
- **Question**: **Plan decision 10: who may exclude a contract or remove a platform from it**
- **Options**:
  - (a) each one yourself;
  - (b) a closed list of reason classes, approved once, the checker counting each;
  - (c) the team
- **Leans (not picks)**: (b) (plan; Lina; Stacy; Sparky). Lina grounds the list in a classification of the slice's 46 contracts per platform; Sparky: native wording is added beside web wording, never replacing it
- **What survives**: A class written wide enough admits dilution one item at a time; the count shows it, the wording is the guard (Lina, Stacy)

###### P-5 (order 6)

- **RULED** 2026-11-28: (a) ("Answered so far", above). The options below are kept as they were asked.
- **Question**: **Plan decision 11: do adopter-built components meet the same bar**
- **Options**:
  - (a) same bar, available;
  - (b) same bar, required for anything served as conformant (128's lane 3);
  - (c) a lower bar ("builds")
- **Leans (not picks)**: (a); D10 proves the path (plan; Lina)
- **What survives**: Until 128 lands, agents see adopter components beside ours with no evidence of the bar (Lina)

###### P-13 (order 7)

- **RULED** 2026-11-28, in three parts ("Answered so far", above). The options below are kept as they were asked, except the role example, replaced by the ruled size bands.
- **Question**: **Token review: a scale role on typography semantic tokens** (T-12's fix, Ada R2).
  - Each typography semantic gains a platform-neutral size-band role (fine, compact, body, bodyLarge, headingSm, headingMd, headingLg, display; a band, not a job name); the Swift generator maps role → `Font.TextStyle` and emits one view modifier, for example `.dpFont(DesignTokens.typographyBodyMd)`, built on `@ScaledMetric(relativeTo:)` and `Font.custom(_:size:relativeTo:)` (Kenya R2: a computed `Font` would not follow SwiftUI's Dynamic Type environment, and `.system(size:weight:relativeTo:)` does not exist).
  - Android and web ignore the role (`sp` and `rem` already scale).
  - **It may also need new typography semantic tokens** for the 20 calls that read a primitive, a component size or a literal: Ada lists them before this sitting
- **Options**:
  - (a) approve the mapping, and any new tokens listed;
  - (b) ask for changes;
  - (c) refuse (then the fix is per component, or P-11 arises)
- **Leans (not picks)**: (a): Ada, Lina, Leonardo, Kenya. Leonardo: review the mapping as a set against one product screen at the largest Dynamic Type size, because the anchors decide whether headings still read above body text
- **What survives**: Scaled text breaks layouts sized by fixed tokens, so the fix is layout repair too, priced first in the slice. The anchors are partly taste

###### P-16 *(new)* (order 8)

- **RULED** 2026-11-28: (C), with Lina's (A) and the guards ("Answered so far", above). The options below are kept as they were asked.
- **Question**: **The `rendering:` schema shape** (T-1).
  - The two seats exchanged positions three times; each says in its last entry that they converge, on different shapes.
  - Lina owns the schema (her record; Leonardo consulted), so under the owner rule the pick is hers; the orchestrator routes it to you because the exchange did not settle
- **Options**:
  - **(A) one field**: per platform, `kind: platform | drawn` and a `reason` that names any system-drawn part (Leonardo R3, Lina R2).
  - **(B) one field plus a constrained `platformParts:`**: allowed only for `kind: drawn`, a list of `{ id, reason }`, where `id` is an accessibility identifier the component itself sets; first population one entry, iOS Input-Text-Base's text field (Lina R3, Leonardo R2).
  - **(C) the owner's call**: Lina decides, with Leonardo's counter recorded
- **Leans (not picks)**:
  - (A): Leonardo, because Lina's theming record (#885) fixes the iOS caret and selection at the source, which removes the consumer fact a structured field would describe.
  - (B): Lina, because D5 must find the field to exclude it under either shape, so the served, machine-readable form costs one sub-key more and tells an adopter's agent which pixels our theme does not reach
- **What survives**:
  - Against (A): a prose reason is not machine-read; if #885 stays open past the claim of the family that holds Input-Text-Base, agents can see the gap only in prose.
  - Against (B): a schema field whose only use is one component on one platform, and its guard against over-claiming is a read at the claims pass, not a test

###### P-14 *(the orchestrator decides whether it joins the batch)* (order 9)

- **RULED** 2026-11-28: (b) ("Answered so far", above). The options below are kept as they were asked.
- **Question**: **Web render evidence** (Sparky R1): your "will successfully render" names no platform, and web's evidence is a name check plus jsdom contract tests
- **Options**:
  - (a) a web render lane in 132;
  - (b) a Sparky-owned record placed later, alongside 128, with 132 keeping the contract-validation format keyed by platform;
  - (c) none
- **Leans (not picks)**: (b): Sparky
- **What survives**: A native-only format makes a later web lane pay a retrofit, and you may read the goal as covering web now. Adding evidence changes no promise

###### Only if they arise (expected not to)

- **P-11**, excluding the Dynamic Type audit (a D5 change; every seat leans fix, P-13);
- **P-12**, a D5 or D7 change from T-13: either a labelled device read in place of a CI check, or, if the in-app walk fails on a runtime we test (the 18.x lane, or a later 26.x) and only the static check is left, a new D7 evidence kind such as `static-checked`, so readiness does not over-claim the contract (Stacy R2).
- Under P-6's ruling there is no iOS 17 run; the walk is run on 26.x and on the release-time 18.x lane instead.

###### Later (listed so they are not lost)

- **P-9**, the Android range numbers, after D4 builds, now including `compileSdk` (§ 6);
- **the lane-maintenance fork** (Data R2): once a render lane becomes a required check, an external break blocks every PR until a grant-backed fix merges, so at the first promotion either a per-lane ownership ballot (like `2026-11-07-native-lane-ownership`) or a grant per fix;
- **T-7's RELEASE-FLOW change**, a LAW edit, put to Peter as a ballot when its design is drafted.

###### Not re-asked here (already ruled, carried)

- the two-spec structure ("A yes");
- 129's narrowed sentence and this spec's acceptance ("B (a)");
- D1–D3 ("C yes");
- order (x′);
- the Android minimum, API 26 ("Re: 5, 26"; Core Goals amended by ballot `2026-11-05-core-goals-android-minimum`);
- native changes before the claim ship in minors, with deprecated aliases and D9's diff landing before the claim ("7 (a)");
- required-check promotion by measured stability (129 `tasks.md` § "Decision 6");
- the consumer overlays flip at the support claim, which Peter merges as a cost, not a ruling (plan-r2 § 7's closing list). Under P-2 (**RULED**, (b) with all three conditions), the flip covers consumer Leonardo, the seat that selects components (condition 1), and the flipped text points at served readiness, so later families need no charter edit (condition 2; it needs D7 by the first claim, § 4.4).

**Held elsewhere, not 132's to ask**: #870's colour fork; row 7's re-answer (#864); whether #872's CORRECTION may land from Ada's seat.

##### From § 5.2

*(L603–L784)*

###### 5.2 For the team

###### T-1: The `rendering:` shape

- **State after the cross-read**: **CLOSED** by P-16 (**RULED**, 2026-11-28T04:39:39Z): (C), with Lina's (A), one field, and the guards (§ 5.1). It went to Peter as P-16. Facts both seats agree on:
  - Input-Text-Base on iOS is drawn chrome around a system text field, the only such case in the catalogue (VERIFIED, Leonardo and Lina by grep);
  - Android's caret is ours (`InputTextBase.android.kt` L328);
  - neither platform themes the selection, and iOS does not theme the caret (Lina's record, #885);
  - behaviour stays out of `rendering:`;
  - the component needs one new identifier on the field under either shape
- **Owner**: Lina (Leonardo consulted)
- **Closes at**: closed (P-16); the `.tint` selection check (Kenya) can reopen it before Input-Text-Base's family is claimed

###### T-2: The first family and the adopter component

- **State after the cross-read**: Lina confirms Chip-Base, Chip-Filter, Chip-Input and Icon-Base; a `FilterBar` composing Chip-Filter is the common proposal
- **Owner**: Lina, Leonardo; Kenya, Data
- **Closes at**: tasks round

###### T-3: Tool choices

- **State after the cross-read**: **CLOSED: hand-written `.xcodeproj`** with synchronized folders (Kenya, Data, Leonardo).
  - Kenya measured that adding source files needs no `project.pbxproj` edit, so review churn falls on the creation commit.
  - The fixture states "Xcode 16 or later".
  - Leonardo: create D4's project by doing the walkthrough's steps, and cite its "add local package" hunk.
  - Data: a test checks the project's file list against the fixture folder.
  - The emulator and Robolectric split: both lanes are measured to run (§ 6); ViewInspector is optional (T-13)
- **Owner**: Kenya, Data
- **Closes at**: closed

###### T-4: Where adopter components and their tokens live

- **State after the cross-read**: **CLOSED on (a)**: adopter source in its own module; all generated token groups, the adopter's included, in our module, the same group name replacing ours and reported (Ada, Kenya, Data).
  - The local-path import is VERIFIED on iOS (Kenya, with the `name:` form) and REASONING on Android until D4 builds (Data).
  - Ada's surviving counter stands: a future emitter defect fails our module for every adopter with one custom token, so the fixture guard (§ 4.1) lands before D10
- **Owner**: Ada, Kenya, Data
- **Closes at**: closed; Android's import is confirmed at D4

###### T-5: The theme family's persisted form

- **State after the cross-read**: **CLOSED on the config name** (Kenya moved, Data held):
  - iOS emits explicit raw literals equal to each theme's config `name` (`case highContrast = "high-contrast"`), Android a `key` equal to it with `fromKey`;
  - one string set across platforms;
  - the scheme (system, light, dark) stored separately.
  - Surviving counter: renaming a theme in the adopter's config orphans stored values, so the documentation carries the migration line (unknown key → fall back to `base`) and D9 reports a removed case as breaking.
  - Runtime switching is still D5's
- **Owner**: Kenya, Data
- **Closes at**: the string is closed; switching at `design.md`

###### T-6: D6's known-bad run cadence

- **State after the cross-read**: Stacy: on every PR whose diff touches a contract test, its component's source, the contract baseline or the checker, plus every unit PR and CLOSEOUT
- **Owner**: Thurgood, Lina; Stacy reads
- **Closes at**: tasks round

###### T-7: D7's source

- **State after the cross-read**: **Converging on committed results** (Stacy, Ada):
  - a readiness API read at publish would change what is packed from live state, against the hermetic rule's intent, so the release PR commits a results file measured at a named commit `R`, and the derivation and pack-assert refuse unless `git diff --name-only R..S` lists only that file.
  - The publish script (Ada's) builds the packed readiness from it.
  - It is a change to a ratified instrument (row `hermetic-publish-path`), so it needs its census line, and RELEASE-FLOW's step text is Thurgood's, a LAW edit by ballot (§ 5.1, "Later").
  - Surviving counter (Ada): a re-run after `R` cannot correct the packed readiness without a new release.
  - **Sparky's web column is unanswered**: whether D7 covers iOS and Android only, or which checks web's column derives from
- **Owner**: Ada (the script), Lina (served readiness), Thurgood (RELEASE-FLOW, census); Sparky (web's column)
- **Closes at**: design round

###### T-8: The readiness tables

- **State after the cross-read**: Lina's answer for requirements: the combined form (generated regions with a byte-equality test, the install-doc pattern), **in one table** in `governance/Component-Readiness-Status.md`, with the family docs pointing at it.
  - Her counter: a family-doc reader makes one more hop, and the pointer conversion has to be sequenced with her fix-now record
- **Owner**: Lina; Thurgood consulted
- **Closes at**: requirements round

###### T-9: The access-level and contract-validation ballots

- **State after the cross-read**: Lina drafts both before 132's requirements open (1–2 sessions).
  - The contract ballot carries P-4's list, the per-platform oracle lines (T-13) and an unchanged web text (Sparky);
  - the access ballot carries Data's explicit-API input and names Q12's binding names public (Ada)
- **Owner**: Lina (Kenya, Data, Thurgood, Stacy as each record names)
- **Closes at**: before 132's requirements

###### T-10: D9's tools

- **State after the cross-read**:
  - Source compatibility is the break an adopter meets (Leonardo);
  - D9 (1), compiling the previous release's app and samples, is the oracle;
  - the dump tools are early warning, each shown to bite on a removed symbol and a renamed parameter;
  - read as an API-surface diff (Data);
  - covers the generated token API (Ada);
  - treats a family's arrival as an addition and opt-in-marked API as not yet promised (Data, `nonPublicMarkers`, version UNVERIFIED)
- **Owner**: Kenya, Data; Leonardo; Ada
- **Closes at**: design round

###### T-11: The "Native status" passage at this merge

- **State after the cross-read**: **CLOSED: no change at this merge** (Kenya, Data)
- **Owner**: Kenya, Data
- **Closes at**: closed

###### T-12: Fixed font sizes and Dynamic Type

- **State after the cross-read**: **30 calls in 18 files** (VERIFIED by four seats).
  - Lina classified them by what they pass as `size:`: 10 a typography semantic's `fontSize`, 9 a primitive (the three chips among them), 9 a component-computed size, 2 literals (one in preview code, one production `14`, a defect in #885).
  - **The settlement** (Ada, Lina, Kenya, Leonardo): the text style lives in the token as a scale role, and the 20 calls that read no semantic move onto typography semantics, with new tokens where none fits (P-13).
  - Kenya measured that the scaled forms clear `performAccessibilityAudit(for: .dynamicType)` on iOS 26.0
- **Owner**: Ada (tokens), Lina (components), Leonardo; Kenya
- **Closes at**: P-13 (**RULED**); then design round

###### T-13: How a "hidden from VoiceOver" contract is checked

- **State after the cross-read**: **Converged on evidence.**
  - iOS: the **in-app walk** in the D4 app, run inside a UI-test session, asserting the decorative label is absent from the accessibility elements, with the known-bad twin (the same view without `.accessibilityHidden(true)`) asserting it present.
    - Kenya measured it: 3 elements hidden against 5 visible, in two runs, while XCUITest's own counts were equal in both variants.
    - That falsifies her R1 runtime count and explains her 129 zero-element finding (no accessibility client attached; REASONING).
    - Lina's R2, which predates the measurement, moved to Kenya's R1 static check; the measurement satisfies Stacy's rule that an oracle is one whose known-bad twin fails, so Lina's confirmation is a formality, owed in the design round.
    - The static check becomes optional.
  - Android (Data, Lina): for Icon-Base, `contentDescription = null` means no image node or description in the merged tree, with a non-null description as the known-bad twin; a hidden-subtree contract uses the semantics property instead; the validation line names the mechanism the contract states.
  - Kenya's walk measurement is local and **must be committed to #879's evidence** before the design round rests on it (Stacy); she runs it again on the 18.x lane once it exists
- **Owner**: Kenya, Lina; Data for Android; Stacy reads
- **Closes at**: design round

###### T-14: One module, many families

- **State after the cross-read**: **CLOSED on (ii), a family-scoped manifest** (Ada, Kenya, Data; Leonardo for the consumer reading).
  - The closure list per family is data `generate` reads (Chip → Icon-Base, the blend helper, the tokens);
  - component-token groups follow the same filter (Ada);
  - the harness gains a context or case that compiles each included set alone at zero errors, without which Ada would rather have (i);
  - the blend helper is a shared cost.
  - **Still open inside it: the inclusion threshold.**
    - Ada: the committed compile state (zero pinned entries in `harness/expected/*.tsv`), decidable from git and independent of D7.
    - Leonardo: the adopter's default manifest admits **claimed** families only, with a compile-tier set opt-in behind a flag for our own lanes, a ratchet (a claimed family never leaves), and one readiness source shared with D7, the overlays and T-18.
    - Which one holds decides P-7's not-claimed question.
    - Data names a third shape, not picked: one module or target per family with declared dependencies
- **Owner**: Ada, Kenya, Data; Leonardo
- **Closes at**: the threshold in the design round (P-7, **RULED**: part 2 stays here)

###### T-15: CI grants for 132's lanes

- **State after the cross-read**: **CLOSED on (a), with Kenya's lane design**:
  - each lane's workflow (iOS render, Android render, D4 build, D8 samples, D9 upgrade and diff, P-9's range builds, and **the release-time iOS 18.5 or 18.6 run on `macos-15`** that P-6's ruling adds; whether that image's Xcode 26.3 runs 18.x is UNVERIFIED) is written once, data-driven, reading the family list from a file under `harness/` or the fixture directory, as `harness/pins.yaml` already does (#867 moved a pin with no workflow edit).
  - Grants are then per lane, about six or seven, concentrated at the first family and near the claim (Kenya, Stacy), and per unit only for a unit that edits a workflow (Data).
  - A grant record can ride the unit's tasks-round PR, which Peter merges anyway, so it adds no Peter merge (Data's reading of README rules 8 and 10; Thurgood agrees, `[THURGOOD R3]`; Stacy's ARMING reads still run at two merges).
  - Surviving counter (Kenya): the first family carries five or six grants at once, a burst of merges and ARMING reads.
  - Stacy's six limits apply if (b) is ever drafted
- **Owner**: Kenya, Data; Stacy
- **Closes at**: closed; the maintenance fork is "Later"

###### T-16: D6's committed evidence

- **State after the cross-read**: Accepted: a committed per-platform summary at each unit merge, per contract: state, test ID, oracle name and evidence kind (Stacy R2), known-bad result, run ID; the 288-contract baseline lands with the checker's first PR
- **Owner**: Thurgood
- **Closes at**: tasks round

###### T-17: The measured-cost record's 131 column

- **State after the cross-read**: Accepted, under Stacy's conditions (§ 3). It is my act, before the first first-family unit PR merges
- **Owner**: Thurgood; one other seat reads the method; Stacy
- **Closes at**: before the first first-family unit merges

###### T-18: A readiness warning at selection time

- **State after the cross-read**: **Owed under P-2** (**RULED**, condition 3): Leonardo's class option, P-2's third condition
- **Owner**: Lina; Leonardo; Thurgood (overlay text)
- **Closes at**: design round

###### T-19: D8's sample contract

- **State after the cross-read**: per-family preludes; a catalog cell built by compiling the served sample
- **Owner**: Leonardo; Kenya, Data
- **Closes at**: tasks round

###### T-20: The fixture's own Android theme and version catalog

- **State after the cross-read**: Data R5 proposes that the fixture's `android/` folder carry its own Material3 theme and version catalog, so the app meets a theme and version pins as a real Android app would. Not put to Peter with P-1, and not ruled
- **Owner**: Data
- **Closes at**: requirements round

###### T-21: What D9 compiles: the previous release's committed catalog, or a regenerated one

- **State after the cross-read**: open. The catalog is regenerated from the committed component list each release, so as an upgrade test a regenerated catalog may pass by construction; a committed previous-release catalog, compiled unchanged, catches removed or renamed symbols but not adopter-style usage (Kenya R8, Data R8, Stacy R8, Leonardo R11). D9's details do not say which (Stacy R8, UNVERIFIED)
- **Owner**: Kenya, Data (D9's tools, T-10); Leonardo; Stacy reads
- **Closes at**: requirements round

##### From § 5.3

*(L786–L795)*

###### 5.3 Scope questions

- **S-1, web build work: CLOSED** (Sparky R1; Leonardo concurs). **On web, 132 adds no build work.**
  - The acceptance sentence's web leg is held by a name check that already exists and ships: Spec 123 Task 6's name contract (`d566b30ff`, #215: the build's own-index check of every `var()` the bundled components reference, and `sync` against the adopter's generated CSS, consumer-integration case C6), Spec 129 Req 1.6 (Consumer Guard, with Task 8.4's `var()` check) and Spec 129's 13.2 component-tier cases.
  - **132's CLOSEOUT re-reads them green at 132's final head.**
  - The item's wording should read "the web components the package ships" (web source is not in `package.json` `files`); the 129 line is `requirements.md` L456.
  - Surviving counter (Sparky): a name check is not a render check; that residual is P-14.
- **S-2, mode-aware component colour** (Ada; Lina): only if Peter picks #870's option (ii). Not asked otherwise.
- **S-3, web render evidence and web authoring** (Sparky R1): P-14.
  - "Build more" (D10, WP6) is native-only while Peter's "use DesignerPunk to build more" names no platform; if anyone reads the goal as covering web authoring, it joins P-14.

##### From § 6

*(L799–L827)*

###### 6. Probes owed during this round

Both probes are owed before the iOS minimum (P-6) and the render tools (T-3) are decided. They are the goal record's obligation (1). The record's Trigger on #868 says obligation (1) "is not a condition of the close". Neither probe is a spec task or a gate (plan-r2 § 2, "Probes").

- **Data's Android render probe, in CI**
  - **State at this draft**: **Passed**, VERIFIED by Data from its runs on #884 (the grant's fixing PR, `f7ea75081`).
    - Run 46040355947, runner image `ubuntu24 20261122.23.1`, about 7.5 minutes:
      - `/dev/kvm` exists, and opens after the documented udev rule ("KVM (version 12) is installed and usable");
      - no licence prompt;
      - downloads of 13 s (emulator), 20 s (API 26 image) and 17 s (API 36 image);
      - boot to `sys.boot_completed` in 35 s at API 26 and 56 s at API 36;
      - the instrumented Compose smoke test passes at both levels (145 s at API 26 including the first build, 33 s at API 36);
      - the Robolectric Compose test passes in 53 s.
    - **One sample**: lane stability is a later read, and KVM can move with the runner image.
    - **A finding for D4 and P-9**: Compose 1.12.1 under the pinned BOM 2026.09.00 needs `compileSdk` 37 for an app or test build, while the harness pins 36. The harness never sees it, because it runs only `compileDebugKotlin`. Moving the harness pin is a choice under ballot `2026-11-07-native-lane-ownership` item 3, by grant or spec row
  - **Where the result is recorded**: the goal record's § "Android render probe result (2026-11-27, Data)", written by #884, with the `render-probe:` lines; the `compileSdk` finding as a dated line on the toolchain-range record. **#884 merged before #880** (`358ca187b`), because #880 archives the goal record (Data R1)
- **Kenya's iOS spike**
  - **State at this draft**: **Ran 2026-11-27 on iOS 26.0.** The iOS 17 part is **moot** since P-6's ruling (its record, #886, is Kenya's to re-rule or close). iOS 18.x evidence comes from the release-time `macos-15` lane, not from a probe
  - **Where the result is recorded**: `.kiro/specs/132-native-components-in-app/evidence/2026-11-27-ios-render-spike/README.md`, on draft PR #879 (head `19a1813e6`, read 2026-11-28T01:41:17Z), with a pointer in the goal record. Kenya's R2 measurements (the T-13 walk, the T-4 adopter module, the T-12 scaled forms, `@_spi`) are owed to #879's evidence

**What Kenya's spike found** (her README as corrected, and her R2; VERIFIED by her on this Mac, Xcode 27.2, iOS 26.0 simulator, deployment target 17.0; not on a CI runner; no DesignerPunk component rendered, because the components do not yet compile at zero in an adopter's module):
- XCUITest works on a plain SwiftUI fixture styled with generated tokens: elements found by identifier, frames non-zero, tap-then-read works. 9 tests, 0 failures, about 48 s.
- XCUITest cannot see accessibility hiding: hidden views are found, with or without an identifier, and its element counts do not change. The in-app walk, run under XCUITest, does see it (T-13).
- The ink check discriminates across base and wcag, light and dark, including UIKit-backed controls, with a known-bad reading exactly 0. Its floor is picked per element class.
- `performAccessibilityAudit` caught 3 of 3 planted defects, reported 0 on clean screens, flags fixed `.system(size:)` fonts and does not flag the scaled forms (T-12).
- An adopter package in `ios/` importing our root package links, with the `.package(name:path:)` form (T-4).
- **Not run**: CI; iOS 18.x; VoiceOver speech, the largest Dynamic Type size and reduce motion.

**What the probes cannot settle** (REASONING): a local spike is a report the claims pass cannot re-run. The first CI run of each render lane is its own measurement: the iOS lane would run Xcode 26.6 on `macos-26`, whose simulator runtimes are UNVERIFIED. Xcode's MCP bridge (plan-r2 § 1 instruments table) is a candidate tool and never an oracle.

##### From § 7

*(L835)*

So **this PR is the carrying event** (`.kiro/issues/README.md` rule 11: a spec answer is carried out when the spec's design outline merges and names the record). This file names the record (§ 4.2, row 1) and no longer carries the placeholder's Status string.

##### From § 9

*(L893–L910)*

###### 9. Fold-back, and what survives

- **Counter-argument**: this outline was seeded before the probes ran, so its D5 tools and P-6 rested on unmeasured runtimes, the gate inversion plan-r2 warned about ("criteria written before the numbers get diluted when the numbers arrive", Stacy).
- **What it changed**: both probes ran inside the round, and they changed the plan:
  - the Android emulator works on free runners (P-8 gone),
  - `compileSdk` 37 joins P-9 and D4,
  - XCUITest cannot see hiding (T-13 changed twice, and settled on a measured oracle),
  - the plain local-package form fails on iOS (T-4's `name:` fix),
  - and one scaled-font API does not exist (P-13's emission).
  - P-6 was ruled on Kenya's and Leonardo's evidence of what free CI can run. No requirement is written before Peter's batch is folded.
- **What survives**:
  - Peter is asked about D4–D10 before a linked app exists on either platform. A D row may need changing after the first family, and that change is his again.
  - The first family is cheap in per-component repair and expensive in shared and cross-cutting costs (§ 2). Splitting the two in the measured-cost record is the mitigation, not a fix, and the record will run slightly high because the family is heavily instrumented (Stacy).
  - T-14 (ii) makes `generate`'s output depend on release readiness, which is new behaviour: an adopter's module changes on upgrade without any change to their config.
  - P-16 reaches Peter as a schema question an owner could have decided. Seats changing position on new arguments is the review working; three crossings on the same facts is a cost of parallel rounds that the orchestration owns.
  - Every seat is one model family. What carried weight this round was measurement: three seats' greps corrected two counts, and Kenya's runs falsified two of her own earlier claims.
  - P-6's floor of 18 holds evidence-wise only while a free image carries an 18.x runtime; after that the gap returns one version up (Leonardo R4).
  - Under (x′), 132 stays open across 131's process-law change, which this project has not done before (plan-r2 § 10).

#### [KENYA R10]

Read at `683188c44`; records at `origin/main`.

**1. Yes, apart from three gaps.**
- **Only in R20**: "The fixture states 'Xcode 16 or later'" (feedback L3969). It belongs in T-3, because it is a requirements input.
- **Stale**:
  - The T-13 walk is already committed to #879 (`b6c918828`, README § 4).
  - #879 is now ready for review at `766eb242d`, not a draft at `19a1813e6`.
  - So the T-13 lines at L310, L349 and L370 need updating (VERIFIED).
- **A conflict**: L130 fixes the iOS 18 run on `macos-15`. Item A of the iOS 18 floor record leaves the runner open: `macos-15`, or `macos-26` with a downloaded runtime (VERIFIED).

**2. Correct and complete.** One correction of my own: my `766eb242d` note on #879 calls the iOS 17 record "closed". It is archived but has no outcome line (VERIFIED), so the close is still owed, as L241 says.

**3. Rule-10 records to file (proposed, not filed)**
- **`.kiro/issues/2026-11-28-ios-swift-6-language-mode-for-components.md`**
  - **Trigger**: `path:.kiro/specs/132-native-components-in-app/requirements.md`
  - **Obligation**: the root manifest sets Swift 6 language mode for our module. D4 proves that it builds and that the adopter's mode stays the adopter's.
- **`.kiro/issues/2026-11-28-ios-pre-claim-minimum-wording.md`**
  - **Trigger**: `release:16.4.0:phase-1`
  - **Obligation**: the iOS minimum that shipped 16.x text states between the Core Goals ratification and the first claim. Today that text says 17.0, while Core Goals says 18.0. The 17.0 reading is UNVERIFIED in the shipped files; it comes from the archived iOS 17 record's Class line and from item E of the floor record.

#### [DATA R10]

Read at `683188c44`. Compared against `e167dba9c` and the feedback doc.

**1. Mostly yes.** The outline carries R8 release builds (L81) and P-3's emulator reads (L69, L287). It also carries `compileSdk` 37 and the API-26 floor test, through #881 (L257; the record holds `NewApi` and the 37 finding, VERIFIED). My blend points from R6 and R9 are now 133 U1's: it deletes the native blend files (L139, L299). Two items survive only in the feedback doc's `[DATA R6]` (VERIFIED by grep: not in the new outline, the old outline or #881):
- **Icon-Base's 48 drawables have no prefix.** Renaming them after the claim is a break. This belongs in § 2's public-API line, owned by Lina with Data verifying.
- **Whether raising a toolchain floor is a major.** This belongs in #881 as item 3, mine to append, decided with P-9.

**2. Correct but incomplete.** L311, "with Kenya, the goal record's close and the real-app record; T-20", is right. Please add: "append the floor-raise rule to #881 (item 3)".

#### [LINA R13]

Read `design-outline.md` at `683188c44` against `e167dba9c`, and `[THURGOOD R20]`.

**1. Does the outline still carry everything I act on? Yes, with four gaps.** My D-rows, records, ballots and T-items are all there (L102–128, L222–243, L258, § 5.1 "Lina", T-8, T-9, T-18). These four facts have no home in the outline or in a record:
- **Chip-Filter's selected-and-pressed state is wrong on every platform.** Native fades the chip (`.opacity(0.9)`); web keeps the rest colour. This is only in my consult answers. Fold it into the web defect record I owe.
- **Icon-Base's ΔL range cannot be met on white.** This is only in my answers. It joins the contract-range act (P-7, item 4).
- **The native chips' motion does not match their contract** (`duration150` and button-press motion, where the contract names `selectionTransition`). This is only in my R5. Either the drift record takes it, or I file a record.
- **L149's "belongs in 128's inbound list" names no owner.** It is mine, as a rule-10 record for 128.

**2. Is my owed-acts list correct?** It is correct but incomplete. Add:
- my T-13 confirmation, which the T-13 line already names but my list leaves out;
- the 128 record above.

**Thurgood's R18 question: is T-1's identifier still owed? No.** It existed so the render lanes could find the system text field and skip it. Under (A), the lanes check every drawn component whole, so nothing is skipped. If D6's contract tests need to reach the field, they add it as test work in that family's unit. If the `.tint` check fails and (B) reopens, the identifier comes back with it. T-1's line can say this.

#### [ADA R14]

Read at `683188c44`, against `e167dba9c`.

**1. Carried? Yes, with one gap.** The record Stacy R5 proposed is in neither § 5.1 nor a record: chips keep the light `white200` surface on the dark canvas (Ada, with Leonardo on whether it is intended). Add it to my § 5.1 line. The forecast column dropping out with the pivot is correct. The alias scope detail ("`DesignTokens`, the theme types, `ComponentTokens` itself") is now only in R20, and record (c) below carries it.

**2. My § 5.1 owed acts: correct.** Add the dark-surface record above.

**3. Rule-10 records to file** (none is held elsewhere: a grep of `.kiro/issues` finds only the goal record):
- **(a)** `.kiro/issues/2026-11-28-q12-q13-type-table-provisional-until-d4.md`
  - Trigger: `path:.kiro/specs/132-native-components-in-app/design.md`
  - Obligation: D4 shows the fixed binding names read from the adopter's module, Q13 through the adopter theme, and the type table on the primitive path. D10 covers the component-token path, and a unit test covers the provider-name clash.
- **(b)** `…-generate-native-manifest-conditions.md`
  - Trigger: `path:…/132-native-components-in-app/requirements.md`
  - Obligation: requirements carry the manifest's three conditions, plus D10's same-name `.kt` case proving `reservedKotlinPackages.ts`.
- **(c)** `…-deprecated-aliases-and-public-api-diff-before-claim.md`
  - Trigger: the same `requirements.md`
  - Obligation: alias emission for the whole shared token surface, and D9's diff, landing before 17.0.0.

#### [LEONARDO R13]

Read: outline at `683188c44`, `[THURGOOD R20]`, the old outline at `e167dba9c`, and `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md` on `main`. Every point is VERIFIED by grep unless marked.

**1. Mostly carried.** My docs duties for the iOS minimum sit in the #888 record (items B–C), which § 4.3 points to. The T-14 inputs (the ratchet, one readiness source) sit in R20, which § 5.2 points to. Both are fine.

Now only in history:
- **My clean-room build before the first per-family announcement** (my R6). The feedback doc logged it as "Open, not folded" (feedback L2083), and it was never asked or listed. It belongs in § 4.4 or under my owed acts.
- **Holding a claim also holds D7's served readiness flip** (my R9). § 4.4 lists D7's derivation but not this tie.

**2. The four acts are correct but incomplete.** Add:
- the support-claim text as a whole, not only its colour line (Stacy R4: "the text itself is Leonardo's");
- the clean-room build;
- **conditional**: Kotlin `@RequiresOptIn` ERROR or WARNING, if T-14 picks the compile tier.

One fix as well: in § 4.4, "D7's derivation … Leonardo" reads as if I own it. Ada owns D7 (§ 2, L119); I am only the source of the condition.

**3.** Does not apply to me.

#### [STACY R9]

Read at `683188c44`, against `e167dba9c` and `[THURGOOD R20]`.

**1. What my LENS and CLOSEOUT reads rely on: present** (VERIFIED, grep). These are:
- the D-row change list (§ 1 L64) and the ruled D4/D10 text;
- "What stays a reading";
- the measured-cost record's form (§ 3), whose 133 column the pivot dropped by ruling;
- T-6, T-17 and T-21;
- P-3's read fields, by pointer to Stacy R7;
- the real-app SYMPTOM read (§ 1 L70);
- ARMING on the lane grants (§ 2).

Two items are now only in history:
- **The web chips' P0 reading.** Leonardo R9 and my R5 read the served text "consistent state styling (default, hover, pressed)", under `production-ready`, as a P0. The pivot moved the fix to 133 U1. Nothing carries the class, the disclosure, or Peter's waiver ahead of the next release's S. Lina's record should carry the class. Confirming or disputing the P0 reading is my act, and it goes to Peter.
- **The claim names only the claimed components, with D10's adopter component left out** (Stacy R4). Today it sits only in the feedback doc's L2239. It belongs in § 4.4, or in Leonardo's owed acts beside the colour line.

**2. My owed acts**: correct. To complete them, both are SYMPTOM-class passes with committed records, due by 132's requirements round. A third needs adding: the P0 read above.

#### [PETER] web P0

*Recorded by Thurgood, 2026-11-28. Peter's words, from the orchestrator's relay; the receipt time is the orchestrator's `date -u`.*

- **What he was asked**, after `[STACY R9]` (spliced above):
  - **The facts**: 12 web components are served as production-ready with "consistent state styling (default, hover, pressed)". On web they have not darkened since v12.0.0, which makes this a P0 by our definition. The proper fix is now 133 U1.
  - **His earlier conditional**: he agreed (2026-11-28T03:22:59Z), as the orchestrator relays it, that "Lina should fix it first and leave the text alone, if the fix is quick". The other half: if it cannot ship quickly, correct the text instead.
  - **The options**: (a) accept it as a known defect until U1, recording his waiver and keeping the served text unchanged; if 16.4.0 ships before U1, its release notes carry one known-issue line, and U1's notes close it. (b) Correct the served text now to "border change only on web", then change it back at U1. (c) Hold 16.4.0 until U1.
  - **The orchestrator's recommendation**: "(a). It's honest at release time, with no back-and-forth in what we serve."
  - **What survives**: agents read the served text, not release notes, so until U1 an adopter's agent still assumes hover and pressed styling. Leonardo earlier preferred correcting the text.
- **Received**: 2026-11-28T04:54:20Z, quoting the recommendation line. **Verbatim**: "Agreed."
- **What is ruled**: (a). The P0 class is confirmed and waived by Peter until 133 U1, with the served text unchanged. If 16.4.0 ships before U1, its release notes carry one known-issue line, owed by the RELEASE-FLOW walk owner at 16.4.0.

#### [THURGOOD R21]

- **Spliced byte for byte**, in the collation's order: `kenya-reshape-check.md` (`[KENYA R10]`), `data-reshape-check.md` (`[DATA R10]`), `lina-reshape-check.md` (`[LINA R13]`), `ada-reshape-check.md` (`[ADA R14]`), `leonardo-reshape-check.md` (`[LEONARDO R13]`), `stacy-reshape-check.md` (`[STACY R9]`).
- **The fix pass**, each item restored to its section in design-outline.md, with the seat's words winning over the collation:
  - Kenya: "Xcode 16 or later" in T-3; the T-13 walk committed (`b6c918828`, README § 4) and #879 ready at `766eb242d`, in § 5.1, T-13 and § 6; the release-time iOS 18.x runner left open, as item A of #888's record leaves it, in § 2, T-15 and § 9;
  - Data: Icon-Base's 48 unprefixed drawables in § 2's public-API line (Lina; Data verifies); the floor-raise rule as #881's item 3 in his owed acts;
  - Lina: Chip-Filter's selected-and-pressed state, folded into her web defect record (her words, over the collation's "slice row"); Icon-Base's ΔL range on white, joining the contract-range act; the chips' motion, to the drift record or her own; the 128 note's owner and record; her T-13 confirmation; T-1's identifier not owed under (A);
  - Leonardo: the clean-room build, as his proposal for the requirements round (it was never put to Peter); the claim holding D7's served readiness flip, in § 4.4; the whole support-claim text and the conditional `@RequiresOptIn` call in his owed acts; D7's owner named as Ada in § 4.4;
  - Ada: the dark-canvas `white200` chip-surface record in her owed acts. The alias scope goes into her record (c);
  - Stacy: "the claim names only the claimed components" in § 4.4; her two acts are SYMPTOM-class passes with committed records, due by 132's requirements round.
- **The web P0**: recorded as `[PETER] web P0`, above, and as a ruling line in design-outline.md § 5.1. It replaces the placeholder the brief first asked for, now that Peter has ruled. Stacy's third act, the P0 read she owed Peter, is answered by his ruling.
- **Records**: in the next commit, under rule 10.

#### [THURGOOD R22]

*2026-11-28. Rule-10 records for the owed acts (`.kiro/issues/README.md` rule 10; Stacy R6: "a plan line alone is a finding").*

**The shape: one record per trigger, as #888's `2026-11-27-ios-18-floor-132-owed-acts.md` does, filed by the seat that recorded the rulings, with each item naming its seat.** Those records hold the acts Peter's rulings created. Three are filed in this commit:

| Record | Trigger | Holds |
|---|---|---|
| `.kiro/issues/2026-11-28-spec-132-sitting-2-owed-acts.md` | `path:.kiro/specs/132-native-components-in-app/requirements.md` | P-4's reason classes, re-sort and checker (Lina; Thurgood); P-16's validator (Lina) and `.tint` check (Kenya); P-13's `.fontWeight` check (Kenya), Android small-text fix (Lina), AX5 check and two usage lines (Leonardo), and the two `segment*` tokens and the Token-Family-Typography ballot (Ada); the claim text (Leonardo); two SYMPTOM passes (Stacy); the clean-room build, as Leonardo's proposal |
| `.kiro/issues/2026-11-28-spec-133-intake-from-132-pivot.md` | `path:.kiro/specs/133-color-track/requirements.md` | the 132↔133 state-token handoff (Ada, Lina); the contract ranges in OKLCH, with Icon-Base's on white (Lina); #885 in U1 (Ada, Lina); Peter's token sitting (Ada); the blend record's correction (Ada); `InteractionStateAudit.test.ts` (Thurgood, with Ada and Stacy); enforcement last (Lina) |
| `.kiro/issues/2026-11-28-main-releasable-as-16x-until-17-0-0.md` | `tag:v17.0.0` | P-7 item 2's standing rule, with Thurgood as its proposed owner; the priorities § 7 row; whether RELEASE-FLOW needs step text (a ballot if so) |

**Ada's three and Kenya's two proposed records: their owners file them; they are not folded in.** Why:
- they are obligations the 129 inbounds passed down, not acts created by this sitting's rulings, so rule 10's same-PR duty for the rulings does not reach them;
- each owner drafted the text and chose a trigger for it (Ada (a) at `design.md`, Kenya's wording record at `release:16.4.0:phase-1`); a per-trigger record of mine would make me the editor of their body text under rule 9.

What survives: five records where folding would give two, and each must be on this branch before the close commit, which costs a brief per owner.

**Records other owners file on this branch before Kenya and Data's close commit.** Each needs `**Owner**:`, a one-token `**Trigger**:` and a `**Class**:` line (README rules 1 and 12). Paths, triggers and obligation text are proposals; the owner decides.

- **Ada**
  - (a) `.kiro/issues/2026-11-28-q12-q13-type-table-provisional-until-d4.md` — `path:.kiro/specs/132-native-components-in-app/design.md` — D4 shows Q12's fixed binding names reached and read from the adopter's module (the access-level ballot names them public), Q13 through the adopter theme, and the native type table on the primitive path; D10 proves the component-token path; a unit test covers the default-name provider clash D4 will not see (Ada R1, R14).
  - (b) `.kiro/issues/2026-11-28-generate-native-manifest-conditions.md` — `path:.kiro/specs/132-native-components-in-app/requirements.md` — requirements carry the manifest's three conditions: `generate` writes the root `Package.swift` only when it is absent or carries our header, otherwise it stops with a message; writing outside `output` needs per-platform paths and a `COMMIT-POLICY.md` entry; the adopter's component module imports ours as `.package(name: "DesignerPunk", path: …)` on iOS. Also D10's same-name `.kt` case proving `src/cli/shared/reservedKotlinPackages.ts`.
  - (c) `.kiro/issues/2026-11-28-deprecated-aliases-and-public-api-diff-before-claim.md` — `path:.kiro/specs/132-native-components-in-app/requirements.md` — deprecated-alias emission for the whole shared token surface (`DesignTokens`, the theme types, `ComponentTokens` itself), and D9's public-API diff, landing before 17.0.0 (Peter's "7 (a)").
  - (d) `.kiro/issues/2026-11-28-typography-label-names-nonexistent-token.md` — proposed `release:16.4.0:phase-1` — `src/tokens/semantic/index.ts` L569 recommends `'typography.label'`, which does not exist (Ada R3).
  - (e) `.kiro/issues/2026-11-28-chip-surface-white200-on-dark-canvas.md` — proposed `path:.kiro/specs/133-color-track/requirements.md` — the chips keep the light `white200` surface on the dark canvas; Leonardo judges whether it is intended (Stacy R5, Ada R14).
- **Kenya**
  - (1) `.kiro/issues/2026-11-28-ios-swift-6-language-mode-for-components.md` — `path:.kiro/specs/132-native-components-in-app/requirements.md` — the root manifest sets Swift 6 language mode for our module; D4 proves it builds and that the adopter's mode stays the adopter's (Kenya R10).
  - (2) `.kiro/issues/2026-11-28-ios-pre-claim-minimum-wording.md` — `release:16.4.0:phase-1` — the iOS minimum shipped 16.x text states between the Core Goals ratification and the first claim; today the text says 17.0 while Core Goals says 18.0 (the 17.0 reading UNVERIFIED in the shipped files; Kenya R10).
  - (3) The archived `.kiro/issues/archive/2026-11-27-ios-17-runtime-probe-owed.md` has no outcome line. An archived file's content is immutable (rule 2), so her choice is rule 4's move back to the root with an outcome line and then rule 5's close, or another route she names.
- **Kenya and Data**: the real-app record, filed in the close commit itself — proposed `.kiro/issues/2026-11-28-real-app-first-build-read.md` — `manual` — when Peter's own app first builds against a release, a dated read; evidence, not a gate; Stacy reads it as a SYMPTOM-class claims audit against what D4 claims. It carries Data's and Stacy's counter: no forcing date.
- **Data**: append item 3 to `.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md` — whether raising a toolchain floor counts as a major, decided with P-9 (Data R10). The record's existing trigger stands.
- **Lina**
  - (1) `.kiro/issues/2026-11-28-web-state-colours-do-not-darken.md` — `release:16.4.0:phase-1` — **`**Class**: P0 false-claim · defect`**. Twelve web components are served as production-ready with "consistent state styling (default, hover, pressed)" and have not darkened on web since v12.0.0. The tests' known-bad gap: the helper tests use only hex, and the component tests never load the token CSS. Chip-Filter's selected-and-pressed state is wrong on every platform. The fix is 133 U1. **Peter's waiver**, quoted and dated: received 2026-11-28T04:54:20Z, "Agreed.", to "(a). It's honest at release time, with no back-and-forth in what we serve." The P0 is confirmed and waived until 133 U1, with the served text unchanged. If 16.4.0 ships before U1, its release notes carry one known-issue line, written by the RELEASE-FLOW walk owner at 16.4.0; U1's notes close it.
    - **A caution for the 16.4.0 walk** (RELEASE-FLOW item 3a): every floor-class row goes to Peter in that release's batch, and a waiver counts "only if quoted and dated, from outside the diff". Whether his 2026-11-28 answer stands as 16.4.0's waiver, or he must answer again in that batch, is UNVERIFIED. The walk author decides at 16.4.0 and says which.
  - (2) `.kiro/issues/2026-11-28-android-nav-segmentedchoice-fixed-dp-height-on-sp-text.md` — proposed `path:.kiro/specs/132-native-components-in-app/requirements.md` — `.height(segmentHeightDp)` in fixed `dp` while the text is in `sp`, so large font scales probably clip the segments today (Lina R4).
  - (3) `.kiro/issues/2026-11-28-adopter-components-served-without-evidence-until-128.md` — proposed `path:.kiro/specs/128-react-react-native-platform-admission/requirements.md` — until 128 lands, agents see adopter components in the application MCP beside ours with no evidence of the bar (Lina).
  - (4) The native chips' motion against their contract (`duration150` and button-press motion, where the contract names `selectionTransition`): appended to `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md`, which is hers, or a record of its own (Lina R13).
  - (5) Dated pointers in the Source lines of #877's three records, which cite the placeholder's L7 and L33 (rule 9). These are edits to her own records, not new records.
- **Sparky**: `.kiro/issues/2026-11-28-web-render-evidence-alongside-128.md` — proposed `path:.kiro/specs/128-react-react-native-platform-admission/requirements.md` — P-14's record: web's render evidence placed alongside 128, with 132 keeping the contract-validation format keyed by platform (Peter, 2026-11-28T04:40:39Z, "(b)").

---

## Requirements Feedback

*(Opens with the requirements phase, in `feedback/requirements.md`.)*
