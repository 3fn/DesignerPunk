# Design Document: Capability Catalog, Routing & Measurement (119-B)

**Date**: 2026-07-19
**Revised**: 2026-08-01 (design-R2 incorporation — see feedback/design.md [THURGOOD R2])
**Spec**: 119-B - Capability Catalog, Routing & Measurement
**Status**: Design Phase
**Author**: Thurgood
**Requirements**: `requirements.md` (R3-current, CLOSED 2026-07-18, 4/4 reviewer confirmation)
**Design inputs**: the staged design-phase record (`feedback/requirements.md` [THURGOOD R2] § "Recorded for the design phase", plus [ADA R2/R3], [LINA R2], [STACY R2], [LEONARDO R2]) — every staged intent is dispositioned in § "Staged-Intent Disposition" below.

---

## Overview

119-B is a content-layer spec operating through the 122 generator: audit + gap-fill + precision work on the generated capability catalogs and routing tables, the certainty-calibration formalization, the measurement case study, and the OB-1 indexer unit. This design specifies HOW each requirement is met: the audit methodology and its findings artifact, the promotion rubric, the concrete 118 rows, the calibration design (register row → prose refinement → propagation), the case-study method, the OB-1 technical approach, and the regen-batching mechanics. No new generator machinery, schema changes, or output classes (R6 AC3); the only code work is OB-1's indexer change, isolated in its own parallel merge unit.

---

## Architecture

### Execution shape (units per scope pass § 7.3, with parallelization)

```
U1 (paper, window-free)     U2 (read-only)        U3 (corpus, measured)      U-final (canonical edits + ONE regen)
R1 register row             R3 case study    →    R4 alias prune             R6/R7/R8 edits land + regen
R2 OB-4 threshold                                 → R5 snippet sweep
        │
        └────────── OB-1 unit (R9): parallel from start — mcp-server code only, zero window/corpus interaction

PAPER-WORK OVERLAP (Leonardo's observation, designed in): the R6/R7 AUDIT work — inventory,
findings, promotion decisions — is window-free analysis producing the findings artifact. It MAY
run in parallel with U2/U3 (tasks live in the U-final unit; the findings doc merges with U-final).
Only the CANONICAL EDITS + REGEN are ordering-bound (post-U2/U3, one regen event, R10 discipline).
```

Ordering invariants preserved: R3 completes before any R4/R5/R8 corpus edit merges (R11 AC2); the R1 register row is the ratified pre-measurement exception with the shadowing check (R11 AC2); OB-1 has no dependency on U1–U3 and no corpus/window interaction.

**U-final branch mechanics (mixed unit — stated so tasks.md declares it, not drifts into it)** [Stacy dR1]: the U-final unit branch is created EARLY from `main` for the window-free paper work (audit tasks, findings drafting — commits are the off-machine backup of accumulating analysis); BEFORE any canonical edit lands on it, the branch is updated from `main` AFTER U3 merges. This deliberately departs from Task-Completion-Protocol's dependent-unit default (branch after prior merge): the paper tasks have no U2/U3 dependency, the edit tasks do, and the update-from-main gate is the declared seam between them. tasks.md SHALL declare this mechanic with the unit.

### Change-flow architecture (everything through the generator)

All catalog/routing/propagation changes: canonical agent source → `npx tsx tools/agent-generator/generate.ts` → sweep-1 → diff-guard → PR. Never hand-placed artifacts. Corpus doc changes (AICP, classification-map, family docs, governance snippets): direct doc edits → docs-MCP `rebuild_index` in the same task (R11 AC5).

---

## Component 1: Catalog & Routing Audit (R6 + R7 audit half)

### Methodology

Per-agent pass over all 8 generated prompts (`.claude/agents/*.md` + Kiro equivalents), re-measuring route counts at task start (D1). Three dimensions per R6 AC1:

1. **Coverage** — task classes with named-but-unrouted targets. Method: walk each prompt's prose sections for named laws/docs/protocols lacking a routing row (Leonardo's four seeds below are the worked examples of the class); walk the agent's requirement/domain surface for recurring task classes with no route.
2. **Content quality** — precision (generic cue vs promotable, per the R7 rubric in Component 2), currency (targets resolve; stale names).
3. **Content-class fit** — routing rows in Routing, rules in ambient/prose, commands invocable. Any rule-shaped entry in Commands (Leonardo's leonardo.md example — and note the same pattern exists in thurgood.md's Commands: the ballot-verification entry) is flagged for reclassification to the correct ambient class in canonical source.
4. **Cross-section coherence** (Lina's intent, designed in as a named checklist item): per agent, check alignment of knowledge-fallback ∩ write-scope ∩ routing — a write-scope root with no fallback/routing coverage, or routing into surfaces outside the agent's domain, is a finding (gap or intentional — the disposition is the domain owner's call, recorded either way).

**Initial audit seeds** (inputs, not findings — the audit dispositions them): Leonardo's four (un-routed integration guide in Onboarding Awareness; un-routed Product Handoff Protocol; cross-platform-review reference material; the rule-shaped Commands entry). Ada's thirteen token-family generic rows (ada.md:396–408, re-measure). Lina's ~25 named-topic/bare-THEN rows.

### Findings artifact (R6 AC6)

`.kiro/specs/119-B-capability-routing-measurement/findings/catalog-routing-audit.md`, one section per agent:

```markdown
## <agent>
- Inventory: <N> routing rows (re-measured <date>; prior figure <M> from <source>)   ← D1 evidence
- Coverage gaps: | task class | named target | disposition (route-added / no-route-needed /
    target-missing-from-corpus) | proposed target + grade (a/b) | owner confirm (date+method) |
    resolve-verified (date) | why |
- Class-fit findings: | entry | current class | correct class | disposition |
- Coherence findings: | surfaces | mismatch | owner ruling |
- Promotion table: | row | current THEN | disposition (a/b/c) | criteria applied (incl.
    flow-position evidence: which workflow step / task class the row serves) |
    owner confirm (date+method; self-owned = recorded self-confirmation, never blank) |
    resolve-verified (date) | rename-risk / accepted-risk note ((a)-grade rows) |
```

Schema rules [design-R1 incorporated]:
- **Route ADDITIONS get the full promotion discipline** (Leonardo): a coverage-table `route-added` disposition is the same defect surface as a promotion — it runs the Component 2 grade choice ((a)/(b), (b)-default), pre-regen spot-verify, and owner confirmation; hence the added columns. R7 AC4's never-land-unverified rationale applies identically.
- **`target-missing-from-corpus`** (Leonardo) is a first-class third coverage disposition: the named target does not exist in the MCP corpus (his Product-Handoff-Protocol seed is the expected case) — routed to the doc's domain owner as a corpus gap, never collapsed into a silent `no-route-needed`.
- **Rename-risk column** (Stacy): every (a)-grade row records its R7 AC5 disposition — mitigation deferred to OB-1's addressing work, or accepted risk with the owner's attestation cited.
- **Pre-dispositioned entries**: the 4c calibration cue is entered in the class-fit table as a deliberate cue-class entry at design time (Ada) — the audit must not flag the row this spec itself adds.
- **Worked (a)-argument on record**: Leonardo's `contract-system-reference` Concept Catalog row (artifact-named heading, load-bearing section, mid-workflow Step 3) is carried in the findings as the calibration example for the (a) bar — if the rubric can't grant (a) there, the bar is miscalibrated.

Non-promotions are recorded with rationale (R7 AC3) — the artifact is the auditability surface Stacy's High required; every SHALL in R6/R7 is verifiable against it.

---

## Component 2: Promotion Rubric (R7 AC3 mechanics)

**Entry test** (Lina's definition, requirements law): promotable IF the THEN clause lacks a resolvable route target AND a determinate target exists — WHEN-clause topic-naming is irrelevant.

**Disposition criteria** (Leonardo's three, now the rubric; c.3 amended per his design-R1 stress-test):
1. **Doc determinacy** — does the WHEN clause imply exactly one doc? No → (c) leave-as-is.
2. **Flow position** — mid-workflow (hit during task execution) → promote; occasional/exploratory → (c) is acceptable, promotion value low. Evidence convention (Lina): the finding's criteria-applied cell records WHICH workflow step / task class the row serves — flow position is evidenced, not vibes.
3. **Pair-pattern recognition** — a generic cue that is the declared escape hatch beside an existing precise route into the same doc: **bars (a)** (the precise sibling already owns the hot section); **(b) is permitted when criterion 1 passes** (the pattern's openness is section-level, not doc-level — a THEN clause naming a path-requiring tool without the path is incomplete, not loose); never forced to (c). Classified as deliberate, never padded. [Leonardo dR1 — R7 AC3 *permits* pair-in-(c); the earlier draft accidentally mandated it]

**Grade choice for promotable rows** (Lina's per-row rubric; stability test + flow-position wiring per Leonardo dR1):
- **(a) full `doc § "Section"`** only when BOTH: the section is **load-bearing** (the row's purpose is that section, not the doc) AND **heading-stable**, satisfied by either of two operational tests: (1) the heading is contract/artifact-named (e.g., "Module-Resolution Contract (Spec 118)", the Concept Catalog) — rename-resistant by construction; or (2) **owner attestation** — the target-doc owner attests, in the owner-confirmation flow, that the heading will not be renamed without a deprecation path; the attestation is recorded in the findings table, making it a record, not a promise. (Replaces the earlier git-history proxy — "last restructure" was undefined archaeology that would have defaulted every deserving row to (b).) Every (a) promotion is spot-verified via `get_section` before the batched regen (R7 AC4).
- **Flow position feeds the grade choice** (Leonardo's option (i)): a mid-workflow row that passes both (a) gates has its (a) case *strengthened* — the hop cost recurs, so precision pays; an occasional/exploratory row takes (b) even when both gates pass. This is the mechanism Decision 2's counterweight sentence claims.
- **(b) doc-id-only** (`THEN consult <doc-id> (summary-first)`) when the doc is determinate but the needed section varies by task, or when (a)'s tests fail. Composes with the summary-first hard rule; adds zero unguarded headings. Verification method (Stacy): each (b) route is resolve-checked via `get_document_summary` before the batched regen — R7 AC4 covers EVERY promoted route, not only (a)-grade.
- Default for promotable rows is **(b)**; (a) must be argued per row in the findings table. This inverts the brittleness risk: precision is opt-in with evidence, stability is the default. (Held under Leonardo's 12-row stress-test: ~8 (b)-correct, 2 (c)-correct, hot-path rows already (a) — the (b) default is calibrated, not under-delivery.)

**Owner-confirmation flow** (R7 AC6 / R6 AC5): promotion candidates grouped by target-doc owner → owner receives their batch (list format: row, proposed disposition, proposed target) → owner confirms, amends the section choice, attests heading stability (the (a) test's second satisfier), or rejects → recorded in the promotion table **with date + method** (session / feedback round) — confirmation without a when-and-how is the unauditable "flagged" R4 AC5 closed (Ada). **Self-owned promotions** (an agent's row targeting the agent's own doc) are auto-confirmed but still RECORDED as self-confirmations — never blank cells (Lina). Ada has pre-volunteered for the token-family thirteen with a (b)-expected pre-signal on record. Owner confirmation covers section choice (content correctness) and heading stability (the owner controls renames).

---

## Component 3: The Two 118 Routing Rows (R7 AC1 concrete content)

Both land as canonical-source edits, batched into U-final; targets spot-verified at landing.

**Thurgood's row** (canonical source → thurgood outputs):
```
WHEN a test-governance or health-check question touches the module-resolution surface
(CI-enforced guards, the Civitas close-state guard) THEN consult
test-development-standards § "CI-Enforced Guards"
```
Heading per the 118 Task-11 additions; exact heading spot-verified at landing (R7 AC4) — if it fails the (a) stability test at that point, the row downgrades to disposition (b) (`consult test-development-standards, summary-first`) rather than landing a brittle target.

**Lina's row** (her recorded intent, verbatim shape — ONE row, authoring-seam WHEN):
```
WHEN authoring or modifying a component .tokens.ts file and the return-value/brand
contract is in question THEN consult rosetta-system-architecture
§ "Module-Resolution Contract (Spec 118)"
```
Grade (a) is justified here: the section is contract-named (spec-stamped heading, rename-resistant), verified resolving today (V8) and re-verified at landing. Design explicitly does NOT expand this into a cluster — one row is the deliverable (inbound-from-118: "lighter").

**Two findings annotations for Lina's row** (her design-R1 owner rulings, recorded so future audits read them as deliberate):
1. **Ambient composition**: the conditioned WHEN ("…and the return-value/brand contract is in question") serves the AWARE seam; the unaware-agent failure mode is covered unconditionally by the always-loaded DesignerPunk-Systems-Overview Pointer 1. The findings entry records this composition so the conditioned WHEN is never misread as a coverage gap.
2. **The s18 adjacency**: the brand contract's *mechanics* live in the adjacent § "Cross-Boundary Invariant & the Brand Contract (Spec 124)" (s18); the designed s21 target is kept per Lina's owner ruling (s21 carries the by-value principle + the extensionless-CJS authoring rule firing at the same seam; retargeting would narrow the row). The adjacency is recorded in the findings table under the R7 AC5 heading-risk note (both headings spec-stamped, both stable).

Ada's existing row: re-verified present + resolving at the same landing task (R7 AC2); no content change.

---

## Component 4: Calibration Formalization (R1 + R8)

### 4a. Register row (R1, U1, window-free)

Entry in `governance/classification-map.md`, entry-id **`certainty-calibration`**, templated on `record-first-ratification` (multi-surface education-heavy rule). Content sketch (the row itself is drafted at the task, ratified by Peter as the second eye):

- **Rule**: discovery-time certainty calibration — strong/partial/none; search before guessing; surface when unsure; human go/no-go on partial/none.
- **Boundary call**: education-owned. The rule governs judgment at discovery time; CI validates function, never ideology — there is no mechanical predicate for "calibrated well."
- **Verification**: `none`. No CI hook. (A narrow future hook — e.g., a prompt-lint asserting the pointer's presence in generated outputs — is noted as possible, not adopted; it would verify delivery, not compliance.)
- **Education**: `KEEP` — durable, specific-but-stable by the churn-rate test; canonical prose lives in AI-Collaboration-Principles; delivery surfaces: Kiro always-load + CLAUDE.md `@`-import + the U-final pointer cue (4c).
- **Trigger scope** (from R8 AC5, recorded in the row): discovery-time uncertainty about where guidance lives — not a general epistemic protocol.
- **Signal scope** (from R8 AC3): surfaces emitting `matchConfidence` (currently `find_docs`, keyworded `find_components`); signal-less surfaces out of scope, `search_tokens` gap routed to Ada's issue file.
- **Canonical enumeration home** (Ada dR1 — the fork guard): THIS field is the single canonical home of the emitting-tools enumeration. The AICP settled reference (4b) and the generator snippet (4c) carry AC3's "enumeration illustrative; signal emission is the operative test" hedge and cite this entry rather than independently asserting the list. The row's notes record the update trigger explicitly: *a new tool emitting `matchConfidence` updates THIS field; citing surfaces inherit (hedged) or are touched in the same edit* — the three-surface fork is closed by designation plus trigger, not by memory.
- **Attribution** (R1 AC3; Stacy dR1 residue): the row carries drafted-by/landed-by per the steward-writes-register convention (both Thurgood for this governance-layer rule; Peter's ratification is the recorded second eye).

### 4b. AICP prose refinement (post-U2 ordinary PR; R8 AC1/AC2/AC4)

Refine-not-rewrite, three surgical changes to the "Certainty Calibration" section:
1. **Discharge the forward-compat note** by fulfilling it: the note promised "119-B formalizes against the signal" — replace it with a one-line settled reference (rule formalized per the `certainty-calibration` register entry; signal contract: `matchConfidence: strong|partial|none`, `viability`/`rank` separate, never collapsed). This is the note completing its own design, but it IS a removal → **blade verdicts recorded** (teaching blade: its teaching content is superseded by the settled reference; volatility blade: it names spec numbers and a pre-signal state — volatile by construction). Recorded per `pilot-row-assessment.md`'s format.
2. **Name the signal precisely** where the prose currently paraphrases ("mirrors Spec 121's shipped matchConfidence") — cite the emitting tools per the signal-scoped boundary, with the illustrative hedge, citing the register entry as the canonical enumeration home (4a). **Overlap note** (Ada dR1): the paraphrase lives INSIDE the note change 1 discharges — changes 1 and 2 share one removal; the blade-verdict record and the edit diff count it once, with change 2's residual scope being step 2's unnamed "match strength" wording only.
3. **Preserve verbatim-in-substance**: the 3-step structure, the trigger phrase ("unsure where guidance lives"), the strong/partial/none semantics, the go/no-go contract. These are the refine-not-rewrite invariants; the design treats them as frozen anchors.

Not a window trigger surface; measurement-gated only (merges after U2, before or with U-final).

### 4c. Propagation (U-final; R8 AC3, Ada's pointer expectation)

**Design: one generated pointer cue, single canonical snippet, zero restated semantics.**

A single canonical snippet defined ONCE in the generator's shared canonical source, rendered into each agent's routing/cue block:

```
WHEN discovery returns matchConfidence partial or none (find_docs; keyworded
find_components) THEN apply the certainty-calibration rule (AI-Collaboration-Principles)
before acting
```

- Tier semantics are NEVER restated per-agent — the pointer names the trigger and routes to the single source (Ada's expectation, adopted as a hard design rule).
- Drift risk collapses to the generator SSOT: 8 rendered instances of one snippet, diff-guarded.
- Signal-scoped by construction: the cue names the emitting tools (hedge-covered, citing the register entry's canonical enumeration — 4a); agents' signal-less surfaces are simply not mentioned (the "staying silent" option of R8 AC3).
- **Empty-result trigger verified, re-probe designed in** (Ada dR1): `find_docs` on a zero-hit concept returns `data: []` WITH top-level `matchConfidence: "none"` (probe 2026-08-01), so the cue's trigger covers the empty case — but this is response-shape behavior, not documented contract; the U-final landing task's spot-verify re-probes it and records the result in the findings (one line), so a future server change can't silently strip the trigger's most important case.
- **Class-fit pre-disposition**: the cue is entered in the audit's class-fit table as a deliberate cue-class entry (Component 1) — the audit does not flag the row this spec adds.
- **Rejected alternative — zero propagation** (Ada's "or nothing"): the always-layer already delivers the rule, but the silent-failure discriminator argues for a discovery-adjacent cue: the rule fails silently precisely at the moment a `partial` result tempts an agent to proceed; a cue at the routing surface is the cheap mechanical nudge. Counter-argument honestly held: it is 8 more generated lines whose value is unproven — if the design round judges it noise, zero-propagation is the fallback and loses nothing already delivered.

---

## Component 5: Measurement Case Study (R3, U2)

**Method**: run `scripts/discovery-dry-run.ts` against the frozen oracle (`scripts/__fixtures__/discovery-oracle.ts`) on the current corpus — read-only, no corpus writes. The oracle is the non-circular "before" anchor; the current run is the "after."

**Attribution ladder** (IN-1, mandatory): report as floor 54.2% → alias lift → title tie-breaker 94% rank-1-strong; the current run extends the ladder (94% → current). Any delta vs. 94% is attributed to corpus changes since 10.4 — which is why U2 precedes U3 (the delta stays attributable to 119-A-era state, not 119-B's own churn).

**Findings artifact**: `findings/measurement-case-study.md`:
1. Method + anchor provenance (oracle frozen 2026-06-29; never-navigation warning restated) — **including the coverage-boundary statement** (Leonardo dR1): the method section states whose discovery surfaces the oracle exercises (axis a: the meta-guide's map concepts; axis b: agent-domain queries for ada/lina/thurgood/leonardo only — product-agent-shaped queries are limited to Leonardo's two entries), so consumers do not over-read the headline number onto surfaces the fixture never asks about. Report-the-boundary, never extend-the-fixture.
2. Before/after tables per oracle axis (map-concept, agent-domain), rank + confidence per entry.
3. Attribution ladder with per-step evidence.
4. **Register-row shadowing check** (Stacy's rider, R11 AC2 home): enumerate the `certainty-calibration` row's text tokens against all oracle concept strings; report any keyword overlap and whether any oracle query's result set ranks `classification-map` above a WEAK threshold. Result recorded alongside the pre-measurement note — expected null, verified not assumed.
5. **OB-4 input section**: the run's rank-distribution evidence (how many strong-but-rank>2) feeds R2's threshold decision — the case study is deliberately sequenced so U1's OB-4 decision CAN be revisited with fresh data if the paper decision and the measured distribution disagree (revisit is a recorded amendment, not silent). **R2 AC3 step designed in** (Stacy dR1 residue): IF the U1 decision (or a U2 revisit) changes the gate THEN updating the dry-run harness's gate assertion is an explicit step of that deciding task, completed before any task depends on the gate clearing.

D1 discipline: all counts in the findings carry measurement dates; the fixture is never edited.

---

## Component 6: OB-1 Technical Approach (R9, parallel unit)

### Decision: extract-then-validate on the existing post-index hook (a two-pass design, not query-time resolution)

**Chosen architecture:**
1. **Extraction (parser, stays mechanical)**: `extractCrossReferences` gains a second candidate class alongside `.md` targets: a link target is a **bare-id candidate** IF it matches `/^[a-z0-9][a-z0-9-]*$/` AND contains no `/`, `.`, `:`, or `#`. Candidates are tagged (`kind: 'id-candidate'` vs `kind: 'path'`); the parser validates NOTHING — it stays a dumb regex extractor, preserving its property-test surface (existing `.md` behavior unchanged).
2. **Validation (indexer post-pass)**: `DocumentIndexer.indexDirectory` already runs a post-index re-seed step after all files are indexed and `idIndex` is complete (the Task 3.2 legacyPathIndex re-seed — DocumentIndexer.ts:124). A validation sweep joins that same hook: each `id-candidate` is checked against `idIndex`; hits become real cross-references (target normalized to the doc id); misses are dropped from the cross-ref set. **Dropped-candidate visibility** (Ada dR1 — her characterization accepted: anchors/URLs/paths never reach validation, so what misses is precisely bare-id-shaped LINK targets resolving to nothing — the most typo-suspicious class post-R5): dropped candidates are surfaced on TWO channels at matched cost — (i) the scanner's output lists them individually (opt-in detail), and (ii) index-health emits ONE aggregate warning if the drop count > 0 ("N unresolved bare-id link targets — run scan-cross-references.sh for the list"). The aggregate form puts the signal on the daily-consumer channel without per-item noise accumulation; the drop behavior itself is unchanged. [Owner call — middle path between Ada's warnings preference and her scanner-only compromise]
3. **Single-file reindex**: `reindexFile` runs against a standing, complete `idIndex` — candidates validate inline; no special casing beyond using the same validation function.
4. **Scanner repoint**: `scripts/scan-cross-references.sh` globs `governance/*.md` + `.kiro/steering/*.md` (both roots — 9 identity docs remain in steering).
5. **D5 normalization**: `list_cross_references`' document parameter resolves through the SAME resolver strategy chain as `get_document_summary` (id → legacy path → relative path), and the tool description documents the contract. One resolution path for all document-addressed tools.

**Why not query-time resolution** (the alternative the ledger named): query-time validation spreads correctness across every consumer (`list_cross_references`, `get_document_summary.crossReferences`, index-health metrics) — each query re-filters candidates, counts become query-dependent, and two consumer paths must stay consistent forever. Index-time validation gives ONE validation point, deterministic health metrics (`crossReferences` count is a stable index property), zero per-query cost, and it reuses an existing architectural hook rather than inventing a pass. **Why not a frontmatter pre-scan two-pass**: restructures `indexDirectory`'s flow for no gain — the post-index hook achieves complete-`idIndex` validation with a strictly smaller diff. **Counter-argument (recorded)**: the post-pass means candidates sit unvalidated inside per-document index entries mid-indexing; if a future consumer reads cross-refs DURING indexing it would see candidates. Accepted: no such consumer exists, indexing is atomic from the API's view, and the candidate tag makes the state explicit rather than ambiguous.

**Tests** (ledger done-when + prove-it-bites): unit tests — bare-id extraction grammar (positive + the false-positive guards: anchors, URLs, paths, code spans); validation drops non-ids; migrated-doc enumeration returns the bare-id refs (fixture doc mirroring token-governance's real pattern); property tests on the parser unchanged and passing; a regression test that `.md` extraction is byte-identical pre/post; **the `reindexFile` accepted edge** (Ada dR1): a single-file reindex of doc A referencing NEW doc B not yet in the standing `idIndex` drops the ref until the next full rebuild — correct under the design, covered operationally by the write-side rebuild protocol, pinned as a test case so it stays an accepted edge, not a surprise. Scanner: a run against both roots exits green and its doc-count exceeds the old 9. Re-probe V6 at unit start; re-count the invisible population (D1) before/after as the unit's own evidence.

**Downstream consequences named** (Ada dR1; Stacy dR1):
- **Health-check attribution**: the `crossReferences` count STEPS UP at landing (the invisible population becomes visible). The unit's D1 before/after re-count is the citable attribution record for the monthly Civitas health check — baseline figures (e.g., the "115 cross-references" cited in always-loaded docs) move because of THIS unit, not drift; the health check cites the unit's completion doc.
- **Closeout checkpoint (R9 AC5)**: WHEN 119-B closeout begins, the OB-1 unit is either MERGED or DESCOPED-BY-RECORD — the checkable gate lives in tasks.md's closeout task, designed here so tasks.md declares rather than reconstructs it.

---

## Component 7: Regen Batching & Log (R10)

**The ONE regen event**: U-final is a single unit branch carrying ALL canonical-source edits (R6 catalog fixes, R7 promotions + two 118 rows, R8 propagation cue, any trigger-surface prose). One `generate.ts` run, one sweep-1, one diff-guard pass, one PR. Budgeted as ONE expected segment event iff `thurgood.md` output changes (§ 7.1.iii — the propagation cue makes that near-certain; budget accordingly).

**The R5 AC3 fold, named** (Stacy dR1 — Component 7 owns the cross-unit mechanic): IF the U3 sweep's inventory finds legacy snippets in `governance/Process-Development-Workflow.md`, those edits are EXCLUDED from the U3 sweep PR and carried as a **named fold-item** into this unit's batched PR (or deferred past window close if the window outlives U-final) — the fold-item is listed in the regen-log notes and in the U-final PR body, so the carve-out is traceable end-to-end (U3 completion doc records the exclusion; U-final records the landing).

**PR review basis** (Lina dR1, adopted — also serves Peter's merge review): the U-final PR body cites `findings/catalog-routing-audit.md` as its content-review basis — every row change in the large multi-agent diff is pre-recorded and owner-confirmed there, so merge review is a conformance check against confirmed dispositions, not a de novo review of ~30 changes across 8 agents.

**Pre-regen gate + log** (`regen-log.md`, format per R10 AC3; prediction/outcome split per Stacy dR1):

```markdown
| # | date | PR | window state (method + result) | thurgood.md changed? | segment predicted? | segment occurred? (post-merge) | notes/rationale |
```

One line per qualifying regen; the window-state cell carries the AC2 confirmation evidence (e.g., "asked Peter 2026-07-XX: window open, 1 segment used" or "dataset read: N=14, segments=1"); `segment predicted?` is filled at regen time (the gate's judgment), `segment occurred?` post-merge (the K=3 audit's fact) — the closeout audit reads the outcome column, the prediction column evidences the gate discipline. A third qualifying regen (over target) adds its rationale in notes (R10 AC1). Log expires with the window (R10 AC6) — post-sunset regens don't log here.

---

## Component 8: U3 Corpus Changes — Prune & Sweep Mechanics (R4 + R5)

*Added at design-R2 (Stacy's High: four settled ACs previously had no designed mechanism).*

### 8a. Alias prune flow (R4)

1. **Re-inventory** (R4 AC1, D1): re-grep the backstop alias population; record prior → current counts (with date) in the task completion doc.
2. **Candidate assembly**: per candidate — alias text, host doc, domain owner, oracle-coverage status (does the alias text map to an oracle concept? — the AC6 bookkeeping, computed against the frozen fixture, never by editing it).
3. **Owner consult** (R4 AC5 — mirrors Component 2's flow deliberately; the requirements-phase asymmetry critique resolved by symmetry of mechanism): candidate-removal list grouped per owner (Ada: token families; Lina: component families) → presented BEFORE the prune PR merges → confirm / object (objection → retain, the default) → recorded with **date + method**. Non-oracle-covered candidates additionally need explicit owner CONSENT to remove (AC6's stricter bar), recorded as accepted residual risk.
4. **Dry-run gate** (R4 AC2/AC3): re-run `discovery-dry-run.ts` with surviving candidates removed; gate clears (no WEAK/MISS) → prune proceeds; any regression → affected aliases retained, retention recorded. No partial prunes merge.
5. **Evidence home**: `findings/alias-prune.md` (the THIRD findings artifact — schema in Data Models). Rationale for an artifact over the completion doc: the prune produces structured per-alias records (AC3 retentions, AC6 coverage bookkeeping, AC5 confirmations) — the same evidence class as the audit tables, and the same defect (records with no artifact home) Stacy flagged twice.

### 8b. Snippet sweep flow (R5)

1. **Re-count** (R5 AC1, D1): re-grep the legacy-snippet population; record prior → current (with date) in the completion doc.
2. **Carve-out check FIRST** (R5 AC3): inventory `governance/Process-Development-Workflow.md`; any legacy snippets there are EXCLUDED from this PR and handed to Component 7's named fold (U-final), recorded in this task's completion doc as the fold's origin.
3. **Migrate + verify**: legacy `path:` snippets → `id` form; spot-resolution checks via the docs MCP (R5 AC2); `rebuild_index` in-task (R11 AC5).
4. **Evidence home — the completion doc, explicitly designated** (not a findings artifact): the sweep's records are flat (re-count + the R5 AC5 owner-grouped touched-docs listing for Ada/Lina/Thurgood post-sweep spot-checks) — no per-item dispositions or confirmations to tabulate. The asymmetry with 8a.5 is deliberate and mirrors the R4-vs-R5 consult asymmetry the requirements already settled.

---

## Data Models

- **Findings artifacts**: three markdown docs under `findings/` — `catalog-routing-audit.md` (Component 1), `measurement-case-study.md` (Component 5), `alias-prune.md` (Component 8a: | alias | host doc | owner | oracle-covered? | owner confirm (date+method) | dry-run result | disposition (pruned / retained-on-regression / retained-on-objection / removed-as-residual-risk) | note |) — spec-local, not MCP-indexed, cited by completion docs.
- **R5 evidence home**: the sweep task's completion doc (explicit designation — Component 8b.4); no fourth artifact.
- **Regen log**: `regen-log.md` table (Component 7, predicted/occurred split).
- **Register row**: one classification-map entry per the settled entry grammar (Component 4a).
- **No new code data models** outside OB-1's `CrossReference.kind` tag ('path' | 'id-candidate' internally; the candidate tag never escapes the indexer — public API shape of `list_cross_references` is unchanged, targets normalized to ids).

## Error Handling

- **Dry-run regression on prune** → retain the alias, record retention (R4 AC3); no partial prunes merge.
- **Promotion target fails spot-verify** → do not land; fix the target or downgrade to disposition (b); never land unverified (R7 AC4).
- **Regen exceeds ≤2 target** → record with rationale in the log (R10 AC1); if segments approach K=3, STOP and escalate to Peter per 125-B law — 119-B never spends the third segment without explicit go.
- **OB-1 false positives** → grammar guards + idIndex validation; a mis-extracted candidate that survives both is a test-case bug: add the case, fix, re-run property suite.
- **Owner rejects a promotion/prune candidate** → disposition recorded (leave-as-is / retain); rejection is a valid outcome, not an error path.
- **OB-1 unresolved at closeout** → the closeout task's checkable gate fires (Component 6): merged or descoped-by-record; anything else blocks closeout (R9 AC5).

## Testing Strategy

- **OB-1**: the unit's own Jest suite (Component 6 test list) within `mcp-server`'s existing test surface; full `npm test` green at unit PR (the gate runs it regardless — validate locally first).
- **Corpus edits (U3, 4b)**: docs-MCP `rebuild_index` + spot-resolution checks in-task (R5 AC2, R11 AC5); dry-run harness for the prune gate.
- **U-final**: generator pipeline (generate → sweep-1 → diff-guard) is itself the validation harness; promoted-route spot-verifies recorded in the findings table; `npm test` at the unit gate.
- **No new CI machinery** — everything runs through existing gates (R6 AC3 honored at the test level too).

---

## Design Decisions

### Decision 1: OB-1 = extract-then-validate on the existing post-index hook
Rationale + counter-argument in Component 6. The load-bearing facts: the parser must stay mechanical (property-tested), `idIndex` completeness is the only hard constraint, and the indexer already owns a post-index completion hook.

### Decision 2: Promotion default is doc-id (b); full § routes are opt-in with evidence
Inverts the brittleness default. HOWEVER: this may under-deliver precision — Leonardo's testimony is that 1-hop § routes are the frictionless tier, and a (b)-heavy outcome still costs a summary-first hop. The counterweight is now WIRED, not merely claimed (Leonardo dR1 caught the earlier text asserting a mechanism that didn't exist): flow position feeds the grade choice directly — mid-workflow strengthens a passed-gates (a) case; occasional takes (b) regardless (Component 2). **Held under attack**: Leonardo's 12-row stress-test on his own surface (~8 (b)-correct, 2 (c)-correct, hot-path already (a)) and Ada's (b)-expected pre-signal on her thirteen both confirm the default is calibrated; his Concept Catalog row is the on-record test that the (a) bar is reachable.

### Decision 3: Propagation = one generated pointer cue, not zero, not restated semantics
Rationale + rejected alternative in Component 4c. The honest risk: 8 lines of unproven value; fallback is zero-propagation.

### Decision 4: The shadowing check lives in the case-study findings (not a standalone task)
It is a measurement-integrity check; the findings doc is where measurement integrity is evidenced (R11 AC2's note requirement makes the findings the natural single home). COUNTER-ARGUMENT (Stacy dR1): a compliance check embedded as findings-item 4 can be silently skipped if the case-study task is executed against Component 5's checklist without re-reading R11 AC2. Mitigation adopted: the shadowing check is NAMED in the U2 task's acceptance line in tasks.md — the findings doc stays the home (this decision holds), the task line is the skip-guard.

### Decision 5: OB-4 threshold decided in U1 on existing evidence, with a designed revisit path
The paper decision uses 10.4's recorded evidence; Component 5's OB-4 input section lets U2's fresh distribution trigger a recorded amendment. Decide-early-revisit-on-evidence beats deciding late (U1 is window-free and unblocks the case-study's gate framing). COUNTER-ARGUMENT (Stacy dR1, adopted into the record): the U1 decision ANCHORS — a revisit must overcome status-quo weight when U2's distribution disagrees, whereas deciding once in U2 with fresh data avoids the anchor entirely at the cost of blocking the case-study's gate framing on an undecided threshold. Accepted because: the gate framing is needed at U2 start, the revisit path is a recorded amendment (visible, not a silent survival of the anchor), and the R2 AC3 harness-assertion step makes a revisit mechanically actionable rather than rhetorical.

### Decision 6: U3 evidence homes split — R4 gets a findings artifact, R5 gets the completion doc
R4's prune produces structured per-alias records (retentions, coverage bookkeeping, confirmations) — the audit-table evidence class → `findings/alias-prune.md`. R5's records are flat (re-count + owner-grouped listing) → completion doc, explicitly designated. COUNTER-ARGUMENT: one uniform rule ("all U3 evidence in findings artifacts") is simpler and immune to the flat-records judgment being wrong — but it would manufacture a near-empty artifact for R5, and the explicit designation satisfies the actual defect (records with no NAMED home), which was never "records with no artifact."

---

## Staged-Intent Disposition (commission checklist)

| # | Staged intent | Disposition |
|---|---|---|
| 1 | Lina: one-row 118 route, authoring-seam WHEN | **Designed in** — Component 3, verbatim shape, cluster-expansion explicitly barred |
| 2 | Lina: cross-section coherence checklist | **Designed in** — Component 1, methodology dimension 4 |
| 3 | Ada: pointer-not-restated-semantics propagation | **Designed in** — Component 4c hard rule; zero-propagation held as fallback |
| 4 | Signal-scoped propagation boundary (R8 AC3 as landed) | **Designed in** — Component 4c cue names emitting tools; silence on signal-less surfaces |
| 5 | Leonardo: promotion criteria (determinacy / flow / pair-pattern) | **Designed in** — Component 2 rubric, criteria 1–3 |
| 6 | Leonardo: four leonardo.md audit seeds | **Designed in** — Component 1 initial seeds (inputs to disposition, not pre-judged findings) |
| 7 | Lina: per-row promotion-grade rubric (doc-id vs §) | **Designed in** — Component 2 grade choice; (b)-default is the design's addition (Decision 2) |
| + | Stacy: keyword-shadowing check home | **Designed in** — Component 5 findings item 4 (Decision 4) |
| + | Leonardo: audit-work parallelization | **Designed in** — Architecture § execution shape; audits are U-final tasks startable in parallel with U2/U3 |
| + | 119 folder rename (issue `2026-07-19-spec-119-folder-rename`, Thurgood-owned) | **Explicitly deferred** — issue-driven, NOT a 119-B closeout task; closeout tasks must not silently absorb it (trigger governed by the issue file) |
| + | `search_tokens` partial-match signal (issue `2026-07-19-application-mcp-search-tokens-partial-match-signal`, Ada-owned) | **Explicitly deferred** — LATER per the issue; 4c's propagation prose stays silent on signal-less surfaces, so nothing here blocks on it |
