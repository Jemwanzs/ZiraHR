import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

/**
 * Next.js 16 renamed the middleware.ts convention to proxy.ts (see
 * docs/06-technical/architecture.md). next-intl's createMiddleware still
 * returns a plain (request) => response function, so it slots in unchanged
 * under the new export name.
 */
export function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  // Skip API routes, static assets, and metadata routes. A generic
  // dot-extension exclusion pattern (e.g. ".*\\..*") does not reliably
  // exclude sitemap.xml/robots.txt at runtime under Next 16 — confirmed by
  // testing (they 404'd because the proxy still rewrote them into locale
  // space). Naming them explicitly matches Next's own documented example.
  matcher: [
    "/((?!api|_next|_vercel|favicon.ico|sitemap.xml|robots.txt|.*\\.[\\w]+$).*)",
  ],
};
