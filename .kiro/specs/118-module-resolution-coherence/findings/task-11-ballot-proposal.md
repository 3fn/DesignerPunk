# Task 11.1 — Ballot-Measure Steering Proposal (Module-Resolution Coherence)

**Status**: DRAFT for Peter's approval. **Not applied to steering.** On approval, Task 11.2 applies the approved text and rebuilds the docs MCP index.
**Date**: 2026-06-26
**Spec**: 118 — Module-Resolution Coherence, Task 11.1
**Author**: Thurgood (drafts; Peter approves — agents do not edit steering directly)
**Process**: Ballot-measure model. Each item below gives **target file · rationale · proposed text/diff** so Peter can approve concretely, item by item.

---

## 0. The honest-altitude framing (Thurgood's Task-11 obligation — stated explicitly)

The Task-11 counter-argument to weigh: *codifying the contract while work is in flight risks steering describing an end-state the system has not reached.* That risk does **not** apply here, and here is the precise reason:

- **Increment 3 is COMPLETE and executed in-spec** (Task 9: 9.1/9.2/9.5/9.3/9.4 all done & certified; Group 10 N/A — escape-hatch not elected). The CJS-consistency direction is not merely *committed* — it is **executed on a guard-certified coherent end-state**.
- Therefore there is **no deferred execution to document as cost** within Spec 118. The only forward-looking item is the **banked ESM-modernization prep**, and that is already recorded — correctly and at honest altitude — in `docs/roadmap/m0a-deferred-items.md` (§ "Full ESM modernization"). The ballot **routes to** that record; it does not restate or re-decide it.

So this ballot **codifies settled law** (the contract + the executed direction + the documented exemption + the brand/class-invariant + the two new practices). It does **not** overclaim completion of anything, and it does **not** assert a future practice (notably: repo-wide linting remains an *undecided* future decision, not a practice — Item 5b states this in those words).

**Distinction codified throughout:** *settled contract/direction* → stated as law; *future migration (ESM)* → routed to the roadmap as a triggered, costed, deliberate decision — never folk knowledge, never asserted as done.

---

## 0a. Spec 119 coupling — this ballot codifies CONTENT; 119 owns CONSUMPTION (decided with Peter, 2026-06-26)

Spec 119 (Steering Progressive-Disclosure Redesign) redesigns *how* steering is consumed: a minimal ~9-doc `always` identity layer, with everything else served on demand via the Docs MCP and activated by **per-agent prompt routing tables** (119 explicitly rejected a shared coordinating artifact — and, by the same logic, no new "architecture-alignment" agent is warranted; Thurgood remains the Civitas currency steward). 119 also **relocates** non-identity steering docs from `.kiro/steering/` to `governance/` at project root — and all four of this ballot's targets (RSA, Test-Development-Standards, Technology Stack, BUILD-SYSTEM-SETUP) relocate. Crucially, **119's scope rewrites frontmatter + location only, NOT content** — so this ballot's content edits and 119's later move are orthogonal: the content rides the relocation.

**Therefore this ballot deliberately scopes itself to the contract CONTENT (the law).** It does **NOT** build a consumption/discoverability mechanism (identity-layer pointer, agent routing rows) — that is 119's designed scope. Those two consumption hand-offs are registered as **input to 119**, not done here: see `.kiro/specs/119-steering-progressive-disclosure-redesign/inbound-from-118.md`. Placement decisions below are made by **content-fit**, not by current inclusion tier (an earlier draft's "RSA is always-class" claim was wrong — RSA is `manual`; corrected in Item 1).

---

## BALLOT ITEM 1 — The module-resolution contract as steering law

**Where it lives (proposed):** a new top-level section in **`.kiro/steering/Rosetta-System-Architecture.md`** titled **"Module-Resolution Contract (Spec 118)"**, placed after the existing pipeline-stage sections. RSA is the right home **by content-fit**: it is the Layer-2 cross-project architecture doc that already owns the pipeline/entry-point/component-token surface this contract governs. **(Correction:** an earlier draft claimed RSA is "`inclusion: always`-class" — it is **`inclusion: manual`**. So is BUILD-SYSTEM-SETUP. Placement is therefore a *content-fit* decision, not an inclusion-tier one — see the § "Spec 119 coupling" note above for how this content gets *served*.)

**Rationale:** Spec 118 settled the system's module-resolution law across five seams (runtime mechanism, package own-code, consumer `.ts`, component tokens, authoring style + package-root resolution). Today that law lives only in spec findings. Codifying it as steering makes it the *served* source of truth and gives the Civitas process guard (Item 4) a concrete anchor ("Spec 118 is the single source of truth — readers routed here").

