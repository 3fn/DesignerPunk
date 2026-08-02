# Inbound from Spec 118 (Module-Resolution Coherence) — for Spec 122 (Agent Generator)

**Date**: 2026-06-27
**Status**: **Spec 118 is COMPLETE & committed. The gate on 122 is CLEARED.** 122's stub said "Do not formalize until Spec 118 reaches its direction decision point" — that point is passed (Task 8 decided; Increment 3 executed; Task 11 codified). **122 can now formalize** (requirements → feedback → design → tasks).

---

## The direction 122 was waiting on (its emitted configs' runtime/path assumptions)

122's stub: *"the generator emits agent configs + skills with tool-specific path-context and runtime assumptions, and those assumptions are exactly what 118 is deciding."* 118 decided. Bake these into the generated outputs:

- **Direction: CJS-consistency, executed in-spec** (escape-hatch NOT elected; no `"type":"module"` flip). The package is CJS top-to-bottom.
- **`tsx` is the SOLE runtime-TS mechanism** on the non-bundled surface. **ts-node is retired** — do NOT emit ts-node in any generated config or script. The one exception: the MCP dev sub-packages keep their own ts-node *by design* (the R12 documented exception; bundled at ship time).
- **Package own code (Class A) is compiled-shipped `dist/`, run as compiled JS.** The bin invokes `require('../dist/cli/designerpunk.js')` under plain `node` — no process-global tsx register. Generated runtime assumptions should be "compiled dist + plain node," not "raw-TS via a global loader."
- **Consumer `.ts` (Class B) loads via per-site SCOPED-tsx seams** (register → load → unregister), not a global register. If the generator emits anything that loads consumer `.ts`, follow that pattern.
- **Extensionless CJS authoring** (no explicit `.js`/`.ts` on relative imports) — and there's now an ESLint rule + a class-invariant guard enforcing the module-resolution invariants (Spec 118 Task 9.4). Generated source should conform.
- **MCP servers + browser bundle are an exempt, bundled surface** (esbuild; `dist/mcp/*.js`, `dist/browser/*`). The contract governs non-bundled runtime TS only.

The full law is now codified in steering — **`Rosetta-System-Architecture.md` § "Module-Resolution Contract (Spec 118)"** (+ the MCP/Browser Exemption Boundary). Generated prompts that reference the contract should point there. (Note: Spec 119 will relocate RSA to `governance/` — use the relocated path once that lands.)

## The 118 → 119 → 122 consumption chain (the load-bearing coupling for 122)

118's Task 11 codified the contract but deliberately did NOT wire its *consumption*. Spec 119 hand-wires a **module-resolution-contract routing row** into the relevant agents' prompt routing tables (primarily **Ada**; also Thurgood for the process-guard, Lina for the brand contract) — see `.kiro/specs/119-agent-experience-architecture/inbound-from-118.md` (Hand-off 1) and 119's Phase 7.

**122's relevance:** 122 regenerates agent prompts from a single canonical source. So those routing rows (and all of 119's per-agent routing tables) must live in **122's canonical agent source**, so regeneration *preserves* them rather than clobbering 119's hand-edits. When 122 formalizes:
- Treat 119's hand-wired routing tables as **input to the canonical source**, not as outputs to be overwritten.
- If 122 lands *before* 119's Phase 7, fold the module-resolution-contract routing entry directly into the canonical source (then 119's hand-wiring is unnecessary).
- The regenerate-and-diff guard (122 Resolved Decision 5) then protects the routing rows from drift — the right end-state for the consumption mechanism 118 flagged.

## Cross-references
- `.kiro/specs/118-module-resolution-coherence/findings/runtime-ts-resolution-target-model.md` (the ratified contract, by class)
- `.kiro/specs/118-module-resolution-coherence/completion/task-11-completion.md` (what was codified into steering)
- `.kiro/specs/119-agent-experience-architecture/inbound-from-118.md` (the routing hand-off 122 ultimately owns via the canonical source)
- `.kiro/steering/Rosetta-System-Architecture.md` § "Module-Resolution Contract (Spec 118)" (the served law)
