# Spec 127 U1 — Law Ballot Review (REQUIRED reviewer)

**Reviewer**: Stacy — product governance & QA, REQUIRED reviewer per Req 12.1
**Date**: 2026-09-19
**Branch / HEAD**: `task/127-u1-law` @ `28d6d1cf` (1.3 applied)
**Subject**: `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md` (DRAFT) and the applied diff `main...HEAD` (9 files, +1943 / −62)
**Grade**: verification-grade, claims-vs-source. Every number below was re-derived; nothing is inherited from the ballot.

---

#### [STACY — U1 BALLOT REVIEW]

**Mandatory @ mention pre-step** (Spec-Feedback-Protocol § "Mandatory @ Mention Scanning"): scanned `.kiro/specs/127-completion-claims-integrity/**` and the ballot for `[@STACY]` / `[@Stacy]`. **Zero outstanding mentions.** Discharged.

---

## 0. Verdict

**CONDITIONAL — 7 BLOCKING, 11 advisory.** Do not submit for ratification until the seven are dispositioned.

The material worth saying first, because it is the larger fact: **the law text is clean.** I diffed every large AFTER block in § 7 against the file as applied, byte for byte. All of them are **IDENTICAL**:

| § | Block | Result |
|---|---|---|
| 7.1a | guide § "Parent Success-Criteria Fidelity" (118 lines) | **IDENTICAL** |
| 7.2a | PSP Tier-3 Success Criteria Verification item + rationale | **IDENTICAL** |
| 7.2b | PSP Additional Template Sections | **IDENTICAL** |
| 7.2c | PSP worked example (the named edit site) | **IDENTICAL** |
| 7.3 | PSP § "`tasks.md` Structural Conventions" (96 lines) | **IDENTICAL** |
| 7.5 | RELEASE-FLOW § "Deriving the delta" + step 5 (52 lines) | **IDENTICAL** |
| 7.6 | PHP § Tier 2 convention + named revisit | **IDENTICAL** |
| 7.4 | TCP pointer — **occurrence count = 2**, both sequences | correct; the identical-line hazard did not bite |
| 7.9a/b | F7 disposition line + finding-heading pointer | applied verbatim |

All five register rows parse (`js-yaml`), carry every Entry-Schema field, and carry dated + attributed `history`. `node scripts/validate-steering-metadata.js` → **PASS** (92 docs, 0 backfill). Every § 5 census I re-derived reproduces exactly: 154 / 793 / 66 / 62 / 17 / 151; P1 1128, P5 710 across 131 files, P6 17 all in `122-agent-generator`, P7 3 files, P8 1 file; the 36 / 37 / 39 recipe triple with delta memberships `{054a, 054b}` and `{125-A}` member-for-member; the zero-criteria trio; the six-spec no-per-parent-label cut; the nine-file non-frozen enumeration, exact membership; the 62-vs-66 line-anchoring cause and its falsifier (zero multi-occurrence lines); the M-baseline population 41 → 18/10/8/4/1; the non-substring sweep, zero relations both directions.

**No substantive number in this ballot is wrong.** Every blocking finding below is about an **instrument** or a **record**, not a result. That distinction is load-bearing and I hold it throughout.

The July-2026 precedent asks me for missed edit sites, silent adaptations, and extra changes. I found **one unlisted edit site**, **three undocumented application-time adaptations**, and — the finding I would not have expected — **a verification instrument that does not do what its own text says it does**, proven by command.

---

## 1. Method — what I actually ran

Stated so a later reader can falsify any line of this review by re-running it.

- `git diff main...HEAD` split per file; each § 7 AFTER block extracted by line range and `diff`ed against the live file region.
- Every § 5 census re-run from the repository root with my own hands (not copy-pasted trust): § 5.1, 5.2, 5.3 (both halves), 5.4 (all three recipes + three `comm` deltas + the 127-absence check), 5.5 (both cuts), 5.6, 5.7 (P1–P8), 5.8, 5.9, 5.10 (first two commands).
- The § 8.1 sweep family run **three ways**: as written under the session shell's `grep`; as written under `command grep`; and in a corrected form with the exclusions actually in effect.
- The five register rows parsed programmatically and field-checked against the register's own Entry Schema (`§` at `classification-map.md:120–150`).
- Design C8.1 / C8.2 / C8.3 / C8.6 element lists and C11's site list diffed item-by-item against the applied text.
- `tasks.md` Task 1's fifteen success criteria treated as my acceptance surface.

**Environment note, which turns out to matter** (§ B-1): the session shell's `grep` is a **ugrep 7.8.4 shim** (`ARGV0=ugrep … -G --ignore-files --hidden -I --exclude-dir=.git …`), not GNU or BSD grep. I re-ran every census under the shim **and** under `command grep`. **All § 5 results agree under both interpreters** — the census numbers are interpreter-independent and I certify them as such. **The § 8 sweep does not agree under both** (34 vs 35 on two strings), which is BLOCKING-1's sharpest limb.

---

## 2. BLOCKING findings

### BLOCKING-1 — § 8.1's straggler sweep does not exclude what it says it excludes. Proven, with a 6-hit contamination.

The sweep command is:

```bash
n=$(grep -rIF -- "$s" --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=worktrees . | wc -l | tr -d ' ')
```

The `--exclude-dir=` flags sit **after `--`**. `--` is the end-of-options marker: every token after it is a **file operand**. Both greps say so out loud:

