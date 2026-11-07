# The Android components read `LocalDPTheme.current` and none imports `com.designerpunk.tokens.LocalDPTheme`

**Date**: 2026-11-06
**Filed by**: Thurgood, under rule 10, for Lina, in Spec 129 tasks amendment 3's review fold, which records the ruling that carries this defect (`.kiro/specs/129-consumer-generation-completeness/feedback/tasks.md` § "Tasks amendment 3", `[THURGOOD R7]` fork 3). The finding is Lina's (`[LINA R3]` item 1). Rule 9 applies to every later edit.
**Owner**: Lina (the component files). **Verifier**: Data (Android).
**Class**: P1 consumer-blocking · defect *(set 2026-11-06 by the filer for the owner, who confirms or re-classes under rule 12. Same reason as `2026-11-04-progress-bar-native-theme-reads-malformed.md`: an Android consumer who builds the shipped source meets each read as a compile error once `LocalDPTheme` is emitted; native ships as reference source, so no reader is misled about it building, which keeps this out of P0.)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/task-11-completion.md` — the completion doc of the parent that carries the fix (Task 11, U6, subtask 11.5), which reaches `main` at U6's merge; U6's PR closes this record (rule 5) or its owner re-rules it.

---

## What is wrong

Read at `d3dd101b9` (`src/` unchanged since `233e04bf1`); counts VERIFIED by Lina and re-run by the orchestrator and by the filer (`git grep -l 'LocalDPTheme.current' -- 'src/components/core/*/platforms/android/*'`, tests excluded: 25; `git grep -l 'import com.designerpunk.tokens.LocalDPTheme' -- src/components`: 0):

- 25 non-test files under `src/components/core/*/platforms/android/` read `LocalDPTheme.current`.
- None imports `com.designerpunk.tokens.LocalDPTheme`, and none imports `com.designerpunk.tokens.*`.
- All declare a `package com.designerpunk.components.*`, and the same files import `com.designerpunk.tokens.DesignTokens` explicitly (28 such imports).

Spec 129 design § 4 puts `LocalDPTheme` in `package com.designerpunk.tokens`. Kotlin has no implicit cross-package import, so once U6 emits it every one of the 25 reads still fails with `Unresolved reference 'LocalDPTheme'`. Today the error is indistinguishable from "theme emission unwired" (row 2, `2026-06-28-spec-094-platform-theme-emission-unwired.md`), so it hides behind that record until U6.

## The ruling that carries it

Spec 129 tasks amendment 3, review fold, `[THURGOOD R7]` fork 3, option (i): the import lands at U6, in subtask 11.5, written by Lina. Task 11's Primary Artifacts gain `src/components/core/*/platforms/android/**` for that import line only, and a Task 11 success criterion requires each of the 25 files to import `com.designerpunk.tokens.LocalDPTheme`, with that line as the file's only change in U6 outside the four paths Task 11 already lists.

## Close

U6's PR adds this record's rule 5 outcome line naming the merge, and archives it.
