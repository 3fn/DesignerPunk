/**
 * The name contract over the component tier (Spec 129 U8, Req 5.4; design § 9).
 *
 * DesignerPunk's component tokens are emitted by name: `DesignTokens.size500` on iOS,
 * `DesignTokens.size_500` on Android, `var(--size-500)` in the package's web CSS. A consumer who
 * renames or deletes `size500` in their own token source leaves those names undefined, and the
 * emitted `ComponentTokens` file stops compiling. `generate` and `sync` REPORT this. They never
 * fail on it and never write to the consumer's token source (Req 5A.2; the report-only rule of
 * the name contract in `../sync/NameContract.ts`, whose web-surface check excludes the component
 * tier by P1).
 *
 * The check reads every platform's generated output: the custom properties `DesignTokens.web.css`
 * defines, and the members `DesignTokens.ios.swift` and `DesignTokens.android.kt` declare. The
 * per-platform spelling of a primitive comes from the package's shipped `token-index/primitives.yaml`.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { platformOutputDir } from '../../config/platforms';
import type { PlatformKey, PlatformOutputs } from '../../config/platforms';

export type ReferencePlatform = 'web' | 'ios' | 'android';
export const REFERENCE_PLATFORMS: readonly ReferencePlatform[] = ['ios', 'android', 'web'];

/** One shipped component token and the primitive it reads. */
export interface ComponentTokenReference {
  token: string;
  /** The primitive's name in DesignerPunk's language (`size500`). */
  primitive: string;
}

export interface MissingReference {
  primitive: string;
  /** The platforms whose generated output does not define it. */
  platforms: ReferencePlatform[];
  /** The shipped component tokens that read it, in the order given. */
  tokens: string[];
}

/** Per-platform member names declared in the consumer's generated output; `null` where the file is absent. */
export type DeclaredNames = Record<ReferencePlatform, Set<string> | null>;

const FILES: Record<ReferencePlatform, string> = {
  web: 'DesignTokens.web.css',
  ios: 'DesignTokens.ios.swift',
  android: 'DesignTokens.android.kt',
};

function read(file: string): string | null {
  try { return fs.readFileSync(file, 'utf-8'); } catch { return null; }
}

/** What the consumer's generated `DesignTokens.*` files define, on each platform. */
export function readDeclaredNames(config: string | { outputDir: string; platforms?: PlatformOutputs }): DeclaredNames {
  // A bare folder reads every platform from it; a config reads each platform from the folder `platforms:` gives it (Spec 129 Req 12.2).
  const dirOf = (p: PlatformKey): string => (typeof config === 'string' ? config : platformOutputDir(config, p));
  const names: DeclaredNames = { web: null, ios: null, android: null };
  const web = read(path.join(dirOf('web'), FILES.web));
  if (web !== null) {
    names.web = new Set([...web.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/(--[A-Za-z_][A-Za-z0-9_-]*)\s*:/g)].map(m => m[1]));
  }
  const swift = read(path.join(dirOf('ios'), FILES.ios));
  if (swift !== null) {
    names.ios = new Set([...swift.matchAll(/\b(?:let|var)\s+([A-Za-z_][A-Za-z0-9_]*)\b/g)].map(m => m[1]));
  }
  const kotlin = read(path.join(dirOf('android'), FILES.android));
  if (kotlin !== null) {
    names.android = new Set([...kotlin.matchAll(/\bval\s+([A-Za-z_][A-Za-z0-9_]*)\b/g)].map(m => m[1]));
  }
  return names;
}

/** The package's primitive names per platform, from its shipped index; `null` with a reason when unreadable. */
export function readPackagePrimitiveNames(
  packageRoot: string,
): { names: Map<string, Record<ReferencePlatform, string>>; reason?: undefined } | { names: null; reason: string } {
  try {
    const doc = yaml.load(fs.readFileSync(path.join(packageRoot, 'token-index', 'primitives.yaml'), 'utf-8')) as
      { tokens?: Record<string, { platforms?: Partial<Record<ReferencePlatform, unknown>> }> } | null;
    const out = new Map<string, Record<ReferencePlatform, string>>();
    for (const [name, entry] of Object.entries(doc?.tokens ?? {})) {
      const p = entry?.platforms;
      if (p && typeof p.web === 'string' && typeof p.ios === 'string' && typeof p.android === 'string') {
        out.set(name, { web: p.web, ios: p.ios, android: p.android });
      }
    }
    if (out.size === 0) return { names: null, reason: 'token-index/primitives.yaml has no tokens' };
    return { names: out };
  } catch (err) {
    return { names: null, reason: err instanceof Error ? err.message.split('\n', 1)[0] : String(err) };
  }
}

/**
 * The references no platform of the generated output defines, grouped by primitive.
 * A platform whose generated file is absent is not judged (`declared[p] === null`); a primitive
 * the package's own index does not name is not judged either (DesignerPunk's own gap, not the consumer's).
 */
export function findMissingReferences(
  references: readonly ComponentTokenReference[],
  declared: DeclaredNames,
  primitiveNames: ReadonlyMap<string, Record<ReferencePlatform, string>>,
): MissingReference[] {
  const byPrimitive = new Map<string, MissingReference>();
  for (const ref of references) {
    const spelled = primitiveNames.get(ref.primitive);
    if (!spelled) continue;
    const platforms = REFERENCE_PLATFORMS.filter(p => declared[p] !== null && !declared[p]!.has(spelled[p]));
    if (platforms.length === 0) continue;
    const found = byPrimitive.get(ref.primitive);
    if (found) { if (!found.tokens.includes(ref.token)) found.tokens.push(ref.token); }
    else byPrimitive.set(ref.primitive, { primitive: ref.primitive, platforms, tokens: [ref.token] });
  }
  return [...byPrimitive.values()];
}

/**
 * The report line. A report, not a failure: `generate` and `sync` print it and carry on.
 * @param tierPath Where the consumer's primitive tier lives, for the remedy (e.g. `src/tokens/`).
 * @param introducedBy When `sync` knows the installed package introduced the reference for some of
 *   these tokens: the package and version, and those tokens.
 */
export function missingReferenceMessage(m: MissingReference, tierPath: string, introducedBy?: { by: string; tokens: readonly string[] }): string {
  const shown = m.tokens.slice(0, 3).join(', ') + (m.tokens.length > 3 ? ` and ${m.tokens.length - 3} more` : '');
  return (
    `component tokens: DesignerPunk's ${shown} ${m.tokens.length === 1 ? 'reads' : 'read'} '${m.primitive}', ` +
    `which your generated ${m.platforms.join(', ')} output does not define` +
    `${introducedBy ? ` (new in ${introducedBy.by}: ${introducedBy.tokens.slice(0, 3).join(', ')}${introducedBy.tokens.length > 3 ? `, and ${introducedBy.tokens.length - 3} more` : ''})` : ''}. ` +
    `Until it is defined, the emitted ComponentTokens ${m.platforms.length === 1 ? 'file does' : 'files do'} not compile. ` +
    `Restore '${m.primitive}' in ${tierPath}, or declare the group yourself: a group you declare replaces DesignerPunk's.`
  );
}
