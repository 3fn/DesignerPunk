# Task 5 Completion: Generation-Integrity Verification & End-to-End Re-Verification (R2 / R6)

**Date**: 2026-06-24
**Task**: 5. Generation-Integrity Verification & End-to-End Re-Verification (Parent)
**Type**: Parent / Architecture
**Validation**: Tier 3 — Comprehensive
**Agent**: Thurgood (verification harness + formalization) · Ada consulted (token interpretation) · main-loop verification (Claude)
**Status**: Complete — **trust gate MET; spec CERTIFIED non-provisionally (ratified by Peter 2026-06-24, contingent on appropriate testing — full suite 8969 + tsc green + trust gate verified two ways)**

---

## Summary

Finalized the repeatable `GenerationIntegrityCheck`, added the absolute correctness-property invariants (P3/P5) the re-diff cannot catch, built the R4 consumer-blast-radius regression tests, and ran the **documented-CLI trust gate** end-to-end. The documented CLI now reproduces the committed artifacts exactly, the full-inventory re-diff is all-equal, the invariants hold, and the Application MCP serves the corrected data.

## Task 5.1 — Verification finalized

- **`src/tools/integrity/Invariants.ts`** (new) — the absolute assertions the committed-vs-fresh re-diff is blind to (because committed == fresh and the defect, if any, is intrinsic to both):
  - **P3 (no legacy color format)** — `assertNoLegacyColorFormat`: the set of color primitives carrying `rgba(` must equal **exactly** the shadow allowlist (`shadowBlack/Blue/Orange/Gray100`); any other rgba is an un-migrated-legacy violation. Includes a defensive check that flags if a shadow primitive *gains* oklch (signal to shrink the allowlist when the shadow OKLCH migration lands). Scoping ratified by Peter (Task 3); shadows tracked in the linked issue, **not** a manifest entry.
  - **P5 (theme-varying base-scoped)** — `assertThemeVaryingBaseScoped`: exact-set equality with the 5 dist base-mode keys, **plus** a named **anti-conflation sentinel** asserting none of the 5 WCAG-only over-marks (`color.action.primary`, `color.contrast.onAction`, `color.feedback.info.*`) is `themeVarying: true`. This is the automated guard closing the §4.1 residual risk (a future change piping the registry-wide 10 to the index would re-break R5 silently).
- **`manifest.ts`** — ratified the manifest as **EMPTY** end-state (not a placeholder): Tasks 3/4 corrected the committed baselines to match fresh, so the re-diff is all-equal — there is no intentional divergence to forgive. The two candidate "exceptions" (shadow rgba; the 6 recovered component tokens) were deliberately kept out (the former is scoped in P3; the latter was fixed in the baseline).
- **`inventory.ts`** — confirmed it reflects the corrected post-Task-3/4 set.

## Task 5.2 — Consumer fixture + package-mode warning test

**`src/tools/integrity/__tests__/consumer-package-mode.test.ts`** (new) — the R4 consumer-blast-radius regression tests, both halves the design (D6 / Testing Strategy) requires:
- **(a)** a real fixture authoring its OWN `*.tokens.ts`, driven through the **real `loadComponentTokens`** in package mode, asserting the tokens are loaded/indexed (not silently dropped).
- **(b)** `runGenerate` in package mode with no discoverable component tokens, asserting the "No component token files found" warning fires (R4 AC3 in package mode, not only local).

## Task 5.3 — End-to-end re-verification + documented-CLI trust gate

- **Trust gate met (P7).** `node bin/designerpunk.js generate` (the documented CLI, unblocked by Spec 118 Inc 1) regenerated **in place** and left the tracked `token-index/` **git-clean** — it reproduces committed exactly. Independently re-confirmed in the main loop.
- **Re-diff all-equal.** `GenerationIntegrityCheck` over the full 14-artifact inventory (committed vs a documented-CLI fresh worktree) → **0 divergences across all 14 artifacts**.
- **Invariants hold.** P3: rgba confined to exactly the 4 shadow primitives. P5: theme-varying = exactly the 5 base keys; 0 WCAG over-marks. 0 violations.
- **Runner upgraded** — `cli/run-audit.ts` no longer hardcodes `ts-node-workaround`/`provisional: true`. Provenance defaults to `documented-cli`/`provisional: false` (override `AUDIT_VIA=ts-node-workaround`); CHECK 3 runs the P3/P5 invariants; a **VERDICT** line reports `allEqual` + invariants + provenance and sets a non-zero exit code unless the trust gate is met. Current verdict: `allEqual=true  invariants=hold  via=documented-cli  provisional=false  → ✅ TRUST GATE MET`.
- **Application MCP reindexed + serving verified (R6 AC2).** `rebuild_index` → healthy, 0 errors/warnings/stale, `componentTokens: 33`. Spot-checks: `gray400` served as OKLCH (`oklch(0.42 0.018 260)` + channels, no rgba); `inputcheckbox.box.md` (a recovered token) served as a component token (resolvedValue 32, all 3 platforms); `color.structure.canvas` served with `themeVarying: true`.

## Verification (independently re-run in main loop)

- Documented-CLI in-place regen → `git status token-index/` clean.
- Re-diff (run-audit) → allEqual=true; invariants hold; verdict TRUST GATE MET, exit 0.
- Full `npm test` → **8969 passed / 8969** (14 new: Invariants + consumer tests); `npx tsc --noEmit` → clean.

## Certification posture

**Ready to certify the spec non-provisionally**, pending Peter's ratification — the documented-CLI trust gate (the thing that lifted the audit's `provisional` ceiling) is met on evidence. Certification itself is a governance act and is Peter's call.

## Residual observations (not blockers)

1. **MCP semantic `resolvedValue` does not apply per-mode overrides.** `color.structure.canvas` serves `themeVarying: true` (correct) but its `resolvedValue` shows the base primitiveReference (`white100`) for both light and dark, not the dark override (`gray400`). This is a token-index *format* limitation (it stores references + flags, not resolved per-mode semantic values) and a pre-existing MCP resolution behavior — out of 117's token-index-integrity scope. Candidate future MCP follow-on if mode-resolved semantic values are wanted from `get_token_details`.
2. **Disposable worktree** `/private/tmp/dp117-task5-fresh` retained as the reproduction harness until certification is ratified; tear down after.

## Requirements Satisfied

- **R2** (AC1–AC5): repeatable semantic-equality check; documented-CLI trust gate; pipeline-scoped.
- **R6** (AC1–AC3): generate re-run + MCP reindexed; MCP serves OKLCH colors, the full 33-token component tier, correct theme-varying flags; documented-CLI reproduction achieved (conclusions no longer provisional, pending ratification).
