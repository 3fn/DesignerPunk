/**
 * @category evergreen
 * @purpose Verify `rewriteByResolution` (Spec 123 Task 2.1) — the four-row
 * mapping table, the intra-tree boundary (whole tier, not per-call root), and
 * the unmapped-specifier refusal.
 * @see .kiro/specs/123-consumer-distribution/design.md § "C4. Rewrite-at-copy — BY RESOLUTION, not by string"
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { rewriteByResolution, UnmappedSpecifierError, REWRITE_MAPPING_TABLE, RewriteRecord } from '../shared/transforms';
import { resolvePackageRoot } from '../shared/resolvePackageRoot';

/** Recursively list every `.ts` file under `dir`, excluding `__tests__`. */
function listTsFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '__tests__') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listTsFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      out.push(full);
    }
  }
  return out;
}

describe('rewriteByResolution — mapping-table coverage over the REAL repo tree (Task 2.1)', () => {
  // resolvePackageRoot expects an anchor two levels below the package root
  // (e.g. `src/cli/`); this test file is one level deeper.
  const pkgRoot = resolvePackageRoot(path.join(__dirname, '..'));
  const tierRoot = path.join(pkgRoot, 'src', 'tokens');

  test('every real .ts file under src/tokens/** rewrites with zero unmapped specifiers, and every mapping row is exercised ≥ 1', () => {
    const allRewrites: RewriteRecord[] = [];

    for (const file of listTsFiles(tierRoot)) {
      const content = fs.readFileSync(file, 'utf8');
      // Any UnmappedSpecifierError here fails the test with the offending file —
      // this IS the "zero unmapped out-of-tier specifiers" criterion.
      const { rewrites } = rewriteByResolution(content, file, tierRoot);
      allRewrites.push(...rewrites);
    }

    const countsByLabel = new Map<string, number>();
    for (const r of allRewrites) {
      countsByLabel.set(r.label, (countsByLabel.get(r.label) ?? 0) + 1);
    }

    // Ada's R1 measurement (feedback/design.md § "[ADA R1]" — D-B4's recipe,
    // confirmed unchanged at R2 (d)): types x37, build/tokens x1, registries x1,
    // OklchConverter x2. Reconciled here against a LIVE re-measurement — see the
    // Task 2.1 completion doc for the reconciliation write-up (no differences:
    // the live count matches R1 exactly).
    const R1_MEASUREMENT: Record<string, number> = {
      'src/types/**': 37,
      'src/build/tokens/**': 1,
      'src/registries/ComponentTokenRegistry': 1,
      'src/color/OklchConverter': 2,
    };

    for (const row of REWRITE_MAPPING_TABLE) {
      const count = countsByLabel.get(row.label) ?? 0;
      // "each exercised >= 1 by a real specifier" — the criterion's literal ask.
      expect(count).toBeGreaterThanOrEqual(1);
      // The full reconciliation against R1: exact equality, not just >= 1, so a
      // drift from the measured baseline is caught (and would need a recorded
      // attribution, not a silent pass).
      expect(count).toBe(R1_MEASUREMENT[row.label]);
    }
  });
});

function mkTmpDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'dp-rewrite-'));
}

