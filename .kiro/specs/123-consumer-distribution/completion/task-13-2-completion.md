# Task 13.2 Completion — Overlay + signature formats; stale and bare checks

**Spec**: 123 — Consumer Distribution · **Unit**: U2b · **Parent**: Task 13 · **Agent**: Thurgood (Opus)

**CI-provenance**: local

**Write scope**: tasks-row grant, as at 13.1. Task 13's "schemas + validator" is read as the `tools/agent-generator/regrounding/` modules. This subtask adds `hash.ts`, `overlay.ts` and `signatures.ts`, and edits `dispositions.ts` and `check-catalog.ts`. **Disclosed as out-of-list on a strict reading**: the tests `tools/agent-generator/__tests__/overlay.test.ts` and `signatures.test.ts` (new), and edits to `dispositions.schema.test.ts` and `check-catalog.test.ts`. 13.2 and 13.3 share one checkpoint commit. `signatures.ts` also carries 13.3's signer check (see `task-13-3-completion.md`).

## What changed

- **`regrounding/hash.ts`**: one hash definition for records, pins and signatures. `hashText` = `sha256:` + hex over the exact UTF-8 bytes; this is C16's `canonicalHash`, and a test re-derives `stacy.yaml`'s `#what-parity-means` hash from `stacy.md`. `hashEntry(value)` = `hashText(canonicalStringify(value))` for frontmatter entries, so YAML key order never stales a pin.
- **`regrounding/overlay.ts`**: the overlay format and the **stale-overlay** check (nine-check #7).
  - Markers are `## @unit #<anchor> @ sha256:<hex>` and `## @entry <path> @ sha256:<hex>` (C17, L-D6, verbatim).
  - `parseOverlay` is fence-aware and byte-exact. An entry's text runs from its marker line to the next marker, trailing blank lines included. It refuses: text before the first marker, malformed marker attempts, duplicate keys, and unit keys that do not start with `#`.
  - `toSpanOverlay` yields `spans.ts`'s `Overlay` shape.
  - `checkOverlayPins` refuses, with the catalog string, any pin that differs from the current unit or entry hash. It skips keys that name nothing current; those are the orphaned-key refusal (13.5).
- **`regrounding/signatures.ts`**: the signature format (C17 valves 1–2) and two nine-checks.
  - **Bare** (#6) is context-free, so `validateDispositions` runs it on every row signature and it cannot be skipped. A signature with neither `assent.surviving` (a list) nor `refuse` fails.
  - **Stale** (#5): `checkSignatureFreshness` fails when either `canonicalHash` or `renderedHash` differs from the current value.
  - Format checks: unknown field; missing or malformed signer, hashes or evidence; both assent and refuse; a refuse value other than `should-re-point`; surviving ids that are non-string, duplicated, or (given the unit's items) not items.
- **`dispositions.ts`**: rows no longer treat `signature` as opaque. It is format-checked, and `bare-signature` and `signature-format` join the finding ids. `ValidationContext.operativeItems` lets surviving ids be checked.
- **`check-catalog.ts`**: `test:` is filled for stale overlay, stale signature and bare signature.

## Targeted tests + result

- All five `regrounding` suites (`dispositions.schema`, `check-catalog`, `overlay`, `signatures`, `operative-set.checks`) → **54 passed, 54 total**. `npm run test:agent-generator` → **35 suites, 485 passed**.
- Named tests:
  - `overlay.test.ts › stale overlay (nine-check) refuses a pin that differs from the current canonical, with the exact string`
  - `signatures.test.ts › stale signature (nine-check) refuses when either hash drifted since signing, with the exact string`
  - `signatures.test.ts › bare signature (nine-check) refuses a signature with neither itemized assent nor refuse, with the exact string`
- **Bites.** Each bite ran with `-t <named test>` against the mutated file. The file was restored from a scratch copy, and the full lane was re-run green (35 / 485).

  | # | Mutation | Result |
  |---|---|---|
  | B1 bare | the bare branch is made unreachable (`&& sig.signer === "__never__"`) | RED `✕ bare signature (nine-check)…`. Expected `[{ check: "bare-signature", … "signature on #the-owed-set-pipeline carries no itemized assent — list the surviving item ids or refuse" }]`, received `[]` |
  | B2 stale signature | `renderedHash` is ignored in the comparison | RED `✕ stale signature (nine-check)…`. Expected `"signature on #a is stale — its canonical or rendered content changed since signing; re-sign or refuse"`, received `[]` |
  | B4 stale overlay | unit pins are never compared (`entry.pin !== entry.pin`) | RED `✕ stale overlay (nine-check)…`: `Expected length: 1 / Received length: 0` |

- `npx tsc -p tools/agent-generator/tsconfig.json --noEmit` → exit 0. `npx tsc --noEmit` (root) → exit 0.

## Application-time adaptations

1. **Overlay file names.** Charters use `canonical/profiles/consumer/<agent>.overlay.md`, by analogy with C19's `always-set/<id>.overlay.md`; the design names only the latter.
2. **The marker grammar was fixed here.** The design gives only the marker line, so this subtask set the rest: fence-awareness, byte-exact text including trailing blank lines, a whitespace-only preamble, a `#`-prefixed unit key, and one key per kind.
3. **The entry pin hash was defined here** as `sha256(canonicalStringify(value))`. The design writes `@ sha256:…` for entries without defining it.
4. **Signature edge cases.** An empty `surviving: []` is itemized, so it is not bare: it says nothing survived. `assent: {}` is bare and also a format finding. The design is silent on both.
5. **Placement.** Bare runs inside `validateDispositions`, so it cannot be skipped. Stale needs the current hashes, so it is a separate call; wiring it (and the overlay check) into `derive()` and the sweep is 15.2 and 13.6.
6. **The 13.1 test changed.** "accepts a signature on any row without inspecting it" was replaced by "format-checks a signature through signatures.ts, surfacing the bare check". The C17-example test's elided `sha256:…` hashes were filled with valid 64-hex values.
7. **New non-catalog strings**: `overlay-format` and `signature-format`. Neither is among the nine.

## Not established by 13.2

- That a routed row carries a signature (present iff ROUTED): Task 15.5, over the real profile.
- That `evidence` resolves to a committed note.
- That an assent is true: Stacy's audit, Req 11.5.7.
- That `derive()` refuses on a stale overlay: 15.2, `derive.stale-overlay.test.ts`.
