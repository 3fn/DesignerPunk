#!/bin/bash

# complete-task.sh — Task-completion tooling for the PR-gated workflow
#
# Built by Spec 125-A Task 2 per the ratified workflow-law ballot
# (.kiro/specs/125-A-pr-gate-mechanical-arming/task-1-workflow-ballot.md,
# Items 1a/1b/1d/11a — RATIFIED, Peter, 2026-07-05).
#
# One completion command, THREE context-aware modes (Task-Completion-Protocol.md
# § "Completion State in the PR Flow" points 2/4; drift fix 2026-09-26 —
# tooling brought to match existing law; CI-dispatch behavior added 2026-09-27
# per ballot B-CI, `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md`,
# M1-b — a RATIFIED law change, TCP §§ "The Sequence by Task Scope" / "Completion
# State in the PR Flow" S1/S4/S6/S7):
#   Parent mode (default): commit on the task branch, push, OPEN A PR, report the
#                          PR URL, and STOP. The script NEVER merges. The task is
#                          complete when Peter merges (ballot 1d). Use this when
#                          the parent IS its unit's final/gating parent (a
#                          standalone task, a single-unit spec, or the parent
#                          that completes a declared multi-parent unit). After
#                          opening (or re-reporting) the PR, this mode checks
#                          that CI actually started on it (the #148/#194
#                          dropped-pull_request-event class) and FAILS LOUDLY —
#                          non-zero exit, remedy printed — on zero registered
#                          check runs. It never auto-pushes a fix.
#   Unit-member mode (--unit-member): commit on the task branch and push it.
#                          NO PR opens. Use this for a parent that completes
#                          INSIDE a declared multi-parent unit but is NOT that
#                          unit's final/gating parent — its completion docs land
#                          on the branch, and it is accepted at the unit's merge.
#                          This mode NEVER derives a branch name from MESSAGE
#                          (unlike parent mode): it belongs on the shared unit
#                          branch (task/<spec>-<unit-slug>), which can't be
#                          derived from a single parent's message — deriving a
#                          per-task branch here would silently split the unit
#                          across branches. On main, be already on the unit
#                          branch or pass --branch explicitly. After pushing,
#                          it DISPATCHES the six required workflows against the
#                          unit branch (`gh workflow run … --ref`) and prints a
#                          ready-to-paste `**CI-provenance**: branch-head
#                          dispatch @ <sha> — <urls>` line (ballot B-CI § 4).
#   Subtask mode (--subtask): commit on the task branch and push it. NO PR opens
#                          until unit completion; subtasks never open PRs. At
#                          a judgment-based checkpoint this mode ALSO dispatches
#                          the six required workflows against the unit branch
#                          and prints the ready-to-paste provenance line — pass
#                          --no-ci for a checkpoint you know is red (its use is
#                          on the honour system; nothing records it).
#
# Dispatched runs (both modes above) are FEEDBACK, NOT THE GATE: each reports
# under a context name distinct from its required name (e.g. "Consumer Guard
# (unit-branch)") — ballot B-CI a2 — so a branch-head run can never satisfy or
# shadow the unit PR's required check. They test the branch HEAD, not the PR's
# merge ref. The gate still runs only on the unit PR.
#
# --unit-member and --subtask are mutually exclusive.
#
# --unit NAME threads a Unit: field into the PR body opened in parent mode
# (Branch and PR Conventions: "PR body additionally carries a Unit: field").
# Omit it for a single-parent unit; the PR body falls back to a fixed note.
#
# --dry-run-ci: a standalone diagnostic mode (no MESSAGE required, no git/gh
# mutation). Prints the six `gh workflow run` dispatch commands it would issue
# and demonstrates the zero-runs detector against a stubbed zero-run result
# (its non-zero return, without terminating this invocation) — see ballot B-CI
# § 6 step 3. Ignores every other flag.
#
# Advisory completion-criteria-parity check (Spec 127 register row
# `completion-criteria-parity`, check_state: proposed — arming is Q2's
# decision, NOT this script's): parent and unit-member modes run
# `scripts/check-completion-criteria-parity.ts` before committing and print
# its output. Non-zero output is a LOUD warning, never a block — pass
# --skip-parity to bypass entirely (e.g. the checker itself is broken).
# RULED (Peter, 2026-09-26, PR #205): this authoring-time check stays advisory
# until the Q2 sitting decides otherwise — that same sitting decides both the
# CI required-flag AND this script's local mode. See RELEASE-FLOW.md § 5b
# (the note adjacent to the ratified arming-decision paragraph).
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

