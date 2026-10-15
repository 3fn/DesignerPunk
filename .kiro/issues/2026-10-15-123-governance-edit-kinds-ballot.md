# Obligation: a record-first ballot sorting `governance/**` edits into three kinds, a claims-pass line, and the trio's per-finding disposition sentence (exited at Spec 123 Task 28.4)

**Date**: 2026-10-15
**Status**: ACTIVE (chartered, not drafted)
**Owner**: **Thurgood** (Civitas steward; author of the ballot). **Stacy** is the required reviewer for § 2 (the claims-pass line is hers to apply). **Peter** ratifies.
**Trigger**: **Thurgood's next ballot sitting** — and in any case **before the next PR that edits `governance/**` on the authority of a merged design clause**, so the class that U5 met is not met again unruled.
**Source**: Peter's rulings (3) and (4)(b), 2026-10-15 (ruled in the U5 session; recorded in `.kiro/specs/123-consumer-distribution/completion/task-28-completion.md`). The instance: Task 26.5 edited `governance/DesignerPunk-Integration-Guide.md` (+4/−4, the restart/approval line) on the authority of design C8 ("U5's closeout edits it to the observed truth"). Thurgood asked at 26.5 whether that edit needed a ballot; **Peter ruled no ballot for that edit** — the U5 PR body cites C8 as the authority and its `**Consulted**:` line names Thurgood as the owner who wrote it — **and ruled this record as the class fix.**
**Grant paths**: none here. The ballot itself lands under `.kiro/docs/ballots/` by the record-first protocol; the recipe sentence in § 3 lands in `governance/release-management-system.md` under that ballot (or under Thurgood's install-doc fix PR, if Peter so directs at the sitting).
**Consulted**: none needed for the filing — the content is Peter's ruling; Stacy is consulted on the ballot text at its sitting.

---

## 1. The three kinds (the ballot's operative text, to be drafted)

A one-page record-first ballot that sorts every `governance/**` edit into exactly one kind:

| Kind | What it is | Authority | Ratification |
|---|---|---|---|
| **LAW** | A change to what governance requires | a ballot | record-first ballot, as now |
| **PRE-DECLARED EXECUTION** | A merged design (or ratified ballot) names the edit before it is made | the named clause | **no ballot**; the PR body cites the clause, and the doc's owner reviews the text |
| **CONTENT CORRECTION** | An observed falsehood, with no design clause naming the fix | the observation (record cited) | **no ballot**; the owner's fix PR, carrying a `**Consulted**:` line |

The ballot states what each kind's passing establishes and what it does not (Req 26.8's rule), and names the rot mode: a LAW change dressed as an EXECUTION or a CORRECTION to skip the ballot.

## 2. The claims-pass line

One checklist line added to the claims-pass method: **every `governance/**` hunk in the audited diff names its kind and its authority** (ballot path / design clause / observation record). A hunk with neither is a finding on the authoring agent.

## 3. The trio's per-finding disposition sentence (ruling (4)(b))

One sentence added to `governance/release-management-system.md` § "The Release Recipe" step 6 (the per-release trio re-run, B-U4): **each release's trio record carries one disposition line per prior finding — `fixed-and-observed` / `fixed-not-observed` / `still-present`.** It rides this ballot (a LAW change to the recipe), or Thurgood's install-doc fix PR if Peter directs. The trio record that will carry the lines is `.kiro/issues/2026-10-15-123-onboarding-trio-recurring.md`.

## 4. The DRAFT normative-counterexample ballot, at the same sitting

`.kiro/docs/ballots/2026-09-27-normative-counterexample-routing.md` is **DRAFT** ("not ratified. Neither edit below is applied"), carried from Spec 123's "Carried obligations — placed" (the lessons item, amendment 2026-09-27). Spec 123 closes with it unratified. At this record's sitting it is brought to Peter for ratification, amendment or withdrawal (Stacy required reviewer, as the draft names).

## Walk

At each monthly health check: has the ballot been drafted, and has any `governance/**` PR on a design-clause authority merged since this filing without it? **The latter = finding.**
