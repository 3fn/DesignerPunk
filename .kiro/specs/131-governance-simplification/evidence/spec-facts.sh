#!/usr/bin/env bash
# spec-facts.sh — where to look before a spec's round: one spec, one window, each row with the
# command that produced it.
#
# Brief: Peter's "Proceed as the team recommends" (chat, received before 2026-11-04T03:19:41Z),
# answering the options message that followed the facts-generator consult of 2026-11-04 (Ada,
# Lina, Leonardo, Stacy, Thurgood; two rounds). The tool is built for Spec 131's step 2; whether
# it becomes standing practice is Spec 131's question.
#
# This is an EVIDENCE GENERATOR, not governance law and not a check. It reads git objects only
# (no checkout, no network), prints markdown to stdout, and exits 0 unless an argument does not
# resolve. It is in no CI lane and no rule names it. Its rows are CANDIDATES, NOT VERDICTS: it
# says where to read, never what is open, ruled or owed. Its stdout is the file's content,
# unedited; commentary belongs in the spec's feedback.
#
# Usage: bash .kiro/specs/131-governance-simplification/evidence/spec-facts.sh <spec-id> <since-sha> <read-sha>
#   <spec-id>    the spec id, the leading segment of the spec directory name (128, 129, 125-A)
#   <since-sha>  the window's lower bound, exclusive (a SHA; e.g. the commit the outline last moved at)
#   <read-sha>   the commit everything is read at, the window's upper bound, inclusive (a SHA, never
#                a branch name: a branch moves, and the output would stop being re-runnable)
#
# Re-run a committed output byte for byte with the footer's line:
#   git show <gen-sha>:<this path> | SPEC_FACTS_GEN_SHA=<gen-sha> bash -s -- <args>
# SPEC_FACTS_GEN_SHA only names the generator in the footer when the script is read from stdin
# (it cannot hash itself then). Run from a file, the script finds its own commit by blob.
set -u
GEN_PATH=".kiro/specs/131-governance-simplification/evidence/spec-facts.sh"
ID="${1:?spec-id}"; SINCE_ARG="${2:?since-sha}"; READ_ARG="${3:?read-sha}"
die() { echo "spec-facts: $*" >&2; exit 2; }
for a in "$SINCE_ARG" "$READ_ARG"; do
  printf %s "$a" | grep -qE '^[0-9a-f]{7,40}$' || die "'$a' is not a SHA (7 to 40 hex digits); branch names and other refs are refused"
  git rev-parse -q --verify "$a^{commit}" >/dev/null || die "cannot resolve $a to a commit"
