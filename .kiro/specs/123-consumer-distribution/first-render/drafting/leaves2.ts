import * as fs from 'fs';
const { splitFrontmatter } = require(process.cwd() + '/tools/agent-generator/frontmatter');
const { entryTree } = require(process.cwd() + '/tools/agent-generator/partition');
const root = process.cwd() + '/';
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
