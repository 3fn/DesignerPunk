#!/usr/bin/env bash
# scripts/owed-set.sh — the closeout-owed query: which specs may owe a closeout claims pass.
#
# Authority: .kiro/issues/2026-10-19-owed-set-query-over-lists-in-progress-specs.md — Peter's
# "Yes." (2026-10-21) promotes the hand-run pipeline to this script (the ladder's first rung);
# the contract is Stacy's (§ "Script contract"), the code is Thurgood's. The predicate is
# unchanged:
#
#   closeout-owed(S) <=> S's final declared unit has merged AND <specs>/S/completion/claims-pass.md
#                        does not exist AND that merge is dated on or after the adoption date.
#
# A READ, NEVER A GATE: exits 0 always. Rows are CANDIDATES, never verdicts. On any failure it
# prints exactly one line,  owed-set: unavailable (<why>) — continue  and exits 0.
#
# Bash + git only, so a consumer runs the shipped copy as is:
#   this repository:  bash scripts/owed-set.sh
#   a consumer:       bash node_modules/@3fn/core/scripts/owed-set.sh --specs-dir <specs> [--adoption <file>]
#
# Flags:
#   --specs-dir <dir>         default .kiro/specs (relative to the current directory, or absolute;
#                             it must be inside the repository)
#   --adoption <file>         a line `Adopted: YYYY-MM-DD` (a consumer's adoption record)
#   --adoption-ballot <file>  a line `Ratified-machine: YYYY-MM-DD`; default, when the flag is not
#                             given: .kiro/docs/ballots/2026-09-19-completion-claims-integrity.md at
#                             the repository root (absent in a consumer repository, so skipped)
# The adoption date is the first of: --adoption's date, the ballot's date, the day
# designerpunk.manifest.json was first committed on the first-parent line (the C-4 rule). A file
# that is missing or gives no date is skipped, and the count line names the source used. No date:
# the unavailable line.
#
# "Dated on or after" the adoption date: a commit is post-adoption when its committer's recorded day
# (%cs) OR its UTC day is on or after that date. The union over-lists by at most a few hours either
# side of midnight, never under-lists: a wrong exclusion is the costly direction (Peter, 2026-10-25,
# via the record below). There is no `git log --since`: the whole first-parent line is read and
# filtered by date, so neither the 00:00 pin (CLOSEOUT pilot F-1) nor date-ordered history is
# assumed. Where the union, not the recorded day, decided, the day prints as `<%cs> (UTC <day>)`.
#
# Ground: the commit at HEAD, read with git (never the working tree), printed as `ref <sha>`.
# Run it on an up-to-date main; on a unit branch the branch's own commits count as first-parent.
#
# Output: one row per spec directory that a post-adoption first-parent commit touched,
#   <class>\t<spec>\t<reason>
# exactly one class per spec, decided in this order:
#   closed      completion/claims-pass.md exists (a claims-pass-midpoint.md does NOT close)
#   stub        no tasks.md (a charter-only spec, or a directory gone at the ref); reason names the files
#   open        at least one unticked parent (`- [ ]` at column 0) in tasks.md; reason `N of M`;
#               a checkbox is an assertion, not a merge fact, and the reason says so
#   touch-only  the closing commit (below) predates adoption, and no task completion file was added
#               after adoption; reason names the closing commit and the last touching commit
#   candidate   the closing commit is post-adoption; anchor = the closing commit; reason keeps the
#               unit class:
#                 a  merge units declared in tasks.md (`## Declared Merge Units`, the legacy
#                    `**Merge units (` bold prose, or a heading containing "merge unit")
#                 b  no units declared, one post-adoption first-parent commit (that PR is the unit)
#                 c  no units declared, more than one
#
# The anchor: the CLOSING COMMIT of a spec with no unticked parent is the oldest commit in the newest
# unbroken run of first-parent states of its tasks.md with no unticked parent (any column-0
# `- [<not x>]` line ends the run; `open` above still counts `- [ ]` only). A later edit that moves no
# checkbox is not a closing; a reopened spec closes at its re-tick. It is the final unit's merge
# because a parent's tick lands with its unit (Task-Completion-Protocol), for every unit class: the
# units block is read for the class label only. A closing commit that predates adoption makes the
# spec touch-only whatever touched it later (an erratum, a ruling filed by another spec's PR).
#   The belt: a spec that would be touch-only stays a candidate if a post-adoption first-parent
#   commit ADDED a file matching completion/task-* (a task completion doc, an instruments block):
#   evidence of task work after the tick. Anchor = the newest such commit.
#   Closure undecidable: tasks.md has no checkbox parents, or a parent that is neither `[ ]` nor
#   `[x]` (an in-progress `[-]`). The path rule applies, labeled `closure undecidable`: touch-only
#   only if no post-adoption commit changed tasks.md or completion/**, otherwise a candidate anchored
#   on the last first-parent touch. The fallback never excludes on a closing it could not find.
#
# Candidates print first, then closed, open, stub, touch-only; specs in name order within each.
# The last line is the count:
#   owed-set: <n> candidates; excluded: <c> closed, <o> open, <s> stub, <t> touch-only; classes
#   a/b/c = <x>/<y>/<z>; <p> specs without activity since <date>; adoption <date> from <source>; ref <sha>
# Identities a reader can check: rows = n + c + o + s + t, and x + y + z = n (the classes split
# the candidates). A dropped class is an arithmetic error, never a healthy-looking short list.
#
# Residuals and known limits (Stacy's, carried and pinned in scripts/__tests__/owed-set.test.ts):
#   - A checkbox is an assertion, not a merge fact. `open` hides a real owe if a box is left
#     unticked; a spec ticked before adoption whose final work merged after it is hidden unless the
#     belt fires. Each reason says what it read.
#   - A closing commit that itself carries a pre-adoption committer date (a back-dated rebase, a
#     clock error) is outside the set by the predicate's wording ("dated on or after") and, with no
#     other post-adoption touch, prints no row: it counts under "specs without activity".
#   - Consumers without bash are unserved.
# Authority for the anchor: .kiro/issues/2026-10-25-owed-set-anchor-proxy-false-positives.md (fork
# (A), Peter 2026-10-25; Stacy's fixtures). It retires the path proxy ("anchor = the last
# first-parent commit touching the spec") that listed 122 and 023, closed specs, at 16.1.0.