# ---------------------------------------------------------------------------
# Ballot B-CI — the required-workflows list (multi-homed copy set, S-6).
# This array is count-asserted (six) against the six workflow files that
# together produce tools/agent-generator/verify-gate-registration.sh's 18
# required contexts. If that script's workflow set ever changes, this array
# moves with it in the SAME recorded change (C9 discipline extended to CI
# dispatch — ballot B-CI § 5 grant item 2(a)).
# ---------------------------------------------------------------------------
REQUIRED_WORKFLOWS=(
  "consumer-guard.yml"
  "tool-boot-smoke.yml"
  "section-citations.yml"
  "agent-generator.yml"
  "package-name-drift.yml"
  "lane-timing.yml"
)
if [[ ${#REQUIRED_WORKFLOWS[@]} -ne 6 ]]; then
  echo "❌ Internal error: REQUIRED_WORKFLOWS must have exactly 6 entries (it is a" >&2
  echo "   multi-homed copy set with verify-gate-registration.sh's 6 workflow files" >&2
  echo "   producing 18 required contexts) — found ${#REQUIRED_WORKFLOWS[@]}." >&2
  exit 1
fi

# ---------------------------------------------------------------------------
# Ballot B-CI — unit-branch CI dispatch + the zero-runs detector.
#
# Dispatched runs are FEEDBACK, NOT THE GATE: every required workflow reports
# under a context name distinct from its required name when triggered by
# workflow_dispatch (ballot B-CI a2 — e.g. "Consumer Guard (unit-branch)"), so
# a branch-head run can never satisfy or shadow the unit PR's required check.
# They test the branch HEAD, not the PR's merge ref. The gate runs only on the
# unit PR.
# ---------------------------------------------------------------------------

# dispatch_required_workflows BRANCH SHA
# Fires `gh workflow run` for every entry in REQUIRED_WORKFLOWS against BRANCH,
# then polls for the newly created run at SHA (dispatch is async — the run can
# take a few seconds to register) and resolves its URL. Populates the global
# arrays DISPATCH_RUN_URLS (resolved) and DISPATCH_UNCONFIRMED (workflow file
# names whose run did not register within the poll window — the "confirm each
# dispatch registered a run" duty, issue spec a3 / ballot B-CI grant item 3).
# Non-fatal by design in subtask/unit-member modes: dispatch is feedback, not
# the gate, so a registration miss here is a loud warning, not a hard failure
# (the hard-failure zero-runs detector is check_ci_started, PARENT mode only —
# F-A, ruled Peter 2026-09-27).
# Set DRY_RUN_CI=true to print the commands instead of executing them.
dispatch_required_workflows() {
  local branch="$1" sha="$2"
  DISPATCH_RUN_URLS=()
  DISPATCH_UNCONFIRMED=()
  local wf run_url attempt err_file
  for wf in "${REQUIRED_WORKFLOWS[@]}"; do
    if [[ "${DRY_RUN_CI:-false}" == true ]]; then
      echo "  [DRY RUN] gh workflow run \"$wf\" --ref \"$branch\""
      DISPATCH_RUN_URLS+=("https://github.com/${REPO_SLUG:-<owner>/<repo>}/actions/runs/DRYRUN-${wf%.yml}")
      continue
    fi
    say "Dispatching $wf against '$branch'..."
    err_file="$(mktemp)"
    if ! gh workflow run "$wf" --ref "$branch" 2>"$err_file"; then
      warn "Failed to dispatch $wf: $(cat "$err_file" 2>/dev/null)"
      warn "  Dispatch needs the PAT scope Actions: write (granted 2026-07-10, inbound-to-125-B-from-125-A.md §5) in addition to Contents: write + Pull requests: write."
      rm -f "$err_file"
      DISPATCH_UNCONFIRMED+=("$wf")
      continue
    fi
    rm -f "$err_file"
    run_url=""
    attempt=0
    while [[ -z "$run_url" && $attempt -lt 15 ]]; do
      sleep 2
      run_url="$(gh run list --workflow "$wf" --branch "$branch" --event workflow_dispatch --limit 5 --json url,headSha \
                   --jq "[.[] | select(.headSha == \"$sha\")][0].url" 2>/dev/null || true)"
      attempt=$((attempt + 1))
    done
    if [[ -z "$run_url" ]]; then
      warn "Dispatched $wf but no run registered at $sha within ~30s (zero-runs class — the #148/#194 pattern)."
      DISPATCH_UNCONFIRMED+=("$wf")
    else
      ok "  $wf → $run_url"
      DISPATCH_RUN_URLS+=("$run_url")
    fi
  done
}

# print_ci_provenance_line SHA
# Prints a ready-to-paste `**CI-provenance**: branch-head dispatch @ <SHA> —
# <urls>` line (ballot B-CI § 4 grammar, governance/completion-documentation-guide.md
# § "CI provenance — where a green was measured") from the DISPATCH_RUN_URLS
# populated by the most recent dispatch_required_workflows call. The script
# never appends a `; not green:` tail — it does not wait for run conclusions
# (dispatch is non-blocking, issue spec a3), so it cannot know results at
# dispatch time; add that tail by hand once you have checked the runs.
print_ci_provenance_line() {
  local sha="$1"
  if [[ ${#DISPATCH_RUN_URLS[@]} -eq 0 ]]; then
    warn "No dispatch runs registered — nothing to cite. Investigate before writing a CI-provenance line."
    return 0
  fi
  # NOTE: "${arr[*]}" joins on only the FIRST character of IFS — `IFS=', '`
  # would silently produce "," (no space), not the ballot's ", " grammar.
  # printf + sed builds the literal ", "-joined list explicitly.
  local joined
  joined="$(printf '%s, ' "${DISPATCH_RUN_URLS[@]}" | sed -E 's/, $//')"
  echo ""
  echo "Ready-to-paste completion-doc line:"
  echo "**CI-provenance**: branch-head dispatch @ $sha — $joined"
  if [[ ${#DISPATCH_UNCONFIRMED[@]} -gt 0 ]]; then
    warn "Unconfirmed dispatches (not in the line above — investigate before citing): ${DISPATCH_UNCONFIRMED[*]}"
  fi
}

# check_ci_started PR_NUMBER HEAD_SHA
# The F-A zero-runs detector (ballot B-CI, RULED Peter 2026-09-27, parent/unit
# mode only): polls the PR head's check runs for a bounded window (~3 min).
# Zero registered check runs is the #148/#194 dropped-pull_request-event class
# — this FAILS LOUDLY (non-zero return) with the diagnosis and remedy printed.
# It never auto-pushes a fix; the caller decides.
check_ci_started() {
  local pr_number="$1" head_sha="$2"
  local attempt=0 max_attempts=18 count=0  # 18 * 10s ≈ 3 minutes
  say "Confirming CI started on PR #$pr_number (head $head_sha)..."
  while [[ $attempt -lt $max_attempts ]]; do
    count="$(gh api "repos/$REPO_SLUG/commits/$head_sha/check-runs" --jq '.total_count' 2>/dev/null || echo 0)"
    [[ "$count" -gt 0 ]] && break
    sleep 10
    attempt=$((attempt + 1))
  done
  if [[ "${count:-0}" -eq 0 ]]; then
    echo "" >&2
    echo "❌ ZERO CHECK RUNS registered on PR #$pr_number after $((max_attempts * 10))s (head $head_sha)." >&2
    echo "   This is the #148/#194 dropped pull_request-event class: GitHub can silently drop the" >&2
    echo "   event when a PR opens while mergeability is still UNKNOWN." >&2
    echo "   Known remedies:" >&2
    echo "     1. Poll mergeability: gh pr view $pr_number --json mergeable" >&2
    echo "     2. Re-trigger:        git commit --allow-empty -m \"ci: re-trigger\" && git push" >&2
    echo "   Nothing was auto-pushed — pick a remedy and re-run this command to re-check." >&2
    return 1
  fi
  ok "CI started: $count check run(s) registered on PR #$pr_number at $head_sha."
  return 0
}

# demo_check_ci_started_zero — stubbed version of check_ci_started for
# --dry-run-ci (ballot B-CI § 6 step 3): demonstrates the diagnosis text and
# non-zero return without polling anything real.
demo_check_ci_started_zero() {
  echo "" >&2
  echo "❌ ZERO CHECK RUNS registered on PR #999 after 180s (head 0123456789abcdef0123456789abcdef01234567) [STUBBED — --dry-run-ci]." >&2
  echo "   This is the #148/#194 dropped pull_request-event class: GitHub can silently drop the" >&2
  echo "   event when a PR opens while mergeability is still UNKNOWN." >&2
  echo "   Known remedies:" >&2
  echo "     1. Poll mergeability: gh pr view 999 --json mergeable" >&2
  echo "     2. Re-trigger:        git commit --allow-empty -m \"ci: re-trigger\" && git push" >&2
  return 1
}

# run_dry_run_ci_demo — the --dry-run-ci standalone action (ballot B-CI § 6
# step 3). No git or gh mutation. Prints the six dispatch commands it would
# issue and demonstrates the zero-runs detector against a stubbed zero-run
# result, without terminating this invocation.
run_dry_run_ci_demo() {
  local demo_branch="${BRANCH_OPT:-task/example-123-unit-slug}"
  local demo_sha="0123456789abcdef0123456789abcdef01234567"
  echo "=============================================================="
  echo "  DRY RUN — unit-branch CI dispatch (ballot B-CI § 6 step 3)"
  echo "  No git or gh mutation happens in this mode."
  echo "=============================================================="
  echo ""
  echo "Would dispatch these ${#REQUIRED_WORKFLOWS[@]} required workflows against '$demo_branch':"
  DRY_RUN_CI=true dispatch_required_workflows "$demo_branch" "$demo_sha"
  print_ci_provenance_line "$demo_sha"
  echo ""
  echo "Would then poll (per workflow) until the run at that SHA registers:"
  echo "  gh run list --workflow <wf> --branch \"$demo_branch\" --event workflow_dispatch --limit 5 \\"
  echo "    --json url,headSha --jq '[.[] | select(.headSha == \"<sha>\")][0].url'"
  echo ""
  echo "--------------------------------------------------------------"
  echo "  DRY RUN — the parent-mode zero-runs detector (F-A), stubbed at zero"
  echo "--------------------------------------------------------------"
  if demo_check_ci_started_zero; then
    warn "[DRY RUN] demo detector unexpectedly reported CI started — check demo_check_ci_started_zero."
  else
    warn "[DRY RUN] detector returned non-zero, as expected for a stubbed zero-run result."
    echo "   In a real run, complete-task.sh would exit non-zero at this point (F-A)."
  fi
  echo ""
  ok "DRY RUN complete — no git or gh state was changed."
}

show_usage() {
  cat << 'EOF'
Usage: ./.kiro/hooks/complete-task.sh [OPTIONS] "MESSAGE"

One completion command, THREE context-aware modes (Task-Completion-Protocol.md
§ "Completion State in the PR Flow"; unit-branch CI dispatch added 2026-09-27
per ballot B-CI):

  PARENT MODE (default)
    Commits on the task branch, pushes it, opens the task PR, prints the PR URL,
    and stops. Never merges. The task is complete when Peter merges on green.
    Use this when the parent IS its unit's final/gating parent (a standalone
    task, a single-unit spec, or the parent that completes a declared
    multi-parent unit). After opening (or re-reporting) the PR, checks that CI
    actually started on it and FAILS LOUDLY on zero registered check runs (the
    #148/#194 dropped-event class, F-A) — it never auto-pushes a fix.
    MESSAGE becomes both the commit message and the PR title, and squash-merge
    makes the PR title the main commit subject — so it MUST follow the standard:
        "Task <N> Complete: <Description> (<spec>)"
    e.g. ./.kiro/hooks/complete-task.sh "Task 2 Complete: Rework task tooling for PR flow (125-A)"

  UNIT-MEMBER MODE (--unit-member)
    Commits on the task branch with MESSAGE and pushes the branch. NO PR opens.
    Use this for a parent that completes INSIDE a declared multi-parent unit
    but is NOT that unit's final/gating parent — its completion+summary docs
    land on the branch; it is done-on-branch and accepted when the UNIT's PR
    (opened later, in parent mode, by the gating parent) merges. After pushing,
    DISPATCHES the six required workflows against the unit branch and prints a
    ready-to-paste `**CI-provenance**: branch-head dispatch @ <sha> — <urls>`
    line (ballot B-CI § 4) — pass --no-ci to skip.
    e.g. ./.kiro/hooks/complete-task.sh --unit-member "Task 1 Complete: Substrate setup (123)"

  SUBTASK MODE (--subtask)
    Commits on the task branch with MESSAGE (a plain conventional message) and
    pushes the branch. NO PR opens until UNIT completion; subtasks never open
    PRs. At a judgment-based checkpoint, ALSO dispatches the six required
    workflows against the unit branch and prints the ready-to-paste
    CI-provenance line — pass --no-ci for a checkpoint you know is red (the
    honour system; nothing records its use).
    e.g. ./.kiro/hooks/complete-task.sh --subtask "Task 2.1: add credential preflight"

  Dispatched runs (subtask/unit-member modes) are FEEDBACK, NOT THE GATE: each
  reports under a context name distinct from its required name (ballot B-CI
  a2), so a branch-head run can never satisfy or shadow the unit PR's required
  check. They test the branch HEAD, not the PR's merge ref.

  --unit-member and --subtask are mutually exclusive.

OPTIONS:
  --unit-member          Unit-member mode (see above).
  --subtask              Subtask mode (see above). Parent mode is the default.
  --unit NAME            Unit label for the PR body's Unit: field (parent mode
                         only — e.g. "U1: substrate" or a unit branch slug).
                         Default when omitted: "(single-parent unit — see Task)".
  --branch NAME          Task branch to create/use when currently on main
                         (convention: task/<spec>-<N>-<slug>, e.g. task/125-A-2-tooling-rework).
                         Derivation from a conventional MESSAGE when --branch
                         is omitted is PARENT MODE ONLY. Unit-member mode
                         belongs on the shared unit branch (task/<spec>-
                         <unit-slug>) — that can't be derived from MESSAGE, so
                         on main you must either already be on the unit branch
                         or pass --branch explicitly.
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
  --skip-parity          Skip the advisory completion-criteria-parity check
                         (e.g. when the checker itself is broken). Parity is
                         never run in subtask mode regardless of this flag.
  --no-ci                Skip the unit-branch CI dispatch (subtask/unit-member
                         modes only) — for a checkpoint you know is red. Its
                         use is on the honour system; nothing records it
                         (ballot B-CI § 2.1).
  --dry-run-ci           Standalone diagnostic mode: no MESSAGE, no git/gh
                         mutation. Prints the six `gh workflow run` dispatch
                         commands it would issue and demonstrates the
                         zero-runs detector against a stubbed zero-run result
                         (ballot B-CI § 6 step 3). Ignores every other flag.
  -h, --help             Show this help.

BEHAVIOR NOTES:
  - Never pushes to main, in any mode or failure path. Running on main without a
    determinable task branch name refuses before touching git.
  - Credentials: uses $GH_TOKEN / $GITHUB_TOKEN from the environment, else reads
    GITHUB_TOKEN/GH_TOKEN from .env at the repo root. Missing or under-scoped
    credentials fail loud with what's missing — there is no direct-push fallback.
    Dispatching CI additionally needs the PAT scope Actions: write (granted
    2026-07-10, inbound-to-125-B-from-125-A.md §5) alongside Contents: write +
    Pull requests: write.
  - If an open PR already exists for the branch (change-request resume, ballot
    1d.7), parent mode pushes, re-reports the existing PR URL, and re-runs the
    zero-runs detector against the new push.
  - Parent and unit-member modes run the advisory completion-criteria-parity
    checker before committing (register row completion-criteria-parity,
    check_state: proposed — this is a warning, never a block).
  - Unit-branch dispatch runs (subtask/unit-member) report under context names
    distinct from the required set (ballot B-CI a2) — feedback, not the gate.
    The parent-mode zero-runs detector (F-A) DOES fail loudly (non-zero exit)
    on zero registered check runs on the PR itself.
EOF
}

# ---------------------------------------------------------------------------
# Argument parsing (no git mutation happens in or before this section)
# ---------------------------------------------------------------------------
SUBTASK_FLAG=false
UNIT_MEMBER_FLAG=false
MESSAGE=""
BRANCH_OPT=""
AGENT="${DP_AGENT:-Peter}"
SPEC_DIR_OPT=""
UNIT_OPT=""
COMPLETION_DOCS=()
VALIDATION_NOTE=""
RUN_ORGANIZE=false
RUN_VALIDATE=false
RUN_PARITY=true
NO_CI_FLAG=false
DRY_RUN_CI_MODE=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --subtask)           SUBTASK_FLAG=true; shift ;;
    --unit-member)       UNIT_MEMBER_FLAG=true; shift ;;
    --branch)            BRANCH_OPT="${2:-}"; shift 2 ;;
    --agent)             AGENT="${2:-}"; shift 2 ;;
    --spec-dir)          SPEC_DIR_OPT="${2:-}"; shift 2 ;;
    --unit)              UNIT_OPT="${2:-}"; shift 2 ;;
    --completion-doc)    COMPLETION_DOCS+=("${2:-}"); shift 2 ;;
    --validation)        VALIDATION_NOTE="${2:-}"; shift 2 ;;
    --organize)          RUN_ORGANIZE=true; shift ;;
    --validate-metadata) RUN_VALIDATE=true; shift ;;
    --skip-parity)       RUN_PARITY=false; shift ;;
    --no-ci)             NO_CI_FLAG=true; shift ;;
    --dry-run-ci)        DRY_RUN_CI_MODE=true; shift ;;
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

