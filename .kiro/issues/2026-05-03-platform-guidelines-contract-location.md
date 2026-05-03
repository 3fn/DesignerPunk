# Contract Location Reference Outdated in platform-implementation-guidelines.md

**Date**: 2026-05-03
**Source**: Spec 099 Task 3.3 — Lina metadata confirmation Finding 1
**Severity**: Moderate — could mislead agents looking for contracts
**Owner**: Lina (content correctness for this doc)

## Description

`platform-implementation-guidelines.md` references contracts as being "defined in the component schema" (line 31) and links to Component-Schema-Format.md as "Schema structure for contracts" (line 809). Since Spec 063 (Uniform Contract System), contracts live in per-component `contracts.yaml` files, not in schema YAML.

The guidance itself is correct ("honor all behavioral contracts") but the location reference is wrong — an agent following this doc to find contracts would look in schema YAML and not find them.

## Resolution

Update references to point to `contracts.yaml` and Contract-System-Reference.md instead of Component-Schema-Format.md for contract location.

## Related

- Spec 063: Uniform Contract System
- Spec 099 Task 3.3: `completion/task-3-3-completion.md`
