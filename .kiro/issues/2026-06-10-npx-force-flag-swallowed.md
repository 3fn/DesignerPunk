# Issue: npx Doesn't Pass --force to CLI in Some Environments

**Date**: 2026-06-10
**Severity**: Medium — workaround available, UX regression for non-TTY users
**Version**: @3fn/core 12.0.2, npm 10+, Node 22

---

## Problem

`npx designerpunk sync --force` doesn't pass `--force` to the CLI in non-TTY environments (Kiro CLI, CI). The flag is swallowed by npx. Direct invocation works: `node node_modules/@3fn/core/bin/designerpunk.js sync --force`.

## Likely Cause

npm 10+ / npx behavior change: npx may interpret `--force` as its own flag (npm's `--force` means "override safety checks"). In non-TTY where npx runs differently, it may strip recognized flags before passing to the script.

## Workaround (Documented)

Non-TTY environments should use direct invocation:
```bash
node node_modules/@3fn/core/bin/designerpunk.js sync --force
```

Or use the double-dash separator:
```bash
npx designerpunk -- sync --force
```

## Proper Fix Options

1. **Rename the flag**: Use `--apply-all` instead of `--force` (avoids collision with npm's `--force`)
2. **Add to package.json scripts**: Consumers add `"sync": "designerpunk sync"` to scripts, then `npm run sync -- --force`
3. **Detect and warn**: If sync detects non-TTY + no force flag, print the direct invocation command as guidance

## Recommendation

Option 3 (detect and warn) for immediate UX improvement. Option 1 (rename flag) for long-term — `--force` colliding with npm's own flag is a design smell. Consider `--apply-all` or `--overwrite` as the sync-specific flag name.
