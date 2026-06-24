/**
 * Frontmatter + viability parser (Spec 121, Req 6 — docs concept matching)
 *
 * Mechanically extracts the YAML-style frontmatter block (`name:` / `description:`
 * / `status:`) and derives the doc-level Layer-2 viability gate (placeholder /
 * deprecated). Like metadata-parser.ts this is purely mechanical extraction — it
 * does NOT interpret content or follow instructions.
 *
 * Why this exists separately from metadata-parser.ts:
 *   - metadata-parser.ts parses the `**Field**: value` block (Purpose, Layer, …).
 *   - The high-signal keyword surfaces the find_docs rubric needs — the
 *     frontmatter `name` (title) and `description` — live in the leading `---`
 *     fenced block, which the `**Field**:` parser never reads. This module reads
 *     that block plus the doc-level placeholder/deprecated markers.
 *
 * Rubric note: there is NO `keywords` frontmatter field in the corpus —
 * `description` is the keyword surface (discovery-confidence-rubric.md, Docs rubric).
 */

export interface FrontmatterInfo {
  /** Frontmatter `name:` (falls back to first H1, then undefined). High-signal. */
  title?: string;
  /** Frontmatter `description:` — the keyword surface. High-signal. */
  description?: string;
  /**
   * Frontmatter `aliases:` — reactive synonym surface (Spec 121 Req 1.9, extended
   * to docs). A curated comma-separated list of concept terms the doc is about even
   * when the literal term is absent from title/description/body (e.g. a CSS doc that
   * says "logical properties" but never "RTL"). High-signal. Optional/additive.
   */
  aliases?: string[];
  /** Layer-2 viability gate derived from doc-level markers. */
  viability: { placeholder: boolean; deprecated: boolean };
}

/**
 * Extract the leading `---`-fenced frontmatter block as raw key/value pairs.
 * Returns {} when no frontmatter is present. Only the FIRST fenced block at the
 * very top of the file is treated as frontmatter (a `---` horizontal rule later
 * in the body is not).
 */
function extractFrontmatterBlock(content: string): Record<string, string> {
  const fm: Record<string, string> = {};
  // Must open on the very first line.
  if (!content.startsWith('---')) return fm;

  const lines = content.split('\n');
  // line 0 is the opening '---'
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '---') break; // closing fence
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (m) {
      fm[m[1].toLowerCase()] = m[2].trim();
    }
  }
  return fm;
}

/** First H1 (`# Heading`) in the body, if any. */
function extractFirstH1(content: string): string | undefined {
  const lines = content.split('\n');
  for (const line of lines) {
    const m = /^#\s+(.+?)\s*$/.exec(line);
    if (m) return m[1].trim();
  }
  return undefined;
}

/**
 * Derive the doc-level placeholder gate.
 *
 * Recognized doc-level placeholder markers (whole-doc, not per-row table cells):
 *   - a `**Readiness**: 🔴 Placeholder` line
 *   - a `> ⚠️ **Placeholder Status**` callout
 *   - frontmatter `description: … (placeholder) …`
 *
 * Per-row `🔴 Planned` table cells (e.g. one planned variant inside an otherwise
 * shipped family doc) are intentionally NOT treated as a doc-level placeholder.
 */
function derivePlaceholder(content: string, fm: Record<string, string>): boolean {
  if (/^\s*\*\*Readiness\*\*:\s*🔴\s*Placeholder/m.test(content)) return true;
  if (/\*\*Placeholder Status\*\*/.test(content)) return true;
  if (fm.description && /\(placeholder\)/i.test(fm.description)) return true;
  return false;
}

/**
 * Derive the doc-level deprecated gate. No doc-level deprecated marker exists in
 * the corpus today; this recognizes the forward-compatible conventions so the
 * gate lights up automatically if/when one is introduced (frontmatter
 * `status: deprecated`, or a `**Status**: Deprecated` metadata line).
 */
function deriveDeprecated(content: string, fm: Record<string, string>): boolean {
  if (fm.status && /deprecated/i.test(fm.status)) return true;
  if (/^\s*\*\*Status\*\*:\s*.*deprecated/im.test(content)) return true;
  return false;
}

/**
 * Parse frontmatter (title/description) and derive doc-level viability from a
 * document's full content.
 */
export function extractFrontmatterInfo(content: string): FrontmatterInfo {
  const fm = extractFrontmatterBlock(content);

  const title = fm.name || extractFirstH1(content);
  const description = fm.description || undefined;
  const aliases = fm.aliases
    ? fm.aliases.split(',').map((s) => s.trim()).filter(Boolean)
    : undefined;

  return {
    title: title || undefined,
    description,
    aliases: aliases && aliases.length > 0 ? aliases : undefined,
    viability: {
      placeholder: derivePlaceholder(content, fm),
      deprecated: deriveDeprecated(content, fm),
    },
  };
}
