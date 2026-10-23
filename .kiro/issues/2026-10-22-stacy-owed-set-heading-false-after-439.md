# Issue: Stacy's in-repo owed-set unit heading still says "deliberately not a committed script"; #439 made it a committed script

**Date**: 2026-10-22
**Status**: ACTIVE
**Owners**: Stacy (the heading text: hers, written to scratch, never by another seat); Thurgood (the application: her text applied byte for byte under six-roots errata (f), regeneration, the operative-set item and the pins); Lina (the unit-key constants in her three tests)
**Trigger**: `manual` — the merge of the rename PR, the fix that owes this record's close (rule 5). Start condition (prose): the routes-floor application PR (ballot `2026-10-21-routes-floor-re-pointed-frontmatter-members.md` § 3) has merged. Re-ruled to `merge:#<N>` of the rename PR the day that PR opens. *(Set 2026-10-22, Thurgood, filer. Why not `merge:#<floor application PR>`: rule 1 has no forward-reference form, and that PR has no number. Even once numbered, that token would fire at the floor's merge, and the rename must land after the floor, so no ancestor of the firing commit could close this record. It would lapse by construction. That is the vehicle form ballot DRAFT `2026-10-22-trigger-names-the-event-not-the-vehicle.md` rules out, so the floor merge is the start condition and the rename PR is the event.)*
**Class**: P2 obligation (record) · defect *(set 2026-10-22, Thurgood, filer; Stacy may re-class, rule 12)*. Not P0: the false text is in the in-repo charter (`canonical/agents/stacy.md` L437 and its generated copies `.claude/agents/stacy.md` and `.kiro/agents/stacy-prompt.md`), which no package reader meets. The consumer outputs carry the overlay heading, which is correct ("The owed-set query (the closeout-owed query for your repository)"), and `grep -c 'deliberately not a committed script'` over both `canonical/_consumer-output/` agent files → 0. The old words survive in the package only as a slug in keys (`stacy.dispositions.yaml`, the attribution files), which is an identifier, not a statement. `(record)` rather than `(guard)`: the body under the heading runs `./scripts/owed-set.sh`, so a reader who reads past the heading is not misled. Stacy may read it as P0 (rule 12).
**Filed by**: Thurgood, under rule 10, in the PR that records the ruling (branch `chore/records-and-trigger-ballot-2026-10-22`).
**Ruling**: Peter, chat, 2026-10-22, verbatim, on the orchestrator's list (item 4 is this record): *"Re: 3, 4, 5, 6, Proceed as you recommend"* (relayed by the orchestrator).

---

## 1. The defect

`canonical/agents/stacy.md` L437:

> ### The owed-set pipeline (your command catalog's owed-set entry — documented commands, deliberately not a committed script)

#439 (`809276d2b`, 2026-10-22) made the owed-set query the committed script `scripts/owed-set.sh` and re-pointed the unit's body at it. It did not change the heading, because the heading is the unit's **key**: `#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script`. Renaming it moves every routed row keyed by that slug. The heading now says the opposite of the body under it.

## 2. The fix: rename the unit key, after the floor

Order: **after the routes-floor application PR merges**. The rename moves routed rows (the overlay `@unit`, the dispositions key, the signature and confirmation sections, the operative-set item), so landing it before or inside the floor's application would perturb the floor's own-base census.

| Step | Seat | What |
|---|---|---|
| 1 | **Stacy** | Writes her new heading text to scratch. The text is hers; no other seat drafts it, and Thurgood carries no proposed wording (Q5 mirror clause, both directions). |
| 2 | **Thurgood** | Applies it byte for byte under six-roots errata (f) to `canonical/agents/stacy.md` L437, then the matching `canonical/operative-sets/stacy.yaml` item (2 occurrences), the consumer profile keys (`canonical/profiles/consumer/stacy.overlay.md` `@unit`, `stacy.dispositions.yaml`), regeneration (`.claude/agents/stacy.md`, `.kiro/agents/stacy-prompt.md`, `canonical/_consumer-output/**`, attribution files), the overlay pin and `canonical/generated.lock`. **Edit kind**: `canonical/agents/stacy.md` — CORRECTION (this record; truth: `scripts/owed-set.sh` at `809276d2b`). |
| 3 | **Lina** | Edits the unit-key constant `S` in **her** three tests: `tools/agent-generator/__tests__/derivation.test.ts` (L32), `derivation.shipped-profile.test.ts` (L87) and `grain-guard.two-sided.test.ts` (L32). |
| 4 | **Stacy** | Re-confirms and re-signs the renamed row in her own seat commits (`canonical/profiles/consumer/confirmations/stacy.md`, `signatures/stacy.md`), separate from step 2's charter commit (F12′). The signature sheet's history under the old key is a ledger: it is appended to, never rewritten. |

