import { isIP } from "node:net";

export type EventDraftFacts = {
  eventName: string;
  eventDate: string;
  venue: string;
  region: string;
  divisions: string;
  eligibility: string;
  entryDeadline: string;
};

export type EventImportDraft = {
  id: string;
  status: "draft";
  sourceUrl: string;
  organizerOfficialUrl: string;
  facts: EventDraftFacts;
  createdAt: string;
  requiresUserConfirmation: true;
  public: false;
  externalFetchPerformed: false;
};

const PRIVATE_HOST_SUFFIXES = [".local", ".localhost", ".internal", ".test"];
const FACT_MAX_LENGTH = 140;

export const emptyEventFacts: EventDraftFacts = {
  eventName: "",
  eventDate: "",
  venue: "",
  region: "",
  divisions: "",
  eligibility: "",
  entryDeadline: "",
};

export function sanitizeText(value: unknown, maxLength = FACT_MAX_LENGTH) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeFacts(input: unknown): EventDraftFacts {
  const source = isRecord(input) ? input : {};

  return {
    eventName: sanitizeText(source.eventName),
    eventDate: sanitizeText(source.eventDate, 64),
    venue: sanitizeText(source.venue),
    region: sanitizeText(source.region, 80),
    divisions: sanitizeText(source.divisions),
    eligibility: sanitizeText(source.eligibility),
    entryDeadline: sanitizeText(source.entryDeadline, 64),
  };
}

export function validatePublicHttpUrl(value: unknown) {
  const rawUrl = sanitizeText(value, 2048);

  if (!rawUrl) {
    return { ok: false as const, error: "URL is required." };
  }

  let parsed: URL;

  try {
    parsed = new URL(rawUrl);
  } catch {
    return { ok: false as const, error: "URL must be absolute." };
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return { ok: false as const, error: "Only http and https URLs are allowed." };
  }

  if (parsed.username || parsed.password) {
    return { ok: false as const, error: "Credentials in URLs are not allowed." };
  }

  if (parsed.port && parsed.port !== "80" && parsed.port !== "443") {
    return { ok: false as const, error: "Only standard web ports are allowed." };
  }

  const hostname = parsed.hostname.toLowerCase();

  if (isBlockedHostname(hostname)) {
    return { ok: false as const, error: "Private or local hosts are not allowed." };
  }

  parsed.hash = "";

  return { ok: true as const, url: parsed.toString() };
}

export function createEventImportDraft(input: {
  sourceUrl: string;
  organizerOfficialUrl?: string;
  facts?: unknown;
}): EventImportDraft {
  const sourceValidation = validatePublicHttpUrl(input.sourceUrl);

  if (!sourceValidation.ok) {
    throw new Error(sourceValidation.error);
  }

  const officialValidation = input.organizerOfficialUrl
    ? validatePublicHttpUrl(input.organizerOfficialUrl)
    : null;

  if (officialValidation && !officialValidation.ok) {
    throw new Error(`Official URL rejected: ${officialValidation.error}`);
  }

  return {
    id: crypto.randomUUID(),
    status: "draft",
    sourceUrl: sourceValidation.url,
    organizerOfficialUrl:
      officialValidation && officialValidation.ok
        ? officialValidation.url
        : sourceValidation.url,
    facts: sanitizeFacts(input.facts),
    createdAt: new Date().toISOString(),
    requiresUserConfirmation: true,
    public: false,
    externalFetchPerformed: false,
  };
}

function isBlockedHostname(hostname: string) {
  if (
    hostname === "localhost" ||
    hostname === "0" ||
    hostname.endsWith(".localhost") ||
    PRIVATE_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix))
  ) {
    return true;
  }

  const ipVersion = isIP(hostname);

  if (ipVersion === 4) {
    return isPrivateIpv4(hostname);
  }

  if (ipVersion === 6) {
    return isPrivateIpv6(hostname);
  }

  return false;
}

function isPrivateIpv4(hostname: string) {
  const parts = hostname.split(".").map((part) => Number(part));
  const [a, b] = parts;

  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part))) {
    return true;
  }

  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    a === 169 && b === 254 ||
    a === 172 && b >= 16 && b <= 31 ||
    a === 192 && b === 168 ||
    a >= 224
  );
}

function isPrivateIpv6(hostname: string) {
  const normalized = hostname.toLowerCase();

  return (
    normalized === "::1" ||
    normalized === "::" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe80:")
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
