#!/usr/bin/env tsx
/**
 * build-name-contract.ts — builds `dist/name-contract.json`, the one seam between
 * a born consumer's token language and our updating component surface (Spec 123
 * Task 6; design.md § "C7" name contract, DD10, DD11, DD17, P1 (ruled YES);
 * requirements.md Req 5A).
 *
 * WHAT IS READ (both sides compiled, per DD10):
 *   - `dist/browser/designerpunk.esm.js` — esbuild inlines every component `.css`
 *     as text, so the bundle is the complete static record of the web surface:
 *     `var(--x)` references PLUS complete quoted `'--x'` literals (the JS-side
 *     `getPropertyValue('--x')` reads and their ternary / array forms).
 *   - `var()` references inside `dist/ComponentTokens.web.css` (our component
 *     tier references primitives the consumer must define).
 *   - OUR OWN generated index: `dist/DesignTokens.web.css` + `dist/ComponentTokens.web.css`.
 *   - `token-index/{semantics,primitives,components}.yaml` — the tier of each name.
 *   - Each component's `.schema.yaml` `tokens:` block — the DECLARED USE (attribution
 *     only, never the check source).
 *
 * WHAT FAILS THE BUILD (every failure is loud and names its owner):
 *   1. bundle ⊆ src: a name in the bundle that no bundled source module contains
 *      (esbuild synthesized or interpolated a name).
 *   2. An UNRECORDED dynamic site: the mechanical scan finds a site that is not
 *      in SITE_RECORD below (or a recorded site has vanished — the record is stale).
 *   3. OWN-INDEX CHECK (T2-L1): a name that would enter the contract (a class-(i)
 *      resolved name, or any static reference that the component does not define
 *      itself) is not defined in OUR OWN generated web CSS → a component defect,
 *      routed to Lina. It never reaches a consumer report.
 *   4. A name defined in our generated CSS that the token index cannot tier →
 *      a generator/index defect, routed to Ada.
 *
 * THE THREE DISPOSITIONS (Lina R2 + Ada's third) for every dynamic site:
 *   (i)   closed — ours: the finite literal set resolves and joins `referencedNames`
 *         under P1's filter;
 *   (ii)  component tier: enumerated, EXCLUDED by P1 → `excluded[]` with its reason;
 *   (iii) consumer-supplied: out of 5A scope → `excluded[]` with its reason, while
 *         any DEFAULT value in our code for that input is resolved as class (i).
 *   A fourth, `uncovered`, exists only so a future site that cannot be enumerated is
 *   carried as a standing "not checked" line in `sync` — never silently clean.
 *
 * P1 (Peter, 2026-09-26): semantic ALWAYS · primitive YES · component NEVER.
 * Scope: web-surface names only (native: Task 3.5's decision record).
 *
 * Usage: npx tsx scripts/build-name-contract.ts   # after tsc + build:browser
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import * as yaml from 'js-yaml';

export const PROJECT_ROOT = path.resolve(__dirname, '..');
export const OUTPUT_REL = 'dist/name-contract.json';
export const BUNDLE_REL = 'dist/browser/designerpunk.esm.js';
export const DESIGN_TOKENS_CSS_REL = 'dist/DesignTokens.web.css';
export const COMPONENT_TOKENS_CSS_REL = 'dist/ComponentTokens.web.css';
export const TYPE_CONTRACT_DTS_REL = ['dist/types/PrimitiveToken.d.ts', 'dist/types/SemanticToken.d.ts'] as const;
export const CONTRACT_SCHEMA_VERSION = 1;

export type Tier = 'semantic' | 'primitive' | 'component';
/** P1's filter (ruled 2026-09-26). The sync-side check applies the same filter again. */
export const CONTRACT_TIERS: readonly Tier[] = ['semantic', 'primitive'];

// ─────────────────────────────────────────────────────────────────────────────
// Name extraction
// ─────────────────────────────────────────────────────────────────────────────

const NAME_BODY = '[A-Za-z_][A-Za-z0-9_-]*';
/** `var(--x` — never a name cut short by more name chars. */
const VAR_RE = new RegExp(`var\\(\\s*(--${NAME_BODY})(?![A-Za-z0-9_-])`, 'g');
/** Any `--x` token, bounded on the left by a non-name char. */
const ANY_NAME_RE = new RegExp(`(^|[^A-Za-z0-9_-])(--${NAME_BODY})(?![A-Za-z0-9_-])`, 'g');
/** A custom-property DECLARATION `--x:` (CSS, or CSS text inside a JS string). */
const DECL_RE = new RegExp(`(?:^|[\\s{;(])(--${NAME_BODY})\\s*:`, 'g');
const EXACT_NAME_RE = new RegExp(`^--${NAME_BODY}$`);
const stripCssComments = (t: string): string => t.replace(/\/\*[\s\S]*?\*\//g, '');

/**
 * A piece of string text in code: a string literal, a whole no-substitution template,
 * or one head/middle/tail of a template expression. `cut` marks a piece that ends at a
 * `${` substitution — a name running to its end is being BUILT at runtime, not referenced.
 * CSS comments are stripped per piece (esbuild inlines component CSS WITH its comments,
 * and a name in a comment is not a reference).
 */
export interface Piece {
  text: string;
  cut: boolean;
  /** A complete literal (not a template fragment) — the `getPropertyValue('--x')` form. */
  whole: boolean;
}

export interface CodeScan {
  pieces: Piece[];
  /** First arguments of `setProperty('--x', …)` — a component setting its own property. */
  setProperties: Set<string>;
}

export function scanCode(fileName: string, text: string, kind: ts.ScriptKind = ts.ScriptKind.TS): CodeScan {
  const pieces: Piece[] = [];
  const setProperties = new Set<string>();
  const sf = ts.createSourceFile(fileName, text, ts.ScriptTarget.ES2020, true, kind);
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      pieces.push({ text: stripCssComments(node.text), cut: false, whole: true });
    } else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node)) {
      pieces.push({ text: stripCssComments(node.text), cut: true, whole: false });
    } else if (ts.isTemplateTail(node)) {
      pieces.push({ text: stripCssComments(node.text), cut: false, whole: false });
    }
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'setProperty' &&
      node.arguments[0] &&
      (ts.isStringLiteral(node.arguments[0]) || ts.isNoSubstitutionTemplateLiteral(node.arguments[0]))
    ) {
      setProperties.add((node.arguments[0] as ts.StringLiteral).text);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { pieces, setProperties };
}

