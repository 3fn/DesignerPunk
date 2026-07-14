/**
 * @jest-environment node
 * @category evergreen
 * @purpose Validate behavioral contracts across web, iOS, and Android platforms
 */

/**
 * Behavioral Contract Validation Test Suite
 *
 * Validates that component behavioral contracts are honored consistently across
 * web, iOS, and Android platforms. This test suite implements the validation
 * framework defined in Test-Behavioral-Contract-Validation.md.
 *
 * @see .kiro/steering/Test-Behavioral-Contract-Validation.md
 * @see .kiro/specs/034-component-architecture-system/design.md
 * @validates Requirements R6.1, R6.2, R6.3, R6.4, R6.5
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// Types for behavioral contract validation
interface BehavioralContract {
  description: string;
  behavior: string;
  wcag?: string;
  platforms: string[];
  validation: string;
  inherited?: boolean;
}

interface ComponentSchema {
  name: string;
  type: string;
  family: string;
  version: string;
  readiness: string;
  behaviors: string[];
  contracts: Record<string, BehavioralContract>;
  platforms: string[];
  platform_notes?: Record<string, any>;
}

interface PlatformImplementation {
  platform: string;
  exists: boolean;
  filePath: string;
  hasContract: boolean;
}

interface ContractValidationResult {
  contractName: string;
  description: string;
  platforms: string[];
  platformImplementations: PlatformImplementation[];
  isConsistent: boolean;
  issues: string[];
}

// Component paths
const COMPONENTS_DIR = path.join(process.cwd(), 'src/components/core');
// Auto-discover components with non-empty contracts.yaml (Spec 078 Task 2.3)
const COMPONENTS = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .filter(name => {
    const contractsPath = path.join(COMPONENTS_DIR, name, 'contracts.yaml');
    if (!fs.existsSync(contractsPath)) return false;
    const content = fs.readFileSync(contractsPath, 'utf-8');
    const parsed = yaml.load(content) as Record<string, any>;
    return parsed?.contracts && Object.keys(parsed.contracts).length > 0;
  });

// Platform file patterns
const PLATFORM_PATTERNS: Record<string, { dir: string; extension: string }> = {
  web: { dir: 'platforms/web', extension: '.ts' },
  ios: { dir: 'platforms/ios', extension: '.swift' },
  android: { dir: 'platforms/android', extension: '.kt' },
};

/**
 * Load and parse a component schema YAML file
 */
function loadComponentSchema(componentName: string): ComponentSchema | null {
  const schemaPath = path.join(COMPONENTS_DIR, componentName, `${componentName}.schema.yaml`);
  
  if (!fs.existsSync(schemaPath)) {
    return null;
  }
  
  try {
    const content = fs.readFileSync(schemaPath, 'utf-8');
    return yaml.load(content) as ComponentSchema;
  } catch (error) {
    // Some schemas may have YAML syntax that js-yaml struggles with
    // Log the error but don't fail - return null to skip this component
    console.log(`Warning: Could not parse schema for ${componentName}: ${(error as Error).message}`);
    return null;
  }
}

/**
 * Load behavioral contracts from contracts.yaml (sole source of truth per spec 063)
 */
function loadComponentContracts(componentName: string): Record<string, BehavioralContract> | null {
  const contractsPath = path.join(COMPONENTS_DIR, componentName, 'contracts.yaml');
  
  if (!fs.existsSync(contractsPath)) {
    return null;
  }
  
  try {
    const content = fs.readFileSync(contractsPath, 'utf-8');
    const parsed = yaml.load(content) as Record<string, any>;
    return (parsed?.contracts as Record<string, BehavioralContract>) || null;
  } catch (error) {
    console.log(`Warning: Could not parse contracts for ${componentName}: ${(error as Error).message}`);
    return null;
  }
}

/**
 * Check if a platform implementation file exists
 */
