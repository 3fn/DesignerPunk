/**
 * The 11.4 derivation checker — Spec 123 Task 14.1 (Req 11.4; design C15; Stacy S-D-B4).
 *
 * THE CRITERION (Req 11.4, verbatim in substance): a `re-pointed` disposition on canonical
 * section S verifies IF AND ONLY IF both hold —
 *   (1) DERIVATION: at least one span in the consumer rendering declares S, or a sub-range of S,
 *       as its `source`;
 *   (2) HONEST NAMING: the destination named in the disposition is among the spans satisfying (1).
 *   Zero spans sourcing S ⇒ FAILURE, not a routed review.
 *
 * CONTAINMENT, PINNED (Stacy, R4): "a sub-range of S" means CONTAINED IN S — the span's source
 * EQUALS S or is a DESCENDANT of S in the partition tree. Ancestor (super-range) and sibling spans
 * do NOT satisfy DERIVATION. It is resolved STRUCTURALLY against the tree, NEVER by anchor-string
 * prefix: sibling anchors can share prefixes, and the `#<parent>:preamble` form makes the prefix
 * implementation especially tempting. Every containment test here is
 * `tree.isDescendantOrSelf(x, S)`; no string comparison of anchors decides containment.
 *
 * WIDER DOMAIN (C15): S and the destination may be a BODY unit (`#<anchor>`, the body partition
 * tree) or a FRONTMATTER entry (`frontmatter:<path>`, the entry tree). A span sources into exactly
 * one tree — `<file>#<anchor>` into the body tree, `<file>#frontmatter:<path>` into the entry tree —
 * and containment is only ever asked WITHIN one tree. Cross-tree never matches.
 *
 * HONEST NAMING IS IDENTITY, NOT CONTAINMENT (G2 spec-text ruling R1, 2026-10-12;
 * `.kiro/specs/123-consumer-distribution/g2-spec-text-ruling.md`; design C15 erratum): clause (2)
 * holds iff the destination is IDENTICAL to the source reference of at least one span in D —
 * mutual `isDescendantOrSelf` in one tree, which holds only for the same node ({@link sameNode}).
 * An ancestor of S does not satisfy it (attack (f), G2-F1); a sibling does not; no one-way
 * containment does. Until Spec 123 Task 29.1 the check read clause (2) as "a span in D lies within
 * the destination", which accepted every ancestor of S.
 *
 * THE SHARED-CATALOG MEMBER SPACE (ruling R1): a disposition row on the shared catalog
 * (`canonical/shared/shared-catalog.yaml`, `_shared.dispositions.yaml` `members:`) names a member
 * id. Members are flat, so D is the spans sourcing `canonical/shared/shared-catalog.yaml#<id>` and
 * identity is id equality.
 *
 * AN EMPTY SPAN DERIVES NOTHING (G2 spec-text ruling R2, 2026-10-12; G2-F3): Req 11.4 (1) asks
 * that something in the shipped charter demonstrably DERIVES from S, so D excludes
 *   - a BODY span whose rendered text over its line range is empty after `String.prototype.trim()`
 *     ("whitespace" is exactly the set `trim()` removes; a zero-width space, an HTML comment or
 *     punctuation alone is TEXT);
 *   - a FRONTMATTER span whose entry's DERIVED VALUE (`derive()`'s YAML value at the entry's
 *     canonical path) is `null`, an empty list, or a string empty after `trim()`. The test is on
 *     the value, never on the rendered text (an adapter's rendering of an emptied value still
 *     carries markup); a map that keeps any member is not empty (no per-field rule — derive()
 *     validates at class level).
 * An emptied re-pointed overlay renders one blank line attributed to S (`emitSpans`), so before
 * Task 29.2 clause (1) could never fail on the re-pointed lane. The rule lives HERE, not in
 * `emitSpans`: emitSpans never sees frontmatter values, and dropping the blank line's span there
 * would break P2 attribution totality (ruling R2). Hence the input carries each span's RENDERED
 * TEXT ({@link RenderedSpan}) and a derived-value lookup; a frontmatter span with no lookup
 * supplied is NOT in D (fail-closed: the check never assumes a value it was not shown).
 * SHARED-SUBSTRATE MEMBERS (the ruling's erratum of 2026-10-12, #310 `fbd7549a7`, pick (a)): the
 * body-unit rendered-text test applies to each member span in D; no per-field rule. Both adapters
 * render a governance rule as `- ${statement ?? id}`, so an emptied member's span is `- ` and D is
 * never empty: emptied with a sibling destination → FAIL_DISHONEST_NAMING; with itself → VERIFIED
 * (a named limit).
 *
 * UNKNOWN ANCHORS ARE NON-MATCHING, NEVER AN EXCEPTION (Lina R2): `isDescendantOrSelf` returns
 * false for an id absent from the tree — e.g. a bypass's `#body` span, or an S that a rename
 * orphaned — so a red comes from DERIVATION, not from a throw. Spans from other files, generator
 * glue (`WORKFLOW_RULES`, `C1:frontmatter`, …) and profile-originated sources (`<profile>:<id>`,
 * 10.S) are likewise simply not in D.
 *
 * PROVENANCE IS GENERATOR-EMITTED, NEVER PROFILE-DECLARED: the spans are the rendering's
 * attribution (`emitSpans`, C14); the disposition supplies only S and the destination. The
 * checker reads `source` only — `op` is how the text got there (10.S) and does not decide
 * derivation.
 *
 * WHAT THIS DOES NOT ESTABLISH: that S's FUNCTION survives in the destination — that is the
 * triviality floor's and the routed judgment's (C18, Req 11.6.5e); that the spans were really
 * emitted by the adapters for every target — that is the per-target guard's (Task 14.3/14.4,
 * `semantics-guard.test.ts`); that a disposition row exists or its key is current (13.5).
 *
 * Traces to: Req 11.4, 10.G, 10.S; design C15 (and its 2026-10-12 erratum); the G2 spec-text ruling R1, R2.
 */

