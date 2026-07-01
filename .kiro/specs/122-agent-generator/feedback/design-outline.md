# Spec Feedback: Agent Generator (122) — Design Outline

**Spec**: 122-agent-generator
**Created**: 2026-06-29
**Round**: Design Outline R1 (targeted: Ada, Lina, Data — domain owners + the skills-heavy consumer)

---

## Design Outline Feedback

### Context for Reviewers
- 122 = one canonical agent definition → per-tool configs (Kiro + CC), Rosetta-pipeline pattern (generate-don't-curate + regenerate-and-diff guard) → design-outline.md §1–§3.
- Canonical inputs (consolidated, not re-derived): 118 runtime direction, 119-A per-agent five-class ambient design (Task 9), id-addressing, routing rows, OB-5/6/7 → §2, inbound-from-*.
- RESOLVED before the round: §5(c) BOTH targets in first cut, CC-first build order (Peter, 2026-06-29).
- Defaults proposed: §5(a) defer human-TOC; §5(b) OB-5/6/7 core; §5(d) wire-cues/build-nothing-standing; §5(e) authoring ergonomics open.
- Scope: this is the pre-formalization through-line — it PROPOSES scope; feedback refines it before requirements.

---

#### [ADA R1]
- **Governance-as-law must generate FROM the corpus doc by `id` at generate-time, NOT be re-authored into canonical agent source** → §2.1/§3/§4. Otherwise 122 reintroduces dual-maintenance drift (corpus copy vs prompt copy); the diff-guard catches prompt↔canonical drift but NOT corpus↔canonical drift. *(Ada's most important point.)*
- **Restore the theme-varying-tokens manifest-schema hard case** → §5(d). It's the *root cause* behind trimming the stale iOS/Android snapshots (a token is a per-theme set, not one value), not an Ada-only footnote.
- **Distinguish "wire MCP cue (no build)" from "source→index divergence audit (a real build)"** → §5(d). The audit script is a genuine build; Ada leans it belongs to a Rosetta-pipeline spec, NOT 122 — but the outline should *name where it goes* rather than let "build-nothing" imply it doesn't exist.
- Token domain otherwise CORRECT: none-standing token manifest, MCP-served payload, module-resolution-contract routing row, `token-governance` law lock all match the 119-A design.
- `ada.json` decomposition: state explicitly that the five-class decomposition shrinks **27 ambient resources → ~3** (the verifiable acceptance signal + diff-guard's first real test) → §4. Note Ada's defect is over-breadth, not double-load dedupe (distinct from the consumer dedupe theme).
- §5(e): "structure the membership + routes, prose the rationale" — frontmatter for *what is loaded*, prose for *why/how*.
- §5(d) token verdict: build NOTHING standing for the manifest class; concur with the outline.

#### [LINA R1]
- **The catalog cue must carry the assembly-grain faithfulness verb (`get_component_full` + `get_component_health`), not just `get_component_catalog` enumeration** → §2.1/§5(d). §5(d) reduces Lina's manifest to "wire the catalog cue" and drops the faithfulness half, which is the operative "is the assembled metadata trustworthy" check.
- §5(d) CORRECTLY exempts Lina's `get_component_catalog` manifest from a new build (it already exists as the live App-MCP tool). Validated. Sharpening: her row reaches "no-build" because *the tool already serves it*; the auditors reach it because *a snapshot would be harmful* — same verdict, different reasons; don't conflate.
- **`.web.tsx`→`.web.ts` scaffolding bug: if still in canonical source at first generation, the diff-guard ENSHRINES it (committed == fresh-generate, both wrong)** → §5(b)/formalization. Must be fixed *in canonical source* before/during the first generation of lina's prompt — else generate-don't-curate locks in the wrong extension.
- **`contract-system-reference` "117 vs 136 concepts" ballot is an upstream-correctness precondition** → §2.1/§3. Generating Lina's silent-failure law from a self-contradicting source propagates the contradiction; the diff-guard can't catch a canonical-source defect.
- INPUT-fidelity check: confirm `lina.json` carries no unassessed resource leak (it has no flag, unlike ada/leonardo/sparky/kenya — absence ≠ proof of cleanliness).
- §5(e): "it's not one knob — structure tracks silent-failure risk *per class*" (governance-as-law + manifest + catalog → structured; formative + reflexive → prose).
- No Stemma objection to §5(c) both-targets; component body transforms cleanly to both.

#### [DATA R1]
- **JOB-1 content supplied:** the 4 Android skills + activation cues (`edge-to-edge`, `adaptive`, `navigation-3`, `theming-styles`); Android build/test commands (`./gradlew assembleDebug|test|connectedAndroidTest|connectedDebugAndroidTest`).
- **§2.5 skill repointing is NOT a prefix swap — it needs a MAPPING TABLE, not regex** → §2.5. Concrete failure: Kiro `.kiro/skills/android/theming/styles/SKILL.md` (nested) → CC `.claude/skills/theming-styles/SKILL.md` (flat, hyphenated); a regex `s|.kiro/skills/android/||` produces a broken `theming/styles` path. AND the `android/` prefix is stripped (CC has one flat skills namespace). `theming-styles` is the **crux skill** (the DesignerPunk-token→Compose integration point) — silently breaking it is high-impact.
- **`skill://` → CC Skill-tool transform required** → §2.3/§2.7. The generator must transform skill references for CC, not copy Kiro's `skill://` syntax, or the CC runtime won't find the skills.
- **Stale-snapshot removal needs a companion POSITIVE cue** → §2.7/generated-output quality. Trimming the `dist/android` injection is silent; emit `WHEN you need Android token values THEN use get_token_details — do NOT read dist/android/`. (Generalizes to all consumer snapshot trims.)
- **Build/test commands need a "run from: product app android/ dir" context annotation** → catalog content. There's no `gradlew` in *this* repo (it's the design-system source); a bare `./gradlew test` fails every time without the context.
- **OMISSION/fidelity:** Data's per-agent-ambient-design block dropped `start-up-tasks` (his `data.json` currently injects it via `skill://`), unlike Leonardo/Stacy who keep it. Intentional trim or Task-9 assessment gap? → flag to Thurgood; audit the ambient design for similar drops.
- §5(c) both-targets ENDORSED — the Android skills transforms (path mapping, `skill://`→Skill-tool) are exactly what a CC-only first cut would fail to validate; the Kiro adapter forces the seam honest.
- §5(a) defer / §5(b) OB-5/6/7 core / §5(d) wire-cues / §5(e) structured (esp. the skills mapping table) — all concur.

---

### Round 1 synthesis (Thurgood / main loop)

**Cross-cutting theme A — the diff-guard protects *drift*, not *canonical-source correctness* (the round's headline).** "Generate-don't-curate" is only as correct as the canonical source; the guard faithfully enshrines canonical-source defects. Independent instances: Ada (law must source from corpus-by-id, not re-authored), Lina (`.web.tsx` bug + contract-system-reference ballot would be enshrined), Data (`start-up-tasks` dropped from the ambient design). **Requirements need an explicit canonical-source-correctness story** — sourcing law from the corpus by id, upstream-defect preconditions (the contract ballot, the `.web.tsx` fix), and a fidelity pass over the Task-9 ambient design — not just the diff-guard.

**Cross-cutting theme B — the adapter transforms are non-trivial, which *validates* the both-targets decision (§5c).** Data's skills path-mapping (`theming/styles`→`theming-styles`, `android/` strip) + `skill://`→Skill-tool transform prove the canonical/adapter seam is real engineering, not a prefix swap. §2.5 needs a mapping table. A CC-only first cut would not exercise these — direct evidence for both-targets-first-cut.

**Cross-cutting theme C — generated output needs positive cues + context annotations, not just removals.** Trimming a stale snapshot silently loses context (Data: emit a "use MCP instead" cue); commands need run-context annotations (Data: "run from product app"). Content-quality requirements for the generator.

**Convergences banked:** §5(a) defer human-TOC (all); §5(b) OB-5/6/7 core (all); §5(d) wire-cues/build-nothing-standing (all) — with the refinement that cues carry the *right verbs* (law-as-content / assembly-grain faithfulness / positive MCP cue); §5(e) structure-tracks-silent-failure-risk-per-class (all three converge).

**Finding — CC port is incomplete (5/8 agents).** Only ada/data/leonardo/lina/thurgood exist as `.claude/agents/*`; Sparky (web), Kenya (iOS), Stacy (QA) were never ported. Subsumed by 122's "generate all 8 for all targets," but recorded as live evidence of the drift 122 fixes. Consequence: the web/iOS command-slot content (Sparky/Kenya) was NOT gathered this round — deferred to formalization (extract real commands from `package.json` / when those agents exist; do not fabricate).

**Input-fidelity action items for requirements:** (1) confirm `lina.json` resource cleanliness; (2) resolve the Data `start-up-tasks` omission + audit the ambient design for similar drops; (3) contract-system-reference "117 vs 136" ballot as upstream precondition; (4) fix `.web.tsx`→`.web.ts` in canonical source before first generation.

---

#### [THURGOOD R2]
Incorporated R1 (Ada/Lina/Data) + Peter's session decisions into the design outline. It was woven in as a coherent revision, not appended. Landing sites:

- **Composition-pipeline spine + "reference, don't copy" + the 020→032→036→119→122 lineage** → design-outline.md § "1. Thesis / Problem" (two new subsections: "The generator is a composition pipeline" and "Why generate, not hand-maintain — the hard-won lineage"). Directly answers **Cross-cutting theme A** and ADA R1 item 1 (law generates FROM the corpus by `id`, never re-authored) at the thesis level. Cites `agent-experience-architecture.md` §5.1; 020's "Intentional Redundancy" + its recorded drift risk; the Jan-2025 contamination crisis.
- **Canonical-source correctness & the diff-guard's limit** → NEW design-outline.md § "3a." — the guard proves output==canonical, not canonical==truth; names the *concentrated-failure* mode as genuinely new; three compounding mitigations (reference-don't-copy inherits corpus governance; the non-negotiable canonical-vs-truth check; compute-fresh w/ the stale-`dist` cite, AXA §5.4/§8.1); honest calibration (narrow sliver, but the check is non-negotiable *because* the mode is novel). This is the requirements-level "canonical-source-correctness story" **theme A** asked for.
- **First-generation cutover (one-way ratchet)** → NEW design-outline.md § "3b." — cutover blesses present-at-cutover defects forever; lists the known ones (`.web.tsx`, Data's `start-up-tasks`, the 117/136 contradiction, the 5/8 CC-port gap); requires a clean-room input audit before SSOT, citing the abandonment-log "do NOT carry contamination forward" precedent. Absorbs LINA R1 items 3 & 4 and DATA R1's omission flag as *cutover* concerns.
- **Governance & roles: success vs failure (PROPOSED)** → NEW design-outline.md § "4a." — Thurgood=verification / Stacy=validation (independent skeptic, not a second runner); two failure modes (check lied / no check existed); lean scope (gate-anchored, high-blast-radius); her lane (adequacy-efficacy incl. the Sparky/Kenya command-gap class, calibration honesty, blast-radius); explicit OUT-of-scope (tool-health→Thurgood, correctness→owners, consistency→Thurgood); provision-her-means (she's under-provisioned per 119-A; 122 catalog fills the slots). Marked **PROPOSED, pending Stacy + Thurgood** — [@STACY] and [@THURGOOD] to validate in the roster round.
- **Content-before-catalog sequencing + generated-output quality** → design-outline.md § "2.8" (phasing rule; cites the "specifications without actionable implementation" anti-pattern; 5/8 gap ⇒ author Sparky/Kenya/Stacy content first, don't fabricate) and § "2.9" (positive replacement cues + run-context annotations). Absorbs **DATA R1** stale-snapshot-cue and run-context-annotation items and **theme C**.
- **Skills: mapping-table-not-regex + `skill://`→CC-Skill transform** → design-outline.md § "2.5", § "2.3", and § "5(e)". Absorbs **DATA R1** (the `theming/styles`→`theming-styles` crux-skill failure) and **theme B**.
- **Open-Questions resolutions** → design-outline.md § "5": (a) human-TOC **RE-OPENED, leaning IN — confirm at requirements** (distinct from the dropped agent-facing directory; must be generated + drift-guarded); (b) OB-5/6/7 **CONFIRMED core**; (c) already RESOLVED (both-targets, CC-first order); (d) **CONFIRMED wire-cues/build-nothing-standing** + the right-verbs refinement (Lina's assembly-grain faithfulness verb per **LINA R1 item 1**; positive MCP cue) + Ada's manifest-schema-per-theme root-cause restored per **ADA R1 item 2** + "build-nothing ≠ doesn't exist"; (e) **RESOLVED structure-tracks-silent-failure-risk-per-class** per all three, with the skills mapping-table requirement.
- **Audit-script boundary** → design-outline.md § "6" (new "Out-of-122 boundary"): the token source→index divergence audit is Rosetta-pipeline work, NOT 122, home = a token-pipeline spec. Absorbs **ADA R1 item 3**.
- **Input-fidelity checklist** → NEW design-outline.md § "8." (renumbered the OB confirmation to § "9."): the four items above as explicit pre-cutover requirements-phase checks.

**Not changed (deliberately):**
- **DATA R1 JOB-1 content** (the 4 Android skills, activation cues, gradle commands) is captured in this feedback doc as the input-of-record; it is *content the owner supplied*, not outline scope — it flows into requirements/canonical source, not the outline body. No outline change needed.
- **ADA R1 "27→~3 resources" acceptance signal** is a good requirements/acceptance-criteria artifact but is finer-grained than the outline; deferring it to requirements rather than inflating the outline. Flagging so it isn't lost.

**Directed for the next round:**
- [@STACY] Does the § 4a verification-vs-validation split (you = independent skeptic of the green, gate-anchored, NOT a second runner) match how you'd want the role scoped — and are the three lane items (adequacy/efficacy, calibration honesty, blast-radius) the right cut? → design-outline.md § "4a. Governance & Roles" -- [THURGOOD R2]
- [@THURGOOD] Boundary self-check for the roster round: does assigning Stacy the validation lane (false-positive / coverage-of-coverage) cleanly avoid overlapping your verification + content-consistency stewardship, or does § 4a need a sharper seam? → design-outline.md § "4a. Governance & Roles" -- [THURGOOD R2]
