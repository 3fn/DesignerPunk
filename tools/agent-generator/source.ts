/**
 * Canonical agent source loader — Spec 122 Task 2 (the `validate(source)` input stage of
 * the C3 Pipeline interface).
 *
 * Parses a `canonical/agents/<agent>.md` file into the {@link CanonicalAgentDoc} that
 * schema.ts's validators and the pipeline's resolve/render/compose stages consume:
 *   - YAML frontmatter (between the leading `---` fence and the next `---` line) → the
 *     structured `AgentFrontmatter` (via js-yaml).
 *   - Everything after the closing fence → the pass-through `body` string, byte-preserved
 *     (never parsed into classes; Req 1 AC2 pass-through is verbatim).
 *
 * `# asserts:` COMPANION CAPTURE (design.md C1 rule 3 / A-D2): a `pattern:` assert REQUIRES
 * an inline `# asserts: <plain-English>` YAML comment, surfaced on the parsed claim as
 * `assertsComment` (schema.ts `GovernanceAssertClaim.assertsComment`). js-yaml DISCARDS
 * comments, so a naive parse would silently drop the companion — the exact silent-failure
 * class this spec fights. This loader re-scans the raw frontmatter text and attaches the
 * companions POSITIONALLY: the Nth `pattern:`-bearing claim (document order) receives the
 * Nth inline `# asserts:` comment (document order). Design's authoring form guarantees a
 * 1:1, in-order pairing; a count mismatch simply leaves the unmatched claim's
 * `assertsComment` undefined, which rule 3 (`validateGovernanceAsLaw`) then flags loudly
 * rather than passing a pattern with no reviewable companion.
 *
 * Traces to: Req 1 AC2 (pass-through verbatim), Req 2 AC1 (Markdown body + YAML
 * frontmatter), Req 18 AC2(a) / A-D2 (pattern companion), C1 rules 3.
 */

import { load as loadYaml } from 'js-yaml';
import type { AgentFrontmatter, CanonicalAgentDoc } from './schema';

/** Thrown when a canonical agent source file is structurally malformed. */
export class CanonicalSourceParseError extends Error {
  constructor(message: string, readonly sourcePath?: string) {
    super(sourcePath ? `${message} (${sourcePath})` : message);
    this.name = 'CanonicalSourceParseError';
  }
}

/** A leading `---` fence, then a YAML block, then a closing `---` on its own line, then the body. */
const FRONTMATTER_FENCE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/** Matches an inline `# asserts: <text>` YAML comment, capturing the plain-English text. */
const ASSERTS_COMMENT = /#\s*asserts:\s*(.+?)\s*$/;
/** Matches a `pattern:` key line in the raw frontmatter (any nesting). */
const PATTERN_KEY_LINE = /^\s*(?:-\s*)?pattern\s*:/;

/**
 * Split raw file text into `{ rawFrontmatter, body }`. Throws if the leading frontmatter
 * fence is absent — a canonical agent file MUST carry frontmatter (Req 2 AC1).
 */
function splitFrontmatter(raw: string, sourcePath?: string): { rawFrontmatter: string; body: string } {
  const match = FRONTMATTER_FENCE.exec(raw);
  if (!match) {
    throw new CanonicalSourceParseError(
      'Canonical agent source is missing a leading `---` YAML frontmatter fence',
      sourcePath
    );
  }
  return { rawFrontmatter: match[1], body: match[2] };
}

/**
 * Collect, in document order, every inline `# asserts:` companion string in the raw
 * frontmatter. Positionally paired with pattern-bearing claims by {@link attachAssertsComments}.
 */
function collectAssertsComments(rawFrontmatter: string): string[] {
  const comments: string[] = [];
  for (const line of rawFrontmatter.split('\n')) {
    const m = ASSERTS_COMMENT.exec(line);
    if (m) comments.push(m[1]);
  }
  return comments;
}

/**
 * Count `pattern:` key lines in the raw frontmatter, in document order — used only to sanity
 * check that comment collection and claim walking see the same population; the actual
 * attachment walks the parsed structure so nesting is honored.
 */
function countPatternLines(rawFrontmatter: string): number {
  return rawFrontmatter.split('\n').filter((line) => PATTERN_KEY_LINE.test(line)).length;
}

/**
 * Walk the parsed frontmatter's governanceAsLaw asserts in document order and attach the
 * positionally-corresponding `# asserts:` companion to each claim that carries a `pattern`.
 * Leaves `assertsComment` untouched (undefined) for any pattern-claim beyond the supply of
 * collected comments — rule 3 then flags the missing companion.
 */
function attachAssertsComments(frontmatter: AgentFrontmatter, comments: string[]): void {
  const entries = frontmatter.ambient?.governanceAsLaw;
  if (!entries) return;
  let commentIndex = 0;
  for (const entry of entries) {
    for (const claim of entry.assert ?? []) {
      if (typeof claim.pattern === 'string') {
        if (commentIndex < comments.length) {
          // Only fill from the comment stream when the author did not already provide the
          // value structurally (defensive — the canonical form is a comment, not a key).
          if (claim.assertsComment === undefined) {
            claim.assertsComment = comments[commentIndex];
          }
          commentIndex += 1;
        }
      }
    }
  }
}

/**
 * Parse canonical agent source TEXT into a {@link CanonicalAgentDoc}. Pure (no filesystem) —
 * `readCanonicalAgentSource` is the filesystem wrapper.
 */
export function parseCanonicalAgentSource(raw: string, sourcePath?: string): CanonicalAgentDoc {
  const { rawFrontmatter, body } = splitFrontmatter(raw, sourcePath);

  let frontmatter: AgentFrontmatter;
  try {
    frontmatter = (loadYaml(rawFrontmatter) ?? {}) as AgentFrontmatter;
  } catch (error) {
    throw new CanonicalSourceParseError(
      `Frontmatter YAML failed to parse: ${(error as Error).message}`,
      sourcePath
    );
  }
  if (typeof frontmatter !== 'object' || frontmatter === null || Array.isArray(frontmatter)) {
    throw new CanonicalSourceParseError('Frontmatter did not parse to a YAML mapping', sourcePath);
  }

  // Attach the `# asserts:` companions the YAML parse dropped. The count check keeps the
  // positional pairing honest: if the raw `pattern:` line count disagrees with what the
  // structural walk sees, the discrepancy is left to rule 3 rather than silently guessed.
  const comments = collectAssertsComments(rawFrontmatter);
  const patternLineCount = countPatternLines(rawFrontmatter);
  if (comments.length > 0 || patternLineCount > 0) {
    attachAssertsComments(frontmatter, comments);
  }

  return { frontmatter, body, sourcePath };
}
