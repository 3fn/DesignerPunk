# Task 25 Completion — The persona trio

**Spec**: 123 — Consumer Distribution · **Unit**: U5 — Validation & closeout (`task/123-u5-closeout`; parents 25–28) · **Type**: Documentation · **Validation**: Tier 2
**Agent (plan)**: PRIMARY Leonardo (Opus) — operator · **Launcher**: Peter (every harness session, from macOS Terminal; ruling 2026-10-14)
**Delegated-tier**: plan held
**CI-provenance**: branch-head dispatch @ 042813db1adf7d4fe6fca890099877e22f8b3c33 — https://github.com/3fn/DesignerPunk/actions/runs/38676261101, https://github.com/3fn/DesignerPunk/actions/runs/38676266677, https://github.com/3fn/DesignerPunk/actions/runs/38676272606, https://github.com/3fn/DesignerPunk/actions/runs/38676278195, https://github.com/3fn/DesignerPunk/actions/runs/38676284610, https://github.com/3fn/DesignerPunk/actions/runs/38676290797 *(all six completed success, read 2026-10-15; replaced `local` in a docs-only commit after the dispatch — local runs are listed in § Validation)*
**Instruments**: 37 listed — exists 17 · built-here 20 · missing 0 · unlisted 6 — .kiro/specs/123-consumer-distribution/completion/task-25-instruments.md
**Traces**: Reqs 22, 23, 24.2a, 25.1, 25.5, 15B.3 · design C30
**Status normalisation (2026-10-19)**: Status cells normalised to mark-only per D-2 (completion guide status-marks line, ballot 2026-10-18-sitting-2 S4; Peter: Option 1); verdicts and Evidence unchanged. — Leonardo

## Success Criteria

