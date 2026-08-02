#!/bin/bash
# Cross-reference scanner — repointed by Spec 119-B OB-1 (R9 AC4, Peter's
# ratified bundle routing of 2026-07-05: parser id-awareness + this repoint
# travel together).
#
# History: originally Spec 020 (steering-doc validation, .kiro/steering only);
# marked deprecated by Spec 099 in favor of the Docs MCP list_cross_references
# tool. 119-B revives it with a NEW role: the OPT-IN DETAIL CHANNEL for
# bare-id link-target diagnostics (design Component 6). The MCP tool serves
# validated refs; index-health emits the aggregate unresolved-count warning;
# THIS script lists every bare-id target individually — including UNRESOLVED
# ones — so "run scan-cross-references.sh for the list" resolves here.
#
# Scans BOTH corpus roots: governance/*.md (MCP-served) + .kiro/steering/*.md
# (the 9 identity docs). Resolution check: a bare-id target is RESOLVED iff
# some governance/*.md carries `id: <target>` frontmatter (identity docs are
# not MCP-indexed, so links targeting them report UNRESOLVED — correct: such
# a link cannot resolve through the docs MCP).
#
# Output: stdout. Exit 0 always (diagnostic, not a gate).

set -euo pipefail
cd "$(dirname "$0")/.."

echo "# Cross-reference scan — $(date +%Y-%m-%d)"
echo

# Build the known-id set from governance frontmatter
KNOWN_IDS=$(grep -h "^id: " governance/*.md 2>/dev/null | sed 's/^id: *//' | sort -u)

doc_count=0
md_total=0
bareid_total=0
unresolved_total=0

for file in governance/*.md .kiro/steering/*.md; do
  [ -f "$file" ] || continue
  doc_count=$((doc_count + 1))

  # Extract markdown link targets
  targets=$(grep -oE '\]\([^)]+\)' "$file" | sed 's/^](\(.*\))$/\1/' || true)
  [ -n "$targets" ] || continue

  md_refs=""
  bare_refs=""
  while IFS= read -r t; do
    [ -n "$t" ] || continue
    case "$t" in
      *.md*) md_refs="${md_refs}  - ${t}\n"; md_total=$((md_total + 1)) ;;
      *[/.:#]*) : ;; # URLs, anchors, dotted/slashed paths — not doc refs
      *)
        if printf '%s' "$t" | grep -qE '^[a-z0-9][a-z0-9-]*$'; then
          bareid_total=$((bareid_total + 1))
          if printf '%s\n' "$KNOWN_IDS" | grep -qx "$t"; then
            bare_refs="${bare_refs}  - ${t}\n"
          else
            bare_refs="${bare_refs}  - ${t}  [UNRESOLVED]\n"
            unresolved_total=$((unresolved_total + 1))
          fi
        fi
        ;;
    esac
  done <<< "$targets"

  if [ -n "$md_refs" ] || [ -n "$bare_refs" ]; then
    echo "## $file"
    if [ -n "$bare_refs" ]; then
      echo "bare-id link targets:"
      printf "%b" "$bare_refs"
    fi
    if [ -n "$md_refs" ]; then
      echo "path (.md) link targets:"
      printf "%b" "$md_refs"
    fi
    echo
  fi
done

echo "---"
echo "Docs scanned: $doc_count (governance + .kiro/steering)"
echo "Path (.md) refs: $md_total | bare-id refs: $bareid_total | UNRESOLVED bare-id: $unresolved_total"
exit 0
