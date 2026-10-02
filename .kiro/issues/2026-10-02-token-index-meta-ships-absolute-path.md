# The shipped `token-index/meta.json` carries the build machine's absolute path

**Date**: 2026-10-02
**Status**: ACTIVE (an open defect and a grant; the grant does nothing until Peter's merge activates it)
**Owners**: **Ada** owns the writer. **Lina** owns the resolver. Each owner writes only within her own grant list below.
**Trigger**: the fixing PR, on branch **`chore/release-15-rehearsal-fixes`**, which must merge **before the 15.0.0 release branch is cut**.
- The grant is activated by Peter's merge of the PR whose body names this file (`.kiro/issues/README.md` rule 8).
- It expires at the fixing PR's merge.
- The fixing PR cites this file and its path lists. An edit outside them is a claims-pass finding.

**Source**:
- Peter's ruling, 2026-10-02 (relayed by the orchestrator), verbatim: **"Go with the split, fix the three before the release branch"**. This defect is one of the three (rehearsal finding F2).
- Lina's one-hop upgrade rehearsal, 2026-10-02 (evidence below).
- Ballot `2026-09-27-ci-regime-standing-scope` § 3 (the issue-row grant).

---

## The defect

`generateTokenIndex` writes `token-index/meta.json` as `{ "tierDir": <absolute path> }`.
- The writer is `src/generators/generateTokenIndex.ts` L259–263.
- The package build passes the absolute path at `scripts/generate-platform-tokens.ts` L153 (`tierDir: config.tokenSourceRoot`).
- The CLI's `generate` passes one at `src/cli/designerpunk.ts` L243.

`npm pack` ships the file. In the rehearsal tarball it read:

```
{
  "tierDir": "/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/07af3405-cf65-4fd4-9ae6-d36fe6a77303/scratchpad/rehearsal/clone/src/tokens"
}
```

`application-mcp-server/src/indexer/resolveThemeTierRoot.ts` L35–45 takes `meta.tierDir` first and does **not** check that the path exists.
- So any consumer whose application MCP serves the **package's** index (the CONSUME / package-mode postures) gets a theme root that does not exist on her machine.
- `ModeClassifier` then logs "SemanticOverrides.ts not found — mode classification unavailable". This is predicted from the code; the boot was not run in that posture.
- **The defect is masked on the publisher's machine**, because the path exists there.

**It is new in this release.** The published 14.1.0 tarball has no `token-index/meta.json` (checked against the registry tarball, 2026-10-02).

**The release gate cannot see it.** The file is **untracked and not gitignored**: `git check-ignore` exits 1, and `git ls-files token-index` lists only `README.md`, `components.yaml`, `primitives.yaml` and `semantics.yaml`. `verify:token-index-clean` runs `git diff --quiet token-index/`, which ignores untracked files.

## Evidence

**Rehearsal copy**: `/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/07af3405-cf65-4fd4-9ae6-d36fe6a77303/scratchpad/rehearsal/`
- Tarball: `pack/3fn-core-14.1.0.tgz` (6,361,797 bytes, 1,638 entries).
- Listing: `pack-list.txt`, which contains the line `token-index/meta.json`.

*These are session scratch paths and may not persist. The verbatim lines above are the record.*

## Fix shape (stated by Lina; **Ada confirms before any code**)

1. **Writer.** Store `tierDir` **relative to the token-index directory**. For the package's own index that is `../src/tokens`, which resolves correctly inside `node_modules/@3fn/core/`, since `src/tokens/**` ships.
   - The single write site is `generateTokenIndex.ts`. Relativizing there covers both callers: the package build and the consumer CLI's `generate`.
   - A consumer who commits her `token-index/` has the same defect with her teammates, so the CLI caller needs the fix too.
2. **Resolver.** Resolve a relative `tierDir` against the index directory (`path.resolve(tokenIndexDir, tierDir)`). **Skip any value, relative or absolute, that does not exist on disk**, falling through to the next rule (the explicit tier, then the legacy default).
3. **Tests.**
   - A `meta.json` carrying a nonexistent absolute path does **not** win.
   - A relative `tierDir` resolves against the index directory.
   - The writer emits a relative value.

## Question for Ada (a question, NOT a grant)

**Should the release gate cover `meta.json`?** Two ways to do it:
- **Track it.** Once relative, the file is machine-independent. Tracking it brings it under `git diff --quiet token-index/`. The `token-index/**` path is already in `2026-10-02-release-15-files-grant.md`.
- **Gitignore it.** This hides it from the check. Whether the package would then still ship it, given the `files` entry `token-index/`, needs verifying.

The application MCP needs the file to ship, so that the package's index finds its own themes. Lina's lean is to track it, but it is **Ada's call**. Whichever she chooses, the edit itself (`.gitignore`, a tracked `token-index/meta.json`, or a `package.json` script change) is **outside both grant lists below** and needs its own path admitted.

---

**Grant paths** (Ada, the writer): `scripts/generate-platform-tokens.ts`, `src/generators/generateTokenIndex.ts`, `src/generators/__tests__/generateTokenIndex.test.ts`, `token-index/meta.json`

**Grant paths** (Lina, the resolver): `application-mcp-server/src/indexer/resolveThemeTierRoot.ts`, `application-mcp-server/src/indexer/__tests__/ThemeRootFollowsIndex.test.ts`, `application-mcp-server/src/__tests__/mcpDataRootsDeclaration.test.ts`

*Note on Lina's list*:
- `application-mcp-server/**` is already inside Lina's charter scope. The paths are listed so the fixing PR's diff can be checked against an explicit set.
- `mcpDataRootsDeclaration.test.ts` is listed in case it needs touching; it carries a `tierDir` fixture at L39.
- If the CLI caller (`src/cli/designerpunk.ts` L243) needs changing at all, that path is granted under `2026-10-02-generate-stack-trace-on-component-token-family-mismatch.md`.

## What this grant does not cover

- `.gitignore`, `package.json` and a tracked `token-index/meta.json`. See the question above.
- `governance/**`, `.kiro/steering/**`, ballots and charters. Rule 8 never grants a governance-law path.
- No ratification authority.

---

## 2026-10-02 — Ada: the writer half confirmed, and the answer to Lina's question

**The fix shape is confirmed for the writer.**
- `generateTokenIndex.ts` L259–263 is the only place `meta.json` is written. Both callers hand it an absolute `config.tokenSourceRoot`: `scripts/generate-platform-tokens.ts` L153 and `src/cli/designerpunk.ts` L243. So relativizing at the write site covers both, and neither caller needs to change.
- **What the writer will do:**
  - When `input.tierDir` is defined, write `path.relative(outputDir, input.tierDir)`, normalized to `/` separators so the committed value is the same on every machine. The package's own index then reads `../src/tokens`.
  - When `tierDir` is undefined (`tierDir?: string`, L55), keep today's behaviour: the key is omitted.
- **The test** asserts both. A relative value is written for an absolute input, and no absolute path appears in the file.
- **On the file list**: `scripts/generate-platform-tokens.ts` stays listed in case its L153 comment, or the call, needs a touch. It is not expected to change.

**The answer: TRACK `token-index/meta.json`** (Lina's lean, adopted).
- **Why**:
  - Once the value is relative, the file is machine-independent.
  - Tracking puts it under `verify:token-index-clean` (`git diff --quiet token-index/`), which runs inside `prepublishOnly`. If the absolute-path regression ever returns, the freshly built `meta.json` will differ from the committed one, **and the publish aborts**. That turns this defect class into a gate.
  - Gitignoring it would hide exactly that diff. It would also leave the package depending on how npm treats a gitignored file under a `files` whitelist, which is a question I would rather not stake the theme root on.
- **The added path**: `token-index/meta.json` is now in my grant list above. The fixing PR commits it as freshly generated by `npm run build`. Its expected content is `{ "tierDir": "../src/tokens" }`.
  - **This supersedes, for this one path only, the bullet under "What this grant does not cover"** that lists "a tracked `token-index/meta.json`".
  - `.gitignore` and `package.json` are **not** needed, and stay unlisted.
- **Consumers**: Spec 123 Task 20's `.gitignore` region ignores a consumer's `token-index/`, so nothing changes for them. The relative value also helps any consumer who commits her index anyway.

**The 14.1.0 fact, re-checked**: `curl` of `https://registry.npmjs.org/@3fn/core/-/core-14.1.0.tgz | tar tz` lists four `token-index/` entries, `README.md`, `components.yaml`, `primitives.yaml` and `semantics.yaml`, and **no `meta.json`**. The defect is new in 15.0.0.
