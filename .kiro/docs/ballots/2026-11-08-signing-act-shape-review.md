# Ballot Measure: the signing act's shapes — one table of row states and acts, a closed list of act kinds, withdrawal in bound, link 1 by list membership, and Spec 125-B U3's rows classified

**Date**: 2026-11-08 (drafted; `date -u` at drafting start 2026-11-08T16:48:16Z; R2 2026-11-08)
**Drafted by**: Thurgood (Civitas steward; author of ballot `2026-10-01-signing-act-chain`; owner of `verify-signing-chain` and of the charter record this ballot discharges).
**Authority to draft**: the charter record `.kiro/issues/2026-10-23-signing-act-shape-review.md`, ruled by Peter on 2026-10-23, verbatim: *"Approved. Proceed as collectively recommended, please"* (chat, relayed). Its Trigger fired at Spec 129 U12's merge (#781, `a17cb2b34`, 2026-11-08T16:21:37Z; the record's "Fired" section, #788). Go for this draft: Peter, 2026-11-08T16:33:36Z, verbatim (relayed by the orchestrator): **"788 is merged, and go for the shape review"**. *Unverified here: both rulings are relayed chat.*
**Status**: **RATIFIED (Peter, 2026-11-08T17:45:34Z)** — F-1 (d), F-2 (b), F-3 (a), F-4 (a). Peter, relayed by the orchestrator, received 2026-11-08T17:45:34Z (`date -u` at receipt), verbatim: *"Ratified, F-1 (d), F-2 (b), F-3 (a), F-4 (a)"*. Record: `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ratifies-signing-act-shape-review.md`, committed at `f27323f34` and joined here by merge (`ef677965a`). What he read: the ballot at `b32d43870` (R4), with Stacy's R1–R3 spliced (R3: no objection). The application's form, two sequential PRs (§ 5), is his later ruling, received 2026-11-08T19:06:05Z, verbatim: *"Re: Buckets 3 and 4, proceed as the relevant team members recommend"* (record `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-rulings-f4-two-pr-and-u3-rehome.md`, item 3, committed at `41f717a27` and joined here by merge, `f88e147e4`). **Record-first**: this commit is the record, made before any edit site is applied (§ 5 step 1). The forks are resolved in place, and § 11 carries the resolved after-texts. *(Superseded status, kept verbatim: "**DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT is a recording defect, not a ratification.")*
**Required reviewer**: **Stacy**. Her passes read clause 6 (iv)'s acts list, which item 2 changes. She specifies every fixture (signing-act ballot § 4.5). She is the census reader. ARMING at the application PR's merge is hers. **R1: OBJECT, four blocks (B-1 to B-4), folded at THURGOOD R2. R2: B-1 to B-4 withdrawn; OBJECT on three new blocks (B-5 to B-7), folded at THURGOOD R3. R3: PASS, no objection; N-10 folded at THURGOOD R4** (§ 10).
**Consulted**: Stacy — R1 OBJECT (B-1 to B-4), folded at R2 and withdrawn by her at R2; R2 OBJECT narrowly (B-5 to B-7), folded at R3 and withdrawn by her at R3; R3 PASS, no objection (`**Review**: no objection`), N-10 folded at R4; her fork leans are recorded in § 10 and are not this draft's picks. Ada, Data, Kenya and Lina have not been consulted yet; their questions are in § 9, for the orchestrator to route.
**Class**: LAW. It amends a ratified ballot's standing rule (signing-act ballot § 2 clauses 3, 5 and 6, a new clause 9 and a new § 2a; § 3 link 1 and, by F-2, link 7; § 4.1's link-1 rule; § 4.2; and, by F-2 (c), § 4.4). It also amends `governance/signing-seat-brief.md` and the register row `signing-act-consistency`, which restate it.
**Retroactivity**: none (clause 8). The rule binds acts committed after the application PR's merge. No old act is re-judged, and no gate re-runs over a merged PR.
**Census**: § 7 (five lines), with the appendix at the end. Re-run at R2 and R3 at `main` `929972713`.

> **Conflicts of interest, stated first.** I wrote the ballot whose gaps these are. I own the instrument whose link 1 is weaker than its claim, and I drafted the clause-5 grant that the v3 withdrawal ran under. I also own the census mode that, as § 7 shows, cannot see the change item 4 makes. My R0 also made two false statements about that gate (B-1). Stacy's review and Peter's ruling are the checks.

---

## 0. Scope

**In scope.** These are the outputs of the charter record § 2 as put to Peter at the firing (record § "Fired", *Plan*):
- (1) the row-state × act table (item 1);
- (2) the closed list of act kinds and their (iv)-line forms (item 2);
- (3) withdrawal of `[orphaned-key]` rows (item 3);
- (4) the link-1 fix (item 4);
- (5) U3's rows classified against the table (item 7);
- the link-7 ordering found at the v3 run (item 5).

The session's evidence and Stacy's R1 add four more:
- item 6 (F-2), the rows that render nothing at link 7;
- item 8, Ada's commit-form finding;
- F-1, the bound for a granted or re-attesting act, which item 4 forces;
- F-4, the re-disposition of a rendering-less signed row, which moves no hash (Stacy R1 B-2).

**Out of scope.**
- **Link 4, entirely.** That is output 6. It is already discharged: ballot `2026-10-23-link4-candidate-first-sha-after-commit` was applied by #769 (`e7d82c377`, with the dedupe fix), and its record was closed by #773 (`24d2ad891`). § 3 of the charter record reads output 6 as done, and application step 10 records that. Any later link-4 matter takes its own ballot.
- **RS-36's items**, which stay with Spec 131's requirements (`.kiro/issues/2026-10-26-signing-chain-audit-false-verdicts.md`, Trigger as re-ruled 2026-11-01):
  - link 6 matched by content;
  - link 7's list-marker normalisation (fix 3);
  - the `late-read 7` position rule;
  - the loaded-charter question, ruled by Peter 2026-10-27 ("Re: 4, I support the recommendation");
  - the `seat-commit.sh` wrapper's change to § 4.3.

  Each is about the *evidence* a link reads. This ballot is about *which row states admit which acts*. F-2 is the one place it touches link 7's evidence, and only for rows that have no rendering to read.
- **The second trigger** (a second signed-unit rename before this ships) has not fired.

---

## 1. Evidence: what the unmodelled shapes have cost

The signing-act ballot modelled one shape, re-signing a stale row. Each later shape has needed its own ballot or ruling: first signatures (2026-10-21), holds (2026-10-22), the clause-5 withdrawal grant (2026-10-23), and the U11 re-cut (2026-11-08). The evidence:

1. **A withdrawal on a fresh row passes `--ci` today. VERIFIED by probe** (mine at `3e76b6205`; reproduced by Stacy, R1 § 1).
   - The setup: a scratch commit on a detached worktree, under `Agent: Ada`. It removes the `signature` of `ada.dispositions.yaml#frontmatter:commands[functional-suite]` (a fresh `superseded-by` row) and its sheet section.
   - `verify-signing-chain --ci --base HEAD~1 --head HEAD` printed `signing-chain: 1 row(s) checked across 1 signing commit(s)` and `signing-chain: PASS — consistency, not identity`.
   - The cause is `actMoved` (`verify-signing-chain.ts` L413, used at L904). A removed signature sets `pinnedMoved` (L713), so it counts as a moved hash.
   - No probe commit was ever pushed.
