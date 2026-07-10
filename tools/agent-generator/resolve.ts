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
 *     Unit tests inject a fake; production uses {@link StdioCorpusClient}.
 *   - {@link CorpusResolver} — the id-resolution + interim-section-form logic over a
 *     CorpusClient. No I/O of its own.
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

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import * as path from 'path';

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

// ============================================================================
// StdioCorpusClient — the real, stdio-spawned docs MCP session (DD10)
// ============================================================================

export interface StdioCorpusClientOptions {
  /** Path to the compiled docs-MCP entry (`node <entry>`). */
  entry: string;
  /** WORKSPACE_ROOT the MCP reads its steering corpus from. */
  workspaceRoot: string;
}

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_DOCS_MCP_ENTRY = path.join(REPO_ROOT, 'mcp-server', 'dist', 'index.js');

/** Concatenate an MCP tool result's text content blocks. */
function textOf(result: { content?: Array<{ type?: string; text?: string }> }): string {
  return (result.content ?? [])
    .filter((block) => block.type === 'text' && typeof block.text === 'string')
    .map((block) => block.text as string)
    .join('\n');
}

/**
 * The production {@link CorpusClient}: spawns the compiled docs MCP over stdio, reusing one
 * session across the whole generator run (DD10). Declaration-keyed and index-agnostic — it
 * asks the running server, never a cached artifact.
 */
export class StdioCorpusClient implements CorpusClient {
  private client?: Client;
  private transport?: StdioClientTransport;
  private connecting?: Promise<void>;

  constructor(private readonly options: StdioCorpusClientOptions) {}

  private async ensureConnected(): Promise<Client> {
    if (!this.client) {
      if (!this.connecting) {
        this.connecting = this.connect();
      }
      await this.connecting;
    }
    if (!this.client) {
      throw new Error('docs MCP client failed to connect');
    }
    return this.client;
  }

  private async connect(): Promise<void> {
    // Pass a string-only env including WORKSPACE_ROOT; keep PATH etc. so `node` resolves.
    const env: Record<string, string> = { WORKSPACE_ROOT: this.options.workspaceRoot };
    for (const [key, value] of Object.entries(process.env)) {
      if (typeof value === 'string') env[key] = value;
    }
    env.WORKSPACE_ROOT = this.options.workspaceRoot;

    this.transport = new StdioClientTransport({
      command: process.execPath,
      args: [this.options.entry],
      env,
      stderr: 'inherit',
    });
    this.client = new Client({ name: 'agent-generator-resolver', version: '0.0.0' }, { capabilities: {} });
    await this.client.connect(this.transport);
  }

  private async call(name: string, args: Record<string, unknown>): Promise<CorpusToolResult> {
    const client = await this.ensureConnected();
    const result = (await client.callTool({ name, arguments: args })) as {
      content?: Array<{ type?: string; text?: string }>;
      isError?: boolean;
    };
    return { isError: result.isError === true, text: textOf(result) };
  }

  getDocumentSummary(id: string): Promise<CorpusToolResult> {
    return this.call('get_document_summary', { path: id });
  }

  getSection(id: string, heading: string): Promise<CorpusToolResult> {
    return this.call('get_section', { path: id, heading });
  }

  async listToolNames(): Promise<string[]> {
    const client = await this.ensureConnected();
    const { tools } = await client.listTools();
    return tools.map((tool) => tool.name).sort();
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = undefined;
    }
    this.transport = undefined;
    this.connecting = undefined;
  }
}

/** Convenience factory: a stdio docs-MCP client for this repo's compiled entry + root. */
export function createStdioDocsClient(
  options: Partial<StdioCorpusClientOptions> = {}
): StdioCorpusClient {
  return new StdioCorpusClient({
    entry: options.entry ?? DEFAULT_DOCS_MCP_ENTRY,
    workspaceRoot: options.workspaceRoot ?? REPO_ROOT,
  });
}
