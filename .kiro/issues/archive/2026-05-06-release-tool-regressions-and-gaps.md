# Release Tool Regressions and Gaps Surfaced During Spec 101

**Date**: 2026-05-06
**Severity**: Medium (tool is functional; workarounds applied during Spec 101; polish fixes improve reliability for future releases)
**Agent**: Thurgood (captured Civitas observations) + Ada (surfaced during Spec 101 Tasks 2.1 and 2.2)
**Blocks**: Nothing directly — Spec 101 used workarounds; future releases will encounter same issues without fixes
**Status**: 📝 Tracked
**Suggested Owner**: Ada (Rosetta-domain release pipeline)

---

## Context

Spec 101 was the first real end-to-end exercise of the release tool against a genuine publish event. Running `npm run release:notes` and `npm publish` for `@3fn/core@11.0.0` surfaced four distinct release-tool behaviors that each required manual intervention:

- Two regressions from the tool's expected convention (filename format + sidecar artifacts)
- One UTC-vs-local timezone bug in date generation
- One chicken-and-egg discovery gap in how the tool's `SummaryScanner` discovers spec summaries within a single-spec publish cycle

All four are release-pipeline concerns that share a common domain (Ada's release tooling). Grouping them into one follow-up keeps the "release-tool needs work" story cohesive rather than fragmenting across multiple issue files.

Separately, Spec 101 Task 2.3 surfaced five **consumer-onboarding** gaps that live in a different issue file (`2026-05-07-consumer-onboarding-gaps.md`). Those are distinct from these release-tool issues — different surface area, different root causes. Do not conflate.

---

## Issue 1: Release Notes Filename Format Regression

**Location**: `src/tools/release/cli/ReleasePipeline.ts:76`

**Current behavior**:
```typescript
const filename = `release-${recommendation.recommendedVersion}.md`;
// Produces: release-11.0.0.md
```

**Expected behavior** (convention established back to 9.0.0):
```typescript
const filename = `RELEASE-NOTES-${recommendation.recommendedVersion}.md`;
// Produces: RELEASE-NOTES-11.0.0.md
```

**Evidence of convention**: All 10 historical release notes files in `docs/releases/` use `RELEASE-NOTES-X.Y.Z.md` format:
- `RELEASE-NOTES-9.0.0.md` through `RELEASE-NOTES-9.4.0.md` (5 files, March 2026)
- `RELEASE-NOTES-10.0.0.md` through `RELEASE-NOTES-10.2.0.md` (4 files, March-April 2026)
- `RELEASE-NOTES-11.0.0.md` (Spec 101, after manual rename)

The tool appears to have regressed from the prior convention during a refactor. No discoverable rationale in commit history for the format change.

**Workaround applied during Spec 101**: Manual rename via `mv docs/releases/release-11.0.0.md docs/releases/RELEASE-NOTES-11.0.0.md` after `npm run release:notes` emitted the file with the wrong format.

**Suggested Fix**: One-line change at `ReleasePipeline.ts:76`:
```typescript
const filename = `RELEASE-NOTES-${recommendation.recommendedVersion}.md`;
```

Consider adding a test in `ReleasePipeline.test.ts` that asserts the emitted filename matches `/^RELEASE-NOTES-\d+\.\d+\.\d+\.md$/`.

---

## Issue 2: Unwanted Sidecar Artifacts

**Location**: `src/tools/release/cli/ReleasePipeline.ts:77-78`

**Current behavior**:
```typescript
fs.writeFileSync(path.join(outputDir, filename), notes.public, 'utf-8');
fs.writeFileSync(path.join(outputDir, `${filename}.internal.md`), notes.internal, 'utf-8');
fs.writeFileSync(path.join(outputDir, `${filename}.json`), JSON.stringify(notes.json, null, 2), 'utf-8');
```

**Problem**: The tool writes three files per release-notes generation:
1. `RELEASE-NOTES-11.0.0.md` (or `release-11.0.0.md` pre-Issue-1-fix) — the public notes, canonical output
2. `RELEASE-NOTES-11.0.0.md.internal.md` — internal notes, never part of prior release conventions
3. `RELEASE-NOTES-11.0.0.md.json` — JSON blob, generator artifact, never part of prior release conventions

Historical `RELEASE-NOTES-9.0.0.md` through `RELEASE-NOTES-10.2.0.md` have no `.internal.md` or `.json` sibling files. These sidecars appear to be a newer addition that wasn't coordinated with the release-notes convention.

The `.internal.md` and `.json` sidecars clutter `docs/releases/`, which is a curated release-history directory meant to ship clean in the repo. They also trigger the tool's own "⚠️ Output directory has N files — consider cleaning old releases" warning unnecessarily.

**Workaround applied during Spec 101**: Manual `rm docs/releases/release-11.0.0.md.internal.md docs/releases/release-11.0.0.md.json` after each generation pass.

**Suggested Fixes** (pick one):
1. **Remove sidecar writes entirely** — the public `.md` is the canonical deliverable; `.internal.md` and `.json` appear to serve no consumer of the published notes. If they're needed for internal tooling, emit to a different directory (e.g., `.release-cache/` that's gitignored).
2. **Gate sidecars behind a flag** — `npm run release:notes --with-internals` emits all three; default emits only the public `.md`.
3. **Document the sidecars' purpose** — if they serve a genuine internal need (analytics? replay?), document why they exist and add them to `docs/releases/.gitignore` so they don't pollute the git history.

