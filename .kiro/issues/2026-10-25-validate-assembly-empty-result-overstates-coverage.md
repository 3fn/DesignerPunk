# `validate_assembly` returns `accessibility: []` for checks it never ran: nested interactive controls, and props it cannot read (icon names)

**Date**: 2026-10-25
**Filed by**: Lina, under rule 10, from the 16.1.0 trio's R3-15 (`tests/onboarding-trio/records/16.1.0/trio-3-pm.md` L345, `subject: leonardo`), routed to me by the orchestrator, with Stacy's cross-read point (`.kiro/issues/2026-10-25-consumer-screen-spec-complete-unbound.md`, R3-15 row) folded in: an empty array reads as "checked, nothing found".
**Owner**: Lina (the Application MCP's validators, and the component schemas and contracts they read). **Cross-read**: Stacy (claims side, her record above). Leonardo's own spec lines (the card's label leaves out the "Available" badge; the screen uses an icon his gaps list says does not exist) are his, not this record's.
**Class**: P2 obligation (guard) · defect *(set 2026-10-25, Lina, rule 12. The instrument is weaker than its output says. The tool description scopes the accessibility check honestly ("form labels, submit actions, page headings", `application-mcp-server/src/index.ts` L173), but the result does not: `{"valid": true, "accessibility": []}` carries no scope, and the consumer architect read it as clean. No served text is false, so not P0; Stacy may read it otherwise (rule 12). Consequence, stated plainly: a P2 `(guard)` record goes to Peter at its first lapse (rule 11), so V1 should land before the next release's S.)* *(2026-10-25, Lina: "the next release" here is the release after 16.1.0, by Peter's carry ruling on the Trigger line. Class unchanged.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the PR that makes the result state its own coverage (V1) and adds the nested-interactive check (V2), owed by **the release after 16.1.0**: 16.1.0 carries this record, and its CHANGELOG states the limit as a known limitation. The owner re-rules this line to `merge:#<N>` when that PR opens, with a dated reason (rule 11). *(Re-ruled 2026-10-25, Lina, owner, rules 9 and 11, on Thurgood's steward guidance. Authority: Peter, chat, 2026-10-25, received by the orchestrator before 23:34:48Z and relayed in its brief: "Re: 3, Carry" (G-2: this record carries to the next release). Unverified here: chat, relayed; his words are now committed in this record. Reason: the record was filed after the 16.1.0 walk, and V1 is a response-shape change to `validate_assembly` that deserves its own release rather than a late fix before 16.1.0's S. The token is unchanged; the prose names the release, and this line is the re-ruling that 16.1.0's S reads. Was: "`release:next:phase-1` — the event that owes the close is the PR that makes the result state its own coverage (V1) and adds the nested-interactive check (V2). The owner re-rules this line to `merge:#<N>` when that PR opens, with a dated reason (rule 11).")*

---

## What was seen (16.1.0 trio, run 3, the stored tool results; Stacy read them too)

- `check_composition {"parent":"Container-Card-Base","child":"Button-CTA"}` → `allowed: true`, "No applicable constraint".
- The second `validate_assembly` on the home tree: each card `interactive: true`, `role: "button"`, its own `onPress`, holding a `Button-CTA` with another `onPress` → `{"valid": true, "errors": [], "warnings": [], "accessibility": []}`. It also accepted `name: tool-drill` on Icon-Base.
- **REASONING, not rendered**: a `button` role makes its children presentational, so the inner "Request to borrow" is unreachable to a screen reader or is a nested control (WCAG 4.1.2).

## Verified (Lina, 2026-10-25, worktree at `c543bc29f`)

- `application-mcp-server/src/validation/AccessibilityChecker.ts` has exactly three rules (`form-needs-accessible-name`, `form-needs-submit-action`, `page-needs-accessible-name`). None looks at interactive content inside interactive content.
- `application-mcp-server/src/indexer/CompositionChecker.ts`: conditional rules (`when: {prop, equals}` → `then.children`) exist and `validate_assembly` passes each node's props to them (`AssemblyValidator.ts` L61), but Container-Card-Base's schema declares no rule, so the answer is "No applicable constraint" (L57). Rules read direct children only, and `check_composition` applies them only when `parentProps` is given.
- `application-mcp-server/src/validation/PropValueChecker.ts` skips any type it cannot read as literals; its header lists `IconName` among them. Icon-Base's `name` is `type: IconBaseName` with no `values:` list (`Icon-Base.schema.yaml` L48–50), so any string passes, and the result does not say so.

## Items

- **V1 — the result states its own coverage** (the class fix; Stacy's point). Each result carries the accessibility rules that ran and the props it skipped as not checkable (component, prop, type), so an empty `accessibility` array is read against what was checked. The tool description says the same in one sentence. It applies to every future check as well as these two.
- **V2 — nested interactive controls.** One assembly rule: a node whose active contracts include `interaction_pressable` (Container-Card-Base's `interaction_pressable`, `contracts.yaml` L99, applies only when `interactive: true`; its text says so, no field does, and the fix PR decides how the condition is read) with a descendant at any depth that also has `interaction_pressable` or `interaction_focusable` raises an accessibility error. It reads contracts, not names, so it covers every component and no list goes stale; the schema-rule alternative (a `prohibited` list on the card) reads direct children only and has to be kept by hand. `check_composition`'s "No applicable constraint" reason also says when conditional rules exist and no `parentProps` were given.
- **V3 — icon names.** Icon-Base's `name` becomes checkable: a `values:` list generated from the `IconBaseName` union in Icon-Base's `types.ts`, not hand-kept, so an unknown name is an error. Until then, V1 lists it as skipped.

## Not in this record

- `form-needs-submit-action` asks for a Button-CTA, which on web does not submit a form. That is E8 of `.kiro/issues/2026-10-20-web-element-api-and-form-participation.md`. *(2026-10-25, Lina: its message now names the web wiring, `press` → `form.requestSubmit()`; E8 (a), branch `fix/button-cta-served-submit-text`. The rule still asks for a Button-CTA by name; that is E8 (b), in the spec.)*

*Signed: Lina, 2026-10-25.*
