/**
 * ExperienceMapQuery — enriched list_experience_map with filtering.
 *
 * Delegates to ScreenQuery since the filtering logic is identical.
 * The enriched data (referencedComponents, blockedReasons, etc.) is
 * already on EnrichedMapEntry from ProductIndexer.
 *
 * @see .kiro/specs/097-product-mcp-intelligence-layer/design.md § "ExperienceMapQuery"
 */

import type { EnrichedMapEntry, ReverseIndexes, ScreenFilter } from '../models';
import { ScreenQuery } from './ScreenQuery';

export class ExperienceMapQuery {
  private screenQuery: ScreenQuery;

  constructor(experienceMap: EnrichedMapEntry[], reverseIndexes: ReverseIndexes) {
    this.screenQuery = new ScreenQuery(experienceMap, reverseIndexes);
  }

  find(filter: ScreenFilter): EnrichedMapEntry[] {
    return this.screenQuery.find(filter);
  }
}
