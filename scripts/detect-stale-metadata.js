#!/usr/bin/env node

/**
 * Steering Document Staleness Detection Script
 * 
 * Detects stale metadata in steering documents based on "Last Reviewed" dates.
 * Flags documents > 6 months old (warning) and > 12 months old (error).
 * 
 * Usage: node scripts/detect-stale-metadata.js
 * 
 * Requirements: 6.4, 6.5
 */

const fs = require('fs');
const path = require('path');

// ISO 8601 date format regex (YYYY-MM-DD)
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Parse "Last Reviewed" date from a markdown file
 */
function parseLastReviewedDate(content, filename) {
  const lastReviewedMatch = content.match(/\*\*Last Reviewed\*\*:\s*(.+)/);
  
  if (!lastReviewedMatch) {
    return {
      filename,
      lastReviewed: null,
      error: 'Missing "Last Reviewed" field'
    };
  }
  
  const dateString = lastReviewedMatch[1].trim();
  
  if (!ISO_DATE_REGEX.test(dateString)) {
    return {
      filename,
      lastReviewed: null,
      error: `Invalid date format: "${dateString}" (expected YYYY-MM-DD)`
    };
  }
  
  return {
    filename,
    lastReviewed: dateString,
    error: null
  };
}

/**
 * Calculate age of document metadata in months
 */
function calculateAge(lastReviewedDate) {
  const lastReviewed = new Date(lastReviewedDate);
  const now = new Date();
  
  // Calculate difference in months
  const monthsDiff = (now - lastReviewed) / (1000 * 60 * 60 * 24 * 30);
  
  return Math.floor(monthsDiff);
}

/**
 * Determine staleness level
 */
function determineStaleness(ageInMonths) {
  if (ageInMonths > 12) {
    return 'error';
  } else if (ageInMonths > 6) {
    return 'warning';
  } else {
    return 'fresh';
  }
}

/**
 * Analyze a single steering document for staleness
 */
function analyzeDocument(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const filename = path.basename(filepath);
  
  const parsed = parseLastReviewedDate(content, filename);
  
  if (parsed.error) {
    return {
      filename: parsed.filename,
      status: 'metadata-issue',
      ageInMonths: null,
      lastReviewed: null,
      message: parsed.error
    };
  }
  
  const ageInMonths = calculateAge(parsed.lastReviewed);
  const staleness = determineStaleness(ageInMonths);
  
  let message = '';
  if (staleness === 'error') {
    message = `Document is stale: Last reviewed ${ageInMonths} months ago (> 12 months)`;
  } else if (staleness === 'warning') {
    message = `Document may be stale: Last reviewed ${ageInMonths} months ago (> 6 months)`;
  } else {
    message = `Document is fresh: Last reviewed ${ageInMonths} months ago`;
  }
  
  return {
    filename: parsed.filename,
    status: staleness,
    ageInMonths,
    lastReviewed: parsed.lastReviewed,
    message
  };
}

/**
 * Generate staleness report
 */
