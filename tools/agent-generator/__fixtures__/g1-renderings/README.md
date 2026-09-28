# G1 renderings — copied fixtures with pinned provenance

Spec 123 Task 13.4 (criterion: *"The G1 renderings are copied fixtures with pinned provenance"*). These are the renderings Stacy's G1 falsification pass scored (runs 1 and 2) and Thurgood's G/G′ constructions (Task 11.3), copied **byte for byte** so `triviality.ts`'s tests score exactly what the gate scored.

## Format

- **One file per rendering**, `<run>.<exemplar>.<anchor-slug>.txt`. The file's bytes ARE the rendering — no header, nothing added. The bytes are the marked block's body: everything between the opening ```` ````text ```` fence line and the closing ```` ```` ```` fence, including the trailing newline(s).
- **`manifest.yaml` is the sidecar** that names each fixture's provenance (a sidecar rather than an in-file header, so the fixture bytes stay the rendering):

  | field | meaning |
  |---|---|
  | `file` | the fixture file in this directory |
  | `exemplar` | the run record's exemplar label (`A`, `AX-1`, `Lina-2`, `G′`, …) |
  | `record`, `anchor` | the operative-set record and unit the rendering is scored against |
  | `canonicalHash` | that record unit's hash at copy time — **the record state the expected scores assume** |
  | `source` | the run record the block was copied from |
  | `sourceBlob` | `git hash-object <source>` at copy time |
  | `grammar`, `marker` | which marker grammar the block uses, and its exact opening line |

## The two marker grammars (source records are not edited)

- **`run-record`** — `re-grounding-c3-falsification-run-{1,2}.md`: `<!-- rendering <exemplar> <record-stem> <anchor> -->` on its own line, then a ```` ````text ```` fence, the body, a ```` ```` ```` fence. (The run records' own check scripts parse exactly this.)
- **`begin-end`** — `task-11-3-exemplars-g-gprime.md`: `<!-- G-rendering:begin -->` / `<!-- Gprime-rendering:begin -->`, the same fence pair, then the matching `…-rendering:end -->`. That record names no anchor; the manifest carries it (G → `#item-critical-wait-for-user-authorization-before-starting-new-tasks`, G′ → `#item-civitas-governance-health-check`, as the run records' scripts map them).

Byte-identical renderings (C(c1)'s two units, Lina-2's `:preamble`) are **not** copied: the run records define them as the canonical unit itself, so the tests take them from `partition()`.

## What the provenance test asserts (`__tests__/g1-renderings.provenance.test.ts`)

1. Every `.txt` here has a manifest entry, and every entry has its file.
2. Each `source`'s current bytes hash to the pinned `sourceBlob`. **A changed run record turns the test red** rather than silently changing the fixture.
3. Each fixture equals the marked block in its source, re-extracted under its grammar; each marker occurs exactly once.
4. Every marked block in the three sources has a fixture — the copy is complete.

The record pin (`canonicalHash`) is asserted where the scores are (`triviality.g1.test.ts`): if a record unit is re-confirmed, the expected scores are re-derived explicitly, never silently moved.

## Regenerating

Do not hand-edit. If a source record legitimately changes, re-extract the affected blocks with the same grammar, update `sourceBlob` (`git hash-object <source>`), and record the change in the owning subtask's completion doc.
