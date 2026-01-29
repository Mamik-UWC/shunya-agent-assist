# Requirements Analysis & Frontend Architecture Clarifications

## Purpose

This document lists **clarification questions that are not already answered** in:

- **BRD**: [Agent Assist and Performance Dashboard BRD.pdf](Agent%20Assist%20and%20Performance%20Dashboard%20BRD.pdf) — business and functional requirements, agent/manager experience, onboarding, failure handling.
- **Technical Documentation**: [Agent-Assist-Platform-Documentation.pdf](Agent-Assist-Platform-Documentation.pdf) — system architecture, tech stack, data flows, WebSocket events, screen layouts, RBAC, feature toggles, embed config.

Use this list to resolve **gaps and edge cases** that affect **frontend system architecture**. Do not re-ask what the BRD or Technical Doc already define.

**Context:** The platform is planned to be open-source in the future; documentation and architecture decisions should remain clear and maintainable for external contributors.

---

## Already Defined

### From BRD

| Topic | Defined behavior |
|-------|------------------|
| Deployment | Embedded (opens on call; screen or floating widget) + Standalone; dependency on client CRM/telephony. |
| Agent UI | No live transcript to agent; minimal UI; intent in 3–5s; sentiment (customer + agent); SOP flow; next-best-action; compliance; upsell prompts; Chat Assistant (SOP/KB/Governance). |
| Repeat caller | Last call summary + previous resolution, within first few seconds. |
| Post-call | Full transcript; structured summary (≤15s); ticket draft if enabled; agent views summary, key moments, ticket. |
| Manager | Overview (sessions, sentiment, CSAT, intent, leaderboard, SOP adherence, compliance, upsell); Agent Performance; Sessions with tabs (Overview, Sentiment, Performance, Insights); Advanced Intelligence; Live Floor (agent, duration, intent, sentiment, risk, compliance, upsell). |
| Failure handling | Telephony fallback; missing SOP → clear messaging; low-confidence intent → "Unclear"; AI degraded → disable live prompts, continue recording, preserve post-call. |
| Onboarding | Registration, org profile, documents (version, process/queue/language), intent (upload or Shunya-generated + approve), feature selection, dashboard field config, webhooks (agent acceptance configurable), retention; audit-logged; Client Admin only (no sub-roles). |

### From Technical Documentation

| Topic | Defined behavior |
|-------|------------------|
| Stack | Next.js 15+, React 19+, TypeScript, Tailwind, Zustand, TanStack Query, Socket.io, Recharts, React Hook Form, Zod; pnpm; frontend never calls DS/AI directly. |
| Apps | agent-ui, manager-dashboard, admin-portal; monorepo with shared packages (ui, api-client, hooks, types). |
| Agent UI data | Intent Badge (WebSocket `intent.updated` 3–5s); Sentiment Gauges (`sentiment.updated` 5s, -1 to +1); SOP (`guidance.updated`); Chat (REST `POST /chat/message`); Repeat Caller (REST `GET /sessions?customer_id=`). |
| Manager | Overview from TimescaleDB (5 min cache); Floor from Redis + WebSocket `floor.update`; risk levels Critical/Warning/Normal with conditions. |
| Screen layouts | Agent Live Call (header, intent, sentiment, SOP, Chat); Manager Overview (metric cards, call volume, intent breakdown, recent alerts); Floor (cards: agent, duration, queue, intent, sentiment, risk). |
| WebSocket events | `call.started/ended`, `transcript.chunk`, `intent.updated`, `sentiment.updated`, `guidance.updated`, `coaching.prompt`, `alert.*`, `floor.update`. |
| Auth | Clerk; JWT; role in `publicMetadata`; RBAC matrix; protected routes. |
| Embed config | `embed_type` (iframe \| widget), `trigger` (call_event \| manual), `position` (right \| left \| floating), `dimensions`, `auth_method` (jwt_passthrough \| sso_redirect). |
| Feature toggles | Listed (transcription, intent_detection, sentiment_analysis, sop_guidance, chat_assistant, upsell_nudges, floor_view, etc.) with effect when disabled. |
| Error handling | 401 → sign-in; 403 → toast; WebSocket reconnect; offline banner. |
| Data structures | Session (transcript, summary, insights); document processing status flow; retention defaults and configurable ranges. |

