# Task 26 Completion — The two cross-target join runs and the install-doc correction

> **Finalized at 26.5 (Thurgood, 2026-10-15).** Criteria 1–10 are Leonardo's (drafted 2026-10-15); criterion 11, the install-doc diff, the Validation results and the header lines below are Thurgood's at 26.5.

**Spec**: 123 — Consumer Distribution · **Unit**: U5 — Validation & closeout (`task/123-u5-closeout`; parents 25–28) · **Type**: Documentation · **Validation**: Tier 2
**Agent (plan)**: PRIMARY Leonardo (Opus) — operator; Thurgood (Sonnet) — 26.5 · **Launcher**: Peter (every harness session, from macOS Terminal)
**Delegated-tier**: planned Leonardo (Opus) primary; Thurgood (Sonnet) — 26.5 → actual Leonardo (Opus) primary; Thurgood (Opus) — 26.5 — 26.5 ran in the Thurgood (Opus) seat the orchestrator was already continuing across U5 (Tasks 28 instruments, the Task 25 amendment), not on a re-estimate of its demand; class: agent-evolution — corrected 2026-10-15 (CL-4; § Erratum 2026-10-15)
**CI-provenance**: branch-head dispatch @ 992e2ae3640c83c6f61fb05c3d488ee6ab40bd68 — https://github.com/3fn/DesignerPunk/actions/runs/38680957753, https://github.com/3fn/DesignerPunk/actions/runs/38680963631, https://github.com/3fn/DesignerPunk/actions/runs/38680969724, https://github.com/3fn/DesignerPunk/actions/runs/38680975496, https://github.com/3fn/DesignerPunk/actions/runs/38680981385, https://github.com/3fn/DesignerPunk/actions/runs/38680986769 *(all six completed success, read 2026-10-15, after main @ #361 was merged in at 90df66638; the 26.1 checkpoint dispatch at 23be48ee1 had Lane Timing FAIL on the fixture jest config, fixed by #361 — local runs are listed in § Validation)*
**Instruments**: 30 listed — exists 18 · built-here 12 · missing 0 · unlisted 2 — .kiro/specs/123-consumer-distribution/completion/task-26-instruments.md
**Traces**: Reqs 15A.4, 15A.1 · design C8, C24, DD8

## Success Criteria

