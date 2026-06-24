/**
 * Section Models
 * 
 * Represents a specific section of a document retrieved by heading.
 */

export interface Section {
  /** File path relative to project root */
  path: string;
  
  /** Requested heading */
  heading: string;
  
  /** Section markdown content */
  content: string;
  
  /** Parent heading context (for nested sections) */
  parentHeadings: string[];

  /** Section token count */
  tokenCount: number;

  /**
   * Stable, drift-resistant section ID (Spec 121 Req 5.2 / Finding 2).
   * Positional address (`s{index}`) — survives heading-string rewording.
   * See `makeSectionId` in section-parser.ts for the stability contract.
   * Optional for back-compat with hand-constructed Section literals.
   */
  sectionId?: string;

  /**
   * Sibling headings under the same parent (Spec 121 Req 5.4 / Finding 1).
   * Adjacency cue so a preamble/stub signals that substantive siblings exist,
   * rather than returning a stub with no indication of incompleteness.
   * Optional for back-compat with hand-constructed Section literals.
   */
  siblingHeadings?: string[];
}
