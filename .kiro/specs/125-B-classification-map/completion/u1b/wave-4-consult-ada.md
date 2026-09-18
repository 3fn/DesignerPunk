# Wave 4 (Task 5.5) — Owner Consult: Ada (Rosetta token specialist)

**Date**: 2026-09-17
**Consulted on**: `wave-4-assessment.md` §1 (C11b row), §2.5 (Token-Family-Opacity finding), §4, §7 sweep S4, §11 items W4-4 / W4-6
**Method**: independent falsification. I did not take the draft's fact bases on trust; every claim below was re-derived by execution or by reading the cited bytes. No file other than this consult was created or modified.
**Branch state at consult time**: `task/125-B-5-5-wave-4`, clean but for the two untracked wave-4 artifacts.

---

## Verdicts

| # | Item | Verdict | Grade |
|---|------|---------|-------|
| **W4-6** | C11b `no-autonomous-token-creation` — "no detection mechanism exists" | **FALSIFIED.** Armed, blocking, required-lane token-creation detection EXISTS and is broad: literal name-set and cardinality locks across 12 primitive and 5 semantic token families, all selected by `lane-functional-root` (a required context). The row's `check_state: proposed` and `checks: []` are both wrong as recorded; `disposition: warn` understates (the covered scope is a barrier). | **BLOCKING** |
| **W4-6b** | C11b education KEEP | **CONFIRMED** — all five citations verified verbatim; the taught approval path is accurate and current. One strengthening fact the draft missed: the education layer is itself mechanically pinned. | advisory |
| **W4-4** | Token-Family-Opacity disabled-state content + TQR routing | **CONTRADICTION-CLASS DRIFT — rewrite required** (the Token-Family-Blend model). The draft **under-recorded** the footprint: it misses two in-body surfaces and, materially, the fact that the contradiction sits in the **MCP discovery layer** (frontmatter `description`), not only in body prose. | **advisory (not blocking the wave)** — but the repair is an owner fix PR, and I am **charter­ing it as its own issue, NOT folding it into my queued claims-vs-source pass** (reasoning in §3.4). |
| **W4-4c** | Repair vehicle | **Owner fix PR or my queue — never a wave hunk.** Agreed with the draft; the #132 sequencing precedent is correct and I am not asking for an exception. | advisory |
| **C10-adj** | "the token/blend layer's only philosophy artifact is the deprecated `blend.disabledDesaturate` (+wrappers)" | **HOLDS at source grain** (verified exhaustively) — but the draft's characterization *"deprecation, not a gate"* **understates**: the token is still **actively generated and shipped** into committed CSS output, into all three platform blend utility APIs, and into DTCG/Figma export **by default**. | advisory |
| — | Rows-only finding for C11b | **UNCHANGED** — the falsification in W4-6 is a *row-content* correction, not a prune. The wave stays rows-only on my territory. | — |

---

## 1. W4-6 — BLOCKING: token creation IS mechanically detected, in a required lane

### 1.1 What the draft claimed

> §1: *"**HOLDS** — no diff-gate, workflow, or armed suite detects token creation (swept `.github/workflows/` + root-lane suites; zero hits)."*
> §4: *"No detection mechanism exists (workflows + suites swept, §7 S4). … No armed gate → blade 1 fails structurally → no imposters possible."*
> §7 falsification clause: *"C11b falsifies if: any workflow, hook, or armed suite detects token creation."*

I am invoking that clause.

### 1.2 Why the sweep missed it — a method finding, not a slip

Sweep S4's suite-side hunt was:

```bash
grep -rniE "token.creation|new.token|createToken" .github/workflows/    # -> zero hits (no gate)
```

That is a **rule-vocabulary** grep. It searches for a check that *calls itself* a token-creation check. No such check exists — correct. But the wave's own stated discipline (§7 S3: *"the pass-10 discipline: hunt the CHECK's vocabulary, not the rule's"*) was applied to C10 and **not** to C11b. The mechanisms that actually detect token creation are named nothing of the sort: they are family-integrity assertions. The steward applied the right method one row over and the wrong method here — which is exactly how C9 (wave 3) and C10 (this wave) were also under-recorded. That makes this the **fourth consecutive under-recording of arming**, and it strengthens W4-8's roster-freshness finding rather than duplicating it: the failure is not only roster decay, it is *sweep vocabulary selection*.

