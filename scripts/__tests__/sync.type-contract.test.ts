/**
 * @category evergreen
 * @purpose Spec 123 Task 6 — the type contract (design.md DD11; test id
 * `sync.type-contract.test.ts`). `contractHash` covers the emitted `.d.ts` surface
 * (`PrimitiveToken` / `SemanticToken` + `TokenCategory` / `SemanticCategory`):
 *   - a `PrimitiveToken` field change → the hash changes → REPORTED, with members;
 *   - a comment-only change → the hash changes → "no member changes detected".
 *
 * Lives under scripts/ because the hash is computed at BUILD time with the
 * TypeScript AST (typescript is a devDependency, never a consumer runtime dep);
 * the report half is `src/cli/sync/NameContract.ts`.
 */

import * as fs from 'fs';
import * as path from 'path';
import { buildTypeContract, PROJECT_ROOT, TYPE_CONTRACT_DTS_REL } from '../build-name-contract';
import { checkTypeContract, typeContractChangedMessage, NO_MEMBER_CHANGES } from '../../src/cli/sync/NameContract';

/** The catalog row, transcribed verbatim from design.md § "Error Handling" ("type contract changed"). */
const DESIGN_ROW = (x: string, y: string) =>
  `the token type contract changed (removed: ${x}; added: ${y}). Run 'npx tsc --noEmit' — fix each file it names; removed members are listed above.`;

const readDts = () => TYPE_CONTRACT_DTS_REL.map((rel) => ({ rel, text: fs.readFileSync(path.join(PROJECT_ROOT, rel), 'utf8') }));

describe('type contract — contractHash over the emitted .d.ts surface (DD11)', () => {
  const base = buildTypeContract(readDts());

  it('covers exactly the four declarations, with members', () => {
    expect(base.hash).toMatch(/^sha256:[0-9a-f]{64}$/);
    for (const d of ['PrimitiveToken.', 'SemanticToken.', 'TokenCategory.', 'SemanticCategory.']) {
      expect(base.members.some((m) => m.startsWith(d))).toBe(true);
    }
    expect(base.members).toContain('PrimitiveToken.baseValue: number');
    expect(base.members).toContain('TokenCategory.SPACING = "spacing"');
  });

  it('is deterministic (the same surface → the same hash)', () => {
    expect(buildTypeContract(readDts()).hash).toBe(base.hash);
  });

  it('a PrimitiveToken field change → the hash changes → reported with the removed and added members', () => {
    const mutated = readDts().map((d) =>
      d.rel.endsWith('PrimitiveToken.d.ts') ? { ...d, text: d.text.replace('baseValue: number;', 'baseValue: string;') } : d,
    );
    const changed = buildTypeContract(mutated);
    expect(changed.hash).not.toBe(base.hash);
    const msg = checkTypeContract(base, changed);
    expect(msg).toBe(DESIGN_ROW('PrimitiveToken.baseValue: number', 'PrimitiveToken.baseValue: string'));
  });

  it('a comment-only change → the hash changes → "no member changes detected"', () => {
    const mutated = readDts().map((d) =>
      d.rel.endsWith('PrimitiveToken.d.ts')
        ? { ...d, text: d.text.replace('/** Unitless base value for this specific token */', '/** Unitless base value (reworded) */') }
        : d,
    );
    const changed = buildTypeContract(mutated);
    expect(changed.hash).not.toBe(base.hash);
    expect(changed.members).toEqual(base.members);
    expect(checkTypeContract(base, changed)).toBe(
      `the token type contract changed (${NO_MEMBER_CHANGES}). Run 'npx tsc --noEmit' — fix each file it names; removed members are listed above.`,
    );
  });

  it('an enum member removal is reported as removed', () => {
    const mutated = readDts().map((d) =>
      d.rel.endsWith('SemanticToken.d.ts') ? { ...d, text: d.text.replace('    ACCESSIBILITY = "accessibility"\n', '') .replace('ICON = "icon",', 'ICON = "icon"') } : d,
    );
    const changed = buildTypeContract(mutated);
    expect(checkTypeContract(base, changed)).toBe(DESIGN_ROW('SemanticCategory.ACCESSIBILITY = "accessibility"', 'none'));
  });

  it('unchanged, or no recorded baseline → no report', () => {
    expect(checkTypeContract(base, base)).toBeNull();
    expect(checkTypeContract(null, base)).toBeNull();
    expect(checkTypeContract({ hash: '', members: [] }, base)).toBeNull();
  });

  it('the report string is string-equal to its catalog row', () => {
    expect(typeContractChangedMessage(['A.x: number'], ['A.x: string'])).toBe(DESIGN_ROW('A.x: number', 'A.x: string'));
  });

  it('the hash is the one dist/name-contract.json ships (when built)', () => {
    const contract = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'dist/name-contract.json'), 'utf8'));
    expect(contract.typeContract).toEqual(base);
  });
});
