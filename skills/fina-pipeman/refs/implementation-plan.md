# Implementation plan and acceptance gates

## Phase 0: bootstrap

Keep the package and demo compiling with placeholder exports. Establish workspace scripts, TypeScript configuration, package exports, demo API boundary, and test locations. Do not implement the editor in this phase.

## Phase 1: direct mapping vertical slice

Implement JSON tree identity, single selection, direct field mapping, model commands, YAML serialization, output preview projection, and provenance for direct fields. Acceptance: selecting `$.items[].name` creates a field mapping, generated YAML validates against the official schema, and a fixture preview highlights the corresponding output cells.

## Phase 2: repeated selection and unwind

Implement Shift-click compatible selection, normalized repeated paths, unwind rules, row cardinality diagnostics, and output row identity. Acceptance: an array of legs produces one row per leg and incompatible selections are rejected with actionable diagnostics.

## Phase 3: schema validation and filters

Add Ajv or an equivalent JSON Schema validator behind a library adapter. Add filter expressions and diagnostics for invalid paths. Acceptance: schema errors attach to JSON nodes without preventing inspection, while preview blocks invalid execution payloads.

## Phase 4: joins and row roots

Add multiple sources, join nodes, join-column mappings, row-root mappings, missing-join diagnostics, and transitive provenance. Acceptance: a market source can be materialized in memory, joined by an unwound key, and shown in output JSON without TypeScript re-executing the join.

## Phase 5: server preview

Implement a server-only Fina Core stdio MCP adapter and the Next.js API route. Add request/response schemas, timeouts, cancellation, structured errors, and process lifecycle handling. Acceptance: browser code sees only typed preview data and cannot access stdio details.

## Phase 6: graph UI

Render source/dataset/detail nodes with xyflow. Add constrained node type switching, command-driven graph updates, bridge panel, diagnostics, and accessible keyboard interactions. Acceptance: graph edits and form edits produce the same canonical model and YAML.

## Phase 7: scheduler fan-out and hardening

Add execution stages, partition expressions, task context, worker-unique outputs, large JSON virtualization, undo/redo, import/export, and fixture regression tests against the checked-out Fina Core example.

## Required verification

Run the workspace formatter, type checker, unit tests, package build, and demo build. Add serializer fixtures and at least one integration test for the preview API boundary. When Fina Core is available, run the generated YAML through its native runner and compare row counts and selected fields to the preview response.
