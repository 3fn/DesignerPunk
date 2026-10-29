/**
 * The per-target semantics-guard fixture (Spec 123 Task 14.2) — loader. Format: README.md here.
 *
 * An agent-shaped charter (`semguard`) whose body is a FROZEN copy of three units of
 * `canonical/agents/stacy.md` (the claims-audit parent preamble, the trigger set, and S — the
 * owed-set query) as it stood at `FROZEN_FROM.commit`, held by hash and never re-copied when the
 * charter moves (RS-53), with a committed consumer profile: every unit and leaf an explicit row,
 * and three in-place re-pointings carried by a `## @unit` / `## @entry` overlay (the `## @entry`
 * bodies are YAML VALUES since Task 15.3 — the 15.0 criterion (b) erratum of 2026-09-29):
 *   E     — S, re-grounded by G1's committed E rendering (zero-verbatim, 10.S Constraint 3);
 *   E-fm  — `writeScope[.kiro/specs/**]`;
 *   extra — `commands[claims-pass]` (disclosed extra evidence).
 */
import * as fs from 'fs';
import * as path from 'path';
import type { AdapterContext } from '../../adapters/index';
import { splitFrontmatter, type YamlDoc } from '../../frontmatter';
import { entryTree, partition } from '../../partition';
import type { ResolvedAgent } from '../../pipeline';
import { derive, type RowFile } from '../../derive';
import { loadDispositions, type DispositionsFile } from '../../regrounding/dispositions';
import { derivedEntryValues } from '../../regrounding/derivation';
import { parseOverlay, toSpanOverlay, type ParsedOverlay } from '../../regrounding/overlay';
import type { AgentFrontmatter, CanonicalAgentDoc } from '../../schema';
import type { Dispositions, Overlay } from '../../spans';

export const SEMGUARD_ROOT = __dirname;
export const SOURCE = 'canonical/agents/semguard.md';
export const DISPOSITIONS_FILE = 'canonical/profiles/consumer/semguard.dispositions.yaml';
export const OVERLAY_FILE = 'canonical/profiles/consumer/semguard.overlay.md';

/** The three re-pointings, each in place. */
export const S = '#the-owed-set-query-your-command-catalogs-owed-set-entry-the-committed-script';
export const E_FM = 'writeScope[.kiro/specs/**]';
export const EXTRA = 'commands[claims-pass]';

/** The fixture's own title line; it rides forward into the first unit (C13). */
export const TITLE = '# Semguard\n\n';

/**
 * THE FROZEN COPY (RS-53, 2026-10-29). The three body units are `canonical/agents/stacy.md`'s
 * units of the same anchors at `commit` (blob `blob`), byte for byte; `units` is each unit's
 * `hashText` there (the first without `TITLE`). The fixture is a fixed input for the per-target
 * guard: an edit to the live charter owes nothing here. Check the provenance by hand with
 * `git show <commit>:canonical/agents/stacy.md` through `partition()`. A deliberate refresh is
 * the fixture owner's act (README § "Refreshing the copy").
 */
export const FROZEN_FROM = {
  source: 'canonical/agents/stacy.md',
  commit: '6f23bc6fe52edeebde3adedebdf30af2b184febf',
  blob: '8ccc09d0e0dafe735a0c2b5317db225fc4770e41',
  units: [
    ['#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble', 'sha256:b9f4104614bde7bf3dcf7fc95a316fa126266e2816cc636ddabc2a555d94ffb1'],
    ['#the-trigger-set-the-114-superset-table-names-never-numbers', 'sha256:ffc489a33dd65f3da04df8d79ac6d72ec09cd2d4b427ffd09eb434be15f496ce'],
    [S, 'sha256:fcf52f052773d8f801d52ae79152e04e167d892cb2d568b549429486b1da75bf'],
  ] as const,
};

const read = (rel: string): string => fs.readFileSync(path.join(SEMGUARD_ROOT, rel), 'utf8');

export function loadSemguard() {
  const text = read(SOURCE);
  const { frontmatter, body } = splitFrontmatter(text, SOURCE);
  const dispositionsFile: DispositionsFile = loadDispositions(read(DISPOSITIONS_FILE), DISPOSITIONS_FILE, { entries: entryTree(frontmatter) });
  const parsedOverlay: ParsedOverlay = parseOverlay(read(OVERLAY_FILE), OVERLAY_FILE);
  const dispositions: Dispositions = { body: dispositionsFile.body, frontmatter: dispositionsFile.frontmatter } as Dispositions;
  const overlay: Overlay = toSpanOverlay(parsedOverlay);
  // Under the consumer profile the adapters render derive()'s frontmatter (Task 15.3): the
  // re-pointed entries carry their overlay VALUES; `entryOrigin` maps derived paths to canonical.
  const derived = derive({ source: SOURCE, frontmatter, body, dispositions: dispositionsFile as unknown as RowFile & Dispositions, overlay: parsedOverlay, dispositionsFile: DISPOSITIONS_FILE });
  const fm = derived.frontmatter as unknown as AgentFrontmatter;
  const doc: CanonicalAgentDoc = { frontmatter: fm, body, sourcePath: SOURCE };
  const resolved = {
    agent: fm.agent,
    doc,
    resolutions: [],
    unresolved: [],
    ambientManifests: {
      cc: { agent: fm.agent, target: 'cc', members: [] },
      kiro: { agent: fm.agent, target: 'kiro', members: [] },
    },
  } as unknown as ResolvedAgent;
  return {
    frontmatter: frontmatter as YamlDoc,
    body,
    trees: { body: partition(body), entry: entryTree(frontmatter) },
    dispositionsFile,
    parsedOverlay,
    dispositions,
    overlay,
    /** The consumer rendering's input: the DERIVED frontmatter with the canonical body. */
    resolved,
    entryOrigin: derived.entryOrigin,
    /** R2's lookup (Task 29.2): canonical entry path → derive()'s value there. */
    derivedValue: derivedEntryValues(derived.frontmatter as YamlDoc, derived.entryOrigin),
  };
}

/** A consumer-profile AdapterContext carrying semguard's profile (Task 15.0's `consumer` inputs). */
export function semguardContext(base: AdapterContext, fixture = loadSemguard()): AdapterContext {
  return {
    ...base,
    profile: 'consumer',
    consumer: { dispositions: { semguard: fixture.dispositions }, overlays: { semguard: fixture.overlay }, entryOrigins: { semguard: fixture.entryOrigin } },
  };
}
