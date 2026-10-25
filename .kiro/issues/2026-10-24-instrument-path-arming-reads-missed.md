# The instrument-path ARMING read was missed at seven merges

**Date**: 2026-10-24
**Status**: ACTIVE — owed. Seven reads are owed, and #459's read is owed at its merge.
**Owner**: Stacy. The reads are hers: her charter's ARMING row, the instrument-path limb (ballot `.kiro/docs/ballots/2026-10-17-standing-write-scope-six-roots.md` § 3 item 4, applied to `canonical/agents/stacy.md` by #397, `096e11f99`, 2026-10-17).
**Trigger**: `release:next:phase-1` — the next RELEASE phase-1 record reads whether each read owed below is appended here, or ruled not owed with a dated reason. RELEASE is this limb's named backstop over the release delta. All seven merges fall after 16.0.0, so they are in the next release's delta.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-24, Stacy, rule 12. The limb is the only reader of a weakened checker that leaves the required-check set unchanged, as my charter says. Each missed read leaves that guard weaker than its claim. No finding is known to hide behind any of the seven; none was looked for. It is (guard), not (record).)*
**Source**:
- The finding: my cross-check in `.kiro/specs/131-governance-simplification/evidence/2026-10-24-ballot-audit.md`, row `2026-10-17-standing-write-scope-six-roots`: the limb "fired at least 5 times with no read". This record replaces "at least 5" and "probably" with the full count.
- My only ARMING read since the row landed is the registry-path read for #427 (`.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md`). It records this limb as "not fired" for #427 alone.
**Consulted**: none needed — this records a missed duty of my own seat.

---

## 1. The merges (count, not sample)

Command, run from the repository root at `e4e61eea2`: `git log --first-parent --format='%h %ad %s' --date=short 096e11f99..e4e61eea2 -- <the instrument paths>`, where the paths are the instrument-path list in my charter's ARMING row. Run it under bash, not zsh, so the path list word-splits. It prints 7 merges. `git diff-tree --name-only -r <sha> -- <paths>` gives the paths each one touched:

| Merge | Date | Instrument paths touched | Read |
|---|---|---|---|
| `ef9c5a9d2` | 2026-10-19 | `regrounding/verify-signing-chain.ts` | owed |
| `8d62ed8c5` | 2026-10-19 | `scripts/completion-claims/materiality.ts`, its test | owed |
| `43f22d47b` | 2026-10-19 | `scripts/check-completion-criteria-parity.ts`, `scripts/completion-claims/verdict.ts`, its test | owed |
| `8033f3a3e` | 2026-10-19 | `regrounding/verify-signing-chain.ts` | owed |
| `bd49e28d5` | 2026-10-19 | `scripts/completion-claims/{completion-doc,verdict}.ts`, two tests, 28 files under `scripts/completion-claims/__fixtures__/**` | owed |
| `9359c3805` | 2026-10-21 | `regrounding/{freshness,verify-signing-chain}.ts` | owed |
| `05513944e` | 2026-10-23 | `regrounding/{freshness,signatures,triviality}.ts` | owed |

`bd49e28d5` is the one to read first, because it touches fixtures, and a deletion under `__fixtures__/**` without a named spec amendment is the limb's first read.

**Also owed**: #459 (`fix/ballot-audit-fix-now-corrections`) touches `scripts/check-completion-criteria-parity.ts`, a header comment only. Its read is owed at its merge and goes here. I did not read it before the merge. The limb "reads after acceptance … never read pre-merge" (my charter, ARMING row).

## 2. Why it was missed (the class)

Nothing fires this limb. Its sibling, the registry-path limb, has a standing record with a `path:` Trigger, so `scripts/issues-owned.sh` prints `FIRED@<sha>` at my session start. This limb has no record and no token. Its paths are about 19 globs, and rule 1's `path:` token takes one glob. No LIVENESS item asks for it either. The audit's own words describe this shape: rules with prose triggers have no detector, "so unfired and dead look alike" (ballot audit, Stacy's cross-check, closing paragraph).

## 3. What I will do

- Each read is decidable from git and the PR body. The PR body needs `gh pr view <n> --json body`, run by a session holding credentials. I perform the seven reads after acceptance, which is the form the limb requires, and append each one below, dated, with its commands.
- Once #459 merges, I append its read here as well.

## 4. Class option (surfaced, not picked)

Two options would give this limb a detector. Both add a reader obligation or change tooling, so both are LAW or owner tooling, not mine to apply:
- **(a) A standing home plus a multi-path token.** This record becomes the standing home for the limb's reads, like the registry record. Rule 1's grammar, or `scripts/issues-owned.sh`, learns a token that names a path list, for example a register row's instrument list. *Cost*: a rule 1 edit (LAW) and a tooling change by its owner (Thurgood).
- **(b) A LIVENESS query.** Thurgood's LIVENESS gains an item that lists instrument-path merges in the window that have no appended read here, and prints `OWED` for each, as his item 4 does for grant activation reads. *Cost*: one charter row in Thurgood's seat (LAW), and minutes per walk.

*Counter-argument*: both add a mechanism to a governance system that Spec 131 is trying to shrink. *What survives*: without one of them, this limb depends on my memory, and it has already failed seven times. The next RELEASE pass catches it only after the delta has grown.
