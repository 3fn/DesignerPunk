# Ballot Measure: the release records move to `.kiro/docs/releases/<v>/` now — five standing scopes, the step 6 switch, the capture record's close

**Date**: 2026-11-27 (drafted from 2026-11-27T14:01:46Z, `date -u`)
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/hooks/RELEASE-FLOW.md`; drafter of ballot `2026-10-29-release-claims-pass-record-home`; owner of the capture record). Direction: Peter, 2026-11-12T13:25:17Z, **"(b), move now in one ballot"** (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-records-home-b.md`). That ruling "directs the vehicle. It does not ratify text not yet written." The orchestrator's brief to draft: Peter, 2026-11-27, "Let's brief Thurgood now".
**Status**: **DRAFT (R3)**, not ratified. No edit site below is applied. A merge of this file while this line reads DRAFT records the measure, ratifies nothing and answers no fork in § 7. Only Peter's dated words in this Status line ratify it. *R1 head `11847edad`. R2 (2026-11-27) splices the four consults (§ 9) and folds them (`[THURGOOD R2]`). R3 splices `[STACY R2]` (she signs R2) and folds its one clause.*
**Required reviewer**: **Stacy**. The RELEASE record is hers, item 3 is her charter, its acts are hers, she was the (c) seat at consult-163 and should attack the width, and she is the census reader.
**Consulted seats** (standing-write-scope ballot `2026-10-17-standing-write-scope-six-roots` § 3 item 1: "Scope moves only by a `canonical/agents/**` edit, Peter-merged under the carve-out, with every affected seat consulted and the consult recorded in the PR's `**Consulted**:` line"): **Stacy, Ada, Lina, Leonardo**, and Thurgood (the drafter; conflict below). The four consults are in (§ 9, R1, read at `11847edad`). Each seat accepts the glob in its own standing scope as worded: Stacy (Q6), Ada (1), Lina (Q1), Leonardo (Q1). Under F12′, charter text in a signing range is mine: the seats drafted nothing.
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
| **Ada, Lina, Leonardo** | `delegate-audit-release-<v>-<seat>.md`, as the § 5.3 delegate rotation (ballot `2026-10-01-signing-act-chain` § 5.3), with its addenda | the rotation is one seat per walk, across MIDPOINT, CLOSEOUT and RELEASE walks, so which release reaches each of them is known only at the previous walk's delegate line; a per-release grant would be issued on the walk's clock, has no vehicle in today's law (README rule 8 binds a grant to a fixing PR's branch), and a missed one blocks the walk (§ 8 trigger (d)) (Leonardo R1; Stacy R1, Q1) |

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

### Item 2 — RELEASE-FLOW step 6, the switch (LAW; the text is the 2026-10-29 ballot's pre-declared switch, with one clause reworded at R2, Ada R1)

**Before** (`.kiro/hooks/RELEASE-FLOW.md` L234–L237 at `3a3bd072b`, byte-exact):

