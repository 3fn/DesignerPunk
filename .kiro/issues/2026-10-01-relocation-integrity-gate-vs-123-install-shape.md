# Issue: the 119-A relocation-integrity gate collides with Spec 123's install shape (A4 / A7 legs)

**Date**: 2026-10-01
**Status**: ACTIVE
**Owner**: Thurgood
**Trigger**: now. The fixing PR goes into U2b's unit branch before the next unit-branch checkpoint dispatch (16.4), so `lane-mcp-server-suite` is green for 16.4–16.6. **Hard stop**: before U2b's unit PR opens.
**Source**: the orchestrator verified this on 2026-10-01 at U2b unit-branch head `4b87fe7c` (16.3 merged). Run: https://github.com/3fn/DesignerPunk/actions/runs/36948483681

---

## The finding

On `task/123-u2b-profile` at `4b87fe7c`, `Lane Timing / lane-mcp-server-suite` is RED. 37 suites ran, 1 failed; 612 tests ran, 2 failed. The failing file is `mcp-server/src/relocation-integrity-gate/__tests__/relocation-integrity-gate.test.ts`, and the two failing tests are:

- "PASSES across all axes against the live repo"
- "remediates all 7 must-fix coupling surfaces (Req 8 AC7)" (5 of 7 remediated)

The two couplings that did not remediate, verbatim:

- `src/cli/init.ts + src/cli/designerpunk.ts (init governance copyDir=false & keeps .kiro/steering=true; designerpunk governance=true & no steering-spawn=true)`. This is gate leg A4, around `relocation-integrity-gate.ts` L343–357.
- `package.json files[] + init template + Manifest COPY_ROOTS (files[] governance=true/steering=false; template governance=true/no-dead-tool=true; COPY_ROOTS governance=true/steering=true)`. This is gate leg A7, around L388–420.

**Cause.** Subtask 16.3 (`fcdc8bf9`) made these changes on purpose:

- Spec 123 design C1 removed rows 6/7/7b (the `init` copies of `.kiro/agents`, `.kiro/steering` and `governance`).
- C5 removed `.kiro/agents/` and the `.kiro/steering/` directory glob from `files[]`.
- The eight identity docs now ship by explicit path.

The previous checkpoint, `2a7a5336`, was green. The gate is never mentioned in Spec 123's tasks.md, its design.md, or Task 16's instruments block. The root `npm test` does not run the mcp-server suite, so 16.3's "full suite green" could not see the failure. The unit-branch CI dispatch (ballot B-CI) caught it at the checkpoint, as designed.

**Second time this gate has collided with Spec 123.** The first was Task 5.4, when `FileScanner` `MANAGED_DIRS` was retired. That one was fixed by re-pointing leg A7 to `COPY_ROOTS` (`completion/task-9-ci-gatefix-completion.md`). Two collisions are the evidence behind the Standards implication below.

**Already vacuous before this run.** A4's `initKeepsSteering` sub-check still reads `true` at `4b87fe7c`, but only because the string `.kiro/steering` survives in `init.ts` **comments** (the file header at L10, the step-6 comment around L241). After comment stripping, `init.ts` code names no corpus root at all. The rewrite below strips comments before matching.

---

## (a) What each coupling protected in the 119-A world

- **A4: "ADD governance copyDir, KEEP .kiro/steering"** (`inventory/coupling-sweep.md` § A4; 119-A Req 1 AC7, Req 8 AC7).
  - **Invariant: a consumer scaffold's agents still receive both corpora after relocation.** In 119-A, `init` delivered both corpora by copying them into the consumer tree.
  - The relocated governance docs were added through a new `governance/` copy.
  - The identity docs were kept through the existing `.kiro/steering` copy. Kiro always-loads `.kiro/steering/`, and the sweep notes that "a literal repoint would drop the 8 identity docs from the consumer scaffold".
  - The `designerpunk.ts` half protected a separate fact: the docs MCP is spawned over the relocated `governance/` root and never over `.kiro/steering`, which holds identity docs only and is not indexed.
