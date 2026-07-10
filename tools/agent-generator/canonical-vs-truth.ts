#!/usr/bin/env node
/**
 * The canonical-vs-truth check (C7) — Spec 122 Task 6.3.
 *
 * design.md § "C7 — The canonical-vs-truth check": five assertion classes plus the
 * `knowledgeBases` glob-resolves assertion (D-A3), each asserting that a canonical CLAIM
 * still matches the observed TRUTH (the running corpus, the live registry, the emitted
 * grant surfaces, package.json, the filesystem). The check REPORTS; the owner RULES
 * (Req 18 AC3). Every finding names its adjudicator per the membership-vs-substance seam;
 * resolution is always a reviewable PR (fix corpus, fix canonical source, or fix the
 * predicate) — nothing here auto-resolves or is overridden verbally.
 *
 * The checker is a PURE, INJECTABLE function ({@link runTruthCheck}) over injected shapes:
 * the parsed canonical docs, a {@link CorpusClient} (fake in tests, the real
 * {@link StdioCorpusClient} in production), a {@link ToolRegistry} (fake in tests), the
 * cutover ledger, the target runtimes' emitted grant surfaces, package.json scripts, a
 * filesystem facade, and an injectable glob resolver. No subprocess is spawned inside
 * `runTruthCheck` — the production wiring (the `require.main` CLI at the bottom) spawns the
 * real corpus client and introspects the real registry, then hands both to the pure checker.
 *
 * Traces to: Req 18 (five classes + adjudicated findings), Req 3 AC2 (interim section form),
 * Req 5, Req 12 AC3 (run-context annotation), design C7 (table + predicate-governance +
 * D-A3 + § Error Handling).
 */

import * as fs from 'fs';
import * as path from 'path';
import type { CorpusClient } from './resolve';
import { CorpusResolver } from './resolve';
import type { ToolRegistry } from './registry';
import { serverTable, introspectServer, assembleRegistry } from './registry';
import {
  type CanonicalAgentDoc,
  type GovernanceAsLawEntry,
  type GovernanceAssertClaim,
  type AgentRoute,
  type ToolCueRoute,
  type CommandEntry,
  type NamedCommandEntry,
  type ToolSubset,
  type McpName,
  type KnowledgeBaseDeclaration,
  isNamedGapCommandEntry,
} from './schema';
import { renderRunContextAnnotation } from './render';
import { parseCutoverLedger } from './generate';
import { parseCanonicalAgentSource } from './source';
import { createStdioDocsClient } from './resolve';

// ============================================================================
// Finding + report shapes (design § Error Handling: flagged entry + truth observed
// + canonical claim, grouped by adjudicator)
// ============================================================================

/** The five C7 classes plus the D-A3 knowledgeBases assertion, tagged on every finding. */
export type TruthCheckClass =
  | 'governance-integrity' // (a)
  | 'agent-routes' // (b)
  | 'per-runtime-grants' // (c)
  | 'command-string-currency' // (d)
  | 'live-tool' // (e)
  | 'knowledge-bases'; // D-A3

/**
 * A single flagged assertion. `truthObserved` is what the world actually is; `canonicalClaim`
 * is what canonical source asserted — the design § Error Handling triple (flagged entry via
 * `path`/`claim`, truth observed, canonical claim). `verdict` distinguishes a mechanical FAIL
 * from an owner-ADJUDICATE state (the design never AUTO-resolves — see § Error Handling);
 * every class here produces mechanical FAILs, but the shape carries ADJUDICATE for parity
 * with the sweeps and so a caller can route without re-deriving.
 */
export interface Finding {
  class: TruthCheckClass;
  agent: string;
  /** Frontmatter pointer to the flagged entry, e.g. `ambient.governanceAsLaw[0].assert[1]`. */
  path: string;
  /** Named claim when the class keys per-claim (class (a), A-D3). */
  claim?: string;
  /** What the world actually is (truth). */
  truthObserved: string;
  /** What canonical source claimed. */
  canonicalClaim: string;
  /** The adjudicator this finding is grouped under (a seat name / owner / 'thurgood'). */
  adjudicator: string;
  verdict: 'FAIL' | 'ADJUDICATE';
}

/** The report: all findings, grouped by adjudicator, and a clean flag (no findings). */
export interface TruthCheckReport {
  findings: Finding[];
  byAdjudicator: Record<string, Finding[]>;
  clean: boolean;
}

// ============================================================================
// Injected truth surfaces
// ============================================================================

