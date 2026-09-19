# Prompt for a development agent

You are implementing one scoped slice of Fina Pipeman in `/home/ubuntu/fina-pipeman`. Read `/home/ubuntu/skills/fina-pipeman/SKILL.md` and the relevant files under `refs/` before changing code.

Fina Pipeman is a React/TypeScript visual ETL authoring library. It must generate the official Fina Core ETL YAML and must not reimplement ETL execution in TypeScript. The library lives in `packages/fina-pipeman`; the thin showcase app lives in `apps/demo`. Preview execution belongs behind a server-only Next.js API adapter that calls the Fina Core stdio MCP server.

## Your task

Implement only: `<INSERT ONE PHASE OR FEATURE HERE>`.

Do not expand scope into unrelated UI, joins, scheduler fan-out, or engine behavior. Preserve the framework-independent canonical model. React and xyflow are views/controllers over that model, not the source of truth.

## Deliverables

1. Production-quality code in the appropriate package.
2. Model-level tests before UI tests.
3. Fixture-based serializer or transport tests where relevant.
4. Concise diagnostics for invalid states.
5. Updated exports and demo wiring only if required for the feature.
6. No TypeScript ETL evaluator.

## Constraints

- Preserve stable IDs and provenance metadata.
- Keep generated YAML aligned with `/home/ubuntu/fina-skills/schema/etl.schema.json` and the checked-out Fina Core implementation.
- Do not expose stdio process details or server-only paths to browser code.
- Do not silently change row cardinality, join semantics, or output targets; represent such changes as explicit migrations or diagnostics.
- Avoid unnecessary dependencies and do not introduce a second state store without documenting why.

## Verification

Run the repository formatter, type checker, unit tests, package build, and demo build. If the native Fina Core runner is available, execute a generated fixture YAML and verify row counts and representative fields. Report changed files, commands run, and any known limitations.

## Completion standard

Stop after the requested slice is complete and verified. Do not start another implementation phase. If an architectural choice is missing, document the smallest reversible assumption in the result rather than redesigning the project.
