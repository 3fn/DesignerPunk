# Operator sheet for Peter — the 16.3.0 trio (four sittings)

**The candidate is already on your machine; you build nothing.** `/Users/3fn/Documents/Work Projects/Kiro/u5-pack/16.3.0/3fn-core-16.3.0.tgz`, with `release-publish-record.json` beside it. Before the first sitting, run `git -C "/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2" fetch origin` so the prompt commit below is present locally (step 0 reads the frozen prompts from it).

**The three values for step 0** (the same in all four sittings). Replace the three `FILL_IN_*` lines in each run's step 0 with:

```sh
COMMIT=430151c01c5a27f52ac1fd57a326410ffad1d9a6
F=bd7e340b37b5c4872b2c3ffcbb1df53cd28c22e7
SHA=7c0fc15745ed7210736e4b20dab3c240ffa3c46e
```

(sha256 `625e7cb5d9b6272a165137646e4ed513efaec02b6a29632e7b1da98eecc23fd3` is for the record only; step 0 checks the sha1 and F.) If step 0 prints `STOP`, stop and tell Leonardo.

**Each sitting.** Open one new macOS Terminal window (not a shell inside the Claude app) and keep it open until the end. Paste the blocks from `tests/onboarding-trio/protocol.md` § 11 (§ 15.3 for sitting 4) one at a time, in step order, waiting for each to finish, and paste each output back to Leonardo's session. Type nothing into a birth or probe session; Ctrl-C only if it repeats one action three times or leaves `/tmp/dp-trio`, and say so. Interactive steps (preflight, open): do not type a task, and note anything you answer. Press Return only in sitting 3, and only when birth shows `Product name:` and has stopped growing (it did for 11 min 26 s at 16.2.0): press Return on the empty prompt, wait for `Abbreviation:`, press Return again, and say so in your paste-back.

| Sitting | Run | Harness | Time at 16.2.0 | Return needed |
|---|---|---|---|---|
| 1 | `trio-1-backend` (§ 11 Run 1, steps 0-10) | Claude Code | 18 min 49 s run time; plan about 30 min with paste-backs | no |
| 2 | `trio-2-designer` (Run 2) | Kiro | 13 min 3 s; plan about 20-25 min | no |
| 3 | `trio-3-pm` (Run 3, bare `init`) | Kiro | 25 min 38 s, of which 11 min 26 s is the `init` wait; plan about 35-40 min | yes, two (name, then abbreviation) |
| 4 | `conformance-kiro` (§ 15.3: setup steps 0-7, identity probes, beat 1 consumer-Thurgood, beat 2 consumer-Stacy, step 12) | Kiro | setup alone 14 min 55 s (16.1.0); beats unmeasured on Kiro (Claude Code at Task 27: beat 1 15 min 11 s, beat 2 4 min 36 s); plan about 40-55 min | no (the launcher births the repo) |

Times are the run clocks in the 16.2.0 records (`out/start.utc` to `out/end.utc`); the paste-back allowance is my estimate, not a measured figure. Sitting 4 is the Kiro conformance pair, a fourth sitting by your ruling (2026-11-09T04:30:59Z; protocol § 17.2). Its beats run strictly in order, beat 2 only after beat 1 returns, in the same window. Its time is the least certain: the beats' Kiro durations and credit cost have never been measured, so treat 40-55 min as a planning figure. Check Kiro credits (`/usage`) before sittings 2, 3 and 4: the 16.2.0 Kiro runs used about 17 of 50, and beat 1 has a 120-turn budget. Suggested order, cheapest first: 2, 3, 4, 1 (any order is valid; each run is independent).
