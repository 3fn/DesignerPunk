#!/usr/bin/env bash
# scripts/issues-owned.sh <Seat> — your open records, read at session start.
#
# Law: ballot .kiro/docs/ballots/2026-10-20-manual-records-routed-readers.md § 2 E1 (RATIFIED,
# Peter, 2026-10-20, with conditions (i) fail-soft and (ii) a revisit trigger); Start Up Tasks
# item 9. Firing follows ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2. The
# path: list form follows ballot 2026-10-26-issues-multi-path-trigger-token (README rule 1).
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
#   FIRED@<sha>   a path: token with a first-parent commit touching the glob (or any glob of a
#                 comma-separated list; <sha> is the earliest such commit) after the commit that
#                 last changed a **Trigger**: line in the record; a merge:#<N> token with a
#                 first-parent subject ending (#<N>) anywhere on origin/main
#   FIRED@<tag>   a tag:v<semver> token whose tag exists
#   untokened     a Trigger line with no recognised token (README rule 1; a walk finding), including
#                 a path: list with an empty element or an element that begins or ends with a space
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
#
# PR MODE (warn-only; `fired-records`): scripts/issues-owned.sh --pr <N> --base <ref> --head <ref>
# lists the root records that the merge of PR #<N> fires, by the same token reading and the same
# `:(glob)` pathspec matching as the seat mode: a path: token (or list) with a glob that matches a
# file in `git diff --name-only <merge-base> <head>`, and a merge:#<N> token naming this PR. The
# records are read at <head>, so a record the PR adds is seen; <merge-base> is
# `git merge-base <base> <head>`. No fetch, no seat, no run log. One line per fired record:
#   fires-here       it fires at this merge and this diff does not re-rule or archive it; under
#                    README rule 11 it lapses at the merge unless this diff closes it (a dated
#                    outcome line is not read: the reason says when this diff edits the record)
#   re-ruled-here    its **Trigger**: line changed in this diff (a record added here is not this)
#   closed-here      it is at the root at the merge base and in archive/ at <head>
#   already-fired@<sha>  a path: record that fired at an earlier first-parent commit of the base
# Under GITHUB_ACTIONS=true each fires-here line is also a `::warning title=fired-records::`
# annotation (a `::notice` when this diff edits the record, which may be its closing outcome line). The last line counts each state. Exits 0 always; an error prints the unavailable
# line. A READ, NEVER A GATE (warn-only, .kiro/issues/2026-11-08-fired-records-warn-check-grant.md).

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

PR_MODE=""
if [ "$SEAT_ARG" = "--pr" ]; then
  PR_MODE=1
  PR_NUM=""; PR_BASE=""; PR_HEAD=""
  while [ "$#" -gt 0 ]; do
    case "$1" in
      --pr) PR_NUM="${2:-}"; shift 2 || shift ;;
      --base) PR_BASE="${2:-}"; shift 2 || shift ;;
      --head) PR_HEAD="${2:-}"; shift 2 || shift ;;
      *) shift ;;
    esac
  done
  SEAT_ARG="(pr mode)"
  ISSUES_OWNED_LOG=/dev/null
fi

TOP=$(git rev-parse --show-toplevel 2>/dev/null) || unavailable "not inside a git repository"
cd "$TOP" 2>/dev/null || unavailable "cannot enter the repository root"
if [ -n "${ISSUES_OWNED_LOG+x}" ]; then
  LOGFILE="$ISSUES_OWNED_LOG"
else
  CD=$(git rev-parse --git-common-dir 2>/dev/null) && LOGFILE="$CD/issues-owned.log"
fi

[ -n "$SEAT_ARG" ] || unavailable "no seat given; usage: ./scripts/issues-owned.sh <YourName>"
case "$TIMEOUT" in '' | *[!0-9]*) TIMEOUT=15 ;; esac

if [ -z "$PR_MODE" ]; then

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
fi # end of the seat mode's fetch and seat read; the PR mode reads <head> instead

