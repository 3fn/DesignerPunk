#!/bin/bash
# Governance check wrapper — orchestrates Civitas trigger scripts
# Called post-completion or standalone to verify governance health
#
# Usage: scripts/governance-check.sh [--full] [<base-ref>]
#   --full: Run all checks (staleness, metadata, cross-refs, prompt alignment)
#   <base-ref>: Git ref for affected-doc detection (default: last tag)
#
# Without --full: only runs if steering docs or agent configs changed
# Exit codes: 0 = clean, 1 = findings, 2 = error

set -euo pipefail

SCRIPTS_DIR="$(cd "$(dirname "$0")" && pwd)"
FULL_CHECK=false
BASE_REF=""

# Parse arguments
for arg in "$@"; do
  case "$arg" in
    --full) FULL_CHECK=true ;;
    *) BASE_REF="$arg" ;;
  esac
done

echo "# Civitas Governance Check"
echo ""
echo "Date: $(date +%Y-%m-%d)"
echo ""

FINDINGS=0

# Fast no-op: check if steering docs or agent configs changed
if [ "$FULL_CHECK" = false ]; then
  if [ -z "$BASE_REF" ]; then
    if git describe --tags --abbrev=0 >/dev/null 2>&1; then
      BASE_REF=$(git describe --tags --abbrev=0)
    else
      BASE_REF="HEAD~1"
    fi
  fi
  
  CHANGES=$(git diff --name-only "$BASE_REF"..HEAD -- .kiro/steering .kiro/agents 2>/dev/null || echo "")
  
  if [ -z "$CHANGES" ]; then
    echo "✅ No governance-relevant changes detected. Skipping checks."
    exit 0
  fi
  
  echo "Governance-relevant changes detected since $BASE_REF. Running checks..."
  echo ""
fi

# === Trigger 1: Affected steering docs ===
echo "## 1. Affected Steering Docs"
echo ""
if [ -x "$SCRIPTS_DIR/detect-affected-steering-docs.sh" ]; then
  "$SCRIPTS_DIR/detect-affected-steering-docs.sh" ${BASE_REF:-} 2>&1 || FINDINGS=1
else
  echo "⚠️  detect-affected-steering-docs.sh not found or not executable"
fi
echo ""

# === Trigger 2: Metadata validation ===
echo "## 2. Steering Doc Metadata"
echo ""
if [ -x "$SCRIPTS_DIR/validate-steering-metadata.js" ] || [ -f "$SCRIPTS_DIR/validate-steering-metadata.js" ]; then
  node "$SCRIPTS_DIR/validate-steering-metadata.js" 2>&1 | tail -10 || FINDINGS=1
else
  echo "⚠️  validate-steering-metadata.js not found"
fi
echo ""

# === Trigger 3: Staleness detection ===
echo "## 3. Staleness Detection"
echo ""
if [ -f "$SCRIPTS_DIR/detect-stale-metadata.js" ]; then
  node "$SCRIPTS_DIR/detect-stale-metadata.js" 2>&1 | grep -A2 "=== Summary ===" || FINDINGS=1
else
  echo "⚠️  detect-stale-metadata.js not found"
fi
echo ""

# === Trigger 4: Prompt alignment (only if agent configs changed or --full) ===
AGENT_CHANGES=$(git diff --name-only "${BASE_REF:-HEAD~1}"..HEAD -- .kiro/agents 2>/dev/null || echo "")
if [ -n "$AGENT_CHANGES" ] || [ "$FULL_CHECK" = true ]; then
  echo "## 4. Prompt Alignment"
  echo ""
  if [ -x "$SCRIPTS_DIR/verify-prompt-alignment.sh" ]; then
    "$SCRIPTS_DIR/verify-prompt-alignment.sh" 2>&1 || FINDINGS=1
  else
    echo "⚠️  verify-prompt-alignment.sh not found or not executable"
  fi
  echo ""
fi

# === Summary ===
echo "---"
if [ "$FINDINGS" -eq 0 ]; then
  echo "✅ Governance check complete. No issues found."
else
  echo "⚠️  Governance check complete. Issues found — review above."
fi

# Update governance health check date in Start Up Tasks if --full was used
if [ "$FULL_CHECK" = true ]; then
  STARTUP_FILE=".kiro/steering/Start Up Tasks.md"
  TODAY=$(date +%Y-%m-%d)
  if [ -f "$STARTUP_FILE" ]; then
    sed -i '' "s/\*\*\[.*\]\*\*/\*\*\[$TODAY\]\*\*/" "$STARTUP_FILE" 2>/dev/null || \
    sed -i "s/\*\*\[.*\]\*\*/\*\*\[$TODAY\]\*\*/" "$STARTUP_FILE" 2>/dev/null || \
    echo "⚠️  Could not auto-update governance date in Start Up Tasks. Update manually to $TODAY."
  fi
  echo ""
  echo "📅 Governance health check date updated to $TODAY in Start Up Tasks."
fi

if [ "$FINDINGS" -eq 0 ]; then
  exit 0
else
  exit 1
fi
