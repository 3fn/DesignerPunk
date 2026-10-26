/**
 * @category evergreen
 * @purpose Verify that a semantic colour reference to a primitive the platform files do not
 * define is found (.kiro/issues/2026-10-25-generate-passes-semantic-references-to-unemitted-primitives.md),
 * that the emitted set the check reads is what the web, iOS and Android files actually define,
 * and that DesignerPunk's own token set has no such reference beyond the pinned shadow colours.
 */
import { describe, it, expect } from '@jest/globals';
import {
  findUnemittedColorReferences,
  isColorReference,
  unemittedColorReferenceMessage,
  knownShadowColorWarning,
  KNOWN_UNEMITTED_SHADOW_COLORS,
} from '../ColorReferenceEmissionValidator';
import { TokenFileGenerator } from '../../generators/TokenFileGenerator';
import { WebFormatGenerator } from '../../providers/WebFormatGenerator';
import { iOSFormatGenerator } from '../../providers/iOSFormatGenerator';
import { AndroidFormatGenerator } from '../../providers/AndroidFormatGenerator';
import { getAllPrimitiveTokens } from '../../tokens';
import { getAllSemanticTokens } from '../../tokens/semantic';
import { composedColorMap } from '../../tokens/color';
import { resolveSemanticTokenValue } from '../../resolvers/SemanticValueResolver';
import { TokenCategory, type PrimitiveToken } from '../../types/PrimitiveToken';
import type { SemanticToken } from '../../types/SemanticToken';

type Resolved = Omit<SemanticToken, 'primitiveTokens'>;

const emitted = TokenFileGenerator.emittedColorPrimitiveNames();
const primitives = getAllPrimitiveTokens();
const semantics = getAllSemanticTokens();
const resolve = (tokens: SemanticToken[]): Resolved[][] => [
  tokens.map(t => resolveSemanticTokenValue(t, 'light', 'base')),
  tokens.map(t => resolveSemanticTokenValue(t, 'dark', 'base')),
];

/** A colour primitive shaped like the copy's legacy ColorTokens.ts entries (teal300's shape). */
function legacyColorPrimitive(name: string): PrimitiveToken {
  const teal = primitives.find(p => p.name === 'teal300')!;
  return { ...teal, name, description: `${name} (test)` } as PrimitiveToken;
}

/** DesignerPunk's token set with color.action.primary re-pointed, as consumer-Ada did in the trio. */
function repointedActionPrimary(to: string): SemanticToken[] {
  return semantics.map(t =>
    t.name === 'color.action.primary' ? { ...t, primitiveReferences: { value: to } } : t
  );
}

