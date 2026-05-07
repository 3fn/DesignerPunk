# Task 2.2 Completion: Publish `@3fn/core@11.0.0` to GitHub Packages

**Date**: 2026-05-06
**Task**: 2.2 Publish `@3fn/core@11.0.0` to GitHub Packages
**Type**: Implementation
**Status**: Complete (including mid-execution sub-subtask 2.2.1 scope extension)
**Agent**: Ada (execution), Peter (authorization + token management)

---

## Artifacts Modified / Published

- **Published**: `@3fn/core@11.0.0` to GitHub Packages registry (`https://npm.pkg.github.com`)
- **Modified**: `package.json` — version bumped `10.2.5` → `11.0.0` (commit `6dc89714`)
- **Registry cleanup**: deleted `@3fn/core@10.2.1` through `@3fn/core@10.2.5` via GitHub Packages UI (sub-subtask 2.2.1, scope-extended during execution)

### Tarball Details

| Field | Value |
|-------|-------|
| Filename | `3fn-core-11.0.0.tgz` |
| Package size | 6.1 MB (packed) |
| Unpacked size | 21.6 MB |
| Total files | 1,504 |
| shasum | `e279a008984699304419d6ac380f8c6fed32d0ac` |
| integrity | `sha512-qKwOpOpgkCAtSBUObUdnHfsLmR66lmdXKZQ+rUc0pelA2jIExtOSwWpip+pHZqvNPPIHuZg22aQX2M6mDyA2dA==` |
| License | Apache-2.0 |
| dist-tag `latest` | 11.0.0 |
| Dependencies | 6 (`@modelcontextprotocol/sdk`, `@octokit/rest`, `@types/uuid`, `dotenv`, `tsx`, `uuid`) |
| Published at | 2026-05-07T02:52:27Z (UTC) / 2026-05-06 ~22:52 EDT (local) |
| Published by | `3fn` |

### Pre-Publish Hygiene Preconditions (all verified before publish)

| Precondition | Status |
|--------------|--------|
| Working tree clean (`git status`) | ✅ |
| On `main` branch | ✅ |
| Up to date with `origin/main` | ✅ |
| Tests passing (`npm test`) | ✅ 325 suites / 8,281 tests |
| Package name `@3fn/core` | ✅ |
| Version `11.0.0` (bumped + committed) | ✅ commit `6dc89714` |
| Drift script clean (`npm run check:drift`) | ✅ 2,819 files, zero drift |
| `prepublishOnly` composition (build + drift check) wired | ✅ runs automatically before publish |

---

## Implementation Details

### Execution Narrative

**Version bump (committed `6dc89714`).** `package.json` version changed from `10.2.5` to `11.0.0` with commit message explaining rationale (release:analyze 90% confidence, 20 changes with Spec 101 included). Tests re-run post-bump — all 325 suites / 8,281 tests pass at 11.0.0.

**Publish attempt 1 → 401 Unauthorized.** First `npm publish --access public` attempt. `prepublishOnly` hook ran `npm run build` (succeeded) then `npm run check:drift` (clean). Tarball built (6.1 MB, 1,504 files). Publish API call hit GitHub Packages and received `401 Unauthorized - unauthenticated: User cannot be authenticated with the token provided`. No partial state — 401 is a pre-transfer auth rejection. Hypothesis: token in project `.npmrc` was `read:packages`-only (matched consumer-install testing pattern described in design-outline, and whoami had pre-flight-returned 403 as an early signal).

**Token refresh 1.** Peter created a new PAT via `https://github.com/settings/tokens` with classic scopes `repo`, `write:packages`, `read:packages` (implicitly included under write:packages), expiring 2026-07-07. Updated `.npmrc` with the new token value.

**Publish attempt 2 → 401 Unauthorized (same error).** Investigation revealed Peter had updated `.npmrc` using the GitHub Packages install-docs template format `_authToken=${GITHUB_TOKEN}` but had substituted the literal token value INSIDE the `${}` wrapping, producing `_authToken=${ghp_WDCly0Xzcfg...}`. npm interpreted the value literally (including the dollar-brace wrapping) as an opaque string, sending it to GitHub, which rejected it as malformed.