Preferred: option 1 if the sidecars have no consumer, option 2 if they do.

---

## Issue 3: UTC Timezone Bug in Release Notes Date Field

**Location**: `src/tools/release/pipeline/NotesRenderer.ts:20`

**Current behavior**:
```typescript
const date = new Date().toISOString().split('T')[0];
```

**Problem**: `toISOString()` always returns the ISO-8601 representation in UTC. When the tool is run past ~20:00 local time in PDT (17:00 PST), the local date and the UTC date diverge. The release notes emit the UTC date, which may be "tomorrow" from the operator's perspective.

**Observed during Spec 101 Task 2.1 on 2026-05-06**: Ada ran `npm run release:notes` at approximately 21:00 PDT. The generated release notes header read `**Date**: 2026-05-07` instead of `2026-05-06`. This is inconsistent with all 10 prior `RELEASE-NOTES-*.md` files, which use the date-of-generation in the operator's local timezone.

**Workaround applied during Spec 101**: Manual edit of the generated `RELEASE-NOTES-11.0.0.md` to correct the date field to `2026-05-06` before commit.

**Suggested Fix**: Use local-timezone date formatting:
```typescript
const now = new Date();
const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
```

Or use `toLocaleDateString('en-CA')` which returns the local date in `YYYY-MM-DD` format (matching ISO-8601 date shape without the time or timezone component).

Consider adding a test in `NotesRenderer.test.ts` that verifies the date field uses the operator's local date, not UTC. Existing tests use `jest.useFakeTimers().setSystemTime(new Date('2026-02-27'))` which sets the UTC midnight of that date — those tests don't catch this bug because they're timezone-neutral by construction.

---

## Issue 4: SummaryScanner Chicken-and-Egg Discovery Gap

**Location**: `src/tools/release/pipeline/SummaryScanner.ts:26-32`

**Current behavior**:
```typescript
const output = execSync(
  `git log --diff-filter=A --name-only --pretty=format: ${tag.tag}..HEAD -- "${SUMMARY_GLOB}"`,
  // SUMMARY_GLOB = 'docs/specs/*/task-*-summary.md'
);
```

The scanner uses `git log --diff-filter=A` (added files) between the last release tag and `HEAD`. This finds only files that have been **committed**. Working-tree additions not yet committed are invisible to the scanner.

