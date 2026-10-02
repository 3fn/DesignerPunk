/**
 * The signature format and its checks — Spec 123 Tasks 13.2 (format; stale; bare) and 13.3
 * (signer). Design C17 (valves 1–2), Req 11.5.2, 11.5.4, 11.5.6; S-D-A2, S-D-B1.
 *
 * A ROUTED disposition row carries a per-row signature:
 *
 * ```yaml
 * signature:
 *   signer: stacy                          # C1 (13.3's wrong-signer check)
 *   canonicalHash: sha256:<64 hex>         # VALVE 1 — the canonical unit/entry as of signing
 *   renderedHash: sha256:<64 hex>          # VALVE 1 — the rendered unit/entry as of signing
 *   assent: { surviving: [owed-set-1, …] } # VALVE 2 — itemized; OR
 *   refuse: should-re-point                # the one-flag return (Req 11.5.4)
 *   evidence: canonical/profiles/consumer/signatures/<agent>.md#<anchor>
 * ```
 *
 * THREE of Task 13's nine checks live here (exact strings in check-catalog.ts):
 *   - BARE signature (13.2): neither `assent.surviving` (a list) nor `refuse` — context-free, so
 *     `validateDispositions` runs it on every signature and it cannot be skipped;
 *   - STALE signature (13.2): either hash differs from the CURRENT canonical / rendered hash —
 *     needs the current content, so it is `checkSignatureFreshness`;
 *   - WRONG SIGNER (13.3): `signer` ≠ the C1 seat of (owner, profile author).
 * An empty `surviving: []` is itemized (it says nothing survived) and is not bare.
 *
 * Format findings (not among the nine): unknown field; missing or malformed signer / hash /
 * evidence; both assent and refuse; a refuse value other than `should-re-point`; surviving ids
 * that are not strings, repeat, or (when the unit's operative set is supplied) name no item.
 *
 * NOT HERE: whether a row must carry a signature (present iff ROUTED — C18's outcome, checked
 * over the real profile at Task 15.5); whether `evidence` resolves to a committed note; whether
 * the assent is TRUE (Stacy's audit side, Req 11.5.7).
 *
 * Traces to: Req 11.5.2, 11.5.4, 11.5.6; design C17.
 */

import { fillTemplate, nineCheck } from './check-catalog';
import { c1Seat, PROFILE_AUTHOR } from './c1';
import { isHash } from './hash';

export const REFUSE_VALUES = Object.freeze(['should-re-point'] as const);
export type RefuseValue = (typeof REFUSE_VALUES)[number];

export interface Signature {
  signer: string;
  canonicalHash: string;
  renderedHash: string;
  assent?: { surviving: string[] };
  refuse?: RefuseValue;
  evidence: string;
}

const SIGNATURE_FIELDS = Object.freeze(['signer', 'canonicalHash', 'renderedHash', 'assent', 'refuse', 'evidence']);

export type SignatureCheckId = 'bare-signature' | 'stale-signature' | 'wrong-signer' | 'signature-format';

export interface SignatureFinding {
  check: SignatureCheckId;
  /** The unit anchor or entry path the signed row keys. */
  anchor: string;
  message: string;
}

const isMap = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

export const bareSignatureMessage = (anchor: string): string => fillTemplate(nineCheck('bare-signature').template, { anchor });
export const staleSignatureMessage = (anchor: string): string => fillTemplate(nineCheck('stale-signature').template, { anchor });
export const wrongSignerMessage = (anchor: string, x: string, y: string, o: string, p: string): string =>
  fillTemplate(nineCheck('wrong-signer').template, { anchor, x, y, o, p });

/**
 * Validate a signature's format and run the BARE check. `items`, when supplied, is the signed
 * unit's operative-set item ids — surviving ids must name them.
 */
