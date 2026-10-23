# Signatures — `stacy` consumer profile (C1: signer **Stacy**)

**Rows**: `canonical/profiles/consumer/stacy.dispositions.yaml`. **Signer**: Stacy. She signs her own charter's rows as its owner, and Peter samples her assents (B-U2 F-3 (ii)).
**Rule**: Req 11.6.5e. An item is credited only if the unit's **own** rendering (`canonical/_consumer-output/_canonical/…`) states or entails it. A function that survives only elsewhere earns no credit here. `surviving: []` is itemized.
**Phase two, run 1**, 2026-09-29, Spec 123 Task 15.5.

## `#identity`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#identity` (re-pointed; ROUTED)
canonicalHash: sha256:43defd686fc5d68ce4f4d13231c8b98631b1292cdf2135f489299b751d856700
renderedHash: sha256:e088fc56dc4910ecf0c6cbc1b6446bf74d349f5badb5ca95db8e4daa3528cd81
verdict: assent — surviving 11/11

`stacy-claims-both-tiers` survives without its ratification date. Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#in-scope`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#in-scope` (re-pointed; ROUTED)
canonicalHash: sha256:c5c798aafe80cf38d78e3023987450a2dae382e5f1a46effc4f10fe99df45579
renderedHash: sha256:0a31d551a2bb64728a193c7895f502c1fc3a1956edb4d7663fb99eaca0640145
verdict: assent — surviving 8/10; not surviving: `scope-8`, `scope-10`

`scope-8` is not entailed as a whole: the rendering keeps the claims-audit scope but drops the M3/M4/M5 metrics (Spec 127's). `scope-10` (this repo's register rows) has no consumer counterpart.

## `#out-of-scope`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#out-of-scope` (re-pointed; ROUTED)
canonicalHash: sha256:be1ba8ba9bf4d3c3c2ff657fc3b6aabf428cd21aff585d49d44b0268b058f4ab
renderedHash: sha256:938c670d4259a89225df8ee869262e701de2f969b1dddca4fd0890d39700e820
verdict: assent — surviving 6/7; not surviving: `out-7`

`out-5` is re-pointed to the human lead. `out-7` (the claims instrument is Thurgood's) is not in this rendering. Its boundary, "checks you do not maintain", survives in `out-6`.

## `#operational-mode-process-audit:preamble`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#operational-mode-process-audit:preamble` (re-pointed; ROUTED)
canonicalHash: sha256:87470ed51c60c7908225d504f181d60b464fe7468c8fcebc2ac93f18a042ab4d
renderedHash: sha256:ebc19b7eeec091aef048bc68f88ce85dfd92f01ab92a853b0bef5a4a40962c6f
verdict: assent — surviving 1/1

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#the-charter-cut-ratified-verbatim`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-charter-cut-ratified-verbatim` (re-pointed; ROUTED)
canonicalHash: sha256:faf006560fb7d64d617114bc38e435003c2d75fcc7d07100aeb367ce7e55b191
renderedHash: sha256:12116dca8e4e4fd69ffa64f9276c97aa497813f4461a0bcd3afa1ab4203e9355
verdict: assent — surviving 2/2

Both cuts survive verbatim.

## `#the-claims-pass-record-claims-passmd-the-template`

signer: stacy
date: 2026-10-19
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-claims-pass-record-claims-passmd-the-template` (re-pointed; ROUTED)
canonicalHash: sha256:006d7a0b20b48f56a4769ba2d44042284270b2a9bd7e620b4c79cfd2cc247b74
renderedHash: sha256:ac788d09a695a9a4f828e4e9c5ea3c3c1d51d96eb387c3ce2c65a13447ee5e75
verdict: assent — surviving 18/35; not surviving: `counting-6`, `counting-8`, `counting-9`, `counting-9b-census`, `counting-10-buckets`, `counting-10-ncc-rate`, `counting-10-assent-refusal`, `counting-10-spot-check`, `counting-10-full-survival`, `counting-11`, `counting-12`, `emission-reading`, `delegated-tier-read`, `instruments-read`, `governance-edit-kind-read`, `delegate-audit-pointer`, `instrument-census-read`

**Re-signed 2026-10-19, second this date** (prior signature: assent 18/33, 2026-10-19, against `sha256:11c50738271b1e8436109a51b12d12a8f2b19463d04dfdeb805b6bd69570c5e9`). Stale because the canonical unit gained two items, both mine from ballot `2026-10-19-instrument-census-at-draft` (site 3): the instrument-census read bullet and the `instrument census` counting-block entry, applied by Thurgood byte for byte at `cd6ee604c` and re-confirmed by me at 35 items (`c4c9ef2f2`). Thurgood moved the overlay pin only and added both to the `subtraction-3` removals, then regenerated (`c50bcbd51`). The rendering did not change: renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/r.ts`), equal to the committed rendering's value and to the prior signatures'.
- **Judged against**: the rendered unit at this revision and the operative set at 35 items.
- **Neither new item is credited**: the rendered unit states nothing of either (checked: no "census" text anywhere under `canonical/_consumer-output`). Both operate on this repo's ballots (`.kiro/docs/ballots/**`, the `census` field of `governance/classification-map.md`); consumers run no ballots and have no instrument census to read or count, so neither has a consumer counterpart. The removal texts name them ("; **The instrument-census read**" and "**instrument census**"), so the removals and the non-credit agree.
- **Unchanged from the prior signature**: the same 18 items survive and the same 15 are not credited, for the reasons in the prior records below; the two new items are the 16th and 17th not credited.
- **The run-1 tally** (§ "Signing run summary (2026-09-29, phase two, run 1)", the `#the-claims-pass-record-…` line, 18/31) is the 2026-09-29 count and is not rewritten. At this re-sign the row reads 18/35. The annotation sits here because the signing-chain verifier reads a change to a summary section, which keys to no row, as a link-2 failure.
- **C1 collapse**: I signed this assent on my own charter's row, so it falls in Peter's sample.

**Prior signature record (superseded, 2026-10-19, earlier same day)**:

> signer: stacy
> date: 2026-10-19
> canonicalHash: sha256:11c50738271b1e8436109a51b12d12a8f2b19463d04dfdeb805b6bd69570c5e9
> renderedHash: sha256:ac788d09a695a9a4f828e4e9c5ea3c3c1d51d96eb387c3ce2c65a13447ee5e75
> verdict: assent — surviving 18/33; not surviving: `counting-6`, `counting-8`, `counting-9`, `counting-10-buckets`, `counting-10-ncc-rate`, `counting-10-assent-refusal`, `counting-10-spot-check`, `counting-10-full-survival`, `counting-11`, `counting-12`, `emission-reading`, `delegated-tier-read`, `instruments-read`, `governance-edit-kind-read`, `delegate-audit-pointer`
>
> **Re-signed 2026-10-19** (prior signature: assent 18/32, 2026-10-18, against `sha256:29f67487340c5c5a970f454430b234269a73503f5caec77340985c065e109a33`). Stale because the canonical unit gained one bullet, my delegate-audit pointer (ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` S5; signing-act ballot § 5.3), applied by Thurgood byte for byte at `47afb433c` and re-confirmed by me at 33 items (`17e0bf939`). Thurgood moved the overlay pin only and added the pointer to the `subtraction-3` removal (`5842fee82`), then regenerated (`a3f8b6053`). The rendering did not change: renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/tools-stacy/fresh-rendered-hash.ts`), equal to the committed rendering's value and to both prior signatures'.
> - **Judged against**: the rendered unit at this revision and the operative set at 33 items.
> - **`delegate-audit-pointer` is not credited**: the rendered unit states nothing of it (checked: no "delegate", "signing chain" or `verify-signing-chain` text in `canonical/_consumer-output/_canonical/agents/stacy.md`). The pointer names this repo's signing-act chain and a delegate seat's audit file; consumers run no signing chain and have no delegate seats, so it has no consumer counterpart. The removal text names it ("; **The delegate-audit pointer**"), so the removal and the non-credit agree.
> - **Unchanged from the 2026-10-18 signature**: the same 18 items survive and the same 14 are not credited, for the reasons in the prior records below; the 33rd item is the 15th not credited.
> - **The run-1 tally** (§ "Signing run summary (2026-09-29, phase two, run 1)", the `#the-claims-pass-record-…` line, 18/31) is the 2026-09-29 count and is not rewritten. At this re-sign the row reads 18/33. The annotation sits here because the signing-chain verifier reads a change to a summary section, which keys to no row, as a link-2 failure.
> - **C1 collapse**: I signed this assent on my own charter's row, so it falls in Peter's sample.

**Prior signature record (superseded, 2026-10-18)**:

> signer: stacy
> date: 2026-10-18
> canonicalHash: sha256:29f67487340c5c5a970f454430b234269a73503f5caec77340985c065e109a33
> renderedHash: sha256:ac788d09a695a9a4f828e4e9c5ea3c3c1d51d96eb387c3ce2c65a13447ee5e75
> verdict: assent — surviving 18/32
>
> **Re-signed 2026-10-18** (prior signature: assent, 2026-09-29, against `sha256:8103d28e…`). Stale because the canonical unit gained one bullet, my governance-edit-kind read (ballot `2026-10-18-governance-edit-kinds` § 3b), applied by Thurgood byte for byte at `a0e25936c` and re-confirmed by me at 32 items (`a799be236`). The rendering did not change: renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/tools-stacy/fresh-rendered-hash.ts`), equal to the committed rendering's value and to the prior signature's.
> - **Judged against**: the rendered unit at this revision and the operative set at 32 items.
> - **`governance-edit-kind-read` is not credited**: the bullet is removed under `subtraction-3` (Thurgood extended the existing removal entry at `e09d2842e`, as I decided). It reads the `**Edit kind**:` lines this repo's TCP requires over this repo's governance path set, and the consumer TCP rendering removes that line too (`signatures/task-completion-protocol.md` `#branch-and-pr-conventions`, item `-8`), so a consumer pass has no line to read. The two renderings agree.
> - **Unchanged from the 2026-09-29 signature**: the same 18 items survive and the same 13 are not credited, for the reasons below.
> - **The run-1 tally** (§ "Signing run summary (2026-09-29, phase two, run 1)", the `#the-claims-pass-record-…` line, 18/31) is the 2026-09-29 count and is not rewritten. At this re-sign the row reads 18/32. The annotation sits here because the signing-chain verifier reads a change to a summary section, which keys to no row, as a link-2 failure.
> - **C1 collapse**: I signed this assent on my own charter's row, so it falls in Peter's sample.

**Prior signature record (superseded, 2026-09-29)**:

