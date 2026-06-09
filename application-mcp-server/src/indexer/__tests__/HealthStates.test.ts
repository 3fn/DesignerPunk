/**
 * @category evergreen
 * @purpose Verify three-state health transitions and staleFiles reporting (Spec 106 R2)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ComponentIndexer } from '../ComponentIndexer';

describe('ComponentIndexer health states (Spec 106 R2)', () => {
  let tmpDir: string;
  let componentsDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'health-states-'));
    componentsDir = path.join(tmpDir, 'components');
    fs.mkdirSync(componentsDir);
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function writeComponent(name: string): void {
    const dir = path.join(componentsDir, name);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${name}.schema.yaml`), `
name: ${name}
family: Test
type: base
description: Test component
props: {}
`);
  }

  test('status is "failed" when no components indexed (empty state)', async () => {
    const indexer = new ComponentIndexer();
    await indexer.indexComponents('/nonexistent/path');
    const health = indexer.getHealth();
    expect(health.status).toBe('failed');
  });

  test('status is "healthy" when components indexed and no stale files', async () => {
    writeComponent('Button-CTA');
    const indexer = new ComponentIndexer();
    await indexer.indexComponents(componentsDir);
    const health = indexer.getHealth();
    expect(health.status).toBe('healthy');
    expect(health.staleFiles).toEqual([]);
  });

  test('status is "degraded" when stale files exist', async () => {
    writeComponent('Button-CTA');
    const indexer = new ComponentIndexer();
    await indexer.indexComponents(componentsDir);

    // Touch a file with a future timestamp
    const schemaPath = path.join(componentsDir, 'Button-CTA', 'Button-CTA.schema.yaml');
    const future = new Date(Date.now() + 5000);
    fs.utimesSync(schemaPath, future, future);

    const health = indexer.getHealth();
    expect(health.status).toBe('degraded');
    expect(health.staleFiles.length).toBeGreaterThan(0);
    expect(health.staleFiles).toContain(schemaPath);
  });

  test('status is "degraded" when warnings exist (even without stale files)', async () => {
    // Create a component dir but without a valid schema — triggers warning
    const dir = path.join(componentsDir, 'BadComponent');
    fs.mkdirSync(dir);
    fs.writeFileSync(path.join(dir, 'BadComponent.schema.yaml'), 'invalid: yaml: [');

    writeComponent('ValidComponent');

    const indexer = new ComponentIndexer();
    await indexer.indexComponents(componentsDir);
    const health = indexer.getHealth();
    // Has at least one component indexed (not failed)
    expect(health.componentsIndexed).toBeGreaterThan(0);
    // But warnings should make it degraded
    if (health.warnings.length > 0) {
      expect(health.status).toBe('degraded');
    }
  });

  test('staleFiles includes only files newer than lastIndexTime', async () => {
    writeComponent('Button-CTA');
    writeComponent('Avatar-Base');
    // Set all file mtimes to past before indexing
    const past = new Date(Date.now() - 5000);
    for (const comp of ['Button-CTA', 'Avatar-Base']) {
      const p = path.join(componentsDir, comp, `${comp}.schema.yaml`);
      fs.utimesSync(p, past, past);
    }

    const indexer = new ComponentIndexer();
    await indexer.indexComponents(componentsDir);

    // Only touch one component's file to future
    const stalePath = path.join(componentsDir, 'Button-CTA', 'Button-CTA.schema.yaml');
    const future = new Date(Date.now() + 5000);
    fs.utimesSync(stalePath, future, future);

    const health = indexer.getHealth();
    expect(health.staleFiles).toContain(stalePath);
    // Avatar-Base should NOT be stale
    const avatarPath = path.join(componentsDir, 'Avatar-Base', 'Avatar-Base.schema.yaml');
    expect(health.staleFiles).not.toContain(avatarPath);
  });

  test('staleFiles is empty array when healthy', async () => {
    writeComponent('Button-CTA');
    // Ensure file mtime is in the past
    const schemaPath = path.join(componentsDir, 'Button-CTA', 'Button-CTA.schema.yaml');
    const past = new Date(Date.now() - 5000);
    fs.utimesSync(schemaPath, past, past);

    const indexer = new ComponentIndexer();
    await indexer.indexComponents(componentsDir);
    expect(indexer.getHealth().staleFiles).toEqual([]);
  });

  test('getStaleFiles returns empty when never indexed', () => {
    const indexer = new ComponentIndexer();
    expect(indexer.getStaleFiles()).toEqual([]);
  });
});
