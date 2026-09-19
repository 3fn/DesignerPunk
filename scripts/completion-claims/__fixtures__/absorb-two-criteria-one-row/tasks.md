# Implementation Plan: 126 — Loading Family Base

**Date**: 2026-11-09
**Spec**: 126 — Loading Family Base
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 1. Ship the Loading-Spinner-Base web implementation

  **Type**: Implementation
  **Agent**: Sparky (main session)

  **Success Criteria:**
  - The web implementation renders the loading state without layout shift at every size token
  - The web implementation announces the loading state to assistive technology
  - Reduced-motion users receive the static variant, verified against the media query