### 1.3 The mechanisms (verbatim commands, verbatim citations)

**Command 1 — the lock hunt (what S4 should have run):**

```bash
grep -rnE "toEqual\(\[|toHaveLength\([0-9]+\)|Object\.keys\(.*\)\.length" \
  src/tokens/__tests__/ src/tokens/semantic/__tests__/
```

**Command 2 — required-lane selection proof (execution, not inference):**

```bash
npx jest --config jest.functional.config.js --listTests \
  | grep -E "OpacityTokens.test|BlendTokens.test|MotionTokens.test|ShadowOffsetTokens.test|TokenCategories.test|ColorTokens.test|SizingTokens.test|BlurTokens.test"
```
→ 12 files returned, including `src/tokens/__tests__/OpacityTokens.test.ts`, `src/tokens/__tests__/BlendTokens.test.ts`, `src/tokens/semantic/__tests__/OpacityTokens.test.ts`, `src/tokens/semantic/__tests__/BlendTokens.test.ts`. These run in **`lane-functional-root`**, which is a **required context** — `tools/agent-generator/verify-gate-registration.sh:65` lists `"lane-functional-root"` in `EXPECTED_CONTEXTS`.

**Command 3 — the assertions are live, not skipped:**

```bash
npx jest --config jest.functional.config.js \
  src/tokens/__tests__/OpacityTokens.test.ts src/tokens/__tests__/BlendTokens.test.ts \
  src/tokens/__tests__/ColorTokens.test.ts src/tokens/semantic/__tests__/OpacityTokens.test.ts
```
→ `Test Suites: 4 passed, 4 total · Tests: 136 passed, 136 total` (2026-09-17).

**The strongest single citation** — `src/tokens/__tests__/OpacityTokens.test.ts:56-73`:

```ts
expect(opacityTokenNames).toEqual([
  'opacity000', 'opacity008', … 'opacity100'
]);
expect(opacityTokenNames).toHaveLength(14);
```

and `:76-78`:

```ts
expect(Object.keys(opacityTokens)).toEqual(opacityTokenNames);
expect(Object.keys(opacityTokens)).toHaveLength(14);
```

This is precisely the artifact the consult brief named as decisive: *"a token-count or name-set snapshot that reds on a NEW token."* Adding `opacity112` to `src/tokens/OpacityTokens.ts` REDs `lane-functional-root` at four assertion sites without the author touching a test. The lock is a **literal** name array, not a self-referential comparison — the distinction matters and I checked it per-family (§1.4).

### 1.4 Armed scope, stated precisely (the C10 §2.3 discipline applied to my row)

**Literal NAME-SET locks** (red on creation, renaming, *and* removal):

| Family | Citation | Locked set |
|---|---|---|
| Opacity (primitive) | `src/tokens/__tests__/OpacityTokens.test.ts:56`, `:72`, `:77`, `:237`, `:302`, `:306` | 14 names |
| Blend (primitive) | `src/tokens/__tests__/BlendTokens.test.ts:57`, `:64`, `:69`, `:213`, `:291`, `:295` | 5 names |
| Motion (duration/easing/scale) | `MotionTokens.test.ts:113`, `:227`, `:348` (+ counts `:108`, `:222`, `:343`) | 3 / 4 / 6 names |
| Shadow offset X/Y | `ShadowOffsetTokens.test.ts:83`, `:90`, `:198`, `:208` (+ `:94`, `:99`) | 9 / 5 names |
| Border width (primitive) | `BorderWidthTokens.test.ts:50-51`, `:56`, `:133` | 4 names |
| Accessibility (semantic) | `src/tokens/semantic/__tests__/AccessibilityTokens.test.ts:69`, `:74`, `:94` | 3 names |

**CARDINALITY locks** (red on creation and removal; silent on rename):

