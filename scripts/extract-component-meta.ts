#!/usr/bin/env tsx
/**
 * extract-component-meta.ts
 *
 * Generates component-meta.yaml files from Component-Family steering docs.
 * Single source of truth: family docs → generated meta files.
 *
 * Entry point: npm run extract:meta
 * Spec: 086 — Component Discoverability & Metadata Infrastructure
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// --- Constants ---

const STEERING_DIR = path.resolve(__dirname, '../governance');
const COMPONENTS_DIR = path.resolve(__dirname, '../src/components/core');
const GUIDANCE_DIR = path.resolve(__dirname, '../family-guidance');

const CONTROLLED_VOCABULARY = [
  'forms', 'dashboards', 'settings-screens', 'navigation-tabs',
  'content-feeds', 'onboarding-flows', 'filter-bars', 'list-items',
  'icon-overlays', 'profile-sections', 'product-cards', 'app-bars',
  'modals', 'empty-states',
];

const MIN_PURPOSE_WORDS = 10;

// --- Types ---

interface MetadataBlock {
  component: string;
  purpose: string;
  contexts: string[];
}

export interface UsageData {
  when_to_use: string[];
  when_not_to_use: string[];
}

export interface Alternative {
  component: string;
  reason: string;
}

interface GeneratedMeta {
  purpose: string;
  usage: { when_to_use: string[]; when_not_to_use: string[] };
  contexts: string[];
  alternatives: Alternative[];
}

interface Warning {
  component: string;
  message: string;
}

// --- Parsing ---

function parseFamilyDoc(filePath: string): {
  metadata: MetadataBlock[];
  usage: { familyWhenTo: string[]; familyWhenNotTo: string[]; perComponent: Map<string, UsageData> };
  selectionTable: Array<{ scenario: string; recommend: string; rationale: string }>;
  familyName: string;
} {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Extract family name from filename
  const familyName = path.basename(filePath, '.md').replace('Component-Family-', '');

  // Parse metadata blocks
  const metadata: MetadataBlock[] = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^### (.+?) — Metadata$/);
    if (!match) continue;
    const component = match[1];
    let purpose = '';
    let contexts: string[] = [];
    for (let j = i + 1; j < lines.length && j < i + 5; j++) {
      const purposeMatch = lines[j].match(/^- \*\*Purpose\*\*: (.+)$/);
      if (purposeMatch) purpose = purposeMatch[1];
      const ctxMatch = lines[j].match(/^- \*\*Contexts\*\*: (.+)$/);
      if (ctxMatch) contexts = ctxMatch[1].split(',').map(c => c.trim());
    }
    metadata.push({ component, purpose, contexts });
  }

  // Parse family-level usage
  const familyWhenTo: string[] = [];
  const familyWhenNotTo: string[] = [];
  let inWhenTo = false;
  let inWhenNotTo = false;

  for (let i = 0; i < lines.length; i++) {
    if (/^### When to Use|^### When to Use This Family|^### When to Use Buttons|^### When to Use Icons|^### When to Use Containers|^### When to Use Progress|^### When to Use Form|^### Basic Usage/.test(lines[i])) {
      inWhenTo = true; inWhenNotTo = false; continue;
    }
    if (/^### When Not to Use|^### Do NOT use|^### When NOT/.test(lines[i]) || /^\*\*Do NOT use/.test(lines[i])) {
      inWhenTo = false; inWhenNotTo = true; continue;
    }
    if (/^###? /.test(lines[i]) && !lines[i].includes('When')) {
      inWhenTo = false; inWhenNotTo = false;
    }
    if (inWhenTo && lines[i].startsWith('- ')) {
      familyWhenTo.push(lines[i].replace(/^- \*\*[^*]+\*\*:\s*/, '').replace(/^- /, '').trim());
    }
    if (inWhenNotTo && lines[i].startsWith('- ')) {
      familyWhenNotTo.push(lines[i].replace(/^- /, '').trim());
    }
  }

  // Parse selection table (Scenario | Recommended Component | Rationale)
  const selectionTable: Array<{ scenario: string; recommend: string; rationale: string }> = [];
  for (let i = 0; i < lines.length; i++) {
    if (!/^\|.*Scenario.*\|.*Recommend/.test(lines[i])) continue;
    // Skip separator line
    for (let j = i + 2; j < lines.length; j++) {
      if (!lines[j].startsWith('|')) break;
      const cols = lines[j].split('|').map(c => c.trim()).filter(Boolean);
      if (cols.length >= 3) {
        selectionTable.push({ scenario: cols[0], recommend: cols[1], rationale: cols[2] });
      }
    }
  }

  return { metadata, usage: { familyWhenTo, familyWhenNotTo, perComponent: new Map() }, selectionTable, familyName };
}