**Token refresh 2 + formatting fix.** Peter removed the `${}` wrapping AND rotated the token a second time (preemptively — 14 characters of the previous token had briefly leaked in my debug grep output during root-cause investigation; zero external exposure risk but best-practice rotation hygiene).

**Publish attempt 3 → SUCCESS.** `+ @3fn/core@11.0.0` emitted by npm. Registry verification via `npm view` confirmed: version 11.0.0 present, Apache-2.0 license, `latest` dist-tag set, tarball URL accessible, integrity hash matches local tarball.

### Sub-Subtask 2.2.1: Pre-Reconciliation Version Cleanup (Scope Extension)

**Discovery during post-publish verification.** Running `npm view @3fn/core versions --registry=https://npm.pkg.github.com` revealed 7 total versions in the registry, not the 1 expected:

```
[ '10.2.0', '10.2.1', '10.2.2', '10.2.3', '10.2.4', '10.2.5', '11.0.0' ]
```

Timestamps showed 10.2.0–10.2.5 were published April 8–9, 2026, approximately one month before Spec 101. These were Peter's testing publishes during the first-consumer-install discovery event that triggered Spec 101 in the first place. **The design-outline.md premise "No package has been published yet" (§ "Problem" item 3) was incorrect in retrospect.**

These pre-reconciliation versions existed on the registry with all the broken references Spec 101 was built to fix — wrong scope in Integration Guide, missing `LICENSE`, missing `product-template/`, stale `dist/` references. If any consumer installed those versions between April 8 and now, they'd have gotten a broken package.

**Authorization path.** Peter authorized Option A (add as sub-subtask mid-execution) after I presented the decision between:
- A — Sub-subtask; leverage current context
- B — Follow-up issue; preserve scope discipline

Peter's rationale: context freshness for deprecation message wording outweighed scope-discipline concern. Estimated 10 minutes for 6 `npm deprecate` commands.

**First attempt: `npm deprecate` failed across all 6 versions.**

```bash
for v in 10.2.0 10.2.1 10.2.2 10.2.3 10.2.4 10.2.5; do
  npm deprecate "@3fn/core@$v" "Deprecated: pre-reconciliation release with broken Integration Guide references. Use 11.0.0 or later."
done
```

All 6 calls returned `400 Bad Request - unmarshalling packument failed: version.ID cannot be empty`. This is a GitHub Packages-side packument format incompatibility with the npm CLI's standard deprecation PUT request — a long-standing known gap in GitHub Packages' npm deprecation support.

**Pivot: Option B (UI-based version deletion).** Peter chose B with the "no customers" tiebreaker — deletion's primary risk (breaking a consumer's lockfile) doesn't apply when there are no consumers. Further narrowed to B1 (delete only untagged versions): 10.2.0 has git tag `v10.2.0` and is the "canonical" pre-reconciliation release in source history; the other 5 (10.2.1–10.2.5) are untagged experimental publishes with no git anchor.

Peter performed UI deletion of 10.2.1–10.2.5 via `https://github.com/3fn/DesignerPunk/pkgs/npm/core`. Post-deletion registry state:

```
[ '10.2.0', '11.0.0' ]
```

Registry now matches git tag history exactly. No consumer-lockfile references exist (no consumers).

### Key Decisions

**Version bump as Task 2.2 precondition rather than separate subtask.** Tasks.md Task 2.2 preconditions verified `"name"` but not `"version"` — a small spec gap. Treated the bump as an implicit precondition ("can't publish 11.0.0 without bumping to 11.0.0") and committed it separately (`6dc89714`) before running `npm publish`. Preserves a clean tag-able commit state for Task 2.4.