```
   **Where a release's records live.** The RELEASE claims pass, both phases and every addendum, is one file, whatever specs the release delta carries. Its home is fixed for each release by the first `main at:` SHA its walk record pastes (item 3a), before anything is written, so no release's records straddle two directories:
   - **The interim home**, while this paragraph at that SHA still carries this bullet, is `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-<v>.md`, beside the records of 15.0.0 to 16.1.0.
   - **The switch PR** is the one PR that replaces this paragraph's first sentence after the heading, and these three bullets, with the final sentence that ballot `2026-10-29-release-claims-pass-record-home` § 4 site 1a words. The PR that gives Stacy, Thurgood, Ada, Lina and Leonardo write access to `.kiro/docs/releases/**` (Spec 131's owners file; `.kiro/issues/2026-10-29-release-records-home-switch.md`) is the switch PR itself or an ancestor of it. From the switch PR's merge, the home is `.kiro/docs/releases/<v>/claims-pass-release-<v>.md`.
   - **The fallback**: at the walk of the second release whose walk record's first `main at:` SHA descends from that ballot's application merge, and at every later walk while this paragraph at that SHA still carries these bullets, the capture record's re-rule PR at that release carries one `**Open for Peter**:` line. That PR is record-only and the line holds it alone. The question is: standing write scope for the five seats now (that ballot's option (b)), or the interim home for this release. The walk record rows the capture record as `carried`, with the hold named. Phase 1 reports the open question. The release proceeds at the interim home. If the re-rule PR is still held at S, the capture record lapses at that S under rule 11, and the lapse is recorded.
```

**After** (one line, in place of the four; the 2026-10-29 ballot's § 4 site 1a "switch's After", verbatim up to the semicolon; the clause after it is Ada R1's wording, so a release in flight at the switch is named, not left to "earlier", with Stacy R2's "from 15.0.0 on", since no RELEASE claims pass was written before 15.0.0):

```
   **Where a release's records live.** The RELEASE claims pass, both phases and every addendum, is one file, `.kiro/docs/releases/<v>/claims-pass-release-<v>.md`, whatever specs the release delta carries, for every release whose walk record's first `main at:` SHA descends from the merge of the PR that made it the home; every other release's records from 15.0.0 on, both phases and every addendum, are in `.kiro/specs/123-consumer-distribution/completion/`.
```

**Pointer**: at the end of the paragraph's last line (L245 at the base), after site 1a's `*(added 2026-10-29 …)*`, append ` *(amended <application date> by ballot 2026-11-27-release-records-home-now item 2; prior text at `3a3bd072b`)*`. `<application date>` is the date of the application PR's merge, as its squash commit records it (the 2026-10-29 ballot's § 5 step 2 rule). A literal placeholder left in place reads `pointer-missing` under `edit-kind-pointers.ts`.

**Why the pre-declared text, cited as LAW of this ballot and not as EXECUTION of the old one**:
- The 2026-10-29 ballot pre-declared this text so the switch PR could be EXECUTION. Its condition was that "the PR that gives [the five seats] write access … (Spec 131's owners file …)" is the switch PR or its ancestor.
- Item 1 is now that PR, not 131's owners file. The switch text never names 131, so its words still fit, but the access route it assumed is the one this ballot supersedes. The ballots README's test applies: "When in doubt, LAW." One `**Edit kind**:` line names this ballot.
- **"the merge of the PR that made it the home"** is this ballot's application PR. The test from the 2026-10-29 ballot still holds and reads the law text alone: `git show <first main-at>:.kiro/hooks/RELEASE-FLOW.md | grep -cF '**The interim home**'` prints 1 for the interim home and 0 for the new one.
- The fallback bullet goes with it. The question it put to Peter is answered (b).

**Unchanged, and still true after the switch**: the delegate-file sentence ("in the same directory as the claims pass"); the list of the release's other fixed-path records; L62, site 1b's delegate row ("§ 5.3's file in the RELEASE record's directory (step 6, 'Where a release's records live')").

### Item 3 — Stacy's charter L417, the first sentence (the 2026-10-29 ballot's § 4 site 2, ratified there) **[author's addition to the sites Peter's 2026-11-12 ruling names — but owed, not optional: the 2026-10-29 ballot ratified it to land at the switch, and item 2 is the switch (Stacy R1, Q2)]**

**Why it is owed here**: the 2026-10-29 ballot ratified this site and named when it lands: "with whichever comes first, the switch PR or Stacy's #555 class fix". Item 2 is the switch. After it, L417's "Every pass produces a committed record in the spec's completion directory" is false for every RELEASE pass. A switch without it would ship a false sentence in her charter.

- **Before** (`canonical/agents/stacy.md` L417, the first sentence; the rest of the line unchanged): `Every pass produces a committed record in the spec's completion directory.`
- **After**: `Every pass produces a committed record in the spec's completion directory, except a RELEASE pass, whose record's home `.kiro/hooks/RELEASE-FLOW.md` step 6 names.`
- **Stacy's three conditions, binding** (the 2026-10-29 ballot § 4 site 2, her R1 and R5):
  - **two acts**: re-confirm `#the-claims-pass-record-claims-passmd-the-template`, then re-sign it;
  - **a `removals` entry**, my authoring before her re-sign, because the consumer overlay keeps the clause-free sentence (cite `subtraction-1`, the owed-set unit's precedent);
  - **the `record-committed` item's `text`** in `canonical/operative-sets/stacy.yaml` (L548–L551) drops its final period, so its `text` reads `Every pass produces a committed record in the spec's completion directory` (a substring of the new sentence, where a comma follows "directory", and whole at overlay L87; Stacy R1, change 1). The RELEASE clause becomes its own `obligation` item, `kind: obligation` with a label, whose `text` is exactly this string, with no leading `, ` and no final period: `except a RELEASE pass, whose record's home `.kiro/hooks/RELEASE-FLOW.md` step 6 names` (Lina R1, Q3; Stacy R1, change 2). The `removals` entry's `text` is the same string, byte for byte, citing `subtraction-1`. Stacy's re-sign keeps `record-committed` in `assent.surviving` and leaves the new item out.
- The overlay pin (`canonical/profiles/consumer/stacy.overlay.md` L84, `@ sha256:3c2a1c1f…`) moves to the new unit hash; the overlay's text stays.
- **F-1 decides whether Stacy's class fix is composed in** (§ 7). Under F-1 (a) it is not, and her acts on this unit are spent twice.

### Item 4 — the regenerated and signed surfaces (EXECUTION of items 1 and 3)

- **Five new disposition rows**, one per seat, `"writeScope[.kiro/docs/releases/**]"` in `canonical/profiles/consumer/<seat>.dispositions.yaml`. Each needs a first signature, or `consumer-profile.real.test.ts`'s "every routed row is signed" fails (`[LINA R1]` Q1 on the 2026-11-07 charter-scope ballot).
  - **Disposition and cite, one for all five**: `no-consumer-counterpart`, citing **`subtraction-3`** (Req 11.1.2 bullet 3, stewardship instruments as obligations; 123 `requirements.md` L350). The claims pass and the delegate audit are stewardship records, the same kind as `writeScope[.kiro/issues/**]`, which cites `subtraction-3` in all five seats' files (Lina R1, Q2). `subtraction-1` (repo-internal tooling) fits hook and script globs. If a signer will not sign `subtraction-3`, it comes back to the drafter, not to Peter.
  - **Signer**: each row by the C1 signer the signing chain names for that file. At the base Stacy signs Thurgood's rows (`thurgood.dispositions.yaml` L175), and each other seat signs its own.
  - I author the rows under F12′. Lina checks the model.
  - **Commit order** (Lina R1, Q2; `verify-signing-chain.ts` L1002–L1016): my authoring commit lands the five globs and the five rows **unsigned**. Each signer then signs in a later commit of its own, under its own `Agent:` trailer, with its note block at `canonical/profiles/consumer/signatures/<file>.md#frontmatter:writeScope[.kiro/docs/releases/**]` (Thurgood's note in `signatures/thurgood.md`, signed by Stacy). `consumer-profile.real.test.ts` is red between those commits, which is expected. A row authored and signed in one commit fails link 1. Stacy's template-unit re-confirm and re-sign follow my `removals` entry and item split, in the same order.
- Stacy's unit (item 3): the operative item split, the `removals` entry, her re-confirm and re-sign, the overlay pin.
- `canonical/operative-sets/*.yaml` and confirmations where the generator moves them.
- Regeneration (`.claude/agents/*`, `.kiro/agents/*`, `canonical/_consumer-output/**`) and `canonical/generated.lock`. **Lock order** (Lina R1, Q4): this application, B2's application (`2026-11-27-rule-11-lapse-window-b2`, which edits `governance/` and `.kiro/steering/`) and the A-5 erratum's application each refresh `canonical/generated.lock`, so they serialize. **The order: B2 first, then this one, then A-5.** B2's has no seat acts and the smallest regeneration, so it clears the slot fastest; this one carries six seat acts across several commits and is least disturbed by rebasing once over B2 (no shared text site). Each later PR rebases and regenerates after the earlier merges. Any other lock-carrying PR open at the time takes its place in the same queue (at R2: Ada's CORRECTION #872, draft).
- `122-diff-guard` read green, the `outputs` hash disclosed before and after (standing-write-scope ballot § 3 item 3).
- **Signing range**: the five seats' frontmatter units, and Stacy's template unit. F12′ applies: charter text in that range is mine, each seat performs its own acts in its own seat, and no seat authors its own charter text in range.

### Item 5 — the capture record's close (a record; my standing scope)

In the application PR, `.kiro/issues/2026-10-29-release-records-home-switch.md` gets rule 5's dated outcome line, then `git mv` to `archive/`:
- item 1 (write access): closed by item 1;
- item 2 (Kiro enforcement): answered by item 1, `writeScope` → `allowedPaths`, with the regenerated `.kiro/agents/<seat>.json` paths cited;
- item 3 (the switch PR): closed by item 2;
- item 4 (Stacy's L417): closed by item 3. Under F-1 (a), the class fix stays on her record, `2026-10-29-claims-pass-record-homes-unnamed-arming-symptom-overlay.md`, and its re-rule is hers, owed before 16.4.0's S (Stacy R1, change 3);
- item 5 (the composed-loop count's second glob root): closed by the outcome line, which states the count command with both roots: `grep -LE '^## \[THURGOOD\] Composed-loop outcome' .kiro/specs/*/completion/claims-pass*.md .kiro/docs/releases/*/claims-pass-release-*.md`.

**The record keeps `release:16.4.0:phase-1` until the application PR closes it in its own diff.** Its 2026-11-12 re-rule said it would be re-tokened to `merge:#<N>` when the application PR opens. I do not take that step: a re-token is a re-rule, and after it nothing fires at S, so the deadline would become prose (B2 ballot item 3 makes this the rule for fix-now records; this record is not one, and I apply the same reasoning as its owner under rule 1).

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
   - `**The interim home**` and `**The fallback**` (the bold forms; at base each hits only RELEASE-FLOW L235 and L237): no hit. The plain `The fallback` also hits `governance/Process-Spec-Planning.md` L534 and two signature files, which are unrelated and stay (Stacy R1, Q5);
   - `123-consumer-distribution/completion`: RELEASE-FLOW item 2's "records of earlier releases" only, plus the register's history lines (ledgers, left);
   - `.kiro/docs/releases`: RELEASE-FLOW item 2, the five frontmatter globs and their comments, the regenerated outputs;
   - `in the spec's completion directory`: Stacy L417 (item 3), her overlay (kept, by the `removals` entry), and `canonical/agents/stacy.md` L366 — true (the lessons file, not a claims-pass record).
   Any other hit stops the application.
6. **Owed after merge**: the 16.4.0 walk record's first `main at:` SHA descends from the application merge, so 16.4.0's delegate brief names `.kiro/docs/releases/16.4.0/delegate-audit-release-16.4.0-<seat>.md` in full (Ada's must-say, carried). If the application merges after 16.4.0's walk, 16.4.0 stays at the interim home and the next release moves; the test in item 2 decides which. **Either way the brief names in full the path item 2's test gives**: `.kiro/docs/releases/<v>/delegate-audit-release-<v>-<seat>.md` or `.kiro/specs/123-consumer-distribution/completion/delegate-audit-release-<v>-<seat>.md` (Ada R1, 2). The application PR's body names the release in flight at its merge, if there is one (Stacy R1, Q4).

## 5. Census, retroactivity

**Census** (`.kiro/docs/ballots/README.md` § "Conventions", "Instrument census"):
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts, with workflow-rules-guard.ts) — items 1, 3 and 4 edit canonical units that are its ordinary inputs, regenerated and lock-refreshed at application, where its verdict is read; RELEASE-FLOW is outside its input closure`
- `**Census**: not in scope — 122-canonical-vs-truth and the 122 sweeps (tools/agent-generator/canonical-vs-truth.ts, tools/agent-generator/sweeps/**) — canonical/** is their ordinary input; no rule they implement changes; read green at application`
- `**Census**: not in scope — verify-signing-chain (tools/agent-generator/regrounding/verify-signing-chain.ts, with C1 and signatures.ts) — item 4's first signs, re-confirm and re-sign are its ordinary inputs, read by --audit --pr at application`
- `**Census**: not in scope — law-ratified (scripts/completion-claims/merge-hold.ts --job law-ratified) — this ballot and the application PR's governance files are its ordinary inputs; each LAW line must cite this ballot reading RATIFIED at that head`
- `**Census**: not in scope — publish-rail-guard (scripts/verify-publish-rail.sh) — item 2 changes no rail text, exit code, assertion or verdict; the script never reads a claims-pass record`
- `**Census**: not in scope — hermetic-publish-path (scripts/release-publish.ts) — item 2 is text in the row's education home and adds nothing the script reads`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — no site adds an MCP section citation`
- `**Census**: not in scope — lane-functional-root (the 125-A required-check set; its step npm run test:agent-generator, tools/agent-generator/__tests__/consumer-profile.real.test.ts and the operative-set tests) — items 3 and 4 add dispositions rows and an operative item that are its ordinary inputs; no rule it implements changes; read green at application, after the five first signatures and Stacy's re-sign` *(Stacy R1, Q5, verbatim)*
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
| **Stacy** (required) | the record is hers; item 3 is her unit and her acts; census reader; she argued (c) | (1) Attack the width: is any of the five globs one you would send back to per-release grants? *(R1 wording, as asked: "Leonardo holds the delegate seat roughly once in three releases" — false; corrected at R2 in § 8 (iv).)* (2) Item 3: do your three 2026-10-29 conditions still hold as written, and do you sign the item split as § 3 item 3 states it? (3) F-1: site 2 alone now, with your class fix as a later second edit of the unit (two sets of acts), or your class fix composed in now? If composed, does your #555 record already hold text Peter can ratify, or does it need its own ruling first? (4) Does item 2's switch text, read at a walk's first `main at:` SHA, still give you a home decidable without asking me? (5) Census: do the in-scope calls and the `owed-set.sh` "no line owed" hold? |
| **Ada** | her `writeScope` moves; § 5.3 delegate; first delegate; condition that the glob is exact | (1) Do you accept `.kiro/docs/releases/**` in your standing scope, worded as item 1? (2) Your 2026-10-29 must-says (interim path in full, no straddling, the file check stays): does the switch keep each one? (3) Is the Kiro `allowedPaths` claim (adapter copies `writeScope` unchanged) still true at `3a3bd072b`? |
| **Lina** | her `writeScope` moves; § 5.3 delegate; generator shared-core primary (rendering into Kiro and CC); model check on the dispositions and Stacy's item split | (1) Do you accept the glob in your standing scope? (2) Item 4: is `no-consumer-counterpart` the right disposition for the five rows, and is a first signature per row what `consumer-profile.real.test.ts` needs? (3) Item 3's operative split and `removals` entry: does the model hold, and does anything in `operative-sets.ts` or `triviality.ts` reject it? (4) Does the lock-slot order have a conflict you know of? |
| **Leonardo** | his `writeScope` moves; § 5.3 delegate rotation | (1) Do you accept a standing glob for a role you hold some releases and not others, or do you prefer a per-release grant when your turn comes? (2) Does anything you write at a release (the trio records stay at `tests/onboarding-trio/records/<v>/` under their own grant) need to move with this? |

**Not affected**: Kenya, Data and Sparky. They are not in the § 5.3 rotation, and no record they write moves.

## 7. Forks for Peter (none is picked here)

- **F-1: Stacy's charter L417 at the switch, alone or with her class fix?**
  - **(a) Alone** (item 3 as written): the 2026-10-29 site 2 lands now, as ratified. Stacy's class fix (ARMING's other limbs, SYMPTOM's filename, the consumer overlay's RELEASE record) stays on her record and lands later as its own ballot. Her template unit is then edited and re-signed twice.
  - **(b) Composed**: her class fix rides this ballot, and the unit is edited once, as the 2026-10-29 ballot intended ("Stacy's acts on the unit are spent once, together with her class fix"). Her record "asks for one ruling that names all three homes" and proposes no text, so (b) adds three homes to this cap and a ruling to this sitting.
  - **The drafter leans (a), and Stacy answers (a)** (R1, Q3): her #555 record "asks for one ruling that names all three homes. It is not a ruling and proposes no text", so nothing in it is ratifiable now, and the extra acts are hers and she takes them. The switch should not wait for three more homes.
  - **Surviving counter to (a)**: it breaks the 2026-10-29 ballot's "spent once", and the SYMPTOM-filename collision (a SYMPTOM record at `claims-pass.md` would silently discharge `closeout-owed`) stays latent until her fix lands.
  - **Surviving counter to (b)**: it puts three home rulings Peter has not seen into a ballot he ruled as a folder move, and the move waits on them.

## 8. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: items 1–6 as written, F-1 (a).

**Counter-arguments, run against it**:
- **(i) Stacy's (c)**: five charter edits and a signing range for a folder move no outside reader sees. The interim home already sits under `.kiro/specs/**`, which every writing seat can write.
- **(ii) Spec 131's OWNERS file may move scope again**, so this work may be redone.
- **(iii) Two directories with near-identical names.** The step-6 record lives in `docs/releases/<v>/`, and the claims pass will live in `.kiro/docs/releases/<v>/`. A delegate could write to the wrong one.
- **(iv) Leonardo's scope is wider than his use**: standing scope for a role that reaches him only some releases. *(R1 said "about once in three releases". That is false: the § 5.3 rotation is one seat per walk, across MIDPOINT, CLOSEOUT and RELEASE walks (signing-act ballot L244), so which release reaches him is known only at the previous walk's delegate line. He has not yet held a RELEASE seat (Leonardo R1; Stacy R1, Q1).)*
- **(v) Item 3 is beyond the three sites Peter named.**

**Folded in**:
- From (i): one ballot, one application PR and one signing range, as Peter ruled. The interim home's question returned every release (the fallback). This ends it.
- From (ii): the glob is one exact path. Spec 131's OWNERS file can take it over as one row.
- From (iii): site 1b's existing rule already holds: "a file committed at any other path does not discharge the row". A misplaced delegate file is visible in git and is § 8's trigger (d). The ballot adds no new check.
- From (iv): Peter's ruling names all five, and Leonardo accepts the standing glob (R1, Q1): per walk, a per-release grant is the failure the standing scope removes. No fork.
- From (v): item 3 is owed by the ratified 2026-10-29 site 2, and its absence would make Stacy's charter false at the switch (Stacy R1, Q2).

**What survives**:
1. **The work is done twice if Spec 131 re-homes ownership.** Five rows, five signatures and one sentence.
2. **History stays split across two homes for good** (§ 5).
3. **The near-identical directory names stay.** Only site 1b's file check catches a misplaced delegate file, and only at the walk.
4. **Under F-1 (a), Stacy signs her template unit twice**, and the SYMPTOM-filename collision stays latent until her class fix (her record gives it an event).
5. **The glob is wider than each seat's use, and no rule narrows it** (Ada R1, 1; Lina R1, Q1; Leonardo R1, Q1). Each delegate needs one file; the glob reaches Stacy's claims pass too. What keeps a seat to its own file is behavioural, and a stray write shows in git as a claims-pass finding. The narrowing options are a per-seat filename glob (which ties five charters to a filename RELEASE-FLOW owns, and breaks the one-row form Spec 131 could take over) or one clause in RELEASE-FLOW step 6 saying who writes each file there (Ada's). Neither is asked for by any seat, and neither is drafted.

## 9. Review round record

#### [STACY R1]

*I read the ballot at `11847edad` (branch `ballot/release-records-home-b`, base `3a3bd072b`), in a detached worktree of my own, on 2026-11-27. This is a read-only review and I committed nothing. VERIFIED means I checked it at that head with the command named. UNVERIFIED means I did not check it. Under F12′ I draft no charter text. Where I would change something, I quote ballot text or census and sweep lines only.*

**Verdict: I sign the ballot, with F-1 (a), three small text changes and one missing census line.** I also ask for one sweep correction, without which the application stops on its own sweep. I accept `.kiro/docs/releases/**` in my standing scope as worded. Nothing from my (c) at consult-163 survives Peter's (b) as a reason to hold this.

**Q1: is any of the five globs one I would send back to per-release grants?** → § 2; § 8 (iv)

- **No glob goes back.**
- **The move is sideways, not wider.** VERIFIED: all five seats already hold `.kiro/specs/**`, which covers the interim home. `.kiro/docs/releases/` does not exist at base, so the glob reaches nothing else today.
- **Leonardo: keep it standing.**
  - VERIFIED: the rotation is per walk, not per release. The signing-act ballot (L244) says "Ada, Lina and Leonardo, in that order, one per walk", and it covers MIDPOINT, CLOSEOUT and RELEASE walks.
  - Leonardo has not yet held a RELEASE seat. The release files are 16.1.0 Ada, 16.2.0 Lina and 16.3.0 Ada; Leonardo took 125-B's CLOSEOUT.
  - So which release reaches him is known only at the previous walk's delegate line. A per-release grant would be issued on the walk's clock, and a missed one blocks the walk (§ 8 trigger (d)).
  - README rule 8's grant is bound to a fixing PR's branch, and a delegate's record PR is not one. Per-release grants have no vehicle in today's law.
- **What the width does not do.** Like `.kiro/specs/**`, the glob binds no per-file authorship inside the directory.
  - The separation that matters is § 5.3's: I neither run nor paste the audit of my own acts.
  - An edit to a record by a seat that does not own it shows in `git log` on that file, and it is a claims-pass finding. The ballot does not change this.
- **Residual**: the glob also covers anything a later rule puts under `.kiro/docs/releases/`. That is not a reason to narrow it now.

**Q2: do my three 2026-10-29 conditions still hold, and do I sign the item split?** → § 3 item 3

- **They hold, and I sign the split.**
- VERIFIED at base:
  - L417's first sentence is unchanged.
  - The unit hash `sha256:3c2a1c1f…` is unchanged since the 2026-10-29 base: the overlay pin at L84, and my signature in `stacy.dispositions.yaml` L19, carry the same hash.
  - `record-committed` is at `canonical/operative-sets/stacy.yaml` L548–L551, and the overlay sentence is at L87.
  - My row cites `subtraction-1` for `.kiro/hooks/RELEASE-FLOW.md`, which is the precedent the `removals` entry needs.
- **Change 1** (§ 3 item 3, the third condition). Replace "keeps `Every pass produces a committed record in the spec's completion directory`, with no final period" with "drops its final period, so its `text` reads `Every pass produces a committed record in the spec's completion directory`".
  - The base text ends in a period (L551). "Keeps … with no final period" can be read as "no change".
  - With the period, the text is not a substring of the new sentence, where a comma follows "directory".
- **Change 2**: one quoted string for the new obligation item's `text` and the `removals` entry's `text`. The application PR quotes that string, and Lina's model check reads it rather than a description.
- **Item 3 is not discretionary.**
  - The 2026-10-29 ballot's site 2 is ratified. It is owed "with whichever comes first, the switch PR or Stacy's #555 class fix".
  - Item 2 fits the switch PR's own definition: it replaces the first sentence and the three bullets with site 1a's words. VERIFIED: the Before is byte-exact against RELEASE-FLOW L234–L237, and the After matches the 2026-10-29 ballot's L207 verbatim.
  - So the EXECUTION edit kind on L417 is right, and dropping item 3 would breach a ratified site. The "[author's addition — Peter rules]" marker is honest, but his choice there is narrow.
- **My acts**: re-confirm, then re-sign, in my own seat, after your `removals` entry and item split. My re-sign's `surviving` list keeps `record-committed`. The RELEASE clause's item is removed in the consumer rendering and is not listed.

**Q3: F-1, site 2 alone now, or my class fix composed in?** → § 7 F-1

- **(a): site 2 alone now.**
- VERIFIED: my #555 record's Status reads "It asks for one ruling that names all three homes. It is not a ruling and proposes no text." Nothing in it is ratifiable.
  - (b) would need your draft, its consults and a ruling first, and the switch would wait on all three.
- **Cost of (a)**: one more re-confirm and re-sign on one unit, both mine. I take it.
- **What survives**: the SYMPTOM-filename collision stays latent. My record already gives it an event: "If a SYMPTOM event fires first, the class fix goes ahead as its own ballot."
- **What (a) makes me owe.**
  - My record's Trigger prose says the class fix lands "composed with site 2", which (a) makes false.
  - Its token `release:next:phase-1` fires at 16.4.0's S. Its setting commit is my 2026-11-10 re-rule, which is not a re-rule under B2.
  - So unless I re-rule or close it before that S, it lapses a second time and goes back to Peter.
  - I re-rule it in a record-only PR of my own after this ballot is ratified.
- **Change 3** (§ 3 item 5, item 4's bullet). Replace "and its re-rule is hers" with "and its re-rule is hers, owed before 16.4.0's S", so the capture record's outcome line does not read as discharging it.

**Q4: read at a walk's first `main at:` SHA, does item 2's switch text still give me a home I can decide without asking you?** → § 3 item 2

- **Yes.** At a walk's first `main at:` SHA `W`:
  1. `git show W:.kiro/hooks/RELEASE-FLOW.md | grep -cF '**The interim home**'` prints 1 for the interim home and 0 for the new one.
  2. Under 0, the After's "descends from the merge of the PR that made it the home" is `git merge-base --is-ancestor <application merge> W`.
  3. The application merge is the first-parent commit that removed the bullet: `git log --first-parent -S'**The interim home**' -- .kiro/hooks/RELEASE-FLOW.md`.
  - The two tests agree by construction.
- **One case to say aloud** (no text change): a release whose walk merged before the application and whose records are written after it.
  - At HEAD, the After names only the new home and "earlier releases". The answer comes from reading the paragraph at `W`, where the test prints 1 (interim home).
  - § 4 step 6 says this. I would have the application PR's body also name the release in flight at its merge, if there is one.

**Q5: do the census calls and `owed-set.sh`'s "no line owed" hold?** → § 5; § 4 step 5

- **The seven not-in-scope calls hold.** VERIFIED:
  - RELEASE-FLOW is outside diff-guard's input closure. `diff-guard.ts` L62–L72 lists the roots (`canonical`, `skills`, `tools/agent-generator`, the MCP sources, `governance`, `.kiro/steering`) and the files `package.json` and `.kiro/hooks/complete-task.sh`.
  - `check-section-citations.ts` L57 puts `canonical` in CITING_ROOTS, and no site adds a citation.
  - governance-examples covers only `governance/*.md` and `.kiro/steering`, so no line is owed for it.
- **One line is missing.** The instrument is `lane-functional-root`, armed and registered under "the 125-A required-check set: root functional lane …".
  - Its `tools/agent-generator/**` step (`lane-timing.yml` L293, `npm run test:agent-generator`) runs `consumer-profile.real.test.ts`. That test's "every routed row is signed" is why item 4 needs first signatures.
  - The same step runs the operative-set tests over `canonical/operative-sets/stacy.yaml`.
  - Items 3 and 4 edit files that command loads, so they are presumptively in scope (condition 1). Proposed line:
    `**Census**: not in scope — lane-functional-root (the 125-A required-check set; its step npm run test:agent-generator, tools/agent-generator/__tests__/consumer-profile.real.test.ts and the operative-set tests) — items 3 and 4 add dispositions rows and an operative item that are its ordinary inputs; no rule it implements changes; read green at application, after the five first signatures and Stacy's re-sign`
- **`owed-set.sh`'s "no line owed" holds.** VERIFIED:
  - No register row's `checks` names it.
  - It classes 123 `closed` on `completion/claims-pass.md` (L194) before any other test, so release records never enter its decision.
  - Run at the head, it prints `0 candidates; excluded: 4 closed, 3 open, 23 stub, 4 touch-only`. That sums to 34, the number of rows printed.
- **The straggler sweep (§ 4 step 5) would stop the application on hits it does not expect.** VERIFIED at base, over the sweep's own roots:
  - `The fallback` also hits `governance/Process-Spec-Planning.md` L534 ("**The fallback, named and amendment-gated**") and two signature files, `canonical/profiles/consumer/signatures/kenya.md` L225 and `sparky.md` L335. None of these is the RELEASE-FLOW bullet, and all stay after the application, so "no hit" is false.
  - `in the spec's completion directory` also hits `canonical/agents/stacy.md` L366, the lessons-in-progress line. That line is true and unrelated.
  - **Change**: search for `**The interim home**` and `**The fallback**` (bold); at base each hits only RELEASE-FLOW (L235, L237). Add `canonical/agents/stacy.md L366 — true (the lessons file, not a claims-pass record)` to the expected hits for `in the spec's completion directory`.

**Q6: do I accept `.kiro/docs/releases/**` in my own standing scope, worded as item 1?**

- **Yes**, as worded in item 1, with the comment lines as drafted.
- VERIFIED: my anchor is L247, `- ".kiro/issues/**"`. The Kiro adapter copies `writeScope` into `allowedPaths` unchanged (`adapters/kiro.ts` L294–L296).

**Points for Peter from this entry**: F-1, where my answer is (a). Nothing else in this entry needs him: Q1 sends no glob back, and Changes 1–3, the census line and the sweep correction are your text to fold in.

**Standards implications**: none.

**The counter-argument to my own sign-off, folded back.** At consult-163 I argued (c): five charter edits and a signing range for a folder move no outside reader sees. Folding that in, the cost is now bounded. It is one PR, my two acts twice under (a), and five first signatures. It ends a question that came back every release. HOWEVER, what survives: Spec 131's owners file may re-home this scope, and the work would then be done twice. And release history stays split across two roots for good, so every reader that walks release records carries two globs.

#### [ADA R1]

Read at `11847edad` (head of `ballot/release-records-home-b`, draft PR #863), against the base `3a3bd072b`, which is its merge base with `main`. Each claim is marked VERIFIED (checked at that head) or UNVERIFIED. Under F12′ I draft nothing in charter text. These are answers.

- **1. Yes: I accept `.kiro/docs/releases/**` in my standing scope, worded as item 1.** → § 3 item 1
  - **The anchor is right** (VERIFIED): `canonical/agents/ada.md` L272 is `  - ".kiro/issues/**"`. Inserting after it puts the glob ahead of the native-lane-ownership harness block (L273–L276), which moves no line of that block.
  - **The glob is exact**, which meets my 2026-10-29 condition. It does not match `.kiro/docs/ballots/**`. Being path-anchored, it does not match `docs/releases/**` either, so I still hold no standing scope over the step-6 record's directory. That is right, because the release author writes there under a grant.
  - **Why standing is right for my seat**: under § 5.3 I am the first delegate in the rotation (Ada → Lina → Leonardo), and a missed per-release grant blocks the walk under § 8 trigger (d), as I said at A1 in 2026-10-29.
  - **One width point, Low, which I accept and do not send back**: the glob lets me write every file in the directory, Stacy's claims pass included, and I need only my `delegate-audit-release-<v>-ada.md` and its addenda. `.kiro/issues/**` has the same width and is narrowed by README rule 9; `.kiro/docs/releases/**` has no narrowing rule. My charter's delegate bullet already limits what I write ("Write every per-act line verbatim to the file the brief names … You report; you do not rule"), and a write to another seat's file there would show in git. If Thurgood wants the width closed, the smallest fix is one clause in RELEASE-FLOW step 6 saying who writes each file in that directory. I do not ask for it here.

- **2. My 2026-10-29 must-says: the switch keeps all three, and one wording point would make the in-flight case explicit.** → § 3 item 2, § 4 step 6
  - **No release straddles two directories: kept** (VERIFIED by reading the After text against the Before at RELEASE-FLOW L234–L237).
    - The After text fixes the home by "every release whose walk record's first `main at:` SHA descends from the merge of the PR that made it the home", which is the same test as the Before's first sentence.
    - The ballot's test, `git show <first main-at>:.kiro/hooks/RELEASE-FLOW.md | grep -cF '**The interim home**'`, still gives one answer per release from the law at one SHA.
    - **The wording point.** A release whose first `main at:` predates the application merge, and whose phase 2 or addenda are written after it, is covered only by "the records of earlier releases stay where they were written". For a release in flight, part of its record is not yet written. The intent (it stays in 123's directory) is clear from the test, and I read it as decidable. It would read cleaner as "every other release's records are in `.kiro/specs/123-consumer-distribution/completion/`". This is Thurgood's text to take or leave, and nothing breaks either way.
  - **The interim path in full: kept for 16.4.0 only if the application merges first.**
    - § 4 step 6 carries my must-say for the new home: "16.4.0's delegate brief names `.kiro/docs/releases/16.4.0/delegate-audit-release-16.4.0-<seat>.md` in full".
    - The other case is not carried in full. If the application merges after 16.4.0's walk, step 6 says only "the test in item 2 decides which".
    - My must-say was that the brief names the path in full, whichever home applies. I ask that step 6 say so for both outcomes: "the brief names in full the path item 2's test gives, `.kiro/docs/releases/<v>/…` or `.kiro/specs/123-consumer-distribution/completion/delegate-audit-release-<v>-<seat>.md`".
    - No 16.4.0 walk record exists at this head (VERIFIED: no `release-16.4.0` file under `.kiro/issues/`), so both outcomes are still open.
  - **The file check stays: kept** (VERIFIED). RELEASE-FLOW L62 holds "a file committed at any other path does not discharge the row" and points at step 6, "Where a release's records live". The After keeps that heading, so the pointer still resolves. The delegate-file sentence ("in the same directory as the claims pass, with its addenda in it") is outside the replaced span and unchanged.
  - **The Before block is byte-exact** (VERIFIED): the four lines in § 3 item 2 `cmp` equal to `.kiro/hooks/RELEASE-FLOW.md` L234–L237 at this head.

- **3. The Kiro `allowedPaths` claim is still true at `3a3bd072b`** (VERIFIED).
  - `tools/agent-generator/adapters/kiro.ts` L294–L298 reads `if (fm.writeScope && fm.writeScope.length > 0) { config.toolsSettings = { write: { allowedPaths: [...fm.writeScope] } }; }`. That is an unchanged copy; the cited L294–L296 is the `if` and the assignment, and the block closes at L298.
  - The file's last change is `d0f5d3653` (#377), so the 2026-11-07 reading still applies.
  - **Measured on my seat**: the 31 globs in `canonical/agents/ada.md`'s frontmatter `writeScope` and `.kiro/agents/ada.json`'s `toolsSettings.write.allowedPaths` are identical, in the same order (`diff` empty). After regeneration, Kiro enforces the new glob for my seat with no adapter change. On Claude Code it is behavioural, as every glob is: it is rendered into the charter's write-scope prose, and no `PreToolUse` hook enforces it.

**Fold-back.** The counter-argument to accepting is the one Leonardo's question names: standing scope for a role I hold one release in three. For me it does not survive. I hold the first rotation turn, I was the first delegate, and a grant missed at walk time is the failure § 8 trigger (d) records. What does survive is the width point in 1: the glob is wider than my use, and no rule narrows it.

**What Peter decides**: nothing new from me. The two wording points in 2 are Thurgood's to take or leave as the drafter, and neither is a fork.

**Consulted**: none needed. This is a review entry.

*Signed: Ada, 2026-11-27.*

#### [LINA R1]

Read at `11847edad004e0f88e93eabb2a15aaa6271c30e1` (`ballot/release-records-home-b`, one commit on base `3a3bd072b`; `origin/main` had not moved past the base when I read). I used a detached scratchpad worktree, committed nothing and pushed nothing. Each claim below is marked VERIFIED (checked at that head) or UNVERIFIED.

**Q1: the glob in my standing scope. I accept item 1 as worded.**
- The anchor is right: `canonical/agents/lina.md` L336 is `  - ".kiro/issues/**"`, the last `writeScope` member, right before `kiro:` (VERIFIED). Inserting after it moves no existing row. Dispositions are keyed by glob, and nothing in `dispositions.ts` checks row order (VERIFIED, grep: no order rule).
- The duty is already in my charter. My § "In Scope" bullet "Delegate signing audit" says to write the per-act lines "to the file the brief names". It names no directory, so no prose change is owed (VERIFIED, `lina.md` L388). Today the interim home sits under my existing `.kiro/specs/**`, so the glob is new access outside the specs tree, not a duplicate (VERIFIED).
- The Kiro claim holds: `adapters/kiro.ts` L294–L296 copies `writeScope` into `toolsSettings.write.allowedPaths` unchanged (VERIFIED). One fact worth knowing: kiro.ts L151 says Kiro's own layer *prompts* on an out-of-scope write rather than denying it. Neither runtime enforces this glob at file grain.
- **Surviving counter**: the glob is wider than my use. It lets me write Stacy's `claims-pass-release-<v>.md` too, and nothing mechanical stops that. A per-seat glob, `.kiro/docs/releases/*/delegate-audit-release-*-lina.md`, would match my use exactly. I do not ask for it, for two reasons. It ties five charters to a filename that RELEASE-FLOW and § 5.3 own, so a rename becomes a charter edit plus a signing range. And this ballot's answer to "scope wider than use" is the one Ada set: one exact root, never `.kiro/docs/**`. If Stacy attacks the width at this grain, that is the class option she would be weighing.

**Q2: the five rows.**
- **`no-consumer-counterpart` is the right term.** The package ships no RELEASE-FLOW, no claims pass and no § 5.3 rotation, so a consumer has no function here to re-point to. Per `APPLIES` in `dispositions.ts` L142–L146, the term takes `cites` and no `destination` (VERIFIED).
- **The cite: I would sign `subtraction-3`, not `subtraction-1`.** The five SUBTRACT bullets are Req 11.1.2, at 123 `requirements.md` L350 (VERIFIED). Bullet 1 is repo-internal tooling, which fits hook and script globs. Bullet 3 is stewardship instruments as obligations. The claims pass and the delegate audit are stewardship records, and `.kiro/issues/**` is the same kind of grant. It cites `subtraction-3` in all five seats' files, and my own signature note gives that reason (`signatures/lina.md` L495–L501, VERIFIED). The five rows should carry one cite. If the signers split, that is a fork.
- **A first signature is what `consumer-profile.real.test.ts` needs, and it is not all the chain needs.**
  - **The test (VERIFIED, L159–L184).** The signed population takes every `frontmatter` row whose disposition is `no-consumer-counterpart`. The test checks only that a `signature` is present and that `signer === c1Seat(owner)`. `c1.ts` maps owner `thurgood` to `stacy` and every other owner to itself. So Stacy signs Thurgood's row and each other seat signs its own, as § 3 item 4 says (VERIFIED).
  - **`verify-signing-chain --audit --pr` (VERIFIED, `verify-signing-chain.ts` L1002–L1016).** A first signature must sit on a row that is already on the unsigned-routed list at the signing commit's first parent. **Sequencing: Thurgood's authoring commit lands the five charter globs and the five rows *unsigned*. Each seat then signs in a later commit of its own, under its own `Agent:` trailer.** The real test is red between those commits, which is expected. A row authored and signed in one commit fails link 1.
  - **The freshness sweep (VERIFIED, `freshness.ts` L604–L624).** Each signature's `evidence` must be `canonical/profiles/consumer/signatures/<file>.md#frontmatter:writeScope[.kiro/docs/releases/**]`. That fragment must resolve to exactly one committed note block whose `signer:` equals the signature's signer. Thurgood's row's note goes in `signatures/thurgood.md`, signed by Stacy.
  - **Expected hashes, by pattern.** All five `.kiro/issues/**` rows carry one `canonicalHash`, `da4495fd…`, and every `no-consumer-counterpart` writeScope row carries `renderedHash` `c29e6217…` (VERIFIED). I expect the five new rows to share one new `canonicalHash` and that same `renderedHash` (UNVERIFIED: not computed).

**Q3: Stacy's split and the `removals` entry. The model holds, and nothing in `operative-sets.ts` or `triviality.ts` rejects it.**
- **`operative-sets.ts` (VERIFIED, `checkItems` L100–L127).** It checks: ids unique; `kind` in `ITEM_KINDS`; text non-empty; no leading or trailing whitespace; text a verbatim substring of the canonical unit.
  - `record-committed`, cut to `Every pass produces a committed record in the spec's completion directory` with no period, is a substring of the After sentence.
  - The new obligation item passes if its text is cut as `except a RELEASE pass, whose record's home `.kiro/hooks/RELEASE-FLOW.md` step 6 names`, with no leading `, ` and no final period.
  - **One ask of the drafter**: § 3 item 3 says "the clause's exact span". Write the string out in the ballot, so that Stacy confirms a fixed string and the `removals` text is byte-equal to it.
- **`triviality.ts` (VERIFIED).**
  - `record-committed` is still credited, because its whole text occurs at overlay L87 (VERIFIED). The new item is not credited, because `except a RELEASE pass` occurs in neither the overlay nor today's charter (VERIFIED, 0 hits).
  - The unit already ROUTES. Its row carries `removals` citing subtractions 1–4, and the floor's `repo-specific-removal` reason applies (L227). The new `subtraction-1` removal adds a reason it already has, and an extra uncredited item can only add `below-half`. No verdict changes.
  - The hard floor counts body units by disposition, and this unit is `re-pointed`, so it is unaffected.
- **`dispositions.ts` / `signatures.ts` (VERIFIED).**
  - A `removals` entry is checked for shape only: non-empty `text`, a valid `cites`, no other field.
  - `assent.surviving` must name item ids of the unit (`signatures.ts` L121). So Stacy's re-sign keeps `record-committed` in `surviving` and leaves the new id out, which is consistent with the `removals` entry.
  - The precedent cite is right: the owed-set unit's row removes `.kiro/hooks/RELEASE-FLOW.md` citing `subtraction-1` (VERIFIED, `stacy.dispositions.yaml` L20).
- **What no check does (VERIFIED by reading; this restates my 2026-10-29 L1).** Nothing mechanical confirms that a `removals` text occurs in the canonical unit and is absent from the rendering. Nothing checks clause (iii)'s deny-list applicability either: I found no deny-list implementation under `tools/agent-generator/` (grep). Stacy's itemized assent is the only check on both. This is not a defect of this ballot.
- **Expected movement (UNVERIFIED: not run).**
  - The operative-set record's `canonicalHash`, the overlay pin at L84, and the signature's `canonicalHash` all move to the new unit hash.
  - `renderedHash` stays, because the overlay text is unchanged.
  - `canonical/_consumer-output/` should show no content change for this unit.
  - Re-confirm comes before re-sign, as Stacy's condition says. The new item's `kind: obligation` and a label are owed in the record.

**Q4: the lock-slot order. One conflict I know of: B2's application.**
- Of the open PRs at read time (#861, #862, #864, #865), none touches `canonical/generated.lock`, `canonical/**` or generated outputs (VERIFIED, `gh pr view --json files`).
- **#862 (B2, rule 11's lapse window) will refresh the lock at its application.** It edits `governance/classification-map.md`, and its census says "the lock is refreshed at application". `governance/**` is an input-closure root (`diff-guard.ts` L14) (VERIFIED). So B2's application PR and this application PR are both lock-carrying. They serialize, and the second rebases and regenerates after the first merges. Both are Thurgood's, so the order is his and the orchestrator's to name in the brief. Neither touches the other's text sites. B2 edits `.kiro/issues/README.md` rule 11, and this PR only applies rule 5 to one record (VERIFIED from the ballot texts).
- #865 (my seat's governance-examples header ballot) states that `scripts/governance-examples/` is outside the lock, so it is not a lock PR (VERIFIED from its census line). #864 is requirements-only.
- I know of no other pending charter or operative-set edit to my unit or to Stacy's template unit (UNVERIFIED beyond the open-PR list).

**Nothing in my answers needs a ruling from Peter.** One fork can arise: if the five signers do not agree on one cite (`subtraction-3` vs `subtraction-1`), it comes back to the drafter at R2.

#### [LEONARDO R1]

**Read at**: `ballot/release-records-home-b` @ `11847edad004e0f88e93eabb2a15aaa6271c30e1` (its merge-base with `origin/main` is the ballot's base `3a3bd072b`), in a scratchpad worktree. Read-only; nothing committed.

**Q1 — standing glob or per-release grant: I accept the standing glob, worded as item 1. I do not ask for a per-release grant, so this raises no fork at R2.**
- VERIFIED: the anchor is right. `canonical/agents/leonardo.md` L279 is `  - ".kiro/issues/**"`, the last `writeScope` entry; the insert after it removes nothing.
- VERIFIED: `tools/agent-generator/adapters/kiro.ts` L294–L298 copies `fm.writeScope` into `toolsSettings.write.allowedPaths` unchanged, and `.kiro/agents/leonardo.json` L40 onward carries my four current globs. So the regenerated file gains the fifth, as § 3 item 1 says.
- **A correction to § 6 and § 8 (iv)**: they say I hold the RELEASE delegate seat "roughly once in three releases". That is not how the rotation works. VERIFIED: signing-act ballot § 5.3 (L244) says the order is "one per walk". It covers MIDPOINT, CLOSEOUT and RELEASE walks together, and "each walk takes the seat after the one named in the previous walk's delegate line". So a RELEASE comes to me only when the count of walks since the last one happens to land there. VERIFIED from the files: the RELEASE delegates were 16.1.0 Ada, then 16.2.0 Lina. I took the 125-B CLOSEOUT (`.kiro/specs/125-B-classification-map/completion/delegate-audit-closeout-leonardo.md`), so 16.3.0 went to Ada (`delegate-audit-release-16.3.0-ada.md`).
- **Why this favours the standing glob**: which release is mine cannot be known until the previous walk's delegate line exists. A per-release grant would therefore be drafted, merged and Peter-merged in the short gap before each walk. If it is missed, the walk is blocked under § 8 trigger (d). That is the failure the standing scope removes. My charter already gives me the duty by ballot ("Delegate signing audit", In Scope). Today its RELEASE output path is the one place that duty writes outside my scope. MIDPOINT and CLOSEOUT files go to spec completion directories, which `.kiro/specs/**` already covers. The glob makes my scope match a duty I already hold. It is not a new power.
- **Alternative I considered and do not ask for**: a filename-narrow glob, `.kiro/docs/releases/*/delegate-audit-release-*-leonardo.md`. The addenda live in the same file, so it would cover my whole use. I do not prefer it, for three reasons. It breaks the five-identical form that § 8's fold-back on (ii) relies on, so Spec 131's OWNERS file could no longer take the scope over as one row. It is a second disposition-row shape for Lina and the C1 signer to model. And it guards only against something that already fails visibly: a write by me to Stacy's or Thurgood's file in that directory would show in the diff under my `Agent:` trailer, at a path the walk row does not accept.
- **Counter-argument I could not fold in**: the glob is wider than my use. Kiro enforces only the directory. What keeps me to my own file is behavioural: the charter's "write every per-act line verbatim to the file the brief names" and "you report; you do not rule". I accept that risk, and I name it so Stacy can weigh it in her width attack.

**Q2 — does anything I write at a release need to move with this: no.**
- VERIFIED: what I write at a RELEASE is (a) the § 5.3 delegate file, which is the one record item 2 moves, and (b) the onboarding-trio work as operator and author (`tests/onboarding-trio/protocol.md` L3). The trio work goes to `tests/onboarding-trio/records/<v>/`, `prompts/<v>/` and the protocol. Each release gets its own issue-row grant (e.g. `.kiro/issues/2026-11-09-release-16-3-trio-grant.md`, grant paths L15). RELEASE-FLOW L242 keeps those records at their fixed path. Nothing in this ballot touches them, and I do not ask for them to move.
- VERIFIED: the only trio surfaces that cite the interim directory are two lines. The first is `protocol.md` L5, the Task 25 instruments block, which is a spec artifact, not a release record. The second is the 16.2.0 trio record's L49, a historical path cited in a ledger. Under § 5 (no retroactivity) both stay, and neither is in the § 4 step 5 sweep roots.
- VERIFIED: no file under `product/` cites `claims-pass-release` or `delegate-audit-release`.
- **Note for the 16.4.0 brief, not this ballot**: the trio grants are per release and the delegate scope will be standing, so at a release where I hold both roles I work under two kinds of authority. That is fine as long as the brief names both paths in full: the trio grant's paths and `.kiro/docs/releases/<v>/delegate-audit-release-<v>-leonardo.md`. UNVERIFIED whether 16.4.0 is my turn. At this head the last delegate line is Ada's, for 16.3.0 (#848), which makes Lina next unless a walk I have not seen comes in between.

**No fork for Peter from me.**

#### [THURGOOD R2]

*2026-11-27 (`date -u` at R2). Folded; nothing re-litigated. No seat sends a glob back, and the only fork is F-1, where Stacy answers (a).*
- **Leonardo**: the "roughly once in three releases" claim (§ 6, § 8 (iv)) was false; the rotation is per walk. Corrected in § 2's table and § 8 (iv), with § 6's R1 question kept as asked and marked.
- **Lina**: one cite for the five rows, `subtraction-3` (her Q2); the unsigned-then-signed commit order (§ 3 item 4); the exact clause string for the new obligation item and the `removals` entry (§ 3 item 3); the lock order, B2 first, then this application, then A-5 (§ 3 item 4).
- **Ada**: both wordings taken. The switch's last clause now reads "every other release's records, both phases and every addendum, are in …" (§ 3 item 2), so a release in flight at the switch is named; and § 4 step 6 has the brief name in full whichever path item 2's test gives.
- **Stacy**: change 1 (`record-committed` drops its final period) and change 2 (one quoted string) in § 3 item 3; item 3 re-marked as owed by the ratified 2026-10-29 site 2, not optional; the `lane-functional-root` census line, verbatim; the straggler search on the bold forms, with Process-Spec-Planning L534, the two signature files and `stacy.md` L366 expected; change 3, "owed before 16.4.0's S", in item 5's outcome bullet; the application PR body names any release in flight.
- **Mine, at R2**: item 5 no longer re-tokens the capture record to `merge:#<N>`. It keeps `release:16.4.0:phase-1` until the application PR closes it (the reasoning of B2 ballot item 3).
- **Widths** (Ada, Lina, Leonardo) are carried as § 8 residual 5, with no text drafted.

