# Stop: application PR 1 of the signing-act shape review — the link-1 census shows two differences beyond the ratified one (a first confirmation of a drafted unit)

**Date**: 2026-11-08
**Owner**: Thurgood (the instrument and the ballot). **Required reader**: Stacy (census reader; she specifies the fixtures).
**Trigger**: `path:.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md` — the event that owes the close is the ballot's erratum (or a ruling that leaves the text as it stands); PR 1 does not open before it.
**Class**: P2 obligation (guard) · defect *(set 2026-11-08, Thurgood, rule 12. `(guard)`: shipped as drafted, PR 1's link 1 would fail every lawful first confirmation of a newly drafted operative-set unit on the armed required step `122-diff-guard`.)*
**Filed by**: Thurgood, under README rule 10, at ballot § 5 PR 1 step 6 ("Any other difference stops the PR and is reported").

---

## What the census found

`--census-link1`'s decision (scratch run, one-commit ranges, base code at `94c5f26a0` against PR 1's head code) over every PR-branch commit since `R` that touches `canonical/profiles/consumer` or `canonical/operative-sets` (789 `refs/pull/*/head`, `^origin/main`): **409 acts over 299 commits; base FAIL 1 = 8, head FAIL 1 = 11.** The ratified delta is one line. The run shows three:

```
7eb517fcae4c2a2f5d0563a9272c59efc3ac6b12  sparky.dispositions.yaml#frontmatter:writeScope[.kiro/issues/**]  PASS → FAIL 1   (ratified: the X1 shape)
17702702b303d7b7b537e28030df78e82f6fd3d7  operative-sets/start-up-tasks.yaml#item-your-open-records         PASS → FAIL 1   (NOT ratified)
17702702b303d7b7b537e28030df78e82f6fd3d7  operative-sets/thurgood.yaml#step-0-read-the-records-that-name-the-spec  PASS → FAIL 1   (NOT ratified)
```

## The shape

- `807b8aba1` (Thurgood, profile author) drafted `start-up-tasks.yaml#item-your-open-records` **with its `canonicalHash`**. At `17702702b`'s first parent the unit carries `canonicalHash: sha256:42a36743…` and has **no** note block in `confirmations/start-up-tasks.md`.
- `17702702b` (Stacy, #436) wrote the unit's first note block, sheet only. The thurgood unit is the same shape.
- This is C16 as built: `analyzeCommit` reads "A unit ADDED … with its record is the drafter's authoring (the profile author drafts records, C16); the confirmer's act is moving an existing unit's canonicalHash". So **a newly drafted unit's first confirmation is always a sheet-only act on a fresh unit.**
- § 2a reads a sheet-only commit as a re-act, and the `confirm` kind as "a record unit's first `canonicalHash`, with its sheet section". The drafted-unit flow fits neither, so under PR 1 it reads `re-confirm`, on no list, FAIL 1, on every future new unit, not only on history.
- Why Stacy's R1/R2 walk did not see it: her population counted hash-moving re-acts, withdrawals and sheet-only commits on signing paths only (218); `17702702b` also moves other units' hashes, so it sat in her population as hash-moving acts on other rows. The two note-only units in it are this shape.

## What is needed (not decided here)

A ruling on the ballot text, then PR 1 resumes. Options, for Stacy's read and Peter's pick:
- **(a)** An erratum to § 2a: a record unit whose note block is absent at the first parent is on an **`unconfirmed`** list (the sweep already finds "confirmation resolves to 0 note blocks"), and the confirmer's first note block on it is `confirm`, in bound there. Cost: one list, one fixture pair; the class is closed for every drafted unit.
- **(b)** Change the drafting practice: the drafter adds a unit with no `canonicalHash`, so the unit is stale and the confirmer's first act writes it (the `confirm` kind as § 2a states it). Cost: C16's drafting rule and `analyzeCommit`'s unit-added branch change; every drafting brief changes.
- **(c)** Ratify the two lines as further expected differences and leave the rule. Cost: every future drafted unit's first confirmation fails the armed step. Not viable alone.

## Close

The ballot's erratum (or Peter's ruling) lands; PR 1 is re-run with the census, and this file gets rule 5's outcome line in PR 1 and moves to `archive/`.
