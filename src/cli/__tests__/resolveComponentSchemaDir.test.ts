/**
 * @jest-environment node
 * @category evergreen
 * @purpose Regression test for `.kiro/issues/2026-09-26-product-server-component-root.md`'s
 *   sibling defect (Fix 2, U1 fix-up 2026-09-26): the token-index's Class C′
 *   component-schema scan root must reflect a BORN repo's own consumer tree
 *   (`<bornRoot>/src/components`, Req 19A.2/19A.6), never the removed
 *   `.../src/components/core` copy `init` no longer writes. Every other
 *   design-system state (package-mode — including the steward repo's own
 *   dev-mode classification — partial, unborn) is unchanged.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { resolveComponentSchemaDir } from '../designerpunk';

function writeComponent(root: string, name: string): void {
  fs.mkdirSync(path.join(root, name), { recursive: true });
  fs.writeFileSync(path.join(root, name, 'component-meta.yaml'), `purpose: ${name} fixture\n`);
  fs.writeFileSync(path.join(root, name, `${name}.schema.yaml`), `name: ${name}\n`);
}

describe('resolveComponentSchemaDir', () => {
  let tmp: string;

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'resolve-component-schema-dir-'));
  });

  afterEach(() => {
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it('BORN repo: a component directly under src/components/ is the reflected root', () => {
    const bornRoot = path.join(tmp, 'born');
    const componentsDir = path.join(bornRoot, 'src', 'components');
    writeComponent(componentsDir, 'MyButton');
    fs.writeFileSync(path.join(componentsDir, 'README.md'), '# Your components\n');

    const resolved = resolveComponentSchemaDir({ state: 'born', root: bornRoot }, bornRoot);

    expect(resolved).toBe(path.resolve(componentsDir));
  });

  it('BORN repo, freshly born (README only, no components yet): still the flat root, not core/', () => {
    const bornRoot = path.join(tmp, 'born');
    const componentsDir = path.join(bornRoot, 'src', 'components');
    fs.mkdirSync(componentsDir, { recursive: true });
    fs.writeFileSync(path.join(componentsDir, 'README.md'), '# Your components\n');

    const resolved = resolveComponentSchemaDir({ state: 'born', root: bornRoot }, bornRoot);

    expect(resolved).toBe(path.resolve(componentsDir));
  });

  it('BORN repo, legacy pre-123 layout (component nested under src/components/core/, not yet migrated): the legacy level is used', () => {
    const bornRoot = path.join(tmp, 'born');
    const legacyDir = path.join(bornRoot, 'src', 'components', 'core');
    writeComponent(legacyDir, 'LegacyButton');

    const resolved = resolveComponentSchemaDir({ state: 'born', root: bornRoot }, bornRoot);

    expect(resolved).toBe(path.resolve(legacyDir));
  });

  it('PACKAGE-MODE (the steward repo\'s own dev-mode classification): UNCHANGED — always <configDir>/src/components/core', () => {
    const configDir = path.join(tmp, 'steward-repo');
    fs.mkdirSync(configDir, { recursive: true });

    const resolved = resolveComponentSchemaDir({ state: 'package-mode', root: configDir }, configDir);

    expect(resolved).toBe(path.resolve(configDir, 'src/components/core'));
  });

  it('UNBORN: falls through to the unchanged default, same as package-mode', () => {
    const configDir = path.join(tmp, 'unborn-repo');
    fs.mkdirSync(configDir, { recursive: true });

    const resolved = resolveComponentSchemaDir({ state: 'unborn', root: null }, configDir);

    expect(resolved).toBe(path.resolve(configDir, 'src/components/core'));
  });

  it('BITE: restoring the hardcoded core path for a born repo turns the flat-tree case RED', () => {
    const bornRoot = path.join(tmp, 'born');
    const componentsDir = path.join(bornRoot, 'src', 'components');
    writeComponent(componentsDir, 'MyButton');

    // The pre-fix behavior: always `<configDir>/src/components/core`, regardless of state.
    const preFixResolved = path.resolve(bornRoot, 'src/components/core');

    // The fixed resolver does NOT match the pre-fix path for a born repo with a
    // flat component tree — this is the property the fix changes.
    const resolved = resolveComponentSchemaDir({ state: 'born', root: bornRoot }, bornRoot);
    expect(resolved).not.toBe(preFixResolved);
    expect(fs.existsSync(preFixResolved)).toBe(false); // the hardcoded path scans nothing in this fixture
    expect(fs.existsSync(resolved)).toBe(true); // the fixed path scans the consumer's real tree
  });
});
