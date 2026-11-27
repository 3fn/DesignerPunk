# MCP build provenance: each in-repo server reports when its build is older than its source

**Date**: 2026-11-27
**Owners**: **Thurgood** (this contract, § 1–§ 6; the docs-MCP half, `mcp-server/src/**`; the § 7 routing item) and **Lina** (the application-MCP half, `application-mcp-server/**`, her § 8 when she writes it). **Ada** is consulted on the docs MCP's launch contract (`mcp-server/package.json`, `tsconfig.json`) and writes the § 4 build-script change if she agrees to it.
**Trigger**: `release:next:phase-1` — the next release's S. Both halves owe their fixing PRs by then; the record closes under rule 5 when both have merged and § 7 has been answered.
**Class**: P2 obligation (guard) · defect — `get_index_health` and `get_component_health` said `healthy` for six weeks while both servers ran 2026-10-17 builds, so the health instrument was weaker than its claim. No served answer was false in the P0 sense: the stale builds served their own (older) behaviour correctly.
**Ruled**: Peter, 2026-11-27T16:02:35Z: "Let's Do the rebuild and apply the class fix, please." (relayed in the orchestrator's brief to Thurgood, 2026-11-27). The class fix is the class option of the 2026-11-27 Civitas health check, finding H-1.
**Consulted**: Thurgood (proposer, H-1). Lina and Ada: questions sent 2026-11-27; their answers are appended here before the PR leaves draft.

---

## 0. The finding (H-1, 2026-11-27 health check)

In the main checkout, `mcp-server/dist/index.js` and `application-mcp-server/dist/index.js` were both written 2026-10-17T14:17 local time. Merges #405 and #411 (docs) and #608, #613, #659, #660 and #827 (application) came after those builds, so agents in this repository were served without them. Both health tools said `healthy`, because `healthy` measures the index against the docs, never the build against the source. Peter rebuilt both on 2026-11-27 at `8553499b1` (the orchestrator ran `npm run build` in each). The rebuild fixes this instance. This record fixes the class: a build that has fallen behind its source must say so.

## 1. Scope

| Server | What runs in this repository | In scope |
|---|---|---|
| Docs MCP | `mcp-server/dist/index.js` (the sub-package's own `tsc` build) | **Yes**: Thurgood, this PR |
| Application MCP | `application-mcp-server/dist/index.js` (the sub-package's own `tsc` build) | **Yes**: Lina, her own PR after her consult |
| Product MCP | `dist/mcp/product-mcp.js` (an esbuild bundle made by the root `npm run build`) | **No, not in this fix.** See § 7 |

The esbuild bundles of the docs and application servers (`dist/mcp/docs-mcp.js`, `dist/mcp/application-mcp.js`) are what a consumer runs. Nothing in this repository launches them. They report `not-applicable` (§ 3).

## 2. What the build writes

After `tsc`, the build runs `node dist/build-provenance/write-build-info.js` (docs MCP; the application MCP names its own path). That writes **`dist/build-info.json`**:

```json
{
  "schema": 1,
  "server": "@designerpunk/mcp-documentation-server",
  "sourceHash": "sha256:<64 hex>",
  "sourceFiles": 53,
  "sourceCommit": "<git rev-parse HEAD>",
  "sourceDirty": false,
  "builtAt": "2026-11-27T16:11:51.145Z"
}
```

- `server` is the sub-package's `package.json` name.
- **`sourceHash` is the only field the runtime decision reads.** It is a SHA-256 over the **source set**, which is:
  - the package's `tsconfig.json`, and
  - every file under `src/` whose extension is `.ts`, `.tsx` or `.json`,
  - except files under a `__tests__` directory and files ending `.test.ts`. Tests never run in the served process, so a test-only change does not make a build stale.

  The paths are relative to the package directory, POSIX-separated and sorted. For each, the hash takes the line `<path>\0<sha256 hex of the file's bytes>\n`.
- `sourceCommit` and `sourceDirty` are for a person reading the record. They come from `git rev-parse HEAD` and `git status --porcelain -- <the source set>` at build time. They are `null` when git is not available. The runtime never runs git.

## 3. How the runtime decides

At every health read (`get_index_health` and `rebuild_index` for docs; `get_component_health` and `rebuild_index` for application), the server makes the decision again. The process holds its code from start-up, so source that changes mid-session (a `git pull`) is seen at the next read.

1. **The applicability gate.** Let `distDir` be the directory of the entry module (`__dirname` in `index.ts`) and `packageDir` its parent. The check applies only if `packageDir/package.json` exists with this sub-package's `name` **and** `packageDir/src/` is a directory, **and** the entry module is not a `.ts` file. Otherwise the state is **`not-applicable`**, and the reason says which condition failed:
   - **Consumer install / packaged bundle**: the bundle lives at `<pkg>/dist/mcp/`. Its parent `<pkg>/dist/` has no `package.json`, so the gate fails. In this repository the same holds for the root `dist/mcp/` bundles.
   - **No `src/`**: the gate fails.
   - **Running from TypeScript source** (`npm run dev`, `ts-node src/index.ts`): there is no build, so the gate fails.
2. If the gate passes, hash the source set as it is now, and read `distDir/build-info.json`.
   - **Missing**, not JSON, `schema` other than 1, `server` other than this package's name, or no `sha256:` hash: **`unrecorded`**.
   - Recorded hash **equals** the current hash: **`fresh`**.
   - Recorded hash **differs**: **`stale`**.
3. An unexpected error inside the check is reported as `unrecorded`, with the error in the reason. The check never throws.

**The special cases the brief asked about:**

- **Uncommitted source.** The hash is over the working tree, not a commit. A build made from uncommitted source is `fresh` until the source changes again. The record carries `sourceDirty: true`, and the stale warning says "with uncommitted source".
- **No `.git`.** The decision does not use git, so nothing changes; `sourceCommit` and `sourceDirty` are `null`.
- **No `src/`** (a consumer install): `not-applicable` (gate).
- **Touched mtimes.** A checkout that rewrites a file with the same content keeps the hash, so it does not go stale. That is why the decision hashes content and does not compare mtimes.
- **Source older than the build** (checking out an older commit after building): the hashes differ, so the state is `stale`. "Older than source" names the common case; the test is "built from other source".
- **A build whose `tsc` failed.** `tsc` writes output even on type errors and exits non-zero. The `&&` chain then stops before the build-info step, so the old record stays, or none exists. The result is `stale` or `unrecorded`, never a false `fresh`.

## 4. Which health surface reports it, and the exact strings

- **Docs MCP**: `get_index_health` (and `rebuild_index`, which returns the same shape) carry `health.build`:
  ```json
  { "state": "fresh | stale | unrecorded | not-applicable", "reason": "<one sentence>", "distDir": "<abs path>",
    "recorded": { "sourceHash", "sourceFiles", "sourceCommit", "sourceDirty", "builtAt" },
    "current": { "sourceHash", "sourceFiles" } }
  ```
  `recorded` and `current` are present when they were read. The field is present whenever the server was started as a process. It is absent only when the server class is constructed in-process without a `distDir` (tests).
- **Application MCP**: `get_component_health` carries the same `build` object. That is Lina's to confirm (consult Q1).
- **The status and the warning.** `stale` and `unrecorded` each add one warning, and that moves `healthy` to `degraded`. A `failed` status stays `failed`. `fresh` and `not-applicable` add nothing. The warnings begin with fixed prefixes, which a reader matches on:
  - **`build older than source: `** then `built <builtAt> from commit <9-char sha | unknown>[ with uncommitted source]; the source has changed since the build was made — run \`npm run build\` in <package dir>/, then restart the server`
  - **`build provenance unrecorded: `** then the reason, then the same remedy.

  So the report reads `status: "degraded"` with a warning beginning `build older than source`. That is the `degraded: build older than source` the class option named.
- **Start-up**: the server also logs one stderr line, `[MCP Server] Build provenance: <state> — <reason>`.
- **`rebuild_index` does not clear `stale`.** It re-reads the docs, not the code. The remedy is a build and a restart.

**The build step (Ada, consult).** Without it, every build is `unrecorded` and every in-repo health read is `degraded`. **So the runtime half must not merge without the build step.** The proposed `mcp-server/package.json` `build` script:

```json
"build": "node -e \"require('fs').rmSync('dist',{recursive:true,force:true})\" && tsc && node dist/build-provenance/write-build-info.js"
```

## 5. The stale-output half (orphaned `dist` files)

`tsc` does not delete output whose source was removed. In the main checkout, `mcp-server/dist/tools/get-documentation-map.js` (with its `.d.ts` and maps) is left over from `74c860e8b` (2026-06-23, Spec 121 Task 3, which removed the tool). The only file that references it is an equally orphaned compiled test, `dist/tools/__tests__/get-documentation-map.test.js`. Jest's roots are `src` and `tests`, so that test never runs, and `index.ts` never imports the orphan. It is harmless today.

The source-hash check cannot see orphans, because it hashes `src/`, not `dist/`. But a `fresh` record claims that `dist` was built from the current source, and with orphans present that claim is false for part of the directory. **So a clean build is part of the fix**: the `rmSync` in § 4's script. Whether to take it is **Ada's** call, since `package.json` is hers (consult Q2). The alternative is to have the writer list orphans into the record and the runtime report them. That costs more code and gives a weaker result, so I do not recommend it.

Surviving counter-argument to the clean step: for the length of the build, `dist/` is empty. A server restarted during that window, or a reader of `mcp-server/dist/index.d.ts` during it (root jest workers type-resolve it; `tools/agent-generator/__tests__/consumer-entry.paths.test.ts` names that hazard), finds nothing. In CI the build runs before the tests. In the main checkout, running servers already hold their code. So the window is real but narrow.

## 6. Shared helper or one copy per server

**Each server implements its own copy.** A shared helper is barred. `.kiro/issues/2026-10-13-mcp-shared-code-class-charter.md` § 4 rule 1 says no new module or data file is consumed across an MCP sub-package boundary, by any pattern, until the class spec's ballot names the sanctioned crossing patterns (Ada confirmed this reading in § 9 there, 2026-10-23). A helper in the root `src/cli/shared/` would also be barred, because the root build ↔ sub-package boundary is in that class (§ 8 there).

**This contract is what binds the two copies.** The strings, states, field names, file name and schema in § 2–§ 4 are the shared part. The source walk and the hash are each server's own, because each compares only with its own record. The two copies are a new member of the shared-code class, added to that charter's § 2 table in this PR. Trigger 1 there had already fired (2026-10-23), so this adds a member to the owed spec. It does not fire the trigger a second time.

The guard, if Lina wants one (consult Q3): a test in her suite loads `mcp-server/src/build-provenance/BuildProvenance.ts` with an untyped `require` (the bound-twin guard pattern, charter § 1 and § 8). It asserts that her exported prefixes, state names, file name and schema number equal the docs module's. A guard is not a shipped consumer (charter § 8).

## 7. Open: the product MCP (routing owed by Thurgood)

The product MCP runs in this repository as `dist/mcp/product-mcp.js`, a bundle the root `npm run build` makes. Its build was 2026-11-08 at the 2026-11-27 walk. The contract does not fit it as written, for three reasons:
- **No package manifest beside the bundle.** The `dist/mcp/` directory holds three bundles and no package manifest, so it would need a per-bundle record (`dist/mcp/product-mcp.build-info.json`).
- **Inlined root code.** The bundle inlines `src/cli/shared/*` from the root build, so its source set spans two trees.
- **No owner.** No charter's standing scope names `product-mcp-server/**`.

It serves an empty product set here (no `product/` directory), so the cost of a stale product build in this repository is low. The armed `125B-tool-boot-smoke` check boots it in CI. **Owed by Thurgood**: put the product half's owner and form to Peter with the next options batch (the next health walk at the latest). Ada is consulted on the root build (consult Q4).

## 8. Application-MCP half (Lina)

*Lina writes this section after her consult: her module path, her build step (`application-mcp-server/package.json` is hers), her fixing PR, and the answer to § 6's guard question.*

## 9. Docs-MCP half (Thurgood): what this PR ships

- `mcp-server/src/build-provenance/BuildProvenance.ts`: the source set, the hash, the four-state decision, the warning text, and `applyBuildProvenance`.
- `mcp-server/src/build-provenance/write-build-info.ts`: the build step's writer (git facts are best-effort).
- `mcp-server/src/models/BuildProvenance.ts`, plus an optional `build` field on `IndexHealth`.
- `DocumentIndexer.setBuildProvenanceProbe`: every health result goes through it.
- `MCPDocumentationServer`'s new `options.distDir`. `main()` passes `__dirname` and `__filename`.
- Tests: `mcp-server/src/build-provenance/__tests__/BuildProvenance.test.ts`.
  - **The falsification case**: a fixture package is built, its source is edited, and the real indexer must report `degraded` with one `build older than source` warning. At the merge base the suite is red, because the module does not exist, and the same health read said `healthy` whatever the build.
  - **The off-switch guard**: the real `mcp-server/` layout must pass the gate, and the root `dist/mcp/` must not.
- `mcp-server/README.md`: the `build` field under `get_index_health`.
- The tool's registered description is unchanged, because `canonical/registry/tool-registry.json` carries it verbatim.

**The off-switch counter-argument (H-1's residual).** A check that switches itself off is the kind that silently stops working. Three things answer it:
- The off state is reported visibly: `build.state: "not-applicable"`, with its reason.
- The unit guard above fails if the real layout stops passing the gate.
- A required-context assertion is proposed in Ada's consult (Q5): the `125B-tool-boot-smoke` run builds `mcp-server/dist` with `npm run build`, so after the build step lands, its smoke can assert `build.state === "fresh"` on the real tsc artifact. That smoke lives in `tests/tool-boot-smoke.test.ts`, which no charter's standing scope names.

**What stays out**: the docs server's runtime `require` of the root `dist/cli/shared/mcpDataRoots` is a second build (the root's) that this check does not cover. Those requires are grandfathered in the shared-code charter § 4 rule 2, and that charter's spec decides them.
