# Spec Feedback: Sync Command

**Spec**: 111-sync-command
**Created**: 2026-06-05

---

## Design Outline Feedback

### Context for Reviewers
- Original issue: `.kiro/issues/2026-06-01-missing-sync-command.md` — 16 stale files after upgrade
- All three open questions resolved (two-tier handling, committed manifest, interactive conflicts) → design-outline.md § "Key Design Decisions"
- Spec 114 (pipeline data flow) completes first — synced source files will integrate with the fixed pipeline → design-outline.md § "Dependencies"
- Two-tier model: governance auto-applies, source always confirms → design-outline.md § "Two-Tier Apply Behavior"

### Requested Reviewers
- **Ada** — Token/component source sync affects her domain. Review whether the source-tier handling is appropriate and whether any source files should be excluded.
- **Sparky** — Primary implementer. Review for implementation feasibility, DX of the interactive prompts, and any edge cases.

### Open Questions (for reviewers)

1. [@ADA] Are there any files in `src/tokens/` or `src/components/core/` that should NEVER be synced (not just ignored, but structurally excluded)? For example, consumer-generated files like component token registrations that don't exist in the package?
2. [@ADA] The manifest uses content hashes to detect consumer edits. For token files specifically, is there a risk of false "unchanged" (file hash matches manifest but semantic meaning changed due to upstream dependency changes)?
3. [@SPARKY] For the interactive prompt UX — should `diff` show a unified diff in-terminal, or open the user's configured diff tool? What's the DX expectation?
4. [@SPARKY] Should `sync` detect the installed package version automatically from `node_modules/@3fn/core/package.json`, or require the user to specify? (Current design assumes auto-detection.)
5. [@SPARKY] For first-time sync (no manifest exists), should ALL existing project files be treated as conflicts, or should `sync` bootstrap the manifest by hashing everything and treating all as "up-to-date"?

#### [THURGOOD R1]
- Design outline updated with all Peter decisions. Three open questions resolved. Architecture diagram added showing full sync flow. Classification logic table added. Two-tier apply behavior formalized.
- Key governance concern: `.designerpunkignore` should be committed (not gitignored) so the team shares ignore decisions. Not currently specified — flagging for discussion.
- The manifest format includes `version` and `syncedAt` — useful for "how stale am I?" diagnostics without running full sync.

#### [SPARKY R1]

**Answers to Open Questions:**

**Q3 (diff UX):** In-terminal unified diff. Reasons:
- Zero-config — no `EDITOR`/`DIFFTOOL` env var detection, no "what if they haven't configured one" fallback path.
- Matches `git diff` muscle memory for our audience.
- For large files where terminal diff is insufficient, the consumer already knows they can `diff .kiro/steering/foo.md node_modules/@3fn/core/.kiro/steering/foo.md` manually.
- External diff tools add child_process complexity, cross-platform quirks (Windows `start` vs macOS `open`), and a failure mode where the tool doesn't exist.
- **Implementation note**: Use a simple unified diff (context lines ±3) with ANSI coloring (`+` green, `-` red). If stdout is not a TTY (piped), strip color codes. No dependency needed — Node's `diffLines` from the `diff` package (MIT, tiny, well-maintained) gives us this cheaply.

**Q4 (auto-detect version):** Yes, auto-detect from `node_modules/@3fn/core/package.json`. Reasons:
- The whole point of sync is "you upgraded, now apply changes." The installed version IS the source of truth.
- Requiring manual version input adds friction and creates a footgun (typo = wrong sync).
- Edge case handling: if `node_modules/@3fn/core/package.json` doesn't exist, fail fast with: `❌ @3fn/core not installed. Run npm install first.`
- Display the detected version prominently in output header (spec already shows this: `📦 Comparing @3fn/core@11.8.0 against project...`).

**Q5 (first-time sync / no manifest):** Bootstrap as up-to-date. Reasons:
- Treating everything as conflict on first run would produce 80+ prompts — unusable.
- The consumer just ran `init` (or is an existing project that never had sync). Their files ARE their current truth. The manifest's job is to track *future* drift, not retroactively question past decisions.
- Behavior: hash all project files that have a package counterpart, write manifest with current hashes, report: `📋 First sync — manifest created (N files tracked). Future runs will detect changes.`
- Exception: if a project file differs from the package file AND no manifest exists, that's either a consumer edit or an older version's content. Still bootstrap as up-to-date — the consumer chose their current state. They can `--force` if they want to reset.

