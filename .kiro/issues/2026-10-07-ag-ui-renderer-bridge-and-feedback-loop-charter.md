# AG-UI Renderer Bridge and Contract-Grounded Feedback Loop — CHARTER

**Date**: 2026-10-07
**Type**: **CHARTER** — a directed future spec with a named formalization trigger, opened at Peter's direction ("Let's add it", 2026-10-07) after an exploratory assessment of AG-UI's fit; not a ballot, not a plan
**Authority**: Peter's direction, 2026-10-07. The strategic frame is `.kiro/docs/agentic-ui-strategy.md` § "AG-UI as the Transport Layer" (same date). No ballot — no governance law changes.
**Status**: **CHARTERED — not scheduled.** No build work is authorized. Outline drafting is permitted once the trigger fires; nothing lands before then.
**Owner**: **Thurgood** (formalization). **Lina — designer** of the renderer bridge (Web Components mount, `validate_assembly` gate, tool-definition generator over the component metadata schema). **Leonardo — designer** of the screen/state side (shared-state shape against the Product MCP's screen state models; which experience patterns an agent may compose). **Ada — consulted** on any token surface that enters a tool schema (expected minimal; hints reference token names only, per 067 D9).
**Trigger**: **Spec 128's React binding merges, OR a consumer product requests an agent-driven surface — whichever fires first** → Thurgood runs the owner consults (Lina, Leonardo, Ada) and opens the outline round. Secondary trigger: a protocol event that changes the premise (AG-UI specifies generative-UI rendering at the protocol level, or A2UI and AG-UI converge) → re-read before the outline round.
**Grant paths**: none — this charter grants no write scope; formalization proceeds through the normal spec pipeline.
**Consulted at opening**: none — a charter is a tracking record with an owner and a trigger, not a plan, grant, or law change. The owner consults are the trigger's first act, before any outline. A briefed owner who finds its surface here may answer with questions first.

---

## 1. What is chartered

Give the agentic-UI strategy's two open needs a concrete protocol shape, using AG-UI as the signal (not the bet):

1. **Renderer bridge (need 5)** — one AG-UI frontend tool definition per Stemma component, **generated** from the component metadata schema (Spec 064; property definitions already JSON-Schema-expressible per the A2UI mapping exercise). A web bridge receives tool calls, runs the proposed tree through `validate_assembly`, and mounts Stemma Web Components. Web first. React and React Native follow only if Spec 128 admits them; the bridge is not gated on 128.
2. **Feedback loop (need 7)** — Stemma behavioral contracts as the vocabulary of events back to the agent (tool results and `Custom` events). Spec 067 marked this out of scope for lack of a protocol shape.
3. **Class-level rule** — protocol adapters (A2UI, AG-UI, successors) are transformers over the canonical metadata schema, never hand-built per protocol. This is the DTCG → Figma pattern, third application.

Plausible, unproven, to be tested in the outline round rather than assumed: Product MCP screen state models as the AG-UI shared-state shape; the Claude Agent SDK as the listed backend closing the loop with no new runtime.

## 2. What is NOT chartered

- Any product that runs an agent. Without one, the end-to-end proof is a demo; the charter exists precisely because a demo alone does not justify scheduling.
- A2UI renderer work (067 D7, Tier 3, still deferred on its own terms).
- Any change to the Application MCP's tool surface or the metadata schema beyond keeping property definitions JSON-Schema-expressible — a no-regret constraint, already true, to be stated in 064's schema docs only if it is ever at risk.

## 3. Surviving counter-arguments (carried into the outline round)

- **No consumer.** Chartered-not-scheduled is the answer, and the trigger's second arm is the only thing that makes it real.
- **Convention risk.** AG-UI's docs disagree on event count; tool-call-as-UI is a CopilotKit convention, not protocol. The transformer pattern absorbs the schema half; the bridge *runtime* (mount, validate, emit) is ours to maintain regardless of which convention wins.
- **Queue position.** Spec 123 U3 is underway and Spec 128 is chartered and gated. This sits behind both.

## 4. What the walk checks

- Has either trigger arm fired? If 128's React binding has merged, or a product request is on record, with no owner-consult record and no outline round → finding.
- Has the premise changed (secondary trigger) with no re-read noted here? → surface to Peter at the walk, not a finding.
- Is the strategy doc's § "AG-UI as the Transport Layer" still consistent with this charter? Drift → Thurgood flags, orchestrator or owner resolves.

## 5. Sources read at opening (2026-10-07)

- https://docs.ag-ui.com/introduction, /concepts/events, /concepts/tools, /concepts/architecture
- `.kiro/docs/agentic-ui-strategy.md` (2026-02-24; updated 2026-10-07)
- `.kiro/specs/064-component-metadata-schema/findings/a2ui-mapping-exercise.md` (zero schema omissions vs A2UI v0.9)
- `.kiro/specs/067-application-mcp/design-outline.md` § D7, § Tier 3, open-items table rows 5 and 7

## 6. Closing

When Spec NNN's outline round opens (or Peter declines the spec), record the outcome here (dated) and `git mv` to `archive/`.
