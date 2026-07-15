/**
 * @jest-environment node
 * @category evergreen
 * @purpose Validate Form Inputs family behavioral contracts across platforms
 */

/**
 * Form Inputs Family Behavioral Contract Tests
 *
 * Validates that Form Inputs family components (Input-Text-Base, Input-Text-Email,
 * Input-Text-Password, Input-Text-PhoneNumber) honor their behavioral contracts
 * consistently across web, iOS, and Android platforms.
 *
 * @see .kiro/steering/Test-Behavioral-Contract-Validation.md
 * @see src/components/core/Input-Text-Base/Input-Text-Base.schema.yaml
 * @validates Requirements R6.1, R6.2, R6.3, R6.4, R6.5
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// Types
interface ComponentSchema {
  name: string;
  contracts: Record<string, any>;
  platforms: string[];
}

// Component paths
const COMPONENTS_DIR = path.join(process.cwd(), 'src/components/core');
const FORM_INPUT_COMPONENTS = [
  'Input-Text-Base',
  'Input-Text-Email',
  'Input-Text-Password',
  'Input-Text-PhoneNumber',
];

// Contract validation patterns - more flexible to match various implementation styles
const CONTRACT_PATTERNS: Record<string, Record<string, RegExp[]>> = {
  focusable: {
    web: [
      /tabindex/gi,
      /focus/gi,
      /:focus/g,
      /onFocus/g,
    ],
    ios: [
      /focus/gi,
      /FocusState/g,
      /@FocusState/g,
    ],
    android: [
      /focus/gi,
      /onFocusChanged/g,
      /FocusRequester/g,
      /Modifier/g,  // Compose modifiers often handle focus
    ],
  },
  float_label_animation: {
    web: [
      /transition/gi,
      /animation/gi,
      /transform/gi,
      /floated/gi,
    ],
    ios: [
      /withAnimation/g,
      /\.animation/g,
      /offset/g,
    ],
    android: [
      /animate/gi,
      /Animatable/g,
      /transition/gi,
      /Modifier/g,  // Compose animations via modifiers
    ],
  },
  error_state_display: {
    web: [
      /error/gi,
      /aria-invalid/g,
      /aria-describedby/g,
    ],
    ios: [
      /error/gi,
      /isError/g,
      /errorMessage/g,
    ],
    android: [
      /error/gi,
      /isError/g,
      /errorMessage/g,
    ],
  },
  // NOTE: disabled_state is a standardized EXCLUSION (no-disabled-states philosophy).
  // Implementation-level guard patterns live in DISABLED_EXCLUSION_GUARD_PATTERNS below.
  focus_ring: {
    web: [
      /:focus-visible/g,
      /outline/gi,
      /focus.*ring/gi,
    ],
    ios: [
      /focused/gi,
      /border/gi,
    ],
    android: [
      /focused/gi,
      /border/gi,
      /indication/gi,  // Compose focus indication
    ],
  },
  reduced_motion_support: {
    web: [
      /prefers-reduced-motion/g,
      /reduced.*motion/gi,
    ],
    ios: [
      /UIAccessibility/g,
      /reduceMotion/gi,
    ],
    android: [
      /ANIMATOR_DURATION_SCALE/g,
      /reduceMotion/gi,
    ],
  },
};

// Disabled-state exclusion guard (no-disabled-states philosophy, Spec 066 / Button-CTA pattern).
// These patterns must NOT appear in any Form Inputs platform implementation.
// The iOS `.disabled(` pattern was added per the iOS readOnly adjudication
// (.kiro/issues/input-text-base-ios-readonly-adjudication.md — RULED B-prime,
// Peter 2026-07-15, condition 5): iOS previously implemented readOnly via
// SwiftUI .disabled(readOnly), which the original patterns missed — that is
// how a "dimmed" readOnly field survived two disabled-cleanup passes. There
// are zero legitimate `.disabled(` uses in Form Inputs platform sources.
const DISABLED_EXCLUSION_GUARD_PATTERNS: RegExp[] = [
  /isDisabled/,
  /disabledBlend/,
  /aria-disabled/,
  /cursor:\s*not-allowed/,
  /\.disabled\(/, // SwiftUI disabled modifier — disabled semantics regardless of intent
];

/**
 * Load component schema
 */
