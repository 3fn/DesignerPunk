# Ballot Measure: the release records move to `.kiro/docs/releases/<v>/` now — five standing scopes, the step 6 switch, the capture record's close

**Date**: 2026-11-27 (drafted from 2026-11-27T14:01:46Z, `date -u`)
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/hooks/RELEASE-FLOW.md`; drafter of ballot `2026-10-29-release-claims-pass-record-home`; owner of the capture record). Direction: Peter, 2026-11-12T13:25:17Z, **"(b), move now in one ballot"** (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-records-home-b.md`). That ruling "directs the vehicle. It does not ratify text not yet written." The orchestrator's brief to draft: Peter, 2026-11-27, "Let's brief Thurgood now".
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge of this file while this line reads DRAFT records the measure, ratifies nothing and answers no fork in § 7. Only Peter's dated words in this Status line ratify it.
**Required reviewer**: **Stacy**. The RELEASE record is hers, item 3 is her charter, its acts are hers, she was the (c) seat at consult-163 and should attack the width, and she is the census reader.
**Consulted seats** (standing-write-scope ballot `2026-10-17-standing-write-scope-six-roots` § 3 item 1: "Scope moves only by a `canonical/agents/**` edit, Peter-merged under the carve-out, with every affected seat consulted and the consult recorded in the PR's `**Consulted**:` line"): **Stacy, Ada, Lina, Leonardo**, and Thurgood (the drafter; conflict below). The orchestrator dispatches the four consults; the questions are in § 6. Under F12′, charter text in a signing range is mine: the seats draft nothing, and each answers in a review entry spliced into § 9.
**Consulted (prior)**: Thurgood, Stacy, Lina, Ada — consult-163 rounds 1–3 (2026-11-12). Final positions: Thurgood (b), Stacy (c). Peter ruled (b).
**Class**: LAW. It moves five seats' write scope ("an edit to a seat's write scope or role is always LAW", `.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot") and it supersedes the 2026-10-29 ballot's F-2 (a).
**Supersedes, in part**: ballot `2026-10-29-release-claims-pass-record-home` F-2 (a), "applied when Spec 131's owners file gives the five writing seats access". F-1 (ii), the destination, is unchanged and is what this ballot applies.
**Amends** (one application PR, Peter-merged; § 4):
- `canonical/agents/{stacy,thurgood,ada,lina,leonardo}.md` frontmatter `writeScope`: one glob each (item 1).
- `.kiro/hooks/RELEASE-FLOW.md` step 6, § "Where a release's records live": the opening sentence and its three bullets, replaced by the 2026-10-29 ballot's pre-declared switch text (item 2).
- `canonical/agents/stacy.md` L417, the first sentence: the 2026-10-29 ballot's § 4 site 2, ratified there and owed at the switch (item 3; F-1).
- The regenerated and signed surfaces (item 4).
- `.kiro/issues/2026-10-29-release-records-home-switch.md`: closed and archived (item 5).

**Cap**: five globs, one RELEASE-FLOW paragraph, one charter sentence, their regenerated and signed surfaces, and one record's close. **Not in the cap**: Stacy's class fix (`.kiro/issues/2026-10-29-claims-pass-record-homes-unnamed-arming-symptom-overlay.md`, three unnamed homes), unless Peter takes F-1 (b); Spec 131's OWNERS file; any change to the § 5.3 delegate rules.

**Retroactivity**: none. The records of 15.0.0 to 16.3.0 stay where they were written (§ 5).

> **Conflicts, stated first.**
> - I own RELEASE-FLOW, I drafted the 2026-10-29 ballot whose F-2 (a) this supersedes, and I own the capture record this closes.
> - **I am one of the five seats, so this widens my own charter.** I write the composed-loop outcome line into every RELEASE pass. Following the 2026-09-27 precedent: Peter's ruled words are verbatim above; the one element I add beyond the sites his ruling names is marked **[author's addition — Peter rules]** (item 3); the glob is one path, justified by a recurring task, with no `.kiro/docs/**` umbrella.
> - Stacy argued (c) at the last round. Her review, the four consults and Peter's ruling are the checks.

