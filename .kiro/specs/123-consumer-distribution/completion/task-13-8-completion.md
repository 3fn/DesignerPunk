# Task 13.8 Completion — Apply the counting-block edit (regenerate); Stacy's changed unit is confirmed when first recorded at 15.4 (erratum 2026-09-28)

**Spec**: 123 — Consumer Distribution · **Unit**: U2b · **Parent**: Task 13 · **Agent**: Thurgood (Opus). 13.8 is the PRIMARY's; the row gives Lina only 13.0 and 13.4–13.6.

**CI-provenance**: branch-head dispatch @ aca6b32d4112fbc9cc6ba6f47194c3876de65c8c — https://github.com/3fn/DesignerPunk/actions/runs/36416157065, https://github.com/3fn/DesignerPunk/actions/runs/36416164610, https://github.com/3fn/DesignerPunk/actions/runs/36416174208, https://github.com/3fn/DesignerPunk/actions/runs/36416182531, https://github.com/3fn/DesignerPunk/actions/runs/36416191203, https://github.com/3fn/DesignerPunk/actions/runs/36416200426

**Authority**: ballot `.kiro/docs/ballots/2026-09-28-123-b-u2.md` is **RATIFIED (Peter, 2026-09-28)**; the record is `8ef106ac`. The M1 After text applied is the ballot's as final at `9ad0b3b6`: ratified, then amended by `[STACY R3]` and by the 13.8 lint erratum `[STACY R4]`. **The 13.8 commit is `aca6b32d`.**

## What changed

- **`canonical/agents/stacy.md` L419** (§ "The claims-pass record", the counting-block bullet): the substring `; and **M3 / M4 / M5** as standing audit output — the metrics a green gate cannot produce.` is replaced by the ballot's After text, one line. It now carries **re-grounding dispositions** (M1) and ends with the `volatile-ok` marker.
- **Regenerated**: `.claude/agents/stacy.md` and `.kiro/agents/stacy-prompt.md`, as expected. No other generated file changed; the attribution sidecar is unchanged. `canonical/generated.lock` was refreshed by the run and reverted; it is refreshed once, in the parent-13 commit.

## Targeted checks + result (ballot § 5 M1, C8 / C9)

1. **Before-pin.** L419 at `18314055` is byte-equal to L419 on the unit branch. `sha256` is `92d681cea643ea7638df2b9de75eb2a54636582aa34dc9948a4b622fc16c9269`, equal to the pin.
2. **Pattern counts before the edit.** `grep -cFf <before pattern file> canonical/agents/stacy.md` → `1`. `grep -cFf <after pattern file> canonical/agents/stacy.md` → `0`. The pattern files hold the Old substring and the After text, one line each, as the ballot gives them at `9ad0b3b6`.
3. **After the edit.** `grep -cFf <after pattern file> canonical/agents/stacy.md` → **`1`**. The Old substring still counts `1`, because the After text ends with it by construction.
4. **Numstat on the named commit.** `git show --numstat --format= aca6b32d -- canonical/agents/stacy.md` → **`1	1	canonical/agents/stacy.md`**. The same command without the path shows `1 1` each for `.claude/agents/stacy.md` and `.kiro/agents/stacy-prompt.md`, and nothing else. `aca6b32d` stays reachable from `refs/pull/<U2b>/head`.
5. **Regenerate.** `npx tsx tools/agent-generator/generate.ts` → exit 0, `generate: wrote 274 files across 9 guarded roots`.
6. **Diff-guard.** `npm run check:122:diff-guard` → exit 0: `operative-set-freshness: PASS — 4 record(s), 24 unit(s), 4 note(s), 0 dispositions file(s), 0 overlay(s)` then `diff-guard: full-run-green (input-closure-changed)`.
7. **Operative-set record (C9).** The changed unit has no record: `grep -rn "the-claims-pass-record" canonical/operative-sets/ | wc -l` → **`0`**. This was recorded at `18314055` / `refs/pull/232/head`. **No 11.6.5d re-confirmation is owed at 13.8**, per Task 13's erratum (ii), #233, merged as **`6b87c698`**. The unit is recorded and C1-confirmed against this post-edit text at 15.4. Per `[STACY R4]`, its `canonicalHash` will include the marker.
8. **Straggler sweep.**
   - `git grep -l "re-grounding dispositions"` → `canonical/agents/stacy.md`, `.claude/agents/stacy.md`, `.kiro/agents/stacy-prompt.md`, the ballot, **and `.kiro/docs/ballots/README.md`**. The README entry is the ballot's own record; it is reported per the sweep's rule and not edited.
   - `git grep -l "first render — not a baseline"` → `stacy.md` and its two outputs, the ballot, and Spec 123's `tasks.md`, `design.md`, `feedback/design.md` and `feedback/tasks.md`. No stray hit.
9. **CI**: all six dispatched runs concluded `success` at `aca6b32d`: Consumer Guard, 125B Tool-Boot Smoke, Section Citation Guard, Agent Generator (122), Package Name Drift Detection, Lane Timing.

## Application-time adaptations

1. **13.8 first stopped at step 5.** The ratified After text failed `generate`: rule 2, the volatile-fact lint, reads `11.5.3` and similar citations as semver. I reverted and reported, per the ballot's stop-and-report rule. The remedy was the lint's documented `volatile-ok` marker, ruled through a dated ballot erratum with Stacy's reason text (`[STACY R4]`, `9ad0b3b6`). I then re-ran from the pre-checks.
2. **The marker exempts the whole line.** A later addition to this counting-block line must be hand-checked for volatile facts. That is Stacy's residual. It is carried as a lint false-negative class for Thurgood as lint owner, in the parent doc.
3. **`generated.lock`** was reverted, not committed. It is refreshed once, at the parent.
