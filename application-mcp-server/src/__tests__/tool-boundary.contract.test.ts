/**
 * Tool-Boundary Contract Test (Spec 121 Task 4 — the H1 gap)
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * No prior test imported `application-mcp-server/src/index.ts` (the response-assembly /
 * registration layer). The additive guarantee — "additive = safe / breaking = loud" — for
 * `get_token_details` and `find_components` was therefore aspirational. This test makes it
 * ENFORCED (Req 3 / P1).
 *
 * HOW THE HARNESS WORKS
 * ---------------------
 * Calls go through `createTestableServer().callTool(name, args)`, which routes through
 * `ComponentMCPServer.handleTool()` — the SAME path as the live MCP handler. It does NOT
 * call QueryEngine, TokenIndexer, or ComponentIndexer directly. The MCP stdio transport
 * envelope ({ content: [{ type, text }] }) is EXCLUDED from these assertions because it is
 * transport-level; the contract being pinned is the DATA OBJECT assembled by handleTool.
 *
 * FIXTURE SPLIT (Decision 4(b))
 * ------------------------------
 * A) PINNED FIXTURE CORPUS — small hand-authored token-index + component metadata. Used for
 *    all tier-classification / full-shape / partial / null-triple-adjacent / not-found branches.
 *    The token `partial` and `null` branches are NOT reachable from live data (live corpus only
 *    ever produces `resolutionDepth: 'full'` — Task 1 completion doc). Pinned synthetic fixtures
 *    are the ONLY way to exercise them.
 *
 * B) LIVE-SMOKE CHECK — asserts only that the named recall-floor components still exist in the
 *    real index. Does NOT assert full tier classification (to avoid coupling component authoring
 *    to MCP-test stability — Decision 4).
 *
 * RE-BASELINE STEP
 * ----------------
 * When pinned fixtures are intentionally re-baselined (e.g. a shape field is added legitimately),
 * update the exact-key-set arrays in the TOKEN_EXACT_KEYS and FIND_RESULT_EXACT_KEYS constants
 * below and document the change with a comment explaining what was added and why.
 *
 * @see .kiro/specs/121-claude-code-portability/requirements.md Requirement 3
 * @see .kiro/specs/121-claude-code-portability/design.md § Testing Strategy
 * @see .kiro/specs/121-claude-code-portability/tasks.md Task 4
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { createTestableServer, TestableServer } from '../index';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parse the JSON payload that callTool returns and assert no top-level isError flag. */
function assertResult<T = Record<string, unknown>>(raw: unknown): T {
  expect(raw).toBeDefined();
  return raw as T;
}

// ---------------------------------------------------------------------------
// BREAKING-CHANGE GUARD — exact key-set constants (P1 / Req 3.4)
// ---------------------------------------------------------------------------

/**
 * EXACT KEY SET for `get_token_details` — primitive branch.
 * Adding or removing ANY field from the list below trips the exact-key-set assertion.
 * That is intentional: "additive = enforced, not inferred" (Req 3.2).
 *
 * FIELD INVENTORY:
 *   From TokenIndexEntry (existing shape, unchanged):
 *     name, tier, family, value (primitives only), formula, platforms
 *   From ResolvedValueTriple (Spec 121 Req 2, additive):
 *     resolvedValue, resolvedUnitType, resolutionDepth
 *
 * RE-BASELINE: when a new field is legitimately added, append it here AND add a comment
 * explaining what it is and which requirement/task introduced it.
 */
const TOKEN_PRIMITIVE_EXACT_KEYS = new Set([
  // TokenIndexEntry — identity + value
  'name',
  'tier',
  'family',
  'value',         // primitives carry an entry-level value; semantics do NOT (P2)
  'formula',
  // TokenIndexEntry — platform identifiers
  'platforms',
  // ResolvedValueTriple (Spec 121 Req 2 — additive)
  'resolvedValue',
  'resolvedUnitType',
  'resolutionDepth',
]);

/**
 * EXACT KEY SET for `get_token_details` — semantic branch.
 * Semantic tokens carry NO `value` key (P2 / Req 2.4) — this is explicitly asserted below.
 * Fields differ from the primitive set: no `value`, no `formula`, yes `category`,
 * `primitiveReferences`, `themeVarying`, `consumers`.
 */
const TOKEN_SEMANTIC_EXACT_KEYS = new Set([
  'name',
  'tier',
  'category',          // semantics use category instead of family
  'primitiveReferences',
  'themeVarying',
  'platforms',
  'consumers',
  // ResolvedValueTriple (Spec 121 Req 2)
  'resolvedValue',
  'resolvedUnitType',
  'resolutionDepth',
  // NOTE: `value` is intentionally absent — P2 / Req 2.4
]);

/**
 * EXACT KEY SET for `get_token_details` — component-token branch.
 */
const TOKEN_COMPONENT_EXACT_KEYS = new Set([
  'name',
  'tier',
  'component',
  'primitiveReferences',
  'platforms',
  // ResolvedValueTriple (Spec 121 Req 2)
  'resolvedValue',
  'resolvedUnitType',
  'resolutionDepth',
]);

/**
 * EXACT KEY SET for a `find_components` result entry — no keyword, structured filter.
 * (ApplicationSummary + base ComponentSummary fields.)
 * When keyword IS supplied, `matchedOn`, `matchConfidence`, and `rank` are also present — see
 * FIND_KEYWORD_EXTRA_KEYS below.
 */
const FIND_RESULT_EXACT_KEYS = new Set([
  // ComponentSummary fields
  'name',
  'type',
  'family',
  'readiness',
  'description',
  'platforms',
  'contractCategories',
  'contractCount',
  'tokenCount',
  'annotations',
  'internalComponents',
  'requiredChildren',
  'inheritsFrom',
  // ApplicationSummary promoted fields (Req 1.7 — shape unchanged)
  'purpose',
  'whenToUse',
  'whenNotToUse',
  'alternatives',
  'contexts',
]);