Criteria reproduced verbatim from `tasks.md` @ `bb08de731` (L1499–1504, criterion 3 as amended 2026-10-14). The parity parser (`parseTasksMd` + `normalizedCriteria`) reads 6 rows and 0 malformations.

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Three records at `.kiro/specs/123-consumer-distribution/validation/trio-<n>-<persona>.md`. Each runs against a packed install with no source access, on its committed fixture, **from its frozen prompt**. Both targets appear. | ✅ | **Records**: `validation/trio-1-backend.md`, `validation/trio-2-designer.md`, `validation/trio-3-pm.md`. **Packed install**: each record's `candidate:` gives the measured shasum `aa3efdcf9ce3c2689c2e5979932c48a46f3f6584` and `package-lock.json` `"resolved": "file:.pack/3fn-core-15.1.0.tgz"`. **No source access**: each record's `source-access:` lists audit hits 3 / 1 / 1, all `read-of-shipped-text` package self-references; access attempts 0. **Committed fixtures**: `tests/onboarding-trio/fixtures/{a-ts-service,b-static-site,c-near-empty}`, extracted by `git archive` at the launch commit (each record's `fixture:`). **Frozen prompts**: `validation/prompts/trio-*.md` in `30f72d628`; each run's `out/prompt.md` is byte-identical to it (`diff`, no output); `git merge-base --is-ancestor 30f72d628 f81b9bc57` → exit 0 (`task-25-5-completion.md`). **Both targets**: `cc` (`trio-1-backend`, Claude Code 2.1.300) and `kiro` (`trio-2-designer`, `trio-3-pm`, kiro-cli 2.12.1) |
| **Every record carries every C30 field, plus `operator-log`, `session-launched-by` and `subject:` tags**, with the field list reproduced. **Schema check scope: it establishes field presence, not observation quality** (S-T-A3). The forced negative per persona is what makes an empty findings list auditable, and Stacy's CLOSEOUT reads the operator logs' content and the `subject: leonardo` findings. | ✅ | **The schema check** (protocol § 9 block, run over all three records; output pasted in `task-25-5-completion.md`) → all 25 labels `present` in each record, including `operator-log:`, `session-launched-by:`, `first-MCP-load:`, `harness-user-state:`, `c8c-observations:`, `cold-observation:` (well-formed in all three), `15B.3:`, `budget:`, `wall-clock:` and `stop:` (6 / 5 / 4 vocabulary stop lines). **Field list reproduced**: each record's header "Field list" paragraph (protocol § 8.1). **`subject:` tags**: each record's `findings:` preamble (`subject: leonardo` none in runs 1–2; R3-5, R3-6 and R3-7 in `trio-3-pm`). **Forced negative per persona**: each record's "Forced negative, written" line under `findings:` |
| **"Not exercised" reasons use Kenya's and Data's corrected wording**: *"Kenya unexercised — no supported native component consumption path (INSTALL.md § iOS: reference source, not a build input)"* and *"Data unexercised — no supported native component consumption path (INSTALL.md § Android: reference source, not a build input; no Gradle module; LocalDPTheme undefined)"* (never "for want of a platform fixture"). Each record also carries a per-run `host-toolchain (ios\|android): …` line, recorded as a fact with its commands and exit codes, never as the reason. *(amendment 2026-10-14 — Peter RULED (b), orchestrator's O-1 fork; consulted Kenya, Data (both hold (b), cross-read), Leonardo)* | ✅ | **The schema check** (`task-25-5-completion.md`) → "Kenya string verbatim", "Data string verbatim" and "forbidden wording absent" for each of the three records. **Host facts**: each record's `host-toolchain (ios):` / `host-toolchain (android):` fields carry the fact lines with every command and exit code from that run's `out/host.txt` (e.g. `swiftc --version` → Swift 6.2, exit 0; `command -v gradle` → exit 1). The `sample:` field states that they are facts, not reasons |
| Budgets are agent turns ≥ 3× the declared `path-steps`; `budget-exhausted` is a finding. | ✅ | **Budget**: birth 40 turns = 8× founder `path-steps` 5 (`docs/consumer/INSTALL.md` L2 front matter; floor 15). It is recorded with its multiple in each record's `budget:` (turns used 41 / 10 / 15). **`budget-exhausted` is a finding**: protocol § 3 ("a FINDING, never a pass"); no session exhausted a budget. **The enforcement gap is recorded, not hidden**: Claude Code 2.1.300 accepts `--max-turns` but does not enforce it (41 under 40; 52 under 30), finding R1-11; kiro-cli has no turn limit (budget observed). Protocol § 4 and Instruments `## Found later` (row 4.2) carry it |
| **Persona (c) runs bare `init` in Kiro** (still counting toward Kiro), and her record states whether 15B.3's distinction held (evidence quoted). | ✅ | `validation/trio-3-pm.md`: **bare `init`**: `birth.txt`, "I will run the following command: npx designerpunk init" → the DD9 notice (`target:`, `path-steps-walked:`). **Counts toward Kiro**: the run's harness was kiro-cli, and her born repo has `.kiro/` and no `.claude/`. **15B.3**: the `15B.3:` field, "Held — in behaviour; not tested as teaching", with quotes ("Now it says I need to run npx designerpunk generate as the first next step"; her close) and the scope stated: she never read INSTALL (R3-4) |
| **DD9 re-read, scoped** (Leonardo A1): it states whether a founder who got the wrong default **recovered via the notice**, and states that it **cannot** establish which harness is the majority. | ✅ | `validation/trio-3-pm.md` `dd9:` and `task-25-5-completion.md` § "The scoped DD9 re-read". "Recovered via the notice, combined with `--help`; the notice's own command was not used", with quotes ("It told me that since I'm using Kiro…"; "…just like the first run told me."). The notice's limit is R3-3. "What this run cannot establish: which harness is the majority … n = 1" |

Unmet or partially met criteria: None

## What the trio found (for the reader; the records are the evidence)

Findings are recorded per persona and attributed to an axis (Req 25.1). The heaviest, with their proposed owners:
- **R1-6 (Ada)**: consumer-Ada reports that the born repo's colour palette and theme maps are inert, because `generate` reads the package's own copies. Partly checked (`src/generators/generateTokenFiles.ts` L18–22). If it holds, a founder cannot set a brand colour.
- **R3-1 (Lina)**: `init` prompts on stdin with no terminal check (`src/cli/init.ts` L188–193), so a bare `init` run by an agent in Kiro hangs. INSTALL § 3 says it stops with an error.
- **R3-5 (Thurgood, consumer profile; `subject: leonardo`)**: consumer-Leonardo's rendered write scope is `specs/**` only, so his screen specs land where `find_screens` cannot read them.
- **R2-2 (Thurgood, consumer profile; Lina, browser guide)**: consumer-Sparky's charter and the browser guide point a no-build site at DesignerPunk's base tokens, not the founder's generated tokens.
- **R1-1 / R1-2 / R2-4 / R2-5 (Lina)**: `init` breaks a TypeScript host's build, writes output into `dist/`, scaffolds jest and TypeScript into a static site, and creates a `.gitignore` that misses `node_modules/`.
- **R2-1 / R3-4 (Thurgood)**: there is no no-build path in INSTALL, and neither the CLI's `--help` nor `init`'s output points to the guide.

Cold observations: `cc founder-cold: observed` (run 1); `kiro founder-cold: cannot-tell` (run 2, capture overwritten) and `observed` (run 3). **For Task 28.3**: run 3's transcript shows the `get_product_overview` and `find_screens` calls but not their results (R3-7). My read is that it does not meet 28.3's bar as written; Thurgood decides.

**The instrument's limitation (Req 23.10)**: these are agents role-playing ignorance. The trio measures instruction clarity and path completeness; a human measures confusion. A green trio is not "a stranger succeeded".

## Validation

All measured locally, in the worktree at `f81b9bc57` plus this task's uncommitted files, 2026-10-14:
- the protocol § 9 schema check over the three records — all present (`task-25-5-completion.md`);
- `npx tsx` with `parseTasksMd` over `tasks.md` → 6 Task 25 criterion rows, 0 malformations;
- `zsh -n` over every § 11 block of `tests/onboarding-trio/protocol.md` → no errors;
- `npm run check:completion-criteria-parity` → `parent 25: PASS`; `SUMMARY: parents evaluated 31, pass 31, fail 0; emissions 0; reds 0` (Task 25 ticked; 3 parents of spec 123 unticked and not evaluated).

No test suite was run: Documentation parent, no code changed. The fixtures sit outside every jest root and `tsconfig.json` `include`.

## Additional verification

Primary Artifacts: all shipped as declared:
- `tests/onboarding-trio/protocol.md` (25.1; revised through Runs 1–3);
- `tests/onboarding-trio/fixtures/` (25.1; 14 files across three fixtures);
- `.kiro/specs/123-consumer-distribution/validation/prompts/` (25.1; three prompts, `30f72d628`);
- `validation/trio-*.md` (25.2–25.4; three records).

**Outside the Primary Artifacts, written by this seat on the orchestrator's instruction**:
- this completion doc, the subtask docs `task-25-{1..5}-completion.md`, and `task-25-instruments.md`;
- the summary `docs/specs/123-consumer-distribution/task-25-summary.md`;
- the Task 25 checkbox hunks in `tasks.md` (25 and 25.1–25.5 only).

**Disclosed process slip**: an operator dry-run wrote into Run 1's out folder after the run. It is disclosed in `validation/trio-1-backend.md` (Record-integrity note) and `task-25-2-completion.md`.