---

**Architecture Feasibility Review:**

**Classification logic — complete?** Mostly. Two edge cases to address:

1. **File exists in project but NOT in package** (consumer-created files in managed dirs). The spec's classification table only covers "file exists in package." Need explicit handling: these files should be completely ignored by sync — they're consumer additions. The manifest should NOT track them. This matters for `.kiro/steering/` where consumers add their own docs.

2. **File deleted from package between versions** (deprecated steering doc removed in 11.9.0). The spec doesn't handle this. Options: (a) report as "orphaned — removed from package" with optional delete prompt, or (b) leave alone silently. I'd suggest (a) as a warning-only message in v1, no auto-delete.

3. **Binary files** (unlikely in our managed dirs, but possible if someone puts images in `.kiro/`). SHA-256 handles binary fine, but the `diff` prompt is meaningless for binaries. Detect binary (null bytes in first 512 bytes) and skip diff option for those.

**Interactive prompt UX — achievable with readline?** Yes, with caveats:
- Node's `readline` handles single-char prompts fine. The `[s]kip / [o]verwrite / [d]iff` pattern is straightforward.
- The existing `init.ts` already uses `readline.createInterface` for prompts — same pattern.
- For the batch confirmation (`Apply 3 source updates? [Y/n/list]`), readline works but we need to handle the `list` sub-flow (show files, then re-prompt). That's a nested prompt — doable but needs a small state machine.
- **Concern**: if `--dry-run` is active, we must never prompt. Verify this is gated early in the flow, not per-file.
- **Concern**: piped stdin (CI accidentally running without `--dry-run`). Detect `!process.stdin.isTTY` and either fail with a helpful message or behave as `--dry-run`.

**Rough implementation effort:** 7–9 subtasks:

1. Package resolution + version detection (small — exists in init.ts already)
2. Manifest load/save + schema (small)
3. File scanning + SHA-256 hashing (medium)
4. Classification engine (medium — the core logic)
5. `.designerpunkignore` parsing + matching (small)
6. Report/summary output formatting (small)
7. Interactive prompt system (medium — readline + diff display)
8. Apply logic (copy/overwrite + manifest update) (medium)
9. Tests (medium-large — mock fs, multiple scenarios)

Total estimate: ~2–3 focused sessions. Not trivial, but well-scoped.

---

**DX Edge Cases:**

**Package not installed (node_modules missing):**
- Fail fast: `❌ @3fn/core not installed. Run \`npm install\` first.`
- Check for `node_modules/@3fn/core/package.json` existence, not just `node_modules/`.
- This also catches `npm ci` failures or fresh clones without install.

**Monorepo with hoisted deps:**
- `node_modules/@3fn/core` may be at the workspace root, not the package dir.
- Resolution strategy: use `require.resolve('@3fn/core/package.json')` instead of hardcoded `node_modules/@3fn/core/package.json`. This follows Node's resolution algorithm and handles hoisting, symlinks (pnpm), and nested `node_modules` correctly.
- This is what `resolvePackageRoot()` in the existing CLI partially does but from `__dirname`. For sync running in consumer context, `require.resolve` from `process.cwd()` is the right approach.
- **Fallback**: if `require.resolve` fails, try `path.join(process.cwd(), 'node_modules/@3fn/core')` as a last resort, then fail with a clear error.

**`.designerpunkignore` glob patterns vs exact paths:**
- Support both. Use `minimatch` (already a transitive dep via Jest/glob) or the built-in `path.matchesGlob` (Node 22+, but we shouldn't depend on that yet).
- Patterns: `*.md` matches in any dir, `**/*.md` matches recursively, `.kiro/steering/Custom-Doc.md` matches exactly.
- Anchor behavior: patterns without `/` match basenames; patterns with `/` match from project root. Same semantics as `.gitignore` — our audience already knows this.
- **Implementation note**: read the file line-by-line, strip comments (`#`) and empty lines, compile to matchers once, test each file path against all matchers. Simple and fast for our file counts (~100 files).

---

**Additional observations:**

1. **Thurgood's flag about `.designerpunkignore` being committed** — agree. Add a note that `init` should create a default `.designerpunkignore` with a comment header explaining the format. This gives consumers a breadcrumb to discover the feature.

2. **Dependency on Spec 114** — I don't think this is a hard blocker. Sync copies files; the generation pipeline consumes them. As long as sync doesn't break the file structure that the pipeline expects (and it won't — it's copying from the same package), they're independent. I'd deprioritize this dependency unless there's a specific file format change in 114 that affects what we're syncing.

3. **The `diff` package** — I'd prefer to vendor a minimal diff implementation (or use Node's built-in `child_process` to call `diff` if available) rather than adding a runtime dependency to the CLI. But if we already have `diff` as a transitive dep, using it directly is fine. Worth checking.

