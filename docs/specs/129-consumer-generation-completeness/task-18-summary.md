# Task 18 Summary: Acceptance at the final head, and the shipped wording (U12)

**Spec**: 129 - Consumer-Generation Completeness · **Unit**: U12 · **Date**: 2026-11-08

## What changed for an adopter

- The Integration Guide and INSTALL no longer point at `dist/DesignTokens.*` and `dist/ComponentTokens.*` for iOS and Android. Those four files are gone from the package; `npx designerpunk generate` writes the adopter's own copies.
- The "Native status" passage now says what Spec 129 gives: the token files `generate` writes, and DesignerPunk's component source, are compiled in DesignerPunk's own checks, for an iOS 17.0 deployment target and Android API 26 (`minSdk`), and not run on any device, simulator or emulator. It still says native onboarding is not supported yet.
- A consumer's Kenya and Data agents no longer tell the adopter to avoid or read the retired snapshot files, and the component source comments no longer point at them.
- Two more tests are named in-lane guards (the D2 check and the emitter comparison).

## Acceptance read at head H

All five harness jobs, the D2 check and `Consumer Guard` pass at H. The two token tiers hold no expected errors; the component tiers hold 49 (iOS) and 94 (Android) pinned errors, each tagged to an open record. A pass means the failures match the list, not that the code compiles.

## Still owed

The Token-Governance ballot (a DRAFT) before the S of the release that carried U9; Stacy's outcome line on the oracle-floors record; U12's own merged-head read.
