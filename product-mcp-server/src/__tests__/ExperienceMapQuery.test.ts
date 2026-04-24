/**
 * @jest-environment node
 * @category evergreen
 * @purpose Unit tests for ExperienceMapQuery — enriched list_experience_map with filtering
 */

import { ExperienceMapQuery } from '../query/ExperienceMapQuery';
import type { EnrichedMapEntry, ReverseIndexes } from '../models';

const entries: EnrichedMapEntry[] = [
  {
    name: 'legislation-list', type: 'vertical', tags: ['civic'],
    status: { web: 'in-progress', android: 'blocked' },
    blockedReasons: { android: 'Waiting on sync tool' },
    referencedComponents: ['Nav-Header-App', 'Container-Base'],
    referencedDomainObjects: ['bill'],
  },
  {
    name: 'onboarding', type: 'flow',
    status: { web: 'not-started' },
    referencedComponents: ['Button-CTA'],
    referencedDomainObjects: [],
  },
];

const indexes: ReverseIndexes = {
  componentToScreens: new Map([
    ['Nav-Header-App', [{ screen: 'legislation-list', path: 'p' }]],
    ['Button-CTA', [{ screen: 'onboarding', path: 'p' }]],
  ]),
  tokenToScreens: new Map(),
  domainObjectToScreens: new Map([
    ['bill', [{ screen: 'legislation-list' }]],
  ]),
};

describe('ExperienceMapQuery', () => {
  let query: ExperienceMapQuery;

  beforeEach(() => {
    query = new ExperienceMapQuery(entries, indexes);
  });

  it('returns all entries with no filters', () => {
    expect(query.find({})).toHaveLength(2);
  });

  it('filters by component', () => {
    const results = query.find({ usesComponent: 'Nav-Header-App' });
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('legislation-list');
  });

  it('filters by domain object', () => {
    const results = query.find({ usesDomainObject: 'bill' });
    expect(results).toHaveLength(1);
    expect(results[0].referencedDomainObjects).toContain('bill');
  });

  it('filters by status', () => {
    const results = query.find({ status: 'blocked' });
    expect(results).toHaveLength(1);
    expect(results[0].blockedReasons).toEqual({ android: 'Waiting on sync tool' });
  });

  it('preserves enriched fields in results', () => {
    const results = query.find({ usesComponent: 'Nav-Header-App' });
    expect(results[0].referencedComponents).toContain('Nav-Header-App');
    expect(results[0].blockedReasons).toBeDefined();
    expect(results[0].tags).toContain('civic');
  });

  it('returns empty array when no matches', () => {
    expect(query.find({ usesComponent: 'Nonexistent' })).toEqual([]);
  });
});
