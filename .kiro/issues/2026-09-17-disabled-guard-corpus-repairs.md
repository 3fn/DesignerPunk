# Disabled-guard corpus repairs & adjudications (wave-4 consult batch)

**Date chartered**: 2026-09-17 (125-B U1b wave 4, step (a) — routed record; the edits do NOT ride the wave PR)
**Owner**: Lina (all items hers by domain; she elected the batch over four one-line PRs — "each individually trivial; separately they consume four PR gates for no reviewability gain")
**Priority**: HIGH on item 1 (a LIVE data defect); the rest sequence behind it
**Trigger**: next Lina session / next Peter burst with component capacity; item 2 additionally gates on a Peter ballot
**Evidence**: `wave-4-consult-lina.md` (all sections); register row `governance/classification-map.md § "no-disabled-states"`

---

## Items, in Lina's sequenced order

### 1. Exclusion-key vocabulary normalization — LIVE MCP data defect (W4-2, upgraded BLOCKING at consult)

The corpus spells the contracts.yaml exclusion section three ways: `excludes:` (20 components, canonical — taught at CDG:507 and Component-Templates:773, matched by both armed contract checks), **`excluded:`** (Nav-Header-App, Nav-Header-Base, Nav-Header-Page, Progress-Bar-Base), **`exclusions:`** (Nav-TabBar-Base). No further spellings exist (6-candidate sweep, clean).

**Not latent — live**: `application-mcp-server/src/indexer/parsers.ts:139` reads `doc.excludes` ONLY. Verified against the running server: `get_component_full("Nav-TabBar-Base")` returns **zero exclusions**. Five components' declared exclusions are invisible to every MCP consumer today (Leonardo's component selection, platform agents, `validate_assembly`, `check_composition`). `InheritanceResolver.ts:59-79` compounds it: a future child of a drifted parent would inherit a contract its parent excluded.

**Repair**: normalize the 5 files to `excludes:` (pure key rename; block bodies already canonical-shaped) → `rebuild_index` → **evidence requirement Lina set for herself**: before/after `get_component_full` diff for all five components, not just a green suite.

**STATUS (2026-09-18): DONE, pending merge.** Repair executed in worktree branch
`fix/exclusion-key-normalization` — pure key rename applied to all five files, targeted
suites green (8/8 suites, 191/191 tests, contract-count baseline unchanged at 234). Live-MCP
BEFORE evidence captured (all five confirmed `"excluded": {}` on the live server). Live-MCP
AFTER evidence (post-`rebuild_index`) is deferred to post-merge since the server reads
`main`, not this branch — the merging session runs it. Full evidence:
`.kiro/issues/evidence-2026-09-18-exclusion-key-normalization.md`. PR: (see PR link reported
in the completing session's output).

**Tracked WITH this item, shipped SEPARATELY** (the patch-without-guard lesson): the MCP parser silently accepting an unrecognized top-level key is itself the failure mode — a strict-key warning in `parsers.ts` (warn vs fail is its own design question) would have surfaced this years earlier.

### 2. Ignore-vs-throw parity adjudication — **a Peter BALLOT, and the gate for items 3–4** (W4-1(f))

Two armed, ratified, opposite architectures for the same philosophy: Button-CTA **ignores silently** (`observedAttributes` must NOT contain `disabled`; consumer-set attribute stripped, press fires — `ButtonCTA.test.ts:309/:315-331`) vs Button-VerticalList-Item **throws** (`observedAttributes` MUST contain `disabled` so the setter can reject — `.unit.test.ts:398`, `expect(...).toThrow(/disabled.*not supported/i)` ×3 suites). The corpus never chose; the only written checklist (TBCV:321) teaches ignore-silently as if it were the rule. A family-architecture call → **ballot, not unilateral fix**. Also a named PRECONDITION on the `no-disabled-states` row's proposed corpus-wide mechanism (an author cannot satisfy both).

**STATUS (2026-09-19): RULED (option d) by Peter.** DesignerPunk components SHALL NOT
observe, expose, or reject a consumer-set `disabled` input; the input is inert (ignore,
never throw). Button-VerticalList-Item's throw machinery (observedAttributes entry,
attributeChangedCallback throw, disabled getter/setter) retired to the Button-CTA guard
shape; its 7 throw-based test cases across `.unit`/`.failLoudly`/`.integration` rewritten
to the ignore shape. Record: `.kiro/docs/ballots/2026-09-19-disabled-input-parity.md`
(committed by the steward on this branch). Executed in worktree branch
`fix/disabled-guard-batch` alongside items 3–7 and the D1 rider (below); targeted suites
green (7/7 BVLI suites, 155/155 tests).

