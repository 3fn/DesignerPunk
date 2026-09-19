# Implementation Plan: 169 — Form Input Float Label

**Date**: 2027-03-02
**Spec**: 169 — Form Input Float Label
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 1. Ship the float-label primitive

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - The float-label primitive animates the label without triggering layout of siblings

- [x] 2. Ship Input-Text-Float on web

  **Type**: Implementation
  **Agent**: Sparky (main session)

  - [x] 2.1 Implement the component
  - [x] 2.2 Wire the contract suite

- [ ] 3. Ship Input-Text-Float on iOS

  **Type**: Implementation
  **Agent**: Kenya (main session)

  **Success Criteria:**
  - The iOS implementation satisfies `content_float_label` under the shared contract suite
