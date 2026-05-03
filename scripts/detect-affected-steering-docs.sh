#!/bin/bash
# Detect steering documents affected by recent changes
# Used as a post-spec-completion trigger to identify docs needing review
#
# Usage: scripts/detect-affected-steering-docs.sh [<base-ref>]
#   <base-ref>: Git ref to compare against (default: last tag, fallback: HEAD~1)
#
# Exit codes: 0 = no changes, 1 = changes detected, 2 = error
# Output: Markdown-formatted list of affected steering docs

set -euo pipefail

STEERING_DIR=".kiro/steering"
AGENTS_DIR=".kiro/agents"

# Determine base reference
if [ -n "${1:-}" ]; then
  BASE_REF="$1"
elif git describe --tags --abbrev=0 >/dev/null 2>&1; then
  BASE_REF=$(git describe --tags --abbrev=0)
else
  echo "⚠️  No git tags found. Comparing against previous commit (HEAD~1)."
  BASE_REF="HEAD~1"
fi

# Check for steering doc changes
STEERING_CHANGES=$(git diff --name-only "$BASE_REF"..HEAD -- "$STEERING_DIR" 2>/dev/null || echo "")
AGENT_CHANGES=$(git diff --name-only "$BASE_REF"..HEAD -- "$AGENTS_DIR" 2>/dev/null || echo "")

if [ -z "$STEERING_CHANGES" ] && [ -z "$AGENT_CHANGES" ]; then
  echo "✅ No governance-relevant changes detected since $BASE_REF."
  exit 0
fi

echo "## Governance Changes Detected (since $BASE_REF)"
echo ""

if [ -n "$STEERING_CHANGES" ]; then
  STEERING_COUNT=$(echo "$STEERING_CHANGES" | wc -l | tr -d ' ')
  echo "### Steering Docs Modified ($STEERING_COUNT)"
  echo ""
  echo "$STEERING_CHANGES" | while read -r file; do
    echo "- \`$(basename "$file")\`"
  done
  echo ""
  echo "**Action:** Verify \`Last Reviewed\` dates are current. Check cross-references."
  echo ""
fi

if [ -n "$AGENT_CHANGES" ]; then
  AGENT_COUNT=$(echo "$AGENT_CHANGES" | wc -l | tr -d ' ')
  echo "### Agent Configs Modified ($AGENT_COUNT)"
  echo ""
  echo "$AGENT_CHANGES" | while read -r file; do
    echo "- \`$(basename "$file")\`"
  done
  echo ""
  echo "**Action:** Verify prompt-to-steering-doc alignment and Agent Directory consistency."
  echo ""
fi

exit 1
