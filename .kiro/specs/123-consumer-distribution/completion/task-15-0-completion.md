# Task 15.0 Completion — The consumer profile slice (profile file + loader, adapter registry, profile threading, frontmatter re-pointing, per-member lists, `generateFixture` options)

**Spec**: 123 — Consumer Distribution · **Unit**: U2b · **Parent**: Task 15 · **Agent**: Thurgood (Opus), PRIMARY

**CI-provenance**: local

**Where**: side branch `task/123-u2b-thurgood-15-0`, cut from the unit head `2a96b911`, in worktree `DP-wt-thurgood-15-0`. The orchestrator merges it into the unit branch.

**Write scope**: Task 15's row as amended by #236 (the sequencing correction, 2026-09-28).
- **Inside the grant**:
  - `canonical/consumer-profile.yaml`;
  - `tools/agent-generator/consumer-profile.ts`;
  - `tools/agent-generator/adapters/{cc,kiro,index}.ts`;
  - `tools/agent-generator/spans.ts`;
  - `tools/agent-generator/generate.ts`.
- **Out-of-list on a strict reading, disclosed**:
  - **`tools/agent-generator/__tests__/consumer-profile.adapters.test.ts`** (new). Criterion 2 demands these unit tests; the row names no test file.
  - **`tools/agent-generator/__tests__/spans.source-origin.test.ts`**, Task 10's twin test. One test asserted the removed "frontmatter re-pointing is not implemented yet" throw. It now asserts the implemented behaviour: re-pointed with no overlay text refuses with the exact string; with overlay text, it renders sourced to `#frontmatter:<path>`.
  - **`canonical/coverage-map.yaml`** and **`canonical/generated.lock`**: generated outputs. The new canonical file adds one coverage-map row, and the lock is refreshed with the slice, as criterion 1 asks.

**Criteria served** (tasks.md Task 15, verbatim):
> - **15.0's slice is steward-invisible** *(sequencing correction 2026-09-28)*: with `AdapterContext.profile` defaulting to `steward`, Task 10's golden tests and every file under `canonical/_fixture-output/**` and the guarded roots are byte-identical — `npm run test:agent-generator` green and `npm run check:122:diff-guard` → `full-run-green` with the output hash unchanged (lock refresh committed with the slice), output cited. A declared target with no registered adapter fails loud, naming it.
> - **The consumer path routes through `emitSpans` in both adapters** *(sequencing correction 2026-09-28)*: under `profile: consumer`, per adapter, a unit test shows (a) a re-pointed body unit renders its overlay text with `source` = its canonical `#<anchor>`; (b) a re-pointed frontmatter leaf renders its `## @entry` overlay text with `source` = `…#frontmatter:<path>`; (c) a list-valued field renders **per member**, so `writeScope[<glob>]` is its own span (DD26); (d) a missing row throws. *Scope: fixture shapes; the real 8-agent render is 15.3–15.5; the Kiro JSON config stays steward-shaped (C20).*

## What changed

