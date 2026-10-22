#!/usr/bin/env bash
# scripts/issues-owned.sh <Seat> — your open records, read at session start.
#
# Law: ballot .kiro/docs/ballots/2026-10-20-manual-records-routed-readers.md § 2 E1 (RATIFIED,
# Peter, 2026-10-20, with conditions (i) fail-soft and (ii) a revisit trigger); Start Up Tasks
# item 9. Firing follows ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2.
#
# A READ, NEVER A GATE: exits 0 always. On any error it prints exactly one line,
#   issues-owned: unavailable (<why>) — continue
# and exits 0 (condition (i)).
#
# Ground: origin/main after `git fetch -q origin main` under a timeout. Records and history are
# both read from that ref, never from the working tree, so a unit branch's own commits neither
# fire nor hide a record. A failed or timed-out fetch prints the unavailable line: a stale ref
# is what printed the R2 prototype's four false FIRED lines.
#
# Output, one line per printed record:  <state>\t<path>\t<Trigger line after "**Trigger**: ", 160 chars>
#   manual        always printed
#   due:<ver>     a release:<ver>:phase-1 token
#   FIRED@<sha>   a path: token with a first-parent commit touching the glob after the commit that
#                 last changed a **Trigger**: line in the record; a merge:#<N> token with a
#                 first-parent subject ending (#<N>) anywhere on origin/main
#   FIRED@<tag>   a tag:v<semver> token whose tag exists
#   untokened     a Trigger line with no recognised token (README rule 1; a walk finding)
# Unfired path:/merge:/tag: records print nothing. The last line gives the count, the ref and its
# SHA, and the number of root records with no **Owner**:/**Owners**: line.
#
# Known gap (ballot § 2): a record with more than one **Trigger**: line can have <tc> moved later
# by a change to a later line, which can hide a path: fire.
#
# Run log (for condition (ii), the revisit trigger): each run appends one tab-separated line to
# $ISSUES_OWNED_LOG (default: <git common dir>/issues-owned.log, outside the tree, never
# committed): UTC time, seat, ref SHA or "unavailable", printed count, FIRED count, FIRED paths.
# Best effort: a log that cannot be written is skipped silently.
#
# Environment: ISSUES_OWNED_FETCH_TIMEOUT (seconds, default 15); ISSUES_OWNED_LOG (path, or
# /dev/null to disable).

REF=origin/main
TIMEOUT="${ISSUES_OWNED_FETCH_TIMEOUT:-15}"
SEAT_ARG="${1:-}"
LOGFILE=""

log_line() {
  [ -n "$LOGFILE" ] || return 0
  { printf '%s\t%s\t%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "${SEAT:-$SEAT_ARG}" "$1" >>"$LOGFILE"; } 2>/dev/null || true
}

# Kill a process and every descendant (git fetch → git-remote-<helper> → transport), deepest first.
kill_tree() {
  local c
  for c in $(pgrep -P "$1" 2>/dev/null); do kill_tree "$c"; done
  kill "$1" >/dev/null 2>&1
}

unavailable() {
  printf 'issues-owned: unavailable (%s) — continue\n' "$1"
  log_line "unavailable	$1"
  exit 0
}

TOP=$(git rev-parse --show-toplevel 2>/dev/null) || unavailable "not inside a git repository"
cd "$TOP" 2>/dev/null || unavailable "cannot enter the repository root"
if [ -n "${ISSUES_OWNED_LOG+x}" ]; then
  LOGFILE="$ISSUES_OWNED_LOG"
else
  CD=$(git rev-parse --git-common-dir 2>/dev/null) && LOGFILE="$CD/issues-owned.log"
fi

[ -n "$SEAT_ARG" ] || unavailable "no seat given; usage: ./scripts/issues-owned.sh <YourName>"
case "$TIMEOUT" in '' | *[!0-9]*) TIMEOUT=15 ;; esac

# --- the fetch, under a timeout (portable: no coreutils `timeout` on macOS) ---
GIT_TERMINAL_PROMPT=0 GIT_ASKPASS=true git fetch -q origin main >/dev/null 2>&1 &
FPID=$!
ticks=0
while kill -0 "$FPID" 2>/dev/null; do
  if [ "$ticks" -ge $((TIMEOUT * 10)) ]; then
    kill_tree "$FPID"
    wait "$FPID" 2>/dev/null
    unavailable "fetch of origin main timed out after ${TIMEOUT}s"
  fi
  sleep 0.1
  ticks=$((ticks + 1))
