# Full Project Audit — 2026-07-04

**Date**: 2026-07-04
**Status**: Findings recorded — dispositions proposed, pending Peter's triage
**Purpose**: Point-in-time full audit across five dimensions: mechanical health, security/packaging, code quality/architecture, repo hygiene, governance infrastructure
**Method**: Five parallel read-only audit agents (build/test, governance via Thurgood persona, code quality, security/packaging, repo hygiene), synthesized by Claude Code main session. Nothing was modified.

---

## Executive Summary

The engineering core is in excellent shape — zero TypeScript errors, all 9,063 tests passing across 381 suites, disciplined error handling, near-zero TODO debt. The problems live at the edges:

- 6 high-severity **production npm vulnerabilities**, almost all fixable with one non-breaking `npm audit fix`
- 25MB+ of **git-tracked debris** contradicting the repo's own gitignore
- ~2,800 LOC of **dead code shipping to npm** via `files: ["src/"]`
- **Copy-pasted infrastructure** across the three MCP servers (the named parallel-paths-drift failure mode, latent in Civitas)
- A governance corpus that is **structurally healthy but 72% past its own review threshold**

Two cross-cutting themes:

1. **The system is better at building than at shedding.** Dead directories, tracked coverage, a foreign starter app, stale strategy folders, 0-byte accident files — nothing gets deleted, and the `files: ["src/"]` glob leaks the accumulation into what consumers install.
2. **The parallel-paths-drift pattern root-caused twice in the token pipeline (Specs 117/118) is alive in the MCP servers**, where no contract test guards it. `FileWatcher.ts` has already diverged.

No CRITICAL findings reach consumers: no secrets are tracked or published, nothing runs on consumer install, both critical CVEs are dev-tree-only.

---

## 1. Mechanical Health — PASS across the board

| Check | Result |
|---|---|
| `npx tsc --noEmit` (full repo) | PASS — 0 errors |
| `npm run typecheck:scripts` | PASS |
| `npm test` (functional lanes) | PASS — 377/377 suites, 8,987/8,987 tests, 0 skipped/todo, 53s warm |
| `npm run lint` | PASS — 0 warnings/errors (scope: `src/components/**` only) |
| `npm run test:performance` | PASS — 44 tests (non-empty selection confirms the pre-July empty-lane bug is fixed) |
| `npm run test:performance:isolated` | PASS — 32 tests |

