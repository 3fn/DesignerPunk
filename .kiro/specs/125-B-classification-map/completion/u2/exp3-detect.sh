#!/usr/bin/env bash
# THROWAWAY spike prototype — Spec 125-B Exp 3 (subtask 4.1).
# NOT standing tooling. NOT a required check. Confined to the spec dir.
# Purpose: detect "a diff introduced a new token definition" against src/tokens/** SOURCE only.
#
# Marker forms (decided in-task, Ada):
#   Shape (a): a new token-key line added inside an existing *Tokens.ts export.
#              - primitive: bare identifier key at 2-space indent:  `  space700: {`
#              - semantic:  quoted dotted-string key at 2-space indent: `  'color.x.y': {`
#   Shape (b): a brand-new *Tokens.ts source file (git add).
#
# Two detection strata are emitted so the noise floor is visible:
#   NAIVE  = any added `<prop>: {` block-opener (over-matches nested props/groupings)
#   REFINED= 2-space-indent bare-or-quoted key opener only (token-record direct children)
#
# Scope guard: src/tokens/**/*.ts excluding __tests__. Generated output is out of repo scope entirely.

set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

pathspec=( 'src/tokens/*.ts' 'src/tokens/semantic/*.ts' 'src/tokens/color/**/*.ts' 'src/tokens/component/*.ts' 'src/tokens/themes/**/*.ts' )

# added-line, source .ts only, drop test files, drop the +++ header
added_src_lines() { # $1 = commit
  git show "$1" -- "${pathspec[@]}" 2>/dev/null \
    | grep -vE '__tests__' \
    | grep -E '^\+' | grep -vE '^\+\+\+'
}

naive_count() { # added `<anything>: {` openers
  added_src_lines "$1" | grep -cE '^\+[[:space:]]+[^[:space:]].*:[[:space:]]*\{[[:space:]]*$' || true
}

refined_count() { # 2-space indent, bare identifier OR single-quoted dotted string, ": {" EOL
  added_src_lines "$1" \
    | grep -cE "^\+  ([a-z][a-zA-Z0-9]*|'[a-zA-Z][a-zA-Z0-9._-]*'):[[:space:]]*\{[[:space:]]*$" || true
}

newfile_count() { # shape (b): new *Tokens.ts source files added in this commit
  git show --diff-filter=A --name-only --format='' "$1" -- "${pathspec[@]}" 2>/dev/null \
    | grep -vE '__tests__' | grep -cE 'Tokens\.ts$' || true
}

if [[ "${1:-}" == "--corpus" ]]; then
  printf '%-10s | %5s | %5s | %5s | %s\n' "commit" "naive" "refnd" "nfile" "subject"
  git log --reverse --format='%h' -- "${pathspec[@]}" | while read -r c; do
    subj=$(git log -1 --format='%s' "$c")
    case "$subj" in *test*|*Test*) continue;; esac
    n=$(naive_count "$c"); r=$(refined_count "$c"); f=$(newfile_count "$c")
    # only print commits where SOMETHING fired (a detection-positive under either stratum)
    if [[ "$n" -gt 0 || "$r" -gt 0 || "$f" -gt 0 ]]; then
      printf '%-10s | %5s | %5s | %5s | %s\n' "$c" "$n" "$r" "$f" "${subj:0:64}"
    fi
  done
  exit 0
fi

# single-commit detail mode
c="$1"
echo "commit $c :: $(git log -1 --format='%s' "$c")"
echo "  naive openers : $(naive_count "$c")"
echo "  refined keys  : $(refined_count "$c")"
echo "  new files     : $(newfile_count "$c")"
echo "  refined key lines:"
added_src_lines "$c" | grep -E "^\+  ([a-z][a-zA-Z0-9]*|'[a-zA-Z][a-zA-Z0-9._-]*'):[[:space:]]*\{[[:space:]]*$" || echo "    (none)"
