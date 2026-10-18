/**
 * Logs dir — the docs MCP never writes logs under its working directory.
 *
 * Defect: `.kiro/issues/2026-10-02-docs-mcp-logs-dir-cwd-relative.md` (consumer evidence: 15.0.0
 * smoke O-5; release-4 U5 rows R1-3 / R2-7 / K-4). The server passed the cwd-relative
 * `mcp-server/logs` to the indexer, and the indexer and error handler defaulted to `logs`, so a
 * docs MCP launched from a consumer's project root left `mcp-server/logs/` (and, on any
 * SectionNotFound, `logs/`) in their repo.
 *
 * Before the fix: the "consumer cwd stays clean" cases fail (the defaults create `logs/` in cwd)
 * and the server-source case fails (`'mcp-server/logs'`).
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { DocumentIndexer } from '../../indexer/DocumentIndexer';
import { ErrorHandler } from '../error-handler';

const ENV = 'DESIGNERPUNK_DOCS_MCP_LOGS';

describe('a docs MCP launched from a consumer project root leaves nothing there', () => {
  let consumer: string;
  let docs: string;
  let cwd: string;
  let saved: string | undefined;

  beforeEach(() => {
    cwd = process.cwd();
    saved = process.env[ENV];
    consumer = fs.mkdtempSync(path.join(os.tmpdir(), 'logs-cwd-consumer-'));
    docs = fs.mkdtempSync(path.join(os.tmpdir(), 'logs-cwd-docs-'));
    fs.writeFileSync(
      path.join(docs, 'Doc.md'),
      ['---', 'id: doc', 'inclusion: manual', '---', '', '# Doc', '', '## Overview', 'Body.', ''].join('\n'),
    );
    process.chdir(consumer);
  });

  afterEach(() => {
    process.chdir(cwd);
    if (saved === undefined) delete process.env[ENV];
    else process.env[ENV] = saved;
    fs.rmSync(consumer, { recursive: true, force: true });
    fs.rmSync(docs, { recursive: true, force: true });
  });

  it('default indexer + error handler: index, rebuild, SectionNotFound log — consumer cwd stays empty', async () => {
    delete process.env[ENV];
    const ix = new DocumentIndexer();
    await ix.indexDirectory(docs);
    await ix.rebuildIndex();
    new ErrorHandler().handleSectionNotFound('doc', 'Missing', ['Overview']);
    expect(fs.readdirSync(consumer)).toEqual([]);
  });

  it(`${ENV} redirects both logs to an absolute directory`, async () => {
    const target = path.join(consumer, '..', path.basename(consumer) + '-logs');
    process.env[ENV] = target;
    try {
      const ix = new DocumentIndexer();
      await ix.indexDirectory(docs);
      new ErrorHandler().handleSectionNotFound('doc', 'Missing', []);
      expect(fs.existsSync(path.join(target, 'index-state.log'))).toBe(true);
      expect(fs.existsSync(path.join(target, 'errors.log'))).toBe(true);
      expect(fs.readdirSync(consumer)).toEqual([]);
    } finally {
      fs.rmSync(target, { recursive: true, force: true });
    }
  });

  it('a log directory that cannot be created never fails indexing', async () => {
    const blocker = path.join(consumer, '..', path.basename(consumer) + '-blocker');
    fs.writeFileSync(blocker, 'a file, not a directory');
    process.env[ENV] = path.join(blocker, 'logs');
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      const ix = new DocumentIndexer();
      await expect(ix.indexDirectory(docs)).resolves.not.toThrow();
      expect(ix.getDocumentSummary('doc').outline[0].heading).toBe('Overview');
    } finally {
      spy.mockRestore();
      fs.rmSync(blocker, { force: true });
    }
  });
});

describe('the server entry point passes no cwd-relative logs path', () => {
  it("src/index.ts no longer names 'mcp-server/logs'", () => {
    const src = fs.readFileSync(path.resolve(__dirname, '../../index.ts'), 'utf8');
    expect(src).not.toMatch(/['"]mcp-server\/logs['"]/);
  });
});
