#!/usr/bin/env node

/**
 * Steering Document Metadata Validation Script
 * 
 * Validates metadata headers in steering documents against the schema defined in
 * .kiro/specs/020-steering-documentation-refinement/metadata-template.md
 * 
 * Usage: node scripts/validate-steering-metadata.js
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

/**
 * Spec 119-A Task 4.2 — the Thurgood metadata-validation hook is the day-to-day
 * front line for the `id`-uniqueness invariant ("one function, two callers": this
 * hook AND the net-new CI npm script invoke the SAME checkIdUniqueness core in
 * mcp-server/src/id-guard/). This hook runs under `node` (not tsx), so it invokes
 * the shared TypeScript core through the same CLI the CI leg uses — there is no
 * second copy of the uniqueness logic. Returns the guard's exit code (0 = unique).
 */
function runIdUniquenessGuard() {
  const projectRoot = process.cwd();
  const cli = path.join(projectRoot, 'scripts', 'check-id-uniqueness.ts');
  if (!fs.existsSync(cli)) {
    console.log('\n⚠️  id-uniqueness guard CLI not found — skipping (scripts/check-id-uniqueness.ts).');
    return 0;
  }
  console.log('\n=== id Uniqueness Guard (Spec 119-A, via shared core) ===');
  const res = spawnSync('npx', ['tsx', cli], {
    cwd: projectRoot,
    stdio: 'inherit',
    encoding: 'utf-8',
  });
  if (res.error) {
    console.log(`⚠️  Could not run id-uniqueness guard (${res.error.message}) — not blocking metadata validation.`);
    return 0;
  }
  return res.status === null ? 1 : res.status;
}

// Standardized task vocabulary (expanded from original 14 core types)
const CORE_TASK_TYPES = [
  'spec-creation',
  'general-task-execution',
  'architecture',
  'coding',
  'accessibility-development',
  'validation',
  'debugging',
  'documentation',
  'maintenance',
  'performance-optimization',
  'file-organization',
  'refactoring',
  'migration',
  'hook-setup'
];

// Additional task types added through project evolution
const ADDITIONAL_TASK_TYPES = [
  'component-development',
  'component-selection',
  'token-selection',
  'token-development',
  'token-format',
  'cross-platform-components',
  'cross-platform-validation',
  'platform-implementation',
  'cross-platform-parity',
  'build-issues',
  'typescript-errors',
  'testing-output',
  'ui-composition',
  'feature-building',
  'pipeline-integration',
  'mcp-documentation',
  'mcp-integration',
  'mcp-development',
  'product-development',
  'audit',
  'test-failure-audit',
  'test-quality',
  'spec-completion',
  'spec-planning',
  'agent-architecture',
  'tool-integration',
  'dtcg-integration',
  'tooling-development',
  'transformer-development',
  'figma-integration',
  'token-push',
  'design-extraction',
  'web-component-integration',
  'browser-distribution',
  'icon-integration',
  'responsive-design',
  'token-system-development',
  'component-creation',
  'component-audit',
  'screen-specification',
  'layout-templates',
  'hook-debugging',
  'hook-setup',
  'automation-troubleshooting',
  'task-completion',
  'release-related-work',
  'test-coverage-audit',
  'all-tasks',
  'component-implementation',  // Spec 102: added as consolidation of *-implementation family (badge, button, chip, etc.)
  'architecture-planning',  // Spec 102: added for docs about architectural planning work (4 docs)
  'testing',  // Spec 102: added for docs about testing practices (2 docs)
  'token-creation',  // Spec 102: added for docs about token creation workflows (1 doc)
  'styling',  // Spec 102: added for Token-Quick-Reference (referenced during styling tasks)
  'integrations',  // Spec 102: added for docs about integration work (1 doc)
  'accessibility-compliance',  // Spec 102: added for docs about accessibility compliance (1 doc)
  'screen-implementation',  // Implementation counterpart to screen-specification (parallel to component-implementation) — product-screen implementation work (the `data` agent's remit); used by Web-Authoring-Standards.md
  'product-token-authoring'  // Product-side token authoring (Ada's product-token remit) — used by Token-Family-Color.md, Web-Authoring-Standards.md, platform-implementation-guidelines.md
];

const ALL_TASK_TYPES = [...CORE_TASK_TYPES, ...ADDITIONAL_TASK_TYPES];

// Valid values for controlled vocabulary fields
const VALID_ORGANIZATION = [
  'process-standard',
  'architecture-overview',
  'spec-guide',
  'spec-summary',
  'spec-completion',
  'token-documentation',  // Spec 102: added for Token-Family-*.md docs (16 docs, domain-legitimate)
];
const VALID_SCOPE = ['cross-project'];
const VALID_LAYERS = [0, 1, 2, 3];
const VALID_INCLUSION = ['always', 'conditional', 'manual'];

// ISO 8601 date format regex (YYYY-MM-DD)
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Parse metadata from a markdown file
 */
