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
- **High-signal fields:** tokenized `name`, tokenized `family`, `purpose`, contract concept-key **suffixes** *(amended 2026-10-12 — was "contract concept/category names"; see the amendment below)*.
- **Low-signal fields:** `whenToUse`, `contexts`, `alternatives[].reason`, `description`, contract **category** tokens (the `category` field and the concept-key prefix — amended 2026-10-12). (`whenNotToUse` is NOT indexed — negative-signal trap.)
- Tokenized matching (split query on whitespace / camelCase / hyphen; lowercase).
- **Normalization (added 2026-10-12):** both the indexed fields and the query drop **stop words** and **fold regular plurals** (`tabs` → `tab`) before matching; the stop-word count is excluded from the coverage denominator. The components stop-word list is a **versioned knob** (`application-mcp-server/src/indexer/termNormalization.ts`, `COMPONENT_STOP_WORD_LIST_VERSION`), seeded by copy from the docs list (`mcp-server/src/query/stop-words.ts` v1) plus a closed-class extension (spatial prepositions deliberately excluded — they carry layout meaning). A keyword made only of stop words yields the `none` empty contract. Plural folding is a conservative suffix rule with an exceptions list, not a stemmer.

> **Amendment (2026-10-12) — contract CATEGORY tokens move to low-signal (signal class of a listed field; rank and tier rule unchanged).** Ruled by Thurgood (option (b), corrected), executed by Lina; source: `.kiro/issues/2026-10-07-find-components-lexical-and-metadata-defects.md` item 5. **What changed:** "contract concept/category names" above was one high-signal field. It is now split: the concept-key **suffix** (`focusable` in `interaction_focusable`, `form`/`integration` in `validation_form_integration`) stays **high-signal**; the **category** tokens — the contract's `category` field **and** the category **prefix** of the concept key — are **low-signal**. Demoting the `category` list alone would have changed nothing: concept keys are `{category}_{concept}` and the tokenizer splits on `_`, so the prefix carried the category word into the high-signal set on its own. **Why:** a category word (`validation`, `interaction`, `accessibility`) is shared by every component in that category, so as a high-signal token it put a whole category at `strong` from one generic word (reproduction: "email field with validation" → `strong` on 22 components, rank 1 Input-Checkbox-Base). **Effect:** a query containing a category word still matches every component in the category — at `partial`, unless a high-signal field (name, family, purpose, concept suffix) also carries the word. **Tiers change at merge** for queries whose only high-signal evidence was a category word. `deriveMatchConfidence` is untouched; this is the "field signal-class assignment" knob named under Tunability. Spec 121 calibration fixtures stay green. Pinned by `application-mcp-server/src/query/__tests__/Stage0LexicalFixes.test.ts` § item 5.
- **Tier rule (with the validated false-confidence fix):**
  - `strong` = a **high-signal-field hit**, OR **≥2-token full coverage where at least one matched field is high-signal**.
  - `partial` = at least one token matched but only in low-signal fields **and not** the qualified-coverage case above (includes the single-low-signal-token case).
  - `none` = zero tokens matched.
- Structured filters (`category`/`concept`/`context`/`platform`) are **exact constraints**, not fuzzy evidence (a pass = high-signal on that axis).
- **Tuning note (the fix the dry-run caught):** the ≥2-token coverage clause is **signal-class-gated** — low-signal-only coverage (e.g. a 2-token query both landing in a shared `contexts` value like `onboarding-flows`) caps at `partial`. Without this guard, low-cardinality shared fields mass-produce false `strong`s.

