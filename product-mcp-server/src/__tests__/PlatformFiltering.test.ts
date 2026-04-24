/**
 * @jest-environment node
 * @category evergreen
 * @purpose Tests for platform-aware filtering — web agent doesn't see iOS-only warnings
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const TEST_DIR = path.join(__dirname, 'fixtures', 'platform-filter-test');

function createFixtures(): void {
  const dirs = [
    '',
    'experience-map/verticals',
    'components/ios-only-widget',
  ];
  for (const dir of dirs) fs.mkdirSync(path.join(TEST_DIR, dir), { recursive: true });

  // Screen with a one-off component only in the iOS branch
  fs.writeFileSync(path.join(TEST_DIR, 'experience-map/verticals/test-screen.yaml'), yaml.dump({
    name: 'test-screen', type: 'vertical',
    status: { web: 'in-progress', ios: 'in-progress' },
    'ui-tree': {
      shared: [
        { component: 'Container-Base' },
        { component: 'shared-missing-widget' },
      ],
      ios: [
        { component: 'ios-only-widget' },
        { component: 'ios-missing-widget' },
      ],
      web: [
        { component: 'Container-Base' },
      ],
    },
  }));

  // Only register ios-only-widget as a one-off
  fs.writeFileSync(
    path.join(TEST_DIR, 'components/ios-only-widget/ios-only-widget.schema.yaml'),
    yaml.dump({ name: 'ios-only-widget', purpose: 'iOS-specific widget' })
  );
}

// Inline the server's resolve logic for testing
function filterPlatform(spec: Record<string, unknown>, platform: string): Record<string, unknown> {
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(spec)) {
    if (value && typeof value === 'object' && !Array.isArray(value) && 'shared' in (value as any)) {
      const branched = value as Record<string, unknown>;
      const shared = branched.shared;
      const platformData = branched[platform];
      if (platformData && Array.isArray(shared) && Array.isArray(platformData)) {
        filtered[key] = [...shared, ...platformData];
      } else if (platformData && typeof shared === 'object' && typeof platformData === 'object') {
        filtered[key] = { ...shared as object, ...platformData as object };
      } else if (platformData !== undefined) {
        filtered[key] = { shared, [platform]: platformData };
      } else {
        filtered[key] = shared;
      }
    } else {
      filtered[key] = value;
    }
  }
  return filtered;
}

function collectWarningComponents(spec: Record<string, unknown>, oneOffs: Set<string>): string[] {
  const warned: string[] = [];
  const walk = (node: any) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node.component && typeof node.component === 'string') {
      if (!oneOffs.has(node.component) && node.component.includes('-') && node.component[0] === node.component[0].toLowerCase()) {
        warned.push(node.component);
      }
    }
    if (node.children) walk(node.children);
  };
  const uiTree = spec['ui-tree'] || spec['uiTree'];
  if (!uiTree || typeof uiTree !== 'object') return warned;

  if (!Array.isArray(uiTree) && 'shared' in (uiTree as any)) {
    const branched = uiTree as Record<string, unknown>;
    if (branched.shared) walk(branched.shared);
    for (const [key, val] of Object.entries(branched)) {
      if (key !== 'shared' && Array.isArray(val)) walk(val);
    }
  } else {
    walk(uiTree);
  }
  return warned;
}

describe('Platform-aware warnings', () => {
  beforeAll(() => {
    if (fs.existsSync(TEST_DIR)) fs.rmSync(TEST_DIR, { recursive: true });
    createFixtures();
  });
  afterAll(() => {
    if (fs.existsSync(TEST_DIR)) fs.rmSync(TEST_DIR, { recursive: true });
  });

  it('web agent sees shared missing widget but not iOS-only missing widget', () => {
    const spec = yaml.load(fs.readFileSync(
      path.join(TEST_DIR, 'experience-map/verticals/test-screen.yaml'), 'utf-8'
    )) as Record<string, unknown>;

    const filtered = filterPlatform(spec, 'web');
    const warned = collectWarningComponents(filtered, new Set(['ios-only-widget']));

    expect(warned).toContain('shared-missing-widget');
    expect(warned).not.toContain('ios-missing-widget');
    expect(warned).not.toContain('ios-only-widget');
  });

  it('iOS agent sees both shared and iOS missing widgets', () => {
    const spec = yaml.load(fs.readFileSync(
      path.join(TEST_DIR, 'experience-map/verticals/test-screen.yaml'), 'utf-8'
    )) as Record<string, unknown>;

    const filtered = filterPlatform(spec, 'ios');
    const warned = collectWarningComponents(filtered, new Set(['ios-only-widget']));

    expect(warned).toContain('shared-missing-widget');
    expect(warned).toContain('ios-missing-widget');
    expect(warned).not.toContain('ios-only-widget');
  });

  it('no platform filter sees all missing widgets', () => {
    const spec = yaml.load(fs.readFileSync(
      path.join(TEST_DIR, 'experience-map/verticals/test-screen.yaml'), 'utf-8'
    )) as Record<string, unknown>;

    // No filtering — walk the raw branched structure
    const warned = collectWarningComponents(spec, new Set(['ios-only-widget']));

    expect(warned).toContain('shared-missing-widget');
    expect(warned).toContain('ios-missing-widget');
  });
});
