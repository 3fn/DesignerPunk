/**
 * Token Indexer
 *
 * Loads the build-time token index (primitives.yaml, semantics.yaml, components.yaml)
 * and provides search, detail, family, and consumer lookup queries.
 *
 * @see .kiro/specs/096-mcp-infrastructure-for-products/design.md
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { TokenRefResolver } from './TokenRefResolver';
import { parseSemanticOverrides, OverrideRefs } from './SemanticOverrideReader';

export interface TokenIndexEntry {
  name: string;
  tier: 'primitive' | 'semantic' | 'component';
  family?: string;
  category?: string;
  component?: string;
  // Optional (Spec 121 Task 1.1 / O3): primitives carry an entry-level `value`; semantics carry
  // none (value lives nested in primitiveReferences). Loosened from `string | number` to match the
  // already-correct runtime shape so semantic entries can be asserted to carry no `value` key.
  value?: string | number;
  formula?: string;
  primitiveReferences?: Record<string, string>;
  themeVarying?: boolean;
  platforms: { web: string; ios: string; android: string };
  consumers?: string[];
}

/**
 * Resolved-value triple (Spec 121 Req 2) — chain-resolves a token to its terminal value.
 * Field names + null-contract adopted verbatim from the product MCP's TokenRefResolver (Req 2.5).
 * Emitted ADDITIVELY on get_token_details alongside the unchanged `platforms{}` object.
 */
export interface ResolvedValueTriple {
  resolvedValue: number | string | null;
  resolvedUnitType: string | null;
  resolutionDepth: 'full' | 'partial' | null;
}

/**
 * Per-theme resolution of a Level 2 semantic override (issue 2026-09-12).
 *
 * WHAT PROBLEM THIS SOLVES
 * ------------------------
 * The `ResolvedValueTriple` above resolves a token's BASE `primitiveReferences` only. For a
 * token with a Level 2 dark override (`src/tokens/themes/dark/SemanticOverrides.ts` — e.g.
 * `color.structure.canvas` → `gray400`), the base triple therefore describes the LIGHT
 * resolution. Worse, legacy colour primitives carry identical `light.base` and `dark.base`
 * slots, so even the `dark` slot INSIDE `resolvedValue` repeats the light value. A consumer
 * reading `resolvedValue.dark.base` for a Level 2 token gets the wrong answer.
 *
 * `ThemeResolution` is the theme-scoped answer, emitted ADDITIVELY. The base triple's
 * meaning is unchanged: it remains the base (light) resolution.
 *
 * FIELDS
 * - `primitiveReferences` — the override's refs verbatim (what the theme swaps to).
 * - `resolvedValue` — the override's chain-resolved terminal value, following the SAME shape
 *   rules as the base triple (a colour primitive resolves to its full mode bundle).
 * - `resolvedUnitType` / `resolutionDepth` — same contract as the base triple.
 * - `modeValue` — convenience scalar: the `dark.base` slot of `resolvedValue` when the
 *   terminal value is a mode bundle; `null` otherwise (composite overrides, non-bundle
 *   values, unresolvable refs). This is the single unambiguous "what is it in dark" answer.
 *
 * COMPOSITE OVERRIDES (e.g. `color.structure.border.subtle` → `{ color, opacity }`)
 * are NOT collapsed into one value — there is no honest single terminal value for a
 * colour+opacity pair. They mirror the base triple's multi-ref branch: `resolutionDepth`
 * `'partial'`, `resolvedValue` the token's own name, `modeValue` null — with the full
 * `primitiveReferences` exposed so each part can be resolved individually.
 */
export interface ThemeResolution {
  primitiveReferences: Record<string, string>;
  resolvedValue: number | string | Record<string, unknown> | null;
  resolvedUnitType: string | null;
  resolutionDepth: 'full' | 'partial' | null;
  modeValue: string | number | null;
}

