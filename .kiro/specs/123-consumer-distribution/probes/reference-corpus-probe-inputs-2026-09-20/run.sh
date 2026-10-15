#!/usr/bin/env bash
# Re-run of the 2026-09-20 reference-corpus probe (Spec 123 § 8).
# Usage: copy this folder to a fresh scratch dir, then:
#   PKG=@3fn/core@<release-4 version> ./run.sh
# Everything below mirrors the September command exactly except PKG and the
# absolute path inside mcp-docs.json, which must point at THIS folder.
set -euo pipefail
cd "$(dirname "$0")"
PKG="${PKG:-@3fn/core@14.1.0}"   # September run used 14.1.0 (latest published then)
rm -rf node_modules package-lock.json
npm install "$PKG" 2>&1 | tail -3
cat > mcp-docs.json <<JSON
{
  "mcpServers": {
    "designerpunk-docs": {
      "command": "node",
      "args": ["$(pwd)/node_modules/@3fn/core/dist/mcp/docs-mcp.js"]
    }
  }
}
JSON
TASK="$(cat prompt.txt)"
npx --yes @anthropic-ai/claude-code -p "$TASK" \
  --mcp-config mcp-docs.json --strict-mcp-config \
  --allowedTools "Read,Glob,Grep,Write,mcp__designerpunk-docs__find_docs,mcp__designerpunk-docs__get_document_summary,mcp__designerpunk-docs__get_section,mcp__designerpunk-docs__get_document_full" \
  --max-turns 25 --output-format stream-json --verbose \
  > transcript.jsonl 2> run-stderr.log
echo "exit=$?"
ls -la meridian-disabled-states.md 2>/dev/null || echo "deliverable NOT produced"
