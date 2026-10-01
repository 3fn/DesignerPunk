# Task 16.1 completion: the consumer emission lane (`emitConsumer`), the prepack derive, `build:generator`, and the parity, paths and degradation tests

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 16 · **Agent**: Lina (Opus), PRIMARY
**Date**: 2026-10-01 · **Branch**: `task/123-u2b-profile` (main checkout), from `0e278450` (#241 retirement and #242 Task 16 amendment merged in)
**Commits**: `3820b32f` (the instruments block, the parent's first act), `d10b4c31` (banner, adapter split, region, `fromManifest`, profile load; lock refreshed), `d966fbbc` (consumer-entry, `build:generator`, tests; lock refreshed), and this doc's commit.
**CI-provenance**: local only. No branch push or dispatch from this seat; the orchestrator pushes.
**Instruments served** (`task-16-instruments.md`): 1.1, 1.3, 1.5, 1.6, 1.8, 1.11, 1.12, 2.2, 7.4, 9.2, 10.1 and 10.2, all built here. The exists rows 1.2, 1.4, 1.7, 1.9, 1.10, 2.1, 2.3 and 10.3 were used as their fit lines say. Two `## Found later` entries (both `unlisted`, self-reported) were appended.

**Write scope**: every edit is inside Task 16's row as amended at #242.
- `tools/agent-generator/consumer-entry.ts` (new).
- `build:generator` and `build:consumer-canonical` in `package.json`.
- `tools/agent-generator/registry.ts`.
- `tools/agent-generator/adapters/{cc,kiro}.ts`.
- `tools/agent-generator/consumer-profile.ts`.
- `canonical/_consumer-output/**` and `canonical/generated.lock`.
- `src/cli/shared/errorCatalog.ts`.
- Tests (four new files under `tools/agent-generator/__tests__/`).

`generate.ts` is not edited (ruling 5). `adapters/index.ts` is not edited (note N3); its exports are imported, never changed. **No signed hash moved, so there is no re-sign** (ruling 3): the freshness sweep passed on both lock refreshes.

## What changed

1. **The consumer banner fix** (`adapters/cc.ts`, `adapters/kiro.ts`): under the consumer profile, the generated-file banner says something true in a consumer's repo. The steward bytes are unchanged.
   - The new text is `Emitted by DesignerPunk (@3fn/core) from the agent definitions the package ships; `npx designerpunk sync` regenerates it and reports hand-edits instead of overwriting them.`
   - It replaces `Source: canonical/agents/<a>.md … (Spec 122 pipeline) … 122-diff-guard`.
   - It is the same `generated-banner` glue and the same single line, so no span moved: the 16 consumer agent renderings changed, and their sidecars are byte-unchanged.
2. **The `emitSkills` root split** (both adapters):
   - The SOURCE resolves against `ctx.repoRoot`: the steward repo, or `<packageRoot>/dist/consumer-canonical` in the lane.
   - The DESTINATION is `row.targets.<t>` joined with the file's relative path and is never resolved against a root, so it is relative to wherever the caller writes.
   - The steward output is byte-identical (diff-guard green).
3. **`CcAdapter.emitAlwaysLayer`, consumer form**: the contents of the `CLAUDE.md` marker region only. That is one `@`-import line per delivered always-set member, in always-set order (`@.designerpunk/personal-note.local.md`, then `@.claude/identity/designerpunk-<id>.md` × 8), with no banner and no markers; 16.4's splicer owns the markers. Kiro's `emitAlwaysLayer` is unchanged (`[]`), because its always-mechanism is each config's `resources`.
4. **`registry.fromManifest`** (`registry.ts`): a pure, declaration-keyed `ManifestRegistry` built from `dist/mcp/tool-manifest.json` (servers → `{ name, readOnlyHint }`, sorted). It invents no description, entry or schema hash, and a malformed manifest throws. `declaredToolNames` is added beside it. The CLI block gained the `STEWARD_CLI` label (see 7).
5. **`loadConsumerProfile(root, relPath = canonical/consumer-profile.yaml)`**: the root-relative load. `loadPackagedConsumerProfile(packageRoot)` reads the byte copy that prepack ships at `dist/consumer-canonical/consumer-profile.yaml`. This keeps one list, read by one loader (C12).
6. **`tools/agent-generator/consumer-entry.ts`** (new):
   - **`emitConsumer({ packageRoot, consumerRoot, target, mode })` → `{ target, mode, files, keys, warnings }`**:
     - **Inputs**: it reads only C20's shipped inputs, `packageRoot`-relative:
       - `dist/consumer-canonical/{agents,shared,always-set,skills}`;
       - the identity docs under `.kiro/steering/`;
       - `governance/**` for the embeds, through a **file-backed corpus** that calls the docs MCP's own `extractFrontmatterInfo` and `resolveSection`;
       - `dist/mcp/tool-manifest.json`, through `fromManifest`.
     - **What it never does**: it never reads `consumerRoot`, writes nothing, starts no process, and emits no attribution sidecar.
     - **Rendering**: it renders each derived charter under the consumer profile with **survivor rows**. Every unit, leaf and catalog member present in the derived input is `retained`: derive() already pruned the rest, so the rows restate what survived rather than judging it. The parity test is the arbiter.
     - **Identity members** are derived at emit time (C22's second call site, the refusal gate), then emitted per target.
     - **Mode**: `reference` emits nothing (CONSUME posture: no agents).
   - **Req 13 degradation**, with a warning and exit 0 each time:
     - a missing identity doc: no member file, no region line, no Kiro resource;
     - an unresolvable governance doc or section: that agent's ambient embed or route is dropped;
     - a granted tool the shipped manifest does not declare: the grant is dropped, along with every cue routed to it.
   - **`buildConsumerCanonical(repoRoot, outDir)`** is THE PREPACK `derive()` (C22's first call site). It writes, refusing before any write on any derive() or validate() failure:
     - `agents/<a>.md`, by derive() + validate() per ledger agent;
     - `shared/shared-catalog.yaml`, by `deriveSharedCatalog`;
     - `shared/{always-set,field-dispositions}.yaml`, byte copies;
     - `shared/skills-map.yaml`, filtered to the rows a shipped charter's `skills:` names, by rule;
     - `skills/**` for those rows;
     - `always-set/<id>.{dispositions.yaml,overlay.md}` × 8 (each derive()d at build too);
     - `consumer-profile.yaml`.

     It loads `generate.ts` through a **computed** `require`, which esbuild cannot follow.
   - **CLI**:
     - `node dist/generator/consumer-entry.js --target <t> [--mode] [--package-root] [--consumer-root]` prints the files and the warnings and exits 0. It writes nothing: the writers are `init`, `attach` and `sync`.
     - `tsx … consumer-entry.ts prepack [--out]` is the steward build.
     - The CLI guard compares `argv[1]` with `__filename`, never `require.main`.
7. **`build:generator`**: `npm run build:consumer-canonical && npx esbuild tools/agent-generator/consumer-entry.ts --bundle --platform=node --format=cjs --define:require.main=undefined --drop-labels=STEWARD_CLI --log-level=warning --outfile=dist/generator/consumer-entry.js`.
   - It is appended to `build`, and `prepack` is `npm run build`.
   - `build:consumer-canonical` is `tsx tools/agent-generator/consumer-entry.ts prepack`.
   - **Why both flags** (instruments note N5, measured): in an esbuild CJS bundle, every inlined ESM module's `require.main === module` compares against the BUNDLE's module. `node dist/generator/consumer-entry.js` would therefore run `registry.ts`'s live introspection.
     - `--drop-labels=STEWARD_CLI` deletes that block, so `main`, `introspectServer`, `generateRegistry` and the stdio transport are tree-shaken out. Bite B4 bites it.
     - `--define:require.main=undefined` is belt and braces for any future bundled CLI block. It is **unbitten**: today no other bundled module has a live CLI block.
8. **`errorCatalog.ts` › `consumerDegradationMessage(member, where, consequence)`**: Req 13's warning, **authored here** (instruments note N1, because the design row reads `(unchanged; warning, exit 0)` with no text). The form is: `warning: <member> is missing from the installed @3fn/core (<where>) — <consequence>. Generation continued without it; reinstall the package (npm install) to restore it.`

## Targeted tests + result

- **`consumer-entry.paths.test.ts`** (18 tests, both targets): **PASS**. It checks:
  - every fs read (`readFileSync`, `readdirSync`, `existsSync`, `statSync`, `lstatSync`, `openSync`, spied on the real module) resolves under `packageRoot`, and none under `consumerRoot`;
  - every output is relative and under `consumerRoot`;
  - decoys planted at the input-shaped paths in `consumerRoot` (`.kiro/steering/core-goals.md`, `.kiro/steering/designerpunk-core-goals.md`, `governance/Contract-System-Reference.md`) never reach an emitted byte;
  - on Kiro, the identity inputs and outputs share `.kiro/steering/` but are disjoint sets;
  - `fromManifest` is called once with the shipped manifest;
  - no `child_process` entry point is called, from the TS source and from the BUILT bundle (built with `build:generator`'s own esbuild command, re-pointed at a temp outfile);
  - the bundle has no `introspectServer`, `generateRegistry`, `StdioCorpusClient`, `createStdioDocsClient`, `StdioClientTransport` or `generateAll`;
  - bundle output = source output;
  - no `*.attribution.json`;
  - reference mode emits nothing;
  - an undeclared target throws;
  - the packaged profile is the byte copy;
  - the three restated constants equal `generate.ts`'s.
- **`consumer-entry.parity.test.ts`** (6 tests): **PASS**. It checks:
  - prepack's `agents/*.md` and `shared/shared-catalog.yaml` are byte-equal to `canonical/_consumer-output/_canonical/`;
  - the shipped skills map holds exactly the rows a shipped charter names, with no `_fixture-skill`;
  - per target, every file under `canonical/_consumer-output/<target>/` (sidecars and root stripped) is emitted byte-equal, with none missing: **cc 16/16, kiro 24/24**;
  - every other emitted file is named: skill files, byte-equal to the steward's guarded `.claude/skills/**` / `.kiro/skills/**` at the same path, and on CC the `CLAUDE.md` region (grain `region`), whose content is the always-set's lines in order;
  - zero warnings.
- **`consumer-entry.degradation.test.ts`** (7 tests): **PASS**. Deleted from the package: `core-goals` (identity), `contract-system-reference` (Lina's embedded law, also a route in other charters), and `validate_assembly` (from the shipped manifest). It checks:
  - the identity warning is string-equal to the literal authored text;
  - every warning comes from the catalog, one per member and holder;
  - each embed or route warning is one of the two forms;
  - the charter minus each member: no member file, no region line, no Kiro resource, no `### contract-system-reference`, no grant or cue;
  - every untouched file and every untouched agent is byte-unchanged;
  - the CLI (`tsx … --target cc`) prints exactly the warnings and **exits 0**.
- **`npm run test:agent-generator`**: 55/55 suites, **1564/1564** tests (52 → 55 suites; 1533 → 1564).
- **`npm run check:122:diff-guard`**:
  - after `d10b4c31`'s edits: `operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)`, then `diff-guard: full-run-green (input-closure-changed)`;
  - after `d966fbbc`'s edits: the same PASS, then `full-run-green (input-closure-changed)`, then `no-op-green` on the committed lock.

  Both lock refreshes were committed with their changes (ruling 4).
- **Other checks**:
  - `npm run audit:coverage-map`: `PASS (surfaces PASS · lanes PASS)`.
  - `npm run typecheck` (root `tsc --noEmit`): clean.
  - `npx tsc --noEmit -p tools/agent-generator/tsconfig.json --rootDir .`: clean (see adaptation 9).
  - `src/cli/__tests__/errorCatalog.test.ts`: 14/14.
  - `npx tsx scripts/pack-assert.ts`: 40/40, with `dist/generator/consumer-entry.js` now in the dry-run tarball (it matches `dist/**/*.js`). The other deferred `files[]` rows are 16.3's.
  - `npm run build`: exit 0 (9.7 s), ending in `consumer-entry prepack: wrote 126 files to dist/consumer-canonical/` and the bundle.
- **Deny-list** over the FULL emission, every file including skills, from a prepack-built package: **cc 114 files, 0 hits; kiro 121 files, 0 hits** for `complete-task.sh|Peter merges|RATIFIED`.
- `npm run test:consumer` was **not run** at 16.1. Its packed-install block is 16.6's, and the `files[]` rows that ship `dist/consumer-canonical/**` are 16.3's.

### Bites (each mutation applied to a saved copy, run, then restored by `cp` from the saved copy and `cmp`-verified)

| Id | Mutation | Expected | Observed |
|---|---|---|---|
| B1 | identity doc read from `consumerRoot` when present there | red | 12/18 red. **Note**: this is a crash-red, because the decoy's body fails derive()'s row check, so B1b is the discriminating bite. |
| B1b | probe `consumerRoot/dist/mcp/tool-manifest.json` before `packageRoot` | only the inputs test red | 2/18 red, both `every input resolves under packageRoot`. Received the consumer-root manifest path. |
| B2 | `child_process.spawnSync(process.execPath, ['-e','0'])` inside `emitConsumer` | the spawn tests red | 3/18 red: `no process starts` × 2, and the bundle's `starting no process` |
| B3 | build the registry inline, bypassing `fromManifest` | the fromManifest test red | 2/18 red |
| B4 | drop `--drop-labels=STEWARD_CLI` from `build:generator` | the bundle text test red | 1/18 red, with 9 introspection identifiers received |
| P1 | embeds untrimmed | parity red on CC only | 1/6 red (the CC guarded-file case; Kiro has no inline embeds, so it stays green) |
| P2 | prepack keeps every skills-map row | the skills tests red | 3/6 red |
| D1 | a missing identity doc throws instead of warning (Req 13.5's named dormant failure) | red | 7/7 red |
| D2 | a missing identity doc is skipped silently | the warning tests red | 3/7 red. The charter-minus-member and CLI tests stay green, correctly: they assert omission and print-what-was-warned. |

## Application-time adaptations

1. **Survivor rows** (above). This is the design's open seam, not stated in C20: the lane holds only the derived text, while the guarded rendering used real rows over the canonical body. Parity (cc 16/16, kiro 24/24) is the evidence that the two paths agree. **Residual**: a future `emitSpans` behaviour that depends on a row's disposition beyond survive-or-not would diverge here, and parity is what would catch it.
2. **The prepack derive restates `generateConsumerRendering`'s step 1** (derive + validate per agent, the shared catalog, the identity refusal). `generate.ts` cannot ship in the bundle and cannot be edited (ruling 5), and its step 1 is fused with the MCP-resolved emit. The parity test's first case pins the restated loop to the guarded `_canonical/`, byte for byte. Three constants are restated from `generate.ts` too, each pinned equal by the paths test.
3. **`keys` is always `[]`**. The MCP config and approval keys stay with `src/cli/shared/mcpConfig/{cc,kiro}.ts` (C8), which already write and `recordKey` them. `init` and `attach` compose them beside `emitConsumer`. **For the 16.2/16.3 briefs**: C20's "`{ files, keys }` … what `init` and `attach` record" is met by the caller's composition, not by this function. In particular, `--reference`'s "MCP config + approvals for the docs and application servers" is the CLI's to write.
4. **Req 13 widened to TOOLS.** `fromManifest` is used to drop undeclared grants and their cues, with a warning each. **Residual**: if a ground-truth directive names a dropped tool, the adapters still throw (`toolRef`), which is loud. That needs a server to lose a tool its own charter's ground truth names, a diet defect not seen today.
5. **The personal note**: the `@.designerpunk/personal-note.local.md` region line and the Kiro resource are ALWAYS emitted, because the lane never reads `consumerRoot`. C19's "absent or all-`TODO` → treated as absent with Req 13's warning" is NOT implemented here. It needs the consumer's file, so it belongs to whoever owns that read: `generate` creating the note at Task 22 (U3), or `attach`/`init` at 16.2/16.3. **Carried, for routing.**
6. **Skills ship un-re-grounded** (consult residual; they are outside the disposition domain): 0 deny-list hits today. `shared/skills-map.yaml` is re-dumped YAML (comments dropped) with a generated header naming its rule.
7. **The bundle still carries the MCP SDK client modules** (about 890 kB, inert). `pipeline.ts` imports `resolve.ts`, which imports the SDK at top level, and neither file is in the grant. The introspection and stdio-transport CODE is absent (tested), and no process starts (tested).
8. **Kiro `emitAlwaysLayer`** is unchanged. "Region-only contents" applies to CC; Kiro has no region.
9. **`tsc -p tools/agent-generator/tsconfig.json`** now reports `TS6059` (rootDir). `consumer-entry.ts` imports `mcp-server/src/**` and `src/cli/shared/errorCatalog.ts` from outside `tools/agent-generator/`. No lane runs that config: ts-jest, tsx and esbuild are unaffected, and with `--rootDir .` it is clean. That tsconfig is outside the grant. **Flagged**: widen its `rootDir` (a one-line edit) under a later grant, or leave it as is.
10. **Ruling 6, disclosed**:
    - I ran `git checkout -- package.json` once, to discard my OWN just-made, uncommitted `package.json` rewrite. A JSON re-serialization had dropped `files[]`'s blank lines, which is 16.3's surface. The file held no other uncommitted work.
    - The build noise from `npm run build` (`docs/tokens.css`, `token-index/semantics.yaml`, and a new `token-index/meta.json`) was restored with `git show HEAD:<path> > <path>` and `rm`.
    - Every bite was restored from a saved copy with `cp`, then `cmp`-verified.
11. **Authored strings** (no design text exists for either): the consumer banner, and the Req 13 warning (note N1; a design-catalog row is the orchestrator's to route).