```
grep: --exclude-dir=node_modules: No such file or directory
ugrep: warning: --exclude-dir=node_modules: No such file or directory
ugrep: warning: --exclude-dir=.git: No such file or directory
ugrep: warning: --exclude-dir=worktrees: No such file or directory
```

**The exclusions have never been in effect.** The only real operand is `.`, so the sweep walks the whole tree — `node_modules/`, and critically `.claude/worktrees/`, which is ignored via `.git/info/exclude` and therefore **not** caught by ugrep's injected `--ignore-files` either (that honors `.gitignore`, not `info/exclude`).

It is not academic. Run now, both forms:

Both forms run **in the same invocation, at the same moment** — see the correction note below for why that qualifier is load-bearing:

| String | as written (exclusions inert) | corrected form | Δ | source |
|---|---|---|---|---|
| `## Declared Merge Units` | **35** | **29** | **−6** | `.claude/worktrees/` |
| `promised-artifact-exists` | **43** | **42** | **−1** | `.git/COMMIT_EDITMSG` |
| `2026-09-19-completion-claims-integrity` | 19 | 19 | 0 | — |
| `Ratified-machine:` | 20 | 20 | 0 | — |
| `parent-completion-docs-present` | 28 | 28 | 0 | — |
| `completion-verification-honesty` | 35 | 35 | 0 | — |

**Two of the seventeen swept strings are contaminated**, from two different inert exclusions.

> **CORRECTION — my own, and it is the BLOCKING-2 error class committed inside the document that files it.**
> An earlier revision of this review claimed **four** contaminated strings (−6 / −4 / −3 / −1). That table was wrong. I produced it by differencing a broken-form count taken in one command run against a corrected-form count taken in a *later* run — and between those two runs **I created this review file**, which cites thirteen of the seventeen strings and therefore moved the corpus under both sides of my own subtraction. Three of the four "contaminations" were my own file, not the missing exclusions.
> The same-moment measurement above is the honest one, and the claim shrinks from four strings to two. **Recorded rather than quietly amended**, because the failure — *differencing counts across an unaccounted corpus change* — is precisely what BLOCKING-2 says the ballot's § 8.3 deltas do, and I have now demonstrated it live rather than argued it. Treat that as the finding's strongest evidence and treat my number as the cautionary instance. BLOCKING-1's substance is unaffected: the exclusions are still inert, the worktree contamination is still six hits, and the interpreter divergence is still real.

The six spurious `## Declared Merge Units` hits are worktree copies:

```
.claude/worktrees/compassionate-kirch-7d6f44/.kiro/specs/125-B-classification-map/tasks.md
.claude/worktrees/compassionate-kirch-7d6f44/.kiro/specs/119-B-capability-routing-measurement/tasks.md
.claude/worktrees/modest-cartwright-3de183/.kiro/specs/125-B-classification-map/tasks.md
.claude/worktrees/modest-cartwright-3de183/.kiro/specs/119-B-capability-routing-measurement/tasks.md
.claude/worktrees/musing-shamir-a061f4/.kiro/specs/125-B-classification-map/tasks.md
.claude/worktrees/musing-shamir-a061f4/.kiro/specs/119-B-capability-routing-measurement/tasks.md
```

§ 5 is unaffected — its globs are `.kiro/specs/*/tasks.md`, and the ballot's § 5 preamble correctly reasons that worktrees fall outside them. That reasoning is right, and it is exactly what made the § 8 defect invisible: the author verified the *glob* argument in one section and carried the *confidence* into another where the command shape is different.

**Two consequences I only found by running the sweep under both interpreters, and they are worse than the worktree hits.**

**(a) The two greps return different answers to the same command.** I ran all seventeen strings under the session shell's ugrep shim and under `command grep`, same tree, same invocation:

```
promised-artifact-exists                 ugrep=34    realgrep=35
completion-verification-honesty          ugrep=31    realgrep=32
```

Cause, traced for `promised-artifact-exists`: `--exclude-dir=.git` is inert for the same reason, so **real grep descends into `.git/`** while the ugrep shim skips it (the shim injects its own `--exclude-dir=.git` *before* the user's arguments, where it works). The +1 is **`.git/COMMIT_EDITMSG` — the commit-message buffer**, confirmed by direct enumeration (`.git` hits = 1, in that file). That file is rewritten on every commit, so **the sweep is non-deterministic across commits** for any string that appears in a commit message. Every string in this sweep is a string this branch commits about.

*(The `completion-verification-honesty` divergence has `.git` hits = 0, so its cause is a separate interpreter difference — a `--ignore-files` or `-I` binary-detection disagreement. I did not chase it further: the point is established by the first, and "two implementations, same command, different answers" does not need a second mechanism to be disqualifying.)*

**(b) Therefore the interpreter is load-bearing, not a footnote.** § 8.3 item 1 requires recorded output to match re-run output. A command that answers 34 or 35 depending on which `grep` is on `PATH`, and that reads a file which changes on every commit, cannot discharge that duty. And the same interpreter question reaches further than § 8: U2's `--verify-extraction` reconciliation is contractually forbidden from attributing differences to extraction behaviour (Stacy BLOCKING-3's disposition, carried at § 5.7) — so a grep-implementation difference in the U1 baseline would be misattributed by a ruled reconciliation.

**Why BLOCKING and not advisory.** § 8.3 is the ballot's own final verification gate and a verbatim Task-1 success criterion ("each straggler-sweep command's recorded output matches its re-run output at submission"). A gate whose mechanism silently doesn't do what its text says is `check_state: dormant` in prose form — the ballot's own phrase, from § 5.6, applied to the ballot's own instrument. This is a measure about instruments that report green while verifying nothing.

