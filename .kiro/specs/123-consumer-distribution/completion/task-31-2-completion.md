# Task 31.2 Completion — the authoring commit: the cues, the two theming units, the sweep corrections, the `theming-1` removals

**Date**: 2026-10-12
**Agent**: Thurgood (Opus) · PRIMARY, Task 31 (the profile author)
**Branch**: `task/123-u3c-profile-corrections`, on Lina's 31.1 (`48664c634`). **No seat commit shares this commit.**

## What changed (profile-author edits only)

| Where | Change | Text source | Class |
|---|---|---|---|
| `kenya.overlay.md` L27 (`#in-scope`, unsigned) | adds "… once your generated output includes it" | Kenya's read, Q1 table | B |
| `kenya.overlay.md` L38 (`#ios-theming-spec-094`, bullet 1) | `theming-1` replaced by Kenya's bullet. Bullets 2–5 verbatim (fork (A), recorded at 31.0) | Kenya's read, Q2 | C, (iv) |
| `kenya.overlay.md` L147 (`commands[product-screen-commands]` gap, unsigned) | parenthetical "(theming Swift materializes here …)" removed | Kenya's read, Q1 table | E |
| `kenya.overlay.md` L160 (`commands[platform-tokens]` cue) | "— including your theme Swift and product tokens —" removed, not reworded | Kenya's read, Q1; Task 31 (iii) | A, (iii) |
| `data.overlay.md` L27 (`#in-scope`, unsigned) | R-27 | Data's read, Q2 | B |
| `data.overlay.md` L38 (`#android-theming-spec-094`, bullet 1) | `theming-1` replaced by R-38. Bullets 2–5 verbatim; "native onboarding not supported" not added (fork, recorded at 31.0) | Data's read, Q2 | C, (iv) |
| `data.overlay.md` L159 (`commands[platform-tokens]` cue) | R-159 | Data's read, Q2 | A, (iii) |
| `kenya.dispositions.yaml` / `data.dispositions.yaml` (`#*-theming-spec-094`) | `removals` gains the canonical `theming-1` text, `cites: subtraction-1` | the canonical item (`canonical/operative-sets/{kenya,data}.yaml` L86); the cite is Thurgood's | (iv) |

Then regenerated: `npx tsx tools/agent-generator/generate.ts` ("wrote 387 files across 10 guarded roots"). Six rendered files moved: `canonical/_consumer-output/{_canonical/agents,cc/.claude/agents,kiro/.kiro/agents}/{kenya,data}*.md`. The Kiro JSON and the steward outputs did not move.

## The signers' reads cover the committed texts

- **Every overlay text is byte-equal to the signer's read file.** Each text was extracted mechanically from `task-31-reads/{kenya,data}.md` and applied with an exact-match replace (the script asserts one occurrence each). Nothing was reworded.
- Ada's fact-check (`task-31-reads/ada.md`, preserved here):
  - (iii): TRUE. "and `designerpunk.config.ts`" does not overclaim.
  - (iv): every claim in Kenya's bullet 1 and Data's R-38 is TRUE.
  - Class F: kept as true, with the dependency carried to Spec 129.
