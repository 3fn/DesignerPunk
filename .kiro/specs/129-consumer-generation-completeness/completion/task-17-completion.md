# Task 17 Completion: Retire the native root files and announce it (U12)

**Date**: 2026-11-08
**Spec**: 129 - Consumer-Generation Completeness
**Task**: 17 · subtask 17.1
**Type**: Parent · **Validation**: Tier 3 - Comprehensive
**Agent**: Ada (Sonnet), PRIMARY · **Status**: Complete on U12's unit branch `task/129-closeout`; no PR (U12's PR opens at Task 18)
**Delegated-tier**: plan held
**CI-provenance**: on-branch dispatch from `complete-task.sh` (feedback, not the gate; this parent is not the unit's final parent)
**Instruments**: 8 listed — see .kiro/specs/129-consumer-generation-completeness/completion/task-17-instruments.md

---

## Success criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The package stops shipping `dist/DesignTokens.ios.swift`, `dist/DesignTokens.android.kt`, `dist/ComponentTokens.ios.swift` and `dist/ComponentTokens.android.kt`, and `pack-assert` asserts each is absent. | ✅ | `files[]` negations; `npm run test:pack-contents` prints `PASS: publish path: retired native root file absent: <each of the four>`; `pack-assert.test.ts` bites on each planted. |
| `dist/ComponentTokens.web.css` and the web CSS exports still ship, and `pack-assert` asserts each is present. | ✅ | `PASS: publish path: root token file present: dist/ComponentTokens.web.css` (and `DesignTokens.web.css`); the `exports ./dist/* target packs` rows for `./tokens.css` and `./component-tokens.css` pass; test bites when `ComponentTokens.web.css` is missing. |
| U6's and U8's merge commits are ancestors of U12's merge, by `git merge-base --is-ancestor`. | ✅ | At branch head: `git merge-base --is-ancestor 5a6a7f32b HEAD` exit 0 (U6); `git merge-base --is-ancestor 1686fea35 HEAD` exit 0 (U8). Owed again at the merge. |
| The `CHANGELOG.md` `[Unreleased]` entry announces the retirement, says the consumer's own `generate` now emits what the snapshot carried, and names item (iii), I-1 and I-2 as changes that may break a consumer. | ✅ | `CHANGELOG.md` `## [Unreleased]`: "Removed" and "Changes that may break a consumer" sections. |
| Charter item (iii) in `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` cites Peter's 7 (a) in place of "at the next MAJOR", edited by Ada. | ✅ | Item (iii) line carries 7 (a) and a dated rule-9 amendment. |

Unmet or partially met criteria: none. Forced negative: I looked for a test or shipped doc pinning the four files and found none that fails, because the build still writes them; shipped docs naming them (Integration Guide L167–181, INSTALL) are Task 18's criterion and were left.

## Additional verification
- `npm test`: 436/438 suites; the 2 reds (`mcp-queryability`, `mcp-component-integration`: "MCP server should be built") are this worktree's missing `mcp-server/dist`, ignored build output; both pass where it exists. `npx tsc --noEmit` clean. `npm run test:consumer` 93/93. Completion-criteria parity: 51/51, 0 reds.
- `check:122:diff-guard`: `full-run-green (input-closure-changed)`, since `package.json` is in the closure. `canonical/generated.lock` was restored, not committed; Lina refreshes it at the unit's end.
- `test:pack-contents`: see 17.1; the 3 reds are the symlinked-`node_modules` artifact.
- Outside-list files: none edited. `pack-assert.test.ts` follows `pack-assert.ts`.
