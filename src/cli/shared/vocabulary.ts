/**
 * The DesignerPunk CLI lifecycle vocabulary (Spec 123 Task 16.2, new; extended
 * by Task 19).
 *
 * design.md § "C20. The consumer emission lane — shipped inputs only": `attach`
 * "is the **fifth lifecycle verb** in `vocabulary.ts`" and "**The verb never
 * appears without its object**: in help text, in the born-repo refusal, and at
 * the install doc's first use" (DD4).
 *
 * requirements.md Req 15B.5: "The vocabulary SHALL be consistent across the
 * install doc, the CLI terminal output, and the starter specs." This module is
 * the ONE source both sides assert against — the CLI's own help text (this
 * task) and, at Task 19, the install doc and the Integration Guide — so the
 * two surfaces cannot hand-drift into two different descriptions of the same
 * verb.
 *
 * Five lifecycle verbs (Req 15B.6 names three of them — `npm update`, `sync`,
 * `generate` — as the update-lifecycle trio; `init` is the birth event; `attach`
 * is the fifth, added by this spec for cross-harness and reference-only wiring):
 *   1. `init`     — the birth event, once per design system, ever.
 *   2. `generate`  — the pipeline, run on every token change.
 *   3. `sync`      — reports package updates; reports, never writes silently.
 *   4. `validate`  — validates token definitions against the active source.
 *   5. `attach`    — attach a harness (agents + MCP config + approvals), for one target.
 */

export type LifecycleVerb = 'init' | 'generate' | 'sync' | 'validate' | 'attach';

export interface LifecycleVerbEntry {
  /** The CLI subcommand name — `npx designerpunk <verb>`. */
  verb: LifecycleVerb;
  /** One-line description — the SAME sentence every surface (help text, refusals, the install doc) uses. */
  description: string;
}

/**
 * `attach`'s object (DD4, C20) — never separated from the verb. Every surface
 * that names `attach` in prose pairs it with this phrase via {@link attachUsage},
 * rather than composing its own wording, so the pairing travels with the verb
 * everywhere it appears.
 */
export const ATTACH_OBJECT = 'a harness (agents + MCP config + approvals)';

/** The paired form: `attach a harness (agents + MCP config + approvals)` — never the bare verb alone. */
export function attachUsage(): string {
  return `attach ${ATTACH_OBJECT}`;
}

/**
 * The five lifecycle verbs, in C20/Req 15B order. `attach` is the fifth,
 * added by Spec 123 — every OTHER surface naming it SHALL use
 * {@link attachUsage} rather than a hand-written paraphrase (Req 15B.5).
 */
export const LIFECYCLE_VERBS: readonly LifecycleVerbEntry[] = Object.freeze([
  { verb: 'init', description: 'the birth event — runs once per design system, ever' },
  { verb: 'generate', description: 'the pipeline — run on every token change' },
  { verb: 'sync', description: 'reports package updates against the installed package — reports, never writes silently' },
  { verb: 'validate', description: 'validates token definitions against the active source' },
  { verb: 'attach', description: `${attachUsage()}, for one target` },
]);

/** Look up one verb's canonical entry. Throws, naming the unknown verb, rather than returning `undefined` silently. */
export function lifecycleVerb(verb: LifecycleVerb): LifecycleVerbEntry {
  const found = LIFECYCLE_VERBS.find((e) => e.verb === verb);
  if (!found) {
    throw new Error(`vocabulary.ts: unknown lifecycle verb "${verb}"`);
  }
  return found;
}