function writeFile(root: string, relPath: string, content = ''): string {
  const full = path.join(root, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  return full;
}

describe('REWRITE_MAPPING_TABLE', () => {
  test('has exactly four rows', () => {
    // BITE (recorded red in the Task 2.1 completion doc): removing a row
    // turns this red.
    expect(REWRITE_MAPPING_TABLE.length).toBe(4);
  });
});

describe('rewriteByResolution — the four-row mapping table, each exercised ≥ 1', () => {
  let repoRoot: string;
  let tierRoot: string;

  beforeEach(() => {
    // A scratch tree shaped like the real repo: src/tokens (the tier),
    // src/types, src/build/tokens, src/registries, src/color as SIBLINGS.
    repoRoot = mkTmpDir();
    tierRoot = path.join(repoRoot, 'src', 'tokens');
    fs.mkdirSync(tierRoot, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(repoRoot, { recursive: true, force: true });
  });

  test('row 1: src/types/** → @3fn/core/types', () => {
    const file = writeFile(
      repoRoot,
      'src/tokens/index.ts',
      "import { PrimitiveToken, TokenCategory } from '../types/PrimitiveToken';\n"
    );
    const result = rewriteByResolution(fs.readFileSync(file, 'utf8'), file, tierRoot);
    expect(result.content).toContain("from '@3fn/core/types'");
    expect(result.rewrites).toEqual([{ specifier: '../types/PrimitiveToken', target: '@3fn/core/types', label: 'src/types/**' }]);
  });

  test('row 2: src/build/tokens/** → @3fn/core/build', () => {
    const file = writeFile(
      repoRoot,
      'src/tokens/component/progress.ts',
      "import { defineComponentTokens } from '../../build/tokens';\n"
    );
    const result = rewriteByResolution(fs.readFileSync(file, 'utf8'), file, tierRoot);
    expect(result.content).toContain("from '@3fn/core/build'");
    expect(result.rewrites[0].label).toBe('src/build/tokens/**');
  });

  test('row 3: src/registries/ComponentTokenRegistry → @3fn/core/build', () => {
    const file = writeFile(
      repoRoot,
      'src/tokens/component/progress.ts',
      "import type { RegisteredComponentToken } from '../../registries/ComponentTokenRegistry';\n"
    );
    const result = rewriteByResolution(fs.readFileSync(file, 'utf8'), file, tierRoot);
    expect(result.content).toContain("from '@3fn/core/build'");
    expect(result.rewrites[0].label).toBe('src/registries/ComponentTokenRegistry');
  });

  test('row 4: src/color/OklchConverter → @3fn/core/types', () => {
    const file = writeFile(
      repoRoot,
      'src/tokens/color/primitives/chromatic.ts',
      "import type { Oklch } from '../../../color/OklchConverter';\n"
    );
    const result = rewriteByResolution(fs.readFileSync(file, 'utf8'), file, tierRoot);
    expect(result.content).toContain("from '@3fn/core/types'");
    expect(result.rewrites[0].label).toBe('src/color/OklchConverter');
  });
});

describe('rewriteByResolution — intra-tree specifiers are NEVER touched (the whole-tier boundary)', () => {
  let repoRoot: string;
  let tierRoot: string;

  beforeEach(() => {
    repoRoot = mkTmpDir();
    tierRoot = path.join(repoRoot, 'src', 'tokens');
    fs.mkdirSync(tierRoot, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(repoRoot, { recursive: true, force: true });
  });

  test("themes/*/SemanticOverrides.ts's '../types' resolves INSIDE the tier (src/tokens/themes/types.ts) and stays untouched — D-B4's finding", () => {
    writeFile(repoRoot, 'src/tokens/themes/types.ts', 'export interface SemanticOverrideMap {}\n');
    const file = writeFile(
      repoRoot,
      'src/tokens/themes/dark/SemanticOverrides.ts',
      "import type { SemanticOverrideMap } from '../types';\n"
    );
    const result = rewriteByResolution(fs.readFileSync(file, 'utf8'), file, tierRoot);
    expect(result.content).toContain("from '../types'");
    expect(result.rewrites).toEqual([]);
  });

  test("progress.ts's '../../tokens/SpacingTokens' resolves INSIDE the tier when the boundary is the WHOLE tier, not step 3c's own root", () => {
    writeFile(repoRoot, 'src/tokens/SpacingTokens.ts', 'export const space100 = 8;\n');
    const file = writeFile(
      repoRoot,
      'src/tokens/component/progress.ts',
      "import { space100 } from '../../tokens/SpacingTokens';\n"
    );
    const result = rewriteByResolution(fs.readFileSync(file, 'utf8'), file, tierRoot);
    expect(result.content).toContain("from '../../tokens/SpacingTokens'");
    expect(result.rewrites).toEqual([]);
    // BITE (recorded red in the Task 2.1 completion doc): passing step 3c's OWN
    // root (src/tokens/component) as tierRoot instead of the whole tier
    // (src/tokens) makes this specifier resolve OUTSIDE with no mapping row,
    // and init would fail loudly at 3c for every install — exactly the defect
    // Ada's D-B4/R2 pre-implementation fix exists to prevent.
  });
});

describe('rewriteByResolution — an unmapped out-of-tier specifier fails the copy loudly', () => {
  let repoRoot: string;
  let tierRoot: string;

  beforeEach(() => {
    repoRoot = mkTmpDir();
    tierRoot = path.join(repoRoot, 'src', 'tokens');
    fs.mkdirSync(tierRoot, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(repoRoot, { recursive: true, force: true });
  });

  test('a relative specifier resolving outside the tier with no mapping row throws UnmappedSpecifierError', () => {
    const file = writeFile(
      repoRoot,
      'src/tokens/index.ts',
      "import { somethingUnmapped } from '../validators/SomeValidator';\n"
    );
    expect(() => rewriteByResolution(fs.readFileSync(file, 'utf8'), file, tierRoot)).toThrow(UnmappedSpecifierError);
  });
});
