# Design Document: 127 — Completion-Claims Integrity

**Date**: 2026-09-19
**Spec**: 127 — Completion-Claims Integrity (the F7 disposition)
**Author**: Thurgood (test governance / spec standards / Civitas steward)
**Status**: Design Phase — DRAFT, awaiting the design feedback round (sequential gate)
**Dependencies**: requirements.md (12 requirements, accepted at PR #175, 2026-09-19); the 2026-09-17 settle ballot; the co-signed Q5 documents (PRs #158/#165)

---

## Overview

This design realizes the 12 settled requirements: the completion-doc law's concrete text plan across five governance surfaces, the `completion-criteria-parity` checker as a real program with a shared normalization core, the materiality evaluator, five register rows, the Q5 charter execution, the claims-pass artifacts, and the law ballot's structure. **Requirements are settled; this document decides HOW, never re-opens WHAT.** Every element carries its requirement trace.

Design decisions the requirements left to this phase are resolved in § Design Decisions (DD1–DD9), each with rationale and a counter-argument residual per the fold-back discipline. One self-application note runs through the whole design: **Spec 127 eats its own cooking** — its `tasks.md` will voluntarily declare `**Criteria mode**: per-parent` (DD8), its parents carry decomposition-compliant criteria, and its CLOSEOUT pass is the pilot (Req 8.7).

**Design-R1 incorporated (2026-09-19).** Four reviews: Leonardo, Ada, Lina — 0 blocking, 12 advisories; Stacy — verification-grade, **9 blocking + 9 advisory**, her defect-cluster diagnosis accepted (*elements compressed out of skeletons; mechanisms whose failure mode is silence*). All nine blockers fixed in this revision: the ratification gate redesigned onto a machine line with loud-red failure (B-2); gate-row parity and the declared-none narrow waiver made explicit (B-3); the doc-not-found verdict defined as a named emission (B-4); the four homeless SHALLs given skeleton homes (B-5); the owed-set pipeline's population classification corrected + the template completed (B-6); the units-fallback arm precedence fixed (B-7); the fixture coverage floor + zero-red (B-8); the emission contract rescoped to parity's own surface (B-9); Req 12 gets its component (C11, fixing B-1). The full round and dispositions: `feedback/design.md` § [THURGOOD R1].

---

## Architecture

```
LAW (U1 — one Peter-merged ballot PR)
  .kiro/docs/ballots/2026-09-XX-completion-claims-integrity.md   ← the record (Req 12)
  governance/completion-documentation-guide.md § "Parent Success-Criteria Fidelity" (Req 1)
  governance/Process-Spec-Planning.md   Tier 3 + worked example + conventions §§ (Reqs 3, 9)
  .kiro/steering/Task-Completion-Protocol.md   pointer ×2 (Req 4)
  .kiro/hooks/RELEASE-FLOW.md   owed-set step + arming line (Req 11)
  governance/Product-Handoff-Protocol.md § Tier 2   committed-report convention (Req 10)
  governance/classification-map.md   5 rows (Req 5)
  .kiro/docs/ballots/README.md   "Ballots on record" entry (Req 12.2 — B-1)
  .kiro/issues/archive/2026-09-12-spec-112-completion-claims-audit.md § F7 → addressed-by-127
      (Req 12.6 — path CORRECTED per B-1: archived by the #173 triage after the requirement
       was authored; requirements.md carries the erratum; route named per Req 6.1)
  post-merge: docs-MCP rebuild_index — U1 (guide, PSP, PHP, classification-map) and U3 if
      any served doc changes (Reqs 5.7, 12.8 — A-8)

INSTRUMENT (U2 — checker build, non-required until Q2 arms)
  scripts/completion-claims/
    normalize.ts        ← THE shared normalization (Req 2.5.1; also used by materiality)
    tasks-md.ts         ← tasks.md parser (mode, parents, criteria, promise blocks, units)
    completion-doc.ts   ← completion-doc parser (criteria table, AV section, forced-negative)
    materiality.ts      ← generous extraction + canonical-form comparison (Req 2.3)
    verdict.ts          ← predicate + emission format
    __fixtures__/       ← falsification fixtures, built 1:1 from Stacy's specs (Req 6.5, DD4)
    __tests__/          ← jest suite, functional lane
  scripts/check-completion-criteria-parity.ts   ← CLI entry (Req 6.1)
  .github/workflows/completion-criteria-parity.yml   ← CI job, context name fixed (Req 6.1)

CHARTERS (U3 — canonical edits + regen, Peter-merged, separable from U1 per Req 7.8)
  canonical/agents/{stacy,thurgood}.md → regenerate → .claude/agents/* + .kiro/agents/*
  Agent-Directory (via its canonical source), diff-guard green

PRACTICE (post-acceptance, not units)
  .kiro/specs/<spec>/completion/claims-pass.md   ← template designed here (Req 8.3)
  owed-set pipeline (documented commands, exclusions-emitting — Req 8.4)
  the 127 pilot = 127's own CLOSEOUT pass (Req 8.7)
```

**Proposed merge units** (declared formally in tasks.md; this is the design's input to that round): **U1** the law ballot + every law edit + register rows; **U2** the checker + fixtures + tests + CI wiring; **U3** the charter execution. U1 merges first (DD2's ratification-record mechanism reads the merged ballot). Three units ⇒ Req 9.2 binds — **the units block MUST name a midpoint carrier, and 127 therefore owes a MIDPOINT pass of its own** (Stacy A-3's second silence, now stated and costed: at the carrier's merge the population is a handful of parents — an hour-class pass, not a session). **Proposed carrier: U2's merge.** On A-3's first silence (MIDPOINT is written into charter text at U3, which may follow U2): **the seat's authority is the 2026-09-17 settle ballot, already ratified** — U3 is text propagation, not authority creation, so a midpoint pass at U2's merge is fully chartered whenever U3 lands. The tasks round may reorder to U1 → U3 → U2 if it prefers the text to precede the duty; both orderings are lawful, the fork is the tasks round's. The arming is NOT a unit (Req 6.7). **Open accounting note routed to Q2/tasks (Stacy A-2)**: whether U1's own parents — authored on the U1 branch, pre-ratification — count toward guard (ii)'s N ≥ 5 is counted before the pilot's N is relied on, not assumed.

---

## Components and Interfaces

### C1. The shared normalization core — `normalize.ts` (Reqs 2.5.1, 2.3.2)

One module exporting two pure functions, no configuration, no options object — the parameter-free property is the design:

- `normalizeCell(s: string): string` — the four rules in order: unescape `\|` → `|`; `<br>`/`<br/>` tags → single space; collapse Unicode-whitespace runs → single space; trim. **Rule (iii)'s scope is bounded, not exemplified** (Ada R1): characters with the Unicode `White_Space` property (which includes space, tab, line breaks, NBSP, thin space U+2009, narrow NBSP U+202F), **plus zero-width space/joiner/non-joiner and BOM, which are stripped** — invisible copy-paste artifacts from Figma/spreadsheets, the same non-authorial class as line-wrap. Nothing else — bold, backticks, and visible glyphs (arrows, Δ, subscripts) pass through untouched.
- `maskCheckboxes(s: string): string` — the one named mask beyond the four rules (Req 2.3.2): `[x]`/`[X]`/`[ ]` at checkbox position → the literal token `[·]`.

The materiality comparison is `normalizeCell(maskCheckboxes(extractedSurface))` equality; the parity predicate is `normalizeCell` equality over cell/bullet pairs. **One concept, one module, two call sites** — the requirement's "shared with 2.3's materiality comparison" is enforced by imports, not by convention.

### C2. The tasks.md parser — `tasks-md.ts` (Reqs 2.1, 2.2, 2.4; lifecycle amendment T2-b)

Parses one `tasks.md` into a `TasksFile` (§ Data Models). Behaviors, requirement-traced:

1. **Mode declaration**: matches `**Criteria mode**: per-parent | spec-level` in the header block (before the first checkbox line), one regex. Absent + file authored post-ratification (DD2) → `NON_COMPLIANT_NO_DECLARATION`. Absent + pre-ratification → `legacy`.
2. **Parent association** (Req 2.4): walks lines; a checkbox line at any indent opens an association scope; a `**Success Criteria:**` block associates to the nearest preceding checkbox line; the parent rule keeps only blocks whose associated line is **top-level**. Parent-line recognition accepts all three live forms (plain-numbered, bold-numbered, `Task N: … (Parent)`) — and, because recognition exists only to *classify* the line as top-level, an unnumbered top-level checkbox (the 054a falsifier) associates like any other and is simply never treated as a criteria-owning parent unless a criteria block follows it. Two blocks on one parent, or a block before any checkbox → loud malformation.
3. **Criteria block** (Req 2.2): frozen label only (declared specs); flat bullets, one criterion per bullet, continuation lines folded; `none — <reason>` recognized as the declared-none state; `none` + bullets → loud malformation.
4. **Promise blocks** (Req 1.5): `**Primary Artifacts:**` entries — **path extraction scans for a path pattern anywhere in the bullet** (Ada R1: sentence-form entries like *"Generated CSS output validated at `dist/css/tokens.css` (spot-checked…)"* are common in token specs and must not fall to `notAPath`); annotation suffixes stripped; an entry with no path pattern anywhere carries the `notAPath` flag. `**Merge gate:**` conditions as bullets.
5. **Units block** (Req 9.1; T2-b): recognizes the canonical `## Declared Merge Units` heading + table forward. For legacy files, the however-titled fallback runs in **strict precedence order** (B-7 — the flat-alternatives form false-matched 122's task-group heading `## Group 2 — Per-agent cutovers (each cutover = one merge unit = one PR)`): **(1)** the canonical heading; **(2)** the bold-prose units-declaration paragraph (the 122 form at `tasks.md:14`); **(3)** a heading containing "merge unit" case-insensitively — only if neither higher arm matched. Used only by the owed-set pipeline documentation, not by the checker's parity predicate (DD7).

### C3. The completion-doc parser — `completion-doc.ts` (Reqs 1.1–1.5)

**Doc location** (B-4): the parser locates a parent's completion doc by the corpus-verified glob family `task-N*(-<suffix>)?(-parent)?-completion.md` — covering the two dominant forms (2,441 + 449 instances) **plus the agent-suffixed** (`task-N-thurgood-completion.md`, the 122-cutover shape) **and letter-suffixed** (`task-Na-`) forms Stacy's re-derivation surfaced. Multiple matches for one parent → all parsed, the parent's verdict computed against the union with the manifest naming each file.

Parses into a `CompletionDoc`: the three-column criteria table (cells table-unescaped via C1), the Status marks, the Evidence cells with **kind classification by stated heuristic** (Lina R1 — the heuristic is design surface, not implementation whim): **path** = contains `/` plus an extension or resolves in-repo; **test** = a `*.test.*`/`__tests__` path, a jest suite/describe name, or an `npm test`-family command; **command** = starts with a shell/npm/npx invocation and carries a result clause; **decision-record** = cites a ballot path, a PR number + date or review-comment reference, a dated design-outline decision, or a feedback-doc stamp — **a PR-comment citation like "Approved in PR #123 review comment (2026-09-15)" classifies as `decision-record`, and ballot-file citations are inside the shape set** (Ada R1); anything else → `empty-or-prose`. Classification is *emission metadata*, never a truth verdict. Also parsed: the forced-negative line (exact-prefix `Unmet or partially met criteria:`); the AV section (gate-condition rows; the Primary-Artifacts forced-negative line; **deferral declarations by the fixed form only** — `Artifact deferred: <path> → <unit>`, one regex, `→` and `->` accepted (DD6); free-prose near-misses → `MALFORMED_DEFERRAL`, never honored); and the fixed-string exemption note — verbatim match on **`Criteria fidelity: exempt — spec in flight at ratification (<date>)`** (the ruled string, reproduced here beside its sibling per A-6); near-miss → `MALFORMED_EXEMPTION`.

### C4. The materiality evaluator — `materiality.ts` (Req 2.3)

`extractPromiseSurface(text: string): string` applies the **generous pattern set** — deliberately independent of C2's strict grammar: every top-level checkbox line (any form, masked); criteria labels in all three census forms (frozen, colon-outside, `##`/`###` headings) with their bullet bodies; `**Primary Artifacts:**` blocks; lines matching `merge gate` case-insensitively with their bullet bodies; the units block in all known forms (the one heading base string with trailing parentheticals, and the 122 bold-prose form). Extracted segments concatenate in document order; materiality = normalized-masked inequality between base and head extractions.

`--verify-extraction` mode (Req 2.3.4): runs the extractor over all 153 `tasks.md`, prints per-file segment counts + a corpus digest — the one-time verification whose result the ballot records.

**Invocation context**: on a PR whose diff touches a legacy `tasks.md`, the checker computes materiality against the merge base (`git diff --merge-base`); material + no declaration added in the same change → red (Req 6.3). CI fetches full history (DD2 needs authorship dates).

### C5. The verdict engine + CLI — `verdict.ts`, `check-completion-criteria-parity.ts` (Reqs 6.2–6.4)

**Scan scope (DD1)**: the parity predicate runs as a **full scan of the declared population** — every spec whose `tasks.md` declares `per-parent` — on every run, not diff-scoped. Deterministic, self-healing, and initially tiny by construction. Per declared spec, per ticked parent, the Req 2.5.3 predicate:

- multiset cell/bullet equality over the criteria table (2.5);
- Evidence non-empty + kind-classified per row;
- forced-negative line present;
- **AV gate rows evaluated under THE SAME predicate** (B-3): multiset verbatim-cell equality of `Condition` cells against the parent's `**Merge gate:**` bullets, Status + Evidence per row — *shape alone is not parity*; the Primary-Artifacts forced-negative line present when the parent declares artifacts;
- **declared-none waives the criteria table ONLY** (B-3, Req 1.6): a declared-none parent's AV duties are evaluated exactly as above; the emission records the table waiver, never an AV skip;
- valid exemption strings honored (table waived, AV still owed per Req 1.6's same logic).

**Ticked parent, no completion doc found** (B-4): a defined, named third state — **not red, not silent**: the emission `completion doc not found — not evaluated (doc presence is parent-completion-docs-present's surface, proposed/unbuilt; interim owner: the claims pass)`. Red here would build Req 5.6's deferred check by the back door; silence would be the forbidden dormancy; the named emission is the honest division of labor, and the claims pass reads it at CLOSEOUT.

**Declaration/materiality duties** (Req 6.3) run diff-scoped as C4 describes.

**Output contract** (one format for humans and the claims pass — DD3): per-spec, per-parent verdict lines; the **association manifest** (`parent N ← block at line L`, Req 2.4.2); **emission lines scoped to PARITY'S OWN surface** (B-9 — the first draft mis-imported `promised-artifact-exists`'s ruled emissions; that surface belongs to Req 5.3's delta-scoped, unbuilt row and ships only with it): declared-none table-waivers, exemption strings honored, AV-deferral declarations *as parsed AV content in the manifest* (informational — their exclusion semantics belong to `-exists` when built), and doc-not-found states. A summary line carries pass/fail counts and the emission count — traced to Req 2.4.2 + DD3, **not** Req 5.3. Exit non-zero on any red or malformation; exit zero with emissions otherwise.

**Ratification gate — redesigned at Design-R1 (B-2; the first draft's prose-parse failed on ~31% of the ballot corpus and failed GREEN)**: the law ballot (a U1 deliverable this spec authors) carries a **machine line in fixed form** — `Ratified-machine: YYYY-MM-DD` — specified in C11 exactly so no prose parsing ever occurs; the same design philosophy as every other fixed string in this law. The checker reads the ballot at its **pinned path**; since U1 merges before U2 exists, the ballot is present for the checker's whole life, so: **ballot absent, or machine line absent/unparseable → LOUD RED** — `cannot resolve ratification record at <path>`. No vacuous-green state exists at all; a renamed ballot or reworded line turns the check red, not silently green — the dormancy channel is closed by construction, not monitored.

### C6. CI wiring — `.github/workflows/completion-criteria-parity.yml` (Reqs 6.1, 6.6)

Job name / check context: `completion-criteria-parity`, fixed at authoring, cited on the register row. Trigger: `pull_request`. Steps mirror the existing check workflows (checkout with `fetch-depth: 0` for DD2/C4, node setup, `npm ci`, `npm run check:completion-criteria-parity`). **Non-required** at introduction; the required flip + `EXPECTED_CONTEXTS` count-assert land in the same recorded change at arming (Req 6.6) — until then the count-assert is untouched.

### C7. The fixture pipeline (Req 6.5; DD4)

Stacy authors **fixture specifications** in her own write scope — `.kiro/specs/127-completion-claims-integrity/fixtures/<case>.md`, each naming: the mutation class under falsification, the tasks.md fragment, the completion-doc fragment, and the required verdict. The U2 build encodes each spec 1:1 as `scripts/completion-claims/__fixtures__/<case>/{tasks.md,completion.md,expected.json}` with a provenance header citing her spec file. A jest suite (`fixtures.test.ts`) asserts every fixture produces its expected verdict — **the checker "goes red on her fixtures" as a standing test, not a one-time demo**. A contested fixture is contested in the spec file's review, on-branch, with Peter arbitrating (Req 6.5); the provenance header makes spec↔fixture divergence one `diff` away.

**The coverage floor + zero-red (B-8 — Stacy confirmed the shape, contested the enforcement; both limbs now mechanical):** the suite carries a checked-in **coverage manifest** (`expected-classes.json`) enumerating the falsification classes the set MUST cover — the six mutation classes (drop, reword, relax, omit-doc, invent, absorb) plus the AV-gate, deferral, exemption, declaration, and materiality classes — and `fixtures.test.ts` **fails when any manifest class has zero fixtures**. An empty or thin fixture set is therefore **red by construction**, which is the mechanical form of Req 6.5's *"neither agent may waive it"* — the obligation's detector is the suite, not a reviewer's attention, and the escalation path (undelivered → Peter as a blocked deliverable) triggers on a red anyone can see. The manifest itself is part of Stacy's specification surface: she may extend it; shrinking it is a contested-fixture event with the same Peter arbitration.

### C8. Law-text plans (Reqs 1, 3, 4, 9, 10, 11) — full text is a U1/ballot deliverable; these are the binding skeletons

1. **Guide subsection** "Parent Success-Criteria Fidelity": rule statement (exact set, three columns, Status vocabulary **including the three A-5 sentences verbatim**: each mark reflects a check performed *against shipped source, never against intent or effort*; ⚠️ *MUST link a tracking issue or follow-up task*; a ✅ with an empty or prose-only Evidence cell is *non-compliant on its face*); the four evidence kinds with the cross-domain locatable examples; **the four normalization rules + rule (iii)'s bounded scope + the closed-but-extendable-by-recorded-amendment clause, in law text** (B-5 item 2 — an author hitting a false red reads the rule set here, and the amendment path has text to amend); the forced-negative line; the AV section (gate rows *under the same predicate* / artifact line / the fixed deferral form quoted); the fixed-string exemption quoted; the six mutation classes; the two authoring notes; the honest-reach statement incl. claims-pass-today ownership of artifact truth; the (d8) sentence. Reference-limb guidance (Req 2.6.2) lives here as *guidance* prose, marked as such.
2. **PSP Tier 3**: the table form as required shape; prose form demoted to optional elaboration; failure vocabulary added. **The worked example** (Req 3.3; content settled at Design-R1 — Ada's recommendation, Leonardo ceding to generic system content, Lina's neutrality line): a parent with three criteria — one ✅ with command+result evidence, one **⚠️ with a follow-up link**, and **the decomposed triple as the registry case**: *"Generated CSS values match the registry"* / Swift / Kotlin, grouped by criterion, CSS ✅ / Swift ✅ / **Kotlin ⚠️ `not re-verified — toolchain unavailable`**, each row citing its registry-entry reference — teaching the triple, the grouping, the reference limb, and the Method-honesty string in one artifact; plus an AV section showing a gate-condition row, the artifact forced-negative line, and one `Artifact deferred:` declaration; the forced-negative line listing the ⚠️. **One neutrality line accompanies it** (Lina): the shape applies equally to a component's cross-platform parity parent and a product screen's — the example is generic, deliberately (Leonardo: product flavor belongs in PHP, which Req 10.3 already homes).
3. **PSP conventions §** (Req 9): the canonical `## Declared Merge Units` block — table columns `Unit | Parents | Gating parent | Midpoint carrier (specs ≥ 3 units)`; **the decomposition structural limb stated AS LAW** (B-5 item 1 — Req 2.6.1's SHALL: a promise spanning multiple platforms is authored as per-platform criterion bullets; the example teaches it, this sentence binds it); **the `(platforms: …)` fallback documented** as the amendment-gated form for a genuinely non-decomposable claim, with its counting note (B-5 item 3); the criteria-mode declaration + declared-none + exemption string + deferral form + the "materially amended" definition beside the declaration rule, with the flag-discipline authoring guidance (Req 3.4).
4. **TCP pointer** (Req 4): the exact ruled sentence, both parent sequences, nothing else.
5. **RELEASE-FLOW step** (Req 11): a named step block in "Deriving the delta" — run the owed-set pipeline verbatim (C9's commands), paste output + enumerated exclusions; the *"if arming is undecided, decide it now"* line; the promotion ladder + named detectors, **with Req 11.3's inheritance clause carried in full — successor release tooling inherits this step as a requirement, not a convention it may re-derive** (A-9).
6. **PHP § Tier 2** (Req 10): the committed-report convention sentence (path, branch, gate) + claim-grain citation rule + the SHOULD spec-revision citation with its recorded reading; **the fourth-evidence-kind homing for visual-direction sign-offs** (Req 10.3 — A-9); and **the NAMED REVISIT recorded in full** (B-5 item 4 — Req 10.4): Leonardo's three questions verbatim, the per-parent answer, the new-parity-parent rule — with question (ii)'s "consistently authored" read to include **path-collision on a future multi-screen spec** (Leonardo R1's advisory, folded into the revisit's net rather than pre-designed).

### C9. Claims-pass practice artifacts (Req 8)

- **`claims-pass.md` template** (documented in Stacy's charter text, U3): Scope / Findings (promised–claimed–shipped per discrepancy, 112 taxonomy, routing per Req 7.3) / **Method — the sample, named, and how many of the total**, per-row per-platform honesty incl. `not re-verified — toolchain unavailable` (**the fixed vocabulary is deliberately closed to the one negative string** — Leonardo R1's nit, confirmed deliberate: a re-verified row's own Evidence cell already carries its command/result, so only the negative case needs canonical wording) / the mandatory `Standards implications: none / or list` line / the counting block (omissions, vagueness, none-rates, exemption-string usage, bundled/incomplete-decomposition, fallback invocations, M3/M4/M5) / **the report-set comparison** (B-6, Req 8.6/2.6.5: decomposed rows compared against the committed Implementation-Report set — the incomplete-decomposition guard) / **the emission-reading duty WITH its interim-owner clause verbatim** (B-6 — the condition Stacy's (b) confirmation rests on: *once `promised-artifact-exists` is built, read its emission lines; until then the pass owns promised-artifact gaps as judgment*) / the deferral walk-back results (every `Artifact deferred:` verified delivered; undelivered = finding) / **Req 8.8's sentence, carried where the practice is documented** (B-6): *no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.*
- **The owed-set pipeline** (documented commands, not a script — Req 8.4), **population classification corrected at Design-R1** (B-6 — the first draft's stage 1 silently dropped the corpus's most common shape, the small single-PR spec): stage 1 enumerates **every spec with post-ratification merge activity** and classifies each into exactly one of: **(a)** declared units, any recognized form (C2.5's precedence order) → CLOSEOUT anchors on the final declared unit; **(b)** no units block, single PR → that PR is the spec's only unit (the amendment § 2.1 primary case); **(c)** no units block, >1 PR → the PR carrying the last parent completion doc (the fallback). Stages 2–4: final-anchor merge state + date → `test -f` the claims-pass path → emit the owed set **plus the ENUMERATED exclusion counts by name** (A-7, T4-5's own form): `N closed; M(a)/M(b)/M(c) per class; K excluded as pre-ratification` — named classes, so a wrong answer is a falsifiable count, never a healthy-looking short list. Lives verbatim in Thurgood's LIVENESS health-check item and Stacy's command catalog (both U3 canonical edits).

### C10. Register rows + charters (Reqs 5, 7) — content settled by requirements; design adds only mechanics

Rows follow the 125-B house shape (heading = entry id; fenced YAML; dated history). The non-substring sweep runs live at U1 authoring (Req 5.1). Charter edits: new charter sections in `canonical/agents/stacy.md` (claims-audit practice, § 11.4 superset trigger table, duties, mirror clause, carve-out with spelled-out falsification conditions, template pointer) and `canonical/agents/thurgood.md` (composed-loop duties, LIVENESS-as-query + proposed-row read, caller-out duty, the three Req 7.9 bounds); Agent-Directory rows updated via canonical; regen + diff-guard green (Req 7.6).

### C11. The law ballot's mechanics (Req 12 — added at Design-R1; B-1's structural finding was that Req 12 had no component)

- **Full edit-site inventory** (Req 12.2), now matching the Architecture LAW block: guide subsection; PSP Tier 3 + worked example + conventions §; TCP pointer ×2; five register rows; RELEASE-FLOW step; PHP § Tier 2 (incl. the revisit block); **the ballots-README "Ballots on record" entry**; **the F7 update at the ARCHIVED path** `.kiro/issues/archive/2026-09-12-spec-112-completion-claims-audit.md` (moved by #173 post-requirements; requirements.md 12.6 carries the erratum; the archive tree joins Req 6.1's route-naming duty).
- **The machine ratification line** (B-2's fix, specified here because the ballot is this spec's own artifact): the ballot carries, alone on a line, `Ratified-machine: YYYY-MM-DD` — written at ratification alongside the human `Status`; the checker's pinned-path read (C5) parses this line only, never prose. The line's form is enumerated in the ballot beside the other fixed strings.
- **The straggler sweep** (Req 12.2): the sweep command family is fixed at ballot authoring (a per-edit-class grep over the corpus), and the ballot **states each command with its actual output** — the stated-matching discipline; the sweep is re-run mechanically before merge.
- **Frozen recipes, quoted not described** (Req 12.3): each census appears as a fenced command block + its output, incl. the three-recipe in-flight reconciliation with delta memberships and the 9-file non-frozen enumeration; the materiality pattern set enumerated verbatim with the one-time `--verify-extraction` result.
- **Quoting instructions + recorded readings** (Req 12.4) carried in the ballot's framing; the (d8) sentence verbatim (Req 12.5); the M-baseline with recipes and the post-arming caveat (Req 12.7); the post-merge `rebuild_index` step listed as an explicit ballot follow-up item (Req 12.8, A-8).

---

## Data Models

```ts
type Mode = 'per-parent' | 'spec-level' | 'legacy' | 'non-compliant-no-declaration';

interface TasksFile { spec: string; mode: Mode; authoredAt: string /* first-commit date, DD2 */;
  parents: Parent[]; unitsBlock?: UnitsBlock; malformations: Malformation[]; }

interface Parent { line: number; form: 'plain'|'bold'|'task-label'; ticked: boolean;
  criteria: string[] | { none: true; reason: string };
  primaryArtifacts: { raw: string; path?: string; notAPath?: boolean }[];
  mergeGate: string[]; }

interface Row { criterion: string; status: '✅'|'⚠️'|'❌'; evidence: string;
  evidenceKind: 'path'|'test'|'command'|'decision-record'|'empty-or-prose'; }
  // ONE row shape for the criteria table AND AV gate rows (B-3) — both run the 2.5 predicate

interface CompletionDoc { sourceFiles: string[] /* B-4: the located glob-family matches */;
  rows: Row[]; forcedNegative?: string; exemption?: 'valid'|'malformed';
  av?: { gateRows: Row[]; artifactLine?: string;
         deferrals: { path: string; unit: string }[]; malformedDeferrals: string[] }; }

type Verdict = 'PASS' | 'SET_MISMATCH' /* drop/add/reword collapse to multiset diff, reported with the diff */
  | 'AV_SET_MISMATCH' /* B-3: gate rows vs merge-gate bullets, same predicate */
  | 'EVIDENCE_NONCOMPLIANT' | 'FORCED_NEGATIVE_MISSING' | 'AV_MISSING_OR_MALFORMED'
  | 'MALFORMATION' | 'NON_COMPLIANT_NO_DECLARATION' | 'MATERIAL_AMENDMENT_WITHOUT_DECLARATION'
  | 'RATIFICATION_RECORD_UNRESOLVABLE' /* B-2: loud red, never green */;

interface Emission { kind: 'declared-none-table-waiver'|'exemption-honored'
  |'av-deferral-declared'|'completion-doc-not-found'; detail: string; }
  // B-9: parity's OWN surface only — 'skipped-not-a-path' belongs to promised-artifact-exists
  // when built; 'rule-not-in-force' eliminated with the vacuous-green state (B-2)
```

## Error Handling — the loud-failure catalog (exact strings, fixed here so the ballot and fixtures share them)

| Condition | Message |
|---|---|
| Declared per-parent, no well-formed block for parent N | `declared per-parent, block not found for parent N` |
| `none` + bullets | `malformed criteria block: 'none' co-occurs with criteria (parent N)` |
| Two blocks associate to one parent | `malformed association: two criteria blocks associate to parent N (lines L1, L2)` *(split per Lina R1 — the collapsed message told an author something was wrong but not which shape)* |
| Criteria block before any checkbox | `malformed association: criteria block at line L precedes every checkbox` |
| Free-prose exemption near-miss | `non-compliant exemption: not the fixed string 'Criteria fidelity: exempt — spec in flight at ratification (<date>)' (parent N)` *(literal embedded per Lina R1/A-6 — siblings now symmetric)* |
| Free-prose deferral near-miss | `malformed deferral: not the fixed form 'Artifact deferred: <path> → <unit>'` |
| Post-ratification file, no declaration | `non-compliant tasks.md: authored post-ratification without a criteria-mode declaration` |
| Material amendment without declaration | `material amendment without criteria-mode declaration (canonical-form diff attached)` |
| Ticked parent, no completion doc | *(emission, not red)* `completion doc not found — not evaluated (doc presence is parent-completion-docs-present's surface, proposed/unbuilt; interim owner: the claims pass)` |
| Ballot absent, or machine line unparseable | **(RED — B-2)** `cannot resolve ratification record at <path>` |

## Testing Strategy

Jest, functional lane, timing-assertion-free (house law). Suites: `normalize.test.ts` (property-style cases incl. pipes, `<br>`, NBSP, glyph passthrough); `tasks-md.test.ts` (all three parent forms, the 054a falsifier, declared-none, malformations); `completion-doc.test.ts` (table parsing, deferral form incl. `->`, exemption near-misses); `materiality.test.ts` (each generous-pattern class; tick-only diff = immaterial; strike-through = material; wrapped-line reflow = immaterial); `fixtures.test.ts` (C7 — Stacy's falsification cases, red-by-construction); `verdict.test.ts` (multiset semantics, duplicate bullets). Plus `--verify-extraction` over the live corpus (recorded, not asserted — the corpus moves). **Gate-bite** (Req 6.4): at arming time, a throwaway PR with a deliberately defective completion doc, proof cited on the register row — planned in tasks, not built here.

## Design Decisions

- **DD1 — Full-scan parity, diff-scoped materiality.** Parity over the whole declared population every run: deterministic, self-healing after force-pushes, and cheap because the population is empty at birth. *Residuals: a pre-existing red in a declared spec blocks unrelated PRs once armed — accepted; that is what "armed" means. **Arming-day visibility (Stacy A-4, routed to the 5.Z sitting, deliberately not a new guard)**: a red merged during the non-required interim turns every PR red at the flip, and nothing currently requires a green full scan before flipping — the sitting should see this when it decides.*
- **DD2 — The rule's dates come from artifacts, not constants (REDESIGNED at Design-R1, B-2).** In-force date: the **machine line** `Ratified-machine: YYYY-MM-DD` at the ballot's pinned path (C5/C11) — never a prose parse; **absent/unparseable is a loud red, and no vacuous-green state exists**. Authorship date: `git log --diff-filter=A --follow` first-commit date of the `tasks.md` (CI fetch-depth 0). *Residuals: a squash-merged file's authorship date is its merge date — correct for this rule (the date it entered `main`'s view); delete-and-recreate resets it — also correct (recreation IS authorship). **Merge-boundary instability (Stacy A-1, stated accurately)**: on the PR, the add-commit is the branch commit; after squash it is the merge commit — so a `tasks.md` cut pre-ratification and merged post-ratification evaluates legacy at the gate and post-ratification on `main`, and the diff-scoped declaration duty does not re-fire. Window near-zero given U1-before-U2; the residual is the boundary case's honest name, and the next PR touching the file, or the claims pass, catches it.*
- **DD3 — One output contract for CI and the claims pass.** The emission format is designed for two readers (the PR summary line; Stacy's CLOSEOUT read per Req 5.3), so the interim-owner handoff at build time is a format no-op.
- **DD4 — Fixtures as specification-encoded pairs with provenance headers** (C7): solves the write-scope wall (Stacy's specs live in her scope; the encoded fixtures in the granted scope) while making spec↔fixture divergence diffable. *Residual: the encoding step is a translation a dishonest build could fudge — bounded by the provenance header making the comparison one `diff` away, and by her review of the checker-build unit.*
- **DD5 — The worked example models the full convention** (C8.2) rather than the minimum: one artifact teaches the table, the ⚠️, decomposition-grouping, the AV shapes, and the deferral form. *Residual: a maximal example reads busier than a minimal one; chosen because the canonical example is the corpus's strongest teacher (B5's whole lesson) and an unshown form is an untaught form.*
- **DD6 — Deferral arrow accepts `→` and `->`** at parse; the guide teaches `→`. *Residual: two accepted spellings is a tiny grammar widening; declined to enforce one because an ASCII-only author would otherwise hit a malformation for typography — the same class of non-authorial artifact the (c′) normalization absorbs.*
- **DD7 — The however-titled units fallback lives in the owed-set pipeline docs, not in the checker** (C2.5): the checker's parity predicate never needs units; putting legacy-form tolerance only where CLOSEOUT needs it keeps the checker's grammar strict.
- **DD8 — 127's own tasks.md opts in voluntarily** (`**Criteria mode**: per-parent`, authored pre-ratification and therefore legacy by date, opting in by declaration). The pilot then measures the convention on a spec that is bound by choice — the self-application the pilot exists for. *Residuals: pilot-measures-the-ceiling caveat carried at Req 8.7; and the guard-(ii) N-accounting question (Stacy A-2 — do U1's pre-ratification-authored parents count?) is routed to the tasks round and the Q2 sitting: the pilot's N is counted before it is relied on, never assumed.*
- **DD9 — The narrative-prose materiality gap is ACCEPTED, as a stated decision (Ada R1's ask that it be stated, not silent).** Load-bearing numbers written in free prose between parent tasks ("the modular scale ratio changes from 1.25 to 1.333") are outside the generous extraction, so a silent prose edit is immaterial to C4. Accepted because the alternative — extracting all prose — explodes the false-material rate on illustrative tables and examples (which token docs carry heavily), and a false-material's cost asymmetry only stays cheap while the surface stays structural. *The guarded channels for prose promises are the LENS's question 5 ("does the task text promise things the criteria don't cover?") and the claims pass — the same routing as every other prose-shaped promise in this law.*

## Cross-References

Requirements traces inline throughout. Sources of authority unchanged (requirements.md § Traceability). The design introduces no new law; every normative string above (messages, forms, labels) is either quoted from a ruled source or fixed here as implementation detail for the round to attack.
