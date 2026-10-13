# Task 29.1 Completion: clause 2 per the ruling (identity), attack (f) and one-token-variant fixtures, two-sided bites

**Date**: 2026-10-12
**Agent**: Lina (Opus), PRIMARY Task 29
**Branch**: `task/123-u3g-g2c2`, on `f32a21f76`. Stacy's attack file (`fe488ff52`) and her refusal conditions (`f32a21f76`) are ancestors of this commit.

## What changed
- **`tools/agent-generator/regrounding/derivation.ts`** (ruling R1):
  - **Clause (2) is identity.** The line reads `d.some((x) => sameNode(x.ref, destination, …))`. `sameNode` is mutual `containedIn` in one tree, so it holds only for the same node. Unknown ids stay non-matching, cross-tree never matches, and no anchor string is compared.
  - **The shared-catalog member space.** A check whose `file` is `canonical/shared/shared-catalog.yaml` is decided in member-id space: `D` is the spans sourcing `…shared-catalog.yaml#<id>`, and identity is id equality. `TreeRef.tree` gains `'member'`, and a member contains only itself.
  - The header states R1. Clause (1) is unchanged here; R2 is 29.2.
- **`__tests__/derivation.test.ts`**: three Task 14 expectations encoded containment in clause (2). Each is re-stated under R1, with the clause-1 half kept:
  - the parent of `:preamble` as destination → `FAIL_DISHONEST_NAMING`;
  - the `writeScope` container as destination for a member span → `FAIL_DISHONEST_NAMING`, while the member itself → `VERIFIED`;
  - "the destination may contain the derived span → VERIFIED" → `FAIL_DISHONEST_NAMING`.

  New `29.1` blocks:
  - attack (f) with the ## parent as destination;
  - attack (f) at every ancestor;
  - the one-token variant with an ancestor destination (the G2-F1 shape that passed under containment);
  - the one-token variant with a sibling destination (V1);
  - the honest in-place row;
  - an unknown destination (U1), and a cross-tree destination (U2);
  - `sameNode` unit cases;
  - three member-space cases (M0, M1, nothing rendered).
- **`__tests__/derivation.frontmatter.test.ts`**: F5c (a rendered `commands` member with destination `commands`) → `FAIL_DISHONEST_NAMING`, and the same member with itself as destination → `VERIFIED`.
- **Bite records** (`__fixtures__/semantics-guard/__bites__/`):
  - `task-29-1-bite-clause2-red.txt` (the mutation diff and the exact jest output);
  - `task-29-1-bite-clause2-green.txt`.
- **`task-29-instruments.md`**: row 3.1 resolved in-row to `exists`.

## Tests
- **Two-sided bite.** Clause (2) restored to containment: **5 failed**. The five that fail:
  - attack (f);
  - attack (f) at every ancestor;
  - the one-token variant with an ancestor destination;
  - F5c;
  - the re-stated parent case.

  As written: **14 passed** (`-t 29.1` selection, 35 total, 21 skipped).
- The member-space cases pass under both directions. In member space a member contains only itself, so containment and identity coincide there; that is stated, not claimed as a bite.
- `npm run test:agent-generator`: 58 suites, **1650 tests**, all green (1637 at the cut, plus 13).
- `tsc --noEmit`: exit 0.

## Application-time adaptations
1. **The one-token variant's bite uses the ancestor destination.**
   - Under containment, the one-token variant with a **sibling** destination (Stacy's V1) was already `FAIL_DISHONEST_NAMING`, because a sibling does not contain S. So V1 cannot go red under the shipped direction.
   - The variant that passed under containment (pass four, "a one-token variant of attack (a) passes it") is the one with an **ancestor** destination. That is the one the two-sided bite measures.
   - V1 is tested as well, as rejected in both directions.
2. **Three Task 14 expectations in `derivation.test.ts` are re-stated, not deleted.** Each old assertion of containment in clause (2) now asserts the R1 verdict, with a comment naming the change. Task 14's ticked rows in `tasks.md` are not edited (C5).
3. **Stacy's open point (d), the member lane's emptiness rule.** Not reached in 29.1. 29.2 applies R2 to members provisionally, pending Thurgood's line (flagged there).