> signer: stacy
> date: 2026-09-29
> canonicalHash: sha256:8103d28ef4a140c355a2c82c2395c492fceb1b48c46a87b24f49b6713fb38ac7
> renderedHash: sha256:ac788d09a695a9a4f828e4e9c5ea3c3c1d51d96eb387c3ce2c65a13447ee5e75
> verdict: assent — surviving 18/31

**Judged strictly, as briefed.**
- The `volatile-ok` marker is dropped.
- **Survive**: `closeout-path` (with a generic specs dir), `section-findings` (the 112 taxonomy replaced by its kinds inline), `counting-4` (the fixed-string exemption re-grounded to "every criterion your process lets a parent waive, counted per waiver"; a count of every waiver entails it), `counting-7` (without its ratification date), and the rest verbatim.
- **Not surviving**: the counting items tied to this repo's machinery. That is the `(platforms: …)` fallback, the delegated-tier line, the consult line and M3/M4/M5, and it includes the B-U2 re-grounding-disposition metrics and their populations. It also covers the emission-reading, delegated-tier and instruments reads.
- **On the B-U2 items, where I differ from the brief**: I read that they have **no consumer counterpart**. A consumer's repo holds no consumer-profile dispositions, signatures or render populations to count; those exist only in DesignerPunk's generator. So dropping them is correct, and I assent without them.

## `#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script`

signer: stacy
date: 2026-10-22
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script` (re-pointed; ROUTED)
canonicalHash: sha256:c33de65dbe1f520848954760b2d2abcc539c3454b81de434e75ff6721d85dbd4
renderedHash: sha256:7441cad815e15f2200eee8a5548a63c1bc342301d9e8ad26485e144093394204
verdict: assent — surviving 13/13

**Re-signed 2026-10-22** (prior signature: assent 14/14, 2026-10-19, against canonical `sha256:e3f6f82a…` and rendered `sha256:19cef6df…`). Stale because the canonical unit and its rendering both moved: the pasted pipeline is replaced by a call to the committed script `scripts/owed-set.sh` (Peter's "Yes.", 2026-10-21; `.kiro/issues/2026-10-19-owed-set-query-over-lists-in-progress-specs.md`), and the consumer overlay is re-pointed to `bash node_modules/@3fn/core/scripts/owed-set.sh --specs-dir specs`. I wrote both texts; Thurgood applied them byte for byte at `0e2d81d00`, pinned at `b7c32ae44`, regenerated at `d82151324`. I re-confirmed the set at 13 items in `3c8c43a55` (14 to 13; the canonical hash `sha256:c33de65d…` is the unit's). renderedHash recomputed at this revision from a fresh temp-tree rendering of the worktree at `060894526` (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/tools-stacy/fresh-rendered-hash.ts`): `sha256:7441cad8…`, equal to the committed rendering's value (3 pieces: `_canonical`, `cc`, `kiro`), to the figure I was handed (recomputed, not copied) and to the sweep.

- **Judged against**: the fresh rendered unit at this revision and the operative set at 13 items.
- **Checked against the script's real output, not the removals list.** I ran `bash scripts/owed-set.sh` at `060894526`: exit 0; rows `candidate 122-agent-generator`, `closed` ×2, `stub` ×4, `touch-only` ×2; count line `owed-set: 1 candidates; excluded: 2 closed, 0 open, 4 stub, 2 touch-only; classes a/b/c = 1/0/0; 171 specs without activity since 2026-09-19; adoption 2026-09-19 from .kiro/docs/ballots/2026-09-19-completion-claims-integrity.md; ref 060894526`. The row-sum identity holds (1 + 2 + 0 + 4 + 2 = 9 rows printed). The five classes, the field order of the count line, the `N of M parents unticked` prefix of the `open` reason (the script appends the assertion note), the `adoption <date> from <source>` field, the `unavailable (<why>) — continue` form and the `--specs-dir` / `--adoption` flags in the rendering all match the script. The script's 24 falsification cases pass under the `test:scripts` config.
- **Every item survives.** `owed-set-predicate`: the three conditions are restated with the team's adoption day for the ratification date; same obligation, the date's source stated. `owed-set-emits-exclusions`: "reports every spec it leaves out, counted by class, so a wrong answer shows up as a number you can check". `owed-set-run`: the consumer's call. `owed-set-row-classes`: all five classes with the same definitions. `owed-set-count-line`: the line's format and the row-sum identity read first; the repo-only clause "for this repository adoption is the ratification date" is replaced by the printed source. `owed-set-heuristics` and `owed-set-unavailable`: verbatim, plus the remedy. `owed-set-one-code-path`: "call this same script in each; do not copy its logic", plus report-a-wrong-result-as-a-script-defect. `owed-set-class-a`, `-b`, `-c`: restated generically ("whatever form your tasks files use"); `-a` drops the recognized-forms precedence list, which is the script's behaviour, not the reader's. `owed-set-git-history`: kept.
- **The closest call, credited, with its limit named.** `owed-set-candidate-not-verdict` ends in an instruction, "confirm the unit's merge (`git log --first-parent -- …`) before you open a pass on a candidate". The rendering does not state it. It entails it: a spec owes a pass "only once its final declared merge unit has merged (the unit's PR has merged and its tasks are ticked)", and "the script reads git and `tasks.md`, not the merge". A reader who opens a pass on a candidate without checking the merge contradicts both sentences, and the last paragraph keeps `git log --first-parent`. I credit it. A one-clause tightening in the overlay (say the confirmation is yours to do) would make the item stated rather than entailed; that is my text and Thurgood's apply, non-blocking, and it would re-sign this row again.
- **This is a full-survival assent**, earned item by item (the second in a row on this unit).
- **`commands[owed-set]` is not signed in this act.** The re-pointed frontmatter entry is `not-routed` today (`--census-routed`: 0 unsigned-routed), so a first signature on it would fail link 1. It becomes routed when the routes floor (clause 5 of ballot `2026-10-21-routes-floor-re-pointed-frontmatter-members`) is ratified and applied, and its first signature lands in that application PR's batch.
- **The run-1 tally** (§ "Signing run summary (2026-09-29, phase two, run 1)", the `#the-owed-set-pipeline-…` line, 14/14) is the 2026-09-29 count and is not rewritten. At this re-sign the row reads 13/13. The annotation sits here because the signing-chain verifier reads a change to a summary section, which keys to no row, as a link-2 failure.
- **C1 collapse**: I signed this assent on my own charter's row, so it falls in Peter's sample.

**Prior signature record (superseded, 2026-10-19; canonical `sha256:e3f6f82a…`, rendered `sha256:19cef6df…`)**:

> signer: stacy
> date: 2026-10-19
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script` (re-pointed; ROUTED)
> canonicalHash: sha256:e3f6f82a3b33e37b2e4862e259510551fd4c3d33b19da0357164b26f2742f837
> renderedHash: sha256:19cef6df9da933682b1eb24fbfbc20a9ba496b41e825f08f3d222a83b2178cb7
> verdict: assent — surviving 14/14
>
> **Re-signed 2026-10-19** (prior signature: assent, 2026-10-18, against rendered `sha256:c821fc77…`; the canonical hash is unchanged, `sha256:e3f6f82a…`). Stale because the overlay gained one sentence under the query: `OWED:` rows are candidates, not verdicts, and a spec owes a closeout claims pass only once its final declared merge unit has merged, so rows for specs still in progress (the two starter specs on day one) are expected and are not findings (`.kiro/issues/2026-10-18-owed-set-query-lists-specs-before-final-unit-merge.md`; Peter's "agreed" in chat, 2026-10-19, to "one disclosure sentence, Stacy's text"). I wrote the text; Thurgood applied it byte for byte at `c9a0d35f3` and regenerated the renderings at `dff44f544`. The canonical unit, its operative set (14 items) and its confirmation did not change, so there is no re-confirmation. renderedHash recomputed at this revision from a fresh temp-tree rendering of the worktree at `dff44f544` (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/tools-stacy/fresh-rendered-hash.ts`): `sha256:19cef6df…`, equal to the committed rendering's value, to my prediction before the apply (a fresh render of the patched tree), and to Thurgood's.
>
> - **Judged against**: the rendered unit at this revision and the operative set at 14 items.
> - **Every item survives.** The sentence adds disclosure and removes no function: all 14 items render as they did at the prior signature. `owed-set-emits-exclusions` is the item nearest the new text: the query still reports every spec it leaves out, counted by class, and the sentence adds that a listed row is a candidate. Its parenthesis names the unit's PR merge first and the ticks second, matching the predicate ("final declared merge unit has merged"). **It is a full-survival assent.**
> - **The run-1 tally** (§ "Signing run summary (2026-09-29, phase two, run 1)") is the 2026-09-29 count and is not rewritten; the row still reads 14/14.
> - **C1 collapse**: I signed this assent on my own charter's row, so it falls in Peter's sample.
>
> **Prior re-sign record (superseded, 2026-10-18; rendered `sha256:c821fc77…`)**:
>
> **Re-signed 2026-10-18** (prior signature: assent, 2026-09-29, against rendered `sha256:8e4651c8…`; the canonical hash is unchanged, `sha256:e3f6f82a…`). Stale because the overlay's adoption-date sentence and lines changed for C-4 (`.kiro/issues/2026-10-03-consumer-stacy-owed-set-needs-adoption-record.md`; rulings row 28 (2)): the adoption record is now optional, and without it the query uses the day `designerpunk.manifest.json` was first committed on the first-parent line, prints which source it used, and stops with a named remedy only if neither exists. I wrote the text; it was applied by Thurgood byte for byte at `1f660a1bc` and the renderings regenerated at `22dd80466`. The canonical unit, its operative set (14 items) and its confirmation did not change, so there is no re-confirmation. renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/tools-stacy/fresh-rendered-hash.ts`), equal to the committed rendering's value and to my prediction before the apply.
> - **Judged against**: the rendered unit at this revision and the operative set at 14 items.
> - **Every item survives, re-grounded.** Thirteen items render as they did at the prior signature. `owed-set-ratification-resolve` is the one re-grounded differently: canonically it reads the boundary date from a committed record and stops loudly when it cannot; the rendering reads the team's adoption record when there is one, otherwise the commit that first added `designerpunk.manifest.json` (a committed, checkable event), prints the source, and stops with a named remedy when neither exists. Same function, re-grounded to something a born repo has. `owed-set-predicate` survives with the boundary still "on or after adoption", and the prose now says where that day comes from. The rest is as before: the pipeline keyed to `$SPECS_DIR` and `$ADOPTED` (the midnight pin kept), the three classes restated, three-copies as "keep every copy the same text", the ladder as "a second wrong result → a committed script", git history kept. The rendering is the G1 exemplar E rendering except its adoption-date sentence and lines. **It is a full-survival assent**, earned item by item.
> - **The run-1 tally** (§ "Signing run summary (2026-09-29, phase two, run 1)", the `#the-owed-set-pipeline-…` line, 14/14, and "two are item-by-item re-groundings") is the 2026-09-29 count and is not rewritten. At this re-sign the row still reads 14/14. The annotation sits here because the signing-chain verifier reads a change to a summary section, which keys to no row, as a link-2 failure.
> - **C1 collapse**: I signed this assent on my own charter's row, so it falls in Peter's sample.
>
> **Prior signature record (superseded, 2026-09-29)**:
>
> > signer: stacy
> > date: 2026-09-29
> > canonicalHash: sha256:e3f6f82a3b33e37b2e4862e259510551fd4c3d33b19da0357164b26f2742f837
> > renderedHash: sha256:8e4651c8af28921399677f9ad9a7791f3df9c2aeffd295bc716b2f051e47ddde
> > verdict: assent — surviving 14/14
> >
> > **Every item survives, re-grounded.** The predicate is keyed to the team's adoption record, the pipeline to `$SPECS_DIR` and `$ADOPTION` (the midnight pin kept), the three classes are restated, three-copies becomes "keep every copy the same text", the ladder becomes "a second wrong result → a committed script", and git history is kept. This is the G1 exemplar E rendering. **It is a full-survival assent**, earned item by item; see the tally.

