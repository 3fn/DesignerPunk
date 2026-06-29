# Task 11 — Parent Completion (COMPLETE: 11.1 / 11.2 / 11.3)

**Date**: 2026-06-29
**Spec**: 119-A — Steering Relocation & Serving Contract
**Task**: 11 — Relocation-Integrity Gate (119-A Exit Check)
**Author**: Thurgood (Civitas steward) [11.2 family-guidance axis cross-domain with Lina — Application-MCP `FamilyGuidanceIndexer`]
**Status**: COMPLETE — all three subtasks landed. The gate is built (`scripts/relocation-integrity-gate.ts` + testable core `mcp-server/src/relocation-integrity-gate/relocation-integrity-gate.ts`), unit-tested (21/21), and **RUN → full PASS across all four axes + the scope assertion.** On this PASS the gate stands as 119-A's relocation exit gate (Req 8 AC9), replacing the dissolved Phase-10 atomicity guarantee.

> **Scope authority.** The gate asserts ONLY the **Critical (119-A)** rows of the § "Severable Seam Partition" and EXPLICITLY EXCLUDES the severable far side (manifest *build*, capability-catalog *generation*, `resources` decomposition, companion-by-`id`, routing tables) — Req 8 AC8. The seam gets its teeth here: the gate passes on the Critical rows ALONE.

---

## What was built

**Pattern (mirrors Tasks 10 / 3):** a testable core in `mcp-server/src/relocation-integrity-gate/` (unit-tested under mcp-server jest, `roots: src`) + a thin runner at `scripts/relocation-integrity-gate.ts` (`npx tsx`). The core builds a real `DocumentIndexer` over `governance/` — the frozen legacy-path manifest is seeded automatically at the tail of `indexDirectory` — and exercises the live `resolveRef`, so the per-reference axis measures real resolution, not a stand-in.

**Run it:**
```
npx tsx scripts/relocation-integrity-gate.ts
```
Exit 0 on PASS, 1 on FAIL. Emits per-axis detail + named failures + a machine-readable JSON tail.

**Result shapes (design Component 5):** `GateResult { references[], couplings[], identity[], familyGuidance, scope, unresolved[], resolutionMechanism, summary }` with `ReferenceCheck`, `CouplingCheck`, `IdentityPresenceCheck`, `FamilyGuidanceAxis`, plus an added `ScopeAssertion` (carries the AC8 exclusions explicitly).

---

## 11.1 — Per-reference resolution axis (Req 8 AC1–AC4)

Enumerates every `.kiro/steering/…md` reference across the 8 `.kiro/agents/*-prompt.md` files (the live grep set; the prompts keep their legacy paths through the window — sweep is 119-B), attributes each to its `sourcePrompt`, and resolves it **split by role** (Design Decision 5 / Req 8 AC5):

- **served** (real governance-corpus refs) → resolved via the live `DocumentIndexer.resolveRef`. The gate **names** its resolution mechanism as the **Req 2 AC3 legacy-path→`id` fallback** (`resolveRef` strategy `legacy-fallback`, seeded from `FROZEN_LEGACY_MANIFEST`). A generic "MCP healthy / N indexed" check is rejected — pass is per-reference (Req 8 AC4).
- **identity** → NOT routed through MCP (handled by the 11.2 identity axis).
- **template** → illustrative path-shape placeholders (`{Name}`/`{FamilyName}`) inside MCP-usage example tables; NOT real doc references, excluded from pass/fail with the reason recorded.

**Result (live):**

| Metric | Value |
|---|---|
| Total refs enumerated (all 8 prompts) | **57** |
| served (MCP-resolved) | **54** |
| — resolved via `legacy-fallback` | **54** |
| — resolved via `id` / `indexed-key` | 0 / 0 (expected — prompts carry legacy paths) |
| identity (static presence, not MCP) | 0 *(no prompt references an identity doc by path; all 25 real distinct refs are governance docs)* |
| template (skipped, not real refs) | **3** (`Token-Family-{Name}.md`, `Component-Family-{FamilyName}.md`, `Component-Family-{Name}.md`) |
| **Unresolved served refs** | **0** |

The 54 served refs resolve via the fallback through the frozen manifest (33 entries, covering all 25 distinct real prompt refs + the 10 renamed files). This **exercises legacy-path-manifest completeness** — a missing entry would surface as a named unresolved failure here.

