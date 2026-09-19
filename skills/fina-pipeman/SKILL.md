---
name: fina-pipeman
description: Build and extend Fina Pipeman, a React visual ETL authoring library with an xyflow canvas, JSON input/output explorers, JSON Schema validation, provenance highlighting, Fina Core YAML serialization, and Next.js preview integration through the Fina Core stdio MCP server. Use for any implementation, design, review, testing, or integration task involving fina-pipeman or the fina-pipeman demo app.
---

# Fina Pipeman

Build Fina Pipeman as a visual authoring layer over the existing Fina Core ETL engine. Do not reimplement ETL execution in TypeScript. The browser owns authoring, graph state, validation UX, serialization, and presentation. The Next.js server boundary owns preview execution and calls the Fina Core stdio MCP server.

## Current scope

The repository is `/home/ubuntu/fina-pipeman` and is intended for `https://github.com/haymant/fina-pipeman`. It is a monorepo with:

- `packages/fina-pipeman`: publishable React/TypeScript library.
- `apps/demo`: thin Next.js showcase application.

The current bootstrap is intentionally skeletal. Implement behavior only when the task explicitly asks for it.

## Non-negotiable architecture

1. Keep a framework-independent `VisualPipelineModel` as the source of truth.
2. Render that model through React and `@xyflow/react`; do not make React Flow node state the canonical domain state.
3. Generate official Fina Core ETL YAML from the model. Do not invent a second execution DSL.
4. Execute previews through the Next.js API route and the Fina Core stdio MCP server. Do not create a TypeScript ETL evaluator.
5. Preserve provenance from input JSON nodes through graph mappings to output JSON nodes.
6. Treat inferred paths as suggestions requiring explicit role confirmation.
7. Make semantic changes visible when a node changes type, row cardinality, join behavior, or output shape.
8. Keep the library usable without Next.js. Preview execution must be injected through an adapter.

## Development workflow

1. Read the relevant references before editing:
   - `refs/product-and-interaction.md` for panels, selection, inference, and highlighting.
   - `refs/domain-model.md` for TypeScript model boundaries and invariants.
   - `refs/fina-core-contract.md` for the supported ETL YAML mapping and engine semantics.
   - `refs/implementation-plan.md` for sequencing and acceptance criteria.
   - `refs/agent-prompt.md` when delegating work to another development agent.
2. Inspect the existing package and demo boundaries before adding files.
3. Implement one vertical slice at a time, starting with direct field mapping.
4. Add model-level tests before UI tests. Add fixture-based serializer tests against Fina Core examples.
5. Keep preview execution behind an interface and test the API payload independently from the MCP transport.
6. Run formatting, type checking, unit tests, and the demo build before declaring work complete.

## Product layout

The intended editor has three synchronized regions:

```text
Input Explorer | Bridge / ETL Canvas | Output Explorer
```

The input explorer renders a virtualized JSON tree and optional JSON Schema diagnostics. Shift-click selects compatible repeated nodes. The bridge shows inferred paths, role suggestions, mapping details, validation, and the xyflow graph. The output explorer renders typed preview rows as JSON and highlights output nodes using provenance links.

## Supported graph concepts

Represent these concepts explicitly: `source`, `dataset`, `unwind`, `filter`, `join`, `field`, and `output`. A dataset subtype is `raw`, `master`, or `unwound`. Prefer a pipeline-level graph with a collapsible dataset-detail graph rather than putting every YAML property into one dense canvas.

Node type switching must be constrained. Converting `raw` to `unwound`, adding a join, or changing an output target can change row cardinality or execution dependencies and must produce a migration/confirmation state in the model.

## Path inference rules

Normalize repeated array indices into `[]`, for example:

```text
$.instruments[0].legs[0].underlying
$.instruments[1].legs[0].underlying
→ $.instruments[].legs[].underlying
```

Reject incompatible multi-selection rather than inventing a composite expression. Distinguish source paths, unwind-element paths, join-column expressions, and task-context expressions. The Fina Core forms are `$.field`, `$.alias.field`, `mkt.column`, and `$task.ctx.units`.

## Preview and provenance

The preview adapter must return rows, schema, dataset counts, timing, errors, and provenance. Output JSON is a view of typed dataset results, not a replacement for the table schema. Selecting an input node should highlight dependent graph nodes and all output fields transitively affected by direct mapping, unwind, filters, join keys, join columns, or row-root assembly.

## Quality gates

Do not claim completion unless:

- the public model has no React or Next.js imports;
- generated YAML conforms to `fina-skills/schema/etl.schema.json`;
- no browser-side ETL evaluator has been introduced;
- preview calls are server-side and never expose stdio process details to the browser;
- provenance survives preview refreshes and stable node IDs are deterministic;
- invalid schema/input/model states produce actionable diagnostics;
- tests cover direct mapping, repeated-path inference, unwind cardinality, left joins, filters, row roots, and preview transport boundaries as applicable.

For detailed behavior and phase gates, read `refs/implementation-plan.md`.

## Delegation prompt

Use the complete prompt in `refs/agent-prompt.md` when asking another development agent to implement a slice. It contains the repository boundary, constraints, required deliverables, and verification commands.

## Source references

The implementation must remain aligned with the checked-out Fina Core repositories:

- `/home/ubuntu/FinA/src/config.rs`
- `/home/ubuntu/FinA/src/plazy.rs`
- `/home/ubuntu/FinA/src/etl_sched.rs`
- `/home/ubuntu/fina-skills/schema/etl.schema.json`
- `/home/ubuntu/FinA/examples/scheduler/pipelines.yml`

These local paths are authoritative for this task snapshot; update the references if the upstream ETL schema changes.
