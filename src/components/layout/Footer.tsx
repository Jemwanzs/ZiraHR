import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { CookiePreferencesLink } from "@/components/cookie-consent/CookiePreferencesLink";
import { Logo } from "@/components/ui/Logo";
import { FooterSocialLinks } from "@/components/layout/FooterSocialLinks";
import { PHONE_NUMBER_DISPLAY, PHONE_NUMBER_TEL } from "@/components/navigation/navData";
import { PhoneIcon } from "@/components/navigation/PhoneIcon";

const PRODUCT_LINKS = [
  { key: "coreHr", href: "/core-hr" },
  { key: "payroll", href: "/payroll" },
  { key: "leave", href: "/leave-management" },
  { key: "attendance", href: "/attendance-management" },
  { key: "performance", href: "/performance-management" },
  { key: "recruitment", href: "/recruitment" },
  { key: "learningDevelopment", href: "/learning-development" },
  { key: "teams", href: "/teams-collaboration" },
  { key: "ess", href: "/employee-self-service" },
  { key: "analytics", href: "/analytics" },
  { key: "askTija", href: "/ask-tija" },
] as const;

const SOLUTIONS_LINKS = [
  { key: "hrTeams", href: "/core-hr" },
  { key: "financeTeams", href: "/payroll" },
  { key: "executives", href: "/analytics" },
  { key: "managers", href: "/performance-management" },
  { key: "employees", href: "/employee-self-service" },
] as const;

// Blog/Guides/Templates/Product Updates don't have dedicated routes yet —
// all point at the /resources index until Phase 7 builds them out
// (docs/06-technical/architecture.md, Phase 7).
const RESOURCES_LINKS = [
  { key: "blog", href: "/resources" },
  { key: "guides", href: "/resources" },
  { key: "templates", href: "/resources" },
  { key: "helpCentre", href: "/resources" },
  { key: "productUpdates", href: "/resources" },
] as const;

// Careers/Partners don't have dedicated routes yet — point at /company
// until there's real content to justify a separate page.
const COMPANY_LINKS = [
  { key: "about", href: "/company" },
  { key: "contact", href: "/contact" },
  { key: "careers", href: "/company" },
  { key: "partners", href: "/company" },
] as const;

const LEGAL_LINKS = [
  { key: "privacy", href: "/legal/privacy" },
  { key: "terms", href: "/legal/terms" },
  { key: "security", href: "/legal/security" },
  { key: "cookies", href: "/legal/cookies" },
] as const;

function FooterColumn({
  title,
  links,
  translateLabel,
}: {
  title: string;
  links: ReadonlyArray<{ key: string; href: string }>;
  translateLabel: (key: string) => string;
}) {
  return (
    <div>
      {/* Fixed amber, not the theme-flipping --color-orange-deep — this
          panel is permanently dark regardless of site theme, same
          reasoning as SectionLabel's tone="dark" variant. */}
      <p className="mb-4 text-sm font-semibold text-[#FBB768]">{title}</p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.key}>
            <Link href={link.href} className="text-sm text-overlay/75 hover:text-overlay">
              {translateLabel(link.key)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Composed footer (logo/tagline, categorized link columns, contact and
 * social blocks, bottom legal bar) — restyled onto SoftHR's own dark-teal
 * brand panel and copy, adapted from a reference layout the client sent
 * over. Legal links live in the bottom bar rather than their own column,
 * matching that reference (and freeing a column for Contact/Follow).
 */
export function Footer() {
  const t = useTranslations("footer");
  const tColumns = useTranslations("footer.columns");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-teal text-overlay">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-10 py-16 sm:grid-cols-3 lg:grid-cols-7">
        <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:col-span-1">
          <Logo tone="light" />
          <p className="max-w-[220px] text-sm text-overlay/70">{t("tagline")}</p>
        </div>
        <FooterColumn
          title={tColumns("product.title")}
          links={PRODUCT_LINKS}
          translateLabel={(key) => tColumns(`product.${key}`)}
        />
        <FooterColumn
          title={tColumns("solutions.title")}
          links={SOLUTIONS_LINKS}
          translateLabel={(key) => tColumns(`solutions.${key}`)}
        />
        <FooterColumn
          title={tColumns("resources.title")}
          links={RESOURCES_LINKS}
          translateLabel={(key) => tColumns(`resources.${key}`)}
        />
        <FooterColumn
          title={tColumns("company.title")}
          links={COMPANY_LINKS}
          translateLabel={(key) => tColumns(`company.${key}`)}
        />
        <div>
          <p className="mb-4 text-sm font-semibold text-[#FBB768]">{t("contactTitle")}</p>
          <a
            href={`tel:${PHONE_NUMBER_TEL}`}
            className="flex items-center gap-2 text-sm text-overlay/75 hover:text-overlay"
          >
            <PhoneIcon className="h-4 w-4 shrink-0" />
            {PHONE_NUMBER_DISPLAY}
          </a>
          <Link
            href="/contact"
            className="mt-3 inline-block text-sm text-overlay/75 hover:text-overlay"
          >
            {t("contactCta")}
          </Link>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold text-[#FBB768]">{t("followTitle")}</p>
          <FooterSocialLinks />
        </div>
      </Container>

      {/* pb-24 on mobile reserves space for StickyMobileCta (fixed, ~80px
          tall) so this row can never end up permanently trapped beneath it
          with no further scroll room to reveal it. */}
      <div className="border-t border-overlay/10 py-6 pb-24 lg:pb-6">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="text-sm text-overlay/60">{t("copyright", { year })}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-overlay/70">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.key} href={link.href} className="hover:text-overlay">
                {tColumns(`legal.${link.key}`)}
              </Link>
            ))}
            <CookiePreferencesLink />
          </div>
        </Container>
      </div>
    </footer>
  );
}
