---
# golden-partition fixture charter — Spec 123 Task 10.2 (Golden Bite 1, Req 10.G).
# These `# ` lines are YAML COMMENTS inside the frontmatter. Partitioning the FILE instead
# of the BODY would mint each one as a phantom H1 unit, and shift every body line number.
agent: golden
description: Golden-partition fixture charter; not an agent.
writeScope:
  - "fixture/**"
---
Doc preamble prose, before the first heading.

# Golden Charter

## Alpha

Alpha is a leaf section, followed by a two-blank-line gap.


## Beta

Beta's orphan preamble: prose between a heading and its first child.

### Beta One

Beta One body.

```markdown
## Not A Heading (fenced)
### Also Not A Heading (fenced)
```

### Notes

First Notes leaf.

## Gamma

### Gamma One

Gamma is non-leaf with a heading-line-only preamble, so its heading line attaches FORWARD.
Gamma One is itself non-leaf, so this prose is its preamble.

#### Gamma One Deep

Deep leaf.

### Notes

Second Notes leaf (duplicate slug).

## Delta

Delta body, with trailing whitespace after it.



