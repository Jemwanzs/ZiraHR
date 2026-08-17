/**
 * Shared between the desktop Platform mega menu and the mobile drawer's
 * accordion — one source of truth for the group/item -> route mapping.
 * See docs/02-ux/website-information-architecture.md for the mapping
 * rationale (each leaf item points at the single dedicated page that
 * actually covers it).
 */
export const PLATFORM_GROUPS = [
  {
    key: "coreHr",
    items: [
      { key: "employeeDirectory", href: "/core-hr" },
      { key: "employeeRecords", href: "/core-hr" },
      { key: "organizationStructure", href: "/core-hr" },
      { key: "onboarding", href: "/core-hr" },
      { key: "employeeLifecycle", href: "/core-hr" },
      { key: "documents", href: "/core-hr" },
      { key: "ess", href: "/employee-self-service" },
    ],
  },
  {
    key: "workforce",
    items: [
      { key: "leaveManagement", href: "/leave-management" },
      { key: "attendance", href: "/attendance-management" },
      { key: "shiftsRosters", href: "/attendance-management" },
      { key: "timesheets", href: "/attendance-management" },
      { key: "overtime", href: "/attendance-management" },
    ],
  },
  {
    key: "payroll",
    items: [
      { key: "payrollProcessing", href: "/payroll" },
      { key: "earningsBenefits", href: "/payroll" },
      { key: "deductions", href: "/payroll" },
      { key: "salaryAdvance", href: "/payroll" },
      { key: "payslips", href: "/payroll" },
      { key: "statutoryCompliance", href: "/payroll" },
      { key: "payrollReports", href: "/payroll" },
      { key: "disbursements", href: "/payroll" },
    ],
  },
  {
    key: "talent",
    items: [
      { key: "recruitmentAts", href: "/recruitment" },
      { key: "performanceManagement", href: "/performance-management" },
      { key: "learningDevelopment", href: "/learning-development" },
    ],
  },
  {
    key: "workplace",
    items: [
      { key: "teamsCollaboration", href: "/teams-collaboration" },
      { key: "approvalsWorkflows", href: "/teams-collaboration" },
      { key: "notifications", href: "/teams-collaboration" },
    ],
  },
  {
    key: "intelligence",
    items: [
      { key: "dashboards", href: "/analytics" },
      { key: "analytics", href: "/analytics" },
      { key: "reports", href: "/analytics" },
      { key: "askTija", href: "/ask-tija" },
    ],
  },
] as const;

export const SOLUTIONS_ITEMS = [
  { key: "hrTeams", href: "/core-hr" },
  { key: "financeTeams", href: "/payroll" },
  { key: "executives", href: "/analytics" },
  { key: "managers", href: "/performance-management" },
  { key: "employees", href: "/employee-self-service" },
] as const;

export const SIMPLE_NAV_LINKS = [
  { key: "payroll", href: "/payroll" },
  { key: "resources", href: "/resources" },
  { key: "pricing", href: "/pricing" },
  { key: "company", href: "/company" },
] as const;

/** Single source of truth for the sales line shown in the nav, the mobile
 * drawer footer, and the floating call CTA — see AGENTS request to surface
 * a phone number sitewide the way M-Gas does in its nav. */
export const PHONE_NUMBER_DISPLAY = "0798 993 404";
export const PHONE_NUMBER_TEL = "+254798993404";
