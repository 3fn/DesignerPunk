# Obligation: the signing-act shape review's application PR 2 — F-4 (a)'s disposition pin and the 261 re-signs, before the next release's squash S

**Date**: 2026-11-08
**Owner**: Thurgood (the instrument and the ballot). **Owed acts by others**: the seven signing seats (Ada, Data, Kenya, Leonardo, Lina, Sparky, Stacy) re-sign their rendering-less rows in bound; Lina is consulted on the `derive.ts` change (shared core).
**Trigger**: `release:next:phase-1` — the next RELEASE's phase 1 reads at S that no signed row still pins `sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570`; PR 2 must merge before that release's squash S. Re-ruled to `merge:#<N>` the day PR 2 opens.
**Class**: P2 obligation (guard) · owed-act *(set 2026-11-08, Thurgood, rule 12. `(guard)`: until PR 2 merges, a re-disposition between `no-consumer-counterpart` and `superseded-by`, or a destination change, moves no pinned hash, so a signature can stand over a disposition its signer never judged; the claims pass reads such re-dispositions by hand (ballot § 5, PR 1 step 12). Kind owed-act: Peter ruled F-4 (a) and its two-PR application.)*
**Filed by**: Thurgood, under README rule 10, in application PR 1 of ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md`, which archives the shape-review charter.
**Ruling**: Peter, 2026-11-08T17:45:34Z, "Ratified, F-1 (d), F-2 (b), F-3 (a), F-4 (a)"; Peter, 2026-11-08T19:06:05Z, "Re: Buckets 3 and 4, proceed as the relevant team members recommend" (record `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-rulings-f4-two-pr-and-u3-rehome.md`, item 3).

---

## What PR 2 carries (ballot § 5, "PR 2")

1. **Base**: `main` after PR 1's merge. Merged before the next release's squash S.
2. **The pin**: `tools/agent-generator/derive.ts` — for a row with no rendered span, `renderedHash` is `hashEntry({ disposition, destination })`, `destination` omitted where absent; the sweep and the print mode use it. Lina consulted. Fixture D1, red at its base.
3. **The law text**: the signing-act ballot § 2a's "Re-disposition" paragraph (F-4 (a)'s ruled text, ballot § 11 "PR 2") and S4's line in `governance/signing-seat-brief.md`, with their pointers.
4. **The re-signs**: all signed rendering-less rows go stale at the pin's commit (261 at `929972713`: 237 `no-consumer-counterpart`, 24 `superseded-by`), each in bound for its seat; each act fresh, a seat's own commit, in the § 2a forms (one section per key).
5. **Census**: the ballot's F-4 (a) line (stale 0 → 261 at the pin), re-run at the pin's commit; at the head, `stale: 0`.
6. Lock refresh, `**Edit kind**:` lines, the RS-38 straggler sweep for `derive.ts`, the register history line, `**ARMING**:`.

## Close

PR 2 merges, and this file gets rule 5's outcome line and moves to `archive/` in that PR. A release whose phase 1 finds a signed row still pinning the constant above, with this file open, is a lapse (rule 11).
