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

## 3. Close

The rename PR's merge closes this record. That PR adds rule 5's outcome line here and `git mv`s the file to `archive/`.
