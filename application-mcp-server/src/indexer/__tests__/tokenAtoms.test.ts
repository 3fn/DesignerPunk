/**
 * Tokenizer atoms — brand-cased platform names stay one token (follow-ups record row 11).
 * @see ../tokenAtoms.ts (twin of mcp-server/src/query/token-atoms.ts)
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  ATOM_TERMS,
  COMPONENT_TOKEN_ATOM_LIST_VERSION,
  TOKEN_ATOMS,
  protectAtoms,
} from '../tokenAtoms';
import { ComponentIndexer, tokenizeForMatch, tokenizeString } from '../ComponentIndexer';
import { foldPlural } from '../termNormalization';
import { ComponentQueryEngine } from '../../query/QueryEngine';

const DOCS_ATOMS_PATH = path.resolve(__dirname, '../../../../mcp-server/src/query/token-atoms.ts');
const COMPONENTS_DIR = path.resolve(__dirname, '../../../../src/components/core');

describe('components token-atom list', () => {
  it('is versioned', () => {
    expect(COMPONENT_TOKEN_ATOM_LIST_VERSION).toBe(1);
  });

  it('DRIFT GUARD: matches the docs-side list it twins (mcp-server token-atoms.ts)', () => {
    const src = fs.readFileSync(DOCS_ATOMS_PATH, 'utf8');
    const block = src.match(/TOKEN_ATOMS[^=]*=\s*Object\.freeze\(\[([\s\S]*?)\]\)/);
    expect(block).not.toBeNull();
    const docsAtoms = [...block![1].matchAll(/'([^']+)'/g)].map(m => m[1]);
    expect([...TOKEN_ATOMS].sort()).toEqual(docsAtoms.sort());
  });

  it('protectAtoms lowercases atoms in place and leaves other words alone', () => {
    expect(protectAtoms('safe area (iOS), iPadOS pointer, contentDescription')).toBe(
      'safe area (ios), ipados pointer, contentDescription',
    );
  });
});

describe('tokenizeString with atoms', () => {
  it.each(TOKEN_ATOMS.map(a => [a]))('%s stays one token', (atom) => {
    expect(tokenizeString(atom)).toEqual([atom.toLowerCase()]);
    expect(tokenizeForMatch(atom)).toEqual([atom.toLowerCase()]);
  });

  it('a non-atom camelCase word still splits', () => {
    expect(tokenizeString('contentDescription')).toEqual(['content', 'description']);
    expect(tokenizeString('whenToUse')).toEqual(['when', 'to', 'use']);
  });

  it('iPadOS wins over iPad (longest first) and atoms inside punctuation survive', () => {
    expect(tokenizeForMatch('(iPadOS, iPad, iPhone)')).toEqual(['ipados', 'ipad', 'iphone']);
  });

  it('atoms are exempt from plural folding (no ipado / maco / tvo / watcho)', () => {
    for (const t of ATOM_TERMS) expect(foldPlural(t)).toBe(t);
  });

  it('query and metadata tokenize identically regardless of case', () => {
    expect(tokenizeForMatch('ios')).toEqual(tokenizeForMatch('iOS'));
    expect(tokenizeForMatch('IOS')).toEqual(['ios']);
  });
});

describe('find_components: "ios" matches real metadata that says "iOS"', () => {
  let engine: ComponentQueryEngine;
  let indexer: ComponentIndexer;

  beforeAll(async () => {
    indexer = new ComponentIndexer();
    await indexer.indexComponents(COMPONENTS_DIR);
    engine = new ComponentQueryEngine(indexer);
  });

  it('Nav-TabBar-Base (whenToUse: "… (iOS, Android, mobile web)") and Container-Base (description: "safe area handling (iOS)") match "ios"', () => {
    const names = (engine.findComponents({ keyword: 'ios' }).data as Array<{ name: string }>).map(r => r.name);
    expect(names).toEqual(expect.arrayContaining(['Nav-TabBar-Base', 'Container-Base']));
  });

  it('no stray `os` or `i` token remains in any component keyword entry', () => {
    for (const [, entry] of indexer.getKeywordIndex()) {
      expect(entry.highSignal.has('os')).toBe(false);
      expect(entry.lowSignal.has('os')).toBe(false);
      expect(entry.highSignal.has('i')).toBe(false);
      expect(entry.lowSignal.has('i')).toBe(false);
    }
  });
});
