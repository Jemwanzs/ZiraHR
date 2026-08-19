import { NextResponse } from "next/server";
import { demoRequestSchema } from "@/lib/validation/demoRequest";
import { looksLikeSpam } from "@/lib/validation/spamCheck";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { notifySlack, slackField, slackHeader, slackSection } from "@/lib/slack";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";

export async function POST(request: Request) {
  const allowed = await checkRateLimit(`demo-request:${getClientIp(request)}`, {
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

  const parsed = demoRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (looksLikeSpam(data)) {
    // Pretend success so scripted submitters don't learn anything —
    // nothing is written or notified.
    return NextResponse.json({ ok: true });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("demo_requests").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      work_email: data.workEmail,
      phone: data.phone || null,
      company_name: data.companyName,
      country: data.country,
      employee_count: data.employeeCount || null,
      interested_modules: data.interestedModules,
      message: data.message || null,
      preferred_contact_method: data.preferredContactMethod,
      source: data.source || null,
      journey_started_at: data.journeyStartedAt || null,
    });

    if (error) {
      console.error("Failed to insert demo request:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    await notifySlack(process.env.SLACK_WEBHOOK_DEMO_REQUESTS, [
      slackHeader("New demo request"),
      slackSection([
        slackField("Name", `${data.firstName} ${data.lastName}`),
        slackField("Company", data.companyName),
        slackField("Work email", data.workEmail),
        slackField("Country", data.country),
        slackField("Employee count", data.employeeCount),
        slackField("Modules", data.interestedModules.join(", ")),
        slackField("Preferred contact", data.preferredContactMethod),
      ]),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Covers a misconfigured/missing Supabase env var and any other
    // unexpected throw — without this, the function crashes with an empty
    // response body and the client can't tell what happened.
    console.error("Unhandled error in /api/forms/demo-request:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
