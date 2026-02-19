# Project Conventions & Guide

## Tooling

This project uses [mise](https://mise.jdx.dev/) for task management and tool versioning.

### Setup

1. Install `mise`.
2. Run `mise install` to set up tools (e.g., Bun).
3. Run `mise run install` to install dependencies.

### Common Tasks

- `mise run lint`: Run all linters (ESLint, Prettier, Svelte Check).
- `mise run fmt`: Format code using Prettier.
- `mise run test`: Run tests.
- `mise run codegen`: Update generated code.
- `mise run ci`: Run CI checks (Lint + Test).

## Error Handling

- Use the centralized `reportError` function from `src/lib/error.ts` for reporting errors.
- Do NOT use `console.error` directly for application errors.

## Linting & Formatting

- **ESLint**: configured with flat config in `eslint.config.js`. Includes Svelte, TypeScript, and Prettier rules.
- **Prettier**: handles code formatting.
- **Svelte Check**: handles Svelte type checking.

## CI/CD

- GitHub Actions workflow `autorelease.yml` handles CI, Codegen, and Release.
- Releases are triggered on tags starting with `v*`.
