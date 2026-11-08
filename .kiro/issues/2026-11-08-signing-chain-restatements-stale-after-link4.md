# Two restatements of `verify-signing-chain` left false after #769: the register's format-change rationale and the seat brief's header line numbers

**Date**: 2026-11-08
**Owner**: Thurgood
**Class**: P2 obligation (record) · defect *(set 2026-11-08, Thurgood, rule 12)*. `(record)`: each sentence is a restatement that no longer matches the instrument, and neither misleads a check; the instrument reads correctly.
**Trigger**: `release:next:phase-1` — the fix is a CORRECTION PR on two governance paths (Peter-merged) and rides the next governance register pass; it takes the release token under rule 1 (a P2 that would ride another change). If a PR for it opens first, re-rule to `merge:#<N>` the day it opens.
**Filed by**: Thurgood, under rule 10, from Stacy's ARMING batch-5 finding **F2** (`.kiro/specs/129-consumer-generation-completeness/completion/arming-reads-2026-11-08-batch-5.md`): #769 carried no `**Straggler sweep**:` line, and the register sentence it called stale in its body was "flagged for the next register pass" in no record.
**Related**: `.kiro/issues/2026-10-26-signing-chain-audit-false-verdicts.md` (fix 2, executed by #769); ballot `.kiro/docs/ballots/2026-10-23-link4-candidate-first-sha-after-commit.md`.

---

## The sweep (RS-38, `.kiro/docs/ballots/README.md` § "Conventions"; run now for #769, which changed `verify-signing-chain.ts`)

**Straggler sweep**: `git grep -n -F verify-signing-chain.ts -- .kiro/hooks/RELEASE-FLOW.md governance canonical/agents canonical/profiles/consumer .kiro/steering` — 9 hits (the same 9 at `e7d82c377` and at `939931b15`):

```
canonical/agents/thurgood.md:320
canonical/profiles/consumer/signatures/thurgood.md:1268
canonical/profiles/consumer/signatures/thurgood.md:1272
canonical/profiles/consumer/signatures/thurgood.md:1277
canonical/profiles/consumer/thurgood.dispositions.yaml:183
governance/classification-map.md:1093
governance/classification-map.md:1094
governance/classification-map.md:1159
governance/signing-seat-brief.md:50
```

Each section that holds a hit, read whole:
- `canonical/agents/thurgood.md` § frontmatter `writeScope` — true (a path in a list).
- `canonical/profiles/consumer/signatures/thurgood.md` § "`#frontmatter:writeScope[tools/agent-generator/regrounding/verify-signing-chain.ts]`" — true (a signature on a no-consumer-counterpart row; it states the file is this repo's verifier and not shipped).
- `canonical/profiles/consumer/thurgood.dispositions.yaml` row `writeScope[tools/agent-generator/regrounding/verify-signing-chain.ts]` — true.
- `governance/classification-map.md` § "signing-act-consistency" (L1093, L1094, L1159) — **left: one false sentence**, finding 1 below. The LOOKUP RULE comment, the fixtures list and the history are true after #769.
- `governance/signing-seat-brief.md` § "The seat's rules" (S7, L50) — **left: one false pointer**, finding 2 below.

## The two findings

1. **`governance/classification-map.md` L1137**, the `rationale` of the harness-links surface of `signing-act-consistency`: "… A format change reads loudly as record absent on every act". After #769 a format change reads `anomaly 4: store layout unrecognized` (ballot 2026-10-23 § 2b), per store, and sends no act into J. #769's body flagged this and filed it nowhere. **Truth**: the sentence should end "A format change reads loudly as `anomaly 4: store layout unrecognized`, not as `record absent`".
2. **`governance/signing-seat-brief.md` L50**, S7's law-clause cell: "the preamble reading is the instrument's (`verify-signing-chain.ts` header L74–75)". The paragraph is at L103–104 after #769 (L80–81 at `e6c74e3d6`, so the pointer was already six lines off before #769, which added the STORE LAYOUT block above it). A line-number pointer rots on every header edit. **Truth**: cite the header paragraph by name, "the module header's 'WHAT A SIGNING ACT IS' paragraph", which survives edits.

## The fix

One CORRECTION PR, Peter-merged (both paths are governance paths): `**Edit kind**: governance/classification-map.md L1137 — CORRECTION (.kiro/issues/2026-11-08-signing-chain-restatements-stale-after-link4.md; truth: ballot 2026-10-23 § 2b)` and `**Edit kind**: governance/signing-seat-brief.md L50 — CORRECTION (.kiro/issues/2026-11-08-signing-chain-restatements-stale-after-link4.md; truth: tools/agent-generator/regrounding/verify-signing-chain.ts, header paragraph "WHAT A SIGNING ACT IS")`. This record is the observation record and must resolve at that PR's merge commit (rule 10, RS-43). No ballot is needed (CORRECTION).

**Counter-argument, and what survives**: a CORRECTION to two sentences may not justify a PR of its own, and a register pass will touch the same file anyway. What survives is that a false restatement left for a pass with no date is the exact class RS-38 exists to close, and the seat-brief pointer is read by every signing seat. The record rides the next register pass (the Trigger) rather than forcing a PR now.

*Signed: Thurgood, 2026-11-08.*