import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import type { AttributionSpan } from '../attribution';
import { CONSUMER_OUTPUT_ROOT, loadConsumerProfile } from '../consumer-profile';
import { derive, readConsumerSpans } from '../derive';
import { splitFrontmatter, type YamlDoc } from '../frontmatter';
import { entryTree, partition, type BodyPartition, type EntryTree } from '../partition';
import { parseOverlay } from './overlay';

export const DERIVATION_VERDICTS = Object.freeze(['VERIFIED', 'FAIL_NO_DERIVATION', 'FAIL_DISHONEST_NAMING'] as const);
export type DerivationVerdict = (typeof DERIVATION_VERDICTS)[number];

/** The prefix a disposition's destination (and a span's anchor) uses for a frontmatter entry. */
export const FRONTMATTER_PREFIX = 'frontmatter:';

/** The shared catalog's canonical path: a check over this file is decided in member-id space (ruling R1). */
export const SHARED_CATALOG_FILE = 'canonical/shared/shared-catalog.yaml';

/** A location in one of the two trees, or a shared-catalog member id (ruling R1). */
export interface TreeRef {
  tree: 'body' | 'entry' | 'member';
  /** A body anchor (`#…`), an entry path (`writeScope[src/**]`) or a member id. */
  id: string;
}

/**
 * Parse a disposition-side reference: `#<anchor>` → body; `frontmatter:<path>` → entry.
 * Anything else names nothing in either tree and is returned as an unmatchable body id (never a
 * throw), so a malformed destination fails HONEST NAMING rather than crashing the check.
 */
export function parseRef(ref: string): TreeRef {
  return ref.startsWith(FRONTMATTER_PREFIX) ? { tree: 'entry', id: ref.slice(FRONTMATTER_PREFIX.length) } : { tree: 'body', id: ref };
}

/**
 * The tree location a span sources, if it sources `file` at all: `<file>#<anchor>` → body,
 * `<file>#frontmatter:<path>` → entry. Other files, glue and profile sources → undefined.
 */