4. **Performance** — SHA-256 hashing ~100 files is trivial (<50ms). No streaming needed; read whole file, hash, done.

#### [ADA R1] — Token/Component Source Review

**Overall Assessment**: The two-tier model is architecturally sound from a token perspective. The "confirm all" policy for `src/tokens/` and `src/components/core/` is the right call — these files are the consumer's canonical source of truth once `tokenSource` is configured. Auto-applying here would be the exact problem `tokenSource` was designed to solve (letting consumers diverge intentionally).

**[@ADA Q1] — Files That Should NEVER Be Synced**

Yes. Three categories of files in the source tier should be structurally excluded (not just ignorable via `.designerpunkignore`, but excluded from the sync manifest entirely):

1. **`src/tokens/component/` files created by the product** — The package ships some component token files (e.g., `progress.ts`), but products create their own (e.g., a product-specific `src/tokens/component/checkout-flow.ts`). Sync should only consider files that exist in the package. Files present in the project but NOT in the package are product-created — they must never appear in sync reports or be touched. The current classification logic handles this implicitly (sync only iterates package files), but the design outline should explicitly state this direction-of-comparison guarantee.

2. **`src/tokens/themes/` override files** — The package ships base theme files (`dark/SemanticOverrides.ts`, `wcag/SemanticOverrides.ts`, `dark-wcag/SemanticOverrides.ts`). These ARE syncable. But if the product registers custom themes via `designerpunk.config.ts` and creates additional theme directories (e.g., `src/tokens/themes/brand-night/SemanticOverrides.ts`), those must be excluded by the same package-direction logic. Again, likely implicitly handled, but worth an explicit note.