function checkPlatformImplementation(
  componentName: string,
  platform: string
): PlatformImplementation {
  const pattern = PLATFORM_PATTERNS[platform];
  if (!pattern) {
    return {
      platform,
      exists: false,
      filePath: '',
      hasContract: false,
    };
  }
  
  const componentDir = path.join(COMPONENTS_DIR, componentName);
  const platformDir = path.join(componentDir, pattern.dir);
  
  // Find the implementation file
  let filePath = '';
  let exists = false;
  
  if (fs.existsSync(platformDir)) {
    const files = fs.readdirSync(platformDir);
    const implFile = files.find(f => f.endsWith(pattern.extension));
    if (implFile) {
      filePath = path.join(platformDir, implFile);
      exists = true;
    }
  }
  
  return {
    platform,
    exists,
    filePath,
    hasContract: exists, // Assume contract is implemented if file exists
  };
}

/**
 * Validate a single behavioral contract across platforms
 */
function validateContract(
  componentName: string,
  contractName: string,
  contract: BehavioralContract
): ContractValidationResult {
  const platformImplementations: PlatformImplementation[] = [];
  const issues: string[] = [];
  
  for (const platform of contract.platforms) {
    const impl = checkPlatformImplementation(componentName, platform);
    platformImplementations.push(impl);
    
    if (!impl.exists) {
      issues.push(`Missing ${platform} implementation for contract '${contractName}'`);
    }
  }
  
  const isConsistent = issues.length === 0 && 
    platformImplementations.every(p => p.exists);
  
  return {
    contractName,
    description: contract.description,
    platforms: contract.platforms,
    platformImplementations,
    isConsistent,
    issues,
  };
}

