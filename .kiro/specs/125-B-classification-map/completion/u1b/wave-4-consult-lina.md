# Wave 4 (Task 5.5) — Owner Consult: Lina (Stemma)

**Date**: 2026-09-17
**Consulted on**: `wave-4-assessment.md` (PRE-CONSULT DRAFT, 2026-09-17)
**Items**: W4-1 (BLOCKING), W4-2 (HIGH), W4-3 (MEDIUM), W4-5 (MEDIUM), plus the §7 falsification attempt on the C10 rows-only finding
**Method**: independent verification by execution. Every claim below carries a verbatim command or a `file:line` citation. I did not take the steward's fact base as given, and I did not modify any repository file — the one intended write is this document.

---

## Verdicts

### On the finding

| Finding | Verdict | Basis |
|---|---|---|
| **C10 ROWS-ONLY** | **CONCUR — holds** | Falsification attempted along §7's own clause and along a check-worded (pass-10) sweep using the vocabulary of the FOUR armed surfaces the steward missed. Zero imposters. One clause (TBCV:321) fails as a **contradiction**, not an imposter — a different disposition class that does not overturn rows-only. |
| **TBCV:305-346 KEEP** (§2.5, named as the most-overturnable scoring) | **CONCUR on the verdict, REJECT the reason as insufficient** | The blade-2 "coverage-creation recipe" reason is true but incomplete, and it rests on a premise the fact base falsifies. Amended reason supplied below. The section additionally contains a line that must be REWRITTEN (W4-3-adjacent). |
| **C10 rows-only is ENTAILED (§2.6 reason 1)** | **REJECT the entailment; the conclusion survives on reason 2 alone** | §2.6(1) says the armed checks' whats are "restated nowhere at source grain except TBCV." That is now a claim about a 5-component armed scope that does not exist. With the armed scope corrected to 9 components + a corpus-wide web-CSS guard, blade 1 newly APPLIES to family-doc clauses the draft dismissed. I re-scored them (all KEEP), so the conclusion holds — but by **survived scrutiny**, not by entailment. The distinction matters: an entailment claim that rests on a wrong scope is a register defect even when its conclusion is right. |

### On the facts

| Fact claim | Verdict | Correction |
|---|---|---|
| **"5 of 34 components guarded"** (§1, §2.3, §7) | **FALSIFIED — understated** | **9 of 34** at component grain, plus **one corpus-wide guard** the draft has no row for. Four additional armed, blocking, green surfaces exist. |
| **§2.3 row 3: "Remaining 29 components … **none**", naming Input-Checkbox/Radio explicitly** | **FALSIFIED** | Input-Checkbox-Base, Input-Radio-Base and Button-Icon each carry an armed prop-absence guard; Button-VerticalList-Item carries the corpus's STRONGEST disabled guard across three suites; and every web component's shipped CSS is guarded corpus-wide. The draft named as unguarded three components that are guarded. |
| **§2.3: "Token/blend layer — deprecation, not a gate"** | **FALSIFIED — incomplete, and in the dangerous direction** | An armed, blocking assertion **requires** disabled-blend token usage on Button-CTA and Input-Text-Base. It is a counter-pulling gate, not a deprecation note. Held harmless today only by two accidents. |
| **§2.4 vocabulary drift: "No red today … silent"** | **FALSIFIED — it is a LIVE data defect** | The Application MCP parses `doc.excludes` ONLY (`parsers.ts:139`). All five drifted files' exclusions are **already dropped** from every MCP consumer today. Verified live. |
| **W4-3: "two of those literals are in DISABLED_EXCLUSION_GUARD_PATTERNS"** | **Correct as stated, but understates the gate exposure** | All **three** PIG:169 literals are banned by armed assertions; the third (`enabled = false`) is banned by a different assertion in the same file. |
| **§2.3 Input-Text contracts-presence attribution** | **Imprecise** | `form-inputs-contracts.test.ts:370-375` asserts contracts-presence for **Input-Text-Base only** (`const component = 'Input-Text-Base'`, :235). The 4-component contracts-presence comes solely from `cross-platform-consistency.test.ts:529`. Net coverage unchanged; single-point-of-failure changed. |
| **§1 / §7 S1: zero live `state_disabled`, 21 keys, 5 under drifted sections** | **CONFIRMED — reproduced independently** | 21 components carry `state_disabled`; 16 under `excludes:`, 4 under `excluded:`, 1 under `exclusions:`; **zero** under `contracts:`. |
| **W4-5: wcag-required-refs stale fact** | **CONFIRMED** | Adjudication RULED REMOVE 2026-07-15; live count is zero; the test comment at `:390-397` is stale in the same words. |
| **Entry-id `no-disabled-states`** | **CONFIRMED CLEAN** | Unique and non-substring against all 20 existing entry-ids. |

**Count: 4 BLOCKING, 4 advisory.**

---

## W4-1 — C10 row adoption — **BLOCKING**

### (a) The armed-scope hunt — the "5 of 34" claim is FALSIFIED

The steward's §7 clause: *"Also falsifies if Lina finds a fourth armed surface I missed (my claim '5 of 34 components guarded' is strong and checkable)."* It is checkable, and it is wrong. I found **four** additional armed surfaces. Sweep that found them (the draft's S2/S3 swept `governance/`, `.kiro/steering/`, `canonical/` — never `src/components/`, which is where the misses live):

