# Task 5.5 Completion (token-side strings) — Ada, secondary seat

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 5 · **Agent**: Ada (Sonnet), secondary seat on Task 5.5 (token-side migration report strings only)

**Delegated-tier**: plan held.

> This document covers ONLY the three token-side string slots Lina left marked for Ada. It does not tick 5.5 — Lina ticks the subtask when the rest of her component-copy migration work is done. Scope is `SRC_TYPES_PRUNE_CLAUSE` (`src/cli/sync/Manifest.ts`) and `TOKEN_SIDE_SLOTS.oldNameReferenceMaps` / `TOKEN_SIDE_SLOTS.brandedTokenFiles` (`src/cli/sync/Migration.ts`), plus the tests asserting them.

## What changed

**`src/cli/sync/Manifest.ts`** — `SRC_TYPES_PRUNE_CLAUSE` text is **unchanged from Lina's draft**; I reviewed it against D-T-A5 and the criterion (the pruned `src/types` line must not read as "safe to delete") and it already said the right thing:

```
' — keep them: your token tier still imports them through relative ../types paths, so deleting src/types breaks generate'
```

Only the doc comment above it changed (removed the "DRAFT, pending Ada's authorship" framing; recorded the authorship transfer).

**`src/cli/sync/Migration.ts`** — both `TOKEN_SIDE_SLOTS` entries rewritten. Final text:

- **`oldNameReferenceMaps(files)`**:
  > `${n} copied reference map${s} named like token files (${files}) will trip the component-token lint on your first 'npx designerpunk generate' — a tokens.ts or *.tokens.ts file that doesn't call defineComponentTokens registers no tokens, whether it's one of ours or one you named yourself. It's a warning, not an error, so generate still runs. Rename the file${s} off the tokens.ts pattern (e.g., <Name>.refs.ts) to stop it, or leave as is.`

- **`brandedTokenFiles(files)`**:
  > `${n} copied component token file${s} (${files}) now register as YOUR component tokens when you run generate — they're yours while the copies stay, and DesignerPunk's release won't overwrite them. Keep the copy and they stay registered; remove it (see above) and they go with it.`

### Why the wording changed from Lina's draft (not just carried through)

Lina's `oldNameReferenceMaps` draft said *"DesignerPunk authored them under the old naming."* I traced `scanTokenFiles` (`Migration.ts`) and the fixture at `sync.migration.test.ts` "(f)" and found this claim is **false in the general case**: `scanTokenFiles` classifies by filename pattern (`tokens.ts` / `*.tokens.ts`) + a content check, with **no ownership attribution**. The existing test fixture proves the mixed case directly — `Nav-Header-App` is a **consumer-authored** component (`kind: 'yours'`, not shipped by any fetched version) whose own `tokens.ts` (a plain reference map, no `defineComponentTokens` call) lands in `oldNameReferenceMaps` right alongside the genuinely DesignerPunk-authored old-name files. This is exactly Requirement 8's user story ("a consumer who named a semantic-reference map `tokens.ts`"), so a string claiming universal DesignerPunk authorship would be wrong precisely in the case the requirement exists to serve. Rewrote to be ownership-agnostic ("whether it's one of ours or one you named yourself") and added the actionable remedy (rename off the pattern, mirroring what `#200` actually did in this repo) since the original draft stated only the consequence, not what — if anything — to do about it.

`brandedTokenFiles`'s draft made no ownership claim and is accurate as written for either ownership case; I kept its substance and added the two pieces of information a founder reading it would want next: that our releases don't reach into a kept copy (reinforcing the Model-B "ours never flows into theirs" guarantee), and that the keep/remove choice already offered for the containing component (the fork/shadow message printed earlier in the same report) is what decides whether these specific token registrations persist.

### Detection-rule verdict (asked to confirm or correct)

Two different detection mechanisms are in play, and they should not be conflated:

1. **`Migration.ts`'s `scanTokenFiles`** (already implemented, in scope for review here) — a **text search**: `text.includes('defineComponentTokens')` on file content, gating on filename (`tokens.ts` or `*.tokens.ts`), recursively over the copied `src/components/core/` tree. This is what actually produces the `oldNameReferenceMaps` / `brandedTokenFiles` lists these strings render.
2. **Task 8's harvest-zero lint** (not yet built; `src/cli/loadComponentTokens.ts` has no warning today) — per requirements.md Req 8 AC1/AC2, this is a **runtime per-file branded-export count**: the loader already computes the `defineComponentTokens` brand via `getTokenContract` on each loaded module's exports (`harvestModule`); Task 8 adds per-file attribution to that existing brand check and warns when a scanned file's count is zero. It is explicitly **not** a second (textual) detection mechanism — AC2 requires it reuse the loader's existing brand signal.