# --dry-run-ci is a standalone diagnostic action (ballot B-CI § 6 step 3): no
# MESSAGE, no other flag, and no git/gh mutation. Exits before every other
# requirement below (MESSAGE, mode exclusivity, credential preflight).
if [[ "$DRY_RUN_CI_MODE" == true ]]; then
  REPO_ROOT="$(git rev-parse --show-toplevel)"
  cd "$REPO_ROOT"
  REPO_SLUG="$(git remote get-url origin 2>/dev/null | sed -E 's#(git@github\.com:|https://github\.com/)##; s#\.git$##')"
  run_dry_run_ci_demo
  exit 0
fi

if [[ "$SUBTASK_FLAG" == true && "$UNIT_MEMBER_FLAG" == true ]]; then
  die "--subtask and --unit-member are mutually exclusive." \
      "Use --subtask for a subtask commit, or --unit-member for a parent that is not its unit's final/gating parent."
fi
if [[ "$SUBTASK_FLAG" == true ]]; then
  MODE="subtask"
elif [[ "$UNIT_MEMBER_FLAG" == true ]]; then
  MODE="unit-member"
else
  MODE="parent"
fi

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
        "  - create the branch yourself first: git switch -c task/<spec>-<N>-<slug>" \
        "  - in --unit-member mode, switch to the unit branch (task/<spec>-<unit-slug>) or pass --branch" \
        "    (a unit-member parent's branch name can't be derived from MESSAGE — it belongs on the" \
        "    unit's shared branch, not a per-task branch, or the unit would silently split across branches)"
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
# Advisory completion-criteria-parity check (parent + unit-member modes only).
#
# Register row `completion-criteria-parity` (governance/classification-map.md)
# is check_state: proposed — ARMING is Q2's decision, not this script's. This
# call is deliberately non-blocking: it prints the checker's own output and,
# on a non-zero exit, prints a loud warning and CONTINUES. RULED (Peter,
# 2026-09-26, PR #205): stays advisory until the Q2 sitting decides otherwise
# — that sitting decides this script's local mode alongside the CI
# required-flag (RELEASE-FLOW.md § 5b note). --skip-parity bypasses entirely
# (e.g. the checker itself is broken).
# ---------------------------------------------------------------------------
if [[ "$MODE" != "subtask" && "$RUN_PARITY" == true ]]; then
  if [[ -f "scripts/check-completion-criteria-parity.ts" ]]; then
    say "Running completion-criteria-parity (advisory — not blocking)..."
    if ! npx tsx scripts/check-completion-criteria-parity.ts; then
      warn "completion-criteria-parity reported RED findings above."
      warn "ADVISORY ONLY — not blocking this completion (register row completion-criteria-parity is check_state: proposed; arming is Q2's decision). Review before your unit's PR merges."
    fi
  else
    warn "scripts/check-completion-criteria-parity.ts not found — skipping advisory parity check."
  fi
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
# Subtask mode stops here: no PR until unit completion (ballot 1a.2). Ballot
# B-CI M1-b: dispatch the required workflows against the unit branch at this
# checkpoint, unless --no-ci (a checkpoint known to be red).
# ---------------------------------------------------------------------------
if [[ "$MODE" == "subtask" ]]; then
  echo ""
  ok "Subtask committed and pushed on '$TASK_BRANCH'."
  echo "   No PR opened (subtask mode) — the PR opens at UNIT completion."
  if [[ "$NO_CI_FLAG" == true ]]; then
    warn "Skipping CI dispatch (--no-ci) — this checkpoint is known-red. Its use is on the honour system; nothing records it (ballot B-CI § 2.1)."
  else
    SUBTASK_SHA="$(git rev-parse HEAD)"
    dispatch_required_workflows "$TASK_BRANCH" "$SUBTASK_SHA"
    print_ci_provenance_line "$SUBTASK_SHA"
  fi
  echo "   STOP: wait for user authorization before the next task."
  exit 0
