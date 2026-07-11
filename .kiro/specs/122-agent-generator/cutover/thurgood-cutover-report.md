# Thurgood cutover report (U4)

**Date**: 2026-07-11
**Branch**: task/122-cutover-thurgood · **Spec**: 122-agent-generator Task 11
**Sequence**: C10.1 steps 1–8 (content readiness → baseline → generate → checks → this report
→ diff-vs-baseline → validations → signals → PR)

---

## Per-check results (local runs on the final branch state; CI URLs on the PR checks tab — the platform record)

| Check | Result | Notes |
|---|---|---|
| 122-diff-guard (C6) | **PASS** (full-run-green) | Thurgood's runtime artifacts now LEDGER-DERIVED guarded surfaces; lock refreshed |
| 122-canonical-vs-truth (C7) | **PASS** (clean, exit 0) | Class (d) script-path leg exercised for the FIRST time on real seat commands: the 4 governance scripts verified exists+executable at every regeneration |
| 122-sweep-1-refs | **PASS** (0 fail, 1 info) | Both law entries' claims (4 predicates) + 8 doc routes live-resolved (standing interim crossRef INFO) |
| 122-sweep-2-skills | **PASS** | `skills: []` recorded PASS (0 declared / 0 emitted) |
| 122-sweep-3-dupes | **PASS** | Regenerated config has zero double-loads |
| 122-sweep-4-ambient | **PASS** (0 info) | designed (§ Thurgood block ∪ always-set) == generated, both targets — ZERO deltas |
| 122-sweep-5-corrected-state | **PASS** | count-asserts unchanged (0 `.web.tsx`; single concept-count 136) |
| 122-sweep-6-declarations | **PASS** (1 info) | Fleet-partial INFO shrinks again (Thurgood routes the steward docs verbs: list_cross_references, validate_metadata) |
| 122-sweep-7-dispositions | **PASS** | All configs fully disposition-covered |
| 122-sweep-8-demotion | **PASS** | 9 removals, EVERY one covered by a `replaces:` cue |
| audit:coverage-map | **PASS** | Thurgood's artifacts auto-appear as guarded rows (ledger-derived) |
| Full suite / lane / tsc | recorded at parent completion (Tier 3) | |

## Firsts at this cutover

- **First `differential-auditor` agentType** through the pipeline.
- **First `collapses-into-catalog` ground-truth verdict** honored live: renders NOTHING
  (verified: zero `## Ground truth` sections on both targets) — ground truth is COMPUTED by
  the governance scripts at audit time, never snapshot (Req 10 AC2; AXA §7).
- **First live exercise of C7 class (d)'s script-path leg on real seat commands**: the four
  governance instruments (`governance-check.sh --full`, `validate-steering-metadata.js`,
  `scan-cross-references.sh`, `detect-affected-steering-docs.sh`) are `commands:` entries —
  each verified exists+executable at every regeneration. The catalog IS the ground-truth
  provisioning for this seat.
- **First TWO-entry law lock**, and the second entry RESOLVES the 119-A granularity flag by
  construction: process-development-workflow's git/commit CORE (§ "Task Completion
  Workflow") rides ambient as an asserted-section embed while the doc's remaining sections
  stay on-demand — the section-grain keep 119-A could only flag at doc grain.