- **A7: `files[]` governance ADDED / `.kiro/steering/` KEPT** (119-A Req 5 AC2, Peter's 2026-06-27 decision: "identity docs KEEP shipping (status quo)").
  - **Invariant: the package ships what the consumer needs to receive both corpora.** That is `governance/` for MCP serving, plus the identity docs that the `init` copy, and later `sync`, read from the package.
  - The template sub-check protected `MCP_STEERING_DIR → governance` and the removal of the dead `get_documentation_map` tool (Req 5 AC3, B4).
  - The `COPY_ROOTS` sub-check (re-pointed from `MANAGED_DIRS` at 5.4) protected Req 5 AC5: `sync` keeps reconciling the relocated docs and the identity docs, and does not silently stop reconciling them.

## (b) Does Spec 123 serve those invariants another way? Yes for every leg, with two scoped changes, both made by ruling

| 119-A invariant | 123 mechanism | Verdict |
|---|---|---|
| Consumer agents can reach governance docs | Served by MCP from `node_modules/@3fn/core/governance`: `files[]` keeps `governance/`; the template (now read by `attach.ts` L397/L445 and `sync/KeyGrain.ts` L125) emits `MCP_STEERING_DIR=./node_modules/@3fn/core/governance`; `designerpunk.ts` L355 spawns over `pkgRoot/governance`. Gate 4b (Req 14.4, Req 19.1) stops the copy. | **Served** |
| Consumer agents receive identity docs | The eight docs ship by explicit path (C5). `emitConsumer` reads them **`packageRoot`-relative** (C20) and runs `derive()` at emit time (C19, C22). It emits CC `.claude/identity/designerpunk-<id>.md` plus a `CLAUDE.md` marker region, or Kiro `.kiro/steering/designerpunk-<id>.md` with `inclusion: always`. `init` reaches this through `emitAgentLayer` (C1 "(new) agent layer"). | **Served**, and better grounded: the content is derived rather than copied verbatim |
| Personal note reaches the consumer | 119-A's `.kiro/steering/` glob shipped **Peter's own** `personal-note.md` to every consumer. 123 rules that it never ships; a template (Task 22, U3) replaces it, and C19 degrades with a warning until then. | **Changed by ruling** (C5, Req 12.1a). This fixes a 119-A-era leak and does not break anything. |
| `sync` reconciles the copied corpora | C7 removes the package-copy rows from the managed set. Release-1 copies (`origin: 'copy'` under `.kiro/agents` / `.kiro/steering` / `governance`) become the **migration** surface: detected, reported, `--migrate-legacy` + `attach` (16.5). | **Served, with a new meaning**: from 16.5, `sync` recognizes legacy copies instead of reconciling them |
| `attach --reference` (CONSUME) gets identity docs | It emits no agents and no identity members (C20). | **Scoped out by ruling.** No agents are installed, so nothing is owed. |

Spec 123 breaks none of the invariants. The gate fails because it asserts **119-A's mechanism** (copy plus directory glob) instead of the invariant.

## (c) The new assertions (the 123 world)

Rules that apply to every rewritten leg:

- Source checks run on **comment-stripped** text.
- `files[]` is checked by **parsing `package.json` as JSON**, not with a regex.
- `couplingsTotal` stays 7. The surface labels stay recognizable.

**A4: `src/cli/init.ts + src/cli/designerpunk.ts`**
1. **`init` copies no package corpus** (gate 4b). The comment-stripped `init.ts` names no string literal `governance`, `.kiro/steering` or `.kiro/agents` (with or without a trailing `/`). This replaces "ADD governance copyDir".
2. **`init` delivers identity through the generated agent layer** (C1, C19). The comment-stripped `init.ts` calls `emitAgentLayer(`. This replaces "KEEP .kiro/steering".
3. Unchanged: `designerpunk.ts` spawns the docs MCP at `path.join(pkgRoot, 'governance')`.
4. Unchanged: `designerpunk.ts` has no `path.join(pkgRoot, '.kiro/steering')` spawn.
- Detail string: `init copies no package corpus (governance/.kiro/steering/.kiro/agents)=${…}; init emits agent layer=${…}; designerpunk governance=${dpGov} & no steering-spawn=${dpNoSteering}`

**A7: `package.json files[] + MCP config template + Manifest COPY_ROOTS`**
1. `files[]` contains `governance/`. (Unchanged.)
2. **The `.kiro/steering…` entries in `files[]` are exactly the locked identity set minus `personal-note`, each by explicit path.** The set is `LOCKED_IDENTITY_IDS` without `personal-note`. Each id resolves to `.kiro/steering/<file>` through the identity axis's own frontmatter `id:` → file map, so there is no second hardcoded list, and each path exists on disk. This replaces "KEEP `.kiro/steering/`".
3. **`files[]` has no `.kiro/steering` directory glob** (`.kiro/steering/`, `.kiro/steering/*`, `.kiro/steering/**`) **and no `.kiro/steering/personal-note.md`.** This is the C5 removal and the never-ships ruling.
4. Template: unchanged. `governance` is present, `.kiro/steering` is absent, and `get_documentation_map` is absent.
5. **`COPY_ROOTS`: the same regex, with its meaning re-labelled.** The release-1 copy roots that `sync` recognizes include `governance` and `.kiro/steering`, so a release-1 consumer's copied relocated docs are never orphaned unrecognized.
   - **Before 16.5**, those roots are still managed at file grain (Manifest.ts L67–73). The assertion is true at `4b87fe7c`.
   - **After 16.5**, C7 de-manages them, and the release-1 cohort migration keys `origin: 'copy'` on exactly these paths. If `COPY_ROOTS` carries that legacy-recognition meaning (expected), the **same assertion holds**.
   - If 16.5 moves the legacy root list to another symbol, the leg is re-pinned to that symbol (see Grant).
   - If 16.5 drops `governance` or `.kiro/steering` from legacy recognition, the red is a **true** red against Task 16's release-1-cohort criterion.
   - The semantic proof that `sync` no longer *applies* package content into those roots belongs to 16.5's own tests, not this gate.
- Detail string: `files[] governance=${…}/identity-by-path=${n}/8 exact=${…}/no-steering-glob=${…}/no-personal-note=${…}; template governance=${…}/no-dead-tool=${…}; COPY_ROOTS (release-1 copy roots) governance=${…}/steering=${…}`

**Verified before filing.** I simulated the A4 sub-checks 1–2 and the A7 sub-checks 1–3 read-only.

- At unit head `4b87fe7c`: all pass (no corpus-root literal in code; `emitAgentLayer(` present; `governance/` present; exactly the eight).
- At `main` `ad17a22a`: all fail (release-1 `init` still copies; one `.kiro/steering/` glob).
- **So the fix cannot land on `main` before U2b. It rides the unit branch.**

**Bites the fixing PR records**, each as a fixture-tree unit test over `assertMustFixCouplings`:

- Restore the `.kiro/steering/` glob → red.
- Add `.kiro/steering/personal-note.md` to `files[]` → red.
- Drop one of the eight → red.
- Add a `copyDir(path.join(pkgRoot, 'governance'), …)` to `init.ts` → red.
- Remove the `emitAgentLayer(` call → red.
- A corpus-root literal that appears only in a comment → green. This is the vacuity regression check.

## (d) Who edits, by what route, when

- **Route: a rule-8 issue grant to Thurgood**, not a tasks.md amendment. The gate is outside Task 16's Primary Artifacts and is a steward instrument. A tasks.md amendment is a trigger surface that needs a consult and would put a gate Lina does not own into her row.
- **Fixing PR**: branch `chore/relocation-gate-123-install-shape`, cut from `task/123-u2b-profile`, **with base `task/123-u2b-profile`**. Peter merges it into the unit branch, where it rides U2b to `main`. It cannot target `main` (see (c) "Verified").
- **Timing: now**, as one fixing PR covering A4, the A7 `files[]` legs, the `COPY_ROOTS` re-label and the bites.
  - **16.5 obligation**, sent to Lina as a consult and not as a grant: if 16.5 renames `COPY_ROOTS` or moves the legacy-copy root list, she tells Thurgood before her sub-branch merges into the unit branch. The re-pin is then appended to this issue as a dated grant extension over the same two paths, carried by a second PR into the unit branch.
- **Closing**: once the U2b unit PR merges to `main`, the outcome is recorded in this file (dated) and the file moves to `archive/` (README rule 5).

## (e) Other standing checks outside the root `npm test` that read Task 16's surfaces

The sweep grepped `mcp-server/src`, `application-mcp-server/src`, `product-mcp-server/src`, `scripts/` and `.github/workflows/` for `init.ts`, `files[]`/`package.json`, `COPY_ROOTS`, `.kiro/steering` and `.kiro/agents`. It was cross-checked against every workflow's result at `4b87fe7c`.

| Hit | Reads | Verdict |
|---|---|---|
| `mcp-server/src/relocation-integrity-gate/**`, legs A4/A7 | `init.ts`, `files[]`, `COPY_ROOTS` | **BREAKS**: this issue |
| `tests/consumer-integration.test.ts` L198 (`consumer-guard.yml` → `npm run test:consumer`) | asserts `.kiro/steering` exists after bare `init` | **BREAKS**: **Consumer Guard is also RED at `4b87fe7c`**, run https://github.com/3fn/DesignerPunk/actions/runs/36948454994. "init produces a working project" fails, 1 of 31. Bare `init` emits `defaultTarget: cc` (`canonical/consumer-profile.yaml`), so `.kiro/steering` is never written. This is the same 119-A invariant asserted by mechanism. **The file is inside Task 16's Primary Artifacts (16.6), so it is Lina's, not this grant's.** The correct test asserts the selected target's identity members. The steward's filing asks the orchestrator to send Lina an explicit message (finding-routing form: a named-agent message, never only this file). |
| relocation gate legs A1/A2, identity axis | the repo's own `.kiro/sync-manifest.json`, `.kiro/agents/*.json`, `.kiro/steering/` | Unaffected: repo surfaces that Spec 123 does not move |
| `scripts/pack-assert.ts` | the packed `files[]` | Consistent: a Task 16.3 artifact, already updated (L249–250, `.kiro/agents/` absent). **Not CI-wired** (no workflow or test invokes it), so it is by-hand evidence, not a standing check |
| `scripts/floor-closure.ts` + `scripts/__tests__/floor-closure.test.ts` (`test:scripts`) | `package.json` `dependencies` only | Unaffected; green |
| `scripts/check-package-name-drift.js` (`package-name-drift.yml`), `SCAN_DIRS` `.kiro/agents` / `.kiro/steering` | repo directories | Unaffected; green. Task 17 owns `SCAN_DIRS` |
| `application-mcp-server/src/__tests__/mcpDataRootsDeclaration.test.ts` | `src/cli/shared/{mcpDataRoots,bornRepo}` | Not a Task 16 surface; green |
| `mcp-server/src/{legacy-path,id-guard,tools,query,indexer,watcher,models}/**` | `.kiro/steering/…` as the legacy-path keyspace or the on-disk identity corpus | Unaffected: repo-side; green |
| `application-mcp-server/.../FamilyGuidanceIndexer.test.ts` | fixture companion paths | Unaffected |
| `consumer-guard.yml` `check:id-uniqueness`; `section-citations.yml`; `scripts/check-section-citations.ts`, `check-id-uniqueness.ts`, `validate-steering-metadata.js`, `generate-legacy-path-manifest.ts` | the repo corpus across `governance/` and `.kiro/steering/` | Unaffected; green |
| `scripts/*.sh` governance tooling (governance-check, detect-affected-steering-docs, verify-prompt-alignment, scan-cross-references, analyze-metadata, extract-doc-structure, calculate-baseline-metrics, find-duplicate-content, consolidate-structure-maps, validate-cross-reference-format) | the repo's `.kiro/steering` / `.kiro/agents` | Unaffected; none are required CI |
| `scripts/build-tool-manifest.ts`, `scripts/completion-claims/**` | path strings in comments and fixtures | No reader |
| `agent-generator.yml`, `tool-boot-smoke.yml`, `lane-functional-root` (incl. `test:scripts`, `test:agent-generator`), `lane-application-mcp-server-suite` | — | All green at `4b87fe7c` |

**The sweep found two standing reds at `4b87fe7c`, and only two**: this gate, and Consumer Guard L198.

---

## Known-red window

- The unit branch's **`lane-mcp-server-suite` is red from `4b87fe7c` until this issue's fixing PR merges into `task/123-u2b-profile`.** Every unit-branch dispatch in that window shows this red, and it is this issue.
- The unit branch's **Consumer Guard is also red from `4b87fe7c`**. That red has a **different owner (Lina, 16.6's file) and is not covered by this grant.** One fix does not clear the other.

