# Task 13.3 Completion — Confirmer/signer checks; verbatim-substring check

**Spec**: 123 — Consumer Distribution · **Unit**: U2b · **Parent**: Task 13 · **Agent**: Thurgood (Opus)

**CI-provenance**: branch-head dispatch @ 51dea020f0bfb74c4e1e78d9a370cd7b8a428267 — https://github.com/3fn/DesignerPunk/actions/runs/36382377893, https://github.com/3fn/DesignerPunk/actions/runs/36382382576, https://github.com/3fn/DesignerPunk/actions/runs/36382387311, https://github.com/3fn/DesignerPunk/actions/runs/36382392020, https://github.com/3fn/DesignerPunk/actions/runs/36382396585, https://github.com/3fn/DesignerPunk/actions/runs/36382401361

**Write scope**: tasks-row grant, as at 13.1. The new modules are `tools/agent-generator/regrounding/c1.ts` and `operative-sets.ts`; the signer check is in `signatures.ts`, which is shared with 13.2. **Disclosed as out-of-list on a strict reading**: the test `tools/agent-generator/__tests__/operative-set.checks.test.ts` (new), and the signer cases in `signatures.test.ts` and `check-catalog.test.ts`. 13.2 and 13.3 share one checkpoint commit.

## What changed

- **`regrounding/c1.ts`**: the C1 seat function (Req 11.5.2), `c1Seat(owner, profileAuthor = 'thurgood', counterpart = 'stacy')`. It returns the owner; the counterpart seat when the owner is the profile author; and `peter` when both roles collapse onto one agent. It is lifted from the Task 11 precursor test, which keeps its own copy until 13.6 deletes it.
- **`regrounding/operative-sets.ts`**: two nine-checks.
  - **Wrong confirmer** (#3), `checkConfirmer`: `confirmer:` must equal `c1Seat(owner)`.
  - **Item text not verbatim** (#8), `checkItems`: each item's `text` must be a substring of its canonical unit. It does not catch prefix truncation, and a test pins that limit (C16, S-D2-A1).
  - The precursor's structural assertions are included so 13.6 can absorb it with one definition: unique ids, `kind` among the five, non-empty `text` with no edge whitespace.
  - The file header carries the **absorption map for 13.6**: which precursor assertion lives here, which is 13.5's (anchors resolve), and which is the freshness sweep's (fresh `canonicalHash`, `confirmation:` note resolves).
- **`regrounding/signatures.ts`** (the 13.3 half): **wrong signer** (#4). `checkSigner` fails when `signer` ≠ `c1Seat(owner)`, with the catalog string naming `owner` and `profile author`. `ownerOf(source, memberId, ctx)` resolves the owner:
  - a charter's owner is its agent, from `canonical/agents/<a>.md`;
  - a shared member's owner is its catalog `owner:`;
  - otherwise it is the `owner:` of the operative-set record for that source (identity docs);
  - if nothing resolves, it is a format finding, never a pass.

  `checkDispositionSigners` runs the check over every signed row of a dispositions file.
- **`check-catalog.ts`**: `test:` is filled for wrong confirmer, wrong signer and item text not verbatim. **`check-catalog.test.ts` gains the carried assertion**: every registry entry with a `test:` names a test that exists in that file. The entries still pending are **exactly `orphaned-key` and `missing-row` (13.5)**. When 13.5 lands, it fills both and changes the pending list to `[]`; that completes "every registry entry has its named test".
- **Live pass**: `operative-set.checks.test.ts › live` runs both checks over all four committed records (`component-family-navigation`, `lina`, `stacy`, `start-up-tasks`, including 13.0's new `#family-overview:preamble`). It asserts that every recorded anchor resolves, so the verbatim check is never skipped by vacuity, and every record passes.

## Targeted tests + result

- All five `regrounding` suites → **54 passed, 54 total**. `npm run test:agent-generator` → **35 suites, 485 passed**. The precursor test `src/__tests__/operative-set-records.test.ts` → **22 passed**, untouched.
- Named tests:
  - `operative-set.checks.test.ts › wrong confirmer (nine-check) refuses a confirmer that is not the C1 seat, with the exact string`
  - `operative-set.checks.test.ts › item text not verbatim (nine-check) refuses a paraphrased item, with the exact string`
  - `signatures.test.ts › wrong signer (nine-check) refuses a signer that is not the C1 seat, with the exact string`
- **Bites.** Each bite ran with `-t <named test>`; files were restored and the lane was re-run green.

  | # | Mutation | Result |
  |---|---|---|
  | B3 wrong signer | the owner always signs (`sig.signer === owner`) | RED `✕ wrong signer (nine-check)…`. For the correct Stacy-signs-thurgood row, expected `[]`, received `"signature on #purpose is by stacy; the C1 rule requires stacy (owner thurgood, profile author thurgood)"` |
  | B5 wrong confirmer | the owner always confirms (`record.confirmer === record.owner`) | RED `✕ wrong confirmer (nine-check)…`. Expected `[]`, received `"operative set for canonical/agents/thurgood.md declares confirmer stacy; the C1 rule requires stacy"` |
  | B6 verbatim | only a 20-character prefix is compared | RED `✕ item text not verbatim (nine-check)…`. Expected `"operative item twin-1 in canonical/operative-sets/twin.yaml: text is not a verbatim substring of canonical unit #twin — re-confirm with the complete canonical text"`, received `[]` |
  | B7 registry | delete the `stale-signature` entry's `test:` / rename its test | RED `✕ names an existing test for every landed check…`: `+ "stale-signature"` in the pending list / `Expected: "stale-signature: true" · Received: "stale-signature: false"` |

- `npx tsc -p tools/agent-generator/tsconfig.json --noEmit` → exit 0. `npx tsc --noEmit` (root) → exit 0.

## Application-time adaptations

1. **The catalog's `<file>` placeholders.**
   - "operative set **for** `<file>`" is filled with the record's `source:` (the canonical file the set is for).
   - "operative item `<id>` **in** `<file>`" is filled with the record's path (where the item is declared).
   - The finding's own `file` field is always the record path.
2. **Item kind `member`.** The committed, owner-confirmed records and the precursor use `member`, following Req 11.6.2's "enumeration member". Design § "Data Models" writes `enumeration`. The code follows the records. **The design data model is the text that is out of step**; it is carried as a design erratum at parent time, and design.md is the spec author's (Thurgood's) text.
3. **The owner-resolution rules are this subtask's choice.** The design names the owner for charters (C1) and shared members (C17: "each member's `owner:`"). For identity docs it names none; this subtask uses the operative-set record's `owner:`.
4. **Two C1 definitions coexist until 13.6**: `regrounding/c1.ts` and the precursor's `c1Confirmer`. 13.6 deletes the precursor.
5. **The 13.1 carried assertion landed here**, not at 13.5, as a pending list that 13.5 empties. That makes the carry mechanical rather than a note.

## Not established by 13.3

- That a signer or confirmer actually sat in their seat: one git identity (C16, S-D-A8).
- That an item's `text` is its complete operative text: truncation is the confirmer's responsibility.
- That record anchors resolve: 13.5. Fresh hashes and resolving notes: 13.6's sweep.
- Signers over the real profile: 15.5.
