# Task 5.1 Completion — dp-portfolio's manifest check, and fixtures for both branches

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 5 · **Agent**: Lina (Opus)

## What changed

### The dp-portfolio input — OBTAINED (the forced negative does not apply)

The orchestrator ran Peter's check on 2026-09-26. Quoted as delivered:

- dp-portfolio lives at `/Users/3fn/Documents/Work Projects/Kiro/test01`, remote `dreamhost … designerpunk.ai.git`.
- `ls .kiro/sync-manifest.json` → **PRESENT** (142,698 bytes).
- Manifest `"version": "12.0.3"`, `"syncedAt": "2026-06-11T02:46:38.045Z"`, 773 file entries, 105 of them `managed: true`.
- **`package.json` pins `@3fn/core` at `12.0.5`, so the manifest version lags the installed version** (upgraded without a re-sync).

I read the manifest myself (read-only) and confirmed every figure. Entry groups: `.kiro/steering` 89, `.kiro/agents` 16, `src/tokens` 59, `src/types` 7, `src/components/core` 602.

**Consequence for design C7's "likely consequences" (Lina R2)**: the design predicted *"the manifest was never generated … the legacy-copies-on-disk trigger catches them."* That prediction is **false**. dp-portfolio triggers on `legacyManifest`. Both triggers are implemented and both are exercised (below), so nothing in the design changes. The design's own fallback case is what the manifest-absent fixture covers.

### How migration treats a manifest whose version ≠ the installed version (the lag)

A legacy manifest's `version` is **the last sync**. It is never the copy version, and it is never the installed version (C7 step 2). So:

- the lag **does not bound the range**, and the legacy version is not carried into the new manifest;
- the range's upper bound is the installed version, taken from the new manifest's `installedVersion`, else from `package-lock.json`, else unknown (→ `cannot-tell`);
- every fetchable version from the earliest through that bound is a candidate, so copies synced at 12.0.3 and copies from any earlier `init` are both recognized.

In dp-portfolio's case the bound is 12.0.5 today, and the new version after the upgrade. Either way the range covers 12.0.3.

### Fixtures (committed)

- **`src/cli/__tests__/fixtures/sync/dp-portfolio.legacy-manifest.json`** is the manifest-PRESENT branch, including the lag. It is a trimmed, verbatim subset of dp-portfolio's real manifest:
  - `version` 12.0.3 and the real `syncedAt`;
  - 32 real entries across all five groups, including every `Badge-Label-Base` and `Button-Icon` entry;
  - a `_provenance` block and the full per-group counts.
- **The manifest-ABSENT branch** is built programmatically in `sync.migration.test.ts`: no manifest, copies on disk, and a lockfile. That is the design's predicted dp-portfolio shape, and it fires the `legacy-copies` trigger.
- **`src/cli/__tests__/fixtures/sync/package-snapshots.json`** holds per-file-faithful package content for 11.2.1, 11.3.0, 12.0.5, 13.0.0, 14.0.0 and 14.1.0. Provenance is in the file.
  - **13.0.0 / 14.0.0 / 14.1.0**: read from the **real npmjs tarballs** (`npm pack`). All 599 component files in each tarball are byte-equal to the release tag, 0 differences.
  - **11.2.1 / 11.3.0 / 12.0.5**: GitHub Packages returned **403** with the available token (`read:packages` scope missing), and none are in the local npm cache. These come from the release tag.
  - **Faithfulness evidence for the tag route, against real consumer data**: I hashed dp-portfolio's 602 recorded `src/components/core` baselines against the tag content of v11.9.0–v12.0.5 (`.ts` transformed, other files raw):
    - **593 match**;
    - **6 match the RAW package hash of a `.ts` file**: files the old `sync` applied. Spec 111 recorded the package hash while it wrote transformed bytes — a defect the new Applier fixes (5.4);
    - **3 are in none of those tags**. One exists in an earlier tag. The other two, `Nav-Header-App/{tokens.ts, platforms/web/NavHeaderApp.styles.css}`, exist in **no** release: a consumer-authored component living under `core/`, which the migration now reports as "yours";
    - **0 are unexplained by a hash**.

## Targeted tests + result

- `npx jest src/cli/__tests__/sync.migration.test.ts -t "manifest branches"` → the two branch tests pass (they run in the 5.5 suite, 27/27).
- The `fixture integrity` test asserts six versions, the enumerated range present, 6 component files per version, and `sha256(blob) === key` for every blob.

## Application-time adaptations

1. **Reads beyond the two permitted files — disclosed.** The permission covered dp-portfolio's `.kiro/sync-manifest.json` and `package.json`. In one survey command I also ran `ls` on the repo root and `src/`, and read `package-lock.json`'s `@3fn/core` entry (12.0.5, resolved from `npm.pkg.github.com`). I also read `.npmrc`: its token was redacted in the output and never printed. The output confirmed `@3fn:registry=https://npm.pkg.github.com`, which 5.6's repair targets. Nothing in that directory was written. No fixture uses content from those extra reads, except the fact that the rail is GitHub Packages, which the design already states.
2. The dp-portfolio fixture is **trimmed**, not whole (32 of 773 entries), to keep the fixture reviewable. The full counts ride in `_fullCounts`.
