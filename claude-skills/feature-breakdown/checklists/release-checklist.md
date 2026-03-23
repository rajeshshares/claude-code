# Release Checklist — Codepup Feature

Run this checklist before any feature goes to production. Every unchecked item
is a known risk — document why you're shipping with it open, not just skip it.

---

## Gate 1 — PRD Sign-off (before engineering starts)

- [ ] PRD has been reviewed by Engineering lead
- [ ] PRD has been reviewed by Design
- [ ] All "Open Questions" in the PRD are resolved or explicitly deferred
- [ ] Success metrics are agreed and a dashboard/chart exists to track them
- [ ] Out of scope items are confirmed with stakeholders (not just written down)

**Who signs off:** PM + Eng Lead + Design Lead
**Blocker:** Do not start sprint if this gate is not cleared.

---

## Gate 2 — Design Handoff (before frontend build)

- [ ] Figma specs cover all states: empty, loading, success, error, edge cases
- [ ] Mobile viewport (375px) is designed, not just desktop
- [ ] Dark mode / light mode handled (if applicable)
- [ ] Accessibility: contrast ratios pass WCAG AA (4.5:1 for body, 3:1 for large text)
- [ ] Copy has been reviewed — no placeholder text in handoff
- [ ] Interactions and transitions are specified (or explicitly left to eng discretion)

**Who signs off:** Design Lead + PM
**Blocker:** Frontend should not start without this — it doubles rework.

---

## Gate 3 — Code Review (before merge to main)

- [ ] All must-have user stories have corresponding test coverage
- [ ] No new console errors or warnings in browser dev tools
- [ ] No TypeScript errors (or errors are justified with a comment)
- [ ] API endpoints have input validation (no raw user input to DB)
- [ ] No hardcoded secrets, API keys, or environment-specific URLs
- [ ] Database migrations are reversible (down migration exists)
- [ ] New dependencies are approved (no abandoned packages, no GPL-licensed libs)

**Who signs off:** Eng peer reviewer
**Blocker:** Do not merge without at least one peer review approval.

---

## Gate 4 — QA Sign-off (before feature flag on in staging)

Pull the QA checklist from the PRD and run it fully. Then also verify:

**Regression**
- [ ] Adjacent features are not broken (manual smoke test)
- [ ] Existing user data is unaffected (no silent data migrations)
- [ ] API versioning: no breaking changes to existing clients

**Performance**
- [ ] Largest Contentful Paint < 2.5s on staging (throttled to Fast 3G)
- [ ] No new N+1 queries (check slow query log)
- [ ] Bundle size increase is within budget (< 10KB gzipped for new JS)

**Security**
- [ ] User can only access their own data (authorization check, not just authentication)
- [ ] File uploads are validated (type, size, virus scan if applicable)
- [ ] New endpoints are rate-limited
- [ ] CSRF protection on any state-changing endpoints

**Analytics**
- [ ] All events from the PRD fire correctly in a staging walkthrough
- [ ] No PII in any event property
- [ ] No duplicate events on any single user action

**Who signs off:** QA + PM
**Blocker:** Feature flag stays off until QA signs off.

---

## Gate 5 — Launch Readiness (before feature flag on in production)

- [ ] Rollback plan documented (how do we turn this off in < 5 minutes?)
- [ ] Feature flag is scoped to a test segment first (not 100% rollout)
- [ ] On-call engineer is aware this is shipping today
- [ ] Monitoring alerts are set up for error rate spike on new endpoints
- [ ] Customer-facing changelog / announcement is drafted (if user-visible)
- [ ] Support team has been briefed on the feature (not surprised by tickets)

**Who signs off:** PM + Eng Lead
**Blocker:** No 100% rollout without this gate cleared.

---

## Gate 6 — Post-Launch (within 7 days of full rollout)

- [ ] Success metrics are tracking in the right direction (or incident opened)
- [ ] No P0/P1 bugs open related to this feature
- [ ] Support ticket volume is within expected range
- [ ] Analytics events are populating the success metrics dashboard
- [ ] Retrospective scheduled (what went well, what to improve in next release)

**Who runs this:** PM
**Output:** Feature is either marked Shipped (healthy) or Incident opened (degraded).

---

## Quick Reference — Severity Levels

| Level | Definition | Response time |
|-------|------------|---------------|
| P0 | Feature is completely broken for all users | Fix now, < 1 hour |
| P1 | Feature is broken for a segment or has data risk | Fix today |
| P2 | Feature works but UX is significantly degraded | Fix this sprint |
| P3 | Minor issue, workaround exists | Backlog |

---

## What to Do When You Can't Clear a Gate

1. Document the risk explicitly — "We are shipping with Gate 3 item X open because Y"
2. Create a follow-up ticket with a due date — not "eventually"
3. Get sign-off from the relevant owner (PM for scope, Eng Lead for tech debt, Design for UX)
4. Set a reminder to close the ticket — open risks left open become incidents
