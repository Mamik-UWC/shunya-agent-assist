**# Admin User Journey Design – Client Admin Portal

Purpose of this document

This document captures our current understanding of the Admin experience for the Agent Assist Platform, based strictly on the provided Technical Documentation and BRD.

Where the source documents are silent or ambiguous, we explicitly call out Assumptions / Needs Clarity instead of inventing behavior.

---

## 1. Admin Role Definition & Scope

### 1.1 Who is an Admin

* Admin = Client Admin (customer-side only)
* No sub-roles under Admin in Phase 1
* Admin has full authority over:

  * Organization configuration
  * Users (Managers & Agents)
  * Knowledge & SOPs
  * Intents
  * Feature enablement
  * Automations & webhooks
  * Data retention policies

Explicitly Out of Scope

* No internal (Shunya-side) admin workflows
* No editor/viewer split

---

## 2. Admin Portal Information Architecture (High Level)

Primary Navigation (Admin Portal)

1. Dashboard (optional / minimal)
2. Users
3. Knowledge & SOPs
4. Intent Configuration
5. Features
6. Automations & Webhooks
7. Data & Retention
8. Audit Logs
9. Settings / Organization Profile

Assumption: Billing is not a full-featured screen in Phase 1 (details below).

---

## 3. Admin Onboarding Journey (Phase 1)

### 3.1 Entry Point

* Admin signs up via /signup (Clerk)
* Organization is created during onboarding

Clarified: Onboarding is primarily for adding Managers and Agents, not deep system setup.

---

### 3.2 Onboarding Flow (Simplified)

Step 1: Organization Profile

* Screen: Organization Setup
* Components:

  * Text inputs: Company Name, Industry
  * Multi-select: Regions, Languages
  * Read-only system fields: Org ID

Actions

* Save & Continue

Needs Clarity: Whether telephony setup is mandatory for activation (not explicitly defined in docs).

---

Step 2: Users (Managers & Agents)

* Screen: User Management
* Components:

  * Table: Existing users

    * Name
    * Email
    * Role (Manager / Agent)
    * Status (Invited / Active / Disabled)
  * Button: Invite User

Invite User Modal

* Inputs:

  * Email
  * Role selector (Manager / Agent)
* CTA:
* Send Invite

Behavior

* Triggers Clerk invite
* User appears as Invited

---

Step 3: Onboarding Complete

* System shows:

  * “Organization setup complete”
  * Users can be added anytime later

Needs Clarity: Whether organization activation is manual or automatic once onboarding completes.

---

## 4. Users Management (Post-Onboarding)

### 4.1 Users Screen

Components

* Users Table
* Filters: Role, Status
* Actions per row:

  * Disable User
  * Re-invite

Assumptions

* No bulk actions in Phase 1
* No role editing after invite (disable + re-invite instead)

---

## 5. Knowledge & SOP Management

### 5.1 Sections (Separated)

* SOPs
* Knowledge Base
* QA Frameworks
* Governance & Guardrails

Explicitly separated sections, not a single mixed document list.

---

### 5.2 Document List Screen

Components

* Table:

  * Document Name
  * Type
  * Process
  * Queue
  * Language
  * Version
  * Status (Processing / Active / Failed / Archived)
* Primary CTA: Upload Document

---

### 5.3 Upload / Update Document Flow

Upload Modal

* File upload (PDF, DOC, DOCX, TXT)
* Metadata selectors:

  * Process
  * Queue / Campaign
  * Language

Actions

* Upload

System Behavior

* Document status = Processing
* DS ingestion triggered
* Admin notified when Active

---

### 5.4 Versioning & Live Call Impact

Design Decision (Explicit)

* Document updates are deferred, not applied mid-call.

Reasoning

* Prevents inconsistent guidance during active calls
* Aligns with best practices for live production systems

Effect

* New versions apply only to new calls

---

## 6. Intent Configuration

### 6.1 Phase 1 Understanding

* Intent configuration exists as a UI in Phase 1
* Intents are pre-configured (confidence thresholds not editable)

Needs Clarity

* Whether Admin can fully edit intent taxonomy post-activation
* Whether edits affect historical analytics

---

### 6.2 Intent Screen

Components

* Intent List Table:

  * Intent Name
  * Description
  * Status (Draft / Active)

Actions

* Upload intent list OR review pre-created intents
* Approve & Activate

---

## 7. Feature Configuration

### 7.1 Scope

* Feature toggles apply per organization (not per queue)
* Changes apply only after ingestion/validation cycle

---

### 7.2 Features Screen

Components

* Feature list with toggle switches:

  * Post-call Transcription
  * Live Intent Detection
  * Sentiment Analysis
  * Agent Chat Assistant
  * Compliance Monitoring
  * Upsell Nudges
  * Manager Dashboards

Actions

* Toggle On / Off
* Save Changes

System Behavior

* Status: Processing
* Changes applied after backend validation

---

## 8. Automations, Actions & Webhooks

### 8.1 Supported Actions (Phase 1)

Based on docs, Admin can configure:

* Ticket creation
* CRM updates
* Billing-related triggers
* Webhook triggers

---

### 8.2 Automation Configuration Screen

Components

* Automation List
* CTA: Create Automation

Create Automation Form

* Trigger Event (SOP step, call outcome, compliance event)
* Action Type (Ticket, CRM, Webhook)
* Webhook URL / Target System

---

### 8.3 Execution Model

Best-Understanding Assumption