Criteria reproduced verbatim from `tasks.md` @ `042813db1` (L1519–1531). The parity parser (`parseTasksMd` + `normalizedCriteria`) reads **11** rows (the nested sub-bullets count as rows) and 0 malformations. The Instruments block grouped them as six (C1–C6); its rows cover all eleven.

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| **Two join records** (CC-born → Kiro; Kiro-born → CC), each cloned from a **committed born-repo fixture born by `init --target=<t>` from the same packed artifact the join installs** (Leonardo A3), run from a frozen prompt, and carrying `operator-log` and `session-launched-by`. | ✅ verified met | **Records**: `validation/join-cc-to-kiro.md`, `validation/join-kiro-to-cc.md`. **Fixtures**: `tests/onboarding-trio/fixtures/born-cc` (203 files, from `trio-1-backend` @ `3726486`, born `init --target=cc`) and `…/born-kiro` (207 files, from `trio-3-pm`, born `init --target=kiro`), committed in `23be48ee1`. **Same packed artifact**: both trio sources record candidate shasum `aa3efdcf…`; both joins measured `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584` in the clone (`founder-repo:`, `candidate:`). **Cloned**: `git clone` from a launcher-committed origin (`61fdbe5`; `8968026`). **Frozen prompts**: `validation/prompts/join-*.md` @ `23be48ee1`; each run's `out/prompt.md` is byte-identical (`diff`); ancestry exit 0. **`operator-log` / `session-launched-by`**: J9 / J8 in both (schema check below) |
| **Each record carries the joining path's OUTCOME** (Le-T3): | ✅ verified met | `validation/join-cc-to-kiro.md` + `validation/join-kiro-to-cc.md`: the five rows below, in both records (schema check below) |
| a per-step outcome for `joining-cross-harness`'s **6 steps**; | ✅ verified met | `validation/join-cc-to-kiro.md` + `validation/join-kiro-to-cc.md`: `steps-walked:` (J13) in both records: steps 1–6 each with an outcome. Step 1 was done by the launcher; steps 2–5 by the joiner, each with transcript evidence; step 6 by the launcher's `open` |
| findings; | ✅ verified met | `validation/join-cc-to-kiro.md` + `validation/join-kiro-to-cc.md`: `findings:` (J20): J-1–J-6 (`join-cc-to-kiro`); K-1–K-7 (`join-kiro-to-cc`) |
| the forced negative; | ✅ verified met | `validation/join-cc-to-kiro.md` + `validation/join-kiro-to-cc.md`: "**Forced negative, written**" under `findings:` in both records |
| the stop event from the closed vocabulary; | ✅ verified met | `validation/join-cc-to-kiro.md` + `validation/join-kiro-to-cc.md`: `stop:` (J11): 6 and 4 lines, each from protocol § 3's vocabulary (schema check counts them) |
| **one post-restart query answered by an attached agent, with its answer checked against that agent's rendered charter** (24.6's bar in miniature). | ✅ verified met | `post-restart-query:` (J17). Thurgood (Kiro) is checked against `repo/.kiro/agents/thurgood-prompt.md` L4/L8, L376 (`find_docs`) and L53: all three items match. Stacy (CC) is checked against `repo/.claude/agents/stacy.md` L3/L48/L69, L779 (`get_screen_spec`) and L74–77: matches, with two narrowings recorded (domain "product-side"; first-named tool the built-in `Grep`) |
| *"Joined" means the agent answers, not that files exist.* | ✅ verified met | `validation/join-cc-to-kiro.md` + `validation/join-kiro-to-cc.md`: Both J17 verdicts read `joined`, on the agents' answers matched item by item against the renderings, not on file presence |
| **Only clean-state records count as cold.** The table per target × {founder-cold (Task 25), teammate-cold (this task)} reads "observed" or "not observed cold — state not clean". | ✅ verified met | `validation/cold-observation-table.md` (reproduced below). All four cells read **observed**, each citing a clean-state field (F7/J7). `trio-2-designer`'s `cannot-tell` is footnoted and not counted |
| The C8(c) observations are recorded (committed `.claude/settings.json` honored? the gitignored note's `@`-import on a fresh clone?). | ✅ verified met | `c8c-observations:` (J16). **By clone** (`join-cc-to-kiro`'s same-harness probe, a fresh clone before `generate`): the committed `.claude/settings.json` is **not** honored for server enablement (trust prompt, then a separate "3 new MCP servers found … Enable selected"). The missing note's `@`-import is **dropped silently** (`/context` 9 memory files; no warning). **Attach-written** (`join-kiro-to-cc`): the same two prompts; the note loads (10 memory files). Enablement is stored in `.claude/settings.local.json`, ignored only by the launcher's global git ignore |
| **The install doc (via the Integration Guide source, Task 19.4) is corrected only for cells observed cold.** Diff cited. | ✅ verified met | **Diff** (26.5, `task-26-5-completion.md`): `governance/DesignerPunk-Integration-Guide.md` +4/−4 at L75 (§ 3 step 5), L83 (§ 3 "Step 5, the restart, and why"), L220 (§ 7 step 5), L231 (§ 7 cross-harness step 6). The harness-agnostic approval line is replaced by the observed truth per target, which the cold-observation table records for all four cells (cc and kiro × founder-cold and teammate-cold): Claude Code asks for folder trust, then to enable the three servers; Kiro asks nothing. `docs/consumer/INSTALL.md` is regenerated by `npx tsx scripts/derive-install-doc.ts` (+4/−4). **Only observed cells**: § 2 (`--reference`) is unchanged because no counted cell is the reference posture, and the README and `init`'s refusal message are not the install doc. Hunks are reproduced in § "The install-doc diff (26.5)" below. `npm run test:scripts` 19 suites / 454 passed |

Unmet or partially met criteria: None

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
- **Added at 26.5**: the root `README.md` Getting Started list and `init`'s refusal message (`src/cli/shared/errorCatalog.ts` L99) still carry the harness-agnostic approval sentence. Neither is the install doc.

**Where these go** (Thurgood, 26.5): all of the above, R2-6 / R3-9 included, go to Thurgood's separate install-doc fix PR, per Peter's ruling of 2026-10-15 (option 1). 26.5 corrects only the approval line in the observed cells, so it addresses R2-6 / R3-9 only in part: what each harness asks, not how to restart it.