---

## Frontend Architecture–Critical Questions

**Priority key:** **P0** = blocks architecture/design decisions · **P1** = refines UX/edge cases · **P2** = nice-to-have

---

### 1. Embedded Integration & Contract

- **A1** [P0] How does the CRM pass `call_id`, `agent_id`, and (if any) `customer_id` into the embedded Agent UI (e.g. postMessage, URL params, SDK callback)? Single origin per tenant or multi-tenant URL pattern?
- **A2** [P0] For the embedded widget: is the "call landed" event pushed by the parent (CRM) to the iframe/widget, or does the widget poll/query an API that the CRM updates?

### 2. Intent, Sentiment & Overrides

- **A3** [P0] Does the system support **multiple simultaneous intents** (e.g. "Billing + Escalation") for display, or only a single primary intent? Affects IntentBadge/component API and WebSocket payload handling.
- **A4** [P1] Can agents **override/correct** the detected intent (or sentiment) in the UI, and if so, does that correction feed back to the backend (e.g. for model tuning or session metadata)? Affects UI controls and API contract.

### 3. Real-Time & Reconnection

- **A5** [P0] On WebSocket **reconnect** (e.g. after network blip), does the backend **replay** missed events for the active call, or does the frontend only receive **current state** (and if so, is there a REST or WebSocket message to fetch "current call state")? Affects store design and recovery UX.
- **A6** [P1] For Manager: if WebSocket is unavailable, is there a **polling fallback** for floor view and alerts, and at what interval?

### 4. Post-Call & Navigation

- **A7** [P0] After `call.ended`, does the Agent UI **navigate to a dedicated post-call route** (e.g. `/summary/[sessionId]`) and load summary when ready, or **stay on the same view** and show summary in-place? Affects routing and loading states.
- **A8** [P1] If the agent navigates away (or closes the tab) before the 15s summary is ready, how can they access the summary later (e.g. from a "Recent sessions" list)? Affects entry points and deep links.

### 5. Feature Flags & UI Boundaries

- **A9** [P0] When a feature is **disabled** (e.g. `upsell_nudges`, `sop_guidance`), should the UI **hide** the corresponding component entirely, or show a disabled/empty state? Affects conditional layout and feature-boundary components.
- **A10** [P0] Are feature flags **evaluated at runtime** per session/tenant (e.g. from backend or tenant config), or only at build time? Affects how we gate routes and components.

### 6. Dashboard & Manager UX

- **A11** [P1] Is the Manager **Overview layout** (widget order, which widgets are visible) **configurable per user or per org**, and if so, where is that layout persisted (backend per user, local storage, or not in Phase 1)?
- **A12** [P0] **Export**: Which export formats are **required for Phase 1** (CSV, PDF, Excel) for sessions, analytics, and reports? Affects BFF/API and frontend export flows.

### 7. Scale & Performance

- **A13** [P0] **Floor view**: What is the **maximum number of concurrent active calls per org** we must support in the floor view? Affects virtualization, pagination, and WebSocket payload strategy.
- **A14** [P1] **Session list**: Is there a **max date range** or **result cap** for session list/search (e.g. last 90 days, 10k results)? Affects pagination and API design.

### 8. Concurrency & Conflicts

- **A15** [P1] If **two admins** edit the same org configuration (e.g. feature flags, dashboard fields) at the same time, is the behavior **last-write-wins** or is there **conflict detection/merge**? Affects optimistic updates and error handling.
- **A16** [P1] If **configuration changes** (e.g. feature disabled, intent list updated) are applied while an **active call** is in progress, should the Agent UI update in real time (e.g. via WebSocket or refetch), or only on next call? Affects subscription and feature-flag freshness.

### 9. Auth & Session Lifecycle

