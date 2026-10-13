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
 * Traces to: Req 11.4, 10.G, 10.S; design C15 (and its 2026-10-12 erratum); the G2 spec-text ruling R1.
 */

import type { AttributionSpan } from '../attribution';
import type { BodyPartition, EntryTree } from '../partition';

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

export interface DerivationInput {
  /** The canonical source path spans cite (`canonical/agents/stacy.md`). */
  file: string;
  trees: DerivationTrees;
  /** The rendering's attribution spans (generator-emitted). */
  spans: readonly Pick<AttributionSpan, 'source'>[];
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
  const d = input.spans
    .map((span) => ({ source: span.source, ref: sourceRef(span.source) }))
    .filter((x): x is { source: string; ref: TreeRef } => x.ref !== undefined && containedIn(x.ref, s, input.trees));
  const derived = d.map((x) => x.source);
  if (d.length === 0) return { verdict: 'FAIL_NO_DERIVATION', derived };
  // HONEST NAMING (ruling R1): the destination IS one of D's span sources — identity, never containment.
  const honest = d.some((x) => sameNode(x.ref, destination, input.trees));
  return { verdict: honest ? 'VERIFIED' : 'FAIL_DISHONEST_NAMING', derived };
}
