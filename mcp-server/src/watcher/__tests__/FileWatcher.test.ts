/**
 * FileWatcher Tests
 * 
 * Tests the FileWatcher class functionality including:
 * - Starting and stopping the watcher
 * - Detecting file modifications
 * - Detecting file additions
 * - Detecting file deletions
 * - Triggering re-indexing on changes
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4
 */

import * as fs from 'fs';
import * as path from 'path';
import { FileWatcher } from '../FileWatcher';
import { DocumentIndexer } from '../../indexer/DocumentIndexer';

// Headroom over the watcherReady 5s ceiling + per-test waits, so a genuinely
// dead watcher fails on the assertion rather than a Jest timeout
jest.setTimeout(15000);

// Test fixtures directory
const TEST_FIXTURES_DIR = path.join(__dirname, 'fixtures');

// Sample document content
const SAMPLE_DOC = `# Sample Document

**Date**: 2025-12-16
**Purpose**: Test document for watcher
**Organization**: test-org
**Scope**: test-scope
**Layer**: 2
**Relevant Tasks**: testing
**Last Reviewed**: 2025-12-16

## Overview

This is a test document.
`;

/**
 * Poll until the condition holds, with a generous ceiling. Under
 * parallel/loaded runs, fs.watch event delivery plus the 50ms debounce can
 * exceed a fixed short sleep (a fixed 200ms wait flaked under consecutive
 * full runs), so wait adaptively instead. On timeout, returns and lets the
 * following assertion report the failure.
 */
async function waitFor(condition: () => boolean, timeoutMs = 2000): Promise<void> {
  const start = Date.now();
  while (!condition() && Date.now() - start < timeoutMs) {
    await new Promise(resolve => setTimeout(resolve, 25));
  }
}

/**
 * Wait until the watcher's underlying fs.watch stream is actually delivering
 * events. On macOS, FSEvents streams start asynchronously — a change made
 * right after start() returns can be missed entirely (observed as a
 * persistent flake in the additions test, unfixable by waiting longer).
 * Touches a warmup file until the spy fires, lets the debounce quiesce,
 * then resets the spy for the real assertion.
 */
