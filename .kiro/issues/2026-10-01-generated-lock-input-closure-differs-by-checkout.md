# Issue: `canonical/generated.lock`'s `inputClosure` differs by checkout — the closure hashes the filesystem, and one checkout holds a gitignored log inside a closure root

**Date**: 2026-10-01
**Status**: ACTIVE
**Owner**: Thurgood. Why him and not Lina: the diff-guard is the **instrument**, not the generator machinery. The register row `never-hand-edit-122-generated` (`governance/classification-map.md`) carries `verification.owner: thurgood`, `check_state: armed`, with `122-diff-guard` as its check, and the defect is in how the guard computes its own lock (`computeInputClosureHash`), not in what the generator emits. `outputs` never moved. The path is outside his charter write scope, so the fix PR needs the grant below. **Lina is consulted before the fix PR** on one question only: whether the generator reads any gitignored file under a closure root (it would change what "ignored files are not inputs" means; see option F1).
**Trigger**: **before U2b's unit PR opens** (Spec 123, `task/123-u2b-profile`), and no later than the **next commit that refreshes `canonical/generated.lock`** on that branch (the out-of-grant residuals PR moves it: `.kiro/issues/2026-10-01-agent-generator-out-of-grant-residuals.md` item 2, which is to land before Task 18.1's G2 request). Why this event: the lock is in the pass-four tree Stacy reads at G2, and every refresh from the main checkout after it re-moves the hash.
**Source**: Lina's note in `.kiro/specs/123-consumer-distribution/completion/task-16-completion.md` (Adaptations; Carries "for routing"), read on U2b's unit branch; the root-cause read below was done by Thurgood on 2026-10-01, read-only.

---

## The finding

On U2b's unit branch the same tracked inputs hash to two different `inputClosure` values depending on where the lock was refreshed:

| Commit | Where written (main-checkout rows inferred from the match below) | `inputClosure` (first 8) |
|---|---|---|
| `2a7a5336` (refresh after merging 16.2) | main checkout | `53aa4892` |
| `4b87fe7c` (refresh after merging 16.3) | main checkout | `7a69af81` |
| `4fab4ca9` (refresh after merging the gate fix) | main checkout | `4a41d342` |
| `a7e35314` (16.6 worktree seat) | worktree | `9d5792bd` |
| `56c5cd7e` (refresh after merging 16.6) | main checkout | `4a41d342` |

`outputs` (`48cdb331…`) never moved; the guard is `no-op-green` at head in the main checkout. Net tracked change from `4fab4ca9` to `56c5cd7e` is nil, yet the lock went `4a41d342` → `9d5792bd` → `4a41d342`. Lina's 16.2 and 16.6 seats (worktrees with a symlinked `node_modules` and unstaged build noise: `docs/tokens.css`, `token-index/semantics.yaml`, untracked `token-index/meta.json`) each moved the hash.

## Root cause (measured, not guessed)

**`computeInputClosureHash` (`tools/agent-generator/diff-guard.ts` L79–86) hashes the filesystem under the closure roots, not the tracked files.** `listFilesUnder` (L49–66) is a `readdirSync` walk that follows no symlink and skips nothing. The roots are `canonical`, `skills`, `tools/agent-generator`, `mcp-server/src`, `application-mcp-server/src`, `product-mcp-server/src`, `governance`, `.kiro/steering`, plus `package.json` and `.kiro/hooks/complete-task.sh`.

**The main checkout holds one gitignored file inside a root**: `tools/agent-generator/mcp-server/logs/index-state.log` (660 bytes; `.gitignore` L29 `logs/`; last written 2026-09-29). It holds `indexing_started` / `indexing_completed` events for the docs index with absolute paths into the main checkout. A fresh worktree, a `git archive` export and CI do not have it.

**How I established that it is the whole cause**, using a re-implementation of the walk/hash (same roots, same `path\0sha256` pairs, sorted, lock excluded) run against exports:

1. A tracked-versus-walked comparison: the main checkout walks 794 files, of which 793 are tracked; the single extra is that log. A clean worktree: walked equals tracked.
2. At the main checkout's HEAD (`42e8b5db`), the hash with the log is `4a41d342…`, **byte-identical to the committed lock**. Excluding the log gives `9d5792bd…`, and a clean `git archive` export of the same commit gives the same `9d5792bd…`.
3. Across **five** commits (`2a7a5336`, `4b87fe7c`, `4fab4ca9`, `a7e35314`, `56c5cd7e`), exporting each tree and hashing it with and without the log copied in: **every lock written from the main checkout equals the clean-tree hash plus the log** (`53aa4892`, `7a69af81`, `4a41d342`, `4a41d342`), and the one lock written from a worktree (`a7e35314`) equals the clean-tree hash (`9d5792bd`). Five of five.

The seats' unstaged build noise is **not** in the closure (it sits under `docs/` and `token-index/`, outside every root), and the symlinked `node_modules` is not either (`isDirectory()`/`isFile()` are false for a symlink, and it is outside the roots anyway). Neither moved the hash; the log did, by being present in one checkout and absent in the others.