**Caveats (the enforcement gap, again — Spec 125's charter):**
- CI runs only the consumer-guard lane; full `npm test`, full `tsc`, and `build:validate` are not CI-gated
- Lint covers only `src/components/**` (repo-wide linting is a tracked deferred item under Spec 118)
- No `coverageThreshold` in either Jest config

Today's all-green state is verified by convention, not machinery. This audit is evidence for Spec 125's priority, not a new finding.

## 2. Security & Packaging

| Finding | Severity | Evidence |
|---|---|---|
| 6 HIGH prod vulns: direct `minimatch@9.0.5` (ReDoS ×3) + `@modelcontextprotocol/sdk@1.26.0` chain (hono, express-rate-limit, path-to-regexp, fast-uri). 2 CRITICAL dev-only (`basic-ftp`, `handlebars` via figma-console-mcp). 21 total. | HIGH | `npm audit` 2026-07-04. ~19/21 clear via plain `npm audit fix` + in-range SDK bump to 1.29.0. Only `diff@7→9` needs a semver-major (LOW). |
| Live GitHub PAT (repo + write:packages) + Figma PAT in local untracked `.env` | LOW (rotate as precaution) | Verified NOT tracked, NOT in git history, NOT in tarball. Correct pattern, but plaintext in an agent-read directory. |
| `personal-note.md` ships to public npm | LOW-MED (confirm intent) | `files` explicitly lists `.kiro/steering/`; the governance layer ships as a consumer-agent feature, so plausibly intentional. Resume does NOT ship — personal-note references it by filename (dangling ref for consumers). |
| Published surface: 2,558 files / 30.7MB unpacked | MEDIUM (informed trade-off) | Full `src/` (256k LOC incl. dead dirs + `.example.ts`), two MCP source trees, ~80 governance docs. |
| No consumer-install scripts (no postinstall/prepare) | CLEAN | Publisher-side only: `postpublish` auto-pushes `token-index/` to main if dirty (worth knowing it exists). |
| License consistent (Apache-2.0 both places); `repository.url` says `3fn/DesignerPunk.git` vs steering's `3fn/DesignerPunkv2` | LOW | One of the two URLs is stale. |
| 5 runtime deps a major behind: @octokit/rest, diff, js-yaml, minimatch, uuid | LOW-MED | Maintenance debt, not exposure. |

## 3. Code Quality & Architecture

**Overall: hygiene well above typical for 256k LOC** — 2 real TODOs in all of src/, 2 ts-ignores total (both intentional, in tests), 0.79 test:source ratio, structured error returns throughout, module-resolution surface heavily documented post-118.

| Finding | Impact | Evidence |
|---|---|---|
| MCP infra ring copy-pasted across the 3 servers: `StalenessGate.ts` **byte-identical ×3** (md5 `5d5a8037`, no canonical-copy marker), `TokenRefResolver.ts` 92% duplicate (app vs product), `FileWatcher.ts` forked and already diverged. Only 2 files flow through the existing `build:mcp-shared` seam. Domain logic (QueryEngine, indexers) is legitimately distinct — only the infra ring is copy-paste. | HIGH | All three servers esbuild-bundle from one repo → consolidating into `mcp-shared` is zero-cost at runtime. This is the 117/118 parallel-paths-drift shape, latent in Civitas. |
| Orphaned src directories shipped to npm: `src/performance/` (1,283 LOC, 0 importers, 0 tests), `src/workflows/` (1,524 LOC, test-only importer). Plus 630 LOC unimported `.example.ts` in `src/build/`. | HIGH | Deletion beats testing. Ships via `files: ["src/"]`. |
| `TokenFileGenerator.ts:~1845` path-probes a `__tests__` fixture (`acknowledged-differences.json`) at runtime; bare catch silently changes validation strictness on resolution failure | MEDIUM | Known-load-bearing (fixture explicitly shipped), but silent-behavior-change-on-require-failure is the fragility class 118 eliminated elsewhere. |
| God-object candidate: `DesignExtractor.ts` (3,620 LOC, 3.4× next-largest non-token file). Type-safety hotspots: `MathematicalConsistencyValidator.ts` (27 `any`), `ProductIndexer.ts` (26 `any`). | MEDIUM | Platform builders (~1.4–1.7k each) are large but structurally parallel — lower concern. |
| `scopedTsRequire` correctness is comment-enforced, not mechanically guarded (process-global `module._resolveFilename` mutation; jest-loader-injection convention every new call site must know) | MEDIUM | Consistent with the authored-but-unarmed pattern; 118's source-scan guard covers part of this class. |
| Two stub validators with TODOs (`PropertyTypeValidator.ts:35`, `MethodSignatureValidator.ts:36`); 2 empty catches (`ConsoleMCPClientImpl.ts:735`) | LOW | |

## 4. Repo Hygiene

| Finding | Severity | Evidence |
|---|---|---|
| **Entire `coverage/` tracked**: 298 files / 25MB stale Feb-2026 HTML, despite `coverage/` in .gitignore (committed `0b01ac6d` before the rule) | HIGH | `git ls-files -i -c` — 317 tracked files match ignore patterns total |
| Foreign Expo starter app `wrkingClass-c003/` tracked (39 files, 672K); gitignore names the wrong dir (`wrkingClass-project/`) | HIGH | bolt-expo-starter, last touch 2026-03-09 |
| Tracked runtime debris: `mcp-server.pid` (stale PID), 0-byte `designer-punk-v2@6.3.0` + `npx` (accident files, `afde003a` 2026-02-19); no `*.pid` ignore pattern | HIGH | |
| 15 tracked `temp-*.md` conversation dumps under `.kiro/specs/*` matching the ignore pattern; also `.vscode/settings.json`, `.kiro/specs/.DS_Store` | MEDIUM | |
| Orphaned root dirs (no reference from package.json/scripts/hooks/MCP config): `analysis/` (1.7MB, Mar), `findings/` (Jan), `final-verification/` (Mar), `strategic-framework-package/` (1 file, Oct 2025), `designerpunk_systems_graph_v10.html`, `keep-mcp-server-running.js`, `resume.json` symlink | MEDIUM | **Trap**: `strategic-framework/` is equally stale (Oct 2025) but IS referenced by `.kiro/hooks/organize-by-metadata.sh` — update the hook before retiring it |
| Untracked `docs/releases/release-13.0.0.*` triplet | NOT DEBRIS | Follows the committed 12.0.0/12.0.4 triplet pattern; awaiting the actual version bump (package.json still 12.0.5, no v13.0.0 tag) |
| Root entry count ~68 vs ~20 load-bearing — roughly a third of visible root entries orphaned or stale. `.kiro/` itself is organized (172 spec dirs, 146 with completion docs) — the sprawl is at the root, not in `.kiro/`. | MEDIUM | |
| Stale local branch `backup/pre-process-prefix-renames-batch-20` (Jan 2026); tags clean through v12.x | LOW | |

## 5. Governance Infrastructure

**Healthy structurally**: docs MCP index healthy and fresh (rebuilt 2026-07-04, serving the uncommitted working-tree edits — verified), 0 metadata errors across 90 docs, id-uniqueness PASS, health-check cadence current (2026-06-29), 119-B deferred-obligations ledger well-maintained (7 obligations, all OPEN by their own terms, 4 of 7 blocked on Spec 122).

| Finding | Severity | Evidence |
|---|---|---|
| Confirmed broken relative-link class post-119-A: `governance/Component-Development-Guide.md:1181` → `../specs/...` resolved from `.kiro/steering/` but not from `governance/`. This class (doc-to-spec relative paths) was not in the Task 8.5 sweep — siblings may exist. | WARNING | Follow-up: targeted grep for `../` escapes in `governance/` |
| Stale system figures in the two always-loaded overview docs (claim 86 docs / 2,753 sections / 332 cross-refs; actual 81 / 2,758 / 115) — every agent session ingests the wrong numbers | WARNING | `DesignerPunk-Systems-Overview.md`, `Civitas-System-Overview.md` (both Last Reviewed 2026-05-03). The 332→115 cross-ref drop is explained by OB-1 (bare-`id` refs invisible to parser), not data loss. |
| 65/90 docs past the 90-day review threshold (72%) | WARNING | Mitigated: 119-A moved docs byte-unchanged, so this measures content-review age, not move neglect. Highest-leverage review targets: `Process-Spec-Planning.md` + `Process-Task-Type-Definitions.md` (both 2025-12-15, load-bearing for every spec formalization). |
| Uncommitted 2026-07-03 governance work: coherent and finished (`.web.tsx`→`.web.ts` sweep ×5 files; Contract-System-Reference 117→136 adjudication; Thurgood adjudication in 119-A per-agent-ambient-design — **Spec 122's canonical input**, live-served from an unversioned working tree) | WARNING | Recommend committing the governance edits even if the release artifacts wait for the version bump |
| CC agent-port staleness (tracked OB-6) + kenya/sparky have no `.claude/agents/` port (6 of 8) — the coverage gap is undocumented in OB-6, whose own file list is slightly stale post-Stacy-hand-port | WARNING/INFO | Likely fine pending 122's generator; worth a line in OB-6 |

---

## Prioritized Actions (proposed — Peter triages)

**Act soon (days):**
1. `npm audit fix` + in-range `@modelcontextprotocol/sdk` bump → clears ~19/21 vulns non-breaking *(task chip spawned)*
2. Rotate the GitHub PAT in `.env` (precautionary)
3. Commit the 2026-07-03 governance edits (the 122 input artifact especially); release-13.0.0 artifacts ride the version bump
4. Mechanical untracking: `coverage/`, `mcp-server.pid` (+ `*.pid` ignore), 0-byte files, `temp-*.md` dumps *(task chip spawned)*

**Structural (weeks — spec or spec-line-item scale):**
5. Consolidate the MCP infra ring (StalenessGate, TokenRefResolver, FileWatcher, error shaping) into the existing `build:mcp-shared` seam — candidate rider on Spec 122/123-adjacent MCP work, or its own small spec; consider a duplication guard test (117/118 pattern)
6. Delete `src/performance/`, `src/workflows/`, and the `.example.ts` files (verify zero-importer claim first); revisit `files: ["src/"]` breadth alongside Spec 123 consumer distribution
7. Replace the `TokenFileGenerator` silent fixture fallback with loud failure or explicit config
8. Spec 125 continues arming enforcement (CI-gate full test + tsc, coverage thresholds, repo-wide lint decision — the last already tracked under Spec 118 deferred items)

**Decisions only Peter can make:**
9. Fate of `wrkingClass-c003/` and the orphaned root dirs (delete / archive / keep) — `strategic-framework/` requires the organize-by-metadata hook update first
10. Confirm `personal-note.md` npm publication is intentional
11. Governance review pass for the two 2025-12-15 process docs + the stale overview-doc figures

**Counter-argument to this prioritization** (recorded per AI-Collaboration-Principles): the hygiene items are arguably cosmetic — repo size breaks nothing, and Specs 122/125 will obsolete some of this cleanup — so a defensible minimal triage is "vulns + commit the in-flight work, batch the rest into 122/125." The structural items are ranked high here because the StalenessGate triplication is a drift incident waiting for its Spec-117 moment, and dead-code-shipping is a packaging-trust issue for a published library.

---

## Source

Audit executed 2026-07-04 by five parallel Claude Code agents in a read-only pass; synthesized in-session. Severity ratings are the auditors'; dispositions above are **proposed**, not decided. Tracker entry: `docs/roadmap/m0a-deferred-items.md` § "Full project audit — 2026-07-04".
