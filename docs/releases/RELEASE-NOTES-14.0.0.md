# Release Notes — v14.0.0

**Date**: 2026-08-12
**Type**: Major Release
**Specs**: 119-B (Capability Catalog, Routing & Measurement), 125-B U1/U2 (Classification Map pilot + net-new checks), 126 (Avatar decorative fix) + the no-disabled-states / readonly adjudications (issue-driven)
**Previous**: v13.0.0

---

## Summary

This release changes **how DesignerPunk components model unavailability**: disabled interaction states are removed from the system's philosophy — an action that isn't available is handled by composition (don't render the control, or render an alternative affordance), never by a desaturated dead control. In its place, **`readOnly` arrives as a first-class state** on the Input-Text family, distinct from anything disabled ever was. The release also ships the largest quality pass to date on the served documentation corpus — the knowledge your AI agents query through the bundled docs MCP.

It is a **major version bump** because two component surfaces lost their `disabled` behavior and a token utility family is deprecated.

---

## ⚠️ Breaking Changes

### 1. Button-CTA: `disabled` state removed

Button-CTA no longer accepts or renders a disabled state, per the adjudicated no-disabled-states philosophy: unavailable actions are a composition decision, not a component state.

**Action required:** remove `disabled` usage on Button-CTA. If the action is unavailable, don't render the button — or render the affordance that explains the unavailability.

### 2. Input-Text family: disabled handling removed on iOS and Android

The Input-Text natives no longer implement disabled behavior; residue was also cleared from demos, READMEs, and docs.

**Action required:** if you approximated "not editable" with `disabled`, migrate to the new first-class `readOnly` state (below) — it's semantically correct and accessibility-friendly. If the field genuinely shouldn't exist in a state, compose it away.

### 3. `blend.disabledDesaturate` + disabled blend wrappers deprecated

The disabled-serving blend utilities now warn on use; removal follows in a future major.

**Action required:** migrate off before the next major. With disabled states gone from the philosophy, these utilities have no remaining sanctioned use.

---

## Added

- **`readOnly` as a first-class Input-Text state** — the ratified state-readonly concept lands across the family, including the B-prime iOS ruling for native behavior. Read-only is now a real, distinct state: focusable, announced correctly by assistive tech, visually alive.
- **Avatar: decorative-prop misuse warning** — a runtime warning fires when `decorative` would hide meaningful content from assistive technology (Spec 126).

## Improved

- **The served docs corpus (what your agents query through the docs MCP)** took its largest quality pass to date: validated cross-references expanded **116 → 327**, 27 stale aliases pruned, 127 legacy snippets migrated to durable id-form citations, six content defects resolved, and the cross-reference parser is now id-aware. Discovery quality was measured against an 83-case oracle before and after (Spec 119-B).

## Fixed

- **Input-Text native base-call mismatches** on iOS/Android, with a static alignment guard added so the class of drift can't silently return.

---

## Upgrade Notes

1. Search your codebase for `disabled` usage on Button-CTA and Input-Text; migrate per the Breaking Changes above.
2. Search for `blend.disabledDesaturate` (and the disabled blend wrappers); plan migration this cycle.
3. No other API surfaces changed shape. MCP tools, token names, and package exports are unchanged from v13.

## Internal (provenance)

Behind this release, the repository's own machinery changed more than the package did: every merge now traverses a branch-protected PR gate with 18 required checks (Spec 125-A), agent prompts are generated from canonical sources (Spec 122), and steering prose is being measurably classified and pruned where CI now owns the behavior (Spec 125-B's pilot ran to a ratified verdict inside this release window). Listed for provenance — none of it ships in the package.

> **Companion record**: `release-14.0.0.md` (same directory) is this release's recipe-format record and carries the authorship note documenting the release-tool discrepancy that led to the tool's retirement (Q6 ballot, 2026-08-12).
