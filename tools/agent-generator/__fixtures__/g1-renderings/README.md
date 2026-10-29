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
  | `canonicalHash` | the record unit's hash when its expected row was last derived or re-checked — **the record state the expected table was derived at**; provenance, not asserted (RS-60) |
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

`canonicalHash` is **not asserted** by any test (RS-60, 2026-10-29). `triviality.g1.test.ts` scores each fixture against the **live** record — its items, and the canonical unit from its source — so a re-confirmation that moves a score turns that fixture's expected-table row red by itself, and the row is re-derived explicitly, never silently moved. **The limit**: a re-confirmation that changes a unit's items but leaves every score the same passes unseen. Only AX-1's witness test pins which items are credited.

**When a record unit is re-confirmed** (its `canonicalHash` in `canonical/operative-sets/<seat>.yaml` moves), nothing here is owed. Refreshing a fixture's `canonicalHash` is never required. Refresh it when that fixture's expected row is re-derived, to the record's value at the re-derivation, so the hash keeps naming the state the row was derived at. A rendering file is never edited for a re-confirmation. The semguard fixture (`../semantics-guard/`) is a separate fixture: it is frozen, and a charter edit owes it nothing.

Bite logs: `__bites__/rs-60-bite-reconfirm-red-before.txt` and `__bites__/rs-60-bite-reconfirm-green.txt` (a score-neutral re-confirmation, red on the pin before RS-60, green after) and `__bites__/rs-60-bite-item-red.txt` (an item change that moves a score still fails the score test).

## Regenerating

Do not hand-edit. If a source record legitimately changes, re-extract the affected blocks with the same grammar, update `sourceBlob` (`git hash-object <source>`), and record the change in the owning subtask's completion doc.
