# Task 3.1 Completion: Update Init to Scaffold Test Config Files

**Date**: 2026-05-10
**Task**: 3.1 Update init to scaffold test config files
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `src/cli/init.ts` (updated) — Scaffolds `jest.config.js` and `tsconfig.test.json`, updated Next steps

---

## Implementation Details

### Scaffolded Files

**jest.config.js**:
```javascript
module.exports = {
  ...require('@3fn/core/jest-preset'),
  roots: ['<rootDir>/src'],
};
```

**tsconfig.test.json**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "downlevelIteration": true,
    "types": ["jest", "node"]
  },
  "include": ["src/**/*"]
}
```

### Updated Console Output

Next steps now includes:
- Step 3: `npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom`
- Step 5: `npx jest` (run component tests)

### Key Decision

Uses `createFileIfNotExists` — won't overwrite if developer already has a `jest.config.js` or `tsconfig.test.json`. Consistent with all other init scaffolding behavior.

---

## Validation (Tier 2: Standard)

- ✅ Init test: 6/6 passing
- ✅ Full suite: 331 suites, 8358 tests passing
- ✅ Req 4.1: Init creates `jest.config.js` extending preset
- ✅ Req 4.2: Init creates `tsconfig.test.json` with required options
- ✅ Req 4.3: tsconfig includes all specified compiler options
- ✅ Req 4.4: Init does NOT modify package.json dependencies
- ✅ Req 4.5: Console output lists 4 required devDependencies
