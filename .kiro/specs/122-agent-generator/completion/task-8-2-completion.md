# Task 8.2 Completion: Stacy's coverage map + audit commands (C12)

**Date**: 2026-07-10
**Task**: 8.2 Provision Stacy's coverage map + audit commands (Implementation, Tier 2)
**Agent (planned)**: Thurgood + Stacy — **executed**: Sonnet implementation subagent (settled S-D1 design) + main-loop (Fable 5) verification and routed-fix application + **Stacy (agent, session-model tier)** independent validation. Conscious tiering per the calibration rule; plan substantively held (Stacy's seat honored; Thurgood's build leg delegated down to Sonnet — implementation of a settled design).
**Spec**: 122-agent-generator
**Branch**: task/122-substrate

---

## What was built

- **`tools/agent-generator/coverage-map.ts`** — pure core + CLI: `buildCoverageManifest`
  (imports every check's `surfaceGlobs()`), `enumerateSurfaces` (guardedRoots files +
  every `canonical/` file), `buildCoverageMap` (glob join; a surface matching nothing gets
  a VISIBLE `checks: []` blank row), deterministic serializers, `auditCoverageMap`.
- **S-D1 derivation seams** in every check module: each exports `surfaceGlobs()` bound to
  the SAME constants its reader code consumes (`guardedRoots()` for the diff-guard;
  `CANONICAL_AGENTS_ROOT`, `SCAN_SCOPE`, `SKILLS_MAP_PATH` + `SKILLS_ROOT`/`CC_SKILLS_ROOT`/
  `KIRO_SKILLS_ROOT`, per-sweep `KIRO_AGENTS_ROOT`, `MANIFESTS_ROOT`, `BASELINES_ROOT`,
  `CC_AGENTS_ROOT` in sweeps/common). The manifest cannot drift from what the checks read.
- **Emitted + self-guarding**: `canonical/coverage-map.yaml` (215 rows) +
  `canonical/coverage-manifest.yaml` emitted by `generateAll` AND by the standalone CLI
  (byte-identical — determinism verified across both entry points); both added to
  `guardedRoots()`, so a stale map fails the C6 diff-guard.
- **`npm run audit:coverage-map`** (the one audit C12 invents): regenerates + asserts zero
  blank rows or a recorded adjudication per blank. Result: **PASS — 215 surfaces / 214
  guarded / 1 blank / 1 adjudicated**.
- Audit-slot confirmations (C12 table): `audit:mode-parity` + `audit:theme-drift` live in
  package.json (lines 126–127 — one-line drift from the design's 125/126 note);
  `test:coverage`, `governance-check.sh`, `verify-gate-registration.sh`,
  `complete-task.sh` all present/executable.

## Blank-row adjudication

One blank: **`canonical/generated.lock`** — ruled `intentional-trim` (owner thurgood,
record: this doc). Reasoning, validated independently by Stacy's fail-safe analysis of
`runGuard`: a tampered/stale/unreadable lock can only trigger a FULL regenerate-and-compare,
never a false green; a content check on the lock would recompute exactly what the full run
recomputes (circular). The only lock content that no-ops the guard is one matching freshly
recomputed hashes — a genuinely consistent state.

## Stacy's recorded sign-off (the Task 8.3 closure input — Stacy amendments 2/6)

> **[STACY — Task 8.2 coverage-map validation] CONFIRMED — zero blank rows or
> adjudicated-per-blank; S-D1 derivation verified; 2026-07-10**

Her independent re-derivation: own audit run (PASS, exit 0, counts cross-checked by grep);
7 map rows spot-checked against disk incl. negative joins; S-D1 fidelity verified on FIVE
checks (diff-guard STRONG, canonical-vs-truth STRONG, sweep-1 STRONG, sweep-2 MIXED-passes,
sweep-8 weakest-passes — **no unconsumed glob anywhere**; the C12 over-broad failure mode
not present). Scope caveat: her confirmation attached to the working-tree bytes; the routed
fixes below changed sweep files after her run, so the audit + suite + guard were re-run
green post-fix (same glob VALUES; the hoists change symbols, not surfaces). She re-affirms
on U1's PR (her recorded PR entry is the standing requirement).

## Stacy's routed items — disposition

1. **Hoist sweep-2/sweep-8 glob literals into shared reader constants** → **DONE this task**
   (SKILLS_ROOT/CC_SKILLS_ROOT/KIRO_SKILLS_ROOT wired into Direction A scan + the CC
   flat-dir regex; BASELINES_ROOT/MANIFESTS_ROOT/CC_AGENTS_ROOT wired into the readers).
   Bonus fidelity fix she surfaced implicitly: sweep-4's cue-inclusion leg reads
   `.claude/agents/**` but didn't list it — now in its `surfaceGlobs()`.
2. **Citable adjudication record** → **DONE** (record now cites this completion doc).
3. **`.claude/agents` must join `guardedRoots()` at each CC cutover** or emitted agents sit
   outside both the guard and the map universe → **CARRIED FORWARD as a cutover-checklist
   item** (Task 9+; also named in the C13 bundle).
4. **audit:coverage-map is regenerate-then-assert** (rewrites on every run; no check-only
   mode) → recorded; determinism + C6 make it idempotent/safe; a `--check` mode is a
   cheap later ergonomic if the tension ever bites.
5. **diff-guard.ts stray byte** → **DONE**: a literal NUL used as the hash-pair separator
   made `file(1)`/grep treat the module as binary (cost Stacy a false-negative); replaced
   with the `\x00` escape — runtime-identical string, source now clean UTF-8.

## Validation (Tier 2)

- `npx tsc --noEmit` (project) clean; `npm run test:agent-generator` **306/306** (26 suites).
- `npm run audit:coverage-map` PASS (exit 0), counts above — re-verified after the routed fixes.
- `npx tsx generate.ts` 207 files / 7 guarded roots; `diff-guard` full-run-green, lock
  refreshed; standalone-vs-generateAll emission byte-identical.
