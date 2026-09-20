# Implementation Plan: 122 — Agent Generator

**Date**: 2026-12-22
**Spec**: 122 — Agent Generator
**Author**: Thurgood
**Status**: Unit 2 merged; cutovers in progress

## Tasks

- [x] 2. Build the generation pipeline

  **Type**: Implementation
  **Agent**: Thurgood

  **Success Criteria:**
  - The generator emits both agent trees from `canonical/agents/*.md` with the diff guard
    green on a clean tree
  - Hand-edits to a generated file are detected by the diff guard and reported with the file path

- [x] 3. Cut Ada over to the generated prompt

  **Type**: Implementation
  **Agent**: Thurgood

  **Success Criteria:**
  - Ada's generated prompt is byte-identical in both mirrors
