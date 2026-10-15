# Task 28.2 Completion — The tarball assertion vs `tarball-target.json`, differences attributed

**Spec**: 123 · **Unit**: U5 (`task/123-u5-closeout`) · **Parent**: 28 (Closeout) · **Agent**: Thurgood (Opus) · **Date**: 2026-10-15
**Measured at**: `d6b6c7445` (the commit carrying the release-4 CHANGELOG entry; `CHANGELOG.md` ships, so it is the tarball-moving commit). Measurements run by the orchestrator from the runner below; assertion and attribution written by Thurgood.

## What changed

The release-4 candidate was measured **twice** (instruments O-2) and asserted against `tarball-target.json` per lever, and every added or removed path was attributed to the commit or PR that moved it.

**The two methods**
- **Shipping method** (rows 1.4 / 2.3): `npx tsx scripts/release-publish.ts --dry-run d6b6c7445 --source <worktree> --keep` — a fresh clone, `npm ci`, the build inside `npm pack`'s `prepack`, `pack-assert` on the tarball. This is how the tag will build it. **pack-assert 105/105.** Tarball sha1 `326d798dcd71320129267cbeb97a2d59c13bfba7`, copied to `/Users/3fn/Documents/Work Projects/Kiro/u5-pack/3fn-core-15.1.0-d6b6c7445.tgz` (sha1 re-checked after the copy). **This is the candidate 28.1 installs.**
- **Target method** (row 2.2): in the worktree, `npm run build && npx tsx scripts/pack-assert.ts` (dry run), then `npm pack --dry-run --json --ignore-scripts` for the listing — the lever and method `tarball-target.json` names. **pack-assert 103/105** (below).

**The baseline listing** (rows 2.5 / O-13): `refs/pull/215/head` is fetchable (`6001ba493`). The commit that last wrote `tarball-target.json` on it is `b32ce8ace`; packed in a fresh clone (`npm ci --ignore-scripts`, `npm run build`, `npm pack --dry-run --json --ignore-scripts`) it gives **1533 / 5826868 / 21165735**, not the target's **1597 / 5863534 / 21308710**. The target was measured in U1's working checkout, and its per-path listing was never committed, so the 64-entry gap cannot be attributed by path; it is stated, not absorbed (instruments `## Found later`, row 2.5 misfit). Per-path attribution runs against the reproducible 1533-entry baseline.

### The assertion, per lever (row 2.4)

| Lever | Target (`tarball-target.json`) | Baseline (`b32ce8ace`, fresh clone) | **Shipping method** @ `d6b6c7445` | Δ vs target | Target method @ `d6b6c7445` | Δ vs target |
|---|---|---|---|---|---|---|
| entryCount | 1597 | 1533 | **1675** | **+78 (+4.88%)**, above | 1675 | +78 (+4.88%), above |
| size (packed bytes) | 5863534 | 5826868 | **6485550** | **+622016 (+10.61%)**, above | 6417443 | +553909 (+9.45%), above |
| unpackedSize | 21308710 | 21165735 | **23504489** | **+2195779 (+10.30%)**, above | 23073027 | +1764317 (+8.28%), above |

**Both named levers moved up**: entryCount by 78 entries, unpackedSize by 10.30% (shipping) / 8.28% (target method). `tarball-target.json` declares a snapshot to be asserted against, not a ceiling ("Later units … will shift these numbers again — U5 re-measures and asserts against THIS target, per lever"), so this is a measured movement with a direction, not a pass/fail verdict. Task 7.4 already recorded the first leg above target inside U1 (1602 / 21561066).

**Why the two methods differ (431,462 unpacked bytes, the same 1675 paths)**: the target method's two FAILs are `dist/mcp/application-mcp.js` and `dist/mcp/docs-mcp.js` "resolves every module from the root node_modules/ — root modules 0; nested roots [application-mcp-server/]" / "[mcp-server/]". The worktree had nested `node_modules/` under both server folders (installed there to build the servers), so its bundles resolved from them and came out smaller: `dist/mcp/docs-mcp.js` 605594 bytes (fresh clone 817954; baseline 814936) and `dist/mcp/application-mcp.js` 772238 (fresh clone 991340; baseline 954214). Those two files account for the whole gap: (817954 − 605594) + (991340 − 772238) = **431462**. **This is the working-checkout contamination class the hermetic publish path exists to prevent** (ballot `2026-10-03-hermetic-publish-path`), observed here in the target's own method. The shipping method is the measurement of record; the target method is reported for lever comparability only.

### Differences attributed (row 2.6) — same in both methods for paths