**Three publish attempts rather than one.** Each failure was a clean pre-transfer rejection; no partial state to clean up. Attempts 1 and 2 each cost ~90 seconds (prepublishOnly build + drift check). Total cost of the iterative debug: ~4 minutes versus the alternative of front-loading token verification (which would have required adding `read:user` scope just for whoami diagnostic, and whoami is historically quirky on GitHub Packages regardless). Path chosen was marginally more pragmatic.

**B1 (tagged version retention) over B2 (delete all).** The git tag is a stronger canonical marker than registry presence. Git tag `v10.2.0` exists; deleting the corresponding registry version would create a permanent git-to-registry mismatch. Untagged versions have no canonical anchor — deleting them just aligns registry with what was intentionally released.

**Token rotation during investigation.** Second rotation was initiated by Peter preemptively after 14 characters of the first-rotation token leaked in my debug output (specifically, in a grep statement I used to diagnose the `${}` formatting problem; the leak was local to our chat transcript, not pushed to any external system). Defensible caution; cost was ~1 minute. Self-callout for my own learning: I should have used stricter output-redaction patterns during debugging, not just at final-output summarization.

**Uniform deprecation message across all 6 versions.** Had the `npm deprecate` path worked, I used one sentence identical for all 6 versions: *"Deprecated: pre-reconciliation release with broken Integration Guide references. Use 11.0.0 or later."* Rationale: all 6 were in the same category of broken-ness; a uniform signal to consumers reads more confidently than 6 slightly different framings. Moot in the end since the path didn't work, but captured here as intent-for-next-time.

### Integration Points

