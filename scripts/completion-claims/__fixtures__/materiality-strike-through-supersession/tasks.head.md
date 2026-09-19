# Implementation Plan: 118 — Module Resolution Contract

**Date**: 2026-12-18
**Spec**: 118 — Module Resolution Contract
**Author**: Ada

## Tasks

- [x] 1. Define the runtime-TS loading contract

  **Type**: Implementation
  **Agent**: Ada

  **Success Criteria:**
  - Consumer `.ts` imports resolve from the compiled output
  - The package exports map covers every published entry point

- [x] 2. Ship the web consumer path

  **Type**: Implementation
  **Agent**: Sparky

  **Success Criteria:**
  - The web consumer smoke test passes against the published tarball

- [ ] ~~3. Ship the Android consumer path~~ (superseded — moved to Spec 151)

  **Type**: Implementation
  **Agent**: Data

  **Success Criteria:**
  - The Android consumer smoke test passes against the published artifact
  - Kotlin token constants resolve without a build step