**Ask**: correct the command family (move the exclusions before `--`, or drop `--` — no pattern in the list begins with `-`), ensure `.git` and `.claude/worktrees` are actually excluded, **name the interpreter** in the recipe (`command grep`, or state the binary and version), and re-derive both the BEFORE and the AFTER with the corrected form.

**This is the disposition of the "ugrep-warning" fold item, and it is stronger than the proposed note.** A cross-check against an independent pipeline confirms the *numbers*; it does not repair the *command*. The command is what § 8.3 re-runs at submission and what a later reader inherits. Correct the command.

---

### BLOCKING-2 — § 8.2's BEFORE baseline and the § 8.3 AFTER re-run measure **different corpora**. The predicted deltas are arithmetically incomparable.

§ 8.2 is labelled *"BEFORE state — run at authoring, 2026-09-19, `cd5a7b72`"* and asserts: *"Every BEFORE hit is inside Spec 127's own documents … **or inside this ballot**."*

The recorded numbers falsify that clause:

| String | § 8.2 BEFORE | What the ballot alone contains | Verdict |
|---|---|---|---|
| `2026-09-19-completion-claims-integrity` | **0** | ≥ 5 (§ 7.8's AFTER block, § 7.9's disposition text, § 7.1's in-force line, …) | ballot **absent** from the baseline tree |
| `reproduce every tasks.md success-criterion row verbatim` | **3** | **4** (§ 7.4 BEFORE + AFTER, § 8.1's list, § 8.3's prediction) | ballot **absent** |

Current corrected-form per-file breakdown for the second string — 9 total:

```
./.kiro/specs/127-completion-claims-integrity/requirements.md:1
./.kiro/specs/127-completion-claims-integrity/pre-spec/thurgood-consult-2026-09-13.md:1
./.kiro/specs/127-completion-claims-integrity/design-outline.md:1
./.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md:4
./.kiro/steering/Task-Completion-Protocol.md:2
```

Three pre-existing spec hits → the BEFORE of 3 reconciles **only** if the ballot was not in the tree. So the baseline is genuinely pre-ballot.

**The consequence is the finding**, and it is larger than the label: the § 8.3 re-run will count a tree that contains the ballot; the baseline counted a tree that did not. **Every predicted delta is therefore computed across a corpus change the prediction does not account for** — and § 8.3 item 3's stated purpose is *"so a surprise is visible as a surprise."* It cannot be. Live evidence: `reproduce every tasks.md success-criterion row verbatim` is predicted **exactly +2, both in TCP**; the actual is **3 → 9**. The +2 in TCP is real and correct; the other +4 is the ballot's own body. A prediction that is off by 200% on the one string it predicts exactly is not a surprise-detector.

**Ask** (three parts, all cheap):
1. **Relabel** § 8.2 truthfully — the tree it was run on: pre-ballot, pre-edit, at `cd5a7b72`.
2. **Strike** *"or inside this ballot."* It is false of the tree measured.
3. **State that the deltas are not comparable across the ballot's own introduction**, and that § 8.3 **item 2** — full classification of every hit as live reference / historical record / straggler — is the operative check. Item 2 is corpus-independent and does the real work; the deltas were always decoration.

**A second corpus member arrives with this review.** This file cites thirteen of the seventeen swept strings, so the 1.4 re-run will count it too. That is a *third* corpus the baseline does not know about (pre-ballot → ballot → ballot + review), and it is unavoidable: the required reviewer's record has to exist before submission. It is also the cleanest argument for the ask above — a delta arithmetic that breaks when the required reviewer files her round was never going to survive contact. Classify hits; don't difference counts.

The self-found relabel is the right instinct and does not go far enough on its own.

---

### BLOCKING-3 — three recorded census outputs are **edited transcripts**, not the commands' outputs. § 5's own opening discipline forbids this.

§ 5 opens: *"each census is a command block followed by **the command's real output**. No number below was inherited."* Three blocks break it.

**§ 5.4** — the command block ends `wc -l A.txt B.txt C.txt` followed by three `comm` invocations. Re-run verbatim:

```
      36 A.txt
      37 B.txt
      39 C.txt
     112 total          <-- emitted; DROPPED from the recorded output
```

and the recorded `--- B minus A ---` / `--- C minus B ---` / `--- C minus A ---` headers are emitted by **no command in the block**. Separately, the loop appends with `>>` and the block never clears `A.txt B.txt C.txt`, so a second run in a dirty directory doubles every count — the recipe is not idempotent, and it is offered as a frozen recipe.

**§ 5.9** — the loop's only `echo` is `echo "relations found: $hits"`. The recorded output is:

```
live count: 22
relations found: 0
```

`live count: 22` has no emitter. (Re-run now, post-1.3: **relations found: 0**, over **27** live ids — still clean.)

**§ 5.10** — two of the four command blocks are literally elided:

```bash
… | sed 's|.kiro/specs/||;s|/completion/.*||' | sort | uniq -c | sort -rn
IN=$(… | grep -E '122-agent-generator|125-B-classification-map')
```

`…` is not a command. And the recorded output carries six labelled lines against four commands — `corpus-wide M5 over all 41: 2` and `corpus-wide M1 over all 41: 16` correspond to nothing in the block at all. § 6 calls this recipe *"frozen and re-runnable at each health check."* As written it is neither. (I reconstructed and ran the first two commands: **41**, and 18/10/8/4/1. The numbers are right.)

**Why BLOCKING.** Requirement 12.3's whole point is **frozen, quoted recipes — quoted, not described** — authored specifically because the described-cause error class produced a wrong recorded cause once already (§ 3 item 4, my own A3, correcting my own prior confirmation). An annotated transcript presented as command output is the same failure wearing a tidier hat: it reads as machine-produced and is human-produced. And it is the one thing § 8.3 item 1 asks a future runner to match.

**Ask**: make each block emit its own labels (add the `echo`s, add `rm -f A.txt B.txt C.txt`, write out the elided pipelines in full), or mark the annotation lines unambiguously as annotation. Either is fine; the current form is not.

---

### BLOCKING-4 — three application-time adaptations of ballot text, none recorded anywhere in the repository.

The ballots-README edit discipline is explicit: *"apply exactly as written; if a before-text does not match, **stop on that block and report** — never adapt silently."* § 7 restates it. Three adaptations were made and none is on the record — there is no `completion/` directory for this spec, so no 1.2 or 1.3 completion doc carries them.

**(a) `promised-artifact-exists` — the ruled inline comment dropped.** Ballot § 7.7 authors:

```yaml
  owner: stacy           # RULED option (B) — Peter, 2026-09-19. Flips to `thurgood` at build time; see history
```

Applied: `  owner: stacy` — bare. On the merits I **confirm the drop**: no live register row carries an inline comment on `owner` (only the schema example does), so the house shape is with the applier. But J1's own ruling says the flip is named in advance *"precisely so a later reader cannot mistake a handover for a reclassification"* — and the only place it is now named is the second history entry's 1,400-character prose block. **Ask**: either restore the comment, or amend ballot § 7.7 to the applied form with the house-shape reason stated. Do not leave ballot and register disagreeing.

**(b) `completion-verification-honesty` — the (d8) sentence replaced in `history`.** Ballot: *"The rationale is carried verbatim, as ruled: 'Any future reading …'"*. Applied: *"The ruled sentence is carried verbatim in `boundary_call.rationale` above."* On the merits I **confirm**: Req 5.5 is satisfied — the sentence is verbatim in `boundary_call.rationale`, and a duplicated "carried verbatim" sentence is itself a second drift surface. But a ratifier reading § 7.7 believes the register carries it twice. **Ask**: amend § 7.7's YAML to the applied text, one clause of reason.

**(c) the neutrality line — an unlisted edit site with adapted wording.** § 7.2c's prose says *"One neutrality line accompanies the example, and belongs in the document"* and quotes it in italics; it supplies **no BEFORE anchor and no AFTER block**. The applied line at `Process-Spec-Planning.md:2257` is reworded and re-scoped:

> **Domain neutrality**: the shape above applies equally … live in `governance/Product-Handoff-Protocol.md` § "Tier 2: Implementation Reports", which is their home.

vs. the ballot's *"…live in the Product-Handoff-Protocol, which is their home."* A bold label was added, "above" was added, the bare doc name became a path plus a `§`. **Every one of those changes is an improvement** and the placement is correct (line 2257 sits **outside** the example's closing fence at 2255 — I checked, it is document prose, not example content). It is still an adaptation of ballot text applied without a record, at a site § 7 does not inventory while claiming *"Nine edit sites, matching design C11's list exactly."*

