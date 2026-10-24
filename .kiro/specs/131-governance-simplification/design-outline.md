# Design Outline: 131 — Governance Simplification

**Date**: 2026-10-24
**Spec**: 131-governance-simplification
**Author**: Thurgood (spec formalization), briefed by the orchestrator
**Status**: **R2 DRAFT — planning.** R1 is incorporated; the ledger is `feedback/design-outline.md` § "[THURGOOD R2]". Nothing here is ruled. Execution starts only after the full spec process and after Peter's open release PRs close (§ 8).
**Priority**: after Spec 129, then 128, then 130. Peter, 2026-10-24: "Yes, immediately after 129: 129 → 131 → 128 → 130" (`.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § "Walk log").
**Source**: `synthesis-2026-10-23.md` (v4.1), history, cited by § / F# / P# / L#. Where they differ, this outline is current.

> **Conflicts, stated.**
> - **The author wrote much of what this spec retires** (F31) **and owns code it would delete**: `diff-guard.ts` and `regrounding/{freshness,signatures,c1,verify-signing-chain}.ts` are mine (ballot `2026-10-17-standing-write-scope-six-roots` § 4, Option B). Read the "Delivered?" cells with that in mind.
> - **Stacy specified several of these layers**; some proposed cuts are hers. **Lina built the disposition modules**, which import my `signatures.ts`.
> - **Every seat is one model family.** Seat agreement is low-independence evidence; what counts is command-verified fact (synthesis § 1) and real use (§ 3a).
> - **Required reviewer: Stacy.** One charter-free outside read runs each round.

---

## 1. The problem, in Peter's words

- **Concern (2026-10-23)**: we built too many layers while closing said-vs-built gaps; simplify, not slash.
- **Aim**: "I really want this project to be as self-governed and self-sustaining by the agents as possible; and many of these choices and directions to operate holistically, sustainably, thoroughly, and thoughtful have been in service of that aim."
- **The problem (2026-10-24)**: "what would governance simplification mean while sustaining, or enhancing, the outcomes that the accountability layers we aim to remove provide?"
- **Vehicle (2026-10-24)**: "If we were going to do this, I would want to do it in a spec and would consider this planning. Execution would begin after we follow spec development processes and I complete the series of open issues I'm resolving in the PRs that I've been keeping you aware of."
- **Gates (2026-10-24)**: "I'm not waiving the sequential gates."
- **What a signature is for (2026-10-24)**: "the signature isn't the outcome; the outcome is that output is clean, useful, works as intended, is achieving the goal in a way that aligns with the values we discussed earlier."

**So**: simplification is measured by outcomes, not layers removed. A layer can go when its outcome is sustained by something cheaper, enhanced by something better, or knowingly dropped for a stated reason. Where a layer never delivered, simplifying means building the replacement.

---

## 2. Settled context (pointers only)

- **Rulings**: synthesis § "Rulings". 16.1.0 ships under current rules through its tag (item 0a, (i)). P1's scope (i) is a hypothetical planning input (item 1a). No suspension record is issued outside this spec.
- **Facts**: synthesis § 1, F1–F31, corrected here at F3 (row 1) and F24 (§ 3a). **Tests** A1–A4: synthesis § 0. **Closed**: L3, L5, L6, L8; L7 superseded.
- **Out of scope, gap stated**: "validated or experimental" is the existing product tier (`governance/DesignerPunk-Integration-Guide.md` § "Governance Gradient", L934, L944; `governance/MCP-Relationship-Model.md` § "Promotion Path", L157; `governance/Product-Token-Governance.md` L24), as Peter recalled (`[PETER R1]` item 1). The gap is wiring and exercise: no intake step routes a request into the tier, promotion has never run, Tier 3 triage has no charter owner, and the Product MCP is "conceptual". It is filed with its owners, outside 131 (`[PETER R0]` item 4).

---

## 3. The outcome map (PROPOSAL)

### 3a. The binding constraint: fixing, not detecting

The system finds defects faster than it fixes them.
- **Use happened, and found real defects.** test01's repo has had no commit since 2026-06-15 and no consumer tracks releases; F24's "use stopped" overstated it. Two rehearsals ran on copies: Lina's on 2026-10-02 and the 2026-10-24 run (`evidence/2026-10-24-test01-upgrade-rehearsal.md`).
- **The 10-02 findings were carried, not fixed.** In `.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md`, R2, R4 and R6 lapsed twice, were waived for 16.0.0, and are still open. R4 is the same false "✅ Everything DesignerPunk manages is up to date" that 10-24 found again (F-9); R2 is F-1's `.npmrc` class. The trigger meets the 16.1.0 walk; a third lapse goes to Peter as spec-or-drop.
- **The 10-24 findings are unfiled**, and F17's three Swift defects still have no records (`[ADA R1]`).

So the records system re-rules what it should repair. **Every row is judged against this**: better detection that moves no fix is not an enhancement. Metric 4 measures fix latency for this reason.

### 3b. The map

*Outcome*: what the layer was built for, from its own ballot or requirement. *Delivered?*: evidence. *Verdict*: **S** sustains · **E** enhances · **D** knowingly dropped · **B** never delivered, build the replacement. *Check*: who acts / the non-model check.

**Unmeasured rows** (`[OUTSIDE R1]` item 6): the 16.1.0 RELEASE pass, which runs under current rules anyway, supplies rows 4, 6 and 12 (`[STACY R1]` item 16). A row still unmeasured at requirements is kept if it costs one checkable line, otherwise **D**, with "unmeasured" as the reason.

| # | Layer | Outcome (source) | Delivered? | What carries it | Verdict | Check |
|---|---|---|---|---|---|---|
| 1 | Consumer-profile signatures, C1 routing | Shipped agents re-grounded on the consumer's repo, signed by the owning seat; "assent should cost at least as much as refusal" (Spec 123 Req 11; 11.5.2; 11.5.4; 11.5.6) | **Once, then decayed**: 25 refusals at the first render, each resolved, 0 standing (`claims-pass-midpoint.md` L215); 0 issued since (15.1.0 L311; 16.0.0 L311). Blind re-judgment disagreed in 9 of 46 (15.0.0 L267). 11.5.6 predicted "holds syntactically and fails attentionally" | The outcome is output that works (§ 1); the per-release rehearsal measures it. The changed-path list (row 3) shows owners where to look | Per-row assent **D**; **E** rests on the rehearsal, not a read (**F-10**) | Rehearsal owner / its exit and served-corpus probe |
| 2 | Signing chain: `verify-signing-chain`, fixtures, routes floor, hold act, link 4, local `check-agent-trailer.ts` | "Assurance that the seat whose signature appears is the seat that signed" (`2026-10-01-signing-act-chain.md` § 1) | About 6 signing-shape ballots in 22 days, none from shipped bytes (F21) | Moot once row 1 goes; honest error moves to row 7 | **D** | n/a |
| 3 | Freshness sweep in `runGuard` (F6) | An operative item never changes silently after confirmation (Spec 123 C16; Req 11.6.5d) | **Unmeasured**: no recorded re-sign changed shipped text (`[STACY R1]` item 2). Cost: volatile metadata reddened the gate | `readConsumerSpans` (`derive.ts` L571) joined to `git diff <last-tag>` over `canonical/_consumer-output/**`: changed rendered lines per release, by owner (`[LINA R1]` item 2) | **S** at release grain (**F-3**); operative sets lose readers (**F-11**) | CI prints the list |
| 4 | Edit-kind lines | Whether an edit needs a ballot is "decidable without consulting the author" (`2026-10-18-governance-edit-kinds.md` § 1) | **Unread**: ratified after the last pass; one dry run (CL OB-12) | "A LAW edit cites its ballot" | LAW **S**; the other kinds await 16.1.0's reading | Git: the ballot reads RATIFIED |
| 5 | Delegated-tier line, audit | End ambiguous silence; feed tier recalibration (`2026-09-19-delegated-tier-capture.md` §§ 1, 4) | Present 31/31, divergent 4/31, 1 contradiction found (MP-4). **Recalibration use: none**; the model-selection doc unchanged since 2026-07-09 (`[STACY R1]` item 4) | Nothing | **D** | n/a |
| 6 | Consulted-line count | Options reach Peter vetted by owners (`2026-09-28-orchestrator-consult-first.md` § 1) | Present 43/43; 9 spot-checks clean; **never produced a finding** (`[STACY R1]` item 5) | The consult rule | Behaviour **S**; count **D** | None, knowingly |
| 7 | Write-scope grants (tasks-row, issue-row), ARMING reads, activation query | (a) Seats can do their seated work (`2026-09-26-tasks-row-write-scope-grant.md` § 1). (b) Decidable reads of `.github/**` changes (`2026-10-20-grant-ci-deletions-and-activating-merge-read.md` § 1) | (a) Yes. (b) Partly; out-of-scope edits recurred four times, once past a Peter merge (F30) | (a) One OWNERS file, rendered into the charters' read-only clause and Kiro `allowedPaths`; on Claude Code the barrier is behavioural either way (`[LINA R1]` items 4–5). (b) A computed owners/touch report | (a) **S**, only with OWNERS in the same unit; (b) **B** (**F-1**) | OWNERS vs changed paths, in CI |
| 8 | Census at draft | No hand count ratified where an instrument computes it (`2026-10-19-instrument-census-at-draft.md` § 1) | One catch, from a stop condition (F22) | One sentence: run it | Sentence **S**; apparatus **D** | The instrument |
| 9 | Subtask completion docs (S-4) | Adaptations get recorded (`2026-09-19-completion-audit-standards-package.md` § S-4) | Present 148/151; 30.3 unwritten, owner disputed (16.0.0 L377); downstream reading unmeasured | One adaptations line in the parent doc | **S** | Parity reports the line |
| 10 | Claims-pass shape (P6) | Claims match what shipped (A1); RELEASE, SYMPTOM non-negotiable (`2026-09-17-spec-127-outline-settle.md` § 11.4) | **Partly.** Passes caught packaging and text defects on the claims they listed (F14), not on the consumer's path: after 16.0.0's pass, 10-24 found false shipped text (`--help`, the `sync` all-clear) and packaging defects (`exports` → unminified bundle). Behaviour: never (F13) | Rehearsal (consumer path); pack-diff before the tag (F27); 129's lane (compile class on native). Native behaviour needs simulator and emulator targets (`[KENYA R1]` 3; `[DATA R1]` 4) | **E per platform at green**, compile class and consumer path; behaviour stays outside, stated (**F-14**) | Stacy / pack-diff, rehearsal, lane results |
| 11 | EDUCATION route (F29) | The docs stop teaching the wrong thing (127 settle § 11.4) | Yes; a growth engine | Defaults to delete or narrow | **S** | Implications that add vs narrow, computed from pass records (`[STACY R1]` item 9) |
| 12 | Instruments block → evidence-command column | No parent starts with evidence that doesn't exist (`2026-09-28-parent-instrument-existence-check.md` § 1) | **Yes**: about 58 self-reported gaps vs 1 by a pass; Task 28 resolved 5 `MISSING` before code. The header grammar failed 3 times (MP-3, CL-2) | The block as a column, run at branch cut | Block **S**; header **D** | The commands' exits |
| 13 | Issues README, 12 → about 5 rules | A3: problems recorded, routed, read when their event fires (`2026-10-18-obligation-drain-and-release-falsity-floor.md` § 1) | **Partly**; § 3a lives here: triggers produce re-rulings, not repairs; F17 never filed | Filing rule with owner and trigger; a component field (row 19's `knownDefects`); the reporter files when handing a defect over | **S** cheaper; **E** only if fix latency falls | Metric 4 |
| 14 | Register → a table | Each rule's enforcement owner addressable (125-B Req 1) | Yes | Table form | **S** | `audit:coverage-map` |
| 15 | Charters around duties; scope → OWNERS | Charters state the scope practice uses (six-roots § 1) | Yes | OWNERS, rendered; shaped by § 7 | **S** | diff-guard |
| 16 | Record-first ratification, shortened | A2: authority is a committed record | Yes | Kept, shorter | **S** | git |
| 17 | Process law in the shipped and served corpus (P8) | Consumer agents get content about their own repo (Spec 123 Req 12) | **No**: 84 `governance/` docs ship (F15). After an upgrade the docs MCP served 9 of 83 while rating matches `strong` (10-24 F-8), defeating Certainty Calibration | Move process law out; keep the token docs consumers select from (`[ADA R1]` P8 list), native samples labelled or stripped first (F18); a short consumer-authored always-set | **B** | Leonardo, Ada, Lina / **served-doc count after install and upgrade**, not the pack listing |
| 18a | Ada's four hooks | none stated | All four are user-triggered prompts; none enforces (F23) | Nothing | **D** | n/a |
| 18b | Token-creation review | No autonomous token creation (Core Goals; no ballot) | **Unmeasured in practice**: it is Peter's merge, and nothing marks a token-adding PR (`[ADA R1]` (b) 5) | Candidate: a generated tokens-added/removed PR line from `token-index/` | **S** | Peter / validators check fit, not need |
| 18c | Component-token **usage** approval | "Using them should be a deliberate decision" (Token-Governance § "Component Token Usage") | Unmeasured | Narrowed to creation (P9) | **D**; residual: "is the semantic tier insufficient?" is asked only at creation | n/a |
| 19 | Readiness claims (P2) | A consumer knows what they can use, per platform (schema; `Component-Readiness-Status.md`; no ballot) | **No**: four answers (F11; `Component-Quick-Reference.md` L38–53). `ReadinessCompliance.test.ts` checks the indexer against its own patterns (`[LINA R1]` 6) | One served answer per platform: `compiles: {verb, sha, result}`, generated (Android has two compiles; iOS attributes from the whole-package `-wmo` run); `contractEvidence` (iOS `runtime` for 2 components, else `none`); `knownDefects` from records. Prose columns generated or deleted. `compiles: unverified` may land before 129 | **B**, closing per platform at green | Lina / lane results |
| 20 | Peter's sample of Stacy-signed acts | An independent check on the verifier (signing ballot § 5.3) | **Never ran**: 0/297, 0/309 (F4) | Peter reads reports (`[PETER R0]` 2): the release findings report (§ 5) | **D**, recorded "never ran" | The report's check list |

### 3c. What the map shows

- **Never delivered** (17, 19, 7(b)) needs building. Row 1 delivered once and decayed. Row 20 is dropped, not rebuilt: it asks Peter for a review he says he cannot do.
- **Deletions with nothing replacing them**: 2, 5, 6's count, 8's apparatus, 12's header, 18a, 18c.
- **Row 7 is the trap**: the grants enabled work; without OWNERS the refusals return.
- **Only use finds new classes.** Four of the six 10-24 repairs exist only on upgrade, where a fresh-install fixture cannot look (`[LEONARDO R1]` 4). So the rehearsal carries rows 1 and 10.

### 3d. Adds vs removes (answers `[OUTSIDE R1]` item 5)

A *mechanism* is a standing rule, check, record type or duty someone runs or maintains; one-time acts (§ 7, migrations) are excluded.
- **Removes 14**: signatures and C1 (1); signing chain (2); freshness sweep (3); EXECUTION/CORRECTION lines (4); delegated-tier line (5); Consulted count (6); grants, ARMING reads, activation query (7a); census apparatus (8); subtask docs (9); mandatory MIDPOINT and broad ARMING (10); instruments header (12); Ada's hooks (18a); usage approval (18c); Peter's sample (20).
- **Adds 9**: OWNERS; touch report; changed-path list; per-release rehearsal; release findings report; pack-diff before tag; admission rule; metrics script; readiness fields. **Four replace a removed mechanism** (OWNERS ← grants and C1's unit→seat map; changed-path list ← freshness; report ← Peter's sample; readiness fields ← prose columns and the self-checking test).
- **Net −5**; −2 if Peter takes all three add-forks (F-4, F-5, F-10). On neither side: reshapes that keep a mechanism smaller (census sentence, evidence column, README, register table, the parent doc's adaptations line; subtask docs count as removed because their record type goes), 129's fixture and ratchet, and Ada's candidate tokens-added line.

---

## 4. Approaches considered

- **A. The map as the spine**: work every row to its verdict. Thorough, and the most governance work.
- **B. Fix-first** (`[OUTSIDE R1]` item 7): (a) owners fix the 10-02 and 10-24 findings; (b) "the rehearsal passes on a scratch copy of a standing consumer", plus one design task by its agents (`[LEONARDO R1]` 4), becomes a scripted release step with one owner; (c) the true deletions; (d) no new law except deletions until the rehearsal is green for N releases, then retire rows nobody missed. Web and package run today, in about 35 minutes; native waits for 129.
- **Proposal: B as the spine, the map as its backlog.** B (b) and (c) are 131's first unit (§ 9). A map row beyond them is admitted only when it names an outcome B leaves unmet. B (a) belongs to the owners (§ 8). The choice sequences the spec, so it is **F-9**.

---

## 5. Design principles and outcomes (PROPOSAL)

**Peter's definitions (2026-10-24), verbatim (typos corrected at his request):**
- **Thorough**: that all decisions have been made by a clear, informed understanding of the problem space and the dependencies a solution relies on or creates.
- **Sustainable**: the solution is scalable and elegantly manages exponential weight of load-bearing supports in the long-term
- **Holistic**: consideration for the needs of stakeholders in the blast radius of a decision or solution, and that the needs of those negatively impacted are appropriately mitigated
- **Thoughtful**: multiple solutions were explored, the solutions were evaluated from an immediate, intermediate, and long-term perspective, stakeholders were consulted, dissenting options were used to better inform solutions, solutions were tested to ensure they delivered on their purposes

Where the values live is the values ballot's question (R1 ask (c)).

**Two additions, kept after R1:**
1. **Proportionality**: the effort to satisfy the values scales with irreversibility and blast radius; the values always apply (`[PETER R0]` 9).
2. **One question per value** (`[SPARKY R1]` 2). A value is never cited as evidence, only its answer (`[STACY R1]` 18). Written answers are owed only where proportionality calls for them, or this becomes row 5 again. *Thorough*: is each named dependency verified? *Sustainable*: does this need another mechanism to work? *Holistic*: who is in the blast radius (consumers, the designer, Peter's time, future agents' context)? *Thoughtful*: what is the success check, and when is it re-run after shipping? **The rehearsal is that re-run's home** for consumer-facing changes.

**Agent-native inside, human-legible at the edge** (`[PETER R0]` 5): executable over declarative; derivation over attestation; a small always-set; machine-readable state; independence through different tools, not headcount; stop rules. Each design proposal names which it uses.

**Transparency** (`[PETER R0]` 6) is generated from state and checks, never agent-written:
- **CLI final lines derive from post-conditions** (served-doc count, configured directories exist, output count vs the last run), not bookkeeping (`[ADA R1]` class option). All three silent 10-24 failures were bookkeeping all-clears. Product code, Ada's; 131 states the outcome.
- **The release findings report**: decisions first, findings by severity, then a generated list of every check that ran. Each claim cites a check's output or reads `owed — needs <actor>` (`[STACY R1]` 14); unverified wording stays closed. No cap (`[PETER R0]` 2).

**Outcome requirements, for the requirements phase:**
- **O-1 · The designer is supported**: a consumer's agent answers "can I use X on iOS?" and "which token for Y?" from served truth, with confidence that drops when its sources do (`[LEONARDO R1]` 1).
- **O-2 · A1 on the consumer path**: upgrade and fresh install on the release candidate succeed by the docs alone, and their final lines are true.
- **O-3 · A3 as repair**: fix latency falls.
- **Admission**: any future layer names the unmet outcome requirement it serves (L1 part 1).

**Self-sustaining requires**: non-model sensors that execute the artifact; computed signals with a reader and trigger (§ 6); sunsets with falsifiers, never counters that reward finding nothing (`[STACY R1]` 8); one OWNERS file; real use and Peter's direction as the outside source of purpose. **Peter's role** shrinks to direction, identity and the independent check, read as reports; not below that, since every seat is one model family.

---

## 6. Metrics (PROPOSAL)

One script computes them; the output prints into the release findings report on the release PR (**F-15**).

| # | Metric | Dir. | Gaming, and the guard |
|---|---|---|---|
| 1 | Peter's required decisions per release | ↓ | By not asking. Guard: "Open for Peter" lines counted with answers. Limit: counts only written questions |
| 2 | Share of shipped claims verified by checks that **execute the artifact** | ↑ | By counting text readers (#453's guards). Guard: checks classed *executes* / *reads text* / *model*; only the first counts (`[DATA R1]` 5). Denominator committed at a sha first; native starts at 0 |
| 3 | Governance share of commits and lines | ↓ | By batching. Guard: lines under `.kiro/`, `governance/`, `canonical/`, **`tools/agent-generator/**`** |
| 4 | **Fix latency**: P0/P1 filing → fixing PR merged | ↓ | By not filing (F17) or re-classing. Guard: count pass, SYMPTOM and rehearsal findings with no record; downgrades carry a dated reason |
| 5 | Rules retired ≥ added | ≥ | By splitting. Guard: law words and required checks |

Metrics 1 and 3 can rightly move the wrong way; they are signals, not targets.

**For 129's lane, stated as a requirement**: "no rise" keys on diagnostic fingerprints (message plus declaration name), so 26 fixes cannot cover 26 new defects; an inventory floor (declarations per file) stops an emptied file reading as a fix; distinct diagnostics; `-wmo` mandatory (`[KENYA R1]` 2). Baseline from the packed tarball at the arming sha (`[ADA R1]`).

---

## 7. Design-phase input: the two-part seat review

Peter, 2026-10-24. **After the values ballot ratifies**, each seat reviews, through the four values and the collaboration principles, (1) **its own area** and (2) **its seams** with other seats and system areas, explicitly including **the orchestrator seam** (briefs that failed the seats).
- Each item is **stop**, **simplify** or **fix**, and cites its record or incident.
- **Net reduction**: an addition names what it retires.
- **Three items per part.**
- Each seam is reviewed from both sides, and the views are paired.
- **Mechanical handoffs over prose protocols** (e.g. the reporter files the record when handing a defect to its owner, F17).
- **One charter-free cross-check** reads the set for self-serving proposals (F31).

Outputs feed each charter rewrite (P7), the OWNERS file and Agent-Directory's routing table. It precedes design.md, so design starts from the seats' evidence.

---

## 8. Dependencies

- **Spec 129 owns the lane and the harness; the consumer fixture's proposed home is 129 too** (all four R1 answers). It runs on the harness's pack → init → generate driver; building it in 131 builds that driver twice (`[LEONARDO R1]` 5; `[KENYA R1]` 1; `[DATA R1]` 1). Each leg is the platform's host target plus one screen; content is Leonardo's and includes a consumer-owned fork (`[LINA R1]`). Keeper: **F-12**; unit: **F-13**.
- **Native theme emission.** 26 of 39 iOS and 25 of 39 Android component files read a theme nothing emits; 129 or 128 ownership is open in 129's outline (L59). **A native platform's rows 10 and 19 change only at that lane's green. If 128 owns emission, native rows 10 and 19 stay B through 131.**
- **The rehearsal does not wait for 129.** Re-running it on the 16.1.0 candidate before the tag is handed to the release work, not ruled here.
- **The findings are their owners'**, owed now under the existing filing rule: 10-02 R2/R4/R6 (Lina's record); the 10-24 CLI items (Ada, consulting me on `shared/mcpConfig/**` and `SteeringDirCheck.ts`, Lina on F-3/F-5); component items (Lina); F-1/F-2's install doc (mine, `scripts/derive-install-doc.ts`, Ada consulted).
- **Peter's open PRs and 16.1.0**: execution waits; 16.1.0 ships under current rules.
- **Spec 123 amendments**: removing rows 1–2 amends Req 11.5 and VALVE-1 (F19); Peter ratifies.
- **Removal gate (P5)**: consumer `sync`/`derive` must not break when signatures are absent.

---

## 9. Tasks phase: ideas, noted only

**"Pure deletion"** means a unit that removes a mechanism and edits only its importers, its CI steps and the law sentences citing it, adding nothing.
- **Unreplaced deletions first**: rows 2, 5, 6's count, 8's apparatus, 12's header, 18a. Row 2 is a two-seat code change plus shared core: my `diff-guard.ts` and `regrounding/` files; Lina's importers (`dispositions.ts` L65 imports `signatures.ts`; L280–283 check each row's `signature`); `hash.ts` and `operative-sets.ts`. Each seat is consulted on the other's.
- **The rehearsal step** (B (b)) lands in the first unit.
- **OWNERS lands no later than the signature deletion, in the same unit**, via a new source in `source.ts`/`schema.ts` rendered through `adapters/cc.ts` and `adapters/kiro.ts`. Earlier forces re-signing 123 `writeScope[...]` rows; later leaves no unit→seat map (`[LINA R1]` 4). Row 7's grants go in that unit.
- **Replaced deletions** (rows 1, 3, 20) wait for their replacement, or carry a **D** Peter rules.

---

## 10. Open forks (attributed; Peter picks)

- **F-1 · L2, the `Agent:`-trailer check**, inside row 7(b)'s report. *For* (Thurgood, Stacy): honest error recurred four times (F30). *Against* (outside): typed text. *Fact* (Lina): `canonical/agents/**` is already Peter-merged.
- **F-2 · Where self-governance stops**: (b) with a deletion asymmetry, or "Peter samples deletions too". *R1 evidence*: "earn autonomy" holds only with its step-back half, keyed to recorded findings, never self-report (`[STACY R1]` 19; `[ADA R1]`).
- **F-3 · Freshness gap**, narrowed to the first reduced release by the changed-path list.
- **F-4 · The word budget**: a new check in a spec about additions.
- **F-5 · The freeze**: does it exempt 129? *R1 evidence* (`[ADA R1]`, against her own objection): F17 still unfiled; four P1s with no fixing PR. B (d) is a variant.
- **F-6 · Peter's read**, narrowed: he reads reports; the rehearsal is one (`[LEONARDO R1]` 6). Open: does it plus the pack-diff cover a sampled read of shipped claims?
- **F-7 · Unset numbers**: freeze N; N green rehearsals for B (d); N before (c); word budget; regeneration time.
- **F-8 · Signatures as partnership**, answered toward: the outcome is working output (§ 1); a seat's own-voice found items carry the partnership, not as evidence (`[LINA R1]` (c)). Remains only as F-10.
- **F-9 · The spine**: B with the map as backlog (proposed), or A.
- **F-10 · An owner read of changed paths (P10b)**: keep it, with Stacy's falsifier (a SYMPTOM traced to a changed path whose owner recorded `found: none`) replacing the zero-found sunset; or drop it and let the rehearsal carry row 1. *Against keeping* (outside): `surviving: []` becomes "found: none".
- **F-11 · Operative item lists**: what reads cite, or gone with their readers (`[LINA R1]` 3).
- **F-12 · Fixture keeper**: Leonardo or Stacy (`[DATA R1]` 1). Kenya proposes platform seats maintain their legs without verifying; Data reads harness charter § 4 as ruling that out.
- **F-13 · Fixture unit**: inside 129's harness unit, or a follow-on (`[KENYA R1]` 1).
- **F-14 · Claims-pass length**: cap the record near 3k words with an uncapped generated report, or no cap anywhere (`[STACY R1]` 13).
- **F-15 · Metrics reader**: the release report Peter reads, or Stacy's RELEASE record (adds to her seat).

---

## 11. Counter-argument, and the values applied to this revision

**Strongest counter**: this is still governance work; the most outcome per hour is the owners' fixes and 129's lane. **Fold-back added** approach B, § 3a and the count. **What survives**: B depends on owners fixing, which § 3a says is not happening; 131 can measure fix latency and gate new law on it, not make a fix happen.

**Where the revision still strains:**
- **Thorough**: rows 3, 4, 9 (downstream), 18b and 18c stay unmeasured, and the unmeasured rule can drop a layer that worked uncounted.
- **Sustainable**: five net-new standing mechanisms; the rehearsal is about 35 minutes per release on one owner.
- **Holistic**: native consumers get non-compiling output until 129 is green; seats are asked to cut duties they carry (F31).
- **Thoughtful**: B is reasoned, not tested; F-12's dissent is recorded, not resolved.

---

## 12. Left out on purpose

Requirements, design and tasks (the gates hold); restating the synthesis; the release work; the values ballot's content (its own file); the product-tier wiring (§ 2).