**Proposed text (new section):**

> ## Module-Resolution Contract (Spec 118)
>
> DesignerPunk resolves TypeScript at runtime under a single coherent contract. The contract is organized by **class of code**:
>
> | Class | Code | Resolution rule |
> |-------|------|-----------------|
> | **A — package OWN code** (CLI, generators, exports) | shipped in the package | **Compiled-and-shipped (`dist/`), run as compiled JS.** No runtime-TS loader. The bin invokes `require('../dist/cli/designerpunk.js')` under plain `node`. |
> | **B — the CONSUMER's `.ts`** (config, tokens, components, overrides) | lives in the consumer's repo | **A per-site SCOPED runtime-TS loader** (the Increment-1 Approach-A seam): register tsx scoped → load → unregister. No process-global register. Three seams: config, `resolveTokens`, `loadComponentTokens`. |
> | **C — `__dirname` / package-root assumptions** | package internals | **A single `resolvePackageRoot()` source of truth** (resolve up, self-check for `package.json`, fall back to cwd). All package-root derivations route through it; no bare `__dirname` for package-root. |
> | **C′ — the generated catalog** | token-index + the MCP it feeds | **Reflects the CONSUMER's design system** — components/schemas they add or edit, resolved from the active config/source, not `__dirname`. |
> | **D — the MCP-dev ts-node configs** | MCP servers' dev workflow | **A permanent documented exception** (see "MCP/Browser Exemption Boundary"). Bundled at ship time; no runtime-TS resolution. |
>
> **The one runtime-TS mechanism (non-bundled surface): `tsx`.** ts-node is retired from the governed surface. Component tokens cross the scoped boundary **by return value (branded harvest), not by a shared-singleton side effect.** Authoring is **extensionless CJS** (no explicit `.js`/`.ts` on relative specifiers); no `"type":"module"`.
>
> **Spec 118 is the single source of truth for module resolution.** Downstream questions route here; see `.kiro/specs/118-module-resolution-coherence/`.

**Counter-argument (weigh before approving):** RSA is a *token-pipeline* architecture doc; a reader might expect module-resolution law in a build/tooling doc (BUILD-SYSTEM-SETUP) instead. **Response:** the contract is most load-bearing *for the pipeline/CLI/generator/component-token surface RSA already documents* (the C′/consumer-awareness coupling lives here too). Both docs are `inclusion: manual` and both relocate to `governance/` under Spec 119 — so reachability is identical and is solved by 119's serving model, not by which doc holds it. The choice is pure content-fit; my recommendation is RSA-primary for that reason. If Peter prefers, the contract table can live in BUILD-SYSTEM-SETUP with a one-line pointer from RSA.

---

## BALLOT ITEM 2 — The committed direction (Task 8) + rationale

**Where it lives (proposed):** a short subsection appended to Item 1's new section in **`.kiro/steering/Rosetta-System-Architecture.md`** ("Committed Direction & the ESM path").

**Rationale:** AC2 requires the committed direction and its rationale be documented as law, and that any *deferred execution* document its triggers/cost. Since execution is **not** deferred (Group 10 N/A), the steering text records the direction as settled and **routes the only forward-looking item to the roadmap** rather than restating it.

**Proposed text (subsection):**

> ### Committed Direction & the ESM path
>
> **Direction (Spec 118 Task 8): CJS-consistency, executed in-spec. The escape-hatch was NOT elected** — Increment 3 (3a→3b→3c) executed fully; no `"type":"module"` flip; the `@3fn/core/jest-preset` was never touched. Rationale: the charter goal is to make the system *whole, not modern* — CJS-consistency is the lowest-incoherence end-state (it consolidates an already-CJS surface that works, with zero preset blast-radius), whereas native ESM, even in its best case, would close on a *deferred* execution. Evidence: `findings/direction-decision.md`.
>
> **No deferred cost is owed by this spec** (execution is complete). The future ESM-modernization path is a **deliberate, externally-triggered** migration — not pending work. Its triggers and inventoried cost are recorded on the roadmap: see `docs/roadmap/m0a-deferred-items.md` § "Full ESM modernization". CJS-consistency deliberately banks ~60–70% of the structural prep for that move.

**Counter-argument:** stating "no deferred cost" could read as "nothing left to do ever," masking the real future ESM bill. **Response:** the text explicitly names the ESM path as a triggered future migration and routes to its costed roadmap entry — it draws the *settled-vs-future* line rather than erasing it. That is the AC2/AC3 distinction this ballot is obligated to make.

---

