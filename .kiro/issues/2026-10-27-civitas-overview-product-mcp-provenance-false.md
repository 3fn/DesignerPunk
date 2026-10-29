# Civitas System Overview says the Product MCP was "built in Spec 081: 14 tools"; Spec 081 built 7

**Date**: 2026-10-27
**Filed by**: Thurgood, under README rule 10, in the O-23 fixing PR (branch `fix/overview-section-counts`). The finding is from my O-23 sweep-scope read. Peter ruled O-23 scope (b), not (c), on 2026-10-27, received before 02:25:42Z ("Cool. Let's go with my answers plus (b) for O-23", in chat, relayed by the orchestrator). That leaves this line out of that PR. His standing condition, that deferred work needs a plan, is met by this record. Stacy's O23-C1 read proposed its owner, class and trigger. Rule 9 applies to every later edit.
**Owner**: Thurgood (the Civitas shared docs, and owner of the operative set `canonical/operative-sets/civitas-system-overview.yaml`, `owner: thurgood`)
**Class**: P2 obligation (record) · defect *(set 2026-10-27, Thurgood, rule 12. The always-loaded internal text is false as history. The consumer overlay's Product MCP line ("serves this product's screens, product tokens and context") carries no count, so no consumer reader receives the false clause. That is Stacy's read, and why it is not P0. It is not `(guard)`, because no guard or instrument is weaker than its claim.)*
**Trigger**: `release:next:phase-1` — the next release's S owes the close. In prose: the fixing CORRECTION PR opens with its own grant, and this trigger is re-ruled to `merge:#<N>` of that PR.

---

## Finding

`.kiro/steering/Civitas-System-Overview.md` L39 is in unit `#what-civitas-contains`, and item `what-civitas-con-8` quotes it verbatim. It says the Product MCP was "built in Spec 081: 14 tools". The line joins two claims:

- **As history, it is false.** At `95aaf34fa`, the last commit touching `.kiro/specs/081-product-mcp-design/completion/`, `product-mcp-server/src/index.ts` registers **7** tools: `get_domain_object`, `get_product_health`, `get_product_overview`, `get_screen_spec`, `list_experience_map`, `list_product_templates`, `rebuild_product_index`. Spec 097 raised the count to **12** (`e3266cb6e`, its last completion commit; `docs/specs/097-product-mcp-intelligence-layer/task-2-summary.md`: "12 tools total (7 existing + 5 new)").
- **As a present count, it is true but volatile.** It is **14** at `08b9c7a8e`. The two extra tools are `get_brand_context` and `get_product_tokens`. Changing the count is not a change of law, so ballot `2026-10-17-no-volatile-metadata-in-signed-units` § 2 reaches it.
- `.kiro/steering/DesignerPunk-Systems-Overview.md` L180 has the same present count (`Product MCP<br/>14 tools, reads product/`), inside unit `#civitas-system-governance-infrastructure`.

## The fix

- **Edits**: CORRECTION of L39 and L180. The provenance stays true history: built in Spec 081, extended in Spec 097. The count becomes a pointer, in the same form the O-23 fix gives the docs-MCP and application-MCP figures (`get_product_health`, or the tool list the MCP client reports, decided when the PR is worded). Each file's PR line is `**Edit kind**: <path> L<n> — CORRECTION (this record; truth: product-mcp-server/src at the measuring SHA)`.
- **Grant needed first**: a grant naming `canonical/operative-sets/civitas-system-overview.yaml` for the `what-civitas-con-8` item re-author, the overlay pin in `canonical/profiles/consumer/always-set/civitas-system-overview.overlay.md`, and the regenerated `canonical/_consumer-output/**/designerpunk-systems-overview.md` and `canonical/generated.lock`. Enumerate them by a dry run, as `2026-10-26-overview-counts-pointer-grant.md` did.
- **Then Stacy's C1 acts**: re-confirm both units, and re-sign the `#what-civitas-contains` disposition.
- **Batching**: if another change already re-signs these units, ride it. Its grant names this record.

## Dated lines

- *2026-10-27 (Thurgood)*: a slip to correct at the next re-confirm. Stacy's re-confirm of `designerpunk-systems-overview #civitas-system-governance-infrastructure` (`f4466db5f`, PR #530) has a bullet header that calls Systems Overview **L180** "known false as history only". The false history is **Civitas L39** (`what-civitas-con-8`, "built in Spec 081: 14 tools"). L180 is a present count, true at `08b9c7a8e` but volatile, and her bullet's body says exactly that. Only the header is wrong.
  - Her confirmation is her signed ledger line, so it is not edited in #530.
  - **This record owes a further re-confirm of that unit** (§ "The fix"). That re-confirm corrects the header in her own entry. Until then, this line is the reminder.