**Verdict**: the migration report's text-search is a reasonable, deliberately lighter-weight **approximation** of what Task 8's lint will actually flag, not the same mechanism — and I did not change it (out of my write scope for this seat: the three string slots and their tests only; `scanTokenFiles` is Lina's code, correctly, since it's part of the migration assessment she owns).
- **Where they agree**: every real case in the current codebase and test fixtures — a genuine `defineComponentTokens(...)` call is always accompanied by that literal identifier in the same file, and none of the fixture's reference maps contain it anywhere (comment or code). For the files this will actually run against (a pre-123 consumer's copied tree, and the 7 files that existed before `#200`'s rename), the text search and the brand check agree.
- **The residual**: a text search cannot distinguish "the string appears" from "the brand is present." Two theoretical divergences: (a) a file whose only mention of `defineComponentTokens` is in a comment or an aliased import (`import { defineComponentTokens as dct }`) would be *misclassified as branded* by the text search while actually harvesting zero (and tripping the real lint) — a false negative on `oldNameReferenceMaps`; (b) a file that calls a re-exported already-branded value without the literal identifier in its own text would be misclassified the other way. Neither pattern exists in this repo or its fixtures today. I flagged rather than fixed it, since correcting `scanTokenFiles`'s detection strategy (e.g., to run the same brand check the loader uses) is a code change to a file outside this seat's write grant, and a judgment call about whether the migration path should ever execute a consumer's copied `.ts` files (which the text-search approach was presumably chosen to avoid). Recommend Peter/Lina decide whether this residual is worth closing before Task 5.5 (the rest) or Task 8 lands, or whether it's accepted as a known, low-probability approximation.
- **The 7 old-name files, confirmed present**: `git show --stat e5126cf5` (PR #200, "Rename the 7 component token reference maps to `*.refs.ts`") confirms the pre-rename names were exactly the `*.tokens.ts` pattern `scanTokenFiles` still matches. Any pre-123 consumer copy predates that commit and so still carries the old names — `oldNameReferenceMaps` will find them on a real pre-123 consumer's tree.

## Targeted tests + result

- `npx jest src/cli/__tests__/sync src/cli/sync` → **5 suites, 66/66 passed** (`sync.catalog`, `sync.classify`, `sync.keygrain`, `sync.migration`, `sync.test`).
- `npx jest src/cli/__tests__/Manifest.test.ts` → **13/13 passed**.
- No test edits were needed. `Manifest.test.ts`'s `src/types` assertion (line 154) does string-equal against the `SRC_TYPES_PRUNE_CLAUSE` constant directly (auto-adapts to any text I write), and its two supplementary regex checks (`/relative \.\.\/types/`, `/breaks generate/`) still match the unchanged final text. `sync.migration.test.ts`'s "(f)" test calls `TOKEN_SIDE_SLOTS.oldNameReferenceMaps(...)` / `.brandedTokenFiles(...)` directly rather than asserting a literal string, so it auto-adapted to the rewritten text with no edit required.
- `npx tsc --noEmit` → clean.
- `npm test` (full suite) → **381 suites, 9218 tests passed.**

### Bite recorded red (mutate → run → restore)

Targeted `Manifest.test.ts`'s independent hardcoded assertion (the one place a literal substring is checked against real output rather than re-derived from the same constant): temporarily changed `SRC_TYPES_PRUNE_CLAUSE`'s tail from `"so deleting src/types breaks generate"` to `"so deleting src/types is a bad idea"`.
- Red: `✕ one report line per pruned group; the src/types line states the files remain required (Ada D-T-A5)` — `Expected pattern: /breaks generate/`, 1 failed / 12 passed.
- Restored verbatim (confirmed via `git diff` showing only the intended doc-comment change survives); re-ran → 13/13 green.

I did not add a bite for the two `Migration.ts` strings because their only test coverage calls the exported function directly (`TOKEN_SIDE_SLOTS.oldNameReferenceMaps(files)`), which can never go red on wording drift by construction — it recomputes its own expectation from the same source. This is a property of the existing test design, not something introduced here, and outside this seat's write scope (the test asserting membership/list-correctness, not string content, is Lina's `sync.migration.test.ts` "(f)" test).

## Application-time adaptations

None.