## BALLOT ITEM 3 — The MCP/browser exemption boundary (Task 5.2 / R12)

**Where it lives (proposed):** a new section in **`.kiro/steering/Rosetta-System-Architecture.md`** titled **"MCP/Browser Exemption Boundary"**, immediately following the Module-Resolution Contract section (Class D points to it).

**Rationale:** AC requires the exemption be a *coherent documented boundary*, not a silent carve-out. The full staged artifact is `findings/mcp-browser-exemption-boundary.md`; steering needs the durable summary + the "paired guard" principle so the exemption reads as principled.

**Proposed text (new section):**

> ## MCP/Browser Exemption Boundary
>
> The module-resolution contract governs **non-bundled runtime TS**. Four subsystems are **exempt because bundling resolves their imports at build time** — there is no runtime-TS resolution to govern:
>
> | Subsystem | Bundle | Build |
> |-----------|--------|-------|
> | Application / Docs / Product MCP servers | `dist/mcp/*.js` | `npm run build:mcp` (esbuild, CJS) |
> | Browser bundle | `dist/browser/designerpunk.esm.js` (+UMD/min) | `npm run build:browser` (esbuild) |
>
> The exemption is **not silent**: each exempt subsystem has a **paired boot/smoke guard** (`tests/mcp-boot-smoke.test.ts`, `tests/browser-boot-smoke.test.ts`) wired into the consumer-guard CI lane — a broken bundle fails the lane.
>
> **The MCP servers' own ts-node *dev* configs are a permanent documented exception** (Resolved Decision 2). They serve the servers' development workflow only, never load consumer configs, never touch `loadConfig`. At ship time the servers run as bundles. This is NOT a reconciliation target and NOT a gap in the contract.

**Counter-argument:** duplicating the boundary into steering risks drift from the spec artifact. **Response:** steering carries the *durable principle + the guard-pairing fact*; the operational detail (sentinels, sequencing) stays in the spec finding, which steering cross-references. Drift is bounded to the table, which the post-spec `detect-affected-steering-docs` trigger will flag if `build:mcp`/`build:browser` change.

---

## BALLOT ITEM 4 — Civitas process guard (close-state + single-source-of-truth)

**Where it lives (proposed):** **`.kiro/steering/Test-Development-Standards.md`**, folded into the same new subsection as Item 5a (the CI-enforced-guards practice) — because the close-state guard *is* a guard/CI-lane rule. A one-line pointer is added from the RSA contract section (Item 1 already states "Spec 118 is the single source of truth").

**Rationale:** AC requires steering to state that an issue cannot close as "Resolved" via workaround-only, that Spec 118 is the single source of truth for module resolution, and that this is tied to the non-skippable consumer-guard CI lane (Task 3.2).

**Proposed text (within the Test-Development-Standards subsection from Item 5a):**

> **Close-state integrity (Civitas process guard).** A module-resolution issue cannot close as "Resolved" on a workaround alone — closure requires the **non-skippable consumer-guard CI lane** (`.github/workflows/consumer-guard.yml`, the packed-install arbiter) to certify the end-state. In-repo loads false-green on resolution/packaging surprises and are NOT an acceptable arbiter (the Task-3 false-green lesson). **Spec 118 is the single source of truth for module resolution**; downstream readers are routed there rather than to ad-hoc workarounds.

**Counter-argument:** "single source of truth = a spec" is unusual; steering usually points to steering, and specs close. **Response:** Item 1 *promotes* the contract into served steering (RSA); the spec remains the source of the *evidence and the full inventory*. The guard text routes readers to the spec for depth while RSA carries the law — a deliberate two-tier reference, not a dangling pointer to a closed spec.

---

## BALLOT ITEM 5 — Two new-practices codifications (at honest altitude)

### 5a — CI-enforced-guards practice → `.kiro/steering/Test-Development-Standards.md`

**Rationale:** Spec 118 established a genuine new shared practice: guards are enforced via **required CI**, and new guards attach to the consumer-guard / test-CI lane (Task 3.2). This is a real practice worth codifying.

**Where:** a new subsection under the existing "Linting and Testing Integration" / decision-framework area of Test-Development-Standards.md (the doc already has a "Decision Framework: Linting vs Testing" section to neighbor).

**Proposed text (new subsection):**

> ### CI-Enforced Guards (Spec 118)
>
> Behavioral and structural guards that protect a system invariant are **enforced via required CI**, not by convention. New guards of this kind **attach to the consumer-guard / test-CI lane** (`.github/workflows/consumer-guard.yml`) so they cannot be skipped. The packed-install consumer guard is the **arbiter** for module-resolution and packaging behavior — in-repo loads can false-green on those surfaces and must not be treated as certification.
>
> [Close-state integrity (Civitas process guard) — Item 4 text folds in here.]

