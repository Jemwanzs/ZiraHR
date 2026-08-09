import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client, built from the service-role key — see
 * docs/06-technical/supabase.md. Never import this from a Client Component;
 * the `server-only` import above turns any accidental client-bundle
 * inclusion into a build error rather than a leaked secret.
 */
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set — see .env.example",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
