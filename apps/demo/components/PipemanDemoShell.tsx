"use client";

import { finaPipemanVersion } from "@haymant/fina-pipeman";

export function PipemanDemoShell() {
  return (
    <main style={{ fontFamily: "system-ui", padding: 32 }}>
      <h1>Fina Pipeman</h1>
      <p>Visual ETL authoring workbench bootstrap.</p>
      <p>Library version: {finaPipemanVersion}</p>
      <p>The editor panels and preview workflow are intentionally not implemented yet.</p>
    </main>
  );
}
