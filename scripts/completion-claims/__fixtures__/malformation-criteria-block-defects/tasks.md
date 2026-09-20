# Implementation Plan: 166 — Modal Family Base

**Date**: 2027-02-23
**Spec**: 166 — Modal Family Base
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

**Success Criteria:**
- The modal family ships with a shared focus-trap primitive

- [x] 1. Ship Modal-Dialog-Base

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:** none — this parent's promises are the declared artifacts below
  - Modal-Dialog-Base traps focus within the dialog while open
  - The dialog is dismissible by Escape

- [x] 2. Ship Modal-Sheet-Base

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Modal-Sheet-Base renders at every breakpoint without clipping

  **Primary Artifacts:**
  - src/components/modal/ModalSheetBase.ts

  **Success Criteria:**
  - Modal-Sheet-Base announces its open state to assistive technology
