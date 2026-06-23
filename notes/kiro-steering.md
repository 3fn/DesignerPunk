Steering

What is steering?

Steering gives Kiro persistent knowledge about your workspace through markdown files. Instead of explaining your conventions in every chat, steering files ensure Kiro consistently follows your established patterns, libraries, and standards.

Key benefits

Consistent Code Generation - Every component, API endpoint, or test follows your team's established patterns and conventions.

Reduced Repetition - No need to explain workspace standards in each conversation. Kiro remembers your preferences.

Team Alignment - All developers work with the same standards, whether they're new to the workspace or seasoned contributors.

Scalable Project Knowledge - Documentation that grows with your codebase, capturing decisions and patterns as your project evolves.

Steering file scope

Steering files can be created with a workspace scope or a global scope.

Workspace steering

Workspace steering files reside in your workspace root folder under .kiro/steering/, and apply only to that specific workspace. Workspace steering files can be used to inform Kiro of patterns, libraries, and standards that apply to an individual workspace.

Global steering

Global steering files reside in your home directory under ~/.kiro/steering/, and apply to all workspaces. Global steering files can be used to inform Kiro of conventions that apply to all your workspaces.

In case of conflicting instructions between global and workspace steering, Kiro will prioritize the workspace steering instructions. This allows you to specify global directives that generally apply to all your workspaces, while preserving the ability to override those directives for specific workspaces.

Team steering

The global steering feature can be used to define centralized steering files that apply to entire teams. Team steering files can be pushed to user's PCs via MDM solutions or Group Policies, or downloaded by users to their PCs from a central repository, and placed into the ~/.kiro/steering folder.

Foundational steering files

Kiro provides foundational steering files to establish core project context. You can generate these files as follows:

Navigate to the Steering section in the Kiro panel
Click the Generate Steering Docs button, or click the + button and select the Foundation steering files option
Kiro will create three foundational files:
Product Overview (product.md) - Defines your product's purpose, target users, key features, and business objectives. This helps Kiro understand the "why" behind technical decisions and suggest solutions aligned with your product goals.

Technology Stack (tech.md) - Documents your chosen frameworks, libraries, development tools, and technical constraints. When Kiro suggests implementations, it will prefer your established stack over alternatives.

Project Structure (structure.md) - Outlines file organization, naming conventions, import patterns, and architectural decisions. This ensures generated code fits seamlessly into your existing codebase.

These foundation files are included in every interaction by default, forming the baseline of Kiro's project understanding.

Creating custom steering files

Navigate to the Steering section in the Kiro panel
Click the + button
Select the scope of the steering file: workspace or global
Choose a descriptive filename (e.g., api-standards.md)
Write your guidance using standard markdown syntax
Use natural language to describe your requirements
Optionally, for workspace steering files, you can use the Refine button to have Kiro refine your requirements
Once created, steering files become immediately available across all Kiro interactions.

Agents.md

Kiro supports providing steering directives via the AGENTS.md standard. AGENTS.md files are in markdown format, similar to Kiro steering files; however, AGENTS.md files do not support inclusion modes and are always included.

You can add AGENTS.md files to the global steering file location (~/.kiro/steering/), or to the root folder of your workspace, and they will get picked up by Kiro automatically.

Inclusion modes

Steering files can be configured to load at different times based on your needs. This flexibility helps optimize performance and ensures relevant context is available when needed.

Configure inclusion modes by adding front matter to the top of your steering files. The front matter uses YAML syntax and must be placed at the very beginning of the file, enclosed by triple dashes (---).

Info
The inclusion configuration must be the first content in the file, no blank lines or content before it.
Always included (default)

YAML

---
inclusion: always
---
These files are loaded into every Kiro interaction automatically. Use this mode for core standards that should influence all code generation and suggestions. Examples include your technology stack, coding conventions, and fundamental architectural principles.

Best for: Workspace-wide standards, technology preferences, security policies, and coding conventions that apply universally.

Conditional inclusion

YAML

