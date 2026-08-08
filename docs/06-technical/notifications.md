# Notifications (Slack)

## Purpose

You confirmed Slack notifications for signup requests and demo requests during kickoff. Extended here to contact form submissions too, for consistency (not newsletter signups — too high-volume/low-urgency to page a channel for).

## Mechanism

Slack **Incoming Webhooks** — one webhook URL per notification target, called server-side from the same Route Handler that performs the Supabase insert, *after* the insert succeeds.

```
src/lib/slack.ts → notifySlack(webhookUrl, message)
```

- Best-effort: a Slack failure is logged server-side but never fails the form submission or surfaces an error to the visitor — the lead is already safely in Supabase regardless of Slack's availability.
- Message format: short, scannable Slack Block Kit message (who, what, key fields, link to nothing sensitive — no PII beyond what's needed to act on the lead, e.g. name/company/email/modules for a demo request).

## Environment variables (values supplied by you)

```
SLACK_WEBHOOK_DEMO_REQUESTS=
SLACK_WEBHOOK_SIGNUP=
SLACK_WEBHOOK_CONTACT=   (optional — falls back to not notifying if unset, rather than erroring)
```

If a given webhook env var is unset, that notification path is skipped silently (treated as "not configured yet"), so partial rollout (e.g. demo requests wired before signup) doesn't break anything.

## What is explicitly not built

No Slack **App**/bot, no OAuth, no interactive Slack messages (buttons to approve/reject a lead from Slack) — plain incoming-webhook notifications only, matching the actual stated need. If richer Slack interaction is wanted later, that's a deliberate scope addition, not an assumption baked in now.