**Post-unit obligation**: `governance/**` changed in U5 (this diff), so the docs-MCP `rebuild_index` is owed after U5 merges. `tasks.md` L359 lists only U1, U2b, U3 and U4, but its stated reason applies here.

## The install-doc diff (26.5)

`git diff --stat` (worktree at `76f281e3f` plus the 26.5 edits):
```
 docs/consumer/INSTALL.md                     |  8 ++++----
 governance/DesignerPunk-Integration-Guide.md |  8 ++++----
 scripts/__tests__/install-doc.test.ts        | 26 +++++++++++++++++++++-----
 3 files changed, 29 insertions(+), 13 deletions(-)
```
The guide's hunks (`git diff -U0`; `docs/consumer/INSTALL.md` carries the same four lines, derived):
```diff
@@ -75 +75 @@ Use this posture when you want a design system of your own. These are the five s
-5. Restart your agent session (approve DesignerPunk's MCP servers if asked).
+5. Restart your agent session. Claude Code then asks you to trust the folder and to enable DesignerPunk's three MCP servers: accept both. Kiro asks nothing.
@@ -83 +83 @@ Use this posture when you want a design system of your own. These are the five s
-**Step 5, the restart, and why.** Your agent tool loads its MCP configuration when a session starts. The session that ran `init` cannot see the servers `init` just configured, so its first queries would fail. **This is a rule, not a one-off**: any later change to the MCP configuration, such as adding a server or updating the package, also needs a new session. Some tools ask you once to approve project-declared MCP servers; approve DesignerPunk's.
+**Step 5, the restart, and why.** Your agent tool loads its MCP configuration when a session starts. The session that ran `init` cannot see the servers `init` just configured, so its first queries would fail. **This is a rule, not a one-off**: any later change to the MCP configuration, such as adding a server or updating the package, also needs a new session. On first open, Claude Code asks twice. First it asks whether you trust the folder, and lists the tool permissions DesignerPunk pre-approved in `.claude/settings.json`; until you trust the folder, it ignores them. Then it asks which of the three new MCP servers to enable. All three are selected, so choose "Enable selected". It keeps that choice per clone, so each person answers once. Kiro asks nothing: the servers run on first open, with their read-only tools pre-approved in `.kiro/settings/mcp.json`.
@@ -220 +220 @@ To join a design system someone else birthed:
-5. Restart your agent session (approve DesignerPunk's MCP servers if asked).
+5. Restart your agent session. Claude Code then asks you to trust the folder and to enable DesignerPunk's three MCP servers: accept both. Kiro asks nothing.
@@ -231 +231 @@ Your note is your own. You never inherit the founder's: it stays on each person'
-6. Restart your agent session (approve DesignerPunk's MCP servers if asked).
+6. Restart your agent session. Claude Code then asks you to trust the folder and to enable DesignerPunk's three MCP servers: accept both. Kiro asks nothing.
```

## Validation

Measured locally (worktree at `ffa581ff2` plus the uncommitted Task 26 files):
- the join schema check above (all present);
- the trio schema check (§ 9) still passes on the three trio records after the R1-12 erratum;
- `zsh -n` over every § 14.4 block, no errors.