**Ask**: add **§ 7.2d** with a real BEFORE anchor and the exact applied AFTER, and correct § 7's site accounting.

**And the same class, resolved the other way — § 7.8, which I CONFIRM.** The ballots-README entry was applied as **DRAFT** with a `STATUS SLOT` comment, where § 7.8's AFTER says `**RATIFIED (Peter, <date>)**`. **This deviation is correct and I endorse it without reservation.** Writing RATIFIED into the record before Peter ratifies would be a false claim in the record, on a measure whose entire subject is false claims in records. The record-first reading is right. **But** the only trace of the decision lives in an HTML comment in a non-ballot file. **Ask**: one applier's note in § 7.8 recording the two-step (DRAFT at 1.2, flipped at 1.4 in the same commit as the Status line and the machine line), so the deviation is a recorded decision rather than a discovered discrepancy.

---

### BLOCKING-5 — § 15 asserts record-first compliance that the branch contradicts. I surface the fork; I do not pick it.

§ 15: *"the `RATIFIED` status and the `Ratified-machine:` line are **committed before any law edit applies** — both in this same Peter-merged PR."*

`.kiro/docs/ballots/README.md` § "The Ratification Protocol" step 1 is unambiguous about commit order: *"first updates the ballot's `Status` … and **commits that record** — before any law edit is applied. The commit's author and timestamp make the ratification auditable."* Req 12.1 repeats it.

The branch does the opposite:

```
63d7f104  1.1  ballot authored — Status: DRAFT
81e588d2  1.2  the law edits applied        <-- law edits committed
28d6d1cf  1.3  register rows applied
          1.4  the ratification lines are written HERE
```

**Two defensible readings, and the choice is Peter's, not mine:**

- **(i) PR-atomic.** The unit squash-merges, so on `main` the record and the edits are one commit; no state ever exists in which law edits are in force without the ratification record. Peter's merge **is** the ratifying act (§ 15 says so itself), so there is no earlier moment at which a truthful `RATIFIED` commit could be written. Under this reading the protocol's step 1 presumes message-borne ratification and simply does not apply to merge-as-ratification — and § 15 should **say that**, not claim compliance with a step it cannot satisfy.
- **(ii) Literal.** The branch is out of compliance and the sequence is reordered (ratification lines first, edits re-applied on top).

