/**
 * Shared fixtures for the consumer-entry tests (Spec 123 Task 16.1).
 *
 * `makePackageRoot` assembles an INSTALLED-PACKAGE-SHAPED directory from this repo, containing
 * exactly what C20 says the lane may read:
 *   - `dist/consumer-canonical/`: written by `buildConsumerCanonical`, the SAME function
 *     `npm run build:consumer-canonical` (prepack) runs, so the tests read what prepack builds;
 *   - `.kiro/steering/<doc>.md` for the always-set's identity docs only (the eight that ship);
 *   - `governance/**`;
 *   - `dist/mcp/tool-manifest.json`: copied from this repo's build (`npm run build:mcp`; CI's
 *     agent-generator lane builds it before running this suite).
 * Nothing under `canonical/` is copied: it does not ship.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { buildConsumerCanonical, CONSUMER_CANONICAL_DIR, TEMPLATE_MEMBERS, TOOL_MANIFEST_PATH } from '../consumer-entry';

export const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');

/** The always-set's identity ids (template members excluded), from the repo's always-set. */
export function identityIds(): string[] {
  const doc = loadYaml(fs.readFileSync(path.join(REPO_ROOT, 'canonical/shared/always-set.yaml'), 'utf8')) as { alwaysSet: { id: string }[] };
  return doc.alwaysSet.map((m) => m.id).filter((id) => !TEMPLATE_MEMBERS.includes(id));
}

/** The repo-relative path of an identity doc by id (lowercased basename, as `buildDocIdToPath`). */
export function identityDocPath(id: string): string {
  const dir = '.kiro/steering';
  const file = fs.readdirSync(path.join(REPO_ROOT, dir)).find((f) => f.replace(/\.md$/, '').toLowerCase() === id);
  if (!file) throw new Error(`no identity doc for "${id}" under ${dir}`);
  return `${dir}/${file}`;
}

/** The governance file whose frontmatter `id:` (or lowercased basename) is `id`. */
export function governanceDocPath(id: string): string {
  const file = fs.readdirSync(path.join(REPO_ROOT, 'governance')).find((f) => f.replace(/\.md$/, '').toLowerCase() === id);
  if (!file) throw new Error(`no governance doc for "${id}"`);
  return `governance/${file}`;
}

/** A fresh temp dir holding `pkg/` (the installed package) and `consumer/` (the consumer's repo). */
export function makePackageRoot(): { tmp: string; packageRoot: string; consumerRoot: string } {
  const manifest = path.join(REPO_ROOT, TOOL_MANIFEST_PATH);
  if (!fs.existsSync(manifest)) {
    throw new Error(`${TOOL_MANIFEST_PATH} is absent — run \`npm run build:mcp\` before this suite (the package ships it)`);
  }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-consumer-entry-'));
  const packageRoot = path.join(tmp, 'pkg');
  const consumerRoot = path.join(tmp, 'consumer');
  fs.mkdirSync(consumerRoot, { recursive: true });
  buildConsumerCanonical(REPO_ROOT, path.join(packageRoot, CONSUMER_CANONICAL_DIR));
  for (const id of identityIds()) {
    const rel = identityDocPath(id);
    fs.mkdirSync(path.dirname(path.join(packageRoot, rel)), { recursive: true });
    fs.copyFileSync(path.join(REPO_ROOT, rel), path.join(packageRoot, rel));
  }
  fs.cpSync(path.join(REPO_ROOT, 'governance'), path.join(packageRoot, 'governance'), { recursive: true });
  fs.mkdirSync(path.dirname(path.join(packageRoot, TOOL_MANIFEST_PATH)), { recursive: true });
  fs.copyFileSync(manifest, path.join(packageRoot, TOOL_MANIFEST_PATH));
  return { tmp, packageRoot, consumerRoot };
}

/** Every file under `root/rel`, as root-relative POSIX paths → contents (sidecars excluded). */
export function readTree(root: string, rel = ''): Map<string, string> {
  const out = new Map<string, string>();
  const walk = (sub: string): void => {
    const abs = path.join(root, sub);
    if (!fs.existsSync(abs)) return;
    for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
      const next = sub === '' ? entry.name : `${sub}/${entry.name}`;
      if (entry.isDirectory()) walk(next);
      else if (entry.isFile() && !next.endsWith('.attribution.json')) out.set(next, fs.readFileSync(path.join(root, next), 'utf8'));
    }
  };
  walk(rel);
  return out;
}