done
SINCE=$(git rev-parse "$SINCE_ARG^{commit}"); READ=$(git rev-parse "$READ_ARG^{commit}")
git merge-base --is-ancestor "$SINCE" "$READ" || die "$SINCE_ARG is not an ancestor of $READ_ARG"
S9=$(git rev-parse --short=9 "$SINCE"); R9=$(git rev-parse --short=9 "$READ")
DIR=$(git ls-tree -d --name-only "$READ" .kiro/specs/ | while read -r d; do b=${d##*/}; case "$b" in ("$ID"-[a-z]*) echo "$d";; esac; done)
[ -n "$DIR" ] || die "no .kiro/specs/$ID-<slug>/ directory at $R9"
[ "$(printf '%s\n' "$DIR" | wc -l | tr -d ' ')" = 1 ] || die "spec id $ID matches more than one directory at $R9"
DNAME=${DIR##*/}
OUTLINE="$DIR/design-outline.md"
if git cat-file -e "$READ:$OUTLINE" 2>/dev/null; then OUTBODY=$(git show "$READ:$OUTLINE"); HAVE_OUTLINE=1; else OUTBODY=""; HAVE_OUTLINE=0; fi

# Files in the spec directory at READ. Generated evidence (evidence/, facts-at-*.md) is excluded
# from every scan, so a committed output never feeds a later run.
spec_files() { git ls-tree -r --name-only "$READ" "$DIR/" | grep -E '\.md$' | grep -vE "^$DIR/evidence/|/facts-at-[^/]*\.md$"; }
inbounds() { spec_files | grep -E '/inbound[^/]*\.md$'; }
# The files the spec cites from: its outline, inbounds, feedback, and requirements/design/tasks.
citing_files() { spec_files | grep -E "^$DIR/(design-outline|requirements|design|tasks)\.md$|/inbound[^/]*\.md$|^$DIR/feedback(\.md$|/)"; }
root_records() { git ls-tree --name-only "$READ" .kiro/issues/ | grep -E '\.md$' | grep -v '^\.kiro/issues/README\.md$'; }
named_in_outline() { [ "$HAVE_OUTLINE" = 1 ] && printf '%s\n' "$OUTBODY" | grep -qF -- "$1"; }
cmd() { printf 'Command: `` %s ``\n\n' "$1"; }
none() { echo "- (none found by this command)"; }

echo "# Spec facts: $DNAME"
echo
echo "Window \`$S9\`..\`$R9\` (since exclusive, read inclusive). Read at \`$R9\`, committed $(git log -1 --format=%cs "$READ")."
echo "Every row below is a list of candidates for a reader, printed with the command that produced it. None is a verdict."
echo

# 1. Releases since
echo "## 1. Releases since \`$S9\`"
echo
cmd "git tag --list 'v[0-9]*' --merged $R9 --no-merged $S9 --sort=v:refname"
out=$(git tag --list 'v[0-9]*' --merged "$READ" --no-merged "$SINCE" --sort=v:refname)
if [ -z "$out" ]; then none; else
  for t in $out; do printf -- '- `%s` → `%s` (%s)\n' "$t" "$(git rev-parse --short=9 "$t^{commit}")" "$(git log -1 --format=%cs "$t^{commit}")"; done
fi
echo

# 2. Inbounds added since
echo "## 2. Inbounds added to the spec directory since \`$S9\`"
echo
cmd "git log --no-renames --diff-filter=A --format='C %h %cs' --name-only $S9..$R9 -- $DIR/ ; keep basenames inbound*.md"
out=$(git log --no-renames --diff-filter=A --format='C %h %cs' --name-only "$SINCE..$READ" -- "$DIR/" | awk '/^C /{c=$2" "$3; next} /\/inbound[^\/]*\.md$/{print $0" "c}' | grep -vE "^$DIR/evidence/")
if [ -z "$out" ]; then none; else printf '%s\n' "$out" | while read -r p c d; do printf -- '- `%s` (added `%s`, %s)\n' "$p" "$c" "$d"; done; fi
echo

# 3 and 4. Records whose Trigger names this spec's path
SAMPLE=$( { git ls-tree -r --name-only "$READ" "$DIR/"; for f in design-outline.md requirements.md design.md tasks.md completion/claims-pass.md completion/claims-pass-midpoint.md completion/task-1-completion.md; do echo "$DIR/$f"; done; } | sort -u)
TRIG=""
for f in $(root_records); do
  body=$(git show "$READ:$f")
  tl=$(printf '%s\n' "$body" | grep -m1 -E '^\*\*Trigger\*\*: ' || true)
  tok=$(printf '%s\n' "$tl" | sed -nE 's/^\*\*Trigger\*\*: `([^`]*)`.*/\1/p')
  case "$tok" in path:*) ;; *) continue;; esac
  hit=""
  for g in $(printf %s "${tok#path:}" | tr ',' ' '); do
    for p in $SAMPLE; do
      # shellcheck disable=SC2053  # $g is a glob on purpose
      if [[ $p == $g ]]; then hit="$g"; break; fi
    done
    [ -n "$hit" ] && break
  done
  [ -n "$hit" ] || continue
  cl=$(printf '%s\n' "$body" | grep -m1 -E '^\*\*Class\*\*:' | sed -E 's/^\*\*Class\*\*:[[:space:]]*//; s/[[:space:]]*·.*//; s/\*//g' || true)
  case "$cl" in P0*) k=1;; P1*) k=2;; 'P2 obligation (guard)'*) k=3;; 'P2 obligation (record)'*) k=4;; P2*) k=5;; P3*) k=6;; *) k=7;; esac
  TRIG="$TRIG$k	$f	${cl:-no Class line}	$hit
