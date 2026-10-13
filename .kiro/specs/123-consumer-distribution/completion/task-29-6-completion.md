# Task 29.6 Completion: one re-sign round within Stacy's limits, and the lock refresh

**Date**: 2026-10-12
**Agent**: Lina (Opus), PRIMARY Task 29. The re-sign act is Stacy's seat commit, outside every line.
**Branch**: `task/123-u3g-g2c2`. The round ran on `d5939d1da`. The seat commit is `c65650f46`. The grant amendment is `6dc435cc5`, with the Found-later flip at `044dad030`. The lock commit is `06e444953`.

## The stale list before the round (taken after 29.3; no-write guard on `d5939d1da`)
```
{"verdict":"FAIL","failedBy":"operative-set-freshness","freshness":{"findings":[{"check":"stale-signature","file":"canonical/profiles/consumer/stacy.dispositions.yaml","key":"knowledgeBases[spec-summaries]","message":"signature on knowledgeBases[spec-summaries] is stale — its canonical or rendered content changed since signing; re-sign or refuse"}],"counts":{"records":17,"units":373,"notes":17,"dispositions":17,"overlays":17}}}
```
- **One row**, signed by `stacy`. **Ceiling limb (iii): one seat**, so it did not fire.
- No other seat's row moved. Kenya's and Data's reads re-hashed their own rows equal.

## The act (one line per act, for the U3g PR body)
`canonical/profiles/consumer/stacy.dispositions.yaml#knowledgeBases[spec-summaries] — Stacy — c65650f`

Stacy's own commit: assent, surviving 0/0, merged in, never amended (§ 4.6). It touches `canonical/profiles/consumer/stacy.dispositions.yaml` (the signature) and `canonical/profiles/consumer/signatures/stacy.md`.

- **Trigger (d) disclosure**: this is a **Stacy-signed row moved by the round**. It falls in Peter's sample (ballot `2026-10-01-signing-act-chain` § 5.3; `.kiro/issues/2026-10-03-stacy-signed-sample-trigger-d.md`). The § 5.3 amendment is still owed by Thurgood before release 3's RELEASE pass.
- **Divergents**: none. Until Thurgood's RS-1 erratum lands, this re-sign is a new act, not a closed divergent.
- **Disposition changes with no hash move**: none.

## The stale list after the round (no-write guard on `c65650f46`)
```
{"verdict":"full-run-green","fullRunReason":"input-closure-changed","freshness":{"findings":[],"counts":{"records":17,"units":373,"notes":17,"dispositions":17,"overlays":17}}}
```
**0 findings.**

## The signing chain (evidence)
- `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci --base c25470eac` (the merge-base), exit 0:
```
verify-signing-chain --ci — consistency, not identity (ballot 2026-10-01-signing-act-chain § 4.1)
operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)
signing-chain: range c25470ea..HEAD — 12 commit(s); 0 committed before R 2da74864 excluded (ballot § 2 clause 8 — the rule does not reach back)
signing-chain: 1 row(s) checked across 1 signing commit(s)
signing-chain: PASS — consistency, not identity
```
- `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --audit --branch task/123-u3g-g2c2`, exit 0 (Stacy did not run the audit; this is it):
```
verify-signing-chain --audit — consistency, not identity — branch task/123-u3g-g2c2; store <the local transcript store>
anchored — canonical/profiles/consumer/stacy.dispositions.yaml#frontmatter:knowledgeBases[spec-summaries] — stacy — c65650f4 — transcript 196362ab-de61-4a02-a56e-887c22c7dcdc/subagents/agent-ac792d77a2b6c9ace.jsonl — spawnDepth 1, model sonnet
counts (beside the per-act lines, never in place of them; no total is green): 1 act(s) — anchored 1 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0
--- machine-readable ---
```

## The lock (one refresh, by the guard's own write, from a clean tree)
- **First attempt, on `c65650f46` from a clean tree** (0 porcelain lines): `npm run check:122:diff-guard` gave `full-run-green (input-closure-changed)`.
  - The generated outputs moved since the last lock (`8a0c0e46a`) included `canonical/_fixture-output/kiro/.kiro/agents/_fixture.json.attribution.json`, outside the three declared roots. **STOP**: the write was reverted and nothing was committed.
  - Peter then granted it as a declared moved output (tasks.md amendment `6dc435cc5`).
- **Second run, on `044dad030` from a clean tree**: `diff-guard: full-run-green (input-closure-changed)`; `operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)`.
  - The lock diff:
```
-  "inputClosure": "054e60efa2e6533b28198eccb065a0bb08db786c18625163c5c189498f2a926d",
-  "outputs": "85ce26329507a76b71dfa52e07df6c5ce21c178336c4652f3f88fa35169e8984"
+  "inputClosure": "81fdcddb3bdd8b46cc9faadabc538744dcc2dc4775f1de23b67e8fa88f7a8f1d",
+  "outputs": "3b2d44d48e46ad8576a81da5ed2a3b24bdaec1d2380c7ab65285d87233eb34a7"
```
- **`outputs` moves here by design.** The moved generated paths, since the last lock (`git diff --name-only 8a0c0e46a HEAD` over the guarded roots), by root:
  - **14 under `canonical/_consumer-output/**`**:
    - `kiro/.kiro/agents/{ada,data,kenya,leonardo,lina,sparky,stacy,thurgood}.json.attribution.json`;
    - `kiro/.kiro/agents/{data,kenya,stacy}-prompt.md`;
    - the three prompt sidecars.
  - **14 under `.kiro/agents/**`**: the same set on the steward leg.
  - **1 under `canonical/_fixture-output/**`**: `canonical/_fixture-output/kiro/.kiro/agents/_fixture.json.attribution.json`, **the declared fixture sidecar** (amendment `6dc435cc5`).
  - Nothing else. **No path outside the declared roots and the declared fixture sidecar.**
- The lock is committed alone (`06e444953`) and was never hand-edited.

## Tests
- No code changed in this subtask.
- With the round complete, the real-repo freshness test that 29.3 left red is green again (29.7 records the full lanes).

## Application-time adaptations
1. **The lock refresh stopped once.** The first refresh hit the out-of-root stop condition on the fixture sidecar. It resumed only after Peter's grant (`6dc435cc5`), from a fresh clean tree.
2. **`outputs` is one hash in the lock**, not a path list. "Which outputs moved" is therefore read from git over the guarded roots since the previous lock commit. That is the listing pasted above.
