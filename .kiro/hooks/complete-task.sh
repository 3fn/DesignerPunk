#!/bin/bash

# complete-task.sh — Task-completion tooling for the PR-gated workflow
#
# Built by Spec 125-A Task 2 per the ratified workflow-law ballot
# (.kiro/specs/125-A-pr-gate-mechanical-arming/task-1-workflow-ballot.md,
# Items 1a/1b/1d/11a — RATIFIED, Peter, 2026-07-05).
#
# One completion command, two context-aware modes (ballot 11a):
#   Parent mode (default): commit on the task branch, push, OPEN A PR, report the
#                          PR URL, and STOP. The script NEVER merges. The task is
#                          complete when Peter merges (ballot 1d).
#   Subtask mode (--subtask): commit on the task branch and push it. NO PR opens;
#                          no required checks fire until parent completion.
#
# Credential discipline (Req 4.3): preflights gh auth + repo push permission and
# fails LOUD with an actionable message when credentials are missing/under-scoped.
# NEVER falls back to a direct push. Pushes authenticate exclusively through the
# preflighted token (gh's credential helper) — the OS keychain is explicitly
# bypassed so the credential that was verified is the credential that pushes.
#
# This script NEVER pushes to main, in any mode or failure path:
#   - it refuses to run on main unless it can create a task branch first,
#   - it re-asserts current branch != main immediately before commit and push,
#   - the push refspec is pinned to the verified task branch.
#
# Release analysis does not run here. The automated release tooling was RETIRED
# 2026-08-12 (Q6 ballot); releases follow the manual recipe in RELEASE-FLOW.md.

set -euo pipefail

PROTECTED_BRANCH="main"

# ---------------------------------------------------------------------------
# Output helpers
# ---------------------------------------------------------------------------
say()  { echo "🔹 $1"; }
ok()   { echo "✅ $1"; }
warn() { echo "⚠️  $1"; }
die()  { echo "" >&2; echo "❌ $1" >&2; shift; for line in "$@"; do echo "   $line" >&2; done; exit 1; }

show_usage() {
  cat << 'EOF'
Usage: ./.kiro/hooks/complete-task.sh [OPTIONS] "MESSAGE"

One completion command, two context-aware modes (ballot 125-A Task 1, Item 11a):

  PARENT MODE (default)
    Commits on the task branch, pushes it, opens the task PR, prints the PR URL,
    and stops. Never merges. The task is complete when Peter merges on green.
    MESSAGE becomes both the commit message and the PR title, and squash-merge
    makes the PR title the main commit subject — so it MUST follow the standard:
        "Task <N> Complete: <Description> (<spec>)"
    e.g. ./.kiro/hooks/complete-task.sh "Task 2 Complete: Rework task tooling for PR flow (125-A)"

  SUBTASK MODE (--subtask)
    Commits on the task branch with MESSAGE (a plain conventional message) and
    pushes the branch. NO PR opens; no required checks fire until parent
    completion. Subtasks never open PRs.
    e.g. ./.kiro/hooks/complete-task.sh --subtask "Task 2.1: add credential preflight"

OPTIONS:
  --subtask              Subtask mode (see above). Parent mode is the default.
  --branch NAME          Task branch to create/use when currently on main
                         (convention: task/<spec>-<N>-<slug>, e.g. task/125-A-2-tooling-rework).
                         In parent mode the branch name is derived from a
                         conventional MESSAGE when --branch is omitted.
  --agent NAME           Authoring agent for the PR body (default: $DP_AGENT or "Peter").
  --spec-dir NAME        Full spec directory name for the PR body's Spec: field
                         (default: derived from the (<spec>) suffix in MESSAGE).
  --completion-doc PATH  Completion doc path for the PR body (repeatable;
                         default: conventional paths derived from MESSAGE).
  --validation NOTE      One-line validation note for the PR body (which
                         tier/commands ran locally).
  --organize             Run .kiro/hooks/organize-by-metadata.sh before staging
                         (folded in from commit-task-organized.sh per ballot 11c).
  --validate-metadata    Run organize-by-metadata.sh --validate-only before staging.
  -h, --help             Show this help.

BEHAVIOR NOTES:
  - Never pushes to main, in any mode or failure path. Running on main without a
    determinable task branch name refuses before touching git.
  - Credentials: uses $GH_TOKEN / $GITHUB_TOKEN from the environment, else reads
    GITHUB_TOKEN/GH_TOKEN from .env at the repo root. Missing or under-scoped
    credentials fail loud with what's missing — there is no direct-push fallback.
  - If an open PR already exists for the branch (change-request resume, ballot
    1d.7), parent mode pushes and re-reports the existing PR URL.
EOF
}

