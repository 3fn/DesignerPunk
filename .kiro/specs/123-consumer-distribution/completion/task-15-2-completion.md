# Task 15.2 completion: `derive()` — the consumer canonical, derived and refusing first

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 15 · **Agent**: Lina (Opus), tiered secondary for 15.2. Thurgood (Opus) is PRIMARY.
**Date**: 2026-09-29 · **Branch**: `task/123-u2b-profile` (main checkout), from `c34ee564`

**Write scope**:
- **Inside the grant**: Task 15's row names `tools/agent-generator/{derive,generate}.ts`, and both are edited. Thurgood's 15.1 functions at the bottom of `derive.ts` (`readConsumerSpans`, `rowSpanSource`, `renderedHashOf`) are untouched.
- **Out-of-list, disclosed**:
  - **`tools/agent-generator/__tests__/derive.stale-overlay.test.ts`** (new): the design's named file.
  - **`tools/agent-generator/__tests__/consumer-rendering.test.ts`** (Thurgood's 15.1 test). Three assertions follow two intended changes: `_canonical/agents/twin.md` now joins the output set and the row's rendered pieces; and `ConsumerProfileInputs.overlays` now holds the *parsed* overlay, with its pins. Nothing else in it changed.
  - **Two tripwires of mine, re-derived after #239** (`d847230d`, merged at `c34ee564`, which extended `stacy.md`'s LENS row and re-confirmed Stacy's D record). They are not 15.2's, and they are recorded here because they were red at the unit head before any 15.2 edit (they reproduce with 15.2 stashed):
    - `__fixtures__/g1-renderings/manifest.yaml`: the D fixture's record pin moves to `sha256:5055f134…`, the re-confirmed record. D's expected score, **1/13 ROUTES, is unchanged under the new record**: its score test passed before the re-pin, and only the pin test had tripped.
    - `__fixtures__/semantics-guard/canonical/agents/semguard.md` + its `README.md`: the copied `#the-trigger-set-…` unit is re-copied from `stacy.md` (blob `60dbe42a…`). S, the overlay pins and the rows are unaffected.

**CI-provenance**: local

## What changed

- **`derive.ts` — `derive({ source, frontmatter, body, dispositions, overlay, dispositionsFile? })`** (design C22):
  1. It splits into `partition(body)` and `entryTree(frontmatter)`.
  2. **It refuses first.** The checks are `checkDispositionKeys` (orphaned key, missing row), `checkOverlayKeys` and `checkOverlayPins` (stale overlay). They produce **one `DeriveError` carrying every finding's exact catalog string**, and nothing is emitted.
  3. **Body**: `emitSpans(…, 'consumer', dispositions, overlay, 'body')`, the adapters' own selection. The derived body is byte-identical to every target's body.
  4. **Frontmatter**:
     - leaves disposed `no-consumer-counterpart` / `superseded-by` are dropped, along with any list or map they empty;
     - retained leaves keep their canonical value;
     - **an always-set document (`counterpart:`) carries none** (C19).

     Pruning reads positions from the entry tree itself: a member's index among its list node's children, an ambient section's claims, a scalar's key path, and the one rename, `preflight` = `kiro.agentSpawn`. It re-implements none of `entryTree()`'s identity rules.
  5. **Attribution**: the frontmatter block is C1 glue; the body spans are exactly `emitSpans`'s, sourced to the canonical origin.
  - **Re-pointed frontmatter entries and shared members refuse**, with `repointedEntryPendingMessage`, pending Q1 (below). The real profile has no such row before 15.4.
  - Also added: `deriveText` (splits a file's text first); `deriveSharedCatalog` (drops disposed members, refuses a missing row or a re-pointed member); `pruneFrontmatter`; and `keyUniverseOf` / `keyUniverseOfParsed`, the pure forms of `keyUniverse`, which now delegates to them.
- **`generate.ts`**:
  - `generateConsumerRendering` runs `derive()` **for every agent before any adapter emits**, so a refusal stops the whole render.
  - It emits each derived charter **once** to `canonical/_consumer-output/_canonical/agents/<a>.md` (`CONSUMER_CANONICAL_ROOT`), with its attribution sidecar, which the 15.1 reader picks up.
  - `ConsumerProfileInputs.overlays` now holds the **parsed** overlay, pins included, as the one form. `derive()` checks the pins, and the adapters read `toSpanOverlay(…)` of it.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/derive.stale-overlay.test.ts tools/agent-generator/__tests__/consumer-rendering.test.ts` → **`Tests: 30 passed, 30 total`** (derive 18, consumer-rendering 12).
- **The criterion row at function level** ("`derive()` refuses on a stale overlay and an orphaned key", with the real profile at 15.4):
  - `derive.stale-overlay.test.ts › … › stale overlay: derive() refuses, with the exact catalog string` → `overlay for #regrounded re-grounds canonical text sha256:<pinned>, but the current canonical is sha256:<now> — re-author the overlay; refusing to derive`;
  - `› orphaned key: a disposition row naming a renamed unit refuses …` and `› orphaned key: an overlay entry naming nothing refuses`;
  - `› missing row …`;
  - `› ONE error carries EVERY finding …`;
  - `› a refusal stops the whole render: through generateConsumerRendering, no adapter emits anything` (the `emitAgent` spies record 0 calls).
- `npm run test:agent-generator` → **`Test Suites: 50 passed, 50 total` · `Tests: 796 passed, 796 total`**. Before the two re-derivations it was `2 failed`, on `triviality.g1 › the record pin › D …` and `semantics-guard.fixture › its three body units …`, and both also fail with 15.2 stashed. `npx tsc -p tools/agent-generator/tsconfig.json --noEmit` → 0; `npm run typecheck` → 0.
- `npx tsx tools/agent-generator/diff-guard.ts` → `operative-set-freshness: PASS — 4 record(s), 24 unit(s), 4 note(s), 0 dispositions file(s), 0 overlay(s)` then `diff-guard: full-run-green (input-closure-changed)`. With no profile authored, the consumer lane emits nothing, so no output moves. The lock refresh was reverted; it is committed at the parent.
- **Bites** (each mutated, run, restored; `cmp` clean):

  | # | Mutation | Red |
  |---|---|---|
  | B1 | the pin check not run | `✕ stale overlay: derive() refuses …`, `✕ ONE error …`, `✕ a refusal stops the whole render …`. 3 failed. |
  | B2 | the key checks not run | `✕ orphaned key: a disposition row …`, `✕ missing row …`, `✕ ONE error …`. 3 failed. |
  | B3 | `derive()` moved after the adapter loop | `✕ a refusal stops the whole render …`: `Expected number of calls: 0` / `Received number of calls: 1`. 1 failed. |
  | B4 | the re-pointed-entry pending refusal removed | `✕ a re-pointed frontmatter entry refuses loudly …`. 1 failed. |
  | B5 | list members located by value in the (copied) array, not by tree position | `✕ kiro.agentSpawn is the preflight list …`. 1 failed. **Limit recorded**: the duplicate-identity test holds under this mutation, because duplicate strings are interchangeable. The object-member case (a deep copy breaks reference identity) is the one that discriminates. |
  | B6 | the body re-selected (steward, no rows) instead of the consumer `emitSpans` selection | `✕ the body is the emitSpans selection …`, `✕ … byte-identical to every target's body …`, `✕ its attribution is total …`. 3 failed. |

  *(B3's first attempt did not compile, because the mutation left a block open, so it proved nothing and was redone as a clean move of the derive loop.)*
- `npm run check:completion-criteria-parity` after the tick → `SUMMARY: parents evaluated 17, pass 17, fail 0; emissions 0; reds 0`.

## Application-time adaptations

1. **`derive()` takes the split document** (`frontmatter` + `body`) as its pure input, and `deriveText` handles raw text. The call site already holds `resolved.doc`, so nothing is split twice.
2. **Re-pointed frontmatter entries and shared members refuse, pending Q1**, rather than silently picking a derived form.
3. **Frontmatter YAML comments are not carried into `_canonical/`.** The derived frontmatter is re-serialized from the pruned object. Steward comments can carry repo specifics, so dropping them is the safe direction. Surfaced for Task 16, which consumes `_canonical/`.
4. **`_canonical/` writes an attribution sidecar**, so `renderedHashOf` now includes the derived canonical's body piece for body rows. His test's piece list was updated to match.
5. **The two #239 re-derivations** (above): the tripwires fired as designed, and each was re-derived explicitly rather than loosened.