DEFAULT_SPECS_DIR=.kiro/specs
DEFAULT_BALLOT=.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md

unavailable() {
  printf 'owed-set: unavailable (%s) — continue\n' "$1"
  exit 0
}

SPECS_ARG=$DEFAULT_SPECS_DIR
ADOPTION_FILE=""
BALLOT_FILE=""
BALLOT_GIVEN=0
while [ $# -gt 0 ]; do
  case "$1" in
    --specs-dir) [ $# -ge 2 ] || unavailable "--specs-dir needs a value"; SPECS_ARG=$2; shift 2 ;;
    --specs-dir=*) SPECS_ARG=${1#*=}; shift ;;
    --adoption) [ $# -ge 2 ] || unavailable "--adoption needs a value"; ADOPTION_FILE=$2; shift 2 ;;
    --adoption=*) ADOPTION_FILE=${1#*=}; shift ;;
    --adoption-ballot) [ $# -ge 2 ] || unavailable "--adoption-ballot needs a value"; BALLOT_FILE=$2; BALLOT_GIVEN=1; shift 2 ;;
    --adoption-ballot=*) BALLOT_FILE=${1#*=}; BALLOT_GIVEN=1; shift ;;
    *) unavailable "unknown argument '$1'; usage: owed-set.sh [--specs-dir <dir>] [--adoption <file>] [--adoption-ballot <file>]" ;;
  esac
done

command -v git >/dev/null 2>&1 || unavailable "git not found"
TOP=$(git rev-parse --show-toplevel 2>/dev/null) || unavailable "not inside a git repository"
TOPP=$(cd "$TOP" 2>/dev/null && pwd -P) || unavailable "cannot enter the repository root"

# --- the adoption date: flag files are read as given, relative to the current directory ---
is_date() { printf '%s' "$1" | grep -qE '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'; }
read_date() { # <file> <marker>: the first `<marker> YYYY-MM-DD` line's date, or nothing
  [ -f "$1" ] || return 0
  grep -m1 "^$2 " "$1" 2>/dev/null | awk '{print $2}'
}
DATE=""
SOURCE=""
TRIED=""
if [ -n "$ADOPTION_FILE" ]; then
  d=$(read_date "$ADOPTION_FILE" 'Adopted:')
  if is_date "$d"; then DATE=$d; SOURCE=$ADOPTION_FILE; else TRIED="$TRIED$ADOPTION_FILE gives no Adopted: date; "; fi
fi
if [ -z "$DATE" ] && [ "$BALLOT_GIVEN" -eq 1 ]; then
  d=$(read_date "$BALLOT_FILE" 'Ratified-machine:')
  if is_date "$d"; then DATE=$d; SOURCE=$BALLOT_FILE; else TRIED="$TRIED$BALLOT_FILE gives no Ratified-machine: date; "; fi
fi

# --- the specs directory, as a path relative to the repository root ---
SPECS_ABS=$(cd "$SPECS_ARG" 2>/dev/null && pwd -P) || unavailable "no specs directory at $SPECS_ARG"
case "$SPECS_ABS" in
  "$TOPP"/?*) SD=${SPECS_ABS#"$TOPP"/} ;;
  *) unavailable "specs directory $SPECS_ARG is not inside the repository" ;;
