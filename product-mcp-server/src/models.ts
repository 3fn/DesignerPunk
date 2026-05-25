/**
 * Shared TypeScript interfaces for the Product MCP Intelligence Layer.
 *
 * @see .kiro/specs/097-product-mcp-intelligence-layer/design.md § "Data Models"
 */

/** Reference to a screen from a UI tree traversal (component or token index). */
export interface ScreenRef {
  screen: string;
  path: string; // UI tree path, e.g. "ui-tree.children[0].children[2]"
}

/** Reference to a screen from domain object text search (no tree path). */
export interface DomainScreenRef {
  screen: string;
}

/** Reverse indexes built during indexing. */
export interface ReverseIndexes {
  componentToScreens: Map<string, ScreenRef[]>;
  tokenToScreens: Map<string, ScreenRef[]>;
  domainObjectToScreens: Map<string, DomainScreenRef[]>;
}

/** Component gap found during UI tree validation. */
export interface ComponentGap {
  component: string;
  issue: 'not-found';
  path: string; // UI tree path, e.g. "ui-tree.children[0].children[2]"
}

/** Parsed principle with YAML frontmatter. */
export interface Principle {
  name: string;
  keywords: string[];
  content: string;
}

/** Enriched experience map entry with reverse-index data. */
export interface EnrichedMapEntry {
  name: string;
  type: string;
  tags?: string[];
  status: Record<string, string>;
  blockedReasons?: Record<string, string>;
  referencedComponents: string[];
  referencedDomainObjects: string[];
}

/** Filter params for find_screens and list_experience_map. */
export interface ScreenFilter {
  context?: string;
  status?: string;
  platform?: string;
  usesComponent?: string;
  usesDomainObject?: string;
  usesToken?: string;
}

/** Product MCP health status returned by get_product_health. */
export interface HealthStatus {
  status: 'healthy' | 'empty';
  indexed: boolean;
  lastIndexTime: string;
  counts: {
    screens: number;
    domainObjects: number;
    templates: number;
    oneOffComponents: number;
    principles: number;
  };
  reverseIndexSizes: {
    components: number;
    tokens: number;
    domainObjects: number;
  };
  gapCounts: {
    totalGaps: number;
    screensWithGaps: number;
  };
  catalogSize: number;
  warnings: string[];
}

/** Brand context for product-level identity (Spec 107). */
export interface BrandContext {
  personality?: string[];
  voice?: string;
  tone?: string;
  antiReferences?: string[];
  users?: string;
  register?: 'brand' | 'product';
  accessibilityRequirements?: string;
}

/** Product token entry as returned by get_product_tokens (Spec 108). */
export interface ProductTokenEntry {
  name: string;
  value: number | string | null;
  unitType: string | null;
  ref: string | null;
  resolvedValue: number | string | null;
  resolvedUnitType: string | null;
  resolutionDepth: 'full' | 'partial' | null;
  description: string;
  rationale: string | null;
  usage: string | null;
  platforms: string[];
  promotionCandidate: boolean;
}

/** Product token category grouping. */
export interface ProductTokenCategory {
  name: string;
  description: string;
  tokens: ProductTokenEntry[];
}

/** Health data for product tokens section of get_product_health. */
export interface ProductTokenHealth {
  tokenCount: number;
  categoryCount: number;
  errorCount: number;
  warningCount: number;
  errors: string[];
  warnings: string[];
}