"
done
TRIG=$(printf %s "$TRIG" | grep . | sort -t "	" -k1,1n -k2,2)
echo "## 3. Root records whose Trigger names this spec's path, by Class"
echo
cmd "for each root .kiro/issues/*.md at $R9 (README excluded): first ^**Trigger**: line; its backticked path: token; does any of its globs match a file under $DIR/ at $R9, or that directory's design-outline.md, requirements.md, design.md, tasks.md, completion/claims-pass.md, completion/claims-pass-midpoint.md or completion/task-1-completion.md? Class = the first ^**Class**: line, up to the ·"
if [ -z "$TRIG" ]; then none; else
  printf '%s\n' "$TRIG" | while IFS="	" read -r k f cl g; do printf -- '- `%s` — %s — Trigger glob `%s`\n' "$f" "$cl" "$g"; done
  echo
  echo "P0 and P1 among them, named:"
  echo
  pp=$(printf '%s\n' "$TRIG" | awk -F '\t' '$1<=2')
  if [ -z "$pp" ]; then echo "- (none)"; else printf '%s\n' "$pp" | while IFS="	" read -r k f cl g; do printf -- '- `%s` — %s\n' "$f" "$cl"; done; fi
fi
echo

echo "## 4. Of those, records the outline does not name (intake candidates; warn only)"
echo
cmd "row 3's records whose file name does not appear in git show $R9:$OUTLINE"
if [ "$HAVE_OUTLINE" = 0 ]; then echo "- (no design-outline.md at $R9: every row-3 record is unnamed)"; fi
out=""
if [ -n "$TRIG" ]; then out=$(printf '%s\n' "$TRIG" | while IFS="	" read -r k f cl g; do named_in_outline "${f##*/}" || printf -- '- `%s` — %s\n' "$f" "$cl"; done); fi
if [ -z "$out" ]; then none; else printf '%s\n' "$out"; fi
echo

# 5. Records cited by the outline or its inbounds that are now archived
echo "## 5. Records the outline or its inbounds cite that are in archive/ at \`$R9\` (re-read candidates)"
echo
cmd "grep -oE '(\\.kiro/issues/(archive/)?)?20YY-MM-DD-<slug>.md' over git show $R9:<outline and each inbound*.md>; keep names absent from .kiro/issues/ and present in .kiro/issues/archive/ at $R9"
CIT=$( { [ "$HAVE_OUTLINE" = 1 ] && echo "$OUTLINE"; inbounds; } | while read -r src; do
  git show "$READ:$src" | grep -oE '(\.kiro/issues/(archive/)?)?20[0-9]{2}-[0-9]{2}-[0-9]{2}-[A-Za-z0-9._-]*[A-Za-z0-9_]\.md' | while read -r c; do printf '%s\t%s\n' "${c##*/}" "$src"; done
done | sort -u)
out=""
if [ -n "$CIT" ]; then
  for b in $(printf '%s\n' "$CIT" | cut -f1 | sort -u); do
    git cat-file -e "$READ:.kiro/issues/$b" 2>/dev/null && continue
    git cat-file -e "$READ:.kiro/issues/archive/$b" 2>/dev/null || continue
    srcs=$(printf '%s\n' "$CIT" | awk -F '\t' -v b="$b" '$1==b{print $2}' | sed 's/.*/`&`/' | paste -sd ',' - | sed 's/,/, /g')
    out="$out- \`.kiro/issues/archive/$b\` — cited in $srcs
"
  done
fi
if [ -z "$out" ]; then none; else printf %s "$out"; fi
echo

# 6. Inbounds the outline does not name by path
echo "## 6. Inbounds in the spec directory that the outline does not name"
echo
cmd "git ls-tree -r --name-only $R9 $DIR/ | grep '/inbound[^/]*\\.md\$'; keep those whose file name does not appear in git show $R9:$OUTLINE"
out=$(inbounds | while read -r p; do named_in_outline "${p##*/}" || printf -- '- `%s`\n' "$p"; done)
if [ -z "$out" ]; then none; else printf '%s\n' "$out"; fi
echo