| Family | Citation | Locked count |
|---|---|---|
| Color (primitive) | `ColorTokens.test.ts:241`, `:245`; `TokenCategories.test.ts:497`, `:520` | 54 tokens / 15 families |
| Sizing | `SizingTokens.test.ts:23-25` | 14 |
| Blur | `BlurTokens.test.ts:23-25` | 9 |
| Font weight | `FontWeightTokens.test.ts:221` | 9 |
| Font size | `FontSizeTokensFormulaValidation.test.ts:172` | 11 |
| Line height | `LineHeightTokensFormulaValidation.test.ts:195` | 11 |
| Radius strategic-flex | `RadiusStrategicFlexibilityValidation.test.ts:98` | 5 |
| Opacity (semantic) | `src/tokens/semantic/__tests__/OpacityTokens.test.ts:41-42`, `:130` | 4 |
| Blend (semantic) | `src/tokens/semantic/__tests__/BlendTokens.test.ts:51-52`, `:272` | 8 |
| Border width (semantic) | `src/tokens/semantic/__tests__/BorderWidthTokens.test.ts:43` | 4 |
| Icon (semantic) | `src/tokens/semantic/__tests__/IconTokens.test.ts:120`, `:184`, `:188`, `:237` | 11 / 12 |

**NOT covered — a new token here lands entirely silently** (I checked each, negative results reported):

- **Primitive spacing** — `SpacingTokensFormulaValidation.test.ts` has only `expect(mismatches).toHaveLength(0)` (`:168`), a *formula* assertion over whatever tokens exist. A new `space750` that satisfies the formula passes. **The flagship family is unguarded.**
- **Primitive radius** — `RadiusTokensFormulaValidation.test.ts`: no count or name lock.
- **Density, Breakpoint, TapArea, GlowOpacity, ShadowOpacity, Scale** — no dedicated test file found under `src/tokens/__tests__/`.
- **Font family, Letter spacing** — assertions are **self-referential** (`FontFamilyTokens.test.ts:215`, `:223`: `expect(tokenNames.sort()).toEqual(tokenKeys.sort())`; `LetterSpacingTokens.test.ts:242` same shape). These compare the names array to the object keys — a new token added to *both* passes. Reported as non-biting; the draft would have been right about these two families.
- **Semantic** color, spacing, radius, typography, motion, layering, shadow, elevation, gridSpacing, style, zIndex — no locks (exhaustive grep of `src/tokens/semantic/__tests__/`).
- **Component tokens** — no lock anywhere. `defineComponentTokens()` consumers are fixture-driven (`src/tools/integrity/__tests__/consumer-package-mode.test.ts`); nothing asserts a component-token inventory.

**Mechanisms I checked and am reporting as NON-detecting** (so the row is not over-credited):

- `src/generators/DTCGFormatGenerator.ts:259-276` `validateTokenCounts()` — **floors**, not locks: `primitiveCount < MIN_PRIMITIVE_TOKEN_COUNT` throws. Detects *removal*, never creation.
- `src/generators/__tests__/DTCGFormatGenerator.property.test.ts:187-191` — `expect(allTokens.length).toBeGreaterThanOrEqual(350)`. Same: a floor.
- `npm run audit:theme-drift` (`package.json:123`) — WOULD red on a new theme-varying semantic token (it diffs the generated skeleton against `src/tokens/themes/dark/SemanticOverrides.ts`), **but it is a manual npm script**: not in `prebuild`, not in `build` (`package.json:99-100`), not in any workflow. **Not armed.** It is, however, the single best-shaped *candidate mechanism* the row could name.
- `src/build/tokens/__tests__/ClassInvariantGuard.test.ts` — source-scan guard on `*Registry.{register|add|set|push}(` writes (Spec 118/124 module-boundary invariant). Adjacent, out of territory: a new token declared as an object-literal entry in a family file does not trip it.
- `.github/workflows/` — I re-ran the workflow sweep independently. **Confirmed zero** token-creation gates at the workflow layer. The draft is right about workflows; it is the *suite* layer it missed.
- `canonical/generated.lock` — governs the agent-prompt generation closure, not token inventory. No token coupling.

### 1.5 What I am asking the row to record

