# Steering-Path Coupling Sweep — Spec 119-A, Task 1 (Subtasks 1.3 + 1.4)

**Date**: 2026-06-29
**Spec**: 119-A — Steering Relocation & Serving Contract
**Task**: 1 — Doc Inventory + Comprehensive Steering-Path Coupling Sweep
**Author**: Thurgood (Civitas steward) [Subtask 1.4 is cross-domain with Lina — Application-MCP family-guidance]
**Status**: Foundation artifact — introduces no code, modifies no document content
**Companion artifact**: `doc-inventory.md` (Subtasks 1.1 + 1.2)

> **What this is (Req 1 AC7).** A comprehensive, classified enumeration of **every surface that couples to a `.kiro/steering/…` path**, bucketed by remediation timing into **MUST-FIX-119-A / DEFERRABLE / R3-scope-out**, plus the inbound family-guidance couplings (Subtask 1.4). Every surface was verified against the live tree (grep + file inspection) with exact `file:line` locations.
>
> **This classified inventory IS the per-surface input to the requirements' § "Severable Seam Partition,"** and the **MUST-FIX-119-A bucket is the assertion target of the Task 11 / Requirement 8 relocation-integrity gate's must-fix-coupling axis (Req 8 AC7).** A surface in MUST-FIX has **no MCP fallback** — relocation functionally breaks it unless it is repointed. A surface in DEFERRABLE is rescued by the Req 2 AC3 legacy-path→`id` fallback resolver and is swept in 119-B. A surface in R3 is staleness-triage (flag, don't fix).

---

## Bucket A — MUST-FIX-119-A (no MCP fallback; relocation functionally breaks)

These are the gate's must-fix-coupling-axis assertion targets (Req 8 AC7). Each is verified live below.

### A1. `.kiro/sync-manifest.json` — 89 path-keyed entries
- **Location**: `.kiro/sync-manifest.json` — entries keyed `".kiro/steering/<file>.md"` start at `:5`.
- **Verified count: exactly 89** steering-keyed entries (of 868 total `files` entries). Matches the 89-doc count one-for-one.
- **Break**: keys are literal `.kiro/steering/…` paths; `sync` reconciles by exact key. Relocation orphans all 89.
- **Remediation**: regenerate with `governance/` keys (Task 7.3). Ties to the Req 5 AC5 `MANAGED_DIRS` repoint (Task 7.2). NOTE: of the 89, the **8 identity docs stay** in `.kiro/steering/` — a verbatim "swap `.kiro/steering`→`governance` in all 89 keys" would wrongly re-key the identity docs. The regen must split: 8 identity keys stay `.kiro/steering/`, 80 relocating keys move to `governance/`, 1 removed key (`00-Steering…`) drops. (Net manifest steering entries post-119-A: ~88, not 89.)

### A2. Agent-definition `resources` arrays — steering-doc entries (doc-entry relocation-break ONLY)
- **Location**: `.kiro/agents/*.json` (8 files: ada, data, kenya, leonardo, lina, sparky, stacy, thurgood).
- **Verified totals (live):** **170** steering entries across the 8 JSONs, split **50 identity / 120 relocating / 0 removed / 0 stale.** Per-file:

  | Agent JSON | total steering entries | identity (leave) | relocating (repoint) |
  |---|---|---|---|
  | `ada.json` | 27 | 6 | 21 |
  | `data.json` | 18 | 6 | 12 |
  | `kenya.json` | 18 | 6 | 12 |
  | `leonardo.json` | 21 | 7 | 14 |
  | `lina.json` | 34 | 6 | 28 |
  | `sparky.json` | 19 | 6 | 13 |
  | `stacy.json` | 15 | 6 | 9 |
  | `thurgood.json` | 18 | 7 | 11 |
  | **TOTAL** | **170** | **50** | **120** |

- **SURPRISE / CORRECTION TO PRIOR FRAMING (flag for Peter):** the spec/tasks language ("the steering-doc `file://` entries only") implies a `file://`-only set. **Live audit finds BOTH `file://` AND `skill://` schemes** carry steering paths (e.g. `ada.json` has 27 steering entries but only 7 are `file://`). The Task 7.3 instruction to "PRESERVE each entry's `file://`/`skill://` scheme" already anticipates this, but the **count that matters for the gate is 120 relocating entries across both schemes**, not the ~52 a `file://`-only grep returns. A repoint that only touches `file://` entries would leave ~68 `skill://` steering refs pointing at vanished paths.
- **Break**: 120 relocating entries are literal `.kiro/steering/…` doc paths that 404 on relocation.
- **Remediation (Task 7.3)**: **selectively repoint ONLY the 120 relocating entries** to `governance/`; **LEAVE the 50 identity entries** at `.kiro/steering/`; **preserve each entry's scheme** (`file://` / `skill://`). The *decomposition/trim* of these arrays into the AXA five classes is **severable → 119-B/122** — NOT this work.

### A3. `.cursor/mcp.json` `MCP_STEERING_DIR` + Docs MCP `DEFAULT_STEERING_DIR`
- **`.cursor/mcp.json:7`** — `"MCP_STEERING_DIR": ".kiro/steering/"`.
- **`mcp-server/src/index.ts:60`** — `const DEFAULT_STEERING_DIR = '.kiro/steering/';` (default used at `:84` constructor, `:365` env resolution).
- **Break**: the Docs MCP indexes whatever `MCP_STEERING_DIR`/`DEFAULT_STEERING_DIR` points at; if it stays `.kiro/steering/` post-relocation it indexes the 8 identity docs (which should NOT be in the governance-only index) and misses all 80 relocated docs.
- **Remediation**: point both at `governance/` (Task 7.1). Retain the env var **name** as a stable API contract (Req 5 AC1).

### A4. `src/cli/init.ts` + `src/cli/designerpunk.ts`
- **`src/cli/init.ts:107-109`** — `copyDir(path.join(pkgRoot, '.kiro/steering'), path.join(dest, '.kiro/steering'), …)` copies steering into consumer scaffolds.
- **`src/cli/designerpunk.ts:255`** — `const steeringDir = path.join(pkgRoot, '.kiro/steering');` then `:263` spawns the docs MCP with `MCP_STEERING_DIR: steeringDir`.
- **Break**: `init` would scaffold consumers with only the (now identity-only) `.kiro/steering/` and none of the relocated `governance/` docs; `designerpunk.ts` would spawn the MCP against the wrong (identity-only) dir.
- **Remediation (Task 7.3)**: `init.ts` — **ADD a `governance/` copyDir, KEEP the `.kiro/steering` copy** (a literal repoint would drop the 8 identity docs from the consumer scaffold; mirrors the `package.json files[]` treatment). `designerpunk.ts` — clean **repoint** to `governance/` (it spawns the docs MCP, which serves only the non-identity corpus).

### A5. `src/figma/VariantAnalyzer.ts` + `src/figma/DesignExtractor.ts`
- **`src/figma/VariantAnalyzer.ts:115`** — `` const docPath = `.kiro/steering/Component-Family-${familyName}.md`; `` (dynamic Component-Family doc-path construction).
- **`src/figma/VariantAnalyzer.ts:146`** — `const docPath = '.kiro/steering/Component-Readiness-Status.md';`.
- **`src/figma/DesignExtractor.ts:3045`** — `'.kiro/steering/platform-implementation-guidelines.md'`.
- **Break**: all three target docs are in the **relocated** set (Component-Family-*, Component-Readiness-Status, platform-implementation-guidelines) — the constructed paths 404 post-relocation.
- **Remediation**: repoint path construction to `governance/` (Task 7.3).

### A6. `scripts/extract-component-meta.ts` `STEERING_DIR`
- **`scripts/extract-component-meta.ts:18`** — `const STEERING_DIR = path.resolve(__dirname, '../.kiro/steering');` (used at `:284-286` to `readdirSync` Component-Family docs).
- **Break**: reads Component-Family docs (all relocated) from `.kiro/steering/`; finds none post-relocation, silently generating empty/stale component-meta.
- **Remediation**: repoint `STEERING_DIR` to `governance/` (Task 7.3).

### A7. MCP/packaging rewiring (Req 5 surfaces — must-fix by extension)
Captured here for completeness (the gate's must-fix axis spans these via Req 5):
- **`package.json files[]`** — `.kiro/steering/` present (verified, in the `files` array); **`governance/` ABSENT (verified)**. Req 5 AC2: ADD `governance/`, KEEP `.kiro/steering/` (identity docs keep shipping). (The spec cited "line 25"; the entry is present in the `files` array as audited — exact line shifts with edits, so I record presence + the `governance/`-absent fact rather than pin a line.)
- **`src/cli/templates/mcp-config.json.template`** — emits the consumer `MCP_STEERING_DIR` (Req 5 AC3 cites `node_modules/@3fn/core/.kiro/steering` at template `:9`; also carries a dead `get_documentation_map` in its `autoApprove` at `:13` per design B4). Repoint + strip dead tool ref (Task 7.1).
- **`src/cli/__tests__/init.test.ts`** — hard-codes the template path AND doc-count assertions (`89`/`90`) against the single-root layout (Req 5 AC3 / design B3, cited `:142`, `:187`, `:194-195`). Must re-derive counts for the two-root split (Task 7.1).
- **`src/cli/sync/FileScanner.ts`** — `MANAGED_DIRS` (Req 5 AC5 cites the `const` at `:17`/`:18`, `{ path: '.kiro/steering', tier: 'governance' }`): ADD `governance`, keep `.kiro/steering` while identity docs sync through it (Task 7.2).

> **Seam note (A1–A7):** every surface above is **Critical (119-A)** in the § "Severable Seam Partition." The AX *decomposition* of A2's `resources` arrays, and any manifest *build* / catalog *generation*, are **behind the seam (severable → 119-B/122)** and are explicitly NOT in this bucket.

---

## Bucket B — DEFERRABLE (covered by the Req 2 AC3 legacy-path fallback; swept in 119-B)

### B1. The 8 agent `-prompt.md` hardcoded `.kiro/steering/…md` path references
- **Location**: `.kiro/agents/*-prompt.md` (8 files).
- **Verified count (live, spaces-tolerant regex):** **57** `.kiro/steering/*.md` file references across the 8 prompts, referencing **28 distinct docs**, plus **4 bare-directory** (`.kiro/steering/`) mentions. Per-prompt:

  | Prompt | `.md` refs |
  |---|---|
  | `ada-prompt.md` | 13 |
  | `data-prompt.md` | 0 |
  | `kenya-prompt.md` | 0 |
  | `leonardo-prompt.md` | 1 |
  | `lina-prompt.md` | 20 |
  | `sparky-prompt.md` | 0 |
  | `stacy-prompt.md` | 0 |
  | `thurgood-prompt.md` | 23 |
  | **TOTAL** | **57** |

- **DRIFT FROM SPEC (flag for Peter): the spec records "60 hardcoded `.kiro/steering/…md` references"; live audit finds 57** (`.md` file refs), or **61 raw `.kiro/steering` mentions** if bare-directory and path-only forms are counted. The discrepancy is a counting-convention difference (whether bare-dir mentions and space-bearing filenames split by whitespace are included), not necessarily 3 deleted refs — prompts have been edited since the 2026-06-27 verification (the branch shows recent agent-prompt churn). **This is the keyspace the Task 3 legacy-path manifest producer grep-extracts**, so the *exact live set* (not the recorded "60") is what must seed the manifest. Recommend the Task 3 producer treat the manifest keyspace as "whatever the live grep yields at freeze time," and the Task 11 gate assert per-reference resolution of that live set — neither should hardcode "60."
- **Why deferrable**: the prompts keep their legacy paths through the 119-A→122→119-B window; the Req 2 AC3 legacy-path→`id` fallback resolver resolves them. The sweep to logical `id`s rides 119-B via 122.
- **Gate interaction**: although DEFERRABLE for *editing*, these 57 refs ARE the per-reference resolution axis of the Task 11 / Req 8 gate (AC1) — the gate resolves each via the fallback, which exercises legacy-path-manifest completeness.

---

## Bucket C — R3 / scope-out (staleness triage — FLAG, DON'T FIX)

### C1. `src/validators/Stemma*.ts` stale guidance-string constants
- **Location**: 4 files — `StemmaComponentNamingValidator.ts`, `StemmaErrorGuidanceSystem.ts`, `StemmaPropertyAccessibilityValidator.ts`, `StemmaTokenUsageValidator.ts`.
- **`@see` doc-comment refs** (`:9`/`:13`/`:14`): all four point at `.kiro/steering/stemma-system-principles.md` (a relocated doc).
- **`StemmaErrorGuidanceSystem.ts:185-192` constants** — a `DOC_PATHS`-style map. **CRITICAL TRIAGE FINDING: several entries are ALREADY STALE, independent of relocation:**
  - `:190` `FORM_INPUTS_COMPONENTS: '.kiro/steering/form-inputs-components.md'` — **no such file exists** (the real doc is `Component-Family-Form-Inputs.md`).
  - `:191` `BUTTON_COMPONENTS: '.kiro/steering/button-components.md'` — **no such file exists** (real: `Component-Family-Button.md`).
  - `:192` `CONTAINER_COMPONENTS: '.kiro/steering/container-components.md'` — **no such file exists** (real: `Component-Family-Container.md`).
  - `:185` `STEMMA_PRINCIPLES`, `:186` `COMPONENT_QUICK_REFERENCE`, `:187` `COMPONENT_DEVELOPMENT_GUIDE` point at real (relocated) docs.
- **Disposition**: these are guidance *strings* surfaced in validator error messages, not functional resolution paths — they do not 404 a build, they mislead a human. The already-stale ones are stale *today*, before any relocation. Per Req 1 AC7 R3-bucket + the out-of-scope note, this is **flagged for the separate Thurgood-led R3 audit, NOT remediated in 119-A.** (Fixing them is also partly a Lina/Stemma-domain content decision, not pure infra.)

### C2. `.claude/settings.local.json` Bash allowlist entries
- **Location**: `.claude/settings.local.json` — **21** lines contain `.kiro/steering` (e.g. `:43` the boot-probe `MCP_STEERING_DIR` template; `:77-80`, `:86`, `:409-412` various `ls`/`head`/`git diff`/`grep`/`sed`/`awk` allowlist entries naming specific steering docs).
- **Disposition**: these are *historical command-allowlist* entries (records of previously-approved one-off Bash invocations), not functional couplings — a stale allowlist entry simply never matches again; it breaks nothing. **Flagged for R3 triage / housekeeping, NOT 119-A remediation.** (Also note: this is the exact guardrail the Port Note flags as lost in the Claude Code port — `.claude/settings.local.json` is not path-scoped.)

---

## Subtask 1.4 — Inbound family-guidance couplings (Req 1 AC6 / Req 4 AC6 / Req 8 AC6)

> Cross-domain: Civitas inventory (Thurgood) + Application-MCP family-guidance ownership (Lina). These are the gate's **family-guidance health axis** assertion targets.

### D1. `companion:` fields in `family-guidance/*.yaml` — 22 total = 9 top-level + 13 nested
- **Location**: `family-guidance/*.yaml` (9 files: avatars, badges, button, chips, container, form-inputs, icons, navigation, progress).
- **Verified total: exactly 22** `companion:` occurrences. **No drift from the spec's 22.**

**Top-level `companion:` (9 — column-0, all at line 7 of their file) — GATE-VISIBLE:**

| File | Line | Companion target |
|---|---|---|
| `family-guidance/avatars.yaml` | `:7` | `.kiro/steering/Component-Family-Avatar.md` |
| `family-guidance/badges.yaml` | `:7` | `.kiro/steering/Component-Family-Badge.md` |
| `family-guidance/button.yaml` | `:7` | `.kiro/steering/Component-Family-Button.md` |
| `family-guidance/chips.yaml` | `:7` | `.kiro/steering/Component-Family-Chip.md` |
| `family-guidance/container.yaml` | `:7` | `.kiro/steering/Component-Family-Container.md` |
| `family-guidance/form-inputs.yaml` | `:7` | `.kiro/steering/Component-Family-Form-Inputs.md` |
| `family-guidance/icons.yaml` | `:7` | `.kiro/steering/Component-Family-Icon.md` |
| `family-guidance/navigation.yaml` | `:7` | `.kiro/steering/Component-Family-Navigation.md` |
| `family-guidance/progress.yaml` | `:7` | `.kiro/steering/Component-Family-Progress.md` |

**Nested `companion:` (13 — indented under `composesWithFamilies:`) — CORRECTNESS-ONLY / GATE-BLIND:**

Per-file nested count (total occurrences minus the 1 top-level each): avatars 2, badges 2, button 0, chips 3, container 0, form-inputs 0, icons 3, navigation 2, progress 1 = **13**. Example (chips.yaml): top-level at `:7`; nested at `:52`, `:55`, `:58` under `composesWithFamilies:` (`:49`).

- **CRITICAL DISTINCTION (verified at `application-mcp-server/src/indexer/FamilyGuidanceIndexer.ts:49-52`):** the indexer parses **ONLY the top-level `guidance.companion`** field (`path.resolve(projectRoot, guidance.companion)` + `fs.existsSync` → warning at `:52`). It does **not** walk `composesWithFamilies` companions. Therefore:
  - The **9 top-level** are **gate-visible** — a stale one fires a `FamilyGuidanceIndexer` warning, folded into component health (`ComponentIndexer.ts:275`), which the Req 8 AC6 axis asserts must stay at zero.
  - The **13 nested** are **gate-blind / correctness-only** — a stale nested companion is *wrong* but produces *no warning*.
- **Remediation (Task 6.2, Lina, ATOMIC with the Task 6.1 move):** re-point **ALL 22** to `governance/…` physical paths (by-`governance/`-path / option b, code-free; companion-by-`id` is deferred to 122). **Green family-guidance axis ≠ all 22 verified** — re-pointing only the 9 the gate watches would pass the gate while leaving 13 silently broken. Re-point all 22.
- **Baseline (verified live):** Application MCP health is currently `healthy`, **0 warnings**, 9 guidance families indexed. So the pre-relocation family-guidance warning baseline is **zero** — the gate axis asserts relocation introduces *no new* warnings (i.e. it stays zero).

### D2. Companion-path template — `family-guidance/README.md:32`
- **Verified at `family-guidance/README.md:32`** (exact line): `companion: ".kiro/steering/Component-Family-{Name}.md"  # required — path to paired family doc` (inside the `## YAML Schema` block, `:30` fence).
- **Remediation**: re-point the template to the `governance/` form (Task 6.2). Not gate-asserted (it is a doc template, not parsed data) but must be corrected so future family YAMLs are authored against the new path.

### D3. Reverse-coupling `../../family-guidance/*.yaml` relative links — 3
- These are links **inside Component-Family steering docs back into family-guidance**, which break on the **directory-depth change** introduced by relocation (`.kiro/steering/X.md` → `governance/X.md` changes the `../../` depth needed to reach `family-guidance/`).
- **Verified count: exactly 3. No drift from the spec's 3.**

| Component-Family doc | Line | Reverse link |
|---|---|---|
| `.kiro/steering/Component-Family-Button.md` | `:659` | `../../family-guidance/button.yaml` |
| `.kiro/steering/Component-Family-Container.md` | `:660` | `../../family-guidance/container.yaml` |
| `.kiro/steering/Component-Family-Form-Inputs.md` | `:1359` | `../../family-guidance/form-inputs.yaml` |

- All three are `[Family Guidance (Machine-Queryable)](../../family-guidance/<x>.yaml)` "read-both protocol" links.
- **Remediation**: correct the relative depth for the new `governance/` location (Task 6.2). NOTE: from `.kiro/steering/` the path to repo-root `family-guidance/` is `../../`; from `governance/` (project-root level) it becomes `../family-guidance/`. The depth shortens by one level.
- **Other family-guidance mentions in steering docs** (NOT depth-breaking, not in this set): `Platform-Resource-Map.md`, `Component-Templates.md`, `DesignerPunk-Integration-Guide.md` reference family-guidance descriptively or by non-`../../`-relative form — they do not break on the depth change and are out of the D3 set. (If any are active-doc cross-refs, they ride the Req 10 cross-ref migration, not this axis.)

---

## Summary of verified counts vs spec figures

| Surface | Spec figure (verified 2026-06-27) | Live re-verification (2026-06-29) | Drift |
|---|---|---|---|
| Total steering docs | 89 | **89** | none |
| `sync-manifest.json` steering keys | 89 (implied) | **89** | none |
| Agent `resources` steering entries | "file:// entries" (unquantified) | **170 total / 50 identity / 120 relocating** (file:// AND skill://) | **scope clarified** — both schemes; 120 is the repoint target |
| Prompt `.kiro/steering/…md` refs | 60 | **57** `.md` refs (61 raw `.kiro/steering` mentions) | **−3** (counting convention; flag) |
| Family-guidance `companion:` total | 22 (9 top + 13 nested) | **22 (9 top + 13 nested)** | none |
| README companion template | `README.md:32` | **`README.md:32`** | none |
| Reverse `../../family-guidance` links | 3 | **3** (Button:659, Container:660, Form-Inputs:1359) | none |
| Family-guidance warning baseline | (implied zero) | **0 warnings, App-MCP healthy** | none |

---

## Closing note: this inventory is the seam's per-surface input

- **Bucket A (MUST-FIX-119-A)** = the **Critical (119-A)** rows of the § "Severable Seam Partition" and the **assertion target of the Task 11 / Req 8 AC7 gate**. The gate fails and names any unremediated A-surface.
- **Bucket B (DEFERRABLE)** = rescued by the Req 2 AC3 fallback; the 57 prompt refs are the gate's per-reference resolution axis (Req 8 AC1), resolved *via* the fallback, not edited in 119-A.
- **Bucket C (R3)** = flagged for the separate Thurgood-led governance audit; **not** remediated in 119-A; **not** gated.
- **Subtask 1.4 family-guidance** = the gate's family-guidance health axis (Req 8 AC6, the 9 top-level) + the Task 6.2 atomic re-point worklist (all 22 + README + 3 reverse-links).

**The seam invariant holds:** the Req 8 exit gate passes on Bucket A + the 9 top-level family-guidance companions + per-reference prompt resolution ALONE. Severable work (the A2 `resources` decomposition, manifest build, catalog generation, companion-by-`id`) does not gate the critical path.
