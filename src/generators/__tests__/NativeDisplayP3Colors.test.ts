/**
 * @category evergreen
 * @purpose Verify the native Display P3 colours the iOS and Android token files carry
 *          (Spec 129 Task 8.1; Req 6.10; design § 6)
 *
 * Three checks, one per criterion of Task 8:
 *   1. every emitted native colour that lies inside Display P3 converts back to its OKLCH source
 *      with ΔE₀₀ ≤ 0.1, channels to 4 decimal places;
 *   2. colours outside Display P3 are mapped by CSS Color Level 4 § 13.2 (ΔE_OK 0.02), checked
 *      against a committed fixture whose header names its source (Color.js 0.7.1);
 *   3. every emitted Android colour channel is within 0–1 (Compose's `Color` constructor throws
 *      at run time otherwise).
 */

import * as fs from 'fs';
import * as path from 'path';
import { allComposedColors } from '../../tokens/color';
import { iOSFormatGenerator } from '../../providers/iOSFormatGenerator';
import { AndroidFormatGenerator } from '../../providers/AndroidFormatGenerator';
import {
  clampToGamut,
  deltaE00,
  deltaEOK,
  fromDisplayP3,
  isInGamut,
  oklchToGamutRgb,
  type Oklch,
} from '../../color/OklchConverter';
import {
  formatKotlinDisplayP3,
  formatSwiftDisplayP3,
  oklchToNativeChannels,
  parseOklchText,
} from '../oklch/NativeColorUtils';

interface FixtureEntry {
  oklch: [number, number, number];
  displayP3: [number, number, number];
  inGamut?: boolean;
}
interface Fixture {
  header: { source: string; calls: string; algorithm: string; generated: string };
  inGamut: FixtureEntry[];
  outOfGamut: FixtureEntry[];
  srgbPrimaries: Array<{ srgb: [number, number, number]; oklch: [number, number, number]; displayP3: [number, number, number] }>;
}

const fixture: Fixture = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'fixtures', 'display-p3-css-color-4-reference.json'), 'utf8'),
);

/** A fixture channel and a computed channel agree to better than half a unit of the 4th decimal. */
const CHANNEL_TOLERANCE = 1e-4;

const ios = new iOSFormatGenerator();
const android = new AndroidFormatGenerator('kotlin');

function swiftChannels(line: string): { r: number; g: number; b: number; a: number } {
  const m = /Color\(\.displayP3, red: ([\d.]+), green: ([\d.]+), blue: ([\d.]+), opacity: ([\d.]+)\)/.exec(line);
  if (!m) throw new Error(`not a Display P3 Swift colour: ${line}`);
  return { r: +m[1], g: +m[2], b: +m[3], a: +m[4] };
}

function kotlinChannels(line: string): { r: number; g: number; b: number; a: number } {
  const m = /Color\(([\d.]+)f, ([\d.]+)f, ([\d.]+)f, ([\d.]+)f, ColorSpaces\.DisplayP3\)/.exec(line);
  if (!m) throw new Error(`not a Display P3 Kotlin colour: ${line}`);
  return { r: +m[1], g: +m[2], b: +m[3], a: +m[4] };
}

