import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Real product screenshots/mockups are self-hosted under /public — no
    // remote image domains are needed yet. Add remotePatterns here if a
    // remote asset source (e.g. a CMS) is introduced later.
    formats: ["image/avif", "image/webp"],
  },
  // Baseline security headers — see docs/06-technical/security.md. A full
  // Content-Security-Policy is deliberately NOT included here: getting one
  // right without breaking Next's hydration/RSC inline scripts needs a
  // nonce-based setup that requires live cross-page testing to verify
  // safely, which this pass didn't have room for — flagged as a follow-up
  // rather than shipped half-verified.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
