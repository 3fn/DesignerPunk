# Task 29.0 Completion: the read-only sizing re-run on the ruled text, and the ceiling check

**Date**: 2026-10-12
**Agent**: Lina (Opus), PRIMARY Task 29
**Branch**: `task/123-u3g-g2c2` (a worktree cut from `origin/main` @ `c25470eac`), after the instruments block (`6f5c3eaf0`). **No machinery edit has been made.**

## What changed
- The record is `.kiro/specs/123-consumer-distribution/completion/u3g-sizing.md`. It contains:
  - the run on the ruled text, pasted;
  - four bites showing the harness can fail;
  - the dry run of 29.3;
  - the ceiling table;
  - a finding, with a fork;
  - the two harness scripts, verbatim.
- The 29.0 checkbox in `tasks.md` is ticked. Nothing else in `tasks.md` changes.
- One `## Found later` entry is appended to `task-29-instruments.md`, kind `misfit`, against rows 7.1 and 7.2.

## Results
- **169 re-pointed rows evaluated**, equal to the count derived from the committed dispositions: 141 body (always-set included), 27 frontmatter, 1 shared member.
  - **163 VERIFIED, 6 FAIL.** The six are the same six as the provisional sizing; each is `FAIL_NO_DERIVATION` on `kiro` only.
  - 169/169 destinations equal S. R1 and R2 move no committed row.
  - The shared member verifies in member-id space. The merged machinery fails it, so 29.1 builds the space.
- **Ceiling**: (i) 6 ≤ 12; (ii) 0; (iii) 0 seats; (iv) 0 body or always-set rows fail. **No limb is exceeded.**
- **Dry run of 29.3**: 0 would-move signed rows, where the plan expected Stacy's `knowledgeBases[spec-summaries]`. Not red. All 210 signed agent rows hash fresh first.
- **Diff guard, no-write mode** (`runGuard(root, { refreshLock: false })`) at the cut: `no-op-green`, 0 freshness findings. No lock write.
- **Baseline before this subtask**: `tsc --noEmit` exit 0; `npm run test:agent-generator` 58 suites and 1637 tests green. No code changed, so no test was re-run.

## Application-time adaptations
1. **The dry run is computed rather than built.**
   - The plan says "per-entry Kiro-JSON spans computed in a temp copy".
   - The harness adds one Kiro-JSON piece per JSON-rendered entry to a copy of the span map in memory, and recomputes VALVE-1's `renderedHashOf`. No `kiro.ts` prototype was written.
   - The would-move set is exact either way, because any added piece moves the hash.
   - 29.3's real sidecars are the check on this. The freshness stale list is taken after 29.3 (C7), and any row on it that is not on this list is a `## Found later` entry.
2. **The finding (u3g-sizing.md § 5): C7's premise holds for two of the six rows, not four.**
   - Holds: the two `description` rows render into the Kiro JSON.
   - Does not hold: the four `knowledgeBases[…]` rows are glob-only and render nowhere in the Kiro target, on the consumer or the steward leg (`kiro.ts` L259–260, L428–434).
   - So per-entry JSON spans cannot fix those four, and Stacy's planned re-sign is not triggered by 29.3.
   - This is a fork, surfaced and not picked:
     - (A) Kiro renders glob-only knowledge bases. This is a content change that contradicts C7's "JSON bytes unchanged".
     - (B) An R3 surface amendment. This is a ruling change.
     - A class option is also named.
   - It blocks 29.3, not 29.0. **STOP: reported for routing.**