# --- the owner names on an Owner line ---
# README rule 9: the seats named in a record's **Owner**:/**Owners**: header are its owners. The
# line carries prose after the list, so the read stops where the list does. In order: (1) cut at
# the Owner token; (2) drop `code` spans, `*(italic notes)*` and (parenthesised asides): a seat
# named in an aside is described there, not listed; (3) cut at the next bold key (`**Consulted**:`,
# `**Filed by**:`, `**Verifier**:` ...); (4) cut at the first sentence end that is not inside a
# bold span, and not before a bold role segment (`. **Ada — owns ...**`): a line written as bold
# segments, `**Kenya ... shape.** **Lina — owns ...**. **Ada — owns ...**`, is one list.
# If what is left names no seat at all (`**Owner**: rows below (Lina, Thurgood, ...)`), the
# parenthesised names are the list: the same cuts, asides kept. Prints the remaining text; the
# caller matches the seat in it. Seat names are the canonical charters' (SEATS, read above).
owner_names() {
  printf '%s\n' "$1" | SEAT_WORDS="$SEATS" perl -e '
    my $t = <STDIN>; chomp $t;
    my $re = join("|", map { ucfirst } split(/\s+/, $ENV{SEAT_WORDS}));
    $t =~ s/^.*?\*\*Owners?\*\*://;
    $t =~ s/`[^`]*`//g;
    sub cut {
      my ($x, $strip) = @_;
      if ($strip) { 1 while $x =~ s/\*?\([^()]*\)\*?//g; }
      $x =~ s/\*\*[^*]{1,60}\*\*:.*$//;
      $x =~ s{(\*\*.*?\*\*)}{ my $b = $1; $b =~ s/\./\x01/g; $b }ge;
      $x =~ s/\.(?=\s*\*\*[^*]*\s\xE2\x80\x94\s)/\x01/g;
      $x =~ s/\.(\s.*|)$//;
      $x =~ s/\x01/./g;
      return $x;
    }
    my $r = cut($t, 1);
    $r = cut($t, 0) unless $re ne "" && $r =~ /\b(?:$re)\b/;
    print "$r\n";
  '
}

# --- the PR mode (see the header) ---
pr_owners() { # the seats on a record's Owner line, comma-separated
  local names s out=""
  names=$(owner_names "$1")
  for s in $SEATS; do
    s="$(printf '%s' "${s:0:1}" | tr '[:lower:]' '[:upper:]')${s:1}"
    printf '%s\n' "$names" | grep -qw -- "$s" && out="$out${out:+, }$s"
  done
  printf '%s' "${out:-no seat}"
}

pr_mode() {
  case "$PR_NUM" in '' | *[!0-9]*) unavailable "PR mode needs --pr <number>, --base <ref> and --head <ref>" ;; esac
  [ -n "$PR_BASE" ] && [ -n "$PR_HEAD" ] || unavailable "PR mode needs --pr <number>, --base <ref> and --head <ref>"
  local H B
  H=$(git rev-parse -q --verify "$PR_HEAD^{commit}" 2>/dev/null) || unavailable "no commit $PR_HEAD"
  git rev-parse -q --verify "$PR_BASE^{commit}" >/dev/null 2>&1 || unavailable "no commit $PR_BASE"
  B=$(git merge-base "$PR_BASE" "$H" 2>/dev/null) || unavailable "no merge base of $PR_BASE and $PR_HEAD"
  SEATS=$(git ls-tree --name-only "$H" -- canonical/agents/ 2>/dev/null | sed -n 's|^canonical/agents/\([a-z][a-z0-9-]*\)\.md$|\1|p')
  local f files body tok state globs g reason own fc tc parts
  local nf=0 nr=0 nc=0 na=0 out="" level
  roots() { git ls-tree --name-only "$1" -- .kiro/issues/ 2>/dev/null | grep -E '^\.kiro/issues/[^/]+\.md$' | grep -v '^\.kiro/issues/README\.md$'; }
  # The records at <head>, and the base's root records that <head> has moved to archive/.
  files=$(roots "$H")
  for f in $(roots "$B"); do
    git cat-file -e "$H:$f" 2>/dev/null && continue
    git cat-file -e "$H:.kiro/issues/archive/${f#.kiro/issues/}" 2>/dev/null && files="$files
$f"
  done
  # tok_fires <token>: does this merge fire it? Sets specs to its pathspecs (empty for merge:).
  tok_fires() {
    specs=()
    case "$1" in
      path:?*)
        globs=${1#path:}
        case ",$globs," in *,,* | *', '* | *' ,'*) return 1 ;; esac
        IFS=',' read -r -a parts <<<"$globs"
        for g in "${parts[@]}"; do specs+=(":(glob)$g"); done
        [ -n "$(git diff --name-only --no-renames "$B" "$H" -- "${specs[@]}" 2>/dev/null)" ]
        ;;
      merge:\#[0-9]*) [ "${1#merge:#}" = "$PR_NUM" ] ;;
      *) return 1 ;;
    esac
  }
  # shellcheck disable=SC2016 # the backticks are literal: the token is backticked in the record
  token_of() { printf '%s\n' "$1" | grep -m1 '^\*\*Trigger\*\*: ' | sed -nE 's/^\*\*Trigger\*\*: `([^`]*)`.*/\1/p'; }
  for f in $files; do
    if git cat-file -e "$H:$f" 2>/dev/null; then body=$(git show "$H:$f"); else body=$(git show "$B:$f"); fi
    tok=$(token_of "$body")
    if ! tok_fires "$tok"; then
      # A record re-ruled in this diff is read by the token it had at the base.
      git cat-file -e "$B:$f" 2>/dev/null || continue
      tok=$(token_of "$(git show "$B:$f")")
      tok_fires "$tok" || continue
    fi
    reason=""
    if ! git cat-file -e "$H:$f" 2>/dev/null; then
      state=closed-here
    elif ! git cat-file -e "$B:$f" 2>/dev/null; then
      state=fires-here; reason="added in this diff"
    elif git diff "$B" "$H" -- "$f" 2>/dev/null | grep -q '^[-+]\*\*Trigger\*\*: '; then
      state=re-ruled-here
    else
      state=fires-here
      if [ "${#specs[@]}" -gt 0 ]; then
        tc=$(git log -1 --format=%H -G'^\*\*Trigger\*\*: ' "$B" -- "$f" 2>/dev/null)
        if [ -n "$tc" ]; then fc=$(git log --first-parent --reverse --format=%h "$tc..$B" -- "${specs[@]}" 2>/dev/null | head -1)
        else fc=$(git log --first-parent --reverse --format=%h "$B" -- "${specs[@]}" 2>/dev/null | head -1); fi
        [ -n "$fc" ] && state="already-fired@$fc"
      fi
      if [ "$state" = fires-here ] && [ -n "$(git diff --name-only "$B" "$H" -- "$f" 2>/dev/null)" ]; then reason="this diff edits the record"; fi
    fi
    own=$(pr_owners "$(printf '%s\n' "$body" | head -15 | grep -m1 -E '\*\*Owners?\*\*:')")
    case "$state" in
      fires-here) nf=$((nf + 1)) ;;
      re-ruled-here) nr=$((nr + 1)) ;;
      closed-here) nc=$((nc + 1)) ;;
      *) na=$((na + 1)) ;;
    esac
    out="$out$(printf '%s\t%s\t%s\t%s%s' "$state" "$f" "$own" "$tok" "${reason:+	($reason)}")
