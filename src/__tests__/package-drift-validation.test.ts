/**
 * @jest-environment node
 * @category evergreen
 * @purpose Validate platform token references and ESM bundle registration against generated output
 */

/**
 * Package Drift Validation
 *
 * Catches two categories of drift:
 * 1. Platform files referencing tokens that don't exist in generated output
 * 2. Web components with platform files missing from browser-entry.ts
 *
 * @see .kiro/specs/095-ecosystem-package-assembly/design.md
 * @see Requirements: R7 AC 1-5
 */

import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

const PROJECT_ROOT = process.cwd();
const COMPONENTS_DIR = path.join(PROJECT_ROOT, 'src', 'components', 'core');

// --- Helpers ---

function getComponentDirs(): string[] {
  return fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
}

function getFilesWithExtension(dir: string, ext: string): string[] {
  const pattern = path.join(dir, `**/*${ext}`);
  return glob.sync(pattern);
}

function extractStaticTokenNames(generatedFile: string): Set<string> {
  const content = fs.readFileSync(generatedFile, 'utf-8');
  const names = new Set<string>();

  // iOS: "public static let tokenName" or "static let tokenName"
  const iosStaticPattern = /static let ([a-zA-Z][a-zA-Z0-9_]*)/g;
  // Android: "val token_name" at object level
  const androidValPattern = /^\s+val ([a-zA-Z][a-zA-Z0-9_]*)/gm;
  // Android: "const val TOKEN"
  const androidConstPattern = /const val ([a-zA-Z_][a-zA-Z0-9_]*)/g;

  let match;
  while ((match = iosStaticPattern.exec(content)) !== null) names.add(match[1]);
  while ((match = androidValPattern.exec(content)) !== null) names.add(match[1]);
  while ((match = androidConstPattern.exec(content)) !== null) names.add(match[1]);

  return names;
}

function extractNestedTypeNames(generatedFile: string): Set<string> {
  const content = fs.readFileSync(generatedFile, 'utf-8');
  const names = new Set<string>();

  // iOS nested structs/enums
  const iosStructPattern = /public struct ([A-Z][a-zA-Z0-9]*)/g;
  const iosEnumPattern = /public enum ([A-Z][a-zA-Z0-9]*)/g;
  // Android nested objects
  const androidObjectPattern = /^\s+object ([A-Z][a-zA-Z0-9]*)/gm;

  let match;
  while ((match = iosStructPattern.exec(content)) !== null) names.add(match[1]);
  while ((match = iosEnumPattern.exec(content)) !== null) names.add(match[1]);
  while ((match = androidObjectPattern.exec(content)) !== null) names.add(match[1]);

  return names;
}

function extractThemePropertyNames(generatedFile: string): Set<string> {
  const content = fs.readFileSync(generatedFile, 'utf-8');
  const names = new Set<string>();

  // iOS protocol: "var colorActionPrimary: Color { get }"
  const iosProtocolPattern = /var ([a-zA-Z][a-zA-Z0-9_]*): Color \{ get \}/g;
  // Android data class: "val color_action_primary: Color"
  const androidDataClassPattern = /val ([a-z][a-z0-9_]*): Color/g;

  let match;
  while ((match = iosProtocolPattern.exec(content)) !== null) names.add(match[1]);
  while ((match = androidDataClassPattern.exec(content)) !== null) names.add(match[1]);

  return names;
}

// --- Tests ---

