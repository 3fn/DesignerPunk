/**
 * SemanticComparator — compares two *normalized* artifacts and reports divergences.
 *
 * Structured (yaml/json): recursive deep-diff. Object comparison is key-order
 * independent (keys compared by name, not position). A key present on only one
 * side emits a single divergence for the whole missing value (not one per leaf),
 * which is exactly how an emptied `components.yaml` surfaces.
 *
 * Text (css/swift/kotlin): positional line diff. Generated output is
 * deterministic and not reordered, so line-by-line positional comparison
 * correctly localizes drift without an external diff dependency.
 *
 * Dimension tagging here is a coarse triage hint; the authoritative provenance
 * bucketing is the DivergenceClassifier's job (Task 1.2).
 */

import { ArtifactRef, Divergence, DivergenceDimension } from './types';

export class SemanticComparator {
  /** Compare normalized committed vs. fresh for one artifact. */
  compare(artifact: ArtifactRef, committed: unknown, fresh: unknown): Divergence[] {
    const out: Divergence[] = [];
    if (isTextKind(artifact)) {
      this.compareText(artifact.path, asString(committed), asString(fresh), out);
    } else {
      this.deepDiff(artifact.path, '', committed, fresh, out);
    }
    return out;
  }

  private deepDiff(
    artifactPath: string,
    locator: string,
    committed: unknown,
    fresh: unknown,
    out: Divergence[],
  ): void {
    if (Object.is(committed, fresh)) return;

    // One side missing the whole value → a single divergence for the subtree.
    if (committed === undefined || fresh === undefined) {
      this.emit(out, artifactPath, locator || '(root)', committed, fresh);
      return;
    }

    if (Array.isArray(committed) && Array.isArray(fresh)) {
      const max = Math.max(committed.length, fresh.length);
      for (let i = 0; i < max; i++) {
        this.deepDiff(artifactPath, `${locator}[${i}]`, committed[i], fresh[i], out);
      }
      return;
    }

    if (isPlainObject(committed) && isPlainObject(fresh)) {
      const keys = new Set([...Object.keys(committed), ...Object.keys(fresh)]);
      for (const key of keys) {
        const child = locator ? `${locator}.${key}` : key;
        this.deepDiff(artifactPath, child, committed[key], fresh[key], out);
      }
      return;
    }

    // Differing primitives, or a type mismatch (object vs primitive).
    this.emit(out, artifactPath, locator || '(root)', committed, fresh);
  }

  private compareText(artifactPath: string, committed: string, fresh: string, out: Divergence[]): void {
    if (committed === fresh) return;
    const a = committed.split('\n');
    const b = fresh.split('\n');
    const max = Math.max(a.length, b.length);
    for (let i = 0; i < max; i++) {
      if (a[i] !== b[i]) {
        this.emit(out, artifactPath, `line ${i + 1}`, a[i], b[i]);
      }
    }
  }

  private emit(
    out: Divergence[],
    artifactPath: string,
    locator: string,
    committedValue: unknown,
    freshValue: unknown,
  ): void {
    out.push({
      id: `${artifactPath}#${locator}`,
      artifactPath,
      locator,
      committedValue,
      freshValue,
      dimension: classifyDimension(artifactPath, locator, committedValue, freshValue),
    });
  }
}

function classifyDimension(
  artifactPath: string,
  locator: string,
  committed: unknown,
  fresh: unknown,
): DivergenceDimension {
  const blob = `${asString(committed)}\u0000${asString(fresh)}`;
  if (locator.includes('value') && /rgba\(|oklch\(/.test(blob)) return 'color-format';
  if (artifactPath.includes('components.yaml') && (committed === undefined || fresh === undefined)) {
    return 'component-presence';
  }
  if (/themeVarying/i.test(locator)) return 'theme-varying';
  return 'other';
}

function isTextKind(artifact: ArtifactRef): boolean {
  return artifact.kind === 'css' || artifact.kind === 'swift' || artifact.kind === 'kotlin';
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function asString(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === undefined) return '';
  // Inputs are parsed YAML/JSON (objects, arrays, primitives) — always
  // serializable, never circular. If that invariant ever breaks, JSON.stringify
  // throws and we want to know, not silently degrade.
  return JSON.stringify(value);
}
