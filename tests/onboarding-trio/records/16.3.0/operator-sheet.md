# Operator sheet for Peter — the 16.3.0 trio (three sittings)

For each sitting: open one new macOS Terminal window (not a shell inside the Claude app) and keep it open until the end. Paste the blocks from `tests/onboarding-trio/protocol.md` § 11 for that run, one at a time, in step order, waiting for each to finish, and paste each output back to Leonardo's session. Step 0 needs three fills (`COMMIT=`, `F=`, `SHA=`), which Leonardo supplies once the candidate exists. Type nothing into a birth or probe session; Ctrl-C only if it repeats one action three times or leaves `/tmp/dp-trio`, and say so. The interactive steps (preflight, open) are for you: do not type a task, and note anything you answer. Press Return only in sitting 3, and only when birth shows `Product name:` and has stopped growing (it did for 11 min 26 s at 16.2.0): press Return on the empty prompt, wait for `Abbreviation:`, press Return again, and say so in your paste-back.

| Sitting | Run | Harness | Time at 16.2.0 | Return needed |
|---|---|---|---|---|
| 1 | `trio-1-backend` (Run 1, steps 0-10) | Claude Code | 18 min 49 s run time; plan about 30 min with paste-backs | no (its Bash tool has no terminal) |
| 2 | `trio-2-designer` (Run 2) | Kiro | 13 min 3 s; plan about 20-25 min | no |
| 3 | `trio-3-pm` (Run 3, bare `init`) | Kiro | 25 min 38 s, of which 11 min 26 s is the `init` wait; plan about 35-40 min | yes, two (name, then abbreviation) |

Times are the run clocks in the 16.2.0 records (`out/start.utc` to `out/end.utc`); the paste-back allowance is my estimate, not a measured figure. Check Kiro credits (`/usage`) before sittings 2 and 3: the 16.2.0 Kiro runs used about 17 of 50. The Kiro conformance pair is not in these three sittings (see protocol § 17.2).
