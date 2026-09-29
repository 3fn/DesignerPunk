import * as fs from 'fs';
import { splitFrontmatter } from '/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2/tools/agent-generator/frontmatter';
import { entryTree } from '/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2/tools/agent-generator/partition';
const root = '/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2/';
const filter = process.argv[3] ?? '';
for (const a of process.argv[2].split(',')) {
  const f = `canonical/agents/${a}.md`;
  const { frontmatter } = splitFrontmatter(fs.readFileSync(root+f,'utf8'), f);
  for (const l of entryTree(frontmatter ?? {}).units) {
    if (filter && !new RegExp(filter).test(l.path)) continue;
    const v = typeof l.value === 'string' ? l.value : JSON.stringify(l.value);
    console.log(`${a} | ${l.path} | ${v.slice(0, 220)}`);
  }
}
