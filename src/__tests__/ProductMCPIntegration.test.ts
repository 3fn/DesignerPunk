/**
 * @jest-environment node
 * @category evergreen
 * @purpose Integration test for Product MCP — verifies test data structure and indexer output
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { execSync } from 'child_process';

const TEST_PRODUCT_DIR = path.join(__dirname, 'fixtures', 'test-product');
const PROJECT_ROOT = process.cwd();

function createTestProductData(): void {
  const dirs = [
    '', 'principles',
    'experience-map/verticals/legislation',
    'experience-map/flows/onboarding',
    'experience-map/pages/dashboard',
    'templates', 'domain-objects',
    'components/legislation-card',
  ];
  for (const dir of dirs) fs.mkdirSync(path.join(TEST_PRODUCT_DIR, dir), { recursive: true });

  fs.writeFileSync(path.join(TEST_PRODUCT_DIR, 'overview.yaml'), yaml.dump({
    name: 'WrKingClass', abbreviation: 'WKC', platforms: ['web', 'ios', 'android'],
    theme: 'marketing', description: 'Civic engagement platform',
  }));

  fs.writeFileSync(path.join(TEST_PRODUCT_DIR, 'principles/design-direction.md'),
    '---\nname: design-direction\nkeywords: [civic, dark-theme, engagement]\n---\n# Design Direction\nDark theme, civic engagement focus.\n');

  fs.writeFileSync(path.join(TEST_PRODUCT_DIR, 'experience-map/verticals/legislation/legislation-list.yaml'), yaml.dump({
    name: 'legislation-list', type: 'vertical',
    tags: ['civic', 'legislation'],
    status: { spec: 'complete', web: 'in-progress', ios: 'not-started', android: 'blocked' },
    blockedReasons: { android: 'Waiting on sync tool' },
    'ux-direction': 'Scrollable list of legislation with filter bar',
    'ui-tree': {
      shared: [
        { component: 'Nav-Header-App', tokens: { background: 'color.structure.surface' } },
        { component: 'Container-Base', tokens: { padding: 'space.inset.normal' }, children: [
          { component: 'Chip-Filter', tokens: { background: 'color.action.primary' } },
          { component: 'legislation-card', repeat: 'for-each bill in data.bills', tokens: { background: 'color.structure.surface', padding: 'space.inset.normal' } },
          { component: 'nonexistent-widget', tokens: { color: 'color.action.primary' } },
        ]},
      ],
      ios: { navigation: 'NavigationStack push' },
      web: { navigation: 'client-side route' },
    },
    'state-model': { shared: ['idle', 'loading', 'populated', 'empty', 'error'], ios: ['pull-to-refresh'] },
    'data-sources': { shared: [{ 'legislation-api': '/api/v1/bills' }] },
    accessibility: { shared: ['heading: Legislation (h1)'], ios: ['VoiceOver custom rotor'] },
  }));

  fs.writeFileSync(path.join(TEST_PRODUCT_DIR, 'experience-map/flows/onboarding/onboarding.yaml'), yaml.dump({
    name: 'onboarding', type: 'flow',
    status: { spec: 'draft', web: 'not-started', ios: 'not-started', android: 'not-started' },
    'ux-direction': 'Three-step onboarding flow',
    'ui-tree': { shared: [{ component: 'Progress-Stepper-Base' }] },
  }));
  fs.writeFileSync(path.join(TEST_PRODUCT_DIR, 'experience-map/flows/onboarding/onboarding.state.yaml'), yaml.dump({
    'state-model': { shared: ['step-1', 'step-2', 'step-3', 'complete'] },
  }));

  fs.writeFileSync(path.join(TEST_PRODUCT_DIR, 'experience-map/pages/dashboard/dashboard.yaml'), yaml.dump({
    name: 'dashboard', type: 'feature-page',
    template: 'card-grid',
    status: { spec: 'complete', web: 'not-started' },
    'ux-direction': 'Hub page launching into verticals and flows',
    'ui-tree': { shared: [{ component: 'Container-Base', tokens: { background: 'color.structure.surface', padding: 'space.inset.normal' } }] },
  }));

  fs.writeFileSync(path.join(TEST_PRODUCT_DIR, 'domain-objects/bill.yaml'), yaml.dump({
    name: 'bill', description: 'A piece of legislation',
    properties: { title: { type: 'string', description: 'Bill title' }, status: { type: 'string', description: 'active, passed, or failed' } },
  }));

  fs.writeFileSync(path.join(TEST_PRODUCT_DIR, 'domain-objects/representative.yaml'), yaml.dump({
    name: 'representative', description: 'An elected official',
    properties: { name: { type: 'string', description: 'Full name' }, district: { type: 'string', description: 'District identifier' } },
  }));

  fs.writeFileSync(path.join(TEST_PRODUCT_DIR, 'templates/card-grid.yaml'), yaml.dump({
    name: 'card-grid', description: 'Responsive grid of cards',
    columns: { mobile: 1, tablet: 2, desktop: 3 },
  }));

  fs.writeFileSync(path.join(TEST_PRODUCT_DIR, 'components/legislation-card/legislation-card.schema.yaml'), yaml.dump({
    name: 'legislation-card', purpose: 'Display a bill summary',
    'composed-from': [
      { component: 'Container-Card-Base', role: 'card-wrapper' },
      { component: 'Badge-Label-Base', role: 'status-indicator' },
    ],
    props: { title: { type: 'string', required: true }, status: { type: 'string', required: true } },
    tokens: ['color.action.primary', 'space.inset.200'],
  }));
  fs.writeFileSync(path.join(TEST_PRODUCT_DIR, 'components/legislation-card/legislation-card.contracts.yaml'), yaml.dump({
    accessibility_card_semantics: { category: 'accessibility', description: 'Card announced as article with title and status' },
  }));
}

function runServer(productDir: string): string {
  try {
    return execSync(
      `echo '' | npx ts-node product-mcp-server/src/index.ts 2>&1`,
      { cwd: PROJECT_ROOT, timeout: 15000, encoding: 'utf-8', env: { ...process.env, PRODUCT_DIR: productDir } }
    );
  } catch (e: any) {
    return (e.stderr || '') + (e.stdout || '');
  }
}

describe('Product MCP Integration', () => {
  beforeAll(() => {
    if (fs.existsSync(TEST_PRODUCT_DIR)) fs.rmSync(TEST_PRODUCT_DIR, { recursive: true });
    createTestProductData();
  });
  afterAll(() => {
    if (fs.existsSync(TEST_PRODUCT_DIR)) fs.rmSync(TEST_PRODUCT_DIR, { recursive: true });
  });

  describe('Indexer counts', () => {
    let output: string;
    beforeAll(() => { output = runServer(TEST_PRODUCT_DIR); });

    it('indexes 3 screens', () => { expect(output).toContain('3 screens'); });
    it('indexes 2 domain objects', () => { expect(output).toContain('2 domain objects'); });
    it('indexes 1 template', () => { expect(output).toContain('1 templates'); });
    it('indexes 1 one-off component', () => { expect(output).toContain('1 one-off components'); });
  });

  describe('Screen spec structure', () => {
    it('legislation-list has platform branching', () => {
      const spec = yaml.load(fs.readFileSync(
        path.join(TEST_PRODUCT_DIR, 'experience-map/verticals/legislation/legislation-list.yaml'), 'utf-8'
      )) as any;
      expect(spec['ui-tree'].shared).toBeDefined();
      expect(spec['ui-tree'].ios).toBeDefined();
      expect(spec['ui-tree'].web).toBeDefined();
    });

    it('legislation-list has blocked status with reason', () => {
      const spec = yaml.load(fs.readFileSync(
        path.join(TEST_PRODUCT_DIR, 'experience-map/verticals/legislation/legislation-list.yaml'), 'utf-8'
      )) as any;
      expect(spec.status.android).toBe('blocked');
      expect(spec.blockedReasons.android).toBe('Waiting on sync tool');
    });

    it('legislation-list has spec status', () => {
      const spec = yaml.load(fs.readFileSync(
        path.join(TEST_PRODUCT_DIR, 'experience-map/verticals/legislation/legislation-list.yaml'), 'utf-8'
      )) as any;
      expect(spec.status.spec).toBe('complete');
    });

    it('onboarding is a multi-file spec', () => {
      const primary = yaml.load(fs.readFileSync(
        path.join(TEST_PRODUCT_DIR, 'experience-map/flows/onboarding/onboarding.yaml'), 'utf-8'
      )) as any;
      const facet = yaml.load(fs.readFileSync(
        path.join(TEST_PRODUCT_DIR, 'experience-map/flows/onboarding/onboarding.state.yaml'), 'utf-8'
      )) as any;
      expect(primary.name).toBe('onboarding');
      expect(facet['state-model'].shared).toContain('step-1');
    });
  });

  describe('One-off component metadata', () => {
    it('has schema with composed-from and props', () => {
      const schema = yaml.load(fs.readFileSync(
        path.join(TEST_PRODUCT_DIR, 'components/legislation-card/legislation-card.schema.yaml'), 'utf-8'
      )) as any;
      expect(schema.name).toBe('legislation-card');
      expect(schema['composed-from']).toHaveLength(2);
      expect(schema['composed-from'][0].role).toBe('card-wrapper');
      expect(schema.props.title.required).toBe(true);
    });

    it('has accessibility contracts', () => {
      const contracts = yaml.load(fs.readFileSync(
        path.join(TEST_PRODUCT_DIR, 'components/legislation-card/legislation-card.contracts.yaml'), 'utf-8'
      )) as any;
      expect(contracts.accessibility_card_semantics.category).toBe('accessibility');
    });
  });

  describe('Empty and missing product directories', () => {
    it('starts with 0 counts for empty directory', () => {
      const emptyDir = path.join(TEST_PRODUCT_DIR, '..', 'empty-product');
      fs.mkdirSync(emptyDir, { recursive: true });
      const output = runServer(emptyDir);
      expect(output).toContain('0 screens');
      fs.rmSync(emptyDir, { recursive: true });
    });

    it('starts with warning for nonexistent directory', () => {
      const output = runServer('/tmp/nonexistent-product-test-dir');
      expect(output).toContain('Product directory not found');
    });
  });
});
