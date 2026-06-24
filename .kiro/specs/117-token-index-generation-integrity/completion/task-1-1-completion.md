# Task 1.1 Completion: Build the GenerationIntegrityCheck engine

**Date**: 2026-06-13
**Task**: 1.1 Build the `GenerationIntegrityCheck` engine
**Type**: Architecture
**Status**: Complete

---

## Artifacts Created

- `src/tools/integrity/types/index.ts` — full type surface transcribed from design.md (engine, diff, divergence, classification, manifest, audit, decision-record) + the pluggable `FreshGenerator` adapter. Defines the contracts Tasks 1.2/1.3 implement against.
- `src/tools/integrity/inventory.ts` — `INVENTORY: ArtifactRef[]` materializing R1 AC1; `BlendUtilities.{web.css,ios.swift,android.kt}` enumerated concretely (Ada design R1); product tokens marked `optional`.
- `src/tools/integrity/Normalizer.ts` — the semantic-equality pass (Design D1): parse + recursive volatile-field stripping for yaml/json; header-timestamp-line removal + whitespace/EOL normalization for css/swift/kotlin. Rule-driven (`DEFAULT_NORMALIZATION_RULES`).
- `src/tools/integrity/SemanticComparator.ts` — key-order-independent recursive deep-diff (structured) + positional line-diff (text); coarse dimension tagging (color-format / component-presence / theme-varying).
- `src/tools/integrity/manifest.ts` — `EMPTY_MANIFEST` scaffold + `matchesManifest()` (minimatch over `${path}#${locator}`).
- `src/tools/integrity/GenerationIntegrityCheck.ts` — the engine: committed-from-disk vs. fresh-from-`FreshGenerator`, normalize → compare → aggregate; missing-artifact (ENOENT only — other I/O errors fail loudly) and optional-absent handling; manifest-aware `allEqual`; `provisional`/`generatedVia` flow through from the generator.
- `src/tools/integrity/__tests__/{Normalizer,SemanticComparator,GenerationIntegrityCheck}.test.ts` — 21 tests.

Layout mirrors the existing `src/tools/release/` tool (cli/pipeline/types/__tests__ convention).

## Architecture Decisions

### Decision: Fresh generate is a pluggable `FreshGenerator`, not baked into the engine
- **Options:** (a) the engine shells out to `generate` internally; (b) inject a `FreshGenerator` adapter.
- **Decision:** (b).
- **Rationale:** decouples the *comparison engine* (1.1) from the *generate orchestration* (1.2). 1.1 is fully unit-testable with in-memory doubles; 1.2 supplies the real generator (documented CLI when available, else the ts-node workaround). The adapter carries `provisional`/`generatedVia`, so the Finding-2 trust gate (P7) flows through honestly rather than being faked in the engine.
- **Trade-off:** one extra interface; ✅ clean 1.1/1.2 seam, testability, honest provisional propagation.

### Decision: Semantic equality via a rule-driven normalization pass (implements Design D1)
- Byte comparison rejected. Normalizer transforms both sides before compare: structured → parsed + volatile-stripped; text → header-timestamp lines dropped + whitespace normalized. Rule set is intentionally minimal here; the complete set is finalized in Task 5.1 (Open Item 4).
- **Grounding:** the token-index YAML carries **no** volatile header (verified — opens at `tokens:`), so timestamp normalization is a dist-file concern; token-index equality is pure deep-compare.

### Decision: A missing key emits one divergence for the whole subtree (not per-leaf)
- An emptied `components.yaml` surfaces as a single `component-presence` divergence per dropped token, which is the correct R4-drift signal — not hundreds of leaf divergences.

## Implementation Details

- **Scope split (1.1 vs 1.2):** 1.1 = comparison engine + inventory + manifest scaffold + normalization tests. The `DivergenceClassifier`, `AuditReport` assembly, and the real `FreshGenerator` are 1.2; their **types** are defined here so 1.2 implements against stable contracts.
- **Dependencies:** `js-yaml` (confirmed used in production, incl. `generateTokenIndex.ts`), `minimatch` (confirmed dependency). No new deps; no external diff library (positional line-diff is dependency-free and correct for deterministic generated output).
  - **⚠ CORRECTION (F-C1, fixed `f01a1491`):** the `js-yaml` "confirmed" above was **in-repo (hoist-luck) only** — it was satisfied transitively in this repo's node_modules and was **false on a clean consumer install** (`js-yaml` was undeclared in dependencies; `npx designerpunk init` crashed). Original line preserved above as historical record; distribution-layer fix is Spec 123 scope.
