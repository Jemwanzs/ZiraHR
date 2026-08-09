import { z } from "zod";
import { spamCheckFields } from "@/lib/validation/spamCheck";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.email("Enter a valid email").max(200),
  phone: z.string().trim().max(30).optional().default(""),
  company: z.string().trim().max(200).optional().default(""),
  subject: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(4000),
  ...spamCheckFields,
});

export type ContactInput = z.infer<typeof contactSchema>;