export function spanRef(source: string, file: string): TreeRef | undefined {
  const prefix = `${file}#`;
  if (!source.startsWith(prefix)) return undefined;
  const rest = source.slice(prefix.length);
  return rest.startsWith(FRONTMATTER_PREFIX) ? { tree: 'entry', id: rest.slice(FRONTMATTER_PREFIX.length) } : { tree: 'body', id: `#${rest}` };
}

export interface DerivationTrees {
  body: BodyPartition;
  /** Absent → no frontmatter entry can be contained in anything (every entry ref non-matching). */
  entry?: EntryTree;
}

/**
 * Structural containment: `x` is `s` or lies beneath it, within ONE tree. Unknown ids → false.
 * Member ids are flat: a member contains only itself.
 */
export function containedIn(x: TreeRef, s: TreeRef, trees: DerivationTrees): boolean {
  if (x.tree !== s.tree) return false;
  if (x.tree === 'member') return x.id === s.id;
  const tree = x.tree === 'body' ? trees.body : trees.entry;
  return tree ? tree.isDescendantOrSelf(x.id, s.id) : false;
}

/**
 * Identity (ruling R1): `x` and `s` are the SAME node of one tree — mutual containment, which in a
 * tree with unique ids holds only for one node. Unknown ids stay non-matching; cross-tree never
 * matches; never decided by an anchor-string comparison.
 */
export function sameNode(x: TreeRef, s: TreeRef, trees: DerivationTrees): boolean {
  return containedIn(x, s, trees) && containedIn(s, x, trees);
}

/** One attribution span with the text it covers in the rendered artifact (ruling R2's evidence). */
export interface RenderedSpan {
  source: string;
  /** The span's rendered lines, each with its newline. */
  text: string;
}

/** Attach each span's rendered lines (from its artifact's text) — the shape {@link checkDerivation} reads. */
export function renderedSpans(spans: readonly Pick<AttributionSpan, 'source' | 'lines'>[], artifactText: string): RenderedSpan[] {
  const lines = artifactText.split('\n');
  return spans.map((span) => ({ source: span.source, text: `${lines.slice(span.lines[0] - 1, span.lines[1]).join('\n')}\n` }));
}

/** R2, body and shared-member spans (erratum #310): empty after `trim()` derives nothing. */
export const isEmptyRendering = (text: string): boolean => text.trim() === '';

/** R2, frontmatter: `null`/absent, an empty list, or a string empty after `trim()` derives nothing. */
export function isEmptyEntryValue(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'string') return value.trim() === '';
  return false;
}

/**
 * The derived-value lookup R2 reads: CANONICAL entry path → `derive()`'s value there. Built from
 * the DERIVED frontmatter (what the adapters render) and `derive()`'s `entryOrigin` (derived path →
 * canonical path, for a re-pointed string member whose key is its new value). A container resolves
 * to the list of its surviving leaf values (empty list when none survive); an unknown path →
 * `undefined` (empty).
 */
export function derivedEntryValues(derivedFrontmatter: YamlDoc, entryOrigin: Readonly<Record<string, string>> = {}): (canonicalPath: string) => unknown {
  const tree = entryTree(derivedFrontmatter);
  const leaves = new Map<string, unknown>();
  for (const leaf of tree.units) leaves.set(leaf.path, leaf.value);
  const canonical = (p: string): string => entryOrigin[p] ?? p;
  const values = new Map<string, unknown>();
  for (const [p, v] of leaves) values.set(canonical(p), v);
  const under = (id: string): unknown[] => {
    const node = tree.get(id);
    if (!node) return [];
    if (leaves.has(id)) return [leaves.get(id)];
    return node.children.flatMap(under);
  };
  for (const id of tree.nodes.keys()) if (!leaves.has(id) && !values.has(canonical(id))) values.set(canonical(id), under(id));
  return (canonicalPath: string) => values.get(canonicalPath);
}

export interface DerivationInput {
  /** The canonical source path spans cite (`canonical/agents/stacy.md`). */
  file: string;
  trees: DerivationTrees;
  /** The rendering's attribution spans (generator-emitted), each with its rendered text (R2). */
  spans: readonly RenderedSpan[];
  /**
   * R2, frontmatter: the entry's derived value at a CANONICAL path ({@link derivedEntryValues}).
   * Absent → no frontmatter span is in D (fail-closed).
   */
  derivedValue?: (canonicalPath: string) => unknown;
  /** S: the re-pointed unit (`#anchor`) or entry (`frontmatter:<path>`). */
  s: string;
  /** The disposition's destination (`#anchor` or `frontmatter:<path>`). */
  destination: string;
}

