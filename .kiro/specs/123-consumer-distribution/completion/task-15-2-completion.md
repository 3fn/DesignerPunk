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

**CI-provenance**: branch-head dispatch @ 7b6009d04b23b7fca3e72b060710c12d810b6546 — https://github.com/3fn/DesignerPunk/actions/runs/36558445010, https://github.com/3fn/DesignerPunk/actions/runs/36558452224, https://github.com/3fn/DesignerPunk/actions/runs/36558459358, https://github.com/3fn/DesignerPunk/actions/runs/36558466705, https://github.com/3fn/DesignerPunk/actions/runs/36558474180, https://github.com/3fn/DesignerPunk/actions/runs/36558481410

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

*CI provenance (docs-only addendum, 2026-09-29)*: all six runs dispatched at `7b6009d0` concluded `success` (Consumer Guard, 125B Tool-Boot Smoke, Section Citation Guard, Agent Generator (122), Package Name Drift Detection, Lane Timing). The run results above stay local; the CI line supports only "the required checks were green at branch head `7b6009d0`". Rule 5 holds: this addendum commit follows `7b6009d0` directly and changes only this doc.

## Reads for the orchestrator (2026-09-29)

### Q1 — what `_canonical/` holds for a re-pointed frontmatter entry. **Verdict: (b), YAML-valued entry overlays.**

**Why (b).**
- `_canonical/agents/<a>.md` is the **derived canonical charter**. What ships is derived (Q5, C22), and Task 16's consumer lane (`emitConsumer`, mine) renders its per-target files from it.
- So its frontmatter must be a real frontmatter: typed values that the adapters render per target. An `## @entry` overlay today is **rendered prose** (15.0 criterion (b)), and prose cannot be turned back into a YAML value.
- **The machine-read surfaces decide it.** Kiro's JSON config (`write.allowedPaths`, `tools`, `resources`) is built from frontmatter *values*, and so is CC's `tools:` list. A consumer re-grounding of `writeScope[.kiro/specs/**]` reaches `allowedPaths` only as a value.
- Under (b), Task 16's lane is simply the adapters rendering the derived charter. With no second splice step, and the invariant that target renderings = rendering(derive(x)) becomes testable.

**Why not (a), a companion `_canonical/agents/<a>.overlay.md`.**
- The derived frontmatter would **lose** the re-pointed entry. The consumer's Kiro config would then either keep our steward value (if the lane falls back to canonical) or drop the permission entirely (if it does not).
- Every consumer-side renderer would also have to splice prose that is already rendered back into its own section format. That is a second rendering path, which is the drift C22 exists to prevent.

**Why not (c), frontmatter derivation left to Task 16.**
- It is non-compliant with C22 / L-D4: the shipped canonical would carry our commands and write scope.
- It only moves the same decision into my own parent, later.

**Residual (surviving, not absorbed).**
- (b) reopens 15.0's settled `## @entry` semantics. The body becomes a YAML value (pin unchanged, `hashEntry` of the canonical value), so Task 15's 15.0 criterion (b) needs an erratum.
- It also reopens `spans.ts`'s re-pointed-leaf rendering. Under the consumer profile, the adapter's normal per-kind renderer should render the substituted **value**, not insert overlay text verbatim.
- My Task 14 E-fm fixture and bites must move to values and be re-run. The overlay texts in `__fixtures__/semantics-guard/` are prose bullets today.
- **Authoring cost rises**: a re-grounded command is a full command object, while a glob is a string, so each field type needs its own value shape and schema check.
- **(a) is cheaper today, and that is the real counter.** I still pick (b), because (a)'s saving is paid back in Task 16 as a second rendering path plus a Kiro config that cannot carry re-grounded permissions.
- **The pick is yours.** In `derive()` the change is small either way. Under (b), the entry's value is substituted where it is currently refused (`repointedEntryPendingMessage`); under (a), the entry is dropped and a companion file emitted.

### Q2 — scoping on the adapters + `spans.ts` grant for 15.3–15.5. **ACCEPT, AMENDED.**

**Thurgood's draft**: "under the consumer profile, nothing renders that no surviving member sourced", plus the Kiro JSON consumer form at 15.3. I accept both, amended with three clauses for the row text:
1. *"…under the consumer profile, nothing renders that no surviving member sourced; **under the steward profile every output is byte-identical** (Task 10's goldens pass unchanged, and the diff-guard output hash moves only by the consumer root's own files)."*
2. *"**`semantics-guard.test.ts` (Task 14, the per-target routing arbiter) stays green** after every adapter or `spans.ts` edit, and a new per-target emission path (e.g. `emitIdentityMembers`) routes through `emitSpans`."* A new adapter method is exactly the surface the guard exists for.
3. *"**Shared-catalog members read their `_shared.dispositions.yaml` rows under the consumer profile** (dropped / retained; re-pointed per the Q1 ruling)."* The Instruments block's "Found later" names it; the row should too.

**On the Kiro JSON consumer form at 15.3**: under Q1 (b) it builds from the derived frontmatter's values, so a re-grounded `writeScope` glob lands in `allowedPaths`. Under (a) it cannot, which is the Q1 point above. The form should be decided after Q1 is ruled, or the 15.3 row should say it follows the Q1 ruling.

### `init.ts:94` `attachedTargets`. **ACCEPT as a Task 16 row, AMENDED.**

**Thurgood's draft**: "`attachedTargets` names only the targets emitted; bare init = `[<defaultTarget>]`". Accepted, amended to:

> *"`attachedTargets` names only the targets emitted; bare `init` = `[defaultTarget]`, **read through `loadConsumerProfile` (no literal target list — C12)**; `init.test.ts:365`'s two-target expectation moves to the `--target=kiro` / two-target case."*

**Consequence for Task 15, stated so it is not discovered at the claims pass**: Task 15's C1 criterion, *"the sweep for other declared target lists returns only imports"*, cannot read ✅ while `init.ts:94` holds a literal. Its row should read **⚠️, linking this Task 16 row**, unless the sweep's scope is amended to name `src/cli/**` as Task 16's. That is Thurgood's call as the criterion's author, and I raise it only so the parent doc does not reach it by surprise.

