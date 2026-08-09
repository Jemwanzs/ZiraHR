import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { CookiePreferencesLink } from "@/components/cookie-consent/CookiePreferencesLink";

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
      <p className="mb-4 text-sm font-semibold text-gray-900">{title}</p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className="text-sm text-gray-600 hover:text-teal"
            >
              {translateLabel(link.key)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const tColumns = useTranslations("footer.columns");

  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container className="grid grid-cols-2 gap-8 py-16 sm:grid-cols-3 lg:grid-cols-5">
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
        <FooterColumn
          title={tColumns("legal.title")}
          links={LEGAL_LINKS}
          translateLabel={(key) => tColumns(`legal.${key}`)}
        />
      </Container>
      <div className="border-t border-gray-200 py-6">
        <Container className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">{t("tagline")}</p>
          <CookiePreferencesLink />
        </Container>
      </div>
    </footer>
  );
}
