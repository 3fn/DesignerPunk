/**
 * Extension-Lint Polarity — PROVE-IT-BITES guard
 *
 * Spec 118 Task 9.4 (R10 AC3/AC4)
 *
 * The Task-4.2 ESLint scaffold shipped with its `no-restricted-syntax` rule INERT
 * (zero selectors). Task 9.4 set the polarity to the CJS branch — BAN explicit file
 * extensions on relative imports — once Task 8 committed CJS-consistency and Task 9.3
 * (3c) converged web source to extensionless. A green `npm run lint` proves the rule
 * does not red on today's source, but NOT that the rule actually fires. This test
 * closes that gap: it runs the REAL `eslint.config.js` via the ESLint API on synthetic
 * positive/negative snippets and asserts the rule bites (Review: "the scaffold's rule
 * was left inert/unverified — add a real positive/negative lint-bite check").
 *
 * Scope note: this test FILE lives under src/components/__tests__/, which the lint
 * config ignores (so it is not itself linted), but jest runs it under the standard
 * `npm test` and the consumer-guard CI lane.
 *
 * @see eslint.config.js — the rule under test (no-restricted-syntax, CJS polarity)
 * @see Spec 118 Task 9.4 (R10 AC3/AC4 — polarity set; prove-it-bites)
 * @see Spec 118 Task 9.3 (3c — the extensionless convergence this locks in)
 */

import { Linter } from 'eslint';
// The REAL shipped flat config (CJS module). We pull the actual web-source block —
// its `no-restricted-syntax` selectors and its TypeScript parser — and run snippets
// through the synchronous `Linter` API. (ESLint's async `lintText` loads the config
// file via dynamic import(), which jest's CJS VM rejects; `Linter.verify` does not,
// and reusing the real block's rules means we still test the SHIPPED selectors, not a mock.)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const eslintConfig = require('../../../eslint.config.js') as Array<{
  files?: string[];
  languageOptions?: Linter.LanguageOptions;
  rules?: Linter.RulesRecord;
}>;

const RULE = 'no-restricted-syntax';

// The web-source config block — the one that actually defines the extension-ban rule.
const webBlock = eslintConfig.find((b) => b.rules && b.rules[RULE]);
if (!webBlock) {
  throw new Error(
    `eslint.config.js has no block defining "${RULE}" — the Task 9.4 polarity is missing.`
  );
}

const linter = new Linter();

/**
 * Run a snippet through the project's real extension-ban rule and return the
 * `no-restricted-syntax` messages (the shipped CJS selectors).
 */
function extensionRuleHits(code: string): string[] {
  const messages = linter.verify(code, {
    languageOptions: webBlock!.languageOptions,
    rules: { [RULE]: webBlock!.rules![RULE] },
  });
  return messages.filter((m) => m.ruleId === RULE).map((m) => m.message);
}

describe('Extension-Lint Polarity — bite check (Spec 118 Task 9.4, CJS branch)', () => {
  it('BANS an explicit .ts extension on a relative static import', async () => {
    const hits = await extensionRuleHits(
      `import { x } from './y.ts';\nexport const a = x;\n`
    );
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0]).toMatch(/explicit file extensions on relative imports/i);
  });

  it('BANS an explicit .js extension on a relative static import', async () => {
    const hits = await extensionRuleHits(
      `import { x } from '../shared/y.js';\nexport const a = x;\n`
    );
    expect(hits.length).toBeGreaterThan(0);
  });

  it('BANS an explicit extension on a relative DYNAMIC import (defense-in-depth, R10 AC4)', async () => {
    const hits = await extensionRuleHits(
      `export async function load() { return import('./z.ts'); }\n`
    );
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0]).toMatch(/dynamic imports/i);
  });

  it('PASSES an extensionless relative static import (the CJS norm)', async () => {
    const hits = await extensionRuleHits(
      `import { x } from './y';\nexport const a = x;\n`
    );
    expect(hits).toHaveLength(0);
  });

  it('PASSES an extensionless relative dynamic import', async () => {
    const hits = await extensionRuleHits(
      `export async function load() { return import('./z'); }\n`
    );
    expect(hits).toHaveLength(0);
  });

  it('PASSES a bare (non-relative) specifier — out of scope', async () => {
    const hits = await extensionRuleHits(
      `import { x } from '@3fn/core/build';\nexport const a = x;\n`
    );
    expect(hits).toHaveLength(0);
  });

  it('ALLOWS asset extensions (.json/.css are not module-resolution specifiers)', async () => {
    // The rule bans only .js|.ts|.mjs|.cjs — asset imports keep their extension.
    const hits = await extensionRuleHits(
      `import data from './data.json';\nexport const a = data;\n`
    );
    expect(hits).toHaveLength(0);
  });
});