withdrawn: 2026-10-23 — signature withdrawn under the clause-5 grant (Peter, 2026-10-23), `.kiro/issues/2026-10-22-stacy-owed-set-heading-false-after-439.md` § 2a; the key resolves to no unit since 033b3dc3d (charter heading renamed); successor key `#the-owed-set-query-your-command-catalogs-owed-set-entry-the-committed-script`

## `#the-owed-set-query-your-command-catalogs-owed-set-entry-the-committed-script`

signer: stacy
date: 2026-10-23
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-owed-set-query-your-command-catalogs-owed-set-entry-the-committed-script` (re-pointed; ROUTED)
canonicalHash: sha256:fcf52f052773d8f801d52ae79152e04e167d892cb2d568b549429486b1da75bf
renderedHash: sha256:7441cad815e15f2200eee8a5548a63c1bc342301d9e8ad26485e144093394204
verdict: assent — surviving 13/13

**First signature on this key, re-given in full.** The unit's heading was renamed from `#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script` (the heading said "documented commands, deliberately not a committed script" over a body that runs the committed script `scripts/owed-set.sh`; `.kiro/issues/2026-10-22-stacy-owed-set-heading-false-after-439.md`). The old key's signature was withdrawn at its own commit under the clause-5 grant (Peter, 2026-10-23, § 2a of that record), the old row was deleted unsigned (authoring), and this row was added unsigned. I do not carry the 13/13 assent across the rename: I judge it again, below, against the rendering as it stands.
- **The rendering is unchanged by the rename**, which I checked rather than assumed: `renderedHashOf` over the committed `canonical/_consumer-output/` for this row's span (`_canonical/agents/stacy.md` L333–356, source now the renamed key) is `sha256:7441cad815e15f2200eee8a5548a63c1bc342301d9e8ad26485e144093394204`, equal to the old row's last `renderedHash`. The canonical hash moved (`sha256:c33de65d…` to `sha256:fcf52f05…`) because it covers the heading line, which is the key. The overlay pin was re-pointed by Thurgood and equals the new canonical hash (`sha256:fcf52f05…`).
- **Judged against**: the committed rendering, the operative set at 13 items (the same ids as before, in the same order; a heading is a label), and the output of `bash scripts/owed-set.sh` at `12b3e98ff`: exit 0; rows `candidate 122-agent-generator`, `closed` ×2, `stub` ×4, `touch-only` ×2 (9 rows); count line `owed-set: 1 candidates; excluded: 2 closed, 0 open, 4 stub, 2 touch-only; classes a/b/c = 1/0/0; 171 specs without activity since 2026-09-19; adoption 2026-09-19 from .kiro/docs/ballots/2026-09-19-completion-claims-integrity.md`. Row-sum identity: 1 + 2 + 0 + 4 + 2 = 9 = rows printed. The flags the rendering names (`--specs-dir`, `--adoption`, `Adopted: YYYY-MM-DD`) are the ones the script's header documents.
- **Every item survives, each read in the rendering**:
  - `owed-set-predicate`: the rendering's three conditions (final declared merge unit merged; no committed record at `$SPECS_DIR/S/completion/claims-pass.md`; merge on or after the adoption day), with the team's adoption day for the ratification date.
  - `owed-set-emits-exclusions`: "reports every spec it leaves out, counted by class, so a wrong answer shows up as a number you can check instead of a short list that merely looks healthy".
  - `owed-set-run`: the consumer's call, `bash node_modules/@3fn/core/scripts/owed-set.sh --specs-dir specs`.
  - `owed-set-row-classes`: all five classes with their reasons (`closed`, `stub`, `open`, `touch-only`, `candidate`).
  - `owed-set-count-line`: the count line stated in full, and "Read the row-sum identity first" with the sum-that-does-not-add warning.
  - `owed-set-candidate-not-verdict`: the closest call, as at the prior signature. The rendering states that "`candidate` rows are candidates, not verdicts" and that a spec owes a pass "only once its final declared merge unit has merged (the unit's PR has merged and its tasks are ticked)", and that a candidate for a spec in progress "is not a finding". It does not state the instruction "confirm the unit's merge before you open a pass". It entails it: the owed condition is stated as the merge, and the script is stated to read git and `tasks.md`, not the merge. Credited on entailment, limit named.
  - `owed-set-heuristics`: stated, with the spot-read-before-calling-the-set-empty instruction.
  - `owed-set-unavailable`: "it prints one line, `owed-set: unavailable (<why>) — continue`: that is an unanswered question, never an empty set, and you say so instead of writing "empty"".
  - `owed-set-one-code-path`: "call this same script in each; do not copy its logic".
  - `owed-set-class-a`, `owed-set-class-b`, `owed-set-class-c`: the three unit classes, each with its anchor rule; (b)'s reason for existing (a query that drops the single-PR case gives the healthy-looking short list) is stated.
  - `owed-set-git-history`: "`git log --first-parent` gives unit anchors and deltas, and `git show <merge>:<path>` gives what shipped at the merge".
- **Not a refusal**: the function survives in full; the only change is a label.
- **C1 collapse**: I signed this assent on my own charter's row, so it falls in Peter's sample.
- **Predecessor**: `#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script` (signature withdrawn 2026-10-23; its sheet section above is kept as ledger and is not rewritten). Its 2026-09-29 run-1 tally (14/14) and the 2026-10-22 re-sign (13/13) are not rewritten.

## `#honest-reach-carried-so-you-never-inherit-an-over-claimed-instrument`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#honest-reach-carried-so-you-never-inherit-an-over-claimed-instrument` (re-pointed; ROUTED)
canonicalHash: sha256:7b2a7c8edaa9ba38463e8afa521851f7b4350e0892cf5ed9596497f90aaeaa18
renderedHash: sha256:8135bd3a87b7b17a48adef6f05db28afc98e3092cbe82c8f86c87ac0f3586653
verdict: assent — surviving 4/4

All four survive re-grounded: "green to any presence check", "platforms you cannot build here … never as re-verified", "Artifact truth is owned by the claims pass", and the framing sentence.

## `#your-role`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#your-role` (re-pointed; ROUTED)
canonicalHash: sha256:b48ed925de0d75bad9fb8f62563b35ff500e393402e815e79bea67c85dc5e7c5
renderedHash: sha256:2aee390089f24c58852a4cd04cbb5273c87e9a655ce418c0d2d34932cc066110
verdict: assent — surviving 7/7

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#what-you-dont-do`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#what-you-dont-do` (re-pointed; ROUTED)
canonicalHash: sha256:7f0f4de7aab0d9183809ae4a9c6cb875d3651c04461ca28090f87688babccfd6
renderedHash: sha256:0d3f608159411ddfd0393cfdb17279be89b6a45c33bcda2c51dbf98011cd8783
verdict: assent — surviving 3/3

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#with-thurgood-system-counterpart`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#with-thurgood-system-counterpart` (re-pointed; ROUTED)
canonicalHash: sha256:e5aa54f1f1a72f07c1f25d602eac46a08c738839516f23bd779091715e35931c
renderedHash: sha256:075b8a32dc28f5039f7d049a17209ba546d22b3abe8c3d00f0eb96cb7f0a9517
verdict: assent — surviving 5/5

"(DesignerPunk infrastructure)" → "(the design system's infrastructure)"; Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#with-peter`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#with-peter` (re-pointed; ROUTED)
canonicalHash: sha256:0c18fa9f023514cba761392331f1235750a385855b9601e56e3a2787b74b1f15
renderedHash: sha256:8022986bccfcbba8356625c1e1bc0bfa82eb533ab315c2ce9c216413ee1ca757
verdict: assent — surviving 3/4; not surviving: `human-4`

