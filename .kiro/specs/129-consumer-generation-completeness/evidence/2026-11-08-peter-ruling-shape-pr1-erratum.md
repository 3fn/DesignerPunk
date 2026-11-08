# Peter delegates the shape-review PR 1 stop to Thurgood and Stacy: their joint pick (a′) and its erratum text

**Recorded by**: the orchestrator. Times are from `date -u` at receipt.

## The exchange

1. **The stop.** Thurgood stopped application PR 1 of the ratified ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md` at its § 5 step 6. The stop record is `.kiro/issues/2026-11-08-shape-review-pr1-stop-first-confirmation-of-a-drafted-unit.md`, on `chore/apply-signing-act-shape-review-pr1` @ `bc9d98764`.
   - What the census found: link 1 changes three verdicts out of 409 acts, but the ratified delta allows one (`7eb517fca`).
   - The other two are both in `17702702b` (#436). That commit holds the confirmer's first note block on operative-set units the drafter added with their `canonicalHash` already set.
   - Under the shipped rule, every newly drafted unit's first confirmation would fail link 1.
2. **What was put to Peter** (orchestrator, 2026-11-08). The record's options:
   - (a) an `unconfirmed` list;
   - (b) change the drafting practice;
   - (c) ratify the two lines and leave the rule.

   Thurgood leaned (a). Stacy's read was pending.
3. **2026-11-08T20:17:31Z**, Peter: **"Let Thurgood and Stacy agree, then go with it"**
4. **The cross-read** (orchestrator-run). Stacy picked (b) plus a link-2 check. She argued that (a) would let a sheet section decide the act kind again, which § 2a was ratified to stop. The orchestrator then proposed (a′) to her. *(a′) is the orchestrator's proposal, not a seat's.* Stacy withdrew (b) and agreed to (a′). Thurgood withdrew (a) and agreed to (a′). Their entries are kept in the orchestrator's scratchpad (`u12/shape-pr1-stop-stacy.md`, `u12/shape-pr1-stop-thurgood-x.md`).
   - **(a′):** on a unit with no note block at the first parent, the confirmer's first note block is the `confirm` kind, in bound on an `unconfirmed` list, only when the record's `canonicalHash` equals the hash the tool computes for the unit's current source. The sheet section never sets the kind.
   - **Census under (a′)** (Thurgood, scratch, the same 409 acts): the delta is exactly `7eb517fca`. Both `17702702b` units read `confirm`, list `unconfirmed`, PASS.
   - **What survives:** the drafter wrote the record-side hash, so equality shows a copy rather than a computation. The pinned object also now differs by state.
   - **Erratum or correction:** both seats read it as an erratum.
5. **The orchestrator asked** whether Peter's words also covered the erratum's text. Stacy had read them as approving the pick, not the text.
6. **2026-11-08T20:21:58Z**, Peter: **"My instruction covers it; go with their text"**

## What was ruled

Peter's two lines, taken together, ratify (a′) and the erratum text that Thurgood and Stacy jointly agree. The erratum goes to the ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md`.
