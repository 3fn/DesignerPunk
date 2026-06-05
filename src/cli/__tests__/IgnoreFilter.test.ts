/**
 * @category evergreen
 * @purpose Verify IgnoreFilter parses .designerpunkignore with .gitignore semantics (Spec 111, R8)
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { loadIgnoreFilter } from '../sync/IgnoreFilter';

describe('IgnoreFilter', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-ignore-')));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function writeIgnoreFile(content: string): void {
    fs.writeFileSync(path.join(tmpDir, '.designerpunkignore'), content, 'utf-8');
  }

  test('returns filter that ignores nothing when file is missing', () => {
    const filter = loadIgnoreFilter(tmpDir);
    expect(filter.isIgnored('anything.ts')).toBe(false);
  });

  test('matches exact file paths', () => {
    writeIgnoreFile('.kiro/steering/custom-agent.md');
    const filter = loadIgnoreFilter(tmpDir);

    expect(filter.isIgnored('.kiro/steering/custom-agent.md')).toBe(true);
    expect(filter.isIgnored('.kiro/steering/other.md')).toBe(false);
  });

  test('matches glob patterns', () => {
    writeIgnoreFile('*.md');
    const filter = loadIgnoreFilter(tmpDir);

    expect(filter.isIgnored('.kiro/steering/Goals.md')).toBe(true);
    expect(filter.isIgnored('src/tokens/Color.ts')).toBe(false);
  });

  test('matches ** recursive patterns', () => {
    writeIgnoreFile('src/tokens/**/*.ts');
    const filter = loadIgnoreFilter(tmpDir);

    expect(filter.isIgnored('src/tokens/primitives/spacing.ts')).toBe(true);
    expect(filter.isIgnored('src/tokens/Color.ts')).toBe(true);
    expect(filter.isIgnored('src/types/index.ts')).toBe(false);
  });

  test('ignores comments (lines starting with #)', () => {
    writeIgnoreFile('# This is a comment\n.kiro/steering/Goals.md');
    const filter = loadIgnoreFilter(tmpDir);

    expect(filter.isIgnored('# This is a comment')).toBe(false);
    expect(filter.isIgnored('.kiro/steering/Goals.md')).toBe(true);
  });

  test('ignores empty lines', () => {
    writeIgnoreFile('\n\n.kiro/steering/Goals.md\n\n');
    const filter = loadIgnoreFilter(tmpDir);

    expect(filter.isIgnored('.kiro/steering/Goals.md')).toBe(true);
  });

  test('anchored patterns (starting with /) match from root only', () => {
    writeIgnoreFile('/src/tokens/Color.ts');
    const filter = loadIgnoreFilter(tmpDir);

    expect(filter.isIgnored('src/tokens/Color.ts')).toBe(true);
    expect(filter.isIgnored('nested/src/tokens/Color.ts')).toBe(false);
  });

  test('handles empty .designerpunkignore file', () => {
    writeIgnoreFile('');
    const filter = loadIgnoreFilter(tmpDir);

    expect(filter.isIgnored('anything.ts')).toBe(false);
  });

  test('matches dot files', () => {
    writeIgnoreFile('.kiro/agents/**');
    const filter = loadIgnoreFilter(tmpDir);

    expect(filter.isIgnored('.kiro/agents/leonardo-prompt.md')).toBe(true);
  });
});