# 7. E2's grep, verbatim
E2_TEMPLATE="grep -lE '(Spec |specs/)<id>([^A-Za-z0-9-]|\$)|<dir>' .kiro/issues/*.md | xargs grep -m1 -H '^\\*\\*Trigger\\*\\*: ' | cut -c1-240"
RE="(Spec |specs/)$ID([^A-Za-z0-9-]|\$)|$DNAME"
echo "## 7. E2's grep (Process-Spec-Planning § \"Before Formalizing: Records That Name the Spec\"): a superset"
echo
echo "E2's command, verbatim: \`\` $E2_TEMPLATE \`\` (\`<id>\` = \`$ID\`, \`<dir>\` = \`$DNAME\`)."
if git show "$READ:governance/Process-Spec-Planning.md" 2>/dev/null | grep -qF -- "$E2_TEMPLATE"; then echo "It is in governance/Process-Spec-Planning.md at \`$R9\`, character for character."; else echo "It is NOT in governance/Process-Spec-Planning.md at \`$R9\` character for character; read the doc at that SHA."; fi
echo "Run here on git objects at \`$R9\` (the same regex over each root .md file, README included, as the shell glob would; then the first Trigger line, cut at 240 characters). A superset: a match means the text names the spec, not that the record is the spec's."
echo
out=$(git ls-tree --name-only "$READ" .kiro/issues/ | grep -E '\.md$' | while read -r f; do
  b=$(git show "$READ:$f")
  printf '%s\n' "$b" | grep -qE -- "$RE" || continue
  printf '%s\n' "$b" | grep -m1 '^\*\*Trigger\*\*: ' | sed "s|^|$f:|" | cut -c1-240
done)
if [ -z "$out" ]; then none; else printf '%s\n' "$out" | sed 's/^/    /'; fi
echo

