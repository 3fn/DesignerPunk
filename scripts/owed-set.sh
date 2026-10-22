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
# the unavailable line. The boundary is pinned to 00:00 on that day (CLOSEOUT pilot F-1: a bare
# date means "now, on that day" to git and drops that day's earlier merges).
#
# Ground: the commit at HEAD, read with git (never the working tree), printed as `ref <sha>`.
# Run it on an up-to-date main; on a unit branch the branch's own commits count as first-parent.
#
# Output: one row per spec directory that a first-parent commit since the adoption day touched,
#   <class>\t<spec>\t<reason>
# exactly one class per spec, decided in this order:
#   closed      completion/claims-pass.md exists (a claims-pass-midpoint.md does NOT close)
#   stub        no tasks.md (a charter-only spec, or a directory gone at the ref); reason names the files
#   open        at least one unticked parent (`- [ ]` at column 0) in tasks.md; reason `N of M`;
#               a checkbox is an assertion, not a merge fact, and the reason says so
#   touch-only  no post-adoption first-parent commit changed tasks.md or completion/** — a
#               feedback / inbound / post-closure touch; reason names the last touching commit
#   candidate   everything else; reason keeps the unit class and the anchor:
#                 a  merge units declared in tasks.md (`## Declared Merge Units`, the legacy
#                    `**Merge units (` bold prose, or a heading containing "merge unit")
#                 b  no units declared, one post-adoption first-parent commit (that PR is the unit)
#                 c  no units declared, more than one
#               anchor = the last first-parent commit touching the spec (a proxy for the final
#               unit's merge; where the two differ, the definition governs)
# Candidates print first, then closed, open, stub, touch-only; specs in name order within each.
# The last line is the count:
#   owed-set: <n> candidates; excluded: <c> closed, <o> open, <s> stub, <t> touch-only; classes
#   a/b/c = <x>/<y>/<z>; <p> specs without activity since <date>; adoption <date> from <source>; ref <sha>
# Identities a reader can check: rows = n + c + o + s + t, and x + y + z = n (the classes split
# the candidates). A dropped class is an arithmetic error, never a healthy-looking short list.
#
# Residuals (Stacy's, carried): `open` and `touch-only` are heuristics over assertions and paths,
# not merge facts — a wrong `open` hides a real owe, so each reason says what it assumed. Only
# `- [ ]` counts as unticked; an in-progress `- [-]` parent leaves a spec a candidate (over-list,
# never hide). Consumers without bash are unserved.
#
# Known limit (Stacy's claims view, 2026-10-22, on this repository's first run): the anchor is a path
# proxy. A spec whose final unit merged before adoption, then touched after adoption by ANOTHER spec's
# PR adding a file under its completion/ (a ruling doc), prints `candidate`, not `touch-only`: 122
# (U11 merged 2026-07-11; anchor 7fa64c6d8 is #227's ruling doc). The row over-lists; it never hides
# an owe. Pinned in scripts/__tests__/owed-set.test.ts ("known limit").
# Also assumed: first-parent committer dates rise (true of squash and merge commits); git log --since
# stops walking at older-dated commits, so a first-parent line with a back-dated commit can drop specs.

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
G() { git -c core.quotePath=false "$@"; }
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
SINCE="$DATE 00:00"

# --- every spec a first-parent commit since the adoption day touched ---
NAMES=$(G log --first-parent --since="$SINCE" --name-only --pretty=format: "$REF" -- "$SD/" 2>/dev/null) \
  || unavailable "git log over $SD failed"
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
  work=$(G log --first-parent --since="$SINCE" --format=%h "$REF" -- "$D/tasks.md" "$D/completion/" 2>/dev/null | head -1)
  if [ -z "$work" ]; then
    last=$(G log --first-parent -1 --format='%h %cs %s' "$REF" -- "$D/" 2>/dev/null | oneline 90)
    T=$((T + 1)); R_TOUCH="$R_TOUCH$(row touch-only "$S" "no post-adoption change to tasks.md or completion/; last touch $last")
"
    continue
  fi
  if printf '%s\n' "$tasks" | grep -qE '^## Declared Merge Units' \
    || printf '%s\n' "$tasks" | grep -qE '^\*\*Merge units \(' \
    || printf '%s\n' "$tasks" | grep -qiE '^#{2,4} .*merge unit'; then cls=a; XA=$((XA + 1))
  else
    k=$(G log --first-parent --since="$SINCE" --format=%h "$REF" -- "$D/" 2>/dev/null | grep -c .)
    if [ "$k" -le 1 ]; then cls=b; XB=$((XB + 1)); else cls=c; XC=$((XC + 1)); fi
  fi
  anchor=$(G log --first-parent -1 --format='%h %cs' "$REF" -- "$D/" 2>/dev/null)
  N=$((N + 1)); R_CAND="$R_CAND$(row candidate "$S" "unit class $cls; anchor $anchor (last first-parent touch)")
"
done <<EOF
$SPECS
EOF

printf '%s%s%s%s%s' "$R_CAND" "$R_CLOSED" "$R_OPEN" "$R_STUB" "$R_TOUCH"
echo "owed-set: $N candidates; excluded: $CC closed, $O open, $ST stub, $T touch-only; classes a/b/c = $XA/$XB/$XC; $P specs without activity since $DATE; adoption $DATE from $SOURCE; ref $REFS"
exit 0
