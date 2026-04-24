/**
 * ScreenQuery — implements find_screens conjunctive filtering.
 *
 * @see .kiro/specs/097-product-mcp-intelligence-layer/design.md § "ScreenQuery Interface"
 */

import type { EnrichedMapEntry, ReverseIndexes, ScreenFilter } from '../models';

export class ScreenQuery {
  private experienceMap: EnrichedMapEntry[];
  private reverseIndexes: ReverseIndexes;

  constructor(experienceMap: EnrichedMapEntry[], reverseIndexes: ReverseIndexes) {
    this.experienceMap = experienceMap;
    this.reverseIndexes = reverseIndexes;
  }

  find(filter: ScreenFilter): EnrichedMapEntry[] {
    let results = this.experienceMap;

    if (filter.usesComponent) {
      const screens = this.screenNamesFromComponent(filter.usesComponent);
      results = results.filter(e => screens.has(e.name));
    }

    if (filter.usesToken) {
      const screens = this.screenNamesFromToken(filter.usesToken);
      results = results.filter(e => screens.has(e.name));
    }

    if (filter.usesDomainObject) {
      const screens = this.screenNamesFromDomainObject(filter.usesDomainObject);
      results = results.filter(e => screens.has(e.name));
    }

    if (filter.status) {
      const status = filter.status;
      const platform = filter.platform;
      results = results.filter(e => {
        if (platform) return e.status[platform] === status;
        return Object.values(e.status).includes(status);
      });
    } else if (filter.platform) {
      const platform = filter.platform;
      results = results.filter(e => platform in e.status);
    }

    if (filter.context) {
      const ctx = filter.context.toLowerCase();
      results = results.filter(e =>
        e.name.toLowerCase().includes(ctx) ||
        e.type.toLowerCase().includes(ctx) ||
        (e.tags || []).some(t => t.toLowerCase().includes(ctx))
      );
    }

    return results;
  }

  private screenNamesFromComponent(component: string): Set<string> {
    const refs = this.reverseIndexes.componentToScreens.get(component);
    return new Set(refs ? refs.map(r => r.screen) : []);
  }

  private screenNamesFromToken(token: string): Set<string> {
    const refs = this.reverseIndexes.tokenToScreens.get(token);
    return new Set(refs ? refs.map(r => r.screen) : []);
  }

  private screenNamesFromDomainObject(obj: string): Set<string> {
    const refs = this.reverseIndexes.domainObjectToScreens.get(obj);
    return new Set(refs ? refs.map(r => r.screen) : []);
  }
}