# 8. Where to read open questions
echo "## 8. Where to read open questions (no verdict, no count)"
echo
echo "This row says where to read. It does not say what is open: a line below may already be answered elsewhere."
echo
echo "### 8a. Every \`**Open for Peter**:\` line in the spec directory"
echo
cmd "git grep -n -F '**Open for Peter**:' $R9 -- $DIR/ (evidence/ excluded); text cut at 300 characters"
out=$(git grep -n -F '**Open for Peter**:' "$READ" -- "$DIR/" ":(exclude)$DIR/evidence/" 2>/dev/null | sed "s|^$READ:||" | cut -c1-300)
if [ -z "$out" ]; then none; else printf '%s\n' "$out" | while IFS= read -r l; do p=${l%%:*}; r=${l#*:}; n=${r%%:*}; t=${r#*:}; t=$(printf %s "$t" | sed -E 's/^[[:space:]]*([-*][[:space:]]+)?//'); printf -- '- `%s:%s` — %s\n' "$p" "$n" "$t"; done; fi
echo
echo "### 8b. Headings containing fork, open or ruling"
echo
cmd "git grep -n -i -E '^#+ .*(fork|open|ruling)' $R9 -- $DIR/ (evidence/ excluded)"
out=$(git grep -n -i -E '^#+ .*(fork|open|ruling)' "$READ" -- "$DIR/" ":(exclude)$DIR/evidence/" 2>/dev/null | sed "s|^$READ:||")
if [ -z "$out" ]; then none; else printf '%s\n' "$out" | while IFS= read -r l; do p=${l%%:*}; r=${l#*:}; t=${r#*:}; t=$(printf %s "$t" | sed -E 's/^#+[[:space:]]*//'); printf -- '- `%s` § "%s"\n' "$p" "$t"; done; fi
echo
echo "### 8c. Fork-shaped IDs, each with the files that mention it"
echo
FID='\b(F-?[0-9]+|P-[0-9]+|D-?[0-9]+|Q-?[0-9]+)[a-z]?\b'
cmd "grep -oE '$FID' over each .md file under $DIR/ at $R9 (evidence/ excluded). P without a dash is left out (P0–P3 are record classes)"
out=$(spec_files | while read -r p; do git show "$READ:$p" | grep -oE "$FID" | sort -u | sed "s|\$|	$p|"; done | sort -u)
if [ -z "$out" ]; then none; else
  for i in $(printf '%s\n' "$out" | cut -f1 | sort -u); do
    fs=$(printf '%s\n' "$out" | awk -F '\t' -v i="$i" '$1==i{print $2}' | sed "s|^$DIR/||; s/.*/\`&\`/" | paste -sd ',' - | sed 's/,/, /g')
    printf -- '- **%s**: %s\n' "$i" "$fs"
  done
fi
echo

# 9. One hop: cited files that changed in the window
echo "## 9. Files the spec cites by full repo path that changed in the window"
echo
cmd "grep -oE repo-path tokens over git show $R9:<the outline, inbounds, feedback, requirements, design, tasks>; keep those that are a file at $R9 or $S9 and lie outside $DIR/; git log --first-parent --format=%h $S9..$R9 -- <path>"
PATHS=$(citing_files | while read -r src; do
  git show "$READ:$src" | grep -oE '[A-Za-z0-9_.-]+(/[A-Za-z0-9_.@+-]+)+' | sed 's|^\./||; s|[.]*$||' | while read -r c; do printf '%s\t%s\n' "$c" "$src"; done
done | sort -u)
out=""
if [ -n "$PATHS" ]; then
  for p in $(printf '%s\n' "$PATHS" | cut -f1 | sort -u); do
    case "$p" in "$DIR"/*) continue;; esac
    if git cat-file -e "$READ:$p" 2>/dev/null; then [ "$(git cat-file -t "$READ:$p")" = blob ] || continue; st="present at $R9"
    elif git cat-file -e "$SINCE:$p" 2>/dev/null; then [ "$(git cat-file -t "$SINCE:$p")" = blob ] || continue; st="gone from this path at $R9"
    else continue; fi
    cs=$(git log --first-parent --format=%h "$SINCE..$READ" -- "$p" | sed 's/.*/`&`/' | paste -sd ',' - | sed 's/,/, /g')
    [ -n "$cs" ] || continue
    srcs=$(printf '%s\n' "$PATHS" | awk -F '\t' -v p="$p" '$1==p{print $2}' | sed "s|^$DIR/||; s/.*/\`&\`/" | paste -sd ',' - | sed 's/,/, /g')
    out="$out- \`$p\` ($st) — changed in $cs — cited in $srcs
"
  done
fi
if [ -z "$out" ]; then none; else printf %s "$out"; fi
echo

# Footer
if [ -n "${BASH_SOURCE[0]:-}" ] && [ -f "${BASH_SOURCE[0]}" ]; then
  blob=$(git hash-object "${BASH_SOURCE[0]}"); GEN=""
  for c in $(git log --format=%H HEAD -- "$GEN_PATH"); do [ "$(git rev-parse -q --verify "$c:$GEN_PATH" 2>/dev/null)" = "$blob" ] && { GEN=$(git rev-parse --short=9 "$c"); break; }; done
else
  GEN="${SPEC_FACTS_GEN_SHA:-}"
fi
echo "---"
echo
if [ -n "$GEN" ]; then
  echo "- **Generator**: \`$GEN_PATH\` @ \`$GEN\`; args \`$ID $SINCE_ARG $READ_ARG\`. Re-run: \`git show $GEN:$GEN_PATH | SPEC_FACTS_GEN_SHA=$GEN bash -s -- $ID $SINCE_ARG $READ_ARG\`"
elif [ -n "${blob:-}" ]; then
  echo "- **Generator**: \`$GEN_PATH\`, UNCOMMITTED copy (blob \`${blob:0:9}\` is in no commit of that path reachable from HEAD); args \`$ID $SINCE_ARG $READ_ARG\`. Not re-runnable by SHA: commit the generator before citing this output."
else
  echo "- **Generator**: \`$GEN_PATH\`, read from stdin without SPEC_FACTS_GEN_SHA, so its commit is not known here; args \`$ID $SINCE_ARG $READ_ARG\`."
fi
echo "- **Read SHA**: \`$READ\` (since \`$SINCE\`)"
echo "- **Candidates, not verdicts.** Every row is a list for a reader. An empty row means this command found nothing, not that nothing changed."
echo "- **Unedited stdout; commentary belongs in feedback.**"
echo "- **Blind spots** (this generator cannot see):"
echo "  1. numbered prose forks without IDs;"
echo "  2. rulings recorded in feedback, ballots, rulings records or chat;"
echo "  3. whether any line above is still open;"
echo "  4. dependencies that neither cite nor are cited (the G-4 → 130 case);"
echo "  5. premise changes from PRs that cite nothing the spec names (the #596 case)."