/**
 * A target runtime's emitted config grant surface — the minimal shape class (c)'s server-grant
 * leg (L1) checks against: for `agent` on `target`, which servers the emitted config actually
 * grants. `toolSubset`'s named servers must be ⊆ `grantedServers`, else a first-class FAIL.
 */
export interface EmittedGrantSurface {
  agent: string;
  target: string;
  grantedServers: string[];
}

/**
 * A minimal filesystem facade so class (d)'s script-path currency check (file exists +
 * executable) is injectable in tests. Production wires it to `fs`.
 */
export interface FsFacade {
  /** True iff the path exists. */
  exists(absPath: string): boolean;
  /** True iff the path exists AND has an owner/group/other execute bit set. */
  isExecutable(absPath: string): boolean;
}

/** Production {@link FsFacade} over `node:fs`. */
export const nodeFsFacade: FsFacade = {
  exists(absPath: string): boolean {
    return fs.existsSync(absPath);
  },
  isExecutable(absPath: string): boolean {
    try {
      const mode = fs.statSync(absPath).mode;
      // Any execute bit (owner 0o100, group 0o010, other 0o001).
      return (mode & 0o111) !== 0;
    } catch {
      return false;
    }
  },
};

/**
 * Injectable glob resolver (D-A3): given a glob and the repo root, return the matched paths.
 * Tests inject a fake; production wires a tiny glob→matches impl (below). A declaration passes
 * when its glob resolves to ≥1 match OR carries an `expected-empty` annotation.
 */
export type GlobResolver = (glob: string, repoRoot: string) => string[];

/** All the injected inputs {@link runTruthCheck} operates over — nothing spawns inside. */
export interface TruthCheckInputs {
  /** The parsed canonical agent docs under check (typically the ledger members). */
  docs: CanonicalAgentDoc[];
  /** The running docs-MCP surface (fake in tests, StdioCorpusClient in production). */
  corpus: CorpusClient;
  /** The live tool registry (fake in tests, fresh introspection in production). */
  registry: ToolRegistry;
  /** The cutover ledger — the agent names the generator is SSOT for (class (b)). */
  cutoverLedger: string[];
  /** Per-(agent,target) emitted grant surfaces (class (c) server-grant leg, L1). */
  grantSurfaces: EmittedGrantSurface[];
  /** package.json scripts (class (d) script-name lookup). */
  scripts: Record<string, string>;
  /** Repo root — for resolving script-path commands and globs. */
  repoRoot: string;
  /** Filesystem facade (class (d) script-path exists+executable). */
  fs?: FsFacade;
  /** Glob resolver (D-A3). */
  resolveGlob: GlobResolver;
}

// ============================================================================
// mcp short-name → server-name mapping
// ============================================================================

/**
 * `ToolCueRoute.mcp` is a short name (`docs`/`application`/`product`); `ToolSubset` keys and
 * registry server names are the full `designerpunk-*` names. This is the single mapping seam
 * — kept local here (no shared map exists elsewhere; DESIGN CALL flagged in the completion
 * report) and mirroring `registry.ts`'s `serverTable` names exactly.
 */
export const MCP_TO_SERVER: Readonly<Record<McpName, keyof ToolSubset>> = Object.freeze({
  docs: 'designerpunk-docs',
  application: 'designerpunk-application',
  product: 'designerpunk-product',
});

/** All server names a `ToolSubset` can carry, in registry order. */
const TOOL_SUBSET_SERVERS: ReadonlyArray<keyof ToolSubset> = [
  'designerpunk-docs',
  'designerpunk-application',
  'designerpunk-product',
];

// ============================================================================
// Normalization for class (a) mustContain / pattern
// ============================================================================

/**
 * Normalize section text and a mustContain literal to the SAME shape before substring testing
 * (design C7 class (a): "normalized section text satisfies every mustContain"). Normalization:
 *   1. lower-case (case-insensitive match), and
 *   2. collapse every run of whitespace (incl. newlines) to a single space, then trim.
 * So a literal that spans a wrapped line, or differs only in case/spacing, still matches. This
 * is deliberately conservative — it does NOT strip punctuation or markdown, so a claim-
 * distinguishing token like "explicit approval" still has to appear as those words in order.
 */