```bash
grep -rn "disabled" --include="*.test.ts" src/components/ | grep -iE "expect|it\(|describe\(|toThrow"
```

Every one is selected by the required lane — verified by execution, not inference:

```bash
npx jest --config jest.functional.config.js --listTests | grep -E \
 "form-inputs-contracts|cross-platform-consistency|ButtonCTA.test|InputRadioBase.stemma|\
InputCheckboxBase.stemma|ButtonIcon.stemma|ButtonVerticalListItem|BlendTokenUsageValidation|css-bundling"
# -> all 9 paths returned (BVLI x3: unit, integration, failLoudly)
```

And they are green today, not skipped:

```bash
npx jest --config jest.functional.config.js -t "disabled" \
  src/components/core/Button-Icon/__tests__/ButtonIcon.stemma.test.ts \
  src/components/core/Input-Radio-Base/__tests__/InputRadioBase.stemma.test.ts \
  src/components/core/Input-Checkbox-Base/__tests__/InputCheckboxBase.stemma.test.ts \
  src/components/core/Button-VerticalList-Item/__tests__/ButtonVerticalListItem.failLoudly.test.ts
# -> Test Suites: 4 passed; Tests: 5 passed, 101 skipped (the -t filter)
```

**The four misses:**

**MISS 1 — the types.ts prop-absence guard, 3 components.** `Button-Icon/__tests__/ButtonIcon.stemma.test.ts:362`, `Input-Checkbox-Base/__tests__/InputCheckboxBase.stemma.test.ts:477`, `Input-Radio-Base/__tests__/InputRadioBase.stemma.test.ts:468` — all three `it('should not have disabled prop (by design)')`, all three:

```ts
const hasDisabledProp = /disabled\s*[?:]/.test(typesSource);
expect(hasDisabledProp).toBe(false);
```

Bite probed against the real files (synthetic append, no file modified):

```
Input-Radio-Base/types.ts      -> false (clean)   "disabled?: boolean" appended -> CAUGHT
Input-Checkbox-Base/types.ts   -> false (clean)   "disabled?: boolean" appended -> CAUGHT
Button-Icon/types.ts           -> false (clean)   "disabled?: boolean" appended -> CAUGHT
                                                  "isDisabled?: boolean"        -> MISSED
                                                  "'disabled'," (observedAttrs) -> MISSED
```

So it genuinely bites the canonical prop form and is narrower than the form-inputs guard. Two caveats the row must carry: it is **types.ts-only** (nothing about contracts.yaml, observedAttributes, runtime or CSS), and it carries the `if (!typesSource) { console.warn(...); return; }` vacuous-skip path — the **same second-order dormancy path I flagged in wave 3** on the stemma color assertions (`no-hardcoded-color` education disposition, "CROSS-RULE INTERACTION"). The identical repair applies and I fold it into the same batch.

**MISS 2 — Button-VerticalList-Item, the strongest disabled guard in the corpus, across THREE suites.** `ButtonVerticalListItem.failLoudly.test.ts:48-69` (`describe('Disabled State Rejection')`), `.unit.test.ts:387-425`, `.integration.test.ts:371-382`:

```ts
expect(() => { button.disabled = true; }).toThrow(/disabled.*not supported/i);
```

This is stronger than Button-CTA's ignore-silently guard — the component *fails loudly at runtime*. The draft classified BVLI into the "remaining 29 … none" bucket.

**MISS 3 — the ONLY corpus-wide guard, and the draft has no row shape for it.** `src/__tests__/browser-distribution/css-bundling.test.ts:186-192`:

```ts
it('should not contain disabled state styles (no-disabled-states philosophy)', () => {
  const bundleContent = fs.readFileSync(ESM_BUNDLE_PATH, 'utf-8');
  expect(bundleContent).not.toMatch(/:disabled|--disabled/);
});
```

This asserts against the **built browser ESM bundle**, i.e. the shipped CSS of *every* web component in the browser entry — not a named component list. It is armed at the PR gate: `lane-timing.yml:182-183` runs `npm run build` (which includes `build:browser`) **before** `npm test` at `:209`. Verified green locally against a real bundle. Its `beforeAll` **throws** if `dist/browser` is absent, so it fails loudly rather than going silently dormant if the build step is ever removed — a design property worth recording, since it is the opposite of the wave-3 `no-hardcoded-color` dormancy failure mode.

This is the single most consequential miss. §2.3's "remaining 29 components — **none**" is false for the web-CSS surface for all 34.

**MISS 4 — an armed check pulling the OTHER WAY (a class this campaign has not named).** `src/components/__tests__/BlendTokenUsageValidation.test.ts`:

```ts
// :274 (Button-CTA web), :314 (iOS), :348 (Android), :390 (Input-Text-Base web), :704 (all 3 platforms)
it('should use correct disabled blend token value (0.12)', () => {
  expect(hasBlendTokenValue(source, BLEND_TOKEN_VALUES.disabledDesaturate)).toBe(true);
});
```