**D1 rider (form-data hazard, Input-Radio-Base — new at ruling time, not in the original
charter)**: Input-Radio-Base is form-associated (`formAssociated = true`). Per spec, a
form-associated custom element with a `disabled` attribute present is barred from the
form's entry list by the UA regardless of whether the component reacts to it — a
consumer relying on "disabled is inert" would silently lose the radio's value from
FormData. Fixed: `disabled` added to `observedAttributes` (Input-Radio-Base only, for
neutralization purposes) with attribute-stripping in `attributeChangedCallback`, plus a
no-op `formDisabledCallback`. Test added (`InputRadioBase.form.test.ts`, "Disabled
Attribute (D1)" describe) proving the attribute is stripped and the component's
registered form value is never cleared as a side effect — jsdom does not implement
`ElementInternals.setFormValue` (pre-existing documented limitation in that file), so the
test spies on `_internals.setFormValue` rather than constructing a real `FormData`.
Targeted suite green (3/3 Input-Radio-Base suites, 91/91 tests).

**D2 (optional dev-warn, documented not implemented)**: components MAY emit a
development-gated warning naming the philosophy and its three alternatives, on the
`ProgressStepperBase.web.ts:202-216` precedent, adopted at scaffolding rather than
retrofitted. Captured as an optional checklist clause in TBCV (item 3, below) — not
implemented on any existing component by this batch.

### 3. TBCV:321 rewrite (behind item 2)

`Test-Behavioral-Contract-Validation.md:321` instructs removing the `observedAttributes` entry BVLI's armed check requires — a CONTRADICTION (the CSR:183/PIG:169 class), not an imposter. Rewritten to state the RULED mechanism and name the exception, once item 2 rules. Governance doc → ballot model.

**STATUS (2026-09-19): RULED — TBCV:321 STANDS, no rewrite.** Per the item-2 ruling
(corpus-wide ignore, zero exceptions), the checklist line ("Component does not list
`disabled` in observedAttributes") was already correct — it was Button-VerticalList-Item's
*implementation* that contradicted the doc, not the doc contradicting itself. With BVLI's
throw retired (item 2), the contradiction is resolved by the code, not the text. Added: a
"Ignore-vs-throw parity (2026-09-19)" provenance note citing the ballot, and one new
`optional_dev_warn_validation` checklist clause documenting D2 (MAY emit a
development-gated warning; not required, not a guard failure either way). Re-swept per the
verification obligation below — clean (prohibition-framed content only).

### 4. PIG:169 rewrite — the strongest contradiction case the campaign has produced (W4-3)

`platform-implementation-guidelines.md:169`: the a11y-equivalence row whose THREE cells are ALL gate-banned literals (`aria-disabled` + `.disabled(` in `DISABLED_EXCLUSION_GUARD_PATTERNS`; `enabled = false` banned at `form-inputs-contracts.test.ts:526`). Ruled REWRITE — the row has no referent (it maps a capability no component may have). Lina's replacement (keeps the slot carrying information):

```
| **Unavailable action** | do not render | do not render | do not render |
| | *(DesignerPunk has no disabled states — adjudicated 2026-07-15. Use `state_loading` for in-flight actions, validate-on-press for invalid input, or do not render. See Component-Development-Guide § "No Disabled States".)* |
```

**Falsification clause carried from the consult**: KEEP is defensible if Peter reads the matrix as pure platform-API reference rather than component-authoring instruction — his ruling if contested. Governance doc → ballot model.

**STATUS (2026-09-19): DONE.** Replacement row applied verbatim as chartered. Re-swept
per the verification obligation below — clean (prohibition-framed content only). The
falsification clause was not contested at the 2026-09-19 sitting (REWRITE stands).

### 5. Vacuous-skip repairs (the wave-3 O-5 class, second instance)

The three types.ts prop-absence guards (`ButtonIcon.stemma:362`, `InputCheckboxBase.stemma:477`, `InputRadioBase.stemma:468`) carry `if (!typesSource) { console.warn(...); return; }` — pass vacuously on a missing file, backstopped only by the unallowlisted console.warn redding via console-fail-root-lanes. Same repair as the wave-3 batch: fail on absence rather than skip on it.

**STATUS (2026-09-19): DONE, narrowly scoped.** Fixed the three cited instances (each is
the "should not have disabled prop (by design)" test in its file) with
`expect(fileExists(TYPES_PATH)).toBe(true)`, replacing the vacuous-skip guard. **Scope
note**: each of these three `describe` blocks contains several OTHER tests sharing the
identical `if (!typesSource) { console.warn(...); return; }` pattern (not cited by line
number in this charter) — left untouched, in scope discipline to what was chartered. Flagged
here for a possible follow-up batch if Thurgood/Peter want the pattern swept exhaustively
rather than per-citation. Targeted suites green (3/3 suites, 102/102 tests).

### 6. Counter-pulling blend assertion (MISS-4 — the mirror of a phantom-gate claim)

`BlendTokenUsageValidation.test.ts:274/:390/:704` REQUIRES disabled-blend token usage on Button-CTA and Input-Text-Base — components banned from it — green only via two verified accidents (`disabledDesaturate` and `pressedDarker` share `0.12`; neither file contains a literal `0.12`, so the theme-aware disjunct passes vacuously). If either accident un-happens, the red instructs an author to RE-ADD disabled machinery. Repair: retire/repoint the disabled-blend assertions for these components (the `InteractionStateAudit.test.ts:130-141` calculator-capability-only reduction is the recorded model).

**STATUS (2026-09-19): DONE, narrowly scoped to the 3 cited lines.** Each of the three
cited assertions (Button-CTA Web disabled test :274, Input-Text-Base Web disabled test
:390, cross-platform Button-CTA disabled test :704) retired to an explanatory comment
citing the counter-pulling mechanism and the InteractionStateAudit.test.ts:130-141 model.
**Scope note**: the SAME `disabledDesaturate` requirement also appears on Button-CTA's
iOS (:314) and Android (:348) per-platform assertions, which this charter did NOT cite by
line number and which this pass left untouched. Whether those two share the identical
vacuous-pass mechanism (or fail for real, or pass via a different accident) was not
re-verified in this session — flagged as a candidate for a follow-up sweep, not fixed
here to stay inside the chartered scope. Targeted suite green (1/1 suite, 40/40 tests —
down from 43; 3 assertions removed as designed).

### 7. Stale test comment (W4-5 companion)

`behavioral-contract-validation.test.ts:390-397` still says the state_disabled floor exclusion is "pending the Button-CTA disabled-state adjudication" — it RULED 2026-07-15. Comment-only, zero behavior change; the register's `wcag-required-refs` row carries the fact refresh already.

**STATUS (2026-09-19): DONE.** Comment rewritten to state the settled fact (RULED REMOVE
2026-07-15, `.kiro/issues/button-cta-disabled-state-adjudication.md`; zero live
`state_disabled` declarations corpus-wide; exclusion permanent-by-outcome, not pending).
Zero behavior change confirmed — targeted suites green (2/2 suites, 47/47 tests).

## Verification obligations (per Stacy's wave-4 B4)

Items 1, 5, 6, 7: the armed suites themselves + item 1's before/after MCP evidence. Items 3–4 (education rewrites): the armed guard verifies only the 9 guarded components' span — beyond that, the verification is each rewrite's post-edit re-sweep (`grep -niE "aria-disabled|\.disabled\(|enabled\s*=\s*false"` over the edited doc returns only ❌-framed/prohibition content), stated here rather than assumed.
