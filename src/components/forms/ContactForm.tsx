"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { contactSchema } from "@/lib/validation/contact";
import { FormField, inputClasses } from "@/components/forms/FormField";
import { Button } from "@/components/ui/Button";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const t = useTranslations("forms.contact");
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrors({});

    const parsed = contactSchema.safeParse({
      ...values,
      website: honeypotRef.current?.value ?? "",
      renderedAt: renderedAt.current,
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
      const response = await fetch("/api/forms/contact", {
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
        <FormField label={t("fields.name")} htmlFor="name" required error={errors.name}>
          <input
            id="name"
            className={inputClasses}
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </FormField>
        <FormField label={t("fields.email")} htmlFor="email" required error={errors.email}>
          <input
            id="email"
            type="email"
            className={inputClasses}
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </FormField>
      </div>

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
        <FormField label={t("fields.company")} htmlFor="company" error={errors.company}>
          <input
            id="company"
            className={inputClasses}
            value={values.company}
            onChange={(e) => setValues({ ...values, company: e.target.value })}
          />
        </FormField>
      </div>

      <FormField label={t("fields.subject")} htmlFor="subject" error={errors.subject}>
        <input
          id="subject"
          className={inputClasses}
          value={values.subject}
          onChange={(e) => setValues({ ...values, subject: e.target.value })}
        />
      </FormField>

      <FormField label={t("fields.message")} htmlFor="message" required error={errors.message}>
        <textarea
          id="message"
          rows={4}
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
