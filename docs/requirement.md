Below is a production-grade frontend architecture for the Agent Assist Platform, optimized for Next.js 16 (App Router), feature-based, multi-tenant, white-label ready, and sane to maintain.


⸻

1. Core Frontend Principles (Non-Negotiable)

If you violate these, the system will rot:
	1.	Feature-based architecture, not page-based
	2.	Strict separation of
	•	UI
	•	Domain logic
	•	Server data access
	3.	Tenant & feature-flag driven UI
	4.	Zero coupling between Agent and Manager surfaces
	5.	All real-time logic isolated (WebSocket / SSE layer)

⸻

2. Tech Stack (Locked In)
	•	Next.js 16 (App Router only)
	•	TypeScript (strict)
	•	pnpm
	•	Tailwind CSS
	•	shadcn/ui
	•	Zustand → only for:
	•	session state
	•	live call state
	•	feature flags
	•	React Server Components by default
	•	Client Components only where needed
	•	SSE / WebSocket abstraction layer

⸻

3. High-Level Frontend Architecture

src/
├── app/
│   ├── (auth)/
│   ├── agent/
│   ├── manager/
│   ├── admin/
│   ├── api/            # BFF endpoints
│   └── layout.tsx
│
├── features/
│   ├── live-call/
│   ├── post-call/
│   ├── sop/
│   ├── knowledge/
│   ├── chat-assistant/
│   ├── dashboards/
│   ├── sessions/
│   ├── live-monitoring/
│   ├── onboarding/
│   ├── configuration/
│   └── audit-logs/
│
├── components/
│   ├── ui/             # shadcn primitives
│   ├── layout/
│   ├── data-viz/
│   └── feedback/
│
├── stores/
│   ├── auth.store.ts
│   ├── tenant.store.ts
│   ├── feature-flags.store.ts
│   ├── live-call.store.ts
│   └── ui.store.ts
│
├── lib/
│   ├── api/
│   ├── realtime/
│   ├── permissions/
│   ├── feature-flags/
│   └── telemetry/
│
├── hooks/
├── types/
├── constants/
└── styles/


⸻

4. Route Structure (Clean & Predictable)

/agent
  /live-call
  /post-call/[sessionId]
  /sop
  /chat

/manager
  /overview
  /agents
  /sessions
  /sessions/[sessionId]
  /live-monitoring
  /intelligence

/admin
  /onboarding
  /knowledge
  /intents
  /features
  /dashboards
  /automation
  /data-retention
  /audit-logs


⸻

5. ALL REQUIRED SCREENS (From BRD)

Agent Screens
	1.	Live Call
	2.	Post-Call
	3.	SOP / Knowledge
	4.	Agent Chat

Manager Screens
	5.	Overview Dashboard
	6.	Agent Performance
	7.	Sessions List
	8.	Session Detail
	9.	Live Call Monitoring
	10.	Advanced Intelligence

Client Admin (Onboarding Portal)
	11.	Registration & Org Setup
	12.	Knowledge & SOP Management
	13.	Intent Configuration
	14.	Feature Enablement
	15.	Dashboard Configuration
	16.	Automation & Webhooks
	17.	Data Retention
	18.	Audit Logs

⸻

6. Screen-by-Screen Component Breakdown

1. Agent – Live Call Screen

Goal: Zero distraction, real-time decision support

Components
	•	LiveCallHeader
	•	Call duration
	•	Customer identifier
	•	IntentBadge
	•	Current detected intent
	•	Confidence indicator
	•	SentimentIndicator
	•	Customer sentiment
	•	Agent sentiment
	•	SOPFlowPanel
	•	Current SOP step
	•	Decision path
	•	NextBestActionCard
	•	Contextual suggestions
	•	ComplianceStatus
	•	Green / amber / red indicators
	•	UpsellPrompt
	•	Only when valid
	•	AgentChatDock
	•	Floating, collapsible

State
	•	WebSocket driven
	•	Stored in live-call.store.ts

⸻

2. Agent – Post-Call Screen

Components
	•	CallSummary
	•	AI generated summary
	•	KeyMomentsTimeline
	•	TranscriptViewer
	•	Read-only
	•	TicketDraftPanel
	•	ComplianceReport

⸻

3. Agent – SOP / Knowledge Screen

Components
	•	KnowledgeFilterBar
	•	DocumentList
	•	VersionSelector
	•	SOPStepViewer
	•	KnowledgeSearch

⸻

4. Agent – Chat Screen

Components
	•	ChatHistory
	•	ChatInput
	•	SuggestedPrompts
	•	SafetyNotice

⸻

5. Manager – Overview Dashboard

Components
	•	DateRangeFilter
	•	KPIGrid
	•	Sessions
	•	CSAT
	•	FCR
	•	SentimentTrendChart
	•	IntentDistributionChart
	•	LeaderboardTable
	•	SOPAdherenceScoreCard
	•	UpsellMetricsPanel

⸻

6. Manager – Agent Performance

Components
	•	AgentSelector
	•	PerformanceSummary
	•	TrendCharts
	•	QAComplianceTable
	•	UpsellPerformanceChart

⸻

7. Manager – Sessions List

Components
	•	AdvancedFilters
	•	SessionTable
	•	ExportButton

⸻

8. Manager – Session Detail

Tabs
	•	Overview
	•	Sentiment
	•	Performance
	•	Insights

Components
	•	SessionHeader
	•	SummaryPanel
	•	SentimentTimeline
	•	QAMetrics
	•	CoachingInsights
	•	UpsellAnalysis

⸻

9. Manager – Live Call Monitoring

This is a command center.

Components
	•	LiveCallGrid
	•	LiveCallCard
	•	Agent name
	•	Duration
	•	Intent
	•	Sentiment
	•	Risk flags
	•	RiskHighlightRules
	•	InterventionActions

⸻

10. Manager – Advanced Intelligence

Components
	•	RootCauseClusterChart
	•	FailureReasonsTable
	•	TrainingRecommendations

⸻

11–18. Admin / Onboarding Screens (Grouped)

Shared Components
	•	ConfigHeader
	•	VersionHistoryPanel
	•	ProcessingStatusIndicator
	•	AuditTrailViewer

Specific
	•	OrgSetupForm
	•	DocumentUploader
	•	IntentEditor
	•	FeatureToggleMatrix
	•	DashboardFieldSelector
	•	WebhookConfigForm
	•	RetentionPolicyEditor
	•	AuditLogTable

⸻

7. Zustand Usage (Minimal, Intentional)

Use Zustand only for:
	•	Auth & RBAC
	•	Tenant config
	•	Feature flags
	•	Live call state
	•	UI preferences

Never for server data caching.

⸻

8. Feature Flags & Tenant Isolation (Critical)

Every screen and component must check:

useFeature("live_sentiment")
useFeature("upsell_prompts")
usePermission("manager")

This avoids branching hell.

⸻

9. Real-Time Data Architecture (Frontend)

lib/realtime/
  ├── socket-client.ts
  ├── sse-client.ts
  ├── event-types.ts
  └── adapters/

UI never talks directly to sockets.
Stores subscribe. Components consume stores.

⸻

10. Hard Truths (Read This Twice)
	•	This is not a CRUD dashboard
	•	If you don’t isolate real-time logic, your app will jitter and leak memory
	•	Agent UI must stay dumb, fast, and minimal
	•	Manager UI can be heavy, analytical, and slow(er)
	•	Admin UI must be audit-first, not UX-first

⸻