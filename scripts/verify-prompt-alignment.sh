#!/bin/bash
# Verify agent prompt alignment with steering docs and Agent Directory
# Used as a post-prompt-modification trigger
#
# Usage: scripts/verify-prompt-alignment.sh [<prompt-file>]
#   <prompt-file>: Specific prompt to check (default: all prompts)
#
# Exit codes: 0 = aligned, 1 = findings, 2 = error

set -euo pipefail

AGENTS_DIR=".kiro/agents"
AGENT_DIR_FILE=".kiro/steering/Agent-Directory.md"

if [ ! -f "$AGENT_DIR_FILE" ]; then
  echo "❌ Agent Directory not found at $AGENT_DIR_FILE"
  exit 2
fi

FINDINGS=0

check_prompt() {
  local prompt_file="$1"
  local agent_name=$(basename "$prompt_file" | sed 's/-prompt\.md//')
  
  # Check 1: Agent name appears in Agent Directory
  if ! grep -qi "$agent_name" "$AGENT_DIR_FILE"; then
    echo "⚠️  $agent_name: Not found in Agent Directory"
    FINDINGS=1
  fi
  
  # Check 2: Corresponding JSON config exists
  local json_file="$AGENTS_DIR/$agent_name.json"
  if [ ! -f "$json_file" ]; then
    echo "⚠️  $agent_name: No JSON config at $json_file"
    FINDINGS=1
    return
  fi
  
  # Check 3: JSON config references this prompt file
  if ! grep -q "$agent_name-prompt.md" "$json_file"; then
    echo "⚠️  $agent_name: JSON config doesn't reference prompt file"
    FINDINGS=1
  fi
  
  # Check 4: Steering doc file:// references in JSON resolve to existing files
  local missing_refs=""
  while IFS= read -r ref; do
    local ref_path=$(echo "$ref" | sed 's/.*file:\/\///' | sed 's/".*//')
    # Resolve relative paths: check from agents dir first, then repo root
    local found=false
    if [[ "$ref_path" == ./* ]]; then
      local from_agents="$AGENTS_DIR/${ref_path#./}"
      local from_root="${ref_path#./}"
      if [ -f "$from_agents" ] || [ -d "$from_agents" ] || [ -f "$from_root" ] || [ -d "$from_root" ]; then
        found=true
      fi
    else
      if [ -f "$ref_path" ] || [ -d "$ref_path" ]; then
        found=true
      fi
    fi
    if [ "$found" = false ]; then
      missing_refs="$missing_refs\n    - $ref_path"
    fi
  done < <(grep '"file://' "$json_file" || true)
  
  if [ -n "$missing_refs" ]; then
    echo "⚠️  $agent_name: Broken file:// references:$missing_refs"
    FINDINGS=1
  fi
  
  # Check 5: skill:// references in JSON resolve to existing files
  while IFS= read -r ref; do
    local ref_path=$(echo "$ref" | sed 's/.*skill:\/\///' | sed 's/".*//')
    local found=false
    if [[ "$ref_path" == ./* ]]; then
      local from_agents="$AGENTS_DIR/${ref_path#./}"
      local from_root="${ref_path#./}"
      if [ -f "$from_agents" ] || [ -f "$from_root" ]; then
        found=true
      fi
    else
      if [ -f "$ref_path" ]; then
        found=true
      fi
    fi
    if [ "$found" = false ]; then
      echo "⚠️  $agent_name: Broken skill:// reference: $ref_path"
      FINDINGS=1
    fi
  done < <(grep '"skill://' "$json_file" || true)
}

echo "## Prompt Alignment Verification"
echo ""

if [ -n "${1:-}" ]; then
  # Check specific prompt
  if [ ! -f "$1" ]; then
    echo "❌ Prompt file not found: $1"
    exit 2
  fi
  check_prompt "$1"
else
  # Check all prompts
  for prompt in "$AGENTS_DIR"/*-prompt.md; do
    check_prompt "$prompt"
  done
fi

if [ "$FINDINGS" -eq 0 ]; then
  echo "✅ All prompts aligned. No issues found."
  exit 0
else
  echo ""
  echo "**Action:** Review and fix the issues above."
  exit 1
fi
