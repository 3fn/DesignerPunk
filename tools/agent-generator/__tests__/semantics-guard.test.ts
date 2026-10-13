/**
 * semantics-guard.test.ts — Spec 123 Task 14.3 (body) and 14.4 (frontmatter): THE PER-TARGET GUARD
 * (design C15, DD7; Req 10.S input 21). The arbiter for Task 10's consolidation claim: every body
 * and frontmatter span an adapter emits routes through `emitSpans` (C14).
 *
 * ONE FILE, one block per target, the targets read from `canonical/consumer-profile.yaml`
 * (`loadConsumerProfile` — C12's single declared list) and built through the adapter REGISTRY
 * (`adaptersFor`, Task 15.0). Test ids: `semantics-guard.test.ts › <target> › …`. No second target
 * list exists here: a declared target with no registered adapter fails loud (the registry throws).
 * The fake-third-target block at the end declares a third target and injects its adapter through
 * the registry's `extra` — the guard code is the same function, unedited.
 *
 * WHAT EACH BLOCK DOES: renders the `semguard` fixture (Task 14.2 — E on S, re-grounded in place)
 * through that target's `emitAgent` under the CONSUMER profile, reads the prose artifact's
 * attribution, and runs 11.4 ALONE (Req 10.8a Constraint 2) — the verdict VALUE is asserted, not
 * merely red. In isolation from C6 (Req 10.8c): outputs stay in memory; nothing observes the
 * diff-guard.
 *
 * THE BITE (DD7, S-D-B4): restore one adapter's pre-123 inline body emission (a single
 * `#body` span, `90fb0e71`) → that target's block turns RED with `FAIL_NO_DERIVATION` and the
 * other target's stays GREEN; the symmetric mutation the other way. Logs committed under
 * `tools/agent-generator/__fixtures__/semantics-guard/__bites__/` (the repo's `__bites__` convention).
 */
import * as path from 'path';
import { adaptersFor, type AdapterContext, type AdapterFactory, type FieldDispositionTable, type TargetAdapter } from '../adapters/index';
import { CcAdapter } from '../adapters/cc';
import { loadConsumerProfile } from '../consumer-profile';
import { checkDerivation, renderedSpans, type DerivationVerdict } from '../regrounding/derivation';
import { KiroAdapter } from '../adapters/kiro';
import { entryTree } from '../partition';
import type { YamlDoc } from '../frontmatter';
import type { AttributionManifest } from '../attribution';
import { E_FM, EXTRA, loadSemguard, S, semguardContext, SOURCE } from '../__fixtures__/semantics-guard';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const FIELD_DISPOSITIONS: FieldDispositionTable = { configFields: [], runtimeToolRefs: [] };
const fixture = loadSemguard();

const BASE_CTX = {
  workflowRules: [],
  skillsMap: { rows: [] },
  alwaysSet: [],
  dispositions: FIELD_DISPOSITIONS,
  sharedCatalog: [],
  repoRoot: REPO_ROOT,
  embeds: {},
  docIdToPath: {},
  steeringIdToPath: {},
} as unknown as AdapterContext;
const CTX = semguardContext(BASE_CTX, fixture);

/** The prose artifact a target emits for the agent (CC: the agent file; Kiro: the prompt). */
function prose(adapter: TargetAdapter): { content: string; attribution: AttributionManifest } {
  const file = adapter.emitAgent(fixture.resolved, CTX).find((f) => f.path.endsWith('.md') && f.attribution);
  if (!file || !file.attribution) throw new Error(`${adapter.target}: no prose artifact with attribution`);
  return { content: file.content, attribution: file.attribution };
}

/** 11.4 alone, over the adapter's own spans, for an in-place re-pointing of `s`. */
function verdictOf(adapter: TargetAdapter, s: string): DerivationVerdict {
  return checkDerivation({ file: SOURCE, trees: fixture.trees, spans: spansOf(adapter), s, destination: s, derivedValue: fixture.derivedValue }).verdict;
}

/** The adapter's own spans, each with the lines it covers in the artifact it emitted (R2, Task 29.2). */
function spansOf(adapter: TargetAdapter) {
  const p = prose(adapter);
  return renderedSpans(p.attribution.spans, p.content);
}

