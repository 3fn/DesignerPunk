# Ballot Measure: a re-pointed frontmatter or members row ROUTES (the C18 floor's entry grain)

**Date**: 2026-10-21
**Drafted by**: Thurgood (Civitas steward; owner of `regrounding/triviality.ts`, `regrounding/freshness.ts` and `verify-signing-chain`, the code this rule changes), at Peter's direction: *"Let's go with the class-level fix."* (chat, 2026-10-21, relayed by the orchestrator). The class option as put to him is Stacy's, from her review of burst 1 (2026-10-21): fix the layer where the gap lives, the floor, and let every reader follow from one source.
**Status**: **DRAFT** — R1 owed (Stacy). Nothing in this file is applied. A merge with this line still reading DRAFT is a recording defect, not a ratification.
**Required reviewer**: **Stacy** — the census reader (README § "Conventions", "Instrument census"), the seat whose claims passes count signing acts, and the author of the class option.
**Consulted**: Lina — **PENDING** (the orchestrator runs it): she owns the triviality and G1 fixtures and the semantics-guard fixture, and `consumer-profile.real.test.ts`'s routed population is read by the shared core she is primary on.
**Unit**: this file rides the burst-1 PR (`chore/burst-1-m1-erratum-sweep`) as a DRAFT only. Its application is a later PR (§ 3), Peter-merged under the governance carve-out.
**Cap**: one rule (§ 2). **Retroactivity**: none. The rule binds signing acts made after its application merge, and it does not reach back (signing ballot § 2 clause 8).

> **Conflict of interest, stated first.** I own the floor, the sweep and the verifier this rule changes, and I drafted the erratum whose application surfaced the incident. The rule's cost falls mostly on other seats (19 first signatures, § 3); none falls on mine.

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

They were made under the release-3 and release-4 rulings, and they were already outside clause 3's old text. Nothing reaches back, and CI walks only a PR's own range, so nothing on `main` breaks. They show the pattern: **seats record assent on rows they re-grounded, and the floor does not route those rows.** The census at `b42874bd0`: 1089 rows, 376 signed, a routed population of 360 (all signed), and **16 signed rows outside it** (4 body `re-pointed` that CLEAR, 9 frontmatter `re-pointed`, 3 frontmatter `retained`).

**Peter, chat, 2026-10-21, verbatim: "Let's go with the class-level fix."** The orchestrator's reading, stated as a reading: the tightening stays as ratified (no widening erratum; the five acts stay out of bound), and the floor is fixed as Stacy's class option proposed: re-pointed frontmatter and members rows route, so they land on the unsigned-routed list by definition. The sweep, the real test, the FU8 oracle and link 1 then all follow from one source. Peter did not speak to the three smaller points (signature deletion, FU25; sheet-only acts, FU24; the list as a sweep finding). The orchestrator reads that silence as "leave as today", and all three stay pinned.

## 2. The rule (operative text, proposed)

New clause 5 in Spec 123 `design.md` § C18 ("The triviality floor"), after clause 4 (the hard floor). The same sentence goes in `regrounding/triviality.ts`'s header, where the verdicts are listed.

> 5. **The entry grain.** A `frontmatter` row or a `members` row whose disposition is `re-pointed` **ROUTES** (reason `re-pointed-entry`) → a C17 signature row, judged by a human. It needs no operative set and no occurrence count: an entry carries no C16 items, so clauses 1–2 never apply to it, and a re-grounded entry is always a human's to judge. Nothing else changes. Body units are classified exactly as clauses 1–4 say (outside the entry set; INAPPLICABLE; CLEARS; ROUTES). A `retained` frontmatter or members row is not routed. `no-consumer-counterpart` and `superseded-by` rows in any section stay routed as they are today.

**What the rule does not do**: it routes no body unit that CLEARS or is INAPPLICABLE, and no `retained` row. **Four of the five incident rows (body CLEARS) and the fifth (frontmatter `retained`) stay outside the routed population** (§ 6, residual 1).

## 3. Edit sites (application, a later PR, in this order)

1. **The floor** — `tools/agent-generator/regrounding/triviality.ts` (Thurgood): one exported predicate for the entry grain, `routesEntry(section, row)`, returning `ROUTES` with reason `re-pointed-entry` for a `re-pointed` frontmatter or members row; the header gains clause 5; `triviality.assignment.test.ts` gains the predicate's cases (Thurgood). **Lina's fixtures**: the triviality and G1 fixtures and the semantics-guard fixture are consulted on and not edited, unless her consult names a case.
2. **The sweep** — `tools/agent-generator/regrounding/freshness.ts` `routedPopulation` calls `routesEntry` and drops its own disposition test for entries (Thurgood). `--ci` link 1 follows with no change of its own.
3. **The real test** — `tools/agent-generator/__tests__/consumer-profile.real.test.ts`, `signedPopulation`: frontmatter and members `re-pointed` rows join the population through `routesEntry`. Its owner follows the tests-follow-the-module rule (`consumer-profile.ts`, shared core, Lina primary). Confirm at her consult.
4. **The FU8 oracle** — `tools/agent-generator/__tests__/freshness.unsigned-routed.test.ts` (Thurgood): the frozen copy gains the same clause, re-frozen at the application SHA. FU1's expected sets move with T-UR's r10 row (`fm:tools[x]`, `re-pointed`: it joins unsigned-routed).
5. **Spec 123 design** — `.kiro/specs/123-consumer-distribution/design.md` § C18, clause 5 (§ 2 text, verbatim) (Thurgood).
6. **The 19 first signatures**, each by its C1 seat **in its own seat commit**, entered by merge (signing ballot § 4.6). They come after the floor commit on the same branch, so each row is on the unsigned-routed list at its commit's first parent. The rows (census delta, § Census appendix):

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
7. **The register** — `governance/classification-map.md` § `signing-act-consistency`: a history line (EXECUTION of this ballot); `checks[]` unchanged. No other row cites C18.
8. **The census field** — owed before this item leaves DRAFT (§ 4).

