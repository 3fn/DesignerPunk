# Ballot Measure: No volatile metadata inside signed units (W-9)

**Date**: 2026-10-17
**Drafted by**: Thurgood (Civitas steward; owner of the eight identity docs' operative sets, `owner: thurgood`), at Peter's direction.
**Status**: **DRAFT.** Peter has ruled the CLASS ("no volatile metadata inside signed units", 2026-10-17). This ballot carries the design for ratification. **Execution follows ratification**, in a separate worktree, after #392 merges. Nothing here is law until the status line reads RATIFIED (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
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

**Edit**: in each of the eight docs, the body line `**Last Reviewed**: <date>` is removed and `lastReviewed: <same date>` is added to the existing YAML frontmatter (all eight already open with `---`, `id:` and `inclusion:`).

**Why move rather than freeze**:
- Freezing kills a live signal: the stale-review warning would fire forever or have to be suppressed.
- Moving keeps the per-doc review date where people and the validators read it.
- Moving needs **no generator change**: `tools/agent-generator/frontmatter.ts` `splitFrontmatter` already hashes the body only (`canonicalHash = sha256(partition(splitFrontmatter(src).body))`, per the operative-set headers).

**Surviving counter-argument**: the always-loaded docs now carry their review date in frontmatter. That is less visible to a reader than a bold body line, and it is a second metadata location for the same field: served docs keep the body form, because `mcp-server`'s `metadata-parser.ts` reads `Last Reviewed` from the body and lists it as required. The two forms are reconciled only in the validators (§ 3.4).

### 3.3 One-time re-signing (the cost of the fix, paid once)

- **Eight `#<doc>:preamble` units** re-hash in `canonical/operative-sets/{ai-collaboration-principles,agent-directory,civitas-system-overview,core-goals,designerpunk-systems-overview,spec-feedback-protocol,start-up-tasks,task-completion-protocol}.yaml`. **Stacy re-confirms** each in `canonical/profiles/consumer/confirmations/<doc>.md`.
- **`#item-civitas-governance-health-check`**:
  - `hc-1`'s text changes to the new obligation's verbatim text (author: Thurgood, the profile author); `hc-4`'s text follows the new footnote.
  - Stacy re-confirms.
  - The consumer overlay (`canonical/profiles/consumer/always-set/start-up-tasks.overlay.md`) and its dispositions row are re-authored. They drop the record-path clause, since a consumer has no `.kiro/docs/civitas-health-checks/`, so this follows the existing "re-pointed" disposition.
  - Stacy re-signs (`canonical/profiles/consumer/signatures/start-up-tasks.md`).
- These are C1 signing and confirming acts, so they **need no grant** (ballot `2026-10-01-signing-act-chain` M1). Authoring the item text and the overlay is Thurgood's, as profile author.

### 3.4 The scripts stop writing and start reading

- **`scripts/governance-check.sh`**: delete L127–L137 (the auto-write block). In its place, print the newest record's filename date and its age in days, and exit non-zero if the run has no record for today **[author's addition — Peter rules]**.
- **`scripts/detect-stale-metadata.js`** and **`scripts/validate-steering-metadata.js`**: read `lastReviewed` from YAML frontmatter when present, and the body `**Last Reviewed**` otherwise. They still warn when neither exists.

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

*(empty — Stacy R1 owed)*
