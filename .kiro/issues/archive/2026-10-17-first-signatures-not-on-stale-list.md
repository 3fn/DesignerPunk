# Issue: first signatures on new routed rows are outside the signing-act chain's stale-list bound

**Date**: 2026-10-17
**Status**: CLOSED (2026-10-21 — § "Outcome (2026-10-21)")
**Owner**: Thurgood (owner of ballot `2026-10-01-signing-act-chain`'s instrument and of `tools/agent-generator/regrounding/freshness.ts` under ballot `2026-10-17-standing-write-scope-six-roots` F-1 Option B).
**Trigger**: `manual` — Peter rules the M1 clause-3 erratum and the sweep change arms (the § Closing event). The old line named start events; the first fired at `096e11f99`. It named no close deadline, so there is no lapse. *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the pulled-forward walk (Peter's go, 2026-10-20); ledger `archive/TRIAGE-2026-10-20.md`.)*
**Superseded trigger (back-filled 2026-10-20; verbatim)**: **the merge of the application PR of ballot `2026-10-17-standing-write-scope-six-roots`, or the next PR adding routed rows**, whichever comes first.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-20, Thurgood, rule 12. The audit legs (i) and (iv) do not cover a first signature on a new routed row. The interim paste covers it until the fix.)*
**Source**: Stacy's consult on the application PR (2026-10-17, relayed); recorded on the register row `governance/classification-map.md § "signing-act-consistency"` (history line, 2026-10-17).

## The gap

Ballot `2026-10-01-signing-act-chain` M1 clause 3 makes a C1 signing act valid "only for a row on the branch's freshness stale list". A **new** routed row (`no-consumer-counterpart`, `superseded-by`, or a routed body row) that has never been signed is **not stale** — it has no signature to go stale — so `operative-set-freshness` never lists it. Its first signature therefore matches neither clause 3 nor clause 5, and audit legs (i) and (iv) do not cover it. Today the only instrument that sees unsigned routed rows is the Jest test `tools/agent-generator/__tests__/consumer-profile.real.test.ts` ("every ROUTED, no-consumer-counterpart and superseded-by row carries a C1-correct signature"), which runs in a different lane and is not the M1 bound. The application PR of the six-roots ballot carries **123** such first signatures.

## The fix (two parts)

1. **Erratum to M1 clause 3** (Peter rules): "a row on the branch's freshness stale list **or its unsigned-routed list**".
2. **A `proposed` instrument change** (Thurgood builds; Stacy specifies the fixtures): the freshness sweep emits the unsigned-routed list alongside the stale list, so clause 3 has a mechanical source and PR bodies paste one sweep's output. `verify-signing-chain` link 1 reads a first signature on a listed row as valid.

## Interim (until the fix lands)

Every PR whose signing round includes first signatures **pastes both lists** in its body: the freshness stale list (`npm run check:122:diff-guard`) and the unsigned-routed rows reported by `consumer-profile.real.test.ts`, each taken before signing and re-taken per round.

## Ruling (2026-10-21)

- 2026-10-21 — **Peter, in chat, verbatim: "Re: erratum text, ratify."** Part 1 (the M1 clause-3 erratum) is **RATIFIED (Peter, 2026-10-21)** as § "The fix" item 1 words it. Clause 3 of ballot `2026-10-01-signing-act-chain` § 2 is rewritten in place with a dated pointer and an Errata entry; the text it replaces is the one quoted under § "The gap" above (whole clause at `b42874bd0`). Part 2 (the sweep change) is built in the same PR. *(Thurgood)*

## Closing

Closes when the erratum is ratified and the sweep change is armed: record the outcome here (dated) and `git mv` this file to `archive/` (README rule 5).

## Outcome (2026-10-21) — ratified, built; closed

- **Ruled**: part 1, the M1 clause-3 erratum, RATIFIED (Peter, 2026-10-21, chat: "Re: erratum text, ratify."; § "Ruling (2026-10-21)" above, `235d8abba`). Ballot § 2 clause 3 reads "the branch's freshness stale list or its unsigned-routed list", rewritten in place; pointers at clause 6, under § 3's table, on § 4.1's link-1 bullet, on the README index line; register `signing-act-consistency` rule in place + history 2026-10-21 (`fd26abb9c`).
- **Built**: part 2, in the PR that carries this outcome (`58dbf90cc`). The freshness sweep prints `stale: N row(s)` and `unsigned-routed: M row(s)` on every run (information, never a finding). `verify-signing-chain --ci` link 1 reads a first signature against the unsigned-routed list of the commit's first-parent tree. Stacy's fixtures FU1–FU32 are built (FU3 at the sweep's grain; FU26 and FU27 as one-time evidence in the PR body; FU24 and FU25 pin today's behavior, forks 3 and 4, not absorbed).
- **Armed at this PR's merge**: the step is inside the required context `122-diff-guard`, so the tightened link 1 governs every PR after the merge. ARMING (instrument path) is Stacy's read at that merge. The interim two-source paste (§ "Interim") retires at the merge; a signing round pastes the one sweep block.
- **Closed** by rule 5 at this PR's merge; archived in the same PR. Forks the build surfaced (voluntary first signatures on rows that CLEAR, signature deletion, the list as a finding) went to the orchestrator for Peter; none is absorbed here. — Thurgood