- **Strict TS:** clean under the project's `strict: true` (LSP `get_diagnostics`: none).

## Validation (Tier 3: Comprehensive)

### Syntax / Type
- ✅ ts-jest compiled all modules + tests (strict mode) with zero errors.
- ✅ LSP `get_diagnostics` on `GenerationIntegrityCheck.ts`: no diagnostics.

### Functional — 22 tests, 3 suites, all passing (`npx jest src/tools/integrity`)
- **Normalizer (core requirement):** a changed timestamp is ignored (structured + text); a changed value is NOT ignored (structured + text); volatile-key recursive strip; ISO-datetime-valued string strip; JSON parse+strip; CRLF/whitespace normalization.
- **SemanticComparator:** key-order-independent equality; precise leaf locator; emptied-subtree → single `component-presence` divergence (R4 drift); rgba→oklch → `color-format` (Finding 1); stable manifest-matchable id; positional text line-diff.
- **Engine:** `allEqual` on semantic equality with `provisional`/`generatedVia` propagation; `diverged` on value change; emptied `components.yaml` → component-presence; manifest allowlisting (diverged-but-allowed → `allEqual` true, status still `diverged`); `missing-fresh`; **non-ENOENT read error fails loudly** (EISDIR propagates, not masked as drift); unconfigured-optional absent → equal.

### Design-soundness
- Engine = audit's first invocation AND verification's repeatable invocation (one artifact, Design "shared machinery") — confirmed by the reusable `run()` API.
- Comparator already detects the two live findings' shapes against fixtures, evidence the engine is fit for the Task 1.2 baseline run.

## Requirements Compliance

- ✅ **R2 AC1** — `run()` asserts fresh reproduces committed OR every divergence is manifest-allowlisted (`allEqual`).
- ✅ **R2 AC2** — semantic equality via normalization; byte-equality explicitly not used.
- ✅ **R2 AC3** — the check is a reusable class, runnable as the audit exit criterion and repeatably thereafter.
- (R2 AC4 / P7 — documented-CLI trust gate — flows through via `FreshGenerator.provisional/generatedVia`; the real generator is Task 1.2, the certification lift is Task 5.3.)

## Integration Points / Handoff to Task 1.2

- **Implement the real `FreshGenerator`** — run `generate` to a scratch tree (documented CLI if available → `generatedVia: 'documented-cli'`, `provisional: false`; else the ts-node workaround → `provisional: true`), read artifacts from it. Plug into `GenerationIntegrityCheckImpl`.
- **Implement the `DivergenceClassifier`** against the defined `Classification`/`ProvenanceBucket` types — the engine's `Divergence[]` is its input; the dimension tags are coarse hints, not the authoritative bucketing.
- **Assemble the `AuditReport`** (orphaned-helper scan, Finding-2 characterization, the named-shared-input/registry-pre-population/index-vs-dist/DTCG-Figma checks per the rewritten Task 1.2) and run the baseline.
- **Normalization rule set + manifest seed** remain to be finalized in Task 5.1 (Open Item 4); the mechanism is in place and tested.

## Lessons / Notes

- Grounding in the real artifacts before writing paid off: confirmed token-index has no volatile header (simplified the YAML normalization), confirmed the `rgba(...)` mode-aware color shape (informs Ada's R3 `value`-shape decision), and confirmed `js-yaml`/`minimatch` availability (avoided a dependency rabbit hole).
  - **⚠ CORRECTION (F-C1, fixed `f01a1491`):** the `js-yaml` availability "confirmed" here was **in-repo (hoist-luck) only** and **false on a clean consumer install** — `js-yaml` was undeclared in dependencies, so `npx designerpunk init` crashed. Original line preserved as historical record.
- The engine deliberately does not run a real generate yet — keeping 1.1 a pure, fast, deterministic unit. This preserves the investigation-first gate: nothing actually generates or compares against the live repo until the audit (1.2) runs under the checkpoint discipline.
- **Fail-loudly correction (Peter review):** the initial `readCommitted` swallowed *all* errors to `null`, conflating a missing file (legitimate `missing-committed`) with real I/O errors (which would masquerade as drift). Corrected to swallow ENOENT only and rethrow everything else, with a regression test (EISDIR propagates). Also removed a dead defensive `try/catch` + `??` fallback in `asString` (parsed YAML/JSON is always serializable — let it throw if that invariant breaks). The parse paths (`yaml.load`/`JSON.parse`) were already fail-loud. DI default parameters were retained — they wire production defaults and enable test injection; they are not value-fallbacks masking data.
