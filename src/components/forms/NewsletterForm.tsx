"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { newsletterSchema } from "@/lib/validation/newsletter";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const t = useTranslations("forms.newsletter");
  const tCommon = useTranslations("forms.common");
  const locale = useLocale();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
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
    setError("");

    const parsed = newsletterSchema.safeParse({
      email,
      locale,
      website: honeypotRef.current?.value ?? "",
      renderedAt: renderedAt.current,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? tCommon("genericError"));
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/forms/newsletter", {
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
    return <p className="text-sm font-medium text-gray-900">{t("success")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <label htmlFor="newsletter-email" className="sr-only">
        {t("placeholder")}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder={t("placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-teal-deep focus:outline-none focus:ring-2 focus:ring-teal/20 sm:w-64"
      />
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? tCommon("loading") : t("submit")}
      </Button>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {tCommon("genericError")}
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
