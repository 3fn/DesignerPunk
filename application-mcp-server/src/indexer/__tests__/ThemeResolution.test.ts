/**
 * @category evergreen
 * @purpose Pin get_token_details' DARK resolution for Level 2 theme-varying tokens
 *
 * REGRESSION UNDER TEST (.kiro/issues/2026-09-12-mcp-token-details-dark-value-stale.md)
 * -------------------------------------------------------------------------------------
 * `get_token_details` resolved a token's BASE `primitiveReferences` only, so every token
 * carrying a Level 2 dark override (src/tokens/themes/dark/SemanticOverrides.ts) was reported
 * with its LIGHT value — including inside the `dark` slot of the resolved colour bundle,
 * because legacy colour primitives have identical light.base and dark.base. The MCP is the
 * agents' source of truth; it was authoritative and wrong for every theme-varying token.
 *
 * These tests run against the LIVE corpus (repo token-index + the real dark theme file) —
 * that is deliberate: the defect was a disagreement between two real files, and a synthetic
 * fixture could not have caught it. Fixture-backed cases below cover the null/absence and
 * missing-file contracts, which the live corpus cannot exercise.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { TokenIndexer } from '../TokenIndexer';
import { parseSemanticOverrides } from '../SemanticOverrideReader';

/** __tests__ → indexer → src → application-mcp-server → repo root */
const REPO_ROOT = path.resolve(__dirname, '../../../../');
const TOKEN_INDEX_DIR = path.join(REPO_ROOT, 'token-index');
const DARK_OVERRIDES = path.join(REPO_ROOT, 'src/tokens/themes/dark/SemanticOverrides.ts');

/**
 * Snapshot literals for the primitives these tests pin. If a primitive's value legitimately
 * changes, update the literal here AND confirm the change was intended — the point of the
 * literal is that a silent light/dark mix-up cannot hide behind a relational assertion
 * (legacy primitives have light.base === dark.base, so relational checks alone are blind).
 */
const GRAY400_DARK_BASE = 'oklch(0.42 0.018 260)';
const WHITE100_DARK_BASE = 'oklch(1 0 260)';
const WHITE300_DARK_BASE = 'oklch(0.9 0.01 260)';

