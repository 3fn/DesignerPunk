# Application MCP `get_token_details` Reports Light Value as the Dark Value for Theme-Varying Tokens

**Date**: 2026-09-12
**Discovered by**: Ada (incidental, during the F4 WCAG remediation — verifying the new dark override via MCP)
**Domain**: Ada (token metadata resolution inside the Application MCP) · Thurgood interest (MCP accuracy / claims-vs-source class)
**Severity**: Medium — no runtime impact (platform outputs resolve correctly), but the MCP is the agents' source of truth and it is wrong for every theme-varying token
**Status**: Open

---

## Symptom

`get_token_details` returns `resolvedValue.dark.base` equal to the **light** value for every token with a Level 2 dark override. Example: `color.structure.canvas` — dark override to `gray400` has shipped since Spec 050, platforms resolve it correctly, but the MCP reports its dark value as white100. Same for the new `color.feedback.success.text` → green300 override (which is how this surfaced).

## Why it matters

This is the same claims-vs-source defect class the 2026-09-12 Spec 112 audit documents: a surface that *looks* authoritative serving stale data. An agent asking the MCP for a token's dark value gets the wrong answer and will reason (or author docs/specs) from it. Pre-existing — NOT caused by the F4 change.

## Likely shape

The MCP's token-details resolver composes `resolvedValue` without applying `darkSemanticOverrides` (Level 2) — mirroring the resolution path that `generateTokenFiles` / the new `SemanticColorContrast.test.ts` DO apply. Fix belongs wherever the Application MCP builds `resolvedValue`; a regression assertion should pin at least one known theme-varying token (canvas) to its overridden dark value.
