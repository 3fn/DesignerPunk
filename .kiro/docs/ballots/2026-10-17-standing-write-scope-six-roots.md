# Ballot Measure: Standing write scope for six roots no charter owns

**Date**: 2026-10-17
**Drafted by**: Thurgood (Civitas steward), at Peter's direction, after a three-seat consult with a cross-read (ledger, § 8).
**Status**: **DRAFT.** Nothing here is law until Peter ratifies it (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"). **One fork is open (§ 4, F-1). It waits for Peter's answer; there is no default.** This follows Peter's RL-14 rule: a ballot that carries a fork states it and waits, and is never "adopted unless amended".
**Origin**: the 2026-10-17 health check's findings W-5, W-6 and W-7 (`.kiro/docs/civitas-health-checks/2026-10-17.md` § 6), and the issue `.kiro/issues/2026-10-02-issues-dir-write-scope-gap-and-grant-advisories.md`, whose trigger fired at that walk.
**Required reviewer**: **Stacy**, with the mandate to **attack the width.** She audits the extent afterwards, so her incentive runs toward narrow (the precedent of ballot `2026-09-27-ci-regime-standing-scope`).
**Unit**: a standalone record-first ballot. It edits charters (`canonical/agents/**`) and `.kiro/issues/README.md`, so **Peter merges it** under the governance carve-out.

> ## ⚠️ CONFLICT OF INTEREST — stated first
>
> **The author widens his own charter more than anyone else's.** Under this ballot Thurgood gains `mcp-server/src/**`, `.kiro/hooks/` files, about thirty `scripts/` files, `.kiro/issues/**`, and (under F-1 option A) all of `tools/agent-generator/**`. The conditions of the 2026-09-27 precedent apply:
> - this disclosure;
> - every path is enumerated (no umbrellas except where a root is owned whole), each with a named recurring task;
> - every element the author adds beyond the consulted map is flagged **[author's addition — Peter rules]**;
> - Stacy attacks the width.
>
> **A second conflict, named by Lina and binding on both F-1 options**: whoever owns the generator's emitters owns the tool that writes every seat's charter, the owner's own included. § 3's guard exists for that conflict, and it is identical under both options.

---

## 1. The gap

Six roots are written by de facto owners, but no charter lists them:
- `tools/agent-generator/**`
- `mcp-server/src/**`
- `scripts/**`
- `src/cli/**`
- `.kiro/hooks/**`
- `.kiro/issues/**`

Today every edit to them rides a per-PR grant (README rule 8) or recorded practice. The cost is recurring:
- the 16.0.0 and 15.x releases each needed lock-refresh and files grants;
- #389 surfaced the generator gap;
- the docs-MCP logs-dir defect has had no fix owner since 2026-10-02 (W-7);
- every seat's charter states a scope that practice contradicts. An agent reading its own charter concludes it may not write where its own records live.

Grants stay right for one-off work. These are **standing** surfaces with standing owners, which is the case the 2026-09-26 ruling reserved for a charter change ("permanent scope for permanent work").

## 2. The map (converged across Ada, Lina and Thurgood; the fork is in § 4)

### 2.1 `src/cli/**` → **Ada**

- **Shared with Thurgood**: `src/cli/attach.ts` and the agent-layer templates `init` writes (Thurgood: Civitas and the generated agent layer).
- **Shared with Leonardo**: `templates/product/**` and the starter specs.
- **Consequence**: once ratified, the open issues that name Lina as CLI owner get a re-routing line from their record owner (README rule 9 below), never a rewrite. Known instances: `2026-10-03-generate-product-only-resolves-from-cwd.md` and `2026-10-13-generate-product-only-tip-without-product-tokens.md`.

### 2.2 `scripts/**` → split BY FILE (no seat takes the root)

Tests and fixtures follow the file they exercise: `scripts/__tests__/**`, `scripts/__fixtures__/**`, `scripts/__bites__/**`.

**Ada** (token, type and platform generation; build; packaging; release instruments):
- `generate-platform-tokens.ts`, `generate-token-types.ts`, `verify-opacity-types.ts`
- `build-browser-bundles.js`, `build-name-contract.ts`, `build-tool-manifest.ts`
- `floor-closure.ts`, `pack-assert.ts`
- `release-publish.ts`, `verify-publish-rail.sh`, `check-package-name-drift.js`
- `jest.config.js`
- **[author's addition — owners confirm at review]**: `esbuild-css-plugin.js`, `fix-tokens-css.js`, `profile-incremental-analysis.js`, `audience-banner/**` (Ada's predicate, ballot B-U4), `__bites__/**` (the publish-rail fixtures)

**Thurgood** (completion claims, discovery, governance and doc checks):
- `completion-claims/**`, `check-completion-criteria-parity.ts`
- `discovery-dry-run.ts`, `discovery-study-stage1.ts`, `discovery-indexer-fix-run.ts`
- Governance checks: `governance-check.sh`, `validate-steering-metadata.js`, `detect-stale-metadata.js`, `detect-affected-steering-docs.sh`, `verify-prompt-alignment.sh`
- Doc, metadata and citation checks: `scan-cross-references.sh`, `validate-cross-reference-format.sh`, `check-id-uniqueness.ts`, `check-section-citations.ts`, `backfill-doc-ids.ts`, `validate-metadata-parsing.js`, `validate-structure-parsing.js`, `validate-task-vocabulary.sh`, `add-metadata-to-file.sh`, `analyze-metadata.sh`, `extract-doc-structure.sh`, `find-duplicate-content.sh`
- **[author's addition — owners confirm at review]**:
  - `consolidate-structure-maps.sh`, `convert-date-formats.js`, `calculate-baseline-metrics.sh` (all steering-doc tooling)
  - `generate-legacy-path-manifest.ts`, `relocation-integrity-gate.ts` (Spec 119-A docs-MCP infra)
  - `derive-install-doc.ts` (the install doc; Thurgood owns its reference remainder, ballot B-U3)
  - `categorize-tests.ts` (test governance)

**Lina**:
- `extract-component-meta.ts`, `figma-component-generator.ts`, `audit-component-tokens.js`
- **[author's addition — owner confirms]**: `validate-examples.js` (component HTML examples)

**Unplaced**: none. Any file added later states its owner in the PR that adds it. A file nobody claims is a walk finding.

### 2.3 `mcp-server/src/**` → **Thurgood**

This is the docs MCP: indexer, query engine and matcher. **Shared with Ada**: packaging and module resolution (`mcp-server/package.json`, `tsconfig.json`, the build). **W-7** (the docs-MCP logs-dir fix) follows this root, so its fix owner is Thurgood from ratification.

### 2.4 `.kiro/hooks/**` → **Thurgood**, for the completion tooling

- **Thurgood**: `complete-task.sh` (the CI regime and completion tooling, ballot B-CI M3), `README.md`, and the legacy completion scripts (`commit-task*.sh`, `task-completion-commit.sh`, `organize-*`, `archive/**`) **[author's addition: legacy files, owned so someone can retire them]**.
- **`RELEASE-FLOW.md` stays Peter-merged law, with no seat scope.**
- **[author's addition — owners confirm]**: each seat owns its own `<seat>-*.kiro.hook` files (`ada-*`, `lina-*`, `thurgood-*`).

### 2.5 `.kiro/issues/**` → every seat, under a header-owner rule

A glob cannot say "files whose `**Owner**:` is me", so the scope is granted whole to the seats and narrowed by a README rule. The proposed **README rule 9**:

> **9. Who writes an issue file.** The seat(s) named in a record's `**Owner**:` header author and edit its body. Any seat may append a dated line signed with its name to any record (Ada: "append-for-all"); no seat rewrites another seat's lines. Thurgood, as the convention's steward, walks every record, appends walk lines, and closes and archives records under rule 5. An edit outside this rule is a claims-pass finding.

- **[author's addition — Peter rules]**: the scope goes to all eight seats. Product seats also own records today (Leonardo: the onboarding trio, the cannot-tell cells), and a system-seats-only grant would leave them on recorded practice.

### 2.6 Ada's clause (binding, verbatim intent)

**Owning a release instrument never authorizes a change to release law without a ballot.** The same holds for every seat and every instrument in this map. Owning `governance-check.sh` does not let Thurgood change what the health check is; owning `release-publish.ts` does not let Ada change RELEASE-FLOW.

## 3. The guard (identical under both F-1 options)

1. **Scope moves only by a `canonical/agents/**` edit**, Peter-merged under the carve-out, with every affected seat consulted and the consult recorded in the PR's `**Consulted**:` line. **Owning the generator never authorizes a change to any seat's write scope.**
2. **A named sweep under `122-diff-guard`** asserts that each rendered write-scope line equals its canonical `writeScope` declaration byte for byte, for every seat and every target (CC and Kiro, steward and consumer legs). **Stacy specifies its falsification fixtures**, including an emitter edit that injects one path and one that drops one; both must red. It is built after ratification by the F-1 owner of `sweeps/**` (Thurgood under both options), and registered `proposed` until the fixtures pass on the CI path.
3. **Disclosure**: any PR that moves the `outputs` hash in `canonical/generated.lock` says so in its body, with the before and after hashes.

**Why the existing pieces are not enough**:
- `diff-guard` proves the outputs equal what the generator renders from canonical. It does not prove the generator renders write scope faithfully.
- `canonical-vs-truth` reads canonical claims, not rendering.
- The carve-out puts every `.claude/agents/**` change in front of Peter, but finding one changed scope line in a large regenerated diff relies on attention. The sweep makes it mechanical.

## 4. Fork F-1: `tools/agent-generator/**` — Peter picks; no default

**Option A: Thurgood primary on all of `tools/agent-generator/**`; Lina secondary on consumer-lane code.**
- **Thurgood**: everything, emitters included.
- **Lina, secondary** (consulted, may author under a `tasks.md` row): the consumer-lane code. That is `consumer-entry.ts`, `consumer-profile.ts`, the consumer legs of `adapters/**`, and `regrounding/**`'s consumer overlays.
- **For**: one owner means fewer seams; the conflict is handled by § 3.
- **Against**: verifier and renderer are the same seat. § 3 makes rendering checkable, but the person who writes the check also writes what it checks.

**Option B: split, so the verifier is not the renderer.**
- **Thurgood (checkers and sweeps)**: `diff-guard.ts`, `canonical-vs-truth.ts`, `coverage-map.ts`, `sweeps/**`, `verify-gate-registration.sh`, `workflow-rules-guard.ts`, `child-process-guard.ts`, and the signing-chain verification in `regrounding/**`.
- **Lina (rendering, adapters, emitters)**: `render.ts`, `adapters/**`, `compose.ts`, `derive.ts`, `generate.ts`, `pipeline.ts`, `skills.ts`, `consumer-entry.ts`, `consumer-profile.ts`, `attribution.ts`, `spans.ts`, `registry.ts`, `registry-manifest.ts`, `resolve.ts`, `resolve-stdio.ts`, `workflow-rules-accessor.ts`.
- **Shared core** (`schema.ts`, `partition.ts`, `frontmatter.ts`, `canonical-json.ts`, `source.ts`): Lina primary, Thurgood consulted on any change, because checkers read these too. **[author's addition — Peter rules]**
- **For** (Lina's argument): the seat that verifies the charters is not the seat that writes them.
- **Against**: about twenty files sit on a seam, and a change to the shared core needs two seats.

**What the author does not do here**: pick. Both seats accept § 3 under either option. Lina argued for B, and the author took A in the cross-read; both readings are on record (§ 8).

## 5. Edit sites (applied after ratification, exactly as ruled)

1. `canonical/agents/thurgood.md`, `canonical/agents/ada.md`, `canonical/agents/lina.md`: `writeScope` gains the paths of § 2 and the F-1 option Peter picks.
   - **[author's addition — Peter rules]**: `.kiro/issues/**` is also added to `canonical/agents/{stacy,leonardo,sparky,kenya,data}.md`.
   - The paths are written as globs or exact files, never as umbrellas that § 2 did not grant.
2. `.kiro/issues/README.md`: rule 9 (§ 2.5).
3. **Regeneration** (`npm run check:122:diff-guard`, full run): `.claude/agents/**`, `.kiro/agents/**` and the lock; the `outputs` hash moves and the PR says so (§ 3.3).
4. **Signing acts**: each seat's operative set (`canonical/operative-sets/{ada,lina,thurgood,…}.yaml`) gains `writeScope[<glob>]` units. These are confirmed and signed by the C1 seats; signing acts need no grant (ballot `2026-10-01-signing-act-chain` M1).
5. **Register**: a `charter-write-scope-render-fidelity` row at `proposed`, owner thurgood, carrying § 3.2's sweep.
6. **Re-routing lines** (§ 2.1), appended by the records' owners after merge.

**Out of scope**: governance-law paths (`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`); `RELEASE-FLOW.md`; `.github/**` beyond `lane-timing.yml`'s existing standing scope. All stay Peter-merged or ballot-only.

## 6. Counter-arguments (the author's, after fold-back)

- **Folded in**:
  - "The map grants roots, not files" → `scripts/` is now by file.
  - "`.kiro/issues/**` lets anyone edit anyone's record" → rule 9.
  - "The generator owner can widen scopes" → § 3.
- **Surviving**:
  - **(1) Width.** This moves the most standing scope of any ballot on record, and most of it to the author. The by-file lists cut the width, but each listed file is a place an out-of-list edit is no longer a finding.
  - **(2) Behavioral enforcement.** Write scope in this runtime is behavioral (CC has no per-agent path field). The § 3 sweep checks rendering, not behaviour. A seat writing outside its scope is still caught only at claims passes.
  - **(3) The README rule is honour-based**, with the same limit as (2).

## 7. Review rounds

*(empty — Stacy R1 owed)*

## 8. Consult ledger (2026-10-17, read-only, parallel, with a cross-read)

- **Thurgood ×2**:
  - R1: claimed `.kiro/issues/**` (steward), `scripts/` mine-by-file, `mcp-server/src/**`, generator shared (checkers mine, rendering Lina's), `complete-task.sh`; refused `src/cli/**` (read as Lina's).
  - Cross-read: yielded `src/cli/**` to Ada; took generator primary, emitters included; proposed § 3.
- **Ada ×1**: `src/cli/**` hers (with `attach.ts` and templates shared); the `scripts/` by-file list; "append-for-all" on issues; the release-instrument clause (§ 2.6).
- **Lina ×2**:
  - R1: `src/cli/**` Ada's; generator primary to Thurgood, Lina secondary on consumer-lane code; the emitter conflict flag.
  - Last word, crossing Thurgood's: accepts emitters and rendering primary under the guard and argues the split is the better separation → F-1 option B.
