# Implementation Plan: 118 — Module Resolution Contract

**Date**: 2026-10-26
**Spec**: 118 — Module Resolution Contract
**Author**: Ada
**Criteria mode**: per-parent

## Tasks

- [x] 4. Land the runtime-TS loader contract

  **Type**: Implementation
  **Agent**: Ada (main session)

  **Success Criteria:**
  - `npx tsc --noEmit` passes with the loader's package exports in place
  - Consumer `.ts` imports resolve from the compiled output, verified by the consumer smoke test
  - Component token files load at runtime without a build step