> **Counting note (vs. the spec's "60"):** the coupling-sweep already flagged the spec's recorded "60" as a counting-convention artifact; the live grep yields **57** `.md` refs (54 real + 3 templates). The gate asserts per-reference resolution of the *live* set, not a hardcoded "60" — exactly as the coupling-sweep recommended.

## 11.2 — Identity-presence + must-fix-coupling + family-guidance axes

**Identity axis (Req 8 AC5):** verifies identity docs by **static presence** — `id` ∈ the locked always-set AND the file exists at its `.kiro/steering/` path — NEVER via MCP. The locked set is a **static in-code list** (Design Decision 5), not a build artifact (materializing one would risk pulling a severable build concern across the seam). **Design call (recorded for scrutiny):** because no prompt references an identity doc by path, a prompt-only identity axis would be vacuous; the gate instead verifies the **full 9-doc locked set** is statically present (union of locked-set + any prompt-referenced identity id), so a regression — a deleted identity doc, or one drifting out of the locked set — is gated rather than slipping through. **Result: 9/9 verified** (`inLockedSet=true`, `fileExists=true`).

**Must-fix coupling axis (Req 8 AC7):** for EVERY coupling-sweep Bucket A surface, asserts repoint-to-`governance/` + functional, naming the surface on failure. **Result: 7/7 remediated:**

| Surface | Asserted | Result |
|---|---|---|
| `.kiro/sync-manifest.json` | 80 `governance/` keys + 9 identity `.kiro/steering/` keys + meta-guide dropped | ✓ |
| agent-definition `resources[]` (file:// + skill://) | 120 `governance/` entries; ZERO relocating docs left at `.kiro/steering/` | ✓ |
| `.cursor/mcp.json` `MCP_STEERING_DIR` + `DEFAULT_STEERING_DIR` | both → `governance/` | ✓ |
| `src/cli/init.ts` + `designerpunk.ts` | init ADDs `governance/` copyDir + KEEPS `.kiro/steering`; designerpunk repointed, no steering-spawn | ✓ |
| `src/figma/VariantAnalyzer.ts` + `DesignExtractor.ts` | construct `governance/` paths; no `.kiro/steering/` doc paths | ✓ |
| `scripts/extract-component-meta.ts` `STEERING_DIR` | → `../governance` | ✓ |
| `package.json files[]` + init template + FileScanner `MANAGED_DIRS` | files[] both; template `governance/` + no dead `get_documentation_map`; MANAGED_DIRS both | ✓ |

The A2 assertion is specifically **scheme-agnostic** (matches BOTH `file://` AND `skill://`) per the coupling-sweep correction — a `file://`-only check would miss ~68 `skill://` refs. It asserts the *break* (a relocating doc still at `.kiro/steering/`) is gone, NOT the AX decomposition (severable).

**Family-guidance axis (Req 8 AC6):** asserts ZERO new companion-path warnings by replicating `FamilyGuidanceIndexer`'s top-level-only resolution (`path.resolve` + `existsSync`) over the 9 top-level companions. **Result: 9 checked, 0 warnings** (pre-relocation baseline was 0; App-MCP health is `healthy`/0 warnings). Output **notes that green ≠ all 22 verified** — the 13 nested `composesWithFamilies` companions are gate-blind (re-pointed in Task 6.2 for correctness, not gate-asserted). A unit test pins this gate-blindness as intentional.

## 11.3 — Gate scope + exit-criterion semantics (Req 8 AC8, AC9)

The gate asserts ONLY the **critical-core** and carries a `ScopeAssertion` that **explicitly enumerates the excluded severable far side** (so the exclusion is visible, not silent):
- asserts the always-layer AX **design** EXISTS — `per-agent-ambient-design.md` (Task 9) — `axDesignExists: true`;
- does **NOT** require the ground-truth manifest **build** (token/component) nor the capability-catalog **generation** to exist;
- records the excluded surfaces: manifest build, catalog generation, `resources` decomposition, companion-by-`id`, routing tables / calibration formalization / case study.

**The seam invariant holds in code:** the gate passes on the Critical rows alone; a missing severable artifact does not fail it.

---

## Verdict + verification

**GATE: PASS** — all four axes + scope assertion green; `unresolved: []`.

| Check | Result |
|---|---|
| `npx tsx scripts/relocation-integrity-gate.ts` | **PASS** (exit 0) |
| Gate unit tests (`mcp-server/src/relocation-integrity-gate/__tests__`) | **21/21** |
| root `npm test` | **8990/8990** (377 suites) |
| root `tsc --noEmit` | clean (exit 0) |
| `npm run typecheck:scripts` | clean (exit 0) |
| mcp-server `tsc --noEmit` | clean (exit 0) |
| mcp-server `npx jest --runInBand` | **621/622** — 1 known fast-check property-parsing flake (`tests/property/parsing-properties.test.ts`); **passes on serial re-run**, untouched by this task |

The figma suites (VariantAnalyzer / DesignExtractor) — surfaces the gate asserts — pass in the root run, confirming the `governance/` repoints are functional, not merely present.

## Honest notes / where this could still be wrong

- **Identity axis is structurally vacuous against prompt refs in this corpus.** No prompt references an identity doc by path, so the AC5 "do not route identity refs through MCP" rule is never *triggered* by a real prompt ref. I mitigated by verifying the full locked set's static presence regardless — but if a future prompt *does* add an identity path ref, the gate routes it to the identity axis (classification covers both kebab + Title-Case forms). Counter-view: one could argue the axis should only assert what prompts reference; I chose the stronger invariant deliberately and flag the choice.
- **Template detection is heuristic** (`{…}` segment ⇒ placeholder). It is correct for the 3 current placeholders, but a real doc whose filename genuinely contained braces would be misclassified. No such doc exists in the corpus; flagged as a known limit.
- **The must-fix axis asserts presence/shape via targeted regex, not behavior.** It proves the surfaces *point at* `governance/`; the *behavioral* proof that they work is the root suite (figma + init/sync tests pass). The two together cover Req 8 AC7's "repointed AND functional."
- **The known mcp-server property flake is not chased** (per task guidance). It is in parsing code the gate does not touch and is nondeterministic on random markdown input.
