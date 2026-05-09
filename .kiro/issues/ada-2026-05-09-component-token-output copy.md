# @3fn/core Feedback — Component Token Output Missing in tokenSource Mode

**Date**: 2026-05-09
**Version tested**: 11.3.1
**Agent**: Ada — token development, pipeline integration
**Severity**: Medium — tokens register correctly but no platform output files generated

---

## Issue

When `tokenSource` is configured and `npx designerpunk generate` runs, the pipeline generates `DesignTokens.{web.css,ios.swift,android.kt}` but does NOT generate `ComponentTokens.{web.css,ios.swift,android.kt}`.

Component tokens are registered via `defineComponentTokens()` side effects (values resolve correctly, `npx designerpunk validate` passes), but no platform-specific output files are produced for them.

### Expected

Per Rosetta System Architecture doc ("Platform Output" section), `dist/` should contain:
```
dist/
├── DesignTokens.web.css        ✅ Generated
├── DesignTokens.ios.swift      ✅ Generated
├── DesignTokens.android.kt     ✅ Generated
├── ComponentTokens.web.css     ❌ Not generated
├── ComponentTokens.ios.swift   ❌ Not generated
└── ComponentTokens.android.kt  ❌ Not generated
```

### Actual

Only `DesignTokens.*` and DTCG/Figma JSON files are generated. No `ComponentTokens.*` files.

### Impact

- **Direct import consumers** (Lina's component code): Not affected. They import `NavHeaderAppTokens` directly and get resolved values.
- **CSS custom property consumers** (product CSS referencing `var(--navheaderapp-nav-button-padding-vertical)`): Affected. The custom properties don't exist in any generated file.
- **iOS/Android consumers** expecting `NavHeaderAppTokens.navButtonPaddingVertical` as a generated constant: Affected.

### Workaround

For this spec, Lina will consume tokens via direct import in the component's own CSS/implementation, not via generated custom properties. This works because Nav-Header-App owns these tokens — they're not consumed externally.

### Questions

1. Is component token output intentionally omitted in `tokenSource` mode? (Maybe it's a feature that hasn't been wired up yet for local source.)
2. Or is this a gap in the `generate` command that should be reported as a bug?
3. Does the package-mode pipeline (without `tokenSource`) generate `ComponentTokens.*` files? If so, this is a `tokenSource`-specific regression.

---

## Update: 11.3.2 Fixed Component Token Output

Component token output now generates correctly. 11.3.2 produces `ComponentTokens.{web.css,ios.swift,android.kt}` with all discovered component tokens.

**However**: The pipeline discovers component token files via `*.tokens.ts` glob pattern. A file named `tokens.ts` (without the component prefix) is NOT discovered. This is undocumented.

### Discovery Pattern

| Filename | Discovered? |
|----------|-------------|
| `nav-header-app.tokens.ts` | ✅ Yes |
| `avatar.tokens.ts` | ✅ Yes |
| `buttonIcon.tokens.ts` | ✅ Yes |
| `tokens.ts` | ❌ No — doesn't match `*.tokens.ts` glob |

### Suggestion

Document the naming requirement in the `defineComponentTokens` API docs or the init template. A developer creating `src/components/MyComponent/tokens.ts` (a reasonable name) will silently get no output with no error or warning.

Better: emit a warning when `componentTokens` directories contain `.ts` files that export `defineComponentTokens` calls but don't match the `*.tokens.ts` glob. This catches the "silent miss" case.
