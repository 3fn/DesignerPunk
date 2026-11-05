#!/usr/bin/env bash
# baseline-snapshot.sh — the 16.2.0 baseline record's figures, each with the command that produced it.
#
# Brief: Peter's R9 (".kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md" § R9),
# § 2 "The baseline snapshot". This is an EVIDENCE GENERATOR, not governance law and not a check:
# it reads git objects only (no checkout, no network), prints markdown to stdout, and exits 0
# unless an argument does not resolve. Its home is Spec 131's evidence directory because the
# figures are 131's "before"; it is in no CI lane and no rule names it.
# Since ballot 2026-11-04-waiting-spec-row, its 'Waiting specs at S' block is the table RELEASE-FLOW
# item 3a pastes at each S; the table above it remains Spec 131's evidence.
#
# Usage: bash .kiro/specs/131-governance-simplification/evidence/baseline-snapshot.sh <prev-S> <S> <walk-start> <version>
#   <prev-S>      the previous release's S (the window's lower bound, exclusive)
#   <S>           the release commit being measured (the window's upper bound, inclusive)
#   <walk-start>  the walk record's first `main at:` SHA (due rows "at walk start")
#   <version>     the release version, for the due-row grep (e.g. 16.2.0)
#
# Run from any checkout of this repository. Figures marked "heuristic" depend on a stated
# definition, printed beside them; change the definition, and the figure changes with it.
set -u
PREV="${1:?prev-S}"; S="${2:?S}"; WALK="${3:?walk-start}"; V="${4:?version}"
for r in "$PREV" "$S" "$WALK"; do git rev-parse -q --verify "$r^{commit}" >/dev/null || { echo "baseline-snapshot: cannot resolve $r" >&2; exit 2; }; done
SS=$(git rev-parse --short=9 "$S^{commit}"); PS=$(git rev-parse --short=9 "$PREV^{commit}"); WS=$(git rev-parse --short=9 "$WALK^{commit}")
S="$SS"; PREV="$PS"; WALK="$WS"
VE=$(printf %s "$V" | sed 's/\./\\./g')

root_files() { git ls-tree --name-only "$1" .kiro/issues/ | grep -E '\.md$' | grep -v '^\.kiro/issues/README\.md$'; }
# A table cell's command: pipes escaped for the table, wrapped in a double-backtick span so
# single backticks inside it survive.
row() { printf '| %s | %s | `` %s `` |\n' "$1" "$2" "$(printf %s "$3" | sed 's/|/\\|/g')"; }

echo "## Baseline at S \`$SS\` (window \`$PS\`..\`$SS\`; walk start \`$WS\`; version $V)"
echo
echo "| Measure | Figure | Command |"
echo "|---|---|---|"

# 1. Root records, and their words
n=$(root_files "$S" | wc -l | tr -d ' ')
w=0; for f in $(root_files "$S"); do c=$(git show "$S:$f" | wc -w | tr -d ' '); w=$((w+c)); done
row "Root records (README excluded)" "$n" "git ls-tree --name-only $SS .kiro/issues/ | grep -E '\\.md\$' | grep -v README | wc -l"
row "Root records, total words" "$w" "for f in <those>; do git show $SS:\$f | wc -w; done | sum"

# 2. Ballots, ratified vs draft (by the first **Status** line)
bt=0; br=0; bd=0; bo=0
for f in $(git ls-tree --name-only "$S" .kiro/docs/ballots/ | grep -E '\.md$' | grep -v '/README\.md$'); do
  bt=$((bt+1)); st=$(git show "$S:$f" | grep -m1 -E '^\*\*Status\*\*' || true)
  case "$st" in *RATIFIED*) br=$((br+1));; *DRAFT*) bd=$((bd+1));; *) bo=$((bo+1));; esac
done
row "Ballots (README excluded)" "$bt: $br ratified, $bd draft, $bo other or no Status line" "git ls-tree --name-only $SS .kiro/docs/ballots/; first ^**Status** line contains RATIFIED / DRAFT"

# 3. Always-loaded words
aw=0; for f in $(git ls-tree --name-only "$S" .kiro/steering/ | grep -E '\.md$'); do c=$(git show "$S:$f" | wc -w | tr -d ' '); aw=$((aw+c)); done
row "Always-loaded words (.kiro/steering/*.md)" "$aw" "git show $SS:.kiro/steering/<each>.md | wc -w (sum)"

# 4. Walk rows: due rows at walk start, and at S
due() { git grep -lE '^\*\*Trigger\*\*: `(release:('"$VE"'|next):phase-1|tag:v'"$VE"')`' "$1" -- ':(glob).kiro/issues/*.md' 2>/dev/null | wc -l | tr -d ' '; }
row "Walk rows (due records) at walk start" "$(due "$WALK")" "git grep -lE '^\\*\\*Trigger\\*\\*: \`(release:($V|next):phase-1|tag:v$V)\`' $WS -- ':(glob).kiro/issues/*.md' | wc -l"
row "Walk rows (due records) at S" "$(due "$S")" "the same grep at $SS"

