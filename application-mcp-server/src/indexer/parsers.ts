/**
 * YAML Parsers for Component Source Files
 *
 * Parses schema.yaml, contracts.yaml, and component-meta.yaml into typed structures.
 * All parsers handle malformed/missing files gracefully (return null + warning).
 *
 * @see .kiro/specs/064-component-metadata-schema/design.md — Requirements 1.1, 1.3
 */

import * as fs from 'fs';
import * as yaml from 'js-yaml';
import {
  PropertyDefinition,
  Contract,
  ExcludedContract,
  CompositionDefinition,
  CompositionRelationship,
  CompositionRule,
} from '../models';

// ---------------------------------------------------------------------------
// Parsed file types (raw YAML structure before assembly)
// ---------------------------------------------------------------------------

export interface ParsedSchemaReadiness {
  web?: { reviewed?: boolean; status?: string; reason?: string };
  ios?: { reviewed?: boolean; status?: string; reason?: string };
  android?: { reviewed?: boolean; status?: string; reason?: string };
}

export interface ParsedSchema {
  name: string;
  type: string;
  family: string;
  version: string;
  readiness: ParsedSchemaReadiness | string;
  description: string;
  platforms: string[];
  properties: Record<string, PropertyDefinition>;
  tokens: string[];
  omits: string[];
  composition: CompositionDefinition | null;
  /**
   * Declared internal-only (`internal_only: true` in schema.yaml). An internal-only component
   * is rendered by other components and must never be used directly by product code.
   * Absent → false. Defect record 2026-10-07 item 6.
   */
  internalOnly: boolean;
}

export interface ParsedContracts {
  version: string;
  component: string;
  family: string;
  inherits: string | null;
  contracts: Record<string, Omit<Contract, 'source'>>;
  excludes: Record<string, ExcludedContract>;
}

export interface ParsedMeta {
  purpose: string;
  usage: {
    whenToUse: string[];
    whenNotToUse: string[];
  };
  contexts: string[];
  alternatives: Array<{ component: string; reason: string }>;
}

export interface ParseResult<T> {
  data: T | null;
  warning: string | null;
}

// ---------------------------------------------------------------------------
// Schema parser
// ---------------------------------------------------------------------------

export function parseSchemaYaml(filePath: string): ParseResult<ParsedSchema> {
  const raw = loadYaml(filePath);
  if (!raw) return { data: null, warning: raw === undefined ? `File not found: ${filePath}` : `YAML parse error in ${filePath}` };

  const doc = raw as Record<string, unknown>;

  // Extract tokens — the same reading as the token index consumer map (see extractTokens)
  const tokens = extractTokens(doc.tokens);

  // Extract composition
  const composition = extractComposition(doc);

  // Extract properties
  const rawProps = (doc.properties ?? {}) as Record<string, Record<string, unknown>>;
  const properties: Record<string, PropertyDefinition> = {};
  for (const [key, val] of Object.entries(rawProps)) {
    properties[key] = {
      type: String(val.type ?? 'unknown'),
      description: String(val.description ?? ''),
      default: val.default,
      required: val.required === true,
      values: Array.isArray(val.values) ? val.values.map(String) : undefined,
    };
  }

  // Extract platforms — explicit list, or derived from platform_notes/platform_accessibility keys
  let platforms: string[];
  if (Array.isArray(doc.platforms)) {
    platforms = doc.platforms.map(String);
  } else {
    const platformNotes = doc.platform_notes as Record<string, unknown> | undefined;
    const platformAccess = (doc.accessibility as Record<string, unknown> | undefined)?.platform_accessibility as Record<string, unknown> | undefined;
    const keys = new Set<string>();
    if (platformNotes) Object.keys(platformNotes).forEach(k => keys.add(k));
    if (platformAccess) Object.keys(platformAccess).forEach(k => keys.add(k));
    platforms = Array.from(keys);
  }

  return {
    data: {
      name: String(doc.name ?? ''),
      type: String(doc.type ?? ''),
      family: String(doc.family ?? ''),
      version: String(doc.version ?? ''),
      readiness: doc.readiness != null && typeof doc.readiness === 'object' ? doc.readiness as ParsedSchemaReadiness : String(doc.readiness ?? ''),
      description: String(doc.description ?? '').trim(),
      platforms,
      properties,
      tokens,
      omits: toStringArray(doc.omits),
      composition,
      internalOnly: doc.internal_only === true,
    },
    warning: null,
  };
}

// ---------------------------------------------------------------------------
// Contracts parser
// ---------------------------------------------------------------------------

export function parseContractsYaml(filePath: string): ParseResult<ParsedContracts> {
  const raw = loadYaml(filePath);
  if (!raw) return { data: null, warning: raw === undefined ? `File not found: ${filePath}` : `YAML parse error in ${filePath}` };

  const doc = raw as Record<string, unknown>;
  const rawContracts = (doc.contracts ?? {}) as Record<string, Record<string, unknown>>;
  const rawExcludes = (doc.excludes ?? {}) as Record<string, Record<string, unknown>>;

  const contracts: Record<string, Omit<Contract, 'source'>> = {};
  for (const [key, val] of Object.entries(rawContracts)) {
    contracts[key] = {
      category: String(val.category ?? ''),
      description: String(val.description ?? ''),
      behavior: String(val.behavior ?? '').trim(),
      wcag: val.wcag ? String(val.wcag) : null,
      platforms: Array.isArray(val.platforms) ? val.platforms.map(String) : [],
      validation: Array.isArray(val.validation) ? val.validation.map(String) : [],
      required: val.required !== false,
    };
  }

  const excludes: Record<string, ExcludedContract> = {};
  for (const [key, val] of Object.entries(rawExcludes)) {
    excludes[key] = {
      reason: String(val.reason ?? ''),
      category: String(val.category ?? ''),
      reference: String(val.reference ?? ''),
    };
  }

  return {
    data: {
      version: String(doc.version ?? ''),
      component: String(doc.component ?? ''),
      family: String(doc.family ?? ''),
      inherits: doc.inherits ? String(doc.inherits) : null,
      contracts,
      excludes,
    },
    warning: null,
  };
}

