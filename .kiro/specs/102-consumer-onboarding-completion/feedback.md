# Spec Feedback: Consumer Onboarding Completion

**Spec**: 102-consumer-onboarding-completion
**Created**: 2026-05-07

---

## Design Outline Feedback

### Context for Reviewers

- **Origin**: All 5 gaps captured during Spec 101 Task 2.3 post-publish verification on 2026-05-07. Source of truth: `.kiro/issues/2026-05-07-consumer-onboarding-gaps.md` (Ada authored at 00:33 local; contains full detail for each gap). → design-outline.md § "Problem"
- **Why a spec and not ad-hoc fixes**: The 5 gaps share a common theme (consumer onboarding flow), touch both Ada's and Thurgood's domains, and require a new package publish to reach consumers. Spec wrapper keeps the work coordinated and gives the publish its own verification gate.
- **Lightweight spec by convention**: Following Spec 101's pattern — design outline + feedback round + tasks doc, skipping formal requirements.md and design.md. Scope is mechanical (5 surgical fixes + 1 doc update + 1 test + 1 publish), no architectural decisions to formalize. If Ada's review surfaces architectural concerns, we can add them.
- **Not in scope — explicitly**: See design-outline.md § "Scope > Out of scope" for what this spec does NOT address (other triage items from 2026-05-07, release-tool regressions, broader Integration Guide work).
- **Version decision default**: `11.1.0` (minor, non-breaking). Flagged as Open Question 5 in case Ada sees consumer-breaking character in any of the fixes.
- **Stakeholder identification**: Ada (primary reviewer — owns 4 of 5 gaps, owns the publish mechanics). Thurgood (co-author/reviewer — owns Gap 4 doc update, completion documentation). Peter (approver/publisher). Lina not involved — no component-layer work in scope.

### Reviewer Requests

[@ADA] Primary review requested. Please validate:

1. **Gap fix approaches** — for each of Gaps 1, 2, 3, 5, is my suggested fix direction correct? Any edge cases in the source code that I'm missing?
2. **Open Question 1** — parent task structure: one parent (all work) or two parents (fixes + publish, mirroring Spec 101)? Your call.
3. **Open Question 2** — integration test scope: init.ts only, or also CLI wrapper stderr routing? Recommendation?
4. **Open Question 3** — Gap 3 behavior: merge (my lean), prompt on conflict, or warn-and-skip?
5. **Open Question 4** — Gap 5 mcp.json merge: how should init handle an existing `.kiro/settings/mcp.json` with potentially conflicting `designerpunk-docs` / `designerpunk-application` entries?
6. **Open Question 5** — version: `11.1.0` appropriate, or do any of these fixes change behavior in a consumer-breaking way?
7. **Integration test location** — Risk 5 flags that `src/cli/__tests__/` may not exist. Where should the test live?

[@PETER] For awareness before execution:

1. The publish is a second publish event after Spec 101's. Same authorization pattern — you'll review Parent work before authorizing `npm publish` and the Integration Guide update before it goes live in the published package.
2. Task 2.3-equivalent verification is still required in Parent 2. You'll run the fresh-repo walkthrough against `@3fn/core@11.1.0` the same way you ran it against `11.0.0`.

---

## Tasks Feedback

### Context for Reviewers

[To be populated after design outline feedback is incorporated.]

---

## Resolution History

[Resolutions tracked here as feedback is incorporated.]