async function watcherReady(spy: jest.SpyInstance, dir: string): Promise<void> {
  const warmupFile = path.join(dir, 'watcher-warmup.md');
  const deadline = Date.now() + 5000;
  while (spy.mock.calls.length === 0 && Date.now() < deadline) {
    fs.writeFileSync(warmupFile, `# warmup ${Date.now()}`);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  // Let residual warmup events and debounce timers flush before resetting.
  // The warmup file is left in place: deleting it here would emit another
  // event after the reset. afterEach removes the whole directory.
  await new Promise(resolve => setTimeout(resolve, 200));
  spy.mockClear();
}

describe('FileWatcher', () => {
  let indexer: DocumentIndexer;
  let watcher: FileWatcher;
  let testDir: string;
  
  beforeEach(() => {
    indexer = new DocumentIndexer();
    testDir = path.join(TEST_FIXTURES_DIR, `test-${Date.now()}`);
    
    // Create test directory
    fs.mkdirSync(testDir, { recursive: true });
    
    // Create watcher with short debounce for testing
    watcher = new FileWatcher(indexer, testDir, 50);
  });
  
  afterEach(() => {
    // Stop watcher
    watcher.stop();
    
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
  
  describe('constructor', () => {
    it('should create a FileWatcher instance', () => {
      expect(watcher).toBeInstanceOf(FileWatcher);
    });
    
    it('should not be watching initially', () => {
      expect(watcher.isWatching()).toBe(false);
    });
  });
  
  describe('start', () => {
    it('should start watching the directory', () => {
      watcher.start();
      expect(watcher.isWatching()).toBe(true);
    });
    
    it('should throw error if directory does not exist', () => {
      const nonExistentDir = path.join(testDir, 'non-existent');
      const badWatcher = new FileWatcher(indexer, nonExistentDir);
      
      expect(() => badWatcher.start()).toThrow('Watch directory not found');
    });
    
    it('should stop existing watcher before starting new one', () => {
      watcher.start();
      expect(watcher.isWatching()).toBe(true);
      
      // Start again - should not throw
      watcher.start();
      expect(watcher.isWatching()).toBe(true);
    });
  });
  
  describe('stop', () => {
    it('should stop watching the directory', () => {
      watcher.start();
      expect(watcher.isWatching()).toBe(true);
      
      watcher.stop();
      expect(watcher.isWatching()).toBe(false);
    });
    
    it('should be safe to call stop when not watching', () => {
      expect(watcher.isWatching()).toBe(false);
      
      // Should not throw
      watcher.stop();
      expect(watcher.isWatching()).toBe(false);
    });
  });
  
  describe('file change detection', () => {
    it('should detect file modifications (Requirement 10.1)', async () => {
      // Create initial file and index
      const file = path.join(testDir, 'doc.md');
      fs.writeFileSync(file, SAMPLE_DOC);
      await indexer.indexDirectory(testDir);
      
      // Spy on reindexFile
      const reindexSpy = jest.spyOn(indexer, 'reindexFile');
      
      // Start watching and wait for the watch stream to go live
      watcher.start();
      await watcherReady(reindexSpy, testDir);

      // Modify file
      const modifiedContent = SAMPLE_DOC.replace('Test document', 'Modified document');
      fs.writeFileSync(file, modifiedContent);

      // Wait for debounce and file system event
      await waitFor(() => reindexSpy.mock.calls.length > 0);

      // Verify reindexFile was called
      expect(reindexSpy).toHaveBeenCalledWith(file);
    });
    
    it('should detect file additions (Requirement 10.2)', async () => {
      // Index empty directory
      await indexer.indexDirectory(testDir);
      
      // Spy on reindexFile
      const reindexSpy = jest.spyOn(indexer, 'reindexFile');
      
      // Start watching and wait for the watch stream to go live
      watcher.start();
      await watcherReady(reindexSpy, testDir);

      // Add new file
      const newFile = path.join(testDir, 'new-doc.md');
      fs.writeFileSync(newFile, SAMPLE_DOC);

      // Wait for debounce and file system event
      await waitFor(() => reindexSpy.mock.calls.length > 0);

      // Verify reindexFile was called
      expect(reindexSpy).toHaveBeenCalledWith(newFile);
    });
    
    it('should detect file deletions (Requirement 10.3)', async () => {
      // Create file and index
      const file = path.join(testDir, 'doc.md');
      fs.writeFileSync(file, SAMPLE_DOC);
      await indexer.indexDirectory(testDir);
      
      // Spy on reindexFile
      const reindexSpy = jest.spyOn(indexer, 'reindexFile');
      
      // Start watching and wait for the watch stream to go live
      watcher.start();
      await watcherReady(reindexSpy, testDir);

      // Delete file
      fs.unlinkSync(file);

      // Wait for debounce and file system event
      await waitFor(() => reindexSpy.mock.calls.length > 0);

      // Verify reindexFile was called (it handles deletion)
      expect(reindexSpy).toHaveBeenCalledWith(file);
    });
    
    it('should only process markdown files', async () => {
      // Index directory
      await indexer.indexDirectory(testDir);
      
      // Spy on reindexFile
      const reindexSpy = jest.spyOn(indexer, 'reindexFile');
      
      // Start watching and wait for the watch stream to go live — without
      // this, the absence assertion below could pass vacuously because the
      // event was never going to be delivered in time anyway
      watcher.start();
      await watcherReady(reindexSpy, testDir);

      // Add non-markdown file
      const txtFile = path.join(testDir, 'readme.txt');
      fs.writeFileSync(txtFile, 'Not markdown');

      // Wait for debounce and file system event
      await new Promise(resolve => setTimeout(resolve, 200));

      // Verify reindexFile was NOT called
      expect(reindexSpy).not.toHaveBeenCalled();
    });
    
    it('should debounce rapid changes to same file', async () => {
      // Create file and index
      const file = path.join(testDir, 'doc.md');
      fs.writeFileSync(file, SAMPLE_DOC);
      await indexer.indexDirectory(testDir);
      
      // Spy on reindexFile
      const reindexSpy = jest.spyOn(indexer, 'reindexFile');
      
      // Start watching and wait for the watch stream to go live
      watcher.start();
      await watcherReady(reindexSpy, testDir);

      // Make rapid changes
      fs.writeFileSync(file, SAMPLE_DOC + '\n## Change 1');
      fs.writeFileSync(file, SAMPLE_DOC + '\n## Change 2');
      fs.writeFileSync(file, SAMPLE_DOC + '\n## Change 3');

      // Wait for the debounced call, then a settle window (4x the 50ms
      // debounce) to catch any straggler duplicate calls
      await waitFor(() => reindexSpy.mock.calls.length > 0);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Verify reindexFile was called only once (debounced)
      expect(reindexSpy).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('isWatching', () => {
    it('should return false when not watching', () => {
      expect(watcher.isWatching()).toBe(false);
    });
    
    it('should return true when watching', () => {
      watcher.start();
      expect(watcher.isWatching()).toBe(true);
    });
    
    it('should return false after stopping', () => {
      watcher.start();
      watcher.stop();
      expect(watcher.isWatching()).toBe(false);
    });
  });
});
