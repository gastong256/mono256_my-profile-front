import { NextResponse } from "next/server";

import type { HealthResponse } from "@/types/api";

export async function GET() {
  const payload: HealthResponse = { status: "ok" };

  return NextResponse.json(payload);
}