`human-4` (Peter's skillset lives in design) is a fact about this lead, with no consumer counterpart. Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#mcp-practice-notes`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#mcp-practice-notes` (re-pointed)
canonicalHash: sha256:64c55f317e18e344f8b476a9c73a8aff44b2ac4bca321671c415d779b2fa26f3
renderedHash: sha256:a13bda807e0d318bb79b32f1fafb0041f5dd33637216be8701e7bb225c2a73ca
verdict: assent — surviving 5/5

**Re-signed 2026-09-29, in the re-sign run** (prior signature: assent 5). All five survive. `mcp-fallback` now carries the summaries (`specs/*/task-*-summary.md`) in place of `docs/specs/`. **Over-credit correction folded in**: my run-1 signature on this row credited 5/5 when that rendering earned 4/5, because it dropped `docs/specs/` with nothing in its place. The re-authored rendering earns 5/5.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#mcp-practice-notes` (re-pointed; ROUTED)
> canonicalHash: sha256:64c55f317e18e344f8b476a9c73a8aff44b2ac4bca321671c415d779b2fa26f3
> renderedHash: sha256:a23f87e92eeb1a90a00e1225e67402ae35d28d2f3ed426f7648453390ac20ce6
> verdict: assent — surviving 5/5
>
> All five survive: `ground-truth-computed` ("your repo's own audit and test commands"), `product-mcp-caveat` ("early in a product it may return a sparse index") and `mcp-fallback` (`specs/**/completion/`) re-grounded; the other two verbatim.

## `#ask-if-unsure`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#ask-if-unsure` (re-pointed; ROUTED)
canonicalHash: sha256:88270860692bc1f9fd962527d4132c79951301a4de895af5c3ef0e29bd279ff0
renderedHash: sha256:75bc336d4c478ec0cab2d16bb07f8b09d39f76462d6a36d8b8f72d63243f06ad
verdict: assent — surviving 1/1

Re-pointing "Peter" → "your human lead" carries the same obligation.

## `#what-you-dont-own`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#what-you-dont-own` (re-pointed; ROUTED)
canonicalHash: sha256:4108acaf8110eaee5e9ea615b318c75057946bf2fec0bf903da6d49b9aa6dcab
renderedHash: sha256:f7a1b9a373ca6dd943a702f712f74b960abfcd1512a330747bc3a5cb6c24228e
verdict: assent — surviving 3/4; not surviving: `jest-not-vitest`

The three ownership lines survive. `jest-not-vitest` is this repo's runner; the re-grounding ("run your repo's own audit and test scripts … package.json") is its consumer counterpart.

## `#frontmatter:routes.docs[completion-doc-guidance]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `routes.docs[completion-doc-guidance]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:a8aedb1dfe5141050c1a5959aef0079056d721bf98d2c00859a7de26cc0d87a5
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.docs[dev-workflow-detail]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `routes.docs[dev-workflow-detail]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:d8dd2983f526c61544653aadb9ecf807db5d8fcdbf9411d7551285f519deaeb8
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.docs[file-organization]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `routes.docs[file-organization]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:da2bab5d14c97b35a5a877205a97b280e1000b038fa96836ae08a2853ef35df7
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:routes.docs[completion-docs-beyond]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `routes.docs[completion-docs-beyond]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:02e17c6a786cd83d402b3a6d06d750964f9fd6f0cd5c378fa4bf8ce2482357d6
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own process-doc route: a DesignerPunk process doc for DesignerPunk's own workflow. A consumer's process lives in its own docs, which the served corpus does not hold. I assent that nothing survives.

## `#frontmatter:commands[audit-coverage-map]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[audit-coverage-map]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:f2b4a2b4460cb65ec913cce1dfcc114cd8d088875b46dbd44efd3774417d9ff4
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[audit-mode-parity]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[audit-mode-parity]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:523e31268c72df1ff47bdf49cc4716075cf18a4c051c8631791360aa616c149c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[audit-theme-drift]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[audit-theme-drift]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:9aaaa44f6bce04f642cd94be71760ae2e4a455e522820b6f18ef54a82edf42e9
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[test-coverage]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[test-coverage]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:6492eef872eb13e233ab9bbdd76e098de2dd13bd9a126b395d174e15969cc2cf
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[governance-health-check]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[governance-health-check]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:b2b4620fd8fc7de85d014492886972c2af130419693bcf8b29b9b2f6e0ad6e7c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:commands[verify-gate-registration]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[verify-gate-registration]` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:194b68857ae054e223dd422e53d04e7abb2ee5e9f5363f1411f882431b03e7af
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own command (`runContext: this-repo`). A consumer's equivalent is unknown at render time, and the body's re-grounding sends the agent to its own `package.json`. I assent that nothing survives.

## `#frontmatter:knowledgeBases[spec-summaries]`

signer: stacy
date: 2026-10-12
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `knowledgeBases[spec-summaries]` (re-pointed)
canonicalHash: sha256:01a07255b7a58397accf345c80ca08042755cd10b81e688a5c49a64baa572212
renderedHash: sha256:f262fe273f3f18f7565406721cb2a3c34d3353a73370a0fc36029a5905390b18
verdict: assent — surviving 0/0

**Re-signed 2026-10-12** (prior signature: assent 0/0, 2026-09-29, against rendered `sha256:1e34755a…`; the canonical hash is unchanged, `sha256:01a07255…`). The row is stale because the Kiro target now renders glob-only knowledge bases in the prompt (Spec 123 Task 29.3, Peter's ruling (A) on the 29.0 fork), so this entry gained a second rendered line. The canonical entry, the overlay and the disposition did not change.
- **Judged against** the rendered lines, read in this session from `canonical/_consumer-output/` at this revision:
  - `cc/.claude/agents/stacy.md` L794: `- spec-summaries: search these paths with Grep/Glob: specs/*/task-*-summary.md` (unchanged);
  - `kiro/.kiro/agents/stacy-prompt.md` L404 (new): `- spec-summaries: search these paths: specs/*/task-*-summary.md`.
- **Assent stands, on the same ground as 2026-09-29.** The removal (`docs/specs/**`, `subtraction-4`) is applied in both lines; neither contains it. The path states the summary location a consumer's task-completion protocol names (`specs/[spec]/task-N-summary.md`, `canonical/_consumer-output/cc/.claude/identity/designerpunk-task-completion-protocol.md` L33, L41), so the new Kiro line is as true as the cc line. The Kiro line omits "with Grep/Glob", which is right: Kiro names no search tool. No operative items attach to this entry, so surviving stays 0/0.
- **The steward leg** (`.kiro/agents/stacy-prompt.md` L431: `docs/specs/**`) is DesignerPunk's own repo, outside this row. It is stated only because it changed in the same regeneration.
- **Disclosure (Peter's trigger-(d) sample):** this is a Stacy-signed row moved by the cycle-2 fix, and the fix's verdict is also mine. Peter samples this act, not me. It is the only row on the branch's stale list after 29.3 (taken with `runFreshnessSweep`: 1 finding), so ceiling limb (iii) did not fire.

**Re-signed 2026-09-29, in the re-sign run** (prior signature: assent 0). Assent to the re-pointed entry: `docs/specs/**` → `specs/*/task-*-summary.md`. That is the summary location TCP's tier selection now names.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `knowledgeBases[spec-summaries]` (no-consumer-counterpart; no-consumer-counterpart)
> canonicalHash: sha256:01a07255b7a58397accf345c80ca08042755cd10b81e688a5c49a64baa572212
> renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
> verdict: assent — surviving 0/0
>
> No consumer counterpart, confirmed: this entry names this repo's own knowledge-base glob. I assent that nothing survives.

## `#frontmatter:writeScope[docs/specs/**]`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `writeScope[docs/specs/**]` (superseded-by)
canonicalHash: sha256:bc10d943438a0fa1a02e86c698d39f9b7882a42838f341886c89f3021c0e416c
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

**Re-signed 2026-09-29, in the re-sign run** (prior signature: assent 0). Assent to `superseded-by writeScope[.kiro/specs/**]`, which renders as `specs/**` and covers the summary location.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `writeScope[docs/specs/**]` (no-consumer-counterpart; no-consumer-counterpart)
> canonicalHash: sha256:bc10d943438a0fa1a02e86c698d39f9b7882a42838f341886c89f3021c0e416c
> renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
> verdict: assent — surviving 0/0
>
> No consumer counterpart, confirmed: this entry names this repo's own write path. I assent that nothing survives.

## `#frontmatter:writeScope[.kiro/issues/**]`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `writeScope[.kiro/issues/**]` (no-consumer-counterpart; first signature)
canonicalHash: sha256:da4495fd22d50dccd4d3a7df6a11f943bb2e7a4bb57d21ccb8131f388be1768f
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed; I agree with the disposition and the cite. **The cite applies (Req 11.6.5e's applicability test for bullets 1–4):** subtraction 3 removes our stewardship cadences and instruments as obligations, and this entry names one. `.kiro/issues/**` is this repo's issue-record convention:
- its README rules 1–9;
- the charter walk at this repo's monthly health check;
- rule 9's "an edit outside this rule is a claims-pass finding", which is one of our claims-pass events.

There is nothing to re-point to. `init` (`src/cli/init.ts`) creates no `.kiro/issues/`, the package's `files` ships none, and the consumer rendering grants no tracking-record scope for a re-keyed form to attach to. The cite is consistent with my own profile's earlier removal of the toolchain-charter issue path under `subtraction-3` (`#honest-reach-carried-so-you-never-inherit-an-over-claimed-instrument`), and with the same row in the other seven profiles. I assent that nothing survives. This is a Stacy-signed assent on my own row, so it falls in Peter's sample (C1 collapse seat).

## `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble` (re-pointed)
canonicalHash: sha256:b9f4104614bde7bf3dcf7fc95a316fa126266e2816cc636ddabc2a555d94ffb1
renderedHash: sha256:dbacc688d209f5bf91e8911730fc5d9714173d4613f0ee7e704e977fcf5cb760
verdict: assent — surviving 1/1

**Re-signed 2026-09-29, in the re-sign run** (prior signature: refuse). **Refusal resolved.** `authority-precedence` now survives, re-grounded to the team's recorded decision.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble` (re-pointed; ROUTED)
> canonicalHash: sha256:b9f4104614bde7bf3dcf7fc95a316fa126266e2816cc636ddabc2a555d94ffb1
> renderedHash: sha256:62fd761373b55d6c61af941dadd08c48b662f4b5edb1572607b6fee1d268d579
> verdict: refuse: should-re-point
>
> `authority-precedence` has a consumer counterpart, and the rendering drops it. The rendering names the authority (the team's own recorded decision, on whose date the owed-set query keys) but not its precedence over this text. **Should re-point**: where this text and the recorded decision disagree, the decision governs. This is the same finding as consumer-Thurgood's Q5 preamble.

## `#the-trigger-set-the-114-superset-table-names-never-numbers`

signer: stacy
date: 2026-10-21
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-trigger-set-the-114-superset-table-names-never-numbers` (re-pointed)
canonicalHash: sha256:17ef45beb34513cb4d848de44544358d44ad5d99e13791e56b8f8b522cb5ca12
renderedHash: sha256:06dac47155245fbe852af23fa84f35bba0a952826efbf07c9d602b2e622501b5
verdict: assent — surviving 5/13; not surviving: `trigger-lens`, `trigger-release`, `trigger-closeout`, `trigger-arming`, `trigger-gate`, `trigger-straggler`, `trigger-liveness`, `trigger-burst`

**Re-signed 2026-10-21** (prior signature: assent 5/13, 2026-10-20, against `sha256:ad17a9e68ed401c046c11a9917f9b1059f7a112aade4ba8accf98dc65fb5fcca`). Stale because the canonical ARMING and LIVENESS rows changed: ballot `2026-10-20-grant-ci-deletions-and-activating-merge-read` (RATIFIED, Peter, 2026-10-20) § 2 A-1 (the `**Deleted lines**:` block read, the `**Grant activation read**:` marker, the quoted-deleted-lines clause) and A-2 (the LIVENESS row's grant-activation sentence). They are my text; Thurgood applied them byte for byte (`3978fdfb0`; I checked the whole-file byte identity against the ballot, `17702702b`), I re-confirmed the set at 13 items (`17702702b`), and he pinned the overlay and regenerated (`77ea79b0d`). the rendering did not change: renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/_tmp_render.ts`), 113 of 113 consumer-output files byte-identical to the committed tree, equal to the prior signature's value.
- **Judged against**: the rendered unit at this revision and the operative set at 13 items.
- **The ARMING removal still applies, under `subtraction-3`, and both A-1 replacements are removed with it.** The deleted-lines read audits a DesignerPunk grant record's `**Deleted lines**:` block and `**Grant activation read**:` marker against `.github/**` CI paths under the issue-row grant standing scope; a consumer repo has none. The removal text reproduces the whole new row (checked: it equals the canonical line, one occurrence). The consumer output carries no ARMING row (the grep for `Grant activation read`, `Deleted lines` and `issues-owned` over the fresh and committed rendering returns 0). No refusal follows.
- **The LIVENESS row's new sentence is not carried, and `trigger-liveness` stays not credited**: the rendered row ends at "Events without records = finding."; it names no grant-activation read, because a consumer has no `.kiro/issues/` grants and no Thurgood item 4 to read (his `#trigger-types`, signed below, removes it). This is the same ground on which the active-charter walk was already absent from the row. Nothing in the consumer rendering is contradicted by the omission; the item was already not entailed whole.
- **Unchanged from the 2026-10-20 signature**: LENS, RELEASE, CLOSEOUT, ARMING, GATE, STRAGGLER, LIVENESS and BURST are not credited. `trigger-symptom`, `trigger-midpoint`, `trigger-education`, `finding-routing` and `merge-path-status` survive, each verbatim in the rendering. Surviving count: 5 of 13.
- **C1 collapse**: I signed this assent on my own charter's row, so it falls in Peter's sample.

**Prior signature record (superseded, 2026-10-20)**:

> signer: stacy
> date: 2026-10-20
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-trigger-set-the-114-superset-table-names-never-numbers` (re-pointed)
> canonicalHash: sha256:ad17a9e68ed401c046c11a9917f9b1059f7a112aade4ba8accf98dc65fb5fcca
> renderedHash: sha256:06dac47155245fbe852af23fa84f35bba0a952826efbf07c9d602b2e622501b5
> verdict: assent — surviving 5/13; not surviving: `trigger-lens`, `trigger-release`, `trigger-closeout`, `trigger-arming`, `trigger-gate`, `trigger-straggler`, `trigger-liveness`, `trigger-burst`
>
> **Re-signed 2026-10-20** (prior signature: assent 5/13, 2026-10-19, against `sha256:bef1274f376dbc6f7c385f1341f0c40a84928d3cdf163a640539f436e442b1b0`). Stale because the canonical ARMING row changed: ballot `2026-10-20-in-lane-guard-registry-additive-entries` (P1b; RATIFIED, Peter, 2026-10-20) § 7 `[STACY R1]` item 3 added the `.github/in-lane-guards.json` event and the P1b read. I drafted both insertions; Thurgood applied them byte for byte at `ae68f130b` (I checked the byte identity against the ballot's fenced blocks), and I re-confirmed the set at 13 items (`8674be2e5`). He pinned the overlay, rewrote the ARMING removal's text to the new row and regenerated (`ebc83c6b5`). The rendering did not change: renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/tools-stacy/fresh-rendered-hash.ts`), equal to the committed rendering's value and to the prior signature's.
> - **Judged against**: the rendered unit at this revision and the operative set at 13 items.
> - **The ARMING removal still applies, under `subtraction-3`, and the P1b read is removed with it.** The read audits a PR against DesignerPunk's registry file, its additivity predicate (a ballot § 2 text consumers never receive), `EXPECTED_CONTEXTS` and the `lane-functional-root` check; a consumer verifier has none of them to run it against. The removal text reproduces the whole new row byte for byte (checked: it equals the canonical line). The consumer output carries no ARMING row (the grep for the registry path, P1b and the predicate returns 0). No refusal follows.
> - **The one I weighed**: the function, "a PR that adds a floor entry gets an additivity and does-it-bite read", is repo-independent in principle. But the consumer rendering carries no ARMING row to hang it on, and the read's whole input is a ballot predicate and a registry a consumer does not have. Re-pointing it would leave a fragment with no parent trigger. I record it as an observation for the next re-grounding of the ARMING row, as at the census signature, not as a refusal.
> - **Unchanged from the 2026-10-19 signature**: LENS, RELEASE, CLOSEOUT, ARMING, GATE, STRAGGLER, LIVENESS and BURST are not credited. `trigger-symptom`, `trigger-midpoint`, `trigger-education`, `finding-routing` and `merge-path-status` survive, each verbatim in the rendering.
> - **C1 collapse**: I signed this assent on my own charter's row, so it falls in Peter's sample.

**Prior signature record (superseded, 2026-10-19)**:

> signer: stacy
> date: 2026-10-19
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-trigger-set-the-114-superset-table-names-never-numbers` (re-pointed)
> canonicalHash: sha256:bef1274f376dbc6f7c385f1341f0c40a84928d3cdf163a640539f436e442b1b0
> renderedHash: sha256:06dac47155245fbe852af23fa84f35bba0a952826efbf07c9d602b2e622501b5
> verdict: assent — surviving 5/13; not surviving: `trigger-lens`, `trigger-release`, `trigger-closeout`, `trigger-arming`, `trigger-gate`, `trigger-straggler`, `trigger-liveness`, `trigger-burst`
>
> **Re-signed 2026-10-19** (prior signature: assent, 2026-10-18, against `sha256:ea4f4b52be0b5544d4721d485ae3b509839b271d376079158d8bca376b64a545`). Stale because the canonical ARMING row changed: ballot `2026-10-19-instrument-census-at-draft` (site 3) added the shipping-PR re-run read to the instrument-path clause. I drafted the sentence; Thurgood applied it byte for byte at `cd6ee604c`, and I re-confirmed the set at 13 items (`c4c9ef2f2`). Thurgood pinned the overlay and rewrote the ARMING removal's text to the new row, then regenerated (`c50bcbd51`). The rendering did not change: renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/r.ts`), equal to the committed rendering's value and to the prior signature's.
> - **Judged against**: the rendered unit at this revision and the operative set at 13 items.
> - **The ARMING removal still applies, under `subtraction-3`, and the new clause is removed with it.** The clause compares a ballot's scratch diff to the shipped code at the PR's base, reading the ballot's `## Census appendix`; consumers adopt no ballots and no instrument census, so there is nothing for a consumer verifier to run it against. The removal text reproduces the whole new row byte for byte. No refusal follows.
> - **The one I weighed**: the function, "a change a ballot's census ruled on gets a re-run at the shipping PR", is repo-independent in principle. But the consumer rendering carries no ARMING row at all, and the clause's whole input is a census appendix a consumer does not produce. Re-pointing it would leave a fragment with no parent trigger and nothing to read. I am recording it as an observation for the next re-grounding of the ARMING row, not as a refusal.
> - **Unchanged from the 2026-10-18 signature**: LENS, RELEASE, CLOSEOUT, ARMING, GATE, STRAGGLER, LIVENESS and BURST are not credited. `trigger-symptom`, `trigger-midpoint`, `trigger-education`, `finding-routing` and `merge-path-status` survive, each verbatim in the rendering.
> - **C1 collapse**: I signed this assent on my own charter's row, so it falls in Peter's sample.

**Prior signature record (superseded, 2026-10-18)**:

> signer: stacy
> date: 2026-10-18
> canonicalHash: sha256:ea4f4b52be0b5544d4721d485ae3b509839b271d376079158d8bca376b64a545
> renderedHash: sha256:06dac47155245fbe852af23fa84f35bba0a952826efbf07c9d602b2e622501b5
> verdict: assent — surviving 5/13; not surviving: `trigger-lens`, `trigger-release`, `trigger-closeout`, `trigger-arming`, `trigger-gate`, `trigger-straggler`, `trigger-liveness`, `trigger-burst`
>
> **Re-signed 2026-10-18** (prior signature: assent, 2026-10-17, against `sha256:aa674a01…`). Stale because the canonical RELEASE row changed: ballot `2026-10-18-obligation-drain-and-release-falsity-floor` § 7 (M7) puts the `release-falsity-floor` read in my RELEASE row's phase 1. I drafted the sentence; Thurgood applied it byte for byte at `9072db1ed`, and I re-confirmed the set at 13 items (`9bbd83d1b`). The rendering did not change: renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/tools-stacy/fresh-rendered-hash.ts`), equal to the committed rendering's value and to the prior signature's.
> - **Judged against**: the rendered unit at this revision and the operative set at 13 items.
> - **The new sentence is removed under `subtraction-3`** (Thurgood inserted the removal after the phase-2 one at `e09d2842e`, as I decided). Every part of it is keyed to this repo's release instruments: the walk record at `.kiro/issues/<date>-release-<V>-walk.md` and RELEASE-FLOW item 3a, its `main at:` SHA and greps, the floor-class rows of ballot M7, the walk PR's `mergedAt`, and the release squash S.
> - **The one I weighed**: the function, "before a release, re-check every claim known to be false at the surface where its reader meets it, and carry none without the human lead's dated word", is repo-independent in principle. But the consumer RELEASE row carries no phase structure at all (the two-phase cell and the phase-2 sentence are removed under `subtraction-3` since 2026-10-03), and the read's whole input is the walk record, which a consumer does not produce. Re-pointing the sentence would leave a read with nothing to read. I am recording it as an observation for the next re-grounding of the RELEASE row, not as a refusal.
> - **`trigger-release` is still not credited**, as before; the new sentence adds one more uncredited clause to it.
> - **Unchanged from the 2026-10-17 signature**: LENS, RELEASE, CLOSEOUT, ARMING, GATE, STRAGGLER, LIVENESS and BURST are not credited. `trigger-symptom`, `trigger-midpoint`, `trigger-education`, `finding-routing` and `merge-path-status` survive, each verbatim in the rendering.
> - **C1 collapse**: I signed this assent on my own charter's row, so it falls in Peter's sample.

**Prior signature record (superseded, 2026-10-17)**:

> signer: stacy
> date: 2026-10-17
> canonicalHash: sha256:aa674a0127352f1c012ddfd8f8d9742d7470063ed604415526f83de6e8056d1c
> renderedHash: sha256:06dac47155245fbe852af23fa84f35bba0a952826efbf07c9d602b2e622501b5
> verdict: assent — surviving 5/13

**Re-signed 2026-10-17** (prior signature: assent, 2026-10-03, against `sha256:eb7326f4…`). Stale because the canonical ARMING row changed: edit site 5a of ballot `2026-10-17-standing-write-scope-six-roots` added the § 3 item 4 instrument-change trigger, applied verbatim by Thurgood at `2c8e448ff`. The rendering did not change: renderedHash recomputed at this revision, equal to the prior signature's, and the consumer rendering at `canonical/_consumer-output/_canonical/agents/stacy.md` carries no ARMING row.
- **Judged against**: the rendered unit at this revision and the operative set re-confirmed at 13 items (`ce4ead62e`).
- **The ARMING removal still applies, under `subtraction-3`.** The removal text was updated to the new row byte for byte, and it reproduces the whole row. Every new clause is keyed to this repo's instruments: the § 4 B checker files, the completion-claims checker, `verify-gate-registration.sh` and `EXPECTED_CONTEXTS`, the steward-verb tool files and their tests, and the register row's known gap. Those are our instruments as obligations. No refusal follows.
- **The one I weighed**: the function under the new clause, "a change to a gate instrument that leaves the required-check set unchanged gets a post-acceptance read", is repo-independent in principle. But the consumer rendering carries no ARMING row at all, because every barrier read in it names this repo's gate. Re-pointing this one clause would leave a fragment with no parent trigger. I am recording it as an observation for the next re-grounding of the ARMING row, not as a refusal.
- **Unchanged from the 2026-10-03 signature**: LENS, RELEASE, CLOSEOUT, ARMING, GATE, STRAGGLER, LIVENESS and BURST are not credited. `trigger-symptom`, `trigger-midpoint`, `trigger-education`, `finding-routing` and `merge-path-status` survive, each verbatim in the rendering.
- **C1 collapse**: I signed this assent on my own charter's row, so it falls in Peter's sample.

**Prior signature record (superseded, 2026-10-03)**:

> signer: stacy
> date: 2026-10-03
> canonicalHash: sha256:eb7326f4705918216be6d929ec192f58cd092d82110ee7fcb2c9b29eb07f3b1a
> renderedHash: sha256:06dac47155245fbe852af23fa84f35bba0a952826efbf07c9d602b2e622501b5
> verdict: assent — surviving 5/13

**Re-signed 2026-10-03** (prior signature: assent, 2026-09-29, against `sha256:5055f134…`). Stale because the canonical RELEASE row changed (ballot `2026-10-03-hermetic-publish-path` § 5 item 6 (2a), canonical commit `59e2b7ff`); the rendering did not change (renderedHash recomputed from `canonical/_consumer-output/` at this revision: unchanged).
- **Judged against**: the rendered unit at this revision and the operative set re-confirmed at 13 items (`e8924318`).
- **The two new removals, both `subtraction-3`, apply.** The two-phase event cell and the phase-2 scope sentence (with its F-2 clause) are keyed to this repo's release instruments: the release squash S and the tag, the step-6 release-record PR, the two-registry record and the publish script's recorded sha1, and the `publish-rail liveness: owed` record state. They are our release cadence and instruments as obligations. A consumer's release flow has no step-6 record to read, so there is no consumer counterpart to re-point to, and no refusal follows. The consumer RELEASE row keeps the release-delta claims pass and the owed-set paste, which is the repo-independent function.
- **`trigger-release` is still not credited**: its canonical text now carries the two-phase form as well as the Q2 guard, and neither is stated or entailed by the rendered row.
- **Consistency across the pair**: consumer-Thurgood's LIVENESS read carries no two-phase completeness test either (its new sentence is removed under `subtraction-3`; see `signatures/thurgood.md` `#trigger-types`), so the two renderings agree on what a consumer RELEASE record is.
- Unchanged from the 2026-09-29 signature: LENS (its M4 and retire-to-emissions clauses), CLOSEOUT (rider (a)), ARMING, GATE, STRAGGLER, LIVENESS (the charter walk) and BURST are not credited; surviving `trigger-symptom`, `trigger-midpoint`, `trigger-education`, `finding-routing`, `merge-path-status` (each verbatim in the rendering).
- **History**: an earlier seat signed the same verdict on PR #284 (`9a701b70`, closed, kept at `refs/pull/284/head`). This act is taken afresh and stands on its own.

**Prior signature record (superseded, 2026-09-29)**:

> signer: stacy
> date: 2026-09-29
> canonicalHash: sha256:5055f134c5a6c6fc5ecd2f499d3eb428ff14a0679946152f88e630c0c8de3d7a
> renderedHash: sha256:06dac47155245fbe852af23fa84f35bba0a952826efbf07c9d602b2e622501b5
> verdict: assent — surviving 5/13

**Re-signed 2026-09-29, in the re-sign run** (prior signature: refuse). **Refusal resolved.** The LENS row now carries the five verifiability questions inline, plus question 6.
- **`trigger-lens` is still not credited** under the crediting rule (run-2 summary): its M4 plan-time clause and its retire-to-emissions clause are dropped with nothing in their place. Both are keyed to this repo's instruments parser, so there is no consumer counterpart to re-point to, and no refusal follows.
- The other drops are unchanged from run 1: RELEASE (its Q2 guard), CLOSEOUT (rider (a)), ARMING, GATE, STRAGGLER, LIVENESS (the charter walk) and BURST.
- Surviving: `trigger-symptom`, `trigger-midpoint`, `trigger-education`, `finding-routing`, `merge-path-status`.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-trigger-set-the-114-superset-table-names-never-numbers` (re-pointed; ROUTED)
> canonicalHash: sha256:5055f134c5a6c6fc5ecd2f499d3eb428ff14a0679946152f88e630c0c8de3d7a
> renderedHash: sha256:9125e2b3608732006279ff89016052966e29a4b5a28369c25aba788f78e472fe
> verdict: refuse: should-re-point
>
> The LENS row (`trigger-lens`) keeps question 6 but replaces the **five verifiability questions** with one summary ("can each criterion be verified from the repo"). The five questions are: a criteria set exists; evidence of a named kind could exist; some state of the world reads UNMET; "met" is decidable without the author; and the task text promises no artifact the criteria do not cover. They are repo-independent and they are the seat's content. Only the pointer to the lifecycle amendment is repo-bound. **Should re-point**: carry the five questions inline. For the record, the rest of the unit would assent at `trigger-symptom`, `trigger-midpoint`, `trigger-education`, `finding-routing` and `merge-path-status` (5/13). Not surviving would be RELEASE (its Q2 guard), CLOSEOUT (the rider-(a) discharge), ARMING, GATE, STRAGGLER, LIVENESS (the charter walk) and BURST, all repo-bound.

## `#the-steward-verb-carve-out-his-side-of-the-seam-enumerated-never-a-live-config-reference`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-steward-verb-carve-out-his-side-of-the-seam-enumerated-never-a-live-config-reference` (re-pointed)
canonicalHash: sha256:5ee037e6fcbfad1bfb0b13161645ec5942657afd355a34ed6a9cc65d8fa3577a
renderedHash: sha256:f960597172711b89e2548d4dbf51a86ebb87d2dabad202c4ca9b49e0418ca42d
verdict: assent — surviving 2/5; not surviving: `carve-out-scope`, `carve-out-falsification`, `carve-out-no-silent-rescope`

**Re-signed 2026-09-29, in the re-sign run** (prior signature: refuse). **Refusal resolved, by a changed disposition** (no-consumer-counterpart → re-pointed). The routing test and the tiebreak now survive verbatim. The verb enumeration, its falsification conditions and the re-scope clause are repo-bound, and they are dropped. Non-blocking, for Thurgood: the unit's heading still reads "The steward-verb carve-out (… enumerated …)" over content that no longer enumerates anything.

**Prior signature record (superseded)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/stacy.dispositions.yaml` · body · `#the-steward-verb-carve-out-his-side-of-the-seam-enumerated-never-a-live-config-reference` (no-consumer-counterpart; no-consumer-counterpart)
> canonicalHash: sha256:5ee037e6fcbfad1bfb0b13161645ec5942657afd355a34ed6a9cc65d8fa3577a
> renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
> verdict: refuse: should-re-point
>
> `no-consumer-counterpart` is not true of the whole unit. The steward-verb enumeration and its two falsification conditions are repo-bound, because a consumer does not steward DesignerPunk's docs corpus. But `carve-out-routing-test` ("was this claim verified?" → Stacy; "what must a completion doc contain?" → Thurgood) and `carve-out-tiebreak` (ambiguity resolves to Stacy, the seam fails toward the verifier) are the seam's arbitration, and a consumer's Stacy/Thurgood pair has the same seam. **Should re-point**: keep the routing test and the tiebreak, and drop the verb enumeration.

## `#frontmatter:commands[owed-set]`

signer: stacy
date: 2026-10-23
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `commands[owed-set]` (re-pointed; first signature)
canonicalHash: sha256:c94626b6c44d7bc48d98e8e945231e581850c0107dffb5804bb340c2f76a416f
renderedHash: sha256:7f0f754998d77cbe09f875f8ddce55a27e431ba2226d1adc184cac7e77fafbad
verdict: assent — surviving 0/0

**FIRST SIGNATURE 2026-10-23 - ASSENT to `re-pointed` (`surviving: []`).** The row was routed (`re-pointed-entry`) with no signature; this is its first. It is the entry I authored in #439 and said I would sign once the routes floor made it routed (see the owed-set unit's 2026-10-22 re-sign, "`commands[owed-set]` is not signed in this act").
- Canonical: `cmd: ./scripts/owed-set.sh`, `runContext: this-repo`. Consumer: `cmd: bash node_modules/@3fn/core/scripts/owed-set.sh --specs-dir specs`, `runContext: consumer-repo`; the cue drops "since ratification" for "since adoption", which is the consumer's boundary.
- **Checked against the script's output, not the rendering alone.** `package.json` `files` ships `scripts/owed-set.sh` and the package is `@3fn/core`, so `node_modules/@3fn/core/scripts/owed-set.sh` resolves in an install. I built a scratch consumer repo (a committed `designerpunk.manifest.json`, `specs/001-a/` with `tasks.md` and a completion doc, `specs/002-b/`; the shipped script copied to `node_modules/@3fn/core/scripts/`) and ran the exact rendered command: exit 0; two `candidate` rows (classes b and c); count line `owed-set: 2 candidates; excluded: 0 closed, 0 open, 0 stub, 0 touch-only; classes a/b/c = 0/1/1; 0 specs without activity since 2026-10-23; adoption 2026-10-23 from designerpunk.manifest.json (first commit); ref bab9898`. Row-sum identity holds (2 = 2 + 0). The rendered cue (rows classed candidate / closed / open / stub / touch-only, then a count line whose row-sum identity is read first, candidates not verdicts) describes that output.
- `--specs-dir specs` matches the rendered spec root (`specs/[spec]/completion/...` in the rendered Task Completion Protocol), and "run from your product repo" (rendered at the Commands line) matches the script's own contract (relative to the current directory, inside the repository).
- Frontmatter entry with no operative items, so `surviving: []` is the itemized form. Hash covers the rendered Commands line in the cc agent and the kiro prompt.

## `#frontmatter:knowledgeBases[completion-docs]`

signer: stacy
date: 2026-10-23
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `knowledgeBases[completion-docs]` (re-pointed; first signature)
canonicalHash: sha256:82c776bcd02ee331d0598bb4c3b70cf504945269bdc6bbb44ffab2e0bcfb06c0
renderedHash: sha256:e07af49a954f79a49c71447c8d66b153ae8d6682aa9199aab51a35af12d4c6f3
verdict: assent — surviving 0/0

**FIRST SIGNATURE 2026-10-23 - ASSENT to `re-pointed` (`surviving: []`).** The row was routed (`re-pointed-entry`) with no signature; this is its first.
- Canonical glob `.kiro/specs/*/completion/**`; consumer glob `specs/*/completion/**`. The glob names the consumer's own repository path, not a file the package must ship, so `package.json` `files` does not apply to it (`spec-summaries`, `specs/*/task-*-summary.md`, was signed on the same footing). The consumer's rendered Task Completion Protocol puts parent and subtask completion docs at `specs/[spec]/completion/task-N-completion.md` and `task-N-M-completion.md`, which this glob matches, and the rendered claims-pass record path reads `<your specs dir>/<spec>/completion/claims-pass.md`, which it also matches.
- The rendered knowledge-base line reads "completion-docs: search these paths with Grep/Glob: specs/*/completion/**". Function survives: the role still has a named place to search for completion docs.
- Frontmatter entry with no operative items, so `surviving: []` is the itemized form.

## `#frontmatter:writeScope[.kiro/specs/**]`

signer: stacy
date: 2026-10-23
row: `canonical/profiles/consumer/stacy.dispositions.yaml` · frontmatter · `writeScope[.kiro/specs/**]` (re-pointed; first signature)
canonicalHash: sha256:76dd995bd46d11ee5ec9766b1f42ecc7ef522b514bdab8deb009d3c916fc26b3
renderedHash: sha256:10c4bda47e82a1de6ad1bbd4bf50cabf60da7d49e5faa755f370a7c6745462cd
verdict: assent — surviving 0/0

**FIRST SIGNATURE 2026-10-23 - ASSENT to `re-pointed` (`surviving: []`).** The row was routed (`re-pointed-entry`) with no signature; this is its first.
- `.kiro/specs/**` re-points to `specs/**`. The consumer repo has no `.kiro/` spec tree; the rendered Task Completion Protocol puts completion docs at `specs/[spec]/completion/...` and summary docs at `specs/[spec]/task-N-summary.md`, so `specs/**` is the consumer's spec root and covers where I write claims-pass records and lessons.
- My rendered write scope is `specs/**` alone: cc `stacy.md` "Write scope" lists one path, and `kiro/.kiro/agents/stacy.json` `toolsSettings.write.allowedPaths` is `["specs/**"]`. Judged from my own rendering, nothing widens the seat; the value is the one Ada, Data, Kenya, Leonardo, Lina and Sparky signed.
- `writeScope[docs/specs/**]` is already `superseded-by` this entry (signed by me), so one rendered entry carries both canonical paths. `writeScope[.kiro/issues/**]` stays `no-consumer-counterpart`.
- Frontmatter entry with no operative items, so `surviving: []` is the itemized form.

## Signing run summary (2026-09-29, phase two, run 1)

**Scope**: this run covers three dispositions files, 76 rows in all:
- consumer-Thurgood's rows in `thurgood.dispositions.yaml` (45; C1 carve-out);
- my own rows in `stacy.dispositions.yaml` (30; owner seat, with Peter sampling per F-3 (ii));
- the shared member `complete-task-tooling` in `_shared.dispositions.yaml` (1).

The identity docs under `always-set/` are run 2.

**Commits**, all `Agent: stacy`:

| Commit | Content |
|---|---|
| `bf07801a` | Thurgood, 44 assents |
| `c8bf23ee` | Thurgood refusal: Q5 preamble |
| `f85e9e17` | Stacy, 27 assents |
| `98bc13bc` | Stacy refusal: claims-audit preamble |
| `d0cb4203` | Stacy refusal: trigger set |
| `d4dfe030` | Stacy refusal: steward-verb carve-out |
| `8ddd4b1b` | `_shared`, 1 assent |
| the commit carrying this section | this summary |

**Referent widening**: none this run. The candidates the sheet lists for my two records are the ones I already ruled on in phase one, run 1 (in `confirmations/stacy.md`: left as drafted where widening would contain a sibling item, widened where it would not). The identity-doc candidates belong to run 2.

**Assented routed rows** (surviving / items):
- **Thurgood**:

  | Unit | Surviving |
  |---|---|
  | `#identity` | 5/5 |
  | `#in-scope` | 19/20 |
  | `#boundary-cases` | 3/3 |
  | spec-formalization `:preamble` | 1/1 |
  | `#spec-formalization-is-not-autonomous` | 2/2 |
  | audit `:preamble` | 1/1 |
  | `#step-2-gather-evidence` | 6/7 |
  | `#step-5-…` | 4/4 |
  | `#operational-mode-test-governance` | 5/5 |
  | `#resolution-path-…` | 3/3 |
  | `#trigger-types` | 11/20 |
  | `#steering-doc-lifecycle` | 4/4 |
  | `#the-charter-cut-…` | 2/4 |
  | `#the-composed-learning-loop-…` | 5/5 |
  | `#the-three-boundary-bounds-…` | 5/5 |
  | `#trust-by-default` | 3/3 |
  | `#obligation-to-flag` | 4/4 |
  | `#graceful-correction` | 3/3 |
  | `#the-process` | 4/4 |
  | `#what-this-means-in-practice` | 5/5 |
  | `#mcp-practice-notes` | 3/5 |
  | `#when-you-and-peter-disagree` | 1/1 |
  | `#what-you-dont-own` | 4/5 |

  **103/119 across 23 rows.**
- **Stacy**:

  | Unit | Surviving |
  |---|---|
  | `#identity` | 11/11 |
  | `#in-scope` | 8/10 |
  | `#out-of-scope` | 6/7 |
  | process-audit `:preamble` | 1/1 |
  | `#the-charter-cut-…` | 2/2 |
  | **`#the-claims-pass-record-…`** | **18/31** |
  | `#the-owed-set-pipeline-…` | 14/14 |
  | `#honest-reach-…` | 4/4 |
  | `#your-role` | 7/7 |
  | `#what-you-dont-do` | 3/3 |
  | `#with-thurgood-…` | 5/5 |
  | `#with-peter` | 3/4 |
  | `#mcp-practice-notes` | 5/5 |
  | `#ask-if-unsure` | 1/1 |
  | `#what-you-dont-own` | 3/4 |

  **91/109 across 15 rows.**
- The item ids not surviving, and the reason for each, are in each row's block above.

**Assented no-consumer-counterpart rows**, each `surviving: []`: Thurgood 21, Stacy 12, `_shared` 1.

**Refused rows**, each `refuse: should-re-point` in its own commit:
1. **Thurgood `#the-q5-boundary-…:preamble`** (routed): `authority-precedence` is dropped. The rendering names the team's recorded decision but not its precedence over this text.
2. **Stacy `#operational-mode-claims-audit-…:preamble`** (routed): the same finding.
3. **Stacy `#the-trigger-set-…`** (routed): the LENS row loses the five repo-independent verifiability questions; question 6 is kept. The rest of the unit would assent at 5/13.
4. **Stacy `#the-steward-verb-carve-out-…`** (no-consumer-counterpart): the routing test and the tiebreak toward the verifier are seam rules with a consumer counterpart. Only the verb enumeration and its falsification conditions are repo-bound.

**The tally, for the first-render block of B-U2 M1.** Signer: stacy. All of this is first render, and none of it is a baseline.

| Count | Value |
|---|---|
| Signature events | **76** |
| Assent events | **72** |
| Refusal events | **4** (3 on routed rows, 1 on a no-consumer-counterpart row) |
| **Assent rate on routed rows** (assent events / signature events) | **38/41** |
| Surviving / items over the 38 routed assents | **194/228** |
| Full-survival assents (every item surviving), counted by hand | **27/38** (Thurgood 17, Stacy 10) |
| No-consumer-counterpart signatures | 35 (34 assent, 1 refusal) |
| Rows signed on my own charter (self-audit, disclosed) | 30: 15 routed assents, 12 no-consumer-counterpart assents, 3 refusals |

- The full-survival count is informational. The instrumented signal remains `not yet instrumented`.
- Of the 27 full-survival assents, most are single substitutions ("Peter" → "your human lead") on small item sets. Two are item-by-item re-groundings: `#the-owed-set-pipeline-…` and `#honest-reach-…`.
- **Peter's sample of my own rows**: 0 / 30 at this commit. It is written here, not omitted (F-3 (ii)).
- Every refusal is a committed signature, so the refusal count is traceable in history (C3).

**Residuals**:
- **The counting-block unit.** The brief expected its rendering to carry the B-U2 items. I read those items as having no consumer counterpart, because consumer repos hold no consumer-profile dispositions, signatures or render populations. So I assented without them (18/31). If Peter or Thurgood reads it otherwise, that row is the place to re-judge.
- **Removal accounting (non-blocking, for Thurgood).** In that same row, the removals list names "**fixed-string exemption usage**" as removed. The rendering actually re-grounds it ("exemption usage … counted per waiver"), and I credited `counting-4`.
- **Judgment calls another signer could make differently**:
  - `evidence-dir-4` not credited (the rendering's grouping names no validators);
  - `counting-4` credited as re-grounded;
  - consumer-Thurgood `#trigger-types`: the owed-set items not credited in that unit, because they live in consumer-Stacy's unit;
  - `scope-12` removal accepted: the consumer gets no CI scope, which is stricter.
- **Each refused row must be re-judged in full at its re-sign.** No itemized set is carried over from the refusal.
- **No-consumer-counterpart signatures pin the empty-rendering hash**, so any future rendering of those entries stales them by design.

## Signing run summary (2026-09-29, phase two, run 2)

**Scope**: every routed row in the eight identity-doc dispositions files under `canonical/profiles/consumer/always-set/`, **30 rows**, all routed. No identity-doc row is disposed no-consumer-counterpart. The evidence notes are `canonical/profiles/consumer/signatures/<doc>.md`, which is the path each row's `evidence:` names and the one the sweep resolves.

**Commits**, all `Agent: stacy`:

| Commit | Content |
|---|---|
| `1eaf1f3b` | core-goals |
| `3af8e7ea` | ai-collaboration-principles |
| `a5653308` | spec-feedback-protocol |
| `4957ea91` | start-up-tasks |
| `c92bc0a8` | agent-directory |
| `c46291e2` | civitas-system-overview |
| `d9aff75e` | task-completion-protocol, 10 assents |
| `0115e4c3` | REFUSE: TCP completion-state |
| `cbd8d44a` | REFUSE: TCP tier-selection |
| the commit carrying this section | this summary |

**Referent widening**: none. I read all eight candidates the sheet lists, and in each, widening to carry the referent would contain a sibling item:
- AICP `provide` (it would contain the fold steps) and `calibrate-2` (the three responses);
- SFP `sequential-formalization-1` (the three steps) and `stamp-format-1` (`stamp-pattern`);
- Start Up Tasks `hc-1` (`hc-2`, in an 11.3 unit), `first-ask-whether` and `delegation-and-model-2` (the tier items).

The `document-access-1` items, in Civitas and SFP, are the known false positive: "This" refers to the document itself.

**The crediting rule, stated once** (it sharpens run 1's wording):
- An item is credited when each of its operative parts is stated in its unit's own rendering, or replaced there by its consumer counterpart (a path re-rooted, "Peter" → "your human lead", a tool replaced by the act).
- An operative part dropped **with nothing in its place** means the item is not credited, whether or not the dropped part was repo-bound.
- Non-operative parts (history, dates, examples, rationale) never block credit.

**Assented rows** (surviving / items):

| Doc | Unit | Surviving |
|---|---|---|
| core-goals | `#core-project-context` | 8/8 |
| core-goals | `#development-practices` | 21/23 |
| AICP | `#counter-argument-requirement` | 6/6 |
| AICP | `#when-human-and-ai-disagree` | 4/4 |
| SFP | `#the-feedback-document` | 7/7 |
| SFP | `#sequential-formalization-gate` | 6/6 |
| SFP | `#document-access` | 2/2 |
| Start Up Tasks | health check (exemplar G/G′) | 4/4 |
| Start Up Tasks | Jest item | 3/12 |
| Start Up Tasks | test selection | 6/10 |
| Start Up Tasks | instruments item | 3/6 |
| Agent Directory | orchestrator | 9/9 |
| Agent Directory | Thurgood | 3/4 |
| Agent Directory | Stacy (describes my seat) | 2/3 |
| Agent Directory | human lead | 4/4 |
| Civitas | contains | 7/10 |
| Civitas | three-layer | 6/6 |
| Civitas | document-access | 2/2 |
| TCP | critical | 1/2 |
| TCP | subtasks | 4/5 |
| TCP | parent Impl/Arch | 5/8 |
| TCP | parent Setup/Doc | 5/8 |
| TCP | coherent units | 3/7 |
| TCP | branch cleanup | 3/4 |
| TCP | conventions | 5/6 |
| TCP | merge rule | 2/3 |
| TCP | emergency | 1/3 |
| TCP | key rules | 4/9 |

**136/181 across 28 rows.** The not-surviving ids, and the reason for each, are in each doc's note.

**Refused rows**, each `should-re-point` in its own commit:
1. **TCP `#completion-state-in-the-pr-flow:preamble`**. The spine survives at 13/22, but two generic rules are dropped:
   - updating a green-but-unmergeable branch from `main` (`-19`);
   - the stacked-PR protocol (the `Stacked-on:` declaration and base-first merge order; `-7`).
2. **TCP `#tier-selection-…`**: the parent summary doc's **location** is dropped with nothing in its place. A consumer's agent cannot comply decidably, and the parent sections inherit the gap.

**The M1 tally, cumulative through run 2.** Signer: stacy. First render, not a baseline.

| Count | Run 2 | Cumulative |
|---|---|---|
| Signature events | 30 | **106** |
| Assent events | 28 | **100** |
| Refusal events | 2 | **6** (5 on routed rows, 1 on a no-consumer-counterpart row) |
| Assent rate on routed rows | 28/30 | **66/71** |
| Surviving / items over routed assents | 136/181 | **330/409** |
| Full-survival assents, counted by hand | 11/28 | **38/66** |

- The full-survival counts are informational. The instrumented signal remains `not yet instrumented`.
- No-consumer-counterpart signatures are unchanged at 35 (34 assent, 1 refusal).
- Self-audit rows are unchanged at 30 (my own charter), plus Agent Directory's Stacy unit, which is a disclosed self-description.
- **Peter's sample of Stacy-signed rows**: 0 / 30, written here, not omitted.

**Residuals**:
- **A run-1 over-credit (the dangerous direction), under the rule stated above.** Stacy `#mcp-practice-notes` `mcp-fallback` was credited 5/5, but its knowledge-base glob drops `docs/specs/` with nothing in its place. It should read 4/5. I have not re-signed it here: that row is merged, a re-sign is a new signature event, and Thurgood is re-authoring the batch. It is recorded for his re-author pass and for Peter's sample.
- **A canonical tension, flagged to Thurgood.** Start Up Tasks #5 says a regular task runs `npm test`, the full functional lane. TCP's "For SUBTASKS" says targeted tests. The rendering follows TCP. I did not credit `test-command-selecti-2`, and I did not refuse the row either, because the tension is in the canonical docs, not in the re-grounding.
- **Heavy compression in TCP.** Several dropped clauses have consumer counterparts but did not reach the refusal bar: the never-overwrite rule, the forced-negative line, the unit-branch CI provenance, and "surviving any delegation" on the merge carve-out. They are recorded as not credited, and the per-row notes name each one. Another signer could reasonably refuse on those.
- **The counting-block read (run 1, 18/31)** stays as recorded. Per your note, I am not re-judging it unless Thurgood re-authors.

## Re-sign run summary (2026-09-29)

**Scope**: the 16 acts in my sheet's § 4 after Thurgood's re-author batch (`dba93df5`). Each row is re-judged in full against its new rendering and hashes.

**Commits**, all `Agent: stacy`:

| Commit | Content |
|---|---|
| `6d0d7ee7` | Thurgood, 4 |
| `ea5cab83` | Stacy, 6 |
| `6e9423a5` | TCP, 5 |
| `5116d069` | Civitas, 1 |
| the commit carrying this section | this summary |

Each re-signed row's evidence block is replaced in place, with its prior record kept below it as a quoted "superseded" history.

**Outcome: 16 assents, 0 refusals. All six of my refusals are resolved.**

| Row | Result | How |
|---|---|---|
| Thurgood Q5 preamble | 1/1 | itemized assent (precedence carried) |
| Stacy Q5 preamble | 1/1 | itemized assent |
| Stacy trigger set | 5/13 | itemized assent: the five LENS questions are carried inline. `trigger-lens` is still not credited under the crediting rule, because its M4 and retire-to-emissions clauses are dropped. Those are parser-keyed with no consumer counterpart, so there is no refusal. |
| Stacy steward-verb carve-out | 2/5 | changed disposition (no-consumer-counterpart → re-pointed) plus assent; the routing test and tiebreak survive |
| TCP completion-state | 15/22 | itemized assent (`-7` stacking protocol and `-19` unmergeable update carried) |
| TCP tier selection | 2/3 | itemized assent (summary location `specs/[spec]/task-N-summary.md`) |

**The other 10 rows**:
- Thurgood `#the-process`: 4/4.
- Stacy `#mcp-practice-notes`: 5/5. My run-1 over-credit (5/5 given where 4/5 was earned) is folded in; the re-authored fallback earns 5/5.
- TCP parent Impl/Arch 6/8 and Setup/Doc 6/8. `-4`, the summary path, now survives. `-7` is still not credited: CI provenance is restored, but the push and dispatch (and in Setup, the PR-at-unit timing) are dropped. `-3` is Thurgood's accepted subtraction.
- TCP merge rule: 3/3 ("survives any delegation" is restored).
- Civitas `#governance-processes`: 4/4, newly routed.
- Four assents to changed dispositions: Thurgood `commands[functional-suite]` → `superseded-by #what-you-dont-own`; Thurgood and Stacy `writeScope[docs/specs/**]` → `superseded-by writeScope[.kiro/specs/**]` (rendered as `specs/**`); Stacy `knowledgeBases[spec-summaries]` re-pointed to `specs/*/task-*-summary.md`.

**Verify**: the sweep shows **0 findings on all four records** (`thurgood`, `stacy`, `always-set/task-completion-protocol`, `always-set/civitas-system-overview`). Its 20 standing `stale-signature` findings are all in other seats' rows: ada 3, data 6, kenya 7, leonardo 1, lina 1, sparky 2. Those belong to their re-sign runs.

**The M1 tally, cumulative through the re-sign run.** Signer: stacy. Every re-sign counts as a signature event. First render, not a baseline.

| Count | Value |
|---|---|
| Signature events | **122** (106 + 16) |
| Assent events | **116** |
| Refusal events | **6**, now **0 standing** in this seat |
| Assent rate on routed rows (events) | **78/83** (12 of the 16 re-signs are routed body rows; the steward-verb carve-out is now a routed re-pointed row) |
| Surviving / items over routed assent events | **383/486**; run 1's 330 is corrected to 329 for the `#mcp-practice-notes` over-credit |
| **Current state**: latest signature per routed row | **73 routed rows, all assented, 363/458** |
| Full-survival routed assent events, counted by hand | **43/78**, with the over-credited `#mcp-practice-notes` event removed from run 1's 38. The instrumented signal remains `not yet instrumented`. |
| Non-routed signature events | 39: 35 no-consumer-counterpart (34 assent, 1 refusal, since resolved) plus 4 disposition-flip assents |

- **Peter's sample, corrected N**: M1 says "Stacy-signed assents are sampled by Peter", and every assent here is Stacy-signed. So N is **116**, not the 30 own-charter rows my earlier summaries used. **`0 / 116 (Stacy-signed)`**. The earlier N under-stated the population Peter's sample is drawn from.

**Residuals (non-blocking, for Thurgood)**:
- The carve-out unit's heading still says "enumerated" over content that no longer enumerates.
- Civitas `#governance-processes` keeps DesignerPunk's terms ("monthly", "ballot measure"), while consumer-Thurgood's rendering re-grounds them, so the two surfaces differ in wording.
- `trigger-lens` stays uncredited only because of its parser-keyed clauses.
