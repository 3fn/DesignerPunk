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

### 3. TBCV:321 rewrite (behind item 2)

`Test-Behavioral-Contract-Validation.md:321` instructs removing the `observedAttributes` entry BVLI's armed check requires — a CONTRADICTION (the CSR:183/PIG:169 class), not an imposter. Rewritten to state the RULED mechanism and name the exception, once item 2 rules. Governance doc → ballot model.

### 4. PIG:169 rewrite — the strongest contradiction case the campaign has produced (W4-3)

`platform-implementation-guidelines.md:169`: the a11y-equivalence row whose THREE cells are ALL gate-banned literals (`aria-disabled` + `.disabled(` in `DISABLED_EXCLUSION_GUARD_PATTERNS`; `enabled = false` banned at `form-inputs-contracts.test.ts:526`). Ruled REWRITE — the row has no referent (it maps a capability no component may have). Lina's replacement (keeps the slot carrying information):

```
| **Unavailable action** | do not render | do not render | do not render |
| | *(DesignerPunk has no disabled states — adjudicated 2026-07-15. Use `state_loading` for in-flight actions, validate-on-press for invalid input, or do not render. See Component-Development-Guide § "No Disabled States".)* |
```

**Falsification clause carried from the consult**: KEEP is defensible if Peter reads the matrix as pure platform-API reference rather than component-authoring instruction — his ruling if contested. Governance doc → ballot model.

### 5. Vacuous-skip repairs (the wave-3 O-5 class, second instance)

The three types.ts prop-absence guards (`ButtonIcon.stemma:362`, `InputCheckboxBase.stemma:477`, `InputRadioBase.stemma:468`) carry `if (!typesSource) { console.warn(...); return; }` — pass vacuously on a missing file, backstopped only by the unallowlisted console.warn redding via console-fail-root-lanes. Same repair as the wave-3 batch: fail on absence rather than skip on it.

### 6. Counter-pulling blend assertion (MISS-4 — the mirror of a phantom-gate claim)

`BlendTokenUsageValidation.test.ts:274/:390/:704` REQUIRES disabled-blend token usage on Button-CTA and Input-Text-Base — components banned from it — green only via two verified accidents (`disabledDesaturate` and `pressedDarker` share `0.12`; neither file contains a literal `0.12`, so the theme-aware disjunct passes vacuously). If either accident un-happens, the red instructs an author to RE-ADD disabled machinery. Repair: retire/repoint the disabled-blend assertions for these components (the `InteractionStateAudit.test.ts:130-141` calculator-capability-only reduction is the recorded model).

### 7. Stale test comment (W4-5 companion)

`behavioral-contract-validation.test.ts:390-397` still says the state_disabled floor exclusion is "pending the Button-CTA disabled-state adjudication" — it RULED 2026-07-15. Comment-only, zero behavior change; the register's `wcag-required-refs` row carries the fact refresh already.

## Verification obligations (per Stacy's wave-4 B4)

Items 1, 5, 6, 7: the armed suites themselves + item 1's before/after MCP evidence. Items 3–4 (education rewrites): the armed guard verifies only the 9 guarded components' span — beyond that, the verification is each rewrite's post-edit re-sweep (`grep -niE "aria-disabled|\.disabled\(|enabled\s*=\s*false"` over the edited doc returns only ❌-framed/prohibition content), stated here rather than assumed.
