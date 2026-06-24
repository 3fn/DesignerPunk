# Inbound from Spec 121 (MCP Delivery-Layer Hardening) — for Spec 118

**Date**: 2026-06-23

121 hands 118 **no direct artifact** — they're orthogonal (delivery-layer hardening vs. runtime module resolution). Two framing notes only:

1. **Sequencing:** Specs 122 (agent generator) and 123 (consumer distribution) **follow 118**, not 121. 118 is the gating prerequisite for both.

2. **Risk framing:** 121 was a *clean additive* problem governed by a guard enforced by a contract test, and the discipline held end-to-end. 118 is the opposite shape — the **messy runtime-coupling** root cause (CJS↔ESM; consumer-authored `.ts` config loaded via raw `await import()` in `ConfigLoader.ts`, which breaks the documented theme-override workflow under strict ESM). 118 is the real test of whether the guarded-spec discipline extends to gnarly runtime problems, not just clean additive ones. Worth root-causing with the same "enforce the guard, don't point-fix" rigor 121 used.
