# Task 11 Summary: Exemplar operative sets for G1

**Date**: 2026-09-27
**Purpose**: Concise summary of Task 11 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

The eleven exemplars that C3's falsification pass (G1) runs against now have committed, owner-confirmed operative-set records. Each record fixes a section's denominator on the canonical side before any rendering exists (Req 11.6.5d).

- **Four records** under `canonical/operative-sets/`: 23 units and 123 items.
  - `stacy.yaml`: A, B/E, C(c1), C(c2), D.
  - `lina.yaml`: Lina-1, Lina-2.
  - `component-family-navigation.yaml`: F.
  - `start-up-tasks.yaml`: G and G′, Stacy's constructions, with their required verdicts committed before G1.
- **Each record is keyed by Task 10's partition anchors**, and each item carries its complete verbatim text.
- **Four confirmation notes** under `canonical/profiles/consumer/confirmations/`, each written in the C1 confirmer's seat:
  - Stacy, as owner, for `stacy.md`, and on the carve-out for the Thurgood-maintained `start-up-tasks.md` (`Agent: stacy` commits).
  - Lina, as owner, for `lina.md` and the family doc (`Agent: lina` commits).
  - The confirmers corrected the draft four times. Two were prefix truncations; one narrowed the owed-set unit from 15 to 14 items; one replaced C(c1)'s zero-item premise with 2 + 2 items.
- **A temporary precursor test**, `src/__tests__/operative-set-records.test.ts`, runs in the functional lane in CI. It checks:
  - the confirmer, against the C1 function;
  - anchor resolution and hash freshness;
  - that each item is verbatim;
  - that each note resolves and its key lines match the record.

  Task 13.6 absorbs these checks and deletes the file.
- **Stacy's F3 adjudications** record the eight new canonical files' blank coverage-map rows as time-boxed until 13.6. `audit:coverage-map` passes.

## Why It Matters

G1 tests whether "trivial" (C3) produces the required verdicts. Its answer depends on each section's operative-item count. Fixing those counts in reviewed, owner-confirmed records keeps a rendering, or the profile's author, from shrinking a denominator to clear the floor. The confirmer corrections show the owner-seat catching what the drafter got wrong.

## Key Changes

- New: `canonical/operative-sets/*.yaml` (4), `canonical/profiles/consumer/confirmations/*.md` (4), `src/__tests__/operative-set-records.test.ts` (temporary).
- Updated: `canonical/coverage-map.yaml`, `canonical/adjudications.yaml` (the 8 F3 rows), `canonical/generated.lock`.
- The plan was corrected mid-parent by #220 (ruled by Peter):
  - Lina was added as a secondary for 11.2;
  - the count erratum;
  - the precursor test and its 13.6 retirement;
  - C(c1)'s premise marked false, leaving clause (a) exercised by F's `#purpose` only.

## Impact

- **G1 (Task 12) can run** against committed records.
- **Known limits of these exemplars**: clause (a) has a single exemplar; the verdicts were written per section but the records are per unit; frontmatter, shared-catalog, `#doc:preamble` and `route` items are not exercised.
- **Nothing ships**: the intersection with the npm tarball is 0 paths.

Detailed completion: [task-11-completion.md](../../../.kiro/specs/123-consumer-distribution/completion/task-11-completion.md)
