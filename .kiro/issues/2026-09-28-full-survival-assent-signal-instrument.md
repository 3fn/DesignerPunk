# Issue: the full-survival assent signal — an instrument owed to the claims-pass counting block

**Date**: 2026-09-28
**Status**: ACTIVE
**Owner**: Thurgood, the builder, under the Q5 instrument pattern (`completion-criteria-parity` precedent): Thurgood builds and maintains the instrument. **Stacy specifies the fixtures**, and the reading stays hers.
**Trigger**: **the first post-123 release prep**, meaning the first release whose population follows Spec 123's first render. That is where the event metrics' baselines begin and detection becomes possible (ballot B-U2 § 2, `**populations**`). Sooner if Stacy's MIDPOINT or RELEASE pass asks for it.
**Source**: ballot `.kiro/docs/ballots/2026-09-28-123-b-u2.md`, **RATIFIED (Peter, 2026-09-28)**, F-3 ruling "plus the gap line". It came from the 2026-09-28 consults on F-3's class fix (Thurgood: the proxies; Stacy: the signal; orchestrator: "the record carries the gap").

## Why this file exists

B-U2 put a **gap line** into Stacy's claims-pass counting block (`canonical/agents/stacy.md` § "The claims-pass record", applied at Spec 123 Task 13.8). The line **counts nothing**:

> the **full-survival assent signal** *(routed-row assents whose `surviving` lists every operative item of the unit, per signer)*: **not yet instrumented** — owed to `.kiro/issues/2026-09-28-full-survival-assent-signal-instrument.md`; recorded as `not yet instrumented` in every population until the instrument lands, then counted by erratum to this block

It is the honest-zero pattern: every population records that the signal is not counted, so the absence is visible, never silent. This file is where the instrument that ends it is tracked.

## Scope

1. **Build the instrument.**
   - It is a report-mode command, never a gate. Req 11.5.3's rider applies: *a counted-but-unrouted rate is an observation, not a guard*. It must never be wired into a required check, including `122-diff-guard`'s freshness sweep, which is pass/fail.
   - **Input**: the consumer profile's committed history, meaning signatures committed in a population's delta and reachable from the `refs/pull/<n>/head` of the PRs merged in it (ballot B-U2 § 2, C3's source rule), and the operative-set records.
   - **Output, per signer**: the count of routed-row assents whose `assent.surviving` equals the unit's full operative item set, over that signer's assent events.
   - C17's signature format carries what this needs (row key, `canonicalHash`, `renderedHash`, `assent.surviving`, the commit), so no format change is expected.
2. **Fixtures (Stacy specifies)**:
   - a full-survival assent;
   - a partial one;
   - a refusal, which is not an assent;
   - a carried-forward signature outside the population, which must not be counted;
   - an uncommitted refusal, which is self-attested and not counted.
3. **The erratum.** When the instrument lands, the gap line is replaced by a counted line **by erratum to the counting block**. That is a governance change to Stacy's charter, so it goes through its own ballot or a recorded amendment, never a silent edit.

## Carried with it — the sampling-method note for Spec 123's U2b MIDPOINT (Stacy's call)

**The floor-versus-assent mismatch proxy** is Thurgood's consult read, 2026-09-28.
- **What it flags**: a routed row whose strict mechanical score is low, but whose assent lists half or more of its items as surviving. `tools/agent-generator/regrounding/triviality.ts` (Task 13.4) returns that score and its occurrence witness.
- **Why it matters**: those rows are the ones where survival rests on entailment claims, the riskiest assents.
- **Proposed use**: to **target** Peter's sample of Stacy-signed assents (F-3 (ii)) and Stacy's own spot-checks, so a small sample lands where the risk is.
- **Whose decision**: sample selection is Stacy's pass method, not counting-block text. Whether and how she uses this is her decision; it needs no ballot.
- **Limit, stated**: at MIDPOINT the proxy is hand-computed per signed row, and hand computation is where the S-6 multi-homed command-copy class creeps in. If she adopts it, the command belongs in one place: her command catalog, or this instrument once built.

## Known limits, carried

- **A rote assent on a changed row that reads plausibly is invisible** to this signal and to every proxy considered on 2026-09-28. Only a read catches it.
- Two proxies were also named at the consult and are not built here:
  - **bulk-per-commit** reads high by construction under C1's carve-out, because Stacy's signatures land in her own batched commits;
  - **duplicate evidence bodies**.

  Stacy may ask for either at specification.
- "Assent where the rendering is byte-identical to canonical" was considered and is **structurally zero**: such a unit is outside the C18 entry set, so it is never routed and never signed. It is recorded so it is not re-proposed.

## Filed by

Thurgood, 2026-09-28, at B-U2's ratification (Spec 123 U2b, Task 13).
