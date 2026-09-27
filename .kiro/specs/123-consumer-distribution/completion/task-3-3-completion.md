# Task 3.3 Completion — The U1 `files[]` diff; `pack-assert.ts` reading `floor-closure.json`

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 3 · **Agent**: Ada (Sonnet)

## What changed

### `package.json` `files[]` — the U1-scoped diet

**Scope note, load-bearing for this diff**: design.md § "C5" states ONE combined ADD list (closure 2 + declared-floor members + `dist/consumer-canonical/**` + the eight identity docs + `templates/personal-note.template.md`) and ONE combined REMOVE list (`product-template/`, `.kiro/agents/`, the `.kiro/steering/` directory glob, wholesale `src/`, `designerpunk.config.ts`). **tasks.md's own sequencing decision #2 ("The matching `files[]` removals and the identity-doc additions move to U2. Lina confirmed.") and decision #1 ("`init`'s agent-layer rows move from U1 to U2 ... in U1 `.kiro/agents` is still copied") pull the STEERING/AGENT-IDENTITY pairing to U2, not U1** — because `init.ts` in U1 still wholesale-copies FROM `.kiro/agents/` and `.kiro/steering/` at birth (`src/cli/init.ts` lines 217–235, unchanged since Task 2, explicitly commented `"UNCHANGED in U1 (moves to Task 16's C20 generation)"`); removing those source directories from `files[]` now would break U1's own `init` in a packed install. Ada's own R1 walk of the release-1 path (`feedback/tasks.md` § "[ADA R2]" answer (b)) states this explicitly: *"Agent / steering / governance copies (6/7/7b) | kept per decision 1; sources kept in `files[]` per decision 2."*

So **Task 3's actual diff is narrower than C5's raw text**:

**REMOVED** (all three land in U1; none depend on the U2 pairing):
- `"src/"` (the wholesale glob — the core of the diet)
- `"product-template/"` (Req 4.6b: the directory contains only `agents/`; nothing in `src/cli/` references it — verified: `grep -rn "product-template" src/cli/` → 0 matches)
- `"designerpunk.config.ts"` (D-B3: nothing relies on the shipped copy — `figma-*` and `ConfigLoader` read the consumer's own cwd copy)

**UNCHANGED** (deferred to U2 per the sequencing decisions above): `".kiro/steering/"`, `"governance/"`, `".kiro/agents/"`, and all pre-existing `dist/**`, `mcp-server/**`, `application-mcp-server/**` entries (the latter two per DD14: "the existing server `src/` entries are decided by C5's closure" — C5's closure computation is about `src/tokens/**`'s runtime import graph, not these two servers, so they stay wholesale, tests included, unchanged).

**ADDED** (the declared floor members, Req 4.2, that are NOT part of the U2-deferred identity-doc pairing):
- `"src/tokens/**"` — the whole tier, load-bearing at generate-time in package mode (no test exclusion — Req 4.4's "`__tests__` shall not ship" is scoped to `src/components/**` only; C5's own `src/tokens/**` bullet carries no exclusion, so none is added here — "over-inclusion is the safe direction," design's own stated philosophy)
- `"src/styles/"`, `"src/assets/fonts/**"` + `"!src/assets/fonts/__tests__/**"` — the `./grid.css` and `./fonts/*.css` package exports resolve here directly (verified: `package.json` exports `"./grid.css": "./src/styles/responsive-grid.css"`, `"./fonts/rajdhani.css": "./src/assets/fonts/rajdhani/rajdhani.css"`, etc. — raw source, never compiled to `dist/`)
- `"src/components/**/{*.schema.yaml,contracts.yaml,component-meta.yaml}"` — the component metadata floor (Req 4.2). **Glob-form correction, not a copy of the requirement's literal text**: Req 4.2's own prose (`*.{schema.yaml,contracts.yaml,component-meta.yaml}`) would brace-expand to `*.schema.yaml` / `*.contracts.yaml` / `*.component-meta.yaml` — but the actual files are named `contracts.yaml` and `component-meta.yaml` (no `<Name>.` prefix; only the schema file is `<Name>.schema.yaml`). A literal transcription would SILENTLY SHIP ZERO `contracts.yaml`/`component-meta.yaml` files (exactly the "presence-of-a-token" class this spec exists to catch). Corrected to `**/{*.schema.yaml,contracts.yaml,component-meta.yaml}` — verified via `npm pack --dry-run`: 34/34/34 present (34 components × 3 files).
- The 16 closure-2 files, listed explicitly (`files[]` cannot reference a generated JSON at publish time — npm requires literal path entries; `pack-assert.ts` below is what keeps this list honest against drift, per Ada's own D-T-B1/(a) finding).
- `"dist/mcp/tool-manifest.json"`, `"dist/name-contract.json"` — Task 4's (C8) and Task 6's (C7 name-contract) U1 build outputs. Neither exists yet at this commit (Tasks 4 and 6 run after Task 3 in sequence) — these are PATTERN entries; `npm pack` is silent about a pattern matching nothing today, and `package.json` is Task 3's Primary Artifact (not Task 4's or Task 6's), so the packaging DECISION for the whole unit's expected outputs is made once, here.
- **NOT added**: `"dist/generator/**"` — C5 lists it in the same ADD bullet, but its OWN home requirement (Req 14.1: *"A compile lane SHALL build the generator ... with a bin subcommand and `files[]` entries"*) explicitly assigns that `files[]` entry to Req 14's own task (U2, the generator/agent-layer work), not to C5's packaging-floor decision. Verified `dist/generator/` does not exist yet (`ls dist/generator` → no such directory) — nothing to add a dangling pattern for prematurely, and the U2 task that builds it owns declaring it.
- The iOS/Android platform closures — see Task 3.4's completion doc for the KEEP-WITH-FOLLOW-UP verdicts and the exact glob rows.

### `scripts/pack-assert.ts` (new)

Reads `floor-closure.json`'s **regenerated** `closure2.files` list (never a copy embedded in the script — Ada's own D-T-B1/(a) finding, applied to this script by name) and asserts it against a real `npm pack --dry-run --json --ignore-scripts` listing:
1. Every closure-2 file present.
2. Other declared-floor ADD paths present (a sample: the mcp-config template, the grid CSS, one font CSS).
3. Component metadata floor present with equal, non-zero counts across all three file kinds.
4. REMOVE paths absent: `designerpunk.config.ts`; no `product-template/**` files; wholesale-`src/` sentinels (`Avatar-Base/index.ts`, `Avatar-Base/platforms/web/Avatar.web.ts`, `src/validators/buildValidation.ts`, `src/generators/TokenFileGenerator.ts`, `src/cli/init.ts`) absent.
5. `product-mcp-server/src/**` NOT ADDED (DD14).
6. No `__tests__`/`examples` under `src/components/**` specifically (Req 3.4's exact scope — `application-mcp-server/src/__tests__/**` and `mcp-server/src/__tests__/**` are SEPARATE pre-existing wholesale entries C5 does not touch, per DD14, and correctly ship their own tests unchanged; an earlier version of this assertion was scoped too broadly and failed on those unrelated paths before I narrowed it).
7. Platform-closure rows (iOS/Android) — see Task 3.4.

## Targeted tests + result

`npx tsx scripts/pack-assert.ts` (against a freshly `npm run build`-ed tree) → **40/40 assertions passed**. Full transcript recorded below (Task 3.4 has the platform-row detail).

## Bite recorded red (package.json → pack-assert.ts, the live wiring)

1. Removed `"src/constants/StrategicFlexibilityTokens.ts"` (one closure-2 file) from `package.json`'s `files[]` (via `sed`, with a backup).
2. Re-ran `npx tsx scripts/pack-assert.ts` → **RED**: `FAIL: closure-2 ADD present: src/constants/StrategicFlexibilityTokens.ts` — `39/40 assertions passed`, exit non-zero.
3. Restored `package.json` from the backup (`cp` back), confirmed valid JSON, confirmed `git diff --stat package.json` shows ONLY the intended `files[]` change (34 insertions / 4 deletions from the original — no residue from the bite).
4. Re-ran `npx tsx scripts/pack-assert.ts` → **GREEN**: `40/40 assertions passed`.

This exercises Ada's own D-T-B1/(a) finding directly: the assertion reads `floor-closure.json`'s regenerated list, so a `package.json` drift is caught by RE-RUNNING the pack check against the CURRENT `files[]`, not by a frozen constant inside `pack-assert.ts` itself.

## Application-time adaptations

1. **`.kiro/agents/`, `.kiro/steering/`, and `governance/` are NOT removed in this subtask**, despite Req 4.6b's literal text naming `.kiro/agents/` as a `files[]` removal. See the "Scope note" above — this is a considered placement decision (tasks-round sequencing, not a missed requirement), recorded here rather than silently deviating from the requirements doc's literal words.
2. **`no __tests__ paths ship` was first written as a blanket check** (`(^|/)__tests__(/|$)` anywhere in the tarball) and FAILED against `application-mcp-server/src/__tests__/**` — correctly, since that's a real, unrelated, pre-existing wholesale entry. Narrowed to `src/components/**`'s own `__tests__` dirs specifically, matching Req 3.4's literal scope. Recorded because it is exactly the kind of over-broad assertion this spec's own R26.8 discipline warns against (a criterion whose FAILURE mode would have been "correctly detecting something the requirement never asked it to detect").
3. **`android platforms/android/.gitkeep` (8 files) are NOT swept into the pack** by this implementation's globs (`*.kt`, `res/**`) — Data R2's count included them as "swept in by `**`; harmless," but this Task's actual glob choice (`*.kt` for component sources, `res/**` for resources) does not happen to sweep in the 8 bare `platforms/android/.gitkeep` placeholders (they sit directly at `platforms/android/.gitkeep`, matching neither pattern). Recorded as a deliberate, harmless divergence from Data's assumed glob shape, not a defect — shipping meaningless placeholder files serves no consumer purpose, and Data's own advisory explicitly left "count them or exclude them" as an open choice.

## Known issues

None carried from this subtask (the corrected component-metadata glob and the narrowed test-path scope are both closed here, not carried forward).
