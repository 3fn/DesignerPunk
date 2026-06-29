/**
 * Legacy-Path Forwarding Manifest — Producer core (Spec 119-A, Task 3.1).
 *
 * Builds the build-time-generated, transition-only `LegacyPathManifest` that
 * seeds `DocumentIndexer.legacyPathIndex` (Task 2.3). Keyed on the ORIGINAL
 * pre-rename, pre-relocation `.kiro/steering/…` strings (Req 2 AC3), each paired
 * to its target doc's stable `id`.
 *
 * Owner: Thurgood / Docs-MCP infra (same owner as the resolver — this produces
 * the resolver's seed data).
 *
 * TWO INPUTS (design § Data Models → "Producer"):
 *   1. The `.kiro/steering/…md` refs GREP-EXTRACTED from the 8 `*-prompt.md`
 *      files — the live current pre-rename forms (whatever the live grep yields
 *      at freeze time; the keyspace is NOT hardcoded to the spec's recorded 60).
 *   2. The literal Req-3 rename map (the 10 space-bearing filenames → kebab
 *      targets) so each ORIGINAL space-bearing `.kiro/steering/…` string is a key
 *      too (those undergo rename AND relocation — Task 1 finding #2).
 *
 * Each row resolves to the target doc's `id` by REUSING the same derivation the
 * resolver uses: `extractFrontmatterInfo` (explicit `id:` → slug of `name:` →
 * slug of H1). It does NOT reinvent slug derivation.
 *
 * INVARIANTS asserted by the producer:
 *   - Every emitted `legacyPath` is `..`-free (the guard-ordering invariant the
 *     resolver relies on; `validatePath` rejects `..` before `resolveRef` runs).
 *     The producer THROWS if any key contains `..`.
 *   - Entries are de-duped on `legacyPath` (the same doc may be referenced by
 *     multiple prompts; the 2 overlap docs appear in both inputs).
 *
 * SKIPPED (reported, not emitted): a prompt ref whose target is a template
 * placeholder (`.kiro/steering/Component-Family-{Name}.md`,
 * `Token-Family-{Name}.md`, …) or otherwise resolves to no real on-disk doc —
 * there is no `id` to forward to. Emitting a bogus id would seed a dangling
 * legacyPathIndex entry.
 */

import * as fs from 'fs';
import * as path from 'path';
import { extractFrontmatterInfo } from '../indexer/frontmatter-parser';
import { LegacyPathManifest } from '../models';

/** The 8 agent prompt files whose `.kiro/steering/…md` refs seed the manifest. */
export const PROMPT_FILES = [
  'ada-prompt.md',
  'data-prompt.md',
  'kenya-prompt.md',
  'leonardo-prompt.md',
  'lina-prompt.md',
  'sparky-prompt.md',
  'stacy-prompt.md',
  'thurgood-prompt.md',
] as const;

/**
 * The literal Req-3 rename map (requirements.md Req 3 AC2). The 10 space-bearing
 * files each undergo rename AND relocation, so their ORIGINAL pre-rename
 * `.kiro/steering/<name with spaces>.md` string must be a manifest key — even
 * the ones that are identity docs and never get referenced by a prompt.
 *
 * Value is the kebab target FILENAME (informational here; the manifest forwards
 * to the doc's `id`, derived from the file's frontmatter, not to the new path).
 */
export const REQ3_RENAME_MAP: Record<string, string> = {
  '00-Steering Documentation Directional Priorities.md':
    '00-steering-documentation-directional-priorities.md',
  'A Vision of the Future.md': 'a-vision-of-the-future.md',
  'Browser Distribution Guide.md': 'browser-distribution-guide.md',
  'Completion Documentation Guide.md': 'completion-documentation-guide.md',
  'Core Goals.md': 'core-goals.md',
  'Cross-Platform vs Platform-Specific Decision Framework.md':
    'cross-platform-vs-platform-specific-decision-framework.md',
  'Personal Note.md': 'personal-note.md',
  'Release Management System.md': 'release-management-system.md',
  'Start Up Tasks.md': 'start-up-tasks.md',
  'Technology Stack.md': 'technology-stack.md',
};

export interface ManifestBuildResult {
  manifest: LegacyPathManifest;
  /** Distinct `.kiro/steering/…md` refs grep-extracted from the prompts (the LIVE count). */
  promptRefCount: number;
  /** Per-prompt extracted-ref counts (for the completion record). */
  perPrompt: Record<string, number>;
  /** Refs that resolved to no real on-disk doc (template placeholders, missing files). */
  skipped: Array<{ legacyPath: string; reason: string }>;
}

