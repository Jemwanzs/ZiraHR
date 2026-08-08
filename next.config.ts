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
};

export default withNextIntl(nextConfig);
