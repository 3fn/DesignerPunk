# Task 10 Summary: Splitter family, span function, and adapter consolidation

**Date**: 2026-09-27
**Purpose**: Concise summary of Task 10 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

The agent generator now attributes charter content at the finest structural grain a document actually has, through one splitter and one span function.

- **`frontmatter.ts`**: the one frontmatter splitter. The canonical-source loader now delegates to it, so the body the adapters emit and the body that is partitioned are split by the same code.
- **`partition.ts`**:
  - `partition(body)` is a fence-aware heading tree with preamble units, a numbered-enumeration fallback for title-only documents (item anchors slug from the leading bold span), and a declared degenerate case. Heading lines with nothing after them attach forward. The byte-identical join is asserted with a throw.
  - `entryTree(frontmatter)` keys list and map fields per member (`writeScope[<glob>]`, `toolSubset.<server>[<tool>]`) and commands by `name`.
  - Both trees share one structural containment check, in which an unknown anchor never matches.
- **`spans.ts`**: `emitSpans`, the one function that constructs spans.
  - Body units are `passthrough` per unit; a re-grounded unit is `render` sourced to its canonical origin (10.S); an omitted unit emits nothing.
  - Each frontmatter entry gets its own span, keyed by the entry tree.
  - Adapters supply rendered text only.
- **Both adapters** route every agent-file span through `emitSpans`. The generated agent files are byte-unchanged. Their 18 attribution sidecars now carry 1,692 spans, including 288 body units per target, where each body was previously one span.

## Why It Matters

Req 10.G's grain rule is what makes the re-grounding check meaningful. At `##` grain a re-pointed section can hide inside a span that also contains its destination. Having one splitter feed spans, dispositions and operative sets keeps the span grain and the application grain identical. Consolidating the two duplicated inline span sites into one function means Task 14's per-target bites can test every target through a single seam.

## Key Changes

- `tools/agent-generator/{frontmatter,partition,spans}.ts` (new); `adapters/{cc,kiro}.ts` (rewritten through `emitSpans`).
- `__fixtures__/golden-partition/`: four fixture documents and a hand-authored `expected-units.json`.
- Tests: `partition.golden.test.ts` (Golden Bite 1, snapshot ban, the 17-file invariant), `entry-tree.test.ts`, `spans.source-origin.test.ts` (the 10.S unit twin). Every bite is recorded red.

## Impact

- Validation: `npm test` 9268/9268; generator lane 405/405; both typechecks clean; diff-guard full-run green locally and in CI; all six dispatched workflows green at `4c39fc4c`.
- **Carried to Peter via Task 12**: eight of the regenerated sidecars (`.kiro/agents/*-prompt.md.attribution.json`) ship in the package, so U2a changes shipped files, and by Task 12's criterion the release decision returns to Peter.
- Carried to Task 14: the write-scope span sits at container grain (E-fm), and the generator test lane runs in no CI workflow.
