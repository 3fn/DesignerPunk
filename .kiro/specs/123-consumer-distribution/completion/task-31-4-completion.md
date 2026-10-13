# Task 31.4 Completion — the re-sign round (Kenya, Data), and the lock refresh

**Date**: 2026-10-12
**Agent**: Thurgood (Opus) · PRIMARY, Task 31. The signing acts are Kenya's and Data's own commits. This doc records them; it does not author them.
**Branch**: `task/123-u3c-profile-corrections`

## The round: one round, two acts, six rows

**The stale list taken after the last authoring commit** (`fdec41750`, 31.3's doc fix; identical to 31.3's after-list), the list in bound for the round:
```
STALE LIST (all freshness findings): 6
  stale-signature | canonical/profiles/consumer/data.dispositions.yaml | #android-theming-spec-094 | signature on #android-theming-spec-094 is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/data.dispositions.yaml | ambient.groundTruthManifest.verdict | signature on ambient.groundTruthManifest.verdict is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/data.dispositions.yaml | commands[platform-tokens] | signature on commands[platform-tokens] is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | #ios-theming-spec-094 | signature on #ios-theming-spec-094 is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | ambient.groundTruthManifest.verdict | signature on ambient.groundTruthManifest.verdict is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | commands[platform-tokens] | signature on commands[platform-tokens] is stale — its canonical or rendered content changed since signing; re-sign or refuse
```

**The acts** (ballot § 2 clause 6(iv); one line per row):
- `canonical/profiles/consumer/kenya.dispositions.yaml#ios-theming-spec-094 — Kenya — a460576`
- `canonical/profiles/consumer/kenya.dispositions.yaml#ambient.groundTruthManifest.verdict — Kenya — a460576`
- `canonical/profiles/consumer/kenya.dispositions.yaml#commands[platform-tokens] — Kenya — a460576`
- `canonical/profiles/consumer/data.dispositions.yaml#android-theming-spec-094 — Data — 6fc5395`
- `canonical/profiles/consumer/data.dispositions.yaml#ambient.groundTruthManifest.verdict — Data — 6fc5395`
- `canonical/profiles/consumer/data.dispositions.yaml#commands[platform-tokens] — Data — 6fc5395`

All six are `assent`. The two seat commits sit on the branch as made (Kenya `a46057606`, then Data `6fc53951d`), each on top of the then-current head. Neither was amended, rebased or cherry-picked (§ 4.6). No profile-author edit shares a commit with either.

**The signed set equals the expected signed set named at 31.0.** No other seat's row reached the stale list, so the intro reword moved no Stacy-signed row, and Peter's trigger-(d) sample is not engaged by this round.

**The stale list after the round** (taken by Thurgood at `6fc53951d`, then again after the lock commit):
```
STALE LIST (all freshness findings): 0
```

**The chain** (Thurgood's runs, at `9ee9afc25`, `origin/main` fetched):
- `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci` → exit 0:
  ```
  operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)
  signing-chain: range dcd337dc..HEAD — 10 commit(s); 0 committed before R 2da74864 excluded (ballot § 2 clause 8 — the rule does not reach back)
  signing-chain: 6 row(s) checked across 2 signing commit(s)
  signing-chain: PASS — consistency, not identity
  ```
- `… verify-signing-chain.ts --audit --branch task/123-u3c-profile-corrections` (§ 4.2, links 4–7, every act; it walks the same range from the branch head, since the PR has not opened):
  ```
  counts (beside the per-act lines, never in place of them; no total is green): 6 act(s) — anchored 6 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
  ```
  - Kenya's three acts are `anchored` to transcript `…/subagents/agent-af3a2eb1c88ef0615.jsonl`.
  - Data's three acts are `anchored` to transcript `…/subagents/agent-a3905dff1f14aa3bb.jsonl`.
  - Both run at spawnDepth 1, model sonnet.
  - The full per-act output is reproduced in the U3c PR body.

**Divergents, carried and not closed**: 5, 6, 8 and 9. RS-1 has not landed, so each re-sign is **a new act, not a closed divergent** (the criterion's last limb). Divergent 7 owes no act (no text change) and is carried by name to release 3.

## The lock refresh

- **From a clean tree** (`git status --porcelain` empty at `6fc53951d`), `npm run check:122:diff-guard` → exit 0, with `operative-set-freshness: PASS …` and `diff-guard: full-run-green (input-closure-changed)`.
- The guard wrote `canonical/generated.lock`. It was not hand-edited, and it is committed alone, in `9ee9afc25`:
  - `inputClosure` `95a70f42ba22712bf173292eb55af981ffeebc6c239dafbfcd18e25e5834233a` → `054e60efa2e6533b28198eccb065a0bb08db786c18625163c5c189498f2a926d`
  - `outputs` `05d9c39e485f48ffc2221a024404905774957b3a61167091e903013362656336` → `85ce26329507a76b71dfa52e07df6c5ce21c178336c4652f3f88fa35169e8984`
- **`outputs` moved by design.** Every moved output path is listed below. The method: `guardedRoots(repoRoot)` resolves the guarded roots (the ten static roots plus the 48 ledger files). `git diff --name-only 8bd4bb505 HEAD -- <those roots>` then lists what moved, where `8bd4bb505` is the last commit to write the lock. The same 21 paths come from `git diff --name-only dcd337dcf HEAD`, so nothing on `main` after the last lock write moved an output.
- **Every one of the 21 lies in `canonical/_consumer-output/**`, `.claude/agents/**` or `.kiro/agents/**`. The stop did not fire.**
- The Lina and Sparky files are steward outputs, moved by the 31.1 shared-template intro reword, as the criterion foresaw ("which moves the steward outputs too").
```
.claude/agents/data.md
.claude/agents/kenya.md
.claude/agents/sparky.md
.kiro/agents/data-prompt.md
.kiro/agents/data-prompt.md.attribution.json
.kiro/agents/kenya-prompt.md
.kiro/agents/kenya-prompt.md.attribution.json
.kiro/agents/lina-prompt.md
.kiro/agents/lina-prompt.md.attribution.json
.kiro/agents/sparky-prompt.md
.kiro/agents/sparky-prompt.md.attribution.json
canonical/_consumer-output/_canonical/agents/data.md
canonical/_consumer-output/_canonical/agents/kenya.md
canonical/_consumer-output/cc/.claude/agents/data.md
canonical/_consumer-output/cc/.claude/agents/kenya.md
canonical/_consumer-output/kiro/.kiro/agents/data-prompt.md
canonical/_consumer-output/kiro/.kiro/agents/data-prompt.md.attribution.json
canonical/_consumer-output/kiro/.kiro/agents/kenya-prompt.md
canonical/_consumer-output/kiro/.kiro/agents/kenya-prompt.md.attribution.json
canonical/_consumer-output/kiro/.kiro/agents/lina-prompt.md
canonical/_consumer-output/kiro/.kiro/agents/lina-prompt.md.attribution.json
```
- **The stale `inputClosure` on `main`**, seen at the cut and recorded in the instruments block, is absorbed by this write.

## Tests run at this subtask

- The two chain runs above, the diff guard, and the stale-list sweep.
- The full validation is 31.5's.

## Application-time adaptations

- **`--audit` was run at 31.4, not only at the claims pass.** It uses `--branch` because the PR has not opened. The ballot makes it local and post-acceptance, never blocking. It is run here as evidence and is not a gate.
- None otherwise.
