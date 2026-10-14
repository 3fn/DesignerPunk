/**
 * Prop Value Checker — schema-driven value checks for `validate_assembly`.
 *
 * Fixes T3 of `.kiro/issues/2026-10-13-component-gaps-from-settings-ledger.md`: before this,
 * `validate_assembly` checked component names and composition only, so a Settings-screen tree
 * with Button-CTA `size: "md"` (the schema allows `'small' | 'medium' | 'large'`) passed and
 * would have shipped a broken screen (ledger D12).
 *
 * Every rule is driven by the component's schema `properties` (own + inherited along
 * `inheritsFrom`, minus `omits`). There are no per-component special cases.
 *
 * RULES
 *   - Unknown prop NAME (not in the resolved schema)   → WARNING. Schemas declare the cross-platform
 *     API, but a prop missing from a schema is more often schema lag than a broken screen, so it
 *     does not fail the tree.
 *   - Data-binding values (`"{Domain.field}"`)          → not checked (resolved at runtime).
 *   - `null` / `undefined` values                        → not checked (the prop is unset).
 *   - Type parsed as a union of members, split on `|`:
 *       `'literal'`  → the value must be that exact string
 *       `string` / `number` / `boolean` → `typeof` must match
 *       `null`       → accepts null (already skipped above)
 *     A wrong value of a known prop → ERROR, naming the prop, the value given and the allowed values.
 *     If ANY member is something else (`IconName`, `() => void`, `LeadingAction`, `number[]`, prose),
 *     the type is not machine-checkable and the prop is skipped. Free-form `string` props therefore
 *     accept any string.
 *   - `<Family>TokenName` types (e.g. `ColorTokenName`) → the value must be a token in the served
 *     token index whose name starts with the family (`color…`) — ERROR otherwise. When the token
 *     index is empty (not generated yet), the check is skipped with one WARNING per prop.
 *   - Schema `values:` lists (PropertyDefinition.values), when present, are treated as the literal set.
 *   - Missing REQUIRED prop (schema `required: true`) → WARNING. Callback props (type contains `=>`)
 *     are exempt: a screen-spec tree describes structure and data, not handlers. A warning, not an
 *     error, because a tree may be a partial spec that a platform agent completes.
 */

import { ComponentMetadata, PropertyDefinition, AssemblyIssue } from '../models';

/** A data binding such as "{UserPreferences.pushNotifications}" — resolved at runtime, never checked. */
const BINDING = /^\{[^{}]+\}$/;
const LITERAL = /^'([^']*)'$/;
const PRIMITIVES = new Set(['string', 'number', 'boolean', 'null', 'undefined']);
const TOKEN_TYPE = /^([A-Z][A-Za-z]*)TokenName$/;

/** Parsed, checkable form of a schema prop type; null when the type is not machine-checkable. */
interface CheckableType {
  literals: string[];
  primitives: Set<string>;
}

export function parseCheckableType(def: PropertyDefinition): CheckableType | null {
  if (def.values && def.values.length > 0) {
    return { literals: def.values.map(String), primitives: new Set() };
  }
  const raw = (def.type ?? '').trim();
  if (!raw) return null;
  const literals: string[] = [];
  const primitives = new Set<string>();
  for (const member of raw.split('|').map(m => m.trim())) {
    const lit = member.match(LITERAL);
    if (lit) literals.push(lit[1]);
    else if (PRIMITIVES.has(member)) primitives.add(member);
    else return null;
  }
  return { literals, primitives };
}

function describeAllowed(t: CheckableType): string {
  const parts = [...t.literals.map(l => `'${l}'`), ...[...t.primitives].filter(p => p !== 'null' && p !== 'undefined')];
  return parts.join(' | ');
}

function valueMatches(value: unknown, t: CheckableType): boolean {
  if (typeof value === 'string' && t.literals.includes(value)) return true;
  if (typeof value === 'string' && t.primitives.has('string')) return true;
  if (typeof value === 'number' && t.primitives.has('number')) return true;
  if (typeof value === 'boolean' && t.primitives.has('boolean')) return true;
  return false;
}

/** Token lookup the checker needs — satisfied by TokenIndexer. */
export interface TokenLookup {
  getDetails(name: string): unknown | null;
  getHealth(): { primitives: number; semantics: number; componentTokens: number };
}

/**
 * Resolve a component's props: own properties plus every ancestor's along `inheritsFrom`,
 * minus each level's `omits`. A child's own definition wins over its parent's.
 */
export function resolveProperties(
  meta: ComponentMetadata,
  getComponent: (name: string) => ComponentMetadata | null,
): Record<string, PropertyDefinition> {
  const chain: ComponentMetadata[] = [];
  const seen = new Set<string>();
  let current: ComponentMetadata | null = meta;
  while (current && !seen.has(current.name)) {
    chain.push(current);
    seen.add(current.name);
    const parent: string | null = current.contracts?.inheritsFrom ?? null;
    current = parent ? getComponent(parent) : null;
  }
  const resolved: Record<string, PropertyDefinition> = {};
  for (let i = chain.length - 1; i >= 0; i--) {
    const level = chain[i];
    for (const omitted of level.omits ?? []) delete resolved[omitted];
    Object.assign(resolved, level.properties ?? {});
  }
  return resolved;
}

export function checkPropValues(
  path: string,
  meta: ComponentMetadata,
  props: Record<string, unknown> | undefined,
  getComponent: (name: string) => ComponentMetadata | null,
  tokens: TokenLookup,
  errors: AssemblyIssue[],
  warnings: AssemblyIssue[],
): void {
  const defs = resolveProperties(meta, getComponent);
  const given = props ?? {};
  for (const [name, def] of Object.entries(defs)) {
    if (def.required === true && !(name in given) && !(def.type ?? '').includes('=>')) {
      warnings.push({ path, component: meta.name, message: `Missing required prop "${name}" (${def.type})` });
    }
  }
  if (!props) return;
  const health = tokens.getHealth();
  const tokenIndexLoaded = health.primitives + health.semantics + health.componentTokens > 0;

  for (const [name, value] of Object.entries(props)) {
    const def = defs[name];
    if (!def) {
      warnings.push({
        path,
        component: meta.name,
        message: `Unknown prop "${name}" — not declared in the ${meta.name} schema (known: ${Object.keys(defs).sort().join(', ')})`,
      });
      continue;
    }
    if (value === null || value === undefined) continue;
    if (typeof value === 'string' && BINDING.test(value)) continue;

    const tokenType = (def.type ?? '').trim().match(TOKEN_TYPE);
    if (tokenType) {
      const family = tokenType[1].toLowerCase();
      if (typeof value !== 'string') {
        errors.push({ path, component: meta.name, message: `Prop "${name}": expected a ${def.type} (token name string), got ${JSON.stringify(value)}` });
      } else if (!tokenIndexLoaded) {
        warnings.push({ path, component: meta.name, message: `Prop "${name}": token index not loaded — ${def.type} value "${value}" not checked` });
      } else if (!value.startsWith(family) || tokens.getDetails(value) === null) {
        errors.push({ path, component: meta.name, message: `Prop "${name}": "${value}" is not a ${family} token in the served token index (expected ${def.type})` });
      }
      continue;
    }

    const checkable = parseCheckableType(def);
    if (!checkable) continue;
    if (!valueMatches(value, checkable)) {
      errors.push({
        path,
        component: meta.name,
        message: `Prop "${name}": invalid value ${JSON.stringify(value)} — allowed: ${describeAllowed(checkable)}`,
      });
    }
  }
}
