/**
 * @category evergreen
 * @purpose Verify all package.json exports resolve and export expected symbols (Spec 106 R7)
 */

import * as fs from 'fs';
import * as path from 'path';

const PKG_ROOT = path.resolve(__dirname, '../..');
const pkg = JSON.parse(fs.readFileSync(path.join(PKG_ROOT, 'package.json'), 'utf-8'));
const expectedExports = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'expected-exports.json'), 'utf-8')
);

describe('Package export contracts (Spec 106 R7)', () => {
  const exportEntries = Object.entries(pkg.exports) as [string, any][];

  describe('all exports declared in package.json have a manifest entry', () => {
    for (const [subpath] of exportEntries) {
      it(`${subpath} is in expected-exports.json`, () => {
        expect(expectedExports[subpath]).toBeDefined();
      });
    }
  });

  describe('all export paths resolve to existing files', () => {
    for (const [subpath, config] of exportEntries) {
      const paths: string[] = [];
      if (typeof config === 'string') {
        paths.push(config);
      } else {
        if (config.import) paths.push(config.import);
        if (config.require) paths.push(config.require);
        if (config.types) paths.push(config.types);
      }

      for (const p of paths) {
        it(`${subpath} → ${p} exists`, () => {
          const resolved = path.resolve(PKG_ROOT, p);
          expect(fs.existsSync(resolved)).toBe(true);
        });
      }
    }
  });

  describe('module exports contain expected symbols', () => {
    for (const [subpath, manifest] of Object.entries(expectedExports) as [string, any][]) {
      if (!manifest.expectedExports || manifest.expectedExports.length === 0) continue;

      const config = pkg.exports[subpath];
      if (!config) continue;

      const modulePath = typeof config === 'string' ? config : config.require || config.import;
      if (!modulePath) continue;

      // Skip CSS and JSON
      if (modulePath.endsWith('.css') || modulePath.endsWith('.json')) continue;

      describe(subpath, () => {
        let mod: any;

        beforeAll(() => {
          const resolved = path.resolve(PKG_ROOT, modulePath);
          mod = require(resolved);
        });

        for (const symbol of manifest.expectedExports) {
          it(`exports "${symbol}"`, () => {
            expect(mod[symbol]).toBeDefined();
          });
        }
      });
    }
  });

  describe('no exports were removed (manifest completeness)', () => {
    for (const subpath of Object.keys(expectedExports)) {
      it(`${subpath} still in package.json exports`, () => {
        expect(pkg.exports[subpath]).toBeDefined();
      });
    }
  });
});
