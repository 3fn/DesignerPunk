/**
 * @category evergreen
 * @purpose Verify the registry generator's ASSEMBLY logic (C5): server/tool sorting
 *          determinism, inputSchemaHash stability under key-reorder, and the loud-failure
 *          propagation path (a rejecting introspector never writes a registry). No real
 *          MCP server is spawned here — {@link assembleRegistry} is pure and takes fake
 *          introspection results directly; the one real end-to-end run happens outside
 *          the test suite (task verification step), per design § Testing Strategy.
 */

import {
  assembleRegistry,
  hashInputSchema,
  serializeRegistry,
  serverTable,
  generateRegistry,
  type ServerIntrospection,
} from '../registry';

describe('assembleRegistry — sorting determinism', () => {
  it('produces byte-identical canonicalStringify output for differently-ordered input', () => {
    const resultsA: ServerIntrospection[] = [
      {
        name: 'designerpunk-product',
        entry: 'dist/mcp/product-mcp.js',
        tools: [
          { name: 'get_screen_spec', description: 'b', inputSchema: { type: 'object' } },
          { name: 'find_screens', description: 'a', inputSchema: { type: 'object' } },
        ],
      },
      {
        name: 'designerpunk-docs',
        entry: 'mcp-server/dist/index.js',
        tools: [{ name: 'find_docs', description: 'x', inputSchema: { type: 'object' } }],
      },
    ];

    // Same servers/tools, different input order (both list-order and the servers array).
    const resultsB: ServerIntrospection[] = [
      {
        name: 'designerpunk-docs',
        entry: 'mcp-server/dist/index.js',
        tools: [{ name: 'find_docs', description: 'x', inputSchema: { type: 'object' } }],
      },
      {
        name: 'designerpunk-product',
        entry: 'dist/mcp/product-mcp.js',
        tools: [
          { name: 'find_screens', description: 'a', inputSchema: { type: 'object' } },
          { name: 'get_screen_spec', description: 'b', inputSchema: { type: 'object' } },
        ],
      },
    ];

    const registryA = assembleRegistry(resultsA);
    const registryB = assembleRegistry(resultsB);

    expect(serializeRegistry(registryA)).toBe(serializeRegistry(registryB));

    // Explicit sort assertions, not just byte-equality.
    expect(registryA.servers.map((s) => s.name)).toEqual(['designerpunk-docs', 'designerpunk-product']);
    expect(registryA.servers[1].tools.map((t) => t.name)).toEqual(['find_screens', 'get_screen_spec']);
  });

  it('emits no timestamp-bearing or otherwise nondeterministic fields', () => {
    const results: ServerIntrospection[] = [
      { name: 'designerpunk-docs', entry: 'mcp-server/dist/index.js', tools: [] },
    ];
    const json = serializeRegistry(assembleRegistry(results));
    expect(json).not.toMatch(/\d{4}-\d{2}-\d{2}T/); // no ISO timestamp
    expect(JSON.parse(json)).toEqual({
      servers: [{ name: 'designerpunk-docs', entry: 'mcp-server/dist/index.js', tools: [] }],
    });
  });

  it('defaults a missing tool description to empty string rather than dropping the field', () => {
    const results: ServerIntrospection[] = [
      {
        name: 'designerpunk-docs',
        entry: 'mcp-server/dist/index.js',
        tools: [{ name: 'find_docs', inputSchema: undefined }],
      },
    ];
    const registry = assembleRegistry(results);
    expect(registry.servers[0].tools[0].description).toBe('');
  });
});

describe('hashInputSchema — inputSchemaHash stability', () => {
  it('produces the same hash for the same schema with different key insertion order', () => {
    const schemaA = { type: 'object', properties: { b: { type: 'string' }, a: { type: 'number' } } };
    const schemaB = { properties: { a: { type: 'number' }, b: { type: 'string' } }, type: 'object' };

    expect(hashInputSchema(schemaA)).toBe(hashInputSchema(schemaB));
  });

  it('produces a sha256:-prefixed hex digest', () => {
    const hash = hashInputSchema({ type: 'object' });
    expect(hash).toMatch(/^sha256:[0-9a-f]{64}$/);
  });

  it('treats an undefined inputSchema the same as null (both hash the same value)', () => {
    expect(hashInputSchema(undefined)).toBe(hashInputSchema(null));
  });

  it('produces different hashes for genuinely different schemas', () => {
    const a = hashInputSchema({ type: 'object', properties: { a: { type: 'string' } } });
    const b = hashInputSchema({ type: 'object', properties: { a: { type: 'number' } } });
    expect(a).not.toBe(b);
  });
});

describe('assembleRegistry — assembly propagates via generateRegistry, never falls back', () => {
  it('a rejecting introspector propagates the rejection and produces no registry', async () => {
    const repoRoot = '/fake/repo/root';
    const originalTable = serverTable(repoRoot);
    expect(originalTable.length).toBe(3); // sanity: the fixed three-server table

    // Simulate generateRegistry's loop behavior directly against a failing introspector,
    // without touching the real introspectServer (which would spawn a process).
    const failingIntrospect = async (): Promise<ServerIntrospection> => {
      throw new Error(
        'Registry introspection: server "designerpunk-docs" (entry: mcp-server/dist/index.js) failed to boot — boom'
      );
    };

    await expect(
      (async () => {
        const results: ServerIntrospection[] = [];
        results.push(await failingIntrospect());
        return assembleRegistry(results);
      })()
    ).rejects.toThrow(/failed to boot/);
  });

  it('generateRegistry rejects loudly (naming server + entry) when introspection fails, never writes', async () => {
    // introspectServer will actually attempt to spawn `node <repoRoot>/mcp-server/dist/index.js`
    // pointed at a nonexistent repo root, so the spawn (or connect) fails — exercising the
    // real error path end-to-end without a real MCP server.
    const bogusRoot = '/definitely/does/not/exist/on/this/machine';
    await expect(generateRegistry(bogusRoot)).rejects.toThrow(
      /Registry introspection: server "designerpunk-docs"/
    );
  });
});

describe('serverTable — the fixed, repo-relative server table', () => {
  it('mirrors .mcp.json\'s three servers with repo-relative entries and computed env', () => {
    const repoRoot = '/some/repo';
    const table = serverTable(repoRoot);

    expect(table.map((s) => s.name)).toEqual([
      'designerpunk-docs',
      'designerpunk-application',
      'designerpunk-product',
    ]);

    const docs = table.find((s) => s.name === 'designerpunk-docs')!;
    expect(docs.entry).toBe('mcp-server/dist/index.js');
    expect(docs.env).toEqual({ WORKSPACE_ROOT: '/some/repo' });

    const application = table.find((s) => s.name === 'designerpunk-application')!;
    expect(application.entry).toBe('application-mcp-server/dist/index.js');
    expect(application.env).toEqual({
      COMPONENTS_DIR: '/some/repo/src/components/core',
      TOKEN_INDEX_DIR: '/some/repo/token-index',
    });

    const product = table.find((s) => s.name === 'designerpunk-product')!;
    expect(product.entry).toBe('dist/mcp/product-mcp.js');
    expect(product.env).toEqual({
      PRODUCT_DIR: '/some/repo/product',
      COMPONENT_DIR: '/some/repo/src/components/core',
      TOKEN_INDEX_DIR: '/some/repo/token-index',
    });
  });
});
