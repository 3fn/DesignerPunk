# `generate` dies with "Unexpected error" and a stack trace when a component-token file fails the family guard

**Date**: 2026-10-02
**Status**: ACTIVE (an open defect and a grant; the grant does nothing until Peter's merge activates it)
**Owner**: Lina
**Trigger**: the fixing PR, on branch **`chore/release-15-rehearsal-fixes`**, which must merge **before the 15.0.0 release branch is cut**.
- The grant is activated by Peter's merge of the PR whose body names this file (`.kiro/issues/README.md` rule 8).
- It expires at the fixing PR's merge.
- The fixing PR cites this file and its path list. An edit outside it is a claims-pass finding.

**Source**:
- Peter's ruling, 2026-10-02 (relayed by the orchestrator), verbatim: **"Go with the split, fix the three before the release branch"**.
  - This file's fix is **F1's error handling only**, one of the three.
  - F1's root cause is **disclosed** in the 15.0.0 notes and tracked, not fixed here (see below).
- Lina's one-hop upgrade rehearsal, 2026-10-02 (evidence below).
- Ballot `2026-09-27-ci-regime-standing-scope` § 3.

---

## The defect: the handling

`runGenerate` calls `loadComponentTokens(config)` at `src/cli/designerpunk.ts` L192. That is **outside** the system pipeline's `try` (L216 onward), which catches errors and prints `❌ System token generation failed: …`.

A component-token module that throws while it loads therefore escapes to `main()`'s catch-all (L510). That handler prints `❌ Unexpected error:` and a full stack trace. The guard involved is `defineComponentTokens`'s family-mismatch guard, from #127 (950bcddf, 2026-08-25, in v14.1.0).

The guard's own message is good: it names the token and the fix. What's wrong is that it reaches the user as a crash. It also names the **component** (`'Progress'`), not the **file**; the file appears only in the stack.

## Evidence

**Rehearsal copy**: `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/07af3405-cf65-4fd4-9ae6-d36fe6a77303/scratchpad/rehearsal/test01-copy`
- Log: `step4.log`.
- *These are session scratch paths and may not persist. The verbatim lines here are the record.*

`npx designerpunk generate` exited 1 and wrote nothing (`dist/tokens` still holds content generated 2026-06-15). Its output, verbatim:

```
❌ Unexpected error: Error: Token family mismatch in defineComponentTokens() for component 'Progress': token 'node.size.sm' is declared in a 'spacing' family call but references primitive 'size150' from the 'sizing' family. Every token in a call is stamped with that call's family, which drives platform output (e.g. the generated 'SpacingTokens' class reference), so this would emit a non-existent platform member. Fix: move 'node.size.sm' into a separate defineComponentTokens() call with family: 'sizing', or use the value path if no token-chain relationship is intended.
    at defineComponentTokens (…/test01-copy/node_modules/@3fn/core/dist/build/tokens/defineComponentTokens.js:144:23)
    at …/test01-copy/src/tokens/component/progress.ts:2:1496
    …
```

## Fix shape

1. **Catch the throw where the file is known.** Catch a module's load failure per file, inside the harvest or around the call in `runGenerate`, so the file path is in hand.
2. **Print a catalogued message.** Add it to `src/cli/shared/errorCatalog.ts`. It names:
   - the **file** (repo-relative);
   - the guard's own message, including its `Fix:` clause;
   - the one-line remedy for a pre-123 copy: replace it with the package's current version of the file, or split the call by family.
3. **Exit non-zero with no stack.** `generate` writes nothing it can't stand behind.
4. **Tests.**
   - A fixture component-token file in single-family form makes `generate` print the catalogued string, with the file named and no `Unexpected error`.
   - The catalog string is pinned.

## F1's root cause: DISCLOSED, not fixed here

What happened:
- Pre-123 `init` copied `src/tokens/component/progress.ts` into the consumer's tree, along with `src/components/core/**`, including `Button-Icon/buttonIcon.tokens.ts`.
- Both copies are in the **single-family form** that the 14.1.0 guard rejects. The package's own copies were split one-call-per-family; see the package's `progress.ts` header and PR #126.
- Under Model B, `sync` calls `src/tokens/**` the consumer's ("no longer managing 59 files under src/tokens — under the current contract they are yours"). So sync neither updates nor flags them, and then prints "✅ Everything DesignerPunk manages is up to date."

What this means for the rehearsal:
- The rehearsal stopped at `progress.ts`.
- `buttonIcon.tokens.ts` is predicted to fail next, but that was not run. It is a single `family: 'spacing'` call that references both `size*` and `space*` primitives, and test01's config still harvests `./src/components/core`.

What the 15.0.0 notes carry: the manual fix. Either re-copy the package's split versions of those two files, or split each call by family.

The tracked continuation is in `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md`, so it outlives this file's archiving at the fixing PR's merge. That continuation is the migration-side detection, routed to U3 or the completeness spec with its own trigger.

---

**Grant paths**: `src/cli/designerpunk.ts`, `src/cli/loadComponentTokens.ts`, `src/cli/shared/errorCatalog.ts`, `src/cli/__tests__/generateRefusals.test.ts`, `src/cli/__tests__/loadComponentTokens.test.ts`, `src/cli/__tests__/errorCatalog.test.ts`

*Note*:
- `src/cli/loadComponentTokens.ts` is listed because catching per file, where the path is known, is the cleanest way to name the file.
- If the fix catches in `runGenerate` instead, that path stays untouched.

## What this grant does not cover

- `src/build/tokens/defineComponentTokens.ts`: the guard is correct and stays as it is (Ada's).
- Migration-side detection in `src/cli/sync/**`, which is tracked elsewhere.
- `governance/**`, `.kiro/steering/**`, ballots and charters.
- No ratification authority.
