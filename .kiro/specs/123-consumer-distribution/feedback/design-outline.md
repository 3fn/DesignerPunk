# Spec Feedback: 123 — Consumer Distribution — Design Outline

**Spec**: 123-consumer-distribution
**Artifact under review**: `design-outline.md` (Status: DRAFT, awaiting this round then Peter's outline settle)
**Created**: 2026-09-20
**Spec author**: Thurgood
**Feedback structure**: SPLIT (per Spec-Feedback-Protocol) — this file covers the **design outline** round only. Later artifacts get `feedback/requirements.md`, `feedback/design.md`, `feedback/tasks.md`.

---

## Context for Reviewers

**What this is.** The kickoff of the 123 arc — the spec that makes `@3fn/core` installable and usable by a stranger. The outline replaces a 2026-06-23 placeholder stub that was direction-gated on Spec 118; all gates are open. It folds **ten** formalization inputs (nine `inbound-from-*` docs in this directory + the 119-B handoff) and is written to be consistent with `docs/roadmap/2026-09-20-consumer-distribution-roadmap-update.md`.

**Read before reviewing**: the outline itself, plus the inbound(s) touching your domain. You do not need to read all ten.

---

### Settled — do NOT re-litigate

Each cited to its source. Raise execution *consequences* freely; the decisions themselves are closed.

- **R1 — Persona.** PRIMARY = solo technical founder building with agents. NAMED SECONDARY consumption mode = reference-corpus (foreign DS agents extract intent without adopting the artifact) with its own small acceptance check + install-doc section. Design-eng teams: served, not optimized for. → `design-outline.md` § "3.1 R1 — Persona"; Peter's ruling, 2026-09-20. *(Resolves gate 1.)*
- **R2 — Channel.** PUBLIC NPM IS PRIMARY. → § "3.2 R2 — Channel"; Peter's ruling, 2026-09-20. *(Resolves gate 2 and conflict C3.)* The GH-Packages mirror-vs-drop disposition is **not** settled by this — it is the outline's proposal, § "4.3", and open as Q7.
- **R3 — The full agent org ships to consumers in 123.** The five-minute test's "working agents" stands literal; the onboarding inbound's **P6 is narrowed** (its *deferral* is reversed, its *concern* survives as the guardrail); scope growth accepted. → § "3.3 R3"; Peter's ruling, 2026-09-20. *(Resolves conflict C2.)*
- **R3's HARD GUARDRAIL.** Shipping agents requires a **consumer generation profile** — consumption-scoped charters via the 122 `TargetAdapter`/generator pipeline. Agents must not carry repo-internal law (`complete-task.sh`, ballots, "Peter merges", Civitas cadences, `.kiro/specs/**` as obligation) into repos where those authorities do not exist. This does **not** reverse Peter's 2026-08-11 consumption/stewardship correction. → § "3.3", § "7. The consumer generation profile".
- **P1–P5 stand** (onboarding principles); **P2's gate-bite recipes are non-negotiable** — every declared CI need ships its deliberate-failure → red → revert proof. → § "5.2".
- **Certification arbiter** = the packed-install consumer guard (`npm run test:consumer`), never an in-repo load. → § "4.1".
- **119-B delivery constraints bind install-doc authoring** (section-less routes, calibration-cue signal-scoping, identity-doc links broken-by-construction on MCP, zero backstop aliases, G1 through the generator only). → § "5.3".
- **125 Phase 3 (consumer-side enforcement) stays OUT**, and must not be precluded by package layout. → § "12. Non-goals".
- **Spec 127's completion-claims convention is ratified law** and governs this spec's execution docs. → § "13. Process notes".
- **C5 is already resolved** (the "ship the Agent Experience Architecture in its entirety" framing vs the needs-declaration inversion — resolved by Peter's 2026-08-11 correction). Do not re-propose the original framing as new. → roadmap update § "Conflicts C5".

---

### Open and genuinely undecided — this round's real work

All eight live at `design-outline.md` § "10. Open decision points".

| # | Question | Where argued | Author's posture |
|---|---|---|---|
| **Q1** | **GATE 3** — five-minute test as an explicit requirement; what "minutes" means | § 5.5, § 10 Q1 | Recommends explicit requirement as a bounded **step count**, wall-clock observed-not-asserted |
| **Q2** | **GATE 4** — consumer corpus policy (banner / split / both) + release-notes + packaging diet + `personal-note.md` | § 6 | Recommends **(a) banner** with a carve-out for personal/non-transferable content; **contingent on § 8's probe** |
| **Q3** | **GATE 3's blocker** — who is the cold user, at solo scale? | § 10 Q3 | Proposes cold-**agent** proxy as the blocking bar + one human run non-blocking; **records the counter it cannot answer** |
| **Q4** | Does R3's "full agent org" mean all eight charters, incl. ones that may reduce to near-nothing under subtraction? | § 7.2, § 10 Q4 | Proposes ship-all-eight + report findings. **Author is a named party (his own charter is the test case) and will NOT self-adjudicate** |
| **Q5** | Ship `canonical/` whole or filtered by profile? | § 7.3, § 10 Q5 | Open; weight vs. steward-voice opacity |
| **Q6** | **118's boundary — D1**: package-consumed-by-default (+ eject) vs copy-by-default | § 4.2, § 10 Q6 | Recommends package-consumed default; **surfaces the positioning counter as a fork for Peter** |
| **Q7** | GH-Packages mirror tax vs drop | § 4.3, § 10 Q7 | **Deliberately not picked** — both defensible; the `.npmrc` defect repair happens either way |
| **Q8** | **Lina's** 124 authoring convention: lint rider vs rename-by-mechanism | § 4.5, § 10 Q8 | **Not decided here.** Wanted EARLY — the answer moves 123's scope |
| **GATE 5** | Unit structure + the reduce-not-grow cut-line | § 9 | Proposes 5 declared units; states the cut order and the hard floor; surfaces a 123/123-B split as the real small-spec lever |

---

### Evidence base and one thing reviewers should check

The outline's § 1.2–1.3 rest on a **live measurement of the published package taken 2026-09-20** (D1 reading contract: figures are framing evidence, never load-bearing; re-measure at consumption). It surfaces four **live defects** in `14.1.0`:

- **D-live-1** — `src/cli/init.ts` writes `.npmrc` with `@3fn:registry=https://npm.pkg.github.com`, pinning every consumer to GitHub Packages (contradicts R2; is the exact hazard the 13.0.0 inbound named).
- **D-live-2** — `init` copies `.kiro/agents/`, `.kiro/steering/`, and `governance/` wholesale, so **the imposter problem is already shipping** in advance of any decision to ship agents.
- **D-live-3** — `product-template/agents/` is a **stale hand-copied fork last touched 2026-04-10**, unmanaged by the 122 generator, shipping in `files[]`.
- **D-live-4** — `personal-note.md` ships to public npm, with a dangling résumé reference.

**If any of these four is wrong, say so first** — D-live-2 in particular reframes R3's guardrail from "new risk" to "repair of live behavior," and several recommendations lean on that reframing. Recipes are one-liners against `package.json`, `src/cli/init.ts`, and `git log -1 -- product-template/agents/`.

---

### Reviewers

**Lina** (REQUIRED), **Ada** (REQUIRED), **Stacy** (REQUIRED), **Leonardo** (REQUIRED). **Kenya / Data / Sparky deliberately NOT tagged for R1** — with a recorded trigger that brings them in at the tasks round if Q6 resolves toward package-consumed-by-default. Rationale for each: `design-outline.md` § "14. Stakeholders and review plan".

**Write-safety convention** (per the 127 precedent and Peter's 2026-09-19 ruling): reviewers **self-write** their own round entries in this file — transcription by the spec author is retired. Do not edit `design-outline.md` or another reviewer's entry; put findings here, stamped.

---

## Design Outline Feedback

*(Rounds below. Stamp format: `#### [AGENT R#]`. Reference artifact sections with `§`. Directed questions go in the asker's own section as `[@AGENT] …`. **Scan and answer any `[@YOUR_NAME]` mentions before writing your own feedback** — Spec-Feedback-Protocol § "Mandatory @ Mention Scanning".)*

<!-- Reviewer entries begin here. Suggested shape, per the 127 round:
#### [AGENT R1]
**Reviewer**: <name> (<domain>) — <REQUIRED / consult> per § "14. Stakeholders and review plan"
**Date**: YYYY-MM-DD
**Branch**: task/123-r1-feedback-<agent>
**Mandatory @ mention pre-step**: <scanned; N outstanding / zero outstanding>
**Item count**: N BLOCKING, M advisory, positions on Q<n>–Q<n>

### BLOCKING
- **[BLOCKING] B1 — <one-line claim>** → design-outline.md § "<Section>"
  - evidence / measurement / recipe
  - **Fix:** <what would resolve it>

### Advisory
- **[A1] <claim>** → § "<Section>"

### Positions on the open questions
- **Q1** — <position + reasoning>
-->
