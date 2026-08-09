import { z } from "zod";
import { spamCheckFields } from "@/lib/validation/spamCheck";

export const MODULE_OPTIONS = [
  "coreHr",
  "payroll",
  "leave",
  "attendance",
  "recruitment",
  "performance",
  "learningDevelopment",
  "ess",
  "analytics",
] as const;

export const CONTACT_METHOD_OPTIONS = ["email", "phone", "either"] as const;

/**
 * Fields captured on /request-demo — see scope §30 and
 * docs/06-technical/supabase.md (demo_requests table).
 */
export const demoRequestSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  workEmail: z.email("Enter a valid work email").max(200),
  phone: z.string().trim().max(30).optional().default(""),
  companyName: z.string().trim().min(1, "Company is required").max(200),
  country: z.string().trim().min(1, "Country is required").max(100),
  employeeCount: z.string().trim().max(50).optional().default(""),
  interestedModules: z.array(z.enum(MODULE_OPTIONS)).default([]),
  message: z.string().trim().max(2000).optional().default(""),
  preferredContactMethod: z.enum(CONTACT_METHOD_OPTIONS).default("email"),
  source: z.string().trim().max(200).optional().default(""),
  ...spamCheckFields,
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
