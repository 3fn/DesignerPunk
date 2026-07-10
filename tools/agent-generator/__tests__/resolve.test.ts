/**
 * @category evergreen
 * @purpose Verify the corpus resolver's logic (C3.1) against an injected fake CorpusClient:
 *          bare-id resolution, the interim section form (id resolves AND heading exists),
 *          the missing-doc short-circuit, and failure descriptions that name id + heading.
 *          The real stdio client is a thin adapter, smoke-verified against the live MCP
 *          out of the functional lane.
 */

import {
  CorpusResolver,
  describeUnresolved,
  type CorpusClient,
  type CorpusToolResult,
} from '../resolve';

/** A scripted fake CorpusClient: canned per-id results + call recording for short-circuit assertions. */
class FakeCorpusClient implements CorpusClient {
  readonly calls: Array<{ tool: string; id: string; heading?: string }> = [];

  constructor(
    private readonly docs: Record<string, boolean>,
    private readonly sections: Record<string, boolean> = {}
  ) {}

  private static key(id: string, heading: string): string {
    return `${id}::${heading}`;
  }

  async getDocumentSummary(id: string): Promise<CorpusToolResult> {
    this.calls.push({ tool: 'get_document_summary', id });
    const exists = this.docs[id] === true;
    return { isError: !exists, text: exists ? `summary of ${id}` : `Document not found: ${id}` };
  }

  async getSection(id: string, heading: string): Promise<CorpusToolResult> {
    this.calls.push({ tool: 'get_section', id, heading });
    const exists = this.sections[FakeCorpusClient.key(id, heading)] === true;
    return { isError: !exists, text: exists ? `section ${heading}` : `Section not found: ${heading}` };
  }

  async listToolNames(): Promise<string[]> {
    return ['find_docs', 'get_document_summary', 'get_section'];
  }

  async close(): Promise<void> {
    /* no-op */
  }
}

describe('CorpusResolver.resolveDoc', () => {
  it('resolves a doc id that the MCP returns without isError', async () => {
    const resolver = new CorpusResolver(new FakeCorpusClient({ 'rosetta-system-architecture': true }));
    expect(await resolver.resolveDoc('rosetta-system-architecture')).toEqual({
      id: 'rosetta-system-architecture',
      resolved: true,
    });
  });

  it('does not resolve a doc id the MCP flags isError (FileNotFound)', async () => {
    const resolver = new CorpusResolver(new FakeCorpusClient({}));
    expect(await resolver.resolveDoc('no-such-doc')).toEqual({ id: 'no-such-doc', resolved: false });
  });
});

describe('CorpusResolver.resolveSection — the interim section form (Req 3 AC2)', () => {
  it('resolves when the id resolves AND the verbatim heading exists', async () => {
    const resolver = new CorpusResolver(
      new FakeCorpusClient(
        { 'rosetta-system-architecture': true },
        { 'rosetta-system-architecture::Module-Resolution Contract (Spec 118)': true }
      )
    );
    const result = await resolver.resolveSection(
      'rosetta-system-architecture',
      'Module-Resolution Contract (Spec 118)'
    );
    expect(result).toEqual({
      id: 'rosetta-system-architecture',
      heading: 'Module-Resolution Contract (Spec 118)',
      idResolved: true,
      headingExists: true,
      resolved: true,
    });
  });

  it('does not resolve when the id resolves but the heading is missing', async () => {
    const resolver = new CorpusResolver(new FakeCorpusClient({ 'some-doc': true }, {}));
    const result = await resolver.resolveSection('some-doc', 'No Such Heading');
    expect(result.idResolved).toBe(true);
    expect(result.headingExists).toBe(false);
    expect(result.resolved).toBe(false);
  });

  it('short-circuits the section check when the doc id does not resolve', async () => {
    const client = new FakeCorpusClient({}, {});
    const result = await new CorpusResolver(client).resolveSection('ghost-doc', 'Any Heading');
    expect(result).toEqual({
      id: 'ghost-doc',
      heading: 'Any Heading',
      idResolved: false,
      headingExists: false,
      resolved: false,
    });
    // get_section must NOT be called for a doc that did not resolve.
    expect(client.calls.some((c) => c.tool === 'get_section')).toBe(false);
  });
});

describe('CorpusResolver.resolveRef', () => {
  it('routes a section-bearing ref through the interim section form', async () => {
    const resolver = new CorpusResolver(new FakeCorpusClient({ d: true }, { 'd::H': true }));
    const result = await resolver.resolveRef({ id: 'd', section: 'H' });
    expect('heading' in result).toBe(true);
    expect(result.resolved).toBe(true);
  });

  it('routes a bare ref through doc resolution', async () => {
    const resolver = new CorpusResolver(new FakeCorpusClient({ d: true }));
    const result = await resolver.resolveRef({ id: 'd' });
    expect('heading' in result).toBe(false);
    expect(result.resolved).toBe(true);
  });
});

describe('describeUnresolved — names the failing leg with id + heading', () => {
  it('returns undefined for a resolved ref', () => {
    expect(describeUnresolved({ id: 'd', resolved: true })).toBeUndefined();
  });

  it('names a missing doc id', () => {
    expect(describeUnresolved({ id: 'ghost', resolved: false })).toContain('ghost');
  });

  it('names id + heading when the doc resolved but the heading did not', () => {
    const msg = describeUnresolved({
      id: 'd',
      heading: 'Missing H',
      idResolved: true,
      headingExists: false,
      resolved: false,
    });
    expect(msg).toContain('d');
    expect(msg).toContain('Missing H');
    expect(msg).toContain('heading');
  });

  it('names the doc id when a section ref failed because the doc is missing', () => {
    const msg = describeUnresolved({
      id: 'ghost',
      heading: 'H',
      idResolved: false,
      headingExists: false,
      resolved: false,
    });
    expect(msg).toContain('ghost');
    expect(msg).toContain('did not resolve');
  });
});
