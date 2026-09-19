# Fina Core contract reference

Fina Pipeman targets the ETL schema in `/home/ubuntu/fina-skills/schema/etl.schema.json`. The generated document has `pipelines`, optional `execution`, named `sources`, and `datasets`.

## Source

```yaml
sources:
  - name: instruments
    uri: file://instruments.json
    format: json
    json_path: $.records
```

## Dataset and field

```yaml
datasets:
  - name: options
    type: raw
    source: instruments
    to:
      uri: file://out/options.parquet
      format: parquet
    fields:
      - name: instrument_id
        expression: $.id
```

Dataset types are `raw`, `master`, and `unwound`. Raw/master produce one row per input record. Unwound produces zero or more rows per record.

## Unwind

```yaml
unwind_rules:
  - name: leg
    condition: $.legs[0]
    unwind_path: $.legs
    output_alias: leg
```

The condition must be truthy and the unwind path must resolve to an array. The alias is used by field expressions such as `$.leg.underlying`.

## Filter

A dataset filter is evaluated per output row. Fan-out uses expressions such as `$.name IN $task.ctx.units`. Do not move semantic filters into an output query.

## Join

```yaml
join:
  alias: mkt
  target: memory://market
  left_key: $.leg.underlying
  right_key: symbol
  columns: [bid, ask, spot]
```

Fina Core performs a left join. Joined fields are referenced as `mkt.bid` and `mkt.spot`. The target must already exist in the shared store or be produced by an earlier stage.

## Row root

```yaml
row_root:
  instrument: $
  leg: leg
  market: mkt
```

Fields then reference `$.instrument.id`, `$.leg.strike`, or `$.market.spot`. Row-root assembly is an engine feature; do not approximate it in the browser.

## Scheduler

`execution` is a list of serial stages. Members of a stage run concurrently unless the engine configuration says otherwise. A partition node such as `partition(instruments.name, 10)` creates tasks whose context exposes `$task.ctx.units`. Use `{task}` in fan-out output paths to avoid collisions.

## Preview transport

The Next.js route should accept a versioned request containing input documents, generated YAML or the canonical model, and preview options. The route validates the payload, starts or reuses the Fina Core stdio MCP process through a server-only adapter, invokes preview execution, normalizes the result, and returns rows/schema/timing/errors/provenance. Never expose process handles, filesystem paths, or credentials to the browser.

The library should define an injected `PreviewExecutor` interface. The demo implements it in `apps/demo/app/api/preview/route.ts` or a server-only module. Keep MCP argument details out of React components.