fi

# ---------------------------------------------------------------------------
# Unit-member mode stops here: parent is done-on-branch, no PR.
# The PR opens later, in parent mode, when the unit's final/gating parent
# completes (Task-Completion-Protocol.md § "Completion State in the PR Flow").
# Ballot B-CI: dispatch the required workflows against the unit branch, unless
# --no-ci.
# ---------------------------------------------------------------------------
if [[ "$MODE" == "unit-member" ]]; then
  echo ""
  ok "Parent completion docs committed and pushed on '$TASK_BRANCH'."
  echo "   No PR opened (unit-member mode) — this parent is done-on-branch."
  echo "   The PR opens at UNIT completion (the gating parent, in parent mode)."
  if [[ "$NO_CI_FLAG" == true ]]; then
    warn "Skipping CI dispatch (--no-ci)."
  else
    UNIT_MEMBER_SHA="$(git rev-parse HEAD)"
    dispatch_required_workflows "$TASK_BRANCH" "$UNIT_MEMBER_SHA"
    print_ci_provenance_line "$UNIT_MEMBER_SHA"
  fi
  echo "   This parent is accepted when Peter merges the unit's PR."
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
  EXISTING_PR_NUMBER="$(basename "$EXISTING_PR_URL")"
  PARENT_HEAD_SHA="$(git rev-parse HEAD)"
  if ! check_ci_started "$EXISTING_PR_NUMBER" "$PARENT_HEAD_SHA"; then
    die "CI did not start on PR #$EXISTING_PR_NUMBER after this push (F-A zero-runs detector, ballot B-CI)." \
        "The PR URL above is still valid — this is a diagnostic failure, not a lost PR." \
        "Apply a remedy (see above) and re-run this command to re-check."
  fi
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

