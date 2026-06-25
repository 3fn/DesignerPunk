/**
 * ESLint Flat Config — Spec 118 Task 4.2
 *
 * SCOPE DISCIPLINE: This is NOT a repo-wide ESLint adoption.
 * This config targets ONLY web component source (src/components/**).
 * The rest of the codebase has never been linted; a broad config would surface
 * massive noise from code that was never written with lint in mind. Extending
 * lint scope is a separate, future decision that Spec 118 does not own.
 *
 * PURPOSE: Module-resolution import-specifier rule scaffold (R10 AC3).
 * The rule is present, scoped, and wired to CI — but its POLARITY IS DEFERRED.
 *
 * POLARITY GATE: The extension policy inverts depending on the module direction
 * committed in Task 8 (Group 9 / second tasks pass):
 *   - CJS-consistency → BANS explicit extensions (extensionless is the norm)
 *   - Native ESM      → REQUIRES explicit .js extension (Node strict-ESM)
 * Polarity is set in Group 9 after the Task 8 direction decision.
 * Until then the rule scaffold is INERT (no selectors → never triggers).
 *
 * Run: npm run lint
 * CI:  .github/workflows/consumer-guard.yml (lint step)
 *
 * @see Spec 118 Task 4.2 (R10 AC3 — static-lint tooling; polarity deferred to Group 9)
 * @see Spec 118 Task 8 (the module-direction decision that unblocks polarity)
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
      // MODULE-RESOLUTION IMPORT-SPECIFIER RULE SCAFFOLD
      // Spec 118 Task 4.2 — R10 AC3
      //
      // STATUS: INERT — polarity is DEFERRED (Group 9 / Task 8 decision gate)
      //
      // The rule is present here as a named scaffold so that:
      //   1. The tooling (ESLint + this config) exists and runs in CI
      //   2. The CI step already enforces the scoped target (web source only)
      //   3. Activating the rule is a one-line change once polarity is decided
      //
      // WHY INERT NOW: The extension policy inverts CJS↔ESM:
      //   - CJS-consistency: bans explicit extensions
      //   - Native ESM:      requires explicit .js
      // Setting the wrong polarity now would either produce false positives
      // (banning extensions in what turns out to be an ESM codebase) or false
      // negatives (requiring extensions in what turns out to be CJS). The
      // polarity is gated on the Task 8 direction decision (Group 9 deferred).
      //
      // TO ACTIVATE (Group 9 task, post-Task-8):
      //   CJS direction — replace this comment block with:
      //     'no-restricted-syntax': ['error',
      //       {
      //         selector: 'ImportDeclaration > Literal[value=/^\\.\\.?\\//][value=/\\.(js|ts|mjs|cjs)$/]',
      //         message: 'CJS: do not use explicit file extensions on relative imports.',
      //       },
      //       {
      //         selector: 'CallExpression[callee.type="Import"] > Literal[value=/^\\.\\.?\\//][value=/\\.(js|ts|mjs|cjs)$/]',
      //         message: 'CJS: do not use explicit file extensions on dynamic imports.',
      //       },
      //     ],
      //
      //   ESM direction — replace this comment block with:
      //     'no-restricted-syntax': ['error',
      //       {
      //         selector: 'ImportDeclaration > Literal[value=/^\\.\\.?\\//]:not([value=/\\.js$/]):not([value=/\\.mjs$/])',
      //         message: 'ESM: relative imports must use explicit .js extension.',
      //       },
      //       {
      //         selector: 'CallExpression[callee.type="Import"] > Literal[value=/^\\.\\.?\\//]:not([value=/\\.js$/]):not([value=/\\.mjs$/])',
      //         message: 'ESM: relative dynamic imports must use explicit .js extension.',
      //       },
      //     ],
      //
      // GATE: Do NOT set polarity until Task 8 commits a direction.
      // -------------------------------------------------------------------
      'no-restricted-syntax': [
        'error',
        // POLARITY DEFERRED — no selectors until Group 9 (Task 8 direction decision)
        // The rule is present but inert: zero selectors = never triggers.
        // See TO ACTIVATE instructions above.
      ],
    },
  },
];
