/**
 * The overlay format and the stale-overlay check — Spec 123 Task 13.2 (design C17, L-D6
 * adopted verbatim; C22).
 *
 * An overlay carries the RE-GROUNDED text of each re-pointed unit or frontmatter entry, and
 * PINS the canonical text it re-grounds:
 *
 *   ## @unit #<anchor> @ sha256:<canonicalHash>
 *   <the re-grounded unit text, verbatim, up to the next marker>
 *   ## @entry <entry path> @ sha256:<entryHash>
 *   <the re-grounded entry text>
 *
 * Files: `canonical/profiles/consumer/<agent>.overlay.md`, and
 * `canonical/profiles/consumer/always-set/<id>.overlay.md` (C19).
 *
 * GRAMMAR (decidable, fence-aware):
 *   - a MARKER is a line matching {@link MARKER} OUTSIDE a ``` / ~~~ fence. Any other line —
 *     including an ordinary `## Heading` inside re-grounded text — is body text;
 *   - an entry's text is every byte after its marker line up to the next marker line (or EOF),
 *     verbatim: trailing blank lines belong to the entry, exactly as a partition() unit carries
 *     its trailing whitespace;
 *   - only whitespace may precede the first marker (text there would belong to no unit);
 *   - a key appears once per kind; `<anchor>` starts with `#`; the pin is `sha256:` + 64 hex.
 *
 * THE STALE-OVERLAY CHECK (one of Task 13's nine): a pin that differs from the CURRENT hash of
 * its canonical unit (`hashText(unit.text)`) or entry (`hashEntry(value)`) refuses with the
 * catalog string. This makes the overlay derived rather than hand-maintained — an edit to a
 * re-pointed unit forces re-authoring even when the unit would clear C18 (L-D6). Wiring the
 * refusal into `derive()` is Task 15.2 (`derive.stale-overlay.test.ts`, design § "Testing
 * Strategy"); this module is the check it calls.
 *
 * NOT HERE: a pin whose key names no current unit or entry is the ORPHANED-KEY refusal
 * (Task 13.5) — `checkOverlayPins` skips it rather than guess.
 *
 * Traces to: design C17 (L-D6), C19, C22; Req 14.8–14.9.
 */

import type { Overlay } from '../spans';
import { fillTemplate, nineCheck } from './check-catalog';
import { hashEntry, hashText, hexOf } from './hash';

