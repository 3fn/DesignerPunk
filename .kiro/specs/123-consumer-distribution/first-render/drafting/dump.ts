import * as fs from 'fs';
const { splitFrontmatter } = require(process.cwd() + '/tools/agent-generator/frontmatter');
const { partition } = require(process.cwd() + '/tools/agent-generator/partition');
const root = process.cwd() + '/';
const f = process.argv[2];
const { body } = splitFrontmatter(fs.readFileSync(root+f,'utf8'), f);
for (const u of partition(body).units) console.log(`<<<<< ${u.anchor}\n${u.text}`);