3. **`src/components/core/` component token files with known duplicates** — My May 9 issue documented that `avatar-sizing.tokens.ts` had to be manually deleted to resolve a registry conflict. If the package still ships this file (and Spec 114's `allowOverwrite: true` handles it at runtime), sync might reintroduce it into a project that intentionally deleted it. Recommendation: the `.designerpunkignore` file should be pre-seeded with known problematic files, OR sync should check the `allowOverwrite` story and document that overwritten files won't cause double-registration.

**[@ADA Q2] — False "Unchanged" Risk from Semantic Dependency Changes**

Yes, this is a real risk, specifically for **semantic token files** (`src/tokens/semantic/*.ts`) that reference primitives by name.

**The scenario**: A primitive token's VALUE changes in a new package version (e.g., `space125` goes from 10px to 12px). The consumer's `src/tokens/semantic/SpacingTokens.ts` references `space125` by name — its content hash is identical to the package version because neither file's TEXT changed. The sync correctly reports "unchanged." But the RESOLVED VALUE of the semantic token did change, because the upstream primitive it references changed.

**My assessment**: This is acceptable behavior for v1, with a caveat. The sync command's job is file-level comparison, not semantic analysis. The real question is whether the consumer's primitive file (`src/tokens/SpacingTokens.ts`) gets flagged as changed — and it WILL, because the primitive file's content hash DID change (the value literal is different). So the consumer sees the primitive change, confirms it, and the semantic resolution follows naturally at generation time.

**Where it breaks**: If a primitive's `mathematicalRelationship` description changes but the actual VALUE stays the same (documentation-only change to a primitive), the hash changes, sync flags it, consumer updates it — semantic tokens resolve identically. No harm. The risk is only if the pipeline resolves references at sync time rather than generation time — and it doesn't. Sync is content-level, generation is semantic-level.

**Counter-argument**: A consumer who selectively applies some primitive updates but skips others could end up with a split-brain state where some semantics reference updated primitives and others reference stale ones. This is intentional friction — the "confirm" step forces the consumer to think about it. But the sync report should ideally group related files (e.g., "These 3 primitive files are updated; the following 12 semantic files reference them"). That's a v2 enhancement, not v1.

**Two-Tier Model Review**

The tier split by directory is correct. One refinement worth considering:

- **`src/tokens/index.ts`** (the barrel file) — This file is auto-generated-ish and rarely consumer-edited, but it's in the source tier. After Spec 114 removes barrel import dependencies from generators, syncing this file is safe because nothing in the generation pipeline reads from it at runtime. However, consumers may have added custom re-exports (e.g., for their build tooling). Keeping it in "confirm" tier is appropriate.

- **`src/tokens/themes/types.ts`** — This is a type definition file that rarely changes and is never consumer-edited. It could arguably be governance-tier. But since it's in `src/`, keeping it in source-tier is the simpler rule. Don't special-case.

**Spec 114 Interaction — Bug Reintroduction Risk**

The question asks about files where sync could reintroduce fixed bugs beyond `generateTokenIndex.ts`. Based on my knowledge of the pipeline:

1. **`src/generators/generateTokenIndex.ts`** — Post-114, this file has no barrel imports. Syncing the package version would give the FIXED version. No reintroduction risk here. ✅

2. **`src/cli/loadComponentTokens.ts`** — Spec 114 adds `allowOverwrite: true` logic. If a consumer syncs BEFORE 114 ships in the package but AFTER applying 114 locally, they'd lose the fix. But the design outline says "Spec 114 completes first" — so the synced package would include 114's fixes. ✅

3. **`src/cli/generateProductTokens.ts`** — Spec 114 removes the redundant `generateTokenIndex()` call. Same package-ships-fix logic applies. ✅

4. **`src/registries/ComponentTokenRegistry.ts`** — The registry's `allowOverwrite` option is a Spec 114 addition. If the package ships with this, sync would bring it in. But if a consumer has locally patched the registry with a DIFFERENT fix (e.g., silently skipping duplicates), sync would flag it as a conflict correctly. Acceptable.

5. **REAL RISK: `src/tokens/component/progress.ts`** — This file currently has stale relative imports (`../../tokens/SpacingTokens` instead of `../SpacingTokens`). My May 9 issue documented fixing these manually. If the PACKAGE version still has the stale imports (because the fix was local, not upstream), syncing would reintroduce the broken import paths. The `init` command applies `rewriteBuildImports()` transform for `@3fn/core/build` paths, but it does NOT transform relative token imports. **Recommendation**: Either the package should ship with corrected imports, OR `sync` should apply the same `rewriteBuildImports` transform that `init` applies. Currently the design outline doesn't mention any content transforms during sync — only hash comparison and copy.

**Actionable Recommendation**: Add a "Content Transforms" section to the design specifying that sync applies the same `rewriteBuildImports` transform as `init` when copying source-tier `.ts` files. Without this, sync could reintroduce import path issues that `init` would have caught on a fresh setup.

---

## Requirements Feedback

### Context for Reviewers
- 10 requirements covering package comparison, classification, manifest, two-tier apply, interactive conflicts, dry-run, force, ignore, reporting, documentation → requirements.md
- Two-tier model encoded in R4: governance auto-applies, source always confirms → requirements.md § "Requirement 4"
- Content transforms for .ts files required in R4 AC4 → requirements.md § "Requirement 4"
- Package-direction guarantee in R1 AC4 → requirements.md § "Requirement 1"

#### [ADA R2] — Requirements Review

**R4 AC4 (Content Transforms) — Sufficient?**

R4 AC4 states: "WHEN a source-tier `.ts` file is applied THEN the `rewriteBuildImports()` transform SHALL be applied (same as `init`)."

This IS sufficient. My R1 review flagged `src/tokens/component/progress.ts` as having "stale relative imports" (`../../tokens/SpacingTokens` instead of `../SpacingTokens`). On closer inspection, both paths resolve identically — from `src/tokens/component/`, `../../tokens/SpacingTokens` resolves to `src/tokens/SpacingTokens`, which is correct in the consumer project because the directory structure is mirrored by `init`/`sync`.

The ONLY import path that needs transformation is `../build/tokens` → `@3fn/core/build`, because the `build/` directory is NOT copied to the consumer (it stays in the package, accessed via the `@3fn/core/build` package export). `rewriteBuildImports` handles exactly this case. No additional transforms needed.

**Correction to my R1 feedback**: The "stale relative import" concern in `src/tokens/component/progress.ts` was a false alarm. The paths are verbose (`../../tokens/` vs `../`) but functionally correct in both the package and consumer project. Sync copying this file as-is (with only `rewriteBuildImports` applied) will not break imports.

**R1 AC4 (Package-Direction Guarantee) — Well-formed.** This is critical and correctly stated. Consumer-created files (e.g., `src/tokens/component/checkout-flow.ts`) will never appear in sync reports because the scanner only iterates package files.

**Minor gap — R4 does not specify `__tests__` exclusion.** The `init` command explicitly excludes `__tests__/` directories from all copy operations. R4 and R1 don't mention this. If sync iterates all package files under managed dirs, it would discover test files the consumer never received and report them as "New." Recommendation: Add AC to R1 or R4: "WHEN scanning managed directories THEN `__tests__/` subdirectories SHALL be excluded from scanning."

---

## Design Feedback

### Context for Reviewers
- Modular architecture: src/cli/sync/ with 9 focused files → design.md § "Architecture"
- Full TypeScript interfaces for all components → design.md § "Components and Interfaces"
- Reuses init's rewriteBuildImports transform → design.md § "Design Decisions" Decision 5
- Error handling table covers all failure modes → design.md § "Error Handling"

#### [ADA R2] — Design Review

**Decision 5 (Content Transform Reuse) — Correct and sufficient.**

The `rewriteBuildImports` regex (`/from\s+['"]\.\.\/(?:\.\.\/)*build\/tokens(?:\/[^'"]*)?['"]/g`) handles the only import pattern that breaks in consumer projects — relative paths into the `build/` directory (which isn't copied to consumers). All other relative imports (`../../tokens/SpacingTokens`, `../types`, etc.) resolve correctly because the directory structure is mirrored.

`init` applies the transform conditionally: only to files with `.ts` extension. The design's `transforms.ts` should replicate this condition (apply to source-tier `.ts` files only, skip `.md`, `.json`, etc.). The design states this in the Applier section ("apply transform if .ts source-tier") — correct.

**MANAGED_DIRS — Missing `__tests__` exclusion.**

The `ManagedDir` interface and `MANAGED_DIRS` constant don't specify exclusion patterns. `init` uses `{ exclude: ['__tests__'] }` on every `copyDir` call for source-tier directories. Without this, `FileScanner` would hash test files in the package that were never copied to the consumer, producing false "New" classifications for every test file under `src/tokens/__tests__/`, `src/components/core/*/__tests__/`, etc. This is a significant source of noise — there are hundreds of test files.

**Recommendation**: Add an `excludeDirs?: string[]` field to `ManagedDir`:

```typescript
interface ManagedDir {
  path: string;
  tier: 'governance' | 'source';
  excludeDirs?: string[];  // e.g., ['__tests__', 'generated']
}

const MANAGED_DIRS: ManagedDir[] = [
  { path: '.kiro/steering', tier: 'governance' },
  { path: '.kiro/agents', tier: 'governance' },
  { path: '.kiro/skills', tier: 'governance' },
  { path: 'src/tokens', tier: 'source', excludeDirs: ['__tests__'] },
  { path: 'src/types', tier: 'source', excludeDirs: ['__tests__', 'generated'] },
  { path: 'src/components/core', tier: 'source', excludeDirs: ['__tests__'] },
];
```

This mirrors exactly what `init` does and prevents the false-positive "New" report for hundreds of test files.

**`transforms.ts` — Extract vs import?**

Design Decision 5 says "Reuse init's transform." The task (4.1) says "Import and reuse `rewriteBuildImports` from init (or extract shared utility)." Currently `rewriteBuildImports` is a private function at the bottom of `init.ts`. Options:

1. Extract to a shared utility (e.g., `src/cli/shared/transforms.ts`)
2. Import directly from `init.ts` (requires exporting it)
3. Duplicate the one-liner regex in `sync/transforms.ts`

Recommendation: Option 1 (extract). The function is a single regex replace — trivial to extract. Both `init.ts` and `sync/transforms.ts` import from the shared location. This is cleaner than exporting from `init.ts` (which is a CLI entrypoint, not a library module).

**No additional source-tier transforms needed beyond `rewriteBuildImports`.** I've verified all import patterns in:
- `src/tokens/component/progress.ts` — `../../build/tokens` (handled) + `../../tokens/*` (resolves correctly)
- `src/components/core/*/tokens.ts` files — `../../../build/tokens` (handled) + `../../../tokens/*` (resolves correctly)
- `src/tokens/semantic/*.ts` — `../SpacingTokens` etc. (resolves correctly, no `build/` imports)
- `src/tokens/themes/*/SemanticOverrides.ts` — relative imports to sibling files (resolves correctly)

---

## Tasks Feedback

### Context for Reviewers
- 5 parent tasks, 14 subtasks, all Sparky-owned → tasks.md
- Layered sequence: infrastructure (Task 1) → classification (Task 2) → UX (Task 3) → integration (Task 4) → documentation (Task 5) → tasks.md § "Implementation Plan"
- Task 2.1 is the only Architecture-typed subtask (classification logic); rest are Implementation/Setup → tasks.md
- Documentation subtasks in Task 5 cover CLI help, Integration Guide, init updates → tasks.md § "Task 5"

#### [ADA R2] — Tasks Review

**Task 1.2 (FileScanner) — Needs `__tests__` exclusion specification.** The task says "Recursively scan directories" but doesn't mention excluding `__tests__/` (or other dirs excluded by `init`). This is the same gap identified in the design. Add to the subtask: "Exclude directories matching `ManagedDir.excludeDirs` patterns during recursive scan."

**Task 4.1 (Content Transforms) — Clear and correct.** The task correctly identifies the extraction/reuse decision. No additional source-tier transforms are needed beyond `rewriteBuildImports`. My R1 concern about `progress.ts` was a false alarm — the relative imports resolve correctly in consumer projects.

**No source-tier files need special handling beyond `rewriteBuildImports`.** Specifically:
- `src/tokens/component/progress.ts`: Relative imports to `../../tokens/SpacingTokens` are correct in consumer context.
- `src/components/core/*/tokens.ts`: Relative imports to `../../../tokens/*` are correct in consumer context.
- `src/tokens/themes/*/SemanticOverrides.ts`: Only local relative imports, no `build/` references.
- `src/types/*.ts`: Type definitions with no relative imports outside their own tree.

**Task 5.2 — Consider seeding `.designerpunkignore` with `__tests__` note.** If the `excludeDirs` approach is adopted (recommended), this is unnecessary. But if it's not, the default `.designerpunkignore` should document that `__tests__/` directories are excluded by default. The current task spec just says "create default `.designerpunkignore` with comment header explaining the format."

---

## Overall Assessment [ADA R2]

**Does this spec correctly address the manual-cp workflow from the May 9 issue?** Yes, comprehensively. The issue documented 16 stale files (2 new steering docs, 8 modified steering docs, 6 agent files) requiring manual `cp` from `node_modules/`. This spec:

1. ✅ Detects stale files via SHA-256 comparison
2. ✅ Classifies them correctly (new vs updated vs conflict)
3. ✅ Auto-applies governance-tier files (steering docs, agents) — exactly what was manually copied
4. ✅ Confirms source-tier files — appropriate caution for build-critical files
5. ✅ Tracks sync state in a committed manifest — enables team-wide visibility
6. ✅ Provides escape hatches (`.designerpunkignore`, `--force`, `--dry-run`)

**One gap to address before implementation**: The `__tests__` directory exclusion during scanning. Without it, the first sync would report hundreds of "New" test files that were intentionally never copied to the consumer. This is a UX problem, not a correctness problem — but it would severely undermine trust in the tool on first use.

**Counter-argument to my own recommendation**: You could argue that `__tests__` exclusion should be handled by the package's `files` field in `package.json` (i.e., don't ship test files in the package at all). That's a cleaner architectural solution but is outside this spec's scope. For now, matching `init`'s exclusion behavior is the pragmatic path.

**Verdict**: Spec is well-formed and implementable. One design amendment needed (`excludeDirs` on `ManagedDir`), one minor requirement gap (explicit AC for `__tests__` exclusion). No blockers.

---

## Requirements Feedback — R2

#### [SPARKY R2]

**Overall**: Requirements are solid. All my R1 edge cases are captured.

**Edge case coverage verification:**

1. **Non-TTY** — ✅ R6 AC3 covers this explicitly. Good.
2. **Monorepo/hoisted deps** — ✅ R1 AC1 specifies `require.resolve`. Correct approach.
3. **Deleted-from-package** — ✅ R2 AC6 handles this as informational warning. No auto-delete in v1 is the safe call.
4. **Consumer-created files** — ✅ R1 AC4 (package-direction guarantee). Correct.

**Minor gaps:**

- **R3 AC4 (bootstrap)**: "writing the manifest without treating files as conflicts" — doesn't specify WHOSE hash goes in the manifest during bootstrap. When a project file differs from the package file and no manifest exists, should the manifest record the project file's hash or the package file's hash? It MUST be the project file's hash — the consumer's current state is their baseline. Future syncs will compare the project's hash against the manifest's hash to detect consumer edits. If we store the package hash, we'd immediately flag the file as "consumer modified" on the next sync. Suggest clarifying: "recording the project file's current hash as baseline for future edit detection."

- **R4 AC4 (transforms)**: The requirement references `rewriteBuildImports()` but doesn't specify that this function must be extracted from `init.ts` (where it's currently a private function). Not a requirements-level concern, but noting it creates an implicit refactoring need.

