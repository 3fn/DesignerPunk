#!/bin/bash
# DEPRECATED (Spec 099, 2026-05-03): Superseded by Docs MCP list_cross_references() tool.
# The MCP tool provides the same data with better structure (JSON with target, context, section, line number).
# Use: list_cross_references({ path: ".kiro/steering/<doc>.md" }) via MCP query.
# This script is preserved as a historical artifact. Do not use for new work.
#
# Original purpose: Scan and validate cross-references in steering documents

OUTPUT_FILE=".kiro/specs/020-steering-documentation-refinement/cross-reference-report.md"

echo "# Cross-Reference Validation Report" > "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "**Date**: $(date +%Y-%m-%d)" >> "$OUTPUT_FILE"
echo "**Purpose**: Validation of cross-references across steering documents" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "## Cross-References by Document" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Function to extract cross-references from a file
scan_references() {
    local file="$1"
    local filename=$(basename "$file")

    echo "### $filename" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"

    # Extract markdown links
    grep -o '\[.*\](.*\.md[^)]*)' "$file" > /tmp/links.txt || true

    if [ -s /tmp/links.txt ]; then
        echo "**Cross-references found:**" >> "$OUTPUT_FILE"
        while read -r link; do
            echo "- $link" >> "$OUTPUT_FILE"
        done < /tmp/links.txt
        echo "" >> "$OUTPUT_FILE"
    else
        echo "**No cross-references found**" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    fi

    echo "---" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
}

# Scan all steering documents
for file in .kiro/steering/*.md; do
    scan_references "$file"
done

# Add summary
echo "## Summary" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

total_refs=$(grep -oh '\[.*\](.*\.md[^)]*)' .kiro/steering/*.md | wc -l)
echo "**Total cross-references**: $total_refs" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "Cross-reference report created at: $OUTPUT_FILE"