- **A17** [P0] If the agent's **auth token expires mid-call**, should the frontend **refresh silently** (e.g. Clerk refresh) and keep the call state, or show re-auth and potentially lose live state? Affects token refresh strategy and error boundaries.
- **A18** [P0] In **embedded mode**, how is **agent identity** established — only via JWT from CRM, or does the widget also need to call our backend to resolve user/org? Affects auth flow and tenant resolution.

### 10. Repeat Caller & Identity

- **A19** [P1] When **customer phone is masked or unavailable** from telephony, is repeat-caller context **only** keyed by CRM-supplied `customer_id` (or similar), or is there another fallback (e.g. session cookie, account number)? Affects when we show "repeat caller" and what we request from CRM.

### 11. Accessibility & Internationalization

- **A20** [P1] What **WCAG level** (A, AA, AAA) is required for Agent, Manager, and Admin UIs in Phase 1? Affects component choices and testing.
- **A21** [P1] Which **UI languages** (not just transcription) are in scope for Phase 1, and is **RTL** support required? Affects layout and i18n setup.
- **A22** [P2] Is **date/time/number formatting** (e.g. locale) driven by org setting, user preference, or browser? Affects formatting utilities and tenant config.

### 12. Device & Viewport

- **A23** [P0] What is the **minimum supported viewport** (e.g. 1280×720) for Agent and Manager? Affects responsive breakpoints and layout.
- **A24** [P0] Is **tablet or mobile** access required for **agents** or **managers** in Phase 1, or desktop-only? Affects layout and touch/pointer handling.

### 13. Admin Portal Specifics

- **A25** [P0] Is the **admin portal** served from the **same Next.js app** as Manager (with route guards) or a **separate deployment** (e.g. subdomain, separate app)? Affects routing and deployment topology.
- **A26** [P1] For **bulk user upload** (e.g. CSV): what is the **max rows** and **error handling** (full rollback vs partial success with error report)? Affects UI flow and API design.

---

## 7. Task Breakdown & Deliverables

### 7.1 Requirements Review & Analysis (0.5 units)

**Activities:**
- Review both uploaded documents thoroughly
- Cross-reference BRD requirements with Technical Documentation
- Identify conflicting requirements or ambiguities
- Create consolidated requirements matrix
- Flag missing information and critical gaps

**Deliverable:**
- Requirements analysis summary document
- Conflicts and gap analysis
- Prioritized clarification question list

### 7.2 Agent User Journey Design (1 unit)

**Activities:**
- Map complete agent call lifecycle (pre-call → during → post-call)
- Document all UI states and transitions
- Define interaction patterns for each component (intent, sentiment, SOP, chat)
- Create error/degraded state flows
- Document embedded vs standalone mode differences

**Deliverables:**
- Agent user journey map (visual)
- State transition diagram
- Interaction specification document
- Error handling flowcharts
- Embedded mode integration guide

### 7.3 Manager User Journey Design (1 unit)

**Activities:**
- Map dashboard navigation flows (Overview → Agents → Sessions → Floor)
- Document all filter and drill-down interactions
- Define real-time update behaviors for floor view
- Create session detail navigation flows
- Document analytics and reporting workflows

**Deliverables:**
- Manager user journey map (visual)
- Dashboard navigation flowchart
- Floor view interaction specification
- Session detail workflow diagram
- Analytics workflow documentation

### 7.4 Admin User Journey Design (1 unit)

**Activities:**
- Map complete onboarding workflow
- Document knowledge/document management flows
- Define intent configuration workflows (upload & AI-generated paths)
- Create feature configuration and webhook setup flows
- Document user management and ongoing admin tasks

**Deliverables:**
- Admin user journey map (visual)
- Onboarding workflow diagram
- Document management flowchart
- Intent configuration decision tree
- Feature & webhook configuration guide

### 7.5 User Journey Documentation & Diagrams (0.5 units)

**Activities:**
- Consolidate all journey maps into unified documentation
- Create cross-journey interaction diagrams
- Document data flow across user types
- Create comprehensive state diagrams
- Finalize all visual deliverables

