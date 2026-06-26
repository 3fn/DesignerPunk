# Inbound from Spec 118 — context Spec 124 inherits

**Purpose**: Single pointer from 124 into the relevant Spec 118 findings. **These are REFERENCES, not copies** — the source docs live in 118 and stay authoritative there (duplicating would drift). 124's own foundational doc is `design-outline.md` in this dir.

## Why 124 exists (the origin, in one line)
Spec 118 Task 9.5.3 (retiring the bin's global tsx register) is BLOCKED by a dual-instance `ComponentTokenRegistry` split that silently breaks consumer-authored component tokens. The fix — convert the component-token seam to a return-value seam — is a `defineComponentTokens` contract change (component-token architecture, not module-resolution), so it was scoped as its own spec (124). **124 is a hard prerequisite for 118's 9.5.3.**

## The 118 docs to read (in order), and why
1. **`.kiro/specs/118-module-resolution-coherence/findings/9.5.3-component-registry-dual-instance-blocker.md`** — Ada's diagnosis of the dual-instance split (the problem 124 solves) + the rejected Options 2/3.
2. **`.kiro/specs/118-module-resolution-coherence/findings/component-token-return-contract-spec-seed.md`** — the detailed seed: the decisive constraint (`defineComponentTokens`'s return is LOSSY → a backward-compat contract change is required), the file:line scope, the consumers that must keep working, the latent registry issues. (124's `design-outline.md` is the polished version of this; the seed has the raw citations for formalization.)
3. **`.kiro/specs/118-module-resolution-coherence/findings/runtime-ts-resolution-target-model.md`** — the ratified target-model principle 124 finishes: *"seams consume return values, no shared mutable singleton across the tsx boundary."* Component tokens are the last side-effect seam.
4. **`.kiro/specs/118-module-resolution-coherence/findings/session-handoff-2026-06-25.md`** — where 118 paused + the resume plan (124 → 118 9.5.3 → 9.3 → 9.4 → Task 11).

## Decisions 124 inherits (already settled in 118 — do NOT re-litigate)
- **The fix is Option 1** (return-value seam). Option 2 (parent-cache prime) rejected as silently fragile vs the **C′** consumer-authored-components case; Option 3 (process-global handle) rejected (no-global-residue value).
- **The decisive constraint:** `defineComponentTokens`'s return is lossy; the contract change must be **backward-compatible** (authors destructure the flat value-map today).
- **C′ (118-ratified):** the generated catalog reflects the consumer's design system, incl. consumer-authored components — which is *why* Option 2's silent failure is disqualifying.

## What 124 must hand back to 118
When 124 lands, 118 re-applies the (already-solved) registerless bin + the `files` build-tracking-glob broadening, then re-runs the consumer guard (now N>0 component tokens via the return-value seam) to close Risk #2.