/** The marker line. Group 1 = kind, 2 = key, 3 = hex. */
export const MARKER = /^## @(unit|entry) (\S+) @ sha256:([0-9a-f]{64})$/;
/** A line that LOOKS like a marker attempt — refused if it does not match {@link MARKER}. */
const MARKER_ATTEMPT = /^## @(?:unit|entry)\b/;
const FENCE = /^(```|~~~)/;

export interface OverlayEntry {
  /** `sha256:<hex>` — the canonical hash this text re-grounds. */
  pin: string;
  /** The re-grounded text, verbatim. */
  text: string;
  /** 1-based line of the marker. */
  line: number;
}

export interface ParsedOverlay {
  file: string;
  units: Record<string, OverlayEntry>;
  entries: Record<string, OverlayEntry>;
}

export type OverlayCheckId = 'stale-overlay' | 'overlay-format';

export interface OverlayFinding {
  check: OverlayCheckId;
  file: string;
  key?: string;
  message: string;
}

export class OverlayFormatError extends Error {
  constructor(readonly findings: readonly OverlayFinding[]) {
    super(findings.map((f) => f.message).join('\n'));
    this.name = 'OverlayFormatError';
  }
}

/** Parse an overlay file. Throws {@link OverlayFormatError} carrying every format finding. */
export function parseOverlay(text: string, file: string): ParsedOverlay {
  const findings: OverlayFinding[] = [];
  const fail = (message: string, key?: string): void => {
    findings.push({ check: 'overlay-format', file, key, message: `overlay ${file}: ${message}` });
  };
  const out: ParsedOverlay = { file, units: {}, entries: {} };

  // Split into lines KEEPING terminators, so entry text is byte-exact.
  const lines = text.match(/[^\n]*\n|[^\n]+$/g) ?? [];
  let fence: string | undefined;
  let current: { kind: 'unit' | 'entry'; key: string; entry: OverlayEntry } | undefined;
  let preamble = '';

  lines.forEach((raw, i) => {
    const line = raw.replace(/\r?\n$/, '');
    const fenceMatch = FENCE.exec(line);
    const marker = fence === undefined ? MARKER.exec(line) : null;
    if (marker) {
      const [, kind, key, hex] = marker as unknown as [string, 'unit' | 'entry', string, string];
      const table = kind === 'unit' ? out.units : out.entries;
      if (kind === 'unit' && !key.startsWith('#')) fail(`line ${i + 1}: a unit key is a partition anchor starting with '#' (got ${key})`, key);
      if (key in table) fail(`line ${i + 1}: duplicate @${kind} ${key}`, key);
      current = { kind, key, entry: { pin: `sha256:${hex}`, text: '', line: i + 1 } };
      table[key] = current.entry;
      return;
    }
    if (fence === undefined && MARKER_ATTEMPT.test(line)) {
      fail(`line ${i + 1}: malformed marker — the form is '## @unit #<anchor> @ sha256:<64 hex>' or '## @entry <path> @ sha256:<64 hex>'`);
    }
    if (fenceMatch) fence = fence === undefined ? fenceMatch[1] : line.startsWith(fence) ? undefined : fence;
    if (current) current.entry.text += raw;
    else preamble += raw;
  });

  if (preamble.trim().length > 0) fail('text before the first @unit/@entry marker belongs to no unit');
  if (findings.length > 0) throw new OverlayFormatError(findings);
  return out;
}

/** The parsed overlay in the shape `emitSpans` reads (spans.ts `Overlay`). */
export function toSpanOverlay(parsed: ParsedOverlay): Overlay {
  const pick = (t: Record<string, OverlayEntry>) => Object.fromEntries(Object.entries(t).map(([k, e]) => [k, e.text]));
  return { units: pick(parsed.units), entries: pick(parsed.entries) };
}

/** The CURRENT canonical content a pin is compared against. */
export interface CanonicalContent {
  /** Canonical body units, by anchor → exact unit text. */
  units?: ReadonlyMap<string, string> | Readonly<Record<string, string>>;
  /** Canonical frontmatter entries, by entry path → value. */
  entries?: ReadonlyMap<string, unknown> | Readonly<Record<string, unknown>>;
}

const lookup = <V>(table: ReadonlyMap<string, V> | Readonly<Record<string, V>> | undefined, key: string): V | undefined =>
  table === undefined ? undefined : table instanceof Map ? table.get(key) : (table as Record<string, V>)[key];
const has = (table: ReadonlyMap<string, unknown> | Readonly<Record<string, unknown>> | undefined, key: string): boolean =>
  table === undefined ? false : table instanceof Map ? table.has(key) : Object.prototype.hasOwnProperty.call(table, key);

/** The stale-overlay message (catalog string). `pinned` / `now` are `sha256:<hex>` hashes. */
export const staleOverlayMessage = (key: string, pinned: string, now: string): string =>
  fillTemplate(nineCheck('stale-overlay').template, { 'anchor|entry': key, pinned: hexOf(pinned), now: hexOf(now) });

/**
 * The stale-overlay check: every pin must equal the current hash of its canonical unit or
 * entry. Keys naming nothing current are skipped (the orphaned-key refusal, Task 13.5).
 */
export function checkOverlayPins(overlay: ParsedOverlay, canonical: CanonicalContent): OverlayFinding[] {
  const findings: OverlayFinding[] = [];
  for (const [anchor, entry] of Object.entries(overlay.units)) {
    const text = lookup(canonical.units, anchor);
    if (text === undefined) continue;
    const now = hashText(text);
    if (now !== entry.pin) findings.push({ check: 'stale-overlay', file: overlay.file, key: anchor, message: staleOverlayMessage(anchor, entry.pin, now) });
  }
  for (const [path, entry] of Object.entries(overlay.entries)) {
    if (!has(canonical.entries, path)) continue;
    const now = hashEntry(lookup(canonical.entries, path));
    if (now !== entry.pin) findings.push({ check: 'stale-overlay', file: overlay.file, key: path, message: staleOverlayMessage(path, entry.pin, now) });
  }
  return findings;
}