# ---------------------------------------------------------------------------
# Argument parsing (no git mutation happens in or before this section)
# ---------------------------------------------------------------------------
MODE="parent"
MESSAGE=""
BRANCH_OPT=""
AGENT="${DP_AGENT:-Peter}"
SPEC_DIR_OPT=""
COMPLETION_DOCS=()
VALIDATION_NOTE=""
RUN_ORGANIZE=false
RUN_VALIDATE=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --subtask)           MODE="subtask"; shift ;;
    --branch)            BRANCH_OPT="${2:-}"; shift 2 ;;
    --agent)             AGENT="${2:-}"; shift 2 ;;
    --spec-dir)          SPEC_DIR_OPT="${2:-}"; shift 2 ;;
    --completion-doc)    COMPLETION_DOCS+=("${2:-}"); shift 2 ;;
    --validation)        VALIDATION_NOTE="${2:-}"; shift 2 ;;
    --organize)          RUN_ORGANIZE=true; shift ;;
    --validate-metadata) RUN_VALIDATE=true; shift ;;
    -h|--help)           show_usage; exit 0 ;;
    -*)                  die "Unknown option: $1" "Use --help for usage." ;;
    *)
      if [[ -z "$MESSAGE" ]]; then
        MESSAGE="$1"
      else
        die "Multiple message arguments provided." "Quote the full message: \"Task 2 Complete: Description (125-A)\""
      fi
      shift
      ;;
  esac
done

[[ -n "$MESSAGE" ]] || die "A commit/PR message is required." "Use --help for usage."
[[ "$BRANCH_OPT" == "$PROTECTED_BRANCH" ]] && die "--branch $PROTECTED_BRANCH is not a task branch. Direct work on $PROTECTED_BRANCH is retired (ballot 125-A)."

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

# ---------------------------------------------------------------------------
# Parse the conventional parent message: "Task <N> Complete: <Description> (<spec>)"
# ---------------------------------------------------------------------------
TASK_NUM=""
TASK_DESC=""
SPEC_ID=""
if [[ "$MESSAGE" =~ ^Task\ ([0-9]+(\.[0-9]+)?)\ Complete:\ (.+)\ \(([^\(\)]+)\)[[:space:]]*$ ]]; then
  TASK_NUM="${BASH_REMATCH[1]}"
  TASK_DESC="${BASH_REMATCH[3]}"
  SPEC_ID="${BASH_REMATCH[4]}"
fi

slugify() {
  # lowercase, non-alphanumerics -> hyphens, collapse, keep it short
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//' | cut -c1-32 | sed -E 's/-+$//'
}

