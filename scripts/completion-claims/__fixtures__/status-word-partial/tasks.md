# Implementation Plan: 201 — Profile Loader

**Date**: 2026-10-19
**Spec**: 201 — Profile Loader (synthetic D-2 fixture)
**Author**: Thurgood
**Criteria mode**: per-parent

## Tasks

- [x] 1. Ship the profile loader

  **Type**: Implementation
  **Agent**: Thurgood (main session)

  **Success Criteria:**
  - Alpha: the CLI prints the resolved profile path on every run
  - Beta: the profile loader rejects an unknown key with a named error
  - Gamma: the README documents the profile file location