export function normalizeForMustContain(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

// ============================================================================
// The five classes + D-A3 — each a pure function over the inputs, appending findings
// ============================================================================

/**
 * (a) governance-integrity — per governanceAsLaw entry, per assert claim: the `id` resolves
 * (get_document_summary), the verbatim heading exists (get_section), AND the resolved section
 * TEXT satisfies every `mustContain` literal (normalized) / the `pattern` regex. A failing
 * predicate NAMES WHICH claim moved (A-D3 — per-claim findings). Adjudicator = the entry's
 * `owner`. The predicate itself is canonical content governed under C6 (schema.ts rule 3
 * already lints trivially-permissive patterns at VALIDATE time — we do NOT re-lint here; we
 * CONSUME the validated predicate, per the prompt's "do not duplicate it" note).
 */
async function checkGovernanceIntegrity(
  agent: string,
  entries: GovernanceAsLawEntry[] | undefined,
  corpus: CorpusClient,
  findings: Finding[]
): Promise<void> {
  if (!entries) return;
  const resolver = new CorpusResolver(corpus);

  for (let ei = 0; ei < entries.length; ei += 1) {
    const entry = entries[ei];
    for (let ci = 0; ci < entry.assert.length; ci += 1) {
      const claim = entry.assert[ci];
      const claimPath = `ambient.governanceAsLaw[${ei}].assert[${ci}]`;

      // Leg 1: id resolves + heading exists (interim section form, Req 3 AC2).
      const summary = await corpus.getDocumentSummary(entry.id);
      if (summary.isError) {
        findings.push({
          class: 'governance-integrity',
          agent,
          path: claimPath,
          claim: claim.claim,
          truthObserved: `doc id "${entry.id}" did not resolve in the running docs MCP`,
          canonicalClaim: `claim "${claim.claim}" asserts § "${claim.section}" in "${entry.id}"`,
          adjudicator: entry.owner,
          verdict: 'FAIL',
        });
        continue;
      }
      const section = await corpus.getSection(entry.id, claim.section);
      if (section.isError) {
        findings.push({
          class: 'governance-integrity',
          agent,
          path: claimPath,
          claim: claim.claim,
          truthObserved: `doc id "${entry.id}" resolved, but verbatim heading "${claim.section}" was not found`,
          canonicalClaim: `claim "${claim.claim}" asserts § "${claim.section}" in "${entry.id}"`,
          adjudicator: entry.owner,
          verdict: 'FAIL',
        });
        continue;
      }

      // Leg 2: the resolved section TEXT satisfies the predicate.
      const predicateFailure = evaluatePredicate(claim, section.text);
      if (predicateFailure) {
        findings.push({
          class: 'governance-integrity',
          agent,
          path: claimPath,
          claim: claim.claim,
          truthObserved: predicateFailure,
          canonicalClaim: describePredicate(claim),
          adjudicator: entry.owner,
          verdict: 'FAIL',
        });
      }
    }
    // `resolver` referenced to keep the CorpusResolver import load-bearing / available for
    // future section-form migration; the per-leg calls above use the client directly so a
    // failure can name the exact leg with the claim (A-D3).
    void resolver;
  }
}

/** Return a failure description if the predicate is unsatisfied, else `undefined`. */
function evaluatePredicate(claim: GovernanceAssertClaim, sectionText: string): string | undefined {
  if (claim.mustContain && claim.mustContain.length > 0) {
    const haystack = normalizeForMustContain(sectionText);
    for (const literal of claim.mustContain) {
      const needle = normalizeForMustContain(literal);
      if (!haystack.includes(needle)) {
        return `resolved section text does not contain required literal "${literal}" (normalized: case-insensitive, whitespace-collapsed)`;
      }
    }
    return undefined;
  }
  if (typeof claim.pattern === 'string') {
    let re: RegExp;
    try {
      re = new RegExp(claim.pattern);
    } catch (error) {
      return `pattern "${claim.pattern}" is not a valid regex (${(error as Error).message})`;
    }
    if (!re.test(sectionText)) {
      return `resolved section text does not match pattern /${claim.pattern}/`;
    }
    return undefined;
  }
  // A claim with neither is a rule-3 validation failure upstream; treat as unsatisfiable here
  // so a mis-validated input still surfaces rather than silently passing.
  return 'claim carries neither mustContain nor pattern (should have failed validation upstream)';
}

/** Plain-English canonical claim for a predicate, for the finding's `canonicalClaim`. */
function describePredicate(claim: GovernanceAssertClaim): string {
  if (claim.mustContain && claim.mustContain.length > 0) {
    return `§ "${claim.section}" must contain: ${claim.mustContain.map((l) => `"${l}"`).join(', ')}`;
  }
  if (typeof claim.pattern === 'string') {
    const asserts = claim.assertsComment ? ` — asserts: ${claim.assertsComment}` : '';
    return `§ "${claim.section}" must match /${claim.pattern}/${asserts}`;
  }
  return `§ "${claim.section}" (no predicate authored)`;
}

/**
 * (b) agent-routes — every `routes.agents` target with disposition `resolves` MUST be in the
 * cutover ledger; an unlisted target with `resolves` → FAIL. A target with disposition
 * `not-yet-ported` is exempt (that IS the escape hatch — LE1). Adjudicator = the routing
 * agent's seat (the agent doing the routing).
 */
function checkAgentRoutes(
  agent: string,
  routes: AgentRoute[] | undefined,
  cutoverLedger: string[],
  findings: Finding[]
): void {
  if (!routes) return;
  const ledger = new Set(cutoverLedger);
  routes.forEach((route, i) => {
    if (route.disposition === 'not-yet-ported') return; // exempt by declared disposition.
    if (!ledger.has(route.target)) {
      findings.push({
        class: 'agent-routes',
        agent,
        path: `routes.agents[${i}]`,
        truthObserved: `target "${route.target}" is NOT in the cutover ledger for this runtime`,
        canonicalClaim: `routes.agents[${i}] targets "${route.target}" with disposition "resolves"`,
        adjudicator: agent, // the routing agent's seat.
        verdict: 'FAIL',
      });
    }
  });
}

/**
 * (c) per-runtime grants — TWO legs (design C7 class (c); the second is L1, first-class FAIL):
 *   Leg 1 (membership): every `routes.cues` tool ∈ the agent's `toolSubset` (some server in
 *     the subset declares it). Adjudicator = the seat.
 *   Leg 2 (server-grant, L1): every server NAMED by `toolSubset` ∈ that agent's emitted
 *     `grantedServers`. Adjudicator = the declaring owner. This is the exact `lina.json` bug:
 *     a subset routes to `@designerpunk-application` tools onto a config with no application
 *     grant — a first-class FAIL, not a prose aside.
 * The grant surfaces are per-(agent,target); leg 2 fires per target the agent was emitted to.
 */
function checkPerRuntimeGrants(
  agent: string,
  cues: ToolCueRoute[] | undefined,
  toolSubset: ToolSubset | undefined,
  grantSurfaces: EmittedGrantSurface[],
  findings: Finding[]
): void {
  const subset = toolSubset ?? {};
  const subsetTools = new Set<string>();
  const subsetServers = new Set<keyof ToolSubset>();
  for (const server of TOOL_SUBSET_SERVERS) {
    const tools = subset[server];
    if (tools && tools.length > 0) {
      subsetServers.add(server);
      for (const t of tools) subsetTools.add(t);
    }
  }

  // Leg 1 (membership): every cue tool ∈ toolSubset.
  (cues ?? []).forEach((cue, i) => {
    if (!subsetTools.has(cue.tool)) {
      findings.push({
        class: 'per-runtime-grants',
        agent,
        path: `routes.cues[${i}]`,
        truthObserved: `cue tool "${cue.tool}" is NOT in this agent's toolSubset`,
        canonicalClaim: `routes.cues[${i}] routes to tool "${cue.tool}" (${cue.mcp} MCP)`,
        adjudicator: agent, // membership: the seat.
        verdict: 'FAIL',
      });
    }
  });

  // Leg 2 (server-grant, L1): every subset server ∈ the emitted grantedServers, per target.
  const agentSurfaces = grantSurfaces.filter((s) => s.agent === agent);
  for (const surface of agentSurfaces) {
    const granted = new Set(surface.grantedServers);
    for (const server of subsetServers) {
      if (!granted.has(server)) {
        findings.push({
          class: 'per-runtime-grants',
          agent,
          path: `toolSubset.${server}`,
          truthObserved: `server "${server}" is named by toolSubset but is ABSENT from the emitted ${surface.target} grant list (L1)`,
          canonicalClaim: `toolSubset names server "${server}" (routes ${surface.target} config to its tools)`,
          adjudicator: `declaring-owner:${server}`, // substance: the declaring owner.
          verdict: 'FAIL',
        });
      }
    }
  }
}

/**
 * (d) command-string currency — per design C7 class (d):
 *   - `runContext: this-repo` + `source: package.json` → the script NAME (parsed from
 *     "npm run X" or a bare script name) ∈ scripts, else FAIL.
 *   - script-path commands (the `cmd` contains '/') → the file exists + is executable.
 *   - `consumer-repo` / `per-product` → EXEMPT from script lookup, but MUST carry a non-empty
 *     rendered annotation. With the runContext enum in hand the annotation is
 *     renderRunContextAnnotation(runContext) — never empty for those two values — so we assert
 *     the CUE/GAP text (the seat-authored annotation surface) is present AND non-empty
 *     (D-A5: empty-string FAILs identically to a missing key).
 * Adjudicator = the command's owning seat (the agent).
 */
function checkCommandStringCurrency(
  agent: string,
  commands: CommandEntry[] | undefined,
  scripts: Record<string, string>,
  repoRoot: string,
  fsFacade: FsFacade,
  findings: Finding[]
): void {
  if (!commands) return;

  commands.forEach((entry, i) => {
    const label = isNamedGapCommandEntry(entry) ? entry.class : entry.name;
    const path = `commands[${i}]`;

    // consumer-repo / per-product: exempt from script lookup; annotation must be present+non-empty.
    if (entry.runContext !== 'this-repo') {
      const rendered = renderRunContextAnnotation(entry.runContext); // never empty for these two.
      // The seat-authored annotation surface is the cue (NamedCommandEntry) or gap
      // (NamedGapCommandEntry) text. D-A5: empty-string FAILS like a missing key.
      const authored = isNamedGapCommandEntry(entry) ? entry.gap : entry.cue;
      if (!authored || authored.trim().length === 0) {
        findings.push({
          class: 'command-string-currency',
          agent,
          path,
          truthObserved: `${entry.runContext} entry "${label}" carries no non-empty ${isNamedGapCommandEntry(entry) ? 'gap' : 'cue'} annotation (empty-string FAILs like missing — D-A5)`,
          canonicalClaim: `${entry.runContext} entry "${label}" (rendered run-context annotation: "${rendered}")`,
          adjudicator: agent,
          verdict: 'FAIL',
        });
      }
      return;
    }

    // this-repo: NamedGapCommandEntry has no cmd to check — a this-repo gap is a named absence.
    if (isNamedGapCommandEntry(entry)) return;
    const named = entry as NamedCommandEntry;

    // script-path command (cmd contains '/') → file exists + executable.
    if (named.cmd.includes('/')) {
      const scriptPath = extractScriptPath(named.cmd);
      const abs = path0IsAbsolute(scriptPath) ? scriptPath : joinRepo(repoRoot, scriptPath);
      if (!fsFacade.exists(abs)) {
        findings.push({
          class: 'command-string-currency',
          agent,
          path,
          truthObserved: `script-path command references "${scriptPath}", which does not exist`,
          canonicalClaim: `this-repo command "${label}" → "${named.cmd}"`,
          adjudicator: agent,
          verdict: 'FAIL',
        });
      } else if (!fsFacade.isExecutable(abs)) {
        findings.push({
          class: 'command-string-currency',
          agent,
          path,
          truthObserved: `script-path command references "${scriptPath}", which exists but is NOT executable`,
          canonicalClaim: `this-repo command "${label}" → "${named.cmd}"`,
          adjudicator: agent,
          verdict: 'FAIL',
        });
      }
      return;
    }

    // package.json-sourced this-repo command → the parsed script name ∈ scripts.
    if (named.source === 'package.json') {
      const scriptName = parseScriptName(named.cmd);
      if (scriptName === undefined || scripts[scriptName] === undefined) {
        findings.push({
          class: 'command-string-currency',
          agent,
          path,
          truthObserved:
            scriptName === undefined
              ? `command "${named.cmd}" is not a parseable "npm run X" / bare script name`
              : `script "${scriptName}" is NOT present in package.json scripts`,
          canonicalClaim: `this-repo command "${label}" → "${named.cmd}" (source: package.json)`,
          adjudicator: agent,
          verdict: 'FAIL',
        });
      }
    }
    // A this-repo command with neither a '/' path nor source:package.json is not lookup-able
    // here (no truth surface to check against) — left as a PASS: nothing to contradict.
  });
}

/** Parse the script name from "npm run X" / "npm run X -- ..." or a bare script token. */
export function parseScriptName(cmd: string): string | undefined {
  const trimmed = cmd.trim();
  const npmRun = trimmed.match(/^npm\s+run\s+(\S+)/);
  if (npmRun) return npmRun[1];
  // A bare single-token script name (no spaces, no slash).
  if (!/\s/.test(trimmed) && !trimmed.includes('/')) return trimmed;
  return undefined;
}

/** Extract the script path token from a script-path command (the first '/'-bearing token). */
function extractScriptPath(cmd: string): string {
  const tokens = cmd.trim().split(/\s+/);
  const withSlash = tokens.find((t) => t.includes('/'));
  return withSlash ?? tokens[0] ?? cmd.trim();
}

function path0IsAbsolute(p: string): boolean {
  return path.isAbsolute(p);
}
function joinRepo(repoRoot: string, rel: string): string {
  return path.join(repoRoot, rel);
}

/**
 * (e) live-tool — every cue tool AND every toolSubset tool ∈ the registry's DECLARED tools for
 * the corresponding server; a tool not declared → FAIL. Declared-but-index-empty is inherently
 * a PASS here: the registry is DECLARATION-keyed (it comes from `tools/list`, never the index),
 * so index state cannot enter this check — the carve-out is STRUCTURAL, not a special case.
 * Adjudicator = thurgood (infrastructure).
 */
function checkLiveTool(
  agent: string,
  cues: ToolCueRoute[] | undefined,
  toolSubset: ToolSubset | undefined,
  registry: ToolRegistry,
  findings: Finding[]
): void {
  // Build server → declared-tool-set from the registry (declaration-keyed; index never enters).
  const declaredByServer = new Map<string, Set<string>>();
  for (const server of registry.servers) {
    declaredByServer.set(server.name, new Set(server.tools.map((t) => t.name)));
  }

  // Every cue tool must be declared by its mcp's server.
  (cues ?? []).forEach((cue, i) => {
    const serverName = MCP_TO_SERVER[cue.mcp];
    const declared = declaredByServer.get(serverName);
    if (!declared || !declared.has(cue.tool)) {
      findings.push({
        class: 'live-tool',
        agent,
        path: `routes.cues[${i}]`,
        truthObserved: `tool "${cue.tool}" is NOT declared by the running server "${serverName}"`,
        canonicalClaim: `routes.cues[${i}] routes to "${cue.tool}" on ${cue.mcp} MCP (server ${serverName})`,
        adjudicator: 'thurgood',
        verdict: 'FAIL',
      });
    }
  });

  // Every toolSubset tool must be declared by its server.
  const subset = toolSubset ?? {};
  for (const server of TOOL_SUBSET_SERVERS) {
    const tools = subset[server];
    if (!tools) continue;
    const declared = declaredByServer.get(server);
    tools.forEach((tool, i) => {
      if (!declared || !declared.has(tool)) {
        findings.push({
          class: 'live-tool',
          agent,
          path: `toolSubset.${server}[${i}]`,
          truthObserved: `tool "${tool}" is NOT declared by the running server "${server}"`,
          canonicalClaim: `toolSubset.${server} grants "${tool}"`,
          adjudicator: 'thurgood',
          verdict: 'FAIL',
        });
      }
    });
  }
}

/**
 * A KnowledgeBaseDeclaration MAY carry an `expected-empty` annotation adjudicating a zero-match
 * glob (D-A3). The schema (schema.ts) does not YET model this field — the prompt directs
 * reading it via a SAFE CAST here and NOT editing schema.ts; formalizing the field is a
 * one-line follow-up for the schema owner (flagged in the completion report).
 */
type KnowledgeBaseDeclarationWithAnnotation = KnowledgeBaseDeclaration & {
  'expected-empty'?: string;
};

/**
 * (D-A3) knowledgeBases glob currency — every declaration's every glob MUST resolve to ≥1
 * match OR the declaration carries an `expected-empty: <reason>` annotation. A zero-match glob
 * without the annotation → FAIL (a stale glob renders a `/knowledge` note pointing at nothing).
 * Adjudicator = thurgood (infrastructure), same as class (e).
 */
function checkKnowledgeBases(
  agent: string,
  knowledgeBases: KnowledgeBaseDeclaration[] | undefined,
  resolveGlob: GlobResolver,
  repoRoot: string,
  findings: Finding[]
): void {
  if (!knowledgeBases) return;
  knowledgeBases.forEach((declRaw, di) => {
    const decl = declRaw as KnowledgeBaseDeclarationWithAnnotation;
    const expectedEmpty = decl['expected-empty'];
    const isAnnotated = typeof expectedEmpty === 'string' && expectedEmpty.trim().length > 0;
    decl.globs.forEach((glob, gi) => {
      const matches = resolveGlob(glob, repoRoot);
      if (matches.length === 0 && !isAnnotated) {
        findings.push({
          class: 'knowledge-bases',
          agent,
          path: `knowledgeBases[${di}].globs[${gi}]`,
          truthObserved: `glob "${glob}" resolved to ZERO matches and carries no "expected-empty" annotation`,
          canonicalClaim: `knowledgeBases[${di}] ("${decl.name}") declares glob "${glob}"`,
          adjudicator: 'thurgood',
          verdict: 'FAIL',
        });
      }
    });
  });
}

// ============================================================================
// The pure checker
// ============================================================================

/**
 * Run all five C7 classes + the D-A3 knowledgeBases assertion over the injected inputs and
 * return the grouped report. PURE aside from the corpus client's I/O (which is itself injected;
 * a fake is synchronous-enough for tests). No subprocess is spawned here.
 */
export async function runTruthCheck(inputs: TruthCheckInputs): Promise<TruthCheckReport> {
  const fsFacade = inputs.fs ?? nodeFsFacade;
  const findings: Finding[] = [];

  for (const doc of inputs.docs) {
    const fm = doc.frontmatter;
    const agent = fm.agent;

    // (a) governance-integrity (async — corpus I/O).
    await checkGovernanceIntegrity(agent, fm.ambient?.governanceAsLaw, inputs.corpus, findings);

    // (b) agent-routes.
    checkAgentRoutes(agent, fm.routes?.agents, inputs.cutoverLedger, findings);

    // (c) per-runtime grants (both legs).
    checkPerRuntimeGrants(agent, fm.routes?.cues, fm.toolSubset, inputs.grantSurfaces, findings);

    // (d) command-string currency.
    checkCommandStringCurrency(agent, fm.commands, inputs.scripts, inputs.repoRoot, fsFacade, findings);

    // (e) live-tool.
    checkLiveTool(agent, fm.routes?.cues, fm.toolSubset, inputs.registry, findings);

    // (D-A3) knowledgeBases glob currency.
    checkKnowledgeBases(agent, fm.knowledgeBases, inputs.resolveGlob, inputs.repoRoot, findings);
  }

  const byAdjudicator = groupByAdjudicator(findings);
  return { findings, byAdjudicator, clean: findings.length === 0 };
}

/** Group findings by adjudicator, preserving insertion order within each group. */
export function groupByAdjudicator(findings: Finding[]): Record<string, Finding[]> {
  const grouped: Record<string, Finding[]> = {};
  for (const finding of findings) {
    (grouped[finding.adjudicator] ??= []).push(finding);
  }
  return grouped;
}

// ============================================================================
// Report formatting (design § Error Handling: grouped by adjudicator; flagged
// entry + truth observed + canonical claim)
// ============================================================================

/**
 * Format a {@link TruthCheckReport} as text grouped by adjudicator. Each finding renders the
 * flagged entry (agent + path + optional claim), the truth observed, and the canonical claim —
 * the design § Error Handling triple. A clean report renders a single "clean" line.
 */
export function formatReport(report: TruthCheckReport): string {
  if (report.clean) {
    return 'canonical-vs-truth: clean (0 findings across all classes)';
  }
  const lines: string[] = [];
  lines.push(`canonical-vs-truth: ${report.findings.length} finding(s) — grouped by adjudicator`);
  const adjudicators = Object.keys(report.byAdjudicator).sort();
  for (const adjudicator of adjudicators) {
    const group = report.byAdjudicator[adjudicator];
    lines.push('');
    lines.push(`── ADJUDICATOR: ${adjudicator} (${group.length}) ──`);
    for (const f of group) {
      const claimTag = f.claim ? ` claim="${f.claim}"` : '';
      lines.push(`  [${f.verdict}] (${f.class}) ${f.agent} @ ${f.path}${claimTag}`);
      lines.push(`      truth observed : ${f.truthObserved}`);
      lines.push(`      canonical claim: ${f.canonicalClaim}`);
    }
  }
  return lines.join('\n');
}

// ============================================================================
// Production glob resolver (a tiny glob→matches impl over the repo)
// ============================================================================

/**
 * A minimal production glob resolver (D-A3). Supports the `**` (any dirs) and `*` (any run of
 * non-slash chars) wildcards over the repo tree — sufficient for `knowledgeBases` globs, which
 * are directory/file patterns. NOT a full glob engine (no brace/extglob); a stale glob that
 * uses unsupported syntax simply matches nothing, which the check reports (a conservative,
 * fail-loud stance). Kept injectable so tests never touch the filesystem.
 */
export function repoGlobResolver(glob: string, repoRoot: string): string[] {
  const re = globToRegExp(glob);
  const matches: string[] = [];
  const skipDirs = new Set(['node_modules', '.git', 'dist']);

  const walk = (absDir: string, relDir: string): void => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(absDir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const rel = relDir ? `${relDir}/${entry.name}` : entry.name;
      if (re.test(rel)) matches.push(rel);
      if (entry.isDirectory() && !skipDirs.has(entry.name)) {
        walk(path.join(absDir, entry.name), rel);
      }
    }
  };
  walk(repoRoot, '');
  return matches;
}

