# Spec Feedback: 127 — Completion-Claims Integrity — Requirements

**Spec**: 127-completion-claims-integrity
**Artifact under review**: `requirements.md` (authored 2026-09-19)
**Created**: 2026-09-13
**Spec author**: Thurgood

---

## Context for Reviewers

**Phase gate discharged**: the outline round closed, Peter settled the outline (2026-09-17 ballot), ruled the requirements-phase items in the 2026-09-19 working session, and the R2 round on those resolutions completed the same day — 4 reviews, 3 blocking items ruled and folded (`R2 FOLD` blocks, outline § 8), 13 advisories incorporated.

**THE DECISION SURFACE IS CLOSED — this round reviews FORMALIZATION FIDELITY, not decisions.** The question for every requirement: does it restate its ruling without gain or loss? Authority order where restatement and source disagree: the 2026-09-17 settle ballot → the co-signed Q5 documents (PRs #158/#165) → the outline's `RESOLVED (Peter, 2026-09-19)` + `R2 FOLD` blocks → the feedback record. Execution consequences are in scope; re-litigation is not.

**Decisions this document inherits (do not reopen)**:
- The full package, riders, ruling 3 (fixed string, no sunset, decoupling), ruling 4 (forward-total, legacy by authorship date), ruling 5 (claim-keyed status), Q2 (guarded deferral — arming excluded from 127), Q5 (full package + four Peter additions) → settle ballot.
- Q1's eight decisions (frozen block format + declared-none; header declaration; canonical-form "materially amended" with generous extraction + named instrument; nearest-preceding association; (c′) four-rule normalization; promise-surface three-layer closure; decomposition-first with the limbs split) → outline § 8 Q1 RESOLVED + R2 FOLD.
- Q3 (uniform decomposition both tiers; committed Implementation Reports at claim grain; three named revisit questions; product per-parent) → outline § 8 Q3 RESOLVED + R2 FOLD.
- Q4 (Primary Artifacts surface; the split; delta-scoping; emit-exclusions with named reader; verdict phrasing; dry-run promotion) → outline § 8 Q4 RESOLVED + R2 FOLD.

**Named asks for this round** (also in requirements.md § "Open items"):
1. **Stacy (REQUIRED)** — verification-grade fidelity pass; plus the two seat-duty confirms requested at Requirement 8.9 (AV-deferral adjudication; CLOSEOUT emission reading). These were placed on your seats at the R2 fold and are **requested, not assumed**.
2. **Ada / Lina** — bound-party check that Requirements 1–2 encode the convention you re-confirmed at R2 with no drift in transit.
3. **Leonardo** — Requirement 10 encodes your B1 ruling, the revisit's three questions, and your A2/A3/A4 items — confirm the encoding.

**Stamp format**: `[AGENT R1]` (rounds reset per artifact — this is the requirements artifact's round 1). Reference as `requirements.md § "Requirement N"` / AC number. Reviewers return feedback text; Thurgood transcribes with stamps preserved.

---

## Requirements Feedback

*(Rounds below.)*

#### [LINA R1]

Scanned for `[@LINA]` mentions — none beyond the named bound-party ask in the Context block, addressed by this review. Checked my four named items against my own R2 record (`feedback/design-outline.md` § `[LINA R2]`). **No blocking items. Fidelity holds on all four checks.**

**1. (c′) encoding (Req 2.5.1–2.5.3) — matches, no drift.** The four-rule normalization ((i) pipe-escape unescape, (ii) `<br>` → space, (iii) collapse Unicode whitespace, (iv) nothing else) is verbatim what I re-tested at R2. "Compressed labels failing is the intended adoption cost: compression relocates to the Evidence cell" (2.5.3) is my own R2 language, correctly carried as a stated cost rather than softened into a caveat.

**2. My two R2 refinements landed intact:** Req 1.3's locatable-record examples — "a PR review comment, a design-critique note, a dated design-outline decision" — present verbatim, explicitly attributed; this discharges the non-token-shaped example ask cleanly. Req 2.6.4 + 8.6 — the `(platforms: …)` tag "by recorded amendment only," with the claims pass counting fallback invocations — matches my R2 routing of the ΔE₀₀-style/parity-consistency case to the named escape hatch, not left as an unaddressed residual.

**3. Decomposition-first (Req 2.6) — preserves what satisfied my objection, correctly scoped.** 2.6.1's structural limb ("a single ✅ structurally cannot hide a broken platform") is exactly the root-level fix I confirmed at R2 — no roll-up rule survives to be judgment-checked. 2.6.5's incomplete-decomposition channel matches my R2 "Residual (b)" description precisely, including the "judgment territory, not mechanical" framing I accepted as livable.

**4. Req 2.2.1's corpus-verification note discharges my due-diligence ask.** A full-corpus check (superset of the Stemma population), the one exception dispositioned as legacy/out-of-population. Nothing further needed from me.

No new concerns surfaced reading Requirements 1–2 (or the skimmed 8/10) against my R2 record. Requirement 8.9's Stacy-seat items and Requirement 10 are outside my bound-party lane.

*End [LINA R1].*

---

#### [ADA R1]

**@ mention scan**: scanned `requirements.md` and `feedback/requirements.md` for `[@ADA]` — zero outstanding mentions.

**Scope**: formalization fidelity only, per the round's closed-decision-surface framing. Comparing Requirements 1–2 against my [ADA R2] entry and the source `RESOLVED`/`R2 FOLD` blocks. **No blocking items. Three advisory notes** (two actionable).

**1. The (c′) four-rule normalization (Req 2.5.1–2.5.3) — HOLDS, one small drop.** The four rules, "total and parameter-free," multiset/order-insensitive semantics, and the closed-but-extendable residual all reproduce the source faithfully — including my glyph-drift concern folded correctly.
- **[advisory]** Req 2.5.1 drops the source's trailing clause: *"bold, backticks, and platform phrasing reproduce exactly."* Rule (iv) implies it, but the explicit clause does real work for token-spec authors — Rosetta criteria are dense with backtick-wrapped platform names and inline code, and an author might wonder whether markdown normalization strips backticks. Restore the clause verbatim or fold it into (iv) explicitly. Normative content unchanged either way.

**2. My two R2 advisories landed in Requirement 1.8 — confirmed, correct phrasing.** The copy-don't-retype note and the decomposition-scope boundary line both preserve my meaning, including the `094:123` distinction. No drift.

**3. Decomposition-first (Req 2.6) — the limb split correctly encoded, one advisory on the reference-limb phrasing.** 2.6.1 matches the source exactly; 2.6.2 correctly demotes the reference limb to guidance (§ 6.1 uncrossed).
- **[advisory]** The example list — *"the registry or formula on the system side"* — covers two of the three reference flavors I validated at R2 but not the third: **per-platform-syntax-as-reference** (`014-motion-token-system:140`, each platform's bullet citing a *different* platform-specific reference). Guidance, so low-stakes — but as written it could read as an exhaustive two-item list. Add a third example or soften to "e.g., the registry, a formula, or platform-specific reference documentation."

**4. Fourth evidence kind + locatable constraint (Req 1.3) — faithful to my original R1 ask, no drift.** Correctly compounds my ask, Lina's R2 addendum, and the compliance clause. No gain, no loss.

**Net**: no blocking fidelity failures. Two advisory refinements, both precision notes, not drift from the ruled convention.

*End [ADA R1].*

---

#### [LEONARDO R1] — confirming encoding of my R2 items (Q3, product-side shape)

**Mandatory @ mention scan**: scanned `feedback/requirements.md` for `[@LEONARDO]` — none outstanding. Discharged.

**1. Requirement 10 vs B1 → AC 10.1.** Confirmed, verbatim. Path, branch, and gate language match the R2 FOLD's ruled text word-for-word; AC 10.2's claim-grain requirement and AC 10.3's fourth-evidence-kind homing are present and faithful. No gain, no loss. **Not contesting.**

**2. Requirement 10.2's SHOULD on the spec-revision citation.** Confirmed — **SHOULD is the right strength, not a weakening.** My A2 ask was (a) record reference drift as a residual (done) and (b) carry the mitigation into the named revisit — explicitly provisional, something the revisit assesses. A2 was advisory-tier, unlike B1 which I blocked and which correctly landed as SHALL. Elevating to SHALL would have been an **unruled gain** past what I asked for; SHOULD accurately encodes "convention now, open question at the revisit."

**3. Requirement 10.4 vs A5 / A4 / A3.** The three revisit questions are verbatim-in-substance against the R2 FOLD's canonical phrasing (the authoritative version). A4 carried and attributed. A3 carried at operative-clause grain but drops the worked rationale (earlier parent's claims stay true of the platforms that existed; absence of an all-platforms artifact is the honest outcome). That rationale lives in the outline/ballot chain this requirement traces to, so **advisory only, not blocking**: if authoring guidance for this revisit question is ever drafted standalone, pull the full A3 reasoning forward so "new parity parent" doesn't read as arbitrary.

**4. Requirements 2.6.3 and 8.3 vs S1.** Both confirmed, verbatim-in-substance — the grouping convention correctly cross-referenced to multiset equality; the per-row Method-line honesty clause stated as load-bearing for the product tier and directed into the ballot, consistently cross-referenced at 12.4.

**Bonus check**: A1's over-narrowing fix landed correctly at Requirement 2.6.2 — noted for completeness, no action needed.

**Summary**: **0 blocking.** All four named items faithfully encoded, no gain or loss against the ruled record. One advisory (A3's rationale trimmed to the operative clause — acceptable at requirements grain, flagged for future authoring-guidance drafting). I do not need another round on this artifact.

*End [LEONARDO R1].*

---

#### [STACY R1]

**Reviewer**: Stacy (product governance & QA) — REQUIRED reviewer · **Date**: 2026-09-19 · **Branch**: `task/127-requirements` (read-only)

**Write-safety note**: I edited nothing. Returned for transcription with the stamp preserved.

**Mandatory @ mention pre-step**: scanned the spec tree and settle ballot for `[@STACY]` / `@Stacy` — hits are my own prior pre-step lines only. Discharged.

**Item count**: **6 BLOCKING**, **15 advisory**, **2 seat-duty confirms** (one CONFIRMED-with-contest, one CONFIRMED-conditional), plus a 12-row verification table and a reproduction appendix.

**Method**: every mechanical claim re-derived today from the live corpus; I inherited nothing, **including numbers that are mine** — one of my own R2 numbers is corrected below (A3). **Named non-verification**: M1–M5 (12.7) not re-derived — carried as a dated pre-rule record whose re-derivation 12.3/12.7 already mandate at ballot time; recording the non-verification rather than letting silence imply coverage.

**Scope discipline**: formalization fidelity only. Where I contest, I contest an *encoding*, never a ruling. **Mirror bound observed**: I name defect classes and quote the governing source; I draft no replacement rule text.

**Verification table — 12 requirements vs cited sources** (compressed; full reasoning in the blocking/advisory items):

| Req | Verdict |
|---|---|
| 1 | **FAITHFUL** on all 9 ACs; 1.7 reproduces ruling 3 **except** the no-sunset clause and its ground → B-5 |
| 2 | **FAITHFUL** on 2.1/2.2/2.4/2.5/2.6; 2.3 faithful in substance with one enumeration gloss (A1), one derived sentence (A11), one mis-aimed cross-ref (A7) |
| 3 | **FAITHFUL, no gain or loss found** — 3.3 preserves B5's operative bite; 3.4's second live instance correctly attributed |
| 4 | **FAITHFUL, verbatim** — pointer character-for-character; prune-scar carried |
| 5 | **LOSS ×2** — stale verification population (B-1); two ruled `owner:` assignments dropped (B-2); 5.8's walker exact |
| 6 | **LOSS ×1** (B-3 grant enumeration) + A4. **6.7 is exact and I want that on the record**: both restored guard-(ii) conjuncts and N ≥ 5 with M2-by-audit, and it correctly does NOT re-import condition (d)'s "regardless" — the single most likely drift point in the whole document, and it did not drift |
| 7 | **LOSS ×1, three instances** (B-4) — three ratified elements absent; 7.4's both-clauses-at-countersigned-strength is exactly what ballot § 16.2 was added to secure |
| 8 | **LOSS ×1** (B-5) + one unactionable duty (confirm (b)'s condition) + A9/A10/A12/A13/A14; 8.1's fallback correctly incorporates T4-2 *and* T2-b (the "pre-125-A form" mislabel is gone) |
| 9 | **FAITHFUL** — no gain, no loss found |
| 10 | **FAITHFUL**; one silent reading-choice (A8); the three revisit questions verbatim |
| 11 | **FAITHFUL** — both named lines, exclusions-included, empty-set-still-pastes, successor-inherits all present |
| 12 | **FAITHFUL on ruled content**; census enumeration drops the ballot's own ruled reconciliation (A2) and one edit site (A5); 12.4's quoting instructions and 12.6's closing condition exact |

**Mechanical re-derivations, all CONFIRMED**: 153 files; 790/66/17/150; the zero-criteria trio; the 9-file non-frozen enumeration — exact, all nine; in-flight 39; DMU heading in 2 files + 122's bold-prose at :14; the five proposed ids carry **no substring relation** against the live register (22 × 5, both directions).

**BLOCKING** — my test, stated so you can hold me to it: *an executor following the text would get it wrong, or a ruled constraint now binds nowhere.* None contests a ruling.

- **B-1 — Req 5.1's verification population is stale by six entries.** The "(16)" was correct on 2026-09-13; the register carries **22 entries today** (six rows landed during 125-B wave work in between). I ran the full 22 × 5 sweep — no substring relations — but a stated count that does not match the command's output, in a requirement that makes the count a duty, is *"the class of claim this spec exists to stop accepting."* *Counter: "all existing entries" is operative and the parenthetical a gloss — I'd accept a drafting disposition; kept blocking because 12.2 requires stated results to match output and a stale number propagates.*
- **B-2 — Two ruled register-row owners dropped in a requirement demanding schema-complete rows.** Ballot § 11.2 (confirmed in my § 16.2 duty table): `promised-artifact-shipped` and `parent-completion-docs-present` (if unbuilt/ideological) **move to Stacy** — 5.4 and 5.6 omit the owner. `promised-artifact-exists` (5.3) is genuinely open (split out post-ballot) and its openness should be stated as openness, not read off the same silence.
- **B-3 — The write-grant prerequisite names two path classes; the source named three (`governance/**` dropped); and nine of twelve requirements' deliverables sit outside every write scope with no grant or route named.** Re-verified at source: Thurgood's writeScope = `src/__tests__/**`, `.kiro/specs/**`, `docs/specs/**`; mine = `.kiro/specs/**`, `docs/specs/**`. Neither covers `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, `.kiro/hooks/**`, `canonical/**`, `scripts/**`, `.github/workflows/**`, or `package.json` — the homes of Requirements 1, 3, 4, 5, 7, 10, 11, 12's deliverables and the fixture set (6.5). A requirement set that names the prerequisite for the one deliverable that had it flagged and is silent for the other nine reads as exclusion. *Counter: grants are tasks-phase mechanics; my answer is that this spec's entire subject is that unstated obligations go missing.*
- **B-4 — Requirement 7 omits three ratified charter elements** (verified absent corpus-wide by grep): ballot § 16.1 item 9 ("'compliant' must be decidable without consulting the author — an interpretation question raised twice is a defect in my text, I fix the text"); § 16.1 item 10 ("notification, not permission, on every standards change — before→after and effective date, **charter-level**"); § 11.3's **question-routing test** (one of three adopted arbitration mechanisms — 7.4 carries the anti-rot clauses, 7.5 the tiebreaker; the routing test is carried nowhere). This is the settle ballot's B-2 defect in the opposite direction — bounds on the party losing scope dropping out of the requirement that writes the charters. I flag items 9–10 knowing they benefit me.
- **B-5 — Ruling 3's no-sunset decision rests on a compensating control assigned to no one.** The sunset was declined because *"Q5's claims-pass machinery is the abuse detector"* — and 1.7 carries neither the no-sunset ruling nor its ground, while 8.6's counting duties do not include fixed-string exemption usage (grep: no counting duty covers it). A ruled tightening declined on the strength of a mechanism that binds nowhere — the T4-5 inertness class over a 39-spec blast radius. Identical and adjacent to a duty the document *does* carry (declared-none rates): both are visible countable exemptions; one is counted, one is not.
- **B-6 — The AV-declared deferral has no machine-readable form, so 5.3's "emitted exclusion" is not computable as written; and a declared-but-never-delivered deferral is walked by nobody.** 1.5's declaration form is free prose + link + unit name; a check deciding "is this line a deferral naming a delivering unit?" from free prose is fuzzy matching (rejected) or impossible (the exclusion never fires). The governing standard is one ruling over: ruling 3 made the *other* exemption in this law a **fixed string** because *"a freely-phrased exemption is an unfalsifiable claim."* Second limb: `-exists` is delta-scoped (correctly), so a deferral declared at parent 3 and never delivered by the named unit is green forever — precisely the shape that reached consumers. The walk-back belongs at CLOSEOUT and **I volunteer to take it** — but an undeclared duty is the failure this spec exists to stop, and mine should not be the exception. Per my mirror bound I draft neither the token grammar nor the clause; two coherent dispositions exist (fixed machine-readable form, as ruling 3 did; or accept-in-writing that `-exists` reds on lawful deferrals, reconciled by judgment at the pass). Choosing is requirements-phase work.

**The two seat-duty confirms (8.9)**:
- **(a) AV-deferral adjudication — CONFIRMED, with a contest on the encoding.** The duty passes my own B4 framework (an assertion, not a silence; falsifiable; pin 5 satisfied rather than suppressed; timing composes — the declaration rides the same PR the check is scoped to, verified rather than assumed). What I contest is the encoding — B-6's two limbs. **I accept the walk-back onto my CLOSEOUT seat** (amendment § 2.4's dimension, no new event) — and I am asking for it to be *written*, not assumed. *Declared conflict: both limbs route work toward me.*
- **(b) CLOSEOUT emission reading — CONFIRMED, conditional on one clause.** The disposition restores T4-5's named reader inside a seat I hold; my own R2 counter-argument pre-committed me. **The condition**: 8.6 states the duty unconditionally and `promised-artifact-exists` is unbuilt — *there are no emission lines to read*. A duty predicated on an unbuilt check is dormant by construction and reads as coverage (§ 9.2's exact error). The document handles this pattern honestly at 1.9, 2.3.5, and 5.3; 8.6 is the one place the interim state is unstated. **Confirm stands the moment the duty is conditioned on the check existing and the interim owner named.**

**Req 2.3 vs my B-R2-1 — FAITHFUL** on all nine ruled elements (element-by-element table run; the "wherever it is taught" clause is a gain in the honest direction, no objection). The **declined alternative** is recorded in the fold but not requirements.md — belongs in the ballot's rationale (advisory, A-1's neighbour). **One gloss (A1)**: "both heading spellings" enumerates a distinction the corpus does not carry — one heading base string, trailing parentheticals vary — and 2.3.4 requires verbatim enumeration in the ballot.

**Req 12's instructions — reviewed as asked**: 12.4's 7:1 quoting instruction **faithful and exact** (my item as I wrote it, including the direction it cuts). 12.3's recipes re-derive cleanly; **A2** — the enumeration drops ballot § 6.1's ruled 36→39 reconciliation in favour of my advisory-sourced 37 (three recipes, three numbers, two different delta memberships — {054a, 054b, 125-A} vs {054a, 054b}; authority order puts the ballot's pair above mine); **A3 (correcting myself)** — the recorded cause of 62-vs-66 is wrong: both occurrence- and line-counts return 66; the delta is **line-anchoring** (62 anchored). Third time my regexes assumed the house form. **The T4 attribution — CORRECT** everywhere checked, including 8.2/8.3/8.4's citations; trivial: `§§ T4` → `§§ T4-1..5`.

**My execution duties — actionable as written**: LENS, RELEASE, fixtures' timing/escalation, pilot subject, owed-set predicate, findings home, never-a-gate. **Positive confirmation**: 2.2.4's and 2.6.5's LENS references add **no new questions to my seat** — checked rather than assumed. **Ambiguous/unactionable**: B-3 (I cannot write outside my scope); B-6 + confirm (a); confirm (b)'s condition; **A13** — a legacy multi-unit spec with a non-canonical units block (122's form) matches neither 8.1's primary predicate nor its fallback; live only for a legacy multi-unit spec that wakes and closes post-ratification; T2-b's own "however titled" wording covers it; **A15** — **the pilot and Q2 guard (ii) are the same work and nothing connects them**: un-armed, the pilot does exact-set parity by hand (more expensive than the cost model), and that hand-done parity *is* guard (ii)'s "M2 measured by audit" on in-scope parents; connecting 8.7 to 6.7 turns duplicated cost into one piece of work discharging two obligations. Also unstated: whether the pilot record *is* 127's CLOSEOUT `claims-pass.md` (I read it as one artifact; it is inferred).

**Advisory (compressed; full text in the returned review, held in the transcriber's record)**: **A1** units-block enumeration gloss · **A2** carry the ruled 36→39 reconciliation with each recipe named beside its number · **A3** anchoring cause, correcting my own R2 confirmation · **A4** 6.5 drops the anti-veto bound (fixtures reviewable on-branch; Thurgood may contest as out-of-scope-for-the-rule-as-authored; Peter arbitrates) — a bound on MY side, carried at strength per § 16.2's discipline · **A5** the ballots-README "Ballots on record" entry appears in no requirement while 12.2 mandates *every* edit site (the July-2026 precedent is five missed edit sites, and this is the cheapest class) · **A6** 7.5 carries the carve-out's falsification conditions by reference; the charter text needs their content · **A7** 2.3.5's cross-ref mis-aimed (6.6 vs 6.3/6.7) · **A8** 10.2 picks one of two available readings of A2's mitigation silently (adopted-now-at-SHOULD vs deferred) — 12.4 exists for this class · **A9** 8.3 drops § 2.5's "and how many of the total" — the fraction is rot-mode-1's detector and the clause I hold hardest · **A10** M3/M4/M5 as standing audit output under-enumerated (generic 7.1 only) · **A11** 2.3.3's rider-(c) sentence is a faithful **derivation**, not ruled text — ratify as such · **A12** T4-2's dormant-spec-wakes edge absent (oversized pass = cost, not lapse; § 6.3 cut order handles it) · **A13** legacy non-canonical units block → § 6 · **A14** the owed-set pipeline's command-catalog home is `canonical/agents/stacy.md` — mandated by 8.4, provided for by no charter-edit enumeration; compounds B-3 · **A15** pilot ↔ guard (ii) identity → § 6 · **A16** 2.6.2's system-side reference clause is synthesized, not ruled — carries no compliance force (judgment layer), one-line note only.

**Counter-arguments against my own review**: (1) six blockers on a substantially faithful document, with severity inflation my named bias — my defence is the stated test applied uniformly, and three of six run *toward* more duty on me; B-1/B-5 as advisory would not be wrong. (2) B-4 argues for bounds that protect me — read it knowing that; my answer is § 16.1 was transcribed unsoftened by the party it binds precisely so this could not happen quietly. (3) A3 is my third house-form regex error, in reviews whose subject is tail-form handling — weigh it against my other numbers; it is also why I re-derive everything including my own figures. (4) B-6 is not re-litigation: I confirm the duty and the ruling; I contest giving a mechanical check a judgment input against a standard that is law one section over — if Peter rules the deferral declaration judgment-territory by design, that is a ruling, write it as one, and I proceed. (5) A15 reduces my total work — distrust it accordingly; the composition is checkable. (6) I confirmed both duties offered me — the only acceptance worth anything came with a condition and a contest attached.

**Appendix — reproduction recipes** (run 2026-09-19 on `task/127-requirements`): 153 files; 790 / 66-unanchored / 62-anchored / 17 / 150; the trio; the 9-file enumeration; in-flight 36 / 37 / 39 under the three stated recipes with delta memberships; DMU 2 hits + 122:14 by direct read; register 23 headings today (22 entries) vs 17 (16) at `--before=2026-09-14` — confirming the outline's figure was right on 2026-09-13 and stale now; 22 × 5 substring sweep clean; write scopes read verbatim at `canonical/agents/thurgood.md:233-236` and `canonical/agents/stacy.md:230-232`; absence claims by targeted grep (`otification` 0 · `decidab` 0 · `routing test` 0 · `README` 0 · `on-branch` 0 · `how many` 0).

*End [STACY R1].*

---

#### [THURGOOD R1] — incorporation

**Mandatory @ mention pre-step**: zero directed `[@THURGOOD]` mentions; Stacy's B-4 and A4 address me by obligation (bounds on my side of the charter) and are answered by incorporation below.

**Disposition summary**: Lina 0 items requiring change. Ada 2 advisories — **both INCORPORATED** (2.5.1's restored clause; 2.6.2's illustrative example list). Leonardo 1 advisory — **RECORDED, no requirements change** (A3's worked rationale is pulled forward when the revisit's authoring guidance is drafted standalone; noted at 10.4's source chain). Stacy: **B-1 through B-5 INCORPORATED** (all were restorations of ruled content or live-derivation fixes — no ruling touched); **B-6 CARRIED TO PETER**; **all 15 advisories INCORPORATED or recorded** (A16 recorded as a marked illustrative clause; A13/A15 incorporated as predicate extension and composition note; A11's sentence marked as derivation-to-ratify). Her confirm (b)'s condition is **satisfied** at 8.6 and 5.3 (duty conditioned on the check existing; interim owner stated). **Zero declines.**

**Verification note**: I re-derived Stacy's two new load-bearing counts before incorporating: the register at 22 entries today vs 16 on 2026-09-13 (her `--before` reconstruction confirms the outline's figure was right when written — stale, not wrong); and her three-recipe in-flight reconciliation (36/37/39 with distinct delta memberships — the ballot's ruled pair is 36→39, her 37 an advisory recipe; encoded at 12.3 with authority order stated). Her B-4 absence claims were verified by her own greps and spot-confirmed. On her A3: her correction of her own recorded cause (anchoring, not occurrence-vs-line) is adopted with the quoted-not-described discipline now normative at 12.3.

**On B-4 and A4 specifically** — both restore bounds on **my** side (decidable-without-consulting-the-author; notification-not-permission; the routing test; the fixture anti-veto ground). Incorporated at 7.9 and 6.5 at the ballot's own strength. She flagged them knowing they benefit her; I incorporate them knowing they bind me — that symmetry is § 16's discipline working as designed, and it is why the settle ballot transcribed them unsoftened in the first place.

**CARRIED TO PETER — B-6, the one open item**: the AV-declared deferral's form, and the walk-back duty. Two coherent dispositions, both before Peter with my recommendation in the session record: **(1) fixed machine-readable deferral form** (ruling 3's own standard applied to the same object — an author-authored assertion exempting an artifact from a mechanical red — plus the walk-back written onto Stacy's CLOSEOUT seat, as she volunteers); **(2) accept-in-writing** that `-exists` reds on lawful deferrals and the red is reconciled by judgment at the pass (pin 5's verdict phrasing honestly stated; no new fixed form; the walk-back still needed). Requirements 1.5 / 5.3 / 8.6 amend on the ruling.

*End [THURGOOD R1].*