UNIT_FIELD="$UNIT_OPT"
[[ -n "$UNIT_FIELD" ]] || UNIT_FIELD="(single-parent unit — see Task)"

PR_BODY="**Spec**: $SPEC_DIR
**Task**: $TASK_FIELD
**Unit**: $UNIT_FIELD
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

# F-A zero-runs detector (ballot B-CI, RULED Peter 2026-09-27): the #148/#194
# class is a PR that opens while GitHub is still computing mergeability, and
# the pull_request event is silently dropped — zero workflows run. Confirm CI
# actually started before declaring this step done; fail loudly, non-zero
# exit, with the remedy printed, if it did not. Never auto-pushes a fix.
NEW_PR_NUMBER="$(basename "$PR_URL")"
NEW_PR_HEAD_SHA="$(git rev-parse HEAD)"
if ! check_ci_started "$NEW_PR_NUMBER" "$NEW_PR_HEAD_SHA"; then
  die "CI did not start on PR #$NEW_PR_NUMBER (F-A zero-runs detector, ballot B-CI)." \
      "The PR is open at the URL above — this is a diagnostic failure, not a lost PR." \
      "Apply a remedy (see above), then re-run this command; it will reuse the pushed branch and re-check."
fi

echo "STOP: report the PR URL and wait."
echo "  - Required checks run on the PR; fix on this branch if they fail."
echo "  - The task is complete when Peter merges (merge on green = the authorization act)."
echo "  - Never merge your own PR; never push to $PROTECTED_BRANCH."
