# Ballot Measure: No volatile metadata inside signed units (W-9)

**Date**: 2026-10-17
**Drafted by**: Thurgood (Civitas steward; owner of the eight identity docs' operative sets, `owner: thurgood`), at Peter's direction.
**Status**: **RATIFIED (Peter, 2026-10-17)**, relayed by the orchestrator. This commit is the record (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"), made before any edit it authorizes is applied. **Execution follows** in a separate worktree, as § 3 and § 4 state. *(Was: DRAFT, with the class ruled 2026-10-17.)*
**Origin**: health check 2026-10-17, finding W-9 (`.kiro/docs/civitas-health-checks/2026-10-17.md` § 6). That check could not record its own date: bumping the marker red the required `122-diff-guard`.
**Required reviewer**: **Stacy.** She is the C1 confirmer of all eight affected operative sets, and the signer of the consumer overlay that § 3.3 re-grounds.
**Unit**: a standalone ballot. It edits always-loaded steering docs and `canonical/**`, so **Peter merges it** under the governance carve-out.

---

## 1. The defect (read, not inferred)

Two kinds of text that change on a schedule sit inside units whose `canonicalHash` is signed:

1. **The health-check date marker.** Start Up Tasks item 2 (`**[2026-09-19]**`, `.kiro/steering/start-up-tasks.md` L22) is inside the unit `#item-civitas-governance-health-check`. Its item `hc-1` quotes the marker verbatim (`canonical/operative-sets/start-up-tasks.yaml` L66–L73). The consumer overlay re-grounds that unit by hash, signed by Stacy on 2026-09-29.
2. **`**Last Reviewed**` on the eight identity docs with operative sets.** Each doc's `#<doc>:preamble` unit holds its metadata block, `Last Reviewed` included, and is hashed:
   - AI-Collaboration-Principles, Agent-Directory, Civitas-System-Overview, core-goals, DesignerPunk-Systems-Overview, Spec-Feedback-Protocol, start-up-tasks, Task-Completion-Protocol.
   - All are `owner: thurgood`, `confirmer: stacy`.
   - `personal-note.md` has no operative set and is out of scope.
   - Served docs are unaffected: Component-Family-Navigation's operative set does not include its metadata block.

**Effect**:
- A monthly marker bump, or a review stamp, needs a C1 re-confirm, a re-sign and (for the marker) an overlay re-author, or the gate goes red.
- `scripts/governance-check.sh` L127–L137 auto-writes the marker, so **running the health check as designed reds the gate.**
- The 2026-10-17 check held the marker at [2026-09-19] and held its Spec-Feedback-Protocol stamp (#392).

## 2. The rule

**A signed unit holds only text whose change is a change of law.** Dates that record when something was checked live outside every signed unit:
- either in a record whose existence is the date (the marker);
- or in YAML frontmatter, which `splitFrontmatter` already keeps out of `canonicalHash` (the review stamp).

## 3. The design

### 3.1 The marker becomes a read of the newest health-check record

`.kiro/steering/start-up-tasks.md` item 2. **Before (L22–L24):**

```
   IF it's been >30 days since last governance health check **[2026-09-19]**, THEN flag: "Governance health check overdue — Thurgood (Civitas steward) should run the monthly health check before proceeding."
   
   *Only Thurgood runs the health check. All agents check the date and flag if overdue.*
```

**After:**

```
   IF the newest record in `.kiro/docs/civitas-health-checks/` is more than 30 days old (each record is named `YYYY-MM-DD.md`, the date its check ran), THEN flag: "Governance health check overdue — Thurgood (Civitas steward) should run the monthly health check before proceeding."
   
   *Only Thurgood runs the health check; its committed record is the date. All agents read the newest record's filename and flag if overdue.*
```

- The wording changes **once** and is signed **once**. After that, a check moves no signed text: it adds a file in `.kiro/docs/`, which is outside every operative set and outside the lock's input closure.
- **Why a record, not a marker**: the record already exists for every check (the 2026-08-02 precedent). A committed record is the evidence the check ran. A date someone typed is not evidence of anything. This applies the "authority is a record" principle to the cadence.

### 3.2 `Last Reviewed`: MOVED to frontmatter, not frozen

**Edit**: in each of the eight docs, the body line `**Last Reviewed**: <date>` is removed and a `lastReviewed:` line is added to the existing YAML frontmatter, after `inclusion:` (all eight already open with `---`, `id:` and `inclusion:`). The before → after, per doc (read at `ea438efa6`):

| Doc | Body line removed (before) | Frontmatter line added (after) |
|---|---|---|
| `AI-Collaboration-Principles.md` | `**Last Reviewed**: 2026-08-02` | `lastReviewed: 2026-08-02` |
| `Agent-Directory.md` | `**Last Reviewed**: 2026-09-28` | `lastReviewed: 2026-09-28` |
| `Civitas-System-Overview.md` | `**Last Reviewed**: 2026-09-21` | `lastReviewed: 2026-09-21` |
| `core-goals.md` | `**Last Reviewed**: 2026-07-05` | `lastReviewed: 2026-07-05` |
| `DesignerPunk-Systems-Overview.md` | `**Last Reviewed**: 2026-09-21` | `lastReviewed: 2026-09-21` |
| `Spec-Feedback-Protocol.md` | `**Last Reviewed**: 2026-03-24` | **`lastReviewed: 2026-10-17`** (the stamp #392 held; verified clean that day) |
| `start-up-tasks.md` | `**Last Reviewed**: 2026-09-29` | `lastReviewed: 2026-09-29` |
| `Task-Completion-Protocol.md` | `**Last Reviewed**: 2026-09-29` | `lastReviewed: 2026-09-29` |

**Why move rather than freeze**:
- Freezing kills a live signal: the stale-review warning would fire forever or have to be suppressed.
- Moving keeps the per-doc review date where people and the validators read it.
- Moving needs **no generator change**: `tools/agent-generator/frontmatter.ts` `splitFrontmatter` already hashes the body only (`canonicalHash = sha256(partition(splitFrontmatter(src).body))`, per the operative-set headers).

**Surviving counter-argument**: the always-loaded docs now carry their review date in frontmatter. That is less visible to a reader than a bold body line, and it is a second metadata location for the same field. Served docs keep the body form, and the readers of that form are (corrected at R2):
- `mcp-server/src/indexer/metadata-parser.ts` L54 reads `Last Reviewed` from the body as an **optional** field (`lastReviewed?: string`, L12).
- The docs MCP's `validate_metadata` tool (`DocumentIndexer.validateMetadata`, `mcp-server/src/indexer/DocumentIndexer.ts` L471) lists `lastReviewed` among its required fields.
- `scripts/validate-steering-metadata.js` L191 requires it.

None of these reach the eight identity docs, which are not served. The two forms are reconciled only in the two steering scripts (§ 3.4).

### 3.3 One-time re-signing (the cost of the fix, paid once)

- **Eight `#<doc>:preamble` units** re-hash in `canonical/operative-sets/{ai-collaboration-principles,agent-directory,civitas-system-overview,core-goals,designerpunk-systems-overview,spec-feedback-protocol,start-up-tasks,task-completion-protocol}.yaml`. **Stacy re-confirms** each in `canonical/profiles/consumer/confirmations/<doc>.md`.
- **`#item-civitas-governance-health-check`**:
  - Item text after (author: Thurgood, the profile author; each a verbatim substring of the new unit, per the record's rule):
    - `hc-1` before: `IF it's been >30 days since last governance health check **[2026-09-19]**, THEN flag:` → after: ``IF the newest record in `.kiro/docs/civitas-health-checks/` is more than 30 days old (each record is named `YYYY-MM-DD.md`, the date its check ran), THEN flag:``
    - `hc-2` unchanged.
    - `hc-3` before: `Only Thurgood runs the health check.` → after: `Only Thurgood runs the health check; its committed record is the date.`
    - `hc-4` before: `All agents check the date and flag if overdue.` → after: `All agents read the newest record's filename and flag if overdue.`
    - `hc-1` keeps its label `overdue test on the cadence marker`. The label is never matched, so it can stay.
  - Stacy re-confirms.
  - The consumer overlay (`canonical/profiles/consumer/always-set/start-up-tasks.overlay.md`) and its dispositions row are re-authored. They drop the record-path clause, since a consumer has no `.kiro/docs/civitas-health-checks/`, so this follows the existing "re-pointed" disposition.
  - Stacy re-signs (`canonical/profiles/consumer/signatures/start-up-tasks.md`).
- These are C1 signing and confirming acts, so they **need no grant** (ballot `2026-10-01-signing-act-chain` M1). Authoring the item text and the overlay is Thurgood's, as profile author.
- **Commit sequencing, so `verify-signing-chain` links 2 and 3 hold** (Stacy R1; link 1 holds as drafted):
  1. **One authoring commit first** (Thurgood): the eight docs, the eight operative-set records (preamble `canonicalHash` and the `hc-*` texts), and the overlay and dispositions re-author.
  2. **Then one confined commit per C1 act**, each touching only that act's confirmation or signature sub-object and its sheet section, with an `Agent: stacy` trailer: eight preamble re-confirmations, one `#item-civitas-governance-health-check` re-confirmation, and one re-sign of `signatures/start-up-tasks.md`.
  3. **Then** the lock refresh (a green full diff-guard run) and the scripts commit.
- No commit mixes authoring with a C1 act, and no C1 act is folded into another.

### 3.4 The scripts stop writing and start reading

- **`scripts/governance-check.sh`**: the block at L127–L137 (`# Update governance health check date in Start Up Tasks if --full was used` through its closing `fi`) is **replaced** by:

```bash
# Report the cadence from the newest health-check record (ballot 2026-10-17-no-volatile-metadata-in-signed-units).
# The record is the date; this script never writes into a steering doc.
if [ "$FULL_CHECK" = true ]; then
  RECORD_DIR=".kiro/docs/civitas-health-checks"
  NEWEST=$(ls "$RECORD_DIR"/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9].md 2>/dev/null | sort | tail -1)
  TODAY=$(date +%Y-%m-%d)
  echo ""
  if [ -n "$NEWEST" ]; then
    echo "📅 Newest health-check record: $(basename "$NEWEST" .md)"
  else
    echo "📅 No health-check record yet in $RECORD_DIR."
  fi
  echo "   This run's record is $RECORD_DIR/$TODAY.md; committing it is what records the check."
fi
```

  - It is **scoped to `--full`**, so audit-time runs print nothing new (Stacy R1).
  - **The draft's exit-non-zero addition is WITHDRAWN at R2.** The record is written after the run, from its output, so a "no record for today" exit would red every `--full` run. The printed line replaces it.
- **`scripts/detect-stale-metadata.js`** L24 and **`scripts/validate-steering-metadata.js`** L154. The same one-line before is replaced by the same three-line after in each:
  - Before: `const lastReviewedMatch = content.match(/\*\*Last Reviewed\*\*:\s*(.+)/);`
  - After:

```js
const frontmatterBlock = content.match(/^---\n([\s\S]*?)\n---/);
const frontmatterReviewed = frontmatterBlock && frontmatterBlock[1].match(/^lastReviewed:\s*(\S+)\s*$/m);
const lastReviewedMatch = frontmatterReviewed || content.match(/\*\*Last Reviewed\*\*:\s*(.+)/);
```

  - `lastReviewedMatch[1]` is the date in both forms, so no downstream line changes.
  - The required-field check at `validate-steering-metadata.js` L191 is untouched: it reads the parsed `lastReviewed`, now satisfied by either form.

### 3.5 The generator

**No change expected** (§ 3.2). If the post-edit `npm run check:122:diff-guard` full run shows otherwise, execution stops and reports. The edit then needs the grant line in § 4 for `tools/agent-generator/**` (W-5's root, owned only once the write-scope ballot `2026-10-17-standing-write-scope-six-roots.md` is ratified and applied).

## 4. Files, and who merges

| File | Change | Merge |
|---|---|---|
| `.kiro/steering/start-up-tasks.md` | item 2 wording; `Last Reviewed` → frontmatter | **Peter-merged** (steering) |
| the other seven identity docs in `.kiro/steering/` | `Last Reviewed` → frontmatter | **Peter-merged** (steering) |
| `canonical/operative-sets/` × 8 | preamble re-hash; `hc-1` and `hc-4` text | **Peter-merged** (`canonical/**`, agent config) |
| `canonical/profiles/consumer/{confirmations,signatures,always-set}/**` | Stacy's acts; Thurgood's overlay and dispositions | **Peter-merged** (`canonical/**`) |
| `scripts/governance-check.sh`, `scripts/detect-stale-metadata.js`, `scripts/validate-steering-metadata.js` | § 3.4 | **Grant line** (below) |
| `canonical/generated.lock` | refreshed by a green full diff-guard run, never by hand; `outputs` expected unchanged, and the PR says so either way | rides the PR |
| `.kiro/docs/civitas-health-checks/2026-10-17.md` | a one-line W-9 resolution note | rides the PR |

**Grant paths** (for the execution PR; activated by Peter's merge of a PR whose body names this ballot and this list, README rule 8; expires at that PR's merge; superseded if the write-scope ballot is applied first and lists these files under Thurgood):
- `scripts/governance-check.sh`
- `scripts/detect-stale-metadata.js`
- `scripts/validate-steering-metadata.js`
- *(held in reserve, used only if § 3.5 trips)* `tools/agent-generator/**`, limited to the change § 3.5 names

**Owed after execution**:
- the Spec-Feedback-Protocol review stamp held by #392 (`lastReviewed: 2026-10-17`, verified clean that day);
- `rebuild_index` is not needed, because identity docs are not served.

## 5. Verification (decidable without consulting the author)

1. `npm run check:122:diff-guard` full run: `full-run-green`, operative-set freshness PASS. Then a no-op re-run: `no-op-green`.
2. **Falsification**: on a scratch branch, change one identity doc's `lastReviewed:` and re-run diff-guard. It must stay green, with only `inputClosure` moving. Then change one character of a body line in the same doc; operative-set freshness must red. Both outputs are cited in the PR body.
3. `./scripts/governance-check.sh --full` leaves `git status` clean apart from the lock refresh.
4. A **Kiro load check**: one Kiro session loads the always-set with the new frontmatter key and no warning (Kiro is the runtime for which `inclusion:` frontmatter is meaningful). The output is cited, or the check is stated as not run.

## 6. Counter-arguments (after fold-back)

- **Folded in**:
  - "Freezing is simpler" → moving keeps the signal at no generator cost (§ 3.2).
  - "Agents cannot list a directory reliably" → a filename date is one `ls`, and the record is the evidence anyway.
- **Surviving**:
  - **(1)** Two metadata locations for one field (§ 3.2).
  - **(2)** The marker no longer travels inside the always-loaded text. An agent that does not run the `ls` has nothing to compare against. Today's literal date at least put a number in front of every agent.
  - **(3)** The one-time re-sign touches nine units across eight sets. It is a real Stacy session, not a formality.

## 7. Review rounds

#### [STACY R1] — 2026-10-17 — REVIEW WITH NOTES
- PASS: "volatile" is decidable (the change-of-law test); `**Date**:` stays (§ 2).
- NOTE: citations verified; the before→after is incomplete for the eight stamp lines (per-doc dates; SFP owed 2026-10-17), for `hc-1`/`hc-4`, and for the three scripts' replacement text.
- FAIL (accuracy, § 3.2): `metadata-parser.ts` reads `Last Reviewed` as optional and `validate-metadata.ts` does not require it; only `scripts/validate-steering-metadata.js` L191 does.
- NOTE: verifier acceptance (§ 3.3). Link 1 holds; links 2 and 3 need the sequencing stated (authoring commit first, then one confined commit per C1 act with the `Agent:` trailer).
- PASS: `governance-check.sh` is wired to no workflow or `package.json` script. NOTE: scope the exit to `--full`.
- Both ballots: add a rulings slot. Add a consult ledger.

#### [THURGOOD R2] — incorporated, woven
- Stamp lines → § 3.2 per-doc table, SFP at 2026-10-17. `hc-1`, `hc-3`, `hc-4` before→after → § 3.3 (`hc-3` also moves; Stacy's note named `hc-1`/`hc-4`, and the new footnote changes `hc-3`'s sentence too). Scripts' replacement text → § 3.4 verbatim.
- Accuracy FAIL → § 3.2 rewritten. **One point corrected back, for Stacy's adjudication**:
  - `metadata-parser.ts` is optional, as she says.
  - But the docs MCP's `validate_metadata` path is `DocumentIndexer.validateMetadata` (`mcp-server/src/indexer/DocumentIndexer.ts` L471), and it **does** list `lastReviewed` as required. No `validate-metadata.ts` exists under `mcp-server/src/indexer/`.
  - Either way, nothing on the docs-MCP side reaches the identity docs. The design is unchanged.
- Sequencing → § 3.3 commit order.
- `--full` scoping → § 3.4. The author's exit-non-zero addition is withdrawn as a defect (it would red every `--full` run).
- Rulings slot → § 8; consult ledger → § 9.

## 8. Rulings (Peter)

- **2026-10-17 — the class**: "no volatile metadata inside signed units" (W-9 class fix; relayed by the orchestrator).
- **2026-10-17 — the ballot: RATIFIED (Peter)**, as drafted at R2 (`e76fb5035`), relayed by the orchestrator.

## 9. Consult ledger

- **Peter**, 2026-10-17: ruled the W-9 class (§ 8).
- **Thurgood**, 2026-10-17 (the design consult, read-only): marker → newest record; `Last Reviewed` moved to frontmatter, not frozen; scripts read frontmatter and stop auto-writing; the generator unchanged.
- **Stacy R1**, 2026-10-17 (§ 7).

## Errata

- **2026-10-17 (Thurgood)**: § 7 R2's correction-back says no `validate-metadata.ts` exists under `mcp-server/src/indexer/`. That is literally true, but `mcp-server/src/tools/validate-metadata.ts` exists: it is the `validate_metadata` tool's handler, and it reads the stamp through `QueryEngine.validateMetadata` → `DocumentIndexer.validateMetadata` (L471). Stacy's citation was to that file. The design is unaffected, because the identity docs are not served.
- **2026-10-17 (Thurgood), on execution — the record matched to what shipped** (Stacy, R1 on execution):
  1. **§ 3.3 step 1.** The authoring commits move no record `canonicalHash`. `verify-signing-chain` reads a moved existing unit hash as the confirmer's object, so every hash move is one of Stacy's acts, as in #285. There were four authoring commits, not one:
     - `0274210a` — the eight docs, item 2, the `hc-*` texts, the overlay pin and removals, and regeneration. Its `Agent: thurgood` line sits outside git's trailer block; the commit carries no signing act, so the verifier skips it.
     - `d884d2af` — the consumer health-check overlay re-authored to the record mechanism, because "keep its date recorded here" was a typed date.
     - `038ba783` — the consumer Thurgood overlay `#trigger-types` line, for the same reason.
     - `2df26dde` — the canonical Thurgood charter's `cadence-health-check` item, which still committed a date into Start Up Tasks.
  2. **§ 3.3's act count.** There were twelve C1 acts, not ten. The two beyond the § 4 list are `thurgood.yaml #trigger-types` re-confirmed and its `thurgood.dispositions.yaml` row re-signed. They cover the consumer Thurgood overlay line (`038ba783`) and the charter's L444 `cadence-health-check` item (`2df26dde`). Both were forced by § 2's rule against a typed date. The orchestrator made the call to include them; the authority is Peter's carve-out merge of the execution PR (the #285 2b basis).
  3. **§ 4, the lock.** `outputs` moves, contrary to "expected unchanged":
     - The consumer always-set renderings drop the body `Last Reviewed` line (48 files: eight docs, three lanes, each with its sidecar), so consumer copies carry no review date. The consumer lanes write fresh minimal frontmatter.
     - The `hc` rendering and the consumer Thurgood rendering changed text.
  4. **§ 3.3, "they drop the record-path clause".** The consumer overlay ended as a re-author to the record mechanism (its text is in `d884d2af`), not a path-only drop. Its removals were re-authored to three entries, all `subtraction-3`: the record-path clause, `the monthly health check`, and `filename`.
