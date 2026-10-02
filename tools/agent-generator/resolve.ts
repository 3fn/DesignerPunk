/**
 * Corpus resolver (C3.1) — Spec 122 Task 2.1.
 *
 * design.md § "C3.1 Resolution": doc references resolve by `id` against the running docs
 * MCP; for section-grain refs, resolution is the Req 3 AC2 INTERIM FORM — the `id` resolves
 * AND the verbatim heading exists in the resolved doc. When section addressing lands
 * (`docid#sectionid`), only this module's reader changes; callers pass `{ id, section }`
 * unchanged.
 *
 * Two layers, split so the RESOLUTION LOGIC is testable without spawning a subprocess
 * (design § Testing Strategy — "resolver (id + interim section form)" is a functional-lane
 * unit test):
 *   - {@link CorpusClient} — the minimal MCP surface the resolver needs, an interface.
 *     Unit tests inject a fake; production uses `StdioCorpusClient` (`./resolve-stdio`).
 *   - {@link CorpusResolver} — the id-resolution + interim-section-form logic over a
 *     CorpusClient. No I/O of its own.
 *
 * THIS MODULE HAS NO SDK IMPORT. The real stdio client (`StdioCorpusClient`,
 * `createStdioDocsClient`) lives in `./resolve-stdio`, so the consumer closure
 * (`consumer-entry.ts` -> `pipeline.ts` -> here) no longer reaches it through this module.
 * Steward callers import the stdio half from `./resolve-stdio` directly. (The other SDK
 * importer, `registry.ts`, is likewise outside that closure: `consumer-entry.ts` reads
 * `./registry-manifest`.)
 *
 * NOT-FOUND SEMANTICS (verified against mcp-server/src/tools/get-section.ts &
 * get-document-summary.ts): the docs MCP sets `isError: true` for FileNotFound /
 * SectionNotFound. A get_section AMBIGUOUS result (multiple headings match) is returned
 * WITHOUT isError — the verbatim heading DOES exist (non-uniquely), which satisfies the
 * interim-form "heading exists" check; disambiguation is a caller concern, not a resolution
 * failure. So: `heading exists ⟺ get_section did not isError`.
 *
 * Traces to: Req 1 AC1 (resolve-by-id), Req 3 AC1/AC2 (id addressing + interim section
 * form), Req 5 AC3 (contract-section refs resolve the same way), DD10 (spawn the compiled
 * MCP over stdio).
 */

// ============================================================================
// CorpusClient — the injectable MCP surface
// ============================================================================

/** Normalized result of one docs-MCP tool call: the not-found flag + the text payload. */
export interface CorpusToolResult {
  /** True when the MCP returned `isError` (FileNotFound / SectionNotFound). */
  isError: boolean;
  /** Concatenated text content of the response (section body, summary, or error JSON). */
  text: string;
}

/**
 * The minimal running-docs-MCP surface the resolver consumes. Kept narrow so a fake is
 * trivial in unit tests and the real stdio client (below) is a thin adapter.
 */
export interface CorpusClient {
  /** `get_document_summary({ path: id })` — resolves the doc `id`. */
  getDocumentSummary(id: string): Promise<CorpusToolResult>;
  /** `get_section({ path: id, heading })` — checks the verbatim heading exists. */
  getSection(id: string, heading: string): Promise<CorpusToolResult>;
  /** `tools/list` — declared tool names (index-agnostic; the same session per DD10). */
  listToolNames(): Promise<string[]>;
  /** Shut the session down (idempotent). */
  close(): Promise<void>;
}

// ============================================================================
// Resolution results
// ============================================================================

/** Result of resolving a bare doc `id`. */
export interface DocResolution {
  id: string;
  resolved: boolean;
}

/**
 * Result of resolving a section-grain ref in the interim form. `resolved` is the conjunction
 * `idResolved && headingExists`; the two legs are reported separately so a failure names
 * WHICH leg (id missing vs heading missing) with the id + heading.
 */
export interface SectionResolution {
  id: string;
  heading: string;
  idResolved: boolean;
  headingExists: boolean;
  resolved: boolean;
}

/** A ref to resolve: a bare doc id, or a doc id + verbatim section heading (interim form). */
export interface CorpusRef {
  id: string;
  section?: string;
}

// ============================================================================
// CorpusResolver — the logic (no I/O of its own)
// ============================================================================

export class CorpusResolver {
  constructor(private readonly client: CorpusClient) {}

  /** Resolve a bare doc `id`: it resolves iff get_document_summary did not isError. */
  async resolveDoc(id: string): Promise<DocResolution> {
    const summary = await this.client.getDocumentSummary(id);
    return { id, resolved: !summary.isError };
  }

  /**
   * Resolve a section-grain ref in the interim form (Req 3 AC2): the `id` resolves AND the
   * verbatim `heading` exists in that doc. Short-circuits the section check when the doc id
   * does not resolve (a heading cannot exist in a doc that does not).
   */
  async resolveSection(id: string, heading: string): Promise<SectionResolution> {
    const idResolved = (await this.client.getDocumentSummary(id)).isError === false;
    if (!idResolved) {
      return { id, heading, idResolved: false, headingExists: false, resolved: false };
    }
    const headingExists = (await this.client.getSection(id, heading)).isError === false;
    return { id, heading, idResolved: true, headingExists, resolved: headingExists };
  }

  /** Resolve either kind of ref. A `section`-bearing ref uses the interim section form. */
  async resolveRef(ref: CorpusRef): Promise<DocResolution | SectionResolution> {
    return ref.section === undefined
      ? this.resolveDoc(ref.id)
      : this.resolveSection(ref.id, ref.section);
  }
}

/**
 * Human-readable failure description for an unresolved ref — names the id and, for a section
 * ref, the heading and which leg failed. Returns `undefined` when the ref resolved.
 */
export function describeUnresolved(resolution: DocResolution | SectionResolution): string | undefined {
  if (resolution.resolved) return undefined;
  if ('heading' in resolution) {
    if (!resolution.idResolved) {
      return `doc id "${resolution.id}" did not resolve (section ref for heading "${resolution.heading}")`;
    }
    return `doc id "${resolution.id}" resolved, but verbatim heading "${resolution.heading}" was not found in it`;
  }
  return `doc id "${resolution.id}" did not resolve`;
}