The row cannot stay as written. Proposed amendment (steward writes, I confirm — I am **not** editing `governance/classification-map.md`):

- `check_state:` **`proposed` → partially armed**, recorded with the C10 §2.3 scope discipline: name-set locks on 6 families, cardinality locks on 11, **unguarded**: primitive spacing/radius/density/breakpoint/tapArea/glowOpacity/shadowOpacity/scale, font-family, letter-spacing, 11 semantic families, **and all component tokens**.
- `checks:` `[]` → the suite set, or at minimum the lane: `lane-functional-root` (required context, `verify-gate-registration.sh:65`).
- `disposition:` **`warn` understates.** On the covered scope this is a **barrier** — a required check that blocks merge. Recommend the C10 phrasing: barrier on the armed sub-scope, `warn`/proposed on the remainder.
- History entry dated 2026-09-17 recording that the arming was **incidental** — these are family-integrity regression tests (authored per-family, at various times, for math/shape reasons), not a token-creation gate anyone designed. The C10 precedent is explicit that incidental arming still counts: the form-inputs banned-pattern scan was authored for Spec 066 cleanup, "not by a scope decision anyone recorded," and the draft counts it as armed. **The register records what mechanically bites, not what was intended.** Consistency requires the same treatment here.

**Counter-argument to my own finding, stated plainly (per AI-Collaboration-Principles).** A reasonable reader can say these locks are not a *governance* gate at all: they red equally on a sanctioned token addition, and the author clears them by editing one test literal in the same PR. So they detect *change*, not *unsanctioned creation* — a speed bump, not a barrier against the thing the rule names. I think that argument is **correct about the rule's intent and wrong about the register's job**, for two reasons: (1) the row's own `education.disposition` already concedes the split — *"a check may detect that a token appeared; it never verifies that its creation was sanctioned"* — and "detect that a token appeared" is **exactly** what these locks do, so the row's own framing predicts this mechanism; (2) forcing the addition to surface as a **test-literal diff** is not nothing — it converts a silent one-line token addition into a reviewable, named diff hunk on the PR. That is the mechanical property the register exists to track. But the argument does bear on *disposition wording*, and I would not fight a steward who prefers "barrier-by-incident, not by design" phrasing over a flat `barrier`.

**Second counter-argument, against myself in the other direction.** I have NOT performed a mutation bite-proof (add a token, watch the lane red, revert) — the consult brief restricted me to writing this document. The bite is *entailed by reading* (`toEqual([...14 literal names...])` cannot pass with 15 keys), which I hold to be sufficient, but it is inference from source, not execution. The one-command proof, for whoever wants it belt-and-braces:

```bash
# add a 15th entry to opacityTokens in src/tokens/OpacityTokens.ts, then:
npx jest --config jest.functional.config.js src/tokens/__tests__/OpacityTokens.test.ts   # expect RED at :56, :72, :77, :302, :306
git checkout src/tokens/OpacityTokens.ts
```

### 1.6 Consequence for the wave's rows-only finding

**None — rows-only holds on my territory.** This falsification changes what the C11b row *says*; it produces no prune, no hunk, and no education cut. The "no armed gate → blade 1 fails structurally → no imposters possible" reasoning in §4 does now fail structurally (there IS an armed gate), so I re-ran the imposter question myself against the newly-armed scope: none of the five education citations restates *"the opacity family has exactly these 14 names"* or any other locked inventory. They teach the **approval path** and **tier selection** — categorically what the locks cannot supply. **Blade 1 fails on the merits rather than by construction.** Same destination, honest route.

---

## 2. W4-6b — advisory: education KEEP CONFIRMED, with one addition

All five citations re-read verbatim this pass. The taught approval path is **accurate and current** as of today's governance:

- `.kiro/steering/core-goals.md:55-59` — the four-tier autonomy ladder, verbatim: semantic *"Use freely (verify semantic correctness)"* / primitive *"Requires prior context (spec docs) or human acknowledgment"* / component *"Requires explicit human approval before use"* / **"Creating ANY token: Always requires human review — no autonomous token creation."** Correct against `Token-Governance.md`'s own text. ✅
- `governance/Token-Governance.md:180-186` — *"Creating ANY token (semantic, primitive, or component) requires human review … AI agents should never autonomously create tokens,"* followed by the creation-checkpoint format and the creation decision matrix. This is the canonical statement; it is what my ambient embed asserts. ✅
- `governance/Rosetta-System-Architecture.md:512` — *"**Token Creation Governance**: Creating component tokens requires human approval,"* routing to the governance doc. Correctly scoped to component tokens in a component-token-loader context. ✅
- `governance/Figma-Workflow-Guide.md:446` — *"**Request new token** — If a new token is needed, create it through the spec process (token creation requires human approval per Token Governance)."* Correct, and valuable precisely because Figma round-tripping is the highest-pressure place an agent would be tempted to mint vocabulary. ✅
- `canonical/agents/ada.md:11` (description: *"Token creation always requires Peter's review"*) and `:14-27` (the `governanceAsLaw` embed). ✅

**The addition the draft missed — it strengthens the KEEP.** The C11b education layer is not merely prose: it is **mechanically pinned**. `canonical/agents/ada.md:19-27` declares an assert with `claim: creation-requires-human-review`, `section: "Token Creation Governance"`, `mustContain: ["Creating ANY token (semantic, primitive, or component) requires human review"]`. If that sentence is edited out of `Token-Governance.md`, the generator's claim assertion fails — and the agent-generator gates (`122-canonical-vs-truth` et al.) are required contexts. So this row has an **armed guard on its education layer** while its verification layer was recorded as having none. That inversion is worth a sentence on the row: it is the cleanest example in the register of education-as-the-load-bearing-layer, mechanically protected as such.

---

## 3. W4-4 — Token-Family-Opacity: CONTRADICTION-CLASS DRIFT, rewrite required

### 3.1 The ruling that governs

`.kiro/issues/button-cta-disabled-state-adjudication.md` (Peter, 2026-07-15, **RESOLVED — removal implemented**): *"**Remove** — align Button-CTA with the no-disabled-states philosophy. `state_loading` covers in-flight async actions; validate-on-press covers form-invalid; hide covers unavailable actions. **The philosophy now holds corpus-wide with zero exceptions.**"* Its "Changes" list records that buttons *"no longer render `disabled`/`aria-disabled` attributes."* Its Follow-up 1 routes the token-layer deprecation to me explicitly.

### 3.2 The footprint — the draft UNDER-recorded it

Draft cites `Token-Family-Opacity.md:5, :47, :135, :369-460, :546`. My sweep:

```bash
grep -niE "disabled" governance/Token-Family-Opacity.md
```

returns **14 hits**, including two the draft omits and one whose significance the draft undersells:

| Line | Content | Draft |
|---|---|---|
| `:5` | **frontmatter `description`**: *"Load when working with transparency effects, **disabled states**, overlays…"* | cited — but see §3.3, this is the material one |
| `:47` | primitive table, `opacity048` Use Case: *"Disabled state, very strong overlay"* | cited |
| `:135` | `opacity.heavy` Use Cases: *"Disabled state overlays"* | cited |
| **`:253`** | CSS platform example: **`.disabled-overlay { opacity: var(--opacity-048); }`** — a copy-pasteable web implementation of a disabled treatment | **MISSED** |
| `:369-382` | `### Disabled States` section — `<Button disabled opacity="opacity048">`, `<ContentArea disabled …>` | cited |
| `:451-468` | `### Disabled State Accessibility` + the **`// ✅ CORRECT: Opacity + ARIA for disabled state`** worked example emitting `disabled` **and** `aria-disabled="true"` | cited |
| **`:510`** | *"Use semantic opacity tokens for: Standard transparency patterns (overlays, **disabled states**, ghost effects)"* — in the **"When to Use Semantic Tokens"** selection guidance | **MISSED** |
| `:546-548` | decision tree step 5: *"**Disabled state?** → Use `opacity048` (primitive) → 48% opacity is standard for disabled elements"* | cited |

