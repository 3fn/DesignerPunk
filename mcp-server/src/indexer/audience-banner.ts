/**
 * Audience-banner extraction for the docs MCP's summary payload.
 *
 * P-1 (`.kiro/issues/2026-10-15-123-u5-instrument-findings.md` § 4c; evidence
 * `.kiro/specs/123-consumer-distribution/validation/probe-rerun.md`): every audience banner sits
 * in a doc's preamble — after the front matter, before the first `##` — and
 * `get_document_summary` returned metadata + outline only, so a reference-mode agent on the
 * summary-first path never met one. Release-4 rulings item 14 (Peter, 2026-10-15) names the
 * vehicle: the banner in the summary payload. This module finds it; `DocumentIndexer` attaches it
 * to `DocumentSummary.audienceBanner` (additive, present only for a bannered doc).
 *
 * TWIN, guarded: `BANNER_LABEL` and the preamble rule are a copy of
 * `scripts/audience-banner/predicate.ts` (`BANNER_LABEL`, `preambleLines`, `hasBanner`'s block
 * walk) — the convention's one home. The docs MCP is a separately compiled package and does not
 * import from `scripts/`. `__tests__/audience-banner.test.ts` reads that file and fails if the
 * label drifts.
 *
 * Mechanical: returns the banner's text, it does not judge whether the banner conforms (the
 * presence guard in `scripts/audience-banner/` does that).
 */

/** The label every banner opens with — byte-identical to `scripts/audience-banner/predicate.ts`. */
export const BANNER_LABEL = '> **Audience framing**:';

/** The preamble: after any YAML front matter, up to (not including) the first heading below H1. */
function preambleLines(content: string): string[] {
  const lines = content.split('\n');
  let i = 0;
  if (lines[0]?.trim() === '---') {
    const end = lines.findIndex((l, idx) => idx > 0 && l.trim() === '---');
    if (end > 0) i = end + 1;
  }
  const out: string[] = [];
  for (; i < lines.length; i += 1) {
    if (/^#{2,}\s/.test(lines[i])) break;
    out.push(lines[i]);
  }
  return out;
}

/**
 * The doc's audience banner — the label line plus any consecutive `>` lines that continue it,
 * with the blockquote markers stripped and the lines joined by a space — or `undefined` when the
 * preamble carries no banner.
 */
export function extractAudienceBanner(content: string): string | undefined {
  const lines = preambleLines(content);
  const start = lines.findIndex((l) => l.startsWith(BANNER_LABEL));
  if (start === -1) return undefined;
  const block: string[] = [];
  for (let i = start; i < lines.length && lines[i].startsWith('>'); i += 1) {
    block.push(lines[i].replace(/^>\s?/, ''));
  }
  const banner = block.join(' ').trim();
  return banner === '' ? undefined : banner;
}
