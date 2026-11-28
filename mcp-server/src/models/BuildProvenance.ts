/**
 * Build Provenance Model
 *
 * The shape `get_index_health` and `rebuild_index` report under `health.build`:
 * whether the running `dist` was built from the source beside it.
 *
 * Contract: .kiro/issues/2026-11-27-mcp-build-provenance-contract.md
 */

/**
 * - `fresh`          — the source hash the build recorded equals the source hash now.
 * - `stale`          — the hashes differ: the running code was built from other source.
 * - `unrecorded`     — the check applies, but no readable build record exists.
 * - `not-applicable` — not a source checkout (packaged bundle, consumer install, no
 *                      `src/`), or the server runs from TypeScript source.
 */
export type BuildProvenanceState = 'fresh' | 'stale' | 'unrecorded' | 'not-applicable';

/** What `dist/build-info.json` holds (schema 1). */
export interface BuildInfo {
  /** Always 1 for this contract. */
  schema: number;
  /** The sub-package's `package.json` name. */
  server: string;
  /** `sha256:<hex>` over the hashed source set (contract § 2). The only decision input. */
  sourceHash: string;
  /** Number of files in the hashed source set at build time. */
  sourceFiles: number;
  /** `git rev-parse HEAD` at build time, or null without git. Informational only. */
  sourceCommit: string | null;
  /** Whether the hashed source set had uncommitted changes at build time, or null without git. Informational only. */
  sourceDirty: boolean | null;
  /** ISO 8601 UTC time the record was written. */
  builtAt: string;
}

/** The build-provenance report attached to an IndexHealth. */
export interface BuildProvenanceReport {
  state: BuildProvenanceState;
  /** One plain sentence saying why the state is what it is. */
  reason: string;
  /** The directory the running build was loaded from. */
  distDir: string;
  /** The record the build wrote, when one was read. */
  recorded?: Pick<BuildInfo, 'sourceHash' | 'sourceFiles' | 'sourceCommit' | 'sourceDirty' | 'builtAt'>;
  /** The source set as it is now, when it was hashed. */
  current?: { sourceHash: string; sourceFiles: number };
}