2. **The v3 rename** (charter record § 1). A signed row cannot be re-keyed in one commit by anyone. The lawful order was withdraw → re-key → sign fresh. At the withdrawal the row was on neither list, only `[orphaned-key]`. It ran under a clause-5 grant, and it passed `--ci` through `actMoved`, not through its bound. The withdrawal (`2f63d2708`) kept its sheet section, with a dated `withdrawn:` line: the ledger form (item 1, B-4).
3. **U11, (g) then (A′)** (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-u11-link7-recut.md`).
   - Stacy's (h) was to redo Kenya's two `FAIL 7` acts on top of #775, *as one re-sign per row*. That fails `--ci` F5, because a one-commit redo on a fresh row moves no hash.
   - A two-commit redo (withdraw, then sign with the same hashes) would have passed the gate (item 11). It was out of bound under clause 3 all the same, so (g), a branch cut before the acts where the rows are in bound again, was the only *lawful* route without a grant. *(Corrected at R2, Stacy R1 B-1. R0 said (g) was "the only route with no grant", which is false as a statement about the gate.)*
   - (g) works only before merge. When #775 merged, (A′) kept the FAILs standing.
   - So **a redo of a failed act is the fresh-row re-sign shape**, and Peter has ruled its posture twice: "A bar is a bar, and a fail is a fail" (2026-10-27, `c989dacf`), and (A′).
4. **#758's F12′ re-cut** (Spec 131 inbound, `.kiro/specs/131-governance-simplification/inbound-from-thurgood-2026-11-08-three-orchestration-gaps.md` § 3). The briefs had signers author their own charter text. F12′ failed, and the native-lane application was re-cut. The rule was already law (clause 4; F12′ in `walkRange`). The briefs restated the procedure from memory and dropped it. So whatever this ballot adds must reach the seat brief as rule rows a brief quotes, not as more prose.
5. **The 18.5 transition, re-pointed → superseded-by** (Spec 129 Task 18.5; `completion/task-18-5-completion.md`).
   - The order was: author re-disposes (`3d479bd4b`), Lina regenerates (`7cfe548e7`), Kenya and Data re-sign (13 acts).
   - `--ci` passed. `--audit` read **anchored 9, `record absent 7` 4**. The four are the trim and verdict rows, which now render nothing.
   - The order is the one item 5 makes law. These rows went stale because their rendering *left* the consumer output. A move *between* the two rendering-less dispositions would not have staled them (item 12).
6. **Rows that render nothing can never anchor link 7.** `--census-routed` (digest `5e634869…`, 1122 rows; 426 routed; 0 unsigned-routed; the same at `3e76b6205` and `929972713`) shows **261 of the 426 routed signed rows render nothing**: 237 `no-consumer-counterpart` and 24 `superseded-by`.
   - Each act on them reads `record absent 7` ("the row renders nothing", code ruling 9, `verify-signing-chain.ts` L1691) for good.
   - #758 read 22 of its 40 acts this way. That is from #769's before/after table as recorded in `.kiro/issues/2026-10-26-signing-chain-audit-false-verdicts.md`; Stacy did not re-verify it at R1. 18.5 read 4 of its 13.
   - Today "record absent" means two things: "the record is missing" and "there is nothing to read".
7. **Three signed rows are off the population.**
   - The census reads `not-routed signed` for `leonardo#frontmatter:writeScope[product/**]` (now `retained`), `leonardo#step-3-specify-the-screen:preamble` and `sparky#in-scope` (re-pointed body rows that C18 does not route).
   - They are three of the five first signatures named in the signing-act ballot's 2026-10-21 Errata line, where Peter ruled "Let's go with the class-level fix" and kept them standing.
   - No list holds them. The sweep still checks their freshness.
   - A second shape is on record: a signed `re-pointed` row re-disposed to `retained` (`fe6ab7470`), with its signature withdrawn afterwards in the ledger form (`17cf39eac`, under a grant).
8. **The ordering found at the v3 run** (charter record § 3). Stacy's first signature `999c4c6f` was judged against a fresh local rendering, and the regeneration was committed after it (`460a4574e`). Link 7 reads the rendering at the act's own commit, so the act reads `record absent 7` "the row renders nothing", which is false, and reads so for good.
9. **The print mode (#779, `3f739b07f`) makes "the whole unit was read" checkable.**
   - One tool result carries a header naming the target (`verify-signing-chain --print — … — <record>#<fragment>`) and its `read at <sha> (working tree); clean` line.
   - It then carries the canonical unit between begin and end lines and its `canonicalHash:`.
   - For a dispositions row it adds every rendered piece and a `renderedHash:` line. For a row that renders nothing, it prints `(the row renders nothing — no rendered piece)` above that line.
   - So even a rendering-less row has a printable record of what was read. That record is tied to its row by the header's `<record>#<fragment>` and by `canonicalHash:`, never by `renderedHash:`: for all 261 rows the latter is one constant (item 12; Stacy R1 N-1).
10. **Ada's finding: two commit forms in two restatements.**
    - The seat-brief template, step 4 (`.kiro/issues/2026-11-05-signing-act-prevention-four-fixes.md`, "Seat-brief template", interim home), says "with no `-q`".
    - `governance/signing-seat-brief.md` § "The commit line" uses `git commit -q -F - <<'EOF' && git log -1 --format='%H %s'`, and fixture P8 parses that block.
    - Under § 4.3 as amended on 2026-11-08 both forms anchor: P8 (`-q`) and P9 (no `-q`, the bracket line, de-duplicated by #769). The "no `-q`" rationale ("so audit link 4 can see it", Spec 129 `feedback/tasks.md` L624) predates #769 and no longer holds.
    - #790 (`bf4cd7677`) recorded the disagreement on the four-fixes record, with "to be made to agree when it next moves". Item 8 sets the timing.
11. **A fresh-row redo passes `--ci` today, in two commits.** Found by Stacy (R1 B-1). **VERIFIED by my reproduction at `929972713`.**
    - Commit 1 (`Agent: Ada`) removes the `signature` of `ada#frontmatter:commands[functional-suite]`. Commit 2 puts the same signature back, with the same hashes. The tree then equals the base.
    - `--ci --base <base> --head HEAD` read `2 row(s) checked across 2 signing commit(s)` and `PASS`. The withdrawal passes through `actMoved`. The `sign` passes as a first signature, because the withdrawal put the row on `unsigned-routed`.
    - Stacy shows the same for a record unit (`ada.yaml#identity`: `canonicalHash` and section removed, then put back).
    - So the route is out of bound by law (clause 3) and open at the gate. Item 4 closes it, at the withdrawal (fixtures W1b, W5c). Her history walk finds it has never been used since `R` (§ 7).
12. **A re-disposition between the two rendering-less dispositions stales nothing.** Found by Stacy (R1 B-2, probed). **VERIFIED in part by me at `929972713`.**
    - All 261 signed rendering-less rows pin the same `renderedHash`, `sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570` (my count over every tracked dispositions file: 261 rows, one value). That is `hashEntry([])`.
    - Freshness compares the two pinned hashes and nothing else (`signatures.ts` `checkSignatureFreshness` L134–137). Neither `disposition` nor `destination` is pinned.
    - So moving a signed row from `no-consumer-counterpart` to `superseded-by`, or changing a `superseded-by` destination, leaves it fresh. Stacy probed `ada#frontmatter:commands[validator-tests]`; the sweep read `stale: 0`. I did not re-run the regeneration half of her probe; the constant pin is the cause.
    - The signature then stands as assent to a disposition its signer never judged. A refusal answered by such a re-disposition can never be resolved in bound: the re-sign moves no hash (F5), and the row is on no list.
    - Her walk finds 0 instances since `R`. The defect is latent. F-4 decides its mechanism.
    - The same holds for a `re-pointed` row's `destination`, which the renderer never reads (only `regrounding/derivation.ts` L225, L321 does). A destination change with the overlay unchanged moves no hash either. Her walk finds 0 such changes since `R` (Stacy R2 N-7).
13. **After a ledger-form withdrawal, a second section on the same key fails.** Found by Stacy (R2 B-5). **VERIFIED by my reproduction at `929972713`.**
    - The evidence check wants one note block per fragment (`freshness.ts` L582–583, "want 1"), and the kept section already is one.
    - Commit 1 (`Agent: Ada`) withdraws `ada#frontmatter:commands[functional-suite]` in the ledger form. If commit 2 restores the signature with a *new* `` ## `#frontmatter:commands[functional-suite]` `` section, `--ci` reads `operative-set-freshness: FAIL` (`evidence resolves to 2 note blocks … (want 1)`) and `FAIL link 2` (`a sheet carries a section that is no signing object: … (2)`). If commit 2 writes into the kept section instead, it reads `PASS`.
    - Writing into the kept section is what every in-place re-act already does. 18.5's re-signs append a dated paragraph under the section's `signer:` line (`72815fe7b`, `signatures/data.md`). A re-confirmation rewrites the section's `canonicalHash:` line to the current value and keeps the prior ruling below it as prose (`confirmations/ada.md` between `3e76b6205` and `929972713`). The checks read the first `signer:`, `canonicalHash:` and `items:` lines (`freshness.ts` L253), so those lines must carry the current act's values.
14. **One recorded act turns red under item 4: `7eb517fca`.** Found by Stacy (R2 B-7, correcting her R1 count). **VERIFIED in part by me at `929972713`.**
    - It is the sheet half of Sparky's first signature on `writeScope[.kiro/issues/**]` (#397, merged as `096e11f99`). Its signature half is `15e190326`, the commit before it.
    - Today `--ci --base 15e190326 --head 7eb517fca` reads `1 row(s) checked across 1 signing commit(s)` and `PASS`, because adding a section sets `sectionMoved`.
    - Under § 2a a commit that changes only a sheet section is a re-act. At its first parent the row is signed and fresh, so it reads `FAIL 1`.
    - My re-run of the population her R1 walk missed: 212 commits on PR heads since `R`, not reachable from `origin/main`, touch `signatures/` or `confirmations/`. Four of them touch no other signing path: `7eb517fca`, `94ab39094`, `b87a26ca7`, and `03c0191d6` (which also touches `canonical/generated.lock`). I read each one's verdict today: `7eb517fca` PASS; `94ab39094` and `b87a26ca7` FAIL 1 (holds written as sheet edits, before the hold ballot); `03c0191d6` FAIL 2 and 3 (the never-merge F9 bite). So exactly one changes, and the count of record is **1 of 218** (her 214 plus these 4). I did not re-run her 212-act stale-at-parent walk.

---

## 2. The items

Each item gives its edit sites with before and after text. "The signing-act ballot" is `.kiro/docs/ballots/2026-10-01-signing-act-chain.md`. `<A>` is the application PR's base SHA, written in at application. `{F-n}` marks text that the fork's ruling supplies. The text for each option is in § 6.

### Item 1 — The row-state × act table (new § 2a; new clause 9)

**Site 1a — the signing-act ballot, § 2, after clause 8.** Before: none (new clause). After:

> 9. **The shapes.** § 2a is the closed table of row states and the acts on them. An edit to a signing object that is none of § 2a's act kinds is not a signing act. It is authoring, or a finding.
>    *(added 2026-11-08 by ballot 2026-11-08-signing-act-shape-review item 1.)*

**Site 1b — the signing-act ballot, a new § 2a between § 2's register line and "Why function-derived".** Before: none. After (verbatim, with § 2a's own heading; the "Grants and re-attestation" paragraph is § 6's ruled F-1 (d); F-4 (a)'s "Re-disposition" paragraph lands in the application's PR 2, § 5):

> ### 2a. Row states and acts *(added 2026-11-08 by ballot 2026-11-08-signing-act-shape-review items 1–3 and 5)*
>
> **States.** Each one is decided over a committed tree by the freshness sweep's own function (`freshness.ts` `listsAt`). That is the C16 sweep's lists and the census mode's population.
> - **unsigned-routed**: routed (C18, clause 5), no signature. On the sweep's `unsigned-routed` list.
> - **unsigned-unrouted**: a current row that does not route and carries no signature (a `retained` row; a re-pointed body row C18 does not route). On no list.
> - **fresh**: signed, routed, both pinned hashes current. On no list.
> - **stale**: signed, a pinned hash ≠ current. For a record unit: `canonicalHash` ≠ current, or absent. On the sweep's `stale` list.
> - **unconfirmed** (record units only): a record unit whose confirmation sheet holds no note block for it (the sweep's "confirmation resolves to 0 note blocks" finding). On the sweep's `unconfirmed` list.
> - **refused**: a signed row whose signature carries `refuse`. It is otherwise fresh or stale and takes that state's cells. While it stands, S-T3 reads red.
> - **signed-unrouted**: signed, current key, not routed. On the sweep's `signed-unrouted` list.
> - **orphaned**: the row's or record unit's key names nothing current (the `[orphaned-key]` refusal). On the sweep's `orphaned` list.
> - **deleted**: the row is absent.
>
> A **hold** is not a state. It is a clause 6 line on a row in bound, naming the list the row is on, and it resolves as the row's later in-bound act, or as *withdrawn* when the row leaves the bound. That is the hold's word, an end with no edit. It is not the act `withdraw`.
>
> **Act kinds (closed).** An act's kind is read from **the row's pinned object**: the dispositions `signature` sub-object for a signature, the record unit's `canonicalHash` for a confirmation. The sheet section never decides the kind. An object absent at the first parent and present at the commit is a first act; present then absent is a withdrawal; present at both and changed is a re-act. A commit that changes only a sheet section is a re-act on that row, except on an unconfirmed unit: there the confirmer's first note block is `confirm` when, at the commit, the commit adds exactly one note block for the unit, the block's `canonicalHash:` line equals the record unit's `canonicalHash`, and both equal the unit's current hash, which the instrument computes itself. For that one state the block's `canonicalHash:` line is the pinned object; the section's presence never decides the kind. So a first act carries its pinned object and its sheet section **in one commit**. A section committed alone after its signature reads as a re-act on a fresh row and fails link 1 (`7eb517fca`).
> - `sign`: a first signature that assents;
> - `refuse`: a signature carrying `refuse`, first or on a signed row;
> - `re-sign`: an assenting signature replacing a signature;
> - `confirm`: a record unit's first `canonicalHash`, with its sheet section; or, on an unconfirmed unit, its first note block under the condition above;
> - `re-confirm`: a confirmation replacing a confirmation;
> - `withdraw`: a signature, or a record unit's `canonicalHash`, removed. The sheet section is a ledger and is kept, with one added line `withdrawn: <date> — <reason>` (the form at `2f63d2708` and `17cf39eac`); a later act on the key writes into it ("One section per key" below). A withdrawal that removes the section instead is still a `withdraw`, by its pinned object;
> - `hold`: a line, with no edit (clause 6).
>
> **One section per key.** A key's sheet section is its ledger for every act on that key. A later act on a key whose section is kept, after a withdrawal or otherwise, writes into that section, as every in-place re-act does: the section's field lines (`signer:`, and for a confirmation `canonicalHash:` and `items:`) carry the current act's values, the act adds a dated paragraph, and earlier entries and any `withdrawn:` line stay below as prose. A second section with the same heading fails the sweep (two note blocks) and link 2.
>
> **Authoring acts on the same rows.** These are never signing acts: row add, row delete, re-key (a delete plus an add), re-dispose (any change of `disposition` or `destination`, among `retained`, `re-pointed`, `superseded-by` and `no-consumer-counterpart`), overlay text and pins, operative-set items, and the regeneration of `canonical/_consumer-output/**`. Each runs under charter scope or a grant, in a commit that touches no signing object (link 2).
>
> **The table.** "IN *list*": in bound when the row is on *list* at the act's first parent; link 1 decides. "GRANT": clause 5; link 1 fails it, granted or not (F-1 (d)). "AUTH": authoring; link 2 confines it. "X": no lawful single commit does it; the cell names the lawful order. "—": no such act. Verdicts are link verdicts of `walkRange` at the act's commit. `--ci` over a range also needs the sweep green at the range's head, which a lone withdrawal does not leave (a record unit with no `canonicalHash` is stale; a routed row with no signature turns S-T3 red). The fixture ids are the table's (§ 4.5 list; Stacy's).
>
> | State | `sign` · `refuse` (first) | `re-sign` · `refuse` (signed row) | `withdraw` | `hold` | row delete · re-key | re-dispose |
> |---|---|---|---|---|---|---|
> | unsigned-routed | IN unsigned-routed · FU1–FU32 | — | — | line | AUTH | AUTH (may leave the population) |
> | unsigned-unrouted | GRANT · FU (the #337/#378 shape) | — | — | not in bound | AUTH | AUTH (may route it) |
> | fresh | — | GRANT · F5 (the U11 (h) redo; `c989dacf`) | GRANT · **W1**, **W1b** (the two-commit redo) | not in bound | X: the author's commit deletes the signer's object (link 2/3, **A1**). Order: re-dispose or change the unit first, so the row is stale, orphaned or signed-unrouted; then withdraw; then delete or re-key | AUTH. The row goes stale only if a pinned hash moves (**S3**). For a row that renders nothing, a move between `no-consumer-counterpart` and `superseded-by`, or a destination change, moves none until F-4 (a)'s pin applies (§ 2a, "Re-disposition") (**D1**) |
> | stale | — | IN stale, and a pinned hash moves (F5) · **S1**, **S2** | IN stale · **W3** | line | X: withdraw first (as fresh) | AUTH |
> | signed-unrouted | — | IN stale if stale, else GRANT | IN signed-unrouted · **W4**, **W6** | not in bound | X: withdraw first | AUTH (may route it) |
> | orphaned | — (no current unit) | — | IN orphaned · **W2**, **W6** (the v3 shape) | — | signed: X, withdraw first, then re-key, then `sign` from unsigned-routed (the v3 order); unsigned: AUTH | AUTH |
> | deleted | — | — | — | — | removing a sheet section that keys to nothing is cleanup, not an act; adding one fails link 2 | — |
> | record unit: stale | `confirm` / `re-confirm` IN stale, and a hash moves (F5) | | IN stale | line | items, unit add: AUTH | — |
> | record unit: unconfirmed | `confirm` IN unconfirmed, the three hashes equal · **U1** (controls **U2**, **U3**, **U6**) | | GRANT | line | items, unit delete, re-key: AUTH | — |
> | record unit: fresh (it has its note block) | — | `re-confirm` GRANT · F5 (`c989dacf`) | GRANT · **W5b**, **W5c** | not in bound | — | — |
> | record unit: orphaned | — | — | IN orphaned · **W5a** | — | re-key: X, withdraw first | — |
>
> **Across acts.**
> - A seat that acts in a range authors its own charter in no commit of that range (clause 4; F12′, link 2).
> - A **redo**, re-making an act whose audit read anything but `anchored`, is the fresh row's `re-sign`, or the fresh row's `withdraw` followed by a `sign`. Either way it is GRANT. Its only lawful route with no grant is a branch cut before the act, where the row is in bound again (the U11 (g) route), and that route exists only before merge.
> - An **authoring round trip** also puts a fresh row in bound with no grant: the author re-disposes it to `retained`, the signer withdraws it (signed-unrouted), the author re-disposes it back, and the signer signs it (unsigned-routed). Every link holds. It is the same class as a canonical edit that stales a row, and it is visible only in history. The claims pass counts round trips (Stacy R1 N-3).
>
> **Grants and re-attestation.** No row is in bound for a re-attestation (Spec 125-B U3) until a ballot in U3's tasks round sets its bound, once U3's identity mechanism is known. A clause-5 grant does not pass `--ci` link 1. It is executed only where the row is in bound: on a branch cut before the act, or after an authoring change that stales it.

**What this cell set rests on.** Every IN, GRANT and X cell restates a ratified clause, except the rows items 3–5 change: the withdraw cells for orphaned, signed-unrouted and stale; and item 4's "at the act's first parent". The table adds one state the sweep cannot compute from a tree as the signature stands: the fresh rendering-less row whose disposition its signer never judged. That state is F-4's. *(R0 claimed "no state the sweep cannot compute"; Stacy R1 B-2 showed that claim false.)* "signed-unrouted" and "orphaned" are lists the sweep already half-computes: `routedPopulation`'s `all`, and the orphaned-key refusal.

### Item 2 — The closed act kinds in the acts list (clause 6 (i) and (iv), and the hold form)

**Site 2 — the signing-act ballot, § 2 clause 6.**
- Before, (i): "(i) the rows whose signature or confirmation changed ⊆ the stale list;"
- After, (i): "(i) each row whose signature or confirmation changed is on the list its act kind names (§ 2a) at the commit's first parent;"
- Before, (iv): "(iv) the PR body lists the acts — the set in (i), one line each, `<dispositions file>#<row> — <seat> — <commit sha7>`, beside the pasted stale list."
- After, (iv): "(iv) the PR body lists the acts — the set in (i), one line each, `<dispositions file>#<row> — <seat> — <kind> (<list>) — <commit sha7>` (`<operative-set file>#<anchor>` for a confirmation), where `<kind>` is one of § 2a's closed kinds and `<list>` is the list the row was on at the commit's first parent — beside the pasted lists, each naming the commit it was taken at."
- Before, the hold form: "`<dispositions file>#<row> — <seat> — hold: <reason>` for a signature, `<operative-set file>#<anchor> — <seat> — hold: <reason>` for a C16 confirmation".
- After, the hold form: "`<dispositions file>#<row> — <seat> — hold (<list>): <reason>` for a signature, `<operative-set file>#<anchor> — <seat> — hold (<list>): <reason>` for a C16 confirmation, where `<list>` is the list the row is on when the hold is given". *(Stacy R1 § 6, condition 2.)*
- The rest of the hold sentence is unchanged. Its pointer line gains `*(amended 2026-11-08 by ballot 2026-11-08-signing-act-shape-review item 2; prior text at <A>.)*`. The 2026-10-21 note under it ("'the stale list' in (i) and (iv) reads as clause 3's bound") is kept as history and marked superseded by this item.

**Why the kind and the list go in the line.** Each line can then be checked against `--census-link1` over the PR's range (K1), which prints the same kind and list tokens byte for byte. That is Stacy's reading at R1 § 6, condition 1. A pasted list is one snapshot, and S13's order crosses list states, so the pasted lists are context for the line, not its proof. A withdrawal is visible as one, not as an act that moved a hash.

### Item 3 — Withdrawal in bound: orphaned and signed-unrouted (clauses 3 and 5)

This is output (ii). Stacy reads an orphaned key as the limit case of stale. This item adopts that reading. It adds the signed-unrouted rows of § 1 item 7 on the same ground: each carries a signature that no longer pins a routed unit, and only its signer can remove it. Stacy accepted that ground at R1 § 6, with the authoring round trip (§ 2a, "Across acts") as its cost. Both withdrawals on record are in this bound: `2f63d2708` (orphaned since `033b3dc3d`) and `17cf39eac` (signed-unrouted since `fe6ab7470`), each an ancestor of the act's first parent (Stacy R1 § 4).

**Site 3a — the signing-act ballot, § 2 clause 3.**

Before (verbatim):

> 3. **Bound — the stale list or the unsigned-routed list.** A signing act is valid only for a row on the branch's **freshness stale list or its unsigned-routed list**, as the C16 `operative-set-freshness` sweep reports them (`npm run check:122:diff-guard`, which runs the sweep first). The lists are taken before signing, **re-taken each round** (a refusal's re-disposition moves the hash again, and the re-sign that follows is in bound), and **pasted into the PR body**. The lists are a property of the tree: a stale entry carried onto a unit branch by merging `main` is in bound on that branch, exactly as one the branch's own change created.

After:

> 3. **Bound — the lists.** A signing act is valid only for a row on the list its kind names in § 2a, at the act's commit's first parent. The lists are the freshness **stale list** and **unsigned-routed list**, for a confirmer's first note block that moves no hash the **unconfirmed list**, and, for a withdrawal only, the **orphaned list** and the **signed-unrouted list**, as the C16 `operative-set-freshness` sweep reports them (`npm run check:122:diff-guard`, which runs the sweep first). The lists are taken before signing, **re-taken each round** (where a refusal's re-disposition moves a pinned hash, the re-sign that follows is in bound; where it moves none, § 2a's re-disposition paragraph governs), and **pasted into the PR body**, each naming the commit it was taken at. The lists are a property of the committed tree. A stale entry carried onto a unit branch by merging `main` is in bound on that branch, exactly as one the branch's own change created. **An act is judged against the rendering committed at its first parent, so the regeneration it rests on is committed before it.**

The erratum pointer stays. A new pointer is added: `*(amended 2026-11-08 by ballot 2026-11-08-signing-act-shape-review items 3–5; prior text at <A>.)*`. The bold last sentence is item 5's. The parenthetical's correction is Stacy R1 B-2.

**Site 3b — the signing-act ballot, § 2 clause 5.**
- Before: "5. **Out of bound.** Re-signing a row **not** on the stale list (a signer changing its mind) needs a real grant, and the claims pass counts it separately."
- After: "5. **Out of bound.** An act on a row that is on none of the lists its kind names — a re-sign, refusal, re-confirmation or withdrawal on a fresh row (a signer changing its mind), or a redo of an act whose audit read anything but `anchored` — needs a real grant, and the claims pass counts it separately. A granted act does not pass `--ci` link 1; a grant is executed only where the row is in bound."
- The pointer is the same as site 3a's.

### Item 4 — Link 1 by list membership at the first parent (the `actMoved` fix)

**Site 4a — the signing-act ballot, § 3, table row 1.**
- Before: "| 1 | The row is on the PR's stale list | the freshness sweep | `--ci` |"
- After: "| 1 | The row is on its act kind's list (§ 2a) at the commit's first parent | the freshness sweep's lists over that tree | `--ci` |"
- The 2026-10-21 note under the table is kept and marked superseded by this item.

**Site 4b — the signing-act ballot, § 4.1, the "Link 1" bullet.**

Before (verbatim):

> - **Link 1, decided per signing commit**: the head is fresh by construction, so link 1 is never read from the head's stale list. A re-sign is on the stale list iff it moves the row's pinned `canonicalHash` or `renderedHash` — so a re-sign that leaves both unchanged fails (F5), and one whose hashes moved only because `main` was merged passes (F14, clause 3).

After:

> - **Link 1, decided per signing commit, at its first parent**: the head is fresh by construction, so link 1 is never read from the head's lists. Each act's kind is read from the row's pinned object (§ 2a). The row must be on that kind's list in the first parent's tree, computed by the freshness sweep's own function over that tree (`freshness.ts` `listsAt`), with the consumer rendering committed in that tree. An undecidable list fails it. A `re-sign` or `re-confirm` must also move the row's pinned `canonicalHash` or `renderedHash` (F5). A row whose hashes moved only because `main` was merged is on the stale list at the first parent, so it passes (F14, clause 3).
>   *(amended 2026-11-08 by ballot 2026-11-08-signing-act-shape-review item 4; prior text at <A>. The 2026-10-21 first-signature note below is this rule's `sign` and `refuse` case, unchanged.)*

**Site 4c — the instrument** (application PR, in my standing scope).
- `freshness.ts` exports `listsAt(read, files)`. It returns `{ stale, unsignedRouted, unconfirmed, orphaned, signedUnrouted, errors }` over a tree read through `read`, with the rendered hash computed from that tree's committed `canonical/_consumer-output/`. `runFreshnessSweep` calls it over the working tree, so there is one code path, not a second copy.
- `formatFreshness` appends three information lines, never findings: `unconfirmed: N row(s)`, `orphaned: N row(s)` and `signed-unrouted: N row(s)`, with row ids, after the two lines it prints today.
- `walkRange` replaces the `!actMoved(a)` branch (L904) with list membership by kind at `an.parents[0]`, the kind read from the pinned object (B-4). It keeps `actMoved` as the F5 conjunct for `re-sign` and `re-confirm`. It caches `listsAt` per parent, as `unsignedAt` already does. The new failure messages name the kind and the lists the row was on.
- `routedPopulation` and `routedCensus` are unchanged, so `--census-routed`'s output cannot move (§ 7).
- A census mode for link 1, `--census-link1 --range <base>..<head>`, prints one sorted line per act: `<sha>\t<rowId>\t<kind>\t<lists at first parent, or none>\t<link-1 verdict>`, then the count. Its kind and list tokens are byte-equal to the (iv) line's (K1). It adds no logic: it calls `walkRange`'s own per-act decision. The register's `census` field gains it, on the owner's word (EXECUTION under ballot `2026-10-19-instrument-census-at-draft` § 2, "Who writes it").
- The application PR reports the `--ci` step's wall time before and after (`122-diff-guard`). The cost is unmeasured. For scale: Stacy's history walk took a sweep at 179 distinct first parents for 212 acts.

**What this does to flows that pass today.**
- A re-sign whose only staleness is an uncommitted regeneration passes today on hash movement. After this item it fails link 1, because at its first parent the committed rendering still equals the pin. That is item 5's ordering, enforced for re-signs (fixture S1).
- The two-commit redo (§ 1 item 11) fails at its withdrawal (W1b, W5c).
- A first signature is unaffected: its list comes from the overlay through C18, not from the committed rendering.
- **On the record, one act turns red.** Stacy's walk over 784 PR heads found 212 hash-moving re-acts, all on the stale list at their first parent, and 2 withdrawals, both in item 3's bound. Four sheet-only commits complete the population; of those, only `7eb517fca` changes, from PASS to FAIL 1 (§ 1 item 14; § 7). So 1 of 218 recorded acts changes verdict. *(Corrected at R3; R2 read 0 of 214, Stacy's R1 count, which she corrected at R2 B-7.)* No merged act is re-judged (clause 8): the application handles this one line as the ratified delta (§ 5 step 6).

### Item 5 — The ordering: the rendering an act is judged against is committed first

**Site 5a** is clause 3's bold last sentence (site 3a).

**Site 5b — the instrument, message only** (out of census scope: messages only). Where link 7 finds no rendering of a row at the act's commit, but a later first-parent commit in the range renders it, the line reads `record absent 7 — the row's rendering is committed after the act (<sha8>); the act was not judged against a committed rendering (clause 3)`. It no longer reads "the row renders nothing". The verdict is unchanged under F-3 (a). Under F-3 (b) it changes.

**Site 5c — `governance/signing-seat-brief.md`**, a new rule S14 (§ 3 below).

### Item 6 — Rows that render nothing, at link 7 (F-2)

The table's cells hold whatever F-2 rules. Link 7 is § 3's evidence rule, and its verdict vocabulary is § 4.4, so the choice is LAW and Peter's. Every option's after-text is in § 6.

### Item 7 — Spec 125-B U3's rows classified (output 5)

**The listing**, run at `3e76b6205` and re-run at `929972713` with the same census digest:
- The record's own command counts sheet lines: 231 `signer:` lines in the ten primary sheets, against 124 at 2026-10-15. Sheet lines are not rows.
- The decidable count is the census mode's, one line per dispositions row: `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --census-routed` (digest `5e634869e02255cddc4a34f0a909c1850aac46a8437cf633db43b4adf22c4c6f`).
- The sweep, run over the same tree: `stale: 0`, `unsigned-routed: 0`, findings 0, so `orphaned: 0`. `refuse` occurs in no dispositions file.

| Scope (the record's "open at the trigger") | Rows | State (§ 2a) | Render nothing | Confirmation units |
|---|---|---|---|---|
| Narrow: Stacy as signer, in the record's primary scope (10 dispositions files: her C1-carve-out rows, plus the 34 rows of `stacy.dispositions.yaml`, where she signs as owner; label corrected at R2, Stacy R1 N-6) | **190** (`stacy` in the census's signer column) | fresh 190 | 108 (105 `no-consumer-counterpart`, 3 `superseded-by`) | 167 in 10 records (`confirmer: stacy`), all fresh |
| Wide: every signed row | **429** (426 routed + 3 not routed) | fresh 426; signed-unrouted 3 (§ 1 item 7) | 261 (237 + 24) | 375 in 17 records, all fresh |

**The classification.**
- **By law today (clause 3): 0 of 190 (narrow), and 0 of 429 (wide), are in bound for any act a re-attestation could make.** Every row is fresh or signed-unrouted, and so is every unit. A re-attestation is clause 5's out-of-bound act.
- **At the gate today, that is not what `--ci` enforces.** A one-commit re-sign or re-confirm fails F5. The two-commit redo (withdraw, then sign with the same hashes) passes (§ 1 item 11). So U3's re-attestation could pass `--ci` today *out of bound*.
- **At the gate after item 4**, the two-commit redo fails at the withdrawal (W1b, W5c), and every re-attesting shape fails link 1, granted or not (F-1 (d)).

*(Corrected at R2, Stacy R1 B-1. R0 said "U3's re-attestation cannot pass `--ci` under the ratified text, granted or not". As a statement about the shipped gate that was false.)*

**Site 7** — `.kiro/issues/2026-10-15-123-125b-u3-re-attestation.md` gets a dated line at application (rule 9, by its owner Stacy, with me as co-owner). It carries this table, replaces the listing command with the census filter (`… --census-routed | awk -F'\t' '$4=="stacy"'` for the narrow scope), and points to F-1's outcome. The rows will have moved again by U3: the classification is re-run at U3's trigger, by its commands, and this table is not carried as fact.

### Item 8 — One commit form in the two restatements (Ada's finding)

This is not LAW. Both forms conform to § 4.3 as amended, and neither restatement is a source of law.

**Site 8** — the four-fixes record's seat-brief template, step 4, gets a dated line (rule 9, by its owner, me). The template keeps its interim home until item 2 of that record moves it.
- Before (unchanged at `bf4cd7677`, L51): "4. **Commit in the proven form, one act per commit, in its own tool call, with no `-q` and no push in the chain:**"
- After: "4. **Commit in the governed form, `governance/signing-seat-brief.md` § "The commit line", one act per commit, in its own tool call, with no push in the chain:**"
- The example lines below it take that section's `-q` form. The superseded line stays inline, labelled (ledger rule).
- **Timing** (Stacy R1 N-4). #790's line (my own, on the same record) said "to be made to agree when it next moves". This ballot's application comes first and supersedes that timing. The reason: the orchestrator's practice is to copy the template's steps verbatim into signing briefs, so the disagreement reaches every brief written before the template moves. The application adds a dated line under #790's, citing this item.

The four-fixes item 2 wrapper's refusal of `-q` is Data's design and rides the RS-36 ballot. This item does not decide it ([@DATA], § 9).

---

## 3. Restatement sites (applied with items 1–5)

**`governance/signing-seat-brief.md`.** Owner: Thurgood. Peter-merged. MCP-served (`signing-seat-brief`). It is unchanged between `3e76b6205` and `929972713`.
- **"What this document is"**, the authorities list: add "ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md` (§ 2 clauses 3, 5, 6 and 9, and § 2a, the row states and acts);". `Last Reviewed`: the application date.
- **S1.** The before-text is the current row (L44). After:

  > | S1 | **Act only on rows in bound, by the list your act's kind names.** The freshness sweep (`npm run check:122:diff-guard`) prints five lists: `stale`, `unsigned-routed`, `unconfirmed`, `orphaned` and `signed-unrouted`. A first signature or refusal needs the row on `unsigned-routed`. A re-sign, a refusal of a signed row, a confirmation or a re-confirmation needs it on `stale`, except that a first note block that moves no hash needs the unit on `unconfirmed`, with that block's `canonicalHash:` equal to the record's and to the current hash; a first note block that moves the hash needs `stale`. A withdrawal needs it on `stale`, `orphaned` or `signed-unrouted`. The lists are taken before acting, re-taken each round, and pasted into the PR body, each naming the commit it was taken at. A row on none of its kind's lists is not yours to act on under this rule. | signing-act ballot § 2 clauses 3, 5 and 9, and § 2a (ballot 2026-11-08-signing-act-shape-review). Which rows route: Spec 123 design § C18 clause 5 (a `re-pointed` frontmatter or members row routes; routes-floor ballot § 2) | `--ci` link 1 (F5, the FU, W and S cases); the pasted lists, read in the PR body |

- **S8.** The before-text is the current row (L51). After:

  > | S8 | **A hold is a line, not an edit.** "Not yet, until X" makes no sheet, signature or confirmation edit. It is a line in the PR body's acts list: `<dispositions file>#<row> — <seat> — hold (<list>): <reason>` for a signature, or `<operative-set file>#<anchor> — <seat> — hold (<list>): <reason>` for a confirmation, where `<list>` is the list the row is on. A hold is not a signing act. It resolves as the row's later in-bound act, or as **withdrawn** when the row leaves the bound. | § 2 clause 6 (as amended 2026-10-22, ballot `2026-10-22-hold-act-recorded-in-pr-body`, and by ballot 2026-11-08-signing-act-shape-review) | the claims pass reads the PR body |

- **S12.** The before-text is the current row (L55). After:

  > | S12 | **Every act is reported.** Each act is a line in the PR body: `<dispositions file>#<row> — <seat> — <kind> (<list>) — <commit sha7>` (`<operative-set file>#<anchor>` for a confirmation). `<kind>` is one of `sign`, `refuse`, `re-sign`, `confirm`, `re-confirm` and `withdraw`, and `<list>` is the list the row was on. A refusal is reported like any act. Any S8 hold lines go beside them. A refusal is a fact for the report, not a reason to change the judgment (S6): it stands until the profile author's re-disposition is answered by an in-bound act, and while it stands the profile's real test reads it as red (S-T3, "zero standing refusals", `tools/agent-generator/__tests__/consumer-profile.real.test.ts` L187). | § 2 clause 6 (iv), as amended by ballot 2026-11-08-signing-act-shape-review; clause 4 (a re-disposition answering a refusal is authoring) | the claims pass reads the PR body, against `--census-link1` over the range |

- **S7.** The before-text is the current row (L50). After:

  > | S7 | **Your sheet section is yours alone, one per key.** It is headed `` ## `#<anchor>` ``, where the anchor is the evidence anchor (`#identity` for a body row, `#frontmatter:<path>` for a frontmatter row), and it carries a `signer: <seat>` line. Write it in the same commit as the signature or confirmation it records: a section committed alone afterwards is a re-act on a fresh row and fails `--ci` link 1. A key has one section for every act on it. A later act, after a withdrawal or otherwise, writes into it: its field lines carry the current values, you add a dated paragraph, and earlier entries and any `withdrawn:` line stay below. Never add a second section with the same heading. You do not edit another seat's section. The preamble counts as your object only when every section of the sheet names you. *Convention, not law, and no check reads it*: the #445 sheets place new sections before the first `## Signing run summary` or `## Re-sign run summary` heading, or at the end where there is neither. | § 2 clause 1 (b); § 2a ("One section per key"; ballot 2026-11-08-signing-act-shape-review); the preamble reading is the instrument's (`verify-signing-chain.ts` header L74–75) | `--ci` link 2 (a section's `signer:` equals the trailer; a second section with the same heading); link 1 (a section alone, X1); the sweep's evidence check (one note block) |

- **New S13**, after S12:

  > | S13 | **Withdraw before anyone re-keys or deletes a signed row.** A signed row cannot be re-keyed or deleted in one commit: the profile author's commit would delete your signature, and your commit would edit authoring. The order is: (1) the row reaches `stale`, `orphaned` or `signed-unrouted` (a canonical change, a rename, or a re-disposition by its author); (2) you withdraw in one commit, removing the row's `signature` (or the unit's `canonicalHash`) and keeping your sheet section, with one added line `withdrawn: <date> — <reason>`; (3) the author re-keys or deletes the unsigned row; (4) you sign the re-keyed row fresh, from `unsigned-routed`. | signing-act ballot § 2 clauses 1, 3 and 4, and § 2a; the ledger rule (ballots README § "Conventions") | `--ci` links 1–3 (the W cases, A1) |

- **New S14**, after S13:

  > | S14 | **The rendering you judge is committed before you act.** Your act is judged against the rendering committed at its first parent. Print on a clean tree after the regeneration commit (the print mode's `read at` line ends `clean`), never against a regeneration that is only in your working tree. A re-sign whose staleness is in an uncommitted regeneration fails `--ci` link 1. A first signature made before its rendering is committed reads `record absent 7` for good. | signing-act ballot § 2 clause 3 (its last sentence) | `--ci` link 1 (S1); `--audit` link 7 |

- **The ruled forks' seat-brief text**: F-1 (d) adds none. F-2 (b): S6's checked-by cell gains "for a row that renders nothing, your print-mode output for that row (its header and `canonicalHash:`)". F-4 (a): S4 gains "For a row that renders nothing, `renderedHash` is `hashEntry({ disposition, destination })`." — applied with F-4 (a)'s pin, in the application's PR 2 (§ 5).

**`governance/classification-map.md`, row `signing-act-consistency`.**
- **The `rule:` line.**
  - Before: "for a row on the branch's freshness stale list or its unsigned-routed list (both printed by the freshness sweep, taken before signing, re-taken per round, pasted into the PR)".
  - After: "for a row on the list its act kind names at the act's first parent (signing ballot § 2a: the freshness stale list, its unsigned-routed list, for a confirmer's first note block that moves no hash its unconfirmed list, and for a withdrawal its orphaned or signed-unrouted list; all printed by the freshness sweep, taken before signing, re-taken per round, pasted into the PR with the commit each was taken at)".
  - Same line, before: "(stale or unsigned-routed list;". After: "(the act kind's list at the first parent;".
- **The git-links surface string**: "the stale-list / unsigned-routed-list bound" → "the act-kind list bound at the first parent".
- **Its `census` field** gains `--census-link1` (site 4c).
- **One history line**: `{ date: <application date>, change: "SHAPE REVIEW APPLIED (ballot .kiro/docs/ballots/2026-11-08-signing-act-shape-review.md, RATIFIED Peter 2026-11-08T17:45:34Z): § 2a's closed table of row states and act kinds, the kind read from the pinned object; clause 3's bound is the act kind's list at the commit's first parent (stale, unsigned-routed, and for a withdrawal orphaned or signed-unrouted), and the act is judged against the rendering committed there; clause 6 (iv) and hold lines carry the kind and the list; --ci link 1 decides by list membership (freshness.ts listsAt), with F5 kept for re-sign and re-confirm; the sweep prints orphaned and signed-unrouted lines; census field gains --census-link1; F-1 (d), re-attestation bound left to 125-B U3's tasks round; F-2 (b), the print record tied by target and canonicalHash; F-3 (a); F-4 (a) ruled, its pin, § 2a Re-disposition paragraph, S4 line and the 261 re-signs landing in the application's PR 2; check_state unchanged (armed), ARMING at the PR's merge (Stacy)", by: thurgood }`.

---

## 4. Fixtures (Stacy specifies; her R1 § 3 additions are folded)

**What each verdict means.** Every W, S, A and D case names the verdict it pins: either the link verdict of `walkRange` at the act's commit ("link"), or `--ci` over a range whose head is final ("range"). The two differ. A lone record-unit withdrawal leaves the sweep red, and a lone signature withdrawal leaves S-T3 red. So W2, W3, W4 and W5a pass at link grain. *(Stacy R1 § 3.)*

Each new case is red at the merge base where it says so, and green at the head. The W cases use the ledger form unless they say otherwise. Every case that re-acts on a key after its withdrawal writes into the kept section (§ 2a, "One section per key"), so that its only red is the one it tests (Stacy R2 B-5).
- **W1** (link): `withdraw` on a fresh row → FAIL 1. **Red at base: it PASSES today** (§ 1 item 1).
- **W1b** (range): `withdraw` on a fresh row, then `sign` of the same row with the same hashes → FAIL 1 at the withdrawal. **Red at base: PASS today** (§ 1 item 11).
- **W2** (link): `withdraw` on an orphaned row (the v3 shape: the heading renamed at the first parent) → PASS. Controls: the same withdrawal with the rename in the same commit → FAIL 2 (authoring); the unsigned row re-keyed by the author, then `sign` → PASS.
- **W3** (link): `withdraw` on a stale row → PASS.
- **W4** (link): `withdraw` on a signed-unrouted row (a re-pointed row re-disposed to `retained` at the first parent) → PASS. Control: the withdrawal before the re-disposition (the row is fresh) → FAIL 1.
- **W5a / W5b** (link): a record unit's `canonicalHash` withdrawn, its sheet section kept with a `withdrawn:` line: on an orphaned unit → PASS; on a fresh unit → FAIL 1.
- **W5c** (range): a record unit's `canonicalHash` and section withdrawn on a fresh unit, then put back with the same hash → FAIL 1 at the withdrawal. **Red at base: PASS today** (§ 1 item 11).
- **W6** (link): the ledger form exactly as at `2f63d2708` and `17cf39eac` — the `signature` removed, the sheet section kept with a dated `withdrawn:` line — on an orphaned and on a signed-unrouted row → `withdraw`, PASS. Control: the same on a fresh row → FAIL 1. A variant removing the section instead reads `withdraw` by its pinned object, with the same verdicts.
- **S1** (link): `re-sign` after an overlay-only change, with the regeneration committed **after** the re-sign → FAIL 1 (no list at the first parent). **Red at base: it PASSES today** on hash movement.
- **S2** (link): the same, regeneration committed **before** → PASS (control).
- **S3** (range): the 18.5 transition: re-dispose `re-pointed` → `superseded-by`, regenerate, `re-sign` → PASS.
- **A1** (link): the profile author's commit deletes a signed row → FAIL 2 and 3 (F4 in substance; named here as the table's cell).
- **D1**: the B-2 shape. A signed `no-consumer-counterpart` row is re-disposed to `superseded-by`, and in a second case a `superseded-by` destination changes. The verdict is per F-4; today the sweep reads fresh. Under F-4 (a) and (b) the case is red at base.
- **R1**: link 7 when the rendering is committed after the act (the `999c4c6f` shape) → item 5's message, with the verdict per F-3.
- **R2**: link 7 on a row that renders nothing → the verdict per F-2. Under F-2 (b), two controls (Stacy R1 § 3, N-1): a print whose `canonicalHash:` differs from the pin → FAIL 7; a print of another row's target → FAIL 7.
- **W7** (range): a ledger-form withdrawal on an orphaned row's key, then (after the author restores the key) a `sign` written into the kept section → PASS. Control: the same `sign` written as a second section with the same heading → the sweep FAIL (`want 1`) and FAIL 2. **Not red at base**: it pins a form, and both verdicts hold today (§ 1 item 13).
- **X1** (range): a first signature split across two commits, the `signature` then its sheet section (the `7eb517fca` shape) → FAIL 1 at the sheet commit. **Red at base: PASS today.** Control: both in one commit → PASS.
- **K1**: `--census-link1` over W1–W7 and X1 prints one line per act with the kind and the lists, byte-equal to the (iv) tokens, and its verdicts equal `--ci`'s.
- **U1** an unconfirmed unit, one block, all three hashes equal → `confirm`, IN unconfirmed, PASS; **U2** the block's hash ≠ the record's → FAIL 1; **U3** the record's hash ≠ the current unit's → FAIL 1 (the stale route, where the hash must move); **U4** a sheet-only block on a unit that already has a block → `re-confirm`, FAIL 1; **U5** the drafter writes the block → FAIL 2/3; **U6** two blocks added → the sweep FAILs and FAIL 2. K1 also prints `confirm\tunconfirmed` for U1.

That is 18 cases, against the charter record's estimate of about 10. FU1–FU32, F5 and F14 stay as they are.

---

## 5. Application: two sequential PRs, each Peter-merged

*(Peter, 2026-11-08T19:06:05Z, "Re: Buckets 3 and 4, proceed as the relevant team members recommend"; record `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-rulings-f4-two-pr-and-u3-rehome.md` item 3, Thurgood and Stacy agreeing.)* The ballot counts as applied only when both PRs have merged.

### PR 1 — the code, fixtures, seat brief and register (items 1–5, F-1 (d), F-2 (b), F-3 (a)); F-4 (a)'s pin off


1. **Record-first.** This file's Status reads `RATIFIED (Peter, 2026-11-08T17:45:34Z)` with his words and the F-1 to F-4 picks, committed before any site. *(Done at the Status commit.)*
2. **Open-branch check.** List the open PRs and unit branches whose range touches `canonical/profiles/**` or `canonical/operative-sets/**` (`gh pr list --search` plus `git branch -r`). Item 4 makes link 1 stricter on an armed required step. Each one is re-run against the application head, and any act that turns red is reported before merge, never adapted.
3. **The signing-act ballot**: sites 1a, 1b, 2, 3a, 3b, 4a, 4b, and the § 6 text of each fork's ruled option, exactly as written, with the pointers. Errata line: `§§ 2, 2a, 3, 4.1, 4.2 (and 4.4 under F-2 (c)): the row-state × act table, the closed act kinds read from the pinned object, withdrawal in bound (orphaned, signed-unrouted), link 1 by list membership at the first parent, the ordering sentence, F-1/F-2/F-3/F-4 as ruled (ballot 2026-11-08-signing-act-shape-review; RATIFIED 2026-11-08T17:45:34Z — Peter: "Ratified, F-1 (d), F-2 (b), F-3 (a), F-4 (a)").`
4. **The instrument**: site 4c, site 5b, and the ruled options' instrument halves, with § 4's fixtures as Stacy specifies them. W1, W1b, W5c, S1 and X1 are recorded red at the merge base in the PR body.
5. **The restatements**: § 3's seat-brief and register sites, and the ruled options' seat-brief text, except F-4 (a)'s, which are PR 2's.
6. **Census re-runs** (README "Re-runs"):
   - `--census-routed` at the PR's base and head must be equal; if they differ, stop and report.
   - The governance-examples census on the applied seat brief must equal § 7's proposed digest, re-run on the ruled after-text.
   - `--census-link1` runs over each PR head since `R` that touches `canonical/profiles/**` or `canonical/operative-sets/**` (`git fetch origin '+refs/pull/*/head:refs/pull/*/head'`), at the base code and at the head code. Its delta goes verbatim in the PR body. **That delta is the substitute for the census-equality read of a scratch diff, which this ballot does not have** (§ 7, departure 1; Stacy R1 N-5). **The ratified delta is exactly one line**: `7eb517fca` (#397), `canonical/profiles/consumer/sparky.dispositions.yaml#frontmatter:writeScope[.kiro/issues/**]`, PASS → FAIL 1 (§ 1 item 14). The run is compared with it input by input (README "Re-runs"). Any other difference stops the PR and is reported. That one line stops nothing and needs no fix: no gate re-runs over #397 (clause 8), the act stays on `main` as merged, and the instrument carries no exempt list.
7. **Lock refresh.** `governance/` is a closure root. Regenerate, commit the lock, and paste `npm run check:122:diff-guard`'s output, which should read PASS with the four list lines.
8. **`rebuild_index`** on the docs MCP (the seat brief is served).
9. **PR-body lines.**
   - `**Edit kind**: governance/signing-seat-brief.md — LAW (.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md)`, and the same for `governance/classification-map.md`.
   - `**Straggler sweep**:` (RS-38) for `verify-signing-chain.ts` and `freshness.ts`.
   - `git grep -n -i 'stale list' -- governance canonical/agents .kiro/steering .kiro/hooks/RELEASE-FLOW.md`, each hit's section read whole.
   - `**ARMING**:` naming the armed step whose code changes.
   - **Deletions read** (Stacy R1 N-5): `git diff --numstat <A> HEAD -- tools/agent-generator/regrounding/ tools/agent-generator/__tests__/` pasted. Each file with deletions is named, with the reason and this ballot cited. A deleted test case is named by its id.
10. **Records.**
    - The charter record gets rule 5's outcome line, naming output 6 as discharged by #769 (`e7d82c377`) and #773 (`24d2ad891`), and is `git mv`d to `archive/`.
    - Site 7's dated line goes on the U3 record.
    - Site 8's dated line goes on the four-fixes record, under #790's.
11. **ARMING** at the merge: Stacy's read of the armed `--ci` step.
12. **Between PR 1 and PR 2**: F-4 (a)'s pin is off. A re-disposition of a rendering-less row moves no hash, and the claims pass reads any such re-disposition by hand. § 2a's table cell keeps its reading ("moves none until F-4 (a)'s pin applies").

### PR 2 — F-4 (a): the disposition pin and the 261 re-signs, in one PR

1. **Base**: `main` after PR 1's merge. **Merged before the next release's squash S.** RELEASE phase 1 reads at S that no signed row still pins `sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570`.
2. **The pin**: `tools/agent-generator/derive.ts`, for a row with no rendered span, `renderedHash` is `hashEntry({ disposition, destination })`, `destination` omitted where absent; the sweep and the print mode use it. Lina is consulted (shared core). Fixture D1, red at its base.
3. **The law text**: § 2a's "Re-disposition" paragraph, F-4 (a)'s ruled text (§ 6, § 11), and S4's line, with their pointers.
4. **The re-signs**: the 261 signed rendering-less rows are stale at the pin's commit, so each re-sign is in bound (stale) for its seat. Seven seats, each act fresh, in the § 2a forms; the authoring commits come first and every re-sign is a seat's own commit (F12′).
5. **Census**: the F-4 (a) line of § 7 (stale 0 → 261 at the pin), re-run at the pin's commit; at the head, `stale: 0`.
6. **Lock refresh**, `**Edit kind**:` lines, the RS-38 straggler sweep for `derive.ts`, the register history line naming the changed hash definition, and `**ARMING**:`.

---

## 6. Forks for Peter, with each option's after-text — ruled 2026-11-08T17:45:34Z: F-1 (d), F-2 (b), F-3 (a), F-4 (a)

Each option below gives its text at every site it touches. The "{F-n}" marks in § 2 and § 3 take that text.

### F-1 — How does a granted act, or U3's re-attestation, pass `--ci`?

Item 4 removes the accidents through which out-of-bound acts pass today: the v3 withdrawal through `actMoved`, and the two-commit redo (§ 1 item 11). Clause 5's "needs a real grant" then names a grant the gate never reads. Item 7 shows that every re-attesting act is clause 5's. *(Stacy R1 N-2 corrected R0's framing of (a). The 2026-10 F-1 ruled who authorizes an act **in** bound. Clause 5 already requires a grant for an act **out of** bound, so (a) mechanizes clause 5; it does not reverse that ruling. Her narrower (a) is adopted as (a) below.)*

**(a) A committed grant list. U3's re-attestation is a granted withdrawal plus a `sign`.**
- *§ 2a paragraph {F-1}*:
  > **Grants and re-attestation.** A clause-5 act passes link 1 only as a `withdraw` named in a **signing-grant block** committed at the act's first parent. A block is a line beginning `**Signing grant**:` in a root `.kiro/issues/` record, then the lines after it up to the first blank line. Each line has the form `- <row id> — <seat> — withdraw`, where the row id is as `--census-link1` prints it: `<dispositions file>#<row>` for a signature, and `<operative-set file>#<anchor>` for a record unit. The block's header line cites Peter's ruling: his words, dated, and where they are committed. A redo, or a re-attestation (Spec 125-B U3), is a granted `withdraw` followed, on a dispositions row, by a `sign` from `unsigned-routed`, and, on a record unit, by a `confirm` from `stale` (a unit with no `canonicalHash` is stale). Each later act writes into the key's kept section (§ 2a, "One section per key"). No other kind is grantable, and F5 holds for every kind. The claims pass reads each block against the cited words; the gate reads only that the row and kind are in it.
- *Clause 5's last sentence {F-1}*: "`--ci` link 1 reads a granted `withdraw` from a signing-grant block (§ 2a); no other out-of-bound act passes it."
- *§ 4.1 link-1 sentence {F-1}*: "A `withdraw` on a row on none of its lists passes when the row and the kind are in a signing-grant block committed at the first parent (§ 2a)."
- *Clause 6 (iv) granted form {F-1}*: ", or `grant: <record>` for a granted `withdraw`".
- *Seat brief*: S1 gains "A withdrawal on a row on none of these lists needs the row in a signing-grant block (§ 2a), committed before you act." S12's list note gains "or `grant: <record>`".
- *Register `rule:` line*: after "orphaned or signed-unrouted list", add "or, for a granted withdrawal, a committed signing-grant block".
- *Instrument*: `listsAt` gains a reader for root-record blocks at the first parent (the grant-activation query's block grammar, already in my charter). Five fixtures, each in the kept-section form: a granted withdrawal then `sign` passes; a granted unit withdrawal then `confirm` passes; an ungranted withdrawal fails; a block naming another kind fails; a block committed after the act fails.
- *Cost*: one more input to an armed check, a block grammar, five fixtures, and a stated reader. Every redo, re-attested row and re-attested unit costs two acts: for U3's narrow scope, 190 rows and 167 units, so 714 acts.
- *Surviving counter*: the gate reads a list it cannot authenticate. A block is written by whoever writes the record, and only the claims pass can tell a ruled list from a typed one.

**(b) U3 writes no signing object.**
- *§ 2a paragraph {F-1}*:
  > **Grants and re-attestation.** A re-attestation (Spec 125-B U3) is not a signing act and writes no signing object. It is a record of its own: one line per row, `<row id> — <seat> — re-attested — canonicalHash <pin> renderedHash <pin>`, committed under the identity U3 ships, in the file U3's tasks name. No link reads it. A clause-5 grant does not pass `--ci` link 1. It is executed only where the row is in bound: on a branch cut before the act, or after an authoring change that stales it.
- *Clause 5's last sentence {F-1}*: "A granted act does not pass `--ci` link 1; a grant is executed only where the row is in bound."
- *§ 4.1 link-1 sentence*: none. *Clause 6 (iv) granted form*: none.
- *Seat brief*: none beyond § 3.
- *Register*: none beyond § 3.
- *Cost*: a new record form that no check reads for signer = `c1Seat`.
- *Surviving counter*: the most valuable re-attestation evidence sits outside the chain, unchecked. "Only where the row is in bound" includes the authoring round trip (§ 2a), so a determined author and signer can reach any fresh row without a grant. This is visible only in history.

**(d) Classification now; the bound at U3's tasks round. — RULED (Peter, 2026-11-08T17:45:34Z).**
- *§ 2a paragraph {F-1}*:
  > **Grants and re-attestation.** No row is in bound for a re-attestation (Spec 125-B U3) until a ballot in U3's tasks round sets its bound, once U3's identity mechanism is known. A clause-5 grant does not pass `--ci` link 1. It is executed only where the row is in bound: on a branch cut before the act, or after an authoring change that stales it.
- *Clause 5's last sentence {F-1}*: as (b).
- *§ 4.1, clause 6, seat brief, register*: as (b).
- *Site 7's line* names U3's tasks round as the ballot's home, and the U3 record's Trigger is unchanged.
- *Cost*: one more ballot, inside U3.
- *Surviving counter*: after merge, a failed act has no lawful route to a redo except the authoring round trip. That is Peter's "a fail is a fail", built into the gate. The charter record asked for "a stated bound" before U3, and (d) states that none exists yet.

### F-2 — What does link 7 read for a row that renders nothing?

These are 261 of 426 routed rows, and 22 of #758's 40 acts.

**(a) Unchanged.**
- *§ 4.2 bullet, added*: "- **A row that renders nothing** reads `record absent` 7, 'the row renders nothing — there is no rendered line to find' (ruling 9)."
- *Seat brief*: S6's checked-by cell gains "a row that renders nothing reads `record absent 7` by design".
- *Instrument*: none. *Fixture R2*: pins today's verdict.
- *Surviving counter*: one verdict means two things, and most rows can never leave it. That teaches readers to discount it. The 18.5 four and #758's twenty-two are already read as "by design" in prose, which is the rot the reporting rule exists to stop.

**(b) The print record, tied by target and `canonicalHash`. — RULED (Peter, 2026-11-08T17:45:34Z).**
- *§ 3 table, row 7, after*: "| 7 | Each signed row's rendered line appears verbatim in a tool result in that transcript; for a row that renders nothing, that transcript's print-mode output for the row (§ 4.2) | the harness store | `--audit` |"
- *§ 4.2 bullet, added*:
  > - **A row that renders nothing** (no rendered piece at the act's commit) anchors link 7 on one tool result that carries the print mode's output for that row. That output must have its header line `verify-signing-chain --print — … — <record>#<fragment>` naming the row's own target, the line `(the row renders nothing — no rendered piece)`, and a `canonicalHash:` line equal to the signature's pinned `canonicalHash`. `renderedHash:` is not matched: under no F-4 option does it identify a row. With no such result, the act reads `FAIL` 7. A row that renders nothing is never `record absent` 7 for that reason alone. The transcript is read as link 7 reads it; RS-36's `late-read` rule, when ratified, applies here too. *(added 2026-11-08 by ballot 2026-11-08-signing-act-shape-review F-2 (b).)*
- *Seat brief*: S6's checked-by cell gains "for a row that renders nothing, your print-mode output for that row (its header and `canonicalHash:`)". The four-fixes template's step 1 already requires that print.
- *Instrument*: a matcher in `runAudit`'s link-7 branch. Fixture R2, with Stacy's two controls.
- *Cost*: one matcher, three fixtures, the § 3 row and one § 4.2 bullet.
- *Surviving counter*: printing is not reading (Stacy's caveat on #779). For a `superseded-by` row, what the signer judged is the destination's rendering, and (b) never reads it. For a `no-consumer-counterpart` frontmatter row the canonical text is a short path string.

**(c) A distinct verdict.**
- *§ 4.4 before*: "**One verdict per act, from a closed set: `anchored` · `unanchored` · `record absent` · `FAIL` · `anomaly`**, with the link number on every verdict but `anchored`."
- *§ 4.4 after*: "**One verdict per act, from a closed set: `anchored` · `unanchored` · `record absent` · `FAIL` · `anomaly` · `n/a`**, with the link number on every verdict but `anchored`. `n/a` is given only at link 7, only for a row that renders nothing at the act's commit. It is never `anchored`, never counted as `record absent`, never green, and never widening (§ 5.4)." *(amended 2026-11-08 by ballot 2026-11-08-signing-act-shape-review F-2 (c); prior text at <A>.)*
- *§ 4.2 bullet, added*: "- **A row that renders nothing** reads `n/a` 7, 'the row renders nothing' (§ 4.4)."
- *Register*: the harness-links surface's REPORTING comment gains `n/a` in its verdict set.
- *Seat brief*: S6's checked-by cell gains "a row that renders nothing reads `n/a 7`".
- *Instrument*: one verdict value, and the counts line and the JSON acts. Fixture R2.
- *Cost*: a vocabulary change, and Stacy's pass forms.
- *Surviving counter*: it makes "no read evidence" the official state of most signed rows, and makes that look settled.

### F-3 — Does an act committed before its rendering ever anchor?

**(a) No. — RULED (Peter, 2026-11-08T17:45:34Z).**
- *Text*: none beyond clause 3's last sentence (site 3a) and site 5b's message.
- *Fixture R1*: `record absent 7` with item 5's message.
- *Surviving counter*: `999c4c6f`-shaped acts, signed against the right content in the wrong order, stay `record absent 7` for good. Item 5's message at least says why.

**(b) Yes, by hash.**
- *§ 4.2 bullet, added*:
  > - **An act committed before its rendering**: where the row has no rendered piece at the act's commit, link 7 reads the first later commit in the range whose rendering of the row hashes to the signature's pinned `renderedHash`, and anchors with the note `rendering from <sha8>`. Under F-2 that fallback never applies to a row that renders nothing at that later commit either. *(added 2026-11-08 by ballot 2026-11-08-signing-act-shape-review F-3 (b).)*
- *Instrument*: the fallback in `runAudit`. Fixture R1 with a control (a later rendering with a different hash → `record absent` 7).
- *Surviving counter*: clause 8 means (b) rescues no past act. In future it only forgives a breach of S14. Link 7 still requires the line in a tool result, so the real cost is a second path into link 7 that pays for the wrong order.

### F-4 — A rendering-less signed row re-disposed with no hash moved (Stacy R1 B-2)

Today a move between `no-consumer-counterpart` and `superseded-by`, or a change of a `superseded-by` destination, leaves the signature standing as assent to a disposition its signer never judged (§ 1 item 12). Stacy named the gap and left the remedy to the drafter. These are the drafter's options.

**Reach** (Stacy R2 N-7). A `re-pointed` row's `destination` is pinned by nothing either (§ 1 item 12). (a) and (c) reach only rows that render nothing, and leave that sub-case as a residual with 0 instances on record. (b) reaches every signed row, that sub-case included.

**(a) Pin the disposition. — RULED (Peter, 2026-11-08T17:45:34Z).**
- *§ 2a paragraph {F-4}*:
  > **Re-disposition.** For a row that renders nothing, `renderedHash` is the hash of the row's `disposition` and `destination`: `hashEntry({ disposition, destination })`, `destination` omitted where the row has none. A re-disposition or a destination change then moves it, and the row goes stale like any other.
- *§ 4.1 F5 exception {F-4}*: none.
- *Register*: the history line names the changed hash definition.
- *Seat brief*: S4 gains "For a row that renders nothing, `renderedHash` is `hashEntry({ disposition, destination })`."
- *Instrument*: `renderedHashOf`'s empty-span case in `derive.ts`, and the sweep's and print mode's use of it. Fixture D1: stale after the re-disposition.
- *Cost*: `derive.ts` is Lina's shared core; she is consulted. **All 261 signed rendering-less rows go stale at application**: 261 re-signs by seven seats, in bound (stale), in one round.
- *Surviving counter*: it buys a one-time 261-act round, mostly re-assenting to unchanged judgments, to close a defect with zero instances on record.

**(b) Stale by history, in range.**
- *§ 2a paragraph {F-4}*:
  > **Re-disposition.** A signed row whose `disposition` or `destination` changed in a commit of the range, after its last signing act in the range, is on the stale list at every later first parent in the range, though its hashes are current. Its signer's next act on it is a `re-sign` or a `refuse`, or a `withdraw`. `--ci` fails a range whose head leaves such a row with no later act by its signer.
- *§ 4.1 F5 exception {F-4}*: "except for a row stale by re-disposition (§ 2a), whose re-sign moves no hash".
- *Register*: the git-links surface string gains "a signed row re-disposed in range is stale until its signer acts".
- *Seat brief*: S1 gains "A signed row re-disposed in your PR's range is in bound for its signer's re-sign, refusal or withdrawal, though no hash moved."
- *Instrument*: `walkRange` tracks re-dispositions of signed rows across the range. Fixture D1: FAIL at the head with no act; PASS with the signer's re-sign.
- *Cost*: a bound that depends on history, not on a tree. Every PR that re-disposes a signed rendering-less row must carry its signer's act.
- *Surviving counter*: history is the one input the ratified bound avoided ("the lists are a property of the tree"). A re-disposition merged in one PR, and judged in a later one, is out of its reach.

**(c) Residual, read by the claims pass.**
- *§ 2a paragraph {F-4}*:
  > **Re-disposition.** A re-disposition of a signed row that renders nothing, or a change of its destination, moves no pinned hash and leaves the row fresh. The claims pass reads every such change against its signer's later act, and counts a signature left standing over a disposition its signer never judged.
- *§ 4.1, register, seat brief*: none, beyond S6's checked-by cell gaining "a re-disposition of a rendering-less row is read by the claims pass".
- *Instrument*: none. Fixture D1 pins "fresh".
- *Cost*: none mechanical; Stacy's pass reads it.
- *Surviving counter*: a refusal on such a row stays unresolvable in bound, and S-T3 stays red, short of a grant or an authoring round trip.

---

## 7. Census

The signing-act ballot is the law `verify-signing-chain.ts` cites (its L1–2), and items 3–5 and the forks name code changes to it, so they are presumptively in scope (conditions 2 and 3). The seat brief is loaded by the governance-examples guard (condition 1). The register is loaded by none of the registered checks below. F-4 (a)'s `derive.ts` change is in scope only if ruled. Its census is re-run at application, and its delta is known now, so it carries a PROJECTED line (Stacy R2 N-9).

All re-run at R2 at `main` `929972713` (`3e76b6205` gave the same digests).

- `**Census**: npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --census-routed over canonical/profiles/consumer/** and canonical/operative-sets/** @ 929972713 — current 5e634869e02255cddc4a34f0a909c1850aac46a8437cf633db43b4adf22c4c6f → proposed: not computed (no scratch diff at draft; site 4c's code is the application PR's build); 0 rows change, PROJECTED from site 4c, which leaves routedPopulation and routedCensus unchanged (delta: § Census appendix)` — covers items 3, 4 and 5.
- `**Census**: npx tsx scripts/governance-examples/check.ts --census over governance/*.md and the eight packaged steering docs @ 929972713 — current c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd → proposed c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd; 0 docs change (delta: § Census appendix)` — covers § 3's seat-brief sites. The "proposed" run is over the changed corpus (§ 3's after-text applied to a scratch copy of the seat brief), not a scratch diff to the instrument, which does not change. The fork options' seat-brief text is re-run at application on the ruled option (§ 5 step 6).
- `**Census**: freshness sweep, stale list (runFreshnessSweep, the first step of verify-signing-chain --ci and of 122-diff-guard) over canonical/profiles/consumer/** @ 929972713 — current stale 0 → proposed stale 261 under F-4 (a) only, PROJECTED (no scratch diff at draft); 261 rows change: every signed row whose disposition is no-consumer-counterpart (237) or superseded-by (24), each pinning renderedHash hashEntry([]), which F-4 (a) replaces with hashEntry({ disposition, destination })` — covers F-4 (a). Under F-4 (b) and (c) the stale list does not change.
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — no site adds, renames or removes a get_section or get_document_* citation or a cited heading`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — governance/ is an ordinary closure input; no rule, pattern or grammar the guard reads changes; the lock is refreshed at application (§ 5 step 7), where its verdict is read`

**Four departures. Stacy ruled on the first three at R1 § 6 and confirmed them at R2; the fourth is hers to rule.**
1. The first line has no proposed digest. The README asks for a scratch diff at draft, and site 4c is a build. *Accepted (Stacy R1), on N-5's condition: § 5 step 6's `--census-link1` delta, at base code and head code, pasted verbatim, replaces the census-equality read.* § 5 step 6 now says so.
2. **That line is uninformative by construction, and that is a finding on the instrument, mine.** The row's census mode composes `routedPopulation`, not `walkRange`'s per-act link-1 decision, so every census of a link-1 change reads "0 rows change", true and empty. Site 4c's `--census-link1` is the fix. *Accepted as a finding (Stacy R1).*
   - **The count Peter can rest on is Stacy's history walk (R1 § 4), not my heuristic.** I have not re-run it; her scripts are in her session scratchpad and uncommitted.
     - The population: every non-merge commit reachable from `refs/pull/*/head` (784 refs) and not from `origin/main`, since `R`, that touches a dispositions file or an operative-set record: 284 commits.
     - For each hash-moving re-act she ran `runFreshnessSweep` over its first parent's tree. Control: 30 of the first 30 act commits read fresh.
     - **212 hash-moving re-acts across 179 parents, all on the stale list at the first parent. 2 withdrawals (`2f63d2708`, `17cf39eac`), both in item 3's bound. 0 withdraw-then-sign pairs with the same hashes. 0 instances of the B-2 shape.**
     - **Corrected at her R2 (B-7)**: that population missed commits touching only sheets. With the 4 such commits (§ 1 item 14, which I re-ran), the population is 218 acts, and item 4 turns **1 of 218** red: `7eb517fca`, PASS → FAIL 1. That one line is the ratified delta (§ 5 step 6).
     - Limits (hers): force-pushed branches keep no earlier commits, and a branch that never had a PR is not in the population.
   - My R0 heuristic (2 net signature removals on `main`'s first-parent squashes: `58f511fae`, `6f23bc6fe`) agrees on the withdrawals and is kept in the appendix, labelled heuristic.
3. The second line's "proposed" is a corpus run, the departure the token-governance ballot named. *Accepted (Stacy R1), reproduced by her at `67813b0e9`.* Re-run at R2 on the revised after-text (appendix § B).
4. The F-4 (a) stale-list line is PROJECTED, with no scratch diff, as Stacy asked at R2 N-9; it is a count by construction (every one of the 261 rows pins the same value, § 1 item 12).

---

## 8. Recommendation, counter-argument (fold-back applied), residual

**I recommend items 1–8 as revised at R2.** I make no pick on F-1, F-2, F-3 or F-4.

**The counter-argument.** The signing-act ballot retired six layers for one chain, because each layer was a rule every seat had to learn. A ten-row table with seven act kinds and four forks is the same mistake from the other side. The shapes that recur are three (re-sign a stale row, sign an unsigned-routed row, withdraw before re-key), and the rest of the cells are hypothetical. A stricter link 1 on an armed required check will also break flows that work today, during the weeks 129 and 132 need signing to be cheap.

**What fold-back changed.**
- The table restates a ratified clause in every cell except the withdraw and ordering cells. It has sixteen fixtures, not one per cell.
- The seat brief gains two rows (S13, S14). S1, S8 and S12 are rewritten in place.
- The redo and re-attestation shapes are folded into existing cells (fresh × `re-sign`, fresh × `withdraw`, and F-1) instead of new kinds. F-1 (a) adds no kind (Stacy R1 N-2).
- § 5 step 2 re-runs every open signing branch before merge.
- **The "will break flows" half is now measured, and it mostly fails.** Item 4 would have turned 1 of 218 recorded acts red (`7eb517fca`, a first signature split across two commits), and the S1 shape has never occurred.

**What survives.**
1. **The review does not end one-failure ballots. It makes them fail closed.** The next shape this table missed will read FAIL 1 instead of passing. It will still need a ballot, but it is found at the gate instead of weeks later at a claims pass. R1 and R2 found five such shapes in this draft's own text (B-1, B-2, B-5, B-6, B-7), which is the argument in miniature.
2. **The table is closed over a tree, and two shapes are not.**
   - B-2's re-disposition needs a pin or history (F-4).
   - The authoring round trip puts any fresh row in bound with no grant, and only history shows it. The claims pass counts round trips; the gate never will (Stacy R1 N-3).
3. **Item 4 makes an armed required check stricter on a per-parent computation whose wall time is unmeasured.** The history walk proves its verdicts, not its cost.
4. **I wrote the defect, I draft the fix, and I own the census that is blind to it.** My R0 also stated two things about the gate falsely. Stacy's R1 caught both, and she remains the only independent read before Peter's.

---

## 9. Questions for the review round

- [@STACY] (R3) Are B-5 to B-7 met by the folds in § 10's THURGOOD R3? Do you contest § 2a's reading of a split first act as FAIL 1 (X1)? If you do, it becomes a fork for Peter. Do you accept the fourth census departure? → §§ 1, 2a, 4, 5, 7
- [@ADA] Is item 8's direction (the template follows the governed `-q` form) the correction your finding asked for, or did you mean the governed doc should drop `-q`? → § 2 item 8
- [@DATA] Does the wrapper (four-fixes item 2) still need to refuse `-q` after #769, given P8 and P9 both anchor? Your answer goes to RS-36, not here. And for your 18.5 trim and verdict acts: which F-2 option would you accept as your read evidence? → § 2 item 8; § 6 F-2
- [@KENYA] The same F-2 question for your 18.5 acts. And: for your U11 erratum's later whole-unit prints, would F-2 (b) or F-3 (b) have changed anything you were asked to redo? → § 6
- [@LINA] Clause 3's last sentence puts the regeneration commit before every act judged against it. Your regenerations come before the seats' acts in each unit (18.5's order). Does any unit shape you run regenerate after the acts? And F-4 (a) changes `renderedHashOf`'s empty case in `derive.ts`, your shared core: is that change acceptable to you if Peter picks it? → § 2 item 5; § 6 F-4

---

## 10. Review round record

### [STACY R1] (required reviewer; fixtures; census reader)

#### [STACY R1] — the table, the probe and the census, read against the instrument at `3e76b6205`

**Read at** `67813b0e9` (the ballot, `origin/chore/ballot-signing-act-shape-review`), against `main` at `3e76b6205`, on 2026-11-08 (`date -u` at writing: 2026-11-08T17:14:41Z). Nothing was committed or pushed. I ran my probes in a detached scratch worktree at `3e76b6205`, which I have since removed. I also fetched `refs/pull/*/head` (784 refs) for the history walk in § 4. `main` has since moved to `bf4cd7677` (#789, #790). `--census-routed --at origin/main` gives the same digest, `5e634869…`, so every count below still holds there.

**Verdict: OBJECT. Four blocks (B-1 to B-4) are owed before this goes to Peter.** Items 1, 3 and 4 are the right fix, and my history walk makes item 4 safer than the draft could show (§ 4). But two of the ballot's statements about the gate are false. One table cell is false for 261 rows. And the forks have no after-text for Peter to ratify. None of the four re-opens a decision.

**1. Reproduced**

- **The probe (§ 1 item 1; appendix § D), reproduced byte for byte.** I made one commit under `Agent: Ada`. It removed the `signature` of `ada.dispositions.yaml#frontmatter:commands[functional-suite]` and its sheet section. `--ci --base HEAD~1 --head HEAD` printed `unsigned-routed: 1 row(s)`, then `1 row(s) checked across 1 signing commit(s)`, then `PASS — consistency, not identity`. The cause is the one named: in `analyzeCommit`, a removed signature sets `pinnedMoved` (L713), so `actMoved` (L413) is true at L904.
- **The census mode.** `--census-routed` at `3e76b6205` gives `1122 rows; 426 routed; 0 unsigned-routed; errors 0` and digest `5e634869e02255cddc4a34f0a909c1850aac46a8437cf633db43b4adf22c4c6f`.
  - Routed: 237 `no-consumer-counterpart`, 165 `re-pointed`, 24 `superseded-by`. So 261 routed rows render nothing.
  - Not routed and signed: 3, the three named in § 1 item 7.
  - Signer column: stacy 190, lina 62, ada 52, kenya 40, data 38, sparky 31, leonardo 13.
  - Stacy's 190 are spread over 10 dispositions files. 108 of them render nothing (105 + 3).
- **Confirmation units**, counted as `canonicalHash:` lines in each record at `3e76b6205`: 375 in 17 records. 167 of them are in the 10 records whose confirmer is Stacy. The sweep agrees: `375 unit(s)`, `stale: 0`.
- **The citations I checked all resolve as cited.** These are the `actMoved` and ruling-9 line numbers (L413, L904, L1691), `c989dacf2` with Peter's 2026-10-27 words (`.kiro/issues/2026-10-26-signing-chain-audit-false-verdicts.md` L94), `999c4c6ff` before `460a4574e`, #769, #773, #779, and 18.5's "13 acts, anchored 9, record absent 4" (`completion/task-18-5-completion.md` L16).
- **Not re-verified: "#758 read 22 of its 40 acts this way"**. I did not read #769's PR body in this pass.

**2. Blocks**

- **B-1 (High): a fresh-row redo passes `--ci` today, in two commits.** This contradicts item 7 and § 1 item 3.
  - **Signatures.** I extended the probe by one commit under `Agent: Ada` that puts back the same `signature` (same hashes) and the same sheet section. The tree then equals `3e76b6205`. `--ci --base 3e76b6205 --head HEAD` reads `2 row(s) checked across 2 signing commit(s)` and `PASS`. The withdrawal passes through `actMoved`. The `sign` passes as a first signature, because the withdrawal put the row on `unsigned-routed`.
  - **Record units.** The same holds. I removed `ada.yaml#identity`'s `canonicalHash` and its confirmation section in one commit, then put both back with the same hash in a second. The range reads `PASS`.
  - **So the draft's claims are false as statements about the shipped gate:**
    - Item 7: "U3's re-attestation cannot pass `--ci` under the ratified text, granted or not".
    - § 1 item 3: "(h) … fails `--ci` F5", offered as the reason (g) was "the only route with no grant".
  - **What is true:** these acts are out of bound under clause 3, and no single-commit re-sign passes. The route is closed only by item 4 (W1).
  - **What is owed:**
    - This becomes an evidence item.
    - Two fixtures are added, each red at the base (§ 3: W1b, W5c).
    - Item 7's sentence says which of the two it means: the law, or the gate after item 4. The words are the drafter's.
  - **History** (§ 4): the route has never been used since `R`.
- **B-2 (High): the fresh × re-dispose cell is false for every row that renders nothing, and so is clause 3's own parenthetical.**
  - **What the table says.** § 2a's cell reads "AUTH · S3 (the row goes stale; then `re-sign` IN)". Clause 3 says "a refusal's re-disposition moves the hash again".
  - **Why that fails.** Freshness compares the two pinned hashes and nothing else (`signatures.ts` `checkSignatureFreshness` L134–137). No disposition or destination is pinned. All 261 rendering-less signed rows pin the same `renderedHash`, `sha256:37517e5f…`: `hashEntry([])`, one value across all 237 + 24 (my count over every dispositions file).
  - **The probe.** As profile author, I moved `ada#frontmatter:commands[validator-tests]` from `no-consumer-counterpart` to `superseded-by #what-you-dont-own` and ran `npm run build:generator`. The sweep read `stale: 0`. Ada's signature, an assent to "no consumer counterpart", now stands as assent to a destination she never judged, and the row reads fresh.
  - **Two consequences:**
    - A move between `no-consumer-counterpart` and `superseded-by`, or a change of a `superseded-by` destination, needs no act and gets none.
    - A refusal on such a row, answered by such a re-disposition, can never be resolved in bound. The re-sign moves no hash (F5), and the row is on no list. S-T3 then stays red, short of a grant or an authoring round trip (§ 5, N-3).
  - **"No state the sweep cannot compute" fails here.** This state cannot be computed from a tree as the signature stands. It needs either a pin, or history.
  - **History**: 0 instances since `R` (§ 4). The defect is latent.
  - **What is owed:** the cell, stated true, and the choice of mechanism put to Peter as a fork. I name the gap; I do not draft the remedy.
- **B-3 (Medium-High): the forks have no after-text.**
  - **What the draft says.** Item 6 says "The options and their after-text are in § 6". § 6 gives descriptions. The only text drafted is clause 5's F-1 sentence.
  - **What is missing:**
    - § 5 step 3 applies "F-2's and F-3's § 4.2 text, exactly as written", and none is written.
    - F-1 (a) adds a kind, `re-attest`, with F5 waived. That kind is absent from § 2a's seven "closed" kinds and from S12's list.
    - F-2 (c) changes § 4.4's vocabulary, and no site names it.
    - F-1 (a)'s `**Signing grant**:` block has no grammar.
  - **Why it blocks.** Peter would ratify options without reading the text they apply. My application read compares the diff with after-text, and here it would have nothing to compare against.
  - **What is owed:** every option's after-text at every site it touches, before Peter. That includes § 2a, S1, S12 and the register line under each F-1 option.
- **B-4 (Medium): the kind rule and the `withdraw` definition do not fit the two withdrawals on record.**
  - **What the recorded withdrawals did.** `2f63d2708` (the v3 shape) and `17cf39eac` (the signed-unrouted shape, after `fe6ab7470`) each removed the dispositions `signature`. Each kept the sheet section, with a dated `withdrawn` note added: the ledger form.
  - **Why the rule cannot classify them.** § 2a reads an act's kind per "signing object". Clause 1 gives an act two objects, (a) the sub-object and (b) the sheet section. In the ledger form, (a) goes present → absent, which is a withdrawal. (b) is present at both, which is a re-act. So the kind is undecidable as worded.
  - **Why S13 disagrees.** S13 step (2) says "removing … your sheet section". That makes both recorded withdrawals non-conforming, and it sits against the ledger rule.
  - **What is owed:**
    - Which object decides the kind.
    - Whether `withdraw` admits the ledger form.
    - A fixture (W6, § 3).

**3. Fixtures (mine to specify; the list in § 4 is confirmed, with these changes)**

- **Every W, S and A case names the verdict it pins.** That is either the link verdict of `walkRange`, or `--ci` over a range whose head is final. They differ, as my probes show:
  - A lone record-unit withdrawal leaves the sweep red (`canonicalHash undefined is stale`).
  - A lone signature withdrawal leaves the sweep green but S-T3 red (`consumer-profile.real.test.ts` L181, every routed row signed).
  - So W2, W3 and W5a "PASS" at link grain, not at `--ci` over a one-commit range.
- **W1b (new)**: `withdraw` on a fresh row, then `sign` of the same row with the same hashes, in one range. Expected: FAIL 1 at the withdrawal. **Red at base: PASS today** (B-1).
- **W5c (new)**: a record unit's `canonicalHash` and section withdrawn on a fresh unit, then put back with the same hash. Expected: FAIL 1 at the withdrawal. **Red at base: PASS today** (B-1).
- **W6 (new)**: the ledger form, as at `2f63d2708` and `17cf39eac`. The `signature` is removed and the sheet section is kept with a dated note added. The row is orphaned or signed-unrouted at the first parent. It reads as `withdraw`, with the verdict per B-4's ruling. Control: the same on a fresh row, FAIL 1.
- **D1 (new)**: B-2's shape. A signed `no-consumer-counterpart` row is re-disposed to `superseded-by`, and in a second case a `superseded-by` destination changes. The fixture pins the outcome as ruled. Today the sweep reads fresh, which is the probe.
- **K1** covers W1b, W5c and W6 as well.
- **R2** under F-2 (b) needs two controls: a print whose `canonicalHash:` differs from the pin, and a print of another row's target, each FAIL 7. This is because `renderedHash:` cannot tell the 261 rows apart (N-1).

**4. History walk: what item 4 changes on the record**

This replaces departure 2's heuristic of 2 squash-netted removals.

**Method.** The population is every non-merge commit reachable from `refs/pull/*/head` and not from `origin/main`, since `R`, that touches a dispositions file or an operative-set record: 284 commits.
- For each hash-moving re-act (a re-sign or re-confirm whose pinned hash changed), I extracted its first parent's `canonical/`, `.kiro/steering/` and `governance/` with `git archive`.
- I ran `runFreshnessSweep` over that tree, and checked whether the row was on the stale list there.
- **Control**: on the act commits themselves, 30 of the first 30 acts read fresh. So the method can tell a stale row from a fresh one.

**Result**:
- **212 hash-moving re-acts across 179 parents: all 212 on the stale list at the first parent.** So 0 would turn red under item 4, and the S1 shape has never occurred.
- **2 withdrawals**: `2f63d2708` and `17cf39eac`. Both are in bound under item 3: the row was orphaned since `033b3dc3d`, and signed-unrouted since `fe6ab7470`, each an ancestor of the act's parent.
- **0** same-hash pairs of withdraw then `sign` (B-1's route).
- **0** signed rows re-disposed with the signature unchanged and no hash moved (B-2's shape). The 5 re-dispositions with an unchanged signature that I found are 18.5's four, which went stale on regeneration and were re-signed, and `fe6ab7470`.

**Limits.**
- A force-pushed branch keeps no record of its earlier commits.
- A branch that never had a PR is not in the population.
- The scripts are in my session scratchpad and are not committed. The method above is enough to re-run them, and § 5 step 6's `--census-link1` is the durable form.

**5. Not blocking**

- **N-1 (F-2 (b)'s tie).** "A `renderedHash:` equal to the signature's pinned one … ties the read to the signed state" is false for these rows: the value is one constant for all 261. Only the header's `<record>#<fragment>` together with `canonicalHash:` equal to the pin ties a print to its row. Both are printed (`printMode` L2068–2072).
- **N-2 (F-1 (a)'s counter).** The 2026-10 F-1 ruled on who authorizes an act *in* bound, the function or a grant. Clause 5 already requires a real grant for an act out of bound, so (a) mechanizes clause 5; it does not reverse F-1. That leaves (a)'s real counter: the gate reads a list it cannot authenticate.
  - A narrower (a), if Peter wants a route: the grant names `withdraw` per row, and the redo is the existing `sign` from `unsigned-routed`. That keeps F5 for every kind and the list at seven kinds. B-1's probe shows the two-commit shape works.
- **N-3 (residual to state, mine to count).** An authoring round trip makes a bound with no grant. The author re-disposes a fresh row to `retained`, the signer withdraws (on the signed-unrouted list), the author re-disposes it back, and the signer signs (on the unsigned-routed list). Every link holds. This is the same class as canonical churn, which already stales a row. It is visible only in history, so my passes will count round trips. The residual should say so, and it qualifies F-1 (b) and (d)'s claim that "a grant is executed only where the row is in bound".
- **N-4 (item 8 against #790).** #790 (`bf4cd7677`, merged after this ballot's base) put a dated line on the four-fixes record: the template "is unchanged; to be made to agree when it next moves". Site 8 edits it now. The ballot needs to cite #790 and say which timing holds. Site 8's before-text is unchanged at `bf4cd7677` (L51).
- **N-5 (application, ARMING).** `verify-signing-chain.ts` and `freshness.ts` are instrument paths.
  - § 5 step 9 needs the deletions-zero read for their tests and fixtures, or the PR body has to name each file with deletions and cite this ballot.
  - Departure 1 leaves my census-equality read at ARMING nothing to compare, because there is no scratch diff. I accept that read being replaced by § 5 step 6's `--census-link1` delta at base and head, pasted verbatim, which § 5 should name as the substitute.
- **N-6 (label).** "Stacy as C1-carve-out signer" counts the 34 rows of `stacy.dispositions.yaml`, where I am the owner, not the carve-out seat. The U3 record's primary scope ("Stacy as signer or confirmer") includes them, so 190 is the right count for the record, and the label is the only thing wrong.

**6. Answers to § 9**

- **The (iv) form: it fits, on three conditions.** I will read each (iv) line against `--census-link1` over the PR range (K1), not against the pasted lists. A pasted list is one snapshot, and S13's order crosses list states.
  1. K1 prints the same kind and list tokens as the (iv) line, byte for byte.
  2. A hold line carries its list too, since a hold is valid only on a row in bound.
  3. Each pasted list names the commit it was taken at.
- **Signed-unrouted in bound for withdrawal: accepted, on the ground given.** The signature pins no routed unit, and only its signer may remove it. The one signed-unrouted withdrawal on record, `17cf39eac`, is in that bound (the other, `2f63d2708`, is the orphaned shape). N-3 is the cost.
- **§ 4's fixtures**: complete with § 3's additions.
- **Census departures:**
  - **1, accepted** under N-5's condition.
  - **2, accepted as a finding on the instrument.** § 4's walk is the count Peter can rest on in place of the heuristic.
  - **3, accepted, as for the Token-Governance ballot.** I reproduced it.
    - Current `c13c9780…52868bfd`, after `npm run build`.
    - I applied appendix § B's diff with `git apply` (numstat 5/2). The blob equals the diff's `d2f8a70b9`, and S1, S13 and S14 equal § 3's quoted rows byte for byte.
    - Proposed `c13c9780…52868bfd`. The selected line matches, `diff` is empty, the guard reads `0 pending`, and `check-section-citations` exits 0.
  - **The census line for `signing-act-consistency`** names the row's `census` field exactly (`git show 3e76b6205:governance/classification-map.md`).
  - **The two `not in scope` lines**: valid.

**7. My lean on the forks (Peter's pick)**

- **F-1: (d), with clause 5's sentence in (b)'s form.**
  - Re-attestation is an act of identity, and this chain states "consistency, not identity". Its bound belongs with whatever identity U3 ships.
  - The rule fails closed, and that is a stated bound: none of the 190 or 429 rows is in bound, and no grant executes at the gate.
  - *Surviving*: after merge, a failed act has no route to be redone, other than N-3's round trip. That is Peter's "a fail is a fail", now built into the gate.
- **F-2: (b), corrected per N-1.** It is the only option that produces evidence, and it is as strong as link 7 already is for rows that render. Where Peter declines to grow link 7, I would take (c) over (a): (a)'s one verdict carries two meanings, and the reporting rule cannot separate them.
  - *Surviving*: printing is not reading. For `superseded-by` rows, the destination's rendering is what was judged, and (b) never reads it.
- **F-3: (a).** Clause 8 means (b) rescues no past act. In future, (b) only forgives a breach of S14. The counter stated for (b) is weaker than it reads, because link 7 still requires the line in a tool result. Its real cost is a second path into link 7, which pays for the wrong order.
  - *Surviving*: an act signed against the right content, in the wrong order, reads `record absent 7` for good. Item 5's message at least says why.

**Review**: object — B-1 (a fresh-row redo passes `--ci` today in two commits, contradicting item 7 and § 1 item 3), B-2 (the fresh × re-dispose cell is false for the 261 rendering-less rows), B-3 (F-1 (a), F-2 and F-3 have no after-text), B-4 (the kind rule and `withdraw` do not fit the two withdrawals on record)

#### [THURGOOD R2] — 2026-11-08

Read Stacy R1 whole, and spliced it above byte for byte. All four blocks are folded. I reproduced B-1 at `929972713` (two commits under `Agent: Ada`, the tree back to the base, `--ci` reads `2 row(s) checked across 2 signing commit(s)` and `PASS`), and B-2's cause (all 261 signed rendering-less rows pin `sha256:37517e5f…`). I did not re-run her history walk or B-2's regeneration probe.

- **B-1 — folded.** My R0 statements were false about the gate. The fix:
  - § 1 item 3 is corrected, and a new § 1 item 11 carries her route.
  - Item 7's classification now separates three readings: law today (0 in bound), the gate today (the two-commit redo passes, out of bound), and the gate after item 4 (it fails at the withdrawal).
  - § 2a's fresh × withdraw and record-unit cells name W1b and W5c. Both fixtures are added, each red at base.
- **B-2 — folded as F-4.** The fix:
  - The fresh × re-dispose cell now says the row goes stale only if a pinned hash moves, and names the rendering-less exception.
  - Clause 3's "a refusal's re-disposition moves the hash again" is corrected in the after-text.
  - The "no state the sweep cannot compute" claim is withdrawn.
  - She named the gap and left the remedy, so F-4 gives three remedies with after-text (pin, history, residual), with no pick. (a) would cost 261 re-signs at application. D1 is added.
- **B-3 — folded.** Every option of F-1, F-2, F-3 and F-4 now has after-text at every site it touches: § 2a, clauses 5 and 6, § 3 row 7, § 4.1, § 4.2, § 4.4, the seat brief and the register. Two changes beyond the text:
  - F-1 (a) is her narrower form (N-2): a granted `withdraw` plus a `sign`, no new kind, F5 kept everywhere, with a block grammar.
  - F-2 (b) ties the print on `<record>#<fragment>` and `canonicalHash:`, never on `renderedHash:` (N-1), with her two controls.
- **B-4 — folded.** The kind is read from the row's pinned object (the dispositions `signature`, or the record unit's `canonicalHash`), never from the sheet section. `withdraw` is the ledger form: the section is kept, with a `withdrawn: <date> — <reason>` line, as at `2f63d2708` and `17cf39eac`. A removal still reads `withdraw` by its pinned object. S13 now says keep. W6 is added.
- **Non-blocking:**
  - N-1: folded into F-2 (b) and § 1 item 9.
  - N-2: folded into F-1.
  - N-3: the round trip is in § 2a and the residual, and qualifies F-1 (b)/(d).
  - N-4: site 8 cites #790. This ballot's application supersedes its "when it next moves", for the reason given.
  - N-5: § 5 step 6 names `--census-link1`'s delta as the census substitute, and step 9 adds the deletions read.
  - N-6: the narrow scope's label is corrected.
- **§ 6 conditions — adopted.** K1's tokens are byte-equal to the (iv) line's. Hold lines carry their list (clause 6 and S8). Each pasted list names its commit (clause 3, S1 and the register).
- **Census** re-run at `929972713`: `--census-routed` is unchanged; the governance-examples census was re-run on the revised seat-brief after-text (§ 7, appendix § B). Departure 2 now rests on her walk, labelled as hers and not re-run by me.
- **Her leans** (F-1 (d), F-2 (b) as corrected, F-3 (a)) are recorded here, not adopted into the draft. The picks are Peter's.

**In my reading, B-1 to B-4 are met.** Whether they are met is hers to say at R2.

### [STACY R2] (required reviewer; fixtures; census reader)

#### [STACY R2] — re-read of the fold at `9a8599b08`

**Read at** `9a8599b08` (the ballot, `origin/chore/ballot-signing-act-shape-review`), against `main` at `929972713`, on 2026-11-08 (`date -u` at writing: 2026-11-08T17:34:18Z). Nothing was committed or pushed. My runs used a detached worktree at `929972713` in my own scratchpad (`scratchpad/stacy-shape-r2/`), which I have since removed. Thurgood's worktree is untouched (clean at `9a8599b08`).

**Verdict: OBJECT, narrowly.**
- **B-1 to B-4 are met and withdrawn.**
- **Three new blocks (B-5 to B-7) are owed before Peter.** I found them by probing the folded text, not by re-reading R0. One of them, B-7, is my own error, carried into § 4 item 4 and § 7.
- Each is a sentence or a count, not a decision.

**1. R1's blocks**

- **B-1: met, withdrawn.** § 1 items 3 and 11 and item 7's three readings say what the gate does, separately from what the law says. W1b and W5c are red at base.
- **B-2: met, withdrawn.** The cell is true. Clause 3's parenthetical is corrected. The "no state the sweep cannot compute" claim is withdrawn, and F-4 carries the remedy. One completeness point stays non-blocking (N-7).
- **B-3: met, withdrawn, except one omission, which is B-6.** Every option now has after-text. The § 3 rows I compared (S1, S8, S12, S13, S14) are byte-equal to the applied seat brief.
- **B-4: met, withdrawn.** The kind is read from the pinned object, `withdraw` is the ledger form, and W6 is added. Its consequences are B-5 and B-7.

**2. New blocks**

- **B-5 (Medium): after a ledger-form withdrawal, the text never says where a later act on the same key writes.**
  - **What the evidence check requires.** One note block per evidence fragment (`freshness.ts` L582–583, "want 1"). A kept section already holds that block.
  - **Probe at `929972713`, under `Agent: Ada`, on `ada#frontmatter:commands[functional-suite]`.** Commit 1 withdraws in the ledger form: the `signature` is removed, and the section is kept with a `withdrawn:` line.
    - Commit 2, as a new `` ## `#frontmatter:commands[functional-suite]` `` section with the signature back: the range reads `FAIL`. The sweep reads `evidence resolves to 2 note blocks … (want 1)`, and link 2 reads `a sheet carries a section that is no signing object: … "(2)"`.
    - The same commit 2, appending to the kept section instead: `PASS`.
  - **What it reaches.** S13 re-keys, so a new key gets a new section and is not affected. Everything that re-acts on the same key is affected:
    - F-1 (a)'s redo and re-attestation, a granted `withdraw` then a `sign`;
    - W1b and W5c, which use the ledger form by § 4's default;
    - the U11 (g) branch shape.
  - S7 tells a seat to head its section `` ## `#<anchor>` ``, so a seat that follows S7 will write the second section.
  - **What is owed:** § 2a and the seat brief state what a later act on a key with a kept section does. W1b, W5c and F-1 (a)'s fixtures then pin that form, so that their only red is the one they test. The words are the drafter's.
- **B-6 (Medium): F-1 (a)'s re-attestation route omits record units.**
  - The § 2a paragraph says "a granted `withdraw` followed by a `sign` from `unsigned-routed`". A record unit has no `sign`, and no unsigned-routed list. Its route after a withdrawal is `confirm`, from stale, since a unit with no `canonicalHash` is stale.
  - U3's narrow scope is 190 rows **and 167 confirmation units** (item 7's table). Under (a) as written, those 167 units have no route.
  - The block line `- <row id> — <seat> — withdraw` also needs to say that a unit id is a row id here, the way `--census-link1` prints it.
- **B-7 (Medium; my error): "on the record, nothing turns red: 0 of 214" is false. The true count is 1 of 218.**
  - **Where my R1 walk went wrong.** Its population was commits touching a dispositions file or an operative-set record, so it never saw a commit that touches only sheets.
  - **The missing population.** Re-run at `929972713` over the same refs (789 PR heads now), there are 212 PR-branch commits since `R` that touch `signatures/` or `confirmations/`. Four of them touch only sheets:
    - `94ab39094` and `b87a26ca7` (2026-10-03): holds written as sheet edits, from before the hold ballot. They read `FAIL 1` today.
    - `03c0191d6`: a never-merge F9 bite. It reads `FAIL` 1, 2 and 3 today.
    - **`7eb517fca`** (#397, merged as `096e11f99`): the sheet half of Sparky's first signature on `writeScope[.kiro/issues/**]`. Its signature half is `15e190326`, the commit before it. It **passes today** (`1 row(s) checked`, `PASS`), because adding a section sets `sectionMoved`.
  - **What item 4 does to it.** Under the new kind rule, "a commit that changes only a sheet section is a re-act". At its first parent the row is signed and fresh (its hashes are current; the missing evidence is a sweep finding, not staleness). So it reads `FAIL 1`.
  - **What is owed:**
    - The count in § 4 item 4, § 7 departure 2 and § 8 becomes 1 of 218, with `7eb517fca` named.
    - § 5 step 6 says its run "should reproduce Stacy's 0 of 214. A difference stops the PR". As written, it would stop the application PR on my error.
    - The table gains the shape: a first signature split across two commits, the `signature` then its section. Whether that reads `FAIL 1` (fail closed, one act per commit) or as part of the first act is the drafter's to put, and Peter's to rule if it is contested. I would read `FAIL 1` as correct.

**3. Not blocking**

- **N-7 (B-2's scope).** A `re-pointed` row's `destination` is also pinned by nothing: the renderer never reads it, and only `regrounding/derivation.ts` (L225, L321) does. So a destination change with the overlay unchanged moves no hash either.
  - F-4 (a) and (c) reach only rows that render nothing. F-4 (b) reaches every signed row.
  - My walk found 0 such changes since `R`.
  - § 6 F-4 should say which options reach this sub-case.
- **N-8 (F-2 (b) and F-4 (a) together).** F-2 (b) says `renderedHash:` "is not matched, because it is one constant across these rows". Under F-4 (a) it becomes one value per pair of disposition and destination. That still does not identify a row, so the rule holds, but the reason as stated would be false. A reason that holds under every F-4 option would fix it.
- **N-9 (census of F-4 (a)).** § 7 defers F-4 (a)'s census to the application. Its delta is known at draft: the stale list goes from 0 to 261, by construction, since every signed rendering-less row pins `hashEntry([])`. I ask for a line, labelled PROJECTED, carrying that number, so that Peter reads the cost as a census and not only as prose.

**4. Census (re-read)**

- **`--census-routed --at origin/main` (`929972713`)**: `1122 rows; 426 routed; 0 unsigned-routed; errors 0`, digest `5e634869…`, as before.
- **Governance-examples, on R2's after-text**: reproduced at `929972713` after `npm run build`.
  - Current `c13c9780…`.
  - I applied appendix § B's diff with `git apply` (numstat 6/3). The blob equals the diff's `7640e5916`.
  - Proposed `c13c9780…`. `diff` is empty, the guard reads `0 pending`, and `check-section-citations` exits 0.
  - **Valid.**
- **Departures 1 to 3: my R1 rulings stand.** Departure 2's count of record is corrected by B-7.

**5. Answers to § 9**

- **Are B-1 to B-4 met?** Yes (§ 1 above).
- **Are the after-texts complete enough for my application read?** Yes, once B-5 and B-6 are folded.
- **Does F-4's option set cover the lawful remedies?** It does, for rows that render nothing. N-7 is the one sub-case it does not name.

**6. My lean on F-4 (Peter's pick)**

**(a), pin the disposition**, with N-7 named as its gap.
- **Why (a).** It is the only option that keeps the bound a property of a tree. The defect is that a signature pins neither what was assented to nor where the function went, and (a) pins it.
  - (b) brings in the history input the ratified bound was built to avoid, and it misses a re-disposition merged in one PR and judged in a later one.
  - (c) leaves a refusal on such a row unresolvable in bound, with S-T3 red until a grant or an authoring round trip.
- **The cost.** 261 re-signs in one round, all in bound, for a defect with 0 instances on record.
- **When to schedule that round is Peter's call, not part of the pick.** It is cheapest if it rides U3's re-attestation round. Those rows would then be stale, so in bound, and they would need no grant. In the meantime, (c)'s reading would govern.
- *Surviving*:
  - (a) spends about 261 acts mostly re-assenting to judgments that have not changed.
  - It redefines `renderedHash` for a quarter of the population. That makes Lina's shared core carry a meaning that is not about rendering.

My leans on F-1 to F-3 are unchanged from R1 § 7.

**Review**: object — B-5 (a same-key act after a ledger-form withdrawal is unstated, and the obvious form fails the sweep and link 2), B-6 (F-1 (a) gives record units no route), B-7 (the walk count is 1 of 218, not 0 of 214, because `7eb517fca` turns red under item 4; my error, and § 5 step 6 would stop the application on it)

#### [THURGOOD R3] — 2026-11-08

I read Stacy's R2 whole and spliced it above byte for byte. All three blocks are folded. I reproduced B-5 and the verdict half of B-7 at `929972713`. I re-ran the sheet-only population B-7 adds, but not her 212-act walk.

- **B-5: folded.** § 2a gains "One section per key": a later act on a key writes into its kept section, as every in-place re-act already does (18.5's re-signs, `72815fe7b`; the 2026-11-08 re-confirmation in `confirmations/ada.md`). Its field lines carry the current values, and the `withdrawn:` line and earlier entries stay below.
  - A second section with the same heading is named as failing the sweep and link 2. I reproduced both forms: the new section reads `want 1` plus `FAIL link 2`; writing into the kept section reads `PASS` (appendix § D).
  - S7 is rewritten to match, and its after-text is in § 3.
  - § 4's re-acting cases (W1b, W5c, F-1 (a)'s fixtures) now pin the kept-section form. W7 pins both forms.
- **B-6: folded.** F-1 (a)'s route now reads: on a record unit, a granted `withdraw` followed by a `confirm` from `stale`. The block's row id for a unit is `<operative-set file>#<anchor>`, as `--census-link1` prints it. A fifth fixture covers it, and (a)'s cost line counts U3's narrow scope as 714 acts (190 rows and 167 units, two acts each).
- **B-7: folded.**
  - The count of record is now **1 of 218** in § 1 item 14, § 2 item 4, § 7 and § 8, with `7eb517fca` named.
  - My re-run: 212 PR-branch commits since `R` touch sheets, and 4 touch no other signing path. I read each one's verdict today: only `7eb517fca` passes, and only it changes.
  - § 2a states the shape: a first act carries its pinned object and its section in one commit, so a section committed alone reads as a re-act and gets `FAIL 1`. X1 pins it, and it is red at base.
- **How the application handles the one red act.**
  - **Not an exempt list.** A permanent carve-out in the instrument for one historical act would be read by no gate, because none re-runs over #397.
  - **Not a pre-application fix.** The act is merged, history is never rewritten, and clause 8 re-judges no merged act.
  - **It is the ratified delta.** § 5 step 6 now names exactly that one line, `7eb517fca`, PASS → FAIL 1. The application's `--census-link1` run is compared with it input by input (README "Re-runs"), and any other difference stops the PR.
  - **That is not a fork.** It applies the README's own mechanism to a known count. The shape's reading (FAIL 1, rather than "part of the first act") is the drafter's to put, and Stacy reads FAIL 1 as correct. It becomes a fork for Peter only if a reviewer contests it, so I ask that in § 9.
- **Non-blocking points.**
  - N-7: the `re-pointed` destination sub-case is in § 1 item 12, and F-4 now states its reach.
  - N-8: F-2 (b)'s reason no longer depends on F-4.
  - N-9: § 7 carries a PROJECTED census line for F-4 (a), stale 0 → 261, as departure 4.
- **Census, re-run at `929972713`.**
  - `--census-routed` is unchanged (`5e634869…`).
  - The governance-examples census on the R3 seat-brief after-text (S1, S7, S8, S12, S13, S14; numstat 7/4) gives current = proposed = `c13c9780…`, with no delta. The guard exits 0, and so does `check-section-citations`.
- **Her F-4 lean, (a)**, is recorded here and is not adopted. Her leans on F-1 to F-3 are unchanged.

**In my reading, B-5 to B-7 are met.** Whether they are is hers to say at R3.

### [STACY R3] (required reviewer; fixtures; census reader)

#### [STACY R3] — re-read of the fold at `51c1ba846`

**Read at** `51c1ba846` (the ballot, `origin/chore/ballot-signing-act-shape-review`), against `main` at `929972713`, on 2026-11-08 (`date -u` at writing: 2026-11-08T17:43:18Z). Nothing was committed or pushed.
- My census run used a detached worktree in my own scratchpad (`scratchpad/stacy-shape-r3/`), which I have since removed. Thurgood's worktree is untouched (clean at `51c1ba846`).
- `main` has since moved to `bebe7fa84`. Of the census inputs, that move changed only `governance/DesignerPunk-Integration-Guide.md`. None of the ballot's sites or instruments moved. The application's input-by-input re-run handles that one doc.

**Verdict: PASS, no objection.** B-5, B-6 and B-7 are met and withdrawn. I do not contest B-7's handling, and I accept departure 4. One wording point is left, and it does not block (N-10).

**1. My R2 blocks**

- **B-5: met, withdrawn.**
  - § 2a's "One section per key" matches what I probed: writing into the kept section passes; a second section with the same heading fails the sweep (`want 1`) and link 2.
  - S7 is rewritten to match.
  - W1b, W5c and F-1 (a)'s fixtures pin the kept-section form, and W7 pins both forms.
  - S7 now also says that a section is written in the same commit as its pinned object. That closes the gap through which my R2 probe's second form could be read as lawful.
- **B-6: met, withdrawn.**
  - F-1 (a)'s route now covers record units: a granted `withdraw`, then a `confirm` from `stale`. A unit with no `canonicalHash` is stale, so the `confirm` is in bound at its first parent.
  - The block's row id for a unit is `<operative-set file>#<anchor>`, as K1 prints it.
  - A fifth fixture covers this.
  - The cost line's 714 is correct: (190 + 167) × 2.
- **B-7: met, withdrawn.**
  - The count is 1 of 218 everywhere it appears (§ 1 item 14, § 2 item 4, § 7, § 8), with `7eb517fca` named.
  - X1 pins the shape, red at base, with a one-commit control.
  - The FAIL 1 is projected, not run, since site 4c is not built. It holds whichever list the row was on at `15e190326`. A section-only commit is a re-act, and it moves no pinned hash, so F5 fails it either way.

**2. B-7's handling: not contested, and it need not go to Peter as a separate question**

"One expected census difference" is acceptable at application, for three reasons:
1. **The delta is ratified by Peter, not admitted by whoever applies it.** The ballot names the one line (act, row, PASS → FAIL 1) in the text Peter ratifies: § 1 item 14, § 5 step 6 and § 8's "1 of 218". So the application compares against a ratified count, which is the README's "Re-runs" mechanism. It is not a judgment made at the merge. Any other difference still stops the PR.
2. **The reading is fail-closed, and I read it as correct.** One act per commit, with its pinned object and its section together, is what S7 and the seat convention already teach. A section committed alone is not a complete act.
3. **It has no consequence beyond the census line.** No gate re-runs over #397 (clause 8). Sparky's act stands on `main` as merged. The instrument carries no exempt list.

**One condition, for my passes, not for the ballot.** The split shape at `7eb517fca` was lawful when it was made: no clause forbade it. So the red verdict is never a finding on Sparky, and I will not count it as one. The census line is the only place it shows.

**3. Census (re-read)**

- **Departure 4, the PROJECTED stale-list line for F-4 (a), 0 → 261: accepted.** The number holds by construction: all 261 rows pin the one value `hashEntry([])` (R1 § 1; § 1 item 12).
- **Governance-examples, on R3's after-text**: reproduced at `929972713` after `npm run build`.
  - I applied appendix § B's diff with `git apply` (numstat 7/4). The blob equals the diff's `be70e62e3`.
  - Current = proposed = `c13c9780…`. `diff` is empty, the guard reads `0 pending`, and `check-section-citations` exits 0.
  - § 3's quoted rows S1, S7, S8, S12, S13 and S14 are byte-equal to the applied seat brief.
- **`--census-routed`**: unchanged, `5e634869…`, as I read it at R2.
- **Departures 1 to 3**: my rulings stand.

**4. Not blocking**

- **N-10 (F-2 (b)'s reason, half-fixed).** The reason now reads: `renderedHash:` "is not matched: for a row that renders nothing it is a hash over no rendered text, and under no F-4 option does it identify a row."
  - The second clause holds under every option.
  - The first clause is false under F-4 (a), where the value is `hashEntry({ disposition, destination })`.
  - Keeping only the second clause would make the reason true under every F-4 option. The words are the drafter's.
- **N-7 and N-9**: folded as asked. F-4's reach is stated, and departure 4 carries the 261.

**5. My leans** on F-1 to F-4 are unchanged (R1 § 7; R2 § 6).

**Review**: no objection

#### [THURGOOD R4] — 2026-11-08

I read Stacy's R3 whole and spliced it above byte for byte. She passes with no objection.

- **N-10: folded.** F-2 (b)'s reason keeps only the clause that holds under every F-4 option. It now reads "`renderedHash:` is not matched: under no F-4 option does it identify a row." The first clause was false under F-4 (a), and it is dropped.
- **Her condition on `7eb517fca`** is recorded and is hers. The split shape was lawful when it was made, so its red census line is never a finding on Sparky.
- **Census**: unchanged since R3, so nothing was re-run. `main` has moved to `bebe7fa84`, which changes only `governance/DesignerPunk-Integration-Guide.md` among the census inputs. The application's input-by-input re-run reads that doc.
- **Status** stays DRAFT. Peter ratifies, and picks F-1 to F-4.

---

## 11. Resolved after-texts

*(Appended by the Status commit, 2026-11-08, under Peter's "Ratified, F-1 (d), F-2 (b), F-3 (a), F-4 (a)" (2026-11-08T17:45:34Z; record `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ratifies-signing-act-shape-review.md`). Nothing here is new text: each block resolves a block in §§ 2, 3 and 6 with the ruled option chosen and the ratification date filled. `<A>` (the application PR's base) is filled at application. The application diff is compared with this section byte for byte. F-4 (a)'s pin, its § 2a paragraph, its S4 line and its re-signs are the application's PR 2 (§ 5), and are listed last.)*


**Site 1a** — the signing-act ballot, § 2, after clause 8:

> 9. **The shapes.** § 2a is the closed table of row states and the acts on them. An edit to a signing object that is none of § 2a's act kinds is not a signing act. It is authoring, or a finding.
>    *(added 2026-11-08 by ballot 2026-11-08-signing-act-shape-review item 1.)*

**Site 1b** — the signing-act ballot, new § 2a, as PR 1 applies it (F-4 (a)'s "Re-disposition" paragraph is PR 2's, listed last):

> ### 2a. Row states and acts *(added 2026-11-08 by ballot 2026-11-08-signing-act-shape-review items 1–3 and 5)*
>
> **States.** Each one is decided over a committed tree by the freshness sweep's own function (`freshness.ts` `listsAt`). That is the C16 sweep's lists and the census mode's population.
> - **unsigned-routed**: routed (C18, clause 5), no signature. On the sweep's `unsigned-routed` list.
> - **unsigned-unrouted**: a current row that does not route and carries no signature (a `retained` row; a re-pointed body row C18 does not route). On no list.
> - **fresh**: signed, routed, both pinned hashes current. On no list.
> - **stale**: signed, a pinned hash ≠ current. For a record unit: `canonicalHash` ≠ current, or absent. On the sweep's `stale` list.
> - **unconfirmed** (record units only): a record unit whose confirmation sheet holds no note block for it (the sweep's "confirmation resolves to 0 note blocks" finding). On the sweep's `unconfirmed` list.
> - **refused**: a signed row whose signature carries `refuse`. It is otherwise fresh or stale and takes that state's cells. While it stands, S-T3 reads red.
> - **signed-unrouted**: signed, current key, not routed. On the sweep's `signed-unrouted` list.
> - **orphaned**: the row's or record unit's key names nothing current (the `[orphaned-key]` refusal). On the sweep's `orphaned` list.
> - **deleted**: the row is absent.
>
> A **hold** is not a state. It is a clause 6 line on a row in bound, naming the list the row is on, and it resolves as the row's later in-bound act, or as *withdrawn* when the row leaves the bound. That is the hold's word, an end with no edit. It is not the act `withdraw`.
>
> **Act kinds (closed).** An act's kind is read from **the row's pinned object**: the dispositions `signature` sub-object for a signature, the record unit's `canonicalHash` for a confirmation. The sheet section never decides the kind. An object absent at the first parent and present at the commit is a first act; present then absent is a withdrawal; present at both and changed is a re-act. A commit that changes only a sheet section is a re-act on that row, except on an unconfirmed unit: there the confirmer's first note block is `confirm` when, at the commit, the commit adds exactly one note block for the unit, the block's `canonicalHash:` line equals the record unit's `canonicalHash`, and both equal the unit's current hash, which the instrument computes itself. For that one state the block's `canonicalHash:` line is the pinned object; the section's presence never decides the kind. So a first act carries its pinned object and its sheet section **in one commit**. A section committed alone after its signature reads as a re-act on a fresh row and fails link 1 (`7eb517fca`).
> - `sign`: a first signature that assents;
> - `refuse`: a signature carrying `refuse`, first or on a signed row;
> - `re-sign`: an assenting signature replacing a signature;
> - `confirm`: a record unit's first `canonicalHash`, with its sheet section; or, on an unconfirmed unit, its first note block under the condition above;
> - `re-confirm`: a confirmation replacing a confirmation;
> - `withdraw`: a signature, or a record unit's `canonicalHash`, removed. The sheet section is a ledger and is kept, with one added line `withdrawn: <date> — <reason>` (the form at `2f63d2708` and `17cf39eac`); a later act on the key writes into it ("One section per key" below). A withdrawal that removes the section instead is still a `withdraw`, by its pinned object;
> - `hold`: a line, with no edit (clause 6).
>
> **One section per key.** A key's sheet section is its ledger for every act on that key. A later act on a key whose section is kept, after a withdrawal or otherwise, writes into that section, as every in-place re-act does: the section's field lines (`signer:`, and for a confirmation `canonicalHash:` and `items:`) carry the current act's values, the act adds a dated paragraph, and earlier entries and any `withdrawn:` line stay below as prose. A second section with the same heading fails the sweep (two note blocks) and link 2.
>
> **Authoring acts on the same rows.** These are never signing acts: row add, row delete, re-key (a delete plus an add), re-dispose (any change of `disposition` or `destination`, among `retained`, `re-pointed`, `superseded-by` and `no-consumer-counterpart`), overlay text and pins, operative-set items, and the regeneration of `canonical/_consumer-output/**`. Each runs under charter scope or a grant, in a commit that touches no signing object (link 2).
>
> **The table.** "IN *list*": in bound when the row is on *list* at the act's first parent; link 1 decides. "GRANT": clause 5; link 1 fails it, granted or not (F-1 (d)). "AUTH": authoring; link 2 confines it. "X": no lawful single commit does it; the cell names the lawful order. "—": no such act. Verdicts are link verdicts of `walkRange` at the act's commit. `--ci` over a range also needs the sweep green at the range's head, which a lone withdrawal does not leave (a record unit with no `canonicalHash` is stale; a routed row with no signature turns S-T3 red). The fixture ids are the table's (§ 4.5 list; Stacy's).
>
> | State | `sign` · `refuse` (first) | `re-sign` · `refuse` (signed row) | `withdraw` | `hold` | row delete · re-key | re-dispose |
> |---|---|---|---|---|---|---|
> | unsigned-routed | IN unsigned-routed · FU1–FU32 | — | — | line | AUTH | AUTH (may leave the population) |
> | unsigned-unrouted | GRANT · FU (the #337/#378 shape) | — | — | not in bound | AUTH | AUTH (may route it) |
> | fresh | — | GRANT · F5 (the U11 (h) redo; `c989dacf`) | GRANT · **W1**, **W1b** (the two-commit redo) | not in bound | X: the author's commit deletes the signer's object (link 2/3, **A1**). Order: re-dispose or change the unit first, so the row is stale, orphaned or signed-unrouted; then withdraw; then delete or re-key | AUTH. The row goes stale only if a pinned hash moves (**S3**). For a row that renders nothing, a move between `no-consumer-counterpart` and `superseded-by`, or a destination change, moves none until F-4 (a)'s pin applies (§ 2a, "Re-disposition") (**D1**) |
> | stale | — | IN stale, and a pinned hash moves (F5) · **S1**, **S2** | IN stale · **W3** | line | X: withdraw first (as fresh) | AUTH |
> | signed-unrouted | — | IN stale if stale, else GRANT | IN signed-unrouted · **W4**, **W6** | not in bound | X: withdraw first | AUTH (may route it) |
> | orphaned | — (no current unit) | — | IN orphaned · **W2**, **W6** (the v3 shape) | — | signed: X, withdraw first, then re-key, then `sign` from unsigned-routed (the v3 order); unsigned: AUTH | AUTH |
> | deleted | — | — | — | — | removing a sheet section that keys to nothing is cleanup, not an act; adding one fails link 2 | — |
> | record unit: stale | `confirm` / `re-confirm` IN stale, and a hash moves (F5) | | IN stale | line | items, unit add: AUTH | — |
> | record unit: unconfirmed | `confirm` IN unconfirmed, the three hashes equal · **U1** (controls **U2**, **U3**, **U6**) | | GRANT | line | items, unit delete, re-key: AUTH | — |
> | record unit: fresh (it has its note block) | — | `re-confirm` GRANT · F5 (`c989dacf`) | GRANT · **W5b**, **W5c** | not in bound | — | — |
> | record unit: orphaned | — | — | IN orphaned · **W5a** | — | re-key: X, withdraw first | — |
>
> **Across acts.**
> - A seat that acts in a range authors its own charter in no commit of that range (clause 4; F12′, link 2).
> - A **redo**, re-making an act whose audit read anything but `anchored`, is the fresh row's `re-sign`, or the fresh row's `withdraw` followed by a `sign`. Either way it is GRANT. Its only lawful route with no grant is a branch cut before the act, where the row is in bound again (the U11 (g) route), and that route exists only before merge.
> - An **authoring round trip** also puts a fresh row in bound with no grant: the author re-disposes it to `retained`, the signer withdraws it (signed-unrouted), the author re-disposes it back, and the signer signs it (unsigned-routed). Every link holds. It is the same class as a canonical edit that stales a row, and it is visible only in history. The claims pass counts round trips (Stacy R1 N-3).
>
> **Grants and re-attestation.** No row is in bound for a re-attestation (Spec 125-B U3) until a ballot in U3's tasks round sets its bound, once U3's identity mechanism is known. A clause-5 grant does not pass `--ci` link 1. It is executed only where the row is in bound: on a branch cut before the act, or after an authoring change that stales it.

**Site 2** — the signing-act ballot, § 2 clause 6:

- After, (i): "(i) each row whose signature or confirmation changed is on the list its act kind names (§ 2a) at the commit's first parent;"
- After, (iv): "(iv) the PR body lists the acts — the set in (i), one line each, `<dispositions file>#<row> — <seat> — <kind> (<list>) — <commit sha7>` (`<operative-set file>#<anchor>` for a confirmation), where `<kind>` is one of § 2a's closed kinds and `<list>` is the list the row was on at the commit's first parent — beside the pasted lists, each naming the commit it was taken at."
- After, the hold form: "`<dispositions file>#<row> — <seat> — hold (<list>): <reason>` for a signature, `<operative-set file>#<anchor> — <seat> — hold (<list>): <reason>` for a C16 confirmation, where `<list>` is the list the row is on when the hold is given". *(Stacy R1 § 6, condition 2.)*
- Pointer: `*(amended 2026-11-08 by ballot 2026-11-08-signing-act-shape-review item 2; prior text at <A>.)*`

**Site 3a** — the signing-act ballot, § 2 clause 3, with the pointer `*(amended 2026-11-08 by ballot 2026-11-08-signing-act-shape-review items 3–5; prior text at <A>.)*`:

> 3. **Bound — the lists.** A signing act is valid only for a row on the list its kind names in § 2a, at the act's commit's first parent. The lists are the freshness **stale list** and **unsigned-routed list**, for a confirmer's first note block that moves no hash the **unconfirmed list**, and, for a withdrawal only, the **orphaned list** and the **signed-unrouted list**, as the C16 `operative-set-freshness` sweep reports them (`npm run check:122:diff-guard`, which runs the sweep first). The lists are taken before signing, **re-taken each round** (where a refusal's re-disposition moves a pinned hash, the re-sign that follows is in bound; where it moves none, § 2a's re-disposition paragraph governs), and **pasted into the PR body**, each naming the commit it was taken at. The lists are a property of the committed tree. A stale entry carried onto a unit branch by merging `main` is in bound on that branch, exactly as one the branch's own change created. **An act is judged against the rendering committed at its first parent, so the regeneration it rests on is committed before it.**

**Site 3b** — the signing-act ballot, § 2 clause 5, same pointer:

After: "5. **Out of bound.** An act on a row that is on none of the lists its kind names — a re-sign, refusal, re-confirmation or withdrawal on a fresh row (a signer changing its mind), or a redo of an act whose audit read anything but `anchored` — needs a real grant, and the claims pass counts it separately. A granted act does not pass `--ci` link 1; a grant is executed only where the row is in bound."

**Site 4a** — the signing-act ballot, § 3, table row 1:

After: "| 1 | The row is on its act kind's list (§ 2a) at the commit's first parent | the freshness sweep's lists over that tree | `--ci` |"

**Site 4b** — the signing-act ballot, § 4.1:

> - **Link 1, decided per signing commit, at its first parent**: the head is fresh by construction, so link 1 is never read from the head's lists. Each act's kind is read from the row's pinned object (§ 2a). The row must be on that kind's list in the first parent's tree, computed by the freshness sweep's own function over that tree (`freshness.ts` `listsAt`), with the consumer rendering committed in that tree. An undecidable list fails it. A `re-sign` or `re-confirm` must also move the row's pinned `canonicalHash` or `renderedHash` (F5). A row whose hashes moved only because `main` was merged is on the stale list at the first parent, so it passes (F14, clause 3).
>   *(amended 2026-11-08 by ballot 2026-11-08-signing-act-shape-review item 4; prior text at <A>. The 2026-10-21 first-signature note below is this rule's `sign` and `refuse` case, unchanged.)*

**F-2 (b)** — the signing-act ballot, § 3 table row 7, and a new § 4.2 bullet:

*§ 3 table, row 7, after*: "| 7 | Each signed row's rendered line appears verbatim in a tool result in that transcript; for a row that renders nothing, that transcript's print-mode output for the row (§ 4.2) | the harness store | `--audit` |"

  > - **A row that renders nothing** (no rendered piece at the act's commit) anchors link 7 on one tool result that carries the print mode's output for that row. That output must have its header line `verify-signing-chain --print — … — <record>#<fragment>` naming the row's own target, the line `(the row renders nothing — no rendered piece)`, and a `canonicalHash:` line equal to the signature's pinned `canonicalHash`. `renderedHash:` is not matched: under no F-4 option does it identify a row. With no such result, the act reads `FAIL` 7. A row that renders nothing is never `record absent` 7 for that reason alone. The transcript is read as link 7 reads it; RS-36's `late-read` rule, when ratified, applies here too. *(added 2026-11-08 by ballot 2026-11-08-signing-act-shape-review F-2 (b).)*

**F-1 (d)** and **F-3 (a)** — no text beyond Sites 1b and 3b (F-1 (d)) and Site 3a's last sentence and Site 5b's message (F-3 (a)).

**Site 5b** — `verify-signing-chain --audit`, message only:

`record absent 7 — the row's rendering is committed after the act (<sha8>); the act was not judged against a committed rendering (clause 3)`

**Seat brief** — `governance/signing-seat-brief.md` (rows replace the current row of the same id; S13 and S14 follow S12):

- Authorities list: "ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md` (§ 2 clauses 3, 5, 6 and 9, and § 2a, the row states and acts);"
| S1 | **Act only on rows in bound, by the list your act's kind names.** The freshness sweep (`npm run check:122:diff-guard`) prints five lists: `stale`, `unsigned-routed`, `unconfirmed`, `orphaned` and `signed-unrouted`. A first signature or refusal needs the row on `unsigned-routed`. A re-sign, a refusal of a signed row, a confirmation or a re-confirmation needs it on `stale`, except that a first note block that moves no hash needs the unit on `unconfirmed`, with that block's `canonicalHash:` equal to the record's and to the current hash; a first note block that moves the hash needs `stale`. A withdrawal needs it on `stale`, `orphaned` or `signed-unrouted`. The lists are taken before acting, re-taken each round, and pasted into the PR body, each naming the commit it was taken at. A row on none of its kind's lists is not yours to act on under this rule. | signing-act ballot § 2 clauses 3, 5 and 9, and § 2a (ballot 2026-11-08-signing-act-shape-review). Which rows route: Spec 123 design § C18 clause 5 (a `re-pointed` frontmatter or members row routes; routes-floor ballot § 2) | `--ci` link 1 (F5, the FU, W and S cases); the pasted lists, read in the PR body |
| S7 | **Your sheet section is yours alone, one per key.** It is headed `` ## `#<anchor>` ``, where the anchor is the evidence anchor (`#identity` for a body row, `#frontmatter:<path>` for a frontmatter row), and it carries a `signer: <seat>` line. Write it in the same commit as the signature or confirmation it records: a section committed alone afterwards is a re-act on a fresh row and fails `--ci` link 1. A key has one section for every act on it. A later act, after a withdrawal or otherwise, writes into it: its field lines carry the current values, you add a dated paragraph, and earlier entries and any `withdrawn:` line stay below. Never add a second section with the same heading. You do not edit another seat's section. The preamble counts as your object only when every section of the sheet names you. *Convention, not law, and no check reads it*: the #445 sheets place new sections before the first `## Signing run summary` or `## Re-sign run summary` heading, or at the end where there is neither. | § 2 clause 1 (b); § 2a ("One section per key"; ballot 2026-11-08-signing-act-shape-review); the preamble reading is the instrument's (`verify-signing-chain.ts` header L74–75) | `--ci` link 2 (a section's `signer:` equals the trailer; a second section with the same heading); link 1 (a section alone, X1); the sweep's evidence check (one note block) |
| S8 | **A hold is a line, not an edit.** "Not yet, until X" makes no sheet, signature or confirmation edit. It is a line in the PR body's acts list: `<dispositions file>#<row> — <seat> — hold (<list>): <reason>` for a signature, or `<operative-set file>#<anchor> — <seat> — hold (<list>): <reason>` for a confirmation, where `<list>` is the list the row is on. A hold is not a signing act. It resolves as the row's later in-bound act, or as **withdrawn** when the row leaves the bound. | § 2 clause 6 (as amended 2026-10-22, ballot `2026-10-22-hold-act-recorded-in-pr-body`, and by ballot 2026-11-08-signing-act-shape-review) | the claims pass reads the PR body |
| S12 | **Every act is reported.** Each act is a line in the PR body: `<dispositions file>#<row> — <seat> — <kind> (<list>) — <commit sha7>` (`<operative-set file>#<anchor>` for a confirmation). `<kind>` is one of `sign`, `refuse`, `re-sign`, `confirm`, `re-confirm` and `withdraw`, and `<list>` is the list the row was on. A refusal is reported like any act. Any S8 hold lines go beside them. A refusal is a fact for the report, not a reason to change the judgment (S6): it stands until the profile author's re-disposition is answered by an in-bound act, and while it stands the profile's real test reads it as red (S-T3, "zero standing refusals", `tools/agent-generator/__tests__/consumer-profile.real.test.ts` L187). | § 2 clause 6 (iv), as amended by ballot 2026-11-08-signing-act-shape-review; clause 4 (a re-disposition answering a refusal is authoring) | the claims pass reads the PR body, against `--census-link1` over the range |
| S13 | **Withdraw before anyone re-keys or deletes a signed row.** A signed row cannot be re-keyed or deleted in one commit: the profile author's commit would delete your signature, and your commit would edit authoring. The order is: (1) the row reaches `stale`, `orphaned` or `signed-unrouted` (a canonical change, a rename, or a re-disposition by its author); (2) you withdraw in one commit, removing the row's `signature` (or the unit's `canonicalHash`) and keeping your sheet section, with one added line `withdrawn: <date> — <reason>`; (3) the author re-keys or deletes the unsigned row; (4) you sign the re-keyed row fresh, from `unsigned-routed`. | signing-act ballot § 2 clauses 1, 3 and 4, and § 2a; the ledger rule (ballots README § "Conventions") | `--ci` links 1–3 (the W cases, A1) |
| S14 | **The rendering you judge is committed before you act.** Your act is judged against the rendering committed at its first parent. Print on a clean tree after the regeneration commit (the print mode's `read at` line ends `clean`), never against a regeneration that is only in your working tree. A re-sign whose staleness is in an uncommitted regeneration fails `--ci` link 1. A first signature made before its rendering is committed reads `record absent 7` for good. | signing-act ballot § 2 clause 3 (its last sentence) | `--ci` link 1 (S1); `--audit` link 7 |
- S6, checked-by cell, gains (F-2 (b)): "for a row that renders nothing, your print-mode output for that row (its header and `canonicalHash:`)"

**Register** — `governance/classification-map.md`, row `signing-act-consistency`:

- **The `rule:` line.**
  - Before: "for a row on the branch's freshness stale list or its unsigned-routed list (both printed by the freshness sweep, taken before signing, re-taken per round, pasted into the PR)".
  - After: "for a row on the list its act kind names at the act's first parent (signing ballot § 2a: the freshness stale list, its unsigned-routed list, for a confirmer's first note block that moves no hash its unconfirmed list, and for a withdrawal its orphaned or signed-unrouted list; all printed by the freshness sweep, taken before signing, re-taken per round, pasted into the PR with the commit each was taken at)".
  - Same line, before: "(stale or unsigned-routed list;". After: "(the act kind's list at the first parent;".
- **The git-links surface string**: "the stale-list / unsigned-routed-list bound" → "the act-kind list bound at the first parent".
- **Its `census` field** gains `--census-link1` (site 4c).
- **One history line**: `{ date: <application date>, change: "SHAPE REVIEW APPLIED (ballot .kiro/docs/ballots/2026-11-08-signing-act-shape-review.md, RATIFIED Peter 2026-11-08T17:45:34Z): § 2a's closed table of row states and act kinds, the kind read from the pinned object; clause 3's bound is the act kind's list at the commit's first parent (stale, unsigned-routed, and for a withdrawal orphaned or signed-unrouted), and the act is judged against the rendering committed there; clause 6 (iv) and hold lines carry the kind and the list; --ci link 1 decides by list membership (freshness.ts listsAt), with F5 kept for re-sign and re-confirm; the sweep prints orphaned and signed-unrouted lines; census field gains --census-link1; F-1 (d), re-attestation bound left to 125-B U3's tasks round; F-2 (b), the print record tied by target and canonicalHash; F-3 (a); F-4 (a) ruled, its pin, § 2a Re-disposition paragraph, S4 line and the 261 re-signs landing in the application's PR 2; check_state unchanged (armed), ARMING at the PR's merge (Stacy)", by: thurgood }`.

**PR 2 (F-4 (a); § 5)** — the application's second PR:

- § 2a, after "Across acts":

  > **Re-disposition.** For a row that renders nothing, `renderedHash` is the hash of the row's `disposition` and `destination`: `hashEntry({ disposition, destination })`, `destination` omitted where the row has none. A re-disposition or a destination change then moves it, and the row goes stale like any other. *(added <PR 2 date> by ballot 2026-11-08-signing-act-shape-review F-4 (a).)*

- `tools/agent-generator/derive.ts`: for a row with no rendered span, `renderedHash` is `hashEntry({ disposition, destination })`, `destination` omitted where absent; the sweep and the print mode use it (Lina consulted, shared core).
- Seat brief S4 gains: "For a row that renders nothing, `renderedHash` is `hashEntry({ disposition, destination })`."
- Fixture D1 (stale after the re-disposition), and the 261 re-signs, in bound (stale), by seven seats.
- The register history line for that PR names the changed hash definition.

---

## Errata

- **§ 2a, § 2 clause 3, § 2 item 4 site 4c, seat brief S1, the register `rule:` line, § 4: an `unconfirmed` state and the first confirmation of a drafted unit (a′).** *(erratum RATIFIED 2026-11-08 — Peter, 2026-11-08T20:17:31Z: "Let Thurgood and Stacy agree, then go with it"; 2026-11-08T20:21:58Z: "My instruction covers it; go with their text". Record: `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-shape-pr1-erratum.md`. Found at application PR 1's census, § 5 PR 1 step 6: `.kiro/issues/2026-11-08-shape-review-pr1-stop-first-confirmation-of-a-drafted-unit.md`.)*
  - **What it fixes.** A record unit is drafted with its `canonicalHash`, so the confirmer's first act on it writes only a note block. As ratified, § 2a read that sheet-only commit as a `re-confirm` on a fresh unit, on no list, which fails link 1. That is two acts at `17702702b` (#436), and every future drafted unit.
  - **The rule.** A unit with no note block at the act's first parent is **unconfirmed**. On it, the confirmer's first note block is `confirm` when three hashes are equal. For that one state the block's `canonicalHash:` line is the pinned object. The section's presence still decides nothing.
  - **Census** (§ 5 PR 1 step 6, re-run with (a′) in the code): over the 409 acts in 299 PR-branch commits since `R`, the base code reads `FAIL 1` 8 times and the head code 9. **The delta is exactly `7eb517fca`, PASS → FAIL 1**, the ratified line. At `17702702b` both drafted units read `confirm`, list `unconfirmed`, PASS.
  - **Residual** (Stacy and Thurgood). The record-side `canonicalHash` is the drafter's write. The confirmer's first act shows only that her own field line equals it and equals the current hash. She could have copied it rather than computed it. It is the one act whose record-side pin another seat wrote, and for that one state the pinned object is the sheet field, not the record's `canonicalHash`.
  - **The text.** Each before → after below applies at every occurrence in this ballot (§§ 2–3 and § 11) and at the application.
    1. § 2a States. Before: `- **stale**: signed, a pinned hash ≠ current. For a record unit: `canonicalHash` ≠ current, or absent. On the sweep's `stale` list.` After: that line, then a new line: `- **unconfirmed** (record units only): a record unit whose confirmation sheet holds no note block for it (the sweep's "confirmation resolves to 0 note blocks" finding). On the sweep's `unconfirmed` list.`
    2. § 2a Act kinds. Before: `A commit that changes only a sheet section is a re-act on that row.` After: `A commit that changes only a sheet section is a re-act on that row, except on an unconfirmed unit: there the confirmer's first note block is `confirm` when, at the commit, the commit adds exactly one note block for the unit, the block's `canonicalHash:` line equals the record unit's `canonicalHash`, and both equal the unit's current hash, which the instrument computes itself. For that one state the block's `canonicalHash:` line is the pinned object; the section's presence never decides the kind.`
    3. § 2a, the `confirm` bullet. Before: `- `confirm`: a record unit's first `canonicalHash`, with its sheet section;` After: `- `confirm`: a record unit's first `canonicalHash`, with its sheet section; or, on an unconfirmed unit, its first note block under the condition above;`
    4. § 2a table, in both copies (§ 2 item 1 and § 11), a new row after `record unit: stale`: `| record unit: unconfirmed | `confirm` IN unconfirmed, the three hashes equal · **U1** (controls **U2**, **U3**, **U6**) | | GRANT | line | items, unit delete, re-key: AUTH | — |`
    5. § 2a table, the `record unit: fresh` row's first cell. Before: `| record unit: fresh |` After: `| record unit: fresh (it has its note block) |`
    6. § 2 clause 3. Before: `The lists are the freshness **stale list** and **unsigned-routed list**, and, for a withdrawal only, the **orphaned list** and the **signed-unrouted list**,` After: `The lists are the freshness **stale list** and **unsigned-routed list**, for a confirmer's first note block that moves no hash the **unconfirmed list**, and, for a withdrawal only, the **orphaned list** and the **signed-unrouted list**,`
    7. Seat brief S1. Before: `prints four lists: `stale`, `unsigned-routed`, `orphaned` and `signed-unrouted`. A first signature or refusal needs the row on `unsigned-routed`. A re-sign, a refusal of a signed row, a confirmation or a re-confirmation needs it on `stale`.` After: `prints five lists: `stale`, `unsigned-routed`, `unconfirmed`, `orphaned` and `signed-unrouted`. A first signature or refusal needs the row on `unsigned-routed`. A re-sign, a refusal of a signed row, a confirmation or a re-confirmation needs it on `stale`, except that a first note block that moves no hash needs the unit on `unconfirmed`, with that block's `canonicalHash:` equal to the record's and to the current hash; a first note block that moves the hash needs `stale`.`
    8. The register `rule:` line. Before: `the freshness stale list, its unsigned-routed list, and for a withdrawal its orphaned or signed-unrouted list;` After: `the freshness stale list, its unsigned-routed list, for a confirmer's first note block that moves no hash its unconfirmed list, and for a withdrawal its orphaned or signed-unrouted list;`
    9. § 4 fixtures, added after K1 (Stacy's): **U1** an unconfirmed unit, one block, all three hashes equal → `confirm`, IN unconfirmed, PASS; **U2** the block's hash ≠ the record's → FAIL 1; **U3** the record's hash ≠ the current unit's → FAIL 1 (the stale route, where the hash must move); **U4** a sheet-only block on a unit that already has a block → `re-confirm`, FAIL 1; **U5** the drafter writes the block → FAIL 2/3; **U6** two blocks added → the sweep FAILs and FAIL 2. K1 also prints `confirm\tunconfirmed` for U1.
    10. Site 4c, `listsAt`. Before: `It returns `{ stale, unsignedRouted, orphaned, signedUnrouted, errors }` over a tree read through `read`,` After: `It returns `{ stale, unsignedRouted, unconfirmed, orphaned, signedUnrouted, errors }` over a tree read through `read`,`
    11. Site 4c, `formatFreshness`. Before: `- `formatFreshness` appends two information lines, never findings: `orphaned: N row(s)` and `signed-unrouted: N row(s)`, with row ids, after the two lines it prints today.` After: `- `formatFreshness` appends three information lines, never findings: `unconfirmed: N row(s)`, `orphaned: N row(s)` and `signed-unrouted: N row(s)`, with row ids, after the two lines it prints today.`
  - **Instrument** (PR 1, in Thurgood's scope). `freshness.ts` reports the `unconfirmed` list, always printed, information only. `listsAt` returns it. `verify-signing-chain.ts` link 1 admits the condition in item 2 on that list at the first parent. § 5 PR 1 step 6's ratified delta is unchanged.

## Census appendix

### § A. The census mode

Run in the main checkout at `3e76b6205e2cec3a0e8ed28ee3968652f633de0a` (clean), and at R2 in a detached worktree at `929972713`:

```
$ npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --census-routed | tail -1
1122 rows; 426 routed; 0 unsigned-routed; errors 0
$ … | shasum -a 256
5e634869e02255cddc4a34f0a909c1850aac46a8437cf633db43b4adf22c4c6f
```

The two outputs are byte-identical (`diff -q`). The tabulations in § 2 item 7 and § 1 items 6–7 are `awk` over that output. The signer column is the fourth field, and the routed label is the second. The full output is 1123 lines and is not reproduced; the command above regenerates it.

There is no scratch diff (departure 1), so there is no delta.

### § B. The governance-examples census

Run at R3 in a detached worktree at `929972713` after `npm run build` (the import surface needs `dist/`). Current: as committed. Proposed: the same tree with § 3's seat-brief after-text applied by script from this file's own quoted rows (S1, S7, S8, S12, S13, S14, the authorities line; numstat 7/4). The diff, verbatim:

```diff
diff --git a/governance/signing-seat-brief.md b/governance/signing-seat-brief.md
index 4c29caee1..be70e62e3 100644
--- a/governance/signing-seat-brief.md
+++ b/governance/signing-seat-brief.md
@@ -27,6 +27,7 @@ This document creates no rule. Each rule below restates a ratified clause and ci
 The authorities it restates:
 - ballot `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` (RATIFIED 2026-10-01), §§ 2, 3, 4.3, 4.6 and 5.3, with § 2 clause 3 as corrected by its 2026-10-21 erratum and § 2 clause 6 as amended 2026-10-22 by ballot `2026-10-22-hold-act-recorded-in-pr-body` (#444);
 - ballot `.kiro/docs/ballots/2026-10-21-routes-floor-re-pointed-frontmatter-members.md` (RATIFIED 2026-10-22), applied as Spec 123 design § C18 clause 5, for which rows route;
+- ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md` (§ 2 clauses 3, 5, 6 and 9, and § 2a, the row states and acts);
 - the C1 seat function, the signature format and its audit: Spec 123 design C16–C17 and Req 11.5.2, 11.5.4, 11.5.6 and 11.5.7, implemented in `tools/agent-generator/regrounding/c1.ts` and `signatures.ts`.
 
 Why it exists: on PR #445 all seven seats printed their signing commit in a form `--audit` link 4 cannot read, and all 20 acts read `record absent`. The rule was in the ballot (§ 4.3); the seat briefs dropped it. Record: `.kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md`. Under the orchestrator's practice recorded there (§ 6), signing briefs quote this document by path and commit (`governance/signing-seat-brief.md@<sha>`).
@@ -41,18 +42,20 @@ Owner: Thurgood (Civitas steward), who maintains it. Edits are Peter-merged.
 
 | # | Rule | Law clause | Checked by |
 |---|---|---|---|
-| S1 | **Sign only rows in bound.** A row is in bound when it is on the stale list or the unsigned-routed list your brief pastes. The freshness sweep (`npm run check:122:diff-guard`) prints both lists. They are taken before signing, re-taken each round, and pasted into the PR body. A row outside both lists is not yours to sign under this rule. | signing-act ballot § 2 clause 3 (erratum 2026-10-21); clause 5. Which rows route: Spec 123 design § C18 clause 5 (a `re-pointed` frontmatter or members row routes; routes-floor ballot § 2) | `--ci` link 1 (F5, FU cases); the pasted lists, read in the PR body |
+| S1 | **Act only on rows in bound, by the list your act's kind names.** The freshness sweep (`npm run check:122:diff-guard`) prints four lists: `stale`, `unsigned-routed`, `orphaned` and `signed-unrouted`. A first signature or refusal needs the row on `unsigned-routed`. A re-sign, a refusal of a signed row, a confirmation or a re-confirmation needs it on `stale`. A withdrawal needs it on `stale`, `orphaned` or `signed-unrouted`. The lists are taken before acting, re-taken each round, and pasted into the PR body, each naming the commit it was taken at. A row on none of its kind's lists is not yours to act on under this rule. | signing-act ballot § 2 clauses 3, 5 and 9, and § 2a (ballot 2026-11-08-signing-act-shape-review). Which rows route: Spec 123 design § C18 clause 5 (a `re-pointed` frontmatter or members row routes; routes-floor ballot § 2) | `--ci` link 1 (F5, the FU, W and S cases); the pasted lists, read in the PR body |
 | S2 | **Touch only your own objects.** You may write the row's `signature` (or `confirmation`) sub-object, and your section of the row's sheet. Every other field is authoring, not signing: `disposition`, `destination`, `removals`, `cites`, overlay text, operative-set items, any canonical source, your own charter. The signer is `c1Seat(owner)`: the owner, except where the owner is the profile author (Thurgood), in which case it is Stacy. So Stacy signs the rows of `thurgood.dispositions.yaml` and the `_shared.dispositions.yaml` members Thurgood owns (that file's header names them). | § 2 clauses 1, 2, 4; `tools/agent-generator/regrounding/c1.ts` | `--ci` link 2 (F4, F12, F12′) and link 3 |
 | S3 | **Your commit carries only your objects.** Every hunk, and every commit that carries one, stays inside your objects. A helper script kept outside the repo is one way to hold that. | § 2 clause 6 (iii) | `--ci` link 2 (commit grain) |
 | S4 | **The hashes are the current values.** A stale hash fails, and so does a re-sign that moves neither hash. How each is computed (the sweep's reference is `regrounding/freshness.ts` L608–612): `canonicalHash` is the current canonical unit's hash. For a body unit that is `hashText(unit text)`, the unit taken from `partition(body).units`. For a frontmatter entry it is `hashEntry(value)`, from `entryTree(frontmatter).units`. For a shared member it is `hashEntry(member)`, from `canonical/shared/shared-catalog.yaml`. Where the row has an overlay pin (`<profile>.overlay.md`: `## @unit #<anchor> @ sha256:…` or `## @entry <key> @ sha256:…`; re-pointed rows have one, `no-consumer-counterpart` and `superseded-by` rows do not), the pin must equal that hash. If it does not, stop and report: the pin is authoring. `renderedHash` is `renderedHashOf(readConsumerSpans(<worktree>), rowSpanSource(<source>, <section>, <key>))` (`tools/agent-generator/derive.ts`), over the committed `canonical/_consumer-output/`. The arguments: `<source>` is the dispositions file's top-level `source:`; `<section>` is `body`, `frontmatter` or `members`; `<key>` is the row key exactly as written. Body keys include the `#` (`#identity`), frontmatter keys are the entry path, and members use the catalog id. If `readConsumerSpans` returns `undefined` (no rendering), stop and report: the sweep reads that as `signature-unverifiable`. | Spec 123 design C17 valve 1 (Req 11.5.6); § 2 clause 3; § 2 clause 4 (the pin is authoring) | `--ci` link 1 (F5) and the freshness sweep (stale signature) |
 | S5 | **The signature has a closed shape.** Its fields are `signer`, `canonicalHash` and `renderedHash`, then exactly one of `assent: {surviving: [...]}` or `refuse: should-re-point`, then `evidence: canonical/profiles/consumer/signatures/<sheet>.md#<anchor>`. No other field. Two examples, each in the one-line flow form, appended to the row's existing object. A frontmatter row: `canonical/profiles/consumer/ada.dispositions.yaml` row `frontmatter."description"` at `1ddac1d23` (evidence `…/ada.md#frontmatter:description`, `surviving: []`). A body row: the same file, row `body."#identity"` at `05513944e` (key and destination `#identity`, evidence `…/ada.md#identity`, `canonicalHash` by `hashText`, an itemized non-empty `surviving`). | § 2 clause 1 (a), the closed field set; `regrounding/signatures.ts` `SIGNATURE_FIELDS` (design C17) | the dispositions validation in the freshness sweep that `check:122:diff-guard` runs (format, bare, wrong signer) |
 | S6 | **The assent is itemized and honest.** `surviving` names exactly the operative-set items that the unit's own rendering states or entails. `[]` when none survive is itemized, not bare. The list is never padded, and never trimmed toward an answer the brief seems to expect. Where the function does not survive, the act is a refusal (`should-re-point`). | Req 11.5.6 (valve 2) with the 5e entailment rule (Req 11.6.5e); Req 11.5.7 (the assent audited) | `--audit` link 7 (the rendered line was read); the claims pass's Req 11.5.7 spot-check of itemized assents against the rendering, with the fraction counted (Peter samples the Stacy-signed ones); J, link 8 (a blind seat re-judges a sample). Not mechanical |
-| S7 | **Your sheet section is yours alone.** It is headed `` ## `#<anchor>` ``, where the anchor is the evidence anchor (`#identity` for a body row, `#frontmatter:<path>` for a frontmatter row), and it carries a `signer: <seat>` line. You do not edit another seat's section. The preamble counts as your object only when every section of the sheet names you. *Convention, not law, and no check reads it*: the #445 sheets place new sections before the first `## Signing run summary` or `## Re-sign run summary` heading, or at the end where there is neither. | § 2 clause 1 (b); the preamble reading is the instrument's (`verify-signing-chain.ts` header L74–75) | `--ci` link 2 (a section's `signer:` equals the trailer) |
-| S8 | **A hold is a line, not an edit.** "Not yet, until X" makes no sheet, signature or confirmation edit. It is a line in the PR body's acts list: `<dispositions file>#<row> — <seat> — hold: <reason>` for a signature, or `<operative-set file>#<anchor> — <seat> — hold: <reason>` for a confirmation. A hold is not a signing act. It resolves as the row's later in-bound act, or as **withdrawn** when the row leaves the bound. | § 2 clause 6 (as amended 2026-10-22, ballot `2026-10-22-hold-act-recorded-in-pr-body`) | the claims pass reads the PR body |
+| S7 | **Your sheet section is yours alone, one per key.** It is headed `` ## `#<anchor>` ``, where the anchor is the evidence anchor (`#identity` for a body row, `#frontmatter:<path>` for a frontmatter row), and it carries a `signer: <seat>` line. Write it in the same commit as the signature or confirmation it records: a section committed alone afterwards is a re-act on a fresh row and fails `--ci` link 1. A key has one section for every act on it. A later act, after a withdrawal or otherwise, writes into it: its field lines carry the current values, you add a dated paragraph, and earlier entries and any `withdrawn:` line stay below. Never add a second section with the same heading. You do not edit another seat's section. The preamble counts as your object only when every section of the sheet names you. *Convention, not law, and no check reads it*: the #445 sheets place new sections before the first `## Signing run summary` or `## Re-sign run summary` heading, or at the end where there is neither. | § 2 clause 1 (b); § 2a ("One section per key"; ballot 2026-11-08-signing-act-shape-review); the preamble reading is the instrument's (`verify-signing-chain.ts` header L74–75) | `--ci` link 2 (a section's `signer:` equals the trailer; a second section with the same heading); link 1 (a section alone, X1); the sweep's evidence check (one note block) |
+| S8 | **A hold is a line, not an edit.** "Not yet, until X" makes no sheet, signature or confirmation edit. It is a line in the PR body's acts list: `<dispositions file>#<row> — <seat> — hold (<list>): <reason>` for a signature, or `<operative-set file>#<anchor> — <seat> — hold (<list>): <reason>` for a confirmation, where `<list>` is the list the row is on. A hold is not a signing act. It resolves as the row's later in-bound act, or as **withdrawn** when the row leaves the bound. | § 2 clause 6 (as amended 2026-10-22, ballot `2026-10-22-hold-act-recorded-in-pr-body`, and by ballot 2026-11-08-signing-act-shape-review) | the claims pass reads the PR body |
 | S9 | **`Agent:` is a trailer of the final paragraph.** Git reads trailers only from the message's last paragraph. A `Co-Authored-By:` line (the harness's attribution, not signing law) in a later paragraph of its own pushes `Agent:` out of git's trailer block, and the act then fails link 3. So both sit together in the final paragraph. `git interpret-trailers --parse` over the message text is a way to check this before committing. | § 2 clause 6 (ii); § 3 link 3 | `--ci` link 3 (no trailer, two trailers, or one above the final paragraph fails) |
 | S10 | **Commit and print in one call, in the convention's form.** See § "The commit line" below. One line comes out: the full SHA, a space, the subject. The commit's success shows only through `&&` (or `set -e`) into the `git log`, in the same call. Other formats anchor under § 4.3 as amended 2026-11-08 where the call's first printed SHA is the commit's and its subject shows in the result or in the commit's own first `-m` (`%h%n%B`, `%H%n%B` and `%h%n%b` read `record absent` on #445 before the amendment); a `;` or a pipe on the commit reads `anomaly`. *(Amended 2026-11-08 by ballot 2026-10-23-link4-candidate-first-sha-after-commit; prior text at `ac4f44687`.)* | § 4.3 as amended 2026-11-08: the candidate (ii), success evidence (b), and "seat briefs commit as `git commit … && git log -1 --format='%H %s'`" | `--audit` link 4 |
 | S11 | **Merge only.** Seat commits enter a unit branch by merge only (`--no-ff`, or a fast-forward), both of which keep the seat's SHA. They are never rebased, amended, cherry-picked, `merge --squash`-ed or re-committed from a seat's diff. A commit that fails CI is followed by a new commit. Conflicts are resolved in the merge commit, never by rebasing the side branch. | § 4.6 (Lina's merge-only rule) | `--audit` link 4: a rewritten SHA has no creating transcript and reads `record absent`, read through the parent chain under `refs/pull/<N>/head`. `--ci` F13: a merge that writes signature content no parent carried fails |
-| S12 | **Every act is reported.** Each act is a line in the PR body: `<dispositions file>#<row> — <seat> — <commit sha7>`. A refusal is reported like any act. Any S8 hold lines go beside them. A refusal is a fact for the report, not a reason to change the judgment (S6): it stands until the profile author's re-disposition is answered by an in-bound act, and while it stands the profile's real test reads it as red (S-T3, "zero standing refusals", `tools/agent-generator/__tests__/consumer-profile.real.test.ts` L187). | § 2 clause 6 (iv); clause 4 (a re-disposition answering a refusal is authoring) | the claims pass reads the PR body |
+| S12 | **Every act is reported.** Each act is a line in the PR body: `<dispositions file>#<row> — <seat> — <kind> (<list>) — <commit sha7>` (`<operative-set file>#<anchor>` for a confirmation). `<kind>` is one of `sign`, `refuse`, `re-sign`, `confirm`, `re-confirm` and `withdraw`, and `<list>` is the list the row was on. A refusal is reported like any act. Any S8 hold lines go beside them. A refusal is a fact for the report, not a reason to change the judgment (S6): it stands until the profile author's re-disposition is answered by an in-bound act, and while it stands the profile's real test reads it as red (S-T3, "zero standing refusals", `tools/agent-generator/__tests__/consumer-profile.real.test.ts` L187). | § 2 clause 6 (iv), as amended by ballot 2026-11-08-signing-act-shape-review; clause 4 (a re-disposition answering a refusal is authoring) | the claims pass reads the PR body, against `--census-link1` over the range |
+| S13 | **Withdraw before anyone re-keys or deletes a signed row.** A signed row cannot be re-keyed or deleted in one commit: the profile author's commit would delete your signature, and your commit would edit authoring. The order is: (1) the row reaches `stale`, `orphaned` or `signed-unrouted` (a canonical change, a rename, or a re-disposition by its author); (2) you withdraw in one commit, removing the row's `signature` (or the unit's `canonicalHash`) and keeping your sheet section, with one added line `withdrawn: <date> — <reason>`; (3) the author re-keys or deletes the unsigned row; (4) you sign the re-keyed row fresh, from `unsigned-routed`. | signing-act ballot § 2 clauses 1, 3 and 4, and § 2a; the ledger rule (ballots README § "Conventions") | `--ci` links 1–3 (the W cases, A1) |
+| S14 | **The rendering you judge is committed before you act.** Your act is judged against the rendering committed at its first parent. Print on a clean tree after the regeneration commit (the print mode's `read at` line ends `clean`), never against a regeneration that is only in your working tree. A re-sign whose staleness is in an uncommitted regeneration fails `--ci` link 1. A first signature made before its rendering is committed reads `record absent 7` for good. | signing-act ballot § 2 clause 3 (its last sentence) | `--ci` link 1 (S1); `--audit` link 7 |
 
 ### The commit line
 
```

Both runs print `selected: 1968 (1949 token-name candidates, 4 declared paths, 1 token-file shapes, 14 import lines) over 91 docs; predicate v1, file-shape rule v1` and `governance/signing-seat-brief.md\t0:0:0`. Both digest to `c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd`. `diff` of the two outputs is empty, so there is no delta. On the proposed tree the guard's own run exits 0, as at the base, and `scripts/check-section-citations.ts` exits 0. The R0 after-text (numstat 5/2, at `3e76b6205`) and the R2 after-text (6/3, at `929972713`) gave the same digests, and Stacy reproduced both.

### § C. The heuristic withdrawal count (R0; superseded as the count of record by Stacy's walk, § 7)

`python3 -I withdrawals.py <repo>`, run at `3e76b6205`. The script was kept out of the repo. For each first-parent commit on `main` since `R` = `2da74864` that touches `canonical/profiles/consumer`, it reads the `-U0` diff of every `*.dispositions.yaml` file. It counts a row key whose removed line carries a signature and whose added line is absent or carries none. Output:

```
58f511fae 1 Stacy's owed-set heading corrected ('the committed script'): unit re-keyed via withdrawal
    stacy.dispositions.yaml #the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script gone
6f23bc6fe 1 Apply ballot 2026-10-29-dated-pointer-paths: README pointer paths (F-1 (b)), Stacy's three
    stacy.dispositions.yaml #the-mirror-anti-rot-clause-verbatim-at-countersigned-strength unsigned
total 2
```

### § D. The probes

**§ 1 item 1** (R0, at `3e76b6205`). One commit under `Agent: Ada` removed `"signature": {…}` from `ada.dispositions.yaml` row `commands[functional-suite]`, and the `` ## `#frontmatter:commands[functional-suite]` `` section from `signatures/ada.md`. Output:

```
operative-set-freshness: PASS — 17 record(s), 375 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)
stale: 0 row(s)
unsigned-routed: 1 row(s)
  canonical/profiles/consumer/ada.dispositions.yaml#frontmatter:commands[functional-suite] — superseded-by
signing-chain: range HEAD~1..HEAD — 1 commit(s); 0 committed before R 2da74864 excluded (ballot § 2 clause 8 — the rule does not reach back)
signing-chain: 1 row(s) checked across 1 signing commit(s)
signing-chain: PASS — consistency, not identity
```

**§ 1 item 11** (R2, at `929972713`; Stacy's B-1 route, reproduced). Commit 1 under `Agent: Ada` removed the same row's `signature`, keeping the sheet section. Commit 2 restored the file byte for byte. `git diff --quiet <base> HEAD` succeeded (the tree equals the base). Output:

```
signing-chain: 2 row(s) checked across 2 signing commit(s)
signing-chain: PASS — consistency, not identity
```

**§ 1 item 12** (R2, at `929972713`). `node` over every tracked `*.dispositions.yaml` file with `js-yaml`, counting signed rows whose disposition is `no-consumer-counterpart` or `superseded-by`, by pinned `renderedHash`:

```
261 {"sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570":261}
```

**§ 1 item 13** (R3, at `929972713`; Stacy's B-5, reproduced). Commit 1 under `Agent: Ada` withdrew `ada#frontmatter:commands[functional-suite]` in the ledger form: the `signature` removed, and the section kept with a `withdrawn: 2026-11-08 — probe` line. Commit 2 restored the signature, in two variants:

```
== append (written into the kept section)
operative-set-freshness: PASS — 17 record(s), 375 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)
signing-chain: PASS — consistency, not identity
== newsection (a second section with the same heading)
operative-set-freshness: FAIL — 17 record(s), 375 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)
  [signature-evidence] signature on commands[functional-suite] in canonical/profiles/consumer/ada.dispositions.yaml: evidence resolves to 2 note blocks in canonical/profi…
  FAIL link 2 88ea5b13: a sheet carries a section that is no signing object: canonical/profiles/consumer/signatures/ada.md § "#frontmatter:commands[functional-suite] (2)…
signing-chain: FAIL — consistency, not identity
```

**§ 1 item 14** (R3, at `929972713`; Stacy's B-7). The population is `git rev-list --no-merges` since `R`, over all 789 `refs/pull/*/head`, minus `origin/main`, restricted to `canonical/profiles/consumer/{signatures,confirmations}`: 212 commits. Of those, 4 touch no other signing path. Their verdicts today, by `--ci --base <c>^ --head <c>`:

```
7eb517fca (base 15e190326): signing-chain: 1 row(s) checked across 1 signing commit(s) / PASS
94ab39094: FAIL link 1 … thurgood.dispositions.yaml#trigger-types: sheet section changed with no hash moved …
b87a26ca7: FAIL link 1 … operative-sets/thurgood.yaml#trigger-types: sheet section changed with no hash moved …
03c0191d6: FAIL link 3 … Agent: trailer data ≠ c1Seat kenya; FAIL link 2 …
```

Every probe commit was discarded (`git reset --hard` to the base) and never pushed.
