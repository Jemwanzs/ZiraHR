import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation/newsletter";
import { looksLikeSpam } from "@/lib/validation/spamCheck";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (looksLikeSpam(data)) {
    return NextResponse.json({ ok: true });
  }

  try {
    const supabase = getSupabaseServerClient();
    // Newsletter is high-volume/low-urgency — no Slack notification
    // (docs/06-technical/notifications.md). Re-subscribing an existing email
    // is a normal, successful outcome, not an error.
    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        { email: data.email, locale: data.locale, status: "subscribed" },
        { onConflict: "email" },
      );

    if (error) {
      console.error("Failed to insert newsletter subscriber:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unhandled error in /api/forms/newsletter:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
