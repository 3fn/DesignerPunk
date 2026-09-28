/**
 * signatures.test.ts — Spec 123 Tasks 13.2 / 13.3: the signature format and three of Task 13's
 * nine checks — bare and stale (13.2), wrong signer (13.3). Design C17, § "Testing Strategy"
 * (`signatures.test.ts` — "wrong signer; hash drift; no assent → three reds").
 */

import { c1Seat } from '../regrounding/c1';
import {
  checkDispositionSigners,
  checkSignatureFreshness,
  checkSigner,
  ownerOf,
  validateSignatureFormat,
} from '../regrounding/signatures';

const H1 = `sha256:${'1'.repeat(64)}`;
const H2 = `sha256:${'2'.repeat(64)}`;
const H3 = `sha256:${'3'.repeat(64)}`;
const base = { signer: 'stacy', canonicalHash: H1, renderedHash: H2, evidence: 'canonical/profiles/consumer/signatures/stacy.md#a' };
const ids = (fs: { check: string }[]) => fs.map((f) => f.check);

describe('the C1 seat function (Req 11.5.2)', () => {
  it('is the owner, the counterpart seat for the profile author, peter on collapse', () => {
    expect(c1Seat('lina')).toBe('lina');
    expect(c1Seat('stacy')).toBe('stacy');
    expect(c1Seat('thurgood')).toBe('stacy');
    expect(c1Seat('stacy', 'stacy', 'stacy')).toBe('peter');
  });
});

describe('signature format (13.2)', () => {
  it('accepts itemized assent, an empty itemization, and a refusal', () => {
    expect(validateSignatureFormat({ ...base, assent: { surviving: ['i-1', 'i-2'] } }, '#a', ['i-1', 'i-2', 'i-3'])).toEqual([]);
    expect(validateSignatureFormat({ ...base, assent: { surviving: [] } }, '#a')).toEqual([]);
    expect(validateSignatureFormat({ ...base, refuse: 'should-re-point' }, '#a')).toEqual([]);
  });

  it('refuses malformed signatures', () => {
    expect(ids(validateSignatureFormat('yes', '#a'))).toEqual(['signature-format']);
    const bad = validateSignatureFormat(
      { signer: '', canonicalHash: 'sha256:0', renderedHash: H2, evidence: '', assent: { surviving: ['x', 'x', 7] }, refuse: 'nope', note: 1 },
      '#a',
      ['y']
    );
    expect(bad.map((f) => f.message)).toEqual([
      "signature on #a: unknown field 'note' — allowed: signer, canonicalHash, renderedHash, assent, refuse, evidence",
      'signature on #a: names no signer',
      'signature on #a: canonicalHash must be sha256:<64 lowercase hex> (got sha256:0)',
      'signature on #a: names no evidence note',
      'signature on #a: carries both assent and refuse — a signer assents or refuses, not both',
      'signature on #a: refuse must be should-re-point (got nope)',
      'signature on #a: assent.surviving names x, which is not an operative item of this unit',
      'signature on #a: assent.surviving lists x twice',
      'signature on #a: assent.surviving holds a non-id value (7)',
    ]);
  });
});

describe('bare signature — one of Task 13\'s nine (13.2)', () => {
  it('bare signature (nine-check) refuses a signature with neither itemized assent nor refuse, with the exact string', () => {
    const findings = validateSignatureFormat(base, '#the-owed-set-pipeline');
    expect(findings).toEqual([
      {
        check: 'bare-signature',
        anchor: '#the-owed-set-pipeline',
        message: 'signature on #the-owed-set-pipeline carries no itemized assent — list the surviving item ids or refuse',
      },
    ]);
  });

  it('treats an assent with no surviving list as bare', () => {
    expect(ids(validateSignatureFormat({ ...base, assent: {} }, '#a'))).toEqual(['bare-signature', 'signature-format']);
  });
});

describe('stale signature — one of Task 13\'s nine (13.2)', () => {
  it('stale signature (nine-check) refuses when either hash drifted since signing, with the exact string', () => {
    const message = 'signature on #a is stale — its canonical or rendered content changed since signing; re-sign or refuse';
    expect(checkSignatureFreshness(base, '#a', { canonicalHash: H1, renderedHash: H2 })).toEqual([]);
    expect(checkSignatureFreshness(base, '#a', { canonicalHash: H3, renderedHash: H2 })).toEqual([{ check: 'stale-signature', anchor: '#a', message }]);
    expect(checkSignatureFreshness(base, '#a', { canonicalHash: H1, renderedHash: H3 })).toEqual([{ check: 'stale-signature', anchor: '#a', message }]);
  });
});

describe('wrong signer — one of Task 13\'s nine (13.3)', () => {
  it('wrong signer (nine-check) refuses a signer that is not the C1 seat, with the exact string', () => {
    // consumer-Thurgood's rows are signed by Stacy (Req 11.5.2), never by the profile author.
    expect(checkSigner({ signer: 'stacy' }, '#purpose', 'thurgood')).toEqual([]);
    expect(checkSigner({ signer: 'thurgood' }, '#purpose', 'thurgood')).toEqual([
      {
        check: 'wrong-signer',
        anchor: '#purpose',
        message: 'signature on #purpose is by thurgood; the C1 rule requires stacy (owner thurgood, profile author thurgood)',
      },
    ]);
    // Any other charter is signed by its owner, not by the counterpart seat.
    expect(checkSigner({ signer: 'lina' }, '#x', 'lina')).toEqual([]);
    expect(ids(checkSigner({ signer: 'stacy' }, '#x', 'lina'))).toEqual(['wrong-signer']);
  });

  it('resolves the owner of a charter, a shared member and an identity doc', () => {
    const ctx = { sharedOwners: { 'complete-task-tooling': 'thurgood' }, recordOwners: { '.kiro/steering/start-up-tasks.md': 'thurgood' } };
    expect(ownerOf('canonical/agents/lina.md', undefined, ctx)).toBe('lina');
    expect(ownerOf('canonical/shared/shared-catalog.yaml', 'complete-task-tooling', ctx)).toBe('thurgood');
    expect(ownerOf('.kiro/steering/start-up-tasks.md', undefined, ctx)).toBe('thurgood');
    expect(ownerOf('.kiro/steering/unknown.md', undefined, ctx)).toBeUndefined();
  });

  it('checks every signed row of a dispositions file', () => {
    const sig = (signer: string) => ({ signature: { ...base, signer } });
    const findings = checkDispositionSigners(
      { source: 'canonical/agents/thurgood.md', body: { '#a': sig('stacy'), '#b': sig('thurgood'), '#c': {} }, frontmatter: { 'commands[x]': sig('peter') } },
      {}
    );
    expect(findings.map((f) => `${f.check} ${f.anchor}`)).toEqual(['wrong-signer #b', 'wrong-signer commands[x]']);
    const shared = checkDispositionSigners(
      { source: 'canonical/shared/shared-catalog.yaml', members: { m: sig('thurgood'), n: sig('stacy') } },
      { sharedOwners: { m: 'thurgood' } }
    );
    expect(shared.map((f) => `${f.check} ${f.anchor}`)).toEqual(['wrong-signer m', 'signature-format n']);
  });
});
