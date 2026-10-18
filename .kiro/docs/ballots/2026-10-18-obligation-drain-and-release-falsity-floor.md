# Ballot Measure (A): Obligation drain and the release falsity floor

**Date**: 2026-10-18
**Drafted by**: Thurgood (Civitas steward), at the ballot sitting Peter opened on 2026-10-18 ("Let's do the ballot sitting next").
**Status**: **DRAFT** — not ratified. No edit site below is applied. **Merge = nothing; ratification is by Peter's word on the record**, committed to this file's Status line before any edit site is applied (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**Authority for drafting**: release-4 rulings (`.kiro/specs/123-consumer-distribution/completion/release-4-rulings-2026-10-15.md`) **item 23** (class option A, "Ruled"), **item 26** (class option D, "RULED by Peter 2026-10-15 ('Approved'): fork D-1 = the ESCALATION LADDER now (no script …); two ballots in one sitting, Stacy required reviewer") and **row 28** (RL-14, ruled 2026-10-17; its law text "rides the item-23 `release-falsity-floor` ballot sitting").
**Sibling**: ballot B, `2026-10-18-governance-edit-kinds.md` (same sitting).
**Required reviewer**: **Stacy** — she reads the step-1 paste at RELEASE phase 1, confirms or disputes P0 readings under Q5, and is the seat whose findings (RS-13, RS-27, RS-28, O-17) this ballot answers.
**Unit**: standalone record-first ballot. Its application edits `.kiro/hooks/RELEASE-FLOW.md`, `.kiro/issues/README.md`, `governance/classification-map.md` and the identity doc `.kiro/steering/Task-Completion-Protocol.md`, so **Peter merges it** under the governance carve-out.
**Severability**: every measure (M1–M8, R-1) can be struck alone. Dependencies are named in each measure's "If struck" line.

> **Conflict of interest, stated first.** The author owns the monthly walk (M6), writes RELEASE-FLOW's text (M3, M7), owns the two proposed register rows, and is the owner of seven of the records the 2026-10-17 walk found fired-without-record (W-1). The ladder he drafts would count his own lapses first. Stacy attacks the width and the decidability.

---

## 1. The gap (evidence, each verified at `64d0a7a1f` unless marked)

- **RS-13, four instances** (claims passes 15.1.0 L443, L634; Spec 123 CLOSEOUT L331; 16.0.0 L472): obligations "due before release N" live in plans, carry tables and rulings rows. RELEASE-FLOW names none of them, so a claims pass is their only detector. Stacy's split (consult digest, 2026-10-15): 7 of release-3's 9 lapses were never filed as records at all.
- **RS-27** (16.0.0 L485): four release-prep forks ruled in chat on 2026-10-16 landed in three homes; one (the blend ruling) landed in none.
- **RS-28 ×3** (16.0.0 L486, L661, L794): "flagged in a PR body, then merged" is the only act for a steward-judged carry; whether a merge answers its body's question is undefined; #385's body *pointed at* a question asked elsewhere. Peter's ruling (row 28, 2026-10-17): **"Don't merge until I answer."** His reason, verbatim: *"I noticed all too often that we had an accumulation of missed questions and responses due to the complex coordination and execution of the work. Lingering questions/answers are a problem."*
- **O-17** (16.0.0 L674): a grant list written in the same diff it bounds makes rule 8's diff self-referential — RS-27's class.
- **The roster**: 100 root records (excluding README); 29 have no `**Trigger**:` line in that form, 23 no `**Owner**` line; 1 trigger line carries a backticked event token. Two records (both 2026-10-18) already carry `**Class**: P2 obligation (proposed …)`. One record carries the `## Lapse (2026-10-17)` heading this ballot adopts.
- **W-8** (health check 2026-10-17 § 6): a 100-file root makes "minutes, not sessions" false. **W-1**: seven of the author's own records fired without a record.
- **The consult** (Thurgood and Stacy, 2026-10-15, read-only; digests at `u5-pack/dp-trio-runs-2026-10-15/r4-consults-digests/{thurgood,stacy}-backlog.md`, outside the repo — *not committed; their content is summarized in rulings item 26*): every cited lapse was already recorded somewhere; **nothing read the record when its event fired**. Principle: *an obligation is real only if the event that owes it reads it; a due event passing without closing it is counted, not reworded.*

## 2. The measures

### M1 — Filing rule (item 26 (i); RS-27, O-17)
**Operative text** — new `.kiro/issues/README.md` rule 10:
> **10. Filing rule.** A ruling or a claims pass that creates an obligation files an issue record for it, or appends to the existing one, **in the same PR that records the ruling or the pass**. An obligation stated only in a plan line, a carry list, a walk table, a rulings row or a PR body, citing no record, is a finding on the PR that wrote it. A record filed for another owner names its filer; rule 9 applies to every later edit. **[M1b]** A grant list is never authored only inside the diff it bounds: it is in a merged record first, or Peter's quoted direction names its paths.

- **[M1b is the author's addition — Peter rules]**: it answers O-17; striking it leaves O-17 named and unruled.
- **Cost**: one record append per ruling (minutes); the orchestrator, who writes rulings records, carries most of it.
- **If struck**: M3's grep finds only the obligations someone happened to file — the release-3 shape.

### M2 — Fixed trigger grammar (item 26 (ii))
**Operative text** — `.kiro/issues/README.md` rule 1, before → after:
- **Before** (L10):
  > … and it SHALL carry an **owner** and a **named trigger** (an event, never a calendar hope). A root file without both is itself a walk finding.
- **After**:
  > … and it SHALL carry an **owner** and a **named trigger** (an event, never a calendar hope). The trigger line is `**Trigger**:` followed by exactly one backticked token naming **the event that owes the close** — `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual` — then optional prose; a start condition, if any, is prose (definitions: ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2). A root file without both is itself a walk finding.

| Token | Fired at (git-visible) |
|---|---|
| `tag:v<semver>` | the tag's creation |
| `merge:#<N>` | PR N's squash commit on `main` (subject ends `(#<N>)`) |
| `path:<glob>` | the first first-parent commit on `main`, after the commit that wrote the token, touching the glob |
| `release:<ver>:phase-1` | the first-parent commit adding `**/claims-pass-release-<ver>.md` (Stacy's definition) |
| `manual` | never computable; the prose names the human event; the walk prints it `not computable` |

- The obligation is owed **on or before** the event. A record may state a stricter deadline in prose (e.g. "before 5.1"); only the token's event is counted.
- **[Author's addition — Peter rules]**: `<ver>` may be `next` — the first release whose phase-1 record is added after the commit that wrote the token. Almost every real obligation says "release 5" before its version is known; without `next` they are `manual` and M3 cannot see them.
- Stacy's further tokens (`merge-of:<path>`, `release:<ver>:prep`, `spec-kickoff:<id>`) are **not** added: the ruled grammar is fixed; additions go by amendment.
- **Example**: the blend record's `tag:v16.0.0` is a start event; its deadline is release 5's phase 1, so under M2 it reads `` `release:next:phase-1` `` — after `tag:v16.0.0`.
- **Cost**: README +3 lines. **At drafting, M3's grep returns empty (exit 1) for `V=16.1.0`**: the only token-bearing trigger is the blend record's start-event `tag:v16.0.0`. So the back-fill is the first cost, not an option. Back-fill is lazy: new records from ratification; existing records gain a token when next touched or walked, the ~18 trigger lines that mention a release first (they feed M3). ~1 h author time at the first walk; owners confirm by a dated line.
- **If struck**: M3 greps prose for "release", which is the miss mode the ladder exists to count.

### M3 — RELEASE-FLOW step 1 queries and pastes the due rows (item 26 (iii); answers RS-13)
**Edit site** — `.kiro/hooks/RELEASE-FLOW.md` § "Deriving the delta" item 1 (L26). **[Author's reading — Peter confirms]**: "step 1" is read as *this* item 1, because the release walk runs before the release branch (16.0.0: walk #379, then the release PR #381), not as § "The sequence" step 1 (`git switch -c`).
- **Before**: L26 ends `… never assume spec summaries cover the delta.`
- **After**: L26 unchanged, followed by the two sub-items below (M7's floor first, then this):
  > - **The due rows** (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M3). From up-to-date `main`, with `V` the ratified version:
  >   ```bash
  >   grep -nF -e "\`release:$V:phase-1\`" -e '`release:next:phase-1`' -e "\`tag:v$V\`" .kiro/issues/*.md; echo "due-rows exit $?"
  >   grep -nE '^\*\*Class\*\*: P0' .kiro/issues/*.md; echo "P0 exit $?"
  >   ```
  >   Paste both outputs with their exit codes into the release's walk record (an empty result is pasted as empty). Before phase 1, each hit is **closed**, **re-ruled** (dated Trigger change with its authority), **waived** (Peter's quoted, dated words) or **counted as a lapse** (README rule 11). A due row this grep misses, noticed by a claims pass or the monthly walk, is a **miss**; the second miss promotes the grep to a committed script under a scoped grant — the owed-set ladder's first rung (the D-1 script: frontmatter, ~350 lines with fixtures).
- **And** § "The sequence" step 6, phase 1's coverage (L207), **before**: `It covers the release delta, the 5a owed-set paste, the 5b arming line and 5.1's tally.` → **after**: `It covers the release delta, the step-1 walk (the due-row paste and each floor row's disposition), the 5a owed-set paste, the 5b arming line and 5.1's tally.`
- **Cost**: ~12 lines of law; 10–20 min per release. **If struck**: M1/M2 still help the monthly walk; releases keep only the pass as detector.

### M4 — `## Lapse (date)` and the escalation ladder (item 26 (iv))
**Operative text** — new README rule 11:
> **11. Lapse and escalation.** A record **lapses** when its trigger fires (rule 1) and, on or before that event, it was neither closed (rule 5, or a merged PR citing its path as the fix) nor re-ruled (its Trigger line changed in a diff carrying a dated reason and authority). Whoever observes a lapse — the walker, the step-1 operator, a claims pass — appends `## Lapse (YYYY-MM-DD)` naming the event and its SHA, signed. The headings are append-only, a later re-ruling never erases one, and the count is their number. **Escalation**: at the **second** lapse of a P1 or P2 record, or the **first** of a P0, the record goes to Peter with exactly three options — **spec**, **drop**, or **fix-now** (a git-visible trigger no later than the next release's phase 1); a lapsed fix-now returns without that option. A charter cannot lapse before its trigger fires; grants are excluded.

- Precedent adopted as is: `2026-10-03-consumer-stacy-owed-set-needs-adoption-record.md` L50. The archived `## Lapse, recorded (2026-10-14)` form is not rewritten (rule 2: records are immutable).
- A lapse is a **counted observation**, a finding only when a doc claims the obligation met, a walk prints 0 against git ≥ 1, or a second lapse never reached Peter (Stacy's three cases).
- **Cost**: README +6 lines; Peter, one batched decision per walk with escalations. **If struck**: lapses keep being reworded instead of counted.

### M5 — The `**Class**:` header (item 26 (v))
**Operative text** — new README rule 12:
> **12. Class.** Every root record carries `**Class**: <level> <name> · <kind>`. Levels: **P0 false-claim** (the release falsity floor's definition — ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7), **P1 consumer-blocking**, **P2 obligation** with a sub-tag **`(guard)`** (a guard or instrument weaker than its claim) or **`(record)`** (the record or its form is wrong; no reader is misled), **P3 improvement**. Kinds: `defect`, `owed-act`, `charter`, `grant`. The filer classes; a dated line re-classes a record when what it describes ships. Only Peter downgrades a P0; Stacy may confirm or dispute a P0 reading at her next pass (Q5: her read, never a gate).

- **The five-vs-four reconciliation**: Stacy's five (false-shipped / consumer-blocking / guard-degraded / record-form / nice-to-have) map one-to-one onto the four levels, her guard/record split kept as P2's mandatory sub-tag. The ladder keys on the level; the order of work can key on the sub-tag (CL-1-style guard rows first). Fork **F-A1** (§ 4) is whether `(guard)` escalates like P2 or like P0.
- **Kind renamed**: the consult's kind `obligation` collided with level P2's name; it is `owed-act` here.
- **The two 2026-10-18 records** (`release-publish-preflight-public-npm-auth`, `release-publish-concurrent-runs`) **match the level and name** (`P2 obligation`) and **lack the sub-tag and kind**; on the author's reading both are `P2 obligation (guard) · owed-act` (a preflight that checks one registry; no guard against a second run). Their owners set it and drop the `(proposed …)` parenthetical after ratification.
- **Cost**: one header line per record, back-filled lazily as in M2. **If struck**: M4 escalates every record at lapse 2, and M7's floor rows are named "floor rows" instead of P0.

### M6 — The monthly walk as a triage sitting; the archive rule (item 26 (vi); W-8)
**Edit sites** — `.kiro/issues/README.md`:
- **Rule 6, before** (L15):
  > 6. **The walk** (monthly health check, Thurgood): for each root file — *has its trigger fired? if fired, is there evidence/a record?* Fired-without-record = finding. Root growing stale items = finding. That is the whole walk.
- **After**:
  > 6. **The walk** (monthly health check, Thurgood) is a triage sitting, recorded in the health-check record: for each root record — has its trigger fired (rule 1)? If fired, it is closed and archived, closed as done-but-unclosed (no lapse), re-ruled, or lapsed (rule 11). The headline prints, per class: records, fired-open, lapses, and `manual` (not computable) of the total; the escalations owed to Peter go to him as one batch. A root record missing owner, trigger token or class = finding.
- **Rule 5 (L14), append**:
  > A record whose outcome is recorded is archived no later than the next walk; a grant archives at its fixing PR's merge; a P3 with a `manual` trigger that is still unfired at two consecutive walks archives as stale (rule 4 brings it back). *(Narrowed from the consult digest, which archived any unfired P3: a P3 with a git-visible trigger that has not fired is waiting, not stale.)*
- **L4, before**: "The active-charter walk is `ls .kiro/issues/*.md` — bounded by construction, minutes not sessions." **After**: "The walk reads every root record (rule 6); rule 5 keeps the root bounded — it is not bounded by construction."
- **L24–L53** (the founding-roster table, a 2026-09-19 snapshot) **removed**, replaced by one line: "The roster is `ls .kiro/issues/*.md`; the founding roster is in git history (`git show 64d0a7a1f:.kiro/issues/README.md`)."
- Pass A (the archive sweep, ~15–25 records) is **already ruled** for the 2026-10-19 health check (item 26, D-2) and needs no ballot.
- **Cost**: README net −25 lines; the walk itself unchanged in time until the back-fill lands. Fork **F-A2** (§ 4) carries W-8's own class option.

### M7 — The release falsity floor (item 23; the P0 definition)
**Edit site** — the first sub-item under RELEASE-FLOW "Deriving the delta" item 1 (before M3's):
> - **The blocking test** (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7): **nothing ships that the release knows is false at the place where its reader meets it.** "Knows" = the rows the release's walk holds: the due-row paste below, every P0 record, and the release's findings records. A disclosure counts only where the reader meets the falsehood: agents never read the CHANGELOG, so served docs, MCP contracts and agent charters are fixed, not disclosed. The scope sentence counts as a shipped sentence. Every other row is carried with one bulk line per record (SHA, home, trigger). **The steward rules first**: each floor-class row the walk carries gets the steward's one-line reading of why it is not false at its reader; a row the steward cannot rule goes to Peter as an `**Open for Peter**:` question, and the walk's PR is not merged until he answers (**default: do not merge**). Only Peter waives a floor row, in quoted, dated words.

- The first two sentences and the disclosure sentence are item 23's ruled principle, verbatim; "Every other row …" is the rulings record's own sentence.
- **P0's definition** (M5 cites it): a record shows a statement false in a surface where a reader of the package meets it — a served doc, an MCP contract or response, an agent charter or profile, the CHANGELOG or notes, an exported path, the scope sentence. **[Author's addition — Peter rules] (O-18)**: a packed file reachable through none of these is not met by a reader; a known falsehood there is P2 `(record)` or P3, not P0.
- **The steward's reading is a disposition, not a verdict**: Stacy reads it at phase 1 and may call it wrong (a finding); she never rules the floor before acceptance (Q5, never a gate). C-6's "inapplicable, not false" (row 28) is the precedent reading.
- **Cost**: ~6 lines; the walk is already release practice since 16.0.0. **If struck**: item 23's principle stays a ruling without a law home.

### M8 — "Don't merge until I answer" (row 28 (3); RS-28)
**Edit site** — `.kiro/steering/Task-Completion-Protocol.md` § "Branch and PR Conventions": **insert after L121** (the `Unit:` bullet) a new bullet:
> - **A question to Peter holds the merge** (Peter, 2026-10-17: "Don't merge until I answer"). A PR body that puts a question to Peter carries it on a line beginning `**Open for Peter**:`. The PR is not merged until Peter's answer is on the record — his words, dated, in a committed file or written by him on the PR — and the body cites it. A merge never answers a question; no author writes "merge = yes", "adopted at merge unless amended" or an equivalent. **A pointer counts as asking**: a body line pointing at a question asked elsewhere holds the merge exactly as the written-out question would. An unmarked question to Peter holds it too; the missing marker is a finding on the author. "Not now — merge" is an answer.

- **RS-28's pointer question** (16.0.0 L794), **answered**: yes, a pointer counts (residual in § 5, item 3). Row 28 does not reach back to #385 and this text does not either.
- **Identity-doc path (W-9 era)**: TCP is an always-loaded identity doc with a signed operative set (`canonical/operative-sets/task-completion-protocol.yaml`, confirmer Stacy) and a consumer dispositions row `#branch-and-pr-conventions` (signer Stacy). Application: edit the doc; update the operative-set item text; Stacy re-confirms the unit and re-signs the dispositions row in her own seat commit (signing acts need no grant); regenerate (`npm run check:122:diff-guard`), lock `outputs` hash disclosed before → after. The consumer rendering of "Peter" is Stacy's disposition call (*unverified*: likely re-pointed to "the human lead", as the row's existing removal of `Peter` suggests). No body `Last Reviewed` stamp; frontmatter `lastReviewed` only (W-9).
- Ballot B's PR-body line edits the **same section**, so one application PR re-signs it once.
- **Cost**: 1 bullet; one C1 re-confirm + one re-sign; one regeneration. **If struck**: row 28's rule stays a ruling on one record that no agent loads.

### R-1 — Rider: every rail run pasted (RS-17; item 19, "the RELEASE-FLOW text change follows the release")
- **Before** (RELEASE-FLOW L187): `Paste the **full output, including the exit code**, to`
- **After**: `Paste the **full output of every run, failing runs included and in order, each with its exit code**, to`
- **Cost**: one line. Item 19 ruled the practice; this is its law text.

## 3. Register rows (`governance/classification-map.md`, appended after `### charter-write-scope-render-fidelity`, end of file)

Non-substring check at drafting: neither id is a substring of, or contains, any `### ` heading in the register (38 entries).

```yaml
### issues-obligation-lapse
rule: "A root .kiro/issues/ record carries an owner, a Trigger token from the fixed grammar (the event that owes the close) and a Class; a trigger that fires with the record neither closed nor re-ruled is a lapse, appended as ## Lapse (date) and never erased; P1/P2 escalate to Peter at lapse 2, P0 at lapse 1, with spec / drop / fix-now; obligations created by a ruling or pass are filed in the same PR"
boundary_call: { class: functional, rationale: "Firing is git-visible per token; closure is a dated line or a merged PR citing the path; the count is a heading count — decidable without the author. manual tokens are not computable and are printed as such" }
verification: { disposition: record-check, owner: thurgood, check_state: proposed, checks: [] }
  # The ladder (rulings item 26, D-1): held by the walk record and the RELEASE-FLOW step-1 paste; the second miss promotes the grep to a committed script under a scoped grant
education: { disposition: "LAW HOME: this ballot M1, M2, M4–M6. POINTER-GRADE: .kiro/issues/README.md rules 1, 5, 6, 10–12" }
history: [ { date: <ratification>, change: "entry created (steward, window-free — the certainty-calibration precedent) by ballot 2026-10-18-obligation-drain-and-release-falsity-floor", by: thurgood } ]

### release-falsity-floor
rule: "Nothing ships that the release knows is false at the place where its reader meets it; served docs, MCP contracts and agent charters are fixed, not disclosed; the steward rules each carried floor-class row first, an unruled row goes to Peter and holds the walk's PR; only Peter waives"
boundary_call: { class: functional, rationale: "'Knows' is bounded by the walk's rows and the step-1 paste; whether each row is dispositioned is decidable. Whether a steward's 'not false at its reader' reading is right is judgment — audited, never gated" }
verification: { disposition: record-check, owner: stacy, check_state: proposed, checks: [] }
  # Read at RELEASE phase 1 (RELEASE-FLOW step 6): the paste exists with exit codes; every row is fixed / carried with a reading / waived by Peter
education: { disposition: "LAW HOME: this ballot M7. POINTER-GRADE: RELEASE-FLOW 'Deriving the delta' item 1" }
history: [ { date: <ratification>, change: "entry created (steward, window-free) by ballot 2026-10-18-obligation-drain-and-release-falsity-floor; rulings item 23", by: thurgood } ]
```
*(Shown compressed; applied in the register's one-fenced-block-per-entry form with the `### <id>` heading outside the fence.)* **[Author's addition — Stacy confirms at R1]**: `release-falsity-floor`'s owner is `stacy`, because its verification is her phase-1 read; the instrument text (step 1) stays Thurgood's.

## 4. Forks for Peter (none picked; merge = nothing; ratification by his word on the record)

- **F-A1 — how a `(guard)` P2 escalates.** (a) like every P2, at lapse 2; (b) like P0, at lapse 1, because a weakened guard hides the other failures it was meant to catch (Stacy's reason for keeping guard-degraded apart). Cost of (b): more escalations; RS-31 and RS-32 would be among the first.
- **F-A2 — W-8's walk scale.** (a) M6 only: the archive rule bounds the root; (b) M6 plus W-8's class option: a release walk in the same month discharges the monthly walk for the records it read, cited by path. Surviving counter-argument against (b), from W-8 itself: two walkers means two places a missed item can hide — how the retirement file went unseen for two cycles.

## 5. Counter-arguments, after fold-back

- **Folded in**: "triggers say 'release 5', which has no version" → `next`. "Triggers conflate start and deadline" → the token is the deadline; start is prose. "The floor makes the steward the judge of truth" → the reading is a disposition Stacy audits (Q5). "A pointer lets a question hide" → a pointer counts. "Unfired P3s are not stale" → only `manual` P3s archive.
- **Surviving**:
  1. **View ≠ capacity.** Every measure makes a lapse visible and forces a decision; none adds hands. Inflow (~4 records a day since 2026-09-19, the consult digest's count) is the bigger lever, and nothing here slows it.
  2. **The grep will miss.** Prose triggers vary until back-filled; the ladder accepts one miss before a script. Stacy's residual stands: ~70 non-release records still depend on the monthly walk with no forcing function.
  3. **"A pointer counts" can over-hold**: a stale `Open for Peter` pointer to an answered question holds a merge until someone cites the answer. The cost is one line; the alternative is RS-28's undefined act.
  4. **Honour-based**: M1 and M8 are caught only after the merge, by a claims pass or the walk.

## 6. Not here, and where

- RS-31, RS-32: their own records (owners Ada, Thurgood; trigger release 5).
- **W-1's class option** (a standing "ballot sitting" event every "ballot draft owed" trigger points at) is noted, not drafted. Under M2 such a trigger is `manual`, or bound to a git event; a sitting token is not in the ruled grammar. **W-1's four ballot drafts** and the trigger-(d) § 5.3 amendment are not this sitting's.
- From #405: the docs-MCP `s{c}.{k}` H4 id form is undescribed in `governance/Steering-Addressing-Conventions.md` Convention 2 (which still calls `#sectionid` "future"), and the P-1 direct-`get_section` banner fork. Home: a CORRECTION under ballot B (referent: #405's code) and Thurgood's next docs-MCP touch, respectively.

## 7. Application (after ratification, exactly as ruled)

One PR (Thurgood; Stacy's seat commit for M8's signing acts): README rules 1, 5, 6, 10–12 and L4/L24–53; RELEASE-FLOW L26 (+2 sub-items), L187, L207; TCP insertion + regeneration; register rows. Then `rebuild_index`, `validate_metadata` on the touched served docs, and a straggler sweep: `grep -n 'bounded by construction' .kiro/issues/README.md` → 0; `grep -c 'ballot 2026-10-18-obligation-drain' .kiro/hooks/RELEASE-FLOW.md .kiro/issues/README.md` → one hit per edited site. **Cost of the sitting**: three seats (Thurgood drafts, Stacy R1, Peter rules), one review round plus the weave; application ~2–3 h author, ~15 min Stacy, Peter one merge.

## 8. Review rounds

*(Stacy R1 follows this draft.)*

## 9. Rulings (Peter)

*(empty)*

## 10. Consult ledger

- 2026-10-15, option D: Thurgood ×2 (backlog consult; cross-read), Stacy ×1 — read-only; digests outside the repo, summarized in rulings item 26.
- 2026-10-15, class option A: Thurgood (round 2, the principle); Lina, Ada (floors fitting under it) — rulings record L9.
- 2026-10-18: none further before R1.
