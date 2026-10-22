# Ballot Measure: a re-pointed frontmatter or members row ROUTES (the C18 floor's entry grain)

**Date**: 2026-10-21
**Drafted by**: Thurgood (Civitas steward; owner of `regrounding/triviality.ts`, `regrounding/freshness.ts` and `verify-signing-chain`, the code this rule changes), at Peter's direction: *"Let's go with the class-level fix."* (chat, 2026-10-21, relayed by the orchestrator). The class option as put to him is Stacy's, from her review of burst 1 (2026-10-21): fix the layer where the gap lives, the floor, and let every reader follow from one source.
**Status**: **DRAFT** — R1 (Stacy) done, woven at THURGOOD R2; ratification waits on the lawful census re-run (§ 8). Nothing in this file is applied. A merge with this line still reading DRAFT is a recording defect, not a ratification.
**Required reviewer**: **Stacy** — the census reader (README § "Conventions", "Instrument census"), the seat whose claims passes count signing acts, and the author of the class option. R1: ASSENT with A1–A4, census VOID as a census (CR-1, CR-2, grammar), F-1 (a).
**Consulted**: Lina — no objection (`scratchpad/consult-routes-floor-lina.md`, 2026-10-21). Two conditions: the floor and all 19 signatures land in ONE PR, and `classifyCharter` is untouched. Two additions: `RouteReason` widened with `'re-pointed-entry'` (type only), and a `triviality.assignment.test.ts` case pinning `classifyCharter`'s output unchanged. Her fixtures are not dragged, the exemplar scores are unchanged, F-1 (a). All four are woven into § 3.
**Unit**: this file rides the burst-1 PR (`chore/burst-1-m1-erratum-sweep`) as a DRAFT only. Its application is a later PR (§ 3), Peter-merged under the governance carve-out.
**Cap**: one rule (§ 2). **Retroactivity**: none. The rule binds signing acts made after its application merge, and it does not reach back (signing ballot § 2 clause 8).

> **Conflict of interest, stated first.** I own the floor, the sweep, the verifier and the census mode this rule is measured by, and I drafted the erratum whose application surfaced the incident. The rule's cost falls mostly on other seats (19 first signatures, § 3); none falls on mine.

---

## 1. The incident

Ballot `2026-10-01-signing-act-chain` § 2 clause 3, corrected by the erratum Peter ratified on 2026-10-21, bounds a signing act to a row on the branch's freshness stale list **or its unsigned-routed list**. Burst 1 built that bound into `verify-signing-chain --ci` link 1: a first signature passes only when the row is on the unsigned-routed list of the commit's first-parent tree. The routed population is the one `consumer-profile.real.test.ts` already enforces: `no-consumer-counterpart` and `superseded-by` rows in any section, and body `re-pointed` units that C18 ROUTES.

Replaying the 17 profile-touching PRs under the new link 1 found **five first signatures already on `main`** that are on neither list:

| PR | Commit | Row | Disposition |
|---|---|---|---|
| #337 | `1104117b` | `kenya.dispositions.yaml#in-scope` | body `re-pointed`, CLEARS |
| #337 | `625d025a` | `data.dispositions.yaml#in-scope` | body `re-pointed`, CLEARS |
| #378 | `c18a02e0` | `leonardo.dispositions.yaml#step-3-specify-the-screen:preamble` | body `re-pointed`, CLEARS |
| #378 | `c18a02e0` | `leonardo.dispositions.yaml#frontmatter:writeScope[product/**]` | frontmatter `retained` |
| #378 | `9e5ede42` | `sparky.dispositions.yaml#in-scope` | body `re-pointed`, CLEARS |

They were made under the release-3 and release-4 rulings, and they were already outside clause 3's old text. Nothing reaches back, and CI walks only a PR's own range, so nothing on `main` breaks. They show the pattern: **seats record assent on rows they re-grounded, and the floor does not route those rows.**

