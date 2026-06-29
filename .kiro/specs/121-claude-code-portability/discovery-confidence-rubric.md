# Discovery Confidence Model & Rubric (Spec 121 — Req 6)

**Date**: 2026-06-22
**Spec**: 121 — MCP Delivery-Layer Hardening
**Status**: Tracked decision record. Rubrics **validated against the real corpus** (dry-run) and tuned before lock — not a paper model. The per-domain rubrics are authored by their owners (Lina = components; Thurgood = docs; Ada = token exemption).
**Consumes / feeds**: 119 Decision 4a (agent certainty-calibration / propose-best-fit go/no-go); 121 Req 2 (`resolutionDepth` — kept distinct, see §Collision).

---

## The Three-Layer Model (the backbone)

A search result is not one judgment — it's three distinct questions that must never be collapsed (Peter's framing; the Google analogy: 1,000 results, the top is an ad, the useful answer is #2–3 organic — top *match* ≠ best *answer*):

| Layer | Question | Type | Owned by |
|---|---|---|---|
| **1 — Match** | "Did we find it, and how strongly?" | graded (tier) | the **tool** (matcher) |
| **2 — Viability** | "Can this actually be *used*?" | **gate** (pass/fail) | tool **emits** the signal; **caller gates** |
| **3 — Usability** | "Of the usable ones, which is *best*?" | **comparative** (rank + judgment) | tool provides rank; **agent judges**; **human** go/no-go on low-confidence |

**The governing sequence:** `match → filter by viability → rank/judge usability → act only if confident AND viable AND clearly-best; otherwise propose best-fit for go/no-go.`

**Hard rule: match-confidence alone NEVER drives action.** A `strong` match can be non-viable (a placeholder doc, a deprecated component) or not the most usable (a lower-ranked candidate fits the intent better). The tool surfaces evidence across all three layers; the agent judges; the human decides the uncertain calls. The tool never pretends rank #1 = "the answer."

**Emit contract: the three layers are distinct fields, never merged.** `matchConfidence` (Layer 1) ≠ viability signal (Layer 2) ≠ rank/order (Layer 3).

---

## Layer 1 — Match: shared tier vocabulary (tiers, NOT opaque scores)