The `:460` worked example is the sharpest edge and the draft characterizes it correctly: `aria-disabled` is one of the five `DISABLED_EXCLUSION_GUARD_PATTERNS` that RED the armed guard on the 4 Input-Text components. A doc marked **✅ CORRECT** instructs a pattern that a required check treats as a defect. That is not stylistic drift; that is the corpus contradicting itself in the imperative mood.

### 3.3 The part that changes the weight: this is in the DISCOVERY layer

`:5` is not body prose. It is the **MCP frontmatter `description`** — the text `find_docs` ranks and returns. An agent who searches the corpus for *"disabled states"* is **routed to this document by the index itself**, arrives at `:369` and `:460`, and is taught a banned pattern as the ✅ answer. `governance/Token-Quick-Reference.md:44` and `:289` compound it at the routing layer:

- `:44` — table row: *"Opacity | Transparency values for overlays, **disabled states**, hover effects"*
- `:289` — under **### Interactive States**: *"**Opacity**: `Token-Family-Opacity.md` → **disabled states**, hover effects"*

So the retrieval path is: *"how do I handle a disabled state"* → TQR's Interactive States routing → Opacity doc → ✅ `aria-disabled`. Three surfaces, one funnel, ending at a guard-RED. The draft scored this MEDIUM-HIGH; on the discovery-layer fact I'd hold it at **HIGH** — but it is still **not blocking for this wave**, because the repair does not belong in the wave (§3.5).

### 3.4 Ruling: rewrite on the Token-Family-Blend model — as its OWN chartered issue, NOT folded into my claims-vs-source pass

**(a) Classification: contradiction-class drift needing rewrite.** Not KEEP. The blade-2 defense that saved TBCV:305 and the family-doc KEEPs does not apply: this content does not teach an alternative the check cannot supply, and it is not illustrative-use or fence-fact. It teaches an outcome the corpus ruled out, in a doc the index routes people to, with a ✅ on a pattern a required check REDs. There is no reading on which it earns its place.

**The model is already in my own corpus** — `governance/Token-Family-Blend.md:31` shows exactly what reconciliation looks like:

> *"**Deprecation note (2026-07-15)**: `blend.disabledDesaturate` and the `disabledColor()`/`disabledBlend()` convenience wrappers are **DEPRECATED**. DesignerPunk does not support disabled states (Button-CTA disabled-state adjudication, ruled REMOVE — the philosophy holds corpus-wide): if an action is unavailable, do not render the component…"*

plus `:72` (table cell marked DEPRECATED), `:111`, `:171-172`, `:218` (per-platform deprecation comments), and `:431-435` (**"❌ Don't style disabled states"** with the WRONG-example inversion). Blend was reconciled on the same day as the ruling; Opacity was not touched. That asymmetry is the whole finding — and it is **my** asymmetry to fix. Blend was reconciled because the ruling's Follow-up 1 routed the *token deprecation* to me by name; nobody swept the sibling family doc that had no token to deprecate. A doc-level miss, not a source-level one.

**(b) Vehicle: charter its own issue. Do NOT fold into the queued Token-Family claims-vs-source pass.** My reasoning, and I want the counter on record:

- These are **different investigation classes**. The claims-vs-source pass asks *"do this doc's stated values/formulas match `src/tokens/**`?"* — a mechanical reconciliation against source bytes. This asks *"does this doc teach something the corpus ruled out?"* — a philosophy reconciliation against a ruling. Different evidence, different blade, different reviewer question. Folding them produces a PR that mixes value-drift corrections with philosophy rewrites and is worse to review than either alone.
- The claims-vs-source pass is **queued post-campaign and unscheduled**; this repair is **bounded** (one doc + two TQR lines, with a proven template 30 lines away in a sibling file) and should not wait behind an open-ended pass.
- The chartered-issue route is the one the repo's own tracking ruling favors for bounded work with a settled design (memory: *issue-driven over spec for bounded work*). The design here IS settled — Token-Family-Blend is the spec.

