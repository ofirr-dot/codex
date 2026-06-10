import { NextResponse } from "next/server";
import { getDemoPortfolio } from "@/lib/demo-data";
import type { PortfolioSnapshot } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;

  if (!url || !secret) {
    return NextResponse.json(getDemoPortfolio());
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "getPortfolio", secret }),
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Apps Script returned ${response.status}`);
    }

    const data = (await response.json()) as PortfolioSnapshot | { error: string };
    if ("error" in data) {
      throw new Error(data.error);
    }

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown portfolio API error";
    return NextResponse.json(
      { ...getDemoPortfolio(), warning: message },
      { status: 200 }
    );
  }
}