**Docs — `find_docs` (Thurgood).**
- **High-signal fields:** doc title/`name`, section headings (H2, outside fenced code blocks since 2026-10-13), the single best **deep heading** (H3/H4) through the co-occurrence gate *(added 2026-10-13; see the deep-headings amendment below)*, frontmatter `description`, frontmatter `aliases` *(listed 2026-10-13: `aliases` has been high-signal in the shipped matcher since the 119-A alias seeding, Spec 121 Req 1.9 extended to docs, but this list never named it; see the alias-hygiene amendment below)*. *(There is NO `keywords` frontmatter field in the corpus — `description` is the keyword surface.)*
- **Medium-signal:** layer / category / `Relevant Tasks` metadata.
- **Low-signal:** body-only.
- **Tier rule (with the validated incidental-token guard):**
  - `strong` = a **non-incidental high-signal hit** — an exact multi-token title/heading match, OR ≥~50% salient-token coverage where description list-item tokens count singly. A lone incidental high-field token (e.g. "avatar" as one example in `Token-Family-Sizing`'s description) does NOT reach `strong`.
  - `partial` = matched only medium/low-signal, OR an incidental/low-coverage high-signal token. **Body-only / incidental → `partial`, never `none`** (a flagged weak best-fit must beat a bare empty that hides it).
  - `none` = **zero salient-token matches in any field after stop-word + common-term normalization.** The stop-word list is **owned and versioned** (otherwise the `partial`/`none` line drifts silently).
- Coverage denominator = total salient query tokens.

> **Amendment (2026-10-13) — the alias-hygiene re-run: an authoring check on every `aliases:` change, on BOTH sides (no tier, rank or signal-class change).** Ruled by Peter (2026-10-13, the class option of the Stage 1 follow-ups: `.kiro/issues/2026-10-13-discovery-study-stage1-followups.md` row 6); authored by Thurgood as owner of the docs rubric.
>
> **What changed.** Any PR that adds, changes or removes an `aliases:` entry on a served doc, or on a component, must run a re-run and report it in the PR body before the alias lands. Nothing else changes: the tier rule, rank order, signal classes and stop-word list are all untouched.
>
> **Scope: both sides.** The rule covers a served doc's frontmatter `aliases:` (high-signal on the docs side, so one alias token can lift a doc to `strong` anywhere it appears in a query) and a component's `aliases` set (low-signal on the components side per Req 1.9, so it cannot reach `strong` alone, but still moves rank and `partial`; that set is not populated today). It does not cover matcher code changes (indexer, tokenizer, rank); those are measured under their own issue, against the oracle plus a FRESH query set — see the spent-set caveat.
>
> **The re-run (decidable without consulting the rule's author).**
> 1. Run `npx tsx scripts/discovery-study-stage1.ts` (the oracle + the frozen Q2 fixture, both read-only) twice: at the PR head and at the PR's merge-base on `main`.
> 2. Compare the per-query tables of the two runs.
> 3. Until a components discovery fixture exists, a component-alias PR also runs the Spec 121 calibration tests: `cd application-mcp-server && npx jest src/__tests__/tool-boundary.contract.test.ts`, which must stay green.
> 4. Once a components fixture exists, its calibration queries join step 1.
>
> **The PR body states:**
> - the command and both SHAs (head and merge-base);
> - **oracle** PASS / WEAK / MISS identical and rank-1-strong not lower;
> - **Q2 not regressed**: no positive that is at rank ≤ 2 at the merge-base falls outside rank ≤ 2 at the head, and R@1 / R@2 are not lower;
> - **no new confident-wrong**: no Q2 negative that is correct at the merge-base has a `strong` in its top 3 at the head (F6 bound).
>
> **A regression or a new confident-wrong blocks the alias until the PR body names each affected query id with its explanation.** Peter's merge accepts or rejects that explanation. The re-run is evidence for the merge decision; it is not a required check (see Status).
>
> **Why.** In Stage 1 (run at `08fed8984`, findings `.kiro/docs/discovery-study-stage1-findings.md` § 6.4), KE-N2 was a confident-wrong: `component-development-guide` came back `strong` at rank 1 for an unrelated strict-none negative ("swiftui navigationstack pattern designerpunk navigation component spec"), with `matchedOn` including `aliases:navigation`. That alias was seeded in 119-A from the oracle's alias-seeding worklist (concept "focus management keyboard navigation") to lift one query. An alias is a high-signal token with corpus-wide reach, and that cost is invisible without a re-run.
>
> **Status: an owner knob, recorded as a dated amendment; no ballot.** § "Tunability & Calibration" makes the field signal-class assignments and the stop-word list the owner's knobs. This adds an authoring check on one Layer-1 field's input; it changes no tier.
> - **The one condition that would need a ballot:** making the re-run a **required CI check context**. A new required context is outside the CI regime's standing scope (ballot `2026-09-27-ci-regime-standing-scope`) and needs its own ballot.
> - Until then it is a PR-body convention, read at Peter's merge and at claims passes.
>
> **Spent-set caveat (binding on every later reader).** Q2's results have been seen, so **Q2 is spent as a tuning target for the MATCHER**: no indexer, tokenizer or rank change may be tuned against it or justified by it. **Q2 remains valid as a regression guard for ALIAS additions**, because an alias touches only doc or component frontmatter, never the matcher. Each Q2 item an alias was written to fix is spent for that alias's own evaluation; the guard is about everything else not moving. The oracle carries the same dual status: it is the matcher's training set (findings § 2), and it is a regression guard.
>
> **First uses (the gate).** Hand-fix rows 1–3 of the follow-ups record wait on this amendment landing: DA-02 (Lina, `component-development-guide`), DA-11 (Lina, `platform-implementation-guidelines`; her alias is untested), DA-05 (Thurgood, `test-development-standards`). **Lina's DA-02 alias PR is the first use.** An alias PR without the re-run statement is a finding at the issues walk (follow-ups record, "What the walk checks").
>
> **How checked (at authoring).** The runner, fixtures and baseline exist on `main`: `scripts/discovery-study-stage1.ts`; `scripts/__fixtures__/discovery-q2-seats.ts` (36 positives / 8 negatives); the Stage 1 baseline at `08fed8984` (oracle 83/0/0 and rank-1-strong 77/83; Q2 R@1 18/36, R@2 23/36; negatives 6/8 correct). The runner's own integrity checks (verbatim strings, oracle byte-identical to `main`) still apply to each re-run.

> **Amendment (2026-10-13) — deep headings (H3/H4) through a co-occurrence gate, plus fence-aware headings (a field/signal-class change; the tier rule is untouched; TIERS MOVE AT MERGE).** Ruled by Thurgood as owner of the docs rubric (the "field signal-class assignments" knob, § "Tunability & Calibration"). Executed under the issue-row grant of `.kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md` (#322); measured by the pre-registered fresh blind set (`.kiro/docs/discovery-indexer-fix-findings.md`).
>
> **What changed.**
> 1. **Fence-aware headings.** `##` / `###` lines inside fenced code blocks are no longer indexed as section headings: they are example content, not structure. `get_section`'s `sN` ids are untouched (`section-parser.ts`); renumbering them is a separate addressing-conventions pass.
> 2. **Deep headings.** H3 and H4 headings (outside fences) enter the match surface through a **co-occurrence gate**:
>    - for each doc, only the SINGLE deep heading containing the most distinct salient query tokens is considered (the first in document order on a tie);
>    - it counts only if it contains **≥ max(2, min(3, salient query tokens))** of them, so a one-token query never passes, a two-token query needs both, and three or more need three;
>    - a passing heading is a **high-signal** field with its own evidence class, **`matchedOn: subsections:<token>`**, last in the high-signal order, so a token already credited to the title, an H2, the description, purpose or an alias is not re-credited.
> 3. `deriveMatchConfidence` is unchanged. A gated deep heading that holds every salient token is an "exact multi-token title/heading match", exactly as the tier rule already reads.
>
> **Why the gate, not plain H3 indexing.** In Stage 1's exploratory counterfactual (findings § 6.7), indexing every H3 as a plain high-signal field let one query's tokens scatter across dozens of generic H3s in a large doc. That inflated coverage and outranked the right doc:
> - KE-06 / DA-06 lost `test-behavioral-contract-validation` to the "behavioral / contract / validation" H3s of platform-implementation-guidelines, test-development-standards and stemma-system-principles;
> - SP-05 lost `test-development-standards` to component-development-standards' "structure / naming" H3s;
> - KE-03 lost `token-family-accessibility` to token-family-responsive's "touch target" H3;
> - the oracle concept "base variant inheritance patterns" fell from rank 1 to 12 behind the component-family docs' scattered H3s.
>
> Lower weights and dropping headings shared across docs did not fix the scatter (oracle still 82/83). Requiring the tokens to co-occur in ONE heading does: oracle 83/83, rank-1-strong 77, chosen on the oracle alone.
>
> **Evidence.** All four plain-H3 regressions are pinned by `mcp-server/src/query/__tests__/find-docs-deep-headings.corpus.test.ts`, a guard and not a tuning target. The gate math is pinned by `find-docs-deep-headings.test.ts`. Result lines: the fix findings §§ 2–3.
>
> **Tiers move at merge** for queries whose answer is a deep heading. That is the intent. The PR body says so for Peter's merge.
>
> **What would need a ballot:** changing the three-tier vocabulary or meaning, or emitting a score. Neither happens here.
>
> **Known open question (after the fix's final line):** in this corpus, fenced headings are often the ANSWER — templates such as the Implementation Report and the Instruments block. Fix 1 removes them as designed. Whether fenced template headings should come back at a lower class is the owner's design question, recorded in the fix findings.

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
- Multi-owner ties (e.g. "WCAG contrast" → two `strong` docs) are a Layer-3 concern: the tool may not break the tie; the agent/human does. Where a tool's sort ends in an alphabetical step (`find_components`: by component name), that step is a **fixed display order** for genuinely co-equal rows — so the output is deterministic — **not** a relevance judgment; co-equal rows remain a tie for the agent/human to break.

> **Amendment (Spec 119-A, 2026-06-29) — `find_docs` title rank tie-breaker (Layer-3 RANK only).** Within a tier, a query token that hits a doc's **title** now contributes a small fractional rank bonus (`< 1`, the inter-tier gap) above the same token hitting `sections`/`description`/`purpose`/`aliases`. Rationale: a doc that **is about** a token (title) is a stronger *match-strength* signal than one that merely **mentions** it (a section/description), so it should out-rank on usability. This **sharpens** "rank by match-strength" (above); it does **not** add a tier or change `matchConfidence` — `deriveMatchConfidence` is untouched, so Layer-1 and the §Collision field separation are unaffected. It only breaks **exact** ties (the bonus is smaller than any coverage/tier difference), so a higher-coverage or higher-tier match always still wins. The "tool may not break the tie" rule above still holds for **genuine co-equal** matches (e.g. two docs that both carry the query in their *titles* remain tied → agent judges). Discovered via the 119-A discovery dry-run gate (Req 13): four generic family/concept queries were `strong` but stuck at rank 3–4 because the intended doc's title-match tied with an incidental section/description mention and ties fell to directory order. The tie-breaker cleared the gate (83/83 reachable at rank ≤ 2) and lifted rank-1-strong corpus-wide 69.9% → 94%, with Spec 121's calibration fixtures still green (rank-only change). Pinned by a guard test.

> **Amendment (2026-10-12) — `find_components` tier-aware rank with an own-name tie-breaker (Layer-3 RANK only).** Ruled by Thurgood, executed by Lina; source: `.kiro/issues/2026-10-07-find-components-lexical-and-metadata-defects.md` item 3. **What changed:** keyword results previously sorted by coverage, then name — tier-blind, so a `partial` could outrank a `strong` and every tie fell to the alphabet. The order is now: **(1) tier** (`strong` before `partial`), **(2) coverage** (`matchedTokens / totalTokens`, descending), **(3) own-name hit** (count of matched query terms that are tokens of the component's **own** name — family tokens do not count, since a family-only hit ties every sibling), **(4) name** (the fixed display order — see the multi-owner-ties bullet above). Step (1) is not an amendment: this section already says the tool ranks "within a tier"; the old sort was out of line with it. Step (3) **is** the amendment, and mirrors the `find_docs` title tie-breaker above: coverage stays ahead of it, so it only breaks ties that tier and coverage leave standing (for single-token queries coverage always ties, so the name hit decides — "tabs" → Nav-TabBar-Base). **Rank-only:** `deriveMatchConfidence` is untouched; no tier changes, no new surface emits `matchConfidence`. **Reproductions it fixes** (with the same change set's stop-word / plural / category normalization): "tabs" → Nav-TabBar-Base rank 3 → 1; "loading spinner while data fetches" → the `partial` Avatar-Base no longer outranks the `strong` rows. Spec 121 calibration fixtures (`tool-boundary.contract.test.ts`) stay green. Pinned by a guard test (`Stage0LexicalFixes.test.ts` — "GUARD: rankCompare order is tier, then coverage, then own-name hit, then name").

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
