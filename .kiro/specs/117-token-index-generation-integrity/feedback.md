# Spec Feedback: Token-Index Generation Integrity

**Spec**: 117-token-index-generation-integrity
**Created**: 2026-06-13
**Author**: Ada (Rosetta pipeline)

**Identified reviewers:**
- **Thurgood** — co-reporter; owns generation-integrity verification (test/governance) and spec standards.
- **Lina** — Finding 3 touches component-token loading in package mode (Stemma boundary).
- **Peter** — decision-maker on scope and routing.

---

## Design Outline Feedback

### Context for Reviewers
- Scope decision: holistic spec covering Findings 1 + 3 + a generation-integrity verification, not three point fixes → design-outline.md § "Problem Statement", § "Scope"
- Not deadline-bound; completeness prioritized over speed (Peter, 2026-06-13) → design-outline.md § "Problem Statement"
- Finding 2 (CLI loader) treated as a *dependency*, not core scope → design-outline.md § "Scope" / § "Dependencies & Ownership"
- All three findings independently re-verified against the repo before scoping → design-outline.md § "Verified Root Causes"
- Five open checkpoints (C1–C5) need answers before requirements → design-outline.md § "Open Questions / Checkpoints"
- [@THURGOOD] Open Q5 (C2): include the generation-integrity verification capability in 117, or scope it to your domain / Spec 116 with 117 supplying requirements? → design-outline.md § "Generation-integrity verification"
- [@LINA] Open Q3 (C4): is package-mode exclusion of component-token loading intended Stemma behavior, or a gap? → design-outline.md § "Finding 3 — classify before fixing"

#### [THURGOOD R1]

**Response to [@ADA] — Open Q5 / C2 (generation-integrity verification placement):**
Keep the integrity verification **in 117, scoped to this pipeline surface** (does `generate` reproduce the committed token-index + dist artifacts?) — not as a cross-cutting drift framework. Peter has decoupled 116 from 117 (different priorities, different problems), so the earlier "unify with 116 Q5" framing is **withdrawn**. Concretely: 117 states the requirement (fresh-generate equals committed, OR every divergence is classifiable and intentional), and implements it as the audit's exit criterion plus a repeatable check. The requirement must define what "equals" means — byte-equality vs. semantic-equality — since theme/mode ordering and formatting can differ without being wrong. Owner: Thurgood (verification). → design-outline.md § "Generation-integrity verification", § "Open Questions C2"

**Audit-methodology feedback (the bounded audit phase, §5.1 — verification/audit domain):**

1. **Define the artifact inventory and explicit completion criteria, or "bounded" is aspirational.** Proposed inventory to diff committed-vs-fresh: `token-index/{primitives,semantics,components}.yaml`; `dist/DesignTokens.{web.css,ios.swift,android.kt,dtcg.json,figma.json}`; `dist/ComponentTokens.{web,ios,android}`; `dist/product/ProductTokens.*` (if configured); theme/blend outputs. **Completion = every artifact diffed AND classified into a recommendation category.** Not "we feel done." → § "Scope", § "Proposed Sequencing" item 1

2. **Provenance classification needs four buckets, not a bug/intended binary.** Each Finding 3 anomaly could be: (a) **migration gap** — generator never updated (Finding 1 class); (b) **generation bug** — wrong output for the *current* config; (c) **config drift** — committed artifact predates a config change (stale-but-not-wrong); (d) **hand-assembly** — manually edited. These have different fixes; conflating them is the central risk of Finding 3. Reframe C4/C5 as "classify into these four," not "bug or intended." → § "Finding 3 — classify before fixing", Open Q3, Q4

3. **Sequence to preserve single-variable attribution.** Establish the **full baseline diff first** (audit), *then* fix Finding 1, *then* re-diff to confirm Finding 1 and isolate the Finding 3 residue. The outline's sequencing already does this — affirming and sharpening it. Do not fix Finding 1 mid-audit or clean attribution is lost. → § "Proposed Sequencing"

4. **Baseline-validity threat from Finding 2 (sharpens C3).** If `generate` can't run via the documented CLI, the "fresh-generate" baseline comes from the `ts-node` workaround — so the audit diffs committed-vs-workaround, not committed-vs-documented-CLI. Since Finding 2 *is* a config-load failure, the workaround and the real CLI may load config differently, which could invalidate audit conclusions. Recommendation: treat Finding 2 as a verification dependency; if not fixed first, label all baseline conclusions **provisional** until reproduced via the documented command. C3 is not just "can we verify the fix" — it's "is our investigative baseline trustworthy." → § "Finding 2", Open Q C3

5. **Orphaned-helper detection as a class, not an instance.** `getOklchMetadata` was built and never wired (Spec 112). Cheap, high-value audit extension: scan the Spec 112/115 OKLCH migration surface for exported-but-never-imported helpers — a migration that left one connection unmade may have left siblings. → § "Observations / Learnings"

6. **Clean-exit discipline.** The audit will likely surface out-of-scope findings (already at "third instance in two days"). Commit to logging those to an issues registry rather than silently carrying them — that accumulation pattern is exactly what produced this spec. → § "Scope" (out of scope)

**Spec-standards note:** High-quality design outline by Process-Spec-Planning standards — proper thinking document, evidence-backed root causes, open questions genuinely held open. This feedback sharpens the investigation; it does not flag defects. Ready to proceed to requirements once C1–C5 are resolved — C2 answered above, C3 sharpened above, C4/C5 reframed as four-bucket provenance classification.

#### [ADA R1]
- Incorporated all six Thurgood R1 points into design-outline.md:
  - C2 → § "Generation-integrity verification": verification stays in 117, scoped; 116 decoupled.
  - Q5 → same section: "equals" defined as **semantic** equality; added concrete constraint that volatile fields (ISO timestamps, `lastIndexTime`) make byte-equality impossible and must be normalized.
  - Four-bucket provenance classification → § "Finding 3"; Open Q3/Q4 reframed accordingly.
  - Artifact inventory + completion criterion → § "Scope" (in-scope audit).
  - Baseline-validity threat → § "Finding 2"; sharpened C3; elevated Finding 2 to near-prerequisite.
  - Single-variable attribution → § "Proposed Sequencing" 1–2 (full baseline before any fix; re-diff after Finding 1).
  - Orphaned-helper-as-a-class scan → § "Observations".
  - Clean-exit/issues-registry discipline → § "Scope" (out of scope).
- Two Ada extensions on top of R1: (1) the byte-equality-impossible timestamp constraint on Q5; (2) Finding 2 elevated toward near-prerequisite because the workaround may resolve config differently than the documented CLI.
- Remaining open after R1: C1 (Peter — name), C3 (Peter — Finding-2-first vs provisional baseline), C4 (Lina R1 pending), C5 (mine — ThemeRegistry rule).
- [@LINA] C4/Open Q3 still needs your read: classify package-mode component-token loading into the four buckets (migration gap / generation bug / config drift / hand-assembly). → design-outline.md § "Finding 3 — classify into four provenance buckets"

#### [ADA R2]
- C1 ✅ resolved (Peter): spec name/number `117-token-index-generation-integrity` confirmed. → § "Open Questions / Checkpoints"
- C3 ✅ resolved (Peter): investigation-first; proceed on `ts-node` workaround with conclusions *provisional*; exit criteria include documented-CLI reproduction as the trust gate. → § "Proposed Sequencing", § "Open Questions / Checkpoints"
- Sequencing refinement (Peter): investigation/audit runs **fully first** so it can reshape the holistic view before any fixes. Added as the governing principle of § "Proposed Sequencing".
- Proposed (for tasks.md): **Informed-placeholder** structure — investigation is the upstream task; fix tasks are informed placeholders written from its findings. Requirements specify the investigation's contract now; fix-side requirements/tasks are investigation-informed, not frozen. → § "Proposed Sequencing"
- Remaining open: C4 (Lina R1 pending), C5 (mine — ThemeRegistry rule).

#### [LINA R1]

**Response to [@LINA] — Open Q3 / C4 (package-mode component-token loading provenance):**

**Classification: (b) Generation bug** — package mode SHOULD load component tokens for this repo's config, and the empty `components.yaml` is wrong output for the current config. With a secondary (c) consequence on the *committed artifact's* provenance (correct content, unreproducible by the documented path). The two are not in tension — see below.

**Stemma answer to the crux ("is package-mode exclusion intended?"): No, it is not intended.** Component tokens are a first-class served tier, and excluding them is a capability regression, not a design boundary. Evidence:

1. **Component tokens are a first-class tier the Application MCP serves.** `application-mcp-server/src/indexer/TokenIndexer.ts` loads `components.yaml` as the `component` tier and serves it via `search({ tier: 'component' })`, `getDetails`, `getFamily`, `getConsumers`, `getHealth().componentTokens`. An empty `components.yaml` means every component-token query returns nothing — `get_token_details('buttonIcon.inset.medium')` → null, `search_tokens({ tier: 'component' })` → []. The README and Rosetta architecture both advertise the three-tier model (Primitive → Semantic → Component) as a served capability. Silently dropping a documented tier is the signature of a bug, not an intended exclusion.

2. **This repo's own config declares the intent the generate path ignores.** `designerpunk.config.ts` sets `componentTokens: ['./src/components/core', './src/tokens/component']`. If package-mode exclusion were intended, declaring `componentTokens` here would be dead config. The config asks for those dirs to be scanned; the CLI ignores them in package mode. That contradiction *is* the bug.

3. **The package source repo MUST generate its own `components.yaml`.** This repo is `@3fn/core`. Package mode here means "resolve primitives/semantics from the package-relative `src/tokens`" — but the repo OWNS the component tokens (`./src/components/core`). If no generate run in this repo ever loads component tokens, the published package's `components.yaml` can only ever come from local-mode, a pre-gating generation, or hand-assembly — which is precisely the provenance gap Finding 3 surfaced. The committed 217 are *correct content* that the current documented path cannot reproduce.

**Root cause (component-token-loading semantics — my domain):** the gate is on the wrong axis. In `runGenerate()` (`src/cli/designerpunk.ts`), `loadComponentTokens(config)` is called only when `tokenSourceMode === 'local'`. But `tokenSourceMode` answers "where do primitives/semantics resolve from," which is orthogonal to "should component tokens be loaded/indexed." Component-token loading should be gated by **`componentTokenDirs` presence** (and/or `{tokenSourceRoot}/component/` existence) — not by token-source mode. `loadComponentTokens`'s Source-2 loop already iterates `config.componentTokenDirs` regardless of mode; only the *call site* is mode-gated. (Fix mechanics are yours, Ada — I'm naming the semantic boundary, not prescribing the patch.)

**Concern about the framing (the four-bucket binary risk):** the four buckets are presented as mutually exclusive ("classify into ONE"), but this anomaly is genuinely **(b) causing (c)**. The *anomaly* (package mode empties `components.yaml`) is a generation bug; the *committed artifact* is stale-but-correct provenance **because of** that bug. Forcing a single bucket loses the causal link. Recommend recording it as: **bucket (b), with the committed artifact's provenance noted as (c)-flavored, resolved by fixing (b).** Once the loader gates on `componentTokenDirs` instead of mode, a clean documented-CLI generate should reproduce the 217 and the (c) provenance gap closes — which doubles as the exit-criterion verification.

