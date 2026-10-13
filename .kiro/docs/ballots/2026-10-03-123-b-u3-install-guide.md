# Ballot Measure: B-U3 — the Integration Guide becomes the install doc

**Date**: 2026-10-03
**Drafted by**: Thurgood (Opus), PRIMARY on Spec 123 Task 19
**Status**: DRAFT
**Ratification**: under the PR-gated workflow, **Peter's merge of U3's unit PR is the ratification** (governance carve-out; PR-atomic, as in the B-U1 and #268 precedents). This is a **light** ballot (Peter's PR-2): it records why the install process changes and what happens to the content #268 ratified. It does not put each guide edit to a vote.
**Edits it governs**: `governance/DesignerPunk-Integration-Guide.md` (the install region, Task 19.1; markers, the reference remainder and the derivation, Task 19.4). It also covers the copies that follow from the guide: `docs/consumer/INSTALL.md` (the committed derivation) and the `README.md` install lines. Those copies are not law, and are named here only so the reader sees the whole surface.
**Origin**: Spec 123 Task 19, criterion "B-U3, a light record-first ballot (PR-2)" (`tasks.md` @ `53a3d413`, L1005–1012); design C23 and its 2026-10-03 erratum.
**Unit**: rides `task/123-u3-onboarding`, and reaches `main` at U3's Peter-merged unit PR.

---

## 1. Why the install process changes

The guide's "Setup Loop" teaches an install that 15.0.0 retired. It teaches:
- a GitHub Packages registry with a personal access token;
- hand-written config and MCP files;
- a pre-15 `sync` that writes;
- manual native copy steps.

15.0.0 changed all four. The package installs from public npm. `init` births the design system. `attach` wires a harness. `sync` reports before it changes anything.

Peter's three rulings of 2026-10-03 set the shape of the replacement (record: `.kiro/specs/123-consumer-distribution/feedback/tasks.md` § "U3 amendment round (2026-10-03)"):
- **PR-1: one document with a marked install region.** The region opens the guide, directly after its title and metadata, and replaces the Setup Loop. The rest of the guide becomes reference, under one `## Reference` heading. `docs/consumer/INSTALL.md` is a **committed** copy of the region, kept equal to it by a test. It is never written at build time.
- **PR-2: the guide changes when the install process changes, and the why is recorded.** A new platform is a new sibling section, not a rewrite.
- **PR-3: release 3 is for building web products.** iOS and Android follow as Spec 129. The region opens with the scope sentence, which says so.

## 2. Order — this ballot precedes every U3 guide-content commit

**Peter's ruling, 2026-10-03** ("Re: 1 & 2, agreed as recommended"; it resolves the Task 19 instruments block's O-3, `.kiro/specs/123-consumer-distribution/completion/task-19-instruments.md`):
- Ada's status stamp on #268's ballot merged first (#298, `981891e6`).
- U3 then merged `main` (`8eee4470`).
- **This ballot is committed before ANY guide-content commit on U3, including 19.1's.** 19.1 writes straight into the guide's region; there is no draft copy in `docs/consumer/INSTALL.md`.

**Instrument**: for every U3 commit that changes `governance/DesignerPunk-Integration-Guide.md`, `git merge-base --is-ancestor <this ballot's adding commit> <that commit>` succeeds.

## 3. The standing discipline (Peter's PR-2)

Peter's words: *"I think we should be thoughtful about why we're changing them and aware of when we need to change them — like if we add something to the install process."*

- **The install region changes when the install process changes, with the why recorded.** It does **not** change by a vote on every edit. A typo or a broken link is fixed under the guide's ordinary maintenance.
- **A new platform is a new sibling section** under § Platforms (Web, iOS and Android today; React and React Native are Spec 128's candidates). It carries no numbered path steps. **A platform that needs a numbered step is an install-process change**, and it records its why under this discipline.

## 4. The reference remainder's owner

**Thurgood** (PR-1). At Task 19.4 he cleans every `##`/`###` section of the remainder: each gets a row in 19.4's completion doc with the verb `kept`, `corrected` or `removed` and a one-line reason. The remainder must not contradict the region. Leonardo's checklist (`tasks.md` L996–1001) names five sections. After U3, the remainder follows the guide's ordinary maintenance, and contradicting the region is a defect.

## 5. Preservation table — the content #268 ratified

**Source**: `.kiro/docs/ballots/2026-10-02-integration-guide-native-scoping.md` (RATIFIED, Peter, 2026-10-02; #268 = `8d7d3ad1`; status stamped by #298 = `981891e6`), § "Edit sites".

**Count rule** (Stacy R-11, `tasks.md` L1011):
- one row per after-text block, each naming its site;
- **a site whose only content is one block is covered by that block's row.**
- #268 has **four sites** (L46, L125, L188, L211) and **eight after-text blocks**: Site 1 (one), Site 2 (2a, 2b, 2c, 2d), Site 3 (one), Site 4 (4a, 4b). Counted against the ballot at `981891e6`. **Rows: 8. Content points: 8.** Every site has at least one row.

**How the "new location" column is honest**:
- The region does not exist when this ballot is committed. 19.1 writes it in the next commits, and 19.4 adds its markers and the `## Reference` heading.
- **Every location below is a target, named against design C23's region order.** Task 19.4's completion doc confirms each one against the guide as committed. It records the section that holds it, or it amends this row before U3's PR opens.
- A target that 19.4 cannot confirm is a red for this row, not a silent re-mapping.

| # | #268 site · block | Content points (what was ratified) | New location — target | Disposition |
|---|---|---|---|---|
| P1 | Site 1 · the native block (replaced § "iOS (M0a — Manual Copy)" and § "Android (M0a — Manual Copy)") | (i) native onboarding is not supported; (ii) `DesignTokens.ios.swift` / `.android.kt` are DesignerPunk's un-themed base, not the consumer's; (iii) `ComponentTokens.*` is the component tier, which the components require; (iv) the components read a theme surface (`\.dpTheme`, `LocalDPTheme`) that neither the base files nor the consumer's `generate` emits; (v) native output omits the 14 theme-varying colours, four of them newly absent in 15.0.0 (named); (vi) "copying these files … does not yield a compiling target"; (vii) native onboarding is delivered by the completeness spec; (viii) platform requirements: iOS 17.0+ (SwiftUI, UIKit), and a Compose BOM compatible with the components | **§ Platforms › iOS** and **§ Platforms › Android**, as each owner's sentence plus the causes, in prose. Kenya: `feedback/tasks.md` [KENYA R1] § A; Data: [DATA R1] item 1. (i) also appears in the scope sentence. | **Moved**: (i), (ii), (iii), (iv), (v)'s count of 14, (vii) (now named as Spec 129), (viii). **Retired, with reason**: (vi), because C15 keeps compile claims out of the install doc: on Android it rests on a source read only, and no Android build has been run (`tasks.md` L1026–1028). (v)'s four names, because they are a 15.0.0-against-14.1.0 delta and the region is version-free; they stay in `docs/releases/release-15.0.0.md`. The #268 notes (R8/ProGuard and the `sync:ios` / `sync:android` notes dropped; no deprecation sentence; `ComponentTokens.*` named as required) **hold unchanged.** |
| P2 | Site 2 · 2a (step 7's import comment) | the import comment names `@3fn/core/tokens.css` as DesignerPunk's base | **§ Platforms › Web**, in the import block | **Moved**, unchanged in meaning |
| P3 | Site 2 · 2b ("What these two imports are"; your own tokens; themes in this version) | (i) `tokens.css` is DesignerPunk's own base, the zero-config evaluation path; (ii) `component-tokens.css` is the component tier, imported on every path; (iii) after `generate`, the consumer's own `DesignTokens.web.css` replaces `tokens.css`; (iv) dark mode follows `light-dark()` and `color-scheme`; (v) one baked theme, `data-theme="wcag"`; (vi) a registered custom theme produces no `[data-theme]` block | **§ Platforms › Web**. (vi) also appears in the scope sentence's third sentence ("does not change your generated output yet; light and dark mode work") | **Moved**: (i) to (vi). The version phrase "in 15.0.0" becomes version-free ("yet"), as in the scope sentence. |
| P4 | Site 2 · 2c (§ "Available Imports", the two token rows) | the table rows describe `tokens.css` as the base and the evaluation path, and `component-tokens.css` as required on every path | **§ Reference › Available Imports**, unmoved; the region's Web sub-section points to it | **Kept in place** (a remainder section; its row in 19.4's remainder table). *(19.4: the `tokens.css` row's pointer "(see step 7, Build Your Product)" reads "(see Platforms › Web, in the install region)", because step 7 was removed. The pointer changed; the content point did not.)* |
| P5 | Site 2 · 2d (§ "Available Imports", `inter.css` row removed) | the removed export's row stays removed | **§ Reference › Available Imports** | **Kept** (the removal holds; 19.4's sweep confirms that no `inter.css` row has returned) |
| P6 | Site 3 (§ "Upgrading": the dated pointer) | the pre-15 `sync` flow is retired; 15.x `sync` prints its report before changing anything and converts the manifest; `sync --migrate-legacy --target=<cc\|kiro>`; "Spec 123 Task 19.4 reconciles this section" | the facts go to **region § 4** (the update lifecycle: `npm update`, then `sync` reports, then `generate`) and to **§ Reference › Upgrading**, rewritten for 15.x's report-first `sync` (`tasks.md` C11, Req 15B.6) | **Retired as a note**, because it said it was temporary ("Task 19.4 reconciles this section"), and 19.4's rewrite is that reconciliation. **Its facts move** to the two targets. *(19.4: Lina's rewritten § Reference › Upgrading body carries all three facts: the report comes first, the manifest is converted to `designerpunk.manifest.json`, and `sync --migrate-legacy --target=<cc\|kiro>` (`completion/task-19-4-owner-wording/lina.md` § 9). Region § 4 carries them too.)* |
| P7 | Site 4 · 4a (§ "6. Generate Tokens": the native output lines) | `DesignTokens.ios.swift` / `.android.kt` are constants with no theme surface yet | **region § 4** (where `generate` is taught), in what `generate` writes, pointing to § Platforms | **Moved** |
| P8 | Site 4 · 4b (§ "6. Generate Tokens": the custom-theme sentence) | a registered custom theme does not yet change `generate`'s output: no web `[data-theme]` block, no native theme structs or instances; the web output carries the base light/dark values and the baked `wcag` block | the **scope sentence** (its third sentence); **§ Platforms › Web** (themes); **§ Platforms › iOS / Android** (nothing emits a theme surface) | **Moved** |

**Content points CHANGED at 19.4 (owner-reviewed source corrections; for Peter at the U3 merge)**:
- **P1 (iii), "`ComponentTokens.*` is the component tier, which the components require"** (#268 Site 1; its notes: "Kept: `ComponentTokens.*` is named as required (Lina)") is **narrowed**. The source shows the claim is over-general.
  - iOS (Kenya): "Some of the shipped components read it (`ButtonIcon.ios.swift`, for one), and it refers to `SizingTokens`, `SpacingTokens` and `BorderWidthTokens`, which no shipped file defines." Evidence: `ButtonIcon.ios.swift:67-80` reads it; `Avatar.ios.swift:35` and `BadgeLabelBase.ios.swift:46` define their own enums; `swiftc -typecheck` of the two dist files reports the three missing enums (`completion/task-19-4-owner-review/kenya.md` C1 and § "Findings").
  - Android (Data): "Three of the shipped components (Avatar, Badge-Label-Base and Button-Icon) read it." Evidence: the seven `ComponentTokens.android.kt` objects are referenced by 3 of the 41 `.kt` files (`data.md` C-1, ledger row 10).
  - Kenya offered a minimum-only alternative, if the ratified wording is to be kept: "The components that read component tokens require it." It was not applied: the orchestrator directed the full correction.
- **P3 (v), the baked `wcag` theme example** (#268 Site 2b) is **corrected**. The ratified text showed `<div data-theme="wcag">`, but the emitted selector is `:root[data-theme="wcag"]` (`dist/DesignTokens.web.css:932`; `TokenFileGenerator.ts:977`), so the attribute works only on `<html>`. The text and example are Sparky's (`sparky.md` ledger row 12). The content point, one baked `wcag` theme, is preserved; only its usage was wrong.

**Interim state — closed at 19.4 (assembled 2026-10-03)**:
- The Setup Loop is gone. Its non-step content is now under `## Reference`, de-numbered (Peter's ruling, 2026-10-03, `tasks.md` Task 19 C11 annotation).
- Its copies of #268's text were removed as moved to the region: old step 7's Web and iOS/Android blocks, and § "6. Generate Tokens"'s output list and 15.0.0 theme block (Ada's replacement sentence points to region § 4).
- **Every P-row target above was confirmed against the assembled guide.** The confirmation, row by row, is in `completion/task-19-4-completion.md` § "#268 preservation — targets confirmed".
- Nothing reached `main` in the interim state.

## 6. Counter-argument, and what survives

- **Folded in**:
  - A heavier ballot, putting each region edit to a vote, would contradict PR-2's "not a vote on every edit", so this ballot records the why and the preservation only.
  - Writing the "new location" column as if the region already existed would be a false record, so the column holds targets that 19.4 confirms.
- **What survives**:
  - **A target-only table can be satisfied loosely.** 19.4's confirmation is by the author of both this ballot and the region, so the check that a moved point actually landed is the author's own. The independent reads are Leonardo's at 19.5 (the preservation table is on his list) and Stacy's claims pass.
  - **Two retirements are judgment calls**: (vi)'s compile sentence and (v)'s four names. Both reasons are stated. A reader who wants the 15.0.0 delta in the guide would put it back as a dated note.