function deriveUsage(
  component: string,
  selectionTable: Array<{ scenario: string; recommend: string; rationale: string }>,
  familyWhenTo: string[],
  familyWhenNotTo: string[],
  allComponents: string[],
  familyDocName: string,
): { usage: UsageData; derived: 'per-component' | 'family-level' | 'preserved' } {
  const when_to_use: string[] = [];
  const when_not_to_use: string[] = [];

  // Per-component from selection table
  for (const row of selectionTable) {
    if (row.recommend === component || row.recommend.startsWith(component)) {
      when_to_use.push(row.scenario);
    } else if (allComponents.includes(row.recommend)) {
      when_not_to_use.push(`${row.scenario} — use ${row.recommend}`);
    }
  }

  if (when_to_use.length > 0) {
    // Also add family-level when_not_to_use
    for (const entry of familyWhenNotTo) {
      if (!when_not_to_use.some(e => e.includes(entry.substring(0, 30)))) {
        when_not_to_use.push(entry);
      }
    }
    return { usage: { when_to_use, when_not_to_use }, derived: 'per-component' };
  }

  // Family-level fallback
  return {
    usage: { when_to_use: [...familyWhenTo], when_not_to_use: [...familyWhenNotTo] },
    derived: 'family-level',
  };
}

function deriveAlternatives(
  component: string,
  selectionTable: Array<{ scenario: string; recommend: string; rationale: string }>,
  allComponents: string[],
): Alternative[] {
  const alts = new Map<string, string>();
  for (const row of selectionTable) {
    if (row.recommend !== component && allComponents.includes(row.recommend) && !alts.has(row.recommend)) {
      // Only add alternatives from the same selection table (same family)
      alts.set(row.recommend, `When ${row.scenario.toLowerCase()}`);
    }
  }
  return Array.from(alts.entries()).map(([comp, reason]) => ({ component: comp, reason }));
}

// --- Guidance YAML Fallback ---

function loadGuidanceUsage(familyName: string): UsageData | null {
  const guidanceFiles = fs.readdirSync(GUIDANCE_DIR).filter(f => f.endsWith('.yaml'));
  for (const gf of guidanceFiles) {
    const content = yaml.load(fs.readFileSync(path.join(GUIDANCE_DIR, gf), 'utf-8')) as any;
    if (!content || content.family !== familyName) continue;
    const when_to_use = (content.whenToUse || []) as string[];
    const when_not_to_use = (content.whenNotToUse || []) as string[];
    if (when_to_use.length > 0) return { when_to_use, when_not_to_use };
  }
  return null;
}

// --- Preservation Predicate ---
//
// Content-aware, not length-keyed (fix: 2026-09-14, see
// .kiro/issues/2026-09-13-component-meta-extractor-clobbers-handedits.md).
//
// BEFORE: preservation compared `existing.usage.when_to_use.length > derived.when_to_use.length`
// (and the equivalent for `alternatives`) — a sanctioned hand-edit that REWROTE entries without
// adding one, or that touched `when_not_to_use` alone, was silently clobbered by the next
// `npm run extract:meta` because the count never grew.
//
// AFTER: preservation compares full field CONTENT against what would be freshly derived. Any
// divergence — added, removed, reordered, or rewritten-in-place entries, in either field —
// is treated as a hand-edit and the whole existing `usage`/`alternatives` value is kept.
//
// This is deliberately coarse (any divergence wins, not just "richer" divergence) and does not
// distinguish "human hand-edited this" from "the family doc's derivation legitimately changed
// since the last run" — that field-grain distinction is future register/guard work per the
// issue. `purpose` and `contexts` are unconditionally derived from the family doc and never
// pass through this predicate, so legitimate regeneration of those two fields is unaffected.

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}

export function usageContentEqual(a: UsageData, b: UsageData): boolean {
  return arraysEqual(a.when_to_use, b.when_to_use) && arraysEqual(a.when_not_to_use, b.when_not_to_use);
}

