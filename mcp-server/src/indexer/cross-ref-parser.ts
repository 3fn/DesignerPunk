/**
 * Cross-Reference Parser
 * 
 * Mechanically extracts markdown links from documentation without following them.
 * Tracks source section for each reference to provide context.
 * 
 * Requirements: 5.1, 5.3, 7.2
 */

export interface CrossReference {
  target: string;                  // Referenced document path (or doc id, for bare-id refs)
  context: string;                 // Context description from link text
  section: string;                 // Source section containing reference
  lineNumber: number;              // Line number in source file
  /**
   * INTERNAL-ONLY candidate tag (Spec 119-B OB-1). Present ONLY on bare-id
   * candidates awaiting idIndex validation; `.md` path refs never carry it
   * (their extracted shape is unchanged). The tag never escapes the indexer:
   * validation strips it before refs reach any public surface.
   */
  kind?: 'id-candidate';
}

/**
 * Bare-id candidate grammar (Spec 119-B OB-1 / design Component 6): a link
 * target is an id candidate IF it matches this AND contains none of `/ . : #`
 * (the character class already excludes them; the explicit guard in the
 * extractor documents the contract). Validation against idIndex happens in the
 * indexer's post-index pass — the parser stays a dumb extractor.
 */
export const BARE_ID_GRAMMAR = /^[a-z0-9][a-z0-9-]*$/;

/**
 * Extract cross-references from markdown content
 * 
 * Uses mechanical parsing (regex) to extract markdown links without interpreting content.
 * Only includes links to .md files (documentation references).
 * Does NOT follow links or load referenced documents.
 * 
 * @param content - Markdown content to parse
 * @param filePath - Path to the source file (for context)
 * @returns Array of cross-references found in the content
 */
export function extractCrossReferences(content: string, _filePath: string): CrossReference[] {
  const lines = content.split('\n');
  const references: CrossReference[] = [];
  let currentSection = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Track current section (H2 headings only)
    const headingMatch = /^##\s+(.+)$/.exec(line);
    if (headingMatch) {
      currentSection = headingMatch[1].trim();
    }
    
    // Extract markdown links [text](path)
    // Use a while loop to find all matches in the line
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    while ((match = linkRegex.exec(line)) !== null) {
      const context = match[1];
      const target = match[2];
      
      // Only include links to other documentation files
      // This filters out external URLs, pure anchors, etc.
      // Includes links with section anchors (e.g., ./doc.md#section)
      if (target.includes('.md')) {
        references.push({
          target,
          context,
          section: currentSection,
          lineNumber: i + 1
        });
      } else if (BARE_ID_GRAMMAR.test(target) && !/[/.:#]/.test(target)) {
        // Bare-id candidate (Spec 119-B OB-1): tagged, NOT validated here —
        // anchors (#…), URLs (contain :/), and paths (contain / or .) never
        // reach this branch. The indexer's post-index pass validates against
        // idIndex and drops misses.
        references.push({
          target,
          context,
          section: currentSection,
          lineNumber: i + 1,
          kind: 'id-candidate'
        });
      }
    }
  }
  
  return references;
}
