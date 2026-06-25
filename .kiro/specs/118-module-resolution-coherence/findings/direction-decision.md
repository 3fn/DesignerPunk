# Direction Decision (R5) — Module Direction Committed

**Date**: 2026-06-25
**Spec**: 118 — Module-Resolution Coherence, Task 8
**Decision owner**: Peter (the commitment). Ada (evidence interpretation). Main loop / Thurgood (record).
**Reads**: the fully-assembled Increment-2 evidence ([evidence-table.md](evidence-table.md) + the four inventories + [divergence-hypothesis.md](divergence-hypothesis.md)). Task 8 did not start until Task 7.4 was complete (Ada SF-4).

---

## THE DECISION

> **The committed module direction for the non-bundled runtime-TS surface is CJS-consistency.**
> **It executes fully in-spec. The escape-hatch is NOT elected.**

This satisfies R5's mandate: exactly one direction is committed, on the Increment-2 evidence, not pre-assumed, and not left undecided.

**Anchor fact (holds either way, R5 AC3):** the runtime TS-config loader **persists** — consumers author `designerpunk.config.ts`, and a TS-aware runtime loader (the Increment-1 Approach-A loader) is permanent. The direction decision governs the *package's internal resolution*, not the loader's existence.

---

## Rationale — the evidence, not a pre-pick

The evidence is **not balanced**; three independent axes favor CJS-consistency, and the pro-ESM axes either neutralize or are direction-neutral.

**Axes that favor CJS (one-sided):**
1. **jest-preset blast radius** — the shipped require-only/CJS `@3fn/core/jest-preset` reaches every consumer's test boot. CJS-consistency incurs **zero** preset cost (it stays as-is, no `"type":"module"` flip). Native ESM must spend the `.cjs` parking form + the close-state guard just to *neutralize* the strand. ([esm-cost-inventory.md](esm-cost-inventory.md) §1.)
2. **Current state of the surface** — the governed non-bundled surface is CJS top-to-bottom today (the Approach-A loader, the tsx bin, the 13 ts-node scripts, the require-only preset, no `"type":"module"`). CJS-consistency consolidates what already works; native ESM flips a surface with zero working ESM-native runtime execution. ([entry-point-inventory.md](entry-point-inventory.md).)
3. **The Task-1 loader result** — the one place ESM-native resolution was empirically tried at this spec's locus (`tsImport` from the CJS host) **failed all four matrix rows and left global residue**; the tsx-CJS loader (Approach A) passed all five accept-criteria. Native ESM has no demonstrated working loader-host story; CJS commits to the primitive that already ships. ([loader-selection.md](loader-selection.md).)

