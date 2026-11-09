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

- *2026-11-08 (Thurgood, owner; rule 9 dated line): a third restatement, found by the straggler sweep of ballot `2026-11-08-signing-act-shape-review`'s application PR 1.* **`governance/classification-map.md`, row `signing-act-consistency`, the `rule:` line's chain list** reads "each signed row's rendered line appears in a tool result". After F-2 (b), a row that renders nothing anchors link 7 on its print record instead (the signing-act ballot § 3 row 7 and § 4.2, as amended). The ballot's resolved after-texts did not include this sentence, so PR 1 leaves it. **Truth**: "each signed row's rendered line, or for a row that renders nothing its print record, appears in a tool result". It rides this record's CORRECTION PR with the other two (`**Edit kind**: governance/classification-map.md L<n> — CORRECTION (this record; truth: the signing-act ballot § 3 row 7 as amended 2026-11-08)`).
- *2026-11-08 (Thurgood, owner; rule 9 dated line; the same straggler sweep, RS-38 for `verify-signing-chain.ts` and `freshness.ts`).* Two more restatements left by application PR 1, each outside the ballot's resolved after-texts, so PR 1 does not touch them:
  - **`governance/classification-map.md` L1102–1104**, the git-links surface's planned-identity comment: "Link 1 is decided per signing commit (a re-sign must move the pinned canonicalHash or renderedHash), never from head". After PR 1, link 1 also needs the row on its act kind's list at the first parent. **Truth**: "Link 1 is decided per signing commit, at its first parent: the row is on its act kind's list there (signing ballot § 2a), and a re-sign or re-confirm also moves a pinned hash (F5); never from head".
  - **`governance/signing-seat-brief.md` L48**, S4: "the sweep's reference is `regrounding/freshness.ts` L608–612". PR 1's `freshness.ts` change moved that code to L639–643. A line pointer rots on every edit, as finding 2 says. **Truth**: name the code, "the `sections` table in `runFreshnessSweep`'s dispositions loop".
  Both ride this record's CORRECTION PR, which now carries five sentences.
- *2026-11-08 (Thurgood, owner; rule 9 dated line): a sixth sentence, an omission, observed at the shape review's PR 2 (#823).* Five of seven seats failed link 7 on their own `--audit --branch` because they printed in loops or filtered their prints. Their abandoned local commits, never pushed: Sparky `ed1bf6658`, Ada `22a732d50`, Kenya `2a0eef980`, Data `46e160144`, Lina `34119582b`. Each seat redid its acts fresh. `governance/signing-seat-brief.md` never said how a print must reach the transcript for link 7 to read it. **Truth**: the signing-act ballot § 3 row 7 and § 4.2's F-2 (b) bullet (as amended, applied in #816): link 7 anchors on one tool result that carries the print's header, its renders-nothing line and `canonicalHash:`; for a row that renders, on a tool result that holds its rendered line. The fix is a line in S14: print so that the whole output reaches one tool result, unfiltered and untruncated, with one call per print as the safe form. It is worded as the clause's consequence, never as "must run in its own call", which would require more than the clause.

**Outcome (2026-11-08, Thurgood, owner; rule 5)**: all six sentences are corrected in the PR on branch `chore/signing-chain-restatements-correction` (CORRECTION, Peter-merged):
- `governance/classification-map.md`: the harness-links rationale, the rule line's link-7 item, and the git-links planned-identity comment, with the row's history line as its pointer.
- `governance/signing-seat-brief.md`: S4's and S7's line pointers named instead, and S14's print line, each with a dated pointer.

The record resolves at that PR's merge commit (rule 10, RS-43) and moves to `archive/` in it.
