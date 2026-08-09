import "server-only";

/**
 * Best-effort Slack Incoming Webhook notifier — see
 * docs/06-technical/notifications.md. A Slack failure is logged but never
 * fails the form submission (the lead is already safely in Supabase by the
 * time this runs). If the relevant env var is unset, the notification is
 * silently skipped rather than treated as an error.
 */
export async function notifySlack(
  webhookUrl: string | undefined,
  blocks: Array<Record<string, unknown>>,
) {
  if (!webhookUrl) return;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks }),
    });

    if (!response.ok) {
      console.error(
        `Slack webhook responded with ${response.status}: ${await response.text()}`,
      );
    }
  } catch (error) {
    console.error("Slack webhook notification failed:", error);
  }
}

export function slackField(label: string, value: string) {
  return `*${label}:*\n${value || "—"}`;
}

export function slackSection(fields: string[]) {
  return {
    type: "section",
    fields: fields.map((text) => ({ type: "mrkdwn", text })),
  };
}

export function slackHeader(text: string) {
  return { type: "header", text: { type: "plain_text", text } };
}