---

## 1. Why now

- Peter's 2026-10-29 F-1 picked the destination: "This problem only gets worse the longer we let it persist, and we've got four specs on the horizon." F-2 (a) deferred the move until Spec 131's owners file gave the five seats access.
- 131 is now parked behind Spec 132's first family (order (x′), "Let's go (x′)", 2026-11-05T04:06:22Z), so that deferral has no end date.
- The step 6 fallback question was owed at 16.3.0's walk and was not asked there (Stacy's RL-51). The capture record lapsed at 16.3.0's S (`6f507c039`; its `## Lapse (2026-11-12)`).
- On 2026-11-12 Peter was asked: (a) keep waiting, (b) move now with standing scope for the five seats, or (c) keep waiting until 131 with a one-site ballot. He ruled **(b), "move now in one ballot"**.

## 2. Who writes in the new home, and why each seat needs standing scope

Per release, under `.kiro/docs/releases/<v>/`:

| Seat | What it writes there | Why standing |
|---|---|---|
| **Stacy** | `claims-pass-release-<v>.md`, both phases and every addendum | every release |
| **Thurgood** | the composed-loop outcome line in that file; § 5.3 annotations beside it | every release |
| **Ada, Lina, Leonardo** | `delegate-audit-release-<v>-<seat>.md`, as the § 5.3 delegate rotation (ballot `2026-10-01-signing-act-chain` § 5.3), with its addenda | the rotation reaches each of them in turn; a missed grant blocks the walk (§ 8 trigger (d)) |

