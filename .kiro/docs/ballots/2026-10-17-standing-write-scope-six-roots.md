# Ballot Measure: Standing write scope for six roots no charter owns

**Date**: 2026-10-17
**Drafted by**: Thurgood (Civitas steward), at Peter's direction, after a three-seat consult with a cross-read (ledger, § 10).
**Status**: **RATIFIED (Peter, 2026-10-17)**, relayed by the orchestrator. F-1 is Option B, and Stacy's R2 width addition is approved (§ 9). This commit is the record (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"), made before any edit site in § 5 is applied. *(Was: DRAFT, one fork open, then held pending the width review.)*
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

Tests and fixtures follow the file they exercise: `scripts/__tests__/**`, `scripts/__fixtures__/**`, `scripts/__bites__/**`. That mapping is a judgment, so it is made decidable at the point of edit: **the PR that adds or edits a test, fixture or bite names, in its body, the file it exercises**, and the owner of that file is the owner of the edit. *(Stacy R1, § 8.)*

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
  - `derive-install-doc.ts` (the install doc; Thurgood owns its reference remainder, ballot B-U3). **Shared: Ada is consulted on any change**, because the install process it derives from is her pipeline (Stacy R2).
  - `categorize-tests.ts` (test governance)

**Lina**:
- `extract-component-meta.ts`, `figma-component-generator.ts`, `audit-component-tokens.js`
- **[author's addition — owner confirms]**: `validate-examples.js` (component HTML examples)

**Unplaced**: none. Any file added later states its owner in the PR that adds it. A file nobody claims is a walk finding.

### 2.3 `mcp-server/src/**` → **Thurgood**

This is the docs MCP: indexer, query engine and matcher, with `mcp-server/src/**/__tests__/**`.

The rest of `mcp-server/`, by path:
- **Ada, with Thurgood consulted** (packaging and module resolution): `mcp-server/package.json`, `mcp-server/package-lock.json`, `mcp-server/tsconfig.json`, `mcp-server/jest.config.js`.
- **Thurgood**: `mcp-server/tests/**`, `mcp-server/docs/**`, `mcp-server/README.md`.
- **No seat**: `mcp-server/logs/` is runtime output, gitignored and never committed, so it is not a write path. Removing the cwd-relative write that creates it is W-7's fix.

**W-7** (the docs-MCP logs-dir fix, in `mcp-server/src/index.ts`) follows `mcp-server/src/**`, so its fix owner is Thurgood from ratification.

### 2.4 `.kiro/hooks/**` → **Thurgood**, for the completion tooling

- **Thurgood**: `complete-task.sh` (the CI regime and completion tooling, ballot B-CI M3), `README.md`, `task-completion-agent-hook.md` (its companion doc; unlisted at draft, Stacy R1), and the legacy completion scripts (`commit-task.sh`, `commit-task-organized.sh`, `task-completion-commit.sh`, `organize-after-completion.kiro.hook`, `organize-by-metadata.sh`, `archive/**`) **[author's addition: legacy files, owned so someone can retire them]**. Accepted at R2 with the **retirement named as the trigger**: a legacy file still present at the second monthly walk after ratification is a walk finding (Stacy R2).
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
2. **A named sweep under `122-diff-guard`** compares a **projection**, not raw text. The targets render scope differently:
   - the CC steward agent renders one sentence;
   - the CC consumer profile renders one span per glob;
   - Kiro renders its own form.

   **The projection**: for each seat and each target (CC steward, CC consumer, Kiro), the **ordered list of globs extracted from that target's `writeScope` spans** must equal the seat's canonical `writeScope` array (`canonical/agents/<seat>.md` frontmatter), element for element and in order.
   - **Stacy specifies the falsification fixtures** on that projection: an injected glob, a dropped glob, a reordered pair, and a cross-seat swap (seat X rendered with seat Y's list). All four must red.
   - It is built after ratification by the owner of `sweeps/**` (Thurgood under both F-1 options), and registered `proposed` until the fixtures pass on the CI path.
   - *(Rewritten at R2: the draft's "equals byte for byte" had no referent, because no two targets render the same bytes. Stacy R1.)*
3. **Disclosure**: any PR that moves the `outputs` hash in `canonical/generated.lock` says so in its body, with the before and after hashes.
4. **Instrument-change audit trigger** (added at R3; Stacy R2). Today nothing fires on a change to a gate instrument's source or fixtures that leaves the required-check set unchanged. A weakened checker passes its own green and stays invisible until RELEASE. So **Stacy's ARMING population gains "a PR whose diff touches an instrument path"**. The instrument paths are:
   - the § 4 B checker list;
   - `scripts/check-completion-criteria-parity.ts` and `scripts/completion-claims/**`;
   - `tools/agent-generator/verify-gate-registration.sh`;
   - the three steward-verb tool files: `mcp-server/src/tools/validate-metadata.ts`, `list-cross-references.ts`, `rebuild-index.ts`.

   **The read**, all three decidable from the PR:
   - `git diff --numstat` shows **0 deletions** under any `__fixtures__/**`, unless the PR body names the fixture and its spec amendment;
   - the PR body cites the fixture test run;
   - `EXPECTED_CONTEXTS` is unchanged, or the change is named in the body.

   **An audit trigger, never a gate.** It reads after acceptance, which is her seat; she does not read pre-merge and does not write fixtures (Q5).

   **Cost**: one row edit to `canonical/agents/stacy.md` (her commit, Peter-merged, riding the application PR), and minutes per instrument PR.

**Why the existing pieces are not enough**:
- `diff-guard` proves the outputs equal what the generator renders from canonical. It does not prove the generator renders write scope faithfully.
- `canonical-vs-truth` reads canonical claims, not rendering.
- The carve-out puts every `.claude/agents/**` change in front of Peter, but finding one changed scope line in a large regenerated diff relies on attention. The sweep makes it mechanical.

## 4. Fork F-1: `tools/agent-generator/**` — Peter picks; no default

**Option A: Thurgood primary on all of `tools/agent-generator/**`; Lina secondary on consumer-lane code.**
- **Thurgood**: everything, emitters included.
- **Lina, secondary** (consulted on every change, and may author under a `tasks.md` row), on **whole files** so the scope is decidable:
  - `consumer-entry.ts`, `consumer-profile.ts`, `adapters/cc.ts`, `adapters/kiro.ts`, `adapters/index.ts`;
  - `regrounding/derivation.ts`, `regrounding/dispositions.ts`, `regrounding/overlay.ts`;
  - and their tests.

  *(R2: the draft's "consumer legs of `adapters/**`" was not file-decidable, because `adapters/cc.ts` renders both legs. Stacy R1.)*
- **For**: one owner means fewer seams; the conflict is handled by § 3.
- **Against**: verifier and renderer are the same seat. § 3 makes rendering checkable, but the person who writes the check also writes what it checks.

**Option B: split, so the verifier is not the renderer.**
Every file in the tree is assigned (R2; Stacy R1 found the draft left about twenty unassigned).

- **Thurgood (checkers and sweeps)**:
  - `diff-guard.ts`, `canonical-vs-truth.ts`, `coverage-map.ts`, `sweeps/**`, `verify-gate-registration.sh`, `workflow-rules-guard.ts`, `child-process-guard.ts`;
  - `regrounding/verify-signing-chain.ts`, `regrounding/signatures.ts`, `regrounding/c1.ts`, `regrounding/freshness.ts`, `regrounding/check-catalog.ts`, `regrounding/triviality.ts`;
  - `__fixtures__/stale-unit/**`.
- **Lina (rendering, adapters, emitters)**:
  - `render.ts`, `adapters/**`, `compose.ts`, `derive.ts`, `generate.ts`, `pipeline.ts`, `skills.ts`, `consumer-entry.ts`, `consumer-profile.ts`, `attribution.ts`, `spans.ts`, `registry.ts`, `registry-manifest.ts`, `resolve.ts`, `resolve-stdio.ts`, `workflow-rules-accessor.ts`;
  - `regrounding/derivation.ts`, `regrounding/dispositions.ts`, `regrounding/overlay.ts`;
  - `__fixtures__/g1-renderings/**`, `__fixtures__/semantics-guard/**`.
- **Shared core: Lina primary, Thurgood consulted on any change**, because checkers read these too:
  - `schema.ts`, `partition.ts`, `frontmatter.ts`, `canonical-json.ts`, `source.ts`;
  - `regrounding/hash.ts`, `regrounding/operative-sets.ts`;
  - `__fixtures__/golden-partition/**`, `jest.config.js`, `tsconfig.json`.
  - **[author's addition — Peter rules]**
- **`__tests__/**`**: a test file follows the source module it imports (the first `../<module>` import); the PR names the exercised file (§ 2.2's rule). Exceptions, by file:
  - `entry-tree.test.ts` and `grain-guard.two-sided.test.ts` → shared core;
  - `semantics-guard.test.ts`, `semantics-guard.fixture.test.ts`, `g1-renderings.provenance.test.ts` and `survivor-sourced.ts` → Lina;
  - `__tests__/fixtures/**` follows the test that reads it.
- **For** (Lina's argument): the seat that verifies the charters is not the seat that writes them.
- **Against**: about twenty files sit on a seam, and a change to the shared core needs two seats.

**What the author does not do here**: pick. Both seats accept § 3 under either option. Lina argued for B, and the author took A in the cross-read; both readings are on record (§ 10).

## 5. Edit sites (applied after ratification, exactly as ruled)

1. `canonical/agents/thurgood.md`, `canonical/agents/ada.md`, `canonical/agents/lina.md`: `writeScope` gains the paths of § 2 and the F-1 option Peter picks.
   - **[author's addition — Peter rules]**: `.kiro/issues/**` is also added to `canonical/agents/{stacy,leonardo,sparky,kenya,data}.md`.
   - The paths are written as globs or exact files, never as umbrellas that § 2 did not grant.
2. `.kiro/issues/README.md`: rule 9 (§ 2.5).
3. **Regeneration** (`npm run check:122:diff-guard`, full run): `.claude/agents/**`, `.kiro/agents/**` and the lock; the `outputs` hash moves and the PR says so (§ 3.3).
4. **Signing acts**: each seat's operative set (`canonical/operative-sets/{ada,lina,thurgood,…}.yaml`) gains `writeScope[<glob>]` units. These are confirmed and signed by the C1 seats; signing acts need no grant (ballot `2026-10-01-signing-act-chain` M1).
5. **Register**: a `charter-write-scope-render-fidelity` row at `proposed`, owner thurgood, carrying § 3.2's sweep.
5a. **`canonical/agents/stacy.md`**: her ARMING population row gains the § 3.4 instrument-change trigger. This is **her commit** on the application PR, Peter-merged (Stacy R2).
6. **Re-routing lines** (§ 2.1), appended by the records' owners after merge.

**Out of scope**: governance-law paths (`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`); `RELEASE-FLOW.md`; `.github/**` beyond `lane-timing.yml`'s existing standing scope. All stay Peter-merged or ballot-only.

## 6. Composition with existing grants (added at R2; Stacy R1)

Standing scope and grants **compose by union**:
- A `tasks.md` row grant (ballot `2026-09-26-tasks-row-write-scope-grant`) and an issue-row grant (README rule 8) are **additive** to any seat's standing scope. They **never narrow** it.
- A grant over a path that this ballot places in **another seat's** standing scope **names that seat as consulted**, in the grant record and in the fixing PR's `**Consulted**:` line. The owning seat's consult is recorded, never assumed.
- An edit outside the union of standing scope and active grants is a claims-pass finding, as today.

## 7. Counter-arguments (the author's, after fold-back)

- **Folded in**:
  - "The map grants roots, not files" → `scripts/` is now by file.
  - "`.kiro/issues/**` lets anyone edit anyone's record" → rule 9.
  - "The generator owner can widen scopes" → § 3.
- **Surviving**:
  - **(1) Width.** This moves the most standing scope of any ballot on record, and most of it to the author. The by-file lists cut the width, but each listed file is a place an out-of-list edit is no longer a finding.
  - **(2) Behavioral enforcement.** Write scope in this runtime is behavioral (CC has no per-agent path field). The § 3 sweep checks rendering, not behaviour. A seat writing outside its scope is still caught only at claims passes.
  - **(3) The README rule is honour-based**, with the same limit as (2).

## 8. Review rounds

#### [STACY R1] — 2026-10-17 — REVIEW WITH NOTES
- PASS: `scripts/` by-file list complete against the 52-entry tree. NOTE: "tests follow the file they exercise" is a judgment mapping; the PR should name the exercised file.
- NOTE: `.kiro/hooks/task-completion-agent-hook.md` is unlisted.
- FAIL (decidability, § 4): Option B leaves `__tests__/**`, `__fixtures__/**`, `jest.config.js`, `tsconfig.json`, `mcp-server/logs` and ten `regrounding/*.ts` unassigned; Option A's "consumer legs of `adapters/**`" is not file-decidable.
- PASS: fork stated, both options, no pick; the RL-14 reading matches release-4 rulings row 28.
- FAIL (§ 3.2): "byte for byte" has no referent; state the projection. She will write fixtures for inject, drop, reorder and cross-seat swap.
- FAIL (absent): no composition clause with the tasks-row grant and README rule 8.
- NOTE: PR body wording (hers to fix).
- Both ballots: add a rulings slot.

#### [THURGOOD R2] — incorporated, woven
- Tests-follow rule → § 2.2 (the PR names the exercised file); the same rule is reused in § 4 B.
- `task-completion-agent-hook.md` → § 2.4, Thurgood; the legacy list is enumerated by file.
- Decidability FAIL:
  - Option A's Lina scope is now whole files (§ 4 A).
  - Option B assigns every file in the tree, including tests (import rule plus a by-file exception list), fixtures, `jest.config.js` and `tsconfig.json` (shared core), and all eleven `regrounding/*.ts`.
  - `mcp-server/` outside `src/` is assigned by path in § 2.3, and `mcp-server/logs/` is named a non-write-path.
- Projection FAIL → § 3.2 rewritten around the ordered-glob projection, with her four fixture classes named.
- Composition FAIL → new § 6.
- Rulings slot → § 9.

#### [STACY R2] — 2026-10-17 — the width review (Option B) — ACCEPTABLE WITH THE ADDITION; nothing to strike
- (1) Gains enumerated by root are coherent with Civitas infrastructure: PASS.
- (2) Share one: `derive-install-doc.ts` → Ada consulted on any change (B-U3 gave Thurgood the remainder only). Legacy hooks: accepted, with the retirement named as the trigger (still present at the second walk = finding).
- (3) Concentration. The existing counterweights are listed:
  - Peter merges every PR;
  - `canonical/`, `governance/`, steering, ballots and `.github/` are Peter-merged;
  - her fixture specs;
  - the coverage-map zero-blank-row check and the gate-registration count at ARMING;
  - ballot 2026-09-27 M3;
  - claims passes.

  **Missing**: nothing fires on a change to a gate instrument's source or fixtures that leaves the required-check set unchanged. She refuses write on fixtures (Q5: she must not co-maintain checks) and refuses a pre-merge read (co-signer ground; her seat is post-acceptance). The narrowest addition is an ARMING-population extension (the paths, the read, never a gate, the cost).
- (4) Verdict: ACCEPTABLE WITH THE ADDITION.

#### [THURGOOD R3] — incorporated, woven
- (2) → § 2.2 (`derive-install-doc.ts` shared with Ada) and § 2.4 (the retirement trigger).
- (3) → new § 3 item 4 (the instrument-change audit trigger, as she specified it), plus edit site 5a (her own row edit).
- **Status**: held DRAFT until Peter's word on the addition is relayed (§ 9).

## 9. Rulings (Peter)

- **2026-10-17 — F-1: Option B (Peter)**: the split. Thurgood owns the checkers and sweeps; Lina owns rendering, adapters and emitters; the § 3 guard applies as written. Relayed by the orchestrator.
- **2026-10-17 — the ballot**: ratified in Peter's words, with the Status held DRAFT pending a width review (Stacy R2, § 8).
- **2026-10-17 — Stacy's R2 recommendations APPROVED (Peter)**: the § 3 item 4 instrument-change ARMING trigger, `derive-install-doc.ts` shared with Ada (consulted), and the legacy-hooks retirement trigger. **Ballot RATIFIED (Peter, 2026-10-17).**

## 10. Consult ledger (2026-10-17, read-only, parallel, with a cross-read)

- **Thurgood ×2**:
  - R1: claimed `.kiro/issues/**` (steward), `scripts/` mine-by-file, `mcp-server/src/**`, generator shared (checkers mine, rendering Lina's), `complete-task.sh`; refused `src/cli/**` (read as Lina's).
  - Cross-read: yielded `src/cli/**` to Ada; took generator primary, emitters included; proposed § 3.
- **Ada ×1**: `src/cli/**` hers (with `attach.ts` and templates shared); the `scripts/` by-file list; "append-for-all" on issues; the release-instrument clause (§ 2.6).
- **Stacy ×2** (review rounds, § 8): R1 decidability; R2 width (Option B), ACCEPTABLE WITH THE ADDITION.
- **Lina ×2**:
  - R1: `src/cli/**` Ada's; generator primary to Thurgood, Lina secondary on consumer-lane code; the emitter conflict flag.
  - Last word, crossing Thurgood's: accepts emitters and rendering primary under the guard and argues the split is the better separation → F-1 option B.

## Errata

- **2026-10-17 (Thurgood), on application — Peter's rulings of 2026-10-17 on the application PR's consults (Forks A, B and C), relayed by the orchestrator; the record matched to what ships**:
  - **(a) § 5 item 4.** Operative sets do **not** gain `writeScope[...]` units: an operative-set record covers body units only. A frontmatter leaf is signed only through its consumer dispositions row. The signed objects are therefore the **123 first signatures** on the new `writeScope[...]` dispositions rows (Thurgood's 58 → Stacy; Ada 23; Lina 37; Stacy, Leonardo, Sparky, Kenya, Data 1 each — see (g) for Ada's count), plus the three `#in-scope` units re-hashed by the new In Scope bullets (`canonical/operative-sets/{thurgood,ada,lina}.yaml` re-confirmed by Stacy, Ada and Lina; the same three dispositions rows re-signed).
  - **(b) § 4 B, the `__tests__/**` rule (Fork B).** "A test file follows the source module it imports (the first `../<module>` import)" is replaced by: **a test follows the module whose basename equals the test filename's stem before its first `.`, in any directory; otherwise its first `../` import.** The stem is everything before the filename's first `.`: `triviality.floor.test.ts` and `triviality.helpers.ts` → `triviality.ts`; `verify-signing-chain.audit.test.ts` → `regrounding/verify-signing-chain.ts`. The two exception groups stay as written, and `__tests__/fixtures/**` still follows the test that reads it. Why: the import rule assigned `verify-signing-chain.test.ts`, `verify-signing-chain.audit.test.ts` and `triviality.helpers.ts` to the shared core (they import `../frontmatter` first), which defeated Option B's separation (Lina, Finding 1).
  - **(c) § 3 item 2, the projection (Fork C).** Five surfaces, not three: **CC steward** — the backticked globs in the Write-scope sentence; **Kiro steward** — `allowedPaths` (enforced) and the sentence; **CC consumer** and **Kiro consumer** — the member spans and the consumer `allowedPaths`. The steward surfaces compare against the canonical `writeScope` array; the consumer surfaces compare against **the canonical array passed through the seat's dispositions table** — `retained` → the same glob; `re-pointed` → its destination, at the same position; `no-consumer-counterpart` / `superseded-by` → dropped. A fifth fixture joins Stacy's four: **a canonical glob with no disposition row must red** (Lina's read). The register row `charter-write-scope-render-fidelity` adopts this text, still `proposed`.
  - **(d) § 3 item 4, the instrument-change read, widened (Fork C).** The read's fixture-deletion clause covers, as `git diff --numstat` deletions: any `__fixtures__/**`, **`__tests__/fixtures/**`**, **the tests of the § 4 B checkers**, and **the three steward-verb tool files**. Deleted assertions inside instrument tests are **not** mechanically decidable from numstat (deletions in test files are routine) and are recorded as a **known gap** on the register row.
  - **(e) Fork A, the tests-follow rule's enforcement.** Ruled: the class option — **per-owner test subfolders**, one glob per seat plus a shared-core folder — with sequencing (b): the application PR ships the prose rule and a named interim (enforced on Claude Code only; Kiro `allowedPaths` blocks such tests until the folders land), and the move is the chartered issue `.kiro/issues/2026-10-17-per-owner-test-folders.md`, triggered at the application PR's merge. The three In Scope bullets name the interim and cite the issue.
  - **(f) § 5 item 5a, "her commit".** Not possible in any green PR: Stacy's own row edit stales `canonical/operative-sets/stacy.yaml`'s unit (confirmer: Stacy), and a commit carrying both her authoring and her signing acts reds `verify-signing-chain` F12′. **Substitute**: Thurgood applies her drafted ARMING row **byte for byte** to `canonical/agents/stacy.md`, updates the matching existing item text in `stacy.yaml` (no new id) and the removal text in `stacy.dispositions.yaml`, as authoring; Stacy then re-confirms the record unit and re-signs the dispositions row in her own seat commits in this PR.
  - **(g) § 2.2, Ada's author's additions.** `scripts/profile-incremental-analysis.js` is **declined by Ada** (0 bytes, unreferenced); it is not in her scope and stands as a walk finding (§ 2.2: "a file nobody claims is a walk finding"), which she clears by deleting it. Ada's new rows are 23, not 24. Lina confirmed `scripts/validate-examples.js` (owned to retire).
  - **(h) Dragged paths, named for README rule 8.** The application PR also changes `tools/agent-generator/__tests__/entry-tree.test.ts` (Lina's seat: the verbatim member list replaced by an assertion derived from the frontmatter) and `canonical/generated.lock`. Stacy's ARMING row (§ 5 item 5a, as substituted in (f)) also drags `tools/agent-generator/__fixtures__/semantics-guard/canonical/agents/semguard.md`, whose `#the-trigger-set-the-114-superset-table-names-never-numbers` unit must stay byte-identical to `canonical/agents/stacy.md`'s (`semantics-guard.fixture.test.ts`), and possibly the fixture's `__bites__/task-14-3-bite-body-{cc,kiro}.txt`, which quote the row; Lina's seat (`__fixtures__/semantics-guard/**`, Option B).
  - **(i) § 3 item 3, the lock.** The application PR moves the lock's `outputs` hash; the PR body states the before and after hashes (at the authoring draft: `cd22034a…` → `f1a92a5e…`, per `check:122:noop-probe`; the final pair is taken at the lock refresh).
  - **(j) § 2.1, the shares pinned to paths** (Ada's consult, Thurgood's cross-read). The Thurgood share is: `src/cli/attach.ts`, `src/cli/sync/RegionGrain.ts`, `src/cli/sync/SteeringDirCheck.ts` (the docs MCP's corpus-location contract; ruled in), `src/cli/shared/personalNote.ts`, `src/cli/templates/personal-note.{template,example}.md`, `src/cli/shared/mcpConfig/**` and `src/cli/templates/mcp-config.json.template` (the docs MCP's launch contract), and the four `mcp-server/` packaging files. The Leonardo share is `src/cli/templates/product/**` and `src/cli/templates/starter-specs/**`. § 6's consult half ("a grant over a path in another seat's standing scope names that seat as consulted") is stated in all three In Scope bullets.
