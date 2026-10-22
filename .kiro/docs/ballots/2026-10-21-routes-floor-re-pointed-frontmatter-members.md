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
