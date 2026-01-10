# Copilot Instructions

Valibot is a modular, type-safe schema validation library with zero runtime dependencies.

## Planning Mode

When in planning mode and something is unclear, ask questions **one at a time** (like a quiz). Wait for each answer before asking the next question. Only after all questions are answered and you have no remaining uncertainties, present the final plan.

## Monorepo Layout

| Directory                  | Purpose                                         |
| -------------------------- | ----------------------------------------------- |
| `library/`                 | Core `valibot` package — most work happens here |
| `packages/to-json-schema/` | JSON Schema converter                           |
| `packages/i18n/`           | Translated error messages                       |
| `website/`                 | valibot.dev (Qwik + Vite)                       |
| `codemod/`                 | Migration and conversion tools                  |

## Essential Commands

```bash
pnpm install                    # Install dependencies
pnpm -C library test            # Run tests (includes type tests)
pnpm -C library lint            # ESLint + tsc + deno check
pnpm -C library build           # Build for publishing
pnpm -C website dev             # Start docs site
```

## Code Conventions

- **ESM with `.ts` extensions** in imports (enforced by ESLint)
- **`interface` over `type`** for object shapes
- **JSDoc required** on exported functions (first overload only for overload sets)
- **`// @__NO_SIDE_EFFECTS__`** before pure factory functions for tree-shaking

## Library Architecture

Schemas, actions, and methods are plain objects with a `'~run'` method:

```
library/src/
├── schemas/   → Data types (string, object, array...)
├── actions/   → Validations & transforms (email, minLength, trim...)
├── methods/   → API functions (parse, pipe, partial...)
├── types/     → TypeScript definitions
└── utils/     → Internal helpers (prefixed with _)
```

Each has its own folder: `name.ts`, `name.test.ts`, `name.test-d.ts`, `index.ts`.

## Detailed Guides

**Before performing any task listed below, OPEN and READ the corresponding guide file.**

| Task                          | Guide (read before starting)                                                      |
| ----------------------------- | --------------------------------------------------------------------------------- |
| Navigate repo, find files     | [prompts/repository-structure.md](../prompts/repository-structure.md)             |
| Write JSDoc / inline comments | [prompts/document-source-code.md](../prompts/document-source-code.md)             |
| Review PRs and source changes | [prompts/review-source-code-changes.md](../prompts/review-source-code-changes.md) |
| Add new API page to website   | [prompts/add-new-api-to-website.md](../prompts/add-new-api-to-website.md)         |
| Update existing API docs      | [prompts/update-api-on-website.md](../prompts/update-api-on-website.md)           |
| Add guide/tutorial to website | [prompts/add-new-guide-to-website.md](../prompts/add-new-guide-to-website.md)     |

**Source code is the single source of truth.** All documentation must match `/library/src/`.
