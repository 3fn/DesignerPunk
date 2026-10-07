# Discovery Signal Architecture — Greenfield Assessment

**Date**: 2026-10-07
**Purpose**: Record the orchestrator's answer to Peter's question "if we didn't have `matchConfidence` and were choosing a direction — lexical tier, a discriminative model such as Jev, or a hybrid — what would you recommend?" Captured at Peter's direction alongside the discovery shadow-study charter.
**Organization**: working-document
**Scope**: cross-project
**Status**: orchestrator's assessment, unreviewed by owners. The rubric-as-evidence idea in § 4 touches Lina's and Thurgood's rubric surfaces and is recorded in the study charter as a CANDIDATE pending their read, not as a proposal.

---

## 1. What the signal is for decides the answer

`matchConfidence` exists to tell an agent whether to act, propose, or ask (the certainty-calibration protocol, Spec 119 Decision 4a; register row `certainty-calibration`). For that use two properties matter:

1. **The agent can see why** — so it reasons about the match rather than trusting a label. (Spec 121's P5 reconstructability.)
2. **"strong" is right more often than "partial"** — calibration.

The lexical tier delivers (1) by construction (`matchedOn` + coverage) and has never measured (2). A discriminative model delivers a measurable (2) and nothing of (1). Neither alone is safe; see § 5.

## 2. Why "model for confidence, agent for context" inverts a dependency

A bare probability gives the agent nothing to contextualize with except the number. "0.83 for Chip-Filter" is not evidence; the agent re-reads the candidate to form its own judgment, so the model has done candidate generation at vendor cost and the agent has done the judgment anyway. Confidence without evidence is not contextualizable. The fix is § 4.

## 3. Greenfield recommendation (this repo's scale: 34 components, 83 served docs, LLM agents as the consumers)

- **Invest in metadata quality and a frozen fixture WITH NEGATIVES before choosing a matcher.** The 2026-10-07 consults showed the matcher is not the bottleneck: copy-pasted sibling text and a missing stopword filter defeat every matcher equally, and no components fixture existed to catch either. Every option is bounded by metadata quality. If starting over, the fixture is the first commit.
- **Candidate generation: lexical or local-embedding, deterministic, offline, with evidence attached.** The consumer is already an LLM; semantics in the matcher duplicates capability the consumer has, at the cost of determinism, offline operation and CI-testability against frozen fixtures. At 34 components an agent reading the ~1.7k-token catalog beats any matcher (Leonardo's actual practice).
- **Judgment: a typed rubric** (§ 4), asked of a discriminative model where available and worth it, otherwise asked of the agent itself with the same questions. Same contract either way; the answerer is swappable.
- **The agent contextualizes with both evidence layers**: why the candidate surfaced, and which rubric questions it passed or failed.

**When to go discriminative from day one**: product-scale catalogs (hundreds of components) where reading the catalog stops working and candidate quality dominates; consumers that are not LLMs (a CLI, a design-tool query); a need for MEASURED calibration; an organization that accepts a hosted dependency. This describes a large enterprise design system more than it describes this repo.

**Alternatives worth naming**: agent-only (no matcher; viable at this scale); local embeddings (semantics without a vendor; deterministic given a pinned model + hash; the nearest chunk's field is partial evidence); a schema-constrained Claude call as the classifier (already in the loop, more per call, zero new dependencies); Jev (cheapest per call, hosted, vendor-owned lifecycle).

## 4. Rubric-as-evidence (the hybrid worth building)

Instead of one verdict per candidate, the model answers a small fixed rubric of typed yes/no questions per candidate, each returning a probability:

- Does the candidate's `purpose` address the query?
- Does the query name a deciding detail (e.g. "email", "back button") that the candidate lacks?
- Is the candidate internal-only / not for direct product use?
- Does the candidate's own `whenNotToUse` exclude this query? *(extension only — whenNotToUse is outside parity)*
- Does ANY candidate exist for this query at all? *(the gap question — Leonardo's harm case)*

The per-question answers ARE the evidence. The tier is derived from them by pre-registered thresholds — tiers, not scores, preserved. "Nothing exists" is a first-class answer. The rubric questions are owned the way the lexical rubric is owned (Lina components, Thurgood docs); the answerer (Jev, a local model, the agent) is swappable. TypeSafe's RAG-passage cookbook has this exact shape (four Noul questions per passage, thresholds routing).

**Cheaper scoring**: do NOT key per-question answers (that doubles the keying cost). Score only the DERIVED tier/rank against the same Q2/Q3 answer keys; treat the per-question answers as the reported evidence, inspected on split cases only.

**Scope risk, stated**: this is a judgment layer, not a matcher; it answers a different question from the study's Jev-as-matcher arms. Adding it to a study three owners already said may not be worth running past Stage 1 is scope creep unless it DISPLACES the listwise arm rather than joining it. Recorded in the charter as fork F9.

## 5. What survives

- Lexical reconstructability is partly an illusion when the tokenizer is broken: "strong because the word 'a' matched" is fully reconstructable and fully wrong. Seeing why without knowing how often you are right is false comfort.
- The discriminative side has the mirror problem: the vendor makes no calibration claim; confidence is a distribution-shape statistic ((p_max − 1/n)/(1 − 1/n)); a result is tied to one model version on one date.
- Neither path is safe alone. The frozen fixture with negatives is what makes either one safe, and it is the piece the current design never built on components.

## 6. Related
- `.kiro/issues/2026-10-07-discovery-shadow-study-charter.md` — the study (F9 = this doc's § 4 as a candidate arm)
- `.kiro/issues/2026-10-07-find-components-lexical-and-metadata-defects.md` — the live defects
- `.kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md` — the current rubric (tiers, not scores; P5)
- `governance/classification-map.md` § `certainty-calibration` — the agent-side protocol the signal serves
