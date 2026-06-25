/**
 * Dynamic-Import Smoke Test — PREVENTIVE guard
 *
 * Spec 118 Task 4.1 (R10 AC2a)
 *
 * PREVENTIVE: a grep of src/components for runtime `import(` returns ZERO today
 * (verified 2026-06-24). This test guards a *future* regression — it is NOT
 * responding to an active failure mode.
 *
 * What this asserts:
 *   No web component source file (src/components/**\/*.{ts,tsx}) introduces an
 *   extensionless or raw-.ts runtime dynamic `import()`. Specifically:
 *
 *   - Extensionless: import('./foo') or import("../bar") — no file extension
 *   - Raw .ts suffix: import('./foo.ts') or import("../bar.ts")
 *
 * Why these are forbidden in web component source:
 *   - Extensionless dynamic imports fail under Node's strict-ESM resolver
 *     (the production path this spec's Task 2 repaired for loadConfig).
 *   - Raw .ts imports are a ts-jest artifact; they have no meaning at runtime
 *     in a bundled or ESM-strict execution environment.
 *
 * Scope: src/components/**\/*.{ts,tsx} ONLY.
 *   - Excludes __tests__/, *.test.ts, *.spec.ts (test files are not web component source)
 *   - Excludes examples/
 *   - Out-of-scope: src/build/validation/MathematicalConsistencyValidator.ts uses
 *     `await import('../../tokens')` — these are build-time validation dynamic imports
 *     in a non-component file, resolved via the runtime mechanism (3a lane), NOT the
 *     web static-bundle path. That file is NOT in src/components/ and is excluded.
 *   - iOS Swift / Android Kotlin platform files never traverse Node resolution.
 *
 * Type-only inline imports (e.g. `value: import('../types').Foo` in a type annotation)
 * are NOT a concern at this scope: the verified baseline is ZERO dynamic import() calls
 * in src/components source. If a future type-only inline import appears in component
 * source, add an inline `// eslint-disable-next-line` style exclusion comment and
 * document the exception here.
 *
 * This test runs under the standard `npm test` jest run AND in the consumer-guard
 * CI lane (.github/workflows/consumer-guard.yml) — no separate CI host needed.
 *
 * @see Spec 118 Task 4.1 (R10 AC2a — preventive dynamic-import smoke test)
 * @see Spec 118 Task 3.2 (.github/workflows/consumer-guard.yml — the CI lane)
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

/**
 * Relative-path dynamic import patterns forbidden in web component source.
 *
 * Matches: import( './path' )  import( "../path" )  with relative specifiers.
 * Two sub-cases are flagged:
 *   1. Extensionless: the specifier has no extension (no dot after the last slash)
 *   2. Raw .ts suffix: the specifier ends with .ts
 *
 * Non-relative imports (bare specifiers like import('some-package')) are NOT flagged
 * — they have no extension-ambiguity problem and are out of scope.
 *
 * Design note: we intentionally do NOT try to detect type-only inline imports
 * (e.g. `value: import('../types').Foo`) via heuristic because:
 *  (a) the baseline is ZERO dynamic imports in component source — no exclusion needed
 *  (b) heuristics on the preceding-character context are brittle (=> looks like =)
 *  (c) a preventive guard prefers false positives over false negatives
 */
