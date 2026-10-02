/**
 * Operative-set record checks — Spec 123 Task 13.3 (design C16; Req 11.6.5d).
 *
 * TWO of Task 13's nine checks (exact strings in check-catalog.ts):
 *   - WRONG CONFIRMER: a record's `confirmer:` ≠ the C1 seat of its `owner:`;
 *   - ITEM TEXT NOT VERBATIM: an item's `text` is not a verbatim substring of its canonical
 *     unit — catches paraphrase and drift; it CANNOT catch a prefix truncation, which stays the
 *     confirmer's responsibility (C16, S-D2-A1).
 * Plus the structural assertions the Task 11 precursor test makes, so 13.6 can absorb it
 * without a second definition: item ids unique per unit; `kind` one of the five; `text` a
 * non-empty string with no leading/trailing whitespace.
 *
 * Absorption map for 13.6 (the precursor `src/__tests__/operative-set-records.test.ts`):
 *   confirmer = C1 ................ checkConfirmer (here)
 *   verbatim substring ............ checkItems (here)
 *   ids unique / kind / edge ws ... checkItems (here)
 *   anchors resolve ............... the orphaned-key refusal (13.5) — skipped here
 *   fresh canonicalHash ........... the operative-set-freshness sweep (13.6)
 *   confirmation: note resolves ... the operative-set-freshness sweep (13.6)
 *
 * ITEM KINDS: the committed records and the precursor use `member`, as in Req 11.6.2
 * ("enumeration member"); design § "Data Models" writes `enumeration`. The records are the
 * confirmed artifact, so `member` is accepted here (recorded in task-13-3-completion.md).
 *
 * Scope (Task 11's own line): these establish the declared seat and verbatim text — not
 * authorship (one git identity) or completeness.
 *
 * Traces to: Req 11.5.2, 11.6.5d; design C16.
 */

import { fillTemplate, nineCheck } from './check-catalog';
import { c1Seat, PROFILE_AUTHOR } from './c1';

export const ITEM_KINDS = Object.freeze(['obligation', 'step', 'member', 'route', 'command'] as const);
export type ItemKind = (typeof ITEM_KINDS)[number];

export interface OperativeItem {
  id: string;
  kind: ItemKind;
  /** Human label only — never matched. */
  label?: string;
  /** The complete operative text — the strict comparand. */
  text: string;
}

export interface OperativeSetUnit {
  canonicalHash: string;
  items: OperativeItem[];
  confirmation: string;
}

export interface OperativeSetRecord {
  source: string;
  owner: string;
  confirmer: string;
  units: Record<string, OperativeSetUnit>;
}

export type OperativeSetCheckId = 'wrong-confirmer' | 'item-text-not-verbatim' | 'operative-set-format';

export interface OperativeSetFinding {
  check: OperativeSetCheckId;
  file: string;
  anchor?: string;
  item?: string;
  message: string;
}

export const wrongConfirmerMessage = (file: string, x: string, y: string): string =>
  fillTemplate(nineCheck('wrong-confirmer').template, { file, x, y });
export const notVerbatimMessage = (id: string, file: string, anchor: string): string =>
  fillTemplate(nineCheck('item-text-not-verbatim').template, { id, file, anchor });

/**
 * WRONG CONFIRMER: `confirmer:` must be the C1 seat of `owner:`. `file` is the record's path;
 * the catalog string's "operative set for <file>" names the canonical `source:` it is for.
 */
export function checkConfirmer(record: Pick<OperativeSetRecord, 'source' | 'owner' | 'confirmer'>, file: string, profileAuthor = PROFILE_AUTHOR): OperativeSetFinding[] {
  const required = c1Seat(String(record.owner), profileAuthor);
  return record.confirmer === required
    ? []
    : [{ check: 'wrong-confirmer', file, message: wrongConfirmerMessage(String(record.source), String(record.confirmer), required) }];
}

type UnitTexts = ReadonlyMap<string, string> | Readonly<Record<string, string>>;
const unitText = (units: UnitTexts, anchor: string): string | undefined =>
  units instanceof Map ? units.get(anchor) : Object.prototype.hasOwnProperty.call(units, anchor) ? (units as Record<string, string>)[anchor] : undefined;

/**
 * ITEM TEXT NOT VERBATIM + the structural item assertions, over every unit whose anchor names a
 * current canonical unit (`units`: anchor → exact unit text). An anchor naming nothing is the
 * orphaned-key refusal (13.5) and is skipped. `file` is the record's path; the catalog string
 * names it (the record declares the item).
 */
export function checkItems(record: Pick<OperativeSetRecord, 'units'>, file: string, units: UnitTexts): OperativeSetFinding[] {
  const findings: OperativeSetFinding[] = [];
  const format = (anchor: string, message: string, item?: string): void => {
    findings.push({ check: 'operative-set-format', file, anchor, item, message: `operative set ${file} ${anchor}: ${message}` });
  };
  for (const [anchor, unit] of Object.entries(record.units ?? {})) {
    const canonical = unitText(units, anchor);
    if (canonical === undefined) continue;
    const items = Array.isArray(unit?.items) ? unit.items : undefined;
    if (items === undefined) {
      format(anchor, 'items: must be a list (write items: [] for a zero-item unit)');
      continue;
    }
    const seen = new Set<string>();
    for (const item of items) {
      const id = typeof item?.id === 'string' ? item.id : '';
      if (id.length === 0) format(anchor, 'an item carries no id');
      else if (seen.has(id)) format(anchor, `duplicate item id ${id}`, id);
      seen.add(id);
      if (!(ITEM_KINDS as readonly unknown[]).includes(item?.kind)) {
        format(anchor, `item ${id} kind '${String(item?.kind)}' is not one of ${ITEM_KINDS.join(', ')}`, id);
      }
      const text = item?.text;
      if (typeof text !== 'string' || text.length === 0) {
        format(anchor, `item ${id} carries no text`, id);
        continue;
      }
      if (text !== text.trim()) format(anchor, `item ${id} text has leading or trailing whitespace`, id);
      if (!canonical.includes(text)) {
        findings.push({ check: 'item-text-not-verbatim', file, anchor, item: id, message: notVerbatimMessage(id, file, anchor) });
      }
    }
  }
  return findings;
}

/** Both checks over one record. */
export function checkOperativeSet(record: OperativeSetRecord, file: string, units: UnitTexts, profileAuthor = PROFILE_AUTHOR): OperativeSetFinding[] {
  return [...checkConfirmer(record, file, profileAuthor), ...checkItems(record, file, units)];
}