describe('ColorReferenceEmissionValidator', () => {
  describe('the emitted set is what the platform files define', () => {
    const generator = new TokenFileGenerator();
    const light = semantics.map(t => resolveSemanticTokenValue(t, 'light', 'base'));
    const dark = semantics.map(t => resolveSemanticTokenValue(t, 'dark', 'base'));
    const options = { semanticTokens: light, darkSemanticTokens: dark };
    const web = generator.generateWebTokens(options).content;
    const ios = generator.generateiOSTokens(options).content;
    const android = generator.generateAndroidTokens(options).content;
    const webNames = new WebFormatGenerator();
    const iosNames = new iOSFormatGenerator();
    const androidNames = new AndroidFormatGenerator();
    const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    it('has every palette colour and nothing else', () => {
      expect(emitted.size).toBeGreaterThan(0);
      expect([...emitted].sort()).toEqual([...composedColorMap.keys()].sort());
    });

    it('defines every emitted colour on web, iOS and Android', () => {
      const missing: string[] = [];
      for (const name of emitted) {
        const w = webNames.getTokenName(name, 'color');
        const i = iosNames.getTokenName(name, 'color');
        const a = androidNames.getTokenName(name, 'color');
        if (!new RegExp(`^\\s*${escape(w)}:`, 'm').test(web)) missing.push(`web ${w}`);
        if (!new RegExp(`\\blet ${escape(i)} =`).test(ios)) missing.push(`ios ${i}`);
        if (!new RegExp(`\\bval ${escape(a)} =`).test(android)) missing.push(`android ${a}`);
      }
      expect(missing).toEqual([]);
    });

    it('defines no colour primitive outside the emitted set (the token source\'s legacy colours are not written)', () => {
      const notEmitted = primitives.filter(p => p.category === TokenCategory.COLOR && !emitted.has(p.name));
      expect(notEmitted.length).toBeGreaterThan(0); // the premise: the source has colours the output lacks
      for (const p of notEmitted) {
        expect(web).not.toMatch(new RegExp(`^\\s*${escape(webNames.getTokenName(p.name, 'color'))}:`, 'm'));
      }
    });

    it('web: every var() the file reads is defined in it, except the pinned shadow colours', () => {
      const defined = new Set(Array.from(web.matchAll(/(--[\w-]+)\s*:/g), m => m[1]));
      const undefinedRefs = new Set(
        Array.from(web.matchAll(/var\((--[\w-]+)/g), m => m[1]).filter(r => !defined.has(r))
      );
      const pinned = new Set([...KNOWN_UNEMITTED_SHADOW_COLORS].map(n => webNames.getTokenName(n, 'color')));
      expect([...undefinedRefs].filter(r => !pinned.has(r))).toEqual([]);
    });

    it('case 1 premise: a semantic pointed at a source-only colour is written as a reference the file does not define', () => {
      const tokens = repointedActionPrimary('brand300');
      const out = generator.generateWebTokens({
        semanticTokens: tokens.map(t => resolveSemanticTokenValue(t, 'light', 'base')),
        darkSemanticTokens: tokens.map(t => resolveSemanticTokenValue(t, 'dark', 'base')),
      }).content;
      expect(out).toContain('var(--brand-300)');
      expect(out).not.toMatch(/^\s*--brand-300:/m);
    });
  });

  describe("DesignerPunk's own token set", () => {
    it('has no unemitted colour reference except the pinned shadow colours (15 shadow tokens)', () => {
      const findings = findUnemittedColorReferences(resolve(semantics), primitives, emitted);
      expect(findings.filter(f => !f.knownDefect)).toEqual([]);
      const tokens = new Set(findings.map(f => f.token));
      expect(tokens.size).toBe(15);
      expect([...tokens].every(t => t.startsWith('shadow.'))).toBe(true);
      expect(knownShadowColorWarning(findings)).toBe(
        '15 shadow token(s) reference shadow colour primitive(s) that no platform file defines ' +
        '(shadowBlack100, shadowBlue100). This is a known DesignerPunk defect, not a problem in ' +
        'your token source; generate continues.'
      );
    });

    it('pins only colours that are still not emitted (remove a name here once the generators emit it)', () => {
      for (const name of KNOWN_UNEMITTED_SHADOW_COLORS) {
        expect(emitted.has(name)).toBe(false);
        expect(primitives.find(p => p.name === name)?.category).toBe(TokenCategory.COLOR);
      }
    });

    it('isColorReference holds for every colour reference and no other', () => {
      const byName = new Map(primitives.map(p => [p.name, p]));
      const wrong: string[] = [];
      for (const t of semantics) {
        for (const [key, ref] of Object.entries(t.primitiveReferences || {})) {
          if (typeof ref !== 'string') continue;
          const p = byName.get(ref);
          const isColour = (p?.category === TokenCategory.COLOR) || composedColorMap.has(ref);
          // Judge by the token alone (as for a name the source does not declare): it must agree.
          if (isColorReference(t, key, undefined) !== isColour) wrong.push(`${t.name}.${key}=${ref}`);
        }
      }
      expect(wrong).toEqual([]);
    });
  });

  describe('case 1: a colour primitive the token source declares and the palette lacks', () => {
    const source = [...primitives, legacyColorPrimitive('brand300')];
    const findings = findUnemittedColorReferences(resolve(repointedActionPrimary('brand300')), source, emitted)
      .filter(f => !f.knownDefect);

    it('finds the re-pointed token, as declared in the source', () => {
      // In a consumer's copy, accessibility.focus.color reads color.action.primary's reference
      // at module load, so it is found too (the consumer-path runs in the PR); here only the
      // in-memory token moves.
      expect(findings.map(f => [f.token, f.key, f.primitive, f.declaredInSource])).toEqual([
        ['color.action.primary', 'value', 'brand300', true],
      ]);
    });

    it('names the token, the primitive, why it is not emitted, and the remedy', () => {
      expect(unemittedColorReferenceMessage(findings[0])).toBe(
        "Semantic token 'color.action.primary' references colour primitive 'brand300', which " +
        "generate does not emit: 'brand300' is in your token source, but colour primitives are " +
        'emitted from the colour palette of the installed @3fn/core, not from your token source ' +
        '(INSTALL § 4), so a colour primitive added to your copy is not emitted on any platform. ' +
        "Point 'color.action.primary' at a palette colour `init` copied, such as 'teal300'."
      );
    });
  });

  describe('case 2: a colour the token source does not declare (only in its color/primitives)', () => {
    const findings = findUnemittedColorReferences(resolve(repointedActionPrimary('brand300')), primitives, emitted)
      .filter(f => !f.knownDefect);

    it('is found, and says why rather than only "does not exist"', () => {
      expect(findings).toHaveLength(1);
      expect(findings[0]).toMatchObject({ token: 'color.action.primary', primitive: 'brand300', declaredInSource: false });
      const message = unemittedColorReferenceMessage(findings[0]);
      expect(message).toContain("is neither in your token source's primitives nor in the colour palette generate emits");
      expect(message).toContain('installed @3fn/core');
      expect(message).toContain('INSTALL § 4');
      expect(message).toContain("Point 'color.action.primary' at a palette colour `init` copied");
    });
  });

  describe('what is not a finding', () => {
    it('a palette colour, in a simple reference or in a composite colour key', () => {
      const tokens = semantics.map(t =>
        t.name === 'shadow.container' ? { ...t, primitiveReferences: { ...t.primitiveReferences, color: 'purple300' } } : t
      );
      const findings = findUnemittedColorReferences(resolve(tokens), primitives, emitted);
      expect(findings.some(f => f.token === 'shadow.container')).toBe(false);
      expect(findings.some(f => f.token === 'color.action.primary')).toBe(false);
    });

    it('a non-colour primitive the palette does not carry (spacing, opacity)', () => {
      const findings = findUnemittedColorReferences(resolve(semantics), primitives, emitted);
      expect(findings.every(f => primitives.find(p => p.name === f.primitive)?.category === TokenCategory.COLOR)).toBe(true);
    });

    it('a reference already resolved to a literal', () => {
      const literal: Resolved = { name: 'color.test', category: 'color' as any, primitiveReferences: { value: 'oklch(0.5 0.1 200)' }, context: '', description: '' };
      expect(findUnemittedColorReferences([[literal]], primitives, emitted)).toEqual([]);
    });
  });
});