- **R8 AC2 (.gitignore semantics)**: Specifies ".gitignore semantics" without scoping which subset. Full .gitignore has: negation patterns (`!foo`), directory-only trailing `/`, re-inclusion after parent exclusion, and `**` double-star globbing. **Recommendation for v1**: Support glob patterns (minimatch), exact paths, `#` comments, blank line skipping, and `**` recursion. Defer negation patterns (`!`) to v2 — they add complexity with minimal value for our file count (~100 managed files). If this needs to be explicit in the requirement, add: "Negation patterns are not supported in v1."

- **Missing AC**: Ada's R2 flagged that `__tests__/` directories should be excluded from scanning. I agree this needs an explicit AC (either in R1 or a new requirement): "WHEN scanning managed directories THEN `__tests__/` and `generated/` subdirectories SHALL be excluded." Without this, sync would report hundreds of "New" test files on first run — a trust-destroying UX failure.

- **R6 AC3 + R7 mutual exclusion**: The requirements don't specify what happens with `sync --force` in a non-TTY environment. `--force` says "overwrite everything without prompting," while non-TTY says "behave as dry-run." These conflict. **Recommendation**: `--force` overrides the non-TTY dry-run guard. If someone explicitly passes `--force` in CI, they want the apply. The non-TTY guard exists to prevent accidental prompts hanging a pipeline — `--force` already eliminates prompts.

