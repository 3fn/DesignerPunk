# Is a real-browser test lane chartered? jsdom cannot prove form submission (E7)

**Date**: 2026-10-25
**Type**: CHARTER QUESTION. A decision is owed, and no build is authorized by this record.
**Owner**: **Thurgood** (test infrastructure and the lane set are his). **Filed by**: Lina, under rule 10, from the `**Open for Peter**` (2) line in #450's body; rule 9 applies to every later edit. Lina and Sparky are the verified parties (their components' tests are what a lane would run).
**Class**: P3 improvement · owed-act *(set 2026-10-25, Lina as filer; Thurgood owns and may re-class. The E1 defect that this gap let through is fixed and its form submission is browser-verified once, by hand, in Chromium. What remains is the absence of any repeatable proof, and nobody is misled by that.)*
**Trigger**: `manual` — the event is Peter's ruling on whether a real-browser lane is chartered, and then the PR that adds it or the PR that records the decline, which names this record (rule 1: a P3 that would ride takes `manual`, naming its own fixing PR as the event). If it is chartered it may be folded into the Spec 129 harness charter (`2026-09-17-platform-build-verification-harness-candidate.md`; see below) or stand alone.
**Status**: **OPEN** — **Peter has not ruled, and #450 merged (2026-10-24/25, `07cfb7c41`) with this question open.** Nothing below is his answer.

---

## The question

Is a real-browser test lane chartered (headless Chrome in CI)? jsdom 26.1.0 (read in source by Lina, 2026-10-23) has no `setFormValue`, never calls `formResetCallback`, and does not put a form-associated element into `FormData`. So the checkbox tests assert the value the component registers with a spied `ElementInternals`, and cannot prove that a form submits it. The E1 verification was a one-time orchestrator-driven Chromium run (Sparky judged it), not a lane. It is item E7 in `.kiro/issues/2026-10-20-web-element-api-and-form-participation.md`, which stays open until this record has an outcome.

## Why it matters beyond E1

- The contract's own `test_approach` ("Place checkbox in form, check it, submit / Verify value in form data", `Input-Checkbox-Base/contracts.yaml:157–160`) can be carried out only in a browser. Until a lane exists, that line is carried out by hand or not at all, which is how E1 passed unseen.
- Other web components share the shape: Input-Radio-Base is already form-associated; E2 (text inputs) would add more. Every `ElementInternals` claim has the same jsdom limit.
- Browsers differ here: Chromium is verified, Safari 16.4+ and Firefox are not.

## Where it might live

- **Not the existing harness charter by default.** `2026-09-17-platform-build-verification-harness-candidate.md` is about compiling generated Swift and Kotlin (owners Kenya and Data; evaluation at Spec 129's `tasks.md`). A browser lane tests web behaviour, not compilation, and its designers would be Thurgood and Sparky. But Spec 129 is the first place a "run it on a real platform" lane is being designed, so Thurgood may judge that a web lane belongs beside it and share its decision. That is his call.
- **Separate record is the default** until he says otherwise: the lane set and in-lane guards are his (CI regime standing test-lane scope).

## Surviving counter-argument

A browser lane is real CI cost (a browser binary, flake risk, wall-clock time) for one contract line on two components. The manual run plus a per-release checklist row may be enough. The lane earns its cost only if more form-participation components (E2) are coming. That fork is Peter's.

## What closes this record (rule 5)

Peter's ruling on the record, then either the PR that adds the lane (the owner records its lane name) or the PR that records the decline with the manual checklist in its place. The owner adds rule 5's outcome line and archives; E7 in the web-element record gets its outcome line in the same PR.