/** The guard blocks for a declared target list — the adapters come from the registry. */
function guardBlocks(targets: readonly string[], extra: Readonly<Record<string, AdapterFactory>> = {}): [string, TargetAdapter][] {
  const adapters = adaptersFor(targets, FIELD_DISPOSITIONS, extra);
  return targets.map((t, i) => [t, adapters[i]]);
}

/** THE GUARD — one describe block per target; the same function serves every list. */
function defineGuard(blocks: [string, TargetAdapter][]): void {
  describe.each(blocks)('%s', (target, adapter) => {
    it('body: E (S re-grounded in place) is VERIFIED over this adapter’s own spans', () => {
      // The VERDICT VALUE is the assertion (Lina R2): a bypass must read FAIL_NO_DERIVATION here.
      expect(`${target} body ${S}: ${verdictOf(adapter, S)}`).toBe(`${target} body ${S}: VERIFIED`);
    });

    it('body: E’s re-grounded text is what shipped (the rendering carries the overlay, not canonical S)', () => {
      expect(prose(adapter).content).toContain((fixture.overlay.units?.[S] ?? '').split('\n')[0]);
    });

    /*
     * FRONTMATTER (Task 14.4; design C15 "E-fm"; DD7). Scope, per target: the frontmatter-derived
     * sections of the PROSE artifact (CC: the agent file; Kiro: the prompt). Since Task 29.3 the Kiro
     * JSON config carries per-entry spans too; that artifact is proven in the `kiro — 29.3` block
     * below, not here (this block reads the prose artifact only).
     */
    describe('frontmatter', () => {
      it(`E-fm: ${E_FM} (re-grounded in place) is VERIFIED over this adapter’s own spans`, () => {
        const v = checkDerivation({ file: SOURCE, trees: fixture.trees, spans: spansOf(adapter), s: `frontmatter:${E_FM}`, destination: `frontmatter:${E_FM}`, derivedValue: fixture.derivedValue }).verdict;
        expect(`${target} frontmatter ${E_FM}: ${v}`).toBe(`${target} frontmatter ${E_FM}: VERIFIED`);
      });

      it('E-fm’s re-grounded text is what shipped (not the canonical glob)', () => {
        const out = prose(adapter).content;
        expect(out).toContain((fixture.overlay.entries?.[E_FM] ?? '').trim());
        expect(out).not.toContain('`.kiro/specs/**`');
      });

      it(`EXTRA EVIDENCE (disclosed, not a substitute for E-fm): ${EXTRA} re-grounded in place is VERIFIED`, () => {
        const v = checkDerivation({ file: SOURCE, trees: fixture.trees, spans: spansOf(adapter), s: `frontmatter:${EXTRA}`, destination: `frontmatter:${EXTRA}`, derivedValue: fixture.derivedValue }).verdict;
        expect(`${target} frontmatter ${EXTRA}: ${v}`).toBe(`${target} frontmatter ${EXTRA}: VERIFIED`);
      });
    });
  });
}

const PROFILE_TARGETS = loadConsumerProfile(REPO_ROOT).targets;

defineGuard(guardBlocks(PROFILE_TARGETS));

describe('a fake third target — declared, its adapter injected through the registry, no other edit to the guard', () => {
  /** A third target that routes exactly as CC does (it IS the CC adapter under another name). */
  class FakeAdapter extends CcAdapter {
    override readonly target = 'fake' as unknown as 'cc';
  }
  const FAKE: Readonly<Record<string, AdapterFactory>> = { fake: (d) => new FakeAdapter(d) };
  const blocks = guardBlocks([...PROFILE_TARGETS, 'fake'], FAKE);

  it('the declared list drives the blocks: one more target → one more block', () => {
    expect(blocks.map(([t]) => t)).toEqual([...PROFILE_TARGETS, 'fake']);
  });

  it('a declared target with no registered adapter fails loud, naming it (no silent block)', () => {
    expect(() => guardBlocks([...PROFILE_TARGETS, 'ghost'])).toThrow('no adapter is registered for declared target "ghost"');
  });

  defineGuard(blocks);
});

/*
 * Task 29.2 (ruling R2; G2-F3, MP-1): attack (a) AS EACH ADAPTER EMITS IT. S stays re-pointed with
 * its overlay emptied; every declared target's own prose artifact carries the one blank line
 * attributed to S, and the check rejects it by clause (1).
 */
