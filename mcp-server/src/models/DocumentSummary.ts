/**
 * Document Summary Models
 * 
 * Represents a document summary with metadata, outline, and cross-references.
 * Summaries are designed to be ~200 tokens to enable informed decisions about
 * whether to load full content.
 */

export interface SectionOutline {
  /** H2 heading text */
  heading: string;
  
  /** Heading level (2 for H2) */
  level: number;
  
  /** H3 heading texts under this H2 */
  subsections: string[];
}

export interface CrossReferenceInfo {
  /** Referenced document path */
  target: string;
  
  /** Context description from link text */
  context: string;
  
  /** Source section containing reference */
  section: string;
}

export interface DocumentSummary {
  /** File path relative to project root */
  path: string;
  
  /** Document metadata */
  metadata: {
    purpose: string;
    layer: number;
    relevantTasks: string[];
    lastReviewed: string;
    organization: string;
    scope: string;
  };
  
  /** Document outline with H2/H3 structure */
  outline: SectionOutline[];
  
  /** Cross-references to other documents */
  crossReferences: CrossReferenceInfo[];
  
  /** Full document token count */
  tokenCount: number;

  /**
   * The doc's audience banner (P-1, release-4 rulings item 14): the preamble blockquote that opens
   * `> **Audience framing**:`, markers stripped. Present ONLY for a bannered doc — an unbannered
   * doc's summary is unchanged. Additive.
   */
  audienceBanner?: string;
}
