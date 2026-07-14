# Experiment 3 — Token-Approval Boundary Call + Feasibility Spike (Evidence)

**Spec**: 125-B — Classification Map & Deferred Enforcement Layers
**Task**: 4.1 (U2)
**Author**: Ada (Rosetta token owner) — boundary call + FP/FN adjudication
**Audited by**: Thurgood (lands the register entry FROM this adjudication — Ada does not write `governance/classification-map.md`)
**Date**: 2026-07-14
**Requirements**: 16.1–16.5 · **Design**: C9
**Rule under test**: "no autonomous token creation" — creating ANY token (primitive, semantic, or component) requires human review.

> This is a **citable evidence note**, not standing tooling. The detection prototype (`exp3-detect.sh`, same directory) is a throwaway bash script confined to the spec dir. **Req 9.3 escalate-don't-build stop: NOT triggered** — the prototype stayed a ~40-line diff-scanner and never trended toward standing tooling. Whether U3 arms anything is U3's design decision, informed by this evidence; nothing here is armed or wired as a check (Req 16.2).

---

## Part 1 — The Boundary Call (Ada's adjudication, recorded)

### Classification

| Field | Value |
|-------|-------|
| **Rule** | "no autonomous token creation" (any tier requires human review) |
| **Class** | **operational** |
| **Contested reading (recorded, not suppressed)** | one could read it as *functional* ("protects the math") — that reading is **wrong**, see rationale |
| **Verification disposition (recommended)** | **warn** — advisory, unarmed; NEVER a barrier keyed on the source-diff marker (evidence below) |
| **check_state (recommended)** | **proposed** (prototype only; U3 decides arm/no-arm) |
| **Education disposition** | keeps the why — token-governance autonomy levels + Component Development Guide's token-selection framework; generated prompts teach right-token / right-tier / mathematical fit |

### Rationale — why *operational*, not functional or ideological

The rule protects the **primitive → semantic → component hierarchy and namespace coherence** — the structural integrity of the token vocabulary. It is:

