# Kiro Task Completion Hooks

This directory contains the task-completion tooling for the PR-gated workflow and the file-organization hooks.

**The direct-commit flow is retired** (ratified workflow-law ballot, Spec 125-A Task 1, RATIFIED Peter, 2026-07-05). Tasks complete via **branch → PR → required checks → merge**: agents open PRs, Peter merges on green, and direct pushes to `main` are rejected by branch protection — admins included. Canonical law: `.kiro/steering/Task-Completion-Protocol.md` § "Completion State in the PR Flow".

---

## Task Completion: `complete-task.sh`

**Purpose**: One completion command, two context-aware modes (ballot Item 11a)
**Usage**: `./.kiro/hooks/complete-task.sh [OPTIONS] "MESSAGE"`

### Parent mode (default)

Commits on the task branch, pushes it, **opens the task PR**, prints the PR URL, and stops. Never merges — the task is complete when Peter merges on green.

```bash
./.kiro/hooks/complete-task.sh "Task 2 Complete: Rework task tooling for PR flow (125-A)"
```

The MESSAGE becomes both the commit message and the PR title, and squash-merge makes the PR title the `main` commit subject — so it MUST follow the standard: `Task <N> Complete: <Description> (<spec>)`.

### Subtask mode (`--subtask`)

Commits on the task branch with a plain message and pushes the branch. **No PR opens**; no required checks fire until parent completion. Subtasks never open PRs.

```bash
./.kiro/hooks/complete-task.sh --subtask "Task 2.1: add credential preflight"
```

### Conventions (ballot Item 1b)

- **`<spec>`** = the spec ID (`125-A` from `125-A-pr-gate-mechanical-arming`). Branch names and PR titles use the spec ID; the PR body's `Spec:` field carries the full directory name.
- **Branch names**: `task/<spec>-<task-number>-<short-slug>` (e.g., `task/125-A-2-tooling-rework`); `fix/<slug>` or `chore/<slug>` for non-spec work.
- **PR title**: `Task <N> Complete: <Description> (<spec>)` — title discipline IS commit-message discipline under squash-merge.
- **PR body**: `Spec:` / `Task:` / `Agent:` / completion-doc path(s) on the branch / one-line validation note. The script derives these from a conventional MESSAGE; override with `--spec-dir`, `--agent`, `--completion-doc`, `--validation`.

### Options

- `--subtask` — subtask mode (see above)
- `--branch NAME` — task branch to create/use when currently on `main`
- `--agent NAME` — authoring agent for the PR body (default: `$DP_AGENT` or `Peter`)
- `--spec-dir NAME` / `--completion-doc PATH` / `--validation NOTE` — PR body fields
- `--organize` / `--validate-metadata` — run `organize-by-metadata.sh` before staging (folded in from the retired organized-commit script, ballot Item 11c)
- `-h, --help` — full usage

### Failure modes (all fail LOUD — Req 4.3, no silent fallback)

- **Missing/under-scoped credentials**: preflights `gh` auth and repo push permission BEFORE any git mutation; names the missing PAT scopes (`Contents: write`, `Pull requests: write`). There is NO direct-push fallback.
- **On `main` with no derivable task branch**: refuses before touching git.
- **Never pushes to `main`** in any mode or failure path: refuses on `main`, re-asserts branch != `main` before commit AND before push, and pins the push refspec to the task branch.
- **PR creation fails after push**: reports the cause (usually PAT missing `Pull requests: write`); re-running reuses the pushed branch.
- **Open PR already exists for the branch** (change-request resume, ballot 1d.7): pushes and re-reports the existing PR URL — no duplicate PR.

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