**Deliverables:**
- Master user journey documentation
- Unified state diagram (all user types)
- Cross-journey interaction matrix
- Data flow diagrams
- Final presentation deck

### 7.6 Buffer (0.25 units)

**Purpose:**
- Address clarification questions that arise
- Refine documentation based on feedback
- Handle scope adjustments
- Complete any overflow work

---

## 8. Critical Success Criteria

### 8.1 Documentation Quality

**Must Have:**
- Complete coverage of all three user types (agent, manager, admin)
- Clear visual representations (journey maps, flowcharts, diagrams)
- Documented error and edge case handling
- Cross-references to technical architecture
- Stakeholder review and approval

### 8.2 Journey Completeness

**Must Cover:**
- All major workflows and user tasks
- State transitions and triggers
- UI interactions and expected outcomes
- Real-time vs batch operations
- Error states and recovery paths

### 8.3 Clarification Outcomes

**Expected Results:**
- All critical questions answered before design work begins
- Business logic gaps filled
- UI/UX specifications confirmed
- Integration points clarified
- Performance and scale expectations defined

---

## 9. Risk Mitigation

### Identified Risks

**R1: Incomplete Requirements**
- Mitigation: Comprehensive question list submitted early
- Fallback: Document assumptions clearly for review

**R2: Conflicting Information**
- Mitigation: Create conflicts matrix for stakeholder resolution
- Fallback: Propose design decision recommendations

**R3: Scope Creep**
- Mitigation: Clear scope boundary definition
- Fallback: Phase 2 parking lot for additional features

**R4: Technical Feasibility**
- Mitigation: Cross-reference with tech architecture doc
- Fallback: Flag technical constraints for engineering review

---

## 10. Questions for Immediate Clarification

These are the top questions that are **not** already answered in the BRD or Technical Documentation and should be resolved before starting frontend architecture and design.

### P0 (Must Answer Before Starting)

1. **Embedded contract (A1–A2)**: How does the CRM pass call/agent/customer context into the embedded Agent UI, and who triggers "call landed" (parent push vs widget poll)?
2. **Intent model (A3)**: Single primary intent only, or multiple simultaneous intents for display?
3. **WebSocket reconnection (A5)**: Replay missed events vs fetch current state only — and how?
4. **Post-call navigation (A7)**: Dedicated route (e.g. `/summary/[id]`) vs in-place summary?
5. **Feature-flag UI (A9–A10)**: Hide vs disabled/empty when feature off; runtime vs build-time evaluation?
6. **Export formats (A12)**: Which formats (CSV, PDF, Excel) are required for Phase 1 for sessions and reports?
7. **Floor view scale (A13)**: Maximum concurrent active calls per org to support?
8. **Auth mid-call (A17)**: Silent token refresh vs re-auth when token expires during call?
9. **Embedded identity (A18)**: Agent identity from CRM JWT only, or widget must call backend to resolve user/org?
10. **Viewport & device (A23–A24)**: Minimum viewport size; desktop-only or tablet/mobile in Phase 1?
11. **Admin deployment (A25)**: Admin portal same Next.js app (route guards) or separate deployment?

### P1 (Should Answer Within First Week)

12. **Manager Overview layout (A11)**: Configurable per user/org in Phase 1, and where persisted?
13. **Session list limits (A14)**: Max date range or result cap for session search?
14. **Repeat caller key (A19)**: When phone is masked, is context keyed only by CRM `customer_id` or other fallback?
15. **Accessibility & i18n (A20–A21)**: WCAG level; UI languages and RTL in Phase 1?
16. **Bulk user upload (A26)**: Max rows and error handling (rollback vs partial success with report)?

---

**Document Version**: 2.0  
**Date**: January 28, 2026  
**Status**: Consolidated; aligned with BRD and Technical Documentation  
**Next Steps**: Submit architecture-critical questions (Section "Frontend Architecture–Critical Questions") to stakeholders; use "Questions for Immediate Clarification" for prioritised follow-up.
