import { z } from "zod";

/**
 * Shared anti-spam fields, mixed into every public form schema — see
 * docs/06-technical/supabase.md. Deliberately lightweight (honeypot +
 * minimum-fill-time) rather than a CAPTCHA service, which the architecture
 * doc defers until spam is an actual observed problem.
 */
export const spamCheckFields = {
  // Hidden field real users never see or fill; bots that auto-fill every
  // input trip this. Deliberately NOT constrained to an empty string at
  // the schema level (e.g. max(0)) — that would reject a filled honeypot
  // with a 400 before looksLikeSpam() below ever runs, which leaks to a
  // bot exactly which field is monitored. Any non-huge string is valid
  // input here; looksLikeSpam() is the only place that acts on its value.
  // max(1000) exists purely to bound payload size, not to gate spam logic.
  website: z.string().max(1000).optional().default(""),
  // Client-set timestamp (ms since epoch) from when the form first
  // rendered. Anything submitted in well under a second is almost
  // certainly scripted.
  renderedAt: z.number(),
};

const MIN_FILL_TIME_MS = 1500;

export function looksLikeSpam(data: { website?: string; renderedAt: number }) {
  if (data.website && data.website.length > 0) return true;
  if (Date.now() - data.renderedAt < MIN_FILL_TIME_MS) return true;
  return false;
}