done
wait "$FPID" || unavailable "fetch of origin main failed"
REFSHA=$(git rev-parse -q --verify "$REF^{commit}" 2>/dev/null) || unavailable "no $REF after the fetch"

# --- the seat: a canonical agent at origin/main, matched case-insensitively ---
SEATS=$(git ls-tree --name-only "$REF" -- canonical/agents/ 2>/dev/null | sed -n 's|^canonical/agents/\([a-z][a-z0-9-]*\)\.md$|\1|p')
want=$(printf '%s' "$SEAT_ARG" | tr '[:upper:]' '[:lower:]')
SEAT=""
for s in $SEATS; do
  if [ "$s" = "$want" ]; then SEAT="$(printf '%s' "${s:0:1}" | tr '[:lower:]' '[:upper:]')${s:1}"; fi
done
if [ -z "$SEAT" ]; then
  known=$(for s in $SEATS; do printf '%s' "$(printf '%s' "${s:0:1}" | tr '[:lower:]' '[:upper:]')${s:1} "; done)
  unavailable "unknown seat '$SEAT_ARG'; seats at $REF: ${known% }"
fi

# --- the records ---
FILES=$(git ls-tree --name-only "$REF" -- .kiro/issues/ 2>/dev/null | grep -E '^\.kiro/issues/[^/]+\.md$' | grep -v '^\.kiro/issues/README\.md$')
n=0
u=0
fired=0
firedpaths=""
OUT=""
for f in $FILES; do
  body=$(git show "$REF:$f" 2>/dev/null) || unavailable "cannot read $f at $REF"
  own=$(printf '%s\n' "$body" | head -15 | grep -m1 -E '\*\*Owners?\*\*:')
  if [ -z "$own" ]; then u=$((u + 1)); continue; fi
  printf '%s' "$own" | sed -E 's/^.*\*\*Owners?\*\*://' | grep -qw -- "$SEAT" || continue
  t=$(printf '%s\n' "$body" | grep -m1 '^\*\*Trigger\*\*: ')
  # shellcheck disable=SC2016 # the backticks are literal: the token is backticked in the record
  tok=$(printf '%s' "$t" | sed -nE 's/^\*\*Trigger\*\*: `([^`]*)`.*/\1/p')
  state=""
  case "$tok" in
    manual) state=manual ;;
    path:?*)
      tc=$(git log -1 --format=%H -G'^\*\*Trigger\*\*: ' "$REF" -- "$f" 2>/dev/null)
      if [ -n "$tc" ]; then range="$tc..$REF"; else range="$REF"; fi
      fc=$(git log --first-parent --reverse --format=%h "$range" -- ":(glob)${tok#path:}" 2>/dev/null | head -1)
      [ -n "$fc" ] && state="FIRED@$fc"
      ;;
    merge:\#[0-9]*)
      num=${tok#merge:#}
      fc=$(git log --first-parent --format='%h %s' "$REF" 2>/dev/null | grep -E "\(#${num}\)\$" | head -1 | cut -d' ' -f1)
      [ -n "$fc" ] && state="FIRED@$fc"
      ;;
    tag:?*)
      git rev-parse -q --verify "refs/tags/${tok#tag:}" >/dev/null 2>&1 && state="FIRED@${tok#tag:}"
      ;;
    release:?*:phase-1)
      v=${tok#release:}
      state="due:${v%:phase-1}"
      ;;
    *) state=untokened ;;
  esac
  [ -n "$state" ] || continue
  case "$state" in FIRED@*) fired=$((fired + 1)); firedpaths="$firedpaths $f" ;; esac
  rest=${t#\*\*Trigger\*\*: }
  n=$((n + 1))
  OUT="$OUT$(printf '%s\t%s\t%s' "$state" "$f" "${rest:0:160}")
"
done

printf '%s' "$OUT"
echo "$n record(s) for $SEAT at $REF $(git rev-parse --short "$REFSHA"); $u root record(s) carry no **Owner**:/**Owners**: line"
log_line "$(git rev-parse --short "$REFSHA")	$n	$fired	${firedpaths# }"
exit 0
