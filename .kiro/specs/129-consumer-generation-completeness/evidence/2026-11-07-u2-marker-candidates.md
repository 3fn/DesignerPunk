# Task 7 / 7.1: candidate limitation markers in the install region (prep only, nothing edited)

Written 2026-11-07 by Thurgood (Sonnet), unit branch `task/129-comparator-guard-markers` @ `7aed9c5aa`. Source: `governance/DesignerPunk-Integration-Guide.md` L21-L272 (the install region) @ `45f5262ee`. Rows are design-outline.md § 3's row numbers (the numbering tasks.md uses: "row 15", "row 21"). Every record path below was checked to exist at the issues root (not `archive/`) at `74d7566f5`; every quoted sentence was matched against the guide's line by script.

**What I need back**: for each entry, confirm, move or drop the row; for Q1 and Q2, a ruling on the marker shape. No `governance/**` file has been edited.

## Counts

- Sentences whose primary row is **Ada's**: **16** (A1-A16; rows 1, 2, 3, 4, 6, 19).
- Sentences whose primary row is **another owner's**: **1** (B1; row 23, Kenya and Data).
- Sentences with a co-fixing row owned by **Lina** (row 15): **2** (A8, A13; their primary row is Ada's, so they are also counted above).
- Sentences read and **not** proposed for a marker are listed at the end, including one that is already false on main (a rewrite for Lina, not a marker).

## Candidates

### A1 · guide L23 · primary row 2 · **ADA**
- **Sentence**: "On web, a custom theme you register in `designerpunk.config.ts` does not change your generated output yet;"
- **Row 2 record**: `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` — owner: Ada
- **Confidence**: high
- **Note**: Item (i), theme emission. "light and dark mode work" in the same sentence is not a limitation.

### A2 · guide L91 · primary row 19 · **ADA**
- **Sentence**: "But part of your copy is not read yet."
- **Row 19 record**: `.kiro/issues/2026-10-15-123-palette-read-from-package.md` — owner: Ada (Thurgood owns only the install-doc sentence)
- **Confidence**: high
- **Note**: The sentence and the list that follows it ("`generate` takes the following from the installed package ... does not change your output yet: the colour palette; ...") are the six groups the record says to take (design-outline.md row 19: "take INSTALL L77's six groups"). Marker after the list sentence, not after the 6-word one.

### A3 · guide L94 · primary row 1 · **ADA**
- **Sentence**: "One of its four checks, mathematical relationships, currently fails even on unmodified token source, so `validate` exits non-zero; that is a known defect in the checker, not in your tokens."
- **Row 1 record**: `.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md` — owner: Ada
- **Confidence**: high
- **Note**: The record's own Class line says "the consumer install guide ships a sentence apologizing for it".

### A4 · guide L98 · primary row 2 · **ADA**
- **Sentence**: "`DesignTokens.ios.swift` — Swift constants (no theme surface yet; see § Platforms › iOS)"
- **Row 2 record**: `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` — owner: Ada
- **Confidence**: high
- **Note**: tasks.md Conventions: "INSTALL L84–L85 ('no theme surface yet') ride the first such PR after U6 (Kenya R1)". These are the guide's L98 and L99.

### A5 · guide L99 · primary row 2 · **ADA**
- **Sentence**: "`DesignTokens.android.kt` — Kotlin constants (no theme surface yet; see § Platforms › Android)"
- **Row 2 record**: `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` — owner: Ada
- **Confidence**: high
- **Note**: As A4.

### A6 · guide L111 · primary row 19 · **ADA**
- **Sentence**: "The exceptions above still apply: the colour palette, the dark and WCAG override maps, the opacity in composed colours, the motion and layering tokens, the font-size and line-height values behind icon sizes, and the DTCG/Figma export all come from the installed package, so the next `generate` after an update can change them."
- **Row 19 record**: `.kiro/issues/2026-10-15-123-palette-read-from-package.md` — owner: Ada (Thurgood owns only the install-doc sentence)
- **Confidence**: high
- **Note**: Second statement of the same six groups as A2.

### A7 · guide L158 · primary row 2 · **ADA**
- **Sentence**: "**A theme you register in `designerpunk.config.ts` does not yet produce a `[data-theme="<name>"]` block in any generated CSS.** A custom `data-theme` value resolves against nothing yet."
- **Row 2 record**: `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` — owner: Ada
- **Confidence**: high
- **Note**: Web half of item (i). Sparky is consulted on the web form in Task 14.6 (tasks.md parent 14); the record is Ada's.

### A8 · guide L164 · primary row 2 · **ADA**
- **Sentence**: "they read a theme surface (`@Environment(\.dpTheme)`, `any DesignerPunkTheme`) under names fixed to DesignerPunk's own configuration, which no shipped file defines and your `npx designerpunk generate` does not emit"
- **Row 2 record**: `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` — owner: Ada
- **Also row 15**: `.kiro/issues/2026-09-26-native-component-theme-hardcoding.md` — owner: Lina (Kenya, Data verify)
- **Confidence**: high for row 2, medium for row 15
- **Note**: Two rows fix two halves: row 2 (U6, emission) makes the surface exist; row 15 (U7, Lina) removes the hardcoded names. The sentence stays true until BOTH land. See design question Q1.

### A9 · guide L168 · primary row 4 · **ADA**
- **Sentence**: "`DesignTokens.ios.swift` also calls a `Color.oklch(...)` initializer (and a bare `oklch(...)`) that no shipped file defines and the package does not declare as a dependency."
- **Row 4 record**: `.kiro/issues/2026-10-03-native-generator-findings-for-spec-129-intake.md` — owner: Ada
- **Confidence**: medium-high
- **Note**: Row 4 is "native-generator findings", item 1 (Kenya's OKLCH dependency: "Either declare the OKLCH dependency or emit native colour literals"). Row 8 (primitive values do not match declared type) might also touch colour construction; I did not read it for this.

### A10 · guide L169 · primary row 4 · **ADA**
- **Sentence**: "Product tokens that reference a theme-varying token are emitted into `ProductTokens.ios.swift` as an extension on `<YourName>Theme`; nothing defines or generates that type."
- **Row 4 record**: `.kiro/issues/2026-10-03-native-generator-findings-for-spec-129-intake.md` — owner: Ada
- **Also row 2**: `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` — owner: Ada
- **Confidence**: medium-high
- **Note**: Row 4 item 3 is exactly this ("product tokens that reference theme-varying tokens emit code against a theme type ... nothing defines"). Row 2 emits the type, so it is the alternative.

### A11 · guide L170 · primary row 3 · **ADA**
- **Sentence**: "it refers to `SizingTokens`, `SpacingTokens` and `BorderWidthTokens`, which no shipped file defines."
- **Row 3 record**: `.kiro/issues/2026-08-13-component-token-platform-references-noncompiling.md` — owner: Ada
- **Confidence**: high
- **Note**: The record names those three types in its title and body.

### A12 · guide L171 · primary row 2 · **ADA**
- **Sentence**: "Native token output omits the **14 theme-varying semantic colours**, among them `colorActionPrimary` and `colorStructureCanvas`."
- **Row 2 record**: `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` — owner: Ada
- **Confidence**: high
- **Note**: Row 2's body: the removal half strips "14 semantic colo[urs]".

### A13 · guide L177 · primary row 2 · **ADA**
- **Sentence**: "read their theme from `LocalDPTheme`, which nothing in this package defines and `generate` does not emit today"
- **Row 2 record**: `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` — owner: Ada
- **Also row 15**: `.kiro/issues/2026-09-26-native-component-theme-hardcoding.md` — owner: Lina (Kenya, Data verify)
- **Confidence**: high for row 2, medium for row 15
- **Note**: Android twin of A8; same design question Q1. The rest of the sentence ("and there is no Gradle module. Native onboarding is not supported.") belongs to Spec 132 and takes no marker.

### A14 · guide L182 · primary row 2 · **ADA**
- **Sentence**: "Native token output omits the same **14 theme-varying semantic colours**, among them `color_action_primary` and `color_structure_canvas`. Only `_wcag` variants of some of them are emitted."
- **Row 2 record**: `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` — owner: Ada
- **Also row 4**: `.kiro/issues/2026-10-03-native-generator-findings-for-spec-129-intake.md` — owner: Ada
- **Confidence**: high for the first sentence, medium for the second
- **Note**: The `_wcag` clause may be row 4 item 2 (WCAG override lines emitted in CSS `oklch(…)` syntax). I have not checked that the clause describes that defect.

### A15 · guide L183 · primary row 4 · **ADA**
- **Sentence**: "Product tokens that reference a theme-varying token are emitted as a read of `Local<your abbreviation>Theme`, which nothing defines."
- **Row 4 record**: `.kiro/issues/2026-10-03-native-generator-findings-for-spec-129-intake.md` — owner: Ada
- **Also row 2**: `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` — owner: Ada
- **Confidence**: medium-high
- **Note**: Android twin of A10.

### A16 · guide L185 · primary row 6 · **ADA**
- **Sentence**: "the generated Kotlin calls `Oklch(…).toComposeColor()`, which needs the colormath library (github.com/ajalt/colormath), and the file imports nothing, so you add the dependency and the imports yourself."
- **Row 6 record**: `.kiro/issues/2026-10-20-kotlin-output-no-import-block.md` — owner: Ada
- **Also row 4**: `.kiro/issues/2026-10-03-native-generator-findings-for-spec-129-intake.md` — owner: Ada
- **Confidence**: high
- **Note**: The record quotes the older INSTALL sentence ("the file imports nothing, so you add the dependency and the imports yourself"). Row 4 item 1 (OKLCH dependency) is the co-fixer for the colormath half.

### B1 · guide L192 · primary row 23 · **OTHER OWNER**
- **Sentence**: "Nothing in DesignerPunk's own checks builds Swift or Kotlin yet."
- **Row 23 record**: `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` — owner: Kenya, Data (designers); Ada, Lina (verified parties)
- **Confidence**: low
- **Note**: Row 23 is the harness itself. U1 merged (#707) and the native-harness contexts compile Swift and Kotlin on pull requests, so this sentence is probably already false on main. A rewrite, not a marker: it is inside the "Native status" passage that Req 15.5 gives Kenya and Data as a CORRECTION edit (Task 18). Row 23 is still at the issues root.

## Read and NOT proposed for a marker

- L23 first clause, "Native onboarding is not supported yet: the iOS (SwiftUI) and Android (Jetpack Compose) components ship as reference source, not a build input": no 129 row fixes it. Spec 132 does (Native status passage).
- L164 second clause, "the package has no Swift package manifest", and L177 second clause, "there is no Gradle module": the fix is native distribution (Spec 132; `.kiro/issues/2026-09-26-native-component-distribution.md`, Kenya and Data), not a 129 row.
- L164 third clause, "`ContainerCardBase.ios.swift` does not parse": **already false on main**. Lina's #695 (`4732654d6`) removed the dangling `/**`. This is a rewrite for the next Integration Guide PR (Req 15 batching, before the release's S), owner Lina (row 15's half), not a marker. Flag for Lina.
- L167 and L180, "is DesignerPunk's **un-themed base snapshot**, generated from DesignerPunk's own configuration, not yours": a description of the package file, not a limitation a row removes. Low confidence that row 2 would change it.
- L173, "This was checked by reading the source ... No iOS build was run", and L177 "no Android build has been run": provenance statements, rewritten by Task 18 (Kenya, Data), not marked.
- L187-L188 and L190-L191 (Native status: "Don't start an iOS or Android product", "The native token files `generate` writes do not compile yet", "DesignerPunk's own SwiftUI and Jetpack Compose component source does not compile yet either"): whole-spec claims that no single row fixes. Req 15.5 gives the passage to Kenya and Data as a CORRECTION edit (Task 18).
- L195-L198 ("What is planned"): a statement of plans, not a limitation.
- L185 "Platform requirements ... you add the dependency": covered in A16.

## Design questions the marker needs answered before 7.1 starts

**Q1 — a sentence fixed by more than one row (A8, A10, A13, A14, A15, A16).** Req 15.2 says "naming that row's record" (singular), and the test fails when a marked record is under `archive/` or missing "while its sentence remains". With two markers on one sentence, the first record closed fails the test while the other row is still open. With one marker, it should name the record whose closure makes the sentence false, which is the LAST of the rows to land. My proposal: one marker per sentence, naming the last-to-close row; for A8 and A13 that would be row 15 (Lina, U7) rather than row 2 (Ada, U6). **Ada and Lina to confirm which closes last.** Alternative: allow several markers on one sentence and make the test fail only when ALL are archived or missing. That is a weaker test, and it is the fork I would put to Peter if the owners disagree.

**Q2 — the marker and `INSTALL.md`.** `scripts/derive-install-doc.ts` copies the install region into `docs/consumer/INSTALL.md`. An HTML comment inside the region would be copied too, and `INSTALL.md` is shipped. 7.1 will have the derive step strip `<!-- limitation: … -->` comments (and `install-doc.test.ts` compare against the stripped text), unless Ada or Peter wants the markers visible in `INSTALL.md`. I have not read the deriver closely enough to say it needs no other change; that is 7.1's first read.

**Q3 — which sentences "a 129 row fixes".** The criterion says this is a reading. My rule: a sentence is marked if a row in design-outline.md § 3 names the defect the sentence discloses, whether or not the whole sentence goes false when the row closes. Where only part of a sentence is fixed (A2, A14), I marked the sentence as a whole. Say if you want sentences split instead.

**Q4 — B1.** If Kenya and Data agree it is already false, it is a Task 18 rewrite and takes no marker; if they would keep the sentence until row 23 closes, it takes a marker naming row 23.

## Instruments block

`completion/task-7-instruments.md` row 3 (the Ada consult) is MISSING → Ada, and stays so until the owners' answers to this list are on a record. 7.1 does not start before then.