**Problem**: A spec that culminates in a publish event (Spec 101 is the canonical example) cannot have its own work reflected in its own release notes unless the spec's summary doc is committed *before* `release:notes` runs.

**Observed during Spec 101 Task 2.1**: First run of `release:notes` returned 19 changes with ZERO Spec 101 content (all 19 were from earlier specs between `v10.2.0` and the then-uncommitted Spec 101 work). To unblock, Ada had to create `docs/specs/101-package-publish-readiness/task-1-summary.md`, commit it (commit `2cc76e5d`), then re-run `release:notes` to pick up Spec 101's own narrative.

This is a legitimate chicken-and-egg: the summary doc needs to describe work that includes the release itself, but the tool that generates the release needs the summary doc to already be committed.

**Workaround applied during Spec 101**: Commit the summary doc BEFORE running `release:notes` within the same spec execution. Not documented in any steering doc; Ada discovered the constraint empirically.

**Suggested Fixes** (more architectural — pick an approach):

1. **Scan working tree in addition to committed history**. Modify `SummaryScanner` to union `git log --diff-filter=A` results with `git status --porcelain` results, extracting untracked or added-but-not-committed `docs/specs/*/task-*-summary.md` files. Would catch in-flight summary docs.

2. **Alternative source for change detection**. Scan `.kiro/specs/*/completion/task-*-summary.md` (completion docs' summary siblings) or spec-directory creation dates rather than relying on `docs/specs/` commits. Larger change; potentially more reliable.

3. **Spec-writer guidance in Process-Spec-Planning**. Document the constraint explicitly: "Summary documents for a parent task must be committed before running `release:notes` within the same spec execution." This is the lowest-effort fix (documentation only) but doesn't address the underlying tool limitation.

4. **Change the SummaryScanner glob to match `.kiro/specs/`**. If summary docs in `.kiro/specs/*/summary.md` existed (they don't currently — summaries live in `docs/specs/`), the scanner could find them without requiring them to already be in the public-facing `docs/` tree. Architectural change to the two-document workflow.

Preferred: option 1 (working-tree scan) for reliability without changing the governance workflow, combined with option 3 (documentation) as a belt-and-suspenders measure.

---

## Cross-Cutting Recommendation

All four issues trace to a single root cause: the release tool hadn't been exercised against a real end-to-end publish event under realistic conditions until Spec 101. Prior test coverage uses `jest.useFakeTimers()` (hiding the UTC bug), synthetic release notes generation in isolated test contexts (hiding the filename regression and sidecar accumulation), and never runs `git log` against a real repo (hiding the chicken-and-egg).

**Suggested follow-up spec scope**:
- Fix all 4 issues in one pass (small source-code changes + possibly one steering-doc update for Issue 4 documentation)
- Add integration-test coverage that runs the tool end-to-end against a scratch git repo with a real tag and real summary commits
- Verify historical `RELEASE-NOTES-*.md` files still conform to the fixed filename/date/sidecar conventions

Estimated scope: one small Parent task with 3-4 subtasks. Mechanical work with clear acceptance criteria (filename matches convention; no sidecars; dates match local timezone; in-flight summaries discovered before commit).

---

## References

- **Spec 101 (Package Publish Readiness)** — `task-2-completion.md` and `task-2-5-completion.md` (this issue's filing) for full context
- **Commit `2cc76e5d`** — the mid-execution commit of `task-1-summary.md` that unblocked Task 2.1 release-notes regeneration (Ada's workaround for Issue 4)
- **`docs/releases/RELEASE-NOTES-11.0.0.md`** — Spec 101's public notes, post-manual-cleanup (reference for the canonical format Issues 1, 2, 3 should produce)
- **Related but distinct**: `2026-05-07-consumer-onboarding-gaps.md` (Ada's issue file covering consumer-handoff surface area; do not merge scope with this file)
