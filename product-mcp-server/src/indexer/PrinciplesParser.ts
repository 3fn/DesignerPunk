/**
 * PrinciplesParser — parses YAML frontmatter from markdown principle files.
 *
 * @see .kiro/specs/097-product-mcp-intelligence-layer/design.md § "PrinciplesParser"
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import type { Principle } from '../models';

const SERVER_NAME = 'mcp-product-server';

/**
 * Parse all markdown files in a directory into structured Principles.
 * Files with YAML frontmatter (delimited by `---`) get parsed keywords.
 * Files without frontmatter get empty keywords and a warning.
 */
export function parsePrinciples(
  principlesDir: string,
  warnings: string[]
): Principle[] {
  if (!fs.existsSync(principlesDir)) return [];

  const results: Principle[] = [];
  const files = fs.readdirSync(principlesDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(principlesDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const name = path.basename(file, '.md');
    const parsed = parseFrontmatter(raw);

    if (!parsed.hasFrontmatter) {
      warnings.push(`Principle '${name}' has no YAML frontmatter — indexed with empty keywords`);
      console.error(`[${SERVER_NAME}] Principle '${name}' has no YAML frontmatter`);
    }

    results.push({
      name: parsed.frontmatter.name || name,
      keywords: parsed.frontmatter.keywords || [],
      content: parsed.content,
    });
  }

  return results;
}

interface ParsedFrontmatter {
  hasFrontmatter: boolean;
  frontmatter: { name?: string; keywords?: string[]; [key: string]: unknown };
  content: string;
}

function parseFrontmatter(raw: string): ParsedFrontmatter {
  const trimmed = raw.trimStart();
  if (!trimmed.startsWith('---')) {
    return { hasFrontmatter: false, frontmatter: {}, content: raw };
  }

  const end = trimmed.indexOf('---', 3);
  if (end === -1) {
    return { hasFrontmatter: false, frontmatter: {}, content: raw };
  }

  const yamlBlock = trimmed.slice(3, end);
  const content = trimmed.slice(end + 3).replace(/^\r?\n/, '');

  try {
    const frontmatter = (yaml.load(yamlBlock) as Record<string, unknown>) || {};
    return { hasFrontmatter: true, frontmatter, content };
  } catch {
    return { hasFrontmatter: false, frontmatter: {}, content: raw };
  }
}
