# Task 15 Summary: Consumer rendering and first render

**Date**: 2026-09-29
**Purpose**: Concise summary of Task 15 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Step 7 of U2b rendered all eight agents, the shared catalog and the eight identity docs for consumers. It then routed every re-grounding judgment to the seat that owns it.

- **The consumer rendering exists and is guarded.** `canonical/_consumer-output/` holds:
  - the derived charters, once, under `_canonical/`;
  - per-target renderings for Claude Code and Kiro;
  - the `designerpunk-<id>.md` identity members.

  It is produced as `rendering(derive(x))`: re-pointed frontmatter entries are YAML values, and the derived charter passes the same `validate()` as the steward charter. The diff-guard regenerates and compares it, and the steward rendering is byte-identical throughout.
- **Every unit and entry has an explicit disposition** (960 rows over 17 files), and every body unit has a confirmed operative set (370 units across 17 records). The records were confirmed by their owners, with Stacy confirming where the owner is the profile author.
- **First render was routed and signed.** The seven C1 seats signed the routed, `no-consumer-counterpart` and `superseded-by` rows.
  - They issued 25 refusals, 24 resolved by re-authoring or a changed disposition, and 1 withdrawn on a recorded ruling. None is standing.
  - The "first render — not a baseline" block records the `no-consumer-counterpart` rate (79 / 960, the baseline), the per-signer assent rates and every refusal. Stacy, the counting owner, confirmed it.
- **Two rulings came out of the render.**
  - An item is operative when an implementation could act against it, including stated facts about names and shapes.
  - A disposition names where a row's **function** went.

## Why It Matters

This is the consumer agent layer that Task 16 emits into a real install, and the population that MIDPOINT audits.

## Key Changes

- New: `canonical/consumer-profile.yaml`, `canonical/profiles/consumer/**` (dispositions, overlays, confirmations, signatures), `canonical/operative-sets/**` (17 records), `canonical/_consumer-output/**`, `tools/agent-generator/consumer-profile.ts`, and the real-profile test suite.
- Changed: `derive.ts` (positional-renumber identity fix), `generate.ts` (the consumer lane), the adapters and `spans.ts` (identity members, containers, shared rows), `render.ts` (the consumer-true run-context annotation) and `freshness.ts` (rendered hashes, evidence notes).

## Impact

- One criterion is partial: two snapshot-trim resolutions are true only once Task 16.3 drops `dist/{ios,android,web}/**` from the package.
- Carried forward: the Task 16 packing items, the VALVE-1 per-trim spans (Lina), three governance ballot drafts, and the `emitSkillTrees` retirement before U2b's PR opens.

## Cross-References

- Completion doc: `.kiro/specs/123-consumer-distribution/completion/task-15-completion.md`
- Instruments block: `.kiro/specs/123-consumer-distribution/completion/task-15-instruments.md`
- First-render block: `.kiro/specs/123-consumer-distribution/completion/task-15-5-completion.md`
