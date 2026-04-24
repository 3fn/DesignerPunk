/**
 * @jest-environment node
 * @category evergreen
 * @purpose Unit tests for ScreenQuery — conjunctive filtering with 6 params
 */

import { ScreenQuery } from '../query/ScreenQuery';
import type { EnrichedMapEntry, ReverseIndexes } from '../models';

// Mock data
const entries: EnrichedMapEntry[] = [
  {
    name: 'legislation-list', type: 'vertical', tags: ['civic', 'legislation'],
    status: { web: 'in-progress', ios: 'not-started', android: 'blocked' },
    blockedReasons: { android: 'Waiting on sync tool' },
    referencedComponents: ['Nav-Header-App', 'Container-Base', 'Chip-Filter'],
    referencedDomainObjects: ['bill'],
  },
  {
    name: 'onboarding', type: 'flow',
    status: { web: 'not-started', ios: 'not-started', android: 'not-started' },
    referencedComponents: ['Progress-Stepper-Base', 'Button-CTA'],
    referencedDomainObjects: [],
  },
  {
    name: 'dashboard', type: 'feature-page',
    status: { web: 'not-started' },
    referencedComponents: ['Container-Base'],
    referencedDomainObjects: [],
  },
];

const indexes: ReverseIndexes = {
  componentToScreens: new Map([
    ['Nav-Header-App', [{ screen: 'legislation-list', path: 'ui-tree.shared[0].component' }]],
    ['Container-Base', [
      { screen: 'legislation-list', path: 'ui-tree.shared[1].component' },
      { screen: 'dashboard', path: 'ui-tree.shared[0].component' },
    ]],
    ['Button-CTA', [{ screen: 'onboarding', path: 'ui-tree.shared[1].component' }]],
    ['Chip-Filter', [{ screen: 'legislation-list', path: 'ui-tree.shared[1].children[0].component' }]],
  ]),
  tokenToScreens: new Map([
    ['color.action.primary', [
      { screen: 'legislation-list', path: 'ui-tree.shared[1].tokens' },
      { screen: 'onboarding', path: 'ui-tree.shared[1].tokens' },
    ]],
    ['color.structure.surface', [{ screen: 'legislation-list', path: 'ui-tree.shared[0].tokens' }]],
  ]),
  domainObjectToScreens: new Map([
    ['bill', [{ screen: 'legislation-list' }]],
  ]),
};

describe('ScreenQuery', () => {
  let query: ScreenQuery;

  beforeEach(() => {
    query = new ScreenQuery(entries, indexes);
  });

  it('returns all screens with no filters', () => {
    expect(query.find({})).toHaveLength(3);
  });

  it('returns empty array when no matches', () => {
    expect(query.find({ usesComponent: 'Nonexistent' })).toEqual([]);
  });

  describe('usesComponent', () => {
    it('filters by component', () => {
      const results = query.find({ usesComponent: 'Nav-Header-App' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('legislation-list');
    });

    it('returns multiple screens for shared component', () => {
      const results = query.find({ usesComponent: 'Container-Base' });
      expect(results).toHaveLength(2);
    });
  });

  describe('usesToken', () => {
    it('filters by token', () => {
      const results = query.find({ usesToken: 'color.structure.surface' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('legislation-list');
    });

    it('returns multiple screens for shared token', () => {
      const results = query.find({ usesToken: 'color.action.primary' });
      expect(results).toHaveLength(2);
    });
  });

  describe('usesDomainObject', () => {
    it('filters by domain object', () => {
      const results = query.find({ usesDomainObject: 'bill' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('legislation-list');
    });
  });

  describe('status', () => {
    it('filters by status across any platform', () => {
      const results = query.find({ status: 'blocked' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('legislation-list');
    });

    it('filters by status on specific platform', () => {
      const results = query.find({ status: 'not-started', platform: 'web' });
      expect(results).toHaveLength(2);
      expect(results.map(r => r.name).sort()).toEqual(['dashboard', 'onboarding']);
    });

    it('returns empty when status+platform combo has no match', () => {
      expect(query.find({ status: 'blocked', platform: 'web' })).toEqual([]);
    });
  });

  describe('platform only', () => {
    it('filters by platform existence', () => {
      const results = query.find({ platform: 'ios' });
      expect(results).toHaveLength(2);
      expect(results.map(r => r.name).sort()).toEqual(['legislation-list', 'onboarding']);
    });
  });

  describe('context', () => {
    it('matches against name', () => {
      const results = query.find({ context: 'legislation' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('legislation-list');
    });

    it('matches against type', () => {
      const results = query.find({ context: 'flow' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('onboarding');
    });

    it('matches against tags', () => {
      const results = query.find({ context: 'civic' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('legislation-list');
    });

    it('is case-insensitive', () => {
      expect(query.find({ context: 'CIVIC' })).toHaveLength(1);
      expect(query.find({ context: 'Flow' })).toHaveLength(1);
    });
  });

  describe('conjunctive (AND) filtering', () => {
    it('combines usesComponent + status', () => {
      const results = query.find({ usesComponent: 'Container-Base', status: 'not-started', platform: 'web' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('dashboard');
    });

    it('combines usesToken + context', () => {
      const results = query.find({ usesToken: 'color.action.primary', context: 'legislation' });
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('legislation-list');
    });

    it('returns empty when conjunctive filters exclude all', () => {
      expect(query.find({ usesComponent: 'Button-CTA', usesDomainObject: 'bill' })).toEqual([]);
    });
  });
});
