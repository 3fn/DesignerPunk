# Task 23 Summary: The banner predicate, guard, and banners (U4)

**Date**: 2026-10-13
**Purpose**: Concise summary of Task 23 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Shipped the audience-banner convention for the governance docs the package serves whole, in one module, `scripts/audience-banner/predicate.ts`:

- **The membership predicate** (Ada's text, version 1): a doc needs a banner if it contains `complete-task\.sh`, `Peter merges`, `RATIFIED` or `ballot`. It matches 18 of the 83 `governance/*.md` docs today and none of the 15 `Token-Family-*` docs. The predicate's under-inclusion limit is declared in the file's own header.
- **The banner template and its recogniser**: one `> **Audience framing**:` blockquote form, rendered by one function and read by the guard. It names whose process or components the doc describes, what in it is DesignerPunk's worked example, and what transfers.
- **The presence guard** (`predicate-match ⇒ banner-present`): `scripts/audience-banner/__tests__/audience-banner.test.ts`, run by `npm run test:scripts` inside the existing required lane `lane-functional-root`. It reports `18 match; 18 carry` and lists every matched doc by path. Its claim is scoped to the predicate, never to the corpus. It was bitten both ways: a real-corpus red run (19 failed) before the banners landed, and a synthetic two-sided fixture.
- **20 banners**: the 18 matched docs plus two docs declared outside the predicate (`Component-Readiness-Status`, `Component-Quick-Reference`), which describe DesignerPunk's own components. Each banner's worked-example and transferable sentences were inspected per doc and cited to lines in the doc; Lina confirmed her seven, and the orchestrator read the other thirteen independently.

## What Was Ruled

Peter's rulings of 2026-10-13: the registration is the existing lane, so the criterion's coverage-map-row clause was amended out (governance docs are not coverage-map surfaces); the two Req 20.7 docs are banded outside the predicate by declaration; the predicate stays v1 and stays one-directional. Stacy's ARMING event fires at the U4 merge.

## What Is Deferred

- The test file's dormancy (it dropping out of the lane's selection) goes undetected until the named-guard selection floor lands, charter `.kiro/issues/2026-10-13-named-guard-selection-floor-then-map-column-derivation.md`.
- The generated lock refreshes once at unit close; the consumer-facing CHANGELOG line lands at release-4 prep.
- Dead `.kiro/steering/Component-Family-*` paths found at the owner read go to Lina's content-debt.

## Where to Look

- Detailed completion doc: `.kiro/specs/123-consumer-distribution/completion/task-23-completion.md`, with the subtask docs `task-23-1-completion.md`, `task-23-2-completion.md` (the per-doc table) and `task-23-3-completion.md` (the registration evidence and the ARMING notice).
