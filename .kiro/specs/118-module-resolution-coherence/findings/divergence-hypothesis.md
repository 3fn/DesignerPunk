# Divergence-Hypothesis Test (R4 AC7 — falsifiable, bounded, clean-exit)

**Date**: 2026-06-25
**Spec**: 118 — Module-Resolution Coherence, Task 7.4 (Increment 2)
**Agent**: Ada (confirmation owner, Resolved Decision 1) + Thurgood (disposition record)
**Scope**: Investigation-only. No swap, reconcile, or migration. This dispositions the hypothesis and routes the generation-gap work; it does not fix it.

---

## The hypothesis (as stated by R4 AC7 / design § Divergence-hypothesis test)

> Test whether the known generation gaps — **`token-index-generation-gaps`** and **`blendutilities-not-generated`** — **correlate with resolution divergence** (the tsx/ts-node runtime-mechanism split this spec exists to resolve).

Disposition rules (design, verbatim intent):
- **"Confirmed"** = resolution divergence is a *plausible contributor* → escalate to root-cause (NOT proven cause).
- **"Disproven"** = the generation-gap work **exits Spec 118's scope cleanly** via a documented **routing** finding (not silent carry).

This is **correlation-not-causation** and explicitly **falsifiable** with a clean exit. The instrument is the Increment-2 parity harness (`ParityOrchestrator`, `npm run test:parity`).

---

## The falsifiable test

The parity harness runs the **same** generator (`scripts/generate-platform-tokens.ts`) under the two runtime mechanisms — **ts-node** (root A) and **tsx** (root B) — into two scratch trees, isolating the runtime-resolution mechanism as the **single variable**, and compares the generated artifacts semantically (117's `Normalizer` + `SemanticComparator`).

**The decisive prediction:** IF the resolution mechanism were a contributor to the generation gaps, THEN switching the loader (ts-node ↔ tsx) would change the generated output — the two trees would diverge on the affected artifacts (or one mechanism would produce an artifact the other does not). IF the mechanism is *not* a contributor, the two trees are identical regardless of which gap is present.

---

## Result — DISPROVEN (clean exit)

The two runtime mechanisms produce **semantically identical output across all 11 non-optional artifacts** (the full `npm run test:parity` table is in [evidence-table.md](evidence-table.md)). Specifically, on the two artifacts the gaps touch:

1. **`token-index/primitives.yaml` is BYTE-IDENTICAL** between ts-node and tsx output (zero raw divergence, not merely zero after normalization). The OKLCH/RGBA content of the token-index does **not** depend on which loader generated it.

2. **No `BlendUtilities.*` artifact is produced by EITHER mechanism** (verified by direct `find` over both fresh trees — absent under ts-node AND under tsx, identically). The dormant blend-write path fires under neither loader.

Because the gaps manifest **identically** under both resolution mechanisms, **resolution divergence is not a plausible contributor** to either gap. The hypothesis is **disproven**.

### Corroboration — the originating issues already located the gaps in generator CODE, not the loader

This disposition does not rest on the parity harness alone; the originating issues independently locate both gaps in generator logic:

- **`token-index-generation-gaps`** ([.kiro/issues/2026-06-13-token-index-generation-gaps.md](../../../issues/2026-06-13-token-index-generation-gaps.md)) — its own Finding-1 evidence is dispositive: *"A forced fresh regeneration produced a **byte-identical** `primitives.yaml` (still 216 RGBA / 0 OKLCH), while the **same run** emitted OKLCH into `dist/DesignTokens.web.css`."* Same run, same loader, divergent formats → the cause was a **generator code-path bug** (`generateTokenIndex.ts` bypassed `formatOklchColor`; the purpose-built `getOklchMetadata` helper was orphaned), **not** a resolution issue. This issue is now **✅ RESOLVED by Spec 117** (the token-index generator was wired to the OKLCH path; certified non-provisionally on the documented-CLI trust gate). The parity harness's byte-identical `primitives.yaml` corroborates the fix is loader-independent.

- **`blendutilities-not-generated`** ([.kiro/issues/2026-06-13-blendutilities-not-generated.md](../../../issues/2026-06-13-blendutilities-not-generated.md)) — a **dormant generator-write path** in `TokenFileGenerator.ts` (~lines 177/196/215) that fires under no current pipeline/config, at any extension. Mechanism-independent absence (confirmed in both parity trees). Its code disposition is **already owned** by the holistic blend review ([.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md](../../../issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md)), which must settle the OKLCH-blend/platform-delivery questions before deciding delete-vs-activate.

### The one resolution-genuine item — already 118's, already addressed

The `token-index-generation-gaps` issue also carried a **Finding 2** — *"`npx designerpunk generate --force` fails — the CLI's tsx/ESM loader rejects the config directory import"*. **That** is a genuine resolution-mechanism failure, and it is precisely the failure **Spec 118 Increment 1** fixed (the contract-preserving loader swap inside `loadConfig`, Task 2; certified by the subprocess consumer guard, Task 3). So the resolution-genuine slice of the gap theme was correctly 118's, and is **done** — it does not need the generation-gap *work* to be absorbed.

---

## Clean-exit routing (NOT silent carry)

Per the "Disproven" rule, the generation-gap work **exits Spec 118's scope** with this explicit routing:

| Gap | Disposition | Owner / route |
|-----|-------------|---------------|
| `token-index-generation-gaps` (Finding 1 — OKLCH not in index) | **Already RESOLVED** by Spec 117; loader-independent (parity-corroborated) | Closed (Spec 117) |
| `token-index-generation-gaps` (Finding 2 — CLI loader rejects config) | **Resolved** by Spec 118 Increment 1 (the `loadConfig` swap) | Closed (Spec 118 Inc 1) |
| `blendutilities-not-generated` | **NOT resolution-caused**; dormant generator-write path | Routed to the **holistic blend review** ([2026-06-24-blend-system-architecture-and-oklch-alignment.md](../../../issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md)) — already owns it. **NOT absorbed into Spec 118.** |

Spec 118 does **not** take on the blend-generator wiring or any token-index generator-logic work. The module-resolution coherence work and the generation-gap work are **decoupled by evidence**.

---

## Honest limits on the claim (bounded, per R4 AC7)

- The harness tests **output divergence between the two runtime mechanisms under DEFAULTS** (no consumer config; no registered product tokens/themes). It directly falsifies the *stated* hypothesis ("the tsx/ts-node split causes/contributes to these gaps") because both mechanisms yield identical artifacts. It does **not** claim to exhaust every conceivable resolution pathology in every config permutation — it falsifies the specific, named correlation R4 AC7 put forward.
- "Disproven" here means **resolution divergence is not a plausible contributor to these two named gaps** — it does **not** assert the gaps are unimportant. `blendutilities-not-generated` remains a real, open generator-wiring question; it simply belongs to the blend review, not to module-resolution coherence.
- This is a **correlation** result (mechanism-independence of output), used in the design's intended direction: to *remove* a hypothesis from 118's scope, not to settle the CJS-vs-ESM direction. The direction decision (Task 8) rests on the inventories + cost evidence, not on this disposition.

---

## What this feeds

- **Task 8 (direction decision):** one fewer entangled concern — the generation gaps are **not** evidence for either direction; they are out-of-scope, routed. The direction decision is freed to rest on the entry-point / export-condition / ESM-cost inventories.
- **Evidence table:** the divergence-hypothesis row reads **"refuted → clean exit (routed)"** (see [evidence-table.md](evidence-table.md)).