## 4. Census

**Census**: `npx tsx <scratch>/census-routed.ts <repo>` (the instrument's decision function `routedPopulation` once over the profile tree, one line per dispositions row: `<rowId>\t<routed: label | not-routed>\t<signed|unsigned>\t<signer>`, sorted, then a count line; no added logic) over `canonical/profiles/**` + `canonical/operative-sets/**` + their canonical sources @ `2f98cc645` — current `b423eae8a38e781428581c72b334468084924ca9067db4e0655b8e3d42bbee29` → proposed `0f5c514495cb293accd3ac79a65196cf6c66f83be85a18d1b1cbd8e940573204`; **28 rows change** (routed 360 → 388; unsigned-routed 0 → **19**; signed-not-routed 16 → 7) (delta: § Census appendix).

Three things about this line the census reader must weigh. None is hidden:
- **SHA**: the rule asks for a `main` SHA. `routedPopulation` does not exist on `main` (`b42874bd0`); it lands with burst 1. I ran at the burst-1 branch head `2f98cc645`. `git diff --name-only b42874bd0 2f98cc645 -- canonical/profiles canonical/operative-sets canonical/agents canonical/shared .kiro/steering` is empty, so the corpus is `main`'s. Re-run at the first `main` SHA after burst 1 merges.
- **The `census` field**: no register row carries one yet. Per the README, "until the field exists, the item waits". Owed before this item leaves DRAFT: the census mode built as EXECUTION in the owner's scope (proposed: a `--census-routed` mode on `verify-signing-chain`, wrapping the harness above), and the field written on `signing-act-consistency`. Until then the command is the scratch harness, which is not a lawful census mode. It is the S6 shape the census ballot names (its § 9).
- **Scratch diff location**: the scratch diff touches `freshness.ts` (instrument code), not `triviality.ts`, where § 3 site 1 puts the predicate. The shipping PR must reproduce the proposed digest from the shipped code at its own base, with no carve-out (README, "Re-runs").

## 5. Cost

19 first signatures across seven seats (§ 3 site 6), each a rendered-hash computation and an itemized-free assent (`surviving: []`), plus their sheet sections. Stacy carries four and the delegate audit of them. The code is about a 10-line predicate plus its tests, a call-site change in the sweep and the real test, and an oracle re-freeze. Every later re-grounding of a frontmatter or members entry owes a signature that today it does not: entry-grain re-signs become routine work.

## 6. Counter-arguments (fold-back applied) and the residual

1. *"The rule does not reach the incident."* **Surviving.** The five acts sit on four body rows that CLEAR and one frontmatter `retained` row. Clause 5 routes none of them, and 7 signed-not-routed rows remain after it. The class fix closes the frontmatter and members half of the pattern (9 signed rows become lawful, 19 unsigned rows gain a gate). It does not close the body-CLEARS half: a seat that wants to record assent on a re-pointed body unit that clears still cannot, lawfully. Reaching those rows would mean routing every re-pointed body unit, which removes C18 clause 2, the mechanical shortcut (design § C18; Branch A of Spec 123's G1). That is a different ballot. I have not drafted it.
2. *"19 signatures nobody asked for."* Partly absorbed. They are the cost of one source of truth: today the 9 signed frontmatter rows are signatures the gate never required, the shape the incident is. Residual: the 19 are real work, and their assents are entailment-free (an entry has no items), so their value is "a human looked", not an itemized check.
3. *"The floor's meaning widens."* Absorbed by the clause's own text: C18's clause 3 already reads "anything else ROUTES". Clause 5 adds a grain the floor never had, and it never changes a body verdict. Residual: "the triviality floor" now also routes rows that have nothing to be trivial about. The name stays, and the meaning is broader than the name.
4. *"`classifyCharter` is the shared floor; a defect in it is invisible."* **Surviving** (Stacy's residual, carried). The sweep, the real test, the FU8 oracle and link 1 all follow the floor, so a defect in `routesEntry` reaches all four at once. The predicate is one line, which keeps that risk small. The common mode stays.

## 7. Forks for Peter

**F-1 — the body-CLEARS half (residual 1).** (a) Leave it: re-pointed body units that clear stay unsignable, and release rulings stop asking for such signatures. (b) A separate ballot that routes every re-pointed body unit, retiring C18 clause 2. My lean is (a), because (b) undoes Spec 123's G1 floor. The pick is Peter's.

Otherwise none. The rule is one clause, and the census delta is exactly the re-pointed frontmatter and members rows (28; 19 of them unsigned).

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

---

## Census appendix

**Scratch diff** (applies with `git apply` at `2f98cc645`):

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
