import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Best-effort client IP extraction for rate-limit keying. Vercel sets
 * x-forwarded-for on every request; this is not a source of truth for
 * identity (trivially spoofable off-platform) but is fine for throttling.
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Postgres-backed rate limit check — see
 * supabase/migrations/20260809000005_rate_limits.sql and
 * docs/06-technical/security.md. Fails open on a DB error: a broken rate
 * limiter shouldn't take down legitimate form submissions.
 */
export async function checkRateLimit(
  key: string,
  { maxRequests, windowSeconds }: { maxRequests: number; windowSeconds: number },
): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.rpc("check_rate_limit", {
    p_key: key,
    p_max_requests: maxRequests,
    p_window_seconds: windowSeconds,
  });

  if (error) {
    console.error("Rate limit check failed:", error);
    return true;
  }

  return data as boolean;
}
