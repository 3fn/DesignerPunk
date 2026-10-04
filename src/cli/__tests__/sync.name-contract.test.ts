/**
 * @category evergreen
 * @purpose Spec 123 Task 6 — `sync`'s name-contract check (Req 5A; design.md § "C7"
 * name contract; P1 ruled YES). Test id `sync.name-contract.test.ts`.
 *
 * - THE TIER FILTER (P1): removed semantic → reported; removed primitive → reported;
 *   a component-tier name → NOT reported (the check filters, it does not trust the file).
 * - Req 5A.5's bite recipe: remove a referenced name from the fixture consumer's
 *   generated CSS → the report names it → restore → clean.
 * - No generated web output → `cannot check`, never clean.
 * - The report strings are string-EQUAL to their catalog rows (one fixture).
 * - Report only: the consumer's token tier and generated CSS are byte-unchanged (5A.2).
 *
 * End to end through `runSync`, with a fake installed `@3fn/core` carrying a fixture
 * `dist/name-contract.json` and a consumer whose `designerpunk.config.ts` sets
 * `tokenSource` and `output`.
 */

import * as fs from 'fs';
import * as path from 'path';
import { runSync } from '../sync';
import { runInit } from '../init';
import { MANIFEST_FILE, parseManifest } from '../sync/Manifest';
import {
  checkNameContract,
  missingTokenMessage,
  cannotCheckMessage,
  notCheckedMessage,
  cleanMessage,
  SCOPE_MESSAGE,
  TIER_FILTER,
  readContractHash,
} from '../sync/NameContract';
import type { NameContractFile } from '../sync/NameContract';
import { createScratch, setupPackage, writeFile, dirHash, readText, REPO_ROOT } from './syncTestKit';
import { jestConfigModuleLoader } from '../../__tests__/helpers/configModuleLoader';

/** design.md § "Error Handling — the loud-failure catalog", transcribed verbatim. */
const DESIGN_ROWS = {
  'name contract — missing (A9)': (name: string, use: string, components: string, tierPath: string, value: string, dpName: string) =>
    `components now expect token '${name}' — ${use} (used by ${components}). Add it to your set in ${tierPath}. Your tokens are yours; DesignerPunk never adds to them. DesignerPunk's value, for reference: ${value} ('${dpName}' in DesignerPunk's language). See: install guide § "When sync reports a missing token".`,
  'name contract — cannot check': (outputDir: string) =>
    `cannot check the name contract — no generated web token output found at ${outputDir}. Run 'npx designerpunk generate' first. (This is not a clean report.)`,
};

const CONTRACT: NameContractFile = {
  schemaVersion: 1,
  referencedNames: [
    {
      name: '--color-structure-border',
      tier: 'semantic',
      token: 'color.structure.border',
      value: 'oklch(0.72 0.018 260)',
      usedBy: ['Container-Base', 'Container-Card-Base'],
      declaredUse: "declared as a color token in Container-Base's schema",
    },
    {
      name: '--space-100',
      tier: 'primitive',
      token: 'space100',
      value: '8px',
      usedBy: ['Chip-Base'],
      declaredUse: 'referenced by the compiled component CSS (no schema tokens: declaration)',
    },
    // A component-tier name planted in referencedNames: the CHECK must filter it (P1: never).
    {
      name: '--buttonicon-size-large',
      tier: 'component',
      token: 'buttonIcon.size.large',
      value: 'var(--size-300)',
      usedBy: ['Button-Icon'],
      declaredUse: 'fixture',
    },
  ],
  notChecked: [],
  typeContract: { hash: 'sha256:fixture', members: [] },
};

const ALL_DEFINED = ':root {\n  --color-structure-border: #ccc;\n  --space-100: 8px;\n  --buttonicon-size-large: 24px;\n}\n';

function consumer(opts: { css?: string | null; contract?: NameContractFile | null } = {}) {
  const scratch = createScratch('dp-namecontract-');
  setupPackage(scratch, {
    files: opts.contract === null ? {} : { 'dist/name-contract.json': JSON.stringify(opts.contract ?? CONTRACT, null, 2) },
  });
  writeFile(scratch, 'designerpunk.config.ts', "export default { name: 'Acme', abbreviation: 'AC', tokenSource: './src/tokens', output: './build/tokens' };\n");
  writeFile(scratch, 'src/tokens/semantic/ColorTokens.ts', 'export const mine = 1;\n');
  if (opts.css !== null) writeFile(scratch, 'build/tokens/DesignTokens.web.css', opts.css ?? ALL_DEFINED);
  return scratch;
}

const sync = (scratch: string) => runSync({ projectRoot: scratch, dryRun: true, isTTY: false, configLoader: jestConfigModuleLoader });
const without = (name: string) => ALL_DEFINED.split('\n').filter((l) => !l.includes(`${name}:`)).join('\n');