describe('Package Drift Validation', () => {

  describe('iOS platform token references (R7 AC 1)', () => {
    const generatedFile = path.join(PROJECT_ROOT, 'dist', 'DesignTokens.ios.swift');

    it('should have generated iOS token file', () => {
      expect(fs.existsSync(generatedFile)).toBe(true);
    });

    it('all DesignTokens.* references in iOS files should resolve against generated output', () => {
      const validTokens = extractStaticTokenNames(generatedFile);
      const validStructs = extractNestedTypeNames(generatedFile);
      const themeProps = extractThemePropertyNames(generatedFile);
      const themeTypesExist = themeProps.size > 0;
      const errors: string[] = [];

      const components = getComponentDirs();
      for (const comp of components) {
        const iosDir = path.join(COMPONENTS_DIR, comp, 'platforms', 'ios');
        if (!fs.existsSync(iosDir)) continue;

        const swiftFiles = getFilesWithExtension(iosDir, '.swift');
        for (const file of swiftFiles) {
          const content = fs.readFileSync(file, 'utf-8');
          const relPath = path.relative(PROJECT_ROOT, file);

          // Check DesignTokens.propertyName references (skip comments)
          const lines = content.split('\n');
          for (const line of lines) {
            const trimmed = line.trim();
            // Skip comments, string literals, and doc annotations
            if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*') || trimmed.startsWith('@')) continue;

            const staticRefPattern = /DesignTokens\.([a-zA-Z][a-zA-Z0-9_]*)/g;
            let match;
            while ((match = staticRefPattern.exec(line)) !== null) {
              const tokenName = match[1];
              // Skip known false positives and placeholders
              if (tokenName === 'ios' || tokenName === 'android' || tokenName.includes('XXX')) continue;
              if (!validTokens.has(tokenName) && !validStructs.has(tokenName)) {
                errors.push(`${comp} (${relPath}): DesignTokens.${tokenName}`);
              }
            }
          }

          // Check theme.propertyName references (only if theme types are generated)
          if (themeTypesExist) {
            const themeRefPattern = /theme\.([a-zA-Z][a-zA-Z0-9_]*)/g;
            let themeMatch;
            while ((themeMatch = themeRefPattern.exec(content)) !== null) {
              const propName = themeMatch[1];
              if (!themeProps.has(propName)) {
                errors.push(`${comp} (${relPath}): theme.${propName} not found in theme protocol`);
              }
            }
          }
        }
      }

      if (errors.length > 0) {
        expect(`iOS token reference drift detected:\n${errors.join('\n')}`).toBe('');
      }
    });
  });

  describe('Android platform token references (R7 AC 2)', () => {
    const generatedFile = path.join(PROJECT_ROOT, 'dist', 'DesignTokens.android.kt');

    it('should have generated Android token file', () => {
      expect(fs.existsSync(generatedFile)).toBe(true);
    });

    it('all DesignTokens.* references in Android files should resolve against generated output', () => {
      const validTokens = extractStaticTokenNames(generatedFile);
      const validStructs = extractNestedTypeNames(generatedFile);
      const themeProps = extractThemePropertyNames(generatedFile);
      const themeTypesExist = themeProps.size > 0;
      const errors: string[] = [];

      const components = getComponentDirs();
      for (const comp of components) {
        const androidDir = path.join(COMPONENTS_DIR, comp, 'platforms', 'android');
        if (!fs.existsSync(androidDir)) continue;

        const ktFiles = getFilesWithExtension(androidDir, '.kt');
        for (const file of ktFiles) {
          const content = fs.readFileSync(file, 'utf-8');
          const relPath = path.relative(PROJECT_ROOT, file);

          // Check DesignTokens.property references (skip comments, extension declarations, Companion)
          const lines = content.split('\n');
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*') || trimmed.startsWith('@')) continue;
            // Skip extension property declarations (val DesignTokens.Companion.*)
            if (trimmed.startsWith('val DesignTokens.')) continue;

            const staticRefPattern = /DesignTokens\.(?!Companion)([a-zA-Z_][a-zA-Z0-9_]*)/g;
            let match;
            while ((match = staticRefPattern.exec(line)) !== null) {
              const tokenName = match[1];
              if (tokenName === 'ios' || tokenName === 'android' || tokenName.includes('XXX')) continue;
              if (!validTokens.has(tokenName) && !validStructs.has(tokenName)) {
                errors.push(`${comp} (${relPath}): DesignTokens.${tokenName}`);
              }
            }
          }

          // Check theme.property references (only if theme types are generated)
          if (themeTypesExist) {
            const themeRefPattern = /theme\.([a-z][a-z0-9_]*)/g;
            let themeMatch;
            while ((themeMatch = themeRefPattern.exec(content)) !== null) {
              const propName = themeMatch[1];
              if (!themeProps.has(propName)) {
                errors.push(`${comp} (${relPath}): theme.${propName} not found in theme data class`);
              }
            }
          }
        }
      }

      if (errors.length > 0) {
        expect(`Android token reference drift detected:\n${errors.join('\n')}`).toBe('');
      }
    });
  });

  describe('ESM bundle registration (R7 AC 3, 5)', () => {
    const browserEntryPath = path.join(PROJECT_ROOT, 'src', 'browser-entry.ts');

    it('should have browser-entry.ts', () => {
      expect(fs.existsSync(browserEntryPath)).toBe(true);
    });

    it('all components with web platform directories should be registered in browser-entry.ts', () => {
      const browserEntryContent = fs.readFileSync(browserEntryPath, 'utf-8');
      const missing: string[] = [];

      const components = getComponentDirs();
      for (const comp of components) {
        const webDir = path.join(COMPONENTS_DIR, comp, 'platforms', 'web');
        if (!fs.existsSync(webDir)) continue;

        // Check for import from this component's web directory
        const importPattern = `components/core/${comp}/platforms/web/`;
        if (!browserEntryContent.includes(importPattern)) {
          missing.push(comp);
        }
      }

      if (missing.length > 0) {
        expect(`Components with web implementations missing from browser-entry.ts:\n${missing.join('\n')}`).toBe('');
      }
    });
  });
});
