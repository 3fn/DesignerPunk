# Task 26 Completion — The two cross-target join runs and the install-doc correction

> **DRAFT (Leonardo, 2026-10-15).** Criteria 1–10 are complete with evidence. **Criterion 11 (the install-doc correction) is PENDING 26.5 (Thurgood)**: he fills its Status and Evidence, re-runs the parity check, and finalizes the header lines and the Validation section.

**Spec**: 123 — Consumer Distribution · **Unit**: U5 — Validation & closeout (`task/123-u5-closeout`; parents 25–28) · **Type**: Documentation · **Validation**: Tier 2
**Agent (plan)**: PRIMARY Leonardo (Opus) — operator; Thurgood (Sonnet) — 26.5 · **Launcher**: Peter (every harness session, from macOS Terminal)
**Delegated-tier**: plan held
**CI-provenance**: local
**Instruments**: 29 listed — exists 18 · built-here 11 · missing 0 · unlisted 2 — .kiro/specs/123-consumer-distribution/completion/task-26-instruments.md
**Traces**: Reqs 15A.4, 15A.1 · design C8, C24, DD8

## Success Criteria

Criteria reproduced verbatim from `tasks.md` @ `042813db1` (L1519–1531). The parity parser (`parseTasksMd` + `normalizedCriteria`) reads **11** rows (the nested sub-bullets count as rows) and 0 malformations. The Instruments block grouped them as six (C1–C6); its rows cover all eleven.

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| **Two join records** (CC-born → Kiro; Kiro-born → CC), each cloned from a **committed born-repo fixture born by `init --target=<t>` from the same packed artifact the join installs** (Leonardo A3), run from a frozen prompt, and carrying `operator-log` and `session-launched-by`. | ✅ verified met | **Records**: `validation/join-cc-to-kiro.md`, `validation/join-kiro-to-cc.md`. **Fixtures**: `tests/onboarding-trio/fixtures/born-cc` (203 files, from `trio-1-backend` @ `3726486`, born `init --target=cc`) and `…/born-kiro` (207 files, from `trio-3-pm`, born `init --target=kiro`), committed in `23be48ee1`. **Same packed artifact**: both trio sources record candidate shasum `aa3efdcf…`; both joins measured `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584` in the clone (`founder-repo:`, `candidate:`). **Cloned**: `git clone` from a launcher-committed origin (`61fdbe5`; `8968026`). **Frozen prompts**: `validation/prompts/join-*.md` @ `23be48ee1`; each run's `out/prompt.md` is byte-identical (`diff`); ancestry exit 0. **`operator-log` / `session-launched-by`**: J9 / J8 in both (schema check below) |
| **Each record carries the joining path's OUTCOME** (Le-T3): | ✅ verified met | the five rows below, in both records (schema check below) |
| a per-step outcome for `joining-cross-harness`'s **6 steps**; | ✅ verified met | `steps-walked:` (J13) in both records: steps 1–6 each with an outcome. Step 1 was done by the launcher; steps 2–5 by the joiner, each with transcript evidence; step 6 by the launcher's `open` |
| findings; | ✅ verified met | `findings:` (J20): J-1–J-6 (`join-cc-to-kiro`); K-1–K-7 (`join-kiro-to-cc`) |
| the forced negative; | ✅ verified met | "**Forced negative, written**" under `findings:` in both records |
| the stop event from the closed vocabulary; | ✅ verified met | `stop:` (J11): 6 and 4 lines, each from protocol § 3's vocabulary (schema check counts them) |
| **one post-restart query answered by an attached agent, with its answer checked against that agent's rendered charter** (24.6's bar in miniature). | ✅ verified met | `post-restart-query:` (J17). Thurgood (Kiro) is checked against `repo/.kiro/agents/thurgood-prompt.md` L4/L8, L376 (`find_docs`) and L53: all three items match. Stacy (CC) is checked against `repo/.claude/agents/stacy.md` L3/L48/L69, L779 (`get_screen_spec`) and L74–77: matches, with two narrowings recorded (domain "product-side"; first-named tool the built-in `Grep`) |
| *"Joined" means the agent answers, not that files exist.* | ✅ verified met | Both J17 verdicts read `joined`, on the agents' answers matched item by item against the renderings, not on file presence |
| **Only clean-state records count as cold.** The table per target × {founder-cold (Task 25), teammate-cold (this task)} reads "observed" or "not observed cold — state not clean". | ✅ verified met | `validation/cold-observation-table.md` (reproduced below). All four cells read **observed**, each citing a clean-state field (F7/J7). `trio-2-designer`'s `cannot-tell` is footnoted and not counted |
| The C8(c) observations are recorded (committed `.claude/settings.json` honored? the gitignored note's `@`-import on a fresh clone?). | ✅ verified met | `c8c-observations:` (J16). **By clone** (`join-cc-to-kiro`'s same-harness probe, a fresh clone before `generate`): the committed `.claude/settings.json` is **not** honored for server enablement (trust prompt, then a separate "3 new MCP servers found … Enable selected"). The missing note's `@`-import is **dropped silently** (`/context` 9 memory files; no warning). **Attach-written** (`join-kiro-to-cc`): the same two prompts; the note loads (10 memory files). Enablement is stored in `.claude/settings.local.json`, ignored only by the launcher's global git ignore |
| **The install doc (via the Integration Guide source, Task 19.4) is corrected only for cells observed cold.** Diff cited. | **PENDING — 26.5 (Thurgood)** | Inputs handed to 26.5: the four observed-cold cells (`validation/cold-observation-table.md`); the approval lines are INSTALL L42, L61, L69, L206, L217 (from the guide's install region L21–254). Thurgood cites the diff and the `scripts/derive-install-doc.ts` regeneration |

Unmet or partially met criteria: criterion 11 is pending 26.5 (Thurgood) at this draft; Thurgood replaces this line at finalization.

## The join schema check (protocol § 14.2)

Run from the worktree root over both records:

```
== .kiro/specs/123-consumer-distribution/validation/join-cc-to-kiro.md
  present  run-id:
  present  frozen-prompt:
  present  founder-repo:
  present  candidate:
  present  target:
  present  source-access:
  present  harness-user-state:
  present  session-launched-by:
  present  operator-log:
  present  budget:
  present  stop:
  present  wall-clock:
  present  steps-walked:
  present  first-MCP-load:
  present  cold-observation:
  present  c8c-observations:
  present  post-restart-query:
  present  discovery:
  present  friction-rows:
  present  findings:
  present  joiner-close:
  stop lines from the vocabulary: 6
  teammate-cold cell well-formed
== .kiro/specs/123-consumer-distribution/validation/join-kiro-to-cc.md
  present  run-id:
  present  frozen-prompt:
  present  founder-repo:
  present  candidate:
  present  target:
  present  source-access:
  present  harness-user-state:
  present  session-launched-by:
  present  operator-log:
  present  budget:
  present  stop:
  present  wall-clock:
  present  steps-walked:
  present  first-MCP-load:
  present  cold-observation:
  present  c8c-observations:
  present  post-restart-query:
  present  discovery:
  present  friction-rows:
  present  findings:
  present  joiner-close:
  stop lines from the vocabulary: 4
  teammate-cold cell well-formed
```

## The cold-observation table (26.4)

From `validation/cold-observation-table.md`:

| Target | founder-cold (Task 25) | teammate-cold (Task 26) |
|---|---|---|
| **cc** | **observed** — `trio-1-backend` F16 | **observed** — `join-kiro-to-cc` J15 |
| **kiro** | **observed** — `trio-3-pm` F16 | **observed** — `join-cc-to-kiro` J15 |

What the cells say:
- **Claude Code** (founder and teammate alike) asks, at first open, to trust the folder, a prompt that surfaces the 40 pre-approvals, and **then separately** to enable the three servers. The allow-list is ignored until trust.
- **Kiro asks nothing**; the three servers run.
- Footnotes (the `trio-2-designer` `cannot-tell`; the same-harness probe; the caveats) are in the table file.

## Routed, not 26.5's (install-doc defects outside the cold cells; for Thurgood's install-doc issue)

The orchestrator ruled (2026-10-15) that these are not 26.5's. The 26.5-widening fork goes to Peter separately.
- **R3-1**: INSTALL § 3 says `init` "stops with an error" where nothing can answer; it hangs in Kiro's shell (`src/cli/init.ts` L188–193). Code owner Lina.
- **J-4 / K-2**: § 7 does not tell a cross-harness joiner to commit what `attach` wrote (`.kiro/` or `.claude/`, `.mcp.json`, `CLAUDE.md`, the manifest change), though COMMIT-POLICY makes them repo state.
- **K-6**: § 7 does not say why a joiner runs `generate` when output is committed (`token-index/` and the personal note are per-machine).
- **J-3 / K-5**: `.claude/settings.local.json` is ignored by nothing DesignerPunk writes (doc, or the `init`/`attach` managed block — Lina).
- **R2-1**: no no-build path in § Web. **R2-3**: `file://` needs a server.
- **R2-6 / R3-9**: "restart your agent session" is not concrete per harness.
- **R3-4**: neither the CLI's `--help` nor `init`'s output points to the guide.
- **R1-1 / R1-2**: the TypeScript-host repairs `init` makes necessary (build break; `dist/` output).
- **R1-6**: INSTALL § 4 says the tokens are "yours wholesale", while the colour palette and theme maps may be read from the package (pending Ada's verification).

## Validation

Measured locally (worktree at `ffa581ff2` plus the uncommitted Task 26 files):
- the join schema check above (all present);
- the trio schema check (§ 9) still passes on the three trio records after the R1-12 erratum;
- `zsh -n` over every § 14.4 block, no errors.

**Pending (Thurgood, at 26.5)**: `npm run test:scripts` (the install-doc body-identity test) after the guide edit and the derive; `npm run check:completion-criteria-parity` over this doc once criterion 11 is filled.

## Additional verification

Primary Artifacts (`validation/join-cc-to-kiro.md`, `validation/join-kiro-to-cc.md`, `governance/DesignerPunk-Integration-Guide.md`): the two records are shipped; **the Integration Guide is pending 26.5**.

**Written outside Task 26's listed Primary Artifacts, and why**:
- `tests/onboarding-trio/fixtures/born-{cc,kiro}/` and `tests/onboarding-trio/protocol.md` § 14: under **Task 25's** Primary Artifacts row (`tests/onboarding-trio/{protocol.md,fixtures/}`), which grants those paths to Leonardo for the unit branch's lifetime (ballot 2026-09-26 § 3 Duration; orchestrator ruling 2026-10-15). **Residual stated so Stacy can judge it**: a claims pass may read a Task-26-motivated edit under a Task-25 row as out-of-list.
- `validation/prompts/join-*.md` and `validation/cold-observation-table.md`: inside the operator's charter scope (`.kiro/specs/**`); the prompts follow the run discipline's prompt pin.
- `validation/trio-1-backend.md`: one dated erratum line on R1-12 (a Task 25 artifact, same grant and residual).
- The completion docs `task-26-{1..4}-completion.md`, this draft, and `task-26-instruments.md`.

**Positive evidence, kept**:
- `generate` on a second machine reproduced the committed platform output byte for byte, in both directions (`design-tokens/` and `dist/tokens/` stayed clean). That is COMMIT-POLICY's determinism claim, observed twice.
- `sync` on the joined Kiro-born repo reported "name contract: clean … 282 managed items unchanged".