Field: **`matchConfidence: 'strong' | 'partial' | 'none'`** (named distinctly to avoid colliding with Req 2's `resolutionDepth: 'partial'` — see §Collision).

| Tier | Meaning | Agent behavior |
|---|---|---|
| **`strong`** | high-signal, non-incidental match | act (subject to Layer-2 viability + Layer-3 usability) |
| **`partial`** | weak / low-signal / below-threshold best-fit exists | **propose best-fit + confidence + rationale → human go/no-go** (119 Decision 4a) |
| **`none`** | no plausible candidate | empty contract (`find_components` → `{data:[], error:null}`; `find_docs` equivalent), optional broaden/did-you-mean hint |

**Why tiers not scores:** an opaque float (`0.42`) is false precision — no one can say why 0.42, where the threshold is, or *why* it's weak. A tier is **derived by a stated rubric from visible evidence**, so it is auditable and tunable by inspection (the payoff of rejecting scores).

**Evidence emitted alongside every result (so the tier is reconstructable, never a bare label):**
`matchedOn` (which fields matched — labeled by signal class) + `matchedTokens` / `totalTokens` (coverage). An agent or auditor can recompute the tier from these primitives without trusting the tool's own label.

**Granularity is fixed at three** (both domain owners confirmed): the tiers map 1:1 to the only three agent behaviors (act / propose / empty). A fourth tier would have no behavior to bind to and would fracture cross-tool interpretation. Within-tier nuance lives in `matchedOn` + coverage (which also drives Layer-3 rank), not in more tiers.

### Per-domain rubrics (validated + tuned)

**Components — `find_components` (Lina).**
- **High-signal fields:** tokenized `name`, tokenized `family`, `purpose`, contract concept/category names.
- **Low-signal fields:** `whenToUse`, `contexts`, `alternatives[].reason`, `description`. (`whenNotToUse` is NOT indexed — negative-signal trap.)
- Tokenized matching (split query on whitespace / camelCase / hyphen; lowercase).
- **Tier rule (with the validated false-confidence fix):**
  - `strong` = a **high-signal-field hit**, OR **≥2-token full coverage where at least one matched field is high-signal**.
  - `partial` = at least one token matched but only in low-signal fields **and not** the qualified-coverage case above (includes the single-low-signal-token case).
  - `none` = zero tokens matched.
- Structured filters (`category`/`concept`/`context`/`platform`) are **exact constraints**, not fuzzy evidence (a pass = high-signal on that axis).
- **Tuning note (the fix the dry-run caught):** the ≥2-token coverage clause is **signal-class-gated** — low-signal-only coverage (e.g. a 2-token query both landing in a shared `contexts` value like `onboarding-flows`) caps at `partial`. Without this guard, low-cardinality shared fields mass-produce false `strong`s.

**Docs — `find_docs` (Thurgood).**
- **High-signal fields:** doc title/`name`, section headings, frontmatter `description`. *(There is NO `keywords` frontmatter field in the corpus — `description` is the keyword surface.)*
- **Medium-signal:** layer / category / `Relevant Tasks` metadata.
- **Low-signal:** body-only.
- **Tier rule (with the validated incidental-token guard):**
  - `strong` = a **non-incidental high-signal hit** — an exact multi-token title/heading match, OR ≥~50% salient-token coverage where description list-item tokens count singly. A lone incidental high-field token (e.g. "avatar" as one example in `Token-Family-Sizing`'s description) does NOT reach `strong`.
  - `partial` = matched only medium/low-signal, OR an incidental/low-coverage high-signal token. **Body-only / incidental → `partial`, never `none`** (a flagged weak best-fit must beat a bare empty that hides it).
  - `none` = **zero salient-token matches in any field after stop-word + common-term normalization.** The stop-word list is **owned and versioned** (otherwise the `partial`/`none` line drifts silently).
- Coverage denominator = total salient query tokens.

**Tokens — EXEMPT (Ada).**
- Token access (`search_tokens`, `get_token_details`, `get_token_family`, `get_token_consumers`) is **structured/predicate retrieval over a closed, named vocabulary** — exact/substring filters returning the complete unranked matching set, or direct keyed lookup. There is **no relevance ranking**, so there is no fuzzy judgment for a tier to make legible; a tier would always read `strong` = zero information.
- **The asymmetry (the real "tokens ≠ components" answer):** the tier rubric governs *inferred relevance ranking*; token tools do no ranking, so there is nothing for it to govern.
- **Trigger (so the exemption can't go silently stale):** IF a token tool is introduced/extended to accept **open-ended intent / natural-language input** and return **ranked or best-fit candidates** (e.g. `find_token({ intent: "spacing between form fields" })`), THEN it inherits this model. Bright line: *does the tool rank by inferred relevance?* Predicate filter → no tier; relevance ranking → tier required. (A substring `name` filter is a deterministic predicate, NOT the trigger.)

---

## Layer 2 — Viability (the gate)

"Can this result actually be used?" — a pass/fail filter applied **before** usability ranking, **separate** from `matchConfidence`.

- **Emitted by the tool as a distinct signal:** component **readiness** (already carried by the application MCP); doc **placeholder / deprecated** status (e.g. the `🔴` placeholder marker — `Component-Family-Modal` is a textbook `strong` match that is a placeholder and must not be auto-acted-on).
- **Token sub-case:** Req 2's `resolutionDepth: 'full' | 'partial' | null` is a viability signal for tokens ("found it, but can its *value* be fully resolved?") — a Layer-2 concern, distinct from the Layer-1 match tier.
- **The caller gates:** never act on a `strong` match that is non-viable. `strong` is necessary but not sufficient for action.

---

## Layer 3 — Usability (rank + judgment)

"Of the viable matches, which is *best* for the actual intent?" — comparative.

- **The tool provides a rank** within a tier (by match-strength + coverage), and `matchedOn` makes the ranking auditable. It does **not** assert rank #1 = "the answer."
- **The agent makes the usability judgment** — selecting among viable, ranked candidates against the real intent (the #2–3-organic-is-better case).
- **The human decides the uncertain calls** — when `matchConfidence` is `partial`, the agent surfaces the best-fit + confidence + rationale (never a bare "here's X, ok?") for go/no-go (119 Decision 4a).
- Multi-owner ties (e.g. "WCAG contrast" → two `strong` docs) are a Layer-3 concern: the tool may not break the tie; the agent/human does.

> **Amendment (Spec 119-A, 2026-06-29) — `find_docs` title rank tie-breaker (Layer-3 RANK only).** Within a tier, a query token that hits a doc's **title** now contributes a small fractional rank bonus (`< 1`, the inter-tier gap) above the same token hitting `sections`/`description`/`purpose`/`aliases`. Rationale: a doc that **is about** a token (title) is a stronger *match-strength* signal than one that merely **mentions** it (a section/description), so it should out-rank on usability. This **sharpens** "rank by match-strength" (above); it does **not** add a tier or change `matchConfidence` — `deriveMatchConfidence` is untouched, so Layer-1 and the §Collision field separation are unaffected. It only breaks **exact** ties (the bonus is smaller than any coverage/tier difference), so a higher-coverage or higher-tier match always still wins. The "tool may not break the tie" rule above still holds for **genuine co-equal** matches (e.g. two docs that both carry the query in their *titles* remain tied → agent judges). Discovered via the 119-A discovery dry-run gate (Req 13): four generic family/concept queries were `strong` but stuck at rank 3–4 because the intended doc's title-match tied with an incidental section/description mention and ties fell to directory order. The tie-breaker cleared the gate (83/83 reachable at rank ≤ 2) and lifted rank-1-strong corpus-wide 69.9% → 94%, with Spec 121's calibration fixtures still green (rank-only change). Pinned by a guard test.

---

## Tunability & Calibration (test the rubric, tweak it)

The rubric is tunable by **legible knobs, not opaque weights**: the field signal-class assignments, the coverage thresholds (≥2-token / ≥50%), and the versioned stop-word list. Turning a knob moves a query between tiers predictably.

- **Validation already done (this is a tested rubric):** a dry-run applied each rubric to the real corpus with designed + adversarial query sets. It caught and fixed a **false-confidence bug in both rubrics** (signal-class-blind coverage → mass false-`strong` on shared low-signal fields), a **phantom field** (docs `keywords` doesn't exist), and surfaced the **confidence ≠ viability** insight (placeholder Modal) — which produced this three-layer model.
- **Calibration fixtures (deliverable):** the dry-run query sets become the tier-classification test fixtures — `{query → expected matchConfidence + expected top candidate}` — asserted at the tool boundary (Req 3). Implementation runs them, sees misclassifications, adjusts a knob, re-runs.
- **Real-use telemetry:** because `matchConfidence` + `matchedOn` are emitted, track whether `partial`s get accepted or rejected on go/no-go — partials almost always accepted ⇒ threshold too strict; almost always rejected ⇒ too loose. Continuous tuning grounded in real decisions.
- **Implementation reality:** today's `find_components` does none of this (no tokenization, no tiers, searches only `purpose`+`description`). These rubrics are the **target**; the fixtures are the spec for what to build.

---

## §Collision — three orthogonal axes, three distinct field names

Never collapse these; never reuse a bare `partial` whose meaning depends on context:

| Axis | Field | Question |
|---|---|---|
| **Match** (Layer 1) | `matchConfidence: strong\|partial\|none` | did we find the right thing, how strongly? |
| **Viability** (Layer 2) | readiness / placeholder / deprecated; tokens: `resolutionDepth: full\|partial\|null` | can it be used / can its value be resolved? |
| **Usability** (Layer 3) | rank/order + agent judgment | which is best for the intent? |

---

## Cross-references
- **121 Req 6** mandates this model (tiers-not-scores; three distinct layers; the validated rubrics; the calibration fixtures).
- **119 Decision 4a** is the agent-side protocol that consumes Layer 1 `partial` → propose-best-fit-go/no-go (with the carry-the-uncertainty guardrail).
- **121 Req 2** `resolutionDepth` is the token viability sub-case (Layer 2) — kept lexically distinct from `matchConfidence`.
