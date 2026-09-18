# Wave 4 (Task 5.5) — Assessment: Register Maintenance (C10 + C11), Candidate Diff, Trial Rubric

**Date**: 2026-09-17
**Wave**: 4 of 4 (register maintenance) — executes tasks.md 5.W verbatim; fill slots per 5.5
**Items**: **C10** philosophy-conformance candidate row (U2's logged candidate — becomes register entry `no-disabled-states`) + **C11** `proposed`-row state work on three existing rows: `record-first-ratification` (barrier scope), `no-autonomous-token-creation`, `inverse-drift-incremental-build` (WATCH confirmation)
**Step**: 5.W(a) — classification + candidate prune diff. NOTHING in this document is a prune; the diff is a CANDIDATE, consumed unchanged by (b) and applied only as ratified in (c).
**Status**: PRE-CONSULT DRAFT, 2026-09-17. Consults dispatched to Lina (C10 central — component surfaces + the new row's owner question), Ada (C11b + token-doc drift findings in C10 territory), Stacy (C11a process layer + rows-only campaign-law compliance + the wave-3/4 bookkeeping repair).
**Finding (provisional)**: **ROWS-ONLY on all four items.** `wave-4-candidate-diff.patch` is a declared no-op. But the roster's C10 line ("none armed — candidate row") is **WRONG in the same direction wave 3 caught for C9**: armed, blocking, in-lane checks already exist in C10's exact territory on 5 of 34 components. This is the **third consecutive wave** in which the roster under-recorded arming — 5.6 should treat that as a pattern finding about roster freshness, not three coincidences.

> **Disclosed process inversion (the wave-2 lesson, stated up front)**: this assessment and the draft row were written BEFORE the owner consults. Wave 2's identical pre-consult ROWS-ONLY verdict was falsified by Lina's consult; wave 3's verdict held but two of three fact bases fell. §7 makes falsification cheap: every sweep is reproducible verbatim and every finding carries an explicit "what would falsify this" clause.

---

## 1. Gate/state verification (verified live this pass, by execution where a check is claimed)

| Item | Roster/row said | Verified reality (this pass) |
|------|-----------------|------------------------------|
| **C10** | "none armed (candidate row)" | **WRONG.** THREE armed, blocking check surfaces exist: (i) `form-inputs-contracts.test.ts` `describe('disabled_state exclusion')` — contracts must contain `state_disabled` + `excludes`, AND a 5-pattern raw-source banned-pattern scan (`isDisabled`, `disabledBlend`, `aria-disabled`, `cursor:\s*not-allowed`, `\.disabled\(`) over ALL THREE platform implementations of the 4 Input-Text components; (ii) `cross-platform-consistency.test.ts` `'all form input components should exclude disabled state per design philosophy'` — same 4 components; (iii) `ButtonCTA.test.ts` `describe('No Disabled State (philosophy exclusion)')` — 3 assertions incl. a contracts-section SPLIT check (`state_disabled` absent above `^excludes:`, present below) and runtime disabled-attribute immunity. **All selected by `jest --config jest.functional.config.js --listTests` (run 2026-09-17)** → `lane-functional-root`, a required check. |
| **C11a** `record-first-ratification` | barrier scope `proposed` (U3 delivers) | **HOLDS `proposed`** — U3 has not run (tasks.md Task 6 still a gated placeholder). **Fact-refresh needed**: `.github/CODEOWNERS` now EXISTS (Spec 118 Task 9.1) but is scope-disjoint (package.json/package-lock.json tsx-pin review only) and self-documents as advisory until Peter enables required code-owner review. Without the refresh, a future reader greps for CODEOWNERS, finds it, and mis-concludes U3 arrived. The ungated record-check layer is demonstrably operative: the 127 outline-settle ballot executed record-first 2026-09-17 (#166). |
| **C11b** `no-autonomous-token-creation` | warn / `proposed` | **HOLDS** — no diff-gate, workflow, or armed suite detects token creation (swept `.github/workflows/` + root-lane suites; zero hits). U3 diff-gate territory unchanged. |
| **C11c** `inverse-drift-incremental-build` | WATCH (`proposed`, disposition none) | **HOLDS** — no incremental-path integrity check exists anywhere; `lane-functional-root` still builds from a clean checkout per run (the masking property stands by CI construction). Adjacent, noted not folded: PR #163 wired `docs/tokens.css` regeneration into the build — stale-artifact class, not an incremental-path check. |

---

## 2. C10 — no-disabled-states (the philosophy-conformance row)

### 2.1 Provenance and what changed since the candidate was logged

U2 logged the candidate (task-4-parent-completion.md item 3) as *"red on **presence** of a disabled-state declaration outside an allowlist — Peter's instinct."* Two facts have since moved:

1. **The allowlist is now EMPTY.** The Button-CTA adjudication RULED REMOVE (Peter, 2026-07-15, `.kiro/issues/button-cta-disabled-state-adjudication.md`; removal implemented). Zero live `state_disabled` contracts exist corpus-wide — verified mechanically this pass (§7 sweep S1): every one of the 21 `state_disabled` keys in `src/components/core/*/contracts.yaml` sits under an exclusion section, none under `contracts:`.
2. **Partial arming already happened** — the three check surfaces in §1, plus authored education (CDG § "No Disabled States", Component-Templates § "No Disabled States — Standardized Exclusion", Test-Behavioral-Contract-Validation § "Disabled State Exclusion Guard Validation", family docs). The rule went from "Peter's instinct" to a ruled, taught, partially-guarded corpus invariant while the roster line stood still.

### 2.2 Boundary call (offered for consult falsification)

**Draft: `functional`** — whether `state_disabled` appears under `contracts:` vs an exclusion section, and whether a banned disabled-semantics pattern appears in an implementation file, are mechanical properties of the artifact bytes (the C9 pattern: "a color literal is a DEFECT in a component implementation"). The **design conviction** — WHY DesignerPunk has no disabled states — is philosophy, and it stays education's job; the check detects presence, never adjudicates whether a disabled state would have been "right." This is how the row survives the settled reframe ("CI validates functional/operational requirements, never ideology"): what arms is the ruled corpus invariant (2026-07-15, zero exceptions), not the ideology. *Counter-reading, recorded*: one could class it `operational` (a ruled workflow/design-law invariant rather than an artifact-defect property). The scoring consequences are identical; the class question is whether "forbidden by ruled law" is a property of the artifact or of the process. Consults may overturn.

### 2.3 The armed scope, stated precisely (the part that matters — the C9 lesson)

| Surface | State |
|---|---|
| **Input-Text-Base / -Email / -Password / -PhoneNumber** (4 of 34): contracts.yaml exclusion presence + 3-platform implementation banned-pattern scan | **BARRIER, armed** (two suites, §1) |
| **Button-CTA**: contracts section-split + web runtime disabled-attribute immunity | **BARRIER, armed** (own test block — the reintroduction guard on the one component that ever violated the philosophy; its section-split assertion is structurally STRONGER than the form-inputs `includes()` check) |
| **Remaining 29 components** — incl. Input-Checkbox/Radio (form inputs by family, NOT in `FORM_INPUT_COMPONENTS`), all Chips, other Buttons, Nav, Progress; 16+ carry excludes blocks | **none.** A new live `state_disabled` contract here would be SELECTED by `wcag-required-refs` and forced to carry a valid WCAG ref — but PASSES with one; that is a format check, not a philosophy check. |
| Token/blend layer | `blend.disabledDesaturate` + wrappers DEPRECATED 2026-07-15 (Token-Family-Blend:31), removal at next major — deprecation, not a gate. |

Coverage: ~15% of components; the two guarded families were guarded for historical reasons (Spec 066 form-input cleanup; the Button-CTA removal) — **not by a scope decision anyone recorded**. Every other component relies on education plus the excludes block already present in its contracts.yaml.

### 2.4 Defect found by the zero-live sweep: exclusion-key vocabulary drift (routed, not folded)

The corpus spells the exclusion section THREE ways: `excludes:` (canonical — taught at CDG:507, Component-Templates:773, asserted by both armed checks), **`excluded:`** (Nav-Header-App/-Base/-Page, Progress-Bar-Base), **`exclusions:`** (Nav-TabBar-Base). Neither drifted spelling contains the literal `'excludes'` the form-inputs check matches, and the Button-CTA guard's `^excludes:` split-regex assumes the canonical spelling too. No red today (the 5 drifted files are unguarded components) — but (a) a form input adopting a drifted spelling false-REDs while philosophically compliant, and (b) any future corpus-wide guard inherits three vocabularies or normalizes first. **Routed to Lina as a defect charter** (candidate: normalize the 5 files to `excludes:`); recorded on the row's scope rationale.

### 2.5 Education layer — scored KEEP set (draft; consults falsify)

The two-blade test can bite only where an armed gate owns the what — the 5 guarded components. Every education surface found (sweep S2, 60 hits) addresses the corpus-wide philosophy, wider than the armed scope, so imposters are near-impossible by construction; the checklist-shaped candidates are scored individually:

| Clause | Scoring |
|---|---|
| `Component-Development-Guide.md:501-512` — "MUST NOT declare a disabled-state contract" + the standardized block + the three alternatives | **KEEP.** The loudest imperative — and it teaches the ALTERNATIVES (state_loading / validate-on-press / don't render), which no presence check can supply. Addresses all 34 components; the gate covers 5. |
| `Component-Templates.md:751-781, :1083` — the standardized exclusion reference implementation | **KEEP.** This is how coverage gets CREATED for new components (the TDS:1482 "For New Components" precedent from wave 3 exactly). |
| `Test-Behavioral-Contract-Validation.md:305-346` — "Disabled State Exclusion Guard Validation" incl. checklist `:316-317` and the mirror-reference to the ButtonCTA test block | **KEEP — the closest thing to an imposter candidate in this wave, scored deliberately.** Blade 1: for the Button-CTA span it does restate an armed check's what (`:346` names the mirror explicitly). Blade 2 decides it: this is test-AUTHORING documentation — its checklist is the recipe by which the NEXT component gets its guard block written (no gate exists for 29 components until someone writes one, and this is the only document that teaches how). Cutting it removes the coverage-creation mechanism to save a restatement. Same verdict shape as wave 3's TDS:1482. |
| `Component-Inheritance-Structures.md:90, :155, :624`; `Component-Family-Navigation.md:35, :117, :146`; `Component-Family-Form-Inputs.md:118`; `Component-Family-Chip.md:39`; `Component-Family-Button.md:34` | **KEEP.** Family-level exclusion statements; none of these families' components are guarded (except the 4 Input-Texts), so blade 1 fails. |
| `stemma-system-principles.md:164, :558, :580, :714` | **KEEP.** Illustrative code comments inside schema/scaffold examples (blade-2 illustrative-use sub-rule). |
| `Contract-System-Reference.md:106, :162` | **KEEP.** Concept-catalog/table data — `state_disabled` must remain a NAMED concept for the exclusion to be expressible. |
| `Component-Development-Standards.md:322-324` | **KEEP.** Fenced schema-comment (fence-fact class, wave-2/3 precedent). |
| `platform-implementation-guidelines.md:169` — a11y-mapping table row: "Disabled state → `aria-disabled="true"` / `.disabled()` / `enabled = false`" | **CONTRADICTION CANDIDATE → routed to owner, NOT cut here.** It teaches, per platform, the exact literals the armed guard REDs on Input-Text (two of the three ARE `DISABLED_EXCLUSION_GUARD_PATTERNS`). In a corpus whose components may not have disabled states, a mapping row for how to implement them aims authors at forbidden territory (wave-2 CSR:183 class). But it sits in a GENERAL a11y-mapping table that may be legitimate platform reference. **Lina adjudicates**; if she rules rewrite, that repair rides an owner fix PR (the #132 precedent), keeping this wave rows-only. |
| `Token-Family-Opacity.md:5, :47, :135, :369-460, :546` — a full "Disabled States" section with "✅ CORRECT: Opacity + ARIA for disabled state" worked example; `Token-Quick-Reference.md:44, :289` | **CONTRADICTION CANDIDATE → routed to Ada, NOT cut here.** Authored pre-philosophy and never reconciled: the ✅ example's `aria-disabled` is a banned pattern on guarded components, and the doc teaches a styling use case ruled out corpus-wide 2026-07-15. Same routing rationale as above. |
| `Token-Family-Blend.md:31, :72, :171, :431-433` | **KEEP.** Already reconciled — teaches the DEPRECATION and the why. The model the Opacity doc should follow. |
| `Process-Task-Type-Definitions.md:433` | **KEEP.** Historical precedent citation (Spec 066 phased approach), not disabled-state instruction. |

**Education-absence observation (recorded, not actioned — the wave-3 O-3 pattern)**: the philosophy lives entirely in `governance/**` (Layer 2/3). Zero hits in `.kiro/steering/` or `canonical/agents/` — the always-loaded layer never mentions it, including Lina's own canonical prompt. A scaffolding agent meets the rule only if it opens CDG or Component-Templates. Friction-class cost (the excludes block is also taught by 29 existing examples in the corpus); authoring is outside a wave's mandate.

### 2.6 Rows-only is ENTAILED for C10 (two independent reasons)

1. The armed checks' whats are restated nowhere at source grain except the TBCV test-authoring doc (scored KEEP on blade 2, §2.5) — zero imposters.
2. The roster committed C10 as row-definition work, "not prose pruning" (`campaign-plan.md:28`).

---

## 3. C11a — record-first-ratification (state confirmation + fact refresh)

**Confirmed `proposed` on the barrier scope** — U3 has not run. The refresh that must land with the confirmation (§1 row 2): the Spec-118 CODEOWNERS exists, is scope-disjoint, and self-documents as advisory; recording its existence on the row is what prevents the "CODEOWNERS exists → U3 arrived" misread. The ungated record-check scope stays `armed` (procedural): operative evidence within days — the 127 settle ballot (#166), and this wave itself will ratify rows record-first at merge. Education KEEP unchanged (TCP:93/:126 verified verbatim this pass). **No imposter is possible on the barrier scope by construction** (blade 1 requires an armed gate; the gate is `proposed`).

## 4. C11b — no-autonomous-token-creation (state confirmation)

**Confirmed warn/`proposed`.** No detection mechanism exists (workflows + suites swept, §7 S4). Education re-verified KEEP: `core-goals.md:59`, `Token-Governance.md:184` (+ its §§ creation-guides framing "after human approval"), `Rosetta-System-Architecture.md:512`, `Figma-Workflow-Guide.md:446` ("create it through the spec process"), `canonical/agents/ada.md:11, :28` → all generated prompts. No armed gate → blade 1 fails structurally → no imposters possible; the sweep ran anyway (S4) and found only the teaching layer. The row's clean split holds: a future diff-gate could detect that a token APPEARED; whether its creation was sanctioned, mathematically fit, and semantically right stays education's job.

## 5. C11c — inverse-drift-incremental-build (WATCH confirmation)

**Confirmed WATCH (`proposed`, disposition none).** The hazard is structural: CI rebuilds from clean checkouts, so incremental-path breakage and stale-artifact dependencies stay invisible to every armed lane — nothing changed. No incremental-path check exists (S5). The corpus remains silent at rule grain (one incidental watch-mode dependency note, `Process-Spec-Planning.md:2146` — not this rule; KEEP, out of territory). Adjacent development noted, not folded: #163 wired `docs/tokens.css` regeneration into the build (stale-artifact class — shrinks one practical consequence surface; not an incremental-path integrity check; the candidate mechanism remains undesigned).

## 6. Register-integrity item (out-of-roster row, surfaced by C10's fact work — routed through the owner consult)

`wcag-required-refs` (Lina's row) still records: *"state_disabled is EXCLUDED from the per-literal floor **pending the Button-CTA disabled-state adjudication** … currently 1 live, Button-CTA."* The adjudication RULED 2026-07-15; live count is ZERO. The matcher is unchanged and correct (state_disabled stays in the allowlist — a reintroduced contract would be selected and forced to carry a valid ref); only the row's recorded rationale is stale, plus the companion comment at `behavioral-contract-validation.test.ts:394-396`. **Proposed disposition**: dated fact-refresh history entry on the row (steward writes, owner confirms via consult); the test-comment repair is Lina's, at her convenience (comment-only, no behavior change).

---

## 7. Sweep record — reproducible verbatim

Corpus at source grain, counts as-enumerated 2026-09-17: `.kiro/steering/*.md` = 9; `governance/*.md` = 83; `canonical/agents/*.md` = 9; `canonical/shared/*.yaml` = 4. All greps exclude `classification-map.md` (self-match). Verification commands additionally touched `src/` and `.github/` — those are GATE verifications, not education sweeps.

```bash
# S1 — C10 zero-live-contracts proof (mechanical, per-file section tracking)
for f in src/components/core/*/contracts.yaml; do
  awk -v file="$f" '/^[a-zA-Z_]+:/{section=$1} /^  state_disabled:/{if(section!="excludes:")print file": UNDER "section}' "$f";
done
# -> 5 hits, ALL under `excluded:`/`exclusions:` sections (the §2.4 vocabulary drift); ZERO under contracts:

# S2 — C10 rule-worded (60 hits, all scored in §2.5)
grep -rniE "disabled state|state_disabled|no-disabled|disabled-state" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/ | grep -v classification-map.md

# S3 — C10 check-worded (the pass-10 discipline: hunt the CHECK's vocabulary, not the rule's)
grep -rniE "form-inputs-contracts|cross-platform-consistency|DISABLED_EXCLUSION|exclusion guard" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/ | grep -v classification-map.md
# -> 6 hits: TBCV:305 (scored §2.5), CDS:1116 + TDS:1511-1512 + TDS:1873 + PIG:507 (routing/command
#    references to the suites — the wave-3 pass-10b KEEP class)

# S4 — C11b rule-worded + gate hunt
grep -rniE "autonomous token|token creation.*(requires|review|approval)|creating (ANY )?token" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/ | grep -v classification-map.md
grep -rniE "token.creation|new.token|createToken" .github/workflows/    # -> zero hits (no gate)

# S5 — C11c rule-worded + check hunt
grep -rniE "incremental.build|inverse.drift|clean.state.*rebuild|rebuilds from" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/ | grep -v classification-map.md
# -> 1 incidental hit (Process-Spec-Planning:2146, watch-mode dependency note — not the rule)

# S6 — C11a check-worded (does anything claim the U3 layer exists?)
grep -rniE "CODEOWNERS|code.owner" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/ | grep -v classification-map.md
# -> TCP:93 + TCP:126 only, both correctly FUTURE-tensed ("arrives with 125-B's CODEOWNERS layer")

# Gate verifications (execution, not inference)
npx jest --config jest.functional.config.js --listTests | grep -E "form-inputs-contracts|cross-platform-consistency|ButtonCTA.test"
# -> all three selected -> lane-functional-root (required)
```

### What would falsify each finding

- **C10 rows-only falsifies if**: any source-grain clause restates one of the three armed checks' whats for a surface the check guards, and supplies nothing the check cannot (my TBCV:305-346 KEEP is the scoring a consult would most plausibly overturn — a single blade-2 counter-argument ends it). Also falsifies if Lina finds a fourth armed surface I missed (my claim "5 of 34 components guarded" is strong and checkable).
- **C11a falsifies if**: required code-owner review is actually ENABLED in branch protection (I cannot read Settings; the CODEOWNERS file's own advisory note and the absence of any enabling record are my evidence — Peter can falsify in one sentence).
- **C11b falsifies if**: any workflow, hook, or armed suite detects token creation (S4 found none; Ada owns surfaces I may weight differently).
- **C11c falsifies if**: an incremental-path check exists anywhere, or a lane stopped clean-building.

---

## 8. Candidate prune diff — a declared no-op

`wave-4-candidate-diff.patch` contains zero hunks across zero files (comment-only). Verification, both results reported (the wave-3 discipline): bare `git apply --check` → `error: No valid patches in input` (the correct signal); `git apply --check --allow-empty` → exit 0.

**Generated/served-surface consequences**: no `canonical/**` change → generator leg NULL, zero `generated.lock` delta expected (any output delta at (c) is an anomaly finding under 5.W(d)). The register IS docs-MCP-served → `rebuild_index` after merge (the one live substitution consequence).

---

## 9. Pre-committed rubric (fixed BEFORE consults; contingent by design)

Under the rows-only finding, **(b) does not run** — no prune to probe, nothing to trial. A rows-only wave merges as a rows-only PR, instrument-excluded (class 3, J2 precedent), no window, no A2. Pre-committed now so that a consult-produced cut meets a rubric that predates its own evidence (Req 8.1; the wave-2 hole).

**Battery/replay fallbacks, named** (live queue checked 2026-09-17 — doc-repair, audit and 127-requirements work only; nothing traverses these territories):

| Item | Replay fallback | Confound disclosure |
|---|---|---|
| C10 | **PR #83** (Button-CTA disabled-state removal) — the only merged task squarely in territory | Its task is ABOUT disabled-state removal — maximal priming confound, disclosed as strong. Alternate: any component-scaffold task; none merged recently |
| C11a | **PR #166** (127 settle — record-first ballot executed) | The task is about ratification itself — strong confound |
| C11b | **PR #150 / #153** (token source-value changes) | Value edits, not creation — relevance uncertain, stated as such; INFORMATIONAL line only |
| C11c | none exists (no merged task exercises incremental builds) | N/A-by-construction; scores N/A per methodology note 4, never ABSENT |

**Presence rubric (mechanical)**: R1'-C10 — transcript adds/modifies a component contract or platform implementation touching state semantics (relevance only); B'-C10 — the change declares no disabled state and carries/preserves the exclusion block (behavior, arm-comparable). Caps ≤5×2×≤2; trials serialize; per-arm `--mcp-config` + `--strict-mcp-config` (wave-1 recipe).

> **DATED AMENDMENT (2026-09-17, post-consult-return, pre-fold — Stacy BLOCKING B3; trigger and timing disclosed).** The draft line "C11 lines all INFORMATIONAL (no prune exists to gate)" left the rubric contingent-incomplete: `record-first-ratification`'s SECOND scope (ungated artifacts) is `record-check`/**armed**, so blade 1 can bite there and a consult-produced C11 cut would have met no rubric — the exact wave-2 hole §9 exists to close. Amendment timing discipline per Stacy's own ruling: this closes a rubric hole in response to "you have no C11 rubric," NOT in response to candidate evidence — **no consult produced or has produced any C11 cut** (Stacy ran the missing check-worded sweep herself: zero new imposter candidates), so the amendment is uncontaminated. Added lines: **R1'-C11a** — transcript performs or should perform a record-first verification (applies/relays a governance-law change; relevance only); **B'-C11a** — the transcript verifies the committed RATIFIED record before applying, or reports-never-rubber-stamps on a missing record (behavior, arm-comparable); **R4'-C11a** — IF a relayed-authority claim appears, THEN the record-check occurs before any apply; N/A if never triggered. **R1'-C11b** — transcript creates or modifies a token definition (relevance only); **B'-C11b** — creation routes through human review rather than autonomous minting (behavior). **C11c** — remains N/A-by-construction (methodology note 4): no task exercises incremental-build paths; scored N/A, never ABSENT.

**Pre-committed consequences (verbatim, per 5.W(b))**: DIFFERENCE-DETECTED → no prune as drafted; MIXED/INDETERMINATE → Peter's call, never default-proceed; relevance unmet after fallback → the rule leaves the wave and re-rosters; rows-only holds → rows-only instrument-excluded PR, no window, `rebuild_index` after merge.

---

## 10. Wave-A1 / Wave-A2 (conditional — emitted per protocol §7; a wave with no prune opens no window and consumes neither)

**Wave-A1 — 24 source files + the generated tier (amended 2026-09-17 post-consult, pre-any-freeze — Stacy advisory A1: the draft's 22-file list was §7-noncompliant, missing the generated tier entirely plus two under-inclusions; free to fix now since no window exists, a §7-class amendment after a freeze would flag a segment INDETERMINATE)**:
`.kiro/steering/core-goals.md`, `.kiro/steering/Task-Completion-Protocol.md`; `governance/`: Component-Development-Guide, Component-Templates, Test-Behavioral-Contract-Validation, Component-Inheritance-Structures, Component-Family-Navigation, Component-Family-Form-Inputs, Component-Family-Chip, Component-Family-Button, stemma-system-principles, Contract-System-Reference, Component-Development-Standards, platform-implementation-guidelines, Token-Family-Opacity, Token-Family-Blend, Token-Quick-Reference, Token-Governance, Rosetta-System-Architecture, Figma-Workflow-Guide, Process-Task-Type-Definitions; `canonical/agents/ada.md`; **`canonical/shared/shared-catalog.yaml`** (C11a's own crossRef target — the ONCE-stated propagation source; clear under-inclusion); **`.kiro/docs/ballots/README.md`** (outside roster scope but where the record-first protocol literally lives and the row names it as education — included per wave 3's second-tier disclosure discipline rather than silently dropped).
— **Generated, anomaly-scan only, NEVER W2-counted** (protocol §7 + the 5.W(d) rule; C11a/C11b education propagates into all 16 generated prompts via the shared catalog): `CLAUDE.md`, `.claude/agents/*.md`, `.kiro/agents/*.{json,-prompt.md}`, `canonical/manifests/**`, `canonical/coverage-map.yaml`, `canonical/coverage-manifest.yaml`, `canonical/registry/**`, `canonical/_fixture-output/**`, `.claude/skills/**`, `.kiro/skills/**`.

**Wave-A2**: **EMPTY BY CONSTRUCTION** (no-op diff → no pruned literals). THE NO-MISREAD NOTE, carried verbatim from wave 3: A2-EMPTY must never be read as "patterns scored zero" — there is no pattern set to score, and it carries no evidential weight about re-accretion in either direction.

---

## 11. Open items for the consult round

| # | Item | Owner | Priority |
|---|------|-------|----------|
| **W4-1** | **C10 row adoption** — entry-id `no-disabled-states`, boundary class (functional, §2.2 — or overturn), owner (draft: **lina** — the guarded surfaces and the philosophy's home docs are hers), the three-entry `scope[]`, and the `proposed` candidate mechanism on the unguarded 29 (extend the exclusion+banned-pattern guard corpus-wide; vocabulary drift normalizes first) | **Lina** (+ Peter ratifies) | BLOCKING — the row cannot land without owner assent |
| **W4-2** | **Exclusion-key vocabulary drift** (§2.4): 5 files on `excluded:`/`exclusions:` vs the canonical `excludes:` both armed checks and CDG teach. Charter a defect issue (normalize 5 files)? | **Lina** | HIGH — silent today, false-RED or blind-guard tomorrow |
| **W4-3** | **PIG:169 a11y-mapping row** teaching the banned per-platform disabled mechanisms (§2.5): legitimate platform reference, or contradiction-rewrite (wave-2 CSR:183 class, repaired via owner fix PR)? | **Lina** | MEDIUM |
| **W4-4** | **Token-Family-Opacity disabled-state sections + TQR:44/:289** (§2.5): pre-philosophy content never reconciled; the ✅ example instructs a banned pattern. Rewrite/reconcile (the Token-Family-Blend model), and does it fold into Ada's queued Token-Family claims-vs-source pass? | **Ada** | MEDIUM-HIGH |
| **W4-5** | **wcag-required-refs stale fact** (§6): confirm the fact-refresh history entry + take the test-comment repair | **Lina** | MEDIUM |
| **W4-6** | **C11b confirmation**: any token-creation detection I missed; confirm warn/`proposed` and the education KEEP | **Ada** | MEDIUM |
| **W4-7** | **C11a/C11c confirmations + campaign-law compliance**: the rows-only consequence chain (no ballot — the wave-3 §12.2 determination pattern), the class-3 exclusion, and the **wave-3/4 bookkeeping repair** (5.4 was never ticked and carried no parent-grade completion/summary docs; wave 4's PR proposes to tick BOTH waves, land both (e)-grade records with chafe lines, and carry both completion+summary doc sets — is that repair process-sound, or does 5.4's record belong to 5.6?) | **Stacy** | MEDIUM |
| **W4-8** | **Roster-freshness pattern**: three consecutive waves found the roster's arming column wrong (C9 wave 3, C10 here; wave 2 found two unregistered armed checks). Name it to 5.6 as a method finding: candidate rosters must re-verify arming AT WAVE TIME (which 5.W(a) does — the finding is that the roster's snapshot decays fast, not that the method fails) | Thurgood → 5.6 | LOW (routing only) |

---

*§12 (consult fold) and §13 (ratification package) are added post-consult.*

---

## 12. Consult outcomes and incorporation (the fold record)

All three consults returned 2026-09-17. **None overturned ROWS-ONLY; all three overturned parts of the fact base or the process frame.** Wave 3's split (verdict held, facts fell) has now repeated with a third variant: the facts fell in BOTH directions at once — C10's armed scope was UNDERSTATED (Lina: 5 → 9 components + a corpus-wide guard) while C11b's was FLAT WRONG in the same direction wave 3 caught (Ada: "no mechanism" vs. name-set/cardinality locks on 17 families in a required lane). The campaign has now produced under-recording of arming in **four consecutive findings** (C9 wave 3, C10 and C11b this wave, plus wave 2's two unregistered armed checks) — a 5.6 method finding, not a coincidence.

### 12.1 Verdicts

| Consult | On the finding | On the facts |
|---|---|---|
| **Ada** (`wave-4-consult-ada.md`) | ROWS-ONLY HOLDS on token territory | **C11b fact base FALSIFIED (1 BLOCKING)**: the falsification clause fired — S4 hunted the rule's vocabulary, not the check's (the pass-10 discipline applied one row over and skipped here). W4-4 ruled contradiction-rewrite, chartered separately. C10's token/blend line corrected: deprecated AND still emitted. |
| **Lina** (`wave-4-consult-lina.md`) | ROWS-ONLY HOLDS (CONCUR) — but §2.6's "entailed" framing REJECTED; the conclusion survives on scrutiny (re-scoring), not entailment | **C10 armed scope FALSIFIED — UNDERSTATED (4 BLOCKING)**: 9 of 34 components + the corpus-wide css-bundling guard; scope[] restructured 3 → 6; W4-2 upgraded to BLOCKING (live MCP data defect, not latent); MISS-4 counter-pulling vacuous gate found; TBCV KEEP verdict held with its reason replaced. |
| **Stacy** (`wave-4-consult-stacy.md`) | Consequence chain HOLDS (no ballot / class-3 / record-first / rebuild_index all survive falsification); bookkeeping repair PROCESS-SOUND, belongs to wave 4 not 5.6 | **Process frame incomplete (3 BLOCKING)**: B1 the shared campaign W1 window is OPEN with #150–#166 untranscribed; B2 the campaign close condition is literally unsatisfiable with windowless final waves — a Peter ruling; B3 the §9 rubric was contingent-incomplete for C11a's armed record-check scope. B5/C2 conditions on the bookkeeping repair. |

### 12.2 Incorporation, per item

**Ada — BLOCKING (1/1 incorporated)**: W4-6 → the `no-autonomous-token-creation` row restructured to `scoped` (her §1.5 asks, verbatim-in-substance): scope 1 = the 17 locked families (name-set ×6, cardinality ×11) barrier / armed-by-incident in `lane-functional-root`; scope 2 = the unguarded remainder (primitive spacing — the flagship — radius, density, breakpoint, tapArea, glowOpacity, shadowOpacity, scale, the two self-referential families, 11 semantic families, ALL component tokens) at warn / proposed, with `audit:theme-drift` named as the best-shaped candidate mechanism (exists, correct shape, manual-only, not build-wired). Her counter-argument (locks detect *change*, not *sanction*) is folded into the boundary rationale — the row's own clean split predicted exactly this mechanism class. **Advisories (all folded)**: education KEEP strengthened with the mechanically-pinned fact (`canonical/agents/ada.md:19-27` mustContain assert → generator gates — the register's cleanest example of education-as-load-bearing-layer, mechanically protected); C10's token/blend scope line corrected to "deprecated AND still emitted" (docs/tokens.css:805, three platform wrapper APIs, DTCG `includeDeprecated: true` default); TQR path-staleness (~14 rows pointing at `.kiro/steering/Token-Family-*` for docs living in `governance/`) routed to the Thurgood infra-health queue (the ~9/25 health check); sweep-vocabulary method finding → 5.6 alongside W4-8.

**Lina — BLOCKING (4/4 incorporated)**: (1) scope[] rebuilt to her six-entry table verbatim-in-substance, coverage sentence struck and replaced (~26% at component grain + a corpus-wide web-CSS build-artifact surface); (2) "remaining 29 — none" corrected (scope 6 = remaining 25 at contract/API/runtime grain + iOS/Android beyond the 4 Input-Texts); (3) MISS-4 recorded on the row (BlendTokenUsageValidation requires disabled-blend on Button-CTA/Input-Text-Base, green only via two verified accidents — an armed check pulling AGAINST the philosophy, the mirror of wave 3's O-9; she takes the repair); (4) W4-2 recorded as a LIVE defect (parsers.ts:139 reads `doc.excludes` only; five components' exclusions invisible to every MCP consumer today, verified live via get_component_full) — chartered, she takes the repair at HIGH, sequenced first, with the before/after MCP-evidence requirement she set for herself. **Advisories (all folded)**: W4-3 PIG:169 ruled REWRITE with her replacement row (all THREE literals gate-banned — the strongest contradiction case the campaign has produced); TBCV:305-346 KEEP re-grounded on her four-supplies reason (the standardized reason: string, the iOS/Android checklist rows, the Philosophy Alternatives block, the provenance paragraph — a wrong reason on a right disposition is still a register defect, the wave-3 CDG:1692 lesson); TBCV:321 scored as a CONTRADICTION not an imposter (instructs removing an observation BVLI's armed check requires — rewrite folds behind her parity adjudication); family-doc clauses re-scored against the corrected scope, all KEEP with two reasons rewritten (CFB:34, CFFI:118); W4-5 confirmed with her framing correction — the wave-4 entry is a **checks[]-field fact refresh**, NOT a second discharge (wave 2's :338 entry already discharged the pending; two discharge records for one event would be its own defect); browser-distribution-guide education-absence added (the corpus's only corpus-wide guard is taught nowhere). **Her new finding (f)**: the ignore-vs-throw parity split inside the armed scope (Button-CTA ignores silently; BVLI throws; both armed, both ratified, never adjudicated) — she takes it to Peter as a ballot; recorded as a precondition on scope 6's proposed mechanism. **Ownership ACCEPTED; boundary class functional CONCURRED with her sharpened instruments-narrower-than-the-rule rationale; entry-id verified clean by her own script.**

**Stacy — BLOCKING (3 + 2 conditions, all incorporated)**: B3 → §9 amended (dated, uncontaminated — no C11 cut exists); B1 → dated measurement-debt hand-off recorded in `campaign-window-dataset.md` (PR range #150 → wave-4 merge; owed required-set re-verification; her git-observable half already run: ZERO changes to gate surfaces since #149; the option choice — run the pass vs. carry the debt — put to Peter in the PR body with the B2 contingency stated: under reading (i) the range is out-of-window and transcription is moot); B2 → the campaign-close determination put to Peter as a named explicit ask (the O-7 pattern), both readings + W1 consequences stated, recommended form drafted as methodology note 7 record-first (his merge ratifies it; a contrary ruling amends by dated entry); B4 → verification obligations stated per routed item in each charter (PIG:169 — the gate verifies 5 of 34 and nothing else, said so; Token-Family-Opacity — NO gate verifies it, said so, with the does-a-reconciliation-rewrite-need-(b) question put to Peter); B5/C5 → both chafe lines rewritten to the lived-friction form with instrument notes (a null is an absence of collection, not a measured zero — 5.6 must weight accordingly); C1 → two-date form on the wave-3 record; C2 → the windowless-wave (e)-point determination recorded generally as methodology note 6 (unit merge), not resolved ad hoc; C3 → W2/W3/W1-at-wave-grain recorded N/A-by-construction, never MET; C4 → the traversal-gap line recorded verbatim-in-substance ("this record cures the content gap; it cannot cure the traversal gap"); C6 → bare ticks only, annotations live in the completion docs; A1 → §10 amended; A2 → the class-3 disclosure re-enumerated with wave 4's ACTUAL contents; A3 → her record-check-degeneracy finding routed to 5.6 (blade 1 cannot discriminate where the agent performing the check IS the education's reader — deleting the education deletes the check); A4 → both corrections applied (unresolvable-handle caveat folded into the row; the refresh placed INLINE on the barrier scope's rationale, not history-only — the C8 armed_semantics_note precedent).

### 12.3 Contests

**None.** No steward disagreement with any consult item. Where I went beyond a consult it is marked as steward judgment: the methodology-note-7 record-first drafting of B2's recommended ruling (Stacy asked for a named Peter ask; the note form is my implementation of "record it where A1–A4 live"), and the single-charter batching of Lina's component-side items (she proposed batching her four repairs; I extended the batch to carry the parity adjudication as its gating first step and the two governance-doc rewrites, each with its own verification line).

---

## 13. Ratification package

### 13.1 Campaign-law consequences (the chain, confirmed by Stacy against the protocol)

**No cut → no prune → no window → no (b) → class-3 instrument-excluded PR → rows ratify at Peter's merge, record-first → `rebuild_index` after merge → generator leg NULL** (no `canonical/**` change; any output delta is a 5.W(d) anomaly finding). The no-ballot determination inherits wave 3's §12.2 analysis and its four precedents unchanged; Stacy re-verified each link and the carve-out text verbatim. **Class-3 disclosure with THIS PR's actual contents (Stacy A2 — an exclusion whose stated basis is stale is contestable on its own terms)**: this PR carries the three register-row changes + two confirmation history entries + one fact-refresh entry + two methodology notes; two `.kiro/issues/**` defect charters (routed records produced by the classification — the wave-3 disclosed structure); the campaign-dataset debt note (campaign instrumentation by definition); AND wave 3's retrospective completion record + summary + the 5.4 tick alongside wave 4's own (campaign bookkeeping is campaign instrumentation — Stacy's W4-7c ruling). The exclusion's test is "purpose is instrumentation," not "touches nothing else" (the J-C1 distinction); if Peter reads the bookkeeping riders as changing the PR's purpose, the exclusion is contestable → Peter (J1/J3 pattern). **The #132 sequencing precedent does not fire**: wave 4 has no prune, so there is no compound-exposure window to sequence the owner fix PRs against (stated explicitly per Stacy rather than left implicit). The owner fix PRs, when they land, are ORDINARY observed PRs (#132's own recorded treatment) — in-window observations under reading (ii) of the B2 determination.

### 13.2 What Peter is asked to ratify (at this PR's merge, record-first — rows committed on the branch before the merge)

1. **`no-disabled-states` — NEW row** (C10, discharging U2's logged candidate): class functional; owner **lina** (accepted); six-entry `scope[]` per the corrected fact base; education KEEP set with the consult-corrected reasons; the contradiction candidates ROUTED (not cut) with verification obligations stated.
2. **`no-autonomous-token-creation` — restructured** scalar warn/proposed → `scoped` (Ada's ruling): barrier/armed-by-incident on 17 locked families; warn/proposed on the remainder incl. ALL component tokens and the flagship spacing family; education KEEP + the mechanically-pinned fact.
3. **`record-first-ratification` — confirmation + inline fact refresh**: barrier scope HOLDS `proposed` (U3 not run; no delegation record exists — verified against all 11 ballots); the Spec-118 CODEOWNERS recorded inline as scope-disjoint, advisory, AND unproven-routing (the file's own @3fn caveat) — a named U3 precondition.
4. **`inverse-drift-incremental-build` — WATCH confirmation**: proposed/none HOLDS; corpus silent; #163 adjacent-noted.
5. **`wcag-required-refs` — checks[]-field fact refresh** (NOT a discharge — wave 2's entry :338 already discharged the pending): adjudication RULED REMOVE 2026-07-15, live count zero, floor exclusion permanent-by-outcome; cross-reference to `no-disabled-states` scope 6 (the wcag matcher is the reintroduction backstop for the unguarded 25).
6. **Methodology note 6** (Stacy C2): for a rows-only wave, the (e) point — wave record, chafe line, task tick, completion docs — is the unit's MERGE (no window → no window-close event → the merge is the wave's last defined event).
7. **Methodology note 7** (Stacy B2 — **an explicit ratification ask, not a steward interpretation**): the campaign-close determination for windowless final waves. Recommended: the campaign window closes at the final wave's unit merge (reading (ii) — preserves event-denomination and keeps the campaign's tail measured). The alternative reading (i) (closed 2026-08-27 at the last real window's close) and its consequence (the #150+ range is out-of-window; the dataset's OPEN status has been wrong for three weeks) are stated in the note. **A ratified parameter — Peter's merge ratifies the recommended reading; a contrary ruling amends by dated entry.**

### 13.3 Open for Peter (decisions the merge does NOT settle by itself)

- **B1 option**: transcribe #150→merge into the campaign dataset now (Stacy's recommendation), or carry the recorded debt to 5.6 (fully compliant; the steward's lean, given the B2 contingency — under reading (i) the transcription is moot). The debt note stands either way.
- **Settings falsification (one sentence)**: is required code-owner review enabled in branch protection? Neither the steward nor Stacy can read Settings; the C11a confirmation assumes no.
- **B4 ruling (rides the Opacity charter)**: does a reconciliation-rewrite of pre-philosophy education content — where NO gate verifies the territory — count as a prune requiring the wave (b) machinery, or as a correction-into-agreement repair on the owner's authority? The charter proceeds on the repair reading unless he rules otherwise.
- **Method findings routed to 5.6** (recorded here so the closeout inherits a list, not a hunt): (i) roster-freshness — four consecutive under-recordings of arming (W4-8, + Ada's sweep-vocabulary variant: the failure is also sweep design, not only roster decay); (ii) Stacy's record-check degeneracy — the two-blade test cannot discriminate on `record-check` dispositions; (iii) Lina's rewrite-vehicle inconsistency — wave 2 shipped contradiction-rewrites as diff hunks, wave 4 routes them to owner PRs; two silent conventions for one disposition class; (iv) Lina's four-origins finding — the C10 armed scope was assembled by four uncoordinated historical accidents, zero scope decisions; (v) Stacy's P1–P3 datum — half the campaign's waves opened no window, making N=10-per-wave untestable for rows-only waves; (vi) the B5 chafe-collection gap — two of four wave chafe lines are retrospective/instrument-less; the dial decision must weight them as absence-of-collection, not zeros.
