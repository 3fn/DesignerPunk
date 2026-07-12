#!/usr/bin/env bash
# verify-gate-registration.sh — Spec 122 Task 7.3 (C9 / Req 20 AC3).
#
# Queries the branch-protection API and COUNT-ASSERTS the required-status-check context
# set: the NINE standing 122 contexts PLUS the seven pre-existing contexts (Consumer Guard,
# package drift, the five 125-A lanes) — per inbound-from-125-A-arming.md (the handback ACTION).
# The Item-13 sweep precedent applied to ourselves: a required check that silently fell off
# the protection list is exactly the drift class Spec 122 exists to kill.
#
# Run at each cutover + the monthly governance health check (Thurgood).
#
# SWEEP-5 RETIRED (Spec 122 Task 18 / U11 closeout, 2026-07-11): 122-sweep-5-corrected-state was
# a PRE-CUTOVER-WINDOW-ONLY gate (Req 19 AC1 exception; re-entry protection lives in the standing
# class checks). All cutovers are done, so its context is removed from branch protection (Peter's
# Settings action) and re-counted here IN THE SAME recorded protection-list change (C9) — 17 → 16,
# ten → nine 122 contexts. NOTE: this script must MATCH the live protection list; if it is run
# before the Settings removal lands, it will (correctly) FAIL on the extra sweep-5 context — sync
# the two. The sweep-5 workflow JOB may keep running as a NON-required check (harmless) until
# separately removed.
#
# Auth: GITHUB_TOKEN from the environment, falling back to the repo-root .env. The
# repo-root PAT can READ/PATCH protection (it cannot dispatch workflows — 403; that
# asymmetry is recorded in inbound-to-125-B-from-125-A.md §5).

set -euo pipefail

# NOTE: the live slug is 3fn/DesignerPunk — several 125-A-era docs say "3fn/DesignerPunkv2",
# which the API now answers with 301 Moved Permanently (renamed repo). -L below follows
# redirects as a second line of defense.
REPO="3fn/DesignerPunk"
BRANCH="main"

# ── Auth ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
if [[ -z "${GITHUB_TOKEN:-}" && -f "$REPO_ROOT/.env" ]]; then
  # shellcheck disable=SC1091
  source "$REPO_ROOT/.env"
fi
if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "FAIL: no GITHUB_TOKEN in the environment or $REPO_ROOT/.env" >&2
  exit 1
fi

# ── The expected context set (count-asserted) ────────────────────────────────
EXPECTED_CONTEXTS=(
  # Pre-existing (125-A closeout handback §1 — the seven-context armed gate):
  "Consumer Guard"
  "Check package name drift"
  "lane-typecheck"
  "lane-build-validate"
  "lane-functional-root"
  "lane-mcp-server-suite"
  "lane-application-mcp-server-suite"
  # The nine STANDING 122 registrants (C9) — 122-sweep-5-corrected-state RETIRED at U11 closeout
  # (pre-cutover-window-only gate; see the header note). It is no longer a required context.
  "122-diff-guard"
  "122-canonical-vs-truth"
  "122-sweep-1-refs"
  "122-sweep-2-skills"
  "122-sweep-3-dupes"
  "122-sweep-4-ambient"
  "122-sweep-6-declarations"
  "122-sweep-7-dispositions"
  "122-sweep-8-demotion"
)
EXPECTED_COUNT=16

# ── Query ────────────────────────────────────────────────────────────────────
ACTUAL_JSON="$(curl -sfL \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$REPO/branches/$BRANCH/protection/required_status_checks")" || {
  echo "FAIL: could not read branch protection for $REPO@$BRANCH (token scope? protection off?)" >&2
  exit 1
}

# Portable JSON array extraction (node is a repo prerequisite; no jq dependency; no
# mapfile — macOS default bash is 3.2).
ACTUAL_CONTEXTS=()
while IFS= read -r line; do
  [[ -n "$line" ]] && ACTUAL_CONTEXTS+=("$line")
done < <(node -e '
  const data = JSON.parse(require("fs").readFileSync(0, "utf8"));
  for (const c of (data.contexts ?? []).slice().sort()) console.log(c);
' <<<"$ACTUAL_JSON")

# ── Assert ───────────────────────────────────────────────────────────────────
STATUS=0

echo "registered contexts (${#ACTUAL_CONTEXTS[@]}):"
printf '  %s\n' "${ACTUAL_CONTEXTS[@]}"

for expected in "${EXPECTED_CONTEXTS[@]}"; do
  found=0
  for actual in "${ACTUAL_CONTEXTS[@]}"; do
    [[ "$actual" == "$expected" ]] && found=1 && break
  done
  if [[ $found -eq 0 ]]; then
    echo "FAIL: expected required context MISSING from the protection list: \"$expected\"" >&2
    STATUS=1
  fi
done

for actual in "${ACTUAL_CONTEXTS[@]}"; do
  found=0
  for expected in "${EXPECTED_CONTEXTS[@]}"; do
    [[ "$actual" == "$expected" ]] && found=1 && break
  done
  if [[ $found -eq 0 ]]; then
    echo "FAIL: UNEXPECTED required context on the protection list (update this script IN the same recorded change if intentional): \"$actual\"" >&2
    STATUS=1
  fi
done

if [[ ${#ACTUAL_CONTEXTS[@]} -ne $EXPECTED_COUNT ]]; then
  echo "FAIL: count-assert — expected $EXPECTED_COUNT required contexts, found ${#ACTUAL_CONTEXTS[@]}" >&2
  STATUS=1
fi

if [[ $STATUS -eq 0 ]]; then
  echo "PASS: all $EXPECTED_COUNT required contexts present, count-asserted (N=$EXPECTED_COUNT recorded in this script)"
fi
exit $STATUS
