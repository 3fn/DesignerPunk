/**
 * @jest-environment node
 * @category evergreen
 * @purpose Two readers of a component schema's `tokens:` block agree: the Application MCP's
 *   `parseSchemaYaml` (application-mcp-server/src/indexer/parsers.ts → `extractTokens`, which
 *   serves `get_component_full` tokens) and `readSchemaTokenRefs`
 *   (src/generators/generateTokenIndex.ts, which builds the token index `consumers` that
 *   `get_token_consumers` serves, and feeds the schema token-name guard). If they disagree,
 *   the MCP says a component declares a token while the consumer map does not count it, or
 *   the reverse.
 *
 *   Root lane on purpose: it loads both packages' source, and the application-mcp-server lane
 *   installs no root dependencies. Exercises parsers.ts (Lina) against generateTokenIndex.ts
 *   (Ada, read only). Until 2026-10-23 extractTokens dropped scalar groups and turned
 *   `{reference}` objects into "[object Object]"; no core schema used either form.
 *
 *   Bite (recorded in the PR): restore the old `if (Array.isArray(values))` filter in
 *   extractTokens → the fixture case goes red.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { readSchemaTokenRefs } from '../../generators/generateTokenIndex';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { parseSchemaYaml } = require(path.resolve(__dirname, '../../../application-mcp-server/src/indexer/parsers'));

const COMPONENTS_ROOT = path.resolve(__dirname, '../core');

/** schemaPath → token list, as the token-index reader reads it. */
function consumerMapReading(root: string): Map<string, string[]> {
  const { refs, unreadable } = readSchemaTokenRefs([root]);
  expect(unreadable).toEqual([]);
  const bySchema = new Map<string, string[]>();
  for (const ref of refs) bySchema.set(ref.schemaPath, [...(bySchema.get(ref.schemaPath) ?? []), ref.token]);
  return bySchema;
}

/** The Application MCP's token list for one schema. */
function mcpReading(schemaPath: string): string[] {
  const result = parseSchemaYaml(schemaPath);
  expect(result.warning).toBeNull();
  return result.data.tokens;
}

describe('schema tokens: the MCP parser and the token-index reader read the same list', () => {
  it('every src/components/core schema', () => {
    const bySchema = consumerMapReading(COMPONENTS_ROOT);
    const schemas = fs.readdirSync(COMPONENTS_ROOT, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .flatMap(d => fs.readdirSync(path.join(COMPONENTS_ROOT, d.name))
        .filter(f => f.endsWith('.schema.yaml'))
        .map(f => path.join(COMPONENTS_ROOT, d.name, f)));
    expect(schemas.length).toBeGreaterThan(0);
    const differ = schemas
      .map(p => ({ p, mcp: mcpReading(p), index: bySchema.get(p) ?? [] }))
      .filter(r => JSON.stringify(r.mcp) !== JSON.stringify(r.index))
      .map(r => `${path.relative(COMPONENTS_ROOT, r.p)}: mcp ${JSON.stringify(r.mcp)} vs index ${JSON.stringify(r.index)}`);
    expect(differ).toEqual([]);
  });

  describe('every shape the reader accepts', () => {
    let tmp: string;
    beforeEach(() => { tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'schema-token-readers-')); });
    afterEach(() => { fs.rmSync(tmp, { recursive: true, force: true }); });

    it('array and scalar groups, {reference|name} objects, null entries, an empty group, and a non-token value', () => {
      const dir = path.join(tmp, 'Card');
      fs.mkdirSync(dir);
      const schemaPath = path.join(dir, 'Card.schema.yaml');
      fs.writeFileSync(schemaPath, [
        'name: Card',
        'tokens:',
        '  color:',
        '    - color.structure.surface',
        '    - reference: color.structure.border',
        '    - name: color.text.default',
        '    - null',
        '  spacing: space.inset.100',
        '  empty:',
        '  size:',
        '    - 8',
      ].join('\n') + '\n');
      const expected = ['color.structure.surface', 'color.structure.border', 'color.text.default', 'space.inset.100', '8'];
      expect(consumerMapReading(tmp).get(schemaPath)).toEqual(expected);
      expect(mcpReading(schemaPath)).toEqual(expected);
    });
  });
});
