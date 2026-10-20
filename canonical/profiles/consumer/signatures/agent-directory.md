# Signatures — `agent-directory` consumer profile (C1: signer **Stacy**)

**Rows**: `canonical/profiles/consumer/agent-directory.dispositions.yaml`. **Signer**: Stacy. This is an identity doc with no domain owner, so she signs in the C1 carve-out seat: the profile author drafted it, and the counterpart seat signs.
**Rule**: Req 11.6.5e. An item is credited only if the unit's **own** rendering (`canonical/_consumer-output/_canonical/…`) states or entails it. A function that survives only elsewhere earns no credit here. `surviving: []` is itemized.
**Phase two, run 2**, 2026-09-29, Spec 123 Task 15.5.

## `#primary-agent-orchestrator`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#primary-agent-orchestrator` (re-pointed; ROUTED)
canonicalHash: sha256:642bbb51f16d0e994f9678e54a7ad63dd3e5ae1f3ae73c03623bf024bc3c43cf
renderedHash: sha256:0cead21464b762aa9065f5181dee92430b1531773bcf02ac9d12d4088ec0648e
verdict: assent — surviving 9/9

All nine survive. The trigger surfaces are re-grounded to "your team's governance and shared docs, agent charters …", and re-pointing "Peter" → "your human lead" carries the same obligation.

## `#thurgood-test-governance-spec-standards-civitas-steward`

signer: stacy
date: 2026-10-20
row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#thurgood-test-governance-spec-standards-civitas-steward` (re-pointed; ROUTED)
canonicalHash: sha256:99951e0293f59b5326e3e09be329d46fac3e14d8cc8b0c64fd3d797e0beba169
renderedHash: sha256:701eb853779969dce6ed0f6a72ce375a3e0f91b06d71e5dd6ab9188317e88e9a
verdict: assent — surviving 3/4; not surviving: `thurgood-test--role-1`

**Re-signed 2026-10-20** (prior signature: assent 3/4, 2026-09-29, against `sha256:3f53109f6af5f444299a6f76e65007a510b10470fc034e1554980b530c69fafb`). Stale because the canonical **Owns** line changed: ballot `2026-10-20-in-lane-guard-registry-additive-entries` (P1b; RATIFIED, Peter, 2026-10-20) site 3 added "and added entries in `.github/in-lane-guards.json`" and "amended 2026-10-20" to its CI-regime clause. Thurgood applied it at `ae68f130b`; I re-confirmed the set at 4 items (`8674be2e5`); he pinned the overlay and regenerated (`ebc83c6b5`). The rendering did not change: renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/tools-stacy/fresh-rendered-hash.ts`), equal to the committed rendering's value and to the prior signature's.
- **Judged against**: the rendered unit at this revision and the operative set at 4 items.
- **`thurgood-test--role-1` still does not survive.** The clause is removed whole under `subtraction-2` (consumers have no CI-regime standing scope and no registry file); the removal's text was rewritten to the new clause (I checked it occurs once in the unit). The other two removals are unchanged. The consumer rendering still states the charter cut without the ratification date, and `role-1` drops the CI-regime scope with nothing in its place.
- **Unchanged from the 2026-09-29 signature**: `thurgood-test-govern-1`, `thurgood-test--role-2` and `thurgood-test--role-3` survive; `role-1` is not credited.
- **C1 collapse**: I signed this assent on a row of Thurgood's shared doc in the counterpart seat; it is in Peter's sample as Stacy-signed.

**Prior signature record (superseded, 2026-09-29)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#thurgood-test-governance-spec-standards-civitas-steward` (re-pointed; ROUTED)
> canonicalHash: sha256:3f53109f6af5f444299a6f76e65007a510b10470fc034e1554980b530c69fafb
> renderedHash: sha256:701eb853779969dce6ed0f6a72ce375a3e0f91b06d71e5dd6ab9188317e88e9a
> verdict: assent — surviving 3/4; not surviving: `thurgood-test--role-1`
>
> The charter cut survives without its ratification date. `role-1` (**Owns**) drops the CI-regime scope with nothing in its place, so it is not credited. The instrument is substituted by "the checks that enforce completion standards".

## `#stacy-product-governance-quality-assurance-execution-claims-verification`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#stacy-product-governance-quality-assurance-execution-claims-verification` (re-pointed; ROUTED)
canonicalHash: sha256:99500e6e909a023dbcffd8b50438bcbbb45583cadd6f599357d31273628030b2
renderedHash: sha256:5efc12c923a652b126e28edde0dedd55217e0f212e82a1038375728edbe3b498
verdict: assent — surviving 2/3; not surviving: `stacy-product--role-1`

The charter cut survives without its date. `role-1` drops ARMING from the firing events, so it is not credited. This is consistent with my run-1 trigger-set read, where ARMING is repo-bound. This unit describes my seat, and it is disclosed.

## `#human-lead`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/agent-directory.dispositions.yaml` · body · `#human-lead` (re-pointed; ROUTED)
canonicalHash: sha256:b5cf76cd151486e6e3bf7c8c7a7815b10f9729ea9fbd631a3d3c4df086bea0a6
renderedHash: sha256:6e03c7c59360a25a63dc3e535443b381eec065b0b780591ddcc2dcd9784e418d
verdict: assent — surviving 4/4

"Peter Michaels Allen" → "Your human lead". All four survive.