# 5. Grant records filed in the window (added under .kiro/issues/, Class kind 'grant', read at S in root or archive)
g=0; gl=""
for f in $(git log --diff-filter=A --name-only --format= "$PREV..$S" -- .kiro/issues/ | grep -E '\.md$' | sort -u); do
  b=$(basename "$f"); body=$(git show "$S:.kiro/issues/$b" 2>/dev/null || git show "$S:.kiro/issues/archive/$b" 2>/dev/null || true)
  printf '%s\n' "$body" | grep -qE '^\*\*Class\*\*:.*·[[:space:]]*grant' && { g=$((g+1)); gl="$gl $b"; }
done
row "Grant records filed this release" "$g" "git log --diff-filter=A --name-only $PS..$SS -- .kiro/issues/ → Class line '· grant', read at $SS (root or archive/)"

# 5b. Archive moves in the window, split by outcome kind. The kind is read from the moved record's
#     last line matching the 16.2.0 outcome grammar, `**Outcome (YYYY-MM-DD, <seat>)**: <kind> …`,
#     with <kind> in fixed | closed | dropped | stale | executed | routed. A record moved before
#     the grammar existed reads "unclassified". This is the figure that tells resolution from
#     relocation: one root count cannot.
af=0; ak_fixed=0; ak_closed=0; ak_dropped=0; ak_stale=0; ak_executed=0; ak_routed=0; ak_un=0
for f in $(git log --diff-filter=AR --name-only --format= "$PREV..$S" -- .kiro/issues/archive/ | grep -E '\.md$' | sort -u); do
  git cat-file -e "$S:$f" 2>/dev/null || continue
  af=$((af+1))
  k=$(git show "$S:$f" | grep -E '^\*\*Outcome \([0-9]{4}-[0-9]{2}-[0-9]{2}, [A-Za-z]+\)\*\*: (fixed|closed|dropped|stale|executed|routed)\b' | tail -1 | sed -E 's/^\*\*Outcome \([^)]*\)\*\*: ([a-z]+).*/\1/')
  case "$k" in fixed) ak_fixed=$((ak_fixed+1));; closed) ak_closed=$((ak_closed+1));; dropped) ak_dropped=$((ak_dropped+1));; stale) ak_stale=$((ak_stale+1));; executed) ak_executed=$((ak_executed+1));; routed) ak_routed=$((ak_routed+1));; *) ak_un=$((ak_un+1));; esac
done
row "Archive moves in the window, by outcome kind" "$af: fixed $ak_fixed, closed $ak_closed, dropped $ak_dropped, stale $ak_stale, executed $ak_executed, routed $ak_routed, unclassified $ak_un" "git log --diff-filter=AR --name-only $PS..$SS -- .kiro/issues/archive/; each file's last '**Outcome (YYYY-MM-DD, <seat>)**: <kind>' line at $SS"

# 6. Release PRs, split by what they touch (heuristic)
pt=0; pp=0; pg=0
for c in $(git rev-list --first-parent "$PREV..$S"); do
  pt=$((pt+1))
  if git diff-tree --no-commit-id --name-only -r "$c^" "$c" | grep -qE '^(src/|application-mcp-server/src/|mcp-server/src/|scripts/|tools/|bin/|\.github/)'; then pp=$((pp+1)); else pg=$((pg+1)); fi
done
row "Release PRs (first-parent commits in the window)" "$pt: $pp product/tooling source, $pg governance/records only" "git rev-list --first-parent $PS..$SS; product/tooling = touches src/, *-mcp-server/src/, scripts/, tools/, bin/ or .github/ (heuristic)"

# 7. Product share of commits (first-parent), by the brief's path set
pc=0
for c in $(git rev-list --first-parent "$PREV..$S"); do
  git diff-tree --no-commit-id --name-only -r "$c^" "$c" | grep -qE '^(src/(components|tokens|cli|generators|providers|build)/|application-mcp-server/src/|mcp-server/src/)' && pc=$((pc+1))
done
row "Product share of commits" "$pc / $pt" "first-parent commits in $PS..$SS touching src/{components,tokens,cli,generators,providers,build}/ or *-mcp-server/src/"

# 8. Oldest open P0 / P1 (root records whose Class line begins P0 or P1)
op=""; on=0
for f in $(root_files "$S"); do
  cl=$(git show "$S:$f" | grep -m1 -E '^\*\*Class\*\*:' || true)
  case "$cl" in '**Class**: P0'*|'**Class**: P1'*) on=$((on+1)); d=$(basename "$f" | cut -c1-10); case "$d" in 20??-??-??) [ -z "$op" ] || [ "$d" \< "$op" ] && op="$d";; esac;; esac