## Grant

**Grant paths**: `mcp-server/src/relocation-integrity-gate/relocation-integrity-gate.ts`, `mcp-server/src/relocation-integrity-gate/__tests__/relocation-integrity-gate.test.ts`

- The grant holds on the fixing PR's branch only. It is activated by Peter's merge of a PR whose body names this issue and this path list, and it expires when that PR merges (`.kiro/issues/README.md` rule 8).
- It confers no ratification authority, and it touches no governance-law path.
- The fixing PR is a `chore/` PR **into U2b's unit branch `task/123-u2b-profile`**, never into `main`. Its body cites this path list.
- The source edit covers legs A4 and A7, their header comments, and the file's top-of-file doc block, nothing else. Legs A1/A2/A3/A5/A6 and the reference, identity, family-guidance and scope axes are untouched.

## Fork left for Peter (not decided here)

**Rewrite** (this issue) or **retire** legs A4/A7, the way leg A2 was retired. A2 handed its duty to the generation-era checks once the cutover ledger covered every seat.

- **Retire.** Once 16.6's packed-install block asserts that every identity member is emitted, per target, from the packed install, and that block runs in Consumer Guard, legs A4/A7 duplicate a behavioral check with a source-shape check. That duplication is what keeps producing collisions.
- **Keep.** The rewritten legs are a fast early warning in the mcp-server lane (seconds, not a ~75 s pack), and they are 119-A's named exit gate.
- **The rewrite is needed either way.** The retirement condition does not exist yet.

