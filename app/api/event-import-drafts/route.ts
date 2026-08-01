import { NextRequest, NextResponse } from "next/server";
import { createEventImportDraft, sanitizeText } from "@/lib/eventImportSafety";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 8;
const BODY_LIMIT_BYTES = 8 * 1024;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);
  const rateLimit = checkRateLimit(clientKey);

  if (!rateLimit.allowed) {
    return json(
      {
        error: "Rate limit exceeded.",
        resetAt: new Date(rateLimit.resetAt).toISOString(),
      },
      429,
    );
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ error: "Content-Type must be application/json." }, 415);
  }

  const rawBody = await request.text();

  if (new TextEncoder().encode(rawBody).length > BODY_LIMIT_BYTES) {
    return json({ error: "Request body is too large." }, 413);
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody);
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  if (!isRecord(body)) {
    return json({ error: "JSON body must be an object." }, 400);
  }

  try {
    const draft = createEventImportDraft({
      sourceUrl: sanitizeText(body.sourceUrl, 2048),
      organizerOfficialUrl: sanitizeText(body.organizerOfficialUrl, 2048),
      facts: body.facts,
    });

    return json(
      {
        draft,
        compliance: {
          mode: "draft-only",
          externalFetchPerformed: false,
          public: false,
          requiresUserConfirmation: true,
          storedFields: [
            "eventName",
            "eventDate",
            "venue",
            "region",
            "divisions",
            "eligibility",
            "entryDeadline",
            "sourceUrl",
            "organizerOfficialUrl",
          ],
          prohibitedPublicMaterials: [
            "third-party screenshots",
            "third-party HTML",
            "third-party images",
            "full external descriptions",
          ],
        },
      },
      201,
    );
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "Draft rejected." },
      400,
    );
  }
}

function checkRateLimit(clientKey: string) {
  const now = Date.now();
  const current = rateLimitStore.get(clientKey);

  if (!current || current.resetAt <= now) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(clientKey, { count: 1, resetAt });
    return { allowed: true, resetAt };
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return { allowed: false, resetAt: current.resetAt };
  }

  current.count += 1;
  return { allowed: true, resetAt: current.resetAt };
}

function getClientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local-dev"
  );
}

function json(body: unknown, status: number) {
  return NextResponse.json(body, {
    status,
    headers: corsHeaders(),
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