The census at `b42874bd0` (§ 4): 1089 rows, 376 signed, a routed population of 360 (all signed), and **16 signed rows outside it**:
- 9 frontmatter `re-pointed` rows, which this rule routes;
- 4 body `re-pointed` rows that CLEAR (four of the incident's five);
- 3 frontmatter `retained` rows:
  - Leonardo's `writeScope[product/**]`, the incident's fifth;
  - `data#` and `kenya#frontmatter:ambient.groundTruthManifest.verdict`, which are not in the incident. They were signed while routed as `no-consumer-counterpart`, then refused (`should-re-point`), re-disposed `retained` and re-signed on 2026-09-29 (`dba93df5`), with VALVE-1 re-signs since. That is lawful refusal-resolution residue (Stacy R1).

**Peter, chat, 2026-10-21, verbatim: "Let's go with the class-level fix."** The orchestrator's reading, stated as a reading: the tightening stays as ratified (no widening erratum; the five acts stay out of bound), and the floor is fixed as Stacy's class option proposed: re-pointed frontmatter and members rows route, so they land on the unsigned-routed list by definition. The sweep, the real test, the FU8 oracle and link 1 then all follow from one source. Peter did not speak to the three smaller points (signature deletion, FU25; sheet-only acts, FU24; the list as a sweep finding). The orchestrator reads that silence as "leave as today", and all three stay pinned.

## 2. The rule (operative text, proposed)

New clause 5 in Spec 123 `design.md` § C18 ("The triviality floor"), after clause 4 (the hard floor). The same sentence goes in `regrounding/triviality.ts`'s header, where the verdicts are listed.

> 5. **The entry grain.** A `frontmatter` row or a `members` row whose disposition is `re-pointed` **ROUTES** (reason `re-pointed-entry`) → a C17 signature row, judged by a human. Clause 1's INAPPLICABLE does not reach it: an entry is operative configuration that has no C16 item record, not a unit whose committed record holds zero items, so clauses 1–2 have nothing to count, and no measure exists by which it could clear. A re-grounded entry is also where clause 2's own exclusion lands: 12 of the 28 re-pointed entries today carry removals that cite subtraction 1–4 (13 removals), and clause 2 never lets a body unit with such a removal clear. Nothing else in C18 changes. Body units are classified exactly as clauses 1–4 say (outside the entry set; INAPPLICABLE; CLEARS; ROUTES). A `retained` frontmatter or members row is not routed.

**Not enacted here**: the routing of `no-consumer-counterpart` and `superseded-by` rows in any section. That lives in Req 11.5.1 ("Every `no-consumer-counterpart` claim SHALL be … signed by the owning domain agent"), extended to `superseded-by` by the phase-two function-grain ruling that Task 15.5 enforces (`consumer-profile.real.test.ts`, "every 'function went nowhere / elsewhere' claim"), and in C17's signature row. None of it is C18's, and clause 5 neither restates nor changes it.

**What the rule does not do**: it routes no body unit that CLEARS or is INAPPLICABLE, and no `retained` row. All five incident rows stay outside the routed population (§ 6, residual 1).

## 3. Edit sites (application, a later PR, in this order)

**Lina's conditions, binding on the application**:
- **One PR.** The floor and all 19 first signatures land together. Between the floor commit and the last signature, `consumer-profile.real.test.ts` ("every row in the signed population is signed by its C1 seat") is red, so no partial merge is possible.
- **`classifyCharter` is untouched.** The entry grain lives only in `routesEntry`, so the G1 and body-unit pins stay valid.

1. **The floor** — `tools/agent-generator/regrounding/triviality.ts` (Thurgood):
   - One exported predicate for the entry grain, `routesEntry(section, row)`: `ROUTES` with reason `re-pointed-entry` for a `re-pointed` frontmatter or members row, otherwise not routed. Its comment says "no measure exists, so it routes", never a score (Lina).
   - `RouteReason` widens to `'below-half' | 'repo-specific-removal' | 're-pointed-entry'`, type only (Lina).
   - The header gains clause 5.
   - `triviality.assignment.test.ts` (Thurgood) gains the predicate's cases, and a case pinning that `classifyCharter`'s output over the existing body-unit inputs is unchanged (Lina).
   - Lina's triviality and G1 fixtures and the semantics-guard fixture are not edited.
2. **The sweep** — `tools/agent-generator/regrounding/freshness.ts` `routedPopulation` calls `routesEntry` for frontmatter and members rows (Thurgood). The orphan filter (`current[name](key)`) stays where it is, in the sweep, not the predicate (Stacy R1). `--ci` link 1 and the census mode follow with no change of their own.
3. **The real test** — `tools/agent-generator/__tests__/consumer-profile.real.test.ts`, `signedPopulation`: frontmatter and members `re-pointed` rows join the population through `routesEntry`. Its owner is Lina (shared core, she is primary; consult 2026-10-21). The application PR shows that its population equals the census's 388 routed rows (Stacy R1, coverage).
4. **The FU8 oracle** — `tools/agent-generator/__tests__/freshness.unsigned-routed.test.ts` (Thurgood): the frozen copy gains the same clause, re-frozen at the application SHA. FU1's expected sets move with T-UR's r10 row (`fm:tools[x]`, `re-pointed`, which joins unsigned-routed).
5. **Spec 123 design** — `.kiro/specs/123-consumer-distribution/design.md` § C18, clause 5 (the § 2 text, verbatim) (Thurgood).
6. **The 19 first signatures**, each by its C1 seat in its own seat commit, entered by merge (signing ballot § 4.6). They come after the floor commit on the same branch, so each row is on the unsigned-routed list at its commit's first parent. The rows (census delta, § Census appendix):

   | C1 seat | n | Rows |
   |---|---|---|
   | Ada | 2 | `ada#frontmatter:description`; `ada#frontmatter:writeScope[.kiro/specs/**]` |
   | Data | 4 | `data#frontmatter:commands[android-build-test]`; `…commands[product-screen-commands]`; `…knowledgeBases[android-components]`; `…writeScope[.kiro/specs/**]` |
   | Kenya | 4 | `kenya#frontmatter:commands[ios-build-test]`; `…commands[product-screen-commands]`; `…knowledgeBases[ios-components]`; `…writeScope[.kiro/specs/**]` |
   | Leonardo | 2 | `leonardo#frontmatter:description`; `…writeScope[.kiro/specs/**]` |
   | Lina | 1 | `lina#frontmatter:writeScope[.kiro/specs/**]` |
   | Sparky | 2 | `sparky#frontmatter:commands[product-screen-commands]`; `…writeScope[.kiro/specs/**]` |
   | Stacy | 4 | `stacy#frontmatter:knowledgeBases[completion-docs]`; `stacy#frontmatter:writeScope[.kiro/specs/**]`; `thurgood#frontmatter:writeScope[.kiro/specs/**]` (C1 carve-out: owner = profile author); `_shared#record-first-ratification` (members; owner thurgood → C1 stacy) |

   Stacy signs four rows, and her acts take the delegate audit (signing ballot § 5.3). The 9 already-signed frontmatter `re-pointed` rows become routed with no act owed. They stay under the stale clause as today.
7. **The register** — `governance/classification-map.md` § `signing-act-consistency`: a history line (EXECUTION of this ballot); `checks[]` and the `census` field unchanged. No other row cites C18.
8. **Flagged, not drafted here: C17's `# present iff ROUTED`** (`design.md` § C17's row schema, line 610; `regrounding/signatures.ts` header, "present iff ROUTED"). It is false for the seven signed-not-routed rows of § 6 residual 1, both before and after this rule. The owner is Thurgood (`.kiro/specs/**` and `signatures.ts` are both in my scope). A dated note qualifying it ("…; a signature may persist on a non-routed row — the closed set of § 6 residual 1") rides the application PR, or the signatures are deleted (FU25, pinned; Peter's). Not decided here.

## 4. Census

**Census**: `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --census-routed` over `canonical/profiles/**` + `canonical/operative-sets/**` + their canonical sources @ `b42874bd0` — current `b423eae8a38e781428581c72b334468084924ca9067db4e0655b8e3d42bbee29` → proposed `0f5c514495cb293accd3ac79a65196cf6c66f83be85a18d1b1cbd8e940573204`; 28 rows change (delta: § Census appendix)
- **Unit**: a dispositions row. **Counts**: routed 360 → 388; unsigned-routed 0 → **19**; signed-not-routed 16 → 7.
- **The census mode**: `--census-routed` prints `freshness.ts` `routedCensus`, one sorted line per dispositions row (`<rowId>\t<routed: label | not-routed>\t<signed|unsigned>\t<signer | ->`), then a count line. Every value is `routedPopulation`'s own, and `signed` is `RoutedRow.signed`'s predicate (`isSignedRow`), not a YAML read (Stacy R1, grammar). It was built in burst 1 (`858b2b1d7`), and the register field was written there (`a39e2d112`). It reproduces both R1 digests exactly at `b42874bd0` through `--at`, current and with the scratch diff in § Census appendix, and its delta is the R1 appendix's, line for line.
- **This line is not yet lawful at its SHA**, and it says so. At `b42874bd0` itself the census mode does not exist (`--at` reads `main`'s corpus with burst 1's code), and the field is on no row there, so CR-1 and CR-2 stand until burst 1 merges. **CR-1 clears at burst 1's merge** (the field and the mode land on `main`). The lawful census is then **re-run at the first `main` SHA after it**, as committed and with the scratch diff, and this line is re-stated with that SHA. § 8 makes ratification wait for that re-run.
- **Coverage** (Stacy R1): the census reads `routedPopulation`. The real test's `signedPopulation` is the second reader, and § 3 site 3 shows it equal to the 388 at application.

## 5. Cost

19 first signatures across seven seats (§ 3 site 6), each a rendered-hash computation and an assent (`surviving: []`, since an entry has no items) plus its sheet section. Stacy carries four, and the delegate audit of them. The code is a one-line predicate plus its tests, a type widening, a call-site change in the sweep and the real test, and an oracle re-freeze. Every later re-grounding of a frontmatter or members entry owes a signature that today it does not: entry-grain re-signs become routine work.

## 6. Counter-arguments (fold-back applied) and the residual

1. *"The rule does not reach the incident."* **Surviving.** After this rule, **seven signed rows stay outside the routed population**, a closed standing set (Stacy A3). Stacy's passes carry `signed-not-routed: 7 (named set)`, and an eighth row is a finding:
   - `canonical/profiles/consumer/kenya.dispositions.yaml#in-scope` (body `re-pointed`, CLEARS)
   - `canonical/profiles/consumer/data.dispositions.yaml#in-scope` (body `re-pointed`, CLEARS)
   - `canonical/profiles/consumer/sparky.dispositions.yaml#in-scope` (body `re-pointed`, CLEARS)
   - `canonical/profiles/consumer/leonardo.dispositions.yaml#step-3-specify-the-screen:preamble` (body `re-pointed`, CLEARS)
   - `canonical/profiles/consumer/leonardo.dispositions.yaml#frontmatter:writeScope[product/**]` (frontmatter `retained`)
   - `canonical/profiles/consumer/data.dispositions.yaml#frontmatter:ambient.groundTruthManifest.verdict` (frontmatter `retained`, refusal-resolution residue, `dba93df5`)
   - `canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:ambient.groundTruthManifest.verdict` (same)

   The first five are the incident's rows. Re-signs on all seven stay lawful through the stale clause. A seat's judgment on a CLEARS unit leaves no signature trace. The floor's soundness covers deletion (verbatim retention), but not an overlay addition that contradicts a retained item. A seat who sees one has no signature row to refuse on, and her remedy is authoring or an issue (Stacy R1, surviving).
2. *"19 signatures nobody asked for."* **Corrected at R2 (Stacy A4): these are not entailment-free.** They have no C16 items, but they need judgment:
   - **3 of the 19** carry removals cited to subtraction-2 (4 removals): `_shared#record-first-ratification` (two), `ada#` and `leonardo#frontmatter:description`. These are exactly the judgment clause 2 exists to route. All 9 already-signed rows carry a subtraction-1–4 removal too.
   - **8 of the 19** are the `writeScope[.kiro/specs/**]` entries, one per charter. Each re-grounds a write permission in a consumer repo.

   Routed without a signature, these rows would gate in name only, and a re-grounded permission surface would ship unsigned. Residual: 19 assents at `surviving: []` risk becoming ritual stubs. Stacy's counting block already reports frontmatter apart from body and `_shared` as its own bucket, so entry assents do not dilute the body assent rate.
3. *"The floor's meaning widens."* Absorbed by the clause's own text: C18's clause 3 already reads "anything else ROUTES". Clause 5 adds a grain the floor never had, and it never changes a body verdict. Residual: "the triviality floor" now also routes rows that have nothing to be trivial about. The name stays, because C18 is cited across code and tests, and the meaning is broader than the name (Stacy, Lina).
4. *"The routed definition is a shared floor; a defect in it is invisible."* **Surviving** (Stacy's residual, carried). The sweep, the real test, the FU8 oracle, link 1 and now the census mode all follow `routedPopulation` and `classifyCharter`/`routesEntry`, so a defect there reaches every reader at once. The new predicate is one line, which keeps that risk small. The common mode stays.

## 7. Forks for Peter

**F-1 — the body-CLEARS half (residual 1).**
- **(a) Leave it.** Re-pointed body units that clear stay unsignable. Link 1 now refuses such a first signature mechanically, so "release rulings stop asking for such signatures" is enforced, not hoped.
- **(b) A separate ballot routing every re-pointed body unit.** Corrected framing (Stacy R1): (b) does not "undo" G1. Peter ruled Branch A (P2-a, "no mechanical floor") an acceptable state in advance on 2026-09-26: "the automated check is an efficiency device, not the protection". What (b) does is take P2-a's effect without its ruled trigger, a second consecutive G1 BREAKS. Lina adds that (b) would re-pin or delete a large share of her G1 fixtures (AX-1, four of the seven run-2 lines, the Lina-2 steps), and that it needs its own ballot with her fixtures consulted first.

Leans: Thurgood (a), Stacy (a), Lina (a). No new fact bears on the floor's soundness; the incident is about signing. The pick is Peter's.

Otherwise none. The rule is one clause, and the census delta is exactly the tree's re-pointed entries (28 rows: 27 frontmatter, 1 members; 19 unsigned).

## 8. Ratification — pending on the census

This item does not leave DRAFT on this file alone. The census reader voided the census at R1 (CR-1: no `census` field; CR-2: not a `main` SHA). Burst 1 carries the remedy: the census mode (`858b2b1d7`) and the field on `signing-act-consistency` (`a39e2d112`). **CR-1 clears at burst 1's merge.** The lawful census is then re-run at the first `main` SHA after that merge, by the drafter, and reproduced by the census reader (README, "The census reader"). The § 4 line is re-stated with that SHA and both digests. **Peter ratifies clause 5 then, on that re-run, not before.** If the re-run's delta differs from the R1 delta in an input unchanged since `b42874bd0`, the item stops and is reported (README, "Re-runs").

## Review

#### [STACY R1]

No `[@STACY]` mentions in this file. Census reader and required reviewer, 2026-10-21. Lina's consult is still PENDING, and my assent does not stand in for it.

**1. The clause** → § 2
- **Decidable from the dispositions alone: yes.** The test is section ∈ {`frontmatter`, `members`} and disposition = `re-pointed`. The orphan filter (`current[name](key)`) belongs to the sweep, not the predicate, and site 2 should say that the filter stays where it is.
- **Honest meaning: yes.** The reason `re-pointed-entry` says why the row routes, so nobody can read an entry's ROUTES as a failed triviality test. My residual still holds: the floor's name now covers more than triviality. I am leaving it as a residual. I do not ask for a rename, because C18 is cited across code and tests.
- **A1 (sentence 2 of clause 5).** "A re-grounded entry is always a human's to judge" is asserted, and it runs against clause 1, under which a body unit with zero items is INAPPLICABLE. The text should state the ground for the difference. An entry is operative configuration that has no item record. It is not a unit with zero operative items. Also, **13 of the 28 re-pointed entries carry removals that cite subtraction 1–4**, and clause 2 never lets a body unit with such a removal clear. The wording is Thurgood's to choose.
- **A2.** The sentence "`no-consumer-counterpart` and `superseded-by` rows … stay routed as they are today" should cite where that routing lives (Req 11's routed clause, and C17's `present iff ROUTED`). That routing is not C18's, and clause 5 should not read as if it enacts it.

**2. The census line**, my first read as census reader → § 4
- **Reproduction: exact.** I ran it in my own detached worktree at `2f98cc645` with the harness unchanged. Current output: `b423eae8a38e781428581c72b334468084924ca9067db4e0655b8e3d42bbee29`, an exact match. The appendix diff, extracted from this file, passes `git apply --check` and applies. Proposed output: `0f5c514495cb293accd3ac79a65196cf6c66f83be85a18d1b1cbd8e940573204`, an exact match. The delta matches the appendix line for line (28 rows), and both count lines match. The 28 rows are exactly the tree's re-pointed entries (27 `frontmatter` and 1 `members`). No line goes from routed to not-routed, and no body verdict moves. I re-ran the corpus check `git diff --name-only b42874bd0 2f98cc645 -- canonical/profiles canonical/operative-sets canonical/agents canonical/shared .kiro/steering`, and it is empty.
- **Grammar: deviates.** There is a parenthetical between `<command>` and `over`, and a count parenthetical before `(delta: …)`. Both should move into the bullets below the line. The output also deviates. The harness writes a `signed` column that it reads from the YAML itself (`row?.signature`), not from the instrument (`RoutedRow.signed` exists). That is added logic. It is constant across both runs, so the delta is unaffected. The census mode, when it is built, should take that value from the instrument or drop the column.
- **CR-2, SHA.** `2f98cc645` is not a `main` SHA. The corpus is `main`'s, but the decision function does not exist at `main`. The census cannot stand as a lawful census on that basis. It does not need its own wait, though. The field is owed first (site 8), and its census mode lands on `main`, so the lawful run happens at a `main` SHA after burst 1 anyway. The item waits for the field, and the SHA problem is cured in the same sequence.
- **CR-1, recorded as the reader's finding (never a gate).** `git show b42874bd0:governance/classification-map.md`: row `signing-act-consistency` has no `verification.census` field, and the register has zero `census:` fields at `b42874bd0` and at `411da42e5`. The line's `<command>` therefore matches no field. No exemption ground holds either:
  - ground 1 fails, because `verify-signing-chain` exists at `main`;
  - ground 2 needs a `none` written by the owner;
  - ground 3 fails, because the effect lies in a registered check's command.

  The item waits for the census mode and the field (site 8), or Peter ratifies past CR-1. The finding goes to Thurgood as instrument owner and register steward. It is disclosed in his own caveat, so it is not a finding against the drafter.
- **Reader's verdict: the census is VOID** (grammar, CR-2 and CR-1). The numbers reproduce exactly and can be relied on. If Peter ratifies past CR-1, the application re-run (README, "Re-runs") compares against this delta and stops on any difference in an input that has not changed.
- **Coverage.** The census reads `routedPopulation` only. The real test's `signedPopulation` (site 3) is a second reader of the same rule. The application PR should show that its population equals these 388 rows.

**3. F-1** → § 7, § 6 residual 1
- **Clause 5 settles 9 of my 16** (the frontmatter `re-pointed` rows). **Seven remain, in three shapes:**
  - 4 body rows that CLEAR (incident);
  - 1 frontmatter `retained` row (incident, `leonardo#frontmatter:writeScope[product/**]`);
  - **2 frontmatter `retained` rows that are not in the incident table**: `data#` and `kenya#frontmatter:ambient.groundTruthManifest.verdict`. These were signed while routed as `no-consumer-counterpart`. They were then refused (`should-re-point`), re-disposed `retained`, and re-signed on 2026-09-29 (`dba93df5`) under refusal resolution, with VALVE-1 re-signs after that. They are lawful residue. § 1 counts them in "3 frontmatter `retained`" but explains only one of the three.

  **Neither F-1 branch reaches the three `retained` rows.**
- **Position: (a).**
  - Link 1 now refuses a first signature on a CLEARS row mechanically, so "release rulings stop asking" is enforced, not hoped.
  - The five acts are past events. They are counted once, in burst 1's record, and are not recounted in each population, so they do not count against clause 5 forever.
  - Re-signs on those rows stay lawful through the stale clause.
- **A3.** § 6 residual 1 should name the seven, by row id, as a closed standing set. My passes then carry one state line, `signed-not-routed: 7 (named set)`, and an eighth row is a finding. **Flagged, not drafted:** C17's `signature: # present iff ROUTED` is false for these seven rows both before and after this rule. Whether that comment gains a qualifier or the signatures are deleted (FU25, pinned) is the owner's call.
- **Counter-argument that survives:** under (a), a seat's judgment on a CLEARS unit leaves no trace in signature history. The floor's soundness claim covers deletions, through verbatim retention. It does not cover an overlay addition that contradicts a retained item. A seat who sees such an addition has no signature row to refuse on, and her remedy is authoring or an issue.
- **Fork framing, corrected for Peter:** (b) does not "undo" G1. Peter ruled Branch A (P2-a, 2026-09-26) an acceptable state in advance ("the automated check is an efficiency device, not the protection"). What (b) does is take P2-a's effect without its ruled trigger, a second consecutive G1 BREAKS. I still lean (a), because no new fact bears on the floor's soundness. The incident is about signing.

**4. The 19 signatures: gate on them.** → § 6 residual 2
- **A4.** The residual "entailment-free … 'a human looked'" is partly wrong:
  - **3 of the 19 rows** (4 removals) carry removals cited to a subtraction: `_shared#record-first-ratification` (subtraction-2, twice), and `ada#` and `leonardo#frontmatter:description` (subtraction-2 each). Those are exactly the judgment clause 2 exists to route. All 9 of the already-signed rows carry such a removal too.
  - **8 of the 19 are `writeScope[.kiro/specs/**]` entries**, one for each of the eight charters. Each grants write permission in a consumer repo. Stacy's is re-pointed to `specs/**`; I checked only that one overlay.

  These rows have no items, but they still need judgment. If they routed without a signature, the gate would exist in name only, and a re-grounded permission surface would ship unsigned. § 6 residual 2 should be corrected to say this.
- The ritual-stub risk is real: 19 assents, each `surviving: []`. My counting block already reports frontmatter rows apart from body rows, and `_shared` as its own bucket, so entry assents do not dilute the body assent rate. No change is needed there. My four acts take the delegate audit.

**5. FU33 deviation: accept.** When the row's own dispositions file does not parse at the parent, no signing object can be identified, so link 1 has no row to decide. Link 2's "cannot confine" is the honest finding, and it fails closed. The finding is scoped to the file because it has to be. No amendment.

**Verdict [STACY R1]**: **ASSENT** to clause 5 with **A1–A4**. The census is **VOID as a census** (CR-1: no field; CR-2: not a `main` SHA; grammar), but both digests and the delta reproduce exactly. The item waits for the census field unless Peter ratifies past CR-1. **F-1: (a)**, with the seven rows named (A3) and the corrected fork framing above.


#### [THURGOOD R2]

No `[@THURGOOD]` mentions. Lina's consult (2026-10-21) is read beside R1. Every item below is woven into §§ 1–8; nothing is appended unwoven.

- **A1** → § 2 clause 5, sentence 2: the ground is now stated. An entry has no C16 item record, which is not the same as a record holding zero items (clause 1's INAPPLICABLE). Clause 2's exclusion lands on entries too. **Count corrected**: 12 of the 28 re-pointed entries carry subtraction-1–4 removals, **13 removals** (`_shared#record-first-ratification` carries two). R1's "13 of 28" counted removals, not rows. I verified this by reading every re-pointed entry's `removals[].cites`.
- **A2** → § 2, "Not enacted here": `no-consumer-counterpart` routing cites Req 11.5.1, `superseded-by` cites the phase-two function-grain ruling (Task 15.5), and both cite C17's signature row. It is not C18's.
- **A3** → § 1 (the 16 broken down by shape, with the two `ambient.groundTruthManifest.verdict` rows explained, `dba93df5`) and § 6 residual 1 (the seven, by row id, as a closed standing set).
- **A4** → § 6 residual 2, corrected: 3 of the 19 carry subtraction-2 removals (4 removals), and 8 are `writeScope[.kiro/specs/**]` permission entries. The assents carry judgment even with no items.
- **Census grammar** → § 4: the line is in the README grammar, with no parentheticals, and the unit and counts moved to bullets. `signed` now comes from the instrument (`isSignedRow`, the predicate behind `RoutedRow.signed`), not a YAML read.
- **CR-1 / CR-2** → § 4 and § 8: burst 1 builds the census mode (`--census-routed`, `858b2b1d7`) and writes the field (`a39e2d112`). The mode reproduces R1's two digests and its 28-row delta exactly, through `--at b42874bd0`. CR-1 clears at burst 1's merge. The lawful re-run happens at the first `main` SHA after it, and ratification waits for that re-run (§ 8).
- **Coverage** → § 3 site 3: the application shows the real test's population equal to the 388.
- **F-1 framing** → § 7: corrected per R1 ("does not undo G1; takes P2-a's effect without its ruled trigger"), with Lina's fixture cost added. All three leans are (a).
- **Lina's conditions and additions** → § 3: one PR for floor and signatures; `classifyCharter` untouched; `RouteReason` widened type-only; a `classifyCharter`-unchanged case in `triviality.assignment.test.ts`; the comment wording "no measure exists, so it routes".
- **C17's `present iff ROUTED`** → § 3 site 8: flagged, owner Thurgood, not drafted here.
- Forks: F-1 only. I disagree with no amendment.

---

## Census appendix

**R1's scratch diff is kept below as reviewed** (it applies at `2f98cc645`, where Stacy reproduced it). **The re-run diff** (it applies at burst 1's census-mode tree `858b2b1d7`, and must be re-checked at the first `main` SHA after burst 1 merges). It is the same one-line change, moved by the census-mode refactor:

```diff
--- a/tools/agent-generator/regrounding/freshness.ts
+++ b/tools/agent-generator/regrounding/freshness.ts
@@ -392,7 +392,7 @@
         all.push(census);
         if (!isMap(row) || !current[name](key)) continue; // an orphan is on no list (the sweep refuses it)
         const d = row.disposition;
-        const routedBy = name === 'body' && d === 're-pointed' ? routes.get(key) : undefined;
+        const routedBy = name === 'body' && d === 're-pointed' ? routes.get(key) : d === 're-pointed' ? ['re-pointed-entry'] : undefined;
         if (d !== 'no-consumer-counterpart' && d !== 'superseded-by' && routedBy === undefined) continue;
         const owner = ownerOf(source, name === 'members' ? key : undefined, { sharedOwners, recordOwners });
         const routed: RoutedRow = {
```

With it, `--census-routed --at b42874bd0` prints `1089 rows; 388 routed; 19 unsigned-routed; errors 0` and digests to `0f5c514495cb293accd3ac79a65196cf6c66f83be85a18d1b1cbd8e940573204`. Its delta equals R1's line for line.

**R1's scratch diff** (applies with `git apply` at `2f98cc645`):

```diff
diff --git a/tools/agent-generator/regrounding/freshness.ts b/tools/agent-generator/regrounding/freshness.ts
index c5d5a29e1..24ed83bce 100644
--- a/tools/agent-generator/regrounding/freshness.ts
+++ b/tools/agent-generator/regrounding/freshness.ts
@@ -349,7 +349,7 @@ export function routedPopulation(read: (rel: string) => string | undefined, file
       for (const [key, row] of Object.entries(section(name))) {
         if (!isMap(row) || !current[name](key)) continue; // an orphan is on no list (the sweep refuses it)
         const d = row.disposition;
-        const routedBy = name === 'body' && d === 're-pointed' ? routes.get(key) : undefined;
+        const routedBy = name === 'body' && d === 're-pointed' ? routes.get(key) : d === 're-pointed' ? ['re-pointed-entry'] : undefined;
         if (d !== 'no-consumer-counterpart' && d !== 'superseded-by' && routedBy === undefined) continue;
         const owner = ownerOf(source, name === 'members' ? key : undefined, { sharedOwners, recordOwners });
         rows.push({
```

**Delta** (the 28 proposed lines whose current line reads `not-routed`, plus the count line):

```
canonical/profiles/consumer/_shared.dispositions.yaml#record-first-ratification	routed: re-pointed: re-pointed-entry	unsigned	stacy
canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:description	routed: re-pointed: re-pointed-entry	unsigned	ada
canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**]	routed: re-pointed: re-pointed-entry	unsigned	ada
canonical/profiles/consumer/data.dispositions.yaml#frontmatter:ambient.groundTruthManifest.trims[dist/ComponentTokens.android.kt]	routed: re-pointed: re-pointed-entry	signed	data
canonical/profiles/consumer/data.dispositions.yaml#frontmatter:commands[android-build-test]	routed: re-pointed: re-pointed-entry	unsigned	data
canonical/profiles/consumer/data.dispositions.yaml#frontmatter:commands[platform-tokens]	routed: re-pointed: re-pointed-entry	signed	data
canonical/profiles/consumer/data.dispositions.yaml#frontmatter:commands[product-screen-commands]	routed: re-pointed: re-pointed-entry	unsigned	data
canonical/profiles/consumer/data.dispositions.yaml#frontmatter:knowledgeBases[android-components]	routed: re-pointed: re-pointed-entry	unsigned	data
canonical/profiles/consumer/data.dispositions.yaml#frontmatter:routes.cues[9]	routed: re-pointed: re-pointed-entry	signed	data
canonical/profiles/consumer/data.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**]	routed: re-pointed: re-pointed-entry	unsigned	data
canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:ambient.groundTruthManifest.trims[dist/ComponentTokens.ios.swift]	routed: re-pointed: re-pointed-entry	signed	kenya
canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:commands[ios-build-test]	routed: re-pointed: re-pointed-entry	unsigned	kenya
canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:commands[platform-tokens]	routed: re-pointed: re-pointed-entry	signed	kenya
canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:commands[product-screen-commands]	routed: re-pointed: re-pointed-entry	unsigned	kenya
canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:knowledgeBases[ios-components]	routed: re-pointed: re-pointed-entry	unsigned	kenya
canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:routes.cues[9]	routed: re-pointed: re-pointed-entry	signed	kenya
canonical/profiles/consumer/kenya.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**]	routed: re-pointed: re-pointed-entry	unsigned	kenya
canonical/profiles/consumer/leonardo.dispositions.yaml#frontmatter:description	routed: re-pointed: re-pointed-entry	unsigned	leonardo
canonical/profiles/consumer/leonardo.dispositions.yaml#frontmatter:routes.cues[21]	routed: re-pointed: re-pointed-entry	signed	leonardo
canonical/profiles/consumer/leonardo.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**]	routed: re-pointed: re-pointed-entry	unsigned	leonardo
canonical/profiles/consumer/lina.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**]	routed: re-pointed: re-pointed-entry	unsigned	lina
canonical/profiles/consumer/sparky.dispositions.yaml#frontmatter:commands[product-screen-commands]	routed: re-pointed: re-pointed-entry	unsigned	sparky
canonical/profiles/consumer/sparky.dispositions.yaml#frontmatter:routes.cues[8]	routed: re-pointed: re-pointed-entry	signed	sparky
canonical/profiles/consumer/sparky.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**]	routed: re-pointed: re-pointed-entry	unsigned	sparky
canonical/profiles/consumer/stacy.dispositions.yaml#frontmatter:knowledgeBases[completion-docs]	routed: re-pointed: re-pointed-entry	unsigned	stacy
canonical/profiles/consumer/stacy.dispositions.yaml#frontmatter:knowledgeBases[spec-summaries]	routed: re-pointed: re-pointed-entry	signed	stacy
canonical/profiles/consumer/stacy.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**]	routed: re-pointed: re-pointed-entry	unsigned	stacy
canonical/profiles/consumer/thurgood.dispositions.yaml#frontmatter:writeScope[.kiro/specs/**]	routed: re-pointed: re-pointed-entry	unsigned	stacy
1089 rows; 388 routed; 19 unsigned-routed; errors 0
```

(Current count line: `1089 rows; 360 routed; 0 unsigned-routed; errors 0`.)