- **`canonical/consumer-profile.yaml`**: `targets: [cc, kiro]`, `defaultTarget: cc`.
- **`tools/agent-generator/consumer-profile.ts`**: `loadConsumerProfile(repoRoot)` and `parseConsumerProfile(yaml, file)` → `{ targets, defaultTarget }`. It validates loudly: a non-empty list, no duplicates, `defaultTarget` among the targets, no unknown keys. Errors are `ConsumerProfileError`.
- **`adapters/index.ts`**:
  - **The registry**. `registeredAdapterFactories()` returns `{ cc, kiro }`; the adapters are lazily required, because `cc.ts` and `kiro.ts` import this module at load. `adaptersFor(targets, fieldDispositions, extra?)` returns one adapter per declared target, in order.
    - A declared target with no factory throws `no adapter is registered for declared target "<t>" (canonical/consumer-profile.yaml) — register one in tools/agent-generator/adapters/index.ts (registered: …; Req 24 AC3)`.
    - `extra` injects further factories (Task 14's fake third target); shadowing a registered name throws.
  - **`AdapterContext` gains** `profile?: Profile` (absent = `'steward'`) and `consumer?: ConsumerInputs`, where `ConsumerInputs = { dispositions: Record<agentId, Dispositions>; overlays?: Record<agentId, Overlay> }`.
  - **`spanInputsFor(ctx, agentId)`** resolves both for `emitSpans`.
- **`adapters/cc.ts` and `adapters/kiro.ts`**:
  - The agent-body / prompt `emit` helper now calls `emitSpans(acc, src, span.profile, span.dispositions, span.overlay, plan)`.
  - **`writeScope` under the consumer profile renders one bullet per glob**: `{ kind: 'member', list: 'writeScope', index }`, between an intro line and the closing text (CC's closing text keeps the facet-7 enforcement sentence). **The steward path keeps the one-sentence container rendering unchanged.**
  - The Kiro JSON config stays one steward-shaped glue span under every profile (commented).
- **`spans.ts`**: **frontmatter re-pointing is implemented**. A re-pointed leaf renders `overlay.entries[path]` as `render`, with `source` = `<file>#frontmatter:<path>` (the canonical origin, 10.S).
  - With no overlay text it throws `emitSpans: re-pointed frontmatter entry <path> in <file> has no overlay text.`
  - A re-pointed **ambient embed** throws, per DD19.
  - This replaces Task 10's "not implemented yet" throw.
- **`generate.ts`**:
  - `generateAll` builds its adapters with `adaptersFor(loadConsumerProfile(repoRoot).targets, ctx.dispositions)`. No `new CcAdapter` / `new KiroAdapter` remains.
  - `generateFixture(repoRoot, ctx, adapters, opts: FixtureEmitOptions = {})`, where `FixtureEmitOptions = { profile?: Profile; dispositions?: Dispositions; overlay?: Overlay }`. A consumer fixture remaps its outputs under **`canonical/_fixture-output-consumer/<target>/`**, which is not a guarded root and is never written by `generateAll`. The steward fixture lane is unchanged.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/consumer-profile.adapters.test.ts` → **15 passed, 15 total**, covering both adapters for criteria (a)–(d), the no-dispositions refusal, the registry (order, unregistered target, injection, no shadowing), and the profile loader.
- **Bites.** Each one mutated a file, ran the named test file, and restored it; the suite was re-run at 15/15 afterwards.

  | # | Mutation | Red (exact) |
  |---|---|---|
  | B1 (a) | a re-pointed body unit sourced to the profile (`consumer-profile:#regrounded`), not its canonical anchor | `✕ (a) …` on **both** adapters: `Expected length: 1 / Received length: 0` (no span sources `canonical/agents/twin.md#regrounded`) |
  | B2 (b) | a re-pointed frontmatter leaf sourced to `consumer-profile:<path>` | `✕ (b) …` on both adapters: `Expected length: 1 / Received length: 0` |
  | B3 (c) | the consumer profile keeps the container sentence (`if (span.profile === 'steward' \|\| span.profile === 'consumer')`) | `✕ (c)` on both adapters (`Expected length: 1 / Received length: 0` for `writeScope[a/**]`), and `✕ (d)`: `Expected substring: "emitSpans: frontmatter entry writeScope[a/**] in canonical/agents/twin.md has no disposition row — never implied as retained." / Received function did not throw` |
  | B4 (d) | a missing body row read as retained | `✕ (d)` on both adapters: `Expected substring: "emitSpans: body unit #kept in canonical/agents/twin.md has no disposition row — never implied as retained." / Received function did not throw` |
  | B5 | an unregistered target silently built as `cc` | `✕ a declared target with no registered adapter fails loud, naming it`: `Expected substring: "no adapter is registered for declared target \"ghost\" (canonical/consumer-profile.yaml) — …" / Received function did not throw` |

- **`npm run test:agent-generator`** → **`Test Suites: 46 passed, 46 total` · `Tests: 733 passed, 733 total`**. This includes Task 10's goldens: `cc-adapter`, `kiro-adapter`, `spans.source-origin`, `partition.golden`, `generate-fixture`.
  - **Measurement condition**: read-only symlinks `mcp-server/dist`, `application-mcp-server/dist`, `product-mcp-server/dist` and `dist` pointing at the main checkout's built outputs. `mcp-server/src`, `application-mcp-server/src`, `product-mcp-server/src` and `src` have the same tree SHAs there as on this branch. Nothing was built or written in the main checkout.
  - The symlinks are untracked and never committed.
  - Without them, 13 suites fail to *load* (the known fresh-worktree class), on this branch and on its base alike.
- **`npx tsx tools/agent-generator/diff-guard.ts`**, same symlinks → `operative-set-freshness: PASS — 4 record(s), 24 unit(s), 4 note(s), 0 dispositions file(s), 0 overlay(s)` then **`diff-guard: full-run-green (input-closure-changed)`**. The lock is refreshed; see adaptation 1 on the output hash.
- `npx tsc -p tools/agent-generator/tsconfig.json --noEmit` → exit 0.
  - **Root `tsc --noEmit` was not runnable here**: it fails only on the missing generated `TokenTypes` (fresh-worktree class, no changed file involved). It is left to the unit-branch measurement.
- `npm run check:completion-criteria-parity` after the tick → `SUMMARY: parents evaluated 16, pass 16, fail 0; emissions 0; reds 0`.

## Application-time adaptations

1. **Criterion 1's "output hash unchanged" cannot hold as written. A new canonical file adds a coverage-map row.**
   - Every agent, skill, always-layer and `_fixture-output/**` output is byte-identical: `git status` after the full diff-guard run shows no change under any guarded root except `canonical/coverage-map.yaml`.
   - But `canonical/consumer-profile.yaml` is a new surface. `coverage-map.yaml` is itself a guarded output, and it gains `- surface: canonical/consumer-profile.yaml / checks: []`. So the outputs hash moves `d4edb792…` → `93f8be93…` by exactly that row.
   - This is a defect in the criterion text I wrote, and it needs an erratum: *"… byte-identical, except `canonical/coverage-map.yaml`'s row for the new `canonical/consumer-profile.yaml`"*.
2. **The new row is BLANK. `npm run audit:coverage-map` → FAIL, `UNADJUDICATED BLANK ROWS (1): [FAIL] canonical/consumer-profile.yaml`. This is surfaced, not fixed.**
   - In substance `122-diff-guard` guards the file: it is a generation input, and changing its targets changes the outputs the guard compares. But no check's `surfaceGlobs()` lists it.
   - The S-D1 fix, listing it through `coverage-map.ts`, is a Spec 122 file **outside Task 15's grant**. An adjudication belongs to Stacy's seat.
   - Routing is the orchestrator's (the CI-regime instrument rule: surfaced rows are adjudicated or chartered):
     - **(i)** a time-boxed adjudication, F3 precedent;
     - **(ii)** a grant for a `coverage-map.ts` edit making `diffGuardSurfaceGlobs()` include the profile, e.g. through a `surfaceGlobs()` exported by `consumer-profile.ts`.

     **I recommend (ii)**, because the guard really does cover the file.
   - `audit:coverage-map` is not a CI step, so CI stays green; the red is local and at the health check.
   - This is the instrument-existence class, recurring in its fitness shape: nobody read ahead that a new canonical file needs a coverage row.
3. **Name deviation from the row's wording.** The row says `AdapterContext.profile/dispositions/overlay`. `AdapterContext.dispositions` already exists as Spec 122's field-disposition table, so the consumer inputs live under `consumer: { dispositions, overlays }`, keyed by agent id.
4. **Container pieces are not disposition-aware under the consumer profile.** Carried to 15.3–15.5; out of 15.0's scope. Only leaves take rows, so a consumer render still emits:
   - the section headers (`## Routing`, `## Commands`, the `commands` / `routes` / `knowledgeBases` / `preflight` container glue) even when every member is dropped;
   - the `skills` line;
   - per-agent ambient embeds (`ambient[<docid>]` is a container; its section leaves carry the rows).
5. **A consumer fixture's output root** is `canonical/_fixture-output-consumer/`: never guarded, never written by `generateAll`. It is the test-time lane Task 14 reads.