export interface DerivationResult {
  verdict: DerivationVerdict;
  /** D — the sources of the spans satisfying DERIVATION, in rendering order (the evidence). */
  derived: string[];
}

/** Req 11.4 over one re-pointed disposition. */
export function checkDerivation(input: DerivationInput): DerivationResult {
  const memberSpace = input.file === SHARED_CATALOG_FILE;
  const ref = (r: string): TreeRef => (memberSpace ? { tree: 'member', id: r } : parseRef(r));
  const s = ref(input.s);
  const destination = ref(input.destination);
  const sourceRef = (source: string): TreeRef | undefined => {
    if (!memberSpace) return spanRef(source, input.file);
    const prefix = `${input.file}#`;
    return source.startsWith(prefix) ? { tree: 'member', id: source.slice(prefix.length) } : undefined;
  };
  // R2: a span that renders nothing (body, member) or whose entry's derived value is empty (frontmatter) derives nothing.
  const derives = (ref: TreeRef, text: string): boolean =>
    ref.tree === 'entry' ? input.derivedValue !== undefined && !isEmptyEntryValue(input.derivedValue(ref.id)) : !isEmptyRendering(text);
  const d = input.spans
    .map((span) => ({ source: span.source, text: span.text, ref: sourceRef(span.source) }))
    .filter((x): x is { source: string; text: string; ref: TreeRef } => x.ref !== undefined && containedIn(x.ref, s, input.trees) && derives(x.ref, x.text));
  const derived = d.map((x) => x.source);
  if (d.length === 0) return { verdict: 'FAIL_NO_DERIVATION', derived };
  // HONEST NAMING (ruling R1): the destination IS one of D's span sources — identity, never containment.
  const honest = d.some((x) => sameNode(x.ref, destination, input.trees));
  return { verdict: honest ? 'VERIFIED' : 'FAIL_DISHONEST_NAMING', derived };
}


// =================================================================================================
// THE STANDING APPLICATION (Spec 123 Task 29.4; G2-F2; ruling R3; Peter's PR-5.4): the check runs on
// the SHIPPED material — the committed consumer profile and every committed target rendering under
// `canonical/_consumer-output/` (the 16.1 parity test ties those renderings to what
// `dist/consumer-canonical` emits) — never on fixtures alone.
//
// SURFACES (R3): a body or always-set row is evaluated on `_canonical` and every declared target; a
// frontmatter row on the declared targets only (`_canonical` carries no per-entry frontmatter spans);
// the shared-catalog member row on every declared target. A surface counts only if it carries the
// row's source file (some span sources `<file>#…`).
// POOLING: per TARGET — every artifact of a target (Kiro: the prompt AND the JSON) is one pool, as
// the 29.0 sizing printed it (Stacy's attack file § 1 rule 2).
// AGGREGATION: a row is VERIFIED only if it is VERIFIED on every one of its surfaces, and it has at
// least one. The count is ROWS, never row × target.
// =================================================================================================

/** The profile directory the standing application reads. */
export const CONSUMER_PROFILE_DIR = 'canonical/profiles/consumer';

export interface ShippedRow {
  /** The dispositions file (repo-relative). */
  dispositionsFile: string;
  /** The canonical source the rows cite. */
  source: string;
  lane: 'body' | 'frontmatter' | 'members';
  key: string;
  destination: string;
  /** Verdict per surface (target root name → verdict). */
  perSurface: Record<string, DerivationVerdict>;
  /** `VERIFIED` only if every surface is; `NO_SURFACE` when no surface carries the source file. */
  verdict: DerivationVerdict | 'NO_SURFACE';
}