describe.each(guardBlocks(PROFILE_TARGETS))('%s — attack (a) as emitted (29.2)', (target, adapter) => {
  const emptied = { ...fixture, overlay: { ...fixture.overlay, units: { ...fixture.overlay.units, [S]: '' } } };
  const ctx = semguardContext(BASE_CTX, emptied);
  const file = adapter.emitAgent(fixture.resolved, ctx).find((f) => f.path.endsWith('.md') && f.attribution);
  const spans = file && file.attribution ? renderedSpans(file.attribution.spans, file.content) : [];

  it('the emitted rendering carries exactly one blank line attributed to S', () => {
    expect(spans.filter((sp) => sp.source === `${SOURCE}${S}`).map((sp) => sp.text)).toEqual(['\n']);
  });

  it('A1 (sibling destination) and A4 (destination S) → FAIL_NO_DERIVATION', () => {
    const v = (destination: string) => checkDerivation({ file: SOURCE, trees: fixture.trees, spans, s: S, destination, derivedValue: fixture.derivedValue }).verdict;
    const T = '#the-trigger-set-the-114-superset-table-names-never-numbers';
    expect(`${target}: A1 ${v(T)}, A4 ${v(S)}`).toBe(`${target}: A1 FAIL_NO_DERIVATION, A4 FAIL_NO_DERIVATION`);
  });
});

/*
 * Task 29.3 (G2-F2; C7 as amended 2026-10-12 by Peter's ruling (A)): the Kiro target's two
 * frontmatter surfaces, each judged ALONE. (1) The JSON config carries per-entry spans, so a row it
 * renders (`writeScope[…]` → `allowedPaths`, `description`) derives from the JSON by itself.
 * (2) A GLOB-ONLY knowledge base renders as a prompt fallback note with a per-member span. The
 * fixture adds one glob-only knowledge base to semguard IN MEMORY (canonical frontmatter, derived
 * frontmatter and a retained row), so the committed fixture files are unchanged.
 */
describe('kiro — 29.3: the JSON config and the knowledge note derive their rows', () => {
  const KB = { name: 'specs-kb', globs: ['specs/**'] };
  const kbPath = 'knowledgeBases[specs-kb]';
  const derivedFm = { ...(fixture.resolved.doc.frontmatter as object), knowledgeBases: [KB] };
  const resolved = { ...fixture.resolved, doc: { ...fixture.resolved.doc, frontmatter: derivedFm } } as typeof fixture.resolved;
  const dispositions = { ...fixture.dispositions, frontmatter: { ...fixture.dispositions.frontmatter, [kbPath]: { disposition: 'retained' as const } } };
  const ctx = semguardContext(BASE_CTX, { ...fixture, dispositions });
  const trees = { body: fixture.trees.body, entry: entryTree({ ...fixture.frontmatter, knowledgeBases: [KB] } as YamlDoc) };
  const derivedValue = (p: string) => (p === kbPath ? KB : fixture.derivedValue(p));
  const files = new KiroAdapter(FIELD_DISPOSITIONS).emitAgent(resolved, ctx);
  const spansOfFile = (suffix: string) => {
    const f = files.find((x) => x.path.endsWith(suffix) && x.attribution);
    if (!f || !f.attribution) throw new Error(`kiro: no ${suffix}`);
    return renderedSpans(f.attribution.spans, f.content);
  };
  const v = (spans: ReturnType<typeof spansOfFile>, entry: string) =>
    checkDerivation({ file: SOURCE, trees, spans, s: `frontmatter:${entry}`, destination: `frontmatter:${entry}`, derivedValue }).verdict;

  it(`the JSON ALONE derives E-fm (${E_FM}, rendered into allowedPaths) and description`, () => {
    const json = spansOfFile('semguard.json');
    expect(`kiro json: ${E_FM} ${v(json, E_FM)}, description ${v(json, 'description')}`).toBe(`kiro json: ${E_FM} VERIFIED, description VERIFIED`);
  });

  it(`the prompt ALONE derives the glob-only knowledge base (${kbPath}) through its fallback note`, () => {
    expect(`kiro prompt: ${kbPath} ${v(spansOfFile('semguard-prompt.md'), kbPath)}`).toBe(`kiro prompt: ${kbPath} VERIFIED`);
  });
});