/** Matches of `re` (group `g`) in a piece, dropping any that run into a `${` cut. */
function namesIn(piece: Piece, re: RegExp, g: number): string[] {
  const out: string[] = [];
  for (const m of piece.text.matchAll(re)) {
    const end = (m.index ?? 0) + m[0].length;
    if (piece.cut && end === piece.text.length) continue;
    out.push(m[g]);
  }
  return out;
}

export interface BundleReferences {
  /** `var(--x)` references in the bundle's (comment-free) string text. */
  varNames: Set<string>;
  /** Complete `'--x'` literals — the JS-side `getPropertyValue('--x')` reads and their ternary/array forms. */
  literalNames: Set<string>;
  /** `var(--${…})` constructions — each must be a recorded dynamic site. */
  interpolatedVarSites: number;
  /** Names the bundle DEFINES (CSS declarations in the inlined CSS, or setProperty). */
  definedNames: Set<string>;
}

export function extractBundleReferences(bundle: string): BundleReferences {
  const { pieces, setProperties } = scanCode('designerpunk.esm.js', bundle, ts.ScriptKind.JS);
  const varNames = new Set<string>();
  const literalNames = new Set<string>();
  const definedNames = new Set<string>(setProperties);
  let interpolatedVarSites = 0;
  for (const p of pieces) {
    for (const n of namesIn(p, VAR_RE, 1)) varNames.add(n);
    if (p.whole && EXACT_NAME_RE.test(p.text)) literalNames.add(p.text);
    for (const n of namesIn(p, DECL_RE, 1)) definedNames.add(n);
    if (p.cut && /var\(\s*--$/.test(p.text)) interpolatedVarSites++;
  }
  return { varNames, literalNames, interpolatedVarSites, definedNames };
}

/**
 * The source modules esbuild bundled, read from its own module-boundary comments
 * (`// src/…` for TS, `// css-as-string:src/…` for inlined CSS). An empty
 * list fails the build (fail-closed: every bundle name would then be bundle-only).
 */
export function bundleModules(bundle: string): string[] {
  const out = new Set<string>();
  for (const line of bundle.split('\n')) {
    let m = /^\/\/ (src\/\S+)$/.exec(line);
    if (m) {
      out.add(m[1]);
      continue;
    }
    m = /^\/\/ css-as-string:(.+)$/.exec(line);
    if (m) {
      // The plugin (`scripts/esbuild-css-plugin.js`) has emitted a package-root-
      // relative `src/…` form since 2026-09-27 (`.kiro/issues/
      // 2026-09-27-bundle-absolute-path-leak.md`). The legacy absolute-path form
      // is still accepted here so an older bundle, or a future plugin regression,
      // never silently empties this list — it fails loud instead (bundle ⊆ src).
      const i = m[1].startsWith('src/') ? -1 : m[1].lastIndexOf('/src/');
      if (m[1].startsWith('src/') || i >= 0) out.add(m[1].slice(i + 1));
    }
  }
  return [...out].sort();
}

/** Names in a SOURCE module's non-comment text (the src side of bundle ⊆ src). */
export interface SourceNames {
  referenced: Set<string>;
  defined: Set<string>;
}

export function sourceNames(relPath: string, text: string): SourceNames {
  const out: SourceNames = { referenced: new Set(), defined: new Set() };
  const scan: CodeScan = relPath.endsWith('.css')
    ? { pieces: [{ text: stripCssComments(text), cut: false, whole: false }], setProperties: new Set() }
    : scanCode(relPath, text);
  for (const p of scan.pieces) {
    for (const n of namesIn(p, ANY_NAME_RE, 2)) out.referenced.add(n);
    for (const n of namesIn(p, DECL_RE, 1)) out.defined.add(n);
  }
  for (const n of scan.setProperties) out.defined.add(n);
  return out;
}

/** `--x: value;` definitions in generated CSS. First definition wins (the `:root` light base). */
export function parseCssDefinitions(css: string): Map<string, string> {
  const defs = new Map<string, string>();
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const re = new RegExp(`(--${NAME_BODY})\\s*:\\s*([^;]*);`, 'g');
  for (const m of stripped.matchAll(re)) if (!defs.has(m[1])) defs.set(m[1], m[2].trim());
  return defs;
}

export function cssVarReferences(css: string): Set<string> {
  const out = new Set<string>();
  for (const m of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(VAR_RE)) out.add(m[1]);
  return out;
}

/** Resolve a value through a chain of whole-value `var(--x)` references. */
export function resolveValue(name: string, defs: Map<string, string>): string | undefined {
  let value = defs.get(name);
  const seen = new Set<string>([name]);
  while (value !== undefined) {
    const m = /^var\(\s*(--[A-Za-z0-9_-]+)\s*\)$/.exec(value);
    if (!m || seen.has(m[1])) return value;
    seen.add(m[1]);
    const next = defs.get(m[1]);
    if (next === undefined) return value;
    value = next;
  }
  return value;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tier index
// ─────────────────────────────────────────────────────────────────────────────

export interface TierEntry {
  tier: Tier;
  /** The token's name in DesignerPunk's language (`color.structure.border`). */
  token: string;
  /** The composite sub-property this CSS name carries (`fontSize`), if any. */
  part?: string;
  /** For the component tier: the owning component family (index `component:`). */
  family?: string;
}

interface IndexEntry {
  platforms?: { web?: string };
  primitiveReferences?: Record<string, string>;
  component?: string;
}

const kebab = (s: string): string => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * CSS custom-property name → tier. A composite token (typography, motion) is ONE
 * index entry but several CSS properties: `<web>-<kebab(key)>` for each
 * `primitiveReferences` key other than `value` (the generator's expansion).
 */
export function buildTierIndex(docs: Record<Tier, Record<string, IndexEntry>>): Map<string, TierEntry> {
  const idx = new Map<string, TierEntry>();
  for (const tier of ['semantic', 'primitive', 'component'] as Tier[]) {
    for (const [token, entry] of Object.entries(docs[tier] ?? {})) {
      const web = entry.platforms?.web;
      if (!web) continue;
      const family = entry.component;
      if (!idx.has(web)) idx.set(web, { tier, token, ...(family ? { family } : {}) });
      const keys = Object.keys(entry.primitiveReferences ?? {}).filter((k) => k !== 'value');
      for (const key of keys) {
        const sub = `${web}-${kebab(key)}`;
        if (!idx.has(sub)) idx.set(sub, { tier, token, part: key, ...(family ? { family } : {}) });
      }
    }
  }
  return idx;
}

function loadIndexDocs(root: string): Record<Tier, Record<string, IndexEntry>> {
  const load = (f: string) =>
    ((yaml.load(fs.readFileSync(path.join(root, 'token-index', f), 'utf8')) as { tokens?: Record<string, IndexEntry> })
      .tokens ?? {});
  return { semantic: load('semantics.yaml'), primitive: load('primitives.yaml'), component: load('components.yaml') };
}

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic sites — the mechanical scan and the committed record
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The scan patterns (tasks.md Task 6, Ada R2), plus `helper-call`: a call to a
 * name-constructing helper defined at a recorded site. Without it, the callers
 * that ROUTE through the helper (ContainerBase.web.ts, ContainerCardBase.web.ts)
 * are invisible to the four literal patterns.
 */
export const SCAN_PATTERNS: ReadonlyArray<{ id: string; re: RegExp }> = [
  // Each pattern also matches a partial name before the interpolation/concatenation
  // (`var(--chip-${v})`, `'--chip-' + v`) — the bare forms miss those (bite recorded).
  { id: 'var(--${', re: /var\(\s*--[A-Za-z0-9_-]*\$\{/ },
  { id: '`--${', re: /`--[A-Za-z0-9_-]*\$\{/ },
  { id: 'getPropertyValue(`', re: /getPropertyValue\(\s*`/ },
  { id: "'--' +", re: /(['"])--[A-Za-z0-9_-]*\1\s*\+/ },
];
/** Name-constructing helpers (defined at the token-mapping site below). */
export const NAME_HELPERS = ['tokenToCssCustomProperty', 'tokenToCssVar'] as const;
const HELPER_CALL_RE = new RegExp(`\\b(${NAME_HELPERS.join('|')})\\(`);
const HELPER_DEF_RE = new RegExp(`function\\s+(${NAME_HELPERS.join('|')})\\s*\\(`);

export interface ScannedSite {
  file: string;
  /** The trimmed source line — the site's identity (located by content, not line number). */
  text: string;
  /** 1-based occurrence of this exact trimmed text in the file. */
  occurrence: number;
  line: number;
  patterns: string[];
}

export function siteKey(s: { file: string; text: string; occurrence?: number }): string {
  return `${s.file} :: ${s.text} #${s.occurrence ?? 1}`;
}

export function scanDynamicSites(files: Array<{ rel: string; text: string }>): ScannedSite[] {
  const out: ScannedSite[] = [];
  for (const { rel, text } of files) {
    const seen = new Map<string, number>();
    text.split('\n').forEach((raw, i) => {
      const t = raw.trim();
      if (t.startsWith('*') || t.startsWith('//') || t.startsWith('/*')) return;
      const patterns = SCAN_PATTERNS.filter((p) => p.re.test(t)).map((p) => p.id);
      if (HELPER_CALL_RE.test(t) && !HELPER_DEF_RE.test(t)) patterns.push('helper-call');
      if (patterns.length === 0) return;
      const occurrence = (seen.get(t) ?? 0) + 1;
      seen.set(t, occurrence);
      out.push({ file: rel, text: t, occurrence, line: i + 1, patterns });
    });
  }
  return out;
}

export type DispositionClass = 'closed' | 'component-tier' | 'consumer-supplied' | 'helper' | 'uncovered';

export interface Disposition {
  class: DispositionClass;
  /** (i)/(ii): resolver ids whose finite literal sets this site draws from. */
  resolvers?: string[];
  /** (iii): the consumer-supplied input. */
  input?: string;
  /** (iii): resolvers for the DEFAULT values our code feeds this input (resolved as (i)). */
  defaults?: string[];
  reason: string;
}

export interface SiteRecordEntry {
  file: string;
  text: string;
  occurrence?: number;
  component: string;
  dispositions: Disposition[];
}

const CB_MAP = 'src/components/core/Container-Base/platforms/web/token-mapping.ts';
const CB_WEB = 'src/components/core/Container-Base/platforms/web/ContainerBase.web.ts';
const CCB_WEB = 'src/components/core/Container-Card-Base/platforms/web/ContainerCardBase.web.ts';
const ICON_WEB = 'src/components/core/Icon-Base/platforms/web/IconBase.web.ts';
const PPB_WEB = 'src/components/core/Progress-Pagination-Base/platforms/web/ProgressPaginationBase.web.ts';

const TYPED_PROP = (input: string, defaults: string[] = []): Disposition => ({
  class: 'consumer-supplied',
  input,
  defaults,
  reason: `the consumer names the token via Container-Base's typed \`${input}\` prop — out of 5A scope; our own default values for it are resolved as class (i)`,
});
const CLOSED = (...resolvers: string[]): Disposition => ({
  class: 'closed',
  resolvers,
  reason: 'finite literal set in our code — resolved, own-index checked, joins referencedNames under P1',
});

/**
 * THE COMMITTED SITE RECORD. The build fails when the scan finds a site that is
 * not here, or when a site here is no longer found. Located by CONTENT (trimmed
 * line + occurrence), so line drift never breaks it; an edited line is a new site.
 */
export const SITE_RECORD: SiteRecordEntry[] = [
  // ── Container-Base: the name construction and its helpers ──────────────────
  {
    file: CB_MAP,
    text: 'return `--${kebab}`;',
    component: 'Container-Base',
    dispositions: [{ class: 'helper', reason: 'tokenToCssCustomProperty — the construction itself; every caller is a recorded site below' }],
  },
  {
    file: CB_MAP,
    text: 'return `var(${tokenToCssCustomProperty(tokenName)})`;',
    component: 'Container-Base',
    dispositions: [{ class: 'helper', reason: 'tokenToCssVar wraps the construction; every caller is a recorded site below' }],
  },
  // ── Container-Base token-mapping.ts callers: closed maps → (i) ─────────────
  ...['padding', 'padding-block', 'padding-inline', 'padding-block-start', 'padding-block-end', 'padding-inline-start', 'padding-inline-end'].map(
    (prop): SiteRecordEntry => ({
      file: CB_MAP,
      text: `return \`${prop}: \${tokenToCssVar(tokenName)}\`;`,
      component: 'Container-Base',
      dispositions: [CLOSED('Container-Base.paddingTokenMap', 'Container-Card-Base.cardPaddingTokenMap', 'Container-Card-Base.cardVerticalPaddingTokenMap', 'Container-Card-Base.cardHorizontalPaddingTokenMap')],
    }),
  ),
  {
    file: CB_MAP,
    text: 'const widthVar = tokenToCssVar(tokenName);',
    component: 'Container-Base',
    dispositions: [CLOSED('Container-Base.borderTokenMap', 'Container-Card-Base.cardBorderTokenMap')],
  },
  {
    file: CB_MAP,
    text: 'const colorVar = borderColor ? tokenToCssVar(borderColor) : tokenToCssVar(BORDER_COLOR_TOKEN);',
    component: 'Container-Base',
    dispositions: [
      TYPED_PROP('borderColor', ['Container-Base.BORDER_COLOR_TOKEN', 'Container-Card-Base.cardBorderColorTokenMap']),
      CLOSED('Container-Base.BORDER_COLOR_TOKEN'),
    ],
  },
  {
    file: CB_MAP,
    text: 'return `border-radius: ${tokenToCssVar(tokenName)}`;',
    component: 'Container-Base',
    dispositions: [CLOSED('Container-Base.borderRadiusTokenMap', 'Container-Card-Base.cardBorderRadiusTokenMap')],
  },
  {
    file: CB_MAP,
    text: 'return `background: ${tokenToCssVar(color)}`;',
    component: 'Container-Base',
    dispositions: [TYPED_PROP('background', ['Container-Card-Base.cardBackgroundTokenMap'])],
  },
  {
    file: CB_MAP,
    text: 'return `box-shadow: ${tokenToCssVar(shadow)}`;',
    component: 'Container-Base',
    dispositions: [TYPED_PROP('shadow', ['Container-Card-Base.cardShadowTokenMap'])],
  },
  {
    file: CB_MAP,
    text: 'return `opacity: ${tokenToCssVar(opacity)}`;',
    component: 'Container-Base',
    dispositions: [TYPED_PROP('opacity')],
  },
  {
    file: CB_MAP,
    text: 'return `z-index: ${tokenToCssVar(tokenName)}`;',
    component: 'Container-Base',
    dispositions: [CLOSED('Container-Base.layeringTokenMap.web')],
  },
  // ── Container-Base.web.ts:224 — the typed `background` prop → (iii) ─────────
  {
    file: CB_WEB,
    text: 'const cssVarName = tokenToCssCustomProperty(background);',
    component: 'Container-Base',
    dispositions: [TYPED_PROP('background')],
  },
  // ── ContainerCardBase.web.ts:166 (now :167) — the closed card map → (i) ────
  {
    file: CCB_WEB,
    text: 'const cssVarName = tokenToCssCustomProperty(tokenName);',
    component: 'Container-Card-Base',
    dispositions: [CLOSED('Container-Card-Base.cardBackgroundTokenMap')],
  },
  // ── Progress-Pagination-Base:232 — component tier → (ii) ───────────────────
  {
    file: PPB_WEB,
    text: 'const stride = parseFloat(cs.getPropertyValue(`--progress-node-size-${size}-current`));',
    component: 'Progress-Pagination-Base',
    dispositions: [
      {
        class: 'component-tier',
        resolvers: ['Progress-Pagination-Base.nodeSizeCurrent'],
        reason: 'our component-tier tokens (--progress-node-size-{sm,md,lg}-current) — they stay behind the component surface (DD17); excluded by P1',
      },
    ],
  },
  // ── Icon-Base:200 / :476 — the consumer's own `color` prop → (iii) ─────────
  ...[1, 2].map(
    (occurrence): SiteRecordEntry => ({
      file: ICON_WEB,
      text: 'strokeColor = `var(--${color})`;',
      occurrence,
      component: 'Icon-Base',
      dispositions: [
        {
          class: 'consumer-supplied',
          input: 'color',
          defaults: ['Icon-Base.colorValuesFromOurComponents'],
          reason: "the consumer's own `color` prop value names the property — out of 5A scope; the values OUR components pass to Icon-Base are resolved as class (i)",
        },
      ],
    }),
  ),
];

// ─────────────────────────────────────────────────────────────────────────────
// Resolvers — the finite literal sets, imported from the components themselves
// ─────────────────────────────────────────────────────────────────────────────

export interface Resolved {
  /** The CSS custom-property names this resolver produces. */
  names: string[];
  /** The component whose code holds the literal set. */
  component: string;
  /** Per-name override: the components that SUPPLY the value (e.g. who passes a color to Icon-Base). */
  suppliedBy?: Record<string, string[]>;
}

export type ResolverTable = Record<string, () => Resolved>;

/**
 * Built lazily so the pure functions above can be tested without loading
 * component modules. Names are constructed with the component's OWN helper
 * (`tokenToCssCustomProperty`) — never a re-implementation.
 */
export function defaultResolvers(root: string = PROJECT_ROOT): ResolverTable {
  /* eslint-disable @typescript-eslint/no-var-requires */
  const mapping = require(path.join(root, 'src/components/core/Container-Base/platforms/web/token-mapping'));
  const cb = require(path.join(root, 'src/components/core/Container-Base/index'));
  const ccb = require(path.join(root, 'src/components/core/Container-Card-Base/index'));
  /* eslint-enable @typescript-eslint/no-var-requires */
  const toCss: (t: string) => string = mapping.tokenToCssCustomProperty;
  const fromValues = (component: string, values: string[]): Resolved => ({
    component,
    names: [...new Set(values.filter((v) => v).map(toCss))].sort(),
  });
  return {
    'Container-Base.paddingTokenMap': () => fromValues('Container-Base', Object.values(cb.paddingTokenMap)),
    'Container-Base.borderTokenMap': () => fromValues('Container-Base', Object.values(cb.borderTokenMap)),
    'Container-Base.borderRadiusTokenMap': () => fromValues('Container-Base', Object.values(cb.borderRadiusTokenMap)),
    'Container-Base.layeringTokenMap.web': () => fromValues('Container-Base', Object.values(cb.layeringTokenMap.web)),
    'Container-Base.BORDER_COLOR_TOKEN': () => fromValues('Container-Base', [cb.BORDER_COLOR_TOKEN]),
    'Container-Card-Base.cardPaddingTokenMap': () => fromValues('Container-Card-Base', Object.values(ccb.cardPaddingTokenMap)),
    'Container-Card-Base.cardVerticalPaddingTokenMap': () =>
      fromValues('Container-Card-Base', Object.values(ccb.cardVerticalPaddingTokenMap)),
    'Container-Card-Base.cardHorizontalPaddingTokenMap': () =>
      fromValues('Container-Card-Base', Object.values(ccb.cardHorizontalPaddingTokenMap)),
    'Container-Card-Base.cardBackgroundTokenMap': () => fromValues('Container-Card-Base', Object.values(ccb.cardBackgroundTokenMap)),
    'Container-Card-Base.cardShadowTokenMap': () => fromValues('Container-Card-Base', Object.values(ccb.cardShadowTokenMap)),
    'Container-Card-Base.cardBorderTokenMap': () => fromValues('Container-Card-Base', Object.values(ccb.cardBorderTokenMap)),
    'Container-Card-Base.cardBorderColorTokenMap': () =>
      fromValues('Container-Card-Base', Object.values(ccb.cardBorderColorTokenMap)),
    'Container-Card-Base.cardBorderRadiusTokenMap': () =>
      fromValues('Container-Card-Base', Object.values(ccb.cardBorderRadiusTokenMap)),
    // The web getter clamps `size` to exactly these (ProgressPaginationBase.web.ts `get size()`).
    'Progress-Pagination-Base.nodeSizeCurrent': () => ({
      component: 'Progress-Pagination-Base',
      names: ['sm', 'md', 'lg'].map((s) => `--progress-node-size-${s}-current`),
    }),
    'Icon-Base.colorValuesFromOurComponents': () => {
      const found = iconColorValuesFromOurComponents(root);
      const suppliedBy: Record<string, string[]> = {};
      for (const { value, component } of found) (suppliedBy[`--${value}`] ??= []).push(component);
      return { component: 'Icon-Base', names: Object.keys(suppliedBy).sort(), suppliedBy };
    },
  };
}

/**
 * The `color` values OUR components pass to Icon-Base: `createIconBase({ color: '<lit>' })`
 * and `<icon-base … color="<lit>">` in template text. `inherit`, hex and interpolated
 * values name no custom property.
 */
export function iconColorValuesFromOurComponents(root: string = PROJECT_ROOT): Array<{ value: string; component: string }> {
  const values = new Map<string, { value: string; component: string }>();
  let current = '';
  const keep = (v: string) => {
    if (v && v !== 'inherit' && !v.startsWith('#') && !v.includes('${')) values.set(`${v}|${current}`, { value: v, component: current });
  };
  for (const rel of componentSourceFiles(root).filter((f) => f.endsWith('.ts') && !f.includes('/Icon-Base/'))) {
    const text = fs.readFileSync(path.join(root, rel), 'utf8');
    if (!text.includes('createIconBase') && !text.includes('icon-base')) continue;
    current = componentOf(rel);
    const sf = ts.createSourceFile(rel, text, ts.ScriptTarget.ES2020, true, ts.ScriptKind.TS);
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'createIconBase') {
        const arg = node.arguments[0];
        if (arg && ts.isObjectLiteralExpression(arg)) {
          for (const p of arg.properties) {
            if (ts.isPropertyAssignment(p) && p.name.getText(sf) === 'color' && ts.isStringLiteralLike(p.initializer)) {
              keep(p.initializer.text);
            }
          }
        }
      }
      if (ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateExpression(node) || ts.isStringLiteral(node)) {
        const raw = node.getText(sf);
        for (const m of raw.matchAll(/<icon-base\b[^>]*\bcolor="([^"]*)"/g)) keep(m[1]);
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  return [...values.values()].sort((a, b) => (a.value + a.component).localeCompare(b.value + b.component));
}

// ─────────────────────────────────────────────────────────────────────────────
// Type contract (DD11)
// ─────────────────────────────────────────────────────────────────────────────

export const TYPE_CONTRACT_DECLARATIONS = ['PrimitiveToken', 'SemanticToken', 'TokenCategory', 'SemanticCategory'] as const;

export interface TypeContract {
  /** sha256 over the four declarations' emitted text — covers shape, cannot be hand-bumped. */
  hash: string;
  /** Normalized members: `PrimitiveToken.name: string`, `TokenCategory.SPACING = "spacing"`. */
  members: string[];
}

export function buildTypeContract(dtsTexts: Array<{ rel: string; text: string }>): TypeContract {
  const found = new Map<string, { text: string; members: string[] }>();
  for (const { rel, text } of dtsTexts) {
    const sf = ts.createSourceFile(rel, text, ts.ScriptTarget.ES2020, true, ts.ScriptKind.TS);
    for (const st of sf.statements) {
      if ((ts.isInterfaceDeclaration(st) || ts.isEnumDeclaration(st)) && (TYPE_CONTRACT_DECLARATIONS as readonly string[]).includes(st.name.text)) {
        const name = st.name.text;
        const members: string[] = [];
        if (ts.isInterfaceDeclaration(st)) {
          for (const m of st.members) {
            if (ts.isPropertySignature(m) && m.name) {
              const t = m.type ? m.type.getText(sf).replace(/\s+/g, ' ') : 'any';
              members.push(`${name}.${m.name.getText(sf)}${m.questionToken ? '?' : ''}: ${t}`);
            } else {
              members.push(`${name}.${m.getText(sf).replace(/\s+/g, ' ')}`);
            }
          }
        } else {
          for (const m of st.members) {
            members.push(`${name}.${m.name.getText(sf)}${m.initializer ? ` = ${m.initializer.getText(sf)}` : ''}`);
          }
        }
        // The hashed text includes leading JSDoc: a comment-only change moves the hash (DD11 residual).
        found.set(name, { text: st.getFullText(sf).trim(), members });
      }
    }
  }
  const missing = TYPE_CONTRACT_DECLARATIONS.filter((d) => !found.has(d));
  if (missing.length) {
    throw new Error(`name-contract: the type-contract surface is missing ${missing.join(', ')} in the emitted .d.ts (${dtsTexts.map((d) => d.rel).join(', ')}) — run tsc first.`);
  }
  const h = crypto.createHash('sha256');
  for (const d of TYPE_CONTRACT_DECLARATIONS) h.update(`${d}\n${found.get(d)!.text}\n`);
  return { hash: `sha256:${h.digest('hex')}`, members: TYPE_CONTRACT_DECLARATIONS.flatMap((d) => found.get(d)!.members) };
}

// ─────────────────────────────────────────────────────────────────────────────
// Assembly
// ─────────────────────────────────────────────────────────────────────────────

export interface ReferencedName {
  name: string;
  tier: 'semantic' | 'primitive';
  /** DesignerPunk's name for it (the language side of the report). */
  token: string;
  part?: string;
  /** DesignerPunk's resolved value (light base), for reference in the report. */
  value: string;
  usedBy: string[];
  declaredUse: string;
  /** Where the reference was found: bundle var(), bundle literal, component-token CSS, or a site id. */
  via: string[];
}

export interface ExcludedEntry {
  /** A custom-property name, or `site:<file> :: <text> #n` for a consumer-supplied site. */
  name: string;
  /** The THREE-way taxonomy's exclusion classes: (ii) component-tier · (iii) consumer-supplied. */
  class: 'component-tier' | 'consumer-supplied';
  /** For (ii): a component TOKEN (ComponentTokens.web.css), or a component-INTERNAL property the component defines itself. */
  kind?: 'component-token' | 'component-internal';
  reason: string;
  usedBy: string[];
}

export interface DynamicSiteReport {
  file: string;
  line: number;
  text: string;
  occurrence: number;
  patterns: string[];
  component: string;
  dispositions: Array<Disposition & { resolvedNames?: string[] }>;
}

export interface NameContract {
  schemaVersion: number;
  note: string;
  scope: string;
  tierFilter: { semantic: 'always'; primitive: 'yes'; component: 'never' };
  counts: Record<string, number>;
  referencedNames: ReferencedName[];
  excluded: ExcludedEntry[];
  dynamicSites: DynamicSiteReport[];
  notChecked: Array<{ component: string; site: string }>;
  typeContract: TypeContract;
}

export interface BuildInputs {
  bundle: string;
  designTokensCss: string;
  componentTokensCss: string;
  indexDocs: Record<Tier, Record<string, IndexEntry>>;
  /** Source module text by repo-relative path (the bundled modules). */
  readSource: (rel: string) => string | undefined;
  /** Component source for the dynamic-site scan. */
  componentSources: Array<{ rel: string; text: string }>;
  siteRecord: SiteRecordEntry[];
  resolvers: ResolverTable;
  /** Component → schema `tokens:` block (category → token names). */
  schemaTokens: Record<string, Record<string, string[]>>;
  typeContract: TypeContract;
}

export interface BuildResult {
  contract?: NameContract;
  errors: string[];
}

const componentOf = (rel: string): string => {
  const m = /^src\/components\/core\/([^/]+)\//.exec(rel);
  return m ? m[1] : `shared:${rel}`;
};

export const OWN_INDEX_ROUTE = 'This is a component defect, not a consumer gap — route to Lina (Stemma components). It never reaches a consumer report.';

export function ownIndexFailure(name: string, usedBy: string[], via: string): string {
  return (
    `name-contract OWN-INDEX CHECK: '${name}' is referenced by ${usedBy.join(', ') || '(unattributed)'} (${via}) ` +
    `but is not defined in DesignerPunk's own generated web CSS (${DESIGN_TOKENS_CSS_REL} + ${COMPONENT_TOKENS_CSS_REL}). ${OWN_INDEX_ROUTE}`
  );
}

export function buildNameContract(inp: BuildInputs): BuildResult {
  const errors: string[] = [];
  const refs = extractBundleReferences(inp.bundle);
  const ours = new Map<string, string>([
    ...parseCssDefinitions(inp.designTokensCss),
    ...parseCssDefinitions(inp.componentTokensCss),
  ]);
  const designDefs = parseCssDefinitions(inp.designTokensCss);
  const componentDefs = parseCssDefinitions(inp.componentTokensCss);
  const ctRefs = cssVarReferences(inp.componentTokensCss);
  const tiers = buildTierIndex(inp.indexDocs);

  // ── 1. bundle ⊆ src, and per-component attribution ───────────────────────
  const modules = bundleModules(inp.bundle);
  if (modules.length === 0) errors.push(`name-contract: ${BUNDLE_REL} declares no source modules (esbuild module comments missing) — cannot attribute or cross-check. Refusing to build.`);
  const usedBy = new Map<string, Set<string>>();
  const selfDefined = new Map<string, Set<string>>();
  for (const rel of modules) {
    const text = inp.readSource(rel);
    if (text === undefined) {
      errors.push(`name-contract: bundled module ${rel} is not on disk — the bundle is stale; rebuild (npm run build:browser).`);
      continue;
    }
    const sn = sourceNames(rel, text);
    for (const n of sn.referenced) (usedBy.get(n) ?? usedBy.set(n, new Set()).get(n)!).add(componentOf(rel));
    for (const n of sn.defined) (selfDefined.get(n) ?? selfDefined.set(n, new Set()).get(n)!).add(componentOf(rel));
  }
  const bundleNames = new Set([...refs.varNames, ...refs.literalNames]);
  for (const n of [...bundleNames].sort()) {
    if (!usedBy.has(n)) {
      errors.push(`name-contract bundle ⊆ src: '${n}' is in ${BUNDLE_REL} but in no bundled source module — esbuild synthesized or interpolated it. Refusing to build.`);
    }
  }
  if (refs.interpolatedVarSites > 0) {
    // Not an error by itself: every such site must be a recorded dynamic site (step 2).
  }

  // ── 2. dynamic sites: scan vs record ──────────────────────────────────────
  const scanned = scanDynamicSites(inp.componentSources);
  const recorded = new Map(inp.siteRecord.map((r) => [siteKey(r), r]));
  const scannedKeys = new Set(scanned.map(siteKey));
  for (const s of scanned) {
    if (!recorded.has(siteKey(s))) {
      errors.push(
        `name-contract UNRECORDED DYNAMIC SITE: ${s.file}:${s.line} \`${s.text}\` (pattern: ${s.patterns.join(', ')}) builds a token name at runtime and is not in SITE_RECORD (scripts/build-name-contract.ts). ` +
          `Record it with a disposition — (i) closed-ours, (ii) component-tier, (iii) consumer-supplied, or 'uncovered'. Refusing to build.`,
      );
    }
  }
  for (const [k, r] of recorded) {
    if (!scannedKeys.has(k)) errors.push(`name-contract STALE SITE RECORD: ${r.file} \`${r.text}\` #${r.occurrence ?? 1} is recorded but no longer found by the scan — update SITE_RECORD.`);
  }

  // ── 3. collect names by disposition ───────────────────────────────────────
  const via = new Map<string, Set<string>>();
  const addVia = (n: string, v: string) => (via.get(n) ?? via.set(n, new Set()).get(n)!).add(v);
  for (const n of refs.varNames) addVia(n, 'bundle var()');
  for (const n of refs.literalNames) addVia(n, 'bundle literal');
  for (const n of ctRefs) {
    addVia(n, `${COMPONENT_TOKENS_CSS_REL} var()`);
    for (const [def, value] of componentDefs) {
      if (value.includes(`var(${n})`) || value.includes(`var(${n},`)) {
        const fam = tiers.get(def)?.family ?? def;
        (usedBy.get(n) ?? usedBy.set(n, new Set()).get(n)!).add(`${fam} component tokens`);
      }
    }
  }

  const excluded: ExcludedEntry[] = [];
  const notChecked: Array<{ component: string; site: string }> = [];
  const siteReports: DynamicSiteReport[] = [];
  const componentTierFromSites = new Set<string>();
  const scannedByKey = new Map(scanned.map((s) => [siteKey(s), s]));
  for (const r of inp.siteRecord) {
    const s = scannedByKey.get(siteKey(r));
    const dispositions: DynamicSiteReport['dispositions'] = [];
    for (const d of r.dispositions) {
      const names: string[] = [];
      const run = (ids: string[] | undefined) => {
        for (const id of ids ?? []) {
          const fn = inp.resolvers[id];
          if (!fn) {
            errors.push(`name-contract: SITE_RECORD names resolver '${id}', which does not exist.`);
            continue;
          }
          const res = fn();
          for (const n of res.names) {
            names.push(n);
            for (const c of res.suppliedBy?.[n] ?? [res.component]) (usedBy.get(n) ?? usedBy.set(n, new Set()).get(n)!).add(c);
          }
        }
      };
      if (d.class === 'closed') {
        run(d.resolvers);
        for (const n of names) addVia(n, `site ${r.component} (${d.resolvers?.join(', ')})`);
      } else if (d.class === 'component-tier') {
        run(d.resolvers);
        for (const n of names) componentTierFromSites.add(n);
      } else if (d.class === 'consumer-supplied') {
        excluded.push({ name: `site:${siteKey(r)}`, class: 'consumer-supplied', reason: `(iii) ${d.reason}`, usedBy: [r.component] });
        run(d.defaults);
        for (const n of names) addVia(n, `default for ${r.component}.${d.input}`);
      } else if (d.class === 'uncovered') {
        notChecked.push({ component: r.component, site: siteKey(r) });
      }
      dispositions.push({ ...d, ...(names.length ? { resolvedNames: [...new Set(names)].sort() } : {}) });
    }
    if (s) siteReports.push({ file: r.file, line: s.line, text: r.text, occurrence: r.occurrence ?? 1, patterns: s.patterns, component: r.component, dispositions });
  }

  // ── 4. classify every candidate: internal · component tier · OWN-INDEX · tier ─
  const referencedNames: ReferencedName[] = [];
  const candidates = new Set<string>([...via.keys(), ...componentTierFromSites]);
  for (const n of [...candidates].sort()) {
    const users = [...(usedBy.get(n) ?? [])].sort();
    const inOurs = ours.has(n);
    // Component-internal: the component defines/sets it itself (the `--_` convention and
    // JS-set properties like --chrome-offset). Not a token name; behind the component surface.
    if (!inOurs && (selfDefined.has(n) || refs.definedNames.has(n))) {
      excluded.push({
        name: n,
        class: 'component-tier',
        kind: 'component-internal',
        reason: '(ii) component-internal custom property — defined or set by the component itself (CSS declaration or setProperty), never a token name; it stays behind the component surface (DD17) and no consumer language can lack it',
        usedBy: users,
      });
      continue;
    }
    // OWN-INDEX CHECK (T2-L1): nothing that is not ours can enter the contract.
    if (!inOurs) {
      errors.push(ownIndexFailure(n, users, [...(via.get(n) ?? ['dynamic site (component tier)'])].join('; ')));
      continue;
    }
    const tier = tiers.get(n);
    if (!tier) {
      errors.push(`name-contract: '${n}' is defined in DesignerPunk's generated CSS but the token index cannot tier it — a generator/index defect, route to Ada (Rosetta tokens).`);
      continue;
    }
    if (tier.tier === 'component' || componentDefs.has(n)) {
      excluded.push({
        name: n,
        class: 'component-tier',
        kind: 'component-token',
        reason: `(ii) DesignerPunk component-tier token (${tier.token}) — stays behind the component surface (DD17); excluded by P1 (component NEVER)`,
        usedBy: users,
      });
      continue;
    }
    const value = resolveValue(n, designDefs) ?? ours.get(n)!;
    referencedNames.push({
      name: n,
      tier: tier.tier,
      token: tier.token,
      ...(tier.part ? { part: tier.part } : {}),
      value,
      usedBy: users,
      declaredUse: declaredUse(tier.token, users, inp.schemaTokens),
      via: [...(via.get(n) ?? [])].sort(),
    });
  }

  excluded.sort((a, b) => (a.class + a.name).localeCompare(b.class + b.name));
  if (errors.length) return { errors };
  const count = (k: NonNullable<ExcludedEntry['kind']> | 'consumer-supplied') =>
    excluded.filter((e) => (k === 'consumer-supplied' ? e.class === k : e.kind === k)).length;
  return {
    errors,
    contract: {
      schemaVersion: CONTRACT_SCHEMA_VERSION,
      note:
        'Spec 123 C7 name contract. Built from the compiled web surface (DD10); tier-filtered per P1 (semantic always · primitive yes · component never). ' +
        'sync reports referenced-but-absent names and never writes the consumer tier (Req 5A.2).',
      scope: 'web-surface names only — iOS/Android are out (Task 3.5 decision record; the native compilers are the stricter native name contract)',
      tierFilter: { semantic: 'always', primitive: 'yes', component: 'never' },
      counts: {
        bundleVarNames: refs.varNames.size,
        bundleVarNamesExcludingPrivate: [...refs.varNames].filter((n) => !n.startsWith('--_')).length,
        bundleLiteralNames: refs.literalNames.size,
        bundleInterpolatedVarSites: refs.interpolatedVarSites,
        componentTokensCssVarRefs: ctRefs.size,
        bundledModules: modules.length,
        dynamicSites: siteReports.length,
        referencedSemantic: referencedNames.filter((r) => r.tier === 'semantic').length,
        referencedPrimitive: referencedNames.filter((r) => r.tier === 'primitive').length,
        excludedComponentTier: count('component-token'),
        excludedComponentInternal: count('component-internal'),
        excludedConsumerSupplied: count('consumer-supplied'),
        notChecked: notChecked.length,
      },
      referencedNames,
      excluded,
      dynamicSites: siteReports.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line),
      notChecked,
      typeContract: inp.typeContract,
    },
  };
}

function declaredUse(token: string, users: string[], schemaTokens: Record<string, Record<string, string[]>>): string {
  const uses: string[] = [];
  for (const c of users) {
    const block = schemaTokens[c];
    if (!block) continue;
    for (const [category, list] of Object.entries(block)) {
      if (Array.isArray(list) && list.includes(token)) uses.push(`a ${category} token in ${c}'s schema`);
    }
  }
  return uses.length ? `declared as ${uses.join('; ')}` : 'referenced by the compiled component CSS (no schema tokens: declaration)';
}

// ─────────────────────────────────────────────────────────────────────────────
// I/O
// ─────────────────────────────────────────────────────────────────────────────

export function componentSourceFiles(root: string = PROJECT_ROOT): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
      const rel = `${dir}/${e.name}`;
      if (e.isDirectory()) {
        if (e.name === '__tests__' || e.name === 'node_modules') continue;
        walk(rel);
      } else if (/\.(ts|css)$/.test(e.name) && !/\.d\.ts$/.test(e.name) && !/\.test\.ts$/.test(e.name)) {
        out.push(rel);
      }
    }
  };
  walk('src/components');
  return out.sort();
}

function loadSchemaTokens(root: string): Record<string, Record<string, string[]>> {
  const out: Record<string, Record<string, string[]>> = {};
  const base = path.join(root, 'src/components/core');
  for (const c of fs.readdirSync(base)) {
    const f = path.join(base, c, `${c}.schema.yaml`);
    if (!fs.existsSync(f)) continue;
    const doc = yaml.load(fs.readFileSync(f, 'utf8')) as { tokens?: Record<string, string[]> } | undefined;
    if (doc?.tokens && typeof doc.tokens === 'object') out[c] = doc.tokens;
  }
  return out;
}

export function readBuildInputs(root: string = PROJECT_ROOT): BuildInputs {
  const read = (rel: string) => {
    const p = path.join(root, rel);
    if (!fs.existsSync(p)) throw new Error(`name-contract: ${rel} not found — build order is tsc → build:browser → build:name-contract (prebuild generates the token CSS).`);
    return fs.readFileSync(p, 'utf8');
  };
  return {
    bundle: read(BUNDLE_REL),
    designTokensCss: read(DESIGN_TOKENS_CSS_REL),
    componentTokensCss: read(COMPONENT_TOKENS_CSS_REL),
    indexDocs: loadIndexDocs(root),
    readSource: (rel) => {
      const p = path.join(root, rel);
      return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : undefined;
    },
    componentSources: componentSourceFiles(root).map((rel) => ({ rel, text: fs.readFileSync(path.join(root, rel), 'utf8') })),
    siteRecord: SITE_RECORD,
    resolvers: defaultResolvers(root),
    schemaTokens: loadSchemaTokens(root),
    typeContract: buildTypeContract(TYPE_CONTRACT_DTS_REL.map((rel) => ({ rel, text: read(rel) }))),
  };
}

export function serializeContract(c: NameContract): string {
  return `${JSON.stringify(c, null, 2)}\n`;
}

function main(): void {
  const result = buildNameContract(readBuildInputs(PROJECT_ROOT));
  if (!result.contract) {
    console.error(`✖ build-name-contract: ${result.errors.length} failure${result.errors.length === 1 ? '' : 's'}\n`);
    for (const e of result.errors) console.error(`  ✖ ${e}`);
    process.exit(1);
  }
  const out = path.join(PROJECT_ROOT, OUTPUT_REL);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, serializeContract(result.contract), 'utf8');
  const c = result.contract.counts;
  console.log(`Wrote ${OUTPUT_REL}`);
  console.log(`  referenced: ${c.referencedSemantic} semantic + ${c.referencedPrimitive} primitive`);
  console.log(`  excluded: ${c.excludedComponentTier} component-tier, ${c.excludedComponentInternal} component-internal, ${c.excludedConsumerSupplied} consumer-supplied site(s)`);
  console.log(`  dynamic sites: ${c.dynamicSites} recorded; not checked: ${c.notChecked}`);
  console.log(`  type contract: ${result.contract.typeContract.hash}`);
}

if (require.main === module) {
  main();
}
