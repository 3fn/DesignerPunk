# Release 16.3.0

**Date**: the tag's date (written at step 6)
**Previous**: 16.2.0
**Bump**: minor

> **Authorship note (recorded, not buried)**: these notes are hand-authored from the merged delta `v16.2.0..430151c01`, the release branch's base.
>
> **The delta, derived** (RELEASE-FLOW § "Deriving the delta", step 1):
> - `git log --first-parent v16.2.0..430151c01 --oneline`: **216** squash commits.
> - Scoped to the shipped surface (`package.json` `files[]` read literally, plus the build inputs of `dist/`): Spec 129's twelve units and its closeout fixes (#695–#797), and the post-closeout fixes:
>   - #824, the `Themes:` line;
>   - #825 and #831, prefers-contrast and forced-colors;
>   - #827, `validate_assembly` V2;
>   - #829, `sync` option B;
>   - #830, the badge colour-map rename, which is not exported;
>   - #826 and #841, governance corrections;
>   - #838, #846 and #850, guard, docs and trio records.
> - **`files[]` gained ten entries and lost none**: the four `!dist/*Tokens.{ios,android}.*` exclusions (Spec 129 Task 17) and the six component-token definition files (Task 13).
>
> **Classification** (step 2):
> - **🔴 0 breaking for a web project.** The native changes (the four removed `dist/` token files, the Android `Dp` and `TextUnit` types) ship in a minor under Peter's ruling 7 (a): native ships in minors until the Spec 132 support claim. They are listed under "Changes that may break a consumer".
> - **🟡 minor**: Spec 129's `generate`, `init` and `sync` changes; #827; #829.
> - **🔵 patch**: #824, #825, #831, the governance and doc corrections.
>
> **Ratified bump**: 16.3.0, minor. Peter, 2026-11-09T03:33:57Z, "Re: 1, Yes. Re: 2, (a) …" (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-09-peter-rulings-release-16-3-0.md`, #844).
>
> **The token lines**: no DesignerPunk token value changed. `npm run build` on the release branch leaves `token-index/` clean (`verify:token-index-clean`). `docs/tokens.css` changes only in its version header.

**Scope of this release, plainly**: this release is for building web products, with the agent layer for Claude Code and Kiro. **Native rendering is not yet proven, so do not start a native product on it.**
- `generate` now writes complete iOS and Android token output, the native theme and DesignerPunk's component tokens included.
- DesignerPunk's own checks compile that output and the component source, for iOS 17.0 and Android API 26, in the fixed wording of the CHANGELOG's "Known limitations": compile except 0, 0, 49 and 93 pinned errors, listed at `harness/expected/*.tsv`; no app linked, no tests run.
- Nothing has rendered a screen on a device.

## What changed

The CHANGELOG's `## [16.3.0]` entry is the consumer-facing list: Added, Changed, Fixed, Removed, Changes that may break a consumer, Known limitations, and Upgrading from 16.2.0 (five steps).

## Upgrading from 16.2.0

See the CHANGELOG's "Upgrading from 16.2.0" (five steps). **From 16.1.0 or earlier**: follow the 16.2.0 notes first (`docs/releases/release-16.2.0.md`).

## 🧪 Onboarding evidence

The 16.3.0 trio runs as written before S (Peter's (a), #844): three persona runs and the Kiro conformance pair as a fourth sitting (Peter, 2026-11-09T04:30:59Z, on #850). The candidate, F and the run results are filled in here before S, from the trio records PR.

## 📦 Packed output against the previous public artifact (RELEASE-FLOW step 2)

Filled in before S: the 16.2.0 public tarball's file set against this release's candidate, and the diffs of the generated files the CHANGELOG describes.

## 📦 Dependency disclosure (ballot `2026-10-03-hermetic-publish-path` § 7)

Filled in before S, from `git diff --stat v16.2.0 <S> -- '*package-lock.json' '*package.json'`.