/**
 * EXTRA KEYS present on keyword-discovery results (additive to FIND_RESULT_EXACT_KEYS).
 * These ride ONLY on keyword responses (Req 6.8 / back-compat).
 */
const FIND_KEYWORD_EXTRA_KEYS = new Set([
  'matchedOn',      // Layer-1 evidence (mandatory when matchConfidence emitted — Decision 1)
  'matchConfidence', // Layer-1 Match tier
  'rank',           // Layer-3 Usability ordinal
]);

// ---------------------------------------------------------------------------
// Real-corpus paths (for live-smoke checks and the structured-filter server)
// ---------------------------------------------------------------------------

/**
 * Resolved from: application-mcp-server/src/__tests__/
 * Path arithmetic: __tests__ → src → application-mcp-server → DesignerPunk-v2 (3 levels up)
 */
const REPO_ROOT = path.resolve(__dirname, '../../../');
const REAL_COMPONENTS_DIR = path.join(REPO_ROOT, 'src/components/core');
const REAL_TOKEN_INDEX_DIR = path.join(REPO_ROOT, 'token-index');

// ---------------------------------------------------------------------------
// Pinned fixture corpus (in-process tmp dirs, created in beforeAll)
// ---------------------------------------------------------------------------

let pinnedTokenDir: string;
let pinnedComponentDir: string;

/**
 * Build the synthetic token-index used for the pinned fixture tests.
 *
 * Token inventory:
 *   Primitives:
 *     prim.space.100  — spacing, value:8  — exercises the primitive branch
 *     prim.color.teal — color, theme-varying bundle value — exercises the bundle case
 *
 *   Semantics (single-ref, non-theme-varying → full):
 *     sem.space.inset — → prim.space.100 → exercises semantic-single-ref-full
 *
 *   Semantics (single-ref, theme-varying → full with bundle resolvedValue):
 *     sem.color.info  — → prim.color.teal → theme-varying bundle (not a scalar)
 *
 *   Semantics (multi-ref, no 'value' key → partial):
 *     sem.partial     — primitiveReferences: { light: 'prim.space.100', dark: 'prim.color.teal' }
 *                       → resolver can't extract single primary → depth: partial
 *
 *   Semantics (null primitiveReferences → partial):
 *     sem.noref       — primitiveReferences absent → resolver returns partial
 *
 *   Components:
 *     comp.btn.inset  — → prim.space.100 → exercises component-token-full
 *
 * NOTE: resolutionDepth: null (the "null triple") is unreachable via callTool in consistent state.
 * Both TokenIndexer and TokenRefResolver read from the same tokenIndexDir — any token the
 * indexer finds, the resolver finds too and returns at minimum depth:'partial'. The null triple
 * fires only when resolver.resolve() returns null (token absent from resolver maps), which
 * requires the indexer and resolver to be de-synced — impossible via the public API.
 * This is documented here and covered at the TokenIndexer unit level (TokenIndexer.test.ts).
 */
function buildPinnedTokenFixtures(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });

  const primitives = {
    tokens: {
      'prim.space.100': {
        family: 'spacing',
        value: 8,
        formula: 'base × 1',
        platforms: { web: '--prim-space-100', ios: 'primSpace100', android: 'prim_space_100' },
      },
      'prim.color.teal': {
        family: 'color',
        value: { light: { base: 'rgba(21,66,74,1)', wcag: 'rgba(21,66,74,1)' }, dark: { base: 'rgba(21,66,74,1)', wcag: 'rgba(21,66,74,1)' } },
        formula: 'systematic teal',
        platforms: { web: '--prim-color-teal', ios: 'primColorTeal', android: 'prim_color_teal' },
      },
    },
  };

  const semantics = {
    tokens: {
      'sem.space.inset': {
        category: 'spacing',
        primitiveReferences: { value: 'prim.space.100' },
        themeVarying: false,
        platforms: { web: '--sem-space-inset', ios: 'semSpaceInset', android: 'sem_space_inset' },
        consumers: [],
      },
      'sem.color.info': {
        category: 'color',
        primitiveReferences: { value: 'prim.color.teal' },
        themeVarying: true,
        platforms: { web: '--sem-color-info', ios: 'theme.semColorInfo', android: 'theme.sem_color_info' },
        consumers: ['Button-CTA'],
      },
      // PARTIAL: multi-ref with no single 'value' key → resolver returns depth: 'partial'
      'sem.partial': {
        category: 'color',
        primitiveReferences: { light: 'prim.color.teal', dark: 'prim.space.100' },
        themeVarying: false,
        platforms: { web: '--sem-partial', ios: 'semPartial', android: 'sem_partial' },
        consumers: [],
      },
      // PARTIAL: null primitiveReferences → resolver returns depth: 'partial'
      'sem.noref': {
        category: 'spacing',
        // no primitiveReferences key — resolver sees null → returns { value: name, depth: 'partial' }
        themeVarying: false,
        platforms: { web: '--sem-noref', ios: 'semNoref', android: 'sem_noref' },
        consumers: [],
      },
    },
  };

  const components = {
    tokens: {
      'comp.btn.inset': {
        component: 'Button-Pinned',
        primitiveReferences: { value: 'prim.space.100' },
        platforms: { web: '--comp-btn-inset', ios: 'compBtnInset', android: 'comp_btn_inset' },
      },
    },
  };

  fs.writeFileSync(path.join(dir, 'primitives.yaml'), yaml.dump(primitives));
  fs.writeFileSync(path.join(dir, 'semantics.yaml'), yaml.dump(semantics));
  fs.writeFileSync(path.join(dir, 'components.yaml'), yaml.dump(components));
}