* Actions are async (non-blocking)
* Failures do not block agent flow

Failure Handling

* Logged in Audit Logs
* No retries surfaced to Admin UI (Phase 1)

Needs Clarity: Whether agent confirmation is configurable per automation.

---

## 9. Data Retention & Storage

### 9.1 Retention Configuration Screen

Components

* Radio:

  * Store recordings with Client
  * Store recordings with Platform
* If platform storage:
* Retention duration selector

System Behavior

* Enforced via TTL & lifecycle rules
* All deletions audit-logged

---

## 10. Audit Logs

### 10.1 Audit Log Screen

Components

* Filterable & searchable table:

  * User
  * Action
  * Entity
  * Timestamp
  * Old Value → New Value

Capabilities

* Read-only
* No rollback from audit screen

---

## 11. Billing & Usage (Limited)

Current Understanding

* Billing details are not deeply exposed in UI
* Usage or invoices may be sent via email

Needs Clarity

* Whether Admin can see usage metrics in portal

---

## 12. Explicit Open Questions (For Management Review)

1. Org activation conditions
2. Telephony configuration depth
3. Intent editability post-activation
4. Agent confirmation for automations
5. Billing visibility inside Admin Portal

---

## 13. Summary

This Admin User Journey prioritizes:

* Simplicity
* Deferred, safe configuration changes
* Minimal real-time coupling with live calls
* Clear auditability

All assumptions are explicit, reversible, and intentionally conservative to avoid scope creep in Phase 1.

---

## 14. Admin User Flow Diagrams (Phase 1)

These diagrams represent logical user flows, not UI wireframes.

They are intentionally simplified to reflect Phase 1 scope and avoid over-specification.

---

### 14.1 Admin Onboarding Flow

flowchart TD

    A[Admin Signup] --> B[Create Organization]

    B --> C[Organization Profile Setup]

    C --> D[Invite Managers & Agents]

    D --> E[Onboarding Complete]

    E --> F[Admin Portal Home]

Notes

* Onboarding focuses on user setup, not deep system configuration
* Organization activation behavior is assumed automatic after onboarding
* Telephony setup is intentionally excluded here (needs clarity)

---

### 14.2 User Management Flow (Admin)

flowchart TD

    A[Admin Portal] --> B[Users]

    B --> C[View Users List]

    C --> D[Invite User]

    D --> E[Send Invite]

    E --> F[User Status = Invited]

    C --> G[Disable User]

    G --> H[User Status = Disabled]

Notes

* No role edits post-invite (disable + re-invite instead)
* No bulk operations in Phase 1

---

### 14.3 Knowledge & SOP Management Flow

flowchart TD

    A[Admin Portal] --> B[Knowledge & SOPs]

    B --> C[Select Section]

    C --> D[View Document List]

    D --> E[Upload / Update Document]

    E --> F[Status = Processing]

    F --> G[DS Ingestion]

    G --> H{Processing Result}

    H -->|Success| I[Status = Active]

    H -->|Failure| J[Status = Failed]

Notes

* New versions apply only to future calls
* No mid-call document switching

---

### 14.4 Intent Configuration Flow

flowchart TD

    A[Admin Portal] --> B[Intent Configuration]

    B --> C[View Intent List]

    C --> D{Intent Source}

    D -->|Upload Existing| E[Upload Intent Taxonomy]

    D -->|Preconfigured| F[Review Draft Intents]

    E --> G[Validate]

    F --> G

    G --> H[Approve & Activate]

    H --> I[Intents Live]

Notes

* Confidence thresholds are pre-configured
* Post-activation edits require clarity

---

### 14.5 Feature Enablement Flow

flowchart TD

    A[Admin Portal] --> B[Features]

    B --> C[Toggle Features]

    C --> D[Save Changes]

    D --> E[Status = Processing]

    E --> F[Backend Validation & Ingestion]

    F --> G[Features Applied]

Notes

* Features are enabled per organization
* No preview mode
* Changes are not immediate

---

### 14.6 Automation & Webhook Configuration Flow

flowchart TD

    A[Admin Portal] --> B[Automations]

    B --> C[Create Automation]

    C --> D[Select Trigger Event]

    D --> E[Select Action Type]

    E --> F[Configure Target / Webhook]

    F --> G[Save Automation]

    G --> H[Automation Active]

Runtime Execution (Async)

flowchart TD

    A[Trigger Event Occurs] --> B[Automation Fired]

    B --> C[Async Action Execution]

    C --> D{Success?}

    D -->|Yes| E[Log Success]

    D -->|No| F[Log Failure]

---

### 14.7 Data Retention Configuration Flow

flowchart TD

    A[Admin Portal] --> B[Data & Retention]

    B --> C[Select Storage Mode]

    C --> D[Configure Retention Duration]

    D --> E[Save]

    E --> F[Policy Enforced]

---

### 14.8 Audit Log Review Flow

flowchart TD

    A[Admin Portal] --> B[Audit Logs]

    B --> C[Filter / Search]

    C --> D[View Log Entries]

Notes

* Read-only
* No rollback actions

---

### 14.9 Admin Steady-State Journey (Post-Onboarding)

flowchart LR

    A[Admin Home] --> B[Users]

    A --> C[Knowledge & SOPs]

    A --> D[Intents]

    A --> E[Features]

    A --> F[Automations]

    A --> G[Data & Retention]

    A --> H[Audit Logs]

---

**