function parseMetadata(content, filename) {
  const metadata = {
    filename,
    errors: [],
    warnings: [],
    fields: {}
  };

  // Extract metadata fields using regex
  const dateMatch = content.match(/\*\*Date\*\*:\s*(.+)/);
  const lastReviewedMatch = content.match(/\*\*Last Reviewed\*\*:\s*(.+)/);
  const purposeMatch = content.match(/\*\*Purpose\*\*:\s*(.+)/);
  const organizationMatch = content.match(/\*\*Organization\*\*:\s*(.+)/);
  const scopeMatch = content.match(/\*\*Scope\*\*:\s*(.+)/);
  const layerMatch = content.match(/\*\*Layer\*\*:\s*(.+)/);
  const relevantTasksMatch = content.match(/\*\*Relevant Tasks\*\*:\s*(.+)/);

  // Extract YAML front matter
  const yamlMatch = content.match(/---\n([\s\S]*?)\n---/);
  let yamlContent = '';
  if (yamlMatch) {
    yamlContent = yamlMatch[1];
  }

  const inclusionMatch = yamlContent.match(/inclusion:\s*(.+)/);
  const triggerMatch = yamlContent.match(/trigger:\s*(.+)/);

  // Store extracted values
  if (dateMatch) metadata.fields.date = dateMatch[1].trim();
  if (lastReviewedMatch) metadata.fields.lastReviewed = lastReviewedMatch[1].trim();
  if (purposeMatch) metadata.fields.purpose = purposeMatch[1].trim();
  if (organizationMatch) metadata.fields.organization = organizationMatch[1].trim();
  if (scopeMatch) metadata.fields.scope = scopeMatch[1].trim();
  if (layerMatch) metadata.fields.layer = layerMatch[1].trim();
  if (relevantTasksMatch) metadata.fields.relevantTasks = relevantTasksMatch[1].trim();
  if (inclusionMatch) metadata.fields.inclusion = inclusionMatch[1].trim();
  if (triggerMatch) metadata.fields.trigger = triggerMatch[1].trim();

  return metadata;
}

/**
 * Validate required fields presence
 */
function validateRequiredFields(metadata) {
  const requiredFields = [
    'date',
    'lastReviewed',
    'purpose',
    'organization',
    'scope',
    'layer',
    'relevantTasks',
    'inclusion'
  ];

  for (const field of requiredFields) {
    if (!metadata.fields[field]) {
      metadata.errors.push(`Missing required field: ${field}`);
    }
  }

  // Trigger is required if inclusion is conditional
  if (metadata.fields.inclusion === 'conditional' && !metadata.fields.trigger) {
    metadata.errors.push('Missing required field: trigger (required when inclusion is conditional)');
  }
}

/**
 * Validate date format (ISO 8601: YYYY-MM-DD)
 */
function validateDateFormat(metadata) {
  if (metadata.fields.date && !ISO_DATE_REGEX.test(metadata.fields.date)) {
    metadata.errors.push(`Invalid date format: "${metadata.fields.date}" (expected YYYY-MM-DD)`);
  }

  if (metadata.fields.lastReviewed && !ISO_DATE_REGEX.test(metadata.fields.lastReviewed)) {
    metadata.errors.push(`Invalid lastReviewed format: "${metadata.fields.lastReviewed}" (expected YYYY-MM-DD)`);
  }
}

/**
 * Validate layer number (0-3)
 */
function validateLayer(metadata) {
  if (metadata.fields.layer) {
    const layer = parseInt(metadata.fields.layer, 10);
    if (isNaN(layer) || !VALID_LAYERS.includes(layer)) {
      metadata.errors.push(`Invalid layer: "${metadata.fields.layer}" (expected 0, 1, 2, or 3)`);
    }
  }
}

/**
 * Validate organization field
 */
function validateOrganization(metadata) {
  if (metadata.fields.organization && !VALID_ORGANIZATION.includes(metadata.fields.organization)) {
    metadata.errors.push(`Invalid organization: "${metadata.fields.organization}" (expected: ${VALID_ORGANIZATION.join(', ')})`);
  }
}

/**
 * Validate scope field
 */
function validateScope(metadata) {
  if (metadata.fields.scope && !VALID_SCOPE.includes(metadata.fields.scope)) {
    metadata.errors.push(`Invalid scope: "${metadata.fields.scope}" (expected: ${VALID_SCOPE.join(', ')})`);
  }
}

/**
 * Validate inclusion field
 */
function validateInclusion(metadata) {
  if (metadata.fields.inclusion && !VALID_INCLUSION.includes(metadata.fields.inclusion)) {
    metadata.errors.push(`Invalid inclusion: "${metadata.fields.inclusion}" (expected: ${VALID_INCLUSION.join(', ')})`);
  }
}

/**
 * Validate task type names against standardized vocabulary
 */
