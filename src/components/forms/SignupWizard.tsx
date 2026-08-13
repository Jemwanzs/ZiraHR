"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import {
  signupSchema,
  signupStep1Schema,
  signupStep2Schema,
} from "@/lib/validation/signup";
import { FormField, inputClasses } from "@/components/forms/FormField";
import { Button } from "@/components/ui/Button";

type FormState = {
  firstName: string;
  lastName: string;
  workEmail: string;
  phone: string;
  companyName: string;
  country: string;
  industry: string;
  employeeCount: string;
  branchCount: string;
  departmentCount: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  workEmail: "",
  phone: "",
  companyName: "",
  country: "",
  industry: "",
  employeeCount: "",
  branchCount: "",
  departmentCount: "",
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.payekenya.xyz/";

function fieldErrorsFrom(error: { issues: { path: PropertyKey[]; message: string }[] }) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

export function SignupWizard() {
  const t = useTranslations("forms.signup");
  const tCommon = useTranslations("forms.common");

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const renderedAt = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleStep1Continue(event: FormEvent) {
    event.preventDefault();
    const parsed = signupStep1Schema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrorsFrom(parsed.error));
      return;
    }
    setErrors({});
    setStep(2);
  }

  function handleStep2Continue(event: FormEvent) {
    event.preventDefault();
    const parsed = signupStep2Schema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrorsFrom(parsed.error));
      return;
    }
    setErrors({});
    setStep(3);
  }

  async function handleStep3Continue(event: FormEvent) {
    event.preventDefault();
    setErrors({});

    const parsed = signupSchema.safeParse({
      ...values,
      website: honeypotRef.current?.value ?? "",
      renderedAt: renderedAt.current,
    });

    if (!parsed.success) {
      setErrors(fieldErrorsFrom(parsed.error));
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/forms/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("idle");
      setStep(4);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="mb-6 flex gap-1.5" aria-hidden="true">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`h-1 flex-1 rounded-full ${n <= step ? "bg-teal-deep" : "bg-gray-200"}`}
          />
        ))}
      </div>

      {step === 1 && (
        <form onSubmit={handleStep1Continue} className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("step1.title")}
          </h1>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label={t("step1.fields.firstName")} htmlFor="firstName" required error={errors.firstName}>
              <input
                id="firstName"
                className={inputClasses}
                value={values.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
              />
            </FormField>
            <FormField label={t("step1.fields.lastName")} htmlFor="lastName" required error={errors.lastName}>
              <input
                id="lastName"
                className={inputClasses}
                value={values.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />
            </FormField>
          </div>
          <FormField label={t("step1.fields.workEmail")} htmlFor="workEmail" required error={errors.workEmail}>
            <input
              id="workEmail"
              type="email"
              className={inputClasses}
              value={values.workEmail}
              onChange={(e) => updateField("workEmail", e.target.value)}
            />
          </FormField>
          <FormField label={t("step1.fields.phone")} htmlFor="phone" error={errors.phone}>
            <input
              id="phone"
              type="tel"
              className={inputClasses}
              value={values.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </FormField>
          <Button type="submit" className="justify-center">
            {t("continue")}
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleStep2Continue} className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("step2.title")}
          </h1>
          <FormField label={t("step2.fields.companyName")} htmlFor="companyName" required error={errors.companyName}>
            <input
              id="companyName"
              className={inputClasses}
              value={values.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
            />
          </FormField>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label={t("step2.fields.country")} htmlFor="country" required error={errors.country}>
              <input
                id="country"
                className={inputClasses}
                value={values.country}
                onChange={(e) => updateField("country", e.target.value)}
              />
            </FormField>
            <FormField label={t("step2.fields.industry")} htmlFor="industry" error={errors.industry}>
              <input
                id="industry"
                className={inputClasses}
                value={values.industry}
                onChange={(e) => updateField("industry", e.target.value)}
              />
            </FormField>
          </div>
          <FormField label={t("step2.fields.employeeCount")} htmlFor="employeeCount" error={errors.employeeCount}>
            <input
              id="employeeCount"
              className={inputClasses}
              value={values.employeeCount}
              onChange={(e) => updateField("employeeCount", e.target.value)}
            />
          </FormField>
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => setStep(1)}>
              {t("back")}
            </Button>
            <Button type="submit" className="flex-1 justify-center">
              {t("continue")}
            </Button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleStep3Continue} className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("step3.title")}
          </h1>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label={t("step3.fields.branchCount")} htmlFor="branchCount" error={errors.branchCount}>
              <input
                id="branchCount"
                className={inputClasses}
                value={values.branchCount}
                onChange={(e) => updateField("branchCount", e.target.value)}
              />
            </FormField>
            <FormField label={t("step3.fields.departmentCount")} htmlFor="departmentCount" error={errors.departmentCount}>
              <input
                id="departmentCount"
                className={inputClasses}
                value={values.departmentCount}
                onChange={(e) => updateField("departmentCount", e.target.value)}
              />
            </FormField>
          </div>
          {status === "error" && (
            <p role="alert" className="text-sm text-red-600">
              {tCommon("genericError")}
            </p>
          )}
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => setStep(2)}>
              {t("back")}
            </Button>
            <Button
              type="submit"
              disabled={status === "submitting"}
              className="flex-1 justify-center"
            >
              {status === "submitting" ? tCommon("loading") : t("continue")}
            </Button>
          </div>
        </form>
      )}

      {step === 4 && (
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("step4.title")}
          </h1>
          <p className="text-gray-600">{t("step4.body")}</p>
          <Button href={APP_URL} external showArrow>
            {t("step4.continue")}
          </Button>
        </div>
      )}
    </div>
  );
}