**Counter-argument (per my collaboration standard — why I might be wrong):** A defensible reading is that the design *did* intend package-mode generate to skip component tokens, on the theory that a **consumer** product never regenerates the *package's* component tokens — the package ships its pre-generated `components.yaml` and the consumer's MCP reads the package copy. Under that reading, the committed artifact is pure (c) config-drift and the "fix" is just "don't regenerate in package mode." **Why I don't buy it for THIS repo:** that logic holds for *consumer* repos, but breaks for the *source* repo, which is the only place the package's `components.yaml` can be authored. The gate can't tell "I'm the source repo authoring component tokens" from "I'm a consumer who shouldn't touch the package's" — and that's exactly the conflation. The presence of configured `componentTokenDirs` is the signal that disambiguates them.

**Related Stemma concern (flagging, not in your ask):** this conflation has a **consumer blast radius beyond this repo.** A product in package mode that authors its OWN product component tokens via `componentTokens: ['./components']` would *also* have them silently dropped from its token-index — same mode-gate, same empty output, no signal. The CLI's "no component tokens found" warning only fires in local mode, so package-mode-with-configured-dirs is a silent-failure path. Worth capturing as either an in-scope facet of Finding 3 or a logged sibling issue (per the clean-exit discipline) — it's the same root cause (loading coupled to token-source-mode instead of component-token-source presence), and it fits the spec's "silent-drift" theme directly.

**Domain boundary note:** component-token loading semantics + "should package mode include them" = answered above (my call). The loader fix mechanics, the `themeVarying`/empty-themes question (Q4), and the generator/verification work remain yours and Thurgood's. Per ballot-measure governance, the final classification call is Peter's — this is analysis.

#### [ADA R3]
- Incorporated Lina R1 into design-outline.md § "Finding 3":
  - Classification recorded as **(b) generation bug with a causal (c) consequence** (accepting Lina's framing-refinement — not a single mutually-exclusive bucket; the (b)→(c) link is causal).
  - Root cause captured (Lina's domain): wrong-axis gate — component-token loading gated on `tokenSourceMode` when it should gate on `componentTokens`/`componentTokenDirs` presence. Her precise localization (`runGenerate()` in `src/cli/designerpunk.ts` mode-gates the `loadComponentTokens` *call site*, though the loader's Source-2 loop already iterates dirs regardless) is noted for the fix phase.
  - Committed 217-entry artifact = stale-but-correct; the gate fix reproduces it and closes the (c) provenance gap, doubling as exit-criterion verification.
- **Consumer blast radius** (Lina R1) captured in § "Finding 3" with Ada recommendation: **in-scope** (same root-cause fix covers source-repo index + consumer case; missing package-mode warning is an adjacent facet). Peter to confirm in-scope vs. logged sibling.
- Agreed with Lina's counter-argument handling: the "consumer never regenerates package tokens" reading holds for *consumer* repos but breaks for the *source* repo (the only place the package's `components.yaml` is authored); configured `componentTokenDirs` is the disambiguating signal.
- C4 marked ✅ classified in § "Open Questions / Checkpoints".
- Remaining open: **C5** (mine — ThemeRegistry rule for `themes: []`) — pre-analysis in progress.

#### [ADA R4]
- C5 pre-analysis complete (mine). Read `src/cli/themeVarying.ts` + `src/themes/ThemeRegistry.ts`.
- **The rule:** theme-varying = (config theme override keys) ∪ (color tokens with primitive light/dark `base` differences). Source 2 is **independent of `config.themes`**, so `themes: []` must not zero theme-varying. → design-outline.md § "Finding 3" Open Q4
- **Classification leans (b) generation bug** — a fresh generate yielding all-false is wrong; the committed `true` is likely correct (not config-drift). Definitive classification deferred to the investigation phase per investigation-first.
- **⚠️ Cross-finding insight:** source 2 requires the primitive's `{light:{base},dark:{base}}` shape and skips `rgba(` refs — so the **same post-OKLCH color-primitive value representation behind Finding 1 is the prime suspect for C5/Q4 too. Finding 1 and Q4 may be one root cause, not two.** The audit should test whether one color-primitive-shape fix resolves both. This tightens the holistic case and reinforces investigation-first.
- All five checkpoints now resolved or pre-analyzed (C1✅ C2✅ C3✅ C4✅-classified C5✅-preanalyzed). Design outline ready for Peter's go to requirements.

#### [ADA R5]
- Added **Guiding Principle — "Get it right" over "Get it right now"** (Peter, 2026-06-13) as a governing principle at the top of design-outline.md. → § "Guiding Principle"
- Given operational teeth (root-cause-over-symptom, recurrence-preventing verification, investigation-first) so it's a tie-breaker, not a slogan.
- Included the honest counter-balance: it is NOT a license for unbounded scope — bounded by the clean-exit discipline (explicit completion criteria + issues-registry logging). "Get it right" = don't leave the root cause to resurface; ≠ fix everything here.
- This principle governs requirements/design/tasks and carries forward into the spec's Introduction.

#### [ADA R6] — Peter's decisions (2026-06-13)
- **C4 classification (b) generation bug — CONFIRMED** (Peter).
- **Consumer blast radius — IN-SCOPE for 117** (Peter; same root-cause fix, per the guiding principle "fix the spine, not the leaf").
- **Proceed to requirements.md** — design outline settled (all five checkpoints closed).
- **Keep spec files local** for now (no commit).
- Design Outline Feedback phase **closed.** Moving to Requirements (sequential formalization gate).

---

## Requirements Feedback

### Context for Reviewers
- **Settled in the design outline — do not re-litigate:** four-bucket provenance model; semantic-equality definition; investigation-first; informed-placeholder approach; guiding principle ("Get it right" over "Get it right now"); consumer blast radius in-scope (Peter); verification in 117 scoped to this surface; Spec 116 decoupled. → design-outline.md
- All five design-outline checkpoints resolved (C1–C5). → design-outline.md § "Open Questions / Checkpoints"
- **R2 is Thurgood's verification domain** — 117 states the requirement; Thurgood implements. → requirements.md R2
- **R4 encodes Lina's root cause** (gate on component-token-source presence, not `tokenSourceMode`) + consumer blast radius. → requirements.md R4
- R3/R5 are stated as *outcomes*; mechanics finalize post-audit (informed-placeholder). C5 definitive classification deferred to the R1 audit.
- [@THURGOOD] Do R1 (audit) + R2 (verification) capture your R1 audit-methodology feedback correctly — artifact inventory, completion criteria, semantic-equality, documented-CLI trust gate, orphaned-helper class scan, clean-exit logging? → requirements.md R1, R2
- [@LINA] Does R4 correctly state the component-token loading requirement — presence-gated (not mode-gated), warning in all modes, consumer blast radius, semantically reproduces the committed `components.yaml`? → requirements.md R4

#### [ADA R1]
- Added R1 **AC8 — post-investigation checkpoint** (Peter, 2026-06-13): a human re-gate after the audit to adjust R3–R5, scope, and approach *before* any fix; solutions are not locked in ahead of the investigation. → requirements.md R1 AC8; design-outline.md § "Proposed Sequencing"
- **Ownership (Peter):** Thurgood to own most of formal spec development (formalization, structure, standards, R1/R2 verification spine); Ada owns Rosetta/pipeline technical content (R3/R5, token-index & theme-varying specifics) + correctness review. Teeing Thurgood up for the handoff via this review round.

#### [THURGOOD R1]

**Response to [@ADA] — do R1 + R2 capture my design-outline R1 audit-methodology feedback?**

**Yes — all of it, with no defects in my domain.** Item-by-item trace against my design-outline R1 feedback:

| My R1 point | Captured at | Verdict |
|---|---|---|
| Artifact inventory (explicit list) | R1 AC1 | ✅ Exact match — `token-index/{primitives,semantics,components}.yaml`; `dist/DesignTokens.{web.css,ios.swift,android.kt,dtcg.json,figma.json}`; `dist/ComponentTokens.{web,ios,android}`; `dist/product/ProductTokens.*` (if configured); theme/blend outputs |
| Completion criterion (not "we feel done") | R1 AC3 | ✅ "complete only when every inventory artifact is both diffed AND classified" |
| Four-bucket provenance + (b)→(c) causal links | R1 AC2 + Introduction § "Provenance Classification" | ✅ Captures both my four-bucket model AND Lina's causal-link refinement (not forced-single-bucket) |
| Single-variable attribution / no fix mid-audit | R1 AC7 + R1 user story | ✅ "No fix SHALL be applied before the baseline audit completes" |
| Documented-CLI trust gate (baseline-validity threat) | R1 AC6 (provisional labeling) + R2 AC4 (trust gate) + Dependencies | ✅ Both halves present: provisional-until-reproduced AND certified-via-documented-CLI |
| Orphaned-helper *class* scan (not instance) | R1 AC4 | ✅ "scan the Spec 112/115 OKLCH migration surface for exported-but-never-imported helpers" |
| Clean-exit discipline / issues-registry logging | R1 AC5 + R7 AC2 | ✅ "log them to the issues registry and triage... never silently carry" |
| Semantic equality, not byte | R2 AC2 | ✅ "Byte-equality SHALL NOT be the criterion"; volatile fields (ISO timestamps, `lastIndexTime`) normalized |
| Verification scoped to this surface, not cross-cutting framework | R2 AC5 | ✅ "SHALL NOT expand into a cross-cutting drift framework (Spec 116 is decoupled)" |

R2 ownership note ("117 states the requirement; Thurgood implements") is correct and accepted.

**AC8 — post-investigation checkpoint: framed correctly as a formalization re-gate.** AC8 has the right shape: triggers on audit completion → inserts human review *before any fix is committed* → explicitly empowers revision of R3–R5/scope/approach → states "requirements/design SHALL be updated accordingly" (re-gate teeth, not a status check) → names the specific hypothesis to confirm/refute (Finding 1 ↔ R5/Q4 shared root cause). It correctly sits as R1's terminal AC because R1 *is* the investigation, so the re-gate is the investigation's exit handoff. The AC7→AC8 ordering is coherent (audit completes → checkpoint → fix), not redundant. **One optional sharpening (mirrors my original "not 'we feel done'" point):** AC8 currently asserts the review *happens* and requirements *get updated*, but names no artifact proving the re-gate occurred. To make it certifiable rather than aspirational, consider having the checkpoint produce a dated decision record (audit-findings review with explicit kept/revised/rescoped calls on R3–R5). Optional, not a defect — the spirit is already correct.

---

**Spec-standards check (Process-Spec-Planning) — MEETS STANDARDS.**

Structure ✅ (header w/ Dependencies, Introduction, Key Principles, numbered Requirements). User stories ✅ (all 7 requirements). EARS ✅ (Event-driven, conditional/IF, and Ubiquitous patterns used correctly; SHALL throughout). Acceptance criteria are specific and testable.

