/**
 * Documentation Map Models
 * 
 * Represents the complete four-layer documentation structure with metadata
 * for all documents in the system.
 */

export interface DocumentMetadata {
  /** File path relative to project root */
  path: string;
  
  /** Purpose from metadata */
  purpose: string;
  
  /** Layer number (0-3) */
  layer: number;
  
  /** Task types from metadata */
  relevantTasks: string[];
  
  /** Last reviewed date */
  lastReviewed: string;

  /** Owning domain/agent from metadata (the find_docs `owner` source — Spec 121 Req 1.1) */
  organization: string;

  /** H2 heading names */
  sections: string[];

  /** Estimated token count for full document */
  tokenCount: number;

  /**
   * Frontmatter `name:` / H1 title (high-signal field for find_docs concept
   * matching — Spec 121 Req 6 docs rubric). Optional/additive: undefined when a
   * doc has neither frontmatter `name` nor an H1.
   */
  title?: string;

  /**
   * Frontmatter `description:` — the keyword surface for find_docs concept
   * matching (high-signal). There is NO `keywords` frontmatter field in the
   * corpus; `description` is it (discovery-confidence-rubric.md, Docs rubric).
   * Optional/additive: undefined when a doc has no frontmatter description.
   */
  description?: string;

  /**
   * Reactive synonym/alias surface (Spec 121 Req 1.9, extended to docs for
   * find_docs). High-signal — a curated author declaration that the doc is about
   * these concepts even when the literal term is absent from title/description/body
   * (e.g. a CSS doc that says "logical properties" but never "RTL"). The bridge for
   * semantic-synonym queries that tokenized metadata matching can't otherwise reach.
   * Optional/additive.
   */
  aliases?: string[];

  /**
   * Layer-2 viability gate (Spec 121 Req 6): can this doc actually be USED, or is
   * it a placeholder / deprecated stub? Distinct from match confidence — a doc
   * can be a textbook `strong` match yet be a non-viable placeholder
   * (e.g. Component-Family-Modal). Optional/additive; defaults to all-false when
   * no placeholder/deprecated marker is present.
   */
  viability?: { placeholder: boolean; deprecated: boolean };
}

export interface DocumentationMap {
  layers: {
    [layerNumber: string]: {
      /** Layer name: "Meta-Guide", "Foundation", "Frameworks and Patterns", "Specific Implementations" */
      name: string;
      
      /** Documents in this layer */
      documents: DocumentMetadata[];
    };
  };
}
