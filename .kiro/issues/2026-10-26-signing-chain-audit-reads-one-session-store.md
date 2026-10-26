# Issue: `verify-signing-chain --audit` reads one harness store, so acts made from a `.claude/worktrees/` session read `record absent 4`

**Date**: 2026-10-26
**Status**: ACTIVE
**Owner**: Thurgood (the instrument `tools/agent-generator/regrounding/verify-signing-chain.ts`, in Thurgood's standing write scope)
**Trigger**: `manual` — the event that owes the close is the merge of this record's own PR, which carries the fix and its test (branch `fix/signing-chain-audit-session-stores`). Thurgood re-rules this line to `merge:#<N>` once the PR number exists, as `2026-10-23-audit-link4-rejects-sha-alone-commit-line.md` did. The re-read of the affected acts is owed after that merge, and is filed as owed act 7 of `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md`, not here.
**Class**: P2 obligation (guard) · defect *(set 2026-10-26, Thurgood, rule 12; Stacy may re-class)*. `(guard)`: the instrument says it walks every act against the harness record, and on an act it cannot find it prints "no transcript shows this commit being created". It read 1 of the 17 stores whose names derive from the repo path, so that line was false for 7 acts. One of those 7 is a `FAIL 7`, and the under-read printed it as `record absent 4`. That makes the instrument weaker than its claim. The sibling record `2026-10-23-audit-link4-rejects-sha-alone-commit-line.md` was classed `(record)` on the ground that `--audit` is loud and never a gate. Here the loud line hid a FAIL, which is why I depart from it. Not P0: `--audit` gates nothing and `--ci` is unaffected. Not P1: no consumer reads it.
**Filed by**: Thurgood, under rule 10. The finding is mine, made while annotating PR #514 (Ada's delegate audit). The authority to fix it now is Peter's standing go of 2026-10-26, relayed by the orchestrator: *"If there are any other items of the list that can/should be done in parallel with those running, please, proceed."* The instrument is in my standing scope, so no grant is needed.

---

## 1. The defect

`--audit` takes one `--store <dir>`. Its default is `defaultStore(repo)` = `~/.claude/projects/<slug of the main checkout's path>`. Link 4 finds a commit's creating transcript only under that one directory (`<store>/*.jsonl` and `<store>/<session>/subagents/agent-*.jsonl`).

A Claude Code session started in a worktree at `<repo>/.claude/worktrees/<name>` writes its transcripts to a sibling store, `~/.claude/projects/<slug>--claude-worktrees-<name>/`. Spawned seats write there too, under the session's `subagents/`. The main store does not hold them. An act a seat committed from such a session therefore reads `record absent 4 — no transcript shows this commit being created`, though its transcript exists, and links 5–7 never run on it.

On this machine, at 2026-10-26, 17 store directories derive from the repo path: the main one and 16 `…--claude-worktrees-*` siblings.

## 2. The acts it affects (Ada's file at `a15a0ee20`)

Source: `.kiro/specs/123-consumer-distribution/completion/delegate-audit-release-16.1.0-ada.md` at `a15a0ee20`, on `origin/chore/delegate-audit-release-16.1.0` (PR #514). Ada ran `--audit --pr <N> --signer stacy --store <main store>` over the 24 PRs from #262 through S (437 acts).

The seven signing commits of 2026-10-24, 23:03:26 to 23:52:53 −04:00 (03:03 to 03:52 UTC on 2026-10-25), committed in session `9a934627-db40-4509-9fda-9c94445f110e`, subagent `agent-afc0e39cd0302851b`, in store `-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2--claude-worktrees-ballot-audit-fix-now-221ab6`:

| PR | Acts in Ada's file | Reading in Ada's file | Commits |
|---|---|---|---|
| #465 | 3 | `record absent 4` × 3 | `a7fb5202`, `6fe7822f`, `8cb55bbe` |
| #467 | 4 | `record absent 4` × 4 | `3f2d178b`, `027b8904`, `58fc1abb`, `ced8d722` |

That is 7 of the file's 161 `record absent` acts, and 7 of its 42 post-ratification ones. All 7 are Stacy-signed.

The brief named #436, #439, #445, #449, #465, #467 and #472 as possible carriers. Only #465 and #467 carry the 2026-10-24 acts. The brief also said three of the seven commits appear only in the worktree store. By my measurement all seven anchor only when that store is read (§ 4).

## 3. The fix (this PR)

- **Default store set**: the main checkout's store, then every sibling directory named `<slug>--claude-worktrees-*`, sorted (`defaultStores`). A sibling matches that exact prefix, never `<slug>-`, so another checkout whose path extends this one's (`…-v2-copy`) is never read.
- **`--store` is repeatable.** Given once or more, exactly those stores are read, in order, and the default set is not read.
- **Candidates across stores**: link 4 indexes every store. A candidate found twice with the same tool-call id, prefix and subject (one record copied into two stores) counts once. Tool-call ids are unique per call, so two distinct calls are never merged, and `anomaly 4` for two real candidates is unchanged.
- **Link 5** looks up the parent `tool_use` in the transcript's own store first, then in the others.
- **Output**: with one store, the header (`store <dir>`) and each `transcript` path are unchanged byte for byte. With several, the header reads `stores (<n>): <a>, <b>, …` and each `transcript` path is prefixed with its store's directory name, so a line says which store anchored it.
- **Not read by default**: a store whose session cwd lay outside the repo root, for example a session started in a `/private/tmp/…/scratchpad/` worktree. Its name does not derive from the repo path. Pass it with `--store`. None of the 32 SHAs still reading `record absent 4` in the 24 PRs appears in any such store on this machine (grep, 2026-10-26).
- **Test**: `tools/agent-generator/__tests__/verify-signing-chain.stores.test.ts`, with a fixture of two stores: a main store with no commit, and a worktree store holding the spawn and the seat's transcript.

## 4. Which acts would change reading (measured; the re-read itself is Ada's)

Measured 2026-10-26, 18:35 to 18:46 UTC, from the fix branch tree (base `bdbe72a32`). I ran each of the 24 PRs twice with `--signer stacy`: once with `--store <main store>` alone and once with the default set. The one-store run reproduces Ada's totals exactly: 437 acts, anchored 23 · unanchored 0 · record absent 161 · FAIL 70 · anomaly 183.

The default set changes 7 acts and no others:

| PR | Commit | Row | Ada's file | Default set |
|---|---|---|---|---|
| #465 | `a7fb5202` | `canonical/operative-sets/civitas-system-overview.yaml#what-civitas-contains` | record absent 4 | anchored |
| #465 | `6fe7822f` | `canonical/operative-sets/designerpunk-systems-overview.yaml#civitas-system-governance-infrastructure` | record absent 4 | anchored |
| #465 | `8cb55bbe` | `canonical/profiles/consumer/always-set/civitas-system-overview.dispositions.yaml#what-civitas-contains` | record absent 4 | anchored |
| #467 | `3f2d178b` | `canonical/operative-sets/civitas-system-overview.yaml#what-civitas-contains` | record absent 4 | anchored |
| #467 | `027b8904` | `canonical/operative-sets/designerpunk-systems-overview.yaml#high-level-designerpunk-three-system-architecture` | record absent 4 | **FAIL 7** — no tool result contains the row's rendered line "This diagram shows the relationship between Rosetta (mathematical), Stemma (rela" — spawnDepth 1, model opus |
| #467 | `58fc1abb` | `canonical/operative-sets/designerpunk-systems-overview.yaml#civitas-system-governance-infrastructure` | record absent 4 | anchored |
| #467 | `ced8d722` | `canonical/profiles/consumer/always-set/civitas-system-overview.dispositions.yaml#what-civitas-contains` | record absent 4 | anchored |

With the default set the 437 acts read: anchored 29 · unanchored 0 · record absent 154 · FAIL 71 · anomaly 183.

The new `FAIL 7` is on a Stacy-signed act. Owed act 4 of the trigger-(d) record therefore applies: it goes to Peter as an `**Open for Peter**:` line, relaying the delegate's line verbatim once Ada's re-read prints it. These are my measurement's readings. The delegate's record is Ada's re-read, and this record does not rule on any act.

## 5. What is not this cause

32 commits still read `record absent 4` in these 24 PRs with the default set. The four I checked by grep (#436's `17702702`, #445's `4c0f6977`, #449's `12b3e98f`, #472's `08140e61`) appear by SHA in the main store, which was already read. Their cause is elsewhere: the link-4 commit-line form (`2026-10-23-audit-link4-rejects-sha-alone-commit-line.md` for #445), or a SHA that a transcript only quotes. This fix does not touch them.

*Signed: Thurgood, 2026-10-26.*

## Outcome (2026-10-26, Thurgood)

The fix and its test are in this record's own PR, in the commit after the one that filed this record: the default store set, a repeatable `--store`, de-duplication of copied candidates, the link-5 lookup across stores, and `verify-signing-chain.stores.test.ts`. The record closes when that PR merges (rule 5). The re-read of the 7 acts is owed act 7 of `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md`, and stays open there.

*Signed: Thurgood, 2026-10-26.*
