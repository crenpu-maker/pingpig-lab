import assert from "node:assert/strict";
import test from "node:test";
import {
  createEventImportDraft,
  sanitizeFacts,
  validatePublicHttpUrl,
} from "../lib/eventImportSafety.ts";

test("creates draft-only import without external fetch", () => {
  const draft = createEventImportDraft({
    sourceUrl: "https://example.com/events/abc#details",
    facts: {
      eventName: "  Tokyo Open  ",
      venue: "Main Arena",
      ignoredDescription: "This full description must not be carried through.",
    },
  });

  assert.equal(draft.status, "draft");
  assert.equal(draft.public, false);
  assert.equal(draft.requiresUserConfirmation, true);
  assert.equal(draft.externalFetchPerformed, false);
  assert.equal(draft.sourceUrl, "https://example.com/events/abc");
  assert.equal(draft.organizerOfficialUrl, "https://example.com/events/abc");
  assert.equal(draft.facts.eventName, "Tokyo Open");
  assert.equal("ignoredDescription" in draft.facts, false);
});

test("rejects private and unsafe URL targets", () => {
  const rejected = [
    "http://localhost/event",
    "http://127.0.0.1/event",
    "http://10.0.0.5/event",
    "http://172.20.0.1/event",
    "http://192.168.1.10/event",
    "http://169.254.169.254/latest",
    "ftp://example.com/event",
    "https://user:pass@example.com/event",
    "https://example.com:3000/event",
  ];

  for (const url of rejected) {
    assert.equal(validatePublicHttpUrl(url).ok, false, url);
  }
});

test("sanitizes facts to small basic fields only", () => {
  const facts = sanitizeFacts({
    eventName: "A".repeat(200),
    eventDate: "2026-09-12\n<script>",
    venue: "  Main\tArena  ",
    html: "<html>not allowed</html>",
  });

  assert.equal(facts.eventName.length, 140);
  assert.equal(facts.eventDate, "2026-09-12 <script>");
  assert.equal(facts.venue, "Main Arena");
  assert.equal("html" in facts, false);
});