"
    if [ "$state" = fires-here ] && [ "${GITHUB_ACTIONS:-}" = "true" ]; then
      # An edited record may carry its outcome line in this diff, which is not read: a notice, not a warning.
      level=warning; [ "$reason" = "this diff edits the record" ] && level=notice
      out="$out::$level title=fired-records::$f ($own) fires at this merge ($tok); under README rule 11 it lapses here unless this diff closes or re-rules it${reason:+ ($reason)}
"
    fi
  done
  printf '%s' "$out"
  echo "fired-records: $nf fire(s) here, $nr re-ruled here, $nc closed here, $na already fired; PR #$PR_NUM, merge base $(git rev-parse --short "$B"), head $(git rev-parse --short "$H")"
  exit 0
}

[ -n "$PR_MODE" ] && pr_mode

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
  owner_names "$own" | grep -qw -- "$SEAT" || continue
  t=$(printf '%s\n' "$body" | grep -m1 '^\*\*Trigger\*\*: ')
  # shellcheck disable=SC2016 # the backticks are literal: the token is backticked in the record
  tok=$(printf '%s' "$t" | sed -nE 's/^\*\*Trigger\*\*: `([^`]*)`.*/\1/p')
  state=""
  case "$tok" in
    manual) state=manual ;;
    path:?*)
      # One glob, or a comma-separated list of globs (README rule 1). A malformed list prints
      # untokened, never a silent non-fire.
      globs=${tok#path:}
      case ",$globs," in
        *,,* | *', '* | *' ,'*) state=untokened ;;
        *)
          specs=()
          IFS=',' read -r -a parts <<<"$globs"
          for g in "${parts[@]}"; do specs+=(":(glob)$g"); done
          tc=$(git log -1 --format=%H -G'^\*\*Trigger\*\*: ' "$REF" -- "$f" 2>/dev/null)
          if [ -n "$tc" ]; then range="$tc..$REF"; else range="$REF"; fi
          fc=$(git log --first-parent --reverse --format=%h "$range" -- "${specs[@]}" 2>/dev/null | head -1)
          [ -n "$fc" ] && state="FIRED@$fc"
          ;;
      esac
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