**Counter-argument:** this could be read as "every guard must go in the consumer lane," over-generalizing a module-resolution-specific lane. **Response:** the text scopes it to "guards that protect a system invariant" and names the consumer guard as arbiter *for module-resolution/packaging* — it does not mandate the lane for unrelated unit tests. If Peter wants tighter scoping, narrow "Behavioral and structural guards" to "module-resolution and packaging guards."

### 5b — The ESLint-exists tooling fact → `.kiro/steering/Technology Stack.md` + `.kiro/steering/BUILD-SYSTEM-SETUP.md`

**Rationale:** ESLint now exists in the repo — but **narrowly**, scoped to the module-resolution rule on **web source only** (`src/components/**`, Task 4.2/9.4). This is a *tooling fact* to record, NOT a repo-wide-linting practice. Repo-wide adoption is an undecided future decision tracked in `docs/roadmap/m0a-deferred-items.md` (§ "Repo-wide linting adoption").

**Where (Technology Stack.md):** a one-line entry in the tooling list.
**Proposed text:**

> - **ESLint** — present **only** for the module-resolution lint rule on web source (`src/components/**`): bans explicit `.js`/`.ts` extensions on relative imports (CJS-extensionless polarity, Spec 118 Task 9.4). **This is NOT repo-wide linting adoption** — the repo has no general code-quality linting. Repo-wide adoption is an undecided future decision (`docs/roadmap/m0a-deferred-items.md`).

