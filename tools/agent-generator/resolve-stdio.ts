/**
 * Stdio corpus client — the real, stdio-spawned docs MCP session (DD10).
 *
 * Split out of `resolve.ts` (agent-generator residuals, issue
 * `.kiro/issues/2026-10-01-agent-generator-out-of-grant-residuals.md` item 2a) so the
 * resolver half (`./resolve`) carries no MCP SDK import. Imported only by the steward
 * pipeline (`generate.ts`, `canonical-vs-truth.ts`, `sweeps/sweep-1-refs.ts`) — never from
 * `consumer-entry.ts`'s closure.
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import * as path from 'path';
import { guardChild, noteChildPid, releaseChild } from './child-process-guard';
import type { CorpusClient, CorpusToolResult } from './resolve';

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

    // guardChild: reap this server if the parent dies without close() running
    // (harness timeout / crash / Ctrl-C) — the U3 orphan-leak fix.
    this.transport = guardChild(
      new StdioClientTransport({
        command: process.execPath,
        args: [this.options.entry],
        env,
        stderr: 'inherit',
      })
    );
    this.client = new Client({ name: 'agent-generator-resolver', version: '0.0.0' }, { capabilities: {} });
    await this.client.connect(this.transport);
    noteChildPid(this.transport); // snapshot the pid — survives the SDK close-window nulling
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
    if (this.transport) {
      releaseChild(this.transport); // gracefully closed — no reaping needed
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
