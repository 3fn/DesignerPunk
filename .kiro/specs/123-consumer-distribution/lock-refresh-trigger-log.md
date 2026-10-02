# Lock-refresh trigger log — `canonical/generated.lock` on `task/123-u2b-profile`

**Grant**: `.kiro/issues/2026-10-01-task-18-lock-refresh.md` (owner Thurgood; activated by #253, `a75e442c`; **Grant paths**: `canonical/generated.lock`; expires when U2b's unit PR merges).
**Why this file exists**: the grant's own `## Trigger log` points here (amendment A6, 2026-10-02): `.kiro/issues/**` is outside Thurgood's charter write scope, and this path is inside it. **This is not a Task 18 record.** It records the guard's mechanical result and never a disposition, criterion or verdict; Thurgood is recused from G2 and authors no line toward it.
**Form** (grant amendments A3–A4): append-only and dated. Each entry states who ran the guard, the SHA it ran at, the verdict string the guard printed, and the freshness finding count. For a merge that moves the lock it also names exactly one grant that owns the move, including the form "deferred to <grant>". No refresh by the lock-refresh grant in between. After 18.1's request, a refresh needs Stacy's dated go, recorded by her in `completion/g2-witness-log.md`; any refresh commit body and its entry cite that path and the commit that carries her go.

**Reading rule for the first two entries**: both are **facts reported to Thurgood by the orchestrator**. He did not run the guard for either, and "no run" below means no run was made by anyone, not a run whose result was withheld. The roots are read from `tools/agent-generator/diff-guard.ts` (`INPUT_CLOSURE_ROOTS`: `canonical`, `skills`, `tools/agent-generator`, `mcp-server/src`, `application-mcp-server/src`, `product-mcp-server/src`, `governance`, `.kiro/steering`; `INPUT_CLOSURE_FILES`: `package.json`, `.kiro/hooks/complete-task.sh`) and `tools/agent-generator/generate.ts` (`guardedRoots`).

---

## 2026-10-02 — merge of `main` `79cb787c` into the unit branch, at `eae1a07c`

- **Runner**: orchestrator (reported to Thurgood; not run by him).
- **Run**: `npm run check:122:diff-guard` at `eae1a07c`.
- **Verdict string**: `no-op-green`.
- **Freshness findings**: 0.
- **Lock**: no diff, no write. No refresh commit, so there is no grant act. A read-only run needs no authority.
- **Lock-move owner**: none (the lock did not move). The merge carried one spec-record file (#257).

## 2026-10-02 — non-merge commits on the unit branch after `eae1a07c`: `aac1d236`, `fafae2b0`, `8ebdae96`

- **Runner**: none. No guard run was made, and none was owed for a non-merge commit by these entries' own rule (reported to Thurgood by the orchestrator; he did not run anything).
- **Paths, by `git show --name-only` read by Thurgood:**
  - `aac1d236` — `.kiro/specs/123-consumer-distribution/completion/task-18-instruments.md` only. Under no closure or guarded root.
  - `8ebdae96` — `.kiro/specs/123-consumer-distribution/design.md` only (Thurgood's design erratum). Under no closure or guarded root.
  - `fafae2b0` — `src/cli/shared/errorCatalog.ts` (not under any root), two `.kiro/specs/123-consumer-distribution/completion/` docs (not under any root), **and `tools/agent-generator/__tests__/consumer-entry.degradation.test.ts`, which IS under a closure root.** `tools/agent-generator` is in `INPUT_CLOSURE_ROOTS`, and the closure hashes every git-listed file beneath it, test files included (`listInputClosureFromGit`).
- **Correction to the premise this entry was requested under**: the orchestrator's note named `src/cli/**` and `.kiro/specs/**` for the three commits. That holds for `aac1d236` and `8ebdae96`, but not for `fafae2b0`.
- **Expected effect of `fafae2b0` (read of `diff-guard.ts`; not run):**
  - The lock's `inputClosure` is now stale by one file.
  - `outputs` is expected unmoved: the guarded roots hold generated renderings, and a test file is not an input to them.
  - A stale `inputClosure` with unmoved `outputs` keeps the guard's full path green (grant item 3's note).
- **Lock-move owner**: **deferred, not refreshed here.** No refresh by this grant is made in between. The next refresh absorbs it. If that refresh is VALVE-1's under its own grant, that grant owns it. If none intervenes, the grant item 2 confirming run absorbs it, and that entry names it. This entry does not pick between them.
- **Unmoved by `aac1d236` and `8ebdae96`**: no part of the lock.

---

*(Room for entries to follow, each written when its event happens and not before: the residuals PR's merge into the unit branch; the VALVE-1 merge into it; the merge of `main` after #258; the confirming run before 18.1 with its H0 and H.)*