## Standards implication (rule named, not drafted)

**A spec that changes the install or packaging shape** (`init` outputs, `files[]`, the `sync` managed or legacy roots, MCP-config emission) **should, at its tasks round, sweep the standing checks that run outside the root `npm test`** (the non-root lanes in `lane-timing.yml`, `consumer-guard.yml`, and the other required workflows) for readers of the surfaces it changes. **Each hit is listed in the affected parent's Instruments block** with a disposition: either it moves with the parent as a Primary Artifact, or it is granted.

- **Where it would live**:
  - Process-Spec-Planning § "Tasks Document Format", as the tasks-round obligation.
  - Carried by the Instruments block (Completion Documentation Guide § "The instruments line and block"; Start Up Tasks #8), where an unswept gate would be a `misfit` row found later.
- **Evidence**: two collisions of this same gate with Spec 123 (Task 5.4, Task 16.3), plus Consumer Guard L198 in the same commit.
- **Status**: a recommendation for Thurgood's authorship through the normal review round. No law text is drafted here.

---

## 2026-10-01 — Peter's ruling — RETIRE

**The ruling, verbatim** (Peter, 2026-10-01, relayed by the orchestrator): **"Retire the relocation-gate checks; Thurgood refreshes the lock in Task 18."** This section records the first half. The second half is recorded in `.kiro/issues/2026-10-01-task-18-lock-refresh.md`.

It settles the fork left above ("Fork left for Peter"): legs A4 and A7 are **retired**, not kept. The rewrite (#249) stays in place until the retiring PR merges.

All reads below are read-only, on `task/123-u2b-profile` at `24a00821`. They were done on 2026-10-01.

### (a) Has the retirement condition been met? Yes

The condition was that 16.6's packed-install block asserts that every identity member is emitted, per target, from the packed install, and that the block runs in Consumer Guard. Both hold:

- **The block exists.** `tests/consumer-integration.test.ts`, describe `Spec 123 Task 16.6 — the packed install emits a working agent layer (C2)`. Per target in the packed profile (`cc`, `kiro`), it packs, installs the tarball into a fresh consumer, and runs `init --target=<t>`. Then:
  - `the emitted agent-layer file set equals the guarded rendering (sidecars and root stripped), byte-equal, with nothing from the other target` is an exact-set, byte-equal comparison against `canonical/_consumer-output/<t>/`. That rendering holds the eight identity members per target (`.claude/identity/designerpunk-*.md`, or `.kiro/steering/designerpunk-*.md`).
  - `CC: the CLAUDE.md managed region imports each identity member, and every import resolves except the (absent) personal note` checks that the CC imports are set-equal to `.claude/identity/*`.
  - `the personal note is ABSENT in both installs until U3 (Task 22; C19 degradation) — asserted, never skipped`.
- **It has teeth for a missing identity doc.** `emitConsumer` reads each identity doc `packageRoot`-relative and **degrades** on a missing one, emitting no member file (`tools/agent-generator/consumer-entry.ts`, the identity-members step). A doc dropped from `files[]` therefore drops a file from the emitted set, and the exact-set comparison goes red.
- **It runs in Consumer Guard, and was green there.** `consumer-guard.yml` → `npm run test:consumer`. The run is https://github.com/3fn/DesignerPunk/actions/runs/36952843725 (`Consumer Guard`, head `56c5cd7e`, `completed success`; read once with `gh run view`, and cited as the CI-provenance in `completion/task-16-completion.md`). 16.6's own evidence is `completion/task-16-6-completion.md`, items 2 and 4.

### (b) What covers each retired sub-check now

The lanes:

- **root** means `npm test` (`jest.functional.config.js`, roots `src/` …). It is the required `Lane Timing / lane-functional-root`.
- **CG** means Consumer Guard (`consumer-guard.yml` → `npm run test:consumer` or `test:smoke:mcp-boot`).

| Leg | Sub-check (as the rewritten gate asserts it) | Standing check that covers it now | Lane | Verdict |
|---|---|---|---|---|
| A4.1 | `init` copies no package corpus (no `governance` / `.kiro/steering` / `.kiro/agents` literal in comment-stripped `init.ts`) | `src/cli/__tests__/init.test.ts`: "creates all expected artifacts, and does NOT copy src/types or src/components/core" (no `governance/`, no `.kiro/steering`); "the release-1 copy rows are gone: no governance/ copy, no personal-note.md, no copy-origin entry — for either target". `tests/consumer-integration.test.ts`: "init produces a working project" (packed: no `governance`, `.kiro/steering`, `.kiro/agents`); 16.6 "the emitted agent-layer file set equals the guarded rendering…" (an extra copied file under `.kiro/agents` / `.kiro/steering` breaks the exact set) | root + CG | **COVERED**, by output rather than by source shape. This is stronger: it catches a copy however it is spelled |
| A4.2 | `init` calls `emitAgentLayer(` | `init.test.ts`: "init --target=%s emits exactly the lane's file set for that target, every file recorded origin "generated" with its on-disk hash"; CG 16.6 "the emitted agent-layer file set equals the guarded rendering…" | root + CG | **COVERED** by behavior. The literal call is not asserted; the delivered layer is |
| A4.3 | `designerpunk.ts` spawns the docs MCP at `path.join(pkgRoot, 'governance')` | CG "Docs MCP returns documentation data" runs `npx designerpunk mcp:docs` in the packed install, but asserts only `expect(result).toBeDefined()` on `get_index_health`, which passes whatever directory is indexed. `tests/mcp-boot-smoke.test.ts` "docs-mcp serves a NON-EMPTY index from the package fallback" does assert `documentsIndexed > 0`, but it boots `dist/mcp/docs-mcp.js` directly with the env stripped (the `mcpDataRoots` fallback), so it **bypasses `designerpunk.ts`** | — | **NOT COVERED IN CI** (residual R1) |
| A4.4 | `designerpunk.ts` has no `path.join(pkgRoot, '.kiro/steering')` spawn | Same as A4.3. A steering spawn would index the eight identity docs and still answer `get_index_health` | — | **NOT COVERED IN CI** (residual R1) |
| A7.1 | `files[]` contains `governance/` | CG 16.6 "Kiro: every agent resource resolves in the packed install — node_modules/@3fn/core paths, …" (the Kiro resources under `node_modules/@3fn/core/governance/` must exist). `emitConsumer` also reads ambient embeds from `packageRoot/governance` and throws without it, so every 16.6 case goes red | CG | **COVERED** |
| A7.2a | Each of the eight identity docs is in `files[]` by explicit path and exists on disk | CG 16.6 exact-set / byte-equal vs the guarded rendering, plus the CC import set (see (a): a missing doc degrades to a missing member file) | CG | **COVERED** |
| A7.2b | …and **exactly** those eight: no other `.kiro/steering…` entry | Nothing in CI. Emission reads identity docs by id, so an extra shipped steering doc changes no emitted file. `scripts/pack-assert.ts` § 9 asserts it ("the packed set under .kiro/steering/ equals exactly the … identity docs"), but **no workflow, package script or test runs `pack-assert.ts`** (sweep (e) above) | — | **NOT COVERED IN CI** (residual R2) |
| A7.3 | No `.kiro/steering` directory glob and no `.kiro/steering/personal-note.md` in `files[]` | Nothing in CI. `init.test.ts`'s `.kiro/steering/personal-note.md` check reads the **consumer** tree, not the package. CG 16.6's personal-note case reads `.designerpunk/personal-note.local.md`. `pack-assert.ts` L263 asserts it but runs nowhere | — | **NOT COVERED IN CI** (residual R2) |
| A7.4a | The MCP config template points `MCP_STEERING_DIR` at `governance` and names no `.kiro/steering` | Nothing in CI. `init.test.ts`'s MCP-config cases assert `COMPONENTS_DIR` and `PRODUCT_DIR` from the same template, but not `MCP_STEERING_DIR`. `sync`'s `SteeringDirCheck` would warn on a stale value in a consumer config, but no test runs `init` → `sync` and asserts that the warning is absent | — | **NOT COVERED IN CI** (residual R3) |
| A7.4b | The template has no dead tool (`get_documentation_map`) | `init.test.ts`: "Kiro: each server's autoApprove is SET-EQUAL to the manifest's readOnlyHint:true set…" and "Claude Code: .claude/settings.json permissions.allow is SET-EQUAL…". CG 16.6 "the MCP config and approval keys are present and recorded in the manifest". Approvals are computed from the tool manifest, not taken from the template | root + CG | **COVERED** |
| A7.5 | `COPY_ROOTS` holds the release-1 roots (`governance`, `.kiro/steering`) | `src/cli/__tests__/sync.cohort.test.ts`: "COPY_ROOTS keeps the release-1 roots it recognizes (the 119-A gate pins this literal)", which pins the exact literal, plus the cohort behavior tests in the same file | root | **COVERED**. That test's name still cites the 119-A gate; after retirement it *is* the pin. A cosmetic relabel is Lina's call and is not required |

**So retirement drops 6 of the 11 sub-checks with no loss.** It loses 5, which fall into three residuals: R1 (A4.3 and A4.4), R2 (A7.2b and A7.3) and R3 (A7.4a).

### (c) What retirement means, and the residuals

**How A2 was "retired", stated exactly** (my earlier wording above, "the way leg A2 was retired", was loose):

- A2 was **not removed**. At Spec 122's first cutover (Ada, PR #55, commit `c995ffc9`), its per-config floor was rescoped to configs outside the cutover ledger. A dated in-code comment named the successor checks (`122-sweep-1-refs` + `122-canonical-vs-truth`) and the condition under which its duty is "fully handed" (the ledger covers every seat).
- The leg stayed in the coupling array, the count stayed 7, and its stray-relocating scan stayed live.
- **The record was the in-code comment plus the cutover PR.** No 119-A spec artifact was edited, and there was no issue or ballot.

**What the retirement keeps from A2's form, and where it departs:**

- **Kept**:
  - The record is dated, in code, at the gate's header and at the former leg sites, and names the successor check for each sub-check (the table above).
  - No closed 119-A artifact is edited. 119-A `tasks.md` L613 ("7/7 must-fix couplings") and `completion/task-11-parent-completion.md` ("7/7 remediated") are point-in-time records and stay as written, the same convention as README rule 3. **Req 8 AC7's own text names no count.** The "7" lives only in the gate's test (`expect(checks.length).toBe(7)`, `expect(result.summary.couplingsTotal).toBe(7)`, and the test name "remediates all 7 must-fix coupling surfaces (Req 8 AC7)").
- **Departed**: A4 and A7 are **removed** from `assertMustFixCouplings`, and the count becomes **5**.
  - A2 could stay in the count because it kept a live sub-check. A4 and A7 keep none under a "retire" ruling.
  - Leaving them in the array as legs that always report `remediated: true` would be a vacuous green, the same defect #249 closed in `initKeepsSteering`.
  - The surviving counter-argument is that 119-A's exit gate then no longer enumerates all of Bucket A in its own output, so a reader of the gate alone sees 5 surfaces where 119-A named 7. The header record is the mitigation. It is not a full answer.

**Residuals.** The ruling stands either way. Each one is put to Peter as a decision:

- **R1: `designerpunk mcp:docs` serves `governance/`, never `.kiro/steering`** (A4.3/A4.4).
  - **Move**: strengthen CG's "Docs MCP returns documentation data" in `tests/consumer-integration.test.ts` to assert the server's `Data:` stderr line ends in `/governance` and that `get_index_health`'s `metrics.documentsIndexed` is greater than 0 (the same pair `mcp-boot-smoke` uses for the fallback path). **Owner: Lina.** The file is a Task 16 Primary Artifact (16.6), and Task 16 is done on the branch, so this needs her row or its own grant.
  - **Accept**: record the loss. The exposure is one CLI launch path: the `init`-emitted MCP configs launch `dist/mcp/docs-mcp.js` with the template's env and do not go through `designerpunk.ts`.
- **R2: the package ships exactly the eight identity docs, and never `personal-note.md`** (A7.2b/A7.3).
  - **Move (preferred)**: one case in `tests/consumer-integration.test.ts` that lists the outer `tempDir`'s installed `node_modules/@3fn/core/.kiro/steering/` and asserts it is set-equal to the eight, with no `personal-note.md`. The tarball is already packed and installed in that file's `beforeAll`, so this costs seconds. **Owner: Lina**, with the same route as R1.
  - **Move (alternative)**: wire `scripts/pack-assert.ts` into CI. **Owner: Ada** (Task 3 PRIMARY; Lina extended it at 16.3). It is not a `package.json` test script, so it falls outside my standing `lane-timing.yml` scope and would need a § 3 issue-row grant. It also brings every other C5 assertion into a required lane, which is wider than this residual and not vetted for that lane.
  - **Accept**: I recommend against accepting this one, and I say so bluntly. A restored `.kiro/steering/` glob ships Peter's own personal note to every consumer on the next publish (the 119-A leak that Spec 123 closed by ruling, C5 / Req 12.1a), and every remaining CI check stays green while it does.
- **R3: the MCP config template points `MCP_STEERING_DIR` at `governance`** (A7.4a).
  - **Move**: add `expect(config.mcpServers['designerpunk-docs'].env.MCP_STEERING_DIR).toBe('./node_modules/@3fn/core/governance')` to the existing Kiro and CC MCP-config cases in `src/cli/__tests__/init.test.ts` (root lane). **Owner: Lina** (16.3's file).
  - **Accept**: record the loss. `sync`'s `SteeringDirCheck` would warn consumers after the fact, but nothing would stop the shipping.

**Sequencing.** For any residual Peter rules **move**, the moving PR merges into `task/123-u2b-profile` **before** the retiring PR, so there is no window with neither check. For any residual he rules **accept**, the retiring PR's body quotes that ruling. His answer is appended here (dated) before the retiring PR opens.

### Grant extension (dated 2026-10-01)

The grant above expired when #249 merged (README rule 8). This extension re-grants the same two paths, for the retirement only.

**Grant paths**: `mcp-server/src/relocation-integrity-gate/relocation-integrity-gate.ts`, `mcp-server/src/relocation-integrity-gate/__tests__/relocation-integrity-gate.test.ts`

- **Owner**: Thurgood.
- **Rule 8**: the grant is on the fixing PR's branch only, until that PR merges. It is activated by Peter's merge of a PR whose body names this extension and this path list. The fixing PR is diffed against this list as it stood at that merge. It confers no ratification authority and touches no governance-law path. An out-of-list edit is a claims-pass finding.
- **Fixing PR**: branch `chore/relocation-gate-retire-a4-a7`, cut from `task/123-u2b-profile`, **with base `task/123-u2b-profile`**, never `main` (the retirement is only true on U2b's shape). Its body cites this path list and quotes Peter's ruling on R1–R3.
- **Trigger**: **before U2b's unit PR opens** (Task 18.3), and after any residual-moving PR (see Sequencing).
- **Extent**:
  - Remove legs A4 and A7 from `assertMustFixCouplings`, together with their dated comments.
  - Remove `stripComments`, which nothing else uses once both legs are gone. `identityIdToFile` stays, because the identity axis uses it; its doc comment drops "AND leg A7".
  - Rewrite the header's item 3 and the function's doc comment to say that legs A4/A7 were retired on 2026-10-01 by Peter's ruling, naming this issue, and that their surfaces are discharged by the checks in (b), named per sub-check, with any residual and Peter's ruling on it.
  - Legs A1/A2/A3/A5/A6 and the reference, identity, family-guidance and scope axes are **untouched**.
- **What the fixing PR must show**:
  1. The mcp-server lane is green on the fixing branch: `Lane Timing / lane-mcp-server-suite`, plus a local `cd mcp-server && npx jest src/relocation-integrity-gate` with its suite and test counts.
  2. The retired legs' tests are removed: the describe `assertMustFixCouplings — legs A4/A7 assert the Spec 123 install shape (fixture-tree bites)`, including its `stripComments` case. The two count assertions become 5 (`checks.length`, `summary.couplingsTotal`), and the live test is renamed to say 5 standing surfaces, with A4/A7 retired on 2026-10-01. **`git diff` shows no hunk inside the A1/A2/A3/A5/A6 blocks or the other axes, in either file.**
  3. **The 119-A exit-gate statement is updated in the gate's header**, saying that the gate remains 119-A's exit check over the surviving must-fix surfaces and that A4/A7's duty is handed to the named checks.
  4. `scripts/relocation-integrity-gate.ts` needs no edit (it prints `couplingsRemediated/couplingsTotal`, which does not depend on the count). This is checked and stated in the PR, not assumed.
  5. **`canonical/generated.lock` is not in this PR.** `mcp-server/src` is a closure root of the diff-guard, so merging this PR moves the lock's `inputClosure` (outputs unchanged). #249 showed the same thing: its merge was followed by `4fab4ca9`, "generated.lock refresh after merging the gate fix (#249)". The refresh after this merge is made on the unit branch by whichever grant holds at that time:
     - **17.3's single refresh** (Task 17's Primary Artifacts), if this PR merges before 17.3;
     - **`.kiro/issues/2026-10-01-task-18-lock-refresh.md`**, if it merges after Task 17 closes.
     - Between 17.3 and Task 17's close, the merge waits, because Task 17 requires that its close-time re-run produce no lock diff.
- **Closing**: unchanged from § (d) above. When U2b's unit PR merges to `main`, the outcome is recorded here (dated) and the file moves to `archive/`.
