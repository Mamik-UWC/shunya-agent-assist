# Requirements Analysis: Page Structure, Wireframes & Design System

## Purpose

This document contains **clarification questions for Tasks 1.2-1.4** that are **not already answered** in:

- **BRD**: [Agent Assist and Performance Dashboard BRD.pdf](Agent%20Assist%20and%20Performance%20Dashboard%20BRD.pdf)
- **Technical Documentation**: [Agent-Assist-Platform-Documentation.pdf](Agent-Assist-Platform-Documentation.pdf)
- **Architecture Documentation**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Admin Journey Design**: [admin_user_journey_design.md](admin_user_journey_design.md)

**Scope:** Questions relevant to:
- **Task 1.2**: Page Structure & Route Definition (3 units)
- **Task 1.3**: Wireframes & UI Mockups (4 units)
- **Task 1.4**: Design System & Component Requirements (2 units)

---

## Already Defined in Documentation & Answers

### Answers Provided

- **Monorepo**: All projects (agent-ui, manager-dashboard, admin-portal) in same Next.js monorepo
- **Manager Landing**: Default route is `/manager/overview`
- **Live Call Layout**: Multi-column grid (e.g., left: SOP/Chat, right: Intent/Sentiment)
- **Component Visibility**: Disabled features are hidden entirely (collapsing layout)
- **Chat Assistant**: Always visible (sidebar/panel)
- **Manager Overview**: Fixed layout for all users/orgs
- **Floor View**: Cards (removed design question)
- **Sessions**: Tabs for Overview, Sentiment, Performance, Insights
- **Admin Dashboard**: Structure defined (removed design question)

### Design Tokens (from Technical Documentation)

- **Stack**: Tailwind CSS, shadcn/ui components
- **Theme**: CSS variables, dark mode support, white-label ready
- **Icons**: Lucide (used with shadcn/ui)
- **Spacing**: Tailwind defaults (4px base scale)
- **Typography**: Not specified (requires clarification)

---

## Critical Questions

### Page Structure & Routes (Task 1.2)

- **Q1.2.1** [P0] **Post-call navigation**: After call ends, does the Agent UI navigate to a dedicated `/post-call/[sessionId]` route, or stay on `/live-call` and show summary in-place? This affects route structure and loading states.
- **Q1.2.2** [P1] **Deep linking for summaries**: If an agent navigates away before the 15s summary is ready, how do they access it later? Should there be a `/recent-sessions` route or is it accessed from another entry point?

### Wireframes & UI Mockups (Task 1.3)

- **Q1.3.1** [P0] **Floor view scale**: What is the **maximum number of concurrent active calls per org** to support in floor view? This affects virtualization, card size/density, and pagination strategy.
- **Q1.3.2** [P1] **Repeat caller indicator placement**: Where should the "repeat caller" context (last call summary + previous resolution) appear? (e.g., Top banner, dedicated panel, or modal).



**Document Version**: 4.0  
**Date**: January 29, 2026  
**Scope**: Tasks 1.2-1.4  
**Status**: Focused on critical unanswered questions. Layouts and major UI patterns defined.