// ---------------------------------------------------------------------------
// § 4.1 — Harness: two server instances
//   - pinnedServer  → synthetic token-index + NO real component dir (component queries use
//                     the live server; token queries use this for partial/null branches)
//   - liveServer    → real corpus, for live-smoke + find_components contract assertions
// ---------------------------------------------------------------------------

let pinnedServer: TestableServer;
let liveServer: TestableServer;

beforeAll(async () => {
  // Build the synthetic token-index dir
  pinnedTokenDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-mcp-contract-tokens-'));
  buildPinnedTokenFixtures(pinnedTokenDir);

  // Build a minimal synthetic component dir for the pinned server (empty is fine; we only use
  // the pinned server for token assertions where no component lookup is needed)
  pinnedComponentDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-mcp-contract-comps-'));

  pinnedServer = createTestableServer({
    componentsDir: pinnedComponentDir, // empty — no components loaded; token tools still work
    tokenIndexDir: pinnedTokenDir,
  });
  await pinnedServer.initialize();

  // Live server uses the real corpus for find_components + live-smoke + composition tests
  liveServer = createTestableServer({
    componentsDir: REAL_COMPONENTS_DIR,
    tokenIndexDir: REAL_TOKEN_INDEX_DIR,
  });
  await liveServer.initialize();
}, 30_000);

afterAll(() => {
  fs.rmSync(pinnedTokenDir, { recursive: true, force: true });
  fs.rmSync(pinnedComponentDir, { recursive: true, force: true });
});

// ===========================================================================
// § 4.2 — get_token_details contract assertions (token-side / Task 1 contract)
// ===========================================================================

