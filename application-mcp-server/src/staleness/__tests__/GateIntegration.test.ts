/**
 * @category evergreen
 * @purpose Verify StalenessGate integration in Application MCP tool handler (Spec 106 R1)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { StalenessGate, isImmutableContext } from '../StalenessGate';

describe('StalenessGate integration in tool handler', () => {
  let tmpDir: string;
  let dataDir: string;
  let onRebuild: jest.Mock;
  let gate: StalenessGate;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gate-integration-'));
    dataDir = path.join(tmpDir, 'data');
    fs.mkdirSync(dataDir);
    onRebuild = jest.fn().mockResolvedValue(undefined);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  const EXEMPT_TOOLS = new Set(['get_component_health', 'rebuild_index']);

  async function simulateToolCall(toolName: string) {
    if (!EXEMPT_TOOLS.has(toolName)) {
      await gate.checkAndRebuildIfNeeded();
    }
  }

  function makeStaleFile() {
    const filePath = path.join(dataDir, 'component.yaml');
    fs.writeFileSync(filePath, 'test: true');
    const future = new Date(Date.now() + 5000);
    fs.utimesSync(filePath, future, future);
    return filePath;
  }

  describe('data-returning tools trigger gate', () => {
    beforeEach(() => {
      gate = new StalenessGate({
        dataDirs: [dataDir],
        fileExtensions: ['.yaml'],
        thresholdMs: 0,
        onRebuild,
      });
      gate.markIndexed();
    });

    test('get_component_catalog triggers rebuild when stale', async () => {
      makeStaleFile();
      await simulateToolCall('get_component_catalog');
      expect(onRebuild).toHaveBeenCalledTimes(1);
    });

    test('search_tokens triggers rebuild when stale', async () => {
      makeStaleFile();
      await simulateToolCall('search_tokens');
      expect(onRebuild).toHaveBeenCalledTimes(1);
    });

    test('get_component_full triggers rebuild when stale', async () => {
      makeStaleFile();
      await simulateToolCall('get_component_full');
      expect(onRebuild).toHaveBeenCalledTimes(1);
    });
  });

  describe('exempt tools skip gate', () => {
    beforeEach(() => {
      gate = new StalenessGate({
        dataDirs: [dataDir],
        fileExtensions: ['.yaml'],
        thresholdMs: 0,
        onRebuild,
      });
      gate.markIndexed();
      makeStaleFile();
    });

    test('get_component_health does not trigger rebuild', async () => {
      await simulateToolCall('get_component_health');
      expect(onRebuild).not.toHaveBeenCalled();
    });

    test('rebuild_index does not trigger rebuild', async () => {
      await simulateToolCall('rebuild_index');
      expect(onRebuild).not.toHaveBeenCalled();
    });
  });

  describe('immutable context', () => {
    test('skips gate when data is in node_modules', async () => {
      gate = new StalenessGate({
        dataDirs: [dataDir],
        fileExtensions: ['.yaml'],
        thresholdMs: 0,
        isImmutable: true,
        onRebuild,
      });
      gate.markIndexed();
      makeStaleFile();

      await simulateToolCall('get_component_catalog');
      expect(onRebuild).not.toHaveBeenCalled();
    });

    test('isImmutableContext detects node_modules paths', () => {
      expect(isImmutableContext('/project/node_modules/@3fn/core/src/components')).toBe(true);
      expect(isImmutableContext('/project/src/components/core')).toBe(false);
    });
  });

  describe('threshold behavior', () => {
    test('second call within threshold does not re-scan', async () => {
      gate = new StalenessGate({
        dataDirs: [dataDir],
        fileExtensions: ['.yaml'],
        thresholdMs: 60_000,
        onRebuild,
      });
      gate.markIndexed();
      makeStaleFile();

      await simulateToolCall('get_component_catalog');
      expect(onRebuild).toHaveBeenCalledTimes(1);

      // Second call within threshold — no additional rebuild
      makeStaleFile();
      await simulateToolCall('get_component_catalog');
      expect(onRebuild).toHaveBeenCalledTimes(1);
    });
  });
});
