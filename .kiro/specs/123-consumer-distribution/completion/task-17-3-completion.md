# Task 17.3 Completion — apply the `package-name-scope-drift` rule edit under B-U2 and refresh the lock once

**Spec**: 123 — Consumer Distribution · **Unit**: U2b (Task 17) · **Parent**: Task 17 · **Agent**: Thurgood (Sonnet) — tiered secondary on the row, plan held

**Instruments**: `.kiro/specs/123-consumer-distribution/completion/task-17-instruments.md` rows 3.1–3.5 (and 2.7 for the scoped grep). Row 3.3 (`built here (17.3)`) is resolved in-row, appended, original text intact. No row was MISSING.

**Authority**: ballot `.kiro/docs/ballots/2026-09-28-123-b-u2.md` § 5 "M2, at 17.3" — `**Status**: **RATIFIED (Peter, 2026-09-28)**`, verified before the edit (instruments row 3.1).

## What changed

Three commits on `task/123-u2b-profile`, in this order, none amended:

| Commit | SHA | Paths touched |
|---|---|---|
| A — the law edit | `3bff1ca436e9eb8309afaf4477c5e3a72fb21eba` | `governance/classification-map.md` only (1 line replaced at L686, 1 `history:` line appended at L699) |
| B — the lock | `a221f23d383b559d14dd9d77c0a615160304fbd4` | `canonical/generated.lock` only (1 insertion, 1 deletion) |
| C — this record | the `complete-task.sh --subtask` commit | `.kiro/specs/**` only (this doc, the `tasks.md` 17.3 checkbox, one appended in-row resolution in the instruments block) |

1. **Byte-equality, before the edit (M2 step 1).** `sed -n '686p' governance/classification-map.md | tr -d '\n' | shasum -a 256` returned `c3ad9201c37a6b2acf70ed954667ef47c3dfed93eb3ac9b5157aad8a4b1cacc5`, equal to the ballot's pin. The line was still L686. Check passed, so the edit proceeded.
2. **Commit A.** L686 `rule:` replaced by B-U2 § 3's After text (`governance/, .kiro/steering/, src/, .kiro/agents/, dist/`), and one `history:` line appended to the same entry, dated 2026-10-02 (the application date), `by: thurgood`, change text byte-exact to § 3 (option B form). `git diff -U0` showed exactly the two hunks (`-686 +686`, `+699`). **L686 hash before** `c3ad9201c37a6b2acf70ed954667ef47c3dfed93eb3ac9b5157aad8a4b1cacc5` · **after** `ab95a1ac980aa10d96e031ead5cd6dbfb5b369a01dd1650e5a2352210681ca69`.
3. **Commit B.** From a tree where `git status --porcelain` was EMPTY (commit A in), `npm run check:122:diff-guard` ran. Guard's own closing lines (the MCP boot chatter omitted):
   - `operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)`
   - `diff-guard: full-run-green (input-closure-changed)`

   The lock diff (`git diff canonical/generated.lock`), whole:
   ```
   -  "inputClosure": "3842f151b0e56ff5b4e3552e0a24be70a7d16f0cd39ed0cb7ed0aaf7e077bdeb",
   +  "inputClosure": "f26cc92041771cb9b70c571d93b4db3a1615da3597a6c7e1ec883f348b9541ca",
      "outputs": "48cdb3318c0cf53968d37fe268b75cabc1b7bddf6322a0b08f7a70fde6210100"
   ```
   `inputClosure` moved `3842f151…77bdeb` → `f26cc920…9541ca`; **`outputs` did not move** (`48cdb331…210100` both sides); `git status --porcelain` after the run listed only `canonical/generated.lock`. This is a refresh, not a stop condition. The lock was not hand-edited.
4. **Re-run after commit B (the parent-close property, early read).** `git status --porcelain` empty before and after; `npm run check:122:diff-guard` printed `operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)` and `diff-guard: no-op-green`. No lock diff.
5. **Commit C's path is outside the lock's input closure.** Read from `tools/agent-generator/diff-guard.ts` (`INPUT_CLOSURE_ROOTS`: `canonical`, `skills`, `tools/agent-generator`, `mcp-server/src`, `application-mcp-server/src`, `product-mcp-server/src`, `governance`, `.kiro/steering`; `INPUT_CLOSURE_FILES`: `package.json`, `.kiro/hooks/complete-task.sh`). `.kiro/specs/**` is in none of them, so commit C does not stale the lock. The re-run after C is the orchestrator's parent-close read.

## Targeted checks and exact results

**Run:**
- M2 step 4 scoped grep, `git grep -n "product-template" -- governance/ .kiro/steering/` — **exactly two hits, as expected**:
  - `governance/MCP-Evolution-Roadmap.md:217:- **Reference sweep (first-party):** retargeted to \`find_docs\` across the verifi…` (the Roadmap bullet, HISTORICAL, Req 14.5.5, unedited)
  - `governance/classification-map.md:699:  - { date: 2026-10-02, change: "rule enumeration updated under ballot 2026-09-28-1…` (the history line commit A appended)
- `npm run check:section-citations` → `RESULT: PASS — every MCP citation resolves (doc + heading).` (191 citations checked, 83 served docs indexed.)
- `npm run check:drift` → `✓ No package name drift detected (3402 files scanned)`; scanning `governance, .kiro/steering, src, .kiro/agents, dist`. A local `dist/` existed on this checkout, so this local result differs from CI's no-`dist/` measurement in scope only.
- `npx jest --config scripts/jest.config.js` (= `npm run test:scripts`) → 12 suites passed, 221 tests passed.
- `bash tools/agent-generator/verify-gate-registration.sh` → `PASS: all 18 required contexts present, count-asserted (N=18 recorded in this script)`.

**Derived by reading, not run:**
- Register consumers of `classification-map.md` (`scripts/check-completion-criteria-parity.ts`, `scripts/check-section-citations.ts`, `tools/agent-generator/verify-gate-registration.sh`): the edit touched one `rule:` string and added one `history:` line inside an existing `package-name-scope-drift` yaml block, with no new row, no `check_state` change and no heading change. The section-citation guard and the gate-registration script were run (above); the parity checker was not run.
- `tools/agent-generator/__tests__/sweep-1-refs.test.ts` (and the other `test:agent-generator` suites) were not run: the root jest config does not match that path, and the generator's own sweep ran inside the guard's full run (green).
- The 17.4 parity test (rule ↔ `SCAN_DIRS`) does not exist yet and was not written. By reading, the rule's group now lists `governance, .kiro/steering, src, .kiro/agents, dist` and the drift script's printed `Scanning:` line lists the same five, so 17.4 should start green.
- The docs MCP index was not rebuilt (`rebuild_index` is owed after U2b merges, not now).

## Application-time adaptations

none.

## Out-of-scope notes

No other governance line was touched; `.github/**`, the generator, the diff-guard source and the register's other rows are unchanged. No re-sign. Task 18 untouched.
