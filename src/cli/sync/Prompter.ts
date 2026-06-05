/**
 * Interactive conflict resolution and source-tier confirmation.
 *
 * @see Spec 111 — Requirement 5, Requirement 6 AC3
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import type { ClassifiedFile } from './Classifier';

export type ConflictDecision = 'skip' | 'overwrite';

export interface PromptResult {
  file: ClassifiedFile;
  decision: ConflictDecision;
}

/**
 * Resolve conflicts interactively. Returns decisions for each conflict.
 */
export async function resolveConflicts(
  conflicts: ClassifiedFile[],
  packageRoot: string,
  projectRoot: string,
  rl?: readline.Interface,
): Promise<PromptResult[]> {
  const results: PromptResult[] = [];
  const ownRl = !rl;
  if (!rl) {
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  }

  for (const file of conflicts) {
    const decision = await promptConflict(file, packageRoot, projectRoot, rl);
    results.push({ file, decision });
  }

  if (ownRl) rl.close();
  return results;
}

async function promptConflict(
  file: ClassifiedFile,
  packageRoot: string,
  projectRoot: string,
  rl: readline.Interface,
): Promise<ConflictDecision> {
  while (true) {
    const answer = await ask(
      rl,
      `\n  ${file.relativePath} (${file.reason})\n  [s]kip / [o]verwrite / [d]iff: `,
    );

    switch (answer.toLowerCase().trim()) {
      case 's':
      case 'skip':
        return 'skip';
      case 'o':
      case 'overwrite':
        return 'overwrite';
      case 'd':
      case 'diff':
        showDiff(file.relativePath, packageRoot, projectRoot);
        // Re-prompt after showing diff (loop continues)
        break;
      default:
        console.log('  Please enter s, o, or d.');
    }
  }
}

function showDiff(relativePath: string, packageRoot: string, projectRoot: string): void {
  const pkgContent = readSafe(path.join(packageRoot, relativePath));
  const projContent = readSafe(path.join(projectRoot, relativePath));

  if (pkgContent === null || projContent === null) {
    console.log('  (unable to read file for diff)');
    return;
  }

  // Check if binary
  if (isBinary(pkgContent) || isBinary(projContent)) {
    console.log('  (binary file — diff not available)');
    return;
  }

  const pkgLines = pkgContent.split('\n');
  const projLines = projContent.split('\n');

  // Simple unified diff with color
  console.log(`\n  --- project: ${relativePath}`);
  console.log(`  +++ package: ${relativePath}\n`);

  // Use diff library for proper unified diff
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createTwoFilesPatch } = require('diff');
    const patch = createTwoFilesPatch(
      `project/${relativePath}`,
      `package/${relativePath}`,
      projContent,
      pkgContent,
      '', '',
      { context: 3 },
    );
    const lines = patch.split('\n');
    for (const line of lines.slice(2)) { // Skip header
      if (line.startsWith('+')) {
        console.log(`  \x1b[32m${line}\x1b[0m`);
      } else if (line.startsWith('-')) {
        console.log(`  \x1b[31m${line}\x1b[0m`);
      } else if (line.startsWith('@@')) {
        console.log(`  \x1b[36m${line}\x1b[0m`);
      } else {
        console.log(`  ${line}`);
      }
    }
  } catch {
    // Fallback: simple line comparison
    console.log('  (diff library unavailable — showing line counts)');
    console.log(`  project: ${projLines.length} lines`);
    console.log(`  package: ${pkgLines.length} lines`);
  }
  console.log('');
}

/**
 * Prompt for source-tier batch confirmation.
 * Returns true if user confirms, false if declined.
 */
export async function confirmSourceUpdates(
  files: ClassifiedFile[],
  rl?: readline.Interface,
): Promise<boolean> {
  const ownRl = !rl;
  if (!rl) {
    rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  }

  const answer = await ask(rl, `\n  Apply ${files.length} source update${files.length === 1 ? '' : 's'}? [Y/n/list]: `);

  if (answer.toLowerCase().trim() === 'list') {
    for (const f of files) {
      console.log(`    ${f.relativePath}`);
    }
    const confirm = await ask(rl, `  Apply? [Y/n]: `);
    if (ownRl) rl.close();
    return confirm.toLowerCase().trim() !== 'n';
  }

  if (ownRl) rl.close();
  return answer.toLowerCase().trim() !== 'n';
}

function ask(rl: readline.Interface, question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

function readSafe(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

function isBinary(content: string): boolean {
  // Check for null bytes (simple binary detection)
  return content.includes('\0');
}