**At 26.5 (Thurgood), measured locally in the worktree** (`76f281e3f` plus the 26.5 edits):
- `npx tsx scripts/derive-install-doc.ts` → "wrote docs/consumer/INSTALL.md from governance/DesignerPunk-Integration-Guide.md".
- `npm run test:scripts` → `Test Suites: 19 passed, 19 total` · `Tests: 454 passed, 454 total`.
- `src/cli/__tests__/init.test.ts` + `errorCatalog.test.ts` → 2 suites, 91 passed.
- `node scripts/validate-steering-metadata.js` → the guide reads "Valid metadata"; 0 errors in the corpus; id-uniqueness PASS.
- `npm run -s check:completion-criteria-parity | grep -E "parent 26|SUMMARY"` (uncommitted state, before the orchestrator's commit):
```
  association: parent 26 ← block at line 1519
  parent 26: PASS
SUMMARY: parents evaluated 32, pass 32, fail 0; emissions 0; reds 0
```
  The first run read RED: six Evidence cells (rows 2–6 and 8) were prose-only, and the Additional-verification line did not open `Primary Artifacts:`. Thurgood prefixed those six cells with the two record paths, leaving Leonardo's text after the prefix unchanged, and re-led the artifact line. The second run is the paste above.

## Additional verification

Primary Artifacts: all shipped as declared. `validation/join-cc-to-kiro.md` and `validation/join-kiro-to-cc.md` are the two records; `governance/DesignerPunk-Integration-Guide.md` is edited at 26.5 (diff above).

**Written outside Task 26's listed Primary Artifacts, and why**:
- `tests/onboarding-trio/fixtures/born-{cc,kiro}/` and `tests/onboarding-trio/protocol.md` § 14: under **Task 25's** Primary Artifacts row (`tests/onboarding-trio/{protocol.md,fixtures/}`), which grants those paths to Leonardo for the unit branch's lifetime (ballot 2026-09-26 § 3 Duration; orchestrator ruling 2026-10-15). **Residual stated so Stacy can judge it**: a claims pass may read a Task-26-motivated edit under a Task-25 row as out-of-list.
- `validation/prompts/join-*.md` and `validation/cold-observation-table.md`: inside the operator's charter scope (`.kiro/specs/**`); the prompts follow the run discipline's prompt pin.
- `validation/trio-1-backend.md`: one dated erratum line on R1-12 (a Task 25 artifact, same grant and residual).
- The completion docs `task-26-{1..5}-completion.md`, this doc, and `task-26-instruments.md`.
- **26.5 (Thurgood)**: `docs/consumer/INSTALL.md`, which is derived from the guide's install region by `scripts/derive-install-doc.ts` (the criterion's "via the Integration Guide source"), and `scripts/__tests__/install-doc.test.ts`. That test is a Task 19 artifact: its C4 assertion pinned the agnostic sentence on every path list, and design C8 makes it U5's to supersede. Both are recorded as adaptations in `task-26-5-completion.md`.

**Positive evidence, kept**:
- `generate` on a second machine reproduced the committed platform output byte for byte, in both directions (`design-tokens/` and `dist/tokens/` stayed clean). That is COMMIT-POLICY's determinism claim, observed twice.
- `sync` on the joined Kiro-born repo reported "name contract: clean … 282 managed items unchanged".

## Erratum 2026-10-15

*Found by Stacy's CLOSEOUT pass (`completion/claims-pass.md`, findings CL-2, CL-3 and CL-4, all Low); recorded under the release-4 rulings, item 21 (`completion/release-4-rulings-2026-10-15.md`). **No Status changes, and no criterion text changes.** Two header lines are corrected in place, and each is marked there. The original wording is recorded below.*

- **CL-2** — the `**Instruments**:` header line (written at 26.5).
  - **Was**: `29 listed — exists 18 · built-here 11 · missing 0 · unlisted 2`
  - **Is**: `30 listed — exists 18 · built-here 12 · missing 0 · unlisted 2`. `task-26-instruments.md` has 30 final-state rows (E 18, B 12) plus one uncounted `none —` row. The header left out row 6.4, `built here (26.4) — see row 4.3`, a cross-reference row. The guide counts rows, not distinct instruments, so it counts. I recounted the block with a script.
- **CL-4** — the `**Delegated-tier**:` line's class.
  - **Was**: `…; class: model-evolution`
  - **Is**: `…; class: agent-evolution`. The line's own reason says the tier moved because an existing Thurgood (Opus) seat was continued, "not on a re-estimate of its demand". `model-evolution` means the cognitive-demand estimate was off, so the label sent model-tier recalibration a demand signal that did not happen. The cause was a routing choice (which seat ran 26.5), so `agent-evolution` is the nearer label. It is not an exact one: the vocabulary has no class for seat continuity. That gap is RS-20 (a), queued (the outcome line on `claims-pass.md`).
- **CL-3** — **acknowledged.** 26.5 wrote two paths outside Task 26's Primary Artifacts and outside my charter's write scope: `docs/consumer/INSTALL.md` (+4/−4, derived from the guide by `scripts/derive-install-doc.ts`) and `scripts/__tests__/install-doc.test.ts` (+23/−5). Both were declared at the time (§ "Additional verification"; `task-26-5-completion.md`). The finding stands as recorded: declaring an out-of-list write does not bring it into the list. No remedy is owed beyond this record. The class (a criterion whose object is a derived artifact names only the source) recurs from MIDPOINT MP-6 and is queued as RS-21.