/**
 * Theme-scoped resolutions attached to `get_token_details`.
 *
 * NULL/ABSENCE CONTRACT (additive, Spec-121-style):
 * - `themeResolutions` is ALWAYS present on a `get_token_details` response, for every tier.
 * - `themeResolutions.dark` is `null` when — and only when — the token has no Level 2 dark
 *   override. `null` therefore means "dark resolves exactly like the base triple", which is
 *   the correct answer for Level 1 and mode-invariant tokens, for all primitives, and for
 *   all component tokens (overrides exist only at the semantic tier).
 * - If the theme file itself cannot be read, every token reports `dark: null` — which is
 *   indistinguishable from "no override" at the field level. That case is surfaced as an
 *   index WARNING (`getWarnings()` → component health), so the degraded state is visible
 *   rather than silent.
 * - `themeResolutions` is emitted on `get_token_details` ONLY — `search`, `getFamily`, and
 *   `getConsumers` keep their existing lightweight shapes.
 *
 * WCAG THEMES ARE DELIBERATELY ABSENT (not an oversight): `wcag` resolution is not one value
 * but a matrix — `src/tokens/themes/wcag/` and `src/tokens/themes/dark-wcag/` layer over the
 * dark theme with their own precedence, AND every primitive carries its own `.wcag` slot
 * inside each mode. That needs its own design pass (deferred to the Semantic Contrast &
 * Theme Coverage spec). This object is the extension point: adding a `wcag` key later is
 * additive in exactly the way `dark` is today.
 */
export interface ThemeResolutions {
  dark: ThemeResolution | null;
}

export type TokenDetails = TokenIndexEntry & ResolvedValueTriple & {
  themeResolutions: ThemeResolutions;
};

export interface TokenConsumer {
  component: string;
  context: string;
}

export interface TokenHealth {
  primitives: number;
  semantics: number;
  componentTokens: number;
}

/**
 * Pull the dark-mode base slot out of a resolved colour value.
 *
 * Colour primitives in the token index carry a mode bundle:
 *   `{ light: { base, wcag }, dark: { base, wcag } }`
 * For those, the single scalar a consumer actually wants for dark mode is `dark.base`.
 * Anything that is not such a bundle (scalars, composites, nulls) yields null — the
 * `modeValue` field is a convenience, never a guess.
 */
function extractDarkModeValue(value: unknown): string | number | null {
  if (!value || typeof value !== 'object') return null;
  const dark = (value as Record<string, unknown>).dark;
  if (!dark || typeof dark !== 'object') return null;
  const base = (dark as Record<string, unknown>).base;
  return typeof base === 'string' || typeof base === 'number' ? base : null;
}

export class TokenIndexer {
  private primitives = new Map<string, TokenIndexEntry>();
  private semantics = new Map<string, TokenIndexEntry>();
  private componentTokens = new Map<string, TokenIndexEntry>();
  private consumerIndex = new Map<string, string[]>();
  private warnings: string[] = [];
  // Chain-resolver for the get_token_details resolved-value triple (Spec 121 Req 2). Reads the
  // same token-index/*.yaml corpus as the tier maps; loaded alongside them in indexTokens().
  private resolver: TokenRefResolver | undefined;
  // Level 2 dark overrides, text-parsed from src/tokens/themes/dark/SemanticOverrides.ts
  // (issue 2026-09-12). Empty map = no overrides loaded; see the ThemeResolutions contract.
  private darkOverrides = new Map<string, OverrideRefs>();

  /**
   * @param tokenIndexDir Directory holding primitives/semantics/components.yaml
   * @param projectRoot   Repo/package root used to locate theme override files. Defaults to
   *                      the token index's parent (`<root>/token-index` is the standard
   *                      layout); ComponentIndexer passes its own resolved root explicitly.
   */
  async indexTokens(tokenIndexDir: string, projectRoot?: string): Promise<void> {
    this.primitives.clear();
    this.semantics.clear();
    this.componentTokens.clear();
    this.consumerIndex.clear();
    this.darkOverrides.clear();
    this.warnings = [];

    this.loadThemeOverrides(projectRoot ?? path.resolve(tokenIndexDir, '..'));

    if (!fs.existsSync(tokenIndexDir)) {
      this.warnings.push(`Token index directory not found: ${tokenIndexDir}`);
      return;
    }

    this.loadTier(path.join(tokenIndexDir, 'primitives.yaml'), 'primitive', this.primitives);
    this.loadTier(path.join(tokenIndexDir, 'semantics.yaml'), 'semantic', this.semantics);
    this.loadTier(path.join(tokenIndexDir, 'components.yaml'), 'component', this.componentTokens);

    this.resolver = new TokenRefResolver(tokenIndexDir);
    this.resolver.load();

    this.buildConsumerIndex();
  }

