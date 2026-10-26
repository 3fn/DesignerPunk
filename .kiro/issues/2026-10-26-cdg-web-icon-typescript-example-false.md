# The CDG's web icon examples use TypeScript names nothing defines, import from a path that does not exist, and label the shipped type's own example WRONG

**Date**: 2026-10-26
**Filed by**: Lina, under README rule 10, for RL-31 (ii) of Stacy's claims pass (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md`, phase 1 addendum 3, § "RL-31", commit `737ff3e4e` on `origin/chore/release-16.1.0-claims-pass-phase-1`, not on `main` at filing), and for RL-34 of the same addendum. Every line number below is in `governance/Component-Development-Guide.md` at `4abfbe6de` (#504), the final S of 16.1.0, read by me in the main checkout; source lines are at the same commit. Rule 9 applies to every later edit.
**Owner**: Lina (the CDG's content and Icon-Base are mine). Ada is named on plan item 1 only; this record files that item for her.
**Class**: P0 false-claim · defect *(set 2026-10-26, Lina, rule 12. The CDG is a served doc and `governance/` is in `files[]`, so these lines are statements false where a reader of the package meets them: that meets M7's P0 definition as written (ballot 2026-10-18-obligation-drain-and-release-falsity-floor). The definition asks whether the statement is false at its reader, not how loudly it fails. **The counter-reading** (P3 improvement, or P2 `(guard)` for the guard gap Stacy names as RS-44): the failure is loud (a TypeScript compile names the missing identifier and the missing module), no shipped component copies these lines, and shipped Button-CTA web already uses the true form. That is a real argument about harm, and Peter weighed it when he waived this for 16.1.0. It is an argument for a downgrade, and only Peter downgrades a P0, so I class it at the definition and leave the downgrade to him.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S. The fixing PR (plan item 2) closes this record with rule 5's outcome line; the token becomes `merge:#<N>` when that PR opens. **Lapse condition**: if the commit carrying item 2 (with this record's outcome line) is not an ancestor of the next release's S, this record lapses at that S and, being P0, goes to Peter at that first lapse with exactly spec, drop or fix-now (rule 11). The waiver below covers 16.1.0 only, so at that walk this record is floor-class again.

This record merges after 16.1.0's tag by design, so it is not an ancestor of 16.1.0's S and is not read at 16.1.0's walk; `release:next:phase-1` resolves to the release after 16.1.0.

---

## Finding

**TypeScript names nothing defines.** L704 (`size: iconSize100,  // Token-based sizing`, in the block that says Button-CTA "internally uses" the Icon component), L792 (`size: iconSize100`, under `// ✅ CORRECT: Use token reference`), L897 and L908 (`size: iconSize100`) and L909 (`size: iconSize075`) use `iconSize100` and `iconSize075` as TypeScript identifiers. No web TypeScript token constant is emitted: there is no such export in `src/tokens/` or the packed `dist/browser/`, and Stacy found the only `dist/**/*.d.ts` hits are doc comments in the two native format generators. Icon-Base's web `size` is a number, `IconBaseSize = 13 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48` (`src/components/core/Icon-Base/types.ts` L126).

**The WRONG label is the shipped type's own example.** L795–L798 label `size: 24  // Hard-coded value` as `// ❌ WRONG: Hard-coded size`. `IconBaseSize`'s own doc example is `const size: IconBaseSize = 24; // Standard size for body text` (`types.ts` L121), and `IconBaseProps`' examples pass `size={24}` (L191, L273).

**A true token-tied form already ships.** `iconBaseSizes` (`types.ts` L167–L179; `size100: 24, // icon.size100`) is exported from `src/components/core/Icon-Base/index.ts`, and shipped Button-CTA web reads it: `import { IconBaseSize, iconBaseSizes } from '../../../Icon-Base/types'` and `iconSize = iconBaseSizes.size100` (`src/components/core/Button-CTA/platforms/web/ButtonCTA.web.ts` L29, L60). Two limits on it: its values are hand-written literals mirroring the icon tokens, not generated from them (its own comment records that `size125` was 32 before 16.1.0), and it is reachable from in-repo component source, not from the package's export map (`./` and `./components` resolve to `dist/browser-entry.d.ts`, which exports `IconBaseElement` and `Icon = IconBaseElement` (`src/browser-entry.ts` L221, L224), not `iconBaseSizes` or `createIconBase`).

**An import path that does not exist.** L787 imports `createIcon` from `@/components/core/Icon/platforms/web/Icon.web`. There is no `src/components/core/Icon/`. The module is `src/components/core/Icon-Base/platforms/web/IconBase.web.ts`, whose function is `createIconBase` (L132); `createIcon` is a legacy alias of it (L551, re-exported by `Icon-Base/index.ts`). So the name `createIcon` resolves, as a legacy alias; the path does not. *(This corrects the brief I was given, which called the name itself false.)*

**Native component names.** L807 and L810 (iOS) call `Icon(name:size:)` and L839 and L842 (Android) call `Icon(name = …, size = …)`. The components are `IconBase` (`IconBase.ios.swift` L73, `struct IconBase: View`; `IconBase.android.kt` L48, `fun IconBase(`). There is no `Icon` alias on either platform. L845 passes `tint =`; Android `IconBase`'s parameter is `color` (L51). L852, L859 and L866 are Compose Material3's own `Icon(imageVector|painter = …)`, which is real, and are not in this finding.

**Age.** Pre-existing: at `v16.0.0` the same TypeScript lines were L691, L772, L777, L882 and L893 (Stacy). Not introduced by 16.1.0.

**Not in this record.** RL-31 (i), the `:host` self-reference cycle at L1519–L1520, is being fixed before the tag by another Lina seat in its own PR, on Peter's "Fix the CSS cycle now".

## RL-34, carried here (Low; native-only; not floor-class)

- The caveat at L999 says the native `theme.` names below "match the token index". That is false for `color.action.primary` (L1008, L1018, and L630 above the caveat): the index gives the bare `colorActionPrimary` / `color_action_primary` (`token-index/semantics.yaml` L272–L276). The `theme.` names are right (Ada, #504's body, open item (2)); the false link is the index row, which Ada's plan item 5 fixes (`2026-10-26-token-index-platform-names-not-emitted.md`). When item 5 merges, the clause is true with no edit.
- L811 and L845 (§ "Platform-Specific Icon Usage") carry `theme.colorFeedbackSuccessText` / `theme.color_feedback_success_text` with no pointer to the caveat. The Button-CTA blocks carry their pointer lines (L622, L637).
- Stacy reads both as native-only, under the reference-source frame, not floor-class, and I agree.

## Waiver for 16.1.0

Peter waived RL-31 (ii) for 16.1.0, in chat, relayed by the orchestrator, received before 2026-10-26T16:24:20Z by the orchestrator's clock. His words, verbatim:

> "Fix the CSS cycle now, waive the icon example with the plan"

**Scope**: 16.1.0 only, and RL-31 (ii) only. The CSS cycle (RL-31 (i)) is fixed now, in its own PR. The plan below is the one the waiver names.

## The dated plan

1. **Does web get a TypeScript token export?** Ada answers, as a dated line signed by her appended to this record or in a record of hers that this record then cites. This is her open item (3) in #504's body; no record held it before this one. **Owner**: Ada. **Due**: before the next release's walk (RELEASE-FLOW 3a at the next S), and early enough for item 2 to land before that walk.
2. **One CORRECTION PR to the CDG's icon examples.** **Owner**: Lina. **Due**: merged before the next release's walk. It:
   - rewrites L704, L792, L897, L908 and L909 to a form that is true given item 1's answer: a generated export if Ada rules one in and it has merged; otherwise the form that ships today, `iconBaseSizes.size100` / `.size075` imported from Icon-Base's `types` (for in-repo component source, as Button-CTA does), or `size: 24 /* icon.size100 */` / `size="24"` on `<icon-base>` for a package reader, with the reader each form is for named in the text;
   - removes the WRONG label from `size: 24` at L795–L798, or replaces the block with a contrast that is true (a size outside `IconBaseSize`, for instance);
   - fixes L787's import to `createIconBase` from `@/components/core/Icon-Base/platforms/web/IconBase.web` (and L702, L790, L796, L897, L908, L909 to the same name, not the legacy alias);
   - renames the native `Icon(` calls at L807, L810, L839 and L842 to `IconBase(`, and L845's `tint =` to `color =`;
   - carries RL-34's pointer lines (item 3) and the observations in item 4 that are in this file.

   If item 1's answer is not on record when this PR is ready, it proceeds with the shipped form (`iconBaseSizes` / the literal with its token comment), which is true today, and Ada's later answer, if it adds an export, is a follow-up edit. This PR does not wait on item 1 past the due date.
3. **RL-34's pointer lines.** Add the `// theme: …` pointer line (the Button-CTA blocks' form, L622) before L811 and before L845. The "match the token index" clause waits for Ada's plan item 5: if item 5 has merged when item 2's PR opens, the clause is true and is not edited; if not, item 2's PR narrows the clause for `color.action.primary`, with Ada consulted on the wording (the sentence is hers, verbatim). **Owner**: Lina. **Due**: in item 2's PR.
4. **#504's other observations.** Each with its home:
   - **CDG L780–L781** `/* 16px */` beside `--icon-size-075`, emitted at 20px (`dist/DesignTokens.web.css` L819; the file's own table at L749 says 20px): corrected to `/* 20px */` in item 2's PR. **Owner**: Lina.
   - **CDG L1117** `import { getBlendUtilities } from '@3fn/core/ThemeAwareBlendUtilities'`: not a package export; `./blend` is (`package.json` exports; `getBlendUtilities` is exported by `src/blend/index.ts` L31). Corrected to `@3fn/core/blend` in item 2's PR. Stacy reads this one as covered by F-3's count (RL-33), so it is in this PR for completeness, not because it is RL-31's; if the governance-examples guard's pending list carries it when the PR opens, the PR removes that entry, with Thurgood (the instrument's owner) consulted. **Owner**: Lina.
   - **CDG** `DesignTokens.typographyButtonMd` / `typography_button_md` are emitted as `Typography(...)` values, not `Font` / `TextStyle` (#504's "API shape" observation; native, reference-source frame): read and corrected or pointed in item 2's PR if the text presents them as a `Font`. **Owner**: Lina.
   - **`src/components/core/Icon-Base/README.md` L30** `color="color-success"`: `IconBase.web.ts` L200 turns the attribute into `var(--color-success)`, which no packed CSS defines; corrected to `color-feedback-success-text` (the CDG's L763 fix in #504) in item 2's PR. Not a governance path, so it carries no Edit kind line. **Owner**: Lina.
   - **`src/components/core/Button-CTA/platforms/android/ButtonCTA.android.kt`** reads bare `colorActionPrimary` (L363, L364, L377, L389, L392, L396), `colorBackground` (L369, L370) and `colorContrastOnDark` (L376, L382) in `getButtonCTAStyleConfig`, none of them declared in the file or imported (its imports are `DesignTokens` and three blend extensions, L44–L50). Its siblings read `LocalDPTheme.current` (`ChipFilter.android.kt` L208) and `theme.color_*`. This is a compile defect in shipped Android source, the same class as `2026-10-24-android-component-unit-type-mismatches.md` (P1 consumer-blocking), not a doc falsity, so it is not item 2's CORRECTION. **Home**: that record; item 2's PR appends it there as a dated section signed by me (the record is mine; its copy on this branch is behind `main`, so I do not append it here). **Owner**: Lina. That record's own trigger and plan govern its fix; this record's close does not wait on it.

## Close

Item 2's PR adds rule 5's dated outcome line here, naming what item 1 answered (or that it proceeded without the answer, and why), and moves this record to `archive/`.
