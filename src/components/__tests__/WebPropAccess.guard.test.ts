/**
 * @jest-environment jsdom
 */
/**
 * WebPropAccess.guard.test.ts — every served prop's `web` state is true of the running element
 * (ballot 2026-10-30-web-prop-property-or-attribute-only, § 4 step 5; Component Schema Format
 * § "Web Access (`web`)").
 *
 * For each component schema with a web element, an upgraded instance is made
 * (`document.createElement(tag)` after the element module's `customElements.define`). For each of
 * the schema's own non-callback props (a callback: a `=>` signature in `type`, or an `on[A-Z]`
 * name), `children` excluded as slot content:
 *   - no `web` key            → `prop in instance` (React 19's own test, so inherited
 *                               HTMLElement properties count);
 *   - `web: attribute-only`   → not `in` the instance, and its kebab-case form is in the
 *                               element's `observedAttributes`;
 *   - `web: unmapped`         → neither `in` the instance nor observed.
 * No exclusion list is kept: a prop the element takes neither way must say so in the schema.
 * A mark that stops being true (the element gains the property) fails, so marks are removed
 * when G-4 adds properties.
 *
 * WHAT IT DOES NOT ESTABLISH: that a prop the element takes does what the schema says; how a
 * callback maps to an event (G-4's); the schema's inherited props (each schema's own `properties`
 * are what the Application MCP serves for it).
 */
import * as fs from 'fs';
import * as path from 'path';
import { load } from 'js-yaml';

const CORE = path.join(__dirname, '..', 'core');
const kebab = (s: string): string =>
  s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase();
const isCallback = (name: string, def: Record<string, unknown>): boolean =>
  String(def?.type ?? '').includes('=>') || /^on[A-Z]/.test(name);

interface Case {
  component: string;
  tag: string;
  webFile: string;
  props: Array<[string, Record<string, unknown>]>;
}

const cases: Case[] = [];
for (const dir of fs.readdirSync(CORE).sort()) {
  const schemaFile = path.join(CORE, dir, `${dir}.schema.yaml`);
  const webDir = path.join(CORE, dir, 'platforms', 'web');
  if (!fs.existsSync(schemaFile) || !fs.existsSync(webDir)) continue;
  const webFile = fs.readdirSync(webDir).find((f) => f.endsWith('.web.ts'));
  if (!webFile) continue;
  const tag = /customElements\.define\(\s*'([a-z0-9-]+)'/.exec(fs.readFileSync(path.join(webDir, webFile), 'utf8'))?.[1];
  if (!tag) continue;
  const schema = load(fs.readFileSync(schemaFile, 'utf8')) as { properties?: Record<string, Record<string, unknown>> };
  const props = Object.entries(schema.properties ?? {}).filter(([name, def]) => name !== 'children' && !isCallback(name, def));
  cases.push({ component: dir, tag, webFile: path.join(webDir, webFile), props });
}

describe('every served non-callback prop states its web form truly', () => {
  it('covers the web components (non-vacuity)', () => {
    expect(cases.length).toBeGreaterThan(30);
    expect(cases.reduce((n, c) => n + c.props.length, 0)).toBeGreaterThan(200);
  });

  it.each(cases.map((c) => [c.component, c] as const))('%s', (_name, c) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(c.webFile);
    const Ctor = customElements.get(c.tag) as (CustomElementConstructor & { observedAttributes?: string[] }) | undefined;
    expect(`${c.tag} defined: ${Boolean(Ctor)}`).toBe(`${c.tag} defined: true`);
    const instance = document.createElement(c.tag) as unknown as Record<string, unknown>;
    const observed = Ctor?.observedAttributes ?? [];
    const wrong: string[] = [];
    for (const [name, def] of c.props) {
      const inInstance = name in instance;
      const isObserved = observed.includes(kebab(name));
      const web = def.web;
      if (web === undefined && !inInstance)
        wrong.push(`${name}: no web key, but not a JS property (${isObserved ? `observed as ${kebab(name)}: mark attribute-only` : 'not observed either: mark unmapped'})`);
      if (web === 'attribute-only' && (inInstance || !isObserved))
        wrong.push(`${name}: web attribute-only, but ${inInstance ? 'it is a JS property (remove the mark)' : `${kebab(name)} is not observed`}`);
      if (web === 'unmapped' && (inInstance || isObserved))
        wrong.push(`${name}: web unmapped, but it is ${inInstance ? 'a JS property' : `observed as ${kebab(name)}`}`);
    }
    expect(wrong).toEqual([]);
  });
});