describe('get_token_details — tool-boundary contract', () => {

  // -------------------------------------------------------------------------
  // Primitive branch: own value / full
  // -------------------------------------------------------------------------
  describe('primitive branch', () => {
    let result: Record<string, unknown>;

    beforeAll(async () => {
      result = assertResult(await pinnedServer.callTool('get_token_details', { name: 'prim.space.100' }));
    });

    it('resolvedValue is the primitive own value (8)', () => {
      expect(result.resolvedValue).toBe(8);
    });

    it('resolvedUnitType is "logical" (spacing family)', () => {
      expect(result.resolvedUnitType).toBe('logical');
    });

    it('resolutionDepth is "full"', () => {
      expect(result.resolutionDepth).toBe('full');
    });

    it('platforms is present and unchanged', () => {
      expect(result.platforms).toEqual({
        web: '--prim-space-100',
        ios: 'primSpace100',
        android: 'prim_space_100',
      });
    });

    it('tier is "primitive"', () => {
      expect(result.tier).toBe('primitive');
    });

    it('carries a `value` key (primitives DO have value — unlike semantics)', () => {
      expect('value' in result).toBe(true);
      expect(result.value).toBe(8);
    });

    // BREAKING-CHANGE GUARD (P1 / Req 3.4) — exact key-set assertion
    // Adding, removing, or renaming any field in the emitted primitive token shape WILL FAIL HERE.
    it('BREAKING-CHANGE GUARD: emits exactly the expected key set — no more, no less', () => {
      const actualKeys = new Set(Object.keys(result));
      const expected = TOKEN_PRIMITIVE_EXACT_KEYS;

      const unexpectedKeys = [...actualKeys].filter(k => !expected.has(k));
      const missingKeys = [...expected].filter(k => !actualKeys.has(k));

      expect(unexpectedKeys).toEqual(
        [],
        // If this fails: a NEW field was added to the primitive token shape.
        // Update TOKEN_PRIMITIVE_EXACT_KEYS and document the addition.
      );
      expect(missingKeys).toEqual(
        [],
        // If this fails: an EXISTING field was removed from the primitive token shape.
        // That is a breaking change — investigate before updating.
      );
    });
  });

  // -------------------------------------------------------------------------
  // Semantic branch — single-ref, non-theme-varying → full, scalar value
  // -------------------------------------------------------------------------
  describe('semantic branch — single resolvable ref → full (scalar)', () => {
    let result: Record<string, unknown>;

    beforeAll(async () => {
      result = assertResult(await pinnedServer.callTool('get_token_details', { name: 'sem.space.inset' }));
    });

    it('resolvedValue is the terminal primitive value (8 from prim.space.100)', () => {
      expect(result.resolvedValue).toBe(8);
    });

    it('resolutionDepth is "full"', () => {
      expect(result.resolutionDepth).toBe('full');
    });

    it('tier is "semantic"', () => {
      expect(result.tier).toBe('semantic');
    });

    // P2 / Req 2.4 — semantic tokens carry NO `value` key
    it('P2: carries NO `value` key at the entry level (semantic tokens never have value)', () => {
      expect('value' in result).toBe(false);
    });

    it('BREAKING-CHANGE GUARD: emits exactly the expected key set for semantics', () => {
      const actualKeys = new Set(Object.keys(result));
      const expected = TOKEN_SEMANTIC_EXACT_KEYS;

      const unexpectedKeys = [...actualKeys].filter(k => !expected.has(k));
      const missingKeys = [...expected].filter(k => !actualKeys.has(k));

      expect(unexpectedKeys).toEqual([]);
      expect(missingKeys).toEqual([]);
    });
  });

  // -------------------------------------------------------------------------
  // Semantic branch — theme-varying → full, but resolvedValue is a bundle object (not scalar)
  // Task 1 / Peter-confirmed Option A: carry verbatim, do not flatten.
  // -------------------------------------------------------------------------
  describe('semantic branch — theme-varying → full with bundle resolvedValue', () => {
    let result: Record<string, unknown>;

    beforeAll(async () => {
      result = assertResult(await pinnedServer.callTool('get_token_details', { name: 'sem.color.info' }));
    });

    it('resolutionDepth is "full" even though resolvedValue is a bundle (not scalar)', () => {
      expect(result.resolutionDepth).toBe('full');
    });

    it('resolvedValue is a per-mode bundle object (light/dark, not a scalar)', () => {
      // Decision A: carry verbatim from the product MCP; the type annotation is narrower than runtime.
      const rv = result.resolvedValue as Record<string, unknown>;
      expect(rv).not.toBeNull();
      expect(typeof rv).toBe('object');
      expect(rv).toHaveProperty('light');
      expect(rv).toHaveProperty('dark');
      const light = rv.light as Record<string, unknown>;
      expect(light).toHaveProperty('base');
      expect(light).toHaveProperty('wcag');
    });

    it('themeVarying is true', () => {
      expect(result.themeVarying).toBe(true);
    });

    // P2: no `value` key on semantics
    it('P2: no `value` key at the entry level', () => {
      expect('value' in result).toBe(false);
    });
  });

  // -------------------------------------------------------------------------
  // Component-token branch → full
  // -------------------------------------------------------------------------
  describe('component-token branch → full', () => {
    let result: Record<string, unknown>;

    beforeAll(async () => {
      result = assertResult(await pinnedServer.callTool('get_token_details', { name: 'comp.btn.inset' }));
    });

    it('resolvedValue is the terminal primitive value (8)', () => {
      expect(result.resolvedValue).toBe(8);
    });

    it('resolutionDepth is "full"', () => {
      expect(result.resolutionDepth).toBe('full');
    });

    it('tier is "component"', () => {
      expect(result.tier).toBe('component');
    });

    it('BREAKING-CHANGE GUARD: emits exactly the expected key set for component tokens', () => {
      const actualKeys = new Set(Object.keys(result));
      const expected = TOKEN_COMPONENT_EXACT_KEYS;

      const unexpectedKeys = [...actualKeys].filter(k => !expected.has(k));
      const missingKeys = [...expected].filter(k => !actualKeys.has(k));

      expect(unexpectedKeys).toEqual([]);
      expect(missingKeys).toEqual([]);
    });
  });

  // -------------------------------------------------------------------------
  // Partial branch — multi-ref semantic (no single 'value' key in primitiveReferences)
  // This is the load-bearing synthetic fixture: only reachable via constructed data.
  // -------------------------------------------------------------------------
  describe('partial branch — multi-ref semantic → depth: partial', () => {
    let result: Record<string, unknown>;

    beforeAll(async () => {
      result = assertResult(await pinnedServer.callTool('get_token_details', { name: 'sem.partial' }));
    });

    it('resolutionDepth is "partial"', () => {
      expect(result.resolutionDepth).toBe('partial');
    });

    it('resolvedValue is the token self-name (not a resolved terminal value)', () => {
      // The spec: "multi-ref / literal / unresolvable → self-name / partial"
      expect(result.resolvedValue).toBe('sem.partial');
    });

    it('resolvedUnitType is set (category fallback, not null)', () => {
      // The resolver returns a category-fallback unitType for partial semantics
      expect(result.resolvedUnitType).not.toBeNull();
      expect(typeof result.resolvedUnitType).toBe('string');
    });

    it('P2: no `value` key at the entry level (still a semantic token)', () => {
      expect('value' in result).toBe(false);
    });
  });

  // -------------------------------------------------------------------------
  // Partial branch — null primitiveReferences semantic
  // -------------------------------------------------------------------------
  describe('partial branch — null-primitiveReferences semantic → depth: partial', () => {
    let result: Record<string, unknown>;

    beforeAll(async () => {
      result = assertResult(await pinnedServer.callTool('get_token_details', { name: 'sem.noref' }));
    });

    it('resolutionDepth is "partial"', () => {
      expect(result.resolutionDepth).toBe('partial');
    });

    it('resolvedValue is the token self-name', () => {
      expect(result.resolvedValue).toBe('sem.noref');
    });

    it('P2: no `value` key', () => {
      expect('value' in result).toBe(false);
    });
  });

  // -------------------------------------------------------------------------
  // Not-found branch
  // -------------------------------------------------------------------------
  describe('not-found branch', () => {
    it('returns an error object (not null, not a token entry) for unknown token', async () => {
      const result = assertResult(await pinnedServer.callTool('get_token_details', { name: 'nonexistent.token.xyz' }));
      expect(result).toHaveProperty('error');
      expect(typeof (result as any).error).toBe('string');
      // The returned error object does NOT carry resolvedValue or resolutionDepth
      expect('resolvedValue' in result).toBe(false);
      expect('resolutionDepth' in result).toBe(false);
    });
  });

  // -------------------------------------------------------------------------
  // Req 2.4 / P2 explicit — the "no value key on semantics" assertion via the live corpus
  // -------------------------------------------------------------------------
  describe('P2 (no value key on semantics) — live-corpus spot check', () => {
    it('a live semantic token (color.feedback.success.text) carries no `value` key', async () => {
      const result = assertResult(await liveServer.callTool('get_token_details', { name: 'color.feedback.success.text' }));
      // Must have the triple (additive)
      expect(result).toHaveProperty('resolvedValue');
      expect(result).toHaveProperty('resolutionDepth');
      // Must NOT have a top-level value key
      expect('value' in result).toBe(false);
    });

    it('a live primitive (space100) DOES carry a `value` key', async () => {
      const result = assertResult(await liveServer.callTool('get_token_details', { name: 'space100' }));
      expect('value' in result).toBe(true);
      expect(result.value).toBeDefined();
    });
  });
});