---
inclusion: fileMatch
fileMatchPattern: "components/**/*.tsx"
---
Files are automatically included only when working with files that match the specified pattern. This keeps context relevant and reduces noise by loading specialized guidance only when needed.

You can also specify multiple patterns using an array:

YAML

---
inclusion: fileMatch
fileMatchPattern: ["**/*.ts", "**/*.tsx", "**/tsconfig.*.json"]
---
Common patterns:

"*.tsx" - React components and JSX files
"app/api/**/*" - API routes and backend logic
"**/*.test.*" - Test files and testing utilities
"src/components/**/*" - Component-specific guidelines
"*.md" - Documentation files
["**/*.ts", "**/*.tsx"] - All TypeScript files
["*.js", "*.jsx", "*.ts", "*.tsx"] - All JavaScript and TypeScript files
Best for: Domain-specific standards like component patterns, API design rules, testing approaches, or deployment procedures that only apply to certain file types.

Manual inclusion

YAML

---
inclusion: manual
---
Files are available on-demand by referencing them with #steering-file-name in your chat messages. This gives you precise control over when specialized context is needed without cluttering every interaction.

Usage: Type #troubleshooting-guide or #performance-optimization in chat to include that steering file for the current conversation. Manual steering files also appear as slash commands — type / in chat to see and select them.

Best for: Specialized workflows, troubleshooting guides, migration procedures, or context-heavy documentation that's only needed occasionally.

Auto inclusion

YAML

---
inclusion: auto
name: api-design
description: REST API design patterns and conventions. Use when creating or modifying API endpoints.
---
Files are automatically included when your request matches the description. This works similarly to skills—Kiro uses the description to decide when the steering file is relevant.

Field	Required	Description
name	Yes	Identifier for the steering file. Used for display and matching.
description	Yes	When to include this file. Kiro matches this against your requests.
Auto-inclusion steering files also appear as slash commands in chat. Type / followed by the steering file name to explicitly include it, in addition to the automatic activation based on description matching.

Best for: Context-heavy guidance that should only load when relevant—like specialized domain knowledge, complex workflows, or detailed reference material that would overwhelm always-on steering.

File references

Link to live workspace files to keep steering current:

MARKDOWN

#[[file:<relative_file_name>]]
Examples:

API specs: #[[file:api/openapi.yaml]]
Component patterns: #[[file:components/ui/button.tsx]]
Config templates: #[[file:.env.example]]
Best practices

Keep Files Focused One domain per file - API design, testing, or deployment procedures.

Use Clear Names

api-rest-conventions.md - REST API standards
testing-unit-patterns.md - Unit testing approaches
components-form-validation.md - Form component standards
Include Context Explain why decisions were made, not just what the standards are.

Provide Examples Use code snippets and before/after comparisons to demonstrate standards.

Security First Never include API keys, passwords, or sensitive data. Steering files are part of your codebase.

Maintain Regularly

Review during sprint planning and architecture changes
Test file references after restructuring
Treat steering changes like code changes - require reviews
Common steering file strategies

API Standards (api-standards.md) - Define REST conventions, error response formats, authentication flows, and versioning strategies. Include endpoint naming patterns, HTTP status code usage, and request/response examples.

Testing Approach (testing-standards.md) - Establish unit test patterns, integration test strategies, mocking approaches, and coverage expectations. Document preferred testing libraries, assertion styles, and test file organization.

Code Style (code-conventions.md) - Specify naming patterns, file organization, import ordering, and architectural decisions. Include examples of preferred code structures, component patterns, and anti-patterns to avoid.

Security Guidelines (security-policies.md) - Document authentication requirements, data validation rules, input sanitization standards, and vulnerability prevention measures. Include secure coding practices specific to your application.

Deployment Process (deployment-workflow.md) - Outline build procedures, environment configurations, deployment steps, and rollback strategies. Include CI/CD pipeline details and environment-specific requirements.

Related documentation

Skills - On-demand modular instruction packages for specialized workflows
Hooks - Automate agent actions based on events