# ---------------------------------------------------------------------------
# Branch determination — the never-main gate.
# Refuses BEFORE any git mutation if we're on main with no task branch to create.
# ---------------------------------------------------------------------------
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
CREATE_BRANCH=false
if [[ "$CURRENT_BRANCH" == "$PROTECTED_BRANCH" ]]; then
  if [[ -n "$BRANCH_OPT" ]]; then
    TASK_BRANCH="$BRANCH_OPT"
  elif [[ "$MODE" == "parent" && -n "$SPEC_ID" && -n "$TASK_NUM" ]]; then
    TASK_BRANCH="task/${SPEC_ID}-${TASK_NUM}-$(slugify "$TASK_DESC")"
  else
    die "Refusing to run on '$PROTECTED_BRANCH' — no task branch to work on. Nothing was staged, committed, or pushed." \
        "Direct commits to $PROTECTED_BRANCH are retired (ballot 125-A; branch protection rejects them, admins included)." \
        "Either:" \
        "  - pass --branch task/<spec>-<N>-<slug>   (e.g. --branch task/125-A-2-tooling-rework), or" \
        "  - in parent mode, use the conventional message \"Task <N> Complete: <Description> (<spec>)\"" \
        "    so the branch name can be derived, or" \
        "  - create the branch yourself first: git switch -c task/<spec>-<N>-<slug>"
  fi
  if git show-ref --verify --quiet "refs/heads/$TASK_BRANCH"; then
    die "Branch '$TASK_BRANCH' already exists but you are on '$PROTECTED_BRANCH' with local changes." \
        "Switch to it yourself (git switch $TASK_BRANCH) so nothing is carried across unintentionally, then re-run."
  fi
  CREATE_BRANCH=true
else
  TASK_BRANCH="$CURRENT_BRANCH"
  if [[ ! "$TASK_BRANCH" =~ ^(task|fix|chore)/ ]]; then
    warn "Branch '$TASK_BRANCH' doesn't follow the task/<spec>-<N>-<slug> (or fix/, chore/) convention — proceeding anyway."
  fi
fi

assert_not_main() {
  local now
  now="$(git rev-parse --abbrev-ref HEAD)"
  if [[ "$now" == "$PROTECTED_BRANCH" || "$TASK_BRANCH" == "$PROTECTED_BRANCH" ]]; then
    die "SAFETY STOP: about to $1 while on '$PROTECTED_BRANCH'. This script never pushes to $PROTECTED_BRANCH." \
        "This should be unreachable — please report it in the 125-A findings ledger."
  fi
}

# ---------------------------------------------------------------------------
# Credential preflight (Req 4.3) — runs BEFORE any git mutation.
# Loud, actionable failure; never a silent fallback to direct push.
# ---------------------------------------------------------------------------
command -v gh >/dev/null 2>&1 || die "GitHub CLI (gh) is not installed — required to open PRs and authenticate pushes." \
  "Install it (https://cli.github.com) and re-run. There is no direct-push fallback."

read_env_token() {
  # Pull GH_TOKEN or GITHUB_TOKEN from .env at the repo root (the release tool's
  # established pattern) without executing the file.
  local key val
  for key in GH_TOKEN GITHUB_TOKEN; do
    val="$(grep -E "^${key}=" .env 2>/dev/null | head -1 | cut -d= -f2- | sed -E 's/^["'\'']//; s/["'\'']$//')"
    if [[ -n "$val" ]]; then echo "$val"; return 0; fi
  done
  return 1
}

if [[ -z "${GH_TOKEN:-}" && -n "${GITHUB_TOKEN:-}" ]]; then
  GH_TOKEN="$GITHUB_TOKEN"
fi
if [[ -z "${GH_TOKEN:-}" ]]; then
  if GH_TOKEN="$(read_env_token)"; then
    say "Using GitHub token from .env"
  else
    die "No GitHub credentials found." \
        "Checked: \$GH_TOKEN, \$GITHUB_TOKEN, and GITHUB_TOKEN/GH_TOKEN lines in $REPO_ROOT/.env." \
        "Provide a fine-grained PAT for this repo with: Contents: write (push) + Pull requests: write (PR open)." \
        "Nothing was committed or pushed. There is no direct-push fallback."
  fi
fi
export GH_TOKEN

if ! gh auth status >/dev/null 2>&1; then
  die "GitHub authentication FAILED — the token was rejected (expired, revoked, or malformed)." \
      "Fix the PAT in .env (or \$GH_TOKEN) — it needs: Contents: write + Pull requests: write on this repo." \
      "Verify with: gh auth status" \
      "Nothing was committed or pushed. There is no direct-push fallback."
fi

