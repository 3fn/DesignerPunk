/**
 * The per-target semantics-guard fixture (Spec 123 Task 14.2) — loader. Format: README.md here.
 *
 * An agent-shaped charter (`semguard`) whose body is three units copied byte-for-byte from
 * `canonical/agents/stacy.md` (the claims-audit parent preamble, the trigger set, and S — the
 * owed-set pipeline), with a committed consumer profile: every unit and leaf an explicit row,
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
import { parseOverlay, toSpanOverlay, type ParsedOverlay } from '../../regrounding/overlay';
import type { AgentFrontmatter, CanonicalAgentDoc } from '../../schema';
import type { Dispositions, Overlay } from '../../spans';

export const SEMGUARD_ROOT = __dirname;
export const SOURCE = 'canonical/agents/semguard.md';
export const DISPOSITIONS_FILE = 'canonical/profiles/consumer/semguard.dispositions.yaml';
export const OVERLAY_FILE = 'canonical/profiles/consumer/semguard.overlay.md';

/** The three re-pointings, each in place. */
export const S = '#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script';
export const E_FM = 'writeScope[.kiro/specs/**]';
export const EXTRA = 'commands[claims-pass]';

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
