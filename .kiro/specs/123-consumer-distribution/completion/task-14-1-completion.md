# Task 14.1 completion: `derivation.ts` — the 11.4 derivation checker

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 14 · **Agent**: Lina (Opus), PRIMARY
**Date**: 2026-09-28 · **Branch**: `task/123-u2b-profile` (unit branch, main checkout), from `6caf3ea3`

**Write scope**:
- **Inside the grant**: Task 14's row names `tools/agent-generator/regrounding/derivation.ts`.
- **Out-of-list, disclosed**:
  - `tools/agent-generator/__tests__/derivation.test.ts` (new test);
  - **`tools/agent-generator/partition.ts`** and **`__tests__/partition.golden.test.ts`**. This is a defect fix in my own Task 10 splitter, found while building this checker (adaptation 1).

**CI-provenance**: branch-head dispatch @ 111bba7c2c81407a53f24748d57dce1f06f98887 — https://github.com/3fn/DesignerPunk/actions/runs/36420761221, https://github.com/3fn/DesignerPunk/actions/runs/36420769772, https://github.com/3fn/DesignerPunk/actions/runs/36420777632, https://github.com/3fn/DesignerPunk/actions/runs/36420785860, https://github.com/3fn/DesignerPunk/actions/runs/36420794350, https://github.com/3fn/DesignerPunk/actions/runs/36420802722

