import { z } from "zod";
import { spamCheckFields } from "@/lib/validation/spamCheck";

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email").max(200),
  locale: z.string().trim().max(10).optional().default("en"),
  ...spamCheckFields,
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
