# Spec 118 — Session Handoff (2026-06-25): PAUSED at 9.5.3, pending the Option-1 prerequisite spec

**Branch**: `spec-118-module-resolution-coherence` · **HEAD**: `a123f77c` (+ this handoff) · working tree clean
**State**: 118 is **PAUSED on a clean, working, fully-documented coherent intermediate.** The register-keep interim works (consumer-guard-green). The final step (9.5.3 — retiring the global register) is BLOCKED on a component-token-architecture fix that is now its **own prerequisite spec** (Peter's call). Everything else is done + certified.

## Done & committed this session (the whole arc)
- **Task 7** — Increment-2 evidence: parity harness (reused 117's engine), ALL-GREEN semantic parity (ts-node vs tsx), four inventories, divergence hypothesis REFUTED. The parity harness was later retired in 3a-core (its purpose spent).
- **Task 8** — direction decision: **CJS-consistency**, executed in-spec, escape-hatch not elected. ESM modernization sized + roadmapped.
- **Issue triage + sequencing** (with Peter): #2 closed; #3 validator + #1 blend → Soon; #4 MCP resolvedValue + #5 RSA terminology → Later; #5 rides Task 11. Recorded in `docs/roadmap/m0a-deferred-items.md`.
- **Increment-3 second tasks pass** (CJS branch): Task 9 decomposed (9.1 3a / 9.2 3b / 9.3 3c / 9.4 lint / **9.5** bin-retirement: audit→9.5.1→9.5.2→9.5.3); Group 10 N/A; Ada+Lina review incorporated. Governance stays Task 11.
- **9.1 (3a core)** — ts-node fully retired, tsx the sole runtime mechanism; typecheck-gate; tsx pinned; parity harness + dead scripts removed. R6 satisfied.
- **Task 9.5 audit + RATIFIED target model** (`findings/consumer-runtime-ts-resolution-audit.md`, `runtime-ts-resolution-target-model.md`): exactly 3 consumer-`.ts` sites; the ideal (package code compiled-shipped; consumer `.ts` via scoped seams; single `resolvePackageRoot`; catalog reflects the consumer's design system [C′, Peter-ratified]; MCP-dev ts-node a permanent exception); the mapped path of guard-certified steps.
- **9.5.1** — `resolveTokens` + `loadComponentTokens` scoped to per-site tsx (shared `scopedTsRequire`; ConfigLoader unified). Consumer-guard certified.
- **9.5.2** — single `resolvePackageRoot`; consumer-aware catalog (C′); + fixed a **silently-dead feature** (the token→component `consumers` map was 0/193 — array-group reader bug; now 329 correct relationships, Lina-reviewed).
- **9.2 (3b)** — `./blend`/`./build`/`./types` exports → compiled `dist`, shipped (caught a latent mis-ship); test mappers stay `src`; `.` intended-asymmetric. **This is 9.5.3's prerequisite** (consumer's `@3fn/core/build` now resolves to compiled dist). 117 R7 AC3 prerequisite certifies.

## The pause point — 9.5.3 (BLOCKED, fully diagnosed)
Retiring the global register exposed a **dual-instance `ComponentTokenRegistry` split** (silent 0 component tokens). Diagnosis: `findings/9.5.3-component-registry-dual-instance-blocker.md`. The bin/compiled-CLI mechanism works + the `files`-broadening was solved (both reverted, captured for re-apply). The fix is **Option 1** (convert the component-token seam to a return-value seam) — decided as its **own prerequisite spec** because it's a shipped `defineComponentTokens` contract change (component-token architecture, not module-resolution) that shouldn't be rushed.

## RESUME PLAN (the entry point for the next session)
1. **FIRST — the new prerequisite spec: "Component-Token Return Contract" (Option 1).** Full seed: `findings/component-token-return-contract-spec-seed.md` (problem + decided approach + Lina/Ada analysis + scope + the backward-compat constraint + the N>0 guard). Owners: Lina (the contract + harvest convention) + Ada (the `loadComponentTokens` harvest) + Thurgood (test-isolation guards). Formalize it (requirements/design/tasks) then implement.
2. **Then resume 118 Task 9.5.3**: re-apply the registerless bin + the `files` build-tracking globs (`dist/**/*.{js,d.ts,json,css,swift,kt}` + exclude `__tests__` + re-include the fixture); re-run the consumer guard (now N>0 component tokens via Option 1) → closes Risk #2.
3. **Then 9.3 (3c)** finalize CJS + extensionless authoring; **9.4** lint polarity (ban extensions, web source only); **Task 11** governance (codify the contract + CJS direction + the #5 RSA rider; rebuild docs MCP).

## Tracked follow-ups (not blocking; on the roadmap / issues)
- `.kiro/issues/2026-06-25-component-schema-token-name-drift.md` — schemas declare non-canonical token names → catalog correct-but-incomplete (Lina+Ada).
- `.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md` — the validator false-fails (Soon; un-skips the consumer-guard `validate` test).
- #1 blend/OKLCH (Soon spec), #4 MCP resolvedValue + #5 RSA terminology (Later) — `docs/roadmap/m0a-deferred-items.md`.
- **NEW (Ada flagged):** consumer-guard MCP teardown leak — `child.kill()` SIGTERMs the `npx` wrapper but the `dist/mcp/*.js` node process orphans, holding jest's event loop open ("Jest did not exit"); would intermittently wedge CI. Thurgood / test-hygiene.
- **CODEOWNERS handle** (Peter) — `.github/CODEOWNERS` placeholder for the tsx pin-bump gate + enable branch-protection code-owner review.

## Verification discipline (held all session; carry forward)
The **consumer guard (packed install) is the ONLY arbiter** — in-repo loads false-green (caught us repeatedly). `npm run build` is mandatory for loader/module-resolution changes. Delegate consumer-lane runs to a subagent (they phantom in main-loop Bash). Read a spec's completion docs + linked issues before recommending changes to it.