An armed, blocking, currently-green assertion that **requires** disabled-blend machinery on Button-CTA — the component the 2026-07-15 ruling stripped it from — and on Input-Text-Base, whose platform sources are simultaneously **banned** from `disabledBlend` by `DISABLED_EXCLUSION_GUARD_PATTERNS` (`form-inputs-contracts.test.ts:140`). Two armed checks in the same required lane, pointed in opposite directions at the same file.

It passes only by two accidents, both verified:

1. `BLEND_TOKEN_VALUES.disabledDesaturate = 0.12` and `pressedDarker = 0.12` (`:57-58`) — the assertion cannot distinguish disabled from pressed.
2. More decisively, `grep -n "0\.12"` returns **nothing** in either `ButtonCTA.web.ts` or `InputTextBase.web.ts`. It passes via the `themeAwarePatterns` disjunct in `hasBlendTokenValue` — `getBlendUtilities()` / `@3fn/core/blend` (8 matches in ButtonCTA.web.ts, 3 in InputTextBase.web.ts). The assertion verifies **nothing token-specific at all**.

This is the mirror image of wave 3's O-9 accuracy defect ("prose teaching a check that does not exist"): here a **check demands a behavior the corpus has ruled out**, and is prevented from firing only by its own vacuity. If `pressedDarker`'s value ever changed, or if the theme-aware disjunct were tightened, the red it produces would instruct an author to re-add disabled machinery to Button-CTA. **I take this defect.** It is not a wave hunk — it is component-test repair in my domain.

`src/blend/__tests__/InteractionStateAudit.test.ts:130-141` is the correctly-handled version of the same situation and needs no action: its `Disabled state (ΔC ≥ 0.03)` describe was deliberately reduced to calculator-capability-only at the adjudication (issue § Changes), and its header comment (`:17-20`) states the philosophy accurately. Scored KEEP, noted as the model.

### (b) The `scope[]` fact base — restructure required

The three-entry `scope[]` cannot serialize the reality. I propose **six** entries; the draft's entry 3 ("remaining 29 — none") is factually false as written and must not land.

| # | Surface | disposition / check_state | Notes for the rationale line |
|---|---|---|---|
| 1 | Input-Text-Base / -Email / -Password / -PhoneNumber | barrier / armed | Contracts-presence (`cross-platform-consistency.test.ts:529`, all 4) + **Input-Text-Base-only** contracts-presence duplicate (`form-inputs-contracts.test.ts:370-375`) + 5-pattern 3-platform raw-source scan (`:383-402`, all 4) + iOS `.disabled(` absence (`:448-457`) + Android `enabled = false` absence, Base only (`:526`). The deepest coverage in the corpus. |
| 2 | Button-CTA | barrier / armed | Contracts section-split (`ButtonCTA.test.ts:294-306`) + API-surface (`:308-313`) + runtime ignore-silently (`:315-331`). |
| 3 | Button-VerticalList-Item | barrier / armed | Runtime **throw**, 3 suites. Architecturally DIVERGENT from #2 — see (f). |
| 4 | Button-Icon, Input-Checkbox-Base, Input-Radio-Base | barrier / armed (NARROW) | types.ts `/disabled\s*[?:]/` prop-absence only; misses `isDisabled`, observedAttributes, runtime, CSS; carries the vacuous console.warn skip path. |
| 5 | **All web components' shipped CSS** (corpus-wide, build-artifact grain) | barrier / armed | `css-bundling.test.ts:186-192` against `dist/browser/designerpunk.esm.js`. `armed_at` omitted (pr-gate default is correct — it is a test in `lane-functional-root`), but the rationale MUST record the build dependency (`lane-timing.yml:182-183`) and that `beforeAll` throws on a missing bundle rather than skipping. |
| 6 | The remaining 25 components at contract / API / runtime grain, and iOS+Android implementations for all but the 4 Input-Texts | none / proposed | The real gap. A new `state_disabled` contract here is selected by `wcag-required-refs` and forced to carry a valid ref — a format check, not a philosophy check (this part of the draft is correct and worth keeping verbatim). |

Corrected coverage: **~26% at component grain** (9 of 34) plus a corpus-wide web-CSS surface — not "~15%, and every other component relies on education." The draft's coverage sentence should be struck, not softened.

Keep the draft's honest observation that the guarded set was assembled historically (Spec 066, the Button-CTA removal) rather than by a recorded scope decision — the correction makes that *more* true, not less: Button-Icon / Checkbox / Radio got their guards from a stemma-scaffold template, BVLI from a 2025-era accessibility requirement (`Requirement 10.2`), and css-bundling from the 2026-07-15 removal's test flip. Four independent origins, zero coordination. That is the finding 5.6 should hear.

**On the `proposed` candidate mechanism** (extend the exclusion + banned-pattern guard corpus-wide): I endorse the direction and add two preconditions the draft does not name. (1) The vocabulary normalization (W4-2) must land first — and it is a **live** defect, not a latent one (see below). (2) The mechanism must first settle which of the two ratified architectures it enforces — ignore-silently (Button-CTA) or throw (BVLI) — because an author cannot satisfy both, and today the corpus's only written checklist teaches only one (see (f)).

### (c) Row ownership — **ACCEPT**

I take `no-disabled-states` as owner. The guarded surfaces, the philosophy's home docs (CDG, Component-Templates, TBCV, the family docs), the contracts.yaml vocabulary, and all four repair items identified here are Stemma. No boundary objection.

