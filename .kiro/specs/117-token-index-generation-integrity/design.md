# Design Document: Token-Index Generation Integrity

**Date**: 2026-06-13
**Spec**: 117 - Token-Index Generation Integrity
**Status**: Design Phase
**Dependencies**:
- Spec 112 (OKLCH migration) — Complete; this spec completes its token-index gap.
- Spec 115 (post-OKLCH stabilization) — Complete.
- Finding 2 (CLI tsx/ESM loader) — **RESOLVED externally by Spec 118 Increment 1** (committed `041aaea8`, 2026-06-24); not owned here. The documented `generate` CLI now runs end-to-end, so the documented-CLI trust gate is executable and baseline conclusions are no longer categorically *provisional*. The originally-assumed one-line fix was empirically false; see [`findings/118-closeout-note.md`](findings/118-closeout-note.md). Restored trust is **config-load-path only** — raw-`.ts` exports (`./blend`/`./build`/`./types`) remain unverified until 118 Increment 3b (outside this spec's scope).
- Spec 116 (sync/customization safety) — Decoupled; no dependency.

---

## Overview

This design restores **generation integrity** to the token-index pipeline. It is structured around one governing decision: **the investigation is a first-class, gating phase**, not preamble to a fix. The bulk of this document specifies the *audit* (R1) and the *generation-integrity verification* (R2) in full — they are the spec's spine and fall in the verification/governance domain. The fix-side requirements (R3 OKLCH-in-index, R4 component-token loading, R5 theme-varying) are specified at **contract/outcome level only**: their detailed Rosetta mechanics are deliberately deferred to Ada and finalized *after* the audit, per the post-investigation checkpoint (R1 AC8/AC9). Locking fix mechanics now would violate investigation-first and pre-empt the very diagnosis the audit exists to confirm.

**Domain boundary for this document (confirmed Ada+Thurgood+Peter, 2026-06-13):** Thurgood owns the document structure, the R1 audit methodology, the R2 verification harness implementation (test infrastructure), and standards. Ada owns the R3/R5 technical content (token-index OKLCH data flow, theme-varying computation) and whole-spec correctness review. Where this document touches Rosetta internals, it states the *contract the verification will assert*, not the implementation.

---

## Architecture

### Phased flow (gated)

```
┌──────────────────────────────────────────────────────────────────────┐
│  PHASE 1 — INVESTIGATION / BASELINE AUDIT  (R1)   [gates everything]   │
│                                                                        │
│   Inventory ──▶ committed-vs-fresh diff ──▶ four-bucket classify       │
│        │              (semantic, R2)              │                    │
│        │         orphaned-helper scan             │                    │
│        │         Finding-2 config-load char.      ▼                    │
│        └────────────────────────────────▶  AuditReport (provisional)   │
│                                                   │                    │
│                          ╔════════════════════════▼═══════════════════╗│
│                          ║  POST-INVESTIGATION CHECKPOINT (R1 AC8/AC9) ║│
│                          ║  human re-gate → DecisionRecord (dated):    ║│
│                          ║  kept / revised / rescoped per R3–R5        ║│
│                          ╚════════════════════════╤═══════════════════╝│
└───────────────────────────────────────────────────│────────────────────┘
                                                     │ (scope frozen)
┌────────────────────────────────────────────────────▼───────────────────┐
│  PHASE 2 — FIXES (R3/R4/R5)   [outcome-level here; Ada mechanics post-gate]│
│   Finding 1 (R3) ─▶ re-diff ─▶ Finding 3 residue (R4/R5) ─▶ re-diff       │
└────────────────────────────────────────────────────┬───────────────────┘
                                                     │
┌────────────────────────────────────────────────────▼───────────────────┐
│  PHASE 3 — VERIFICATION (R2/R6)                                          │
│   GenerationIntegrityCheck (semantic equality + manifest)                │
│   ─▶ regenerate ─▶ reindex Application MCP ─▶ documented-CLI trust gate   │
│   ─▶ provisional lifted                                                  │
└──────────────────────────────────────────────────────────────────────────┘
```

### Why the audit and the verification share machinery

The Phase-1 audit ("does committed equal fresh-generate?") and the Phase-3 verification ("does it *still* equal, after fixes?") are the **same comparison run at different times**. They therefore share one engine — the `GenerationIntegrityCheck` (below). The audit is its first invocation (establishing the baseline and classifying divergences); the verification is its repeatable invocation (the recurrence-prevention deliverable). Building them as one component is the direct expression of the guiding principle: the fix and its guard are the same artifact, not two.

---

## Components and Interfaces

### 1. `GenerationIntegrityCheck` (R2 — Thurgood, test infrastructure)

The core engine. Compares committed artifacts against a fresh generate using **semantic equality**, and reports divergences for classification.

```typescript
/** A single generated artifact under integrity comparison. */
interface ArtifactRef {
  path: string;                       // e.g., "token-index/primitives.yaml"
  kind: 'yaml' | 'css' | 'swift' | 'kotlin' | 'json';
  optional: boolean;                  // e.g., dist/product/* only if configured
}

/** Result of comparing one artifact, committed vs. fresh. */
interface ArtifactDiff {
  artifact: ArtifactRef;
  status: 'equal' | 'diverged' | 'missing-committed' | 'missing-fresh';
  divergences: Divergence[];          // empty when status === 'equal'
}

/** Outcome of the whole check. */
interface IntegrityResult {
  diffs: ArtifactDiff[];
  allEqual: boolean;                  // true only if every diff is 'equal' OR allowlisted
  provisional: boolean;               // true until documented-CLI reproduction (R2 AC4)
  generatedVia: 'documented-cli' | 'ts-node-workaround';
}

interface GenerationIntegrityCheck {
  /** Run a fresh generate (via documented CLI when available) and diff against committed. */
  run(opts: { inventory: ArtifactRef[]; manifest: IntentionalDivergenceManifest }): IntegrityResult;
}
```

**Semantic equality (R2 AC2)** is implemented as a normalization pass applied to both sides before comparison (see Data Models → `NormalizationRule`). Byte comparison is explicitly rejected (Design Decision D1).

**Inventory materialization note (Ada design R1):** when the harness materializes `ArtifactRef[]` from the requirements inventory, "theme/blend outputs" must concretely enumerate the blend-utility files (`BlendUtilities.{web.css,ios.swift,android.kt}`) so a blend-generator drift can't slip through an unlisted gap.

### 2. `DivergenceClassifier` (R1 — Thurgood, audit methodology)

Takes each `Divergence` and assigns a provenance bucket, recording causal links.

```typescript
type ProvenanceBucket =
  | 'migration-gap'    // (a) generator never updated
  | 'generation-bug'   // (b) wrong output for current config
  | 'config-drift'     // (c) committed predates a config change (stale-but-correct)
  | 'hand-assembly';   // (d) manually edited

interface Classification {
  divergence: Divergence;
  bucket: ProvenanceBucket;
  causedBy?: string;                  // id of another classification (e.g., a (b) that causes this (c))
  rationale: string;
  correctTarget: 'committed' | 'fresh' | 'neither' | 'unknown'; // which side is the right answer
}
```

`correctTarget` is the operationally important field: it records, per divergence, *which side the fix should converge toward* — and surfaces the "committed = correct target" assumption (Correctness Property P6) for the checkpoint to validate rather than assume.

### 3. `AuditReport` (R1 completion artifact)

Aggregates diffs + classifications; enforces the completion criterion (every inventory artifact diffed AND classified) and the clean-exit discipline.

```typescript
interface AuditReport {
  inventory: ArtifactRef[];
  classifications: Classification[];
  orphanedHelpers: string[];          // exported but never imported by a non-test / non-generation module on the OKLCH migration surface (R1 AC4). NB (Ada): getOklchMetadata IS imported by OklchExport.test.ts but not by the generation path — test-only imports must not mask an orphan.
  newFindings: TriagedFinding[];      // beyond the 3 originals (R1 AC5) — logged, never silently carried
  finding2: { documentedCliRuns: boolean; configLoadEquivalentToWorkaround: boolean | 'unverified' };
  complete: boolean;                  // true iff every inventory artifact diffed AND classified
  provisional: boolean;
}

interface TriagedFinding {
  summary: string;
  disposition: 'in-scope' | 'deferred';
  issueRef?: string;                  // issues-registry entry when deferred
  rationale: string;                  // why / where / impact (deferral rationale standard)
}
```

### 4. Post-investigation checkpoint → `DecisionRecord` (R1 AC8/AC9 — the re-gate)

Not code — a governance artifact produced by the human review at the Phase-1→Phase-2 boundary.

```typescript
interface DecisionRecord {
  date: string;                       // dated (AC9)
  auditReportRef: string;
  perRequirement: Array<{
    requirement: 'R3' | 'R4' | 'R5';
    determination: 'kept' | 'revised' | 'rescoped';
    rationale: string;
  }>;
  sharedRootCauseConfirmed: boolean | 'refuted'; // the Finding 1 ↔ R5/Q4 hypothesis
}
```

The `DecisionRecord` is the certifiable evidence that the re-gate occurred (answering my own R1 feedback: "not 'we feel done'"). No fix proceeds without it.

### 5. Fix-side contracts (R3/R4/R5 — OUTCOME LEVEL; Ada supplies mechanics post-checkpoint)

These are stated as the **contract the verification asserts**, not as implementation. Detailed mechanics are informed-placeholders pending the audit and the `DecisionRecord`.

- **R3 (OKLCH in token-index):** *Contract* — every color-primitive entry in `token-index/primitives.yaml` carries an OKLCH representation (resolved value + `{ hue, lightness, chroma }` channels) consistent with `dist/DesignTokens.web.css`; no `rgba(` remains. *Open for Ada/design-after-audit:* the `value` shape (single representative + metadata vs. mode-aware) per the `get_token_details` contract (Q1/Q2), and the `ComposedColor` data-flow / `getOklchMetadata` wiring. **Ada to supply this section's mechanics.**
- **R4 (component-token loading):** *Contract* — when component-token sources are present, `generate` loads/indexes them regardless of `tokenSourceMode`; warning fires in all modes; regenerated `components.yaml` semantically reproduces the committed set; a consumer authoring its own component tokens in package mode is covered. *Design considerations to resolve (carried from Lina R1, sharpened in Lina design R1):*
  - **(i) "source presence" includes the convention dir.** Define presence to include convention-based `{tokenSourceRoot}/component/` existence (the loader's **Source-1**), not only explicit `componentTokenDirs` config (**Source-2**), so a convention-only repo isn't silently missed.
  - **(ii) one gate fixes both halves; full-surface sufficiency is an audit item.** Source-confirmed (Lina): the single `if (tokenSourceMode === 'local')` wrapper in `runGenerate()` (≈`designerpunk.ts:109`) wraps *both* the `loadComponentTokens` call *and* the "none found" warning — so one `if`-removal satisfies both load-in-all-modes and warn-in-all-modes. The internal check at ≈`loadComponentTokens.ts:29` is allowOverwrite-only and does **not** short-circuit Source-2. The audit still confirms call-site removal is *sufficient across the full surface* (nothing else downstream assumes local-only).
  - **(iii) double-registration risk (Lina, new).** Un-gating the call site while `setDefaultAllowOverwrite` stays local-only may trade the silent drop for a hard double-registration *throw* in package mode (the allowOverwrite toggle exists precisely to handle double-registration vs. package-internal side-effect imports). The fix must determine whether `allowOverwrite` should also be enabled when loading in package mode; the audit confirms whether package-mode side-effect imports pre-populate the registry, rather than discovering it as a runtime throw mid-fix.
  - **Ada owns the loader fix; Lina consulted on loading semantics.**
- **R5 (theme-varying):** *Contract* — theme-varying = union of (config theme override keys) and (color tokens whose primitive has differing light/dark `base` values); source (b) is independent of `config.themes`; regenerated `themeVarying` reproduces the committed `true` entries for mode-varying colors. *Open for the audit:* confirm or refute the **shared root cause with R3** (the post-OKLCH color-primitive value shape that source (b) reads); if confirmed, one fix satisfies R3 and R5 (guiding principle). **Ada to supply mechanics.**

---

## Data Models

```typescript
/** One semantic difference between committed and fresh for an artifact. */
interface Divergence {
  id: string;
  artifactPath: string;
  locator: string;                    // token name / key path within the artifact
  committedValue: unknown;
  freshValue: unknown;
  dimension: 'color-format' | 'component-presence' | 'theme-varying' | 'other';
}

/** Normalization applied to both sides before comparison (defines "semantic equality"). */
interface NormalizationRule {
  appliesTo: ArtifactRef['kind'][] | 'all';
  description: string;
  // examples (final set decided in implementation):
  //  - strip/zero ISO timestamps in generated headers
  //  - strip `lastIndexTime`
  //  - canonicalize key ordering
  //  - canonicalize numeric/format representation (not value) where lossless
}

/** Explicit, reviewed set of divergences that are intentional and acceptable. */
interface IntentionalDivergenceManifest {
  version: string;
  entries: Array<{
    matcher: string;                  // artifact + locator pattern
    reason: string;
    approvedBy: string;               // human ratification (ballot governance)
    date: string;
  }>;
}
```

The `IntentionalDivergenceManifest` is the mechanism that keeps R2 AC1 ("OR every divergence is classifiable and intentional") **repeatable** rather than re-judged each run (Design Decision D2). "Intentional" must be encoded, not re-decided.

---

## Correctness Properties

These are the invariants the verification asserts. They are the testable heart of R2.

| ID | Property | Source |
|----|----------|--------|
| **P1** | *Semantic equality* — comparison is over normalized content; volatile fields (ISO timestamps, `lastIndexTime`) and lossless ordering/format differences never count as divergence. | R2 AC2 |
| **P2** | *Completeness* — `AuditReport.complete` is true iff every inventory artifact is both diffed and classified. | R1 AC3 |
| **P3** | *No legacy color format* — after R3, no `token-index` color entry contains `rgba(`; every color carries OKLCH + channels matching `dist` CSS. | R3 AC1/AC2 |
| **P4** | *Component tier integrity* — when component-token sources are present, the indexed component tier is non-empty and semantically reproduces the committed set; holds in package mode and for a consumer authoring its own tokens. | R4 AC1/AC4/AC5 |
| **P5** | *Theme-varying rule* — theme-varying equals union(config overrides, primitive light/dark diffs) and is invariant to `config.themes` being empty. | R5 AC1/AC2 |
| **P6** | *Validated target* — for every classified divergence, the side designated `correctTarget` is **confirmed by the audit**, not assumed (the "committed = correct" assumption is checkpoint-validated). | R1 AC8 |
| **P7** | *Certification gate* — non-provisional certification requires the baseline reproduced via the documented `generate` CLI. | R2 AC4 / R6 AC3 |

---

## Error Handling

- **Documented CLI cannot run (Finding 2):** *(Historical — this fallback path applied while Finding 2 was open. Spec 118 Increment 1 has since made the documented CLI runnable; the trust gate now runs against it directly. Retained because the harness still implements this degraded mode for any future config-load regression.)* the check runs via the `ts-node` workaround, sets `generatedVia: 'ts-node-workaround'` and `provisional: true`, and additionally records `configLoadEquivalentToWorkaround` (verified / unverified). All downstream conclusions inherit `provisional`. Certification (P7) is blocked, not faked. In tasks.md this was a **Blocked-Task** (Process-Spec-Planning § Cross-Spec Coordination) on the Finding-2 dependency, so the block was tracked rather than silently gating exit.
- **Missing artifact (committed or fresh):** surfaced as `missing-committed` / `missing-fresh` status — itself a divergence requiring classification (an emptied `components.yaml` is exactly this).
- **Classification ambiguity:** a divergence that cannot be confidently bucketed is recorded with `bucket` best-effort + `correctTarget: 'unknown'` and escalated to the checkpoint — never silently resolved.
- **Manifest gap:** an un-allowlisted divergence fails `allEqual`; the check does not pass by treating unknown divergences as acceptable.

---

## Testing Strategy

- **The verification harness is itself the primary regression guard** — it is the recurrence-prevention deliverable, run as the audit's exit criterion and repeatably thereafter.
- **Normalization unit tests:** assert each `NormalizationRule` neutralizes the intended volatile field and nothing else (e.g., a changed timestamp is ignored; a changed color value is not).
- **Consumer-repo fixture (R4 AC5):** a fixture project in package mode that declares its *own* `componentTokens` — the source repo alone does not exercise the consumer silent-failure path (Lina + Thurgood handoff flag). The harness must drive this fixture.
- **R4 AC3 ordering + mode (Lina design R1):** the "none found" warning test is only meaningful *after* the gate fix (today the loader isn't invoked in package mode), so it is sequenced after the R4 mechanics land — and it MUST run in **package mode**, not only local. The silent-failure surface has two halves: (a) configured sources silently *dropped* (the consumer fixture covers this), and (b) genuinely-empty sources silently *not warned* (the AC3-in-package-mode test covers this). Neither alone is sufficient.
- **Outcome regression tests** for P3/P4/P5 against the regenerated artifacts.
- **Validation tiers** (assigned in tasks.md): the audit/checkpoint and the verification harness are Architecture-tier (Tier 3, comprehensive); fix-side tasks inherit tiers per their post-audit definition.

---

## Design Decisions

### Decision 1: Semantic equality, not byte equality

**Options:** (a) byte-identical comparison; (b) semantic comparison with a normalization pass.
**Decision:** (b).
**Rationale:** generated artifacts embed volatile fields (ISO timestamps, `lastIndexTime`) and platform-formatting/ordering that differ harmlessly between runs; byte-equality is *definitionally impossible* here and would produce constant false drift.
**Trade-offs:** ✅ correct, stable signal; ❌ requires a maintained normalization spec, which is itself surface that can be wrong.
**Counter-argument:** byte-equality is simpler and unfakeable. **Response:** simplicity that always fails isn't simple — it's noise that trains people to ignore the check, which is how silent drift survives. The normalization spec is bounded and testable (Testing Strategy).

### Decision 2: Encode intentional divergences as a manifest

**Options:** (a) re-judge "is this divergence intentional?" each run; (b) an explicit, human-ratified `IntentionalDivergenceManifest`.
**Decision:** (b).
**Rationale:** R2 AC3 requires repeatability; human re-judgment is not repeatable and not certifiable.
**Trade-offs:** ✅ deterministic, auditable, ratified; ❌ the manifest must be maintained and can become a dumping ground.
**Counter-argument:** a manifest can hide real drift behind "approved exceptions." **Response:** every entry carries `approvedBy` + `date` + `reason` under ballot governance, and the manifest is itself reviewable — an exception you can see and challenge beats a judgment that evaporates after the run.

### Decision 3: Investigation-first with a hard re-gate

**Options:** (a) diagnose-and-fix per finding; (b) full baseline audit → checkpoint → fixes.
**Decision:** (b).
**Rationale:** preserves single-variable attribution and prevents locking solutions before the problem is understood — directly the failure mode that produced this spec.
**Trade-offs:** ✅ sustainable, attribution-clean; ❌ slower to first fix.
**Counter-argument:** the diagnoses already look solid (Lina confirmed R4; Ada pre-analyzed R5) — the gate may be ceremony. **Response:** "looks solid" is exactly the state the prior three silent-drift incidents were in. The `DecisionRecord` is cheap insurance against a confident-but-wrong diagnosis (notably the unconfirmed R3↔R5 linkage). Bounded by clean-exit, the cost is a review, not unbounded scope.

### Decision 4: Treat the R3 ↔ R5 shared root cause as a hypothesis, fixed once only if confirmed

**Options:** (a) fix R3 and R5 independently; (b) assume shared cause and fix once; (c) hold as hypothesis, let the audit decide.
**Decision:** (c).
**Rationale:** the guiding principle says fix the spine, not the leaf — but only when the spine is *confirmed*. Ada's design review deepened this: the two findings read color through **different representations in different modules** — R3 via `getOklchMetadata(ComposedColor.resolved)`, R5 via `computeThemeVaryingTokens` reading `primitive.platforms.web.value → {light.base, dark.base}`. They share a *historical* cause (the half-converted OKLCH migration) but not a proven *code* root cause, and the edits live in separate files. A single fix is justified only if the audit proves the actual broken input is identical (`DecisionRecord.sharedRootCauseConfirmed`).
**Trade-offs:** ✅ avoids both duplicate fixes and premature coupling; ❌ defers a satisfying simplification until the audit.
**Counter-argument:** coupling them now would save a step. **Response:** if the hypothesis is wrong, coupling produces a fix that satisfies neither cleanly — premature coupling is its own short-term-fix trap.

### Decision 5: Gate component-token loading on source presence, not token-source mode

**Options:** (a) keep mode-gating; (b) gate on `componentTokens`/`componentTokenDirs` presence.
**Decision:** (b) — Lina's root-cause call (her domain), confirmed by Peter.
**Rationale:** `tokenSourceMode` answers "where do primitives/semantics resolve," orthogonal to "should component tokens be indexed"; the conflation silently drops a first-class served tier.
**Trade-offs:** ✅ fixes source repo + consumer blast radius with one change; ❌ requires defining "source presence" precisely (convention dir vs. explicit config).
**Counter-argument:** "a consumer never regenerates the package's component tokens, so package-mode exclusion is intended." **Response (Lina, accepted):** true for *consumer* repos, but breaks for the *source* repo — the only place the package's `components.yaml` is authored; configured `componentTokenDirs` is the disambiguating signal.

### Decision 6: Drive the consumer scenario from a fixture in the verification harness

**Options:** (a) verify against the source repo only; (b) add a consumer-repo fixture.
**Decision:** (b).
**Rationale:** R4 AC5's consumer blast radius is invisible to source-repo-only testing; without a fixture the most consumer-impacting guarantee is unverified.
**Trade-offs:** ✅ genuinely exercises the silent-failure path; ❌ a fixture project to build and maintain.
**Counter-argument:** the fix is the same code, so the source-repo test implies the consumer case. **Response:** "implies" is the assumption that lets blast radii ship unnoticed; the fixture converts an inference into a tested guarantee.

---

## Open Items / Informed-Placeholder Boundary

Deliberately deferred to Ada and the post-investigation checkpoint (not gaps — investigation-first discipline):

1. **R3 mechanics** — `ComposedColor`/OKLCH data-flow into the token-index, `getOklchMetadata` wiring, and the color-entry `value` shape (Q1/Q2). Ada supplies; finalized after the audit confirms the diagnosis.
2. **R5 mechanics** — the corrected `computeThemeVaryingTokens` source-(b) behavior, contingent on the R3↔R5 linkage determination in the `DecisionRecord`. *(Ada parked flag: the `refName.startsWith('rgba(')` guard in `computeThemeVaryingTokens` is **load-bearing** if baked-alpha semantic refs still carry literal `rgba(...)` post-audit — the R5 fix must not naively strip it.)*
3. **R4 "source presence" definition** and the internal-gate sufficiency check — resolved with the audit's findings; Ada owns the loader change, Lina consulted.
4. **Normalization rule set + manifest seed** — the concrete `NormalizationRule[]` and initial manifest entries, finalized during R2 harness implementation.

These items are intentionally *outcome-bound* in this document. The checkpoint's `DecisionRecord` authorizes their finalization.