/** Translate a `**`/`*` glob to an anchored RegExp over forward-slash relative paths. */
function globToRegExp(glob: string): RegExp {
  let out = '';
  for (let i = 0; i < glob.length; i += 1) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        out += '.*';
        i += 1;
        if (glob[i + 1] === '/') i += 1; // consume the slash after `**/`.
      } else {
        out += '[^/]*';
      }
    } else if ('\\^$+?.()|[]{}'.includes(c)) {
      out += `\\${c}`;
    } else {
      out += c;
    }
  }
  return new RegExp(`^${out}$`);
}

// ============================================================================
// CLI — run against the real repo (require.main only, never on import)
// ============================================================================

const REPO_ROOT = path.resolve(__dirname, '..', '..');

/** Parse package.json scripts from the repo root. */
function readScripts(repoRoot: string): Record<string, string> {
  const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8')) as {
    scripts?: Record<string, string>;
  };
  return pkg.scripts ?? {};
}

/** Read + parse every `canonical/agents/*.md` into CanonicalAgentDocs. */
function readCanonicalAgentDocs(repoRoot: string): CanonicalAgentDoc[] {
  const dir = path.join(repoRoot, 'canonical', 'agents');
  let files: string[];
  try {
    files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }
  return files
    .sort()
    .map((f) => parseCanonicalAgentSource(fs.readFileSync(path.join(dir, f), 'utf8'), path.join(dir, f)));
}

