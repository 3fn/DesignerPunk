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