**What is not established**: which process wrote the log. The path is exactly what `mcp-server/src/index.ts` L61 (`DEFAULT_LOGS_DIR = 'mcp-server/logs'`, resolved against the process's cwd) produces when a docs-MCP server starts with cwd `tools/agent-generator`; the two writes in the file (2026-07-09 and 2026-09-29) are the only two such starts that left a trace. I did not identify the command. **Candidate classes, not measured**: any other ignored artifact appearing under a root (a `.DS_Store`, an editor swap file, a stray `*.log`, a nested `node_modules` or `dist`, a `__pycache__`) reopens the same defect.

**A consequence worth stating**: a lock committed from the main checkout embeds the bytes of a file only that checkout has, and the file changes whenever the writer runs again. The value is not reproducible by anyone else. A clean checkout (CI, a fresh clone, a contributor) computes the clean hash, so at every commit whose lock was written from the main checkout it sees `input-closure-changed` and takes the full path. I **derived** that from `runGuard` (L180–200); I did not read a CI log for it and did not poll CI.

## Cost today

- **Lock churn on every worktree seat**, and a lock that oscillates between merges (the 16.6 sequence above).
- **CI full runs where a no-op was expected**, by the derivation above (the full run itself is green; it costs the generation time the lock exists to save).
- **Not a correctness defect**: both values are green on the same tracked tree; the full run compares bidirectionally and refreshes only on green; `outputs` is unaffected. It does weaken one thing: a lock that two honest checkouts disagree about is a weak witness in a review that reads the lock as "the inputs this tree was generated from" (Stacy's pass four at G2 reads this tree).

## Fix options (drafted, not picked)

- **F1. List the closure from git, not the filesystem**: `git ls-files --cached --others --exclude-standard -z` over the roots and named files, filtering the lock path and any path absent on disk. Tracked files plus untracked-not-ignored; **gitignored files are excluded**, which is the property a hash of "what the tree is" needs. There is precedent in the same directory (`tools/agent-generator/coverage-map.ts` L1139 runs `git ls-files`). **Cost**: a git dependency in the guard; one-time lock move to the clean value (which is what CI computes, so CI's no-op starts to engage); the unit tests build non-git temp directories (`diff-guard.test.ts` `tempRepo()`), so either a non-git fallback to the walk or `git init` fixtures; every future closure change inherits "ignored means not an input".
  - **Surviving counter-argument**: the design's own sentence is that the closure is *complete over everything the pipeline reads*. If the pipeline ever reads a gitignored file under a root, F1 drops it from the closure and a stale lock could pass. That is why the Lina question above is a precondition, and why F1 should come with a test that fails when a generated read hits an ignored path. It also makes the lock depend on `.gitignore` hygiene instead of on bytes.
- **F2. A denylist in `listFilesUnder`** (`logs`, `*.log`, `.DS_Store`, `node_modules`, `dist`). Smallest diff, no git dependency, tests unchanged. **Surviving counter-argument**: it is the enumerative fix for an open class; the next stray artifact reopens the defect and nobody will know until a lock differs.
- **F3. Stop the writer**: make the docs-MCP's log directory absolute or temp-rooted (`mcp-server/src/index.ts` L61 and `DocumentIndexer`'s default). Fixes this file's origin and a real cwd-sensitivity bug in the docs MCP. **Surviving counter-argument**: it fixes the instance, not the class, and `mcp-server/src/**` is a different grant and a different owner conversation; it is worth doing regardless of F1/F2 but does not close this issue.
- **F4. Practice only, no code**: delete the stray log in the main checkout (an ignored local file, not a repo change) and refresh the lock only from a clean tree. **Surviving counter-argument**: free and immediate, and it makes the main checkout agree with the worktrees today; it is also a convention that exactly one writer can break, and the rulebook grows by one clause nobody can mechanically check. It is the right **interim** step regardless of the pick.

**My lean** is F1 with the Lina precondition and F4 as the interim, then F3 as its own small item. Working my counter-argument changed it: I first leaned to F2 for size, then dropped it because the evidence is a class (any ignored artifact), not one filename. **What survives**: F1 moves the one hash CI and every seat will compute, so it stales the committed lock once at an inconvenient time (the unit branch is mid-flight), and I am the instrument's owner choosing the option that grows my own instrument.

## Grant

**Grant paths**: `tools/agent-generator/diff-guard.ts`, `tools/agent-generator/__tests__/diff-guard.test.ts`, `canonical/generated.lock`

- `canonical/generated.lock` is refreshed by a green `npm run check:122:diff-guard` run because `tools/agent-generator` is in the C6 input closure (and, by the F1 change, the value moves once to the clean-tree hash). **The refresh must be run from a clean checkout of the fixing branch**, never from a checkout that holds the stray log, or the committed value re-embeds it.
- `tools/agent-generator/sweeps/noop-probe.ts` reads the same function and needs no edit; it inherits the change.
- If option F3 is chosen it needs its own list (`mcp-server/src/index.ts` and its test) and a separate PR; it is **not** granted here.
- The grant holds on the fixing PR's branch only. It is activated by Peter's merge of a PR whose body names this issue and this path list, and it expires when that PR merges (`.kiro/issues/README.md` rule 8). It confers no ratification authority, touches no governance-law path, and carries none of M1's excluded acts (no `.github/**` path). The fixing PR cites its path list. **Where the fixing PR targets**: U2b's unit branch if it lands before the unit PR opens (the diff-guard on that branch is where the lock is read at G2), otherwise `main`.
- Any change to the register row `never-hand-edit-122-generated`'s `checks[]` text is a governance-law path and not granted here.

## Not in scope here

Any code edit, the deletion of the stray log (a local, ignored file in the main checkout, outside this worktree), or a lock refresh. This issue is the tracked flag, the measured cause and the option set. The pick between F1 and F2 is Peter's; the instrument is Thurgood's.