**My assessment, stated as assessment**: (i) is right on substance, and I am not asking for a reorder. What I am asking for is that the ballot stop asserting (ii). The cost is one sentence. The reason it is BLOCKING rather than advisory is narrow and, I think, unanswerable: **this is a compliance claim that the artifact contradicts, sitting in the ratification section of a ballot legislating against compliance claims that artifacts contradict.** A future reader who checks it will find it false, and will be right.

**Ask**: replace the sentence with the reading — e.g. *"Record-first under merge-as-ratification: the `RATIFIED` status and the `Ratified-machine:` line are written at 1.4 and committed in this same Peter-merged PR; the squash-merge makes the record and the edits a single atomic commit on `main`, so no state exists in which the law is in force without its record. The README protocol's step-1 ordering presumes ratification arriving as a message before application; here the merge is the ratifying act, and this is the stated reading of the protocol for that case."* Flag it for Peter as a reading, since it is a governance-protocol interpretation.

---

### BLOCKING-6 — two design-C8.3 elements are absent from the PSP conventions §, against a Task-1 criterion that promises **every** C8.3 element.

Design C8.3 enumerates the conventions §'s contents as: *"the criteria-mode declaration + declared-none + **exemption string** + **deferral form** + the 'materially amended' definition beside the declaration rule, with the flag-discipline authoring guidance."*

Measured inside the applied § (`awk` from the heading to `### Task Format Examples`):

| C8.3 element | present |
|---|---|
| criteria-mode declaration | ✅ (2 hits) |
| declared-none (`none — <one-line reason>`) | ✅ |
| `Criteria fidelity: exempt …` string | ❌ **0 — and 0 in the whole of Process-Spec-Planning.md** |
| `Artifact deferred:` form | ❌ **0 in the § (3 elsewhere in PSP: Tier-3, template, worked example)** |
| "materially amended" definition | ✅ (3 hits) |
| flag-discipline guidance | ✅ |
| *(plus the three Stacy BLOCKING-4 elements: structural limb as law, `(platforms: …)` fallback + counting note, canonical units block)* | ✅ ✅ ✅ |

Task 1's criterion, verbatim: *"The PSP conventions § contains **every** design-C8.3 element — including Req 2.6.1's structural limb stated as law, the `(platforms: …)` fallback with its counting note, and the canonical units-block form."* The three named ones are there. Two unnamed ones are not.

**On the merits, the omission is correct and I would not reverse it.** Neither string is a `tasks.md` structure — both describe **completion-doc** content, whose home is the guide (C8.1), where both are present and taught. Duplicating them into PSP is precisely the restated-imperative accretion the 125-B campaign spent three waves removing, and the ballot's own counter-argument 3 names prose volume as a live risk. **C8.3's element list is the thing that is wrong here, not the applied text.**

**Why it is still BLOCKING.** The criterion will be reproduced verbatim in Task 1's completion doc and marked, under the law this PR ships. Marking it ✅ with two elements absent and unmentioned is the **drop** class — on the spec's own first compliance artifact, in the first hour of the rule's life. The remedy is not text; it is a **recorded deviation**: state in the ballot (a clause at § 7.3) and in Task 1's completion doc that C8.3's element list included two completion-doc strings, that they are single-homed in the guide by design, and that the deviation is deliberate. A ⚠️ row with that Evidence cell is a perfectly good outcome and teaches the right thing.

---

### BLOCKING-7 — the register-row history dates, three `Last Reviewed` bumps, and the ballots-README entry hard-code `2026-09-19`, and § 9's erratum clause covers only the machine line.

Applied now, all dated `2026-09-19`: seven `history` entries across the five register rows; `Last Reviewed` on `completion-documentation-guide.md`, `Process-Spec-Planning.md`, `Product-Handoff-Protocol.md`, `classification-map.md`.

§ 9 item 5 and the header comment cover exactly one line: *"If Peter's merge date differs from the recorded `Ratified-machine:` date, U2's first commit corrects the line as a record-accuracy erratum."*

If Peter merges on 2026-09-20 or later — entirely plausible given the bursty pace — **eleven other dated records are wrong and nothing obliges anyone to fix them**, including seven history entries in the register, which is the system's designated "settled fact" surface for future waves.

**Ask**: extend § 9 item 5's erratum scope to name all of them explicitly — the five rows' `history` dates, the four `Last Reviewed` values, and the ballots-README entry's `(Peter, <date>)`. Enumerate them, so the erratum is a checklist rather than a recollection. (This is the same enumerate-so-a-wrong-answer-is-falsifiable discipline the ballot applies to the owed-set pipeline; it should apply to itself.)

---

## 3. Advisory findings

**A-1 — the machine-line slot is currently in a non-conforming shape, and there is a decoy.** Ballot line 28 reads `**Ratified-machine:** *(slot …)*` — **bolded**, colon inside the bold. The fixed form (§ 4, design C11/DD2) is `Ratified-machine: YYYY-MM-DD`, **alone on its own line**, unbolded. At 1.4, filling the date in place while leaving the bold would ship a non-conforming record and send U2's checker to LOUD RED at its first run. Separately, line 16 carries an indented commented example of the exact string — an in-document decoy for a naive line-contains parser. Both are fine if handled; **hand the decoy to U2's fixture set** as a case ("the ratification record contains a commented example of the machine line"). I will encode it in the fixture specifications.

