# Signatures — `start-up-tasks` consumer profile (C1: signer **Stacy**)

**Rows**: `canonical/profiles/consumer/start-up-tasks.dispositions.yaml`. **Signer**: Stacy. This is an identity doc with no domain owner, so she signs in the C1 carve-out seat: the profile author drafted it, and the counterpart seat signs.
**Rule**: Req 11.6.5e. An item is credited only if the unit's **own** rendering (`canonical/_consumer-output/_canonical/…`) states or entails it. A function that survives only elsewhere earns no credit here. `surviving: []` is itemized.
**Phase two, run 2**, 2026-09-29, Spec 123 Task 15.5.

## `#item-civitas-governance-health-check`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/start-up-tasks.dispositions.yaml` · body · `#item-civitas-governance-health-check` (re-pointed; ROUTED)
canonicalHash: sha256:81d0a0079ab252f6cd829b654d963401e76ae66dfc084bb0634844041c06552b
renderedHash: sha256:31182e31459fb9f012ab3acadf77fa2d5c7ccb72e909a95e32fd51d3e16d0afe
verdict: assent — surviving 4/4

The exemplar G/G′ unit. `hc-1` survives re-grounded: the team's cadence replaces ">30 days", and the date is kept recorded. `hc-2` survives without "monthly". The last two are verbatim.

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
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/start-up-tasks.dispositions.yaml` · body · `#item-test-command-selection-guidelines` (re-pointed; ROUTED)
canonicalHash: sha256:b4c82938bb3f353c5f5b20b055bddfd411f747dc8ab748e7bbe89cb86c9e6974
renderedHash: sha256:bbaa8516c8db0c0b8e23f439eb09de243e7b998d2552e90f0031c967a73fbcc5
verdict: assent — surviving 6/10; not surviving: `test-command-selecti-2`, `decision-tree`, `test-command-selecti-9`, `test-command-selecti-10`

**Survive**: the parent rule (`-5`), the performance rules (`-6`, `-7`, `-8`, idle machine kept), `-11`, and `default-assumption`, all re-grounded. **Not surviving**: `-9` and `-10` (this repo's script facts) and the decision tree. **`-2` is changed, not re-grounded**: canonical says a regular task runs `npm test` (the full functional lane), while the rendering says "a subtask runs the tests relevant to the change". That matches TCP's subtask rule, so the rendering resolves a tension that exists inside the canonical doc (Start Up Tasks #5 against TCP "For SUBTASKS"). Flagged to Thurgood as a canonical question, not a refusal.

## `#item-starting-a-parent-task-write-its-instruments-block-first`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/always-set/start-up-tasks.dispositions.yaml` · body · `#item-starting-a-parent-task-write-its-instruments-block-first` (re-pointed; ROUTED)
canonicalHash: sha256:450bc8ccda0592e81e09ec9b06ec82b08cf7c6a8512572d7a7674f27df86a2d2
renderedHash: sha256:efcc0cd64ec429ae5f89d12787a4689cb76a6f923ff2867550321faf34d2f717
verdict: assent — surviving 3/6; not surviving: `starting-a-parent-ta-2`, `format-route`, `starting-a-parent-ta-4`

**Survive**: `write-block` (the list, re-grounded without this repo's file path), `missing-stops`, and `-3` (a later gap recorded with its kind, never silently fixed). **Not surviving**: the never-overwrite rule (dropped; it serves this repo's M3 corpus), the format route (this repo's guide), and M4 (keyed to this repo's parser PR).
