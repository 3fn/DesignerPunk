# Spec 120: Modal Component

**Date**: 2026-06-19
**Status**: Placeholder (pending Spec 119 migration completion)

---

## Purpose

Semantic modal component family implementation — demonstrating token creation and component development workflows.

## Case Study Requirement

This spec serves a dual purpose: delivering the modal component AND providing the "after" measurement for the Spec 119 Steering Progressive Disclosure Redesign case study.

**Requirement**: During formalization of this spec (design outline → requirements → design → tasks), document:

1. **Context access patterns**: Which docs were queried via MCP, when, and for what purpose
2. **Friction points**: Any moments where the agent needed context that wasn't readily discoverable
3. **Contrast with Spec 119**: Compare this formalization experience (MCP-only delivery) against Spec 119's formalization (all-docs-loaded). Document: differences in speed, accuracy, missed context, routing table effectiveness
4. **Certainty calibration in practice**: How often did the three-tier protocol activate? Was it helpful or overhead?

This data feeds directly into Spec 119's case study deliverable (Success Criterion #11).

---

## Scope (to be expanded)

- Modal-Base primitive component
- Modal-Dialog semantic variant (minimum)
- Behavioral contracts (focus trapping, dismissal, backdrop)
- Token creation for modal-specific values (if needed)
- Cross-platform implementation (web, iOS, Android)

---

## Dependencies

- **Spec 119**: This spec should be executed AFTER Spec 119 migration is complete (at minimum through Phase 8 / Quality Gate) so that the MCP-only delivery model is active during formalization.