**A-2 — RELEASE-FLOW step 5a says "RUN the owed-set query" but no query exists to run.** The step gives four stages in prose; exactly one (`test -f …`) is a command. Req 8.4 mandates a **documented pipeline**, and its stated home is *"the health-check LIVENESS item + **Stacy's command catalog**"* (Req 7.7 names `canonical/agents/stacy.md` as the edit site). The RELEASE-FLOW text as applied implies a runnable artifact at a surface that does not carry one. Not a U1 defect — the design specifies stages here — but it is a **silence-shaped gap**, and this spec's defect cluster is mechanisms whose failure mode is silence. **Ask**: U3 must carry real commands in my command catalog, and RELEASE-FLOW 5a should point there. Route: **U3, to me.** I will hold it.

**A-3 — § 8.3's predicted deltas are mostly open-ended and cannot function as surprise-detectors.** Three of five are `+≥4` / `+≥5` — satisfied by any positive number. Of the two exact ones, `## Declared Merge Units +1` is measurable only after B-1's correction (contaminated by 6 worktree hits as written), and `reproduce every … +2` misses by +4 for B-2's reason. **Ask**: after B-1 and B-2 are applied, re-derive exact predictions, or state plainly that item 2's hit classification is the check and the deltas are indicative.

**A-4 — J7's worked-example links will decay, and the guide's own rule says they must not.** Both follow-up links point at live issues (`2026-06-24-blend-…`, `2026-09-17-platform-build-verification-harness-candidate`). Both are chartered items that will close and move to `.kiro/issues/archive/` — as `2026-09-12-spec-112-…` already did, which this very ballot had to record as a path erratum (§ 7.9). When they move, the canonical exemplar every author copies will teach two dead links, against the guide's own *"MUST cite a locatable record."* **Ask**: name the re-point duty at the monthly charter walk, which already visits both issues. One line, zero new process.

**A-5 — `completion-criteria-parity` is the register's first `proposed` row with a non-empty `checks[]`.** I verified: it is the only one of 15 `proposed` rows in that state. J6's reasoning is sound (see § 4), but the row silently establishes a precedent that would break any future "count armed checks by counting populated `checks[]`" query — and this repository does count contexts mechanically (`verify-gate-registration.sh`, count-asserted). **Ask**: one clause in the row's history naming it as a first-instance precedent with its condition (lawful when the context name is fixed at authoring and the string carries its own not-yet-required qualifier).

**A-6 — the register's `promised-artifact-exists` `rule:` line inverts the taught/accepted arrow.** It states the fixed form as `Artifact deferred: <path> -> <unit>` (ASCII), while the law teaches `→` and merely *accepts* `->` at parse. YAML-safety is the obvious reason and it is a fine reason; but a later reader citing the register row as the rule will teach the accepted form as the canonical one. **Ask**: one parenthetical — `(→ is the taught spelling; -> is accepted at parse and used here for YAML safety)`.

**A-7 — § 5.9's "22 live + 5 proposed" is stale post-1.3, and the 1.3 re-run is unrecorded.** § 5.9 instructs: *"Re-run mechanically at Task 1.3 against the register as it stands at that moment; **the recorded output there is the one the completion doc cites**."* There is no 1.3 completion doc. I ran it: **27 live ids, relations found: 0** — clean. Record it somewhere before submission.

**A-8 — no completion docs exist for 1.1, 1.2 or 1.3, and none is ticked.** `.kiro/specs/127-completion-claims-integrity/completion/` does not exist. Three subtasks' worth of work is committed with neither status marks nor completion records. Task-Completion-Protocol § For SUBTASKS step 2 owes one per subtask. I read this as mid-flight rather than as a violation (the ticks are honestly absent, which is the right state for unfinished work), and I note it without heat — but on **this** spec, the absence is worth naming, and it is why BLOCKING-4's three adaptations have nowhere to live. Writing 1.2's and 1.3's docs is the cheapest home for them.

**A-9 — a forward trap in Task 1's own criteria: the corpus is 154, the criterion says 153.** The criterion reads *"per-pattern-class match counts over all **153** `tasks.md`"*. The ballot correctly reports 154 with the delta attributed to 127's own file (§ 5.1 — the § 3 item 5 discipline working exactly as designed, and I commend it). When that criterion is reproduced in the completion doc it must be copied **verbatim with 153** and the attribution carried in the Evidence cell. Silently substituting 154 into the `Criterion (verbatim)` cell is the **reword** class, on the first artifact the rule governs. Flagging it because it is the precise trap the rule exists to catch and it is sitting in the spec's own file.

**A-10 — Primary Artifacts declares a placeholder path.** Task 1's block lists `.kiro/docs/ballots/2026-09-XX-completion-claims-integrity.md`; the artifact shipped at `…2026-09-19-…`. Under the AV forced-negative line the completion doc must declare the deviation rather than write "all shipped as declared". This is also the **first live instance** of a `<placeholder>` inside a Primary-Artifacts path, which `promised-artifact-exists` will meet in the wild. **Ask**: declare the deviation at 1.4; I will encode "Primary-Artifacts path containing a date placeholder" in the fixture set.

**A-11 — § 7's site accounting is short by three.** *"Nine edit sites, matching design C11's list exactly"* — but the applied diff also bumps `Last Reviewed` on Process-Spec-Planning, Product-Handoff-Protocol and classification-map, authorized only by § 9 item 2 (a **post-merge** follow-up), while § 7.1d inventories the guide's bump as an edit site. Either inventory all four in § 7 or drop 7.1d to § 9; do not have the same edit class appear in both places with different standing. (Applying them at 1.2 rather than post-merge is correct — they ride the PR with the change they describe — so this is an accounting fix, not a behavior one.)