REPO_SLUG="$(git remote get-url origin | sed -E 's#(git@github\.com:|https://github\.com/)##; s#\.git$##')"
PUSH_PERM="$(gh api "repos/$REPO_SLUG" --jq '.permissions.push' 2>/dev/null || echo "unknown")"
if [[ "$PUSH_PERM" != "true" ]]; then
  die "GitHub token is UNDER-SCOPED for $REPO_SLUG: push permission = $PUSH_PERM." \
      "The PAT needs Contents: write (to push branches) and Pull requests: write (to open PRs)." \
      "Upgrade the fine-grained PAT at https://github.com/settings/tokens and update .env." \
      "Nothing was committed or pushed. There is no direct-push fallback."
fi
ok "Credentials verified: $REPO_SLUG (push permission confirmed)"

# Pushes authenticate ONLY through the preflighted token: the empty first helper
# clears the OS-keychain helper so the verified credential is the one that pushes.
git_push_verified() {
  git -c credential.helper= -c credential.helper='!gh auth git-credential' push "$@"
}

# ---------------------------------------------------------------------------
# Optional pre-commit steps folded in from commit-task-organized.sh (ballot 11c)
# ---------------------------------------------------------------------------
if [[ "$RUN_VALIDATE" == true ]]; then
  say "Validating metadata..."
  [[ -x ".kiro/hooks/organize-by-metadata.sh" ]] || die "organize-by-metadata.sh not found/executable — cannot --validate-metadata."
  ./.kiro/hooks/organize-by-metadata.sh --validate-only || die "Metadata validation failed — fix metadata before completing."
fi
if [[ "$RUN_ORGANIZE" == true ]]; then
  say "Running file organization..."
  [[ -x ".kiro/hooks/organize-by-metadata.sh" ]] || die "organize-by-metadata.sh not found/executable — cannot --organize."
  ./.kiro/hooks/organize-by-metadata.sh || die "File organization failed — resolve before completing."
fi

# ---------------------------------------------------------------------------
# Branch, stage, commit
# ---------------------------------------------------------------------------
if [[ "$CREATE_BRANCH" == true ]]; then
  say "Creating task branch: $TASK_BRANCH"
  git switch -c "$TASK_BRANCH"
fi

assert_not_main "stage/commit"

if ! git diff --quiet || ! git diff --cached --quiet || [[ -n "$(git ls-files --others --exclude-standard)" ]]; then
  say "Staging all changes..."
  git add -A
  say "Committing: $MESSAGE"
  git commit -m "$MESSAGE"
else
  if [[ -z "$(git log --oneline "origin/$PROTECTED_BRANCH..HEAD" 2>/dev/null)" ]]; then
    die "Nothing to do: working tree is clean and '$TASK_BRANCH' has no commits ahead of origin/$PROTECTED_BRANCH."
  fi
  warn "Working tree clean — nothing new to commit; proceeding with existing commits on '$TASK_BRANCH'."
fi

assert_not_main "push"
say "Pushing branch '$TASK_BRANCH' (authenticated via the verified token — never $PROTECTED_BRANCH)..."
git_push_verified -u origin "refs/heads/$TASK_BRANCH:refs/heads/$TASK_BRANCH"
ok "Branch pushed: $TASK_BRANCH"

# ---------------------------------------------------------------------------
# Subtask mode stops here: no PR, no checks (ballot 1a.2)
# ---------------------------------------------------------------------------
if [[ "$MODE" == "subtask" ]]; then
  echo ""
  ok "Subtask committed and pushed on '$TASK_BRANCH'."
  echo "   No PR opened (subtask mode) — the PR opens at PARENT completion."
  echo "   STOP: wait for user authorization before the next task."
  exit 0
fi

# ---------------------------------------------------------------------------
# Parent mode: open the task PR (ballot 1b conventions) and STOP. Never merge.
# ---------------------------------------------------------------------------
if [[ -z "$TASK_NUM" ]]; then
  warn "PR title doesn't match the standard 'Task <N> Complete: <Description> (<spec>)'."
  warn "Squash-merge makes the PR title the $PROTECTED_BRANCH commit subject — consider fixing the title on GitHub."