/** Every `*.dispositions.yaml` of the committed consumer profile (agents, `_shared`, `always-set/`), sorted. */
export function consumerDispositionsFiles(repoRoot: string): string[] {
  const out: string[] = [];
  const walk = (rel: string): void => {
    for (const e of fs.readdirSync(path.join(repoRoot, rel), { withFileTypes: true })) {
      const r = `${rel}/${e.name}`;
      if (e.isDirectory() && e.name === 'always-set') walk(r);
      else if (e.isFile() && e.name.endsWith('.dispositions.yaml')) out.push(r);
    }
  };
  walk(CONSUMER_PROFILE_DIR);
  return out.sort();
}

/** Run 11.4 over every `re-pointed` row of the committed consumer profile, on the committed renderings. */
export function checkShippedProfile(repoRoot: string): ShippedRow[] {
  const targets = loadConsumerProfile(repoRoot).targets;
  const pools = new Map<string, Map<string, { artifact: string; text: string }[]>>();
  for (const t of ['_canonical', ...targets]) pools.set(t, new Map(readConsumerSpans(repoRoot, `${CONSUMER_OUTPUT_ROOT}/${t}`) ?? []) as Map<string, { artifact: string; text: string }[]>);
  const rows: ShippedRow[] = [];
  for (const rel of consumerDispositionsFiles(repoRoot)) {
    const doc = loadYaml(fs.readFileSync(path.join(repoRoot, rel), 'utf8')) as Record<string, unknown> & { source: string };
    const source = doc.source;
    const overlayRel = rel.replace(/\.dispositions\.yaml$/, '.overlay.md');
    const overlay = fs.existsSync(path.join(repoRoot, overlayRel)) ? parseOverlay(fs.readFileSync(path.join(repoRoot, overlayRel), 'utf8'), overlayRel) : undefined;
    const isShared = source === SHARED_CATALOG_FILE;
    let trees: DerivationTrees = { body: partition('') };
    let derivedValue: ((p: string) => unknown) | undefined;
    if (!isShared) {
      const split = splitFrontmatter(fs.readFileSync(path.join(repoRoot, source), 'utf8'), source);
      const alwaysSet = doc.counterpart !== undefined;
      const frontmatter = alwaysSet ? {} : split.frontmatter;
      trees = { body: partition(split.body), entry: entryTree(frontmatter) };
      if (!alwaysSet) {
        // derive() is the refusal gate (stale pin, orphaned key, value congruence): a refusal throws here.
        const derived = derive({ source, frontmatter, body: split.body, dispositions: doc as unknown as Parameters<typeof derive>[0]["dispositions"], overlay, dispositionsFile: rel });
        derivedValue = derivedEntryValues(derived.frontmatter as YamlDoc, derived.entryOrigin);
      }
    }
    for (const lane of ['body', 'frontmatter', 'members'] as const) {
      const table = (doc[lane] ?? {}) as Record<string, { disposition?: string; destination?: string }>;
      for (const [key, row] of Object.entries(table)) {
        if (row?.disposition !== 're-pointed') continue;
        const destination = row.destination ?? '';
        const surfaces = lane === 'body' ? ['_canonical', ...targets] : [...targets];
        const prefix = `${source}#`;
        const perSurface: Record<string, DerivationVerdict> = {};
        for (const t of surfaces) {
          const pool = pools.get(t) as Map<string, { artifact: string; text: string }[]>;
          const spans: RenderedSpan[] = [];
          for (const [src, pieces] of pool) if (src.startsWith(prefix)) for (const p of pieces) spans.push({ source: src, text: p.text });
          if (spans.length === 0) continue; // this surface does not carry the source file
          const s = lane === 'frontmatter' ? `${FRONTMATTER_PREFIX}${key}` : key;
          perSurface[t] = checkDerivation({ file: source, trees, spans, s, destination, derivedValue }).verdict;
        }
        const verdicts = Object.values(perSurface);
        const verdict = verdicts.length === 0 ? 'NO_SURFACE' : verdicts.find((v) => v !== 'VERIFIED') ?? 'VERIFIED';
        rows.push({ dispositionsFile: rel, source, lane, key, destination, perSurface, verdict });
      }
    }
  }
  return rows;
}
