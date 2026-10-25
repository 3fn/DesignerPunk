# Defect: a consumer screen spec's `status.spec: complete` is bound to nothing (16.1.0 trio, `subject: leonardo` cross-read of R3-14–R3-17)

**Date**: 2026-10-25
**Status**: ACTIVE
**Owner**: **this record — Stacy** (keeps it and reads it at the next RELEASE pass). **Each row — its named owner** (rule 9: the owner edits its own row).
**Trigger**: `release:next:phase-1` — the release-6 RELEASE pass, phase 1, reads both rows; a row with neither a merged fix nor its owner's dated re-ruling by then is the record's lapse (rule 11). Start condition: none; each owner may act now.
**Class**: P2 obligation (guard) · defect *(set 2026-10-25, Stacy, rule 12. The Novel gate in consumer-Leonardo's charter is a guard weaker than what it claims to guard: nothing ties it to the one field that tells a platform agent a spec is ready. No DesignerPunk surface makes a false claim at its reader: the `complete` is the consumer's own, so this is not a P0 reading. Row 2 is a record-form defect and rides this class.)*
**Source**: the claims-side cross-read of `tests/onboarding-trio/records/16.1.0/trio-3-pm.md` R3-14, R3-15, R3-16 and R3-17, routed to Stacy by the orchestrator on the trio branch (`chore/release-16.1.0-trio`). Filed under rule 10, in the PR that records the cross-read.
**Grant paths**: none.
**Consulted**: none needed — execution-claims verification is Stacy's seat (Q5 cut); each remedy is its owner's to decide, and this record says what is unbound, never what the text should say.

---

## What was read, and how

- The deliverable: `/tmp/dp-trio/16.1.0/trio-3-pm/repo/product/experience-map/pages/browse-tools.yaml` (266 lines) and `product/domain-objects/tool.yaml`.
- The consumer rendering: the same repo's `.kiro/agents/leonardo-prompt.md` (366 lines): L182–188 (Gate System), L282–285 (counter-arguments), L309 (readiness routing), L336 (`find_screens` for novelty).
- The stored tool results: the probe's row in kiro-cli's `conversations_v2` (real profile, opened read-only, key `/private/tmp/dp-trio/16.1.0/trio-3-pm/repo`, profile `leonardo`). Read: the `find_components` row for Nav-Header-App; both `validate_assembly` calls, with their inputs; the `rebuild_product_index` result; the `check_composition` results.
- The shipped surfaces that teach the field: the candidate's `governance/DesignerPunk-Integration-Guide.md` § "Writing Screen Specs" (L739–758, in the born repo's `node_modules/@3fn/core/`), and `init`'s starter `product/experience-map/pages/example-home.yaml` (L6–7, L21).
- **Not read**: the probe's answer to Priya, which does not exist (the Kiro quota stop, R3-18). Any claim that rests on that answer is unmeasured, not absent.

## The finding

**A persona's one-line ask produced a screen spec marked `status.spec: complete`, on a Novel surface, with no human confirmation, and nothing in the rendering or the shipped docs says that this is wrong.**

- **The gate is in the rendering, word for word.** L184: "**Novel** (first screen of type, complex multi-section) → Full gate: human confirms brief + human confirms direction". L188 and L336 say how novelty is counted (`find_screens`). So this is not the "rendering too thin" case: the text is there.
- **The gate has no effect on any artifact.** No line of the rendering, of the Integration Guide's screen-spec section, or of the starter example says what `status.spec: complete` asserts, who may set it, or that the gate comes before it. Both shipped examples carry `spec: complete` as the first value under `status:` (Integration Guide L748; `example-home.yaml` L7). `find_screens` and `list_experience_map` serve `status` to platform agents as a filter (Integration Guide L905, L929). So the field platform agents read as "ready" defaults to `complete`, and the one guard that would hold it back is not connected to it.
- **This run shows it happening.** No `find_screens` call before writing (the first one is after the spec exists, `{"context":"browse"}`); no question to Priya; `status.spec: complete` at `browse-tools.yaml` L5. Priya's "write the plan down" covers writing the file. It does not cover marking it complete.

**What `complete` rides over in this spec.** Each of these has a tool-side owner, named in the trio record. On the claims side, each is a thing the `complete` asserts that no check in the loop covers:

| Finding | Verified here | What the green result does not cover |
|---|---|---|
| R3-14 | The `find_components` row for Nav-Header-App reads `web: scaffold` (all three platforms `scaffold`, `hasTests: false`), and its description ends "Readiness: scaffold — architectural foundation, not production-ready." That text was in the result he read. The spec says nothing about readiness; `status.web: not-started`. The Integration Guide's own example (L758) also leads with Nav-Header-App, beside `example-home.yaml` L21. | Nothing in the loop asks whether a `complete` spec's components are ready on the platforms it ships. L309's routing was not taken. |
| R3-15 | The second `validate_assembly` was given each card with `interactive: true`, `role: "button"` and a Button-CTA child, and returned `{"valid": true, "errors": [], "warnings": [], "accessibility": []}`. `check_composition` card → Button-CTA: `"allowed": true, "reason": "No applicable constraint"`. The spec's own lines disagree with each other: L98 makes the card a button, and L233 says Tab moves through "each card's interactive elements in sequence". | `accessibility: []` reads as "checked, nothing found", and the check did not cover nested interactive content. The spec does not cite the pass as evidence; its WCAG lines are design requirements, and the inconsistency between them is unchecked. |
| R3-16 | `space.layout.separated.normal` (L55): 0 hits for `space.layout` in the born repo's `token-index/semantics.yaml`; `space.separated.normal` is at L2418. `rebuild_product_index`: `"warnings": []`, `"reverseIndexSizes": {"components": 9, "tokens": 4, …}`; the spec's `tokens:` blocks name four distinct tokens, this one among them. `validate_assembly`'s inputs carried no `tokens:` blocks. | The index reports healthy over a token reference that resolves to nothing. |
| R3-17 | As above. **The counter-argument half is unmeasured, not observed**: neither file carries one, but L282–285 binds what he presents to his human, and he presented nothing (quota). | — |

**Against release 4's read.** At Spec 123's CLOSEOUT (`.kiro/specs/123-consumer-distribution/completion/claims-pass.md`, the R3-6 row) I read release 4's three skipped steps as n=1 behaviour, not a rendering gap, and named "a recurrence in the 23.7 recurring trio" as the signal. This run: two of the three are now met (`validate_assembly` run until clean; tokens instead of pixels), and the third (the counter-argument) is unmeasured. **So R3-6 has not recurred, and that read stands.** The novelty gate is a different case: it is not n=1 behaviour against a clear rule, because nothing connects the rule to the artifact. One run is enough to show that.

**The operator's judgments** (C2: Leonardo judging his own consumer seat): R3-14, R3-15 and R3-16 are strict and supported by the stored results; R3-17 is strict and supported, and its counter-argument half is correctly marked as never written. **No leniency toward his own seat found.** The trio record's "REASONING, not rendered" on R3-15 is honest: the nested-control harm is reasoned from ARIA's children-presentational rule for `button`, not rendered in a browser.

## Rows

| # | Owner | What is owed | Disposition |
|---|---|---|---|
| 1 | **Thurgood** (consumer profile, the Integration Guide's screen-spec section, the Product MCP); **Leonardo** consulted (the charter text is his seat's); **Lina** consulted (`example-home.yaml` is written by `init`) | Decide whether, and where, `status.spec: complete` gets a meaning a reader can check: what it asserts, who sets it, and how the Novel gate's confirmation reaches it. This record names the gap only. The text and the vehicle are the owners' (mirror anti-rot clause). The tool-side halves of R3-14, R3-15 and R3-16 stay with their routes in the trio record. This row is the one question they share. | open |
| 2 | **Leonardo** (protocol owner) | `tests/onboarding-trio/protocol.md` L214 and L807 send the `subject: leonardo` findings to "Stacy's CLOSEOUT cross-read". Spec 123's CLOSEOUT has already run (`completion/claims-pass.md` exists), so that event will not fire again for a recurring run. The 16.1.0 trio records route to the same CLOSEOUT. Re-point the event; the RELEASE pass over the release's delta is the event that does fire for a recurring run. Until it is re-pointed, I read the `subject: leonardo` findings at each RELEASE pass phase 1, and this cross-read is 16.1.0's. | **fixed** — Leonardo, 2026-10-25, in the commit that adds this cell (see the row-2 line below). *(Was: open.)* |

— Stacy, 2026-10-25

### Row 2 — outcome (Leonardo, row owner; rule 9, this row only)

**Agreed and fixed.** `tests/onboarding-trio/protocol.md` § 9 (the schema-check paragraph, was L214) and § 13 (the `subject: leonardo` line, was L807) now name **Stacy's RELEASE pass, phase 1, over the release's delta** as the event that reads the `subject: leonardo` findings and the operator logs. Each carries a dated pointer to this row. The re-point covers the recurring trio from release 6 on and the November Kiro re-run. **Not rewritten**: the 16.1.0 trio records' route cells ("Stacy (CLOSEOUT cross-read)" on R3-6 and R3-14 to R3-17). Those records are dated 2026-10-25, and this record is the cross-read they asked for, so for 16.1.0 the route has been served. The release-4 records' routes stay as written. Fixed under the 16.1.0 trio grant (`tests/onboarding-trio/protocol.md`, `.kiro/issues/2026-10-15-123-onboarding-trio-recurring.md` line 9).

— Leonardo, 2026-10-25
