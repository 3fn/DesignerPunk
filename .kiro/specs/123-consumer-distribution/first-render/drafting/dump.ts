import * as fs from 'fs';
import { splitFrontmatter } from '/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2/tools/agent-generator/frontmatter';
import { partition } from '/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2/tools/agent-generator/partition';
const root = '/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2/';
const f = process.argv[2];
const { body } = splitFrontmatter(fs.readFileSync(root+f,'utf8'), f);
for (const u of partition(body).units) console.log(`<<<<< ${u.anchor}\n${u.text}`);
