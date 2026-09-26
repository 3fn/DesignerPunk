/**
 * @category evergreen
 * @purpose Resolve-guard: every CSS custom property the Input-Text family emits exists in
 *          the generated token index.
 *
 * Input-Text-{Base,Email,Password,PhoneNumber} build error/success/hover styling from
 * literal `var(--…)` strings embedded directly in their CSS-in-JS templates (not from a
 * token-name map like Container-Base, but the failure mode is the same: a literal that is
 * not a registered token's generated custom property resolves to nothing, and the style
 * fails silently). That shipped: `--color-error`, `--color-error-background` and
 * `--color-success-strong` were emitted across all four components, and
 * `--color-background-hover` in Input-Text-Password — none exist in generated CSS. See
 * `.kiro/issues/archive/2026-09-26-input-text-phantom-css-vars.md`.
 *
 * Oracle: the committed token index (`token-index/*.yaml`), whose `platforms.web` names are
 * the custom properties the web generator emits (DesignTokens.web.css / ComponentTokens.web.css).
 *
 * Bite (recorded in the PR): reintroduce `var(--color-error)` in any of the family's
 * `.browser.ts` / `.web.ts` files, or the bare `'color-error'` icon-color literal in
 * InputTextBase.web.ts → this suite goes red.
 *
 * `--color-background-hover` (Input-Text-Password's toggle-button hover background):
 * Peter ruled option (a) 2026-09-26 — wire the existing blend pattern (Button-Icon /
 * Chip-Base's `darkerBlend(surface, blend.hoverDarker)` computed via `getBlendUtilities()`
 * into a private, JS-set custom property). Done for `InputTextPassword.web.ts`
 * (`--_itp-hover-bg`, see KNOWN_JS_COMPUTED below — a JS-computed value is not a token
 * reference and can't be checked against the static index; a companion behavioral test,
 * `toggleButtonHoverBlend.test.ts`, verifies the actual computed value instead). It is
 * NOT done for `InputTextPassword.browser.ts`: that file is a standalone, zero-import
 * bundle by design (see its own header comment), and the blend utility depends on ~650
 * lines of real OKLCH/RGB color-space math (`src/blend/ColorSpaceUtils.ts` +
 * `ThemeAwareBlendUtilities.web.ts`) with no precedent anywhere in the repo for inlining
 * into a standalone bundle. That literal remains in KNOWN_DEFERRED, explicitly
 * allow-listed rather than silently exempted, so the guard still fails loudly if a NEW
 * unresolved literal is introduced anywhere in the family. See
 * `.kiro/issues/archive/2026-09-26-input-text-phantom-css-vars.md`.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const REPO_ROOT = path.resolve(__dirname, '../../../../..');
const INDEX_DIR = path.join(REPO_ROOT, 'token-index');

type IndexEntry = { platforms?: { web?: string } };

function loadIndex(file: string): Record<string, IndexEntry> {
  const doc = yaml.load(fs.readFileSync(path.join(INDEX_DIR, file), 'utf8')) as {
    tokens?: Record<string, IndexEntry>;
  };
  return doc.tokens ?? {};
}

const semantic = loadIndex('semantics.yaml');
const primitive = loadIndex('primitives.yaml');
const component = loadIndex('components.yaml');

/** Every custom property the generator emits for a registered token. */
const GENERATED_WEB_NAMES: Set<string> = new Set(
  [semantic, primitive, component]
    .flatMap(tokens => Object.values(tokens))
    .map(entry => entry.platforms?.web)
    .filter((web): web is string => typeof web === 'string')
);

/**
 * Deliberately deferred, known-unresolved literals (see file header). Each entry names the
 * exact file:name pair so a fix removes it here too — the guard then re-covers that literal.
 */
const KNOWN_DEFERRED: ReadonlyArray<{ file: string; name: string }> = [
  { file: 'src/components/core/Input-Text-Password/platforms/web/InputTextPassword.browser.ts', name: '--color-background-hover' }
];

/**
 * Custom properties that are intentionally NOT token references — their value is computed
 * in JS at render time (blend math) and written directly into the `<style>` block, so they
 * will never appear in `token-index/`. Each entry is named individually (not a `--_`-prefix
 * blanket exemption) so a future unrelated `--_…` typo still fails loudly here; the actual
 * correctness of each one is verified by its own behavioral test, named alongside it.
 */
const KNOWN_JS_COMPUTED: ReadonlyArray<{ file: string; name: string; verifiedBy: string }> = [
  {
    file: 'src/components/core/Input-Text-Password/platforms/web/InputTextPassword.web.ts',
    name: '--_itp-hover-bg',
    verifiedBy: 'Input-Text-Password/__tests__/toggleButtonHoverBlend.test.ts'
  }
];