done
row "Open P0/P1 root records; the oldest" "$on; oldest ${op:-none} (filename date)" "root records at $SS whose first ^**Class** line begins 'P0' or 'P1'"

# 9. Forks per spec (heuristic): distinct fork IDs (F-<n> or P-<n>) named in the spec's
#    design-outline.md, and how many of them share a line with the word RULED/ruled.
#    Whether an unmarked one is still open needs a read; the figure says "not marked ruled".
for n in 128 129 130 131; do
  d=$(git ls-tree -d --name-only "$S" .kiro/specs/ | grep -E "/$n-" | head -1)
  if [ -z "$d" ] || ! git cat-file -e "$S:$d/design-outline.md" 2>/dev/null; then
    row "Forks, Spec $n (heuristic)" "no design-outline.md" "git cat-file -e $SS:${d:-.kiro/specs/$n-*}/design-outline.md"; continue
  fi
  body=$(git show "$S:$d/design-outline.md")
  ids=$(printf '%s\n' "$body" | grep -oE '\b[FP]-[0-9]+[a-z]?\b' | sort -u)
  tot=$(printf '%s\n' "$ids" | grep -c . || true)
  rul=0; for i in $ids; do printf '%s\n' "$body" | grep -E "\\b$i\\b" | grep -qiE 'ruled' && rul=$((rul+1)); done
  row "Forks, Spec $n (heuristic)" "$tot fork IDs named; $rul on a line marked ruled; $((tot-rul)) not marked ruled" "git show $SS:$d/design-outline.md | grep -oE '\\b[FP]-[0-9]+[a-z]?\\b' | sort -u; each ID's lines grepped for 'ruled' (-i)"
done

# 10. Native verification in CI
nv=$(git grep -lE 'xcodebuild|swift build|swiftc|gradle|kotlinc' "$S" -- '.github/workflows/' 2>/dev/null | wc -l | tr -d ' ')
if [ "$nv" = 0 ]; then nvt="none in CI"; else nvt="$nv workflow file(s) name a native toolchain (read them)"; fi
row "Native verification" "$nvt" "git grep -lE 'xcodebuild|swift build|swiftc|gradle|kotlinc' $SS -- .github/workflows/"

# 11. Waiting specs at S (ballot 2026-11-04-waiting-spec-row, site 3). The definition is RELEASE-FLOW
#     item 3a, "Waiting specs, at S": this block implements it and does not restate it. A change to
#     that paragraph's definition changes this block in the same PR, and a change here is read there.
#     The figure excludes a tag at S itself (--no-contains), so a run before step 5.2's tag and a
#     re-run after it print the same figures.
echo
echo "### Waiting specs at S \`$SS\`"
echo
echo "Command: \`\` for each dir in git ls-tree -d --name-only $SS .kiro/specs/: <dir>/design-outline.md present, <dir>/requirements.md absent, last column-0 '**Spec outcome (YYYY-MM-DD, <seat>)**: <kind>' line not 'closed'; c = git log -1 --format=%H $SS -- <dir>/design-outline.md; git tag --list 'v[0-9]*' --merged $SS --no-merged c --no-contains $SS | wc -l \`\`"
echo
echo "| Spec directory | Outline last moved | Releases since | Last outcome line |"
echo "|---|---|---|---|"
wn=0
for d in $(git ls-tree -d --name-only "$S" .kiro/specs/); do
  git cat-file -e "$S:$d/design-outline.md" 2>/dev/null || continue
  git cat-file -e "$S:$d/requirements.md" 2>/dev/null && continue
  oc=$(git show "$S:$d/design-outline.md" | grep -E '^\*\*Spec outcome \([0-9]{4}-[0-9]{2}-[0-9]{2}, [A-Za-z]+\)\*\*: (open|park|closed)' | tail -1)
  case "$oc" in *'**: closed'*) continue;; esac
  c=$(git log -1 --format=%H "$S" -- "$d/design-outline.md")
  n=$(git tag --list 'v[0-9]*' --merged "$S" --no-merged "$c" --no-contains "$S" | wc -l | tr -d ' ')
  wn=$((wn+1))
  printf '| `%s` | `%s` (%s) | %s | %s |\n' "${d##*/}" "$(git rev-parse --short=9 "$c")" "$(git log -1 --format=%cs "$c")" "$n" "$(printf %s "${oc:-none}" | sed 's/|/\\|/g')"
done
if [ "$wn" = 0 ]; then echo "| (none) | | | |"; fi
echo
echo "*Generated by \`baseline-snapshot.sh $PS $SS $WS $V\`; nothing above is typed by hand. Native output is reference source, not compile-verified (#453's form).*"
