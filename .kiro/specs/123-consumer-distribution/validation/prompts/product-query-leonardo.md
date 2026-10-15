# Frozen prompt — `product-query-leonardo`

- **Run**: `product-query` (Spec 123 Task 28.3; Task 28 criterion 3, "Product query — seat and bar", Leonardo A7) · **Agent**: consumer-Leonardo, `claude --agent leonardo -p …` · **Harness**: Claude Code (`cc`); its stream-json keeps `tool_result` blocks, which Run 3's Kiro transcript did not (`validation/trio-3-pm.md` R3-7).
- **Consumer repo**: a fresh clone of `tests/onboarding-trio/fixtures/born-cc` (Dana's `order-status` service, born `init --target=cc --name "Order Status"` from candidate `aa3efdcf…`, Task 26.1's CC-born fixture), stated as such. The launcher runs `npm install` and `npx designerpunk generate`, then opens Claude Code once to trust the folder and enable the servers (setup, not under test; protocol § 16).
- **One session**, fresh, headless. Budget 15 turns (observed, not enforced; protocol § 4).
- **What the prompt names, and what it does not**: it names the server (`designerpunk-product`), because A7's bar is that the seat makes the query rather than reading the fixture. It names neither tool and neither expected value. Lexical check over the PROMPT block, run at freeze: no `get_product_overview`, `find_screens`, `list_experience_map`, `Order Status` or `example-home`.
- **Protocol**: `tests/onboarding-trio/protocol.md` § 16 · **Frozen**: 2026-10-15, by Leonardo (operator, and the system counterpart of the seat under test). Committed before the run and reproduced verbatim in the record.
- The launcher sends only the text between the markers, as the session's first and only message.

<!-- PROMPT BEGIN -->
Hi Leonardo, I'm Dana. Before we plan any screens, I want to check what DesignerPunk already knows about this project. Please get the answers from DesignerPunk's product server (designerpunk-product), not by reading the files yourself:

1. What product is this repo for? Give its name exactly as it is recorded, and its register.
2. How many screens are already specified, and which ones? Name each one exactly as it is recorded, with its status.

A few sentences is plenty. Please don't plan or change anything, and I can't answer questions while you work.
<!-- PROMPT END -->