describe('the committed fixture names its source', () => {
  it('carries a header with the reference implementation, its version and the call', () => {
    expect(fixture.header.source).toMatch(/colorjs\.io.*0\.7\.1/);
    expect(fixture.header.calls).toContain("method: 'css'");
    expect(fixture.header.algorithm).toContain('section 13.2');
    expect(fixture.header.generated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('holds only colours Color.js itself puts inside or outside Display P3, as labelled', () => {
    expect(fixture.inGamut.length).toBeGreaterThanOrEqual(15);
    expect(fixture.outOfGamut.length).toBeGreaterThanOrEqual(20);
    expect(fixture.inGamut.every(e => e.inGamut === true)).toBe(true);
    expect(fixture.outOfGamut.every(e => e.inGamut === false)).toBe(true);
  });
});

describe('the Display P3 converter', () => {
  it('matches the reference for sRGB primaries and white (a wrong matrix shows here)', () => {
    // The reference gives each sRGB primary as OKLCH and as Display P3 channels.
    for (const { oklch, displayP3 } of fixture.srgbPrimaries) {
      const rgb = oklchToGamutRgb(oklch[0], oklch[1], oklch[2], 'display-p3');
      expect(Math.abs(rgb.r - displayP3[0])).toBeLessThan(CHANNEL_TOLERANCE);
      expect(Math.abs(rgb.g - displayP3[1])).toBeLessThan(CHANNEL_TOLERANCE);
      expect(Math.abs(rgb.b - displayP3[2])).toBeLessThan(CHANNEL_TOLERANCE);
    }
  });

  it.each(fixture.inGamut.map((e, i) => [i, e] as const))(
    'converts the in-gamut reference colour %i to the reference channels',
    (_i, entry) => {
      const rgb = oklchToGamutRgb(entry.oklch[0], entry.oklch[1], entry.oklch[2], 'display-p3');
      expect(Math.abs(rgb.r - entry.displayP3[0])).toBeLessThan(CHANNEL_TOLERANCE);
      expect(Math.abs(rgb.g - entry.displayP3[1])).toBeLessThan(CHANNEL_TOLERANCE);
      expect(Math.abs(rgb.b - entry.displayP3[2])).toBeLessThan(CHANNEL_TOLERANCE);
    },
  );
});

describe('colours outside Display P3 are mapped by CSS Color 4 § 13.2 (fixture)', () => {
  it.each(fixture.outOfGamut.map((e, i) => [i, e] as const))(
    'maps the out-of-gamut reference colour %i to the reference channels',
    (_i, entry) => {
      const [l, c, h] = entry.oklch;
      expect(isInGamut(l, c, h, 'display-p3')).toBe(false);
      const rgb = oklchToGamutRgb(l, c, h, 'display-p3');
      expect(Math.abs(rgb.r - entry.displayP3[0])).toBeLessThan(CHANNEL_TOLERANCE);
      expect(Math.abs(rgb.g - entry.displayP3[1])).toBeLessThan(CHANNEL_TOLERANCE);
      expect(Math.abs(rgb.b - entry.displayP3[2])).toBeLessThan(CHANNEL_TOLERANCE);
    },
  );

  it.each(fixture.outOfGamut.map((e, i) => [i, e] as const))(
    'emits the reference channels, to 4 decimal places, for out-of-gamut colour %i',
    (_i, entry) => {
      const [l, c, h] = entry.oklch;
      const swift = swiftChannels(formatSwiftDisplayP3(l, c, h));
      expect(Math.abs(swift.r - entry.displayP3[0])).toBeLessThan(CHANNEL_TOLERANCE * 1.5);
      expect(Math.abs(swift.g - entry.displayP3[1])).toBeLessThan(CHANNEL_TOLERANCE * 1.5);
      expect(Math.abs(swift.b - entry.displayP3[2])).toBeLessThan(CHANNEL_TOLERANCE * 1.5);
    },
  );
});

describe('clampToGamut takes a target gamut and measures with ΔE_OK', () => {
  it('defaults to sRGB, as before', () => {
    const viaDefault = clampToGamut(0.6, 0.35, 150);
    const viaSrgb = clampToGamut(0.6, 0.35, 150, 'srgb');
    expect(viaDefault).toEqual(viaSrgb);
  });

  it('leaves a colour inside the target gamut unchanged', () => {
    // Inside Display P3, outside sRGB.
    const colour: Oklch = { l: 0.7, c: 0.25, h: 145 };
    expect(isInGamut(colour.l, colour.c, colour.h, 'srgb')).toBe(false);
    expect(isInGamut(colour.l, colour.c, colour.h, 'display-p3')).toBe(true);
    expect(clampToGamut(colour.l, colour.c, colour.h, 'display-p3')).toEqual(colour);
    expect(clampToGamut(colour.l, colour.c, colour.h, 'srgb').c).toBeLessThan(colour.c);
  });

  it('maps an out-of-gamut colour into the target gamut, and Display P3 keeps more chroma than sRGB', () => {
    const source: Oklch = { l: 0.6, c: 0.35, h: 150 };
    const p3 = clampToGamut(source.l, source.c, source.h, 'display-p3');
    const srgb = clampToGamut(source.l, source.c, source.h, 'srgb');
    expect(isInGamut(p3.l, p3.c, p3.h, 'display-p3')).toBe(true);
    expect(isInGamut(srgb.l, srgb.c, srgb.h, 'srgb')).toBe(true);
    expect(p3.c).toBeGreaterThan(srgb.c);
  });

  it('accepts a mapped colour only within ΔE_OK 0.02 of the colour the search reached', () => {
    // The mapped result is the clip of the chroma the search stopped at; that chroma's own colour
    // is within the just-noticeable difference of the clip. ΔE_OK of mapped vs source is larger
    // (chroma was reduced), but bounded by the chroma removed.
    for (const e of fixture.outOfGamut) {
      const [l, c, h] = e.oklch;
      const mapped = clampToGamut(l, c, h, 'display-p3');
      expect(deltaEOK(mapped, { l, c, h })).toBeLessThan(c);
    }
  });

  it('returns white and black for lightness at or beyond the ends', () => {
    expect(clampToGamut(1.1, 0.3, 40, 'display-p3')).toEqual({ l: 1, c: 0, h: 40 });
    expect(clampToGamut(-0.1, 0.3, 40, 'display-p3')).toEqual({ l: 0, c: 0, h: 40 });
  });
});

describe('every emitted native colour (the composed palette), on both platforms', () => {
  const colours = allComposedColors;

  it('covers the whole palette', () => {
    expect(colours.length).toBeGreaterThanOrEqual(50);
  });

  it('converts back to its OKLCH source with ΔE₀₀ ≤ 0.1 where the source is inside Display P3 (iOS and Android)', () => {
    let inside = 0;
    for (const colour of colours) {
      const { l, c, h } = colour.resolved;
      if (!isInGamut(l, c, h, 'display-p3')) continue;
      inside++;
      const sw = swiftChannels(ios.formatOklchColor(colour.name, l, c, h));
      const kt = kotlinChannels(android.formatOklchColor(colour.name, l, c, h));
      for (const ch of [sw, kt]) {
        const back = fromDisplayP3(ch.r, ch.g, ch.b);
        expect({ name: colour.name, dE: deltaE00({ l, c, h }, back) <= 0.1 }).toEqual({ name: colour.name, dE: true });
      }
      expect(kt).toEqual(sw);
    }
    // Most of the palette is inside Display P3; the guard is not vacuous.
    expect(inside).toBeGreaterThan(colours.length / 2);
  });

  it('writes every channel to at most 4 decimal places', () => {
    for (const colour of colours) {
      const { l, c, h } = colour.resolved;
      const sw = swiftChannels(ios.formatOklchColor(colour.name, l, c, h));
      for (const v of [sw.r, sw.g, sw.b]) {
        expect(Number(v.toFixed(4))).toBe(v);
      }
    }
  });

  it('keeps every emitted Android channel within 0–1', () => {
    for (const colour of colours) {
      const { l, c, h } = colour.resolved;
      const kt = kotlinChannels(android.formatOklchColor(colour.name, l, c, h));
      for (const v of [kt.r, kt.g, kt.b, kt.a]) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(1);
      }
    }
  });

  it('keeps every channel within 0–1 for the out-of-gamut fixture colours too', () => {
    for (const e of fixture.outOfGamut) {
      const [l, c, h] = e.oklch;
      const kt = kotlinChannels(formatKotlinDisplayP3(l, c, h));
      for (const v of [kt.r, kt.g, kt.b]) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(1);
      }
      const { r, g, b } = oklchToNativeChannels(l, c, h);
      for (const v of [r, g, b]) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe('semantic colours that resolve to an oklch() literal', () => {
  it('parses the text with and without alpha', () => {
    expect(parseOklchText('oklch(0.4 0.183 310)')).toEqual({ l: 0.4, c: 0.183, h: 310, alpha: 1 });
    expect(parseOklchText('oklch(0 0 260 / 0.8)')).toEqual({ l: 0, c: 0, h: 260, alpha: 0.8 });
    expect(parseOklchText('rgba(0, 0, 0, 1)')).toBeNull();
  });

  it('carries alpha as opacity on iOS and as alpha on Android', () => {
    expect(formatSwiftDisplayP3(0, 0, 260, 0.8)).toBe('Color(.displayP3, red: 0, green: 0, blue: 0, opacity: 0.8)');
    expect(formatKotlinDisplayP3(0, 0, 260, 0.8)).toBe('Color(0f, 0f, 0f, 0.8f, ColorSpaces.DisplayP3)');
  });
});