**No grant row: Lina edits her tests as owner.** Peter's "proceed as you recommend" accepted the grant framing (a grant to Thurgood over the three test files), and owner-edit makes it moot. I did not keep the grant because the swap is not mechanical. `derivation.test.ts` L35 reads `g1Fixture('E', S)`, a historical G1 rendering keyed by the **old** slug in `__fixtures__/g1-renderings/manifest.yaml`, alongside the live canonical file keyed by the **new** one. Whether `S` splits into a live key and a fixture key, or the fixture lookup moves, is a call on her fixture and her module, and only the owner should make it. Owner-edit needs no grant (six-roots § 2.2), and it puts the review with the seat that can see the split.

**Out of the rename, by reading** (checked at application, expected unchanged):
- `tools/agent-generator/__tests__/triviality.g1.test.ts` L90/L93 (mine by stem, `regrounding/triviality.ts`): keyed to the G1 fixture renderings, not the live charter.
- `tools/agent-generator/__fixtures__/semantics-guard/**` and `__fixtures__/g1-renderings/**`: frozen historical fixtures.
- Historical spec records under `.kiro/specs/123-consumer-distribution/**`: point-in-time, never rewritten.

The application PR runs `grep -rn 'deliberately-not-a-committed-script\|deliberately not a committed script'` and pastes the result. Every survivor is one of the three groups above, or it is a stop.

### 2a. Re-sequenced 2026-10-23 (v3): the old row's signature is withdrawn before the re-key

**Superseded order (2026-10-23, Thurgood; rule 9 dated line)**: v2 (branch `chore/stacy-owed-set-heading-rename-v2` at `ae7e666ff`, not pushed, kept as the record of the failed order) fails `verify-signing-chain --ci --base 8c89e8656`: link 1 at `ae7e666f` (a first signature on the new row, which is on neither list at its parent `bc79a348`) and link 2 twice at `ae7e666f` (the signing commit removes the old row and adds the new one: `disposition`, `removals`, `destination` are authoring, § 2 clause 4). A re-key is not a signing act. v2 is superseded by v3 below. The "Found at application" line (v3 step 3, `0cd0b45d1`, below § 3) is corrected in one point: the row's key and `destination` are authoring (clause 4), not Stacy's objects. Her objects are the row's `signature` sub-object, its sheet sections, and the operative-set `canonicalHash`.

**Clause-5 grant (Peter, 2026-10-23, "Approved. Proceed as collectively recommended, please", on the orchestrator's line quoted above)**: Stacy may withdraw her signature on `stacy.dispositions.yaml#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script`, reported `[orphaned-key]` since the heading rename; one act, counted separately; not precedent; § 2 clause 3's bound unchanged.

The orchestrator's line Peter answered, verbatim: *"Clause-5 grant: Stacy may withdraw her signature on the old owed-set row, orphaned since the heading rename; one act, counted separately; not precedent; the bound is unchanged."* Peter's reply is relayed by the orchestrator; it is dated before the withdrawal because this line's commit precedes it on the branch (§ 2 clause 8: a record written after an act does not authorize it). The act's (iv) line is Stacy's to write; the form she proposed is `<file>#<old-anchor> — stacy — <sha7> — withdrawal, out of bound (orphaned-key; lists recomputed at <parent sha7>: on neither); clause-5 grant: Peter 2026-10-23, <this record>; link-1 pass not evidence (actMoved)`. The class question (why the withdrawal falls outside clause 3's letter, and whether `[orphaned-key]` rows should be in bound) goes to `.kiro/issues/2026-10-23-signing-act-shape-review.md`.

