# Signatures — `start-up-tasks` consumer profile (C1: signer **Stacy**)

**Rows**: `canonical/profiles/consumer/start-up-tasks.dispositions.yaml`. **Signer**: Stacy. This is an identity doc with no domain owner, so she signs in the C1 carve-out seat: the profile author drafted it, and the counterpart seat signs.
**Rule**: Req 11.6.5e. An item is credited only if the unit's **own** rendering (`canonical/_consumer-output/_canonical/…`) states or entails it. A function that survives only elsewhere earns no credit here. `surviving: []` is itemized.
**Phase two, run 2**, 2026-09-29, Spec 123 Task 15.5.

## `#item-civitas-governance-health-check`

signer: stacy
date: 2026-10-17
row: `canonical/profiles/consumer/always-set/start-up-tasks.dispositions.yaml` · body · `#item-civitas-governance-health-check` (re-pointed; ROUTED)
canonicalHash: sha256:431d69a79f5a20615aeea797e290d1ed6f45e7e887e8bb43b4399336e363098a
renderedHash: sha256:c84daa37ea6b80ee038f8a8ae11571746f3586b266ccb336cd163176df2792b0
verdict: assent — surviving 4/4

**Re-signed 2026-10-17** (prior signature: assent 4/4, 2026-09-29, against `sha256:81d0a007…6c06552b`). Stale because the canonical unit and its rendering both moved: ballot `2026-10-17-no-volatile-metadata-in-signed-units` (RATIFIED, Peter, 2026-10-17, #393) §§ 3.1 and 3.3 replaced the typed marker with a read of the newest health-check record; Thurgood re-authored the overlay and the row's removals (`0274210a8`, `d884d2af0`). renderedHash recomputed from `canonical/_consumer-output/` at this revision with the generator's own `readConsumerSpans` / `renderedHashOf` / `rowSpanSource`.
- **Judged against**: the rendered unit at this revision — *"IF it's been longer than your team's cadence since the newest health-check record, THEN flag: "Governance health check overdue — Thurgood (Civitas steward) should run the health check before proceeding." … Only Thurgood runs the health check; its committed record is the date. All agents read the newest record and flag if overdue."* — and the set re-confirmed at 4 (`bb48fe2fb`).
- **`hc-1` survives, re-grounded**: the overdue test against the newest record, with the team's cadence in place of "30 days". The record-directory path and its `YYYY-MM-DD.md` naming are removed (`subtraction-3`): a consumer repo has no `.kiro/docs/civitas-health-checks/`.
- **`hc-2` survives** without "monthly", as before.
- **`hc-3` survives verbatim, both clauses**: the steward-only run and "its committed record is the date".
- **`hc-4` survives**: "read the newest record and flag if overdue" states the universal read-and-flag duty. "filename" is removed (`subtraction-3`); with no naming convention rendered, how a record carries its date is the team's, and the duty does not depend on it.
- **Observation, not a refusal**: the prior overlay told the consumer where the date lived ("keep its date recorded here"). The new one names a record but not its location, so a consumer team must decide where its health-check records live before an agent can perform the read. That is the ballot's surviving counter-argument (2) as it reaches consumers. Every item is still stated, so the rule credits all four; the disposition is the right one, since any concrete location would be this repo's.

**Prior signature record (superseded, 2026-09-29)**:

> signer: stacy
> date: 2026-09-29
> canonicalHash: sha256:81d0a0079ab252f6cd829b654d963401e76ae66dfc084bb0634844041c06552b
> renderedHash: sha256:31182e31459fb9f012ab3acadf77fa2d5c7ccb72e909a95e32fd51d3e16d0afe
> verdict: assent — surviving 4/4
>
> The exemplar G/G′ unit. `hc-1` survives re-grounded: the team's cadence replaces ">30 days", and the date is kept recorded. `hc-2` survives without "monthly". The last two are verbatim.

## `#item-critical-this-project-uses-jest-not-vitest`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/start-up-tasks.dispositions.yaml` · body · `#item-critical-this-project-uses-jest-not-vitest` (re-pointed; ROUTED)
canonicalHash: sha256:f75f87b00a0dafa053d0b2da2229ab451e79ced7621723927163505605e171d0
renderedHash: sha256:eb82a3054260399f3879a88d3f6f7385542b4bcb071cb7d6ff419012af92eb81
verdict: assent — surviving 3/12; not surviving: `critical-this-projec-3`, `critical-this-projec-4`, `critical-this-projec-5`, `critical-this-projec-6`, `critical-this-projec-7`, `critical-this-projec-8`, `critical-this-projec-9`, `lane-semantics`, `pre-july-void`

`-2` survives as its consumer counterpart: "MUST use the commands your repo defines", which is the right runner and not the wrong one. `-10` survives as "never guess a runner's flags", and `-11` through `-2`'s counterpart. **Not surviving**: this repo's npm scripts, its lane semantics and its July-2026 note. None has a consumer counterpart, and the rendering correctly sends the agent to `package.json`.

## `#item-test-command-selection-guidelines`

signer: stacy
date: 2026-10-19
row: `canonical/profiles/consumer/always-set/start-up-tasks.dispositions.yaml` · body · `#item-test-command-selection-guidelines` (re-pointed; ROUTED)
canonicalHash: sha256:3df356662cb6f1dbb2a10bd046eada681e3cac69ead4d3f3f2ffff6187bc47db
renderedHash: sha256:bbaa8516c8db0c0b8e23f439eb09de243e7b998d2552e90f0031c967a73fbcc5
verdict: assent — surviving 7/10; not surviving: `decision-tree`, `test-command-selecti-9`, `test-command-selecti-10`

**Re-signed 2026-10-19** (prior signature: assent 6/10, 2026-09-29, against `sha256:b4c82938bb3f353c5f5b20b055bddfd411f747dc8ab748e7bbe89cb86c9e6974`; the rendered hash did not move). Stale because the canonical unit moved: ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` S1 (RATIFIED, Peter, 2026-10-18/19) rewrote Start Up Tasks item 5 so a subtask runs targeted tests and the parent branch is scoped to parent tasks (applied at `4f6de10f8`; my C1 re-confirmation at 10 items, `3f4f6b265`). Thurgood moved the overlay pin only (`5842fee82`) and regenerated (`a3f8b6053`); no consumer artifact byte changed.
- **Judged against**: the rendered unit at this revision, `canonical/_consumer-output/_canonical/always-set/start-up-tasks.md`, item 5 — *"WHEN validating a subtask THEN run the tests relevant to the change (not the full suite). WHEN validating a parent task THEN run your repo's full functional suite. WHEN the task involves performance changes THEN also run your performance suites, on an otherwise-idle machine (they are wall-clock-sensitive)."* The fresh render (`generateAll` → `readConsumerSpans` → `renderedHashOf`) gives the same `renderedHash` as the committed row; three pieces, none differs.
- **`test-command-selecti-2` now survives, re-grounded**: the canonical item says a subtask runs targeted tests relevant to the change, not the full suite; the rendering states exactly that. DesignerPunk's `npm test -- <test-file-path>` form and the TCP step pointer are removed (`subtraction-1`): a consumer runs its own runner, which item 4 already sends it to. The 2026-09-29 non-survival of `-2` is resolved by the canonical move, not by the rendering: the tension I flagged then (item 5 against TCP "For SUBTASKS") is closed at the source.
- **`-5`, `-6`, `-7`, `-8`, `-11` and `default-assumption` survive** as before, re-grounded: parent branch (full functional suite), the performance obligations, idle machine, "most parent tasks only need functional validation", and the default.
- **Not surviving, as before**: `decision-tree` (names DesignerPunk's lanes; the overlay carries no tree), `-9` and `-10` (this repo's script facts).
- **Observation, not a refusal**: the rendering does not state `-6`'s "when in doubt, run the broader lane" lean; it keeps the performance branch only, as signed on 2026-09-29, so I read `-6` as surviving on the performance-suites line alone.

**Prior signature record (superseded, 2026-09-29)**:

> signer: stacy
> date: 2026-09-29
> canonicalHash: sha256:b4c82938bb3f353c5f5b20b055bddfd411f747dc8ab748e7bbe89cb86c9e6974
> renderedHash: sha256:bbaa8516c8db0c0b8e23f439eb09de243e7b998d2552e90f0031c967a73fbcc5
> verdict: assent — surviving 6/10; not surviving: `test-command-selecti-2`, `decision-tree`, `test-command-selecti-9`, `test-command-selecti-10`
>
> **Survive**: the parent rule (`-5`), the performance rules (`-6`, `-7`, `-8`, idle machine kept), `-11`, and `default-assumption`, all re-grounded. **Not surviving**: `-9` and `-10` (this repo's script facts) and the decision tree. **`-2` is changed, not re-grounded**: canonical says a regular task runs `npm test` (the full functional lane), while the rendering says "a subtask runs the tests relevant to the change". That matches TCP's subtask rule, so the rendering resolves a tension that exists inside the canonical doc (Start Up Tasks #5 against TCP "For SUBTASKS"). Flagged to Thurgood as a canonical question, not a refusal.

## `#item-starting-a-parent-task-write-its-instruments-block-first`

signer: stacy
date: 2026-10-21
row: `canonical/profiles/consumer/always-set/start-up-tasks.dispositions.yaml` · body · `#item-starting-a-parent-task-write-its-instruments-block-first` (re-pointed; ROUTED)
canonicalHash: sha256:bab2eca6c2b9f830775c12ea924c2ccb0a2899fffad979c2289d262a94200dca
renderedHash: sha256:efcc0cd64ec429ae5f89d12787a4689cb76a6f923ff2867550321faf34d2f717
verdict: assent — surviving 3/6; not surviving: `starting-a-parent-ta-2`, `format-route`, `starting-a-parent-ta-4`

**Re-signed 2026-10-21** (prior signature: assent 3/6, 2026-09-29, against `sha256:450bc8ccda0592e81e09ec9b06ec82b08cf7c6a8512572d7a7674f27df86a2d2`). Stale on the canonical side only, and text-neutrally: item 9 now follows this item in `.kiro/steering/start-up-tasks.md` (ballot `2026-10-20-manual-records-routed-readers`, E1, site 1), so the unit ends in one more newline. I verified that mechanically (the old unit reproduces the old hash; the new unit equals the old plus one trailing `\n`; equal under `trimEnd()`) and re-confirmed the set at 6 items, unchanged (`17702702b`). Thurgood pinned the overlay (`77ea79b0d`). the rendering did not change: renderedHash recomputed at this revision from a fresh temp-tree rendering (`generateAll` → `writeOutputs(<temp dir>)` → `readConsumerSpans` → `renderedHashOf`, via `<scratchpad>/_tmp_render.ts`), 113 of 113 consumer-output files byte-identical to the committed tree, equal to the prior signature's value.
- **Judged against**: the rendered unit at this revision and the unchanged operative set at 6 items.
- **Unchanged from the 2026-09-29 signature**: `write-block`, `missing-stops` and `starting-a-parent-ta-3` survive, re-grounded as signed below; `starting-a-parent-ta-2`, `format-route` and `starting-a-parent-ta-4` are not credited, on the same grounds. Surviving count: 3 of 6.

**Prior signature record (superseded, 2026-09-29)**:

> signer: stacy
> date: 2026-09-29
> row: `canonical/profiles/consumer/always-set/start-up-tasks.dispositions.yaml` · body · `#item-starting-a-parent-task-write-its-instruments-block-first` (re-pointed; ROUTED)
> canonicalHash: sha256:450bc8ccda0592e81e09ec9b06ec82b08cf7c6a8512572d7a7674f27df86a2d2
> renderedHash: sha256:efcc0cd64ec429ae5f89d12787a4689cb76a6f923ff2867550321faf34d2f717
> verdict: assent — surviving 3/6; not surviving: `starting-a-parent-ta-2`, `format-route`, `starting-a-parent-ta-4`
>
> **Survive**: `write-block` (the list, re-grounded without this repo's file path), `missing-stops`, and `-3` (a later gap recorded with its kind, never silently fixed). **Not surviving**: the never-overwrite rule (dropped; it serves this repo's M3 corpus), the format route (this repo's guide), and M4 (keyed to this repo's parser PR).


## `#item-your-open-records`

signer: stacy
date: 2026-10-21
row: `canonical/profiles/consumer/always-set/start-up-tasks.dispositions.yaml` · body · `#item-your-open-records` (no-consumer-counterpart; first signature)
canonicalHash: sha256:42a36743767fe2c303c410d9b9395f8e6ddade32f0934636ed079c11376b9d83
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/9; not surviving: `open-records-run`, `open-records-manual`, `open-records-due`, `open-records-fired`, `open-records-lapse`, `open-records-resolve`, `open-records-broken-pointer`, `open-records-fail-soft`, `open-records-revisit`

No consumer counterpart, confirmed; I agree with the disposition and the cite (`subtraction-1`). The unit is Start Up Tasks item 9, added by ballot `2026-10-20-manual-records-routed-readers` (RATIFIED, Peter, 2026-10-20) E1 (site 1, Thurgood `807b8aba1`), with Peter's two conditions (the fail-soft sentence and the revisit line). I confirmed the set at 9 items (`17702702b`).
- **The cite applies**: the item's first operative sentence names `./scripts/issues-owned.sh <YourName>` by path, a repo-internal tooling invocation, and every other item (the three line states, the Lapse heading, the README rule 3 and 11 references, the broken-pointer report, the fail-soft sentence, the revisit line) is keyed to that command's output and to this repo's root `.kiro/issues/` records. The package ships neither. There is no residue to re-point: without the command, the fail-soft and revisit items have no referent.
- **Rendering, checked**: 0 rendered pieces for this unit in the fresh temp-tree rendering (113 of 113 consumer-output files byte-identical to the committed tree), so the renderedHash is the empty-span hash. A grep of the fresh and committed rendering for `issues-owned` and "open records" returns 0. The consumer's Start Up Tasks ends at item 8. I assent that nothing survives.