/**
 * Spaces-tolerant extraction of `.kiro/steering/…md` refs from one prompt's text.
 *
 * Refs in the prompts appear inside string-literal delimiters — `path: "…"`,
 * inline-code backticks, or markdown link parens — so a ref runs from
 * `.kiro/steering/` up to the next delimiter (`"`, backtick, `)`, `<`, `>`,
 * newline) and must end in `.md`. The space-bearing filenames
 * (`Cross-Platform vs Platform-Specific Decision Framework.md`) are captured
 * WHOLE because the closing quote/backtick — not the space — bounds them.
 *
 * Bare-directory mentions (`.kiro/steering/` with no `…md`) are intentionally
 * excluded (they have no target doc).
 */
export function extractSteeringRefs(promptText: string): string[] {
  const refs: string[] = [];
  const re = /\.kiro\/steering\/([^"`)\n<>]*?\.md)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(promptText)) !== null) {
    refs.push(`.kiro/steering/${m[1]}`);
  }
  return refs;
}

/** True iff the basename of a `.kiro/steering/…md` ref is a template placeholder. */
function isTemplatePlaceholder(ref: string): boolean {
  return /[{}]/.test(ref);
}

/**
 * Derive a doc's stable `id` from its on-disk frontmatter, reusing the resolver's
 * derivation exactly (`extractFrontmatterInfo`). Returns `undefined` when the file
 * does not exist or has no derivable id.
 */
function deriveIdForPath(steeringRoot: string, ref: string): string | undefined {
  // ref is ".kiro/steering/<basename>"; read the file from the steering root.
  const basename = ref.replace(/^\.kiro\/steering\//, '');
  const abs = path.join(steeringRoot, basename);
  if (!fs.existsSync(abs)) return undefined;
  const content = fs.readFileSync(abs, 'utf-8');
  const fm = extractFrontmatterInfo(content);
  return fm.id;
}

/**
 * Build the legacy-path manifest from the live tree.
 *
 * @param projectRoot   repo root (contains `.kiro/`)
 * @param steeringRoot  the directory the pre-rename/pre-relocation docs live in
 *                      (defaults to `<projectRoot>/.kiro/steering`)
 * @param now           injectable clock for deterministic tests
 */
export function buildLegacyPathManifest(
  projectRoot: string,
  steeringRoot: string = path.join(projectRoot, '.kiro', 'steering'),
  now: () => string = () => new Date().toISOString(),
): ManifestBuildResult {
  const promptsDir = path.join(projectRoot, '.kiro', 'agents');

  // --- Input 1: grep-extract refs from the 8 prompts -----------------------
  const perPrompt: Record<string, number> = {};
  const promptRefSet = new Set<string>();
  for (const file of PROMPT_FILES) {
    const p = path.join(promptsDir, file);
    if (!fs.existsSync(p)) {
      perPrompt[file] = 0;
      continue;
    }
    const refs = extractSteeringRefs(fs.readFileSync(p, 'utf-8'));
    perPrompt[file] = refs.length;
    for (const r of refs) promptRefSet.add(r);
  }

  // --- Input 2: the literal Req-3 rename set (original space-bearing keys) --
  // Each maps to a `.kiro/steering/<original spacey name>.md` legacy key.
  const renameKeys = Object.keys(REQ3_RENAME_MAP).map((name) => `.kiro/steering/${name}`);

  // --- Resolve every candidate key to its target id, de-duped on legacyPath -
  const byLegacyPath = new Map<string, string>(); // legacyPath → id
  const skipped: Array<{ legacyPath: string; reason: string }> = [];

  const consider = (ref: string) => {
    if (byLegacyPath.has(ref)) return; // already resolved (de-dupe)
    if (isTemplatePlaceholder(ref)) {
      skipped.push({ legacyPath: ref, reason: 'template-placeholder (no target doc)' });
      return;
    }
    const id = deriveIdForPath(steeringRoot, ref);
    if (!id) {
      skipped.push({ legacyPath: ref, reason: 'no on-disk doc / no derivable id' });
      return;
    }
    byLegacyPath.set(ref, id);
  };

  // Prompt refs first (sorted for stable output), then the rename keys.
  for (const ref of Array.from(promptRefSet).sort()) consider(ref);
  for (const ref of renameKeys.sort()) consider(ref);

  // --- `..`-free assertion (guard-ordering invariant) ----------------------
  for (const legacyPath of byLegacyPath.keys()) {
    if (legacyPath.includes('..')) {
      throw new Error(
        `Legacy-path manifest producer: emitted legacyPath contains '..' — ` +
        `violates the guard-ordering invariant (validatePath rejects '..' before ` +
        `resolveRef): ${legacyPath}`,
      );
    }
  }

  const entries = Array.from(byLegacyPath.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([legacyPath, id]) => ({ legacyPath, id }));

  const manifest: LegacyPathManifest = {
    generatedAt: now(),
    transitionOnly: true,
    entries,
  };

  return {
    manifest,
    promptRefCount: promptRefSet.size,
    perPrompt,
    skipped,
  };
}
