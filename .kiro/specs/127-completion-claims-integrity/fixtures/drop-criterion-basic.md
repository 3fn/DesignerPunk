# Fixture spec: drop-criterion-basic

**Case**: `drop-criterion-basic`
**Class**: drop
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The mutation this law was written for. A parent promises four criteria; three were met and one — the mode-parity criterion — was not. The completion doc reproduces the three met criteria **verbatim, in full, with real evidence**, and simply never mentions the fourth. There is no lie anywhere on the page: every row present is true, every evidence cell resolves, the forced-negative line honestly says `None` *about the rows shown*. The doc is shorter than the promise and nothing in the doc says so.

A lazy checker passes this, and passes it for a structurally appealing reason: every check it runs is a check **over the rows that exist** — cells non-empty, status marks in vocabulary, evidence shaped like paths. Row-wise validation can never see a row that was never written. Only a predicate that starts from `tasks.md` and demands the **set** catches it. This fixture is the reason parity is a multiset equality against the promise and not a shape audit of the table.

## tasks.md fragment

```markdown
# Implementation Plan: 099 — Elevation Token Family

**Date**: 2026-10-06
**Spec**: 099 — Elevation Token Family
**Author**: Ada
**Criteria mode**: per-parent

## Tasks

- [x] 2. Generate the elevation tokens across platforms

  **Type**: Implementation
  **Agent**: Ada (main session)

  **Success Criteria:**
  - `npm run generate:platform-tokens` emits the six elevation tokens for web, iOS and Android with zero validation errors
  - Every semantic elevation token resolves to a primitive in the registry — no literal values in the semantic layer
  - The dark-mode elevation set passes `npm run audit:mode-parity` with zero unmatched keys
  - The generated CSS custom properties match the registry values for all six elevation steps

  - [x] 2.1 Define the six elevation primitives
  - [x] 2.2 Define the semantic layer and regenerate all three platforms
```

## completion-doc fragment

`task-2-completion.md`:

```markdown
# Task 2 Completion: Generate the elevation tokens across platforms

**Date**: 2026-10-09
**Task**: 2. Generate the elevation tokens across platforms
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| `npm run generate:platform-tokens` emits the six elevation tokens for web, iOS and Android with zero validation errors | ✅ | `npm run generate:platform-tokens → 0 errors, 3 platforms written` |
| Every semantic elevation token resolves to a primitive in the registry — no literal values in the semantic layer | ✅ | `src/tokens/semantic/elevation.ts` |
| The generated CSS custom properties match the registry values for all six elevation steps | ✅ | `ElevationGeneration.test.ts › css custom properties match registry` |

Unmet or partially met criteria: None
```

## Required verdict

- **Verdict**: `SET_MISMATCH` on parent 2.
- **Reported diff**: one criterion present in `tasks.md` and absent from the table — the bullet reproduced exactly, backticks included:

  ```
  The dark-mode elevation set passes `npm run audit:mode-parity` with zero unmatched keys
  ```
- **Exit semantics**: RED — non-zero exit. No emission accompanies it; nothing here is waived.
- **Must NOT be produced**: `PASS`; `EVIDENCE_NONCOMPLIANT` (every present row's evidence is compliant — a checker that reds this for the wrong reason has not demonstrated the set predicate).

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`. The completion doc's filename in the fixture directory is immaterial to this case (doc-location variants are exercised by `omit-doc-agent-suffixed-doc-found-control`).
- `expected.json` SHOULD record the missing criterion string so a regression that reds for a different reason fails the fixture.
