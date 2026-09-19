# Design Document: 127 — Completion-Claims Integrity

**Date**: 2026-09-19
**Spec**: 127 — Completion-Claims Integrity (the F7 disposition)
**Author**: Thurgood (test governance / spec standards / Civitas steward)
**Status**: Design Phase — DRAFT, awaiting the design feedback round (sequential gate)
**Dependencies**: requirements.md (12 requirements, accepted at PR #175, 2026-09-19); the 2026-09-17 settle ballot; the co-signed Q5 documents (PRs #158/#165)

---

## Overview

This design realizes the 12 settled requirements: the completion-doc law's concrete text plan across five governance surfaces, the `completion-criteria-parity` checker as a real program with a shared normalization core, the materiality evaluator, five register rows, the Q5 charter execution, the claims-pass artifacts, and the law ballot's structure. **Requirements are settled; this document decides HOW, never re-opens WHAT.** Every element carries its requirement trace.

Design decisions the requirements left to this phase are resolved in § Design Decisions (DD1–DD8), each with rationale and a counter-argument residual per the fold-back discipline. One self-application note runs through the whole design: **Spec 127 eats its own cooking** — its `tasks.md` will voluntarily declare `**Criteria mode**: per-parent` (DD8), its parents carry decomposition-compliant criteria, and its CLOSEOUT pass is the pilot (Req 8.7).

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

**Proposed merge units** (declared formally in tasks.md; this is the design's input to that round): **U1** the law ballot + every law edit + register rows; **U2** the checker + fixtures + tests + CI wiring; **U3** the charter execution. Three units ⇒ Req 9.2 binds: the units block MUST name a midpoint carrier — **proposed: U2's merge** (it is the middle unit by dependency and the one whose artifacts the pilot needs freshest). U1 merges before U2 (DD2's ratification-date mechanism reads the merged ballot). The arming is NOT a unit (Req 6.7).

---

## Components and Interfaces

### C1. The shared normalization core — `normalize.ts` (Reqs 2.5.1, 2.3.2)

One module exporting two pure functions, no configuration, no options object — the parameter-free property is the design:

- `normalizeCell(s: string): string` — the four rules in order: unescape `\|` → `|`; `<br>`/`<br/>` tags → single space; collapse Unicode-whitespace runs (incl. NBSP, line breaks) → single space; trim. Nothing else — bold, backticks, and platform phrasing pass through untouched.
- `maskCheckboxes(s: string): string` — the one named mask beyond the four rules (Req 2.3.2): `[x]`/`[X]`/`[ ]` at checkbox position → the literal token `[·]`.

The materiality comparison is `normalizeCell(maskCheckboxes(extractedSurface))` equality; the parity predicate is `normalizeCell` equality over cell/bullet pairs. **One concept, one module, two call sites** — the requirement's "shared with 2.3's materiality comparison" is enforced by imports, not by convention.

### C2. The tasks.md parser — `tasks-md.ts` (Reqs 2.1, 2.2, 2.4; lifecycle amendment T2-b)

Parses one `tasks.md` into a `TasksFile` (§ Data Models). Behaviors, requirement-traced:

1. **Mode declaration**: matches `**Criteria mode**: per-parent | spec-level` in the header block (before the first checkbox line), one regex. Absent + file authored post-ratification (DD2) → `NON_COMPLIANT_NO_DECLARATION`. Absent + pre-ratification → `legacy`.
2. **Parent association** (Req 2.4): walks lines; a checkbox line at any indent opens an association scope; a `**Success Criteria:**` block associates to the nearest preceding checkbox line; the parent rule keeps only blocks whose associated line is **top-level**. Parent-line recognition accepts all three live forms (plain-numbered, bold-numbered, `Task N: … (Parent)`) — and, because recognition exists only to *classify* the line as top-level, an unnumbered top-level checkbox (the 054a falsifier) associates like any other and is simply never treated as a criteria-owning parent unless a criteria block follows it. Two blocks on one parent, or a block before any checkbox → loud malformation.
3. **Criteria block** (Req 2.2): frozen label only (declared specs); flat bullets, one criterion per bullet, continuation lines folded; `none — <reason>` recognized as the declared-none state; `none` + bullets → loud malformation.
4. **Promise blocks** (Req 1.5): `**Primary Artifacts:**` entries (annotation suffixes stripped for path extraction; non-path entries kept with a `notAPath` flag for emission); `**Merge gate:**` conditions as bullets.
5. **Units block** (Req 9.1; T2-b): recognizes the canonical `## Declared Merge Units` heading + table forward; for legacy files, the however-titled fallback (heading containing "merge unit" case-insensitively, or the 122 bold-prose paragraph form) — used only by the owed-set pipeline documentation, not by the checker's parity predicate.

### C3. The completion-doc parser — `completion-doc.ts` (Reqs 1.1–1.5)

Parses `task-N-completion.md` / `task-N-parent-completion.md` into a `CompletionDoc`: the three-column criteria table (cells table-unescaped via C1), the Status marks, the Evidence cells with kind classification (path / test / command+result / decision-record — classification is *emission metadata*, never a truth verdict), the forced-negative line (exact-prefix match on `Unmet or partially met criteria:`), the AV section when present (gate-condition rows; the Primary-Artifacts forced-negative line; **deferral declarations by the fixed form only** — `Artifact deferred: <path> → <unit>`, one regex, both `→` and `->` accepted (DD6); free prose near-misses reported as `MALFORMED_DEFERRAL`, never honored), and the fixed-string exemption note (verbatim match; near-miss → `MALFORMED_EXEMPTION`).

### C4. The materiality evaluator — `materiality.ts` (Req 2.3)

`extractPromiseSurface(text: string): string` applies the **generous pattern set** — deliberately independent of C2's strict grammar: every top-level checkbox line (any form, masked); criteria labels in all three census forms (frozen, colon-outside, `##`/`###` headings) with their bullet bodies; `**Primary Artifacts:**` blocks; lines matching `merge gate` case-insensitively with their bullet bodies; the units block in all known forms (the one heading base string with trailing parentheticals, and the 122 bold-prose form). Extracted segments concatenate in document order; materiality = normalized-masked inequality between base and head extractions.

`--verify-extraction` mode (Req 2.3.4): runs the extractor over all 153 `tasks.md`, prints per-file segment counts + a corpus digest — the one-time verification whose result the ballot records.

**Invocation context**: on a PR whose diff touches a legacy `tasks.md`, the checker computes materiality against the merge base (`git diff --merge-base`); material + no declaration added in the same change → red (Req 6.3). CI fetches full history (DD2 needs authorship dates).

### C5. The verdict engine + CLI — `verdict.ts`, `check-completion-criteria-parity.ts` (Reqs 6.2–6.4)

**Scan scope (DD1)**: the parity predicate runs as a **full scan of the declared population** — every spec whose `tasks.md` declares `per-parent` — on every run, not diff-scoped. Deterministic, self-healing, and initially tiny by construction (the population starts empty at ratification and grows only by authoring or opt-in). Per declared spec, per ticked parent: the Req 2.5.3 predicate — multiset cell/bullet equality, Evidence non-empty + kind-classified, forced-negative present, AV present-and-shaped when owed, honoring declared-none and valid exemption strings.

**Declaration/materiality duties** (Req 6.3) run diff-scoped as C4 describes.

**Output contract** (one format for humans and the claims pass): per-spec, per-parent verdict lines; the **association manifest** (`parent N ← block at line L`, Req 2.4.2); **emission lines** for every exclusion (`skipped — not a path`, AV-declared deferrals, declared-none parents, exemption strings honored); a summary line carrying pass/fail counts **and the exclusion count** (the PR-visible surface Req 5.3 names). Exit non-zero on any red or malformation; exit zero with emissions otherwise.

**Ratification gate (DD2)**: before evaluating anything, the checker resolves the rule's in-force date by parsing the law ballot's `Status` line. Ballot absent or not `RATIFIED` → the rule is not in force → exit green with the single emission `rule not in force — ballot absent/unratified` (vacuous-green stated as vacuous, never silent).

### C6. CI wiring — `.github/workflows/completion-criteria-parity.yml` (Reqs 6.1, 6.6)

Job name / check context: `completion-criteria-parity`, fixed at authoring, cited on the register row. Trigger: `pull_request`. Steps mirror the existing check workflows (checkout with `fetch-depth: 0` for DD2/C4, node setup, `npm ci`, `npm run check:completion-criteria-parity`). **Non-required** at introduction; the required flip + `EXPECTED_CONTEXTS` count-assert land in the same recorded change at arming (Req 6.6) — until then the count-assert is untouched.

### C7. The fixture pipeline (Req 6.5; DD4)

Stacy authors **fixture specifications** in her own write scope — `.kiro/specs/127-completion-claims-integrity/fixtures/<case>.md`, each naming: the mutation class under falsification, the tasks.md fragment, the completion-doc fragment, and the required verdict. The U2 build encodes each spec 1:1 as `scripts/completion-claims/__fixtures__/<case>/{tasks.md,completion.md,expected.json}` with a provenance header citing her spec file. A jest suite (`fixtures.test.ts`) asserts every fixture produces its expected verdict — **the checker "goes red on her fixtures" as a standing test, not a one-time demo**. A contested fixture is contested in the spec file's review, on-branch, with Peter arbitrating (Req 6.5); the encoded fixture never silently diverges from its spec because the provenance header makes the pair diffable.

### C8. Law-text plans (Reqs 1, 3, 4, 9, 10, 11) — full text is a U1/ballot deliverable; these are the binding skeletons

1. **Guide subsection** "Parent Success-Criteria Fidelity": rule statement (exact set, three columns, Status vocabulary); the four evidence kinds with the cross-domain locatable examples; the forced-negative line; the AV section (gate rows / artifact line / the fixed deferral form); the fixed-string exemption; the six mutation classes; the two authoring notes (copy-don't-retype; decomposition-scope boundary); the honest-reach statement incl. the claims-pass-today ownership of artifact truth; the (d8) sentence. Reference-limb guidance (Req 2.6.2) lives here as *guidance* prose, marked as such.
2. **PSP Tier 3**: the table form as required shape; prose form demoted to optional elaboration; failure vocabulary added. **The worked example** (Req 3.3) is designed to model the FULL convention in one artifact: a parent with three criteria — one ✅ with command+result evidence, one **⚠️ with a follow-up link**, one decomposed per-platform triple grouped by criterion — plus an AV section showing a gate-condition row, the artifact forced-negative line, and one `Artifact deferred:` declaration; forced-negative line listing the ⚠️. Evidence cells are paths/tests/commands, never activity prose.
3. **PSP conventions §** (Req 9): the canonical `## Declared Merge Units` block — table columns `Unit | Parents | Gating parent | Midpoint carrier (specs ≥ 3 units)`; the criteria-mode declaration + declared-none + exemption string + deferral form + the "materially amended" definition beside the declaration rule, with the flag-discipline authoring guidance (Req 3.4).
4. **TCP pointer** (Req 4): the exact ruled sentence, both parent sequences, nothing else.
5. **RELEASE-FLOW step** (Req 11): a named step block in "Deriving the delta" — run the owed-set pipeline verbatim (C9's commands), paste output + exclusions; the *"if arming is undecided, decide it now"* line; the promotion ladder + named detectors as a short recorded note.
6. **PHP § Tier 2** (Req 10): the committed-report convention sentence (path, branch, gate) + claim-grain citation rule + the SHOULD spec-revision citation.

### C9. Claims-pass practice artifacts (Req 8)

- **`claims-pass.md` template** (documented in Stacy's charter text, U3): Scope / Findings (promised–claimed–shipped per discrepancy, 112 taxonomy, routing per Req 7.3) / **Method — the sample, named, and how many of the total**, per-row per-platform honesty incl. `not re-verified — toolchain unavailable` / the mandatory `Standards implications: none / or list` line / the counting block (omissions, vagueness, none-rates, exemption-string usage, bundled/incomplete-decomposition, fallback invocations, M3/M4/M5) / the deferral walk-back results (every `Artifact deferred:` verified delivered; undelivered = finding).
- **The owed-set pipeline** (documented commands, not a script — Req 8.4): a four-stage pipeline (enumerate specs with declared units *however titled* or multi-PR history → final-unit merge state + date → `test -f` the claims-pass path → emit owed set **plus** the three exclusion counts). Lives verbatim in Thurgood's LIVENESS health-check item and Stacy's command catalog (both U3 canonical edits).

### C10. Register rows + charters (Reqs 5, 7) — content settled by requirements; design adds only mechanics

Rows follow the 125-B house shape (heading = entry id; fenced YAML; dated history). The non-substring sweep runs live at U1 authoring (Req 5.1). Charter edits: new charter sections in `canonical/agents/stacy.md` (claims-audit practice, § 11.4 superset trigger table, duties, mirror clause, carve-out with spelled-out falsification conditions, template pointer) and `canonical/agents/thurgood.md` (composed-loop duties, LIVENESS-as-query + proposed-row read, caller-out duty, the three Req 7.9 bounds); Agent-Directory rows updated via canonical; regen + diff-guard green (Req 7.6).

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

interface CompletionDoc { rows: { criterion: string; status: '✅'|'⚠️'|'❌'; evidence: string;
    evidenceKind: 'path'|'test'|'command'|'decision-record'|'empty-or-prose' }[];
  forcedNegative?: string; exemption?: 'valid'|'malformed';
  av?: { gateRows: Row[]; artifactLine?: string;
         deferrals: { path: string; unit: string }[]; malformedDeferrals: string[] }; }

type Verdict = 'PASS' | 'SET_MISMATCH' /* drop/add/reword collapse to multiset diff, reported with the diff */
  | 'EVIDENCE_NONCOMPLIANT' | 'FORCED_NEGATIVE_MISSING' | 'AV_MISSING_OR_MALFORMED'
  | 'MALFORMATION' | 'NON_COMPLIANT_NO_DECLARATION' | 'MATERIAL_AMENDMENT_WITHOUT_DECLARATION';

interface Emission { kind: 'skipped-not-a-path'|'av-declared-deferral'|'declared-none'
  |'exemption-honored'|'rule-not-in-force'; detail: string; }
```

## Error Handling — the loud-failure catalog (exact strings, fixed here so the ballot and fixtures share them)

| Condition | Message |
|---|---|
| Declared per-parent, no well-formed block for parent N | `declared per-parent, block not found for parent N` |
| `none` + bullets | `malformed criteria block: 'none' co-occurs with criteria (parent N)` |
| Two blocks one parent / block before any checkbox | `malformed association: …` (+ manifest) |
| Free-prose exemption near-miss | `non-compliant exemption: free prose is not the fixed string (parent N)` |
| Free-prose deferral near-miss | `malformed deferral: not the fixed form 'Artifact deferred: <path> → <unit>'` |
| Post-ratification file, no declaration | `non-compliant tasks.md: authored post-ratification without a criteria-mode declaration` |
| Material amendment without declaration | `material amendment without criteria-mode declaration (canonical-form diff attached)` |
| Ballot absent/unratified | *(green)* `rule not in force — ballot absent/unratified` |

## Testing Strategy

Jest, functional lane, timing-assertion-free (house law). Suites: `normalize.test.ts` (property-style cases incl. pipes, `<br>`, NBSP, glyph passthrough); `tasks-md.test.ts` (all three parent forms, the 054a falsifier, declared-none, malformations); `completion-doc.test.ts` (table parsing, deferral form incl. `->`, exemption near-misses); `materiality.test.ts` (each generous-pattern class; tick-only diff = immaterial; strike-through = material; wrapped-line reflow = immaterial); `fixtures.test.ts` (C7 — Stacy's falsification cases, red-by-construction); `verdict.test.ts` (multiset semantics, duplicate bullets). Plus `--verify-extraction` over the live corpus (recorded, not asserted — the corpus moves). **Gate-bite** (Req 6.4): at arming time, a throwaway PR with a deliberately defective completion doc, proof cited on the register row — planned in tasks, not built here.

## Design Decisions

- **DD1 — Full-scan parity, diff-scoped materiality.** Parity over the whole declared population every run: deterministic, self-healing after force-pushes, and cheap because the population is empty at birth. *Residual: a pre-existing red in a declared spec blocks unrelated PRs once armed — accepted; that is what "armed" means, and the population-gate makes legacy noise impossible.*
- **DD2 — The rule's dates come from artifacts, not constants.** In-force date: parsed from the law ballot's `RATIFIED (Peter, <date>)` line (single source of truth; no constant to drift; vacuous-green-stated-as-vacuous before ratification). Authorship date: `git log --diff-filter=A --follow` first-commit date of the `tasks.md` (CI fetch-depth 0). *Residual: a squash-merged file's authorship date is its merge date — correct for this rule's purpose (the date it entered `main` is the date it was authored into law's view); a renamed tasks.md keeps its history via `--follow`, but a delete-and-recreate resets it — which is also correct: recreation post-ratification IS authorship.*
- **DD3 — One output contract for CI and the claims pass.** The emission format is designed for two readers (the PR summary line; Stacy's CLOSEOUT read per Req 5.3), so the interim-owner handoff at build time is a format no-op.
- **DD4 — Fixtures as specification-encoded pairs with provenance headers** (C7): solves the write-scope wall (Stacy's specs live in her scope; the encoded fixtures in the granted scope) while making spec↔fixture divergence diffable. *Residual: the encoding step is a translation a dishonest build could fudge — bounded by the provenance header making the comparison one `diff` away, and by her review of the checker-build unit.*
- **DD5 — The worked example models the full convention** (C8.2) rather than the minimum: one artifact teaches the table, the ⚠️, decomposition-grouping, the AV shapes, and the deferral form. *Residual: a maximal example reads busier than a minimal one; chosen because the canonical example is the corpus's strongest teacher (B5's whole lesson) and an unshown form is an untaught form.*
- **DD6 — Deferral arrow accepts `→` and `->`** at parse; the guide teaches `→`. *Residual: two accepted spellings is a tiny grammar widening; declined to enforce one because an ASCII-only author would otherwise hit a malformation for typography — the same class of non-authorial artifact the (c′) normalization absorbs.*
- **DD7 — The however-titled units fallback lives in the owed-set pipeline docs, not in the checker** (C2.5): the checker's parity predicate never needs units; putting legacy-form tolerance only where CLOSEOUT needs it keeps the checker's grammar strict.
- **DD8 — 127's own tasks.md opts in voluntarily** (`**Criteria mode**: per-parent`, authored pre-ratification and therefore legacy by date, opting in by declaration). The pilot then measures the convention on a spec that is bound by choice — the self-application the pilot exists for. *Residual: pilot-measures-the-ceiling caveat already carried at Req 8.7.*

## Cross-References

Requirements traces inline throughout. Sources of authority unchanged (requirements.md § Traceability). The design introduces no new law; every normative string above (messages, forms, labels) is either quoted from a ruled source or fixed here as implementation detail for the round to attack.