function loadSchema(componentName: string): ComponentSchema | null {
  const schemaPath = path.join(COMPONENTS_DIR, componentName, `${componentName}.schema.yaml`);
  
  if (!fs.existsSync(schemaPath)) {
    return null;
  }
  
  try {
    const content = fs.readFileSync(schemaPath, 'utf-8');
    return yaml.load(content) as ComponentSchema;
  } catch (error) {
    // Some schemas may have YAML syntax that js-yaml struggles with
    console.log(`Warning: Could not parse schema for ${componentName}: ${(error as Error).message}`);
    return null;
  }
}

/**
 * Load component contracts from contracts.yaml (sole source of truth per spec 063)
 */
function loadContracts(componentName: string): Record<string, any> | null {
  const contractsPath = path.join(COMPONENTS_DIR, componentName, 'contracts.yaml');
  
  if (!fs.existsSync(contractsPath)) {
    return null;
  }
  
  try {
    const content = fs.readFileSync(contractsPath, 'utf-8');
    const parsed = yaml.load(content) as Record<string, any>;
    return parsed?.contracts || null;
  } catch (error) {
    console.log(`Warning: Could not parse contracts for ${componentName}: ${(error as Error).message}`);
    return null;
  }
}

/**
 * Load platform implementation
 */
function loadPlatformImpl(componentName: string, platform: string): string | null {
  const patterns: Record<string, { dir: string; ext: string }> = {
    web: { dir: 'platforms/web', ext: '.web.ts' },
    ios: { dir: 'platforms/ios', ext: '.ios.swift' },
    android: { dir: 'platforms/android', ext: '.android.kt' },
  };
  
  const pattern = patterns[platform];
  if (!pattern) return null;
  
  const platformDir = path.join(COMPONENTS_DIR, componentName, pattern.dir);
  
  if (!fs.existsSync(platformDir)) return null;
  
  const files = fs.readdirSync(platformDir);
  const implFile = files.find(f => f.endsWith(pattern.ext));
  
  if (!implFile) return null;
  
  return fs.readFileSync(path.join(platformDir, implFile), 'utf-8');
}

/**
 * Check if contract patterns are present in implementation
 */
function checkContractPatterns(
  content: string,
  patterns: RegExp[]
): { found: string[]; missing: string[] } {
  const found: string[] = [];
  const missing: string[] = [];
  
  for (const pattern of patterns) {
    const matches = content.match(pattern);
    if (matches && matches.length > 0) {
      found.push(pattern.source);
    } else {
      missing.push(pattern.source);
    }
  }
  
  return { found, missing };
}

