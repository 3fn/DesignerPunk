/**
 * Parity normalization rules (Spec 118, Increment 2 — Task 7.2 / R4 AC4).
 *
 * The Increment-2 parity harness compares two FRESH token trees produced by the
 * SAME generator script under two different runtime mechanisms (ts-node vs tsx)
 * from a scratch cwd (no config → DEFAULTS). The single variable is the runtime
 * loader, so any *semantic* divergence between the two trees would be evidence of
 * a resolution-dependent generation difference.
 *
 * 117's `DEFAULT_NORMALIZATION_RULES` already neutralize EVERY divergence observed
 * under DEFAULTS today — the only raw differences are volatile timestamps:
 *   - the `Generated:` header lines in CSS / Swift (`///`) / Kotlin  → stripped by the
 *     text-kind ISO-datetime line filter,
 *   - the DTCG `generatedAt` field → stripped by VOLATILE_KEYS.
 * So post-normalization the two trees are semantically EQUAL across all 11
 * non-optional artifacts with 117's defaults alone.
 *
 * The rules ADDED here are DEFENSIVE / class-completeness rules (R4 AC4: an open,
 * evidence-driven set, not a closed list). They do NOT change today's all-green
 * result under DEFAULTS, but they neutralize false-diff vectors that a parity run
 * under different conditions WOULD surface:
 *   - a bumped `package.json` version (→ different `rosettaVersion`),
 *   - a future bump of the embedded DTCG `version`,
 *   - registered themes present and/or ordered differently between the two runs
 *     (the `extensions.themes` array — conditionally present AND positionally
 *     compared by `SemanticComparator`).
 *
 * Discipline (117's, preserved): each rule is SURGICAL — it neutralizes its named
 * field and nothing else. A changed `rosettaVersion` is ignored; a changed token
 * VALUE is NOT. Every rule carries its own unit test proving both halves.
 *
 * Composition, NOT mutation (cross-spec coherence): we EXTEND 117's exported
 * `DEFAULT_NORMALIZATION_RULES` into a new exported constant. 117's default is
 * left intact — mutating it in place would be a cross-spec regression.
 */

import { DEFAULT_NORMALIZATION_RULES } from './Normalizer';
import { NormalizationRule } from './types';

/**
 * Keys in the DTCG `$extensions.designerpunk` block that are environment- /
 * package-volatile rather than token-semantic. Stripped wherever they appear in
 * the parsed JSON structure (the block only occurs under `$extensions.designerpunk`,
 * but a recursive strip is safe — these names do not collide with token data).
 *
 * - `rosettaVersion`  — read from `package.json` at runtime
 *   (`DTCGFormatGenerator.ts:226-237`). Differs whenever the package version is
 *   bumped between two parity runs. NOT a token-semantic field.
 * - `version`         — the embedded DTCG format/generator version literal
 *   (`'1.0.0'`, `DTCGFormatGenerator.ts:235`). Constant today, but it is an
 *   embedded-version field of the same class as `rosettaVersion`; a future bump
 *   would false-diff. Added for class-completeness (justification: same
 *   embedded-version class; not a token value).
 */
const PARITY_VOLATILE_DTCG_KEYS = new Set(['rosettaVersion', 'version']);

/**
 * Surgical recursive strip of the parity-volatile DTCG version keys.
 *
 * Surgical guarantee: only the exact key NAMES in PARITY_VOLATILE_DTCG_KEYS are
 * dropped. Token data ($value, $type, formula, baseValue, etc.) is untouched, so
 * a genuine token-value change still surfaces as a divergence.
 */
function stripParityVolatileKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripParityVolatileKeys);
  }
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (PARITY_VOLATILE_DTCG_KEYS.has(key)) continue;
      out[key] = stripParityVolatileKeys(child);
    }
    return out;
  }
  return value;
}

