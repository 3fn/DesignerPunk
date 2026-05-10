# Design Document: Component Test Preset

**Date**: 2026-05-10
**Spec**: 105 - Component Test Preset
**Status**: Design Phase
**Dependencies**: None

---

## Overview

This design ships a Jest preset and shared test utilities from `@3fn/core` as pre-compiled JavaScript exports. Product repos extend the preset with one line and get a working test environment for web components. The implementation packages existing patterns — no new test infrastructure is invented.

---

## Architecture

### Package Export Structure

```
dist/
├── testing/
│   ├── jest-preset.js          ← @3fn/core/jest-preset
│   ├── index.js                ← @3fn/core/testing (utilities)
│   ├── index.d.ts              ← TypeScript declarations
│   ├── style-mock.js           ← CSS module mock (module.exports = '')
│   └── validators.js           ← Stemma validators re-export
└── ...existing dist/
```

### Consumer Setup

```
product-repo/
├── jest.config.js              ← one-line spread from preset
├── tsconfig.test.json          ← scaffolded by init
├── package.json                ← devDeps: jest, @types/jest, ts-jest, jest-environment-jsdom
└── src/
    └── components/core/
        └── MyComponent/__tests__/MyComponent.test.ts
```

---

## Components and Interfaces

### 1. Jest Preset (`src/testing/jest-preset.ts`)

```typescript
import * as path from 'path';

const styleMockPath = path.resolve(__dirname, 'style-mock.js');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '\\.d\\.ts$',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
  ],
  moduleNameMapper: {
    '\\.css$': styleMockPath,
  },
  testTimeout: 10000,
};
```

