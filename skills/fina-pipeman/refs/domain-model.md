# Domain model reference

Keep these types framework-independent. They belong in `packages/fina-pipeman/src/model` and must not import React, Next.js, xyflow, or browser APIs.

## JSON identity

```ts
type JsonNodeId = string;
type JsonType = "object" | "array" | "string" | "number" | "boolean" | "null";

type JsonNodeRef = {
  id: JsonNodeId;
  documentId: string;
  path: string;
  normalizedPath: string;
  jsonType: JsonType;
  valuePreview?: string;
  parentId?: JsonNodeId;
  arrayIndex?: number;
};
```

IDs must be deterministic for the same document and path. Do not use array order alone as the identity of a mapping.

## ETL paths

```ts
type EtlPath =
  | { kind: "source"; expression: string; sourceNodeId: JsonNodeId }
  | { kind: "unwind-element"; alias: string; expression: string; sourceNodeId: JsonNodeId; unwindNodeId: string }
  | { kind: "join-column"; alias: string; expression: string; joinNodeId: string; column: string }
  | { kind: "task-context"; expression: string };
```

Do not represent every path as an opaque string. The kind controls validation and serialization.

## Visual pipeline model

A recommended shape is:

```ts
type VisualPipelineModel = {
  id: string;
  version: 1;
  name: string;
  sources: SourceSpec[];
  datasets: DatasetSpec[];
  execution: ExecutionStageSpec[];
  inputDocuments: InputDocument[];
  mappings: MappingSpec[];
  provenance: ProvenanceLink[];
};
```

`DatasetSpec` contains `datasetType`, `source`, `output`, `fields`, optional `unwindRules`, optional `filter`, optional `join`, and optional `rowRoot`. Keep stable IDs on every source, dataset, rule, field, join, and output.

## Provenance

```ts
type ProvenanceLink = {
  inputNodeIds: JsonNodeId[];
  graphNodeId: string;
  fieldId?: string;
  outputNodeIds: string[];
  relation:
    | "direct-field"
    | "unwind-path"
    | "unwind-element"
    | "filter"
    | "join-key"
    | "join-column"
    | "row-root";
};
```

Provenance should be computed from mappings and preview row metadata, not reconstructed with string matching after rendering.

## Commands and invariants

Use commands such as `selectInputNodes`, `confirmRole`, `addField`, `addUnwindRule`, `addJoin`, `setDatasetType`, `setFilter`, `setOutput`, `runPreview`, and `applyMigration`. Every command returns a new model plus diagnostics. Enforce these invariants:

- every dataset references a known source;
- every dataset has an output target;
- every field has a unique name per dataset;
- unwound datasets need an unwind rule before serialization;
- row-root children reference `$`, an unwind alias, or the join alias;
- joins have alias, target, left key, and right key;
- execution dependencies do not reference a later-produced join target.
