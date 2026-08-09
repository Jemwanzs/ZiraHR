import { z } from "zod";
import { spamCheckFields } from "@/lib/validation/spamCheck";

export const signupStep1Schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  workEmail: z.email("Enter a valid work email").max(200),
  phone: z.string().trim().max(30).optional().default(""),
});

export const signupStep2Schema = z.object({
  companyName: z.string().trim().min(1, "Company is required").max(200),
  country: z.string().trim().min(1, "Country is required").max(100),
  industry: z.string().trim().max(100).optional().default(""),
  employeeCount: z.string().trim().max(50).optional().default(""),
});

export const signupStep3Schema = z.object({
  branchCount: z.string().trim().max(50).optional().default(""),
  departmentCount: z.string().trim().max(50).optional().default(""),
});

export const signupSchema = signupStep1Schema
  .extend(signupStep2Schema.shape)
  .extend(signupStep3Schema.shape)
  .extend(spamCheckFields);

export type SignupInput = z.infer<typeof signupSchema>;
