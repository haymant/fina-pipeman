/**
 * Public entry point for Fina Pipeman.
 *
 * The bootstrap intentionally exports only a version marker. Domain model,
 * serializer, graph, and preview adapter APIs are added in later phases.
 */
export const finaPipemanVersion = "0.1.0" as const;

export type PreviewExecutor = {
  preview(request: unknown): Promise<unknown>;
};
