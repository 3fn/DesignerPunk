/**
 * Invariants — the absolute correctness-property assertions (Spec 117, Task 5.1).
 *
 * The committed-vs-fresh re-diff (GenerationIntegrityCheck) catches DRIFT — where
 * fresh differs from committed. But two of this spec's correctness properties are
 * *absolute* invariants the re-diff cannot catch, because committed and fresh
 * reproduce each other and the defect (if any) is intrinsic to BOTH sides:
 *
 *   - P3 (no legacy color format): a color primitive carrying rgba() instead of
 *     OKLCH is wrong even when committed == fresh — the re-diff is silent on it.
 *     This is exactly how Finding 1 hid (216 rgba in both committed and fresh).
 *
 *   - P5 (theme-varying rule): the index's `themeVarying` set must be the
 *     dist base-mode set (5 keys), NOT the registry-wide set (10 keys). A future
 *     "simplification" that pipes the registry-wide Set through to the index would
 *     reproduce identically committed-vs-fresh while silently re-breaking R5.
 *     (§4.1 residual risk, Task 3 completion.)
 *
 * These functions parse the token-index YAML and assert the properties directly.
 * They are pure (YAML-string in, result out) so each is unit-tested in isolation.
 *
 * SCOPING (ratified by Peter 2026-06-24, Task 3): P3's "no rgba" is scoped to
 * OKLCH-MIGRATED color primitives. The shadow color family (shadowBlack/Blue/
 * Orange/Gray100) was never migrated to OKLCH by Spec 112 (no channel tokens;
 * dist emits them as rgba too), so the index emitting them as rgba is faithful
 * reproduction of dist, NOT a divergence — and NOT a manifest entry. See
 * .kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md.
 */

import * as yaml from 'js-yaml';

/** The shadow color family — the only color primitives allowed to carry rgba (see header). */
export const SHADOW_COLOR_PRIMITIVES = [
  'shadowBlack100',
  'shadowBlue100',
  'shadowOrange100',
  'shadowGray100',
] as const;

/**
 * The base-scoped theme-varying set the INDEX must mark `themeVarying: true`
 * (the 5 dist base-mode dark-override keys). This is the readout the index uses;
 * it is deliberately NOT the registry-wide 10 (which over-includes WCAG-only
 * contrast keys). See Task 3 completion §"Why two theme-varying sets coexist".
 */
export const EXPECTED_BASE_THEME_VARYING = [
  'color.action.navigation',
  'color.background.primary.subtle',
  'color.icon.navigation.inactive',
  'color.structure.border.subtle',
  'color.structure.canvas',
] as const;

/**
 * Sentinel WCAG-only over-marks: keys that the registry-wide set (10) marks but
 * the base-scoped set (5) must NOT. If any of these is `themeVarying: true`, the
 * index has been silently re-wired to the registry-wide Set — the §4.1 regression.
 * (This is the anti-conflation guard's negative assertion.)
 */
export const WCAG_ONLY_OVERMARKS = [
  'color.action.primary',
  'color.contrast.onAction',
  'color.feedback.info.text',
  'color.feedback.info.background',
  'color.feedback.info.border',
] as const;

export interface InvariantViolation {
  invariant: 'P3-no-rgba' | 'P5-theme-varying-base-scoped' | 'P5-anti-conflation';
  locator: string;
  detail: string;
}

interface PrimitiveEntry {
  family?: string;
  value?: unknown;
}

interface SemanticEntry {
  themeVarying?: boolean;
}

function tokensOf(rawYaml: string): Record<string, unknown> {
  const doc = yaml.load(rawYaml) as { tokens?: Record<string, unknown> } | undefined;
  const tokens = doc?.tokens;
  if (!tokens || typeof tokens !== 'object') {
    throw new Error('Invariants: token-index YAML has no `tokens` map');
  }
  return tokens;
}

function containsRgba(value: unknown): boolean {
  return JSON.stringify(value ?? null).includes('rgba(');
}

function containsOklch(value: unknown): boolean {
  return JSON.stringify(value ?? null).includes('oklch(');
}

/**
 * P3 — no legacy color format among OKLCH-migrated primitives.
 *
 * Asserts: the set of color primitives carrying `rgba(` equals EXACTLY the
 * shadow family. Any OTHER color primitive carrying rgba is a P3 violation
 * (an un-migrated legacy value); a shadow primitive that has SOMEHOW gained
 * oklch (i.e. the migration moved without this assertion knowing) is reported
 * so the allowlist is re-examined rather than silently widening.
 */
