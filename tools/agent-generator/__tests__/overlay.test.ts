/**
 * overlay.test.ts — Spec 123 Task 13.2: the overlay format and the STALE-OVERLAY check
 * (design C17, L-D6; one of Task 13's nine). The `derive()` refusal built on this check is
 * Task 15.2's `derive.stale-overlay.test.ts`.
 */

import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { splitFrontmatter } from '../frontmatter';
import { partition } from '../partition';
import { hashEntry, hashText } from '../regrounding/hash';
import { checkOverlayPins, OverlayFormatError, parseOverlay, toSpanOverlay } from '../regrounding/overlay';

const FILE = 'canonical/profiles/consumer/twin.overlay.md';
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');

const UNIT_A = '## Alpha\n\nSteward text for alpha.\n\n';
const UNIT_B = '### Beta\n\nSteward text for beta.\n';
const WRITE_SCOPE = 'src/__tests__/**';
const pin = (h: string) => h.replace(/^sha256:/, '');

const overlayText = (a = hashText(UNIT_A), b = hashText(UNIT_B), e = hashEntry(WRITE_SCOPE)) =>
  [
    '',
    `## @unit #alpha @ sha256:${pin(a)}`,
    '## Alpha',
    '',
    'Consumer text for alpha — an ordinary heading above stays text.',
    '',
    '```md',
    `## @unit #not-a-marker @ sha256:${'0'.repeat(64)}`,
    '```',
    '',
    `## @unit #beta @ sha256:${pin(b)}`,
    '### Beta',
    '',
    'Consumer text for beta.',
    `## @entry writeScope[src/__tests__/**] @ sha256:${pin(e)}`,
    'tests/**',
    '',
  ].join('\n');

describe('the overlay format', () => {
  it('parses unit and entry markers, byte-exact, fence-aware', () => {
    const parsed = parseOverlay(overlayText(), FILE);
    expect(Object.keys(parsed.units)).toEqual(['#alpha', '#beta']);
    expect(parsed.units['#alpha'].text).toBe(
      '## Alpha\n\nConsumer text for alpha — an ordinary heading above stays text.\n\n```md\n' +
        `## @unit #not-a-marker @ sha256:${'0'.repeat(64)}\n` +
        '```\n\n'
    );
    expect(parsed.units['#beta'].text).toBe('### Beta\n\nConsumer text for beta.\n');
    expect(parsed.entries['writeScope[src/__tests__/**]']).toEqual({ pin: hashEntry(WRITE_SCOPE), text: 'tests/**\n', line: 15 });
    expect(toSpanOverlay(parsed)).toEqual({
      units: { '#alpha': parsed.units['#alpha'].text, '#beta': parsed.units['#beta'].text },
      entries: { 'writeScope[src/__tests__/**]': 'tests/**\n' },
    });
  });

  it('refuses text before the first marker, malformed markers, duplicates and non-anchor unit keys', () => {
    const H = 'a'.repeat(64);
    const cases: [string, string][] = [
      [`stray\n## @unit #a @ sha256:${H}\nx\n`, 'text before the first @unit/@entry marker belongs to no unit'],
      [`## @unit #a @ sha256:xyz\nx\n`, "line 1: malformed marker — the form is '## @unit #<anchor> @ sha256:<64 hex>' or '## @entry <path> @ sha256:<64 hex>'"],
      [`## @unit #a @ sha256:${H}\nx\n## @unit #a @ sha256:${H}\ny\n`, 'line 3: duplicate @unit #a'],
      [`## @unit alpha @ sha256:${H}\nx\n`, "line 1: a unit key is a partition anchor starting with '#' (got alpha)"],
    ];
    for (const [text, message] of cases) {
      expect(() => parseOverlay(text, FILE)).toThrow(OverlayFormatError);
      expect(() => parseOverlay(text, FILE)).toThrow(`overlay ${FILE}: ${message}`);
    }
  });
});

describe('the stale-overlay check — one of Task 13\'s nine', () => {
  const canonical = { units: { '#alpha': UNIT_A, '#beta': UNIT_B }, entries: { 'writeScope[src/__tests__/**]': WRITE_SCOPE } };

  it('passes when every pin equals the current canonical hash', () => {
    expect(checkOverlayPins(parseOverlay(overlayText(), FILE), canonical)).toEqual([]);
  });

  it('stale overlay (nine-check) refuses a pin that differs from the current canonical, with the exact string', () => {
    const edited = { ...canonical, units: { ...canonical.units, '#beta': UNIT_B.replace('beta.', 'beta, edited.') } };
    const findings = checkOverlayPins(parseOverlay(overlayText(), FILE), edited);
    expect(findings).toHaveLength(1);
    expect(findings[0]).toMatchObject({ check: 'stale-overlay', file: FILE, key: '#beta' });
    expect(findings[0].message).toBe(
      `overlay for #beta re-grounds canonical text sha256:${pin(hashText(UNIT_B))}, but the current canonical is sha256:${pin(
        hashText(edited.units['#beta'])
      )} — re-author the overlay; refusing to derive`
    );
  });

  it('refuses a stale frontmatter-entry pin too', () => {
    const findings = checkOverlayPins(parseOverlay(overlayText(), FILE), {
      ...canonical,
      entries: { 'writeScope[src/__tests__/**]': 'src/__tests__/unit/**' },
    });
    expect(findings.map((f) => `${f.check} ${f.key}`)).toEqual(['stale-overlay writeScope[src/__tests__/**]']);
  });

  it('pins entries by canonical JSON — key order never stales a pin', () => {
    expect(hashEntry({ name: 'x', cmd: 'y' })).toBe(hashEntry({ cmd: 'y', name: 'x' }));
  });

  it('leaves a key naming no current unit to the orphaned-key refusal (13.5)', () => {
    expect(checkOverlayPins(parseOverlay(overlayText(), FILE), { units: { '#alpha': UNIT_A }, entries: {} })).toEqual([]);
  });

  it('uses the same unit hash as the C16 records (stacy.md #what-parity-means)', () => {
    const record = loadYaml(fs.readFileSync(path.join(REPO_ROOT, 'canonical/operative-sets/stacy.yaml'), 'utf8')) as {
      units: Record<string, { canonicalHash: string }>;
    };
    const unit = partition(splitFrontmatter(fs.readFileSync(path.join(REPO_ROOT, 'canonical/agents/stacy.md'), 'utf8')).body).units.find(
      (u) => u.anchor === '#what-parity-means'
    );
    expect(unit).toBeDefined();
    expect(hashText(unit!.text)).toBe(record.units['#what-parity-means'].canonicalHash);
  });
});
