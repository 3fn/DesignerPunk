# Task 14.2 completion: the agent-shaped fixture carrying E (and E-fm)

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 14 · **Agent**: Lina (Opus), PRIMARY
**Date**: 2026-09-29 · **Branch**: `task/123-u2b-profile` (main checkout), from `895997e5` (Task 15.0 landed)

**Write scope**:
- **Inside the grant**: Task 14's row names `__fixtures__/` (E, E-fm). The new directory is `tools/agent-generator/__fixtures__/semantics-guard/`.
- **Out-of-list, disclosed**: the new test `tools/agent-generator/__tests__/semantics-guard.fixture.test.ts`, and a provenance note appended to `task-14-5-completion.md`.
- **No source file changed.**

**CI-provenance**: local

## What changed

- **`__fixtures__/semantics-guard/`** (new). `README.md` gives the format and provenance, and `index.ts` is a read-only loader returning the charter, both trees, the parsed dispositions and overlay, and a ready `ResolvedAgent`.
  - **`canonical/agents/semguard.md`** has a minimal agent frontmatter (`commands` ×2, `writeScope` ×2, one tool). Its body is **three units copied byte-for-byte from `canonical/agents/stacy.md`** (blob `46a0dcf8…` at copy): the claims-audit `:preamble`, `#the-trigger-set-…`, and **S** (`#the-owed-set-pipeline-…`).
    - The first unit also carries the fixture's own `# Semguard` title line.
    - The anchors are stacy's own, so G1's E rendering and `stacy.yaml`'s S items apply unchanged.
  - **`canonical/profiles/consumer/semguard.dispositions.yaml`**: every unit and every leaf has an **explicit row** (DD25). Three rows are re-pointed **in place**:
    - **E**: S;
    - **E-fm**: `writeScope[.kiro/specs/**]`;
    - **extra**: `commands[claims-pass]`, disclosed extra evidence.
  - **`canonical/profiles/consumer/semguard.overlay.md`**: the three re-grounded texts in 13.2's `## @unit` / `## @entry` form, **pinned**. S's pin, `sha256:e3f6f82a…`, equals `stacy.yaml`'s `canonicalHash` for S. **E's text is G1 run 1's committed E rendering.**
- **`semantics-guard.fixture.test.ts`** (new) holds the fixture to its claims, so a guard red is always about routing.
  - The three units still equal stacy's.
  - The profile passes **Task 13's checks**: the 13.1 schema, the 13.5 orphan and missing-row refusals, and the 13.2 pin freshness.
  - Exactly the three in-place re-pointings are present.
  - **E is zero-verbatim against S's 14 operative items: `assignOccurrences` credits 0** (10.S Constraint 3).
  - E-fm's text does not carry the canonical glob.
  - **`generateFixture`'s consumer lane (Task 15.0) is exercised end to end on `_fixture.md`.** It uses the real `assembleContext`, the adapters from the registry for the declared targets (`loadConsumerProfile`), and the docs-MCP corpus session. With `#doc` and its `writeScope` member re-pointed, each target's prompt under `canonical/_fixture-output-consumer/<target>/` gives `#doc VERIFIED` and `writeScope[canonical/_fixture-output/**] VERIFIED`, one prose file each.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/semantics-guard.fixture.test.ts` → **`Tests: 6 passed, 6 total`**.
- `npm run test:agent-generator` → **`Test Suites: 47 passed, 47 total` · `Tests: 739 passed, 739 total`**. `npx tsc -p tools/agent-generator/tsconfig.json --noEmit` → exit 0.
- **Bites** (each mutated, run, restored; `cmp` clean):

  | # | Mutation | Red (exact) |
  |---|---|---|
  | 1 | E carries one of S's items verbatim (Constraint 3 broken) | `✕ E stays ZERO-VERBATIM …: 0 credited` → `+ "itemId": "owed-set-predicate"`. 1 failed. |
  | 2 | a disposition row dropped (`#the-trigger-set-…`) | `✕ passes Task 13's checks …` → `+ "message": "#the-trigger-set-the-114-superset-table-names-never-numbers in canonical/agents/semguard.md has no disposition row — every unit carries an explicit row (write 'retained' if it ships as-is)"`. 1 failed. |
  | 3 | E's pin one hex digit off | `✕ passes Task 13's checks …` → `+ "message": "overlay for #the-owed-set-pipeline-… re-grounds canonical text sha256:e3f6…f836, but the current canonical is sha256:e3f6…f837 — re-author the overlay; refusing to derive"`. 1 failed. |

- `npm run check:completion-criteria-parity` after the tick → `SUMMARY: parents evaluated 16, pass 16, fail 0; emissions 0; reds 0`.

## Application-time adaptations

1. **The guard's fixture reaches the adapters through `adapter.emitAgent`, not `generateFixture`** (the design says "via `generateFixture`"). `generateFixture` is hard-wired to `canonical/agents/_fixture.md`, whose body is degenerate (one `#doc` unit), so it cannot carry a `###` S without editing `generate.ts` (Task 15's file). `emitAgent` is the call site the per-target bites mutate, and it is exactly what `generateFixture` loops over. **`generateFixture`'s consumer lane is exercised separately, on `_fixture.md` itself**, which covers Thurgood's 15.0 path end to end.
2. **The 14.5 provenance cannot be carried on a CI line.** 15.0's code landed between 14.5's checkpoint and any later doc commit (rule 5), so the 14.5 doc stays `local`, with the six green runs recorded as information.