- **Parent 1's infrastructure enabled this publish.** The `prepublishOnly` wiring (Task 1.8) ran automatically and validated build + drift before the publish API call. The reconciled source (Tasks 1.1–1.5) meant zero scope drift in the tarball. The `LICENSE` file (Task 1.2) and `product-template/` shipping (also Task 1.2) are now published artifacts available to consumers.
- **Task 2.3 (post-publish verification) runs against 11.0.0.** Peter executes in a fresh temp repo: `npm install @3fn/core`, `ls node_modules/@3fn/core/product-template/agents/`, `node -e "require('@3fn/core/package.json')"`, Integration Guide walkthrough, and explicit `.npmrc` scope verification after `npx designerpunk init` (guards against regression of Task 1.1's `init.ts:43` fix).
- **Task 2.4 (tag v11.0.0) will tag on current HEAD.** The version-bump commit (`6dc89714`) is the semantically-correct tag target. Any commits that land between 2.2 and 2.4 (e.g., this completion doc) get absorbed into the 11.0.0 release scope.

---

## Validation (Tier 3: Comprehensive — irreversible action)

### Pre-Publish Validation
- ✅ All 7 hygiene preconditions verified (working tree, branch, remote sync, tests, name, version, drift)
- ✅ `prepublishOnly` composition (`npm run build && npm run check:drift`) runs successfully end-to-end

### Publish Validation
- ✅ Publish command: `npm publish --access public` (required for public scoped package)
- ✅ Registry acceptance: `+ @3fn/core@11.0.0` emitted; no error codes
- ✅ Registry metadata verification via `npm view @3fn/core@11.0.0 --registry=https://npm.pkg.github.com`:
  - name: `@3fn/core` ✅
  - version: `11.0.0` ✅
  - license: `Apache-2.0` ✅
  - dependencies: 6 (matches package.json) ✅
  - dist-tag `latest`: `11.0.0` ✅
  - tarball download URL accessible ✅
  - integrity hash matches local tarball ✅

### Sub-Subtask 2.2.1 Validation
- ✅ Pre-reconciliation versions 10.2.1–10.2.5 no longer appear in `npm view @3fn/core versions`
- ✅ Version 10.2.0 retained (has git tag `v10.2.0`)
- ✅ Registry state `['10.2.0', '11.0.0']` matches git tag history (`v10.2.0`, plus upcoming `v11.0.0`)
- ✅ `latest` dist-tag still points to 11.0.0

### Security / Hygiene Validation
- ✅ `.npmrc` gitignored throughout (verified via `git check-ignore .npmrc`)
- ✅ Token rotated twice during execution (once for scope, once preemptively after partial exposure)
- ✅ No tokens committed to git history (`git ls-files .npmrc` returns empty)
- ✅ Published tarball contains `LICENSE`, `product-template/`, and all other `files`-array entries (1,504 total files; 6.1 MB packed)

### Requirements Compliance
- ✅ Design Outline § "Scope > In scope" item 6 (first publish of `@3fn/core` to GitHub Packages as public package): addressed
- ✅ Design Outline § "Approach > Sequence" step 6 (Ada publishes publicly with `npm publish --access public`): addressed
- ✅ Design Outline § "Success criteria" items 1, 2 (consumer install succeeds, package visible at GitHub URL): addressed pending Task 2.3's fresh-repo validation
- ✅ Tasks.md § "2.2 > Preconditions" (all 5 listed preconditions plus implicit version bump): addressed
- ✅ Tasks.md § "2.2 > Execution" (PAT scope verification, `.npmrc` configuration, publish command, GitHub UI verification): addressed

---

## Notes

### Process Lessons

**1. The fourth mid-execution scope extension in Spec 101.** This sub-subtask (2.2.1) brings the total mid-execution extensions to four:
  1. Task 1.1 Extension (additional source files my R1 missed)
  2. `task-1-summary.md` creation (Completion Documentation Guide gap)
  3. `task-1-*-completion.md` backfill (subtask docs I'd skipped)
  4. Sub-subtask 2.2.1 (pre-reconciliation version cleanup)

Each extension was defensible in isolation; the pattern is that Spec 101 kept growing as execution surfaced new needs. Peter's scope-discipline instinct was right on the margin each time — we could have deferred any of these to follow-up specs. The bar for extending should be: does this need the current context to be done well? In each of these four cases, the answer was yes. I'm retaining the willingness to extend for good reasons, but also noting that four extensions is a lot.

**2. The "no package has been published yet" premise error.** The design-outline asserted this, and both Ada (R1/R2 reviews) and Thurgood (R2 incorporation) accepted it. Neither of us verified by running `npm view @3fn/core versions` against the registry. A two-second check would have surfaced the 6 prior versions and changed the spec's framing from "first public publish" to "first reconciled publish." Process lesson: when a design-outline claims a registry or external-system state, verify that state empirically during R1 review. Don't accept such claims on faith.

**3. AI debug-output token exposure.** During the `${}` formatting investigation, I ran `grep "_authToken" .npmrc | cut -c1-50` which displayed 14 characters of Peter's PAT including the `ghp_` prefix. Even with redaction awareness elsewhere in the session, I defaulted to a less-strict pattern for this debug grep. Self-correction: treat PAT values as never-display-even-partially during debugging. Use `grep -o '\${[^}]*}'` or similar patterns that match the STRUCTURE around the token without ever emitting token characters. Peter rotated the token preemptively, which was the right response to even-minor exposure.

### Follow-Ups Not Logged as Issues

Items from this task's execution that don't warrant separate issue files:
- Design-outline's "No package has been published yet" premise error → noted in this completion doc; historical correction.
- "First public release" phrasing in Parent 1 completion doc and Task 2.4 tag message → needs adjustment to "first reconciled public release" or similar; handled opportunistically in Task 2.4 commit/tag message and subsequent completion edits as they happen.

### Items Worth Future Consideration (Not in Spec 101 Scope)

- **`npm deprecate` doesn't work on GitHub Packages.** This is a long-standing GitHub Packages gap. If DesignerPunk ever needs to deprecate a published version in the future (without deleting it), we'll need to either migrate off GitHub Packages or accept the limitation. Flagging for awareness; no action needed now.
- **Token management hygiene.** Peter's current publish-capable PAT expires 2026-07-07. Setting a calendar reminder ~1 week before to rotate for the next publish cycle would be low-effort insurance against a rushed-token-renewal situation during a future release.
