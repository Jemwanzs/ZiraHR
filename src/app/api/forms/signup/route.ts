import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/validation/signup";
import { looksLikeSpam } from "@/lib/validation/spamCheck";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { notifySlack, slackField, slackHeader, slackSection } from "@/lib/slack";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = signupSchema.safeParse(body);
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
    const { error } = await supabase.from("signup_requests").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      work_email: data.workEmail,
      phone: data.phone || null,
      company_name: data.companyName,
      country: data.country,
      industry: data.industry || null,
      employee_count: data.employeeCount || null,
      branch_count: data.branchCount || null,
      department_count: data.departmentCount || null,
    });

    if (error) {
      console.error("Failed to insert signup request:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    await notifySlack(process.env.SLACK_WEBHOOK_SIGNUP, [
      slackHeader("New SoftHR signup"),
      slackSection([
        slackField("Name", `${data.firstName} ${data.lastName}`),
        slackField("Company", data.companyName),
        slackField("Work email", data.workEmail),
        slackField("Country", data.country),
        slackField("Employee count", data.employeeCount),
        slackField("Branches", data.branchCount),
        slackField("Departments", data.departmentCount),
      ]),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unhandled error in /api/forms/signup:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