**v3 order** (each step its own commit; `--ci` is re-run after each):

| Step | Seat | Commit |
|---|---|---|
| 1 | Thurgood | The charter heading (`6a00748ac`, cherry-picked). |
| 2 | Thurgood | The operative-set unit key and confirmation fragment, the overlay `@unit` slug and pin (`d06620cdb`, cherry-picked). |
| 3 | Thurgood | The "Found at application" line (`0cd0b45d1`, cherry-picked). |
| 4 | **Stacy** | **Withdrawal**: removes the `signature` sub-object from `stacy.dispositions.yaml#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script` and nothing else in that file; the sheet-section rule for the old key is the one the v3 probe settles. Cites this grant. |
| 5 | Thurgood | Authoring (clause 4): deletes the now-unsigned old row and adds `#the-owed-set-query-your-command-catalogs-owed-set-entry-the-committed-script` unsigned (`re-pointed`, the same `removals`, `destination` the new key). |
| 6 | **Stacy** | Confirm: the new confirmation section and the operative-set `canonicalHash` (`fcf52f05…`), as at `bc79a3489`. |
| 7 | **Stacy** | First signature on the new row, which is on the unsigned-routed list at its parent (in bound, § 2 clause 3). Its new sheet section names the predecessor key. |

Then Lina's step 3, and the regeneration and lock after Stacy's acts, as § 2 and the line below say.

## 3. Close

The rename PR's merge closes this record. That PR adds rule 5's outcome line here and `git mv`s the file to `archive/`.

**Header read (2026-10-22, Stacy, co-owner; rule 9 dated line)**: **Owners, Trigger and Class confirmed as written.** **Owners**: the heading is my charter text, Thurgood applies it under errata (f) because F12′ keeps my charter edit out of my signing commits, and the three test constants are Lina's. **Trigger**: the rename PR is this record's own fixing event, which ballot DRAFT `2026-10-22-trigger-names-the-event-not-the-vehicle` § 2 counts as an event, not a vehicle. `manual` is lawful for a P2 (only P1 is barred), and the start condition sits rightly in prose. **Class**: I do not read it as P0. `files[]` ships `dist/consumer-canonical/**` but never `canonical/agents/**`, and `grep -rc 'deliberately not a committed script' canonical/_consumer-output/` finds 0 non-zero files, so no package reader meets the false heading. `(record)` holds because the body under the heading runs `./scripts/owed-set.sh`. I will write step 1's heading text to scratch when the floor merges, not before.

**Found at application (2026-10-23, Thurgood; rule 9 dated line)**: § 2 step 2 over-assigned. The dispositions row `canonical/profiles/consumer/stacy.dispositions.yaml` (its key, `destination` and signature `evidence`) and the operative-set `canonicalHash` line in `canonical/operative-sets/stacy.yaml` are Stacy's objects (C1 seat Stacy; `verify-signing-chain` links 2 and 3 fail any other seat's edit, a signature-dropping variant included), so they move in her step-4 acts: the row key + `destination` + `evidence` + re-sign in her sign commit, the `canonicalHash` (new value `sha256:fcf52f052773d8f801d52ae79152e04e167d892cb2d568b549429486b1da75bf`) in her confirm commit. Step 2 carries only the charter heading, the operative-set unit key and confirmation fragment, and the overlay `@unit` slug + pin. Between step 2 and step 4 the tree is red by design inside the one PR (stale canonicalHash, no confirmation block, orphaned/missing disposition row), and the regenerated outputs and the lock follow Stacy's two acts. Also, the "Out of the rename" bullet on `triviality.g1.test.ts` L90/L93 is wrong in part: these tests and `triviality.assignment.test.ts` L192/L195 resolve the live `canonical/operative-sets/stacy.yaml` through `g1-renderings/manifest.yaml` (`record:` plus the old anchor and pin), so they fail on the rename until Lina's step 3 splits the frozen key from the live one.