export function assertNoLegacyColorFormat(primitivesYaml: string): InvariantViolation[] {
  const tokens = tokensOf(primitivesYaml);
  const violations: InvariantViolation[] = [];
  const allowed = new Set<string>(SHADOW_COLOR_PRIMITIVES);

  for (const [name, raw] of Object.entries(tokens)) {
    const entry = raw as PrimitiveEntry;
    if (entry.family !== 'color') continue;
    const hasRgba = containsRgba(entry.value);
    if (hasRgba && !allowed.has(name)) {
      violations.push({
        invariant: 'P3-no-rgba',
        locator: name,
        detail: `OKLCH-migrated color primitive carries legacy rgba(): ${JSON.stringify(entry.value)}`,
      });
    }
    // Defensive: a shadow primitive that gained oklch means the shadow family was
    // migrated — the allowlist should then shrink. Surface it, don't silently pass.
    if (allowed.has(name) && containsOklch(entry.value)) {
      violations.push({
        invariant: 'P3-no-rgba',
        locator: name,
        detail:
          `Shadow-family primitive now carries oklch() — the shadow OKLCH migration may ` +
          `have landed; revisit the SHADOW_COLOR_PRIMITIVES allowlist and the linked issue.`,
      });
    }
  }
  return violations;
}

/** Names of color primitives currently carrying rgba (diagnostic helper for the runner). */
export function rgbaColorPrimitives(primitivesYaml: string): string[] {
  const tokens = tokensOf(primitivesYaml);
  return Object.entries(tokens)
    .filter(([, raw]) => (raw as PrimitiveEntry).family === 'color' && containsRgba((raw as PrimitiveEntry).value))
    .map(([name]) => name)
    .sort();
}

/**
 * P5 — theme-varying is the base-scoped set, NOT the registry-wide set.
 *
 * Two assertions (both must hold):
 *   (a) the index's `themeVarying: true` set equals EXACTLY the expected 5 base keys
 *       (a missing or extra key is a divergence from the dist base-mode set); and
 *   (b) NONE of the known WCAG-only over-marks is `themeVarying: true` — the
 *       anti-conflation guard. (b) is redundant with (a) when (a) holds, but it
 *       is the explicit, named regression sentinel: if a future change pipes the
 *       registry-wide 10 through to the index, (b) names exactly which over-marks
 *       reappeared, making the §4.1 re-break legible rather than a generic "extra key".
 */
export function assertThemeVaryingBaseScoped(semanticsYaml: string): InvariantViolation[] {
  const tokens = tokensOf(semanticsYaml);
  const violations: InvariantViolation[] = [];

  const actualTrue = new Set(
    Object.entries(tokens)
      .filter(([, raw]) => (raw as SemanticEntry).themeVarying === true)
      .map(([name]) => name),
  );
  const expected = new Set<string>(EXPECTED_BASE_THEME_VARYING);

  // (a) exact-set equality with the base-scoped 5.
  for (const key of expected) {
    if (!actualTrue.has(key)) {
      violations.push({
        invariant: 'P5-theme-varying-base-scoped',
        locator: key,
        detail: `Expected base theme-varying key is NOT marked themeVarying: true (under-marked).`,
      });
    }
  }
  for (const key of actualTrue) {
    if (!expected.has(key)) {
      violations.push({
        invariant: 'P5-theme-varying-base-scoped',
        locator: key,
        detail:
          `Unexpected key marked themeVarying: true — not in the dist base-mode set. ` +
          `If this is the registry-wide set leaking in, R5 has re-broken (§4.1).`,
      });
    }
  }

  // (b) anti-conflation sentinel — name the specific WCAG-only over-marks.
  for (const key of WCAG_ONLY_OVERMARKS) {
    if (actualTrue.has(key)) {
      violations.push({
        invariant: 'P5-anti-conflation',
        locator: key,
        detail:
          `WCAG-only over-mark is themeVarying: true — the index appears wired to the ` +
          `registry-wide Set (10), not the base-scoped Set (5). This is the §4.1 R5 regression.`,
      });
    }
  }

  return violations;
}

/** The base-scoped theme-varying keys actually marked `true` (diagnostic helper). */
export function themeVaryingTrueKeys(semanticsYaml: string): string[] {
  const tokens = tokensOf(semanticsYaml);
  return Object.entries(tokens)
    .filter(([, raw]) => (raw as SemanticEntry).themeVarying === true)
    .map(([name]) => name)
    .sort();
}

/** Run all token-index invariants; aggregate violations. Empty array = all hold. */
export function assertTokenIndexInvariants(opts: {
  primitivesYaml: string;
  semanticsYaml: string;
}): InvariantViolation[] {
  return [
    ...assertNoLegacyColorFormat(opts.primitivesYaml),
    ...assertThemeVaryingBaseScoped(opts.semanticsYaml),
  ];
}