describe('Form Inputs Family Behavioral Contracts', () => {
  describe('Input-Text-Base Contracts', () => {
    const component = 'Input-Text-Base';
    
    describe('focusable contract', () => {
      it('web implementation should support focus', () => {
        const content = loadPlatformImpl(component, 'web');
        expect(content).not.toBeNull();
        
        if (content) {
          const patterns = CONTRACT_PATTERNS.focusable.web;
          const result = checkContractPatterns(content, patterns);
          
          console.log(`${component} (web) focusable: Found ${result.found.length}/${patterns.length} patterns`);
          
          expect(result.found.length).toBeGreaterThan(0);
        }
      });

      it('iOS implementation should support focus', () => {
        const content = loadPlatformImpl(component, 'ios');
        expect(content).not.toBeNull();
        
        if (content) {
          const patterns = CONTRACT_PATTERNS.focusable.ios;
          const result = checkContractPatterns(content, patterns);
          
          console.log(`${component} (iOS) focusable: Found ${result.found.length}/${patterns.length} patterns`);
          
          expect(result.found.length).toBeGreaterThan(0);
        }
      });

      it('Android implementation should support focus', () => {
        const content = loadPlatformImpl(component, 'android');
        expect(content).not.toBeNull();
        
        if (content) {
          const patterns = CONTRACT_PATTERNS.focusable.android;
          const result = checkContractPatterns(content, patterns);
          
          console.log(`${component} (Android) focusable: Found ${result.found.length}/${patterns.length} patterns`);
          
          expect(result.found.length).toBeGreaterThan(0);
        }
      });
    });

    describe('float_label_animation contract', () => {
      it('web implementation should support float label animation', () => {
        const content = loadPlatformImpl(component, 'web');
        expect(content).not.toBeNull();
        
        if (content) {
          const patterns = CONTRACT_PATTERNS.float_label_animation.web;
          const result = checkContractPatterns(content, patterns);
          
          console.log(`${component} (web) float_label: Found ${result.found.length}/${patterns.length} patterns`);
          
          expect(result.found.length).toBeGreaterThan(0);
        }
      });

      it('iOS implementation should support float label animation', () => {
        const content = loadPlatformImpl(component, 'ios');
        expect(content).not.toBeNull();
        
        if (content) {
          const patterns = CONTRACT_PATTERNS.float_label_animation.ios;
          const result = checkContractPatterns(content, patterns);
          
          console.log(`${component} (iOS) float_label: Found ${result.found.length}/${patterns.length} patterns`);
          
          expect(result.found.length).toBeGreaterThan(0);
        }
      });

      it('Android implementation should support float label animation', () => {
        const content = loadPlatformImpl(component, 'android');
        expect(content).not.toBeNull();
        
        if (content) {
          const patterns = CONTRACT_PATTERNS.float_label_animation.android;
          const result = checkContractPatterns(content, patterns);
          
          console.log(`${component} (Android) float_label: Found ${result.found.length}/${patterns.length} patterns`);
          
          expect(result.found.length).toBeGreaterThan(0);
        }
      });
    });

    describe('error_state_display contract', () => {
      it('web implementation should support error state', () => {
        const content = loadPlatformImpl(component, 'web');
        expect(content).not.toBeNull();
        
        if (content) {
          const patterns = CONTRACT_PATTERNS.error_state_display.web;
          const result = checkContractPatterns(content, patterns);
          
          console.log(`${component} (web) error_state: Found ${result.found.length}/${patterns.length} patterns`);
          
          expect(result.found.length).toBeGreaterThan(0);
        }
      });

      it('iOS implementation should support error state', () => {
        const content = loadPlatformImpl(component, 'ios');
        expect(content).not.toBeNull();
        
        if (content) {
          const patterns = CONTRACT_PATTERNS.error_state_display.ios;
          const result = checkContractPatterns(content, patterns);
          
          console.log(`${component} (iOS) error_state: Found ${result.found.length}/${patterns.length} patterns`);
          
          expect(result.found.length).toBeGreaterThan(0);
        }
      });

      it('Android implementation should support error state', () => {
        const content = loadPlatformImpl(component, 'android');
        expect(content).not.toBeNull();
        
        if (content) {
          const patterns = CONTRACT_PATTERNS.error_state_display.android;
          const result = checkContractPatterns(content, patterns);
          
          console.log(`${component} (Android) error_state: Found ${result.found.length}/${patterns.length} patterns`);
          
          expect(result.found.length).toBeGreaterThan(0);
        }
      });
    });

    describe('disabled_state exclusion', () => {
      it('should be excluded per DesignerPunk no-disabled-states philosophy', () => {
        const contractsPath = path.join(COMPONENTS_DIR, component, 'contracts.yaml');
        const content = fs.readFileSync(contractsPath, 'utf-8');
        expect(content).toContain('state_disabled');
        expect(content).toContain('excludes');
      });

      it('no platform implementation should contain disabled-state handling', () => {
        // Exclusion guard (Spec 066 / Button-CTA pattern): the contracts.yaml
        // exclusion must hold in code. readOnly is the documented alternative
        // and must never be implemented via disabled semantics — iOS renders
        // readOnly as selectable Text in the field chrome (B-prime ruling,
        // 2026-07-15), never via .disabled(readOnly).
        for (const formComponent of FORM_INPUT_COMPONENTS) {
          for (const platform of ['web', 'ios', 'android']) {
            const content = loadPlatformImpl(formComponent, platform);
            if (!content) continue;

            // Raw-source matching (strict): banned patterns may not appear
            // anywhere in a platform implementation, comments included —
            // reference the mechanism descriptively in docs, never literally.
            const violations = DISABLED_EXCLUSION_GUARD_PATTERNS
              .filter(pattern => pattern.test(content))
              .map(pattern => pattern.source);

            if (violations.length > 0) {
              console.log(`${formComponent} (${platform}) disabled-state handling found: ${violations.join(', ')}`);
            }

            expect(violations).toEqual([]);
          }
        }
      });
    });

    describe('state_readonly contract (iOS readOnly adjudication, RULED B-prime 2026-07-15)', () => {
      // @see .kiro/issues/input-text-base-ios-readonly-adjudication.md
      // These are the first executable readOnly assertions anywhere in the
      // component (pre-ruling coverage was zero on all platforms).

      it('Input-Text-Base contracts.yaml declares state_readonly', () => {
        const contracts = loadContracts('Input-Text-Base');
        expect(contracts).not.toBeNull();
        expect(contracts!.state_readonly).toBeDefined();
        expect(contracts!.state_readonly.category).toBe('state');
        expect(contracts!.state_readonly.required).toBe(true);
        expect(contracts!.state_readonly.platforms).toEqual(['web', 'ios', 'android']);
        // The contract must pin "never disabled semantics" — the invariant
        // the original implementation violated.
        expect(contracts!.state_readonly.behavior).toMatch(/disabled/i);
      });

      it('Input-Text-Base interaction_focusable declares the iOS readOnly carve-out', () => {
        const contractsPath = path.join(COMPONENTS_DIR, 'Input-Text-Base', 'contracts.yaml');
        const content = fs.readFileSync(contractsPath, 'utf-8');
        const parsed = yaml.load(content) as Record<string, any>;
        const focusable = parsed.contracts.interaction_focusable;

        // Declared, never silent: iOS carve-out + affirmative web/Android
        // focus-order participation (adjudication condition 1).
        expect(focusable.behavior).toMatch(/iOS readOnly carve-out/i);
        expect(focusable.behavior).toMatch(/mitigable declared exception/i);
        expect(focusable.behavior).toMatch(/REMAIN in\s+focus order/);
      });

      it('Input-Text-Password contracts.yaml excludes state_readonly (security fork deleted)', () => {
        const contractsPath = path.join(COMPONENTS_DIR, 'Input-Text-Password', 'contracts.yaml');
        const content = fs.readFileSync(contractsPath, 'utf-8');
        const parsed = yaml.load(content) as Record<string, any>;

        expect(parsed.excludes).toBeDefined();
        expect(parsed.excludes.state_readonly).toBeDefined();
        expect(parsed.excludes.state_readonly.reason).toMatch(/security/i);
        expect(parsed.excludes.state_readonly.reference).toMatch(
          /input-text-base-ios-readonly-adjudication/
        );
      });

      it('no Input-Text iOS implementation contains .disabled( anywhere', () => {
        for (const formComponent of FORM_INPUT_COMPONENTS) {
          const content = loadPlatformImpl(formComponent, 'ios');
          if (!content) continue;

          // Raw-source assertion, comments included: this is how
          // .disabled(readOnly) survived two disabled-cleanup passes.
          expect(content).not.toMatch(/\.disabled\(/);
        }
      });

      it('iOS readOnly path renders selectable Text inside the shared field chrome', () => {
        const content = loadPlatformImpl('Input-Text-Base', 'ios');
        expect(content).not.toBeNull();

        // B-prime: Text(value).textSelection(.enabled) wrapped by the
        // extracted chrome modifier, shared with the editable path.
        expect(content).toMatch(/\.textSelection\(\.enabled\)/);
        expect(content).toMatch(/InputTextBaseFieldChrome/);
        // The chrome must reserve min-height from the typographyInput
        // line-height token unconditionally on both paths (Kenya hardening).
        expect(content).toMatch(/typographyInput\.lineHeight/);
        expect(content).toMatch(/minHeight/);
      });

      it('iOS readOnly Text path is unreachable for secure fields (SECURITY gate)', () => {
        const content = loadPlatformImpl('Input-Text-Base', 'ios');
        expect(content).not.toBeNull();

        // The gate: the read-only display path must exclude .password so a
        // secure value can never render as selectable plaintext Text.
        expect(content).toMatch(/readOnly\s*&&\s*type\s*!=\s*\.password/);
        // And the rendering branch must key off the gated property, not the
        // raw readOnly prop.
        expect(content).toMatch(/if\s+isReadOnlyDisplay/);
      });

      it('iOS Input-Text-Password never forwards readOnly to the base', () => {
        const content = loadPlatformImpl('Input-Text-Password', 'ios');
        expect(content).not.toBeNull();

        // Both branches (masked SecureField and revealed .text) must strip
        // readOnly — the revealed branch would otherwise route a secret to
        // the base's plaintext Text path.
        const forwarded = content!.match(/readOnly:\s*readOnly/g);
        expect(forwarded).toBeNull();

        const stripped = content!.match(/readOnly:\s*false/g);
        expect(stripped).not.toBeNull();
        expect(stripped!.length).toBeGreaterThanOrEqual(2);
      });

      it('iOS composes a read-only accessibility indication (never a dimmed trait)', () => {
        const content = loadPlatformImpl('Input-Text-Base', 'ios');
        expect(content).not.toBeNull();

        // Composed label + value + read-only hint (Kenya R1: iOS has no
        // read-only trait; the hint is the announcement route).
        expect(content).toMatch(/Read only/);
        expect(content).toMatch(/accessibilityHint/);
      });

      it('web implements readOnly via the native readonly attribute', () => {
        const content = loadPlatformImpl('Input-Text-Base', 'web');
        expect(content).not.toBeNull();

        // Native readonly attribute = native semantics (implicit
        // aria-readonly), focus-order participation, selectable content.
        expect(content).toMatch(/readOnly\s*\?\s*'readonly'/);
      });

      it('Android passes readOnly through to the text field without disabled semantics', () => {
        const content = loadPlatformImpl('Input-Text-Base', 'android');
        expect(content).not.toBeNull();

        // Compose readOnly keeps the field focusable/selectable/copyable.
        expect(content).toMatch(/readOnly\s*=\s*readOnly/);
        // Never enabled=false — the only Compose mechanism that would remove
        // a readOnly field from focus order is banned disabled semantics.
        expect(content).not.toMatch(/enabled\s*=\s*false/);
      });

      it('Android sets TalkBack stateDescription("read only") conditionally on readOnly', () => {
        const content = loadPlatformImpl('Input-Text-Base', 'android');
        expect(content).not.toBeNull();

        // Announcement parity (adjudication condition 3): explicit
        // stateDescription in the semantics block, gated on readOnly —
        // never announced on editable fields, never a disabled/dimmed state.
        expect(content).toMatch(
          /if\s*\(readOnly\)\s*\{[^}]*stateDescription\s*=\s*"read only"/
        );
        // And the semantics property must actually be wired up (import), not
        // just mentioned in a comment.
        expect(content).toMatch(/import\s+androidx\.compose\.ui\.semantics\.stateDescription/);
      });

      it('Android Input-Text-Password never forwards readOnly to the base', () => {
        const content = loadPlatformImpl('Input-Text-Password', 'android');
        expect(content).not.toBeNull();

        // readOnly is contracted out of the Password variant (adjudication
        // condition 4). On Android this is contract conformance, not a
        // security fix — the masked PasswordVisualTransformation already
        // suppresses copy/cut ([DATA R2] §3) — but the exclusion must hold
        // uniformly: the prop is accepted for API stability and stripped.
        const forwarded = content!.match(/readOnly\s*=\s*readOnly/g);
        expect(forwarded).toBeNull();

        const stripped = content!.match(/readOnly\s*=\s*false/g);
        expect(stripped).not.toBeNull();
        expect(stripped!.length).toBeGreaterThanOrEqual(1);
      });

      it('web Input-Text-Password never forwards read-only to the base', () => {
        const content = loadPlatformImpl('Input-Text-Password', 'web');
        expect(content).not.toBeNull();

        // readOnly is contracted out of the Password variant (adjudication
        // condition 4). On web this is contract conformance, not a security
        // fix — a readonly password input stays masked and browsers block
        // copy from type=password — but the exclusion holds uniformly on all
        // three platforms.
        // The render template must not interpolate read-only onto the inner
        // input-text-base, and no code path may read the attribute.
        expect(content).not.toMatch(/\$\{readOnly/);
        expect(content).not.toMatch(/hasAttribute\(\s*['"]read-only['"]\s*\)/);

        // The attribute stays accepted (observedAttributes) for API
        // stability, documented as ignored with the adjudication reference.
        expect(content).toMatch(/'read-only',/);
        expect(content).toMatch(/input-text-base-ios-readonly-adjudication/);
      });
    });
  });

  describe('Semantic Component Contract Inheritance', () => {
    const semanticComponents = ['Input-Text-Email', 'Input-Text-Password', 'Input-Text-PhoneNumber'];
    
    for (const component of semanticComponents) {
      describe(`${component} inherits base contracts`, () => {
        it('should have schema with inherited contracts', () => {
          const contracts = loadContracts(component);
          
          if (!contracts) {
            console.log(`${component}: Contracts file could not be parsed`);
            return;
          }
          
          // Semantic components should have contracts in contracts.yaml (spec 063)
          const contractCount = Object.keys(contracts).length;
          console.log(`${component}: ${contractCount} contracts defined`);
          
          expect(contractCount).toBeGreaterThan(0);
        });

        it('should have platform implementations', () => {
          let implementationsFound = 0;
          
          for (const platform of ['web', 'ios', 'android']) {
            const content = loadPlatformImpl(component, platform);
            
            if (!content) {
              console.log(`${component}: Missing ${platform} implementation`);
            } else {
              implementationsFound++;
            }
          }
          
          // At least one platform should have an implementation
          expect(implementationsFound).toBeGreaterThan(0);
        });

        it('should implement focusable contract', () => {
          let platformsWithFocus = 0;
          
          for (const platform of ['web', 'ios', 'android']) {
            const content = loadPlatformImpl(component, platform);
            
            if (content) {
              const patterns = CONTRACT_PATTERNS.focusable[platform as keyof typeof CONTRACT_PATTERNS.focusable];
              const result = checkContractPatterns(content, patterns);
              
              if (result.found.length > 0) {
                platformsWithFocus++;
              }
            }
          }
          
          // At least one platform should implement focus
          expect(platformsWithFocus).toBeGreaterThan(0);
        });

        it('should implement error_state_display contract', () => {
          let platformsWithError = 0;
          
          for (const platform of ['web', 'ios', 'android']) {
            const content = loadPlatformImpl(component, platform);
            
            if (content) {
              const patterns = CONTRACT_PATTERNS.error_state_display[platform as keyof typeof CONTRACT_PATTERNS.error_state_display];
              const result = checkContractPatterns(content, patterns);
              
              if (result.found.length > 0) {
                platformsWithError++;
              }
            }
          }
          
          // At least one platform should implement error state
          expect(platformsWithError).toBeGreaterThan(0);
        });
      });
    }
  });

  describe('Contract Validation Summary', () => {
    it('should generate validation summary for all Form Inputs components', () => {
      const summary: Record<string, Record<string, number>> = {};
      
      for (const component of FORM_INPUT_COMPONENTS) {
        summary[component] = {};
        
        for (const platform of ['web', 'ios', 'android']) {
          const content = loadPlatformImpl(component, platform);
          
          if (content) {
            let contractsFound = 0;
            
            for (const [contractName, platformPatterns] of Object.entries(CONTRACT_PATTERNS)) {
              const patterns = platformPatterns[platform as keyof typeof platformPatterns];
              if (patterns) {
                const result = checkContractPatterns(content, patterns);
                if (result.found.length > 0) {
                  contractsFound++;
                }
              }
            }
            
            summary[component][platform] = contractsFound;
          } else {
            summary[component][platform] = 0;
          }
        }
      }
      
      console.log('\n=== Form Inputs Contract Validation Summary ===');
      console.log('Component | Web | iOS | Android');
      console.log('----------|-----|-----|--------');
      
      for (const [component, platforms] of Object.entries(summary)) {
        console.log(`${component} | ${platforms.web || 0} | ${platforms.ios || 0} | ${platforms.android || 0}`);
      }
      
      // All components should have at least some contracts implemented
      for (const [component, platforms] of Object.entries(summary)) {
        for (const [platform, count] of Object.entries(platforms)) {
          expect(count).toBeGreaterThan(0);
        }
      }
    });
  });
});
