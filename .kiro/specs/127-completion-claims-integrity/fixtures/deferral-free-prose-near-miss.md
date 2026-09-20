# Fixture spec: deferral-free-prose-near-miss

**Case**: `deferral-free-prose-near-miss`
**Class**: deferral
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

A deliberate later-unit delivery, declared honestly and in the wrong form. The author wrote:

> `Artifact deferred to U3: scripts/completion-claims/materiality.ts — ships with the charters unit`

Everything a human needs is there: the artifact, the destination, the reason. And it is **non-compliant**, because the machine-readable exclusion that a deferral earns is only mechanically decidable when the form is fixed (Req 1.5, B-6 ruling 1). Path and delivering unit must be extractable **by rule**; "to U3:" before the path and an em-dash clause after it defeat exactly that.

The near-miss is calibrated to be maximally tempting: it begins with the literal words *Artifact deferred*, so any implementation that detects deferrals with a loose `/Artifact deferred/` test will **honor** it — and honoring a free-prose deferral is worse than missing it, because it converts an unfalsifiable prose claim into a machine-granted exclusion. That is the failure mode this fixture exists to catch: not "the checker missed a deferral", but "the checker accepted one it could not parse".

The second, quieter target is the walk-back. Stacy's CLOSEOUT duty verifies every `Artifact deferred: <path> → <unit>` against reality. A declaration the parser cannot extract is a declaration the walk-back cannot enumerate — a promised-annotated-never-shipped artifact with no downstream reader. The fixed form is what makes the audit's input set complete.

## tasks.md fragment

```markdown
# Implementation Plan: 139 — Claims Pipeline Tooling

**Date**: 2026-12-07
**Spec**: 139 — Claims Pipeline Tooling
**Author**: Thurgood
**Criteria mode**: per-parent

## Tasks

- [x] 2. Build the claims-pipeline modules

  **Type**: Implementation
  **Agent**: Thurgood (main session)

  **Success Criteria:**
  - The normalization module implements the four rules and the checkbox mask with its own suite
  - The tasks.md parser recognizes all three parent forms with its own suite

  **Primary Artifacts:**
  - scripts/completion-claims/normalize.ts
  - scripts/completion-claims/tasks-md.ts
  - scripts/completion-claims/materiality.ts

  **Merge gate:**
  - `npm test` green on the unit branch before the PR opens
```

## completion-doc fragment

`task-2-completion.md`:

```markdown
# Task 2 Completion: Build the claims-pipeline modules

**Date**: 2026-12-10
**Task**: 2. Build the claims-pipeline modules
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The normalization module implements the four rules and the checkbox mask with its own suite | ✅ | `normalize.test.ts › four rules applied in order` |
| The tasks.md parser recognizes all three parent forms with its own suite | ✅ | `tasks-md.test.ts › plain, bold and task-label parent forms` |

Unmet or partially met criteria: None

### Additional verification

| Condition (verbatim) | Status | Evidence |
|---|---|---|
| `npm test` green on the unit branch before the PR opens | ✅ | `npm test → 0 failures, 418 suites` |

Primary Artifacts: all shipped as declared, except as noted below

Artifact deferred to U3: scripts/completion-claims/materiality.ts — ships with the charters unit
```

## Required verdict

- **Verdict**: `AV_MISSING_OR_MALFORMED` on parent 2, carrying the catalog message **verbatim**:

  ```
  malformed deferral: not the fixed form 'Artifact deferred: <path> → <unit>'
  ```

  (the `<path>` / `<unit>` placeholders are part of the fixed catalog string and are **not** slot-filled — the message quotes the required form, it does not describe the offending line.)
- **Parse state**: the offending line is recorded in `malformedDeferrals`, and `deferrals` is **empty** — no deferral is honored.
- **Emissions**: **no** `av-deferral-declared` emission is produced. A malformed deferral earns no exclusion anywhere.
- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS`; an `av-deferral-declared` emission for this line; a silent skip in which the line is neither honored nor flagged.

## Contest note

The design's loud-failure catalog fixes the **message** for this condition but does not name the enclosing `Verdict` member. I specify `AV_MISSING_OR_MALFORMED` because the defect lives in the AV section and the enum offers no `MALFORMED_DEFERRAL` member (design C3 models malformed deferrals as a *parse state*, not a verdict). If the build prefers `MALFORMATION`, that is a defensible reading of the same design text and the fork is Peter's to settle — but three things are **not** negotiable and `expected.json` must pin them: the catalog message verbatim, `deferrals` empty, and non-zero exit.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- The artifact line reads `all shipped as declared, except as noted below` — a deliberate second near-miss. It is *not* the defect under test; if the build also reds it as a malformed artifact line, the fixture still passes provided the deferral message is emitted, but `expected.json` should pin the deferral message as required, not as one-of.
