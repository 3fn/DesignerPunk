# Ballot Measure: Completion-Claims Integrity — the Parent Success-Criteria Fidelity law

**Date**: 2026-09-19
**Spec**: 127 — Completion-Claims Integrity (`.kiro/specs/127-completion-claims-integrity/`)
**Drafted by**: Thurgood (Civitas steward) — compiling rulings already made; this ballot legislates nothing new
**Status**: **DRAFT — submitted for ratification at Task 1.4**
**Reviewer (verification)**: **Stacy — REQUIRED** (Req 12.1). Round record at § 14; not yet performed.
**Unit**: U1 (the law) — Peter-merged under the governance carve-out, record-first

<!-- RATIFICATION SLOT — written at Task 1.4 submission, per the record-first protocol
     (.kiro/docs/ballots/README.md § "The Ratification Protocol"). Two lines are written:

       1. This header's `Status:` becomes   **RATIFIED (Peter, <date>)**
       2. The machine line below is filled in, ALONE ON ITS OWN LINE, in this exact form:

              Ratified-machine: YYYY-MM-DD

     The machine line is the ONLY thing the checker parses (design C5/C11, B-2's fix).
     It never parses prose. Its form is fixed here beside the law's other fixed strings
     (§ 4). If this ballot is renamed, or the line is reworded, the checker goes LOUD RED
     (`cannot resolve ratification record at <path>`) — there is no vacuous-green state.

     If Peter's merge lands on a different date than the one recorded here, U2's first
     commit corrects this line as a record-accuracy erratum, Peter-merged with U2
     (tasks.md § Execution routes; Stacy A-7). The in-force date is the MERGE's date;
     the recorded date is a prediction reconciled at first divergence. -->

**Ratified-machine:** *(slot — not yet written; see the comment above for its exact final form)*

---

## 1. What this ballot records, and the sentence that frames it

This is **the Spec 127 law ballot** — the instrument the 2026-09-17 settle ballot named and deliberately did not become (`2026-09-17-spec-127-outline-settle.md` § 1, "What this ballot is NOT"; § 15's deferred table). It carries:

- the **Parent Success-Criteria Fidelity** law, in full text, across five governance surfaces;
- **five register rows** at `governance/classification-map.md`;
- the **before→after inventory** of every edit site, with real BEFORE text quoted from the live files;
- the **censuses**, as frozen commands with their actual outputs;
- the **M-baseline** as the pre-rule record, with its post-arming caveat;
- the **F7 disposition** and the ballots-README entry.

It does **not** arm anything. The `completion-criteria-parity` check is **built** by U2 and lands **non-required**; the required flip is Q2's, governed by its two pre-committed guards (settle ballot § 4), and is out of scope for 127's completion (Req 6.7).

**The framing obligation, carried at the top because a ratifier is the reader most at risk of the error** *(joint (d8); settle ballot § 17.1; Req 12.5 — verbatim)*:

> **Any future reading of these numbers that treats a green gate as evidence of claim honesty will have made the error this spec exists to prevent.**

Nothing in this measure makes claim honesty owned, solved, or guaranteed. Verification honesty is ideological by construction: once a barrier is armed its own metric is trivially 100% — a checked rule cannot show non-compliance — so **the informative metrics are exactly the ones no check owns.** That is recorded as law at § 7.7's `completion-verification-honesty` row, whose entire purpose is that no check owns it.

---

## 2. The rulings, compiled BY REFERENCE

Every substantive decision below was ruled before this ballot was drafted. **Nothing is restated where a § cite works.** Where a restatement and its source disagree, **the source governs**, in this order: the settle ballot → the co-signed Q5 documents (PRs #158/#165) → the settled outline's `RESOLVED` / `R2 FOLD` blocks (Peter, 2026-09-19) → the feedback record.

| # | Ruling | Source of record |
|---|---|---|
| R1 | The **full package** on F7 — exact-set verbatim criteria table + mandatory Evidence cell, forced-negative line, staged mechanization; prose and mechanical arm land together | settle ballot § 3 (carried in from Peter, 2026-09-13); riders (a)/(b)/(c) there |
| R2 | **Q2 — arming is a GUARDED DEFERRAL**; guard (i) = release-prep start (version-bump PR creation) + the checklist line; guard (ii) = convention shipped AND Tier-3 worked example fixed AND N ≥ 5 in-scope parents, **M2 by audit, not by the checker** | settle ballot § 4 |
| R3 | **In-flight specs — option (iii)**: the rule binds after ratification; the fixed-string exemption; **no sunset**, because the claims-pass machinery is the abuse detector; **the decoupling** — every spec closing after ratification owes a pass regardless of exemption status; the string's scope (only where a parent would otherwise owe the table) | settle ballot § 6 + § 17.2 item 2 |
| R4 | **`criteria-mode` — FORWARD-TOTAL WITH LEGACY DEFAULT**; post-ratification omission is **NON-COMPLIANT**; legacy keyed on **authorship date**, never on the declaration's absence; legacy is a closed set that only shrinks; "materially amended" deliberately left to the rule-text formalization | settle ballot § 7 + § 17.2 item 1 |
| R5 | **Rider (b) is CLAIM-KEYED**: any criterion whose promise spans multiple platforms — product **or** system — carries per-platform **status**; evidence-cells-only is insufficient; the rendering is the Q1 convention's call | settle ballot § 8 + § 17.2 item 5 |
| R6 | **Q5 ratified, full package** — the two charter cuts, the composed learning loop, the two finding routes, the steward-verb carve-out with both falsification conditions, both anti-rot clauses, the § 11.4 superset trigger table | settle ballot § 5, §§ 11.1–11.6, § 16 |
| R7 | **The release-step condition** — a named step that RUNS the owed-set query and PASTES its output; the promotion ladder with its **named de-facto detectors**; the second named line | settle ballot § 5.3 + § 4 |
| R8 | **Q1's eight decisions** — mode declaration format, block format, association, the (c′) verbatim-cell predicate, the promise surface, spanning-claim grain | `design-outline.md` § 8 `Q1 RESOLVED (Peter, 2026-09-19)` |
| R9 | **"Materially amended" = the canonical-form comparison** over a GENEROUS promise surface; the generous direction's rationale is normative and travels with the definition | `design-outline.md` § 8 `R2 FOLD` (B-R2-1) |
| R10 | **Q3's product-side shape** — the committed Implementation Report, claim-grain citation, the SHOULD spec-revision citation, the named revisit | `design-outline.md` § 8 `R2 FOLD` (Q3 block); Req 10 |
| R11 | **Q4's register pair** — `promised-artifact-exists` split out, delta-scoped, emitting exclusions; `promised-artifact-shipped` deferred, never per-PR | `design-outline.md` § 8 `Q4 RESOLVED`; settle ballot § 11.2 |
| R12 | **B-6 — option 1**: the fixed deferral form `Artifact deferred: <path> → <unit>` and the **written** CLOSEOUT walk-back duty | Peter, 2026-09-19; applied at Req 1.5 / 5.3 / 8.6 |
| R13 | **The flag-discipline standards learning** — a transcriber's confidence is an inverse signal; compilation-of-one's-own-record is a named flag surface. Adopted on the standards route | settle ballot § 17.3 |

**Two sentences in the requirements are marked as DERIVATIONS rather than quoted rulings, and they ratify here** (requirements.md § Traceability note):

- **Req 2.3.3** — *"Parents completed before the amendment stay as written; parents completing after are bound."* A consequence of rider (c) (no backfill) plus the opt-in mechanics, not quoted ruling text.
- **Req 8.7** — the pilot ↔ guard-(ii) composition: 127's hand-done CLOSEOUT parity is **M2-measured-by-audit on in-scope parents** and therefore counts toward guard (ii)'s N ≥ 5 evidence floor. The composition was verified (127's parents are in-scope parents completing under the convention); **the N is counted before it is relied on, never assumed** (the A-2 accounting question rides to the 5.Z sitting with the counted N).

Ratifying this ballot ratifies both derivations as stated.

---

## 3. Recorded interpretations and quoting instructions *(Req 12.4)*

Stated here so they read as rulings rather than as drift a later reader must reconstruct.

1. **Decomposed rows are a compliant rendering of ruling 5's status floor.** Ruling 5's clarified parenthetical named *columns* or the product-side *roll-up*; **rows were delegated to this phase** (settle ballot § 8: *"the exact rendering belongs to the Q1 convention at the requirements phase"*). The reading adopted: per-platform **rows**, grouped by criterion, satisfy "per-platform status is the requirement" — costlessly, because the match predicate is multiset equality (Req 2.5.2), so grouping is free. What ruling 5 forbids is unchanged and untouched: **per-platform evidence cells under a single undifferentiated status**.

2. **The 7:1 ratio is quoted ONLY as the promise-surface mechanism's discovery evidence** *(A-R2-8)*. `design-outline.md` § 1.4 measured that 7 of the 8 in-scope count-parity failures are 122 cutover parents reporting against the **merge gate** — which is how the promise-surface mismatch was *found*. It is **not** a projected false-positive rate for the shipped rule, because the shipped rule's input scope names the full promise surface (`**Success Criteria:**` + `**Primary Artifacts:**` + `**Merge gate:**`), which is precisely the fix for those 7. Anyone citing 7:1 as a forecast is citing the diagnosis as the prognosis.

3. **The per-row Method-line honesty clause is LOAD-BEARING for the product tier, and this ballot says so** (Req 8.3, Leonardo R2). Trust-the-reported-result is the *default state* of two-thirds of product parity claims — iOS and Android have no build verification anywhere in this environment (settle ballot § 5.4's charter exists because of it). A Method line that cannot say *"web verified / iOS not re-verified"* **per criterion row** turns a claims pass into the doc-vs-doc audit Stacy's own N6 called *"a worse outcome than no change."* The one negative string is closed vocabulary — `not re-verified — toolchain unavailable` — deliberately, because a re-verified row's Evidence cell already carries its own command and result, so only the negative case needs canonical wording.

4. **The 62-vs-66 colon-outside delta's recorded cause was wrong, and is corrected at source here.** It is **line-anchoring**, not occurrence-vs-line counting (Stacy A3, correcting her own prior confirmation). § 5.3 proves both halves by command: all four delta members are bullet-prefixed labels in one file, and occurrence counts equal matching-line counts in **every** file in the corpus.

5. **The corpus moved between the requirements phase and this ballot, and no number is inherited.** Every count below was computed on `task/127-u1-law` at `cd5a7b72` on 2026-09-19. Where a count differs from the requirements' recorded figure, the difference is **attributed to a named corpus change** in the census itself — never absorbed silently, never rounded to the familiar number.

---

## 4. The fixed strings, enumerated in one place

Every machine-readable string this law creates. Each is matched **verbatim**; each near-miss is a loud, named failure, never a silent pass.

| String / form | Where it is written | Failure on near-miss |
|---|---|---|
| `Criterion (verbatim) \| Status \| Evidence` | the criteria table's three mandatory columns | `SET_MISMATCH` / `EVIDENCE_NONCOMPLIANT` |
| `Unmet or partially met criteria:` | the forced-negative line, immediately after the table | `FORCED_NEGATIVE_MISSING` |
| `Primary Artifacts: all shipped as declared` | the AV section's artifact forced-negative line (or each deviation listed with its link) | `AV_MISSING_OR_MALFORMED` |
| `Artifact deferred: <path> → <unit>` | one line per deliberately deferred artifact, in the AV section. `->` accepted at parse; `→` is taught | `malformed deferral: not the fixed form 'Artifact deferred: <path> → <unit>'` |
| `Criteria fidelity: exempt — spec in flight at ratification (<date>)` | an in-flight parent that would otherwise owe the table | `non-compliant exemption: not the fixed string …` |
| `**Criteria mode**: per-parent` / `**Criteria mode**: spec-level` | a bolded header-block line in `tasks.md`, before the first task | `non-compliant tasks.md: authored post-ratification without a criteria-mode declaration` |
| `**Success Criteria:**` | the frozen criteria-block label in `tasks.md` (colon INSIDE the bold) | `declared per-parent, block not found for parent N` |
| `**Success Criteria:** none — <one-line reason>` | the declared-none state (reason mandatory) | `malformed criteria block: 'none' co-occurs with criteria (parent N)` |
| `## Declared Merge Units` | the canonical units-block heading in `tasks.md` | — (predicate-keying; the however-titled fallback covers legacy only) |
| `not re-verified — toolchain unavailable` | the one closed negative string in a claims pass's per-row, per-platform Method honesty | — (practice, not a gate) |
| `Standards implications: none / or list` | every claims pass, on its face | — (practice, not a gate) |
| `Ratified-machine: YYYY-MM-DD` | **alone on its own line** in this ballot, at its pinned path | **LOUD RED** — `cannot resolve ratification record at <path>` |

---

## 5. The censuses — frozen recipes, quoted with their actual outputs

**Discipline**: each census is a command block followed by the command's real output. No number below was inherited from an earlier document. All commands run on branch `task/127-u1-law` at `cd5a7b72`, 2026-09-19, from the repository root. Worktrees under `.claude/worktrees/` are outside every glob used here (`.kiro/specs/*/tasks.md`), so no exclusion flag is needed for them.

### 5.1 Corpus size — and the one change since the requirements phase

```bash
ls .kiro/specs/*/tasks.md | wc -l
```
```
154
```

```bash
ls .kiro/specs/*/tasks.md | grep '127'
```
```
.kiro/specs/127-completion-claims-integrity/tasks.md
```

**The corpus is 154, not the 153 recorded through the requirements and design phases.** The single added file is **127's own `tasks.md`**, committed on this branch at `cd5a7b72`. Every census below is reported on the live 154 **and**, where the delta is non-zero, attributed to that one file by re-running with it excluded. This is the § 3 item 5 discipline exercised on its first instance.

### 5.2 The format census

```bash
grep -rho '\*\*Success Criteria:\*\*' .kiro/specs/*/tasks.md | wc -l            # frozen, occurrences
grep -rho '\*\*Success Criteria\*\*:' .kiro/specs/*/tasks.md | wc -l            # colon-outside, UNANCHORED occurrences
grep -rcE '^[[:space:]]*\*\*Success Criteria\*\*:' .kiro/specs/*/tasks.md \
  | awk -F: '{s+=$2} END {print s}'                                              # colon-outside, ANCHORED lines
grep -rhE '^#{2,4} .*Success Criteria' .kiro/specs/*/tasks.md | wc -l            # heading form
grep -rl 'Success Criteria' .kiro/specs/*/tasks.md | wc -l                       # files carrying any form
```
```
793
66
62
17
151
```

**Attribution of the delta against the recorded 790 / 66 / 62 / 17 / 150:**

```bash
grep -c '\*\*Success Criteria:\*\*' .kiro/specs/127-completion-claims-integrity/tasks.md
grep -rho '\*\*Success Criteria:\*\*' $(ls .kiro/specs/*/tasks.md | grep -v '127-completion') | wc -l
grep -rl  'Success Criteria'        $(ls .kiro/specs/*/tasks.md | grep -v '127-completion') | wc -l
```
```
3
790
150
```

**Both deltas are 127's own file and nothing else**: its three parents carry three frozen labels (+3 occurrences, +1 file). Excluding it reproduces `790` and `150` exactly. The colon-outside, anchored and heading figures are unchanged at `66 / 62 / 17`.

### 5.3 The 62-vs-66 delta — the cause, proven both ways

**The four delta members, enumerated:**

```bash
grep -rnE '\*\*Success Criteria\*\*:' .kiro/specs/*/tasks.md \
  | grep -vE ':[0-9]+:[[:space:]]*\*\*Success Criteria\*\*:'
```
```
.kiro/specs/026-test-failure-resolution/tasks.md:44:  - **Success Criteria**:
.kiro/specs/026-test-failure-resolution/tasks.md:192:  - **Success Criteria**:
.kiro/specs/026-test-failure-resolution/tasks.md:257:  - **Success Criteria**:
.kiro/specs/026-test-failure-resolution/tasks.md:316:  - **Success Criteria**: Absolute zero failures, zero regressions
```

All four are **bullet-prefixed** (`  - **Success Criteria**:`), so a line-anchored regex — which tolerates leading whitespace but not a list marker — misses them. **Cause = line-anchoring. Confirmed.**

**The alternative cause is falsified, not merely doubted** — if any line carried two occurrences, occurrence-counting and line-counting would also diverge:

```bash
for f in .kiro/specs/*/tasks.md; do
  n=$(grep -o '\*\*Success Criteria\*\*:' "$f" | wc -l | tr -d ' ')
  l=$(grep -cE '\*\*Success Criteria\*\*:' "$f" | tr -d ' ')
  [ "$n" != "$l" ] && echo "MULTI-OCCURRENCE LINE: $f occ=$n lines=$l"
done; echo "(end)"
```
```
(end)
```

Zero files where occurrences ≠ matching lines. **Occurrence-vs-line counting contributes nothing to the delta.** The described-cause error class (Stacy A3) is closed at source.

### 5.4 The in-flight population — three recipes, reconciled with delta memberships

Each recipe asks the same question — *does this spec carry both ticked and unticked parent tasks?* — and differs only in how it recognizes a parent line.

```bash
for f in .kiro/specs/*/tasks.md; do s=$(basename $(dirname "$f"))
  a_x=$(grep -cE '^- \[x\] [0-9]' "$f");        a_o=$(grep -cE '^- \[ \] [0-9]' "$f")
  b_x=$(grep -cE '^- \[x\] (\*\*)?[0-9]' "$f"); b_o=$(grep -cE '^- \[ \] (\*\*)?[0-9]' "$f")
  c_x=$(grep -cE '^- \[x\] ' "$f");             c_o=$(grep -cE '^- \[ \] ' "$f")
  [ "$a_x" -gt 0 ] && [ "$a_o" -gt 0 ] && echo "$s" >> A.txt
  [ "$b_x" -gt 0 ] && [ "$b_o" -gt 0 ] && echo "$s" >> B.txt
  [ "$c_x" -gt 0 ] && [ "$c_o" -gt 0 ] && echo "$s" >> C.txt
done
wc -l A.txt B.txt C.txt
comm -13 <(sort A.txt) <(sort B.txt)   # B \ A
comm -13 <(sort B.txt) <(sort C.txt)   # C \ B
comm -13 <(sort A.txt) <(sort C.txt)   # C \ A
```
```
      36 A.txt
      37 B.txt
      39 C.txt

--- B minus A ---
125-A-pr-gate-mechanical-arming

--- C minus B ---
054a-figma-token-push
054b-figma-design-extract

--- C minus A ---
054a-figma-token-push
054b-figma-design-extract
125-A-pr-gate-mechanical-arming
```

| Recipe | Parent-line pattern | n | What it misses, relative to (C) |
|---|---|---|---|
| **(A) strict-numbered** — the outline § 6.2 recipe | `^- \[x\] [0-9]` | **36** | `{054a, 054b, 125-A}` |
| **(B) numbered-or-bold** — Stacy's R2 advisory recipe | `^- \[x\] (\*\*)?[0-9]` | **37** | `{054a, 054b}` |
| **(C) any top-level checkbox** — the amendment § 2.2 / **ballot-ruled** recipe | `^- \[x\] ` | **39** | — |

**Authority order, stated**: the **ruled pair is 36 → 39** (settle ballot § 6.1's own reconciliation, which supersedes the outline's 36 with the amendment's 39). Recipe (B) at **37** is Stacy's R2 **advisory** recipe and sits below the ruled pair (Stacy A2, corrected in the drafter's favour). All three are recorded because a recipe that drifts must not be able to change a number silently.

**Membership check against the ruled delta**: (A)'s miss set is exactly `{054a, 054b, 125-A}` — the settle ballot § 6.1's delta, member-for-member. `125-A` is missed by (A) because its parents are written `- [x] **1. Draft the workflow-law ballot**` (bold-numbered inside the checkbox); `054a`/`054b` are missed by both (A) and (B) because they carry unnumbered top-level checkboxes.

**127's own file is absent from all three sets** (no ticked parents yet):

```bash
grep -c '127' C.txt
```
```
0
```

**And the rule text is recipe-independent, deliberately** — it binds *any spec with both ticked and unticked parent tasks at ratification*. The census sizes the blast radius; it does not define the population (settle ballot § 6.1).

### 5.5 The zero-criteria trio

```bash
grep -rLi 'success criteria' .kiro/specs/*/tasks.md
```
```
.kiro/specs/054c-figma-token-push-fixes/tasks.md
.kiro/specs/125-A-pr-gate-mechanical-arming/tasks.md
.kiro/specs/icon-token-system/tasks.md
```

**Three specs define no success criteria at any grain** — `125-A` among them, exactly as ruling 3's clarification records. These are outside the rule entirely by rider (a): **no exemption string, no noise** — and they **still receive claims passes**, per the decoupling.

A second, finer cut is recorded because it is the one an author will actually need — **specs with no PER-PARENT criteria label**, separating the trio from the `spec-level` class:

```bash
for f in .kiro/specs/*/tasks.md; do
  grep -qE '\*\*Success Criteria:?\*\*:?' "$f" || \
    echo "$(basename $(dirname $f))  [heading-form hits: $(grep -cE '^#{2,4} .*Success Criteria' $f)]"
done
```
```
012-release-system-test-fixes  [heading-form hits: 1]
029-test-failure-audit  [heading-form hits: 1]
054c-figma-token-push-fixes  [heading-form hits: 0]
119-B-capability-routing-measurement  [heading-form hits: 1]
125-A-pr-gate-mechanical-arming  [heading-form hits: 0]
icon-token-system  [heading-form hits: 0]
```

Six specs carry no per-parent label. **Three of them (012, 029, 119-B) carry spec-level criteria under a heading** — the `spec-level` discharge class, which owes one closeout pass. **Three carry nothing at all** — the trio above.

### 5.6 The 9-file non-frozen-form enumeration — the materiality extraction's basis

These are the files where the materiality extractor's *generosity* is load-bearing: they carry criteria in a non-frozen form and **no `**Success Criteria:**` label at all**, so an extractor inheriting the checker's frozen grammar would see nothing to compare and would classify every criterion edit as immaterial — a silent-selection channel, `check_state: dormant` in prose form.

```bash
for f in .kiro/specs/*/tasks.md; do
  frozen=$(grep -c '\*\*Success Criteria:\*\*' "$f")
  nonfrozen=$(( $(grep -cE '\*\*Success Criteria\*\*:' "$f") \
              + $(grep -cE '^#{2,4} .*Success Criteria' "$f") ))
  [ "$frozen" -eq 0 ] && [ "$nonfrozen" -gt 0 ] && echo "$(basename $(dirname $f))"
done
```
```
012-release-system-test-fixes
026-test-failure-resolution
029-test-failure-audit
030-test-failure-fixes
036-steering-documentation-audit
037-component-token-generation-pipeline
040-component-alignment
068-family-guidance-indexer
119-B-capability-routing-measurement
```

**Nine files, exact membership match** against the R2 round's independently derived enumeration. Honest blast radius, recorded with it: the in-flight ∩ non-frozen intersection is **exactly one spec** — `068-family-guidance-indexer` — and legacy only shrinks. This is a hole in a definition that will be quoted as law, not a fire.

### 5.7 Materiality-extraction verification — per-pattern-class counts over all 154 `tasks.md`

**This is the U1 form of Req 2.3.4's one-time verification.** The generous pattern set is *closed and enumerated verbatim below*; each class appears as a quoted command with its match count over the whole corpus. No unrouted instrument is created: these are the frozen recipes themselves, run.

**U2's `--verify-extraction` mode later reproduces these counts programmatically, as a stated cross-implementation check** (Stacy BLOCKING-2's disposition). Its digest is reconciled against this table in U2's completion doc, **with every difference attributed to an enumerated corpus change in the U1→U2 interval — never to extraction behaviour** (Stacy BLOCKING-3).

```bash
# P1 — every top-level checkbox line, any parent form (checkbox state masked at compare time)
grep -rhE '^- \[[xX ]\] ' .kiro/specs/*/tasks.md | wc -l
# P2 — criteria label, frozen form
grep -rhoE '\*\*Success Criteria:\*\*' .kiro/specs/*/tasks.md | wc -l
# P3 — criteria label, colon-outside form
grep -rhoE '\*\*Success Criteria\*\*:' .kiro/specs/*/tasks.md | wc -l
# P4 — criteria label, heading form
grep -rhE '^#{2,4} .*Success Criteria' .kiro/specs/*/tasks.md | wc -l
# P5 — Primary Artifacts blocks
grep -rhoE '\*\*Primary Artifacts:\*\*' .kiro/specs/*/tasks.md | wc -l
# P6 — gate clauses, case-insensitive
grep -rhiE 'merge gate' .kiro/specs/*/tasks.md | wc -l
# P7 — units block, canonical heading (one base string; trailing parentheticals vary)
grep -rnE '^## Declared Merge Units' .kiro/specs/*/tasks.md
# P8 — units block, 122's bold-prose declaration form
grep -rniE '^\*\*Merge units \(' .kiro/specs/*/tasks.md
```
```
P1  1128
P2   793
P3    66
P4    17
P5   710
P6    17
P7  .kiro/specs/119-B-capability-routing-measurement/tasks.md:10:## Declared Merge Units (load-bearing — Task-Completion-Protocol: named up front, never judged at merge time)
    .kiro/specs/125-B-classification-map/tasks.md:18:## Declared Merge Units (Task-Completion-Protocol § Coherent Units — reviewed in this tasks round, never judged at merge time)
    .kiro/specs/127-completion-claims-integrity/tasks.md:13:## Declared Merge Units
P8  .kiro/specs/122-agent-generator/tasks.md:14:**Merge units (the merge-on-coherent-unit structure — 2026-07-07 ballot).** …
```

| Class | Pattern (verbatim) | Matches | Notes |
|---|---|---|---|
| **P1** | `^- \[[xX ]\] ` | **1128** | absorbs all three live parent forms **and** the `054a:523` falsifier (a top-level checkbox that is a criteria bullet — promise-surface text either way) |
| **P2** | `\*\*Success Criteria:\*\*` | **793** | the frozen label; 790 excluding 127's own three (§ 5.2) |
| **P3** | `\*\*Success Criteria\*\*:` | **66** | 8 files (§ 5.3) |
| **P4** | `^#{2,4} .*Success Criteria` | **17** | spec-level and legacy heading forms |
| **P5** | `\*\*Primary Artifacts:\*\*` | **710** | across **131** files (`grep -rlE … \| wc -l` → `131`) |
| **P6** | `merge gate` (case-insensitive) | **17** | **all 17 in one file** — `122-agent-generator/tasks.md` (`grep -rliE 'merge gate'` returns that path alone). This is the promise-surface mismatch's entire live population, and it is the § 3 item 2 measurement's other half |
| **P7** | `^## Declared Merge Units` | **3 files** | 119-B, 125-B, **and now 127** — the corpus moved from the recorded "2 of 153" by exactly this spec's own compliance, which is the self-application working |
| **P8** | `^\*\*Merge units \(` | **1 file** | `122-agent-generator/tasks.md:14` — the heading-less bold-prose declaration; the § T2-b drift instance the canonical form exists to prevent |

**Segments concatenate in document order; materiality is normalized-and-masked inequality of the extracted surface before vs after a commit.** No exclusion list exists or is needed: ticks, dates, annotations outside the surface, and reflowed lines are immaterial automatically. **Strike-through supersession of a parent IS material** — it removes a promise; the 118 pattern stays legal and costs one declaration line.

### 5.8 The register's live entry count

```bash
grep -cE '^### ' governance/classification-map.md
grep -nE '^### ' governance/classification-map.md | grep -i 'illustrative'
```
```
23
113:### Illustrative Example (documentation, NOT a register entry)
```

**23 `###` headings, of which one is the Illustrative Example section heading — a documentation heading, not an entry. 22 live entries as of 2026-09-19.** The count is enumerated live and inherited from nothing: the register grew six rows during 125-B wave work after the outline recorded 16 (Stacy B-1), and it will grow again.

### 5.9 The non-substring sweep — all live + proposed ids, both directions

The register's hard constraint (§ "Addressing and Citation"): entry-ids are unique **and no entry-id may be a substring of another**, because sweep-1 resolves `§ "heading"` citations by verbatim substring match — a violation mis-resolves silently and still reports green.

```bash
LIVE=$(grep -E '^### ' governance/classification-map.md | sed 's/^### //' | grep -v 'Illustrative Example')
PROPOSED="completion-criteria-parity promised-artifact-exists promised-artifact-shipped \
completion-verification-honesty parent-completion-docs-present"
ALL="$LIVE $PROPOSED"; hits=0
for a in $ALL; do for b in $ALL; do
  [ "$a" != "$b" ] && case "$b" in *"$a"*) echo "COLLISION: '$a' is a substring of '$b'"; hits=$((hits+1));; esac
done; done
echo "relations found: $hits"
```
```
live count: 22
relations found: 0
```

**27 ids (22 live + 5 proposed), 702 ordered pairs, zero substring relations in either direction.** Re-run mechanically at Task 1.3 against the register as it stands at that moment; the recorded output there is the one the completion doc cites.

### 5.10 The M-baseline population recipe re-derives exactly

```bash
git log --diff-filter=A --since=2026-07-01 --name-only --pretty=format: \
  -- '.kiro/specs/**/completion/**' \
  | grep -E '/task-[0-9]+(-parent)?-completion\.md$' | sort -u | wc -l
```
```
41
```

```bash
… | sed 's|.kiro/specs/||;s|/completion/.*||' | sort | uniq -c | sort -rn
```
```
  18 122-agent-generator
  10 119-B-capability-routing-measurement
   8 125-A-pr-gate-mechanical-arming
   4 125-B-classification-map
   1 126-avatar-decorative-warn
```

In-scope = 122 (18) + 125-B (4) = **22**. Out of scope by the ruling's own rider = 119-B (10, spec-level) + 125-A (8, zero criteria) + 126 (1, issue-driven, no `tasks.md`) = **19**.

```bash
IN=$(… | grep -E '122-agent-generator|125-B-classification-map')
echo "$IN" | wc -l                                                # 22
echo "$IN" | xargs grep -li 'success criteria' | wc -l            # M1 numerator
echo "$IN" | xargs grep -Li 'success criteria'                    # the 7 without
echo "$IN" | xargs grep -lE '⚠️|❌|Partial|not met' | wc -l        # M5 numerator
```
```
in-scope n: 22
M1 (any criteria section): 15
--- the 7 without ---
task-1-parent-completion.md
task-2-parent-completion.md
task-3-parent-completion.md
task-4-parent-completion.md
task-5-parent-completion.md
task-6-parent-completion.md
task-8-parent-completion.md
M5 (any warn/fail marker): 0
corpus-wide M5 over all 41: 2
corpus-wide M1 over all 41: 16
```

**The baseline reproduces exactly, three months on**: 41 / 22 / 19; M1 = 15/22 in-scope and 16/41 corpus-wide; the seven docs without a criteria section are 122 parents 1–6 and 8, which is precisely how 22 − 7 = 15 arises; M5 = 0/22 in-scope, 2/41 corpus-wide (both out of scope). **The recipe is frozen and re-runnable at each health check.**

---

## 6. The M-baseline, with its recipes and its post-arming caveat *(Req 12.7)*

The pre-rule record. **These are the numbers the law is measured against, and they are the last honest reading of M2 that will ever exist.**

| Metric | In-scope baseline (22 parents, added since 2026-07-01) | Recipe |
|---|---|---|
| **M1** — criteria section present | **15 / 22 (68%)** | § 5.10's population recipe, then `xargs grep -li 'success criteria'` |
| **M2** — parity with `tasks.md` | **count-parity 7 / 15 (47%)**; **true verbatim parity plausibly ~0 / 15** | per-doc row-count vs the parent's `tasks.md` bullet count. Parity at 122 p7/p9/p17 and 125-B p1–p4; **7 MORE-ROWS** (122 p10–p16 — the merge-gate class) and **1 FEWER-ROWS** (122 p18, the ABSORB case). **Both caveats cut against comfort**: count-parity is an **upper bound** on verbatim parity, and the single true positive is a *merge*, not a concealment — no bad news was hidden in it |
| **M3** — every row carries a non-empty Evidence cell | **~0**; "Evidence" appears anywhere in **5 / 15** docs (and "Verification" in 4) | `grep -li 'evidence'` over the M1-positive set |
| **M4** — forced-negative line present | **0 / 22** | `grep -lF 'Unmet or partially met criteria:'` — see § 8's BEFORE sweep: zero hits outside 127's own spec documents |
| **M5** — any ⚠️/❌/Partial marker | **0 / 22** in-scope (2 / 41 corpus-wide, both out of scope) | § 5.10's last two commands |

**M4 = 0/22 is a template defect, not an adoption failure.** The Tier-3 standard states its requirement as *"Confirmation that overall goals are met"* and offers no ⚠️/❌ vocabulary anywhere outside the Blocked Task format. Agents did not decline to write "unmet" — **the template gave them nowhere to write it.** That is why § 7.2 fixes the template and not only the rule.

**The post-arming caveat, carried intact:**

> Once this barrier is armed, **M2 reads 100% by construction and measures nothing** — a checked rule cannot show non-compliance. **M3 and M4 and the honesty dimension are the informative metrics, and no check owns them.** They are audit output (the claims pass) forever, by design, not by omission.

**And the (d8) sentence applies to this table specifically** — it is reproduced at § 1 because a ratifier deciding how to vote may never reach a measurement subsection, and the reader who mistakes the barrier for a guarantee is standing at the ballot.

---

## 7. The before→after inventory

**Nine edit sites, matching design C11's list exactly.** Every BEFORE block below was read from the live file on this branch at `cd5a7b72`. Per the ballots-README edit discipline: **apply exactly as written; if a BEFORE text does not match, STOP on that block and report — never adapt silently.**

A **drafter's judgment call inside ruled scope** is marked 🔸 wherever it occurs, following the settle ballot's edit-site-2 precedent, so a reviewer can strike it without unpicking the ruled substance.

### 7.1 `governance/completion-documentation-guide.md` — the new § "Parent Success-Criteria Fidelity" *(Req 1; design C8.1)*

#### 7.1a — the section itself

**BEFORE** (lines 80–86, verbatim):

````markdown
```
get_section({ path: "process-spec-planning", heading: "Three-Tier Completion Documentation System" })
```

---

## Naming Conventions
````

**AFTER** — the same anchor, with the new section inserted between the `---` and `## Naming Conventions`:

````markdown
```
get_section({ path: "process-spec-planning", heading: "Three-Tier Completion Documentation System" })
```

---

## Parent Success-Criteria Fidelity

**In force from the ratification date recorded in `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md`.** Parents completed before that date are not bound — there is no backfill. A parent in a spec that was in flight at ratification may carry the fixed-string exemption below.

### The rule

A parent task's completion doc SHALL reproduce **every** success criterion defined for that parent in `tasks.md` — **verbatim, in full: none dropped, none reworded, none added** (an exact set) — as a table with three mandatory columns:

| Criterion (verbatim) | Status | Evidence |
|---|---|---|

The rule binds parents in specs whose `tasks.md` declares `**Criteria mode**: per-parent`. A `spec-level` spec discharges once, at closeout, through the claims pass. A parent MAY declare `**Success Criteria:** none — <one-line reason>`, which waives **the criteria table only** — the Additional verification section below remains owed wherever it applies.

### Status vocabulary

- **✅ verified met**
- **⚠️ verified unmet or partial** — a ⚠️ row **MUST link a tracking issue or follow-up task**
- **❌ verified absent** — the "3.3 pattern": a tested module was created, and the seam it was meant to reach was never touched

Each mark SHALL reflect a check **actually performed against shipped source, never against intent or effort**. **A ✅ with an empty or prose-only Evidence cell is non-compliant on its face.**

### The Evidence cell — exactly four kinds

Every row carries evidence of one of four kinds. Nothing else qualifies.

1. **An artifact path** — `src/tokens/color/primitives/chromatic.ts`; `.kiro/specs/<spec>/reports/implementation-ios.md#navigation-stack`
2. **A test name** — `SemanticColorContrast.test.ts › success.text meets AA on canvas`; a jest suite or describe name
3. **A command + its result** — `npx tsc --noEmit → 0 errors`; `npm run check:drift → drift: none (3 platforms)`
4. **A decision record / approval citation** — which **MUST cite a locatable record**. The kinds that qualify span both tiers deliberately: a **ballot path with a section** (`.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md § 8`); a **dated approval note**; a **commit SHA**; a **PR review comment** (*"Approved in PR #123 review comment, 2026-09-15"*); a **design-critique note**; a **dated design-outline decision** (`design-outline.md § 8 Q1 RESOLVED (Peter, 2026-09-19)`). "Approved by Leonardo" with nothing to open is not a decision record.

### How a cell is compared — the four normalization rules

The `Criterion (verbatim)` cell is compared to its `tasks.md` bullet after exactly four normalizations, applied in order:

- **(i)** table-pipe escapes are unescaped — `\|` → `|`
- **(ii)** `<br>` and `<br/>` tags become a single space
- **(iii)** runs of Unicode whitespace collapse to a single space, and both ends are trimmed. **Rule (iii)'s scope is bounded, not exemplified**: it covers characters carrying the Unicode `White_Space` property — space, tab, line breaks, no-break space (U+00A0), thin space (U+2009), narrow no-break space (U+202F), and the rest of that property's set — **plus zero-width space (U+200B), zero-width non-joiner (U+200C), zero-width joiner (U+200D) and BOM (U+FEFF), which are stripped.** Those are the invisible copy-paste artifacts that arrive from Figma and spreadsheets: the same non-authorial class as a line wrap.
- **(iv)** **nothing else.** No case folding. No punctuation or markdown normalization. **Bold, backticks, arrows, math glyphs and platform phrasing reproduce exactly.**

Set comparison is **multiset equality, order-insensitive**: reordering is not a mutation class, and two identical bullets cannot collapse into one row.

**This list is closed-but-extendable by recorded amendment only.** If an exotic rendering artifact produces a false red, that is a loud, author-fixable failure — and if the artifact is genuinely non-authorial, the remedy is **an amendment to this list, with a record**, never a silent widening. A quietly growing normalization list is how verbatim comparison rots into fuzzy matching. Compressed criterion labels failing is the **intended** adoption cost: compression relocates to the Evidence cell, where this rule already demands content.

### The forced-negative line

Immediately after the table, the doc SHALL carry:

```
Unmet or partially met criteria: None
```

— or a list, **each item carrying a follow-up link**. **Silence does not satisfy it.** (The shape is imported from the Product-Handoff-Protocol's four `None / or list each` forced-negative sections; the line itself is new here.)

### Additional verification — required if applicable, never optional

WHEN the parent's `tasks.md` block defines promise blocks beyond Success Criteria — the closed vocabulary being `**Primary Artifacts:**` and gate clauses under the frozen label `**Merge gate:**` — THEN the completion doc SHALL carry an **"Additional verification"** section containing:

- **Gate conditions as criterion-style rows** — `Condition (verbatim) | Status | Evidence` — **evaluated under the same predicate as the criteria table**: verbatim cells, multiset equality against the `**Merge gate:**` bullets, a Status mark and an Evidence cell on every row. **Shape alone is not parity.**
- **Primary Artifacts as a single forced-negative line**: `Primary Artifacts: all shipped as declared` — or each deviation listed with its link.
- **A deliberate later-unit delivery, declared in the FIXED machine-readable form**, one line per deferred artifact:

  ```
  Artifact deferred: <path> → <unit>
  ```

  Path and delivering unit are extractable by rule. **A free-prose deferral is non-compliant** and earns no exclusion anywhere. (`->` is accepted at parse; `→` is the taught spelling.)

**The criteria table admits ONLY criteria.** Gate conditions and artifacts live in this section — never as extra rows in the criteria table.

A declared-none parent still owes this section wherever it applies: **declaring no criteria waives the table, never the Additional verification duties.**

### The in-flight exemption — one fixed string, no sunset

A parent that would otherwise owe the table, in a spec that was in flight at ratification, MAY carry, verbatim:

```
Criteria fidelity: exempt — spec in flight at ratification (<date>)
```

**Free-prose exemptions are non-compliant.** A freely-phrased exemption is an unfalsifiable claim — the failure mode this rule exists to close, wearing a different hat.

The string is required **only where a parent would otherwise owe the table**. A spec that defines no per-parent criteria is outside the rule entirely: no string, no noise.

**There is no sunset clause**, and the ground of that decline binds: the tightening was declined because **the claims-pass machinery is the abuse detector** — so **fixed-string exemption usage is a named counting duty of every claims pass**. And an exemption from the table format is **never** an exemption from being audited: every spec closing after ratification owes a claims pass regardless of exemption status.

### Why exact-set — the six mutation classes

The rule is exact-set because self-authored verification tables fail in six named ways. Five were measured in one spec's completion docs; the sixth was found in the same corpus.

| Class | What it looks like |
|---|---|
| **drop** | an unmet criterion is simply absent from the table |
| **reword** | *"all semantic pairs **pass** AA"* becomes *"**evaluated** against AA"*, marked ✅ |
| **relax** | a ratified threshold (`ΔE₀₀ < 1`) is restated at the value that happens to pass (`< 3`) |
| **omit-doc** | the required completion or summary doc is never written, so no table exists to police |
| **invent** | a criterion appears in the table that `tasks.md` never defined |
| **absorb** | two criteria are merged into one row — **harm stated accurately: the enumerated set stops mapping 1:1 to the promise set**, so a per-criterion verdict can no longer be read off the table even when nothing is hidden |

### Two authoring notes

1. **Copy the `tasks.md` bullet; never retranscribe it.** Retyping is where math-glyph and punctuation drift is produced, and normalization friction will concentrate there.
2. **The decomposition-scope boundary.** Success Criteria bullets decompose per-platform (the convention is in Process-Spec-Planning § "`tasks.md` Structural Conventions"). A `**Primary Artifacts:**` line that bundles platforms does **not** decompose — it has its own remedy in the Additional verification section's forced-negative line.

### Authoring guidance — what each platform bullet verifies against

*(Guidance, not a compliance condition. A missing reference is a quality observation at a claims pass; it is never a rule violation, and no check reads for it.)*

Each per-platform criterion bullet reads best when it names **what it verifies against** — on the product side, the screen spec, or the component contract / token / pattern it delegates to; illustratively on the system side, the registry, a formula, or platform-specific reference documentation. These are examples, not an exhaustive or ruled list. The same question is asked at the tasks feedback round by the verifiability lens.

### The instrument's honest reach

A verifier who inherits an over-claimed instrument inherits the author's blind spot, so the limits are stated where the rule is taught:

- **An Evidence cell containing a plausible-looking path is green to the checker regardless of whether the claim is true.** Format compliance is not truth.
- **For iOS and Android, "command + result" Evidence is trust-the-reported-result for any verifier in this environment** — nothing in this repository compiles generated Swift or Kotlin. The gap is chartered at `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`; until it closes, the honest form of an unverifiable platform row is `not re-verified — toolchain unavailable`, and such a row is **never rolled into a ✅**.
- **Artifact truth — did the promised artifact actually ship — is owned by the claims pass today**, as judgment. Its registered mechanical successor is `promised-artifact-exists` (`governance/classification-map.md § "promised-artifact-exists"`), which is **proposed and unbuilt**; until it is built and reading, the pass owns promised-artifact gaps.

> **Any future reading of these numbers that treats a green gate as evidence of claim honesty will have made the error this spec exists to prevent.**

---

## Naming Conventions
````

#### 7.1b 🔸 — frontmatter `description` *(drafter's judgment inside ruled scope)*

This doc is MCP-served, and its `description` is what discovery reads. A new section absent from the description is a section an author searching *"success criteria"* will not find — the same missed-edit-site class as the canonical example that omits a new field (the settle ballot's edit-site-2 reasoning).

**BEFORE** (line 5):
```yaml
description: Comprehensive completion and summary documentation guide — two-document workflow, documentation tiers, naming conventions, document templates, and cross-references. Load when creating completion docs, writing summary docs, or completing parent tasks.
```
**AFTER**:
```yaml
description: Comprehensive completion and summary documentation guide — two-document workflow, documentation tiers, parent success-criteria fidelity (the verbatim criteria table, Evidence cell, forced-negative line and Additional verification section), naming conventions, document templates, and cross-references. Load when creating completion docs, writing summary docs, or completing parent tasks.
```

#### 7.1c 🔸 — the guide's own parent-task checklist *(drafter's judgment inside ruled scope)*

The prune-scar constraint binds the **Task-Completion-Protocol** (Req 4.2) because TCP is a pointer surface. This guide is the rule's **home**, so a checklist item here is the checklist naming its own document's rule, not a restated imperative block elsewhere. Strike if read otherwise.

**BEFORE** (lines 331–336):
```markdown
### For Parent Tasks

- [ ] Complete all subtasks first
- [ ] Run validation (`npm test` or `npm run test:all`)
- [ ] Create detailed completion doc: `.kiro/specs/[spec-name]/completion/task-N-completion.md`
- [ ] Create summary doc: `docs/specs/[spec-name]/task-N-summary.md`
```
**AFTER**:
```markdown
### For Parent Tasks

- [ ] Complete all subtasks first
- [ ] Run validation (`npm test` or `npm run test:all`)
- [ ] Create detailed completion doc: `.kiro/specs/[spec-name]/completion/task-N-completion.md`
- [ ] Reproduce every `tasks.md` success criterion verbatim with Status + Evidence, carry the forced-negative line, and add the Additional verification section if the parent declares `**Primary Artifacts:**` or `**Merge gate:**` (§ "Parent Success-Criteria Fidelity")
- [ ] Create summary doc: `docs/specs/[spec-name]/task-N-summary.md`
```

#### 7.1d — `Last Reviewed`

**BEFORE** (line 11): `**Last Reviewed**: 2026-07-05`
**AFTER**: `**Last Reviewed**: <ratification date>`

---

### 7.2 `governance/Process-Spec-Planning.md` — Tier 3 + the worked example *(Req 3; design C8.2)*

#### 7.2a — the Tier-3 standard's Success Criteria Verification requirement

**BEFORE** (lines 1816–1822, verbatim):

```markdown
**Additional Sections (Beyond Architecture Tier 3)**:

1. **Success Criteria Verification**
   - Each success criterion listed separately
   - Evidence provided for each criterion
   - Specific examples or test results
   - Confirmation that overall goals are met
```

**AFTER**:

```markdown
**Additional Sections (Beyond Architecture Tier 3)**:

1. **Success Criteria Verification** — **the table form is the required shape**
   - **Required**: a three-column table reproducing **every** `tasks.md` success criterion for this parent, verbatim and in full — `Criterion (verbatim) | Status | Evidence` — none dropped, none reworded, none added
   - **Required**: a Status mark on every row, from the closed vocabulary **✅ verified met · ⚠️ verified unmet or partial (MUST link a tracking issue or follow-up task) · ❌ verified absent**. Each mark reflects a check performed **against shipped source, never against intent or effort**
   - **Required**: an Evidence cell on every row, of one of four kinds — an artifact path · a test name · a command + its result · a locatable decision record or approval citation. **A ✅ with an empty or prose-only Evidence cell is non-compliant on its face**
   - **Required**: immediately after the table, the forced-negative line `Unmet or partially met criteria: None` — or a list, each item with a follow-up link. **Silence does not satisfy it**
   - **Required if applicable**: an **Additional verification** section when the parent declares `**Primary Artifacts:**` or `**Merge gate:**` — gate conditions as criterion-style rows under the same predicate, the artifact forced-negative line, and any deferral in the fixed form `Artifact deferred: <path> → <unit>`
   - **Optional**: prose elaboration per criterion (the Evidence / Verification / Example block below). It **supplements** the table and never replaces it
   - Full rule, including the normalization rules, the mutation classes and the in-flight exemption: **Completion Documentation Guide § "Parent Success-Criteria Fidelity"**

   *Recorded rationale, travelling with this edit:* the prior form of this item asked for *"confirmation that overall goals are met"* and supplied no failure vocabulary anywhere outside the Blocked Task format. Measured consequence: **0 of 22** in-scope parent completion docs added since 2026-07-01 carried any ⚠️/❌/forced-negative content. That is a **template defect, not an adoption failure** — the template gave authors nowhere to write "unmet". The failure vocabulary is now part of the required structure.
```

#### 7.2b — the Additional Template Sections block

**BEFORE** (lines 1835–1853, verbatim — note line 1844 `**Verification**: ` carries **one trailing space**, which the applier must match or strip deliberately):

````markdown
**Additional Template Sections**:

```markdown
## Success Criteria Verification

### Criterion 1: [Success criterion text]

**Evidence**: [Specific evidence that this criterion is met]

**Verification**: 
- [Specific test or check 1]
- [Specific test or check 2]
- [Specific test or check 3]

**Example**: [Concrete example demonstrating this criterion is met]

### Criterion 2: [Success criterion text]

[Same structure as Criterion 1]
````

**AFTER**:

````markdown
**Additional Template Sections**:

```markdown
## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| [criterion 1, copied verbatim from tasks.md — never retyped] | ✅ | [artifact path / test name / command + result / locatable decision record] |
| [criterion 2, copied verbatim from tasks.md] | ⚠️ | [what was verified] — follow-up: [link to a tracking issue or task] |
| [criterion 3 — web] | ✅ | [evidence] |
| [criterion 3 — iOS] | ✅ | [evidence] |
| [criterion 3 — Android] | ⚠️ | [evidence] — `not re-verified — toolchain unavailable`; follow-up: [link] |

Unmet or partially met criteria: None
<!-- or: a list, each item carrying a follow-up link. Silence does not satisfy this line. -->

### Additional verification
<!-- Required if the parent declares **Primary Artifacts:** or **Merge gate:**; omit otherwise. -->

| Condition (verbatim) | Status | Evidence |
|---|---|---|
| [merge-gate condition, copied verbatim from tasks.md] | ✅ | [evidence] |

Primary Artifacts: all shipped as declared
<!-- or: each deviation listed with its link -->

Artifact deferred: <path> → <unit>
<!-- one line per deliberately deferred artifact; free prose here is non-compliant -->

### [Optional] Criterion elaboration

<!-- Prose per criterion MAY follow the table. It supplements the table; it never replaces it. -->

**[Criterion text]** — **Evidence**: [detail] · **Verification**: [checks run] · **Example**: [concrete demonstration]
```
````

#### 7.2c — THE WORKED EXAMPLE (the named edit site — Req 3.3)

**BEFORE** (lines 2011–2056, verbatim — the `## Success Criteria Verification` block inside the "Example - Parent Task Completion" fenced document):

```markdown
## Success Criteria Verification

### Criterion 1: Build system foundation established

**Evidence**: BuildOrchestrator successfully coordinates token selection, platform-specific generation, and file writing in a single orchestrate() call.

**Verification**:
- Created complete directory structure for build system
- Implemented TokenSelector with priority logic
- Implemented BuildOrchestrator with coordination logic
- All components integrate correctly

**Example**: 
```typescript
const orchestrator = new BuildOrchestrator(
  primitiveRegistry,
  semanticRegistry,
  platformGenerators
);
const result = orchestrator.orchestrate('web');
// Successfully generates web platform files
```

### Criterion 2: Platform-specific generation working

**Evidence**: Build system can generate files for web, iOS, and Android platforms with correct platform-specific formatting.

**Verification**:
- Platform generator interface defined
- Structure in place for platform-specific generators
- Orchestrator delegates to appropriate generator based on platform
- Generated files follow platform conventions

**Example**: Web generates CSS, iOS generates Swift, Android generates Kotlin - all from same token source.

### Criterion 3: Error handling comprehensive

**Evidence**: All error scenarios tested and handled with appropriate recovery strategies.

**Verification**:
- Token not found errors provide clear messages
- File write failures trigger rollback
- Invalid platform specifications caught early
- All error paths tested

**Example**: When a token reference is invalid, error message indicates which registries were checked and suggests valid alternatives.
```

**Why this must be replaced, not amended** (Req 3.3): every "Evidence" value above is **activity prose** — *"Created complete directory structure"*, *"Implemented TokenSelector"*, *"Structure in place"*. These describe what was done, not what was verified. This is the canonical exemplar every author copies; it models effort-as-evidence, and **shipping the standard's text while leaving this block unchanged fails Requirement 3 regardless of the standard's own wording.**

**AFTER**:

```markdown
## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| `npm run build` regenerates all three platform outputs with zero drift | ✅ | `npm run build && npm run check:drift` → `drift: none (3 platforms)` |
| The generator rejects a token whose family hue is absent from the registry | ⚠️ | `TokenFileGenerator.test.ts › rejects unregistered family hue` passes; the CLI surface still exits 0 (`npx designerpunk generate --token bad.hue` → exit 0). Follow-up: `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md` |
| Generated CSS values match the registry (`token-index/primitives.yaml`) | ✅ | `TokenIndexParity.test.ts › css` → 217/217 match |
| Generated Swift values match the registry (`token-index/primitives.yaml`) | ✅ | `TokenIndexParity.test.ts › swift` → 217/217 match |
| Generated Kotlin values match the registry (`token-index/primitives.yaml`) | ⚠️ | `TokenIndexParity.test.ts › kotlin` → 217/217 match; `not re-verified — toolchain unavailable` (no Kotlin compile runs in this environment). Follow-up: `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` |

Unmet or partially met criteria: "The generator rejects a token whose family hue is absent from the registry" (`.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md`); "Generated Kotlin values match the registry (`token-index/primitives.yaml`)" (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`)

### Additional verification

| Condition (verbatim) | Status | Evidence |
|---|---|---|
| `npm test` green with the three parity suites in the functional lane | ✅ | `npm test` → 371 suites / 9042 tests / 0 failures |

Primary Artifacts: all shipped as declared, except as deferred below

Artifact deferred: docs/token-generation-guide.md → U3 (the documentation unit)
```

**What this example teaches, deliberately, in one artifact** (DD5 — the maximal-over-minimal choice: an unshown form is an untaught form):

- **the table** — three columns, verbatim criteria, a Status mark and an Evidence cell on every row;
- **the ⚠️ with a follow-up link** — twice, from two different causes (a partially-met criterion, and an unverifiable platform);
- **decomposition, grouped by criterion** — the registry claim is authored in `tasks.md` as three per-platform bullets, and the triple sits **adjacent**, not split by platform. A single ✅ structurally cannot hide the Kotlin row;
- **the reference limb** — each platform bullet names what it verifies against (`token-index/primitives.yaml`), as authoring guidance rather than a compliance condition;
- **the Method-honesty string** — `not re-verified — toolchain unavailable`, in its real context, pointing at the real charter;
- **the AV section** — a gate-condition row under the same predicate, the artifact forced-negative line, and one `Artifact deferred:` declaration in the fixed form;
- **the forced-negative line listing both ⚠️ rows** — the line is a list, not a ritual "None";
- **and, negatively: not one Evidence cell contains activity prose.** Every cell is a command + result, a test name, or a path.

**One neutrality line accompanies the example, and belongs in the document**: *the shape applies equally to a component's cross-platform parity parent and a product screen's — the example is generic system content, deliberately. Product-tier specifics (the committed Implementation Report, claim-grain citation) live in the Product-Handoff-Protocol, which is their home.*

---

### 7.3 `governance/Process-Spec-Planning.md` — the new § "`tasks.md` Structural Conventions" *(Req 9; design C8.3)*

**Placement**: inside § "Tasks Document Format", after `### Key Principles` and before `### Task Format Examples` — so an author reading the format standard meets the conventions before the examples that embody them.

**BEFORE** (lines 440–447, verbatim):

```markdown
**Contract Traceability:**
- Every platform implementation subtask in a component spec must include `_Contracts:` lines listing the contracts that subtask satisfies
- Format: `_Contracts: interaction_focusable, interaction_pressable, state_loading_`
- This maps implementation work to behavioral guarantees, enabling review and audit

### Task Format Examples

#### Example 1: Parent Task with Mixed Subtask Types
```

**AFTER** — the same anchor, with the new section inserted between them:

````markdown
**Contract Traceability:**
- Every platform implementation subtask in a component spec must include `_Contracts:` lines listing the contracts that subtask satisfies
- Format: `_Contracts: interaction_focusable, interaction_pressable, state_loading_`
- This maps implementation work to behavioral guarantees, enabling review and audit

### `tasks.md` Structural Conventions

Four predicates key on `tasks.md` structure — CLOSEOUT, MIDPOINT, the `completion-criteria-parity` checker, and the materiality extractor. **They key on structure, never on phrasing**, because a title-keyed predicate fails on the spec that most needs it: of the three specs that declared merge units before this convention, only two used a heading, and the third — the corpus's largest multi-unit spec — declared its eleven units in a bold-prose paragraph with no heading at all.

These conventions are **forward-binding**. No dormant spec is reopened to adopt them.

#### The criteria-mode declaration

Every `tasks.md` **authored or materially amended after ratification** SHALL declare its mode as a bolded header-block line before the first task, in house metadata style:

```markdown
**Criteria mode**: per-parent
```
```markdown
**Criteria mode**: spec-level
```

**No third state exists.** A post-ratification `tasks.md` that omits the declaration is **NON-COMPLIANT** — it is never legacy.

**Legacy status is keyed on AUTHORSHIP DATE, never on the declaration's absence.** Legacy is a closed set that only shrinks: adding the declaration is how an in-flight spec opts in, and no dormant spec is reopened to add one. `spec-level` specs are skipped by the checker and owe one discharge at closeout.

#### The criteria block

The frozen form is a label line reading exactly `**Success Criteria:**` — colon **inside** the bold, any leading indentation — followed by a **flat** bullet list. **One bullet = one criterion = one table row**; no nested sub-bullets. Wrapped and continuation lines fold under the normalization rules.

**Association**: a criteria block associates to the **nearest preceding checkbox line at any indent**; only blocks whose associated line is a **top-level parent** own parent criteria. Two blocks on one parent, or a block preceding every checkbox, is a loud malformation.

**The declared-none state**: a parent MAY declare

```markdown
**Success Criteria:** none — <one-line reason>
```

The reason is mandatory. A block carrying `none` **and** criteria bullets is a loud malformation. Declared-none waives **the criteria table only** — the completion doc's Additional verification duties remain owed where applicable, and claims passes count declared-none rates.

#### Spanning claims — the structural limb, as law

**A promise that spans multiple platforms SHALL be authored as per-platform criterion bullets.** This is a rule about **grain, not content**: three bullets where three platforms apply, one bullet where one does.

Exact-set reproduction then delivers per-platform status automatically — no tag grammar, no sub-row grammar, no per-platform checker logic — and **a single ✅ structurally cannot hide a broken platform.** Decomposed rows group **by criterion** (the platform triple adjacent), which is costless because the match predicate is multiset equality.

**The fallback, named and amendment-gated**: a genuinely non-decomposable claim admits the explicit tag form `(platforms: …)` **by recorded amendment only** — never as an author's convenience. **Counting note**: every `(platforms: …)` invocation is counted by the claims pass, so the fallback's real usage rate is visible rather than assumed. No real instance existed anywhere in the corpus when this convention was written.

#### The Declared Merge Units block — the canonical form

A spec that declares merge units SHALL declare them under this heading, as this table:

```markdown
## Declared Merge Units

| Unit | Parents | Gating parent | Midpoint carrier (specs ≥ 3 units) |
|---|---|---|---|
| **U1 — <name>** | Task 1 | Task 1 | — |
| **U2 — <name>** | Tasks 2–3 | Task 3 | **U2 (this unit's merge carries the midpoint claims pass)** |
| **U3 — <name>** | Task 4 | Task 4 | — |
```

**FOR specs declaring ≥ 3 merge units, the block SHALL name the midpoint-carrier unit** — fixed at the tasks round, **never judged at merge time**.

**The MIDPOINT record's path is `completion/claims-pass-midpoint.md` — never `completion/claims-pass.md`.** The closeout owed-set predicate keys on `completion/claims-pass.md` *exactly*, so a midpoint record written at that path would silently discharge the spec's closeout obligation. The distinct filename resolves the collision without touching the ruled predicate.

#### "Materially amended" — the canonical-form comparison

Ruling 4 binds files *authored **or materially amended** post-ratification*. The definition is mechanical:

**A commit materially amends a `tasks.md` IFF the file's normalized promise surface differs before and after.**

The **promise surface** is extracted with a deliberately **GENEROUS** pattern set, which never inherits the checker's frozen grammar. The set is **closed** and enumerated here:

| # | Class | Pattern |
|---|---|---|
| 1 | every top-level checkbox line, any parent form | `^- \[[xX ]\] ` (checkbox state masked to one token) |
| 2 | criteria label — frozen | `**Success Criteria:**` |
| 3 | criteria label — colon-outside | `**Success Criteria**:` |
| 4 | criteria label — heading | `^#{2,4} .*Success Criteria` |
| 5 | primary-artifact blocks | `**Primary Artifacts:**` with their bullet bodies |
| 6 | gate clauses | `merge gate`, case-insensitive, with their bullet bodies |
| 7 | units block — canonical | `^## Declared Merge Units` (one base string; trailing parentheticals vary) |
| 8 | units block — legacy bold-prose | `^**Merge units (` |

Extracted segments concatenate in document order and are compared after the same four normalization rules the criteria cells use, plus the checkbox mask: **one normalization concept, plus one named mask.** **No exclusion list exists or is needed** — ticks, dates, annotations outside the surface and reformatting are immaterial automatically. **Strike-through supersession of a parent IS material**: it removes a promise.

**The generous direction's rationale is normative and travels with the definition**: a false-material costs one declaration line; a false-immaterial reopens the exit door this rule exists to shut. Over-inclusion is the safe direction, and it is only safe while the set stays **closed and enumerated**.

**Material amendment is a SECOND opt-in path**: it exits legacy, never adds to it, and **the amending commit SHALL add the criteria-mode declaration in the same change**. Parents completed before the amendment stay as written; parents completing after are bound.

**The computing instrument, named with the same honesty as everything else here**: the parity checker evaluates materiality on any PR touching a legacy `tasks.md` — **once it is armed.** Until arming, **the claims pass owns materiality as judgment.** Until "materially amended" has bitten mechanically even once, *adding the declaration* is the unambiguous opt-in path and should be preferred.

#### Authoring guidance — flag discipline

Two standards learnings, recorded because they were each paid for twice:

- **A transcriber's confidence is an INVERSE signal.** Flag discipline pointed only at material you know you are relaying will systematically miss the material you believe you already know.
- **Compilation of one's own record is a named flag surface.** The highest-magnitude compression found in the 2026-09-17 settle record landed in the one section its drafter was compiling from documents he had co-signed — under a standard he had himself set, and did not apply to himself. The self-audit could not catch it because the self-audit was not pointed there. A second live instance (a misattribution caught at the same spec's R2 round) confirmed the pattern rather than the exception.

The practical instruction: **when compiling your own prior work into a normative document, treat it as a transcription surface and flag it as one.**

### Task Format Examples

#### Example 1: Parent Task with Mixed Subtask Types
````

---

### 7.4 `.kiro/steering/Task-Completion-Protocol.md` — the pointer, in BOTH parent sequences *(Req 4; design C8.4)*

**Pointer only. Never a restated imperative block** — the prune-scar constraint is non-negotiable. Direct-edit file, no regeneration, not MCP-served, no reindex.

**Edit 1 — § "For PARENT TASKS (Implementation or Architecture type)", line 46.**

BEFORE:
```markdown
3. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-completion.md` (on the task branch)
```
AFTER:
```markdown
3. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-completion.md` (on the task branch) — reproduce every tasks.md success-criterion row verbatim with Status + Evidence, and carry the forced-negative line (Completion Documentation Guide § 'Parent Success-Criteria Fidelity').
```

**Edit 2 — § "For PARENT TASKS (Setup or Documentation type)", line 56.** The BEFORE text is **byte-identical** to Edit 1's, and the AFTER is byte-identical to Edit 1's. Both must be applied; applying one is the failure mode the "both parent sequences" wording exists to prevent.

*Applier's note*: the two lines are identical, so a naive single-occurrence replace will silently edit only the first. Use an occurrence-indexed or global replacement, and **verify the post-edit count is exactly 2** (§ 8's sweep does this).

---

### 7.5 `.kiro/hooks/RELEASE-FLOW.md` — the named step in "Deriving the delta" *(Req 11; design C8.5)*

**BEFORE** (lines 22–31, verbatim):

```markdown
## Deriving the delta (the judgment half — added 2026-08-12, Q6 ballot; proven by the v14.0.0 release)

Before step 1 below, the release author derives-classifies-ratifies:

1. **Derive**: `git log $(git describe --tags --abbrev=0)..main --oneline` (all changes — squash titles are the changelog spine) and the same log scoped to the SHIPPED surface — **authoritative list: `package.json` `files[]`** (`src/` alone misses served-content roots like `governance/`; v14's docs-corpus entry lived there). Issue-driven work appears ONLY here — never assume spec summaries cover the delta.
2. **Classify** each change 🔴 breaking / 🟡 minor / 🔵 patch-internal, reading task summaries or PR bodies for substance.
3. **Peter ratifies the bump**; notes are hand-authored at `docs/releases/release-X.Y.Z.md` (v14.0.0 = format precedent) and ride the release PR below.
4. Publish mechanics: the dual-registry playbook (public npm needs Peter's login/2FA; expect the ~30-day token expiry — an E404 on publish is a masked auth failure).
```

**AFTER** — steps 1–4 unchanged; a new **step 5** and its subsection are appended before the retired-CLI note at line 31:

````markdown
## Deriving the delta (the judgment half — added 2026-08-12, Q6 ballot; proven by the v14.0.0 release)

Before step 1 below, the release author derives-classifies-ratifies:

1. **Derive**: `git log $(git describe --tags --abbrev=0)..main --oneline` (all changes — squash titles are the changelog spine) and the same log scoped to the SHIPPED surface — **authoritative list: `package.json` `files[]`** (`src/` alone misses served-content roots like `governance/`; v14's docs-corpus entry lived there). Issue-driven work appears ONLY here — never assume spec summaries cover the delta.
2. **Classify** each change 🔴 breaking / 🟡 minor / 🔵 patch-internal, reading task summaries or PR bodies for substance.
3. **Peter ratifies the bump**; notes are hand-authored at `docs/releases/release-X.Y.Z.md` (v14.0.0 = format precedent) and ride the release PR below.
4. Publish mechanics: the dual-registry playbook (public npm needs Peter's login/2FA; expect the ~30-day token expiry — an E404 on publish is a masked auth failure).
5. **Claims-pass owed set + the arming question** — see the named step below. **Both lines produce artifacts, not reminders.**

### Step 5 — run the owed-set query, paste its output, and confront the arming question

Release is where both of this repository's consumer-reaching completion-claim escapes crossed. Two named lines run here, at release-prep start.

#### 5a — RUN the owed-set query and PASTE its output into release-notes prep

**The predicate**, verbatim:

> **`closeout-owed(S)`** ⟺ S's final declared unit has merged **AND** `.kiro/specs/S/completion/claims-pass.md` does not exist **AND** that merge is dated on or after the ratification date recorded in `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md`.

**The pipeline** — four stages, run as documented commands (not a committed script):

1. **Enumerate and classify.** List every spec with **post-ratification merge activity**, and classify each into exactly one of three classes:
   - **(a) declared units**, in any recognized form (canonical `## Declared Merge Units` heading; the legacy bold-prose declaration; or a heading containing "merge unit", tried in that precedence order) → CLOSEOUT anchors on the **final declared unit**;
   - **(b) no units block, a single PR** → that PR **is** the spec's only unit. *(This is the corpus's most common shape; a stage that drops it produces a healthy-looking short list, which is the failure this enumeration exists to make impossible.)*
   - **(c) no units block, more than one PR** → the anchor is the PR carrying the **last parent completion doc**.
2. **Resolve the anchor**: the final anchor's merge state and merge date.
3. **Test the record**: `test -f .kiro/specs/<S>/completion/claims-pass.md`.
4. **Emit the owed set PLUS the ENUMERATED exclusion counts, by name**:
   `N closed; M(a) / M(b) / M(c) per class; K excluded as pre-ratification`

   **Named classes, so a wrong answer is a falsifiable count rather than a healthy-looking short list.**

**An empty set is pasted as an empty result.** The step produces a record either way — that is the whole point of running a query instead of recalling an obligation.

*Note on the MIDPOINT record*: a spec declaring ≥ 3 units carries its midpoint pass at `completion/claims-pass-midpoint.md`. The predicate above keys on `claims-pass.md` **exactly**, so a midpoint record never discharges a closeout obligation.

#### 5b — *"if arming is undecided, decide it now"*

**Release-prep start — concretely, the creation of the version-bump PR — is the event anchor for the `completion-criteria-parity` arming decision.** If that decision is still open when this step runs, **it is decided here**, not deferred past a release. Deciding **not** to arm is a lawful outcome: the evidence guard forbids arming before the convention has shipped, the Tier-3 worked example is fixed, and **N ≥ 5** in-scope parents have completed under the convention with parity **measured by audit, not by the checker**. What is not lawful is shipping a release with the question unexamined.

#### The staged-mechanization ladder, and its named de-facto detectors

The owed-set pipeline is **documented commands, not a committed script**, deliberately. Its promotion path is pre-committed and is the only path:

**documented pipeline → (second wrong result) committed script + scoped grant → (the Q2 re-evaluation sitting) publish-hook decision.**

**The de-facto detectors are named**: a wrong owed-set result **noticed in ordinary use** counts toward promotion, and the two ordinary-use surfaces are **(1) the LIVENESS read at the monthly Civitas health check** and **(2) this release step**. No detection project is created and no new obligation is added — the two places the query is already run are the two places a wrong answer is already visible. *Recorded honestly: this is detection-by-use, not detection-by-guard. It cannot catch an omission that neither reader recognizes. It converts an unfireable trigger into a fireable one; it does not make the pipeline self-checking.*

**Successor release tooling inherits this step as a REQUIREMENT, not as a convention it may re-derive.** Any future release tooling that replaces this document carries step 5 forward in both halves — the run-and-paste owed-set query and the arming line. **There is to be no parallel second mechanism**: the ladder above is the only path from documented pipeline to automation.

*(The automated analyze/notes/release CLI was retired 2026-08-12 — ballot `2026-08-12-q6-release-manager-retirement.md`; tag + GitHub release are manual: `git tag -a vX.Y.Z && git push origin vX.Y.Z && gh release create vX.Y.Z --notes-file docs/releases/release-X.Y.Z.md`.)*
````

---

### 7.6 `governance/Product-Handoff-Protocol.md` § Tier 2 — the committed-report convention *(Req 10; design C8.6)*

**BEFORE** (lines 64–71, verbatim — the section header through the `Template:` line; the template block itself is unchanged):

```markdown
### Tier 2: Implementation Reports

**Frequency**: Once per screen or flow completion
**Direction**: Platform → Leo
**Format**: Structured, captured for reference
**Expectation**: Delivered when implementation is complete, before moving to next work

Template:
```

**AFTER** — the header block gains the convention; the template that follows is untouched:

```markdown
### Tier 2: Implementation Reports

**Frequency**: Once per screen or flow completion
**Direction**: Platform → Leo
**Format**: Structured, **committed**, captured for reference
**Expectation**: Delivered when implementation is complete, before moving to next work

#### The committed-report convention

**The Implementation Report is committed at `.kiro/specs/<spec>/reports/implementation-<platform>.md`**, on that platform parent's own unit branch, as part of that parent's completion — **traversing the same PR gate as the work it reports.** A report that exists only as a relayed message is not citable, and product-tier Evidence cells must cite something a later reader can open.

**Claim-grain citation.** A product-tier Evidence citation SHALL resolve to **a specific claim inside the report** — a section anchor, or the test or command the report records — **never the report as a whole**. `implementation-ios.md` is not evidence; `implementation-ios.md#navigation-stack` is.

**Spec-revision citation (SHOULD).** A citation SHOULD name **the screen-spec revision it was verified against** — a SHA or a dated revision. *This is a stated reading, not a silent one*: SHOULD is the ruled strength of the advisory that proposed it, the reference-drift mitigation is adopted **now at SHOULD strength AND re-examined at the revisit below**, and SHALL would have been an unruled gain. The reading is on the record precisely so no later reader has to infer whether the softer strength was a decision or an omission.

**Fourth-evidence-kind records.** This convention also homes **visual-direction sign-offs** — cross-platform design-review notes and design-critique records — at no extra cost: committed at the same path family, citable at claim grain, and therefore usable as the fourth Evidence kind (a locatable decision record / approval citation) in a completion doc.

#### NAMED REVISIT — at the first product spec's tasks round

This convention is adopted on system-side evidence and a product-side prediction. **The prediction is revisited, on the record, at the first product spec's tasks round**, against three questions carried verbatim:

> **(i)** is 3× row multiplication livable at the real criterion count — **measured, not estimated**;
> **(ii)** did the committed-report substrate hold — **locatable, claim-grain, consistently authored across three platform agents**;
> **(iii)** did platform-set evolution or reference drift force a shape change.

Two answers are fixed in advance so the revisit measures the open questions rather than re-litigating the settled ones:

- **Product specs are `**Criteria mode**: per-parent`.**
- **A later-added platform is a NEW PARITY PARENT** — not an amendment to a completed parent's criteria set.

**Question (ii) is read to include path collision on a future multi-screen spec**: `reports/implementation-<platform>.md` is unique per spec, not per screen, so a spec covering several screens will need either a screen segment in the filename or a section-per-screen discipline. That is folded into the revisit's net deliberately, rather than pre-designed here on zero instances.

Template:
```

---

### 7.7 `governance/classification-map.md` — five new entries *(Req 5; design C10)*

**Placement**: appended to § "Entries", after `### package-name-scope-drift`, in the order below. House shape follows the register's own precedent (`### <entry-id>` heading + one fenced YAML block + dated, attributed `history`). Ids verified against the non-substring constraint at § 5.9: **zero relations, both directions, across all 27 ids.**

**The YAML is authored here; it is applied at Task 1.3, and the non-substring sweep is re-run live at that moment.**

#### `completion-criteria-parity`

```yaml
rule: "A parent completion doc SHALL reproduce every success criterion its tasks.md defines for that parent — verbatim, exact set, with a Status mark and a non-empty Evidence cell per row, the forced-negative line, and the Additional verification section where the parent declares Primary Artifacts or a merge gate"
boundary_call:
  class: functional
  rationale: "String-equality of a completion-doc cell against a tasks.md bullet after four fixed normalizations is mechanical by construction — no judgment enters the predicate. The dimensions that DO require judgment (is the ✅ true, is the evidence real) are deliberately a different row: completion-verification-honesty"
verification:
  disposition: barrier
  owner: thurgood
  check_state: proposed
  checks: ["completion-criteria-parity (.github/workflows/completion-criteria-parity.yml -> npm run check:completion-criteria-parity; context name FIXED at authoring; built by Spec 127 U2 and introduced NON-REQUIRED)"]
education:
  disposition: "AUTHOR, do not prune — this rule has no prose predecessor to prune; it has a prose DEFECT to repair. Three surfaces are authored in the same change as this row: completion-documentation-guide § 'Parent Success-Criteria Fidelity' (the full rule, its normalization list, the mutation classes, the honest-reach statement); Process-Spec-Planning Tier 3 + the replacement worked example (the measured template defect — M4 = 0/22 because the standard offered no failure vocabulary outside the Blocked Task format); Task-Completion-Protocol's two parent sequences (POINTER ONLY, per the Wave-1 prune-scar constraint). RE-ASSESS at the first claims pass after arming: if the check keeps biting, the docs may be teaching the wrong thing — that is the return edge, and it runs on the EDUCATION route."
history:
  - { date: <ratification date>, change: "entry created at the Spec 127 law ballot (.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md). check_state: proposed — the checker is BUILT by U2 and lands NON-REQUIRED; the required flip is Q2's decision, guarded by (i) release-prep start and (ii) convention shipped AND Tier-3 worked example fixed AND N >= 5 in-scope parents completed with M2 measured BY AUDIT, not by the checker. owner: thurgood resolves friction (a) on the register's own schema ground — `owner` fuses decision and check, and for an armed barrier the decision IS the check, so the field records who keeps the instrument true (settle ballot § 11.3). The uncheckable residual attaches to completion-verification-honesty (owner: stacy), the row whose entire purpose is that no check owns it", by: thurgood }
  - { date: <ratification date>, change: "GATE-BITE OUTSTANDING, recorded at row creation rather than after the fact: Req 6.4 requires the check be proven RED on a throwaway PR with a deliberately defective completion doc before any required flip. That proof does not exist at this row's creation and is NOT claimed. It rides with the arming — proven at the flip, cited on this row in the same recorded change that adds the context to verify-gate-registration.sh's EXPECTED_CONTEXTS (count-assert included). Until then this row asserts a proposed check with no bite proof, stated as such", by: thurgood }
```

#### `promised-artifact-exists`

```yaml
rule: "Every path a parent declares under **Primary Artifacts:** SHALL exist at the merge of the PR that ticks that parent — or be declared deferred in the fixed form `Artifact deferred: <path> -> <unit>`"
boundary_call:
  class: functional
  rationale: "Path existence at a named commit is a filesystem fact. The check's whole design keeps it factual: it is delta-scoped to the ticking PR, it strips annotation suffixes by rule, and every case it cannot decide is EMITTED rather than silently skipped"
verification:
  disposition: barrier
  owner: stacy           # RULED option (B) — Peter, 2026-09-19. Flips to `thurgood` at build time; see history
  check_state: proposed
  checks: []
education:
  disposition: "AUTHOR the input-side convention, which ships with this row's law: the fixed deferral form `Artifact deferred: <path> -> <unit>` is taught in completion-documentation-guide § 'Parent Success-Criteria Fidelity' (Additional verification), and the authoring note that a Primary-Artifacts line bundling platforms does NOT decompose (it has its own remedy in the artifact forced-negative line) is taught beside it. Nothing is pruned — the promised-artifact dimension had no prose predecessor at all, which is why it escaped twice to consumers."
history:
  - { date: <ratification date>, change: "entry created at the Spec 127 law ballot. SCOPE, as ruled: DELTA-SCOPED — fires on the PR that ticks the parent, against that parent's declared paths only; later file moves are repository evolution, not claims. Parsing strips annotation suffixes and EMITS its exclusions (`skipped — not a path`) rather than silently skipping; an AV-declared deferral in the fixed form is an EMITTED EXCLUSION, not a red (mechanically decidable because the form is fixed — B-6 ruled option 1). VERDICT PHRASING IS NORMATIVE: 'task text and reality disagree', never 'work was not done'. NAMED READER for the emissions: the CLOSEOUT claims pass reads this check's emission lines for the closing spec — once the check is built; UNTIL THEN THE PASS OWNS PROMISED-ARTIFACT GAPS AS JUDGMENT. The PR summary line carries the exclusion count", by: thurgood }
  - { date: <ratification date>, change: "OWNER RULED AT THIS BALLOT — Peter, 2026-09-19, option (B), and the openness is recorded as openness: this row was split out of the settle ballot's three-row enumeration, so its owner was genuinely open rather than silently defaulted. The drafter surfaced a fork rather than picking one, being a named party to the cut. RULED: `owner: stacy` NOW — the honest record of the present. The row is `proposed` and unbuilt; the dimension is held today by Stacy's claims pass as judgment (Req 5.3's interim clause), and both sibling rows created in this same ballot carry `owner: stacy` while unbuilt. PRE-COMMITTED TRANSITION, decided now so it is a transition and not a later argument: WHEN the check is built and wired, the owner flips to `thurgood` in ONE row edit with its own dated history entry, on the instrument-owner ground § 11.3 established for the parity row (`owner` fuses decision and check; for an armed barrier the decision IS the check, so the field records who keeps the instrument true). THE FLIP IS REPRESENTATIONAL, NOT CLASSIFICATORY — no disposition, boundary call, check_state or education disposition changes with it, and a later reader must not read the handover as a reclassification. RECORDED ALTERNATIVE (option A, argued by the drafter and not taken): assign `thurgood` from creation, on the ground that the row's destination is a mechanical PR-gate instrument; its stated residual was that this records a FUTURE state on a row that is proposed today, naming an owner of an instrument that does not exist while the real holder appears only in prose", by: thurgood }
```

#### `promised-artifact-shipped`

```yaml
rule: "An artifact a task text annotates as `(modified)` SHALL appear in that task's shipped diff — the Spec 112 task-3.3 signature, where a tested utility is created and the seam it was meant to modify is never touched"
boundary_call:
  class: functional
  rationale: "Diff membership is mechanical. The reason this row is deferred is not classification doubt — it is that the check's natural firing grain is wrong at PR time, which is a scheduling property, not a boundary one"
verification:
  disposition: barrier
  owner: stacy
  check_state: proposed
  checks: []
education:
  disposition: "NOTHING AUTHORED, NOTHING PRUNED at this ballot — the row is registered so the dimension is visible as unowned-by-machinery rather than invisible. The teaching this dimension needs already lands on completion-criteria-parity's surfaces (the AV section's artifact forced-negative line and the fixed deferral form). RE-ASSESS if the dry run promotes the row to built."
history:
  - { date: <ratification date>, change: "entry created at the Spec 127 law ballot; build DEFERRED. MUST NOT FIRE PER-PR (ruled): a later unit can legitimately deliver a prior unit's promised artifact, so a per-PR grain would red-light lawful sequencing. Its events are CLOSEOUT and RELEASE — never the PR gate. owner: stacy, ratified at settle ballot § 11.2 and confirmed in her § 16.2 duty table. PROMOTION EVIDENCE, recorded honestly: a retrospective DRY RUN over merged history — a PROCEDURE, NOT A FIRING TRIGGER. That distinction is acceptable only because nothing here is armed; if this row ever moves toward `armed`, the dry run must be replaced by a real trigger with a real event, and this note is the reason why", by: thurgood }
```

#### `completion-verification-honesty`

```yaml
rule: "A completion claim SHALL be true — the ✅ reflects a check actually performed against shipped source, and the Evidence cell points at something real"
boundary_call:
  class: ideological
  rationale: "Whether a mark is HONEST is not decidable from any artifact a check can read. A false ✅ with a plausible path is green to every mechanical predicate that exists or could exist here; the dimension is held by practice, culture and audit, or it is not held at all. CARRIED VERBATIM, AS RULED (Req 5.5): Any future reading of these numbers that treats a green gate as evidence of claim honesty will have made the error this spec exists to prevent."
verification:
  disposition: none
  owner: stacy
  check_state: none
  checks: []
education:
  disposition: "AUTHOR the honest-reach statement, and never author anything that implies mechanization. completion-documentation-guide § 'Parent Success-Criteria Fidelity' carries the instrument's limits explicitly: a plausible-looking Evidence path is green regardless of truth; for iOS and Android 'command + result' evidence is trust-the-reported-result for any verifier in this environment (charter: .kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md); artifact truth is owned by the claims pass today. PRUNE NOTHING and ADD NO CHECK — ever. M3 (evidence quality), M4 (forced-negative adoption) and M5 (failure markers) are AUDIT output, produced by claims passes, and no check owns them."
history:
  - { date: <ratification date>, change: "entry created at the Spec 127 law ballot. NO CHECK OWNS THIS ROW — EVER; that is the row's purpose, not a gap in it. The rationale is carried verbatim, as ruled: 'Any future reading of these numbers that treats a green gate as evidence of claim honesty will have made the error this spec exists to prevent.' Recorded with it, because a barrier's own metric is trivially 100% once armed: M2 measures nothing after arming, and the informative metrics are exactly the ones no check owns", by: thurgood }
```

#### `parent-completion-docs-present`

```yaml
rule: "Every ticked parent task SHALL have a completion doc and a summary doc — the Spec 112 F6 class, where four required documents were simply never written"
boundary_call:
  class: functional
  rationale: "File existence at a path family is mechanical. It is registered `proposed` rather than built because its naive form has a KNOWN false-positive class, stated below — and a check that red-lights lawful behaviour on day one is how a barrier earns distrust in its first week"
verification:
  disposition: barrier
  owner: stacy
  check_state: proposed
  checks: []
education:
  disposition: "KEEP the existing teaching, which is already correct and already single-homed: completion-documentation-guide § 'When to Create Each Document' (subtask = detailed doc; parent = detailed doc AND summary doc) and Task-Completion-Protocol's two parent sequences. NOTHING NEW IS AUTHORED for this row — the docs say the right thing; what is missing is a detector, not a lesson."
history:
  - { date: <ratification date>, change: "entry created at the Spec 127 law ballot; build and arming DEFERRED. owner: stacy WHILE UNBUILT/IDEOLOGICAL (settle ballot § 11.2's conditional, carried at strength) — the doc-presence dimension is claims-pass judgment until a check exists to own it. KNOWN FALSE-POSITIVE CLASS, stated at creation rather than discovered at arming: completion docs land AT PARENT COMPLETION, which under the coherent-unit rule can be BEFORE the unit's PR opens — so a naive `test -f` at PR time reds a parent that is behaving exactly as the law requires. INTERIM: the parity checker names this surface explicitly. A ticked parent with no completion doc is neither red nor silent there; it EMITS `completion doc not found — not evaluated (doc presence is parent-completion-docs-present's surface, proposed/unbuilt; interim owner: the claims pass)` — red would build this row by the back door, silence would be the forbidden dormancy, and the named emission is the honest division of labour. The CLOSEOUT pass reads those emissions", by: thurgood }
```

---

### 7.8 `.kiro/docs/ballots/README.md` — the "Ballots on record" entry *(Req 12.2)*

**The cheapest missed-edit-site class in the July-2026 precedent.** Appended to § "Ballots on record", after the `2026-09-19-counter-argument-fold-back.md` entry.

**BEFORE** (line 40, the current last entry):
```markdown
- [2026-09-19-counter-argument-fold-back.md](2026-09-19-counter-argument-fold-back.md) — **RATIFIED (Peter, 2026-09-19)**. Amends the counter-argument protocol with the fold-back discipline (run the counter-argument against your own proposal before presenting; present the surviving residual; surface forks, never absorb them by picking) plus the Goodhart guard (never manufacture absorbable objections). Edit sites: AICP § "Counter-Argument Requirement", AI-Collaboration-Framework Protocol 1 + behavior list + anti-patterns, all eight canonical agent prompts + regeneration (diff-guard green). Ruled in-session at the Spec 127 requirements working session; evidence: three live fold-back catches the same day.
```

**AFTER** — the same line, plus:
```markdown
- [2026-09-19-completion-claims-integrity.md](2026-09-19-completion-claims-integrity.md) — **RATIFIED (Peter, <date>)**. The Spec 127 law ballot: the **Parent Success-Criteria Fidelity** rule (exact-set verbatim criteria table with three mandatory columns, the closed Status vocabulary, the four Evidence kinds, the four normalization rules, the forced-negative line, the Additional verification section with its fixed deferral form, the fixed-string in-flight exemption with no sunset, and the instrument's honest-reach statement). Edit sites: `completion-documentation-guide` § "Parent Success-Criteria Fidelity"; `Process-Spec-Planning` Tier 3 + the replacement worked example + the new § "`tasks.md` Structural Conventions" (criteria-mode declaration, canonical Declared Merge Units block, the spanning-claim structural limb, the "materially amended" definition); `Task-Completion-Protocol` pointer ×2; `Product-Handoff-Protocol` § Tier 2's committed-report convention + named revisit; `RELEASE-FLOW` § "Deriving the delta" step 5 (owed-set run-and-paste + the arming line); five `classification-map` rows; the F7 disposition at `.kiro/issues/archive/2026-09-12-spec-112-completion-claims-audit.md`. Arms nothing — `completion-criteria-parity` is built non-required by U2; the required flip is Q2's, guarded. Stacy is the required reviewer.
```

---

### 7.9 `.kiro/issues/archive/2026-09-12-spec-112-completion-claims-audit.md` — the F7 disposition *(Req 12.6)*

**Path erratum, recorded rather than silently fixed**: the requirement was written against `.kiro/issues/2026-09-12-…`; the file was moved to `.kiro/issues/archive/` by the 2026-09-17 issues-dir triage (PR #173) **after** the requirement was accepted. The archive tree is named as this edit's route (main-session on the U1 branch, inside the `.kiro/issues/**` governance carve-out PR).

#### 7.9a — the disposition line (the primary edit)

**BEFORE** (line 153, verbatim):
```markdown
- **F7**: the parent-criteria-table template question above. — **STILL PENDING Peter's ruling** (the proposed cheap rule: parent verification tables reproduce ALL tasks.md criteria verbatim, unmet rows marked ⚠️ with a follow-up link; counter-argument recorded in § Closing Assessment). The only audit item without a disposition.
```

**AFTER**:
```markdown
- **F7**: the parent-criteria-table template question above. — **ADDRESSED BY SPEC 127** (`.kiro/specs/127-completion-claims-integrity/`). Peter ruled the FULL PACKAGE on 2026-09-13 — not the cheap template-only rule this finding proposed, but that rule plus a mandatory Evidence cell, the forced-negative line, and staged mechanization; the docket that was blocking formalization was settled at `.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md` (RATIFIED), and the law itself at `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md`. **The counter-argument recorded in § Closing Assessment is preserved unretracted, not answered** — it was weighed and ruled against for stated reasons, which is a different thing from being refuted. **CLOSING CONDITION, stated**: F7 closes when the law ballot has ratified **AND** the `completion-criteria-parity` checker has armed (Q2 governs when — its decision defers to the 125-B campaign-close sitting, with release-prep start as its firing anchor). **Not before, and not by transcription alone**: verbatim transcription catches 2 of this audit's 12 discrepancies by its own measurement, which is exactly why the ruling is a package rather than a template edit.
```

#### 7.9b 🔸 — a pointer under the F7 finding heading *(drafter's judgment inside ruled scope)*

A reader arriving at the finding should not have to scroll to the routing section to learn it was dispositioned. Strike if the ruling is read as disposition-line-only.

**BEFORE** (line 131, the last line of § "F7 — A structural pattern in the parent docs…"):
```markdown
Parents 4 and 6 each present a criteria table with **fewer rows than tasks.md defines**, and in both cases the omitted rows are precisely the unmet ones (4: "platform blend utilities all use OKLCH"; 6: "green success.text ≥4.5:1" and "Spec 106 consumer contract test passes"). Parent 6 additionally reworded "All semantic pairs **pass** WCAG AA" to "**evaluated** against" and restated ΔE₀₀ <1 as <3, both marked ✅. No row in any Spec 112 parent doc is marked ⚠️ or ❌. The verification tables were authored from what was done rather than checked against what was promised — which is the mechanism that let 3.3, 3.2, 4.2 and 6.1 pass as complete.
```
*(Applier's note: this BEFORE block was verified character-exact against line 131 on 2026-09-19 — including the absence of a comma before "and restated". The paragraph is **not modified**; it is quoted only as the anchor the new line is appended beneath.)*

**AFTER** — the same paragraph, plus a new line beneath it:
```markdown
> **Disposition (see § "Routed to Thurgood/Peter")**: **ADDRESSED BY SPEC 127.** Three of the six mutation classes this finding describes are named in the shipped law by the names used here — **drop** (parents 4 and 6), **reword** (parent 6's "pass" → "evaluated") and **relax** (ΔE₀₀ <1 restated as <3). Closing condition: the law ballot ratified **AND** the checker armed.
```

---

## 8. The straggler sweep

**Per the ballots-README edit discipline**: *"Application should end with a mechanical sweep for the edit-class (a straggler grep), not trust in the enumerated list — every count in this directory's first ballot was wrong at least once (two → three → four occurrences); the sweep caught what the lists missed."*

### 8.1 The sweep command family, fixed here

```bash
for s in "Parent Success-Criteria Fidelity" \
         "Unmet or partially met criteria:" \
         "Criteria fidelity: exempt — spec in flight at ratification" \
         "Artifact deferred:" \
         "**Criteria mode**:" \
         "## Declared Merge Units" \
         "reproduce every tasks.md success-criterion row verbatim" \
         "closeout-owed(" \
         "if arming is undecided, decide it now" \
         "reports/implementation-" \
         "completion-criteria-parity" \
         "promised-artifact-exists" \
         "promised-artifact-shipped" \
         "completion-verification-honesty" \
         "parent-completion-docs-present" \
         "2026-09-19-completion-claims-integrity" \
         "Ratified-machine:"; do
  n=$(grep -rIF -- "$s" --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=worktrees . | wc -l | tr -d ' ')
  printf '%-58s %s\n' "$s" "$n"
done
```

### 8.2 BEFORE state — run at authoring, 2026-09-19, `cd5a7b72`

```
Parent Success-Criteria Fidelity                           11
Unmet or partially met criteria:                            5
Criteria fidelity: exempt — spec in flight at ratification  9
Artifact deferred:                                          9
**Criteria mode**:                                          7
## Declared Merge Units                                    16
reproduce every tasks.md success-criterion row verbatim     3
closeout-owed(                                              8
if arming is undecided, decide it now                      11
reports/implementation-                                     6
completion-criteria-parity                                 68
promised-artifact-exists                                   23
promised-artifact-shipped                                  26
completion-verification-honesty                            21
parent-completion-docs-present                             16
2026-09-19-completion-claims-integrity                      0
Ratified-machine:                                           6
```

**Every BEFORE hit is inside Spec 127's own documents** (requirements, design, tasks, design-outline, feedback, pre-spec) **or inside this ballot**. Two verified spot-checks establish that the law strings are genuinely new and are not being *moved* from somewhere:

```bash
grep -rIln --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=worktrees -- "Unmet or partially met criteria:" .
grep -rIln --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=worktrees -- "reports/implementation-" .
```
```
.kiro/specs/127-completion-claims-integrity/design.md
.kiro/specs/127-completion-claims-integrity/requirements.md
.kiro/specs/127-completion-claims-integrity/pre-spec/stacy-consult-2026-09-13.md
.kiro/specs/127-completion-claims-integrity/design-outline.md

.kiro/specs/127-completion-claims-integrity/feedback/design-outline.md
.kiro/specs/127-completion-claims-integrity/requirements.md
.kiro/specs/127-completion-claims-integrity/design-outline.md
```

**A drafting correction that this sweep produced, recorded rather than quietly fixed**: Req 1.4 describes the forced-negative line as *"Imported from `governance/Product-Handoff-Protocol.md`"*. The **string** does not exist in that file — **zero hits** in PHP. What PHP carries is the **pattern**: four `- None / or list each…` forced-negative sections at lines 85, 90, 97, 101. The law text at § 7.1 therefore says *"the shape is imported … the line itself is new here."* An applier who went hunting for a source string would have found nothing and had to guess.

### 8.3 Run at submission — Task 1.4's duty, stated so it is falsifiable

At Task 1.4, **after** the § 7 edits are applied, the sweep above is **re-run** and:

1. **Every command's recorded output must match its re-run output** — the stated-matching discipline. A count that "was approximately right" is the class of claim this measure exists to stop accepting.
2. **Every hit is classified** — live reference, historical record, or straggler — in the settle ballot § 10 table form. **A dead reference is a finding; an unaccounted hit is a finding.**
3. **Expected post-edit deltas are predicted here so a surprise is visible as a surprise**: `Parent Success-Criteria Fidelity` +≥4 (guide heading, guide description, PSP Tier 3 pointer, TCP ×2); `reproduce every tasks.md success-criterion row verbatim` **exactly +2, both in TCP** (the identical-line hazard at § 7.4); `## Declared Merge Units` +1 (the PSP canonical-form block); `2026-09-19-completion-claims-integrity` +≥5 (guide, RELEASE-FLOW, ballots-README, F7, register rows); `Ratified-machine:` +1 (this ballot's own filled line).
4. **The C11 INVENTORY-COMPLETENESS DIFF CHECK** (Stacy A-2) runs alongside the sweep: **§ 7's nine site headings are diffed against design C11's site list, item by item**, and the comparison is recorded. The sweep proves *the applied edits are complete relative to the inventory*; the diff check proves *the inventory is complete relative to the design*. **Neither substitutes for the other**, and the July-2026 precedent is the reason: that ballot's enumerated list missed a fourth `**Type**:` occurrence even after a dedicated straggler hunt.

---

## 9. Post-merge follow-ups

1. **docs-MCP `rebuild_index`** — owed immediately post-merge. Four served documents change: `completion-documentation-guide`, `process-spec-planning`, `product-handoff-protocol`, `classification-map`. **`Task-Completion-Protocol.md` is an identity doc and is NOT served** — no reindex for it; `.kiro/hooks/RELEASE-FLOW.md`, `.kiro/docs/ballots/README.md` and the archived issue are likewise unserved.
2. **`Last Reviewed` bumped** to the ratification date on each of the four served documents.
3. **`node scripts/validate-steering-metadata.js`** — run post-application; record the result.
4. **U2 branches from `main` after this PR merges.** The checker reads this ballot at its pinned path; U1-before-U2 is what makes the ratification record present for the checker's entire life, and is why no vacuous-green state exists.
5. **If Peter's merge date differs from the recorded `Ratified-machine:` date**, U2's first commit corrects the line as a record-accuracy erratum, Peter-merged with U2.

---

## 10. Declined alternatives, recorded with their grounds

So the cheaper option is not re-proposed unknowingly.

1. **B-R2-1's alternative — declare non-frozen criteria blocks OUTSIDE the promise surface by design, in writing.** Coherent, and genuinely cheaper: no second grammar to maintain, and "generous" invites scope creep at its edges. **DECLINED** because it would **write the reword-evasion channel into law for the exact mutation class this measure exists to catch**: in the nine files at § 5.6, an editor could reword a criterion freely and the amendment would be immaterial by definition, leaving the file silently legacy. That is `check_state: dormant` in prose form. The declined option's cost is bounded instead by two properties that are load-bearing and must survive future editing: **the generous set is CLOSED and enumerated verbatim** (§ 7.3's eight-row table), and **legacy only shrinks**.

2. **A sunset clause on the in-flight exemption.** Proposed by its own opponent, as a tightening against an unbounded self-served exemption across a large population. **DECLINED**, on the ground that **the claims-pass machinery is the abuse detector** — and that ground now **binds somewhere**: fixed-string exemption usage is a named counting duty of every pass (§ 7.1's exemption subsection; Req 8.6). A declined tightening whose stated replacement binds nowhere rests on nothing.

3. **Arming the checker inside Spec 127.** **DECLINED** — out of scope by Req 6.7, governed by Q2's guards. The counter-argument stands preserved: every parent completing in the interim ships unchecked, and the rule runs on prose alone for exactly the period the evidence says prose does not hold.

4. **A `verification.instrument_owner` schema field** on the register, to carry the build-vs-read split that § 11's fork exposes. **NOT ADOPTED** — consistent with the joint agreement's own recommendation against a third governance-law surface on this spec. The split is carried in the rows' `history` prose instead.

---

## 11. Open judgment calls, flagged for the reviewer and for Peter

Marked so a reviewer can strike them without unpicking ruled substance.

| # | Call | Where | Status |
|---|---|---|---|
| **J1** | **`promised-artifact-exists`'s `owner`** — fork: `thurgood` now (option A) vs `stacy` now with a dated flip at build time (option B) | § 7.7 | **RULED — Peter, 2026-09-19: OPTION (B).** Ships `owner: stacy`; flips to `thurgood` at build time as a pre-committed, representational transition. Option (A) and its residual preserved below as the recorded alternative |
| **J2** 🔸 | Guide **frontmatter `description`** extended to name the new section | § 7.1b | Drafter's judgment inside ruled scope — the MCP-discovery version of the canonical-example lesson |
| **J3** 🔸 | Guide **parent-task checklist** gains one line | § 7.1c | Drafter's judgment — the prune-scar constraint binds TCP (a pointer surface), not the rule's home document |
| **J4** 🔸 | **F7 pointer under the finding heading**, in addition to the disposition line | § 7.9b | Drafter's judgment — a reader at the finding should not have to scroll to learn it was dispositioned |
| **J5** | **Placement** of the PSP conventions § (inside "Tasks Document Format", after Key Principles) and of the guide's new § (after Documentation Tiers) | §§ 7.1a, 7.3 | Drafter's judgment — the design fixed the content, not the insertion point |
| **J6** | The parity row's `checks:` names the **context string while `check_state: proposed`**, where the schema says `checks` carries the concrete name *"when armed"* | § 7.7 | Drafter's judgment — Req 6.1 requires the context name be fixed at authoring **and cited on the register row**, and there is no other field for it. The qualifier text inside the string says it is not yet required |
| **J7** | The **worked example's follow-up links** point at two real, currently-open issues | § 7.2c | Drafter's judgment — a canonical example teaching ⚠️-with-a-link should demonstrate a link that resolves; the alternative is a placeholder that teaches placeholders |

### J1 in full — the `promised-artifact-exists` owner

> **RULED — Peter, 2026-09-19: OPTION (B).** The row ships **`owner: stacy`** — the honest record of the present: the row is `proposed` and unbuilt, the dimension is held today by the claims pass as judgment, and both sibling rows created in this ballot carry `owner: stacy` while unbuilt. The transition is **pre-committed, not deferred**: when the check is built, the owner flips to `thurgood` in one row edit with its own dated history entry, on the § 11.3 instrument-owner ground. **The flip is representational, not classificatory** — no disposition, boundary call, `check_state` or education disposition moves with it, and the ruling says so in advance precisely so a later reader cannot mistake a handover for a reclassification.
>
> **The ruling resolves the fork against the drafter's own proposal.** The argument for option (A) and its surviving residual are preserved below, unedited, as the recorded alternative — not because the decision is open, but because a fork resolved without its losing argument on the record is a decision no later reader can re-weigh.

**Proposal as drafted (option A — NOT TAKEN): `owner: thurgood`.**

**Rationale.** The register's schema defines `owner` as *"the agent who owns the verification decision/check for this rule."* The settle ballot resolved the identical friction on the parity row **against** the drafter's own preference, on a stated principle: *"`owner` fuses decision and check; for an armed barrier the decision IS the check, so the field records who keeps the instrument true"* (§ 11.3). `promised-artifact-exists` is designed as exactly that kind of object — a delta-scoped, PR-gate-shaped mechanical check whose entire content is path existence at a named commit, with annotation-stripping and exclusion-emission rules fixed by law. § 11.3 puts instrument ownership — checker source, CI wiring, `EXPECTED_CONTEXTS` registration and count-assert — with Thurgood. The question-routing test agrees: *"what is a completion doc required to contain?"* → Thurgood.

**Counter-argument, run against the proposal before presenting it.** Three real pulls toward `stacy`: **(a)** the row's **named reader** is her CLOSEOUT pass; **(b)** the **interim owner** of promised-artifact gaps is explicitly her, as judgment, until the check is built; **(c)** the carve-out's **tiebreaker direction** is *"ambiguity resolves to Stacy, always — the seam fails toward the verifier."* And the two sibling rows in this very ballot (`promised-artifact-shipped`, `parent-completion-docs-present`) carry `owner: stacy` **while unbuilt**, so `thurgood` here breaks a pattern this same ballot establishes three rows down.

**What the counter-argument improved, folded in:** the sibling comparison is the strongest limb, and it changed the *record* rather than the assignment — the row's history entry now states the counter-argument and the alternative explicitly, instead of asserting the assignment as though it were obvious. The tiebreaker limb folds in differently: it governs **claim-verification ambiguity** (*"was this claim verified?"* → Stacy), and the `owner` field answers a different question — *who keeps the instrument true* — so it is not the tiebreaker's subject. That is a fold, not a dismissal: the limb is answered, not ignored.

**The SURVIVING RESIDUAL, stated plainly because an empty residual would mean the counter-argument was too weak:** **`owner: thurgood` records a FUTURE state on a row whose `check_state` is `proposed` TODAY.** For however long this row stays unbuilt — and `promised-artifact-shipped` shows that can be a long time — the field will name an agent who owns an instrument that does not exist, while the agent actually holding the dimension as judgment is named only in prose. That is a real, un-recovered mismatch between the field and the world.

**The fork, as surfaced.** Two defensible options, both cheap:

- **(A) `owner: thurgood` now** — records the destination; the interim reality lives in the row's history and education prose. *Cost: the field is aspirational until the check is built.* **NOT TAKEN.**
- **(B) `owner: stacy` now, flipped to `thurgood` at build time** by a dated history entry — records the present; matches both sibling rows; costs one row edit and one history line, which is exactly the maintenance the register is designed for. *Cost: the field changes hands mid-life, which a later reader must not mistake for a classification change — so the ruling names the flip as representational in advance.* **RULED (Peter, 2026-09-19).**

**The drafter is a named party to this cut** (it lands on his own instrument scope), which is why it was surfaced rather than self-adjudicated. **Peter ruled option (B); the row at § 7.7 carries it, and the residual above stands as the recorded reason the other option was defensible.**

---

## 12. Counter-arguments on the record (AICP)

Run against this measure before presenting it; what the counter-arguments improved is folded into the text above, and what survived is stated plainly.

**1. Against the whole package — unretracted, and it is the audit's own.** Every one of the five escapes was eventually caught, and four sat in subsystems already under a separate open issue. A stricter parent-verification rule buys **earlier** detection, not detection that would otherwise never happen, and it taxes every future parent task against a failure mode whose base rate is one spec's worth of evidence. *Fold-back: this is why the rule binds only `per-parent` specs (rider (a)), why there is no backfill (rider (c)), why the in-flight exemption exists at all, and why the checker ships non-required. Surviving residual: the tax is real and lands on every future parent task from ratification onward, while the evidence base remains one spec.* Peter weighed this on 2026-09-13 and went the other way for stated reasons; the counter is preserved so a later reader can re-weigh it.

**2. The rule catches 2 of 12 of its own originating audit's discrepancies.** Verbatim transcription is fully compatible with a false ✅; it cannot see an absent document; and for every unshipped-work finding — **including both consumer-reaching escapes** — the claim never contradicts the doc's own text. *Fold-back: this is precisely why the ruling is a package — the forced-negative line, the mandatory Evidence cell, the register rows for the dimensions no check owns, and the claims-pass practice exist because transcription alone is insufficient, and § 7.9's closing condition refuses to close F7 on transcription. Surviving residual: the three dimensions that matter most (is the ✅ true, did the artifact ship, was a doc written at all) are held by **judgment and practice**, and this measure makes none of them mechanical. It says so, in law text, in three places.*

**3. The measure is large for its evidence, and most of its bulk is prose.** Five governance surfaces, a replacement worked example, a new conventions section, five register rows — against a base rate of one audited spec. *Fold-back: the bulk is concentrated where the measurement says the defect actually lives — **M4 = 0/22 is a template defect**, so the template is where the fix has to land, and a rule taught in one place while the canonical exemplar teaches the opposite is a rule that loses. Surviving residual: prose volume is itself a risk this system has measured before — the 125-B campaign exists because restated imperative prose accretes and rots. This measure adds roughly 300 lines of law text to surfaces a prune campaign just finished thinning, and the honest answer is that **the next prune wave should read it critically**, not that it is exempt.*

**4. Against arming later: every parent completing in the interim ships unchecked.** The rule runs on prose alone for exactly the period the enforcement-gap argument says prose does not hold. *Fold-back: the deferral carries two pre-committed guards rather than being open-ended, and the evidence guard is a floor under any decision, not one option's terms. Surviving residual: guards make a deferral stronger than an open one and **weaker than a decision**. And an arming-day hazard is now visible: a red merged during the non-required interim turns every PR red at the flip, and nothing currently requires a green full scan before flipping. That is routed to the 5.Z sitting deliberately, as visibility rather than as a new guard.*

**5. This ballot is its own subject, and its drafter is a named party.** A measure about self-attested verification tables, compiled by the agent whose standards authorship it entrenches, citing censuses he ran himself. *Fold-back: every census is a quoted command with its real output, so any claim here is falsifiable by re-running one line; the corpus delta at § 5.1 is attributed rather than absorbed; the flag-discipline lesson from the last ballot is written into the law itself (§ 7.3); and Stacy is the REQUIRED reviewer at verification grade. Surviving residual, and it does not dissolve: **the last ballot in this series was improved by a pass it did not perform on itself**, and its two blockers landed exactly where the drafter was compiling his own co-signed record. This document has a § 11 fork that lands on the drafter's own scope. **The self-audit cannot be pointed at what it cannot see** — which is an argument for the reviewer, not a reassurance from the drafter.*

**6. Goodhart is upstream of all of this, and nobody has a lever.** Criteria dilution happens in `tasks.md` during formalization: the cheapest response to "criteria are now auditable" is to write vaguer criteria, or fewer. *Fold-back: three partial purchases exist — the verifiability lens at the tasks round, the claims-pass counting duties (omissions, vagueness, declared-none rates, exemption usage, fallback invocations), and the fixture obligation. Surviving residual: none of them is a gate, and **criteria-dilution findings resolve by Peter's arbitration or not at all.** Named here so it does not disappear into the counting duties, which measure the problem without solving it.*

---

## 13. What this ballot deliberately does NOT do

- **It arms nothing.** `EXPECTED_CONTEXTS` is untouched. The CI job does not exist yet; when U2 creates it, it lands non-required.
- **It backfills nothing.** No historical completion doc is revisited. The 2026-09-12 audit's record **is** the historical-gap record.
- **It re-audits nothing.** Spec 112 is closed.
- **It does not mechanize verification honesty**, and no prose in it may be read to imply otherwise.
- **It does not execute the Q5 charter change** — that is U3, deliberately separable: *if Q5 would delay the rule, Q5 yields.*
- **It does not create a claims pass.** Passes are post-acceptance audits, never tasks and **never gates**.
- **It does not touch the (d7) coverage-adequacy line**, which remains excluded from ratification; moving it ever requires a separate argument with evidence.

---

## 14. Review round record

*Per the Spec-Feedback-Protocol stamp format. Resolutions live here; the body above is the clean, post-incorporation state.*

**Stacy — REQUIRED reviewer** (Req 12.1). Verification-grade, claims-vs-source. **Review not yet performed**; requested at Task 1.4.

Her review has standing precedent on exactly this surface: on the July-2026 ballot amending two of these same documents she found **five missed edit sites**, and on the 2026-09-17 settle ballot she found **two blockers, both in the section where the drafter was compiling his own co-signed record**. Both blockers there ran in the direction of *more* constraint, one of them on herself.

**Every blocking finding will be dispositioned in this document before submission**, with its disposition recorded here — not in a review file, and not by silent absorption.

#### [STACY R1]
*(awaiting review)*

#### [THURGOOD R2]
*(incorporation notes — to be written at the fold)*

---

## 15. Ratification

**This measure records rulings already made.** The docket it executes was ruled by Peter at the outline-settle sitting (2026-09-15 → 17) and at the 2026-09-19 requirements working session; this ballot compiles them **by reference** (§ 2) and authors the law text those rulings delegated to the formalization phase.

**Record-first** (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"): the `RATIFIED` status and the `Ratified-machine:` line are **committed before any law edit applies** — both in this same Peter-merged PR, under the standing governance carve-out (`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, `.kiro/hooks/**`, `.kiro/issues/**`). **A checks-only merge is not ratification.**

**Peter's merge of this PR is the ratifying record act.** An agent later asked to apply any part of this measure verifies **one mechanical fact** — that the committed ballot says `RATIFIED` — and makes **no authority judgment** about who relayed the instruction. If the committed record is missing or says otherwise, **report that** rather than applying, and rather than refusing-and-stopping.

**Status**: **DRAFT — submitted for ratification at Task 1.4**

*Drafted by Thurgood, 2026-09-19, on `task/127-u1-law`. No law document is touched by this file; the edits at § 7 apply at Task 1.2, after ratification.*