- **Not covered by a read: the `cites` value of the two new `theming-1` removals (`subtraction-1`).**
  - Kenya listed "its `removals` cite" among the things he will read before commit. Data left the cite to the author. Both reads quote the removed sentence itself.
  - The cite is in neither hash, so no act follows from it. The signers see it at their 31.4 re-sign. A cite they reject is corrected in a cite-only commit, as for divergents 6, 8 and 9.
  - **Why subtraction-1**: it matches the profile's own convention on these two rows, whose existing removal ("the built `dist/*` snapshots") also cites subtraction-1. The removed sentence inventories what DesignerPunk's own generator emits (`generateSwiftThemeTypes` / `generateKotlinThemeTypes`), tooling a consumer's install does not run.
  - **Residual, stated**: in this repo too, those emitters have no production caller (Ada's read). So the canonical sentence is false in-repo as well, and the removal is closer to a correction than to subtracting a repo specific. None of the five subtraction clauses names "false here too". Recorded under the instruments block's `## Found later` for the steward-side text.

## Post-edit stale list (C4) — exactly the expected signed set

`runFreshnessSweep` after this commit's edits and the regeneration: **6 findings**, all `stale-signature`.

```
stale-signature | canonical/profiles/consumer/data.dispositions.yaml | #android-theming-spec-094 | signature on #android-theming-spec-094 is stale — its canonical or rendered content changed since signing; re-sign or refuse
stale-signature | canonical/profiles/consumer/data.dispositions.yaml | ambient.groundTruthManifest.verdict | signature on ambient.groundTruthManifest.verdict is stale — its canonical or rendered content changed since signing; re-sign or refuse
stale-signature | canonical/profiles/consumer/data.dispositions.yaml | commands[platform-tokens] | signature on commands[platform-tokens] is stale — its canonical or rendered content changed since signing; re-sign or refuse
stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | #ios-theming-spec-094 | signature on #ios-theming-spec-094 is stale — its canonical or rendered content changed since signing; re-sign or refuse
stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | ambient.groundTruthManifest.verdict | signature on ambient.groundTruthManifest.verdict is stale — its canonical or rendered content changed since signing; re-sign or refuse
stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | commands[platform-tokens] | signature on commands[platform-tokens] is stale — its canonical or rendered content changed since signing; re-sign or refuse
```

- That is Kenya's `verdict`, `commands[platform-tokens]` and `#ios-theming-spec-094`, and Data's same three. **No other row.**
- **The 31.0 risk did not fire**: no unsigned `#in-scope` row was routed by the floor, and no finding names a row outside the set.
- Rows that stayed EQUAL (post-edit `renderedHashOf` equals the signature): both seats' `#what-you-dont-own`, both `ComponentTokens` trims, Data's `trims[dist/android/DesignTokens.android.kt]` and Data's `routes.cues[9]`.

## The instruments

- **The re-run sweep**: 26 hits, down from 42. Every one is "kept":
  - class B now reads as the intended pattern;
  - class C's new bullet names an absence;
  - D is kept;
  - F is kept as true, with the dependency carried.
- **The criterion's residual grep**: 0 hits in the overlays and the renderings.
  - **Over its literal scope (`canonical/profiles/consumer` + `canonical/_consumer-output`) it returns 6, by construction.** 2 are the new `theming-1` removals, which must quote the removed sentence verbatim. 4 are historical record text (`confirmations/{kenya,data}.md` L47; `signatures/data.md` L241; `signatures/kenya.md` L219).
  - That is a misfit in the instrument's scope, not a claim in shipped text. It is recorded under `## Found later`. The plan is not edited.
- `npx tsc --noEmit`: exit 0.
- `npm run test:agent-generator`: 1636/1637. The one failure is the **intended** `operative-set-freshness.test.ts` red, which stays until the 31.4 re-signs.

## Held

- **31.3 is not started.** Kenya's and Data's reads promise to read the cite changes for divergents 6, 8 and 9 before commit, but they do not contain the exact cite text. Neither ruled a cite: Data said he did not read the subtraction definitions. **The exact text for routing:**
  - **Kenya**, divergents 6 and 9, one edit to `kenya.dispositions.yaml` `ambient.groundTruthManifest.trims[dist/ComponentTokens.ios.swift]`: `removals[0].cites: subtraction-3 → subtraction-1`.
  - **Data**, divergent 8 (J-BA84): the same edit on `trims[dist/ComponentTokens.android.kt]`.
  - **Reason**: the removed phrase, "a stale generated artifact, not the source of truth", characterizes this repo's own build snapshot, a repo-internal tooling artifact. That is the same class the profile already cites subtraction-1 for ("the built `dist/*` snapshots" on the theming rows). Subtraction-3 (stewardship cadences and instruments as obligations) does not describe it, as the three blind seats found.
  - **Residual**: the blind seats' ground was "re-grounded, not subtracted". A better-fitting cite answers the mis-attribution, but not whether a replaced phrase is a subtraction at all. That is the RS-1 / closure question, and stays carried.
