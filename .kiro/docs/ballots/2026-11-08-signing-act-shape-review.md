# Ballot Measure: the signing act's shapes — one table of row states and acts, a closed list of act kinds, withdrawal in bound, link 1 by list membership, and Spec 125-B U3's rows classified

**Date**: 2026-11-08 (drafted; `date -u` at drafting start 2026-11-08T16:48:16Z)
**Drafted by**: Thurgood (Civitas steward; author of ballot `2026-10-01-signing-act-chain`; owner of `verify-signing-chain` and of the charter record this ballot discharges).
**Authority to draft**: the charter record `.kiro/issues/2026-10-23-signing-act-shape-review.md`, ruled by Peter on 2026-10-23, verbatim: *"Approved. Proceed as collectively recommended, please"* (chat, relayed). Its Trigger fired at Spec 129 U12's merge (#781, `a17cb2b34`, 2026-11-08T16:21:37Z; the record's "Fired" section, #788). Go for this draft: Peter, 2026-11-08T16:33:36Z, verbatim (relayed by the orchestrator): **"788 is merged, and go for the shape review"**. *Unverified here: both rulings are relayed chat.*
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT is a recording defect, not a ratification.
**Required reviewer**: **Stacy** (R1). Her passes read clause 6 (iv)'s acts list, which item 2 changes. She specifies every fixture (signing-act ballot § 4.5), so § 4's fixture list is hers to confirm, amend or replace. She is the census reader. ARMING at the application PR's merge is hers.
**Consulted**: none yet. This is the R0 draft. Stacy reads it at R1. Questions to Ada, Data, Kenya and Lina are in § 9, for the orchestrator to route.
**Class**: LAW. It amends a ratified ballot's standing rule (signing-act ballot § 2 clauses 3, 5 and 6, a new clause 9 and a new § 2a; § 3 link 1; § 4.1's link-1 rule; § 4.2's link 7), and `governance/signing-seat-brief.md` and the register row `signing-act-consistency` that restate it.
**Retroactivity**: none (clause 8). The rule binds acts committed after the application PR's merge. No old act is re-judged, and no gate re-runs over a merged PR.
**Census**: § 7 (four lines), with the appendix at the end.

> **Conflicts of interest, stated first.** I wrote the ballot whose gaps these are. I own the instrument whose link 1 is weaker than its claim, and I drafted the clause-5 grant that the v3 withdrawal ran under. I also own the census mode that, as § 7 shows, cannot see the change item 4 makes. Stacy's review and Peter's ruling are the checks.

---

## 0. Scope

**In scope.** These are the outputs of the charter record § 2 as put to Peter at the firing (record § "Fired", *Plan*):
- (1) the row-state × act table (item 1);
- (2) the closed list of act kinds and their (iv)-line forms (item 2);
- (3) withdrawal of `[orphaned-key]` rows (item 3);
- (4) the link-1 fix (item 4);
- (5) U3's rows classified against the table (item 7);
- the link-7 ordering found at the v3 run (item 5).

The session's evidence adds three items:
- item 6, the rows that render nothing at link 7;
- item 8, Ada's commit-form finding;
- F-1, the bound for a granted or re-attesting act, which item 4 forces.

**Out of scope.**
- **Link 4, entirely.** That is output 6. It is already discharged: ballot `2026-10-23-link4-candidate-first-sha-after-commit` was applied by #769 (`e7d82c377`, with the dedupe fix), and its record was closed by #773 (`24d2ad891`). § 3 of the charter record reads output 6 as done, and application step 10 records that. Any later link-4 matter takes its own ballot.
- **RS-36's items**, which stay with Spec 131's requirements (`.kiro/issues/2026-10-26-signing-chain-audit-false-verdicts.md`, Trigger as re-ruled 2026-11-01):
  - link 6 matched by content;
  - link 7's list-marker normalisation (fix 3);
  - the `late-read 7` position rule;
  - the loaded-charter question, ruled by Peter 2026-10-27 ("Re: 4, I support the recommendation");
  - the `seat-commit.sh` wrapper's change to § 4.3.

  Each is about the *evidence* a link reads. This ballot is about *which row states admit which acts*.
- **The second trigger** (a second signed-unit rename before this ships) has not fired.

---

## 1. Evidence: what the unmodelled shapes have cost

The signing-act ballot modelled one shape, re-signing a stale row. Each later shape has needed its own ballot or ruling: first signatures (2026-10-21), holds (2026-10-22), the clause-5 withdrawal grant (2026-10-23), and the U11 re-cut (2026-11-08). The evidence:

1. **A withdrawal on a fresh row passes `--ci` today. VERIFIED by probe, 2026-11-08.**
   - The setup: a scratch commit on a detached worktree at `3e76b6205`, under `Agent: Ada`. It removes the `signature` of `ada.dispositions.yaml#frontmatter:commands[functional-suite]` (a fresh `superseded-by` row) and its sheet section.
   - `verify-signing-chain --ci --base HEAD~1 --head HEAD` printed `signing-chain: 1 row(s) checked across 1 signing commit(s)` and `signing-chain: PASS — consistency, not identity`.
   - The cause is `actMoved` (`verify-signing-chain.ts` L413, used at L904). A removed signature counts as a moved hash.
   - The charter record called this "read from code, not probed on a fresh row". It is now probed. The probe commit was never pushed.
