# `form-needs-submit-action` (and `form-needs-accessible-name`) fire on `semantic: "form"`, a value Container-Base's schema refuses

**Date**: 2026-10-26
**Filed by**: Lina, under rule 10, from Stacy's release 16.1.0 RELEASE claims pass, phase 2, observation O-48 (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` § "Phase 2"), routed to Lina by the orchestrator.
**Owner**: Lina. The check's code (`application-mcp-server/src/validation/AccessibilityChecker.ts`, its test) and the component schema it reads are both in Lina's write scope; no other seat's surface is touched by the fix.
**Class**: P2 obligation (record) · defect *(set 2026-10-26, Lina, rule 12. The checker's value set and its tests contradict the schema they validate. No reader is misled and nothing served is false: the message echoes the input, as Stacy said. Not P3, because a claims pass routed it as an obligation and the fix is a change to a check plus its tests, not a literal. Stacy may read it otherwise (rule 12).)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the PR that aligns the checker's set to the schema (the fix shape below), owed by the release after 16.1.0. The owner re-rules this line to `merge:#<N>` when that PR opens, with a dated reason (rule 11). If the E8 (b) PR (`.kiro/issues/2026-10-20-web-element-api-and-form-participation.md`) lands first and re-reads this rule, it closes this record in the same PR.

---

## What was seen

Stacy's O-48: one `validate_assembly` call on a `Container-Base` with `semantic: "form"`, an input and no Button-CTA returns both the schema error `Prop "semantic": invalid value "form" — allowed: 'div' | … | 'fieldset'` and the `form-needs-submit-action` warning. A consumer who reads the warning alone may try a value the schema refuses.

## Verified (Lina, 2026-10-26, worktree at `bdbe72a32`)

- **The check**: `application-mcp-server/src/validation/AccessibilityChecker.ts` L19 `const FORM_SEMANTICS = ['form', 'fieldset'];`, L31 `if (semantic && FORM_SEMANTICS.includes(semantic))`. Inside that branch it raises `form-needs-accessible-name` (L32–39, severity `error`) and `form-needs-submit-action` (L46–53, severity `warning`). So the same dead value also fires the `error`-severity name rule, which makes `valid` false (`AssemblyValidator.ts` L29), alongside the schema error.
- **The schema**: `src/components/core/Container-Base/Container-Base.schema.yaml` L250–251: `semantic: type: "'div' | 'section' | 'article' | 'aside' | 'nav' | 'header' | 'footer' | 'main' | 'fieldset'"`. `types.ts` L92–101 (`SemanticHTMLElement`) is the same nine values. Container-Card-Base's `semantic` (its schema L186–187) is `'div' | 'section' | 'article'`. No component under `src/components` declares `'form'` as a `semantic` value. `git log -S"| 'form'" -- src/components/core/Container-Base/` returns nothing: the schema has never carried it.
- **The commit**: `git log -S"FORM_SEMANTICS" --all -- application-mcp-server/src/validation/` returns one commit, `89d20533d` (2026-03-21, "Task 1 Complete: Foundation — Registry & Directory Rename", first tag containing it `v10.1.0`). That commit is the file's adding commit under its current path (`git log --diff-filter=A`), a directory rename; the check was authored in Spec 067 task 3.2 (`.kiro/specs/067-application-mcp/completion/task-3.2-completion.md` L16: "`semantic: form/fieldset`"). The `fieldset` value entered the Container-Base schema earlier, in `0830188cc` (2026-01-01). The mismatch is therefore the checker's, from its authoring. It is unchanged at `v16.0.0` (Stacy) and is not new in 16.1.0.
- **The tests encode it**: `application-mcp-server/src/validation/__tests__/AccessibilityChecker.test.ts` uses `semantic: 'form'` as the fixture for the name rule and for all four submit-action tests (L37–82).
- **The design evidence**: Spec 067's Pattern A interview (`.kiro/specs/067-application-mcp/interviews/pattern-a-interview.md` L52–54) established that "Container-Base supports `semantic: 'fieldset'`" and chose `semantic: fieldset` with `accessibilityLabel` as the form container. The interview never establishes `'form'`.
- **Web runtime** (READ, not run): `ContainerBase.web.ts` L309 reads the `semantic` attribute and interpolates it as the tag name with no check against the enum, so `semantic="form"` on web would render a `<form>` element.

## Reasoning, not verified

- A `<form>` rendered in Container-Base's shadow root does not contain the consumer's slotted light-DOM inputs as descendants, so it would not collect them into its `FormData`. Not run in a browser; if true, widening the schema (option B) would promise a form container that does not form-collect.

## Fix shape and the fork

- **A (my lean): align the check to the schema.** `FORM_SEMANTICS = ['fieldset']`; the test fixtures change from `'form'` to `'fieldset'`; both rules keep firing on the one form container the schema offers and the Pattern A interview chose. The nine-value list is read from the one place today (the schema), so the PR also decides whether the checker reads the enum from the served schema instead of a hand list. If it hand-keeps the list, the same drift returns; the served-schema read is the class fix for this check, and the PR must price it (the checker would depend on the index being loaded, as `PropValueChecker` already does).
- **B: widen the schema** (add `'form'` to Container-Base's enum, types, web element, and the two native platforms' handling of the web-only prop). Cost: a three-file schema change plus the shadow-DOM question above, and it decides a form-container design that E8's spec owns.
- **Counter-argument against A, surviving**: `fieldset` is not an element that submits, so the submit-action rule still fires on a container that cannot itself submit, and the message (#488: call `form.requestSubmit()`) reads oddly on a `fieldset`. A removes the dead value; it does not make the rule right for the one value that remains. That is E8 (b)'s re-read of `form-needs-submit-action` (its "still asks for a Button-CTA by name" line), and this record does not pre-empt it. Counter-argument against B, surviving: if Peter wants `<form>` as a first-class container, B is the honest end state and A is a detour. The pick between A and B is Peter's, or the E8 spec's; this record carries A as the smallest change that stops the check disagreeing with the schema, not as the ruling.
- **Class fix** (rule 12's sibling question, "where does the gap live"): hand-kept value lists in the Application MCP's validators drift from the schemas they check. The T3 `PropValueChecker` already reads values from the schema; `AccessibilityChecker` is the validator that does not. The related V1 item in `.kiro/issues/2026-10-25-validate-assembly-empty-result-overstates-coverage.md` (the result states its own coverage) would also list the rules that ran and the values they match.

## Not in this record

No code. The fix, its tests and the choice between A and B are the later PR's; the owner is Lina (`application-mcp-server/**` and `src/components/**` are both in her scope). An `index.ts` tool-description change, if any, is hers as well.

**Consulted**: Stacy — O-48 as routed in phase 2 (`claims-pass-release-16.1.0.md` § "Phase 2")
