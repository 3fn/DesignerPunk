/**
 * Consumer Integration Test
 *
 * Simulates the full consumer experience: pack → install → init → generate → validate → MCP smoke.
 * Run via: npm run test:consumer
 *
 * This test is SLOW (~30-60s) and meant for pre-publish verification only.
 * It catches the class of bugs that pass internal tests but break in product repos.
 *
 * @see Spec 106 R8
 */

import { execSync, spawn, ChildProcess } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const PKG_ROOT = path.resolve(__dirname, '..');
const TIMEOUT = 120_000; // 2 minutes for the full flow

describe('Consumer Integration (Spec 106 R8)', () => {
  let tempDir: string;
  let tarballPath: string;

  beforeAll(() => {
    // Pack the package
    const packOutput = execSync('npm pack --pack-destination /tmp', {
      cwd: PKG_ROOT,
      encoding: 'utf-8',
    }).trim();
    tarballPath = path.join('/tmp', packOutput.split('\n').pop()!);
    expect(fs.existsSync(tarballPath)).toBe(true);

    // Create temp project directory
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'consumer-integration-'));

    // Initialize npm project and install the tarball
    execSync('npm init -y', { cwd: tempDir, stdio: 'pipe' });
    execSync(`npm install ${tarballPath} --no-save`, { cwd: tempDir, stdio: 'pipe', timeout: 60_000 });
  }, TIMEOUT);

  afterAll(() => {
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    if (tarballPath) fs.rmSync(tarballPath, { force: true });
  });

  it('init produces a working project', () => {
    const output = execSync('npx designerpunk init --name TestProduct --abbreviation TP', {
      cwd: tempDir,
      encoding: 'utf-8',
      timeout: 30_000,
    });
    expect(output).toContain('TestProduct');

    // Verify key files exist
    expect(fs.existsSync(path.join(tempDir, 'designerpunk.config.ts'))).toBe(true);
    expect(fs.existsSync(path.join(tempDir, '.kiro/steering'))).toBe(true);
  }, TIMEOUT);

  it('generate produces output files', () => {
    const output = execSync('npx designerpunk generate', {
      cwd: tempDir,
      encoding: 'utf-8',
      timeout: 60_000,
    });
    expect(output).toContain('✅');

    // Verify token output files exist with non-zero content
    const distDir = path.join(tempDir, 'dist');
    const cssFile = path.join(distDir, 'DesignTokens.web.css');
    expect(fs.existsSync(cssFile)).toBe(true);
    expect(fs.statSync(cssFile).size).toBeGreaterThan(0);
  }, TIMEOUT);

  it('validate passes', () => {
    const output = execSync('npx designerpunk validate', {
      cwd: tempDir,
      encoding: 'utf-8',
      timeout: 30_000,
    });
    expect(output).toContain('✅');
  }, TIMEOUT);

  describe('MCP smoke queries', () => {
    function spawnMCPServer(command: string): ChildProcess {
      const child = spawn('npx', ['designerpunk', command], {
        cwd: tempDir,
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, NODE_ENV: 'test' },
      });
      return child;
    }

    async function sendJsonRpc(child: ChildProcess, method: string, params: object = {}): Promise<any> {
      const id = Date.now();
      const request = JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n';

      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error(`MCP timeout on ${method}`)), 10_000);
        let buffer = '';

        child.stdout!.on('data', (data: Buffer) => {
          buffer += data.toString();
          const lines = buffer.split('\n');
          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const parsed = JSON.parse(line);
              if (parsed.id === id) {
                clearTimeout(timeout);
                resolve(parsed.result ?? parsed);
              }
            } catch { /* partial line */ }
          }
        });

        child.stdin!.write(request);
      });
    }

    async function waitForReady(child: ChildProcess): Promise<void> {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('MCP server did not start')), 15_000);
        child.stderr!.on('data', (data: Buffer) => {
          if (data.toString().includes('running on stdio') || data.toString().includes('Server started')) {
            clearTimeout(timeout);
            resolve();
          }
        });
        child.on('error', (err) => { clearTimeout(timeout); reject(err); });
      });
    }

    it('Application MCP returns component data', async () => {
      const child = spawnMCPServer('mcp:app');
      try {
        await waitForReady(child);
        const initResponse = await sendJsonRpc(child, 'initialize', {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'test', version: '1.0' },
        });
        expect(initResponse).toBeDefined();

        const result = await sendJsonRpc(child, 'tools/call', {
          name: 'get_component_health',
          arguments: {},
        });
        expect(result).toBeDefined();
      } finally {
        child.kill();
      }
    }, 30_000);

    it('Docs MCP returns documentation data', async () => {
      const child = spawnMCPServer('mcp:docs');
      try {
        await waitForReady(child);
        await sendJsonRpc(child, 'initialize', {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'test', version: '1.0' },
        });

        const result = await sendJsonRpc(child, 'tools/call', {
          name: 'get_index_health',
          arguments: {},
        });
        expect(result).toBeDefined();
      } finally {
        child.kill();
      }
    }, 30_000);
  });
}, TIMEOUT);
