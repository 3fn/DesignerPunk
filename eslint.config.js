/**
 * ESLint Flat Config — Spec 118 Task 4.2
 *
 * SCOPE DISCIPLINE: This is NOT a repo-wide ESLint adoption.
 * This config targets ONLY web component source (src/components/**).
 * The rest of the codebase has never been linted; a broad config would surface
 * massive noise from code that was never written with lint in mind. Extending
 * lint scope is a separate, future decision that Spec 118 does not own.
 *
 * PURPOSE: Module-resolution import-specifier rule (R10 AC3/AC4).
 * The rule is present, scoped to web source, wired to CI — and its POLARITY IS
 * NOW SET to the CJS branch (Task 9.4).
 *
 * POLARITY (resolved): Task 8 committed CJS-consistency, executed in-spec, so the
 * lint BANS explicit file extensions on relative imports (extensionless is the CJS
 * norm). The ESM branch (which would REQUIRE explicit `.js`) was not taken. The
 * scaffold was built polarity-deferred in Task 4.2; Task 9.4 set the polarity once
 * Task 8 decided the direction and Task 9.3 (3c) converged the surface to
 * extensionless — so the rule is green on activation and guards a future regression.
 *
 * Run: npm run lint
 * CI:  .github/workflows/consumer-guard.yml (lint step)
 *
 * @see Spec 118 Task 9.4 (R10 AC3/AC4 — polarity set to CJS; prove-it-bites test)
 * @see Spec 118 Task 4.2 (the polarity-deferred scaffold this activates)
 * @see Spec 118 Task 8 (the module-direction decision that unblocked polarity)
 * @see .github/workflows/consumer-guard.yml — the CI lane this attaches to
 */

// @ts-check

const tsParser = require('@typescript-eslint/parser');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  // -------------------------------------------------------------------------
  // Global ignores — everything NOT in web component source
  // This is the critical scope-discipline clause: ESLint will only process
  // files that match the `files` pattern in the rule config below.
  // Listing explicit ignores here is belt-and-suspenders to prevent accidental
  // repo-wide linting if the `files` clause is ever misread.
  // -------------------------------------------------------------------------
  {
    ignores: [
      // Everything outside src/components is out of scope
      'src/!(components)/**',
      'scripts/**',
      'bin/**',
      'dist/**',
      'node_modules/**',
      'tests/**',
      'application-mcp-server/**',
      'docs-mcp-server/**',
      'product-mcp-server/**',
      '*.js',
      '*.ts',
      '*.mjs',
      // Test and example files within src/components are also excluded
      'src/components/**/__tests__/**',
      'src/components/**/*.test.ts',
      'src/components/**/*.test.tsx',
      'src/components/**/*.spec.ts',
      'src/components/**/*.spec.tsx',
      'src/components/**/examples/**',
    ],
  },

  // -------------------------------------------------------------------------
  // Web component source — the ONLY target
  // -------------------------------------------------------------------------
  {
    // Scope: web component TypeScript source files only
    files: ['src/components/**/*.ts', 'src/components/**/*.tsx'],

    // Language options: TypeScript source, latest ECMAScript
    // @typescript-eslint/parser is required to parse TypeScript syntax.
    // Without it, ESLint's default Espree parser errors on TS keywords
    // (type aliases, interface, `as` casts, private class fields, etc.).
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    rules: {
      // -------------------------------------------------------------------
      // MODULE-RESOLUTION IMPORT-SPECIFIER RULE — POLARITY SET: CJS
      // Spec 118 Task 9.4 (R10 AC3/AC4) — activates the Task-4.2 scaffold.
      //
      // STATUS: ACTIVE. Task 8 committed CJS-consistency (executed in-spec), so
      // the polarity is the CJS branch: BAN explicit file extensions on relative
      // imports (extensionless is the norm under CJS/tsc — the ESM branch, which
      // would REQUIRE explicit `.js`, was not taken).
      //
      // SCOPE: web component source only (src/components/**, per the `files` clause
      // and ignores above). The 3c convergence (Task 9.3) already left this surface
      // at ZERO explicit-extension relative imports, so this rule is green on set
      // and guards a future regression. The dynamic-import arm is defense-in-depth
      // (R10 AC4) — legit lazy-loads resolve at build time via esbuild.
      //
      // ALLOWED extensions: only `.js|.ts|.mjs|.cjs` are banned. Asset imports
      // (`.json`, `.css`, `.svg`, …) are NOT module specifiers in this sense and
      // are intentionally not matched.
      //
      // PROVE-IT-BITES: src/components/__tests__/ExtensionLintPolicy.test.ts runs
      // this config via the ESLint API on positive/negative snippets — a relative
      // `import './y.ts'` reds; `'./y'` passes. The rule is verified to fire, not
      // assumed (Review: the scaffold was left inert/unverified).
      //
      // @see Spec 118 Task 9.4 (R10 AC3/AC4 — polarity set; prove-it-bites)
      // @see Spec 118 Task 9.3 (3c — the extensionless convergence this locks in)
      // -------------------------------------------------------------------
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'ImportDeclaration > Literal[value=/^\\.\\.?\\//][value=/\\.(js|ts|mjs|cjs)$/]',
          message:
            'CJS: do not use explicit file extensions on relative imports (extensionless is the norm).',
        },
        {
          // Dynamic import is an `ImportExpression` node under @typescript-eslint/parser
          // (NOT `CallExpression[callee.type="Import"]` — that was the scaffold's unverified
          // guess; the Task-9.4 prove-it-bites test caught it). The specifier is the direct
          // child Literal (ImportExpression.source).
          selector:
            'ImportExpression > Literal[value=/^\\.\\.?\\//][value=/\\.(js|ts|mjs|cjs)$/]',
          message:
            'CJS: do not use explicit file extensions on relative dynamic imports.',
        },
      ],
    },
  },
];