export function alternativesContentEqual(a: Alternative[], b: Alternative[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((x, i) => x.component === b[i].component && x.reason === b[i].reason);
}

/**
 * Resolve the final `usage` value: preserve the existing (hand-authored) value whenever it
 * diverges in content from the freshly-derived value; otherwise use the derived value.
 */
export function resolveUsage(
  existing: UsageData | null,
  derived: UsageData,
): { usage: UsageData; preserved: boolean } {
  if (existing && !usageContentEqual(existing, derived)) {
    return { usage: existing, preserved: true };
  }
  return { usage: derived, preserved: false };
}

/**
 * Resolve the final `alternatives` value: preserve the existing (hand-authored) value whenever
 * it diverges in content from the freshly-derived value; otherwise use the derived value.
 */
export function resolveAlternatives(
  existing: Alternative[] | null,
  derived: Alternative[],
): { alternatives: Alternative[]; preserved: boolean } {
  if (existing && !alternativesContentEqual(existing, derived)) {
    return { alternatives: existing, preserved: true };
  }
  return { alternatives: derived, preserved: false };
}

// --- Preservation ---

function loadExistingMeta(componentDir: string): GeneratedMeta | null {
  const metaPath = path.join(componentDir, 'component-meta.yaml');
  if (!fs.existsSync(metaPath)) return null;
  try {
    const content = yaml.load(fs.readFileSync(metaPath, 'utf-8')) as any;
    if (!content) return null;
    return {
      purpose: content.purpose || '',
      usage: {
        when_to_use: content.usage?.when_to_use || [],
        when_not_to_use: content.usage?.when_not_to_use || [],
      },
      contexts: content.contexts || [],
      alternatives: (content.alternatives || []).map((a: any) => ({
        component: a.component,
        reason: a.reason,
      })),
    };
  } catch { return null; }
}

// --- Generation ---

function generateYaml(meta: GeneratedMeta, derivedFrom: string, familyDoc: string): string {
  const lines: string[] = [];
  const comment = derivedFrom === 'family-level'
    ? `# Derived from family-level guidance (${familyDoc})`
    : '';

  lines.push(`purpose: "${meta.purpose}"`);
  lines.push('');
  if (comment) lines.push(comment);
  lines.push('usage:');
  lines.push('  when_to_use:');
  if (meta.usage.when_to_use.length === 0) {
    lines.push('    []');
  } else {
    for (const entry of meta.usage.when_to_use) {
      lines.push(`    - "${entry.replace(/"/g, '\\"')}"`);
    }
  }
  lines.push('  when_not_to_use:');
  if (meta.usage.when_not_to_use.length === 0) {
    lines.push('    []');
  } else {
    for (const entry of meta.usage.when_not_to_use) {
      lines.push(`    - "${entry.replace(/"/g, '\\"')}"`);
    }
  }
  lines.push('');
  lines.push('contexts:');
  for (const ctx of meta.contexts) {
    lines.push(`  - "${ctx}"`);
  }
  lines.push('');
  if (meta.alternatives.length === 0) {
    lines.push('alternatives: []');
  } else {
    lines.push('alternatives:');
    for (const alt of meta.alternatives) {
      lines.push(`  - component: ${alt.component}`);
      lines.push(`    reason: "${alt.reason.replace(/"/g, '\\"')}"`);
    }
  }
  lines.push('');
  return lines.join('\n');
}

// --- Main ---

function main(): void {
  const warnings: Warning[] = [];

  // Discover all components
  const allComponents: string[] = [];
  const componentDirs = fs.readdirSync(COMPONENTS_DIR).filter(d =>
    fs.existsSync(path.join(COMPONENTS_DIR, d, 'component-meta.yaml'))
  );
  for (const dir of componentDirs) {
    allComponents.push(dir);
  }

  // Discover family docs
  const familyDocs = fs.readdirSync(STEERING_DIR)
    .filter(f => f.startsWith('Component-Family-') && f.endsWith('.md'))
    .map(f => path.join(STEERING_DIR, f));

  // Parse all family docs
  const allMetadata = new Map<string, { block: MetadataBlock; parsed: ReturnType<typeof parseFamilyDoc>; docName: string }>();

  for (const docPath of familyDocs) {
    const parsed = parseFamilyDoc(docPath);
    const docName = path.basename(docPath);
    for (const block of parsed.metadata) {
      allMetadata.set(block.component, { block, parsed, docName });
    }
  }

  // Check for components without metadata blocks
  for (const comp of allComponents) {
    if (!allMetadata.has(comp)) {
      warnings.push({ component: comp, message: `No metadata block found in any family doc` });
    }
  }

  // Generate meta files
  let generated = 0;
  for (const comp of allComponents) {
    const entry = allMetadata.get(comp);
    if (!entry) continue;

    const { block, parsed, docName } = entry;

    // Validate purpose
    const wordCount = block.purpose.split(/\s+/).length;
    if (wordCount < MIN_PURPOSE_WORDS) {
      warnings.push({ component: comp, message: `Purpose is ${wordCount} words (minimum ${MIN_PURPOSE_WORDS})` });
    }

    // Validate contexts
    for (const ctx of block.contexts) {
      if (!CONTROLLED_VOCABULARY.includes(ctx)) {
        warnings.push({ component: comp, message: `Non-vocabulary context: '${ctx}'` });
      }
    }

    // Load existing hand-authored meta for preservation comparison
    const existing = loadExistingMeta(path.join(COMPONENTS_DIR, comp));

    // Purpose + contexts: always from family doc metadata block (single source)
    // Usage + alternatives: preserve hand-authored content when it diverges from derived

    // Derive usage
    const { usage: derivedUsage, derived } = deriveUsage(
      comp, parsed.selectionTable, parsed.usage.familyWhenTo, parsed.usage.familyWhenNotTo,
      allComponents, docName,
    );

    let finalUsage = derivedUsage;
    let finalDerived = derived;

    // Preserve hand-authored usage when its content diverges from derived (content-aware,
    // not length-keyed — see the "Preservation Predicate" comment above resolveUsage()).
    const usageResolution = resolveUsage(existing ? existing.usage : null, finalUsage);
    finalUsage = usageResolution.usage;
    if (usageResolution.preserved) {
      finalDerived = 'preserved';
    }

    // Guidance YAML fallback if still empty
    if (finalUsage.when_to_use.length === 0) {
      const schemaPath = path.join(COMPONENTS_DIR, comp, `${comp}.schema.yaml`);
      if (fs.existsSync(schemaPath)) {
        const schema = yaml.load(fs.readFileSync(schemaPath, 'utf-8')) as any;
        const familyName = schema?.family;
        if (familyName) {
          const guidanceUsage = loadGuidanceUsage(familyName);
          if (guidanceUsage) {
            finalUsage = guidanceUsage;
            finalDerived = 'family-level';
          }
        }
      }
    }

    if (finalUsage.when_to_use.length === 0) {
      warnings.push({ component: comp, message: `No derived when_to_use entries — check family doc` });
    }

    // Derive alternatives
    const derivedAlternatives = deriveAlternatives(comp, parsed.selectionTable, allComponents);

    // Preserve hand-authored alternatives when their content diverges from derived
    // (content-aware, not length-keyed).
    const alternativesResolution = resolveAlternatives(existing ? existing.alternatives : null, derivedAlternatives);
    const alternatives = alternativesResolution.alternatives;

    // Validate alternative references
    for (const alt of alternatives) {
      if (!allComponents.includes(alt.component)) {
        warnings.push({ component: comp, message: `Alternatives reference non-existent component '${alt.component}'` });
      }
    }

    const meta: GeneratedMeta = {
      purpose: block.purpose,
      usage: finalUsage,
      contexts: block.contexts,
      alternatives,
    };

    const yamlContent = generateYaml(meta, finalDerived, docName);
    const outPath = path.join(COMPONENTS_DIR, comp, 'component-meta.yaml');
    fs.writeFileSync(outPath, yamlContent, 'utf-8');
    generated++;

    if (finalDerived === 'family-level') {
      console.log(`  ℹ ${comp}: usage derived from family-level guidance`);
    } else if (finalDerived === 'preserved') {
      console.log(`  ℹ ${comp}: usage preserved from hand-authored meta (diverges from derived)`);
    }
  }

  // Report
  console.log(`\n✅ Generated ${generated} component-meta.yaml files`);

  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} warning(s):\n`);
    for (const w of warnings) {
      console.log(`  ${w.component}: ${w.message}`);
    }
  } else {
    console.log('✅ No warnings');
  }
}

// CLI — run against the real repo (require.main only, never on import). Guards the pure
// preservation-predicate functions above so tests can import this module without triggering
// a full extraction run against COMPONENTS_DIR/STEERING_DIR.
if (require.main === module) {
  main();
}
