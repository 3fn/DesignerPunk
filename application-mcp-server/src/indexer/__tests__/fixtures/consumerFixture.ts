/**
 * Shared consumer-install fixture for the Spec 123 Task 1.4 multi-root tests
 * (`MultiRootIndexing.test.ts`, `src/__tests__/consumerRootLiveReindex.test.ts`).
 * Not a test file (no `.test.ts` suffix, so jest does not collect it).
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export interface FixtureComponent {
  dir: string;
  name: string;
  inherits?: string;
  contracts: string[];
  tokens?: string[];
  description?: string;
  composesInternal?: string[];
}

export function writeComponent(root: string, c: FixtureComponent): string {
  const dirPath = path.join(root, c.dir);
  fs.mkdirSync(dirPath, { recursive: true });
  const schema = [
    `name: ${c.name}`,
    `type: type-primitive`,
    `family: Fixture`,
    `version: "1.0.0"`,
    `description: "${c.description ?? c.name}"`,
    `platforms: [web]`,
    `tokens: [${(c.tokens ?? []).join(', ')}]`,
  ];
  if (c.composesInternal?.length) {
    schema.push('composition:', '  internal:');
    for (const child of c.composesInternal) schema.push(`    - component: ${child}`, `      relationship: contains`);
  }
  fs.writeFileSync(path.join(dirPath, `${c.name}.schema.yaml`), schema.join('\n') + '\n');
  const contracts = [`version: "1.0.0"`, `component: ${c.name}`, `family: Fixture`];
  if (c.inherits) contracts.push(`inherits: ${c.inherits}`);
  contracts.push('contracts:');
  for (const k of c.contracts) {
    contracts.push(`  ${k}:`, `    category: ${k.split('_')[0]}`, `    description: "${k}"`, `    behavior: "${k}"`);
  }
  fs.writeFileSync(path.join(dirPath, 'contracts.yaml'), contracts.join('\n') + '\n');
  return dirPath;
}

export interface ConsumerFixture {
  base: string;
  consumerRoot: string;
  packageRoot: string;
}

/**
 * Package: Widget-Base, Widget-Primary (inherits Widget-Base), Panel-Base (composes Widget-Primary).
 * Consumer: a FORK of Widget-Primary in a directory whose name differs from its declared name
 * (`widget-primary-fork/`), inheriting the PACKAGE parent Widget-Base; Card-Consumer (composes
 * the package's Widget-Base).
 */
export function buildConsumerFixture(prefix: string): ConsumerFixture {
  const base = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), prefix));
  const consumerRoot = path.join(base, 'src', 'components');
  const packageRoot = path.join(base, 'node_modules', '@3fn', 'core', 'src', 'components', 'core');
  fs.mkdirSync(consumerRoot, { recursive: true });
  fs.mkdirSync(packageRoot, { recursive: true });

  writeComponent(packageRoot, { dir: 'Widget-Base', name: 'Widget-Base', contracts: ['interaction_pressable'], tokens: ['space100'] });
  writeComponent(packageRoot, {
    dir: 'Widget-Primary', name: 'Widget-Primary', inherits: 'Widget-Base',
    contracts: ['visual_package_marker'], tokens: ['color.package'], description: 'PACKAGE',
  });
  writeComponent(packageRoot, {
    dir: 'Panel-Base', name: 'Panel-Base', contracts: ['visual_panel'], composesInternal: ['Widget-Primary'],
  });

  writeComponent(consumerRoot, {
    dir: 'widget-primary-fork', name: 'Widget-Primary', inherits: 'Widget-Base',
    contracts: ['visual_fork_marker'], tokens: ['color.fork'], description: 'FORK',
  });
  writeComponent(consumerRoot, {
    dir: 'Card-Consumer', name: 'Card-Consumer', contracts: ['visual_card'], composesInternal: ['Widget-Base'],
  });

  return { base, consumerRoot, packageRoot };
}