fi

# Resume path (ballot 1d.7): if an open PR already exists for this branch, re-report it.
EXISTING_PR_URL="$(gh pr list --head "$TASK_BRANCH" --state open --json url --jq '.[0].url' 2>/dev/null || true)"
if [[ -n "$EXISTING_PR_URL" ]]; then
  echo ""
  ok "Open PR already exists for '$TASK_BRANCH' — pushed the new commits to it."
  echo ""
  echo "=============================================================="
  echo "  PR URL: $EXISTING_PR_URL"
  echo "=============================================================="
  echo ""
  echo "STOP: report the PR URL and wait. The task is complete when Peter merges."
  exit 0
fi

# PR body fields (ballot 1b): Spec (directory name), Task, Agent, completion doc path(s), validation note.
SPEC_DIR="$SPEC_DIR_OPT"
if [[ -z "$SPEC_DIR" && -n "$SPEC_ID" ]]; then
  SPEC_DIR="$(find .kiro/specs -maxdepth 1 -type d -name "${SPEC_ID}-*" -exec basename {} \; 2>/dev/null | head -1)"
fi
[[ -n "$SPEC_DIR" ]] || SPEC_DIR="(unknown — pass --spec-dir)"

if [[ ${#COMPLETION_DOCS[@]} -eq 0 && -n "$SPEC_DIR" && -n "$TASK_NUM" && "$SPEC_DIR" != "("* ]]; then
  CONV_COMPLETION=".kiro/specs/$SPEC_DIR/completion/task-${TASK_NUM//./-}-completion.md"
  CONV_SUMMARY="docs/specs/$SPEC_DIR/task-${TASK_NUM//./-}-summary.md"
  [[ -f "$CONV_COMPLETION" ]] && COMPLETION_DOCS+=("$CONV_COMPLETION") || COMPLETION_DOCS+=("$CONV_COMPLETION (expected — not found on branch)")
  [[ -f "$CONV_SUMMARY" ]] && COMPLETION_DOCS+=("$CONV_SUMMARY")
fi
[[ ${#COMPLETION_DOCS[@]} -gt 0 ]] || COMPLETION_DOCS=("(none provided — pass --completion-doc)")
[[ -n "$VALIDATION_NOTE" ]] || VALIDATION_NOTE="(not recorded — see completion doc)"

TASK_FIELD="(see title)"
[[ -n "$TASK_NUM" ]] && TASK_FIELD="$TASK_NUM — $TASK_DESC"

PR_BODY="**Spec**: $SPEC_DIR
**Task**: $TASK_FIELD
**Agent**: $AGENT
**Completion docs**:
$(printf -- '- %s\n' "${COMPLETION_DOCS[@]}")
**Validation**: $VALIDATION_NOTE

---
Squash-merge only — the PR title becomes the \`$PROTECTED_BRANCH\` commit subject. The task is complete at MERGE (ballot 125-A, Item 1d)."

say "Opening the task PR..."
if ! PR_URL="$(gh pr create --base "$PROTECTED_BRANCH" --head "$TASK_BRANCH" --title "$MESSAGE" --body "$PR_BODY")"; then
  die "PR creation FAILED (the branch push succeeded; no PR exists yet)." \
      "Most likely cause: the PAT lacks 'Pull requests: write' on $REPO_SLUG — upgrade it at https://github.com/settings/tokens." \
      "Then re-run this command; it will reuse the pushed branch." \
      "Never open the work as a direct push to $PROTECTED_BRANCH."
fi

echo ""
echo "=============================================================="
echo "  ✅ Task PR opened:"
echo ""
echo "  $PR_URL"
echo ""
echo "=============================================================="
echo ""
echo "STOP: report the PR URL and wait."
echo "  - Required checks run on the PR; fix on this branch if they fail."
echo "  - The task is complete when Peter merges (merge on green = the authorization act)."
echo "  - Never merge your own PR; never push to $PROTECTED_BRANCH."
