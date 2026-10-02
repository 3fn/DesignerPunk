/**
 * Resolve the theme TIER ROOT — where `ModeClassifier` and `TokenIndexer` read
 * `themes/dark/SemanticOverrides.ts` from (Spec 123 Task 1.5, design.md DD24 —
 * "the theme root travels with the index").
 *
 * BACKGROUND: `modeClassifier.load()` and `tokenIndexer.indexTokens()` used to read
 * `<projectRoot>/src/tokens/themes/dark/SemanticOverrides.ts`, hardcoding the
 * assumption that the live token tier is always at `<projectRoot>/src/tokens`. Under
 * Model B that's only true for a BORN consumer whose `tokenSource` happens to be the
 * conventional path. It's wrong for `package-mode` (the live tier is the PACKAGE's
 * `src/tokens`, not the consumer's own tree) and for any born consumer whose
 * `tokenSource` points somewhere else — the C2/C3 monorepo escape (`TOKEN_INDEX_DIR`)
 * exists precisely so an index can be chosen independently of the working directory,
 * and "any way of choosing the index... brings its own themes with it" (C3).
 *
 * PRECEDENCE (design.md § C3 "THE THEME ROOT IS PAIRED WITH THE INDEX"):
 *   1. `<tokenIndexDir>/meta.json`'s `tierDir` field — written by `generate` (Task 1.5)
 *      alongside the index it describes. This is the authoritative, self-describing
 *      answer: whichever index got served, its own metadata says where its themes live.
 *   2. The caller's explicit tier (`DesignSystemRoot.tierDir`, from
 *      `findDesignSystemRoot`) — used only when the index predates this metadata (a
 *      pre-1.5 `generate` run) or `tokenIndexDir` isn't known at the call site.
 *   3. Legacy default: `<projectRoot>/src/tokens` — the ONLY shape supported before
 *      this change. Kept so callers that pass neither metadata nor an explicit tier
 *      (single-root tests, the live pre-regeneration corpus) see IDENTICAL behavior.
 *
 * RULE 1 IS PORTABLE AND VERIFIED (the 15.0.0 upgrade rehearsal, F2 —
 * `.kiro/issues/2026-10-02-token-index-meta-ships-absolute-path.md`): the writer
 * records `tierDir` RELATIVE to the token-index directory (`/` separators), so a
 * packed index's `../src/tokens` resolves inside whichever install serves it. A
 * relative value resolves against `tokenIndexDir`; an absolute one is taken as is
 * (indexes written before the fix). Either way the value wins only if it EXISTS on
 * disk — an index built on another machine records a path that does not exist here,
 * and that value falls through to rule 2 rather than pointing the theme readers at
 * nothing. The check is an existence check only; a directory without a dark
 * `SemanticOverrides.ts` still wins (the readers report that themselves).
 */
import * as fs from 'fs';
import * as path from 'path';

export function resolveThemeTierRoot(
  tokenIndexDir: string | undefined,
  explicitTierDir: string | undefined,
  projectRoot: string,
): string {
  if (tokenIndexDir) {
    try {
      const raw = fs.readFileSync(path.join(tokenIndexDir, 'meta.json'), 'utf8');
      const meta = JSON.parse(raw) as { tierDir?: unknown };
      if (typeof meta.tierDir === 'string' && meta.tierDir.length > 0) {
        const recorded = path.isAbsolute(meta.tierDir) ? meta.tierDir : path.resolve(tokenIndexDir, meta.tierDir);
        if (fs.existsSync(recorded)) return recorded;
        // Recorded, but not on this machine — fall through to the next source.
      }
    } catch {
      // meta.json absent, unreadable, or malformed — fall through to the next source.
    }
  }
  if (explicitTierDir) return explicitTierDir;
  return path.join(projectRoot, 'src', 'tokens');
}