---

## 4. Adjudication of the marked judgment calls

| # | Call | Ruling |
|---|---|---|
| **J2** 🔸 | guide frontmatter `description` extended | **SUSTAIN.** The strike condition is "scope creep beyond ruled substance" and it does not obtain: the description is what MCP discovery reads, and a rule an author searching *"success criteria"* cannot find is a rule that does not bind. Verified applied verbatim. |
| **J3** 🔸 | guide's own parent-task checklist gains a line | **SUSTAIN.** The strike condition is "read as a restated imperative block"; the prune-scar constraint binds **pointer** surfaces (TCP), and this is the rule's home document indexing its own §. *One advisory fold*: the line is ~55 words restating four obligations, which is nearer restatement than pointer. Consider `— [ ] Reproduce every tasks.md success criterion per § "Parent Success-Criteria Fidelity" (table, forced-negative line, Additional verification where applicable)`. Not a strike. |
| **J4** 🔸 | F7 pointer under the finding heading | **SUSTAIN.** ~20 lines separate the finding from the routing section in an archived issue, and a reader arriving via the mutation-class names lands at the heading. Non-normative, in an archived doc, cheap. The BEFORE anchor was verified character-exact by the applier and by me; the paragraph is unmodified. |
| **J5** | placements (PSP conventions after Key Principles; guide § after Documentation Tiers) | **SUSTAIN both.** Conventions before the examples that embody them; the rule before the naming mechanics that serve it. Both anchors verified as applied. |
| **J6** | `checks:` names the context while `check_state: proposed` | **SUSTAIN, with A-5's condition.** Req 6.1 requires the context name fixed at authoring **and cited on the row**, and no other field exists; the string carries its own qualifier. But it is the register's only such row (verified, 1 of 15), so name the precedent in `history` or a future mechanical count of armed contexts will be wrong. |
| **J7** | worked example's follow-up links point at real open issues | **SUSTAIN, with A-4's decay duty.** A canonical example teaching ⚠️-with-a-link should demonstrate a link that resolves; placeholders teach placeholders. The residual — both targets will close and move to `archive/`, exactly as this ballot's own F7 target did — is real and needs the re-point duty named. |
| **1.3 (a)** | owner inline comment dropped | **CONFIRM on merits** (house shape), **CONTEST on record** → BLOCKING-4(a). |
| **1.3 (b)** | (d8) sentence relocated out of `history` to `boundary_call.rationale` | **CONFIRM on merits** (Req 5.5 satisfied; a duplicated "verbatim" sentence is a second drift surface), **CONTEST on record** → BLOCKING-4(b). |
| **1.3 `by:`** | the second named shape correction | **UNVERIFIABLE.** All five rows carry `by: thurgood` and the ballot authored them the same way; the diff shows no `by:` divergence, and no 1.3 completion doc exists to describe what was corrected. If a correction was made it left no trace — which is A-8/BLOCKING-4's point in miniature. |
| **§ 7.8** | DRAFT-status deviation | **CONFIRM the record-first reading, without reservation.** A record that says RATIFIED before ratification is exactly the class of false claim this measure exists to stop accepting, and the applier was right to refuse it. Record the deviation in § 7.8 → BLOCKING-4, final paragraph. |

---

## 5. Disposition of the two known 1.4 fold items

