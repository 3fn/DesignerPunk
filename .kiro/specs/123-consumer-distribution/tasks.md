# Implementation Plan: 123 — Consumer Distribution

**Date**: 2026-09-26
**Spec**: 123 — Consumer Distribution (the former "121-C")
**Author**: Thurgood
**Status**: Tasks Phase — **DRAFT, awaiting the tasks feedback round** (sequential gate). Reviewers: Ada, Lina, Stacy, Leonardo, **Kenya, Data**.
**Criteria mode**: per-parent
**Sources**: `requirements.md` (PR #196), `design.md` (PR #197, `5e98bd8f`; P1 ruled YES, P2 ruled branch A). **This plan decides sequencing and evidence, never WHAT or HOW.** Where tasks grain forced a sequencing change to the design's component placement, it is stated in § "Sequencing decisions this plan makes" and put to the round.

> **Law binding execution (Req 26.1 — Spec 127, ratified)**:
> - Every parent completion doc reproduces **every Success Criteria row below VERBATIM**, with Status + Evidence, and carries the **forced-negative line** and the **unconditional delegated-tier line**.
> - Every ticked subtask carries its subtask completion doc.
> - `completion-criteria-parity` applies.
>
> **R26.8 binds every criterion**: where a criterion's instrument can pass without the property holding, the criterion names that limit. Criteria are written as **verifiable statements with a named instrument**. A criterion that says only "exists" is written as "exists AND <property> — instrument".

---

## Declared Merge Units

| Unit | Slug · branch | Parents | Gating parent | PR title form | Claims events |
|---|---|---|---|---|---|
| **U1 — Distribution substrate & packaging truth** | `u1-substrate` · `task/123-u1-substrate` | 1–9 | **9** | `U1 substrate & packaging truth (123)` | RELEASE (release 1) |
| **U2 — Consumer generation profile** | `u2-profile` · `task/123-u2-profile` | 10–18 | **18 (G2)** | `U2 consumer generation profile (123)` | **MIDPOINT (declared carrier)** + RELEASE (release 2) |
| **U3 — Onboarding** | `u3-onboarding` · `task/123-u3-onboarding` | 19–22 | **22** | `U3 onboarding (123)` | RELEASE (release 3) |
| **U4 — Content policy** | `u4-content` · `task/123-u4-content` | 23–24 | **24** | `U4 content policy (123)` | — (no release; rides release 4) |
| **U5 — Validation & closeout** | `u5-closeout` · `task/123-u5-closeout` | 25–28 | **28** | `U5 validation & closeout (123)` | RELEASE (release 4) + **CLOSEOUT** |

**How the units run**:
- **Order is unconditional: U1 → U2 → U3 → U4 → U5** (Req 26.3).
- **One branch per unit**, each branched from `main` **after the prior unit's PR merges** (TCP § "Coherent Units"). Stacking only on Peter's explicit direction.
- **The gating parent's completion opens the unit PR.** Every other parent in the unit commits its completion and summary docs on the branch, with no PR.
- **Peter merges each unit on green.** Agents never merge.
- **Governance carve-out**: **U1, U2 and U4 carry governance-law edits** (ballots B-U1, B-U2, B-U4, and `canonical/**` in U2), so they are **Peter-merged under the carve-out** with record-first ratification: the ballot shows `RATIFIED` and a `Ratified-machine:` line before its law edits apply, in the same PR.
- **The PR body carries** `Spec:`, `Unit:`, `Task:` (the gating parent), `Agent:`, the completion-doc paths, and the validation note.

**MIDPOINT — carrier U2** (Req 26.2; Stacy confirmed at design R1).
- **Record path pinned: `.kiro/specs/123-consumer-distribution/completion/claims-pass-midpoint.md`, NEVER `completion/claims-pass.md`** (the latter would silently discharge `closeout-owed(123)`).
- **Stacy's two conditions, binding the pass**:
  - **(1)** U2's merge is the **first-render release**. The pass records the C2 `no-consumer-counterpart` rates and the per-signer assent rate as ***"first render — not a baseline"*** (11.5.8).
  - **(2)** The pass audits that **each G1/G2 branch was executed and evidenced** (promised/claimed/shipped against the verdict), **never the verdict content**.
- U2's merge also fires **RELEASE**. That makes **two records**, each with its own scope line, **never merged into one**.
- **Findings route to owning agents as explicit messages.** Never only a file in a directory.

**CLOSEOUT** fires at U5's merge → `completion/claims-pass.md` (Stacy).

### Expected release count — **FOUR** (Req 26.3, named)

| Release | After | Why it ships | Expected semver |
|---|---|---|---|
| 1 | U1 | union, fail-loud postures, packaging diet, sync repairs, publish-rail guard | **MAJOR** — `files[]` drops wholesale `src/`, and `init` output changes |
| 2 | U2 | consumer agent layer (the D-live-2 imposter repair), `attach` | minor, or major if the release recipe judges the init-output change breaking |
| 3 | U3 | install doc, commit policy, starter specs, init UX | minor |
| 4 | U5 (carrying U4) | banners, changelog, closeout corrections (incl. the observed approval truth) | minor |

- **No release after U4** — its content is governance banners and the changelog, which ride release 4.
- **Cost, made visible as 26.3 requires**: **four RELEASE claims passes**. Each owes the owed-set query paste, and each owes the publish-rail log (`docs/releases/<v>/publish-verification.log`) that 6.7's read requires. Add MIDPOINT and CLOSEOUT: **six claims passes in total**. Skipping any RELEASE pass is a LIVENESS finding against this spec (*events without records*).
- *Residual: four dual-registry publishes at solo scale — the dual-publish tax is an accepted risk (26.6), and this plan pays it four times.*

### Split tripwire — thresholds declared per unit (Req 26.5)

**Limb 1 — scope growth**:
- The referent is the **subtask count declared in this file at the tasks round's close** (the counts below are recomputed at that close and frozen by commit).
- **The tripwire fires if a unit's subtask count grows by more than its threshold, or gains any new parent.**

**Limb 2 — ordering**:
- **It fires if a unit has not merged while its successor unit's branch has any commit.** Observable with `git log origin/task/123-<next-slug>` against the prior unit's merge state.

**Reading**:
- **Read at each unit's completion review. Peter owns the read.**
- The unit's PR body carries one line: `Tripwire: declared <n> subtasks, now <m>; parents unchanged|added; successor branch: none|<sha>`.

| Unit | Declared subtasks | Threshold (growth that fires) |
|---|---|---|
| U1 | 39 | **+4** |
| U2 | 38 | **+4** |
| U3 | 13 | **+3** |
| U4 | 6 | **+2** |
| U5 | 16 | **+3** |

*Thresholds are about 10% of each unit's count, rounded up, with a floor of +2 and a small-unit allowance of +3. They are named before the growth they measure, as 26.5 requires. Totals: **28 parents, 112 subtasks.** The counts are recomputed and frozen by commit at the round's close.*

### Execution routes and the delegated-tier plan

The plan below is what each parent's unconditional delegated-tier line holds to or diverges from (TCP Key Rules).

**Tier rule** (Start Up Tasks #6):
- **Sonnet** implements settled design.
- **Opus** where the task carries residual judgment.
- **Opus is also used on the § 7.2 machinery.** The concrete escalation signal is that it has failed falsification twice.
- **The orchestrator briefs the owning agent once per unit and continues that agent across the unit** (Agent-Directory § "Primary Agent").

| Parent | Planned agent (tier) | Why that seat and tier |
|---|---|---|
| 1 Birth detection & root policy | **Ada (Sonnet)**; Lina for the indexer subtask | Settled design. The token-index posture, ConfigLoader alignment and theme pairing are Ada's surfaces; the component indexer is Lina's |
| 2 Birth event / copy table | **Ada (Sonnet)** | Token-tier copy and transforms |
| 3 Packaging floor | **Ada (Sonnet)**; Kenya/Data decision input | Packaging / module-resolution surface (118) |
| 4 MCP config + tool manifest | **Lina (Sonnet)** | Server registrations and config emitters |
| 5 `sync` re-scope + migration | **Lina (Opus)** | Key-grain JSON is a new mechanism (DD2), and the migration's fetch-and-re-transform carries judgment |
| 6 Name + type contract | **Ada (Sonnet)**; Lina consulted on the bundle | Token-name surface |
| 7 Publish rail + B-U1 | **Thurgood (Sonnet)** | Civitas instrument; register-row owner |
| 8 Harvest-zero lint | **Ada (Sonnet)** | Loader |
| 9 Consumer-guard extensions | **Thurgood (Sonnet)**; arbiter runs verified in the main session | Test governance |
| 10 Splitter + spans | **Lina (Opus)** | § 7.2 machinery |
| 11 Exemplar operative sets | **Thurgood (Opus)**; confirmers per C1 | Profile author; owners confirm |
| 12 **G1** | **Stacy (Opus)** | Falsifying seat |
| 13 Triviality + records | **Thurgood (Opus)**; Lina for generator code | Profile author + generator owner |
| 14 Derivation + guards | **Lina (Opus)** | § 7.2 machinery on her generator |
| 15 Consumer rendering + first render | **Thurgood (Opus)**; signers per C1 | Profile authoring across all eight charters |
| 16 Emission lane + `attach` | **Lina (Sonnet)** | Settled lane design |
| 17 Legacy deletion + B-U2 | **Lina (Sonnet)**; Thurgood for the ballot | Deletion sweep |
| 18 **G2** | **Stacy (Opus) — author recused** | Pass four |
| 19 Install doc | **Thurgood (Opus)**; Leonardo reviews on-branch | Vocabulary law (15B) carries judgment |
| 20 Commit policy + `.gitignore` region | **Lina (Sonnet)** | Settled |
| 21 Starter specs | **Thurgood (Opus)** | Spec standards |
| 22 Personal note + init UX + DD9 | **Lina (Sonnet)**; Leonardo confirms DD9 | Settled strings |
| 23 Banners | **Thurgood (Sonnet)**; Ada owns the predicate | Settled |
| 24 U1b check + CHANGELOG + B-U4 | **Thurgood (Opus)** | The backward check is judgment |
| 25 Trio | **Thurgood (Opus)** operating persona sessions; Leonardo persona owner | Run protocol |
| 26 Join runs | **Thurgood (Opus)** | Observation protocol |
| 27 Conformance | **Thurgood (Opus)** operating; consumer-Thurgood and consumer-Stacy sessions | 24.1 two-beat |
| 28 Closeout | **Thurgood (Opus)** | Synthesis |

**Post-unit obligations** (verified by the claims passes, not by completion docs):
- docs-MCP `rebuild_index` after each unit that edits a served doc (U1, U2, U4; U3's install doc is not served);
- after U1, the steward files nothing new — Lina's rename issue already exists.

---

## Sequencing decisions this plan makes (put to the round)

1. **`init`'s agent-layer steps move from U1 to U2** — the removal of 6/7/7b and the new agent-layer + manifest-recording of generated files.
   - The design places all of C1 in U1. **But the replacement, C20's emission lane, lands in U2.**
   - Removing the agent and steering copies in U1 would ship release 1 either **with no agent layer** (19.7: "never silently with no agent layer") or **with copied agents whose `resources` point at uncopied steering**.
   - U1's `init` therefore keeps today's steps 6/7/7b, which is the status quo imposter behavior, not a regression.
   - U2 Task 16 removes them together with the replacement.
2. **The matching `files[]` removals move to U2 for the same reason** — `.kiro/agents/`, the `.kiro/steering/` directory glob, and `product-template/`, plus the addition of the eight explicit identity docs. The U1 diet is everything else in C5.
3. **C7 splits across two units.**
   - **U1 (Task 5)**: de-management of the token, type and component tiers; classification; pruning; manifest move and format; **key-grain management of MCP configs** (written by U1's C8); migration; repairs.
   - **U2 (Task 16)**: generated agent surfaces, `attachedTargets` generation, and **region grain** (the `CLAUDE.md` region).
   - **U3 (Task 20)**: the `.gitignore` region's content — the mechanism is U2's.
4. **Two C6 cases move to U2 (Task 16)**: `attach --reference stays CONSUME`, and the consumer-lane emission half of the 3.9 re-certification. `attach` does not exist before U2. **U1's post-diet re-certification is recorded as covering U1's surface only**, and U2 re-runs it with the lane.
5. **DD13's single ballot splits into three** (open input 8, decided below): B-U1, B-U2, B-U4.

---

## Open inputs passed to this round — dispositions

| # | Input | Disposition |
|---|---|---|
| 1 | **Expected release count** (26.3) | **DECIDED: four** (table above), with the cost of six claims passes stated. |
| 1b | **Tripwire thresholds** (26.5) | **DECIDED**: per-unit subtask counts plus thresholds; limb 2 anchored on successor-branch commits. Both referents exist in git. |
| 2 | **`.swift`/`.kt` disposition** (4.5) | **CARRIED TO KENYA AND DATA as directed questions.** Their recorded re-entry trigger has **fired**: Q6 resolved package-consumed, and the trigger's content was measured at outline R2 — *"`src/` is the only rail platform sources reach consumers on"*. **Landing artifact: Task 3.5** folds their answer into `files[]`, with a decision record in Task 3's completion doc. **Default until they answer: KEPT** (C5; cutting is the irreversible direction). |
| 3 | **Sizing of the region- and key-grain sync units** (DD2) | **DECIDED** as three sized subtasks: key-grain JSON (**5.3**, ~1 day, U1); region extractor + splicing applier (**16.4**, ~1 day, U2); keyed manifest (`path#region` / `path#key`, **5.2**, ~½ day, U1). **Lina confirms the sizing.** |
| 4 | **Freshness check: existing context or its own** | **DECIDED: rides the existing required context `122-diff-guard`** (in `EXPECTED_CONTEXTS`; runs `npx tsx tools/agent-generator/diff-guard.ts`, which invokes the new sweep). **No new context, so Stacy's ARMING event does not fire.** A **did-it-really-run bite** is owed: a stale unit makes `diff-guard.ts` exit non-zero, recorded (13.6). *Residual: a sweep inside another context is less visible. If diff-guard is restructured, the sweep could be dropped silently, so a test asserts that diff-guard invokes it.* |
| 5 | **DD9 `cc` default — confirmation placement** | **DECIDED: Task 22.4 (U3)**, confirmed by Leonardo on the U3 branch against the founder path's step count. Bare `init` is off the declared path, so the notice costs 0 steps. **Re-read at U5** from the trio records' `target` fields and any bare-`init` usage (Task 25.5). |
| 6 | **E-fm frontmatter bite** | **DECIDED: BUILD it** (**14.4**). The frontmatter loops are consolidated through `emitSpans` at Task 10, so the mutation cost matches the body bite (Lina: ~30 min per bite after the fixture). **Forced-negative fallback**: if it proves unbuildable, the Task 14 completion doc carries `frontmatter routing: asserted, not bitten` with the reason. |
| 7 | **Optional extra G1 exemplars** | **DECIDED: ADD ONE — exemplar G**, a gutted `start-up-tasks.md` enumeration item. **One exemplar covers both missing kinds** (an always-set member **and** an enumeration-kind unit). Constructed by **Stacy** at Task 11.3; its operative set is confirmed under C1 (start-up-tasks is a Thurgood-maintained Civitas doc, so owner = profile author → Stacy confirms). |
| 8 | **DD13 ballot split** | **DECIDED: SPLIT INTO THREE**, because the single U4 ballot is **too late** for two of its edits. Release 1 must already run the publish-rail step, and C21's deletion in U2 must be accompanied by the `classification-map` L686 edit. **B-U1** (Task 7): the RELEASE-FLOW publish-rail step + paste target + the register row. **B-U2** (Task 17): `classification-map` L686. **B-U4** (Task 24): the release-management-system trio obligation (23.7) + the changelog step (21.2). *Residual: three ratification cycles instead of one; each is small.* |

---

## Carried obligations — placed

| Obligation | Placed at |
|---|---|
| Two cross-target join runs + the install-doc correction to the observed approval truth | **Task 26** (U5) |
| One-time re-attestation of interim confirmation and signature records when 125-B U3 lands | **Task 28.4** — exits closeout as a committed record under `.kiro/issues/`, with its trigger and owner |
| Peter's dp-portfolio check (`ls .kiro/sync-manifest.json`) | **Task 5.1**, a U1 migration input. The result is recorded; the migration fixtures cover **both** branches regardless |
| Lina's `*.refs.ts` rename (`.kiro/issues/2026-09-26-component-token-refs-rename.md`) gating C11's lint | **Task 8.1** — the lint does not merge before the rename's merge, verified by `find src/components -name "*.refs.ts"` → 7 |
| Recurring per-release trio obligation (23.7); cold-human run's generic trigger (23.9) | **Task 28.4** (committed records) + **B-U4** (the recipe) |
| C2 counting-block edit to 127's claims-pass template (Thurgood's artifact; Stacy's duty) | **Task 13.7** (U2, coordinated with Stacy before merge) |

---

## Tasks

### UNIT 1 — Distribution substrate & packaging truth

- [ ] 1. Birth detection, root policy, and indexer anchoring

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Ada (Sonnet); Lina (Sonnet) for 1.4
  **Traces**: Reqs 2.1, 2.1a, 2.5, 15A.3, 19A.5a, 3.7a · design C2, C3, DD3, DD23, DD24

  **Success Criteria:**
  - `findDesignSystemRoot` classifies **every** state and sub-case in design C2 (born · package-mode · partial × {config-no-tier, unused-local-tier, tier-no-config, manifest-only} · unborn), plus the steward exemption. **Instrument**: `bornRepo.test.ts`, with **one named case per state and sub-case — nine cases**, each asserting the returned `state`, `partialCase` and `tierDir`.
  - The walk's four boundary behaviors each have a named case that **fails when the behavior is removed**, with the red recorded in the subtask doc. The behaviors: (a) the start at `process.cwd()`; (b) test-then-stop at `.git`, including `.git` as a file; (c) the `node_modules` skip; (d) consume-posture manifests ignored.
  - **The three barrel export forms** (function, const/let, re-export) each classify born — `bornRepo.test.ts`, three cases.
  - `resolveComponentRoots`, `resolveTokenIndexRoot` and the product-root rule return the values in design C3's table **for every row**. **Instrument**: the table-driven resolver test, whose row count equals the C3 table's row count, with the count asserted in the test.
  - **The union is applied at indexer pass 1, and precedence keys on the declared component name.** **Instrument**: a fork fixture whose directory name differs from its declared name, inheriting a package parent, resolves its inherited contracts and wins the collision. Its bite (union after pass 1 → red) is recorded.
  - **The theme root follows the served index's recorded `tierDir`.** **Instrument**: a fixture design system with its own dark overrides, served via explicit `TOKEN_INDEX_DIR`, yields dark values from **that** tier. Its bite (the hardcoded `projectRoot/src/tokens/themes` read) is recorded red.
  - `spawnServer` precedence: a user-set data-root env var **wins** over the runner default, **and the runner passes no `cwd`**. Asserted by a runner test that fails if either is violated.
  - Every catalog string this parent emits is string-equal to its design error-catalog row. **Instrument**: a string-conformance test over the born, partial (×4), package-mode and TOKEN_INDEX_DIR rows.

  **Primary Artifacts:** `src/cli/shared/bornRepo.ts`, `src/cli/shared/mcpDataRoots.ts`, `src/cli/designerpunk.ts`, `application-mcp-server/src/indexer/{ComponentIndexer,TokenIndexer}.ts`, `application-mcp-server/src/**/ModeClassifier.ts`, both servers' `index.ts` declaration sites, tests

  - [ ] 1.1 Implement `bornRepo.ts` (signals, ConfigLoader-aligned tier resolution, walk, classification, steward exemption, `tierDir`) with `bornRepo.test.ts`
  - [ ] 1.2 Implement `resolveComponentRoots` / `resolveTokenIndexRoot` / the product-root rule; the type-level declaration test for both servers' hand-written interfaces
  - [ ] 1.3 Runner changes: remove consumer-root defaults; user env wins; the no-`cwd` assertion
  - [ ] 1.4 (Lina) Indexer: multi-root at pass 1, declared-name precedence, the legacy `core/` level, `projectRoot = bornRoot`
  - [ ] 1.5 `generate` writes `token-index/meta.json` `tierDir`; `ModeClassifier` / `TokenIndexer` read `<tier>/themes/…` with the fallback; `generate`'s write side anchored to `root`; the refusals (`tier-no-config`, `unused-local-tier`); `figma-push` / `figma-extract` anchored
  - [ ] 1.6 String-conformance test for the catalog rows above

- [ ] 2. The birth event: `init`'s copy table and rewrite-by-resolution

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Ada (Sonnet)
  **Traces**: Reqs 19A (.1–.7), 19, 15A.3, 1.2 · design C1 (steps 0–5, 9, 10, manifest), C4

  **Success Criteria:**
  - `init` implements design C1's table rows **0, 2, 3, 3b, 3c, 4, 4′, 5, 9, 10, and the manifest row** (the agent-layer rows move to Task 16 — § "Sequencing decisions" 1). **Instrument**: `init.test.ts`, one assertion per row.
  - **`rewriteByResolution` uses the whole token tier as its boundary for both 3b and 3c.** **Instrument**: `init` over the real package tree completes with **zero unmapped out-of-tier specifiers**. `progress.ts`'s `'../../tokens/*'` imports stay relative in the copy; asserted.
  - **The mapping table has exactly four rows**, and each is exercised by at least one real specifier in the copy set. **Instrument**: a coverage assertion over the rewrite log (each row hit ≥ 1). The counts are recorded against Ada's R1 measurement (types ×37, build/tokens ×1, registries ×1, OklchConverter ×2).
  - **Over-rewrite is caught.** **Instrument**: consumer `tsc --noEmit` over the copied tree passes; the three `themes/*/SemanticOverrides.ts` files still read `'../types'`. The bite (restore the string regex → `tsc` red) is recorded. *Scope: this arbiter checks type resolution of the copied tree; it does not check runtime behavior of consumer themes.*
  - An unmapped out-of-tier specifier **fails the copy with a named error**. Bite: inject one into a fixture copy → exit non-zero with the message.
  - `init` refuses in born, partial and package-mode repos with the exact catalog strings, and `--re-scaffold` prints every file it would re-add before writing. **Instrument**: `init.test.ts` cases; the re-add list is compared to a fixture's known-absent set.
  - `Oklch` is exported from the public types barrel. **Instrument**: `import { Oklch } from '@3fn/core/types'` type-checks in the packed consumer guard (Task 9).

  **Primary Artifacts:** `src/cli/init.ts`, `src/cli/shared/transforms.ts`, `src/types/index.ts`, `src/cli/__tests__/init.test.ts`

  - [ ] 2.1 `rewriteByResolution` + the mapping table + the tier-root boundary; unit tests per row
  - [ ] 2.2 `init` step 0 (the birth check + refusals + `--re-scaffold` re-add listing); steps 3/3b/3c/4/4′ per the table; `--skip-components` accepted as a no-op with a deprecation note
  - [ ] 2.3 Config generation (1.2 i–iv); test-config purpose and truthful collision string (C1 row 9, C27)
  - [ ] 2.4 Manifest written **last**, recording every file and key written; `posture: 'born'`; `installedVersion`
  - [ ] 2.5 The `tsc` over-rewrite arbiter fixture + its recorded bite

- [ ] 3. The packaging floor and `files[]`

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Ada (Sonnet); Kenya + Data decision input for 3.5
  **Traces**: Reqs 4.1–4.7, 3.9 · design C5, DD14

  **Success Criteria:**
  - `floor-closure.json` records **both named closures separately**. **Closure 2 equals the expected first-run answer** (16 files across `src/types` ×2, `src/build/tokens` ×10, `src/registries` ×2, `src/constants` ×1, `src/build/types` ×1) **or every difference is attributed** to a named source change after `5e98bd8f`. **Instrument**: `scripts/floor-closure.ts` output diffed against that list in the completion doc.
  - **Closure 1 reports zero escaping references over the transformed copy.** The build fails when one is injected; the bite is recorded.
  - The U1 `files[]` diff implements C5's **ADD / REMOVE / NOT ADDED / EXCLUDED** lists, **except the three removals and one addition deferred to Task 16** (`.kiro/agents/`, the `.kiro/steering/` glob, `product-template/`; the eight identity docs). **Instrument**: `npm pack --dry-run --json` file list, checked against a per-list assertion script in the completion doc: every ADD path present; every REMOVE path absent; `designerpunk.config.ts` absent; `product-mcp-server/src/` absent; no component `__tests__` or `examples` paths.
  - `tarball-target.json` is committed **from the post-diet `npm pack --json`**, carrying `packedBytes`, `unpackedBytes`, `files` and `lever`.
  - **The `.swift`/`.kt` disposition is recorded as Kenya's and Data's decision, with their words quoted from `feedback/tasks.md`.** `files[]` matches it. If they have not answered by Task 3's completion, the doc records **"KEPT (default) — decision not yet received"**, never a silent keep.
  - The **Lina A7 expected finding** (per-component `dist` modules `require` absent `.css`) is recorded in `floor-closure.json`'s notes **and routed to Lina as a message**, cited by message reference.

  **Primary Artifacts:** `scripts/floor-closure.ts`, `floor-closure.json`, `package.json`, `tarball-target.json`

  - [ ] 3.1 `floor-closure.ts` (both closures; `import` / `export from` / `require` / `import()`; bare-specifier verification)
  - [ ] 3.2 Run it; reconcile closure 2 against the expected answer; the closure-1 bite
  - [ ] 3.3 The U1 `files[]` diff; the pack assertion script
  - [ ] 3.4 `tarball-target.json` from the post-diet pack
  - [ ] 3.5 **Fold Kenya's and Data's `.swift`/`.kt` answer** into `files[]` and the decision record (the landing artifact for Req 4.5)

- [ ] 4. Per-harness MCP configuration, tool manifest, and product MCP wiring

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Lina (Sonnet)
  **Traces**: Reqs 5.3, 5.4, 7.1–7.4, 15A.1 · design C8, C10, DD8

  **Success Criteria:**
  - **Every registered tool in all three servers declares `readOnlyHint`.** **Instrument**: `tool-manifest.test.ts` fails if any registration lacks it; its bite (drop one) is recorded. The completion doc lists each server's tool count and read-only count.
  - `dist/mcp/tool-manifest.json` is built from **static registration imports**; the build runs without starting any server. **Instrument**: the build step runs with the servers' stdio unavailable.
  - For **both** targets, the emitted configs contain exactly the `designerpunk-*` keys specified in C8, and approvals **equal the manifest's read-only set**:
    - `rebuild_index` absent;
    - `find_docs` present;
    - `validate_component` absent.

    **Instrument**: emitter tests per target, comparing the approval set to the manifest (set equality, not presence).
  - The product server entry is emitted on both targets for born repos. **`init.test.ts:142`'s two-server assertion is replaced by a three-server assertion in the same commit, with Req 7.2 named in the commit message.**
  - `product-mcp-server/src/` is **not** in `files[]` (Task 3's pack check).
  - *Scope stated*: these tests establish **config shape and approval-list equality**. They establish **nothing about what a cold harness asks** — that is Task 26's observation.

  **Primary Artifacts:** `scripts/build-tool-manifest.ts`, the three servers' tool registration modules, `src/cli/shared/mcpConfig/{kiro,cc}.ts`, `src/cli/__tests__/init.test.ts`

  - [ ] 4.1 Add `readOnlyHint` to every registration (docs, application, product); `tool-manifest.test.ts`
  - [ ] 4.2 `build-tool-manifest.ts` → `dist/mcp/tool-manifest.json`, wired into the build
  - [ ] 4.3 Kiro and CC emitters (key-grain keys; `permissions.allow` entries; relative paths)
  - [ ] 4.4 Product server entry; the `init.test.ts:142` change

- [ ] 5. `sync` re-scope, key-grain JSON, manifest, and migration

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Lina (Opus); Ada consulted on the token-side migration notes
  **Traces**: Reqs 5.1, 5.2, 5.5–5.8, 21 · design C7 (managed set, classification, apply behavior, manifest, migration), DD2, DD21

  **Success Criteria:**
  - `MANAGED_DIRS` no longer contains `src/tokens`, `src/types` or `src/components/core`.
    - **Instrument**: a consumer fixture with an **unedited** copied token file and a **newer** package version runs `sync --apply`. **The token file is byte-unchanged afterward.** That is the property: ours never flows into theirs.
    - It is also shown with a deleted token file → **not re-added**.
    - *(The `MANAGED_DIRS` diff alone would be presence-of-a-token.)*
  - **Classification**: `deleted-by-you` and `untracked-new` behave as specified, and `removed` fires **only** under currently managed entries. **Instrument**: `sync.classify.test.ts`, with three cases whose bites are recorded:
    - first sync with a deleted generated file → not applied;
    - an emitted key deleted → never re-added;
    - de-managed entries → pruned, not `removed`.
  - **No class applies without the report printing first**, and the governance-tier auto-apply is gone. **Instrument**: an off-TTY run without `--apply` changes **zero** files (the directory hash is unchanged); asserted.
  - **Key-grain JSON**:
    - a consumer's own server key and a consumer-authored `mcp__designerpunk-*` rule survive `sync` byte-identical;
    - editing one of our keys → `conflict`, not overwritten;
    - deleting one → `deleted-by-you`.

    **Instrument**: `sync.keygrain.test.ts` over fixtures for both harness file shapes.
  - **Manifest**:
    - `designerpunk.manifest.json` at the root, stable key order, one entry per line (asserted by re-serialize-equals-file);
    - the legacy `.kiro/sync-manifest.json` is read and relocated;
    - de-managed entries are pruned with the one-line report string.
  - **Migration** (`sync.migration.test.ts`; each case's red recorded):
    - (a) a copy edited before first sync classifies `modified`;
    - (b) an unmodified copy of an older version classifies `unmodified` — **any version in range**;
    - (c) an offline fetch → `cannot-tell`;
    - (d) **the registry-pin repair is not offered before the fetch** (ordering asserted);
    - (e) modified copies are **relocated** by `--migrate-components`, not removed;
    - (f) the forks string and the Lina A5 notes are emitted.
  - **The dp-portfolio input is recorded**: Peter's `ls .kiro/sync-manifest.json` result is quoted in the completion doc. The migration fixtures cover **both** the manifest-present and manifest-absent branches, whatever the answer.
  - `sync`'s Applier source branch is deleted (D-A6). **Instrument**: `grep -n "isSourceTs" src/cli/sync/` → 0.

  **Primary Artifacts:** `src/cli/sync/{FileScanner,Classifier,Manifest,Applier,Reporter,index}.ts`, `src/cli/sync/Migration.ts`, `src/cli/sync/KeyGrain.ts`, tests

  - [ ] 5.1 **Obtain Peter's dp-portfolio check** (`ls .kiro/sync-manifest.json`) and record it; build migration fixtures for both branches
  - [ ] 5.2 Manifest: path move, format, fields (incl. `posture`), keyed entries (`path#key`; `#region` reserved for Task 16), pruning (**sized ~½ day**)
  - [ ] 5.3 Key-grain JSON manager for `.mcp.json`, `.kiro/settings/mcp.json` and `.claude/settings.json` `permissions.allow` (**sized ~1 day**), incl. the namespace rule (membership = recorded as emitted)
  - [ ] 5.4 Managed-set edit; the two new classifications; `removed` scoping; apply behavior (report first; batch confirm / `--apply`); Applier source-branch deletion
  - [ ] 5.5 Migration: fetch via the consumer's rail (cache first); any-version-in-range; `transforms.js` from the fetched tarball; per-file judgment; relocation; ordering before the registry-pin repair
  - [ ] 5.6 Repairs (5.1 registry pin, 5.2 tsconfig pin) — offered, never silent; after the migration fetch

- [ ] 6. The name contract and the type contract

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Ada (Sonnet); Lina consulted on the bundle and attribution
  **Traces**: Reqs 5A.1–5A.7 · design C7 (name contract), DD10, DD11, DD17, **P1 (YES)**

  **Success Criteria:**
  - `dist/name-contract.json` is produced at build from the **compiled** surface: bundle `var()` names ∪ `getPropertyValue` literals ∪ `ComponentTokens.web.css` references, minus our component tier.
    - **The build fails if the bundle's names are not a subset of the src-derived names.** Bite: inject a bundle-only name → the build fails; recorded.
    - The completion doc records the counts: the design measured 183 `var()` names and 7 `getPropertyValue` reads. **Any difference is attributed.**
  - **The tier filter is semantic ALWAYS · primitive YES · component NEVER.** **Instrument**: `sync.name-contract.test.ts`, with three cases:
    - a removed semantic name → reported;
    - a removed primitive name → reported;
    - a component-tier name absent from the consumer's set → **not** reported.
  - **No generated web output → `cannot check` status, never clean.** Asserted.
  - The report string is string-equal to the catalog row, with the declared use from `.schema.yaml` `tokens:`, the resolved value, and the semantic tier path. Asserted over one fixture.
  - `contractHash` = the content hash of the `.d.ts` contract surface. **Instrument**: changing a `PrimitiveToken` field changes the hash → reported. A comment-only change is reported with the "no member changes detected" string, not silently.
  - *Scope stated*: a clean report establishes **web**-surface name presence only. It says nothing about value suitability or native surfaces (DD17 residual; see Kenya/Data question 2).

  **Primary Artifacts:** `scripts/build-name-contract.ts`, `dist/name-contract.json` (build output), `src/cli/sync/NameContract.ts`, tests

  - [ ] 6.1 `build-name-contract.ts` (bundle + literal reads + component CSS; src attribution; tier from the package index; the subset cross-check)
  - [ ] 6.2 `NameContract.ts` check + the tier filter per P1 + `cannot check` + the report string
  - [ ] 6.3 `contractHash` over the `.d.ts` surface; the type-contract report and remedy string
  - [ ] 6.4 Tests and recorded bites

- [ ] 7. The publish-rail guard and ballot B-U1

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Thurgood (Sonnet)
  **Traces**: Reqs 6.1–6.8 · design C9, DD12, DD13 (split — open input 8)

  **Success Criteria:**
  - `scripts/verify-publish-rail.sh` matches the drawn script: `set -euo pipefail`; exit codes 10 / 11 / 12 / 13 with the named messages; `--self-test-host` exits 12 and never prints `PASS`. **Instrument**: `shellcheck` clean, plus a run of each exit path, output committed.
  - **Three bites are committed** under `scripts/__bites__/`, each red:
    - (1) **the 6.3 verbatim command as written**;
    - (2) the script with `VERSION=99.99.99` → exit 10 `FAIL[version]`;
    - (3) **a PATH-shimmed `npm`** returning a GitHub Packages tarball URL → exit 11 `FAIL[host]`, **through the production line**.
  - **B-U1** is recorded in `.kiro/docs/ballots/` with `Status: RATIFIED (Peter, <date>)` and a `Ratified-machine:` line **before** its edits apply in the same PR. It carries: the RELEASE-FLOW step invoking the script with the paste target `docs/releases/<v>/publish-verification.log`, and the `classification-map` register row (owner `thurgood`, `check_state: armed`, disposition `post-merge — adjudicated; not a PR check`).
  - The register row parses under the register's Entry Schema checklist (inspection, stated as inspection), and a straggler sweep for the RELEASE-FLOW edit is recorded with its command and output.
  - *Scope stated*: the guard proves the version is visible on npmjs and that its tarball host is npmjs. It proves nothing about GitHub Packages or tarball contents.

  **Primary Artifacts:** `scripts/verify-publish-rail.sh`, `scripts/__bites__/`, `.kiro/docs/ballots/<date>-123-b-u1-publish-rail.md`, `.kiro/hooks/RELEASE-FLOW.md`, `governance/classification-map.md`

  - [ ] 7.1 Script + `--self-test-host` + the empty-URL branch
  - [ ] 7.2 The three recorded bites (incl. the PATH-shim harness)
  - [ ] 7.3 Author B-U1 (before→after inventory; straggler sweep); request Stacy's review of the register row; submit for ratification

- [ ] 8. The harvest-zero lint

  **Type**: Implementation · **Validation**: Tier 2 · **Agent (plan)**: Ada (Sonnet)
  **Traces**: Reqs 8.1–8.4 · design C11

  **Success Criteria:**
  - **Lina's rename has merged before this lint merges.** **Instrument**: `find src/components -name "*.refs.ts" | wc -l` → 7 on the U1 branch before 8.2's commit, and the rename issue's archive path is cited. **If the rename has not merged, this parent BLOCKS** — it does not reorder silently.
  - The lint emits the specified warning for a scanned `tokens.ts` / `*.tokens.ts` exporting no branded value. **Instrument**: a fixture with one such file → one warning, exact string.
  - **Against our own source, the lint emits ZERO warnings.** **Instrument**: `npx designerpunk generate` in the repo, with the warning count recorded as 0.

  **Primary Artifacts:** `src/cli/loadComponentTokens.ts`, tests

  - [ ] 8.1 Verify the rename has merged (gate)
  - [ ] 8.2 Per-file branded-export tally + the warning; fixture test; the zero-warning run

- [ ] 9. Consumer-guard extensions and U1 post-diet re-certification (**U1 gating parent**)

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Thurgood (Sonnet); arbiter runs verified in the main session
  **Traces**: Reqs 3.1–3.9 · design C6

  **Success Criteria:**
  - **The 19 C6 cases scheduled for U1 exist as named tests. Each one's bite was run and is recorded red in the subtask doc.**
    - The 19 = design C6's 21 rows, minus `attach --reference stays CONSUME` (Task 16) and minus the post-diet re-certification row, which is the run below.
    - **The list of 19 test names is reproduced in the completion doc**, so the denominator is explicit, not by reference.
  - **The whole consumer guard (`npm run test:consumer`) passes against the POST-DIET pack.** The run's date and commit SHA are cited. *Scope stated*: this re-certifies U1's surface. **The consumer-lane emission half of 3.9 is re-certified at Task 16**, and the U1 completion doc says so.
  - `npm test` and the full `tsc` are green on the U1 branch at parent completion.
  - **Release 1 readiness**: the U1 PR body carries the tripwire line (§ "Split tripwire").

  **Primary Artifacts:** `tests/consumer-integration.test.ts`, fixtures

  - [ ] 9.1 Birth and posture cases (subdirectory launch, tier-only partial, stranger repo, `node_modules` dir, package-mode, unused-local-tier, barrel forms, init refusal)
  - [ ] 9.2 Root and union cases (catalog count, consumer component, fork inheritance, C′ tiers, both launch paths × every row, theme pairing, legacy `core/`, token index fail-loud)
  - [ ] 9.3 Copy cases (local-mode generate; over-rewrite arbiter; brand-survival (a) + (b))
  - [ ] 9.4 Record every bite; run the post-diet re-certification; `npm test` + `tsc` full validation

### UNIT 2 — Consumer generation profile (the § 7.2 machinery; G1 and G2)

> **Framing, carried**: § 7.2's check is **NOT signed off**. No U2 criterion claims the check discriminates. G1 and G2 are the instruments that test it, and **their verdicts are Stacy's**. P2 is ruled **branch A** (design § "Rulings from Peter").

- [ ] 10. Splitter family, span function, and adapter consolidation (steps 1–2)

  **Type**: Architecture · **Validation**: Tier 3 · **Agent (plan)**: Lina (Opus)
  **Traces**: Reqs 10.G, 10.S, 10.8, 10.8a · design C13, C14

  **Success Criteria:**
  - **Golden Bite 1**: `partition.golden.test.ts` passes against the **hand-authored** `expected-units.json`. Each of the following mutations turns it red, and the reds are recorded:
    - collapse to `##`;
    - partition the file instead of the body;
    - trigger the fallback on "no headings";
    - attach heading lines backward.
  - The fixture carries every case enumerated in C13's golden-fixture bullet. **Instrument**: the case list is reproduced in the completion doc and checked against the fixture's headings.
  - **The test file contains no snapshot matcher, and the snapshot directory is absent** — `grep -nE "toMatch(Inline)?Snapshot" partition.golden.test.ts` → 0, and the companion assertion is red when a `__snapshots__/` directory is created (bite recorded). **The protection claim is the reviewed diff** (DD6); this criterion does not claim the provenance key proves authorship.
  - **The partition invariant holds on all nine canonical charters and all eight identity docs**: the byte-identical join is asserted per file, **17 files**, with the count asserted.
  - **The frontmatter entry tree keys list and map fields per member, and commands by `name`.** **Instrument**: an entry-tree test over `canonical/agents/lina.md`'s frontmatter asserts `writeScope[<glob>]` members and `commands[<name>]` keys.
  - **`cc.ts` and `kiro.ts` contain no inline span construction for body or frontmatter.** **Instrument**: `grep -nE "acc\.add\('passthrough'" tools/agent-generator/adapters/{cc,kiro}.ts` → 0 for agent bodies, and every agent-body and frontmatter span is produced through `emitSpans`, asserted by the unit twin.
  - **The steward rendering is byte-unchanged**: 122 diff-guard is green on the branch (sidecars change; rendered text does not).

  **Primary Artifacts:** `tools/agent-generator/{frontmatter,partition,spans}.ts`, `adapters/{cc,kiro}.ts`, `__fixtures__/golden-partition/`

  - [ ] 10.1 `splitFrontmatter` (one shared function); `partition` (fence-aware; leaf units; preambles incl. `#doc:preamble`; the title-aware enumeration fallback; leading-bold slugs; forward attachment)
  - [ ] 10.2 Hand-author `expected-units.json` + the fixture; the snapshot ban + companion assertion
  - [ ] 10.3 The frontmatter entry tree (per-member keying; commands by `name`; structural containment)
  - [ ] 10.4 `emitSpans` for body units and frontmatter entries; replace both adapters' inline sites and frontmatter loops
  - [ ] 10.5 Unit twin `spans.source-origin.test.ts`; the invariant across 17 files; diff-guard green

- [ ] 11. Exemplar operative sets for G1 (step 3)

  **Type**: Setup · **Validation**: Tier 2 · **Agent (plan)**: Thurgood (Opus) coordinating; confirmers per C1; Stacy constructs exemplar G
  **Traces**: Reqs 11.6.5, 11.6.5d, 11.5.2 · design C16, § "Gates" step 3

  **Success Criteria:**
  - Operative-set records exist for **the ten exemplars**: A, B, C(c1), C(c2), D, E, F, Lina-1, Lina-2, and **G** (a gutted `start-up-tasks.md` enumeration item — open input 7).
  - Each exemplar's `confirmer:` equals the C1 function of (owner, profile author) — **checked by the confirmer check**, not by inspection.
  - **Every item's `text` passes the verbatim-substring check** against its canonical unit.
  - Each record's `confirmation:` path resolves to a committed note under `canonical/profiles/consumer/confirmations/`.
  - **C1 carve-out artifacts land in their own PR commits with `Agent: stacy`** (S-D-A8 option (i)). The confirmations on Thurgood-maintained sources, including G, are listed in the completion doc with their commit SHAs.
  - *Scope stated*: the checks establish that **the right seat was declared, and that the text is verbatim**. **They do not establish which seat wrote the note** (one git identity), and they do not establish that the text is complete (the confirmer's responsibility; S-D2-A1).

  **Primary Artifacts:** `canonical/operative-sets/*.yaml` (exemplar units), `canonical/profiles/consumer/confirmations/*.md`

  - [ ] 11.1 Author the exemplar operative-set records (profile author drafts; owners review)
  - [ ] 11.2 Owner confirmations under C1; the carve-out commits as `Agent: stacy`
  - [ ] 11.3 **Stacy constructs exemplar G** (always-set member + enumeration kind) and its expected verdict
  - [ ] 11.4 The confirmer check + verbatim-substring check run green over the exemplar records

- [ ] 12. **G1 — C3's falsification pass** (step 4)

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: **Stacy (Opus)** — the verdict is hers
  **Traces**: Reqs 11.6.7, 11.6 · design § "Gates and sequencing" (G1), P2 (branch A)

  **Success Criteria:**
  - `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification.md` exists, **authored by Stacy, and states exactly one verdict: HOLDS, BREAKS or NOT-RUNNABLE**. It carries the exemplar-by-exemplar trace for all ten exemplars.
  - **The record carries the G1 domain line**: the unit kinds and domains exercised, and any not exercised written "not exercised". It also carries Stacy's closed-negative disclosure that she confirmed exemplars A, B, C, D and E as owner.
  - **The branch taken is executed and evidenced**:
    - HOLDS → Task 13 proceeds;
    - BREAKS → C3 rework by Thurgood, then G1 re-runs, with **each run's record kept** (never overwritten);
    - **on the second consecutive BREAKS → P2 branch A**: C18's clause 2 is removed, every unit routes, the 24.3 labelling is applied, and G2's scope half (2) is later recorded "NOT APPLICABLE — no mechanical floor (P2 branch A)".
  - **No C18 (triviality) code exists on the branch before this record states HOLDS, or before branch A is invoked.** **Instrument**: the commit timestamp of the first `triviality.ts` commit is compared with the record's commit (git log, cited).

  **Primary Artifacts:** `completion/re-grounding-c3-falsification.md` (and per-run records if re-run)

  - [ ] 12.1 Stacy runs G1 against the committed exemplar records and authors the record
  - [ ] 12.2 Execute the verdict's branch (rework loop / branch A) and record it

- [ ] 13. Triviality floor, dispositions, overlays, signatures, and freshness (step 5)

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Thurgood (Opus) for schemas and records; Lina (Opus) for generator code
  **Traces**: Reqs 11.2, 11.3, 11.5, 11.6 · design C16, C17, C18, DD19, DD25, DD26

  **Success Criteria:**
  - **The triviality entry set is every body unit not byte-identical passthrough.** **Instrument**: a test where a unit altered by one byte enters the set and an untouched unit does not.
  - **The one-sided floor matches complete item `text`.** **Instrument**: exemplar Lina-2's construction (titles kept, bodies cut) scores 0/7 and ROUTES; a fully verbatim unit with a subtraction-1 removal ROUTES. **Under P2 branch A, clause 2 is absent and every entry-set unit routes** — asserted by a configuration test.
  - **The hard floor fails** a fixture charter whose every unit with a non-empty item set is `no-consumer-counterpart`, **including when a zero-item preamble is left retained**.
  - **These refusals and checks each have a named test whose bite is recorded**, and each emits its exact catalog string:
    - orphaned key;
    - missing row;
    - wrong confirmer;
    - wrong signer;
    - stale signature;
    - bare signature;
    - stale overlay;
    - item text not verbatim;
    - `repo-bound-in-entirety`.

    **Nine checks — the count is asserted in `signatures.test.ts` / `derive.keys.test.ts` / `operative-set-freshness.test.ts`.**
  - **`operative-set-freshness` runs inside `122-diff-guard`.** Did-it-really-run bite: a canonical unit edited without re-confirmation makes `npx tsx tools/agent-generator/diff-guard.ts` exit non-zero (recorded). A test asserts diff-guard invokes the sweep.
  - **The C2 counting-block edit** to the claims-pass template is committed. It adds the `no-consumer-counterpart` rate per agent and the per-signer assent rate, with the *baseline-in-123 / not-at-first-render* annotation. Stacy's coordination is recorded as her on-branch review comment or message, cited.
  - *Scope stated*: these tests establish the **mechanics** of the floor and records. **Whether the check discriminates is G2's question.**

  **Primary Artifacts:** `tools/agent-generator/regrounding/triviality.ts`, `tools/agent-generator/derive.ts` (key checks), the dispositions/overlay/signature schemas + validator, `tools/agent-generator/diff-guard.ts`, `canonical/agents/stacy.md` (the counting block)

  - [ ] 13.1 Dispositions schema (body / frontmatter per-member / shared / always-set; explicit rows; `repo-bound-in-entirety` rejected; ambient embeds cannot re-point)
  - [ ] 13.2 Overlay format with pinned hashes; signature schema; stale and bare checks
  - [ ] 13.3 Confirmer and signer checks against the C1 function; verbatim-substring check
  - [ ] 13.4 `triviality.ts` (entry set; floor on complete text; subtraction-removal routing; hard floor; the branch-A configuration)
  - [ ] 13.5 Orphaned-key and missing-row refusals
  - [ ] 13.6 `operative-set-freshness` sweep inside `diff-guard.ts` + the did-it-really-run bite + the invocation test
  - [ ] 13.7 The C2 counting-block edit to the claims-pass template (canonical charter; regenerate; coordinated with Stacy)

- [ ] 14. Derivation checker, grain guard, and per-target bites (step 6)

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Lina (Opus)
  **Traces**: Reqs 11.4, 10.G, 10.S, 10.8b/c · design C15, DD7

  **Success Criteria:**
  - **`checkDerivation` resolves containment through the partition tree and the entry tree only.** Unknown anchors return non-matching. **Instrument**: attack (a) returns `FAIL_NO_DERIVATION`; the honest re-pointing (E) returns `VERIFIED`; a `#body` anchor returns non-matching without throwing.
  - **Golden Bite 2**: `grain-guard.two-sided.test.ts` — under the `##` collapse the honest `###` re-pointing is REJECTED; recorded.
  - **Body per-target bite, two-sided**: mutating `cc.ts`'s call site gives **`semantics-guard.test.ts › cc` = `FAIL_NO_DERIVATION` and `› kiro` green**, and the symmetric pair likewise. **The verdict value is asserted, not just red.** Both logs are committed.
  - **Frontmatter per-target bite (E-fm), two-sided**, on `writeScope[<glob>]`: `› <target> › frontmatter`, with the same pattern and logs. **OR** the completion doc carries `frontmatter routing: asserted, not bitten — <reason>` (open input 6's forced-negative path).
  - `derivation.frontmatter.test.ts`: emptying `commands[<name>]` with a sibling destination → `FAIL_NO_DERIVATION`.
  - **The per-target guard is one file, iterating the targets from `canonical/consumer-profile.yaml`.** **Instrument**: adding a fake third target to a test copy of the profile adds a third `describe` block with no other edit.

  **Primary Artifacts:** `tools/agent-generator/regrounding/derivation.ts`, `semantics-guard.test.ts`, `grain-guard.two-sided.test.ts`, `derivation.frontmatter.test.ts`, `__fixtures__/` (agent-shaped E and E-fm fixtures)

  - [ ] 14.1 `derivation.ts` over both trees; unknown-anchor handling
  - [ ] 14.2 The agent-shaped fixture carrying E via `generateFixture` (~1–2 h)
  - [ ] 14.3 Body per-target guard + the two-sided bites (~30 min each)
  - [ ] 14.4 **E-fm** fixture + the frontmatter per-target bites (or the recorded forced-negative)
  - [ ] 14.5 Grain guard (Bite 2) + `derivation.frontmatter.test.ts`

- [ ] 15. Consumer rendering and first render (step 7)

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Thurgood (Opus) authoring overlays and dispositions; signers per C1; Lina for `derive.ts`
  **Traces**: Reqs 9, 9.5, 11, 12, 13, 14.8–14.9 · design C12, C19, C22, DD18, DD20

  **Success Criteria:**
  - `canonical/consumer-profile.yaml` exists with `targets: [cc, kiro]` and `defaultTarget: cc`. **A grep for any other declared target list** across `tools/agent-generator/` and `src/cli/` returns only imports of this file (sweep command and output recorded).
  - **`derive()` produces `canonical/_consumer-output/_canonical/`** (rendered once), and **`canonical/_consumer-output/<target>/` covers all 8 agents and the identity member files for both targets**. `guardedRoots()` includes all three roots, and 122 diff-guard is green.
  - **Identity members**: the rendered member files contain **no frontmatter carried from the source**. Kiro member files carry exactly `id` + `inclusion: always`, and all files are prefixed `designerpunk-<id>.md`. **Instrument**: a test over the rendered output.
  - **Every consumer-profile unit and entry for all 8 agents, all shared members and all 8 identity docs has an explicit disposition row.** **Instrument**: the missing-row refusal passes over the full profile, with the unit, entry and row counts per agent recorded.
  - **The first-render routing is complete**:
    - every ROUTED row carries a signature by the C1-correct signer;
    - the per-agent `no-consumer-counterpart` rate and the per-signer assent rate are recorded in the completion doc **labelled "first render — not a baseline"**;
    - the hard floor passes for all 8 charters.
  - `derive()` refuses on a stale overlay and on an orphaned key in steward CI (the Task 13 tests pass over the real profile).
  - *Scope stated*: rendering and signatures establish **that each disposition was declared and signed by the right seat**. **The discriminating power of the check is G2's question**, and seat authorship is not establishable (one git identity).

  **Primary Artifacts:** `canonical/consumer-profile.yaml`, `canonical/profiles/consumer/**`, `canonical/operative-sets/**` (all units), `tools/agent-generator/{derive,generate}.ts`, `canonical/_consumer-output/**`

  - [ ] 15.1 `consumer-profile.yaml`; `AdapterContext.profile`; `generateConsumerRendering`; `guardedRoots()` extension
  - [ ] 15.2 `derive.ts` (body + frontmatter; hash-pin refusal; orphan refusal); `_canonical/` rendered once
  - [ ] 15.3 `emitIdentityMembers` per target (prefixed files; fresh Kiro frontmatter; the CC import region content)
  - [ ] 15.4 Author operative sets for all units and dispositions/overlays for all 8 charters, the shared substrate and the 8 identity docs (profile author)
  - [ ] 15.5 First-render routing: confirmations and signatures per C1 (carve-out artifacts as `Agent: stacy` commits); rates recorded

- [ ] 16. Consumer emission lane, `attach`, the `init` agent layer, and generated-surface `sync`

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Lina (Sonnet)
  **Traces**: Reqs 13, 14.1–14.4, 15A.1, 19.2, 19.7, 5.6 · design C20, C1 (agent-layer rows), C5 (deferred `files[]` rows), C7 (generated surfaces, region grain), DD22; § "Sequencing decisions" 1–4

  **Success Criteria:**
  - **`emitConsumer` reads only the shipped inputs in C20's table**, resolved **`packageRoot`-relative**. **Instrument**: `consumer-entry.paths.test.ts` asserts that every input is under `packageRoot`, every output is under `consumerRoot`, and they differ for `.kiro/steering/…` on Kiro. `registry.fromManifest` is used, and no server process starts (asserted).
  - **The packed install emits a working consumer agent layer for both targets.** **Instrument**: the consumer guard's re-certification of 3.9's lane half — pack → `init --target=cc` and `--target=kiro` in scratch dirs → the expected file set and keys are present, **and the emitted charters contain zero occurrences of `complete-task.sh|Peter merges|RATIFIED`**. *Scope: that grep is clause (i)'s deny-list shape. It is evidence about those tokens, not about re-grounding quality, which is G2's question.*
  - `init`'s agent-layer rows (removal of 6/7/7b; `attach` path; the manifest records generated files and `attachedTargets`) and the deferred `files[]` rows (the three removals; the eight identity docs) are implemented. **Instrument**: `init.test.ts` rows plus Task 3's pack assertion script re-run with the deferred rows enabled.
  - **`attach`**:
    - refuses in unborn (without `--reference`) and partial repos with the exact strings;
    - `--reference` writes a `posture: 'consume'` manifest;
    - **the C6 case `attach --reference stays CONSUME` passes, and its bite is recorded red.**
  - **Region grain**: the `CLAUDE.md` marker region is extracted and spliced. Content outside the region is byte-unchanged after `sync`. Missing markers → the markers-missing string, with no write. **Instrument**: `sync.region.test.ts`, sized ~1 day (open input 3).
  - `sync` generates the package side for `attachedTargets` only. A deleted generated file is `deleted-by-you` and not re-added. **Instrument**: `sync.classify.test.ts` generated-surface cases.
  - Consumer-profile degradation: an unresolvable member → the warning string, the charter emitted without it, exit 0 (`consumer-entry.degradation.test.ts`, bite recorded).

  **Primary Artifacts:** `tools/agent-generator/consumer-entry.ts`, `build:generator`, `src/cli/attach.ts`, `src/cli/init.ts`, `src/cli/sync/RegionGrain.ts`, `package.json`, tests

  - [ ] 16.1 `consumer-entry.ts` + `build:generator` (esbuild; plain `node`; `prepack`)
  - [ ] 16.2 `attach` (modes; refusals; the vocabulary object in help text; safe re-run)
  - [ ] 16.3 `init` agent-layer rows; the deferred `files[]` rows; manifest recording of generated files
  - [ ] 16.4 Region extractor + splicing applier (**sized ~1 day**); generated-surface `sync`; `attachedTargets` generation
  - [ ] 16.5 The `attach --reference` C6 case; the lane half of the 3.9 re-certification from a packed install

- [ ] 17. Legacy-path deletion and ballot B-U2

  **Type**: Implementation · **Validation**: Tier 2 · **Agent (plan)**: Lina (Sonnet); Thurgood (Sonnet) for B-U2
  **Traces**: Reqs 14.5–14.7 · design C21, DD13 (split)

  **Success Criteria:**
  - **`check-package-name-drift.js` no-ops on a missing directory, and `'product-template'` is removed from `SCAN_DIRS` — both in a commit that precedes the deletion.** **Instrument**: a test runs the script with a nonexistent scan directory → exit 0. Git order is cited.
  - `product-template/` is deleted, and **each sweep entry carries its verb** (removed / edited / verified-historical-left-unedited). A repo-wide grep for `product-template` returns only the verified-historical sites, with command and output recorded.
  - **B-U2** is recorded RATIFIED, with its `Ratified-machine:` line, before the `classification-map` L686 edit applies in the same PR.
  - `npm run prepublishOnly` (or its drift step) passes after the deletion.

  **Primary Artifacts:** `scripts/check-package-name-drift.js`, `product-template/` (deleted), `governance/DesignerPunk-Integration-Guide.md`, `governance/classification-map.md`, `.kiro/docs/ballots/<date>-123-b-u2-legacy-path.md`

  - [ ] 17.1 `SCAN_DIRS` removal + the no-op + its test (first commit)
  - [ ] 17.2 Delete `product-template/`; the Integration Guide § 4b teaches `attach`; the grep sweep recorded
  - [ ] 17.3 B-U2 (L686) record-first; the ratified edit

- [ ] 18. **G2 — pass four** (step 8; **U2 gating parent and acceptance gate**)

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: **Stacy (Opus) — author recused; Stacy signs**
  **Traces**: Reqs 11.8, 24.3 · design § "Gates and sequencing" (G2)

  **Success Criteria:**
  - `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` exists, **authored by Stacy, and states exactly one verdict: PASSES, FAILS or NOT-RUNNABLE**.
    - **Scope half (1)** is attack (a) verbatim.
    - **Scope half (2)** is that the check reads the committed operative-set record. **Under P2 branch A, half (2) reads "NOT APPLICABLE — no mechanical floor (P2 branch A)"**, never a pass.
  - **The record carries the domain line** naming body / frontmatter / always-set as exercised or "not exercised" (never implied).
  - **The verdict's consequence is applied as an artifact edit in this PR**:
    - PASSES → the U2 completion doc's 24.3 table lists (v)'s mechanical half as deterministic **for the named domains only**;
    - FAILS or NOT-RUNNABLE → the Fork A demotion edit.
    - **A G2 that could not run because G1 stood at BREAKS is not recorded as NOT-RUNNABLE.** In that case U2 is not submitted.
  - **This parent's completion doc is authored by Stacy's seat, and Thurgood authors no line of it** (recusal). The U2 PR body states the recusal.
  - The U2 PR body carries the tripwire line. `npm test` and full `tsc` are green on the branch.

  **Primary Artifacts:** `completion/re-grounding-pass-four.md`; the U2 completion doc's 24.3 table

  - [ ] 18.1 Stacy runs pass four and authors the record (both halves; domain line)
  - [ ] 18.2 Apply the verdict's artifact edit; the unit's full validation; open the U2 PR

### UNIT 3 — Onboarding

- [ ] 19. The install doc

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: Thurgood (Opus); Leonardo reviews on-branch
  **Traces**: Reqs 15.1–15.9, 15B.1–15B.9, 22.2 · design C23

  **Success Criteria:**
  - `docs/consumer/INSTALL.md` front-matter declares `path-steps: { founder: 5, joining: 5, joining-cross-harness: 6, reference-no-init: 3 }`. **A test counts the numbered items in each path list and asserts equality with the front-matter** (the U5 22.2 assertion's instrument, built here). *Scope: it counts the doc's own steps, never a run's.*
  - The section order matches C23 (Prerequisites → posture choice → CONSUME → BECOME → language vs updating surface → missing token → agent layer → second harness → joining → CI needs → ownership). **Instrument**: a heading-order test.
  - **The 119-B doc lint passes**: section-less routes, no emitter list, no MCP-routed identity links, no new aliases.
  - **The approval instruction is harness-agnostic** ("if your harness asks") until Task 26 corrects it — asserted by string.
  - The terms come from `vocabulary.ts` (five lifecycle verbs incl. `attach` with its object). **The consistency test establishes 15B.5 only. 15B.3 is evidenced at U5 by persona (c)** — both stated in the completion doc (A15, R26.8).
  - Leonardo's on-branch review is recorded, with every item dispositioned.

  **Primary Artifacts:** `docs/consumer/INSTALL.md`, `src/cli/shared/vocabulary.ts`, tests

  - [ ] 19.1 `vocabulary.ts`; the install doc in C23's order with prerequisites
  - [ ] 19.2 The path-step counting test; the heading-order test; the 119-B lint
  - [ ] 19.3 Leonardo's review; fold

- [ ] 20. The commit policy and the `.gitignore` managed block

  **Type**: Implementation · **Validation**: Tier 2 · **Agent (plan)**: Lina (Sonnet)
  **Traces**: Req 15A.1a · design C24, DD1 (derived; overturnable), DD21

  **Success Criteria:**
  - `docs/consumer/COMMIT-POLICY.md` reproduces the C24 table.
  - `init` emits a `.gitignore` marker region that **ignores exactly `token-index/` and `.designerpunk/`**, and carries the commented platform-output line **with the consumer's configured `outputDir` filled in**. **Instrument**: `init.test.ts` with two configs (default and custom `outputDir`), asserting the literal path.
  - **The `.gitignore` region round-trips through `sync`**: consumer lines outside it are byte-unchanged (`sync.region.test.ts` case).
  - A fixture project with the policy applied, cloned fresh, runs the joining path's steps 2–3 (`npm install`, `generate`) successfully **with no uncommitted input missing**. *Scope: this proves the policy's completeness for generation, not for every harness's session load (Task 26).*

  **Primary Artifacts:** `docs/consumer/COMMIT-POLICY.md`, `src/cli/init.ts`, tests

  - [ ] 20.1 `COMMIT-POLICY.md`
  - [ ] 20.2 The `.gitignore` region emission (configured path) + the `sync` round-trip case
  - [ ] 20.3 The fresh-clone completeness fixture

- [ ] 21. The starter specs

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: Thurgood (Opus)
  **Traces**: Reqs 16, 17 · design C25, DD15

  **Success Criteria:**
  - `starter-specs/ci-needs/` holds requirements, design and tasks. **Every need carries a P2 bite recipe and a one-line two-sided price.** It includes the **minimal-core need "committed platform output matches `generate`"** with its bite (edit a token without regenerating → red).
  - **Instrument**: a structure test fails if any need lacks a recipe or a price line. The need count is recorded.
  - `starter-specs/thurgood-re-grounding/` exists, and its tasks include a **report of what did not transfer**.
  - `init` scaffolds both into `specs/` and **reports rather than overwrites on collision** (`init.test.ts` case).

  **Primary Artifacts:** `starter-specs/**`, `src/cli/init.ts`

  - [ ] 21.1 Author the CI-needs starter spec (tier list, recipes, prices)
  - [ ] 21.2 Author the re-grounding starter spec
  - [ ] 21.3 Scaffolding into `specs/` with collision reporting; the structure test

- [ ] 22. Personal note, `init` UX, and DD9 confirmation (**U3 gating parent**)

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: Lina (Sonnet); Leonardo confirms DD9
  **Traces**: Reqs 18, 19.3–19.8, 13 · design C26, C27, DD9

  **Success Criteria:**
  - **`generate` creates an absent personal note** from the template with `TODO` slots and prints its name (catalog string). **An all-`TODO` note is treated as absent**, with Req 13's warning. **Instrument**: `generate.personal-note.test.ts` (fresh clone without `.designerpunk/`) + an always-layer test.
  - **Collision strings are truthful**: the `jest.config.js` string matches the catalog row, and next-steps omits steps a skip made untrue. **Instrument**: `init.test.ts` over a pre-populated fixture.
  - **The scaffolded `product/` tree indexes under the product MCP with zero errors and zero unresolved references.** Bite (break a reference in `example-home.yaml`) is recorded red.
  - **DD9 confirmed or flipped** by Leonardo on the U3 branch, with his words quoted. The named-default notice string matches the catalog. **The founder path count is unchanged** (the notice is reading).
  - The U3 PR body carries the tripwire line. `npm test` and full `tsc` are green.

  **Primary Artifacts:** `templates/personal-note.template.md`, `src/cli/{init,generate}.ts`, `product/` scaffold, tests

  - [ ] 22.1 Personal-note template, `init` personalization, `generate`'s create-if-absent, the all-`TODO`-as-absent rule
  - [ ] 22.2 Truthful collision strings; next-steps consistency
  - [ ] 22.3 The product scaffold + validity guard
  - [ ] 22.4 **DD9 confirmation** (Leonardo); the unit's full validation; open the U3 PR

### UNIT 4 — Content policy

- [ ] 23. The banner predicate, guard, and banners

  **Type**: Implementation · **Validation**: Tier 2 · **Agent (plan)**: Thurgood (Sonnet); Ada owns the predicate text
  **Traces**: Reqs 20.1–20.8 · design C28

  **Success Criteria:**
  - `scripts/audience-banner/predicate.ts` implements Ada's predicate. Its header carries the under-inclusion limit.
  - **`audience-banner.test.ts` asserts predicate-match ⇒ banner-present** and reports `N docs match; N carry banners`. Bite: remove one banner → red, recorded. *Scope stated in the test output: predicate coverage, never "the corpus is bannered".*
  - Each banner uses one of the two templates, and states what is worked example and what is transferable (inspection per doc, listed).
  - If the guard is registered as a new CI context, **Stacy's ARMING event fires** (`audit:coverage-map` + `verify-gate-registration.sh`), and the completion doc records that she was notified. If it runs inside an existing lane, the doc names the lane.

  **Primary Artifacts:** `scripts/audience-banner/predicate.ts`, the test, `governance/*.md` (banners)

  - [ ] 23.1 Predicate + guard test + bite
  - [ ] 23.2 Apply the banners to the predicate-matched set; notify owners
  - [ ] 23.3 Registration decision; ARMING notice if applicable

- [ ] 24. U1b backward check, consumer CHANGELOG, and ballot B-U4 (**U4 gating parent**)

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: Thurgood (Opus)
  **Traces**: Req 21.1–21.3, 23.7 · design C29, DD13 (split), DD16

  **Success Criteria:**
  - `.kiro/specs/123-consumer-distribution/validation/u1b-backward-check.md` covers **every** 125-B campaign `governance/` prune. **The denominator is enumerated in the record from `git log` over the campaign's merges** (command and output), not by reference. **Each finding is routed as an explicit message** to its owning agent, cited.
  - `CHANGELOG.md` (consumer-facing) ships in `files[]` with entries for releases 1–3 already cut and a release-4 entry. Pack check: present.
  - **B-U4** is recorded RATIFIED before its edits apply. It carries the release-management-system trio obligation (23.7) and the changelog authoring step (21.2).
  - The U4 PR body carries the tripwire line.

  **Primary Artifacts:** `validation/u1b-backward-check.md`, `CHANGELOG.md`, `.kiro/docs/ballots/<date>-123-b-u4-release-recipe.md`, `governance/release-management-system.md`

  - [ ] 24.1 The U1b check with its enumerated denominator; route findings
  - [ ] 24.2 `CHANGELOG.md` + `files[]` entry
  - [ ] 24.3 B-U4 record-first; the ratified edits; open the U4 PR

### UNIT 5 — Validation & closeout

- [ ] 25. The persona trio

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: Thurgood (Opus) operating persona sessions; Leonardo persona owner
  **Traces**: Reqs 22, 23, 24.2a, 25.1, 25.5, 15B.3 · design C30

  **Success Criteria:**
  - **Three run records** exist at `validation/trio-<n>-<persona>.md`, one per persona (a, b, c), each run against a packed install with no DesignerPunk source access, on its committed fixture. **Targets are distributed across both declared targets** (both appear at least once).
  - **Every record carries every field in C30.** **Instrument**: a record-schema check over the three files, with its field list reproduced in the completion doc. The fields:
    - preconditions;
    - fixture;
    - target;
    - **`harness-user-state`** (clean, or entries recorded);
    - **`first-MCP-load` verbatim**;
    - the C8(c) observations;
    - wall-clock (recorded, never asserted);
    - findings per axis;
    - the forced negative per persona;
    - agents exercised N of 8 / not exercised [named];
    - the stop event from the closed vocabulary;
    - the budget value.
  - **Budgets are agent-turn counts ≥ 3× the persona's declared `path-steps`**, never wall-clock. **A `budget-exhausted` stop is recorded as a finding**, never a pass.
  - **Persona (c)'s record states whether 15B.3's distinction held**, with the evidence quoted.
  - **DD9 re-read**: the records' `target` fields and any bare-`init` usage are summarized against Task 22.4's confirmation.

  **Primary Artifacts:** `tests/onboarding-trio/{protocol.md,fixtures/}`, `validation/trio-*.md`

  - [ ] 25.1 Protocol + committed fixtures (a TS service with its own tsconfig/jest; a static site; near-empty)
  - [ ] 25.2 Run (a)
  - [ ] 25.3 Run (b)
  - [ ] 25.4 Run (c)
  - [ ] 25.5 The record-schema check; the DD9 re-read

- [ ] 26. The two cross-target join runs and the install-doc correction

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: Thurgood (Opus)
  **Traces**: Reqs 15A.4, 15A.1 · design C8 (the instrument), C24, DD8

  **Success Criteria:**
  - **Two join records** exist: CC-born → joined as Kiro, and Kiro-born → joined as CC. Each is cloned fresh from a **committed born-repo fixture**, and each carries `harness-user-state` and `first-MCP-load` verbatim.
  - **Only records whose `harness-user-state` is clean are counted as cold.** The completion doc's table lists, per target × {founder-cold (from Task 25), teammate-cold (from this task)}, the observation or **"not observed cold — state not clean"**.
  - The C8(c) observations are recorded: was a committed `.claude/settings.json` honored for server enablement; what did CC's `@`-import of the gitignored personal note do on a fresh clone.
  - **The install doc's approval instruction is edited to the observed truth only for cells observed cold.** Unobserved cells keep the harness-agnostic phrasing. The diff is cited.

  **Primary Artifacts:** `validation/join-cc-to-kiro.md`, `validation/join-kiro-to-cc.md`, `docs/consumer/INSTALL.md`

  - [ ] 26.1 Commit the two born-repo fixtures
  - [ ] 26.2 Join run CC→Kiro
  - [ ] 26.3 Join run Kiro→CC
  - [ ] 26.4 The cold-observation table; the install-doc correction

- [ ] 27. Re-grounding conformance (24.1 two-beat)

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: Thurgood (Opus) operating consumer-Thurgood and consumer-Stacy sessions
  **Traces**: Reqs 24.1–24.6 · design C31

  **Success Criteria:**
  - `validation/conformance-beat-1.md` records consumer-Thurgood executing the re-grounding starter spec against a scratch packed install, **with its bar: did he formalize the spec it assigns — yes or no, and the artifact path**.
  - `validation/conformance-beat-2.md` records consumer-Stacy verifying beat 1's completion claims, **recorded separately**. If beat 1 produced nothing, it reads `not exercised — upstream beat produced no artifact`.
  - **The charter-identity probe** (24.6) runs on consumer-Thurgood and consumer-Stacy. Each answer is checked against **the consumer rendering's** declared domain, routes and out-of-scope list, with the rendered file path cited.
  - The U5 acceptance table labels each 24.3 clause as deterministic / routed / behavioral backstop. **(v)'s mechanical half is listed as deterministic only if G2 returned PASSES, and only for the domains its domain line names.**

  **Primary Artifacts:** `validation/conformance-beat-{1,2}.md`

  - [ ] 27.1 Beat 1
  - [ ] 27.2 Beat 2
  - [ ] 27.3 The charter-identity probe; the 24.3 labelling

- [ ] 28. Closeout (**U5 gating parent**)

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: Thurgood (Opus)
  **Traces**: Reqs 25.2–25.7, 26.7, 23.7, 23.9 · design C32

  **Success Criteria:**
  - **Probe re-run** against the shipped release-4 artifacts (no-init path; banners present; reference section present). **The Evidence cell carries 26.7's scoping sentence** (n=1 on the pre-change artifact; this run is the post-change evidence).
  - **Tarball assertion**: the release-4 `npm pack --json` is compared with `tarball-target.json`, and every difference is attributed.
  - **Product query**: a consumer Leonardo answers `get_product_overview` and `find_screens` over the worked example screen, with the transcript excerpt cited.
  - **Open obligations enumerated with status.** The enumeration comes from design § "Open design inputs", § "What resisted", and this file's § "Carried obligations", **reproduced as a list in the completion doc**. They exit as **committed records under `.kiro/issues/`**, each with an owner and a trigger, walked by the health check:
    - the 23.7 recurring trio;
    - the 23.9 cold-human run;
    - **the 125-B U3 re-attestation**;
    - any `cannot-tell` or not-observed-cold cells.
  - The U5 PR body carries the tripwire line. `npm test` and full `tsc` are green.

  **Primary Artifacts:** `validation/probe-rerun.md`, `.kiro/issues/<date>-123-*.md` (obligation records)

  - [ ] 28.1 Probe re-run with scoping
  - [ ] 28.2 Tarball assertion
  - [ ] 28.3 Product query
  - [ ] 28.4 Open-obligation records (incl. the 125-B U3 re-attestation, 23.7, 23.9); the unit's full validation; open the U5 PR

---

## What resisted tasks grain (round input, not defect)

1. **The `.swift`/`.kt` decision is not mine to make** — it is Kenya's and Data's. Task 3.5 is a landing slot whose content depends on their answer. If they answer after U1 opens, 3.5 may be the last U1 subtask to close.
2. **G1 and G2 outcomes are unknowable at plan time.** Branch A makes G1's repeated-BREAKS path schedulable. **G1 re-runs are unbounded before the second consecutive BREAKS**, so U2's subtask count can grow by the rework loop's commits without the tripwire firing: rework happens inside 12.2, and adds no subtasks. *Stated so the tripwire's silence during a G1 loop is not read as scope stability.*
3. **The first-render signature volume** (Task 15.5) is irreducible (11.5.8) and lands mostly on Stacy's seat (about 2× average). This plan cannot size it more precisely than "every routed unit once". The tripwire counts subtasks, not rows.
4. **Seat authentication** stays declared-not-proven until 125-B U3 (Task 28.4 carries the re-attestation).
5. **Cold-harness observations depend on the operator's machine** (Task 26). If no clean-profile machine is available, cells read "not observed cold". That is honest, and it may leave the install doc less specific than wanted.
6. **The release count assumes no hotfix releases.** A hotfix between units would be a fifth RELEASE pass, with its own record.

---

## What this plan deliberately does not contain

- **The claims passes themselves**:
  - MIDPOINT at U2's merge (`completion/claims-pass-midpoint.md`);
  - RELEASE at each of the four releases;
  - CLOSEOUT at U5's merge (`completion/claims-pass.md`).

  These are post-acceptance audits, Stacy's, **never tasks and never gates**.
- **Any arming of `completion-criteria-parity`** (Q2's guards).
- **Path (A) — canonicalizing the always-set** (deferred; it needs its own ballot).
