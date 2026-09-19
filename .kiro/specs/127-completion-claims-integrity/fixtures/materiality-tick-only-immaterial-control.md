# Fixture spec: materiality-tick-only-immaterial-control

**Case**: `materiality-tick-only-immaterial-control`
**Class**: materiality (**PASS-expected control**)
**Expected exit**: GREEN (zero), no verdict, no declaration demanded
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The control that keeps materiality honest in the other direction. Every fixture in the `materiality` class proves the extractor **fires**; this one proves it does not fire on the ordinary working commit — and without it, `git diff --quiet` would pass the whole class.

The head commit is what a real session produces: two ticks flipped, the header `**Date**` refreshed, a status note added to the header block, one long criterion bullet re-wrapped across two lines because an editor reflowed it, and a non-breaking space introduced where a copy-paste landed one. **Not one promise changed.** Under the ruled definition — normalized, checkbox-masked promise surface, compared before and after — this commit is immaterial, automatically, with no exclusion list: ticks are masked, the date and status note are outside the surface, and the reflow plus the NBSP are absorbed by the same four normalization rules the criteria cells use.

The stakes are adoption. If ordinary commits to legacy `tasks.md` files demand a declaration, authors will learn that the checker cries wolf, and the **one** signal that matters — a real promise change without a declaration — arrives in a stream of noise. Req 2.3.2's "no exclusion list exists or is needed" is a claim this fixture tests rather than assumes.

## tasks.base.md

```markdown
# Implementation Plan: 122 — Agent Generator

**Date**: 2026-07-02
**Spec**: 122 — Agent Generator
**Author**: Thurgood

## Tasks

- [ ] 2. Build the generation pipeline

  **Type**: Implementation
  **Agent**: Thurgood

  **Success Criteria:**
  - The generator emits both agent trees from `canonical/agents/*.md` with the diff guard green on a clean tree
  - Hand-edits to a generated file are detected by the diff guard and reported with the file path

- [ ] 3. Cut Ada over to the generated prompt

  **Type**: Implementation
  **Agent**: Thurgood

  **Success Criteria:**
  - Ada's generated prompt is byte-identical in both mirrors
```

## tasks.head.md

```markdown
# Implementation Plan: 122 — Agent Generator

**Date**: 2026-12-22
**Spec**: 122 — Agent Generator
**Author**: Thurgood
**Status**: Unit 2 merged; cutovers in progress

## Tasks

- [x] 2. Build the generation pipeline

  **Type**: Implementation
  **Agent**: Thurgood

  **Success Criteria:**
  - The generator emits both agent trees from `canonical/agents/*.md` with the diff guard
    green on a clean tree
  - Hand-edits to a generated file are detected by the diff guard and reported with the file path

- [x] 3. Cut Ada over to the generated prompt

  **Type**: Implementation
  **Agent**: Thurgood

  **Success Criteria:**
  - Ada's generated prompt is byte-identical in both mirrors
```

> **Encoder instruction — invisible characters.** In `tasks.head.md`, the space between `byte-identical` and `in both mirrors` SHALL be encoded as a **no-break space (U+00A0)**, not an ordinary space. It is written here as an ordinary space because invisible codepoints do not survive review reliably; the encoder inserts it deliberately and records the insertion in the fixture's provenance header.

## completion-doc fragment

**None.** This case exercises the diff-scoped materiality duty only.

## Required verdict

- **Outcome**: **immaterial** — no verdict, no message, no declaration demanded of the head commit.
- **Exit semantics**: GREEN — exit zero.
- **Must NOT be produced**: `MATERIAL_AMENDMENT_WITHOUT_DECLARATION`; any red. Four separate decoys are present (tick flips, date change, added status line, line reflow + NBSP) and each one independently fails a naive implementation.

## Encoding notes

- Encode as `{ tasks.base.md, tasks.head.md, expected.json }`.
- `expected.json` records `material: false` and `verdicts: []`, asserted positively.
- The line reflow must survive encoding as an actual wrapped line in the head file — if a formatter rejoins it, the fixture loses its most valuable decoy.
- This fixture and `materiality-criterion-reworded-legacy` form a discriminating pair; the build SHOULD keep them adjacent in the encoded tree so a future reader sees why each exists.
