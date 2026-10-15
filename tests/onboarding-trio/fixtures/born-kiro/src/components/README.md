# Your Components

This directory is yours. Components you add here appear ALONGSIDE
DesignerPunk's ecosystem components — never instead of them. A component
you add with the same declared name as one of DesignerPunk's (the
`component:` field of its `contracts.yaml`) wins on that name (your fork),
and everything else keeps coming from the package.

DesignerPunk's own components are consumed by name via `npm update` —
they are not copied here. See the install guide's "9. Ownership" section
(`docs/consumer/INSTALL.md` in the `@3fn/core` package) for the merge model.
