# Kiro Task Completion Hooks

This directory contains the task-completion tooling for the PR-gated workflow and the file-organization hooks.

**The direct-commit flow is retired** (ratified workflow-law ballot, Spec 125-A Task 1, RATIFIED Peter, 2026-07-05). Tasks complete via **branch → PR → required checks → merge**: agents open PRs, Peter merges on green, and direct pushes to `main` are rejected by branch protection — admins included. Canonical law: `.kiro/steering/Task-Completion-Protocol.md` § "Completion State in the PR Flow".

---

## Task Completion: `complete-task.sh`

**Purpose**: One completion command, THREE context-aware modes (ballot Item 11a; third mode added 2026-09-26 as a drift fix bringing the script in line with Task-Completion-Protocol.md's multi-parent-unit law; unit-branch CI dispatch + the zero-runs detector added 2026-09-27 per ballot B-CI, `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` — a RATIFIED law change, applied to TCP in PR #217)
**Usage**: `./.kiro/hooks/complete-task.sh [OPTIONS] "MESSAGE"`

**Unit-branch CI dispatch, in one line**: subtask checkpoints and unit-member parent completions now dispatch the six required workflows against the unit branch and print a ready-to-paste `**CI-provenance**:` line; parent mode (the mode that opens the PR) confirms CI actually started on the PR and fails loudly if it did not. Dispatched runs are **feedback, not the gate** — each reports under a context name distinct from its required name (e.g. `Consumer Guard (unit-branch)`), so a branch-head run can never satisfy or shadow the unit PR's required check.

### Parent mode (default)

Commits on the task branch, pushes it, **opens the task PR**, prints the PR URL, and stops. Never merges — the task is complete when Peter merges on green. Use this when the parent IS its unit's final/gating parent (a standalone task, a single-unit spec, or the parent that completes a declared multi-parent unit). After opening (or re-reporting) the PR, it confirms CI actually started on it — the **F-A zero-runs detector** (ballot B-CI, the #148/#194 dropped-`pull_request`-event class) — and **fails loudly (non-zero exit)** on zero registered check runs, printing the diagnosis and the known remedies (poll mergeability; push an empty commit to re-trigger). It never auto-pushes a fix.

```bash
./.kiro/hooks/complete-task.sh "Task 2 Complete: Rework task tooling for PR flow (125-A)"
```

The MESSAGE becomes both the commit message and the PR title, and squash-merge makes the PR title the `main` commit subject — so it MUST follow the standard: `Task <N> Complete: <Description> (<spec>)`.

### Unit-member mode (`--unit-member`)

Commits on the task branch with MESSAGE and pushes the branch. **No PR opens.** Use this for a parent that completes **inside** a declared multi-parent unit but is **not** that unit's final/gating parent — its completion+summary docs land on the branch, it is done-on-branch, and it is accepted when the unit's PR (opened later, in parent mode, by the gating parent) merges. After pushing, it **dispatches the six required workflows against the unit branch** (`gh workflow run … --ref`) and prints a ready-to-paste `**CI-provenance**: branch-head dispatch @ <sha> — <urls>` line (ballot B-CI § 4 grammar) — pass `--no-ci` to skip.

```bash
./.kiro/hooks/complete-task.sh --unit-member "Task 1 Complete: Substrate setup (123)"
```

Mutually exclusive with `--subtask`.

### Subtask mode (`--subtask`)

Commits on the task branch with a plain message and pushes the branch. **No PR opens until UNIT completion**; subtasks never open PRs. At a judgment-based checkpoint, this mode **also dispatches** the six required workflows against the unit branch and prints the ready-to-paste CI-provenance line — pass `--no-ci` for a checkpoint you know is red (the honour system; nothing records its use).

```bash
./.kiro/hooks/complete-task.sh --subtask "Task 2.1: add credential preflight"
```

### Conventions (ballot Item 1b)

- **`<spec>`** = the spec ID (`125-A` from `125-A-pr-gate-mechanical-arming`). Branch names and PR titles use the spec ID; the PR body's `Spec:` field carries the full directory name.
- **Branch names**: `task/<spec>-<task-number>-<short-slug>` (e.g., `task/125-A-2-tooling-rework`); `fix/<slug>` or `chore/<slug>` for non-spec work. A multi-parent unit uses a unit slug instead: `task/<spec>-<unit-slug>`.
- **PR title**: `Task <N> Complete: <Description> (<spec>)` for a single-parent unit, or `<Unit description> (<spec>)` for a multi-parent unit — title discipline IS commit-message discipline under squash-merge.
- **PR body**: `Spec:` / `Task:` / `Unit:` / `Agent:` / completion-doc path(s) on the branch / one-line validation note. The script derives `Spec:`/`Task:` from a conventional MESSAGE; `Unit:` from `--unit` (defaults to `(single-parent unit — see Task)` when omitted); override the rest with `--spec-dir`, `--agent`, `--completion-doc`, `--validation`.

### Options

- `--unit-member` — unit-member mode (see above)
- `--subtask` — subtask mode (see above); mutually exclusive with `--unit-member`
- `--unit NAME` — unit label for the PR body's `Unit:` field (parent mode only, since that's the only mode that opens a PR)
- `--branch NAME` — task branch to create/use when currently on `main`
- `--agent NAME` — authoring agent for the PR body (default: `$DP_AGENT` or `Peter`)
- `--spec-dir NAME` / `--completion-doc PATH` / `--validation NOTE` — PR body fields
- `--organize` / `--validate-metadata` — run `organize-by-metadata.sh` before staging (folded in from the retired organized-commit script, ballot Item 11c)
- `--skip-parity` — skip the advisory `completion-criteria-parity` check (see below); never runs in subtask mode regardless
- `--no-ci` — skip the unit-branch CI dispatch (subtask/unit-member modes only), for a checkpoint you know is red (ballot B-CI § 2.1; the honour system — nothing records its use)
- `--dry-run-ci` — standalone diagnostic mode: no MESSAGE, no git/gh mutation. Prints the six `gh workflow run` dispatch commands it would issue and demonstrates the zero-runs detector against a stubbed zero-run result (ballot B-CI § 6 step 3). Ignores every other flag.
- `-h, --help` — full usage