esac

cd "$TOP" 2>/dev/null || unavailable "cannot enter the repository root"
G() { TZ=UTC0 git -c core.quotePath=false "$@"; } # TZ only moves %cd (the UTC day below)
REF=$(G rev-parse -q --verify 'HEAD^{commit}' 2>/dev/null) || unavailable "no commit at HEAD"
REFS=$(G rev-parse --short "$REF" 2>/dev/null) || unavailable "cannot abbreviate HEAD"

if [ -z "$DATE" ] && [ "$BALLOT_GIVEN" -eq 0 ] && [ -f "$DEFAULT_BALLOT" ]; then
  d=$(read_date "$DEFAULT_BALLOT" 'Ratified-machine:')
  if is_date "$d"; then DATE=$d; SOURCE=$DEFAULT_BALLOT; else TRIED="$TRIED$DEFAULT_BALLOT gives no Ratified-machine: date; "; fi
fi
if [ -z "$DATE" ]; then
  d=$(G log --first-parent --diff-filter=A --reverse --format=%cs "$REF" -- designerpunk.manifest.json 2>/dev/null | head -1)
  if is_date "$d"; then DATE=$d; SOURCE="designerpunk.manifest.json (first commit)"
  else TRIED="${TRIED}designerpunk.manifest.json is not committed on the first-parent line"; fi
fi
[ -n "$DATE" ] || unavailable "no adoption date: ${TRIED%; }"
# --- dates: every dated git log line is  <sha>\t<%cs>\t<UTC day>[\t<subject>] ---
DF=--date=format-local:%Y-%m-%d
is_post() { [ ! "$1" \< "$DATE" ] || [ ! "$2" \< "$DATE" ]; } # <%cs> <UTC day>
post_lines() { awk -F'\t' -v d="$DATE" '$2 >= d || $3 >= d'; }
day() { if [ "$1" \< "$DATE" ] && [ ! "$2" \< "$DATE" ]; then printf '%s (UTC %s)' "$1" "$2"; else printf '%s' "$1"; fi; }
fp_log() { G log --first-parent "$DF" "$@" 2>/dev/null; } # first-parent, from REF unless given

# --- every spec a post-adoption first-parent commit touched (the whole line, filtered by date) ---
RAW=$(G log --first-parent "$DF" --name-only --format='@%cs%x09%cd' "$REF" -- "$SD/" 2>/dev/null) \
  || unavailable "git log over $SD failed"