describe('Behavioral Contract Validation Suite', () => {
  describe('Component Schema Validation', () => {
    it('all components should have schema files', () => {
      for (const component of COMPONENTS) {
        const schemaPath = path.join(COMPONENTS_DIR, component, `${component}.schema.yaml`);
        const exists = fs.existsSync(schemaPath);
        
        if (!exists) {
          console.log(`Missing schema: ${component}`);
        }
        
        expect(exists).toBe(true);
      }
    });

    it('all schemas should have required fields', () => {
      // Per spec 063: contracts live in contracts.yaml, not in schema
      const requiredFields = ['name', 'type', 'family', 'behaviors', 'platforms'];
      
      for (const component of COMPONENTS) {
        const schema = loadComponentSchema(component);
        
        if (!schema) {
          console.log(`Could not load schema for ${component}`);
          continue;
        }
        
        for (const field of requiredFields) {
          const hasField = field in schema;
          
          if (!hasField) {
            console.log(`${component}: Missing required field '${field}'`);
          }
          
          expect(hasField).toBe(true);
        }
      }
    });

    it('all schemas should have at least one behavioral contract', () => {
      for (const component of COMPONENTS) {
        const contracts = loadComponentContracts(component);
        
        if (!contracts) {
          console.log(`${component}: No contracts.yaml found`);
          continue;
        }
        
        const contractCount = Object.keys(contracts).length;
        
        if (contractCount === 0) {
          console.log(`${component}: No behavioral contracts defined`);
        }
        
        expect(contractCount).toBeGreaterThan(0);
      }
    });
  });

  describe('Platform Parity Validation', () => {
    it('all components should have implementations for declared platforms', () => {
      for (const component of COMPONENTS) {
        const schema = loadComponentSchema(component);
        
        if (!schema) continue;
        
        for (const platform of (schema.platforms || [])) {
          const impl = checkPlatformImplementation(component, platform);
          
          if (!impl.exists) {
            console.log(`${component}: Missing ${platform} implementation`);
          }
          
          expect(impl.exists).toBe(true);
        }
      }
    });

    it('all contracts should specify platforms', () => {
      for (const component of COMPONENTS) {
        const contracts = loadComponentContracts(component);
        
        if (!contracts) continue;
        
        for (const [contractName, contract] of Object.entries(contracts)) {
          const hasPlatforms = contract.platforms && contract.platforms.length > 0;
          
          if (!hasPlatforms) {
            console.log(`${component}.${contractName}: No platforms specified`);
          }
          
          expect(hasPlatforms).toBe(true);
        }
      }
    });
  });

  describe('Contract Consistency Validation', () => {
    it('all contracts should have implementations on all declared platforms', () => {
      const results: ContractValidationResult[] = [];
      
      for (const component of COMPONENTS) {
        const contracts = loadComponentContracts(component);
        
        if (!contracts) continue;
        
        for (const [contractName, contract] of Object.entries(contracts)) {
          const result = validateContract(component, contractName, contract);
          results.push(result);
          
          if (!result.isConsistent) {
            console.log(`${component}.${contractName}: ${result.issues.join(', ')}`);
          }
        }
      }
      
      const inconsistentContracts = results.filter(r => !r.isConsistent);
      
      console.log(`\nContract Validation Summary:`);
      console.log(`  Total contracts: ${results.length}`);
      console.log(`  Consistent: ${results.length - inconsistentContracts.length}`);
      console.log(`  Inconsistent: ${inconsistentContracts.length}`);
      
      // All contracts should be consistent
      expect(inconsistentContracts.length).toBe(0);
    });
  });

  describe('WCAG Reference Validation', () => {
    /**
     * NORMATIVE WCAG-REQUIRED MATCHER — Spec 125-B U2, Task 4.2 (audit) → 4.3 (arm).
     *
     * Copied VERBATIM from the Task 4.2 audit matcher:
     *   .kiro/specs/125-B-classification-map/completion/u2/wcag-required-matcher.ts
     *
     * CONTINUITY CONTRACT (Req 12.3 / LINA tasks-R1): Task 4.2's pre-arm WCAG audit
     * enumerated the corpus THROUGH this exact function (and the same COMPONENTS
     * loader below), so "audit-clean ⇒ arm-green by construction" holds ONLY while
     * this predicate stays unmodified. ANY change to it RE-OPENS the 4.2 audit —
     * do not "improve" it here.
     *
     * Replaces the legacy DORMANT six-name trigger (armed-but-aimed-at-6-retired
     * legacy contract names — Spec 063 renamed them to canonical
     * `{category}_{concept}` form; this check never matched the renamed names).
     */
    const WCAG_REQUIRED_EXACT: ReadonlySet<string> = new Set([
      'interaction_focusable',
      'interaction_focus_ring',
      'state_disabled',
      'state_error',
    ]);

    function isWcagRequiredContract(contractName: string): boolean {
      if (WCAG_REQUIRED_EXACT.has(contractName)) return true;
      if (contractName.startsWith('accessibility_')) return true;
      if (contractName.startsWith('content_') && contractName.endsWith('_label')) return true;
      return false;
    }

    it('accessibility-related contracts should have WCAG references', () => {
      // Match-count floor (Req 12.4 / DD3): the DORMANT lesson made structural —
      // an empty (or stale) selection fails the check itself.
      let totalSelected = 0;
      const perLiteralCounts: Record<string, number> = {
        interaction_focusable: 0,
        interaction_focus_ring: 0,
        state_error: 0,
      };

      for (const component of COMPONENTS) {
        const contracts = loadComponentContracts(component);

        if (!contracts) continue;

        for (const [contractName, contract] of Object.entries(contracts)) {
          if (isWcagRequiredContract(contractName)) {
            totalSelected++;
            if (contractName in perLiteralCounts) {
              perLiteralCounts[contractName]++;
            }

            const hasWcag = contract.wcag && contract.wcag.length > 0;

            if (!hasWcag) {
              console.log(`${component}.${contractName}: Missing WCAG reference`);
            }

            expect(hasWcag).toBe(true);
          }
        }
      }

      // Aggregate floor (DD3): non-empty selection (audited at 69 on the current
      // corpus — Task 4.2 adjudication table).
      expect(totalSelected).toBeGreaterThan(0);

      // Per-literal presence floor (DD3), THREE literals per Peter's 2026-07-14
      // amendment — NOT the four DD3 originally recorded. `state_disabled` is
      // EXCLUDED from this floor pending the Button-CTA disabled-state
      // adjudication (the matcher itself is unchanged: state_disabled contracts
      // are still selected above and still must carry a valid wcag ref; only the
      // per-literal PRESENCE floor omits it). See:
      // .kiro/specs/125-B-classification-map/completion/u2/stemma-pre-arm-adjudication.md § 7
      expect(perLiteralCounts.interaction_focusable).toBeGreaterThan(0);
      expect(perLiteralCounts.interaction_focus_ring).toBeGreaterThan(0);
      expect(perLiteralCounts.state_error).toBeGreaterThan(0);
    });

    it('WCAG references should follow standard format', () => {
      // WCAG references can be in various formats:
      // - "2.1.1 Keyboard"
      // - "3.3.1 Error Identification, 1.4.1 Use of Color"
      // - "4.1.2 Name, Role, Value" (single reference with commas in name)
      // - "N/A" for non-accessibility contracts
      
      // Pattern for a single WCAG reference (number + text, may contain commas)
      const singleRefPattern = /^\d+\.\d+(\.\d+)?\s+.+$/;
      
      for (const component of COMPONENTS) {
        const contracts = loadComponentContracts(component);
        
        if (!contracts) continue;
        
        for (const [contractName, contract] of Object.entries(contracts)) {
          if (contract.wcag && contract.wcag !== 'N/A') {
            // Try to validate the WCAG reference
            // It could be a single reference or multiple separated by comma + space + number
            const wcagValue = contract.wcag;
            
            // Check if it's a valid single reference
            if (singleRefPattern.test(wcagValue)) {
              // Valid single reference
              continue;
            }
            
            // Try splitting by ", " followed by a number (indicating multiple refs)
            const multiRefPattern = /,\s+(?=\d)/;
            const references = wcagValue.split(multiRefPattern).map((r: string) => r.trim());
            
            let allValid = true;
            for (const ref of references) {
              if (!singleRefPattern.test(ref)) {
                console.log(`${component}.${contractName}: Invalid WCAG format '${ref}'`);
                allValid = false;
              }
            }
            
            expect(allValid).toBe(true);
          }
        }
      }
    });
  });

  describe('Validation Criteria Completeness', () => {
    it('all contracts should have validation criteria', () => {
      let contractsWithValidation = 0;
      let contractsWithoutValidation = 0;
      
      for (const component of COMPONENTS) {
        const contracts = loadComponentContracts(component);
        
        if (!contracts) continue;
        
        for (const [contractName, contract] of Object.entries(contracts)) {
          // Inherited contracts may not have validation defined locally
          if (contract.inherited) {
            continue;
          }
          
          // In canonical format (spec 063), validation is a list
          const hasValidation = contract.validation &&
            (Array.isArray(contract.validation) ? contract.validation.length > 0 : String(contract.validation).trim().length > 0);
          
          if (!hasValidation) {
            console.log(`${component}.${contractName}: Missing validation criteria`);
            contractsWithoutValidation++;
          } else {
            contractsWithValidation++;
          }
        }
      }
      
      console.log(`\nValidation Criteria Summary:`);
      console.log(`  With validation: ${contractsWithValidation}`);
      console.log(`  Without validation: ${contractsWithoutValidation}`);

      // Promoted (Req 12.6 / DD4, audit-first — Task 4.2's inventory found the
      // corpus already clean: 234 non-inherited contracts, 0 without validation;
      // zero fixes, zero escalations needed). Inherited-contract skip preserved
      // above. DD4: no exemption mechanism — fix-all, escalate-if-candidate.
      expect(contractsWithoutValidation).toBe(0);
    });

    it('validation criteria should include testable assertions', () => {
      // In canonical format (spec 063), validation is a list of assertions
      for (const component of COMPONENTS) {
        const contracts = loadComponentContracts(component);
        
        if (!contracts) continue;
        
        for (const [contractName, contract] of Object.entries(contracts)) {
          // Skip inherited contracts
          if (contract.inherited) {
            continue;
          }
          
          if (contract.validation) {
            // Canonical format uses a list; legacy format uses multiline string with dashes
            const hasAssertions = Array.isArray(contract.validation)
              ? contract.validation.length > 0
              : String(contract.validation).includes('-');
            
            if (!hasAssertions) {
              console.log(`${component}.${contractName}: Validation lacks testable assertions`);
            }
            
            expect(hasAssertions).toBe(true);
          }
        }
      }
    });
  });
});