---

## Design Feedback — R2

#### [SPARKY R2]

**Architecture: workable. Ready to implement.**

The 9-file module structure is clean with clear single-responsibility boundaries. Each component is independently testable with well-defined interfaces.

**Interface refinements needed:**

1. **`PackageResolver.resolvePackage(projectRoot)` — resolution base matters.**
   `require.resolve` resolves relative to the calling file's location, not an arbitrary path. For consumer context, use:
   ```typescript
   require.resolve('@3fn/core/package.json', { paths: [projectRoot] })
   ```
   The `paths` option (Node 12+) overrides the default resolution algorithm to start from `projectRoot`. This correctly handles monorepo hoisting. The design interface is fine — just noting the implementation detail.

2. **Source-tier batch confirmation not modeled in Prompter interface.**
   The design shows `resolveConflicts()` for per-file conflict handling, but the two-tier apply flow (R4 AC2) also requires batch confirmation for source-tier `updated-safe` files ("Apply N source updates? [Y/n/list]"). This isn't in the Prompter interface. Suggest adding:
   ```typescript
   function confirmSourceBatch(
     files: ClassifiedFile[]
   ): Promise<{ approved: ClassifiedFile[]; skipped: ClassifiedFile[] }>;
   ```

3. **`ManagedDir` needs `excludeDirs` field** (per Ada's R2). The current interface doesn't model the `__tests__` exclusion. Without it, the scanner produces false positives. This is the same gap both Ada and I identified.

**minimatch: correct choice, needs to be a direct dependency.**

- `minimatch` v3.1.2 exists as a transitive dep via Jest. BUT — this is published CLI code consumers run via `npx`. Relying on a transitive dep from a devDependency is fragile. If a consumer doesn't have Jest installed, `minimatch` won't be in their `node_modules`.
- **Action required**: Add `minimatch` to `dependencies` in `package.json`. Same for `diff` (v4.0.2, also transitive via Jest).
- Combined addition: `"minimatch": "^3.1.2"` and `"diff": "^4.0.2"` in `dependencies`. These are small, MIT-licensed, well-maintained.
- Alternative: `picomatch` (faster, smaller) instead of `minimatch`. But `minimatch`'s `.gitignore`-style matching is better documented for our use case. Stick with minimatch.

**`rewriteBuildImports` extraction:**

The function is a 4-line regex replace at line 436 of `init.ts`. Both `init` and `sync` need it. Options:
- Extract to `src/cli/shared/transforms.ts` (clean, both import from shared location)
- Export from `init.ts` (makes init a library module — conceptually wrong, it's an entry point)
- Duplicate in `sync/transforms.ts` (DRY violation, but it's 4 lines)

**Recommendation**: Extract to `src/cli/shared/transforms.ts`. It's the right separation of concerns and makes the dependency explicit. This should be an early subtask (before Task 4.1) so existing init tests validate the extraction didn't break anything.

**readline correctness:**

Verified against `init.ts` (which already uses `readline.createInterface`). Key implementation notes:
- `readline.createInterface({ input: process.stdin, output: process.stdout })` — standard pattern
- MUST check `process.stdin.isTTY` BEFORE creating the interface (non-TTY stdin + readline = potential hang)
- Close the interface after all prompts (`rl.close()`) — otherwise process hangs
- The nested state machine for batch confirmation + per-file conflict is manageable: one outer loop for batch, one inner loop for conflicts with diff re-prompt

**Error handling: one case missing.**

Downgrade scenario: manifest records `version: "12.0.0"` but installed package is `11.8.0`. Consumer rolled back. Behavior should be: log warning "⚠️ Manifest was synced against v12.0.0 but installed version is v11.8.0 (possible downgrade)" and proceed normally. Hash comparison still works regardless of version direction.

**`--force` + non-TTY interaction** (flagged in requirements above):

The design's data flow shows `if --dry-run or non-TTY: return` — this would block `--force` in CI. The flow should be:
```
if (options.dryRun) return;
if (!process.stdin.isTTY && !options.force) {
  log("Non-interactive environment detected — running in dry-run mode.");
  return;
}
```

---

## Tasks Feedback — R2

#### [SPARKY R2]

**Subtask count alignment:**

14 subtasks vs my R1 estimate of 7-9 work units. The granularity is correct — my estimate grouped what the tasks split into independently-committable units. The mapping:

| My R1 Estimate | Tasks Mapping | Notes |
|---|---|---|
| Package resolution | 1.1 | Small, existing pattern |
| Manifest | 1.3 | Medium |
| File scanning | 1.2 | Medium |
| Classification | 2.1 | Heavy — core logic |
| Ignore | 1.4 | Small |
| Reporting | 3.1 | Small |
| Prompting | 3.2 | Medium (state machine) |
| Apply | 4.1 + 4.2 + 4.3 | Split correctly |
| Tests | Distributed | Correct approach |
| (not estimated) | 5.1 + 5.2 + 5.3 | Docs/polish — additive |

Total effort: 2-3 focused sessions confirmed.

**Sequencing: correct, one dependency to add.**

Task 4.1 (transforms) requires `rewriteBuildImports` extracted from `init.ts`. This refactor should happen BEFORE Task 4.1 — ideally as part of Task 1 (infrastructure setup). If we wait until Task 4.1, we're mixing refactoring (touching init.ts) with new feature code (sync transforms), making the commit harder to review.

**Suggestion**: Add subtask **1.0** or fold into 1.1: "Extract `rewriteBuildImports` from `init.ts` to `src/cli/shared/transforms.ts`; update `init.ts` to import from shared location; verify existing init tests still pass." This is a 10-minute task but deserves its own commit for clean history.

**Missing items:**

1. **Dependency addition subtask**: Adding `minimatch` and `diff` as direct dependencies to `package.json`. Fold into Task 1.4 (IgnoreFilter) since that's where minimatch is first used. Add a note: "Add `minimatch` and `diff` to package.json `dependencies` before implementing."

2. **`__tests__` exclusion**: Task 1.2 (FileScanner) says "Recursively scan directories" but doesn't mention excluding `__tests__/`. Per Ada's R2 and my own analysis, this MUST be specified. Hundreds of test files would produce false "New" reports. Add to 1.2: "Exclude directories matching `ManagedDir.excludeDirs` (e.g., `__tests__/`, `generated/`)."

3. **Task 5.3 smoke test environment**: "Manual smoke test: run sync in a test project" — what project? Our repo IS the package. We need either:
   - A fixture directory in the test suite (recommended — `src/cli/sync/__tests__/fixtures/`)
   - Or a documented manual test procedure using `npm pack` + temp directory
   The integration tests in 4.3 should use fixtures, making 5.3's smoke test redundant if integration coverage is thorough.

4. **`.kiro/skills/` in MANAGED_DIRS**: The design includes this but `init.ts` doesn't currently copy a `.kiro/skills/` directory. If the package doesn't ship skills yet, the scanner should handle "directory doesn't exist in package" gracefully (return empty array, not throw). This is a FileScanner edge case for Task 1.2.

**No blockers. Ready to implement on approval.**