export function validateSignatureFormat(sig: unknown, anchor: string, items?: readonly string[]): SignatureFinding[] {
  const findings: SignatureFinding[] = [];
  const format = (message: string): void => {
    findings.push({ check: 'signature-format', anchor, message: `signature on ${anchor}: ${message}` });
  };
  if (!isMap(sig)) {
    format('a signature is a mapping (signer, canonicalHash, renderedHash, assent | refuse, evidence)');
    return findings;
  }
  for (const field of Object.keys(sig)) {
    if (!SIGNATURE_FIELDS.includes(field)) format(`unknown field '${field}' — allowed: ${SIGNATURE_FIELDS.join(', ')}`);
  }
  if (typeof sig.signer !== 'string' || sig.signer.length === 0) format('names no signer');
  for (const h of ['canonicalHash', 'renderedHash'] as const) {
    if (!isHash(sig[h])) format(`${h} must be sha256:<64 lowercase hex> (got ${String(sig[h])})`);
  }
  if (typeof sig.evidence !== 'string' || sig.evidence.length === 0) format('names no evidence note');

  const surviving = isMap(sig.assent) ? sig.assent.surviving : undefined;
  const hasAssent = Array.isArray(surviving);
  const hasRefuse = sig.refuse !== undefined;

  if (!hasAssent && !hasRefuse) {
    findings.push({ check: 'bare-signature', anchor, message: bareSignatureMessage(anchor) });
  }
  if (hasAssent && hasRefuse) format('carries both assent and refuse — a signer assents or refuses, not both');
  if (sig.assent !== undefined && (!isMap(sig.assent) || !hasAssent || Object.keys(sig.assent).some((k) => k !== 'surviving'))) {
    format("assent carries exactly one field, 'surviving' (a list of item ids)");
  }
  if (hasRefuse && !(REFUSE_VALUES as readonly unknown[]).includes(sig.refuse)) {
    format(`refuse must be ${REFUSE_VALUES.join(' | ')} (got ${String(sig.refuse)})`);
  }
  if (hasAssent) {
    const ids = surviving as unknown[];
    const seen = new Set<string>();
    for (const id of ids) {
      if (typeof id !== 'string' || id.length === 0) {
        format(`assent.surviving holds a non-id value (${String(id)})`);
        continue;
      }
      if (seen.has(id)) {
        format(`assent.surviving lists ${id} twice`);
        continue;
      }
      seen.add(id);
      if (items && !items.includes(id)) format(`assent.surviving names ${id}, which is not an operative item of this unit`);
    }
  }
  return findings;
}

/** The current hashes a signature is compared against (VALVE 1: carry-forward keyed to content). */
export interface CurrentHashes {
  canonicalHash: string;
  renderedHash: string;
}

/** STALE: either hash differs from current → re-sign or refuse (only the delta is re-judged). */
export function checkSignatureFreshness(sig: Pick<Signature, 'canonicalHash' | 'renderedHash'>, anchor: string, current: CurrentHashes): SignatureFinding[] {
  return sig.canonicalHash === current.canonicalHash && sig.renderedHash === current.renderedHash
    ? []
    : [{ check: 'stale-signature', anchor, message: staleSignatureMessage(anchor) }];
}

/** WRONG SIGNER: the signer must be the C1 seat of (owner, profile author). */
export function checkSigner(sig: Pick<Signature, 'signer'>, anchor: string, owner: string, profileAuthor = PROFILE_AUTHOR): SignatureFinding[] {
  const required = c1Seat(owner, profileAuthor);
  return sig.signer === required
    ? []
    : [{ check: 'wrong-signer', anchor, message: wrongSignerMessage(anchor, String(sig.signer), required, owner, profileAuthor) }];
}

// ============================================================================
// Signer check over a dispositions file (13.3) — owner resolution
// ============================================================================

export const SHARED_CATALOG_SOURCE = 'canonical/shared/shared-catalog.yaml';

export interface OwnerContext {
  /** Shared-catalog member id → its `owner:` field. */
  sharedOwners?: Readonly<Record<string, string>>;
  /** Canonical source path → owner, from the operative-set records (identity docs). */
  recordOwners?: Readonly<Record<string, string>>;
}

/**
 * The owning agent of a signed row: a charter's agent (`canonical/agents/<a>.md` → `a`); a
 * shared-catalog member's `owner:`; otherwise the owner the operative-set record for that
 * source declares. `undefined` when none resolves.
 */
export function ownerOf(source: string, memberId: string | undefined, ctx: OwnerContext = {}): string | undefined {
  const charter = /^canonical\/agents\/([^/]+)\.md$/.exec(source);
  if (charter) return charter[1];
  if (source === SHARED_CATALOG_SOURCE) return memberId === undefined ? undefined : ctx.sharedOwners?.[memberId];
  return ctx.recordOwners?.[source];
}

interface SignedRows {
  source: string;
  body?: Record<string, { signature?: unknown }>;
  frontmatter?: Record<string, { signature?: unknown }>;
  members?: Record<string, { signature?: unknown }>;
}

/** Run the WRONG-SIGNER check on every signed row of a dispositions file. */
export function checkDispositionSigners(doc: SignedRows, ctx: OwnerContext = {}, profileAuthor = PROFILE_AUTHOR): SignatureFinding[] {
  const findings: SignatureFinding[] = [];
  const sections: [Record<string, { signature?: unknown }> | undefined, boolean][] = [
    [doc.body, false],
    [doc.frontmatter, false],
    [doc.members, true],
  ];
  for (const [rows, isMember] of sections) {
    for (const [key, row] of Object.entries(rows ?? {})) {
      const sig = row?.signature;
      if (!isMap(sig) || typeof sig.signer !== 'string') continue; // absent or malformed: format's job
      const owner = ownerOf(doc.source, isMember ? key : undefined, ctx);
      if (owner === undefined) {
        findings.push({
          check: 'signature-format',
          anchor: key,
          message: `signature on ${key}: cannot resolve the owner of ${doc.source} — the C1 signer check needs it`,
        });
        continue;
      }
      findings.push(...checkSigner({ signer: sig.signer }, key, owner, profileAuthor));
    }
  }
  return findings;
}
