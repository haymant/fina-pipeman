# Product and interaction specification

## 1. Three-panel workbench

Use a responsive three-region layout:

```text
┌────────────────┬──────────────────────┬────────────────┐
│ Input Explorer │ Bridge / ETL Canvas  │ Output Explorer│
└────────────────┴──────────────────────┴────────────────┘
```

The layout may collapse into tabs on narrow screens, but the same selection and provenance state must remain shared.

### Input Explorer

Render JSON as a virtualized, expandable tree. Give every object property, array, array item, and scalar a stable `JsonNodeRef`. Show JSON type, path, value preview, expansion state, selection state, and schema annotations. Support single click and Shift-click. Do not require the user to understand JSONPath syntax.

### Bridge panel

Show current input selection, normalized path, inference confidence, suggested ETL role, graph node, generated expression, output column, and diagnostics. Role suggestions are not committed until the user confirms them. Provide explicit roles: field, unwind path, unwind condition, filter, join left key, partition key, output column, and row-root child.

### Output Explorer

Render preview rows as a JSON tree while retaining typed table schema and stable `OutputNodeRef` identities. Show dataset name, row count, nulls, errors, and timing separately from the JSON view.

## 2. Selection and path inference

Single selection returns the exact source path. Compatible repeated selections normalize numeric indices into `[]`:

```text
$.items[0].name + $.items[1].name → $.items[].name
```

Compatible selections must have the same property suffix and the same repeating array structure. Reject incompatible selections such as `$.instrument.id` plus `$.market.spot`. Explain why the inference failed and offer separate mappings.

Never infer semantic role from selection alone. A selected array can become a field or an unwind path; the bridge must ask the user to choose or confirm.

## 3. Graph

Represent `source`, `dataset`, `unwind`, `filter`, `join`, `field`, and `output`. Use a pipeline-level view by default. Open a dataset-detail view for fields and row cardinality.

Edges should be semantic, not merely visual. Use edge metadata for `input`, `unwind`, `filter`, `join-key`, `join-column`, `field`, `output`, and `dependency`. Keep graph nodes synchronized with the domain model through commands; do not mutate domain state directly from xyflow callbacks.

## 4. Highlighting

Maintain a dependency graph from input refs to graph mappings to output refs. On input selection, highlight all transitive dependents and dim unrelated nodes. On output selection, reverse-highlight source and graph dependencies. Highlight missing joins and filtered-out rows with distinct diagnostic states rather than silently hiding them.

## 5. Node type changes

Allow only valid conversions. A conversion that changes cardinality, dependency ordering, or output target must create a pending migration with a clear summary. Examples include raw → unwound, adding a join, and file output → memory output.

## 6. Accessibility and usability

All selection operations need keyboard equivalents. Do not rely on color alone for highlights. Use labels, focus rings, aria descriptions, and a text diagnostics list. Large JSON documents require virtualization and lazy child computation.
