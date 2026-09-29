/**
 * The survivor-sourced check (Spec 123 Task 15.3; Task 15's criterion "Under the consumer profile,
 * nothing renders that no surviving member sourced", amendment 2026-09-29). A test helper, reused
 * at 15.4 over the real profile.
 *
 * Every span of a consumer artifact must source ONE of:
 *   - a surviving row: a body unit, a frontmatter LEAF or a shared-catalog member whose row is
 *     `retained` or `re-pointed` (keys are CANONICAL — spans carry the canonical origin, 10.S);
 *   - a document-level glue piece (`GLUE_SOURCES`: the frontmatter fence, the generated banner,
 *     `WORKFLOW_RULES`, the Kiro config, an identity member's fresh frontmatter);
 *   - a CONTAINER (a list / map entry — section headers and glue, and the two member-gated glue
 *     pieces: the lane-2 ambient header and the shared-catalog Commands section) with at least one
 *     surviving MEMBER SPAN under it in the same artifact.
 * Two containers render their members as ONE block, so no member span exists to point at: CC's
 * `skills` (the single `Skill` tool line) and `ambient.groundTruthManifest` (one rendered
 * paragraph). For those, at least one member ROW under the node must survive — recorded as the
 * check's stated limit, not a pass by default.
 *
 * WHAT THIS DOES NOT ESTABLISH: that a surviving row is RIGHT (the signers'); anything about the
 * Kiro JSON config's contents (one glue span — asserted per resource entry separately).
 */
import type { AttributionManifest } from '../attribution';
import type { EntryTree } from '../partition';
import { GLUE_SOURCES, SHARED_CATALOG_SOURCE, type DispositionRow } from '../spans';

export interface SurvivorCharter {
  /** The canonical entry tree (empty for an identity doc). */
  tree?: EntryTree;
  body?: Readonly<Record<string, DispositionRow>>;
  frontmatter?: Readonly<Record<string, DispositionRow>>;
}

export interface SurvivorProfile {
  /** Canonical source path → its tree and rows. */
  sources: Readonly<Record<string, SurvivorCharter>>;
  /** Shared-catalog member rows. */
  shared?: Readonly<Record<string, DispositionRow>>;
}

export interface Artifact {
  path: string;
  attribution?: AttributionManifest;
}

const DOCUMENT_GLUE = new Set<string>([
  GLUE_SOURCES['frontmatter-fence'],
  GLUE_SOURCES['generated-banner'],
  GLUE_SOURCES['workflow-rules'],
  GLUE_SOURCES['kiro-config'],
  GLUE_SOURCES['identity-frontmatter'],
]);
/** Block containers: their members render as one piece (see the header). */
export const BLOCK_CONTAINERS: readonly string[] = Object.freeze(['skills', 'ambient.groundTruthManifest']);

const survives = (row: DispositionRow | undefined): boolean => row?.disposition === 'retained' || row?.disposition === 're-pointed';

function leavesUnder(tree: EntryTree, path: string): string[] {
  const node = tree.get(path);
  if (!node) return [];
  if (node.kind === 'leaf') return [path];
  return node.children.flatMap((c) => leavesUnder(tree, c));
}

/** Every span that no surviving member sourced, as `<artifact>: <source> — <why>`. */
export function survivorViolations(artifacts: readonly Artifact[], profile: SurvivorProfile): string[] {
  const out: string[] = [];
  for (const a of artifacts) {
    const spans = a.attribution?.spans ?? [];
    const sources = new Set(spans.map((s) => s.source));
    const bad = (source: string, why: string): void => {
      out.push(`${a.path}: ${source} — ${why}`);
    };
    for (const { source } of spans) {
      if (DOCUMENT_GLUE.has(source)) continue;
      if (source === GLUE_SOURCES['ambient-lane2-header']) {
        if (![...sources].some((s) => /#frontmatter:ambient\[[^\]]*#/.test(s))) bad(source, 'the ambient header has no surviving section span');
        continue;
      }
      if (source === GLUE_SOURCES['shared-catalog-section']) {
        if (![...sources].some((s) => s.startsWith(`${SHARED_CATALOG_SOURCE}#`) || s.includes('#frontmatter:commands['))) bad(source, 'the Commands section has no surviving member span');
        continue;
      }
      if (source.startsWith(`${SHARED_CATALOG_SOURCE}#`)) {
        if (!survives(profile.shared?.[source.slice(SHARED_CATALOG_SOURCE.length + 1)])) bad(source, 'shared member without a surviving row');
        continue;
      }
      const at = source.indexOf('#');
      const file = at < 0 ? source : source.slice(0, at);
      const charter = profile.sources[file];
      if (at < 0 || !charter) {
        bad(source, 'not a known canonical source or glue');
        continue;
      }
      const frag = source.slice(at + 1);
      if (!frag.startsWith('frontmatter:')) {
        if (!survives(charter.body?.[`#${frag}`])) bad(source, 'body unit without a surviving row');
        continue;
      }
      const entry = frag.slice('frontmatter:'.length);
      const node = charter.tree?.get(entry);
      if (!node || !charter.tree) {
        bad(source, 'names no canonical entry');
        continue;
      }
      if (node.kind === 'leaf') {
        if (!survives(charter.frontmatter?.[entry])) bad(source, 'frontmatter leaf without a surviving row');
        continue;
      }
      const leaves = leavesUnder(charter.tree, entry);
      if (BLOCK_CONTAINERS.includes(entry)) {
        if (!leaves.some((l) => survives(charter.frontmatter?.[l]))) bad(source, 'block container with no surviving member row');
        continue;
      }
      if (!leaves.some((l) => sources.has(`${file}#frontmatter:${l}`))) bad(source, 'container with no surviving member span in this artifact');
    }
  }
  return out;
}
