# @3fn/core Feedback — Lina (Stemma Component Specialist)

**Date**: 2026-05-10
**Context**: Using `@3fn/core@11.4.1` `readComponentCSS` utility from `@3fn/core/testing` subpath
**Agent**: Lina — component testing

---

## `@3fn/core/testing` Subpath Requires `moduleResolution: "bundler"`

**Issue**: Importing from `@3fn/core/testing` fails with `moduleResolution: "node"` in tsconfig:

```
TS2307: Cannot find module '@3fn/core/testing' or its corresponding type declarations.
```

The package uses the `exports` field to expose the `./testing` subpath, but TypeScript's classic `"node"` module resolution doesn't read `exports`. Only `"bundler"` or `"node16"` resolve it correctly.

**Impact**: A product developer following the preset's JSDoc (which only shows `jest.config.js` setup) will hit this error when they try to import `readComponentCSS` or any other utility from `@3fn/core/testing`.

**Fix**: The tsconfig template (my earlier item #4) should specify:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

Or if shipping a `tsconfig.test.json` that product repos extend, include this setting. It's the one non-obvious requirement for the subpath export to work.

**Workaround** (if `"node"` resolution must be kept): Add a `moduleNameMapper` in jest.config.js:

```javascript
moduleNameMapper: {
  '^@3fn/core/testing$': '@3fn/core/dist/testing/index.js',
}
```

But `"bundler"` is the cleaner solution — it's the modern default for non-Node-runtime TypeScript projects anyway.
