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

The 16.3.0 trio runs as written before S (Peter's (a), #844): three persona runs, and the Kiro conformance pair as a fourth sitting (Peter, 2026-11-09T04:30:59Z, on #850).

1. **Candidate**, the release PR's pushed head (protocol § 17.1, "the batching PR's candidate"):
   - **F**: `bd7e340b37b5c4872b2c3ffcbb1df53cd28c22e7`;
   - **pack**: `3fn-core-16.3.0.tgz`, sha1 `7c0fc15745ed7210736e4b20dab3c240ffa3c46e`, sha256 `625e7cb5d9b6272a165137646e4ed513efaec02b6a29632e7b1da98eecc23fd3`;
   - 1739 files, 6710710 bytes; pack-assert 115/115; publish path 16 (floor 16).
   - **How it was built**: `npx tsx scripts/release-publish.ts --dry-run bd7e340b37b5c4872b2c3ffcbb1df53cd28c22e7`, in a fresh clone at F. The tarball and `release-publish-record.json` were copied unchanged to `u5-pack/16.3.0/`. The record carries the sha1; the sha256 is `shasum -a 256` of the same file.
   - **What it lacks**: unlike 16.1.0's and 16.2.0's main-commit candidates, this candidate carries the release PR's own diff (version, CHANGELOG, notes). It lacks only the squash itself.
   - **Staleness**: a later commit on this branch that touches a `files[]` path makes the candidate stale. Any such commit is named in the PR body.
2. **A second candidate, F2, under Peter's (a2)** (2026-11-09T23:28:14Z, "(a2), proceed as recommended"; `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-09-peter-ruling-init-validate-line-a2.md`).
   - **Why**: `init`'s closing note said `validate`'s relationships check "currently fails even on unmodified token source". That was false on F1. Ada fixed the string (`512b81af1`).
   - **The candidate**: F2 is `08eb6c4cb9c105035988b6160d69d85233321ace`, pack `3fn-core-16.3.0.tgz` at `u5-pack/16.3.0-F2/`, sha1 `60537fdcad0945823ae0273807c98abf2dc0b658`, sha256 `dc6f7c75fd97948bb809b06bf8671003d68cdd7125ecac35668cbe2a48e939ba`; 1739 files, 6710528 bytes; pack-assert 115/115.
   - **The delta F1 → F2**: an identical file list. Six packed files differ in content: the one `errorCatalog` string, in `dist/cli/shared/errorCatalog.js` and the two MCP bundles that embed it, plus three build-stamp lines.
   - **Which sittings use which**: sittings 2–4 stand on F1, and sitting 1 runs on F2. Each record names its own F.
3. **The runs and their findings**: records are under `tests/onboarding-trio/records/16.3.0/`. Each run's stop line is `completed` for every session unless stated. "Clean" is the record's own verdict on DesignerPunk-relevant state in the run store.
   - **Sitting 1, `trio-1-backend.md`** (Dana, a backend engineer, Claude Code): candidate **F2**; stop `completed` (preflight, birth, open, both probes); `clean`. **This is the one field observation of the (a2) fix**: `init`'s closing note printed the corrected line ("`generate` does not check these relationships; run `npx designerpunk validate` to check them"), Dana ran `validate`, and it passed. The corrected Themes clause also reached her terminal.
   - **Sitting 2, `trio-2-designer.md`** (Rosa, a designer, Kiro): candidate **F1**; stop `completed`; `clean` (the login and conversation rows live in the real profile). Rosa read the old, false `validate` line and ran no `validate`, so the (a2) fix is `fixed-not-observed` here.
   - **Sitting 3, `trio-3-pm.md`** (Priya, a product manager, Kiro): candidate **F1**; stop `completed`, after one operator unblock (two empty Returns, below); `clean`. (a2) is `fixed-not-observed`.
   - **Sitting 4, the Kiro pair** (`conformance-kiro-beat-1.md` and `conformance-kiro-beat-2.md`): candidate **F1**; `clean`. **The pair did not pass.** Beat 1 did not finish: consumer-Thurgood's re-grounding run ended on `harness-error: Kiro rate limit reached` on **both** attempts, leaving one README commit and four untracked spec documents, with no screen spec and no report. Beat 2 then audited that partial output and was right on all six verdicts, but it never faced an overclaim, so it shows neither Thurgood's rendering finishing a five-task assignment nor Stacy catching a false claim. Only the identity probes ran to the end (three of four items passed, one cannot-tell, for each agent as recorded). Peter ruled that beat 1 stands with this gap stated (2026-11-10T00:47:47Z, "(a), let it stand with the gap stated"); the re-run stays open in `.kiro/issues/2026-10-25-kiro-conformance-pair-requeue.md`.
   - **What a consumer should know** (none stops the install path, and none gates this release):
     - **`init` can hang in Kiro.** INSTALL § 3 says `init` stops with an error where no terminal is attached, "an agent's shell". Kiro's shell does attach a terminal, so `init` (reached through `init --help`) prompted invisibly and waited 251 s until an operator pressed Return. Pass `--name`, `--abbreviation` and `--target` and it does not prompt (R3-21, `trio-3-pm.md`).
     - **`validate_assembly` gives a misleading error when the assembly is passed as a string**: "Component \"undefined\" not found in catalog", with no word that the type is wrong. Pass an object. Seen twice, with two different agents (R3-22, `trio-3-pm.md`; CK-4, `conformance-kiro-beat-1.md`).
     - **Consumer-Leonardo told Priya the plan was "all web-ready" after the whole-tree validation failed, without saying so** (R3-23, `trio-3-pm.md`).
     - **Kiro's free tier rate-limits the conformance pair**, and after a rate limit kiro-cli prints "Tool approval required" although tools are trusted; the message names the wrong cause (CK-2 and CK-3, `conformance-kiro-beat-1.md`).
     - **A persona wrote a helper script outside the run folder**, which the audit cannot stop (R1-24, `trio-1-backend.md`); and the protocol's founder step count is 5 where INSTALL § 3 now lists 4 (R2-20, `trio-2-designer.md`). Both are test-instrument matters, not product ones.
     - **The `init` closing-note `validate` line was found false during the trio and fixed as F2** (CK-1, `conformance-kiro-beat-1.md`; section 2 above).

## 📦 Packed output against the previous public artifact (RELEASE-FLOW step 2)

- **The previous release's tarball**: `npm pack @3fn/core@16.2.0 --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org`, sha1 `6f8210a604e7b72d293e60a74a6a292b9eda7a2a`, equal to the 16.2.0 step-6 record's (`docs/releases/16.2.0/publish-verification.txt` L24).
- **The file set**, against the candidate at F (`LC_ALL=C comm -3`): **7 removed, 45 added**.
  - **Removed**:
    - the four native root token files `dist/{Design,Component}Tokens.{ios.swift,android.kt}` (Spec 129 Task 17; the CHANGELOG's Removed and item (iii));
    - `dist/components/core/Badge-Count-Notification/tokens.{js,d.ts}`, renamed to `badgeNotificationColorMap.{js,d.ts}` (#830). They sit under no `exports` entry, so no consumer import resolves to them;
    - `src/components/core/Icon-Base/platforms/android/res/drawable/README.md`, moved out of `res/` (#695).
  - **Added**:
    - 14 files under `dist/cli/` and 12 under `dist/generators/`: Spec 129's `generate`, `init` and `sync` code;
    - `dist/config/` (4), `dist/themes/` (4) and `dist/tokens/color/primitives/shadow.{js,d.ts}`;
    - `badgeNotificationColorMap.{js,d.ts}`;
    - the six component-token definition files under `src/components/core/` and `src/tokens/color/primitives/shadow.ts` (Task 13).
- **At S**, the author repeats the file-set compare on 5.1's tarball and pastes it in the step-6 `.txt`.

## 📦 Dependency disclosure (ballot `2026-10-03-hermetic-publish-path` § 7)

**No embedded dependency version changed against 16.2.0's public artifact.** `git diff --stat v16.2.0 bd7e340b3 -- '*package-lock.json' '*package.json'` changes only the root `package.json` (its version and `files[]`) and `package-lock.json`'s two version fields.