**Axes that do NOT favor ESM (neutralize / direction-neutral):**
- **Forward-compat (verified, R2 AC4):** the Increment-1 loader resolves **both** ESM- and CJS-authored consumer configs (all four Task-1 fixtures green). So the package's internal direction is **decoupled from consumer config-authoring style** — choosing CJS-consistency does **not** force consumers to write CJS configs; they can still author `export default`. This defuses ESM's strongest argument.
- **Raw-`.ts` exports trio reconciliation** (`./blend`/`./build`/`./types`, incl. `types`) — owed under *either* direction; the surfaces are identical, only the target form differs (CJS extensionless vs ESM explicit-`.js`). Not a differentiator. ([export-condition-inventory.md](export-condition-inventory.md).)
- **Typecheck-coverage asymmetry** — the `scripts/**` typecheck gate (R6 AC3) is owed under either direction; mildly more executable under the CJS/tsx branch (the working mechanism) than under ESM's under-specified one.
- **Parity all-green** — explicitly direction-silent (it proves the mechanism doesn't corrupt output, not which direction is right).

**Charter framing (decisive):** this spec exists to end an *incoherence* — to make the system **whole, not modern**. The lowest-incoherence end-state is the one that makes coherent what already works. CJS-consistency converges the already-CJS surface to one proven direction and lets 118 **close on an executed end-state** with the costliest consumer-facing line item (the preset) never touched. Native ESM, even in its best case, closes on a *deferred* execution. Coherence-by-consolidation beats coherence-by-disruption.

> Ada's independent evidence interpretation (Rosetta domain) reached the same recommendation — CJS-consistency, executed in-spec, no escape-hatch — and confirmed it is *not* a close call on the evidence. Recorded here as the interpretation input; the commitment is Peter's.

---

## Escape-hatch disposition (R5 AC5) — NOT elected

The escape-hatch defers *execution* only when **native ESM** is committed AND its cost (esp. the jest-preset blast radius) is prohibitive. Since **CJS-consistency** is committed — which incurs **no** preset migration and **no** `"type":"module"` flip — the escape-hatch condition does not arise. **Increment 3a → 3b → 3c execute in-spec**, scope-gated (each CI-green before the next), and Spec 118 closes on an *executed* coherent end-state. Group 10 (the ESM-escape-hatch close-state gate) **does not fire**.

---

## What this unblocks

- **The second tasks pass** decomposing Groups 9/10 (now: Group 9 = Increment 3a/3b/3c **CJS branch** + the static-lint polarity set to **ban explicit extensions**; Group 10 does **not** fire). The CJS branches in design.md § Direction-Gated Increments are the live ones.
- **Specs 122 (Agent Generator) and 123 (Consumer Distribution)** formalization. Both were explicit placeholder stubs gated on this decision; verified to carry **no latent ESM hard-requirement** — they are downstream of this call, not a constraint on it.
- **Task 11 (governance)** — the committed direction (CJS-consistency) and its rationale feed the steering codification.

---

## The ESM-modernization path (recorded for when the ecosystem question returns)

CJS-consistency is a deliberate bet that **internal coherence now** beats **ecosystem-alignment later** — NOT a claim that ESM is wrong long-term. ESM is the ecosystem's direction of travel; the cost of staying CJS is a *future* cost, not a present one, and **the migration path is already mapped** by the Increment-2 inventories. Recorded so a future ESM move is a deliberate, scoped migration rather than a forced scramble:

**What CJS-consistency pays down toward a later ESM move (~60–70% of the structural prep, shared/banked):** the exports reconciliation (3b — raw-`.ts` trio → compiled `dist`, the duplicate consumer mappings aligned); one unified runtime mechanism (3a — the tsx/ts-node split gone); the `scripts/**` typecheck gate; the lint tooling (only the polarity flips); the preset `.cjs` parking form (already identified, OQ-3).

**The ESM-specific marginal cost, bucketed:**
- *Mechanical & bounded:* flip `"type":"module"`; audit first-party `.js` (build scripts, `bin/`) → convert or `.cjs`; add explicit `.js` extensions (flip lint polarity); rename the preset to `.cjs` + retarget its condition.
- *High-variance (the two effort/risk drivers):* **(1)** the loader-host problem — Task 1 showed the ESM-native loader fails from the CJS host; ESM needs `loadConfig` re-hosted into a working ESM context (unproven) or a CJS island (incoherent). Needs its own up-front empirical investigation increment. **(2)** jest → ESM across the whole suite (**376 suites / 8,989 tests** on ts-jest CJS today) — historically the painful part of any CJS→ESM migration.

**Rough size (judgment, not measured):** a dedicated follow-on spec. **Medium** if both risk drivers resolve cleanly; **medium-to-large** realistically (front-loaded with a loader-host investigation increment, as Task 1 was for 118); the two high-variance pieces could roughly double it. The key value is that CJS-first converts the move from an entangled, customer-breaking tangle into a clean, scoped, deliberately-timed migration drawn against inventories already on hand.

**Activation trigger:** a hard external forcing function (a critical dependency or Node drops CJS support; a consumer-distribution requirement that mandates an ESM package) — OR a deliberate strategic decision that ESM-alignment is worth paying for. Tracked on the roadmap ([docs/roadmap/m0a-deferred-items.md](../../../../docs/roadmap/m0a-deferred-items.md)).

---

## What the evidence does NOT settle (honest limit)

The *long-horizon strategic* ecosystem question is not settled by evidence — it is a judgment Peter made: internal coherence now, modern later, deliberately. The evidence is decisive on *coherence*; it cannot decide *strategy*. The escape-hatch and the sizing note above exist precisely so that, if the strategic call ever flips, the ESM move is supported and scoped rather than forced.