function validateTaskTypes(metadata) {
  // Validate relevantTasks
  if (metadata.fields.relevantTasks) {
    const relevantTasks = metadata.fields.relevantTasks;
    
    // Special case: "all-tasks" is valid
    if (relevantTasks === 'all-tasks') {
      return;
    }

    // Parse comma-separated list
    const taskTypes = relevantTasks.split(',').map(t => t.trim());
    
    for (const taskType of taskTypes) {
      if (!ALL_TASK_TYPES.includes(taskType)) {
        metadata.errors.push(`Invalid task type in relevantTasks: "${taskType}" (not in recognized task vocabulary)`);
      }
    }
  }

  // Validate trigger task types
  if (metadata.fields.trigger) {
    const triggerTypes = metadata.fields.trigger.split(',').map(t => t.trim());
    
    for (const taskType of triggerTypes) {
      if (!ALL_TASK_TYPES.includes(taskType)) {
        metadata.errors.push(`Invalid task type in trigger: "${taskType}" (not in standardized vocabulary)`);
      }
    }
  }
}

/**
 * Check for staleness warnings
 */
function checkStaleness(metadata) {
  if (!metadata.fields.lastReviewed) {
    return;
  }

  // Only check staleness if date format is valid
  if (!ISO_DATE_REGEX.test(metadata.fields.lastReviewed)) {
    return; // Invalid date format, already caught by validateDateFormat
  }

  const lastReviewed = new Date(metadata.fields.lastReviewed);
  const now = new Date();
  const monthsDiff = (now - lastReviewed) / (1000 * 60 * 60 * 24 * 30);

  if (monthsDiff > 12) {
    metadata.errors.push(`Document is stale: Last reviewed ${Math.floor(monthsDiff)} months ago (> 12 months)`);
  } else if (monthsDiff > 6) {
    metadata.warnings.push(`Document may be stale: Last reviewed ${Math.floor(monthsDiff)} months ago (> 6 months)`);
  }
}

/**
 * Validate a single steering document
 */
function validateDocument(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const filename = path.basename(filepath);
  
  const metadata = parseMetadata(content, filename);
  
  // Run all validations
  validateRequiredFields(metadata);
  validateDateFormat(metadata);
  validateLayer(metadata);
  validateOrganization(metadata);
  validateScope(metadata);
  validateInclusion(metadata);
  validateTaskTypes(metadata);
  checkStaleness(metadata);
  
  return metadata;
}

/**
 * Generate validation report
 */
function generateReport(results) {
  console.log('\n=== Steering Document Metadata Validation Report ===\n');
  
  let totalErrors = 0;
  let totalWarnings = 0;
  let validDocuments = 0;
  
  for (const result of results) {
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
    
    if (result.errors.length === 0 && result.warnings.length === 0) {
      validDocuments++;
      console.log(`✅ ${result.filename} - Valid metadata`);
    } else {
      console.log(`\n📄 ${result.filename}`);
      
      if (result.errors.length > 0) {
        console.log('  ❌ Errors:');
        result.errors.forEach(error => console.log(`     - ${error}`));
      }
      
      if (result.warnings.length > 0) {
        console.log('  ⚠️  Warnings:');
        result.warnings.forEach(warning => console.log(`     - ${warning}`));
      }
    }
  }
  
  console.log('\n=== Summary ===\n');
  console.log(`Total documents: ${results.length}`);
  console.log(`Valid documents: ${validDocuments}`);
  console.log(`Documents with errors: ${results.filter(r => r.errors.length > 0).length}`);
  console.log(`Documents with warnings: ${results.filter(r => r.warnings.length > 0).length}`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Total warnings: ${totalWarnings}`);
  
  if (totalErrors === 0 && totalWarnings === 0) {
    console.log('\n✅ All steering documents have valid metadata!\n');
    return 0;
  } else if (totalErrors === 0) {
    console.log('\n⚠️  All documents valid but some have warnings\n');
    return 0;
  } else {
    console.log('\n❌ Some documents have metadata errors that need to be fixed\n');
    return 1;
  }
}

/**
 * Main execution
 */
function main() {
  const steeringDir = path.join(process.cwd(), '.kiro', 'steering');
  
  if (!fs.existsSync(steeringDir)) {
    console.error(`Error: Steering directory not found at ${steeringDir}`);
    process.exit(1);
  }
  
  // Get all markdown files in steering directory
  const files = fs.readdirSync(steeringDir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(steeringDir, file));
  
  if (files.length === 0) {
    console.log('No markdown files found in steering directory');
    process.exit(0);
  }
  
  console.log(`Found ${files.length} steering documents to validate\n`);
  
  // Validate all documents
  const results = files.map(validateDocument);
  
  // Generate and display report
  const metadataExitCode = generateReport(results);

  // Spec 119-A Task 4.2: the id-uniqueness guard is part of the metadata hook's
  // front-line enforcement — doc create/modify blocks on an id collision. Block
  // if EITHER metadata validation OR the uniqueness guard fails.
  const idGuardExitCode = runIdUniquenessGuard();
  process.exit(metadataExitCode !== 0 ? metadataExitCode : idGuardExitCode);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  parseMetadata,
  validateDocument,
  runIdUniquenessGuard,
  CORE_TASK_TYPES,
  ALL_TASK_TYPES
};
