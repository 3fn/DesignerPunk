/**
 * Legacy-Path Forwarding Manifest (Spec 119-A, Data Models)
 *
 * A build-time-generated, transition-only artifact keyed on the ORIGINAL
 * pre-rename, pre-relocation `.kiro/steering/…` strings (Req 2 AC3). It is the
 * only record of those vanished paths after relocation — they cannot be inferred
 * by scanning disk, so they must be supplied. It seeds `DocumentIndexer`'s
 * `legacyPathIndex` via `loadLegacyPathManifest`.
 *
 * Owner: Thurgood / Docs-MCP infra (same owner as the resolver — it produces the
 * resolver's seed data). The producer (`scripts/generate-legacy-path-manifest.ts`)
 * and the frozen JSON artifact are built in Task 3; this file defines the type
 * the loader (Task 2.3) and the producer (Task 3) both depend on.
 *
 * `transitionOnly: true` is self-documenting (Req 2 AC3) and carries a 119-B
 * removal obligation: once the 8 prompts' 60 legacy refs are swept to ids, the
 * manifest (and this whole legacy-fallback code path) is removed.
 *
 * Every `legacyPath` MUST be `..`-free (the guard-ordering invariant the resolver
 * relies on: `QueryEngine.validatePath` rejects `..` BEFORE `resolveRef` runs, so
 * a `..`-bearing legacy key could never be reached). The producer asserts this.
 */
export interface LegacyPathManifest {
  generatedAt: string;
  /** Self-documenting transition marker; the artifact is removable post-119-B-sweep. */
  transitionOnly: true;
  entries: Array<{
    /**
     * The original pre-rename / pre-relocation `.kiro/steering/…md` string,
     * e.g. ".kiro/steering/Cross-Platform vs Platform-Specific Decision Framework.md".
     * `..`-free by construction.
     */
    legacyPath: string;
    /** The resolved target doc's stable `id`. */
    id: string;
  }>;
}