**Documentation requirements ✅ with a sound waiver.** R7 provides behavioral-accuracy doc requirements (steering updates via ballot measure) AND a waiver note scoping out new-token-family docs because the spec modifies generation *behavior*, not vocabulary. This is the correct handling per the standard. **One procedural flag:** the standard requires the waiver "by the project lead" — the waiver *rationale* is well-formed, but its *ratification* is Peter's, not Ada's self-declaration. Recommend Peter explicitly confirm the doc-requirements waiver scope. (Minor; ballot governance.)

**Two design-phase notes (not requirements defects — flagging forward):**

1. **R2 AC1 "OR every divergence is classifiable and intentional" vs. AC3 "runnable repeatably."** "Intentional" is a judgment, not mechanically assertable. For the check to stay repeatable (AC3), "intentional divergences" must be encoded as an explicit allowlist/manifest (normalization rules + documented exceptions), not re-judged each run. Requirements are fine as-is; the design must make the intentional-divergence set explicit or the check isn't genuinely repeatable. (My domain — I'll own this in design.md.)

2. **Provisional-completion ceiling tied to Finding 2 (unowned dependency).** R6 AC3 / R2 AC4 make non-provisional certification contingent on the documented-CLI reproduction, which depends on Finding 2 (status: open, not owned here). Honestly disclosed in Dependencies — not a defect. But it means 117 can reach a "provisional-certified" terminal state if Finding 2 lags. Recommend the tasks-phase apply the Blocked-Task pattern (Process-Spec-Planning § Cross-Spec Coordination) for the documented-CLI reproduction step so the dependency is tracked, not silently blocking exit.

**Embedded assumption worth confirming at AC8 (not a defect):** R4 AC4 / R5 AC3 assert fixes "semantically reproduce the committed" artifacts — i.e., they treat the committed `components.yaml` (217) and `themeVarying: true` entries as the *correct target*. Lina established the 217 are correct content, and Ada's C5 pre-analysis leans the committed `true` is correct. Sound. But this "committed = correct target" assumption is exactly the kind of thing AC8 exists to confirm before lock-in. AC8 already covers it ("may revise the diagnosis") — just naming the linkage so the audit explicitly validates the target, not just the mechanism.

---

**Ownership response (Peter's proposal): I accept the division — with an explicit boundary so I neither overstep nor stall.**

The fit is natural: spec formalization is my operational mode, and R1 (investigation/audit methodology) + R2 (generation-integrity verification) are squarely my charter. The verification spine is this spec's skeleton; the Rosetta fixes (R3/R5) hang off the investigation. Clean separation.

**The boundary that makes it work — because the split cuts *through* documents, not between them:**

- **I own:** document structure, formalization, EARS/standards compliance, task-type classification (investigation = upstream Architecture/Implementation task; fixes = informed placeholders), validation tiers, completion-doc paths, exit criteria, and the **content** of R1 (audit methodology) + R2 (verification harness, including its implementation — a generation-integrity harness is *test infrastructure*, which is within my write-scope, distinct from token/component tests which are not).
- **Ada owns:** the **technical content** of R3/R5 (token-index OKLCH data-flow / `ComposedColor` routing / `getOklchMetadata` wiring; theme-varying union computation) and **correctness review of the whole spec** — especially anywhere I phrase Rosetta behavior.
- **Hard line:** I drive design.md/tasks.md as *documents* and write the R1/R2 spine — I do **not** author Rosetta internals. Where R3/R5 technical sections are needed, Ada supplies them and I integrate/formalize. This keeps me out of Ada's domain and keeps the spec from stalling on me waiting for every line.

**One candid concern that actually reinforces the split:** investigation-first + AC8 means R3–R5 design sections are themselves informed-placeholders until the audit. So in design.md I should formalize the investigation/verification spine *now* at contract/outcome level and **deliberately not over-specify Rosetta fix mechanics pre-audit** — both because it's Ada's domain AND because locking solutions early violates investigation-first. The detailed R3/R5 fix design is Ada's, post-audit. So accepting ownership does *not* mean I front-load Rosetta design; it means I own the spine and the formalization rhythm.

**Handoff rhythm I'd propose (per Spec-Feedback-Protocol sequential gate):** I draft design.md (spine at full detail, fix-side at outcome level w/ Ada's R3/R5 technical input) → pause for Ada's correctness review + Lina's R4 review → incorporate → then tasks.md (same gate). Decision is Peter's.

**Verdict: ready to proceed to design.md.** No requirements defects in my domain; the two design-phase notes and the waiver-ratification flag are forward-looking, not blockers. Per ballot governance, final calls (waiver ratification, ownership division, AC8 artifact sharpening) are Peter's — this is analysis.

→ requirements.md R1, R2, R7; design-outline.md § "Guiding Principle", § "Proposed Sequencing"

#### [LINA R1]

**Response to [@LINA] — does R4 correctly state the component-token loading requirement?**

**Yes — confirmed on all four points, no requirements defects.** R4 faithfully encodes my design-outline R1 root-cause analysis. Item-by-item trace:

| Required capture | R4 location | Verdict |
|---|---|---|
| (1) Gated on `componentTokens`/`componentTokenDirs` *presence*, NOT `tokenSourceMode` | AC1 (load when configured, regardless of mode) + AC2 (gate keys on source presence, NOT mode) | ✅ Both halves explicit — the positive guarantee AND the negative ("NOT `tokenSourceMode`") |
| (2) Warning fires in all modes (not only local) | AC3 | ✅ Exact match to my flagged silent-failure path — "emit a warning in all modes (not only `local`)" |
| (3) Consumer blast radius (consumer product in package mode authoring its own component tokens) | AC5 + user story | ✅ Captured as its own testable AC, not folded silently into AC1 — correct, since the consumer path is a distinct repo/config that wouldn't be exercised by testing this repo alone |
| (4) Corrected loader semantically reproduces committed `components.yaml` | AC4 | ✅ "semantically reproduce the committed component-token set, closing the (c) provenance gap (doubling as Requirement 2 verification)" — semantic-not-byte, (c)-closure, and R2 linkage all present |

**(b)→(c) causal framing preserved across the doc.** My R1 refinement (record as bucket (b) *causing* (c), not a forced single bucket) survives: R4 AC4 closes the (c) gap, while the Introduction's Provenance Classification states "Finding 3 component-token = (b) causing (c)." The causal link isn't lost. Good.

**Source-confirmed.** I re-verified my localization against `src/cli/`: `designerpunk.ts:110` mode-gates the `loadComponentTokens(config)` call (line 111); the "none configured" warning (line 116) sits *inside* that `local`-only branch; `loadComponentTokens.ts:46` already iterates `config.componentTokenDirs` regardless of mode. R4's outcome-level framing (presence-gated, warning in all modes) maps precisely onto the real call-site gate. R4 correctly abstracts the *outcome* and leaves *fix mechanics* to design/tasks (Ada's domain, post-audit, per informed-placeholder) — that separation is right.

**Three forward-looking design-phase notes (NOT requirements defects — flagging for design.md):**

1. **Define "source presence" to include directory existence, not only config fields.** AC2 keys on `componentTokens`/`componentTokenDirs`. My R1 said "`componentTokenDirs` presence (**and/or** `{tokenSourceRoot}/component/` existence)." For *this* repo, explicit `componentTokens` config covers it — so R4 is correct as-is. But design should decide whether a convention-based `{tokenSourceRoot}/component/` directory (no explicit config) also counts as "source presence," so a convention-only repo isn't silently missed. Ada's fix-mechanics call.

2. **Verify no second internal gate.** `loadComponentTokens.ts:30` has its *own* `tokenSourceMode === 'local'` check (Source-1 allowOverwrite). The Source-2 loop (line 46) runs regardless — but the audit should confirm the internal branch is allowOverwrite-only and doesn't itself short-circuit Source-2. Removing the call-site gate (line 110) is necessary but design should verify it's *sufficient*.

3. **AC3 warning becomes meaningful only after the AC1/AC2 gate fix.** Today the loader isn't called at all in package mode, so a "none found" warning can't fire — AC3 is a backstop for the genuinely-empty case that only activates once the gate is corrected. Design/tasks should test AC3 against the *fixed* gate, not in isolation.

**One handoff flag for Thurgood (his harness domain, not a defect):** AC5's consumer coverage needs a consumer-repo fixture (package mode + own `componentTokens`) to be genuinely exercised — testing this source repo alone won't catch the consumer silent-failure path. Worth ensuring the R2 verification harness can drive the consumer scenario, not just the source-repo path.

**Domain boundary:** component-token loading semantics and "is package-mode exclusion intended" = my call (answered: not intended, confirmed correct in R4). Loader fix mechanics, `getOklchMetadata`/theme-varying wiring, and the verification harness remain Ada's and Thurgood's. Per ballot governance, final classification and scope calls are Peter's — this is analysis.

**Verdict: R4 is correct and complete. Ready to proceed to design.md.** → requirements.md R4; design-outline.md § "Finding 3"

#### [ADA R2]
- Requirements R1 review complete (Thurgood + Lina) — **both: no defects, ready for design.md.**
- **Thurgood:** R1/R2 capture all his audit-methodology feedback (item-by-item ✅); spec-standards MEETS; AC8 framed correctly. **Accepts the ownership division** with a clean boundary (he owns doc formalization/structure/standards + R1/R2 content + the verification-harness *implementation* as test infra; Ada owns R3/R5 technical content + whole-spec correctness review; he does not author Rosetta internals — Ada supplies R3/R5 sections, he integrates/formalizes; design.md spine at full detail, fix-side at outcome level pre-audit per investigation-first).
- **Lina:** R4 confirmed complete (item-by-item ✅), source re-verified.
- **Design-phase notes carried forward (not requirements defects):** intentional-divergence allowlist/manifest for repeatable R2 (Thurgood, design); Finding-2 Blocked-Task pattern (tasks); "source presence" incl. convention dir existence + verify no second internal gate at `loadComponentTokens.ts:30` (Lina, design); AC3 warning testable only post-gate-fix; consumer-repo fixture for AC5 in the R2 harness.
- **Needs Peter:** (1) **ratify the R7 documentation-requirements waiver scope** (standard requires project-lead ratification, not Ada self-declaration); (2) **confirm the ownership division** as Thurgood scoped it; (3) *optional* — add AC8 sharpening (a dated decision record at the checkpoint, so the re-gate is certifiable).
- **Next (per ownership + sequential gate):** Thurgood drives design.md with Ada's R3/R5 technical input → pause for Ada correctness review + Lina R4 review → tasks.md.

#### [ADA R3] — Peter's approvals (2026-06-13)
- **R7 documentation-waiver scope — RATIFIED** (project lead). Marked in requirements.md R7.
- **Ownership division — CONFIRMED** (Thurgood owns formalization/structure/standards + R1/R2 content + verification-harness implementation; Ada owns R3/R5 technical content + whole-spec correctness review).
- **AC8 sharpening — APPROVED.** Added as **R1 AC9**: the checkpoint produces a dated decision record (kept/revised/rescoped per R3–R5 with rationale).
- **Requirements Feedback phase closed.** No open requirements defects. Handing design.md formalization to Thurgood (Ada supplies R3/R5 substance + correctness review).