2. **The v3 rename** (charter record § 1). A signed row cannot be re-keyed in one commit by anyone. The lawful order was withdraw → re-key → sign fresh. At the withdrawal the row was on neither list, only `[orphaned-key]`, so it ran under a clause-5 grant and passed `--ci` through `actMoved`, not through its bound.
3. **U11, (g) then (A′)** (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-u11-link7-recut.md`).
   - Stacy's (h) was to redo Kenya's two `FAIL 7` acts on top of #775. It fails `--ci` F5, because a redo on a fresh row moves no hash.
   - The only route with no grant was (g): a branch cut before the acts, where the rows are in bound again. It works only before merge. When #775 merged, (A′) kept the FAILs standing.
   - So **a redo of a failed act is the fresh-row re-sign shape**, and Peter has ruled its posture twice: "A bar is a bar, and a fail is a fail" (2026-10-27, `c989dacf`), and (A′).
4. **#758's F12′ re-cut** (Spec 131 inbound, `.kiro/specs/131-governance-simplification/inbound-from-thurgood-2026-11-08-three-orchestration-gaps.md` § 3). The briefs had signers author their own charter text. F12′ failed, and the native-lane application was re-cut. The rule was already law (clause 4; F12′ in `walkRange`). The briefs restated the procedure from memory and dropped it. So whatever this ballot adds must reach the seat brief as one table, not as more prose.
5. **The 18.5 transition, re-pointed → superseded-by** (Spec 129 Task 18.5; `completion/task-18-5-completion.md`).
   - The order was: author re-disposes (`3d479bd4b`), Lina regenerates (`7cfe548e7`), Kenya and Data re-sign (13 acts).
   - `--ci` passed. `--audit` read **anchored 9, `record absent 7` 4**. The four are the trim and verdict rows, which now render nothing.
   - The order is the one item 5 makes law.
6. **Rows that render nothing can never anchor link 7.** `--census-routed` at `3e76b6205` (digest `5e634869…`, 1122 rows; 426 routed; 0 unsigned-routed) shows **261 of the 426 routed signed rows render nothing**: 237 `no-consumer-counterpart` and 24 `superseded-by`.
   - Each act on them reads `record absent 7` ("the row renders nothing", code ruling 9, `verify-signing-chain.ts` L1691) for good.
   - #758 read 22 of its 40 acts this way (#769's table). 18.5 read 4 of its 13.
   - Today "record absent" means two things: "the record is missing" and "there is nothing to read".
7. **Three signed rows are off the population.**
   - The census reads `not-routed signed` for `leonardo#frontmatter:writeScope[product/**]` (now `retained`), `leonardo#step-3-specify-the-screen:preamble` and `sparky#in-scope` (re-pointed body rows that C18 does not route).
   - They are three of the five first signatures named in the signing-act ballot's 2026-10-21 Errata line. There Peter ruled "Let's go with the class-level fix", which kept them standing.
   - No list holds them. The sweep still checks their freshness.
   - A second shape on record is a signed `re-pointed` row re-disposed to `retained` with its signature withdrawn (`6f23bc6fe`, `17cf39eac`, under a grant).
8. **The ordering found at the v3 run** (charter record § 3). Stacy's first signature `999c4c6f` was judged against a fresh local rendering, and the regeneration was committed after it (`460a4574e`). Link 7 reads the rendering at the act's own commit, so the act reads `record absent 7` "the row renders nothing", which is false, and reads so for good.
9. **The print mode (#779, `3f739b07f`) makes "the whole unit was read" checkable.**
   - One tool result carries a header naming the target (`verify-signing-chain --print — … — <record>#<fragment>`) and its `read at <sha> (working tree); clean` line.
   - It then carries the canonical unit between begin and end lines and its `canonicalHash:`.
   - For a dispositions row it adds every rendered piece and a `renderedHash:` line. For a row that renders nothing, it prints `(the row renders nothing — no rendered piece)` above that line.
   - So even a rendering-less row has a printable, hash-bearing record of what was read.
10. **Ada's finding: two commit forms in two restatements.**
    - The seat-brief template, step 4 (`.kiro/issues/2026-11-05-signing-act-prevention-four-fixes.md`, "Seat-brief template", interim home), says "with no `-q`".
    - `governance/signing-seat-brief.md` § "The commit line" uses `git commit -q -F - <<'EOF' && git log -1 --format='%H %s'`, and fixture P8 parses that block.
    - Under § 4.3 as amended on 2026-11-08 both forms anchor: P8 (`-q`) and P9 (no `-q`, the bracket line, de-duplicated by #769). The "no `-q`" rationale ("so audit link 4 can see it", Spec 129 `feedback/tasks.md` L624) predates #769 and no longer holds.

---

## 2. The items

Each item gives its edit sites with before and after text. "The signing-act ballot" is `.kiro/docs/ballots/2026-10-01-signing-act-chain.md`. `<A>` is the application PR's base SHA, written in at application.

### Item 1 — The row-state × act table (new § 2a; new clause 9)

**Site 1a — the signing-act ballot, § 2, after clause 8.** Before: none (new clause). After:

> 9. **The shapes.** § 2a is the closed table of row states and the acts on them. An edit to a signing object that is none of § 2a's act kinds is not a signing act. It is authoring, or a finding.
>    *(added <date> by ballot 2026-11-08-signing-act-shape-review item 1.)*

**Site 1b — the signing-act ballot, a new § 2a between § 2's register line and "Why function-derived".** Before: none. After (verbatim, with § 2a's own heading):

> ### 2a. Row states and acts *(added <date> by ballot 2026-11-08-signing-act-shape-review items 1–3 and 5)*
>
> **States.** Each one is decided over a committed tree by the freshness sweep's own function (`freshness.ts` `listsAt`). That is the C16 sweep's lists and the census mode's population.
> - **unsigned-routed**: routed (C18, clause 5), no signature. On the sweep's `unsigned-routed` list.
> - **unsigned-unrouted**: a current row that does not route and carries no signature (a `retained` row; a re-pointed body row C18 does not route). On no list.
> - **fresh**: signed, routed, both pinned hashes current. On no list.
> - **stale**: signed, a pinned hash ≠ current. For a record unit: `canonicalHash` ≠ current, or absent. On the sweep's `stale` list.
> - **refused**: a signed row whose signature carries `refuse`. It is otherwise fresh or stale and takes that state's cells. While it stands, S-T3 reads red.
> - **signed-unrouted**: signed, current key, not routed. On the sweep's `signed-unrouted` list.
> - **orphaned**: the row's or record unit's key names nothing current (the `[orphaned-key]` refusal). On the sweep's `orphaned` list.
> - **deleted**: the row is absent.
>
> A **hold** is not a state. It is a clause 6 line on a row in bound, and it resolves as the row's later in-bound act, or as *withdrawn* when the row leaves the bound. That is the hold's word, an end with no edit. It is not the act `withdraw`.
>
> **Act kinds (closed).** An act's kind is read from the commit: a signing object absent at the first parent and present at the commit is a first act; present then absent is a withdrawal; present at both is a re-act.
> - `sign`: a first signature that assents;
> - `refuse`: a signature carrying `refuse`, first or on a signed row;
> - `re-sign`: an assenting signature replacing a signature;
> - `confirm`: a record unit's first `canonicalHash` and sheet section;
> - `re-confirm`: a confirmation replacing a confirmation;
> - `withdraw`: a signature, or a record unit's `canonicalHash` and its sheet section, removed;
> - `hold`: a line, with no edit (clause 6).
>
> **Authoring acts on the same rows.** These are never signing acts: row add, row delete, re-key (a delete plus an add), re-dispose (any change of `disposition`, among `retained`, `re-pointed`, `superseded-by` and `no-consumer-counterpart`), overlay text and pins, operative-set items, and the regeneration of `canonical/_consumer-output/**`. Each runs under charter scope or a grant, in a commit that touches no signing object (link 2).
>
> **The table.** "IN *list*": in bound when the row is on *list* at the act's first parent; link 1 decides. "GRANT": clause 5; link 1 fails it unless F-1 (a) holds. "AUTH": authoring; link 2 confines it. "X": no lawful single commit does it; the cell names the lawful order. "—": no such act. The fixture ids are the table's (§ 4.5 list; Stacy's).
>
> | State | `sign` · `refuse` (first) | `re-sign` · `refuse` (signed row) | `withdraw` | `hold` | row delete · re-key | re-dispose |
> |---|---|---|---|---|---|---|
> | unsigned-routed | IN unsigned-routed · FU1–FU32 | — | — | line | AUTH | AUTH (may leave the population) |
> | unsigned-unrouted | GRANT · FU (the #337/#378 shape) | — | — | not in bound | AUTH | AUTH (may route it) |
> | fresh | — | GRANT · F5 (the U11 (h) redo; `c989dacf`) | GRANT · **W1** | not in bound | X: the author's commit deletes the signer's object (link 2/3, **A1**). Order: re-dispose or change the unit first, so the row is stale, orphaned or signed-unrouted; then withdraw; then delete or re-key | AUTH · **S3** (the row goes stale; then `re-sign` IN) |
> | stale | — | IN stale, and a pinned hash moves (F5) · **S1**, **S2** | IN stale · **W3** | line | X: withdraw first (as fresh) | AUTH |
> | signed-unrouted | — | IN stale if stale, else GRANT | IN signed-unrouted · **W4** | not in bound | X: withdraw first | AUTH (may route it) |
> | orphaned | — (no current unit) | — | IN orphaned · **W2** (the v3 shape) | — | signed: X, withdraw first, then re-key, then `sign` from unsigned-routed (the v3 order); unsigned: AUTH | AUTH |
> | deleted | — | — | — | — | removing a sheet section that keys to nothing is cleanup, not an act; adding one fails link 2 | — |
> | record unit: stale | `confirm` / `re-confirm` IN stale, and a hash moves (F5) | | IN stale | line | items, unit add: AUTH | — |
> | record unit: fresh | — | `re-confirm` GRANT · F5 (`c989dacf`) | GRANT · **W5b** | not in bound | — | — |
> | record unit: orphaned | — | — | IN orphaned · **W5a** | — | re-key: X, withdraw first | — |
>
> **Across acts.** A seat that acts in a range authors its own charter in no commit of that range (clause 4; F12′, link 2). A **redo**, re-making an act whose audit read anything but `anchored`, is the fresh row's `re-sign`, so it is GRANT. Its only route with no grant is a branch cut before the act, where the row is in bound again (the U11 (g) route). That route exists only before merge. **Re-attestation** (Spec 125-B U3) is the fresh row's act with no hash to move: its cell is F-1's.

**What this cell set rests on.** Every IN, GRANT and X cell restates a ratified clause, except the four rows items 3–5 change: the withdraw cells for orphaned, signed-unrouted and stale; and item 4's "at the act's first parent". The table adds no state the sweep cannot compute. "signed-unrouted" and "orphaned" are lists the sweep already half-computes: `routedPopulation`'s `all`, and the orphaned-key refusal.

### Item 2 — The closed act kinds in the acts list (clause 6 (i) and (iv))

**Site 2 — the signing-act ballot, § 2 clause 6.**
- Before, (i): "(i) the rows whose signature or confirmation changed ⊆ the stale list;"
- After, (i): "(i) each row whose signature or confirmation changed is on the list its act kind names (§ 2a) at the commit's first parent;"
- Before, (iv): "(iv) the PR body lists the acts — the set in (i), one line each, `<dispositions file>#<row> — <seat> — <commit sha7>`, beside the pasted stale list."
- After, (iv): "(iv) the PR body lists the acts — the set in (i), one line each, `<dispositions file>#<row> — <seat> — <kind> (<list>) — <commit sha7>` (`<operative-set file>#<anchor>` for a confirmation), where `<kind>` is one of § 2a's closed kinds and `<list>` is the list the row was on, or `grant: <record>` for a clause-5 act — beside the pasted lists."
- The hold sentence is unchanged. Its pointer line gains `*(amended <date> by ballot 2026-11-08-signing-act-shape-review item 2; prior text at <A>.)*`. The 2026-10-21 note under it ("'the stale list' in (i) and (iv) reads as clause 3's bound") is kept as history and marked superseded by this item.

**Why the kind and the list go in the line.** The claims pass can then check each line against the pasted list it names, with no recomputation. A withdrawal is visible as one, not as an act that moved a hash. This is the reading Stacy's passes already do by hand for first signatures.

### Item 3 — Withdrawal in bound: orphaned and signed-unrouted (clauses 3 and 5)

This is output (ii). Stacy reads an orphaned key as the limit case of stale. This item adopts that reading, and adds the signed-unrouted rows of § 1 item 7 on the same ground: each carries a signature that no longer pins a routed unit, and only its signer can remove it.

**Site 3a — the signing-act ballot, § 2 clause 3.**

Before (verbatim):

> 3. **Bound — the stale list or the unsigned-routed list.** A signing act is valid only for a row on the branch's **freshness stale list or its unsigned-routed list**, as the C16 `operative-set-freshness` sweep reports them (`npm run check:122:diff-guard`, which runs the sweep first). The lists are taken before signing, **re-taken each round** (a refusal's re-disposition moves the hash again, and the re-sign that follows is in bound), and **pasted into the PR body**. The lists are a property of the tree: a stale entry carried onto a unit branch by merging `main` is in bound on that branch, exactly as one the branch's own change created.

After:

> 3. **Bound — the lists.** A signing act is valid only for a row on the list its kind names in § 2a, at the act's commit's first parent. The lists are the freshness **stale list** and **unsigned-routed list**, and, for a withdrawal only, the **orphaned list** and the **signed-unrouted list**, as the C16 `operative-set-freshness` sweep reports them (`npm run check:122:diff-guard`, which runs the sweep first). The lists are taken before signing, **re-taken each round** (a refusal's re-disposition moves the hash again, and the re-sign that follows is in bound), and **pasted into the PR body**. The lists are a property of the committed tree. A stale entry carried onto a unit branch by merging `main` is in bound on that branch, exactly as one the branch's own change created. **An act is judged against the rendering committed at its first parent, so the regeneration it rests on is committed before it.**

The erratum pointer stays. A new pointer is added: `*(amended <date> by ballot 2026-11-08-signing-act-shape-review items 3–5; prior text at <A>.)*`. The bold last sentence is item 5's.

**Site 3b — the signing-act ballot, § 2 clause 5.**
- Before: "5. **Out of bound.** Re-signing a row **not** on the stale list (a signer changing its mind) needs a real grant, and the claims pass counts it separately."
- After: "5. **Out of bound.** An act on a row that is on none of the lists its kind names — a re-sign, refusal, re-confirmation or withdrawal on a fresh row (a signer changing its mind), or a redo of an act whose audit read anything but `anchored` — needs a real grant, and the claims pass counts it separately. *(F-1's sentence.)*"
- The pointer is the same as site 3a's.

The F-1 sentence is one of:
- (a) "`--ci` link 1 reads a granted act from the committed grant list named in § 2a's F-1 paragraph."
- (b) or (d) "A granted act does not pass `--ci` link 1; a grant is executed only where the row is in bound."

### Item 4 — Link 1 by list membership at the first parent (the `actMoved` fix)

**Site 4a — the signing-act ballot, § 3, table row 1.**
- Before: "| 1 | The row is on the PR's stale list | the freshness sweep | `--ci` |"
- After: "| 1 | The row is on its act kind's list (§ 2a) at the commit's first parent | the freshness sweep's lists over that tree | `--ci` |"
- The 2026-10-21 note under the table is kept and marked superseded by this item.

**Site 4b — the signing-act ballot, § 4.1, the "Link 1" bullet.**

Before (verbatim):

> - **Link 1, decided per signing commit**: the head is fresh by construction, so link 1 is never read from the head's stale list. A re-sign is on the stale list iff it moves the row's pinned `canonicalHash` or `renderedHash` — so a re-sign that leaves both unchanged fails (F5), and one whose hashes moved only because `main` was merged passes (F14, clause 3).

After:

> - **Link 1, decided per signing commit, at its first parent**: the head is fresh by construction, so link 1 is never read from the head's lists. Each act's kind is read from the commit (§ 2a). The row must be on that kind's list in the first parent's tree, computed by the freshness sweep's own function over that tree (`freshness.ts` `listsAt`), with the consumer rendering committed in that tree. An undecidable list fails it. A `re-sign` or `re-confirm` must also move the row's pinned `canonicalHash` or `renderedHash` (F5). A row whose hashes moved only because `main` was merged is on the stale list at the first parent, so it passes (F14, clause 3).
>   *(amended <date> by ballot 2026-11-08-signing-act-shape-review item 4; prior text at <A>. The 2026-10-21 first-signature note below is this rule's `sign` and `refuse` case, unchanged.)*

**Site 4c — the instrument** (application PR, in my standing scope).
- `freshness.ts` exports `listsAt(read, files)`. It returns `{ stale, unsignedRouted, orphaned, signedUnrouted, errors }` over a tree read through `read`, with the rendered hash computed from that tree's committed `canonical/_consumer-output/`. `runFreshnessSweep` calls it over the working tree, so there is one code path, not a second copy.
- `formatFreshness` appends two information lines, never findings: `orphaned: N row(s)` and `signed-unrouted: N row(s)`, with row ids, after the two lines it prints today.
- `walkRange` replaces the `!actMoved(a)` branch (L904) with list membership by kind at `an.parents[0]`. It keeps `actMoved` as the F5 conjunct for `re-sign` and `re-confirm`. It caches `listsAt` per parent, as `unsignedAt` already does. The new failure messages name the kind and the lists the row was on.
- `routedPopulation` and `routedCensus` are unchanged, so `--census-routed`'s output cannot move (§ 7).
- A census mode for link 1, `--census-link1 --range <base>..<head>`, prints one sorted line per act: `<sha>\t<rowId>\t<kind>\t<lists at first parent, or none>\t<link-1 verdict>`, then the count. It adds no logic: it calls `walkRange`'s own per-act decision. The register's `census` field gains it, on the owner's word (EXECUTION under ballot `2026-10-19-instrument-census-at-draft` § 2, "Who writes it").
- The application PR reports the `--ci` step's wall time before and after (`122-diff-guard`). The cost is unmeasured: a stale list per distinct first parent means about 430 hashes plus one rendering parse each.

**What this does to flows that pass today.** A re-sign whose only staleness is an uncommitted regeneration passes today on hash movement. After this item it fails link 1, because at its first parent the committed rendering still equals the pin. That is item 5's ordering, enforced for re-signs (fixture S1). A first signature is unaffected: its list comes from the overlay through C18, not from the committed rendering.

### Item 5 — The ordering: the rendering an act is judged against is committed first

**Site 5a** is clause 3's bold last sentence (site 3a).

**Site 5b — the instrument, message only** (out of census scope: messages only). Where link 7 finds no rendering of a row at the act's commit, but a later first-parent commit in the range renders it, the line reads `record absent 7 — the row's rendering is committed after the act (<sha8>); the act was not judged against a committed rendering (clause 3)`. It no longer reads "the row renders nothing". The verdict is unchanged under F-3 (a) and changes under F-3 (b).

**Site 5c — `governance/signing-seat-brief.md`**, a new rule S14 (§ 3 below).

### Item 6 — Rows that render nothing, at link 7 (F-2)

The table's cells hold whatever F-2 rules. Link 7 is § 3's evidence rule, and its verdict vocabulary is § 4.4, so the choice is LAW and Peter's. The options and their after-text are in § 6.

### Item 7 — Spec 125-B U3's rows classified (output 5)

**The listing**, run at `3e76b6205`:
- The record's own command counts sheet lines: 231 `signer:` lines in the ten primary sheets, against 124 at 2026-10-15. Sheet lines are not rows.
- The decidable count is the census mode's, one line per dispositions row: `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --census-routed` (digest `5e634869e02255cddc4a34f0a909c1850aac46a8437cf633db43b4adf22c4c6f`).
- The sweep, run over the same tree: `stale: 0`, `unsigned-routed: 0`, findings 0, so `orphaned: 0`. `refuse` occurs in no dispositions file.

| Scope (the record's "open at the trigger") | Rows | State (§ 2a) | Render nothing | Confirmation units |
|---|---|---|---|---|
| Narrow: Stacy as C1-carve-out signer (10 dispositions files) | **190** (`stacy` in the census's signer column) | fresh 190 | 108 (105 `no-consumer-counterpart`, 3 `superseded-by`) | 167 in 10 records (`confirmer: stacy`), all fresh |
| Wide: every signed row | **429** (426 routed + 3 not routed) | fresh 426; signed-unrouted 3 (§ 1 item 7) | 261 (237 + 24) | 375 in 17 records, all fresh |

**The classification.** Under the current bound, **0 of 190 (narrow), and 0 of 429 (wide), are in bound for any act a re-attestation could make.**
- Every row is fresh or signed-unrouted, and so is every unit.
- A re-attesting `re-sign` or `re-confirm` moves no hash, so it fails `--ci` F5.
- A clause-5 grant cannot change that: F5 is a gate, and a grant is not an input it reads.
- Under item 4 the same holds for a sheet-only edit, which is on no list.

So **U3's re-attestation cannot pass `--ci` under the ratified text, granted or not.** That is what F-1 decides.

**Site 7** — `.kiro/issues/2026-10-15-123-125b-u3-re-attestation.md` gets a dated line at application (rule 9, by its owner Stacy, with me as co-owner). It carries this table, replaces the listing command with the census filter (`… --census-routed | awk -F'\t' '$4=="stacy"'` for the narrow scope), and points to F-1's outcome. The rows will have moved again by U3: the classification is re-run at U3's trigger, by its commands, and this table is not carried as fact.

### Item 8 — One commit form in the two restatements (Ada's finding)

This is not LAW. Both forms conform to § 4.3 as amended, and neither restatement is a source of law.

**Site 8** — the four-fixes record's seat-brief template, step 4, gets a dated line (rule 9, by its owner, me). The template keeps its interim home until item 2 of that record moves it.
- Before: "4. **Commit in the proven form, one act per commit, in its own tool call, with no `-q` and no push in the chain:**"
- After: "4. **Commit in the governed form, `governance/signing-seat-brief.md` § "The commit line", one act per commit, in its own tool call, with no push in the chain:**"
- The example lines below it take that section's `-q` form. The superseded line stays inline, labelled (ledger rule).

The four-fixes item 2 wrapper's refusal of `-q` is Data's design and rides the RS-36 ballot. This item does not decide it ([@DATA], § 9).

---

## 3. Restatement sites (applied with items 1–5)

**`governance/signing-seat-brief.md`.** Owner: Thurgood. Peter-merged. MCP-served (`signing-seat-brief`).
- **"What this document is"**, the authorities list: add "ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md` (§ 2 clauses 3, 5, 6 and 9, and § 2a, the row states and acts)". `Last Reviewed`: the application date.
- **S1.** The before-text is the current row (L44 at `3e76b6205`; its replacement is in § Census appendix § B's diff). After:

  > | S1 | **Act only on rows in bound, by the list your act's kind names.** The freshness sweep (`npm run check:122:diff-guard`) prints four lists: `stale`, `unsigned-routed`, `orphaned` and `signed-unrouted`. A first signature or refusal needs the row on `unsigned-routed`. A re-sign, a refusal of a signed row, a confirmation or a re-confirmation needs it on `stale`. A withdrawal needs it on `stale`, `orphaned` or `signed-unrouted`. The lists are taken before acting, re-taken each round, and pasted into the PR body. A row on none of its kind's lists is not yours to act on under this rule. | signing-act ballot § 2 clauses 3, 5 and 9, and § 2a (ballot 2026-11-08-signing-act-shape-review). Which rows route: Spec 123 design § C18 clause 5 (a `re-pointed` frontmatter or members row routes; routes-floor ballot § 2) | `--ci` link 1 (F5, the FU, W and S cases); the pasted lists, read in the PR body |

- **S12.** The before-text is the current row (L55). After: its first two sentences become "Each act is a line in the PR body: `<dispositions file>#<row> — <seat> — <kind> (<list>) — <commit sha7>` (`<operative-set file>#<anchor>` for a confirmation). `<kind>` is one of `sign`, `refuse`, `re-sign`, `confirm`, `re-confirm` and `withdraw`, and `<list>` is the list the row was on." The rest of the row is unchanged. The law-clause cell becomes "§ 2 clause 6 (iv), as amended by ballot 2026-11-08-signing-act-shape-review; clause 4 (a re-disposition answering a refusal is authoring)".
- **New S13**, after S12:

  > | S13 | **Withdraw before anyone re-keys or deletes a signed row.** A signed row cannot be re-keyed or deleted in one commit: the profile author's commit would delete your signature, and your commit would edit authoring. The order is: (1) the row reaches `stale`, `orphaned` or `signed-unrouted` (a canonical change, a rename, or a re-disposition by its author); (2) you withdraw, removing the row's `signature` (or the unit's `canonicalHash`) and your sheet section, in one commit; (3) the author re-keys or deletes the unsigned row; (4) you sign the re-keyed row fresh, from `unsigned-routed`. | signing-act ballot § 2 clauses 1, 3 and 4, and § 2a | `--ci` links 1–3 (the W cases, A1) |

- **New S14**, after S13:

  > | S14 | **The rendering you judge is committed before you act.** Your act is judged against the rendering committed at its first parent. Print on a clean tree after the regeneration commit (the print mode's `read at` line ends `clean`), never against a regeneration that is only in your working tree. A re-sign whose staleness is in an uncommitted regeneration fails `--ci` link 1. A first signature made before its rendering is committed reads `record absent 7` for good. | signing-act ballot § 2 clause 3 (its last sentence) | `--ci` link 1 (S1); `--audit` link 7 |

**`governance/classification-map.md`, row `signing-act-consistency`.**
- **The `rule:` line.**
  - Before: "for a row on the branch's freshness stale list or its unsigned-routed list (both printed by the freshness sweep, taken before signing, re-taken per round, pasted into the PR)".
  - After: "for a row on the list its act kind names at the act's first parent (signing ballot § 2a: the freshness stale list, its unsigned-routed list, and for a withdrawal its orphaned or signed-unrouted list; all printed by the freshness sweep, taken before signing, re-taken per round, pasted into the PR)".
  - Same line, before: "(stale or unsigned-routed list;". After: "(the act kind's list at the first parent;".
- **The git-links surface string**: "the stale-list / unsigned-routed-list bound" → "the act-kind list bound at the first parent".
- **Its `census` field** gains `--census-link1` (site 4c).
- **One history line**: `{ date: <application date>, change: "SHAPE REVIEW APPLIED (ballot .kiro/docs/ballots/2026-11-08-signing-act-shape-review.md, RATIFIED <ruling>): § 2a's closed table of row states and act kinds; clause 3's bound is the act kind's list at the commit's first parent (stale, unsigned-routed, and for a withdrawal orphaned or signed-unrouted), and the act is judged against the rendering committed there; clause 6 (iv) lines carry the kind and the list; --ci link 1 decides by list membership (freshness.ts listsAt), with F5 kept for re-sign and re-confirm; the sweep prints orphaned and signed-unrouted lines; census field gains --census-link1; F-1 <outcome>; F-2 <outcome>; F-3 <outcome>; check_state unchanged (armed), ARMING at the PR's merge (Stacy)", by: thurgood }`.

---

## 4. Fixtures (Stacy specifies; listed for her R1)

Each new case is red at the merge base where it says so, and green at the head.
- **W1**: `withdraw` on a fresh row. Expected FAIL 1. **Red at base: it PASSES today** (§ 1 item 1's probe, made a fixture).
- **W2**: `withdraw` on an orphaned row (the v3 shape: the heading renamed at the first parent) → PASS. Controls: the same withdrawal with the rename in the same commit → FAIL 2 (authoring); the unsigned row re-keyed by the author, then `sign` → PASS.
- **W3**: `withdraw` on a stale row → PASS.
- **W4**: `withdraw` on a signed-unrouted row (a re-pointed row re-disposed to `retained` at the first parent) → PASS. Control: the withdrawal before the re-disposition (the row is fresh) → FAIL 1.
- **W5a / W5b**: a record unit's `canonicalHash` and sheet section withdrawn: on an orphaned unit → PASS; on a fresh unit → FAIL 1.
- **S1**: `re-sign` after an overlay-only change, with the regeneration committed **after** the re-sign → FAIL 1 (no list at the first parent). **Red at base: it PASSES today** on hash movement.
- **S2**: the same, regeneration committed **before** → PASS (control).
- **S3**: the 18.5 transition: re-dispose `re-pointed` → `superseded-by`, regenerate, `re-sign` → PASS.
- **A1**: the profile author's commit deletes a signed row → FAIL 2 and 3 (exists in substance as F4; named here as the table's cell).
- **R1**: link 7 when the rendering is committed after the act (the `999c4c6f` shape) → the item-5 message, with the verdict per F-3.
- **R2**: link 7 on a row that renders nothing → the verdict per F-2.
- **K1**: `--census-link1` over W1–W4 prints one line per act with the kind and the lists, and its verdicts equal `--ci`'s.

That is 12 cases, against the charter record's estimate of about 10. FU1–FU32, F5 and F14 stay as they are.

---

## 5. Application (one PR, Peter-merged, after ratification and before U3's re-attestation is scheduled)

1. **Record-first.** This file's Status reads `RATIFIED (Peter, <date>)` with his words and the F-1, F-2 and F-3 picks, committed before any site.
2. **Open-branch check.** List the open PRs and unit branches whose range touches `canonical/profiles/**` or `canonical/operative-sets/**` (`gh pr list --search` plus `git branch -r`). Item 4 makes link 1 stricter on an armed required step: each one is re-run against the application head, and any act that turns red is reported before merge, never adapted.
3. **The signing-act ballot**: sites 1a, 1b, 2, 3a, 3b, 4a, 4b, and F-2's and F-3's § 4.2 text, exactly as written, with the pointers. Errata line: `§§ 2, 2a, 3, 4.1, 4.2: the row-state × act table, the closed act kinds, withdrawal in bound (orphaned, signed-unrouted), link 1 by list membership at the first parent, the ordering sentence, F-1/F-2/F-3 as ruled (ballot 2026-11-08-signing-act-shape-review; RATIFIED <date> — <words>).`
4. **The instrument**: site 4c, site 5b, and F-2's and F-3's instrument halves, with § 4's fixtures as Stacy specifies them. W1 and S1 are recorded red at the merge base in the PR body.
5. **The restatements**: § 3's seat-brief and register sites.
6. **Census re-runs** (README "Re-runs"):
   - `--census-routed` at the PR's base and head must be equal; if they differ, stop and report.
   - The governance-examples census on the applied seat brief must equal § 7's proposed digest.
   - `--census-link1` runs over each merged PR head since `R` that touches `canonical/profiles/**` (`git fetch origin '+refs/pull/*/head:refs/pull/*/head'`). Its delta, the acts whose link-1 verdict differs between base and head code, goes verbatim in the PR body.
7. **Lock refresh.** `governance/` is a closure root. Regenerate, commit the lock, and paste `npm run check:122:diff-guard`'s output, which should read PASS with the four list lines.
8. **`rebuild_index`** on the docs MCP (the seat brief is served).
9. **PR-body lines.**
   - `**Edit kind**: governance/signing-seat-brief.md — LAW (.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md)`, and the same for `governance/classification-map.md`.
   - `**Straggler sweep**:` (RS-38) for `verify-signing-chain.ts` and `freshness.ts`.
   - `git grep -n -i 'stale list' -- governance canonical/agents .kiro/steering .kiro/hooks/RELEASE-FLOW.md`, each hit's section read whole.
   - `**ARMING**:` naming the armed step whose code changes.
10. **Records.**
    - The charter record gets rule 5's outcome line, naming output 6 as discharged by #769 (`e7d82c377`) and #773 (`24d2ad891`), and is `git mv`d to `archive/`.
    - Site 7's dated line goes on the U3 record.
    - Site 8's dated line goes on the four-fixes record.
11. **ARMING** at the merge: Stacy's read of the armed `--ci` step.

---

## 6. Forks for Peter (not picked)

### F-1 — How does a granted act, or U3's re-attestation, pass `--ci`?

Item 7 shows that no re-attesting act can pass the gate. Item 4 removes the accident (`actMoved`) through which one granted act, the v3 withdrawal, did pass. Clause 5's "needs a real grant" then names a grant the gate never reads.
- **(a) A committed act list.**
  - A `**Signing grant**:` block in a root `.kiro/issues/` record names row ids, an act kind per row and Peter's ruling.
  - Link 1 accepts a row in a block that is committed at the act's first parent and that the act's kind matches. The (iv) line reads `grant: <record>`.
  - U3's re-attestation becomes a kind, `re-attest`: a sheet-section line only, with F5 waived for that kind alone, listed in the U3 record's block at U3's trigger.
  - *Cost*: one more input to an armed check, a block grammar, about four fixtures, and a stated reader (the claims pass reads each block against Peter's cited words).
  - *Surviving counter*: it is the grant-derived path that the signing-act ballot's F-1 rejected in 2026-10. A committed list is written by whoever writes the record, and the gate cannot tell a ruled list from a typed one. The pass can.
- **(b) U3 writes no signing object.**
  - The re-attestation is its own record, one line per row with its current hashes and the seat, committed under whatever identity U3 ships. Link 1 never fires on it.
  - Clause 5 grants stay unexecutable at the gate after item 4, as they already are for re-signs (F5). Peter's "a bar is a bar" posture becomes the mechanism.
  - *Cost*: a new record form that no check reads for signer = `c1Seat`.
  - *Surviving counter*: the most valuable re-attestation evidence then sits outside the chain, unchecked.
- **(d) Classification now; the bound at U3's tasks round.**
  - This ballot ships items 1–8 with clause 5's F-1 sentence in its (b) form. U3's tasks round carries the re-attestation bound as a ballot of its own, once U3's mechanism (CODEOWNERS approvals or per-seat identity) is known. The U3 record already says its mechanics "depend on what 125-B U3 ships".
  - *Cost*: one more ballot, inside U3.
  - *Surviving counter*: the charter record asked for "a stated bound" before U3, and (d) states only that none exists yet.

### F-2 — What does link 7 read for a row that renders nothing?

These are 261 of 426 routed rows, and 22 of #758's 40 acts.
- **(a) Unchanged.** `record absent 7`, with the message "the row renders nothing". *Surviving counter*: a verdict that means two things, and that most rows can never leave, teaches readers to discount it. The 18.5 four and #758's twenty-two are already read as "by design" in prose, which is exactly the rot the reporting rule exists to stop.
- **(b) The print record.**
  - For a row with no rendered piece at the act's commit, link 7 anchors on a tool result that carries the print-mode output for that row's target: its header line naming `<record>#<fragment>`, the `(the row renders nothing — no rendered piece)` line, and a `renderedHash:` equal to the signature's pinned one. That last match ties the read to the signed state.
  - It reads the transcript as link 7 does today. RS-36's `late-read` position rule, when ratified, applies to it too.
  - *Cost*: one matcher, two fixtures, and the § 3 link-7 sentence amended.
  - *Surviving counter*: printing is not reading (Stacy's caveat on #779). For a `no-consumer-counterpart` frontmatter row the canonical text is a short path string, so the evidence is weak in substance, though strong as a record of the target.
- **(c) A distinct verdict.**
  - `n/a 7 — renders nothing`, added to § 4.4's vocabulary. It is never `anchored`, never counted as `record absent`, and never widening.
  - *Cost*: a vocabulary change and Stacy's pass forms.
  - *Surviving counter*: it makes "no read evidence" the official state of most signed rows, and makes it look settled.

### F-3 — Does an act committed before its rendering ever anchor?

- **(a) No.** The ordering is a rule (clause 3's last sentence). Item 4 enforces it for re-signs, and for first signatures the item-5 message names it. *Surviving counter*: `999c4c6f`-shaped acts, signed against the right text, stay `record absent 7` for good.
- **(b) Yes, by hash.** Link 7 reads the first later commit in the range whose rendering of the row hashes to the signature's pinned `renderedHash`. It anchors with the note `rendering from <sha8>`. *Surviving counter*: the late rendering is proven equal to what was signed, not to what was on screen, and the fallback removes the cost of the wrong order.

---

## 7. Census

The signing-act ballot is the law `verify-signing-chain.ts` cites (its L1–2), and items 3–5 name a code change to it, so they are presumptively in scope (conditions 2 and 3). The seat brief is loaded by the governance-examples guard (condition 1). The register is loaded by none of the registered checks below.

- `**Census**: npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --census-routed over canonical/profiles/consumer/** and canonical/operative-sets/** @ 3e76b6205 — current 5e634869e02255cddc4a34f0a909c1850aac46a8437cf633db43b4adf22c4c6f → proposed: not computed (no scratch diff at draft; site 4c's code is the application PR's build); 0 rows change, PROJECTED from site 4c, which leaves routedPopulation and routedCensus unchanged (delta: § Census appendix)` — covers items 3, 4 and 5.
- `**Census**: npx tsx scripts/governance-examples/check.ts --census over governance/*.md and the eight packaged steering docs @ 3e76b6205 — current c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd → proposed c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd; 0 docs change (delta: § Census appendix)` — covers § 3's seat-brief sites. The "proposed" run is over the changed corpus (the after-text applied to a scratch copy of the seat brief at `3e76b6205`), not a scratch diff to the instrument, which does not change.
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — no site adds, renames or removes a get_section or get_document_* citation or a cited heading`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — governance/ is an ordinary closure input; no rule, pattern or grammar the guard reads changes; the lock is refreshed at application (§ 5 step 7), where its verdict is read`

**Three departures, for the census reader** ([@STACY]):
1. The first line has no proposed digest. The README asks for a scratch diff at draft, and site 4c is a build: a `listsAt` that reads committed renderings at any tree is not a draft-sized diff. § 5 step 6 runs the README's re-run at the PR, scratch-diff form included.
2. **That line is uninformative by construction, and that is a finding on the instrument, mine.** The row's census mode composes `routedPopulation`, not `walkRange`'s per-act link-1 decision. Every census of a link-1 change therefore reads "0 rows change", true and empty. Site 4c's `--census-link1` is the fix, and § 5 step 6 is its first run. Until then, the only count is a heuristic: **2 net signature removals on `main`'s first-parent squashes since `R`** (`58f511fae`, the v3 rename; `6f23bc6fe`, a re-pointed row re-disposed to `retained`, its signature withdrawn at `17cf39eac`). This is labelled heuristic: a squash nets each PR, so a withdrawal and a re-sign in one PR cancel and are not seen. Script: § Census appendix.
3. The second line's "proposed" is a corpus run, the departure the token-governance ballot named and you ruled on (its Fix 2). Rule it the same way or differently.

---

## 8. Recommendation, counter-argument (fold-back applied), residual

**I recommend items 1–8 as drafted.** I make no pick on F-1, F-2 or F-3.

**The counter-argument.** The signing-act ballot retired six layers for one chain, because each layer was a rule every seat had to learn. A ten-row table with seven act kinds is the same mistake from the other side. The shapes that recur are three (re-sign a stale row, sign an unsigned-routed row, withdraw before re-key), and the rest of the cells are hypothetical. A stricter link 1 on an armed required check will also break flows that work today, during the weeks 129 and 132 need signing to be cheap.

**What fold-back changed.**
- The table restates a ratified clause in every cell except the four withdraw and ordering cells. Its fixtures are twelve, not one per cell.
- No new state is one the sweep cannot already compute.
- The seat brief gains two rows (S13, S14), not a table, and S1 and S12 are rewritten in place rather than added to.
- The redo and re-attestation shapes are folded into existing cells (fresh × `re-sign`, and F-1) instead of new kinds.
- § 5 step 2 re-runs every open signing branch before merge, so the stricter link 1 breaks nothing silently.

**What survives.**
1. **The review does not end one-failure ballots. It makes them fail closed.** The next shape this table missed will read FAIL 1 instead of passing through `actMoved`, and it will still need a ballot. What changes is that it is found at the gate, not at a claims pass weeks later.
2. **Item 4 makes an armed required check stricter on a path nobody has measured** (per-parent stale lists). It turns the ordering from advice into a red: S1's shape passes today, and some brief somewhere still says "sign, then regenerate".
3. **The census cannot measure the change it matters most for** (§ 7, departure 2) until the application PR builds the census mode that can. The ratification will rest on a heuristic count of 2.
4. **I wrote the defect, I draft the fix, and I own the census that is blind to it.** Stacy's R1 is the only independent read before Peter's.

---

## 9. Questions for the review round

- [@STACY] (R1, required) Does the (iv) form with `<kind> (<list>)` fit your pass reading, or does it need another shape? Do you accept signed-unrouted as in bound for withdrawal on the orphaned-key ground? Is § 4's fixture list complete? And the three census departures in § 7. → § 2 item 2, item 3; § 4; § 7
- [@ADA] Is item 8's direction (the template follows the governed `-q` form) the correction your finding asked for, or did you mean the governed doc should drop `-q`? → § 2 item 8
- [@DATA] Does the wrapper (four-fixes item 2) still need to refuse `-q` after #769, given P8 and P9 both anchor? Your answer goes to RS-36, not here. And for your 18.5 trim and verdict acts: which F-2 option would you accept as your read evidence? → § 2 item 8; § 6 F-2
- [@KENYA] The same F-2 question for your 18.5 acts. And: for your U11 erratum's later whole-unit prints, would F-2 (b) or F-3 (b) have changed anything you were asked to redo? → § 6
- [@LINA] Clause 3's last sentence puts the regeneration commit before every act judged against it. Your regenerations come before the seats' acts in each unit (18.5's order). Does any unit shape you run regenerate after the acts? → § 2 item 5

---

## 10. Review round record

*(empty at R0)*

---

## Census appendix

### § A. The census mode at `3e76b6205`

Run in the main checkout at `3e76b6205e2cec3a0e8ed28ee3968652f633de0a` (clean):

```
$ npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --census-routed | tail -1
1122 rows; 426 routed; 0 unsigned-routed; errors 0
$ … | shasum -a 256
5e634869e02255cddc4a34f0a909c1850aac46a8437cf633db43b4adf22c4c6f
```

The tabulations in § 2 item 7 and § 1 items 6–7 are `awk` over that output. The signer column is the fourth field, and the routed label is the second. The full output is 1123 lines and is not reproduced. It is regenerated by the command above at `3e76b6205`.

There is no scratch diff (departure 1), so there is no delta.

### § B. The governance-examples census

Run in a detached worktree at `3e76b6205` after `npm run build` (the import surface needs `dist/`). Current: as committed. Proposed: the same tree with § 3's seat-brief after-text applied by script from this file's own quoted rows (S1, S12's two replacements, S13, S14, the authorities line). The diff, verbatim:

```diff
diff --git a/governance/signing-seat-brief.md b/governance/signing-seat-brief.md
index 4c29caee1..d2f8a70b9 100644
--- a/governance/signing-seat-brief.md
+++ b/governance/signing-seat-brief.md
@@ -27,6 +27,7 @@ This document creates no rule. Each rule below restates a ratified clause and ci
 The authorities it restates:
 - ballot `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` (RATIFIED 2026-10-01), §§ 2, 3, 4.3, 4.6 and 5.3, with § 2 clause 3 as corrected by its 2026-10-21 erratum and § 2 clause 6 as amended 2026-10-22 by ballot `2026-10-22-hold-act-recorded-in-pr-body` (#444);
 - ballot `.kiro/docs/ballots/2026-10-21-routes-floor-re-pointed-frontmatter-members.md` (RATIFIED 2026-10-22), applied as Spec 123 design § C18 clause 5, for which rows route;
+- ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md` (§ 2 clauses 3, 5, 6 and 9, and § 2a, the row states and acts);
 - the C1 seat function, the signature format and its audit: Spec 123 design C16–C17 and Req 11.5.2, 11.5.4, 11.5.6 and 11.5.7, implemented in `tools/agent-generator/regrounding/c1.ts` and `signatures.ts`.
 
 Why it exists: on PR #445 all seven seats printed their signing commit in a form `--audit` link 4 cannot read, and all 20 acts read `record absent`. The rule was in the ballot (§ 4.3); the seat briefs dropped it. Record: `.kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md`. Under the orchestrator's practice recorded there (§ 6), signing briefs quote this document by path and commit (`governance/signing-seat-brief.md@<sha>`).
@@ -41,7 +42,7 @@ Owner: Thurgood (Civitas steward), who maintains it. Edits are Peter-merged.
 
 | # | Rule | Law clause | Checked by |
 |---|---|---|---|
-| S1 | **Sign only rows in bound.** A row is in bound when it is on the stale list or the unsigned-routed list your brief pastes. The freshness sweep (`npm run check:122:diff-guard`) prints both lists. They are taken before signing, re-taken each round, and pasted into the PR body. A row outside both lists is not yours to sign under this rule. | signing-act ballot § 2 clause 3 (erratum 2026-10-21); clause 5. Which rows route: Spec 123 design § C18 clause 5 (a `re-pointed` frontmatter or members row routes; routes-floor ballot § 2) | `--ci` link 1 (F5, FU cases); the pasted lists, read in the PR body |
+| S1 | **Act only on rows in bound, by the list your act's kind names.** The freshness sweep (`npm run check:122:diff-guard`) prints four lists: `stale`, `unsigned-routed`, `orphaned` and `signed-unrouted`. A first signature or refusal needs the row on `unsigned-routed`. A re-sign, a refusal of a signed row, a confirmation or a re-confirmation needs it on `stale`. A withdrawal needs it on `stale`, `orphaned` or `signed-unrouted`. The lists are taken before acting, re-taken each round, and pasted into the PR body. A row on none of its kind's lists is not yours to act on under this rule. | signing-act ballot § 2 clauses 3, 5 and 9, and § 2a (ballot 2026-11-08-signing-act-shape-review). Which rows route: Spec 123 design § C18 clause 5 (a `re-pointed` frontmatter or members row routes; routes-floor ballot § 2) | `--ci` link 1 (F5, the FU, W and S cases); the pasted lists, read in the PR body |
 | S2 | **Touch only your own objects.** You may write the row's `signature` (or `confirmation`) sub-object, and your section of the row's sheet. Every other field is authoring, not signing: `disposition`, `destination`, `removals`, `cites`, overlay text, operative-set items, any canonical source, your own charter. The signer is `c1Seat(owner)`: the owner, except where the owner is the profile author (Thurgood), in which case it is Stacy. So Stacy signs the rows of `thurgood.dispositions.yaml` and the `_shared.dispositions.yaml` members Thurgood owns (that file's header names them). | § 2 clauses 1, 2, 4; `tools/agent-generator/regrounding/c1.ts` | `--ci` link 2 (F4, F12, F12′) and link 3 |
 | S3 | **Your commit carries only your objects.** Every hunk, and every commit that carries one, stays inside your objects. A helper script kept outside the repo is one way to hold that. | § 2 clause 6 (iii) | `--ci` link 2 (commit grain) |
 | S4 | **The hashes are the current values.** A stale hash fails, and so does a re-sign that moves neither hash. How each is computed (the sweep's reference is `regrounding/freshness.ts` L608–612): `canonicalHash` is the current canonical unit's hash. For a body unit that is `hashText(unit text)`, the unit taken from `partition(body).units`. For a frontmatter entry it is `hashEntry(value)`, from `entryTree(frontmatter).units`. For a shared member it is `hashEntry(member)`, from `canonical/shared/shared-catalog.yaml`. Where the row has an overlay pin (`<profile>.overlay.md`: `## @unit #<anchor> @ sha256:…` or `## @entry <key> @ sha256:…`; re-pointed rows have one, `no-consumer-counterpart` and `superseded-by` rows do not), the pin must equal that hash. If it does not, stop and report: the pin is authoring. `renderedHash` is `renderedHashOf(readConsumerSpans(<worktree>), rowSpanSource(<source>, <section>, <key>))` (`tools/agent-generator/derive.ts`), over the committed `canonical/_consumer-output/`. The arguments: `<source>` is the dispositions file's top-level `source:`; `<section>` is `body`, `frontmatter` or `members`; `<key>` is the row key exactly as written. Body keys include the `#` (`#identity`), frontmatter keys are the entry path, and members use the catalog id. If `readConsumerSpans` returns `undefined` (no rendering), stop and report: the sweep reads that as `signature-unverifiable`. | Spec 123 design C17 valve 1 (Req 11.5.6); § 2 clause 3; § 2 clause 4 (the pin is authoring) | `--ci` link 1 (F5) and the freshness sweep (stale signature) |
@@ -52,7 +53,9 @@ Owner: Thurgood (Civitas steward), who maintains it. Edits are Peter-merged.
 | S9 | **`Agent:` is a trailer of the final paragraph.** Git reads trailers only from the message's last paragraph. A `Co-Authored-By:` line (the harness's attribution, not signing law) in a later paragraph of its own pushes `Agent:` out of git's trailer block, and the act then fails link 3. So both sit together in the final paragraph. `git interpret-trailers --parse` over the message text is a way to check this before committing. | § 2 clause 6 (ii); § 3 link 3 | `--ci` link 3 (no trailer, two trailers, or one above the final paragraph fails) |
 | S10 | **Commit and print in one call, in the convention's form.** See § "The commit line" below. One line comes out: the full SHA, a space, the subject. The commit's success shows only through `&&` (or `set -e`) into the `git log`, in the same call. Other formats anchor under § 4.3 as amended 2026-11-08 where the call's first printed SHA is the commit's and its subject shows in the result or in the commit's own first `-m` (`%h%n%B`, `%H%n%B` and `%h%n%b` read `record absent` on #445 before the amendment); a `;` or a pipe on the commit reads `anomaly`. *(Amended 2026-11-08 by ballot 2026-10-23-link4-candidate-first-sha-after-commit; prior text at `ac4f44687`.)* | § 4.3 as amended 2026-11-08: the candidate (ii), success evidence (b), and "seat briefs commit as `git commit … && git log -1 --format='%H %s'`" | `--audit` link 4 |
 | S11 | **Merge only.** Seat commits enter a unit branch by merge only (`--no-ff`, or a fast-forward), both of which keep the seat's SHA. They are never rebased, amended, cherry-picked, `merge --squash`-ed or re-committed from a seat's diff. A commit that fails CI is followed by a new commit. Conflicts are resolved in the merge commit, never by rebasing the side branch. | § 4.6 (Lina's merge-only rule) | `--audit` link 4: a rewritten SHA has no creating transcript and reads `record absent`, read through the parent chain under `refs/pull/<N>/head`. `--ci` F13: a merge that writes signature content no parent carried fails |
-| S12 | **Every act is reported.** Each act is a line in the PR body: `<dispositions file>#<row> — <seat> — <commit sha7>`. A refusal is reported like any act. Any S8 hold lines go beside them. A refusal is a fact for the report, not a reason to change the judgment (S6): it stands until the profile author's re-disposition is answered by an in-bound act, and while it stands the profile's real test reads it as red (S-T3, "zero standing refusals", `tools/agent-generator/__tests__/consumer-profile.real.test.ts` L187). | § 2 clause 6 (iv); clause 4 (a re-disposition answering a refusal is authoring) | the claims pass reads the PR body |
+| S12 | **Every act is reported.** Each act is a line in the PR body: `<dispositions file>#<row> — <seat> — <kind> (<list>) — <commit sha7>` (`<operative-set file>#<anchor>` for a confirmation). `<kind>` is one of `sign`, `refuse`, `re-sign`, `confirm`, `re-confirm` and `withdraw`, and `<list>` is the list the row was on. A refusal is reported like any act. Any S8 hold lines go beside them. A refusal is a fact for the report, not a reason to change the judgment (S6): it stands until the profile author's re-disposition is answered by an in-bound act, and while it stands the profile's real test reads it as red (S-T3, "zero standing refusals", `tools/agent-generator/__tests__/consumer-profile.real.test.ts` L187). | § 2 clause 6 (iv), as amended by ballot 2026-11-08-signing-act-shape-review; clause 4 (a re-disposition answering a refusal is authoring) | the claims pass reads the PR body |
+| S13 | **Withdraw before anyone re-keys or deletes a signed row.** A signed row cannot be re-keyed or deleted in one commit: the profile author's commit would delete your signature, and your commit would edit authoring. The order is: (1) the row reaches `stale`, `orphaned` or `signed-unrouted` (a canonical change, a rename, or a re-disposition by its author); (2) you withdraw, removing the row's `signature` (or the unit's `canonicalHash`) and your sheet section, in one commit; (3) the author re-keys or deletes the unsigned row; (4) you sign the re-keyed row fresh, from `unsigned-routed`. | signing-act ballot § 2 clauses 1, 3 and 4, and § 2a | `--ci` links 1–3 (the W cases, A1) |
+| S14 | **The rendering you judge is committed before you act.** Your act is judged against the rendering committed at its first parent. Print on a clean tree after the regeneration commit (the print mode's `read at` line ends `clean`), never against a regeneration that is only in your working tree. A re-sign whose staleness is in an uncommitted regeneration fails `--ci` link 1. A first signature made before its rendering is committed reads `record absent 7` for good. | signing-act ballot § 2 clause 3 (its last sentence) | `--ci` link 1 (S1); `--audit` link 7 |
 
 ### The commit line
 
```

Both runs print `selected: 1968 (1949 token-name candidates, 4 declared paths, 1 token-file shapes, 14 import lines) over 91 docs; predicate v1, file-shape rule v1`, and `governance/signing-seat-brief.md\t0:0:0`. Both digest to `c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd`. `diff` of the two outputs is empty, so there is no delta. On the proposed tree the guard's own run exits 0 (as at the base), and `scripts/check-section-citations.ts` exits 0.

### § C. The heuristic withdrawal count (departure 2)

`python3 -I withdrawals.py <repo>`, run at `3e76b6205`. The script was kept out of the repo. For each first-parent commit on `main` since `R` = `2da74864` that touches `canonical/profiles/consumer`, it reads the `-U0` diff of every `*.dispositions.yaml` file. It counts a row key whose removed line carries a signature and whose added line is absent or carries none. Output:

```
58f511fae 1 Stacy's owed-set heading corrected ('the committed script'): unit re-keyed via withdrawal
    stacy.dispositions.yaml #the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script gone
6f23bc6fe 1 Apply ballot 2026-10-29-dated-pointer-paths: README pointer paths (F-1 (b)), Stacy's three
    stacy.dispositions.yaml #the-mirror-anti-rot-clause-verbatim-at-countersigned-strength unsigned
total 2
```

### § D. The withdrawal probe (§ 1 item 1)

The setup: a detached worktree at `3e76b6205`. One commit under `Agent: Ada` removed `"signature": {…}` from `ada.dispositions.yaml` row `commands[functional-suite]`, and the `` ## `#frontmatter:commands[functional-suite]` `` section from `signatures/ada.md`. Output:

```
operative-set-freshness: PASS — 17 record(s), 375 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)
stale: 0 row(s)
unsigned-routed: 1 row(s)
  canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:commands[functional-suite] — superseded-by
signing-chain: range HEAD~1..HEAD — 1 commit(s); 0 committed before R 2da74864 excluded (ballot § 2 clause 8 — the rule does not reach back)
signing-chain: 1 row(s) checked across 1 signing commit(s)
signing-chain: PASS — consistency, not identity
```

The probe commit was discarded and never pushed.
