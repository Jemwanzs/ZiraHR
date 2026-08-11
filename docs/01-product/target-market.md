# Target Market

## Primary market

Kenya — first launch market, primary SEO focus, primary statutory-compliance depth (PAYE, NSSF, SHIF, Housing Levy).

## Expansion trajectory

Designed from day one to support expansion across Africa. This shapes technical decisions now, even though only Kenya content ships first:

- Route structure supports country-specific product/payroll pages (`/hr-software-africa` today; future `/payroll-software-<country>` pages) without restructuring.
- Locale architecture (English/French/Swahili) is chosen partly for regional reach — French for Francophone West/Central Africa, Swahili for East Africa — not just Kenya.
- Statutory/payroll copy is written to be explicit about which country it applies to, so it doesn't need retrofitting when a second country ships. Never write country-specific claims generically ("compliant with local regulations") — name the country and the actual scheme.

## What this means for content

- Every country-specific SEO page must have genuinely unique copy — never a template with the country name swapped in (explicit requirement, scope §33/§19).
- Kenya statutory terms (PAYE, NSSF, SHIF, Housing Levy) are used precisely and only where SoftHR actually supports them — no generic "compliance" hand-waving.
- Currency, date, and number formatting should be locale-aware from the start (`Intl` APIs), even while only Kenya (KES) ships.

## Buyer segments (from footer "Solutions" + nav structure)

HR Teams, Finance Teams, Executives, Managers, Employees — each gets a distinct entry point in navigation/footer, though the homepage narrative stays unified rather than forking by segment.
