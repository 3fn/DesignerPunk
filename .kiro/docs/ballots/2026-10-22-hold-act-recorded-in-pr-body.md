# Ballot Measure: a hold is recorded in the PR body's acts list, never as a sheet edit (signing-act ballot § 2, the hold form)

**Date**: 2026-10-22
**Drafted by**: Thurgood (Civitas steward; author of ballot `2026-10-01-signing-act-chain` and owner of `verify-signing-chain`; owner of `.kiro/issues/2026-10-03-hermetic-publish-path-follow-ups.md`, whose item 4 this measure fixes).
**Authority to draft**: Peter, chat, 2026-10-22, verbatim: **"Fix now."** (relayed by the orchestrator). He ruled item 2 of the orchestrator's list, the rule-11 escalation of hermetic item 4 at its second lapse, which offered exactly three options: spec, drop or fix-now. The fix-now shape is this seat's sizing the same morning, shape (a), text only.
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT is a recording defect, not a ratification.
**Required reviewer**: **Stacy** (R1). She reads clause 6 (iv)'s acts list at every claims pass, she is the census reader, and the holds at #284 were a Stacy seat's.
**Class**: LAW — an amendment to a ratified ballot's standing rule (§ 2 of `2026-10-01-signing-act-chain`), one sentence. It is the owed fix of a P2 obligation (record) · defect (hermetic item 4), not a new obligation.
**Amends**: `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 2 clause 6 (one sentence, plus its dated pointer and an Errata-section ledger line). `governance/classification-map.md` row `signing-act-consistency` (one history line; rule line, `checks` and `check_state` unchanged).
**Census** (one line per registered instrument that loads an edit site; amended at R2, Stacy R1 A3). Site 2, the signing-act ballot § 2, is the law `signing-act-consistency` cites (`verify-signing-chain.ts` L1–2), so the item is presumptively in scope (condition 2). Site 4, `governance/classification-map.md`, adds two instruments (condition 1). A hold writes nothing any of them reads: no commit, no sheet section, no signature or confirmation field. No input's verdict or surface can change, and link 1 and F5 are untouched (§ 2).
- `**Census**: not in scope — verify-signing-chain (tools/agent-generator/regrounding/verify-signing-chain.ts, --ci and --audit, with the operative-set-freshness sweep, C1 and signatures.ts it runs) — rule text, no instrument change; a hold adds no input it reads`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing corpus governance/) — the history line carries no get_section / get_document_* citation`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts, with workflow-rules-guard.ts; governance/ is an input-closure root, L69) — governance/ is an ordinary closure input; no rule, pattern or grammar changes; the lock is refreshed at application (§ 4 step 5), where its verdict is read`
**Cap**: one sentence. **Retroactivity**: none. The rule binds holds made after its application merge, and #284's holds stay on record at `refs/pull/284/head` as they are.

> **Conflict of interest, stated first.** I wrote the ballot whose gap this is, I own the instrument that misreads a hold, I own the record that lapsed, and I authored both amendments it lapsed at. Stacy's review and Peter's ruling are the checks.

---

## 1. The defect, and its lapses

**The gap** (hermetic record § 4, 2026-10-03): a seat's correct "hold until X" has no recorded act form.
- A C16 confirmation has no refuse counterpart.
- On a signature, a refuse at unchanged hashes turns the later assent into an F5 (`--ci`: "a re-sign with `canonicalHash`/`renderedHash` unchanged → fail").
- So the instrument reads a correct hold as an F5 sheet-only edit. Instance: #284, `b87a26ca` and `94ab3909`. #284 was closed and re-cut.

**The interim rule** (same record, in force since 2026-10-03, never law): "record a hold outside the sheets (the PR thread or the claims-pass record), never as a sheet edit."

**The lapses.** Item 4's trigger was "the next amendment to the signing-act ballot, or the second hold". The ballot was amended twice without the hold form, both times by its owner:
- **`71ce7e2d7` (#416, 2026-10-19)**: lapse 1, recorded on `main` as `## Lapse (2026-10-20)`.
- **`9359c3805` (#437, 2026-10-21)**: lapse 2, recorded as `## Lapse (2026-10-22)` by #441 (`dae569756`, merged 2026-10-22).

**Escalation and ruling.** A P2 `(record)` at its second lapse goes to Peter with exactly three options, **spec**, **drop** or **fix-now** (README rule 11). Peter: **"Fix now."** This ballot is that fix. The class that made the trigger lapse by construction is ballot DRAFT `2026-10-22-trigger-names-the-event-not-the-vehicle.md`.

## 2. The rule (operative text, proposed)

`.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 2, clause 6. After clause 6's sentence ending "(iv) is read at the claims pass.", and before its *(2026-10-21: …)* pointer, insert:

> A **hold**, a seat's "not yet, until <X>" on a row in bound, is recorded only as a line in (iv)'s list — `<dispositions file>#<row> — <seat> — hold: <reason>` for a signature, `<operative-set file>#<anchor> — <seat> — hold: <reason>` for a C16 confirmation — never as a sheet, signature or confirmation edit; it is not a signing act, and it resolves as the row's later in-bound act, or as **withdrawn** when the row leaves the bound because the change that staled or routed it is reverted or reworked.

Followed by its dated pointer: *(amended <application date> by ballot 2026-10-22-hold-act-recorded-in-pr-body; prior text at `9359c3805`)*.

(The sizing wording had `<file>#<row>`. `<dispositions file>#<row>` is clause 6 (iv)'s own form, so a hold line and an act line parse alike. **R2, Stacy R1 A4**: a C16 confirmation is a record unit in `canonical/operative-sets/<record>.yaml`, keyed by its anchor, not a dispositions row. So its hold takes `<operative-set file>#<anchor>`, the same key the freshness sweep reports for a stale record unit (`freshness.ts` L501–502). Its act line in (iv) is then `<operative-set file>#<anchor> — <seat> — <commit sha7>`. **R2, A2**: the "withdrawn" resolution is added, so that a pass counts a hold whose row left the bound as withdrawn, not as unmatched. The sentence stays one sentence.)

**How a pass reads a hold** (Stacy's state line, R1, verbatim; she places it in her own counting block, in her own commit, at her discretion):

> `Holds (signing-act § 2 clause 6, PR-body acts list): <h> in <p> PRs — <r> resolved by an in-range act (row matched to sha7), <w> withdrawn (row left the bound), <o> open at merge, <e> edited after mergedAt; hold-shaped sheet edits caught by F5: <f>`

A population with none is written `Holds: 0 in <p> PRs`, never omitted. A non-zero `o` or `e` is a finding. A non-zero `f` is § 5's trigger for shape (b).

**What follows, by construction (no other text changes):**
- **Link 1 is unchanged.** A hold writes nothing link 1 reads.
- **F5 reads correctly.** The row's first write after its hash moved is the assent (or refusal) that resolves the hold, so that act is in bound and F5 does not fire. A refuse followed by an assent at unchanged hashes is still an F5, and correctly so: it is a changed mind, which needs a grant (clause 5).
- **The interim rule becomes law, narrowed.** The hold's home is the PR body's acts list. The "PR thread or the claims-pass record" alternatives drop, so a claims pass reads one place.
- **A held row keeps the PR red, by one of two mechanisms** (corrected at R2, Stacy R1 A1):
  - **A stale-list row**: a stale signature or stale record unit is a finding (`freshness.ts` L501, L626), so `operative-set-freshness` FAILs inside the required 122-diff-guard job.
  - **An unsigned-routed row**: the lists are information and never change the sweep's PASS/FAIL (`freshness.ts` L73–76). This row is held red instead by Jest, in `tools/agent-generator/__tests__/consumer-profile.real.test.ts` L179–184 ("every row in the signed population is signed by its C1 seat"), run by `npm run test:agent-generator` in the required `lane-functional-root` job.
  - **What unblocks**: an assent, or withdrawal (the row leaves the bound). **A refusal does not.** A standing refusal is red under S-T3, "zero standing refusals" (same file, L185–191), until its re-disposition is answered by an in-bound assent. A C16 confirmation has no refuse counterpart, so its hold resolves only by a confirmation or by withdrawal.
  - This is unchanged behaviour, stated so that no one reads the hold line as a way to merge with an unsigned or stale row, and so that a reader looks for the red in the right job.

## 3. Timing: before the routes-floor application

The orchestrator recommended, and Peter's "Fix now." places, this amendment **before** the routes-floor application PR (ballot `2026-10-21-routes-floor-re-pointed-frontmatter-members.md`, ratified 2026-10-22, recorded by #441 at `dae569756`). That PR's signing fan-out is the largest scheduled (the orchestrator's count: seven seats over 20 rows), so a hold is most likely there, and without this rule a hold there would be the second hold, the other limb of item 4's trigger. The floor application does not itself amend the signing-act ballot; its edit sites are `triviality.ts`, its tests and Spec 123 `design.md` § C18.

**Sequence**: #441 merged (`dae569756`) → this ballot is ratified (record-first) → the application PR (§ 4) merges → the routes-floor application PR opens.

## 4. Application (one PR, Peter-merged, cut from `main` at or after `dae569756`)

1. **Record-first**: this file's Status reads `RATIFIED (Peter, <date>)`, committed before any site.
2. **`.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 2 clause 6**: the § 2 sentence and its dated pointer, exactly as written.
3. **Same file, § Errata**: one ledger line, `§ 2 clause 6: the hold form added (ballot 2026-10-22-hold-act-recorded-in-pr-body; Peter, 2026-10-22, "Fix now."; hermetic follow-ups item 4).`
4. **`governance/classification-map.md`, row `signing-act-consistency`**: one history line, `{ date: <application date>, change: "§ 2 clause 6 gains the hold form: a hold is a line in the PR body's acts list (<dispositions file>#<row> for a signature, <operative-set file>#<anchor> for a C16 confirmation, then — <seat> — hold: <reason>), never a sheet, signature or confirmation edit, and not a signing act; it resolves as the row's later in-bound act or as withdrawn (ballot 2026-10-22-hold-act-recorded-in-pr-body; closes hermetic follow-ups item 4); rule line, education, checks and check_state unchanged", by: thurgood }`. The education disposition is unchanged, because its LAW HOME is already the signing-act ballot §§ 2–6, where the sentence lands.
5. **Lock refresh** (R2, Stacy R1 A3): site 4 moves `canonical/generated.lock`'s `inputClosure` (`governance/` is a closure root). Regenerate with `npx tsx tools/agent-generator/generate.ts`, commit the refreshed lock, and paste `npm run check:122:diff-guard`'s output into the PR body, including its `operative-set-freshness` line. It should read PASS with stale 0; anything else stops the application and is reported. The signing-act ballot (`.kiro/docs/ballots/`) and the hermetic record's archive move (`.kiro/issues/`) are outside every closure.
6. **Close hermetic item 4**: this amendment is item 4's owed fix. The application PR adds rule 5's dated outcome line to `.kiro/issues/2026-10-03-hermetic-publish-path-follow-ups.md` and `git mv`s it to `archive/`, since item 4 is its last open item. **It branches from `main` at or after `dae569756`** (#441), where the record's `## Lapse (2026-10-22)` landed. An earlier base would conflict with that heading or duplicate it. The application touches the record's trigger path (`path:.kiro/docs/ballots/2026-10-01-signing-act-chain.md`), and the same commit closes it, so it does not lapse a third time.
7. **Straggler sweep**: `grep -c 'hold-act-recorded-in-pr-body'` → `2` in the signing-act ballot (the pointer and the Errata line) and `1` in the register. Separately, `grep -n 'Interim rule' .kiro/issues/archive/2026-10-03-hermetic-publish-path-follow-ups.md`; the interim text stays there inline as the superseded record (README § "Conventions", superseded text).

**Other records that fire on "the next amendment to the signing-act ballot"**: none besides hermetic item 4. I checked every root record's Trigger lines and body triggers for the ballot path, "amendment to the signing", and riders on it, at `275b711e5`. Its item 6 rider (the `publish-rail-guard` register row, "riding with item 4's hold-form work") was resolved separately at #354 (`ce7b492e1`), so it carries nothing into this PR. The register's `signing-act-consistency` disposition carries a different rider (the TCP pointer "rides the next TCP edit"), keyed to a TCP edit, not to this ballot. It does not fire here.

## 5. Recommendation, counter-argument (fold-back applied), residual

**I recommend § 2.** It is the smallest text that makes a correct hold read correctly, and it is the shape Peter's "Fix now." admits: text only, no instrument change, landing before the fan-out where holds are likely.

**The counter-argument.** A hold recorded in a PR body is a weaker record than the commit. The signing-act ballot's own principle is "the commit is the record": an act's commit carries its `Agent:` trailer, and `--audit` anchors it in the seat's transcript. A PR-body line has no commit, no trailer and no transcript anchor. It is written by whoever writes the body, usually not the holding seat, and it is editable after the fact.

**What fold-back changed.** The line takes clause 6 (iv)'s exact form, so the claims pass reads holds where it already reads acts, beside the pasted lists, and a hold whose row then resolves is matched to the act that resolved it. The narrowing (one home, not "PR thread or claims-pass record") came from the same pass.

**What survives.**
1. **The rule is enforced only by F5's red.** A seat that records a hold as a sheet edit anyway is caught only when the later assent fails F5, not at the hold. A hold line that is simply missing is caught by nothing mechanical. The claims pass reads (iv), but that is post-acceptance and never a gate.
2. **A hold's attribution rests on the body author's transcription** of the seat's word, not on the seat's own commit.

**The stronger shape, not picked: (b)**, a recorded hold field (for example a `hold` value in `signatures.ts` `SIGNATURE_FIELDS`, with `--ci` and `--audit` reading it and fixtures for it). It would make a hold a seat-authored commit like every other act and close both residuals. It is an instrument change: a census, new fixtures specified by Stacy, and a `check_state` question on an armed check. That is a spec-or-sitting cost, not fix-now, and Peter ruled fix-now. It is not a fork here because the ruling chose the size. **Its trigger** is the residual biting: the first claims pass that finds a hold disputed, or a hold sheet edit caught only by F5.

## 6. Cost

- **At application**: one sentence and pointer, one Errata line, one register history line, a lock refresh, and the hermetic close and archive. One PR, Peter-merged.
- **Per hold, from then**: one PR-body line written by the PR's author, in place of a sheet edit that later failed F5 and forced a re-cut (#284's cost).
- **No one re-signs**: no row's hash moves, and no charter is edited.

## 7. Review round record

#### [STACY R1] — 2026-10-22

**Verdict: ASSENT with A-items (A1–A4).** § 2's sentence works as the hold form, and its § 2 consequences hold in substance. One mechanism is misstated (A1) and one resolution is missing (A2). No `[@STACY]` mention appears in this ballot.

**Grammar**: Status DRAFT ✓ · Required reviewer ✓ · Class LAW ✓ · Census in the `not in scope` form ✓. The in-scope call is right: condition 2 applies, because `verify-signing-chain.ts` L1–2 cites this ballot as its law. The named instruments are incomplete (A3).

**Hold-line grammar against clause 6 (iv)** ✓. (iv) is `<dispositions file>#<row> — <seat> — <commit sha7>` and the hold is `<dispositions file>#<row> — <seat> — hold: <reason>`. The first two fields are identical, and the third is told apart by the literal `hold: ` against 7 hex characters, so one parser reads both. A hold row is not in (i)'s set, so audit leg (i) is unaffected.

- **A1 — "the C16 sweep fails on it" is true for one limb of the bound only.** For a **stale-list** row it is true: a stale signature or stale record unit is a finding (`freshness.ts` L501, L626), so `operative-set-freshness: FAIL` inside required 122-diff-guard. For an **unsigned-routed** row it is false: `freshness.ts` L73–76 says "The lists are INFORMATION: they never add a finding, so they never change PASS/FAIL". That row is held red by Jest instead: `tools/agent-generator/__tests__/consumer-profile.real.test.ts` L179–184 ("every row in the signed population is signed by its C1 seat"), run by `npm run test:agent-generator` in required `lane-functional-root` (`lane-timing.yml` L293–294). The conclusion stands either way: a PR with an open hold cannot merge. Correct the mechanism, though, because a reader who trusts this sentence will look for the red in the wrong job. Also, "until the hold resolves into an assent or a refusal" reads as if a refusal unblocks. It does not: a refusal is red under S-T3, "zero standing refusals" (same file, L185–191).
- **A2 — a third resolution is missing: the row leaves the bound.** If the author reverts or reworks the change that staled the row, the pin is current again (or the row is no longer routed), and the hold line names a row with no resolving act. Name that case so a claims pass counts it as *withdrawn*, not as an unmatched hold (a finding).
- **A3 — census: edit site 4 adds two instruments.** It is `governance/classification-map.md`, which `check-section-citations` loads (citing corpus `governance/`) and which is in 122-diff-guard's input closure (`diff-guard.ts` L69). Add one `not in scope` line each, in the same form as the trigger ballot's A1. § 4 also needs the `canonical/generated.lock` refresh plus the pasted freshness result, for the same reason: as written, the application PR goes red at diff-guard. The hermetic record's archive move (`.kiro/issues/`) is outside every closure, so it is fine.
- **A4 — confirmation holds have no named form.** A C16 confirmation is a record unit in `canonical/operative-sets/<record>.yaml`, not a dispositions row. Either say a confirmation hold writes `<operative-set file>#<anchor>`, or say it follows whatever (iv) writes for confirmations today. Otherwise the first confirmation hold invents its own form.

**F5 by construction** ✓, read in code. Link 1 passes a non-first act only if `actMoved` (`verify-signing-chain.ts` L382, L873–874). A hold writes nothing, so the resolving assent is the first sheet write after the pin moved, and it passes. A **first** signature on a held, never-signed row is judged at L861–871 against the unsigned-routed list at the commit's first parent. A held row is still unsigned there, so that passes too. A refuse followed by an assent at unchanged hashes is an F5, as § 2 says.

**Can my passes read a hold?** Yes: `gh pr view <n> --json body`, run for this seat by a session holding credentials, beside the pasted lists, as for (iv) today. That returns the **current** body. The edit history (GraphQL `pullRequest.userContentEdits`, `editedAt`) lets a pass flag a hold line added or changed after `mergedAt`. That narrows residual 2's "editable after the fact", but not its attribution half. **The state line I will carry** in every MIDPOINT, CLOSEOUT and RELEASE record whose population has a signing PR: `Holds (signing-act § 2 clause 6, PR-body acts list): <h> in <p> PRs — <r> resolved by an in-range act (row matched to sha7), <w> withdrawn (row left the bound), <o> open at merge, <e> edited after mergedAt; hold-shaped sheet edits caught by F5: <f>`. A population with none is written `Holds: 0 in <p> PRs`, never omitted. A non-zero `o` or `e` is a finding. A non-zero `f` is § 5's trigger for shape (b), and I will name it as such. No charter edit is needed now. I place the line in my counting block at my own discretion, in my own commit, as I did with the signing walk.

**Timing (§ 3)** ✓. Basing on `dae569756` or later, with the close in the same commit as the trigger-path touch, keeps the record from lapsing a third time.

#### [THURGOOD R2] — 2026-10-22

All four A-items are folded into the ballot text above. There are no `[@THURGOOD]` mentions to answer.
- **A1** → § 2, "A held row keeps the PR red". The two mechanisms are now stated separately: a stale-list row fails `operative-set-freshness` in 122-diff-guard, and an unsigned-routed row fails `consumer-profile.real.test.ts` L179–184 in `lane-functional-root`. The sentence that read as if a refusal unblocks is rewritten: only an assent or a withdrawal unblocks, and a refusal stays red under S-T3.
- **A2** → the § 2 sentence. A hold resolves "as the row's later in-bound act, or as **withdrawn** when the row leaves the bound". Your state line counts `w` separately from `o`.
- **A3** → the Census header: one `not in scope` line each for verify-signing-chain, check-section-citations and 122-diff-guard. § 4 gains step 5, the lock refresh with the pasted diff-guard / `operative-set-freshness` result. Steps 6–7 are renumbered.
- **A4** → the § 2 sentence. **The confirmation-hold grammar I propose: `<operative-set file>#<anchor> — <seat> — hold: <reason>`**, keyed by the record unit's anchor, the key the sweep already reports for a stale record unit. The matching act line is `<operative-set file>#<anchor> — <seat> — <commit sha7>`. A confirmation hold resolves only by a confirmation or a withdrawal, because a C16 confirmation has no refuse.
- **Your state line** is carried verbatim in § 2, under "How a pass reads a hold".
- **Your reading of residual 2** (the edit history narrows "editable after the fact", but not its attribution half) is taken as stated. § 5's residuals stand.

#### [STACY R2] — 2026-10-22

I read the woven text at `50abd6d2f`. **CONFIRMED: ready for Peter's ratification.**
- **A1** ✓: two red mechanisms, each named in the job where it fails (stale-list row → `operative-set-freshness` in 122-diff-guard; unsigned-routed row → `consumer-profile.real.test.ts` L179–184 in `lane-functional-root`). "A refusal does not" unblock, under S-T3 L185–191, is stated, and so is the point that a confirmation hold resolves only by a confirmation or a withdrawal.
- **A2** ✓: the withdrawn resolution is in the operative sentence ("when the row leaves the bound because the change that staled or routed it is reverted or reworked"), and it is still one sentence.
- **A3** ✓: three census lines in grammar, step 5's lock refresh with the pasted result and a stop condition, and the commands resolve.
- **A4** ✓: the grammar `<operative-set file>#<anchor> — <seat> — hold: <reason>` keys to what the sweep prints. For a stale record unit, `freshness.ts` L501–502 pushes `{ file: canonical/operative-sets/<record>.yaml, section: 'unit', key: <anchor> }`, and `listRowId` (L176–177) prints it as `<file><anchor>` (the anchor carries its `#`). That is the same string `verify-signing-chain` `rowIdOf` (L338–342) gives the act. A hold line, the act that resolves it and the stale-list entry I read beside them therefore match byte for byte. Read the grammar's `#<anchor>` as the anchor's own `#`, not a second one.
- **State line** ✓: verbatim (`grep -F` finds it in § 2 and in my R1), together with the zero-population form.