// ---------------------------------------------------------------------------
// Component-meta parser
// ---------------------------------------------------------------------------

export function parseComponentMetaYaml(filePath: string): ParseResult<ParsedMeta> {
  const raw = loadYaml(filePath);
  if (!raw) return { data: null, warning: raw === undefined ? `File not found: ${filePath}` : `YAML parse error in ${filePath}` };

  const doc = raw as Record<string, unknown>;
  const usage = (doc.usage ?? {}) as Record<string, unknown>;

  const alternatives = Array.isArray(doc.alternatives)
    ? doc.alternatives.map((a: Record<string, unknown>) => ({
        component: String(a.component ?? ''),
        reason: String(a.reason ?? ''),
      }))
    : [];

  return {
    data: {
      purpose: String(doc.purpose ?? ''),
      usage: {
        whenToUse: toStringArray(usage.when_to_use),
        whenNotToUse: toStringArray(usage.when_not_to_use),
      },
      contexts: toStringArray(doc.contexts),
      alternatives,
    },
    warning: null,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Load and parse a YAML file. Returns undefined if not found, null if parse error. */
function loadYaml(filePath: string): unknown | null | undefined {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return yaml.load(content);
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'ENOENT') {
      return undefined; // file not found
    }
    return null; // parse error or other
  }
}

/**
 * Extract a flat token list from a schema's `tokens:` block.
 *
 * This reads the block exactly as `readSchemaTokenRefs` (`src/generators/generateTokenIndex.ts`)
 * does: that function builds the token index's `consumers` and feeds the schema token-name
 * guard. If the two readers disagree, `get_component_full` and `get_token_consumers` disagree
 * about what a component declares. The rule:
 * - `tokens:` is a map of group to refs. The canonical (Stemma) form is an array per group;
 *   a scalar group is tolerated.
 * - Each ref is a string, or an object's `reference`/`name`.
 * - A null ref declares nothing; any other value is kept, JSON-stringified, so it stays visible.
 * Before 2026-10-23 this dropped scalar groups and turned objects into "[object Object]".
 * No core schema used either form, so no served list changed.
 *
 * Parity guard (root lane, because it loads both packages' source):
 * `src/components/__tests__/schemaTokenReaders.parity.test.ts`.
 */
function extractTokens(raw: unknown): string[] {
  if (!raw || typeof raw !== 'object') return [];
  const tokens: string[] = [];
  for (const groupValue of Object.values(raw as Record<string, unknown>)) {
    const values = Array.isArray(groupValue) ? groupValue : [groupValue];
    for (const value of values) {
      if (value === null || value === undefined) continue;
      const named = typeof value === 'string'
        ? value
        : (value as { reference?: unknown; name?: unknown }).reference || (value as { reference?: unknown; name?: unknown }).name;
      tokens.push(typeof named === 'string' && named ? named : JSON.stringify(value));
    }
  }
  return tokens;
}

/** Extract composition definition from schema doc. */
function extractComposition(doc: Record<string, unknown>): CompositionDefinition | null {
  const rawComposition = doc.composition as Record<string, unknown> | undefined;

  if (!rawComposition) return null;

  const rawInternal = rawComposition.internal;
  const internal: CompositionRelationship[] = Array.isArray(rawInternal)
    ? rawInternal.map((c: Record<string, unknown>) => ({
        component: String(c.component ?? ''),
        relationship: String(c.relationship ?? ''),
      }))
    : [];

  const children = rawComposition.children as Record<string, unknown> | undefined;
  const nesting = rawComposition.nesting as Record<string, unknown> | undefined;
  const rawRules = rawComposition.rules as Array<Record<string, unknown>> | undefined;

  const rules: CompositionRule[] | undefined = Array.isArray(rawRules)
    ? rawRules.map((r) => ({
        when: r.when as CompositionRule['when'],
        then: r.then as CompositionRule['then'],
      }))
    : undefined;

  return {
    internal,
    children: children ? {
      requires: toStringArray(children.requires),
      allowed: toStringArray(children.allowed),
      prohibited: toStringArray(children.prohibited),
      allowedCategories: toStringArray(children.allowed_categories),
      prohibitedCategories: toStringArray(children.prohibited_categories),
      minCount: (children.minCount ?? children.min_count) as number | undefined,
      maxCount: (children.maxCount ?? children.max_count) as number | undefined,
    } : undefined,
    nesting: nesting ? { self: nesting.self === true } : undefined,
    rules,
  };
}

function toStringArray(val: unknown): string[] {
  return Array.isArray(val) ? val.map(String) : [];
}
