# Fixture spec: exemption-does-not-waive-av

**Case**: `exemption-does-not-waive-av`
**Class**: exemption
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The exemption string here is **perfect** — verbatim, correctly dated, legitimately earned by a spec that was genuinely in flight at ratification. The parent declares `**Primary Artifacts:**` and `**Merge gate:**`. And the completion doc carries the exemption line and then stops.

The falsification target is the scope of the waiver. Req 1.6's logic is narrow and easy to over-read in implementation: a valid exemption waives **the criteria table only**. The AV section and its forced-negative line remain owed, because the exemption's ground is *"this spec's tasks.md predates the criteria convention"* — which says nothing about whether the parent's declared artifacts shipped or its gate conditions held. Those promises exist in the legacy file too.

A lazy checker passes this by the most natural control flow there is: detect a valid exemption, `continue` to the next parent. One keyword, and the entire AV surface is silently waived for every exempt parent in the corpus — a hole that widens exactly where legacy specs are most numerous. This fixture is the structural twin of `declared-none-av-still-owed`: both attack the same instinct (a recognized waiver short-circuits the parent) from the two different directions the law grants waivers.

## tasks.md fragment

```markdown
# Implementation Plan: 143 — Avatar Family Completion

**Date**: 2026-09-08
**Spec**: 143 — Avatar Family Completion
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 2. Ship the Avatar-Image-Base implementations

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Avatar-Image-Base renders the fallback initials when the image source fails
  - The component satisfies every contract listed on its schema

  **Primary Artifacts:**
  - src/components/avatar/AvatarImageBase.ts
  - src/components/avatar/__tests__/AvatarImageBase.test.ts

  **Merge gate:**
  - `npm test` green on the unit branch before the PR opens
```

## completion-doc fragment

`task-2-completion.md`:

```markdown
# Task 2 Completion: Ship the Avatar-Image-Base implementations

**Date**: 2026-09-26
**Task**: 2. Ship the Avatar-Image-Base implementations
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

Criteria fidelity: exempt — spec in flight at ratification (2026-09-19)

## Overall Integration Story

Avatar-Image-Base now falls back to initials on load failure across web, iOS and Android,
and the schema's contract set is satisfied by the shared contract suite.
```

## Required verdict

- **Verdict**: `AV_MISSING_OR_MALFORMED` on parent 2.
- **Reason recorded**: the parent declares `**Primary Artifacts:**` and `**Merge gate:**`; no `Additional verification` section is present. The exemption waives the criteria table only.
- **Emissions**: `exemption-honored` **is** produced for parent 2 — the exemption is valid and its use is recorded, because claims-pass exemption counting depends on that record existing (Req 1.7). A valid exemption produces an emission *and* the parent still fails on AV; the two coexist.
- **Exit semantics**: RED — non-zero exit, with the `exemption-honored` emission present in the same run.
- **Must NOT be produced**: `PASS`; a run in which parent 2 is skipped entirely; a missing `exemption-honored` emission (which would break the counting duty that the declined sunset rests on).

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- `expected.json` MUST assert the emission **and** the red verdict together. A build asserting only the red passes this fixture while breaking the exemption count; a build asserting only the emission passes it while waiving AV. Both assertions are the fixture.
- The exemption string must encode with the em-dash (U+2014) and the exact spacing of the ruled string: `Criteria fidelity: exempt — spec in flight at ratification (2026-09-19)`.
