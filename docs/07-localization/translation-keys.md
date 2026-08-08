# Translation Keys

## Namespace convention

One top-level namespace per nav section / page / shared concern, dot-nested for sub-values. Mirrors the section breakdown in `04-content/homepage-copy.md` and the route table in `06-technical/routing.md` — a translator (or future contributor) should be able to guess a key's meaning from its name alone.

```
common.*            — shared strings (buttons, generic labels)
nav.*                — nav bar labels (nav.platform, nav.solutions, nav.payroll, nav.resources, nav.pricing, nav.company)
nav.megaMenu.*       — mega menu column/item labels, namespaced by group (nav.megaMenu.coreHr.employeeDirectory, ...)
languageSelector.*   — languageSelector.switchTo.en / .fr / .sw (the accessible labels)
cta.*                — cta.startWithZiraHR, cta.requestDemo, cta.login
hero.*               — hero.eyebrow, hero.headline, hero.supporting
employeeJourney.*     — employeeJourney.intro, employeeJourney.stages.applicant ... .offboarding
connectedRecord.*
moduleShowcase.*      — moduleShowcase.coreHr.headline, moduleShowcase.payroll.headline, ...
ess.*
flexibility.*
approvals.*
askTija.*             — askTija.headline, askTija.positioning, askTija.prompts.contractsExpiring, ...
dashboards.*
multiRegion.*
security.*
customerProof.*
finalCta.*
pages.payroll.*       — per-page namespaces for each module/SEO page (pages.payroll.headline, pages.payroll.sections.*)
pages.leaveManagement.* / pages.attendanceManagement.* / pages.coreHr.* / pages.recruitment.* / pages.performanceManagement.* / pages.learningDevelopment.* / pages.teamsCollaboration.* / pages.employeeSelfService.* / pages.analytics.* / pages.askTija.*
pages.hrSoftwareKenya.* / pages.payrollSoftwareKenya.* / pages.hrmisKenya.* / pages.hrSoftwareAfrica.*
forms.demoRequest.*   — field labels, validation messages, success state
forms.signup.*        — per-step labels
forms.contact.*
forms.newsletter.*
footer.*
legal.*
```

## Rules

- English (`en.json`) is authored first and is the schema — French/Swahili files must contain exactly the same key set (a lint/build check compares key sets and fails on mismatch, added in Phase 2 scaffold).
- No string concatenation of translated fragments (e.g. never `t('hero.part1') + name + t('hero.part2')`) — use ICU message syntax with placeholders (`t('hero.greeting', { name })`) so word order can differ correctly across languages.
- Pluralization uses ICU plural rules via `next-intl`, not manual `count === 1 ? ... : ...` branching in components.
- Placeholder (untranslated) values during development are prefixed (`[FR]`, `[SW]`) specifically so they're greppable — a pre-launch check greps for these prefixes to confirm no placeholder text ships to production.
