"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import {
  demoRequestSchema,
  MODULE_OPTIONS,
  CONTACT_METHOD_OPTIONS,
} from "@/lib/validation/demoRequest";
import { FormField, inputClasses } from "@/components/forms/FormField";
import { Button } from "@/components/ui/Button";

type FormState = {
  firstName: string;
  lastName: string;
  workEmail: string;
  phone: string;
  companyName: string;
  country: string;
  employeeCount: string;
  interestedModules: string[];
  message: string;
  preferredContactMethod: (typeof CONTACT_METHOD_OPTIONS)[number];
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  workEmail: "",
  phone: "",
  companyName: "",
  country: "",
  employeeCount: "",
  interestedModules: [],
  message: "",
  preferredContactMethod: "email",
};

export function DemoRequestForm() {
  const t = useTranslations("forms.demoRequest");
  const tCommon = useTranslations("forms.common");

  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const renderedAt = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  function toggleModule(module: string) {
    setValues((prev) => ({
      ...prev,
      interestedModules: prev.interestedModules.includes(module)
        ? prev.interestedModules.filter((m) => m !== module)
        : [...prev.interestedModules, module],
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrors({});

    const parsed = demoRequestSchema.safeParse({
      ...values,
      website: honeypotRef.current?.value ?? "",
      renderedAt: renderedAt.current,
      source: typeof window !== "undefined" ? window.location.pathname : "",
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/forms/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t("success.title")}
        </h2>
        <p className="mt-2 text-gray-600">{t("success.body")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
    >
      {/* Honeypot — hidden from real users, never validated as "filled". */}
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={t("fields.firstName")} htmlFor="firstName" required error={errors.firstName}>
          <input
            id="firstName"
            className={inputClasses}
            value={values.firstName}
            onChange={(e) => setValues({ ...values, firstName: e.target.value })}
          />
        </FormField>
        <FormField label={t("fields.lastName")} htmlFor="lastName" required error={errors.lastName}>
          <input
            id="lastName"
            className={inputClasses}
            value={values.lastName}
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
          />
        </FormField>
      </div>

      <FormField label={t("fields.workEmail")} htmlFor="workEmail" required error={errors.workEmail}>
        <input
          id="workEmail"
          type="email"
          className={inputClasses}
          value={values.workEmail}
          onChange={(e) => setValues({ ...values, workEmail: e.target.value })}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={t("fields.phone")} htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            className={inputClasses}
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
          />
        </FormField>
        <FormField label={t("fields.companyName")} htmlFor="companyName" required error={errors.companyName}>
          <input
            id="companyName"
            className={inputClasses}
            value={values.companyName}
            onChange={(e) => setValues({ ...values, companyName: e.target.value })}
          />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={t("fields.country")} htmlFor="country" required error={errors.country}>
          <input
            id="country"
            className={inputClasses}
            value={values.country}
            onChange={(e) => setValues({ ...values, country: e.target.value })}
          />
        </FormField>
        <FormField label={t("fields.employeeCount")} htmlFor="employeeCount" error={errors.employeeCount}>
          <input
            id="employeeCount"
            className={inputClasses}
            value={values.employeeCount}
            onChange={(e) => setValues({ ...values, employeeCount: e.target.value })}
          />
        </FormField>
      </div>

      <FormField label={t("fields.interestedModules")} htmlFor="interestedModules">
        <div className="flex flex-wrap gap-2">
          {MODULE_OPTIONS.map((module) => {
            const selected = values.interestedModules.includes(module);
            return (
              <button
                key={module}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleModule(module)}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? "bg-teal text-overlay"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t(`moduleOptions.${module}`)}
              </button>
            );
          })}
        </div>
      </FormField>

      <FormField label={t("fields.preferredContactMethod")} htmlFor="preferredContactMethod">
        <div className="flex gap-2">
          {CONTACT_METHOD_OPTIONS.map((method) => (
            <button
              key={method}
              type="button"
              aria-pressed={values.preferredContactMethod === method}
              onClick={() => setValues({ ...values, preferredContactMethod: method })}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                values.preferredContactMethod === method
                  ? "bg-teal text-overlay"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t(`contactMethods.${method}`)}
            </button>
          ))}
        </div>
      </FormField>

      <FormField label={t("fields.message")} htmlFor="message" error={errors.message}>
        <textarea
          id="message"
          rows={3}
          className={inputClasses}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
        />
      </FormField>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {tCommon("genericError")}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="justify-center">
        {status === "submitting" ? tCommon("loading") : t("submit")}
      </Button>
    </form>
  );
}
