/**
 * Index Health Check Module
 * 
 * Provides health check functionality for the document index.
 * Checks for missing documents, stale index, and malformed metadata.
 * 
 * Requirements: 9.1, 9.2, 9.5
 */

import * as fs from 'fs';
import * as path from 'path';
import { extractMetadata } from './metadata-parser';
import { extractHeadingStructure } from './heading-parser';
import { extractCrossReferences } from './cross-ref-parser';
import { IndexHealth, IndexHealthMetrics, IndexHealthStatus } from '../models';

/**
 * Options for health check
 */
export interface HealthCheckOptions {
  /** Map of indexed document paths to their content */
  indexedDocuments: Map<string, string>;
  /** Directory path being indexed */
  directoryPath: string;
  /** Last index time (ISO string) */
  lastIndexTime?: string;
  /**
   * Validated cross-reference totals from the indexer (Spec 119-B OB-1).
   * When provided, `totalCrossReferences` reports the VALIDATED index-time
   * count (a stable index property — Decision 1) instead of a re-extraction,
   * and `droppedBareIdCount > 0` emits ONE aggregate warning pointing at
   * scan-cross-references.sh for the individual listing.
   */
  crossRefTotals?: {
    validatedCount: number;
    droppedBareIdCount: number;
  };
}

/**
 * Determine the health status of the document index
 * 
 * Checks for:
 * - Missing documents (files in directory not in index)
 * - Stale index (files modified after last index time)
 * - Malformed metadata (documents with invalid or missing metadata)
 * 
 * @param options - Health check options
 * @returns IndexHealth with status, errors, warnings, and metrics
 */
export function determineIndexHealth(options: HealthCheckOptions): IndexHealth {
  const { indexedDocuments, directoryPath, lastIndexTime, crossRefTotals } = options;
  
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Get expected documents from directory
  const expectedDocs = getExpectedDocuments(directoryPath);
  const indexedPaths = Array.from(indexedDocuments.keys());
  
  // Check for missing documents
  const missingDocs = expectedDocs.filter(doc => !indexedPaths.includes(doc));
  if (missingDocs.length > 0) {
    errors.push(`Missing documents: ${missingDocs.join(', ')}`);
  }
  
  // Check for stale index (files modified after last index time)
  if (lastIndexTime) {
    const lastIndexDate = new Date(lastIndexTime);
    const staleFiles = getStaleFiles(expectedDocs, lastIndexDate);
    if (staleFiles.length > 0) {
      warnings.push(`Stale index: ${staleFiles.length} files modified since last index`);
    }
  }
  
  // Check for malformed metadata
  const malformedDocs = getDocumentsWithMalformedMetadata(indexedDocuments);
  if (malformedDocs.length > 0) {
    warnings.push(`Malformed metadata: ${malformedDocs.join(', ')}`);
  }
  
  // Dropped bare-id candidates: ONE aggregate warning on the daily-consumer
  // channel (Spec 119-B OB-1, design Component 6) — per-item detail lives in
  // the scanner, not here.
  if (crossRefTotals && crossRefTotals.droppedBareIdCount > 0) {
    warnings.push(
      `${crossRefTotals.droppedBareIdCount} unresolved bare-id link targets — run scan-cross-references.sh for the list`
    );
  }

  // Calculate metrics
  const metrics = calculateIndexMetrics(indexedDocuments);
  // Spec 119-B OB-1: prefer the indexer's validated count (stable index
  // property) over re-extraction when supplied.
  if (crossRefTotals) {
    metrics.totalCrossReferences = crossRefTotals.validatedCount;
  }

  // Determine status
  let status: IndexHealthStatus;
  if (errors.length > 0) {
    status = 'failed';
  } else if (warnings.length > 0) {
    status = 'degraded';
  } else {
    status = 'healthy';
  }
  
  return {
    status,
    documentsIndexed: indexedDocuments.size,
    lastIndexTime: lastIndexTime || new Date().toISOString(),
    errors,
    warnings,
    metrics
  };
}

/**
 * Get expected documents from a directory
 * Scans recursively for markdown files
 * 
 * @param directoryPath - Directory to scan
 * @returns Array of file paths
 */
function getExpectedDocuments(directoryPath: string): string[] {
  if (!fs.existsSync(directoryPath)) {
    return [];
  }
  
  const files: string[] = [];
  
  function scanDir(dirPath: string): void {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDir(directoryPath);
  return files;
}

/**
 * Get files that have been modified after the last index time
 * 
 * Uses a 1-second tolerance to account for filesystem timestamp granularity.
 * Files modified within 1 second of the last index time are not considered stale,
 * as they may have been written and indexed in the same operation.
 * 
 * @param filePaths - Array of file paths to check
 * @param lastIndexTime - Last index time
 * @returns Array of stale file paths
 */
function getStaleFiles(filePaths: string[], lastIndexTime: Date): string[] {
  const staleFiles: string[] = [];
  // Add 1 second tolerance to account for filesystem timestamp granularity
  const toleranceMs = 1000;
  const thresholdTime = new Date(lastIndexTime.getTime() + toleranceMs);
  
  for (const filePath of filePaths) {
    if (!fs.existsSync(filePath)) {
      continue;
    }
    
    const stats = fs.statSync(filePath);
    if (stats.mtime > thresholdTime) {
      staleFiles.push(filePath);
    }
  }
  
  return staleFiles;
}

/**
 * Get documents with malformed metadata
 * Checks for missing required fields
 * 
 * @param indexedDocuments - Map of document paths to content
 * @returns Array of document paths with malformed metadata
 */
function getDocumentsWithMalformedMetadata(indexedDocuments: Map<string, string>): string[] {
  const malformedDocs: string[] = [];
  const requiredFields = ['purpose', 'layer'];
  
  for (const [filePath, content] of indexedDocuments) {
    const metadata = extractMetadata(content);
    
    // Check for missing required fields
    let hasMalformedMetadata = false;
    
    for (const field of requiredFields) {
      const value = metadata[field as keyof typeof metadata];
      if (value === undefined || value === null || value === '') {
        hasMalformedMetadata = true;
        break;
      }
    }
    
    // Check for invalid layer value
    if (metadata.layer !== undefined && (metadata.layer < 0 || metadata.layer > 3)) {
      hasMalformedMetadata = true;
    }
    
    if (hasMalformedMetadata) {
      malformedDocs.push(filePath);
    }
  }
  
  return malformedDocs;
}

/**
 * Calculate index metrics
 * 
 * @param indexedDocuments - Map of document paths to content
 * @returns Index metrics
 */
function calculateIndexMetrics(indexedDocuments: Map<string, string>): IndexHealthMetrics {
  let totalSections = 0;
  let totalCrossReferences = 0;
  let indexSizeBytes = 0;
  
  for (const [filePath, content] of indexedDocuments) {
    // Count sections
    const outline = extractHeadingStructure(content);
    totalSections += outline.length;
    for (const section of outline) {
      totalSections += section.subsections.length;
    }
    
    // Count cross-references
    const crossRefs = extractCrossReferences(content, filePath);
    totalCrossReferences += crossRefs.length;
    
    // Calculate content size
    indexSizeBytes += Buffer.byteLength(content, 'utf-8');
  }
  
  return {
    totalDocuments: indexedDocuments.size,
    totalSections,
    totalCrossReferences,
    indexSizeBytes
  };
}
