# Inbound to Spec 129 from Ada: three records routed to this spec at release 16.2.0's walk (theme emission, the package-read token parts, base-config freshness)

**Date**: 2026-10-30
**Author**: Ada (owner of the three records below, and of the token pipeline and generators they concern)
**Status**: INPUT to Spec 129's design-outline and requirements rounds. It is not a spec artifact and not a ruling. It records what each record asks this spec for, and the open questions; the records carry their own triggers.
**Why this file exists**: Peter ruled on the 16.2.0 escalation package's fork 1 (chat, relayed by the orchestrator, received before 2026-10-30T14:46:25Z; committed verbatim in `.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md` § "R5", at `d34fc77868f649d3c67bd1b1da47bc6f2a805920`): "Re: 1, Yes. Be mindful of any inbound we'd want to provide if we need to make updates to the spec". The same record's reading of fork 1: a record-only amendment naming records in Spec 129's placeholder outline counts as rule 11's spec answer, and any update to 129's outline comes with an inbound. Thurgood's record-only amendment to `design-outline.md` names the three records below and cites this file. This is that inbound. The routing was decided under Peter's delegation in the same record (§ "R7", received before 2026-10-30T15:38:13Z).
**Read at**: `origin/main` `d34fc7786`. Line numbers are at that commit.
**Evidence grade**: source reading, the committed `token-index/`, and the shipped consumer texts. Nothing was generated or compiled for this file. There is no Swift or Kotlin toolchain where it was written.

---

## The three records this spec takes in

| # | Record | Class | What it asks of 129 | Charter scope item (`.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`) |
|---|---|---|---|---|
| 1 | `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` | P1 consumer-blocking · defect | Wire native theme emission | (i) |
| 2 | `.kiro/issues/2026-10-15-123-palette-read-from-package.md` | P2 obligation (record) · owed-act | Read the consumer's copy, not the package, for the parts listed in item 2 | (vi)'s question, and (ii) |
| 3 | `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md`, row (g) | P2 obligation (guard) · defect | Build the base-config freshness check in the PR that makes `themes` non-empty | (i) and (vi) |

**What happens to the records.** After the outline amendment that names them merges, I re-rule each one's Trigger to `path:.kiro/specs/129-consumer-generation-completeness/requirements.md`. That is the commit where each is taken into the requirements or left out with a reason. `2026-10-26-token-index-platform-name-readers.md` already uses this form. Each re-rule cites `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`, `R5@d34fc77868f649d3c67bd1b1da47bc6f2a805920`, and the merge of the record of Peter's one-word answers to the disposition sheet once it is on `main`. Until the amendment merges, the three records stay as they are.

---

## 1. Native theme emission (scope item (i))

**The defect.** `generateThemeOverrideBlocks` is defined at `src/generators/TokenFileGenerator.ts` L1044 and has no caller outside its tests (`git grep -n generateThemeOverrideBlocks -- 'src/**/*.ts' 'scripts/**'`, excluding `__tests__`, returns only the definition). The native generators drop every theme-varying semantic colour from the base `DesignTokens` files, and no theme type carries them. So a Swift or Kotlin consumer gets neither the colours nor a theme protocol, data class, environment key or `CompositionLocal` to read them through.

