import { z } from "zod";

/**
 * Shared anti-spam fields, mixed into every public form schema — see
 * docs/06-technical/supabase.md. Deliberately lightweight (honeypot +
 * minimum-fill-time) rather than a CAPTCHA service, which the architecture
 * doc defers until spam is an actual observed problem.
 */
export const spamCheckFields = {
  // Hidden field real users never see or fill; bots that auto-fill every
  // input trip this.
  website: z.string().max(0, "Leave this field empty").optional().default(""),
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
