# Task 2 Summary: The birth event — `init`'s copy table and rewrite-by-resolution

**Date**: 2026-09-26
**Purpose**: Concise summary of Task 2 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Rewrote `init` to implement design.md's C1 copy table under Model B: it now refuses in a born, partial, or package-mode repo (reusing Task 1's birth detection and catalog strings, adding one new one for the born-repo case), and `--re-scaffold` lists every file it would re-add before writing. `src/types` and `src/components/core` are no longer copied (the consumer's own component root, `src/components/`, is created empty instead); the copied token tree is rewritten BY RESOLUTION rather than by string match, catching both under-rewrite (a loud, named error) and over-rewrite (a real `tsc --noEmit` arbiter). Both harnesses' MCP configs (Kiro and Claude Code) are emitted unconditionally. `designerpunk.manifest.json` is written last, with an `origin` per entry and zero entries for the consumer's own token tier. Terminal output ends with the sequenced restart line. Thurgood (2.6) corrected the three Integration Guide lines this behavior falsifies.

## Why It Matters

`init` is the birth event — once per design system, ever, under Model B. Getting its refusal semantics wrong lets a teammate's accidental re-run silently resurrect DesignerPunk's tokens into a repo whose founder deliberately deleted part of that language (the exact "ours flowing into theirs after birth" failure the whole spec exists to prevent). Getting the rewrite-at-copy wrong either breaks the consumer's `tsc` on day one (over-rewrite, the pre-implementation defect this task's arbiter now catches) or ships files with imports that resolve to nothing (under-rewrite). This task is the actual first-run experience every later onboarding artifact (the install doc, the starter specs, the persona trio runs) depends on being true.

## Key Changes

- `src/cli/init.ts`: Step 0 birth check + refusals; `src/types`/`src/components/core` copies removed; `src/components/` (empty + README) added; both targets' MCP config scaffolds; `ManifestBuilder` (written last); rewritten next-steps output.
- `src/cli/shared/transforms.ts`: `rewriteByResolution` — the four-row out-of-tier mapping table, the whole-tier intra-tree boundary, `UnmappedSpecifierError`.
- `src/cli/shared/errorCatalog.ts`: five new `init`-specific catalog strings (born-repo refusal, restart line, clone hatch, personal-note naming, jest-config collision), extending Task 1's catalog rather than duplicating it.
- `src/types/index.ts`: `Oklch` exported from the public barrel.
- `src/cli/templates/mcp-config.json.template`: a stale `COMPONENTS_DIR` value (pointing at the now-removed `src/components/core`) found and fixed.
- New tests: `src/cli/__tests__/transforms.test.ts`, `src/cli/__tests__/init.overRewriteArbiter.test.ts` (a real, non-mocked `tsc --noEmit` run); `src/cli/__tests__/init.test.ts` substantially rewritten for the new refusal/copy/manifest/next-steps behavior.
- `governance/DesignerPunk-Integration-Guide.md`: L202/L454/L576 corrected (Thurgood, 2.6); the remaining `src/components/core` grep hits dispositioned (platform paths → Task 19.4; two hits correctly reference the package's own unchanged tree).

## Impact

- Closes out U1's `init` behavior — the birth event is now refusal-safe, and the copied token tree is provably resolvable both ways (under- and over-rewrite).
- One live, flagged-not-fixed issue carried forward: both targets' MCP approval lists still come from the pre-123 static template, which over-approves `rebuild_index` (contradicting design.md's own `readOnlyHint: false` for it) — Task 4/C10's `readOnlyHint`-derived computation is the intended fix.
- One carried residual, unowned by any U1 task: `product-mcp-server/src/index.ts`'s `DEFAULT_COMPONENT_DIR` fallback constant is stale against the new `./src/components` convention (fallback-only path; the primary resolver is correct) — routed by the orchestrator.
- `contractHash` in the manifest ships empty, pending Task 6's type-contract build.