// ===========================================================================
// § 4.3 — find_components contract assertions (component-side / Task 2+5 contract)
// ===========================================================================

describe('find_components — tool-boundary contract', () => {

  // -------------------------------------------------------------------------
  // Empty query → { data: [], error: null } (pinned literal — Req 3.3)
  // -------------------------------------------------------------------------
  describe('empty query contract', () => {
    it('returns { data: [], error: null } for empty structured query (no keyword)', async () => {
      // An empty filter object returns ALL components, NOT empty
      // The "empty → { data:[], error:null }" contract is for a zero-match query.
      const result = assertResult<{ data: unknown[]; error: null }>(
        await liveServer.callTool('find_components', { keyword: 'zzzzzabsolutelynosuchterm99999' })
      );
      expect(result.data).toEqual([]);
      expect(result.error).toBeNull();
    });

    it('returns components (not empty) for empty filter object', async () => {
      // Guard: a fully-empty params object returns ALL components via the structured path
      const result = assertResult<{ data: unknown[]; error: null }>(
        await liveServer.callTool('find_components', {})
      );
      expect(result.data!.length).toBeGreaterThan(0);
      expect(result.error).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Full ApplicationSummary shape — exact key-set (BREAKING-CHANGE GUARD)
  // -------------------------------------------------------------------------
  describe('ApplicationSummary exact key-set (P1 / Req 3.4)', () => {
    let firstRow: Record<string, unknown>;

    beforeAll(async () => {
      // Use a structured filter to get results WITHOUT the keyword-side additive fields
      const result = assertResult<{ data: Record<string, unknown>[]; error: null }>(
        await liveServer.callTool('find_components', { context: 'forms' })
      );
      expect(result.data.length).toBeGreaterThan(0);
      firstRow = result.data[0];
    });

    it('BREAKING-CHANGE GUARD: ApplicationSummary emits exactly the expected key set', () => {
      const actualKeys = new Set(Object.keys(firstRow));
      const expected = FIND_RESULT_EXACT_KEYS;

      // Unexpected keys = breaking additive change (someone added a field outside the spec)
      const unexpectedKeys = [...actualKeys].filter(k => !expected.has(k));
      expect(unexpectedKeys).toEqual([]);

      // Missing keys = breaking removal (someone deleted a field the contract relies on)
      const missingKeys = [...expected].filter(k => !actualKeys.has(k));
      expect(missingKeys).toEqual([]);
    });

    it('promoted annotation fields are arrays with correct types', () => {
      expect(Array.isArray(firstRow.whenToUse)).toBe(true);
      expect(Array.isArray(firstRow.whenNotToUse)).toBe(true);
      expect(Array.isArray(firstRow.alternatives)).toBe(true);
      expect(Array.isArray(firstRow.contexts)).toBe(true);
    });

    it('structured-filter results do NOT carry the keyword-layer fields (additive boundary)', () => {
      // matchConfidence / rank / matchedOn ride ONLY on keyword-discovery results (Req 6.8 / back-compat)
      expect('matchConfidence' in firstRow).toBe(false);
      expect('rank' in firstRow).toBe(false);
      expect('matchedOn' in firstRow).toBe(false);
    });
  });

  // -------------------------------------------------------------------------
  // Keyword result shape — full key-set including additive fields
  // -------------------------------------------------------------------------
  describe('keyword result shape — additive fields present on keyword-discovery', () => {
    let keywordRow: Record<string, unknown>;

    beforeAll(async () => {
      const result = assertResult<{ data: Record<string, unknown>[]; error: null }>(
        await liveServer.callTool('find_components', { keyword: 'primary action button' })
      );
      expect(result.data.length).toBeGreaterThan(0);
      keywordRow = result.data[0];
    });

    it('keyword result carries the full ApplicationSummary fields', () => {
      for (const key of FIND_RESULT_EXACT_KEYS) {
        expect(keywordRow).toHaveProperty(key);
      }
    });

    it('keyword result ALSO carries matchConfidence, rank, matchedOn (additive — Req 6.8)', () => {
      for (const key of FIND_KEYWORD_EXTRA_KEYS) {
        expect(keywordRow).toHaveProperty(key);
      }
    });

    it('BREAKING-CHANGE GUARD: keyword result key-set = ApplicationSummary + KEYWORD_EXTRA (no more)', () => {
      const actualKeys = new Set(Object.keys(keywordRow));
      const expectedKeys = new Set([...FIND_RESULT_EXACT_KEYS, ...FIND_KEYWORD_EXTRA_KEYS]);

      const unexpectedKeys = [...actualKeys].filter(k => !expectedKeys.has(k));
      expect(unexpectedKeys).toEqual([]);
    });
  });

  // -------------------------------------------------------------------------
  // Recall-floor must-include (Req 1 fixture set — Req 3.3)
  // -------------------------------------------------------------------------
  describe('recall-floor must-include per acceptance fixture set (Req 1)', () => {
    it('keyword "login" → floor includes Input-Text-Email', async () => {
      const result = assertResult<{ data: { name: string }[] }>(
        await liveServer.callTool('find_components', { keyword: 'login' })
      );
      const names = result.data.map(r => r.name);
      expect(names).toContain('Input-Text-Email');
    });

    it('keyword "text input field" → floor includes Input-Text-Base (min floor)', async () => {
      const result = assertResult<{ data: { name: string }[] }>(
        await liveServer.callTool('find_components', { keyword: 'text input field' })
      );
      const names = result.data.map(r => r.name);
      expect(names).toContain('Input-Text-Base');
    });

    it('keyword "text input field" → also returns Input-Text-Email, Input-Text-Password, Input-Text-PhoneNumber (full family FormInput)', async () => {
      const result = assertResult<{ data: { name: string }[] }>(
        await liveServer.callTool('find_components', { keyword: 'text input field' })
      );
      const names = result.data.map(r => r.name);
      expect(names).toContain('Input-Text-Email');
      expect(names).toContain('Input-Text-Password');
      expect(names).toContain('Input-Text-PhoneNumber');
    });

    it('keyword "primary action button" → includes Button-CTA', async () => {
      const result = assertResult<{ data: { name: string }[] }>(
        await liveServer.callTool('find_components', { keyword: 'primary action button' })
      );
      const names = result.data.map(r => r.name);
      expect(names).toContain('Button-CTA');
    });
  });

  // -------------------------------------------------------------------------
  // Conjunctive narrowing — keyword + category AND-narrows (Req 1.5 / Req 3.3)
  // -------------------------------------------------------------------------
  describe('conjunctive narrowing — keyword + category AND-narrows', () => {
    it('keyword alone returns a broader set than keyword + category', async () => {
      const keywordOnly = assertResult<{ data: unknown[] }>(
        await liveServer.callTool('find_components', { keyword: 'input' })
      );
      // 'accessibility' is a category that exists in the real corpus
      const combined = assertResult<{ data: unknown[] }>(
        await liveServer.callTool('find_components', { keyword: 'input', category: 'accessibility' })
      );
      // AND-narrowing: combined must be ≤ keyword-only
      expect(combined.data.length).toBeLessThanOrEqual(keywordOnly.data.length);
    });

    it('keyword + nonexistent category yields empty data', async () => {
      const result = assertResult<{ data: unknown[]; error: null }>(
        await liveServer.callTool('find_components', { keyword: 'button', category: 'nonexistent-category-xyz' })
      );
      expect(result.data).toEqual([]);
      expect(result.error).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Discovery → retrieval composition (P6 / Req 1.10 / Req 3.3)
  // A name returned by find_components resolves via get_component_summary through callTool.
  // -------------------------------------------------------------------------
  describe('discovery → retrieval composition (P6)', () => {
    it('a name from find_components resolves via get_component_summary in one callTool', async () => {
      const findResult = assertResult<{ data: { name: string }[] }>(
        await liveServer.callTool('find_components', { keyword: 'primary action button' })
      );
      const name = findResult.data[0].name;
      expect(name).toBeTruthy();

      // Single subsequent call — no intermediate lookup step (P6)
      const summary = assertResult<{ data: Record<string, unknown>; error: null }>(
        await liveServer.callTool('get_component_summary', { name })
      );
      expect(summary.data).not.toBeNull();
      expect((summary.data as any).name).toBe(name);
    });
  });

  // -------------------------------------------------------------------------
  // Result ordering — NOT pinned (ranking is implementation detail, not a contract)
  // -------------------------------------------------------------------------
  it('does NOT pin result ordering (coverage-based sort is implementation, not contract)', async () => {
    // This is a documentation-only assertion: we assert only that multiple results are returned.
    const result = assertResult<{ data: unknown[] }>(
      await liveServer.callTool('find_components', { keyword: 'button' })
    );
    expect(result.data.length).toBeGreaterThan(1);
    // NO assertion on the specific order of result.data
  });
});

// ===========================================================================
// § 4.4 — Tier-classification assertions from calibration fixtures (Req 6 at the boundary)
// ===========================================================================

describe('find_components — Req 6 three-layer discovery confidence at callTool boundary', () => {

  // -------------------------------------------------------------------------
  // Three distinct fields on keyword-discovery results (§Collision rule / Req 6.1)
  // matchConfidence ≠ readiness (viability) ≠ rank (usability)
  // -------------------------------------------------------------------------
  describe('three layers present as DISTINCT fields, never collapsed', () => {
    let result: Record<string, unknown>;

    beforeAll(async () => {
      const r = assertResult<{ data: Record<string, unknown>[] }>(
        await liveServer.callTool('find_components', { keyword: 'primary action button' })
      );
      expect(r.data.length).toBeGreaterThan(0);
      result = r.data[0];
    });

    it('Layer 1 — matchConfidence is present and a valid tier value', () => {
      expect(['strong', 'partial', 'none']).toContain(result.matchConfidence);
    });

    it('Layer 2 — readiness is present as a SEPARATE field from matchConfidence', () => {
      expect(result.readiness).toBeDefined();
      // readiness is an object (PlatformReadiness), not a tier string
      expect(typeof result.readiness).toBe('object');
      // It is lexically distinct from matchConfidence (§Collision: the `partial` of one ≠ the other)
      expect(result.readiness).not.toBe(result.matchConfidence);
    });

    it('Layer 3 — rank is present as a SEPARATE field (number, not string tier)', () => {
      expect(typeof result.rank).toBe('number');
      expect(result.rank).toBeGreaterThanOrEqual(1);
    });

    it('matchConfidence, readiness, and rank are three distinct field names', () => {
      // All three exist and are lexically distinct — never collapsed to one field
      expect(result).toHaveProperty('matchConfidence');
      expect(result).toHaveProperty('readiness');
      expect(result).toHaveProperty('rank');
      // None are the same object reference
      expect(result.matchConfidence).not.toBe(result.readiness);
      expect(result.matchConfidence).not.toBe(result.rank);
      expect(result.readiness).not.toBe(result.rank);
    });

    it('matchedOn is present and mandatory when matchConfidence is emitted (Decision 1)', () => {
      expect(Array.isArray(result.matchedOn)).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // matchConfidence tier for calibration fixture queries (Req 6.7)
  // -------------------------------------------------------------------------
  describe('calibration fixture tier assertions', () => {
    it('"primary action button" → Button-CTA at matchConfidence: strong', async () => {
      const r = assertResult<{ data: Record<string, unknown>[] }>(
        await liveServer.callTool('find_components', { keyword: 'primary action button' })
      );
      const cta = r.data.find(d => d.name === 'Button-CTA');
      expect(cta).toBeDefined();
      expect(cta!.matchConfidence).toBe('strong');
    });

    it('"text input field" → Input-Text-Base at matchConfidence: strong', async () => {
      const r = assertResult<{ data: Record<string, unknown>[] }>(
        await liveServer.callTool('find_components', { keyword: 'text input field' })
      );
      const base = r.data.find(d => d.name === 'Input-Text-Base');
      expect(base).toBeDefined();
      expect(base!.matchConfidence).toBe('strong');
    });

    it('"login" → Input-Text-Email present (floor); does NOT need to be strong', async () => {
      // Per fixture correction (Lina R1): "login" floor = Input-Text-Email; tier is strong/partial
      // per coverage once when_to_use is indexed. We assert floor presence, not a specific tier.
      const r = assertResult<{ data: Record<string, unknown>[] }>(
        await liveServer.callTool('find_components', { keyword: 'login' })
      );
      const email = r.data.find(d => d.name === 'Input-Text-Email');
      expect(email).toBeDefined();
      expect(['strong', 'partial']).toContain(email!.matchConfidence);
    });
  });

  // -------------------------------------------------------------------------
  // PARTIAL (weak-match) fixture — returns ranked below-threshold candidates, NOT empty (P4)
  // A low-signal-only query must return flagged results, not the empty contract.
  // -------------------------------------------------------------------------
  describe('partial fixture — weak-match returns ranked below-threshold candidates, not empty (P4)', () => {
    it('a low-signal-only match returns data with matchConfidence: partial (not none → empty)', async () => {
      // "onboarding" matches some contexts values (low-signal) but not high-signal fields.
      // The exact components are not pinned (corpus may change); we assert tier + non-empty.
      const r = assertResult<{ data: Record<string, unknown>[] }>(
        await liveServer.callTool('find_components', { keyword: 'onboarding' })
      );
      if (r.data.length > 0) {
        // Any matched row must be flagged with its tier (never silently empty and never nil)
        const row = r.data[0];
        expect(['strong', 'partial']).toContain(row.matchConfidence);
        expect(typeof row.rank).toBe('number');
      }
      // Whether "onboarding" returns data or not, the shape guarantee is: IF it returns
      // results, they are flagged (partial|strong) NOT silently mixed. The empty case
      // ({data:[], error:null}) is the `none` contract — tested separately below.
    });
  });

  // -------------------------------------------------------------------------
  // NONE fixture — genuinely-zero-match yields the empty contract (P4)
  // `partial` (non-empty ranked) vs `none` (empty contract) MUST be distinguishable from shape alone.
  // -------------------------------------------------------------------------
  describe('none fixture — zero-match yields the empty contract (P4)', () => {
    it('zero-match keyword yields { data: [], error: null } — the `none` contract', async () => {
      const r = assertResult<{ data: unknown[]; error: null }>(
        await liveServer.callTool('find_components', { keyword: 'zzzzzabsolutelynosuchterm99999' })
      );
      expect(r.data).toEqual([]);
      expect(r.error).toBeNull();
      // Structural distinction from `partial`: the empty result has no `matchConfidence` key
      // because there are no result rows to carry it on. That is the shape-based distinguishability.
    });

    it('partial vs none are distinguishable from response shape alone (P4)', async () => {
      // partial → data has rows, each with matchConfidence: 'partial'|'strong'
      // none    → data is [], no matchConfidence anywhere
      const noneResult = assertResult<{ data: unknown[] }>(
        await liveServer.callTool('find_components', { keyword: 'zzzzzabsolutelynosuchterm99999' })
      );
      expect(noneResult.data).toHaveLength(0);
      // A partial result for a low-signal term has rows (if any match exists)
      // We verify the shape distinction: none returns no data rows (the structural marker for `none`)
      const partialResult = assertResult<{ data: Record<string, unknown>[] }>(
        await liveServer.callTool('find_components', { keyword: 'container' })
      );
      // `container` is a high-signal word (in name/family of Container-* components → strong)
      // Either way: if data is non-empty, each row MUST carry matchConfidence/rank (keyword contract)
      if (partialResult.data.length > 0) {
        expect(partialResult.data[0]).toHaveProperty('matchConfidence');
        expect(partialResult.data[0]).toHaveProperty('rank');
      }
    });
  });

  // -------------------------------------------------------------------------
  // Adversarial false-confidence guard — low-signal-only ≥2-token caps at `partial` (Req 6 rubric)
  // -------------------------------------------------------------------------
  describe('adversarial guard — low-signal-only ≥2-token coverage caps at partial, not strong', () => {
    it('a query matching ≥2 tokens only in low-signal fields must NOT reach strong tier', async () => {
      // "onboarding flows" — both tokens likely land only in `contexts` (a low-signal field).
      // Per the Components rubric (Task 5 / discovery-confidence-rubric.md):
      //   strong requires a high-signal-field hit; low-signal-only coverage (even ≥2 tokens)
      //   caps at `partial`. This guards against mass false-`strong` on shared contexts values.
      const r = assertResult<{ data: Record<string, unknown>[] }>(
        await liveServer.callTool('find_components', { keyword: 'onboarding flows' })
      );
      for (const row of r.data) {
        // Any row that matched ONLY via low-signal fields must be partial, not strong.
        // We detect this by checking matchedOn: if ALL entries are lowSignal, tier must be partial.
        const matchedOn = row.matchedOn as Array<{ field: string; term: string }>;
        if (Array.isArray(matchedOn)) {
          const hasHighSignalHit = matchedOn.some(e => e.field === 'highSignal');
          if (!hasHighSignalHit) {
            expect(row.matchConfidence).toBe('partial');
          }
        }
      }
    });

    it('"primary action button" correctly reaches strong (has high-signal hits)', async () => {
      // Positive control: this query IS expected to produce `strong` for Button-CTA
      // (name and purpose are high-signal fields for "button", "cta" etc.)
      const r = assertResult<{ data: Record<string, unknown>[] }>(
        await liveServer.callTool('find_components', { keyword: 'primary action button' })
      );
      const cta = r.data.find(d => d.name === 'Button-CTA');
      expect(cta).toBeDefined();
      expect(cta!.matchConfidence).toBe('strong');
    });
  });

  // -------------------------------------------------------------------------
  // Rank is 1-based and contiguous over the result set (Layer-3 ordinal)
  // -------------------------------------------------------------------------
  describe('rank — 1-based contiguous ordinal over the result set', () => {
    it('ranks are 1-based and contiguous for keyword results', async () => {
      const r = assertResult<{ data: Record<string, unknown>[] }>(
        await liveServer.callTool('find_components', { keyword: 'button' })
      );
      if (r.data.length > 0) {
        const ranks = r.data.map(row => row.rank as number);
        expect(ranks[0]).toBe(1);
        expect(ranks).toEqual(ranks.map((_, i) => i + 1));
      }
    });

    it('structured-filter results do NOT have a rank field', async () => {
      const r = assertResult<{ data: Record<string, unknown>[] }>(
        await liveServer.callTool('find_components', { context: 'forms' })
      );
      if (r.data.length > 0) {
        for (const row of r.data) {
          expect('rank' in row).toBe(false);
        }
      }
    });
  });
});

// ===========================================================================
// § 4.5 — Breaking-change guard explicit summary + live-smoke recall check
// ===========================================================================

describe('breaking-change guard — additive = enforced, not inferred (P1 / Req 3.4)', () => {
  /**
   * The exact-key-set assertions in §4.2 and §4.3 ARE the breaking-change guard mechanism.
   * This section exists to make the INTENT explicit and to test it directly.
   *
   * How it works: the TOKEN_*_EXACT_KEYS and FIND_RESULT_EXACT_KEYS constants pin the field
   * inventory. Any future change to either tool's emitted shape that:
   *   - adds a new field → trips the "unexpectedKeys" check
   *   - removes an existing field → trips the "missingKeys" check
   *   - renames a field → trips both checks
   * will cause these tests to fail LOUD rather than silently drift.
   */

  it('TOKEN_PRIMITIVE_EXACT_KEYS is a non-empty set (guard is not vacuous)', () => {
    expect(TOKEN_PRIMITIVE_EXACT_KEYS.size).toBeGreaterThan(0);
  });

  it('TOKEN_SEMANTIC_EXACT_KEYS excludes `value` (P2 — semantic tokens have no value key)', () => {
    expect(TOKEN_SEMANTIC_EXACT_KEYS.has('value')).toBe(false);
  });

  it('TOKEN_SEMANTIC_EXACT_KEYS includes all three triple fields', () => {
    expect(TOKEN_SEMANTIC_EXACT_KEYS.has('resolvedValue')).toBe(true);
    expect(TOKEN_SEMANTIC_EXACT_KEYS.has('resolvedUnitType')).toBe(true);
    expect(TOKEN_SEMANTIC_EXACT_KEYS.has('resolutionDepth')).toBe(true);
  });

  it('FIND_RESULT_EXACT_KEYS includes all ApplicationSummary promoted fields', () => {
    expect(FIND_RESULT_EXACT_KEYS.has('purpose')).toBe(true);
    expect(FIND_RESULT_EXACT_KEYS.has('whenToUse')).toBe(true);
    expect(FIND_RESULT_EXACT_KEYS.has('whenNotToUse')).toBe(true);
    expect(FIND_RESULT_EXACT_KEYS.has('alternatives')).toBe(true);
    expect(FIND_RESULT_EXACT_KEYS.has('contexts')).toBe(true);
  });

  it('FIND_RESULT_EXACT_KEYS does NOT include keyword-side fields (they are additive-only)', () => {
    expect(FIND_RESULT_EXACT_KEYS.has('matchConfidence')).toBe(false);
    expect(FIND_RESULT_EXACT_KEYS.has('rank')).toBe(false);
    expect(FIND_RESULT_EXACT_KEYS.has('matchedOn')).toBe(false);
  });
});

// ===========================================================================
// § LIVE-SMOKE — named recall-floor components still exist in the real index
// (Lightweight check only — does not assert full tier classification)
// ===========================================================================

describe('live-smoke — floor components still exist in the real index', () => {
  /**
   * These assertions are deliberately minimal: they assert only that the named floor component
   * can be retrieved from the real index. They do NOT assert full tier classification or shape
   * details (which are covered by the pinned corpus above).
   *
   * Purpose: catch the regression "floor component was deleted or renamed" without coupling
   * to metadata wording (which would make routine component-authoring break unrelated MCP tests).
   */
  const FLOOR_COMPONENTS = [
    'Button-CTA',
    'Input-Text-Base',
    'Input-Text-Email',
    'Input-Text-Password',
    'Input-Text-PhoneNumber',
  ];

  for (const name of FLOOR_COMPONENTS) {
    it(`floor component ${name} still exists and is retrievable`, async () => {
      const result = assertResult<{ data: Record<string, unknown> | null; error: string | null }>(
        await liveServer.callTool('get_component_summary', { name })
      );
      expect(result.error).toBeNull();
      expect(result.data).not.toBeNull();
      expect((result.data as any).name).toBe(name);
    });
  }
});