Range read: main side `git log --first-parent d566b30ff..origin/main` (origin/main = `8ad81eb4b`); unit side `git log --no-merges origin/main..HEAD`. An added path is credited to the commit that created its source (`--diff-filter=A`; `dist/**` by its source root) or, where it shipped because `files[]` widened, to the `package.json` commit that added the pattern. A removed path is credited to its deleting commit, else the `package.json` commit that dropped its pattern.

**Added: 183 paths, 2303320 bytes**

| Paths | Bytes | Attributed to |
|---|---|---|
| 138 | 1650769 | #262 U2b consumer generation profile (126 of them `dist/consumer-canonical/**`, shipped by its `files[]` pattern) |
| 14 | 73720 | #321 U3 onboarding (templates, `personalNote`, `gitignoreRegion`, `NameContract`, starter specs, product scaffold) |
| 6 | 313115 | inside U1 after the target was written (`b32ce8ace..d566b30ff`, PR #215): `CHANGELOG.md`, `dist/cli/shared/mcpConfig/{cc,kiro}.{js,d.ts}`, `dist/generator/consumer-entry.js` |
| 6 | 23037 | `e3bc68a6f` find_docs indexer fix (fence-aware headings) |
| 3 | 22705 | #338 Application MCP readiness record |
| 3 | 22495 | `dcd337dcf` find_components Stage 0 |
| 2 | 10499 | #328 components tokenizer iOS atoms |
| 2 / 1 | 4140 / 143889 | #339 generate determinism (the 143889-byte path is shared with #336) |
| 2 | 5420 | #336 Jest preset subpaths |
| 2 | 14659 | `aa7b7c08e` discovery study Stage 1 |
| 1 | 2718 | #345 Application MCP companion paths |
| 1 | 7616 | **#359** validate_assembly prop-value checks (`PropValueChecker`) |
| 1 + 1 | 3993 + 4545 | **#360** find_docs concept-mode paging |

**Removed: 41 paths, 296393 bytes**

| Paths | Bytes | Attributed to |
|---|---|---|
| 33 | 247010 | #262 U2b — the steward `.kiro/agents/**` (and siblings) left `files[]` when the consumer profile replaced them |
| 8 | 49383 | inside U1 after the target was written: the four `Input-Text-*` `.browser.{js,d.ts}` files |

**Changed size, same path: 148 paths**, net **+331827** bytes (shipping) / **−99635** (target method; the difference is the two MCP bundles above). Largest movers (shipping): `governance/classification-map.md` +48505 (#355, #354 register rows); `dist/cli/sync/index.js` +41683 (#321, #262); `dist/mcp/application-mcp.js` +37126 (#360, #359 and earlier server PRs); `governance/DesignerPunk-Integration-Guide.md` +16149 (#337, U3/U4, 26.5); `governance/completion-documentation-guide.md` +15944 (#329, #239); `dist/mcp/product-mcp.js` +12987.

**Reconciliation** (unpackedSize, shipping): added 2303320 − removed 296393 + changed 331827 = **2338754** = listing delta (23504489 − 21165735). Exact.

## Targeted tests + result

- `release-publish.ts --dry-run d6b6c7445`: exit 0, pack-assert **105/105**, sha1 `326d798d…bfba7`.
- Worktree `pack-assert` dry run: **103/105** (the two FAILs above; exit 1).
- `node --check` over `attribute.mjs`; both attribution passes reconcile exactly (above).
- Full outputs, verbatim: `.kiro/specs/123-consumer-distribution/completion/task-28-2-attribution/attribution-shipping-method-d6b6c7445.md` and `…/attribution-target-method-d6b6c7445.md`.

## Application-time adaptations

1. **The baseline does not reproduce the target** (1533 vs 1597). Attribution is against the reproducible listing; the 64-entry gap is stated (instruments row 2.5, misfit).
2. **The target method failed pack-assert** in the worktree (nested `node_modules/` under the two server folders). Reported, not repaired: the measurement of record is the shipping method, which passed. Appended to the instruments block's `## Found later` (row 2.2, misfit).
3. **The runner aborted** at the target method's pack-assert exit 1 (`set -e` with `pipefail`); the orchestrator ran the listing and both attribution passes by hand. The committed copy of the runner (`task-28-2-attribution/tarball-of-record.sh`) records pack-assert's exit code and continues.
4. **The instruments live in the completion folder**, not a Primary Artifact path: `task-28-2-attribution/{attribute.mjs,tarball-of-record.sh}` (rows 2.4 / 2.6, "built here (28.2)"), so the assertion is re-runnable from the record. The baseline and head listings are not committed; they are reproducible by the commands above.
