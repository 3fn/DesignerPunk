# Task 8 Completion: Module-Direction Decision Point

**Date**: 2026-06-25
**Spec**: 118 — Module-Resolution Coherence
**Task**: 8 (8.1) — the R5 direction gate
**Type**: Investigation (decision) · **Validation**: Tier 3 — Comprehensive
**Decision owner**: Peter (commitment); Ada (evidence interpretation); main loop / Thurgood (record)
**Branch**: `spec-118-module-resolution-coherence`

---

## The decision

**Committed direction: CJS-consistency. Executes fully in-spec. Escape-hatch NOT elected.**

Recorded in full at [findings/direction-decision.md](../findings/direction-decision.md). Exactly one direction committed, on the Increment-2 evidence, not pre-assumed, not left undecided (R5).

## How the decision was reached (process)

1. **Read the assembled evidence** — the Increment-2 evidence table + four inventories + the refuted divergence hypothesis (Task 7.4 complete; Ada SF-4 honored — Task 8 did not start on partial inventories).
2. **Independent evidence interpretation by Ada** (Rosetta domain) — steelmanned both directions, weighed the decisive evidence, and recommended CJS-consistency executed in-spec; confirmed it is not a close call on the evidence.
3. **Pre-commit check** — verified Specs 122/123 carry **no latent ESM hard-requirement** (both are explicit placeholder stubs gated on *this* decision; 123's distribution scope is direction-agnostic). Cleared the one open prerequisite Ada flagged.
4. **Demystified the "legacy vs modern" concern** for the decision owner — established that the choice governs *internal* resolution only (consumers keep ESM-authoring via the dual loader; the shipped browser bundle stays ESM), and that CJS-first maps a clean future ESM path rather than foreclosing it.
5. **Peter committed** CJS-consistency (2026-06-25).

## Why CJS-consistency (evidence summary)

Three independent axes favor CJS, the pro-ESM axes neutralize:
- **jest-preset blast radius** → CJS incurs zero preset cost; ESM must neutralize a consumer-wide strand.
- **Current surface is CJS top-to-bottom** → consolidate what works vs flip a surface with no working ESM-native execution.
- **Task-1 loader result** → ESM-native `tsImport` failed from the CJS host + left residue; tsx-CJS passed all five criteria.
- **Forward-compat (verified)** → the loader resolves both ESM- and CJS-authored configs, so internal direction is decoupled from consumer authoring — defusing ESM's strongest argument.
- **Exports trio + typecheck** → owed either way; not differentiators.

Charter framing: this spec ends an *incoherence* (make the system whole, not modern). CJS-consistency is the lowest-incoherence end-state and lets 118 close on an *executed* state.

## Escape-hatch disposition (R5 AC5)

**NOT elected.** The escape-hatch only arises under a *native-ESM* commitment with prohibitive cost. CJS-consistency incurs no preset migration and no `"type":"module"` flip, so Increment 3a→3b→3c execute in-spec (scope-gated), and **Group 10 (the ESM close-state gate) does not fire.**

## What this unblocks

- **The second tasks pass** decomposing Group 9 as the **CJS branch** (3a: standardize tsx + retire ts-node + tight pin + pin-bump gate; 3b: reconcile the raw-`.ts` trio incl. `types` to compiled `dist`; 3c: finalize CJS authoring, no `"type":"module"`) + the static-lint polarity set to **ban explicit extensions**. Group 10 omitted.
- **Specs 122 / 123** formalization (no longer direction-blocked).
- **Task 11** governance codification of the committed direction.

## ESM-modernization path (recorded, not executed)

The future full-ESM cost is sized and roadmapped (see direction-decision.md § "The ESM-modernization path" + `docs/roadmap/m0a-deferred-items.md`): ~60–70% of the structural prep is shared with CJS-consistency and banked; the marginal ESM cost splits into a bounded-mechanical bucket and two high-variance drivers (the loader-host problem; jest→ESM across 376 suites / 8,989 tests). Rough size: a dedicated follow-on spec, medium to medium-large, front-loaded with a loader-host investigation. Activation: a hard external forcing function or a deliberate strategic call.

## Success criteria — met

- ✅ Exactly one direction committed and recorded with rationale (feeds Task 11).
- ✅ The decision rests on the Task-7 evidence; no answer assumed.
- ✅ Unblocks the Groups 9/10 second tasks pass (CJS branch) and Specs 122/123.

## Artifacts

`findings/direction-decision.md` (the committed direction + rationale + escape-hatch disposition + ESM sizing + 122/123 clearance). Roadmap entry in `docs/roadmap/m0a-deferred-items.md`.
