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

---

## Requirements Feedback

*(Opens with the requirements phase, in `feedback/requirements.md`.)*