function generateReport(results, jsonOutput) {
  if (jsonOutput) {
    const output = {
      date: new Date().toISOString().split('T')[0],
      total: results.length,
      metadataIssues: results.filter(r => r.status === 'metadata-issue'),
      stale: results.filter(r => r.status === 'error'),
      warning: results.filter(r => r.status === 'warning'),
      fresh: results.filter(r => r.status === 'fresh')
    };
    console.log(JSON.stringify(output, null, 2));
    return output.metadataIssues.length > 0 || output.stale.length > 0 ? 1 : 0;
  }

  console.log('\n=== Steering Document Staleness Report ===\n');
  console.log(`Report Date: ${new Date().toISOString().split('T')[0]}\n`);
  
  // Separate results by status
  const metadataIssues = results.filter(r => r.status === 'metadata-issue');
  const errors = results.filter(r => r.status === 'error');
  const warnings = results.filter(r => r.status === 'warning');
  const fresh = results.filter(r => r.status === 'fresh');

  // Display metadata issues (missing/invalid Last Reviewed)
  if (metadataIssues.length > 0) {
    console.log('⚠️  METADATA ISSUES (missing or invalid Last Reviewed):\n');
    metadataIssues
      .sort((a, b) => a.filename.localeCompare(b.filename))
      .forEach(result => {
        console.log(`  📄 ${result.filename}`);
        console.log(`     ${result.message}\n`);
      });
  }
  
  // Display errors (> 12 months)
  if (errors.length > 0) {
    console.log('❌ STALE DOCUMENTS (> 12 months old):\n');
    errors
      .sort((a, b) => (b.ageInMonths || 0) - (a.ageInMonths || 0))
      .forEach(result => {
        console.log(`  📄 ${result.filename}`);
        console.log(`     Last Reviewed: ${result.lastReviewed || 'N/A'}`);
        console.log(`     Age: ${result.ageInMonths} months`);
        console.log(`     ${result.message}\n`);
      });
  }
  
  // Display warnings (6-12 months)
  if (warnings.length > 0) {
    console.log('⚠️  POTENTIALLY STALE DOCUMENTS (6-12 months old):\n');
    warnings
      .sort((a, b) => (b.ageInMonths || 0) - (a.ageInMonths || 0))
      .forEach(result => {
        console.log(`  📄 ${result.filename}`);
        console.log(`     Last Reviewed: ${result.lastReviewed}`);
        console.log(`     Age: ${result.ageInMonths} months`);
        console.log(`     ${result.message}\n`);
      });
  }
  
  // Display fresh documents (< 6 months)
  if (fresh.length > 0) {
    console.log('✅ FRESH DOCUMENTS (< 6 months old):\n');
    fresh
      .sort((a, b) => (b.ageInMonths || 0) - (a.ageInMonths || 0))
      .forEach(result => {
        console.log(`  📄 ${result.filename}`);
        console.log(`     Last Reviewed: ${result.lastReviewed}`);
        console.log(`     Age: ${result.ageInMonths} months\n`);
      });
  }
  
  // Summary
  console.log('=== Summary ===\n');
  console.log(`Total documents: ${results.length}`);
  console.log(`Fresh (< 6 months): ${fresh.length}`);
  console.log(`Potentially stale (6-12 months): ${warnings.length}`);
  console.log(`Stale (> 12 months): ${errors.length}`);
  console.log(`Metadata issues (missing/invalid): ${metadataIssues.length}`);
  
  // Recommendations
  if (errors.length > 0 || warnings.length > 0 || metadataIssues.length > 0) {
    console.log('\n=== Recommendations ===\n');
    
    if (metadataIssues.length > 0) {
      console.log('⚠️  FIX: Add or correct "Last Reviewed" field in documents with metadata issues');
      console.log('   These documents are missing required metadata, not necessarily stale.\n');
    }
    
    if (errors.length > 0) {
      console.log('❌ URGENT: Review and update documents that are > 12 months old');
      console.log('   These documents may contain outdated information.\n');
    }
    
    if (warnings.length > 0) {
      console.log('⚠️  RECOMMENDED: Review documents that are 6-12 months old');
      console.log('   Schedule quarterly reviews to keep metadata current.\n');
    }
  } else {
    console.log('\n✅ All documents are fresh! No action needed.\n');
  }
  
  // Exit code: 0 = clean, 1 = findings, 2 = script error
  if (errors.length > 0 || metadataIssues.length > 0) {
    return 1;
  }
  return 0;
}

/**
 * Main execution
 */
function main() {
  const steeringDir = path.join(process.cwd(), '.kiro', 'steering');
  const jsonOutput = process.argv.includes('--json');
  
  if (!fs.existsSync(steeringDir)) {
    console.error(`Error: Steering directory not found at ${steeringDir}`);
    process.exit(2);
  }
  
  // Get all markdown files in steering directory
  const files = fs.readdirSync(steeringDir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(steeringDir, file));
  
  if (files.length === 0) {
    console.log('No markdown files found in steering directory');
    process.exit(0);
  }
  
  if (!jsonOutput) {
    console.log(`Analyzing ${files.length} steering documents for staleness...\n`);
  }
  
  // Analyze all documents
  const results = files.map(analyzeDocument);
  
  // Generate and display report
  const exitCode = generateReport(results, jsonOutput);
  process.exit(exitCode);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  parseLastReviewedDate,
  calculateAge,
  determineStaleness,
  analyzeDocument
};
