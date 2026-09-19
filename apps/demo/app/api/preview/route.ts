import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: {
        code: "PREVIEW_NOT_IMPLEMENTED",
        message: "Fina Core stdio MCP preview adapter is reserved for a later implementation phase."
      }
    },
    { status: 501 }
  );
}
