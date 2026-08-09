# Product Modules

Canonical module list, grouped exactly as the Platform mega menu groups them. This is the single source of truth for module naming used across navigation, footer, module showcase, and SEO page titles — keep names consistent everywhere.

## Core HR
Employee Directory · Employee Records · Organization Structure · Onboarding · Employee Lifecycle · Documents · ESS

Route: `/core-hr`

## Workforce
Leave Management · Attendance · Shifts & Rosters · Timesheets · Overtime

Routes: `/leave-management`, `/attendance-management`

## Payroll
Payroll Processing · Earnings & Benefits · Deductions · Salary Advance · Payslips · Statutory Compliance (PAYE, NSSF, SHIF, Housing Levy, Reliefs) · Payroll Reports · Disbursements

Route: `/payroll`

## Talent
Recruitment & ATS · Performance Management · Learning & Development

Routes: `/recruitment`, `/performance-management`, `/learning-development`

## Workplace
Teams & Collaboration · Approvals & Workflows · Notifications

Route: `/teams-collaboration`

## Intelligence
Dashboards (Executive, HR, Finance, My Dashboard) · Analytics · Reports · Ask TiJa AI

Routes: `/analytics`, `/ask-tija`

## Security & Governance

Original scope (§22): Roles & Permissions, Data Visibility, MFA, Audit Logs, Approval Workflows, Export Controls, Working-Hour Controls, Geo-fencing, Activity Logs.

**Extended per explicit client direction** (post-launch feedback round, confirmed as real/current capabilities rather than roadmap items — see the "Security claims" decision recorded in this session): Geo-Restricted Login (sign-ins limited to approved locations, not just attendance geo-fencing), Working-Hour Login Validation (sign-ins restricted to configured hours, not just attendance), Approval-Gated Special Access (exceptional access requests reviewed and granted only to the specific requesting user), Encrypted/Passcode-Protected Report Downloads, Direct-to-Email Report Delivery, and Roles & Permissions explicitly described as trickling down per user/department/branch with segregation. Rendered in `SecuritySection` (`src/components/sections/SecuritySection.tsx`) as 9 consolidated label+description cards — some of the original 9 items were merged (e.g. Audit Logs + Activity Logs) to keep the grid from growing past what's readable in one pass, per the "no long lists" direction from the same feedback round.

## Employee Self-Service (ESS)

Cross-cutting — not a standalone nav group, but a major homepage section and its own page (`/employee-self-service`). Employee-facing capabilities: View Profile, Update Details, Download Payslips, Request Leave, Check Leave Balance, View Attendance, View Goals, Complete Learning, Receive Notifications, Access Documents, Follow Approvals.

## Naming discipline

- Use "Ask TiJa" (not "TiJa AI chatbot" or similar) — positioned as workforce intelligence, not a generic assistant.
- Use "ESS" only after first spelling out "Employee Self-Service" on a given page.
- Statutory terms are Kenya-specific and must not be generalized when we add other countries later (see `target-market.md`).
- Do not add modules, sub-features, or automation claims beyond this list without an explicit scope update — this file is the ceiling on what marketing copy is allowed to claim the product does.