**Key decisions**:
- `testEnvironment: 'jsdom'` — product repos write predominantly DOM tests (differs from core's `node` default)
- `ts-jest` configured with `tsconfig: 'tsconfig.test.json'` — uses the scaffolded test-specific config
- `styleMockPath` resolved via `path.resolve(__dirname)` — stable regardless of consumer's project location

### 2. Style Mock (`src/testing/style-mock.ts`)

```typescript
module.exports = '';
```

One-liner. Mocks CSS imports for Jest (web components import CSS as strings for browser bundles).

### 3. Shared Test Utilities (`src/testing/index.ts`)

```typescript
/**
 * Register a custom element safely (no "already defined" errors).
 */
export function registerComponent(tagName: string, ComponentClass: CustomElementConstructor): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, ComponentClass);
  }
}

/**
 * Safely remove all child nodes from document.body without destroying
 * jsdom's custom element registry.
 */
export function cleanupDOM(): void {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
}

/**
 * Wait for Shadow DOM to attach to an element.
 * Required for async component initialization in jsdom.
 */
export async function waitForShadowDOM(
  element: HTMLElement,
  timeout: number = 1000
): Promise<void> {
  const startTime = Date.now();
  while (!element.shadowRoot) {
    if (Date.now() - startTime > timeout) {
      throw new Error(`Timeout waiting for shadow DOM on <${element.tagName.toLowerCase()}>`);
    }
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  await new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Create a component fixture: instantiate, set props, append to DOM.
 * Returns the element and a cleanup function.
 * Props are set via property assignment (not attributes) to support all types.
 */
export function createComponentFixture<T extends HTMLElement>(
  tagName: string,
  props?: Record<string, any>
): { element: T; cleanup: () => void } {
  if (typeof document === 'undefined') {
    throw new Error(
      `createComponentFixture requires a DOM environment.\n` +
      `Add this to the top of your test file:\n` +
      `  /** @jest-environment jsdom */`
    );
  }

  const element = document.createElement(tagName) as T;

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      (element as any)[key] = value;
    }
  }

  document.body.appendChild(element);

  return {
    element,
    cleanup: () => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    },
  };
}

/**
 * Set CSS custom properties on document.documentElement.
 */
export function setupTokenProperties(props: Record<string, string>): void {
  for (const [name, value] of Object.entries(props)) {
    document.documentElement.style.setProperty(name, value);
  }
}

/**
 * Remove CSS custom properties from document.documentElement.
 */
export function cleanupTokenProperties(props: Record<string, string>): void {
  for (const [name] of Object.entries(props)) {
    document.documentElement.style.removeProperty(name);
  }
}

/** Blend color properties needed for components using blend utilities. */
const BLEND_PROPERTIES: Record<string, string> = {
  '--color-action-primary': 'rgba(0, 240, 255, 1)',
  '--color-contrast-on-action': 'rgba(0, 0, 0, 1)',
  '--color-background': '#FFFFFF',
};

export function setupBlendColorProperties(): void {
  setupTokenProperties(BLEND_PROPERTIES);
}

export function cleanupBlendColorProperties(): void {
  cleanupTokenProperties(BLEND_PROPERTIES);
}
```

### 4. Stemma Validators Re-export (`src/testing/validators.ts`)

```typescript
export {
  StemmaComponentNamingValidator,
  validateComponentNaming,
  type NamingValidationResult,
} from '../validators/StemmaComponentNamingValidator';

export {
  StemmaTokenUsageValidator,
  validateTokenUsage,
  type TokenUsageValidationResult,
} from '../validators/StemmaTokenUsageValidator';

export {
  StemmaPropertyAccessibilityValidator,
  validatePropertyAccessibility,
  type AccessibilityValidationResult,
} from '../validators/StemmaPropertyAccessibilityValidator';
```

Consumers import via `@3fn/core/testing`:
```typescript
import { validateComponentNaming, validateTokenUsage } from '@3fn/core/testing';
```

### 5. Package.json Updates

```json
{
  "files": [
    "dist/",
    "dist/testing/",
    "src/"
  ],
  "exports": {
    "./jest-preset": {
      "require": "./dist/testing/jest-preset.js"
    },
    "./testing": {
      "import": "./dist/testing/index.js",
      "require": "./dist/testing/index.js",
      "types": "./dist/testing/index.d.ts"
    }
  }
}
```

The `require` condition on `jest-preset` is critical — Jest configs use `require()`, not `import`.

### 6. Init Scaffolding (`src/cli/init.ts`)

#### jest.config.js

```javascript
module.exports = {
  ...require('@3fn/core/jest-preset'),
  roots: ['<rootDir>/src'],
};
```

#### tsconfig.test.json

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

#### Console output after init

```
Your product "MyProduct" is ready.

Next steps:
  1. Set GITHUB_TOKEN env var (read:packages scope)
  2. npm install
  3. npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom
  4. npx designerpunk generate      # Generate platform tokens
  5. npx jest                        # Run component tests
```

---

## Build Integration

The `src/testing/` directory compiles to `dist/testing/` via the existing `tsc` build step. No separate build configuration needed — the existing `tsconfig.json` already compiles all of `src/` to `dist/`.

Verify: `dist/testing/jest-preset.js`, `dist/testing/index.js`, `dist/testing/index.d.ts`, `dist/testing/style-mock.js`, `dist/testing/validators.js` all exist after `npm run build`.

---

## Testing Strategy

### Unit Tests
- `src/testing/__tests__/utilities.test.ts`: Test each utility function (registerComponent, cleanupDOM, waitForShadowDOM, createComponentFixture, setupTokenProperties)
- Verify `createComponentFixture` throws when `document` is undefined

### Integration Tests
- Create a temp directory simulating a product repo
- Extend the preset, run a minimal test, verify it passes
- Verify CSS mock resolves correctly from the consumer's perspective

### Regression
- Core's existing 328 test suites continue passing (the new `src/testing/` directory doesn't interfere)
- The preset is for consumers, not for core itself (core keeps its own `jest.config.js`)

---

## Design Decisions

### Decision 1: Validators Bundled with Testing (Not Separate Subpath)

**Decision**: Ship Stemma validators as part of `@3fn/core/testing`, not a separate `@3fn/core/validators` subpath.

**Rationale**: Consumers who run `.stemma.test.ts` files already import from `@3fn/core/testing` for DOM utilities. Adding a second import path for validators adds cognitive load without benefit. The validators are lightweight (static analysis, no DOM dependency) and don't bloat the testing export meaningfully.

### Decision 2: `testEnvironment: 'jsdom'` Default

**Decision**: Product preset defaults to jsdom (unlike core's `node` default).

**Rationale**: Product repos write exclusively web component tests. Core has many non-DOM tests (token math, build validation, MCP tools) that benefit from the lighter `node` environment. Product repos don't have these — every test file would need the `@jest-environment jsdom` annotation without this default.

### Decision 3: Property Assignment in `createComponentFixture`

**Decision**: Props set via property assignment (`element[key] = value`), not attributes.

**Rationale**: Web Component props include functions, objects, and arrays that can't be serialized to HTML attributes. Property assignment is the universal mechanism. Attribute-based setting would only work for strings and booleans.
