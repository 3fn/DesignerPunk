/**
 * SchemaWebAccess.test.ts — the served `web` property field (Component Schema Format
 * § "Web Access (`web`)"; ballot 2026-10-30-web-prop-property-or-attribute-only, § 4 step 5).
 *
 * Every component schema in the repo: `web` takes only `attribute-only` or `unmapped`, and never
 * sits on a callback. A callback is a prop whose `type` is a signature (contains `=>`) or whose
 * name is `on[A-Z]…` (the form Component Schema Format § "Property Types" teaches). The parser
 * serves the two values and nothing else.
 *
 * Whether each mark is TRUE of the element is the guard's, not this file's:
 * src/components/__tests__/WebPropAccess.guard.test.ts.
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { load } from 'js-yaml';
import { parseSchemaYaml } from '../parsers';

const CORE = path.resolve(__dirname, '..', '..', '..', '..', 'src', 'components', 'core');
const schemaFiles = fs
  .readdirSync(CORE)
  .map((dir) => path.join(CORE, dir, `${dir}.schema.yaml`))
  .filter((f) => fs.existsSync(f));

const isCallback = (name: string, def: Record<string, unknown>): boolean =>
  String(def?.type ?? '').includes('=>') || /^on[A-Z]/.test(name);

describe('the repo schemas carry `web` only in its two values, never on a callback', () => {
  it('finds the component schemas (non-vacuity)', () => {
    expect(schemaFiles.length).toBeGreaterThan(30);
  });

  it.each(schemaFiles.map((f) => [path.basename(f), f]))('%s', (_n, file) => {
    const doc = load(fs.readFileSync(file, 'utf8')) as { properties?: Record<string, Record<string, unknown>> };
    const bad: string[] = [];
    for (const [name, def] of Object.entries(doc.properties ?? {})) {
      if (def?.web === undefined) continue;
      if (def.web !== 'attribute-only' && def.web !== 'unmapped') bad.push(`${name}: web is ${JSON.stringify(def.web)}`);
      if (isCallback(name, def)) bad.push(`${name}: web on a callback`);
      if (name === 'children') bad.push(`${name}: web on slot content`);
    }
    expect(bad).toEqual([]);
  });

  it('at least one schema carries each value (the field is in use, so the check is not vacuous)', () => {
    const values = new Set<string>();
    for (const f of schemaFiles) {
      const doc = load(fs.readFileSync(f, 'utf8')) as { properties?: Record<string, Record<string, unknown>> };
      for (const def of Object.values(doc.properties ?? {})) if (typeof def?.web === 'string') values.add(def.web);
    }
    expect([...values].sort()).toEqual(['attribute-only', 'unmapped']);
  });
});

describe('the parser serves `web`', () => {
  it('passes attribute-only and unmapped through, and drops any other value', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'schema-web-'));
    const file = path.join(dir, 'X.schema.yaml');
    fs.writeFileSync(
      file,
      [
        'name: X',
        'type: primitive',
        'family: X',
        'version: 1.0.0',
        'description: fixture',
        'properties:',
        '  a:',
        '    type: string',
        '    description: a',
        '    web: attribute-only',
        '  b:',
        '    type: boolean',
        '    description: b',
        '    web: unmapped',
        '  c:',
        '    type: string',
        '    description: c',
        '    web: property',
        '  d:',
        '    type: string',
        '    description: d',
        '',
      ].join('\n')
    );
    const result = parseSchemaYaml(file) as unknown as { data?: { properties: Record<string, { web?: string }> } };
    const props = result.data!.properties;
    expect([props.a.web, props.b.web, props.c.web, props.d.web]).toEqual(['attribute-only', 'unmapped', undefined, undefined]);
  });
});