/** Read the cutover ledger, tolerating its absence. */
function readCutoverLedger(repoRoot: string): string[] {
  try {
    return parseCutoverLedger(fs.readFileSync(path.join(repoRoot, 'canonical', 'cutover-ledger.yaml'), 'utf8'));
  } catch {
    return [];
  }
}

/**
 * Fresh registry via live introspection of the three servers (declaration-keyed). Loud on any
 * boot/listTools failure (registry.ts throws) — the check FAILS rather than trusting a cache.
 */
async function freshRegistry(repoRoot: string): Promise<ToolRegistry> {
  const specs = serverTable(repoRoot);
  const results = [];
  for (const spec of specs) {
    results.push(await introspectServer(spec, repoRoot));
  }
  return assembleRegistry(results);
}

/** The CLI entry point — spawns the real corpus client + registry, runs the pure checker. */
async function main(): Promise<void> {
  const docs = readCanonicalAgentDocs(REPO_ROOT);

  // Empty-agents case: no canonical agents to check → clean, exit 0 (design: substrate has
  // zero ledger agents until the first cutover).
  if (docs.length === 0) {
    console.log('canonical-vs-truth: clean (0 agents in canonical/)');
    process.exit(0);
    return;
  }

  const corpus = createStdioDocsClient();
  try {
    const registry = await freshRegistry(REPO_ROOT);
    const report = await runTruthCheck({
      docs,
      corpus,
      registry,
      cutoverLedger: readCutoverLedger(REPO_ROOT),
      // Empty grant surfaces until cutovers exist (the emitted configs are produced per cutover).
      grantSurfaces: [],
      scripts: readScripts(REPO_ROOT),
      repoRoot: REPO_ROOT,
      fs: nodeFsFacade,
      resolveGlob: repoGlobResolver,
    });
    console.log(formatReport(report));
    process.exit(report.clean ? 0 : 1);
  } finally {
    await corpus.close();
  }
}

// Run ONLY when this module is the process entry point (mirrors registry.ts / mcp-server).
// Importing this module as a library (tests, other stages) must NOT spawn or check anything.
if (require.main === module) {
  main().catch((error) => {
    console.error('[canonical-vs-truth] Fatal error:', error);
    process.exit(1);
  });
}