- **NOT functional.** It does not enforce a mechanical/mathematical invariant (that's what the formula-validation suites do — `SpacingTokensFormulaValidation`, the modular-scale tests). A functional rule is machine-checkable against the token's *value*. "Should this token exist at all, and did a human sanction it?" is not a value property.
- **NOT ideological.** It is not a taste/aesthetic position. It is a workflow-integrity rule: it governs the **sanctioned path** by which vocabulary enters the system, so the namespace stays coherent and the hierarchy stays legible.
- **IS operational.** It governs *how work is done* (the creation workflow) to preserve a system property (coherent, human-curated vocabulary). Operational is the correct class.

### The clean split — what a check CAN verify vs. what stays education

This is the crux, and the feasibility spike (Part 2) confirms it empirically:

| Question | Nature | Who answers |
|----------|--------|-------------|
| "Did a new token definition **appear** in this diff?" | **workflow hygiene** — a structural fact on the `src/tokens/**` diff surface | a **check** (with the caveats in Part 2) |
| "Was this creation **sanctioned** (approved)?" | approval context — lives **out-of-band** (PR review, spec, conversation) | **not** the source diff — a human, via the record |
| "Is it the **right token** — mathematically sound, correctly named, at the right tier?" | **correctness** | **education** (governance docs + generated prompts) — never a marker check |

A check verifies the **sanctioned path** ("a token appeared — is it tied to an approval record?"). It never verifies the token's **mathematical fit** or **semantic correctness**. Detection ≠ approval-verification ≠ correctness. Clean split.

### RECORDED FINDING — the hygiene caveat (Req 16.3)

**An approval-marker check on `src/tokens/**` verifies workflow hygiene, never the rule itself.** The rule is about *approval*; approval context is not present in the token source diff (see Part 2: across ~100 historical token-touching commits, exactly **one** carried an in-band approval note — 15f7fa8e's freeform "Ada approved" prose, unparseable as a marker). Therefore:

- The check can detect *"a new token was added here"* (hygiene tripwire) and route it to a human for confirmation.
- The check **cannot** confirm the addition was sanctioned, nor that it is mathematically/semantically right.
- Its **positive predictive value for "unsanctioned creation" against the historical record is ≈ 0** — every genuine addition traced to a spec/task; the closest cases were two *drive-by* additions whose approval trail is murky (§ Part 2), which the check would surface for human confirmation. **Surfacing-for-confirmation is the check's ceiling, not adjudication.**

This caveat is why the recommended disposition is **warn**, not **barrier**.

---

## Part 2 — The Feasibility Spike

**Scope guard**: `src/tokens/**/*.ts` excluding `__tests__`. Generated output (`dist/`, platform files) is out of scope **by path** — regeneration reshuffle would make output-surface detection near-vacuous (Req 16.2). All counting happens before that noise can enter.

### Marker-form rules (decided in-task, Ada's call as owner)

A **detection-positive** (candidate new-token-creation) is EITHER:

- **Shape (b) — new token file**: a git-added `*Tokens.ts` source file under `src/tokens/**`. Strong signal, low FP.
- **Shape (a) — new token key in an existing export**. Three sub-forms were observed in the corpus, and their separation is the whole feasibility story:
  - **(a1) flat bare identifier** — `+  space700: {` — primitive families. Cleanly mechanizable.
  - **(a2) flat quoted dotted-string** — `+  'color.feedback.info.text': {` — flat semantic families. Cleanly mechanizable.
  - **(a3) nested / inline leaf** — `minimal: { value: 'space025' }` at depth > 2-space — hierarchical semantics (`layoutSpacing.grouped.*`, `insetSpacing.*`). **NOT reliably separable at the diff surface** from grouping containers and nested props; frequently an inline single-line object that evades block-opener matching.

**Explicitly NOT positives (must be excluded):**
- **renames** — paired `+key` / `−key`, net-zero new tokens (a *modification*, not a *creation*);
- **value / metadata edits** — no new key line;
- **nested structural props** — `platforms: {`, `channels: {`, `primitiveReferences: {`;
- **grouping containers** — `grouped: {`, `related: {` (categories, not tokens).

**Two detection strata** were run so the noise floor is visible:
- **NAIVE** — any added `<prop>: {` block-opener. Over-matches every nested prop.
- **REFINED** — 2-space-indent, bare-or-quoted key, `: {` at end-of-line. Suppresses deep nesting; still blind to (a3).

### Labeled ground set (Ada-adjudicated) + detection outcomes

Ground truth = does the diff genuinely **create** ≥1 new token, and was it **sanctioned**? Detection = refined-stratum keys (R) / new-files (F) from `exp3-detect.sh`.

| # | commit | subject (class) | shape | genuine new tokens | sanctioned? | R / F | commit-level outcome |
|---|--------|-----------------|-------|-----|------|-------|------|
| 1 | `fe9eee07` | size900 (creation task) | a1 | 1 | yes (own task) | 1 / 0 | **TP** |
| 2 | `15f7fa8e` | "Fix:" space700/800 | a1 | 2 | yes (**in-band** "Ada approved") | 2 / 0 | **TP** |
| 3 | `fd89e05f` | Create BlurTokens.ts | b + a1 | ~8 | yes | 9 / 1 | **TP** |
| 4 | `133e2ea4` | Create SizingTokens.ts | b + a1 | ~13 | yes | 13 / 1 | **TP** |
| 5 | `10b99f53` | Semantic Concept Token Creation | a2 | 29 | yes | 29 / 0 | **TP** (29/29 real, precision≈recall≈100%) |
| 6 | `afcf83bd` | Create Select Color family | a2 | 4 | yes | 4 / 0 | **TP** |
| 7 | `28ca8f2e` | **DRIVE-BY**: 3 surface tokens under a *Figma-bugfix* subject | a2 | 3 | **murky** (no per-token task cited) | 3 / 0 | **TP** (check surfaces it — the hygiene win) |
| 8 | `d8bdc073` | **DRIVE-BY**: new IconTokens.ts under *"Quick win fixes"* | b | file | **murky** | 11 / 1 | **TP** (check surfaces it) |
| 9 | `c796eb46` | Radius **RENAME** (radiusFull→radiusMax) | rename | **0** | n/a (modification) | 1 / 0 | **STRUCTURAL FP** |
| 10 | `bc752a78` | hierarchical spacing (a3) + flat color (a2) | a3 + a2 | 18 nested + 12 flat = 30 | yes | 16 / 0 | **MIXED**: 12 TP + **4 structural FP** (grouping keys) + **18 token-FN** |
| 11 | `0b6e4dba` | mode-aware color resolution | value/impl | 0 | n/a | 0 / 0 | **TN** (correct suppression) |
| 12 | `71120a5d` | OKLCH migration v12 | migration | 0 (remap) | n/a | 0 / 0 | **TN** (correct suppression) |
| 13 | `5314be82` | Mode-Aware Color **Primitive** family (nested scales) | nested-prim | large (~45+ steps) | yes | 45 / 1 | **TP + partial token-FN** (nested steps beyond the 45 caught) |

**Ground-set size: 13 commits** — 10 genuine-creation, 3 non-creation (1 rename, 2 value/migration). Both classes represented (design intent met). Adjudication split: **8 clearly-sanctioned creations, 2 murky drive-by creations, 3 non-creations.**

### FP / FN counts (honestly reported)

**Commit / diff level** (the diff-gate's practical unit — "does this PR introduce ≥1 new token?"):

| | fired | silent |
|--|-------|--------|
| **genuine-creation commit** | TP = **10** | FN = **0** |
| **non-creation commit** | FP = **1** (the rename) | TN = **2** |

- Commit-level **recall = 10/10 = 100%**, **precision = 10/11 ≈ 91%**. Looks strong — **but this masks the token-level weakness**, see below.

**Token level** (recall over individual tokens created — where the real failure lives):

- **Flat families (a1, a2, b)** — precision and recall ≈ **100%**. Commits #1–#6 detected every token, no spurious fires. Clean.
- **Hierarchical family (a3)** — **inverted detection**. Commit #10 alone: **4 structural FP** (grouping containers `grouped/related/separated/sectioned` flagged as tokens) and **18 token-level FN** (the actual leaf tokens `minimal: { value: 'space025' }` at 4-space inline form, all missed). The commit only registered as a TP *by luck* — it also touched flat color tokens. **A PR adding ONLY nested hierarchical tokens would be a commit-level FN (silent).**
- **Naive stratum noise floor**: on #13 the naive stratum fired **360** vs refined **45**; on `d2f5872d`, **224** vs **43**. Naive is unusable; refined is the floor, and refined is still (a3)-blind.

**Governance-lens FP (C9's strict definition — "flagged diff Ada adjudicates as sanctioned")**: of the 10 true detections, **8 were sanctioned** (traced to explicit creation tasks) and would each be a C9-FP — the check flags additions that *were* approved, because it cannot see approval. **Only the 2 drive-bys (#7, #8) are the cases the rule actually cares about**, and even they were plausibly-fine, just under-documented. → **Historical PPV for "unsanctioned creation" ≈ 0.**

---

## Feasibility Verdict (feeds U3's diff-gate design)

1. **Structural creation-detection is *merely hard* — mechanizable with bounded noise for FLAT token families.** A `warn`-disposition advisory keyed on (a1)/(a2)/(b), plus rename-pairing (match added keys against removed keys to drop the net-zero FP), reliably answers *"did a new flat token appear in this diff?"* — 100% recall, ~100% precision on the flat corpus.

2. **It is NOT reliably feasible for HIERARCHICAL / nested families** (`layoutSpacing`, `insetSpacing`, nested color primitive scales). The 2-space heuristic **inverts** — flags grouping containers (FP), misses inline leaf tokens (FN, up to 18/30 in one commit). No single diff-surface marker rule handles the heterogeneity, because token definitions have **three structurally distinct shapes** (flat Record, flat quoted, nested/inline). Cleanly separating (a3) from grouping/nested-prop lines needs **AST/structural awareness of the token-record type**, not a diff regex — which crosses from "hygiene tripwire" into "standing tooling" (Req 9.3 territory; U3 must decide deliberately, not drift into it).

3. **The actual rule is UNMECHANIZABLE at the source-diff surface.** "No autonomous token creation" is about **approval**, and approval context is **out-of-band** (PR / spec / conversation), invisible to a `src/tokens/**` diff (1 in-band note in ~100 commits, and it was unparseable prose). A check can detect the *structural fact* of creation; it can **never** confirm the creation was *sanctioned*.

**Where this moves the merely-hard vs. unmechanizable line:**
> **Structural creation-detection = merely hard** (mechanizable for flat families, needs AST for nested). **Approval-verification = unmechanizable** at the diff surface. The strongest honest check U3 could arm is a **`warn` that routes new-token diffs to a human for approval-confirmation** — a **hygiene tripwire, not a correctness gate**. It *complements* education (which owns right-token / mathematical fit / tier); it never replaces it. A **barrier** keyed on this marker is affirmatively wrong: it would false-fire on renames, pass nested-only additions silently, and block legitimate approved work.

**Recommendation to U3 (non-binding, evidence-grounded):** if any check is armed, arm a **`warn`** scoped to flat-family shapes (a1/a2/b) with rename-pairing, explicitly documenting that nested-family additions and approval-status are out of its reach and remain education's job. Register `check_state: proposed` until then.

---

## Artifacts

- `exp3-detect.sh` (this directory) — throwaway detection prototype; `--corpus` mode reproduces the full-corpus scan, single-commit mode reproduces any row above.
- Reproduce a row: `./exp3-detect.sh <commit>` — e.g. `./exp3-detect.sh bc752a78` shows the inverted-detection case (4 container FP, leaves missed).