**Counter-argument I owe:** folding is cheaper. One pass over Token-Family docs, one PR, one review, and the Opacity doc is going to be opened by that pass anyway — so chartering a separate issue guarantees the file is edited twice and risks a merge conflict between the two efforts. I judge that real but acceptable: I will cross-reference the charter FROM the claims-vs-source pass so it does not re-litigate, and the two edits touch disjoint content (values/formulas vs. disabled-state prose). If Peter prefers one PR over two, that is a defensible call and I will fold without argument — the classification (rewrite, not KEEP) is the part I hold firmly; the vehicle is a scheduling preference.

**(c) Scope of the chartered repair** (so the charter carries its own trigger and the health-check walk can read it):

1. `Token-Family-Opacity.md:5` — strike *"disabled states"* from the frontmatter `description` (**do this first**; it is the discovery-layer fix and the cheapest high-value line in the set).
2. `:369-382` — replace the `### Disabled States` section with the Blend-model inversion: a `❌ Don't style disabled states` block naming the ruling, its date, and the three alternatives (`state_loading` / validate-on-press / don't render).
3. `:451-468` — **delete** the `### Disabled State Accessibility` subsection outright, including the `✅ CORRECT` `aria-disabled` example. Do not soften it; a ✅ on a guard-RED pattern cannot be rehabilitated by a caveat.
4. `:47`, `:135`, `:510`, `:546-548` — re-word the four use-case/selection references. `opacity048` and `opacity.heavy` keep their legitimate uses (modal scrim, strong dimming, content de-emphasis); only the disabled framing goes. **The tokens themselves are NOT deprecated** — nothing about this repair touches `src/tokens/OpacityTokens.ts` or the semantic opacity set.
5. `:253` — rename the `.disabled-overlay` CSS example (e.g. `.scrim-overlay`).
6. `Token-Quick-Reference.md:44`, `:289` — drop the disabled-state routing. **Adjacent defect noticed, flagged not folded**: TQR's path column points at `.kiro/steering/Token-Family-*.md` for every family, but these docs live in `governance/` (`ls .kiro/steering/ | grep Token-Family` → empty; `governance/Token-Family-Opacity.md` exists). That is a doc-wide path-staleness class affecting ~14 rows, not a disabled-state issue — route to Thurgood as an infrastructure-health item, or let it ride the claims-vs-source pass.

**(d) Sequencing: agreed, and I am not asking for an exception.** The repair rides an **owner fix PR** (the wave-2 #132 precedent) or my queue. **Never a wave hunk.** The wave stays rows-only.

### 3.5 Why this is advisory and not BLOCKING for the wave

The drift is real and I have ruled it a rewrite — but nothing about it blocks the wave-4 rows from landing. The wave records register state; the repair changes governance prose on an owner fix PR. Conflating them is the exact failure mode the rows-only discipline exists to prevent. I am marking it **advisory / HIGH priority on my queue**, not blocking.

---

## 4. C10-adjacent falsification: is anything in the token layer still ACTIVELY serving disabled-state semantics?

**Draft claim** (§2.3, last table row): *"Token/blend layer: `blend.disabledDesaturate` + wrappers DEPRECATED 2026-07-15 (Token-Family-Blend:31), removal at next major — deprecation, not a gate."*

**Verdict: the inventory HOLDS; the characterization UNDERSTATES.**

**Inventory — exhaustive, and it does come back clean:**

```bash
grep -rniE "disabled" src/tokens/ | grep -v "__tests__"
grep -rniE "disabled" src/generators/ | grep -v "__tests__"
grep -rlniE "disabledColor|disabledBlend|disabledDesaturate" src/ | grep -v "__tests__"
```

Hits in token source are **confined to `src/tokens/semantic/BlendTokens.ts`** (`:12`, `:19`, `:124-142`, `:222-225`) plus one unrelated WCAG 2.3.3 prose line in `src/tokens/semantic/AccessibilityTokens.README.md:607`. **No opacity token, no color token, no semantic token outside blend carries disabled-state semantics.** Notably `src/tokens/OpacityTokens.ts` is clean — the disabled framing lives *only* in the family doc, which is precisely why §3 is a doc repair and not a token deprecation. Confirmed: the draft's "only philosophy artifact" claim is **correct at source grain**.

**But "deprecation, not a gate" undersells what is still shipping.** The deprecated token is not dormant; it is generated into live consumer surfaces on every build:

1. **Committed, build-wired CSS output** — `docs/tokens.css:805`: `--blend-disabled-desaturate: var(--blend-300);`. The file is git-tracked (`git ls-files --error-unmatch docs/tokens.css` → tracked) and PR #163 wired its regeneration into the build. A web consumer reading the shipped stylesheet finds a live custom property for a state the system does not support.
2. **All three platform blend utilities export the wrapper** — `src/blend/ThemeAwareBlendUtilities.web.ts:100` (`disabledColor: (baseColor: string) => string;`) and `:253` (`desaturate(baseColor, BlendTokenValues.disabledDesaturate)`), mirrored in `.ios.swift` and `.android.kt`. Live public API.
3. **DTCG / Figma export includes it BY DEFAULT** — `src/generators/DTCGGeneratorConfig.ts:41` sets `includeDeprecated: true` as the default; the strip path (`DTCGFormatGenerator.ts:175-177`) only runs when a consumer opts out. So `blend.disabledDesaturate` lands in the design-tool export unless someone explicitly asks for it not to. Its `$extensions.designerpunk.deprecated` metadata is correctly emitted (`:730-735`), which is the right mitigation — but the default is *include*.

**One genuinely clean surface, credited:** `src/validators/StemmaTokenUsageValidator.ts:297-301` removed `blend.disabledDesaturate` from its suggestion set, with the comment *"removed 2026-07-15: deprecated (no-disabled-states philosophy) — the validator must not suggest it for new component work."* That is the correct handling and it is already done.

**What I'd have the row (or C10's scope table) say instead:** *"Token/blend layer: `blend.disabledDesaturate` + the three platform wrappers are DEPRECATED (2026-07-15) but still EMITTED — committed CSS (`docs/tokens.css:805`), three platform utility APIs, and DTCG/Figma export (default `includeDeprecated: true`). Removal at next major (`@3fn/core` breaking change, adjudication Follow-up 4). Deprecation metadata is correctly attached; the validator no longer suggests it."* The distinction matters for C10's coverage picture: a consumer can still *consume* disabled-state styling from shipped DesignerPunk output today. That is the widest remaining philosophy hole in the token layer, and it closes at the next major — not by a gate.

**No new work requested.** Removal timing is a major-version decision (Peter's), the deprecation is correct, and I am not proposing to accelerate it. This is a **recording accuracy** correction to C10's scope table.

---

## 5. Summary of asks

| Ask | Owner | Nature |
|---|---|---|
| Amend the `no-autonomous-token-creation` row: `check_state` partially-armed with scope, `checks` populated (`lane-functional-root`), disposition corrected from `warn` on the covered scope, dated history entry noting incidental arming | Thurgood writes / Ada confirms / Peter ratifies | **BLOCKING** on the row landing as drafted |
| Record on the row that its education layer is itself mechanically pinned (`canonical/agents/ada.md:19-27` assert → generator gates) | Thurgood | advisory, strengthens KEEP |
| Correct C10's §2.3 token/blend row: deprecated **and still emitted** to CSS / 3 platform APIs / DTCG-by-default | Thurgood | advisory |
| Charter the Token-Family-Opacity philosophy reconciliation as its own issue (scope in §3.4c), cross-referenced from Ada's queued claims-vs-source pass | **Ada** (mine) | advisory, HIGH on my queue |
| TQR path-staleness (`.kiro/steering/Token-Family-*.md` → `governance/`), ~14 rows | Thurgood (infra health) or the claims-vs-source pass | observation |
| Sweep-vocabulary method finding for 5.6: S4 hunted the RULE's vocabulary where §7's own S3 discipline requires hunting the CHECK's — feeds W4-8 as a *sweep-design* finding distinct from roster decay | Thurgood → 5.6 | observation |

**Rows-only holds on my territory.** Nothing here produces a hunk.

---

*Consult by Ada, 2026-09-17. Every command in this document is reproducible verbatim from the repo root. Where I could not execute a proof under the no-edit constraint (the C11b mutation bite-proof, §1.5), I said so and supplied the recipe rather than asserting the result.*