### Unit-branch CI dispatch and the zero-runs detector (ballot B-CI)

- **Dispatch (subtask/unit-member modes)**: after pushing, the script fires `gh workflow run <wf> --ref <unit-branch>` for each of the six required workflows (`consumer-guard.yml`, `tool-boot-smoke.yml`, `section-citations.yml`, `agent-generator.yml`, `package-name-drift.yml`, `lane-timing.yml` — one array in the script, count-asserted against `verify-gate-registration.sh`'s 6 workflows / 18 contexts), polls for each run to register, and prints a ready-to-paste completion-doc line: `**CI-provenance**: branch-head dispatch @ <sha> — <run URL>, <run URL>, …` (the exact grammar in `governance/completion-documentation-guide.md` § "CI provenance — where a green was measured"). A dispatch that fails to register within the poll window is a loud warning (not fatal) — dispatch is feedback, not the gate.
- **Distinct context names**: every required workflow reports under a name distinct from its required context when triggered by `workflow_dispatch` (e.g. `Consumer Guard (unit-branch)`) — ballot B-CI a2. A branch-head dispatch run can never satisfy or shadow the unit PR's required check; it tests the branch HEAD, not the PR's merge ref.
- **The F-A zero-runs detector (parent mode only)**: after opening (or re-reporting) the PR, the script polls the PR head's check runs for a bounded window (~3 minutes). Zero registered runs is the `#148`/`#194` dropped-`pull_request`-event class — the script **fails loudly (non-zero exit)**, printing the diagnosis and the known remedies (poll mergeability with `gh pr view --json mergeable`; or push an empty commit to re-trigger: `git commit --allow-empty -m "ci: re-trigger" && git push`). It never auto-pushes.
- **PAT scope**: dispatching requires the token scope **Actions: write** (granted 2026-07-10, `inbound-to-125-B-from-125-A.md` §5) in addition to the existing `Contents: write` + `Pull requests: write`.
- **`--dry-run-ci`** exercises both the dispatch path and the detector's stubbed-zero branch without any git/gh mutation — its output is cited as evidence in the implementing PR body rather than a new test file.

### Advisory completion-criteria-parity check

Parent and unit-member modes run `npx tsx scripts/check-completion-criteria-parity.ts` before committing and print its output. This is a Spec 127 register-row instrument (`completion-criteria-parity`, `check_state: proposed`) — **arming (making it a required/blocking check) is Q2's decision, not this script's**. A non-zero result here prints a loud warning and the script **continues** — it never blocks. Use `--skip-parity` when the checker itself is broken.

### Failure modes (all fail LOUD — Req 4.3, no silent fallback)

- **Missing/under-scoped credentials**: preflights `gh` auth and repo push permission BEFORE any git mutation; names the missing PAT scopes (`Contents: write`, `Pull requests: write`). There is NO direct-push fallback.
- **On `main` with no derivable task branch**: refuses before touching git.
- **Never pushes to `main`** in any mode or failure path: refuses on `main`, re-asserts branch != `main` before commit AND before push, and pins the push refspec to the task branch.
- **PR creation fails after push**: reports the cause (usually PAT missing `Pull requests: write`); re-running reuses the pushed branch.
- **Open PR already exists for the branch** (change-request resume, ballot 1d.7): pushes and re-reports the existing PR URL — no duplicate PR. Also re-runs the zero-runs detector against the new push.
- **`--subtask` and `--unit-member` together**: refuses before touching git — they are mutually exclusive.
- **Zero CI runs registered on the PR** (parent mode; ballot B-CI F-A, the `#148`/`#194` dropped-event class): fails loudly with the PR URL, the diagnosis, and the remedies — the PR itself is not lost, this is a diagnostic failure.

### Release analysis

The automated release-analysis tooling was RETIRED 2026-08-12 (Q6 ballot: `.kiro/docs/ballots/2026-08-12-q6-release-manager-retirement.md`). Releases follow the manual recipe in `RELEASE-FLOW.md` + the Release Management System governance doc.

---

## Retired tooling (tombstones — DO NOT DELETE)

The following scripts implemented the retired direct-commit flow and are now **hard-fail tombstones**: each prints a redirect to `complete-task.sh` and exits 1, performing no git action (ballot Item 1g).

- `commit-task.sh` — RETIRED (was: commit + push to `main` + release analysis)
- `task-completion-commit.sh` — RETIRED (was: the helper that pushed to `main`)
- `commit-task-organized.sh` — RETIRED (was: commit + push with optional organization; its `--organize`/`--validate-metadata` options live on as `complete-task.sh` flags)

**The tombstones are load-bearing, not dead code**: ~31 specs with unchecked tasks still carry Post-Completion blocks instructing the retired scripts (ballot Item 13, RECORDS class). The hard-fail redirect is what keeps those stale instruction paths disarmed. They stay until the last pre-gate spec closes — deleting them as "unused" re-arms those stale paths.

`task-completion-agent-hook.md` (the auto-commit-on-completion agent hook concept) is deprecated for the same reason — structurally incompatible with the gate (ballot Item 11b); retained as a record under its deprecation header.

---

## Release Flow

See `RELEASE-FLOW.md` in this directory for the release sequence under the PR gate (version-bump PRs, the `prepublishOnly` token-index gate, and the derive-classify-ratify notes recipe).

---

## File Organization Hooks

### Metadata-Driven Organization (`organize-by-metadata.sh`)
**Purpose**: Organize files based on **Organization** metadata in file headers
**Usage**: `./.kiro/hooks/organize-by-metadata.sh [OPTIONS]`

**Features**:
- Scans markdown files for Organization metadata
- Validates metadata format and values
- Moves files to appropriate directories based on metadata
- Updates cross-references automatically
- Interactive confirmation before moving files

**Options**:
- `--validate-only`: Check metadata without organizing files
- `--dry-run`: Preview organization without moving files
- `--help`: Show detailed usage information

**Organization Values**:
- `framework-strategic`: Move to `strategic-framework/`
- `spec-validation`: Move to `.kiro/specs/[scope]/validation/`
- `spec-completion`: Move to `.kiro/specs/[scope]/completion/`
- `process-standard`: Keep in `.kiro/steering/`
- `working-document`: Keep in root directory

**Examples**:
```bash
# Interactive organization
./.kiro/hooks/organize-by-metadata.sh

# Validate metadata only
./.kiro/hooks/organize-by-metadata.sh --validate-only

# Preview organization
./.kiro/hooks/organize-by-metadata.sh --dry-run
```

**During task completion**: pass `--organize` and/or `--validate-metadata` to `complete-task.sh` to run organization/validation before staging.

---

## Integration with File Organization Standards

The organization hooks integrate with the **File Organization Standards** steering document to provide:

### Process-First Tool Development
- Manual organization process established first
- Hooks enhance proven manual processes
- Human control maintained with hook assistance
- Fallback to manual organization always available

### Metadata-Driven Safety
- No keyword detection or automated guessing
- Explicit human intent through metadata
- Validation prevents organization errors
- Interactive confirmation for all moves

### Sustainable Project Structure
- Framework artifacts separated from spec-specific artifacts
- Cross-reference integrity maintained automatically
- Directory structure scales with project growth
- Organization patterns work across multiple specs

### Quality Assurance
- Metadata validation ensures correct organization values
- Cross-reference updates prevent broken links
- Interactive confirmation prevents accidental moves
- Dry-run capability for safe preview