NAMES=$(printf '%s\n' "$RAW" | awk -F'\t' -v d="$DATE" '/^@/ { ok = (substr($1, 2) >= d || $2 >= d); next } ok && NF')
SPECS=$(printf '%s\n' "$NAMES" | while IFS= read -r p; do
  case "$p" in ("$SD"/*/*) r=${p#"$SD"/}; printf '%s\n' "${r%%/*}" ;; esac
done | LC_ALL=C sort -u)

ALL=$(G ls-tree -d --name-only "$REF" -- "$SD/" 2>/dev/null | while IFS= read -r p; do printf '%s\n' "${p#"$SD"/}"; done | LC_ALL=C sort -u)
P=0
while IFS= read -r s; do
  [ -n "$s" ] || continue
  printf '%s\n' "$SPECS" | grep -qxF -- "$s" || P=$((P + 1))
done <<EOF
$ALL
EOF

has() { G cat-file -e "$REF:$1" 2>/dev/null; }
oneline() { head -1 | tr '\t' ' ' | cut -c1-"$1"; }
last_touch() { fp_log -1 --format='%h %cs %s' "$REF" -- "$1/" | oneline 90; }

N=0; CC=0; O=0; ST=0; T=0; XA=0; XB=0; XC=0
R_CAND=""; R_CLOSED=""; R_OPEN=""; R_STUB=""; R_TOUCH=""
row() { printf '%s\t%s\t%s\n' "$1" "$2" "$3"; }

while IFS= read -r S; do
  [ -n "$S" ] || continue
  D="$SD/$S"
  if has "$D/completion/claims-pass.md"; then
    CC=$((CC + 1)); R_CLOSED="$R_CLOSED$(row closed "$S" 'completion/claims-pass.md present')
"
    continue
  fi
  if ! has "$D/tasks.md"; then
    files=$(G ls-tree -r --name-only "$REF" -- "$D/" 2>/dev/null | while IFS= read -r p; do printf '%s\n' "${p#"$D"/}"; done)
    nf=$(printf '%s' "$files" | grep -c .)
    if [ "$nf" -eq 0 ]; then why="no tasks.md; no files at the ref (directory removed or renamed)"
    else
      shown=$(printf '%s\n' "$files" | head -8 | paste -sd ',' - | sed 's/,/, /g')
      [ "$nf" -gt 8 ] && shown="$shown, +$((nf - 8)) more"
      why="no tasks.md; files: $shown"
    fi
    ST=$((ST + 1)); R_STUB="$R_STUB$(row stub "$S" "$why")
"
    continue
  fi
  tasks=$(G show "$REF:$D/tasks.md" 2>/dev/null) || unavailable "cannot read $D/tasks.md at $REFS"
  m=$(printf '%s\n' "$tasks" | grep -cE '^- \[.\]')
  u=$(printf '%s\n' "$tasks" | grep -cE '^- \[ \]')
  if [ "$u" -gt 0 ]; then
    O=$((O + 1)); R_OPEN="$R_OPEN$(row open "$S" "$u of $m parents unticked in tasks.md (a checkbox is an assertion, not a merge fact)")
"
    continue
  fi

  # --- the closing commit: the oldest of the newest unbroken run of tasks.md states with no unticked parent ---
  CS=""; CD=""; CU=""
  if [ "$m" -gt 0 ]; then
    HIST=$(fp_log --format='%h%x09%cs%x09%cd' "$REF" -- "$D/tasks.md") || unavailable "git log over $D/tasks.md failed"
    while IFS="$(printf '\t')" read -r h cs ud; do
      [ -n "$h" ] || break
      state=$(G show "$h:$D/tasks.md" 2>/dev/null) || break
      printf '%s\n' "$state" | grep -qE '^- \[[^xX]\]' && break
      CS=$h; CD=$cs; CU=$ud
    done <<EOF
$HIST
EOF
  fi

  if [ -z "$CS" ]; then
    # closure undecidable: the path rule, labeled; it never excludes on a closing it could not find
    if [ "$m" -eq 0 ]; then undec="no checkbox parents in tasks.md"; else undec="a parent in tasks.md is marked neither [ ] nor [x]"; fi
    work=$(fp_log --format='%h%x09%cs%x09%cd' "$REF" -- "$D/tasks.md" "$D/completion/" | post_lines | head -1)
    if [ -z "$work" ]; then
      T=$((T + 1)); R_TOUCH="$R_TOUCH$(row touch-only "$S" "no post-adoption change to tasks.md or completion/ (closure undecidable: $undec); last touch $(last_touch "$D")")
"
      continue
    fi
    IFS="$(printf '\t')" read -r ah acs aud <<EOF
$(fp_log -1 --format='%h%x09%cs%x09%cd' "$REF" -- "$D/")
EOF
    note="last first-parent touch; closure undecidable: $undec"
  elif is_post "$CD" "$CU"; then
    ah=$CS; acs=$CD; aud=$CU
    note="closing commit: last unticked parent ticked"
  else
    # the belt: a completion/task-* file ADDED after adoption keeps a pre-adoption closing a candidate
    belt=$(fp_log --diff-filter=A --format='%h%x09%cs%x09%cd' "$REF" -- "$D/completion/task-*" | post_lines | head -1)
    if [ -z "$belt" ]; then
      T=$((T + 1)); R_TOUCH="$R_TOUCH$(row touch-only "$S" "closing commit $CS $(day "$CD" "$CU") predates adoption (last unticked parent ticked); last touch $(last_touch "$D")")
"
      continue
    fi
    IFS="$(printf '\t')" read -r ah acs aud <<EOF
$belt
EOF
    note="a completion/task-* file added after the pre-adoption closing commit $CS $CD"
  fi

  if printf '%s\n' "$tasks" | grep -qE '^## Declared Merge Units' \
    || printf '%s\n' "$tasks" | grep -qE '^\*\*Merge units \(' \
    || printf '%s\n' "$tasks" | grep -qiE '^#{2,4} .*merge unit'; then cls=a; XA=$((XA + 1))
  else
    k=$(fp_log --format='%h%x09%cs%x09%cd' "$REF" -- "$D/" | post_lines | grep -c .)
    if [ "$k" -le 1 ]; then cls=b; XB=$((XB + 1)); else cls=c; XC=$((XC + 1)); fi
  fi
  N=$((N + 1)); R_CAND="$R_CAND$(row candidate "$S" "unit class $cls; anchor $ah $(day "$acs" "$aud") ($note)")
"
done <<EOF
$SPECS
EOF

printf '%s%s%s%s%s' "$R_CAND" "$R_CLOSED" "$R_OPEN" "$R_STUB" "$R_TOUCH"
echo "owed-set: $N candidates; excluded: $CC closed, $O open, $ST stub, $T touch-only; classes a/b/c = $XA/$XB/$XC; $P specs without activity since $DATE; adoption $DATE from $SOURCE; ref $REFS"
exit 0
