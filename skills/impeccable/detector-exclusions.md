# Detector Exclusions

**Purpose**: Rules to exclude when running the Impeccable detector in DesignerPunk context.
**Mechanism**: Pass excluded rule IDs via `--exclude` flag or filter from JSON output post-hoc.

---

## Excluded Rules

None currently excluded. Add rules here when an upstream detector rule conflicts with an intentional DesignerPunk pattern.

### Format

```
| Rule ID | Reason for Exclusion | Date Added |
|---------|---------------------|------------|
| example-rule-id | Conflicts with DesignerPunk pattern X | 2026-06-01 |
```

---

## How to Exclude

The detector does not currently support a `--exclude` flag natively. Until upstream adds one, exclusions are applied by filtering JSON output:

```bash
# Run detector in JSON mode
node .kiro/skills/impeccable/scripts/detect.mjs --json <target>

# Filter excluded rules (example with jq)
node .kiro/skills/impeccable/scripts/detect.mjs --json <target> | jq '[.[] | select(.antipattern != "excluded-rule-id")]'
```

When invoking the detector during `audit`, Leonardo filters findings against this exclusion list before reporting results.

---

## Governance

- **Adding exclusions**: Requires rationale explaining why the DesignerPunk pattern is intentional
- **Removing exclusions**: When upstream updates a rule to accommodate our pattern, remove the exclusion
- **Wholesale replacement**: When updating `scripts/detector/` from upstream, this exclusion list is preserved (it lives outside the detector directory)
