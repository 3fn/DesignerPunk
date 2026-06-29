# Requirements Document: Steering Relocation & Serving Contract (119-A)

**Date**: 2026-06-27
**Spec**: 119-A - Steering Relocation & Serving Contract
**Status**: Requirements Phase
**Dependencies**:
- **Consumes Spec 121** (COMPLETE): shipped `find_docs` (dual-mode concept/keyword + paginated list; supersedes the removed `get_documentation_map`); `get_section` enhancements (`parent`, `sectionId`, `siblingHeadings`, structured ambiguity prompt); the `matchConfidence: strong | partial | none` discovery signal; and the importable `WORKFLOW_RULES` summary-first constant (`mcp-server/src/rules/workflow-rules.ts`).
- **Consumes Spec 118** (COMPLETE): the Module-Resolution Contract is live in `Rosetta-System-Architecture.md`, `Test-Development-Standards.md`, `Technology Stack.md`, and `BUILD-SYSTEM-SETUP.md`; 118's gate on Specs 122/123 is cleared. 119-A relocates the already-updated versions (frontmatter + location only, not content).
- **Sequenced BEFORE Specs 122/123.** Net sequence: `119-A → 122 → 123 → 119-B`. 119-A defines where docs live and how the MCP is wired — exactly what 122 (Agent Generator) generates path references against and what 123 (Consumer Distribution) distributes/wires.
- **Precedes Spec 119-B** (deferred): per-agent routing tables (incl. the `find_docs` discovery row and the 118 Module-Resolution-Contract routing row, expressed as Spec 122 canonical-source content), the certainty-calibration protocol formalized against the 121 signal + propagated to prompts, and the before/after measurement case study. 119-B content is OUT of scope here and noted as deferred where a reader would expect it.

---

## Introduction

DesignerPunk's steering documentation was designed for progressive disclosure — agents load only the context relevant to the current task — but a structural leak (the always-loaded meta-guide using Kiro `#[[file:...]]` references) bulk-loaded all 89 docs into every session. The leak itself is already fixed (Phase 2, shipped commit `5489b6cf`); this spec does **not** re-spec that fix.

Spec 119 was split into two halves around Specs 122/123. **119-A (this spec) is the foundation: relocation + serving contract**, sequenced before 122/123. It establishes a location-independent way to address documents at the Docs MCP, normalizes filenames, relocates non-identity docs out of the tool-specific `.kiro/steering/` directory into a tool-agnostic `governance/` root, rewires the MCP and packaging surface to the new location, locks a minimal `always`-loaded identity layer, and removes the leak-source meta-guide. **119-B (deferred)** owns per-agent routing tables, the certainty-calibration protocol formalization, and the before/after measurement case study.

**Core architectural principle — addressing plane vs. discovery plane.** 119-A introduces a stable per-doc `id` as the *addressing* primitive (location-independent, immutable, semantically inert). This is deliberately kept decoupled from the *discovery* plane (`find_docs` / `aliases` / domain grouping), which evolves freely. Keeping identification separate from classification is the design win — it is what lets relocation, renaming, and future routing-design (122/119-B) proceed without breaking references.

**Portability-first.** The system must work with the minimum possible Kiro-proprietary surface. Only the small `always`-loaded identity layer relies on Kiro's `inclusion: always`; everything else is served via the tool-agnostic MCP protocol.

**Why addressing is a hard prerequisite, not a nice-to-have (verified 2026-06-27).** The Docs MCP currently resolves documents by **exact-match path lookup** — `documentContent.get(filePath)` with no normalization (`mcp-server/src/indexer/DocumentIndexer.ts`), keyed on `MCP_STEERING_DIR + filename`. The 8 agent prompts contain **60 hardcoded `.kiro/steering/…md` references**, the top hits all being non-identity docs this spec relocates. A naive "relocate + repoint `MCP_STEERING_DIR`, fix prompts later" would open a multi-week window in which every non-identity routing query 404s in the source repo. Resolving by stable `id` closes that window permanently and lets 119-A relocate freely while 119-B/122 does routing *design* on its own clock.

**Scope boundary (relocation is inert where it should be).** Relocation is inert w.r.t. the Application MCP / **component-schema** layer (those reference docs by concept, not steering paths). It is **not** inert w.r.t. the Application MCP / **family-guidance** layer: 22 `companion:` fields in `family-guidance/*.yaml` point at `.kiro/steering/Component-Family-*.md` paths that the relocation moves (Requirement 4, Requirement 8). 119-A scopes **document** addressing only — **section** addressing stays path + heading/parent until roadmap Gap 7.

**Confirmed assumption — Kiro's steering watch scope (resolves former Open Question 2, confirmed with Peter 2026-06-27).** Kiro watches **only** `.kiro/steering/` (project) and `~/.kiro/steering/` (user) for `always`/`inclusion`-mode steering files. Relocating non-identity docs to `governance/` at project root therefore makes them invisible to Kiro's always-load scanner — which is precisely the intended effect. The relocation strategy in Requirement 4 is sound on this basis; no other Kiro discovery mechanism reaches `governance/`.

**AXA reframe integration (2026-06-28).** Spec 119 has been reframed as **Agent Experience Architecture (AXA)** — steering relocation is one pillar, not the whole spec (see `design-outline.md` § "AXA Reframe" and `agent-experience-architecture.md`). For 119-A this reframe adds three things, all bounded by a **severable seam**: (1) the coupling surface is broader than docs — Requirement 1 generalizes to a comprehensive, classified steering-path coupling sweep and Requirement 8 asserts the must-fix subset; (2) the always-set is re-read through the **five AXA ambient classes** — Requirement 6 carries this as a vocabulary overlay (no doc changes inclusion mode in 119-A) and Requirement 14 adds the per-agent five-class ambient-set **design** as 119-A's deliverable; (3) the **manifest *build*** and **capability-catalog *generation*** are explicitly **behind the seam** (severable → 119-B/122) and excluded from the 119-A exit gate. The § "Severable Seam Partition" table is the per-surface authority for what is critical vs. severable.

---

## Requirements

### Requirement 1: Complete Doc Inventory + Comprehensive Steering-Path Coupling Sweep, with Staleness Triage

**User Story**: As the Civitas steward, I want a complete, authoritative inventory of every steering doc AND a comprehensive, classified sweep of every surface that couples to a steering path before any file moves, so that no document is orphaned and no functional surface silently breaks on relocation.

> **AXA-reframe generalization (2026-06-28).** The coupling surface is **far broader than docs and broader than the 8 agent prompts.** The AXA reframe's coupling inventory (design-outline § "AXA Reframe → What the reframe integrates") found steering-path references across `sync-manifest.json`, agent-definition `resources` arrays, `.cursor/mcp.json`, the Docs MCP default dir, `init`/`sync` CLI, `src/figma`, `scripts`, and `src/validators`. This requirement generalizes the inventory from "family-guidance couplings only" to a **comprehensive steering-path coupling sweep, classified by remediation timing** (must-fix-119-A / deferrable / R3-scope-out). AC7 carries the classified inventory; Requirement 8's gate asserts resolution across the **must-fix set**.

#### Acceptance Criteria

