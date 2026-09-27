# Task 9.4 Completion — Bites recorded; the post-diet re-certification (ancestry-checked); full validation; open the U1 PR

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 9 · **Agent**: Thurgood (Sonnet)
**Delegated-tier**: plan held

## What changed

No new test code — this subtask is the validation, bite-ledger, and certification pass over 9.0–9.3's work, plus the C11 design.md erratum (Known Input 2 in the brief) and two routed-finding issue files.

### Design.md erratum

`.kiro/specs/123-consumer-distribution/design.md` § "C11. The harvest-zero lint" gained a dated erratum row carrying the harvest-zero warning string verbatim from `src/cli/loadComponentTokens.ts:133`, string-equal to the code (the row was previously missing, unlike most 123 catalog strings elsewhere in the spec — `harvestZeroWarning`'s own docstring flagged the gap).

### Bites executed (manual, recorded here as evidence)

| Bite | Method | Result |
|---|---|---|
| Package-mode generate over-rewrite regex (`over-rewrite arbiter`) | Cited — Task 2.5's own test (`init.overRewriteArbiter.test.ts`) already records this bite | Not re-executed here (see task-9-3-completion.md) |
| Package-mode `generate`'s own-index check bites (Task 6) | Cited — Task 6's own bites | Not re-executed here (out of Task 9 scope) |
| **Brand-survival clause (a)**: swap `TOKEN_CONTRACT_BRAND` for a plain `Symbol()` | Edited `src/build/tokens/defineComponentTokens.ts` (+ one cast-site fix `tsc` needed), rebuilt (`tsc --skipLibCheck`), packed, installed into a throwaway consumer, ran `init` + `generate`. Added a one-line module-load diagnostic and re-ran. | **Did NOT reproduce red** — `progress.node.size.sm` still harvested (`Component tokens: 10`); the diagnostic printed exactly once, meaning no second module instance loads for this path today. Reverted (`git checkout -- src/build/tokens/defineComponentTokens.ts`), rebuilt clean. Filed: `.kiro/issues/2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md`. |
| **Brand-survival clause (b)**: remove the consumer-tree source file | Automated — `C6: brand-survival — consumer-tree provenance` | **RED confirmed and reverted automatically within the test** (delete → regenerate → token gone); the test IS the recorded bite. |
| **Package-mode generate's drop-a-closure-2-file bite** | Attempt 1: removed `"src/constants/StrategicFlexibilityTokens.ts"` from `package.json` `files[]`, re-packed, installed fresh, ran package-mode `generate` → **succeeded (no red)** — that file turned out not to be imported by any runtime `src/tokens/**`/`src/build/**` code path (only referenced in a comment; `grep -rl StrategicFlexibilityTokens src/tokens src/build` shows only a comment mention and its own definition). Attempt 2 (substituted a genuinely load-bearing closure-2 member): removed `"src/types/PrimitiveToken.ts"` instead, re-packed, installed fresh, ran the same `generate` | **RED confirmed**: `❌ Unexpected error: ... Cannot find module '../types/PrimitiveToken'` from `SpacingTokens.ts`, via `verifyBarrelContract`. Reverted `package.json` (`cp /tmp/package.json.bak package.json`; confirmed `git diff` empty), re-packed the correct tarball (1603 files, matching pack-assert's expectation). |

### Post-diet re-certification (ancestry-checked)

- `npm run test:consumer` — **30 passed, 1 skipped** (the pre-existing, out-of-scope `validate` skip — a token-validator defect tracked separately, `.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md`), **0 failed**.
- Certification SHA: this subtask's own commit (the ticked-subtask commit on `task/123-u1-substrate`) — see the parent completion doc for the exact SHA once committed.
- Ancestry: `git log -1 --format=%H -- package.json` = `e06424be0d81130f3a7a1c0b6a0357cb1262c29d`; `git merge-base --is-ancestor e06424be0d81130f3a7a1c0b6a0357cb1262c29d <cert-commit>` → **exits 0** (every commit on this branch descends from it; re-verified against the actual certification commit in the parent doc).

### Full validation

- `npx tsc --noEmit -p .` → clean.
- `npm test` → **384 suites / 9268 tests passed**.
- `npm run test:scripts` → **11 suites / 219 tests passed**.
- `npx tsx scripts/pack-assert.ts` → **40/40 assertions passed**.
- `npx tsx scripts/check-completion-criteria-parity.ts` → spec 123 parents 1–8 **PASS** (9 not yet evaluated — ticked in this same unit, see the parent doc); spec 127 parents 1–3 **PASS**; **0 fails, 0 reds**.

### Open the U1 PR

Executed via `.kiro/hooks/complete-task.sh --unit "U1: Distribution substrate & packaging truth" "U1 substrate & packaging truth (123)"` at parent completion (see the parent completion doc and the PR itself for the URL and body).

## Targeted tests + result

The full-suite commands above ARE this subtask's validation; no narrower targeted-test slice applies (this subtask's job is running them, not writing new ones).

## Application-time adaptations

1. **The drop-a-closure-2-file bite's literal file substituted** — see the bite table above; disclosed rather than silently swapped.
2. **Build-noise reverted before commit**: `token-index/semantics.yaml`, `docs/tokens.css` (build artifacts regenerated by the many `generate`/build runs in this subtask) and the untracked `token-index/meta.json` are reverted/removed before every commit, per standing law.