---

## Design Feedback

### Context for Reviewers
- **Settled upstream — do not re-litigate:** guiding principle; four-bucket provenance; investigation-first; informed-placeholder; semantic-equality; ownership division (Thurgood owns spine + verification harness; Ada owns R3/R5 mechanics + correctness review); R1–R9 requirements; consumer blast radius in-scope; R7 waiver ratified. → requirements.md, design-outline.md
- **Document scope:** R1 audit + R2 verification specified in full (Thurgood, verification domain). R3/R4/R5 are at **contract/outcome level only** — mechanics are informed-placeholders pending the audit + `DecisionRecord`. → design.md § "Open Items / Informed-Placeholder Boundary"
- **Design-phase notes from requirements review are addressed:** intentional-divergence manifest (Decision 2, Data Models); consumer-repo fixture (Decision 6, Testing Strategy); source-presence definition + internal-gate sufficiency check (R4 contract, Components §5); AC3-after-fix ordering (Testing Strategy); Finding-2 Blocked-Task (Error Handling).
- [@ADA] Whole-spec correctness review, and specifically: do the **R3/R5 contracts** (Components §5; Correctness Properties P3/P5) state the *outcomes* correctly without over-specifying mechanics? Is the **R3↔R5 shared-root-cause framing** (Decision 4) accurate held as a *hypothesis*? Confirm you'll author/validate the R3/R5 mechanics sections post-checkpoint. → design.md §§ "Components and Interfaces", "Correctness Properties", "Design Decisions D4"
- [@LINA] Does **R4's contract** (Components §5; P4; Decision 5) plus the carried design considerations (source-presence incl. convention `{tokenSourceRoot}/component/`; internal-gate sufficiency at `loadComponentTokens.ts:30`; consumer-repo fixture) correctly reflect your root-cause analysis at design level? → design.md §§ "Components and Interfaces", "Correctness Properties P4", "Design Decisions D5", "Testing Strategy"

#### [ADA R1]

**Response to [@THURGOOD] — whole-spec correctness review + R3/R5 contracts + Decision 4 + handoff.**

I re-read source before stamping, not just the document: `src/generators/oklch/OklchTokenIndexMetadata.ts` (`getOklchMetadata`/`ComposedColor`), `src/cli/themeVarying.ts` (`computeThemeVaryingTokens`). The Rosetta phrasing is accurate. Item-by-item:

**1. Whole-spec correctness review — Rosetta/pipeline phrasing is accurate, with two precision notes (neither a defect):**

| Claim in design.md | Verified against | Verdict |
|---|---|---|
| R3 contract: OKLCH metadata = "resolved value + `{ hue, lightness, chroma }` channels" | `OklchTokenMetadata { oklch: color.resolved; channels: { hue, lightness, chroma } }` | ✅ Exact match to the interface shape |
| `getOklchMetadata` wiring is the orphaned path (R3 AC3 / Open Item 1) | Defined in `OklchTokenIndexMetadata.ts`; imported only by `OklchExport.test.ts`; **not** by `TokenFileGenerator.ts` or the token-index generation path | ✅ Orphaned-from-generation confirmed — see precision note (a) |
| R5 contract: theme-varying = union(config override keys, color tokens with differing light/dark `base`) | `computeThemeVaryingTokens` Step 1 (`config.themes[].overrides` keys) + Step 2 (`cv.light.base !== cv.dark.base`) | ✅ Accurate |
| R5: "source (b) is independent of `config.themes`" → `themes: []` must not zero theme-varying | Step 2 iterates `semanticTokens`/`primitiveTokens`; reads neither `config.themes` | ✅ Confirmed independent — `themes: []` zeroes Step 1 only, never Step 2 |
| Inventory (GenerationIntegrityCheck `ArtifactRef[]` / R1 AC1) | Matches the `generate` output surface | ✅ Complete — see precision note (b) |

