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
import { checkDerivation, type DerivationVerdict } from '../regrounding/derivation';
import type { AttributionManifest } from '../attribution';
import { loadSemguard, S, semguardContext, SOURCE } from '../__fixtures__/semantics-guard';

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
  return checkDerivation({ file: SOURCE, trees: fixture.trees, spans: prose(adapter).attribution.spans, s, destination: s }).verdict;
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
