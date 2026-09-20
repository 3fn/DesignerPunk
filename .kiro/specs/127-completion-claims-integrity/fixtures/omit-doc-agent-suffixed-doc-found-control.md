# Fixture spec: omit-doc-agent-suffixed-doc-found-control

**Case**: `omit-doc-agent-suffixed-doc-found-control`
**Class**: omit-doc (**PASS-expected control** — the doc-location glob family)
**Expected exit**: GREEN (zero), no emission
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

A fully compliant parent whose completion doc is **not** named `task-2-completion.md`. It is named `task-2-kenya-completion.md` — the agent-suffixed form the 122 cutover produced, one of the corpus-verified variants in the glob family `task-N*(-<suffix>)?(-parent)?-completion.md`.

The failure this controls for is the most insidious one available to a checker, because it is **green with an emission**: a narrow glob finds no doc, emits `completion-doc-not-found`, exits zero, and reports a clean run. The parent *was* documented, compliantly, and the instrument says it wasn't — so the doc is never evaluated, the claims pass inherits a false hole to chase, and the emission count that is supposed to measure real gaps is contaminated by phantom ones. A false `completion-doc-not-found` is worse than a false red: red gets fixed, and a phantom emission gets normalized as noise until nobody reads the emissions at all. That is how the honest third state rots into dormancy.

This fixture also bounds the glob's **other** failure direction: it must find the suffixed sibling for parent 2 without over-matching (a doc for parent 2 must not be matched for parent 20 or 21 — a real hazard for any implementation that globs `task-2*`).

## tasks.md fragment

```markdown
# Implementation Plan: 178 — Navigation Screen iOS

**Date**: 2027-03-23
**Spec**: 178 — Navigation Screen iOS
**Author**: Leonardo
**Criteria mode**: per-parent

## Tasks

- [x] 2. Implement the settings screen on iOS

  **Type**: Implementation
  **Agent**: Kenya (main session)

  **Success Criteria:**
  - The settings screen's component tree matches the screen spec's declared tree
  - Every color and spacing value resolves from a source semantic token, with no literals in the view code
  - VoiceOver traverses the screen in the order the screen spec declares
```

## completion-doc fragment

**`task-2-kenya-completion.md`** — the filename is the fixture:

```markdown
# Task 2 Completion: Implement the settings screen on iOS

**Date**: 2027-03-26
**Task**: 2. Implement the settings screen on iOS
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The settings screen's component tree matches the screen spec's declared tree | ✅ | `.kiro/specs/178/reports/implementation-ios.md#component-tree` |
| Every color and spacing value resolves from a source semantic token, with no literals in the view code | ✅ | `SettingsScreenTokens.swift` |
| VoiceOver traverses the screen in the order the screen spec declares | ✅ | `.kiro/specs/178/reports/implementation-ios.md#voiceover-order` |

Unmet or partially met criteria: None
```

## Required verdict

- **Verdict**: `PASS` on parent 2.
- **`sourceFiles`**: the located match is recorded as `task-2-kenya-completion.md` (B-4's manifest naming — the run's output must name the file it evaluated, so a human can confirm the right artifact was read).
- **Emissions**: **none**. Specifically, **no** `completion-doc-not-found` emission for parent 2.
- **Exit semantics**: GREEN — exit zero.
- **Must NOT be produced**: a `completion-doc-not-found` emission; any verdict.

## Encoding notes

- Encode as `{ tasks.md, task-2-kenya-completion.md, expected.json }`. **The completion doc's filename is load-bearing** and must not be normalized to `completion.md` during encoding. If the build's fixture harness assumes a fixed `completion.md` name, the harness needs a per-fixture filename field — and that is a real requirement, not a workaround: doc location is a corpus-verified variance surface (two dominant forms plus agent-suffixed and letter-suffixed variants), and a harness that cannot express filenames cannot test it at all.
- Evidence cells cite a committed Implementation Report at claim grain (`#component-tree`, `#voiceover-order`) — the Req 10.2 product-tier shape. Those anchors must classify as `path` evidence, not `empty-or-prose`; a red here would make the entire product tier's ruled Evidence substrate non-compliant, which is a second, larger false-positive class this control happens to cover.