**Scope of this checkpoint** (orchestrator's go, 2026-09-28): 14.1 at the checker level only. Spans come from `emitSpans` under the consumer profile directly; no adapter is edited. 14.2–14.4 wait for 15.0 (the slice the Q1 fork routed to Thurgood).

## What changed

- **`regrounding/derivation.ts`** (new) is the Req 11.4 checker.
  - **`checkDerivation({ file, trees, spans, s, destination })`** returns `{ verdict, derived }`.
  - **The verdicts** are the design's three (C15 / Data Models): `VERIFIED` · `FAIL_NO_DERIVATION` · `FAIL_DISHONEST_NAMING`.
  - **DERIVATION**: D = the spans sourcing this file whose location is `isDescendantOrSelf(x, S)` in **S's own tree**. The body tree is used for `#…`, the entry tree for `frontmatter:<path>`. An empty D gives `FAIL_NO_DERIVATION`.
  - **HONEST NAMING**: at least one span in D lies within the destination.
  - **Containment is structural only; no anchor-string comparison decides it.** An unknown id is non-matching and never throws. The `#body` bypass span, spans from other files, generator glue and profile-originated sources (10.S) are all outside D.
  - `op` is not read (10.S: `op` records how the text got there; it does not decide derivation).
- **`partition.ts`: a latent-hang fix.** The anchor allocator now reserves the root id `#doc` in both body branches (the heading tree and the enumeration fallback).
  - The defect: a heading titled "Doc" slugged to `#doc`, **overwrote the root node and became its own parent**, and `isDescendantOrSelf` then never terminated. Found when a test document titled `# Doc` hung Jest at 100% CPU for 9+ minutes.
  - Such a heading is now allocated `#doc-2`.
  - **No live anchor changes**: `grep -rnE "^#{1,6} +\W*[Dd][Oo][Cc]\W*$" canonical governance .kiro/steering tools/agent-generator/__fixtures__` finds nothing, and Golden Bite 1 still passes.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/derivation.test.ts tools/agent-generator/__tests__/partition.golden.test.ts tools/agent-generator/__tests__/entry-tree.test.ts` → **`Tests: 78 passed, 78 total`**.
- **The criterion row's cases** (`derivation.test.ts › 11.4 over generator-emitted spans (the criterion row)`), over the real `canonical/agents/stacy.md` rendered by `emitSpans` under the consumer profile:
  - **E → `VERIFIED`**, `derived: ["canonical/agents/stacy.md#the-owed-set-pipeline-…"]`. E's re-grounded text is the committed G1 rendering of E (`__fixtures__/g1-renderings/run1.E.*`). It renders as one `render` span sourcing S, and it is zero-verbatim inside its destination (10.S Constraint 3).
  - **attack (a) → `FAIL_NO_DERIVATION`**, `derived: []`. S is not rendered, its content rides inside the sibling `#the-trigger-set-…` (the two are measured siblings under `#operational-mode-claims-audit-…`), and the disposition names that sibling.
  - **attack (a) at `##` grain → `FAIL_NO_DERIVATION`**: an ancestor span is a super-range, and it is excluded.
  - **`#body` → non-matching, never a throw** → `FAIL_NO_DERIVATION`.
- **Containment through both trees**:
  - a prefix-sharing sibling is not contained;
  - a `:preamble` is contained in its parent, and not the reverse;
  - an entry-tree member is contained in its container, and not the reverse. The container span (today's `writeScope` rendering) does not derive a per-glob S: this is Task 10's E-fm carry, now measured;
  - a cross-tree reference never matches;
  - with no entry tree supplied, a frontmatter reference is non-matching, never a throw.
- `npm run test:agent-generator` → **`Test Suites: 43 passed, 43 total` · `Tests: 710 passed, 710 total`**.
- `npx tsc -p tools/agent-generator/tsconfig.json --noEmit` → exit 0.
- `npm run check:completion-criteria-parity` after the tick → `SUMMARY: parents evaluated 16, pass 16, fail 0; emissions 0; reds 0`.

### Bites (each mutated, run under a 90 s hang guard, restored; `cmp` clean)

| # | Mutation | Red (exact) |
|---|---|---|
| 1 | containment by anchor-string PREFIX | `a sibling that shares an anchor PREFIX is not contained` → `Expected: false` / `Received: true`; also the orphaned-S case → `Received: "VERIFIED"`. 3 failed. |
| 2 | the OVERLAP reading (an ancestor span counts) | `attack (a) at ## grain …` → `Expected: "FAIL_NO_DERIVATION"` / `Received: "VERIFIED"`; `:preamble` reverse → `Received: true`; the entry container → `Received: "VERIFIED"`. 3 failed. |
| 3 | an unknown anchor THROWS | `#body → non-matching, never a throw`. 1 failed. |
| 4 | HONEST NAMING skipped | `S derived, but the destination names a sibling → FAIL_DISHONEST_NAMING`. 1 failed. |
| 5 | cross-tree containment allowed (the `x.tree !== s.tree` guard removed) | **SURVIVED — `Tests: 63 passed`.** Honest reading: body ids always start with `#` and entry paths never do, so no id exists in both trees and a cross-tree lookup is already non-matching. The guard is redundant defence; the cross-tree test holds by id shape. Recorded, not "fixed" by an artificial bite. |
| 6 | the `#doc` reservation reverted (`partition.ts`) | `The root id is reserved … heading tree: '# Doc' is allocated '#doc-2' …` → `- "kind": "doc", - "parent": null` / `+ "kind": "heading", + "parent": "#doc"`. 1 failed, and it fails fast. *Before the derivation test's own document was retitled, this bite also hung that suite. The hang is the defect's real symptom, and it is why the regression test's first assertion checks the root.* |

## Application-time adaptations

1. **A defect fix outside Task 14's list** (`partition.ts`, my own Task 10 artifact). Without it the checker can hang on a legal document. The fix is the minimal root-cause one: reserve `#doc`. I did not also add a cycle guard to `isDescendantOrSelf`, because the fix removes the only way to make a cycle. That is a choice, not an oversight.
2. **Bite 5 survived** (see the table). No bite was manufactured to show a red.
3. **Checker-level only**: the per-target proof that the adapters route every span through `emitSpans` is 14.3/14.4, blocked on 15.0.

*Provenance follow-up (docs-only, 2026-09-28)*: all six dispatched runs at `111bba7c` concluded `success` (Consumer Guard, 125B Tool-Boot Smoke, Section Citation Guard, Agent Generator (122), Package Name Drift Detection, Lane Timing; `gh run view <id> --json conclusion,headSha`). The run results above remain local; these CI runs are the branch-head feedback, not the gate.
