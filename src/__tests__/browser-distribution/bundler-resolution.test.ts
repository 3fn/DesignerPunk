/**
 * @jest-environment node
 * @category evergreen
 * @purpose Verify npm package exports resolve correctly for bundlers
 */

/**
 * Bundler Resolution Tests
 *
 * Tests that verify package.json exports configuration enables bundlers
 * to correctly resolve imports to the ESM browser bundle.
 *
 * Updated for Spec 095 — ESM-only root export, new export paths,
 * legacy CJS and BlendUtilities exports removed.
 *
 * @see .kiro/specs/095-ecosystem-package-assembly/design.md
 */

import * as fs from 'fs';
import * as path from 'path';

describe('Bundler Resolution', () => {
  const PROJECT_ROOT = process.cwd();
  const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, 'package.json');

  let packageJson: Record<string, any>;

  beforeAll(() => {
    const packageJsonContent = fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8');
    packageJson = JSON.parse(packageJsonContent);
  });

  describe('Package Identity', () => {
    it('should be named @3fn/core', () => {
      expect(packageJson.name).toBe('@3fn/core');
    });
  });

  describe('Exports Configuration', () => {
    it('should have exports field defined', () => {
      expect(packageJson.exports).toBeDefined();
      expect(typeof packageJson.exports).toBe('object');
    });

    it('should have ESM-only root export (no require condition)', () => {
      const mainExport = packageJson.exports['.'];
      expect(mainExport.import).toBe('./dist/browser/designerpunk.esm.js');
      expect(mainExport.types).toBe('./dist/browser-entry.d.ts');
      expect(mainExport.require).toBeUndefined();
    });

    it('should have ./components alias for root', () => {
      const comp = packageJson.exports['./components'];
      expect(comp.import).toBe('./dist/browser/designerpunk.esm.js');
    });

    it('should have tokens.css pointing to generated output', () => {
      expect(packageJson.exports['./tokens.css']).toBe('./dist/DesignTokens.web.css');
    });

    it('should have component-tokens.css export', () => {
      expect(packageJson.exports['./component-tokens.css']).toBe('./dist/ComponentTokens.web.css');
    });

    it('should have config export with types', () => {
      const config = packageJson.exports['./config'];
      expect(config.import).toBe('./dist/config/index.js');
      expect(config.types).toBe('./dist/config/index.d.ts');
    });

    // Spec 118 Task 9.2 (Increment 3b): the three raw-`.ts` subpath exports were
    // reconciled to compiled dist (mirroring the `./config` precedent), so a packed
    // consumer resolves them to JS without a TS loader. See findings + consumer guard.
    it('should have blend export pointing to compiled dist', () => {
      const blend = packageJson.exports['./blend'];
      expect(blend.import).toBe('./dist/blend/index.js');
      expect(blend.require).toBe('./dist/blend/index.js');
      expect(blend.types).toBe('./dist/blend/index.d.ts');
    });

    it('should have build export pointing to compiled dist', () => {
      const build = packageJson.exports['./build'];
      expect(build.import).toBe('./dist/build/tokens/index.js');
      expect(build.require).toBe('./dist/build/tokens/index.js');
      expect(build.types).toBe('./dist/build/tokens/index.d.ts');
    });

    it('should have types export pointing to compiled dist', () => {
      const types = packageJson.exports['./types'];
      expect(types.import).toBe('./dist/types/index.js');
      expect(types.require).toBe('./dist/types/index.js');
      expect(types.types).toBe('./dist/types/index.d.ts');
    });

    it('should have grid.css export', () => {
      expect(packageJson.exports['./grid.css']).toBe('./src/styles/responsive-grid.css');
    });

    it('should have font exports', () => {
      expect(packageJson.exports['./fonts/inter.css']).toBe('./src/assets/fonts/inter/inter.css');
      expect(packageJson.exports['./fonts/rajdhani.css']).toBe('./src/assets/fonts/rajdhani/rajdhani.css');
    });

    it('should NOT have legacy BlendUtilities export', () => {
      expect(packageJson.exports['./BlendUtilities']).toBeUndefined();
    });
  });

  describe('Legacy Field Configuration', () => {
    it('should have browser field pointing to ESM bundle', () => {
      expect(packageJson.browser).toBe('./dist/browser/designerpunk.esm.js');
    });

    it('should have module field pointing to ESM bundle', () => {
      expect(packageJson.module).toBe('./dist/browser/designerpunk.esm.js');
    });

    it('should have main field pointing to ESM bundle', () => {
      expect(packageJson.main).toBe('./dist/browser/designerpunk.esm.js');
    });

    it('should have types field pointing to browser-entry declarations', () => {
      expect(packageJson.types).toBe('./dist/browser-entry.d.ts');
    });
  });

  describe('Export Target File Existence', () => {
    it('should have ESM bundle at export path', () => {
      const esmPath = path.join(PROJECT_ROOT, 'dist', 'browser', 'designerpunk.esm.js');
      expect(fs.existsSync(esmPath)).toBe(true);
    });

    it('should have design tokens CSS at export path', () => {
      const tokensPath = path.join(PROJECT_ROOT, 'dist', 'DesignTokens.web.css');
      expect(fs.existsSync(tokensPath)).toBe(true);
    });

    it('should have component tokens CSS at export path', () => {
      const tokensPath = path.join(PROJECT_ROOT, 'dist', 'ComponentTokens.web.css');
      expect(fs.existsSync(tokensPath)).toBe(true);
    });

    it('should have blend utilities at export path', () => {
      const blendPath = path.join(PROJECT_ROOT, 'src', 'blend', 'index.ts');
      expect(fs.existsSync(blendPath)).toBe(true);
    });

    it('should have responsive grid CSS at export path', () => {
      const gridPath = path.join(PROJECT_ROOT, 'src', 'styles', 'responsive-grid.css');
      expect(fs.existsSync(gridPath)).toBe(true);
    });

    it('should have font CSS files at export paths', () => {
      expect(fs.existsSync(path.join(PROJECT_ROOT, 'src', 'assets', 'fonts', 'inter', 'inter.css'))).toBe(true);
      expect(fs.existsSync(path.join(PROJECT_ROOT, 'src', 'assets', 'fonts', 'rajdhani', 'rajdhani.css'))).toBe(true);
    });
  });

  describe('Bundler Resolution Simulation', () => {
    it('should resolve ESM import to browser bundle', () => {
      const resolvedPath = resolvePackageExport(packageJson, '.', 'import');
      expect(resolvedPath).toBe('./dist/browser/designerpunk.esm.js');

      const absolutePath = path.join(PROJECT_ROOT, resolvedPath!);
      expect(fs.existsSync(absolutePath)).toBe(true);

      const content = fs.readFileSync(absolutePath, 'utf-8');
      expect(content).toMatch(/export\s*\{/);
    });

    it('should resolve tokens.css import correctly', () => {
      const resolvedPath = resolvePackageExport(packageJson, './tokens.css', 'import');
      expect(resolvedPath).toBe('./dist/DesignTokens.web.css');

      const absolutePath = path.join(PROJECT_ROOT, resolvedPath!);
      expect(fs.existsSync(absolutePath)).toBe(true);

      const content = fs.readFileSync(absolutePath, 'utf-8');
      expect(content).toContain(':root');
    });

    it('should fall back to module field for legacy bundlers', () => {
      expect(packageJson.module).toBe('./dist/browser/designerpunk.esm.js');
      const absolutePath = path.join(PROJECT_ROOT, packageJson.module);
      expect(fs.existsSync(absolutePath)).toBe(true);
    });
  });

  describe('ESM Bundle Content Verification', () => {
    it('should have valid ESM module that exports components', () => {
      const esmPath = path.join(PROJECT_ROOT, 'dist', 'browser', 'designerpunk.esm.js');
      const content = fs.readFileSync(esmPath, 'utf-8');

      expect(content).toMatch(/export\s*\{[^}]*ButtonCTA[^}]*\}/);
      expect(content).toMatch(/export\s*\{[^}]*IconBaseElement[^}]*\}/);
      expect(content).toMatch(/export\s*\{[^}]*ContainerBaseWeb[^}]*\}/);
    });

    it('should not have CommonJS syntax in ESM bundle', () => {
      const esmPath = path.join(PROJECT_ROOT, 'dist', 'browser', 'designerpunk.esm.js');
      const content = fs.readFileSync(esmPath, 'utf-8');

      expect(content).not.toMatch(/module\.exports\s*=/);
      expect(content).not.toMatch(/exports\.\w+\s*=/);
    });
  });
});

function resolvePackageExport(
  packageJson: Record<string, any>,
  exportPath: string,
  condition: 'import' | 'require'
): string | undefined {
  if (packageJson.exports) {
    const exportEntry = packageJson.exports[exportPath];
    if (typeof exportEntry === 'string') return exportEntry;
    if (typeof exportEntry === 'object' && exportEntry !== null) return exportEntry[condition];
  }
  if (exportPath === '.') {
    return condition === 'import' ? (packageJson.module || packageJson.browser) : packageJson.main;
  }
  return undefined;
}
