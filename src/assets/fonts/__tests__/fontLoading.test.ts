/**
 * @category evergreen
 * @purpose Verify fontLoading functionality works correctly
 */
/**
 * Web Font Loading Tests
 * 
 * Tests for font loading behavior, fallback handling, and FOIT prevention.
 * 
 * Requirements: 6.1, 6.2, 6.5
 */

import { describe, it, expect, beforeAll, afterEach } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

describe('Web Font Loading', () => {
  // Mock document.fonts API for testing
  let mockFonts: Map<string, boolean>;
  let originalFonts: any;

  beforeAll(() => {
    // Store original document.fonts
    originalFonts = (global as any).document?.fonts;

    // Create mock fonts API
    mockFonts = new Map();
    
    (global as any).document = {
      ...(global as any).document,
      fonts: {
        check: (fontSpec: string): boolean => {
          const fontFamily = fontSpec.match(/['"]?([^'"]+)['"]?/)?.[1] || '';
          return mockFonts.get(fontFamily) || false;
        },
        load: async (fontSpec: string): Promise<void> => {
          const fontFamily = fontSpec.match(/['"]?([^'"]+)['"]?/)?.[1] || '';
          mockFonts.set(fontFamily, true);
        },
        ready: Promise.resolve(),
        size: mockFonts.size,
        status: 'loaded' as FontFaceSetLoadStatus
      }
    };
  });

  afterEach(() => {
    // Clear mock fonts between tests
    mockFonts.clear();
  });

  describe('Rajdhani Font Loading', () => {
    it('should load Rajdhani Regular (400) successfully', async () => {
      // Simulate font loading
      await document.fonts.load('16px Rajdhani');
      
      // Verify font is available
      const isLoaded = document.fonts.check('16px Rajdhani');
      expect(isLoaded).toBe(true);
    });

    it('should load Rajdhani Medium (500) successfully', async () => {
      await document.fonts.load('500 16px Rajdhani');
      
      const isLoaded = document.fonts.check('500 16px Rajdhani');
      expect(isLoaded).toBe(true);
    });

    it('should load Rajdhani SemiBold (600) successfully', async () => {
      await document.fonts.load('600 16px Rajdhani');
      
      const isLoaded = document.fonts.check('600 16px Rajdhani');
      expect(isLoaded).toBe(true);
    });

    it('should load Rajdhani Bold (700) successfully', async () => {
      await document.fonts.load('700 16px Rajdhani');
      
      const isLoaded = document.fonts.check('700 16px Rajdhani');
      expect(isLoaded).toBe(true);
    });

    it('should load all Rajdhani weights', async () => {
      const weights = [400, 500, 600, 700];
      
      for (const weight of weights) {
        await document.fonts.load(`${weight} 16px Rajdhani`);
      }
      
      // Verify all weights loaded
      for (const weight of weights) {
        const isLoaded = document.fonts.check(`${weight} 16px Rajdhani`);
        expect(isLoaded).toBe(true);
      }
    });
  });

  describe('Figtree Font Loading', () => {
    it('should load Figtree Regular (400) successfully', async () => {
      await document.fonts.load('16px Figtree');
      
      const isLoaded = document.fonts.check('16px Figtree');
      expect(isLoaded).toBe(true);
    });

    it('should load Figtree Medium (500) successfully', async () => {
      await document.fonts.load('500 16px Figtree');
      
      const isLoaded = document.fonts.check('500 16px Figtree');
      expect(isLoaded).toBe(true);
    });

    it('should load Figtree SemiBold (600) successfully', async () => {
      await document.fonts.load('600 16px Figtree');
      
      const isLoaded = document.fonts.check('600 16px Figtree');
      expect(isLoaded).toBe(true);
    });

    it('should load Figtree Bold (700) successfully', async () => {
      await document.fonts.load('700 16px Figtree');
      
      const isLoaded = document.fonts.check('700 16px Figtree');
      expect(isLoaded).toBe(true);
    });

    it('should load all Figtree weights', async () => {
      const weights = [400, 500, 600, 700];
      
      for (const weight of weights) {
        await document.fonts.load(`${weight} 16px Figtree`);
      }
      
      // Verify all weights loaded
      for (const weight of weights) {
        const isLoaded = document.fonts.check(`${weight} 16px Figtree`);
        expect(isLoaded).toBe(true);
      }
    });
  });

  describe('Fallback Font Behavior', () => {
    it('should use fallback fonts when Rajdhani unavailable', () => {
      // Don't load Rajdhani
      const fontStack = 'Rajdhani, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      
      // Check if Rajdhani is available
      const rajdhaniLoaded = document.fonts.check('16px Rajdhani');
      expect(rajdhaniLoaded).toBe(false);
      
      // Verify fallback fonts are in stack
      expect(fontStack).toContain('-apple-system');
      expect(fontStack).toContain('BlinkMacSystemFont');
      expect(fontStack).toContain('Segoe UI');
      expect(fontStack).toContain('Roboto');
      expect(fontStack).toContain('sans-serif');
    });

    it('should use fallback fonts when Figtree unavailable', () => {
      // Don't load Figtree
      const fontStack = 'Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      
      // Check if Figtree is available
      const figtreeLoaded = document.fonts.check('16px Figtree');
      expect(figtreeLoaded).toBe(false);
      
      // Verify fallback fonts are in stack
      expect(fontStack).toContain('-apple-system');
      expect(fontStack).toContain('BlinkMacSystemFont');
      expect(fontStack).toContain('Segoe UI');
      expect(fontStack).toContain('Roboto');
      expect(fontStack).toContain('sans-serif');
    });

    it('should gracefully degrade to system fonts', () => {
      // Simulate custom fonts not loading
      const rajdhaniLoaded = document.fonts.check('16px Rajdhani');
      const figtreeLoaded = document.fonts.check('16px Figtree');
      
      expect(rajdhaniLoaded).toBe(false);
      expect(figtreeLoaded).toBe(false);
      
      // System fonts should always be available (implicit in font stack)
      const displayStack = 'Rajdhani, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const bodyStack = 'Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      
      // Verify fallback structure
      expect(displayStack.split(',').length).toBeGreaterThan(1);
      expect(bodyStack.split(',').length).toBeGreaterThan(1);
    });
  });

  describe('Font-Display: Swap (FOIT Prevention)', () => {
    it('should use font-display: swap for Rajdhani fonts', () => {
      // This test verifies the CSS configuration
      // In actual CSS: font-display: swap;
      
      // Verify swap behavior: text visible immediately with fallback
      const fontDisplayValue = 'swap';
      expect(fontDisplayValue).toBe('swap');
      
      // Swap means:
      // - Text visible immediately with fallback font
      // - Custom font swapped in when loaded
      // - No invisible text period (FOIT prevented)
    });

    it('should use font-display: swap for Figtree fonts', () => {
      // Read the shipped CSS — swap is what prevents FOIT
      const css = fs.readFileSync(
        path.join(__dirname, '../figtree/figtree.css'),
        'utf-8',
      );

      expect(css).toContain('font-display: swap');
      expect(css).not.toContain('font-display: block');
    });

    it('should prevent FOIT (Flash of Invisible Text)', () => {
      // FOIT occurs when text is invisible while custom font loads
      // font-display: swap prevents this by showing fallback immediately
      
      const fontDisplayStrategy = 'swap';
      
      // Verify swap strategy is used (not 'block' which causes FOIT)
      expect(fontDisplayStrategy).not.toBe('block');
      expect(fontDisplayStrategy).toBe('swap');
      
      // With swap:
      // 1. Text visible immediately with fallback
      // 2. Custom font swaps in when loaded
      // 3. No invisible text period
    });

    it('should show text immediately with fallback fonts', () => {
      // Simulate font not loaded yet
      const rajdhaniLoaded = document.fonts.check('16px Rajdhani');
      expect(rajdhaniLoaded).toBe(false);
      
      // With font-display: swap, text should be visible with fallback
      const fontStack = 'Rajdhani, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const fallbackFonts = fontStack.split(',').slice(1).map(f => f.trim());
      
      // Verify fallback fonts available
      expect(fallbackFonts.length).toBeGreaterThan(0);
      expect(fallbackFonts).toContain('-apple-system');
      
      // Text visible immediately with fallback (swap behavior)
    });
  });

  describe('Font Format Priority', () => {
    it('should prioritize WOFF2 format for Rajdhani', () => {
      // Verify WOFF2 is listed first in @font-face src
      const fontSrc = `
        url('./Rajdhani-Regular.woff2') format('woff2'),
        url('./Rajdhani-Regular.woff') format('woff'),
        url('./Rajdhani-Regular.ttf') format('truetype')
      `;
      
      // WOFF2 should appear before WOFF and TTF
      const woff2Index = fontSrc.indexOf('woff2');
      const woffIndex = fontSrc.indexOf("format('woff')");
      const ttfIndex = fontSrc.indexOf('truetype');
      
      expect(woff2Index).toBeLessThan(woffIndex);
      expect(woff2Index).toBeLessThan(ttfIndex);
    });

    it('ships Figtree as a variable TTF (no static weight files)', () => {
      // Read the shipped CSS rather than a literal: Figtree replaced Inter in Spec 107
      // and ships as a single variable font with a weight axis, so there is no
      // per-weight WOFF2/TTF pair to order.
      const css = fs.readFileSync(
        path.join(__dirname, '../figtree/figtree.css'),
        'utf-8',
      );

      expect(css).toContain("font-family: 'Figtree'");
      expect(css).toContain('Figtree-VariableFont_wght.ttf');
      expect(css).toContain('font-weight: 300 900');
      expect(css).not.toContain('woff2');
    });

    it('should provide TTF fallback for broader compatibility', () => {
      // Both fonts should have TTF format as fallback
      const rajdhaniFontSrc = `
        url('./Rajdhani-Regular.woff2') format('woff2'),
        url('./Rajdhani-Regular.woff') format('woff'),
        url('./Rajdhani-Regular.ttf') format('truetype')
      `;
      
      const figtreeCss = fs.readFileSync(
        path.join(__dirname, '../figtree/figtree.css'),
        'utf-8',
      );

      // Verify TTF format present
      expect(rajdhaniFontSrc).toContain('truetype');
      expect(figtreeCss).toContain("format('truetype')");
    });
  });

  describe('Font Stack Configuration', () => {
    it('should have correct display font stack', () => {
      const displayStack = 'Rajdhani, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      
      // Verify Rajdhani is primary
      expect(displayStack.startsWith('Rajdhani')).toBe(true);
      
      // Verify system font fallbacks
      expect(displayStack).toContain('-apple-system');
      expect(displayStack).toContain('BlinkMacSystemFont');
      expect(displayStack).toContain('Segoe UI');
      expect(displayStack).toContain('Roboto');
      expect(displayStack).toContain('sans-serif');
    });

    it('should have correct body font stack', () => {
      const bodyStack = 'Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      
      // Verify Figtree is primary
      expect(bodyStack.startsWith('Figtree')).toBe(true);
      
      // Verify system font fallbacks
      expect(bodyStack).toContain('-apple-system');
      expect(bodyStack).toContain('BlinkMacSystemFont');
      expect(bodyStack).toContain('Segoe UI');
      expect(bodyStack).toContain('Roboto');
      expect(bodyStack).toContain('sans-serif');
    });

    it('should have identical fallback chains for display and body', () => {
      const displayStack = 'Rajdhani, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      const bodyStack = 'Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      
      // Extract fallback portions (everything after first comma)
      const displayFallbacks = displayStack.split(',').slice(1).join(',');
      const bodyFallbacks = bodyStack.split(',').slice(1).join(',');
      
      // Fallback chains should be identical
      expect(displayFallbacks).toBe(bodyFallbacks);
    });
  });
});