**Where (BUILD-SYSTEM-SETUP.md):** update the stale "Development: uses ts-node" line and add the ESLint fact. See Item 6-adjacent and the doc-coherence audit (Deliverable B) for the ts-node corrections this same doc needs.
**Proposed text (replacing line 58's claim + adding a note):**

> - **Development**: Uses **`tsx`** (the sole runtime-TS mechanism) and `ts-jest` for direct TypeScript execution. *(ts-node retired from the governed surface — Spec 118 Task 9.1. The MCP dev sub-packages keep their own ts-node by design — see the MCP/Browser Exemption Boundary.)*
> - **Linting (narrow)**: ESLint exists **only** for the web-source module-resolution rule (`src/components/**`, Spec 118 Task 9.4) — not repo-wide. `npm run lint` runs this single rule.

**Counter-argument:** recording "ESLint exists" risks future readers assuming linting is a general practice and adding rules ad hoc. **Response:** both placements lead with "only" / "NOT repo-wide" and route the open question to the roadmap — the codification's whole job here is to prevent that over-read. This is the explicit honest-altitude requirement of the Task-11 AC.

---

## BALLOT ITEM 6 — The class-invariant + brand contract (in prose)

**Where it lives (proposed):** **`.kiro/steering/Rosetta-System-Architecture.md`**, as a subsection of the Component Token section (which Spec 124 already partially corrected — see the "do not re-propose" note below), titled **"Cross-Boundary Invariant & the Brand Contract (Spec 124)"**.

**Rationale:** Spec 124 fixed the dual-instance registry split and shipped guards; Spec 118's 9.4 added the source-scan class-invariant guard. The *prose codification* of the invariant + the brand contract's caveats was explicitly flagged for Task 11 (R8 AC3). It belongs near the component-token RSA section that already describes the return-value/harvest model.

**Already-landed — do NOT re-propose:** Spec 124 (commit `fadac0a4`) already corrected RSA's two self-registration claims:
- the diagram line → "Populated by loadComponentTokens() harvest (sole writer)";
- the bullet → "Returns a branded value-map (no self-registration); loadComponentTokens() harvests the brand and is the sole writer to ComponentTokenRegistry (Spec 124)".
This ballot does **not** re-touch those; it **adds** the invariant + brand-caveat prose alongside them.

**Proposed text (new subsection):**

> ### Cross-Boundary Invariant & the Brand Contract (Spec 124)
>
> **Class invariant:** *No mutable-accumulate-then-read-back state crosses the scoped (`scopedTsRequire`) boundary.* A singleton is dangerous across that boundary only if it is **written in one module copy and read back from another**; `scopedTsRequire` loads a second copy of `@3fn/core/build`, so any object compared by shared identity across it desyncs. `ComponentTokenRegistry` was the only such singleton (audit: `unitConverter` stateless, `transformerRegistry` populate-at-init/read-in-same-copy, color maps immutable — all benign when duplicated). It is now pinned by a source-scan guard (`src/build/tokens/__tests__/ClassInvariantGuard.test.ts`) that reds on any `*Registry.{register|add|set|push}(` write reintroduced to the authoring surface.
>
> **The brand contract (Option A):** component tokens cross the boundary **by value**. `defineComponentTokens()` brands its backward-compatible return value with a **non-enumerable string key** (`'@3fn/dp:tokenContract'`, recovered via `getTokenContract`); `loadComponentTokens()` harvests the branded exports and is the **sole writer** to the registry. Four load-bearing caveats: **(1)** the brand is a **frozen string** (value-equal across copies — survives the boundary where identity would not); **(2)** its **non-enumerability is load-bearing** (it must not leak into the flat value-map's enumeration / serialization); **(3)** brand re-application is **idempotent**; **(4)** brand access is via **`hasOwnProperty`** (not prototype-chain lookup). `allowOverwrite` is retired.

**Counter-argument:** this is implementation-detail depth for a steering doc. **Response:** the invariant is a *contract* future component-token authors can violate silently (the exact Spec-117→124 bug), so it earns prose in served steering; the four caveats are the minimum that keeps the brand from being "fixed" into breakage. If Peter finds it too deep, the four caveats can compress to a single sentence + a pointer to `124/findings/isolation-audit.md`.

---

## BALLOT ITEM 7 — RSA-orchestrator rider (SECOND ballot item)

**Where it lives (proposed):** **`.kiro/steering/Rosetta-System-Architecture.md`**, Stage 4 and Stage 5 labels.
**Owner:** Ada (Rosetta accuracy) reviews; this is a doc-clarity polish riding the 118 ballot per the 2026-06-25 scheduling decision. Issue: `.kiro/issues/2026-06-24-rsa-orchestrator-terminology-overload.md`.

**Rationale:** RSA labels two *different* components "orchestrator" — Stage 4 `generateTokenFiles` (pipeline orchestration) and Stage 5 `TokenFileGenerator` (platform-generation orchestration). They are **caller and callee**, not two names for one thing. The shared word misleads. **Disambiguate by LAYER — do NOT unify** (unifying would erase a real caller/callee distinction and introduce an error).

**Proposed diffs:**

> - Stage 4 header/label (RSA:326): `Orchestration (generateTokenFiles.ts)` → **`Pipeline orchestration (generateTokenFiles.ts)`**
> - Stage 5 header/label (RSA:362): `TokenFileGenerator (Orchestrator)` → **`TokenFileGenerator (Platform-generation orchestration)`**
> - Stage 5 entry point (RSA:393): `Generation orchestration: src/generators/TokenFileGenerator.ts` → **`Platform-generation orchestration: src/generators/TokenFileGenerator.ts`**

**Counter-argument:** find-replacing "orchestrator" risks flattening the very distinction we want. **Response:** the proposed edits deliberately *qualify* each label by layer ("pipeline" vs "platform-generation") rather than removing the word — they sharpen the caller/callee distinction. This matches the issue's explicit "disambiguate, do not unify" disposition.

---

## Summary of proposed steering targets (for the ballot)

| Item | Target file | Nature |
|------|-------------|--------|
| 1 — Module-resolution contract | `Rosetta-System-Architecture.md` (new section) | Codify law |
| 2 — Committed direction + ESM path | `Rosetta-System-Architecture.md` (subsection) | Codify direction; route ESM to roadmap |
| 3 — MCP/browser exemption boundary | `Rosetta-System-Architecture.md` (new section) | Documented boundary |
| 4 — Civitas process guard | `Test-Development-Standards.md` (folds into 5a) | Close-state + single-source-of-truth |
| 5a — CI-enforced-guards practice | `Test-Development-Standards.md` (new subsection) | New practice |
| 5b — ESLint-exists tooling fact | `Technology Stack.md` + `BUILD-SYSTEM-SETUP.md` | Tooling fact (narrow; NOT repo-wide) |
| 6 — Class invariant + brand contract | `Rosetta-System-Architecture.md` (subsection; adds to 124's landed edits) | Codify invariant in prose |
| 7 — RSA-orchestrator rider | `Rosetta-System-Architecture.md` (Stage 4/5 labels) | Doc-clarity (Ada reviews) |

**On approval (Task 11.2):** apply the approved text exactly, bump `Last Reviewed` on each touched steering doc, then **rebuild the docs MCP index** (do NOT rebuild now — 11.2, post-approval). Recommend Ada reviews Items 1/2/6/7 (Rosetta accuracy) and Lina reviews Item 3 (she authored the exemption artifact) before apply.
