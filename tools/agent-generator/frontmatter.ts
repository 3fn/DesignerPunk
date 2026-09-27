/**
 * The shared frontmatter splitter (C13) — Spec 123 Task 10.1.
 *
 * design.md § "C13. The splitter family": `splitFrontmatter(file) → { frontmatter; body }` is
 * ONE shared function, used by every consumer (C14 spans, C16 operative sets, C18 triviality,
 * C22 derive — and the canonical-source loader, `source.ts`, which the adapters' body comes
 * from). `partition()` (partition.ts) takes the BODY this returns, NEVER the file: charters
 * carry 6–18 `^# ` YAML-comment lines inside their frontmatter (102 across the nine files),
 * and partitioning the file would mint each as a phantom H1 unit.
 *
 * Identity docs (C19) are split with this same function; their own frontmatter is DROPPED by
 * the consumer lane, never carried or stacked (Lina R2) — this function only separates it.
 *
 * Traces to: Req 10.G (one splitter, three consumers), Req 10.8 (the body is what is
 * partitioned), design C13.
 */

import { load as loadYaml } from 'js-yaml';

/** A parsed YAML frontmatter mapping. Structural typing only — schema.ts owns the charter shape. */
export type YamlDoc = Record<string, unknown>;

export interface SplitFrontmatterResult {
  /** The parsed frontmatter mapping (`{}` when the file carries none). */
  frontmatter: YamlDoc;
  /** Everything after the closing fence, byte-preserved — the input to `partition()`. */
  body: string;
  /** The raw YAML text between the fences (undefined when absent) — for comment-aware readers. */
  rawFrontmatter: string | undefined;
  /** Whether a leading `---` frontmatter block was present. */
  hasFrontmatter: boolean;
}

/** Thrown when a frontmatter block is present but is not a YAML mapping. */
export class FrontmatterParseError extends Error {
  constructor(message: string, readonly file?: string) {
    super(file ? `${message} (${file})` : message);
    this.name = 'FrontmatterParseError';
  }
}

/**
 * A leading `---` fence, then a YAML block, then a closing `---` on its own line, then the
 * body. The SAME pattern the Spec 122 canonical-source loader has always used (moved here so
 * there is one splitter, not two that could drift).
 */
const FRONTMATTER_FENCE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/**
 * Split raw fence text into `{ rawFrontmatter, body }`, or `undefined` when the file does not
 * open with a frontmatter fence. Pure; no YAML parse (the canonical-source loader needs the raw
 * text to recover `# asserts:` comments that a YAML parse discards).
 */
export function splitFrontmatterText(file: string): { rawFrontmatter: string; body: string } | undefined {
  const match = FRONTMATTER_FENCE.exec(file);
  if (!match) return undefined;
  return { rawFrontmatter: match[1], body: match[2] };
}

/**
 * Split a document into its parsed frontmatter and its body. A file with no leading fence has
 * `{}` frontmatter and the whole file as its body (`hasFrontmatter: false`) — a caller that
 * REQUIRES frontmatter (the canonical-source loader) checks the flag and throws its own error.
 */
export function splitFrontmatter(file: string, sourcePath?: string): SplitFrontmatterResult {
  const split = splitFrontmatterText(file);
  if (!split) {
    return { frontmatter: {}, body: file, rawFrontmatter: undefined, hasFrontmatter: false };
  }
  let parsed: unknown;
  try {
    parsed = loadYaml(split.rawFrontmatter) ?? {};
  } catch (error) {
    throw new FrontmatterParseError(`Frontmatter YAML failed to parse: ${(error as Error).message}`, sourcePath);
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new FrontmatterParseError('Frontmatter did not parse to a YAML mapping', sourcePath);
  }
  return {
    frontmatter: parsed as YamlDoc,
    body: split.body,
    rawFrontmatter: split.rawFrontmatter,
    hasFrontmatter: true,
  };
}