Standing caveat, recorded so it is not rediscovered: `blend.disabledDesaturate` and the blend wrappers are Ada's tokens. My ownership covers the component-side check corpus and the component tests; the deprecation-to-removal schedule (`Token-Family-Blend.md:31/:72/:486`) stays Ada's. The MISS-4 defect sits on the component-test side of that line, which is why I take it.

### (d) Boundary class — **functional. CONCUR with the draft's call, with a sharpened rationale.**

All four detection forms now in scope are mechanical properties of artifact bytes or of observed runtime behavior — which section of a YAML file a key sits under; whether a literal appears in a source file; whether a substring appears in a built bundle; whether a property setter throws. None requires adjudication. The counter-reading the draft recorded (`operational` — "forbidden by ruled law") is a real reading and I would not call it wrong, but it misidentifies what is being measured: the *ruling* is the law, and the ruling is what makes the row exist at all; the *check* measures artifacts. The register already resolves this shape identically at `no-hardcoded-color` ("a color literal is a DEFECT in a component implementation") — same structure, same class, and consistency across sibling rows is itself worth something.

One sharpening the draft's rationale should absorb, in the wave-3 spirit of not overstating an instrument's reach: **the mechanical detectability is narrower than the rule's what.** Concretely — the prop guard misses `isDisabled`; the contracts guards read one YAML spelling of three (W4-2); the CSS bundle guard sees `:disabled|--disabled` but not a `.foo--inactive` class doing disabled work; nothing scans iOS/Android for 30 of 34 components. The class is functional; the instruments cover a strict subset. Say so on the row, so a future arming decision does not inherit a false sense of reach.

`class` stays **scalar** (all six scopes are functional). `scope[]` is still required — not for a surface-dependent boundary, but for per-surface dispositions and check_states, exactly as `no-hardcoded-color` uses it. Top-level `disposition: scoped`, no top-level `check_state`/`checks` (the `record-first-ratification` / `no-hardcoded-color` convention).

### (e) Entry-id `no-disabled-states` — **CLEAN, both constraints verified mechanically**

```bash
python3 -c "
ids=[l.strip()[4:] for l in open('governance/classification-map.md') if l.startswith('### ')]
new='no-disabled-states'
print('exists:', new in ids)
print('substring collisions:', [i for i in ids if i in new or new in i])"
# -> exists: False        substring collisions: []
```

20 existing entry-ids checked, including the near-neighbours `no-autonomous-token-creation`, `no-hardcoded-color`, `never-hand-edit-122-generated`, `never-hand-edit-generated-token-outputs`. No collision in either direction. Kebab-case. Approved as drafted.

### (f) NEW — architectural parity split inside the armed scope (my finding, not in the draft)

Two components, two armed, opposite answers to the same philosophy:

| | Button-CTA | Button-VerticalList-Item |
|---|---|---|
| observedAttributes | `expect(ButtonCTA.observedAttributes).not.toContain('disabled')` (`ButtonCTA.test.ts:309`) | `expect(observedAttributes).toContain('disabled')` (`.unit.test.ts:398`) |
| consumer sets `disabled` | silently ignored; press still fires (`:315-331`) | **throws** `/disabled.*not supported/i` (`:403`) |

Both are armed, green, and ratified by their own specs. Neither is wrong on its own terms — ignore-silently is more forgiving for a public web component; fail-loudly surfaces the mistake at authoring time. But the corpus has never chosen, and the only written checklist teaches one of them as if it were the rule. This is a genuine Stemma parity question and it belongs on the row's `proposed` mechanism as a precondition, not discovered when someone tries to write the corpus-wide guard. **I take the adjudication**; it is a family-architecture call, so it will reach Peter as a ballot, not a unilateral fix.

---

## W4-2 — Exclusion-key vocabulary drift — **BLOCKING (upgraded from the draft's HIGH: it is a LIVE defect, not a latent one)**

### The five files — CONFIRMED exactly, and the sweep for MORE spellings is CLEAN

```bash
for f in src/components/core/*/contracts.yaml; do
  k=$(grep -oE "^(excludes|excluded|exclusions|exclude|excluded_contracts|excluded_concepts):" "$f" | sort -u | tr '\n' ' ')
  [ -n "$k" ] && echo "$(basename $(dirname $f)): $k"
done
```

25 of 34 components carry an exclusion section: **20 canonical `excludes:`**; **`excluded:`** — Nav-Header-App, Nav-Header-Base, Nav-Header-Page, Progress-Bar-Base; **`exclusions:`** — Nav-TabBar-Base. **No further drifted spellings exist** — `exclude:`, `excluded_contracts:`, `excluded_concepts:` all return zero. The steward's enumeration is exactly right and exhaustive.

Per-key placement of `state_disabled` also reproduces the S1 result exactly: 21 components carry it — 16 under `excludes:`, 4 under `excluded:`, 1 under `exclusions:`, **zero** under `contracts:`.

### The falsification: "No red today … silent" is WRONG

The draft frames the drift as future risk ("false-RED or blind-guard tomorrow"). It is a **live data defect today**, and not in the test layer — in the MCP:

```
application-mcp-server/src/indexer/parsers.ts:139
  const rawExcludes = (doc.excludes ?? {}) as Record<string, Record<string, unknown>>;
```

`doc.excludes` only. No fallback, no alias. Verified live against the running server:

```
mcp__designerpunk-application__get_component_full("Nav-TabBar-Base")
  -> contracts.excluded: {}
```

Nav-TabBar-Base declares `state_disabled` under `exclusions:` and the Application MCP reports **zero exclusions**. The same holds by construction for Nav-Header-App / -Base / -Page and Progress-Bar-Base. So five components' declared exclusions are already invisible to every MCP consumer — Leonardo selecting components, the platform agents reading contracts, `validate_assembly`, `check_composition`. The only reason this has not produced a visible wrong answer is that Nav-TabBar-Base restates the philosophy in free-text `description` and `whenNotToUse` prose, which no structured consumer can act on.

`InheritanceResolver.ts:59-79` compounds it: exclusion inheritance (`if (child.excludes[name]) continue;`) also reads only the canonical key, so a future child of any drifted parent would inherit a contract its parent excluded.

### Verdict: **CHARTER — and I take the repair, at HIGH, sequenced before the candidate mechanism**

Scope: normalize 5 files to `excludes:`, re-run `rebuild_index`, confirm `contracts.excluded` is non-empty for all five. Pure key rename; the block bodies already match the canonical shape.

**Counter-argument, stated because the fix looks too easy:** a key rename in 5 contracts.yaml files is not obviously free. `contracts.yaml` feeds the MCP index, the stemma suites, and the component READMEs; the four `excluded:` files are Navigation and Progress components with live web implementations. My assessment is that the blast radius is genuinely small — the drifted key is read by *nothing* today (that is the defect), so normalizing can only add data, never change an existing answer. But I would rather be shown wrong on that than have it assumed, so the repair PR should carry a before/after `get_component_full` diff for all five components as its evidence, not just a green suite.

**Second-order item I am NOT folding, routed:** the MCP parser silently accepting an unrecognized top-level key is itself the failure mode — a strict-key warning in `parsers.ts` would have surfaced this years earlier. That is Application-MCP hardening in my write scope, but it is a distinct change with its own design question (warn vs. fail), and folding it into a rename PR would be the patch-without-guard pattern. Tracked with the repair, shipped separately.

---

## W4-3 — `platform-implementation-guidelines.md:169` — **advisory, verdict: REWRITE (contradiction, the wave-2 CSR:183 class)**

### The line, with its table context read in full (`:163-170`)

```
### 4. Accessibility Consistency
All platforms MUST provide equivalent accessibility support using platform-native APIs.

**Accessibility Equivalence Matrix**:
| Accessibility Feature | Web | iOS | Android |
| **Label association**  | `<label for>` or `aria-labelledby` | `.accessibilityLabel()` | `contentDescription` |
| **Error announcement** | `role="alert"` + `aria-describedby` | `.accessibilityHint()` | `semantics { error() }` |
| **Disabled state**     | `aria-disabled="true"` | `.disabled()` | `enabled = false` |
| **Focus management**   | `tabindex`, `:focus-visible` | `@FocusState` | `FocusRequester` |
| **Screen reader**      | ARIA attributes | VoiceOver modifiers | TalkBack semantics |
```

### Why the draft's framing understates it

The draft says *"two of those literals ARE `DISABLED_EXCLUSION_GUARD_PATTERNS`."* Correct for that constant (`aria-disabled` at `:141`, `\.disabled\(` at `:143`). But **all three** are banned by armed assertions: the Android literal is banned by `form-inputs-contracts.test.ts:526`:

```ts
// Never enabled=false — the only Compose mechanism that would remove
// a readOnly field from focus order is banned disabled semantics.
expect(content).not.toMatch(/enabled\s*=\s*false/);
```

So PIG:169 is a three-column table row in which **every cell is a gate-banned literal** for the guarded components. That is the strongest contradiction case this campaign has produced — stronger than wave 2's CSR:183, which instructed one form that redded one gate.

### Ruling: **REWRITE, not KEEP**

I considered KEEP seriously. The surrounding table is legitimate and valuable platform reference — the other four rows are exactly the cross-platform equivalence mapping this doc exists to provide, and there is a real argument that removing one row makes the matrix look arbitrary and invites someone to "restore" it later.

That argument loses on one fact: **the row has no referent.** The other four rows map a capability DesignerPunk components have. This row maps a capability no DesignerPunk component may have, corpus-wide, with zero exceptions, since 2026-07-15. It is not reference — it is a signpost to territory the gate then punishes an author for entering. And an author who follows it on a form input produces three separate reds with no explanation of why.