const FAMILY_WEB_FILES = [
  'src/components/core/Input-Text-Base/platforms/web/InputTextBase.browser.ts',
  'src/components/core/Input-Text-Base/platforms/web/InputTextBase.web.ts',
  'src/components/core/Input-Text-Email/platforms/web/InputTextEmail.browser.ts',
  'src/components/core/Input-Text-Email/platforms/web/InputTextEmail.web.ts',
  'src/components/core/Input-Text-Password/platforms/web/InputTextPassword.browser.ts',
  'src/components/core/Input-Text-Password/platforms/web/InputTextPassword.web.ts',
  'src/components/core/Input-Text-PhoneNumber/platforms/web/InputTextPhoneNumber.browser.ts',
  'src/components/core/Input-Text-PhoneNumber/platforms/web/InputTextPhoneNumber.web.ts'
].filter(relPath => fs.existsSync(path.join(REPO_ROOT, relPath)));

/**
 * Composite-token category prefixes whose sub-properties (e.g. `--typography-input-font-size`,
 * `--motion-float-label-duration`) are generated by CSS expansion of a single composite index
 * entry (`typography.input` -> `--typography-input`, `motion.floatLabel` -> `--motion-float-label`)
 * and are therefore NOT individually resolvable against the index alone. This is a recorded,
 * repo-wide limitation (Container-Base issue § "Left open, deliberately", item 4) — not a defect
 * in this family. Excluded here so the guard stays targeted at the failure class it actually
 * catches (single-token literal `var(--…)` references, mainly `color-*`).
 */
const COMPOSITE_EXPANSION_PREFIXES = ['--typography-', '--motion-'];

/** Literal `var(--…)` custom-property references embedded in the family's web sources. */
function literalCssVarReads(): Array<{ file: string; name: string }> {
  const out: Array<{ file: string; name: string }> = [];
  for (const relPath of FAMILY_WEB_FILES) {
    const src = fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
    for (const m of src.matchAll(/var\(\s*(--[a-z0-9_-]+)\s*\)/g)) {
      const name = m[1];
      if (COMPOSITE_EXPANSION_PREFIXES.some(prefix => name.startsWith(prefix))) continue;
      out.push({ file: relPath, name });
    }
  }
  return out;
}

/**
 * Bare token-ish string literals passed as an icon `color` prop (createIconBase turns
 * `color` into `var(--${color})` when it isn't 'inherit' or a hex value) — these are the
 * same phantom-var risk in a different literal shape.
 */
function literalIconColorReads(): Array<{ file: string; name: string }> {
  const out: Array<{ file: string; name: string }> = [];
  for (const relPath of FAMILY_WEB_FILES) {
    const src = fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
    for (const m of src.matchAll(/color:\s*['"`](color-[a-z0-9-]+)['"`]/g)) {
      out.push({ file: relPath, name: `--${m[1]}` });
    }
  }
  return out;
}

describe('Input-Text family — emitted CSS custom properties resolve (resolve-guard)', () => {
  it('reads a non-trivial token index (the oracle is not empty)', () => {
    // A silently-empty oracle would make every membership check below vacuous.
    expect(Object.keys(semantic).length).toBeGreaterThan(100);
    expect(GENERATED_WEB_NAMES.size).toBeGreaterThan(300);
  });

  it('scans a non-trivial set of family web files', () => {
    expect(FAMILY_WEB_FILES.length).toBeGreaterThanOrEqual(6);
  });

  it('every literal var(--…) reference in the family resolves (deferred/JS-computed items allow-listed)', () => {
    const reads = literalCssVarReads();
    expect(reads.length).toBeGreaterThan(20);

    const isDeferred = (r: { file: string; name: string }) =>
      KNOWN_DEFERRED.some(d => d.file === r.file && d.name === r.name);
    const isJsComputed = (r: { file: string; name: string }) =>
      KNOWN_JS_COMPUTED.some(d => d.file === r.file && d.name === r.name);

    const unresolved = reads
      .filter(r => !GENERATED_WEB_NAMES.has(r.name))
      .filter(r => !isDeferred(r))
      .filter(r => !isJsComputed(r))
      .map(r => `${r.file}: ${r.name}`);
    expect(unresolved).toEqual([]);
  });

  it('the deferred + JS-computed allow-lists are exactly this known set (no silent growth)', () => {
    const reads = literalCssVarReads();
    const unresolvedIncludingAllowListed = reads
      .filter(r => !GENERATED_WEB_NAMES.has(r.name))
      .map(r => `${r.file}: ${r.name}`)
      .sort();
    const expected = [...KNOWN_DEFERRED, ...KNOWN_JS_COMPUTED]
      .map(d => `${d.file}: ${d.name}`)
      .sort();
    expect(unresolvedIncludingAllowListed).toEqual(expected);
  });

  it('every JS-computed allow-list entry names an existing behavioral-test file', () => {
    for (const entry of KNOWN_JS_COMPUTED) {
      const testPath = path.join(REPO_ROOT, 'src/components/core', entry.verifiedBy);
      expect(fs.existsSync(testPath)).toBe(true);
    }
  });

  it('every literal icon-color string in the family resolves', () => {
    const reads = literalIconColorReads();
    expect(reads.length).toBeGreaterThan(0);
    const unresolved = reads
      .filter(({ name }) => !GENERATED_WEB_NAMES.has(name))
      .map(({ file, name }) => `${file}: ${name}`);
    expect(unresolved).toEqual([]);
  });
});