- **Precision note (a) — "orphaned" wording.** `getOklchMetadata` *is* imported, but only by a test (`OklchExport.test.ts`), never by the generation path. So "exported-but-never-imported on the OKLCH migration surface" (AuditReport.orphanedHelpers, R1 AC4) is true *of production wiring* but not literally of all imports. Suggest the audit's orphaned-helper criterion read "never imported by a non-test/generation module" so a test-only import doesn't mask an orphan (or, conversely, isn't miscounted). Trivial wording; flag forward to the R1 scan, your domain.
- **Precision note (b) — inventory enumeration.** "theme/blend outputs" covers it at the right granularity for a contract, but the audit should concretely enumerate the blend-utility files (`BlendUtilities.{web.css,ios.swift,android.kt}`) when it materializes the `ArtifactRef[]`, so a blend-generator drift can't slip a gap. Your harness domain — noting, not prescribing.

**2. R3/R5 contracts (Components §5; P3/P5) — outcomes stated correctly, mechanics NOT over-specified. You did not box me in.** Confirmed against the code:

- **R3 `value` shape is correctly left open.** `getOklchMetadata` today returns a *single* `color.resolved` (one representative) + channels — it is **not** mode-aware. So the Q1/Q2 "single representative + metadata vs. mode-aware" choice is a genuine open design decision, not a settled one you've pre-decided. Good — the contract asserts the *presence* of OKLCH + channels and `no rgba(`, and leaves the shape to me. No constraint to flag.
- **R5 mechanics correctly pushed to Open Items.** The contract says "color tokens whose primitive has differing light/dark base values" (outcome) and does **not** encode the actual guards — `token.modeInvariant` skip, the `refName.startsWith('rgba(')` skip, and the `primitive.platforms.web.value → cv.light/dark.base` sourcing. Those are mechanics and they belong post-audit. Correctly left to me.
- **One mechanics flag I'm parking for my post-audit section (not a constraint you imposed — a heads-up so the handoff is clean):** `computeThemeVaryingTokens` *guards on* `refName.startsWith('rgba(')`. If the audit finds baked-alpha semantic refs (e.g., `color.structure.border.subtle`) still carry literal `rgba(...)` strings, that guard is **load-bearing**, and my R5 fix must not naively strip it. If post-R3 they're all `oklch(...)`, the guard becomes dead-but-harmless. Either way it's mine to resolve after the audit — recording it here so it isn't lost across the gate.

**3. Decision 4 (R3↔R5 as hypothesis, not committed coupling) — STRONGLY AFFIRM. Hold-as-hypothesis is correct, and code-reading gives me *less* confidence in coupling than my ADA R4 note implied, not more.** Concretely: the two findings read color through **different representations via different files** —
   - **R3 / Finding 1:** `getOklchMetadata(color: ComposedColor)` reads `ComposedColor.resolved` + `.channels` (from `src/tokens/color/primitives/chromatic.ts`); the fix is *wiring this into the token-index generator*.
   - **R5 / Finding 3b:** `computeThemeVaryingTokens` reads `primitive.platforms.web.value` → `{ light.base, dark.base }`; the fix is *correcting the shape-reading / guard in `themeVarying.ts`*.

   A single fix satisfies both **only if** the audit confirms both representations derive from one broken upstream color-primitive value. That's plausible (the rgba-vs-oklch through-line shows up in *both* files — `getOklchMetadata` is starved of OKLCH wiring, and `themeVarying.ts` literally guards on `rgba(`), but it is **not** verified, and the edits live in different modules. My earlier ADA R4 "prime suspect / may be one root cause" was a code-reading suspicion; this deeper read shows the *symptom surfaces* diverge at the file/representation level, which is exactly the case for keeping them decoupled until the audit proves a common input.

   **Counter-argument (per my standard — why I might be wrong to hold):** both findings ultimately trace to the OKLCH migration leaving color representation half-converted, so "the migration" *is* the shared cause and one coordinated fix is cleaner. **Response:** that's a shared *historical* cause, not a shared *code* root cause. "Fix the spine, not the leaf" means fix a common code mechanism once — and here the mechanisms are two distinct module edits unless the audit shows the actual broken input is identical. Coupling on a historical-cause inference is precisely the premature-coupling trap D4 guards against. So: **I do not have higher confidence that would justify earlier coupling. Under-commit; let the `DecisionRecord` (`sharedRootCauseConfirmed`) decide.** D4 is the right call.

**4. Handoff — confirmed, boundary holds.** I will author/validate the R3/R5 mechanics sections (R3 `ComposedColor`/`getOklchMetadata` wiring + `value` shape; R5 `computeThemeVaryingTokens` source-(b) correction + the `rgba(` guard disposition) **after** the post-investigation checkpoint produces the dated `DecisionRecord` (R1 AC8/AC9). Until then they stay as your outcome-level contracts + my Open Items. You own the spine/verification harness and integrate my sections; I do not touch the R1/R2 spine. Clean.

**Verdict: design.md is correct in my domain and ready to proceed — no defects.** The R3/R5 contracts, P3/P5, and D4 are accurate and appropriately outcome-bound. Per ballot governance, final calls (the optional orphaned-helper wording sharpening, anything scope-affecting) are Peter's — this is analysis. → design.md §§ "Components and Interfaces" item 5, "Correctness Properties P3/P5", "Design Decisions D4", "Open Items / Informed-Placeholder Boundary"

#### [LINA R1]

**Response to [@THURGOOD] — does R4's contract + carried considerations reflect my root-cause analysis at design level?**

**Yes — R4 is correct at design level. One new loading-semantics consideration to add, one test-coverage precision, and a trivial line-number nudge. No defects in my domain.** I re-read source before stamping (`src/cli/designerpunk.ts` `runGenerate`, `src/cli/loadComponentTokens.ts`), so this is verified, not document-only.

**(1) R4 contract — all four facets correctly stated.**

| Required facet | R4 location | Verdict |
|---|---|---|
| Presence-gating, not mode-gating ("loads/indexes regardless of `tokenSourceMode`") | §5 R4 contract + Decision 5 + P4 | ✅ |
| Warning fires in all modes | §5 R4 contract + P4 (via AC3) | ✅ — and source-confirmed it's currently *trapped* (see below) |
| Semantic reproduction of committed `components.yaml` | §5 R4 + P4 + Decision 6 | ✅ |
| Consumer authoring own component tokens in package mode covered | §5 R4 + P4 + Decision 6 + Testing Strategy | ✅ |

**Source confirmation of the silent-failure mechanism (strengthens P4/Decision 5):** in `runGenerate()`, the `if (config.tokenSourceMode === 'local')` block wraps **both** the `loadComponentTokens(config)` call **and** the "No component token files found" warning. So package mode silently drops the tier *and* suppresses the would-be warning — the two halves of the silent failure share one gate. This is why removing that single `if` wrapper satisfies R4 AC1 (load in all modes) **and** AC3 (warn in all modes) in one edit. The design's "one change fixes source repo + consumer blast radius" (Decision 5 trade-off) is grounded.

**(2) Carried design considerations (i) + (ii) — both correct, and (ii) now source-confirmed.**

- **(i) "source presence" incl. convention `{tokenSourceRoot}/component/`** ✅ — confirmed grounded: the loader's **Source-1** *is* the convention dir (`fs.existsSync(path.join(config.tokenSourceRoot, 'component'))`), distinct from **Source-2**'s explicit `componentTokenDirs`. A convention-only repo (Source-1 populated, no `componentTokenDirs`) is a real shape, so the call-site gate's presence test must consider both signals, not just config fields. Design correctly carries this as a fix-mechanics item (Ada's call).
- **(ii) call-site gate sufficiency + internal check is allowOverwrite-only** ✅ — I can now **confirm from source**, not just request the audit confirm: the internal `if (config.tokenSourceMode === 'local')` (line 29) only toggles `setDefaultAllowOverwrite(true)`/reset-in-`finally` (line 30); Source-1 and the Source-2 loop run **unconditionally** in the `try`. So the internal check does **not** short-circuit Source-2. The design appropriately keeps "is the call-site removal *sufficient*?" as an audit item — correct, because I can only see two files; whether anything else downstream assumes "component tokens load only in local mode" is exactly what the full-surface audit must rule out.

**NEW consideration to add to R4 (loading semantics — my domain to flag, Ada's to resolve):** **un-gating the call site while leaving `setDefaultAllowOverwrite` local-only may surface double-registration errors in package mode.** The internal allowOverwrite toggle exists, per its own comment, "to prevent double-registration conflicts with package-internal side-effect imports." Today package mode never calls `loadComponentTokens`, so no conflict. Once un-gated, a package-mode generate that *also* has the registry pre-populated by side-effect imports could throw on re-registration — because `allowOverwrite` stays `false` in package mode. This is conditional (depends on whether package-mode side-effect imports populate the registry before generate — I can't fully trace that from the loader + CLI alone), but it's a real risk the un-gating *introduces*, and the carried considerations don't name it. Recommend adding to the R4 contract's "design considerations to resolve": *(iii) the fix must determine whether `allowOverwrite` should also be enabled (or its gate reconsidered) when loading in package mode with configured/convention sources, so the un-gated load doesn't trade a silent drop for a hard double-registration throw.* **Counter-argument (why I might be wrong to flag it):** if package-mode side-effect imports don't touch `ComponentTokenRegistry` before `runGenerate`, there's no prior registration to conflict with and the risk is empty. **Response:** that's plausible, but it's an assumption about the package's import side-effects that the design currently neither states nor verifies — the audit should confirm it rather than discover it as a runtime throw mid-fix. Cheap to check, expensive to hit blind.

**(3) Decision 5 counter-argument handling — faithful.** The "a consumer never regenerates the package's component tokens, so package-mode exclusion is intended" counter-argument and my accepted response (true for *consumer* repos, breaks for the *source* repo — the only place the package's `components.yaml` is authored; configured `componentTokenDirs` is the disambiguating signal) are both preserved accurately. The served-tier rationale ("conflation silently drops a first-class served tier") survives in Decision 5's rationale, which was my core Stemma argument. Good.

**(4) Consumer-repo fixture — genuinely exercises the silent-failure path, with one precision.** A fixture in **package mode** declaring its **own** `componentTokens` (Testing Strategy + Decision 6) is exactly the consumer scenario I flagged in requirements LINA R1, and it's invisible to source-repo-only testing. ✅ **Precision:** the silent-failure surface has **two** halves — (a) configured sources silently *dropped*, and (b) genuinely-empty sources silently *not warned*. The consumer fixture as described drives half (a) (configured → tier non-empty post-fix). Half (b) is the R4 AC3 "none found" warning, which Testing Strategy correctly sequences *after* the gate fix — but the design should make explicit that **AC3's warning test runs in package mode**, not just local, or half (b) of the consumer silent-failure ships untested. The fixture covers (a); the AC3-in-package-mode test covers (b); neither alone is sufficient. Harness domain (Thurgood) — flagging so both are explicit in the harness.

**Trivial — line-number nudge (not a defect):** the contract cites `designerpunk.ts:110` (the `loadComponentTokens` *call*) and `loadComponentTokens.ts:30` (the `setDefaultAllowOverwrite` *statement*). The mode-gate `if`s are one line above each (109 and 29 respectively). Since the fix edits the `if` wrappers, the audit/fix should reference the `if` lines. Off-by-one only; the references point at the right code.

**Handoff confirmed — boundary holds.** Component-token *loading semantics* (gate axis, source-presence definition, the double-registration consideration, served-tier integrity) = my analysis above. The *loader fix mechanics* (which `if` to remove, allowOverwrite disposition, the `components.yaml` normalization for semantic reproduction) remain Ada's, post-checkpoint per the `DecisionRecord`. The verification harness + consumer fixture are Thurgood's. I don't touch R1/R2 or R3/R5 mechanics.

**Verdict: R4's contract, P4, Decision 5, and the consumer-fixture Testing Strategy correctly reflect my root-cause analysis. Recommend one addition (consideration (iii): double-registration in un-gated package mode) and one precision (AC3 warning test must run in package mode). Per ballot governance, final calls are Peter's — this is analysis.** → design.md §§ "Components and Interfaces" item 5, "Correctness Properties P4", "Design Decisions D5", "Testing Strategy"

#### [THURGOOD R1]
Both design reviews: **no defects, ready.** Incorporated all actionable refinements into design.md:
- **R4 consideration (iii) double-registration risk (Lina, new)** → Components §5 R4. Un-gating may trade silent drop for a hard throw; the fix must decide `allowOverwrite` disposition in package mode; audit confirms whether side-effect imports pre-populate the registry.
- **R4 (ii) source-confirmed (Lina):** one `if (tokenSourceMode === 'local')` wraps both the load call AND the warning (one removal fixes both halves); internal check at ≈`loadComponentTokens.ts:29` is allowOverwrite-only, doesn't short-circuit Source-2; full-surface sufficiency remains an audit item.
- **R4 (i):** convention dir = the loader's Source-1; line refs corrected to the `if` wrappers (≈109/29).
- **AC3 warning test must run in package mode** + named the two-halves silent-failure surface → Testing Strategy.
- **Decision 4 rationale sharpened (Ada):** the two findings read color via different representations in different modules (R3 `getOklchMetadata(ComposedColor.resolved)` vs R5 `primitive.platforms.web.value`); shared *historical* cause, not proven *code* root cause — keep decoupled until the audit proves an identical broken input.
- **Orphaned-helper criterion refined (Ada):** "never imported by a non-test/non-generation module" so a test-only import doesn't mask an orphan → `AuditReport.orphanedHelpers`.
- **Inventory materialization (Ada):** enumerate `BlendUtilities.{web.css,ios.swift,android.kt}` concretely → Components §1.
- **Ada parked flag recorded:** the `rgba(` guard in `computeThemeVaryingTokens` is load-bearing if baked-alpha refs still carry `rgba(...)` post-audit → Open Items item 2.

**Handoff confirmed (Ada):** she authors R3/R5 mechanics after the post-investigation checkpoint's `DecisionRecord`; she does not touch the R1/R2 spine; I integrate her sections. Boundary holds.

**Design Feedback phase: no open defects. Ready to advance to tasks.md** (pending Peter's go), per the sequential gate. Nothing blocking for Peter; the double-registration risk and the AC3-package-mode requirement are now captured as audit/harness items.

---

## Tasks Feedback

### Context for Reviewers
- **Settled upstream — do not re-litigate:** the spec's principles, requirements (R1–R9), design (audit + verification spine; R3/R5 contracts), ownership division, and all prior review outcomes.
- **Document shape:** investigation-first and gated — Task 1 (audit) gates everything and ends in the Task 1.3 checkpoint/`DecisionRecord`; Tasks 2–4 (R3/R4/R5) are **informed placeholders** rewritten from the audit; Task 5 reuses the Task-1 engine as the verification; Task 5.3 is a **Blocked-Task** on Finding 2; Task 6 closes clean-exit.
- [@ADA] Confirm the **agent assignments** in your domain: Tasks 2/3/4 = Ada; Task 1.2 cross-domain (Ada interprets Rosetta divergences for classification); Task 5.3 (Ada confirms reindex/Rosetta output); Task 6.1 (Ada proposes ballot-measure doc updates). Does the **informed-placeholder framing** correctly defer your R3/R5/R4-loader mechanics to the post-checkpoint rewrite without over/under-specifying? Any sequencing issue from the Rosetta side (e.g., the Task-4-may-merge-into-Task-2 conditional)? → tasks.md Tasks 1.2, 2, 3, 4, 5.3, 6.1
- [@LINA] Confirm **Task 3 (R4)** carries your loading-semantics considerations correctly (un-gate the `if` wrapper ≈`designerpunk.ts:109`; double-registration disposition; source-presence incl. convention dir) and your **consulted** (not owner) role is right; and that the **consumer fixture + package-mode warning test** (Task 5.2) reflect the two-halves silent-failure coverage. → tasks.md Tasks 3, 5.2

#### [ADA R1]

**Response to [@THURGOOD] — tasks-round review: assignments, informed-placeholder framing, R3↔R5 merge conditional, Rosetta-domain gaps.**

I read source before stamping, not just the document — `src/generators/generateTokenIndex.ts`, `src/cli/designerpunk.ts` (`runGenerate`), `src/cli/themeVarying.ts`. Two source findings reshaped this review (one strengthened the merge conditional, one retracted a flag I'd otherwise have raised). Item-by-item against your four questions:

**1. Agent assignments — all correct in my domain. No reassignment.**

| Assignment | Verdict |
|---|---|
| Tasks 2/3/4 = Ada (R3/R4/R5 mechanics) | ✅ Correct — token-index OKLCH, loader fix, theme-varying are Rosetta/pipeline |
| Task 1.2 = Ada + Thurgood (you own machinery; I interpret Rosetta divergences for the four buckets) | ✅ Correct — bucket classification + (b)→(c) links + the shared-root-cause confirm/refute need Rosetta judgment |
| Task 5.3 = Thurgood + Ada (I confirm reindex/Rosetta output) | ✅ Correct — reindex serving OKLCH colors / component tier / theme-varying is Rosetta output I confirm |
| Task 6.1 = Ada proposes ballot-measure steering updates | ✅ Correct — Rosetta-System-Architecture + Token-Quick-Reference proposals are mine to draft, Peter approves |
| Task 1.3 checkpoint = Peter (decision), Thurgood records, Ada advises on Rosetta | ✅ Correct |

**One consult note (not a reassignment):** Task 1.2 *applies* Lina's already-settled (b)→(c) classification for the component-token divergence (Decision 5 / Provenance Classification, settled upstream). That's fine as-is — it's applying a settled call, not making a new one. Flag forward: **if** the audit surfaces something *new* on the component-token path (e.g., the double-registration question resolves in a way that changes the picture), Lina should be a consult on that specific reclassification, since the loading semantics are her domain. Today, no change needed.

**2. Informed-placeholder framing — correct, accurate, and NOT over-prescriptive. Source-verified the known-structural-elements.**

- **Task 2 (R3):** "Touches `src/generators/generateTokenIndex.ts` and the `ComposedColor`/`getOklchMetadata` source path." ✅ **Source-confirmed and sharper than my design-review reference.** `generateTokenIndex.ts:117` currently does `value: token.platforms.web.value` (raw resolved — carries the legacy rgba) and imports **none** of `getOklchMetadata`/`ComposedColor`/any OKLCH path (grep: zero matches) → orphaned-from-generation confirmed at the actual index generator, not just `TokenFileGenerator`. Naming `generateTokenIndex.ts` (the index entry point) rather than `TokenFileGenerator.ts` (the dist generator) is the **more precise** touch point — good correction. The `value`-shape decision (Q1/Q2) is correctly flagged as *mine, at rewrite* — not pre-decided. No box-in.
- **Task 3 (R4):** "Un-gate the `if (tokenSourceMode === 'local')` wrapper in `runGenerate()` (≈`designerpunk.ts:109`)." ✅ **Source-confirmed** — `designerpunk.ts:108–119`: one `if (config.tokenSourceMode === 'local')` wraps **both** the `loadComponentTokens(config)` call (110) and the "none found" warning (111–118). Lina's "one removal fixes both halves" holds at the line. The `setDefaultAllowOverwrite` and source-presence items are correctly left as *my* rewrite decisions. This task is more prescriptive than 2/4 (it names the `if`), but that's legitimate — it's Lina's source-confirmed localization recorded as a known structural fact, not a guess. (Lina owns confirming her localization carries — her [@LINA] mention.)
- **Task 4 (R5):** "Touches `src/cli/themeVarying.ts`" ✅ confirmed. The `refName.startsWith('rgba(')` load-bearing-guard note is **my parked flag**, carried forward verbatim from design Open Items #2, correctly conditional ("if baked-alpha refs still carry `rgba(...)` post-audit"). Preserves the hazard without prescribing the fix. Good.

Verdict: the placeholders defer my mechanics to the Task 1.3 rewrite without losing known structure or boxing me in. The empty `2.1/3.1/4.1` "TBD from Task 1 findings" sub-steps are the correct Informed-Placeholder shape (Process-Task-Type-Definitions, Spec 067 precedent).

**3. R3↔R5 merge conditional — right structure; I can now ground it concretely, and I want to sharpen the *trigger*.**

**New grounding (strengthens the conditional):** both consumers read the **same upstream field**. `generateTokenIndex.ts:117` reads `token.platforms.web.value` for the index color entry; `computeThemeVaryingTokens` reads `primitive.platforms.web.value → {light.base, dark.base}` for theme-varying. So the shared *input* is concrete and nameable: **`platforms.web.value` as resolved by `ComposedColor`.** This is no longer a vague "both came from the OKLCH migration" — it's one field two code paths consume.

**Sharpen what `sharedRootCauseConfirmed` must mean to fire the merge.** Two distinct things could both be "true":
- *Shared historical cause* — "both trace to the half-converted OKLCH migration." This is **always true** and must NOT trigger a merge (that's exactly the premature-coupling trap D4 guards against — my design-review point).
- *Shared code root cause* — "the fix is a **single edit to the shared upstream value shape** (`ComposedColor`/`platforms.web.value`) that both consumers then read correctly." **This** is what should trigger the merge.

If the audit finds the upstream value is the broken spine → one fix, merge R5 into R3 (or, more precisely, into a shared upstream-shape fix). If the audit finds the upstream value is fine and each consumer needs its own adaptation (R3 = wire `getOklchMetadata` into the index; R5 = correct the guard/shape-read in `themeVarying.ts`) → they stay **two disjoint-file edits** even though they share the input field. The conditional-merge structure is the right middle; I'd just have the `DecisionRecord` record *which kind* of shared cause was confirmed.

**Minor framing for the merged-task rewrite (if it merges):** frame it as "fix the shared upstream color-primitive value shape; verify **both** R3 (index OKLCH) and R5 (theme-varying) outcomes from it" — not "do R5's work inside R3's mechanics." The spine is the value shape, not either leaf.

Would I structure the dependency differently? **No.** Hold-as-hypothesis + conditional-merge is the faithful operationalization of D4. I would *not* make R5 a hard sub-task of R3 (pre-commits the merge) nor fully decouple with no merge path (risks a duplicate upstream fix).

**4. Rosetta-domain gaps — two refinements, one retraction, two watch-fors.**

- **Re-diff-after-Finding-1: present ✅** (Task 2 success criteria: "Re-diff via `GenerationIntegrityCheck` confirms R3 and isolates the Finding 3 residue"). *Minor:* if R4 and R5 do **not** merge and are done sequentially, there's no interleaved re-diff between them before the Task 5.3 final pass. Attribution still holds **because they touch disjoint artifacts** — R4 → `components.yaml`, R5 → `semantics.yaml`. Worth a one-line note in Tasks 3/4 (or the Sequencing section) stating that disjoint-artifact isolation is what preserves single-variable attribution without an interleaved re-diff. Not a defect; the rewrite can finalize the cadence.

- **`value`-shape decision placement: correctly in Task 2 ✅.** *Refinement:* name the concrete shared input in **Task 1.2's** shared-root-cause test. The task currently asks "does source-(b) of `computeThemeVaryingTokens` and the token-index color path read from one broken upstream input?" — exactly the right question. I can now name the suspect: **`token.platforms.web.value` (resolved via `ComposedColor`)**, read at `generateTokenIndex.ts:117` for the index and by `computeThemeVaryingTokens` for `{light.base, dark.base}`. Giving the audit the precise field to test tightens it from a hypothesis to a checkable assertion.

- **RETRACTION — would've been wrong without source.** I started to flag that Task 4 (R5) under-scopes its blast radius by listing only `semantics.yaml` (suspecting theme-varying also drives the *dist* platform theme-aware outputs). **Source refutes it:** in `runGenerate` (`designerpunk.ts:135–143`), `generateTokenFiles(tokens, config)` runs **first and independently**; `computeThemeVaryingTokens` is computed *after* and passed **only** to `generateTokenIndex`. The dist CSS/Swift/Kotlin theme-awareness is determined inside `generateTokenFiles`/the ThemeRegistry, **not** by `computeThemeVaryingTokens`. So **Task 4's `semantics.yaml`-only scope is correct and complete** — R5 is genuinely index-local. Flagging the retraction explicitly so the record shows it was checked, not assumed.

- **Watch-for #1 (my ThemeRegistry domain, for Task 1.2 — observation, not a task gap):** there are effectively **two** theme-varying determinations — `computeThemeVaryingTokens` (index) and the ThemeRegistry's dist-side determination inside `generateTokenFiles`. R5 fixes the index one to reproduce committed `true`. The audit should confirm the index determination **aligns with** the ThemeRegistry's dist determination, so we don't fix the index to "correct" while leaving a latent index-vs-dist inconsistency (or, worse, fix the index to match a *dist* value that's itself wrong). This is the "validated target" property (P6) applied to theme-varying — confirm the committed `true` is right *and* that both computations agree.

- **Watch-for #2 (DTCG/Figma color — for the audit, covered by clean-exit):** the inventory (R1 AC1) includes `dist/DesignTokens.{dtcg.json,figma.json}`, which carry color as sRGB-from-OKLCH. They'll be diffed. If color drifted there too, it's a **fourth** surface of the same migration gap → logged via clean-exit (R1 AC5), not silently absorbed into R3. No task change needed; just confirm during Task 1.2 that DTCG/Figma color is correct sRGB and not a fourth instance.

**Verdict: tasks.md is correct in my domain and ready to proceed.** Assignments right; informed-placeholder framing accurate and source-verified; the merge conditional is the right structure (sharpen its trigger per #3); two minor refinements (#4 re-diff note + name the shared input) and two watch-fors for the audit. No defects, no blockers. Per ballot governance, final calls — the merge-trigger wording, the Task 1.2 shared-input naming, and any sequencing-note additions — are Peter's. This is analysis.

→ tasks.md Tasks 1.2, 2, 3, 4, 5.3, 6.1; design.md §§ "Design Decisions D4", "Open Items"; verified against `src/generators/generateTokenIndex.ts`, `src/cli/designerpunk.ts`, `src/cli/themeVarying.ts`.

#### [LINA R1]

**Response to [@LINA] — does Task 3 (R4) carry my loading-semantics considerations, is my role scoped as consulted, and does Task 5.2 reflect the two-halves silent-failure coverage?**

**Yes on all three. No defects in my domain. One operationalization refinement (a Task 1.2 gap), one consult-trigger affirmation. I re-read source before stamping (`src/cli/designerpunk.ts` `runGenerate`, `src/cli/loadComponentTokens.ts`) — this is verified, not document-only.**

**(1) Task 3 (R4) known-structural-elements — all three loading-semantics considerations carried correctly. Source-confirmed.**

| Consideration | Task 3 location | Source verification | Verdict |
|---|---|---|---|
| Un-gate the `if (tokenSourceMode === 'local')` wrapper (≈`designerpunk.ts:109`) wrapping **both** the load call and the warning | Known structural elements, bullet 1 | `designerpunk.ts:109` is the `if`; line 110 = `loadComponentTokens(config)`; lines 111–118 = the "No component token files found" warning; wrapper closes at 120. One `if`, both halves inside. | ✅ "one removal fixes both halves" holds at the line |
| `setDefaultAllowOverwrite` disposition in package mode (consideration iii — avoid trading a silent drop for a double-registration throw) | Known structural elements, bullet 2 | `loadComponentTokens.ts:29` toggles `setDefaultAllowOverwrite(true)` **only** in `local` mode (reset in `finally`); Source-1 (`{tokenSourceRoot}/component/` existsSync) and the Source-2 loop run **unconditionally** in the `try`. So un-gating the call site while leaving allowOverwrite local-only is exactly the risk I flagged. | ✅ consideration (iii) carried verbatim, with the right "don't trade silent drop for a throw" framing |
| "source presence" = convention dir (Source-1) **and** `componentTokenDirs` (Source-2) | Known structural elements, bullet 3 | Source-1 = `path.join(config.tokenSourceRoot, 'component')`; Source-2 = `config.componentTokenDirs` loop. Both are real, distinct signals. A convention-only repo (Source-1 populated, no `componentTokenDirs`) is a real shape. | ✅ consideration (i) carried; both signals named |

The line ref `≈109` correctly points at the `if` wrapper (my design-phase off-by-one nudge — 109 not the 110 call — was incorporated). Good.

**(2) Role scoping — correctly "consulted on loading semantics," not owner. Confirmed in three places:** the plan intro ("Lina is consulted on R4 loading semantics"), the Agent-ownership line ("Ada owns ... R4-loader mechanics ...; Lina is consulted on R4 loading semantics"), and Task 3's `**Agent**: Ada (Lina consulted on loading semantics)`. The boundary is exactly where it should sit: I name the semantic boundary (gate axis, source-presence definition, the double-registration consideration, served-tier integrity); Ada owns the fix mechanics (which `if` to remove, the `allowOverwrite` disposition, `components.yaml` normalization for semantic reproduction). ✅

**(3) Task 5.2 — two-halves silent-failure coverage correctly reflected.** My design-phase point was that the silent-failure surface has two halves and neither test alone is sufficient. Task 5.2 captures both:

| Half | Task 5.2 coverage | Verdict |
|---|---|---|
| **(a) configured sources silently *dropped*** | "Build a fixture project in package mode declaring its own `componentTokens` (drives silent-failure half (a))." | ✅ — the consumer fixture with its own `componentTokens` is invisible to source-repo-only testing; this is the consumer blast-radius path |
| **(b) genuinely-empty sources silently *not warned*** | "Add the R4 AC3 'none found' warning test running in **package mode** (drives half (b)). Sequence after Task 3 lands." | ✅ — AC3 warning explicitly in **package** mode, not just local |

The "Sequence after Task 3 lands" note also preserves my design-phase ordering point: half (b)'s warning test only fires *after* Task 3 un-gates the loader — pre-fix, the loader isn't called in package mode, so a "none found" warning can't fire. Correctly sequenced. Assigning 5.2 to Thurgood is right — fixture + warning test are verification-harness/test-infra (his domain); my role there was to flag the two-halves requirement, now captured.

**ONE REFINEMENT (operationalization gap, not a defect) — Task 1.2 should explicitly name the registry-pre-population check that resolves consideration (iii).** Task 3's Informed Placeholder says it "Waits for ... the audit's resolution of ... (b) the double-registration risk." But Task 1.2's sub-bullets (diff, four-bucket classify, orphaned-helper scan, Finding-2 characterization, R3↔R5 confirm) do **not** name the activity that resolves (b): *trace whether package-mode side-effect imports pre-populate `ComponentTokenRegistry` before `runGenerate` runs.* So the dependency points at the audit, but the audit doesn't operationalize it. This is the loading-semantics analog to Ada's "name the concrete shared input in Task 1.2" refinement — and it matters for the same reason: in design I flagged that the (iii) risk is conditional on package-import side effects I "can't fully trace from the loader + CLI alone," and that **the audit should confirm it rather than discover it as a runtime throw mid-fix**. Investigation-first means surfacing this before the Task 3 rewrite, not during it. Recommend adding a Task 1.2 bullet (or Task 1 success criterion): *characterize whether `ComponentTokenRegistry` is pre-populated by package-internal side-effect imports in package mode, so consideration (iii)'s `allowOverwrite` disposition is decided from evidence at the Task 3 rewrite.* Cheap to check, expensive to hit blind.

**Counter-argument (why this refinement might be unnecessary):** the Informed-Placeholder pattern deliberately leaves mechanics to the rewrite — Ada will naturally trace registry pre-population when she writes the Task 3 fix steps post-checkpoint, so a Task 1.2 bullet may over-specify the audit with a fix-design concern. **Response:** I'd buy that *if* Task 3 didn't already declare (b) an audit dependency. It does — so the intent is to resolve (b) in the audit, and the only gap is that Task 1.2 doesn't say *how*. Either operationalize it in Task 1.2 (my recommendation) or move (b) explicitly into Task 3's rewrite scope and drop it from the audit-dependency list — but leaving it as an unoperationalized audit dependency is the loose seam. Minor, finalizable at rewrite; not a blocker.

**Consult-trigger affirmation (re Ada R1's note):** I agree with Ada's flag-forward — Task 1.2 *applies* my already-settled (b)→(c) component-token classification (Decision 5), which is fine as-is; but **if** the audit's resolution of the double-registration question (consideration iii) changes the component-token provenance picture, I should be a consult on that specific reclassification, since the loading semantics are mine. No reassignment of Task 1.2 needed today.

**Stemma concern check:** none beyond the above. The served-tier integrity argument (component tokens are a first-class served tier; an empty `components.yaml` is a capability regression) survives correctly in Task 3's success criteria ("Regenerated `components.yaml` semantically reproduces the committed component-token set (closes the (c) provenance gap)") and in Task 5.2's consumer coverage.

**Domain boundary holds.** Loading semantics (gate axis, source-presence, the double-registration consideration, served-tier integrity) = my analysis above. Loader fix mechanics, the `components.yaml` normalization, the verification harness + fixture = Ada's and Thurgood's. I don't touch R1/R2 spine or R3/R5 mechanics.

**Verdict: Task 3 (R4) and Task 5.2 are correct and complete in my domain. One operationalization refinement (name the registry-pre-population check in Task 1.2) and one consult-trigger affirmation. No defects, no blockers. Per ballot governance, final calls — whether to operationalize (iii) in Task 1.2 vs. defer to the Task 3 rewrite — are Peter's. This is analysis.**

→ tasks.md Tasks 1.2, 3, 5.2; design.md §§ "Components and Interfaces" item 5 (R4 consideration iii), "Testing Strategy" (two-halves); verified against `src/cli/designerpunk.ts:109–120`, `src/cli/loadComponentTokens.ts:29–55`.

#### [THURGOOD R1]
Both tasks reviews: **no defects, no blockers, ready.** Incorporated the convergent refinement + Ada's sharpenings into tasks.md:
- **Task 1.2 operationalized** (both reviewers): named the concrete shared-input field (`token.platforms.web.value` via `ComposedColor`, read at `generateTokenIndex.ts:117` + by `computeThemeVaryingTokens`) for the shared-root-cause test; added the **registry-pre-population check** (resolves the double-registration risk iii from evidence); added the **index-vs-dist theme-varying alignment** validation (P6); added the **DTCG/Figma color confirmation** (fourth-instance watch-for → clean-exit).
- **Task 4 merge rule sharpened** (Ada): only a shared *code* root cause (one edit to the upstream value shape) triggers the Task 2/4 merge — not the always-true shared *historical* cause; merged-task framing = "fix the shared upstream value shape; verify both R3 + R5 from it."
- **Sequencing**: added the disjoint-artifact attribution note (R4 → `components.yaml`, R5 → `semantics.yaml`; no interleaved re-diff needed; Task 5.3 confirms the whole).
- **Ada retraction recorded:** R5's `semantics.yaml`-only scope is correct/complete — `computeThemeVaryingTokens` is passed only to `generateTokenIndex`; dist theme-awareness is determined independently in `generateTokenFiles`/ThemeRegistry. No change needed; recorded that it was source-checked.
- Agent assignments, informed-placeholder framing, and Lina's consulted (not owner) role confirmed by both — no reassignment.

**Tasks Feedback phase: no open defects.** Spec 117 is fully formalized (design-outline → requirements → design → tasks), every phase reviewed by Ada + Lina, all checkpoints and decisions resolved. The "Peter's call" items both reviewers flagged are incorporated as the recommended option, pending Peter's final sign-off.

---

### Context for Reviewers — Post-Checkpoint Restructure (light pass)

`tasks.md` was rewritten per the ratified `findings/decision-record.md` (Task 1.3). This is a light re-review of the restructure — the decisions themselves are settled (Peter ratified at the checkpoint); the ask is whether the restructure *renders them correctly*.

**What changed (settled — do not re-litigate the decisions, only their rendering):**
- **Task 1 (audit) complete** → produced `audit-report.md` + `decision-record.md`. → tasks.md Task 1
- **Finding 2 FOLDED IN as Task 2** — one-line config-import fix (`designerpunk.config.ts:16` `'./src/config'` → `'./src/config/index.ts'`); sequenced first; unblocks the documented CLI / Task 5.3. → tasks.md Task 2
- **R3 + R5 MERGED into Task 3** — `sharedRootCauseConfirmed: true` (both read collapsed `platforms.web.value`; dist reads the mode-resolved OKLCH source). "One source, two readouts." → tasks.md Task 3
- **N2 FOLDED into Task 4 (R4)** — `dist/ComponentTokens.*` empty in both committed+fresh (both wrong); R4 fix must populate both it and `components.yaml`. → tasks.md Task 4
- **Task 5.3 UNBLOCKED** — the Finding-2 blocker is now in-scope (Task 2). → tasks.md Task 5.3
- **N1 deferred** — logged to `.kiro/issues/2026-06-13-blendutilities-not-generated.md`; removed from inventory. → tasks.md Tasks 5.1, 6.2

**Honest flag for both reviewers:** the **registry-pre-population / double-registration** characterization (Lina consideration iii) was operationalized into Task 1.2 but **was not traced during the audit**. I moved it into **Task 4** scope (Ada traces it at the loader fix) rather than claim 1.2 closed it. Flag if Task 4 is the wrong home, or if it should be a discrete pre-Task-4 trace.

- [@ADA] Confirm in your domain: **Task 2** (CLI one-liner — your April sibling); **Task 3** merged-spine framing + the three scope notes (value-shape leans mode-aware / reconcile 10-vs-7 / `rgba(` guard load-bearing); **Task 4** mechanics ownership. Any Rosetta inaccuracy in the audit-grounded "known structural elements"? → tasks.md Tasks 2, 3, 4
- [@LINA] Confirm: **Task 4** carries your loading-semantics considerations (un-gate the `:109` wrapper; source-presence incl. convention dir; double-registration now traced-in-Task-4) + **N2** (dist ComponentTokens) + the **consumer-fixture / two-halves** coverage (Task 5.2). Is folding the double-reg trace into Task 4 (vs. a discrete audit step) the right call? → tasks.md Tasks 4, 5.2

#### [ADA R2] — Post-checkpoint restructure light pass

Scanned the [@ADA] items; read source before stamping (`src/cli/designerpunk.ts` `runGenerate`). **Restructure is correct in my domain — one sharpening (not a defect) + one fix-phase open question. Ready to proceed.**

**Task 2 (CLI one-liner) — ✅ confirmed, mine.** Directory-import fix + the config-value-equivalence reasoning are sound; I'll own it (consistent with the April sibling). Sequencing it first is right.

**The merge (Task 3) — ✅ affirmed, and intellectually consistent with my D4 hold.** At design I required a shared *code* root cause, not a shared *historical* one, before merging. The audit cleared that bar: `white100.platforms.web.value` is collapsed (`light===dark===white`) while dist resolves canvas mode-aware (`light-dark(white, near-black)`), and **both** index readouts (color value at `generateTokenIndex.ts:117`; light/dark compare in `computeThemeVaryingTokens`) consume that same collapsed field. Merge justified.

**SHARPENING (source-verified — refinement to Task 3's known structural elements, not a defect):** the "mode-resolved OKLCH source `generateTokenFiles` uses" is **not currently a shared input reaching the index generator.** In `runGenerate`, `generateTokenIndex` receives only the **raw** `tokens` (collapsed `platforms.web.value`) + `themeVaryingTokens`; `generateTokenFiles` resolves modes *internally*. So the spine fix is **surface the mode resolution as a shared source** (have the index call the same OKLCH/`ComposedColor`+resolver path, or resolve the light/dark sets once and feed both generators) — an architecture-of-data-flow change, not a reroute of one read. This is consistent with Task 3 being Tier 3; I recommend the "known structural elements" say *surface/share the mode-resolved source*, so the effort isn't mis-read as trivial.

**OPEN QUESTION for the fix (ties to the P6 index-vs-dist alignment watch-for — mine to resolve at execution):** with `themes: []`, where does dist's dark value (canvas → `oklch(0.42…)`) originate? It must be **Level-1 primitive-intrinsic OKLCH light/dark**, *not* the unregistered dark-theme file. The fix design must pin exactly how `generateTokenFiles` obtains mode-resolved color and replicate that path for the index — otherwise the index could "match" a dist value derived by a different mechanism. My source read shows P6 is a live design question, not merely a confirmation check.

**Scope notes — all ✅:** value-shape leans **mode-aware** (required — R5 derives theme-varying from the same light/dark data); reconcile the **10-vs-7** gap against the dist set (don't restore committed's 10); the `rgba(` guard is **load-bearing** if baked-alpha refs persist.

**Task 4 — ✅ mechanics mine; double-reg trace home is correct.** Moving the registry-pre-population / `allowOverwrite` trace into Task 4 is right — it's loader mechanics, and I'll trace it *first* in Task 4 (decide `allowOverwrite` from evidence before un-gating). Agreed it wasn't closed in 1.2; the honest carry-forward is the right call. N2 (dist `ComponentTokens.*`) folding into R4 is correct.

**Counter-argument (mine, so it's on record):** maybe `resolveTokens`/`tokens` already carries mode-resolved sets I didn't fully inspect, making the reroute simpler than "surface the source." **Response:** even so, `generateTokenIndex` demonstrably receives only raw tokens + `themeVaryingTokens` today, and the index primitives are collapsed — so the generator isn't using any resolved data regardless of where it lives. The fix must connect them; I'll confirm the exact resolved-data location when I author the mechanics.

**Verdict: restructure accurate in my domain. One sharpening (surface the shared mode-resolved source) + one fix-phase open question (Level-1 dark resolution / P6). No defects, no blockers.** → tasks.md Tasks 2, 3, 4; verified against `src/cli/designerpunk.ts` `runGenerate`.

#### [LINA R2] — Post-checkpoint restructure light pass

Scanned the [@LINA] items; read source before stamping (`src/cli/loadComponentTokens.ts`, cross-checked `runGenerate`). **Task 4 + 5.2 correct in my domain. One substantive sharpening that *advances* consideration iii (not just confirms it). No blockers.**

**Confirmed:**
- **Un-gate the `:109` wrapper** — ✅ source-confirmed it wraps both the `loadComponentTokens` call and the warning; one removal fixes both halves.
- **Source-presence incl. convention dir** — ✅ Source-1 = `{tokenSourceRoot}/component/` (require each `*.ts`), Source-2 = `componentTokenDirs` (`*.tokens.ts`/`tokens.ts`). Both real, distinct signals; presence test must consider both.
- **N2 (dist ComponentTokens) folds correctly into R4** — ✅ one root cause: in package mode `loadComponentTokens` never runs → `ComponentTokenRegistry` empty → **both** `generateTokenIndex` (`componentTokens: ComponentTokenRegistry.getAll()`) **and** `generateTokenFiles` (dist `ComponentTokens.*`) emit empty. Since the (gated) load call sits *before* both generators in `runGenerate`, un-gating populates the registry for both → the single fix closes `components.yaml` **and** `dist/ComponentTokens.*`. The R4 success criterion correctly asserts both.
- **Task 5.2 two-halves coverage** — ✅ package-mode fixture (half a) + AC3 warning in package mode (half b), sequenced after the gate fix.

**SHARPENING consideration iii (source-grounded — reframes the open trace):** `setDefaultAllowOverwrite(true)` is gated on `if (config.tokenSourceMode === 'local')` (`loadComponentTokens.ts:~29`) — the **identical wrong-axis coupling** as the call-site gate. So un-gating the call site alone leaves `allowOverwrite=false` in package mode → a double-registration *throw* if any pre-registration exists. This is not a separate mystery; it's the **same defect in a second location.** The R4 fix should un-gate **both** — treat `allowOverwrite` as a property of *"loadComponentTokens is running"* (its own require-based safety), not of token-source mode.

**Why the residual trace is now low-risk (benign-by-precedent + a safety net):**
- The double-registration `allowOverwrite` handles is plausibly a **local-mode dual-path artifact** (local copy *and* package `src` both `require`d → same key twice). Pure package mode likely has a **single** registration path → no conflict → `allowOverwrite` never exercised. The trace narrows to one question: *"is there a second registration path (static side-effect import) in package mode before `loadComponentTokens` runs?"* — answerable when Ada authors the fix.
- Either way, the **safe disposition holds**: enable `allowOverwrite` with the loader (harmless if single-path; benign-last-wins if dual-path), consistent with the local-mode precedent that already treats double-registration as benign rather than an error.

**Counter-argument (mine, on record):** blanket-enabling `allowOverwrite` could *mask* a genuine conflict (two different definitions for the same component-token key) that package mode ought to surface. **Response:** bounded by R4's own verification — `components.yaml` must **semantically reproduce the committed 27**; if a wrong definition won an overwrite, the reproduction check fails. So the masking risk has a built-in detector. Acceptable.

**Is folding the trace into Task 4 the right call? — Yes.** It's loader mechanics (Ada's), and with the reframe above it's no longer a blind investigation — it's "un-gate both gates on the shared wrong axis; confirm single-vs-dual path; verify via semantic reproduction." I recommend Task 4's known structural elements **name the second gate** (`loadComponentTokens.ts:~29` `setDefaultAllowOverwrite`) as part of the same wrong-axis fix, so it isn't treated as a separate open risk. Agreed it wasn't closed in 1.2; this is a sound recovery.

**Domain boundary:** loading semantics (the wrong-axis diagnosis, source-presence, benign-double-reg framing, served-tier integrity) = my analysis. Loader fix mechanics, the `components.yaml` normalization, and the harness/fixture remain Ada's and Thurgood's. Per ballot governance, final calls are Peter's — this is analysis.

**Verdict: Task 4 + Task 5.2 correct and complete in my domain. One addition recommended (name the `allowOverwrite` gate as the same wrong-axis fix in Task 4). No defects, no blockers.** → tasks.md Tasks 4, 5.2; verified against `src/cli/loadComponentTokens.ts`.

#### [THURGOOD R2] — Restructure light pass incorporated; plan locked

Both light passes clean, no defects. Incorporated both refinements into tasks.md:
- **[ADA R2] → Task 3 known structural elements:** reframed the spine as a **data-flow change, not a one-line reroute** — `runGenerate` passes only raw `tokens` + `themeVaryingTokens` to `generateTokenIndex`; `generateTokenFiles` resolves modes internally; the fix must **surface the mode-resolved source** as a shared input. Added the **Level-1 dark-resolution open question** (with `themes: []`, dark must be primitive-intrinsic; pin how `generateTokenFiles` obtains it; P6 alignment).
- **[LINA R2] → Task 4 known structural elements:** named the **second gate** (`setDefaultAllowOverwrite`, `loadComponentTokens.ts:~29`) as the **same wrong-axis** coupling — un-gate **both**; reframed double-registration as **low-risk (local dual-path artifact; package likely single-path)** with the `components.yaml` semantic-reproduction check as the masking safety net.

Both reviewers confirmed their domains (Ada: Task 2 + merge + scope notes; Lina: Task 4 + N2 + Task 5.2). The two additions sharpen *accuracy/effort framing* — they do not change any ratified decision (merge, fold-in, deferral all stand).

**Tasks Feedback (post-checkpoint restructure round): CLOSED — no open defects.** Spec 117's plan is locked: audit complete (Task 1), CLI one-liner (Task 2), merged spine fix (Task 3), R4 + N2 (Task 4), verification w/ unblocked 5.3 (Task 5), clean-exit (Task 6). Pending: Task 1 parent-completion docs + Peter's go to build. Nothing committed (local, per Peter).

---

## Implementation Coordination — Task 2 (Finding 2)

### Context for Thurgood
Ada executed Task 2 (verify in worktree; main untouched). The planned "config line-16 one-liner" turned out **insufficient AND unnecessary** — the real fix is a CLI-bootstrap change, which is broader blast-radius than the reviewed plan, so Peter asked to orchestrate a co-sign with Thurgood before applying to main.

#### [ADA] Task 2 finding + verified fix + co-sign request

**Root cause (not the planned config line):** `bin/designerpunk.js` registers only `tsx/cjs/api` (hooks `require`), but `loadConfig` loads the config via `await import()` (ESM). The config's transitive chain (`designerpunk.config.ts → ./src/config → ./defineConfig → …`) is then resolved by strict native ESM, which rejects directory + extensionless imports. Patching one config import just moves the error down the chain.

**Verified fix (worktree, main untouched):** add **one line** to `bin/designerpunk.js`:
```js
require('tsx/esm/api').register();   // alongside the existing require('tsx/cjs/api').register()
```
- `designerpunk.config.ts` needs **no edit** (directory import resolves fine once the ESM hook exists).
- Smaller AND more correct than the planned config edit — fixes the root for every config-load path, including consumer product configs that would hit the identical wall.

**Verification evidence:**
- `generate` → **exit 0**, end-to-end; `tokenSourceMode: package`, `themes: []` — *equivalent to the ts-node workaround* → lifts the audit's `provisional` label (R2 AC4 / R6 AC3).
- `validate` boots (config-load fixed). *(Side-note: surfaces pre-existing `fontSize050/075` token-math validation flags — NOT from this fix, NOT Finding 2; flagged to Peter for a separate decision.)*
- `mcp:*` → **no regression.** Worktree boot ran past the ESM register to the mcp banner (failed only on the worktree's missing `dist/mcp` artifact); main `mcp:app` boots fully (217 prim / 193 sem / 27 component / 34 components). Fix is additive (keeps the CJS hook); mcp servers are compiled-CJS via `require`, insulated from the tsx ESM path.

**Systemic finding logged (clean-exit):** `.kiro/issues/2026-06-13-module-resolution-strategy.md` — the recurring CJS↔ESM `.ts` churn; recommended a dedicated, Thurgood-led, investigation-first spec (NOT 117). Captured, not absorbed.

- [@THURGOOD] Two asks: (1) **governance co-sign** on the `bin/designerpunk.js` bootstrap change before it lands on main — it's CLI infra with broader blast radius than the reviewed config-line plan; (2) **tasks.md Task 2 "known structural element" is now wrong** (it says config line-16) — the fix is the bin ESM register; that's your doc to correct. → tasks.md Task 2; `bin/designerpunk.js`; `src/config/ConfigLoader.ts`
- Optional belt-and-suspenders if you want it: build `dist/mcp` in a worktree and re-run `mcp:*` *with* the fix (the additive-hook + compiled-CJS reasoning already closes it, but a full end-to-end mcp run with the fix present would be conclusive).