describe('get_token_details — dark theme resolution (live corpus)', () => {
  let indexer: TokenIndexer;

  beforeAll(async () => {
    indexer = new TokenIndexer();
    await indexer.indexTokens(TOKEN_INDEX_DIR, REPO_ROOT);
  });

  it('loads the live corpus without theme-override warnings', () => {
    expect(fs.existsSync(DARK_OVERRIDES)).toBe(true);
    expect(indexer.getWarnings()).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // THE REPORTED BUG — color.structure.canvas (dark override → gray400 since Spec 050)
  // -------------------------------------------------------------------------
  describe('color.structure.canvas', () => {
    it('reports the dark override (gray400), NOT the light base (white100)', () => {
      const details = indexer.getDetails('color.structure.canvas')!;
      expect(details.themeResolutions.dark).not.toBeNull();

      const dark = details.themeResolutions.dark!;
      expect(dark.primitiveReferences).toEqual({ value: 'gray400' });
      expect(dark.resolutionDepth).toBe('full');
      expect(dark.resolvedUnitType).toBe('color');
      // The assertion the bug would have failed: dark value is gray400's, not white100's.
      expect(dark.modeValue).toBe(GRAY400_DARK_BASE);
      expect(dark.modeValue).not.toBe(WHITE100_DARK_BASE);
    });

    it('leaves the base triple untouched (still the LIGHT resolution — additive fix)', () => {
      const details = indexer.getDetails('color.structure.canvas')!;
      expect(details.primitiveReferences).toEqual({ value: 'white100' });
      expect(details.resolutionDepth).toBe('full');
      expect((details.resolvedValue as any).light.base).toBe(WHITE100_DARK_BASE);
    });

    it('exposes the full primitive bundle on the dark resolution (same shape rules as base)', () => {
      const dark = indexer.getDetails('color.structure.canvas')!.themeResolutions.dark!;
      expect((dark.resolvedValue as any).dark.base).toBe(GRAY400_DARK_BASE);
      expect((dark.resolvedValue as any).light.base).toBe(GRAY400_DARK_BASE);
    });
  });

  // -------------------------------------------------------------------------
  // The 2026-09-13 dark text-hierarchy overrides (WCAG AA interim remediation)
  // -------------------------------------------------------------------------
  describe('text hierarchy overrides (2026-09-13)', () => {
    it('color.text.default resolves dark to white100', () => {
      const dark = indexer.getDetails('color.text.default')!.themeResolutions.dark!;
      expect(dark.primitiveReferences).toEqual({ value: 'white100' });
      expect(dark.modeValue).toBe(WHITE100_DARK_BASE);
      expect(dark.resolutionDepth).toBe('full');
    });

    it('color.text.muted resolves dark to white300', () => {
      const dark = indexer.getDetails('color.text.muted')!.themeResolutions.dark!;
      expect(dark.primitiveReferences).toEqual({ value: 'white300' });
      expect(dark.modeValue).toBe(WHITE300_DARK_BASE);
    });

    it('color.feedback.success.text resolves dark to green300 (Spec 112 F4)', () => {
      const dark = indexer.getDetails('color.feedback.success.text')!.themeResolutions.dark!;
      expect(dark.primitiveReferences).toEqual({ value: 'green300' });
      expect(dark.resolutionDepth).toBe('full');
      expect(dark.modeValue).not.toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Composite override — documented partial behaviour, not a silent mishandle
  // -------------------------------------------------------------------------
  it('composite override (color.structure.border.subtle) reports partial + both refs', () => {
    const dark = indexer.getDetails('color.structure.border.subtle')!.themeResolutions.dark!;
    expect(dark.primitiveReferences).toEqual({ color: 'gray500', opacity: 'opacity048' });
    // No honest single terminal value for colour+opacity — mirrors the base triple's
    // multi-ref branch rather than silently collapsing to one of the two refs.
    expect(dark.resolutionDepth).toBe('partial');
    expect(dark.resolvedValue).toBe('color.structure.border.subtle');
    expect(dark.modeValue).toBeNull();
  });

  // -------------------------------------------------------------------------
  // NULL CONTRACT — dark === null means "dark resolves like the base triple"
  // -------------------------------------------------------------------------
  describe('null contract for non-overridden tokens', () => {
    it('a wcag-only override (color.action.primary) reports dark: null — correctly', () => {
      // color.action.primary IS overridden in src/tokens/themes/wcag (cyan300 → teal300) but
      // NOT in dark. dark: null is therefore the right answer today. It also shows why the
      // wcag theme was deferred rather than folded in: the index's own `themeVarying` flag is
      // computed from the DARK override union only, so wcag overrides are invisible here too.
      const details = indexer.getDetails('color.action.primary')!;
      expect(details.themeVarying).toBe(false);
      expect(details.themeResolutions.dark).toBeNull();
    });

    it('a non-colour semantic (space.grouped.normal) reports dark: null', () => {
      const details = indexer.getDetails('space.grouped.normal');
      expect(details).not.toBeNull();
      expect(details!.themeResolutions.dark).toBeNull();
    });

    it('a primitive (white100) reports dark: null — overrides are semantic-tier only', () => {
      expect(indexer.getDetails('white100')!.themeResolutions.dark).toBeNull();
    });

    it('themeResolutions is ALWAYS present, never omitted', () => {
      for (const name of ['white100', 'color.action.primary', 'color.structure.canvas']) {
        const details = indexer.getDetails(name)!;
        expect(Object.prototype.hasOwnProperty.call(details, 'themeResolutions')).toBe(true);
      }
    });
  });

  it('every dark override key in the theme file resolves to a non-null dark resolution', () => {
    const { overrides } = parseSemanticOverrides(DARK_OVERRIDES);
    expect(overrides.size).toBeGreaterThan(0);
    for (const name of Array.from(overrides.keys())) {
      const details = indexer.getDetails(name);
      expect(details).not.toBeNull();
      expect(details!.themeResolutions.dark).not.toBeNull();
    }
  });
});

// ===========================================================================
// Fixture-backed: the cases the live corpus cannot exercise
// ===========================================================================

describe('dark theme resolution — missing theme file (degraded, but NOT silent)', () => {
  let tmpDir: string;
  let indexer: TokenIndexer;

  beforeAll(async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-theme-res-'));
    const tokenDir = path.join(tmpDir, 'token-index');
    fs.mkdirSync(tokenDir, { recursive: true });
    fs.writeFileSync(path.join(tokenDir, 'primitives.yaml'), yaml.dump({
      tokens: { gray400: { family: 'color', value: { light: { base: 'L' }, dark: { base: 'D' } }, platforms: { web: '--gray-400', ios: 'gray400', android: 'gray_400' } } },
    }));
    fs.writeFileSync(path.join(tokenDir, 'semantics.yaml'), yaml.dump({
      tokens: { 'color.structure.canvas': { category: 'color', primitiveReferences: { value: 'gray400' }, themeVarying: true, platforms: { web: '--x', ios: 'x', android: 'x' } } },
    }));

    indexer = new TokenIndexer();
    await indexer.indexTokens(tokenDir, tmpDir); // tmpDir has no src/tokens/themes/**
  });

  afterAll(() => fs.rmSync(tmpDir, { recursive: true, force: true }));

  it('warns when the dark theme file is absent', () => {
    expect(indexer.getWarnings().some(w => w.includes('Dark theme overrides not found'))).toBe(true);
  });

  it('still answers, with dark: null (never throws, never invents a value)', () => {
    expect(indexer.getDetails('color.structure.canvas')!.themeResolutions.dark).toBeNull();
  });
});

describe('SemanticOverrideReader', () => {
  it('parses the live dark theme file: keys + refs', () => {
    const { overrides, fileFound } = parseSemanticOverrides(DARK_OVERRIDES);
    expect(fileFound).toBe(true);
    expect(overrides.get('color.structure.canvas')).toEqual({ value: 'gray400' });
    expect(overrides.get('color.structure.border.subtle')).toEqual({ color: 'gray500', opacity: 'opacity048' });
  });

  it('ignores commented-out (fallback) entries — only the exported map counts', () => {
    const { overrides } = parseSemanticOverrides(DARK_OVERRIDES);
    // Present as a commented Level 1 fallback line in the theme file, not in the exported map.
    expect(overrides.has('color.identity.human')).toBe(false);
  });

  it('reports fileFound: false for a missing file (no throw)', () => {
    const { overrides, fileFound } = parseSemanticOverrides('/nonexistent/SemanticOverrides.ts');
    expect(fileFound).toBe(false);
    expect(overrides.size).toBe(0);
  });

  it('handles multi-line and nested-brace entries via balanced-brace extraction', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-override-parse-'));
    const file = path.join(dir, 'SemanticOverrides.ts');
    fs.writeFileSync(file, [
      "export const x: SemanticOverrideMap = {",
      "  'a.multi.line': {",
      "    primitiveReferences: {",
      "      value: 'gray400',",
      "    },",
      "  },",
      "  'b.composite': { primitiveReferences: { color: 'gray500', opacity: 'opacity048' } },",
      "};",
      "",
    ].join('\n'));

    const { overrides } = parseSemanticOverrides(file);
    expect(overrides.get('a.multi.line')).toEqual({ value: 'gray400' });
    expect(overrides.get('b.composite')).toEqual({ color: 'gray500', opacity: 'opacity048' });

    fs.rmSync(dir, { recursive: true, force: true });
  });
});
