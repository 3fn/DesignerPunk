# One-hop upgrade rehearsal (pre-123 consumer → 15.0.0): the tracked residuals

**Date**: 2026-10-02
**Status**: ACTIVE (tracked items; **no grant**: this file carries no `**Grant paths**:` list)
**Owner**: Lina, for every item below unless the item says otherwise.
**Trigger**: per item, below. Each item is an event, never a date.
**Source**:
- Peter's ruling, 2026-10-02 (relayed by the orchestrator), verbatim: **"Go with the split, fix the three before the release branch"**. Under that ruling:
  - three findings are fixed before the release branch (F2, F4b, and F1's handling; each has its own grant file);
  - **F1's root cause, F3 and F5 are disclosed in the 15.0.0 notes and tracked.**
- Lina's one-hop upgrade rehearsal, 2026-10-02.
  - Copy: `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/07af3405-cf65-4fd4-9ae6-d36fe6a77303/scratchpad/rehearsal/test01-copy`
  - Logs: `step2.log`, `step3.log`, `step4.log`, `step5b-*.log`.
  - *These are session scratch paths and may not persist. The verbatim lines here are the record.*
- **Related** (the three fixes):
  - `2026-10-02-token-index-meta-ships-absolute-path.md` (F2);
  - `2026-10-02-sync-steering-dir-suggestion-writes-broken-path.md` (F4b);
  - `2026-10-02-generate-stack-trace-on-component-token-family-mismatch.md` (F1's handling).

---

## Disclosed in the 15.0.0 notes, and tracked

### R1. F1's root cause: copied component-token files in the pre-fix single-family form

**What it is.** Pre-123 `init` copied two files, both in the single-family form the v14.1.0 guard (#127) rejects:
- `src/tokens/component/progress.ts`;
- `src/components/core/Button-Icon/buttonIcon.tokens.ts`.

Under Model B, sync calls them the consumer's. It neither updates nor flags them (full detail: the F1 handling file).

**The fix to track: migration-side detection.** `sync`'s pre-123 migration reports any copied component-token file under `src/tokens/component/` or `src/components/core/` that fails the family guard. It names the file and offers the fix: re-copy the package's split version, or split the call.

**Trigger**: **U3's tasks-round kickoff (Spec 123)**, where migration work is in scope. If U3 declines it, it moves to the consumer-generation completeness spec's design-outline round (`2026-10-02-consumer-generation-completeness-spec.md`). Its principle, *"the consumer's own `generate` is the single source of every token artifact"*, makes a copied, stale token file its concern.

### R2. F3: component-copy judging fails completely when the consumer's registry access fails

**What happened.** test01's `.npmrc` pins `@3fn` to GitHub Packages. `npm view … --prefer-offline` succeeded from the cache, but every `npm pack @3fn/core@<v>` returned:
```
"code": "E401", "summary": "401 Unauthorized - GET https://npm.pkg.github.com/@3fn%2fcore - unauthenticated: User cannot be authenticated with the token provided."
```
As a result, all 34 component copies were reported "cannot tell … could not be retrieved". That includes **14.1.0**, which was installed in `node_modules` and is on public npm.

**The fix to track.**
- (a) Judge the **installed** version from `node_modules/@3fn/core/` before fetching anything.
- (b) Report a registry-auth failure once, as auth, and not as 34 × 38 per-version "could not be retrieved" lines.
- (c) Revisit the advice to "repair npmrc after migrate-components" for a consumer whose token is dead.

**Trigger**: **U3's Task 19 kickoff (Spec 123)**.

### R3. F5: no personal note after migration

**What happened.**
- All 8 regenerated Kiro agents (and the CC identity layer) list `.designerpunk/personal-note.local.md` as a resource.
- `sync --migrate-legacy` neither creates that file nor prints `personalNoteNamingMessage` (which `init` prints).
- Yet the closing line says *"…DesignerPunk's MCP servers and your personal note load when a session starts…"*.
- The old copied `.kiro/steering/Personal Note.md` was removed as an unmodified copy.

**Trigger**: **U3's personal-note task kickoff (Spec 123: the `templates/personal-note.template.md` add, Task 22)**. Until then, the 15.0.0 notes tell a migrating consumer to create the file.

## Cosmetic (tracked; no release action)

All three have the same **trigger**: the next `src/cli/sync/**` change under any grant, or U3's Task 19 kickoff, whichever comes first.

- **R4 (F6). The apply-run report shows the pre-apply state.** In the same run that migrates, it prints *"105 files … are copies"* and *"✅ Everything DesignerPunk manages is up to date."* before applying. Also, the old `.kiro/sync-manifest.json` is said to "move" but is retained, with a `"//"` note.
- **R5 (F7). The name contract has no freshness check.** It reported *"name contract: clean"* against `dist/tokens` generated 2026-06-15, a pre-upgrade output. There is no check that the generated output postdates the installed package.
- **R6 (F8). The dry-run is noisy.** Each of the 34 "cannot tell" lines lists all 38 versions.

## Closing

Record each item's outcome here, dated, as it resolves. Archive the file when every item has a recorded outcome (`.kiro/issues/README.md` rule 5).
