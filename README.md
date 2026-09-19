# Fina Pipeman

Fina Pipeman is planned as a React visual authoring library for Fina Core ETL pipelines. The repository contains a publishable package in `packages/fina-pipeman` and a thin Next.js showcase app in `apps/demo`.

This commit is a bootstrap only. It establishes package boundaries, a public library entry point, and the server-side preview route boundary. It does not yet implement the JSON explorers, xyflow canvas, YAML serializer, schema validator, provenance graph, or Fina Core stdio MCP adapter.

## Development

Install dependencies with `pnpm install`, run the demo with `pnpm dev`, and run checks with `pnpm typecheck` and `pnpm build`.

The development specification for future agents is bundled at `/home/ubuntu/skills/fina-pipeman/SKILL.md`. Its references define the domain model, interaction behavior, Fina Core contract, phased plan, and delegation prompt.
