# Task 18.3 — The "Native status" passage, iOS and Android

**Date**: 2026-11-08 · **Agent**: Kenya (iOS, commit `57f61241b`), Data (Android, commit `e0d3669a6`); joined by Thurgood on `task/129-closeout` with `--no-ff` and a byte-check (the two changed files match the seat branch).

## What changed
- `governance/DesignerPunk-Integration-Guide.md`, ranges L179 (iOS "checked by reading the source" line), L183 (Android line) and the "Native status" passage (L197 onward, three lines becoming six); `docs/consumer/INSTALL.md` re-derived to match (`install-doc.test.ts` 81 of 81).
- The passage states Spec 129's reach as Requirement 1 accepts it, in Kenya's and Data's words, and carries both verbatim phrases: "compiled for an iOS 17.0 deployment target; not run on any device or simulator" and "compiled for Android API 26 (`minSdk`); not run on any device or emulator". No runtime-theme claim on either platform.
- **Edit kind for the PR body: CORRECTION** (the passage states what the shipped harness does; the observation record is Task 18's criterion and the truth referent is `harness/pins.yaml` and the verdict lines).

## Targeted tests
`npm test -- scripts/__tests__/install-doc.test.ts`: 81 passed.

## Adaptations
none.