- **First cutover whose `routes.agents` ALL carry `disposition: resolves`** (ada U2, lina U3).
- **OB-5 delivered (Req 14)**: the steering-addressing-conventions cue is live in his
  Routing section (per-doc id, docid#sectionid grammar, kebab-case filenames, aliases).

## Found-and-fixed during authoring (the gates biting, recorded)

1. **Verbatim-heading discipline, sharpened**: the spec-requirements route was authored as
   "Requirements Document Format"; the doc's real heading is "Requirements Document Format
   (Conditional Loading)" — a grep prefix-match false-positive the resolver's fail-loud
   caught at emission. U3's lesson said verify DECLARED ids; U4 adds: verify the FULL
   heading line, not a prefix.
2. **Dead route heading in the hand prompt**: "Task Type Classification" does not exist in
   process-task-type-definitions — routed to the live § "Overview" (classified as
   improvement in the diff artifact).
3. **Registry-ghost tool**: the CC port granted `mcp__designerpunk-application__validate_component`,
   which no server declares (C5 introspection) — replaced with the real `validate_assembly`
   + `check_composition` (both registry-verified). A grant pointing at nothing corrected.

## Acceptance signals (design C10.2, Thurgood row — A-D5/LE-D4 discipline)

| Signal | Predicted (design) | Measured | Verdict |
|---|---|---|---|
| Lock-set == pinned set (`per-agent-ambient-design.md` § Thurgood) | universals (always-set) + test-development-standards + process-development-workflow (git/commit core) | per-agent members == {process-development-workflow, test-development-standards}; core delivered section-grain via asserts | ✅ |
| Computed-manifest verdict honored (Req 10 AC2) | no standing manifest; nothing rendered | `collapses-into-catalog` → base directive; ZERO Ground-truth sections both targets | ✅ |
| \|union\| (ambient manifest members) | always-set 9 + 2 | **11** | ✅ |
| \|per-agent members\| | 2 | **2** | ✅ |
| Both targets agree | equal member sets | cc == kiro (id-set equality verified) | ✅ |
| Observed baseline (committed `thurgood.json` at cutover) | ~18 resources | **18** (`canonical/baselines/thurgood.ambient-baseline.json`, mechanically normalized — all doc resources, no KBs) | ✅ |
| Shrink (delta against the baseline) | the ~85% on-demand trim | **9 removals** (`demotion-delta.json`), each `replaces:`-covered | ✅ |

## Validation signatures (independent-validation default, amendment 4)

**Owning seat — Thurgood (content confirmation, 11.1):**
> [THURGOOD — U4 content confirmation] CONFIRMED — 2026-07-11
> (Both law embeds verified verbatim against the live corpus — test-development-standards
> § "Test Categories"/§ "Anti-Patterns" and process-development-workflow § "Task Completion
> Workflow", both predicates hold; the SECTION-grain PDW cut ruled the correct call, 119-A
> granularity flag resolves by construction. collapses-into-catalog rendering nothing
> confirmed correct — "a corpus snapshot would manufacture stale-authoritative data, the
> exact anti-pattern I audit others for." All 8 doc routes resolve; he independently
> confirmed "Task Type Classification" is DEAD and § "Overview" is the live target; OB-5 cue
> resolves strong. Tool grants: validate_component correctly replaced by validate_assembly
> + check_composition; Kiro L1 grant fix confirmed. Body an operating prompt he can work
> from; nothing lost. Zero disputes.)
>
> **Adjudication rulings (owner):** (i) @figma-console-mcp — **CONCUR, dead grant** (verified
> not in `.mcp.json`, no config/prompt reference, no Figma workflow routes to him; re-grant
> is a one-line add if a live server returns). (ii) KB table drop — **CONCUR** (hand config
> defines zero knowledgeBase resources; the table described never-wired indexes, same
> stale-falsehood class as Lina's; Grep/Glob capability carried in MCP Practice Notes).

**Independent validation — Stacy (re-derivation + coverage-of-coverage):**
> [STACY — U4 Thurgood cutover validation] CONFIRMED — independent re-derivation + coverage-of-coverage; 2026-07-11
> (Full entry: appendix below. Highlights beyond the brief: she FAULT-INJECTED to prove each
> gate non-vacuous — chmod'd `governance-check.sh` non-executable → exactly one C7
> `command-string-currency` FAIL naming it at `thurgood @ commands[0]`, restored → clean;
> dropped `test-development-standards` from the cc manifest → sweep-4 FAIL; typo'd the
> `process-hook-operations` replaces cue → sweep-8 FAIL; all restored. Lock-independent
> `generateAll()`→byte-hash of the 5 thurgood artifacts: all MATCH. All signals re-derived
> and matching (baseline 18 all-docs-no-KBs; union 11; per-agent 2; removals==baseline−union
> exactly, 9 cues bijective with 9 removals). Both correct ABSENCES confirmed by grep (no
> `## Ground truth`, no `## Knowledge fallback`); figma grant proven dead across `.mcp.json`
> + all configs + all prompt bodies. Zero disputes; 2 non-blocking routed items.)

**Main-loop engineering verification:** all fixes re-verified; final battery green (ten checks
+ C7 clean + coverage audit; full suite 8987/8987; lane 322/322; root + scripts + generator
tsc clean).

---

## Appendix — Stacy's recorded entry (verbatim, key sections)

> **[STACY — U4 Thurgood cutover validation] CONFIRMED — independent re-derivation +
> coverage-of-coverage; 2026-07-11**
>
> **State validated**: branch `task/122-cutover-thurgood` @ `a9eee2e5`; working tree carries
> only doc edits — no artifact drift; all probe mutations reverted and re-verified clean.
> **Check runs (mine)**: diff-guard `no-op-green` (0) · canonical-vs-truth `clean, 0 findings`
> (0) — **C7 class (d) proven non-vacuous** (chmod −x on governance-check.sh → 1
> command-string-currency FAIL at `thurgood @ commands[0]`; restored → clean) · sweep-4
> `PASS` **non-vacuous** (6 manifests in scope; dropping test-development-standards from
> thurgood:cc → FAIL) · sweep-8 `PASS`, delta regenerated byte-identical, **non-vacuous**
> (typo'd process-hook-operations cue → FAIL) · audit:coverage-map `PASS` (245/246, 1
> adjudicated-blank = generated.lock) · **lock-independent generateAll()→byte-hash of the 5
> thurgood artifacts: all MATCH, 0 mismatches**.
> **Signals re-derived**: baseline **18** all doc resources, **zero KBs** (grep confirms);
> normalized main's 18 resources id-set EQUAL to baseline · **|union| 11**, **|per-agent| 2**
> = {process-development-workflow, test-development-standards} · cc==kiro id-sets True ·
> groundTruth **collapses-into-catalog** both targets, **no faithfulnessVerbs** · **9
> removals**, `removals == baseline − union` exactly (2 always-layer additions:
> task-completion-protocol, designerpunk-systems-overview), 9 cues bijective with 9 removals.
> Lock-set == pinned; the process-development-workflow section-grain caveat resolves by
> construction (assert embeds only § "Task Completion Workflow"; rest stays on-demand).
> **Classification audit**: 13 rows + 1 regression re-verified vs `main:.claude/agents/thurgood.md`;
> every load-bearing render claim checked against a real carrier — validate_component ghost
> is the ONLY dropped CC tool; both law embeds render inline with all four C7 predicate
> strings present. **Two correct ABSENCES confirmed**: no `## Ground truth` (collapses-into-
> catalog renders nothing), no `## Knowledge fallback` (zero KBs). **figma-console-mcp
> genuinely DEAD**: not in `.mcp.json` (3 servers only), granted in no config, referenced in
> no prompt body — accepted-with-reason sound; no other regression-class line omitted.
> **Coverage-of-coverage**: all thurgood artifacts (3 runtime + 3 sidecars, canonical source,
> baseline, both manifests, demotion-delta) are guarded rows with named 122 checks; no blanks.
> **Firsts verified**: first differential-auditor; first collapses-into-catalog (renders
> nothing — absence confirmed); first C7 script-path leg on real commands (proven
> non-vacuous); first two-entry law lock; both routes.agents resolve.
> **Routed (non-blocking)**: (1) `figma-console-mcp@^1.10.1` remains a live npm dependency
> with a documented dev-only vuln chain yet no agent grants it and it's not in `.mcp.json` —
> a keep-or-drop decision for Peter outside this gate; (2) cosmetic — the Regression table
> header says "diff vs the current CC agent" while its single row is a Kiro-side drop
> (correctly cross-referenced), a future template might separate CC-diff from Kiro-side
> regressions.

## Adjudication notes (owner-ruled interpretation calls, this cutover)

1. **`@figma-console-mcp` dropped (accepted-with-reason)** — see the diff artifact's
   Regression adjudications: the grant is dead (server not in `.mcp.json`, referenced
   nowhere); dropping it loses no reachable capability. Reviewed by both validation seats.
2. **Prompt KB table dropped** — the hand Kiro config defines zero knowledgeBase resources;
   the table described indexes that were never wired (stale-falsehood class, same as
   Lina's). Grep/Glob capability carried in MCP Practice Notes.

## Routed items (non-blocking, carried forward)

1. **U5+ cutovers inherit**: verify the FULL verbatim heading line (not a prefix) for every
   route; registry-ghost grants (validate_component class) exist in other hand ports — check
   each cutover's tool list against C5 introspection.
2. **Sparky (U5) heads-up**: first-generation seat (no CC port to diff) — content-completeness
   check replaces the diff artifact; content-authoring is the first subtask.
3. **Thurgood's steward follow-up (NOT a cutover defect)**: at index time the application MCP
   reports `degraded` (not failed) with one stale file — `Badge-Count-Base/contracts.yaml`.
   A live-corpus staleness signal in his own stewardship domain, surfaced during this seat
   review; assess whether that contracts.yaml needs a reindex. Does not block this cutover
   (C7/sweeps green against the served state). Flagged as a spawned steward task.