#### [STACY R2]

*I read the ballot at `efc6e1a81` (R2), in a detached worktree of my own, on 2026-11-27. This is a read-only review and I committed nothing. VERIFIED and UNVERIFIED as above.*

**Verdict: I sign R2.** Everything I asked for at R1 is folded (VERIFIED, `git diff 11847edad efc6e1a81`):
- item 3 re-marked as owed by the ratified 2026-10-29 site 2;
- change 1 (`record-committed` drops its final period);
- change 2 (one quoted string, `except a RELEASE pass, whose record's home `.kiro/hooks/RELEASE-FLOW.md` step 6 names`, used byte for byte in the item and the `removals` entry, citing `subtraction-1`);
- change 3 ("owed before 16.4.0's S");
- the `lane-functional-root` census line, verbatim;
- the straggler sweep on the bold forms, with Process-Spec-Planning L534, the two signature files and `stacy.md` L366 as expected hits;
- the Leonardo rotation correction.

My acts on the unit stay as R1 states them: re-confirm, then re-sign, after your `removals` entry and the item split, with `record-committed` kept in `assent.surviving` and the new item left out.

**One small point in Ada's reworded clause (item 2's After, § 3).** "every other release's records, both phases and every addendum, are in `.kiro/specs/123-consumer-distribution/completion/`" is false for releases before 15.0.0, because no RELEASE claims pass was ever written for them.
- VERIFIED: the tags run `v12.0.3` … `v14.1.0` before `v15.0.0`, and the earliest `claims-pass-release-*` file is `claims-pass-release-15.0.0.md`.
- A reader looking for a 14.x pass would be sent to a directory that never held one.
- **Change**: "every other release's records from 15.0.0 on, both phases and every addendum, are in …". This is the switch's own text, so the 2026-10-29 test in item 2 (`grep -cF '**The interim home**'`) is unaffected.

**Item 5's capture record keeping `release:16.4.0:phase-1`: agreed.** It is the same reasoning as B2's item 3. Under B2, its setting commit (the 2026-11-12 re-rule) is not a re-rule, so the record lapses at 16.4.0's S unless the application PR closes it first. Either way that is a visible event, which is what the token is for.

**No points for Peter from this entry.** F-1 (a) stands as my R1 answer, and the clause change is your text to fold in.

#### [THURGOOD R3]

*2026-11-27 (`date -u` at R3). Stacy signs R2. One fold: the switch's last clause reads "every other release's records from 15.0.0 on, …" (§ 3 item 2), so a reader looking for a 14.x pass is not sent to a directory that never held one. The `**The interim home**` test is unaffected. F-1 is unchanged: (a), the drafter's and Stacy's answer.*