**Proposed replacement** (a rewrite, not a deletion — the row's slot keeps carrying information, which answers the "arbitrary gap" objection):

```
| **Unavailable action** | do not render | do not render | do not render |
| | *(DesignerPunk has no disabled states — adjudicated 2026-07-15. Use `state_loading` for in-flight actions, validate-on-press for invalid input, or do not render. See Component-Development-Guide § "No Disabled States".)* |
```

This follows the `Token-Family-Blend.md:31` model the draft correctly identifies as the reconciled exemplar: state the prohibition, name the alternatives, cite the ruling.

**Vehicle: an owner fix PR** (the #132 precedent), not a wave hunk — I accept the steward's routing, which keeps the wave rows-only. But I flag an inconsistency the steward should resolve rather than let harden: in **wave 2**, contradiction rewrites *were* candidate-diff hunks (the `wcag-required-refs` row records "2 contradiction REWRITES (CDS:824 …; CSR:183 …)" inside the ratified 5-hunk diff). Wave 4 routes them out. Both may be defensible, but the campaign should not have two silent conventions for the same disposition class — that belongs in 5.6 as a method item.

PIG is a governance doc, so the rewrite rides the ballot model regardless.

---

## W4-5 — `wcag-required-refs` stale fact — **advisory, CONFIRMED in substance; I take the companion repair**

**The register fact**: confirmed stale. `classification-map.md:331` and the `:336` history entry both read *"pending the Button-CTA disabled-state adjudication … currently 1 live, Button-CTA."* The adjudication is `.kiro/issues/button-cta-disabled-state-adjudication.md`, header line 1: `# Button-CTA: Disabled-State Adjudication — RULED: REMOVE`, `**Date**: 2026-07-15`, `**Status**: RESOLVED — removal implemented`. Live count verified zero by the per-file section sweep above (21 `state_disabled` keys, none under `contracts:`).

**Note for the steward, so the history entry is drafted accurately**: a STALE-PENDING DISCHARGE for this exact fact was **already landed at wave 2** (`:338`, 2026-08-25) and it is correct and complete. What remains stale is the *2026-07-14 history entry at `:336` and the `checks[]` prose at `:331`*, which still carry the pre-discharge wording. So the wave-4 entry should be framed as a **fact-refresh of the `checks[]` field**, not as a new discharge — writing it as a discharge would imply the wave-2 entry missed something, which it did not, and would leave a future reader with two discharge records for one event. With that framing: **correct in substance, confirmed.**

Substantive ruling unchanged and I re-affirm it as row owner: `state_disabled` stays in `WCAG_REQUIRED_EXACT` (`behavioral-contract-validation.test.ts:345`) and stays out of the per-literal presence floor. A reintroduced contract is still selected and still forced to carry a valid ref — which is exactly the reintroduction backstop the new `no-disabled-states` row's unguarded scope-6 relies on. The two rows should cross-reference each other on that point.

**The companion repair — I TAKE IT.** `src/__tests__/stemma-system/behavioral-contract-validation.test.ts:390-397`:

```ts
// Per-literal presence floor (DD3), THREE literals per Peter's 2026-07-14
// amendment — NOT the four DD3 originally recorded. `state_disabled` is
// EXCLUDED from this floor pending the Button-CTA disabled-state
// adjudication (the matcher itself is unchanged: ...)
```

`pending` is false; the adjudication resolved 14 months of corpus history ago in this timeline's terms and one day after the comment was written. Comment-only, zero behavior change. I batch it with the other three repairs I am taking (MISS-1 vacuous-skip paths, MISS-4 blend-assertion defect, W4-2 normalization) rather than shipping four one-line PRs — each is individually trivial, and separately they would consume four PR gates for no reviewability gain. Sequencing: W4-2 first (it is the live defect), the rest behind it.

---

## Falsification attempt on the C10 ROWS-ONLY finding

### The attempt

§7's clause: *"C10 rows-only falsifies if any source-grain clause restates one of the three armed checks' whats for a surface the check guards, and supplies nothing the check cannot."* With the armed scope corrected from 3 checks / 5 components to 9 suites / 9 components + a corpus-wide surface, blade 1 now applies across far more territory than the draft scored it against — which is precisely the condition under which a rows-only verdict should fall.

I ran a check-worded (pass-10 discipline) sweep using the vocabulary of the **newly discovered** checks — vocabulary the draft's S2/S3 could not have returned:

```bash
grep -rniE "css-bundling|failLoudly|fail.loudly|disabled state styles|disabled prop \(by design\)|\
browser-distribution|InteractionStateAudit|BlendTokenUsageValidation|disabledDesaturate|observedAttributes" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/ | grep -v classification-map.md
```

**Result: zero imposters.** Hits were `Token-Family-Blend.md:31/:72/:486` (deprecation teaching — KEEP, already scored, and the reconciled exemplar), `Test-Failure-Audit-Methodology.md:1359-1461` + `Component-Development-Guide.md:1704` (the general fail-loudly philosophy, out of territory), `browser-distribution-guide.md` frontmatter only (that doc contains **zero** `disabled` hits — verified; the corpus's only corpus-wide guard is taught nowhere, which is an education-ABSENCE observation, not an imposter), and `Test-Behavioral-Contract-Validation.md:307/:321`.

### The one clause that fails — and it fails as a CONTRADICTION, not an imposter

`Test-Behavioral-Contract-Validation.md:321`:

```
- [ ] Component does not list `disabled` in observedAttributes (web) or an equivalent
      observed-attribute mechanism per platform
```

Blade 1 passes (it restates `ButtonCTA.test.ts:309` for a guarded surface). Blade 2 is where it breaks, but not in the direction that would make it an imposter: the clause is **contradicted by an armed check** — `ButtonVerticalListItem.unit.test.ts:398` requires `observedAttributes` to CONTAIN `'disabled'` so the setter can throw. An author applying this checklist to a BVLI-shaped component is instructed to remove the observation that a required check demands.

A clause that instructs a form an armed gate forbids is the **CSR:183 / PIG:169 class — rewrite**, not the CDS:686 class — cut. Contradictions are not imposters, and (per the wave-4 routing the steward chose for PIG:169) they do not become wave hunks. **Rows-only survives.** The repair is mine and folds into the W4-1(f) parity adjudication: once the corpus rules ignore-vs-throw, `:321` is rewritten to state the ruled mechanism and name the exception.

### The TBCV:305-346 KEEP — verdict CONCUR, reason REJECTED and replaced

The steward flagged this as the scoring most plausibly overturned. I tried to overturn it and could not, but the **reason** as drafted does not survive:

> *"Blade 2 decides it: this is test-AUTHORING documentation — its checklist is the recipe by which the NEXT component gets its guard block written (no gate exists for 29 components until someone writes one, and this is the only document that teaches how)."*

The parenthetical is now false: a gate DOES exist for all 34 components' shipped CSS, and for 9 components at contract/API/runtime grain. The KEEP cannot rest on "29 components have no gate."

**Replacement reason, on evidence:** the section supplies four things no armed check in the corpus can supply, and this is why it is KEEP:

1. **The standardized `reason:` string** (`:317`). No check asserts the exclusion block's reason text — I verified: `cross-platform-consistency.test.ts:534` tests only `content.includes('excludes') && content.includes('state_disabled')`. Without this line the standardized wording has no source.
2. **iOS/Android rendered-output rows** (`:333-336`, `:338-341`). Armed coverage on those platforms exists for **4 of 34** components. The checklist addresses all 34.
3. **The Philosophy Alternatives block** (`:343-345`) — `state_loading` / validate-on-press / don't render. A presence check can detect the violation; it cannot tell the author what to build instead. This is the clearest blade-2 pass in the wave.
4. **The provenance paragraph** (`:307`) — the ruling, its date, its zero-exception scope, and the blend deprecation, in one citable place.

Same verdict shape as wave 3's TDS:1482, as the draft says — but reached on what the clause *supplies*, not on an absence of gates that turned out not to be absent. The distinction is exactly the wave-3 CDG:1692 lesson: a wrong reason on a right disposition is still a register defect, because the register is read as settled fact.

### Family-doc clauses the draft dismissed on a premise that no longer holds — RE-SCORED, all KEEP

§2.5 scored these KEEP because *"none of these families' components are guarded (except the 4 Input-Texts), so blade 1 fails."* That premise is now false for two families. Re-scored against the corrected scope:

| Clause | Blade 1 now? | Verdict |
|---|---|---|
| `Component-Family-Button.md:34` — *"Interaction States: Comprehensive hover, pressed, and loading states (no disabled state — DesignerPunk philosophy)"* | **Applies** — 3 of the Button family are guarded (CTA, Icon, VerticalList-Item) | **KEEP.** It is a characteristics bullet, not a checklist: it describes what the family HAS (hover, pressed, loading) with the exclusion as an aside. No check states the positive list. Blade 2 passes. |
| `Component-Family-Form-Inputs.md:118` — *"**Excluded**: `state_disabled` — … (adjudicated 2026-07-15; see …)"* | **Applies** — 6 of the family are guarded | **KEEP.** It carries the ruling citation and the alternative ("if an input is unavailable, it should not be rendered") — neither is in any check. Blade 2 passes. |
| `Component-Family-Chip.md:39` | Does NOT apply — zero Chip components are guarded (verified: no `disabled` assertions in any Chip test) | **KEEP**, draft's reason stands unchanged. |
| `Component-Inheritance-Structures.md:90/:155/:624`, `Component-Family-Navigation.md:35/:117/:146`, `stemma-system-principles`, `Contract-System-Reference:106/:162`, `Component-Development-Standards:322-324` | No change | **KEEP**, draft's reasons stand. |
| `Component-Development-Guide.md:501-512` | Applies more widely than drafted | **KEEP**, reason unchanged and strengthened — it is the only source of the standardized `excludes:` YAML block, which is now load-bearing for the W4-2 normalization. |

All KEEP. The dispositions survive; **two of the reasons must be rewritten before they land in the register.**

### Education-absence observation — I CONFIRM the draft's, and add one

The draft's observation stands (the philosophy lives entirely in `governance/`, zero hits in `.kiro/steering/` or `canonical/agents/`, including my own prompt). I confirm it and note the sharper version: `governance/browser-distribution-guide.md` — the doc that owns the browser bundle — contains **zero** `disabled` hits, so the corpus's only corpus-wide guard is documented nowhere at all. An author who reds `css-bundling.test.ts:186` gets a regex failure against a 2MB bundle and no route to the rule. Friction-class, recorded, not actioned in a wave; it belongs on the row's education disposition as a named gap.

---

## Sweep record — reproducible verbatim

```bash
# L1 — component-test disabled assertions (the sweep the draft did not run; found MISS 1-4)
grep -rn "disabled" --include="*.test.ts" src/components/ | grep -iE "expect|it\(|describe\(|toThrow"

# L2 — corpus-wide disabled surfaces beyond src/components/
grep -rn "no-disabled\|no disabled state\|disabled state\|disabled-state" \
  --include="*.ts" --include="*.js" --include="*.sh" src/ scripts/ tools/ .github/

# L3 — lane selection, by execution (all 9 paths returned)
npx jest --config jest.functional.config.js --listTests | grep -E \
 "form-inputs-contracts|cross-platform-consistency|ButtonCTA.test|InputRadioBase.stemma|\
InputCheckboxBase.stemma|ButtonIcon.stemma|ButtonVerticalListItem|BlendTokenUsageValidation|css-bundling"

# L4 — the new guards are green, not skipped
npx jest --config jest.functional.config.js -t "disabled" <the 4 new suites>   # 4 passed / 5 tests
npx jest --config jest.functional.config.js -t "disabled state styles" \
  src/__tests__/browser-distribution/css-bundling.test.ts                       # 1 passed

# L5 — exclusion-key vocabulary, exhaustive (6 candidate spellings)
for f in src/components/core/*/contracts.yaml; do
  k=$(grep -oE "^(excludes|excluded|exclusions|exclude|excluded_contracts|excluded_concepts):" "$f" \
      | sort -u | tr '\n' ' '); [ -n "$k" ] && echo "$(basename $(dirname $f)): $k"; done
# -> 20 excludes: | 4 excluded: | 1 exclusions: | zero other spellings

# L6 — state_disabled placement, per file (reproduces S1 independently)
for f in src/components/core/*/contracts.yaml; do
  awk -v file="$(basename $(dirname $f))" '/^[a-zA-Z_]+:/{section=$1} /state_disabled:/{print file" -> "section}' "$f"; done
# -> 21 hits; 16 excludes: / 4 excluded: / 1 exclusions: ; ZERO under contracts:

# L7 — MCP parser key handling (the W4-2 upgrade)
grep -rn "excludes\|exclusions\|excluded" --include="*.ts" application-mcp-server/src/ | grep -vi test
# -> parsers.ts:139  const rawExcludes = (doc.excludes ?? {})   [canonical key ONLY]
mcp__designerpunk-application__get_component_full("Nav-TabBar-Base") -> contracts.excluded: {}

# L8 — blend-assertion vacuity (MISS 4)
grep -n "0\.12" src/components/core/Button-CTA/platforms/web/ButtonCTA.web.ts          # -> no hits
grep -n "0\.12" src/components/core/Input-Text-Base/platforms/web/InputTextBase.web.ts # -> no hits
grep -cE "getBlendUtilities\s*\(\s*\)|createBlendUtilities\s*\(\s*\)|@3fn/core/blend|BlendUtilitiesResult" \
  <both files>  # -> 8 and 3  (the disjunct that makes the assertion pass vacuously)

# L9 — pass-10 check-worded sweep on the NEW checks' vocabulary (the rows-only falsification attempt)
grep -rniE "css-bundling|failLoudly|fail.loudly|disabled state styles|disabled prop \(by design\)|\
browser-distribution|InteractionStateAudit|BlendTokenUsageValidation|disabledDesaturate|observedAttributes" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/ | grep -v classification-map.md
# -> ZERO imposters; one CONTRADICTION (TBCV:321)

# L10 — entry-id constraints
python3 -c "ids=[l.strip()[4:] for l in open('governance/classification-map.md') if l.startswith('### ')]; \
new='no-disabled-states'; print(new in ids, [i for i in ids if i in new or new in i])"   # -> False []
```

**Not run, and why:** I did not mutate-and-restore any source file to bite-test the guards, per the consult's no-edit instruction. The prop-guard bite is established equivalently by the synthetic-append probe (L4-adjacent, `/disabled\s*[?:]/` against real file contents plus appended forms), which needs no write. If the steward wants mutation-grade bite evidence before the row lands, say so and I will run mutate/red/restore cycles on all six scope entries as a separate pass.

---

## What would falsify ME

- **The armed-scope correction falsifies if** any of the four new surfaces turns out to be excluded from the required lane at PR time — I verified selection and greenness locally; I did not read a CI run's actual test list. `css-bundling` is the one to check, since it alone depends on the lane's build step (`lane-timing.yml:182-183`).
- **The W4-2 upgrade falsifies if** some consumer outside `application-mcp-server/src/indexer/parsers.ts` reads the drifted keys — I swept `application-mcp-server/src/` only. If a script or generator elsewhere normalizes them, the defect is narrower than I claim (though still real for the MCP).
- **The PIG:169 REWRITE falsifies if** Peter reads the equivalence matrix as pure platform-API reference documentation rather than component-authoring instruction, in which case KEEP is defensible and the ruling is his.
- **My TBCV:305-346 KEEP falsifies if** someone shows that the standardized `reason:` string or the alternatives block IS asserted by a check I did not find — I swept component tests and the stemma suites; I did not read every validator in `src/validators/`.
- **The parity split (f) falsifies if** a record exists ruling ignore-vs-throw that I did not find — I searched the adjudication issue and the two components' tests; I did not read BVLI's originating spec (Requirement 10.2's home).

---

*Consult by Lina (Stemma), 2026-09-17. Written after independent verification; the steward's draft was read first and deliberately not deferred to.*