| Item | Proposed disposition | My verdict |
|---|---|---|
| § 8.2 baseline relabel (drafter's self-found over-claim) | relabel the baseline | **INSUFFICIENT.** The relabel is necessary; it is not the finding. The BEFORE and the re-run AFTER measure different corpora, so § 8.3's deltas cannot detect surprises and the *"or inside this ballot"* clause is false of the measured tree. See **BLOCKING-2** for the three-part ask. |
| ugrep warning, cross-checked against an independent pipeline | note the environment | **INSUFFICIENT — demand the portable form.** The cross-check validates the *numbers*, and I confirm the numbers. The *command* is broken: the `--exclude-dir` flags sit after `--` and have never been in effect. Demonstrated, at same-moment measurement: **two of seventeen strings contaminated** (`## Declared Merge Units` −6 from `.claude/worktrees/`; `promised-artifact-exists` −1 from `.git/`), **the two grep implementations disagree on the same command**, and the divergence traces to `.git/COMMIT_EDITMSG` — **so the sweep's answer changes with every commit.** A cross-check against an independent pipeline confirms an output; it cannot repair a command that § 8.3 re-runs at submission and that a later reader inherits. See **BLOCKING-1**. The named-interpreter clause is part of the fix, not a footnote: U2's `--verify-extraction` reconciliation is contractually forbidden from attributing differences to extraction behaviour (Stacy BLOCKING-3's disposition), so a grep-implementation difference in the U1 baseline would be misattributed by a ruled reconciliation. |

---

## 6. Counter-arguments, run against this review before presenting it

**1. "These are census-hygiene findings on a ballot whose law text is byte-identical across every block. Holding ratification on grep ergonomics is process theatre."**
*Fold-back, and it changed this document*: I led with the clean record rather than burying it, I state explicitly that **no substantive number is wrong**, and I scoped B-1 and B-3 to instruments rather than results — an earlier draft of this review generalized from the broken sweep to doubt about § 5, which the re-derivations do not support and which I struck.
*Surviving residual*: BLOCKING-2 is not hygiene. The ballot's own final verification gate — a verbatim Task-1 success criterion — cannot be discharged honestly as written, because its two sides measure different corpora. That survives the objection intact.

**2. "§ 15's record-first sentence is a technicality. The PR is atomic; nothing on `main` is ever unrecorded."**
*Fold-back*: accepted in full. I am **not** asking for a reorder, I named reading (i) as the substantively right one, and I converted the finding from "violation" to "stop claiming compliance with a step you cannot satisfy — state the reading instead." I also surfaced it as a fork for Peter rather than picking, because it is a governance-protocol interpretation and that is his call.
*Surviving residual*: it is a false compliance claim in the ratification section of a ballot about false compliance claims. Cost to fix: one sentence. Cost of leaving it: a future reader checks it, finds it false, and is right.

**3. "BLOCKING-6 demands duplication into PSP — the exact prose accretion 125-B just finished removing."**
*Fold-back*: it changed the ask entirely. I agree with the omission on the merits, I say C8.3's element list is the thing that is wrong, and my ask is a **recorded deviation**, not added text. The version of this finding that demanded the strings be added is struck.
*Surviving residual*: the criterion says "**every** design-C8.3 element" and will be reproduced verbatim and marked. ✅ with two elements absent and unmentioned is the drop class, in the rule's first hour. A ⚠️ with the single-homing rationale in its Evidence cell is a better artifact than a ✅ and teaches the right lesson. That survives.

**4. Against my own severity distribution — am I inflating to look thorough?** (My named bias; I am obliged to check it.)
Seven blocking findings is a lot. Test: every one is either (a) demonstrated by a command whose output is quoted above, or (b) a record-vs-reality mismatch. **None demands new law text. None demands re-applying an edit. None reopens a ruled question.** Total fold cost is roughly an hour of editing. If I were inflating, the blocking list would demand substance; it demands records. On a measure whose subject is record integrity, records are the correct bar — and a reviewer who waives record defects *on this ballot specifically* is doing the thing the ballot exists to stop.

*And the bias check caught something real, which is the only reason it is worth running.* I **did** over-claim once in this review: BLOCKING-1's contamination table said four strings when the honest same-moment measurement says two. The mechanism was not malice or padding — it was differencing two counts taken at different moments across a corpus I had myself moved. It is corrected in place, visibly, with the mechanism named, because a silent amendment would have been the **relax** class (a claim quietly restated at the value that happens to hold) in a review filed against a law that names that class. I would rather the drafter and Peter see a reviewer correct herself in the document than trust a reviewer who never does.

**Mirror bound.** Checked in both directions, as I am required to. BLOCKING-6, A-9 and A-10 run toward **more** constraint on artifacts I will later audit (the parent completion doc, the claims pass). A-2 routes real work onto **my own** charter — the owed-set pipeline's actual commands belong in my command catalog at U3, and I am holding that rather than letting RELEASE-FLOW imply an artifact that does not exist. BLOCKING-4 confirms both of the drafter's adaptations **on the merits** and asks only that they be written down. This round is not one-directional, and the one call that lands on my own scope (A-2) costs me, not him.

---

## 7. What clears

Recorded because a review that only names defects mis-reports the artifact.

- **Law text fidelity: clean.** Eight large AFTER blocks byte-identical; TCP's identical-line hazard handled correctly (count = 2); the F7 BEFORE anchor character-exact.
- **Design element coverage**: all 12 C8.1 elements present in the guide (including the three A-5 sentences verbatim, rule (iii)'s bounded scope with the zero-width characters enumerated, the closed-but-extendable clause, the honest-reach statement, and the (d8) blockquote). C8.2 complete, including the ⚠️-with-link twice from two different causes, the adjacent grouped platform triple with `not re-verified — toolchain unavailable`, the registry reference limb on every platform row, the AV gate row, the `Artifact deferred:` declaration, the forced-negative line rendered **as a list rather than a ritual "None"**, and — verified cell by cell — **zero activity prose in any Evidence cell**. C8.6 complete, including Leonardo's three revisit questions verbatim, both pre-fixed answers, and the multi-screen path-collision fold.
- **The structural limb IS stated as law** (Req 2.6.1's SHALL), with the amendment-gated `(platforms: …)` fallback and its counting note, and the canonical units block with all four columns.
- **My own restored bounds are present**: the anti-veto ground and the interim-owner clause on `promised-artifact-exists` (*"UNTIL THEN THE PASS OWNS PROMISED-ARTIFACT GAPS AS JUDGMENT"*) and on `parent-completion-docs-present` (the named emission, verbatim, with `interim owner: the claims pass` inside the emitted string — the honest division of labour, exactly as ruled). Req 8.8's never-a-gate sentence is correctly **deferred to U3**, where the practice is documented; the ballot's § 13 carries the equivalent (*"never gates"*) in the meantime, which is the right home for it at this unit.
- **Register**: five rows, all parsing, all schema-conformant, dated and attributed history, gate-bite recorded as outstanding **at row creation rather than after the fact** — which is the honest form and the one I would have asked for had it been missing. J1=B applied with its owner line, the pre-committed flip, the representational-not-classificatory clause, and the losing option preserved unedited.
- **Censuses**: every figure I re-derived reproduces. The corpus-moved-to-154 attribution (§ 5.1) is the § 3 item 5 discipline exercised on its own first instance and is a model of the behaviour this spec is trying to install.
- **`node scripts/validate-steering-metadata.js` → PASS.**

---

*End [STACY — U1 BALLOT REVIEW]. Seven blocking, eleven advisory. My round is dispositionable as written; every blocking item has a stated ask, and none requires reopening a ruled question.*
