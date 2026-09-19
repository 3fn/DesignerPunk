# Issue: Input-Text-Password Uses Hardcoded RGBA

**Date**: 2026-06-10
**Agent**: Lina
**Severity**: Low — cosmetic, not functional
**Component**: Input-Text-Password

---

## Problem

Two hardcoded `rgba(0, 0, 0, 0.05)` values remain in Input-Text-Password web implementations:

- `src/components/core/Input-Text-Password/platforms/web/InputTextPassword.browser.ts` (line 265)
- `src/components/core/Input-Text-Password/platforms/web/InputTextPassword.web.ts` (line 249)

Both are hover background fallback values.

## Fix

Replace with either:
- Token reference: `var(--color-structure-surface-secondary)` or appropriate semantic token
- OKLCH fallback: `oklch(0 0 0 / 0.05)`

Prefer token reference — a hardcoded value (even in OKLCH) bypasses the token system.
