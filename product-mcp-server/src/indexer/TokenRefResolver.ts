/**
 * TokenRefResolver — resolves product token `ref` values against token-index YAML files.
 *
 * Resolution strategy:
 * 1. Check primitives — direct value + family → unitType. Depth: full.
 * 2. Check semantics — extract primary ref from primitiveReferences, chase to primitive. Depth: full (single-key) or partial (multi-key).
 * 3. Check components — extract from primitiveReferences.value, chase or return literal. Depth: full or partial.
 * 4. Not found → null.
 *
 * @see .kiro/specs/108-product-tokens-source-format/design.md § "TokenRefResolver"
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface ResolvedRef {
  value: number | string;
  unitType: string;
  depth: 'full' | 'partial';
}

const FAMILY_UNIT_MAP: Record<string, string> = {
  spacing: 'logical',
  sizing: 'logical',
  tapArea: 'logical',
  radius: 'logical',
  borderWidth: 'logical',
  fontSize: 'logical',
  letterSpacing: 'logical',
  blur: 'logical',
  breakpoint: 'logical',
  color: 'color',
  opacity: 'percent',
  duration: 'duration',
  easing: 'easing',
  scale: 'ratio',
  lineHeight: 'ratio',
  density: 'ratio',
  fontWeight: 'count',
  fontFamily: 'string',
  shadow: 'composite',
  glow: 'composite',
  blend: 'composite',
};

/** Semantic category → unitType fallback (when primitiveReferences can't be chased) */
const CATEGORY_UNIT_MAP: Record<string, string> = {
  color: 'color',
  typography: 'composite',
  shadow: 'composite',
  spacing: 'logical',
  layout: 'logical',
  border: 'logical',
  interaction: 'logical',
  layering: 'count',
  accessibility: 'logical',
  icon: 'logical',
};

interface PrimitiveEntry { value: unknown; family: string }
interface SemanticEntry { category: string; primitiveReferences: Record<string, string> | null }
interface ComponentEntry { component: string; primitiveReferences: Record<string, string> | null }

export class TokenRefResolver {
  private primitives = new Map<string, PrimitiveEntry>();
  private semantics = new Map<string, SemanticEntry>();
  private components = new Map<string, ComponentEntry>();
  private tokenIndexDir: string | undefined;

  constructor(tokenIndexDir: string | undefined) {
    this.tokenIndexDir = tokenIndexDir;
  }

  load(): void {
    this.primitives.clear();
    this.semantics.clear();
    this.components.clear();

    if (!this.tokenIndexDir || !fs.existsSync(this.tokenIndexDir)) return;

    this.loadFile('primitives.yaml', (key, entry) => {
      this.primitives.set(key, { value: entry.value, family: entry.family });
    });
    this.loadFile('semantics.yaml', (key, entry) => {
      this.semantics.set(key, { category: entry.category, primitiveReferences: entry.primitiveReferences ?? null });
    });
    this.loadFile('components.yaml', (key, entry) => {
      this.components.set(key, { component: entry.component, primitiveReferences: entry.primitiveReferences ?? null });
    });
  }

  resolve(name: string): ResolvedRef | null {
    // 1. Primitive — direct value
    const prim = this.primitives.get(name);
    if (prim) {
      return { value: prim.value as number | string, unitType: this.inferUnitType(prim.family), depth: 'full' };
    }

    // 2. Semantic — chase through primitiveReferences
    const sem = this.semantics.get(name);
    if (sem) {
      if (!sem.primitiveReferences) {
        return { value: name, unitType: CATEGORY_UNIT_MAP[sem.category] || 'unknown', depth: 'partial' };
      }
      const primaryRef = this.extractPrimaryRef(sem.primitiveReferences);
      if (primaryRef) {
        const chased = this.primitives.get(primaryRef);
        if (chased) {
          return { value: chased.value as number | string, unitType: this.inferUnitType(chased.family), depth: 'full' };
        }
        // primaryRef is a literal or unresolvable
        return { value: primaryRef, unitType: CATEGORY_UNIT_MAP[sem.category] || 'unknown', depth: 'partial' };
      }
      // Multi-key — can't extract single primary
      return { value: name, unitType: CATEGORY_UNIT_MAP[sem.category] || 'unknown', depth: 'partial' };
    }

    // 3. Component — chase through primitiveReferences.value
    const comp = this.components.get(name);
    if (comp) {
      if (!comp.primitiveReferences) {
        return { value: name, unitType: 'unknown', depth: 'partial' };
      }
      const refValue = comp.primitiveReferences.value;
      if (refValue == null) {
        return { value: name, unitType: 'unknown', depth: 'partial' };
      }
      // Chase: is refValue a primitive name?
      const chased = this.primitives.get(refValue);
      if (chased) {
        return { value: chased.value as number | string, unitType: this.inferUnitType(chased.family), depth: 'full' };
      }
      // Literal value — parse as number if possible
      const numVal = Number(refValue);
      return { value: isNaN(numVal) ? refValue : numVal, unitType: 'unknown', depth: 'partial' };
    }

    // 4. Not found
    return null;
  }

  private inferUnitType(family: string): string {
    return FAMILY_UNIT_MAP[family] || 'unknown';
  }

  /**
   * Extract the primary primitive reference from a primitiveReferences object.
   * - Single-key: use that key's value.
   * - Multi-key with 'value' key: use 'value'.
   * - Multi-key without 'value': return null (triggers partial resolution).
   */
  private extractPrimaryRef(refs: Record<string, string>): string | null {
    const keys = Object.keys(refs);
    if (keys.length === 1) return refs[keys[0]];
    if ('value' in refs) return refs.value;
    return null;
  }

  private loadFile(filename: string, handler: (key: string, entry: any) => void): void {
    const filePath = path.join(this.tokenIndexDir!, filename);
    if (!fs.existsSync(filePath)) return;
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = yaml.load(content) as { tokens?: Record<string, unknown> };
      if (data?.tokens) {
        for (const [key, entry] of Object.entries(data.tokens)) {
          handler(key, entry);
        }
      }
    } catch {
      // Silently skip unparseable files — health reporting handles this upstream
    }
  }
}