describe('sync — the name contract (Req 5A)', () => {
  let logSpy: jest.SpyInstance;
  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => logSpy.mockRestore());

  it('P1 filter constants: semantic ALWAYS · primitive YES · component NEVER', () => {
    expect(TIER_FILTER).toEqual({ semantic: true, primitive: true, component: false });
  });

  it('everything defined → clean, with its scope statement (5A.4)', async () => {
    const out = await sync(consumer());
    expect(out.nameContract!.status).toBe('clean');
    expect(out.nameContract!.lines).toEqual([cleanMessage('build/tokens'), SCOPE_MESSAGE]);
    expect(out.report).toContain(`   ${cleanMessage('build/tokens')}`);
  });

  it('TIER FILTER 1/3 — a removed SEMANTIC name → reported (string-equal to the catalog row)', async () => {
    const out = await sync(consumer({ css: without('--color-structure-border') }));
    expect(out.nameContract!.status).toBe('missing');
    const expected = DESIGN_ROWS['name contract — missing (A9)'](
      '--color-structure-border',
      "declared as a color token in Container-Base's schema",
      'Container-Base, Container-Card-Base',
      'src/tokens/semantic/',
      'oklch(0.72 0.018 260)',
      'color.structure.border',
    );
    expect(out.nameContract!.lines).toEqual([expected, SCOPE_MESSAGE]);
    expect(out.report).toContain(`   ${expected}`);
  });

  it('TIER FILTER 2/3 — a removed PRIMITIVE name → reported (P1: primitive YES), pointing at the primitive tier', async () => {
    const out = await sync(consumer({ css: without('--space-100') }));
    expect(out.nameContract!.status).toBe('missing');
    expect(out.nameContract!.lines[0]).toBe(
      DESIGN_ROWS['name contract — missing (A9)'](
        '--space-100',
        'referenced by the compiled component CSS (no schema tokens: declaration)',
        'Chip-Base',
        'src/tokens/',
        '8px',
        'space100',
      ),
    );
  });

  it('TIER FILTER 3/3 — a COMPONENT-tier name absent from her CSS → NOT reported (P1: component NEVER)', async () => {
    const out = await sync(consumer({ css: without('--buttonicon-size-large') }));
    expect(out.nameContract!.status).toBe('clean');
    expect(out.report.join('\n')).not.toContain('--buttonicon-size-large');
  });

  it("Req 5A.5 bite recipe: remove a referenced name from the fixture's generated CSS → named → restore → clean", async () => {
    const scratch = consumer();
    const cssPath = path.join(scratch, 'build/tokens/DesignTokens.web.css');
    fs.writeFileSync(cssPath, without('--color-structure-border'));
    expect((await sync(scratch)).nameContract!.lines[0]).toContain("components now expect token '--color-structure-border'");
    fs.writeFileSync(cssPath, ALL_DEFINED);
    expect((await sync(scratch)).nameContract!.status).toBe('clean');
  });

  it('no generated web output → `cannot check` (string-equal), NEVER clean', async () => {
    const out = await sync(consumer({ css: null }));
    expect(out.nameContract!.status).toBe('cannot-check');
    expect(out.nameContract!.lines).toEqual([DESIGN_ROWS['name contract — cannot check']('build/tokens')]);
    expect(out.report.join('\n')).not.toContain('name contract: clean');
  });

  it('REPORT ONLY (5A.2): the token tier and the generated CSS are byte-unchanged, even with --apply', async () => {
    const scratch = consumer({ css: without('--color-structure-border') });
    const tier = dirHash(scratch, 'src/tokens');
    const gen = dirHash(scratch, 'build');
    const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false, configLoader: jestConfigModuleLoader });
    expect(out.nameContract!.status).toBe('missing');
    expect(dirHash(scratch, 'src/tokens')).toEqual(tier);
    expect(dirHash(scratch, 'build')).toEqual(gen);
  });

  it('a component with an uncovered dynamic site carries the standing "not checked" line — never silently clean', async () => {
    const out = await sync(consumer({ contract: { ...CONTRACT, notChecked: [{ component: 'Chip-Base', site: 'x' }] } }));
    expect(out.nameContract!.lines).toEqual([cleanMessage('build/tokens'), notCheckedMessage('Chip-Base'), SCOPE_MESSAGE]);
    expect(notCheckedMessage('Chip-Base')).toBe('not checked: Chip-Base builds token names dynamically');
  });

  it('a package without dist/name-contract.json → cannot check, never clean', async () => {
    const out = await sync(consumer({ contract: null }));
    expect(out.nameContract!.status).toBe('cannot-check');
    expect(out.nameContract!.lines[0]).toMatch(/^cannot check the name contract — the installed package has no dist\/name-contract\.json/);
  });

  it('checkNameContract is pure over its inputs (no present-set → cannot-check with the catalog string)', () => {
    const r = checkNameContract(CONTRACT, null, { outputDirDisplay: 'dist', semanticTierPath: 's/', primitiveTierPath: 'p/' });
    expect(r.lines).toEqual([cannotCheckMessage('dist')]);
    expect(missingTokenMessage({ name: 'a', declaredUse: 'b', components: ['C', 'D'], tierPath: 'e', value: 'f', dpToken: 'g' })).toBe(
      DESIGN_ROWS['name contract — missing (A9)']('a', 'b', 'C, D', 'e', 'f', 'g'),
    );
  });

  it("contractHash (DD11): init records the installed package's type-contract hash — never '' when the package ships a contract", async () => {
    const scratch = createScratch('dp-namecontract-init-');
    fs.mkdirSync(path.join(scratch, '.git'));
    fs.mkdirSync(path.join(scratch, 'node_modules/@3fn'), { recursive: true });
    fs.symlinkSync(REPO_ROOT, path.join(scratch, 'node_modules/@3fn/core'), 'dir');
    const cwd = process.cwd();
    const exit = jest.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
    process.chdir(scratch);
    try {
      await runInit(['--name', 'Test', '--abbreviation', 'T']);
    } finally {
      process.chdir(cwd);
      exit.mockRestore();
    }
    const recorded = parseManifest(readText(scratch, MANIFEST_FILE)).contractHash;
    expect(recorded).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(recorded).toBe(readContractHash(REPO_ROOT));
  });
});
