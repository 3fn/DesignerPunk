# Spec Feedback: Design Outline

**Spec**: 106-consumer-contract-testing
**Phase**: Design Outline
**Created**: 2026-05-12

---

### Context for Reviewers
- Origin: Pattern analysis of v11.0.0 → v11.5.2 — 10 reactive patches all shared "works in core, breaks in product repos"
- Two test layers: export contract tests (fast, every commit) + consumer integration test (comprehensive, pre-publish)
- Key decisions: test location, install mechanism (pack vs link), devDep handling, what to edit/assert
- This spec provides the safety net for Spec 107 (Source Mode Architecture refactor)

---

[Agent feedback rounds here]
