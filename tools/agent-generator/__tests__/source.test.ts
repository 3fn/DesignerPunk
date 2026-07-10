/**
 * @category evergreen
 * @purpose Verify the canonical agent source loader: frontmatter/body split, verbatim body
 *          preservation, malformed-source rejection, and positional capture of the inline
 *          `# asserts:` companion that js-yaml would otherwise silently drop (A-D2).
 */

import { parseCanonicalAgentSource, CanonicalSourceParseError } from '../source';

const BODY = ['## Identity', '', 'Some pass-through prose with a --- dash inside it.', ''].join('\n');

function withFrontmatter(yaml: string, body: string = BODY): string {
  return `---\n${yaml}\n---\n${body}`;
}

describe('parseCanonicalAgentSource — frontmatter / body split', () => {
  it('parses frontmatter into structured fields and keeps the body verbatim', () => {
    const doc = parseCanonicalAgentSource(
      withFrontmatter('agent: data\nagentType: consumer\ndescription: "Android engineer"')
    );
    expect(doc.frontmatter.agent).toBe('data');
    expect(doc.frontmatter.agentType).toBe('consumer');
    expect(doc.body).toBe(BODY);
  });

  it('preserves body content that itself contains a `---` line', () => {
    const body = ['before', '---', 'after'].join('\n');
    const doc = parseCanonicalAgentSource(withFrontmatter('agent: ada\nagentType: owner\ndescription: x', body));
    expect(doc.body).toBe(body);
  });

  it('throws when the leading frontmatter fence is absent', () => {
    expect(() => parseCanonicalAgentSource('no frontmatter here', 'canonical/agents/x.md')).toThrow(
      CanonicalSourceParseError
    );
  });

  it('throws when frontmatter is not a mapping', () => {
    expect(() => parseCanonicalAgentSource('---\n- just\n- a\n- list\n---\nbody')).toThrow(
      CanonicalSourceParseError
    );
  });
});

describe('parseCanonicalAgentSource — # asserts: companion capture (A-D2)', () => {
  it('attaches an inline `# asserts:` comment to a pattern-bearing claim', () => {
    const yaml = [
      'agent: data',
      'agentType: consumer',
      'description: x',
      'ambient:',
      '  governanceAsLaw:',
      '    - id: platform-implementation-guidelines',
      '      owner: lina',
      '      assert:',
      '        - claim: tokens-are-mandatory',
      '          section: "Platform-Specific Implementation Rules"',
      '          pattern: "MUST use .*token"',
      '          # asserts: platform rules mandate token usage',
    ].join('\n');
    const doc = parseCanonicalAgentSource(withFrontmatter(yaml));
    const claim = doc.frontmatter.ambient!.governanceAsLaw![0].assert[0];
    expect(claim.pattern).toBe('MUST use .*token');
    expect(claim.assertsComment).toBe('platform rules mandate token usage');
  });

  it('pairs multiple companions positionally in document order', () => {
    const yaml = [
      'agent: data',
      'agentType: consumer',
      'description: x',
      'ambient:',
      '  governanceAsLaw:',
      '    - id: doc-one',
      '      owner: ada',
      '      assert:',
      '        - claim: first',
      '          section: "S1"',
      '          pattern: "aaa"',
      '          # asserts: first companion',
      '        - claim: second',
      '          section: "S2"',
      '          pattern: "bbb"',
      '          # asserts: second companion',
    ].join('\n');
    const doc = parseCanonicalAgentSource(withFrontmatter(yaml));
    const asserts = doc.frontmatter.ambient!.governanceAsLaw![0].assert;
    expect(asserts[0].assertsComment).toBe('first companion');
    expect(asserts[1].assertsComment).toBe('second companion');
  });

  it('leaves assertsComment undefined for a mustContain claim (no companion needed)', () => {
    const yaml = [
      'agent: ada',
      'agentType: owner',
      'description: x',
      'ambient:',
      '  governanceAsLaw:',
      '    - id: token-quick-reference',
      '      owner: ada',
      '      assert:',
      '        - claim: semantic-first',
      '          section: "Selection Priority"',
      '          mustContain: ["semantic", "explicit approval"]',
    ].join('\n');
    const doc = parseCanonicalAgentSource(withFrontmatter(yaml));
    const claim = doc.frontmatter.ambient!.governanceAsLaw![0].assert[0];
    expect(claim.assertsComment).toBeUndefined();
    expect(claim.mustContain).toEqual(['semantic', 'explicit approval']);
  });
});
