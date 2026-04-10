# Task 2.2 Completion: Product Data Indexer

**Date**: 2026-04-09
**Spec**: 081 - Product MCP Design
**Task**: 2.2 - Product data indexer
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Lina

---

## Summary

Implemented the product data indexer in `product-mcp-server/src/index.ts`. Indexes all six data categories from the product data directory.

## What Was Implemented

| Data Category | Source | Index Target |
|---------------|--------|-------------|
| Overview | `overview.yaml` | `this.overview` |
| Principles | `principles/*.md` | Merged into overview as `principles` map |
| Experience Map | `experience-map/{verticals,flows,pages}/` | `this.experienceMap` (list) + `this.screenSpecs` (map) |
| Templates | `templates/*.yaml` | `this.templates` |
| Domain Objects | `domain-objects/*.yaml` | `this.domainObjects` (map) |
| One-off Components | `components/*/schema.yaml` + `contracts.yaml` | `this.oneOffComponents` (map) |

## Key Behaviors

- **Single-file specs**: YAML file directly under a type directory → indexed as one screen
- **Multi-file specs**: Directory with multiple YAML files → primary file (matching dir name) assembled with facet files merged via `Object.assign`
- **Platform branching**: Parsed as-is from YAML (`shared` + `ios`/`android`/`web` keys). No transformation — the query layer (Task 2.3) handles platform filtering.
- **Status**: Parsed per-platform including `blocked` with reason strings. Spec status (`spec: complete`) parsed alongside platform statuses.
- **Bidirectional cross-references**: After indexing screens and domain objects, scans screen specs for domain object name mentions and populates `referencedBy` arrays on domain objects.
- **One-off components**: Schema + optional contracts loaded from component subdirectories. Contracts merged into schema object.
- **Malformed YAML**: Caught, logged with file path and error, skipped. Indexing continues.
- **Empty directory**: Starts with empty data stores, no error.

## Smoke Test

Created test product data at `/tmp/test-product/` with overview, principle, one vertical screen, one domain object, one template, one one-off component. Server started and indexed: `1 screens, 1 domain objects, 1 templates, 1 one-off components`.

## Validation

| Check | Result |
|-------|--------|
| TypeScript compilation | Clean (0 errors) |
| Smoke test | Indexes all data categories correctly |
| `npm test` | 319 suites, 8204 tests, all passing |

## Requirements Traced

- R3 AC 1-6: Experience map indexed with types, status, platform branching ✅
- R4 AC 1-2: Domain objects indexed with bidirectional cross-references ✅
- R5 AC 1-2: Templates indexed ✅
- R6 AC 1-4: One-off components indexed (schema + optional contracts) ✅
- R7 AC 1-4: Directory structure parsed (single-file, multi-file, platform branching) ✅