1. WHEN the inventory phase begins THEN the system SHALL produce an enumeration of every steering doc with its current path, current `inclusion` mode, and intended post-migration role (identity / relocated / removed).
2. WHEN the inventory is produced THEN the exact doc count SHALL be established and recorded (current state: 89 docs, verified 2026-06-27) rather than left as an estimate range.
3. WHEN determining "what exists" THEN the system SHALL treat the **MCP doc index** as the single source of truth (enumerable via `find_docs`); the inventory SHALL NOT depend on any Documentation Directory artifact (dropped — see Requirement 11).
4. WHEN a doc is inventoried AND found to be content-stale THEN the inventory SHALL **flag** it (triage only) and record it for a separate Thurgood-led governance audit; the inventory SHALL NOT modify document content.
5. IF a doc cannot be assigned a post-migration role THEN the inventory SHALL surface it as an explicit exception for resolution rather than silently dropping it.
6. WHEN the inventory is produced THEN it SHALL additionally enumerate **non-steering reference surfaces that point at steering docs** so relocation does not orphan an inbound reference, specifically: (a) the 22 `companion:` fields in `family-guidance/*.yaml` and the companion-path template in `family-guidance/README.md:32` (verified 2026-06-27), which point at `.kiro/steering/Component-Family-*.md`; and (b) the **reverse coupling** — 3 Component-Family docs that link back into family-guidance via `../../family-guidance/*.yaml` relative paths, which break on the directory-depth change introduced by relocation. These surfaces are the assertion targets of the relocation-integrity gate's family-guidance axis (Requirement 8 AC6) and are remediated under Requirement 4.
7. WHEN the coupling sweep is produced THEN it SHALL enumerate **every surface that couples to a `.kiro/steering/…` path**, classified by remediation timing into three buckets, and the **MUST-FIX-119-A** bucket SHALL be the assertion target of the Requirement 8 gate (AC excludes the gate's existing prompt + family-guidance axes only by being additive to them). The classified inventory (verified this session, 2026-06-28) is:
   - **MUST-FIX in 119-A** (no MCP fallback exists; relocation functionally breaks the surface):
     - `.kiro/sync-manifest.json` — 89 path-keyed entries; SHALL be regenerated with `governance/` keys. Ties to the Requirement 5 `MANAGED_DIRS` repoint (AC5).
     - Agent-definition `resources` arrays — **the steering-doc `file://` entries only** (the doc refs that 404 on relocation). **Scope discipline:** the *decomposition/trim* of these `resources` arrays into the AXA five classes is **AX design behind the seam** (severable, → 119-B/122); only the **relocation-break of their doc entries** is must-fix here.
     - `.cursor/mcp.json` `MCP_STEERING_DIR` **and** the Docs MCP `DEFAULT_STEERING_DIR` default.
     - `src/cli/init.ts` (copies `.kiro/steering` into consumers) **and** `src/cli/designerpunk.ts`.
     - `src/figma/VariantAnalyzer.ts` **and** `src/figma/DesignExtractor.ts` — steering doc-path construction.
     - `scripts/extract-component-meta.ts` — `STEERING_DIR`.
   - **DEFERRABLE** (covered by the Requirement 2 AC3 legacy-path→`id` fallback; swept in 119-B via 122): the **8 agent `-prompt.md` path references** (the 60 hardcoded `.kiro/steering/…md` refs).
   - **R3 / scope-out** (staleness triage, flag-don't-fix per the note below): `src/validators/Stemma*.ts` stale guidance-string constants (some already stale, independent of relocation); `.claude/settings.local.json` Bash allowlist entries.
   - The family-guidance companions (AC6 here / Requirement 4 AC6 / Requirement 8 AC6) are an already-enumerated MUST-FIX axis and are NOT re-listed in this bucket — they remain tracked under Requirement 4.

> **Out of scope (note):** *fixing* content staleness is a separate Thurgood-led audit (R3), not 119-A. The triage (flag, don't fix) is in scope; the remediation is not. The R3-bucket items in AC7 are triaged here and routed to that audit, not remediated by 119-A.
>
> **Seam note (AC7):** the must-fix/deferrable/R3 classification IS the per-surface input to the severable-seam partition (§ "Severable Seam Partition" below). The must-fix set is dependency-critical (gates 122/123); the AX *decomposition* of `resources` arrays and any manifest/catalog *build* is explicitly behind the seam.

---

### Requirement 2: Uniform Per-Doc `id` Addressing at the Docs MCP

**User Story**: As an agent (or a 122-generated prompt) that references docs, I want to address a document by a stable per-doc `id` rather than its physical path, so that relocation and renaming never break references.

#### Acceptance Criteria

1. WHEN the addressing change is applied THEN every doc (all 89) SHALL carry a unique frontmatter `id`, following the convention of a kebab-slug of the document title.
2. WHEN a path-taking Docs MCP tool receives a request THEN it SHALL resolve the document by its stable `id`, not by exact-match physical path. The exact path-taking tool set the resolver SHALL cover is: `get_document_summary`, `get_document_full`, `get_section`, `list_cross_references`, and `validate_metadata`. (`find_docs` is excluded — it takes no path.)
3. WHEN a legacy `.kiro/steering/…md` path is supplied during the transition window THEN the resolver SHALL fall back to mapping that legacy path to the doc's `id` so existing references continue to resolve until they are swept; this fallback SHALL be documented as transition-only and removable after the sweep. The fallback map's **keyspace SHALL be the original, pre-rename, pre-relocation `.kiro/steering/…` path strings** — covering BOTH all 60 prompt references AND all 10 renamed space-bearing files (which undergo rename AND relocation). Keying on any post-rename or post-relocation form would 404 references such as `.kiro/steering/Cross-Platform vs Platform-Specific Decision Framework.md` during the window. This resolver is the mechanism the relocation-integrity gate (Requirement 8) depends on.
4. WHEN the Docs MCP indexes documents THEN it SHALL index from a **single, governance-only root** (the relocated `governance/` set); identity docs are always-loaded and need not be MCP-served, so they are NOT in the indexed corpus. This is consistent with every doc carrying an `id` (AC1): the `id` is an on-disk frontmatter attribute, not an index-membership claim — see AC8.
5. WHEN the doc corpus is built THEN a **build-time uniqueness guard** SHALL fail the build if any two docs share an `id`. This guard SHALL operate over the **on-disk corpus across both roots** (`governance/` and the identity docs remaining in `.kiro/steering/`), NOT over the MCP index — so identity docs carrying an `id` is fully consistent with the governance-only indexed serving root (AC4).
6. WHEN a steering doc is created or modified THEN a Thurgood metadata-validation hook SHALL enforce the invariant "every doc has a unique `id`." Like the build-time guard (AC5), this hook SHALL operate over the **on-disk corpus across both roots**, not the MCP index.
7. WHEN the `id` grammar is defined THEN it SHALL be designed as one coherent composite addressing grammar `docid#sectionid` where the doc `id` is unique corpus-wide and a (future) section `id` is unique within its doc; the grammar SHALL be semantically inert (no taxonomy, numbering, ordering, or hierarchy encoded in the string) and `id`s SHALL be immutable once assigned (a rename changes the filename, a title edit never changes the `id`; `aliases` absorbs any rare forced `id` change).
8. WHEN 119-A is implemented THEN section-`id` embedding SHALL NOT be implemented (it remains deferred to roadmap Gap 7); the grammar SHALL be designed so as not to preclude it, and a cross-link between Gap 7 and this addressing grammar SHALL be recorded in MCP-Evolution-Roadmap noting that Gap 7's trigger ("122-generated agents persisting IDs / cross-refs addressing by ID") is now firing.
9. WHEN the resolver is built THEN the implementation SHALL be recognized as **net-new MCP code** (not a config tweak), comprising at minimum: extracting `id` in `frontmatter-parser.ts`, adding `id` to the `DocumentMetadata` type, building an `id→path` index in `DocumentIndexer`, and `id`-first resolution in `getDocumentContent` (with the AC3 legacy-path fallback as the secondary lookup). The doc `id` SHALL be defined as the **slug of the frontmatter `name:` field, falling back to the document H1** when `name:` is absent.

> **Note:** the 89-doc `id` backfill is absorbed into the relocation pass (Requirement 4), which already opens every file. This requirement defines the resolver and grammar; the backfill is executed as part of relocation. AC1 keeps `id` on all 89 docs (identity docs included); AC4–AC6 explain why that is consistent with a governance-only MCP index.

---

### Requirement 3: Steering Filename Normalization (Mass-Rename)

**User Story**: As a maintainer of the steering corpus, I want a uniform kebab-case/no-spaces filename convention with the space-bearing files renamed, so that filenames are tool- and shell-safe and decoupled from document identity.

#### Acceptance Criteria

1. WHEN the filename convention is established THEN it SHALL specify kebab-case with no spaces for steering-doc filenames, and SHALL be recorded as the project's steering-filename standard (none exists today — this establishes one).
2. WHEN the rename is applied THEN the 10 space-bearing files SHALL be renamed to the convention (verified set, 2026-06-27: `00-Steering Documentation Directional Priorities.md`, `A Vision of the Future.md`, `Browser Distribution Guide.md`, `Completion Documentation Guide.md`, `Core Goals.md`, `Cross-Platform vs Platform-Specific Decision Framework.md`, `Personal Note.md`, `Release Management System.md`, `Start Up Tasks.md`, `Technology Stack.md`).
3. WHEN a file is renamed THEN its stable `id` SHALL be unchanged (the rename touches only the filename; references resolve by `id` per Requirement 2).
4. IF a renamed file is an identity-layer doc that remains in `.kiro/steering/` (e.g. `Core Goals.md`, `Start Up Tasks.md`, `Personal Note.md`) THEN the rename SHALL still apply to it, and any `always`-inclusion wiring that references it by filename SHALL be updated accordingly.
5. WHEN the rename is sequenced THEN it SHALL occur after `id` addressing (Requirement 2) and before relocation (Requirement 4), so that identity-from-filename decoupling is in place before either operation.

> **Note:** the rename set spans both identity docs and relocated docs because the *filename* convention is corpus-wide even though *relocation* (Requirement 4) applies only to non-identity docs.

---

### Requirement 4: Relocate Non-Identity Docs to `governance/`

**User Story**: As the architect of a portable system, I want non-identity docs moved out of the tool-specific `.kiro/steering/` directory into a tool-agnostic `governance/` root that ships in `@3fn/core`, so that context delivery does not depend on any Kiro-specific directory.

#### Acceptance Criteria

1. WHEN relocation runs THEN every non-identity doc SHALL be moved from `.kiro/steering/` to `governance/` at project root.
2. WHEN relocation runs THEN the ~9 identity-layer docs (Requirement 6) SHALL remain in `.kiro/steering/` and SHALL NOT be moved.
3. WHEN a doc is relocated THEN its document **content** SHALL be unchanged; only its location (and, per Requirements 2–3, its frontmatter `id` and filename) SHALL change. (Docs updated by Spec 118 are relocated in their already-updated form.)
4. WHEN relocation is complete THEN every relocated doc SHALL be reachable via the Docs MCP (indexed and `find_docs`-discoverable) by its stable `id`.
5. WHEN relocation is identified for risk THEN it SHALL be treated as 119-A's highest-risk operation, with a defined rollback path (revert the move commit and restore the prior `MCP_STEERING_DIR` wiring).
6. WHEN the `Component-Family-*.md` docs are relocated THEN the relocation pass SHALL update the **inbound family-guidance coupling** so no companion path is orphaned: the 22 `companion:` values in `family-guidance/*.yaml` (verified 2026-06-27) AND the companion-path template in `family-guidance/README.md:32` SHALL be re-pointed, and the 3 reverse-coupling `../../family-guidance/*.yaml` relative links in the Component-Family docs (Requirement 1 AC6) SHALL be corrected for the new directory depth.
7. WHEN deciding HOW to re-point the `companion:` field (AC6) THEN the **critical path SHALL use by-`governance/`-path re-pointing (option b)** to keep the relocation **code-free**, with **by-`id` re-pointing (option a) deferred to 122** (per Lina, to keep the seam code-free): option (b) re-points the 22 `companion:` values to the new `governance/…` physical path — no `FamilyGuidanceIndexer` change required — whereas option (a) (migrate `companion` to the doc's logical `id`) requires a `FamilyGuidanceIndexer` change to resolve companion by `id` rather than `path.resolve` + `fs.existsSync` (`FamilyGuidanceIndexer.ts:50-52`) and is therefore pushed to 122 where the indexer work belongs. Whichever is in force, the result SHALL introduce **no new family-guidance companion-path warnings** (the assertion in Requirement 8 AC6). **Companion remediation atomicity:** the relocate + re-point SHALL land as **one change** (single commit/operation) so component health never **transiently degrades** — a relocated `Component-Family-*.md` whose `companion:` re-point lagged would fire `FamilyGuidanceIndexer` warnings in the window between the two edits.

> **Design-phase choice — RESOLVED for the critical path (2026-06-28):** companion-by-`governance/`-path (option b) is the 119-A critical-path move (code-free, keeps the seam clean); companion-by-`id` (option a) is **deferred to 122** (it carries the `FamilyGuidanceIndexer` change). This resolves the prior "decide at design" flag in favor of the code-free path, consistent with the severable-seam discipline.
8. WHEN any ambient routing/manifest/catalog artifact is committed during 119-A THEN it SHALL satisfy the **"generate, don't curate" interim governance invariant**: **no hand-curated capability catalog, ground-truth manifest, or routing artifact SHALL be committed without (i) a tracked 122-replacement obligation AND (ii) a named owner.** Rationale: a hand-curated map is itself the drift surface 119-A is removing (`agent-experience-architecture.md` §5.1 + §8 Q4 — "until 122 ships, hand-edits temporarily *are* the drift surface we warn against"); committing one without a tracked replacement obligation is exactly how it becomes the next permanent meta-guide. This invariant applies to any interim hand-curation the always-layer design (Requirement 14) might tempt before 122 exists.

> **Interim invariant (AC8) scope:** this guards the *119-A→122 window*. It does not forbid interim hand-curation outright (sometimes necessary before 122 lands) — it forbids **untracked, unowned** hand-curation. The replacement obligation + owner are the receipt that the artifact is provisional, not permanent.

---

### Requirement 5: Rewire the MCP and Packaging Surface to `governance/`

**User Story**: As a consumer of `@3fn/core` and as the Docs MCP operator, I want the env var, packaging, and tooling wiring updated to the new `governance/` location, so that the MCP indexes the right directory and product repos resolve docs correctly.

#### Acceptance Criteria

1. WHEN the relocation is applied THEN `MCP_STEERING_DIR` SHALL point to the new governance location (`…/@3fn/core/governance` in product repos; the indexed root in this repo). The env var **name** SHALL be retained as a stable API contract (renaming is a breaking change deferred to a future major version).
2. WHEN packaging is updated THEN the `@3fn/core` `package.json` `files[]` field (currently ships `.kiro/steering/`, no `governance/` — verified line 25, 2026-06-27) SHALL **add `governance/`** so the relocated docs ship, AND the disposition of the existing `.kiro/steering/` entry SHALL be stated explicitly: per Peter's decision (2026-06-27) identity docs KEEP shipping (status quo), so `.kiro/steering/` (now identity-only) **STAYS** in `files[]` and `governance/` is added alongside it.
3. WHEN `npx designerpunk init` scaffolds a consumer's `mcp.json` THEN it SHALL emit the new `governance/` path for `MCP_STEERING_DIR`. This SHALL include updating the init template `src/cli/templates/mcp-config.json.template` (currently hardcodes `node_modules/@3fn/core/.kiro/steering`, verified line 9) AND `src/cli/__tests__/init.test.ts` (asserts that hardcoded path at ~line 114, verified) — without the test update CI fails.
4. WHEN `npx designerpunk sync` runs against an existing product repo THEN it SHALL **add** stale-`MCP_STEERING_DIR` detection and prompt the consumer to update it. This is a **net-new capability**, not a tweak: `sync` today has zero `MCP_STEERING_DIR`/`mcp.json` awareness (verified: 0 hits in `src/cli/sync/`, 2026-06-27) — it is a file-content reconciler.
5. WHEN the `sync` file-content reconciler's managed directory set is evaluated THEN `MANAGED_DIRS` (`src/cli/sync/FileScanner.ts:18`, currently hardcodes `{ path: '.kiro/steering', tier: 'governance' }`, verified) SHALL be **repointed to `governance`** so `sync` reconciles the relocated docs; the `.kiro/steering` entry SHALL be retained (still `tier: 'governance'` semantics) only so long as identity docs remain synced through it. Without this repoint, `sync` stops reconciling relocated docs entirely.
6. WHEN the Integration Guide MCP configuration template is referenced THEN it SHALL reflect the new `governance/` path.
7. WHEN the wiring is committed THEN it SHALL NOT depend on the per-agent prompt path updates (those ride 119-B via 122); the original Phase 10 "atomic, same commit as relocation" guarantee no longer holds, so wiring correctness SHALL be verified by the relocation-integrity gate (Requirement 8) rather than by atomicity with prompt edits.

---

### Requirement 6: Lock the `always` Ambient Core (AXA-Classified)

**User Story**: As an agent starting any session, I want only a minimal ambient core always-loaded, so that sessions carry "who we are / how we collaborate / what the law is / where to route" without the full corpus.

> **AXA reframe reconciliation (2026-06-28).** The AXA model re-reads the always-set through the **five ambient classes** (formative / reflexive-principle / governance-as-law / ground-truth-manifest / capability-catalog — see `agent-experience-architecture.md` §3). That re-reading observes that two members of the always-set are not "identity" in the strict sense: **Agent-Directory** is a *capability-routing* artifact (→ destined for the generated **capability catalog**), and the operational checklists (**Start Up Tasks**, **Task-Completion-Protocol**) are *governance-as-law* (operational law). **In 119-A this is a vocabulary overlay, not a relocation**: every doc named in AC1 **stays `always` in 119-A**. The *migration* of Agent-Directory's routing into the generated capability catalog is **119-B/122** (AC6 below makes that an explicit forward-reference). This makes the prior "lock the identity docs" vs. AXA "route the rest to their real classes" tension a **timing** statement — the lock holds now; the decomposition is a later, severable step behind the seam.

#### Acceptance Criteria

1. WHEN inclusion modes are assigned THEN 119-A SHALL lock the **formative + reflexive-principle + governance-as-law core** to `inclusion: always`, AND SHALL retain **capability-routing artifacts (Agent-Directory) and operational checklists** as `always` for the 119-A window even though the AXA model classifies them as catalog-bound / operational-law respectively. The locked `always`-set is (~9 docs): Personal Note (formative), Core Goals (formative/operational), AI-Collaboration-Principles (reflexive-principle), Spec-Feedback-Protocol (reflexive-principle), DesignerPunk-Systems-Overview (orientation reference, retained ambient), Civitas-System-Overview (orientation reference, retained ambient), Start Up Tasks (refocused — operational law), Task Completion Protocol (new — operational law), and Agent-Directory (capability-routing — `always` in 119-A, migrates in 119-B). The per-doc AXA class is recorded as an overlay; it does **not** change any doc's 119-A inclusion mode.
2. WHEN Start Up Tasks is refocused THEN it SHALL retain the pre-task checklist concerns (date check, governance health, Jest commands, authorization rules), and a new always-loaded Task Completion Protocol doc SHALL carry the end-of-task sequence (when to write completion docs, what tier, parent vs. subtask distinction).
3. WHEN `Process-Development-Workflow` and `Process-File-Organization` are assigned THEN they SHALL move from `always` to `manual` (queried on demand via the MCP), and SHALL relocate to `governance/` per Requirement 4.
4. WHEN inclusion modes are finalized THEN **no doc outside the locked ambient core of AC1 SHALL remain `always`-loaded** (equivalently: the only `always` surface is the AC1 set — note "non-identity" is deliberately avoided here, since AC1's AXA overlay reclassifies some AC1 members as non-identity-but-retained-`always`), and the always-loaded set SHALL be the only Kiro-proprietary inclusion surface retained.
5. WHEN the identity layer is finalized THEN the `always`-loaded `AI-Collaboration-Principles.md` (an identity doc this requirement already touches) SHALL carry a minimal, plain-English **certainty-calibration behavioral rule** so all 8 agents know how to find guidance once the always-loaded meta-guide map is gone (the 119-A→122→119-B window). The rule's behavioral content SHALL be: *When you are unsure where guidance lives, run `find_docs` plus a cheap fallback (e.g. `Grep` over the corpus) before guessing; weight strong matches above partial matches; if still unsure, propose your best guess and ask the human for a go/no-go; never act confidently on an empty or weak result.* This rule SHALL be authored **forward-compatibly** — phrased in the strong/partial/none shape of Spec 121's shipped `matchConfidence` signal — so that 119-B *refines* it rather than *rewrites* it. **Scope discipline: this AC lands the rule TEXT only.** Formalizing it against the `matchConfidence: strong | partial | none` signal (the `partial` propose-best-fit→go/no-go and `none` extensions) and propagating it into the 8 agent prompts via 122 are explicitly **deferred to 119-B**.
6. WHEN the AXA class overlay (AC1) is recorded THEN the **Agent-Directory → generated capability-catalog migration SHALL be carried as an explicit 119-B/122 forward-reference**, not actioned in 119-A: Agent-Directory's hand-curated cross-domain routing table (`situation → route to`) is capability routing that the AXA model relocates into the *generated* capability catalog (`agent-experience-architecture.md` §3.5), and that generation is owned by 122 with 119-B sequencing. 119-A SHALL NOT decompose, trim, or relocate Agent-Directory; it SHALL only record the forward-reference so the timing is unambiguous (lock now, generate-and-migrate in 119-B). This forward-reference is the Req 6 counterpart of the Req 7 / Req 11 "deferred to 119-B" notes.

> **Note:** the always-loaded token benchmark (~7.5K tokens) is a measure-don't-gate benchmark; the actual figure is captured by the 119-B case study, not enforced here.
>
> **Resolves former Open Question 1 (with Peter, 2026-06-27):** land the calibration *text* in 119-A now; defer formalization-against-121-signal + 122-propagation to 119-B. AC5 above is the text-only landing; the deferral is recorded in the Deferred-to-119-B section.

---

### Requirement 7: 118 Module-Resolution-Contract Identity-Layer Pointer

**User Story**: As any agent during the 119-A → 122 → 119-B window, I want a one-line pointer in an always-loaded doc telling me the Module-Resolution Contract exists and when to pull it, so that the contract is discoverable before its per-agent routing rows land in 119-B.

#### Acceptance Criteria

1. WHEN the identity layer is finalized THEN `DesignerPunk-Systems-Overview.md` (an `always` doc) SHALL contain a single pointer line stating that module resolution (runtime-TS loading, package exports, the bin, consumer `.ts`, component tokens) is governed by the Module-Resolution Contract and that the contract should be pulled before touching those surfaces, referencing RSA § Module-Resolution Contract.
2. WHEN this requirement is implemented THEN it SHALL be a distinct, numbered phase so it cannot fall between the prose hand-off note and the phase table (verified 2026-06-27: the pointer is not yet present).
3. WHEN the pointer is added THEN it SHALL remain a one-line pointer (~25 tokens); the contract depth SHALL stay in the `manual`/MCP-served RSA, not be inlined into the identity tier.

> **Deferred to 119-B (note):** the Module-Resolution-Contract *routing rows* in the Ada / Thurgood / Lina tables ride 119-B via 122's canonical source — out of scope here.

---

### Requirement 8: Relocation-Integrity Gate

**User Story**: As the steward responsible for the relocation's safety, I want a named, closed-loop success criterion that proves every referenced doc still resolves AND every must-fix coupling surface is remediated after the move, so that the dissolved Phase 10 atomicity guarantee is replaced by an explicit gate that covers the full coupling surface — not just the 8 prompts.

> **AXA-reframe generalization (2026-06-28).** The gate's scope is widened from "(the 8 prompts' references) + (family-guidance health)" to additionally assert **resolution across the Requirement 1 AC7 MUST-FIX coupling set**. The gate's pass condition remains per-reference / per-surface, never a generic health check. Crucially, the gate asserts ONLY the **critical-core** set (relocation + `id`-addressing + MCP rewiring + must-fix coupling remediation + the always-layer AX *design*) and **explicitly excludes** the severable manifest *build* and capability-catalog *generation* (see § "Severable Seam Partition" — the gate is where the seam gets its teeth).

#### Acceptance Criteria

1. WHEN the relocation-integrity gate runs THEN it SHALL enumerate every doc `id` (and any still-legacy path reference) referenced across the 8 agent prompts. The gate SHALL therefore resolve a **mix** of legacy `.kiro/steering/…` paths and `id`s, because the 8 prompts keep their 60 hardcoded legacy paths through the window (sweep is 119-B): the gate's correctness **depends on the legacy-path→`id` fallback resolver (Requirement 2 AC3)** being live, and SHALL name it as its resolution mechanism.
2. WHEN each referenced `id` or legacy path is enumerated THEN the gate SHALL resolve it via the Docs MCP post-relocation (legacy paths via the AC3 fallback).
3. IF any referenced `id` or legacy path fails to resolve THEN the gate SHALL fail and SHALL report the specific unresolved reference(s).
4. WHEN the gate evaluates success THEN a generic "MCP healthy / N docs indexed" check SHALL be insufficient — the pass condition is per-reference resolution.
5. WHEN the gate verifies **identity-doc** references THEN it SHALL NOT route them through MCP resolution (identity docs are not in the governance-only index — Requirement 2 AC4). Identity-doc references SHALL instead be verified by **always-set static presence**: the doc's `id` is in the locked identity set (Requirement 6 AC1 / the Requirement 1 inventory's identity-role docs) AND the file exists at its `.kiro/steering/` path. (No separate "manifest" artifact is presupposed; if design chooses to materialize the identity set as a build artifact, that is a design-discretion choice, not a requirement here.) (Identity docs are injected, not fetched, so they cannot 404 mid-session — an MCP round-trip would be the wrong check.)
6. WHEN the gate runs THEN it SHALL include an **Application MCP / family-guidance health axis**: relocation SHALL introduce **no new family-guidance companion-path warnings**. These warnings are produced at `FamilyGuidanceIndexer.ts:50-52` (`path.resolve(projectRoot, guidance.companion)` + `fs.existsSync` → warning) and folded into component health at `ComponentIndexer.ts:275` (verified 2026-06-27). A gate scoped only to "the 8 prompts" misses the 22 `companion:` couplings entirely; this axis asserts on the surfaces Requirement 1 AC6 inventories and Requirement 4 AC6 remediates.
7. WHEN the gate runs THEN it SHALL include a **must-fix coupling-remediation axis**: for every surface in the Requirement 1 AC7 **MUST-FIX-119-A** bucket, the gate SHALL assert the surface has been repointed to `governance/` (or to `id` where applicable) and is functional post-relocation — specifically: `sync-manifest.json` regenerated with `governance/` keys; agent-definition `resources` steering-doc entries resolve (the doc-entry relocation-break only — NOT the AX decomposition); `.cursor/mcp.json` `MCP_STEERING_DIR` and the Docs MCP `DEFAULT_STEERING_DIR` point at `governance/`; `init`/`designerpunk.ts` copy/emit `governance/`; `src/figma/VariantAnalyzer.ts` + `DesignExtractor.ts` and `scripts/extract-component-meta.ts` construct `governance/` paths. The gate SHALL fail and name the specific surface on any unremediated must-fix coupling. The DEFERRABLE prompt-path bucket is covered by the AC1/AC3 legacy-path fallback (not this axis); the R3 bucket is explicitly out of the gate.
8. WHEN the gate evaluates its scope THEN it SHALL assert ONLY the **critical-core** set and SHALL **explicitly exclude** the severable seam's far side: the gate SHALL NOT require the **ground-truth manifest *build*** (token-manifest / component-manifest) NOR the **capability-catalog *generation*** (122) to be present or complete. These are severable (§ "Severable Seam Partition") and SHALL NOT gate the 119-A critical path. The gate asserts the always-layer AX **design** exists (Requirement 6 AXA overlay + the per-agent five-class ambient-set design, Requirement 14) but NOT that any manifest/catalog has been built or generated.
9. WHEN the gate passes THEN it SHALL stand as 119-A's relocation exit gate (replacing the original pre-relocation prompt-quality gate, which moves to 119-B).

---

### Requirement 9: `aliases` Seeding During Relocation

**User Story**: As a cross-domain agent searching for context I don't own, I want relocated docs to carry `aliases` for the concepts I'd search by, so that `find_docs` surfaces them even though it does not index body prose.

#### Acceptance Criteria

1. WHEN a non-identity doc is relocated THEN the relocation pass (executor: Civitas) SHALL seed its frontmatter `aliases` with cross-domain discovery concepts that are not already present in the doc's title or description.
2. WHEN deciding what to seed THEN the basis SHALL be that `find_docs` concept coverage spans title / headings / description / purpose / `aliases` / relevantTasks / basename but **NOT body prose** (verified `QueryEngine.ts`), so `aliases` is the backstop for concepts expressed only in body prose.
3. WHEN `aliases` are seeded THEN they SHALL belong to the discovery plane and SHALL NOT alter the doc's stable `id` (addressing plane) — the two planes stay decoupled.
4. WHEN alias seed-lists are authored THEN **domain owners SHALL own their domains' seeds**: Ada authors token-domain alias seeds, Lina authors component-domain alias seeds, Leonardo authors layout/system-domain alias seeds; **Civitas executes** the seeding during relocation. (Authoring the discovery vocabulary is a domain-content decision; applying it across files is the relocation mechanism.)
5. WHEN the seeding work is verified THEN its worklist and verification gate SHALL be the **discovery dry-run (Requirement 13)**: the dry-run's WEAK and MISS results define which concepts still need aliases (the seeding worklist), and the dry-run re-run after seeding (the "lift" baseline) is the gate proving the seeds raised discovery above the floor. This supplies Requirement 9 the closed-loop verification it otherwise lacked.

---

### Requirement 10: Intra-Doc Cross-References Migrate to Logical `id`s

**User Story**: As a maintainer updating cross-references after the move, I want intra-doc references to point at logical doc `id`s rather than new physical `governance/…` paths, so that relocation does not re-physicalize what `id` addressing just decoupled.

#### Acceptance Criteria

1. WHEN cross-references in active docs are updated for the relocation THEN they SHALL be migrated to doc `id`s (`docid`, later `docid#sectionid`), not to new physical `governance/…` paths.
2. WHEN historical docs (prior specs, completion docs) reference old paths THEN they SHALL be left as-is (not rewritten).
3. WHEN a cross-reference cannot be expressed logically (e.g. a reference to a non-indexed resource) THEN it SHALL be surfaced as an exception rather than silently converted to a physical `governance/…` path.
4. WHEN the intra-doc cross-reference migration is sequenced THEN it SHALL run **after the Requirement 2 AC3 legacy-path fallback is live**, so that references resolve continuously during the migration window rather than transiently 404ing.

> **Note (migration weight):** the intra-doc cross-ref migration is heaviest in the **token corpus** (Token-Governance ~7 refs, Rosetta-System-Architecture ~6). These are the densest migration targets.
>
> **Note (deferred prose sweep):** ~30 component READMEs reference steering docs by **prose path**. These are resolved by the AC3 fallback during the window and are NOT a 119-A break; sweeping them to logical `id`s is deferred (out of 119-A scope), not required for relocation integrity.

---

### Requirement 11: Remove the Meta-Guide and Drop the Documentation Directory

**User Story**: As the steward removing the leak-source artifact, I want the meta-guide removed and the never-built Documentation Directory formally dropped from the inclusion model, so that the architecture reflects the decided end-state.

#### Acceptance Criteria

1. WHEN the meta-guide removal is applied THEN `00-Steering Documentation Directional Priorities.md` SHALL be removed (the leak-source artifact; verified still present, ~326 lines, `inclusion: always`, 2026-06-27). The `#[[file:...]]` bulk-load it carried was already removed in commit `5489b6cf` — this requirement removes the now-purposeless file, it does not re-spec the leak fix.
2. WHEN the inclusion-mode model is finalized THEN the Documentation Directory SHALL NOT appear in it; because the artifact was never built, "drop" means "do not create it" (zero-cost cleanup).
3. WHEN the meta-guide is removed THEN the relocation-integrity gate (Requirement 8) SHALL still pass (no referenced `id` may depend on the removed meta-guide).
4. **BEFORE** this requirement removes the file THEN the meta-guide's hand-curated concept→doc map (its "Tier 2: MCP-Only Documents" section: Process / Token / Component / Layout / Integration / Testing / Architecture categories → docs) SHALL be captured as the frozen test oracle defined in Requirement 13. The meta-guide is the only always-loaded navigational map; removing it before its per-agent `find_docs` routing replacement (119-B) is 119-A's scariest step, so the capture is a hard precondition.
5. WHEN removal is gated THEN this requirement's execution SHALL be **blocked until the discovery dry-run (Requirement 13) clears its threshold** — removal is permitted only once `find_docs` + seeded aliases reach every map-covered concept above the dry-run threshold. The frozen oracle is captured (AC4) for **testing only**; it SHALL NOT be retained as a living fallback doc (a living hand-maintained map would re-create the Documentation Directory drift surface this spec drops). Git already retains the file for rollback — the oracle is a separate, extracted, usable mapping.

> **Deferred to 119-B (note):** replacing the agent-prompt "query the Documentation Directory" fallback line with a `find_docs({ concept })` routing row rides 119-B via 122's canonical source — out of scope here.
>
> **Out of scope / decide-separately (note):** whether to build a *human-facing*, generated-not-curated onboarding/orientation artifact is a separate question with a separate owner, off 119's critical path. `find_docs({ list: true })` already yields a paginated catalog.

---

### Requirement 12: Documentation Requirements for New Developer-Facing Conventions

**User Story**: As a future contributor to the steering corpus, I want the new `id` / `aliases` / filename conventions documented in governance, so that the conventions 119-A establishes are discoverable and enforceable rather than tribal knowledge.

#### Acceptance Criteria

1. The steering-corpus addressing-and-naming conventions introduced by 119-A **shall** be documented in a governance doc (or an addition to an existing governance/process doc) that includes: the per-doc `id` convention (kebab-slug of title, immutable, semantically inert), the composite `docid#sectionid` grammar (with section-`id` noted as deferred to Gap 7), the kebab-case/no-spaces filename convention, and the `aliases` seeding guidance (discovery-plane purpose; not body-prose-indexed).
2. WHEN the convention doc is authored THEN it SHALL reference the build-time uniqueness guard and the Thurgood metadata-validation hook as the enforcement mechanisms for the `id` invariant.
3. WHEN this documentation requirement is evaluated THEN it SHALL be satisfied by a governance doc note rather than per-component/per-token docs, because 119-A introduces conventions, not tokens or components.

> **Waiver note:** the Process-Spec-Planning Documentation Requirements clause is framed for token/component work. 119-A introduces neither tokens nor components, so the token/component documentation requirements are **waived as not-applicable**; the developer-facing surface 119-A *does* introduce (the `id`/`aliases`/filename conventions) is covered by Acceptance Criterion 1 above rather than waived.

---

### Requirement 13: Discovery Dry-Run Gate on a Frozen Map-Oracle

**User Story**: As the steward removing the only always-loaded navigational map, I want a frozen test oracle extracted from that map and a dry-run that proves `find_docs` + seeded aliases can reach every concept the map covered, so that I do not remove the map before its discovery replacement demonstrably works.

#### Acceptance Criteria

1. WHEN the meta-guide's concept→doc map is captured THEN it SHALL be frozen as a **point-in-time test fixture/oracle** (not a living artifact): the categories and doc pointers from its "Tier 2: MCP-Only Documents" section (Process / Token / Component / Layout / Integration / Testing / Architecture). It SHALL be captured BEFORE Requirement 11 deletes the file (Requirement 11 AC4) and SHALL be used for testing only — explicitly NOT retained as a fallback navigational doc.
2. WHEN the oracle's answer key is built THEN the map's doc pointers SHALL be **human-validated to strip stale entries** — the target is NOT to reproduce the map 100% (that would enshrine its rot). Building the validated answer key **IS** an R3 staleness-triage pass over the map (consistent with Requirement 1's flag-don't-fix triage).
3. WHEN the dry-run is constructed THEN its **query set** SHALL be the union of (a) the map's concepts/categories and (b) each agent's domain queries; its **answer key** SHALL be the validated oracle from AC2; and its **scoring** SHALL record, per query: rank-of-correct-doc and `matchConfidence` (strong / partial / none).
4. WHEN the dry-run is run THEN it SHALL be run as a **three-point baseline against the same oracle throughout**: (i) **floor** — now, pre-aliases; (ii) **lift** — post-aliases-seeding (Requirement 9); (iii) **no-regression** — post-relocation. The same query set and answer key SHALL be used at all three points so the deltas are comparable.
5. WHEN the dry-run scores a query as **WEAK or MISS** THEN that query SHALL feed Requirement 9's alias-seeding worklist (the gate-to-seeding wiring): the WEAK/MISS set IS the list of concepts needing alias seeds.
6. WHEN Requirement 11 (meta-guide removal) is gated THEN removal SHALL be **blocked until the dry-run clears a threshold** — every map-covered concept reaches at least the threshold rank/confidence via `find_docs` + seeded aliases. **The specific threshold value is a design-phase decision and is flagged here, not invented**: this requirement mandates that a threshold gate exists and that Requirement 11 depends on it; the numeric/ordinal threshold SHALL be set at design phase.
7. WHEN the dry-run results are recorded THEN the frozen oracle SHALL ALSO be retained as 119-B's non-circular **"before" anchor** for discovery quality — partially rescuing the lost pristine ~335K baseline (whose recovery is confounded by the already-shipped leak fix). This is a recording obligation in 119-A; the 119-B case study consumes it.

> **Context — a real floor-probe already ran (2026-06-27, recorded for design):** 8 queries, no aliases seeded → correct doc in top-2 in all 8; 5 at rank-1-strong; one weak case (`module-resolution` — which is exactly the doc Requirement 7 already gives an identity-layer pointer to); plus some ranking noise and a long "partial" tail. The floor is encouraging; this requirement formalizes the gate rather than discovering whether discovery is viable.
>
> **Design-phase choice flagged (do not pre-resolve):** the dry-run threshold value (AC6).

---

### Requirement 14: Per-Agent Five-Class Ambient-Set Design (the Always-Layer AX Design)

**User Story**: As the AXA architect, I want 119-A to produce each agent's decomposed five-class ambient-set *design* — the per-agent composition of formative / reflexive-principle / governance-as-law / ground-truth-manifest / capability-catalog — so that 122 has a canonical input to generate from, while the manifest *build* and catalog *generation* stay severable behind the seam.

> **Why this is a 119-A requirement (and what it deliberately is NOT).** The AXA reframe identifies the always-layer not as an undifferentiated "identity layer" but as **five ambient classes** (`agent-experience-architecture.md` §3). 122 generates and enforces each agent's ambient composition **from canonical source** — and that canonical source is the **per-agent design** this requirement produces. The *design* (which docs/manifests/catalog entries each agent gets, in which class) is dependency-critical: 122 cannot generate without it. The *build* of the manifests and the *generation* of the catalogs are **behind the severable seam** — they touch the generator/CI and MUST NOT gate relocation. This requirement is the **design half**; Requirement 8 AC8 confirms the gate asserts the design exists but not that any manifest/catalog is built.

#### Acceptance Criteria

1. WHEN 119-A produces the always-layer design THEN it SHALL produce, **per agent**, a decomposed ambient-set design assigning each piece of that agent's ambient context to one of the five AXA classes: **formative**, **reflexive-principle**, **governance-as-law**, **ground-truth-manifest**, **capability-catalog**. This per-agent design is the canonical input 122 generates from.
2. WHEN the per-agent design is produced THEN the **formative + reflexive-principle** classes MAY be treated as roughly universal across agents (per `agent-experience-architecture.md` §7), while **governance-as-law + ground-truth-manifest + capability-catalog** SHALL be designed per-agent (role-specific).
3. WHEN the design references the **ground-truth manifest** class THEN it SHALL specify the manifest's *design* (what the manifest must contain, e.g. token name→resolved-values for Ada; the component-catalog-as-manifest for Lina) but SHALL explicitly mark the **manifest *build*** (the generator/CI work that produces the manifest artifact) as **behind the seam** — severable, → 119-B/122, NOT a 119-A deliverable.
4. WHEN the design references the **capability-catalog** class THEN it SHALL specify the catalog's *design* (commands/scripts, role activation cues, deferred-tool awareness, and the absorbed Agent-Directory routing per Requirement 6 AC6) but SHALL explicitly mark the **capability-catalog *generation*** (122's generation of the catalog from canonical source) as **behind the seam** — severable, → 119-B/122, NOT a 119-A deliverable.
5. WHEN the per-agent design is produced THEN the **8 per-agent assessments** (the worked input — Ada / Lina / Thurgood assessed during the reframe; Leonardo / Sparky / Kenya / Data / Stacy produced by the reframe feedback round) SHALL be the design's input-of-record. **Companion note:** these 8 assessments are being enshrined separately by the main loop as the design's worked input; this requirement references that companion artifact rather than re-deriving the assessments.
6. WHEN the seam is asserted THEN this requirement's deliverable SHALL be the **design only**: 119-A SHALL NOT build any manifest, SHALL NOT generate any capability catalog, and SHALL NOT hand-curate a manifest/catalog/routing artifact except under the interim governance invariant (Requirement 4 AC8 — "generate, don't curate").

> **Seam boundary (Requirement 14):** design = 119-A (dependency-critical, gated by Requirement 8 AC8's "design exists" assertion); build/generation = behind the seam (severable, → 119-B/122, explicitly excluded from the Requirement 8 gate per AC8).

---

## Severable Seam Partition (per-surface)

This section makes the **dependency-critical-119-A / behind-the-seam** split explicit *per surface*, so the seam is an enforceable artifact rather than a slogan. **Dependency-critical** = on the 119-A critical path; unblocks 122/123; asserted by the Requirement 8 exit gate. **Severable** = MUST NOT gate the critical path; deferred to 119-B/122; **explicitly excluded** from the Requirement 8 gate (AC8). The seam gets its **teeth** from Requirement 8 AC7 (asserts the critical-core must-fix set) + AC8 (excludes manifest-build and catalog-generation).

> **Design-phase note (seam-table granularity):** I set the table granularity at "one row per surface/work-item" — fine-grained enough to adjudicate each surface, coarse enough to stay readable. A finer per-file breakdown of the must-fix couplings already lives in Requirement 1 AC7; this table is the seam view, not a second copy of that inventory.

| Surface / work-item | Side of seam | Requirement(s) | Gate (Req 8)? |
|---|---|---|---|
| Doc relocation `.kiro/steering/` → `governance/` | **Critical (119-A)** | R4 | Yes — AC2/AC4 doc resolution |
| Uniform per-doc `id` addressing + resolver + legacy-path fallback | **Critical (119-A)** | R2 | Yes — AC1–AC4 (fallback is the gate's resolution mechanism) |
| Filename normalization (mass-rename of 10 space-bearing files) | **Critical (119-A)** | R3 | Indirect — via post-rename `id` resolution |
| MCP rewiring (`MCP_STEERING_DIR`, `DEFAULT_STEERING_DIR`, `files[]`, `init`, `sync`, `.cursor/mcp.json`) | **Critical (119-A)** | R5, R1 AC7 | Yes — AC7 must-fix axis |
| Must-fix coupling remediation (`sync-manifest.json` regen; `resources` doc-entry relocation-break; `src/figma/*`; `scripts/extract-component-meta.ts`; `init`/`designerpunk.ts`) | **Critical (119-A)** | R1 AC7, R4 | Yes — AC7 must-fix axis |
| Family-guidance companion re-point (by-`governance/`-path, atomic) | **Critical (119-A)** | R4 AC6/AC7 | Yes — AC6 family-guidance health axis |
| Always-layer AX **design** (per-agent five-class ambient-set design) | **Critical (119-A)** | R14, R6 | Yes — AC8 asserts the *design exists* |
| Meta-guide removal (gated on discovery dry-run) | **Critical (119-A)** | R11, R13 | Yes — AC1–AC4 + R13 threshold |
| `aliases` seeding (discovery backstop) | **Critical (119-A)** | R9, R13 | Indirect — via R13 dry-run lift/no-regression |
| Agent-definition `resources` **decomposition/trim** into the five classes | **Severable (→ 119-B/122)** | R1 AC7 note, R14 | **No — excluded** (AC8) |
| Ground-truth **manifest *build*** (token-manifest, component-manifest) | **Severable (→ 119-B/122)** | R14 AC3 | **No — excluded** (AC8) |
| Capability-catalog **generation** (incl. Agent-Directory → catalog migration) | **Severable (→ 119-B/122)** | R6 AC6, R14 AC4 | **No — excluded** (AC8) |
| Companion-by-`id` re-point (option a; `FamilyGuidanceIndexer` change) | **Severable (→ 122)** | R4 AC7 | No — deferred |
| Per-agent routing tables; certainty-calibration *formalization* + propagation; before/after case study | **Severable (→ 119-B)** | R6 AC5 note, R7 note | No — deferred |
| Deeper AX investments (doing+recording, persistent memory) | **Severable (→ future)** | AXA §5.6/§8 | No — out of 119 entirely |
| R3 staleness fixes (`Stemma*.ts` constants; `.claude/settings.local.json`) | **Out (R3 audit)** | R1 AC7 R3-bucket | No — triage only |

**The seam invariant:** the Requirement 8 exit gate passes on the **Critical (119-A)** rows ALONE. If a Severable row is incomplete, the gate still passes — that is the seam working as designed (non-critical work cannot hold the dependency-critical path hostage). If a Severable row's *absence* breaks a Critical row, that is a partition error to escalate, not a reason to pull the severable work back across the seam.

---

## Open Questions / Boundary Calls

These are surfaced for Peter's decision rather than resolved here. (Items the sources already RESOLVED — Documentation Directory = drop, identifier model = uniform `id`, mass-rename = in-scope, staleness = separate audit — are treated as decided and are NOT relisted as open.)

1. **RESOLVED (with Peter, 2026-06-27) → now Requirement 6 AC5.** The certainty-calibration *text* lands in 119-A now (in the `always` `AI-Collaboration-Principles.md`), written forward-compatibly in the strong/partial/none shape. Formalizing it against 121's `matchConfidence` signal and propagating it to the 8 prompts via 122 are deferred to 119-B. No longer open.

2. **RESOLVED (with Peter, 2026-06-27) → now a confirmed assumption in the Introduction.** Kiro watches **only** `.kiro/steering/` and `~/.kiro/steering/`, so relocating non-identity docs to `governance/` at root makes them invisible to the always-load scanner — the intended effect. Requirement 4's relocation strategy is sound. No longer open.

3. **Transition-window cross-references that are neither clearly "active" nor "historical."** Requirement 10 splits references into active (migrate to `id`) and historical (leave as-is). Docs referenced by *both* active and historical content are an in-between case. Default: treat by the referencing doc's own status (active doc → migrate its references; historical doc → leave). Flagged in case Peter wants a different cut. (Minor design-phase note; remains open.)

---

## Deferred to 119-B (explicitly out of scope here)

Listed so a reader who expects them knows they were considered and intentionally deferred:
- Per-agent routing tables (system + platform agents), expressed as Spec 122 canonical-source content.
- The `find_docs({ concept })` discovery routing row (and the collapse of the dropped Documentation Directory fallback line into it).
- The 118 Module-Resolution-Contract *routing rows* (Ada / Thurgood / Lina) — the identity-layer *pointer* is in scope here (Requirement 7); the routing rows are not.
- The certainty-calibration protocol **formalization** against the 121 `matchConfidence` signal (the `partial` propose-best-fit→go/no-go and `none` refinements) + **propagation** into the 8 prompts via 122. The protocol *text* itself now lands in 119-A (Requirement 6 AC5, written forward-compatibly); only the formalization + propagation defer.
- The before/after measurement case study (the original Phases 1, 13–14), including the acknowledged "before"-baseline confounder (the leak fix already shipped, so the pristine ~335K baseline may be unrecoverable). 119-A's frozen discovery oracle (Requirement 13 AC7) is recorded as a **non-circular "before" anchor** that partially rescues this lost baseline for the case study to consume.
- Section-ID embedding (roadmap Gap 7) — the grammar is designed not to preclude it (Requirement 2), but it is not implemented here.
- Content-staleness *fixes* — a separate Thurgood-led governance audit (119-A does triage only, Requirement 1).
- **(AXA) The Agent-Directory → generated capability-catalog migration** (Requirement 6 AC6) — 119-A locks Agent-Directory `always` and records the forward-reference; the catalog *generation* + the routing migration ride 119-B/122.
- **(AXA) Manifest *build* and capability-catalog *generation*** (Requirement 14 AC3/AC4) — 119-A produces the per-agent five-class ambient-set *design*; the build/generation of manifests and catalogs is severable → 119-B/122 (excluded from the Requirement 8 gate per AC8). See § "Severable Seam Partition".
- **(AXA) Agent-definition `resources` decomposition/trim** into the five classes — only the relocation-**break** of their steering-doc entries is must-fix in 119-A (Requirement 1 AC7); the AX decomposition is behind the seam → 119-B/122.
- **(AXA) Companion-by-`id` re-point** (Requirement 4 AC7, option a) — the `FamilyGuidanceIndexer` change is deferred to 122; 119-A uses the code-free by-`governance/`-path re-point.