The glob is `.kiro/docs/releases/**` exactly, never `.kiro/docs/**`, which would sweep in `.kiro/docs/ballots/` (Ada's condition; capture record item 1).

## 3. The edits, before → after (base `3a3bd072b`)

### Item 1 — five `writeScope` globs (LAW)

In each charter's frontmatter `writeScope`, **after** the line `  - ".kiro/issues/**"` (the anchor at the base: `canonical/agents/stacy.md` L247, `thurgood.md` L311, `ada.md` L272, `lina.md` L336, `leonardo.md` L279), insert:

```yaml
  # ballot 2026-11-27-release-records-home-now item 1 (RATIFIED Peter <date>): the release records' home,
  # RELEASE-FLOW step 6 "Where a release's records live"; named exactly so, never .kiro/docs/**
  - ".kiro/docs/releases/**"
```

- Nothing is removed. Disposition rows are keyed by glob, so the insert moves no existing row.
- The Kiro adapter copies `writeScope` into `allowedPaths` unchanged (`tools/agent-generator/adapters/kiro.ts` L294–L296, as read for the 2026-11-07 charter-scope ballot). So the regeneration answers the capture record's item 2 (Kiro enforcement): each seat's `.kiro/agents/<seat>.json` gains the glob. The application PR shows it in the diff.
- `<date>` is the date in this ballot's ratified Status line.
- No § "In Scope" prose changes. No charter's prose names the release records' directory.

### Item 2 — RELEASE-FLOW step 6, the switch (LAW; the text is the 2026-10-29 ballot's pre-declared switch, verbatim)

**Before** (`.kiro/hooks/RELEASE-FLOW.md` L234–L237 at `3a3bd072b`, byte-exact):

```
   **Where a release's records live.** The RELEASE claims pass, both phases and every addendum, is one file, whatever specs the release delta carries. Its home is fixed for each release by the first `main at:` SHA its walk record pastes (item 3a), before anything is written, so no release's records straddle two directories:
   - **The interim home**, while this paragraph at that SHA still carries this bullet, is `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-<v>.md`, beside the records of 15.0.0 to 16.1.0.
   - **The switch PR** is the one PR that replaces this paragraph's first sentence after the heading, and these three bullets, with the final sentence that ballot `2026-10-29-release-claims-pass-record-home` § 4 site 1a words. The PR that gives Stacy, Thurgood, Ada, Lina and Leonardo write access to `.kiro/docs/releases/**` (Spec 131's owners file; `.kiro/issues/2026-10-29-release-records-home-switch.md`) is the switch PR itself or an ancestor of it. From the switch PR's merge, the home is `.kiro/docs/releases/<v>/claims-pass-release-<v>.md`.
   - **The fallback**: at the walk of the second release whose walk record's first `main at:` SHA descends from that ballot's application merge, and at every later walk while this paragraph at that SHA still carries these bullets, the capture record's re-rule PR at that release carries one `**Open for Peter**:` line. That PR is record-only and the line holds it alone. The question is: standing write scope for the five seats now (that ballot's option (b)), or the interim home for this release. The walk record rows the capture record as `carried`, with the hold named. Phase 1 reports the open question. The release proceeds at the interim home. If the re-rule PR is still held at S, the capture record lapses at that S under rule 11, and the lapse is recorded.
```

**After** (one line, in place of the four; the 2026-10-29 ballot's § 4 site 1a "switch's After", verbatim):

```
   **Where a release's records live.** The RELEASE claims pass, both phases and every addendum, is one file, `.kiro/docs/releases/<v>/claims-pass-release-<v>.md`, whatever specs the release delta carries, for every release whose walk record's first `main at:` SHA descends from the merge of the PR that made it the home; the records of earlier releases stay where they were written, in `.kiro/specs/123-consumer-distribution/completion/`.
```

**Pointer**: at the end of the paragraph's last line (L245 at the base), after site 1a's `*(added 2026-10-29 …)*`, append ` *(amended <application date> by ballot 2026-11-27-release-records-home-now item 2; prior text at `3a3bd072b`)*`. `<application date>` is the date of the application PR's merge, as its squash commit records it (the 2026-10-29 ballot's § 5 step 2 rule). A literal placeholder left in place reads `pointer-missing` under `edit-kind-pointers.ts`.

**Why the pre-declared text, cited as LAW of this ballot and not as EXECUTION of the old one**:
- The 2026-10-29 ballot pre-declared this text so the switch PR could be EXECUTION. Its condition was that "the PR that gives [the five seats] write access … (Spec 131's owners file …)" is the switch PR or its ancestor.
- Item 1 is now that PR, not 131's owners file. The switch text never names 131, so its words still fit, but the access route it assumed is the one this ballot supersedes. The ballots README's test applies: "When in doubt, LAW." One `**Edit kind**:` line names this ballot.
- **"the merge of the PR that made it the home"** is this ballot's application PR. The test from the 2026-10-29 ballot still holds and reads the law text alone: `git show <first main-at>:.kiro/hooks/RELEASE-FLOW.md | grep -cF '**The interim home**'` prints 1 for the interim home and 0 for the new one.
- The fallback bullet goes with it. The question it put to Peter is answered (b).

**Unchanged, and still true after the switch**: the delegate-file sentence ("in the same directory as the claims pass"); the list of the release's other fixed-path records; L62, site 1b's delegate row ("§ 5.3's file in the RELEASE record's directory (step 6, 'Where a release's records live')").

### Item 3 — Stacy's charter L417, the first sentence (the 2026-10-29 ballot's § 4 site 2, ratified there) **[author's addition — Peter rules: Peter's 2026-11-12 ruling names three sites; this is a fourth]**

**Why it is owed here**: the 2026-10-29 ballot ratified this site and named when it lands: "with whichever comes first, the switch PR or Stacy's #555 class fix". Item 2 is the switch. After it, L417's "Every pass produces a committed record in the spec's completion directory" is false for every RELEASE pass. A switch without it would ship a false sentence in her charter.

- **Before** (`canonical/agents/stacy.md` L417, the first sentence; the rest of the line unchanged): `Every pass produces a committed record in the spec's completion directory.`
- **After**: `Every pass produces a committed record in the spec's completion directory, except a RELEASE pass, whose record's home `.kiro/hooks/RELEASE-FLOW.md` step 6 names.`
- **Stacy's three conditions, binding** (the 2026-10-29 ballot § 4 site 2, her R1 and R5):
  - **two acts**: re-confirm `#the-claims-pass-record-claims-passmd-the-template`, then re-sign it;
  - **a `removals` entry**, my authoring before her re-sign, because the consumer overlay keeps the clause-free sentence (cite `subtraction-1`, the owed-set unit's precedent);
  - **the `record-committed` item's `text`** in `canonical/operative-sets/stacy.yaml` (L548–L551) keeps `Every pass produces a committed record in the spec's completion directory`, with no final period (a substring of the new sentence, and whole at overlay L87). The RELEASE clause becomes its own `obligation` item whose `text` is the clause's exact span. The `removals` entry carries the same text.
- The overlay pin (`canonical/profiles/consumer/stacy.overlay.md` L84, `@ sha256:3c2a1c1f…`) moves to the new unit hash; the overlay's text stays.
- **F-1 decides whether Stacy's class fix is composed in** (§ 7). Under F-1 (a) it is not, and her acts on this unit are spent twice.

### Item 4 — the regenerated and signed surfaces (EXECUTION of items 1 and 3)

- **Five new disposition rows**, one per seat, `"writeScope[.kiro/docs/releases/**]"` in `canonical/profiles/consumer/<seat>.dispositions.yaml`. Each needs a first signature, or `consumer-profile.real.test.ts`'s "every routed row is signed" fails (`[LINA R1]` Q1 on the 2026-11-07 charter-scope ballot).
  - **Proposed disposition**: `no-consumer-counterpart`; a consumer has no `.kiro/docs/releases/`. The cite is the C1 confirmer's to choose. The precedents are `writeScope[.kiro/issues/**]` (`subtraction-3`) and `writeScope[scripts/issues-owned.sh]` (`subtraction-1`).
  - **Signer**: each row by the C1 signer the signing chain names for that file. At the base Stacy signs Thurgood's rows (`thurgood.dispositions.yaml` L175), and each other seat signs its own.
  - I author the rows under F12′. Lina checks the model.
- Stacy's unit (item 3): the operative item split, the `removals` entry, her re-confirm and re-sign, the overlay pin.
- `canonical/operative-sets/*.yaml` and confirmations where the generator moves them.
- Regeneration (`.claude/agents/*`, `.kiro/agents/*`, `canonical/_consumer-output/**`) and `canonical/generated.lock`. **Lock slot**: the application PR takes one place in the one-lock-PR-at-a-time order, named in its brief.
- `122-diff-guard` read green, the `outputs` hash disclosed before and after (standing-write-scope ballot § 3 item 3).
- **Signing range**: the five seats' frontmatter units, and Stacy's template unit. F12′ applies: charter text in that range is mine, each seat performs its own acts in its own seat, and no seat authors its own charter text in range.

### Item 5 — the capture record's close (a record; my standing scope)

In the application PR, `.kiro/issues/2026-10-29-release-records-home-switch.md` gets rule 5's dated outcome line, then `git mv` to `archive/`:
- item 1 (write access): closed by item 1;
- item 2 (Kiro enforcement): answered by item 1, `writeScope` → `allowedPaths`, with the regenerated `.kiro/agents/<seat>.json` paths cited;
- item 3 (the switch PR): closed by item 2;
- item 4 (Stacy's L417): closed by item 3. Under F-1 (a), the class fix stays on her record, `2026-10-29-claims-pass-record-homes-unnamed-arming-symptom-overlay.md`, and its re-rule is hers;
- item 5 (the composed-loop count's second glob root): closed by the outcome line, which states the count command with both roots: `grep -LE '^## \[THURGOOD\] Composed-loop outcome' .kiro/specs/*/completion/claims-pass*.md .kiro/docs/releases/*/claims-pass-release-*.md`.

Before the application PR opens, I re-token the record's Trigger to `merge:#<N>`, as its 2026-11-12 re-rule says.

### Item 6 — ledger lines (records)

- `.kiro/docs/ballots/2026-10-29-release-claims-pass-record-home.md`, after its **Ruled** block: `*(F-2 (a) superseded <date> by ballot 2026-11-27-release-records-home-now: the access is five standing scopes, applied with the switch; F-1 (ii) and the switch text are unchanged.)*`
- `.kiro/docs/ballots/README.md` § "Ballots on record": one entry, at ratification.

## 4. Application (after the Status commit)

1. **The Status commit** (record-first): `**Status**: **RATIFIED (Peter, <date>)**` with his words and his F-1 answer, and the README roll entry.
2. **Consults** (§ 6) are spliced into § 9 before ratification. Their `**Consulted**:` line goes in the application PR's body.
3. **The application PR** (Thurgood, branch `chore/apply-release-records-home-now`), items 1–6. Its body carries:
   - `**Edit kind**: canonical/agents/thurgood.md — LAW (.kiro/docs/ballots/2026-11-27-release-records-home-now.md)`, and likewise for `ada.md`, `lina.md` and `leonardo.md`;
   - for `canonical/agents/stacy.md`, two parts: `L<a>–<b> — LAW (… this ballot)` for the frontmatter lines, and `L<c> — EXECUTION (.kiro/docs/ballots/2026-10-29-release-claims-pass-record-home.md § 4 site 2)` for L417, with the line ranges as they stand at the merge commit;
   - `**Edit kind**: .kiro/hooks/RELEASE-FLOW.md — LAW (.kiro/docs/ballots/2026-11-27-release-records-home-now.md)`;
   - the `**Consulted**:` line naming Stacy, Ada, Lina and Leonardo with each one's read (§ 3 item 1 of the standing-write-scope ballot);
   - the `outputs` hash before and after;
   - the census lines re-run at its base;
   - `**Straggler sweep**:` lines (step 5).
4. **Checks**, pasted with results: `npm test`; `npm run test:scripts`; `npm run -s check:122:diff-guard`; `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --audit --pr <N>` (never `--ci` over main squashes); `npm run -s check:section-citations`; `node scripts/validate-steering-metadata.js`; `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <N>`; the `law-ratified` and `merge-hold` checks green at the head.
5. **Straggler sweep**, case-sensitive, over `.kiro/hooks/RELEASE-FLOW.md governance canonical/agents canonical/profiles/consumer canonical/shared .kiro/steering`:
   - `The interim home` and `The fallback`: no hit;
   - `123-consumer-distribution/completion`: RELEASE-FLOW item 2's "records of earlier releases" only, plus the register's history lines (ledgers, left);
   - `.kiro/docs/releases`: RELEASE-FLOW item 2, the five frontmatter globs and their comments, the regenerated outputs;
   - `in the spec's completion directory`: Stacy L417 (item 3) and her overlay (kept, by the `removals` entry).
   Any other hit stops the application.
6. **Owed after merge**: the 16.4.0 walk record's first `main at:` SHA descends from the application merge, so 16.4.0's delegate brief names `.kiro/docs/releases/16.4.0/delegate-audit-release-16.4.0-<seat>.md` in full (Ada's must-say, carried). If the application merges after 16.4.0's walk, 16.4.0 stays at the interim home and the next release moves; the test in item 2 decides which.

## 5. Census, retroactivity

**Census** (`.kiro/docs/ballots/README.md` § "Conventions", "Instrument census"):
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts, with workflow-rules-guard.ts) — items 1, 3 and 4 edit canonical units that are its ordinary inputs, regenerated and lock-refreshed at application, where its verdict is read; RELEASE-FLOW is outside its input closure`
- `**Census**: not in scope — 122-canonical-vs-truth and the 122 sweeps (tools/agent-generator/canonical-vs-truth.ts, tools/agent-generator/sweeps/**) — canonical/** is their ordinary input; no rule they implement changes; read green at application`
- `**Census**: not in scope — verify-signing-chain (tools/agent-generator/regrounding/verify-signing-chain.ts, with C1 and signatures.ts) — item 4's first signs, re-confirm and re-sign are its ordinary inputs, read by --audit --pr at application`
- `**Census**: not in scope — law-ratified (scripts/completion-claims/merge-hold.ts --job law-ratified) — this ballot and the application PR's governance files are its ordinary inputs; each LAW line must cite this ballot reading RATIFIED at that head`
- `**Census**: not in scope — publish-rail-guard (scripts/verify-publish-rail.sh) — item 2 changes no rail text, exit code, assertion or verdict; the script never reads a claims-pass record`
- `**Census**: not in scope — hermetic-publish-path (scripts/release-publish.ts) — item 2 is text in the row's education home and adds nothing the script reads`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — no site adds an MCP section citation`
- **No line owed**: `charter-write-scope-render-fidelity` has `checks: []`. `scripts/owed-set.sh` keys on `<spec>/completion/claims-pass.md` and never reads `.kiro/docs/`. Under the new home no RELEASE record sits under `.kiro/specs/**`, so no `stub` or `closed` row moves. `scripts/issues-owned.sh` reads item 5's record by its token.

**Retroactivity: none, and I argue for keeping it so.** The records of 15.0.0 to 16.3.0, and their delegate files, stay in `.kiro/specs/123-consumer-distribution/completion/`.
- They are ledgers. Rule 2's "content UNCHANGED" discipline exists for records, and a move has no resolution rule for spec directories (README rule 3 covers `.kiro/issues/` only).
- Many files cite them by path. The 2026-10-29 ballot counted 38, and 16.2.0 and 16.3.0 added more. Each citation would break or need a pointer.
- Item 2's text already names where earlier records are, so a reader walking release records reads two roots from one sentence.
- *Counter, carried*: history stays split across two homes for good, which Stacy named at the 2026-10-29 round. Every reader that walks release records (LIVENESS read 2, Stacy's prior-release reads) carries two globs. The composed-loop count in item 5 is the first instance.

## 6. Who is affected, and what each consulted seat is asked

The orchestrator dispatches these, read-only, at this ballot's head. Each answer is a review entry for § 9.

| Seat | Why | Questions |
|---|---|---|
| **Stacy** (required) | the record is hers; item 3 is her unit and her acts; census reader; she argued (c) | (1) Attack the width: is any of the five globs one you would send back to per-release grants? Leonardo holds the delegate seat roughly once in three releases. (2) Item 3: do your three 2026-10-29 conditions still hold as written, and do you sign the item split as § 3 item 3 states it? (3) F-1: site 2 alone now, with your class fix as a later second edit of the unit (two sets of acts), or your class fix composed in now? If composed, does your #555 record already hold text Peter can ratify, or does it need its own ruling first? (4) Does item 2's switch text, read at a walk's first `main at:` SHA, still give you a home decidable without asking me? (5) Census: do the in-scope calls and the `owed-set.sh` "no line owed" hold? |
| **Ada** | her `writeScope` moves; § 5.3 delegate; first delegate; condition that the glob is exact | (1) Do you accept `.kiro/docs/releases/**` in your standing scope, worded as item 1? (2) Your 2026-10-29 must-says (interim path in full, no straddling, the file check stays): does the switch keep each one? (3) Is the Kiro `allowedPaths` claim (adapter copies `writeScope` unchanged) still true at `3a3bd072b`? |
| **Lina** | her `writeScope` moves; § 5.3 delegate; generator shared-core primary (rendering into Kiro and CC); model check on the dispositions and Stacy's item split | (1) Do you accept the glob in your standing scope? (2) Item 4: is `no-consumer-counterpart` the right disposition for the five rows, and is a first signature per row what `consumer-profile.real.test.ts` needs? (3) Item 3's operative split and `removals` entry: does the model hold, and does anything in `operative-sets.ts` or `triviality.ts` reject it? (4) Does the lock-slot order have a conflict you know of? |
| **Leonardo** | his `writeScope` moves; § 5.3 delegate rotation | (1) Do you accept a standing glob for a role you hold some releases and not others, or do you prefer a per-release grant when your turn comes? (2) Does anything you write at a release (the trio records stay at `tests/onboarding-trio/records/<v>/` under their own grant) need to move with this? |

**Not affected**: Kenya, Data and Sparky. They are not in the § 5.3 rotation, and no record they write moves.

## 7. Forks for Peter (none is picked here)

- **F-1: Stacy's charter L417 at the switch, alone or with her class fix?**
  - **(a) Alone** (item 3 as written): the 2026-10-29 site 2 lands now, as ratified. Stacy's class fix (ARMING's other limbs, SYMPTOM's filename, the consumer overlay's RELEASE record) stays on her record and lands later as its own ballot. Her template unit is then edited and re-signed twice.
  - **(b) Composed**: her class fix rides this ballot, and the unit is edited once, as the 2026-10-29 ballot intended ("Stacy's acts on the unit are spent once, together with her class fix"). Her record "asks for one ruling that names all three homes" and proposes no text, so (b) adds three homes to this cap and a ruling to this sitting.
  - **The drafter leans (a)**. The switch should not wait for three more homes, and the cost is one more set of acts on one unit.
  - **Surviving counter to (a)**: it breaks the 2026-10-29 ballot's "spent once", and the SYMPTOM-filename collision (a SYMPTOM record at `claims-pass.md` would silently discharge `closeout-owed`) stays latent until her fix lands.
  - **Surviving counter to (b)**: it puts three home rulings Peter has not seen into a ballot he ruled as a folder move, and the move waits on them.

## 8. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: items 1–6 as written, F-1 (a).

**Counter-arguments, run against it**:
- **(i) Stacy's (c)**: five charter edits and a signing range for a folder move no outside reader sees. The interim home already sits under `.kiro/specs/**`, which every writing seat can write.
- **(ii) Spec 131's OWNERS file may move scope again**, so this work may be redone.
- **(iii) Two directories with near-identical names.** The step-6 record lives in `docs/releases/<v>/`, and the claims pass will live in `.kiro/docs/releases/<v>/`. A delegate could write to the wrong one.
- **(iv) Leonardo's scope is wider than his use**: standing scope for a role that reaches him about once in three releases.
- **(v) Item 3 is beyond the three sites Peter named.**

**Folded in**:
- From (i): one ballot, one application PR and one signing range, as Peter ruled. The interim home's question returned every release (the fallback). This ends it.
- From (ii): the glob is one exact path. Spec 131's OWNERS file can take it over as one row.
- From (iii): site 1b's existing rule already holds: "a file committed at any other path does not discharge the row". A misplaced delegate file is visible in git and is § 8's trigger (d). The ballot adds no new check.
- From (iv): Peter's ruling names all five. Leonardo's consult question 1 lets him prefer a per-release grant. If he does, that is a fork at R2.
- From (v): item 3 is marked as my addition, and its absence would make Stacy's charter false at the switch.

**What survives**:
1. **The work is done twice if Spec 131 re-homes ownership.** Five rows, five signatures and one sentence.
2. **History stays split across two homes for good** (§ 5).
3. **The near-identical directory names stay.** Only site 1b's file check catches a misplaced delegate file, and only at the walk.
4. **Under F-1 (a), Stacy signs her template unit twice.**

## 9. Review round record

*(Empty at draft. Each consulted seat's entry is spliced here, byte for byte, by the holder.)*
