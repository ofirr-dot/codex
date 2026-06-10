import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;

  if (!url || !secret) {
    return NextResponse.json({ ok: false, error: "Apps Script is not configured yet" }, { status: 400 });
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "sendTelegramSummary", secret }),
    cache: "no-store"
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.ok ? 200 : 502 });
}
