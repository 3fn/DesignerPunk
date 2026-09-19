# Ballot: Disabled-Input Parity Adjudication (ignore-vs-throw)

**Date**: 2026-09-19
**Status**: **RATIFIED** (Peter, 2026-09-19, in-session — ruled on Lina's decision package at the sitting; record-first: this record rides the executing PR and Peter's merge is the acceptance)
**Presenter**: Lina (component owner — decision package); Thurgood (steward — sitting + record)
**Provenance**: chartered as item 2 of `.kiro/issues/2026-09-17-disabled-guard-corpus-repairs.md` (Lina's 125-B wave-4 finding W4-1(f)); named precondition on `governance/classification-map.md § "no-disabled-states"` scope 6's proposed corpus-wide mechanism; sequenced first at the 5.6 closeout's D5 ruling.

---

## The question

What happens when a consumer sets `disabled` on a DesignerPunk web component that, by corpus-wide ruled law (2026-07-15), has no disabled state? Two armed, green, never-reconciled answers existed: Button-CTA's guard asserts inertness (ignore); Button-VerticalList-Item carries ~30 lines of bespoke rejection (property setter throws; attributeChangedCallback throws).

## The corrected fact base the ruling rests on (decision package, every claim byte-verified)

1. **One-sided, not symmetric**: BVLI is the corpus's ONLY component with executable disabled-handling code; Button-CTA implements nothing (default-by-absence, like the other 33). Web-only — neither component's iOS/Android surface exposes the parameter at all.
2. **Authority asymmetry**: the throw's only source is Spec 038 `tasks.md:298` (a task bullet; the requirement says only "SHALL NOT support"); the ignore rests on Peter's 2026-07-15 adjudication, and TBCV:346 already names Button-CTA's guard block canonical.
3. **The throw does not enforce on the markup path — VERIFIED BY EXECUTION in a real browser at the sitting** (steward-run probe, 2026-09-19): `setAttribute('disabled','')` on an element whose `attributeChangedCallback` throws RETURNS NORMALLY to the caller — the exception is only reported to `window.onerror` and the attribute remains on the host; only the imperative property setter (`el.disabled = true`) throws to the caller. So `<button-vertical-list-item disabled>` — how disabled is actually authored — yields console noise and a fully interactive control: observably the Button-CTA end state. Lina's stated falsification clause did not fire.
4. **Live hazard H1 (neither architecture addressed it)**: `Input-Radio-Base` is form-associated (`formAssociated = true`, no `formDisabledCallback` anywhere in src) — per the HTML spec a consumer-set `disabled` silently EXCLUDES its value from form submission while the control still renders and responds. The one place the silence has teeth.
5. The corpus already holds a requirements-ratified third pattern: throw-in-dev / warn-and-degrade-in-prod (`ProgressStepperBase.web.ts:202-216` et al.).

## RULING (Peter, 2026-09-19): OPTION (d) — IGNORE AT RUNTIME, SURFACE AT DEV

> DesignerPunk web components SHALL NOT observe, expose, or reject a consumer-set `disabled` input; the input is inert (runtime behavior as option (a)). Button-VerticalList-Item's throw (`ButtonVerticalListItem.web.ts:261/:411-417/:575-599`) and its 7 test cases across 3 suites are retired to the Button-CTA guard shape (`ButtonCTA.test.ts:308-331`, the TBCV:346 canonical block). Plus:
> **(D1, mandatory, ships with this ruling's executing PR)**: `Input-Radio-Base` gains a `formDisabledCallback` no-op and attribute neutralization so a consumer-set `disabled` cannot silently drop its value from form submission (hazard H1 closed).
> **(D2, permissive, scaffold-forward)**: components MAY emit a development-gated warning naming the philosophy and its three alternatives (`state_loading` / validate-on-press / do not render), on the `ProgressStepperBase.web.ts:202-216` precedent — adopted at scaffolding, never as a 35-file retrofit.
> TBCV:321 stands as written, with one added clause for the dev-warn; the wave-4 contradiction dissolves. `no-disabled-states` scope 6's corpus-wide guard is now writable as one uniform assertion (`'disabled' ∉ observedAttributes` ∧ no `disabled` accessor), optionally extended to assert warn-presence.

**Counter-argument recorded at the decision point (Lina's own, AI-Collaboration-Principles form)**: D2 is optional-by-design and its warn requires a console-allowlist entry that weakens a recorded backstop; the realistic decay path is "option (a) with paperwork." Peter ruled (d) with that counter on the table. **Falsification/decay clause**: if, by the next arming campaign's closeout, D2 has been adopted by zero components beyond the pre-existing Progress precedent, the dial-style honest reading is that the corpus is operating under (a) — record it as such by dated amendment rather than letting the aspiration stand as fact.

## Hazard H2 (recorded, deliberately NOT actioned)

Neither architecture strips a consumer-set `disabled` from the HOST element, so consumer CSS like `button-cta[disabled] { opacity:.5 }` can produce a disabled-LOOKING, fully clickable control. Stripping a consumer's attribute is its own surprise; recorded here so the next person weighing it starts from the record.

## Execution

Rides the batch PR this ballot is committed on (`fix/disabled-guard-batch` — charter items 3–7 + D1), per the D4 standing convention (owner fix PR, stated verification obligations in the charter). Register updates (scope 3 + scope 6 of `no-disabled-states`, history entry) are steward-committed on the same branch.