  search(params: { family?: string; tier?: string; name?: string }): TokenIndexEntry[] {
    let results: TokenIndexEntry[] = [];

    const maps = this.getMapsForTier(params.tier);
    for (const map of maps) {
      for (const entry of Array.from(map.values())) {
        results.push(entry);
      }
    }

    if (params.family) {
      const f = params.family.toLowerCase();
      results = results.filter(e => (e.family || e.category || '').toLowerCase() === f);
    }
    if (params.name) {
      const n = params.name.toLowerCase();
      results = results.filter(e => e.name.toLowerCase().includes(n));
    }

    return results;
  }

  getDetails(name: string): TokenDetails | null {
    const entry = this.primitives.get(name) || this.semantics.get(name) || this.componentTokens.get(name) || null;
    if (!entry) return null;

    // Additively attach the resolved-value triple (Spec 121 Req 2). Existing keys —
    // including the unchanged platforms{} object and the absent `value` key on semantics —
    // are preserved exactly; the triple is layered on top.
    //
    // `themeResolutions` (issue 2026-09-12) is layered on the same way: purely additive, the
    // base triple keeps its meaning (the BASE/light resolution), and the dark answer gets its
    // own clearly-named home instead of being smuggled into an existing field.
    const triple = this.resolveTriple(name);
    return { ...entry, ...triple, themeResolutions: this.resolveThemeResolutions(name, triple) };
  }

  /**
   * Map TokenRefResolver's ResolvedRef → the resolved-value triple (Req 2 null-contract, verbatim):
   * - primitive → own value / 'full'
   * - semantic|component single resolvable ref → chain-resolved terminal value / 'full'
   * - multi-ref | literal | unresolvable → token self-name / 'partial'
   * - no-ref-no-value (resolver returns null) → null / null / null
   */
  private resolveTriple(name: string): ResolvedValueTriple {
    const resolved = this.resolver?.resolve(name) ?? null;
    if (!resolved) {
      return { resolvedValue: null, resolvedUnitType: null, resolutionDepth: null };
    }
    return {
      resolvedValue: resolved.value,
      resolvedUnitType: resolved.unitType,
      resolutionDepth: resolved.depth,
    };
  }

  /**
   * Build the theme-scoped resolutions for a token (issue 2026-09-12).
   * Currently one theme: `dark`. See the ThemeResolutions doc for the null contract and for
   * why wcag/dark-wcag are deliberately not resolved here.
   *
   * @param baseTriple the token's base resolution — used only as the unitType fallback, so the
   *                   theme branch and the base branch agree on unit typing without
   *                   duplicating TokenRefResolver's category→unit table.
   */
  private resolveThemeResolutions(name: string, baseTriple: ResolvedValueTriple): ThemeResolutions {
    const refs = this.darkOverrides.get(name);
    if (!refs) return { dark: null };
    return { dark: this.resolveOverride(name, refs, baseTriple) };
  }

