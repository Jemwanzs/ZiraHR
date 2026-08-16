import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";
import { looksLikeSpam } from "@/lib/validation/spamCheck";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { notifySlack, slackField, slackHeader, slackSection } from "@/lib/slack";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";

export async function POST(request: Request) {
  const allowed = await checkRateLimit(`contact:${getClientIp(request)}`, {
    maxRequests: 5,
    windowSeconds: 600,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
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
    const { error } = await supabase.from("contact_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      subject: data.subject || null,
      message: data.message,
    });

    if (error) {
      console.error("Failed to insert contact request:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    await notifySlack(process.env.SLACK_WEBHOOK_CONTACT, [
      slackHeader("New contact form submission"),
      slackSection([
        slackField("Name", data.name),
        slackField("Email", data.email),
        slackField("Company", data.company),
        slackField("Subject", data.subject),
      ]),
      { type: "section", text: { type: "mrkdwn", text: data.message } },
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unhandled error in /api/forms/contact:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