/**
 * Canonicalize the DTCG `$extensions.designerpunk.themes` array so neither its
 * CONDITIONAL PRESENCE nor its ORDERING produces a false divergence.
 *
 * Two false-diff vectors, both real (Ada MF-3):
 *  1. Conditional presence — `themes` is emitted ONLY behind
 *     `registeredThemes.length > 0` (`DTCGFormatGenerator.ts:241-242`). Two parity
 *     runs that differ in whether themes are registered would diff on presence.
 *     We canonicalize by DROPPING an empty/absent `themes` to a stable "absent"
 *     (delete the key), so present-empty and absent compare equal.
 *  2. Array ordering — `SemanticComparator` compares arrays POSITIONALLY
 *     (`SemanticComparator.ts:46-52`). The registered-theme set is order-insensitive
 *     metadata (`Array<{ name, mode }>`); a reordering between runs is not a
 *     semantic difference. We sort the entries by a stable `name|mode` key.
 *
 * Surgical guarantee: this rule touches ONLY `$extensions.designerpunk.themes`.
 * The entries themselves are preserved (only reordered); a genuine change to a
 * theme's name/mode (a real metadata change) still surfaces, because sorting two
 * differing sets yields different sorted arrays.
 */
function canonicalizeThemes(value: unknown): unknown {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return value;
  const root = value as Record<string, unknown>;
  const ext = root['$extensions'];
  if (ext === null || typeof ext !== 'object' || Array.isArray(ext)) return value;
  const dp = (ext as Record<string, unknown>)['designerpunk'];
  if (dp === null || typeof dp !== 'object' || Array.isArray(dp)) return value;
  const dpObj = dp as Record<string, unknown>;

  if (!('themes' in dpObj)) return value; // already absent → canonical
  const themes = dpObj['themes'];

  // Conditional-presence canonicalization: an empty themes array ≡ absent.
  if (Array.isArray(themes) && themes.length === 0) {
    delete dpObj['themes'];
    return value;
  }

  // Array-ordering canonicalization: sort by a stable derived key.
  if (Array.isArray(themes)) {
    dpObj['themes'] = [...themes].sort((a, b) => themeSortKey(a).localeCompare(themeSortKey(b)));
  }
  return value;
}

/** Stable sort key for a theme entry; tolerant of unexpected shapes. */
function themeSortKey(entry: unknown): string {
  if (entry !== null && typeof entry === 'object' && !Array.isArray(entry)) {
    const e = entry as Record<string, unknown>;
    return `${String(e['name'] ?? '')}|${String(e['mode'] ?? '')}`;
  }
  return JSON.stringify(entry);
}

/**
 * The added 118-parity rules — each individually unit-tested
 * (`__tests__/ParityNormalizationRules.test.ts`).
 *
 * NOTE on `duration` / build-timing fields: enumerated from actual two-mechanism
 * output and CONFIRMED ABSENT from the on-disk artifacts. The only `duration`
 * matches are the animation `duration*` DESIGN TOKENS (the iOS `Duration` enum,
 * `duration150/250/350`) — token VALUES that MUST NOT be normalized. No
 * build-timing/elapsed field is written to any artifact, so no `duration` rule is
 * added (adding one would risk eating a real token).
 */
export const ADDED_PARITY_RULES: NormalizationRule[] = [
  {
    appliesTo: ['json'],
    description:
      'Spec 118 parity: strip the volatile DTCG version keys (rosettaVersion read from package.json; embedded version literal) so a package/format version bump between the two parity runs is not a false divergence. Surgical — only those key names; token data untouched.',
    apply: (value) => stripParityVolatileKeys(value),
  },
  {
    appliesTo: ['json'],
    description:
      'Spec 118 parity: canonicalize $extensions.designerpunk.themes — drop empty/absent to a stable absent (conditional-presence false-diff vector) and sort entries by name|mode (positional-array false-diff vector). Surgical — touches only the themes array; entry content preserved.',
    apply: (value) => canonicalizeThemes(value),
  },
];

/**
 * The parity rule set: 117's defaults FIRST (so timestamps/generatedAt are
 * already stripped), THEN the 118 additions. Composition, not mutation — 117's
 * exported default is untouched.
 */
export const PARITY_NORMALIZATION_RULES: NormalizationRule[] = [
  ...DEFAULT_NORMALIZATION_RULES,
  ...ADDED_PARITY_RULES,
];
