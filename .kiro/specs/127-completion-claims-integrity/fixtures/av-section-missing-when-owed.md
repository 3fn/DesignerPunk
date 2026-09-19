# Fixture spec: av-section-missing-when-owed

**Case**: `av-section-missing-when-owed`
**Class**: av-gate
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The parent declares both promise blocks — `**Primary Artifacts:**` and `**Merge gate:**` — so the Additional verification section is owed. The completion doc carries a perfect criteria table, the forced-negative line, a substantial integration narrative, and **no AV section at all.**

This is the omission that reads as completeness. The doc is long, careful and self-evidently the work of someone who took the table seriously; the absent section leaves no scar on the page, because a section that was never written produces no visible gap. The author almost certainly believed the criteria table *was* the obligation — which is precisely why Req 1.5 words it **required-if-applicable, never optional**, and why the failure must be loud rather than advisory.

A lazy checker passes this because the AV duty is **conditional**, and conditional duties are the ones implementations forget to evaluate when the condition is true but the artifact is absent. The natural shape of the bug is: parse the doc, find no AV section, set `av: undefined`, and then run every AV assertion inside `if (doc.av)`. That code is green on this fixture forever and red on nothing. The obligation must be computed from `tasks.md` (does the parent declare the blocks?), not from the doc (did the author write a section?).

## tasks.md fragment

```markdown
# Implementation Plan: 133 — Release Tooling Rewrite

**Date**: 2026-11-23
**Spec**: 133 — Release Tooling Rewrite
**Author**: Thurgood
**Criteria mode**: per-parent

## Tasks

- [x] 1. Replace the release manager with the delta pipeline

  **Type**: Implementation
  **Agent**: Thurgood (main session)

  **Success Criteria:**
  - The delta pipeline derives the release delta from merged unit PRs with no manual list
  - `npm run release:dry-run` produces the same delta as the retired tool on the last three releases
  - The 36 retired files are deleted and no import references survive

  **Primary Artifacts:**
  - scripts/release/delta-pipeline.ts
  - .kiro/hooks/RELEASE-FLOW.md

  **Merge gate:**
  - The dry-run comparison output is pasted into the completion doc
  - `npm test` green including the release suites
```

## completion-doc fragment

`task-1-completion.md`:

```markdown
# Task 1 Completion: Replace the release manager with the delta pipeline

**Date**: 2026-11-27
**Task**: 1. Replace the release manager with the delta pipeline
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The delta pipeline derives the release delta from merged unit PRs with no manual list | ✅ | `scripts/release/delta-pipeline.ts` |
| `npm run release:dry-run` produces the same delta as the retired tool on the last three releases | ✅ | `npm run release:dry-run → identical delta on v13.2.0, v13.3.0, v14.0.0` |
| The 36 retired files are deleted and no import references survive | ✅ | `npx tsc --noEmit → 0 errors` |

Unmet or partially met criteria: None

## Overall Integration Story

The delta pipeline now reads merged unit PRs directly, which removes the hand-maintained
release list that produced two mis-stated deltas in the previous cycle. The retired tool's
36 files are gone; the RELEASE-FLOW document points at the new commands throughout.
```

## Required verdict

- **Verdict**: `AV_MISSING_OR_MALFORMED` on parent 1.
- **Reason recorded**: the parent declares `**Primary Artifacts:**` and `**Merge gate:**`; no `Additional verification` section is present in the completion doc.
- **Exit semantics**: RED — non-zero exit.
- **Companion assertion**: criteria parity on this parent MUST be reported clean (`expected.json` asserts both), so the fixture fails a build that reds everything as well as one that greens the missing section.
- **Must NOT be produced**: `PASS`; an emission in place of a verdict. A missing AV section when owed is a red, not an observation — unlike the missing *completion doc*, which is another check's surface (see `omit-doc-no-completion-doc`). The distinction is deliberate and this pair of fixtures pins it.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- The prose section at the end is load-bearing for the fixture's adversarial quality: it makes the doc look complete. Do not trim it during encoding.
