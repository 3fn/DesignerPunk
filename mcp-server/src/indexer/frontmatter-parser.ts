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

  /**
   * Stable per-doc addressing id (Spec 119-A Req 2). Location-independent,
   * immutable, semantically inert. Read from frontmatter `id:` when present;
   * otherwise DERIVED as the kebab-slug of `name:`, falling back to the first
   * H1; `undefined` only when the doc has none of those (an unaddressable doc).
   *
   * The derivation happens ONCE here (read-time); the 119-A backfill codemod
   * (Task 4) freezes the derived slug onto disk as a literal `id:` so it is
   * never re-derived thereafter.
   */
  id?: string;

  /**
   * Where `id` came from — retained for the build-time uniqueness guard and the
   * backfill codemod (Spec 119-A Req 2 AC9 / Req 12):
   *   - 'frontmatter'  — an explicit on-disk `id:` (already frozen).
   *   - 'derived-name' — slug of frontmatter `name:` (needs backfill).
   *   - 'derived-h1'   — slug of the first H1 (needs backfill; the 14-doc path
   *                      flagged by Task 1: docs lacking a `name:` field).
   *   - 'none'         — no `id:`, no `name:`, no H1 — unaddressable; surfaced
   *                      as an explicit exception, never silently slugged to ''.
   * The guard treats a `derived-*` collision identically to a 'frontmatter' one.
   */
  idSource: 'frontmatter' | 'derived-name' | 'derived-h1' | 'none';
}

/**
 * Kebab-slug a title to an `id` (Spec 119-A Component 1):
 *   - lowercase
 *   - spaces and underscores → `-`
 *   - strip every character not in `[a-z0-9-]`
 *   - collapse runs of `-` to a single `-`
 *   - trim leading/trailing `-`
 *
 * Examples:
 *   "Token Governance"                                   → "token-governance"
 *   "Cross-Platform vs Platform-Specific Decision …"     → "cross-platform-vs-platform-specific-decision-…"
 *   "AI_Collaboration  Principles"                       → "ai-collaboration-principles"
 */
export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[\s_]+/g, '-')      // spaces/underscores → '-'
    .replace(/[^a-z0-9-]/g, '')   // strip non-[a-z0-9-]
    .replace(/-+/g, '-')          // collapse repeated '-'
    .replace(/^-+|-+$/g, '');     // trim leading/trailing '-'
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

  const h1 = extractFirstH1(content);
  const title = fm.name || h1;
  const description = fm.description || undefined;
  const aliases = fm.aliases
    ? fm.aliases.split(',').map((s) => s.trim()).filter(Boolean)
    : undefined;

  // id resolution (Spec 119-A Req 2 AC9): explicit `id:` → slug of `name:` →
  // slug of H1 → none. A derived slug that collapses to empty (e.g. a title of
  // only punctuation) is treated as no usable id, not as id ''.
  let id: string | undefined;
  let idSource: FrontmatterInfo['idSource'];
  const explicitId = fm.id ? fm.id.trim() : '';
  if (explicitId) {
    id = explicitId;
    idSource = 'frontmatter';
  } else if (fm.name && slugifyTitle(fm.name)) {
    id = slugifyTitle(fm.name);
    idSource = 'derived-name';
  } else if (h1 && slugifyTitle(h1)) {
    id = slugifyTitle(h1);
    idSource = 'derived-h1';
  } else {
    id = undefined;
    idSource = 'none';
  }

  return {
    title: title || undefined,
    description,
    aliases: aliases && aliases.length > 0 ? aliases : undefined,
    viability: {
      placeholder: derivePlaceholder(content, fm),
      deprecated: deriveDeprecated(content, fm),
    },
    id,
    idSource,
  };
}