const RELATIVE_DYNAMIC_IMPORT =
  /\bimport\s*\(\s*(['"])(\.\.?\/[^'"]*?)\1\s*\)/g;

/** File extensions safe in dynamic imports (not extensionless, not .ts) */
const SAFE_EXTENSION = /\.(js|mjs|cjs|jsx|json|css|svg|png|jpg|gif|webp|wasm)$/i;

interface Violation {
  file: string;
  line: number;
  text: string;
  reason: string;
}

/**
 * Get all web component source files under src/components/.
 * Scoped to .ts and .tsx. Excludes test files, spec files, and examples.
 */
function getWebComponentSourceFiles(): string[] {
  const componentsDir = path.resolve(__dirname, '..');

  return glob.sync('**/*.{ts,tsx}', {
    cwd: componentsDir,
    absolute: true,
    ignore: [
      '**/node_modules/**',
      '**/__tests__/**',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/examples/**',
    ],
  });
}

/**
 * Scan a file for forbidden runtime dynamic import() patterns.
 * Returns all violations found (empty if clean).
 */
function findViolations(filePath: string, content: string): Violation[] {
  const violations: Violation[] = [];
  const lines = content.split('\n');
  const relPath = path.relative(
    path.resolve(__dirname, '../../..'),
    filePath
  );

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Skip pure comment lines — cannot contain runtime dynamic imports
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) return;

    // Reset lastIndex for global regex between lines
    RELATIVE_DYNAMIC_IMPORT.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = RELATIVE_DYNAMIC_IMPORT.exec(line)) !== null) {
      const specifier = match[2];

      // Determine whether this is extensionless or raw .ts
      const hasTsExtension = specifier.endsWith('.ts');
      const lastSlashIndex = specifier.lastIndexOf('/');
      const lastSegment = specifier.slice(lastSlashIndex + 1);
      const hasNoExtension = !lastSegment.includes('.');

      if (hasTsExtension) {
        violations.push({
          file: relPath,
          line: lineNumber,
          text: trimmed,
          reason: `Raw .ts extension in dynamic import: import('${specifier}')`,
        });
      } else if (hasNoExtension) {
        violations.push({
          file: relPath,
          line: lineNumber,
          text: trimmed,
          reason: `Extensionless relative dynamic import: import('${specifier}')`,
        });
      } else if (!SAFE_EXTENSION.test(specifier)) {
        // Has an extension but it's not in our safe list — flag as suspicious
        violations.push({
          file: relPath,
          line: lineNumber,
          text: trimmed,
          reason: `Unrecognized extension in dynamic import: import('${specifier}')`,
        });
      }
      // else: safe extension (.js, .json, etc.) — not a violation
    }
  });

  return violations;
}

// ---------------------------------------------------------------------------

describe('Dynamic-Import Smoke Guard — Web Component Source (Spec 118 Task 4.1)', () => {
  let sourceFiles: string[];

  beforeAll(() => {
    sourceFiles = getWebComponentSourceFiles();
  });

  it('finds web component source files to scan (sanity check)', () => {
    // If this fails, the glob or directory structure changed — the guard has no scope
    expect(sourceFiles.length).toBeGreaterThan(0);
  });

  it('scanned set excludes test files (scope discipline check)', () => {
    const testFiles = sourceFiles.filter(
      (f) =>
        f.includes('__tests__') ||
        f.includes('.test.ts') ||
        f.includes('.test.tsx')
    );
    expect(testFiles).toHaveLength(0);
  });

  it(
    'PREVENTIVE: no web component source introduces an extensionless or raw-.ts runtime dynamic import()',
    () => {
      /**
       * PREVENTIVE guard — this is NOT fixing an active failure.
       * Verified 2026-06-24: src/components has ZERO runtime dynamic import() calls.
       * This test asserts that future changes do not introduce them.
       *
       * If this test fails, a web component file has introduced a dynamic import()
       * with an extensionless or .ts-suffixed relative specifier. Fix options:
       *   (a) Add the appropriate extension (.js for bundled/ESM output)
       *   (b) Refactor to a static import
       * Do NOT simply suppress the test — the guard exists to catch this regression.
       *
       * Scope: src/components/**\/*.{ts,tsx} (excluding __tests__/, examples/)
       * Out of scope: src/build/validation/MathematicalConsistencyValidator.ts
       *   (build-time validation; not in src/components/)
       */
      const allViolations: Violation[] = [];

      for (const filePath of sourceFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        allViolations.push(...findViolations(filePath, content));
      }

      if (allViolations.length > 0) {
        const report = allViolations
          .map((v) => `  ${v.file}:${v.line} — ${v.reason}\n    > ${v.text}`)
          .join('\n');
        throw new Error(
          `PREVENTIVE guard tripped: forbidden dynamic import() in web component source.\n` +
            `Extensionless and raw-.ts dynamic imports fail in production (strict-ESM resolver).\n\n` +
            `Violations (${allViolations.length}):\n${report}`
        );
      }

      expect(allViolations).toHaveLength(0);
    }
  );
});
