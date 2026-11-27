# Ballot Measure: restore the governance-examples `pending.json` header to its adoption baseline (entries 72 → 75), one item

**Date**: 2026-11-27 (drafted)
**Drafted by**: Lina, the author of the slip this ballot undoes (#846, `f523c510b`), and owner of the attribute and value predicate whose adoption the header records. Brief: the orchestrator, 2026-11-27, relaying Peter (2026-11-27): "Yes, brief Lina now, please".
**Authority to draft**: Peter, 2026-11-12T21:43:29Z, "Yes, all three are closed as settled", on the question whose item 2 reads: "#857 (4b): the examples count, 72 → 75. It is restored by a one-item ballot that Peter ratifies later (adoption § 2 clause 4)". Record: `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-857-856-settled.md` ("Still owed, and not answered by this: Peter's ratification of the one-item header ballot (72 → 75)"). Finding: RL-53, `.kiro/issues/2026-11-10-release-16.3.0-phase-1-findings.md` L19.
**Status**: **DRAFT**. This ballot has one item, **item 1** (§ 2). Peter's ratifying words name it, for example: *"Ratified, item 1 (the `pending.json` header, 72 → 75)"*. At ratification the record-first Status commit replaces this line with `**RATIFIED (Peter, <time, ISO 8601 UTC>)**, item 1: "<his words, verbatim>". Record: <path>.` Words that do not name item 1, or that name a different header text, do not ratify it.
**Required reviewer**: **Stacy**. The guard is an armed barrier (register row `governance-examples`), `pending.json` is in her ARMING instrument-path limb with its own read (adoption ballot § 3 site 1c), and she is the census reader.
**Consulted**: Thurgood — consult-163 R3 (2026-11-12), final: "Lina's separate one-item ballot, 'header 72 → 75', with Peter's words in its Status line. Decisive reason: a false baseline header should not wait on A-5's census and version bump. I execute it in my instrument."; Stacy — consult-163 R3, final: "Lina's separate one-item ballot. Decisive reason: both forms meet clause 4. A one-item ballot is the only one that A-5's census or version bump cannot delay."; Ada — none needed: the item moves no token-name count (token-name 56 is unchanged).
**Class**: a **clause-4 ballot**. Ballot `2026-10-26-governance-examples-guard-adoption` § 2 clause 4: "No PR adds an entry, changes an entry's `doc`, `half`, `string`, `occurrence` or `home`, or changes the `header`, unless it executes a ballot, RATIFIED at that PR's merge, that names the change." This ballot names one header change. It edits no governance path, adds no requirement and changes no rule; it is the authority clause 4 requires before the file's header may move.
**Retroactivity**: none. It does not ratify #846's header edit after the fact. It restores the text #846 changed without a ballot.

> **Conflict of interest, stated first.** I made the slip (#846 removed my three entries and also rewrote the header, which my clause-2(a) grant did not cover). I draft its undoing. The checks on me are Stacy's review and census read, Thurgood's execution in his instrument, and Peter's ratification.

---

## 1. The gap

The `pending.json` header records the **adoption baselines**, not a running count:
- the guard ballot § 2.4 sets the form and the rule: "the entry count is at most the adopted count";
- `check.ts`'s module header: "The pending header's `entries: <N>` and per-kind counts are the baselines of both adoptions";
- precedent: #578, #609 and #595 removed 66 of the 69 first-adoption entries and left `entries: 69` standing.

#846 (`f523c510b`, Lina, 2026-11-08) deleted three attribute-half entries under clause 2(a), and in the same diff rewrote the header from 75 to 72 (tag 3 → 1, attribute 1 → 0). No ballot named that change, so it breached clause 4 (RL-53, a breach of form; Stacy corrected her "weakening" wording at consult round 1, because the lower ceiling is stricter, not looser).

**What is false today.** The header says the attribute half was adopted with 1 tag hit and 0 attribute hits. It was adopted with 3 and 1 (`e0eaaf8ee`, #838). The RELEASE pass reads P against this baseline (guard ballot § 2.4, F-3), so the comparand is wrong, and the header now mixes a baseline (token-name 56, of which none remain) with running counts (tag 1, attribute 0).

**"72 → 75" is the total, not the whole change.** The header's per-half counts must sum to its total (the test asserts `sum(perHalf) == entries`). Restoring the total alone would fail that assertion. Item 1 therefore names the whole line.

## 2. The measure

### Item 1 — the header line, restored to its text at `e0eaaf8ee` (#838, the attribute half's build PR)

Site: `scripts/governance-examples/pending.json`, the value of `"header"`. No other field, and no entry, changes.

Before (at `origin/main` `3a3bd072b`, as #846 left it):

```text
adopted: bdbe72a32 2026-10-26; attribute half adopted: 5642cffe3 2026-11-09; entries: 72 (token-name 56, declared-path 9, shape 2, import 2, tag 1, attribute 0, value 0, css-self-reference 2)
```

After (byte-identical to the header at `e0eaaf8ee`, checked with a JSON parse of both):

```text
adopted: bdbe72a32 2026-10-26; attribute half adopted: 5642cffe3 2026-11-09; entries: 75 (token-name 56, declared-path 9, shape 2, import 2, tag 3, attribute 1, value 0, css-self-reference 2)
```

The three moved numbers: `entries` 72 → 75, `tag` 1 → 3, `attribute` 0 → 1. Every other byte is unchanged.

## 3. Application (after the Status commit)

1. **The Status commit** (record-first): Peter's words naming item 1, the ruling record, and the ballots README roll entry, on this ballot's branch.
2. **The application PR**, Thurgood's (he holds `pending.json` under adoption § 2 clause 1, in his standing scope):
   - the one-line diff in § 2, nothing else from this item;
   - its body names this ballot, says its Status reads RATIFIED, and gives the header before → after (the two texts above) and "entries added or re-keyed: none". That is what Stacy's site-1c read checks (adoption ballot § 3 site 1c: "unless the PR body names a ballot whose Status reads RATIFIED at `<m>` … and lists every entry added or re-keyed and the header before → after");
   - **`**Agent**:` line**: `Thurgood`. The item moves no entry, so no clause-2(a) owner is needed. If Thurgood carries it in the same PR as the A-5 v2 application, which deletes the two Shadow entries homed in a record whose `**Owners**:` field parses to Lina, that PR's line names both: `Thurgood, Lina`.
   - checks: `npm run test:scripts` (the guard's test, green before and after; § 6), `npm test`.
3. **Separable from A-5.** Item 1 applies alone and does not wait for the A-5 erratum (ballot `2026-11-27-governance-examples-guard-a5-token-boundary-erratum`, drafted separately) or its census. A-5 v2 leaves the header unchanged: it only narrows a rule, so it adds no entry, and the baseline stays the adoption count whichever lands first.
4. **ARMING**: Stacy's read at the application PR's merge (the `pending.json` read, site 1c).
5. **The finding**: RL-53 is closed as settled in Stacy's findings record; that record's owner notes the application PR there. This ballot does not edit it.

## 4. Recommendation, counter-argument (fold-back applied), residual

**I recommend item 1 as drafted.**

**The counter-argument.** This is a ratified ballot, a Status commit, a census and an ARMING read to move three digits back, and "72" is a true count of something. A header that records adoption, not the present, is one more number a reader has to know how to read.

**What fold-back changed.**
- I dropped my round-1 and round-3 coupling to the A-5 erratum. Inside A-5, the restore would wait on its census and version bump, and A-5 v2 changes no header. Thurgood and Stacy chose the separate ballot, and Peter closed RL-53 on "a one-item ballot".
- The item names the whole header line, not "72 → 75", because the sum assertion would fail on the total alone (§ 1).
- I did not propose admitting running counts. The report line already prints P, and a running header would delete the baseline the RELEASE pass reads (F-3).

**What survives.**
1. **The weight is real.** Undoing a one-string slip takes Peter's ratification, because clause 4 makes no exception for a restore. That cost is the price of a rule that holds the header against every unballoted edit, including well-meant ones like mine.
2. **The ceiling stays loose.** At P = 3 a ceiling of 72 or 75 detects almost nothing on its own. The header's work is the RELEASE comparand; the real barrier against a new entry is clause 4 and Stacy's site-1c read.
3. **The same slip can recur.** A fixing PR that deletes its entry may again "tidy" the header. The class option below would catch it at the required check, not at the ARMING read, which can run late (RL-62).

**Class option, not in this ballot**: pin the header in the guard's test (Stacy, consult-163 R1: "the test asserts the header still equals its text at the ratifying merge"; Thurgood R2: "The header pin in the test rides along"), and change the stale-entry line in `check.ts` (L1605) to "remove it; leave the header (adoption § 2 clause 4)". **Cost**: one assertion and one message string in Thurgood's instrument, and each later clause-4 ballot also moves the pin. It adds no requirement, since clause 4 already bars the edit, so it needs no ruling. It is Thurgood's call in his instrument, and he may carry it in the application PR. **Surviving counter**: an editor can still change the header and the pin in one diff; only the ARMING read sees that.

**Forks**: none. The alternative of admitting the running count (72) by ballot is not offered: every consulted seat rejected it, and it would break the RELEASE comparand.

## 5. What this ballot does not do

- It does not touch A-5, the two Shadow entries, or their `note` fields.
- It does not edit `scripts/governance-examples/check.ts`, its test, or any doc.
- It does not change clause 4, the header grammar (`check.ts` L1473), or the RELEASE read.

## 6. Census

The edit site, `scripts/governance-examples/pending.json`, is a file the guard's command loads, so the item is presumptively in scope (README § "Conventions", "Instrument census", condition 1).

- `**Census**: npx tsx scripts/governance-examples/check.ts --census over governance/*.md and the eight packaged steering docs @ 3a3bd072b — current 9392dc71b6159512887e53913266bbc5331243f8fd18791922794b127aace7ad → proposed 9392dc71b6159512887e53913266bbc5331243f8fd18791922794b127aace7ad; 0 docs change (delta: § Census appendix)`. The census mode reads no header count, so the digests are equal. The header's only reader is the test's baseline assertion. With the scratch diff applied, `scripts/governance-examples/__tests__/governance-examples.test.ts` passes, 55 of 55. The ceiling moves 72 → 75 in total, tag 1 → 3 and attribute 0 → 1, against 3 entries (tag 1, css-self-reference 2). Run in a throwaway detached worktree at `3a3bd072b`, after `npm run build` (the import surface reads the built types); nothing was committed there.
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — no edit site is under an input-closure root; scripts/governance-examples/ is not in canonical/generated.lock`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — no site adds, renames or removes a get_section or get_document_* citation`

## 7. Review round record

*(Reviews are entered here in the Spec-Feedback-Protocol stamp format.)*

---

## Census appendix

**Base**: `origin/main` `3a3bd072b2bef97bd1fbb80d8389cb81ff7788b0`, after `npm run build`.

**Scratch diff** (applies with `git apply` at the base; touches only the instrument's data file):

```diff
diff --git a/scripts/governance-examples/pending.json b/scripts/governance-examples/pending.json
index 30c27d036..215f29be2 100644
--- a/scripts/governance-examples/pending.json
+++ b/scripts/governance-examples/pending.json
@@ -1,5 +1,5 @@
 {
-  "header": "adopted: bdbe72a32 2026-10-26; attribute half adopted: 5642cffe3 2026-11-09; entries: 72 (token-name 56, declared-path 9, shape 2, import 2, tag 1, attribute 0, value 0, css-self-reference 2)",
+  "header": "adopted: bdbe72a32 2026-10-26; attribute half adopted: 5642cffe3 2026-11-09; entries: 75 (token-name 56, declared-path 9, shape 2, import 2, tag 3, attribute 1, value 0, css-self-reference 2)",
   "entries": [
     {
       "doc": ".kiro/steering/start-up-tasks.md",
```

**Delta**: none. `cmp` of the current and proposed `--census` outputs: identical (both sha256 `9392dc71b6159512887e53913266bbc5331243f8fd18791922794b127aace7ad`).
