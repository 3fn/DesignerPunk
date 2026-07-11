/**
 * Fixture-lane helper tests (C10.3 wiring) — Spec 122 Task 8.1.
 *
 * The fixture's INTEGRATION test is the standing fixture itself: `canonical/_fixture-output/**`
 * is committed, diff-guarded, and regenerated through the real corpus session on every full
 * guard run (Req 21 AC4) — a unit test spawning the real MCP would duplicate that at unit-lane
 * cost. These tests cover the pure helpers the lane is built from.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { buildDocIdToPath, buildEmbeds, extractSectionContent, writeOutputs } from '../generate';
import type { CorpusClient, CorpusToolResult } from '../resolve';
import type { CanonicalAgentDoc } from '../schema';

describe('extractSectionContent', () => {
  it('extracts section.content markdown from the docs-MCP JSON envelope', () => {
    const envelope = JSON.stringify({
      section: { path: 'token-governance', heading: 'H', content: '## H\n\nBody.' },
      metrics: { tokenCount: 3 },
    });
    expect(extractSectionContent(envelope)).toBe('## H\n\nBody.');
  });

  it('falls back to raw text for non-envelope responses (fakes; plain-markdown MCPs)', () => {
    expect(extractSectionContent('plain section text')).toBe('plain section text');
    expect(extractSectionContent('{"section":{}}')).toBe('{"section":{}}');
  });
});

describe('buildDocIdToPath', () => {
  it('maps lowercased basenames across both resolve-by-id roots and throws on collision', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-idmap-'));
    fs.mkdirSync(path.join(tmp, '.kiro', 'steering'), { recursive: true });
    fs.mkdirSync(path.join(tmp, 'governance'), { recursive: true });
    fs.writeFileSync(path.join(tmp, '.kiro', 'steering', 'Task-Completion-Protocol.md'), 'x');
    fs.writeFileSync(path.join(tmp, 'governance', 'Token-Governance.md'), 'x');
    try {
      const map = buildDocIdToPath(tmp);
      expect(map['task-completion-protocol']).toBe('.kiro/steering/Task-Completion-Protocol.md');
      expect(map['token-governance']).toBe('governance/Token-Governance.md');

      fs.writeFileSync(path.join(tmp, 'governance', 'task-completion-protocol.md'), 'x');
      expect(() => buildDocIdToPath(tmp)).toThrow(/id collision "task-completion-protocol"/);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});

describe('buildEmbeds', () => {
  const ok = (content: string): CorpusToolResult => ({
    isError: false,
    text: JSON.stringify({ section: { content } }),
  });
  const err: CorpusToolResult = { isError: true, text: 'SectionNotFound' };

  function fakeCorpus(sections: Record<string, string>): CorpusClient {
    return {
      async getDocumentSummary() {
        return { isError: false, text: '{}' };
      },
      async getSection(id: string, heading: string) {
        const key = `${id}#${heading}`;
        return key in sections ? ok(sections[key]) : err;
      },
      async listToolNames() {
        return [];
      },
      async close() {},
    };
  }

  function docWithLaw(asserts: Array<{ claim: string; section: string }>): CanonicalAgentDoc {
    return {
      frontmatter: {
        agent: '_fixture',
        agentType: 'consumer',
        description: 'x',
        ambient: {
          governanceAsLaw: [
            {
              id: 'token-governance',
              owner: 'ada',
              assert: asserts.map((a) => ({ ...a, mustContain: ['x'] })),
            },
          ],
        },
      },
      body: '',
    };
  }

  it('keys the concatenated asserted-section markdown by entry id, deduping repeated sections', async () => {
    const embeds = await buildEmbeds(
      docWithLaw([
        { claim: 'c1', section: 'A' },
        { claim: 'c2', section: 'A' }, // same section, second claim — embed once
        { claim: 'c3', section: 'B' },
      ]),
      fakeCorpus({ 'token-governance#A': '## A\n\nalpha', 'token-governance#B': '## B\n\nbeta' })
    );
    expect(embeds['token-governance']).toBe('## A\n\nalpha\n\n## B\n\nbeta');
  });

  it('throws loud on an unresolvable section (never a silently-partial embed)', async () => {
    await expect(
      buildEmbeds(docWithLaw([{ claim: 'c1', section: 'Gone' }]), fakeCorpus({}))
    ).rejects.toThrow(/section "Gone" of "token-governance" did not resolve/);
  });

  it('returns {} for a doc with no governanceAsLaw entries', async () => {
    const doc: CanonicalAgentDoc = {
      frontmatter: { agent: 'x', agentType: 'consumer', description: 'x' },
      body: '',
    };
    expect(await buildEmbeds(doc, fakeCorpus({}))).toEqual({});
  });
});

describe('writeOutputs — root guard (U5 foot-gun fix)', () => {
  const OUTPUTS = [{ path: 'a/b.txt', content: 'x' }];

  it('throws naming the function on an empty-string root (no silent relative scatter)', () => {
    expect(() => writeOutputs('', OUTPUTS)).toThrow(/writeOutputs: "root" must be a non-empty string/);
  });

  it('throws on a whitespace-only root', () => {
    expect(() => writeOutputs('   ', OUTPUTS)).toThrow(/non-empty string/);
  });

  it('throws on an undefined root (the stray `undefined/` dir cause)', () => {
    expect(() => writeOutputs(undefined as unknown as string, OUTPUTS)).toThrow(/non-empty string/);
  });

  it('still writes under a valid root', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'wo-root-'));
    try {
      const written = writeOutputs(root, OUTPUTS);
      expect(written).toEqual(['a/b.txt']);
      expect(fs.readFileSync(path.join(root, 'a/b.txt'), 'utf8')).toBe('x');
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