  /**
   * Resolve one override's primitiveReferences through the same chain the base triple uses.
   * Primary-ref extraction mirrors TokenRefResolver.extractPrimaryRef exactly (single key →
   * that key; multi-key with `value` → `value`; otherwise composite → partial).
   */
  private resolveOverride(name: string, refs: OverrideRefs, baseTriple: ResolvedValueTriple): ThemeResolution {
    const keys = Object.keys(refs);
    const primaryRef = keys.length === 1 ? refs[keys[0]] : ('value' in refs ? refs.value : null);

    // Composite override (e.g. { color, opacity }) — no honest single terminal value.
    if (primaryRef == null) {
      return {
        primitiveReferences: { ...refs },
        resolvedValue: name,
        resolvedUnitType: baseTriple.resolvedUnitType,
        resolutionDepth: 'partial',
        modeValue: null,
      };
    }

    const resolved = this.resolver?.resolve(primaryRef) ?? null;
    if (!resolved) {
      // The override points at a literal or an unknown token — report it, flagged partial.
      return {
        primitiveReferences: { ...refs },
        resolvedValue: primaryRef,
        resolvedUnitType: baseTriple.resolvedUnitType,
        resolutionDepth: 'partial',
        modeValue: null,
      };
    }

    return {
      primitiveReferences: { ...refs },
      resolvedValue: resolved.value,
      resolvedUnitType: resolved.unitType,
      resolutionDepth: resolved.depth,
      modeValue: extractDarkModeValue(resolved.value),
    };
  }

  /**
   * Load theme override files. Text-parsed — no coupling to the token pipeline.
   * A missing file is WARNED (not silent): without it every token reports `dark: null`,
   * which is indistinguishable from "no override" at the field level.
   */
  private loadThemeOverrides(projectRoot: string): void {
    const darkPath = path.join(projectRoot, 'src/tokens/themes/dark/SemanticOverrides.ts');
    const { overrides, fileFound } = parseSemanticOverrides(darkPath);
    if (!fileFound) {
      this.warnings.push(
        `Dark theme overrides not found: ${darkPath} — get_token_details will report themeResolutions.dark = null for every token`
      );
      return;
    }
    if (overrides.size === 0) {
      this.warnings.push(
        `Dark theme overrides parsed to 0 entries: ${darkPath} — the file exists but no override entries matched (parser may be stale)`
      );
    }
    this.darkOverrides = overrides;
  }

  getFamily(family: string): TokenIndexEntry[] {
    const f = family.toLowerCase();
    const results: TokenIndexEntry[] = [];
    for (const map of [this.primitives, this.semantics, this.componentTokens]) {
      for (const entry of Array.from(map.values())) {
        if ((entry.family || entry.category || '').toLowerCase() === f) {
          results.push(entry);
        }
      }
    }
    return results;
  }

  getConsumers(token: string): TokenConsumer[] {
    const consumers = this.consumerIndex.get(token) || [];
    return consumers.map(c => ({ component: c, context: `references ${token}` }));
  }

  getHealth(): TokenHealth {
    return {
      primitives: this.primitives.size,
      semantics: this.semantics.size,
      componentTokens: this.componentTokens.size,
    };
  }

  getWarnings(): string[] {
    return this.warnings;
  }

  // --- Private ---

  private loadTier(filePath: string, tier: 'primitive' | 'semantic' | 'component', map: Map<string, TokenIndexEntry>): void {
    if (!fs.existsSync(filePath)) return;

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = yaml.load(content) as { tokens?: Record<string, any> };
      if (!data?.tokens) return;

      for (const [name, entry] of Object.entries(data.tokens)) {
        map.set(name, { name, tier, ...entry });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.warnings.push(`Failed to parse ${filePath}: ${msg}`);
    }
  }

  private buildConsumerIndex(): void {
    for (const map of [this.primitives, this.semantics, this.componentTokens]) {
      for (const entry of Array.from(map.values())) {
        if (!entry.consumers) continue;
        for (const component of entry.consumers) {
          const existing = this.consumerIndex.get(entry.name) || [];
          if (!existing.includes(component)) existing.push(component);
          this.consumerIndex.set(entry.name, existing);
        }
      }
    }
  }

  private getMapsForTier(tier?: string): Map<string, TokenIndexEntry>[] {
    if (!tier) return [this.primitives, this.semantics, this.componentTokens];
    switch (tier.toLowerCase()) {
      case 'primitive': return [this.primitives];
      case 'semantic': return [this.semantics];
      case 'component': return [this.componentTokens];
      default: return [this.primitives, this.semantics, this.componentTokens];
    }
  }
}
