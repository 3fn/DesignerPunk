# Integration Guide, Designer-Friendly and Agent-Walkable Rewrite — CHARTER

**Date**: 2026-10-03
**Type**: **CHARTER**: a directed follow-up with a named event trigger. It is not a spec.
**Authority**: Peter's direction, 2026-10-03: the guide should be "updated… designer friendly and something an agent can help the user walk through". The scope below comes from the Leonardo/Ada/Thurgood two-round consult, recorded on `task/123-u3-onboarding` in `tasks.md` Task 19's dated annotations (commits `ed99a57d`, `d34ca071`).
**Status**: **CHARTERED, not scheduled.** No guide edit is authorized under this charter before the trigger. The Spec 123 Task 19.4 accuracy pass is separate and is not governed here.
**Owner**: **Leonardo** (lead). **Ada**: token facts. **Lina**: review of the CLI, `sync`, testing and MCP-config sections (Start MCP Servers, Generate flags, CLI Commands, Upgrading, Verify counts, Running Component Tests). **Thurgood**: governance, doc-id and routing.
**Trigger**: **the release-3 tag is cut** → Leonardo opens the rewrite. **Gate**: the theme walkthrough and anything native wait for Spec 129 (`129-consumer-generation-completeness`) item (i) to merge (item (i)'s content is *unverified* by me; taken as given in the consult).
**Grant paths**: none. This charter grants no write scope.

---

## 1. What is chartered

`governance/DesignerPunk-Integration-Guide.md` (doc-id `designerpunk-integration-guide`) is rewritten in two layers:

- **Goal-shaped walkthroughs on top**, in designer voice: outcomes, not mechanisms ("make your brand colour the primary action", not "SemanticOverrideMap").
- **Lookup reference underneath**, for agents.

**The walkthrough unit**, one fixed shape: *Goal → You'll need → Ask your agent (a literal prompt) → What the agent does (tools, files) → How you know it worked (an observable check) → If not.* Each unit gets a unique, stable heading, so an agent can address it by section.

**First walkthroughs (these work today):**
- See DesignerPunk working.
- Specify your first screen (Product MCP).
- Join a teammate's design system.
- Change a token and see it on web. Exceptions (verified by Leonardo in `src/tokens/themes/`): the package WCAG override pins `color.action.primary` to `teal300` inside `data-theme="wcag"`, and the dark override pins `color.action.navigation` to `cyan100`. The walkthrough's check covers light, dark and WCAG, and states both exceptions.

**Gated on Spec 129:** making it look like your brand (custom themes), and native platforms.

**Stays reference:** `designerpunk.config.ts` fields, CLI verbs and flags, the MCP tool tables, the UI-tree convention, the imports table, and the `generate` outputs.

## 2. Parked: decide inside the rewrite, not before

- Splitting the reference into its own doc-id. PR-1's "one document" stands until Peter re-rules.
- Re-scoping the Governance Gradient to posture B, beyond Ada's 19.4 rename.

## 3. Residual (stated plainly)

Release 3 ships a guide that is correct but written in a developer's voice. At a bursty pace, "later" can slip indefinitely. That is why this charter opens on an event trigger rather than a date.

## 4. What the walk checks

- Has the release-3 tag been cut with no rewrite opened on record? → finding.
- Has Spec 129 item (i) merged while the theme walkthrough is still unscheduled? → surface to Peter.

## 5. Closing

When the rewritten guide merges, record the outcome here (dated) and `git mv` this file to `archive/`.
