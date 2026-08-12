import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

/**
 * Default social-share preview image for every page (unless a specific
 * route later supplies its own opengraph-image) — see
 * docs/05-seo/structured-data.md. Generated server-side from the SHR mark
 * geometry (kept in sync with Logo.tsx/PlaceholderIcon's brand colors)
 * rather than a real screenshot, so sharing a link never shows a blank/
 * default preview card.
 */
export default async function Image({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          backgroundColor: "#0B4F6C",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(242,153,74,0.35), transparent 45%), radial-gradient(circle at 10% 90%, rgba(63,169,245,0.25), transparent 45%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: 18,
              backgroundColor: "rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: 30,
              fontWeight: 700,
              alignItems: "center",
              justifyContent: "center",
              letterSpacing: -1,
            }}
          >
            SHR
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#fff" }}>
            SoftHR
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#fff",
            maxWidth: 920,
          }}
        >
          {t("headline")}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 820,
          }}
        >
          {t("eyebrow")}
        </div>
      </div>
    ),
    { ...size },
  );
}
