# Spec Feedback: 127 — Completion-Claims Integrity — Design Outline

**Spec**: 127-completion-claims-integrity
**Artifact under review**: `design-outline.md` (Status: DRAFT, awaiting Peter's outline review)
**Created**: 2026-09-13
**Spec author**: Thurgood

---

## Context for Reviewers

**What this is.** The disposition of F7 — the only undisposed item from the Spec 112 completion-claims audit. Peter ruled the full package on 2026-09-13; this outline executes that ruling and frames what remains open.

**Settled — do NOT re-litigate** (each cited to its source; raise execution *consequences* freely, but the decisions themselves are closed):
- Full package (prose + mechanical arm together), not the light alternative → design-outline.md § "3.1 Full package, not the light alternative"; Peter's ruling, 2026-09-13
- The package = the modified three-part form (exact-set three-column table; forced-negative line; staged mechanization) → § "3.2"; `pre-spec/stacy-consult-2026-09-13.md` § "Verdict detail — the modified package"
- Scoping riders: per-parent-criteria specs bind; spec-level-criteria specs discharge at closeout; product parents carry per-platform status; **no backfill** → § "3.3"
- Recording form: **record-first ballot**, Peter-merged → § "3.5"; precedent `.kiro/docs/ballots/2026-07-05-documentation-task-type.md`
- F7 recorded as **addressed by** this spec, not closed by transcription alone → § "3.6"; Stacy B2

**Open and genuinely undecided** — this round's real work → § "8. Open questions for the feedback round":
- **Q1** machine-readable criteria convention (incl. the strict-verbatim-vs-122's-best-practice tension, sub-question 4)
- **Q2** arming timing vs the 125-B campaign's open shared W1 window (boundary charge: 0 vs 2 of K=3)
- **Q3** product per-platform status shape — **Stacy's design input central**; binds a currently-empty surface
- **Q4** the `(modified)`-vs-diff check's eventual shape (deferred build)
- **Q5** ownership of execution-claims verification — **the spec author is a named party**; see the handling note below

**Also open, flagged for Peter's outline review rather than this round** → § "6.2": what binds in-flight specs (partly-complete parents at ratification).

**Evidence base** (all committed): `pre-spec/stacy-consult-2026-09-13.md`; `pre-spec/thurgood-consult-2026-09-13.md`; `.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md`. New evidence gathered while drafting — a reproduction of the compliance baseline that **diverges from the consult's stated denominator** — is in § "1.4 Compliance baseline — measured, with a recorded divergence". Reviewers who think the divergence changes the argument should say so; it is flagged, not buried.

**Q5 handling (procedural).** Thurgood is a named party to Q5 and will **not** self-adjudicate it during incorporation. All Q5 positions are recorded verbatim and carried to Peter unresolved; it settles by Peter's decision after this round, with Stacy's R1 on record. If a reviewer believes the Q5 framing in § "8 Q5" is not neutral, say so directly — that objection takes priority over the substance.

**Reviewers** (§ "10. Stakeholders and review plan"): **Stacy** (REQUIRED), **Ada** (light consult), **Lina** (light consult), **Leonardo** (Q3 only). Platform agents are deliberately not tagged for R1.

---

## Design Outline Feedback

*(Rounds below. Stamp format: `#### [AGENT R#]`. Reference artifact sections with `§`. Directed questions go in the asker's section as `[@AGENT] …`. Scan and answer any `[@YOUR_NAME]` mentions before writing your own feedback.)*