**The 14 colours absent from the native base files.** `token-index/semantics.yaml` (last written by #517, `08b9c7a8e`) gives these 14 an iOS and Android name under `theme.`, which no generated file defines:

`colorActionNavigation`, `colorActionPrimary`, `colorBackgroundPrimarySubtle`, `colorContrastOnAction`, `colorFeedbackInfoBackground`, `colorFeedbackInfoBorder`, `colorFeedbackInfoText`, `colorFeedbackSuccessText`, `colorIconNavigationInactive`, `colorStructureBorderSubtle`, `colorStructureCanvas`, `colorTextDefault`, `colorTextMuted`, `colorTextSubtle`.

Android carries their WCAG variants (for example `color_action_navigation_wcag_light`) and no base member. The comment at `src/generators/generateTokenFiles.ts` L229 says the registry-wide set is "10 under the shipped config". The index gives 14, so the comment is stale. The requirements should take the count from the generator's own set, not from the comment.

**The three defaults awaiting approval** (the record's § "Recommended fix", specced by me and never approved; it changes all platform output):
1. **Wire it?** Yes.
2. **Where the theme override set comes from**: the already-resolved legacy contexts in `generateTokenFiles.ts` (L192–L196, `contextOverrides`), which diverge least. Moving to `ThemeRegistry` / `resolveForRegistry()` would be a separate follow-up.
3. **Scope**: iOS and Android first. Web's statics were not removed, so web is a separate change, and that avoids unrelated diffs.

The 129 design round decides these. If (vi) makes the consumer's own theme tier the source, default 2 changes with it.

**The charter lines that change when this lands.** `canonical/agents/kenya.md` § "iOS Theming (Spec 094)" (L285) and `canonical/agents/data.md` § "Android Theming (Spec 094)" (L287) now say `generate` emits no theme surface today, and that the next two bullets are the intended pattern. The consumer renderings say the same (`canonical/_consumer-output/cc/.claude/agents/kenya.md` L68, `data.md` L69). When (i) ships, those lines are rewritten to say what is emitted, and Kenya and Data re-confirm. Separately, Kenya's L182 and L206 ("theming Swift materializes consumer-side") are false now and are fixed before this spec, in the steward-canonical CORRECTION (`.kiro/issues/2026-10-12-steward-canonical-claims-theme-output.md`, Thurgood).

**Verification the record already names**: regenerate, then confirm the Swift theme protocol and environment key and the Kotlin theme data class and `CompositionLocal`. Check a sample of emitted names against `get_token_details`. Lina confirms her components' `theme.<token>` reads match what is emitted. Re-baseline the 094 snapshot fixtures on purpose. Compiling is the build-verification harness's job (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`).

## 2. The token parts `generate` reads from the package (record 2)

**What is read from where, as shipped.** `docs/consumer/INSTALL.md` L77, the reader-facing statement, lists what `generate` takes from the installed package and not from the consumer's copy:
- the colour palette;
- the dark and WCAG override maps;
- the opacity values that colours with transparency are built from;
- the motion tokens (duration, easing, scale) and the layering tokens;
- the font-size and line-height values that icon sizes are calculated from;
- the whole DTCG/Figma export.

Spacing and the other non-colour primitives, and the consumer's semantic references, are read from the copy. In code, the override maps and the palette are static imports at `src/generators/generateTokenFiles.ts` L19–L22 (`darkSemanticOverrides`, `wcagSemanticOverrides`, `darkWcagSemanticOverrides`, `composedColorMap`).

**A correction to my own count.** In the 16.2.0 collective round (scratch, not committed) I called these "five parts", from the record's title. INSTALL lists six groups, which include opacity and the icon-size font values. The requirements should take INSTALL L77's list, or the code, not the title.

**What closes it** (the record's § "What closes it"):
- one fix PR after which a consumer's edit to each listed part changes `generate`'s output;
- one test per part, run against a consumer-shaped fixture, not the steward repo;
- the CHANGELOG entry of that release removes the known-limitation paragraph ("Part of the token source `init` copied into your repo is still not read", 16.1.0's entry § "Known limitations", `CHANGELOG.md` L48 onward).

**The consumer-charter line.** My owner line of 2026-10-25 in the record owes a consumer-profile line for consumer-Ada: the palette is read from the package, so a brand colour that is not in the palette cannot be added yet. If 129's fix lands first, that line is moot and is not added, or it is removed in the same PR.

**Related, not this record**: `.kiro/issues/archive/2026-10-25-generate-passes-semantic-references-to-unemitted-primitives.md` (closed; since 16.1.0, `generate` stops when a semantic colour points at a colour it does not emit). Once the palette is read from the copy, that check's message and its INSTALL sentence change.

## 3. Base-config freshness, row (g) (record 3)

**The row.** The root token files should equal a fresh generation from a base config. It is not built. The proxy is `themes: []` in the build tree's config, which pack-assert asserts (RELEASE-FLOW 5.1), plus a fresh clone making the generation a base generation by construction. The proxy misses a generator that emits non-base output without a theme.

**Its start condition** is narrower than "an edit of `scripts/generate-platform-tokens.ts`". It is a change to *how that script reads `designerpunk.config.ts`*, or a non-empty `themes`. The `path:` token fired falsely on 2026-10-23 on an unrelated edit (the record's § "Fired 2026-10-23").

**What 129 should do.** Build row (g)'s check in the PR that makes `themes` non-empty or changes how the config is read. That is item (i) or (vi), whichever lands first, because the proxy stops covering exactly then. Re-read rows (i) (the leftover rule's limits) and (j) (local friction) in the same PR. Row (h), retiring `postpublish`, is not this spec's: it goes fix-now, outside 129.

---

## Pointers (already routed to 129; not re-filed here)

- `.kiro/issues/2026-10-26-token-index-platform-name-readers.md`, item 3: the product-token emitters (`src/build/product/**`) write a comma-joined list for a composite `ref` and `var(null)` for a platform-less one, and choose the theme path by `themeVarying`, not by the `theme.` prefix. Its Trigger is already `path:.kiro/specs/129-consumer-generation-completeness/requirements.md`.
- `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-android-generator-defects-2026-10-24.md`: the Android type contract (sizing as `Dp`, the `fontSize` type decision) and the compile defects in `DesignTokens.android.kt`.

## Open questions for the requirements round (listed, not answered)

1. **Does a TS-side parity test count as a native test?** Lina's `.kiro/issues/2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` turns on it. Served readiness reads `scaffold` for most components because the pattern matches only `Tests.swift` / `Test.kt`. Counting `*.ios.test.ts` Jest files would turn an understatement into an overstatement, because they test the TS side, not the Swift. What counts is the harness's answer, and this spec's acceptance depends on it.
2. **Which theme tier is the source** when a consumer has copied the theme files: theirs, the package's, or their config `themes`? This is charter item (vi)'s question. It decides default 2 in item 1 and the override-map half of item 2.
3. **Does item 1's iOS/Android-first scope ship in one release with item 2**, or can theme emission ship while the palette is still read from the package? If they ship separately, the CHANGELOG limitation is rewritten, not removed.

**Consulted**: none needed — an inbound records open questions.
