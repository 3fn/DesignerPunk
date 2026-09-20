# Spec Feedback: 123 — Consumer Distribution — Design Outline

**Spec**: 123-consumer-distribution
**Artifact under review**: `design-outline.md` (Status: DRAFT, awaiting this round then Peter's outline settle)
**Created**: 2026-09-20
**Spec author**: Thurgood
**Feedback structure**: SPLIT (per Spec-Feedback-Protocol) — this file covers the **design outline** round only. Later artifacts get `feedback/requirements.md`, `feedback/design.md`, `feedback/tasks.md`.
**Context updated**: 2026-09-20, after Peter's second ruling sitting on the draft (R4–R7 + the `personal-note.md` ruling + PR #192). The settled list below is longer than it was; **read it before reviewing** — five of the draft's open items are now closed.

---

## Context for Reviewers

**What this is.** The kickoff of the 123 arc — the spec that makes `@3fn/core` installable and usable by a stranger. The outline replaces a 2026-06-23 placeholder stub that was direction-gated on Spec 118; all gates are open. It folds **ten** formalization inputs (nine `inbound-from-*` docs in this directory + the 119-B handoff) and is written to be consistent with `docs/roadmap/2026-09-20-consumer-distribution-roadmap-update.md`.

**Read before reviewing**: the outline itself, plus the inbound(s) touching your domain. You do not need to read all ten.

---

### Settled — do NOT re-litigate

Each cited to its source. Raise execution *consequences* freely; the decisions themselves are closed. **Two sittings, both 2026-09-20**: R1–R3 ruled before drafting; **R4–R6 + the `personal-note.md` ruling** ruled *on the draft* and folded in.

- **R1 — Persona.** PRIMARY = solo technical founder building with agents. NAMED SECONDARY consumption mode = reference-corpus (foreign DS agents extract intent without adopting the artifact) with its own small acceptance check + install-doc section. Design-eng teams: served, not optimized for. → `design-outline.md` § "3.1 R1 — Persona"; Peter's ruling, 2026-09-20. *(Resolves gate 1.)*
- **R2 — Channel.** PUBLIC NPM IS PRIMARY. → § "3.2 R2 — Channel"; Peter's ruling, 2026-09-20. *(Resolves gate 2 and conflict C3.)* The GH-Packages mirror-vs-drop disposition is **not** settled by this — it is the outline's proposal, § "4.3", and open as Q7.
- **R3 — The full agent org ships to consumers in 123.** The five-minute test's "working agents" stands literal; the onboarding inbound's **P6 is narrowed** (its *deferral* is reversed, its *concern* survives as the guardrail); scope growth accepted. → § "3.3 R3"; Peter's ruling, 2026-09-20. *(Resolves conflict C2.)*
- **R3's HARD GUARDRAIL.** Shipping agents requires a **consumer generation profile** — consumption-scoped charters via the 122 `TargetAdapter`/generator pipeline. Agents must not carry repo-internal law (`complete-task.sh`, ballots, "Peter merges", Civitas cadences, `.kiro/specs/**` as obligation) into repos where those authorities do not exist. This does **not** reverse Peter's 2026-08-11 consumption/stewardship correction. → § "3.3", § "7. The consumer generation profile".
- **R4 — The cold-user bar is a persona-embodied agent TRIO** (resolves the draft's Q3). Three cold agent sessions role-playing (a) a backend engineer with little-to-no frontend experience, (b) a designer with some HTML/CSS and no engineering beyond it, (c) a product manager building their first app — each varying a different failure axis (design vocabulary / toolchain mechanics / everything), so the instrument **triages where onboarding confuses, not merely whether**. It is a **standing regression instrument, re-run per release**. **Peter's own run = MECHANICS validation, non-blocking, and explicitly does NOT satisfy the cold-human criterion** (he is the author; he cannot be cold). **Cold-human remains an open obligation** with a named trigger: the first willing stranger (candidates on record with the orchestrator). **Carried caveat, not erasable**: persona agents *role-play* ignorance rather than possessing it, so they under-simulate genuine confusion — **the trio measures instruction clarity and path completeness; the human measures confusion.** Both stand. → § "3.4 R4", § "5.5"; Peter's ruling, 2026-09-20.
- **R5 — ALL EIGHT agents ship, and the contract is subtraction PLUS RE-GROUNDING** (resolves the draft's Q4). The **ROLE ships intact, re-pointed at the consumer's repo** — consumer-Thurgood does spec formalization, test governance and steering health for **THEIR** repo, their Civitas, not ours. **What is subtracted is never the role, only this repo's specifics** (our ballots, our merge authority, our scripts). The draft's "charter might collapse to near-nothing" worry was a framing artifact and is dissolved. → § "3.5 R5", § "7.2 The re-grounding contract"; Peter's ruling, 2026-09-20.
- **R6 — Pre-installed starter specs are an onboarding mechanism; launch set of TWO.** The package ships **executable specs as curriculum**. The two: **(1) the CI-needs spec** (the P2 vehicle) and **(2) Thurgood's re-grounding spec** — consumer-Thurgood's first assignment is running his own onboarding. The set starts tiny **because the support-surface counter-argument applies per-spec**; growth is earned. → § "3.6 R6", § "5.6"; Peter's ruling, 2026-09-20.
- **`personal-note.md` — RULED: template-ize inside 123 (U3).** Onboarding personalizes it per-user on install; the shipped form is the template scaffold, not Peter's personal letter. **Dissolves audit A10** (no exclude-vs-confirm adjudication) and **pulls the deferred "Personal Note template" item forward** from its second-customer trigger. → § "3.7", § "6.4"; Peter's ruling, 2026-09-20.
- **P1–P5 stand** (onboarding principles); **P2's gate-bite recipes are non-negotiable** — every declared CI need ships its deliberate-failure → red → revert proof. → § "5.2".
- **Certification arbiter** = the packed-install consumer guard (`npm run test:consumer`), never an in-repo load. → § "4.1".
- **119-B delivery constraints bind install-doc authoring** (section-less routes, calibration-cue signal-scoping, identity-doc links broken-by-construction on MCP, zero backstop aliases, G1 through the generator only). → § "5.3".
- **125 Phase 3 (consumer-side enforcement) stays OUT**, and must not be precluded by package layout. → § "12. Non-goals".
- **Spec 127's completion-claims convention is ratified law** and governs this spec's execution docs. → § "13. Process notes".
- **C5 is already resolved** (the "ship the Agent Experience Architecture in its entirety" framing vs the needs-declaration inversion — resolved by Peter's 2026-08-11 correction). Do not re-propose the original framing as new. → roadmap update § "Conflicts C5".

---

### Open and genuinely undecided — this round's real work

Live at `design-outline.md` § "10. Open decision points". **Q3 and Q4 are CLOSED by the second sitting** and are retained there as closed items with their rulings (a question that vanishes silently invites its own re-asking) — do not spend the round on them.

| # | Question | Status | Where argued | Author's posture |
|---|---|---|---|---|
| **Q1** | **GATE 3's remaining half** — five-minute test as an explicit requirement; what "minutes" means | OPEN | § 5.5, § 10 Q1 | Bounded **step count**, wall-clock observed-not-asserted. (The *who* half is settled by R4) |
| **Q2** | **GATE 4** — consumer corpus policy (banner / split / both) + release-notes + packaging diet | OPEN | § 6 | Recommends **(a) banner**; **contingent on § 8's probe**. *(The `personal-note.md` sub-item has left this gate — ruled)* |
| **Q3** | Who is the cold user? | **CLOSED → R4** | § 3.4, § 10 Q3 | Ruled: persona trio blocking; Peter's run non-blocking; cold-human an open obligation; the confusion caveat institutionalized rather than dissolved |
| **Q4** | All eight charters, and what about collapse-under-subtraction? | **CLOSED → R5** | § 3.5, § 7.2, § 10 Q4 | Ruled: all eight ship; contract = subtraction **+ re-grounding**; collapse case dissolved. **The reframe happens to preserve the author's own charter — that is on the record, press on it if it reads as self-serving** |
| **Q5** | Ship `canonical/` whole or filtered by profile? | OPEN | § 7.3, § 10 Q5 | Weight vs. steward-voice opacity. **R5 sharpens it**: un-filtered canonical is not merely verbose, it is *addressed to a different repo* — mild pull toward filtered |
| **Q6** | **118's boundary — D1**: package-consumed-primary vs copy-by-default | **OPEN WITH A RECORDED LEAN** | § 3.8, § 4.2, § 10 Q6 | **Peter leans package-consumed-primary**, with the **GitHub repo clone as the DIY-ownership hatch** (an install-doc paragraph: *"prefer owning every line? clone the repo"*) and package mode as the path for continual updates. **He explicitly wants round input and named Ada**: what does package-primary mean for consumer token authoring? The positioning counter (*defaults are the product*) is live. The lean sets where the burden of persuasion sits — not that it is closed |
| **Q7** | GH-Packages mirror tax vs drop | OPEN | § 4.3, § 10 Q7 | **Deliberately not picked.** The separation (template defect vs mirror policy) **held and was load-tested**: PR #192 landed the repair while Q7 stays open |
| **Q8** | **Lina's** 124 authoring convention: lint rider vs rename-by-mechanism | OPEN | § 4.5, § 10 Q8 | **Not decided here.** Wanted EARLY — the answer moves 123's scope |
| **GATE 5** | Unit structure + the reduce-not-grow cut-line | OPEN | § 9 | 5 declared units; cut order + hard floor stated; **the second sitting was close to scope-neutral** (R7 + PR #192 gave back roughly what R4 + R6 added — table at § 9.2); a 123/123-B split surfaced as the real small-spec lever, not picked |

---

### Evidence base and one thing reviewers should check

The outline's § 1.2–1.3 rest on a **live measurement of the published package taken 2026-09-20** (D1 reading contract: figures are framing evidence, never load-bearing; re-measure at consumption). It surfaces four **live defects** in `14.1.0`:

- **D-live-1 — ✅ REPAIRED OUT-OF-BAND (PR #192, 2026-09-20).** `src/cli/init.ts` scaffolded an `.npmrc` with `@3fn:registry=https://npm.pkg.github.com`, pinning every consumer to GitHub Packages (contradicts R2; the exact hazard the 13.0.0 inbound named). **A second instance of the same class, missed by the first survey**: `init`'s "Next steps" also told consumers to set `GITHUB_TOKEN` — the pin taught in prose as well as scaffolded in config. Both removed, with a regression guard in `init.test.ts`. Record: `.kiro/issues/archive/2026-09-20-init-npmrc-registry-pin.md` (born-closed). **Consequence**: U1 no longer owes the template repair — only the **sync-side repair of already-pinned consumers**. *Reviewer-relevant lesson: the survey found the file and missed the sentence, which is an argument about where Axis C's content policy has to reach.*
- **D-live-2** — `init` copies `.kiro/agents/`, `.kiro/steering/`, and `governance/` wholesale, so **the imposter problem is already shipping** in advance of any decision to ship agents. **Routed to U2** by the same issue record (*"the spec is the fix; patching it ahead would front-run its core design decision"*).
- **D-live-3** — `product-template/agents/` is a **stale hand-copied fork last touched 2026-04-10**, unmanaged by the 122 generator, shipping in `files[]`. **Routed to U2.**
- **D-live-4** — `personal-note.md` ships to public npm, with a dangling résumé reference. **Disposition RULED: template-ize in U3** (§ 3.7); A10 dissolved.

**If any of these four is wrong, say so first** — D-live-2 in particular reframes R3's guardrail from "new risk" to "repair of live behavior," and several recommendations lean on that reframing. Recipes are one-liners against `package.json`, `src/cli/init.ts`, and `git log -1 -- product-template/agents/`.

---

### Reviewers

**Lina** (REQUIRED), **Ada** (REQUIRED — **carrying a directed question from Peter on Q6**: what does package-consumed-primary mean for consumer token authoring?), **Stacy** (REQUIRED), **Leonardo** (REQUIRED). **Kenya / Data / Sparky deliberately NOT tagged for R1** — with a recorded trigger bringing them in at the tasks round if Q6 lands on package-primary; since that is now the **recorded lean**, treat the trigger as likely rather than hypothetical. Rationale and per-reviewer asks: `design-outline.md` § "14. Stakeholders and review plan".

**Two asks worth naming here** because they are easy to skip: **Stacy** — does the § 7.2 re-grounding check falsify in **both** directions (no repo-specifics present **AND** the role's verbs still present), or only the subtraction one? And is the **U2-authors / U3-delivers** seam on the starter specs a between-units drop waiting to happen? **Leonardo** — are R4's three personas the right three failure axes?

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
