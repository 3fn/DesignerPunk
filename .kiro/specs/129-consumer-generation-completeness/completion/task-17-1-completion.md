# Task 17.1 Completion: `files[]`, `pack-assert`, the build script, the CHANGELOG entry, the charter sentence

**Date**: 2026-11-08 · **Spec**: 129 · **Agent**: Ada (Sonnet)

**What changed**
- `package.json` `files[]`: four negations (`!dist/DesignTokens.ios.swift`, `!dist/DesignTokens.android.kt`, `!dist/ComponentTokens.ios.swift`, `!dist/ComponentTokens.android.kt`).
- `scripts/pack-assert.ts`: `ROOT_TOKEN_FILES` stays the eight files the in-repo build writes; new `RETIRED_NATIVE_ROOT_FILES` (four) and `SHIPPED_ROOT_TOKEN_FILES` (the other four). Section 10a asserts the shipped four present and the retired four absent (finding count unchanged, so `PUBLISH_PATH_FLOOR` is unchanged); the "dist/ root files KEPT" enumeration skips the retired four.
- `scripts/generate-platform-tokens.ts`: header comment only. The build still writes the four files (coordinator's direction), so `src/tools/integrity/inventory.ts`, `BuildSystemCompatibility.test.ts`, `discovery-fresh-set.ts` and `RootTokenFreshness.test.ts` needed no edit.
- `CHANGELOG.md`: new `[Unreleased]` entry (the retirement; the consumer's own `generate` emits what the snapshot carried; item (iii), I-1 and I-2 named as changes that may break a consumer).
- Charter item (iii) in `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` now cites Peter's 7 (a) in place of "at the next MAJOR" (dated amendment in place).
- `scripts/__tests__/pack-assert.test.ts` (follows `pack-assert.ts`): the synthetic package uses the shipped four; three new cases (retired file packed bites; web CSS missing bites; split arithmetic).

**Targeted tests**: `npx jest --config scripts/jest.config.js scripts/__tests__/pack-assert.test.ts` 89/89. `npm run test:pack-contents` on a clean tree: the four retired files assert absent, the four shipped assert present; 112/115, the 3 reds are the MCP-bundle "resolves every module from the root node_modules/" rows, which read `root modules 0` only because this worktree's `node_modules` is a symlink (the bundle paths read `../../../../../../../Users/3fn/...`); not caused by this change.

**Application-time adaptations**: the build keeps writing the four files (coordinator's direction); `ROOT_TOKEN_FILES` kept as the freshness list instead of shrinking it.
