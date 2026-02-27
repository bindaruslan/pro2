import { NextRequest, NextResponse } from "next/server";

interface ValidatePayload {
  ok: boolean;
  active: boolean;
  statusCode: number | null;
  message: string;
}

const ALLOWED_HOSTS = new Set([
  "zakon.rada.gov.ua",
  "customs.gov.ua",
  "www.customs.gov.ua",
  "kmu.gov.ua",
  "www.kmu.gov.ua",
]);

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    const payload: ValidatePayload = {
      ok: false,
      active: false,
      statusCode: null,
      message: "URL не передано.",
    };
    return NextResponse.json(payload, { status: 400 });
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") {
      throw new Error("Дозволені лише HTTPS-посилання.");
    }

    if (!ALLOWED_HOSTS.has(parsed.hostname)) {
      throw new Error("Дозволені лише офіційні домени (Rada, Customs, CMU).");
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    let response: Response;
    try {
      response = await fetch(parsed.toString(), {
        method: "HEAD",
        redirect: "follow",
        signal: controller.signal,
      });
    } catch {
      response = await fetch(parsed.toString(), {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }

    const payload: ValidatePayload = {
      ok: true,
      active: response.ok,
      statusCode: response.status,
      message: response.ok ? "Джерело активне." : "Джерело відповіло з помилкою.",
    };

    return NextResponse.json(payload);
  } catch (error) {
    const payload: ValidatePayload = {
      ok: false,
      active: false,
      statusCode: null,
      message: error instanceof Error ? error.message : "Помилка перевірки джерела.",
    };
    return NextResponse.json(payload, { status: 400 });
  }
}
