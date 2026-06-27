/**
 * Class-Invariant Guard — PREVENTIVE source scan (authoring surface)
 *
 * Spec 118 Task 9.4 (R8 AC3 — the broader lint codification flagged by Spec 124)
 *
 * THE CLASS INVARIANT (Spec 124 isolation audit):
 *   "No mutable-accumulate-then-read-back state crosses the scopedTsRequire boundary."
 *
 * A module-level singleton is dangerous across that boundary only if it is WRITTEN in
 * one module copy and READ BACK from another. `scopedTsRequire` loads a second copy of
 * `@3fn/core/build`; any singleton compared by shared identity across that boundary
 * desyncs. `ComponentTokenRegistry` was exactly this: `defineComponentTokens` wrote it
 * as an import side effect in the loaded (duplicate) copy, and `loadComponentTokens`
 * read `getAll()` from the canonical (parent) copy → silent zero component tokens
 * (the Spec 118 Task 9.5.3 blocker). Spec 124 converted that seam to a return-value
 * harvest: `defineComponentTokens` no longer self-registers, and `loadComponentTokens`
 * (in src/cli/, OUTSIDE this surface) is the sole writer.
 *
 * WHAT THIS GUARD PINS (the reintroduction vector):
 *   No module in the AUTHORING surface (src/build/tokens/**) writes to a registry
 *   singleton — i.e. no `<Something>Registry.{register|registerBatch|add|set|push}(...)`
 *   call. That is the exact shape of the self-registration side effect 124 removed; a
 *   future `defineX` that re-adds it would reintroduce the cross-boundary split. The
 *   sole LEGITIMATE writer is `loadComponentTokens` (the harvest) in src/cli/, which is
 *   deliberately out of this scan's scope.
 *
 * RELATIONSHIP TO THE OTHER GUARDS (not a duplicate):
 *   - Spec 124 R8 AC2 (src/cli/__tests__/loadComponentTokens.test.ts) pins the SPECIFIC
 *     singleton BEHAVIORALLY: invoking defineComponentTokens in isolation leaves the
 *     canonical registry empty.
 *   - THIS guard is the STRUCTURAL generalization (R8 AC3): it catches ANY future
 *     authoring-surface module reintroducing a registry-write side effect, by source
 *     scan, before it can desync.
 *   - Task 11 codifies the invariant in prose (governance).
 *   It is a structural PROXY for the invariant scoped to the reintroduction vector, not
 *   a full dataflow proof — by design (precision over recall for a preventive guard).
 *
 * Runs under the standard `npm test` AND the consumer-guard CI lane — no separate host.
 *
 * @see .kiro/specs/124-component-token-return-contract/findings/isolation-audit.md
 * @see src/cli/__tests__/loadComponentTokens.test.ts (Spec 124 R8 AC2 — behavioral)
 * @see Spec 118 Task 9.4 (R8 AC3 — the class-invariant lint)
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

/**
 * A registry-singleton ACCUMULATE-WRITE call: an identifier ending in `Registry`
 * (the codebase convention for these singletons — ComponentTokenRegistry, etc.)
 * followed by a mutation method. Deliberately NOT bare `.set(`/`.add(` (those match
 * benign Map/Set usage) — anchored to a `*Registry` receiver to stay high-signal.
 *
 * Matches: ComponentTokenRegistry.register(  fooRegistry.add(  BarRegistry.push(
 * Does NOT match: this.primitiveRegistry.get(  someMap.set(  registry.query(
 */
const REGISTRY_WRITE = /\b(\w*[Rr]egistry)\.(register|registerBatch|add|set|push)\s*\(/g;

interface Violation {
  file: string;
  line: number;
  text: string;
  receiver: string;
  method: string;
}

/** Authoring-surface TS files: src/build/tokens/** excluding test files. */
function getAuthoringSurfaceFiles(): string[] {
  const surfaceDir = path.resolve(__dirname, '..');
  return glob.sync('**/*.ts', {
    cwd: surfaceDir,
    absolute: true,
    ignore: ['**/node_modules/**', '**/__tests__/**', '**/*.test.ts', '**/*.spec.ts'],
  });
}

/** Scan a file for registry-write side effects. Skips comment lines. */
function findRegistryWrites(relPath: string, content: string): Violation[] {
  const violations: Violation[] = [];
  content.split('\n').forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) return;

    REGISTRY_WRITE.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = REGISTRY_WRITE.exec(line)) !== null) {
      violations.push({
        file: relPath,
        line: index + 1,
        text: trimmed,
        receiver: match[1],
        method: match[2],
      });
    }
  });
  return violations;
}

describe('Class-Invariant Guard — authoring surface has no registry-write side effect (Spec 118 Task 9.4)', () => {
  let surfaceFiles: string[];

  beforeAll(() => {
    surfaceFiles = getAuthoringSurfaceFiles();
  });

  it('finds authoring-surface files to scan (sanity check)', () => {
    // If this reds, the glob or directory moved — the guard would silently have no scope.
    expect(surfaceFiles.length).toBeGreaterThan(0);
  });

  it('scanned set excludes test files (scope discipline check)', () => {
    const testFiles = surfaceFiles.filter(
      (f) => f.includes('__tests__') || f.includes('.test.ts') || f.includes('.spec.ts')
    );
    expect(testFiles).toHaveLength(0);
  });

  it('DETECTOR BITES: flags a synthetic registry-write side effect', () => {
    // Prove the scan actually fires (Review: not a formality). If the detector were
    // broken, the zero-violations assertion below would false-green forever.
    const positive = [
      `export function defineBad(x: unknown) {`,
      `  ComponentTokenRegistry.register(x); // self-registration side effect — the 124 bug`,
      `  return x;`,
      `}`,
    ].join('\n');
    const hits = findRegistryWrites('synthetic/defineBad.ts', positive);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].receiver).toBe('ComponentTokenRegistry');
    expect(hits[0].method).toBe('register');

    // And does NOT fire on the benign reads/injected-registry usage that fill this surface.
    const benign = [
      `const t = this.primitiveRegistry.get(ref);`,
      `const all = this.semanticRegistry.query();`,
      `someMap.set(k, v);`,
    ].join('\n');
    expect(findRegistryWrites('synthetic/benign.ts', benign)).toHaveLength(0);
  });

  it('PREVENTIVE: no authoring-surface module writes to a registry singleton (class invariant)', () => {
    const root = path.resolve(__dirname, '../../../..');
    const allViolations: Violation[] = [];
    for (const filePath of surfaceFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      allViolations.push(
        ...findRegistryWrites(path.relative(root, filePath), content)
      );
    }

    if (allViolations.length > 0) {
      const report = allViolations
        .map((v) => `  ${v.file}:${v.line} — ${v.receiver}.${v.method}(\n    > ${v.text}`)
        .join('\n');
      throw new Error(
        `Class-invariant guard tripped: a registry-write side effect was reintroduced in the\n` +
          `authoring surface (src/build/tokens/**). This is the mutable-accumulate-read-back\n` +
          `pattern that desyncs across the scopedTsRequire boundary (Spec 118 Task 9.5.3 blocker;\n` +
          `fixed by Spec 124). Authoring functions (defineComponentTokens & siblings) must RETURN\n` +
          `their tokens; loadComponentTokens (src/cli/) is the sole registry writer.\n\n` +
          `Violations (${allViolations.length}):\n${report}`
      );
    }
    expect(allViolations).toHaveLength(0);
  });
});
